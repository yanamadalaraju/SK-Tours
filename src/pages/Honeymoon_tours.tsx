import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

const Honeymoon_tours = () => {
  const navigate = useNavigate();
  const [viewMode] = useState<'grid' | 'list'>('grid');
  const [showMoreIndian, setShowMoreIndian] = useState(false);
  const [showMoreWorld, setShowMoreWorld] = useState(false);
  const [sortType, setSortType] = useState("recommended");
  
  // Filter states
  const [durationRange, setDurationRange] = useState([4, 10]);
  const [priceRange, setPriceRange] = useState([35000, 150000]);
  const [selectedDepartureMonths, setSelectedDepartureMonths] = useState<string[]>([]);
  const [selectedIndianTours, setSelectedIndianTours] = useState<string[]>([]);
  const [selectedWorldTours, setSelectedWorldTours] = useState<string[]>([]);
  const [filteredTours, setFilteredTours] = useState<any[]>([]);

  // Honeymoon Tour Data - Only Indian Tours
  const honeymoonTours = [
    {
      title: "Kashmir Romance - Houseboat Stay",
      duration: "6N/7D",
      price: "₹68,000",
      emi: "EMI from ₹2,537/month",
      badge: "Romantic",
      locations: "Srinagar • Gulmarg • Pahalgam • Houseboat",
      dates: "35 Dates Available",
      image: "https://www.tourmyindia.com/states/jammu-kashmir/image/houseboats-jk.jpg",
      code: "HM00001",
      days: 7,
      priceValue: 68000,
      locationTags: ["Kashmir", "Srinagar", "Houseboat", "Gulmarg"],
      isIndian: true,
      category: "honeymoon-romantic"
    },
    {
      title: "Goa Beach Romance - Luxury Resort",
      duration: "4N/5D",
      price: "₹52,000",
      emi: "EMI from ₹1,940/month",
      badge: "Beach",
      locations: "Private Beach • Candlelight Dinner • Couple Massage",
      dates: "40 Dates Available",
      image: "https://assets.cntraveller.in/photos/60b9ee3ae1b212c19a8166bd/16:9/w_1024%2Cc_limit/Romantic%2520Dinning%2520(opt-1)-879622860-1366x768.jpg",
      code: "HM00002",
      days: 5,
      priceValue: 52000,
      locationTags: ["Goa", "Beach", "Luxury", "Resort"],
      isIndian: true,
      category: "honeymoon-beach"
    },
    {
      title: "Kerala Backwaters - Houseboat",
      duration: "5N/6D",
      price: "₹48,000",
      emi: "EMI from ₹1,791/month",
      badge: "Backwaters",
      locations: "Alleppey • Kumarakom • Private Houseboat • Ayurveda",
      dates: "30 Dates Available",
      image: "https://3seastours.com/assets/img/gallery/gallery16.webp",
      code: "HM00003",
      days: 6,
      priceValue: 48000,
      locationTags: ["Kerala", "Backwaters", "Houseboat", "Alleppey"],
      isIndian: true,
      category: "honeymoon-backwaters"
    },
    {
      title: "Shimla Manali - Hill Station  Couple",
      duration: "7N/8D",
      price: "₹65,000",
      emi: "EMI from ₹2,425/month",
      badge: "Hill Station",
      locations: "Snow Points • Romantic Stays • Mountain Views",
      dates: "28 Dates Available",
      image: "https://www.holidaymonk.com/wp-content/uploads/2024/05/Himachal-Honeymoon-Tour-Package-1024x499.jpg",
      code: "HM00004",
      days: 8,
      priceValue: 65000,
      locationTags: ["Shimla", "Manali", "Mountains", "Hill Station"],
      isIndian: true,
      category: "honeymoon-hillstation"
    },
    {
      title: "Andaman Islands - Beach Paradise",
      duration: "5N/6D",
      price: "₹72,000",
      emi: "EMI from ₹2,686/month",
      badge: "Island",
      locations: "Havelock • Neil Island • Radhanagar Beach • Scuba",
      dates: "25 Dates Available",
      image: "https://seasontours.org/wp-content/uploads/2024/03/season-tours-and-travels-2.jpg",
      code: "HM00005",
      days: 6,
      priceValue: 72000,
      locationTags: ["Andaman", "Beach", "Island", "Havelock"],
      isIndian: true,
      category: "honeymoon-island"
    },
    {
      title: "Rajasthan Royal Couple - Palace Stay",
      duration: "6N/7D",
      price: "₹58,000",
      emi: "EMI from ₹2,164/month",
      badge: "Royal",
      locations: "Udaipur • Jaipur • Lake Palace • Cultural Shows",
      dates: "32 Dates Available",
      image: "https://assets.cntraveller.in/photos/620102ab48dec77b50c80b96/master/pass/romantic%20hotels%20in%20rajasthan%20lead.jpg",
      code: "HM00006",
      days: 7,
      priceValue: 58000,
      locationTags: ["Rajasthan", "Udaipur", "Palace", "Royal"],
      isIndian: true,
      category: "honeymoon-royal"
    },
    {
      title: "Darjeeling Gangtok - Tea Garden Romance",
      duration: "5N/6D",
      price: "₹45,000",
      emi: "EMI from ₹1,679/month",
      badge: "Tea Gardens",
      locations: "Toy Train • Tiger Hill • Monasteries • Mountain Views",
      dates: "26 Dates Available",
      image: "https://www.gyanrachanatours.com/wp-content/uploads/2023/09/3-8-636x426.jpg",
      code: "HM00007",
      days: 6,
      priceValue: 45000,
      locationTags: ["Darjeeling", "Gangtok", "Tea Gardens", "Mountains"],
      isIndian: true,
      category: "honeymoon-tea-gardens"
    },
    {
      title: "Coorg Munnar - Coffee Plantation Stay",
      duration: "4N/5D",
      price: "₹38,000",
      emi: "EMI from ₹1,418/month",
      badge: "Plantation",
      locations: "Coffee Estate • Waterfalls • Nature Walks • Spa",
      dates: "34 Dates Available",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmGc2jJ_xvhYPSBz_DDfbczasU0rIcsfEDpw&s",
      code: "HM00008",
      days: 5,
      priceValue: 38000,
      locationTags: ["Coorg", "Munnar", "Plantation", "Coffee"],
      isIndian: true,
      category: "honeymoon-plantation"
    },
    {
      title: "Ladakh Adventure Couple - Mountain Escape",
      duration: "7N/8D",
      price: "₹82,000",
      emi: "EMI from ₹3,059/month",
      badge: "Adventure",
      locations: "Leh • Pangong Lake • Nubra Valley • Monasteries",
      dates: "20 Dates Available",
      image: "https://wanderon-images.gumlet.io/gallery/new/2025/06/26/1750935823698-things-to-do-in-ladakh-for-couples.jpg",
      code: "HM00009",
      days: 8,
      priceValue: 82000,
      locationTags: ["Ladakh", "Leh", "Mountains", "Adventure"],
      isIndian: true,
      category: "honeymoon-adventure"
    }
  ];

  // Apply filters whenever filter states change
  useEffect(() => {
    let result = [...honeymoonTours];
    
    // Apply duration filter
    result = result.filter(tour => 
      tour.days >= durationRange[0] && tour.days <= durationRange[1]
    );
    
    // Apply price filter
    result = result.filter(tour => 
      tour.priceValue >= priceRange[0] && tour.priceValue <= priceRange[1]
    );
    
    // Apply departure month filter (if any selected)
    if (selectedDepartureMonths.length > 0) {
      result = result.filter(() => true);
    }
    
    // Apply Indian tours filter
    if (selectedIndianTours.length > 0) {
      result = result.filter(tour => {
        return selectedIndianTours.some(selectedLocation => {
          const locationLower = selectedLocation.toLowerCase();
          return tour.locationTags.some(tag => 
            tag.toLowerCase().includes(locationLower) ||
            tour.title.toLowerCase().includes(locationLower) ||
            tour.locations.toLowerCase().includes(locationLower)
          );
        });
      });
    }
    
    // Apply world tours filter (disabled since we only have Indian tours)
    if (selectedWorldTours.length > 0) {
      result = result.filter(tour => {
        return selectedWorldTours.some(selectedLocation => 
          tour.locationTags.some(tag => 
            tag.toLowerCase().includes(selectedLocation.toLowerCase())
          )
        );
      });
    }
    
    // Apply sorting
    if (sortType === "price-low") {
      result.sort((a, b) => a.priceValue - b.priceValue);
    } else if (sortType === "price-high") {
      result.sort((a, b) => b.priceValue - a.priceValue);
    } else if (sortType === "duration") {
      result.sort((a, b) => a.days - b.days);
    }
    
    setFilteredTours(result);
  }, [
    durationRange, 
    priceRange, 
    selectedDepartureMonths, 
    selectedIndianTours, 
    selectedWorldTours, 
    sortType
  ]);

  // Initialize filtered tours
  useEffect(() => {
    setFilteredTours(honeymoonTours);
  }, []);

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
    setDurationRange([4, 10]);
    setPriceRange([35000, 150000]);
    setSelectedDepartureMonths([]);
    setSelectedIndianTours([]);
    setSelectedWorldTours([]);
    setSortType("recommended");
  };

  return (
    <div className="min-h-screen bg-[#E53C42] bg-opacity-10">
      <Header />

      {/* Combined Hero and Filter Section */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Filters Sidebar */}
          <aside className="lg:w-80">
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl shadow-lg p-6 border border-blue-200 sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#2E4D98]">Honeymoon Tours</h2>
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
                  min={30000} 
                  max={200000} 
                  step={5000} 
                />
              </div>

              {/* Indian Tours */}
              <div className="mb-8">
                <h3 className="font-semibold text-lg mb-4 text-[#2E4D98]">Indian Destinations</h3>
                <div className={`${showMoreIndian ? "max-h-40 overflow-y-auto pr-1" : ""} space-y-3`}>
                  {[
                    'Kashmir', 'Goa', 'Kerala', 'Shimla', 'Manali', 'Andaman',
                    ...(showMoreIndian
                      ? ['Rajasthan', 'Darjeeling', 'Coorg', 'Munnar', 'Ladakh', 'Gangtok']
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

              {/* World Tours - Hidden since we only have Indian tours */}
              <div className="hidden">
                <h3 className="font-semibold text-lg mb-4 text-[#2E4D98]">World Tours</h3>
                <div className={`${showMoreWorld ? "max-h-40 overflow-y-auto pr-1" : ""} space-y-3`}>
                  {[
                    'Maldives', 'Bali', 'Switzerland', 'Mauritius', 'Dubai', 'Thailand'
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
              </div>
            </div>
          </aside>

          {/* Hero and Main Content Area */}
          <main className="flex-1">
            {/* Hero Section */}
            <div className="relative rounded-2xl overflow-hidden mb-6">
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ 
                  backgroundImage: `url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80')` 
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/10"></div>
              </div>
              
              {/* Hero Content */}
              <div className="relative p-8 min-h-[200px] flex items-center">
                <div className="text-white">
                  <h1 className="text-3xl font-bold mb-2">Indian Honeymoon Tours</h1>
                  <p className="text-base opacity-90 max-w-2xl">
                    Romantic Getaways Across India - Luxury, Privacy, and Unforgettable Memories in Incredible India!
                  </p>
                  <p className="text-sm opacity-80 mt-2">
                    Showing {filteredTours.length} specially curated Indian honeymoon packages for couples
                  </p>
                </div>
              </div>
            </div>

            {/* Main Content Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Indian Honeymoon Packages</h2>
                <p className="text-gray-600 mt-1">Showing {filteredTours.length} of {honeymoonTours.length} tours • Romantic & Luxury stays across India</p>
              </div>

              <div className="flex items-center gap-4">
                <Tabs defaultValue="grid">
                  <TabsList className="grid grid-cols-2">
                    <TabsTrigger value="grid">Grid</TabsTrigger>
                    <TabsTrigger value="list">List</TabsTrigger>
                  </TabsList>
                </Tabs>

                <Select value={sortType} onValueChange={setSortType}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recommended">Recommended</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="duration">Duration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* 3 Cards Per Row */}
            {filteredTours.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-600">No tours found for the selected filters</h3>
                <p className="text-gray-500 mt-2">Try adjusting your filters or clear all filters to see more options</p>
                <Button 
                  onClick={clearAllFilters}
                  className="mt-4 bg-[#2E4D98] hover:bg-[#2E4D98] hover:opacity-90 text-white"
                >
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTours.map((tour, index) => (
                  <div key={index} className="flex flex-col">
                    {/* Separate Top Block - Excel-like box design */}
                    <div className="bg-white border-2 border-gray-300 rounded-lg p-3 mb-3 shadow-sm">
                      <div className="grid grid-cols-3 gap-0 border border-gray-400 rounded overflow-hidden">
                        {/* Box 1 - Code Label */}
                        <div className="bg-gray-100 border-r border-gray-400 p-2">
                          <div className="text-xs font-semibold text-gray-700 text-center">CODE</div>
                        </div>
                        
                        {/* Box 2 - Code Value */}
                        <div className="bg-white border-r border-gray-400 p-2">
                          <div className="text-sm font-bold text-gray-900 text-center">{tour.code}</div>
                        </div>
                        
                        {/* Box 3 - Duration */}
                        <div className="bg-gray-50 p-2">
                          <div className="text-sm font-bold text-gray-900 text-center">{tour.duration}</div>
                        </div>
                      </div>
                    </div>

                    {/* Separate Card with Light Blue Background */}
                    <div className="group bg-blue-50 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border border-blue-100 flex flex-col flex-1">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={tour.image}
                          alt={tour.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        
                        <Badge className="absolute top-4 left-4 bg-white text-[#2E4D98] font-bold">
                          {tour.badge}
                        </Badge>
                      </div>

                      <div className="p-5 flex-1 flex flex-col">
                        <h3 className="font-bold text-lg text-gray-800 line-clamp-2 mb-3">
                          {tour.title}
                        </h3>
                        
                        {/* Price Details - Outside Image */}
                        <div className="mb-3">
                          <p className="text-2xl font-bold text-gray-900">{tour.price}</p>
                          <p className="text-sm text-gray-600">{tour.emi}</p>
                        </div>

                        <p className="text-sm text-gray-600 mb-3 flex-1">{tour.locations}</p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <span>{tour.dates}</span>
                          <span className="text-pink-600 font-semibold">Honeymoon Special</span>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-2 mt-auto">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1 border-[#2E4D98] text-[#2E4D98] hover:bg-[#2E4D98] hover:text-white"
                            onClick={() => navigate(`/tour/${tour.code}`)}
                          >
                            View Tour
                          </Button>
                          <Button size="sm" className="flex-1 bg-[#E53C42] hover:bg-[#E53C42] hover:opacity-90 text-white">
                            Book Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Load More */}
            {filteredTours.length > 0 && (
              <div className="text-center mt-8">
                <Button size="lg" className="bg-[#2E4D98] hover:bg-[#2E4D98] hover:opacity-90 px-12 text-white">
                  Load More Tours
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Honeymoon_tours;