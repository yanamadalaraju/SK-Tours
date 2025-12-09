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
    <div className="rounded-lg"> 
      <div className="flex gap-2 mb-1">
        <div className={`${headerColor} text-white font-bold px-4 py-2 rounded-lg text-center min-w-[120px] border border-black`}>
          {dayNumber}
        </div>
        <div className={`${headerColor} text-white font-bold px-4 py-2 rounded-lg text-center flex-1 border border-black`}>
          {dayData?.title || "Day Details"}
        </div>
        <div className={`${headerColor} text-white border border-black rounded-lg px-3 py-1.5 flex items-center gap-3`}>
          {/* Breakfast - Checkbox first */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setMeals(prev => ({ ...prev, B: !prev.B }))}
              className={`h-4 w-4 rounded-full border flex items-center justify-center transition-colors ${meals.B ? 'bg-[#3B82F6] border-[#3B82F6]' : 'bg-white border-gray-400'}`}
            >
              {meals.B && (
                <div className="h-2 w-2 rounded-full bg-white"></div>
              )}
            </button>
    <span className="text-white text-sm font-bold">B</span> {/* Added font-bold */}
              </div>
          
          {/* Lunch - Checkbox first */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setMeals(prev => ({ ...prev, L: !prev.L }))}
              className={`h-4 w-4 rounded-full border flex items-center justify-center transition-colors ${meals.L ? 'bg-[#3B82F6] border-[#3B82F6]' : 'bg-white border-gray-400'}`}
            >
              {meals.L && (
                <div className="h-2 w-2 rounded-full bg-white"></div>
              )}
            </button>
   <span className="text-white text-sm font-bold">L</span> {/* Added font-bold */}
             </div>
          
          {/* Dinner - Checkbox first */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setMeals(prev => ({ ...prev, D: !prev.D }))}
              className={`h-4 w-4 rounded-full border flex items-center justify-center transition-colors ${meals.D ? 'bg-[#3B82F6] border-[#3B82F6]' : 'bg-white border-gray-400'}`}
            >
              {meals.D && (
                <div className="h-2 w-2 rounded-full bg-white"></div>
              )}
            </button>
 <span className="text-white text-sm font-bold">D</span> {/* Added font-bold */}
           </div>
        </div>
      </div>
      {/* Content Area - Now properly separated from next card */}
      <div className={`${bodyColor} min-h-[120px] p-4 rounded-lg border border-black mb-0`}>
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

  // API URL
  const API_URL = 'http://localhost:5000/api/tours/tour/full';

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
        "https://i.pinimg.com/736x/09/16/c4/0916c43d72ac007aee1a1a7d6d31d231.jpg",
        "https://i.pinimg.com/1200x/6a/f9/0e/6af90eea656d653c788e7d3f92a77247.jpg",
        "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80",
        "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80"
      ];
      return fallbackImages;
    };

    // Process departure descriptions (only descriptions, no dates)
    const processDepartureDescriptions = (departuresArray: any[]) => {
      if (!departuresArray || departuresArray.length === 0) {
        // Return default if no departures
        return ["No departure information available."];
      }
      
      // Collect all unique descriptions from departures
      const descriptions: string[] = [];
      
      departuresArray.forEach(dep => {
        if (dep.description && !descriptions.includes(dep.description)) {
          descriptions.push(dep.description);
        }
      });
      
      return descriptions.length > 0 ? descriptions : ["No description available."];
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

    // Process tour cost table (remove remarks column)
    const processTourCost = (costsArray: any[], basicDetails: any) => {
      if (costsArray && costsArray.length > 0) {
        return {
          tableData: costsArray.map(cost => ({
            passenger: `${cost.pax} Pax`,
            standard: cost.standard_hotel !== "0.00" ? formatPrice(cost.standard_hotel) : "NA",
            deluxe: cost.deluxe_hotel !== "0.00" ? formatPrice(cost.deluxe_hotel) : "NA",
            executive: cost.executive_hotel !== "0.00" ? formatPrice(cost.executive_hotel) : "NA",
            childWithBed: cost.child_with_bed !== "0.00" ? formatPrice(cost.child_with_bed) : "NA",
            childNoBed: cost.child_no_bed !== "0.00" ? formatPrice(cost.child_no_bed) : "NA"
          })),
          remarks: basicDetails.cost_remarks ? [basicDetails.cost_remarks] : [] // Add cost_remarks here
        };
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
      return {
        tableData: defaultCosts,
         remarks: basicDetails.cost_remarks ? [basicDetails.cost_remarks] : ['Price valid for bookings made 30 days in advance.', 'Prices are subject to change without prior notice.']
      };
    };

     // Process booking POI - extract both item and amount_details
  const processBooking = (bookingArray: any[]) => {
    if (bookingArray && bookingArray.length > 0) {
      return {
        items: bookingArray.map(item => item.item || ''), // Extract item descriptions
        amountDetails: bookingArray.map(item => item.amount_details || '0') // Extract amount details
      };
    }
    
    // Default booking data
    return {
      items: ["Standard booking terms apply"],
      amountDetails: ["0"]
    };
  };

    // Process hotels data (remove remarks column)
    const processHotels = (hotelsArray: any[], basicDetails: any) => {
      if (hotelsArray && hotelsArray.length > 0) {
        return {
          tableData: hotelsArray.map(hotel => ({
            city: hotel.city,
            hotelName: hotel.hotel_name,
            roomType: hotel.room_type,
            nights: `${hotel.nights} Night${hotel.nights > 1 ? 's' : ''}`
          })),
           remarks: basicDetails.hotel_remarks ? [basicDetails.hotel_remarks] : [] // Add hotel_remarks here
        };
      }

      // Default hotel data
      return {
        tableData: [{
          city: "Destination",
          hotelName: "Comfort Hotel",
          roomType: basic_details.category_id === 1 ? "Standard Room" : 
                    basic_details.category_id === 2 ? "Deluxe Room" : 
                    "Executive Suite",
          nights: `${basic_details.duration_days - 1} Nights`
        }],
         remarks: basicDetails.hotel_remarks ? [basicDetails.hotel_remarks] : ["Hotel subject to availability. Check-in time: 2:00 PM, Check-out time: 12:00 PM."]
      };
    };

    // Process transport data (remove remarks column)
    const processTransport = (transportArray: any[], basicDetails: any) => {
      if (transportArray && transportArray.length > 0) {
        return {
          tableData: transportArray.map(transport => ({
            airline: transport.carrier || transport.mode,
            flightNo: transport.number_code || '-',
            from: transport.from_city,
            to: transport.to_city,
            depDate: new Date(transport.departure_datetime).toLocaleDateString(),
            depTime: new Date(transport.departure_datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            arrDate: new Date(transport.arrival_datetime).toLocaleDateString(),
            arrTime: new Date(transport.arrival_datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            description: transport.description || ''
          })),
            remarks: basicDetails.transport_remarks ? [basicDetails.transport_remarks] : [] // Add transpo
        };
      }

      // Default transport data
      return {
        tableData: [{
          airline: "Multiple Airlines",
          flightNo: "Various",
          from: "Major Cities",
          to: "Destination",
          depDate: "On Tour Date",
          depTime: "Flexible",
          arrDate: "On Tour Date",
          arrTime: "Flexible",
          description: ""
        }],
        remarks: basicDetails.transport_remarks ? [basicDetails.transport_remarks] : ["Flight timings subject to change. Final schedule provided 72 hours before departure."]
      };
    };

    // Process cancellation policies
    // Process cancellation policies - extract both policy text and charges
  const processCancellation = (policiesArray: any[]) => {
    if (policiesArray && policiesArray.length > 0) {
      return {
        policies: policiesArray.map(policy => 
          `${policy.days_min}-${policy.days_max} days before travel: ${policy.charge_percentage}% cancellation charge`
        ),
        charges: policiesArray.map(policy => policy.charges || '') // Extract charges
      };
    }

    // Default cancellation policies
    const defaultPolicies = [
      "30+ days before travel: 90% refund",
      "15-30 days before travel: 50% refund",
      "7-14 days before travel: 25% refund",
      "Less than 7 days: No refund"
    ];
    
    const defaultCharges = [
      "10%",
      "25%",
      "50%",
      "100%"
    ];
    
    return {
      policies: defaultPolicies,
      charges: defaultCharges
    };
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
      departureDescriptions: processDepartureDescriptions(departures), // Changed from departureDates
      inclusionExclusion: {
        inclusions: inclusions || [],
        exclusions: exclusions || []
      },
      hotels: processHotels(hotels, basic_details),
      airlines: processTransport(transport, basic_details),
      tourCost: processTourCost(costs, basic_details),
       booking: processBooking(booking_poi), // Updated to include amountDetails
      cancellation: processCancellation(cancellation_policies), // Updated to include charges
      instructions: instructions || []
    };
  };

  // Fetch tour details
  const fetchTourDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Use the new API endpoint
      const response = await fetch(`${API_URL}/${tourId}`);
      
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

  // Color definitions for DayCards (matching your static design)
  const dayCardColors = [
    { dayNumber: "Day 01", headerColor: "bg-[#A72703]", bodyColor: "bg-[#FFE797]" },
    { dayNumber: "Day 02", headerColor: "bg-[#A72703]", bodyColor: "bg-[#FFE797]" },
    { dayNumber: "Day 03", headerColor: "bg-[#A72703]", bodyColor: "bg-[#FFE797]" },
    { dayNumber: "Day 04", headerColor: "bg-[#A72703]", bodyColor: "bg-[#FFE797]" },
    { dayNumber: "Day 05", headerColor: "bg-[#A72703]", bodyColor: "bg-[#FFE797]" },
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
        <div className="bg-white rounded-xl shadow-sm mb-1.5 overflow-hidden border border-black">

 {/* ===== FIRST ROW: HEADERS ===== */}
<div className="grid grid-cols-8 bg-[#E8F0FF] border-b border-black">
  <div className="border-r border-white bg-[#2E3a8a] px-4 py-3">
    <h3 className="font-bold text-white text-center text-lg">Tour Code</h3>
  </div>  

  <div className="col-span-6 border-r border-white bg-[#2E3a8a] px-4 py-3">
    <h3 className="font-bold text-white text-center text-lg">Tour Name</h3>
  </div>

  <div className="px-4 py-3 bg-[#2E3a8a]">
    <h3 className="font-bold text-white text-center text-lg">Days</h3>
  </div>
</div>

{/* ===== SECOND ROW: VALUES ===== */}
<div className="grid grid-cols-8 border-black border-black">
  <div className="border-r border-black px-1 py-3 bg-blue-50">
    <p className="text-lg font-bold text-[#2E4D98] text-center tracking-wide">
      {tour.code}
    </p>
  </div>

  <div className="col-span-6 border-r border-black px-4 py-3 bg-gray-50">
    <p className="text-lg font-semibold text-gray-900 text-center">
      {tour.title}
    </p>
  </div>

  <div className="px-4 py-3 bg-red-50">
    <p className="text-lg font-bold text-[#E53C42] text-center">
      {tour.duration}
    </p>
  </div>
</div>

  {/* ===== THIRD ROW: TABS ===== */}
<div className="grid grid-cols-8 bg-white border-t border-black">
  {[
    "Itinerary",
    "Dep Date",
    "Tour Cost",
  "Cost inc./Cost ex.",
      "Flights & Hotels",
    "Bookings POI",
    "Cancellation",
    "Instructions"
  ].map((label, idx) => (
    <button
      key={label}
      onClick={() => setActiveTab(label.toLowerCase().replace(/\s+/g, '-'))}
      className={`px-3 py-4 text-sm font-semibold text-center whitespace-nowrap
        ${idx < 7 ? "border-r border-black" : ""} transition 
        ${
          activeTab === label.toLowerCase().replace(/\s+/g, '-')
            ? "bg-[#A72703] text-white"        
        : "bg-[#FFE797] text-gray-800" 
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
      <div className="bg-red-600 text-white text-center font-bold text-2xl py-2 rounded-t-lg">
        Tour Itinerary
      </div>
      <div className="border-2 border-[#1e3a8a] border-t-0 overflow-hidden rounded-b-lg">
        <div className="bg-[#FFEBEE]">
          {/* Added more spacing between cards */}
          <div className="space-y-1 p-1"> {/* Changed from space-y-2 p-2 */}
            {tour.itinerary.slice(0, Math.min(tour.itinerary.length, 5)).map((day: any, index: number) => (
              <DayCard 
                key={index}
                dayNumber={day.day}
                headerColor={dayCardColors[index]?.headerColor || "bg-[#A72703]"}
                bodyColor={dayCardColors[index]?.bodyColor || "bg-[#FFE797]"}
                dayData={day}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
)}

              {/* Dep Date Tab */}
              {activeTab === "dep-date" && (
                <div className="bg-[#E8F0FF] rounded-lg p-1">
                  <div className="bg-red-600 text-white text-center font-bold text-2xl py-2.5 rounded-t-lg">
                    Departure Dates
                  </div>
                  
                  <div className="border-2 border-[#1e3a8a] border-t-0 overflow-hidden rounded-b-lg">
                    <div className="min-h-[300px] p-1 bg-[#FFEBEE]">
                      <div className="space-y-4">
                        {tour.departureDescriptions.map((description: string, index: number) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white">
                            <div className="flex items-start">
                              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                                {index + 1}
                              </div>
                              <div className="flex-1">
                                <p className="text-gray-700">{description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tour Cost Tab */}
              {activeTab === "tour-cost" && (
                <div className="bg-[#E8F0FF] rounded-lg p-1">
                  <div className="bg-red-600 text-white text-center font-bold text-2xl py-2.5 rounded-t-lg mb-1.5">
                    Tour Cost
                  </div>
                  
                  <div className="border rounded-b-lg rounded-t overflow-hidden -mt-1">
                    <div className="overflow-x-auto border shadow-sm">
                      <table className="w-full border-collapse table-fixed">
                        <thead>
                          <tr className="bg-[#2E4D98]">
                            <th className="border border-white px-4 py-3 text-center font-semibold text-white text-base h-12 w-1/6">
                              Passenger
                            </th>
                            <th className="border border-white px-4 py-3 text-center font-semibold text-white text-base h-12 w-1/6">
                              Standard Hotel
                            </th>
                            <th className="border border-white px-4 py-3 text-center font-semibold text-white text-base h-12 w-1/6">
                              Deluxe Hotel
                            </th>
                            <th className="border border-white px-4 py-3 text-center font-semibold text-white text-base h-12 w-1/6">
                              Executive Hotel
                            </th>
                            <th className="border border-white px-4 py-3 text-center font-semibold text-white text-base h-12 w-1/6">
                              Child With Bed
                            </th>
                            <th className="border border-white px-4 py-3 text-center font-semibold text-white text-base h-12 w-1/6">
                              Child No Bed
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {tour.tourCost.tableData.map((row: any, index: number) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-[#FFEBEE]' : 'bg-[#FFEBEE]/80'}>
                              <td className="border-2 border-[#1e3a8a] px-4 py-3 text-center font-medium text-gray-700 text-base h-12 w-1/6">
                                {row.passenger}
                              </td>
                              <td className="border-2 border-[#1e3a8a] px-4 py-3 text-center text-gray-600 text-base h-12 w-1/6">
                                {row.standard}
                              </td>
                              <td className="border-2 border-[#1e3a8a] px-4 py-3 text-center text-green-600 font-semibold text-base h-12 w-1/6">
                                {row.deluxe}
                              </td>
                              <td className="border-2 border-[#1e3a8a] px-4 py-3 text-center text-gray-600 text-base h-12 w-1/6">
                                {row.executive}
                              </td>
                              <td className="border-2 border-[#1e3a8a] px-4 py-3 text-center text-blue-600 font-medium text-base h-12 w-1/6">
                                {row.childWithBed}
                              </td>
                              <td className="border-2 border-[#1e3a8a] px-4 py-3 text-center text-purple-600 font-medium text-base h-12 w-1/6">
                                {row.childNoBed}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Remarks Section */}
                    {tour.tourCost.remarks && tour.tourCost.remarks.length > 0 && (
                      <div className="bg-[#E8F0FF] rounded-lg mt-1">
                        <div className="bg-red-600 text-white text-center font-bold text-2xl py-2.5 rounded-t-lg">
                          Remarks
                        </div>
                        <div className="border-2 border-[#1e3a8a] border-t-0 overflow-hidden rounded-b-lg">
                          <div className="min-h-[150px] p-6 bg-[#FFEBEE]">
                            <ul className="space-y-2">
                              {tour.tourCost.remarks.map((remark: string, index: number) => (
                                <li key={index} className="flex items-start gap-2">
                                  <span className="text-gray-700">• {remark}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Cost In/Cost Ex Tab */}
              {activeTab === "cost-inc./cost-ex." && (
                <div className="bg-[#E8F0FF] rounded-lg p-1">
                  <div className="bg-red-600 text-white text-center font-bold text-2xl py-2.5 rounded-t-lg mb-1">
                    Cost Inclusive & Cost Excludes
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
                    {/* Cost Includes */}
                    <div className="min-h-[300px] flex flex-col">
                      <div className="bg-[#2E4D98] text-white text-center py-3 rounded-t-lg">
                        <h3 className="text-xl font-bold">Cost Inclusive</h3>
                      </div>
                      <div className="flex-1 overflow-x-auto border-2 border-[#1e3a8a] rounded-b-lg bg-[#FFEBEE]">
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
                      <div className="flex-1 overflow-x-auto border-2 border-[#1e3a8a] rounded-b-lg bg-[#FFEBEE]">
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
    <div className="bg-[#E8F0FF] rounded-lg p-1 mb-1"> {/* Changed to mb-0 */}
      <div className="bg-red-600 text-white text-center font-bold text-2xl py-2.5 rounded-t-lg">
        Flights / Train or Transport Details
      </div>
      
      <div className="border-2 border-[#1e3a8a] rounded-t-none border-t-0 rounded-lg overflow-hidden">
        <div className="min-h-[300px] p-1 bg-[#FFEBEE]">
          <div className="space-y-4">
            {tour.airlines.tableData.map((flight: any, index: number) => (
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
    <div className='p-1 -mt-2'> {/* Changed to -mt-2 (negative margin) */}
      <div className="bg-red-600 text-white text-center font-bold text-xl rounded-t-lg py-3 mb-1">
        Hotel Details
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#2E4D98]">
              <th className="border border-white px-2 py-2 text-left text-white w-1/5">
                City
              </th>
              <th className="border border-white px-6 py-2 text-left text-white w-1/2">
                Hotel Name
              </th>
              <th className="border border-white px-2 py-2 text-left text-white w-1/5">
                Room Type
              </th>
              <th className="border border-white px-4 py-2 text-left text-white w-1/5">
                Nights
              </th>
            </tr>
          </thead>
          <tbody className="border-2 border-[#1e3a8a] border-t-0 rounded-b-lg">
            {tour.hotels.tableData.map((hotel: any, index: number) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-[#FFEBEE]" : "bg-[#FFEBEE]/80"}
              >
                <td className="border border-black px-2 py-2">{hotel.city}</td>
                <td className="border border-black px-6 py-2">{hotel.hotelName}</td>
                <td className="border border-black px-2 py-2">{hotel.roomType}</td>
                <td className="border border-black px-2 py-2">{hotel.nights}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Combined Remarks Section for Hotels & Flights */}
      <div className="bg-[#E8F0FF] rounded-lg mt-1">
        <div className="bg-red-600 text-white text-center font-bold text-xl py-3 rounded-t-lg">
          Remarks
        </div>
        
        <div className="border-2 border-t-0 border-[#1e3a8a] rounded-b-lg overflow-hidden">
          <div className="min-h-[150px] p-6 bg-[#FFEBEE]">
            <ul className="space-y-2">
              {[...(tour.hotels.remarks || []), ...(tour.airlines.remarks || [])].map((remark: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-gray-700">• {remark}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>  
  </div>
)}
              {/* Bookings POI Tab */}
             {activeTab === "bookings-poi" && (
  <div className="bg-[#E8F0FF] rounded-lg p-1">
    <div className="bg-red-600 text-white text-center font-bold text-2xl py-2.5 rounded-t-lg mb-1">
      Booking Policy
    </div>
      
    <div className="flex flex-col lg:flex-row gap-1 mt-1">
      {/* Left Card - Booking Policy - 80% width */}
      <div className="min-h-[280px] w-full lg:w-4/5 flex flex-col">
        <div className="bg-[#2E4D98] text-white text-center py-3 rounded-t-lg">
          <h3 className="text-xl font-bold">Booking Policy</h3>
        </div>
        <div className="flex-1 overflow-x-auto border-x-2 border-b-2 border-[#1e3a8a] rounded-b-lg bg-white">
          <div className="h-full w-full p-1">
            <div className="space-y-1 h-full">
              {tour.booking.items.map((item: string, index: number) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-300 h-[68px]">
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
        <div className="flex-1 overflow-x-auto border-x-2 border-b-2 border-[#1e3a8a] rounded-b-lg bg-white">
          <div className="h-full w-full p-1">
            <div className="grid gap-1 h-full">
              {/* Dynamic amount details cards */}
              {tour.booking.amountDetails.map((amount: string, index: number) => (
                <div key={index} className="flex items-center justify-center p-4 bg-white rounded-lg border border-blue-300 shadow-sm h-[68px]">
                  <div className="text-center">
                    <span className="text-xl font-bold text-green-600">
                      {amount === "Aadhaar Card" || amount === "aadhaar card" 
                        ? "Aadhaar Card" 
                        : `₹${parseInt(amount || '0').toLocaleString('en-IN')}`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

{activeTab === "cancellation" && (
  <div className="bg-[#E8F0FF] rounded-lg p-1">
    {/* TOP MAIN HEADER */}
    <div className="bg-red-600 text-white text-center font-bold text-2xl py-2.5 rounded-t-lg mb-1">
      Cancellation Policy
    </div>

    <div className="flex flex-col lg:flex-row gap-1 mt-1">
      {/* LEFT CARD */}
      <div className="min-h-[280px] w-full lg:w-4/5 flex flex-col">
        {/* 2nd HEADER - DARK BROWN */}
        <div className="bg-[#A72703] text-white text-center py-3 rounded-t-lg">
          <h3 className="text-xl font-bold">Cancellation Policy</h3>
        </div>

        {/* INNER BG - LIGHT BLUE */}
        <div className="flex-1 overflow-x-auto border-x-2 border-b-2 border-[#1e3a8a] rounded-b-lg bg-[#E8F0FF]">
          <div className="h-full w-full p-1">
            <div className="space-y-1 h-full">
              {tour.cancellation.policies.map((item: string, index: number) => (
                <div 
                  key={index} 
                  className="flex items-start gap-3 p-4 bg-[#EAD2C0] rounded-lg border border-[#A72703] h-[68px]"
                >
                  {/* NUMBER CIRCLE - DARK BROWN */}
                  <div className="w-8 h-8 bg-[#A72703] text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-lg font-bold">
                    {index + 1}
                  </div>
                  <span className="text-gray-800 text-base flex items-center h-full">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT CARD - CHARGES */}
      <div className="min-h-[280px] w-full lg:w-1/5 flex flex-col">
        {/* 2nd HEADER - DARK BROWN */}
        <div className="bg-[#A72703] text-white text-center py-3 rounded-t-lg">
          <h3 className="text-xl font-bold">Charges</h3>
        </div>

        {/* INNER BG - LIGHT BLUE */}
        <div className="flex-1 overflow-x-auto border-x-2 border-b-2 border-[#1e3a8a] rounded-b-lg bg-[#E8F0FF]">
          <div className="h-full w-full p-1">
            <div className="grid gap-1 h-full">
              {tour.cancellation.charges.map((charge: string, index: number) => (
                <div 
                  key={index}
                  className="flex items-center justify-center p-4 bg-[#EAD2C0] rounded-lg border border-[#A72703] shadow-sm h-[68px]"
                >
                  <span className="text-xl font-bold text-[#A72703]">
                    {charge}
                  </span>
                </div>
              ))}
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
                  <div className="bg-red-600 text-white text-center font-bold text-2xl py-2.5 rounded-t-lg">
                    Instructions
                  </div>
                  
                  <div className="border-2 border-[#1e3a8a] border-t-0 overflow-hidden rounded-b-lg">
                    <div className="min-h-[300px] p-1 bg-[#FFEBEE]">
                      <div className="space-y-4">
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <h4 className="font-bold text-lg text-[#2E4D98] mb-2">Important Instructions</h4>
                          <ul className="space-y-2 text-gray-700">
                            {tour.instructions.map((instruction: string, index: number) => (
                              <li key={index}>• {instruction}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

 {/* Action Buttons */}
{/* Action Buttons - Exact Equal Width */}
<div className="flex justify-end mt-1 gap-0.5">
  {/* Download Card */}
  <div className="w-32 border border-green-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
    <button className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-3 flex items-center justify-center gap-2 transition-colors text-sm">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      Download
    </button>
  </div>

  {/* Email Card */}
  <div className="w-32 border border-blue-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-3 flex items-center justify-center gap-2 transition-colors text-sm">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
      Email
    </button>
  </div>

  {/* Book Now Card */}
  <div className="w-32 border border-red-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
    <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-3 flex items-center justify-center gap-2 transition-colors text-sm">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      Book Now
    </button>
  </div>
</div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;