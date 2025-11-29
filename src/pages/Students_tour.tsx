import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

const Students_tour = () => {
  const navigate = useNavigate();
  const [viewMode] = useState<'grid' | 'list'>('grid');
  const [showMoreIndian, setShowMoreIndian] = useState(false);
  const [showMoreWorld, setShowMoreWorld] = useState(false);
  const [sortType, setSortType] = useState("recommended");
  
  // Filter states
  const [durationRange, setDurationRange] = useState([3, 10]);
  const [priceRange, setPriceRange] = useState([15000, 80000]);
  const [selectedDepartureMonths, setSelectedDepartureMonths] = useState<string[]>([]);
  const [selectedIndianTours, setSelectedIndianTours] = useState<string[]>([]);
  const [selectedWorldTours, setSelectedWorldTours] = useState<string[]>([]);
  const [filteredTours, setFilteredTours] = useState<any[]>([]);

  // Student Tour Data
  const studentTours = [
    {
      title: "Adventure Trek - Manali & Kasol",
      duration: "4N/5D",
      price: "₹18,500",
      emi: "EMI from ₹689/month",
      badge: "Adventure",
      locations: "Manali • Kasol • Trekking • Camping",
      dates: "25 Dates Available",
      image: "https://img.invinciblengo.org/iconscout/f:jpeg/w:2000/h:0/rt:fit/plain/https://invincible.s3.wasabisys.com/trek/ee88644c-893d-4ca2-bcdb-de71eb6bf37a",
      code: "ST00001",
      days: 5,
      priceValue: 18500,
      locationTags: ["Manali", "Kasol", "Trekking", "Camping"],
      isIndian: true,
      category: "student-adventure"
    },
    {
      title: "Beach Party - Goa Student Special",
      duration: "3N/4D",
      price: "₹12,000",
      emi: "EMI from ₹448/month",
      badge: "Beach",
      locations: "North Goa • Anjuna • Beach Parties",
      dates: "40 Dates Available",
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80",
      code: "ST00002",
      days: 4,
      priceValue: 12000,
      locationTags: ["Goa", "Anjuna", "Beach", "Parties"],
      isIndian: true,
      category: "student-beach"
    },
    {
      title: "Backpacking Rajasthan - Budget Trip",
      duration: "6N/7D",
      price: "₹22,000",
      emi: "EMI from ₹821/month",
      badge: "Heritage",
      locations: "Jaipur • Jodhpur • Udaipur • Pushkar",
      dates: "30 Dates Available",
      image: "https://www.enlivetrips.com/uploads/gallery/c2404115b7.jpg",
      code: "ST00003",
      days: 7,
      priceValue: 22000,
      locationTags: ["Jaipur", "Jodhpur", "Udaipur", "Pushkar"],
      isIndian: true,
      category: "student-heritage"
    },
    {
      title: "South India Exploration - Bangalore to Munnar",
      duration: "5N/6D",
      price: "₹19,500",
      emi: "EMI from ₹728/month",
      badge: "Exploration",
      locations: "Bangalore • Mysore • Ooty • Munnar",
      dates: "28 Dates Available",
      image: "https://www.gtholidays.in/wp-content/uploads/2019/07/Munnar-800x600.jpg",
      code: "ST00004",
      days: 6,
      priceValue: 19500,
      locationTags: ["Bangalore", "Mysore", "Ooty", "Munnar"],
      isIndian: true,
      category: "student-exploration"
    },
    {
      title: "Himalayan Road Trip - Spiti Valley",
      duration: "7N/8D",
      price: "₹28,000",
      emi: "EMI from ₹1,045/month",
      badge: "Road Trip",
      locations: "Manali • Spiti • Key Monastery • Chandratal",
      dates: "20 Dates Available",
      image: "https://media.assettype.com/outlooktraveller%2F2024-06%2Ff2a5bd7e-bba3-48fc-bbd1-7796eb4c847f%2Fshutterstock_1129297934.jpg?w=640&auto=format%2Ccompress",
      code: "ST00005",
      days: 8,
      priceValue: 28000,
      locationTags: ["Spiti", "Manali", "Himalayas", "Road Trip"],
      isIndian: true,
      category: "student-adventure"
    },
    {
      title: "Wildlife & Nature - Ranthambore Safari",
      duration: "2N/3D",
      price: "₹9,500",
      emi: "EMI from ₹354/month",
      badge: "Wildlife",
      locations: "Ranthambore • Safari • Nature Walk",
      dates: "35 Dates Available",
      image: "https://www.adventurush.com/wp-content/uploads/2022/08/shutterstock_1268935471.jpg",
      code: "ST00006",
      days: 3,
      priceValue: 9500,
      locationTags: ["Ranthambore", "Safari", "Wildlife"],
      isIndian: true,
      category: "student-wildlife"
    },
    {
      title: "International Student Trip - Thailand",
      duration: "4N/5D",
      price: "₹35,000",
      emi: "EMI from ₹1,306/month",
      badge: "International",
      locations: "Bangkok • Pattaya • Coral Island",
      dates: "15 Dates Available",
      image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=80",
      code: "ST00007",
      days: 5,
      priceValue: 35000,
      locationTags: ["Thailand", "Bangkok", "Pattaya"],
      isIndian: false,
      category: "student-international"
    },
    {
      title: "Dubai Student Special - 4 Days",
      duration: "3N/4D",
      price: "₹42,000",
      emi: "EMI from ₹1,567/month",
      badge: "Luxury",
      locations: "Burj Khalifa • Desert Safari • Dubai Mall",
      dates: "18 Dates Available",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
      code: "ST00008",
      days: 4,
      priceValue: 42000,
      locationTags: ["Dubai", "Burj Khalifa", "Desert Safari"],
      isIndian: false,
      category: "student-international"
    },
    {
      title: "Singapore & Malaysia Student Tour",
      duration: "5N/6D",
      price: "₹58,000",
      emi: "EMI from ₹2,164/month",
      badge: "International",
      locations: "Singapore • Genting • Kuala Lumpur",
      dates: "12 Dates Available",
      image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80",
      code: "ST00009",
      days: 6,
      priceValue: 58000,
      locationTags: ["Singapore", "Malaysia", "Kuala Lumpur"],
      isIndian: false,
      category: "student-international"
    }
  ];

  // Apply filters whenever filter states change
  useEffect(() => {
    let result = [...studentTours];
    
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
    setFilteredTours(studentTours);
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
    setDurationRange([3, 10]);
    setPriceRange([15000, 80000]);
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
                <h2 className="text-2xl font-bold text-[#2E4D98]">Student Tours</h2>
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
                  min={5000} 
                  max={100000} 
                  step={1000} 
                />
              </div>

              {/* Indian Tours */}
              <div className="mb-8">
                <h3 className="font-semibold text-lg mb-4 text-[#2E4D98]">Indian Tours</h3>
                <div className={`${showMoreIndian ? "max-h-40 overflow-y-auto pr-1" : ""} space-y-3`}>
                  {[
                    'Manali', 'Goa', 'Rajasthan', 'Kerala', 'Himachal', 'Uttarakhand',
                    ...(showMoreIndian
                      ? ['Spiti Valley', 'Rishikesh', 'Darjeeling', 'Andaman', 'Pondicherry', 'Munnar']
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
                    'Thailand', 'Dubai', 'Singapore', 'Malaysia', 'Bali', 'Sri Lanka',
                    ...(showMoreWorld
                      ? ['Vietnam', 'Cambodia', 'Nepal', 'Bhutan', 'Europe', 'Australia']
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
                  backgroundImage: `url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80')` 
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/10"></div>
              </div>
              
              {/* Hero Content */}
              <div className="relative p-8 min-h-[200px] flex items-center">
                <div className="text-white">
                  <h1 className="text-3xl font-bold mb-2">Student Tour Packages</h1>
                  <p className="text-base opacity-90 max-w-2xl">
                    Budget-Friendly Adventures for Students - Adventure, Fun, and Unforgettable Memories!
                  </p>
                  <p className="text-sm opacity-80 mt-2">
                    Showing {filteredTours.length} specially designed tour packages for students
                  </p>
                </div>
              </div>
            </div>

            {/* Main Content Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Student Holiday Packages</h2>
                <p className="text-gray-600 mt-1">Showing {filteredTours.length} of {studentTours.length} tours • Budget-friendly & Adventure-packed</p>
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
                          <span className="text-green-600 font-semibold">Student Special</span>
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

export default Students_tour;