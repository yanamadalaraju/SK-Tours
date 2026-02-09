import React, { useState, useEffect } from 'react';
import flightApiService from './flight-api.service';
import { 
  Airport, 
  FlightSearchResult, 
  RoundTripFlightSearchResult,
  Sector 
} from './flight-api.types';

interface FlightSearchRoundTripProps {
  tripType?: number;
  onBookFlight?: (flight: any, params: any) => void;
}

const FlightSearchRoundTrip: React.FC<FlightSearchRoundTripProps> = ({ 
  tripType = 1,
  onBookFlight 
}) => {
  const [departureCities, setDepartureCities] = useState<Airport[]>([]);
  const [arrivalCities, setArrivalCities] = useState<Airport[]>([]);
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [onwardDates, setOnwardDates] = useState<{ onward_date: string }[]>([]);
  const [returnDates, setReturnDates] = useState<{ return_date: string }[]>([]);
  const [searchResults, setSearchResults] = useState<(FlightSearchResult | RoundTripFlightSearchResult)[]>([]);
  
  const [selectedTripType, setSelectedTripType] = useState<number>(tripType);
  const [selectedDeparture, setSelectedDeparture] = useState<string>('');
  const [selectedArrival, setSelectedArrival] = useState<string>('');
  const [selectedSector, setSelectedSector] = useState<string>('');
  const [selectedOnwardDate, setSelectedOnwardDate] = useState<string>('');
  const [selectedReturnDate, setSelectedReturnDate] = useState<string>('');
  const [adults, setAdults] = useState<number>(1); // Changed default to 1
  const [children, setChildren] = useState<number>(0);
  const [infants, setInfants] = useState<number>(0);
  
  const [loading, setLoading] = useState<boolean>(false);
  const [bookingTokenId, setBookingTokenId] = useState<string>('');

  useEffect(() => {
    fetchDepartureCities();
    if (selectedTripType === 0) {
      fetchSectors(0);
    }
  }, [selectedTripType]);

  const fetchDepartureCities = async () => {
    try {
      setLoading(true);
      const cities = await flightApiService.getDepartureCities(selectedTripType);
      setDepartureCities(cities);
    } catch (error) {
      console.error('Error fetching departure cities:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSectors = async (tripType: number) => {
    try {
      setLoading(true);
      const sectorsData = await flightApiService.getSectors(tripType);
      setSectors(sectorsData);
    } catch (error) {
      console.error('Error fetching sectors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDepartureChange = async (cityCode: string) => {
    setSelectedDeparture(cityCode);
    try {
      setLoading(true);
      const arrivalCities = await flightApiService.getArrivalCities(cityCode, selectedTripType);
      setArrivalCities(arrivalCities);
    } catch (error) {
      console.error('Error fetching arrival cities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleArrivalChange = async (cityCode: string) => {
    setSelectedArrival(cityCode);
    if (selectedDeparture) {
      try {
        setLoading(true);
        const dates = await flightApiService.getOnwardDates(selectedDeparture, cityCode, selectedTripType);
        setOnwardDates(dates);
      } catch (error) {
        console.error('Error fetching onward dates:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleOnwardDateChange = async (date: string) => {
    setSelectedOnwardDate(date);
    if (selectedTripType === 1 && selectedDeparture && selectedArrival) {
      try {
        setLoading(true);
        const returnDates = await flightApiService.getReturnDates({
          depCityCode: selectedDeparture,
          arrCityCode: selectedArrival,
          onwardDate: date,
          tripType: selectedTripType
        });
        setReturnDates(returnDates);
      } catch (error) {
        console.error('Error fetching return dates:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSectorSelect = (sector: Sector) => {
    setSelectedDeparture(sector.dep_city_code);
    setSelectedArrival(sector.arr_city_code);
    fetchDatesForSector(sector.dep_city_code, sector.arr_city_code);
  };

  const fetchDatesForSector = async (depCode: string, arrCode: string) => {
    try {
      setLoading(true);
      const dates = await flightApiService.getOnwardDates(depCode, arrCode, selectedTripType);
      setOnwardDates(dates);
    } catch (error) {
      console.error('Error fetching dates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    // Validate required fields
    if (!selectedDeparture || !selectedArrival || !selectedOnwardDate) {
      alert('Please select all required fields');
      return;
    }

    if (selectedTripType === 1 && !selectedReturnDate) {
      alert('Please select return date for round trip');
      return;
    }

    if (adults < 1) {
      alert('At least 1 adult passenger is required');
      return;
    }

    try {
      setLoading(true);
      const searchResponse = await flightApiService.searchFlights({
        depCityCode: selectedDeparture,
        arrCityCode: selectedArrival,
        onwardDate: selectedOnwardDate,
        returnDate: selectedReturnDate,
        adult: adults,
        children: children,
        infant: infants,
        tripType: selectedTripType
      });
      
      console.log('Search Response:', searchResponse);
      
      if (searchResponse.errorCode === 0) {
        setSearchResults(searchResponse.data);
        setBookingTokenId(searchResponse.booking_token_id);
      } else {
        alert(`Search failed with error code: ${searchResponse.errorCode}`);
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching flights:', error);
      alert('Error searching flights. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isRoundTripFlight = (flight: any): flight is RoundTripFlightSearchResult => {
    return selectedTripType === 1 && 'return_flight_data' in flight;
  };

  const handleBookFlight = (flight: FlightSearchResult | RoundTripFlightSearchResult) => {
    // Validate passenger counts
    if (adults < 1) {
      alert('At least 1 adult passenger is required');
      return;
    }
    
    // Validate available seats
    if (flight.available_seats < (adults + children)) {
      alert(`Only ${flight.available_seats} seats available. Please adjust passenger count.`);
      return;
    }
    
    fetchFareQuoteAndBook(flight);
  };

  const fetchFareQuoteAndBook = async (flight: FlightSearchResult | RoundTripFlightSearchResult) => {
    try {
      setLoading(true);
      
      console.log('Fetching fare quote for flight:', flight.id);
      
      const fareQuoteResponse = await flightApiService.getFareQuote({
        id: flight.id,
        onwardDate: flight.onward_date,
        returnDate: isRoundTripFlight(flight) ? selectedReturnDate : undefined,
        staticValue: flight.static,
        adultChildren: adults + children,
        infant: infants
      });

      console.log('Fare Quote Response:', fareQuoteResponse);

      if (fareQuoteResponse.errorCode === 0) {
        const bookingParams = {
          flight: flight,
          onwardDate: flight.onward_date,
          returnDate: isRoundTripFlight(flight) ? selectedReturnDate : '',
          staticValue: flight.static,
          bookingTokenId: bookingTokenId,
          totalAmount: fareQuoteResponse.data.total_payable_price,
          adults: adults,
          children: children,
          infants: infants,
          depCityCode: flight.dep_city_code,
          arrCityCode: flight.arr_city_code,
          availableSeats: flight.available_seats
        };

        console.log('Booking Params:', bookingParams);

        if (onBookFlight) {
          onBookFlight(flight, bookingParams);
        } else {
          alert('Booking functionality not available');
        }
      } else {
        alert(`Fare quote failed with error code: ${fareQuoteResponse.errorCode}`);
      }
    } catch (error) {
      console.error('Error fetching fare quote:', error);
      alert('Error preparing booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderFlightCard = (flight: FlightSearchResult | RoundTripFlightSearchResult, index: number) => {
    const totalPassengers = adults + children + infants;
    const perAdultPrice = flight.per_adult_child_price || 0;
    const perInfantPrice = flight.per_infant_price || 0;
    const totalPrice = flight.total_payable_price || 0;
    
    return (
      <div key={flight.id || index} className="ffc-flight-card">
        {/* Onward Flight */}
        <div className="ffc-flight-section ffc-onward-flight">
          <div className="ffc-flight-header">
            <span className="ffc-airline">
              {flight.airline_name}
              <span className="ffc-flight-number"> ({flight.flight_number})</span>
              {isRoundTripFlight(flight) && flight.international_flight_staus === 1 && (
                <span className="ffc-international-badge">International</span>
              )}
            </span>
          </div>
          
          <div className="ffc-flight-details">
            <div className="ffc-route">
              <div className="ffc-departure">
                <strong>{flight.dep_city_name} ({flight.dep_airport_code})</strong>
                <div className="ffc-time">{flight.dep_time}</div>
                <div className="ffc-terminal">Terminal {flight.dep_terminal_no || 'N/A'}</div>
                <div className="ffc-date">{new Date(flight.onward_date).toLocaleDateString()}</div>
              </div>
              
              <div className="ffc-flight-info">
                <div className="ffc-duration">{flight.duration}</div>
                {isRoundTripFlight(flight) && flight.stop_data && flight.stop_data.length > 0 && (
                  <div className="ffc-stops">
                    {flight.no_of_stop} stop{flight.no_of_stop > 1 ? 's' : ''}
                  </div>
                )}
              </div>
              
              <div className="ffc-arrival">
                <strong>{flight.arr_city_name} ({flight.arr_airport_code})</strong>
                <div className="ffc-time">{flight.arr_time}</div>
                <div className="ffc-terminal">Terminal {flight.arr_terminal_no || 'N/A'}</div>
                <div className="ffc-date">{new Date(flight.arr_date).toLocaleDateString()}</div>
              </div>
            </div>
            
            {isRoundTripFlight(flight) && flight.stop_data && flight.stop_data.length > 0 && (
              <div className="ffc-stop-details">
                <div className="ffc-stop-header">Via: {flight.stop_data[0].city_name} ({flight.stop_data[0].city_code})</div>
                <div className="ffc-stop-info">
                  Arrive: {flight.stop_data[0].arrival_time} • 
                  Depart: {flight.stop_data[0].departure_time} • 
                  Layover: {flight.stop_data[0].stop_duration}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {isRoundTripFlight(flight) && flight.return_flight_data && (
          <div className="ffc-flight-section ffc-return-flight">
            <div className="ffc-section-header">Return Flight</div>
            <div className="ffc-flight-details">
              <div className="ffc-route">
                <div className="ffc-departure">
                  <strong>{flight.return_flight_data.return_dep_city_name} ({flight.return_flight_data.return_dep_airport_code})</strong>
                  <div className="ffc-time">{flight.return_flight_data.return_dep_time}</div>
                  <div className="ffc-terminal">Terminal {flight.return_flight_data.return_dep_terminal_no || 'N/A'}</div>
                  <div className="ffc-date">{new Date(flight.return_flight_data.return_dep_date).toLocaleDateString()}</div>
                </div>
                
                <div className="ffc-flight-info">
                  <div className="ffc-duration">{flight.return_flight_data.return_trip_duration} hrs</div>
                  {flight.return_stop_data && flight.return_stop_data.length > 0 && (
                    <div className="ffc-stops">
                      {flight.return_no_of_stop} stop{flight.return_no_of_stop > 1 ? 's' : ''}
                    </div>
                  )}
                </div>
                
                <div className="ffc-arrival">
                  <strong>{flight.return_flight_data.return_arr_city_name} ({flight.return_flight_data.return_arr_airport_code})</strong>
                  <div className="ffc-time">{flight.return_flight_data.return_arr_time}</div>
                  <div className="ffc-terminal">Terminal {flight.return_flight_data.return_arr_terminal_no || 'N/A'}</div>
                  <div className="ffc-date">{new Date(flight.return_flight_data.return_arr_date).toLocaleDateString()}</div>
                </div>
              </div>
              
              {flight.return_stop_data && flight.return_stop_data.length > 0 && (
                <div className="ffc-stop-details">
                  <div className="ffc-stop-header">Via: {flight.return_stop_data[0].city_name} ({flight.return_stop_data[0].city_code})</div>
                  <div className="ffc-stop-info">
                    Arrive: {flight.return_stop_data[0].arrival_time} • 
                    Depart: {flight.return_stop_data[0].departure_time} • 
                    Layover: {flight.return_stop_data[0].stop_duration}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Flight Footer */}
        <div className="ffc-flight-footer">
          <div className="ffc-baggage-info">
            <div className="ffc-baggage-item">
              <span className="ffc-label">Check-in:</span>
              <span className="ffc-value">
                Adult: {flight.check_in_baggage_adult}kg, 
                Child: {flight.check_in_baggage_children}kg, 
                Infant: {flight.check_in_baggage_infant}kg
              </span>
            </div>
            <div className="ffc-baggage-item">
              <span className="ffc-label">Cabin:</span>
              <span className="ffc-value">
                Adult: {flight.cabin_baggage_adult}kg, 
                Child: {flight.cabin_baggage_children}kg, 
                Infant: {flight.cabin_baggage_infant}kg
              </span>
            </div>
          </div>
          
          <div className="ffc-price-section">
            <div className="ffc-price-details">
              <div className="ffc-total-price">
                <strong>₹{totalPrice.toLocaleString('en-IN')}</strong>
                <small>Total for {totalPassengers} passenger{totalPassengers > 1 ? 's' : ''}</small>
              </div>
              
              <div className="ffc-per-person">
                {adults > 0 && (
                  <div>
                    Adult{adults > 1 ? 's' : ''} ({adults} × ₹{perAdultPrice.toLocaleString('en-IN')}): 
                    <span className="ffc-subtotal"> ₹{(adults * perAdultPrice).toLocaleString('en-IN')}</span>
                  </div>
                )}
                {children > 0 && (
                  <div>
                    Children ({children} × ₹{perAdultPrice.toLocaleString('en-IN')}): 
                    <span className="ffc-subtotal"> ₹{(children * perAdultPrice).toLocaleString('en-IN')}</span>
                  </div>
                )}
                {infants > 0 && (
                  <div>
                    Infant{infants > 1 ? 's' : ''} ({infants} × ₹{perInfantPrice.toLocaleString('en-IN')}): 
                    <span className="ffc-subtotal"> ₹{(infants * perInfantPrice).toLocaleString('en-IN')}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="ffc-availability">
              <span className="ffc-seats-available">{flight.available_seats}</span> seats available
              {flight.available_seats < 10 && (
                <span className="ffc-low-availability"> • Limited seats!</span>
              )}
            </div>
            
            <button 
              className="ffc-book-btn"
              onClick={() => handleBookFlight(flight)}
              disabled={loading || flight.available_seats < (adults + children)}
              title={flight.available_seats < (adults + children) ? 'Not enough seats available' : 'Book this flight'}
            >
              {loading ? 'Processing...' : 'Book Now'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="ffc-flight-search-container">
      <h2 className="ffc-search-title">{selectedTripType === 1 ? 'Round Trip' : 'One Way'} Flight Search</h2>
      
      {/* Trip Type Toggle */}
      <div className="ffc-trip-type-toggle">
        <button
          className={selectedTripType === 0 ? 'ffc-active' : ''}
          onClick={() => setSelectedTripType(0)}
          disabled={loading}
        >
          One Way
        </button>
        <button
          className={selectedTripType === 1 ? 'ffc-active' : ''}
          onClick={() => setSelectedTripType(1)}
          disabled={loading}
        >
          Round Trip
        </button>
      </div>
      
      {/* Search Form */}
      <div className="ffc-search-form">
        {/* Popular Sectors (Uncomment if needed) */}
        {/* {selectedTripType === 0 && sectors.length > 0 && (
          <div className="ffc-sectors-section">
            <h4>Popular Sectors</h4>
            <div className="ffc-sectors-grid">
              {sectors.slice(0, 6).map((sector, index) => (
                <div 
                  key={`${sector.dep_city_code}-${sector.arr_city_code}-${index}`}
                  className={`ffc-sector-card ${selectedDeparture === sector.dep_city_code && selectedArrival === sector.arr_city_code ? 'ffc-selected' : ''}`}
                  onClick={() => handleSectorSelect(sector)}
                >
                  <div className="ffc-sector-route">
                    <span className="ffc-dep-city">{sector.dep_city_code}</span>
                    <span className="ffc-arrow">→</span>
                    <span className="ffc-arr-city">{sector.arr_city_code}</span>
                  </div>
                  <div className="ffc-sector-cities">
                    {sector.dep_city_name} to {sector.arr_city_name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )} */}

        <div className="ffc-form-row">
          <div className="ffc-form-group">
            <label>Departure City:</label>
            <select 
              value={selectedDeparture} 
              onChange={(e) => handleDepartureChange(e.target.value)}
              disabled={loading}
            >
              <option value="">Select Departure City</option>
              {departureCities.map(city => (
                <option key={city.city_code} value={city.city_code}>
                  {city.city_name} ({city.airport_code})
                </option>
              ))}
            </select>
          </div>

          <div className="ffc-form-group">
            <label>Arrival City:</label>
            <select 
              value={selectedArrival} 
              onChange={(e) => handleArrivalChange(e.target.value)}
              disabled={!selectedDeparture || loading}
            >
              <option value="">Select Arrival City</option>
              {arrivalCities.map(city => (
                <option key={city.city_code} value={city.city_code}>
                  {city.city_name} ({city.airport_code})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="ffc-form-row">
          <div className="ffc-form-group">
            <label>Departure Date:</label>
            <select 
              value={selectedOnwardDate} 
              onChange={(e) => handleOnwardDateChange(e.target.value)}
              disabled={!selectedArrival || loading}
            >
              <option value="">Select Date</option>
              {onwardDates.map((date, index) => (
                <option key={index} value={date.onward_date}>
                  {new Date(date.onward_date).toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </option>
              ))}
            </select>
          </div>

          {selectedTripType === 1 && (
            <div className="ffc-form-group">
              <label>Return Date:</label>
              <select 
                value={selectedReturnDate} 
                onChange={(e) => setSelectedReturnDate(e.target.value)}
                disabled={!selectedOnwardDate || loading}
              >
                <option value="">Select Return Date</option>
                {returnDates.map((date, index) => (
                  <option key={index} value={date.return_date}>
                    {new Date(date.return_date).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="ffc-passengers-section">
          <h4>Passengers</h4>
          <div className="ffc-passengers-grid">
            <div className="ffc-passenger-group">
              <label>Adults (12+ years)</label>
              <div className="ffc-passenger-controls">
                <button 
                  className="ffc-passenger-btn"
                  onClick={() => setAdults(prev => Math.max(1, prev - 1))}
                  disabled={adults <= 1 || loading}
                >
                  -
                </button>
                <span className="ffc-passenger-count">{adults}</span>
                <button 
                  className="ffc-passenger-btn"
                  onClick={() => setAdults(prev => Math.min(9, prev + 1))}
                  disabled={adults >= 9 || loading}
                >
                  +
                </button>
              </div>
            </div>

            <div className="ffc-passenger-group">
              <label>Children (2-11 years)</label>
              <div className="ffc-passenger-controls">
                <button 
                  className="ffc-passenger-btn"
                  onClick={() => setChildren(prev => Math.max(0, prev - 1))}
                  disabled={children <= 0 || loading}
                >
                  -
                </button>
                <span className="ffc-passenger-count">{children}</span>
                <button 
                  className="ffc-passenger-btn"
                  onClick={() => setChildren(prev => Math.min(9 - adults, prev + 1))}
                  disabled={children >= (9 - adults) || loading}
                >
                  +
                </button>
              </div>
            </div>

            <div className="ffc-passenger-group">
              <label>Infants (0-2 years)</label>
              <div className="ffc-passenger-controls">
                <button 
                  className="ffc-passenger-btn"
                  onClick={() => setInfants(prev => Math.max(0, prev - 1))}
                  disabled={infants <= 0 || loading}
                >
                  -
                </button>
                <span className="ffc-passenger-count">{infants}</span>
                <button 
                  className="ffc-passenger-btn"
                  onClick={() => setInfants(prev => Math.min(9 - adults - children, prev + 1))}
                  disabled={infants >= (9 - adults - children) || loading}
                >
                  +
                </button>
              </div>
            </div>
          </div>
          
          <div className="ffc-passenger-total">
            Total Passengers: <strong>{adults + children + infants}</strong> 
            (Max: 9)
          </div>
        </div>

        <button 
          onClick={handleSearch} 
          disabled={loading || !selectedDeparture || !selectedArrival || !selectedOnwardDate || (selectedTripType === 1 && !selectedReturnDate)}
          className="ffc-search-button"
        >
          {loading ? (
            <>
              <span className="ffc-spinner"></span>
              Searching...
            </>
          ) : 'Search Flights'}
        </button>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="ffc-loading-overlay">
          <div className="ffc-spinner-large"></div>
          <p>Loading flight information...</p>
        </div>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && !loading && (
        <div className="ffc-search-results">
          <h3>
            Available Flights ({searchResults.length})
            {bookingTokenId && (
              <span className="ffc-token-id">
                Booking Token: {bookingTokenId.substring(0, 12)}...
              </span>
            )}
          </h3>
          <div className="ffc-flights-list">
            {searchResults.map((flight, index) => renderFlightCard(flight, index))}
          </div>
        </div>
      )}

      {/* No Results Message */}
      {searchResults.length === 0 && !loading && selectedDeparture && selectedArrival && selectedOnwardDate && (
        <div className="ffc-no-results">
          <p>No flights found for the selected criteria. Please try different dates or cities.</p>
        </div>
      )}

      {/* CSS Styles */}
      <style>{`
        .ffc-flight-search-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .ffc-search-title {
          text-align: center;
          color: #1a237e;
          margin-bottom: 30px;
          font-size: 28px;
          font-weight: bold;
        }
        
        .ffc-trip-type-toggle {
          display: flex;
          justify-content: center;
          margin-bottom: 30px;
          border-radius: 8px;
          overflow: hidden;
          background: #f5f5f5;
          border: 1px solid #ddd;
          width: fit-content;
          margin: 0 auto 30px;
        }
        
        .ffc-trip-type-toggle button {
          padding: 12px 30px;
          border: none;
          background: transparent;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 16px;
        }
        
        .ffc-trip-type-toggle .ffc-active {
          background: #1a237e;
          color: white;
        }
        
        .ffc-search-form {
          background: #f8f9fa;
          padding: 25px;
          border-radius: 10px;
          margin-bottom: 30px;
          border: 1px solid #e0e0e0;
        }
        
        .ffc-form-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }
        
        .ffc-form-group {
          display: flex;
          flex-direction: column;
        }
        
        .ffc-form-group label {
          font-weight: 600;
          margin-bottom: 8px;
          color: #333;
          font-size: 14px;
        }
        
        .ffc-form-group select,
        .ffc-form-group input {
          padding: 12px 15px;
          border: 2px solid #ddd;
          border-radius: 6px;
          font-size: 15px;
          transition: border-color 0.3s;
        }
        
        .ffc-form-group select:focus,
        .ffc-form-group input:focus {
          outline: none;
          border-color: #1a237e;
        }
        
        .ffc-passengers-section {
          margin: 30px 0;
          padding: 20px;
          background: white;
          border-radius: 8px;
          border: 1px solid #e0e0e0;
        }
        
        .ffc-passengers-section h4 {
          margin-bottom: 20px;
          color: #1a237e;
          font-size: 18px;
        }
        
        .ffc-passengers-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 15px;
        }
        
        @media (max-width: 768px) {
          .ffc-passengers-grid {
            grid-template-columns: 1fr;
          }
        }
        
        .ffc-passenger-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 15px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          background: #f9f9f9;
        }
        
        .ffc-passenger-group label {
          font-weight: 600;
          margin-bottom: 10px;
          text-align: center;
          color: #555;
        }
        
        .ffc-passenger-controls {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        
        .ffc-passenger-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 2px solid #1a237e;
          background: white;
          color: #1a237e;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
        }
        
        .ffc-passenger-btn:hover:not(:disabled) {
          background: #1a237e;
          color: white;
        }
        
        .ffc-passenger-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .ffc-passenger-count {
          font-size: 20px;
          font-weight: bold;
          min-width: 30px;
          text-align: center;
        }
        
        .ffc-passenger-total {
          text-align: center;
          padding: 10px;
          background: #e8f4fd;
          border-radius: 6px;
          font-size: 16px;
          color: #1a237e;
        }
        
        .ffc-search-button {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #1a237e, #283593);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        
        .ffc-search-button:hover:not(:disabled) {
          background: linear-gradient(135deg, #283593, #3949ab);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(26, 35, 126, 0.3);
        }
        
        .ffc-search-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .ffc-spinner {
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .ffc-flight-card {
          background: white;
          border-radius: 12px;
          padding: 25px;
          margin-bottom: 25px;
          border: 1px solid #e0e0e0;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s;
        }
        
        .ffc-flight-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }
        
        .ffc-flight-section {
          padding: 20px 0;
          border-bottom: 1px solid #eee;
        }
        
        .ffc-onward-flight {
          border-bottom: 2px solid #1a237e;
        }
        
        .ffc-return-flight {
          border-bottom: 2px solid #7b1fa2;
        }
        
        .ffc-flight-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        
        .ffc-airline {
          font-size: 22px;
          font-weight: bold;
          color: #1a237e;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .ffc-flight-number {
          font-size: 16px;
          color: #666;
          font-weight: normal;
        }
        
        .ffc-international-badge {
          background: #ff9800;
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: bold;
        }
        
        .ffc-flight-details {
          padding: 15px 0;
        }
        
        .ffc-route {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 30px;
          margin-bottom: 20px;
        }
        
        @media (max-width: 768px) {
          .ffc-route {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 15px;
          }
        }
        
        .ffc-departure,
        .ffc-arrival {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        
        .ffc-departure strong,
        .ffc-arrival strong {
          font-size: 20px;
          color: #333;
        }
        
        .ffc-time {
          font-size: 24px;
          font-weight: bold;
          color: #1a237e;
        }
        
        .ffc-terminal {
          font-size: 14px;
          color: #666;
        }
        
        .ffc-date {
          font-size: 14px;
          color: #888;
        }
        
        .ffc-flight-info {
          text-align: center;
          padding: 10px 0;
        }
        
        .ffc-duration {
          font-size: 18px;
          font-weight: bold;
          color: #555;
          margin-bottom: 5px;
        }
        
        .ffc-stops {
          font-size: 14px;
          color: #ff9800;
          background: #fff3e0;
          padding: 4px 12px;
          border-radius: 20px;
          display: inline-block;
        }
        
        .ffc-section-header {
          font-size: 18px;
          font-weight: bold;
          color: #7b1fa2;
          margin-bottom: 15px;
          padding-bottom: 10px;
          border-bottom: 2px solid #e1bee7;
        }
        
        .ffc-stop-details {
          background: #f5f5f5;
          padding: 15px;
          border-radius: 8px;
          margin-top: 15px;
          border-left: 4px solid #ff9800;
        }
        
        .ffc-stop-header {
          font-weight: bold;
          color: #ff9800;
          margin-bottom: 5px;
        }
        
        .ffc-stop-info {
          font-size: 14px;
          color: #666;
        }
        
        .ffc-flight-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 20px;
          flex-wrap: wrap;
          gap: 20px;
        }
        
        @media (max-width: 768px) {
          .ffc-flight-footer {
            flex-direction: column;
            align-items: stretch;
          }
        }
        
        .ffc-baggage-info {
          flex: 1;
          min-width: 300px;
        }
        
        .ffc-baggage-item {
          margin-bottom: 10px;
        }
        
        .ffc-label {
          font-weight: bold;
          color: #555;
          margin-right: 10px;
        }
        
        .ffc-value {
          color: #666;
          font-size: 14px;
        }
        
        .ffc-price-section {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 15px;
          min-width: 250px;
        }
        
        .ffc-price-details {
          text-align: right;
        }
        
        .ffc-total-price {
          margin-bottom: 10px;
        }
        
        .ffc-total-price strong {
          font-size: 28px;
          color: #1a237e;
          font-weight: bold;
        }
        
        .ffc-total-price small {
          display: block;
          font-size: 12px;
          color: #888;
          margin-top: 5px;
        }
        
        .ffc-per-person {
          font-size: 14px;
          color: #666;
        }
        
        .ffc-subtotal {
          font-weight: bold;
          color: #1a237e;
          margin-left: 10px;
        }
        
        .ffc-availability {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 14px;
          color: #666;
        }
        
        .ffc-seats-available {
          font-weight: bold;
          color: #4caf50;
        }
        
        .ffc-low-availability {
          color: #ff9800;
          font-weight: bold;
        }
        
        .ffc-book-btn {
          padding: 14px 30px;
          background: linear-gradient(135deg, #4caf50, #2e7d32);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s;
          min-width: 150px;
        }
        
        .ffc-book-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #2e7d32, #1b5e20);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(76, 175, 80, 0.3);
        }
        
        .ffc-book-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
          opacity: 0.7;
        }
        
        .ffc-search-results h3 {
          color: #1a237e;
          margin-bottom: 25px;
          font-size: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .ffc-token-id {
          font-size: 12px;
          color: #666;
          font-weight: normal;
          background: #f5f5f5;
          padding: 4px 10px;
          border-radius: 4px;
          font-family: monospace;
        }
        
        .ffc-loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.9);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        
        .ffc-spinner-large {
          width: 60px;
          height: 60px;
          border: 5px solid rgba(26, 35, 126, 0.2);
          border-top-color: #1a237e;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 20px;
        }
        
        .ffc-no-results {
          text-align: center;
          padding: 40px;
          background: #f9f9f9;
          border-radius: 10px;
          border: 2px dashed #ddd;
          color: #666;
          font-size: 16px;
        }
        
        .ffc-sectors-section {
          margin-bottom: 30px;
        }
        
        .ffc-sectors-section h4 {
          color: #1a237e;
          margin-bottom: 15px;
          font-size: 18px;
        }
        
        .ffc-sectors-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 15px;
        }
        
        .ffc-sector-card {
          padding: 15px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
          text-align: center;
          background: white;
        }
        
        .ffc-sector-card:hover {
          border-color: #1a237e;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(26, 35, 126, 0.15);
        }
        
        .ffc-sector-card.ffc-selected {
          border-color: #1a237e;
          background: #e8eaf6;
        }
        
        .ffc-sector-route {
          font-size: 18px;
          font-weight: bold;
          color: #1a237e;
          margin-bottom: 8px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
        }
        
        .ffc-arrow {
          color: #ff9800;
        }
        
        .ffc-sector-cities {
          font-size: 12px;
          color: #666;
          line-height: 1.4;
        }
      `}</style>
    </div>
  );
};

export default FlightSearchRoundTrip;