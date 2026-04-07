// src/pages/OfflineHotelBooking/CheckoutPageHotels.tsx
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
import { AlertCircle, Star, MapPin, Calendar, Users, Hotel } from "lucide-react";
import { format } from "date-fns";

// Guest interface
interface GuestDetails {
  id: number;
  type: 'adult' | 'child';
  name: string;
  firstName: string;
  lastName: string;
  age: number;
}

interface HotelData {
  id: number;
  hotel_name: string;
  hotel_location: string;
  star_rating: number;
  price: string | number;
  taxes?: string | number;
  main_image?: string;
  checkIn?: Date | string;
  checkOut?: Date | string;
  nights?: number;
  rooms?: number;
  adults?: number;
  children?: number;
  total_price_value?: number;
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
    if (location.state?.hotel) {
      const hotel = location.state.hotel;
      setHotelData(hotel);
      const totalHotelCost = hotel.total_price_value || calculateTotalCost(hotel);
      setCustomPaymentAmount(totalHotelCost.toString());
      setPaymentType('full');
      initializeGuestDetails(hotel);
      setLoading(false);
    } else {
      const savedHotel = localStorage.getItem('selectedHotel');
      if (savedHotel) {
        const parsedHotel = JSON.parse(savedHotel);
        setHotelData(parsedHotel);
        const totalHotelCost = parsedHotel.total_price_value || calculateTotalCost(parsedHotel);
        setCustomPaymentAmount(totalHotelCost.toString());
        setPaymentType('full');
        initializeGuestDetails(parsedHotel);
      }
      setLoading(false);
    }
  }, [location]);

  const calculateTotalCost = (hotel: HotelData) => {
    const nights = hotel.nights || 1;
    const rooms = hotel.rooms || 1;
    const pricePerNight = parsePrice(hotel.price);
    const taxes = parsePrice(hotel.taxes) || pricePerNight * 0.18;
    return (pricePerNight * nights * rooms) + (taxes * nights * rooms);
  };

  const initializeGuestDetails = (hotel: HotelData) => {
    const adults = hotel.adults || 2;
    const children = hotel.children || 0;
    const details: GuestDetails[] = [];
    let id = 1;

    for (let i = 0; i < adults; i++) {
      details.push({
        id: id++,
        type: 'adult',
        name: '',
        firstName: '',
        lastName: '',
        age: 30
      });
    }

    for (let i = 0; i < children; i++) {
      details.push({
        id: id++,
        type: 'child',
        name: '',
        firstName: '',
        lastName: '',
        age: 8
      });
    }

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
    return hotelData.total_price_value || calculateTotalCost(hotelData);
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

  const getNumberOfNights = () => {
    if (!hotelData?.checkIn || !hotelData?.checkOut) return 1;
    const checkIn = new Date(hotelData.checkIn);
    const checkOut = new Date(hotelData.checkOut);
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
  };

  const handlePhonePePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const requiredFields = ['firstName', 'lastName', 'email', 'phone'];
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
      const guestDetailsForAPI = guestDetails.map(g => ({
        id: g.id,
        type: g.type,
        first_name: g.firstName,
        last_name: g.lastName,
        age: g.age
      }));

      const contactDetails = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        pincode: formData.pincode.trim(),
        country: formData.country.trim(),
        special_requests: formData.specialRequests.trim()
      };

      const hotelBookingData = {
        hotel: {
          id: hotelData.id,
          hotel_name: hotelData.hotel_name,
          hotel_location: hotelData.hotel_location,
          star_rating: hotelData.star_rating,
          price_per_night: hotelData.price,
          taxes: hotelData.taxes,
          main_image: hotelData.main_image
        },
        bookingParams: {
          check_in: hotelData.checkIn,
          check_out: hotelData.checkOut,
          nights: getNumberOfNights(),
          rooms: hotelData.rooms || 1,
          adults: hotelData.adults || 2,
          children: hotelData.children || 0,
          totalAmount: paymentAmount
        },
        guestDetails: guestDetailsForAPI,
        contactDetails: contactDetails
      };

      console.log('Saving hotel booking...');
      const saveResponse = await axios.post(`${BASE_URL}/api/offline-hotels/save-booking`, hotelBookingData);

      if (!saveResponse.data.success) {
        throw new Error('Failed to create booking record. Please try again.');
      }

      const bookingId = saveResponse.data.bookingId;
      const merchantOrderId = `HTL_${bookingId}_${Date.now()}`;
      const baseUrl = window.location.origin;
      const redirectUrl = `${baseUrl}/hotel-payment-result`;

      const payload = {
        action: "create-order",
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
          hotel_name: hotelData.hotel_name,
          payment_type: isFullPayment ? "full" : "partial",
          payment_percentage: paymentPercentage,
          guest_count: guestDetails.length,
          booking_type: 'hotel'
        }
      };

      const paymentResponse = await axios.post(`${BASE_URL}/api/flight/phonepe/orders`, payload);

      if (paymentResponse.data.success) {
        await axios.put(`${BASE_URL}/api/offline-hotels/update-booking/${bookingId}`, {
          referenceId: paymentResponse.data.merchantOrderId,
          bookingStatus: 'Processing',
          paymentStatus: 'Processing',
          apiResponse: paymentResponse.data
        });

        localStorage.setItem('phonePeOrderId', paymentResponse.data.merchantOrderId);
        localStorage.setItem('hotelBookingId', bookingId);
        window.location.href = paymentResponse.data.checkoutPageUrl;
      } else {
        throw new Error(paymentResponse.data.message || 'Failed to initialize payment.');
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
  const nights = getNumberOfNights();

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <button onClick={() => navigate(-1)} className="mb-6 text-[#2E4D98] hover:underline flex items-center gap-2">
            ← Back to Hotels
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Complete Your Hotel Booking</h1>
                <p className="text-gray-600 mb-6">Pay any amount - from partial to full payment</p>

                {/* Hotel Summary */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Hotel className="h-5 w-5 text-blue-600" /> Hotel Summary
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-bold text-lg">{hotelData.hotel_name}</h3>
                      <p className="text-gray-600 flex items-center gap-1"><MapPin size={16} /> {hotelData.hotel_location}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex">
                          {[...Array(hotelData.star_rating || 0)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          {nights} Night{nights > 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold">{formatPrice(totalHotelCost)}</div>
                      <p className="text-gray-600">Total Stay Cost</p>
                    </div>
                  </div>
                </div>

                {/* Payment Selection */}
                <div className="border rounded-xl p-5 mb-8">
                  <h2 className="text-xl font-semibold mb-4">Payment Amount</h2>
                  
                  <div className={`border rounded-lg p-4 mb-4 cursor-pointer ${paymentType === 'full' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                    onClick={() => {
                      setPaymentType('full');
                      setCustomPaymentAmount(totalHotelCost.toString());
                      setIsPartialPayment(false);
                    }}>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentType === 'full' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`}>
                          {paymentType === 'full' && <div className="w-2 h-2 rounded-full bg-white"></div>}
                        </div>
                        <div>
                          <h3 className="font-medium">Full Payment</h3>
                          <p className="text-sm text-gray-600">Pay the complete amount now</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{formatPrice(totalHotelCost)}</div>
                        <div className="text-sm text-gray-600">100% of total</div>
                      </div>
                    </div>
                  </div>

                  <div className={`border rounded-lg p-4 cursor-pointer ${paymentType === 'partial' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                    onClick={() => setShowCustomAmountModal(true)}>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentType === 'partial' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`}>
                          {paymentType === 'partial' && <div className="w-2 h-2 rounded-full bg-white"></div>}
                        </div>
                        <div>
                          <h3 className="font-medium">Custom Amount</h3>
                          <p className="text-sm text-gray-600">Pay any amount you want</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{formatPrice(paymentAmount)}</div>
                        <div className="text-sm text-gray-600">{paymentPercentage}% of total</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Guest Details */}
                <div className="border rounded-xl p-5 mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Guest Details ({guestDetails.length})</h2>
                    <button onClick={() => setShowGuestDetails(!showGuestDetails)} className="text-blue-600">
                      {showGuestDetails ? 'Hide' : 'Show'}
                    </button>
                  </div>

                  {showGuestDetails && (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="p-3 text-left">Type</th>
                            <th className="p-3 text-left">First Name</th>
                            <th className="p-3 text-left">Last Name</th>
                            <th className="p-3 text-left">Age</th>
                          </tr>
                        </thead>
                        <tbody>
                          {guestDetails.map((guest) => (
                            <tr key={guest.id} className="border-b">
                              <td className="p-3">
                                <span className={`px-2 py-1 rounded text-xs ${guest.type === 'adult' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                  {guest.type === 'adult' ? 'Adult' : 'Child'}
                                </span>
                              </td>
                              <td className="p-3">
                                <input type="text" value={guest.firstName}
                                  onChange={(e) => handleGuestInputChange(guest.id, 'firstName', e.target.value)}
                                  className="w-full p-2 border rounded" placeholder="First name" />
                              </td>
                              <td className="p-3">
                                <input type="text" value={guest.lastName}
                                  onChange={(e) => handleGuestInputChange(guest.id, 'lastName', e.target.value)}
                                  className="w-full p-2 border rounded" placeholder="Last name" />
                              </td>
                              <td className="p-3">
                                <input type="number" value={guest.age}
                                  onChange={(e) => handleGuestInputChange(guest.id, 'age', parseInt(e.target.value) || 0)}
                                  className="w-20 p-2 border rounded" placeholder="Age" />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {isPartialPayment && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
                    <p className="text-sm text-yellow-700">
                      Paying {paymentPercentage}% now. Balance {formatPrice(balanceAmount)} payable before check-in.
                    </p>
                  </div>
                )}

                <form onSubmit={handlePhonePePayment}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <Label>First Name *</Label>
                      <Input name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                    </div>
                    <div>
                      <Label>Last Name *</Label>
                      <Input name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                    </div>
                    <div>
                      <Label>Email *</Label>
                      <Input name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                    </div>
                    <div>
                      <Label>Phone *</Label>
                      <Input name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg mb-6">
                    <Checkbox id="terms" checked={formData.termsAccepted}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, termsAccepted: checked as boolean }))} />
                    <Label htmlFor="terms">I agree to the Terms & Conditions *</Label>
                  </div>

                  <Button type="submit" disabled={submitting} className="w-full bg-[#E53C42] hover:bg-[#E53C42]/90 py-6 text-lg">
                    {submitting ? 'Processing...' : `Pay ${formatPrice(paymentAmount)}`}
                  </Button>
                </form>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Price Breakdown</h2>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b">
                    <span>Room Rate ({nights} nights)</span>
                    <span className="font-bold">{formatPrice(parsePrice(hotelData.price) * nights)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span>Taxes (18% GST)</span>
                    <span className="font-bold">{formatPrice((parsePrice(hotelData.price) * nights) * 0.18)}</span>
                  </div>
                  <div className="flex justify-between py-2 pt-4">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-xl text-[#E53C42]">{formatPrice(totalHotelCost)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Amount Modal */}
        <Dialog open={showCustomAmountModal} onOpenChange={setShowCustomAmountModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Enter Payment Amount</DialogTitle>
              <DialogDescription>Enter any amount from ₹1 to {formatPrice(totalHotelCost)}</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Input type="number" value={customPaymentAmount}
                onChange={(e) => handleCustomAmountChange(e.target.value)}
                placeholder={`Max: ${formatPrice(totalHotelCost)}`}
                min="1" max={totalHotelCost} />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCustomAmountModal(false)}>Cancel</Button>
              <Button onClick={handleConfirmCustomAmount}>Confirm Amount</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPageHotels;