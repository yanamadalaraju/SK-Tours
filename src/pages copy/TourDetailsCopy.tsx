import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ChevronRight, Check, X } from 'lucide-react';
import Header from '@/components/Header';
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { BASE_URL } from '@/ApiUrls';

// DayCard Component
interface DayCardProps {
  dayNumber: string;
  headerColor: string;
  bodyColor: string;
  dayData?: {
    title?: string;
    description?: string;
    meals?: string;
  };
}

const DayCard = ({ dayNumber, headerColor, bodyColor, dayData }: DayCardProps) => {
  const [meals, setMeals] = useState({ B: false, L: false, D: false });

  // Parse meals from dayData
  useEffect(() => {
    if (dayData?.meals) {
      const mealsStr = dayData.meals.toLowerCase();
      setMeals({
        B: mealsStr.includes('breakfast'),
        L: mealsStr.includes('lunch'),
        D: mealsStr.includes('dinner')
      });
    }
  }, [dayData?.meals]);

  return (
    <div className="rounded-lg p-3"> 
      <div className="flex gap-2 mb-1">
        <div className={`${headerColor} text-white font-bold px-4 py-2 rounded-lg text-center min-w-[120px] border border-black`}>
          {dayNumber}
        </div>
        <div className={`${headerColor} text-white font-bold px-4 py-2 rounded-lg text-center flex-1 border border-black`}>
          {dayData?.title || "Day Details"}
        </div>
        <div className={`${headerColor} text-white border border-black rounded-lg px-4 py-2 flex items-center gap-3`}>
          <label className="flex items-center gap-1">
            <span className="text-white">B</span>
            <input
              type="checkbox"
              checked={meals.B}
              onChange={() => setMeals(prev => ({ ...prev, B: !prev.B }))}
              className="w-4 h-4"
            />
          </label>
          <label className="flex items-center gap-1">
            <span className="text-white">L</span>
            <input
              type="checkbox"
              checked={meals.L}
              onChange={() => setMeals(prev => ({ ...prev, L: !prev.L }))}
              className="w-4 h-4"
            />
          </label>
          <label className="flex items-center gap-1">
            <span className="text-white">D</span>
            <input
              type="checkbox"
              checked={meals.D}
              onChange={() => setMeals(prev => ({ ...prev, D: !prev.D }))}
              className="w-4 h-4"
            />
          </label>
        </div>
      </div>
      {/* Content Area */}
      <div className={`${bodyColor} min-h-[120px] p-4 rounded-lg border border-black`}>
        <textarea 
          className="w-full h-full min-h-[100px] bg-transparent resize-none focus:outline-none text-gray-800"
          placeholder={dayData?.description || ""}
          defaultValue={dayData?.description || ""}
          readOnly
        />
      </div>
    </div>
  );
};

