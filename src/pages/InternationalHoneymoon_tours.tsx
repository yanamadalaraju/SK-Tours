import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { BASE_URL } from '@/ApiUrls';
import Footer from '@/components/Footer';
import { Input } from "@/components/ui/input"; 
import Pagination from './Tablelayouts/Pagination';

const stateHeroImages = {
  "Andaman": "https://i.pinimg.com/1200x/67/10/27/671027210a396e38b27e5d0432bd18db.jpg",
  "Andhra Pradesh": "https://images.unsplash.com/photo-1587132135057-bc3c3dcfd4d9?w=1200&q=80",
  "Bihar": "https://images.unsplash.com/photo-1587132135056-bc3c3dcfd4d8?w=1200&q=80",
  "Chhattisgarh": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
  "Dadra & Nagar Haveli": "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80",
  "Daman & Diu": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
  "Delhi": "https://images.unsplash.com/photo-1587132135057-bc3c3dcfd4d9?w=1200&q=80",
  "Goa": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80",
  "Gujarat": "https://images.unsplash.com/photo-1587132135058-bc3c3dcfd4db?w=1200&q=80",
  "Haryana": "https://images.unsplash.com/photo-1587132135059-bc3c3dcfd4dc?w=1200&q=80",
  "Himachal Pradesh": "https://images.unsplash.com/photo-1587132135060-bc3c3dcfd4dd?w=1200&q=80",
  "Jammu & Kashmir": "https://images.unsplash.com/photo-1587132135061-bc3c3dcfd4de?w=1200&q=80",
  "Jharkhand": "https://images.unsplash.com/photo-1587132135062-bc3c3dcfd4df?w=1200&q=80",
  "Karnataka": "https://images.unsplash.com/photo-1587132135063-bc3c3dcfd4e0?w=1200&q=80",
  "Kerala": "https://images.unsplash.com/photo-1508197149814-0cc02e5d0c8e?w=1200&q=80",
  "Ladakh": "https://images.unsplash.com/photo-1587132135064-bc3c3dcfd4e1?w=1200&q=80",
  "Lakshadweep": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
  "Madhya Pradesh": "https://images.unsplash.com/photo-1587132135065-bc3c3dcfd4e2?w=1200&q=80",
  "Maharashtra": "https://images.unsplash.com/photo-1587132135066-bc3c3dcfd4e3?w=1200&q=80",
  "North East": "https://images.unsplash.com/photo-1587132135067-bc3c3dcfd4e4?w=1200&q=80",
  "Odisha": "https://images.unsplash.com/ photo-1587132135068-bc3c3dcfd4e5?w=1200&q=80",
  "Puducherry": "https://images.unsplash.com/photo-1587132135069-bc3c3dcfd4e6?w=1200&q=80",
  "Punjab & Haryana": "https://images.unsplash.com/photo-1587132135070-bc3c3dcfd4e7?w=1200&q=80",
  "Rajasthan": "https://images.unsplash.com/photo-1587132135071-bc3c3dcfd4e8?w=1200&q=80",
  "Seven Sisters": "https://images.unsplash.com/photo-1587132135072-bc3c3dcfd4e9?w=1200&q=80",
  "Tamil Nadu": "https://images.unsplash.com/photo-1587132135073-bc3c3dcfd4ea?w=1200&q=80",
  "Uttar Pradesh": "https://images.unsplash.com/photo-1587132135074-bc3c3dcfd4eb?w=1200&q=80",
  "Uttarakhand": "https://images.unsplash.com/photo-1587132135075-bc3c3dcfd4ec?w=1200&q=80",
  "West Bengal": "https://images.unsplash.com/photo-1587132135076-bc3c3dcfd4ed?w=1200&q=80",
};

// NEW: International country hero images
const countryHeroImages: Record<string, string> = {
  "Australia": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1200&q=80",
  "America": "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=1200&q=80",
  "Dubai": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80",
  "Europe": "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&q=80",
  "Japan": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=80",
  "Singapore": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200&q=80",
  "Thailand": "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200&q=80",
};

