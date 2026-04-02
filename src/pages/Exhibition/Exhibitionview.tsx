import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "@/ApiUrls";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

interface AboutData {
  banner_image: string;
  imageText: string;
  qa: Array<{ q: string; a: string }>;
}

interface City {
  id: number;
  city_name: string;
  image: string;
  price: string;
  state_name?: string;
  country_name?: string;
  start_date?: string;
  duration_days?: number;
  emi_price?: string; 
}

interface DomesticExhibition {
  id: number;
  domestic_category_name: string;
  created_at: string;
  updated_at: string;
  cities: City[];
  start_date?: string;
  duration_days?: number;
   emi_price?: string; 
}

interface InternationalExhibition {
  id: number;
  international_category_name: string;
  created_at: string;
  updated_at: string;
  cities: City[];
  start_date?: string;
  duration_days?: number;
   emi_price?: string;
}

const ExhibitionView: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const passedCategory = location.state?.category || null;

  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [openQA, setOpenQA] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(passedCategory);
  const [selectedType, setSelectedType] = useState<'domestic' | 'international' | null>(null);

  const [headerTitle, setHeaderTitle] = useState<string>(
    passedCategory ? passedCategory : "Exhibition"
  );

  // Filter states
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchBtn, setShowSearchBtn] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  
  const [departureMonths, setDepartureMonths] = useState<string[]>([]);
  
  const [showMoreDomestic, setShowMoreDomestic] = useState(false);
  const [showMoreInternational, setShowMoreInternational] = useState(false);
  const [selectedDepartureMonths, setSelectedDepartureMonths] = useState<string[]>([]);
  const [selectedDomesticCategories, setSelectedDomesticCategories] = useState<string[]>([]);
  const [selectedInternationalCategories, setSelectedInternationalCategories] = useState<string[]>([]);
  const [showAllDepartureMonths, setShowAllDepartureMonths] = useState(false);
const [durationRange, setDurationRange] = useState([0, 10]); // Add this with other states
  // ── Data state ─────────────────────────────────────────────────────────────
  const [aboutData, setAboutData] = useState<AboutData>({
    banner_image: "",
    imageText: "",
    qa: [],
  });

  const [domesticCategories, setDomesticCategories] = useState<string[]>([]);
  const [domesticExhibitionData, setDomesticExhibitionData] = useState<DomesticExhibition[]>([]);
  const [selectedDomesticData, setSelectedDomesticData] = useState<DomesticExhibition | null>(null);

  // International states
  const [internationalCategories, setInternationalCategories] = useState<string[]>([]);
  const [internationalExhibitionData, setInternationalExhibitionData] = useState<InternationalExhibition[]>([]);
  const [selectedInternationalData, setSelectedInternationalData] = useState<InternationalExhibition | null>(null);

  const [loading, setLoading] = useState({
    about: false,
    domestic: false,
    international: false,
    exhibitions: false,
  });

  // Check mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close mobile menu when selecting category or menu
  useEffect(() => {
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  }, [selectedCategory, activeMenu, selectedType, isMobile]);

  // ── Fetch About data ───────────────────────────────────────────────────────
  useEffect(() => {
    const fetchAboutData = async () => {
      setLoading((prev) => ({ ...prev, about: true }));
      try {
        const response = await fetch(`${BASE_URL}/api/exhibitions/about`);
        if (!response.ok) throw new Error(`Failed: ${response.status}`);
        const data = await response.json();
        if (data) {
          const imageUrl = data.banner_image
            ? `${BASE_URL}/uploads/exhibition/${data.banner_image}`
            : data.image_url || data.image_path || "";
          setAboutData({
            banner_image: data.banner_image || "",
            imageText: imageUrl,
            qa: Array.isArray(data.questions)
              ? data.questions.map((q: any) => ({ q: q.question, a: q.answer }))
              : [],
          });
        }
      } catch (error) {
        console.error("Error fetching about exhibition:", error);
        setAboutData({
          banner_image: "",
          imageText: "",
          qa: [{ q: "Error loading data", a: "Failed to load about exhibition data." }],
        });
      } finally {
        setLoading((prev) => ({ ...prev, about: false }));
      }
    };
    fetchAboutData();
  }, []);

  useEffect(() => {
    const cat = location.state?.category ?? null;
    if (cat) {
      setSelectedCategory(cat);
      setHeaderTitle(cat);
      setActiveMenu(null);
      setSelectedType(null);
      fetchExhibitionByCategory(cat);
    }
  }, [location.state]);

  // ── Fetch Domestic Data ───────────────────────────────────────────────────────
  useEffect(() => {
    const fetchDomesticData = async () => {
      setLoading((prev) => ({ ...prev, domestic: true }));
      try {
        const response = await fetch(`${BASE_URL}/api/exhibitions/domestic`);
        if (!response.ok) throw new Error(`Failed: ${response.status}`);
        const data = await response.json();
        
        if (Array.isArray(data) && data.length > 0) {
          const categories = data.map((item: DomesticExhibition) => item.domestic_category_name);
          setDomesticCategories(categories);
          setDomesticExhibitionData(data);
        } else {
          setDomesticCategories([]);
          setDomesticExhibitionData([]);
        }
      } catch (error) {
        console.error("Error fetching domestic:", error);
        setDomesticCategories([]);
        setDomesticExhibitionData([]);
      } finally {
        setLoading((prev) => ({ ...prev, domestic: false }));
      }
    };
    fetchDomesticData();
  }, []);

  // ── Fetch International Data ───────────────────────────────────────────────────────
  useEffect(() => {
    const fetchInternationalData = async () => {
      setLoading((prev) => ({ ...prev, international: true }));
      try {
        const response = await fetch(`${BASE_URL}/api/exhibitions/international`);
        if (!response.ok) throw new Error(`Failed: ${response.status}`);
        const data = await response.json();
        
        if (Array.isArray(data) && data.length > 0) {
          const categories = data.map((item: InternationalExhibition) => item.international_category_name);
          setInternationalCategories(categories);
          setInternationalExhibitionData(data);
        } else {
          setInternationalCategories([]);
          setInternationalExhibitionData([]);
        }
      } catch (error) {
        console.error("Error fetching international:", error);
        setInternationalCategories([]);
        setInternationalExhibitionData([]);
      } finally {
        setLoading((prev) => ({ ...prev, international: false }));
      }
    };
    fetchInternationalData();
  }, []);


  // Auto-select checkbox for passed category
