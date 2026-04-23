import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "@/ApiUrls";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

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

interface MiceMain {
  questions: Array<{ question: string; answer: string }>;
}

// Interface for checkbox items
interface CheckboxItem {
  value: string;
  display: string;
  city: City;
  type: 'domestic' | 'international';
}

const Miceview: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get passed data from navigation
  const passedCategory = location.state?.category || null;
  const passedType = location.state?.type || null;
  const preSelectedCity = location.state?.preSelectedCity || null;
  const preSelectedType = location.state?.preSelectedType || null;

  const [showHome, setShowHome] = useState(true);
  const [openQA, setOpenQA] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(passedCategory);
  const [selectedType, setSelectedType] = useState<'domestic' | 'international' | null>(passedType);
  const [domesticCities, setDomesticCities] = useState<City[]>([]);
  const [internationalCities, setInternationalCities] = useState<City[]>([]);

  // Checkbox items with display text
  const [domesticCheckboxItems, setDomesticCheckboxItems] = useState<CheckboxItem[]>([]);
  const [internationalCheckboxItems, setInternationalCheckboxItems] = useState<CheckboxItem[]>([]);

  // State for MICE main data
  const [miceMain, setMiceMain] = useState<MiceMain | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [bannerImage, setBannerImage] = useState('');
  
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
  const [selectedCheckboxItems, setSelectedCheckboxItems] = useState<string[]>([]);
  const [showAllDepartureMonths, setShowAllDepartureMonths] = useState(false);
  const [durationRange, setDurationRange] = useState([0, 10]);

  const [loading, setLoading] = useState({
    domestic: false,
    international: false,
    exhibitions: false,
  });
// 🔹 For filtering only - extract number for price range comparison
const extractNumericPrice = (priceString: string): number => {
  if (!priceString) return 0;
  
  const str = priceString.toString().trim();
  
  const withoutCommas = str.replace(/,/g, '');
  
  const match = withoutCommas.match(/[\d.]+/);
  if (match) {
    const num = parseFloat(match[0]);
    return isNaN(num) ? 0 : num;
  }
  
  return 0;
};

