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
  const [adults, setAdults] = useState<number>(0);
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
    if (!selectedDeparture || !selectedArrival || !selectedOnwardDate) {
      alert('Please select all required fields');
      return;
    }

    if (selectedTripType === 1 && !selectedReturnDate) {
      alert('Please select return date for round trip');
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
      
      if (searchResponse.errorCode === 0) {
        setSearchResults(searchResponse.data);
        setBookingTokenId(searchResponse.booking_token_id);
      }
    } catch (error) {
      console.error('Error searching flights:', error);
    } finally {
      setLoading(false);
    }
  };

  const isRoundTripFlight = (flight: any): flight is RoundTripFlightSearchResult => {
    return selectedTripType === 1 && 'return_flight_data' in flight;
  };

  const handleBookFlight = (flight: FlightSearchResult | RoundTripFlightSearchResult) => {
    fetchFareQuoteAndBook(flight);
  };

  const fetchFareQuoteAndBook = async (flight: FlightSearchResult | RoundTripFlightSearchResult) => {
    try {
      setLoading(true);
      
      const fareQuoteResponse = await flightApiService.getFareQuote({
        id: flight.id,
        onwardDate: flight.onward_date,
        returnDate: isRoundTripFlight(flight) ? selectedReturnDate : undefined,
        staticValue: flight.static,
        adultChildren: adults + children,
        infant: infants
      });

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
          availableSeats: flight.available_seats // Add this line
        };

        if (onBookFlight) {
          onBookFlight(flight, bookingParams);
        } else {
          alert('Booking functionality not available');
        }
      }
    } catch (error) {
      console.error('Error fetching fare quote:', error);
      alert('Error preparing booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderFlightCard = (flight: FlightSearchResult | RoundTripFlightSearchResult, index: number) => (
    <div key={flight.id || index} className="ffc-flight-card">
      {/* Onward Flight */}
      <div className="ffc-flight-section ffc-onward-flight">
        <div className="ffc-flight-header">
          <span className="ffc-airline">
            {flight.airline_name}
            <span className="ffc-flight-number">{flight.flight_number}</span>
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
      <strong>₹{flight.total_payable_price}</strong>
      <small>Total for {adults + children + infants} passengers</small>
    </div>
    {/* ADD THIS SECTION HERE: */}
    <div className="ffc-per-person">
      {adults > 0 && <div>Adult: ₹{flight.per_adult_child_price || 0}</div>}
      {children > 0 && <div>Child: ₹{flight.per_adult_child_price || 0}</div>}
      {infants > 0 && <div>Infant: ₹{flight.per_infant_price || 0}</div>}
    </div>
  </div>
  
  <div className="ffc-availability">
    {flight.available_seats} seats available
  </div>
  
  <button 
    className="ffc-book-btn"
    onClick={() => handleBookFlight(flight)}
    disabled={loading}
  >
    {loading ? 'Preparing...' : 'Book Now'}
  </button>
</div>
      </div>
    </div>
  );

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
        {/* {selectedTripType === 0 && sectors.length > 0 && (
          <div className="ffc-sectors-section">
            <h4>Popular Sectors</h4>
            <div className="ffc-sectors-grid">
              {sectors.map((sector, index) => (
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
                {new Date(date.onward_date).toLocaleDateString()}
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
                  {new Date(date.return_date).toLocaleDateString()}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="ffc-passengers-section">
          <div className="ffc-form-group">
            <label>Adults (12+):</label>
            <input 
              type="number" 
              value={adults}
              onChange={(e) => setAdults(parseInt(e.target.value) || 1)}
              min="1"
              max="9"
              disabled={loading}
            />
          </div>

          <div className="ffc-form-group">
            <label>Children (2-11):</label>
            <input 
              type="number" 
              value={children}
              onChange={(e) => setChildren(parseInt(e.target.value) || 0)}
              min="0"
              max="9"
              disabled={loading}
            />
          </div>

          <div className="ffc-form-group">
            <label>Infants (0-2):</label>
            <input 
              type="number" 
              value={infants}
              onChange={(e) => setInfants(parseInt(e.target.value) || 0)}
              min="0"
              max="9"
              disabled={loading}
            />
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
          <h3>Available Flights ({searchResults.length})</h3>
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
    </div>
  );
};

export default FlightSearchRoundTrip;