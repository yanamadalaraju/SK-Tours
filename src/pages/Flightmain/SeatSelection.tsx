import React, { useState, useEffect } from "react";
import { 
  MdFlightTakeoff, 
  MdFlightLand, 
  MdPerson, 
  MdChildCare, 
  MdBabyChangingStation,
  MdChair,
  MdEdit,
  MdSave,
  MdClose,
  MdCheck,
  MdCancel
} from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import axios from "axios";

interface Seat {
  id: string;
  row: number;
  column: string;
  status: 'available' | 'selected' | 'booked' | 'blocked' | 'infant_lap';
  price: number;
  type: 'window' | 'aisle' | 'middle';
  seatNumber: string;
  passengerType?: 'adult' | 'child' | 'infant';
  passengerId?: number;
  flightType: 'onward' | 'return';
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

interface SeatSelectionProps {
  flightData: any;
  fareQuoteData: any;
  passengers: {
    adults: number;
    children: number;
    infants: number;
  };
  passengerDetailsFromSearch?: any[];
  onBack: () => void;
  onBookingComplete: (bookingResponse: any) => void;
  bookingTokenId: string;
  token: string;
  endUserIp: string;
  staticParam: string;
  contactInfo?: {
    name: string;
    email: string;
    phone: string;
  };
}

interface ContactInfo {
  name: string;
  email: string;
  phone: string;
}

const SeatSelection: React.FC<SeatSelectionProps> = ({
  flightData,
  fareQuoteData,
  passengers,
  passengerDetailsFromSearch,
  onBack,
  onBookingComplete,
  bookingTokenId,
  token,
  endUserIp,
  staticParam,
  contactInfo
}) => {
  const [onwardSeats, setOnwardSeats] = useState<Seat[]>([]);
  const [returnSeats, setReturnSeats] = useState<Seat[]>([]);
  const [selectedOnwardSeats, setSelectedOnwardSeats] = useState<Seat[]>([]);
  const [selectedReturnSeats, setSelectedReturnSeats] = useState<Seat[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(fareQuoteData?.total_payable_price || 0);
  const [activePassengerId, setActivePassengerId] = useState<number | null>(null);
  const [activeFlightType, setActiveFlightType] = useState<'onward' | 'return'>('onward');
  const [passengerDetails, setPassengerDetails] = useState<PassengerDetails[]>([]);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [editingContact, setEditingContact] = useState(false);
  const [contactDetails, setContactDetails] = useState<ContactInfo>({
    name: "",
    email: "",
    phone: ""
  });
  const [showPassengerDetails, setShowPassengerDetails] = useState(true);
  const [editingPassengerId, setEditingPassengerId] = useState<number | null>(null);
  const [editingPassengerData, setEditingPassengerData] = useState<Partial<PassengerDetails>>({});
  
  const totalBookSeats = passengers.adults + passengers.children + passengers.infants;
  const totalPhysicalSeats = passengers.adults + passengers.children;

  const isRoundTrip = flightData?.trip_type === 2 || !!flightData?.return_flight_data;

  // Initialize passenger details with input fields
  useEffect(() => {
    if (passengerDetailsFromSearch && passengerDetailsFromSearch.length > 0) {
      // Use provided data but make it editable
      const details = passengerDetailsFromSearch.map((passenger, index) => ({
        id: index + 1,
        type: passenger.age >= 12 ? 'adult' : passenger.age >= 2 ? 'child' : 'infant',
        name: `${passenger.first_name} ${passenger.last_name}`,
        firstName: passenger.first_name || '',
        middleName: passenger.middle_name || '',
        lastName: passenger.last_name || '',
        age: passenger.age || 0,
        dob: passenger.dob || '',
        gender: (passenger.gender as 'Mr' | 'Mrs' | 'Ms' | 'Mstr') || 'Mr',
        requiresSeat: passenger.age >= 2,
        icon: passenger.age >= 12 ? <MdPerson /> : 
              passenger.age >= 2 ? <MdChildCare /> : <MdBabyChangingStation />,
        isInfantOnLap: passenger.age < 2,
        lapOfPassengerId: passenger.age < 2 ? 1 : undefined,
        passportNo: passenger.passport_no || '',
        passportExpireDate: passenger.passport_expire_date || ''
      }));
      
      setPassengerDetails(details);
    } else {
      // Create editable default passenger details
      const details: PassengerDetails[] = [];
      let id = 1;
      
      // Add adults
      for (let i = 0; i < passengers.adults; i++) {
        details.push({
          id: id++,
          type: 'adult',
          name: '',
          firstName: '',
          middleName: '',
          lastName: '',
          age: 0,
          dob: '',
          gender: 'Mr',
          requiresSeat: true,
          icon: <MdPerson />,
          passportNo: '',
          passportExpireDate: ''
        });
      }
      
      // Add children
      for (let i = 0; i < passengers.children; i++) {
        details.push({
          id: id++,
          type: 'child',
          name: '',
          firstName: '',
          middleName: '',
          lastName: '',
          age: 0,
          dob: '',
          gender: 'Mstr',
          requiresSeat: true,
          icon: <MdChildCare />,
          passportNo: '',
          passportExpireDate: ''
        });
      }
      
      // Add infants
      for (let i = 0; i < passengers.infants; i++) {
        details.push({
          id: id++,
          type: 'infant',
          name: '',
          firstName: '',
          middleName: '',
          lastName: '',
          age: 0,
          dob: '',
          gender: 'Mstr',
          requiresSeat: false,
          icon: <MdBabyChangingStation />,
          isInfantOnLap: true,
          lapOfPassengerId: 1,
          passportNo: '',
          passportExpireDate: ''
        });
      }
      
      setPassengerDetails(details);
    }
    
    const firstPassengerWithSeat = passengerDetails.find(p => p.requiresSeat);
    if (firstPassengerWithSeat) {
      setActivePassengerId(firstPassengerWithSeat.id);
    }
  }, [passengerDetailsFromSearch, passengers]);

  useEffect(() => {
    if (contactInfo) {
      setContactDetails(contactInfo);
    } else {
      setContactDetails({
        name: "",
        email: "",
        phone: ""
      });
    }
  }, [contactInfo]);

  useEffect(() => {
    if (fareQuoteData && passengerDetails.length > 0) {
      generateSeatLayouts();
    }
  }, [fareQuoteData, passengerDetails]);

  const generateSeatLayouts = () => {
    const onwardSeatsLayout = generateFlightSeats('onward');
    setOnwardSeats(onwardSeatsLayout);
    
    if (isRoundTrip) {
      const returnSeatsLayout = generateFlightSeats('return');
      setReturnSeats(returnSeatsLayout);
    }
    
    setLoading(false);
  };

  const generateFlightSeats = (flightType: 'onward' | 'return'): Seat[] => {
    const availableSeats = fareQuoteData?.available_seats || 97;
    const rows = Math.ceil(availableSeats / 6);
    const columns = ['A', 'B', 'C', 'D', 'E', 'F'];
    const generatedSeats: Seat[] = [];
    
    let seatCount = 0;
    for (let row = 1; row <= rows && seatCount < availableSeats; row++) {
      columns.forEach((col, colIndex) => {
        if (seatCount >= availableSeats) return;
        
        const seatNumber = `${row}${col}`;
        const seatTypes = ['window', 'aisle', 'middle', 'middle', 'aisle', 'window'];
        
        generatedSeats.push({
          id: `${flightType}-${row}-${col}`,
          row,
          column: col,
          status: 'available',
          price: calculateSeatPrice(row, colIndex),
          type: seatTypes[colIndex] as Seat['type'],
          seatNumber,
          flightType
        });
        seatCount++;
      });
    }
    
    const bookedCount = Math.floor(generatedSeats.length * 0.2);
    for (let i = 0; i < bookedCount; i++) {
      const randomIndex = Math.floor(Math.random() * generatedSeats.length);
      if (generatedSeats[randomIndex].status === 'available') {
        generatedSeats[randomIndex].status = 'booked';
      }
    }
    
    const exitRows = [10, 11];
    generatedSeats.forEach(seat => {
      if (exitRows.includes(seat.row) && seat.status !== 'booked') {
        seat.price += 1500;
      }
    });
    
    return generatedSeats;
  };

  const calculateSeatPrice = (row: number, colIndex: number): number => {
    let basePrice = fareQuoteData?.total_payable_price / totalBookSeats || 5000;
    
    if (row <= 5) basePrice += 1000;
    if (colIndex === 0 || colIndex === 5) basePrice += 500;
    if (colIndex === 1 || colIndex === 4) basePrice += 300;
    
    return Math.round(basePrice);
  };

  const getActivePassenger = () => {
    return passengerDetails.find(p => p.id === activePassengerId);
  };

  const getPassengerSeat = (passengerId: number, flightType: 'onward' | 'return') => {
    if (flightType === 'onward') {
      return selectedOnwardSeats.find(seat => seat.passengerId === passengerId);
    } else {
      return selectedReturnSeats.find(seat => seat.passengerId === passengerId);
    }
  };

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'booked' || seat.status === 'blocked') return;

    const activePassenger = getActivePassenger();
    if (!activePassenger || !activePassenger.requiresSeat) return;

    const currentFlightSeats = seat.flightType === 'onward' ? selectedOnwardSeats : selectedReturnSeats;
    
    if (currentFlightSeats.length >= totalPhysicalSeats &&
        !currentFlightSeats.find(s => s.passengerId === activePassenger.id)) {
      alert(`Only ${totalPhysicalSeats} seats allowed for ${seat.flightType} flight.`);
      return;
    }

    const existingAssignment = currentFlightSeats.find(
      s => s.id === seat.id && s.passengerId !== activePassenger.id
    );
    
    if (existingAssignment) {
      alert('Seat already assigned to another passenger');
      return;
    }

    if (seat.flightType === 'onward') {
      let updatedSeats = [...selectedOnwardSeats];
      const existingSeatIndex = updatedSeats.findIndex(
        s => s.passengerId === activePassenger.id
      );

      if (existingSeatIndex >= 0) {
        updatedSeats[existingSeatIndex] = {
          ...seat,
          status: 'selected',
          passengerId: activePassenger.id,
          passengerType: activePassenger.type
        };
      } else {
        updatedSeats.push({
          ...seat,
          status: 'selected',
          passengerId: activePassenger.id,
          passengerType: activePassenger.type
        });
      }
      setSelectedOnwardSeats(updatedSeats);
      
      const updatedPassengers = passengerDetails.map(p => {
        if (p.id === activePassenger.id) {
          return {
            ...p,
            seatNumber: seat.seatNumber
          };
        }
        return p;
      });
      setPassengerDetails(updatedPassengers);
    } else {
      let updatedSeats = [...selectedReturnSeats];
      const existingSeatIndex = updatedSeats.findIndex(
        s => s.passengerId === activePassenger.id
      );

      if (existingSeatIndex >= 0) {
        updatedSeats[existingSeatIndex] = {
          ...seat,
          status: 'selected',
          passengerId: activePassenger.id,
          passengerType: activePassenger.type
        };
      } else {
        updatedSeats.push({
          ...seat,
          status: 'selected',
          passengerId: activePassenger.id,
          passengerType: activePassenger.type
        });
      }
      setSelectedReturnSeats(updatedSeats);
      
      const updatedPassengers = passengerDetails.map(p => {
        if (p.id === activePassenger.id) {
          return {
            ...p,
            returnSeatNumber: seat.seatNumber
          };
        }
        return p;
      });
      setPassengerDetails(updatedPassengers);
    }
    
    const allSelectedSeats = [...selectedOnwardSeats, ...selectedReturnSeats];
    const newTotalPrice = allSelectedSeats.reduce((sum, s) => sum + s.price, 0);
    setTotalPrice(newTotalPrice);
  };
  // Add this function to handle direct input changes
const handlePassengerInputChange = (passengerId: number, field: keyof PassengerDetails, value: string | number) => {
  setPassengerDetails(prev => 
    prev.map(passenger => 
      passenger.id === passengerId 
        ? { 
            ...passenger, 
            [field]: value,
            // Update name if firstName or lastName changes
            ...(field === 'firstName' || field === 'lastName' 
              ? { name: `${field === 'firstName' ? value : passenger.firstName} ${field === 'lastName' ? value : passenger.lastName}`.trim() }
              : {})
          }
        : passenger
    )
  );
};