// Get state-specific descriptions
const stateDescriptions = {
  "Andaman": "Where Time Slows Down, Beauty Takes Over, and Blue Waters Meet Endless Adventures!",
  "Andhra Pradesh": "Discover the Spiritual Heartland and Coastal Beauty of Andhra Pradesh!",
  "Bihar": "Explore Ancient Heritage and Spiritual Enlightenment in the Land of Buddha!",
  "Chhattisgarh": "Discover Tribal Culture and Natural Wonders in the Heart of India!",
  "Dadra & Nagar Haveli": "Experience Tribal Heritage and Natural Beauty in this Union Territory!",
  "Daman & Diu": "Portuguese Heritage Meets Coastal Charm in this Beach Paradise!",
  "Delhi": "Where Ancient History Meets Modern Metropolis in India's Capital!",
  "Goa": "Sun, Sand, and Serenity - Experience the Ultimate Beach Paradise!",
  "Gujarat": "Land of Legends, Lions, and Vibrant Culture - Experience Gujarat's Diversity!",
  "Haryana": "Explore Ancient Heritage and Modern Development in this Progressive State!",
  "Himachal Pradesh": "Majestic Mountains, Serene Valleys, and Adventure in the Himalayas!",
  "Jammu & Kashmir": "Paradise on Earth - Where Snow-Capped Peaks Meet Beautiful Valleys!",
  "Jharkhand": "Discover Tribal Culture, Waterfalls, and Rich Mineral Wealth!",
  "Karnataka": "From Ancient Temples to Modern Tech - Experience Karnataka's Diversity!",
  "Kerala": "God's Own Country - Where Backwaters, Beaches, and Hills Create Magic!",
  "Ladakh": "Land of High Passes, Buddhist Monasteries, and Breathtaking Landscapes!",
  "Lakshadweep": "Coral Islands, Turquoise Waters, and Tropical Paradise in the Arabian Sea!",
  "Madhya Pradesh": "Heart of India - Wildlife, Heritage, and Cultural Richness!",
  "Maharashtra": "From Bustling Cities to Ancient Caves - Experience Maharashtra's Contrasts!",
  "North East": "Seven Sisters - Unexplored Beauty, Tribal Culture, and Natural Wonders!",
  "Odisha": "Temple Architecture, Tribal Culture, and Pristine Beaches Await!",
  "Puducherry": "French Colonial Charm Meets Indian Spirituality in this Coastal Gem!",
  "Punjab & Haryana": "Golden Temples, Rich Culture, and Agricultural Heartland of India!",
  "Rajasthan": "Land of Kings, Forts, Palaces, and Royal Heritage!",
  "Seven Sisters": "Northeast India's Hidden Gems - Unexplored Beauty and Tribal Culture!",
  "Tamil Nadu": "Ancient Temples, Rich Culture, and Scenic Beauty in South India!",
  "Uttar Pradesh": "Spiritual Heartland - Temples, History, and Cultural Heritage!",
  "Uttarakhand": "Devbhoomi - Land of Gods, Himalayan Peaks, and Spiritual Retreats!",
  "West Bengal": "Cultural Capital - From Himalayan Hills to Sundarbans Delta!",
};

