import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

// Festival data (images & short descriptions)
const festivalDestinations = {
  "Diwali": {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    description: "Festival of Lights, Diyas, Sweets & Fireworks – Celebrate with Family!"
  },
  "Holi": {
    image: "https://images.unsplash.com/photo-1613147856545-3a8d2f1d3e5f?w=1200&q=80",
    description: "Festival of Colors, Gulal, Thandai & Dance – Joyful Spring Celebration!"
  },
  "Ganesh Chaturthi": {
    image: "https://images.unsplash.com/photo-1630053699205-6a87a3a3a3e0?w=1200&q=80",
    description: "Ganpati Bappa Morya! Modaks, Aartis & Eco-friendly Immersion"
  },
  "Navratri": {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    description: "Garba, Dandiya, Mata Ki Chowki – 9 Nights of Devotion & Dance!"
  },
  "Durga Puja": {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    description: "Pandal Hopping, Dhunuchi Naach & Bhog – Bengali Festive Vibes"
  },
  "Christmas": {
    image: "https://images.unsplash.com/photo-1543589077-26a1909d8e7f?w=1200&q=80",
    description: "Santa, Carols, Cakes & Decorations – Merry Winter Festival!"
  },
  "Eid": {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    description: "Eid-ul-Fitr / Eid-ul-Adha – Biryani, Sheer Khurma & Family Gatherings"
  },
  "Raksha Bandhan": {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    description: "Rakhi, Sweets & Sibling Love – Heartwarming Bond Celebration"
  },
  "Janmashtami": {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    description: "Dahi Handi, Krishna Leela & Bhajans – Devotional Fun!"
  },
  "Onam": {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    description: "Pookalam, Sadhya Feast & Boat Races – Kerala’s Harvest Festival"
  },
  "Lohri": {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    description: "Bonfire, Rewari & Gajak – Punjabi Winter Festival!"
  },
  "Baisakhi": {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    description: "Gidda, Bhangra & Langar – Sikh New Year Harvest Joy"
  }
};

const staticFestivalPackages = {
  "Diwali": [
   {
  id: 105,
  code: "DIW004",
  title: "Diwali Lights & Decoration Package",
  duration: "1 Day",
  days: 1,
  price: "₹2,999",
  priceValue: 2999,
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIK4nQeRYHb-mVHCcWNqaoQC192aabkI6_ng&s",
  emi: "₹250",
  emiPriceValue: 250,
  isIndian: true,
  tourType: "festival",
  locations: "LED lights setup, decorative diyas, rangoli colors, torans & entrance décor"
},
{
  id: 106,
  code: "DIW005",
  title: "Grand Diwali Family Celebration Combo",
  duration: "1 Day",
  days: 1,
  price: "₹9,999",
  priceValue: 9999,
  image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80",
  emi: "₹833",
  emiPriceValue: 833,
  isIndian: true,
  tourType: "festival",
  locations: "Puja setup, sweets & snacks combo, gift hampers, decoration & festive dinner"
},
{
  id: 107,
  code: "DIW006",
  title: "Corporate Diwali Gift Hamper Package",
  duration: "1 Day",
  days: 1,
  price: "₹5,499",
  priceValue: 5499,
  image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&q=80",
  emi: "₹458",
  emiPriceValue: 458,
  isIndian: true,
  tourType: "festival",
  locations: "Premium dry fruits, assorted sweets, chocolates, candles & customized greeting cards"
}
  ],
  "Holi": [
    {
      id: 201,
      code: "HOL001",
      title: "Holi Party with Colors & DJ",
      duration: "1 Day",
      days: 1,
      price: "₹2,499",
      priceValue: 2499,
      image: "https://images.unsplash.com/photo-1613147856545-3a8d2f1d3e5f?w=800&q=80",
      emi: "₹208",
      emiPriceValue: 208,
      isIndian: true,
      tourType: "festival",
    },
    {
      id: 202,
      code: "HOL002",
      title: "Eco-Friendly Holi Celebration",
      duration: "1 Day",
      days: 1,
      price: "₹1,999",
      priceValue: 1999,
      image: "https://images.unsplash.com/photo-1613147856545-3a8d2f1d3e5f?w=800&q=80",
      emi: "₹167",
      emiPriceValue: 167,
      isIndian: true,
      tourType: "festival",
    },
    {
      id: 203,
      code: "HOL003",
      title: "Holi Family Get-together Package",
      duration: "1 Day",
      days: 1,
      price: "₹3,499",
      priceValue: 3499,
      image: "https://images.unsplash.com/photo-1613147856545-3a8d2f1d3e5f?w=800&q=80",
      emi: "₹292",
      emiPriceValue: 292,
      isIndian: true,
      tourType: "festival",
    }
  ],
  "Ganesh Chaturthi": [
    {
      id: 301,
      code: "GAN001",
      title: "Ganpati Home Setup & Aarti",
      duration: "1 Day",
      days: 1,
      price: "₹5,499",
      priceValue: 5499,
      image: "https://images.unsplash.com/photo-1630053699205-6a87a3a3a3e0?w=800&q=80",
      emi: "₹458",
      emiPriceValue: 458,
      isIndian: true,
      tourType: "festival",
    },
    {
      id: 302,
      code: "GAN002",
      title: "Eco Ganesh Idol + Modak Making",
      duration: "1 Day",
      days: 1,
      price: "₹3,999",
      priceValue: 3999,
      image: "https://images.unsplash.com/photo-1630053699205-6a87a3a3a3e0?w=800&q=80",
      emi: "₹333",
      emiPriceValue: 333,
      isIndian: true,
      tourType: "festival",
    },
    {
      id: 303,
      code: "GAN003",
      title: "Ganesh Chaturthi Puja Package",
      duration: "1 Day",
      days: 1,
      price: "₹4,999",
      priceValue: 4999,
      image: "https://images.unsplash.com/photo-1630053699205-6a87a3a3a3e0?w=800&q=80",
      emi: "₹417",
      emiPriceValue: 417,
      isIndian: true,
      tourType: "festival",
    }
  ],
  // You can add 3 packages for other festivals the same way...
  // For now showing only these 3 festivals with exactly 3 cards each
};

