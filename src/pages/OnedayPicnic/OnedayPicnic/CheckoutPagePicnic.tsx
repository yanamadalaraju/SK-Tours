// src/pages/CheckoutPagePicnic.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { BASE_URL } from '@/ApiUrls';
import axios from 'axios';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { AlertCircle } from "lucide-react";

interface GuestData {
  name: string;
  age: string;
  cell: string;
  email: string;
}

interface PicnicData {
  id: string;
  code: string;
  title: string;
  city: string;
  address: string;
  state: string;
  country: string;
  pin_code: string;
  contact_person: string;
  cell_no: string;
  email_id: string;
  no_of_people: number;
  guests: GuestData[];
  type: string;
  total_price_value: number;
}

const CheckoutPagePicnic: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [picnicData, setPicnicData] = useState<PicnicData | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // State for payment amount
  const [showCustomAmountModal, setShowCustomAmountModal] = useState(false);
  const [customPaymentAmount, setCustomPaymentAmount] = useState('');
  const [paymentType, setPaymentType] = useState('full');
  const [isPartialPayment, setIsPartialPayment] = useState(false);
  
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

  // Initialize picnic data
  useEffect(() => {
    if (location.state?.picnic) {
      const picnic = location.state.picnic;
      setPicnicData(picnic);
      
      // Pre-fill form with picnic contact info
      setFormData(prev => ({
        ...prev,
        email: picnic.email_id || '',
        phone: picnic.cell_no || '',
        address: picnic.address || '',
        city: picnic.city || '',
        state: picnic.state || '',
        pincode: picnic.pin_code || '',
        country: picnic.country || 'India',
        firstName: picnic.contact_person?.split(' ')[0] || '',
        lastName: picnic.contact_person?.split(' ')[1] || '',
      }));
      
      const totalCost = picnic.total_price_value || 2500;
      setCustomPaymentAmount(totalCost.toString());
      setPaymentType('full');
      setLoading(false);
    } else {
      const savedPicnic = localStorage.getItem('selectedPicnic');
      if (savedPicnic) {
        const parsedPicnic = JSON.parse(savedPicnic);
        setPicnicData(parsedPicnic);
        
        setFormData(prev => ({
          ...prev,
          email: parsedPicnic.email_id || '',
          phone: parsedPicnic.cell_no || '',
          address: parsedPicnic.address || '',
          city: parsedPicnic.city || '',
          state: parsedPicnic.state || '',
          pincode: parsedPicnic.pin_code || '',
          firstName: parsedPicnic.contact_person?.split(' ')[0] || '',
          lastName: parsedPicnic.contact_person?.split(' ')[1] || '',
        }));
        
        const totalCost = parsedPicnic.total_price_value || 2500;
        setCustomPaymentAmount(totalCost.toString());
        setPaymentType('full');
      }
      setLoading(false);
    }
  }, [location]);

  const handleCustomAmountChange = (value: string) => {
    setCustomPaymentAmount(value);
    
    if (picnicData) {
      const totalCost = getTotalPicnicCost();
      const enteredAmount = parseFloat(value) || 0;
      
      if (enteredAmount >= totalCost) {
        setPaymentType('full');
        setIsPartialPayment(false);
      } else if (enteredAmount > 0 && enteredAmount < totalCost) {
        setPaymentType('partial');
        setIsPartialPayment(true);
      }
    }
  };

  const getTotalPicnicCost = () => {
    if (!picnicData) return 0;
    return picnicData.total_price_value || 2500;
  };

  const getCurrentPaymentAmount = () => {
    if (!picnicData) return 0;
    
    if (paymentType === 'custom' || paymentType === 'partial') {
      return Math.round(parseFloat(customPaymentAmount) || 0);
    }
    
    return getTotalPicnicCost();
  };

  const validateCustomAmount = () => {
    if (!picnicData) return false;
    
    const totalCost = getTotalPicnicCost();
    const minAmount = 1;
    const maxAmount = totalCost;
    const enteredAmount = parseFloat(customPaymentAmount);
    
    if (isNaN(enteredAmount)) {
      alert('Please enter a valid amount');
      return false;
    }
    
    if (enteredAmount < minAmount) {
      alert(`Minimum payment amount is ₹${minAmount}`);
      return false;
    }
    
    if (enteredAmount > maxAmount) {
      alert(`Amount cannot exceed total picnic cost of ${formatPrice(maxAmount)}`);
      return false;
    }
    
    return true;
  };

  const handleConfirmCustomAmount = () => {
    if (validateCustomAmount()) {
      const totalCost = getTotalPicnicCost();
      const enteredAmount = parseFloat(customPaymentAmount);
      
      if (enteredAmount >= totalCost) {
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

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const calculatePercentage = (amount: number) => {
    const total = getTotalPicnicCost();
    return total > 0 ? Math.round((amount / total) * 100) : 0;
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Validate required fields
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

    const totalCost = getTotalPicnicCost();
    let paymentAmount = getCurrentPaymentAmount();
    const paymentPercentage = calculatePercentage(paymentAmount);
    const isFullPayment = paymentAmount >= totalCost;

    if (paymentAmount <= 0) {
      alert('Please enter a valid payment amount');
      setSubmitting(false);
      return;
    }

    try {
      const paymentDescription = isFullPayment 
        ? `Full Payment for One Day Picnic - ${picnicData?.title}`
        : `${paymentPercentage}% Partial Payment for One Day Picnic - ${picnicData?.title}`;
      
      // Prepare checkout payload with required backend fields
      const checkoutPayload = {
        // Backend required fields
        tour_id: picnicData?.id || picnicData?.code || 'picnic_001',
        total_tour_cost: totalCost,
        advance_amount: paymentAmount,
        
        // Picnic specific fields
        picnic_id: picnicData?.id || '',
        picnic_code: picnicData?.code || '',
        picnic_title: picnicData?.title || '',
        picnic_city: picnicData?.city || '',
        picnic_address: picnicData?.address || '',
        
        // Price details
        advance_percentage: paymentPercentage,
        
        // Customer details
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        pincode: formData.pincode.trim(),
        country: formData.country.trim(),
        
        // Guest details
        no_of_people: picnicData?.no_of_people || 1,
        guests: JSON.stringify(picnicData?.guests || []),
        
        payment_method: formData.paymentMethod,
        source_page: 'oneday-picnic-booking',
        source: 'onedaypicnic',
        terms_accepted: formData.termsAccepted,
        notes: paymentDescription,
        booking_type: 'onedaypicnic'
      };

      console.log('Sending checkout payload:', checkoutPayload);

      // Step 1: Save checkout record to database
      const checkoutResponse = await axios.post(
        `${BASE_URL}/api/checkout`,
        checkoutPayload
      );

      if (!checkoutResponse.data.success) {
        throw new Error(checkoutResponse.data.message || 'Failed to create booking record. Please try again.');
      }

      const checkoutId = checkoutResponse.data.checkout_id;

      // Step 2: Create PhonePe order
      const merchantOrderId = `PICNIC_${checkoutId}_${Date.now()}`;
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
            tour_code: picnicData?.code || '',
            picnic_code: picnicData?.code || '',
            payment_type: isFullPayment ? 'full' : 'partial',
            payment_percentage: paymentPercentage,
            source: 'onedaypicnic'
          }
        }
      );

      if (paymentResponse.data.success) {
        // Step 3: Update checkout with PhonePe order ID
        await axios.put(
          `${BASE_URL}/api/checkout/${checkoutId}/payment`,
          {
            phonepe_order_id: paymentResponse.data.merchantOrderId,
            payment_status: 'processing'
          }
        );
        
        // Save booking details to localStorage
        const bookingData = {
          picnic: {
            ...picnicData,
            advance_percentage: paymentPercentage,
            advance_amount: paymentAmount,
            is_full_payment: isFullPayment
          },
          customer: formData,
          guests: picnicData?.guests,
          checkout_id: checkoutId,
          timestamp: new Date().toISOString(),
          amount: paymentAmount,
          total_cost: totalCost,
          payment_percentage: paymentPercentage,
          is_full_payment: isFullPayment,
          merchant_order_id: paymentResponse.data.merchantOrderId,
          payment_type: isFullPayment ? 'full' : 'partial',
          custom_amount: paymentType === 'custom' || paymentType === 'partial' ? customPaymentAmount : null,
          source: 'onedaypicnic'
        };
        
        localStorage.setItem('currentPicnicBooking', JSON.stringify(bookingData));
        localStorage.setItem('phonePeOrderId', paymentResponse.data.merchantOrderId);
        localStorage.setItem('checkoutId', checkoutId.toString());
        
        console.log('Redirecting to PhonePe:', paymentResponse.data.checkoutPageUrl);
        
        window.location.href = paymentResponse.data.checkoutPageUrl;
      } else {
        throw new Error(paymentResponse.data.message || 'Failed to initialize payment. Please try again.');
      }
    } catch (error: any) {
      console.error("Payment processing error:", error);
      const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || 'Please try again';
      alert(`Payment failed: ${errorMessage}`);
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

  if (!picnicData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Picnic Selected</h2>
          <p className="text-gray-600 mb-6">Please select a picnic package to proceed with booking.</p>
          <Button 
            onClick={() => navigate('/oneday-picnic')} 
            className="bg-[#2E4D98] hover:bg-[#2E4D98]/90 px-8 py-6 text-lg"
          >
            Browse Picnics
          </Button>
        </div>
      </div>
    );
  }

  const totalCost = getTotalPicnicCost();
  const paymentAmount = getCurrentPaymentAmount();
  const paymentPercentage = calculatePercentage(paymentAmount);
  const balanceAmount = totalCost - paymentAmount;
  const isFullPayment = paymentAmount >= totalCost;

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
          Back to Picnic Packages
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Booking Summary & Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">Complete Your Picnic Booking</h1>
                  <p className="text-gray-600">Pay any amount - from partial to full payment</p>
                </div>
                <div className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
                  <span className="text-sm font-semibold text-blue-700">Flexible Payment</span>
                </div>
              </div>
              
              {/* Picnic Summary */}
              <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-5 mb-8 border border-green-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Picnic Package Summary
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-2">{picnicData.title}</h3>
                    <p className="text-gray-600 mb-3">{picnicData.city}, {picnicData.state}</p>
                    <div className="flex items-center gap-4">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        {picnicData.code}
                      </span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {picnicData.no_of_people} Guests
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {formatPrice(totalCost)}
                    </div>
                    <p className="text-gray-600">Total Picnic Cost</p>
                    <p className="text-sm text-gray-500 mt-1">Includes food & activities</p>
                  </div>
                </div>
              </div>
              
              {/* Guest Details Summary */}
              {picnicData.guests && picnicData.guests.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-5 mb-8">
                  <h2 className="text-lg font-semibold text-gray-800 mb-3">Guest Details</h2>
                  <div className="space-y-3">
                    {picnicData.guests.map((guest, idx) => (
                      <div key={idx} className="border-b border-gray-200 pb-2 last:border-0">
                        <p className="font-medium">{guest.name || `Guest ${idx + 1}`}</p>
                        <p className="text-sm text-gray-600">
                          {guest.age && `Age: ${guest.age} | `}
                          {guest.cell && `Cell: ${guest.cell} | `}
                          {guest.email && `Email: ${guest.email}`}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
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
                      setCustomPaymentAmount(totalCost.toString());
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
                      <div className="text-lg font-bold text-gray-900">{formatPrice(totalCost)}</div>
                      <div className="text-sm text-gray-600">100% of total</div>
                    </div>
                  </div>
                </div>
                
                {/* Custom Amount Option */}
                <div>
                  <div className={`p-4 border rounded-lg transition-all ${paymentType === 'partial' || paymentType === 'custom' ? 'border-[#2E4D98] bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                    onClick={() => setShowCustomAmountModal(true)}>
                    <div className="flex items-center gap-3 cursor-pointer">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentType === 'partial' || paymentType === 'custom' ? 'border-[#2E4D98] bg-[#2E4D98]' : 'border-gray-300'}`}>
                        {(paymentType === 'partial' || paymentType === 'custom') && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
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
                          <div className="flex justify-between items-center text-sm text-gray-600 mt-1">
                            <span>Payment Type:</span>
                            <span className={`font-semibold ${isFullPayment ? 'text-green-600' : 'text-yellow-600'}`}>
                              {isFullPayment ? 'Full Payment' : 'Partial Payment'}
                            </span>
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
                        The remaining {formatPrice(balanceAmount)} ({100 - paymentPercentage}%) will be payable before the picnic date.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Booking Form */}
              <form onSubmit={handlePayment} className="space-y-8">
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
                    onCheckedChange={(checked: boolean) => 
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
                    . {isPartialPayment && `I understand that I'm paying ${paymentPercentage}% now and the remaining amount must be paid before the picnic date.`} <span className="text-red-500">*</span>
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
                      `Pay ${isFullPayment ? 'Full Amount' : `${paymentPercentage}%`} - ${formatPrice(paymentAmount)}`
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
                    <span className="text-gray-700 font-medium">Total Picnic Cost</span>
                    <p className="text-sm text-gray-500">Includes food, activities & facilities</p>
                  </div>
                  <span className="text-lg font-bold text-gray-900">{formatPrice(totalCost)}</span>
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
                      <p className="text-sm text-gray-500">Payable before picnic date</p>
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
              
              {/* What's Included */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                <h3 className="font-semibold text-green-800 mb-2">🎉 What's Included</h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>✓ Bungalow/Picnic spot access</li>
                  <li>✓ Lunch/Snacks included</li>
                  <li>✓ Games & Activities</li>
                  <li>✓ Parking facility</li>
                </ul>
              </div>
              
              {/* Help sections */}
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
                      Our support team is available 24/7
                    </p>
                    <p className="text-lg font-bold text-blue-800">1800-123-4567</p>
                    <p className="text-sm text-blue-700">support@picnicbooking.com</p>
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
                <span className="text-gray-700">Total Picnic Cost:</span>
                <span className="font-bold">{formatPrice(totalCost)}</span>
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
                placeholder={`Enter amount (max: ${formatPrice(totalCost)})`}
                className="h-12 text-lg"
                min="1"
                max={totalCost}
                step="100"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>Min: ₹1</span>
                <span>Max: {formatPrice(totalCost)}</span>
              </div>
            </div>
            
            {customPaymentAmount && !isNaN(parseFloat(customPaymentAmount)) && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-sm text-gray-600">Your Payment</div>
                    <div className="text-xl font-bold text-[#2E4D98]">
                      {formatPrice(parseFloat(customPaymentAmount))}
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
                        {formatPrice(totalCost - parseFloat(customPaymentAmount))}
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

export default CheckoutPagePicnic;