const TourPackages = () => {
  const navigate = useNavigate();
  const { state } = useParams(); 
  const [viewMode] = useState<'grid' | 'list'>('grid');
  const [showMoreIndian, setShowMoreIndian] = useState(false);
  const [showMoreWorld, setShowMoreWorld] = useState(false);
  const [sortType, setSortType] = useState("recommended");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [paginatedTours, setPaginatedTours] = useState([]);
  const [durationRange, setDurationRange] = useState([0, 150]);
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [selectedDepartureMonths, setSelectedDepartureMonths] = useState<string[]>([]);
  const [selectedIndianTours, setSelectedIndianTours] = useState<string[]>([]);
  const [selectedWorldTours, setSelectedWorldTours] = useState<string[]>([]);
  const [filteredTours, setFilteredTours] = useState<any[]>([]);
  const [formattedTours, setFormattedTours] = useState<any[]>([]);
  const [selectedState, setSelectedState] = useState<string>(state || "Andaman");
  const [internationalDestinations, setInternationalDestinations] = useState<string[]>([]);
  const [loadingDestinations, setLoadingDestinations] = useState(false);
  const [appliedSearchQuery, setAppliedSearchQuery] = useState("");
  const [activeSearchQuery, setActiveSearchQuery] = useState(""); 

  const [allTours, setAllTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [tourImages, setTourImages] = useState<Record<number | string, string>>({});
  const [tourEmiData, setTourEmiData] = useState<Record<number | string, any>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [showSearchBtn, setShowSearchBtn] = useState(false); 

  // NEW: country → destinations map & international flag
  const [countryDestinations, setCountryDestinations] = useState<Record<string, string[]>>({});
  const [isInternationalPage, setIsInternationalPage] = useState(false);

  // ---------- Fetch base tours ----------
  useEffect(() => {
    const fetchTours = async () => {
      try {
        console.log("Fetching tours from API...");
        const res = await fetch(`${BASE_URL}/api/tours`);
        const data = await res.json();
        console.log("Fetched tours:", data);
        console.log("Total tours count:", data.length);
        setAllTours(data);
      } catch (err) {
        console.error("Error fetching tours:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  // ---------- Fetch full tour details including EMI for each honeymoon tour ----------
  useEffect(() => {
    if (!allTours || allTours.length === 0) return;

    const fetchTourDetails = async () => {
      try {
        console.log("Fetching honeymoon tour details for", allTours.length, "tours");
        const results = await Promise.all(
          allTours.map(async (tour) => {
            try {
              const res = await fetch(
                `${BASE_URL}/api/tours/tour/full/honeymoon/${tour.tour_id}`
              );
              const data = await res.json();

              const images = data.images || [];
              const cover = images.find((img: any) => img.is_cover === 1) || images[0];
              const emiPrice = data.basic_details?.emi_price || "0";
              
              return {
                tourId: tour.tour_id,
                imageUrl: cover?.url || "",
                emiPrice: emiPrice,
                basicDetails: data.basic_details || {}
              };
            } catch (err) {
              console.error("Error fetching honeymoon tour details for", tour.tour_id, err);
              return { 
                tourId: tour.tour_id, 
                imageUrl: "", 
                emiPrice: "0",
                basicDetails: {}
              };
            }
          })
        );

        const imageMap: Record<number | string, string> = {};
        const emiMap: Record<number | string, any> = {};

        results.forEach((r) => {
          if (r.imageUrl) {
            imageMap[r.tourId] = r.imageUrl;
          }
          if (r.emiPrice || r.basicDetails) {
            emiMap[r.tourId] = {
              emiPrice: r.emiPrice,
              basicDetails: r.basicDetails
            };
          }
        });

        setTourImages(imageMap);
        setTourEmiData(emiMap);
      } catch (err) {
        console.error("Error building honeymoon tour details map:", err);
      }
    };

    fetchTourDetails();
  }, [allTours]);

  // UPDATED: Fetch international destinations + build country map
  useEffect(() => {
    const fetchInternationalDestinations = async () => {
      try {
        setLoadingDestinations(true);
        console.log("Fetching international destinations...");

        const destinationsRes = await fetch(`${BASE_URL}/api/destinations/international`);
        if (!destinationsRes.ok) {
          throw new Error(`Failed to fetch destinations: ${destinationsRes.status}`);
        }

        const data: any[] = await destinationsRes.json();
        console.log("Fetched international destinations:", data);

        const destinationNames: string[] = data.map(dest => dest.name);
        const uniqueSortedDestinations: string[] = [...new Set(destinationNames)].sort(
          (a, b) => a.localeCompare(b)
        );
        setInternationalDestinations(uniqueSortedDestinations);

        // NEW: Build country → destinations map
        const countryMap: Record<string, string[]> = {};
        data.forEach((dest: any) => {
          const countryName = dest.country_name;
          if (!countryName) return;
          if (!countryMap[countryName]) countryMap[countryName] = [];
          if (!countryMap[countryName].includes(dest.name)) {
            countryMap[countryName].push(dest.name);
          }
        });
        console.log("Country → destinations map:", countryMap);
        setCountryDestinations(countryMap);

      } catch (err) {
        console.error("Error fetching international destinations:", err);
      } finally {
        setLoadingDestinations(false);
      }
    };

    fetchInternationalDestinations();
  }, []);

  // ---------- Decode state from URL ----------
  useEffect(() => {
    if (state) {
      const decodedState = decodeURIComponent(state);
      setSelectedState(decodedState);
    }
  }, [state]);

  // NEW: Determine if current page is international (country) or Indian (state)
  useEffect(() => {
    if (!selectedState) return;
    const isCountry = Object.keys(countryDestinations).some(
      c => c.toLowerCase() === selectedState.toLowerCase()
    );
    console.log(`Is "${selectedState}" an international country?`, isCountry);
    setIsInternationalPage(isCountry);

    if (isCountry) {
      setSelectedWorldTours([selectedState]);
      setSelectedIndianTours([]);
    } else {
      setSelectedIndianTours([selectedState]);
      setSelectedWorldTours([]);
    }
  }, [selectedState, countryDestinations]);

  // ============ UPDATED: Filter by country OR state ============
  const getCurrentStateTours = () => {
    if (!selectedState) {
      console.log("No selected state, returning all tours");
      return allTours;
    }

    console.log("Filtering honeymoon tours for:", selectedState, "| International?", isInternationalPage);

    let filtered: any[] = [];

    if (isInternationalPage) {
      const countryKey = Object.keys(countryDestinations).find(
        c => c.toLowerCase() === selectedState.toLowerCase()
      );
      const destinationsInCountry = countryKey ? countryDestinations[countryKey] : [];
      console.log(`Destinations in ${selectedState}:`, destinationsInCountry);

      filtered = allTours.filter((tour) => {
        const destName = tour.primary_destination_name?.toLowerCase() || "";
        const typeMatch = tour.tour_type?.toLowerCase() === "honeymoon";
        const matchesAnyDestination = destinationsInCountry.some(
          d => d.toLowerCase() === destName
        );
        return matchesAnyDestination && typeMatch;
      });
    } else {
      filtered = allTours.filter((tour) => {
        const stateMatch = tour.primary_destination_name?.toLowerCase() === selectedState.toLowerCase();
        const typeMatch = tour.tour_type?.toLowerCase() === "honeymoon";
        return stateMatch && typeMatch;
      });
    }

    console.log("Filtered honeymoon tours count:", filtered.length);
    return filtered;
  };

  // Format tours — UPDATED locations for international
  const formatTours = (tours: any[]) => {
    return tours.map((tour) => {
      const imgUrl =
        tourImages[tour.tour_id] ||
        "https://via.placeholder.com/800x600?text=Tour+Image";

      const priceValue = Number(tour.base_price_adult) || 0;
      const days = tour.duration_days || 1;
      
      const emiData = tourEmiData[tour.tour_id];
      const emiPrice = emiData?.emiPrice || "0";
      const basicDetails = emiData?.basicDetails || {};
      const isInternational = basicDetails.is_international === 1 || isInternationalPage;

      const formattedEmi = emiPrice !== "0" ? `₹${parseFloat(emiPrice).toLocaleString()}` : "₹0";

      // NEW: Show "Australia — Melbourne" for international
      const locationDisplay = isInternationalPage
        ? (tour.primary_destination_name
            ? `${selectedState} — ${tour.primary_destination_name}`
            : selectedState)
        : (tour.primary_destination_name || "Unknown Location");

      return {
        id: tour.tour_id,
        code: tour.tour_code || `TOUR${tour.tour_id}`,
        title: tour.title || "Untitled Tour",
        duration: `${days - 1}N/${days}D`,
        days: days,
        price: `₹${priceValue.toLocaleString()}`,
        priceValue: priceValue,
        locations: locationDisplay, // <-- CHANGED
        image: imgUrl,
        emi: formattedEmi,
        emiPriceValue: parseFloat(emiPrice) || 0,
        isIndian: !isInternational,
        locationTags: [tour.primary_destination_name || ""],
        tourType: tour.tour_type,
        rawTourType: tour.tour_type,
        is_international: isInternational
      };
    });
  };

  // ---------- Format tours when data changes ----------
  useEffect(() => {
    if (allTours.length === 0) return;
    if (Object.keys(tourEmiData).length === 0 || Object.keys(tourImages).length === 0) return;

    console.log("=== FORMATTING HONEYMOON TOURS ===");
    const currentStateTours = getCurrentStateTours();
    const formatted = formatTours(currentStateTours);
    setFormattedTours(formatted);
  }, [allTours, tourImages, tourEmiData, selectedState, isInternationalPage, countryDestinations]);

  // ---------- Apply filters to formatted tours ----------
  useEffect(() => {
    if (formattedTours.length === 0) {
      setFilteredTours([]);
      return;
    }

    let result = [...formattedTours];
    
    if (isSearchActive && appliedSearchQuery !== "") {
      const query = appliedSearchQuery.toUpperCase();
      result = result.filter(tour => {
        const codeMatch = tour.code?.toUpperCase().includes(query);
        const titleMatch = tour.title?.toUpperCase().includes(query);
        return codeMatch || titleMatch;
      });
    }

    // Duration filter
    result = result.filter(
      (tour) => tour.days >= durationRange[0] && tour.days <= durationRange[1]
    );

    // Price filter
    result = result.filter(
      (tour) => tour.priceValue >= priceRange[0] && tour.priceValue <= priceRange[1]
    );

    // Departure month filter (placeholder logic)
    if (selectedDepartureMonths.length > 0) {
      result = result.filter(() => true);
    }

    // Indian tours filter — skip when international
    if (selectedIndianTours.length > 0 && !isInternationalPage) {
      result = result.filter((tour) => {
        if (!tour.isIndian) return false;
        return selectedIndianTours.some((sel) => {
          if (tour.state === sel) return true;
          if (tour.title.toLowerCase().includes(sel.toLowerCase())) return true;
          if (tour.locations.toLowerCase().includes(sel.toLowerCase())) return true;
          return false;
        });
      });
    }

    // Sorting
    if (sortType === "price-low") {
      result.sort((a, b) => a.priceValue - b.priceValue);
    } else if (sortType === "price-high") {
      result.sort((a, b) => b.priceValue - a.priceValue);
    } else if (sortType === "duration") {
      result.sort((a, b) => a.days - b.days);
    }

    setFilteredTours(result);
  }, [
    formattedTours,
    durationRange,
    priceRange,
    isSearchActive,
    appliedSearchQuery,
    selectedDepartureMonths,
    selectedIndianTours,
    selectedWorldTours,
    sortType,
    isInternationalPage,
  ]);

  const handleSearchTourCode = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toUpperCase();
    if (!query) {
      setIsSearchActive(false);
      setAppliedSearchQuery("");
      return;
    }
    setAppliedSearchQuery(query);
    setIsSearchActive(true);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setAppliedSearchQuery("");
    setIsSearchActive(false);
    setShowSearchBtn(false);
  };

  // ---------- Filter handlers ----------
  const handleDepartureMonthChange = (month: string, checked: boolean) => {
    if (checked) {
      setSelectedDepartureMonths([...selectedDepartureMonths, month]);
    } else {
      setSelectedDepartureMonths(selectedDepartureMonths.filter((m) => m !== month));
    }
  };

  const handleIndianTourChange = (tour: string, checked: boolean) => {
    if (checked) {
      setSelectedIndianTours([...selectedIndianTours, tour]);
    } else {
      setSelectedIndianTours(selectedIndianTours.filter((t) => t !== tour));
    }
  };

  const handleWorldTourChange = (tour: string, checked: boolean) => {
    if (checked) {
      setSelectedWorldTours([...selectedWorldTours, tour]);
    } else {
      setSelectedWorldTours(selectedWorldTours.filter((t) => t !== tour));
    }
  };

  const clearAllFilters = () => {
    setDurationRange([0, 150]);
    setPriceRange([0, 10000000]);
    setSelectedDepartureMonths([]);
    setSelectedIndianTours([]);
    setSelectedWorldTours([]);
    setSortType("recommended");
    clearSearch();
  };

  useEffect(() => {
    if (filteredTours.length > 0) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setPaginatedTours(filteredTours.slice(startIndex, endIndex));
    } else {
      setPaginatedTours([]);
    }
  }, [filteredTours, currentPage, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [durationRange, priceRange, selectedDepartureMonths, selectedIndianTours, selectedWorldTours, sortType, appliedSearchQuery, isSearchActive]);

  // Hero image — check state, then country
  const heroImage =
    stateHeroImages[selectedState as keyof typeof stateHeroImages] ??
    countryHeroImages[selectedState] ??
    '/img/default.jpg';

  const heroDescription =
    stateDescriptions[selectedState as keyof typeof stateDescriptions] ??
    `Explore the beauty of ${selectedState}`;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading tours...</p>
      </div>
    );
  }

  return (
    <>
    <div className="min-h-screen bg-[#E53C42] bg-opacity-10">
      <Header />

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="lg:w-80">
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl shadow-lg p-6 border border-blue-200 sticky top-24">
              <div className="flex justify-between items-center mb-6 bg-white p-2 rounded-lg border border-black">
                <h2 className="text-2xl font-bold text-[#2E4D98]">
                  {isInternationalPage ? "Intl Honeymoon Tours" : "Honeymoon Tours"}
                </h2>
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

              {/* Indian Tours */}
              <div className="mb-8">
                <div className="mb-4">
                  <form onSubmit={handleSearchTourCode} className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        type="text"
                        placeholder="Search by tour code"
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setShowSearchBtn(e.target.value.trim() !== "");
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleSearchTourCode(e);
                          }
                        }}
                        className="border-[#2E4D98] focus:border-[#2E4D98] focus:ring-[#2E4D98] pr-8"
                      />

                      {searchQuery && (
                        <button
                          type="button"
                          onClick={() => {
                            clearSearch();
                            setShowSearchBtn(false);
                          }}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          ✕
                        </button>
                      )}
                    </div>

                    {showSearchBtn && (
                      <Button
                        type="submit"
                        className="bg-red-600 hover:bg-red-700 text-white px-6"
                      >
                        Search
                      </Button>
                    )}
                  </form>
                </div>
                <div className="flex justify-between items-center mb-6 bg-white p-2 rounded-lg border border-black">
                  <h2 className="text-2xl font-bold text-[#2E4D98]">Indian Tours</h2>
                </div>
  
                <div className={`${showMoreIndian ? "max-h-40 overflow-y-auto pr-1" : ""} space-y-3`}>
                  {[
                    'Andaman', 'Goa', 'Kerala', 'Kashmir', 'Rajasthan', 'Himachal',
                    ...(showMoreIndian ? [
                      'Andhra Pradesh','Bihar','Chhattisgarh','Dadra & Nagar Haveli',
                      'Daman & Diu','Delhi','Gujarat','Haryana','Jharkhand',
                      'Karnataka','Ladakh','Lakshadweep','Madhya Pradesh',
                      'Maharashtra','North East','Odisha','Puducherry',
                      'Punjab & Haryana','Seven Sisters','Tamil Nadu',
                      'Uttar Pradesh','Uttarakhand','West Bengal'
                    ] : [])
                  ]
                    .sort((a, b) => a.localeCompare(b))
                    .map((place) => {
                      const isCurrentState = selectedState === place;
                      return (
                        <div key={place} className="flex items-center gap-3 cursor-pointer">
                          <Checkbox
                            checked={isCurrentState}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                clearAllFilters();
                                navigate(`/honeymoon_tours/${encodeURIComponent(place)}`);
                              }
                            }}
                            className="data-[state=checked]:bg-[#2E4D98] data-[state=checked]:border-[#2E4D98]"
                          />
                          <span
                            className={`text-gray-700 hover:text-[#2E4D98] cursor-pointer ${isCurrentState ? 'font-bold text-[#2E4D98]' : ''}`}
                            onClick={() => {
                              clearAllFilters();
                              navigate(`/honeymoon_tours/${encodeURIComponent(place)}`);
                            }}
                          >
                            {place}
                          </span>
                        </div>
                      );
                    })}
                </div>

                <button
                  onClick={() => setShowMoreIndian(!showMoreIndian)}
                  className="mt-3 text-[#2E4D98] text-sm font-semibold hover:underline"
                >
                  {showMoreIndian ? "Show Less" : "Show More"}
                </button>
              </div>

              {/* ========== INTERNATIONAL TOURS — NOW SHOWS COUNTRIES ========== */}
              <div>
                <div className="flex justify-between items-center mb-6 bg-white p-2 rounded-lg border border-black">
                  <h2 className="text-2xl font-bold text-[#2E4D98]">International Tours</h2>
                </div>
 
                {loadingDestinations ? (
                  <div className="text-center py-4">
                    <p className="text-gray-500">Loading international destinations...</p>
                  </div>
                ) : Object.keys(countryDestinations).length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-gray-500">No international destinations found</p>
                  </div>
                ) : (
                  <>
                    <div className={`${showMoreWorld ? "max-h-40 overflow-y-auto pr-1" : ""} space-y-3`}>
                      {/* OLD: internationalDestinations (cities) | NEW: countryDestinations keys */}
                      {Object.keys(countryDestinations)
                        .sort()
                        .slice(0, showMoreWorld ? Object.keys(countryDestinations).length : 6)
                        .map((countryName) => {
                          const isSelected = selectedState === countryName;
                          return (
                            <div
                              key={countryName}
                              className="flex items-center gap-3 cursor-pointer"
                              onClick={() => {
                                if (!selectedWorldTours.includes(countryName)) {
                                  setSelectedWorldTours([countryName]);
                                }
                                navigate(`/intl-honeymoon_tours/${encodeURIComponent(countryName)}`);
                              }}
                            >
                              <Checkbox
                                checked={isSelected}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setSelectedWorldTours([countryName]);
                                    navigate(`/intl-honeymoon_tours/${encodeURIComponent(countryName)}`);
                                  } else {
                                    setSelectedWorldTours([]);
                                  }
                                }}
                                className="data-[state=checked]:bg-[#2E4D98] data-[state=checked]:border-[#2E4D98]"
                                onClick={(e) => e.stopPropagation()}
                              />
                              <span
                                className={`${isSelected ? 'font-bold text-[#2E4D98]' : 'text-gray-700 hover:text-[#2E4D98]'} cursor-pointer flex-1`}
                              >
                                {countryName}
                              </span>
                            </div>
                          );
                        })}
                    </div>
 
                    {Object.keys(countryDestinations).length > 6 && (
                      <button
                        onClick={() => setShowMoreWorld(!showMoreWorld)}
                        className="mt-3 text-[#2E4D98] text-sm font-semibold hover:underline"
                      >
                        {showMoreWorld ? "Show Less" : "Show More"}
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="relative rounded-2xl overflow-hidden mb-6">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url('${heroImage}')`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/10"></div>
              </div>

              <div className="relative p-8 min-h-[200px] flex items-center">
                <div className="text-white">
                  <h1 className="text-3xl font-bold mb-2">{selectedState} Honeymoon Tour Packages</h1>
                  <p className="text-base opacity-90 max-w-2xl">{heroDescription}</p>
                  <p className="text-sm opacity-80 mt-2">
                    Showing {filteredTours.length} Honeymoon tour packages for {selectedState}
                    <span className="ml-2 text-xs">(Total available: {formattedTours.length})</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">{selectedState} Honeymoon Holiday Packages</h2>
                <p className="text-gray-600 mt-1">
                  Showing {filteredTours.length} of {formattedTours.length} Honeymoon tours • Best prices guaranteed
                </p>
              </div>
            </div>

            {filteredTours.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-600">No Honeymoon tours found for the selected filters</h3>
                <p className="text-gray-500 mt-2">
                  Total available honeymoon tours for {selectedState}: {formattedTours.length}
                </p>
                <Button
                  onClick={clearAllFilters}
                  className="mt-4 bg-[#2E4D98] hover:bg-[#2E4D98] hover:opacity-90 text-white"
                >
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm text-gray-600">
                    Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredTours.length)} of {filteredTours.length} tours
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">Show:</label>
                    <select
                      value={itemsPerPage}
                      onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="border rounded-md px-2 py-1 text-sm"
                    >
                      <option value={6}>6</option>
                      <option value={9}>9</option>
                      <option value={12}>12</option>
                      <option value={18}>18</option>
                      <option value={24}>24</option>
                    </select>
                    <span className="text-sm text-gray-600">per page</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedTours.map((tour, index) => (
                    <div key={index} className="flex flex-col">
                      <div className="bg-white border-2 border-gray-300 rounded-lg p-3 mb-3 shadow-sm">
                        <div className="grid grid-cols-3 gap-0 border border-gray-400 rounded overflow-hidden">
                          <div className="bg-[#2E4D98] border-r border-gray-400 p-2 flex items-center justify-center flex-1">
                            <div className="text-sm font-bold text-white text-center">CODE</div>
                          </div>

                          <div className="bg-gradient-to-br from-blue-100 to-blue-50 border-gray-400 p-2 flex items-center justify-center flex-1">
                            <div className="text-sm font-bold text-gray-900 text-center">{tour.code}</div>
                          </div>
                          <div className="bg-[#2E4D98] p-2 flex items-center justify-center flex-1">
                            <div className="text-sm font-bold text-white text-center">{tour.duration}</div>
                          </div>
                        </div>
                      </div>

                      <div className="group bg-blue-50 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border border-blue-100 flex flex-col flex-1 min-h-0">
                        <div className="relative h-56 overflow-hidden flex-shrink-0">
                          <img
                            src={tour.image}
                            alt={tour.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        </div>

                        <div className="p-5 flex-1 flex flex-col min-h-0">
                          <h3 className="font-bold text-lg text-gray-800 line-clamp-2 mb-2">
                            {tour.title}
                          </h3>
                          <div className="mb-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm text-[#2E4D98] font-bold">Tour Cost P.P</span>
                              <p className="text-2xl font-bold text-gray-900">{tour.price}</p>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-[#2E4D98] font-bold">EMI Per Month</span>
                              <p className="text-sm font-bold text-gray-900">{tour.emi}</p>
                            </div>
                          </div>

                          <p className="text-sm text-[#2E4D98] font-bold mb-3">{tour.locations}</p>

                          <div className="flex items-center justify-between text-sm text-gray-500 mb-0">
                            <span>{tour.dates}</span>
                          </div>

                          <div className="flex gap-2 mt-0">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 border-[#2E4D98] text-[#2E4D98] hover:bg-[#2E4D98] hover:text-white"
                              onClick={() => {
                                if (tour.is_international === true) {
                                  navigate(`/international_tour_details/${tour.id}`);
                                } else {
                                  navigate(`/tour_details/${tour.id}`); 
                                }
                              }}
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

                {Math.ceil(filteredTours.length / itemsPerPage) > 1 && (
                  <div className="mt-8">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={Math.ceil(filteredTours.length / itemsPerPage)}
                      onPageChange={setCurrentPage}
                      maxVisiblePages={3}
                    />
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default TourPackages;