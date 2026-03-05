import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

// One Day Picnic destinations images and descriptions
const picnicDestinations = {
  "Lonavala": {
    image: "https://images.unsplash.com/photo-1626621341511-d8543d1a760d?w=1200&q=80",
    description: "Hill Stations, Waterfalls, and Caves - Perfect Weekend Getaway!"
  },
  "Mahabaleshwar": {
    image: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=1200&q=80",
    description: "Strawberry Farms, View Points, and Pleasant Weather in Mahabaleshwar!"
  },
  "Alibaug": {
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&q=80",
    description: "Beaches, Forts, and Water Sports - Beach Paradise Near Mumbai!"
  },
  "Matheran": {
    image: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=1200&q=80",
    description: "Asia's Only Automobile-Free Hill Station - Nature's Lap!"
  },
  "Khandala": {
    image: "https://images.unsplash.com/photo-1626621341511-d8543d1a760d?w=1200&q=80",
    description: "Valley Views, Duke's Nose, and Sunset Points in Khandala!"
  },
  "Karjat": {
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    description: "River Rafting, Trekking, and Camping Adventures in Karjat!"
  },
  "Igatpuri": {
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    description: "Waterfalls, Trekking, and Vipassana Center in Igatpuri!"
  },
  "Kamshet": {
    image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=1200&q=80",
    description: "Paragliding, Lakes, and Caves - Adventure Hub Near Pune!"
  },
  "Kolad": {
    image: "https://images.unsplash.com/photo-1566041510394-cf7c8fe21800?w=1200&q=80",
    description: "River Rafting, Camping, and Waterfall Rappelling in Kolad!"
  },
  "Pawna Lake": {
    image: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=1200&q=80",
    description: "Camping, Bonfire, and Lakeside Views at Pawna Lake!"
  },
  "Bhandardara": {
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
    description: "Wilson Dam, Arthur Lake, and Camping in Bhandardara!"
  },
  "Durshet": {
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    description: "Forest Camping, River Activities, and Adventure Sports in Durshet!"
  }
};

