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
      console.log('=========================================');
      console.log('Fetching departure cities for trip type:', selectedTripType);
      console.log('API Endpoint: getDepartureCities');
      console.log('Request Params:', { tripType: selectedTripType });
      
      const cities = await flightApiService.getDepartureCities(selectedTripType);
      
      console.log('Departure cities API Response:', cities);
      console.log('Number of departure cities:', cities.length);
      if (cities.length > 0) {
        console.log('Sample departure city:', cities[0]);
      }
      console.log('=========================================');
      
      setDepartureCities(cities);
    } catch (error) {
      console.error('Error fetching departure cities:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchSectors = async (tripType: number) => {
    try {
      setLoading(true);
      console.log('=========================================');
      console.log('Fetching sectors for trip type:', tripType);
      console.log('API Endpoint: getSectors');
      console.log('Request Params:', { tripType });
      
      const sectorsData = await flightApiService.getSectors(tripType);
      
      console.log('Sectors API Response:', sectorsData);
      console.log('Number of sectors:', sectorsData.length);
      if (sectorsData.length > 0) {
        console.log('Sample sector:', sectorsData[0]);
      }
      console.log('=========================================');
      
      setSectors(sectorsData);
    } catch (error) {
      console.error('Error fetching sectors:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDepartureChange = async (cityCode: string) => {
    setSelectedDeparture(cityCode);
    setSelectedArrival('');
    setSelectedOnwardDate('');
    setSelectedReturnDate('');
    setOnwardDates([]);
    setReturnDates([]);
    
    console.log('=========================================');
    console.log('Departure city selected:', cityCode);
    console.log('Trip type:', selectedTripType);
    
    try {
      setLoading(true);
      console.log('Fetching arrival cities for departure:', cityCode);
      console.log('API Endpoint: getArrivalCities');
      console.log('Request Params:', { 
        depCityCode: cityCode, 
        tripType: selectedTripType 
      });
      
      const arrivalCities = await flightApiService.getArrivalCities(cityCode, selectedTripType);
      
      console.log('Arrival cities API Response:', arrivalCities);
      console.log('Number of arrival cities:', arrivalCities.length);
      if (arrivalCities.length > 0) {
        console.log('Sample arrival city:', arrivalCities[0]);
      }
      console.log('=========================================');
      
      setArrivalCities(arrivalCities);
    } catch (error) {
      console.error('Error fetching arrival cities:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleArrivalChange = async (cityCode: string) => {
    setSelectedArrival(cityCode);
    setSelectedOnwardDate('');
    setSelectedReturnDate('');
    setOnwardDates([]);
    setReturnDates([]);
    
    console.log('=========================================');
    console.log('Arrival city selected:', cityCode);
    console.log('Departure city:', selectedDeparture);
    console.log('Trip type:', selectedTripType);
    
    if (selectedDeparture) {
      try {
        setLoading(true);
        console.log('Fetching onward dates for route:', {
          departure: selectedDeparture,
          arrival: cityCode,
          tripType: selectedTripType
        });
        console.log('API Endpoint: getOnwardDates');
        console.log('Request Params:', {
          depCode: selectedDeparture,
          arrCode: cityCode,
          tripType: selectedTripType
        });
        
        const dates = await flightApiService.getOnwardDates(selectedDeparture, cityCode, selectedTripType);
        
        console.log('Onward dates API Response:', dates);
        console.log('Number of onward dates:', dates.length);
        if (dates.length > 0) {
          console.log('Sample onward date:', dates[0]);
        }
        console.log('=========================================');
        
        setOnwardDates(dates);
      } catch (error) {
        console.error('Error fetching onward dates:', error);
        if (error.response) {
          console.error('Error response data:', error.response.data);
          console.error('Error response status:', error.response.status);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleOnwardDateChange = async (date: string) => {
    setSelectedOnwardDate(date);
    setSelectedReturnDate('');
    setReturnDates([]);
    
    console.log('=========================================');
    console.log('Onward date selected:', date);
    console.log('Departure city:', selectedDeparture);
    console.log('Arrival city:', selectedArrival);
    console.log('Trip type:', selectedTripType);
    
    if (selectedTripType === 1 && selectedDeparture && selectedArrival) {
      try {
        setLoading(true);
        console.log('Fetching return dates with params:', {
          depCityCode: selectedDeparture,
          arrCityCode: selectedArrival,
          onwardDate: date,
          tripType: selectedTripType
        });
        console.log('API Endpoint: getReturnDates');
        console.log('Request Body:', {
          depCityCode: selectedDeparture,
          arrCityCode: selectedArrival,
          onwardDate: date,
          tripType: selectedTripType
        });
        
        const returnDatesResponse = await flightApiService.getReturnDates({
          depCityCode: selectedDeparture,
          arrCityCode: selectedArrival,
          onwardDate: date,
          tripType: selectedTripType
        });
        
        console.log('Return dates API Response (raw):', returnDatesResponse);
        console.log('Response type:', typeof returnDatesResponse);
        console.log('Is array:', Array.isArray(returnDatesResponse));
        
        if (Array.isArray(returnDatesResponse)) {
          console.log('Return dates is array with length:', returnDatesResponse.length);
          if (returnDatesResponse.length > 0) {
            console.log('First return date item:', returnDatesResponse[0]);
            console.log('Return date value:', returnDatesResponse[0].return_date);
          } else {
            console.log('Return dates array is empty - no return dates available');
          }
        } else {
          console.log('Return dates is not an array, checking structure:', returnDatesResponse);
          
          // Try to extract data if wrapped in a different structure
          if (returnDatesResponse && returnDatesResponse.data) {
            console.log('Response has data property:', returnDatesResponse.data);
            if (Array.isArray(returnDatesResponse.data)) {
              console.log('Data is array with length:', returnDatesResponse.data.length);
              setReturnDates(returnDatesResponse.data);
            }
          } else if (returnDatesResponse && returnDatesResponse.return_dates) {
            console.log('Response has return_dates property:', returnDatesResponse.return_dates);
            if (Array.isArray(returnDatesResponse.return_dates)) {
              console.log('return_dates is array with length:', returnDatesResponse.return_dates.length);
              setReturnDates(returnDatesResponse.return_dates);
            }
          }
        }
        
        console.log('Final returnDates state will be set to:', returnDatesResponse);
        console.log('=========================================');
        
        setReturnDates(returnDatesResponse);
      } catch (error) {
        console.error('Error fetching return dates:', error);
        if (error.response) {
          console.error('Error response data:', error.response.data);
          console.error('Error response status:', error.response.status);
          console.error('Error response headers:', error.response.headers);
        } else if (error.request) {
          console.error('Error request:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
        console.log('=========================================');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSectorSelect = (sector: Sector) => {
    console.log('=========================================');
    console.log('Sector selected:', sector);
    console.log('From:', sector.dep_city_code, sector.dep_city_name);
    console.log('To:', sector.arr_city_code, sector.arr_city_name);
    console.log('=========================================');
    
    setSelectedDeparture(sector.dep_city_code);
    setSelectedArrival(sector.arr_city_code);
    fetchDatesForSector(sector.dep_city_code, sector.arr_city_code);
  };

  const fetchDatesForSector = async (depCode: string, arrCode: string) => {
    try {
      setLoading(true);
      console.log('=========================================');
      console.log('Fetching dates for sector:', { depCode, arrCode });
      console.log('API Endpoint: getOnwardDates');
      console.log('Request Params:', {
        depCode,
        arrCode,
        tripType: selectedTripType
      });
      
      const dates = await flightApiService.getOnwardDates(depCode, arrCode, selectedTripType);
      
      console.log('Sector onward dates response:', dates);
      console.log('Number of dates:', dates.length);
      if (dates.length > 0) {
        console.log('Sample date:', dates[0]);
      }
      console.log('=========================================');
      
      setOnwardDates(dates);
    } catch (error) {
      console.error('Error fetching dates:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
      }
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
      console.log('=========================================');
      console.log('SEARCH FLIGHTS REQUEST');
      console.log('Searching flights with params:', {
        depCityCode: selectedDeparture,
        arrCityCode: selectedArrival,
        onwardDate: selectedOnwardDate,
        returnDate: selectedReturnDate || 'N/A (One Way)',
        adult: adults,
        children: children,
        infant: infants,
        tripType: selectedTripType,
        totalPassengers: adults + children + infants
      });
      console.log('API Endpoint: searchFlights');
      console.log('Request Body:', {
        depCityCode: selectedDeparture,
        arrCityCode: selectedArrival,
        onwardDate: selectedOnwardDate,
        returnDate: selectedReturnDate,
        adult: adults,
        children: children,
        infant: infants,
        tripType: selectedTripType
      });
      
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
      
      console.log('SEARCH FLIGHTS RESPONSE');
      console.log('Full search response:', searchResponse);
      console.log('Error code:', searchResponse.errorCode);
      console.log('Error message:', searchResponse.errorMessage);
      console.log('Booking token ID:', searchResponse.booking_token_id);
      
      if (searchResponse.errorCode === 0) {
        console.log('Search results data:', searchResponse.data);
        console.log('Number of flights found:', searchResponse.data.length);
        if (searchResponse.data.length > 0) {
          console.log('Sample flight:', searchResponse.data[0]);
          console.log('Is round trip flight:', selectedTripType === 1);
        }
        
        setSearchResults(searchResponse.data);
        setBookingTokenId(searchResponse.booking_token_id);
      } else {
        console.error('Search returned error code:', searchResponse.errorCode);
        console.error('Error message:', searchResponse.errorMessage);
      }
      console.log('=========================================');
    } catch (error) {
      console.error('Error searching flights:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
      }
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
      
      console.log('=========================================');
      console.log('FARE QUOTE REQUEST');
      console.log('Fetching fare quote for flight:', {
        id: flight.id,
        airline: flight.airline_name,
        flightNumber: flight.flight_number,
        onwardDate: flight.onward_date,
        returnDate: isRoundTripFlight(flight) ? selectedReturnDate : undefined,
        staticValue: flight.static,
        adultChildren: adults + children,
        infant: infants
      });
      console.log('API Endpoint: getFareQuote');
      console.log('Request Body:', {
        id: flight.id,
        onwardDate: flight.onward_date,
        returnDate: isRoundTripFlight(flight) ? selectedReturnDate : undefined,
        staticValue: flight.static,
        adultChildren: adults + children,
        infant: infants
      });
      
      const fareQuoteResponse = await flightApiService.getFareQuote({
        id: flight.id,
        onwardDate: flight.onward_date,
        returnDate: isRoundTripFlight(flight) ? selectedReturnDate : undefined,
        staticValue: flight.static,
        adultChildren: adults + children,
        infant: infants
      });

      console.log('FARE QUOTE RESPONSE');
      console.log('Full fare quote response:', fareQuoteResponse);
      console.log('Error code:', fareQuoteResponse.errorCode);
      
      if (fareQuoteResponse.errorCode === 0) {
        console.log('Fare quote data:', fareQuoteResponse.data);
        console.log('Total payable price:', fareQuoteResponse.data.total_payable_price);
        
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

        console.log('Booking params prepared:', bookingParams);
        console.log('=========================================');

        if (onBookFlight) {
          onBookFlight(flight, bookingParams);
        } else {
          alert('Booking functionality not available');
        }
      }
    } catch (error) {
      console.error('Error fetching fare quote:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
      }
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
              disabled={!selectedOnwardDate || loading || returnDates.length === 0}
            >
              <option value="">Select Return Date</option>
              {returnDates.map((date, index) => (
                <option key={index} value={date.return_date}>
                  {new Date(date.return_date).toLocaleDateString()}
                </option>
              ))}
            </select>
            {returnDates.length === 0 && selectedOnwardDate && (
              <small className="ffc-no-dates-message">No return dates available</small>
            )}
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