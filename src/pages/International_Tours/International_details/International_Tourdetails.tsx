import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ChevronRight, Check, X } from 'lucide-react';
import Header from '@/components/Header';
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import Footer from '@/components/Footer';
import { PDFDownloadLink } from '@react-pdf/renderer';
import TourPdfDocument from './../../TourPdfDocument'; 
import { Download } from 'lucide-react'; 

// DayCard Component (keeping as is)
const DayCard = ({ dayNumber, headerColor, bodyColor, dayData }) => {
  const [meals, setMeals] = useState({ B: false, L: false, D: false });

  // Parse meals from dayData
  React.useEffect(() => {
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
      <div className="flex gap-1 mb-1">
        <div className={`${headerColor} text-white font-bold px-4 py-2 rounded-lg text-start w-[120px] flex-shrink-0 border border-black`}>
          {dayNumber}
        </div>
        
        <div className={`${headerColor} text-white font-bold px-4 py-2 rounded-lg flex-1 min-w-0 border border-black`}>
          <div className="truncate">{dayData?.title || "Day Details"}</div>
        </div>
        
        <div className={`${headerColor} text-white border border-black rounded-lg px-3 py-1.5 flex items-center justify-center gap-3 w-[140px] flex-shrink-0`}>
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
      
      <div className={`${bodyColor} rounded-lg border border-black overflow-hidden`}>
        <div 
          className="p-2 text-gray-800 whitespace-pre-line text-justify"
          style={{ 
            height: '150px',
            overflowY: 'auto',
            scrollbarWidth: 'thin',
          }}
        >
          {dayData?.description || ""}
        </div>
      </div>
    </div>
  );
};

const International_Tourdetails = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("itinerary");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [showMoreIndian, setShowMoreIndian] = useState(false);
  const [showMoreWorld, setShowMoreWorld] = useState(false);
  const [durationRange, setDurationRange] = useState([5, 11]);
  const [priceRange, setPriceRange] = useState([32990, 153000]);
  const [selectedDepartureMonths, setSelectedDepartureMonths] = useState([]);
  const [selectedIndianTours, setSelectedIndianTours] = useState([]);
  const [selectedWorldTours, setSelectedWorldTours] = useState([]);
  const [activeVisaTab, setActiveVisaTab] = useState('tourist');
  const [selectedMonth, setSelectedMonth] = useState("ALL");
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedCostMonth, setSelectedCostMonth] = useState("");
  const [selectedCostDate, setSelectedCostDate] = useState("");
  const [tourType, setTourType] = useState('Group'); // Default to Group for testing

  // ============= STATIC TOUR DATA FOR GROUP TOUR =============
  const groupTour = {
    title: "Swiss Alps Adventure - Group Tour",
    duration: "6N/7D",
    price: "₹89,999",
    emi: "EMI from ₹15,000/month",
    badge: "Premium",
    code: "GRP-001",
    description: "Experience the breathtaking beauty of the Swiss Alps with this all-inclusive group tour package.",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w-800&q=80"
    ],
    itinerary: [
      {
        day: "Day 01",
        title: "Arrival in Zurich",
        description: "Arrive at Zurich International Airport. Transfer to hotel. Evening at leisure to explore the city center.",
        meals: "Dinner"
      },
      {
        day: "Day 02",
        title: "Zurich City Tour",
        description: "Full day guided tour of Zurich including Bahnhofstrasse, Lake Zurich, and Old Town.",
        meals: "Breakfast, Lunch"
      },
      {
        day: "Day 03",
        title: "Zurich to Lucerne",
        description: "Scenic drive to Lucerne. Visit Chapel Bridge, Lion Monument, and enjoy a lake cruise.",
        meals: "Breakfast, Dinner"
      }
    ],
    tourType: "Group",
    departures: {
      type: "Group",
      data: [
        {
          id: 1,
          month: "MAR 2025",
          fromDay: "Saturday",
          fromDate: "15 Mar 2025",
          toDay: "Saturday",
          toDate: "22 Mar 2025",
          status: "Available",
          price: 89999,
          threeStar: {
            twin: "₹89,999",
            triple: "₹84,999",
            childWithBed: "₹79,999",
            childWithoutBed: "₹74,999",
            infant: "₹19,999",
            single: "₹1,29,999"
          },
          fourStar: {
            twin: "₹99,999",
            triple: "₹94,999",
            childWithBed: "₹89,999",
            childWithoutBed: "₹84,999",
            infant: "₹24,999",
            single: "₹1,49,999"
          },
          fiveStar: {
            twin: "₹1,19,999",
            triple: "₹1,14,999",
            childWithBed: "₹1,09,999",
            childWithoutBed: "₹1,04,999",
            infant: "₹29,999",
            single: "₹1,79,999"
          }
        },
        {
          id: 2,
          month: "APR 2025",
          fromDay: "Saturday",
          fromDate: "12 Apr 2025",
          toDay: "Saturday",
          toDate: "19 Apr 2025",
          status: "Sold Out",
          price: 89999,
          threeStar: {
            twin: "₹89,999",
            triple: "₹84,999",
            childWithBed: "₹79,999",
            childWithoutBed: "₹74,999",
            infant: "₹19,999",
            single: "₹1,29,999"
          },
          fourStar: {
            twin: "₹99,999",
            triple: "₹94,999",
            childWithBed: "₹89,999",
            childWithoutBed: "₹84,999",
            infant: "₹24,999",
            single: "₹1,49,999"
          },
          fiveStar: {
            twin: "₹1,19,999",
            triple: "₹1,14,999",
            childWithBed: "₹1,09,999",
            childWithoutBed: "₹1,04,999",
            infant: "₹29,999",
            single: "₹1,79,999"
          }
        }
      ],
      descriptions: ["Tour departs every Saturday in March 2025"]
    },
    inclusionExclusion: {
      inclusions: [
        "Return economy class airfare",
        "6 nights accommodation in 3-star hotels",
        "Daily breakfast & 4 dinners",
        "All transfers and sightseeing as per itinerary",
        "Zurich city tour with guide",
        "Mount Titlis excursion with cable car"
      ],
      exclusions: [
        "Personal expenses and tips",
        "Travel insurance",
        "Visa fees",
        "Optional tours",
        "Meals not mentioned"
      ]
    },
    tourCost: {
      tableData: [
        {
          passenger: "2 Pax",
          standard: "₹89,999",
          deluxe: "₹99,999",
          executive: "₹1,19,999",
          childWithBed: "₹79,999",
          childNoBed: "₹74,999"
        }
      ],
      remarks: ["Prices are per person on twin sharing basis", "Additional charges apply for single occupancy"]
    },
    optionalTours: [
      {
        tourName: "Rhine Falls Excursion",
        adultPrice: "₹8,500",
        childPrice: "₹6,500"
      }
    ],
    emiOptions: {
      loanAmount: "Variable",
      options: [
        {
          particulars: "6 Months EMI",
          loanAmount: "₹89,999",
          months: 6,
          emi: "₹15,000"
        }
      ]
    },
    booking: {
      items: [
        "50% payment at the time of booking",
        "Balance 50% payment 30 days before departure",
        "Valid passport required with minimum 6 months validity"
      ],
      amountDetails: ["50%", "50%", "Aadhaar Card"]
    },
    cancellation: {
      policies: [
        "60 days or more before departure: 25% of tour cost",
        "30-59 days before departure: 50% of tour cost"
      ],
      charges: ["25%", "50%"]
    },
    hotels: {
      tableData: [
        {
          city: "Zurich",
          hotelName: "Swiss Star Hotel",
          roomType: "Standard Room",
          nights: "3 Nights",
          standard: "₹89,999",
          deluxe: "₹99,999",
          executive: "₹1,19,999"
        }
      ],
      remarks: ["Hotels are subject to availability at the time of booking"]
    },
    airlines: {
      tableData: [
        {
          airline: "Swiss Airlines",
          flightNo: "LX-123",
          from: "Mumbai",
          to: "Zurich",
          depDate: "15/03/2025",
          depTime: "02:30",
          arrDate: "15/03/2025",
          arrTime: "07:15",
          via: "Direct",
          description: "Direct flight from Mumbai to Zurich with complimentary meals"
        },
        {
          airline: "Swiss Airlines",
          flightNo: "LX-124",
          from: "Zurich",
          to: "Mumbai",
          depDate: "22/03/2025",
          depTime: "22:30",
          arrDate: "23/03/2025",
          arrTime: "10:15",
          via: "Direct",
          description: "Return flight with in-flight entertainment"
        }
      ],
      remarks: ["Flight timings are subject to change by airline"]
    },
    instructions: [
      "Carry warm clothing as temperatures can drop in the mountains",
      "Comfortable walking shoes recommended"
    ],
    bookingRemarks: ["Early booking recommended to secure seats"],
    cancellationRemarks: ["Cancellation charges as per policy"],
    emiRemarks: ["EMI available through selected banks"]
  };

  // ============= STATIC TOUR DATA FOR INDIVIDUAL TOUR =============
  const individualTour = {
    title: "European Luxury - Private Tour",
    duration: "8N/9D",
    price: "₹1,89,999",
    emi: "EMI from ₹31,667/month",
    badge: "Luxury",
    code: "IND-EURO-001",
    description: "Luxury private tour covering Paris, Rome, and Venice with premium accommodations and personalized services.",
    images: [
      "https://images.unsplash.com/photo-1502602890546-0d16bcdfb3f5?w=800&q=80",
      "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800&q=80",
      "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800&q=80"
    ],
    itinerary: [
      {
        day: "Day 01",
        title: "Arrival in Paris",
        description: "Arrive at Charles de Gaulle Airport. Private transfer to 5-star hotel. Evening Seine River cruise.",
        meals: "Dinner"
      },
      {
        day: "Day 02",
        title: "Paris City Tour",
        description: "Private guided tour of Eiffel Tower, Louvre Museum, and Champs-Élysées.",
        meals: "Breakfast, Lunch"
      },
      {
        day: "Day 03",
        title: "Paris to Rome",
        description: "Flight to Rome. Transfer to hotel. Evening walk to Trevi Fountain.",
        meals: "Breakfast, Dinner"
      }
    ],
    tourType: "Individual",
    departures: {
      type: "Individual",
      data: [], // Empty for individual tours
      descriptions: [
        "Departures available on all dates throughout the year",
        "Minimum 2 passengers required for booking",
        "Flexible dates can be customized as per your convenience"
      ]
    },
    inclusionExclusion: {
      inclusions: [
        "Private transfers and chauffeur-driven cars",
        "5-star luxury accommodations",
        "All meals included (Breakfast, Lunch, Dinner)",
        "Private guided tours in each city",
        "Business class flights between cities",
        "All entrance fees and taxes"
      ],
      exclusions: [
        "International airfare",
        "Personal shopping",
        "Travel insurance",
        "Visa assistance fees"
      ]
    },
    tourCost: {
      tableData: [
        {
          passenger: "2 Pax",
          standard: "₹1,89,999",
          deluxe: "₹2,29,999",
          executive: "₹2,89,999",
          childWithBed: "₹1,59,999",
          childNoBed: "₹1,29,999"
        }
      ],
      remarks: ["Prices are for private tour with exclusive services", "Customized itineraries available on request"]
    },
    optionalTours: [
      {
        tourName: "Versailles Palace Day Trip",
        adultPrice: "₹15,000",
        childPrice: "₹12,000"
      },
      {
        tourName: "Vatican Museum Private Tour",
        adultPrice: "₹10,000",
        childPrice: "₹8,000"
      }
    ],
    emiOptions: {
      loanAmount: "Variable",
      options: [
        {
          particulars: "6 Months EMI",
          loanAmount: "₹1,89,999",
          months: 6,
          emi: "₹31,667"
        },
        {
          particulars: "9 Months EMI",
          loanAmount: "₹1,89,999",
          months: 9,
          emi: "₹21,111"
        }
      ]
    },
    booking: {
      items: [
        "30% advance payment to confirm booking",
        "Balance 70% payment 15 days before travel",
        "Passport copies required at time of booking"
      ],
      amountDetails: ["30%", "70%", "Passport Copy"]
    },
    cancellation: {
      policies: [
        "45 days or more before departure: 20% of tour cost",
        "30-44 days before departure: 40% of tour cost",
        "15-29 days before departure: 60% of tour cost",
        "Less than 15 days before departure: 100% of tour cost"
      ],
      charges: ["20%", "40%", "60%", "100%"]
    },
    hotels: {
      tableData: [
        {
          city: "Paris",
          hotelName: "Hotel de Crillon",
          roomType: "Luxury Suite",
          nights: "3 Nights",
          standard: "₹1,89,999",
          deluxe: "₹2,29,999",
          executive: "₹2,89,999"
        },
        {
          city: "Rome",
          hotelName: "Hotel Eden",
          roomType: "Deluxe Room",
          nights: "3 Nights",
          standard: "₹1,89,999",
          deluxe: "₹2,29,999",
          executive: "₹2,89,999"
        }
      ],
      remarks: ["5-star luxury hotels with premium amenities"]
    },
    airlines: {
      tableData: [
        {
          airline: "Air France",
          flightNo: "AF-456",
          from: "Paris",
          to: "Rome",
          depDate: "18/03/2025",
          depTime: "10:00",
          arrDate: "18/03/2025",
          arrTime: "12:00",
          via: "Direct",
          description: "Business class flight from Paris to Rome with lounge access included"
        }
      ],
      remarks: ["Private transfers included between airport and hotel"]
    },
    instructions: [
      "Formal attire required for fine dining restaurants",
      "Private guide available in preferred language",
      "24/7 concierge service throughout the tour"
    ],
    bookingRemarks: ["Early booking ensures best hotel availability"],
    cancellationRemarks: ["Refund processed within 7-10 working days"],
    emiRemarks: ["Zero-interest EMI options available"]
  };

  // Select which tour to display (change this to test both)
  const tour = tourType === 'Group' ? groupTour : individualTour;
  const isGroupTour = tour.tourType === "Group";
  
  // Helper functions
  const toggleTable = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return `₹${price.toLocaleString('en-IN')}`;
    }
    return price || '₹0';
  };

  const dayCardColors = [
    { dayNumber: "Day 01", headerColor: "bg-[#A72703]", bodyColor: "bg-[#FFE797]" },
    { dayNumber: "Day 02", headerColor: "bg-[#A72703]", bodyColor: "bg-[#FFE797]" },
    { dayNumber: "Day 03", headerColor: "bg-[#A72703]", bodyColor: "bg-[#FFE797]" }
  ];

  // Image carousel functions
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === tour.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? tour.images.length - 1 : prevIndex - 1
    );
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  // Filter handlers
  const handleIndianTourChange = (tourName, checked) => {
    if (checked) {
      setSelectedIndianTours([...selectedIndianTours, tourName]);
    } else {
      setSelectedIndianTours(selectedIndianTours.filter(t => t !== tourName));
    }
  };

  const handleWorldTourChange = (tourName, checked) => {
    if (checked) {
      setSelectedWorldTours([...selectedWorldTours, tourName]);
    } else {
      setSelectedWorldTours(selectedWorldTours.filter(t => t !== tourName));
    }
  };

  const clearAllFilters = () => {
    setDurationRange([5, 11]);
    setPriceRange([32990, 153000]);
    setSelectedDepartureMonths([]);
    setSelectedIndianTours([]);
    setSelectedWorldTours([]);
    setSelectedMonth("ALL");
    setOpenIndex(null);
  };

  const handleDownloadPdf = () => {
    setIsGeneratingPdf(true);
    setTimeout(() => {
      setIsGeneratingPdf(false);
    }, 1000);
  };

  // Build Month → Departures map for Group tours
  const departuresByMonth = React.useMemo(() => {
    if (!isGroupTour || !tour.departures.data) return {};
    const map = {};
    tour.departures.data.forEach(dep => {
      if (!map[dep.month]) map[dep.month] = [];
      map[dep.month].push(dep);
    });
    return map;
  }, [isGroupTour, tour.departures.data]);

  const availableMonths = Object.keys(departuresByMonth);
  const filteredDepartureData = selectedMonth === "ALL" 
    ? tour.departures.data 
    : tour.departures.data.filter(d => d.month === selectedMonth);

  // For Tour Cost Tab
  const monthTabs = ["ALL", "MAR 2025", "APR 2025"];
  const availableDates = selectedCostMonth && departuresByMonth[selectedCostMonth] 
    ? departuresByMonth[selectedCostMonth] 
    : [];
  const selectedDeparture = availableDates.find(d => d.fromDate === selectedCostDate);

  return (
    <>
      <div className="min-h-screen bg-[#FFEBEE]">
        <Header />
        
       
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Filters Sidebar */}
            <aside className="lg:w-80">
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl shadow-lg p-6 border border-blue-200 sticky top-24">
                <div className="flex justify-between items-center mb-6 bg-white p-2 rounded-lg border border-black">
                  <h2 className="text-2xl font-bold text-[#2E4D98]">Domestic Tours</h2>
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
                      'Andaman', 'Goa', 'Kerala', 'Himachal', 'Rajasthan', 'Kashmir'
                    ].map((place) => (
                      <label key={place} className="flex items-center gap-3 cursor-pointer">
                        <Checkbox 
                          checked={selectedIndianTours.includes(place)}
                          onCheckedChange={(checked) => handleIndianTourChange(place, checked)}
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
                      'Dubai', 'Europe', 'Maldives', 'Mauritius', 'Thailand', 'Bali'
                    ].map((place) => (
                      <label key={place} className="flex items-center gap-3 cursor-pointer">
                        <Checkbox 
                          checked={selectedWorldTours.includes(place)}
                          onCheckedChange={(checked) => handleWorldTourChange(place, checked)}
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
                      {tour.images.map((image, index) => (
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
                    "Visa",
                    "Book p./Canc p.",
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
                            {tour.itinerary.map((day, index) => (
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
                  isGroupTour ? (
                    // Group Tour Departure Dates
                    <div className="bg-[#E8F0FF] rounded-lg p-1 w-full">
                      <div className="bg-red-600 text-white text-center font-bold text-2xl py-2.5 rounded-t-lg w-full">
                        Departure Dates
                      </div>
                      
                      <div className="border-2 border-t-0 border-[#1e3a8a] rounded-b-lg w-full flex flex-col min-h-[680px] max-h-[780px] overflow-hidden">
                        <div className="flex-1 overflow-y-auto p-2 bg-[#FFEBEE] w-full">
                          {/* Dynamically generate month tabs based on available departure data */}
                          <div className="flex flex-wrap gap-2 mb-2">
                            {/* First, calculate which months actually have departure data */}
                            {(() => {
                              // Get unique months from departure data
                              const availableMonths = tour.departures.data
                                .map((dep) => dep.month)
                                .filter((month, index, self) => 
                                  self.indexOf(month) === index
                                )
                                .sort((a, b) => {
                                  // Sort months chronologically
                                  const monthOrder = [
                                    "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
                                    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
                                  ];
                                  const getMonthNum = (monthStr) => {
                                    const monthAbbr = monthStr.split(' ')[0];
                                    return monthOrder.indexOf(monthAbbr);
                                  };
                                  return getMonthNum(a) - getMonthNum(b);
                                });

                              // Always include "ALL" as the first tab
                              const allTabs = ["ALL", ...availableMonths];
                              
                              return (
                                <div className="flex flex-wrap gap-2 mb-1">
                                  {allTabs.map((tab) => (
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
                              );
                            })()}
                          </div>

                          {/* Departure Cards */}
                          <div className="space-y-4 w-full">
                            {filteredDepartureData.map((item, index) => (
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

                                  {/* Status with conditional styling */}
                                  <div className={`font-semibold ${
                                    item.status === 'Sold Out' 
                                      ? 'text-red-600' 
                                      : item.status === 'Available' 
                                      ? 'text-green-600' 
                                      : 'text-blue-700'
                                  }`}>
                                    {item.status}
                                  </div>

                                  <div className="text-lg font-bold text-gray-900">
                                    {formatPrice(item.price)}
                                  </div>

                                  {/* Button with conditional disabling */}
                                  <button
                                    onClick={() => toggleTable(index)}
                                    disabled={item.status === 'Sold Out'}
                                    className={`px-6 py-2 transition-colors ${
                                      item.status === 'Sold Out'
                                        ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                        : 'bg-[#003366] text-white hover:bg-[#002244]'
                                    } ${openIndex === index ? 'bg-[#002244]' : ''}`}
                                  >
                                    {item.status === 'Sold Out' 
                                      ? 'Sold Out' 
                                      : openIndex === index 
                                      ? 'Hide Table' 
                                      : 'Select'
                                    }
                                  </button>
                                </div>

                                {/* TABLE SHOW WHEN BUTTON CLICKED - Only show if not Sold Out */}
                                {openIndex === index && item.status !== 'Sold Out' && (
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
                            
                            {/* Show message when no departures for selected month */}
                            {filteredDepartureData.length === 0 && (
                              <div className="text-center py-8 bg-white border border-gray-300 rounded-lg">
                                <p className="text-gray-600 text-lg mb-2">
                                  {selectedMonth === "ALL" 
                                    ? "No departure dates available for this tour"
                                    : `No departure dates available for ${selectedMonth}`
                                  }
                                </p>
                                <p className="text-gray-500 text-sm">
                                  Please check back later or contact us for more information
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Individual Tour Departure Descriptions (unchanged)
                    <div className="bg-[#E8F0FF] rounded-lg p-1 w-full">
                      <div className="bg-red-600 text-white text-center font-bold text-2xl py-2.5 rounded-t-lg w-full">
                        Departure Dates
                      </div>
                      
                      <div className="border-2 border-t-0 border-[#1e3a8a] rounded-b-lg w-full flex flex-col min-h-[280px] max-h-[280px] overflow-hidden">
                        <div className="flex-1 overflow-y-auto p-2 bg-[#FFEBEE] w-full">
                          <div className="space-y-4 w-full">
                            {tour.departures.descriptions.map((description, index) => (
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
                {activeTab === "tour-cost" && (
                  <div className="bg-[#E8F0FF] rounded-lg p-1">
                    <div className="bg-red-600 text-white text-center font-bold text-2xl py-2.5 rounded-t-lg mb-1.5">
                      Tour Cost
                    </div>
                    
                    <div className="border rounded-b-lg rounded-t overflow-hidden -mt-1">
                      {/* Group Tour Cost Section - Show only for Group-like tours */}
                      {isGroupTour ? (
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
                            {selectedDeparture ? (
                              <div className="border-2 border-black overflow-hidden animate-fadeIn">
                                {/* HEADER */}
                                <div className="grid grid-cols-4 bg-[#0A1D4A] text-white font-semibold text-center">
                                  <div className="p-2 border-r-2 border-white">Particulars</div>
                                  <div className="p-2 border-r-2 border-white">Gross Rate</div>
                                  <div className="p-2 border-r-2 border-white">Part Payment Discount</div>
                                  <div className="p-2">Full Payment Discount</div>
                                </div>

                                {/* ROWS */}
                                {[
                                  { 
                                    particular: "Per pax on Twin Basis", 
                                    star3: selectedDeparture.threeStar.twin, 
                                    star4: selectedDeparture.fourStar.twin, 
                                    star5: selectedDeparture.fiveStar.twin 
                                  },
                                  { 
                                    particular: "Per pax on Triple Basis", 
                                    star3: selectedDeparture.threeStar.triple, 
                                    star4: selectedDeparture.fourStar.triple, 
                                    star5: selectedDeparture.fiveStar.triple 
                                  },
                                  { 
                                    particular: "Child with Bed", 
                                    star3: selectedDeparture.threeStar.childWithBed, 
                                    star4: selectedDeparture.fourStar.childWithBed, 
                                    star5: selectedDeparture.fiveStar.childWithBed 
                                  },
                                  { 
                                    particular: "Child without Bed", 
                                    star3: selectedDeparture.threeStar.childWithoutBed, 
                                    star4: selectedDeparture.fourStar.childWithoutBed, 
                                    star5: selectedDeparture.fiveStar.childWithoutBed 
                                  },
                                  { 
                                    particular: "Infant", 
                                    star3: selectedDeparture.threeStar.infant, 
                                    star4: selectedDeparture.fourStar.infant, 
                                    star5: selectedDeparture.fiveStar.infant 
                                  },
                                  { 
                                    particular: "Per pax Single Occupancy", 
                                    star3: selectedDeparture.threeStar.single, 
                                    star4: selectedDeparture.fourStar.single, 
                                    star5: selectedDeparture.fiveStar.single 
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
                                <p className="text-gray-500">Please select a month and date to view tour cost</p>
                                <p className="text-gray-400 text-sm mt-2">Departure dates are available in the "Dep Date" tab</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        // Individual Tour Cost Section - Show Passenger Table
                        <div>
                          {/* Passenger Table - ONLY for Individual tours */}
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
                                  tour.tourCost.tableData.map((row, index) => (
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
                                      No cost information available
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* Optional Tour Section (show for both types if has data) */}
                      {tour.optionalTours && tour.optionalTours.length > 0 && (
                        <div className='mb-1 mt-4'>
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
                                {tour.optionalTours.map((optTour, index) => (
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

                      {/* EMI Options Section (show for both types if has data) */}
                      {tour.emiOptions && tour.emiOptions.options && tour.emiOptions.options.length > 0 && (
                        <div className='mb-1 mt-4'>
                          <div className="bg-red-600 text-white text-center font-bold text-xl rounded-t-lg py-3 mb-1">
                            EMI Options
                          </div>
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                              <thead>
                                <tr className="bg-[#2E4D98]">
                                  <th className="border border-white px-4 py-3 text-left font-semibold text-white w-[40%]">
                                    Particulars
                                  </th>
                                  <th className="border border-white px-4 py-3 text-center font-semibold text-white w-[20%]">
                                    Loan Amount
                                  </th>
                                  <th className="border border-white px-4 py-3 text-center font-semibold text-white w-[20%]">
                                    Months
                                  </th>
                                  <th className="border border-white px-4 py-3 text-center font-semibold text-white w-[20%]">
                                    EMI
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="border-2 border-[#1e3a8a] border-t-0">
                                {tour.emiOptions.options.map((emi, index) => (
                                  <tr key={index} className={index % 2 === 0 ? "bg-[#FFEBEE]" : "bg-[#FFEBEE]/80"}>
                                    <td className="border border-black px-4 py-2 font-bold text-base">
                                      {emi.particulars}
                                    </td>
                                    <td className="border border-black px-4 py-2 border-l-0 text-center">
                                      {emi.loanAmount}
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

                      {/* Tour Cost Remarks Section - Show for both Group and Individual tours */}
                      <div className="flex gap-1 mt-1 w-full">
                        {/* Tour Cost Remarks */}
                        <div className="bg-[#E8F0FF] rounded-lg w-1/2 overflow-x-hidden">
                          <div className="bg-red-600 text-white text-center font-bold text-2xl py-2.5 rounded-t-lg w-full">
                            Tour Cost Remarks
                          </div>
                          <div className="border-2 border-[#1e3a8a] border-t-0 overflow-hidden rounded-b-lg w-full">
                            <div className="min-h-[180px] max-h-[180px] overflow-y-auto p-2 bg-[#FFEBEE] w-full">
                              {tour.tourCost.remarks && tour.tourCost.remarks.length > 0 ? (
                                <ul className="space-y-2 w-full">
                                  {tour.tourCost.remarks.map((remark, index) => (
                                    <li key={index} className="flex items-start gap-2 w-full">
                                      <span className="text-gray-700 whitespace-pre-wrap break-words hyphens-auto text-justify w-full">
                                        {remark}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <div className="flex items-center justify-center h-full">
                                  <span className="text-gray-500 italic">No tour cost remarks available</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Tour Cost EMI Remarks */}
                        <div className="bg-[#E8F0FF] rounded-lg w-1/2 overflow-x-hidden">
                          <div className="bg-red-600 text-white text-center font-bold text-2xl py-2.5 rounded-t-lg w-full">
                            Tour Cost EMI
                          </div>
                          <div className="border-2 border-[#1e3a8a] border-t-0 overflow-hidden rounded-b-lg w-full">
                            <div className="min-h-[180px] max-h-[180px] overflow-y-auto p-2 bg-[#FFEBEE] w-full">
                              {tour.emiRemarks && tour.emiRemarks.length > 0 ? (
                                <ul className="space-y-2 w-full">
                                  {tour.emiRemarks.map((remark, index) => (
                                    <li key={index} className="flex items-start gap-2 w-full">
                                      <span className="text-gray-700 whitespace-pre-wrap break-words hyphens-auto text-justify w-full">
                                        {remark}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <div className="flex items-center justify-center h-full">
                                  <span className="text-gray-500 italic">No EMI remarks available</span>
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
                              {tour.inclusionExclusion.inclusions.map((inclusion, index) => (
                                <li key={index} className="w-full">
                                  <div className="flex items-start gap-0 w-full">
                                    <div className="text-gray-700 flex-1 min-w-0 text-justify break-words ml-2">
                                      {inclusion}
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
                              {tour.inclusionExclusion.exclusions.map((exclusion, index) => (
                                <li key={index} className="w-full">
                                  <div className="flex items-start gap-0 w-full">
                                    <div className="text-gray-700 flex-1 min-w-0 text-justify break-words ml-2">
                                      {exclusion}
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
                          {isGroupTour ? (
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
                                    tour.airlines.tableData.map((flight, index) => (
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
                              {tour.airlines.tableData && tour.airlines.tableData.some((flight) => flight.description) && (
                                <div className="mt-4 p-4 bg-[#E8F0FF]  border border-gray-200 rounded-lg">
                                  <h4 className="font-bold text-lg mb-3 text-center text-red-600">Additional Information</h4>
                                  <div className="space-y-4">
                                    {tour.airlines.tableData.map((flight, index) => (
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
                                  {tour.airlines.tableData.map((flight, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-1 bg-white w-full overflow-hidden shadow-sm">
                                      {flight.description && (
                                        <div className="border-gray-300">
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
                              {tour.hotels.tableData.map((hotel, index) => (
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
                                {[...tour.hotels.remarks, ...tour.airlines.remarks].map((remark, index) => (
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
                
{activeTab === "book-p./canc-p." && (
    <div className="bg-[#E8F0FF] rounded-lg p-1">

    {/* MAIN TITLE */}
    <div className="bg-red-600 text-white text-center font-bold text-2xl py-2.5 rounded-t-lg mb-1">
      Booking & Cancellation Policy
    </div>

    {/* ================= MAIN 50 / 50 ================= */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 mt-1">

      {/* ================= BOOKING POLICY ================= */}
      <div className="flex flex-col h-[320px]">

        {/* Header */}
        <div className="flex border-2 border-[#1e3a8a] border-b-0 rounded-t-lg overflow-hidden">
          <div className="flex-1 bg-[#2E4D98] text-white text-center py-3">
            <h3 className="text-xl font-bold">Booking Policy</h3>
          </div>
          <div className="w-1/5 bg-[#2E4D98] text-white text-center py-3 border-l-2 border-[#1e3a8a]">
            <h4 className="text-sm font-bold">Amount</h4>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 border-2 border-[#1e3a8a] border-t-0 rounded-b-lg flex overflow-hidden">

          {/* LEFT TEXT */}
          <div className="flex-1 p-1 border-r-2 border-[#1e3a8a]">
            <div className="grid grid-rows-3 gap-1">
              {[
                "35% payment at the time of booking",
                "15% payment on card (remaining balance before departure)",
                "Valid passport required with minimum 6 months validity",
              ].map((text, i) => (
                <div
                  key={i}
                  className="flex items-center p-2 bg-blue-50 border border-blue-300 rounded-lg h-[72px]"
                >
                  <span className="text-gray-700 text-sm text-justify w-full">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT AMOUNT */}
          <div className="w-1/5 p-1">
            <div className="grid grid-rows-3 gap-1">
              {["35%", "15%", "Passport"].map((amt, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center bg-white border border-blue-300 rounded-lg h-[72px]"
                >
                  <span className="text-sm font-bold text-green-600">
                    {amt}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ================= CANCELLATION POLICY ================= */}
      <div className="flex flex-col h-[320px]">

        {/* Header */}
        <div className="flex border-2 border-[#1e3a8a] border-b-0 rounded-t-lg overflow-hidden">
          <div className="flex-1 bg-[#A72703] text-white text-center py-3">
            <h3 className="text-xl font-bold">Cancellation Policy</h3>
          </div>
          <div className="w-1/5 bg-[#A72703] text-white text-center py-3 border-l-2 border-[#1e3a8a]">
            <h4 className="text-sm font-bold">Charge</h4>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 border-2 border-[#1e3a8a] border-t-0 rounded-b-lg flex overflow-hidden">

          {/* LEFT TEXT */}
          <div className="flex-1 p-1 border-r-2 border-[#1e3a8a]">
            <div className="grid grid-rows-2 gap-1">
              {[
                "35% of tour cost – if cancelled 30–59 days before departure",
                "15% of tour cost – if cancelled 60 days or more before departure",
              ].map((text, i) => (
                <div
                  key={i}
                  className="flex items-center p-2 bg-[#EAD2C0] border border-[#A72703] rounded-lg h-[72px]"
                >
                  <span className="text-gray-800 text-sm text-justify w-full">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT CHARGE */}
          <div className="w-1/5 p-1">
            <div className="grid grid-rows-2 gap-1">
              {["35%", "15%"].map((amt, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center bg-[#EAD2C0] border border-[#A72703] rounded-lg h-[72px]"
                >
                  <span className="text-sm font-bold text-[#A72703]">
                    {amt}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>

    {/* ================= REMARKS ================= */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 mt-1">

  <div className="bg-[#E8F0FF] rounded-lg overflow-hidden">
    <div className="bg-[#2E4D98] text-white text-center font-bold text-xl py-2.5 rounded-t-lg">
      Booking Policy Remarks
    </div>
    <div className="border-2 border-[#1e3a8a] border-t-0 rounded-b-lg overflow-hidden">
      <div className="min-h-[150px] max-h-[180px] overflow-y-auto p-2 bg-[#FFEBEE] rounded-b-lg flex items-center justify-center">
        <span className="text-gray-500 italic text-sm">
          No booking policy remarks available
        </span>
      </div>
    </div>
  </div>

  <div className="bg-[#E8F0FF] rounded-lg overflow-hidden">
    <div className="bg-[#A72703] text-white text-center font-bold text-xl py-2.5 rounded-t-lg">
      Cancellation Policy Remarks
    </div>
    <div className="border-2 border-[#1e3a8a] border-t-0 rounded-b-lg overflow-hidden">
      <div className="min-h-[150px] max-h-[180px] overflow-y-auto p-2 bg-[#FFEBEE] rounded-b-lg flex items-center justify-center">
        <span className="text-gray-500 italic text-sm">
          No cancellation policy remarks available
        </span>
      </div>
    </div>
  </div>

</div>
  </div>
)}


{activeTab === "visa" && (
 <div className="bg-[#E8F0FF] rounded-lg p-1">    {/* Header */}
    <div className="bg-red-600 text-white text-center font-bold text-2xl py-2.5 rounded-t-lg mb-1">
      Documents Required for Visa
    </div>

    {/* Main Tabs - Updated to match your style */}
    <div className="grid grid-cols-7 bg-white border border-black rounded-t-lg overflow-hidden mb-0">
      {[
        "Tourist Visa",
        "Transit Visa", 
        "Business Visa",
        "Visa Forms",
        "Photo Spec.",
        "Visa Fees",
        "Time Taken"
      ].map((label, idx) => {
        // Map labels to tab keys
        const tabMap = {
          "Tourist Visa": "tourist",
          "Transit Visa": "transit",
          "Business Visa": "business", 
          "Visa Forms": "forms",
          "Photo Spec.": "photo",
          "Visa Fees": "fees",
          "Time Taken": "time"
        };
        
        const tabKey = tabMap[label];
        
        return (
          <button
            key={label}
            onClick={() => setActiveVisaTab(tabKey)}
            className={`px-2 py-3 text-sm font-semibold text-center whitespace-nowrap
              ${idx < 6 ? "border-r border-black" : ""} transition 
              ${
                activeVisaTab === tabKey
                  ? "bg-[#A72703] text-white"        
              : "bg-[#FFE797] text-gray-800" 
              }
            `}
          >
            {label}
          </button>
        );
      })}
    </div>

    {/* Content based on active visa tab */}
      {activeVisaTab === 'tourist' && (
      <div className="border-2 border-t-0 border-[#1e3a8a] rounded-b-lg w-full flex flex-col min-h-[280px] max-h-[280px] overflow-hidden">
                      <div className="flex-1 overflow-y-auto p-2 bg-[#FFEBEE] w-full">
                        <div className="space-y-4 w-full">
                          
                            <div  className="border-gray-200 rounded-lg p-2 w-full">
                              <div className="flex items-start w-full">
                                <div className="flex-1 min-w-0">
                                 
                                </div>
                              </div>
                            </div>
                        </div>
                      </div>
                    </div>
      )}

      {activeVisaTab === 'transit' && (
      <div className="border-2 border-t-0 border-[#1e3a8a] rounded-b-lg w-full flex flex-col min-h-[280px] max-h-[280px] overflow-hidden">
                      <div className="flex-1 overflow-y-auto p-2 bg-[#FFEBEE] w-full">
                        <div className="space-y-4 w-full">
                          
                            <div  className="border-gray-200 rounded-lg p-2 w-full">
                              <div className="flex items-start w-full">
                                <div className="flex-1 min-w-0">
                                 
                                </div>
                              </div>
                            </div>
                        </div>
                      </div>
                    </div>
      )}

      {activeVisaTab === 'business' && (
    <div className="border-2 border-t-0 border-[#1e3a8a] rounded-b-lg w-full flex flex-col min-h-[280px] max-h-[280px] overflow-hidden">
                      <div className="flex-1 overflow-y-auto p-2 bg-[#FFEBEE] w-full">
                        <div className="space-y-4 w-full">
                          
                            <div  className="border-gray-200 rounded-lg p-2 w-full">
                              <div className="flex items-start w-full">
                                <div className="flex-1 min-w-0">
                                 
                                </div>
                              </div>
                            </div>
                        </div>
                      </div>
                    </div>
      )}

{activeVisaTab === 'forms' && (
  <div className="space-y-4 mt-1">
    <div className="overflow-x-auto w-full">
      <table className="w-full border-collapse min-w-max border border-gray-300">
        <thead>
          <tr className="bg-[#2E4D98]">
            <th className="border border-white px-2 py-3 text-left text-white w-[14.28%] h-12">
              {/* Column 1 */}
            </th>
            <th className="border border-white px-2 py-3 text-left text-white w-[14.28%] h-12">
              {/* Column 2 */}
            </th>
            <th className="border border-white px-2 py-3 text-left text-white w-[14.28%] h-12">
              {/* Column 3 */}
            </th>
            <th className="border border-white px-2 py-3 text-left text-white w-[14.28%] h-12">
              {/* Column 4 */}
            </th>
            <th className="border border-white px-2 py-3 text-left text-white w-[14.28%] h-12">
              {/* Column 5 */}
            </th>
            <th className="border border-white px-2 py-3 text-left text-white w-[14.28%] h-12">
              {/* Column 6 */}
            </th>
            <th className="border border-white px-2 py-3 text-left text-white w-[14.28%] h-12">
              {/* Column 7 */}
            </th>
          </tr>
        </thead>
      <tbody className="border-2 border-[#1e3a8a] border-t-0">
  {/* Tourist Visa Row */}
<tr className="bg-[#FFEBEE]">
  <td className="border border-black px-2 py-2 break-all whitespace-pre-wrap w-[14.28%] h-10" colSpan="5">
      Tourist Visa Form Download
    </td>
  <td className="border border-black px-2 py-2 break-all whitespace-pre-wrap w-[14.28%] h-10 text-center bg-red-600 text-white">
    Download
  </td>
  <td className="border border-black px-2 py-2 break-all whitespace-pre-wrap w-[14.28%] h-10 text-center bg-amber-800 text-white">
    Fill Manualy
  </td>
</tr>
  {/* Transit Visa Row */}
<tr className="bg-[#FFEBEE]">
  <td className="border border-black px-2 py-2 break-all whitespace-pre-wrap w-[14.28%] h-10" colSpan="5">
      Tourist Visa Form Download
    </td>
  <td className="border border-black px-2 py-2 break-all whitespace-pre-wrap w-[14.28%] h-10 text-center bg-red-600 text-white">
    Download
  </td>
  <td className="border border-black px-2 py-2 break-all whitespace-pre-wrap w-[14.28%] h-10 text-center bg-amber-800 text-white">
    Fill Manualy
  </td>
</tr>
  
  {/* Business Visa Row */}
<tr className="bg-[#FFEBEE]">
  <td className="border border-black px-2 py-2 break-all whitespace-pre-wrap w-[14.28%] h-10" colSpan="5">
      Tourist Visa Form Download
    </td>
  <td className="border border-black px-2 py-2 break-all whitespace-pre-wrap w-[14.28%] h-10 text-center bg-red-600 text-white">
    Download
  </td>
  <td className="border border-black px-2 py-2 break-all whitespace-pre-wrap w-[14.28%] h-10 text-center bg-amber-800 text-white">
    Fill Manualy
  </td>
</tr>
</tbody>
      </table>
    </div>
    
 <div className="overflow-x-auto w-full mt-0">
  <table className="w-full border-collapse min-w-max border border-gray-300">
    <thead>
      <tr className="bg-red-600 rounded-b-lg">
        <th className="border border-white px-4 py-3 text-center text-white">
          Remarks
        </th>
      </tr>
    </thead>
    <tbody className="border-2 border-[#1e3a8a] border-t-0">
      <tr className="bg-[#FFEBEE]">
        <td className="border border-black px-4 py-3 break-all whitespace-pre-wrap text-left">
          When Mention Download fill in the Form as per specification and sign at the last as per passport
        </td>
      </tr>
      <tr className="bg-[#FFEBEE]/80">
        <td className="border border-black px-4 py-3 break-all whitespace-pre-wrap text-left">
          Fill Manualy means just fill in all the details in the form and send it to us no need to Sign
        </td>
      </tr>
    </tbody>
  </table>
</div>
  </div>
)}

{activeVisaTab === 'photo' && (
  <div className="space-y-4">
    <div className="overflow-x-auto w-full">
      <table className="w-full border-collapse min-w-max border border-gray-300 mt-1">
        <thead>
          <tr className="bg-[#2E4D98]">
            <th className="border border-white px-4 py-3 text-center text-white" colSpan="5">
              Photo Specification
            </th>
            <th className="border border-white px-12 py-3 text-left text-white opacity-0" colSpan="3">
              {/* Empty columns - no visible lines */}
            </th>
          </tr>
        </thead>
        <tbody className="border-2 border-[#1e3a8a] border-t-0">
          <tr className="bg-[#FFEBEE]">
            <td className="border border-black px-4 py-3 break-all whitespace-pre-wrap" colSpan="5">
              Free Flow Entry
            </td>
            <td className="border-0 px-12 py-3 opacity-0" colSpan="2">
              {/* Empty columns */}
            </td>
          </tr>
          <tr className="bg-[#FFEBEE]/80">
            <td className="border border-black px-4 py-3 break-all whitespace-pre-wrap" colSpan="5">
              Free Flow Entry
            </td>
            <td className="border-0 px-12 py-3 opacity-0" colSpan="2">
              {/* Empty columns */}
            </td>
          </tr>
          <tr className="bg-[#FFEBEE]">
            <td className="border border-black px-4 py-3 break-all whitespace-pre-wrap" colSpan="5">
              Free Flow Entry
            </td>
            <td className="border-0 px-12 py-3 opacity-0" colSpan="2">
              {/* Empty columns */}
            </td>
          </tr>
          <tr className="bg-[#FFEBEE]/80">
            <td className="border border-black px-4 py-3 break-all whitespace-pre-wrap" colSpan="5">
              Free Flow Entry
            </td>
            <td className="border-0 px-12 py-3 opacity-0" colSpan="2">
              {/* Empty columns */}
            </td>
          </tr>
          <tr className="bg-[#FFEBEE]">
            <td className="border border-black px-4 py-3 break-all whitespace-pre-wrap" colSpan="5">
              Free Flow Entry
            </td>
            <td className="border-0 px-12 py-3 opacity-0" colSpan="2">
              {/* Empty columns */}
            </td>
          </tr>
          <tr className="bg-[#FFEBEE]/80">
            <td className="border border-black px-4 py-3 break-all whitespace-pre-wrap" colSpan="5">
              Extendable as per requirement
            </td>
            <td className="border-0 px-12 py-3 opacity-0" colSpan="2">
              {/* Empty columns */}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
)}
{activeVisaTab === 'fees' && (
  <div className="space-y-4">
    <div className="overflow-x-auto w-full">
    <table className="w-full border-collapse min-w-max border border-gray-300 mt-1">
  <thead>
    <tr className="bg-[#2E4D98] text-white text-center">
      <th className="border border-white px-4 py-3" colSpan="2">Tourist Visa</th>
      <th className="border border-white px-4 py-3" colSpan="2">Transit Visa</th>
      <th className="border border-white px-4 py-3" colSpan="2">Business Visa</th>
      <th className="border border-white px-4 py-3" colSpan="1">Visa & VFS Charges</th>
    </tr>
  </thead>
  <tbody className="border-2 border-[#1e3a8a] border-t-0">
    <tr className="bg-[#FFEBEE]">
      <td className="border border-black px-4 py-3 break-all whitespace-pre-wrap" colSpan="6">
        Free Flow Entry
      </td>
      <td className="border border-black px-4 py-3 break-all whitespace-pre-wrap" colSpan="1">
        {/* Empty column */}
      </td>
    </tr>
    <tr className="bg-[#FFEBEE]/80">
      <td className="border border-black px-4 py-3 break-all whitespace-pre-wrap" colSpan="6">
        Free Flow Entry
      </td>
      <td className="border border-black px-4 py-3 break-all whitespace-pre-wrap" colSpan="1">
        {/* Empty column */}
      </td>
    </tr>
    <tr className="bg-[#FFEBEE]">
      <td className="border border-black px-4 py-3 break-all whitespace-pre-wrap" colSpan="6">
        Free Flow Entry
      </td>
      <td className="border border-black px-4 py-3 break-all whitespace-pre-wrap" colSpan="1">
        {/* Empty column */}
      </td>
    </tr>
    <tr className="bg-[#FFEBEE]/80">
      <td className="border border-black px-4 py-3 break-all whitespace-pre-wrap" colSpan="6">
        Free Flow Entry
      </td>
      <td className="border border-black px-4 py-3 break-all whitespace-pre-wrap" colSpan="1">
        {/* Empty column */}
      </td>
    </tr>
    <tr className="bg-[#FFEBEE]">
      <td className="border border-black px-4 py-3 break-all whitespace-pre-wrap" colSpan="6">
        Free Flow Entry
      </td>
      <td className="border border-black px-4 py-3 break-all whitespace-pre-wrap" colSpan="1">
        {/* Empty column */}
      </td>
    </tr>
    <tr className="bg-[#FFEBEE]/80">
      <td className="border border-black px-4 py-3 break-all whitespace-pre-wrap" colSpan="6">
        Extendable as per requirement
      </td>
      <td className="border border-black px-4 py-3 break-all whitespace-pre-wrap" colSpan="1">
        {/* Empty column */}
      </td>
    </tr>
  </tbody>
</table>

    </div>
  </div>
)}



{activeVisaTab === 'time' && (
  <div className="space-y-4">
    <div className="overflow-x-auto w-full">
      <table className="w-full border-collapse table-fixed border border-gray-300 mt-1">
        <thead>
          <tr className="bg-[#2E4D98]">
            <th
              className="border border-white px-11 py-3 text-center text-white"
              colSpan={5}
            >
              Particulars
            </th>
            <th
              className="border border-white px-1 py-3 text-center text-white"
              colSpan={2}
            >
              Submission & Time Taken
            </th>
          </tr>
        </thead>

        <tbody className="border-2 border-[#1e3a8a] border-t-0">
          <tr className="bg-[#FFEBEE]">
            <td className="border border-black px-4 py-3 break-all whitespace-pre-wrap" colSpan={5}>
              Visa Submission Free Flow Entry
            </td>
            <td className="border border-black px-4 py-3 break-all whitespace-pre-wrap" colSpan={2}>
              {/* Empty */}
            </td>
          </tr>

          <tr className="bg-[#FFEBEE]/80">
            <td className="border border-black px-4 py-3 break-all whitespace-pre-wrap" colSpan={5}>
              Visa Submission Free Flow Entry
            </td>
            <td className="border border-black px-4 py-3 break-all whitespace-pre-wrap" colSpan={2}>
              {/* Empty */}
            </td>
          </tr>

          <tr className="bg-[#FFEBEE]">
            <td className="border border-black px-4 py-3 break-all whitespace-pre-wrap" colSpan={5}>
              Visa Submission Free Flow Entry
            </td>
            <td className="border border-black px-4 py-3 break-all whitespace-pre-wrap" colSpan={2}>
              {/* Empty */}
            </td>
          </tr>

          <tr className="bg-[#FFEBEE]/80">
            <td className="border border-black px-4 py-3 break-all whitespace-pre-wrap" colSpan={5}>
              Visa Submission Free Flow Entry
            </td>
            <td className="border border-black px-4 py-3 break-all whitespace-pre-wrap" colSpan={2}>
              {/* Empty */}
            </td>
          </tr>

          <tr className="bg-[#FFEBEE]">
            <td className="border border-black px-4 py-3 break-all whitespace-pre-wrap" colSpan={5}>
              Visa Submission Free Flow Entry
            </td>
            <td className="border border-black px-4 py-3 break-all whitespace-pre-wrap" colSpan={2}>
              {/* Empty */}
            </td>
          </tr>

          <tr className="bg-[#FFEBEE]/80">
            <td className="border border-black px-4 py-3 break-all whitespace-pre-wrap" colSpan={5}>
              Extendable as per requirement
            </td>
            <td className="border border-black px-4 py-3 break-all whitespace-pre-wrap" colSpan={2}>
              {/* Empty */}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
)}



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
                              {tour.instructions.map((instruction, index) => (
                                <li key={index} className="text-justify whitespace-normal">
                                  {instruction}
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
                  <button
                    className={`w-full ${isGeneratingPdf ? 'bg-green-900' : 'bg-green-700 hover:bg-green-800'} text-white font-bold py-3 px-3 flex items-center justify-center gap-2 transition-colors text-sm`}
                    onClick={handleDownloadPdf}
                  >
                    {isGeneratingPdf ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating...
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4" />
                        Download
                      </>
                    )}
                  </button>
                </div>

                <div className="w-32 border border-red-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <button
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-3 flex items-center justify-center gap-2 transition-colors text-sm"
                    onClick={() => navigate('/checkout', { state: { tour } })}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Book Now
                  </button>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default International_Tourdetails;