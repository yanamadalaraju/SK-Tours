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
import { 
  Seat, 
  PassengerDetails, 
  ContactInfo, 
  SeatSelectionProps,
  FlightTravellerDetail,
  BookingResponse,
  BookingDetailsResponse
} from "./types";

const SeatSelection: React.FC<SeatSelectionProps> = ({
  flightData,
  fareQuoteData,
  passengers,
  onBack,
  onBookingComplete,
  bookingTokenId,
  token,
  endUserIp,
  staticParam,
  contactInfo
}) => {
  const [selectedOnwardSeats, setSelectedOnwardSeats] = useState<Seat[]>([]);
  const [selectedReturnSeats, setSelectedReturnSeats] = useState<Seat[]>([]);
  const [loading, setLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(fareQuoteData?.total_payable_price || 0);
  const [activePassengerId, setActivePassengerId] = useState<number | null>(null);
  const [activeFlightType, setActiveFlightType] = useState<'onward' | 'return'>('onward');
  const [passengerDetails, setPassengerDetails] = useState<PassengerDetails[]>([]);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [editingContact, setEditingContact] = useState(false);
  const [contactDetails, setContactDetails] = useState<ContactInfo>(contactInfo || {
    name: "",
    email: "",
    phone: ""
  });
  const [showPassengerDetails, setShowPassengerDetails] = useState(true);
  
  const totalBookSeats = passengers.adults + passengers.children + passengers.infants;
  const totalPhysicalSeats = passengers.adults + passengers.children;
  
  // Check if it's a round trip
  const isRoundTrip = flightData?.trip_type === 1;

  // Initialize passenger details
  useEffect(() => {
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
        gender: 'Mr' as 'Mr' | 'Mrs' | 'Ms' | 'Mstr',
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
        gender: 'Mstr' as 'Mr' | 'Mrs' | 'Ms' | 'Mstr',
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
        gender: 'Mstr' as 'Mr' | 'Mrs' | 'Ms' | 'Mstr',
        requiresSeat: false,
        icon: <MdBabyChangingStation />,
        isInfantOnLap: true,
        lapOfPassengerId: 1,
        passportNo: '',
        passportExpireDate: ''
      });
    }
    
    setPassengerDetails(details);
    
    // Set first adult as active
    const firstAdult = details.find(p => p.type === 'adult');
    if (firstAdult) {
      setActivePassengerId(firstAdult.id);
    }
  }, [passengers]);

  // Handle direct input changes for passenger details
  const handlePassengerInputChange = (passengerId: number, field: keyof PassengerDetails, value: string | number) => {
    setPassengerDetails(prev => 
      prev.map(passenger => 
        passenger.id === passengerId 
          ? { 
              ...passenger, 
              [field]: value,
              ...(field === 'firstName' || field === 'lastName' 
                ? { name: `${field === 'firstName' ? value : passenger.firstName} ${field === 'lastName' ? value : passenger.lastName}`.trim() }
                : {})
            }
          : passenger
      )
    );
  };

  const handleBooking = async () => {
    // Validate passenger details
    const invalidPassengers = passengerDetails.filter(p => 
      !p.firstName.trim() || !p.lastName.trim() || !p.age || !p.dob || !p.passportNo || !p.passportExpireDate
    );
    
    if (invalidPassengers.length > 0) {
      window.alert("❌ Please fill in all passenger details before booking.");
      return;
    }
    
    // Validate contact details
    if (!contactDetails.name.trim() || !contactDetails.email.trim() || !contactDetails.phone.trim()) {
      window.alert("❌ Please fill in all contact details before booking.");
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

      // Use the actual flight data for booking payload
      const bookingPayload = {
        id: flightData?.id || "",
        onward_date: flightData?.onward_date || "",
        return_date: isRoundTrip ? (flightData?.return_flight_data?.return_dep_date || "") : "",
        adult: passengers.adults,
        children: passengers.children,
        infant: passengers.infants,
        dep_city_code: flightData?.dep_airport_code || flightData?.dep_city_code || "",
        arr_city_code: flightData?.arr_airport_code || flightData?.arr_city_code || "",
        total_book_seats: totalBookSeats,
        contact_name: contactDetails.name,
        contact_email: contactDetails.email,
        contact_number: contactDetails.phone,
        static: staticParam || flightData?.static || "",
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
          <p style={{ marginTop: '16px', color: '#6b7280' }}>Loading...</p>
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
                  Passenger Details & Booking
                </h1>
                <p style={{ color: '#6b7280' }}>
                  {flightData?.airline_name} • Flight {flightData?.flight_number} • 
                  {isRoundTrip ? ' Round Trip' : ' One Way'}
                </p>
                <div style={{ display: 'flex', gap: '20px', marginTop: '8px' }}>
                  <div>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>Departure: </span>
                    <span style={{ fontWeight: '500' }}>
                      {formatDate(flightData?.onward_date)} at {formatTime(flightData?.dep_time)}
                    </span>
                  </div>
                  {isRoundTrip && flightData?.return_flight_data && (
                    <div>
                      <span style={{ fontSize: '14px', color: '#6b7280' }}>Return: </span>
                      <span style={{ fontWeight: '500' }}>
                        {formatDate(flightData?.return_flight_data?.return_dep_date)} at {formatTime(flightData?.return_flight_data?.return_dep_time)}
                      </span>
                    </div>
                  )}
                </div>
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
          {/* Passenger Details Section */}
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
                
                {/* Table Layout */}
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1200px' }}>
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
                    
                    <tbody>
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
                Includes all taxes and charges
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