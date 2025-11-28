

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ChevronRight } from 'lucide-react';
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

  // Mock tour data with multiple images
  const tourData = {
    "ABCD00000": {
      title: "Explore Andaman",
      duration: "05 Days",
      price: "₹64,000",
      emi: "EMI from ₹2,387/month",
      badge: "New Year Deal ₹1,000 Off",
      locations: "Port Blair • Havelock • Neil Island",
      dates: "42 Dates Available",
      images: [
        "https://i.pinimg.com/736x/09/16/c4/0916c43d72ac007aee1a1a7d6d31d231.jpg",
        "https://i.pinimg.com/736x/6a/f9/0e/6af90eea656d653c788e7d3f92a77247.jpg",
        "https://i.pinimg.com/1200x/67/10/27/671027210a396e38b27e5d0432bd18db.jpg",
        "https://i.pinimg.com/736x/7a/82/6d/7a826d8ac0e6d1fb10ad845f7f6b0ac5.jpg",
        "https://i.pinimg.com/736x/95/04/dd/9504ddc6c27c0d16ea8ecbde4a95b191.jpg"
      ],
      code: "DOMI00000",
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
          description: "Arrive at Port Blair Airport and transfer to hotel. Later visit Cellular Jail followed by Light and Sound Show."
        },
        {
          day: "Day 2",
          title: "Port Blair to Havelock",
          description: "Early morning departure by ferry to Havelock Island. Visit Radhanagar Beach - rated as Asia's best beach."
        },
        {
          day: "Day 3",
          title: "Havelock Island",
          description: "Snorkeling at Elephant Beach. Optional scuba diving and other water sports activities."
        },
        {
          day: "Day 4",
          title: "Havelock to Neil Island",
          description: "Ferry to Neil Island. Visit Laxmanpur Beach, Natural Bridge, and Bharatpur Beach."
        },
        {
          day: "Day 5",
          title: "Neil Island to Port Blair & Departure",
          description: "Return to Port Blair. City tour and shopping before departure to airport."
        }
      ],
      departureDates: {
        months: [
          {
            name: "January",
            dates: ["01", "05", "08", "12", "15", "18", "22", "25"]
          },
          {
            name: "February",
            dates: ["02", "06", "09", "13", "16", "19", "23", "26"]
          },
          {
            name: "March",
            dates: ["03", "07", "10", "14", "17", "20", "24", "27"]
          },
          {
            name: "April",
            dates: ["04", "08", "11", "15", "18", "21", "25", "28"]
          },
          {
            name: "May",
            dates: ["05", "09", "12", "16", "19", "22", "26", "29"]
          },
          {
            name: "June",
            dates: ["06", "10", "13", "17", "20", "23", "27", "30"]
          },
          {
            name: "July",
            dates: ["01", "05", "08", "12", "15", "18", "22", "25"]
          },
          {
            name: "August",
            dates: ["02", "06", "09", "13", "16", "19", "23", "26"]
          },
          {
            name: "September",
            dates: ["03", "07", "10", "14", "17", "20", "24", "27"]
          },
          {
            name: "October",
            dates: ["04", "08", "11", "15", "18", "21", "25", "28"]
          },
          {
            name: "November",
            dates: ["05", "09", "12", "16", "19", "22", "26", "29"]
          },
          {
            name: "December",
            dates: ["06", "10", "13", "17", "20", "23", "27", "30"]
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
          nights: "1 Night",
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
          depDate: "29 Nov 2025",
          depTime: "16:00",
          to: "Delhi",
          arrDate: "29 Nov 2025",
          arrTime: "19:30"
        }
      ],
      specialRemarks: "• All timings are approximate and subject to change\n• Flight schedules may vary based on airline operations\n• Hotel check-in: 14:00 hrs, check-out: 12:00 hrs\n• Early check-in and late check-out subject to availability\n• Package rates are dynamic and may change without prior notice",
      tourCost: [
        {
          particular: "Per pax on Twin Basis",
          threeStar: "NA",
          fourStar: "Rs 45,000",
          fiveStar: "NA"
        },
        {
          particular: "Per pax on Triple Basis",
          threeStar: "NA",
          fourStar: "Rs 44,500",
          fiveStar: "NA"
        },
        {
          particular: "Child with Bed",
          threeStar: "NA",
          fourStar: "Rs 38,000",
          fiveStar: "NA"
        },
        {
          particular: "Child without Bed",
          threeStar: "NA",
          fourStar: "Rs 34,000",
          fiveStar: "NA"
        },
        {
          particular: "Infant",
          threeStar: "NA",
          fourStar: "Rs 7,000",
          fiveStar: "NA"
        },
        {
          particular: "Per pax Single Occupancy",
          threeStar: "NA",
          fourStar: "On Request",
          fiveStar: "NA"
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
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

  return (
    <div className="min-h-screen bg-gray-50">
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
              <div className="mb-8">
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

            {/* Excel-like Table Layout */}
            <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden border border-gray-300">

              {/* ===== FIRST ROW: HEADERS ===== */}
              <div className="grid grid-cols-8 bg-[#E8F0FF] border-b border-gray-300">
                <div className="col-span-2 border-r border-gray-300 px-4 py-3">
                  <h3 className="font-bold text-gray-900 text-center text-lg">Tour Code</h3>
                </div>
                <div className="col-span-4 border-r border-gray-300 px-4 py-3">
                  <h3 className="font-bold text-gray-900 text-center text-lg">Tour Name</h3>
                </div>
                <div className="col-span-2 px-4 py-3">
                  <h3 className="font-bold text-gray-900 text-center text-lg">Days</h3>
                </div>
              </div>

              {/* ===== SECOND ROW: VALUES ===== */}
              <div className="grid grid-cols-8 border-b border-gray-300">
                <div className="col-span-2 border-r border-gray-300 px-4 py-6 bg-blue-50">
                  <p className="text-xl font-bold text-[#2E4D98] text-center tracking-wide">
                    DOMI00000
                  </p>
                </div>

                <div className="col-span-4 border-r border-gray-300 px-4 py-6 bg-gray-50">
                  <p className="text-xl font-semibold text-gray-900 text-center">
                    Explore Andaman
                  </p>
                </div>

                <div className="col-span-2 px-4 py-6 bg-red-50">
                  <p className="text-xl font-bold text-[#E53C42] text-center">
                    05 Days
                  </p>
                </div>
              </div>

              {/* ===== THIRD ROW: TABS ===== */}
              <div className="grid grid-cols-8 bg-white border-b border-gray-300">
                {[
                  "Itinerary",
                  "Departure Dt",
                  "Tour Cost",
                  "Cost Includes",
                  "Cost Excludes",
                  "Flight & Hotel",
                  "Booking",
                  "Cancellation"
                ].map((label) => (
                  <button
                    key={label}
                    onClick={() => setActiveTab(label.toLowerCase().replace(/\s+/g, '-'))}
                    className={`px-3 py-4 text-sm font-semibold text-center border-r last:border-r-0 border-gray-300 transition 
                      ${
                        activeTab === label.toLowerCase().replace(/\s+/g, '-')
                          ? "bg-[#2E4D98] text-white"
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
            <div className="bg-white rounded-xl shadow-sm p-6">
              
              {/* Itinerary Tab */}
              {activeTab === "itinerary" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Tour Itinerary</h2>
                  <div className="space-y-6">
                    {tour.itinerary.map((day, index) => (
                      <div key={index} className="flex gap-6 p-6 border border-gray-200 rounded-lg hover:border-[#2E4D98] transition-colors duration-200">
                        <div className="flex flex-col items-center flex-shrink-0">
                          <div className="w-14 h-14 bg-[#2E4D98] text-white rounded-full flex items-center justify-center font-bold text-xl">
                            {index + 1}
                          </div>
                          {index < tour.itinerary.length - 1 && (
                            <div className="w-0.5 h-full bg-gray-300 mt-4"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-3">
                            <h3 className="text-xl font-bold text-[#2E4D98]">{day.day}</h3>
                            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                            <h4 className="text-xl font-semibold text-gray-800">{day.title}</h4>
                          </div>
                          <p className="text-gray-600 leading-relaxed text-lg">{day.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Departure Dates Tab */}
              {activeTab === "departure-dt" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Departure Dates</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* First Column - Jan to Jun */}
                    <div className="space-y-3">
                      {tour.departureDates.months.slice(0, 6).map((month, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#2E4D98] transition-colors duration-200">
                          <span className="text-lg font-semibold text-gray-800">{month.name}</span>
                          <div className="flex gap-2 flex-wrap justify-end">
                            {month.dates.map((date, dateIndex) => (
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

                    {/* Second Column - Jul to Dec */}
                    <div className="space-y-3">
                      {tour.departureDates.months.slice(6, 12).map((month, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#2E4D98] transition-colors duration-200">
                          <span className="text-lg font-semibold text-gray-800">{month.name}</span>
                          <div className="flex gap-2 flex-wrap justify-end">
                            {month.dates.map((date, dateIndex) => (
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
                  </div>

                  {/* Additional Information */}
                  <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Booking Information:</h3>
                    <ul className="text-gray-600 space-y-2 text-lg">
                      <li>• All departure dates are guaranteed with minimum 2 passengers</li>
                      <li>• Early booking recommended for preferred dates</li>
                      <li>• Custom departure dates available for groups of 6+</li>
                      <li>• Contact us for last-minute availability</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Tourcost Tab */}
              {activeTab === "tour-cost" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Tour Cost</h2>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-6 py-4 text-left font-semibold text-gray-700 text-lg">
                            Particulars - Tour Cost in (Mention)
                          </th>
                          <th className="border border-gray-300 px-6 py-4 text-center font-semibold text-gray-700 text-lg">
                            3 Star
                          </th>
                          <th className="border border-gray-300 px-6 py-4 text-center font-semibold text-gray-700 text-lg">
                            4 Star
                          </th>
                          <th className="border border-gray-300 px-6 py-4 text-center font-semibold text-gray-700 text-lg">
                            5 Star
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {tour.tourCost.map((item, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="border border-gray-300 px-6 py-4 text-gray-700 font-medium text-lg">
                              {item.particular}
                            </td>
                            <td className="border border-gray-300 px-6 py-4 text-center text-gray-600 text-lg">
                              {item.threeStar}
                            </td>
                            <td className="border border-gray-300 px-6 py-4 text-center text-green-600 font-semibold text-lg">
                              {item.fourStar}
                            </td>
                            <td className="border border-gray-300 px-6 py-4 text-center text-gray-600 text-lg">
                              {item.fiveStar}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Additional Information */}
                  <div className="mt-6 p-6 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Important Notes:</h3>
                    <ul className="text-gray-600 space-y-2 text-lg">
                      <li>• All prices are per person in Indian Rupees</li>
                      <li>• 5% GST extra on total package cost</li>
                      <li>• Prices are subject to change without prior notice</li>
                      <li>• Seasonal surcharges may apply during peak seasons</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Cost Includes Tab */}
              {activeTab === "cost-includes" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Cost Includes</h2>
                  <div className="space-y-3">
                    {tour.inclusionExclusion.inclusions.map((inclusion, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700 text-lg">{inclusion}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Cost Excludes Tab */}
              {activeTab === "cost-excludes" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Cost Excludes</h2>
                  <div className="space-y-3">
                    {tour.inclusionExclusion.exclusions.map((exclusion, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
                        <div className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700 text-lg">{exclusion}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Flight & Hotel Tab */}
              {activeTab === "flight-&-hotel" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Flight & Hotel Details</h2>
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Flight Details</h3>
                    <div className="space-y-4">
                      {tour.airlines.map((flight, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
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
                        </div>
                      ))}
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
                            <th className="border border-gray-300 px-4 py-2 text-left">Nights</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Room Type</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tour.hotels.map((hotel, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                              <td className="border border-gray-300 px-4 py-2">{hotel.city}</td>
                              <td className="border border-gray-300 px-4 py-2">{hotel.hotelName}</td>
                              <td className="border border-gray-300 px-4 py-2">{hotel.nights}</td>
                              <td className="border border-gray-300 px-4 py-2">{hotel.roomType}</td>
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
                <div>
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
                <div>
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

            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;