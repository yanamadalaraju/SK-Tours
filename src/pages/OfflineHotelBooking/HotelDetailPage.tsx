import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Hotel,
  MapPin,
  Star,
  Wifi,
  Coffee,
  Utensils,
  Car,
  Dumbbell,
  Wind,
  Waves,
  Check,
  Calendar,
  Users,
  ArrowLeft,
  ThumbsUp,
  Award,
  CreditCard,
  Home,
  Sparkles,
  Bath,
  Tv,
  Thermometer,
  ShieldCheck,
  Gift,
  Ticket,
  Clock8,
  Map,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { format } from "date-fns";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BASE_URL } from "@/ApiUrls";

interface HotelDetail {
  id: number;
  hotel_name: string;
  hotel_location: string;
  location?: string;
  address?: string;
  rating: number | string;
  total_ratings: number;
  star_rating: number;
  price: string | number;
  original_price?: string | number;
  sale_price?: string | number;
  taxes?: string | number;
  amenities?: string | string[];
  main_image?: string;
  additional_images?: string[];
  overview_description?: string;
  hotel_facilities_description?: string;
  airport_transfers_description?: string;
  meal_plan_description?: string;
  taxes_description?: string;
  free_stay_for_kids?: boolean | number;
  limited_time_sale?: boolean | number;
  login_to_book?: boolean | number;
  pay_later?: boolean | number;
  status?: string;
  city?: string;
  check_in_date?: string;
  check_out_date?: string;
  rooms?: number;
  adults?: number;
  children?: number;
  pets?: boolean | number;
}

interface TravellerCount {
  rooms: number;
  adults: number;
  children: number;
  infants?: number;
}

interface RoomType {
  id: string;
  name: string;
  size: string;
  beds: string;
  occupancy: string;
  price: string | number;
  amenities: string[];
  images: string[];
  description: string;
}

const HotelDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hotel, setHotel] = useState<HotelDetail | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string>("standard");
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<string, number>>({
    standard: 0,
    deluxe: 0,
    luxury: 0
  });

  // Travellers from search or default
  const [travellers, setTravellers] = useState<TravellerCount>({
    rooms: 1,
    adults: 2,
    children: 0,
    infants: 0
  });

  // Dates from search or default
  const [checkIn, setCheckIn] = useState<Date>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d;
  });
  const [checkOut, setCheckOut] = useState<Date>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d;
  });

  useEffect(() => {
    const hotelData = location.state?.hotel || localStorage.getItem('selectedHotel');
    if (hotelData) {
      const parsedHotel = typeof hotelData === 'string' ? JSON.parse(hotelData) : hotelData;
      setHotel(parsedHotel);
      setSelectedImage(parsedHotel.main_image || "");
      
      if (parsedHotel.rooms) setTravellers(prev => ({ ...prev, rooms: parsedHotel.rooms }));
      if (parsedHotel.adults) setTravellers(prev => ({ ...prev, adults: parsedHotel.adults }));
      if (parsedHotel.children) setTravellers(prev => ({ ...prev, children: parsedHotel.children }));
      if (parsedHotel.checkIn) setCheckIn(new Date(parsedHotel.checkIn));
      if (parsedHotel.checkOut) setCheckOut(new Date(parsedHotel.checkOut));
    }
    setLoading(false);
  }, [location]);

  const getImageUrl = (imagePath: string | undefined) => {
    if (!imagePath || imageError) return null;
    if (imagePath.startsWith('http')) return imagePath;
    const baseUrl = BASE_URL.replace('/api', '');
    return `${baseUrl}${imagePath}`;
  };

  const formatPrice = (price: string | number | undefined) => {
    if (!price) return '0';
    return Number(price).toLocaleString('en-IN');
  };

  const calculateTotalPrice = () => {
    if (!hotel) return 0;
    return Number(hotel.price);
  };

  const handleBookNow = () => {
    if (!hotel) return;
    const hotelForCheckout = {
      ...hotel,
      checkIn: checkIn,
      checkOut: checkOut,
      rooms: travellers.rooms,
      adults: travellers.adults,
      children: travellers.children,
      selectedRoom: selectedRoom,
      total_price_value: Number(hotel.price)
    };
    localStorage.setItem('selectedHotel', JSON.stringify(hotelForCheckout));
    navigate('/checkout-hotels', { state: { hotel: hotelForCheckout } });
  };

  const nextImage = (roomId: string, imagesLength: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [roomId]: (prev[roomId] + 1) % imagesLength
    }));
  };

  const prevImage = (roomId: string, imagesLength: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [roomId]: (prev[roomId] - 1 + imagesLength) % imagesLength
    }));
  };

  const amenitiesList = [
    { icon: <Wifi size={20} />, name: "Free Wi-Fi", available: true },
    { icon: <Coffee size={20} />, name: "Breakfast", available: true },
    { icon: <Utensils size={20} />, name: "Restaurant", available: true },
    { icon: <Car size={20} />, name: "Parking", available: true },
    { icon: <Dumbbell size={20} />, name: "Gym", available: true },
    { icon: <Waves size={20} />, name: "Swimming Pool", available: true },
    { icon: <Wind size={20} />, name: "Air Conditioning", available: true },
    { icon: <Bath size={20} />, name: "Spa", available: hotel?.star_rating >= 4 },
    { icon: <Tv size={20} />, name: "Flat Screen TV", available: true },
    { icon: <Thermometer size={20} />, name: "Room Heating", available: true },
    { icon: <ShieldCheck size={20} />, name: "24/7 Security", available: true }
  ];

  // Room types with multiple images
  const roomTypes: RoomType[] = [
    { 
      id: "standard", 
      name: "Standard Room", 
      size: "25 m²", 
      beds: "1 Double Bed", 
      occupancy: "2 Adults", 
      price: hotel?.price || 0, 
      amenities: ["City View", "Free Wi-Fi", "Air Conditioning", "Work Desk", "LED TV"],
      images: [
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      description: "Comfortable standard room with modern amenities and city views. Perfect for business travelers and couples."
    },
    { 
      id: "deluxe", 
      name: "Deluxe Room", 
      size: "35 m²", 
      beds: "1 King Bed", 
      occupancy: "2 Adults + 1 Child", 
      price: Number(hotel?.price || 0) * 1.5, 
      amenities: ["Pool View", "Free Wi-Fi", "Mini Bar", "Bathtub", "Coffee Machine", "King Size Bed"],
      images: [
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1631049035182-249067d7618b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      description: "Spacious deluxe room with pool view and premium amenities. Includes complimentary breakfast and mini bar."
    },
    { 
      id: "luxury", 
      name: "Luxury Suite", 
      size: "50 m²", 
      beds: "1 King Bed + Sofa", 
      occupancy: "3 Adults", 
      price: Number(hotel?.price || 0) * 2.2, 
      amenities: ["Ocean View", "Living Area", "Complimentary Breakfast", "Butler Service", "Jacuzzi", "Private Balcony"],
      images: [
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1617098759320-4e296d6dd8b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1631049035182-249067d7618b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      description: "Luxurious suite with ocean view, separate living area and dedicated butler service. The ultimate luxury experience."
    }
  ];

  const reviews = [
    { name: "Rajesh Kumar", rating: 5, date: "December 2024", comment: "Excellent stay! Great service and amazing location. The staff was very helpful.", avatar: "RK" },
    { name: "Priya Sharma", rating: 4.5, date: "November 2024", comment: "Beautiful property with great amenities. The food was delicious.", avatar: "PS" },
    { name: "Amit Patel", rating: 5, date: "October 2024", comment: "One of the best hotels I've stayed at. Highly recommended!", avatar: "AP" },
    { name: "Neha Gupta", rating: 4, date: "September 2024", comment: "Great value for money. Clean rooms and friendly staff.", avatar: "NG" }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading hotel details...</p>
        </div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Hotel className="w-20 h-20 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Hotel Not Found</h2>
          <p className="text-gray-600 mb-6">The hotel you're looking for doesn't exist or has been removed.</p>
          <button onClick={() => navigate('/hotels')} className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-lg">
            Back to Hotels
          </button>
        </div>
      </div>
    );
  }

  const mainImageUrl = getImageUrl(hotel.main_image);
  const additionalImages = hotel.additional_images?.map(img => getImageUrl(img)).filter(Boolean) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section with Image Gallery */}
      <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="relative z-20 pt-28 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Search</span>
            </button>
            
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h1 className="text-4xl md:text-5xl font-bold mb-3">{hotel.hotel_name}</h1>
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < hotel.star_rating ? "fill-yellow-400 text-yellow-400" : "text-gray-500"}`} />
                    ))}
                    <span className="ml-2 text-white/80">{hotel.star_rating} Star Hotel</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={18} />
                    <span className="text-white/80">{hotel.hotel_location}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-green-500 rounded-lg px-3 py-1.5">
                    <span className="font-bold text-lg">{Number(hotel.rating || 4.5).toFixed(1)}</span>
                    <span className="text-sm">/5</span>
                  </div>
                  <div>
                    <p className="font-semibold">Very Good</p>
                    <p className="text-sm text-white/70">{hotel.total_ratings?.toLocaleString() || 500}+ Ratings</p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Award className="w-5 h-5 text-yellow-400" />
                    <span className="text-sm">Certified Partner</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <div className="text-center">
                  <div className="text-3xl font-bold">₹{formatPrice(hotel.price)}</div>
                  <div className="text-sm text-white/70">per night</div>
                  {hotel.original_price && Number(hotel.original_price) > Number(hotel.price) && (
                    <div className="mt-1">
                      <span className="text-sm line-through text-white/50">₹{formatPrice(hotel.original_price)}</span>
                      <span className="ml-2 text-green-400 text-sm">Save {Math.round((1 - Number(hotel.price)/Number(hotel.original_price)) * 100)}%</span>
                    </div>
                  )}
                  <button 
                    onClick={handleBookNow}
                    className="w-full mt-4 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-lg transition-all"
                  >
                    Book Now
                  </button>
                  <p className="text-xs text-white/60 mt-2">Free cancellation • No prepayment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="relative h-96">
                {mainImageUrl ? (
                  <img src={mainImageUrl} alt={hotel.hotel_name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                    <Hotel className="w-24 h-24 text-white/50" />
                  </div>
                )}
              </div>
              {additionalImages.length > 0 && (
                <div className="grid grid-cols-4 gap-2 p-2">
                  {additionalImages.slice(0, 4).map((img, idx) => (
                    <img key={idx} src={img || ''} alt={`Gallery ${idx + 1}`} className="h-24 w-full object-cover rounded cursor-pointer hover:opacity-80 transition" />
                  ))}
                </div>
              )}
            </div>

            {/* Overview */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Home size={24} className="text-orange-600" />
                Overview
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {showFullDescription || !hotel.overview_description || hotel.overview_description.length <= 300
                  ? hotel.overview_description || "Experience luxury and comfort at this premium hotel. Perfect for business and leisure travelers."
                  : `${hotel.overview_description.substring(0, 300)}...`}
              </p>
              {hotel.overview_description && hotel.overview_description.length > 300 && (
                <button onClick={() => setShowFullDescription(!showFullDescription)} className="text-orange-600 font-medium mt-2">
                  {showFullDescription ? "Show Less" : "Read More"}
                </button>
              )}
            </div>

            {/* Key Amenities */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Sparkles size={24} className="text-orange-600" />
                Popular Amenities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {amenitiesList.filter(a => a.available).map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="text-orange-600">{amenity.icon}</div>
                    <span className="text-gray-700">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Room Types with Multiple Images */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Hotel size={24} className="text-orange-600" />
                Room Types
              </h2>
              <div className="space-y-6">
                {roomTypes.map((room) => (
                  <div 
                    key={room.id} 
                    className={`border rounded-xl overflow-hidden cursor-pointer transition-all ${
                      selectedRoom === room.id ? "border-orange-600 bg-orange-50 shadow-md" : "border-gray-200 hover:border-orange-300 hover:shadow-sm"
                    }`} 
                    onClick={() => setSelectedRoom(room.id)}
                  >
                    <div className="flex flex-col">
                      {/* Room Image Carousel */}
                      <div className="relative bg-gray-900">
                        <div className="relative h-64 md:h-80">
                          <img 
                            src={room.images[currentImageIndex[room.id]]} 
                            alt={`${room.name} - Image ${currentImageIndex[room.id] + 1}`}
                            className="w-full h-full object-cover"
                          />
                          {/* Image Navigation Arrows */}
                          {room.images.length > 1 && (
                            <>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  prevImage(room.id, room.images.length);
                                }}
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                              >
                                <ChevronLeft size={20} />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  nextImage(room.id, room.images.length);
                                }}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                              >
                                <ChevronRight size={20} />
                              </button>
                            </>
                          )}
                          {/* Image Counter */}
                          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                            {currentImageIndex[room.id] + 1} / {room.images.length}
                          </div>
                          {selectedRoom === room.id && (
                            <div className="absolute top-2 right-2 bg-orange-600 text-white rounded-full p-1">
                              <Check size={16} />
                            </div>
                          )}
                        </div>
                        
                        {/* Thumbnail Gallery */}
                        {room.images.length > 1 && (
                          <div className="flex gap-2 p-2 bg-gray-100 overflow-x-auto">
                            {room.images.map((img, idx) => (
                              <div
                                key={idx}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCurrentImageIndex(prev => ({ ...prev, [room.id]: idx }));
                                }}
                                className={`flex-shrink-0 w-16 h-16 rounded cursor-pointer transition-all ${
                                  currentImageIndex[room.id] === idx 
                                    ? "ring-2 ring-orange-600 opacity-100" 
                                    : "opacity-70 hover:opacity-100"
                                }`}
                              >
                                <img 
                                  src={img} 
                                  alt={`${room.name} thumbnail ${idx + 1}`}
                                  className="w-full h-full object-cover rounded"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      {/* Room Details */}
                      <div className="p-5">
                        <div className="flex flex-wrap justify-between items-start gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-xl font-bold">{room.name}</h3>
                              {room.id === "luxury" && <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Best Value</span>}
                              {room.id === "deluxe" && <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Popular</span>}
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{room.description}</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-600 mb-3">
                              <span>📏 {room.size}</span>
                              <span>🛏️ {room.beds}</span>
                              <span>👥 {room.occupancy}</span>
                              <span className="text-orange-600 font-semibold">₹{formatPrice(room.price)}/night</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {room.amenities.map((amenity, idx) => (
                                <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">✓ {amenity}</span>
                              ))}
                            </div>
                          </div>
                          <button 
                            className={`px-6 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                              selectedRoom === room.id 
                                ? "bg-orange-600 text-white" 
                                : "bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-600"
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedRoom(room.id);
                            }}
                          >
                            {selectedRoom === room.id ? "Selected" : "Select Room"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Facilities Details */}
            {hotel.hotel_facilities_description && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Dumbbell size={24} className="text-orange-600" />
                  Hotel Facilities
                </h2>
                <div className="text-gray-700 leading-relaxed">{hotel.hotel_facilities_description}</div>
              </div>
            )}

            {/* Meal Plan */}
            {hotel.meal_plan_description && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Utensils size={24} className="text-orange-600" />
                  Meal Plan
                </h2>
                <div className="text-gray-700 leading-relaxed">{hotel.meal_plan_description}</div>
              </div>
            )}

            {/* Reviews */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <ThumbsUp size={24} className="text-orange-600" />
                Guest Reviews
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {reviews.map((review, idx) => (
                  <div key={idx} className="border-b pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
                        {review.avatar}
                      </div>
                      <div>
                        <p className="font-semibold">{review.name}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-3 h-3 ${i < Math.floor(review.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Map */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Map size={24} className="text-orange-600" />
                Location & Nearby
              </h2>
              <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={32} className="text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">{hotel.hotel_location}</p>
                  <p className="text-sm text-gray-500 mt-1">Interactive map would be displayed here</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Sidebar */}
          <div className="space-y-6">
            {/* Price Summary - Updated without taxes */}
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-4">Your Booking Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Room Price (per night)</span>
                  <span className="font-semibold">₹{formatPrice(hotel.price)}</span>
                </div>
                {hotel.free_stay_for_kids && (
                  <div className="flex justify-between text-green-600">
                    <span>Kids Stay Free</span>
                    <span>✓</span>
                  </div>
                )}
                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl font-bold text-orange-600">
                    <span>Total per night</span>
                    <span>₹{formatPrice(calculateTotalPrice())}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">All taxes included</p>
                </div>
              </div>

              {/* Selected Room Display */}
              <div className="mb-6 p-3 bg-orange-50 rounded-lg">
                <p className="text-sm text-gray-600">Selected Room</p>
                <p className="font-semibold text-orange-600 text-lg">
                  {roomTypes.find(r => r.id === selectedRoom)?.name || "Standard Room"}
                </p>
              </div>

              {/* Date Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Check-in Date</label>
                <div className="border rounded-lg p-3 flex items-center gap-2 bg-gray-50">
                  <Calendar size={18} className="text-gray-500" />
                  <span className="font-medium">{format(checkIn, "dd MMM yyyy")}</span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Check-out Date</label>
                <div className="border rounded-lg p-3 flex items-center gap-2 bg-gray-50">
                  <Calendar size={18} className="text-gray-500" />
                  <span className="font-medium">{format(checkOut, "dd MMM yyyy")}</span>
                </div>
              </div>

              {/* Guest Details */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Guests</label>
                <div className="border rounded-lg p-3 flex items-center gap-2 bg-gray-50">
                  <Users size={18} className="text-gray-500" />
                  <span>{travellers.rooms} Room, {travellers.adults} Adult{travellers.adults > 1 ? 's' : ''}{travellers.children > 0 ? `, ${travellers.children} Child` : ''}</span>
                </div>
              </div>

              {/* Cancellation Policy */}
              <div className="mb-6 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck size={18} className="text-green-600" />
                  <span className="font-semibold text-green-800">Free Cancellation</span>
                </div>
                <p className="text-sm text-green-700">Cancel before {format(new Date(checkIn.getTime() - 7 * 24 * 60 * 60 * 1000), "dd MMM yyyy")} for full refund</p>
              </div>

              {/* Payment Options */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <CreditCard size={18} />
                  Payment Options
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Check size={16} className="text-green-600" />
                    <span>Pay at Hotel</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Check size={16} className="text-green-600" />
                    <span>Credit/Debit Card</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Check size={16} className="text-green-600" />
                    <span>UPI / Net Banking</span>
                  </div>
                </div>
              </div>

              {/* Book Button */}
              <button 
                onClick={handleBookNow}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-lg transition-all text-lg"
              >
                Book Now
              </button>
              
              <p className="text-xs text-center text-gray-500 mt-4">
                By proceeding, you agree to our Terms & Conditions and Privacy Policy
              </p>
            </div>

            {/* Why Book With Us */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h4 className="font-bold mb-3">Why book with us?</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Gift size={16} className="text-orange-600" />
                  <span>Best price guarantee</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Ticket size={16} className="text-orange-600" />
                  <span>No booking fees</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock8 size={16} className="text-orange-600" />
                  <span>24/7 customer support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HotelDetailPage;