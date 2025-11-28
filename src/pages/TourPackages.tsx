


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

const TourPackages = () => {
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

  const tourData = [
    {
      title: "Andaman Swaraj Dweep & Shaheed Dweep Delight",
      duration: "6N/7D",
      price: "₹64,000",
      emi: "EMI from ₹2,387/month",
      badge: "New Year Deal ₹1,000 Off",
      locations: "Port Blair • Havelock • Neil Island",
      dates: "42 Dates Available",
      image: "https://i.pinimg.com/736x/09/16/c4/0916c43d72ac007aee1a1a7d6d31d231.jpg",
      code: "ABCD00000",
      days: 7,
      priceValue: 64000,
      locationTags: ["Port Blair", "Havelock", "Neil Island"],
      isIndian: true
    },
    {
      title: "Andaman With Swaraj Dweep Premium",
      duration: "6N/7D",
      price: "₹42,000",
      emi: "EMI from ₹1,567/month",
      badge: "Best Seller",
      locations: "Port Blair • Havelock • Neil",
      dates: "34 Dates Available",
      image: "https://i.pinimg.com/1200x/6a/f9/0e/6af90eea656d653c788e7d3f92a77247.jpg",
      code: "ABCD00001",
      days: 7,
      priceValue: 42000,
      locationTags: ["Port Blair", "Havelock", "Neil"],
      isIndian: true
    },
    {
      title: "Andaman Luxury Escape",
      duration: "7N/8D",
      price: "₹89,000",
      emi: "EMI from ₹3,320/month",
      badge: "Luxury Collection",
      locations: "5-Star Resorts • Private Cruise",
      dates: "28 Dates",
      image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80",
      code: "ABCD00002",
      days: 8,
      priceValue: 89000,
      locationTags: ["5-Star Resorts", "Private Cruise"],
      isIndian: true
    },
    {
      title: "Andaman Family Adventure",
      duration: "5N/6D",
      price: "₹52,000",
      emi: "EMI from ₹1,940/month",
      badge: "Family Special",
      locations: "Port Blair • Havelock",
      dates: "38 Dates",
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
      code: "ABCD00003",
      days: 6,
      priceValue: 52000,
      locationTags: ["Port Blair", "Havelock"],
      isIndian: true
    },
    {
      title: "Andaman Romantic Beachside Retreat",
      duration: "5N/6D",
      price: "₹58,500",
      emi: "EMI from ₹2,175/month",
      badge: "Honeymoon Special",
      locations: "Havelock • Neil Island • Radhanagar Beach",
      dates: "29 Dates Available",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
      code: "ABCD00004",
      days: 6,
      priceValue: 58500,
      locationTags: ["Havelock", "Neil Island", "Radhanagar Beach"],
      isIndian: true
    },
    {
      title: "Complete Andaman Explorer",
      duration: "8N/9D",
      price: "₹99,500",
      emi: "EMI from ₹3,714/month",
      badge: "Explorer Pick",
      locations: "Baratang • Ross Island • Havelock • Neil",
      dates: "18 Dates Available",
      image: "https://i.pinimg.com/1200x/60/37/9a/60379a968deddaa202abffc3b2f02215.jpg",
      code: "ABCD00005",
      days: 9,
      priceValue: 99500,
      locationTags: ["Baratang", "Ross Island", "Havelock", "Neil"],
      isIndian: true
    },
    {
      title: "Andaman Budget Escape",
      duration: "4N/5D",
      price: "₹34,900",
      emi: "EMI from ₹1,309/month",
      badge: "Budget Friendly",
      locations: "Port Blair • North Bay • Cellular Jail",
      dates: "31 Dates Available",
      image: "https://i.pinimg.com/1200x/e5/07/bd/e507bd4266c581640bb6593dae1802a6.jpg",
      code: "ABCD00006",
      days: 5,
      priceValue: 34900,
      locationTags: ["Port Blair", "North Bay", "Cellular Jail"],
      isIndian: true
    },
    {
      title: "Andaman Luxury Cruise Package",
      duration: "7N/8D",
      price: "₹1,25,000",
      emi: "EMI from ₹4,678/month",
      badge: "Premium Cruise",
      locations: "Luxury Cruise • Private Beach • Water Villas",
      dates: "22 Dates Available",
      image: "https://i.pinimg.com/1200x/b2/f4/0d/b2f40d3b9996d971b8d43a41407423a4.jpg",
      code: "ABCD00007",
      days: 8,
      priceValue: 125000,
      locationTags: ["Luxury Cruise", "Private Beach", "Water Villas"],
      isIndian: true
    },
    {
      title: "Andaman Scuba Diving Adventure",
      duration: "6N/7D",
      price: "₹69,000",
      emi: "EMI from ₹2,560/month",
      badge: "Adventure Pick",
      locations: "Havelock • Elephant Beach • Dive School",
      dates: "25 Dates Available",
      image: "https://i.pinimg.com/1200x/04/01/1a/04011acc3effee9e7f692e2682082075.jpg",
      code: "ABCD00008",
      days: 7,
      priceValue: 69000,
      locationTags: ["Havelock", "Elephant Beach", "Dive School"],
      isIndian: true
    }
  ];

  // Apply filters whenever filter states change
  useEffect(() => {
    let result = [...tourData];
    
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
      // For demo, we'll just show all tours if any month is selected
      result = result.filter(() => true);
    }
    
    // Apply Indian tours filter
    if (selectedIndianTours.length > 0) {
      result = result.filter(tour => {
        if (!tour.isIndian) return false;
        return selectedIndianTours.some(selectedLocation => 
          tour.locationTags.some(tag => 
            tag.toLowerCase().includes(selectedLocation.toLowerCase())
          )
        );
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
  }, [durationRange, priceRange, selectedDepartureMonths, selectedIndianTours, selectedWorldTours, sortType]);

  // Initialize filtered tours
  useEffect(() => {
    setFilteredTours(tourData);
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
    <div className="min-h-screen bg-[ #E53C42] bg-opacity-10">
      <Header />

      {/* Combined Hero and Filter Section */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Filters Sidebar - Same level as hero */}
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

          {/* Hero and Main Content Area */}
          <main className="flex-1">
            {/* Hero Section */}
            <div className="relative rounded-2xl overflow-hidden mb-6">
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ 
                  backgroundImage: `url('https://i.pinimg.com/1200x/67/10/27/671027210a396e38b27e5d0432bd18db.jpg')` 
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/10"></div>
              </div>
              
              {/* Hero Content */}
              <div className="relative p-8 min-h-[200px] flex items-center">
                <div className="text-white">
                  <h1 className="text-3xl font-bold mb-2">Andaman Tour Packages</h1>
                  <p className="text-base opacity-90 max-w-2xl">
                    Where Time Slows Down, Beauty Takes Over, and Blue Waters Meet Endless Adventures!
                  </p>
                </div>
              </div>
            </div>

            {/* Main Content Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Andaman Holiday Packages</h2>
                <p className="text-gray-600 mt-1">Showing {filteredTours.length} of {tourData.length} tours • Best prices guaranteed</p>
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
                        <span className="text-green-600 font-semibold">Available</span>
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

            {/* Load More */}
            <div className="text-center mt-8">
              <Button size="lg" className="bg-[#2E4D98] hover:bg-[#2E4D98] hover:opacity-90 px-12 text-white">
                Load More Tours
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default TourPackages;