import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

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
  "Odisha": "https://images.unsplash.com/photo-1587132135068-bc3c3dcfd4e5?w=1200&q=80",
  "Puducherry": "https://images.unsplash.com/photo-1587132135069-bc3c3dcfd4e6?w=1200&q=80",
  "Punjab & Haryana": "https://images.unsplash.com/photo-1587132135070-bc3c3dcfd4e7?w=1200&q=80",
  "Rajasthan": "https://images.unsplash.com/photo-1587132135071-bc3c3dcfd4e8?w=1200&q=80",
  "Seven Sisters": "https://images.unsplash.com/photo-1587132135072-bc3c3dcfd4e9?w=1200&q=80",
  "Tamil Nadu": "https://images.unsplash.com/photo-1587132135073-bc3c3dcfd4ea?w=1200&q=80",
  "Uttar Pradesh": "https://images.unsplash.com/photo-1587132135074-bc3c3dcfd4eb?w=1200&q=80",
  "Uttarakhand": "https://images.unsplash.com/photo-1587132135075-bc3c3dcfd4ec?w=1200&q=80",
  "West Bengal": "https://images.unsplash.com/photo-1587132135076-bc3c3dcfd4ed?w=1200&q=80",
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


const Tour_indain = () => {
  const navigate = useNavigate();
  const { state } = useParams(); // Get state from URL params
  const [viewMode] = useState<'grid' | 'list'>('grid');
  const [showMoreIndian, setShowMoreIndian] = useState(false);
  const [showMoreWorld, setShowMoreWorld] = useState(false);
  const [sortType, setSortType] = useState("recommended");
   const [showAllDepartureMonths, setShowAllDepartureMonths] = useState(false);
  const [selectedDepartureMonths, setSelectedDepartureMonths] = useState<string[]>([]);

  // Filter states
  const [durationRange, setDurationRange] = useState([0, 11]);
  const [priceRange, setPriceRange] = useState([0, 153000]);
  const [selectedIndianTours, setSelectedIndianTours] = useState<string[]>([]);
  const [selectedWorldTours, setSelectedWorldTours] = useState<string[]>([]);
  const [filteredTours, setFilteredTours] = useState<any[]>([]);
  const [selectedState, setSelectedState] = useState<string>(state || "Andaman");

  const [allTours, setAllTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  // 🔹 tour_id → imageUrl
  const [tourImages, setTourImages] = useState<Record<number | string, string>>({});

  // ---------- Fetch base tours ----------
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/tours");
        const data = await res.json();
        setAllTours(data);
      } catch (err) {
        console.error("Error fetching tours:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  // ---------- Fetch images for each tour ----------
  useEffect(() => {
    if (!allTours || allTours.length === 0) return;

    const fetchImagesForTours = async () => {
      try {
        const results = await Promise.all(
          allTours.map(async (tour) => {
            try {
              const res = await fetch(
                `http://localhost:5000/api/tours/tour/full/${tour.tour_id}`
              );
              const data = await res.json();

              const images = data.images || [];
              // Prefer cover image, else first image
              const cover =
                images.find((img: any) => img.is_cover === 1) || images[0];

              return {
                tourId: tour.tour_id,
                imageUrl: cover?.url || "",
              };
            } catch (err) {
              console.error(
                "Error fetching tour details for",
                tour.tour_id,
                err
              );
              return { tourId: tour.tour_id, imageUrl: "" };
            }
          })
        );

        const imageMap: Record<number | string, string> = {};
        results.forEach((r) => {
          if (r.imageUrl) {
            imageMap[r.tourId] = r.imageUrl;
          }
        });

        setTourImages(imageMap);
      } catch (err) {
        console.error("Error building tour images map:", err);
      }
    };

    fetchImagesForTours();
  }, [allTours]);

  // ---------- Decode state from URL ----------
  useEffect(() => {
    if (state) {
      const decodedState = decodeURIComponent(state);
      setSelectedState(decodedState);
    }
  }, [state]);

  // ---------- Helper: get tours for selected state (raw API shape) ----------
  const getCurrentStateTours = () => {
    if (!selectedState) return allTours;

    return allTours.filter(
      (tour) =>
        tour.primary_destination_name?.toLowerCase() ===
        selectedState.toLowerCase()
    );
  };

  // ---------- Helper: format raw tours into UI-friendly shape (with images) ----------
  const formatTours = (tours: any[]) => {
    return tours.map((tour) => {
      const imgUrl =
        tourImages[tour.tour_id] ||
        "https://via.placeholder.com/800x600?text=Tour+Image"; // fallback

      return {
        id: tour.tour_id,
        code: tour.tour_code,
        title: tour.title,
        duration: `${tour.duration_days - 1}N/${tour.duration_days}D`,
        days: tour.duration_days,
        price: `₹${Number(tour.base_price_adult).toLocaleString()}`,
        priceValue: Number(tour.base_price_adult),
        locations: tour.primary_destination_name,
        image: imgUrl,
        emi: `₹${Math.round(
          Number(tour.base_price_adult) / 12
        )}`,
        isIndian: true,
        // for world tour filter safety
        locationTags: [tour.primary_destination_name || ""],
      };
    });
  };

  // ---------- Main filter + sort effect (SINGLE SOURCE OF TRUTH) ----------
  useEffect(() => {
    // Start from state-filtered raw tours
    let result = formatTours(getCurrentStateTours()); // now result has image, days, priceValue, etc.

    // Duration filter
    result = result.filter(
      (tour) => tour.days >= durationRange[0] && tour.days <= durationRange[1]
    );

    // Price filter
    result = result.filter(
      (tour) =>
        tour.priceValue >= priceRange[0] && tour.priceValue <= priceRange[1]
    );

    // Departure month filter (placeholder logic)
    if (selectedDepartureMonths.length > 0) {
      result = result.filter(() => true);
    }

    // Indian tours filter
    if (selectedIndianTours.length > 0) {
      result = result.filter((tour) => {
        if (!tour.isIndian) return false;

        return selectedIndianTours.some((sel) => {
          if (tour.state === sel) return true;
          if (tour.title.toLowerCase().includes(sel.toLowerCase())) return true;
          if (tour.locations.toLowerCase().includes(sel.toLowerCase()))
            return true;
          return false;
        });
      });
    }

    // World tours filter (won't really match for isIndian=true, but safe)
    if (selectedWorldTours.length > 0) {
      result = result.filter((tour) => {
        if (tour.isIndian) return false;
        return selectedWorldTours.some((selectedLocation) =>
          (tour.locationTags || []).some((tag: string) =>
            tag.toLowerCase().includes(selectedLocation.toLowerCase())
          )
        );
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

    console.log("filteredTours", filteredTours)
  }, [
    allTours,
    tourImages,           // 🔥 re-run when images load
    selectedState,
    durationRange,
    priceRange,
    selectedDepartureMonths,
    selectedIndianTours,
    selectedWorldTours,
    sortType,
  ]);

  // ---------- Filter handlers ----------
  const handleDepartureMonthChange = (month: string, checked: boolean) => {
    if (checked) {
      setSelectedDepartureMonths([...selectedDepartureMonths, month]);
    } else {
      setSelectedDepartureMonths(selectedDepartureMonths.filter(m => m !== month));
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
    const ALL_DEPARTURE_MONTHS = [
    'January-2026', 'February-2026', 'March-2026', 'April-2026', 
    'May-2026', 'June-2026', 'July-2026', 'August-2026', 
    'September-2026', 'October-2026', 'November-2026', 'December-2026'
  ];



    // Handler for month selection

  const clearAllFilters = () => {
    setDurationRange([0, 11]);
    setPriceRange([0, 153000]);
    setSelectedDepartureMonths([]);
    setSelectedIndianTours([]);
    setSelectedWorldTours([]);
    setSortType("recommended");
  };

  const currentTours = getCurrentStateTours();
  const heroImage = stateHeroImages[selectedState as keyof typeof stateHeroImages] || stateHeroImages.default;
  const heroDescription = stateDescriptions[selectedState as keyof typeof stateDescriptions] || stateDescriptions.default;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading tours...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E53C42] bg-opacity-10">
      <Header />

      {/* Combined Hero and Filter Section */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Filters Sidebar */}
       <aside className="lg:w-80">
                <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl shadow-lg p-6 border border-blue-200 sticky top-24">
                  <div className="flex justify-between items-center mb-6 bg-white p-2 rounded-lg border border-black">
                    <h2 className="text-2xl font-bold text-[#2E4D98]">Duration And Price</h2>
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

                  <div className="mb-8">
      <h3 className="font-semibold text-lg mb-4 text-[#2E4D98]">Departure date</h3>
      <div className="space-y-3">
        {(showAllDepartureMonths ? ALL_DEPARTURE_MONTHS : ALL_DEPARTURE_MONTHS.slice(0, 5))
          .map((month) => (
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
      
      {/* Show More/Less Button */}
      {ALL_DEPARTURE_MONTHS.length > 5 && (
        <button
          onClick={() => setShowAllDepartureMonths(!showAllDepartureMonths)}
          className="mt-4 text-[#2E4D98] font-medium hover:text-[#1E3A8A] transition-colors"
        >
          {showAllDepartureMonths ? 'Show Less' : 'Show More'}
        </button>
      )}
    </div>
    
                  {/* Indian Tours */}
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-6 bg-white p-2 rounded-lg border border-black">
                      <h2 className="text-2xl font-bold text-[#2E4D98]">Indian Individual Tours
</h2>
                    </div>
                    <div className={`${showMoreIndian ? "max-h-40 overflow-y-auto pr-1" : ""} space-y-3`}>
                      {[
                        'Andaman', 'Goa', 'Kerala', 'Himachal', 'Rajasthan', 'Kashmir',
                        ...(showMoreIndian
                          ? [     'Andhra Pradesh',
              'Bihar',
              'Chhattisgarh',
              'Dadra & Nagar Haveli',
              'Daman & Diu',
              'Delhi',
              'Gujarat',
              'Haryana',
              'Jharkhand',
              'Karnataka',
              'Ladakh',
              'Lakshadweep',
              'Madhya Pradesh',
              'Maharashtra',
              'North East',
              'Odisha',
              'Puducherry',
              'Punjab & Haryana',
              'Seven Sisters',
              'Tamil Nadu',
              'Uttar Pradesh',
              'Uttarakhand',
              'West Bengal']
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
                    <div className="flex justify-between items-center mb-6 bg-white p-2 rounded-lg border border-black">
                      <h2 className="text-2xl font-bold text-[#2E4D98]">International Individual Tours</h2>
                    </div>
                    <div className={`${showMoreWorld ? "max-h-40 overflow-y-auto pr-1" : ""} space-y-3`}>
                      {[
                        'Dubai', 'Europe', 'Maldives', 'Mauritius', 'Thailand', 'Bali',
                        ...(showMoreWorld
                          ? ['Singapore', 'Vietnam', 'Turkey', 'Japan', 'South Korea', 'Australia']
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
                  backgroundImage: `url('${heroImage}')`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/10"></div>
              </div>

              {/* Hero Content */}
              <div className="relative p-8 min-h-[200px] flex items-center">
                <div className="text-white">
                  <h1 className="text-3xl font-bold mb-2">{selectedState} Group Tours Packages</h1>
                  {/* <p className="text-base opacity-90 max-w-2xl">
                    {heroDescription}
                  </p> */}
                  {/* <p className="text-sm opacity-80 mt-2">
                    Showing {filteredTours.length} tour packages for {selectedState}
                  </p> */}
                </div>
              </div>
            </div>

            {/* Main Content Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">{selectedState} Group Tours </h2>
                <p className="text-gray-600 mt-1">
                  Showing {filteredTours.length} of {currentTours.length} tours • Best prices guaranteed
                </p>
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
                <p className="text-gray-500 mt-2">
                  Try adjusting your filters or clear all filters to see more options
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
        onClick={() => navigate(`/tours_groups/${tour.id}`)}
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

export default Tour_indain;