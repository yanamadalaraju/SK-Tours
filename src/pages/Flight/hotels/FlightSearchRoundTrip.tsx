import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import flightApiService from './flight-api.service';
import { 
  Airport, 
  FlightSearchResult, 
  RoundTripFlightSearchResult,
  Sector 
} from './flight-api.types';
import { BASE_URL } from '@/ApiUrls';
import axios from 'axios';
import { 
  FaPlane, 
  FaPlaneDeparture, 
  FaPlaneArrival,
  FaUser,
  FaChild,
  FaBaby,
  FaSearch,
  FaClock,
  FaSuitcase,
  FaArrowRight,
  FaExchangeAlt,
  FaCalendarAlt,
  FaUsers,
  FaChevronDown,
  FaRedoAlt
} from 'react-icons/fa';

interface FlightSearchRoundTripProps {
  tripType?: number;
  onBookFlight?: (flight: any, params: any) => void;
}

interface FlightCharge {
  id: number;
  flight_type: string;
  charges: string;
  remarks: string | null;
  created_at: string;
  updated_at: string;
}

const FlightSearchRoundTrip: React.FC<FlightSearchRoundTripProps> = ({ 
  tripType = 1,
  onBookFlight 
}) => {
  const navigate = useNavigate();
  const [departureCities, setDepartureCities] = useState<Airport[]>([]);
  const [arrivalCities, setArrivalCities] = useState<Airport[]>([]);
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [onwardDates, setOnwardDates] = useState<{ onward_date: string }[]>([]);
  const [returnDates, setReturnDates] = useState<{ return_date: string }[]>([]);
  const [searchResults, setSearchResults] = useState<(FlightSearchResult | RoundTripFlightSearchResult)[]>([]);
  
  // New state for flight charges
  const [flightCharges, setFlightCharges] = useState<{ [key: string]: number }>({});
  
  const [selectedTripType, setSelectedTripType] = useState<number>(tripType);
  const [selectedDeparture, setSelectedDeparture] = useState<string>('');
  const [selectedArrival, setSelectedArrival] = useState<string>('');
  const [selectedSector, setSelectedSector] = useState<string>('');
  const [selectedOnwardDate, setSelectedOnwardDate] = useState<string>('');
  const [selectedReturnDate, setSelectedReturnDate] = useState<string>('');
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [infants, setInfants] = useState<number>(0);
  const [travelClass, setTravelClass] = useState<string>('Economy');
  
  const [loading, setLoading] = useState<boolean>(false);
  const [bookingTokenId, setBookingTokenId] = useState<string>('');
  const [paymentProcessing, setPaymentProcessing] = useState<boolean>(false);
  const [showPassengerModal, setShowPassengerModal] = useState<boolean>(false);

  // Fetch flight charges on component mount
  useEffect(() => {
    fetchFlightCharges();
  }, []);

  // Fetch flight charges from API
  const fetchFlightCharges = async () => {
    try {
      console.log('=========================================');
      console.log('Fetching flight charges');
      
      const response = await axios.get(`${BASE_URL}/api/online-flights/flight-charges`);
      
      console.log('Flight charges response:', response.data);
      
      if (response.data.success && response.data.data) {
        // Transform charges data into a more accessible format
        const chargesMap: { [key: string]: number } = {};
        response.data.data.forEach((charge: FlightCharge) => {
          if (charge.flight_type.toLowerCase() === 'one way') {
            chargesMap['oneway'] = parseFloat(charge.charges);
          } else if (charge.flight_type.toLowerCase() === 'roundtrip') {
            chargesMap['roundtrip'] = parseFloat(charge.charges);
          }
        });
        
        console.log('Processed charges:', chargesMap);
        setFlightCharges(chargesMap);
      }
      
      console.log('=========================================');
    } catch (error) {
      console.error('Error fetching flight charges:', error);
    }
  };

  // Helper function to get applicable charges based on trip type
  const getApplicableCharges = (): number => {
    if (selectedTripType === 0) {
      // One way - use oneway charges
      return flightCharges['oneway'] || 0;
    } else if (selectedTripType === 1) {
      // Round trip - use roundtrip charges
      return flightCharges['roundtrip'] || 0;
    }
    return 0;
  };

  // Calculate total price with charges
  const calculateTotalWithCharges = (basePrice: number): number => {
    const charges = getApplicableCharges();
    return basePrice + charges;
  };

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

  const handleBookFlight = async (flight: FlightSearchResult | RoundTripFlightSearchResult) => {
    try {
      setPaymentProcessing(true);
      
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
      
      const fareQuoteResponse = await flightApiService.getFareQuote({
        id: flight.id,
        onwardDate: flight.onward_date,
        returnDate: isRoundTripFlight(flight) ? selectedReturnDate : undefined,
        staticValue: flight.static,
        adultChildren: adults + children,
        infant: infants
      });

      if (fareQuoteResponse.errorCode === 0) {
        const charges = getApplicableCharges();
        const totalPayableWithCharges = fareQuoteResponse.data.total_payable_price + charges;
        
        console.log('Fare quote data:', fareQuoteResponse.data);
        console.log('Base payable price:', fareQuoteResponse.data.total_payable_price);
        console.log('Applicable charges:', charges);
        console.log('Total with charges:', totalPayableWithCharges);
        console.log('Booking Token ID:', bookingTokenId);
        
        const flightBookingData = {
          id: flight.id,
          type: 'flight',
          title: `${flight.airline_name} - ${flight.flight_number}`,
          description: `${flight.dep_city_name} to ${flight.arr_city_name}`,
          code: `FL${Date.now()}`,
          duration: flight.duration,
          locations: `${flight.dep_city_name} → ${flight.arr_city_name}`,
          
          // Onward Flight Details
          departure: {
            city: flight.dep_city_name,
            airport: flight.dep_airport_code,
            time: flight.dep_time,
            date: flight.onward_date,
            terminal: flight.dep_terminal_no || 'N/A',
            city_code: flight.dep_city_code
          },
          arrival: {
            city: flight.arr_city_name,
            airport: flight.arr_airport_code,
            time: flight.arr_time,
            date: flight.arr_date,
            terminal: flight.arr_terminal_no || 'N/A',
            city_code: flight.arr_city_code
          },
          flightNumber: flight.flight_number,
          airline: flight.airline_name,
          airline_code: flight.airline_code,
          
          // Price details
          base_amount: fareQuoteResponse.data.total_payable_price,
          charges: charges,
          total_amount: totalPayableWithCharges,
          total_amount_value: totalPayableWithCharges,
          price: `₹${totalPayableWithCharges.toLocaleString()}`,
          priceValue: totalPayableWithCharges,
          per_adult_child_price: flight.per_adult_child_price,
          per_infant_price: flight.per_infant_price,
          
          // Passenger counts
          passengers: {
            adults: adults,
            children: children,
            infants: infants
          },
          total_passengers: adults + children + infants,
          adults: adults,
          children: children,
          infants: infants,
          
          // Baggage
          check_in_baggage_adult: flight.check_in_baggage_adult,
          check_in_baggage_children: flight.check_in_baggage_children,
          check_in_baggage_infant: flight.check_in_baggage_infant,
          cabin_baggage_adult: flight.cabin_baggage_adult,
          cabin_baggage_children: flight.cabin_baggage_children,
          cabin_baggage_infant: flight.cabin_baggage_infant,
          
          // Booking token
          booking_token_id: bookingTokenId,
          static_value: flight.static,
          trip_type: selectedTripType,
          available_seats: flight.available_seats,
          
          // Stop details
          stop_data: flight.stop_data || [],
          number_of_stops: flight.no_of_stop || 0,
          
          // International flight
          international_flight_status: flight.international_flight_staus || 0
        };

        // Add return flight details if round trip
        if (isRoundTripFlight(flight) && flight.return_flight_data) {
          flightBookingData.return_flight = {
            airline_name: flight.return_flight_data.return_airline_name,
            flight_number: flight.return_flight_data.return_flight_number,
            airline_code: flight.return_flight_data.return_airline_code,
            departure: {
              city: flight.return_flight_data.return_dep_city_name,
              airport: flight.return_flight_data.return_dep_airport_code,
              time: flight.return_flight_data.return_dep_time,
              date: flight.return_flight_data.return_dep_date,
              terminal: flight.return_flight_data.return_dep_terminal_no,
              city_code: flight.return_flight_data.return_dep_city_code
            },
            arrival: {
              city: flight.return_flight_data.return_arr_city_name,
              airport: flight.return_flight_data.return_arr_airport_code,
              time: flight.return_flight_data.return_arr_time,
              date: flight.return_flight_data.return_arr_date,
              terminal: flight.return_flight_data.return_arr_terminal_no,
              city_code: flight.return_flight_data.return_arr_city_code
            },
            duration: flight.return_flight_data.return_trip_duration,
            number_of_stops: flight.return_no_of_stop || 0,
            stop_data: flight.return_stop_data || []
          };
          
          flightBookingData.return_departure = flightBookingData.return_flight.departure;
          flightBookingData.return_arrival = flightBookingData.return_flight.arrival;
          flightBookingData.return_duration = flightBookingData.return_flight.duration;
        }

        localStorage.setItem('flightBooking', JSON.stringify(flightBookingData));
        
        navigate('/checkoutflights', { 
          state: { 
            tour: flightBookingData,
            source: 'flight-booking'
          } 
        });

      } else {
        throw new Error(fareQuoteResponse.errorMessage || 'Error fetching fare quote');
      }
    } catch (error) {
      console.error('Error fetching fare quote:', error);
      alert('Error preparing booking. Please try again.');
    } finally {
      setPaymentProcessing(false);
    }
  };

  const PassengerModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl w-full max-w-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Select Travellers & Class</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Adults</p>
              <p className="text-sm text-gray-500">Above 12 years</p>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setAdults(Math.max(1, adults - 1))}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-blue-500"
              >
                -
              </button>
              <span className="w-8 text-center font-medium">{adults}</span>
              <button 
                onClick={() => setAdults(Math.min(9, adults + 1))}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-blue-500"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Children</p>
              <p className="text-sm text-gray-500">2-12 years</p>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setChildren(Math.max(0, children - 1))}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-blue-500"
              >
                -
              </button>
              <span className="w-8 text-center font-medium">{children}</span>
              <button 
                onClick={() => setChildren(Math.min(9, children + 1))}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-blue-500"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Infants</p>
              <p className="text-sm text-gray-500">Below 2 years</p>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setInfants(Math.max(0, infants - 1))}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-blue-500"
              >
                -
              </button>
              <span className="w-8 text-center font-medium">{infants}</span>
              <button 
                onClick={() => setInfants(Math.min(9, infants + 1))}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-blue-500"
              >
                +
              </button>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-600 mb-2">Class</p>
            <select 
              value={travelClass}
              onChange={(e) => setTravelClass(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Economy</option>
              <option>Premium Economy</option>
              <option>Business</option>
              <option>First Class</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex space-x-3">
          <button 
            onClick={() => setShowPassengerModal(false)}
            className="flex-1 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            onClick={() => setShowPassengerModal(false)}
            className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );

  const renderFlightCard = (flight: FlightSearchResult | RoundTripFlightSearchResult, index: number) => {
    const charges = getApplicableCharges();
    const totalWithCharges = flight.total_payable_price + charges;

    return (
      <div key={flight.id || index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200 overflow-hidden">
        {/* Airline Header */}
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <FaPlane className="text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">{flight.airline_name}</p>
              <p className="text-sm text-gray-500">{flight.flight_number}</p>
            </div>
          </div>
          {isRoundTripFlight(flight) && flight.international_flight_staus === 1 && (
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
              International
            </span>
          )}
        </div>

        {/* Flight Details */}
        <div className="p-6">
          {/* Onward Flight */}
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            {/* Departure */}
            <div className="text-center md:text-left">
              <p className="text-2xl font-bold text-gray-900">{flight.dep_time}</p>
              <p className="text-sm text-gray-600 mt-1">{flight.dep_airport_code}</p>
              <p className="text-xs text-gray-500">{flight.dep_city_name}</p>
              <p className="text-xs text-gray-400 mt-1">Terminal {flight.dep_terminal_no || 'N/A'}</p>
            </div>

            {/* Flight Path */}
            <div className="flex-1 px-8">
              <div className="text-xs text-gray-500 text-center mb-1">{flight.duration}</div>
              <div className="relative flex items-center justify-center">
                <div className="h-0.5 w-full bg-gray-300"></div>
                <div className="absolute w-2 h-2 bg-blue-600 rounded-full left-0"></div>
                <div className="absolute w-2 h-2 bg-green-600 rounded-full right-0"></div>
                <FaPlane className="absolute text-blue-600 transform rotate-90" />
              </div>
              <div className="text-xs text-gray-500 text-center mt-1">
                {flight.no_of_stop > 0 ? `${flight.no_of_stop} Stop` : 'Non-stop'}
              </div>
            </div>

            {/* Arrival */}
            <div className="text-center md:text-right mt-4 md:mt-0">
              <p className="text-2xl font-bold text-gray-900">{flight.arr_time}</p>
              <p className="text-sm text-gray-600 mt-1">{flight.arr_airport_code}</p>
              <p className="text-xs text-gray-500">{flight.arr_city_name}</p>
              <p className="text-xs text-gray-400 mt-1">Terminal {flight.arr_terminal_no || 'N/A'}</p>
            </div>
          </div>

          {/* Stop Details if any */}
          {flight.stop_data && flight.stop_data.length > 0 && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600">
                Via: {flight.stop_data[0].city_name} ({flight.stop_data[0].city_code}) • 
                Layover: {flight.stop_data[0].stop_duration}
              </p>
            </div>
          )}

          {/* Return Flight if Round Trip */}
          {isRoundTripFlight(flight) && flight.return_flight_data && (
            <>
              <div className="my-4 border-t border-gray-200 pt-4">
                <p className="text-sm font-medium text-gray-500 mb-3">Return Flight</p>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="text-center md:text-left">
                  <p className="text-2xl font-bold text-gray-900">{flight.return_flight_data.return_dep_time}</p>
                  <p className="text-sm text-gray-600 mt-1">{flight.return_flight_data.return_dep_airport_code}</p>
                  <p className="text-xs text-gray-500">{flight.return_flight_data.return_dep_city_name}</p>
                </div>

                <div className="flex-1 px-8">
                  <div className="text-xs text-gray-500 text-center mb-1">{flight.return_flight_data.return_trip_duration} hrs</div>
                  <div className="relative flex items-center justify-center">
                    <div className="h-0.5 w-full bg-gray-300"></div>
                    <div className="absolute w-2 h-2 bg-orange-600 rounded-full left-0"></div>
                    <div className="absolute w-2 h-2 bg-green-600 rounded-full right-0"></div>
                    <FaPlane className="absolute text-orange-600 transform -rotate-90" />
                  </div>
                </div>

                <div className="text-center md:text-right mt-4 md:mt-0">
                  <p className="text-2xl font-bold text-gray-900">{flight.return_flight_data.return_arr_time}</p>
                  <p className="text-sm text-gray-600 mt-1">{flight.return_flight_data.return_arr_airport_code}</p>
                  <p className="text-xs text-gray-500">{flight.return_flight_data.return_arr_city_name}</p>
                </div>
              </div>
            </>
          )}

          {/* Baggage Info */}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center text-gray-600">
              <FaSuitcase className="mr-1 text-gray-400" />
              <span>Check-in: Adult {flight.check_in_baggage_adult}kg, Child {flight.check_in_baggage_children}kg, Infant {flight.check_in_baggage_infant}kg</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FaSuitcase className="mr-1 text-gray-400" />
              <span>Cabin: Adult {flight.cabin_baggage_adult}kg, Child {flight.cabin_baggage_children}kg, Infant {flight.cabin_baggage_infant}kg</span>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total for {adults + children + infants} passengers</p>
              <p className="text-2xl font-bold text-blue-600">₹{totalWithCharges.toLocaleString()}</p>
              <div className="text-xs text-gray-500 space-y-1 mt-1">
                <div>Base fare: ₹{flight.total_payable_price.toLocaleString()}</div>
                {charges > 0 && (
                  <div>Service fee: + ₹{charges.toLocaleString()}</div>
                )}
              </div>
              <p className="text-xs text-red-500 mt-1">{flight.available_seats} seats left</p>
            </div>
            <button
              onClick={() => handleBookFlight(flight)}
              disabled={paymentProcessing}
              className="px-8 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {paymentProcessing ? 'Processing...' : 'Book Now'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-8 sm:px-6 lg:px-18 py-8">
      {/* Header with Trip Type */}
      <div className="flex items-center mb-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900">Flights</h1>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                selectedTripType === 1 
                  ? 'bg-white shadow-md text-blue-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setSelectedTripType(1)}
              disabled={loading || paymentProcessing}
            >
              <span className="flex items-center space-x-2">
                <FaRedoAlt className="text-xs" />
                <span>Round Trip</span>
              </span>
            </button>
            <button
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                selectedTripType === 0 
                  ? 'bg-white shadow-md text-blue-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setSelectedTripType(0)}
              disabled={loading || paymentProcessing}
            >
              <span className="flex items-center space-x-2">
                <FaArrowRight className="text-xs" />
                <span>One Way</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Search Bar */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-8">
        <div className="flex items-center divide-x divide-gray-200">
          {/* From */}
          <div className="flex-1 relative group hover:bg-gray-50 transition-colors mt-3">
            <div className="absolute -top-2.5 left-4 z-10">
              <span className="bg-white px-1.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">From</span>
            </div>
            <div className="flex items-center px-5 pt-6 pb-4">
              <FaPlaneDeparture className="text-blue-500 mr-3 flex-shrink-0" size={18} />
              <select 
                value={selectedDeparture} 
                onChange={(e) => handleDepartureChange(e.target.value)}
                disabled={loading || paymentProcessing}
                className="w-full bg-transparent border-none focus:outline-none text-base font-medium text-gray-900 pr-8 appearance-none cursor-pointer"
              >
                <option value="" className="text-gray-400">Select City</option>
                {departureCities.map(city => (
                  <option key={city.city_code} value={city.city_code}>
                    {city.city_name} ({city.airport_code})
                  </option>
                ))}
              </select>
              <FaChevronDown className="text-gray-400 text-sm absolute right-4" />
            </div>
          </div>

          {/* To */}
          <div className="flex-1 relative group hover:bg-gray-50 transition-colors mt-3">
            <div className="absolute -top-2.5 left-4 z-10">
              <span className="bg-white px-1.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">To</span>
            </div>
            <div className="flex items-center px-5 pt-6 pb-4">
              <FaPlaneArrival className="text-orange-500 mr-3 flex-shrink-0" size={18} />
              <select 
                value={selectedArrival} 
                onChange={(e) => handleArrivalChange(e.target.value)}
                disabled={!selectedDeparture || loading || paymentProcessing}
                className="w-full bg-transparent border-none focus:outline-none text-base font-medium text-gray-900 pr-8 appearance-none cursor-pointer"
              >
                <option value="" className="text-gray-400">Select City</option>
                {arrivalCities.map(city => (
                  <option key={city.city_code} value={city.city_code}>
                    {city.city_name} ({city.airport_code})
                  </option>
                ))}
              </select>
              <FaChevronDown className="text-gray-400 text-sm absolute right-4" />
            </div>
          </div>

          {/* Departure Date */}
          <div className="flex-1 relative group hover:bg-gray-50 transition-colors mt-3">
            <div className="absolute -top-2.5 left-4 z-10">
              <span className="bg-white px-1.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Departure</span>
            </div>
            <div className="flex items-center px-5 pt-6 pb-4">
              <FaCalendarAlt className="text-green-500 mr-3 flex-shrink-0" size={16} />
              <select 
                value={selectedOnwardDate} 
                onChange={(e) => handleOnwardDateChange(e.target.value)}
                disabled={!selectedArrival || loading || paymentProcessing}
                className="w-full bg-transparent border-none focus:outline-none text-base font-medium text-gray-900 pr-8 appearance-none cursor-pointer"
              >
                <option value="" className="text-gray-400">Select Date</option>
                {onwardDates.map((date, index) => (
                  <option key={index} value={date.onward_date}>
                    {new Date(date.onward_date).toLocaleDateString('en-US', { 
                      day: 'numeric', 
                      month: 'short',
                      year: 'numeric'
                    })}
                  </option>
                ))}
              </select>
              <FaChevronDown className="text-gray-400 text-sm absolute right-4" />
            </div>
          </div>

          {/* Return Date */}
          <div className="flex-1 relative group hover:bg-gray-50 transition-colors mt-3">
            <div className="absolute -top-2.5 left-4 z-10">
              <span className="bg-white px-1.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Return</span>
            </div>
            <div className="flex items-center px-5 pt-6 pb-4">
              <FaCalendarAlt className={`mr-3 flex-shrink-0 ${selectedTripType === 1 ? 'text-purple-500' : 'text-gray-300'}`} size={16} />
              {selectedTripType === 1 ? (
                <select 
                  value={selectedReturnDate} 
                  onChange={(e) => setSelectedReturnDate(e.target.value)}
                  disabled={!selectedOnwardDate || loading || paymentProcessing || returnDates.length === 0}
                  className="w-full bg-transparent border-none focus:outline-none text-base font-medium text-gray-900 pr-8 appearance-none cursor-pointer disabled:text-gray-400"
                >
                  <option value="" className="text-gray-400">Select Date</option>
                  {returnDates.map((date, index) => (
                    <option key={index} value={date.return_date}>
                      {new Date(date.return_date).toLocaleDateString('en-US', { 
                        day: 'numeric', 
                        month: 'short',
                        year: 'numeric'
                      })}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="w-full text-base text-gray-400 py-1">Not required</div>
              )}
              {selectedTripType === 1 && <FaChevronDown className="text-gray-400 text-sm absolute right-4" />}
            </div>
          </div>

          {/* Travellers & Class */}
          <div className="flex-1 relative group hover:bg-gray-50 transition-colors mt-3 cursor-pointer" onClick={() => setShowPassengerModal(true)}>
            <div className="absolute -top-2.5 left-4 z-10">
              <span className="bg-white px-1.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Travellers</span>
            </div>
            <div className="flex items-center px-5 pt-6 pb-4">
              <FaUsers className="text-pink-500 mr-3 flex-shrink-0" size={18} />
              <div className="flex-1 text-base font-medium text-gray-900 truncate">
                {adults + children + infants} Traveller{(adults + children + infants) > 1 ? 's' : ''}
                <span className="text-sm font-normal text-gray-500 ml-1">({travelClass})</span>
              </div>
              <FaChevronDown className="text-gray-400 text-sm ml-2 flex-shrink-0" />
            </div>
          </div>

          {/* Search Button */}
          <button 
            onClick={handleSearch} 
            disabled={loading || paymentProcessing || !selectedDeparture || !selectedArrival || !selectedOnwardDate || (selectedTripType === 1 && !selectedReturnDate)}
            className="px-10 py-6 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-3 min-w-[160px] justify-center text-base"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Searching...</span>
              </>
            ) : (
              <>
                <FaSearch size={16} />
                <span>Search</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Passenger Modal */}
      {showPassengerModal && <PassengerModal />}

      {/* Loading Overlay */}
      {(loading || paymentProcessing) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-700 font-medium">
              {paymentProcessing ? 'Processing payment...' : 'Searching for best flights...'}
            </p>
          </div>
        </div>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && !loading && !paymentProcessing && (
        <div className="space-y-4 mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              {searchResults.length} Flight{searchResults.length > 1 ? 's' : ''} Found
            </h2>
            {/* <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
              <option>Sort by: Price (Low to High)</option>
              <option>Sort by: Price (High to Low)</option>
              <option>Sort by: Duration</option>
              <option>Sort by: Departure</option>
            </select> */}
          </div>
          <div className="space-y-4">
            {searchResults.map((flight, index) => renderFlightCard(flight, index))}
          </div>
        </div>
      )}

      {/* No Results */}
      {searchResults.length === 0 && !loading && !paymentProcessing && selectedDeparture && selectedArrival && selectedOnwardDate && (
        <div className="text-center py-16 mt-8">
          <div className="text-6xl mb-4">✈️</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No flights found</h3>
          <p className="text-gray-600">Try different dates or cities</p>
        </div>
      )}
    </div>
  );
};

export default FlightSearchRoundTrip;