const formatPriceForDisplay = (priceString: string): string => {
  if (!priceString) return '';
  
  let str = priceString.toString().trim();
  
  str = str.replace(/\.00$/, '').replace(/\.0$/, '');
  
  return str;
};
  const getDomesticDisplayText = (city: City): string => {
    if (city.state_name) {
      return `${city.city_name} - ${city.state_name}`;
    }
    return city.city_name;
  };

  const getInternationalDisplayText = (city: City): string => {
    if (city.country_name) {
      return `${city.city_name} - ${city.country_name}`;
    }
    return city.city_name;
  };

  // Fetch MICE main data
  useEffect(() => {
    const fetchMiceMain = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/mice/main`);
        const result = await res.json();
        console.log("MICE Main data:", result);

        if (result && result.banner_image) {
          const bannerImageUrl = `${BASE_URL}/uploads/mice/main/${result.banner_image}`;
          setBannerImage(bannerImageUrl);
        }

        setMiceMain(result);
      } catch (error) {
        console.error("Error fetching MICE main:", error);
      }
    };
    fetchMiceMain();
  }, []);

  // Check mobile screen
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch Domestic Cities
  useEffect(() => {
    const fetchDomesticData = async () => {
      setLoading((prev) => ({ ...prev, domestic: true }));
      try {
        const response = await fetch(`${BASE_URL}/api/mice/domestic`);
        if (!response.ok) throw new Error(`Failed: ${response.status}`);
        const data: City[] = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          setDomesticCities(data);
          
          const items: CheckboxItem[] = data.map(city => ({
            value: `domestic_${city.id}`,
            display: getDomesticDisplayText(city),
            city: city,
            type: 'domestic'
          }));
          
          items.sort((a, b) => a.display.localeCompare(b.display));
          setDomesticCheckboxItems(items);
        } else {
          setDomesticCities([]);
          setDomesticCheckboxItems([]);
        }
      } catch (error) {
        console.error("Error fetching domestic:", error);
      } finally {
        setLoading((prev) => ({ ...prev, domestic: false }));
      }
    };
    fetchDomesticData();
  }, []);

  // Fetch International Cities
  useEffect(() => {
    const fetchInternationalData = async () => {
      setLoading((prev) => ({ ...prev, international: true }));
      try {
        const response = await fetch(`${BASE_URL}/api/mice/international`);
        if (!response.ok) throw new Error(`Failed: ${response.status}`);
        const data: City[] = await response.json();

        console.log("International data received:", data);

        if (Array.isArray(data) && data.length > 0) {
          setInternationalCities(data);
          
          const items: CheckboxItem[] = data.map(city => ({
            value: `international_${city.id}`,
            display: getInternationalDisplayText(city),
            city: city,
            type: 'international'
          }));
          
          items.sort((a, b) => a.display.localeCompare(b.display));
          setInternationalCheckboxItems(items);
        } else {
          setInternationalCities([]);
          setInternationalCheckboxItems([]);
        }
      } catch (error) {
        console.error("Error fetching international:", error);
      } finally {
        setLoading((prev) => ({ ...prev, international: false }));
      }
    };
    fetchInternationalData();
  }, []);

  // Handle pre-selected city from navigation
  useEffect(() => {
    if (preSelectedCity && preSelectedType && domesticCheckboxItems.length > 0 && internationalCheckboxItems.length > 0) {
      if (preSelectedType === 'domestic') {
        const matchingItem = domesticCheckboxItems.find(
          item => item.city.city_name === preSelectedCity
        );
        if (matchingItem) {
          setShowHome(false);
          setSelectedCheckboxItems([matchingItem.value]);
          setSelectedType('domestic');
        }
      } else if (preSelectedType === 'international') {
        const matchingItem = internationalCheckboxItems.find(
          item => item.city.city_name === preSelectedCity
        );
        if (matchingItem) {
          setShowHome(false);
          setSelectedCheckboxItems([matchingItem.value]);
          setSelectedType('international');
        }
      }
    }
  }, [preSelectedCity, preSelectedType, domesticCheckboxItems, internationalCheckboxItems]);

  // Extract unique departure months from cities
  useEffect(() => {
    const monthsSet = new Set<string>();
    domesticCities.forEach(city => {
      if (city.start_date) monthsSet.add(formatMonthYear(city.start_date));
    });
    internationalCities.forEach(city => {
      if (city.start_date) monthsSet.add(formatMonthYear(city.start_date));
    });
    setDepartureMonths(Array.from(monthsSet).sort());
  }, [domesticCities, internationalCities]);

  // 🔹 FIXED: Filter cities based on selected checkbox items
  useEffect(() => {
    console.log("Filter effect running with selectedCheckboxItems:", selectedCheckboxItems);
    console.log("internationalCheckboxItems length:", internationalCheckboxItems.length);
    
    let allCities: City[] = [];

    if (selectedCheckboxItems.length > 0) {
      selectedCheckboxItems.forEach(itemValue => {
        // Check domestic items
        const domesticItem = domesticCheckboxItems.find(item => item.value === itemValue);
        if (domesticItem) {
          allCities.push(domesticItem.city);
        }
        
        // Check international items
        const internationalItem = internationalCheckboxItems.find(item => item.value === itemValue);
        if (internationalItem) {
          console.log("Found international item:", internationalItem);
          allCities.push(internationalItem.city);
        }
      });
    }

    console.log("allCities before filtering:", allCities.length);

    if (allCities.length === 0) {
      setFilteredCities([]);
      return;
    }

    let result = [...allCities];

    // Duration Range filter
    result = result.filter(city => {
      const duration = city.duration_days || 0;
      return duration >= durationRange[0] && duration <= durationRange[1];
    });

    // 🔹 FIXED: Price filter with robust numeric extraction
    result = result.filter(city => {
      const priceNum = extractNumericPrice(city.price);
      // If price is 0 or can't be parsed, include it (don't filter out)
      if (priceNum === 0) return true;
      return priceNum >= priceRange[0] && priceNum <= priceRange[1];
    });

    // Departure Months filter
    if (selectedDepartureMonths.length > 0) {
      result = result.filter((city) => {
        if (city.start_date && selectedDepartureMonths.includes(formatMonthYear(city.start_date))) {
          return true;
        }
        return false;
      });
    }

    // Search filter
    if (isSearchActive && searchQuery.trim() !== "") {
      const query = searchQuery.trim().toLowerCase();
      result = result.filter(city => {
        const cityName = (city.country_name || city.city_name).toLowerCase();
        const stateName = (city.state_name || '').toLowerCase();
        return cityName.includes(query) || stateName.includes(query);
      });
    }

    console.log("Filtered cities result:", result.length);
    setFilteredCities(result);
  }, [
    selectedCheckboxItems,
    domesticCheckboxItems,
    internationalCheckboxItems,
    priceRange,
    searchQuery,
    isSearchActive,
    durationRange,
    selectedDepartureMonths,
  ]);

  const handleCheckboxChange = (itemValue: string, checked: boolean) => {
    console.log("Checkbox changed:", itemValue, checked);
    setShowHome(false);
    if (checked) {
      setSelectedCheckboxItems([itemValue]);
      
      const domesticItem = domesticCheckboxItems.find(item => item.value === itemValue);
      if (domesticItem) {
        setSelectedType('domestic');
        console.log("Selected domestic:", domesticItem.display);
      } else {
        const internationalItem = internationalCheckboxItems.find(item => item.value === itemValue);
        if (internationalItem) {
          setSelectedType('international');
          console.log("Selected international:", internationalItem.display);
        }
      }
    } else {
      setSelectedCheckboxItems([]);
      setSelectedType(null);
      setShowHome(true);
    }
  };

  const clearAllFilters = () => {
    setPriceRange([0, 200000]);
    setSearchQuery("");
    setShowSearchBtn(false);
    setIsSearchActive(false);
    setSelectedCheckboxItems([]);
    setSelectedCategory(null);
    setSelectedType(null);
    setActiveMenu(null);
    setShowHome(true);
    setDurationRange([0, 10]);
    setSelectedDepartureMonths([]);
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

  const formatMonthYear = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleString("en-IN", { month: "long", year: "numeric" });
  };

  const getFullImageUrl = (imagePath: string, type: 'domestic' | 'international') => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http")) return imagePath;
    const cleanPath = imagePath.replace(/^\/+/, '');
    return `${BASE_URL}/uploads/mice/${type}/${cleanPath}`;
  };

  const handleViewDetails = (cityId: number, type: 'domestic' | 'international') => {
    navigate(type === 'domestic'
      ? `/micedomesticdetail/${cityId}`
      : `/miceinternationaldetail/${cityId}`
    );
  };

  const handleBookNowClick = (city: City) => {
    const miceData = {
      id: city.id,
      code: `MICE_${city.id}`,
      title: city.city_name || city.country_name,
      city_name: city.city_name,
      state_name: city.state_name,
      country_name: city.country_name,
      price: city.price,
      total_price_value: extractNumericPrice(city.price),
      priceValue: extractNumericPrice(city.price),
      emi_price: city.emi_price,
      emiPriceValue: extractNumericPrice(city.emi_price || '0'),
      duration_days: city.duration_days,
      duration: city.duration_days ? `${city.duration_days - 1}N/${city.duration_days}D` : '',
      image: city.image,
      start_date: city.start_date
    };
    
    localStorage.setItem('selectedMice', JSON.stringify(miceData));
    navigate('/checkout-mice', { state: { mice: miceData } });
  };

  const handleDepartureMonthChange = (month: string, checked: boolean) => {
    setSelectedDepartureMonths(prev =>
      checked ? [...prev, month] : prev.filter(m => m !== month)
    );
  };

  const handleHomeClick = () => {
    setShowHome(true);
    setSelectedCategory(null);
    setSelectedCheckboxItems([]);
    setSelectedType(null);
    setActiveMenu(null);
    setPriceRange([0, 200000]);
    setSearchQuery("");
    setIsSearchActive(false);
    setDurationRange([0, 10]);
    setSelectedDepartureMonths([]);
  };

  const renderMiceHomeSection = () => {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row w-full h-auto md:h-[480px] overflow-hidden rounded-2xl shadow-md">
          <div
            className="relative w-full md:w-[60%] h-[250px] md:h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${bannerImage || 'https://360biznus.com/wp-content/uploads/2025/08/360-virtual-tour-of-shiva-carpets1.jpg'}')`,
            }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h1
                className="text-[70px] sm:text-[100px] md:text-[140px] lg:text-[160px] font-black text-[#00205b] leading-none"
                style={{ textShadow: "0px 0px 20px rgba(255,255,255,0.19)" }}
              >
                MICE
              </h1>
            </div>
          </div>

          <div className="w-full md:w-[52%] h-full bg-[#00205b] flex flex-col items-start justify-center gap-3 md:gap-5 px-4 md:px-6 py-4 md:py-0">
            {["Meeting", "Incentives", "Conference", "Events"].map((menu) => {
              const subItems = {
                Meeting: [
                  "Meetings play a crucial role in facilitating effective communication among team members. They help in sharing ideas, discussing challenges, and making informed decisions while ensuring that everyone stays aligned with the organization's goals and objectives."
                ],
                Incentives: [
                  "Incentives are essential for motivating employees to perform better and achieve their targets. They enhance job satisfaction, encourage healthy competition, and contribute to increased productivity and long-term employee retention."
                ],
                Conference: [
                  "Conferences provide valuable opportunities for learning, networking, and professional growth. They bring together experts and participants to share industry knowledge, discuss trends, and explore new innovations that drive business success."
                ],
                Events: [
                  "Events are designed to bring people together for a specific purpose, fostering engagement and meaningful connections. They create memorable experiences, strengthen relationships, and help in building brand awareness and visibility."
                ]
              };

              return (
                <div key={menu} className="relative w-full md:w-75">
                  <button
                    onClick={() => setActiveMenu(activeMenu === menu ? null : menu)}
                    className="bg-white text-[#00205b] px-5 py-4 font-semibold w-full text-left flex justify-between items-center"
                  >
                    {menu}
                    <span>{activeMenu === menu ? "▲" : "▼"}</span>
                  </button>

                  {activeMenu === menu && (
                    <div className="absolute left-0 top-full mt-1 flex flex-col bg-white shadow-lg w-full md:w-[430px] z-50">
                      {subItems[menu].map((sub) => (
                        <a
                          key={sub}
                          href="#"
                          className="px-2 py-3 text-sm leading-relaxed text-gray-700 text-justify hover:bg-blue-50 border-b"
                        >
                          {sub}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div>
          {miceMain?.questions ? (
            <div className="border rounded-lg overflow-hidden">
              {miceMain.questions.map((item: any, index: number) => (
                <div key={index} className="border-b last:border-b-0">
                  <div
                    onClick={() => setOpenQA(openQA === index ? null : index)}
                    className="flex justify-between items-center px-4 py-3 cursor-pointer hover:bg-gray-50"
                    style={{ backgroundColor: "#2E3A8A", color: "#fff" }}
                  >
                    <span className="text-sm md:text-base">{item.question}</span>
                    <span className="text-xs md:text-sm">{openQA === index ? "▼" : "▶"}</span>
                  </div>
                  {openQA === index && (
                    <div
                      className="bg-[#E8F0FF] px-4 py-4 text-sm md:text-base"
                      style={{
                        minHeight: "100px",
                        maxHeight: "250px",
                        overflowY: "auto",
                        overflowX: "hidden",
                        textAlign: "justify",
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                        borderRadius: "0 0 8px 8px",
                        borderLeft: "1px solid black",
                        borderRight: "1px solid black",
                        borderBottom: "1px solid black",
                      }}
                    >
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-10">No questions available</div>
          )}
        </div>
      </div>
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
          <p className="text-gray-500 mt-2">Try adjusting your filters or search criteria</p>
          <Button onClick={clearAllFilters} className="mt-4 bg-[#2E4D98] hover:bg-[#2E4D98] hover:opacity-90 text-white">
            Clear All Filters
          </Button>
        </div>
      );
    }

    if (filteredCities.length === 0 && selectedCheckboxItems.length === 0) {
      return null;
    }

    console.log("Rendering cards for filteredCities:", filteredCities);

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCities.map((city) => {
          const isDomestic = city.state_name !== undefined;

          return (
            <div key={city.id} className="flex flex-col">
              <div className="bg-white border-2 border-gray-300 rounded-lg p-3 mb-3 shadow-sm">
                <div className="grid grid-cols-2 gap-0 border border-gray-400 rounded overflow-hidden">
                  <div className="bg-[#2E4D98] border-r border-gray-400 p-2 flex items-center justify-center">
                    <div className="text-sm font-bold text-white text-center">{isDomestic ? 'CITY' : 'COUNTRY'}</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-100 to-blue-50 border-r border-gray-400 p-2 flex items-center justify-center">
                    <div className="text-sm font-bold text-gray-900 text-center">
                      {isDomestic ? city.city_name : (city.country_name || city.city_name)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="group bg-blue-50 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border border-blue-100 flex flex-col flex-1 min-h-0">
                <div className="relative h-56 overflow-hidden flex-shrink-0">
                  {city.image ? (
                    <img
                      src={getFullImageUrl(city.image, isDomestic ? 'domestic' : 'international')}
                      alt={isDomestic ? city.city_name : city.country_name || city.city_name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          const errorDiv = document.createElement('div');
                          errorDiv.className = "flex flex-col items-center justify-center w-full h-full text-gray-700 p-4 bg-blue-50";
                          errorDiv.innerHTML = `<span class="text-center text-sm">${isDomestic ? city.city_name : city.country_name || city.city_name}</span><span class="text-center text-xs text-gray-600 mt-2">Image not available</span>`;
                          parent.appendChild(errorDiv);
                        }
                      }}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center w-full h-full text-gray-700 p-4 bg-blue-50">
                      <span className="text-center text-sm">{isDomestic ? city.city_name : city.country_name || city.city_name}</span>
                      <span className="text-center text-xs text-gray-600 mt-2">No image available</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>

                <div className="p-5 flex-1 flex flex-col min-h-0">
                  <div className="mb-3 flex items-center">
                    <span className="w-[150px] text-sm text-[#2E4D98] font-bold">
                      Duration Days
                    </span>
                    <p className="text-2lg font-bold text-gray-900 ml-auto text-right">
                      {city.duration_days
                        ? `${city.duration_days - 1}N/${city.duration_days}D`
                        : 'N/A'}
                    </p>
                  </div>

                  <div className="mb-3 flex items-center">
                    <span className="w-[150px] text-sm text-[#2E4D98] font-bold">
                      Per Person Price
                    </span>
                    <p className="text-2lg font-bold text-gray-900 ml-auto text-right">
                      {formatPriceForDisplay(city.price)}
                    </p>
                  </div>

                  <div className="mb-3 flex items-center">
                    <span className="w-[150px] text-sm text-[#2E4D98] font-bold">
                      EMI Price
                    </span>
                    <p className="text-2lg font-bold text-gray-900 ml-auto text-right">
                      {formatPriceForDisplay(city.emi_price || '0')}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-[#2E4D98] text-[#2E4D98] hover:bg-[#2E4D98] hover:text-white"
                      onClick={() => handleViewDetails(city.id, isDomestic ? 'domestic' : 'international')}
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
    );
  };

  const renderContent = () => {
    if (showHome) {
      return renderMiceHomeSection();
    }

    if (selectedCheckboxItems.length > 0) {
      return renderExhibitionCards();
    }

    return renderMiceHomeSection();
  };

  const getHeaderTitle = () => {
    if (selectedCheckboxItems.length === 0) return "Selected Mice Packages";
    
    const selectedItem = domesticCheckboxItems.find(item => item.value === selectedCheckboxItems[0]) ||
                         internationalCheckboxItems.find(item => item.value === selectedCheckboxItems[0]);
    
    return selectedItem ? selectedItem.display : "Selected Mice Packages";
  };

  return (
    <div className="min-h-screen bg-[#E53C42] bg-opacity-10">
      <Header />

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <aside className="lg:w-80">
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl shadow-lg p-6 border border-blue-200 sticky top-24">
              <div className="flex justify-between items-center mb-6 bg-[#2E4D98] p-2 rounded-lg border border-black">
                <h2 className="text-2xl font-bold text-white">MICE</h2>
                <button onClick={clearAllFilters} className="text-sm text-white hover:underline">
                  Clear All
                </button>
              </div>

              {/* Home Button */}
              <div
                onClick={handleHomeClick}
                className="flex justify-between items-center mb-4 bg-white p-3 rounded-lg border border-black cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <h2 className="text-xl font-bold text-[#2E4D98]">About MICE</h2>
                <span>{showHome ? "▼" : "▶"}</span>
              </div>

              {/* Duration Range */}
              <div className="mb-8">
                <h3 className="font-semibold text-lg mb-4 text-[#2E4D98]">Duration Range</h3>
                <div className="flex justify-between text-sm text-gray-600 mb-3">
                  <span>{durationRange[0]} days</span>
                  <span>{durationRange[1]} days</span>
                </div>
                <Slider value={durationRange} onValueChange={setDurationRange} max={10} step={1} className="w-full" />
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-4 text-[#2E4D98]">Price Range</h3>
                <div className="flex justify-between text-sm text-gray-600 mb-3">
                  <span>₹{priceRange[0].toLocaleString()}</span>
                  <span>₹{priceRange[1].toLocaleString()}</span>
                </div>
                <Slider value={priceRange} onValueChange={setPriceRange} min={0} max={200000} step={1000} className="w-full" />
              </div>

              {/* Search */}
              <div className="mb-4">
                <form onSubmit={handleSearch} className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      type="text"
                      placeholder="Search by destination"
                      value={searchQuery}
                      onChange={(e) => { setSearchQuery(e.target.value); setShowSearchBtn(e.target.value.trim() !== ""); }}
                      onFocus={() => setShowSearchBtn(true)}
                      className="border-[#2E4D98] focus:border-[#2E4D98] focus:ring-[#2E4D98] pr-8 placeholder:text-sm"
                    />
                    {searchQuery && (
                      <button type="button" onClick={() => { clearSearch(); setShowSearchBtn(false); }}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        ✕
                      </button>
                    )}
                  </div>
                  {showSearchBtn && (
                    <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-6">Search</Button>
                  )}
                </form>
              </div>

              {/* Domestic MICE Checkboxes */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3 bg-white p-2 rounded-lg border border-black">
                  <h2 className="text-xl font-bold text-[#2E4D98]">Domestic MICE</h2>
                </div>
                <div className="space-y-3">
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
                    <div className="text-sm text-gray-400">No domestic MICE available</div>
                  )}
                </div>
                {domesticCheckboxItems.length > 6 && (
                  <button onClick={() => setShowMoreDomestic(!showMoreDomestic)} className="mt-4 text-[#2E4D98] text-sm font-semibold hover:underline">
                    {showMoreDomestic ? "Show Less" : `Show ${domesticCheckboxItems.length - 6} More`}
                  </button>
                )}
              </div>

              {/* International MICE Checkboxes */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-3 bg-white p-2 rounded-lg border border-black">
                  <h2 className="text-xl font-bold text-[#2E4D98]">International MICE</h2>
                </div>
                <div className="space-y-3">
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
                    <div className="text-sm text-gray-400">No international MICE available</div>
                  )}
                </div>
                {internationalCheckboxItems.length > 6 && (
                  <button onClick={() => setShowMoreInternational(!showMoreInternational)} className="mt-4 text-[#2E4D98] text-sm font-semibold hover:underline">
                    {showMoreInternational ? "Show Less" : `Show ${internationalCheckboxItems.length - 6} More`}
                  </button>
                )}
              </div>

              {/* Menu Items Section */}
              <div className="mt-0 pt-0 border-t border-gray-300">
                <div className="mb-4">
                  <div
                    onClick={() => navigate("/enquiryformmic")}
                    className="flex justify-between items-center p-2 rounded-lg cursor-pointer border border-black transition shadow-sm bg-white text-[#2E4D98] hover:bg-gray-50"
                  >
                    <h3 className="text-lg font-semibold">Enquiry Form</h3>
                  </div>
                </div>
                <div className="mb-4">
                  <div
                    onClick={() => navigate("/bankgallery")}
                    className="flex justify-between items-center p-2 rounded-lg cursor-pointer border border-black transition shadow-sm bg-white text-[#2E4D98] hover:bg-gray-50"
                  >
                    <h3 className="text-lg font-semibold">Our Clients</h3>
                  </div>
                </div>
                <div className="mb-4">
                  <div
                    onClick={() => navigate("/venuephotos")}
                    className="flex justify-between items-center p-2 rounded-lg cursor-pointer border border-black transition shadow-sm bg-white text-[#2E4D98] hover:bg-gray-50"
                  >
                    <h3 className="text-lg font-semibold">Venue Photos</h3>
                  </div>
                </div>
                <div className="mb-4">
                  <div
                    onClick={() => navigate("/micgallery")}
                    className="flex justify-between items-center p-2 rounded-lg cursor-pointer border border-black transition shadow-sm bg-white text-[#2E4D98] hover:bg-gray-50"
                  >
                    <h3 className="text-lg font-semibold">MICE Gallery</h3>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Header banner */}
            {selectedCheckboxItems.length > 0 && !showHome && (
              <>
                <div
                  className="relative rounded-2xl overflow-hidden mb-6 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url('https://360biznus.com/wp-content/uploads/2025/08/360-virtual-tour-of-shiva-carpets1.jpg')` }}
                >
                  <div className="p-8 min-h-[180px] flex items-center">
                    <div className="text-white">
                      <h1 className="text-3xl font-bold mb-2" style={{ textShadow: "2px 2px 4px rgb(0,0,0)" }}>
                        {getHeaderTitle()}
                      </h1>
                      <p className="text-base opacity-90 max-w-2xl" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}>
                        Explore our exclusive MICE package
                      </p>
                      <p className="text-sm opacity-80 mt-2" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}>
                        Showing {filteredCities.length} exhibition package
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800">
                      {getHeaderTitle()}
                    </h2>
                    <p className="text-gray-600 mt-1">Showing {filteredCities.length} exhibition package • Best prices guaranteed</p>
                  </div>
                </div>
              </>
            )}

            {renderContent()}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Miceview;