const TourDetails = () => {
  const { tourId } = useParams<{ tourId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("itinerary");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Filter states
  const [showMoreIndian, setShowMoreIndian] = useState(false);
  const [showMoreWorld, setShowMoreWorld] = useState(false);
  const [durationRange, setDurationRange] = useState([5, 11]);
  const [priceRange, setPriceRange] = useState([32990, 153000]);
  const [selectedDepartureMonths, setSelectedDepartureMonths] = useState<string[]>([]);
  const [selectedIndianTours, setSelectedIndianTours] = useState<string[]>([]);
  const [selectedWorldTours, setSelectedWorldTours] = useState<string[]>([]);

  // Tour data state
  const [tour, setTour] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  // Format price with Indian Rupee symbol
  const formatPrice = (price: string | number) => {
    if (!price) return '₹0';
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return `₹${numPrice.toLocaleString('en-IN')}`;
  };

  // Calculate EMI (assuming 6 months)
  const calculateEMI = (price: string | number) => {
    if (!price) return 'EMI from ₹0/month';
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    const emiAmount = Math.round(numPrice / 6);
    return `EMI from ₹${emiAmount.toLocaleString('en-IN')}/month`;
  };

  // Generate duration string from days
  const formatDuration = (days: number) => {
    const nights = days - 1;
    return `${nights}N/${days}D`;
  };

  // Process API data into frontend format
  const processTourData = (apiData: any) => {
    const { 
      basic_details, 
      departures, 
      images, 
      inclusions, 
      exclusions, 
      itinerary, 
      costs, 
      hotels, 
      transport, 
      booking_poi, 
      cancellation_policies, 
      instructions 
    } = apiData;

    // Generate badge based on category_id
    const getBadge = (categoryId: number) => {
      switch(categoryId) {
        case 1: return "New";
        case 2: return "Premium";
        case 3: return "Luxury";
        default: return "Special";
      }
    };

    // Get cover image or first image
    const getImages = (imagesArray: any[]) => {
      if (imagesArray && imagesArray.length > 0) {
        // Sort to get cover image first
        const sortedImages = [...imagesArray].sort((a, b) => (b.is_cover - a.is_cover));
        return sortedImages.map(img => img.url);
      }
      // Fallback images
      const fallbackImages = [
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
      ];
      return fallbackImages;
    };

    // Process departure dates into months
    const processDepartureDates = (departuresArray: any[]) => {
      if (!departuresArray || departuresArray.length === 0) {
        // Return default departure dates if none available
        return [
          { name: 'January-2026', dates: ['10', '15', '20', '25'] },
          { name: 'February-2026', dates: ['05', '12', '19', '26'] },
          { name: 'March-2026', dates: ['05', '12', '19', '26'] }
        ];
      }
      
      const monthsMap: { [key: string]: string[] } = {};
      
      departuresArray.forEach(dep => {
        const date = new Date(dep.departure_date);
        const monthYear = `${date.toLocaleString('default', { month: 'long' })}-${date.getFullYear()}`;
        const day = date.getDate().toString().padStart(2, '0');
        
        if (!monthsMap[monthYear]) {
          monthsMap[monthYear] = [];
        }
        if (!monthsMap[monthYear].includes(day)) {
          monthsMap[monthYear].push(day);
        }
      });

      // Convert to array format
      return Object.entries(monthsMap).map(([name, dates]) => ({
        name,
        dates: dates.sort((a, b) => parseInt(a) - parseInt(b))
      }));
    };

    // Process itinerary
    const processItinerary = (itineraryArray: any[]) => {
      if (itineraryArray && itineraryArray.length > 0) {
        return itineraryArray.map((day: any, index: number) => ({
          day: `Day ${day.day || index + 1}`,
          title: day.title || `Day ${index + 1}`,
          description: day.description || '',
          meals: day.meals || ''
        }));
      }

      // Generate default itinerary
      const defaultItinerary = [];
      const days = basic_details.duration_days || 6;
      for (let i = 0; i < days; i++) {
        defaultItinerary.push({
          day: `Day ${i + 1}`,
          title: i === 0 ? "Arrival & Check-in" : 
                 i === days - 1 ? "Departure" : 
                 `Day ${i + 1} Exploration`,
          description: i === 0 ? 'Arrive at destination, transfer to hotel, and check-in' :
                      i === days - 1 ? 'Check-out from hotel and transfer to airport for departure' :
                      'Full day of exploration and activities',
          meals: ''
        });
      }
      return defaultItinerary;
    };

    // Process tour cost table
    const processTourCost = (costsArray: any[]) => {
      if (costsArray && costsArray.length > 0) {
        return costsArray.map(cost => ({
          passenger: `${cost.pax} Pax`,
          standard: cost.standard_hotel !== "0.00" ? formatPrice(cost.standard_hotel) : "NA",
          deluxe: cost.deluxe_hotel !== "0.00" ? formatPrice(cost.deluxe_hotel) : "NA",
          executive: cost.executive_hotel !== "0.00" ? formatPrice(cost.executive_hotel) : "NA",
          childWithBed: cost.child_with_bed !== "0.00" ? formatPrice(cost.child_with_bed) : "NA",
          childNoBed: cost.child_no_bed !== "0.00" ? formatPrice(cost.child_no_bed) : "NA"
        }));
      }

      // Generate default cost table
      const defaultCosts = [];
      const basePrice = parseFloat(basic_details.base_price_adult) || 15000;
      for (let pax = 2; pax <= 10; pax++) {
        const discount = (pax - 2) * 500;
        const paxPrice = Math.max(basePrice - discount, basePrice * 0.8);
        
        defaultCosts.push({
          passenger: `${pax} Pax`,
          standard: basic_details.category_id === 1 ? formatPrice(paxPrice) : "NA",
          deluxe: basic_details.category_id === 2 ? formatPrice(paxPrice) : "NA",
          executive: basic_details.category_id === 3 ? formatPrice(paxPrice * 1.2) : "NA",
          childWithBed: basic_details.category_id === 2 ? formatPrice(paxPrice * 0.9) : "NA",
          childNoBed: basic_details.category_id === 2 ? formatPrice(paxPrice * 0.85) : "NA"
        });
      }
      return defaultCosts;
    };

    // Process hotels data
    const processHotels = (hotelsArray: any[]) => {
      if (hotelsArray && hotelsArray.length > 0) {
        return hotelsArray.map(hotel => ({
          city: hotel.city,
          hotelName: hotel.hotel_name,
          roomType: hotel.room_type,
          nights: `${hotel.nights} Night${hotel.nights > 1 ? 's' : ''}`,
        }));
      }

      // Default hotel data
      return [{
        city: "Destination",
        hotelName: "Comfort Hotel",
        roomType: basic_details.category_id === 1 ? "Standard Room" : 
                  basic_details.category_id === 2 ? "Deluxe Room" : 
                  "Executive Suite",
        nights: `${basic_details.duration_days - 1} Nights`,
      }];
    };

    // Process transport data
    const processTransport = (transportArray: any[]) => {
      if (transportArray && transportArray.length > 0) {
        return transportArray.map(transport => ({
          airline: transport.carrier || transport.mode,
          flightNo: transport.number_code || '-',
          from: transport.from_city,
          to: transport.to_city,
          depDate: new Date(transport.departure_datetime).toLocaleDateString(),
          depTime: new Date(transport.departure_datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          arrDate: new Date(transport.arrival_datetime).toLocaleDateString(),
          arrTime: new Date(transport.arrival_datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          description: transport.description || ''
        }));
      }

      // Default transport data
      return [{
        airline: "Multiple Airlines",
        flightNo: "Various",
        from: "Major Cities",
        to: "Destination",
        depDate: "On Tour Date",
        depTime: "Flexible",
        arrDate: "On Tour Date",
        arrTime: "Flexible",
        description: ""
      }];
    };

    // Process cancellation policies
    const processCancellation = (policiesArray: any[]) => {
      if (policiesArray && policiesArray.length > 0) {
        return policiesArray.map(policy => 
          `${policy.days_min}-${policy.days_max} days before travel: ${policy.charge_percentage}% cancellation charge`
        );
      }

      // Default cancellation policies
      return [
        "30+ days before travel: 90% refund",
        "15-30 days before travel: 50% refund",
        "7-14 days before travel: 25% refund",
        "Less than 7 days: No refund",
        "Refund processed within 7-10 working days"
      ];
    };

    return {
      // Basic info
      title: basic_details.title,
      duration: formatDuration(basic_details.duration_days),
      price: formatPrice(basic_details.base_price_adult),
      emi: calculateEMI(basic_details.base_price_adult),
      badge: getBadge(basic_details.category_id),
      code: basic_details.tour_code,
      description: basic_details.overview,
      
      // Tab data
      images: getImages(images),
      itinerary: processItinerary(itinerary),
      departureDates: {
        months: processDepartureDates(departures)
      },
      inclusionExclusion: {
        inclusions: inclusions || [],
        exclusions: exclusions || []
      },
      hotels: processHotels(hotels),
      airlines: processTransport(transport),
      tourCost: processTourCost(costs),
      booking: booking_poi || [],
      cancellation: processCancellation(cancellation_policies),
      instructions: instructions || [],
      specialRemarks: `• All timings are approximate\n• Prices subject to change without notice\n• Availability subject to confirmation\n• ${basic_details.duration_days} days / ${basic_details.duration_days - 1} nights package`,
      
      // Raw API data for reference
      rawData: apiData
    };
  };

  // Fetch tour details
  const fetchTourDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Use the new API endpoint
      const response = await fetch(`${BASE_URL}//api/tours/tour/full/${tourId}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch tour details: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error('Failed to fetch tour data');
      }
      
      const processedData = processTourData(data);
      setTour(processedData);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching tour details:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tourId) {
      fetchTourDetails();
    }
  }, [tourId]);

  // Handle departure month selection
  const handleDepartureMonthChange = (month: string, checked: boolean) => {
    if (checked) {
      setSelectedDepartureMonths([...selectedDepartureMonths, month]);
    } else {
      setSelectedDepartureMonths(selectedDepartureMonths.filter(m => m !== month));
    }
  };

  // Handle Indian tour selection
  const handleIndianTourChange = (tourName: string, checked: boolean) => {
    if (checked) {
      setSelectedIndianTours([...selectedIndianTours, tourName]);
    } else {
      setSelectedIndianTours(selectedIndianTours.filter(t => t !== tourName));
    }
  };

  // Handle world tour selection
  const handleWorldTourChange = (tourName: string, checked: boolean) => {
    if (checked) {
      setSelectedWorldTours([...selectedWorldTours, tourName]);
    } else {
      setSelectedWorldTours(selectedWorldTours.filter(t => t !== tourName));
    }
  };

  // Clear all filters
  const clearAllFilters = () => {
    setDurationRange([5, 11]);
    setPriceRange([32990, 153000]);
    setSelectedDepartureMonths([]);
    setSelectedIndianTours([]);
    setSelectedWorldTours([]);
  };

  // Image carousel functions
  const nextImage = () => {
    if (tour?.images) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === tour.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (tour?.images) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? tour.images.length - 1 : prevIndex - 1
      );
    }
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFEBEE]">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="text-2xl font-bold text-[#2E4D98]">Loading tour details...</div>
          <div className="mt-4 text-gray-600">Fetching data from the server</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !tour) {
    return (
      <div className="min-h-screen bg-[#FFEBEE]">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="text-2xl font-bold text-red-600">Error loading tour</div>
          <div className="mt-4 text-gray-600">{error || 'Tour not found'}</div>
          <Button 
            onClick={() => navigate('/tour-packages')}
            className="mt-6 bg-[#2E4D98] hover:bg-[#2E4D98] hover:opacity-90 text-white"
          >
            Back to Tours
          </Button>
          <Button 
            onClick={fetchTourDetails}
            className="mt-4 ml-4 bg-[#E53C42] hover:bg-[#E53C42] hover:opacity-90 text-white"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  // Color definitions for DayCards
  const dayCardColors = [
    { dayNumber: "Day 01", headerColor: "bg-fuchsia-500", bodyColor: "bg-pink-100" },
    { dayNumber: "Day 02", headerColor: "bg-emerald-400", bodyColor: "bg-emerald-50" },
    { dayNumber: "Day 03", headerColor: "bg-orange-400", bodyColor: "bg-orange-50" },
    { dayNumber: "Day 04", headerColor: "bg-blue-600", bodyColor: "bg-blue-50" },
    { dayNumber: "Day 05", headerColor: "bg-yellow-400", bodyColor: "bg-yellow-50" },
    { dayNumber: "Day 06", headerColor: "bg-purple-500", bodyColor: "bg-purple-50" },
    { dayNumber: "Day 07", headerColor: "bg-red-500", bodyColor: "bg-red-50" },
  ];

  return (
    <div className="min-h-screen bg-[#FFEBEE]">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Filters Sidebar */}
          <aside className="lg:w-80">
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl shadow-lg p-6 border border-blue-200 sticky top-24">
              <div className="flex justify-between items-center mb-6 bg-white p-2 rounded-lg border border-black">
                <h2 className="text-2xl font-bold text-[#2E4D98]">Indian Tours</h2>
                <button 
                  onClick={clearAllFilters}
                  className="text-sm text-[#E53C42] hover:underline"
                >
                  Clear All
                </button>
              </div>

              {/* Duration */}
              <div className="mb-8">
                <h3 className="font-semibold text-lg mb-4 text-[#2E4D98]">Duration</h3>
                <div className="flex justify-between text-sm text-gray-600 mb-3">
                  <span>{durationRange[0]} days</span>
                  <span>{durationRange[1]} days</span>
                </div>
                <Slider 
                  value={durationRange} 
                  onValueChange={setDurationRange}
                  max={15} 
                  step={1} 
                  className="w-full" 
                />
              </div>

              {/* Price */}
              <div className="mb-8">
                <h3 className="font-semibold text-lg mb-4 text-[#2E4D98]">Price</h3>
                <div className="flex justify-between text-sm text-gray-600 mb-3">
                  <span>₹{priceRange[0].toLocaleString()}</span>
                  <span>₹{priceRange[1].toLocaleString()}</span>
                </div>
                <Slider 
                  value={priceRange} 
                  onValueChange={setPriceRange}
                  min={10000} 
                  max={200000} 
                  step={1000} 
                />
              </div>

              {/* Indian Tours */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-6 bg-white p-2 rounded-lg border border-black">
                  <h2 className="text-2xl font-bold text-[#2E4D98]">Indian Tours</h2>
                </div>
                <div className={`${showMoreIndian ? "max-h-40 overflow-y-auto pr-1" : ""} space-y-3`}>
                  {[
                    'Andaman', 'Goa', 'Kerala', 'Himachal', 'Rajasthan', 'Kashmir',
                    ...(showMoreIndian
                      ? [     'Andhra Pradesh',
          'Bihar',
          'Chhattisgarh',
          'Dadra & Nagar Haveli',
          'Daman & Diu',
          'Delhi',
          'Gujarat',
          'Haryana',
          'Jharkhand',
          'Karnataka',
          'Ladakh',
          'Lakshadweep',
          'Madhya Pradesh',
          'Maharashtra',
          'North East',
          'Odisha',
          'Puducherry',
          'Punjab & Haryana',
          'Seven Sisters',
          'Tamil Nadu',
          'Uttar Pradesh',
          'Uttarakhand',
          'West Bengal']
                      : [])
                  ].map((place) => (
                    <label key={place} className="flex items-center gap-3 cursor-pointer">
                      <Checkbox 
                        checked={selectedIndianTours.includes(place)}
                        onCheckedChange={(checked) => handleIndianTourChange(place, checked as boolean)}
                        className="data-[state=checked]:bg-[#2E4D98] data-[state=checked]:border-[#2E4D98]" 
                      />
                      <span className="text-gray-700">{place}</span>
                    </label>
                  ))}
                </div>
                <button
                  onClick={() => setShowMoreIndian(!showMoreIndian)}
                  className="mt-3 text-[#2E4D98] text-sm font-semibold hover:underline"
                >
                  {showMoreIndian ? "Show Less" : "Show More"}
                </button>
              </div>

              {/* World Tours */}
              <div>
                <div className="flex justify-between items-center mb-6 bg-white p-2 rounded-lg border border-black">
                  <h2 className="text-2xl font-bold text-[#2E4D98]">World Tours</h2>
                </div>
                <div className={`${showMoreWorld ? "max-h-40 overflow-y-auto pr-1" : ""} space-y-3`}>
                  {[
                    'Dubai', 'Europe', 'Maldives', 'Mauritius', 'Thailand', 'Bali',
                    ...(showMoreWorld
                      ? ['Singapore', 'Vietnam', 'Turkey', 'Japan', 'South Korea', 'Australia']
                      : [])
                  ].map((place) => (
                    <label key={place} className="flex items-center gap-3 cursor-pointer">
                      <Checkbox 
                        checked={selectedWorldTours.includes(place)}
                        onCheckedChange={(checked) => handleWorldTourChange(place, checked as boolean)}
                        className="data-[state=checked]:bg-[#2E4D98] data-[state=checked]:border-[#2E4D98]" 
                      />
                      <span className="text-gray-700">{place}</span>
                    </label>
                  ))}
                </div>
                <button
                  onClick={() => setShowMoreWorld(!showMoreWorld)}
                  className="mt-3 text-[#2E4D98] text-sm font-semibold hover:underline"
                >
                  {showMoreWorld ? "Show Less" : "Show More"}
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Hero Section with Image Carousel */}
            <div className="relative rounded-2xl overflow-hidden mb-1">
              <div className="relative h-96 lg:h-[500px] overflow-hidden">
                <img 
                  src={tour.images[currentImageIndex]} 
                  alt={tour.title} 
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
                />
                
                {/* Navigation Arrows */}
                {tour.images.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
                
                {/* Image Counter */}
                {tour.images.length > 1 && (
                  <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {tour.images.length}
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {tour.images.length > 1 && (
                <div className="bg-gradient-to-r from-blue-100 to-blue-100 p-4 border-t">
                  <div className="flex justify-center gap-2">
                    {tour.images.map((image: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`w-16 h-16 lg:w-20 lg:h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                          index === currentImageIndex 
                            ? 'border-[#2E4D98] ring-2 ring-[#2E4D98] ring-opacity-50 scale-105' 
                            : 'border-transparent hover:border-gray-300'
                        }`}
                      >
                        <img 
                          src={image} 
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Excel-like Table Layout */}
            <div className="bg-white rounded-xl shadow-sm mb-0.5 overflow-hidden border border-[#1e3a8a]">
              {/* ===== FIRST ROW: HEADERS ===== */}
              <div className="grid grid-cols-8 bg-[#E8F0FF] border-b border-[#1e3a8a]">
                <div className="border-r border-[#1e3a8a] px-4 py-3">
                  <h3 className="font-bold text-gray-900 text-center text-lg">Tour Code</h3>
                </div>
                <div className="col-span-6 border-r border-[#1e3a8a] px-4 py-3">
                  <h3 className="font-bold text-gray-900 text-center text-lg">Tour Name</h3>
                </div>
                <div className="px-4 py-3">
                  <h3 className="font-bold text-gray-900 text-center text-lg">Days</h3>
                </div>
              </div>

              {/* ===== SECOND ROW: VALUES ===== */}
              <div className="grid grid-cols-8 border-b border-[#1e3a8a]">
                <div className="border-r border-[#1e3a8a] px-1 py-3 bg-blue-50">
                  <p className="text-xl font-bold text-[#2E4D98] text-center tracking-wide">
                    {tour.code}
                  </p>
                </div>

                <div className="col-span-6 border-r border-[#1e3a8a] px-4 py-3 bg-gray-50">
                  <p className="text-xl font-semibold text-gray-900 text-center">
                    {tour.title}
                  </p>
                </div>

                <div className=" px-4 py-3 bg-red-50">
                  <p className="text-xl font-bold text-[#E53C42] text-center">
                    {tour.duration}
                  </p>
                </div>
              </div>

              {/* ===== THIRD ROW: TABS ===== */}
              <div className="grid grid-cols-8 bg-white">
                {[
                  "Itinerary",
                  "Dep Date",
                  "Tour Cost",
                  "Cost In/Cost Ex",
                  "Flights & Hotels",
                  "Bookings POI",
                  "Cancellation",
                  "Instructions"
                ].map((label) => (
                  <button
                    key={label}
                    onClick={() => setActiveTab(label.toLowerCase().replace(/\s+/g, '-'))}
                    className={`px-3 py-4 text-sm font-semibold text-center border-r last:border-r-0 border-[#1e3a8a] transition 
                      ${
                        activeTab === label.toLowerCase().replace(/\s+/g, '-')
                          ? "bg-[#2E3a8a] text-white"
                          : "bg-[#E8F0FF] text-gray-700 hover:bg-blue-100"
                      }
                    `}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#2E4D98] rounded-xl shadow-sm p-6">
              {/* Itinerary Tab */}
              {activeTab === "itinerary" && (
                <div className="bg-[#C2E2FA] rounded-lg p-1 max-h-[calc(100vh-250px)] overflow-y-auto">
                  <div className="mx-auto bg-white rounded-lg shadow-lg">
                    <div className="bg-red-600 text-white text-center font-bold text-xl py-3">
                      Tour Itinerary
                    </div>
                    <div className='bg-[#FFEBEE]'>
                      <div className="space-y-4">
                        {tour.itinerary.slice(0, Math.min(tour.itinerary.length, 5)).map((day: any, index: number) => (
                          <DayCard 
                            key={index}
                            dayNumber={`Day ${index + 1}`.padStart(2, '0')}
                            headerColor={dayCardColors[index]?.headerColor || "bg-gray-500"}
                            bodyColor={dayCardColors[index]?.bodyColor || "bg-gray-50"}
                            dayData={day}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Dep Date Tab */}
              {activeTab === "dep-date" && (
                <div className="bg-[#E8F0FF] rounded-lg p-1">
                  <div className="bg-red-600 text-white text-center font-bold text-xl py-3">
                    Departure Dates
                  </div>
                  
                  <div className="border border-gray-300 rounded-t-none border-t-0 rounded-lg overflow-hidden">
                    <div className="min-h-[300px] p-6 bg-[#FFEBEE]">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* First Column */}
                        <div className="space-y-3">
                          {tour.departureDates.months.slice(0, Math.ceil(tour.departureDates.months.length / 2)).map((month: any, index: number) => (
                            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#2E4D98] transition-colors duration-200">
                              <span className="text-lg font-semibold text-gray-800">{month.name}</span>
                              <div className="flex gap-2 flex-wrap justify-end">
                                {month.dates.map((date: string, dateIndex: number) => (
                                  <span 
                                    key={dateIndex}
                                    className="px-3 py-2 bg-blue-100 text-blue-700 rounded text-sm font-medium hover:bg-blue-200 transition-colors duration-200 cursor-pointer"
                                  >
                                    {date}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Second Column */}
                        {tour.departureDates.months.length > Math.ceil(tour.departureDates.months.length / 2) && (
                          <div className="space-y-3">
                            {tour.departureDates.months.slice(Math.ceil(tour.departureDates.months.length / 2)).map((month: any, index: number) => (
                              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#2E4D98] transition-colors duration-200">
                                <span className="text-lg font-semibold text-gray-800">{month.name}</span>
                                <div className="flex gap-2 flex-wrap justify-end">
                                  {month.dates.map((date: string, dateIndex: number) => (
                                    <span 
                                      key={dateIndex}
                                      className="px-3 py-2 bg-blue-100 text-blue-700 rounded text-sm font-medium hover:bg-blue-200 transition-colors duration-200 cursor-pointer"
                                    >
                                      {date}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tour Cost Tab */}
              {activeTab === "tour-cost" && (
                <div className="bg-[#E8F0FF] rounded-lg p-1">
                  <div className="bg-red-600 text-white text-center font-bold text-xl py-3 mb-2">
                    Tour Cost
                  </div>
                  
                  <div className="border border-gray-300 rounded-b-lg rounded-t-none overflow-hidden -mt-1">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse table-fixed">
                        <thead>
                          <tr className="bg-[#2E4D98]">  
                            <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-white text-base h-14 w-1/6">
                              Passenger
                            </th>
                            <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-white text-base h-14 w-1/6">
                              Standard Hotel
                            </th>
                            <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-white text-base h-14 w-1/6">
                              Deluxe Hotel
                            </th>
                            <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-white text-base h-14 w-1/6">
                              Executive Hotel
                            </th>
                            <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-white text-base h-14 w-1/6">
                              Chd With Bed
                            </th>
                            <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-white text-base h-14 w-1/6">
                              Chd No Bed
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {tour.tourCost.map((row: any, index: number) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-[#FFEBEE]' : 'bg-[#FFEBEE]/80'}>
                              <td className="border border-gray-300 px-4 py-3 text-center font-medium text-gray-700 text-base h-14 w-1/6">
                                {row.passenger}
                              </td>
                              <td className="border border-gray-300 px-4 py-3 text-center text-gray-600 text-base h-14 w-1/6">
                                {row.standard}
                              </td>
                              <td className="border border-gray-300 px-4 py-3 text-center text-green-600 font-semibold text-base h-14 w-1/6">
                                {row.deluxe}
                              </td>
                              <td className="border border-gray-300 px-4 py-3 text-center text-gray-600 text-base h-14 w-1/6">
                                {row.executive}
                              </td>
                              <td className="border border-gray-300 px-4 py-3 text-center text-blue-600 font-medium text-base h-14 w-1/6">
                                {row.childWithBed}
                              </td>
                              <td className="border border-gray-300 px-4 py-3 text-center text-purple-600 font-medium text-base h-14 w-1/6">
                                {row.childNoBed}
                              </td>
                            </tr>
                          ))}
                        </tbody> 
                      </table>
                      
                      <div className="bg-[#E8F0FF] rounded-lg mt-1">
                        <div className="bg-red-600 text-white text-center font-bold text-xl py-3">
                          Remarks
                        </div>
                        
                        <div className="border border-gray-300 rounded-t-none border-t-0 rounded-lg overflow-hidden">
                          <div className="min-h-[200px] p-6 bg-[#FFEBEE]">
                            <p className="text-gray-700">{tour.specialRemarks}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Cost In/Cost Ex Tab */}
              {activeTab === "cost-in/cost-ex" && (
                <div className="bg-[#E8F0FF] rounded-lg p-1">
                  <div className="bg-red-600 text-white text-center font-bold text-xl py-3 mb-1">
                    Cost Inclusive & Cost Excludes
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
                    {/* Cost Includes */}
                    <div className="min-h-[300px] flex flex-col">
                      <div className="bg-[#2E4D98] text-white text-center py-3 rounded-t-lg">
                        <h3 className="text-xl font-bold">Cost Inclusive</h3>
                      </div>
                      <div className="flex-1 overflow-x-auto border-2 border-gray-300 rounded-b-lg bg-[#FFEBEE]">
                        <div className="h-full w-full p-4">
                          <ul className="space-y-2">
                            {tour.inclusionExclusion.inclusions.map((inclusion: string, index: number) => (
                              <li key={index} className="flex items-start gap-2">
                                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700">{inclusion}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    {/* Cost Excludes */}
                    <div className="min-h-[300px] flex flex-col">
                      <div className="bg-[#2E4D98] text-white text-center py-3 rounded-t-lg">
                        <h3 className="text-xl font-bold">Cost Excludes</h3>
                      </div>
                      <div className="flex-1 overflow-x-auto border-2 border-gray-300 rounded-b-lg bg-[#FFEBEE]">
                        <div className="h-full w-full p-4">
                          <ul className="space-y-2">
                            {tour.inclusionExclusion.exclusions.map((exclusion: string, index: number) => (
                              <li key={index} className="flex items-start gap-2">
                                <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700">{exclusion}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Flights & Hotels Tab */}
              {activeTab === "flights-&-hotels" && (
                <div className="bg-[#E8F0FF] rounded-lg p-0.2">
                  {/* Flights Section */}
                  <div className="bg-[#E8F0FF] rounded-lg p-1 mb-2">
                    <div className="bg-red-600 text-white text-center font-bold text-xl py-3">
                      Flights / Train or Transport Details
                    </div>
                    
                    <div className="border border-gray-300 rounded-t-none border-t-0 rounded-lg overflow-hidden">
                      <div className="min-h-[300px] p-6 bg-[#FFEBEE]">
                        <div className="space-y-4">
                          {tour.airlines.map((flight: any, index: number) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white">
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-bold text-lg">{flight.airline} - {flight.flightNo}</span>
                                <span className="text-gray-600">{flight.depDate} | {flight.depTime}</span>
                              </div>
                              <div className="flex justify-between">
                                <div>
                                  <p className="font-medium">{flight.from}</p>
                                  <p className="text-gray-600">Departure</p>
                                </div>
                                <div className="text-center">
                                  <p className="text-gray-600">→</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">{flight.to}</p>
                                  <p className="text-gray-600">Arrival</p>
                                </div>
                              </div>
                              {flight.description && (
                                <div className="mt-3 pt-3 border-t border-gray-100">
                                  <p className="text-sm text-gray-600">{flight.description}</p>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hotels Section */}
                  <div className='p-1'>
                    <div className="bg-red-600 text-white text-center font-bold text-xl py-3 mb-1">
                      Hotel Details
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-blue-700">
                            <th className="border border-gray-300 bg-[#2E4D98] px-4 py-2 text-left text-white">City</th>
                            <th className="border border-gray-300 bg-[#2E4D98] px-4 py-2 text-left text-white">Hotel Name</th>
                            <th className="border border-gray-300 bg-[#2E4D98] px-4 py-2 text-left text-white">Room Type</th>
                            <th className="border border-gray-300 bg-[#2E4D98] px-4 py-2 text-left text-white">Nights</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tour.hotels.map((hotel: any, index: number) => (
                            <tr
                              key={index}
                              className={index % 2 === 0 ? "bg-[#FFEBEE]" : "bg-[#FFEBEE]/80"}
                            >
                              <td className="border border-gray-300 px-4 py-2">{hotel.city}</td>
                              <td className="border border-gray-300 px-4 py-2">{hotel.hotelName}</td>
                              <td className="border border-gray-300 px-4 py-2">{hotel.roomType}</td>
                              <td className="border border-gray-300 px-4 py-2">{hotel.nights}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      
                      <div className="bg-[#E8F0FF] rounded-lg mt-1">
                        <div className="bg-red-600 text-white text-center font-bold text-xl py-3">
                          Remarks
                        </div>
                        
                        <div className="border border-gray-300 rounded-t-none border-t-0 rounded-lg overflow-hidden">
                          <div className="min-h-[200px] p-6 bg-[#FFEBEE]">
                            <p className="text-gray-700 whitespace-pre-line">{tour.specialRemarks}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>  
                </div>
              )}

              {/* Bookings POI Tab */}
              {activeTab === "bookings-poi" && (
                <div className="bg-[#E8F0FF] rounded-lg p-1">
                  <div className="bg-red-600 text-white text-center font-bold text-xl py-3">
                    Booking Policy
                  </div>
                    
                  <div className="flex flex-col lg:flex-row gap-1 mt-1">
                    {/* Left Card - Booking Policy - 80% width */}
                    <div className="min-h-[280px] w-full lg:w-4/5 flex flex-col">
                      <div className="bg-[#2E4D98] text-white text-center py-3 rounded-t-lg">
                        <h3 className="text-xl font-bold">Booking Policy</h3>
                      </div>
                      <div className="flex-1 overflow-x-auto border-2 border-gray-300 rounded-b-lg bg-white">
                        <div className="h-full w-full p-4">
                          <div className="space-y-2 h-full">
                            {tour.booking.map((item: string, index: number) => (
                              <div key={index} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200 h-[68px]">
                                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-lg font-bold">
                                  {index + 1}
                                </div>
                                <span className="text-gray-700 text-base flex items-center h-full">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Right Card - Amount Details - 20% width */}
                    <div className="min-h-[280px] w-full lg:w-1/5 flex flex-col">
                      <div className="bg-[#2E4D98] text-white text-center py-3 rounded-t-lg">
                        <h3 className="text-xl font-bold">Amount Details</h3>
                      </div>
                      <div className="flex-1 overflow-x-auto border-2 border-gray-300 rounded-b-lg bg-white">
                        <div className="h-full w-full p-4">
                          <div className="grid gap-2 h-full">
                            {/* Card 1 */}
                            <div className="flex items-center justify-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm h-[68px]">
                              <div className="text-center">
                                <span className="text-xl font-bold text-green-600">₹50,000</span>
                              </div>
                            </div>
                            
                            {/* Card 2 */}
                            <div className="flex items-center justify-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm h-[68px]">
                              <div className="text-center">
                                <span className="text-xl font-bold text-blue-600">₹50,000</span>
                              </div>
                            </div>
                            
                            {/* Card 3 */}
                            <div className="flex items-center justify-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm h-[68px]">
                              <div className="text-center">
                                <span className="text-xl font-bold text-blue-600">₹1,50,000</span>
                              </div>
                            </div>
                            
                            {/* Card 4 */}
                            <div className="flex items-center justify-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm h-[68px]">
                              <div className="text-center">
                                <span className="text-xl font-bold text-blue-600">Aadhaar Card</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Cancellation Tab */}
              {activeTab === "cancellation" && (
                <div className="bg-[#E8F0FF] rounded-lg p-1">
                  <div className="bg-red-600 text-white text-center font-bold text-xl py-3">
                    Cancellation Policy
                  </div>
                  
                  <div className="flex flex-col lg:flex-row gap-1 mt-1">
                    {/* Left Card - Cancellation Policy - 80% width */}
                    <div className="min-h-[280px] w-full lg:w-4/5 flex flex-col">
                      <div className="bg-[#E53C42] text-white text-center py-3 rounded-t-lg">
                        <h3 className="text-xl font-bold">Cancellation Policy</h3>
                      </div>
                      <div className="flex-1 overflow-x-auto border-2 border-gray-300 rounded-b-lg bg-white">
                        <div className="h-full w-full p-4">
                          <div className="space-y-2 h-full">
                            {tour.cancellation.map((item: string, index: number) => (
                              <div key={index} className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-200 h-[68px]">
                                <div className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-lg font-bold">
                                  {index + 1}
                                </div>
                                <span className="text-gray-700 text-base flex items-center h-full">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Right Card - Cancellation Charges - 20% width */}
                    <div className="min-h-[280px] w-full lg:w-1/5 flex flex-col">
                      <div className="bg-[#E53C42] text-white text-center py-3 rounded-t-lg">
                        <h3 className="text-xl font-bold">Charges</h3>
                      </div>
                      <div className="flex-1 overflow-x-auto border-2 border-gray-300 rounded-b-lg bg-white">
                        <div className="h-full w-full p-4">
                          <div className="grid gap-2 h-full">
                            {/* Charge Cards */}
                            <div className="flex items-center justify-center p-4 bg-white rounded-lg border border-red-200 shadow-sm h-[68px]">
                              <div className="text-center">
                                <span className="text-xl font-bold text-red-600">30 Days+</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-center p-4 bg-white rounded-lg border border-red-200 shadow-sm h-[68px]">
                              <div className="text-center">
                                <span className="text-xl font-bold text-red-600">15-30 Days</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-center p-4 bg-white rounded-lg border border-red-200 shadow-sm h-[68px]">
                              <div className="text-center">
                                <span className="text-xl font-bold text-red-600">7-14 Days</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-center p-4 bg-white rounded-lg border border-red-200 shadow-sm h-[68px]">
                              <div className="text-center">
                                <span className="text-xl font-bold text-red-600">0-7 Days</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-center p-4 bg-white rounded-lg border border-red-200 shadow-sm h-[68px]">
                              <div className="text-center">
                                <span className="text-xl font-bold text-red-600">2-5 Days</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Instructions Tab */}
              {activeTab === "instructions" && (
                <div className="bg-[#E8F0FF] rounded-lg p-1">
                  <div className="bg-red-600 text-white text-center font-bold text-xl py-3">
                    Instructions
                  </div>
                  
                  <div className="border border-gray-300 rounded-t-none border-t-0 rounded-lg overflow-hidden">
                    <div className="min-h-[300px] p-6 bg-[#FFEBEE]">
                      <div className="space-y-4">
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <h4 className="font-bold text-lg text-[#2E4D98] mb-2">Important Instructions</h4>
                          <ul className="space-y-2 text-gray-700">
                            {tour.instructions.map((instruction: string, index: number) => (
                              <li key={index}>• {instruction}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <h4 className="font-bold text-lg text-green-700 mb-2">Travel Tips</h4>
                          <ul className="space-y-2 text-gray-700">
                            <li>• Carry comfortable walking shoes and appropriate clothing</li>
                            <li>• Keep essential medicines and first-aid kit</li>
                            <li>• Stay hydrated and follow local guidelines</li>
                            <li>• Keep emergency contact numbers handy</li>
                            <li>• Purchase travel insurance for added security</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end mt-1">
              <button className="flex-1 max-w-[150px] bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-4 rounded-l-lg transition-colors border-r border-amber-800 flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download
              </button>
              <button className="flex-1 max-w-[150px] bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 transition-colors border-r border-blue-700 flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email
              </button>
              <button className="flex-1 max-w-[150px] bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-r-lg transition-colors flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Book Now
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;