  const handleBooking = async () => {
    // Validate all passenger details before booking
    const invalidPassengers = passengerDetails.filter(p => 
      !p.firstName.trim() || !p.lastName.trim() || !p.age || !p.dob || !p.passportNo || !p.passportExpireDate
    );
    
    if (invalidPassengers.length > 0) {
      window.alert("❌ Please fill in all passenger details before booking.");
      return;
    }
    
    setBookingLoading(true);
    setBookingError(null);

    try {
      const flightTravellerDetails = passengerDetails.map(passenger => ({
        gender: passenger.gender,
        first_name: passenger.firstName,
        middle_name: passenger.middleName,
        last_name: passenger.lastName,
        age: passenger.age,
        dob: passenger.dob,
        passport_no: passenger.passportNo,
        passport_expire_date: passenger.passportExpireDate
      }));

      const staticValue = staticParam || "0@|0@|0@|0@|30@|0@|0@|0@|0@|0@|0@|0@|0@|0@|0@|1@|0@|0@|0@|f";
      
      const bookingPayload = {
        id: flightData?.flight_id?.toString() || flightData?.id || "6051",
        onward_date: flightData?.dep_date || flightData?.onward_date || "2026-12-22",
        return_date: isRoundTrip ? (flightData?.return_flight_data?.return_dep_date || "2026-12-26") : "",
        adult: passengers.adults,
        children: passengers.children,
        infant: passengers.infants,
        dep_city_code: flightData?.dep_airport_code || flightData?.dep_city_code || "AMD",
        arr_city_code: flightData?.arr_airport_code || flightData?.arr_city_code || "AUH",
        total_book_seats: totalBookSeats,
        contact_name: contactDetails.name,
        contact_email: contactDetails.email,
        contact_number: contactDetails.phone,
        static: staticValue,
        flight_traveller_details: flightTravellerDetails,
        booking_token_id: bookingTokenId,
        total_amount: totalPrice,
        end_user_ip: endUserIp || "183.83.43.117",
        token: token || "3-1-NEWTEST-dmjkwj78BJHk8"
      };

      console.log("Booking payload:", JSON.stringify(bookingPayload, null, 2));

      const response = await axios.post(
        'https://devapi.flightapi.co.in/v1/fbapi/book',
        bookingPayload,
        {
          headers: {
            'x-api-key': '1FMQKB1639407126571',
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("Booking response:", response.data);

      if (response.data.errorCode === 0 && response.data.data?.reference_id) {
        const referenceId = response.data.data.reference_id;
        window.alert(`✅ Tickets successfully created!\nReference ID: ${referenceId}`);
        await fetchBookingDetails(referenceId);
      } else {
        window.alert("❌ Unable to complete booking. Please try again.");
        setBookingError("Booking failed. Please try again.");
      }

    } catch (error: any) {
      console.error("Booking error:", error);
      let errorMessage = "Booking failed. Please try again.";
      if (error.response) {
        console.error("Error response data:", error.response.data);
        errorMessage = error.response.data?.message || 
                      error.response.data?.error || 
                      error.response.statusText;
      }
      window.alert(`❌ ${errorMessage}`);
      setBookingError(errorMessage);
    } finally {
      setBookingLoading(false);
    }
  };

  const fetchBookingDetails = async (referenceId: string) => {
    try {
      const bookingDetailsPayload = {
        reference_id: referenceId,
        transaction_id: referenceId,
        end_user_ip: endUserIp || "183.83.43.117",
        token: token || "3-1-NEWTEST-dmjkwj78BJHk8"
      };

      const response = await axios.post(
        'https://devapi.flightapi.co.in/v1/fbapi/booking_details',
        bookingDetailsPayload,
        {
          headers: {
            'x-api-key': '1FMQKB1639407126571',
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.replyCode === 0 && response.data.data) {
        onBookingComplete({
          bookingData: response.data.data,
          referenceId: referenceId,
          passengerDetails: passengerDetails,
          contactDetails: contactDetails
        });
      } else {
        window.alert("⚠️ Booking created but unable to fetch details. Reference ID: " + referenceId);
        onBookingComplete({
          referenceId: referenceId,
          passengerDetails: passengerDetails,
          contactDetails: contactDetails
        });
      }
    } catch (error: any) {
      console.error("Error fetching booking details:", error);
      window.alert("⚠️ Booking created but unable to fetch details. Reference ID: " + referenceId);
      onBookingComplete({
        referenceId: referenceId,
        passengerDetails: passengerDetails,
        contactDetails: contactDetails
      });
    }
  };

  const handleContactSave = () => {
    if (!contactDetails.name.trim()) {
      alert("Please enter contact name");
      return;
    }
    
    if (!contactDetails.email.trim() || !contactDetails.email.includes('@')) {
      alert("Please enter a valid email address");
      return;
    }
    
    if (!contactDetails.phone.trim() || contactDetails.phone.length < 10) {
      alert("Please enter a valid phone number (minimum 10 digits)");
      return;
    }
    
    setEditingContact(false);
  };

  const handleContactChange = (field: keyof ContactInfo, value: string) => {
    setContactDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // New functions for editing passenger details
  const startEditingPassenger = (passenger: PassengerDetails) => {
    setEditingPassengerId(passenger.id);
    setEditingPassengerData({ ...passenger });
  };

  const cancelEditingPassenger = () => {
    setEditingPassengerId(null);
    setEditingPassengerData({});
  };

  const saveEditingPassenger = () => {
    if (!editingPassengerId || !editingPassengerData) return;

    const updatedPassengers = passengerDetails.map(passenger => {
      if (passenger.id === editingPassengerId) {
        const updatedPassenger = {
          ...passenger,
          ...editingPassengerData,
          name: `${editingPassengerData.firstName || passenger.firstName} ${editingPassengerData.lastName || passenger.lastName}`
        };
        return updatedPassenger;
      }
      return passenger;
    });

    setPassengerDetails(updatedPassengers);
    setEditingPassengerId(null);
    setEditingPassengerData({});
  };

  const handlePassengerFieldChange = (field: keyof PassengerDetails, value: string | number) => {
    setEditingPassengerData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getPassengerIcon = (type: 'adult' | 'child' | 'infant') => {
    switch (type) {
      case 'adult': return <MdPerson />;
      case 'child': return <MdChildCare />;
      case 'infant': return <MdBabyChangingStation />;
      default: return <MdPerson />;
    }
  };

  const formatTime = (timeStr: string) => {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#f9fafb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '4px solid #e5e7eb',
            borderTopColor: '#3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }}></div>
          <p style={{ marginTop: '16px', color: '#6b7280' }}>Loading seat layout...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
        {/* Header */}
        <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px' }}>
            <button
              onClick={onBack}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#2563eb',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                marginBottom: '16px'
              }}
            >
              <IoArrowBack /> Back to Flights
            </button>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between' 
            }}>
              <div>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>
                  Select Your Seats
                </h1>
                <p style={{ color: '#6b7280' }}>
                  {flightData?.airline_name} • {flightData?.flight_number}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '30px', fontWeight: 'bold', color: '#2563eb' }}>
                  ₹{totalPrice.toLocaleString('en-IN')}
                </div>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>
                  <div>Total passengers: {totalBookSeats}</div>
                  <div>Available seats: {fareQuoteData?.available_seats || 0}</div>
                  <div>Booking Token: {bookingTokenId.substring(0, 8)}...</div>
                </div>
              </div>
            </div>
          </div>
        </div>
<div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 16px' }}>
  {/* Passenger Details Section - Form Layout */}
  <div style={{ 
    backgroundColor: 'white', 
    borderRadius: '12px', 
    padding: '24px',
    marginBottom: '24px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  }}>
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      marginBottom: '16px'
    }}>
      <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937' }}>
        Passenger Details ({totalBookSeats} Passenger{totalBookSeats > 1 ? 's' : ''})
      </h2>
      <button
        onClick={() => setShowPassengerDetails(!showPassengerDetails)}
        style={{
          background: 'none',
          border: 'none',
          color: '#3b82f6',
          cursor: 'pointer',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}
      >
        {showPassengerDetails ? 'Hide Details' : 'Show Details'}
      </button>
    </div>
    
    {showPassengerDetails && (
      <div style={{ 
        border: '1px solid #e5e7eb', 
        borderRadius: '8px',
        padding: '24px',
        marginTop: '16px',
        overflowX: 'auto'
      }}>
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#374151' }}>
            Please fill in passenger details
          </h3>
          <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>
            All fields are required for booking
          </p>
        </div>
        
        {/* Table Layout with Separate Labels */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1200px' }}>
            {/* Header Row */}
            <thead>
              <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                <th style={{ padding: '16px 12px', color: '#374151', fontSize: '14px', fontWeight: '600', backgroundColor: '#f9fafb', textAlign: 'left', width: '120px' }}>Type</th>
                <th style={{ padding: '16px 12px', color: '#374151', fontSize: '14px', fontWeight: '600', backgroundColor: '#f9fafb', textAlign: 'left', width: '150px' }}>First Name</th>
                <th style={{ padding: '16px 12px', color: '#374151', fontSize: '14px', fontWeight: '600', backgroundColor: '#f9fafb', textAlign: 'left', width: '150px' }}>Last Name</th>
                <th style={{ padding: '16px 12px', color: '#374151', fontSize: '14px', fontWeight: '600', backgroundColor: '#f9fafb', textAlign: 'left', width: '100px' }}>Gender</th>
                <th style={{ padding: '16px 12px', color: '#374151', fontSize: '14px', fontWeight: '600', backgroundColor: '#f9fafb', textAlign: 'left', width: '80px' }}>Age</th>
                <th style={{ padding: '16px 12px', color: '#374151', fontSize: '14px', fontWeight: '600', backgroundColor: '#f9fafb', textAlign: 'left', width: '120px' }}>DOB</th>
                <th style={{ padding: '16px 12px', color: '#374151', fontSize: '14px', fontWeight: '600', backgroundColor: '#f9fafb', textAlign: 'left', width: '150px' }}>Passport No.</th>
                <th style={{ padding: '16px 12px', color: '#374151', fontSize: '14px', fontWeight: '600', backgroundColor: '#f9fafb', textAlign: 'left', width: '120px' }}>Passport Expiry</th>
              </tr>
            </thead>
            
            {/* Body - Each passenger in one row with separate labels area above */}
            <tbody>
              {/* Labels Row (showing placeholder text) */}
         
              {/* Passenger Rows */}
              {passengerDetails.map((passenger, index) => (
                <tr key={passenger.id} style={{ 
                  borderBottom: '1px solid #f3f4f6',
                  backgroundColor: passenger.id === activePassengerId ? '#eff6ff' : 'white'
                }}>
                 
                  {/* Type Column */}
                  <td style={{ padding: '16px 12px', verticalAlign: 'top' }}>
                    <span style={{
                      padding: '6px 12px',
                      borderRadius: '12px',
                      fontSize: '13px',
                      fontWeight: '600',
                      backgroundColor: passenger.type === 'adult' ? '#dbeafe' : 
                                    passenger.type === 'child' ? '#fef3c7' : '#dcfce7',
                      color: passenger.type === 'adult' ? '#1d4ed8' : 
                            passenger.type === 'child' ? '#d97706' : '#059669',
                      display: 'inline-block',
                      textAlign: 'center'
                    }}>
                      {passenger.type.charAt(0).toUpperCase() + passenger.type.slice(1)}
                    </span>
                  </td>
                  
                  {/* First Name Column */}
                  <td style={{ padding: '16px 12px', verticalAlign: 'top' }}>
                    <input
                      type="text"
                      value={passenger.firstName}
                      onChange={(e) => handlePassengerInputChange(passenger.id, 'firstName', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '14px',
                        backgroundColor: 'white'
                      }}
                      placeholder="Enter first name"
                    />
                  </td>
                  
                  {/* Last Name Column */}
                  <td style={{ padding: '16px 12px', verticalAlign: 'top' }}>
                    <input
                      type="text"
                      value={passenger.lastName}
                      onChange={(e) => handlePassengerInputChange(passenger.id, 'lastName', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '14px',
                        backgroundColor: 'white'
                      }}
                      placeholder="Enter last name"
                    />
                  </td>
                  
                  {/* Gender Column */}
                  <td style={{ padding: '16px 12px', verticalAlign: 'top' }}>
                    <select
                      value={passenger.gender}
                      onChange={(e) => handlePassengerInputChange(passenger.id, 'gender', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '14px',
                        backgroundColor: 'white'
                      }}
                    >
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Ms">Ms</option>
                      <option value="Mstr">Mstr</option>
                    </select>
                  </td>
                  
                  {/* Age Column */}
                  <td style={{ padding: '16px 12px', verticalAlign: 'top' }}>
                    <input
                      type="number"
                      value={passenger.age || ''}
                      onChange={(e) => handlePassengerInputChange(passenger.id, 'age', parseInt(e.target.value) || 0)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '14px',
                        backgroundColor: 'white'
                      }}
                      placeholder="Age"
                      min="0"
                      max="120"
                    />
                  </td>
                  
                  {/* DOB Column */}
                  <td style={{ padding: '16px 12px', verticalAlign: 'top' }}>
                    <input
                      type="date"
                      value={passenger.dob || ''}
                      onChange={(e) => handlePassengerInputChange(passenger.id, 'dob', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '14px',
                        backgroundColor: 'white'
                      }}
                    />
                  </td>
                  
                  {/* Passport Number Column */}
                  <td style={{ padding: '16px 12px', verticalAlign: 'top' }}>
                    <input
                      type="text"
                      value={passenger.passportNo || ''}
                      onChange={(e) => handlePassengerInputChange(passenger.id, 'passportNo', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '14px',
                        backgroundColor: 'white'
                      }}
                      placeholder="Passport number"
                    />
                  </td>
                  
                  {/* Passport Expiry Column */}
                  <td style={{ padding: '16px 12px', verticalAlign: 'top' }}>
                    <input
                      type="date"
                      value={passenger.passportExpireDate || ''}
                      onChange={(e) => handlePassengerInputChange(passenger.id, 'passportExpireDate', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '14px',
                        backgroundColor: 'white'
                      }}
                    />
                  </td>
                  
               
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
     
      </div>
    )}
  </div>
  
 

          {/* Contact Information Section */}
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '12px', 
            padding: '24px',
            marginBottom: '24px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937' }}>Contact Information</h2>
              <button
                onClick={() => editingContact ? handleContactSave() : setEditingContact(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  backgroundColor: editingContact ? '#10b981' : '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                {editingContact ? (
                  <>
                    <MdSave size={16} /> Save
                  </>
                ) : (
                  <>
                    <MdEdit size={16} /> Edit
                  </>
                )}
              </button>
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '20px',
              marginBottom: '16px'
            }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  color: '#4b5563',
                  marginBottom: '8px'
                }}>
                  Full Name
                </label>
                {editingContact ? (
                  <input
                    type="text"
                    value={contactDetails.name}
                    onChange={(e) => handleContactChange('name', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    placeholder="Enter full name"
                  />
                ) : (
                  <div style={{ 
                    padding: '12px', 
                    backgroundColor: '#f9fafb', 
                    borderRadius: '8px',
                    border: '1px solid #f3f4f6',
                    fontSize: '15px',
                    color: '#1f2937',
                    fontWeight: '500'
                  }}>
                    {contactDetails.name}
                  </div>
                )}
              </div>
              
              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  color: '#4b5563',
                  marginBottom: '8px'
                }}>
                  Email Address
                </label>
                {editingContact ? (
                  <input
                    type="email"
                    value={contactDetails.email}
                    onChange={(e) => handleContactChange('email', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    placeholder="Enter email address"
                  />
                ) : (
                  <div style={{ 
                    padding: '12px', 
                    backgroundColor: '#f9fafb', 
                    borderRadius: '8px',
                    border: '1px solid #f3f4f6',
                    fontSize: '15px',
                    color: '#1f2937',
                    fontWeight: '500'
                  }}>
                    {contactDetails.email}
                  </div>
                )}
              </div>
              
              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  color: '#4b5563',
                  marginBottom: '8px'
                }}>
                  Phone Number
                </label>
                {editingContact ? (
                  <input
                    type="tel"
                    value={contactDetails.phone}
                    onChange={(e) => handleContactChange('phone', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    placeholder="Enter phone number"
                  />
                ) : (
                  <div style={{ 
                    padding: '12px', 
                    backgroundColor: '#f9fafb', 
                    borderRadius: '8px',
                    border: '1px solid #f3f4f6',
                    fontSize: '15px',
                    color: '#1f2937',
                    fontWeight: '500'
                  }}>
                    {contactDetails.phone}
                  </div>
                )}
              </div>
            </div>
            
            {editingContact && (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'flex-end',
                gap: '10px',
                marginTop: '16px'
              }}>
                <button
                  onClick={() => {
                    setEditingContact(false);
                    // Reset to original values
                    if (contactInfo) {
                      setContactDetails(contactInfo);
                    }
                  }}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#f3f4f6',
                    color: '#374151',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontWeight: '500'
                  }}
                >
                  <MdClose size={16} /> Cancel
                </button>
              </div>
            )}
            
            <div style={{ 
              marginTop: '20px',
              padding: '12px 16px',
              backgroundColor: '#f0f9ff',
              borderRadius: '8px',
              borderLeft: '4px solid #3b82f6'
            }}>
              <p style={{ fontSize: '13px', color: '#1e40af', margin: 0 }}>
                <strong>Note:</strong> These contact details will be used for booking confirmation and updates.
                Please ensure they are accurate.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ 
            marginTop: '32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <button
              onClick={onBack}
              style={{
                padding: '14px 28px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                backgroundColor: 'white',
                color: '#374151',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '15px'
              }}
            >
              Cancel
            </button>
            
            <div style={{ textAlign: 'right' }}>
              {bookingError && (
                <div style={{ color: '#dc2626', marginBottom: '12px', fontSize: '14px' }}>
                  {bookingError}
                </div>
              )}
              <button
                onClick={handleBooking}
                disabled={bookingLoading}
                style={{
                  padding: '14px 36px',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  cursor: bookingLoading ? 'not-allowed' : 'pointer',
                  backgroundColor: bookingLoading ? '#9ca3af' : '#059669',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  minWidth: '250px',
                  justifyContent: 'center'
                }}
              >
                {bookingLoading ? (
                  <>
                    <div style={{
                      width: '18px',
                      height: '18px',
                      border: '2px solid #ffffff',
                      borderTopColor: 'transparent',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}></div>
                    Processing Booking...
                  </>
                ) : (
                  `Complete Booking - ₹${totalPrice.toLocaleString('en-IN')}`
                )}
              </button>
              <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>
                Includes seat selection charges
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
      
      <Footer />
    </div>
  );
};

export default SeatSelection;