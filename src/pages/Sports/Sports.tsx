import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

// Sports themes data (images & short descriptions)
const sportsThemes = {
  "Cricket": {
    image: "https://images.unsplash.com/photo-1531410248242-089a6d9c462d?w=1200&q=80",
    description: "Box Cricket, Bat & Ball Action, Team Matches – Ultimate Cricket Fun!"
  },
  "Football": {
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
    description: "5-a-side Football, Penalty Shootouts & Fun Tournaments – Score Big!"
  },
  "Adventure Sports": {
    image: "https://images.unsplash.com/photo-1513553404607-98823be0d02d?w=1200&q=80",
    description: "Zipline, Paintball, Archery Tag & more – High-Adrenaline Day!"
  },
  "Traditional Games Day": {
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&q=80",
    description: "Sack Race, Tug of War, Lemon Spoon – Classic Fun for All Ages!"
  },
  "Badminton Bash": {
    image: "https://images.unsplash.com/photo-1622297840610-6ee1220e9d5a?w=1200&q=80",
    description: "Doubles Matches, Smash Challenges & Rally Games – Shuttle Time!"
  },
  "Running & Fitness": {
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=80",
    description: "Relay Races, Obstacle Course & Fun Runs – Stay Fit & Active!"
  },
  "Basketball Court": {
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&q=80",
    description: "3x3 Basketball, Dunk Contests & Team Games – Hoop Dreams!"
  },
};

const staticSportsPackages = {
  "Cricket": [
   {
  id: 404,
  code: "CRI004",
  title: "Night Cricket League with Floodlights",
  duration: "1 Day",
  days: 1,
  price: "₹6,999",
  priceValue: 6999,
  image: "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=800&q=80",
  emi: "₹583",
  emiPriceValue: 583,
  isIndian: true,
  tourType: "sports",
  locations: "Floodlight ground booking, umpire, scoreboard, team jerseys & refreshments"
},
{
  id: 405,
  code: "CRI005",
  title: "Kids Cricket Coaching & Mini Match",
  duration: "1 Day",
  days: 1,
  price: "₹2,999",
  priceValue: 2999,
  image: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?w=800&q=80",
  emi: "₹250",
  emiPriceValue: 250,
  isIndian: true,
  tourType: "sports",
  locations: "Professional coach session, practice nets, mini tournament & participation certificates"
},
{
  id: 406,
  code: "CRI006",
  title: "Premium Stadium Match Experience",
  duration: "1 Day",
  days: 1,
  price: "₹12,499",
  priceValue: 12499,
  image: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/11/f6/0c/2c.jpg",
  emi: "₹1042",
  emiPriceValue: 1042,
  isIndian: true,
  tourType: "sports",
  locations: "VIP seating tickets, snacks combo, merchandise kit & live match experience"
}
  ],
  "Football": [
    {
      id: 501,
      code: "FTB001",
      title: "5-a-side Football Fiesta",
      duration: "1 Day",
      days: 1,
      price: "₹5,499",
      priceValue: 5499,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
      emi: "₹458",
      emiPriceValue: 458,
      isIndian: true,
      tourType: "sports",
    },
    {
      id: 502,
      code: "FTB002",
      title: "Penalty Shootout Challenge",
      duration: "1 Day",
      days: 1,
      price: "₹2,999",
      priceValue: 2999,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
      emi: "₹250",
      emiPriceValue: 250,
      isIndian: true,
      tourType: "sports",
    },
    {
      id: 503,
      code: "FTB003",
      title: "Corporate Football Cup",
      duration: "1 Day",
      days: 1,
      price: "₹9,499",
      priceValue: 9499,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
      emi: "₹792",
      emiPriceValue: 792,
      isIndian: true,
      tourType: "sports",
    }
  ],
  "Adventure Sports": [
    {
      id: 601,
      code: "ADV001",
      title: "Paintball + Zipline Combo",
      duration: "1 Day",
      days: 1,
      price: "₹6,999",
      priceValue: 6999,
      image: "https://images.unsplash.com/photo-1513553404607-98823be0d02d?w=800&q=80",
      emi: "₹583",
      emiPriceValue: 583,
      isIndian: true,
      tourType: "sports",
    },
    {
      id: 602,
      code: "ADV002",
      title: "Archery Tag & Bubble Soccer",
      duration: "1 Day",
      days: 1,
      price: "₹4,499",
      priceValue: 4499,
      image: "https://images.unsplash.com/photo-1513553404607-98823be0d02d?w=800&q=80",
      emi: "₹375",
      emiPriceValue: 375,
      isIndian: true,
      tourType: "sports",
    },
    {
      id: 603,
      code: "ADV003",
      title: "Full Adventure Rush Package",
      duration: "1 Day",
      days: 1,
      price: "₹11,999",
      priceValue: 11999,
      image: "https://images.unsplash.com/photo-1513553404607-98823be0d02d?w=800&q=80",
      emi: "₹1,000",
      emiPriceValue: 1000,
      isIndian: true,
      tourType: "sports",
    }
  ],
  // Add more sports/themes with 3 packages each as needed
};

