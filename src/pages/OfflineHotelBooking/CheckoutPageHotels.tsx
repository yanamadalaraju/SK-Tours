// src/pages/OfflineHotelBooking/CheckoutPageHotels.tsx - Fixed guest details
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
import { AlertCircle, Star, MapPin, Hotel, Home, Sparkles, Crown, Users, Calendar, Clock, Bed, Maximize, Check, User, Baby } from "lucide-react";

// Guest interface
interface GuestDetails {
  id: number;
  type: 'adult' | 'child';
  name: string;
  firstName: string;
  lastName: string;
  age: number;
}

interface SelectedRoom {
  id: number;
  roomType: string;
  price: string;
  pricePerChild: string | null;
  amenities: string[];
  maxOccupancy: number;
  bedType: string;
  roomSize: string;
  availableRooms: number;
  description: string;
  images: string[];
}

interface HotelData {
  id: number;
  hotel_name: string;
  hotel_location: string;
  star_rating: number;
  rating?: string | number;
  total_ratings?: number;
  price: string | number;
  taxes?: string | number;
  total_amount?: string | number;
  price_per_child?: string | number;
  main_image?: string;
  additional_images?: string[];
  amenities?: string[];
  overview_description?: string;
  rooms?: number;
  adults?: number;
  children?: number;
  children_ages?: number[];
  pets?: number;
  check_in_date?: string;
  check_out_date?: string;
  city?: string;
  total_price_value?: number;
  selectedRoom?: SelectedRoom;
  selectedRoomCategory?: string;
  roomPrice?: number;
  childPrice?: number;
  totalChildrenPrice?: number;
  basePrice?: number;
  nights?: number;
  [key: string]: any;
}

