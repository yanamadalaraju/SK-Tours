// src/pages/OfflineFlightBlocks/CheckoutPageOfflineFlights.tsx - Fixed JSX syntax
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { BASE_URL } from '@/ApiUrls';
import axios from 'axios';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { AlertCircle } from "lucide-react";

// Passenger interface
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
  passportNo?: string;
  passportExpireDate?: string;
}

const CheckoutPageOfflineFlights = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get flight data from navigation state or localStorage
  const [flightData, setFlightData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // State for payment amount
  const [showCustomAmountModal, setShowCustomAmountModal] = useState(false);
  const [customPaymentAmount, setCustomPaymentAmount] = useState('');
  const [paymentType, setPaymentType] = useState('full');
  const [isPartialPayment, setIsPartialPayment] = useState(false);

  // Passenger details state
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
    termsAccepted: false
  });

  // Initialize flight data and passenger details
  useEffect(() => {
    if (location.state?.flight) {
      const flight = location.state.flight;
      setFlightData(flight);

      const totalFlightCost = flight.total_price_value || parsePrice(flight.price_per_adult);
      setCustomPaymentAmount(totalFlightCost.toString());
      setPaymentType('full');

      initializePassengerDetails(flight);
      setLoading(false);
    } else {
      const savedFlight = localStorage.getItem('selectedOfflineFlight');
      if (savedFlight) {
        const parsedFlight = JSON.parse(savedFlight);
        setFlightData(parsedFlight);

        const totalFlightCost = parsedFlight.total_price_value || parsePrice(parsedFlight.price_per_adult);
        setCustomPaymentAmount(totalFlightCost.toString());
        setPaymentType('full');

        initializePassengerDetails(parsedFlight);
      }
      setLoading(false);
    }
  }, [location]);

  const initializePassengerDetails = (flight: any) => {
    const adults = flight.adults || 1;
    const children = flight.children || 0;
    const infants = flight.infants || 0;

    const details: PassengerDetails[] = [];
    let id = 1;

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
        passportNo: '',
        passportExpireDate: ''
      });
    }

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
        passportNo: '',
        passportExpireDate: ''
      });
    }

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
        passportNo: '',
        passportExpireDate: ''
      });
    }

    setPassengerDetails(details);
  };

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
    }
    return true;
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomPaymentAmount(value);

    if (flightData) {
      const totalFlightCost = getTotalFlightCost();
      const enteredAmount = parseFloat(value) || 0;

      if (enteredAmount >= totalFlightCost) {
        setPaymentType('full');
        setIsPartialPayment(false);
      } else if (enteredAmount > 0 && enteredAmount < totalFlightCost) {
        setPaymentType('partial');
        setIsPartialPayment(true);
      }
    }
  };

  const getTotalFlightCost = () => {
    if (!flightData) return 0;
    const adultCount = flightData.adults || 1;
    const childCount = flightData.children || 0;
    const infantCount = flightData.infants || 0;
    
    const adultPrice = flightData.total_price_value || parsePrice(flightData.price_per_adult);
    const childPrice = parsePrice(flightData.child_price) || adultPrice * 0.75;
    const infantPrice = parsePrice(flightData.infant_price) || adultPrice * 0.1;
    
    return (adultCount * adultPrice) + (childCount * childPrice) + (infantCount * infantPrice);
  };

  const getCurrentPaymentAmount = () => {
    if (!flightData) return 0;

    if (paymentType === 'custom' || paymentType === 'partial') {
      return Math.round(parseFloat(customPaymentAmount) || 0);
    }

    return getTotalFlightCost();
  };

  const validateCustomAmount = () => {
    if (!flightData) return false;

    const totalFlightCost = getTotalFlightCost();
    const minAmount = 1;
    const maxAmount = totalFlightCost;
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
      alert(`Amount cannot exceed total flight cost of ${formatPrice(maxAmount)}`);
      return false;
    }

    return true;
  };

  const handleConfirmCustomAmount = () => {
    if (validateCustomAmount()) {
      const totalFlightCost = getTotalFlightCost();
      const enteredAmount = parseFloat(customPaymentAmount);

      if (enteredAmount >= totalFlightCost) {
        setPaymentType('full');
        setIsPartialPayment(false);
      } else {
        setPaymentType('partial');
        setIsPartialPayment(true);
      }

      setShowCustomAmountModal(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const parsePrice = (priceString: string) => {
    if (!priceString) return 0;
    const numericString = priceString
      .toString()
      .replace(/[₹$,]/g, '')
      .replace(/\s+/g, '')
      .trim();
    return parseFloat(numericString) || 0;
  };

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const calculatePercentage = (amount: number) => {
    const total = getTotalFlightCost();
    return total > 0 ? Math.round((amount / total) * 100) : 0;
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return 'N/A';
    return timeString.substring(0, 5);
  };

  const handlePhonePePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'pincode'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);

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

    if (!validatePassengerDetails()) {
      setSubmitting(false);
      return;
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      alert('Please enter a valid 10-digit Indian phone number');
      setSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      setSubmitting(false);
      return;
    }

    const totalFlightCost = getTotalFlightCost();
    let paymentAmount = getCurrentPaymentAmount();
    const paymentPercentage = calculatePercentage(paymentAmount);
    const isFullPayment = paymentAmount >= totalFlightCost;

    if (paymentAmount <= 0) {
      alert('Please enter a valid payment amount');
      setSubmitting(false);
      return;
    }

    try {
      const paymentDescription = isFullPayment
        ? `Full Payment for ${flightData.flight_number} - ${flightData.airline}`
        : `${paymentPercentage}% Partial Payment for ${flightData.flight_number} - ${flightData.airline}`;

      const passengerDetailsJSON = JSON.stringify(passengerDetails.map(p => ({
        id: p.id,
        type: p.type,
        gender: p.gender,
        first_name: p.firstName,
        middle_name: p.middleName || '',
        last_name: p.lastName,
        age: p.age,
        dob: p.dob,
        passport_no: p.passportNo || '',
        passport_expire_date: p.passportExpireDate || ''
      })));

      const checkoutResponse = await axios.post(
        `${BASE_URL}/api/checkout`,
        {
          tour_id: flightData.id?.toString() || '',
          tour_code: flightData.flight_number || '',
          tour_title: `${flightData.airline} - ${flightData.flight_number}`,
          tour_duration: flightData.duration || '',
          tour_locations: `${flightData.from_city} to ${flightData.to_city}`,
          tour_image_url: flightData.image || '',
          
          total_tour_cost: totalFlightCost,
          advance_percentage: paymentPercentage,
          advance_amount: paymentAmount,
          emi_price: 0,
          
          first_name: formData.firstName.trim(),
          last_name: formData.lastName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          address: formData.address.trim(),
          city: formData.city.trim(),
          state: formData.state.trim(),
          pincode: formData.pincode.trim(),
          country: formData.country.trim(),
          
          payment_method: 'phonepe',
          source_page: 'offline-flights',
          source: 'flights',
          terms_accepted: formData.termsAccepted,
          notes: `${paymentDescription}\n\nPassenger Details:\n${passengerDetailsJSON}`
        }
      );

      if (!checkoutResponse.data.success) {
        throw new Error('Failed to create booking record. Please try again.');
      }

      const checkoutId = checkoutResponse.data.checkout_id;

      const merchantOrderId = `FLT_${checkoutId}_${Date.now()}`;
      const baseUrl = window.location.origin;
      const redirectUrl = `${baseUrl}/payment-result`;

      const paymentResponse = await axios.post(
        `${BASE_URL}/api/phonepe/orders`,
        {
          action: 'create-order',
          amount: paymentAmount,
          currency: "INR",
          environment: "test",
          merchantOrderId: merchantOrderId,
          redirectUrl: redirectUrl,
          customerDetails: {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            phone: formData.phone,
            checkout_id: checkoutId,
            flight_number: flightData.flight_number || '',
            payment_type: isFullPayment ? 'full' : 'partial',
            payment_percentage: paymentPercentage,
            source: 'flights',
            passenger_count: passengerDetails.length,
            flight_route: `${flightData.from_city} to ${flightData.to_city}`
          }
        }
      );

      if (paymentResponse.data.success) {
        await axios.put(
          `${BASE_URL}/api/checkout/${checkoutId}/payment`,
          {
            phonepe_order_id: paymentResponse.data.merchantOrderId,
            payment_status: 'processing'
          }
        );
        
        const bookingData = {
          flight: flightData,
          passenger_details: passengerDetails,
          customer: formData,
          checkout_id: checkoutId,
          timestamp: new Date().toISOString(),
          amount: paymentAmount,
          total_flight_cost: totalFlightCost,
          payment_percentage: paymentPercentage,
          is_full_payment: isFullPayment,
          merchant_order_id: paymentResponse.data.merchantOrderId,
          payment_type: isFullPayment ? 'full' : 'partial',
          source: 'flights'
        };
        
        localStorage.setItem('currentFlightBooking', JSON.stringify(bookingData));
        localStorage.setItem('phonePeOrderId', paymentResponse.data.merchantOrderId);
        localStorage.setItem('checkoutId', checkoutId.toString());
        
        window.location.href = paymentResponse.data.checkoutPageUrl;
      } else {
        throw new Error(paymentResponse.data.message || 'Failed to initialize payment.');
      }
    } catch (error) {
      console.error("Payment processing error:", error);
      alert(`Payment failed: ${(error as any).response?.data?.message || (error as Error).message}`);
      setSubmitting(false);
    }
  };

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

  if (!flightData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Flight Selected</h2>
          <p className="text-gray-600 mb-6">Please select a flight to proceed with booking.</p>
          <Button
            onClick={() => navigate('/flights')}
            className="bg-[#2E4D98] hover:bg-[#2E4D98]/90 px-8 py-6 text-lg"
          >
            Browse Flights
          </Button>
        </div>
      </div>
    );
  }

  const totalFlightCost = getTotalFlightCost();
  const paymentAmount = getCurrentPaymentAmount();
  const paymentPercentage = calculatePercentage(paymentAmount);
  const balanceAmount = totalFlightCost - paymentAmount;
  const isFullPayment = paymentAmount >= totalFlightCost;

  return (
    <>
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
            Back to Flights
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Complete Your Flight Booking</h1>
                    <p className="text-gray-600">Pay any amount - from partial to full payment</p>
                  </div>
                  <div className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
                    <span className="text-sm font-semibold text-blue-700">Flexible Payment</span>
                  </div>
                </div>

                {/* Flight Summary */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 mb-8 border border-blue-100">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                    Flight Summary
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-bold text-lg text-gray-800 mb-2">{flightData.airline}</h3>
                      <p className="text-gray-600 mb-3">{flightData.flight_number}</p>
                      <div className="flex items-center gap-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          {flightData.flight_type}
                        </span>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          {flightData.booking_type === 'roundTrip' ? 'Round Trip' : 'One Way'}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-gray-900 mb-1">
                        {formatPrice(totalFlightCost)}
                      </div>
                      <p className="text-gray-600">Total Flight Cost</p>
                      <p className="text-sm text-gray-500 mt-1">For all passengers</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-blue-200">
                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <p className="text-xl font-bold">{formatTime(flightData.flight_time)}</p>
                        <p className="text-sm text-gray-600">{flightData.from_city} ({flightData.from_airport_code})</p>
                      </div>
                      <div className="flex-1 px-4">
                        <div className="relative">
                          <div className="border-t-2 border-blue-300"></div>
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-100 px-2 rounded">
                            <span className="text-xs text-blue-600">{flightData.duration}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-xl font-bold">{formatTime(flightData.arrival_time)}</p>
                        <p className="text-sm text-gray-600">{flightData.to_city} ({flightData.to_airport_code})</p>
                      </div>
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

                  <div className="mb-4">
                    <div className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${paymentType === 'full' ? 'border-[#2E4D98] bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                      onClick={() => {
                        setPaymentType('full');
                        setCustomPaymentAmount(totalFlightCost.toString());
                        setIsPartialPayment(false);
                      }}>
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentType === 'full' ? 'border-[#2E4D98] bg-[#2E4D98]' : 'border-gray-300'}`}>
                          {paymentType === 'full' && <div className="w-2 h-2 rounded-full bg-white"></div>}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">Full Payment</h3>
                          <p className="text-sm text-gray-600">Pay the complete amount now</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">{formatPrice(totalFlightCost)}</div>
                        <div className="text-sm text-gray-600">100% of total</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className={`p-4 border rounded-lg transition-all cursor-pointer ${paymentType === 'partial' || paymentType === 'custom' ? 'border-[#2E4D98] bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                      onClick={() => setShowCustomAmountModal(true)}>
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentType === 'partial' || paymentType === 'custom' ? 'border-[#2E4D98] bg-[#2E4D98]' : 'border-gray-300'}`}>
                          {(paymentType === 'partial' || paymentType === 'custom') && <div className="w-2 h-2 rounded-full bg-white"></div>}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">Custom Payment Amount</h3>
                          <p className="text-sm text-gray-600">Pay any amount you want (partial or full)</p>
                        </div>
                      </div>
                      
                      {(paymentType === 'partial' || paymentType === 'custom') && customPaymentAmount && (
                        <div className="mt-3 pl-8">
                          <div className="bg-white p-3 rounded-lg border">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">Selected Amount:</span>
                              <span className="text-lg font-bold text-[#2E4D98]">{formatPrice(parseFloat(customPaymentAmount))}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm text-gray-600 mt-1">
                              <span>Percentage:</span>
                              <span>{paymentPercentage}% of total</span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowCustomAmountModal(true);
                            }}
                            className="mt-2 text-sm text-[#2E4D98] hover:underline"
                          >
                            Change amount
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-500 mt-3">
                    💡 <strong>Flexible Payment:</strong> Pay any amount you want. You can pay partial amount now and the rest later.
                  </p>
                </div>

                {/* Passenger Details Section */}
                <div className="bg-white border border-gray-200 rounded-xl p-5 mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Passenger Details ({passengerDetails.length} Passenger{passengerDetails.length !== 1 ? 's' : ''})
                    </h2>
                    <button
                      onClick={() => setShowPassengerDetails(!showPassengerDetails)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      {showPassengerDetails ? 'Hide Details' : 'Show Details'}
                    </button>
                  </div>

                  {showPassengerDetails && (
                    <div className="border rounded-lg p-6 mt-4 overflow-x-auto">
                      <div className="mb-4">
                        <h3 className="font-semibold text-gray-700">Please fill in passenger details</h3>
                        <p className="text-sm text-gray-500">All fields are required for booking</p>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse min-w-[800px]">
                          <thead>
                            <tr className="border-b-2 border-gray-200">
                              <th className="p-3 text-left bg-gray-50">Type</th>
                              <th className="p-3 text-left bg-gray-50">First Name</th>
                              <th className="p-3 text-left bg-gray-50">Last Name</th>
                              <th className="p-3 text-left bg-gray-50">Gender</th>
                              <th className="p-3 text-left bg-gray-50">Age</th>
                              <th className="p-3 text-left bg-gray-50">DOB</th>
                            </tr>
                          </thead>
                          <tbody>
                            {passengerDetails.map((passenger) => (
                              <tr key={passenger.id} className="border-b border-gray-100">
                                <td className="p-3 align-top">
                                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    passenger.type === 'adult' ? 'bg-blue-100 text-blue-700' :
                                    passenger.type === 'child' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                                  }`}>
                                    {passenger.type.charAt(0).toUpperCase() + passenger.type.slice(1)}
                                  </span>
                                </td>
                                <td className="p-3 align-top">
                                  <input
                                    type="text"
                                    value={passenger.firstName}
                                    onChange={(e) => handlePassengerInputChange(passenger.id, 'firstName', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="First name"
                                  />
                                </td>
                                <td className="p-3 align-top">
                                  <input
                                    type="text"
                                    value={passenger.lastName}
                                    onChange={(e) => handlePassengerInputChange(passenger.id, 'lastName', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Last name"
                                  />
                                </td>
                                <td className="p-3 align-top">
                                  <select
                                    value={passenger.gender}
                                    onChange={(e) => handlePassengerInputChange(passenger.id, 'gender', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  >
                                    <option value="Mr">Mr</option>
                                    <option value="Mrs">Mrs</option>
                                    <option value="Ms">Ms</option>
                                    <option value="Mstr">Mstr</option>
                                  </select>
                                </td>
                                <td className="p-3 align-top">
                                  <input
                                    type="number"
                                    value={passenger.age || ''}
                                    onChange={(e) => handlePassengerInputChange(passenger.id, 'age', parseInt(e.target.value) || 0)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Age"
                                    min="0"
                                    max="120"
                                  />
                                </td>
                                <td className="p-3 align-top">
                                  <input
                                    type="date"
                                    value={passenger.dob}
                                    onChange={(e) => handlePassengerInputChange(passenger.id, 'dob', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="mt-4 p-4 bg-gray-50 rounded-lg flex gap-6 text-sm">
                        <div><span className="text-gray-600">Adults:</span> <strong>{passengerDetails.filter(p => p.type === 'adult').length}</strong></div>
                        <div><span className="text-gray-600">Children:</span> <strong>{passengerDetails.filter(p => p.type === 'child').length}</strong></div>
                        <div><span className="text-gray-600">Infants:</span> <strong>{passengerDetails.filter(p => p.type === 'infant').length}</strong></div>
                      </div>
                    </div>
                  )}
                </div>

                {isPartialPayment && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
                    <div className="flex">
                      <AlertCircle className="h-5 w-5 text-yellow-400" />
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          <strong>Note:</strong> You are paying {paymentPercentage}% ({formatPrice(paymentAmount)}) now.
                          The remaining {formatPrice(balanceAmount)} ({100 - paymentPercentage}%) will be payable before the flight departure date.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handlePhonePePayment} className="space-y-8">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-3 border-b">Personal Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-gray-700 font-medium mb-2 block">First Name <span className="text-red-500">*</span></Label>
                        <Input name="firstName" value={formData.firstName} onChange={handleInputChange} required className="h-12" />
                      </div>
                      <div>
                        <Label className="text-gray-700 font-medium mb-2 block">Last Name <span className="text-red-500">*</span></Label>
                        <Input name="lastName" value={formData.lastName} onChange={handleInputChange} required className="h-12" />
                      </div>
                      <div>
                        <Label className="text-gray-700 font-medium mb-2 block">Email <span className="text-red-500">*</span></Label>
                        <Input name="email" type="email" value={formData.email} onChange={handleInputChange} required className="h-12" />
                      </div>
                      <div>
                        <Label className="text-gray-700 font-medium mb-2 block">Phone <span className="text-red-500">*</span></Label>
                        <Input name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required className="h-12" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-3 border-b">Address Details</h2>
                    <div className="space-y-6">
                      <div>
                        <Label className="text-gray-700 font-medium mb-2 block">Address <span className="text-red-500">*</span></Label>
                        <Input name="address" value={formData.address} onChange={handleInputChange} required className="h-12" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <Label className="text-gray-700 font-medium mb-2 block">City <span className="text-red-500">*</span></Label>
                          <Input name="city" value={formData.city} onChange={handleInputChange} required className="h-12" />
                        </div>
                        <div>
                          <Label className="text-gray-700 font-medium mb-2 block">State <span className="text-red-500">*</span></Label>
                          <Input name="state" value={formData.state} onChange={handleInputChange} required className="h-12" />
                        </div>
                        <div>
                          <Label className="text-gray-700 font-medium mb-2 block">Pincode <span className="text-red-500">*</span></Label>
                          <Input name="pincode" value={formData.pincode} onChange={handleInputChange} required className="h-12" />
                        </div>
                      </div>
                      <div>
                        <Label className="text-gray-700 font-medium mb-2 block">Country</Label>
                        <Input name="country" value={formData.country} onChange={handleInputChange} className="h-12" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Checkbox id="terms" checked={formData.termsAccepted} onCheckedChange={(checked) => setFormData(prev => ({ ...prev, termsAccepted: checked as boolean }))} />
                    <Label htmlFor="terms" className="text-sm cursor-pointer">
                      I agree to the <a href="/terms" className="text-[#2E4D98] hover:underline">Terms & Conditions</a> and <a href="/privacy" className="text-[#2E4D98] hover:underline">Privacy Policy</a>.
                      <span className="text-red-500">*</span>
                    </Label>
                  </div>

                  <Button type="submit" disabled={submitting || !formData.termsAccepted} className="w-full bg-[#E53C42] hover:bg-[#E53C42]/90 py-7 text-lg font-semibold rounded-xl">
                    {submitting ? 'Processing Payment...' : `Pay ${isFullPayment ? 'Full Amount' : `${paymentPercentage}%`} - ${formatPrice(paymentAmount)}`}
                  </Button>
                  <p className="text-center text-sm text-gray-500">You will be redirected to PhonePe's secure payment page</p>
                </form>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-3 border-b">Price Breakdown</h2>
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b">
                    <span className="text-gray-700">Base Fare (per adult)</span>
                    <span className="font-bold">{formatPrice(parsePrice(flightData.price_per_adult))}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b">
                    <span className="text-gray-700">Total Fare</span>
                    <span className="font-bold">{formatPrice(totalFlightCost)}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b">
                    <span className="text-blue-600 font-semibold">Pay Now</span>
                    <span className="text-xl font-bold text-blue-600">{formatPrice(paymentAmount)}</span>
                  </div>
                  {!isFullPayment && (
                    <div className="flex justify-between py-3">
                      <span className="text-gray-600">Balance to Pay</span>
                      <span className="font-semibold">{formatPrice(balanceAmount)}</span>
                    </div>
                  )}
                  <div className="bg-blue-50 rounded-xl p-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Total to Pay Now</span>
                      <span className="text-2xl font-bold text-[#E53C42]">{formatPrice(paymentAmount)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Dialog open={showCustomAmountModal} onOpenChange={setShowCustomAmountModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Enter Payment Amount</DialogTitle>
              <DialogDescription>Enter any amount from ₹1 to full amount</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <div className="flex justify-between">
                  <span>Total Flight Cost:</span>
                  <span className="font-bold">{formatPrice(totalFlightCost)}</span>
                </div>
              </div>
              <Input
                type="number"
                value={customPaymentAmount}
                onChange={(e) => handleCustomAmountChange(e.target.value)}
                placeholder="Enter amount"
                className="h-12 text-lg"
                min="1"
                max={totalFlightCost}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCustomAmountModal(false)}>Cancel</Button>
              <Button onClick={handleConfirmCustomAmount}>Use This Amount</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPageOfflineFlights;