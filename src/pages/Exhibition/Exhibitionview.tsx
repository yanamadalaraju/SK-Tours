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
  exhibition_code?: string;
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

// Interface for checkbox items with display text
interface CheckboxItem {
  value: string;           // Unique identifier (category + city)
  category: string;        // Category name
  city: string;           // City/Country name
  display: string;        // Display text: "Category (City)"
  type: 'domestic' | 'international';
  exhibitionId: number;
  cityData: City;
}

const ExhibitionView: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const passedCategory = location.state?.category || null;
  const passedCity = location.state?.city || null;
  const passedDisplay = location.state?.display || null;

  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [openQA, setOpenQA] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(passedCategory);
  const [selectedCity, setSelectedCity] = useState<string | null>(passedCity);
  const [selectedType, setSelectedType] = useState<'domestic' | 'international' | null>(null);

  const [headerTitle, setHeaderTitle] = useState<string>(
    passedDisplay || passedCategory || "Exhibition"
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
  const [selectedCheckboxItems, setSelectedCheckboxItems] = useState<string[]>([]); // Store unique values
  const [showAllDepartureMonths, setShowAllDepartureMonths] = useState(false);
  const [durationRange, setDurationRange] = useState([0, 10]);

  // ── Data state ─────────────────────────────────────────────────────────────
  const [aboutData, setAboutData] = useState<AboutData>({
    banner_image: "",
    imageText: "",
    qa: [],
  });

  const [domesticExhibitionData, setDomesticExhibitionData] = useState<DomesticExhibition[]>([]);
  const [internationalExhibitionData, setInternationalExhibitionData] = useState<InternationalExhibition[]>([]);
  
  // Derived checkbox items
  const [domesticCheckboxItems, setDomesticCheckboxItems] = useState<CheckboxItem[]>([]);
  const [internationalCheckboxItems, setInternationalCheckboxItems] = useState<CheckboxItem[]>([]);

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
  }, [selectedCheckboxItems, activeMenu, isMobile]);

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

  // Handle passed category and city from navigation
  useEffect(() => {
    const cat = location.state?.category ?? null;
    const city = location.state?.city ?? null;
    const display = location.state?.display ?? null;
    
    if (cat && city) {
      setSelectedCategory(cat);
      setSelectedCity(city);
      setHeaderTitle(display || `${cat} (${city})`);
      setActiveMenu(null);
    }
  }, [location.state]);

  // ── Fetch Domestic Data and create checkbox items ──────────────────────────
  useEffect(() => {
    const fetchDomesticData = async () => {
      setLoading((prev) => ({ ...prev, domestic: true }));
      try {
        const response = await fetch(`${BASE_URL}/api/exhibitions/domestic`);
        if (!response.ok) throw new Error(`Failed: ${response.status}`);
        const data: DomesticExhibition[] = await response.json();
        
        if (Array.isArray(data) && data.length > 0) {
          setDomesticExhibitionData(data);
          
          // Create checkbox items with category and city
          const items: CheckboxItem[] = [];
          data.forEach((exhibition) => {
            const categoryName = exhibition.domestic_category_name;
            const cities = exhibition.cities || [];
            
            cities.forEach((city) => {
              items.push({
                value: `domestic_${exhibition.id}_${city.id}`,
                category: categoryName,
                city: city.city_name,
                display: `${categoryName} (${city.city_name})`,
                type: 'domestic',
                exhibitionId: exhibition.id,
                cityData: city
              });
            });
          });
          
          // Sort by display text
          items.sort((a, b) => a.display.localeCompare(b.display));
          setDomesticCheckboxItems(items);
        } else {
          setDomesticExhibitionData([]);
          setDomesticCheckboxItems([]);
        }
      } catch (error) {
        console.error("Error fetching domestic:", error);
        setDomesticExhibitionData([]);
        setDomesticCheckboxItems([]);
      } finally {
        setLoading((prev) => ({ ...prev, domestic: false }));
      }
    };
    fetchDomesticData();
  }, []);

  // ── Fetch International Data and create checkbox items ─────────────────────
  useEffect(() => {
    const fetchInternationalData = async () => {
      setLoading((prev) => ({ ...prev, international: true }));
      try {
        const response = await fetch(`${BASE_URL}/api/exhibitions/international`);
        if (!response.ok) throw new Error(`Failed: ${response.status}`);
        const data: InternationalExhibition[] = await response.json();
        
        if (Array.isArray(data) && data.length > 0) {
          setInternationalExhibitionData(data);
          
          // Create checkbox items with category and city
          // 🔹 FIXED: For international, use city_name (not country_name) in display
          const items: CheckboxItem[] = [];
          data.forEach((exhibition) => {
            const categoryName = exhibition.international_category_name;
            const cities = exhibition.cities || [];
            
            cities.forEach((city) => {
              // 🔹 Use city_name for display, not country_name
              items.push({
                value: `international_${exhibition.id}_${city.id}`,
                category: categoryName,
                city: city.city_name, // Store city name
                display: `${categoryName} (${city.city_name})`, // Show Category (City)
                type: 'international',
                exhibitionId: exhibition.id,
                cityData: city
              });
            });
          });
          
          // Sort by display text
          items.sort((a, b) => a.display.localeCompare(b.display));
          setInternationalCheckboxItems(items);
        } else {
          setInternationalExhibitionData([]);
          setInternationalCheckboxItems([]);
        }
      } catch (error) {
        console.error("Error fetching international:", error);
        setInternationalExhibitionData([]);
        setInternationalCheckboxItems([]);
      } finally {
        setLoading((prev) => ({ ...prev, international: false }));
      }
    };
    fetchInternationalData();
  }, []);

  // Auto-select checkbox for passed category and city
  useEffect(() => {
    if (passedCategory && passedCity && domesticCheckboxItems.length > 0) {
      // Find matching domestic item
      const domesticMatch = domesticCheckboxItems.find(
        item => item.category === passedCategory && item.city === passedCity
      );
      if (domesticMatch) {
        setSelectedCheckboxItems([domesticMatch.value]);
        setSelectedType('domestic');
        return;
      }
    }
    
    if (passedCategory && passedCity && internationalCheckboxItems.length > 0) {
      // Find matching international item
      const internationalMatch = internationalCheckboxItems.find(
        item => item.category === passedCategory && item.city === passedCity
      );
      if (internationalMatch) {
        setSelectedCheckboxItems([internationalMatch.value]);
        setSelectedType('international');
        return;
      }
    }
  }, [passedCategory, passedCity, domesticCheckboxItems, internationalCheckboxItems]);

  // Filter cities based on selected checkbox items
  useEffect(() => {
    let allCities: City[] = [];
    
    if (selectedCheckboxItems.length > 0) {
      // Get selected domestic items
      selectedCheckboxItems.forEach(itemValue => {
        const domesticItem = domesticCheckboxItems.find(item => item.value === itemValue);
        if (domesticItem) {
          const exhibition = domesticExhibitionData.find(e => e.id === domesticItem.exhibitionId);
          if (exhibition) {
            const city = exhibition.cities?.find(c => 
              c.id === domesticItem.cityData.id || c.city_name === domesticItem.city
            );
            if (city) {
              allCities.push({
                ...city,
                duration_days: exhibition.duration_days,
                emi_price: exhibition.emi_price
              });
            }
          }
        }
        
        const internationalItem = internationalCheckboxItems.find(item => item.value === itemValue);
        if (internationalItem) {
          const exhibition = internationalExhibitionData.find(e => e.id === internationalItem.exhibitionId);
          if (exhibition) {
            // 🔹 FIXED: Match by city_name, not country_name
            const city = exhibition.cities?.find(c => 
              c.id === internationalItem.cityData.id || c.city_name === internationalItem.city
            );
            if (city) {
              allCities.push({
                ...city,
                duration_days: exhibition.duration_days,
                emi_price: exhibition.emi_price
              });
            }
          }
        }
      });
    }

    if (allCities.length === 0) {
      setFilteredCities([]);
      return;
    }

    let result = [...allCities];

    // Exhibition Range filter
    result = result.filter(
      (city) => (city.duration_days || 0) >= durationRange[0] && 
                 (city.duration_days || 0) <= durationRange[1]
    );

    // Price filter
    result = result.filter(
      (city) => parseFloat(city.price) >= priceRange[0] && 
                parseFloat(city.price) <= priceRange[1]
    );

    // Departure Months filter
    if (selectedDepartureMonths.length > 0) {
      result = result.filter((city) => {
        if (city.start_date) {
          const cityMonth = formatMonthYear(city.start_date);
          if (selectedDepartureMonths.includes(cityMonth)) return true;
        }

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
    selectedCheckboxItems,
    domesticCheckboxItems,
    internationalCheckboxItems,
    domesticExhibitionData, 
    internationalExhibitionData, 
    priceRange, 
    searchQuery, 
    isSearchActive,
    durationRange,
    selectedDepartureMonths
  ]);

  const handleAboutClick = () => {
    const next = activeMenu === "About Exhibition" ? null : "About Exhibition";
    setActiveMenu(next);
    setSelectedCategory(null);
    setSelectedCity(null);
    setSelectedType(null);
    setOpenQA(null);
    setHeaderTitle(next ? "About Exhibition" : "Exhibition");
    if (isMobile) setIsMobileMenuOpen(false);
    // Reset filters
    setPriceRange([0, 200000]);
    setDurationRange([0, 10]);
    setSearchQuery("");
    setIsSearchActive(false);
    setSelectedCheckboxItems([]);
    setSelectedDepartureMonths([]);
  };

  const handleCheckboxChange = (itemValue: string, checked: boolean) => {
    if (checked) {
      // Single selection - clear others and select this one
      setSelectedCheckboxItems([itemValue]);
      
      // Determine type and set
      const domesticItem = domesticCheckboxItems.find(item => item.value === itemValue);
      if (domesticItem) {
        setSelectedType('domestic');
        setSelectedCategory(domesticItem.category);
        setSelectedCity(domesticItem.city);
        setHeaderTitle(domesticItem.display);
      } else {
        const internationalItem = internationalCheckboxItems.find(item => item.value === itemValue);
        if (internationalItem) {
          setSelectedType('international');
          setSelectedCategory(internationalItem.category);
          setSelectedCity(internationalItem.city);
          setHeaderTitle(internationalItem.display);
        }
      }
    } else {
      setSelectedCheckboxItems([]);
      setSelectedType(null);
      setSelectedCategory(null);
      setSelectedCity(null);
    }
  };

  const handleQAClick = (index: number) => {
    setOpenQA(openQA === index ? null : index);
  };

  const clearAllFilters = () => {
    setPriceRange([0, 200000]);
    setDurationRange([0, 10]);
    setSearchQuery("");
    setShowSearchBtn(false);
    setIsSearchActive(false);
    setSelectedCheckboxItems([]);
    setSelectedCategory(null);
    setSelectedCity(null);
    setSelectedType(null);
    setSelectedDepartureMonths([]);
    
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
    });
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

    domesticExhibitionData.forEach((item) => {
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
    const exhibitionData = {
      id: city.id,
      code: city.exhibition_code || `EXH_${city.id}`,
      title: city.city_name || city.country_name,
      city_name: city.city_name,
      state_name: city.state_name,
      country_name: city.country_name,
      price: city.price,
      total_price_value: parsePrice(city.price),
      priceValue: parsePrice(city.price),
      emi_price: city.emi_price,
      emiPriceValue: parsePrice(city.emi_price || '0'),
      duration_days: city.duration_days,
      duration: city.duration_days ? `${city.duration_days - 1}N/${city.duration_days}D` : '',
      image: city.image,
      start_date: city.start_date
    };
    
    localStorage.setItem('selectedExhibition', JSON.stringify(exhibitionData));
    navigate('/checkout-exhibition', { state: { exhibition: exhibitionData } });
  };

  const parsePrice = (priceString: string) => {
    if (!priceString) return 0;
    const numericString = priceString.toString().replace(/[₹$,]/g, '').replace(/\s+/g, '').trim();
    return parseFloat(numericString) || 0;
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
    if (loading.exhibitions && selectedCheckboxItems.length === 0) {
      return (
        <div className="flex items-center justify-center h-full py-16">
          <div className="flex flex-col items-center gap-2">
            <span className="animate-spin h-8 w-8 border-4 border-gray-300 border-t-blue-600 rounded-full" />
            <span className="text-gray-500">Loading exhibition details...</span>
          </div>
        </div>
      );
    }
    
    if (filteredCities.length === 0 && selectedCheckboxItems.length > 0) {
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
    
    if (filteredCities.length === 0 && selectedCheckboxItems.length === 0) {
      return (
        <div className="flex items-center justify-center h-full text-gray-400 py-16">
          <p className="text-sm md:text-base text-center px-4">
            Select an exhibition from the sidebar to view details
          </p>
        </div>
      );
    }
    
    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCities.map((city) => {
            const isDomestic = city.state_name !== undefined;
            const exhibitionId = isDomestic 
              ? domesticExhibitionData.find(d => d.cities.some(c => c.id === city.id))?.id
              : internationalExhibitionData.find(i => i.cities.some(c => c.id === city.id))?.id;
            
            return (
              <div key={city.id} className="flex flex-col">
                <div className="bg-white border-2 border-gray-300 rounded-lg p-3 mb-3 shadow-sm">
                  <div className="grid grid-cols-3 gap-0 border border-gray-400 rounded overflow-hidden">
                    <div className="bg-[#2E4D98] border-r border-gray-400 p-2 flex items-center justify-center">
                      <div className="text-sm font-bold text-white text-center">
                        {isDomestic ? 'CITY' : 'COUNTRY'}
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-100 to-blue-50 border-r border-gray-400 p-2 flex items-center justify-center">
                      <div className="text-sm font-bold text-gray-900 text-center">
                        {isDomestic ? city.city_name : (city.country_name || city.city_name)}
                      </div>
                    </div>
                    <div className="bg-[#2E4D98] p-2 flex items-center justify-center">
                      <div className="text-sm font-bold text-white text-center">
                        {city.duration_days 
                          ? `${city.duration_days - 1}N/${city.duration_days}D`
                          : 'N/A'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="group bg-blue-50 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border border-blue-100 flex flex-col flex-1 min-h-0">
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

                  <div className="p-5 flex-1 flex flex-col min-h-0">
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-[#2E4D98] font-bold">Exhibition Price</span>
                        <p className="text-2xl font-bold text-gray-900">₹{parseFloat(city.price).toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-[#2E4D98] font-bold">EMI Price</span>
                        <p className="text-2xl font-bold text-gray-900">₹{parseFloat(city.emi_price || '0').toLocaleString('en-IN')}</p>
                      </div>
                    </div>

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
    if (selectedCheckboxItems.length > 0) return renderExhibitionCards();
    if (activeMenu === "About Exhibition") return renderAboutContent();
    return (
      <div className="flex items-center justify-center h-full text-gray-400 py-8 md:py-16">
        <p className="text-sm md:text-base text-center px-4">
          Select an exhibition from the sidebar to view details
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#E53C42] bg-opacity-10">
      <Header />

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <aside className="lg:w-80">
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl shadow-lg p-6 border border-blue-200 sticky top-24">
              <div className="flex justify-between items-center mb-4 bg-[#2E4D98] p-2 rounded-lg border border-black">
                <h2 className="text-2xl font-bold text-white">Exhibitions</h2>
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-[white] hover:underline"
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
                    {showAllDepartureMonths ? "Show Less" : "Show More"}
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
                  ) : domesticCheckboxItems.length > 0 ? (
                    domesticCheckboxItems
                      .slice(0, showMoreDomestic ? domesticCheckboxItems.length : 6)
                      .map((item) => (
                        <div key={item.value} className="flex items-center gap-3 cursor-pointer">
                          <Checkbox
                            checked={selectedCheckboxItems.includes(item.value)}
                            onCheckedChange={(checked) => handleCheckboxChange(item.value, checked as boolean)}
                            className="data-[state=checked]:bg-[#2E4D98] data-[state=checked]:border-[#2E4D98]"
                          />
                          <span
                            className={`text-gray-700 hover:text-[#2E4D98] cursor-pointer ${
                              selectedCheckboxItems.includes(item.value) ? 'font-bold text-[#2E4D98]' : ''
                            }`}
                            onClick={() => handleCheckboxChange(item.value, !selectedCheckboxItems.includes(item.value))}
                          >
                            {item.display}
                          </span>
                        </div>
                      ))
                  ) : (
                    <div className="text-sm text-gray-400">No domestic exhibitions available</div>
                  )}
                </div>
                
                {domesticCheckboxItems.length > 6 && (
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
                  ) : internationalCheckboxItems.length > 0 ? (
                    internationalCheckboxItems
                      .slice(0, showMoreInternational ? internationalCheckboxItems.length : 6)
                      .map((item) => (
                        <div key={item.value} className="flex items-center gap-3 cursor-pointer">
                          <Checkbox
                            checked={selectedCheckboxItems.includes(item.value)}
                            onCheckedChange={(checked) => handleCheckboxChange(item.value, checked as boolean)}
                            className="data-[state=checked]:bg-[#2E4D98] data-[state=checked]:border-[#2E4D98]"
                          />
                          <span
                            className={`text-gray-700 hover:text-[#2E4D98] cursor-pointer ${
                              selectedCheckboxItems.includes(item.value) ? 'font-bold text-[#2E4D98]' : ''
                            }`}
                            onClick={() => handleCheckboxChange(item.value, !selectedCheckboxItems.includes(item.value))}
                          >
                            {item.display}
                          </span>
                        </div>
                      ))
                  ) : (
                    <div className="text-sm text-gray-400">No international exhibitions available</div>
                  )}
                </div>
                
                {internationalCheckboxItems.length > 6 && (
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
                    {selectedCheckboxItems.length > 0 
                      ? headerTitle
                      : (activeMenu === "About Exhibition" ? "About Exhibition" : "Exhibition Packages")}
                  </h1>
                  <p className="text-base opacity-90 max-w-2xl" style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}>
                    {selectedCheckboxItems.length > 0
                      ? `Explore our exclusive ${headerTitle} exhibition package`
                      : (activeMenu === "About Exhibition" 
                        ? "Learn more about our exhibition tours and frequently asked questions"
                        : "Explore our exclusive funtite exhibition packages")}
                  </p>
                  {selectedCheckboxItems.length > 0 && (
                    <p className="text-sm opacity-80 mt-2" style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}>
                      Showing {filteredCities.length} exhibition package
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Content Header */}
            {selectedCheckboxItems.length > 0 && (
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">
                    {headerTitle}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Showing {filteredCities.length} exhibition package • Best prices guaranteed
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