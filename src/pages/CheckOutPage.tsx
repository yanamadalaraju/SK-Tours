// src/pages/CheckoutPage.jsx
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

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get tour data from navigation state or localStorage
  const [tourData, setTourData] = useState(null);
  const [loading, setLoading] = useState(true);
  
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
    paymentMethod: 'card',
    termsAccepted: false
  });

  // Initialize tour data
  useEffect(() => {
    // First try to get from navigation state
    if (location.state?.tour) {
      setTourData(location.state.tour);
      setLoading(false);
    } else {
      // Fallback to localStorage
      const savedTour = localStorage.getItem('selectedTour');
      if (savedTour) {
        setTourData(JSON.parse(savedTour));
      }
      setLoading(false);
    }
  }, [location]);



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

  // const handleSubmit = (e) => {
  //   e.preventDefault();
    
  //   if (!formData.termsAccepted) {
  //     alert('Please accept the terms and conditions');
  //     return;
  //   }

  //   // Here you would typically send the data to your backend
  //   console.log('Checkout data:', { tour: tourData, customer: formData });
    
  //   // Show success message and redirect
  //   alert('Booking confirmed successfully! You will receive a confirmation email shortly.');
  //   navigate('/');
  // };


    // Add this function at the top of your component or in a utility file
const parsePrice = (priceString) => {
  if (!priceString) return 0;
  
  // Remove currency symbols, commas, and spaces
  const numericString = priceString
    .replace(/[₹$,]/g, '') // Remove currency symbols and commas
    .replace(/\s+/g, '')   // Remove spaces
    .trim();
  
  // Parse as float and round to 2 decimal places
  return Math.round(parseFloat(numericString) * 100) / 100;
};


  const handlePhonePePayment = async (e) => {
  e.preventDefault(); // Prevent default form submission
  
  // if (!formData.termsAccepted) {
  //   alert('Please accept the terms and conditions');
  //   return;
  // }
  
  // Validate required fields
  const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'pincode'];
  const missingFields = requiredFields.filter(field => !formData[field]);
  
  if (missingFields.length > 0) {
    alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
    return;
  }

  try {
    // Parse the price
    const amount = parsePrice(tourData.price);
    
    if (isNaN(amount) || amount <= 0) {
      throw new Error('Invalid price amount');
    }

    console.log('Submitting booking with:', {
      tour: tourData,
      customer: formData,
      amount: amount
    });

    // Save booking details to localStorage or sessionStorage for later use
    const bookingData = {
      tour: tourData,
      customer: formData,
      timestamp: new Date().toISOString(),
      amount: amount
    };
    localStorage.setItem('currentBooking', JSON.stringify(bookingData));

    // Create PhonePe order
    const response = await axios.post(
      `${BASE_URL}/api/phonepe/orders`,
      {
        action: 'create-order',
        amount: amount, // Use parsed numeric amount
        currency: "INR",
        environment: "test",
        // Add customer details to backend for reference
        customerDetails: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone
        }
      }
    );

    if (response.data.success) {
      // Save order ID for later reference
      localStorage.setItem('phonePeOrderId', response.data.merchantOrderId);
      
      // Redirect to PhonePe payment page
      window.location.href = response.data.checkoutPageUrl;
    } else {
      throw new Error(response.data.message || 'Failed to create order');
    }
  } catch (error) {
    console.error("PhonePe payment error:", error);
    alert(`Payment failed: ${error.message || 'Please try again'}`);
  }
};


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading checkout...</p>
      </div>
    );
  }

  if (!tourData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">No Tour Selected</h2>
        <p className="mb-6">Please select a tour to proceed with booking.</p>
        <Button onClick={() => navigate('/')} className="bg-[#2E4D98] hover:bg-[#2E4D98]/90">
          Browse Tours
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={() => navigate(-1)}
          className="mb-6 text-[#2E4D98] hover:underline flex items-center gap-2"
        >
          ← Back to tour
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Booking Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Checkout</h1>
              <p className="text-gray-600 mb-6">Complete your booking by filling in the details below</p>
              
              {/* Tour Summary */}
              <div className="bg-blue-50 rounded-xl p-4 mb-8 border border-blue-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Tour Summary</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{tourData.title}</h3>
                    <p className="text-gray-600">{tourData.locations}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {tourData.duration}
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {tourData.code}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900">{tourData.price}</div>
                    <p className="text-gray-600">EMI: {tourData.emi}/month</p>
                  </div>
                </div>
              </div>
              
              {/* Booking Form */}
              <form onSubmit={handlePhonePePayment} className="space-y-6">
                {/* Personal Details */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                
                {/* Address Details */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Address Details</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="address">Address *</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Input
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="pincode">Pincode *</Label>
                        <Input
                          id="pincode"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Payment Method */}
                {/* <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Method</h2>
                  <RadioGroup 
                    value={formData.paymentMethod} 
                    onValueChange={handleRadioChange}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="cursor-pointer">Credit/Debit Card</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="netbanking" id="netbanking" />
                      <Label htmlFor="netbanking" className="cursor-pointer">Net Banking</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi" className="cursor-pointer">UPI</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="wallet" id="wallet" />
                      <Label htmlFor="wallet" className="cursor-pointer">Wallet</Label>
                    </div>
                  </RadioGroup>
                </div> */}
                
                {/* Terms and Conditions */}
                {/* <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.termsAccepted}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, termsAccepted: checked }))
                    }
                  />
                  <Label htmlFor="terms" className="cursor-pointer">
                    I agree to the Terms & Conditions and Privacy Policy *
                  </Label>
                </div> */}
                
                <Button 
                  type="submit"
                  className="w-full bg-[#E53C42] hover:bg-[#E53C42]/90 text-white py-6 text-lg"
                >
                  Confirm Booking - {tourData.price}
                </Button>
              </form>
            </div>
          </div>
          
          {/* Right Column - Price Breakdown */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Price Breakdown</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Base Price</span>
                  <span className="font-semibold">{tourData.price}</span>
                </div>
                {/* <div className="flex justify-between">
                  <span className="text-gray-600">Taxes & Fees</span>
                  <span className="font-semibold">₹1,200</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Charge</span>
                  <span className="font-semibold">₹500</span>
                </div> */}
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-800">Total Amount</span>
                    <span className="text-2xl font-bold text-[#E53C42]">{tourData.price}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                <h3 className="font-semibold text-green-800 mb-2">✅ Booking Protection</h3>
                <p className="text-sm text-green-700">
                  Your booking is protected with free cancellation up to 48 hours before departure.
                </p>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h3 className="font-semibold text-blue-800 mb-2">📞 Need Help?</h3>
                <p className="text-sm text-blue-700 mb-2">
                  Call our customer support:
                </p>
                <p className="text-lg font-bold text-blue-800">1800-123-4567</p>
                <p className="text-sm text-blue-700">Available 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;