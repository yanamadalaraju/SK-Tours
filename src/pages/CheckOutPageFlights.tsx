// src/pages/CheckoutPage.jsx - Updated version with Passenger Details
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { BASE_URL } from '@/ApiUrls';
import axios from 'axios';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { AlertCircle } from "lucide-react";

// Passenger interface (matching SeatSelection component)
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
  isInfantOnLap?: boolean;
  lapOfPassengerId?: number;
  passportNo?: string;
  passportExpireDate?: string;
}

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get tour data from navigation state or localStorage
  const [tourData, setTourData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // State for payment amount
  const [showCustomAmountModal, setShowCustomAmountModal] = useState(false);
  const [customPaymentAmount, setCustomPaymentAmount] = useState('');
  const [paymentType, setPaymentType] = useState('full'); // 'full', 'custom', or 'partial'
  const [isPartialPayment, setIsPartialPayment] = useState(false);

  // Passenger details state (from SeatSelection)
  const [passengerDetails, setPassengerDetails] = useState<PassengerDetails[]>([]);
  const [showPassengerDetails, setShowPassengerDetails] = useState(true);

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    paymentMethod: 'upi',
    termsAccepted: false
  });

  // Initialize tour data and passenger details
  useEffect(() => {
    if (location.state?.tour) {
      const tour = location.state.tour;
      setTourData(tour);

      // Initialize with full amount by default
      const totalTourCost = tour.total_price_value || tour.priceValue || parsePrice(tour.price);
      setCustomPaymentAmount(totalTourCost.toString());
      setPaymentType('full');

      // Initialize passenger details based on tour passenger count
      initializePassengerDetails(tour);

      setLoading(false);
    } else {
      const savedTour = localStorage.getItem('selectedTour');
      if (savedTour) {
        const parsedTour = JSON.parse(savedTour);
        setTourData(parsedTour);

        const totalTourCost = parsedTour.total_price_value || parsedTour.priceValue || parsePrice(parsedTour.price);
        setCustomPaymentAmount(totalTourCost.toString());
        setPaymentType('full');

        // Initialize passenger details based on parsed tour
        initializePassengerDetails(parsedTour);
      }
      setLoading(false);
    }
  }, [location]);

  // Initialize passenger details function
  const initializePassengerDetails = (tour) => {
    // Get passenger counts from tour data (default to 1 adult if not specified)
    const adults = tour.adults || 1;
    const children = tour.children || 0;
    const infants = tour.infants || 0;

    const details: PassengerDetails[] = [];
    let id = 1;

    // Add adults
    for (let i = 0; i < adults; i++) {
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
        passportNo: '',
        passportExpireDate: ''
      });
    }

    // Add children
    for (let i = 0; i < children; i++) {
      details.push({
        id: id++,
        type: 'child',
        name: '',
        firstName: '',
        middleName: '',
        lastName: '',
        age: 8,
        dob: '',
        gender: 'Mstr',
        requiresSeat: true,
        passportNo: '',
        passportExpireDate: ''
      });
    }

    // Add infants
    for (let i = 0; i < infants; i++) {
      details.push({
        id: id++,
        type: 'infant',
        name: '',
        firstName: '',
        middleName: '',
        lastName: '',
        age: 1,
        dob: '',
        gender: 'Mstr',
        requiresSeat: false,
        isInfantOnLap: true,
        lapOfPassengerId: 1,
        passportNo: '',
        passportExpireDate: ''
      });
    }

    setPassengerDetails(details);
  };

  // Handle passenger input change
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

  // Validate all passenger details
  const validatePassengerDetails = () => {
    for (const passenger of passengerDetails) {
      if (!passenger.firstName?.trim()) {
        alert(`Please enter first name for ${passenger.type} #${passenger.id}`);
        return false;
      }
      if (!passenger.lastName?.trim()) {
        alert(`Please enter last name for ${passenger.type} #${passenger.id}`);
        return false;
      }
      if (!passenger.age || passenger.age <= 0) {
        alert(`Please enter valid age for ${passenger.type} #${passenger.id}`);
        return false;
      }
      if (!passenger.dob) {
        alert(`Please enter date of birth for ${passenger.type} #${passenger.id}`);
        return false;
      }
      if (!passenger.passportNo?.trim()) {
        alert(`Please enter passport number for ${passenger.type} #${passenger.id}`);
        return false;
      }
      if (!passenger.passportExpireDate) {
        alert(`Please enter passport expiry date for ${passenger.type} #${passenger.id}`);
        return false;
      }
    }
    return true;
  };

  // Handle custom amount input
  const handleCustomAmountChange = (value) => {
    setCustomPaymentAmount(value);

    if (tourData) {
      const totalTourCost = getTotalTourCost();
      const enteredAmount = parseFloat(value) || 0;

      // Determine payment type based on amount
      if (enteredAmount >= totalTourCost) {
        setPaymentType('full');
        setIsPartialPayment(false);
      } else if (enteredAmount > 0 && enteredAmount < totalTourCost) {
        setPaymentType('partial');
        setIsPartialPayment(true);
      }
    }
  };

  // Get total tour cost
  const getTotalTourCost = () => {
    if (!tourData) return 0;
    return tourData.total_price_value || tourData.priceValue || parsePrice(tourData.price);
  };

  // Get current payment amount
  const getCurrentPaymentAmount = () => {
    if (!tourData) return 0;

    if (paymentType === 'custom' || paymentType === 'partial') {
      return Math.round(parseFloat(customPaymentAmount) || 0);
    }

    return getTotalTourCost();
  };

  // Validate custom amount
  const validateCustomAmount = () => {
    if (!tourData) return false;

    const totalTourCost = getTotalTourCost();
    const minAmount = 1; // Minimum ₹1
    const maxAmount = totalTourCost;
    const enteredAmount = parseFloat(customPaymentAmount);

    if (isNaN(enteredAmount)) {
      alert('Please enter a valid amount');
      return false;
    }

    if (enteredAmount < minAmount) {
      alert(`Minimum payment amount is ${formatPrice(minAmount)}`);
      return false;
    }

    if (enteredAmount > maxAmount) {
      alert(`Amount cannot exceed total tour cost of ${formatPrice(maxAmount)}`);
      return false;
    }

    return true;
  };

  // Handle confirm custom amount
  const handleConfirmCustomAmount = () => {
    if (validateCustomAmount()) {
      const totalTourCost = getTotalTourCost();
      const enteredAmount = parseFloat(customPaymentAmount);

      if (enteredAmount >= totalTourCost) {
        setPaymentType('full');
        setIsPartialPayment(false);
      } else {
        setPaymentType('partial');
        setIsPartialPayment(true);
      }

      setShowCustomAmountModal(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRadioChange = (value) => {
    setFormData(prev => ({
      ...prev,
      paymentMethod: value
    }));
  };

  // Parse price from string to number
  const parsePrice = (priceString) => {
    if (!priceString) return 0;

    // Remove currency symbols, commas, and spaces
    const numericString = priceString
      .toString()
      .replace(/[₹$,]/g, '')
      .replace(/\s+/g, '')
      .trim();

    return parseFloat(numericString) || 0;
  };

  // Format price to display
  const formatPrice = (price) => {
    return `₹${parseFloat(price).toLocaleString('en-IN')}`;
  };

  // Calculate percentage
  const calculatePercentage = (amount) => {
    const total = getTotalTourCost();
    return total > 0 ? Math.round((amount / total) * 100) : 0;
  };

  // Handle payment
  // src/pages/CheckoutPage.jsx - Updated handlePhonePePayment function

  // src/pages/CheckoutPage.jsx - Updated handlePhonePePayment function with transaction saving

  // src/pages/CheckoutPage.jsx - Updated handlePhonePePayment function with correct redirect

const handlePhonePePayment = async (e) => {
  e.preventDefault();
  setSubmitting(true);

  // Validate required fields
  const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'pincode'];
  const missingFields = requiredFields.filter(field => !formData[field]);

  if (missingFields.length > 0) {
    alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
    setSubmitting(false);
    return;
  }

  if (!formData.termsAccepted) {
    alert('Please accept the terms and conditions');
    setSubmitting(false);
    return;
  }

  // Validate passenger details
  if (!validatePassengerDetails()) {
    setSubmitting(false);
    return;
  }

  // Validate phone number
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
    alert('Please enter a valid 10-digit Indian phone number');
    setSubmitting(false);
    return;
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    alert('Please enter a valid email address');
    setSubmitting(false);
    return;
  }

  // Get current payment amount
  const totalTourCost = getTotalTourCost();
  let paymentAmount = getCurrentPaymentAmount();
  const paymentPercentage = calculatePercentage(paymentAmount);
  const isFullPayment = paymentAmount >= totalTourCost;

  if (paymentAmount <= 0) {
    alert('Please enter a valid payment amount');
    setSubmitting(false);
    return;
  }

  try {
    const paymentDescription = isFullPayment
      ? `Full Payment for ${tourData.code || tourData.title}`
      : `${paymentPercentage}% Partial Payment for ${tourData.code || tourData.title}`;

    console.log('Payment processing:', {
      amount: paymentAmount,
      totalTourCost: totalTourCost,
      paymentPercentage: paymentPercentage,
      isFullPayment: isFullPayment,
      description: paymentDescription,
      paymentType: paymentType,
      passengerDetails: passengerDetails
    });

    // Prepare passenger details for API
    const passengerDetailsForAPI = passengerDetails.map(p => ({
      id: p.id,
      type: p.type,
      gender: p.gender,
      first_name: p.firstName,
      middle_name: p.middleName || '',
      last_name: p.lastName,
      age: p.age,
      dob: p.dob,
      passport_no: p.passportNo,
      passport_expire_date: p.passportExpireDate,
      requires_seat: p.requiresSeat,
      is_infant_on_lap: p.isInfantOnLap || false,
      lap_of_passenger_id: p.lapOfPassengerId || null
    }));

    // Prepare contact details
    const contactDetails = {
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      city: formData.city.trim(),
      state: formData.state.trim(),
      pincode: formData.pincode.trim(),
      country: formData.country.trim()
    };

    // Prepare flight data for saving
    const flightData = {
      flight: {
        id: tourData.id,
        airline_name: tourData.airline,
        flight_number: tourData.flightNumber,
        airline_code: tourData.airline_code,

        // Onward flight
        dep_city_code: tourData.departure?.city_code,
        dep_city_name: tourData.departure?.city,
        dep_airport_code: tourData.departure?.airport,
        dep_airport_name: tourData.departure?.airport,
        dep_terminal_no: tourData.departure?.terminal,
        dep_time: tourData.departure?.time,
        onward_date: tourData.departure?.date,

        arr_city_code: tourData.arrival?.city_code,
        arr_city_name: tourData.arrival?.city,
        arr_airport_code: tourData.arrival?.airport,
        arr_airport_name: tourData.arrival?.airport,
        arr_terminal_no: tourData.arrival?.terminal,
        arr_time: tourData.arrival?.time,
        arr_date: tourData.arrival?.date,

        duration: tourData.duration,
        no_of_stop: tourData.number_of_stops || 0,
        stop_data: tourData.stop_data || [],

        // Return flight (if round trip)
        return_flight_data: tourData.return_flight ? {
          return_airline_name: tourData.return_flight.airline_name,
          return_flight_number: tourData.return_flight.flight_number,
          return_airline_code: tourData.return_flight.airline_code,
          return_dep_city_code: tourData.return_flight.departure?.city_code,
          return_dep_city_name: tourData.return_flight.departure?.city,
          return_dep_airport_code: tourData.return_flight.departure?.airport,
          return_dep_airport_name: tourData.return_flight.departure?.airport,
          return_dep_terminal_no: tourData.return_flight.departure?.terminal,
          return_dep_time: tourData.return_flight.departure?.time,
          return_dep_date: tourData.return_flight.departure?.date,
          return_arr_city_code: tourData.return_flight.arrival?.city_code,
          return_arr_city_name: tourData.return_flight.arrival?.city,
          return_arr_airport_code: tourData.return_flight.arrival?.airport,
          return_arr_airport_name: tourData.return_flight.arrival?.airport,
          return_arr_terminal_no: tourData.return_flight.arrival?.terminal,
          return_arr_time: tourData.return_flight.arrival?.time,
          return_arr_date: tourData.return_flight.arrival?.date,
          return_trip_duration: tourData.return_flight.duration,
          return_no_of_stop: tourData.return_flight.number_of_stops || 0,
          return_stop_data: tourData.return_flight.stop_data || []
        } : null,

        // International flight
        international_flight_staus: tourData.international_flight_status || 0,

        // Baggage
        check_in_baggage_adult: tourData.check_in_baggage_adult,
        check_in_baggage_children: tourData.check_in_baggage_children,
        check_in_baggage_infant: tourData.check_in_baggage_infant,
        cabin_baggage_adult: tourData.cabin_baggage_adult,
        cabin_baggage_children: tourData.cabin_baggage_children,
        cabin_baggage_infant: tourData.cabin_baggage_infant,

        // Pricing
        total_payable_price: tourData.total_amount_value,
        per_adult_child_price: tourData.per_adult_child_price,
        per_infant_price: tourData.per_infant_price,

        // Seats
        available_seats: tourData.available_seats,

        // Static
        static: tourData.static_value
      },

      bookingParams: {
        onwardDate: tourData.departure?.date,
        returnDate: tourData.return_departure?.date || null,
        adults: tourData.adults || 1,
        children: tourData.children || 0,
        infants: tourData.infants || 0,
        totalAmount: paymentAmount,
        staticValue: tourData.static_value
      },

      tripType: tourData.trip_type || 0,
      bookingTokenId: tourData.booking_token_id,

      passengerDetails: passengerDetailsForAPI,
      contactDetails: contactDetails
    };

    // Step 1: Save booking to database (onlineflights table)
    console.log('Saving booking to onlineflights table...');
    const saveResponse = await axios.post(
      `${BASE_URL}/api/online-flights/save-booking`,
      flightData
    );

    if (!saveResponse.data.success) {
      throw new Error('Failed to create booking record. Please try again.');
    }

    const bookingId = saveResponse.data.bookingId;
    console.log('Booking saved with ID:', bookingId);

    // Step 2: Create PhonePe order with return URL
    const merchantOrderId = `FLT_${bookingId}_${Date.now()}`;
    const baseUrl = window.location.origin;
    const redirectUrl = `${baseUrl}/flight-payment-result`;

    // Create PhonePe order - Transaction will be created in backend
    const paymentResponse = await axios.post(
      `${BASE_URL}/api/flight/phonepe/orders`,
      {
        action: 'create-order',
        amount: paymentAmount,
        currency: "INR",
        environment: "test",
        merchantOrderId: merchantOrderId,
        redirectUrl: redirectUrl,
        customerDetails: {
          name: contactDetails.name,
          email: contactDetails.email,
          phone: contactDetails.phone,
          booking_id: bookingId,
          flight_number: tourData.flightNumber,
          payment_type: isFullPayment ? 'full' : 'partial',
          payment_percentage: paymentPercentage,
          passenger_count: passengerDetails.length
        }
      }
    );

    console.log("REFERENCE_ID:", paymentResponse.data.merchantOrderId);
    console.log("Payment details:", paymentResponse);

    if (paymentResponse.data.success) {
      // Step 3: Update booking with reference ID in onlineflights table
      await axios.put(
        `${BASE_URL}/api/online-flights/update-booking/${bookingId}`,
        {
          referenceId: paymentResponse.data.merchantOrderId,
          bookingStatus: 'Processing',
          paymentStatus: 'Processing',
          apiResponse: paymentResponse.data
        }
      );

      // Save booking details to localStorage
      const bookingData = {
        booking_id: bookingId,
        flight: flightData.flight,
        customer: contactDetails,
        passenger_details: passengerDetailsForAPI,
        timestamp: new Date().toISOString(),
        amount: paymentAmount,
        total_tour_cost: totalTourCost,
        payment_percentage: paymentPercentage,
        is_full_payment: isFullPayment,
        merchant_order_id: paymentResponse.data.merchantOrderId,
        payment_type: isFullPayment ? 'full' : 'partial'
      };

      localStorage.setItem('currentFlightBooking', JSON.stringify(bookingData));
      localStorage.setItem('phonePeOrderId', paymentResponse.data.merchantOrderId);
      localStorage.setItem('flightBookingId', bookingId);

      console.log('Redirecting to PhonePe:', paymentResponse.data.checkoutPageUrl);

      // Redirect to PhonePe payment page
      window.location.href = paymentResponse.data.checkoutPageUrl;
    } else {
      throw new Error(paymentResponse.data.message || 'Failed to initialize payment. Please try again.');
    }
  } catch (error) {
    console.error("Payment processing error:", error);
    alert(`Payment failed: ${error.response?.data?.message || error.message || 'Please try again'}`);
    setSubmitting(false);
  }
};

  // Loading and no-tour handling
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E53C42] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading booking details...</p>
        </div>
      </div>
    );
  }

  if (!tourData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Tour Selected</h2>
          <p className="text-gray-600 mb-6">Please select a tour to proceed with booking.</p>
          <Button
            onClick={() => navigate('/')}
            className="bg-[#2E4D98] hover:bg-[#2E4D98]/90 px-8 py-6 text-lg"
          >
            Browse Tours
          </Button>
        </div>
      </div>
    );
  }

  // Calculate amounts
  const totalTourCost = getTotalTourCost();
  const paymentAmount = getCurrentPaymentAmount();
  const paymentPercentage = calculatePercentage(paymentAmount);
  const balanceAmount = totalTourCost - paymentAmount;
  const isFullPayment = paymentAmount >= totalTourCost;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-[#2E4D98] hover:underline flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Tour
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Booking Summary, Passenger Details & Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">Complete Your Booking</h1>
                  <p className="text-gray-600">Pay any amount - from partial to full payment</p>
                </div>
                <div className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
                  <span className="text-sm font-semibold text-blue-700">Flexible Payment</span>
                </div>
              </div>

              {/* Tour Summary */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 mb-8 border border-blue-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                  </svg>
                  Tour Summary
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-2">{tourData.title}</h3>
                    <p className="text-gray-600 mb-3">{tourData.locations}</p>
                    <div className="flex items-center gap-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {tourData.duration}
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        {tourData.code}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {formatPrice(totalTourCost)}
                    </div>
                    <p className="text-gray-600">Total Tour Cost</p>
                    <p className="text-sm text-gray-500 mt-1">EMI: {tourData.emi || 'N/A'}/month</p>
                  </div>
                </div>
              </div>

              {/* Payment Amount Selection */}
              <div className="bg-white border border-gray-200 rounded-xl p-5 mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                  </svg>
                  Payment Amount
                </h2>

                {/* Full Payment Option */}
                <div className="mb-4">
                  <div className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${paymentType === 'full' ? 'border-[#2E4D98] bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                    onClick={() => {
                      setPaymentType('full');
                      setCustomPaymentAmount(totalTourCost.toString());
                      setIsPartialPayment(false);
                    }}>
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentType === 'full' ? 'border-[#2E4D98] bg-[#2E4D98]' : 'border-gray-300'}`}>
                        {paymentType === 'full' && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">Full Payment</h3>
                        <p className="text-sm text-gray-600">Pay the complete amount now</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">{formatPrice(totalTourCost)}</div>
                      <div className="text-sm text-gray-600">100% of total</div>
                    </div>
                  </div>
                </div>

                {/* Custom Amount Option - Commented out as in original */}
              </div>

              {/* Passenger Details Section - Copied from SeatSelection */}
              <div className="bg-white border border-gray-200 rounded-xl p-5 mb-8">
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px'
                }}>
                  <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937' }}>
                    Passenger Details ({passengerDetails.length} Passenger{passengerDetails.length > 1 ? 's' : ''})
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
                              backgroundColor: 'white'
                            }}>
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
                                  className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </td>

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
                                  className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </td>

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
                                  className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                  <option value="Mr">Mr</option>
                                  <option value="Mrs">Mrs</option>
                                  <option value="Ms">Ms</option>
                                  <option value="Mstr">Mstr</option>
                                </select>
                              </td>

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
                                  className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </td>

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
                                  className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </td>

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
                                  className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </td>

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
                                  className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Summary of passenger counts */}
                    <div style={{
                      marginTop: '20px',
                      padding: '16px',
                      backgroundColor: '#f9fafb',
                      borderRadius: '8px',
                      display: 'flex',
                      gap: '24px',
                      fontSize: '14px'
                    }}>
                      <div>
                        <span style={{ color: '#6b7280' }}>Adults: </span>
                        <span style={{ fontWeight: '600', color: '#1f2937' }}>
                          {passengerDetails.filter(p => p.type === 'adult').length}
                        </span>
                      </div>
                      <div>
                        <span style={{ color: '#6b7280' }}>Children: </span>
                        <span style={{ fontWeight: '600', color: '#1f2937' }}>
                          {passengerDetails.filter(p => p.type === 'child').length}
                        </span>
                      </div>
                      <div>
                        <span style={{ color: '#6b7280' }}>Infants: </span>
                        <span style={{ fontWeight: '600', color: '#1f2937' }}>
                          {passengerDetails.filter(p => p.type === 'infant').length}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Payment Information Notice */}
              {isPartialPayment && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        <strong>Note:</strong> You are paying {paymentPercentage}% ({formatPrice(paymentAmount)}) now.
                        The remaining {formatPrice(balanceAmount)} ({100 - paymentPercentage}%) will be payable before the tour departure date.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Booking Form */}
              <form onSubmit={handlePhonePePayment} className="space-y-8">
                {/* Personal Details */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-3 border-b">Personal Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName" className="text-gray-700 font-medium mb-2 block">
                        First Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="h-12"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-gray-700 font-medium mb-2 block">
                        Last Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="h-12"
                        placeholder="Enter your last name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-gray-700 font-medium mb-2 block">
                        Email Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="h-12"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-gray-700 font-medium mb-2 block">
                        Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="h-12"
                        placeholder="Enter 10-digit mobile number"
                      />
                    </div>
                  </div>
                </div>

                {/* Address Details */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-3 border-b">Address Details</h2>
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="address" className="text-gray-700 font-medium mb-2 block">
                        Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="h-12"
                        placeholder="Enter your complete address"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <Label htmlFor="city" className="text-gray-700 font-medium mb-2 block">
                          City <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          className="h-12"
                          placeholder="Enter city"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state" className="text-gray-700 font-medium mb-2 block">
                          State <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          required
                          className="h-12"
                          placeholder="Enter state"
                        />
                      </div>
                      <div>
                        <Label htmlFor="pincode" className="text-gray-700 font-medium mb-2 block">
                          Pincode <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="pincode"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          required
                          className="h-12"
                          placeholder="Enter pincode"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="country" className="text-gray-700 font-medium mb-2 block">
                        Country
                      </Label>
                      <Input
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="h-12"
                        placeholder="Enter country"
                      />
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Checkbox
                    id="terms"
                    checked={formData.termsAccepted}
                    onCheckedChange={(checked) =>
                      setFormData(prev => ({ ...prev, termsAccepted: checked }))
                    }
                    className="mt-1"
                  />
                  <Label htmlFor="terms" className="cursor-pointer text-sm">
                    I agree to the{' '}
                    <a href="/terms" className="text-[#2E4D98] hover:underline font-medium">
                      Terms & Conditions
                    </a>{' '}
                    and{' '}
                    <a href="/privacy" className="text-[#2E4D98] hover:underline font-medium">
                      Privacy Policy
                    </a>
                    . {isPartialPayment && `I understand that I'm paying ${paymentPercentage}% now and the remaining amount must be paid before the tour departure date.`} <span className="text-red-500">*</span>
                  </Label>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={submitting || !formData.termsAccepted}
                    className="w-full bg-[#E53C42] hover:bg-[#E53C42]/90 text-white py-7 text-lg font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    {submitting ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Processing Payment...
                      </div>
                    ) : (
                      `Pay ${isFullPayment ? 'Amount' : `${paymentPercentage}%`} - ${formatPrice(paymentAmount)}`
                    )}
                  </Button>
                  <p className="text-center text-sm text-gray-500 mt-3">
                    You will be redirected to PhonePe's secure payment page
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column - Price Breakdown */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-3 border-b">Price Breakdown</h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-3 border-b">
                  <div>
                    <span className="text-gray-700 font-medium">Total Tour Cost</span>
                    <p className="text-sm text-gray-500">Complete package including all services</p>
                  </div>
                  <span className="text-lg font-bold text-gray-900">{formatPrice(totalTourCost)}</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b">
                  <div>
                    <span className="text-blue-600 font-semibold">
                      {isFullPayment ? 'Full Payment' : `Partial Payment (${paymentPercentage}%)`}
                    </span>
                    <p className="text-sm text-gray-500">Pay now to confirm your booking</p>
                  </div>
                  <span className="text-xl font-bold text-blue-600">{formatPrice(paymentAmount)}</span>
                </div>

                {!isFullPayment && (
                  <div className="flex justify-between items-center py-3">
                    <div>
                      <span className="text-gray-600">Balance to Pay Later</span>
                      <p className="text-sm text-gray-500">Payable before departure</p>
                    </div>
                    <span className="text-lg font-semibold text-gray-700">{formatPrice(balanceAmount)}</span>
                  </div>
                )}

                <div className="bg-blue-50 rounded-xl p-4 mt-6 border border-blue-100">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-800">Amount to Pay Now</span>
                    <span className="text-2xl font-bold text-[#E53C42]">{formatPrice(paymentAmount)}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 text-center">
                    {isFullPayment ? '100% of total cost' : `${paymentPercentage}% of total cost`}
                  </p>
                </div>
              </div>

              {/* Passenger Summary */}
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6">
                <h3 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  Passenger Summary
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-purple-700">Adults:</span>
                    <span className="font-semibold text-purple-900">{passengerDetails.filter(p => p.type === 'adult').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-700">Children:</span>
                    <span className="font-semibold text-purple-900">{passengerDetails.filter(p => p.type === 'child').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-700">Infants:</span>
                    <span className="font-semibold text-purple-900">{passengerDetails.filter(p => p.type === 'infant').length}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-purple-200">
                    <span className="text-purple-700 font-medium">Total:</span>
                    <span className="font-semibold text-purple-900">{passengerDetails.length}</span>
                  </div>
                </div>
              </div>

              {/* Help sections */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-800 mb-1">✅ Booking Protection</h3>
                    <p className="text-sm text-green-700">
                      Free cancellation up to 48 hours before departure. Your payment is fully refundable.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-800 mb-1">📞 Need Help?</h3>
                    <p className="text-sm text-blue-700 mb-2">
                      Our travel experts are available 24/7
                    </p>
                    <p className="text-lg font-bold text-blue-800">1800-123-4567</p>
                    <p className="text-sm text-blue-700">support@traveltour.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Amount Modal */}
      <Dialog open={showCustomAmountModal} onOpenChange={setShowCustomAmountModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Enter Payment Amount</DialogTitle>
            <DialogDescription>
              Enter the amount you want to pay (any amount from ₹1 to full amount)
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-gray-700">Total Tour Cost:</span>
                <span className="font-bold">{formatPrice(totalTourCost)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Minimum:</span>
                <span>₹1</span>
              </div>
            </div>

            <div>
              <Label htmlFor="customAmount" className="text-gray-700 font-medium mb-2 block">
                Enter Payment Amount (₹)
              </Label>
              <Input
                id="customAmount"
                type="number"
                value={customPaymentAmount}
                onChange={(e) => handleCustomAmountChange(e.target.value)}
                placeholder={`Enter amount (max: ${formatPrice(totalTourCost)})`}
                className="h-12 text-lg"
                min="1"
                max={totalTourCost}
                step="100"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>Min: ₹1</span>
                <span>Max: {formatPrice(totalTourCost)}</span>
              </div>
            </div>

            {customPaymentAmount && !isNaN(parseFloat(customPaymentAmount)) && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-sm text-gray-600">Your Payment</div>
                    <div className="text-xl font-bold text-[#2E4D98]">
                      {formatPrice(customPaymentAmount)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Percentage</div>
                    <div className="text-xl font-bold text-[#2E4D98]">
                      {paymentPercentage}%
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <div className={`text-sm ${isFullPayment ? 'text-green-600' : 'text-yellow-600'} font-medium`}>
                    {isFullPayment ? '✅ Full Payment' : '⏳ Partial Payment'}
                  </div>
                  {!isFullPayment && (
                    <div className="mt-2">
                      <div className="text-sm text-gray-600">Balance to Pay Later:</div>
                      <div className="text-lg font-bold text-gray-800">
                        {formatPrice(totalTourCost - parseFloat(customPaymentAmount))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowCustomAmountModal(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleConfirmCustomAmount}
              disabled={!customPaymentAmount || parseFloat(customPaymentAmount) < 1}
            >
              Use This Amount
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CheckoutPage;