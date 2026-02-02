import React, { useState, useEffect } from "react";
import { MdFlightTakeoff, MdCheck } from "react-icons/md";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeatSelection from "./Seatselection";
import BookingConfirmation from './BookingConfirmation';

// Define types for API responses
interface Airport {
  airport_name: string;
  airport_code: string;
  city_name: string;
  city_code: string;
}

interface DateResponse {
  onward_date?: string;
  return_date?: string;
}

interface DepartureResponse {
  replyCode: string;
  replyMsg: string;
  data: Airport[];
}

interface DateListResponse {
  replyCode: string;
  replyMsg: string;
  data: DateResponse[];
}

interface StopData {
  city_name: string;
  city_code: string;
  stop_duration: string;
  arrival_time: string;
  arrival_date: string;
  arrival_terminal: string;
  departure_time: string;
  departure_date: string;
  departure_terminal: string;
}

interface ConnectingFlight {
  flight_number: string;
  airline_name: string;
  airline_code: string;
  departure_city_name: string;
  departure_city_code: string;
  departure_airport_name: string;
  departure_airport_code: string;
  departure_terminal_no: string;
  departure_date: string;
  departure_time: string;
  arrival_city_name: string;
  arrival_city_code: string;
  arrival_airport_code: string;
  arrival_airport_name?: string;
  arrival_terminal_no: string;
  arrival_date: string;
  arrival_time: string;
}

interface FareClass {
  Class_Code: string;
  Class_Desc: string;
}

interface ReturnFlightData {
  return_flight_number: string;
  return_trip_duration: number;
  return_dep_date: string;
  return_dep_city_name: string;
  return_dep_city_code: string;
  return_dep_airport_name: string;
  return_dep_airport_code: string;
  return_dep_terminal_no: string;
  return_dep_time: string;
  return_arr_date: string;
  return_arr_city_name: string;
  return_arr_city_code: string;
  return_arr_airport_name: string;
  return_arr_airport_code: string;
  return_arr_terminal_no: string;
  return_arr_time: string;
}

interface PriceBreakup {
  base_fare: number;
  fee_taxes?: number;
  service_charge?: number;
  discount?: number;
}

interface FlightSearchResult {
  id: string;
  flight_number: string;
  airline_name: string;
  airline_code: string;
  dep_city_name: string;
  dep_city_code: string;
  dep_airport_name: string;
  dep_airport_code: string;
  dep_terminal_no: string;
  onward_date: string;
  dep_time: string;
  arr_city_name: string;
  arr_city_code: string;
  arr_airport_name: string;
  arr_airport_code: string;
  arr_terminal_no: string;
  arr_date: string;
  arr_time: string;
  duration: string;
  trip_type: number;
  international_flight_staus: number;
  check_in_baggage_adult: string;
  check_in_baggage_children: string;
  check_in_baggage_infant: string;
  cabin_baggage_adult: string;
  cabin_baggage_children: string;
  cabin_baggage_infant: string;
  available_seats: number;
  total_payable_price: number;
  per_adult_child_price: number;
  per_infant_price: number;
  price_breakup: PriceBreakup;
  no_of_stop: number;
  stop_data: StopData[];
  return_flight_data?: ReturnFlightData;
  return_no_of_stop: number;
  return_stop_data: StopData[];
  onward_connecting: ConnectingFlight[];
  return_connecting: ConnectingFlight[];
  static: string;
  FareClasses: FareClass[];
  ProductClass: string;
}

interface SearchResponse {
  errorCode: number;
  data: FlightSearchResult[];
  booking_token_id: string;
}

interface PassengerDetails {
  id: number;
  type: 'adult' | 'child' | 'infant';
  name: string;
  firstName: string;
  middleName: string;
  lastName: string;
  age: number;
  dob: string;
  gender: 'Mr' | 'Mrs' | 'Ms' | 'Mstr';
  seatNumber?: string;
  returnSeatNumber?: string;
  requiresSeat: boolean;
  icon: React.ReactNode;
  isInfantOnLap?: boolean;
  lapOfPassengerId?: number;
  passportNo?: string;
  passportExpireDate?: string;
}

interface ContactInfo {
  name: string;
  email: string;
  phone: string;
}

