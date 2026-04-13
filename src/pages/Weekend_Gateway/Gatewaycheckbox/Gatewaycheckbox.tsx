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

// Match the actual API response structure from Weekendcard component
interface WeekendGateway {
  gateway_id: number;      // Changed from weekend_id
  gateway_code: string;    // Changed from weekend_code - this is the tour code
  name: string;
  price: string;
  main_image: string;
}

interface FilterState {
  priceRange: [number, number];
  selectedGatewayCodes: string[];  // Changed to match gateway_code
  searchQuery: string;
}

interface GatewayCheckboxProps {
  sidebarOpen: boolean;
  closeSidebar: () => void;
  onFilterChange?: (filters: FilterState) => void;
  initialFilters?: Partial<FilterState>;
}

const Gatewaycheckbox = ({ 
  sidebarOpen, 
  closeSidebar, 
  onFilterChange,
  initialFilters 
}: GatewayCheckboxProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  // State for weekend data
  const [weekends, setWeekends] = useState<WeekendGateway[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [priceRange, setPriceRange] = useState<[number, number]>(initialFilters?.priceRange || [0, 200000]);
  const [searchQuery, setSearchQuery] = useState(initialFilters?.searchQuery || "");
  const [showSearchBtn, setShowSearchBtn] = useState(false);
  const [selectedGatewayCodes, setSelectedGatewayCodes] = useState<string[]>(initialFilters?.selectedGatewayCodes || []);
  const [showMoreGateways, setShowMoreGateways] = useState(false);
  
  // Debounce timer reference
  const debounceTimerRef = useRef<NodeJS.Timeout>();

  // Fetch weekends from API
  useEffect(() => {
    const abortController = new AbortController();
    
    const fetchWeekends = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${BASE_URL}/api/weekend-gateways`, {
          signal: abortController.signal
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Fetched weekends data:", data); // Debug log
        
        // Handle different API response structures
        if (Array.isArray(data)) {
          setWeekends(data);
        } else if (data.data && Array.isArray(data.data)) {
          setWeekends(data.data);
        } else {
          console.warn("Unexpected data format:", data);
          setWeekends([]);
        }
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error("Error fetching weekends:", error);
          setError("Failed to load weekend gateways. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWeekends();
    
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
        selectedGatewayCodes,
        searchQuery
      });
    }
    
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [priceRange, selectedGatewayCodes, searchQuery, onFilterChange, debouncedFilterChange]);

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

  // Handle gateway checkbox change
  const handleGatewayCheckboxChange = useCallback((code: string, checked: boolean) => {
    setSelectedGatewayCodes(prev => {
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
    setSelectedGatewayCodes([]);
    
    if (onFilterChange) {
      onFilterChange({
        priceRange: [0, 200000],
        selectedGatewayCodes: [],
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
        selectedGatewayCodes,
        searchQuery
      });
    }
  }, [priceRange, selectedGatewayCodes, searchQuery, onFilterChange]);

  const handlePriceChange = useCallback((value: number[]) => {
    setPriceRange([value[0], value[1]]);
  }, []);

  // Get unique gateways by code
  const uniqueGateways = React.useMemo(() => {
    if (!weekends.length) return [];
    // Use gateway_code as the unique identifier
    const unique = Array.from(new Map(weekends.map(w => [w.gateway_code, w])).values());
    console.log("Unique gateways with tour codes:", unique.map(w => ({
      name: w.name,
      tourCode: w.gateway_code
    })));
    return unique;
  }, [weekends]);

  const displayedGateways = React.useMemo(() => {
    return showMoreGateways ? uniqueGateways : uniqueGateways.slice(0, 6);
  }, [uniqueGateways, showMoreGateways]);

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
          <h2 className="text-2xl font-bold text-white">Weekend Gateway</h2>
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
                placeholder="Search by name or tour code"
                value={searchQuery}
                onChange={(e) => { 
                  setSearchQuery(e.target.value); 
                  setShowSearchBtn(e.target.value.trim() !== ""); 
                }}
                onFocus={() => setShowSearchBtn(true)}
                className="border-[#2E4D98] focus:border-[#2E4D98] focus:ring-[#2E4D98] pr-8 placeholder:text-sm"
                aria-label="Search weekends"
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

        {/* Gateway Checkboxes with Tour Code */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-3 bg-white p-2 rounded-lg border border-black">
            <h2 className="text-xl font-bold text-[#2E4D98]">Weekend Gateway Types</h2>
          </div>
          
          {loading && (
            <div className="text-sm text-gray-500 text-center py-4">Loading weekend gateways...</div>
          )}
          
          {error && (
            <div className="text-sm text-red-500 text-center py-4">{error}</div>
          )}
          
          {!loading && !error && (
            <>
              <div className="space-y-3">
                {displayedGateways.length > 0 ? (
                  displayedGateways.map((gateway) => (
                    <div key={gateway.gateway_code} className="flex items-center gap-3 cursor-pointer group">
                      <Checkbox
                        checked={selectedGatewayCodes.includes(gateway.gateway_code)}
                        onCheckedChange={(checked) => handleGatewayCheckboxChange(gateway.gateway_code, checked as boolean)}
                        className="data-[state=checked]:bg-[#2E4D98] data-[state=checked]:border-[#2E4D98]"
                        id={`checkbox-${gateway.gateway_code}`}
                      />
                      <label
                        htmlFor={`checkbox-${gateway.gateway_code}`}
                        className={`text-gray-700 hover:text-[#2E4D98] cursor-pointer select-none group-hover:text-[#2E4D98] transition-colors flex-1 ${
                          selectedGatewayCodes.includes(gateway.gateway_code) ? 'font-bold text-[#2E4D98]' : ''
                        }`}
                      >
                        {gateway.name} ({gateway.gateway_code})
                      </label>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-400 text-center py-4">No weekend gateways found</div>
                )}
              </div>
              
              {uniqueGateways.length > 6 && (
                <button 
                  onClick={() => setShowMoreGateways(!showMoreGateways)} 
                  className="mt-4 text-[#2E4D98] text-sm font-semibold hover:underline focus:outline-none"
                  aria-label={showMoreGateways ? "Show less" : `Show ${uniqueGateways.length - 6} more`}
                >
                  {showMoreGateways ? "Show Less" : `Show ${uniqueGateways.length - 6} More`}
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
          
          {/* Bungalows Booking */}
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

          {/* One Day Picnic */}
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

export default Gatewaycheckbox;