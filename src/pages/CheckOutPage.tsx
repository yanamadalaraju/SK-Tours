// src/pages/CheckoutPage.jsx - Updated version
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

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get tour data from navigation state or localStorage
  const [tourData, setTourData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // New state for custom payment amount
  const [showCustomAmountModal, setShowCustomAmountModal] = useState(false);
  const [customAdvanceAmount, setCustomAdvanceAmount] = useState('');
  const [customAdvancePercentage, setCustomAdvancePercentage] = useState(20);
  const [paymentType, setPaymentType] = useState('default'); // 'default' or 'custom'
  
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

  // Initialize tour data
  useEffect(() => {
    if (location.state?.tour) {
      setTourData(location.state.tour);
      // Initialize custom amount based on tour data
      if (location.state.tour.advance_amount) {
        const totalTourCost = location.state.tour.total_price_value || location.state.tour.priceValue || parsePrice(location.state.tour.price);
        const percentage = Math.round((location.state.tour.advance_amount / totalTourCost) * 100);
        setCustomAdvancePercentage(percentage);
      }
      setLoading(false);
    } else {
      const savedTour = localStorage.getItem('selectedTour');
      if (savedTour) {
        const parsedTour = JSON.parse(savedTour);
        setTourData(parsedTour);
        if (parsedTour.advance_amount) {
          const totalTourCost = parsedTour.total_price_value || parsedTour.priceValue || parsePrice(parsedTour.price);
          const percentage = Math.round((parsedTour.advance_amount / totalTourCost) * 100);
          setCustomAdvancePercentage(percentage);
        }
      }
      setLoading(false);
    }
  }, [location]);

  // Handle custom amount input
  const handleCustomAmountChange = (value) => {
    setCustomAdvanceAmount(value);
    if (tourData) {
      const totalTourCost = tourData.total_price_value || tourData.priceValue || parsePrice(tourData.price);
      const percentage = Math.round((parseFloat(value) / totalTourCost) * 100);
      setCustomAdvancePercentage(percentage);
    }
  };

  // Calculate default 20% amount
  const getDefaultAdvanceAmount = () => {
    if (!tourData) return 0;
    const totalTourCost = tourData.total_price_value || tourData.priceValue || parsePrice(tourData.price);
    return Math.round((totalTourCost * 20) / 100);
  };

  // Get current advance amount based on payment type
  const getCurrentAdvanceAmount = () => {
    if (!tourData) return 0;
    
    if (paymentType === 'custom' && customAdvanceAmount) {
      return Math.round(parseFloat(customAdvanceAmount));
    }
    
    return getDefaultAdvanceAmount();
  };

  // Validate custom amount
  const validateCustomAmount = () => {
    if (!tourData) return false;
    
    const totalTourCost = tourData.total_price_value || tourData.priceValue || parsePrice(tourData.price);
    const minAmount = Math.round((totalTourCost * 20) / 100);
    const maxAmount = totalTourCost;
    const enteredAmount = parseFloat(customAdvanceAmount);
    
    if (isNaN(enteredAmount)) {
      alert('Please enter a valid amount');
      return false;
    }
    
    if (enteredAmount < minAmount) {
      alert(`Minimum advance amount is ${formatPrice(minAmount)} (20% of tour cost)`);
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
      setPaymentType('custom');
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
      .replace(/[₹$,]/g, '')
      .replace(/\s+/g, '')
      .trim();
    
    // Parse as float and round to 2 decimal places
    return Math.round(parseFloat(numericString) * 100) / 100;
  };

  // Format price to display
  const formatPrice = (price) => {
    return `₹${parseFloat(price).toLocaleString('en-IN')}`;
  };

  // Updated handlePhonePePayment function
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

    // Get current advance amount
    const totalTourCost = tourData.total_price_value || tourData.priceValue || parsePrice(tourData.price);
    let advanceAmount, advancePercentage;
    
    if (paymentType === 'custom' && customAdvanceAmount) {
      advanceAmount = Math.round(parseFloat(customAdvanceAmount));
      advancePercentage = Math.round((advanceAmount / totalTourCost) * 100);
    } else {
      advancePercentage = 20;
      advanceAmount = Math.round((totalTourCost * advancePercentage) / 100);
    }

    try {
      const paymentDescription = `${advancePercentage}% Advance Payment for ${tourData.code || tourData.title}`;
      
      if (isNaN(advanceAmount) || advanceAmount <= 0) {
        throw new Error('Invalid payment amount. Please try again.');
      }

      console.log('Payment processing:', {
        amount: advanceAmount,
        totalTourCost: totalTourCost,
        advancePercentage: advancePercentage,
        description: paymentDescription,
        paymentType: paymentType
      });

      // Step 1: Save checkout record to database
      const checkoutResponse = await axios.post(
        `${BASE_URL}/api/checkout`,
        {
          tour_id: tourData.id || '',
          tour_code: tourData.code || '',
          tour_title: tourData.title || '',
          tour_duration: tourData.duration || '',
          tour_locations: tourData.locations || '',
          tour_image_url: tourData.image || '',
          
          // Price details
          total_tour_cost: totalTourCost,
          advance_percentage: advancePercentage,
          advance_amount: advanceAmount,
          emi_price: tourData.emiPriceValue || 0,
          
          // Customer details from form
          first_name: formData.firstName.trim(),
          last_name: formData.lastName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          address: formData.address.trim(),
          city: formData.city.trim(),
          state: formData.state.trim(),
          pincode: formData.pincode.trim(),
          country: formData.country.trim(),
          
          payment_method: formData.paymentMethod,
          source_page: 'tour-packages',
          terms_accepted: formData.termsAccepted,
          notes: paymentDescription
        }
      );

      if (!checkoutResponse.data.success) {
        throw new Error('Failed to create booking record. Please try again.');
      }

      const checkoutId = checkoutResponse.data.checkout_id;

      // Step 2: Create PhonePe order with advance amount
      const merchantOrderId = `BOOK_${checkoutId}_${Date.now()}`;
      
      const paymentResponse = await axios.post(
        `${BASE_URL}/api/phonepe/orders`,
        {
          action: 'create-order',
          amount: advanceAmount,
          currency: "INR",
          environment: "test",
          merchantOrderId: merchantOrderId,
          customerDetails: {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            phone: formData.phone,
            checkout_id: checkoutId,
            tour_code: tourData.code || ''
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
        
        // Save booking details to localStorage for payment result page
        const bookingData = {
          tour: {
            ...tourData,
            advance_percentage: advancePercentage,
            advance_amount: advanceAmount,
          },
          customer: formData,
          checkout_id: checkoutId,
          timestamp: new Date().toISOString(),
          amount: advanceAmount,
          total_tour_cost: totalTourCost,
          advance_percentage: advancePercentage,
          merchant_order_id: paymentResponse.data.merchantOrderId,
          payment_type: paymentType,
          custom_amount: paymentType === 'custom' ? customAdvanceAmount : null
        };
        
        localStorage.setItem('currentBooking', JSON.stringify(bookingData));
        localStorage.setItem('phonePeOrderId', paymentResponse.data.merchantOrderId);
        localStorage.setItem('checkoutId', checkoutId.toString());
        
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

  // Rest of the loading and no-tour handling remains the same...
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
  const totalTourCost = tourData.total_price_value || tourData.priceValue || parsePrice(tourData.price);
  const minAdvanceAmount = Math.round((totalTourCost * 20) / 100);
  const advanceAmount = getCurrentAdvanceAmount();
  const advancePercentage = Math.round((advanceAmount / totalTourCost) * 100);
  const balanceAmount = totalTourCost - advanceAmount;

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
          {/* Left Column - Booking Summary & Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">Complete Your Booking</h1>
                  <p className="text-gray-600">Secure your spot with advance payment</p>
                </div>
                <div className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
                  <span className="text-sm font-semibold text-blue-700">Advance Payment Only</span>
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
                  Advance Payment Amount
                </h2>
                
                {/* Default 20% Option */}
                <div className="mb-4">
                  <div className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${paymentType === 'default' ? 'border-[#2E4D98] bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                    onClick={() => {
                      setPaymentType('default');
                      setCustomAdvanceAmount('');
                    }}>
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentType === 'default' ? 'border-[#2E4D98] bg-[#2E4D98]' : 'border-gray-300'}`}>
                        {paymentType === 'default' && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">Standard Advance (20%)</h3>
                        <p className="text-sm text-gray-600">Pay minimum required amount now</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">{formatPrice(minAdvanceAmount)}</div>
                      <div className="text-sm text-gray-600">20% of total</div>
                    </div>
                  </div>
                </div>
                
                {/* Custom Amount Option */}
                <div>
                  <div className={`p-4 border rounded-lg transition-all ${paymentType === 'custom' ? 'border-[#2E4D98] bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                    onClick={() => setShowCustomAmountModal(true)}>
                    <div className="flex items-center gap-3 cursor-pointer">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentType === 'custom' ? 'border-[#2E4D98] bg-[#2E4D98]' : 'border-gray-300'}`}>
                        {paymentType === 'custom' && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">Custom Advance Amount</h3>
                        <p className="text-sm text-gray-600">Pay more than 20% (up to full amount)</p>
                      </div>
                    </div>
                    
                    {paymentType === 'custom' && customAdvanceAmount && (
                      <div className="mt-3 pl-8">
                        <div className="bg-white p-3 rounded-lg border">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700">Selected Amount:</span>
                            <span className="text-lg font-bold text-[#2E4D98]">{formatPrice(customAdvanceAmount)}</span>
                          </div>
                          <div className="flex justify-between items-center text-sm text-gray-600 mt-1">
                            <span>Percentage:</span>
                            <span>{customAdvancePercentage}% of total</span>
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
                  💡 <strong>Tip:</strong> Paying more now reduces your balance amount later. Minimum advance payment is 20%.
                </p>
              </div>
              
              {/* Payment Information Notice */}
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      <strong>Important:</strong> You are paying {advancePercentage}% ({formatPrice(advanceAmount)}) as advance now. 
                      The remaining {formatPrice(balanceAmount)} ({100 - advancePercentage}%) will be payable before the tour departure date.
                    </p>
                  </div>
                </div>
              </div>
              
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
                
                {/* Payment Method */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-3 border-b">Payment Method</h2>
                  <RadioGroup 
                    value={formData.paymentMethod} 
                    onValueChange={handleRadioChange}
                    className="space-y-4"
                  >
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi" className="cursor-pointer flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-medium">UPI</span>
                            <p className="text-sm text-gray-500">Pay using PhonePe, Google Pay, Paytm, etc.</p>
                          </div>
                          <div className="flex space-x-2">
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded">Recommended</span>
                          </div>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="cursor-pointer flex-1">
                        <div>
                          <span className="font-medium">Credit/Debit Card</span>
                          <p className="text-sm text-gray-500">Visa, MasterCard, RuPay, American Express</p>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem value="netbanking" id="netbanking" />
                      <Label htmlFor="netbanking" className="cursor-pointer">
                        <span className="font-medium">Net Banking</span>
                        <p className="text-sm text-gray-500">All major Indian banks</p>
                      </Label>
                    </div>
                  </RadioGroup>
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
                    . I understand that I'm paying {advancePercentage}% as advance and the remaining amount 
                    must be paid before the tour departure date. <span className="text-red-500">*</span>
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
                      `Pay ${advancePercentage}% Advance - ${formatPrice(advanceAmount)}`
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
                    <span className="text-blue-600 font-semibold">Advance Payment ({advancePercentage}%)</span>
                    <p className="text-sm text-gray-500">Pay now to confirm your booking</p>
                  </div>
                  <span className="text-xl font-bold text-blue-600">{formatPrice(advanceAmount)}</span>
                </div>
                
                <div className="flex justify-between items-center py-3">
                  <div>
                    <span className="text-gray-600">Balance to Pay Later</span>
                    <p className="text-sm text-gray-500">Payable before departure</p>
                  </div>
                  <span className="text-lg font-semibold text-gray-700">{formatPrice(balanceAmount)}</span>
                </div>
                
                <div className="bg-blue-50 rounded-xl p-4 mt-6 border border-blue-100">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-800">Amount to Pay Now</span>
                    <span className="text-2xl font-bold text-[#E53C42]">{formatPrice(advanceAmount)}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 text-center">
                    {advancePercentage}% of total cost
                  </p>
                </div>
              </div>
              
              {/* Help sections remain the same... */}
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
                      Free cancellation up to 48 hours before departure. Your advance payment is fully refundable.
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
            <DialogTitle>Enter Custom Advance Amount</DialogTitle>
            <DialogDescription>
              Enter the amount you want to pay as advance (minimum {formatPrice(minAdvanceAmount)})
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-gray-700">Total Tour Cost:</span>
                <span className="font-bold">{formatPrice(totalTourCost)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Minimum 20%:</span>
                <span className="font-bold text-green-600">{formatPrice(minAdvanceAmount)}</span>
              </div>
            </div>
            
            <div>
              <Label htmlFor="customAmount" className="text-gray-700 font-medium mb-2 block">
                Enter Advance Amount (₹)
              </Label>
              <Input
                id="customAmount"
                type="number"
                value={customAdvanceAmount}
                onChange={(e) => handleCustomAmountChange(e.target.value)}
                placeholder={`Enter amount (min: ${formatPrice(minAdvanceAmount)})`}
                className="h-12 text-lg"
                min={minAdvanceAmount}
                max={totalTourCost}
                step="100"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>Min: {formatPrice(minAdvanceAmount)}</span>
                <span>Max: {formatPrice(totalTourCost)}</span>
              </div>
            </div>
            
            {customAdvanceAmount && !isNaN(parseFloat(customAdvanceAmount)) && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-sm text-gray-600">Your Advance</div>
                    <div className="text-xl font-bold text-[#2E4D98]">
                      {formatPrice(customAdvanceAmount)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Percentage</div>
                    <div className="text-xl font-bold text-[#2E4D98]">
                      {customAdvancePercentage}%
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-sm text-gray-600">Balance to Pay Later:</div>
                  <div className="text-lg font-bold text-gray-800">
                    {formatPrice(totalTourCost - parseFloat(customAdvanceAmount))}
                  </div>
                </div>
              </div>
            )}
            
            {customAdvanceAmount && parseFloat(customAdvanceAmount) < minAdvanceAmount && (
              <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
                <p className="text-red-700 text-sm">
                  ⚠️ Amount must be at least {formatPrice(minAdvanceAmount)} (20% of total)
                </p>
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
              disabled={!customAdvanceAmount || parseFloat(customAdvanceAmount) < minAdvanceAmount}
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