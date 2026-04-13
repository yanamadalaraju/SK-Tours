import React, { useState, useEffect } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/ApiUrls";

interface BungalowItem {
  bungalow_id: number;
  bungalow_code: string;
  name: string;
  price: string;
  main_image: string;
}

interface BungalowcheckboxProps {
  sidebarOpen: boolean;
  closeSidebar: () => void;
  onFilterChange?: (filters: any) => void;
}

const Bungalowcheckbox = ({ sidebarOpen, closeSidebar, onFilterChange }: BungalowcheckboxProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  // State for bungalows data
  const [bungalows, setBungalows] = useState<BungalowItem[]>([]);
  
  // Filter states
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchBtn, setShowSearchBtn] = useState(false);
  const [selectedBungalowCodes, setSelectedBungalowCodes] = useState<string[]>([]);
  const [showMoreBungalows, setShowMoreBungalows] = useState(false);

  // Fetch bungalows from API
  useEffect(() => {
    fetchBungalows();
  }, []);

  const fetchBungalows = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/bungalows`);
      const data = await response.json();
      setBungalows(data);
    } catch (error) {
      console.error("Error fetching bungalows:", error);
    }
  };

  // Helper function to check if path is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Helper function to get button classes based on active state
  const getButtonClasses = (path: string, customClasses = "") => {
    const isActivePath = isActive(path);
    return `flex justify-between items-center p-3 rounded-lg cursor-pointer border border-black transition shadow-sm ${
      isActivePath 
        ? 'bg-[#2E4D98] text-white' 
        : 'bg-white text-[#2E4D98] hover:bg-gray-50'
    } ${customClasses}`;
  };

  const handleBungalowCheckboxChange = (code: string, checked: boolean) => {
    let newSelectedCodes;
    if (checked) {
      newSelectedCodes = [...selectedBungalowCodes, code];
    } else {
      newSelectedCodes = selectedBungalowCodes.filter(c => c !== code);
    }
    setSelectedBungalowCodes(newSelectedCodes);
    
    // Notify parent component about filter changes
    if (onFilterChange) {
      onFilterChange({
        priceRange,
        selectedBungalowCodes: newSelectedCodes,
        searchQuery
      });
    }
  };

  const clearAllFilters = () => {
    setPriceRange([0, 200000]);
    setSearchQuery("");
    setShowSearchBtn(false);
    setSelectedBungalowCodes([]);
    
    if (onFilterChange) {
      onFilterChange({
        priceRange: [0, 200000],
        selectedBungalowCodes: [],
        searchQuery: ""
      });
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setShowSearchBtn(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onFilterChange) {
      onFilterChange({
        priceRange,
        selectedBungalowCodes,
        searchQuery
      });
    }
  };

  return (
    <div
      className={`
        fixed top-[64px] left-0 h-[calc(100vh-64px)] w-76 bg-gradient-to-br from-blue-100 to-blue-50 border-r border-gray-300 z-30 border-b
        transform transition-transform duration-300 overflow-y-auto shadow-xl rounded-2xl
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:block md:h-auto md:shadow-lg md:rounded-2xl
      `}
    >
      <div className="md:hidden flex justify-end p-3">
        <FaTimes size={20} onClick={closeSidebar} className="cursor-pointer" />
      </div>

      <aside className="lg:w-80 p-4">
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
              onValueChange={(value) => {
                setPriceRange(value);
                if (onFilterChange) {
                  onFilterChange({
                    priceRange: value,
                    selectedBungalowCodes,
                    searchQuery
                  });
                }
              }} 
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
             {/* Categories Section */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4 bg-white p-3 rounded-lg border border-black shadow-sm">
            <h2 className="text-xl font-bold text-[#2E4D98]">Categories</h2>
          </div>
          
          {/* Domestic Exhibition */}
          <div className="mb-4">
            <div
              onClick={() => {
                navigate("/bungalow");
                closeSidebar();
              }}
              className={getButtonClasses("/bungalow", "text-lg font-semibold")}
            >
              <h3 className="text-lg font-semibold">Bungalows Booking</h3>
            </div>
          </div>

          {/* International Exhibition */}
          <div className="mb-4">
            <div
              onClick={() => {
                navigate("/ondaycard");
                closeSidebar();
              }}
              className={getButtonClasses("/ondaycard", "text-lg font-semibold")}
            >
              <h3 className="text-lg font-semibold">Onday Picnic</h3>
            </div>
          </div>
        </div>

        {/* Menu Items Section */}
        <div className="mt-4 border-gray-300">
          <div className="mb-4">
            <div
              onClick={() => {
                navigate("/Weekendcard");
                closeSidebar();
              }}
              className={getButtonClasses("/Weekendcard", "text-lg font-semibold")}
            >
              <h3 className="text-lg font-semibold">Weekend Gateway</h3>
            </div>
          </div>
        </div>
     

     
      </aside>
    </div>
  );
};

export default Bungalowcheckbox;