useEffect(() => {
  if (passedCategory) {
    // For domestic categories
    if (domesticCategories.includes(passedCategory)) {
      setSelectedDomesticCategories([passedCategory]);
      setSelectedType('domestic');
    }
    // For international categories
    else if (internationalCategories.includes(passedCategory)) {
      setSelectedInternationalCategories([passedCategory]);
      setSelectedType('international');
    }
    
    // Clear any active menu
    setActiveMenu(null);
  }
}, [passedCategory, domesticCategories, internationalCategories]);


useEffect(() => {
  // ✅ Departure Month Filter
  let allCities: City[] = [];
  
  // Get cities from selected domestic categories
  if (selectedDomesticCategories.length > 0) {
    selectedDomesticCategories.forEach(categoryName => {
      const domesticData = domesticExhibitionData.find(
        item => item.domestic_category_name === categoryName
      );
      if (domesticData && domesticData.cities) {
        // Attach duration to each city from the parent exhibition
        const citiesWithDuration = domesticData.cities.map(city => ({
          ...city,
          duration_days: domesticData.duration_days ,
          emi_price: domesticData.emi_price 
        }));
        allCities = [...allCities, ...citiesWithDuration];
      }
    });
  }
  

  // Get cities from selected international categories
  if (selectedInternationalCategories.length > 0) {
    selectedInternationalCategories.forEach(categoryName => {
      const internationalData = internationalExhibitionData.find(
        item => item.international_category_name === categoryName
      );
      if (internationalData && internationalData.cities) {
        // Attach duration to each city from the parent exhibition
        const citiesWithDuration = internationalData.cities.map(city => ({
          ...city,
          duration_days: internationalData.duration_days ,
           emi_price: internationalData.emi_price
        }));
        allCities = [...allCities, ...citiesWithDuration];
      }
    });
  }

  // If no categories selected, show all cities from selected category (for backward compatibility)
  if (selectedDomesticCategories.length === 0 && selectedInternationalCategories.length === 0) {
    const currentData = selectedType === 'domestic' ? selectedDomesticData : selectedInternationalData;
    if (currentData && currentData.cities) {
      const citiesWithDuration = currentData.cities.map(city => ({
        ...city,
        duration_days: currentData.duration_days,
         emi_price: currentData.emi_price 
      }));
      allCities = citiesWithDuration;
    }
  }

  if (allCities.length === 0) {
    setFilteredCities([]);
    return;
  }

  let result = [...allCities];

  // ✅ Exhibition Range filter - NEW
  result = result.filter(
    (city) => (city.duration_days || 0) >= durationRange[0] && 
               (city.duration_days || 0) <= durationRange[1]
  );

  // Price filter
  result = result.filter(
    (city) => parseFloat(city.price) >= priceRange[0] && 
              parseFloat(city.price) <= priceRange[1]
  );
if (selectedDepartureMonths.length > 0) {
  result = result.filter((city) => {
    // City level start_date check cheyyi first
    if (city.start_date) {
      const cityMonth = formatMonthYear(city.start_date);
      if (selectedDepartureMonths.includes(cityMonth)) return true;
    }

    // Parent exhibition level start_date check cheyyi
    const parentDomestic = domesticExhibitionData.find(d =>
      d.cities.some(c => c.id === city.id)
    );
    const parentInternational = internationalExhibitionData.find(i =>
      i.cities.some(c => c.id === city.id)
    );
    const parent = parentDomestic || parentInternational;

    if (parent?.start_date) {
      const parentMonth = formatMonthYear(parent.start_date);
      return selectedDepartureMonths.includes(parentMonth);
    }
    return false;
  });
}


  // Search filter - only apply if search is active
  if (isSearchActive && searchQuery.trim() !== "") {
    const query = searchQuery.trim().toLowerCase();
    result = result.filter(city => {
      const cityName = (city.country_name || city.city_name).toLowerCase();
      return cityName.includes(query);
    });
  }

  setFilteredCities(result);
}, [
  selectedDomesticCategories, 
  selectedInternationalCategories, 
  domesticExhibitionData, 
  internationalExhibitionData, 
  selectedType, 
  selectedDomesticData, 
  selectedInternationalData, 
  priceRange, 
  searchQuery, 
  isSearchActive,
  durationRange, // ✅ Add to dependencies
  selectedDepartureMonths // ✅ Add to dependencies
]);
const fetchExhibitionByCategory = async (categoryName: string) => {
  setLoading((prev) => ({ ...prev, exhibitions: true }));
  try {
    // Check domestic
    const domesticExhibition = domesticExhibitionData.find(
      (item) => item.domestic_category_name === categoryName
    );
    
    if (domesticExhibition) {
      setSelectedDomesticData(domesticExhibition);
      setSelectedInternationalData(null);
      setSelectedType('domestic');
      setSelectedDomesticCategories([categoryName]); // Check this box
      setSelectedInternationalCategories([]);
      setPriceRange([0, 200000]);
      setSearchQuery("");
      setIsSearchActive(false);
      return;
    }
    
    // Check international
    const internationalExhibition = internationalExhibitionData.find(
      (item) => item.international_category_name === categoryName
    );
    
    if (internationalExhibition) {
      setSelectedInternationalData(internationalExhibition);
      setSelectedDomesticData(null);
      setSelectedType('international');
      setSelectedInternationalCategories([categoryName]); // Check this box
      setSelectedDomesticCategories([]);
      setPriceRange([0, 200000]);
      setSearchQuery("");
      setIsSearchActive(false);
      return;
    }
    
    setSelectedDomesticData(null);
    setSelectedInternationalData(null);
    setSelectedType(null);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    setLoading((prev) => ({ ...prev, exhibitions: false }));
  }
};

  const handleAboutClick = () => {
    const next = activeMenu === "About Exhibition" ? null : "About Exhibition";
    setActiveMenu(next);
    setSelectedCategory(null);
    setSelectedDomesticData(null);
    setSelectedInternationalData(null);
    setSelectedType(null);
    setOpenQA(null);
    setHeaderTitle(next ? "About Exhibition" : "Exhibition");
    if (isMobile) setIsMobileMenuOpen(false);
    // Reset filters
    setPriceRange([0, 200000]);
    setSearchQuery("");
    setIsSearchActive(false);
    setSelectedDomesticCategories([]);
    setSelectedInternationalCategories([]);
  };

 const handleDomesticCheckboxChange = (category: string, checked: boolean) => {
  if (checked) {
    setSelectedDomesticCategories([category]); 
    setSelectedInternationalCategories([]); 
    setSelectedCategory(null);
    setSelectedType('domestic');
    setSelectedDomesticData(domesticExhibitionData.find(d => d.domestic_category_name === category) || null);
    setSelectedInternationalData(null);
  } else {
    setSelectedDomesticCategories([]);
    setSelectedType(null);
    setSelectedDomesticData(null);
  }
};

