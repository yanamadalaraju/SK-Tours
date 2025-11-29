import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

const LadiesSpecialTour = () => {
  const navigate = useNavigate();
  const [viewMode] = useState<'grid' | 'list'>('grid');
  const [showMoreIndian, setShowMoreIndian] = useState(false);
  const [showMoreWorld, setShowMoreWorld] = useState(false);
  const [sortType, setSortType] = useState("recommended");
  
  // Filter states
  const [durationRange, setDurationRange] = useState([5, 11]);
  const [priceRange, setPriceRange] = useState([32990, 153000]);
  const [selectedDepartureMonths, setSelectedDepartureMonths] = useState<string[]>([]);
  const [selectedIndianTours, setSelectedIndianTours] = useState<string[]>([]);
  const [selectedWorldTours, setSelectedWorldTours] = useState<string[]>([]);
  const [filteredTours, setFilteredTours] = useState<any[]>([]);

  // Ladies Special Tour Data
  const ladiesSpecialTours = [
    {
      title: "Women's Wellness Retreat - Kerala",
      duration: "6N/7D",
      price: "₹45,000",
      emi: "EMI from ₹1,679/month",
      badge: "Wellness",
      locations: "Kochi • Alleppey • Kumarakom",
      dates: "25 Dates Available",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
      code: "LS00001",
      days: 7,
      priceValue: 45000,
      locationTags: ["Kochi", "Alleppey", "Kumarakom"],
      isIndian: true,
      category: "ladies-special"
    },
    {
      title: "Ladies Shopping & Spa - Goa",
      duration: "4N/5D",
      price: "₹38,000",
      emi: "EMI from ₹1,418/month",
      badge: "Shopping & Spa",
      locations: "North Goa • Beach Resorts • Spas",
      dates: "30 Dates Available",
      image: "https://thetravelbloggerindia.wordpress.com/wp-content/uploads/2023/02/image-34.png?w=1024",
      code: "LS00002",
      days: 5,
      priceValue: 38000,
      locationTags: ["North Goa", "Beach Resorts", "Spas"],
      isIndian: true,
      category: "ladies-special"
    },
    {
      title: "Women Only Himalayan Retreat",
      duration: "7N/8D",
      price: "₹52,000",
      emi: "EMI from ₹1,940/month",
      badge: "Mountain Retreat",
      locations: "Shimla • Manali • Dharamshala",
      dates: "20 Dates Available",
      image: "https://media1.thrillophilia.com/filestore/wn6byla5ejhldz1iwxi29vfcs2tg_shutterstock_2189213791.jpg?w=400&dpr=2",
      code: "LS00003",
      days: 8,
      priceValue: 52000,
      locationTags: ["Shimla", "Manali", "Dharamshala"],
      isIndian: true,
      category: "ladies-special"
    },
    {
      title: "Ladies Luxury Beach Escape - Andaman",
      duration: "5N/6D",
      price: "₹58,000",
      emi: "EMI from ₹2,164/month",
      badge: "Luxury Beach",
      locations: "Port Blair • Havelock • Neil Island",
      dates: "22 Dates Available",
      image: "https://media-cdn.tripadvisor.com/media/photo-s/1c/d4/5c/13/pearl-park-beach-resort.jpg",
      code: "LS00004",
      days: 6,
      priceValue: 58000,
      locationTags: ["Port Blair", "Havelock", "Neil Island"],
      isIndian: true,
      category: "ladies-special"
    },
    {
      title: "Women's Cultural Heritage Tour - Rajasthan",
      duration: "6N/7D",
      price: "₹48,000",
      emi: "EMI from ₹1,791/month",
      badge: "Cultural",
      locations: "Jaipur • Udaipur • Jodhpur",
      dates: "28 Dates Available",
      image: "https://www.indiadrivertours.com/wp-content/uploads/2024/07/rajasthan-solo-female-traveler.jpg",
      code: "LS00005",
      days: 7,
      priceValue: 48000,
      locationTags: ["Jaipur", "Udaipur", "Jodhpur"],
      isIndian: true,
      category: "ladies-special"
    },
    {
      title: "Ladies Yoga & Meditation Retreat",
      duration: "5N/6D",
      price: "₹42,000",
      emi: "EMI from ₹1,567/month",
      badge: "Yoga Retreat",
      locations: "Rishikesh • Yoga Ashrams • Ganga",
      dates: "35 Dates Available",
      image: "https://bookretreats.com/cdn-cgi/image/width=1200,quality=65,f=auto,sharpen=1,fit=cover,gravity=auto/assets/photo/retreat/0m/7k/7930/p_1423828/1000_1713078381.jpg",
      code: "LS00006",
      days: 6,
      priceValue: 42000,
      locationTags: ["Rishikesh", "Yoga Ashrams", "Ganga"],
      isIndian: true,
      category: "ladies-special"
    },
    {
      title: "Women Only Wildlife Safari",
      duration: "4N/5D",
      price: "₹35,000",
      emi: "EMI from ₹1,306/month",
      badge: "Wildlife",
      locations: "Ranthambore • Tiger Safari • Jungle",
      dates: "18 Dates Available",
      image: "https://media.istockphoto.com/id/506872450/photo/capturing-wildlife.jpg?s=612x612&w=0&k=20&c=rwpVhwj8Yv1uyjqvrcAuL5UhL80Y58JY9EhwzmqUUpc=",
      code: "LS00007",
      days: 5,
      priceValue: 35000,
      locationTags: ["Ranthambore", "Tiger Safari", "Jungle"],
      isIndian: true,
      category: "ladies-special"
    },
    {
      title: "Ladies Gourmet Food Tour",
      duration: "4N/5D",
      price: "₹32,000",
      emi: "EMI from ₹1,194/month",
      badge: "Food Tour",
      locations: "Delhi • Agra • Local Cuisine",
      dates: "32 Dates Available",
      image: "https://journeywoman.com/wp-content/uploads/2024/08/Food-Tours-Woman-Eating-in-Market.jpg",
      code: "LS00008",
      days: 5,
      priceValue: 32000,
      locationTags: ["Delhi", "Agra", "Local Cuisine"],
      isIndian: true,
      category: "ladies-special"
    },
    {
      title: "Women's Adventure & Trekking",
      duration: "5N/6D",
      price: "₹40,000",
      emi: "EMI from ₹1,492/month",
      badge: "Adventure",
      locations: "Manali • Trekking • Camping",
      dates: "25 Dates Available",
      image: "https://57hours.com/wp-content/uploads/2024/08/iStock-1917023956-1920x1280.jpg",
      code: "LS00009",
      days: 6,
      priceValue: 40000,
      locationTags: ["Manali", "Trekking", "Camping"],
      isIndian: true,
      category: "ladies-special"
    }
  ];

  // Apply filters whenever filter states change
  useEffect(() => {
    let result = [...ladiesSpecialTours];
    
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
      // In a real app, this would filter by actual departure dates
      result = result.filter(() => true);
    }
    
    // Apply Indian tours filter
    if (selectedIndianTours.length > 0) {
      result = result.filter(tour => {
        if (!tour.isIndian) return false;
        
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
    
    // Apply world tours filter
    if (selectedWorldTours.length > 0) {
      result = result.filter(tour => {
        if (tour.isIndian) return false;
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
    setFilteredTours(ladiesSpecialTours);
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
    setDurationRange([5, 11]);
    setPriceRange([32990, 153000]);
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
                <h2 className="text-2xl font-bold text-[#2E4D98]">Ladies Special Tours</h2>
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

          {/* Hero and Main Content Area */}
          <main className="flex-1">
            {/* Hero Section */}
            <div className="relative rounded-2xl overflow-hidden mb-6">
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ 
                  backgroundImage: `url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80')` 
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-pink-700/10"></div>
              </div>
              
              {/* Hero Content */}
              <div className="relative p-8 min-h-[200px] flex items-center">
                <div className="text-white">
                  <h1 className="text-3xl font-bold mb-2">Ladies Special Tours</h1>
                  <p className="text-base opacity-90 max-w-2xl">
                    Exclusive Women-Only Tours Designed for Safety, Comfort, and Unforgettable Experiences!
                  </p>
                  <p className="text-sm opacity-80 mt-2">
                    Showing {filteredTours.length} specially curated tour packages for women
                  </p>
                </div>
              </div>
            </div>

            {/* Main Content Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Women-Only Holiday Packages</h2>
                <p className="text-gray-600 mt-1">Showing {filteredTours.length} of {ladiesSpecialTours.length} tours • Women-friendly accommodations & activities</p>
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

                    {/* Separate Card with Light Pink Background */}
                    <div className="group bg-pink-50 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border border-pink-100 flex flex-col flex-1">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={tour.image}
                          alt={tour.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        
                        <Badge className="absolute top-4 left-4 bg-white text-pink-600 font-bold">
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
                          <span className="text-green-600 font-semibold">Women Only</span>
                        </div>

                        {/* Buttons - Updated with navigation */}
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

export default LadiesSpecialTour;