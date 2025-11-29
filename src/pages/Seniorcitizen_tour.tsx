import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

const Seniorcitizen_tour = () => {
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

  // Senior Citizen Tour Data
  const seniorCitizenTours = [
    {
      title: "Senior Wellness Retreat - Kerala Backwaters",
      duration: "6N/7D",
      price: "₹42,000",
      emi: "EMI from ₹1,567/month",
      badge: "Wellness",
      locations: "Alleppey • Kumarakom • Houseboat Stay",
      dates: "30 Dates Available",
      image: "https://content.jdmagicbox.com/comp/kumarakom/t7/9999px481.x481.190422132502.s8t7/catalogue/niraamaya-retreats-backwaters-and-beyond-kumarakom-north-kumarakom-resorts-0p5sk0u5ao.jpg",
      code: "SC00001",
      days: 7,
      priceValue: 42000,
      locationTags: ["Alleppey", "Kumarakom", "Houseboat"],
      isIndian: true,
      category: "senior-citizen"
    },
    {
      title: "Golden Age Pilgrimage - Tamil Nadu Temples",
      duration: "5N/6D",
      price: "₹35,000",
      emi: "EMI from ₹1,306/month",
      badge: "Pilgrimage",
      locations: "Madurai • Rameswaram • Kanyakumari",
      dates: "35 Dates Available",
      image: "https://i0.wp.com/templesmap.com/wp-content/uploads/2025/10/tamil-nadu-temple-pilgrimage.jpg.jpg",
      code: "SC00002",
      days: 6,
      priceValue: 35000,
      locationTags: ["Madurai", "Rameswaram", "Kanyakumari"],
      isIndian: true,
      category: "senior-citizen"
    },
    {
      title: "Senior Hill Station Escape - Ooty & Coonoor",
      duration: "4N/5D",
      price: "₹38,000",
      emi: "EMI from ₹1,418/month",
      badge: "Hill Station",
      locations: "Ooty • Coonoor • Tea Gardens",
      dates: "40 Dates Available",
      image: "https://static.wixstatic.com/media/nsplsh_5194d6d4c9874580be4723ce038dd9be~mv2.jpg/v1/fill/w_2500,h_3750,al_c/nsplsh_5194d6d4c9874580be4723ce038dd9be~mv2.jpg",
      code: "SC00003",
      days: 5,
      priceValue: 38000,
      locationTags: ["Ooty", "Coonoor", "Tea Gardens"],
      isIndian: true,
      category: "senior-citizen"
    },
    {
      title: "Golden Years Heritage Tour - Rajasthan",
      duration: "7N/8D",
      price: "₹48,000",
      emi: "EMI from ₹1,791/month",
      badge: "Heritage",
      locations: "Jaipur • Udaipur • Jodhpur",
      dates: "25 Dates Available",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOWQhQKrTc76qMADgFLWTh5fIWkMl5p_-IOw&s",
      code: "SC00004",
      days: 8,
      priceValue: 48000,
      locationTags: ["Jaipur", "Udaipur", "Jodhpur"],
      isIndian: true,
      category: "senior-citizen"
    },
    {
      title: "Senior Spiritual Journey - Varanasi & Ayodhya",
      duration: "5N/6D",
      price: "₹32,000",
      emi: "EMI from ₹1,194/month",
      badge: "Spiritual",
      locations: "Varanasi • Ayodhya • Sarnath",
      dates: "45 Dates Available",
      image: "https://prod-khyaal-web-resources.s3.ap-south-1.amazonaws.com/khyaal-website/travel/ayodhya/slider-2.jpg",
      code: "SC00005",
      days: 6,
      priceValue: 32000,
      locationTags: ["Varanasi", "Ayodhya", "Sarnath"],
      isIndian: true,
      category: "senior-citizen"
    },
    {
      title: "Golden Age Beach Relaxation - Goa",
      duration: "4N/5D",
      price: "₹36,000",
      emi: "EMI from ₹1,343/month",
      badge: "Beach Relaxation",
      locations: "North Goa • Calangute • Beach Resorts",
      dates: "38 Dates Available",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4VKYCQGLGbfSkM7u_0JMji56mwHMpYC98FA&s",
      code: "SC00006",
      days: 5,
      priceValue: 36000,
      locationTags: ["North Goa", "Calangute", "Beach Resorts"],
      isIndian: true,
      category: "senior-citizen"
    },
    {
      title: "Senior Wildlife & Nature - Jim Corbett",
      duration: "3N/4D",
      price: "₹28,000",
      emi: "EMI from ₹1,045/month",
      badge: "Wildlife",
      locations: "Jim Corbett • Safari • Nature Walks",
      dates: "32 Dates Available",
      image: "https://cdn.britannica.com/09/142609-050-E6CA7C4B/Chital-Corbett-National-Park-Uttarakhand-India.jpg",
      code: "SC00007",
      days: 4,
      priceValue: 28000,
      locationTags: ["Jim Corbett", "Safari", "Nature Walks"],
      isIndian: true,
      category: "senior-citizen"
    },
    {
      title: "Golden Years Cultural Tour - Karnataka",
      duration: "6N/7D",
      price: "₹45,000",
      emi: "EMI from ₹1,679/month",
      badge: "Cultural",
      locations: "Bangalore • Mysore • Hampi",
      dates: "28 Dates Available",
      image: "https://www.goldenchariottrain.com/images/Stone%20Chariot%20-%20Vittala%20Temple,%20Hampi%20on%20Golden%20Chariot%20Train%20Journey.png",
      code: "SC00008",
      days: 7,
      priceValue: 45000,
      locationTags: ["Bangalore", "Mysore", "Hampi"],
      isIndian: true,
      category: "senior-citizen"
    },
    {
      title: "Senior Ayurveda Rejuvenation - Kerala",
      duration: "5N/6D",
      price: "₹52,000",
      emi: "EMI from ₹1,940/month",
      badge: "Ayurveda",
      locations: "Kochi • Ayurvedic Center • Wellness",
      dates: "22 Dates Available",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUyQIdP9QQVJq3DPvecfdBjorgyG8JCqxNcg&s",
      code: "SC00009",
      days: 6,
      priceValue: 52000,
      locationTags: ["Kochi", "Ayurvedic Center", "Wellness"],
      isIndian: true,
      category: "senior-citizen"
    }
  ];

  // Apply filters whenever filter states change
  useEffect(() => {
    let result = [...seniorCitizenTours];
    
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
    setFilteredTours(seniorCitizenTours);
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
                <h2 className="text-2xl font-bold text-[#2E4D98]">Senior Citizen Tours</h2>
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
                    'Kerala', 'Tamil Nadu', 'Rajasthan', 'Goa', 'Karnataka', 'Uttarakhand',
                    ...(showMoreIndian
                      ? ['Himachal', 'Madhya Pradesh', 'Gujarat', 'Maharashtra', 'West Bengal', 'Andhra Pradesh']
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
                    'Singapore', 'Malaysia', 'Thailand', 'Dubai', 'Sri Lanka', 'Mauritius',
                    ...(showMoreWorld
                      ? ['Europe', 'Australia', 'Japan', 'Vietnam', 'Cambodia', 'Bali']
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
                  backgroundImage: `url('https://images.unsplash.com/photo-1587132135059-bc3c3dcfd4dc?w=1200&q=80')` 
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/10"></div>
              </div>
              
              {/* Hero Content */}
              <div className="relative p-8 min-h-[200px] flex items-center">
                <div className="text-white">
                  <h1 className="text-3xl font-bold mb-2">Senior Citizen Tours</h1>
                  <p className="text-base opacity-90 max-w-2xl">
                    Specially Curated Tours for Golden Age Travelers - Comfort, Safety, and Memorable Experiences!
                  </p>
                  <p className="text-sm opacity-80 mt-2">
                    Showing {filteredTours.length} specially designed tour packages for senior citizens
                  </p>
                </div>
              </div>
            </div>

            {/* Main Content Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Senior Citizen Holiday Packages</h2>
                <p className="text-gray-600 mt-1">Showing {filteredTours.length} of {seniorCitizenTours.length} tours • Senior-friendly accommodations & activities</p>
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
                          <span className="text-green-600 font-semibold">Senior Friendly</span>
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

export default Seniorcitizen_tour;