const handleInternationalCheckboxChange = (category: string, checked: boolean) => {
  if (checked) {
    setSelectedInternationalCategories([category]); 
    setSelectedDomesticCategories([]); 
    setSelectedCategory(null);
    setSelectedType('international');
    setSelectedInternationalData(internationalExhibitionData.find(i => i.international_category_name === category) || null);
    setSelectedDomesticData(null);
  } else {
    setSelectedInternationalCategories([]);
    setSelectedType(null);
    setSelectedInternationalData(null);
  }
};

  const handleQAClick = (index: number) => {
    setOpenQA(openQA === index ? null : index);
  };

const clearAllFilters = () => {
  setPriceRange([0, 200000]);
  setSearchQuery("");
  setShowSearchBtn(false);
  setIsSearchActive(false);
  setSelectedDomesticCategories([]);
  setSelectedInternationalCategories([]);
  setSelectedCategory(null);
  setSelectedType(null);
  setSelectedDomesticData(null);
  setSelectedInternationalData(null);
  
  // Open About Exhibition dropdown
  setActiveMenu("About Exhibition");
  setHeaderTitle("About Exhibition");
  setOpenQA(null);
  
  if (isMobile) setIsMobileMenuOpen(false);
};
  const clearSearch = () => {
    setSearchQuery("");
    setShowSearchBtn(false);
    setIsSearchActive(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      setIsSearchActive(true);
    } else {
      setIsSearchActive(false);
    }
  };
      const formatMonthYear = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleString("en-IN", {
    month: "long",
    year: "numeric",
  }); // Example: March 2026
};

  const isImageUrl = (url: string) =>
    url && (url.startsWith("http") || url.startsWith("/"));

  const getFullImageUrl = (imagePath: string) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http")) return imagePath;
    return `${BASE_URL}/uploads/exhibition/${imagePath}`;
  };

  const handleViewDetails = (exhibitionId: number, type: 'domestic' | 'international') => {
    if (type === 'domestic') {
      navigate(`/exhibitiondetail/${exhibitionId}`);
    } else {
      navigate(`/exhibitioninternationalindetail/${exhibitionId}`);
    }
  };
