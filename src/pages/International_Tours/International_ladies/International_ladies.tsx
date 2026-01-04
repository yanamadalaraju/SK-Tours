import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

// International destination images and descriptions
const internationalDestinations = {
  "Dubai": {
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80",
    description: "Experience Luxury, Modern Architecture, and Desert Adventures in Dubai!"
  },
  "Europe": {
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&q=80",
    description: "Explore Historic Cities, Stunning Landscapes, and Diverse Cultures in Europe!"
  },
  "Maldives": {
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80",
    description: "Overwater Villas, Crystal Clear Waters, and Ultimate Relaxation in Maldives!"
  },
  "Mauritius": {
    image: "https://images.unsplash.com/photo-1523349789431-2206f6e8c9bf?w=1200&q=80",
    description: "Tropical Paradise, Beaches, and Cultural Fusion in Mauritius!"
  },
  "Thailand": {
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=1200&q=80",
    description: "Buddhist Temples, Tropical Islands, and Vibrant Nightlife in Thailand!"
  },
  "Bali": {
    image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=1200&q=80",
    description: "Spiritual Retreats, Rice Terraces, and Beautiful Beaches in Bali!"
  },
  "Singapore": {
    image: "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=1200&q=80",
    description: "Garden City, Modern Marvels, and Cultural Diversity in Singapore!"
  },
  "Vietnam": {
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=1200&q=80",
    description: "Ancient Temples, Bustling Cities, and Beautiful Coastlines in Vietnam!"
  },
  "Turkey": {
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200&q=80",
    description: "Where East Meets West - Historic Sites and Breathtaking Landscapes in Turkey!"
  },
  "Japan": {
    image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1200&q=80",
    description: "Cherry Blossoms, Ancient Temples, and Modern Cities in Japan!"
  },
  "South Korea": {
    image: "https://images.unsplash.com/photo-1534274867514-d5b47ef89ed7?w=1200&q=80",
    description: "K-Pop Culture, Historic Palaces, and Technological Wonders in South Korea!"
  },
  "Australia": {
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1200&q=80",
    description: "Great Barrier Reef, Unique Wildlife, and Vibrant Cities in Australia!"
  }
};

// Static international tour data
const staticInternationalTours = {
  "Africa": [
    {
      id: 101,
      code: "DUB001",
      title: "Dubai Luxury Experience",
      duration: "4N/5D",
      days: 5,
      price: "₹89,999",
      priceValue: 89999,
      locations: "Burj Khalifa, Desert Safari, Dubai Mall",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
      emi: "₹7,500",
      emiPriceValue: 7500,
      isIndian: false,
      tourType: "international"
    },
    {
      id: 102,
      code: "DUB002",
      title: "Dubai & Abu Dhabi Combo",
      duration: "5N/6D",
      days: 6,
      price: "₹115,000",
      priceValue: 115000,
      locations: "Dubai, Abu Dhabi, Sheikh Zayed Mosque",
      image: "https://images.unsplash.com/photo-1571707374475-8f2a8ce3e2d3?w=800&q=80",
      emi: "₹9,583",
      emiPriceValue: 9583,
      isIndian: false,
      tourType: "international"
    }
  ],
  "Europe": [
    {
      id: 201,
      code: "EUR001",
      title: "European Highlights Tour",
      duration: "9N/10D",
      days: 10,
      price: "₹2,25,000",
      priceValue: 225000,
      locations: "Paris, Switzerland, Italy",
      image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80",
      emi: "₹18,750",
      emiPriceValue: 18750,
      isIndian: false,
      tourType: "international"
    },
    {
      id: 202,
      code: "EUR002",
      title: "Eastern Europe Discovery",
      duration: "7N/8D",
      days: 8,
      price: "₹1,75,000",
      priceValue: 175000,
      locations: "Prague, Vienna, Budapest",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
      emi: "₹14,583",
      emiPriceValue: 14583,
      isIndian: false,
      tourType: "international"
    }
  ],
  "Maldives": [
    {
      id: 301,
      code: "MAL001",
      title: "Maldives Overwater Villa Package",
      duration: "5N/6D",
      days: 6,
      price: "₹1,45,000",
      priceValue: 145000,
      locations: "Male, Overwater Villa, Coral Reefs",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
      emi: "₹12,083",
      emiPriceValue: 12083,
      isIndian: false,
      tourType: "international"
    },
    {
      id: 302,
      code: "MAL002",
      title: "Maldives Honeymoon Special",
      duration: "6N/7D",
      days: 7,
      price: "₹1,85,000",
      priceValue: 185000,
      locations: "Private Island Resort, Spa, Snorkeling",
      image: "https://images.unsplash.com/photo-1564501049418-3c27787d01e8?w=800&q=80",
      emi: "₹15,417",
      emiPriceValue: 15417,
      isIndian: false,
      tourType: "international"
    }
  ],
  "Thailand": [
    {
      id: 401,
      code: "THA001",
      title: "Thailand City & Beach Tour",
      duration: "6N/7D",
      days: 7,
      price: "₹65,000",
      priceValue: 65000,
      locations: "Bangkok, Pattaya, Phuket",
      image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=80",
      emi: "₹5,417",
      emiPriceValue: 5417,
      isIndian: false,
      tourType: "international"
    },
    {
      id: 402,
      code: "THA002",
      title: "Thai Cultural Experience",
      duration: "5N/6D",
      days: 6,
      price: "₹55,000",
      priceValue: 55000,
      locations: "Chiang Mai, Bangkok, Temples",
      image: "https://images.unsplash.com/photo-1552465011-b4e30bf7349d?w=800&q=80",
      emi: "₹4,583",
      emiPriceValue: 4583,
      isIndian: false,
      tourType: "international"
    }
  ],
  "Bali": [
    {
      id: 501,
      code: "BAL001",
      title: "Bali Spiritual Retreat",
      duration: "5N/6D",
      days: 6,
      price: "₹72,000",
      priceValue: 72000,
      locations: "Ubud, Seminyak, Uluwatu Temple",
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&q=80",
      emi: "₹6,000",
      emiPriceValue: 6000,
      isIndian: false,
      tourType: "international"
    },
    {
      id: 502,
      code: "BAL002",
      title: "Bali Beach & Adventure",
      duration: "4N/5D",
      days: 5,
      price: "₹62,000",
      priceValue: 62000,
      locations: "Kuta, Nusa Dua, Water Sports",
      image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80",
      emi: "₹5,167",
      emiPriceValue: 5167,
      isIndian: false,
      tourType: "international"
    }
  ],
  "Singapore": [
    {
      id: 601,
      code: "SIN001",
      title: "Singapore City Tour",
      duration: "3N/4D",
      days: 4,
      price: "₹48,000",
      priceValue: 48000,
      locations: "Marina Bay, Sentosa, Universal Studios",
      image: "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&q=80",
      emi: "₹4,000",
      emiPriceValue: 4000,
      isIndian: false,
      tourType: "international"
    },
    {
      id: 602,
      code: "SIN002",
      title: "Singapore & Malaysia Combo",
      duration: "5N/6D",
      days: 6,
      price: "₹78,000",
      priceValue: 78000,
      locations: "Singapore, Kuala Lumpur, Genting",
      image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80",
      emi: "₹6,500",
      emiPriceValue: 6500,
      isIndian: false,
      tourType: "international"
    }
  ]
};