// Static one day picnic tour data
const staticPicnicTours = {
  "Lonavala": [
    {
      id: 101,
      code: "LON001",
      title: "Lonavala Hill Station Tour",
      duration: "1 Day",
      days: 1,
      price: "₹1,499",
      priceValue: 1499,
      image: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/07/98/ba/39.jpg",
      emi: "₹125",
      emiPriceValue: 125,
      isIndian: true,
      tourType: "picnic",
    },
    {
      id: 102,
      code: "LON002",
      title: "Lonavala Adventure & Caves",
      duration: "1 Day",
      days: 1,
      price: "₹1,999",
      priceValue: 1999,
      image: "https://hblimg.mmtcdn.com/content/hubble/img/lonavala/mmt/activities/m_activities_lonavala_khandala_della_adventure_park_1_l_480_640.jpg",
      emi: "₹167",
      emiPriceValue: 167,
      isIndian: true,
      tourType: "picnic",
    }
       ,
        {
  id: 104,
  code: "LON003",
  title: "Lonavala Lakes & Valleys Tour",
  duration: "1 Day",
  days: 1,
  price: "₹1,599",
  priceValue: 1599,
  locations: "Pawna Lake, Tungarli Lake, Valvan Dam, Lion's Point, Sunset Point",
  image: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=800&q=80",
  emi: "₹133",
  emiPriceValue: 133,
  isIndian: true,
  tourType: "picnic",
},
  ],
  "Mahabaleshwar": [
    {
      id: 201,
      code: "MAH001",
      title: "Mahabaleshwar Scenic Tour",
      duration: "1 Day",
      days: 1,
      price: "₹2,499",
      priceValue: 2499,
      locations: "Venna Lake, Arthur's Seat, Mapro Garden, Elephant's Head Point",
      image: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800&q=80",
      emi: "₹208",
      emiPriceValue: 208,
      isIndian: true,
      tourType: "picnic",
    },
    {
      id: 202,
      code: "MAH002",
      title: "Mahabaleshwar Special Package",
      duration: "1 Day",
      days: 1,
      price: "₹2,999",
      priceValue: 2999,
      locations: "All 27 Points, Private Vehicle, Guide, Strawberry Farm Visit",
      image: "https://images.unsplash.com/photo-1576669801945-7a346954da5a?w=800&q=80",
      emi: "₹250",
      emiPriceValue: 250,
      isIndian: true,
      tourType: "picnic",
    }
  ],
  "Alibaug": [
    {
      id: 301,
      code: "ALI001",
      title: "Alibaug Beach Day Tour",
      duration: "1 Day",
      days: 1,
      price: "₹1,799",
      priceValue: 1799,
      locations: "Nagaon Beach, Alibaug Beach, Kolaba Fort, Local Lunch",
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
      emi: "₹150",
      emiPriceValue: 150,
      isIndian: true,
      tourType: "picnic",
    },
    {
      id: 302,
      code: "ALI002",
      title: "Alibaug Water Sports Special",
      duration: "1 Day",
      days: 1,
      price: "₹2,299",
      priceValue: 2299,
      locations: "Kihim Beach, Water Sports, Kolaba Fort, Murud-Janjira",
      image: "https://images.unsplash.com/photo-1589805676435-4d3a93a41d27?w=800&q=80",
      emi: "₹192",
      emiPriceValue: 192,
      isIndian: true,
      tourType: "picnic",
    }
  ],
  "Matheran": [
    {
      id: 401,
      code: "MAT001",
      title: "Matheran Toy Train Tour",
      duration: "1 Day",
      days: 1,
      price: "₹1,899",
      priceValue: 1899,
      locations: "Toy Train Ride, Panorama Point, Charlotte Lake, Louisa Point",
      image: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800&q=80",
      emi: "₹158",
      emiPriceValue: 158,
      isIndian: true,
      tourType: "picnic",
    },
    {
      id: 402,
      code: "MAT002",
      title: "Matheran Nature Walk",
      duration: "1 Day",
      days: 1,
      price: "₹1,599",
      priceValue: 1599,
      locations: "Echo Point, Alexander Point, Porcupine Point, Charlotte Lake",
      image: "https://images.unsplash.com/photo-1590691056495-37bc606a49e1?w=800&q=80",
      emi: "₹133",
      emiPriceValue: 133,
      isIndian: true,
      tourType: "picnic",
    }
  ],
  "Khandala": [
    {
      id: 501,
      code: "KHA001",
      title: "Khandala Valley View Tour",
      duration: "1 Day",
      days: 1,
      price: "₹1,399",
      priceValue: 1399,
      locations: "Duke's Nose, Bushi Dam, Tiger's Leap, Amrutanjan Point",
      image: "https://images.unsplash.com/photo-1626621341511-d8543d1a760d?w=800&q=80",
      emi: "₹117",
      emiPriceValue: 117,
      isIndian: true,
      tourType: "picnic",
    }
  ],
  "Karjat": [
    {
      id: 601,
      code: "KAR001",
      title: "Karjat River Rafting",
      duration: "1 Day",
      days: 1,
      price: "₹1,999",
      priceValue: 1999,
      locations: "River Rafting, Kondana Caves, Waterfall Visit, Local Lunch",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      emi: "₹167",
      emiPriceValue: 167,
      isIndian: true,
      tourType: "picnic",
    }
  ],
  "Pawna Lake": [
    {
      id: 701,
      code: "PAW001",
      title: "Pawna Lake Camping Day Out",
      duration: "1 Day",
      days: 1,
      price: "₹1,599",
      priceValue: 1599,
      locations: "Lakeside Camping, BBQ Lunch, Kayaking, Photography",
      image: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=800&q=80",
      emi: "₹133",
      emiPriceValue: 133,
      isIndian: true,
      tourType: "picnic",
    }
  ],
  "Igatpuri": [
    {
      id: 801,
      code: "IGA001",
      title: "Igatpuri Waterfalls Tour",
      duration: "1 Day",
      days: 1,
      price: "₹1,699",
      priceValue: 1699,
      locations: "Bhatsa River Valley, Vipassana Center, Camel Valley, Waterfalls",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      emi: "₹142",
      emiPriceValue: 142,
      isIndian: true,
      tourType: "picnic",
    }
  ]
};