useEffect(() => {
  let monthsSet = new Set<string>();

  // Domestic - category level start_date
  domesticExhibitionData.forEach((item) => {
    if (item.start_date) {
      const m = formatMonthYear(item.start_date);
      if (m) monthsSet.add(m);
    }
    // Cities level lo kuda check cheyyi
    item.cities?.forEach((city) => {
      if (city.start_date) {
        const m = formatMonthYear(city.start_date);
        if (m) monthsSet.add(m);
      }
    });
  });

  // International - category level + cities level
  internationalExhibitionData.forEach((item) => {
    if (item.start_date) {
      const m = formatMonthYear(item.start_date);
      if (m) monthsSet.add(m);
    }
    item.cities?.forEach((city) => {
      if (city.start_date) {
        const m = formatMonthYear(city.start_date);
        if (m) monthsSet.add(m);
      }
    });
  });

  setDepartureMonths(Array.from(monthsSet).sort());
}, [domesticExhibitionData, internationalExhibitionData]);


const handleDepartureMonthChange = (month: string, checked: boolean) => {
  if (checked) {
    setSelectedDepartureMonths((prev) => [...prev, month]);
  } else {
    setSelectedDepartureMonths((prev) =>
      prev.filter((m) => m !== month)
    );
  }
};

  const handleBookNowClick = (city: City) => {
    // Handle booking logic
    console.log("Booking:", city);
  };

  const renderAboutContent = () => {
    if (loading.about) {
      return (
        <div
          className="flex flex-col items-center justify-center gap-2"
          style={{ minHeight: "400px" }}
        >
          <span className="animate-spin h-8 w-8 border-4 border-gray-300 border-t-blue-600 rounded-full" />
          <span className="text-gray-500">Loading about exhibition...</span>
        </div>
      );
    }
    return (
      <>
        <div className="border m-2 md:m-4 bg-gray-50 overflow-hidden relative">
          {aboutData.imageText && isImageUrl(aboutData.imageText) ? (
            <div className="relative w-full">
              <img
                src={aboutData.imageText}
                alt="Exhibition Banner"
                className="w-full h-auto block"
                style={{ maxHeight: "450px", objectFit: "cover" }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const errorDiv = e.currentTarget.parentElement?.querySelector(
                    ".image-error"
                  ) as HTMLElement;
                  if (errorDiv) errorDiv.style.display = "flex";
                }}
              />
              <div
                className="image-error hidden flex-col items-center justify-center gap-2 text-gray-500 text-center p-4"
                style={{ minHeight: "200px" }}
              >
                <div className="text-sm">Failed to load image</div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center p-2">
                <h1
                  className="font-black text-center"
                  style={{
                    fontSize: "clamp(1rem, 5vw, 90px)",
                    color: "#00205b",
                    textShadow: "2px 2px 8px rgba(0,0,0,0.34)",
                    lineHeight: "1.2",
                  }}
                >
                  ABOUT EXHIBITION
                </h1>
              </div>
            </div>
          ) : (
            <div
              className="flex items-center justify-center text-gray-500 text-center p-4"
              style={{ minHeight: "200px" }}
            >
              <div className="text-sm">No image available</div>
            </div>
          )}
        </div>

        <div className="mx-2 md:mx-4 mb-4 border">
          {aboutData.qa.length > 0 ? (
            aboutData.qa.map((item, index) => (
              <div key={index} className="border-t">
                <div
                  onClick={() => handleQAClick(index)}
                  className="flex justify-between items-center px-3 md:px-4 py-2 md:py-3 cursor-pointer"
                  style={{ backgroundColor: "#2E3A8A", color: "#fff" }}
                >
                  <span className="text-sm md:text-base">{item.q}</span>
                  <span className="text-xs md:text-sm">
                    {openQA === index ? "▼" : "▶"}
                  </span>
                </div>
                {openQA === index && (
                  <div
                    className="px-3 md:px-4 py-3 md:py-4 bg-[#E8F0FF] overflow-y-auto text-sm md:text-base border border-black"
                    style={{
                      minHeight: "150px",
                      maxHeight: "250px",
                      textAlign: "justify",
                    }}
                  >
                    {item.a}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="px-4 py-6 text-center text-gray-500 text-sm">
              No questions available
            </div>
          )}
        </div>
      </>
    );
  };

  const renderExhibitionCards = () => {
    if (loading.exhibitions && (selectedDomesticCategories.length === 0 && selectedInternationalCategories.length === 0)) {
      return (
        <div className="flex items-center justify-center h-full py-16">
          <div className="flex flex-col items-center gap-2">
            <span className="animate-spin h-8 w-8 border-4 border-gray-300 border-t-blue-600 rounded-full" />
            <span className="text-gray-500">Loading exhibition details...</span>
          </div>
        </div>
      );
    }
    
    if (filteredCities.length === 0 && (selectedDomesticCategories.length > 0 || selectedInternationalCategories.length > 0 || selectedCategory)) {
      return (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-600">No exhibitions found for the selected filters</h3>
          <p className="text-gray-500 mt-2">
            Try adjusting your filters or search criteria
          </p>
          <Button
            onClick={clearAllFilters}
            className="mt-4 bg-[#2E4D98] hover:bg-[#2E4D98] hover:opacity-90 text-white"
          >
            Clear All Filters
          </Button>
        </div>
      );
    }
    
    if (filteredCities.length === 0 && selectedDomesticCategories.length === 0 && selectedInternationalCategories.length === 0 && !selectedCategory) {
      return (
        <div className="flex items-center justify-center h-full text-gray-400 py-16">
          <p className="text-sm md:text-base text-center px-4">
            Select a category from the sidebar to view exhibitions
          </p>
        </div>
      );
    }
    
    return (
<div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCities.map((city) => {
            // Determine if this city is from domestic or international
            const isDomestic = city.state_name !== undefined;
            const exhibitionId = isDomestic 
              ? domesticExhibitionData.find(d => d.cities.some(c => c.id === city.id))?.id
              : internationalExhibitionData.find(i => i.cities.some(c => c.id === city.id))?.id;
            
            return (
              <div key={city.id} className="flex flex-col">
             <div className="bg-white border-2 border-gray-300 rounded-lg p-3 mb-3 shadow-sm">
  <div className="grid grid-cols-3 gap-0 border border-gray-400 rounded overflow-hidden">
    
    {/* CITY / COUNTRY */}
    <div className="bg-[#2E4D98] border-r border-gray-400 p-2 flex items-center justify-center">
      <div className="text-sm font-bold text-white text-center">
        {isDomestic ? 'CITY' : 'COUNTRY'}
      </div>
    </div>

    {/* NAME */}
    <div className="bg-gradient-to-br from-blue-100 to-blue-50 border-r border-gray-400 p-2 flex items-center justify-center">
      <div className="text-sm font-bold text-gray-900 text-center">
        {isDomestic ? city.city_name : (city.country_name || city.city_name)}
      </div>
    </div>

    {/* DURATION (4N/5D) */}
    <div className="bg-[#2E4D98] p-2 flex items-center justify-center">
      <div className="text-sm font-bold text-white text-center">
        {city.duration_days 
          ? `${city.duration_days - 1}N/${city.duration_days}D`
          : 'N/A'}
      </div>
    </div>

  </div>
</div>

    
                

                {/* Separate Card with Light Blue Background */}
                <div className="group bg-blue-50 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border border-blue-100 flex flex-col flex-1 min-h-0">
                  {/* Image Section */}
                  <div className="relative h-56 overflow-hidden flex-shrink-0">
                    {city.image ? (
                      <img
                       src={getFullImageUrl(city.image)}
                        alt={isDomestic ? city.city_name : city.country_name || city.city_name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          const parent = e.currentTarget.parentElement;
                          if (parent) {
                            const errorDiv = document.createElement('div');
                            errorDiv.className = "flex flex-col items-center justify-center w-full h-full text-gray-700 p-2 md:p-4 bg-blue-50";
                            errorDiv.innerHTML = `
                              <span class="text-center text-xs md:text-sm">${isDomestic ? city.city_name : city.country_name || city.city_name}</span>
                              <span class="text-center text-xs text-gray-600 mt-1 md:mt-2">Image not available</span>
                            `;
                            parent.appendChild(errorDiv);
                          }
                        }}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center w-full h-full text-gray-700 p-2 md:p-4 bg-blue-50">
                        <span className="text-center text-xs md:text-sm">
                          {isDomestic ? city.city_name : city.country_name || city.city_name}
                        </span>
                        <span className="text-center text-xs text-gray-600 mt-1 md:mt-2">No image available</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>

                  {/* Content Section */}
                  <div className="p-5 flex-1 flex flex-col min-h-0">
                 

                    {/* Price Details */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-[#2E4D98] font-bold">Exhibtion Price</span>
                        <p className="text-2xl font-bold text-gray-900">₹{parseFloat(city.price).toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                      <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-[#2E4D98] font-bold">Emi Price</span>
                        <p className="text-2xl font-bold text-gray-900">₹{parseFloat(city.emi_price || '0').toLocaleString('en-IN')}</p>
                      </div>
                    </div>

                    {/* <p className="text-sm text-[#2E4D98] font-bold mb-3">
                      {isDomestic && city.state_name ? city.state_name : 'Exhibition Package'}
                    </p> */}

                    {/* Buttons */}
                    <div className="flex gap-2 mt-auto">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-[#2E4D98] text-[#2E4D98] hover:bg-[#2E4D98] hover:text-white"
                        onClick={() => handleViewDetails(exhibitionId!, isDomestic ? 'domestic' : 'international')}
                      >
                        View Details
                      </Button>
                      
                      <Button
                        size="sm"
                        className="flex-1 bg-[#E53C42] hover:bg-[#E53C42] hover:opacity-90 text-white"
                        onClick={() => handleBookNowClick(city)}
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (selectedCategory || selectedDomesticCategories.length > 0 || selectedInternationalCategories.length > 0) return renderExhibitionCards();
    if (activeMenu === "About Exhibition") return renderAboutContent();
    return (
      <div className="flex items-center justify-center h-full text-gray-400 py-8 md:py-16">
        <p className="text-sm md:text-base text-center px-4">
          Select an item from the menu or checkboxes to view exhibitions
        </p>
      </div>
    );
  };

  // Get total count of selected exhibitions
  const getTotalExhibitionCount = () => {
    let total = 0;
    selectedDomesticCategories.forEach(cat => {
      const data = domesticExhibitionData.find(d => d.domestic_category_name === cat);
      if (data) total += data.cities.length;
    });
    selectedInternationalCategories.forEach(cat => {
      const data = internationalExhibitionData.find(i => i.international_category_name === cat);
      if (data) total += data.cities.length;
    });
    return total;
  };

  return (
    <div className="min-h-screen bg-[#E53C42] bg-opacity-10">
      <Header />

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <aside className="lg:w-80">
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl shadow-lg p-6 border border-blue-200 sticky top-24">
              <div className="flex justify-between items-center mb-4 bg-white p-2 rounded-lg border border-black">
                <h2 className="text-2xl font-bold text-[#2E4D98]">Exhibitions</h2>
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-[#E53C42] hover:underline"
                >
                  Clear All
                </button>
              </div>

        
<div className="mt-3 mb-4">
  <div
    onClick={handleAboutClick}
    className="flex justify-between items-center p-2 rounded-lg cursor-pointer border border-black bg-white text-[#2E4D98]"
  >
                  <h2 className="text-xl font-bold text-[#2E4D98]">About Exhibition</h2>
    <span className="text-xs">
      {activeMenu === "About Exhibition" ? "▼" : "▶"}
    </span>
  </div>
</div>

   {/* Exhibition Range */}
              <div className="mb-8">
                <h3 className="font-semibold text-lg mb-4 text-[#2E4D98]">Exhibition Range</h3>
                <div className="flex justify-between text-sm text-gray-600 mb-3">
                  <span>{durationRange[0]} days</span>
                  <span>{durationRange[1]} days</span>
                </div>
                <Slider 
                  value={durationRange} 
                  onValueChange={setDurationRange}
                  max={10} 
                  step={1} 
                  className="w-full" 
                />
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


{/* Departure Months */}
<div className="mb-8">
  <h3 className="font-semibold text-lg mb-4 text-[#2E4D98]">
    Departure Months
  </h3>

  <div className="space-y-3">
    {departureMonths.length === 0 ? (
      <p className="text-sm text-gray-500">Loading departure months...</p>
    ) : (
      departureMonths
        .slice(0, showAllDepartureMonths ? departureMonths.length : 6)
        .map((month) => (
          <label key={month} className="flex items-center gap-3 cursor-pointer">
            <Checkbox
              checked={selectedDepartureMonths.includes(month)}
              onCheckedChange={(checked) =>
                handleDepartureMonthChange(month, checked as boolean)
              }
              className="data-[state=checked]:bg-[#2E4D98] data-[state=checked]:border-[#2E4D98]"
            />
            <span className="text-gray-700">{month}</span>
          
          </label>
        ))
    )}
  </div>

  {departureMonths.length > 6 && (
    <button
      onClick={() => setShowAllDepartureMonths(!showAllDepartureMonths)}
      className="mt-4 text-[#2E4D98] font-medium hover:text-[#1E3A8A]"
    >
      {showAllDepartureMonths ? "Show Less" : `Show ${departureMonths.length - 6} More`}
    </button>
  )}
</div>
                    {/* Search */}
              <div className="mb-4 mt-3">
                <form onSubmit={handleSearch} className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      type="text"
                      placeholder="Search by destination"
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

              {/* Domestic Exhibition Section with Checkboxes */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3 bg-white p-2 rounded-lg border border-black">
                  <h2 className="text-xl font-bold text-[#2E4D98]">Domestic Exhibition</h2>
                </div>
                
                <div className={`${showMoreDomestic ? "max-h-64 overflow-y-auto pr-1" : ""} space-y-3`}>
                  {loading.domestic ? (
                    <div className="flex justify-center py-4">
                      <span className="animate-spin h-5 w-5 border-2 border-gray-300 border-t-blue-600 rounded-full" />
                    </div>
                  ) : domesticCategories.length > 0 ? (
                    domesticCategories
                      .slice(0, showMoreDomestic ? domesticCategories.length : 6)
                      .sort((a, b) => a.localeCompare(b))
                      .map((category) => (
                        <div key={category} className="flex items-center gap-3 cursor-pointer">
                          <Checkbox
                            checked={selectedDomesticCategories.includes(category)}
                            onCheckedChange={(checked) => handleDomesticCheckboxChange(category, checked as boolean)}
                            className="data-[state=checked]:bg-[#2E4D98] data-[state=checked]:border-[#2E4D98]"
                          />
                          <span
                            className={`text-gray-700 hover:text-[#2E4D98] cursor-pointer ${
                              selectedDomesticCategories.includes(category) ? 'font-bold text-[#2E4D98]' : ''
                            }`}
                            onClick={() => handleDomesticCheckboxChange(category, !selectedDomesticCategories.includes(category))}
                          >
                            {category}
                          </span>
                        </div>
                      ))
                  ) : (
                    <div className="text-sm text-gray-400">No domestic exhibitions available</div>
                  )}
                </div>
                
                {domesticCategories.length > 6 && (
                  <button
                    onClick={() => setShowMoreDomestic(!showMoreDomestic)}
                    className="mt-4 text-[#2E4D98] text-sm font-semibold hover:underline"
                  >
                    {showMoreDomestic ? "Show Less" : "Show More"}
                  </button>
                )}
              </div>

              {/* International Exhibition Section with Checkboxes */}
              <div>
                <div className="flex justify-between items-center mb-3 bg-white p-2 rounded-lg border border-black">
                  <h2 className="text-xl font-bold text-[#2E4D98]">International Exhibition</h2>
                </div>
                
                <div className={`${showMoreInternational ? "max-h-64 overflow-y-auto pr-1" : ""} space-y-3`}>
                  {loading.international ? (
                    <div className="flex justify-center py-4">
                      <span className="animate-spin h-5 w-5 border-2 border-gray-300 border-t-blue-600 rounded-full" />
                    </div>
                  ) : internationalCategories.length > 0 ? (
                    internationalCategories
                      .slice(0, showMoreInternational ? internationalCategories.length : 6)
                      .sort((a, b) => a.localeCompare(b))
                      .map((category) => (
                        <div key={category} className="flex items-center gap-3 cursor-pointer">
                          <Checkbox
                            checked={selectedInternationalCategories.includes(category)}
                            onCheckedChange={(checked) => handleInternationalCheckboxChange(category, checked as boolean)}
                            className="data-[state=checked]:bg-[#2E4D98] data-[state=checked]:border-[#2E4D98]"
                          />
                          <span
                            className={`text-gray-700 hover:text-[#2E4D98] cursor-pointer ${
                              selectedInternationalCategories.includes(category) ? 'font-bold text-[#2E4D98]' : ''
                            }`}
                            onClick={() => handleInternationalCheckboxChange(category, !selectedInternationalCategories.includes(category))}
                          >
                            {category}
                          </span>
                        </div>
                      ))
                  ) : (
                    <div className="text-sm text-gray-400">No international exhibitions available</div>
                  )}
                </div>
                
                {internationalCategories.length > 6 && (
                  <button
                    onClick={() => setShowMoreInternational(!showMoreInternational)}
                    className="mt-4 text-[#2E4D98] text-sm font-semibold hover:underline"
                  >
                    {showMoreInternational ? "Show Less" : "Show More"}
                  </button>
                )}
              </div>

             
            </div>
          </aside>

<main className="flex-1">
  <div 
    className="relative rounded-2xl overflow-hidden mb-6 bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: `url('https://360biznus.com/wp-content/uploads/2025/08/360-virtual-tour-of-shiva-carpets1.jpg')`,
    }}
  >
    <div className="p-8 min-h-[180px] flex items-center">
      <div className="text-white">
        <h1 className="text-3xl font-bold mb-2" style={{ textShadow: "2px 2px 4px rgb(0, 0, 0)" }}>
          {(selectedDomesticCategories.length > 0 || selectedInternationalCategories.length > 0) 
            ? "Selected Exhibition Packages"
            : (selectedCategory 
              ? `${selectedCategory} Exhibition Packages`
              : (activeMenu === "About Exhibition" ? "About Exhibition" : "Exhibition Packages"))}
        </h1>
        <p className="text-base opacity-90 max-w-2xl" style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}>
          {(selectedDomesticCategories.length > 0 || selectedInternationalCategories.length > 0)
            ? `Explore our selected exhibition packages from ${selectedDomesticCategories.length + selectedInternationalCategories.length} categories`
            : (selectedCategory 
              ? `Explore our exclusive ${selectedCategory} exhibition packages`
              : "Explore our exclusive funtite exhibition packages")}
        </p>
        {(selectedDomesticCategories.length > 0 || selectedInternationalCategories.length > 0 || selectedCategory) && (
          <p className="text-sm opacity-80 mt-2" style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}>
            Showing {filteredCities.length} exhibition packages
            {selectedDomesticCategories.length > 0 || selectedInternationalCategories.length > 0 ? (
              <span className="ml-2 text-xs">
                (Total selected: {getTotalExhibitionCount()})
              </span>
            ) : (
              <span className="ml-2 text-xs">
                (Total available: {selectedType === 'domestic' 
                  ? selectedDomesticData?.cities.length 
                  : selectedInternationalData?.cities.length})
              </span>
            )}
          </p>
        )}
      </div>
    </div>
  </div>

            {/* Content Header */}
            {(selectedDomesticCategories.length > 0 || selectedInternationalCategories.length > 0 || selectedCategory) && (
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">
                    {selectedDomesticCategories.length > 0 || selectedInternationalCategories.length > 0 
                      ? "Selected Exhibition Packages" 
                      : (selectedType === 'domestic' ? 'Domestic' : 'International') + " Exhibition Packages"}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Showing {filteredCities.length} exhibition packages • Best prices guaranteed
                  </p>
                </div>
              </div>
            )}

            {renderContent()}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ExhibitionView;