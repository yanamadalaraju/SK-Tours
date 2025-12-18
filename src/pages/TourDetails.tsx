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
    <div className="rounded-lg">
      {/* Header Row */}
      <div className="flex gap-1 mb-1">
        {/* Day Number - Fixed width */}
        <div className={`${headerColor} text-white font-bold px-4 py-2 rounded-lg text-start w-[120px] flex-shrink-0 border border-black`}>
          {dayNumber}
        </div>
        
        {/* Title - Flexible width */}
        <div className={`${headerColor} text-white font-bold px-4 py-2 rounded-lg flex-1 min-w-0 border border-black`}>
          <div className="truncate">{dayData?.title || "Day Details"}</div>
        </div>
        
        {/* Meal Checkboxes - Fixed width, right aligned */}
        <div className={`${headerColor} text-white border border-black rounded-lg px-3 py-1.5 flex items-center justify-center gap-3 w-[140px] flex-shrink-0`}>
          {/* Breakfast - Square checkbox */}
          <div className="flex items-center gap-1">
            <div
              className={`h-4 w-4 border flex items-center justify-center transition-colors ${
                meals.B 
                  ? 'bg-white border-gray-400' 
                  : 'bg-white border-gray-400'
              }`}
              style={{ borderRadius: '2px' }}
            >
              {meals.B ? (
                // Dark blue checkmark ✓ for active - LARGER
                <svg 
                  className="h-4 w-4 text-blue-700" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="3" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
              ) : (
                // Red X mark ✗ for inactive/wrong - LARGER
                <svg 
                  className="h-4 w-4 text-red-600" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="3" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              )}
            </div>
            <span className="text-white text-sm font-bold">B</span>
          </div>
          
          {/* Lunch - Square checkbox */}
          <div className="flex items-center gap-1">
            <div
              className={`h-4 w-4 border flex items-center justify-center transition-colors ${
                meals.L 
                  ? 'bg-white border-gray-400' 
                  : 'bg-white border-gray-400'
              }`}
              style={{ borderRadius: '2px' }}
            >
              {meals.L ? (
                // Dark blue checkmark ✓ for active - LARGER
                <svg 
                  className="h-4 w-4 text-blue-700" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="3" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
              ) : (
                // Red X mark ✗ for inactive/wrong - LARGER
                <svg 
                  className="h-4 w-4 text-red-600" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="3" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              )}
            </div>
            <span className="text-white text-sm font-bold">L</span>
          </div>
          
          {/* Dinner - Square checkbox */}
          <div className="flex items-center gap-1">
            <div
              className={`h-4 w-4 border flex items-center justify-center transition-colors ${
                meals.D 
                  ? 'bg-white border-gray-400' 
                  : 'bg-white border-gray-400'
              }`}
              style={{ borderRadius: '2px' }}
            >
              {meals.D ? (
                // Dark blue checkmark ✓ for active - LARGER
                <svg 
                  className="h-4 w-4 text-blue-700" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="3" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
              ) : (
                // Red X mark ✗ for inactive/wrong - LARGER
                <svg 
                  className="h-4 w-4 text-red-600" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="3" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              )}
            </div>
            <span className="text-white text-sm font-bold">D</span>
          </div>
        </div>
      </div>
      
      {/* Content Area - Scrollable with justified text */}
      <div className={`${bodyColor} rounded-lg border border-black overflow-hidden`}>
        <div 
          className="p-2 text-gray-800 whitespace-pre-line text-justify"
          style={{ 
            height: '150px', // Fixed height
            overflowY: 'auto',
            scrollbarWidth: 'thin', // Firefox
          }}
        >
          {dayData?.description || ""}
        </div>
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
  const [tourType, setTourType] = useState<'Individual' | 'Group'>('Individual');

  // Departure date states for Group tours
  const [selectedMonth, setSelectedMonth] = useState("ALL");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const [selectedCostMonth, setSelectedCostMonth] = useState("");
