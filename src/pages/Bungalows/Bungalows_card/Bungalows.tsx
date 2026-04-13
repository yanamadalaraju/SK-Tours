import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Bungalowcheckbox from "../Bungalow_checkbox/Bungalowcheckbox";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BASE_URL } from "@/ApiUrls";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

interface BungalowItem {
  bungalow_id: number;
  bungalow_code: string;
  name: string;
  price: string;
  main_image: string;
}

const Bungalow: React.FC = () => {
  const navigate = useNavigate();
  const [bungalows, setBungalows] = useState<BungalowItem[]>([]);
  // Add this state at the top with other states
const [sidebarOpen, setSidebarOpen] = useState(false);
  // Filter states
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchBtn, setShowSearchBtn] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [filteredBungalows, setFilteredBungalows] = useState<BungalowItem[]>([]);
  const [selectedBungalowCodes, setSelectedBungalowCodes] = useState<string[]>([]);
  const [showMoreBungalows, setShowMoreBungalows] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL}/api/bungalows`)
      .then((res) => res.json())
      .then((data) => {
        setBungalows(data);
        setFilteredBungalows(data);
      })
      .catch((err) => console.error("Error fetching bungalows:", err));
  }, []);

  // Filter bungalows based on selections
  useEffect(() => {
    let result: BungalowItem[] = [];

    // Add selected bungalows by code
    if (selectedBungalowCodes.length > 0) {
      selectedBungalowCodes.forEach(code => {
        const foundBungalow = bungalows.find(b => b.bungalow_code === code);
        if (foundBungalow) {
          result.push(foundBungalow);
        }
      });
    } else {
      result = [...bungalows];
    }

    // Filter by price
    result = result.filter(bungalow =>
      parseFloat(bungalow.price) >= priceRange[0] &&
      parseFloat(bungalow.price) <= priceRange[1]
    );

    // Filter by search query
    if (isSearchActive && searchQuery.trim() !== "") {
      const query = searchQuery.trim().toLowerCase();
      result = result.filter(bungalow =>
        bungalow.name.toLowerCase().includes(query) ||
        bungalow.bungalow_code.toLowerCase().includes(query)
      );
    }

    setFilteredBungalows(result);
  }, [selectedBungalowCodes, bungalows, priceRange, searchQuery, isSearchActive]);

  const handleCardClick = (bungalow: BungalowItem): void => {
    navigate(`/bunglowbookingcard/${bungalow.bungalow_id}`);
  };

  const handleViewClick = (e: React.MouseEvent, bungalow: BungalowItem): void => {
    e.stopPropagation();
    navigate(`/bunglowbookingcard/${bungalow.bungalow_id}`);
  };

  const handleBookClick = (e: React.MouseEvent, bungalow: BungalowItem): void => {
    e.stopPropagation();
    navigate(`/bookingform`);
  };

  const handleBungalowCheckboxChange = (code: string, checked: boolean) => {
    if (checked) {
      setSelectedBungalowCodes(prev => [...prev, code]);
    } else {
      setSelectedBungalowCodes(prev => prev.filter(c => c !== code));
    }
  };

  const clearAllFilters = () => {
    setPriceRange([0, 200000]);
    setSearchQuery("");
    setShowSearchBtn(false);
    setIsSearchActive(false);
    setSelectedBungalowCodes([]);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setShowSearchBtn(false);
    setIsSearchActive(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchActive(searchQuery.trim() !== "");
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#E53C42] bg-opacity-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters Sidebar */}
            <aside className="lg:w-80">
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl shadow-lg p-6 border border-blue-200 sticky top-24">
                <div className="flex justify-between items-center mb-6 bg-[#2E4D98] p-2 rounded-lg border border-black">
                  <h2 className="text-2xl font-bold text-white">Bungalows</h2>
                  <button onClick={clearAllFilters} className="text-sm text-white hover:underline">
                    Clear All
                  </button>
                </div>

                {/* Price Filter */}
                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-4 text-[#2E4D98]">Price Range</h3>
                  <div className="flex justify-between text-sm text-gray-600 mb-3">
                    <span>₹{priceRange[0].toLocaleString()}</span>
                    <span>₹{priceRange[1].toLocaleString()}</span>
                  </div>
                  <Slider 
                    value={priceRange} 
                    onValueChange={setPriceRange} 
                    min={0} 
                    max={200000} 
                    step={1000} 
                    className="w-full" 
                  />
                </div>

                {/* Search */}
                <div className="mb-4">
                  <form onSubmit={handleSearch} className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        type="text"
                        placeholder="Search by name or code"
                        value={searchQuery}
                        onChange={(e) => { 
                          setSearchQuery(e.target.value); 
                          setShowSearchBtn(e.target.value.trim() !== ""); 
                        }}
                        onFocus={() => setShowSearchBtn(true)}
                        className="border-[#2E4D98] focus:border-[#2E4D98] focus:ring-[#2E4D98] pr-8 placeholder:text-sm"
                      />
                      {searchQuery && (
                        <button 
                          type="button" 
                          onClick={() => { clearSearch(); setShowSearchBtn(false); }}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                    {showSearchBtn && (
                      <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-6">
                        Search
                      </Button>
                    )}
                  </form>
                </div>

                {/* Bungalow Checkboxes */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-3 bg-white p-2 rounded-lg border border-black">
                    <h2 className="text-xl font-bold text-[#2E4D98]">Bungalow Types</h2>
                  </div>
                  <div className="space-y-3">
                    {bungalows.length > 0 ? (
                      Array.from(new Map(bungalows.map(b => [b.bungalow_code, b])).values())
                        .slice(0, showMoreBungalows ? undefined : 6)
                        .map((bungalow) => (
                          <div key={bungalow.bungalow_code} className="flex items-center gap-3 cursor-pointer">
                            <Checkbox
                              checked={selectedBungalowCodes.includes(bungalow.bungalow_code)}
                              onCheckedChange={(checked) => handleBungalowCheckboxChange(bungalow.bungalow_code, checked as boolean)}
                              className="data-[state=checked]:bg-[#2E4D98] data-[state=checked]:border-[#2E4D98]"
                            />
                            <span
                              className={`text-gray-700 hover:text-[#2E4D98] cursor-pointer ${selectedBungalowCodes.includes(bungalow.bungalow_code) ? 'font-bold text-[#2E4D98]' : ''}`}
                              onClick={() => handleBungalowCheckboxChange(bungalow.bungalow_code, !selectedBungalowCodes.includes(bungalow.bungalow_code))}
                            >
                              {bungalow.name} ({bungalow.bungalow_code})
                            </span>
                          </div>
                        ))
                    ) : (
                      <div className="text-sm text-gray-400">Loading bungalows...</div>
                    )}
                  </div>
                  {bungalows.length > 6 && (
                    <button 
                      onClick={() => setShowMoreBungalows(!showMoreBungalows)} 
                      className="mt-4 text-[#2E4D98] text-sm font-semibold hover:underline"
                    >
                      {showMoreBungalows ? "Show Less" : `Show ${bungalows.length - 6} More`}
                    </button>
                  )}
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              {/* Header banner */}
              <div
                className="relative rounded-2xl overflow-hidden mb-6 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('https://360biznus.com/wp-content/uploads/2025/08/360-virtual-tour-of-shiva-carpets1.jpg')` }}
              >
                <div className="p-8 min-h-[180px] flex items-center">
                  <div className="text-white">
                    <h1 className="text-3xl font-bold mb-2" style={{ textShadow: "2px 2px 4px rgb(0,0,0)" }}>
                      Bungalow Booking
                    </h1>
                    <p className="text-base opacity-90 max-w-2xl" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}>
                      Luxury bungalows for your perfect stay
                    </p>
                    <p className="text-sm opacity-80 mt-2" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}>
                      Showing {filteredBungalows.length} bungalows
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">Available Bungalows</h2>
                  <p className="text-gray-600 mt-1">Showing {filteredBungalows.length} bungalows • Best prices guaranteed</p>
                </div>
              </div>

              {/* Bungalow Cards */}
              {filteredBungalows.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold text-gray-600">No bungalows found for the selected filters</h3>
                  <p className="text-gray-500 mt-2">Try adjusting your filters or search criteria</p>
                  <Button onClick={clearAllFilters} className="mt-4 bg-[#2E4D98] hover:bg-[#2E4D98] hover:opacity-90 text-white">
                    Clear All Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBungalows.map((item) => (
                    <div key={item.bungalow_id} className="flex flex-col">
                      {/* Two-column header UI - OUTSIDE the card */}
                      <div className="bg-white border-2 border-gray-300 rounded-lg p-3 mb-3 shadow-sm">
                        <div className="grid grid-cols-2 gap-0 border border-gray-400 rounded overflow-hidden">
                          <div className="bg-[#2E4D98] border-r border-gray-400 p-2 flex items-center justify-center">
                            <div className="text-sm font-bold text-white text-center">  {item.name}</div>
                          </div>
                          <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-2 flex items-center justify-center">
                            <div className="text-sm font-bold text-gray-900 text-center">
                              {item.bungalow_code}
                            </div>
                          </div>
                        </div>
                       
                      </div>

                      {/* Card Content */}
                      <div
                        onClick={() => handleCardClick(item)}
                        className="group bg-blue-50 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border border-blue-100 flex flex-col"
                      >
                        <div className="relative h-56 overflow-hidden">
                          <img
                            src={`${BASE_URL}${item.main_image}`}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                              const parent = e.currentTarget.parentElement;
                              if (parent) {
                                const errorDiv = document.createElement('div');
                                errorDiv.className = "flex flex-col items-center justify-center w-full h-full text-gray-700 p-4 bg-blue-50";
                                errorDiv.innerHTML = `<span class="text-center text-sm">${item.name}</span><span class="text-center text-xs text-gray-600 mt-2">Image not available</span>`;
                                parent.appendChild(errorDiv);
                              }
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        </div>

                        <div className="p-5 flex-1 flex flex-col">
                          <div className="mb-3 flex items-center">
                            <span className="w-[150px] text-sm text-[#2E4D98] font-bold">Price</span>
                            <p className="text-2lg font-bold text-gray-900 ml-auto text-right">
                              ₹{parseFloat(item.price).toLocaleString('en-IN')}
                            </p>
                          </div>

                          <div className="flex gap-2 mt-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 border-[#2E4D98] text-[#2E4D98] hover:bg-[#2E4D98] hover:text-white"
                              onClick={(e) => handleViewClick(e, item)}
                            >
                              View
                            </Button>

                            <Button
                              size="sm"
                              className="flex-1 bg-[#E53C42] hover:bg-[#E53C42] hover:opacity-90 text-white"
                              onClick={(e) => handleBookClick(e, item)}
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
            </main>

            
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Bungalow;