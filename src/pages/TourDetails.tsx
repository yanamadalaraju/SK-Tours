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

const TourDetails = () => {
  const { tourId } = useParams<{ tourId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("itinerary");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  
  // Filter states
  const [showMoreIndian, setShowMoreIndian] = useState(false);
  const [showMoreWorld, setShowMoreWorld] = useState(false);
  const [durationRange, setDurationRange] = useState([5, 11]);
  const [priceRange, setPriceRange] = useState([32990, 153000]);
  const [selectedDepartureMonths, setSelectedDepartureMonths] = useState<string[]>([]);
  const [selectedIndianTours, setSelectedIndianTours] = useState<string[]>([]);
  const [selectedWorldTours, setSelectedWorldTours] = useState<string[]>([]);

  // Expanded tour data for 3 specific tours (matching codes from TourPackages)
  const tourData = {
    "AND00001": {
      title: "Andaman Swaraj Dweep & Shaheed Dweep Delight",
      duration: "6N/7D",
      price: "₹64,000",
      emi: "EMI from ₹2,387/month",
      badge: "New Year Deal ₹1,000 Off",
      locations: "Port Blair • Havelock • Neil Island",
      dates: "42 Dates Available",
      images: [
        "https://i.pinimg.com/736x/09/16/c4/0916c43d72ac007aee1a1a7d6d31d231.jpg",
        "https://i.pinimg.com/1200x/6a/f9/0e/6af90eea656d653c788e7d3f92a77247.jpg",
        "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80",
        "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80"
      ],
      code: "AND00001",
      description: "Experience the best of Andaman with this comprehensive tour covering Swaraj Dweep (Havelock) and Shaheed Dweep (Neil Island). Enjoy pristine beaches, water sports, and the natural beauty of these islands.",
      highlights: [
        "Visit Radhanagar Beach - one of Asia's best beaches",
        "Snorkeling at Elephant Beach",
        "Cellular Jail Light and Sound Show",
        "Glass-bottom boat ride at North Bay",
        "Scuba diving opportunities"
      ],
      itinerary: [
        {
          day: "Day 1",
          title: "Arrival in Port Blair",
          description: "Arrive at Port Blair Airport and transfer to hotel. Later visit Cellular Jail followed by Light and Sound Show.",
          meals: ["D"] // Only dinner included
        },
        {
          day: "Day 2",
          title: "Port Blair to Havelock",
          description: "Early morning departure by ferry to Havelock Island. Visit Radhanagar Beach - rated as Asia's best beach.",
          meals: ["B", "D"] // Breakfast and dinner
        },
        {
          day: "Day 3",
          title: "Havelock Island",
          description: "Snorkeling at Elephant Beach. Optional scuba diving and other water sports activities.",
          meals: ["B", "D"] // Breakfast and dinner
        },
        {
          day: "Day 4",
          title: "Havelock to Neil Island",
          description: "Ferry to Neil Island. Visit Laxmanpur Beach, Natural Bridge, and Bharatpur Beach.",
          meals: ["B", "D"] // Breakfast and dinner
        },
        {
          day: "Day 5",
          title: "Neil Island Exploration",
          description: "Full day exploring the natural beauty and beaches of Neil Island.",
          meals: ["B", "D"] // Breakfast and dinner
        },
        {
          day: "Day 6",
          title: "Neil Island to Port Blair",
          description: "Return ferry to Port Blair. Visit Corbyn's Cove Beach and shopping.",
          meals: ["B", "D"] // Breakfast and dinner
        },
        {
          day: "Day 7",
          title: "Departure",
          description: "Transfer to airport for departure flight.",
          meals: ["B"] // Only breakfast
        }
      ],
      departureDates: {
        months: [
          {
            name: "January-2026",
            dates: ["01", "05", "08", "12", "15", "18", "22", "25"]
          },
          {
            name: "February-2026",
            dates: ["02", "06", "09", "13", "16", "19", "23", "26"]
          },
          {
            name: "March-2026",
            dates: ["03", "07", "10", "14", "17", "20", "24", "27"]
          },
          {
            name: "April-2026",
            dates: ["04", "08", "11", "15", "18", "21", "25", "28"]
          },
          {
            name: "May-2026",
            dates: ["05", "09", "12", "16", "19", "22", "26", "29"]
          }
        ]
      },
      inclusionExclusion: {
        inclusions: [
          "Accommodation in 3-star hotels",
          "Daily breakfast and dinner",
          "All inter-island ferries",
          "Sightseeing as per itinerary",
          "Entry fees to monuments",
          "Airport transfers",
          "All applicable taxes",
          "Travel insurance",
          "Professional tour guide"
        ],
        exclusions: [
          "Airfare to Port Blair",
          "Lunch and other meals",
          "Personal expenses",
          "Water sports activities",
          "Any additional services not mentioned",
          "Visa fees if applicable",
          "Tips and gratuities",
          "Optional tours"
        ]
      },
      optionalTours: [
        {
          tourName: "Scuba Diving Adventure",
          adult: "₹10,000",
          child: "₹8,000",
          particulars: "Includes equipment and instructor"
        },
        {
          tourName: "Sea Walk Experience",
          adult: "₹3,500",
          child: "₹2,500",
          particulars: "Underwater sea walk with guide"
        },
        {
          tourName: "Parasailing",
          adult: "₹4,000",
          child: "₹3,000",
          particulars: "Single flight experience"
        },
        {
          tourName: "Jet Ski Ride",
          adult: "₹2,500",
          child: "₹2,000",
          particulars: "15 minutes ride"
        }
      ],
      hotels: [
        {
          city: "Port Blair",
          hotelName: "Sea Shell Hotel",
          nights: "2 Nights",
          roomType: "Deluxe Room"
        },
        {
          city: "Havelock",
          hotelName: "Blue Bird Resort",
          nights: "2 Nights",
          roomType: "Beach View Room"
        },
        {
          city: "Neil Island",
          hotelName: "Coral Cove",
          nights: "2 Nights",
          roomType: "Standard Room"
        }
      ],
      airlines: [
        {
          airline: "Air India",
          flightNo: "AI-123",
          from: "Delhi",
          depDate: "25 Nov 2025",
          depTime: "06:00",
          to: "Port Blair",
          arrDate: "25 Nov 2025",
          arrTime: "09:30"
        },
        {
          airline: "IndiGo",
          flightNo: "6E-456",
          from: "Port Blair",
          depDate: "01 Dec 2025",
          depTime: "16:00",
          to: "Delhi",
          arrDate: "01 Dec 2025",
          arrTime: "19:30"
        }
      ],
      specialRemarks: "• All timings are approximate and subject to change\n• Flight schedules may vary based on airline operations\n• Hotel check-in: 14:00 hrs, check-out: 12:00 hrs\n• Early check-in and late check-out subject to availability\n• Package rates are dynamic and may change without prior notice",
      tourCost: [
        {
          particular: "Per pax on Twin Basis",
          threeStar: "NA",
          fourStar: "Rs 64,000",
          fiveStar: "NA",
          remarks: "Standard room sharing"
        },
        {
          particular: "Per pax on Triple Basis",
          threeStar: "NA",
          fourStar: "Rs 63,500",
          fiveStar: "NA",
          remarks: "Triple sharing in deluxe room"
        },
        {
          particular: "Child with Bed",
          threeStar: "NA",
          fourStar: "Rs 57,000",
          fiveStar: "NA",
          remarks: "Extra bed in parent's room"
        },
        {
          particular: "Child without Bed",
          threeStar: "NA",
          fourStar: "Rs 53,000",
          fiveStar: "NA",
          remarks: "No extra bed, sharing with parents"
        },
        {
          particular: "Infant",
          threeStar: "NA",
          fourStar: "Rs 7,000",
          fiveStar: "NA",
          remarks: "Below 2 years, no seat"
        },
        {
          particular: "Per pax Single Occupancy",
          threeStar: "NA",
          fourStar: "On Request",
          fiveStar: "NA",
          remarks: "Single room supplement"
        }
      ],
      booking: [
        "50% advance payment required at time of booking",
        "Balance payment 15 days before travel",
        "Online booking available 24/7",
        "Document submission required 7 days before travel"
      ],
      cancellation: [
        "30+ days before travel: 90% refund",
        "15-30 days before travel: 50% refund",
        "7-14 days before travel: 25% refund",
        "Less than 7 days: No refund",
        "Refund processed within 7-10 working days"
      ]
    },
    "AND00002": {
      title: "Andaman With Swaraj Dweep Premium",
      duration: "6N/7D",
      price: "₹42,000",
      emi: "EMI from ₹1,567/month",
      badge: "Best Seller",
      locations: "Port Blair • Havelock • Neil",
      dates: "34 Dates Available",
      images: [
        "https://i.pinimg.com/1200x/6a/f9/0e/6af90eea656d653c788e7d3f92a77247.jpg",
        "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80",
        "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
        "https://i.pinimg.com/736x/09/16/c4/0916c43d72ac007aee1a1a7d6d31d231.jpg"
      ],
      code: "AND00002",
      description: "Premium Andaman experience focusing on Swaraj Dweep with luxury accommodations and exclusive activities.",
      highlights: [
        "Premium stay at Havelock",
        "Private beach access",
        "Exclusive water sports",
        "Guided nature walks",
        "Sunset cruises"
      ],
      itinerary: [
        {
          day: "Day 1",
          title: "Arrival and Port Blair Sightseeing",
          description: "Welcome to Andaman! Transfer to hotel and explore local attractions.",
          meals: ["D"] // Only dinner included
        },
        {
          day: "Day 2-4",
          title: "Swaraj Dweep Exploration",
          description: "Full immersion in Havelock with premium activities and relaxation.",
          meals: ["B", "L", "D"] // All meals included
        },
        {
          day: "Day 5",
          title: "Neil Island Visit",
          description: "Day trip to Neil for serene beach experiences.",
          meals: ["B", "D"] // Breakfast and dinner
        },
        {
          day: "Day 6",
          title: "Port Blair Return",
          description: "Return to Port Blair with shopping and leisure time.",
          meals: ["B", "D"] // Breakfast and dinner
        },
        {
          day: "Day 7",
          title: "Departure",
          description: "Airport transfer after breakfast.",
          meals: ["B"] // Only breakfast
        }
      ],
      departureDates: {
        months: [
          {
            name: "January-2026",
            dates: ["03", "07", "10", "14", "17", "21", "24"]
          },
          {
            name: "February-2026",
            dates: ["04", "08", "11", "15", "18", "22", "25"]
          },
          {
            name: "March-2026",
            dates: ["05", "09", "12", "16", "19", "23", "26"]
          },
          {
            name: "April-2026",
            dates: ["06", "10", "13", "17", "20", "24", "27"]
          },
          {
            name: "May-2026",
            dates: ["07", "11", "14", "18", "21", "25", "28"]
          }
        ]
      },
      inclusionExclusion: {
        inclusions: [
          "Premium 4-star accommodations",
          "All meals included",
          "Private transfers",
          "Exclusive guided tours",
          "Water sports package"
        ],
        exclusions: [
          "Personal expenses",
          "Optional adventure activities",
          "Airfare"
        ]
      },
      optionalTours: [
        {
          tourName: "Private Yacht Cruise",
          adult: "₹15,000",
          child: "₹12,000",
          particulars: "Sunset yacht experience"
        },
        {
          tourName: "Luxury Spa Package",
          adult: "₹5,000",
          child: "₹4,000",
          particulars: "Full day spa relaxation"
        }
      ],
      hotels: [
        {
          city: "Port Blair",
          hotelName: "Premium Port Blair Resort",
          nights: "2 Nights",
          roomType: "Ocean View Suite"
        },
        {
          city: "Havelock",
          hotelName: "Swaraj Premium Resort",
          nights: "3 Nights",
          roomType: "Villa"
        },
        {
          city: "Neil",
          hotelName: "Neil Luxury Stay",
          nights: "1 Night",
          roomType: "Deluxe Room"
        }
      ],
      airlines: [
        {
          airline: "Vistara",
          flightNo: "UK-789",
          from: "Mumbai",
          depDate: "20 Dec 2025",
          depTime: "08:00",
          to: "Port Blair",
          arrDate: "20 Dec 2025",
          arrTime: "11:00"
        },
        {
          airline: "SpiceJet",
          flightNo: "SG-321",
          from: "Port Blair",
          depDate: "27 Dec 2025",
          depTime: "14:00",
          to: "Mumbai",
          arrDate: "27 Dec 2025",
          arrTime: "17:00"
        }
      ],
      specialRemarks: "• Premium package with exclusive access\n• Limited availability for private tours",
      tourCost: [
        {
          particular: "Per pax on Twin Basis",
          threeStar: "NA",
          fourStar: "Rs 42,000",
          fiveStar: "NA",
          remarks: "Premium room sharing"
        },
        {
          particular: "Per pax on Triple Basis",
          threeStar: "NA",
          fourStar: "Rs 41,000",
          fiveStar: "NA",
          remarks: "Triple sharing in premium room"
        },
        {
          particular: "Child with Bed",
          threeStar: "NA",
          fourStar: "Rs 35,000",
          fiveStar: "NA",
          remarks: "Extra bed in parent's room"
        },
        {
          particular: "Child without Bed",
          threeStar: "NA",
          fourStar: "Rs 31,000",
          fiveStar: "NA",
          remarks: "No extra bed, sharing with parents"
        },
        {
          particular: "Infant",
          threeStar: "NA",
          fourStar: "Rs 5,000",
          fiveStar: "NA",
          remarks: "Below 2 years, no seat"
        },
        {
          particular: "Per pax Single Occupancy",
          threeStar: "NA",
          fourStar: "On Request",
          fiveStar: "NA",
          remarks: "Single room supplement"
        }
      ],
      booking: [
        "30% advance for premium booking",
        "Balance 30 days prior",
        "Priority confirmation for groups"
      ],
      cancellation: [
        "45+ days: 95% refund",
        "30-45 days: 75% refund",
        "15-30 days: 50% refund",
        "Less than 15 days: No refund"
      ]
    },
    "AND00003": {
      title: "Andaman Luxury Escape",
      duration: "7N/8D",
      price: "₹89,000",
      emi: "EMI from ₹3,320/month",
      badge: "Luxury Collection",
      locations: "5-Star Resorts • Private Cruise",
      dates: "28 Dates",
      images: [
        "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80",
        "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
        "https://i.pinimg.com/1200x/6a/f9/0e/6af90eea656d653c788e7d3f92a77247.jpg",
        "https://i.pinimg.com/736x/09/16/c4/0916c43d72ac007aee1a1a7d6d31d231.jpg"
      ],
      code: "AND00003",
      description: "Ultimate luxury escape to Andaman with 5-star resorts, private cruises, and exclusive experiences.",
      highlights: [
        "Stay at 5-star luxury resorts",
        "Private luxury cruise experiences",
        "Personal butler service",
        "Helicopter tours available",
        "Fine dining experiences"
      ],
      itinerary: [
        {
          day: "Day 1",
          title: "VIP Arrival",
          description: "Private airport transfer and check-in to 5-star resort.",
          meals: ["D"] // Only dinner included
        },
        {
          day: "Day 2-5",
          title: "Luxury Island Hopping",
          description: "Private cruises between islands with luxury amenities.",
          meals: ["B", "L", "D"] // All meals included
        },
        {
          day: "Day 6-7",
          title: "Exclusive Spa and Relaxation",
          description: "Full luxury spa treatments and private beach days.",
          meals: ["B", "L", "D"] // All meals included
        },
        {
          day: "Day 8",
          title: "VIP Departure",
          description: "Private transfer to airport with farewell amenities.",
          meals: ["B"] // Only breakfast
        }
      ],
      departureDates: {
        months: [
          {
            name: "January-2026",
            dates: ["10", "15", "20", "25"]
          },
          {
            name: "February-2026",
            dates: ["05", "10", "15", "20"]
          },
          {
            name: "March-2026",
            dates: ["05", "10", "15", "20"]
          },
          {
            name: "April-2026",
            dates: ["05", "10", "15", "20"]
          },
          {
            name: "May-2026",
            dates: ["05", "10", "15", "20"]
          }
        ]
      },
      inclusionExclusion: {
        inclusions: [
          "5-star luxury accommodations",
          "All gourmet meals",
          "Private transfers and cruises",
          "Personal concierge service",
          "Exclusive experiences"
        ],
        exclusions: [
          "Airfare",
          "Personal shopping",
          "Helicopter tours"
        ]
      },
      optionalTours: [
        {
          tourName: "Helicopter Island Tour",
          adult: "₹25,000",
          child: "₹20,000",
          particulars: "Private helicopter ride"
        },
        {
          tourName: "Private Chef Dinner",
          adult: "₹8,000",
          child: "₹6,000",
          particulars: "Beachside private dining"
        }
      ],
      hotels: [
        {
          city: "Port Blair",
          hotelName: "Taj Exotica Resort",
          nights: "3 Nights",
          roomType: "Ocean Villa"
        },
        {
          city: "Havelock",
          hotelName: "Barefoot at Havelock",
          nights: "4 Nights",
          roomType: "Water Villa"
        }
      ],
      airlines: [
        {
          airline: "Emirates",
          flightNo: "EK-456",
          from: "Dubai",
          depDate: "15 Jan 2026",
          depTime: "10:00",
          to: "Port Blair via Delhi",
          arrDate: "15 Jan 2026",
          arrTime: "18:00"
        },
        {
          airline: "Emirates",
          flightNo: "EK-789",
          from: "Port Blair via Delhi",
          depDate: "23 Jan 2026",
          depTime: "12:00",
          to: "Dubai",
          arrDate: "23 Jan 2026",
          arrTime: "20:00"
        }
      ],
      specialRemarks: "• Ultra-luxury package\n• Minimum 2 nights stay required\n• Subject to availability",
      tourCost: [
        {
          particular: "Per pax on Twin Basis",
          threeStar: "NA",
          fourStar: "NA",
          fiveStar: "Rs 89,000",
          remarks: "Luxury villa sharing"
        },
        {
          particular: "Per pax on Triple Basis",
          threeStar: "NA",
          fourStar: "NA",
          fiveStar: "Rs 88,000",
          remarks: "Triple sharing in luxury villa"
        },
        {
          particular: "Child with Bed",
          threeStar: "NA",
          fourStar: "NA",
          fiveStar: "Rs 75,000",
          remarks: "Extra bed in parent's villa"
        },
        {
          particular: "Child without Bed",
          threeStar: "NA",
          fourStar: "NA",
          fiveStar: "Rs 70,000",
          remarks: "No extra bed, sharing with parents"
        },
        {
          particular: "Infant",
          threeStar: "NA",
          fourStar: "NA",
          fiveStar: "Rs 10,000",
          remarks: "Below 2 years, no seat"
        },
        {
          particular: "Per pax Single Occupancy",
          threeStar: "NA",
          fourStar: "NA",
          fiveStar: "On Request",
          remarks: "Single villa supplement"
        }
      ],
      booking: [
        "100% advance for luxury booking",
        "Non-refundable for peak dates",
        "24-hour confirmation"
      ],
      cancellation: [
        "60+ days: 50% refund",
        "30-60 days: 25% refund",
        "Less than 30 days: No refund"
      ]
    }
  };

  const tour = tourData[tourId as keyof typeof tourData];

  // Handle departure month selection
  const handleDepartureMonthChange = (month: string, checked: boolean) => {
    if (checked) {
      setSelectedDepartureMonths([...selectedDepartureMonths, month]);
    } else {
      setSelectedDepartureMonths(selectedDepartureMonths.filter(m => m !== month));
    }
  };

  // Handle Indian tour selection
  const handleIndianTourChange = (tour: string, checked: boolean) => {
    if (checked) {
      setSelectedIndianTours([...selectedIndianTours, tour]);
    } else {
      setSelectedIndianTours(selectedIndianTours.filter(t => t !== tour));
    }
  };

  // Handle world tour selection
  const handleWorldTourChange = (tour: string, checked: boolean) => {
    if (checked) {
      setSelectedWorldTours([...selectedWorldTours, tour]);
    } else {
      setSelectedWorldTours(selectedWorldTours.filter(t => t !== tour));
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

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFEBEE]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Tour Not Found</h1>
          <Button onClick={() => navigate('/tour-packages')} className="bg-[#2E4D98] hover:bg-[#2E4D98] hover:opacity-90">
            Back to Tours
          </Button>
        </div>
      </div>
    );
  }

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

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Logic for splitting months into two columns evenly
  const numMonths = tour.departureDates.months.length;
  const col1Count = Math.ceil(numMonths / 2);
  const col2Months = tour.departureDates.months.slice(col1Count);

  // Meal Indicator Component
  const MealIndicator = ({ meals }: { meals: string[] }) => {
    const mealTypes = [
      { id: 'B', name: 'Breakfast' },
      { id: 'L', name: 'Lunch' },
      { id: 'D', name: 'Dinner' }
    ];

    return (
      <div className="flex gap-3">
        {mealTypes.map((meal) => (
          <div key={meal.id} className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              meals.includes(meal.id) 
                ? 'bg-green-100 border border-green-300' 
                : 'bg-red-100 border border-red-300'
            }`}>
              {meals.includes(meal.id) ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <X className="w-4 h-4 text-red-600" />
              )}
            </div>
            <span className="text-xs mt-1 text-gray-600">{meal.id}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FFEBEE]">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Filters Sidebar */}
          <aside className="lg:w-80">
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl shadow-lg p-6 border border-blue-200 sticky top-24">
              <div className="flex justify-between items-center mb-6">
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

              {/* Departure Date */}
              {/* <div className="mb-8">
                <h3 className="font-semibold text-lg mb-4 text-[#2E4D98]">Departure date</h3>
                <div className="space-y-3">
                  {['January-2026', 'February-2026', 'March-2026', 'April-2026', 'May-2026'].map((month) => (
                    <label key={month} className="flex items-center gap-3 cursor-pointer">
                      <Checkbox 
                        checked={selectedDepartureMonths.includes(month)}
                        onCheckedChange={(checked) => handleDepartureMonthChange(month, checked as boolean)}
                        className="data-[state=checked]:bg-[#2E4D98] data-[state=checked]:border-[#2E4D98]" 
                      />
                      <span className="text-gray-700">{month}</span>
                    </label>
                  ))}
                </div>
              </div> */}

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

              
              <div className="mb-8">
                <h3 className="font-semibold text-lg mb-4 text-[#2E4D98]">Indian Tours</h3>
                <div className={`${showMoreIndian ? "max-h-40 overflow-y-auto pr-1" : ""} space-y-3`}>
                  {[
                    'Andaman', 'Goa', 'Kerala', 'Himachal', 'Rajasthan', 'Kashmir',
                    ...(showMoreIndian
                      ? ['Tamil Nadu', 'Sikkim', 'Meghalaya', 'Uttarakhand', 'Gujarat', 'Pondicherry']
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
                <h3 className="font-semibold text-lg mb-4 text-[#2E4D98]">World Tours</h3>
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
            <div className="relative rounded-2xl overflow-hidden mb-6">
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
                <div className="bg-white p-4 border-t">
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

<div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden border border-[#1e3a8a]">
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
    <div className="border-r border-[#1e3a8a] px-4 py-3 bg-blue-50">
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
  "Cost Inclusive & Cost Excludes", // This will become "cost-inclusive-&-cost-excludes"
  "Flight & Hotel",
  "Booking",
  "Cancellation",
  "Instruction"
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
            {/* Tab Contents */}
            <div className="bg-[#2E4D98] rounded-xl shadow-sm p-6">
              
              {/* Itinerary Tab */}
              {activeTab === "itinerary" && (
  <div className="bg-[#C2E2FA] rounded-lg p-6 max-h-[calc(100vh-250px)] overflow-y-auto">

    <h2 className="text-2xl font-bold text-gray-800 mb-6">Tour Itinerary</h2>

    <div className="space-y-6">
      {tour.itinerary.map((day, index) => (
        <div
          key={index}
          className="flex gap-6 p-6 bg-white shadow-sm border border-gray-200 rounded-lg hover:border-[#2E4D98] transition-colors duration-200"
        >
          <div className="flex flex-col items-center flex-shrink-0">
            {index < tour.itinerary.length - 1 && (
              <div className="w-0.5 h-full bg-gray-300 mt-4"></div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-4">
                <h3 className="text-xl font-bold text-[#2E4D98]">{day.day}</h3>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <h4 className="text-xl font-semibold text-gray-800">{day.title}</h4>
              </div>
              <MealIndicator meals={day.meals} />
            </div>

            <p className="text-gray-600 leading-relaxed text-lg text-justify tracking-wide">
              {day.description}
            </p>
          </div>
        </div>
      ))}

       {/* Meal Legend */}
                  <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-gray-800 mb-2">Meal Legend:</h3>
                    <div className="flex gap-6 flex-wrap">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-green-100 border border-green-300 flex items-center justify-center">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-sm text-gray-700">Included</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-red-100 border border-red-300 flex items-center justify-center">
                          <X className="w-3 h-3 text-red-600" />
                        </div>
                        <span className="text-sm text-gray-700">Not Included</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700">B - Breakfast</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700">L - Lunch</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700">D - Dinner</span>
                      </div>
                    </div>
                  </div>
    </div>
  </div>
)}


              {/* Departure Dates Tab */}
              {activeTab === "dep-date" && (
                <div className="bg-[#E8F0FF] rounded-lg p-6">
<h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
  Departure Dates
</h2>
                  
                  {/* Departure Dates Module */}
                  <div className="border border-gray-300 rounded-lg overflow-hidden">
                
                    
                    {/* Middle Section - Empty area */}
                    <div className="min-h-[300px] p-6 bg-white">
                      {/* Empty area - no content */}
                    </div>
                    
                    {/* Bottom Section */}
                    {/* <div className="py-3 text-center border-t border-gray-300 bg-[#E8F0FF]">
                      <h3 className="text-xl font-bold text-gray-900">Free Flow Entry</h3>
                    </div> */}
                  </div>

                  {/* Additional Information */}
                  {/* <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Booking Information:</h3>
                    <ul className="text-gray-600 space-y-2 text-lg">
                      <li>• All departure dates are guaranteed with minimum 2 passengers</li>
                      <li>• Early booking recommended for preferred dates</li>
                      <li>• Custom departure dates available for groups of 6+</li>
                      <li>• Contact us for last-minute availability</li>
                    </ul>
                  </div> */}
                </div>
              )}

              {/* Tourcost Tab */}
             {/* Tourcost Tab */}
{activeTab === "tour-cost" && (
  <div>
    <h2 className="text-2xl font-bold text-white mb-6">Tour Cost</h2>

    
<div className="overflow-x-auto rounded-lg" style={{ border: '4px solid #D1D5DB' }}>
    <table className="w-full border-collapse table-fixed">
        <thead>
      <tr className="bg-gray-100">
        <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700 text-base w-1/5">
          Passenger
        </th>
        <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700 text-base w-1/5">
          Standard Hit
        </th>
        <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700 text-base w-1/5">
          Deluxe Hit
        </th>
        <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700 text-base w-1/5">
          Executive Hit
        </th>
        <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700 text-base w-1/5">
          Chd With Bed
        </th>
        <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700 text-base w-1/5">
          Chd no Bed
        </th>
      </tr>
    </thead>
    <tbody>
      {[
        { passenger: "02 Pax", standard: "NA", deluxe: "Rs 64,000", executive: "NA", childWithBed: "Rs 57,000", childNoBed: "Rs 53,000" },
        { passenger: "03 Pax", standard: "NA", deluxe: "Rs 63,500", executive: "NA", childWithBed: "Rs 56,500", childNoBed: "Rs 52,500" },
        { passenger: "04 Pax", standard: "NA", deluxe: "Rs 63,000", executive: "NA", childWithBed: "Rs 56,000", childNoBed: "Rs 52,000" },
        { passenger: "05 Pax", standard: "NA", deluxe: "Rs 62,500", executive: "NA", childWithBed: "Rs 55,500", childNoBed: "Rs 51,500" },
        { passenger: "06 Pax", standard: "NA", deluxe: "Rs 62,000", executive: "NA", childWithBed: "Rs 55,000", childNoBed: "Rs 51,000" },
        { passenger: "07 Pax", standard: "NA", deluxe: "Rs 61,500", executive: "NA", childWithBed: "Rs 54,500", childNoBed: "Rs 50,500" },
        { passenger: "08 Pax", standard: "NA", deluxe: "Rs 61,000", executive: "NA", childWithBed: "Rs 54,000", childNoBed: "Rs 50,000" },
        { passenger: "09 Pax", standard: "NA", deluxe: "Rs 60,500", executive: "NA", childWithBed: "Rs 53,500", childNoBed: "Rs 49,500" },
        { passenger: "10 Pax", standard: "NA", deluxe: "Rs 60,000", executive: "NA", childWithBed: "Rs 53,000", childNoBed: "Rs 49,000" }
      ].map((row, index) => (
        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
          <td className="border border-gray-300 px-4 py-3 text-center font-medium text-gray-700 text-base h-16">
            {row.passenger}
          </td>
          <td className="border border-gray-300 px-4 py-3 text-center text-gray-600 text-base h-16">
            {row.standard}
          </td>
          <td className="border border-gray-300 px-4 py-3 text-center text-green-600 font-semibold text-base h-16">
            {row.deluxe}
          </td>
          <td className="border border-gray-300 px-4 py-3 text-center text-gray-600 text-base h-16">
            {row.executive}
          </td>
          <td className="border border-gray-300 px-4 py-3 text-center text-blue-600 font-medium text-base h-16">
            {row.childWithBed}
          </td>
          <td className="border border-gray-300 px-4 py-3 text-center text-purple-600 font-medium text-base h-16">
            {row.childNoBed}
          </td>
        </tr>
      ))}
      
     <tr className="bg-white">
        <td className="border border-gray-300 px-4 py-3 text-center font-medium text-gray-700 text-base h-16">
                Remark
        </td>
        <td className="border border-gray-300 px-4 py-3 text-center text-gray-600 text-base h-16">
          
        </td>
        <td className="border border-gray-300 px-4 py-3 text-center text-gray-600 text-base h-16">
          
        </td>
        <td className="border border-gray-300 px-4 py-3 text-center text-gray-600 text-base h-16">
          
        </td>
        <td className="border border-gray-300 px-4 py-3 text-center text-gray-600 text-base h-16">
          
        </td>
        <td className="border border-gray-300 px-4 py-3 text-center text-gray-600 text-base h-16">
          
        </td>
      </tr>
    </tbody>
  </table>
</div>

    {/* Remarks Instructions */}
    {/* <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Remarks Instructions:</h3>
      <ul className="text-gray-600 space-y-1 text-sm">
        <li>• Click on any Remarks box to enter free flow text</li>
        <li>• Text will automatically justify and adjust within the box</li>
        <li>• You can add multiple lines and paragraphs</li>
        <li>• The box will expand as you type more content</li>
      </ul>
    </div> */}

    {/* Additional Information */}
    {/* <div className="mt-6 p-6 bg-blue-50 rounded-lg border border-blue-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-3">Important Notes:</h3>
      <ul className="text-gray-600 space-y-2 text-lg">
        <li>• All prices are per person in Indian Rupees</li>
        <li>• 5% GST extra on total package cost</li>
        <li>• Prices are subject to change without prior notice</li>
        <li>• Seasonal surcharges may apply during peak seasons</li>
        <li>• Child rates applicable for children between 5-12 years</li>
        <li>• Infant rates (0-2 years) available on request</li>
      </ul>
    </div> */}
  </div>
)}
          {/* Cost Includes & Excludes Tab */}
{activeTab === "cost-inclusive-&-cost-excludes" && (
  <div className="bg-[#E8F0FF] rounded-lg p-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
      Cost Inclusive & Cost Excludes
    </h2>
    
    {/* Two cards side by side */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      {/* Left Card - Cost Inclusive */}
      <div className="min-h-[300px] flex flex-col">
        <div className="bg-[#2E4D98] text-white text-center py-3 rounded-t-lg">
          <h3 className="text-xl font-bold">Cost Inclusive</h3>
        </div>
        <div className="flex-1 overflow-x-auto border-2 border-gray-300 rounded-b-lg bg-white">
          {/* Empty white card area */}
          <div className="h-full w-full p-4">
            {/* Empty content - completely white */}
          </div>
        </div>
      </div>
      
      {/* Right Card - Cost Excludes */}
      <div className="min-h-[300px] flex flex-col">
        <div className="bg-[#2E4D98] text-white text-center py-3 rounded-t-lg">
          <h3 className="text-xl font-bold">Cost Excludes</h3>
        </div>
        <div className="flex-1 overflow-x-auto border-2 border-gray-300 rounded-b-lg bg-white">
          {/* Empty white card area */}
          <div className="h-full w-full p-4">
            {/* Empty content - completely white */}
          </div>
        </div>
      </div>
      
    </div>
  </div>
)}
              {/* Flight & Hotel Tab */}
              {activeTab === "flight-&-hotel" && (
                <div className="bg-[#E8F0FF] rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Flight / Hotel Details</h2>
                  
            <div className="bg-[#E8F0FF] rounded-lg p-6">
         
                  <div className="border border-gray-300 rounded-lg overflow-hidden">
                
                    
                  
                    <div className="min-h-[300px] p-6 bg-white">
                   
                    </div>
               
                  </div>

                 
                </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Hotel Details</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-left">City</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Hotel Name</th>
                      
                            <th className="border border-gray-300 px-4 py-2 text-left">Room Type</th>
                                  <th className="border border-gray-300 px-4 py-2 text-left">Nights</th>
                            
                          </tr>
                        </thead>
                        <tbody>
                          {tour.hotels.map((hotel, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                              <td className="border border-gray-300 px-4 py-2">{hotel.city}</td>
                              <td className="border border-gray-300 px-4 py-2">{hotel.hotelName}</td>
                            
                              <td className="border border-gray-300 px-4 py-2">{hotel.roomType}</td>
                                <td className="border border-gray-300 px-4 py-2">{hotel.nights}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Booking Tab */}
              {activeTab === "booking" && (
                <div className="bg-[#E8F0FF] rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Booking Policy</h2>
                  <div className="space-y-4">
                    {tour.booking.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-6 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-lg font-bold">
                          {index + 1}
                        </div>
                        <span className="text-gray-700 text-lg">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Cancellation Tab */}
              {activeTab === "cancellation" && (
                <div className="bg-[#E8F0FF] rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Cancellation Policy</h2>
                  <div className="space-y-4">
                    {tour.cancellation.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-6 bg-red-50 rounded-lg border border-red-200">
                        <div className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-lg font-bold">
                          {index + 1}
                        </div>
                        <span className="text-gray-700 text-lg">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

                   {activeTab === "instruction" && (
                <div className="bg-[#E8F0FF] rounded-lg p-6">
<h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
  Instruction
</h2>
                 
                  <div className="border border-gray-300 rounded-lg overflow-hidden">
                
                    
                    {/* Middle Section - Empty area */}
                    <div className="min-h-[300px] p-6 bg-white">
                      {/* Empty area - no content */}
                    </div>
                    
                 
                  </div>

                 
                </div>
              )}

            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;