const International_ladies = () => {
  const navigate = useNavigate();
  const { state } = useParams();
  const [showMoreDestinations, setShowMoreDestinations] = useState(false);
  const [sortType, setSortType] = useState("recommended");

  // Filter states
  const [durationRange, setDurationRange] = useState([0, 120]);
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [selectedDepartureMonths, setSelectedDepartureMonths] = useState<string[]>([]);
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [filteredTours, setFilteredTours] = useState<any[]>([]);
  const [formattedTours, setFormattedTours] = useState<any[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<string>(state || "Dubai");

  // Decode destination from URL
  useEffect(() => {
    if (state) {
      const decodedDestination = decodeURIComponent(state);
      console.log("Decoded destination from URL:", decodedDestination);
      setSelectedDestination(decodedDestination);
    }
  }, [state]);

  // Format tours when selectedDestination changes
  useEffect(() => {
    console.log("Selected destination changed to:", selectedDestination);
    
    // Get tours for current destination from static data
    const destinationTours = staticInternationalTours[selectedDestination as keyof typeof staticInternationalTours] || [];
    console.log("Found tours for destination:", destinationTours.length);
    
    setFormattedTours(destinationTours);
  }, [selectedDestination]);

  // Apply filters to formatted tours
  useEffect(() => {
    console.log("=== APPLYING FILTERS ===");
    console.log("Starting with formatted tours:", formattedTours.length);
    
    if (formattedTours.length === 0) {
      setFilteredTours([]);
      return;
    }

    let result = [...formattedTours];
    console.log("Initial tours count:", result.length);

    // Duration filter
    console.log("Duration range:", durationRange);
    result = result.filter(
      (tour) => tour.days >= durationRange[0] && tour.days <= durationRange[1]
    );
    console.log("After duration filter:", result.length);

    // Price filter
    console.log("Price range:", priceRange);
    result = result.filter(
      (tour) =>
        tour.priceValue >= priceRange[0] && tour.priceValue <= priceRange[1]
    );
    console.log("After price filter:", result.length);

    // Destination filter
    if (selectedDestinations.length > 0) {
      console.log("Selected destinations:", selectedDestinations);
      result = result.filter((tour) => {
        return selectedDestinations.some((sel) => {
          if (selectedDestination === sel) return true;
          if (tour.title.toLowerCase().includes(sel.toLowerCase())) return true;
          if (tour.locations.toLowerCase().includes(sel.toLowerCase()))
            return true;
          return false;
        });
      });
      console.log("After destination filter:", result.length);
    }

    // Sorting
    console.log("Sort type:", sortType);
    if (sortType === "price-low") {
      result.sort((a, b) => a.priceValue - b.priceValue);
    } else if (sortType === "price-high") {
      result.sort((a, b) => b.priceValue - a.priceValue);
    } else if (sortType === "duration") {
      result.sort((a, b) => a.days - b.days);
    }

    console.log("Final filtered tours count:", result.length);
    setFilteredTours(result);
  }, [
    formattedTours,
    durationRange,
    priceRange,
    selectedDepartureMonths,
    selectedDestinations,
    sortType,
    selectedDestination
  ]);

  // Filter handlers
  const handleDepartureMonthChange = (month: string, checked: boolean) => {
    if (checked) {
      setSelectedDepartureMonths([...selectedDepartureMonths, month]);
    } else {
      setSelectedDepartureMonths(
        selectedDepartureMonths.filter((m) => m !== month)
      );
    }
  };

  const handleDestinationChange = (destination: string, checked: boolean) => {
    if (checked) {
      setSelectedDestinations([...selectedDestinations, destination]);
    } else {
      setSelectedDestinations(selectedDestinations.filter((d) => d !== destination));
    }
  };

  const clearAllFilters = () => {
    setDurationRange([0, 120]);
    setPriceRange([0, 500000]);
    setSelectedDepartureMonths([]);
    setSelectedDestinations([]);
    setSortType("recommended");
  };

  const heroImage =
    internationalDestinations[selectedDestination as keyof typeof internationalDestinations]?.image ??
    '/img/default.jpg';

  const heroDescription =
    internationalDestinations[selectedDestination as keyof typeof internationalDestinations]?.description ??
    'Explore amazing international destinations!';

  // Available international destinations
  const allDestinations = [
    'Dubai', 'Europe', 'Maldives', 'Mauritius', 'Thailand', 'Bali',
    'Singapore', 'Vietnam', 'Turkey', 'Japan', 'South Korea', 'Australia'
  ];

  return (
    <>
      <div className="min-h-screen bg-[#E53C42] bg-opacity-10">
        <Header />

        {/* Combined Hero and Filter Section */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters Sidebar */}
            <aside className="lg:w-80">
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl shadow-lg p-6 border border-blue-200 sticky top-24">
                <div className="flex justify-between items-center mb-6 bg-white p-2 rounded-lg border border-black">
                  <h2 className="text-2xl font-bold text-[#2E4D98]">International Tours</h2>
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
                    max={30} 
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
                    min={0} 
                    max={500000} 
                    step={1000} 
                  />
                </div>

                {/* Destinations */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-6 bg-white p-2 rounded-lg border border-black">
                    <h2 className="text-2xl font-bold text-[#2E4D98]">Destinations</h2>
                  </div>
                  <div className={`${showMoreDestinations ? "max-h-40 overflow-y-auto pr-1" : ""} space-y-3`}>
                    {allDestinations.slice(0, showMoreDestinations ? allDestinations.length : 6).map((place) => {
                      const isCurrentDestination = selectedDestination === place;
                      
                      return (
                        <div key={place} className="flex items-center gap-3 cursor-pointer">
                          <Checkbox 
                            checked={isCurrentDestination}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                clearAllFilters();
                                navigate(`/international-tours-packages/${encodeURIComponent(place)}`);
                              }
                            }}
                            className="data-[state=checked]:bg-[#2E4D98] data-[state=checked]:border-[#2E4D98]" 
                          />
                          <span 
                            className={`text-gray-700 hover:text-[#2E4D98] cursor-pointer ${isCurrentDestination ? 'font-bold text-[#2E4D98]' : ''}`}
                            onClick={() => {
                              clearAllFilters();
                              navigate(`/international-tours-packages/${encodeURIComponent(place)}`);
                            }}
                          >
                            {place}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <button
                    onClick={() => setShowMoreDestinations(!showMoreDestinations)}
                    className="mt-3 text-[#2E4D98] text-sm font-semibold hover:underline"
                  >
                    {showMoreDestinations ? "Show Less" : "Show More"}
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
                    backgroundImage: `url('${heroImage}')`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/10"></div>
                </div>

                {/* Hero Content */}
                <div className="relative p-8 min-h-[200px] flex items-center">
                  <div className="text-white">
                    <h1 className="text-3xl font-bold mb-2">{selectedDestination} Tour Packages</h1>
                    <p className="text-base opacity-90 max-w-2xl">
                      {heroDescription}
                    </p>
                    <p className="text-sm opacity-80 mt-2">
                      Showing {filteredTours.length} tour packages for {selectedDestination}
                      <span className="ml-2 text-xs">(Total available: {formattedTours.length})</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Main Content Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">{selectedDestination} Holiday Packages</h2>
                  <p className="text-gray-600 mt-1">
                    Showing {filteredTours.length} of {formattedTours.length} international tours • Best prices guaranteed
                  </p>
                </div>
              </div>

              {/* 3 Cards Per Row */}
              {filteredTours.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold text-gray-600">No international tours found for the selected filters</h3>
                  <p className="text-gray-500 mt-2">
                    Total available tours for {selectedDestination}: {formattedTours.length}
                  </p>
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
                      <div className="group bg-blue-50 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border border-blue-100 flex flex-col flex-1 min-h-0">
                        {/* Image Section */}
                        <div className="relative h-56 overflow-hidden flex-shrink-0">
                          <img
                            src={tour.image}
                            alt={tour.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        </div>

                        {/* Content Section */}
                        <div className="p-5 flex-1 flex flex-col min-h-0">
                          <h3 className="font-bold text-lg text-gray-800 line-clamp-2 mb-2">
                            {tour.title}
                          </h3>

                          {/* Price Details */}
                          <div className="mb-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-semibold text-gray-700">Tour Cost</span>
                              <p className="text-2xl font-bold text-gray-900">{tour.price}</p>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">EMI per/month</span>
                              <p className="text-sm font-bold text-gray-900">{tour.emi}</p>
                            </div>
                          </div>

                          <p className="text-sm text-gray-600 mb-3 flex-1 line-clamp-2">{tour.locations}</p>

                          <div className="flex items-center justify-between text-sm text-gray-500 mb-0">
                            <span>{tour.dates}</span>
                          </div>

                          {/* Buttons */}
                          <div className="flex gap-2 mt-0">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 border-[#2E4D98] text-[#2E4D98] hover:bg-[#2E4D98] hover:text-white"
                              onClick={() => navigate(`/international_tour_details/${tour.id}`)}
                            >
                              View Tour
                            </Button>
                            <Button 
                              size="sm" 
                              className="flex-1 bg-[#E53C42] hover:bg-[#E53C42] hover:opacity-90 text-white"
                              onClick={() => {
                                localStorage.setItem('selectedTour', JSON.stringify(tour));
                                navigate('/checkout', { state: { tour } });
                              }}
                            >
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
      <Footer />
    </>
  );
};

export default International_ladies;