const [selectedCostDate, setSelectedCostDate] = useState("");

  // State for Group Tour Cost table
  const [groupTourCost, setGroupTourCost] = useState({
    month: "January",
    date: "Date 1",
    adult3Star: "₹12,000",
    adult4Star: "₹15,000",
    adult5Star: "₹18,000",
    childWithBed3Star: "₹10,000",
    childWithBed4Star: "₹12,000",
    childWithBed5Star: "₹15,000",
    childNoBed3Star: "₹8,000",
    childNoBed4Star: "₹10,000",
    childNoBed5Star: "₹12,000"
  });

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

  // Month tabs for group tours
  const monthTabs: string[] = [
    "ALL",
    "APR 2026",
    "MAY 2026",
    "JUN 2026",
    "JUL 2026",
    "AUG 2026",
    "SEP 2026",
    "OCT 2026",
  ];

  // Process tour data based on type
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
      instructions,
      optional_tours,
      emi_options,
      tour_type
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
        const sortedImages = [...imagesArray].sort((a, b) => (b.is_cover - a.is_cover));
        return sortedImages.map(img => img.url);
      }
      const fallbackImages = [
        "https://i.pinimg.com/736x/09/16/c4/0916c43d72ac007aee1a1a7d6d31d231.jpg",
        "https://i.pinimg.com/1200x/6a/f9/0e/6af90eea656d653c788e7d3f92a77247.jpg",
        "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80",
      ];
      return fallbackImages;
    };

    // Process departure data based on tour type
    const processDepartures = (departuresArray: any[], tourType: string) => {
      if (!departuresArray || departuresArray.length === 0) {
        return {
          type: tourType,
          data: [],
          descriptions: ["No departure information available."]
        };
      }

      if (tourType === 'Group') {
        // Process group tour departures with dates
        const departureItems = departuresArray.map((dep: any, index: number) => {
          const startDate = dep.start_date ? new Date(dep.start_date) : new Date();
          const endDate = dep.end_date ? new Date(dep.end_date) : new Date();
          
          // Format month as "APR 2026"
          const month = startDate.toLocaleString('default', { month: 'short' }).toUpperCase();
          const year = startDate.getFullYear();
          const monthYear = `${month} ${year}`;
          
          // Format dates as "10 Apr 2026"
          const formatDate = (date: Date) => {
            const day = date.getDate();
            const month = date.toLocaleString('default', { month: 'short' });
            const year = date.getFullYear();
            return `${day} ${month} ${year}`;
          };

          // Get day of week
          const getDayOfWeek = (date: Date) => {
            return date.toLocaleString('default', { weekday: 'long' });
          };

          return {
            id: dep.departure_id || index,
            month: monthYear,
            fromDay: getDayOfWeek(startDate),
            fromDate: formatDate(startDate),
            toDay: getDayOfWeek(endDate),
            toDate: formatDate(endDate),
            status: dep.status || 'Available',
            price: parseFloat(dep.adult_price) || 0,
            // Star ratings for group tours
            threeStar: {
              twin: dep.three_star_twin ? formatPrice(dep.three_star_twin) : "NA",
              triple: dep.three_star_triple ? formatPrice(dep.three_star_triple) : "NA",
              childWithBed: dep.three_star_child_with_bed ? formatPrice(dep.three_star_child_with_bed) : "NA",
              childWithoutBed: dep.three_star_child_without_bed ? formatPrice(dep.three_star_child_without_bed) : "NA",
              infant: dep.three_star_infant ? formatPrice(dep.three_star_infant) : "NA",
              single: dep.three_star_single ? formatPrice(dep.three_star_single) : "On Request",
            },
            fourStar: {
              twin: dep.four_star_twin ? formatPrice(dep.four_star_twin) : "NA",
              triple: dep.four_star_triple ? formatPrice(dep.four_star_triple) : "NA",
              childWithBed: dep.four_star_child_with_bed ? formatPrice(dep.four_star_child_with_bed) : "NA",
              childWithoutBed: dep.four_star_child_without_bed ? formatPrice(dep.four_star_child_without_bed) : "NA",
              infant: dep.four_star_infant ? formatPrice(dep.four_star_infant) : "NA",
              single: dep.four_star_single ? formatPrice(dep.four_star_single) : "On Request",
            },
            fiveStar: {
              twin: dep.five_star_twin ? formatPrice(dep.five_star_twin) : "NA",
              triple: dep.five_star_triple ? formatPrice(dep.five_star_triple) : "NA",
              childWithBed: dep.five_star_child_with_bed ? formatPrice(dep.five_star_child_with_bed) : "NA",
              childWithoutBed: dep.five_star_child_without_bed ? formatPrice(dep.five_star_child_without_bed) : "NA",
              infant: dep.five_star_infant ? formatPrice(dep.five_star_infant) : "NA",
              single: dep.five_star_single ? formatPrice(dep.five_star_single) : "On Request",
            }
          };
        });

        return {
          type: 'Group',
          data: departureItems,
          descriptions: departureItems.map(dep => dep.description || '')
        };
      } else {
        // Individual tours - just descriptions
        const descriptions: string[] = [];
        departuresArray.forEach(dep => {
          if (dep.description && !descriptions.includes(dep.description)) {
            descriptions.push(dep.description);
          }
        });
        
        return {
          type: 'Individual',
          data: [],
          descriptions: descriptions.length > 0 ? descriptions : ["No description available."]
        };
      }
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
          remarks: basicDetails.cost_remarks ? [basicDetails.cost_remarks] : []
        };
      }

      return {
        tableData: [],
        remarks: basicDetails.cost_remarks ? [basicDetails.cost_remarks] : []
      };
    };

    // Process Optional Tours
    const processOptionalTours = (optionalToursArray: any[]) => {
      if (optionalToursArray && optionalToursArray.length > 0) {
        return optionalToursArray.map(tour => ({
          tourName: tour.tour_name || '',
          adultPrice: formatPrice(tour.adult_price),
          childPrice: formatPrice(tour.child_price)
        }));
      }
      return [];
    };

    // Process EMI Options
    const processEMIOptions = (emiOptionsArray: any[]) => {
      if (emiOptionsArray && emiOptionsArray.length > 0) {
        return {
          loanAmount: formatPrice(emiOptionsArray[0]?.loan_amount || '0'),
          options: emiOptionsArray.map((option: any) => ({
            particulars: option.particulars || 'Per Month Payment',
            months: option.months || 0,
            emi: formatPrice(option.emi)
          }))
        };
      }
      return {
        loanAmount: formatPrice(0),
        options: []
      };
    };

    // Process booking POI
    const processBooking = (bookingArray: any[]) => {
      if (bookingArray && bookingArray.length > 0) {
        return {
          items: bookingArray.map(item => item.item || ''),
          amountDetails: bookingArray.map(item => item.amount_details || '0')
        };
      }
      return {
        items: ["Standard booking terms apply"],
        amountDetails: ["0"]
      };
    };

    // Process hotels data
    const processHotels = (hotelsArray: any[], basicDetails: any) => {
      if (hotelsArray && hotelsArray.length > 0) {
        return {
          tableData: hotelsArray.map(hotel => ({
            city: hotel.city,
            hotelName: hotel.hotel_name,
            roomType: hotel.room_type,
            nights: `${hotel.nights} Night${hotel.nights > 1 ? 's' : ''}`
          })),
          remarks: basicDetails.hotel_remarks ? [basicDetails.hotel_remarks] : []
        };
      }
      return {
        tableData: [],
        remarks: basicDetails.hotel_remarks ? [basicDetails.hotel_remarks] : []
      };
    };

    // Process transport data
    const processTransport = (transportArray: any[], basicDetails: any) => {
      if (transportArray && transportArray.length > 0) {
        return {
          tableData: transportArray.map(transport => ({
            airline: transport.airline || transport.carrier || '',
            flightNo: transport.flight_no || transport.number_code || '-',
            from: transport.from_city || '',
            to: transport.to_city || '',
            depDate: transport.from_date ? new Date(transport.from_date).toLocaleDateString() : '',
            depTime: transport.from_time || '',
            arrDate: transport.to_date ? new Date(transport.to_date).toLocaleDateString() : '',
            arrTime: transport.to_time || '',
            description: transport.description || ''
          })),
          remarks: basicDetails.transport_remarks ? [basicDetails.transport_remarks] : []
        };
      }
      return {
        tableData: [],
        remarks: basicDetails.transport_remarks ? [basicDetails.transport_remarks] : []
      };
    };

    // Process cancellation policies
    const processCancellation = (policiesArray: any[]) => {
      if (policiesArray && policiesArray.length > 0) {
        return {
          policies: policiesArray.map(policy => 
            policy.cancellation_policy || 
            `${policy.days_min}-${policy.days_max} days before travel: ${policy.charge_percentage}% cancellation charge`
          ),
          charges: policiesArray.map(policy => {
            const charge = policy.charges || '';
            if (charge && !isNaN(charge)) {
              return `₹${parseFloat(charge).toLocaleString('en-IN')}`;
            }
            return charge || '';
          })
        };
      }
      return {
        policies: [],
        charges: []
      };
    };

    return {
      // Basic info
      title: basic_details.title,
      duration: formatDuration(basic_details.duration_days),
      price: formatPrice(basic_details.base_price_adult),
      emi: calculateEMI(basic_details.base_price_adult),
      badge: getBadge(basic_details.category_id || 1),
      code: basic_details.tour_code,
      description: basic_details.overview,
      
      // Tab data
      images: getImages(images),
      itinerary: processItinerary(itinerary),
      departures: processDepartures(departures, tour_type),
      inclusionExclusion: {
        inclusions: inclusions || [],
        exclusions: exclusions || []
      },
      hotels: processHotels(hotels, basic_details),
      airlines: processTransport(transport, basic_details),
      tourCost: processTourCost(costs, basic_details),
      optionalTours: processOptionalTours(optional_tours),
      emiOptions: processEMIOptions(emi_options),
      booking: processBooking(booking_poi),
      cancellation: processCancellation(cancellation_policies),
      instructions: instructions || [],
      tourType: tour_type || 'Individual'
    };
  };

  // Fetch tour details
  const fetchTourDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // First try to fetch as Individual tour
      let response = await fetch(`${BASE_URL}/api/tours/tour/full/individual/${tourId}`);
      
      if (!response.ok) {
        // If not found as Individual, try as Group
        response = await fetch(`${BASE_URL}/api/tours/tour/full/group/${tourId}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch tour details: ${response.status}`);
        }
      }
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error('Failed to fetch tour data');
      }
      
      const processedData = processTourData(data);

      console.log("processedData", processedData)
      setTour(processedData);
      setTourType(data.tour_type || 'Individual');
      
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
    setSelectedMonth("ALL");
    setOpenIndex(null);
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

  // Toggle function for showing/hiding table in group tours
  const toggleTable = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Filter departure data based on selected month for group tours
  const filteredDepartureData = tour?.departures?.type === 'Group' 
    ? (selectedMonth === "ALL" 
        ? tour.departures.data 
        : tour.departures.data.filter((d: any) => d.month === selectedMonth))
    : [];

    // Build Month → Departures map
