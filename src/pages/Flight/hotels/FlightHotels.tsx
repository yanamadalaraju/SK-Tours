import React, { useState, useEffect } from "react";
import { MdFlightTakeoff } from "react-icons/md";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeatSelection from "./SeatSelection";
import BookingConfirmation from './BookingConfirmation';
import { 
  Airport, 
  SearchResponse, 
  FlightSearchResult,
  ContactInfo,
  PassengerDetails,
  SearchStep
} from "./types";
import { styles } from "./styles";

const FlightHotels: React.FC = () => {
  // Search states - Updated to match your successful Postman test
  const [from, setFrom] = useState("Varanasi, India");
  const [to, setTo] = useState("Patna, India");
  const [fromCode, setFromCode] = useState("VNS");
  const [toCode, setToCode] = useState("PAT");
  const [showDepart, setShowDepart] = useState(false);
  const [showReturn, setShowReturn] = useState(false);
  const [showTravellers, setShowTravellers] = useState(false);
  const [showFromSearch, setShowFromSearch] = useState(false);
  const [showToSearch, setShowToSearch] = useState(false);
  const [departDate, setDepartDate] = useState("Sun, 1 Jun 26");
  const [returnDate, setReturnDate] = useState("Select Return");
  const [departDateApi, setDepartDateApi] = useState("2026-06-01");
  const [returnDateApi, setReturnDateApi] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [travelClass, setTravelClass] = useState("Economy/Pt");
  const [showResults, setShowResults] = useState(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(2026, 5, 1)); // June 2026
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(2026, 5, 1));
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
  const [tripType, setTripType] = useState<"0" | "1">("0");
  const [currentStep, setCurrentStep] = useState<SearchStep>('search');
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
    
    // Fetch arrival cities for the new "from" location
    if (tempToCode) {
      fetchArrivalCities(tempToCode);
    }
  };

  const logSearchCriteria = () => {
    console.log("=== SEARCH CRITERIA ===");
    console.log("From:", from, "Code:", fromCode);
    console.log("To:", to, "Code:", toCode);
    console.log("Depart Date API:", departDateApi);
    console.log("Return Date API:", returnDateApi);
    console.log("Trip Type:", tripType);
    console.log("Passengers - Adults:", adults, "Children:", children, "Infants:", infants);
    console.log("=====================");
  };

  const handleSearch = async () => {
    if (!fromCode || !toCode || !departDateApi) {
      alert("Please select departure and arrival cities and departure date");
      return;
    }

    setLoadingSearch(true);
    setSearchError(null);
    setShowResults(true);
    setBookingTokenId("");

    logSearchCriteria();

    try {
      const searchPayload = {
        trip_type: parseInt(tripType), // Convert to number
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

      console.log("Search payload:", JSON.stringify(searchPayload, null, 2));

      const res = await fetch("https://devapi.flightapi.co.in/v1/fbapi/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(searchPayload),
      });

      const responseText = await res.text();
      console.log("Raw response:", responseText);

      let data: SearchResponse;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Failed to parse JSON:", parseError);
        throw new Error("Invalid response from server");
      }

      console.log("Parsed response:", data);

      // Check if data exists and has flights
      if (data.errorCode === 0) {
        if (data.data && Array.isArray(data.data) && data.data.length > 0) {
          console.log(`Found ${data.data.length} flights`);
          setSearchResults(data.data);
          
          if (data.booking_token_id) {
            setBookingTokenId(data.booking_token_id);
            console.log("Booking token ID:", data.booking_token_id);
          } else {
            console.warn("No booking_token_id in response");
          }
        } else {
          console.log("No flights found in data array");
          setSearchResults([]);
          setSearchError("No flights found for the selected criteria");
        }
      } else {
        console.log("Error code not 0:", data.errorCode);
        setSearchResults([]);
        setSearchError(data.replyMsg || "Failed to search flights");
      }
    } catch (err: any) {
      console.error("Search error:", err);
      setSearchResults([]);
      setSearchError(err.message || "Failed to search flights. Please try again.");
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
    // Clear return date when switching to one-way
    if (tripType === "0") {
      setReturnDate("Select Return");
      setReturnDateApi("");
    }
  }, [tripType]);

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

  const fetchDepartureCities = async (tripTypeParam?: "0" | "1") => {
    const currentTripType = tripTypeParam || tripType;
    setLoadingDepartures(true);
    try {
      const res = await fetch("https://devapi.flightapi.co.in/v1/fbapi/dep_city", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trip_type: parseInt(currentTripType),
          end_user_ip: "183.83.43.117",
          token: "3-1-NEWTEST-dmjkwj78BJHk8",
        }),
      });
      const data = await res.json();
      console.log("Departure cities response:", data);
      if (data.replyCode === "success" && data.data?.length > 0) {
        setDepartureCities(data.data);
        setFilteredDepartures(data.data);
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
          trip_type: parseInt(tripType),
          end_user_ip: "183.83.43.117",
          token: "3-1-NEWTEST-dmjkwj78BJHk8",
          city_code: cityCode,
        }),
      });
      const data = await res.json();
      console.log("Arrival cities response:", data);
      if (data.replyCode === "success" && data.data?.length > 0) {
        setArrivalCities(data.data);
        setFilteredArrivals(data.data);
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
      const payload = {
        trip_type: parseInt(tripType),
        end_user_ip: "183.83.43.117",
        token: "3-1-NEWTEST-dmjkwj78BJHk8",
        dep_city_code: dep,
        arr_city_code: arr,
      };
      
      console.log("Onward dates payload:", JSON.stringify(payload, null, 2));
      
      const res = await fetch("https://devapi.flightapi.co.in/v1/fbapi/onward_date", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      const responseText = await res.text();
      console.log("Onward dates raw response:", responseText);
      
      const data = JSON.parse(responseText);
      console.log("Onward dates parsed response:", data);
      
      if (data.replyCode === "success") {
        const dates = data.data
          .map((d: any) => d.onward_date)
          .filter((d: string | undefined): d is string => !!d);
        
        console.log("Available onward dates:", dates);
        setOnwardDates(dates);
        
        if (dates.length > 0) {
          // Check if current departDateApi is in the available dates
          if (!dates.includes(departDateApi)) {
            const first = dates[0];
            setDepartDateApi(first);
            setDepartDate(formatApiDate(first));
            setSelectedDate(new Date(first));
            setCurrentMonth(new Date(first));
            console.log("Set departure date to:", first);
          }
        } else {
          console.warn("No onward dates available");
        }
      } else {
        console.warn("Failed to fetch onward dates:", data.replyMsg);
      }
    } catch (err) {
      console.error("onward_date error:", err);
    } finally {
      setLoadingOnwardDates(false);
    }
  };

  const fetchReturnDates = async (dep: string, arr: string, onward: string) => {
    // Only fetch return dates for round trips
    if (tripType === "0") {
      return;
    }
    
    setLoadingReturnDates(true);
    try {
      const res = await fetch("https://devapi.flightapi.co.in/v1/fbapi/return_date", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trip_type: parseInt(tripType),
          end_user_ip: "183.83.43.117",
          token: "3-1-NEWTEST-dmjkwj78BJHk8",
          dep_city_code: dep,
          arr_city_code: arr,
          onward_date: onward,
        }),
      });
      const data = await res.json();
      console.log("Return dates response:", data);
      if (data.replyCode === "success") {
        const dates = data.data
          .map((d: any) => d.return_date)
          .filter((d: string | undefined): d is string => !!d);
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
    console.log("Selected departure city:", {
      city_name: city.city_name,
      airport_code: city.airport_code,
      city_code: city.city_code
    });
    setFrom(`${city.city_name}, India`);
    setFromCode(city.airport_code);
    setShowFromSearch(false);
    setSearchFromQuery("");
    
    // Fetch arrival cities for the selected departure
    fetchArrivalCities(city.airport_code);
  };

  const handleToSelect = (city: Airport) => {
    console.log("Selected arrival city:", {
      city_name: city.city_name,
      airport_code: city.airport_code,
      city_code: city.city_code
    });
    setTo(`${city.city_name}, India`);
    setToCode(city.airport_code);
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
      if (fromCode && toCode && tripType === "1") {
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
      // First, make sure we have a booking token
      if (!bookingTokenId) {
        console.warn("No booking token ID available. Trying to get one...");
        // You might need to call search API again or handle this differently
        alert("Please search for flights again before selecting a flight.");
        return;
      }

      // Build payload based on the Postman example
      const fareQuotePayload: any = {
        id: flight.id,
        end_user_ip: "183.83.43.117",
        token: "3-1-NEWTEST-dmjkwj78BJHk8",
        adult_children: adults + children,
        infant: infants,
        onward_date: departDateApi,
        static: flight.static,
        booking_token_id: bookingTokenId // Always include booking token
      };

      // Only add return_date if it exists (for round trips)
      if (returnDateApi && tripType === "1") {
        fareQuotePayload.return_date = returnDateApi;
      }

      console.log("Calling fare_quote API with payload:", JSON.stringify(fareQuotePayload, null, 2));

      const response = await fetch("https://devapi.flightapi.co.in/v1/fbapi/fare_quote", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(fareQuotePayload),
      });

      const responseText = await response.text();
      console.log("Fare quote API raw response:", responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Failed to parse fare quote response:", parseError);
        throw new Error("Invalid JSON response from server");
      }

      console.log("Fare quote API parsed response:", data);

      if (data.errorCode === 0 && data.data) {
        // Success - prepare data for seat selection
        const seatSelectionData = {
          // Flight info
          flight: {
            ...flight,
            total_payable_price: data.data.total_payable_price || flight.total_payable_price,
            available_seats: data.data.available_seats || flight.available_seats,
            per_adult_child_price: data.data.per_adult_child_price,
            per_infant_price: data.data.per_infant_price
          },
          // Fare quote data
          fareQuote: data.data,
          // Booking info
          bookingInfo: {
            booking_token_id: bookingTokenId,
            static: flight.static,
            onward_date: departDateApi,
            return_date: returnDateApi || "",
            adult_children: adults + children,
            infant: infants
          },
          // Passenger counts
          passengers: {
            adults,
            children,
            infants
          }
        };

        console.log("Prepared seat selection data:", seatSelectionData);
        
        setSelectedFlightForSeats(flight);
        setFareQuoteData(seatSelectionData);
        setCurrentStep('seat-selection');
      } else {
        console.error("Fare quote API returned error:", data);
        const errorMessage = data.message || data.replyMsg || "Failed to fetch fare quote";
        alert(`Error: ${errorMessage}. Error code: ${data.errorCode}`);
      }
    } catch (err: any) {
      console.error("Error in handleSelectFlight:", err);
      alert(`Failed to proceed: ${err.message || "Unknown error occurred"}`);
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
      days.push(<div key={`empty-${i}`} style={styles.emptyDayStyle} />);
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
            ...styles.dayStyle,
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
      <div key={flight.id} style={styles.flightCard}>
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
              ...styles.selectBtn,
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
          <div style={styles.cardStyle}>
            <div style={styles.tabStyle}>
              <MdFlightTakeoff /> Flights
            </div>

            <div style={{ 
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}>
                <input
                  type="radio"
                  name="tripType"
                  checked={tripType === "0"}
                  onChange={() => {
                    setTripType("0");
                    // Clear return date when switching to one-way
                    setReturnDate("Select Return");
                    setReturnDateApi("");
                    // Refresh departure cities based on trip type
                    fetchDepartureCities("0");
                    // Clear arrival cities
                    setArrivalCities([]);
                    // Reset to defaults
                    setFrom("Varanasi, India");
                    setFromCode("VNS");
                    setTo("Patna, India");
                    setToCode("PAT");
                  }}
                  style={{ width: '18px', height: '18px' }}
                />
                <span style={{ fontSize: '14px', fontWeight: '500' }}>One Way</span>
              </label>
              
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}>
                <input
                  type="radio"
                  name="tripType"
                  checked={tripType === "1"}
                  onChange={() => {
                    setTripType("1");
                    // Refresh departure cities based on trip type
                    fetchDepartureCities("1");
                    // Clear arrival cities
                    setArrivalCities([]);
                    // Reset to defaults
                    setFrom("Ahmedabad, India");
                    setFromCode("AMD");
                    setTo("Patna, India");
                    setToCode("PAT");
                  }}
                  style={{ width: '18px', height: '18px' }}
                />
                <span style={{ fontSize: '14px', fontWeight: '500' }}>Round Trip</span>
              </label>
            </div>

            <div style={styles.row}>
              {/* FROM */}
              <div style={{ position: "relative", flex: 1 }}>
                <div style={styles.boxStyle} onClick={() => setShowFromSearch(true)}>
                  <small style={{ color: "#666", fontSize: "12px" }}>FROM</small>
                  <h3 style={{ margin: "4px 0" }}>{from}</h3>
                  <p style={{ fontSize: "12px", color: "#666", margin: 0 }}>{fromCode}</p>
                </div>

                {showFromSearch && (
                  <div style={styles.citySearchModal}>
                    <input
                      type="text"
                      placeholder="Search departure city..."
                      style={styles.searchInput}
                      value={searchFromQuery}
                      onChange={(e) => setSearchFromQuery(e.target.value)}
                      autoFocus
                    />
                    <div style={styles.cityList}>
                      {loadingDepartures ? (
                        <div style={{ padding: "20px", textAlign: "center" }}>Loading...</div>
                      ) : filteredDepartures.length > 0 ? (
                        filteredDepartures.map((city) => (
                          <div key={city.airport_code} style={styles.cityItem} onClick={() => handleFromSelect(city)}>
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
                      style={styles.closeBtn}
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

              <div style={styles.swapStyle} onClick={swapLocations}>
                <HiOutlineSwitchHorizontal />
              </div>

              {/* TO */}
              <div style={{ position: "relative", flex: 1 }}>
                <div style={styles.boxStyle} onClick={() => setShowToSearch(true)}>
                  <small style={{ color: "#666", fontSize: "12px" }}>TO</small>
                  <h3 style={{ margin: "4px 0" }}>{to}</h3>
                  <p style={{ fontSize: "12px", color: "#666", margin: 0 }}>{toCode}</p>
                </div>

                {showToSearch && (
                  <div style={styles.citySearchModal}>
                    <input
                      type="text"
                      placeholder="Search arrival city..."
                      style={styles.searchInput}
                      value={searchToQuery}
                      onChange={(e) => setSearchToQuery(e.target.value)}
                      autoFocus
                    />
                    <div style={styles.cityList}>
                      {loadingArrivals ? (
                        <div style={{ padding: "20px", textAlign: "center" }}>Loading...</div>
                      ) : filteredArrivals.length > 0 ? (
                        filteredArrivals.map((city) => (
                          <div key={city.airport_code} style={styles.cityItem} onClick={() => handleToSelect(city)}>
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
                      style={styles.closeBtn}
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

              <div style={styles.boxStyle} onClick={() => setShowDepart(true)}>
                <small style={{ color: "#666", fontSize: "12px" }}>DEPART</small>
                <h3 style={{ margin: "4px 0" }}>{departDate}</h3>
                {loadingOnwardDates && <small style={{ color: "#008cff" }}>Loading...</small>}
              </div>

              <div 
                style={{
                  ...styles.boxStyle,
                  ...(tripType === "0" ? { opacity: 0.5, cursor: "not-allowed" } : {})
                }} 
                onClick={() => tripType === "1" && setShowReturn(true)}
              >
                <small style={{ color: "#666", fontSize: "12px" }}>RETURN</small>
                <h3
                  style={{
                    margin: "4px 0",
                    color: returnDate === "Select Return" ? "#888" : "#000",
                  }}
                >
                  {tripType === "0" ? "Not required" : returnDate}
                </h3>
                {loadingReturnDates && tripType === "1" && <small style={{ color: "#008cff" }}>Loading...</small>}
              </div>

              <div style={styles.boxStyle} onClick={() => setShowTravellers(true)}>
                <small style={{ color: "#666", fontSize: "12px" }}>PASSENGERS & CLASS</small>
                <h3 style={{ margin: "4px 0" }}>
                  {adults + children + infants}{" "}
                  {adults + children + infants === 1 ? "Adult" : "Adults"}, {travelClass}
                </h3>
              </div>

              <button style={styles.searchBtn} onClick={handleSearch} disabled={loadingSearch}>
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
                      ...styles.fareTypeBtn,
                      ...(fareType === type ? styles.activeFareTypeBtn : {}),
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
            <div style={styles.resultsWrap}>
              <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>
                {tripType === "0" ? "One Way" : "Round Trip"} Flights from {from.split(",")[0]} to {to.split(",")[0]}
              </h2>

              {/* Applied Filters Section */}
              <div style={styles.filtersSection}>
                <h3 style={{ fontSize: "16px", marginBottom: "12px" }}>Applied Filters</h3>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {visibleFilters.map((filter, index) => {
                    if (filter === "+2 more") {
                      return (
                        <button
                          key={filter}
                          style={styles.filterBtn}
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
                        style={isActive ? styles.activeFilterBtn : styles.filterBtn}
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
                    <div style={styles.priceRangeStyle}>
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
                  <div style={styles.flightsContainer}>
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
              style={styles.modalOverlay}
              onClick={() => {
                if (showDepart) setShowDepart(false);
                if (showReturn) setShowReturn(false);
              }}
            >
              <div style={styles.calendarModal} onClick={(e) => e.stopPropagation()}>
                <div style={styles.calendarHeader}>
                  <button onClick={prevMonth} style={styles.navButton}>
                    &lt;
                  </button>
                  <h3 style={{ margin: 0 }}>
                    {currentMonth.toLocaleString("default", { month: "long" })}{" "}
                    {currentMonth.getFullYear()}
                  </h3>
                  <button onClick={nextMonth} style={styles.navButton}>
                    &gt;
                  </button>
                </div>

                <p style={{ fontSize: "13px", color: "#555", textAlign: "center", margin: "0 0 12px 0" }}>
                  Only highlighted dates (blue border) are available
                </p>

                <div style={styles.weekDaysStyle}>
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} style={styles.weekDayStyle}>
                      {day}
                    </div>
                  ))}
                </div>

                <div style={styles.calendarGrid}>{renderCalendar()}</div>

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
                  style={styles.closeBtn}
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
            <div style={styles.modalOverlay} onClick={() => setShowTravellers(false)}>
              <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h3 style={{ marginBottom: "20px" }}>Travellers & Class</h3>

                <div style={styles.counterRow}>
                  <span style={{ fontWeight: "500" }}>Adults (12y+)</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <button onClick={() => setAdults(Math.max(1, adults - 1))} style={styles.counterButton}>
                      -
                    </button>
                    <span style={{ fontSize: "16px", fontWeight: "bold", minWidth: "30px", textAlign: "center" }}>
                      {adults}
                    </span>
                    <button onClick={() => setAdults(adults + 1)} style={styles.counterButton}>
                      +
                    </button>
                  </div>
                </div>

                <div style={styles.counterRow}>
                  <span style={{ fontWeight: "500" }}>Children (2y-12y)</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <button onClick={() => setChildren(Math.max(0, children - 1))} style={styles.counterButton}>
                      -
                    </button>
                    <span style={{ fontSize: "16px", fontWeight: "bold", minWidth: "30px", textAlign: "center" }}>
                      {children}
                    </span>
                    <button onClick={() => setChildren(children + 1)} style={styles.counterButton}>
                      +
                    </button>
                  </div>
                </div>

                <div style={styles.counterRow}>
                  <span style={{ fontWeight: "500" }}>Infants (Below 2y)</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <button onClick={() => setInfants(Math.max(0, infants - 1))} style={styles.counterButton}>
                      -
                    </button>
                    <span style={{ fontSize: "16px", fontWeight: "bold", minWidth: "30px", textAlign: "center" }}>
                      {infants}
                    </span>
                    <button onClick={() => setInfants(infants + 1)} style={styles.counterButton}>
                      +
                    </button>
                  </div>
                </div>

                <div style={{ marginTop: "20px" }}>
                  <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
                    Class
                  </label>
                  <select
                    style={styles.classSelect}
                    value={travelClass}
                    onChange={(e) => setTravelClass(e.target.value)}
                  >
                    <option value="Economy/Pt">Economy/Premium Economy</option>
                    <option value="Business">Business</option>
                    <option value="First">First Class</option>
                  </select>
                </div>

                <button style={styles.closeBtn} onClick={() => setShowTravellers(false)}>
                  Done
                </button>
              </div>
            </div>
          )}

          {/* OVERLAY FOR CITY SEARCH */}
          {(showFromSearch || showToSearch) && (
            <div
              style={styles.modalOverlay}
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
        </>
      )}

      {/* Show Seat Selection when in seat-selection step */}
      {currentStep === 'seat-selection' && selectedFlightForSeats && fareQuoteData && (
        <div style={styles.stepContainer}>
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
          />
        </div>
      )}

      {/* Show Booking Confirmation when in confirmation step */}
      {currentStep === 'confirmation' && bookingData && (
        <div style={styles.stepContainer}>
          <BookingConfirmation
            bookingData={bookingData}
            referenceId={bookingReferenceId}
            passengerDetails={passengerDetails}
            contactDetails={contactDetails}
            onBack={handleBackFromConfirmation}
          />
        </div>
      )}

      {/* Only show Footer when in search step */}
      {currentStep === 'search' && <Footer />}
    </div>
  );
};

export default FlightHotels;