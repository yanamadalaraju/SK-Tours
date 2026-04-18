import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  ShieldCheck,
  Gift,
  Ticket,
  Clock8,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { format } from "date-fns";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BASE_URL } from "@/ApiUrls";
import axios from "axios";
import { FaRegIdBadge } from "react-icons/fa";

interface HotelDetail {
  id: number;
  country: string;
  city: string;
  location: string | null;
  property_name: string;
  check_in_date: string;
  check_out_date: string;
  rooms: number;
  adults: number;
  children: number;
  pets: number;
  children_ages: number[];
  hotel_name: string;
  hotel_location: string;
  star_rating: number;
  main_image: string;
  additional_images: string[];
  rating: string;
  total_ratings: number;
  price: string;
  taxes: string;
  total_amount: string;
  price_per_child: string;
  amenities: string[];
  custom_amenities: string[];
  status: string;
  free_stay_for_kids: number;
  limited_time_sale: number;
  sale_price: string;
  original_price: string;
  login_to_book: number;
  pay_later: number;
  overview_description: string;
  hotel_facilities_description: string;
  airport_transfers_description: string;
  meal_plan_description: string;
  taxes_description: string;
  created_at: string;
  updated_at: string;
  room_types_data: {
    standard?: {
      enabled: boolean;
      hotels: RoomVariant[];
    };
    deluxe?: {
      enabled: boolean;
      hotels: RoomVariant[];
    };
    luxury?: {
      enabled: boolean;
      hotels: RoomVariant[];
    };
  };
  searchLocality: string;
}

interface RoomVariant {
  id: number;
  roomType: string;
  price: string;
  pricePerChild?: string | null;
  amenities: string[];
  maxOccupancy: number;
  bedType: string;
  roomSize: string;
  availableRooms: number;
  description: string;
  images: string[];
}

interface TravellerCount {
  rooms: number;
  adults: number;
  children: number;
  infants?: number;
}

interface RoomTypeDisplay {
  id: string;
  name: string;
  variants: RoomVariant[];
  enabled: boolean;
}

const HotelDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [hotel, setHotel] = useState<HotelDetail | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState<string>("standard");
  const [selectedRoomVariant, setSelectedRoomVariant] = useState<RoomVariant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [imageError, setImageError] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<string, number>>({});

  // Travellers from search or default - USE API DATA
  const [travellers, setTravellers] = useState<TravellerCount>({
    rooms: 1,
    adults: 2,
    children: 0,
    infants: 0
  });

  // Dates from API or default
  const [checkIn, setCheckIn] = useState<Date>(new Date());
  const [checkOut, setCheckOut] = useState<Date>(new Date());

  useEffect(() => {
    fetchHotelDetails();
  }, [id]);

  const fetchHotelDetails = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${BASE_URL}/api/offline-hotels/${id}`);
      if (response.data.success) {
        const hotelData = response.data.data;
        setHotel(hotelData);
        setSelectedImage(hotelData.main_image || "");
        
        // Set travellers from API data
        setTravellers({
          rooms: hotelData.rooms || 1,
          adults: hotelData.adults || 2,
          children: hotelData.children || 0,
          infants: 0
        });
        
        // Set dates from API data
        if (hotelData.check_in_date) {
          setCheckIn(new Date(hotelData.check_in_date));
        }
        if (hotelData.check_out_date) {
          setCheckOut(new Date(hotelData.check_out_date));
        }
        
        // Set default selected room variant
        if (hotelData.room_types_data?.standard?.enabled && hotelData.room_types_data.standard.hotels.length > 0) {
          setSelectedRoomType("standard");
          setSelectedRoomVariant(hotelData.room_types_data.standard.hotels[0]);
        } else if (hotelData.room_types_data?.deluxe?.enabled && hotelData.room_types_data.deluxe.hotels.length > 0) {
          setSelectedRoomType("deluxe");
          setSelectedRoomVariant(hotelData.room_types_data.deluxe.hotels[0]);
        } else if (hotelData.room_types_data?.luxury?.enabled && hotelData.room_types_data.luxury.hotels.length > 0) {
          setSelectedRoomType("luxury");
          setSelectedRoomVariant(hotelData.room_types_data.luxury.hotels[0]);
        }
      } else {
        setError("Failed to fetch hotel details");
      }
    } catch (err) {
      console.error("Error fetching hotel details:", err);
      setError("Error fetching hotel details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 1;
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 1;
  };

  const calculateTotalPrice = () => {
    if (!hotel || !selectedRoomVariant) return 0;
    
    const nights = calculateNights();
    const roomPrice = Number(selectedRoomVariant.price);
    const totalRoomPrice = roomPrice * nights;
    
    // Calculate children price
    const childPrice = selectedRoomVariant.pricePerChild 
      ? Number(selectedRoomVariant.pricePerChild) 
      : Number(hotel.price_per_child || 0);
    const childrenCount = hotel.children || 0;
    const totalChildrenPrice = childPrice * childrenCount;
    
    const taxes = Number(hotel.taxes || 0);
    
    return totalRoomPrice + totalChildrenPrice + taxes;
  };

  const handleBookNow = () => {
    if (!hotel || !selectedRoomVariant) return;
    
    const nights = calculateNights();
    const roomPrice = Number(selectedRoomVariant.price);
    const childPrice = selectedRoomVariant.pricePerChild 
      ? Number(selectedRoomVariant.pricePerChild) 
      : Number(hotel.price_per_child || 0);
    const childrenCount = hotel.children || 0;
    const totalChildrenPrice = childPrice * childrenCount;
    const totalRoomPrice = roomPrice * nights;
    const taxes = Number(hotel.taxes || 0);
    const totalPrice = totalRoomPrice + totalChildrenPrice + taxes;
    
    const hotelForCheckout = {
      ...hotel,
      checkIn: checkIn,
      checkOut: checkOut,
      rooms: hotel.rooms || 1,
      adults: hotel.adults || 2,
      children: hotel.children || 0,
      children_ages: hotel.children_ages || [],
      selectedRoom: selectedRoomVariant,
      selectedRoomCategory: selectedRoomType,
      nights: nights,
      roomPrice: roomPrice,
      childPrice: childPrice,
      totalChildrenPrice: totalChildrenPrice,
      total_price_value: totalPrice,
      basePrice: roomPrice,
      taxes: taxes,
      total_amount: totalPrice
    };
    
    localStorage.setItem('selectedHotel', JSON.stringify(hotelForCheckout));
    navigate('/checkout-hotels', { state: { hotel: hotelForCheckout } });
  };

  const nextImage = (roomId: string, imagesLength: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [roomId]: ((prev[roomId] || 0) + 1) % imagesLength
    }));
  };

  const prevImage = (roomId: string, imagesLength: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [roomId]: ((prev[roomId] || 0) - 1 + imagesLength) % imagesLength
    }));
  };

  // Get room types that are enabled
  const getEnabledRoomTypes = (): RoomTypeDisplay[] => {
    if (!hotel?.room_types_data) return [];
    
    const types: RoomTypeDisplay[] = [];
    if (hotel.room_types_data.standard?.enabled) {
      types.push({
        id: "standard",
        name: "Standard Room",
        variants: hotel.room_types_data.standard.hotels,
        enabled: true
      });
    }
    if (hotel.room_types_data.deluxe?.enabled) {
      types.push({
        id: "deluxe",
        name: "Deluxe Room",
        variants: hotel.room_types_data.deluxe.hotels,
        enabled: true
      });
    }
    if (hotel.room_types_data.luxury?.enabled) {
      types.push({
        id: "luxury",
        name: "Luxury Suite",
        variants: hotel.room_types_data.luxury.hotels,
        enabled: true
      });
    }
    return types;
  };

  const handleRoomTypeSelect = (typeId: string, variant: RoomVariant) => {
    setSelectedRoomType(typeId);
    setSelectedRoomVariant(variant);
  };

  const amenitiesList = [
    { icon: <Wifi size={20} />, name: "Free Wi-Fi", available: hotel?.amenities?.includes("Free WiFi") },
    { icon: <Coffee size={20} />, name: "Breakfast", available: hotel?.meal_plan_description?.includes("Breakfast") },
    { icon: <Utensils size={20} />, name: "Restaurant", available: true },
    { icon: <Car size={20} />, name: "Parking", available: true },
    { icon: <Dumbbell size={20} />, name: "Gym", available: hotel?.hotel_facilities_description?.includes("Gym") },
    { icon: <Waves size={20} />, name: "Swimming Pool", available: hotel?.hotel_facilities_description?.includes("Pool") },
    { icon: <Wind size={20} />, name: "Air Conditioning", available: hotel?.amenities?.includes("Air Conditioning") },
    { icon: <Bath size={20} />, name: "Spa", available: hotel?.star_rating >= 4 },
    { icon: <Tv size={20} />, name: "Flat Screen TV", available: hotel?.amenities?.includes("TV") },
    { icon: <FaRegIdBadge size={20} />, name: "Mini Bar", available: hotel?.amenities?.includes("Mini Bar") || hotel?.amenities?.includes("Mini Fridge") },
    { icon: <ShieldCheck size={20} />, name: "24/7 Security", available: true }
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

  if (error || !hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Hotel className="w-20 h-20 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Hotel Not Found</h2>
          <p className="text-gray-600 mb-6">{error || "The hotel you're looking for doesn't exist or has been removed."}</p>
          <button onClick={() => navigate('/hotels')} className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-lg">
            Back to Hotels
          </button>
        </div>
      </div>
    );
  }

  const mainImageUrl = getImageUrl(hotel.main_image);
  const additionalImages = hotel.additional_images?.map(img => getImageUrl(img)).filter(Boolean) || [];
  const enabledRoomTypes = getEnabledRoomTypes();
  const nights = calculateNights();
  const totalPrice = calculateTotalPrice();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
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
                    <span className="text-white/80">{hotel.hotel_location}, {hotel.city}</span>
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
                  <div className="text-3xl font-bold">₹{formatPrice(totalPrice)}</div>
                  <div className="text-sm text-white/70">for {nights} night{nights > 1 ? 's' : ''}</div>
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

            {/* Room Types Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Hotel size={24} className="text-orange-600" />
                Available Room Types
              </h2>
              
              {enabledRoomTypes.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No room types available at the moment.</p>
              ) : (
                <div className="space-y-6">
                  {enabledRoomTypes.map((roomType) => (
                    <div key={roomType.id} className="space-y-3">
                      <h3 className="text-xl font-semibold text-gray-800">{roomType.name}</h3>
                      <div className="grid grid-cols-1 gap-4">
                        {roomType.variants.map((variant, idx) => (
                          <div
                            key={variant.id}
                            className={`border rounded-xl overflow-hidden cursor-pointer transition-all ${
                              selectedRoomType === roomType.id && selectedRoomVariant?.id === variant.id
                                ? "border-orange-600 bg-orange-50 shadow-md"
                                : "border-gray-200 hover:border-orange-300 hover:shadow-sm"
                            }`}
                            onClick={() => handleRoomTypeSelect(roomType.id, variant)}
                          >
                            <div className="flex flex-col md:flex-row">
                              {/* Room Image Carousel */}
                              {variant.images && variant.images.length > 0 && (
                                <div className="md:w-64 relative bg-gray-900">
                                  <div className="relative h-48 md:h-full">
                                    <img
                                      src={getImageUrl(variant.images[currentImageIndex[`${roomType.id}-${variant.id}`] || 0]) || variant.images[0]}
                                      alt={variant.roomType}
                                      className="w-full h-full object-cover"
                                    />
                                    {variant.images.length > 1 && (
                                      <>
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            nextImage(`${roomType.id}-${variant.id}`, variant.images.length);
                                          }}
                                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full transition-all"
                                        >
                                          <ChevronRight size={16} />
                                        </button>
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            prevImage(`${roomType.id}-${variant.id}`, variant.images.length);
                                          }}
                                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full transition-all"
                                        >
                                          <ChevronLeft size={16} />
                                        </button>
                                      </>
                                    )}
                                  </div>
                                  {/* Thumbnails */}
                                  {variant.images.length > 1 && (
                                    <div className="flex gap-1 p-1 bg-gray-100 overflow-x-auto">
                                      {variant.images.slice(0, 4).map((img, imgIdx) => (
                                        <div
                                          key={imgIdx}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setCurrentImageIndex(prev => ({
                                              ...prev,
                                              [`${roomType.id}-${variant.id}`]: imgIdx
                                            }));
                                          }}
                                          className={`flex-shrink-0 w-12 h-12 rounded cursor-pointer ${
                                            currentImageIndex[`${roomType.id}-${variant.id}`] === imgIdx
                                              ? "ring-2 ring-orange-600"
                                              : "opacity-70"
                                          }`}
                                        >
                                          <img
                                            src={getImageUrl(img) || img}
                                            alt={`Thumbnail ${imgIdx + 1}`}
                                            className="w-full h-full object-cover rounded"
                                          />
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              )}
                              
                              {/* Room Details */}
                              <div className="flex-1 p-5">
                                <div className="flex flex-wrap justify-between items-start gap-4">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                                      <h3 className="text-lg font-bold">{variant.roomType}</h3>
                                      {variant.availableRooms > 0 && (
                                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                                          {variant.availableRooms} rooms left
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-sm text-gray-600 mb-3">{variant.description}</p>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-600 mb-3">
                                      <span>📏 {variant.roomSize} sq.ft</span>
                                      <span>🛏️ {variant.bedType}</span>
                                      <span>👥 Max {variant.maxOccupancy} Guests</span>
                                      <span className="text-orange-600 font-semibold">₹{formatPrice(variant.price)}/night</span>
                                    </div>
                                    {/* Show child price if available */}
                                    {(variant.pricePerChild || hotel.price_per_child) && hotel.children > 0 && (
                                      <div className="text-sm text-gray-600 mb-3">
                                        <span>👶 Child price: ₹{formatPrice(variant.pricePerChild || hotel.price_per_child)} per child</span>
                                      </div>
                                    )}
                                    <div className="flex flex-wrap gap-2">
                                      {variant.amenities?.slice(0, 4).map((amenity, amenityIdx) => (
                                        <span key={amenityIdx} className="text-xs bg-gray-100 px-2 py-1 rounded">✓ {amenity}</span>
                                      ))}
                                      {variant.amenities && variant.amenities.length > 4 && (
                                        <span className="text-xs text-gray-500">+{variant.amenities.length - 4} more</span>
                                      )}
                                    </div>
                                  </div>
                                  <button
                                    className={`px-6 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                                      selectedRoomType === roomType.id && selectedRoomVariant?.id === variant.id
                                        ? "bg-orange-600 text-white"
                                        : "bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-600"
                                    }`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRoomTypeSelect(roomType.id, variant);
                                    }}
                                  >
                                    {selectedRoomType === roomType.id && selectedRoomVariant?.id === variant.id ? "Selected" : "Select"}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Hotel Facilities */}
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

            {/* Airport Transfer */}
            {hotel.airport_transfers_description && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Car size={24} className="text-orange-600" />
                  Airport Transfer
                </h2>
                <div className="text-gray-700 leading-relaxed">{hotel.airport_transfers_description}</div>
              </div>
            )}

            {/* Reviews */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <ThumbsUp size={24} className="text-orange-600" />
                Guest Reviews
              </h2>
              <div className="flex items-center gap-4 mb-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-600">{Number(hotel.rating || 4.5).toFixed(1)}</div>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(Number(hotel.rating)) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{hotel.total_ratings} Reviews</p>
                </div>
                <div className="flex-1">
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star} className="flex items-center gap-2">
                        <span className="text-sm w-8">{star} ★</span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-orange-500 rounded-full" style={{ width: `${Math.random() * 100}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Sidebar */}
          <div className="space-y-6">
            {/* Price Summary */}
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-4">Your Booking Summary</h3>
              
              {selectedRoomVariant && (
                <div className="mb-4 p-3 bg-orange-50 rounded-lg">
                  <p className="text-sm text-gray-600">Selected Room</p>
                  <p className="font-semibold text-orange-600">{selectedRoomVariant.roomType}</p>
                  <p className="text-xs text-gray-500 mt-1">Max {selectedRoomVariant.maxOccupancy} guests • {selectedRoomVariant.bedType}</p>
                </div>
              )}
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Room Price ({nights} night{nights > 1 ? 's' : ''})</span>
                  <span className="font-semibold">₹{formatPrice((Number(selectedRoomVariant?.price || hotel.price) * nights))}</span>
                </div>
                
                {/* Children Charges */}
                {hotel.children > 0 && (
                  <div className="flex justify-between text-gray-700">
                    <span>Children ({hotel.children} child{hotel.children > 1 ? 'ren' : ''})</span>
                    <span className="font-semibold">
                      ₹{formatPrice(Number(selectedRoomVariant?.pricePerChild || hotel.price_per_child || 0) * hotel.children)}
                    </span>
                  </div>
                )}
                
                <div className="flex justify-between text-gray-700">
                  <span>Taxes & Fees</span>
                  <span className="font-semibold">₹{formatPrice(hotel.taxes || 0)}</span>
                </div>
                
                {hotel.free_stay_for_kids === 1 && (
                  <div className="flex justify-between text-green-600">
                    <span>Kids Stay Free</span>
                    <span>✓</span>
                  </div>
                )}
                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl font-bold text-orange-600">
                    <span>Total Amount</span>
                    <span>₹{formatPrice(totalPrice)}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">All taxes included</p>
                </div>
              </div>

              {/* Date Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Check-in Date</label>
                <div className="border rounded-lg p-3 flex items-center gap-2 bg-gray-50">
                  <Calendar size={18} className="text-gray-500" />
                  <span className="font-medium">{format(checkIn, "dd MMM yyyy")}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Check-in: 2:00 PM</p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Check-out Date</label>
                <div className="border rounded-lg p-3 flex items-center gap-2 bg-gray-50">
                  <Calendar size={18} className="text-gray-500" />
                  <span className="font-medium">{format(checkOut, "dd MMM yyyy")}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Check-out: 12:00 PM</p>
              </div>

              {/* Guest Details - FROM API */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Guests</label>
                <div className="border rounded-lg p-3 flex items-center gap-2 bg-gray-50">
                  <Users size={18} className="text-gray-500" />
                  <span>
                    {hotel.rooms} Room{hotel.rooms > 1 ? 's' : ''}, 
                    {hotel.adults} Adult{hotel.adults > 1 ? 's' : ''}
                    {hotel.children > 0 ? `, ${hotel.children} Child${hotel.children > 1 ? 'ren' : ''}` : ''}
                  </span>
                </div>
                {hotel.children_ages && hotel.children_ages.length > 0 && (
                  <p className="text-xs text-gray-500 mt-1">
                    Children ages: {hotel.children_ages.join(', ')}
                  </p>
                )}
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