const FlightHotels: React.FC = () => {
  // Search states
  const [tripType, setTripType] = useState<number>(0); // 0 = One Way, 1 = Round Trip
  const [from, setFrom] = useState("Bengaluru, India");
  const [to, setTo] = useState("New Delhi, India");
  const [fromCode, setFromCode] = useState("BLR");
  const [toCode, setToCode] = useState("DEL");
  const [showDepart, setShowDepart] = useState(false);
  const [showReturn, setShowReturn] = useState(false);
  const [showTravellers, setShowTravellers] = useState(false);
  const [showFromSearch, setShowFromSearch] = useState(false);
  const [showToSearch, setShowToSearch] = useState(false);
  const [departDate, setDepartDate] = useState("Wed, 21 Jan 26");
  const [returnDate, setReturnDate] = useState("Select Return");
  const [departDateApi, setDepartDateApi] = useState("2026-01-21");
  const [returnDateApi, setReturnDateApi] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [travelClass, setTravelClass] = useState("Economy/Pt");
  const [showResults, setShowResults] = useState(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(2026, 0, 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(2026, 0, 21));
  const [fareType, setFareType] = useState("Regular");
  const [activeFilters, setActiveFilters] = useState<string[]>(["NON STOP"]);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  
  // API data states
  const [departureCities, setDepartureCities] = useState<Airport[]>([]);
  const [arrivalCities, setArrivalCities] = useState<Airport[]>([]);
  const [onwardDates, setOnwardDates] = useState<string[]>([]);
  const [returnDates, setReturnDates] = useState<string[]>([]);
  const [loadingDepartures, setLoadingDepartures] = useState(false);
  const [loadingArrivals, setLoadingArrivals] = useState(false);
  const [loadingOnwardDates, setLoadingOnwardDates] = useState(false);
  const [loadingReturnDates, setLoadingReturnDates] = useState(false);
  const [searchFromQuery, setSearchFromQuery] = useState("");
  const [searchToQuery, setSearchToQuery] = useState("");
  const [filteredDepartures, setFilteredDepartures] = useState<Airport[]>([]);
  const [filteredArrivals, setFilteredArrivals] = useState<Airport[]>([]);
  const [searchResults, setSearchResults] = useState<FlightSearchResult[]>([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [bookingTokenId, setBookingTokenId] = useState<string>("");

  // Flow control states
  const [currentStep, setCurrentStep] = useState<'search' | 'seat-selection' | 'confirmation'>('search');
  const [selectedFlightForSeats, setSelectedFlightForSeats] = useState<FlightSearchResult | null>(null);
  const [fareQuoteData, setFareQuoteData] = useState<any>(null);
  const [loadingSeats, setLoadingSeats] = useState(false);
  
  // Booking confirmation states
  const [bookingData, setBookingData] = useState<any>(null);
  const [bookingReferenceId, setBookingReferenceId] = useState<string>("");
  const [passengerDetails, setPassengerDetails] = useState<PassengerDetails[]>([]);
  const [contactDetails, setContactDetails] = useState<ContactInfo>({
    name: "Test User",
    email: "test@example.com",
    phone: "9876543210"
  });

  const swapLocations = () => {
    const tempFrom = from;
    const tempFromCode = fromCode;
    const tempTo = to;
    const tempToCode = toCode;
    setFrom(tempTo);
    setFromCode(tempToCode);
    setTo(tempFrom);
    setToCode(tempFromCode);
  };

  const handleTripTypeChange = (type: number) => {
    setTripType(type);
    if (type === 0) {
      // One way - reset return date
      setReturnDate("Select Return");
      setReturnDateApi("");
    } else if (type === 1 && fromCode && toCode && departDateApi) {
      // Round trip - fetch return dates
      fetchReturnDates(fromCode, toCode, departDateApi);
    }
  };

  const handleSearch = async () => {
    if (!fromCode || !toCode || !departDateApi) {
      alert("Please select departure and arrival cities and departure date");
      return;
    }

    if (tripType === 1 && !returnDateApi) {
      alert("Please select return date for round trip");
      return;
    }

    setLoadingSearch(true);
    setSearchError(null);
    setShowResults(true);
    setBookingTokenId("");

    try {
      const searchPayload = {
        trip_type: tripType, // Use dynamic trip type
        end_user_ip: "183.83.43.117",
        token: "3-1-NEWTEST-dmjkwj78BJHk8",
        dep_city_code: fromCode,
        arr_city_code: toCode,
        onward_date: departDateApi,
        return_date: returnDateApi || "",
        adult: adults,
        children: children,
        infant: infants,
      };

      const res = await fetch("https://devapi.flightapi.co.in/v1/fbapi/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(searchPayload),
      });

      const data: SearchResponse = await res.json();

      if (data.errorCode === 0 && data.data && data.data.length > 0) {
        setSearchResults(data.data);
        if (data.booking_token_id) {
          setBookingTokenId(data.booking_token_id);
        } else {
          console.warn("No booking_token_id in response");
        }
      } else {
        setSearchResults([]);
        setSearchError("No flights found for the selected criteria");
      }
    } catch (err) {
      console.error("Search error:", err);
      setSearchError("Failed to search flights. Please try again.");
      setSearchResults([]);
    } finally {
      setLoadingSearch(false);
    }
  };

  const fareTypes = ["Regular", "Student", "Armed Forces", "Senior Citizen", "Doctor and Nurses"];

  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter((f) => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const availableFilters = [
    "NON STOP",
    "Refundable Fares",
    "1 Stop",
    "Air India Express",
    "Early Departure",
    "Late Departure",
    "Early Arrival",
    "Late Arrival",
  ];

  const visibleFilters = showMoreFilters
    ? availableFilters
    : ["NON STOP", "Refundable Fares", "1 Stop", "Air India Express", "+2 more"];

  useEffect(() => {
    fetchDepartureCities();
  }, []);

  useEffect(() => {
    if (fromCode) fetchArrivalCities(fromCode);
  }, [fromCode]);

  useEffect(() => {
    if (fromCode && toCode) fetchOnwardDates(fromCode, toCode);
  }, [fromCode, toCode]);

  useEffect(() => {
    if (searchFromQuery) {
      const filtered = departureCities.filter(
        (city) =>
          city.city_name.toLowerCase().includes(searchFromQuery.toLowerCase()) ||
          city.airport_code.toLowerCase().includes(searchFromQuery.toLowerCase())
      );
      setFilteredDepartures(filtered);
    } else {
      setFilteredDepartures(departureCities);
    }
  }, [searchFromQuery, departureCities]);

  useEffect(() => {
    if (searchToQuery) {
      const filtered = arrivalCities.filter(
        (city) =>
          city.city_name.toLowerCase().includes(searchToQuery.toLowerCase()) ||
          city.airport_code.toLowerCase().includes(searchToQuery.toLowerCase())
      );
      setFilteredArrivals(filtered);
    } else {
      setFilteredArrivals(arrivalCities);
    }
  }, [searchToQuery, arrivalCities]);

  const fetchDepartureCities = async () => {
    setLoadingDepartures(true);
    try {
      const res = await fetch("https://devapi.flightapi.co.in/v1/fbapi/dep_city", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trip_type: 0, // Use 0 for one-way initially
          end_user_ip: "183.83.43.117",
          token: "3-1-NEWTEST-dmjkwj78BJHk8",
        }),
      });
      const data: DepartureResponse = await res.json();
      if (data.replyCode === "success" && data.data?.length > 0) {
        setDepartureCities(data.data);
        setFilteredDepartures(data.data);
        const def = data.data[0];
        setFrom(`${def.city_name}, India`);
        setFromCode(def.city_code);
      }
    } catch (err) {
      console.error("dep_city error", err);
    } finally {
      setLoadingDepartures(false);
    }
  };

  const fetchArrivalCities = async (cityCode: string) => {
    setLoadingArrivals(true);
    try {
      const res = await fetch("https://devapi.flightapi.co.in/v1/fbapi/arr_city", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trip_type: 0, // Use 0 for one-way
          end_user_ip: "183.83.43.117",
          token: "3-1-NEWTEST-dmjkwj78BJHk8",
          city_code: cityCode,
        }),
      });
      const data: DepartureResponse = await res.json();
      if (data.replyCode === "success" && data.data?.length > 0) {
        setArrivalCities(data.data);
        setFilteredArrivals(data.data);
        const def = data.data[0];
        setTo(`${def.city_name}, India`);
        setToCode(def.city_code);
      }
    } catch (err) {
      console.error("arr_city error", err);
    } finally {
      setLoadingArrivals(false);
    }
  };

  const fetchOnwardDates = async (dep: string, arr: string) => {
    setLoadingOnwardDates(true);
    try {
      const res = await fetch("https://devapi.flightapi.co.in/v1/fbapi/onward_date", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trip_type: tripType, // Use dynamic trip type
          end_user_ip: "183.83.43.117",
          token: "3-1-NEWTEST-dmjkwj78BJHk8",
          dep_city_code: dep,
          arr_city_code: arr,
        }),
      });
      const data: DateListResponse = await res.json();
      if (data.replyCode === "success") {
        const dates = data.data
          .map((d) => d.onward_date)
          .filter((d): d is string => !!d);
        setOnwardDates(dates);
        if (dates.length > 0) {
          const first = dates[0];
          setDepartDateApi(first);
          setDepartDate(formatApiDate(first));
          setSelectedDate(new Date(first));
          setCurrentMonth(new Date(first));
          
          // If round trip, fetch return dates after setting onward date
          if (tripType === 1) {
            fetchReturnDates(dep, arr, first);
          }
        }
      }
    } catch (err) {
      console.error("onward_date error", err);
    } finally {
      setLoadingOnwardDates(false);
    }
  };

  const fetchReturnDates = async (dep: string, arr: string, onward: string) => {
    setLoadingReturnDates(true);
    try {
      const res = await fetch("https://devapi.flightapi.co.in/v1/fbapi/return_date", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trip_type: 1, // Always use 1 for return date
          end_user_ip: "183.83.43.117",
          token: "3-1-NEWTEST-dmjkwj78BJHk8",
          dep_city_code: dep,
          arr_city_code: arr,
          onward_date: onward,
        }),
      });
      const data: DateListResponse = await res.json();
      if (data.replyCode === "success") {
        const dates = data.data
          .map((d) => d.return_date)
          .filter((d): d is string => !!d);
        setReturnDates(dates);
        if (dates.length > 0) {
          const first = dates[0];
          setReturnDateApi(first);
          setReturnDate(formatApiDate(first));
        } else {
          setReturnDateApi("");
          setReturnDate("Select Return");
        }
      }
    } catch (err) {
      console.error("return_date error", err);
      setReturnDates([]);
    } finally {
      setLoadingReturnDates(false);
    }
  };

  const handleFromSelect = (city: Airport) => {
    setFrom(`${city.city_name}, India`);
    setFromCode(city.city_code);
    setShowFromSearch(false);
    setSearchFromQuery("");
  };

  const handleToSelect = (city: Airport) => {
    setTo(`${city.city_name}, India`);
    setToCode(city.city_code);
    setShowToSearch(false);
    setSearchToQuery("");
  };

  const formatApiDate = (apiDate: string) => {
    const d = new Date(apiDate);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear().toString().slice(-2)}`;
  };

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const handleDateSelect = (date: Date) => {
    const apiDate = date.toISOString().split("T")[0];
    const display = formatApiDate(apiDate);

    if (showDepart) {
      setDepartDate(display);
      setDepartDateApi(apiDate);
      setShowDepart(false);
      if (tripType === 1 && fromCode && toCode) {
        fetchReturnDates(fromCode, toCode, apiDate);
      }
    } else if (showReturn) {
      setReturnDate(display);
      setReturnDateApi(apiDate);
      setShowReturn(false);
    }
    setSelectedDate(date);
  };

  const handleSelectFlight = async (flight: FlightSearchResult) => {
    setLoadingSeats(true);
    
    try {
      const fareQuotePayload = {
        id: flight.id,
        end_user_ip: "183.83.43.117",
        token: "3-1-NEWTEST-dmjkwj78BJHk8",
        adult_children: adults + children,
        infant: infants,
        onward_date: departDateApi,
        return_date: returnDateApi || "",
        static: flight.static,
        ...(bookingTokenId && { booking_token_id: bookingTokenId })
      };

      console.log("Calling fare_quote API with:", fareQuotePayload);

      const res = await fetch("https://devapi.flightapi.co.in/v1/fbapi/fare_quote", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(fareQuotePayload),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();
      console.log("Fare quote API response:", data);

      if (data.errorCode === 0) {
        setSelectedFlightForSeats(flight);
        setFareQuoteData({
          ...data.data,
          booking_token_id: bookingTokenId
        });
        setCurrentStep('seat-selection');
      } else {
        alert(`Failed to fetch seat details: ${data.message || "Unknown error"}`);
      }
    } catch (err: any) {
      console.error("Fare quote error:", err);
      alert(`Error: ${err.message || "Failed to fetch seat information"}`);
    } finally {
      setLoadingSeats(false);
    }
  };

  const handleBookingComplete = (bookingResponse: any) => {
    console.log("Booking completed:", bookingResponse);
    setBookingData(bookingResponse.bookingData);
    setBookingReferenceId(bookingResponse.referenceId);
    setPassengerDetails(bookingResponse.passengerDetails);
    setContactDetails(bookingResponse.contactDetails);
    setCurrentStep('confirmation');
  };

  const handleBackFromSeats = () => {
    setCurrentStep('search');
    setSelectedFlightForSeats(null);
    setFareQuoteData(null);
  };

  const handleBackFromConfirmation = () => {
    setCurrentStep('search');
    setBookingData(null);
    setBookingReferenceId("");
    setPassengerDetails([]);
  };

  const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y: number, m: number) => new Date(y, m, 1).getDay();

  const isDateAvailable = (date: Date) => {
    const apiDate = date.toISOString().split("T")[0];
    if (showDepart) return onwardDates.includes(apiDate);
    if (showReturn) return returnDates.includes(apiDate);
    return false;
  };

  const renderCalendar = () => {
    const y = currentMonth.getFullYear();
    const m = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(y, m);
    const firstDay = getFirstDayOfMonth(y, m);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} style={emptyDayStyle} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(y, m, day);
      const isAvailable = isDateAvailable(date);
      const isSelected =
        selectedDate &&
        date.getDate() === selectedDate.getDate() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear();
      const isToday = date.toDateString() === new Date().toDateString();

      days.push(
        <button
          key={day}
          disabled={!isAvailable}
          style={{
            ...dayStyle,
            ...(isAvailable
              ? {
                  border: "2px solid #008cff",
                  color: isSelected ? "#fff" : "#008cff",
                  background: isSelected ? "#008cff" : "transparent",
                  fontWeight: "bold",
                }
              : {
                  color: "#aaa",
                  background: "#f8f9fa",
                  cursor: "not-allowed",
                }),
            ...(isToday && !isSelected ? { border: "1px solid #666", fontWeight: "bold" } : {}),
          }}
          onClick={() => isAvailable && handleDateSelect(date)}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const renderFlightCard = (flight: FlightSearchResult) => {
    const isRoundTrip = flight.trip_type === 1 || !!flight.return_flight_data;

    return (
      <div key={flight.id} style={flightCard}>
        <div style={{ flex: 1 }}>
          {/* Onward Flight */}
          <div style={{ marginBottom: isRoundTrip ? "20px" : "0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <strong style={{ fontSize: "18px" }}>{flight.airline_name} ({flight.airline_code}{flight.flight_number})</strong>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "8px" }}>
                  <div>
                    <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                      {formatTime(flight.dep_time)}
                    </span>
                    <p style={{ fontSize: "12px", color: "#666", margin: "2px 0" }}>
                      {flight.dep_city_name} ({flight.dep_airport_code})
                    </p>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <span style={{ fontSize: "12px", color: "#666" }}>{flight.duration}</span>
                    <div style={{ width: "60px", height: "1px", background: "#ccc", margin: "4px auto" }}></div>
                    <span style={{ fontSize: "12px", color: "#666" }}>
                      {flight.no_of_stop === 0 ? "Non-stop" : `${flight.no_of_stop} Stop${flight.no_of_stop > 1 ? 's' : ''}`}
                    </span>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                      {formatTime(flight.arr_time)}
                    </span>
                    <p style={{ fontSize: "12px", color: "#666", margin: "2px 0" }}>
                      {flight.arr_city_name} ({flight.arr_airport_code})
                    </p>
                  </div>
                </div>
                <p style={{ margin: "4px 0", color: "#666", fontSize: "12px" }}>
                  Date: {formatApiDate(flight.onward_date)}
                </p>
              </div>
            </div>
          </div>

          {/* Return Flight (if round trip) */}
          {isRoundTrip && flight.return_flight_data && (
            <div style={{ paddingTop: "15px", borderTop: "1px dashed #ddd" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <strong style={{ fontSize: "16px", color: "#666" }}>Return Flight</strong>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "8px" }}>
                    <div>
                      <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                        {formatTime(flight.return_flight_data.return_dep_time)}
                      </span>
                      <p style={{ fontSize: "12px", color: "#666", margin: "2px 0" }}>
                        {flight.return_flight_data.return_dep_city_name} ({flight.return_flight_data.return_dep_airport_code})
                      </p>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <span style={{ fontSize: "12px", color: "#666" }}>{flight.return_flight_data.return_trip_duration}h</span>
                      <div style={{ width: "60px", height: "1px", background: "#ccc", margin: "4px auto" }}></div>
                      <span style={{ fontSize: "12px", color: "#666" }}>
                        {flight.return_no_of_stop === 0 ? "Non-stop" : `${flight.return_no_of_stop} Stop${flight.return_no_of_stop > 1 ? 's' : ''}`}
                      </span>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                        {formatTime(flight.return_flight_data.return_arr_time)}
                      </span>
                      <p style={{ fontSize: "12px", color: "#666", margin: "2px 0" }}>
                        {flight.return_flight_data.return_arr_city_name} ({flight.return_flight_data.return_arr_airport_code})
                      </p>
                    </div>
                  </div>
                  <p style={{ margin: "4px 0", color: "#666", fontSize: "12px" }}>
                    Date: {formatApiDate(flight.return_flight_data.return_dep_date)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Passengers count */}
          <div style={{ marginTop: "12px", padding: "8px", background: "#f5f5f5", borderRadius: "4px", display: "inline-block" }}>
            <span style={{ fontSize: "12px", color: "#666" }}>
              {adults} Adult{adults > 1 ? 's' : ''}{children > 0 ? `, ${children} Child${children > 1 ? 'ren' : ''}` : ''}{infants > 0 ? `, ${infants} Infant${infants > 1 ? 's' : ''}` : ''}
            </span>
          </div>
        </div>

        <div style={{ textAlign: "right", minWidth: "180px", marginLeft: "20px" }}>
          <div style={{ fontSize: "26px", fontWeight: "bold", color: "#1a1a1a" }}>
            ₹ {flight.total_payable_price.toLocaleString("en-IN")}
          </div>

          <button 
            style={{
              ...selectBtn,
              ...(loadingSeats && selectedFlightForSeats?.id === flight.id 
                ? { backgroundColor: "#ccc", cursor: "not-allowed" } 
                : {})
            }} 
            onClick={() => handleSelectFlight(flight)}
            disabled={loadingSeats && selectedFlightForSeats?.id === flight.id}
          >
            {loadingSeats && selectedFlightForSeats?.id === flight.id ? "LOADING..." : "SELECT"}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      {/* Show Search UI when in search step */}
      {currentStep === 'search' && (
        <>
          {/* SEARCH CARD */}
          <div style={cardStyle}>
            {/* Trip Type Selection */}
            <div style={tripTypeContainer}>
              <div style={tripTypeWrapper}>
                <button
                  style={tripType === 0 ? activeTripTypeBtn : tripTypeBtn}
                  onClick={() => handleTripTypeChange(0)}
                >
                  {tripType === 0 && <MdCheck style={checkIcon} />}
                  One Way
                </button>
                <button
                  style={tripType === 1 ? activeTripTypeBtn : tripTypeBtn}
                  onClick={() => handleTripTypeChange(1)}
                >
                  {tripType === 1 && <MdCheck style={checkIcon} />}
                  Round Trip
                </button>
              </div>
            </div>

            <div style={row}>
              {/* FROM */}
              <div style={{ position: "relative", flex: 1 }}>
                <div style={boxStyle} onClick={() => setShowFromSearch(true)}>
                  <small style={{ color: "#666", fontSize: "12px" }}>FROM</small>
                  <h3 style={{ margin: "4px 0" }}>{from}</h3>
                  <p style={{ fontSize: "12px", color: "#666", margin: 0 }}>{fromCode}</p>
                </div>

                {showFromSearch && (
                  <div style={citySearchModal}>
                    <input
                      type="text"
                      placeholder="Search departure city..."
                      style={searchInput}
                      value={searchFromQuery}
                      onChange={(e) => setSearchFromQuery(e.target.value)}
                      autoFocus
                    />
                    <div style={cityList}>
                      {loadingDepartures ? (
                        <div style={{ padding: "20px", textAlign: "center" }}>Loading...</div>
                      ) : filteredDepartures.length > 0 ? (
                        filteredDepartures.map((city) => (
                          <div key={city.city_code} style={cityItem} onClick={() => handleFromSelect(city)}>
                            <div>
                              <strong>{city.city_name}</strong>
                              <p style={{ fontSize: "12px", color: "#666", margin: 0 }}>
                                {city.airport_name} ({city.airport_code})
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div style={{ padding: "20px", textAlign: "center" }}>No cities found</div>
                      )}
                    </div>
                    <button
                      style={closeBtn}
                      onClick={() => {
                        setShowFromSearch(false);
                        setSearchFromQuery("");
                      }}
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>

              <div style={swapStyle} onClick={swapLocations}>
                <HiOutlineSwitchHorizontal />
              </div>

              {/* TO */}
              <div style={{ position: "relative", flex: 1 }}>
                <div style={boxStyle} onClick={() => setShowToSearch(true)}>
                  <small style={{ color: "#666", fontSize: "12px" }}>TO</small>
                  <h3 style={{ margin: "4px 0" }}>{to}</h3>
                  <p style={{ fontSize: "12px", color: "#666", margin: 0 }}>{toCode}</p>
                </div>

                {showToSearch && (
                  <div style={citySearchModal}>
                    <input
                      type="text"
                      placeholder="Search arrival city..."
                      style={searchInput}
                      value={searchToQuery}
                      onChange={(e) => setSearchToQuery(e.target.value)}
                      autoFocus
                    />
                    <div style={cityList}>
                      {loadingArrivals ? (
                        <div style={{ padding: "20px", textAlign: "center" }}>Loading...</div>
                      ) : filteredArrivals.length > 0 ? (
                        filteredArrivals.map((city) => (
                          <div key={city.city_code} style={cityItem} onClick={() => handleToSelect(city)}>
                            <div>
                              <strong>{city.city_name}</strong>
                              <p style={{ fontSize: "12px", color: "#666", margin: 0 }}>
                                {city.airport_name} ({city.airport_code})
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div style={{ padding: "20px", textAlign: "center" }}>No cities found</div>
                      )}
                    </div>
                    <button
                      style={closeBtn}
                      onClick={() => {
                        setShowToSearch(false);
                        setSearchToQuery("");
                      }}
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>

              <div style={boxStyle} onClick={() => setShowDepart(true)}>
                <small style={{ color: "#666", fontSize: "12px" }}>DEPART</small>
                <h3 style={{ margin: "4px 0" }}>{departDate}</h3>
                {loadingOnwardDates && <small style={{ color: "#008cff" }}>Loading...</small>}
              </div>

              {tripType === 1 && (
                <div style={boxStyle} onClick={() => setShowReturn(true)}>
                  <small style={{ color: "#666", fontSize: "12px" }}>RETURN</small>
                  <h3
                    style={{
                      margin: "4px 0",
                      color: returnDate === "Select Return" ? "#888" : "#000",
                    }}
                  >
                    {returnDate}
                  </h3>
                  {loadingReturnDates && <small style={{ color: "#008cff" }}>Loading...</small>}
                </div>
              )}

              <div style={boxStyle} onClick={() => setShowTravellers(true)}>
                <small style={{ color: "#666", fontSize: "12px" }}>PASSENGERS & CLASS</small>
                <h3 style={{ margin: "4px 0" }}>
                  {adults + children + infants}{" "}
                  {adults + children + infants === 1 ? "Adult" : "Adults"}, {travelClass}
                </h3>
              </div>

              <button style={searchBtn} onClick={handleSearch} disabled={loadingSearch}>
                {loadingSearch ? "SEARCHING..." : "SEARCH"}
              </button>
            </div>

            {/* Fare Type Selection */}
            <div style={{ marginTop: "16px" }}>
              <span style={{ fontSize: "14px", color: "#333", fontWeight: "500" }}>
                <strong>Fare Type:</strong>
              </span>
              <div style={{ display: "flex", gap: "8px", marginTop: "8px", flexWrap: "wrap" }}>
                {fareTypes.map((type) => (
                  <button
                    key={type}
                    style={{
                      ...fareTypeBtn,
                      ...(fareType === type ? activeFareTypeBtn : {}),
                    }}
                    onClick={() => setFareType(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RESULTS SECTION */}
          {showResults && (
            <div style={resultsWrap}>
              <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>
                {tripType === 0 ? 'One Way' : 'Round Trip'} Flights from {from.split(",")[0]} to {to.split(",")[0]}
                {tripType === 1 && ' and back'}
              </h2>

              {/* Applied Filters Section */}
              <div style={filtersSection}>
                <h3 style={{ fontSize: "16px", marginBottom: "12px" }}>Applied Filters</h3>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {visibleFilters.map((filter, index) => {
                    if (filter === "+2 more") {
                      return (
                        <button
                          key={filter}
                          style={filterBtn}
                          onClick={() => setShowMoreFilters(!showMoreFilters)}
                        >
                          {showMoreFilters ? "Show Less" : "+2 more"}
                        </button>
                      );
                    }

                    const isActive = activeFilters.includes(filter);
                    return (
                      <button
                        key={filter}
                        style={isActive ? activeFilterBtn : filterBtn}
                        onClick={() => toggleFilter(filter)}
                      >
                        {filter}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Loading State */}
              {loadingSearch && (
                <div style={{ textAlign: "center", padding: "40px" }}>
                  <div style={{ fontSize: "18px", color: "#008cff" }}>Searching for flights...</div>
                </div>
              )}

              {/* Error State */}
              {searchError && !loadingSearch && (
                <div style={{ textAlign: "center", padding: "40px", color: "#d32f2f" }}>
                  <div style={{ fontSize: "18px", marginBottom: "10px" }}>{searchError}</div>
                  <button
                    style={{
                      background: "#008cff",
                      color: "#fff",
                      border: "none",
                      padding: "10px 20px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                    onClick={handleSearch}
                  >
                    Try Again
                  </button>
                </div>
              )}

              {/* Search Results */}
              {!loadingSearch && !searchError && (
                <>
                  {/* Price Range */}
                  {searchResults.length > 0 && (
                    <div style={priceRangeStyle}>
                      <span>Total Price for {adults + children + infants} passenger{(adults + children + infants) > 1 ? 's' : ''}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ color: "#008cff", fontSize: "18px", fontWeight: "bold" }}>
                          ₹ {Math.min(...searchResults.map(f => f.total_payable_price)).toLocaleString("en-IN")}
                        </span>
                        <span>-</span>
                        <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                          ₹ {Math.max(...searchResults.map(f => f.total_payable_price)).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Flights List */}
                  <div style={flightsContainer}>
                    {searchResults.length > 0 ? (
                      searchResults.map(renderFlightCard)
                    ) : (
                      <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
                        <div style={{ fontSize: "18px", marginBottom: "10px" }}>No flights found</div>
                        <p>Try adjusting your search criteria</p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {/* CALENDAR MODAL */}
          {(showDepart || showReturn) && (
            <div
              style={modalOverlay}
              onClick={() => {
                if (showDepart) setShowDepart(false);
                if (showReturn) setShowReturn(false);
              }}
            >
              <div style={calendarModal} onClick={(e) => e.stopPropagation()}>
                <div style={calendarHeader}>
                  <button onClick={prevMonth} style={navButton}>
                    &lt;
                  </button>
                  <h3 style={{ margin: 0 }}>
                    {currentMonth.toLocaleString("default", { month: "long" })}{" "}
                    {currentMonth.getFullYear()}
                  </h3>
                  <button onClick={nextMonth} style={navButton}>
                    &gt;
                  </button>
                </div>

                <p style={{ fontSize: "13px", color: "#555", textAlign: "center", margin: "0 0 12px 0" }}>
                  Only highlighted dates (blue border) are available
                </p>

                <div style={weekDaysStyle}>
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} style={weekDayStyle}>
                      {day}
                    </div>
                  ))}
                </div>

                <div style={calendarGrid}>{renderCalendar()}</div>

                {showDepart && onwardDates.length === 0 && (
                  <p style={{ textAlign: "center", color: "#888", margin: "20px 0" }}>
                    No departure dates available right now
                  </p>
                )}

                {showReturn && returnDates.length === 0 && departDateApi && (
                  <p style={{ textAlign: "center", color: "#888", margin: "20px 0" }}>
                    No return dates available for selected departure
                  </p>
                )}

                <button
                  style={closeBtn}
                  onClick={() => {
                    if (showDepart) setShowDepart(false);
                    if (showReturn) setShowReturn(false);
                  }}
                >
                  Done
                </button>
              </div>
            </div>
          )}

          {/* TRAVELLERS MODAL */}
          {showTravellers && (
            <div style={modalOverlay} onClick={() => setShowTravellers(false)}>
              <div style={modal} onClick={(e) => e.stopPropagation()}>
                <h3 style={{ marginBottom: "20px" }}>Travellers & Class</h3>

                <div style={counterRow}>
                  <span style={{ fontWeight: "500" }}>Adults (12y+)</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <button onClick={() => setAdults(Math.max(1, adults - 1))} style={counterButton}>
                      -
                    </button>
                    <span style={{ fontSize: "16px", fontWeight: "bold", minWidth: "30px", textAlign: "center" }}>
                      {adults}
                    </span>
                    <button onClick={() => setAdults(adults + 1)} style={counterButton}>
                      +
                    </button>
                  </div>
                </div>

                <div style={counterRow}>
                  <span style={{ fontWeight: "500" }}>Children (2y-12y)</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <button onClick={() => setChildren(Math.max(0, children - 1))} style={counterButton}>
                      -
                    </button>
                    <span style={{ fontSize: "16px", fontWeight: "bold", minWidth: "30px", textAlign: "center" }}>
                      {children}
                    </span>
                    <button onClick={() => setChildren(children + 1)} style={counterButton}>
                      +
                    </button>
                  </div>
                </div>

                <div style={counterRow}>
                  <span style={{ fontWeight: "500" }}>Infants (Below 2y)</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <button onClick={() => setInfants(Math.max(0, infants - 1))} style={counterButton}>
                      -
                    </button>
                    <span style={{ fontSize: "16px", fontWeight: "bold", minWidth: "30px", textAlign: "center" }}>
                      {infants}
                    </span>
                    <button onClick={() => setInfants(infants + 1)} style={counterButton}>
                      +
                    </button>
                  </div>
                </div>

                <div style={{ marginTop: "20px" }}>
                  <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
                    Class
                  </label>
                  <select
                    style={classSelect}
                    value={travelClass}
                    onChange={(e) => setTravelClass(e.target.value)}
                  >
                    <option value="Economy/Pt">Economy/Premium Economy</option>
                    <option value="Business">Business</option>
                    <option value="First">First Class</option>
                  </select>
                </div>

                <button style={closeBtn} onClick={() => setShowTravellers(false)}>
                  Done
                </button>
              </div>
            </div>
          )}

          {/* OVERLAY FOR CITY SEARCH */}
          {(showFromSearch || showToSearch) && (
            <div
              style={modalOverlay}
              onClick={() => {
                if (showFromSearch) {
                  setShowFromSearch(false);
                  setSearchFromQuery("");
                }
                if (showToSearch) {
                  setShowToSearch(false);
                  setSearchToQuery("");
                }
              }}
            />
          )}

          <Footer />
        </>
      )}

      {/* Show Seat Selection when in seat-selection step */}
      {currentStep === 'seat-selection' && selectedFlightForSeats && fareQuoteData && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'white',
          zIndex: 2000,
          overflow: 'auto'
        }}>
          <SeatSelection
            flightData={selectedFlightForSeats}
            fareQuoteData={fareQuoteData}
            passengers={{
              adults,
              children,
              infants
            }}
            bookingTokenId={bookingTokenId}
            token="3-1-NEWTEST-dmjkwj78BJHk8"
            endUserIp="183.83.43.117"
            staticParam={selectedFlightForSeats.static}
            onBack={handleBackFromSeats}
            onBookingComplete={handleBookingComplete}
            contactInfo={contactDetails}
            tripType={tripType} // Pass trip type to seat selection
          />
        </div>
      )}

      {/* Show Booking Confirmation when in confirmation step */}
      {currentStep === 'confirmation' && bookingData && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'white',
          zIndex: 2000,
          overflow: 'auto'
        }}>
          <BookingConfirmation
            bookingData={bookingData}
            referenceId={bookingReferenceId}
            passengerDetails={passengerDetails}
            contactDetails={contactDetails}
            onBack={handleBackFromConfirmation}
            tripType={tripType} // Pass trip type to confirmation
          />
        </div>
      )}

      {/* Only show Footer when in search step */}
      {currentStep === 'search' && <Footer />}
    </div>
  );
};

// ────────────────────────────────────────────────
// STYLES
const cardStyle: React.CSSProperties = {
  background: "#fff",
  margin: "20px auto",
  padding: "24px",
  borderRadius: "12px",
  maxWidth: "1200px",
  width: "100%",
  position: "relative",
  zIndex: 100,
};

const tripTypeContainer: React.CSSProperties = {
  marginBottom: "16px",
};

const tripTypeWrapper: React.CSSProperties = {
  display: "flex",
  gap: "8px",
};

const tripTypeBtn: React.CSSProperties = {
  padding: "10px 20px",
  background: "#f5f5f5",
  border: "1px solid #ddd",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px",
  color: "#666",
  transition: "all 0.2s",
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const activeTripTypeBtn: React.CSSProperties = {
  padding: "10px 20px",
  background: "#008cff",
  color: "#fff",
  border: "1px solid #008cff",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const checkIcon: React.CSSProperties = {
  fontSize: "16px",
};

const tabStyle = {
  color: "#008cff",
  fontWeight: 600,
  marginBottom: 12,
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const row = {
  display: "flex",
  gap: "16px",
  alignItems: "center",
  flexWrap: "wrap",
  position: "relative",
};

const boxStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  borderRadius: 8,
  padding: "12px",
  cursor: "pointer",
  minWidth: "160px",
  flex: 1,
  backgroundColor: "#fff",
  transition: "border-color 0.2s",
};

const swapStyle = {
  cursor: "pointer",
  fontSize: 24,
  color: "#666",
  background: "#f5f5f5",
  borderRadius: "50%",
  padding: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const searchBtn = {
  background: "#008cff",
  color: "#fff",
  border: "none",
  padding: "14px 32px",
  borderRadius: 8,
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
  transition: "background-color 0.2s",
  minWidth: "140px",
};

const resultsWrap = {
  maxWidth: 1200,
  margin: "20px auto",
  width: "100%",
  padding: "0 16px",
};

const flightsContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  marginTop: "20px",
};

const flightCard = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  border: "1px solid #eee",
};

const selectBtn = {
  background: "#008cff",
  color: "#fff",
  border: "none",
  padding: "12px 32px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "14px",
  marginTop: "10px",
};

const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const calendarModal = {
  background: "#fff",
  padding: "24px",
  borderRadius: "12px",
  width: "350px",
  maxWidth: "90vw",
  boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
  zIndex: 1001,
};

const calendarHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
};

const navButton = {
  background: "none",
  border: "none",
  fontSize: "20px",
  cursor: "pointer",
  padding: "8px 12px",
  borderRadius: "4px",
  color: "#008cff",
  fontWeight: "bold",
};

const weekDaysStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: "4px",
  marginBottom: "12px",
};

const weekDayStyle = {
  textAlign: "center",
  fontWeight: "bold",
  fontSize: "12px",
  color: "#666",
  padding: "4px",
};

const calendarGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: "4px",
};

const dayStyle: React.CSSProperties = {
  padding: "12px 4px",
  border: "none",
  background: "none",
  cursor: "pointer",
  borderRadius: "4px",
  fontSize: "14px",
  minWidth: "36px",
};

const emptyDayStyle = {
  padding: "12px 4px",
};

const modal = {
  background: "#fff",
  padding: "24px",
  borderRadius: "12px",
  width: "360px",
  maxWidth: "90vw",
  boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
  zIndex: 1001,
};

const closeBtn = {
  marginTop: "20px",
  width: "100%",
  padding: "12px",
  background: "#008cff",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
};

const counterRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "16px 0",
  padding: "12px",
  borderBottom: "1px solid #eee",
};

const counterButton = {
  width: "32px",
  height: "32px",
  borderRadius: "50%",
  border: "2px solid #008cff",
  background: "#fff",
  color: "#008cff",
  fontSize: "18px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
};

const citySearchModal = {
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  background: "#fff",
  borderRadius: "8px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
  marginTop: "4px",
  zIndex: 1002,
  maxHeight: "400px",
  overflow: "hidden",
};

const searchInput = {
  width: "100%",
  padding: "12px 16px",
  border: "1px solid #ddd",
  borderRadius: "4px",
  fontSize: "14px",
  margin: "8px",
  boxSizing: "border-box" as const,
};

const cityList = {
  maxHeight: "300px",
  overflowY: "auto" as const,
};

const cityItem = {
  padding: "12px 16px",
  borderBottom: "1px solid #eee",
  cursor: "pointer",
  transition: "background-color 0.2s",
};

const fareTypeBtn = {
  padding: "8px 16px",
  background: "#f5f5f5",
  border: "1px solid #ddd",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "14px",
  color: "#666",
  transition: "all 0.2s",
};

const activeFareTypeBtn = {
  background: "#008cff",
  color: "#fff",
  borderColor: "#008cff",
};

const filtersSection = {
  background: "#f8f9fa",
  padding: "16px",
  borderRadius: "8px",
  marginBottom: "16px",
  border: "1px solid #e9ecef",
};

const activeFilterBtn = {
  background: "#008cff",
  color: "#fff",
  border: "none",
  padding: "8px 16px",
  borderRadius: "20px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "500",
  transition: "all 0.2s",
};

const filterBtn: React.CSSProperties = {
  background: "#fff",
  color: "#333",
  border: "1px solid #ddd",
  padding: "8px 16px",
  borderRadius: "20px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "500",
  transition: "all 0.2s",
};

const priceRangeStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px",
  background: "#fff",
  borderRadius: "8px",
  marginBottom: "16px",
  border: "1px solid #e9ecef",
};

const classSelect = {
  width: "100%",
  padding: "12px",
  borderRadius: "6px",
  border: "1px solid #ddd",
  fontSize: "14px",
  backgroundColor: "#fff",
  cursor: "pointer",
};

export default FlightHotels;