const OneDayPicnic = () => {
  const navigate = useNavigate();
  const { state } = useParams();
  const [showMoreDestinations, setShowMoreDestinations] = useState(false);
  const [sortType, setSortType] = useState("recommended");

  // Filter states
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [filteredTours, setFilteredTours] = useState<any[]>([]);
  const [formattedTours, setFormattedTours] = useState<any[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<string>(state || "Lonavala");

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
    const destinationTours = staticPicnicTours[selectedDestination as keyof typeof staticPicnicTours] || [];
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
    }

    console.log("Final filtered tours count:", result.length);
    setFilteredTours(result);
  }, [
    formattedTours,
    priceRange,
    selectedDestinations,
    sortType,
    selectedDestination
  ]);

  // Filter handlers
  const handleDestinationChange = (destination: string, checked: boolean) => {
    if (checked) {
      setSelectedDestinations([...selectedDestinations, destination]);
    } else {
      setSelectedDestinations(selectedDestinations.filter((d) => d !== destination));
    }
  };

  const clearAllFilters = () => {
    setPriceRange([0, 10000]);
    setSelectedDestinations([]);
    setSortType("recommended");
  };

  const heroImage =
    picnicDestinations[selectedDestination as keyof typeof picnicDestinations]?.image ??
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80';

  const heroDescription =
    picnicDestinations[selectedDestination as keyof typeof picnicDestinations]?.description ??
    'Enjoy a perfect one day picnic with family and friends!';

  // Available picnic destinations
  const allDestinations = [
    'Lonavala', 'Mahabaleshwar', 'Alibaug', 'Matheran', 'Khandala', 
    'Karjat', 'Igatpuri', 'Kamshet', 'Kolad', 'Pawna Lake', 'Bhandardara', 'Durshet'
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
                  <h2 className="text-2xl font-bold text-[#2E4D98]">One Day Picnics</h2>
                  <button 
                    onClick={clearAllFilters}
                    className="text-sm text-[#E53C42] hover:underline"
                  >
                    Clear All
                  </button>
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
                    max={10000} 
                    step={100} 
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
                                navigate(`/one-day-picnic/${encodeURIComponent(place)}`);
                              }
                            }}
                            className="data-[state=checked]:bg-[#2E4D98] data-[state=checked]:border-[#2E4D98]" 
                          />
                          <span 
                            className={`text-gray-700 hover:text-[#2E4D98] cursor-pointer ${isCurrentDestination ? 'font-bold text-[#2E4D98]' : ''}`}
                            onClick={() => {
                              clearAllFilters();
                              navigate(`/one-day-picnic/${encodeURIComponent(place)}`);
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
                    <h1 className="text-3xl font-bold mb-2">{selectedDestination} Picnic Packages</h1>
                    <p className="text-base opacity-90 max-w-2xl">
                      {heroDescription}
                    </p>
                    <p className="text-sm opacity-80 mt-2">
                      Showing {filteredTours.length} picnic packages for {selectedDestination}
                      <span className="ml-2 text-xs">(Total available: {formattedTours.length})</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Main Content Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">{selectedDestination} One Day Tours</h2>
                  <p className="text-gray-600 mt-1">
                    Showing {filteredTours.length} of {formattedTours.length} picnic packages • Best prices guaranteed
                  </p>
                </div>
        
              </div>

              {/* 3 Cards Per Row */}
              {filteredTours.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold text-gray-600">No picnic packages found for the selected filters</h3>
                  <p className="text-gray-500 mt-2">
                    Total available packages for {selectedDestination}: {formattedTours.length}
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


                      
                  

                          {/* Buttons */}
                          <div className="flex gap-2 mt-0">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 border-[#2E4D98] text-[#2E4D98] hover:bg-[#2E4D98] hover:text-white"
                              onClick={() => navigate(`/picnic-details/${tour.id}`)}
                            >
                              View Tour
                            </Button>
                            <Button 
                              size="sm" 
                              className="flex-1 bg-[#E53C42] hover:bg-[#E53C42] hover:opacity-90 text-white"
                              onClick={() => {
                                localStorage.setItem('selectedTour', JSON.stringify(tour));
                                navigate('/checkouts', { state: { tour } });
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

export default OneDayPicnic;