const OneDayFestival = () => {
  const navigate = useNavigate();
  const { state } = useParams();
  const [showMoreDestinations, setShowMoreDestinations] = useState(false);
  const [sortType, setSortType] = useState("recommended");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [filteredTours, setFilteredTours] = useState<any[]>([]);
  const [formattedTours, setFormattedTours] = useState<any[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<string>(state || "Diwali");

  useEffect(() => {
    if (state) {
      const decoded = decodeURIComponent(state);
      setSelectedDestination(decoded);
    }
  }, [state]);

  useEffect(() => {
    const packages = staticFestivalPackages[selectedDestination as keyof typeof staticFestivalPackages] || [];
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
    setPriceRange([0, 10000]);
    setSelectedDestinations([]);
    setSortType("recommended");
  };

  const heroImage =
    festivalDestinations[selectedDestination as keyof typeof festivalDestinations]?.image ??
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80';

  const heroDescription =
    festivalDestinations[selectedDestination as keyof typeof festivalDestinations]?.description ??
    'Celebrate festivals with joy and togetherness!';

  const allFestivals = [
    'Diwali', 'Holi', 'Ganesh Chaturthi', 'Navratri', 'Durga Puja',
    'Christmas', 'Eid', 'Raksha Bandhan', 'Janmashtami', 'Onam',
    'Lohri', 'Baisakhi'
  ];

  return (
    <>
      <div className="min-h-screen bg-[#E53C42] bg-opacity-10">
        <Header />

        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters Sidebar - same colors */}
            <aside className="lg:w-80">
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl shadow-lg p-6 border border-blue-200 sticky top-24">
                <div className="flex justify-between items-center mb-6 bg-white p-2 rounded-lg border border-black">
                  <h2 className="text-2xl font-bold text-[#2E4D98]">Festival Packages</h2>
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
                    max={10000}
                    step={100}
                  />
                </div>

                <div className="mb-8">
                  <div className="flex justify-between items-center mb-6 bg-white p-2 rounded-lg border border-black">
                    <h2 className="text-2xl font-bold text-[#2E4D98]">Festivals</h2>
                  </div>
                  <div className={`${showMoreDestinations ? "max-h-40 overflow-y-auto pr-1" : ""} space-y-3`}>
                    {allFestivals.slice(0, showMoreDestinations ? allFestivals.length : 6).map((fest) => {
                      const isCurrent = selectedDestination === fest;
                      return (
                        <div key={fest} className="flex items-center gap-3 cursor-pointer">
                          <Checkbox
                            checked={isCurrent}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                clearAllFilters();
                                navigate(`/one-day-festival/${encodeURIComponent(fest)}`);
                              }
                            }}
                            className="data-[state=checked]:bg-[#2E4D98] data-[state=checked]:border-[#2E4D98]"
                          />
                          <span
                            className={`text-gray-700 hover:text-[#2E4D98] cursor-pointer ${isCurrent ? 'font-bold text-[#2E4D98]' : ''}`}
                            onClick={() => {
                              clearAllFilters();
                              navigate(`/one-day-festival/${encodeURIComponent(fest)}`);
                            }}
                          >
                            {fest}
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
              {/* Hero - same style */}
              <div className="relative rounded-2xl overflow-hidden mb-6">
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url('${heroImage}')` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/10"></div>
                </div>
                <div className="relative p-8 min-h-[200px] flex items-center">
                  <div className="text-white">
                    <h1 className="text-3xl font-bold mb-2">{selectedDestination} Festival Packages</h1>
                    <p className="text-base opacity-90 max-w-2xl">{heroDescription}</p>
                    <p className="text-sm opacity-80 mt-2">
                      Showing {filteredTours.length} festival packages for {selectedDestination}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">{selectedDestination} Celebration Ideas</h2>
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
                  {filteredTours.slice(0, 3).map((pkg, index) => (   // <-- slice(0,3) ensures max 3 cards
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
                              onClick={() => navigate(`/festival-details/${pkg.id}`)}
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

export default OneDayFestival;