const departuresByMonth = React.useMemo(() => {
  const map = {};
  filteredDepartureData.forEach(dep => {
    if (!map[dep.month]) map[dep.month] = [];
    map[dep.month].push(dep);
  });
  return map;
}, [filteredDepartureData]);

const availableMonths = Object.keys(departuresByMonth);

// Dates for selected month
const availableDates =
  selectedCostMonth && departuresByMonth[selectedCostMonth]
    ? departuresByMonth[selectedCostMonth]
    : [];

// Selected departure (used for table)
const selectedDeparture = availableDates.find(
  d => d.fromDate === selectedCostDate
);

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
                  <h3 className="font-bold text-white text-start text-lg">Tour Code</h3>
                </div>  

                <div className="col-span-6 border-r border-white bg-[#2E3a8a] px-4 py-3">
                  <h3 className="font-bold text-white text-start text-lg">Tour Name</h3>
                </div>

                <div className="px-4 py-3 bg-[#2E3a8a]">
                  <h3 className="font-bold text-white text-start text-lg">Days</h3>
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

            <div className="bg-[#2E4D98] rounded-md shadow-sm p-4">
              {/* Itinerary Tab */}
{activeTab === "itinerary" && (
  <div className="bg-[#C2E2FA] rounded-lg p-1 h-full">
    <div className="mx-auto bg-white rounded-lg shadow-lg h-full flex flex-col min-h-0">
      <div className="bg-red-600 text-white text-center font-bold text-2xl py-2 rounded-t-lg flex-shrink-0">
        Tour Itinerary
      </div>
      <div className="border-2 border-[#1e3a8a] border-t-0 overflow-hidden rounded-b-lg flex-1 min-h-0">
        <div className="bg-[#FFEBEE] h-full overflow-hidden">
          <div className="space-y-1 p-1 h-full overflow-y-auto">
            {tour.itinerary.slice(0, Math.min(tour.itinerary.length, 100)).map((day: any, index: number) => (
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
              {/* Dep Date Tab - Different for Group vs Individual */}
              {activeTab === "dep-date" && (
                tour.departures.type === 'Group' ? (
                  // Group Tour Departure Dates
                  <div className="bg-[#E8F0FF] rounded-lg p-1 w-full">
                    <div className="bg-red-600 text-white text-center font-bold text-2xl py-2.5 rounded-t-lg w-full">
                      Departure Dates
                    </div>
                    
                    <div className="border-2 border-t-0 border-[#1e3a8a] rounded-b-lg w-full flex flex-col min-h-[680px] max-h-[780px] overflow-hidden">
                      <div className="flex-1 overflow-y-auto p-2 bg-[#FFEBEE] w-full">
                        <div className="flex flex-wrap gap-2 mb-2">
                          <div className="flex flex-wrap gap-2 mb-1">
                            {monthTabs.map((tab) => (
                              <button
                                key={tab}
                                onClick={() => setSelectedMonth(tab)}
                                className={`
                                  px-3 py-2 
                                  border-2 
                                  font-semibold
                                  text-center
                                  w-32
                                  transition-all
                                  duration-200
                                  ${selectedMonth === tab
                                    ? "bg-blue-100 border-blue-600 text-blue-800 shadow-md"
                                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                                  }
                                `}
                              >
                                {tab}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Departure Cards */}
                        <div className="space-y-4 w-full">
                          {filteredDepartureData.map((item: any, index: number) => (
                            <div key={item.id || index} className="border border-2 border-black p-4 bg-white space-y-4">
                              {/* MAIN CARD */}
                              <div className="grid grid-cols-5 items-center">
                                <div>
                                  <p className="text-gray-500">{item.fromDay}</p>
                                  <p className="font-semibold">{item.fromDate}</p>
                                </div>

                                <div>
                                  <p className="text-gray-500">{item.toDay}</p>
                                  <p className="font-semibold">{item.toDate}</p>
                                </div>

                                <div className="text-blue-700 font-semibold">{item.status}</div>

                                <div className="text-lg font-bold text-gray-900">
                                  {formatPrice(item.price)}
                                </div>

                                <button
                                  onClick={() => toggleTable(index)}
                                  className="bg-[#003366] text-white px-6 py-2 hover:bg-[#002244] transition-colors"
                                >
                                  {openIndex === index ? "Hide Table" : "Select"}
                                </button>
                              </div>

                              {/* TABLE SHOW WHEN BUTTON CLICKED */}
                              {openIndex === index && (
                                <div className="border-2 border-black overflow-hidden animate-fadeIn">
                                  {/* HEADER */}
                                  <div className="grid grid-cols-4 bg-[#0A1D4A] text-white font-semibold text-center">
                                    <div className="p-2 border-r-2 border-white">Particulars - Tour Cost</div>
                                    <div className="p-2 border-r-2 border-white">3 Star</div>
                                    <div className="p-2 border-r-2 border-white">4 Star</div>
                                    <div className="p-2">5 Star</div>
                                  </div>

                                  {/* ROWS */}
                                  {[
                                    { particular: "Per pax on Twin Basis", star3: item.threeStar.twin, star4: item.fourStar.twin, star5: item.fiveStar.twin },
                                    { particular: "Per pax on Triple Basis", star3: item.threeStar.triple, star4: item.fourStar.triple, star5: item.fiveStar.triple },
                                    { particular: "Child with Bed", star3: item.threeStar.childWithBed, star4: item.fourStar.childWithBed, star5: item.fiveStar.childWithBed },
                                    { particular: "Child without Bed", star3: item.threeStar.childWithoutBed, star4: item.fourStar.childWithoutBed, star5: item.fiveStar.childWithoutBed },
                                    { particular: "Infant", star3: item.threeStar.infant, star4: item.fourStar.infant, star5: item.fiveStar.infant },
                                    { particular: "Per pax Single Occupancy", star3: item.threeStar.single, star4: item.fourStar.single, star5: item.fiveStar.single },
                                  ].map((row, i) => (
                                    <div
                                      key={i}
                                      className={`grid grid-cols-4 text-center border-b-2 border-black ${
                                        i % 2 === 0 ? "bg-[#EEF1F7]" : "bg-white"
                                      } ${i === 5 ? 'border-b-0' : ''}`}
                                    >
                                      <div className="p-2 border-r-2 border-black font-medium">
                                        {row.particular}
                                      </div>
                                      <div className="p-2 border-r-2 border-black">
                                        {row.star3}
                                      </div>
                                      <div className="p-2 border-r-2 border-black font-semibold text-green-700">
                                        {row.star4}
                                      </div>
                                      <div className="p-2">
                                        {row.star5}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Individual Tour Departure Descriptions
                  <div className="bg-[#E8F0FF] rounded-lg p-1 w-full">
                    <div className="bg-red-600 text-white text-center font-bold text-2xl py-2.5 rounded-t-lg w-full">
                      Departure Dates
                    </div>
                    
                    <div className="border-2 border-t-0 border-[#1e3a8a] rounded-b-lg w-full flex flex-col min-h-[280px] max-h-[280px] overflow-hidden">
                      <div className="flex-1 overflow-y-auto p-2 bg-[#FFEBEE] w-full">
                        <div className="space-y-4 w-full">
                          {tour.departures.descriptions.map((description: string, index: number) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-2 bg-white w-full">
                              <div className="flex items-start w-full">
                                <div className="flex-1 min-w-0">
                                  <p className="text-gray-700 break-words whitespace-pre-wrap text-justify w-full">
                                    {description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}

              {/* Tour Cost Tab */}
              {/* Tour Cost Tab */}
{activeTab === "tour-cost" && (
  <div className="bg-[#E8F0FF] rounded-lg p-1">
    <div className="bg-red-600 text-white text-center font-bold text-2xl py-2.5 rounded-t-lg mb-1.5">
      Tour Cost
    </div>
    
    <div className="border rounded-b-lg rounded-t overflow-hidden -mt-1">
      {/* Group Tour Cost Section - Show only for Group tours */}
      {tourType === 'Group' && (
        <div className="mb-4">
          {/* Month and Date Selection */}
          <div className="p-4 mb-4 border-2 border-black rounded-lg">
           <div className="grid grid-cols-2 gap-4 mb-4">
  {/* MONTH */}
  <div>
    <label className="block text-gray-700 font-bold mb-2">Month</label>
    <select
      className="w-full border-2 border-black rounded-md px-3 py-2 bg-white"
      value={selectedCostMonth}
      onChange={(e) => {
        setSelectedCostMonth(e.target.value);
        setSelectedCostDate(""); // reset date
      }}
    >
      <option value="">Select Month</option>
      {availableMonths.map(month => (
        <option key={month} value={month}>
          {month}
        </option>
      ))}
    </select>
  </div>

  {/* DATE */}
  <div>
    <label className="block text-gray-700 font-bold mb-2">Date</label>
    <select
      className="w-full border-2 border-black rounded-md px-3 py-2 bg-white"
      value={selectedCostDate}
      onChange={(e) => setSelectedCostDate(e.target.value)}
      disabled={!selectedCostMonth}
    >
      <option value="">Select Date</option>
      {availableDates.map(dep => (
        <option key={dep.id} value={dep.fromDate}>
          {dep.fromDate} – {dep.toDate}
        </option>
      ))}
    </select>
  </div>
</div>

            
            {/* Tour Cost Table for Group Tours */}
            {/* NOTE: You need to get the data from departure dates based on selection */}
            {/* For now, showing placeholder or first departure's data */}
            {selectedDeparture? (
              <div className="border-2 border-black overflow-hidden animate-fadeIn">
                {/* HEADER */}
                <div className="grid grid-cols-4 bg-[#0A1D4A] text-white font-semibold text-center">
                  <div className="p-2 border-r-2 border-white">Particulars</div>
                  <div className="p-2 border-r-2 border-white">Gross Rate</div>
                  <div className="p-2 border-r-2 border-white">Part Payment Discount</div>
                  <div className="p-2">Full Payment Discount</div>
                </div>

                {/* ROWS - Using first departure data */}
                {[
                  { particular: "Per pax on Twin Basis", 
                    star3: filteredDepartureData[0].threeStar.twin, 
                    star4: filteredDepartureData[0].fourStar.twin, 
                    star5: filteredDepartureData[0].fiveStar.twin 
                  },
                  { particular: "Per pax on Triple Basis", 
                    star3: filteredDepartureData[0].threeStar.triple, 
                    star4: filteredDepartureData[0].fourStar.triple, 
                    star5: filteredDepartureData[0].fiveStar.triple 
                  },
                  { particular: "Child with Bed", 
                    star3: filteredDepartureData[0].threeStar.childWithBed, 
                    star4: filteredDepartureData[0].fourStar.childWithBed, 
                    star5: filteredDepartureData[0].fiveStar.childWithBed 
                  },
                  { particular: "Child without Bed", 
                    star3: filteredDepartureData[0].threeStar.childWithoutBed, 
                    star4: filteredDepartureData[0].fourStar.childWithoutBed, 
                    star5: filteredDepartureData[0].fiveStar.childWithoutBed 
                  },
                  { particular: "Infant", 
                    star3: filteredDepartureData[0].threeStar.infant, 
                    star4: filteredDepartureData[0].fourStar.infant, 
                    star5: filteredDepartureData[0].fiveStar.infant 
                  },
                  { particular: "Per pax Single Occupancy", 
                    star3: filteredDepartureData[0].threeStar.single, 
                    star4: filteredDepartureData[0].fourStar.single, 
                    star5: filteredDepartureData[0].fiveStar.single 
                  },
                ].map((row, i) => (
                  <div
                    key={i}
                    className={`grid grid-cols-4 text-center border-b-2 border-black ${
                      i % 2 === 0 ? "bg-[#EEF1F7]" : "bg-white"
                    } ${i === 5 ? 'border-b-0' : ''}`}
                  >
                    <div className="p-2 border-r-2 border-black font-medium">
                      {row.particular}
                    </div>
                    <div className="p-2 border-r-2 border-black">
                      {row.star3}
                    </div>
                    <div className="p-2 border-r-2 border-black font-semibold text-green-700">
                      {row.star4}
                    </div>
                    <div className="p-2">
                      {row.star5}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-4 border-2 border-dashed border-gray-300 rounded-lg">
                <p className="text-gray-500">No departure data available for selected filters</p>
                <p className="text-gray-400 text-sm mt-2">Please select a departure date from the "Dep Date" tab first</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Rest of your existing Tour Cost Tab code remains the same... */}
      {/* Passenger Table */}
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
            {tour.tourCost.tableData.length > 0 ? (
              tour.tourCost.tableData.map((row: any, index: number) => (
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
              ))
            ) : (
              <tr className="bg-[#FFEBEE]">
                <td colSpan={6} className="border-2 border-[#1e3a8a] px-4 py-3 text-center text-gray-500">
                  {tourType === 'Group' 
                    ? 'Cost details available in departure dates section'
                    : 'No cost information available'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Optional Tour Section (only if has data) */}
      {tour.optionalTours && tour.optionalTours.length > 0 && (
        <div className='mb-1 mt-1'>
          <div className="bg-red-600 text-white text-center font-bold text-xl rounded-t-lg py-3 mb-1">
            Optional Tour
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#2E4D98]">
                  <th className="border border-white px-4 py-3 text-left font-semibold text-white w-[70%]">
                    Tour Name
                  </th>
                  <th className="border border-white px-4 py-3 text-left font-semibold text-white w-[15%]">
                    Adult Price
                  </th>
                  <th className="border border-white px-4 py-3 text-left font-semibold text-white w-[15%]">
                    Child Price
                  </th>
                </tr>
              </thead>
              <tbody className="border-2 border-[#1e3a8a] border-t-0">
                {tour.optionalTours.map((optTour: any, index: number) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-[#FFEBEE]" : "bg-[#FFEBEE]/80"}>
                    <td className="border border-black px-4 py-2">{optTour.tourName}</td>
                    <td className="border border-black px-4 py-2 border-l-0">{optTour.adultPrice}</td>
                    <td className="border border-black px-4 py-2 border-l-0">{optTour.childPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* EMI Options Section (only if has data) */}
      {tour.emiOptions && tour.emiOptions.options && tour.emiOptions.options.length > 0 && (
        <div className='mb-1 mt-1'>
          <div className="bg-red-600 text-white text-center font-bold text-xl rounded-t-lg py-3 mb-1">
            EMI Options
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#2E4D98]">
                  <th className="border border-white px-4 py-3 text-left font-semibold text-white w-[55%]">
                    Particulars
                  </th>
                  <th className="border border-white px-4 py-3 text-center font-semibold text-white w-[15%]">
                    Loan Amount
                  </th>
                  <th className="border border-white px-4 py-3 text-center font-semibold text-white w-[15%]">
                    Months
                  </th>
                  <th className="border border-white px-4 py-3 text-center font-semibold text-white w-[15%]">
                    EMI
                  </th>
                </tr>
              </thead>
              <tbody className="border-2 border-[#1e3a8a] border-t-0">
                {tour.emiOptions.options.map((emi: any, index: number) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-[#FFEBEE]" : "bg-[#FFEBEE]/80"}>
                    <td className="border border-black px-4 py-2 font-bold text-base">
                      {emi.particulars}
                    </td>
                    <td className="border border-black px-4 py-2 border-l-0 text-center">
                      {tour.emiOptions.loanAmount}
                    </td>
                    <td className="border border-black px-4 py-2 border-l-0 text-center">
                      {emi.months}
                    </td>
                    <td className="border border-black px-4 py-2 border-l-0 text-center">
                      {emi.emi}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

<div className="flex gap-1 mt-1 w-full">
  {/* Tour Cost Remarks - Always show */}
  <div className="bg-[#E8F0FF] rounded-lg w-1/2 overflow-x-hidden">
    <div className="bg-red-600 text-white text-center font-bold text-2xl py-2.5 rounded-t-lg w-full">
      Tour Cost Remarks
    </div>
    <div className="border-2 border-[#1e3a8a] border-t-0 overflow-hidden rounded-b-lg w-full">
      <div className="min-h-[180px] max-h-[180px] overflow-y-auto p-2 bg-[#FFEBEE] w-full">
        {tour.tourCost.remarks && tour.tourCost.remarks.length > 0 ? (
          <ul className="space-y-2 w-full">
            {tour.tourCost.remarks.map((remark: string, index: number) => (
              <li key={index} className="flex items-start gap-2 w-full">
                <span className="text-gray-700 whitespace-pre-wrap break-words hyphens-auto text-justify w-full">
                  {remark}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-gray-500 italic">No remarks available</span>
          </div>
        )}
      </div>
    </div>
  </div>

  {/* Additional Remarks - Always show */}
  <div className="bg-[#E8F0FF] rounded-lg w-1/2 overflow-x-hidden">
    <div className="bg-red-600 text-white text-center font-bold text-2xl py-2.5 rounded-t-lg w-full">
      Tour Cost EMI
    </div>
    <div className="border-2 border-[#1e3a8a] border-t-0 overflow-hidden rounded-b-lg w-full">
      <div className="min-h-[180px] max-h-[180px] overflow-y-auto p-2 bg-[#FFEBEE] w-full">
        {tour.additionalRemarks && tour.additionalRemarks.length > 0 ? (
          <ul className="space-y-2 w-full">
            {tour.additionalRemarks.map((remark: string, index: number) => (
              <li key={index} className="flex items-start gap-2 w-full">
                <span className="text-gray-700 whitespace-pre-wrap break-words hyphens-auto text-justify w-full">
                  {remark}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-gray-500 italic">No remarks available</span>
          </div>
        )}
      </div>
    </div>
  </div>
</div>
    </div>
  </div>
)}

              {/* Cost In/Cost Ex Tab */}
              {activeTab === "cost-inc./cost-ex." && (
                <div className="bg-[#E8F0FF] rounded-lg p-1 w-full overflow-x-hidden">
                  <div className="bg-red-600 text-white text-center font-bold text-2xl py-2.5 rounded-t-lg mb-1 w-full">
                    Cost Inclusive & Cost Excludes
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 w-full">
                    {/* Cost Includes */}
                    <div className="flex flex-col w-full min-h-[280px] max-h-[320px]">
                      <div className="bg-[#2E4D98] text-white text-center py-3 rounded-t-lg w-full">
                        <h3 className="text-xl font-bold">Cost Inclusive</h3>
                      </div>
                      <div className="flex-1 border-2 border-[#1e3a8a] rounded-b-lg bg-[#FFEBEE] w-full overflow-hidden min-h-0">
                        <div className="h-full overflow-y-auto p-2">
                          <ul className="space-y-2 w-full">
                            {tour.inclusionExclusion.inclusions.map((inclusion: any, index: number) => (
                              <li key={index} className="w-full">
                                <div className="flex items-start gap-0 w-full">
                                  <div className="text-gray-700 flex-1 min-w-0 text-justify break-words ml-2">
                                    {inclusion.item || inclusion}
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    {/* Cost Excludes */}
                    <div className="flex flex-col w-full min-h-[280px] max-h-[320px]">
                      <div className="bg-[#2E4D98] text-white text-center py-3 rounded-t-lg w-full">
                        <h3 className="text-xl font-bold">Cost Excludes</h3>
                      </div>
                      <div className="flex-1 border-2 border-[#1e3a8a] rounded-b-lg bg-[#FFEBEE] w-full overflow-hidden min-h-0">
                        <div className="h-full overflow-y-auto p-2">
                          <ul className="space-y-2 w-full">
                            {tour.inclusionExclusion.exclusions.map((exclusion: any, index: number) => (
                              <li key={index} className="w-full">
                                <div className="flex items-start gap-0 w-full">
                                
                                  <div className="text-gray-700 flex-1 min-w-0 text-justify break-words ml-2">
                                    {exclusion.item || exclusion}
                                  </div>
                                </div>
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
                <div className="bg-[#E8F0FF] rounded-lg p-0.2 w-full overflow-x-hidden">
                  {/* Flights Section */}
                  <div className="bg-[#FFEBEE] rounded-lg p-1 mb-1 w-full">
                    <div className="bg-red-600 text-white text-center font-bold text-2xl py-2.5 rounded-t-lg w-full">
                      Flights / Train or Transport Details
                    </div>
  
                    <div className="border-2 border-[#1e3a8a] rounded-t-none border-t-0 rounded-lg overflow-hidden w-full">
                      <div className="min-h-[300px] max-h-[400px] overflow-y-auto p-1 bg-[#FFEBEE] w-full">
                        {tourType === 'Group' ? (
                          // ===== GROUP TOUR - TABLE STRUCTURE =====
                          <div className="overflow-x-auto border shadow-sm">
                            <table className="w-full border-collapse table-fixed">
                              {/* ===== TABLE HEADER ===== */}
                              <thead>
                                <tr className="bg-[red]">
                                  <th className="border border-black px-3 py-3 text-left font-semibold text-white text-base h-9 w-1/9">
                                    Airlines
                                  </th>
                                  <th className="border border-black px-4 py-3 text-left font-semibold text-white text-base h-9 w-1/9">
                                    Flight No
                                  </th>
                                  <th className="border border-black px-4 py-3 text-left font-semibold text-white text-base h-9 w-1/9">
                                    From
                                  </th>
                                  <th className="border border-black px-4 py-3 text-left font-semibold text-white text-base h-9 w-1/9">
                                    Date
                                  </th>
                                  <th className="border border-black px-4 py-3 text-left font-semibold text-white text-base h-9 w-1/9">
                                    Time
                                  </th>
                                  <th className="border border-black px-4 py-3 text-left font-semibold text-white text-base h-9 w-1/9">
                                    To
                                  </th>
                                  <th className="border border-black px-4 py-3 text-left font-semibold text-white text-base h-9 w-1/9">
                                    Date
                                  </th>
                                  <th className="border border-black px-4 py-3 text-left font-semibold text-white text-base h-9 w-1/9">
                                    Time
                                  </th>
                                  <th className="border border-black px-4 py-3 text-left font-semibold text-white text-base h-9 w-1/9">
                                    Via
                                  </th>
                                </tr>
                              </thead>

                              {/* ===== TABLE BODY - DYNAMIC DATA ===== */}
                              <tbody>
                                {tour.airlines.tableData && tour.airlines.tableData.length > 0 ? (
                                  tour.airlines.tableData.map((flight: any, index: number) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-[#FFEBEE]' : 'bg-[#FFEBEE]/80'}>
                                      <td className="border border-black px-4 py-3 text-center h-9 w-1/9">
                                        {flight.airline || ''}
                                      </td>
                                      <td className="border border-black px-4 py-3 text-center h-9 w-1/9">
                                        {flight.flightNo || ''}
                                      </td>
                                      <td className="border border-black px-4 py-3 text-center h-9 w-1/9">
                                        {flight.from || ''}
                                      </td>
                                      <td className="border border-black px-4 py-3 text-center h-9 w-1/9">
                                        {flight.depDate || ''}
                                      </td>
                                      <td className="border border-black px-4 py-3 text-center h-9 w-1/9">
                                        {flight.depTime || ''}
                                      </td>
                                      <td className="border border-black px-4 py-3 text-center h-9 w-1/9">
                                        {flight.to || ''}
                                      </td>
                                      <td className="border border-black px-4 py-3 text-center h-9 w-1/9">
                                        {flight.arrDate || ''}
                                      </td>
                                      <td className="border border-black px-4 py-3 text-center h-9 w-1/9">
                                        {flight.arrTime || ''}
                                      </td>
                                      <td className="border border-black px-4 py-3 text-center h-9 w-1/9">
                                        {/* You might want to add a 'via' field to your data or handle it differently */}
                                        {flight.via || ''}
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  // Show empty rows if no data
                                  [1, 2, 3, 4].map((row, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-[#FFEBEE]' : 'bg-[#FFEBEE]/80'}>
                                      <td className="border border-black px-4 py-3 text-center h-9 w-1/9">&nbsp;</td>
                                      <td className="border border-black px-4 py-3 text-center h-9 w-1/9">&nbsp;</td>
                                      <td className="border border-black px-4 py-3 text-center h-9 w-1/9">&nbsp;</td>
                                      <td className="border border-black px-4 py-3 text-center h-9 w-1/9">&nbsp;</td>
                                      <td className="border border-black px-4 py-3 text-center h-9 w-1/9">&nbsp;</td>
                                      <td className="border border-black px-4 py-3 text-center h-9 w-1/9">&nbsp;</td>
                                      <td className="border border-black px-4 py-3 text-center h-9 w-1/9">&nbsp;</td>
                                      <td className="border border-black px-4 py-3 text-center h-9 w-1/9">&nbsp;</td>
                                      <td className="border border-black px-4 py-3 text-center h-9 w-1/9">&nbsp;</td>
                                    </tr>
                                  ))
                                )}
                              </tbody>
                            </table>
                            
                            {/* ===== DESCRIPTION AREA FOR GROUP TOURS ===== */}
                            {tour.airlines.tableData && tour.airlines.tableData.some((flight: any) => flight.description) && (
                              <div className="mt-4 p-4 bg-[#E8F0FF]  border border-gray-200 rounded-lg">
                                <h4 className="font-bold text-lg mb-3 text-center text-red-600">Additional Information</h4>
                                <div className="space-y-4">
                                  {tour.airlines.tableData.map((flight: any, index: number) => (
                                    flight.description && (
                                      <div key={index} className="border border-gray-300 rounded p-3 bg-gray-50">
                                        <div className="flex items-start mb-2">
                                          <span className="font-bold mr-2">Transport {index + 1}:</span>
                                          <span>{flight.airline} - {flight.flightNo}</span>
                                        </div>
                                        <p className="text-gray-700 whitespace-pre-wrap">{flight.description}</p>
                                      </div>
                                    )
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          // ===== INDIVIDUAL TOUR - LIST/BOX LAYOUT =====
                          <div>
                            {tour.airlines.tableData && tour.airlines.tableData.length > 0 ? (
                              <div className="space-y-4 w-full">
                                {tour.airlines.tableData.map((flight: any, index: number) => (
                                  <div key={index} className="border border-gray-200 rounded-lg p-1 bg-white w-full overflow-hidden shadow-sm">
                                    
                                    {flight.description && (
                                      <div className="  border-gray-300">
                                        <p className="text-gray-600 bg-gray-50 p-2 rounded whitespace-pre-wrap">
                                          {flight.description}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="flex items-center justify-center h-full min-h-[200px]">
                                <p className="text-gray-500 text-lg">No transport information available</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>


                  {/* Hotels Section */}
                <div className='p-1 -mt-2 w-full overflow-x-hidden'>
  <div className="bg-red-600 text-white text-center font-bold text-xl rounded-t-lg py-3 mb-1 w-full">
    Hotel Details
  </div>
  
  <div className="overflow-x-auto w-full">
    {tour.hotels.tableData.length > 0 ? (
      <table className="w-full border-collapse min-w-max">
        <thead>
          <tr className="bg-[#2E4D98]">
            <th className="border border-white px-2 py-2 text-left text-white w-[14.28%]">
              City
            </th>
            <th className="border border-white px-2 py-2 text-left text-white w-[14.28%]">
              Hotel Name
            </th>
            <th className="border border-white px-2 py-2 text-left text-white w-[14.28%]">
              Standard
            </th>
            <th className="border border-white px-2 py-2 text-left text-white w-[14.28%]">
              Deluxe 
            </th>
            <th className="border border-white px-2 py-2 text-left text-white w-[14.28%]">
              Executive 
            </th>
            <th className="border border-white px-2 py-2 text-left text-white w-[14.28%]">
              Room Type
            </th>
            <th className="border border-white px-2 py-2 text-left text-white w-[14.28%]">
              Nights
            </th>
          </tr>
        </thead>
        <tbody className="border-2 border-[#1e3a8a] border-t-0">
          {tour.hotels.tableData.map((hotel: any, index: number) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-[#FFEBEE]" : "bg-[#FFEBEE]/80"}
            >
              <td className="border border-black px-2 py-2 break-all whitespace-pre-wrap">{hotel.city}</td>
              <td className="border border-black px-2 py-2 break-all whitespace-pre-wrap">{hotel.hotelName}</td>
              <td className="border border-black px-2 py-2 break-all whitespace-pre-wrap">
                {hotel.standard || hotel.standardPrice || "N/A"}
              </td>
              <td className="border border-black px-2 py-2 break-all whitespace-pre-wrap">
                {hotel.deluxe || hotel.deluxePrice || "N/A"}
              </td>
              <td className="border border-black px-2 py-2 break-all whitespace-pre-wrap">
                {hotel.executive || hotel.executivePrice || "N/A"}
              </td>
              <td className="border border-black px-2 py-2 break-all whitespace-pre-wrap">{hotel.roomType}</td>
              <td className="border border-black px-2 py-2 break-all whitespace-pre-wrap">{hotel.nights}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <div className="border-2 border-[#1e3a8a] p-4 bg-white rounded-lg">
        <p className="text-gray-500 text-center">No hotel information available</p>
      </div>
    )}
  </div>

  {/* Combined Remarks Section */}
  {(tour.hotels.remarks.length > 0 || tour.airlines.remarks.length > 0) && (
    <div className="bg-[#E8F0FF] rounded-lg mt-1 w-full overflow-x-hidden">
      <div className="bg-red-600 text-white text-center font-bold text-xl py-3 rounded-t-lg w-full">
        Hotel Remarks
      </div>
      
      <div className="border-2 border-t-0 border-[#1e3a8a] rounded-b-lg overflow-hidden w-full">
        <div className="min-h-[150px] max-h-[200px] overflow-y-auto p-2 bg-[#FFEBEE] w-full">
          <ul className="space-y-2 w-full">
            {[...tour.hotels.remarks, ...tour.airlines.remarks].map((remark: string, index: number) => (
              <li key={index} className="flex items-start gap-1 w-full">
                <span className="text-gray-700 break-words whitespace-pre-wrap text-justify w-full">
                  {remark}
                </span>
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

              {/* Bookings POI Tab */}
              {activeTab === "bookings-poi" && (
                <div className="bg-[#E8F0FF] rounded-lg p-1">
                  <div className="bg-red-600 text-white text-center font-bold text-2xl py-2.5 rounded-t-lg mb-1">
                    Booking Policy
                  </div>
                    
                  <div className="flex flex-col lg:flex-row gap-1 mt-1 h-[320px]">
                    {/* Left Card - Booking Policy - 80% width */}
                    <div className="h-full w-full lg:w-4/5 flex flex-col">
                      <div className="bg-[#2E4D98] text-white text-center py-3 rounded-t-lg">
                        <h3 className="text-xl font-bold">Booking Policy</h3>
                      </div>
                      <div className="flex-1 border-x-2 border-b-2 border-[#1e3a8a] rounded-b-lg bg-white overflow-hidden">
                        <div className="h-full overflow-y-auto">
                          <div className="p-1 space-y-1">
                            {tour.booking.items.map((item: string, index: number) => (
                              <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-300">
                                <span className="text-gray-700 text-sm whitespace-normal text-justify w-full">
                                  {item}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Right Card - Amount Details - 20% width */}
                    <div className="h-full w-full lg:w-1/5 flex flex-col">
                      <div className="bg-[#2E4D98] text-white text-center py-3 rounded-t-lg">
                        <h3 className="text-xl font-bold">Amount Details</h3>
                      </div>
                      <div className="flex-1 border-x-2 border-b-2 border-[#1e3a8a] rounded-b-lg bg-white overflow-hidden">
                        <div className="h-full overflow-y-auto">
                          <div className="p-1 grid gap-1">
                            {tour.booking.amountDetails.map((amount: string, index: number) => (
                              <div key={index} className="flex items-center justify-center p-3 bg-white rounded-lg border border-blue-300">
                                <div className="text-center w-full">
                                  <span className="text-sm font-bold text-green-600">
                                    {amount === "Aadhaar Card" || amount === "aadhaar card" 
                                      ? "Aadhaar Card" 
                                      : amount === "Pan Card" || amount === "pan card"
                                      ? "Pan Card"
                                      : `₹${parseInt(amount.replace(/[^0-9]/g, '') || '0').toLocaleString('en-IN')}`}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                    <div className="bg-[#E8F0FF] rounded-lg w-full overflow-x-hidden mt-1">
    <div className="bg-red-600 text-white text-center font-bold text-2xl py-2.5 rounded-t-lg w-full">
     Booking Policy Remarks
    </div>
    <div className="border-2 border-[#1e3a8a] border-t-0 overflow-hidden rounded-b-lg w-full">
      <div className="min-h-[180px] max-h-[180px] overflow-y-auto p-2 bg-[#FFEBEE] w-full">
        {tour.additionalRemarks && tour.additionalRemarks.length > 0 ? (
          <ul className="space-y-2 w-full">
            {tour.additionalRemarks.map((remark: string, index: number) => (
              <li key={index} className="flex items-start gap-2 w-full">
                <span className="text-gray-700 whitespace-pre-wrap break-words hyphens-auto text-justify w-full">
                  {remark}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-gray-500 italic">No remarks available</span>
          </div>
        )}
      </div>
    </div>
  </div>
                </div>
              )}
              

              {/* Cancellation Tab */}
              {activeTab === "cancellation" && (
                <div className="bg-[#E8F0FF] rounded-lg p-1">
                  <div className="bg-red-600 text-white text-center font-bold text-2xl py-2.5 rounded-t-lg mb-1">
                    Cancellation Policy
                  </div>

                  <div className="flex flex-col lg:flex-row gap-1 mt-1 h-[320px]">
                    <div className="h-full w-full lg:w-4/5 flex flex-col">
                      <div className="bg-[#A72703] text-white text-center py-3 rounded-t-lg">
                        <h3 className="text-xl font-bold">Cancellation Policy</h3>
                      </div>
                      <div className="flex-1 border-x-2 border-b-2 border-[#1e3a8a] rounded-b-lg bg-[#E8F0FF] overflow-hidden">
                        <div className="h-full overflow-y-auto p-1">
                          <div className="space-y-1">
                            {tour.cancellation.policies.map((item: string, index: number) => (
                              <div 
                                key={index} 
                                className="flex items-start gap-3 p-3 bg-[#EAD2C0] rounded-lg border border-[#A72703]"
                              >
                                <span className="text-gray-800 text-sm whitespace-normal text-justify w-full">
                                  {item}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                    </div>

                    <div className="h-full w-full lg:w-1/5 flex flex-col">
                      <div className="bg-[#A72703] text-white text-center py-3 rounded-t-lg">
                        <h3 className="text-xl font-bold">Charges</h3>
                      </div>
                      <div className="flex-1 border-x-2 border-b-2 border-[#1e3a8a] rounded-b-lg bg-[#E8F0FF] overflow-hidden">
                        <div className="h-full overflow-y-auto p-1">
                          <div className="grid gap-1">
                            {tour.cancellation.charges.map((charge: string, index: number) => (
                              <div 
                                key={index}
                                className="flex items-center justify-center p-3 bg-[#EAD2C0] rounded-lg border border-[#A72703]"
                              >
                                <span className="text-sm font-bold text-[#A72703] text-center w-full">
                                  {charge}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                                      <div className="bg-[#E8F0FF] rounded-lg w-full overflow-x-hidden mt-1">
    <div className="bg-red-600 text-white text-center font-bold text-2xl py-2.5 rounded-t-lg w-full">
   Cancellation Policy Remarks
    </div>
    <div className="border-2 border-[#1e3a8a] border-t-0 overflow-hidden rounded-b-lg w-full">
      <div className="min-h-[180px] max-h-[180px] overflow-y-auto p-2 bg-[#FFEBEE] w-full">
        {tour.additionalRemarks && tour.additionalRemarks.length > 0 ? (
          <ul className="space-y-2 w-full">
            {tour.additionalRemarks.map((remark: string, index: number) => (
              <li key={index} className="flex items-start gap-2 w-full">
                <span className="text-gray-700 whitespace-pre-wrap break-words hyphens-auto text-justify w-full">
                  {remark}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-gray-500 italic">No remarks available</span>
          </div>
        )}
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
                    <div className="min-h-[300px] max-h-[320px] overflow-y-auto p-1 bg-[#FFEBEE]">
                      <div className="space-y-4 p-0">
                        <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
                          <ul className="space-y-2 text-gray-700">
                            {tour.instructions.map((instruction: any, index: number) => (
                              <li key={index} className="text-justify whitespace-normal">
                                {instruction.item || instruction}
                              </li>
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
            <div className="flex justify-end mt-1 gap-0.5">
              <div className="w-32 border border-green-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <button className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-3 flex items-center justify-center gap-2 transition-colors text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download
                </button>
              </div>

              <div className="w-32 border border-blue-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-3 flex items-center justify-center gap-2 transition-colors text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email
                </button>
              </div>

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