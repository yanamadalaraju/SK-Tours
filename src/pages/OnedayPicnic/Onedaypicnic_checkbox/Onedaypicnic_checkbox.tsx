import React, { useState, useEffect, useCallback, useRef } from "react";
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

// Changed from BungalowItem to PicnicItem
interface PicnicItem {
  picnic_id: number;        // Changed from bungalow_id
  picnic_code: string;      // Changed from bungalow_code
  name: string;
  price: string;
  main_image: string;
}

interface FilterState {
  priceRange: [number, number];
  selectedPicnicCodes: string[];  // Changed from selectedBungalowCodes
  searchQuery: string;
}

interface PicnicCheckboxProps {  // Renamed component interface
  sidebarOpen: boolean;
  closeSidebar: () => void;
  onFilterChange?: (filters: FilterState) => void;
  initialFilters?: Partial<FilterState>;
}

const Onedaypicnic_checkbox = ({ 
  sidebarOpen, 
  closeSidebar, 
  onFilterChange,
  initialFilters 
}: PicnicCheckboxProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  // State for picnics data - changed from bungalows
  const [picnics, setPicnics] = useState<PicnicItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states - changed to Picnic
  const [priceRange, setPriceRange] = useState<[number, number]>(initialFilters?.priceRange || [0, 200000]);
  const [searchQuery, setSearchQuery] = useState(initialFilters?.searchQuery || "");
  const [showSearchBtn, setShowSearchBtn] = useState(false);
  const [selectedPicnicCodes, setSelectedPicnicCodes] = useState<string[]>(initialFilters?.selectedPicnicCodes || []);
  const [showMorePicnics, setShowMorePicnics] = useState(false);
  
  // Debounce timer reference
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    
    const fetchPicnics = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${BASE_URL}/api/one-day-picnic`, {
          signal: abortController.signal
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Fetched picnics data:", data); // Debug log
        setPicnics(data);
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error("Error fetching picnics:", error);
          setError("Failed to load picnics. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPicnics();
    
    return () => {
      abortController.abort();
    };
  }, []);

  // Debounced filter change handler
  const debouncedFilterChange = useCallback((newFilters: FilterState) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    debounceTimerRef.current = setTimeout(() => {
      if (onFilterChange) {
        onFilterChange(newFilters);
      }
    }, 300);
  }, [onFilterChange]);

  // Trigger filter change when filters update
  useEffect(() => {
    if (onFilterChange) {
      debouncedFilterChange({
        priceRange,
        selectedPicnicCodes,
        searchQuery
      });
    }
    
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [priceRange, selectedPicnicCodes, searchQuery, onFilterChange, debouncedFilterChange]);

  // Helper function to check if path is active
  const isActive = useCallback((path: string) => {
    return location.pathname === path;
  }, [location.pathname]);

  // Helper function to get button classes based on active state
  const getButtonClasses = useCallback((path: string, customClasses = "") => {
    const isActivePath = isActive(path);
    return `flex justify-between items-center p-3 rounded-lg cursor-pointer border border-black transition shadow-sm ${
      isActivePath 
        ? 'bg-[#2E4D98] text-white' 
        : 'bg-white text-[#2E4D98] hover:bg-gray-50'
    } ${customClasses}`;
  }, [isActive]);

  // Changed to handle picnic checkbox change
  const handlePicnicCheckboxChange = useCallback((code: string, checked: boolean) => {
    setSelectedPicnicCodes(prev => {
      if (checked) {
        return [...prev, code];
      } else {
        return prev.filter(c => c !== code);
      }
    });
  }, []);

  const clearAllFilters = useCallback(() => {
    setPriceRange([0, 200000]);
    setSearchQuery("");
    setShowSearchBtn(false);
    setSelectedPicnicCodes([]);
    
    if (onFilterChange) {
      onFilterChange({
        priceRange: [0, 200000],
        selectedPicnicCodes: [],
        searchQuery: ""
      });
    }
  }, [onFilterChange]);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setShowSearchBtn(false);
  }, []);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (onFilterChange) {
      onFilterChange({
        priceRange,
        selectedPicnicCodes,
        searchQuery
      });
    }
  }, [priceRange, selectedPicnicCodes, searchQuery, onFilterChange]);

  const handlePriceChange = useCallback((value: number[]) => {
    setPriceRange([value[0], value[1]]);
  }, []);

  // Get unique picnics by code - changed from bungalow_code to picnic_code
  const uniquePicnics = React.useMemo(() => {
    const unique = Array.from(new Map(picnics.map(p => [p.picnic_code, p])).values());
    console.log("Unique picnics:", unique); // Debug log
    return unique;
  }, [picnics]);

  const displayedPicnics = React.useMemo(() => {
    return showMorePicnics ? uniquePicnics : uniquePicnics.slice(0, 6);
  }, [uniquePicnics, showMorePicnics]);

  return (
    <div
      className={`
        fixed top-[64px] left-0 h-[calc(100vh-64px)] w-76 bg-gradient-to-br from-blue-100 to-blue-50 border-r border-gray-300 z-30 border-b
        transform transition-transform duration-300 overflow-y-auto shadow-xl rounded-2xl
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:block md:h-auto md:shadow-lg md:rounded-2xl
      `}
    >
      <div className="md:hidden flex justify-end p-3 sticky top-0 bg-gradient-to-br from-blue-100 to-blue-50 z-10">
        <FaTimes 
          size={20} 
          onClick={closeSidebar} 
          className="cursor-pointer hover:text-red-500 transition-colors" 
          aria-label="Close sidebar"
        />
      </div>

      <aside className="lg:w-80 p-4">
        <div className="flex justify-between items-center mb-6 bg-[#2E4D98] p-2 rounded-lg border border-black">
          <h2 className="text-2xl font-bold text-white">One Day Picnic</h2>
          <button 
            onClick={clearAllFilters} 
            className="text-sm text-white hover:underline focus:outline-none focus:ring-2 focus:ring-white rounded px-2"
            aria-label="Clear all filters"
          >
            Clear All
          </button>
        </div>

        {/* Price Filter */}
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-4 text-[#2E4D98]">Price Range</h3>
          <div className="flex justify-between text-sm text-gray-600 mb-3">
            <span>₹{priceRange[0].toLocaleString('en-IN')}</span>
            <span>₹{priceRange[1].toLocaleString('en-IN')}</span>
          </div>
          <Slider 
            value={priceRange} 
            onValueChange={handlePriceChange} 
            min={0} 
            max={200000} 
            step={1000} 
            className="w-full" 
            aria-label="Price range slider"
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
                aria-label="Search picnics"
              />
              {searchQuery && (
                <button 
                  type="button" 
                  onClick={() => { clearSearch(); setShowSearchBtn(false); }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
            {showSearchBtn && (
              <Button 
                type="submit" 
                className="bg-red-600 hover:bg-red-700 text-white px-6 transition-colors"
              >
                Search
              </Button>
            )}
          </form>
        </div>

        {/* Picnic Checkboxes - Changed from Bungalow to Picnic */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-3 bg-white p-2 rounded-lg border border-black">
            <h2 className="text-xl font-bold text-[#2E4D98]">One Day Picnic Types</h2>
          </div>
          
          {loading && (
            <div className="text-sm text-gray-500 text-center py-4">Loading picnics...</div>
          )}
          
          {error && (
            <div className="text-sm text-red-500 text-center py-4">{error}</div>
          )}
          
          {!loading && !error && (
            <>
              <div className="space-y-3">
                {displayedPicnics.length > 0 ? (
                  displayedPicnics.map((picnic) => (
                    <div key={picnic.picnic_code} className="flex items-center gap-3 cursor-pointer group">
                      <Checkbox
                        checked={selectedPicnicCodes.includes(picnic.picnic_code)}
                        onCheckedChange={(checked) => handlePicnicCheckboxChange(picnic.picnic_code, checked as boolean)}
                        className="data-[state=checked]:bg-[#2E4D98] data-[state=checked]:border-[#2E4D98]"
                        id={`checkbox-${picnic.picnic_code}`}
                      />
                      <label
                        htmlFor={`checkbox-${picnic.picnic_code}`}
                        className={`text-gray-700 hover:text-[#2E4D98] cursor-pointer select-none group-hover:text-[#2E4D98] transition-colors ${
                          selectedPicnicCodes.includes(picnic.picnic_code) ? 'font-bold text-[#2E4D98]' : ''
                        }`}
                      >
                        {picnic.name} ({picnic.picnic_code})
                      </label>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-400 text-center py-4">No picnics found</div>
                )}
              </div>
              
              {uniquePicnics.length > 6 && (
                <button 
                  onClick={() => setShowMorePicnics(!showMorePicnics)} 
                  className="mt-4 text-[#2E4D98] text-sm font-semibold hover:underline focus:outline-none"
                  aria-label={showMorePicnics ? "Show less" : `Show ${uniquePicnics.length - 6} more`}
                >
                  {showMorePicnics ? "Show Less" : `Show ${uniquePicnics.length - 6} More`}
                </button>
              )}
            </>
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
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  navigate("/bungalow");
                  closeSidebar();
                }
              }}
              role="button"
              tabIndex={0}
              className={getButtonClasses("/bungalow", "text-lg font-semibold")}
            >
              <h3 className="text-lg font-semibold">Bungalows Booking</h3>
            </div>
          </div>

          {/* One Day Picnic - Changed to match current page */}
          <div className="mb-4">
            <div
              onClick={() => {
                navigate("/ondaycard");
                closeSidebar();
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  navigate("/ondaycard");
                  closeSidebar();
                }
              }}
              role="button"
              tabIndex={0}
              className={getButtonClasses("/ondaycard", "text-lg font-semibold")}
            >
              <h3 className="text-lg font-semibold">One Day Picnic</h3>
            </div>
          </div>
        </div>

        {/* Menu Items Section */}
        <div className="mt-4 border-gray-300 ">
          <div className="mb-4">
            <div
              onClick={() => {
                navigate("/Weekendcard");
                closeSidebar();
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  navigate("/Weekendcard");
                  closeSidebar();
                }
              }}
              role="button"
              tabIndex={0}
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

export default Onedaypicnic_checkbox; 