const OneDaySports = () => {
  const navigate = useNavigate();
  const { state } = useParams();
  const [showMoreDestinations, setShowMoreDestinations] = useState(false);
  const [sortType, setSortType] = useState("recommended");
  const [priceRange, setPriceRange] = useState([0, 15000]); // Slightly higher max for sports
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [filteredTours, setFilteredTours] = useState<any[]>([]);
  const [formattedTours, setFormattedTours] = useState<any[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<string>(state || "Cricket");

  useEffect(() => {
    if (state) {
      const decoded = decodeURIComponent(state);
      setSelectedDestination(decoded);
    }
  }, [state]);

  useEffect(() => {
    const packages = staticSportsPackages[selectedDestination as keyof typeof staticSportsPackages] || [];
    setFormattedTours(packages);
  }, [selectedDestination]);

  useEffect(() => {
    if (formattedTours.length === 0) {
      setFilteredTours([]);
      return;
    }

    let result = [...formattedTours];

    result = result.filter(
      (pkg) => pkg.priceValue >= priceRange[0] && pkg.priceValue <= priceRange[1]
    );

    if (selectedDestinations.length > 0) {
      result = result.filter((pkg) =>
        selectedDestinations.some((sel) =>
          selectedDestination === sel || pkg.title.toLowerCase().includes(sel.toLowerCase())
        )
      );
    }

    if (sortType === "price-low") {
      result.sort((a, b) => a.priceValue - b.priceValue);
    } else if (sortType === "price-high") {
      result.sort((a, b) => b.priceValue - a.priceValue);
    }

    setFilteredTours(result);
  }, [formattedTours, priceRange, selectedDestinations, sortType, selectedDestination]);

  const clearAllFilters = () => {
    setPriceRange([0, 15000]);
    setSelectedDestinations([]);
    setSortType("recommended");
  };

  const heroImage =
    sportsThemes[selectedDestination as keyof typeof sportsThemes]?.image ??
    'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&q=80';

  const heroDescription =
    sportsThemes[selectedDestination as keyof typeof sportsThemes]?.description ??
    'Get active and celebrate with sports & team fun!';

  const allSports = [
    'Cricket', 'Football', 'Adventure Sports', 'Traditional Games Day',
    'Badminton Bash', 'Running & Fitness', 'Basketball Court',
  ];

  return (
    <>
      <div className="min-h-screen bg-[#E53C42] bg-opacity-10">
        <Header />

        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters Sidebar - original colors */}
            <aside className="lg:w-80">
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl shadow-lg p-6 border border-blue-200 sticky top-24">
                <div className="flex justify-between items-center mb-6 bg-white p-2 rounded-lg border border-black">
                  <h2 className="text-2xl font-bold text-[#2E4D98]">Sports Packages</h2>
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-[#E53C42] hover:underline"
                  >
                    Clear All
                  </button>
                </div>

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
                    max={15000}
                    step={100}
                  />
                </div>

                <div className="mb-8">
                  <div className="flex justify-between items-center mb-6 bg-white p-2 rounded-lg border border-black">
                    <h2 className="text-2xl font-bold text-[#2E4D98]">Sports</h2>
                  </div>
                  <div className={`${showMoreDestinations ? "max-h-40 overflow-y-auto pr-1" : ""} space-y-3`}>
                    {allSports.slice(0, showMoreDestinations ? allSports.length : 6).map((sport) => {
                      const isCurrent = selectedDestination === sport;
                      return (
                        <div key={sport} className="flex items-center gap-3 cursor-pointer">
                          <Checkbox
                            checked={isCurrent}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                clearAllFilters();
                                navigate(`/one-day-sports/${encodeURIComponent(sport)}`);
                              }
                            }}
                            className="data-[state=checked]:bg-[#2E4D98] data-[state=checked]:border-[#2E4D98]"
                          />
                          <span
                            className={`text-gray-700 hover:text-[#2E4D98] cursor-pointer ${isCurrent ? 'font-bold text-[#2E4D98]' : ''}`}
                            onClick={() => {
                              clearAllFilters();
                              navigate(`/one-day-sports/${encodeURIComponent(sport)}`);
                            }}
                          >
                            {sport}
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

            <main className="flex-1">
              {/* Hero - original style */}
              <div className="relative rounded-2xl overflow-hidden mb-6">
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url('${heroImage}')` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/10"></div>
                </div>
                <div className="relative p-8 min-h-[200px] flex items-center">
                  <div className="text-white">
                    <h1 className="text-3xl font-bold mb-2">{selectedDestination} Packages</h1>
                    <p className="text-base opacity-90 max-w-2xl">{heroDescription}</p>
                    <p className="text-sm opacity-80 mt-2">
                      Showing {filteredTours.length} sports packages for {selectedDestination}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">{selectedDestination} Activities</h2>
                  <p className="text-gray-600 mt-1">
                    Showing {filteredTours.length} of {formattedTours.length} packages
                  </p>
                </div>
              </div>

              {filteredTours.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold text-gray-600">No packages found</h3>
                  <Button
                    onClick={clearAllFilters}
                    className="mt-4 bg-[#2E4D98] hover:bg-[#2E4D98] hover:opacity-90 text-white"
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTours.slice(0, 3).map((pkg, index) => (
                    <div key={index} className="flex flex-col">
                      <div className="bg-white border-2 border-gray-300 rounded-lg p-3 mb-3 shadow-sm">
                        <div className="grid grid-cols-3 gap-0 border border-gray-400 rounded overflow-hidden">
                          <div className="bg-gray-100 border-r border-gray-400 p-2">
                            <div className="text-xs font-semibold text-gray-700 text-center">CODE</div>
                          </div>
                          <div className="bg-white border-r border-gray-400 p-2">
                            <div className="text-sm font-bold text-gray-900 text-center">{pkg.code}</div>
                          </div>
                          <div className="bg-gray-50 p-2">
                            <div className="text-sm font-bold text-gray-900 text-center">{pkg.duration}</div>
                          </div>
                        </div>
                      </div>

                      <div className="group bg-blue-50 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border border-blue-100 flex flex-col flex-1 min-h-0">
                        <div className="relative h-56 overflow-hidden flex-shrink-0">
                          <img
                            src={pkg.image}
                            alt={pkg.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        </div>

                        <div className="p-5 flex-1 flex flex-col min-h-0">
                          <h3 className="font-bold text-lg text-gray-800 line-clamp-2 mb-2">
                            {pkg.title}
                          </h3>

                          <div className="mb-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-semibold text-gray-700">Package Cost</span>
                              <p className="text-2xl font-bold text-gray-900">{pkg.price}</p>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">EMI per/month</span>
                              <p className="text-sm font-bold text-gray-900">{pkg.emi}</p>
                            </div>
                          </div>

                          <div className="flex gap-2 mt-auto">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 border-[#2E4D98] text-[#2E4D98] hover:bg-[#2E4D98] hover:text-white"
                              onClick={() => navigate(`/sports-details/${pkg.id}`)}
                            >
                              View Details
                            </Button>
                            <Button
                              size="sm"
                              className="flex-1 bg-[#E53C42] hover:bg-[#E53C42] hover:opacity-90 text-white"
                              onClick={() => {
                                localStorage.setItem('selectedPackage', JSON.stringify(pkg));
                                navigate('/checkouts', { state: { pkg } });
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

              {filteredTours.length > 0 && (
                <div className="text-center mt-8">
                  <Button size="lg" className="bg-[#2E4D98] hover:bg-[#2E4D98] hover:opacity-90 px-12 text-white">
                    Load More Packages
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

export default OneDaySports;