const CheckoutPageHotels = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get hotel data from navigation state or localStorage
  const [hotelData, setHotelData] = useState<HotelData | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // State for payment amount
  const [showCustomAmountModal, setShowCustomAmountModal] = useState(false);
  const [customPaymentAmount, setCustomPaymentAmount] = useState('');
  const [paymentType, setPaymentType] = useState('full');
  const [isPartialPayment, setIsPartialPayment] = useState(false);

  // Guest details state
  const [guestDetails, setGuestDetails] = useState<GuestDetails[]>([]);
  const [showGuestDetails, setShowGuestDetails] = useState(true);

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
    specialRequests: '',
    termsAccepted: false
  });

  // Initialize hotel data and guest details
  useEffect(() => {
    const initializeData = () => {
      let hotel: HotelData | null = null;
      
      if (location.state?.hotel) {
        hotel = location.state.hotel;
        console.log('Hotel data from state:', hotel); // Debug log
      } else {
        const savedHotel = localStorage.getItem('selectedHotel');
        if (savedHotel) {
          hotel = JSON.parse(savedHotel);
          console.log('Hotel data from localStorage:', hotel); // Debug log
        }
      }

      if (hotel) {
        setHotelData(hotel);
        
        // Calculate total cost based on selected room if available
        const totalCost = calculateTotalCost(hotel);
        setCustomPaymentAmount(totalCost.toString());
        setPaymentType('full');
        
        // Initialize guest details with correct counts from API
        initializeGuestDetails(hotel);
      }
      
      setLoading(false);
    };

    initializeData();
  }, [location]);

  const calculateTotalCost = (hotel: HotelData): number => {
    // If total_price_value is already calculated, use it
    if (hotel.total_price_value) {
      return hotel.total_price_value;
    }

    // Calculate based on selected room
    if (hotel.selectedRoom) {
      const roomPrice = Number(hotel.selectedRoom.price);
      const childPrice = hotel.selectedRoom.pricePerChild 
        ? Number(hotel.selectedRoom.pricePerChild) 
        : Number(hotel.price_per_child || 0);
      const childrenCount = hotel.children || 0;
      const totalChildrenPrice = childPrice * childrenCount;
      const nights = calculateNights(hotel);
      const totalRoomPrice = roomPrice * nights;
      const taxes = Number(hotel.taxes || 0);
      
      return totalRoomPrice + totalChildrenPrice + taxes;
    }

    // Fallback to base calculation
    const basePrice = Number(hotel.price);
    const childPrice = Number(hotel.price_per_child || 0);
    const childrenCount = hotel.children || 0;
    const totalChildrenPrice = childPrice * childrenCount;
    const nights = calculateNights(hotel);
    const totalRoomPrice = basePrice * nights;
    const taxes = Number(hotel.taxes || 0);
    
    return totalRoomPrice + totalChildrenPrice + taxes;
  };

  const calculateNights = (hotel: HotelData): number => {
    if (hotel.nights) return hotel.nights;
    
    const checkIn = hotel.check_in_date ? new Date(hotel.check_in_date) : new Date();
    const checkOut = hotel.check_out_date ? new Date(hotel.check_out_date) : new Date();
    
    // If check-out is same as check-in, add 1 day
    if (checkOut.getTime() === checkIn.getTime()) {
      checkOut.setDate(checkOut.getDate() + 1);
    }
    
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 1;
  };

  // FIXED: Initialize guest details correctly from API data
  const initializeGuestDetails = (hotel: HotelData) => {
    // Use exact values from API - no fallback defaults that override API data
    const adults = hotel.adults !== undefined ? hotel.adults : 2;
    const children = hotel.children !== undefined ? hotel.children : 0;
    const childrenAges = hotel.children_ages || [];
    
    console.log('Initializing guests:', { adults, children, childrenAges }); // Debug log
    
    const details: GuestDetails[] = [];
    let id = 1;

    // Create adult entries
    for (let i = 0; i < adults; i++) {
      details.push({
        id: id++,
        type: 'adult',
        name: '',
        firstName: '',
        lastName: '',
        age: 18 // Minimum adult age
      });
    }

    // Create child entries with their ages from API
    for (let i = 0; i < children; i++) {
      // Use the age from children_ages array if available, otherwise default to 8
      const childAge = childrenAges[i] !== undefined ? childrenAges[i] : 8;
      details.push({
        id: id++,
        type: 'child',
        name: '',
        firstName: '',
        lastName: '',
        age: childAge
      });
    }

    console.log('Created guest details:', details); // Debug log
    setGuestDetails(details);
  };

  const handleGuestInputChange = (guestId: number, field: keyof GuestDetails, value: string | number) => {
    setGuestDetails(prev =>
      prev.map(guest =>
        guest.id === guestId
          ? {
            ...guest,
            [field]: value,
            ...(field === 'firstName' || field === 'lastName'
              ? { name: `${field === 'firstName' ? value : guest.firstName} ${field === 'lastName' ? value : guest.lastName}`.trim() }
              : {})
          }
          : guest
      )
    );
  };

  const validateGuestDetails = () => {
    for (const guest of guestDetails) {
      if (!guest.firstName?.trim()) {
        alert(`Please enter first name for ${guest.type} #${guest.id}`);
        return false;
      }
      if (!guest.lastName?.trim()) {
        alert(`Please enter last name for ${guest.type} #${guest.id}`);
        return false;
      }
      if (!guest.age || guest.age <= 0) {
        alert(`Please enter valid age for ${guest.type} #${guest.id}`);
        return false;
      }
      // Validate child age (0-17)
      if (guest.type === 'child' && guest.age > 17) {
        alert(`Child age must be 17 or younger for guest #${guest.id}`);
        return false;
      }
      // Validate adult age (18+)
      if (guest.type === 'adult' && guest.age < 18) {
        alert(`Adult age must be 18 or older for guest #${guest.id}`);
        return false;
      }
    }
    return true;
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomPaymentAmount(value);
    if (hotelData) {
      const totalHotelCost = getTotalHotelCost();
      const enteredAmount = parseFloat(value) || 0;
      if (enteredAmount >= totalHotelCost) {
        setPaymentType('full');
        setIsPartialPayment(false);
      } else if (enteredAmount > 0 && enteredAmount < totalHotelCost) {
        setPaymentType('partial');
        setIsPartialPayment(true);
      }
    }
  };

  const getTotalHotelCost = () => {
    if (!hotelData) return 0;
    return calculateTotalCost(hotelData);
  };

  const getCurrentPaymentAmount = () => {
    if (!hotelData) return 0;
    if (paymentType === 'custom' || paymentType === 'partial') {
      return Math.round(parseFloat(customPaymentAmount) || 0);
    }
    return getTotalHotelCost();
  };

  const validateCustomAmount = () => {
    if (!hotelData) return false;
    const totalHotelCost = getTotalHotelCost();
    const enteredAmount = parseFloat(customPaymentAmount);
    if (isNaN(enteredAmount)) {
      alert('Please enter a valid amount');
      return false;
    }
    if (enteredAmount < 1) {
      alert(`Minimum payment amount is ${formatPrice(1)}`);
      return false;
    }
    if (enteredAmount > totalHotelCost) {
      alert(`Amount cannot exceed total hotel cost of ${formatPrice(totalHotelCost)}`);
      return false;
    }
    return true;
  };

  const handleConfirmCustomAmount = () => {
    if (validateCustomAmount()) {
      const totalHotelCost = getTotalHotelCost();
      const enteredAmount = parseFloat(customPaymentAmount);
      if (enteredAmount >= totalHotelCost) {
        setPaymentType('full');
        setIsPartialPayment(false);
      } else {
        setPaymentType('partial');
        setIsPartialPayment(true);
      }
      setShowCustomAmountModal(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const parsePrice = (priceString: string | number | undefined) => {
    if (!priceString) return 0;
    const numericString = priceString.toString().replace(/[₹$,]/g, '').replace(/\s+/g, '').trim();
    return parseFloat(numericString) || 0;
  };

  const formatPrice = (price: number | string) => {
    return `₹${parseFloat(String(price)).toLocaleString('en-IN')}`;
  };

  const calculatePercentage = (amount: number) => {
    const total = getTotalHotelCost();
    return total > 0 ? Math.round((amount / total) * 100) : 0;
  };

  const getRoomTypeIcon = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'standard':
        return <Home className="w-4 h-4" />;
      case 'deluxe':
        return <Sparkles className="w-4 h-4" />;
      case 'luxury':
        return <Crown className="w-4 h-4" />;
      default:
        return <Home className="w-4 h-4" />;
    }
  };

  const getRoomTypeColor = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'standard':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'deluxe':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'luxury':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getImageUrl = (imagePath: string | undefined) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    const baseUrl = BASE_URL.replace('/api', '');
    return `${baseUrl}${imagePath}`;
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

    if (!validateGuestDetails()) {
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

    const totalHotelCost = getTotalHotelCost();
    const paymentAmount = getCurrentPaymentAmount();
    const paymentPercentage = calculatePercentage(paymentAmount);
    const isFullPayment = paymentAmount >= totalHotelCost;

    if (paymentAmount <= 0) {
      alert('Please enter a valid payment amount');
      setSubmitting(false);
      return;
    }

    try {
      const paymentDescription = isFullPayment
        ? `Full Payment for ${hotelData?.hotel_name}`
        : `${paymentPercentage}% Partial Payment for ${hotelData?.hotel_name}`;

      // Prepare guest details as JSON string for notes
      const guestDetailsJSON = JSON.stringify(guestDetails.map(g => ({
        id: g.id,
        type: g.type,
        first_name: g.firstName,
        last_name: g.lastName,
        age: g.age
      })));

      // Prepare room details if selected
      const roomDetails = hotelData?.selectedRoom ? {
        room_id: hotelData.selectedRoom.id,
        room_type: hotelData.selectedRoom.roomType,
        room_category: hotelData.selectedRoomCategory,
        room_price: hotelData.selectedRoom.price,
        price_per_child: hotelData.selectedRoom.pricePerChild,
        max_occupancy: hotelData.selectedRoom.maxOccupancy,
        bed_type: hotelData.selectedRoom.bedType,
        room_size: hotelData.selectedRoom.roomSize
      } : null;

      const nights = calculateNights(hotelData!);

      // Save checkout record to database with source='hotels'
      const checkoutResponse = await axios.post(
        `${BASE_URL}/api/checkout`,
        {
          tour_id: hotelData?.id?.toString() || '',
          tour_code: `HTL-${hotelData?.id}`,
          tour_title: hotelData?.hotel_name || '',
          tour_duration: `${nights} night${nights > 1 ? 's' : ''}, ${hotelData?.rooms || 1} room(s)`,
          tour_locations: `${hotelData?.hotel_location}, ${hotelData?.city || ''}`,
          tour_image_url: hotelData?.main_image || '',

          // Price details
          total_tour_cost: totalHotelCost,
          advance_percentage: paymentPercentage,
          advance_amount: paymentAmount,
          emi_price: 0,

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

          payment_method: 'phonepe',
          source_page: 'offline-hotels',
          source: 'hotels',
          terms_accepted: formData.termsAccepted,
          notes: JSON.stringify({
            payment_description: paymentDescription,
            guest_details: guestDetails.map(g => ({
              type: g.type,
              first_name: g.firstName,
              last_name: g.lastName,
              age: g.age
            })),
            special_requests: formData.specialRequests || 'None',
            hotel_details: {
              hotel_id: hotelData?.id,
              hotel_name: hotelData?.hotel_name,
              hotel_location: hotelData?.hotel_location,
              star_rating: hotelData?.star_rating,
              rooms: hotelData?.rooms || 1,
              adults: hotelData?.adults || 1,
              children: hotelData?.children || 0,
              children_ages: hotelData?.children_ages || [],
              check_in_date: hotelData?.check_in_date,
              check_out_date: hotelData?.check_out_date,
              nights: nights
            },
            room_details: roomDetails,
            price_breakdown: {
              base_price: hotelData?.selectedRoom ? Number(hotelData.selectedRoom.price) : Number(hotelData?.price || 0),
              price_per_night: hotelData?.selectedRoom ? Number(hotelData.selectedRoom.price) : Number(hotelData?.price || 0),
              child_price_per_night: Number(hotelData?.selectedRoom?.pricePerChild || hotelData?.price_per_child || 0),
              children_count: hotelData?.children || 0,
              total_children_price: (Number(hotelData?.selectedRoom?.pricePerChild || hotelData?.price_per_child || 0) * (hotelData?.children || 0)),
              nights: nights,
              room_total: (hotelData?.selectedRoom ? Number(hotelData.selectedRoom.price) : Number(hotelData?.price || 0)) * nights,
              taxes: Number(hotelData?.taxes || 0),
              total_amount: totalHotelCost
            }
          })
        }
      );

      if (!checkoutResponse.data.success) {
        throw new Error('Failed to create booking record. Please try again.');
      }

      const checkoutId = checkoutResponse.data.checkout_id;

      // Create PhonePe order
      const merchantOrderId = `HTL_${checkoutId}_${Date.now()}`;
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
            hotel_name: hotelData?.hotel_name || '',
            payment_type: isFullPayment ? 'full' : 'partial',
            payment_percentage: paymentPercentage,
            source: 'hotels',
            guest_count: guestDetails.length,
            hotel_location: hotelData?.hotel_location,
            selected_room: hotelData?.selectedRoom?.roomType || 'Standard',
            room_category: hotelData?.selectedRoomCategory || 'standard',
            nights: nights
          }
        }
      );

      if (paymentResponse.data.success) {
        // Update checkout with PhonePe order ID
        await axios.put(
          `${BASE_URL}/api/checkout/${checkoutId}/payment`,
          {
            phonepe_order_id: paymentResponse.data.merchantOrderId,
            payment_status: 'processing'
          }
        );

        // Save booking details to localStorage
        const bookingData = {
          hotel: hotelData,
          guest_details: guestDetails,
          customer: formData,
          checkout_id: checkoutId,
          timestamp: new Date().toISOString(),
          amount: paymentAmount,
          total_hotel_cost: totalHotelCost,
          payment_percentage: paymentPercentage,
          is_full_payment: isFullPayment,
          merchant_order_id: paymentResponse.data.merchantOrderId,
          payment_type: isFullPayment ? 'full' : 'partial',
          custom_amount: paymentType === 'custom' || paymentType === 'partial' ? customPaymentAmount : null,
          source: 'hotels',
          nights: nights
        };

        localStorage.setItem('currentHotelBooking', JSON.stringify(bookingData));
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
      alert(`Payment failed: ${(error as any).response?.data?.message || (error as Error).message || 'Please try again'}`);
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

  if (!hotelData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Hotel Selected</h2>
          <p className="text-gray-600 mb-6">Please select a hotel to proceed with booking.</p>
          <Button onClick={() => navigate('/hotels')} className="bg-[#2E4D98] hover:bg-[#2E4D98]/90 px-8 py-6 text-lg">
            Browse Hotels
          </Button>
        </div>
      </div>
    );
  }

  const totalHotelCost = getTotalHotelCost();
  const paymentAmount = getCurrentPaymentAmount();
  const paymentPercentage = calculatePercentage(paymentAmount);
  const balanceAmount = totalHotelCost - paymentAmount;
  const isFullPayment = paymentAmount >= totalHotelCost;
  const nights = calculateNights(hotelData);
  const basePricePerNight = hotelData.selectedRoom 
    ? Number(hotelData.selectedRoom.price) 
    : Number(hotelData.price);
  const childPricePerNight = hotelData.selectedRoom?.pricePerChild 
    ? Number(hotelData.selectedRoom.pricePerChild) 
    : Number(hotelData.price_per_child || 0);
  const childrenCount = hotelData.children || 0;
  const adultsCount = hotelData.adults || 1;
  const totalChildrenPrice = childPricePerNight * childrenCount;
  const roomTotal = basePricePerNight * nights;
  const taxes = Number(hotelData.taxes || 0);

  // Count guests by type for display
  const adultGuests = guestDetails.filter(g => g.type === 'adult');
  const childGuests = guestDetails.filter(g => g.type === 'child');

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
            Back to Hotels
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Complete Your Hotel Booking</h1>
                    <p className="text-gray-600">Pay any amount - from partial to full payment</p>
                  </div>
                  <div className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
                    <span className="text-sm font-semibold text-blue-700">Flexible Payment</span>
                  </div>
                </div>

                {/* Hotel Summary with Image */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 mb-8 border border-blue-100">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Hotel className="h-5 w-5 text-blue-600" />
                    Hotel Summary
                  </h2>
                  
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Hotel Image */}
                    {hotelData.main_image && (
                      <div className="md:w-48 h-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={getImageUrl(hotelData.main_image) || ''}
                          alt={hotelData.hotel_name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-800 mb-2">{hotelData.hotel_name}</h3>
                      <p className="text-gray-600 flex items-center gap-1 mb-3">
                        <MapPin size={16} /> {hotelData.hotel_location}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <div className="flex">
                          {[...Array(hotelData.star_rating || 0)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        {hotelData.rating && (
                          <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">
                            {Number(hotelData.rating).toFixed(1)} ★ ({hotelData.total_ratings || 0} reviews)
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          {hotelData.rooms || 1} Room(s)
                        </span>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          {adultsCount} Adult{adultsCount !== 1 ? 's' : ''}
                        </span>
                        {childrenCount > 0 && (
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                            {childrenCount} Child{childrenCount !== 1 ? 'ren' : ''}
                          </span>
                        )}
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                          {nights} Night{nights > 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Selected Room Details */}
                {hotelData.selectedRoom && (
                  <div className={`border rounded-xl p-5 mb-8 ${getRoomTypeColor(hotelData.selectedRoomCategory || 'standard')}`}>
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      {getRoomTypeIcon(hotelData.selectedRoomCategory || 'standard')}
                      Selected Room: {hotelData.selectedRoom.roomType}
                      <span className="text-sm font-normal capitalize ml-2">
                        ({hotelData.selectedRoomCategory})
                      </span>
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Bed className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">{hotelData.selectedRoom.bedType}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Maximize className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">{hotelData.selectedRoom.roomSize} sq.ft</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">Max {hotelData.selectedRoom.maxOccupancy} guests</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">{hotelData.selectedRoom.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {hotelData.selectedRoom.amenities?.slice(0, 3).map((amenity, idx) => (
                            <span key={idx} className="text-xs bg-white/50 px-2 py-1 rounded flex items-center gap-1">
                              <Check className="w-3 h-3" /> {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Stay Details */}
                <div className="bg-white border border-gray-200 rounded-xl p-5 mb-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    Stay Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <Calendar className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Check-in</p>
                        <p className="font-semibold">
                          {hotelData.check_in_date 
                            ? new Date(hotelData.check_in_date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
                            : 'To be confirmed'}
                        </p>
                        <p className="text-xs text-gray-500">From 2:00 PM</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-red-100 p-2 rounded-lg">
                        <Calendar className="w-4 h-4 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Check-out</p>
                        <p className="font-semibold">
                          {hotelData.check_out_date 
                            ? new Date(hotelData.check_out_date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
                            : 'To be confirmed'}
                        </p>
                        <p className="text-xs text-gray-500">Until 12:00 PM</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Clock className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="font-semibold">{nights} Night{nights > 1 ? 's' : ''}</p>
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

                  {/* Full Payment Option */}
                  <div className="mb-4">
                    <div className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${paymentType === 'full' ? 'border-[#2E4D98] bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                      onClick={() => {
                        setPaymentType('full');
                        setCustomPaymentAmount(totalHotelCost.toString());
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
                        <div className="text-lg font-bold text-gray-900">{formatPrice(totalHotelCost)}</div>
                        <div className="text-sm text-gray-600">100% of total</div>
                      </div>
                    </div>
                  </div>

                  {/* Custom Amount Option */}
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

                {/* Guest Details Section - FIXED */}
                <div className="bg-white border border-gray-200 rounded-xl p-5 mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                      <Users className="h-5 w-5 text-blue-600" />
                      Guest Details ({guestDetails.length} Guest{guestDetails.length !== 1 ? 's' : ''})
                    </h2>
                    <button
                      onClick={() => setShowGuestDetails(!showGuestDetails)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      {showGuestDetails ? 'Hide Details' : 'Show Details'}
                    </button>
                  </div>

                  {/* Guest Type Summary */}
                  <div className="flex gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">Adults: <strong>{adultGuests.length}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Baby className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm">Children: <strong>{childGuests.length}</strong></span>
                    </div>
                  </div>

                  {showGuestDetails && (
                    <div className="border rounded-lg p-6 mt-4 overflow-x-auto">
                      <div className="mb-4">
                        <h3 className="font-semibold text-gray-700">Please fill in guest details</h3>
                        <p className="text-sm text-gray-500">All fields are required for booking</p>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse min-w-[600px]">
                          <thead>
                            <tr className="border-b-2 border-gray-200 bg-gray-50">
                              <th className="p-3 text-left">#</th>
                              <th className="p-3 text-left">Type</th>
                              <th className="p-3 text-left">First Name</th>
                              <th className="p-3 text-left">Last Name</th>
                              <th className="p-3 text-left">Age</th>
                            </tr>
                          </thead>
                          <tbody>
                            {guestDetails.map((guest, index) => (
                              <tr key={guest.id} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="p-3 text-gray-500">{index + 1}</td>
                                <td className="p-3 align-top">
                                  <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit ${
                                    guest.type === 'adult' 
                                      ? 'bg-blue-100 text-blue-700' 
                                      : 'bg-yellow-100 text-yellow-700'
                                  }`}>
                                    {guest.type === 'adult' ? (
                                      <><User className="w-3 h-3" /> Adult</>
                                    ) : (
                                      <><Baby className="w-3 h-3" /> Child</>
                                    )}
                                  </span>
                                </td>
                                <td className="p-3 align-top">
                                  <input
                                    type="text"
                                    value={guest.firstName}
                                    onChange={(e) => handleGuestInputChange(guest.id, 'firstName', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="First name"
                                    required
                                  />
                                </td>
                                <td className="p-3 align-top">
                                  <input
                                    type="text"
                                    value={guest.lastName}
                                    onChange={(e) => handleGuestInputChange(guest.id, 'lastName', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Last name"
                                    required
                                  />
                                </td>
                                <td className="p-3 align-top">
                                  <input
                                    type="number"
                                    value={guest.age || ''}
                                    onChange={(e) => handleGuestInputChange(guest.id, 'age', parseInt(e.target.value) || 0)}
                                    className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Age"
                                    min={guest.type === 'adult' ? 18 : 0}
                                    max={guest.type === 'adult' ? 120 : 17}
                                    required
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Children Ages from API Display */}
                      {hotelData.children_ages && hotelData.children_ages.length > 0 && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-700">
                            <strong>Children ages from booking:</strong> {hotelData.children_ages.join(', ')} years
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Payment Information Notice */}
                {isPartialPayment && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
                    <div className="flex">
                      <AlertCircle className="h-5 w-5 text-yellow-400" />
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          <strong>Note:</strong> You are paying {paymentPercentage}% ({formatPrice(paymentAmount)}) now.
                          The remaining {formatPrice(balanceAmount)} ({100 - paymentPercentage}%) will be payable before check-in.
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

                  {/* Address Details */}
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
                      <div>
                        <Label className="text-gray-700 font-medium mb-2 block">Special Requests</Label>
                        <textarea
                          name="specialRequests"
                          value={formData.specialRequests}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={3}
                          placeholder="Any special requests or preferences?"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Checkbox
                      id="terms"
                      checked={formData.termsAccepted}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, termsAccepted: checked as boolean }))}
                      className="mt-1"
                    />
                    <Label htmlFor="terms" className="text-sm cursor-pointer">
                      I agree to the{' '}
                      <a href="/terms" className="text-[#2E4D98] hover:underline font-medium">Terms & Conditions</a>{' '}
                      and{' '}
                      <a href="/privacy" className="text-[#2E4D98] hover:underline font-medium">Privacy Policy</a>
                      . {isPartialPayment && `I understand that I'm paying ${paymentPercentage}% now and the remaining amount must be paid before check-in.`} <span className="text-red-500">*</span>
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
                  {/* Room Charges */}
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">
                      Room Charges ({nights} night{nights > 1 ? 's' : ''})
                    </span>
                    <span className="font-medium">{formatPrice(roomTotal)}</span>
                  </div>
                  <div className="text-xs text-gray-500 pl-4">
                    {formatPrice(basePricePerNight)} × {nights} night{nights > 1 ? 's' : ''}
                  </div>

                  {/* Children Charges */}
                  {childrenCount > 0 && (
                    <>
                      <div className="flex justify-between items-center py-2 border-t">
                        <span className="text-gray-600">
                          Children Charges ({childrenCount} child{childrenCount !== 1 ? 'ren' : ''})
                        </span>
                        <span className="font-medium">{formatPrice(totalChildrenPrice)}</span>
                      </div>
                      <div className="text-xs text-gray-500 pl-4">
                        {formatPrice(childPricePerNight)} × {childrenCount} child{childrenCount !== 1 ? 'ren' : ''}
                      </div>
                    </>
                  )}

                  {/* Taxes */}
                  <div className="flex justify-between items-center py-2 border-t">
                    <span className="text-gray-600">Taxes & Fees</span>
                    <span className="font-medium">{formatPrice(taxes)}</span>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center py-3 border-t-2">
                    <span className="text-gray-800 font-semibold">Total Hotel Cost</span>
                    <span className="text-xl font-bold text-gray-900">{formatPrice(totalHotelCost)}</span>
                  </div>

                  {/* Payment Summary */}
                  <div className="bg-blue-50 rounded-xl p-4 mt-6 border border-blue-100">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-600 font-semibold">
                        {isFullPayment ? 'Full Payment' : `Partial Payment (${paymentPercentage}%)`}
                      </span>
                      <span className="text-xl font-bold text-blue-600">{formatPrice(paymentAmount)}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Pay now to confirm your booking
                    </p>
                  </div>

                  {!isFullPayment && (
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-600">Balance to Pay Later</span>
                      <span className="text-lg font-semibold text-gray-700">{formatPrice(balanceAmount)}</span>
                    </div>
                  )}

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mt-4 border border-green-100">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-800">Amount to Pay Now</span>
                      <span className="text-2xl font-bold text-[#E53C42]">{formatPrice(paymentAmount)}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2 text-center">
                      {isFullPayment ? '100% of total cost' : `${paymentPercentage}% of total cost`}
                    </p>
                  </div>
                </div>

                {/* Guest Summary */}
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6">
                  <h3 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Guest Summary
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-purple-700">Adults:</span>
                      <span className="font-semibold text-purple-900">{adultGuests.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-700">Children:</span>
                      <span className="font-semibold text-purple-900">{childGuests.length}</span>
                    </div>
                    {hotelData.children_ages && hotelData.children_ages.length > 0 && (
                      <div className="flex justify-between">
                        <span className="text-purple-700">Children Ages:</span>
                        <span className="font-semibold text-purple-900">{hotelData.children_ages.join(', ')}</span>
                      </div>
                    )}
                    <div className="flex justify-between pt-2 border-t border-purple-200">
                      <span className="text-purple-700 font-medium">Total Guests:</span>
                      <span className="font-semibold text-purple-900">{guestDetails.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-700">Rooms:</span>
                      <span className="font-semibold text-purple-900">{hotelData.rooms || 1}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-700">Nights:</span>
                      <span className="font-semibold text-purple-900">{nights}</span>
                    </div>
                  </div>
                </div>

                {/* Hotel Quick Info */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Hotel Information</h3>
                  <div className="space-y-2 text-sm">
                    <p className="font-medium">{hotelData.hotel_name}</p>
                    <p className="text-gray-600 flex items-center gap-1">
                      <MapPin size={14} /> {hotelData.hotel_location}
                    </p>
                    <div className="flex items-center gap-1">
                      {[...Array(hotelData.star_rating || 0)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-gray-600 ml-1">{hotelData.star_rating} Star</span>
                    </div>
                  </div>
                </div>

                {/* Need Help Section */}
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
                      <p className="text-lg font-bold text-blue-800">98208 70771</p>
                      <p className="text-sm text-blue-700">salil@sktt.in</p>
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
                  <span className="text-gray-700">Total Hotel Cost:</span>
                  <span className="font-bold">{formatPrice(totalHotelCost)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Minimum:</span>
                  <span>₹1</span>
                </div>
              </div>

              <div>
                <Label className="text-gray-700 font-medium mb-2 block">
                  Enter Payment Amount (₹)
                </Label>
                <Input
                  type="number"
                  value={customPaymentAmount}
                  onChange={(e) => handleCustomAmountChange(e.target.value)}
                  placeholder={`Enter amount (max: ${formatPrice(totalHotelCost)})`}
                  className="h-12 text-lg"
                  min="1"
                  max={totalHotelCost}
                  step="100"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>Min: ₹1</span>
                  <span>Max: {formatPrice(totalHotelCost)}</span>
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
                        {calculatePercentage(parseFloat(customPaymentAmount))}%
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className={`text-sm ${parseFloat(customPaymentAmount) >= totalHotelCost ? 'text-green-600' : 'text-yellow-600'} font-medium`}>
                      {parseFloat(customPaymentAmount) >= totalHotelCost ? '✅ Full Payment' : '⏳ Partial Payment'}
                    </div>
                    {parseFloat(customPaymentAmount) < totalHotelCost && (
                      <div className="mt-2">
                        <div className="text-sm text-gray-600">Balance to Pay Later:</div>
                        <div className="text-lg font-bold text-gray-800">
                          {formatPrice(totalHotelCost - parseFloat(customPaymentAmount))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCustomAmountModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleConfirmCustomAmount}>
                Use This Amount
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPageHotels;