import React, { useState, useEffect, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BASE_URL } from '@/ApiUrls';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

// Define interfaces for type safety
interface QAPair {
  q: string;
  a: string;
}

interface AboutData {
  imageText: string;
  qa: QAPair[];
  banner_image: string;
}

interface CategoryItem {
  category: string;
  city: string;
  display: string;
  categoryName: string;
  cityName: string;
  exhibitionId?: number;
  price?: string;
  emi_price?: string;
  start_date?: string;
  end_date?: string;
  duration_days?: number;
}

interface CategoryDataState {
  Domestic: CategoryItem[][];
  International: CategoryItem[][];
}

const Exhibition = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [openQA, setOpenQA] = useState<number | null>(null);
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const [menuData, setMenuData] = useState<{
    "About Exhibition": AboutData;
  }>({
    "About Exhibition": {
      imageText: "",
      qa: [],
      banner_image: ""
    }
  });
  
  const [categoryData, setCategoryData] = useState<CategoryDataState>({
    Domestic: [],
    International: []
  });
  
  const [loading, setLoading] = useState({
    about: false,
    domestic: false,
    international: false
  });

  // Filter states
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [durationRange, setDurationRange] = useState([0, 10]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchBtn, setShowSearchBtn] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  
  // Auto-open About Exhibition on page load
  useEffect(() => {
    if (!activeMenu && !activeCategory) {
      setActiveMenu("About Exhibition");
    }
  }, []);
  
  const handleCellClick = (item: CategoryItem) => {
    if (!item || !item.display || item.display === "") return;
    
    // Pass both category and city to the next page
    navigate("/exhibitionview", { 
      state: { 
        category: item.category,
        city: item.city,
        display: item.display,
        exhibitionId: item.exhibitionId,
        price: item.price,
        emi_price: item.emi_price,
        start_date: item.start_date,
        end_date: item.end_date,
        duration_days: item.duration_days
      } 
    });
  };
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  useEffect(() => {
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  }, [activeMenu, activeCategory, isMobile]);
  
  useEffect(() => {
    const fetchAboutData = async () => {
      setLoading(prev => ({ ...prev, about: true }));
      try {
        const response = await fetch(`${BASE_URL}/api/exhibitions/about`);
        if (!response.ok) throw new Error('Failed to fetch about data');
        const data = await response.json();
        
        if (data) {
          const imageUrl = data.banner_image
            ? `${BASE_URL}/uploads/exhibition/${data.banner_image}`
            : data.image_url || data.image_path || "";
          
          setMenuData(prev => ({
            ...prev,
            "About Exhibition": {
              imageText: imageUrl,
              banner_image: data.banner_image || "",
              qa: data.questions ? data.questions.map((q: any) => ({
                q: q.question,
                a: q.answer
              })) : []
            }
          }));
        }
      } catch (error) {
        console.error('Error fetching about exhibition:', error);
        setMenuData(prev => ({
          ...prev,
          "About Exhibition": {
            imageText: "",
            banner_image: "",
            qa: [{ q: "Error", a: "Failed to load about exhibition data" }]
          }
        }));
      } finally {
        setLoading(prev => ({ ...prev, about: false }));
      }
    };
    
    fetchAboutData();
  }, []);
  
  /* ===== FETCH DOMESTIC DATA ===== */
  useEffect(() => {
    const fetchDomesticData = async () => {
      setLoading(prev => ({ ...prev, domestic: true }));
      try {
        const response = await fetch(`${BASE_URL}/api/exhibitions/domestic`);
        if (!response.ok) throw new Error('Failed to fetch domestic data');
        const data = await response.json();
        
        // Handle the new grouped response format
        if (data && typeof data === 'object' && !Array.isArray(data)) {
          // Create an array of objects with category and city info
          const categoryCityPairs: CategoryItem[] = [];
          
          // Iterate through each category group
          Object.keys(data).forEach(categoryName => {
            const exhibitions = data[categoryName];
            
            exhibitions.forEach((exhibition: any) => {
              const cities = exhibition.cities || [];
              
              if (cities.length > 0) {
                cities.forEach((city: any) => {
                  categoryCityPairs.push({
                    category: categoryName,
                    city: city.city_name,
                    display: categoryName,
                    categoryName: categoryName,
                    cityName: city.city_name,
                    exhibitionId: exhibition.id,
                    price: city.price || exhibition.price,
                    emi_price: exhibition.emi_price,
                    start_date: exhibition.start_date,
                    end_date: exhibition.end_date,
                    duration_days: exhibition.duration_days
                  });
                });
              } else {
                // If no cities, just show category
                categoryCityPairs.push({
                  category: categoryName,
                  city: '',
                  display: categoryName,
                  categoryName: categoryName,
                  cityName: '',
                  exhibitionId: exhibition.id,
                  price: exhibition.price,
                  emi_price: exhibition.emi_price,
                  start_date: exhibition.start_date,
                  end_date: exhibition.end_date,
                  duration_days: exhibition.duration_days
                });
              }
            });
          });
          
          // Remove duplicates based on display string
          const uniquePairs = categoryCityPairs.filter((pair, index, self) => 
            index === self.findIndex(p => p.display === pair.display)
          );
          
          // Format into rows of 5 for grid display
          const formattedData: CategoryItem[][] = [];
          for (let i = 0; i < uniquePairs.length; i += 5) {
            const row = uniquePairs.slice(i, i + 5);
            while (row.length < 5) {
              row.push({ 
                display: "", 
                category: "", 
                city: "",
                categoryName: "",
                cityName: ""
              });
            }
            formattedData.push(row);
          }
          
          setCategoryData(prev => ({
            ...prev,
            Domestic: formattedData
          }));
        } else if (Array.isArray(data)) {
          // Fallback for old array format
          const categoryCityPairs: CategoryItem[] = [];
          
          data.forEach((exhibition: any) => {
            const categoryName = exhibition.domestic_category_name;
            const cities = exhibition.cities || [];
            
            if (cities.length > 0) {
              cities.forEach((city: any) => {
                categoryCityPairs.push({
                  category: categoryName,
                  city: city.city_name,
                display: categoryName,
                  categoryName: categoryName,
                  cityName: city.city_name,
                  exhibitionId: exhibition.id,
                  price: city.price || exhibition.price,
                  emi_price: exhibition.emi_price,
                  start_date: exhibition.start_date,
                  end_date: exhibition.end_date,
                  duration_days: exhibition.duration_days
                });
              });
            } else {
              categoryCityPairs.push({
                category: categoryName,
                city: '',
                display: categoryName,
                categoryName: categoryName,
                cityName: '',
                exhibitionId: exhibition.id,
                price: exhibition.price,
                emi_price: exhibition.emi_price,
                start_date: exhibition.start_date,
                end_date: exhibition.end_date,
                duration_days: exhibition.duration_days
              });
            }
          });
          
          const uniquePairs = categoryCityPairs.filter((pair, index, self) => 
            index === self.findIndex(p => p.display === pair.display)
          );
          
          const formattedData: CategoryItem[][] = [];
          for (let i = 0; i < uniquePairs.length; i += 5) {
            const row = uniquePairs.slice(i, i + 5);
            while (row.length < 5) {
              row.push({ 
                display: "", 
                category: "", 
                city: "",
                categoryName: "",
                cityName: ""
              });
            }
            formattedData.push(row);
          }
          
          setCategoryData(prev => ({
            ...prev,
            Domestic: formattedData
          }));
        }
      } catch (error) {
        console.error('Error fetching domestic exhibition:', error);
        setCategoryData(prev => ({
          ...prev,
          Domestic: [[{ 
            display: "Error Loading Data", 
            category: "Error", 
            city: "",
            categoryName: "Error",
            cityName: ""
          }]]
        }));
      } finally {
        setLoading(prev => ({ ...prev, domestic: false }));
      }
    };
    
    fetchDomesticData();
  }, []);
  
  /* ===== FETCH INTERNATIONAL DATA ===== */
  useEffect(() => {
    const fetchInternationalData = async () => {
      setLoading(prev => ({ ...prev, international: true }));
      try {
        const response = await fetch(`${BASE_URL}/api/exhibitions/international`);
        if (!response.ok) throw new Error('Failed to fetch international data');
        const data = await response.json();
        
        // Handle the new grouped response format
        if (data && typeof data === 'object' && !Array.isArray(data)) {
          const categoryCityPairs: CategoryItem[] = [];
          
          Object.keys(data).forEach(categoryName => {
            const exhibitions = data[categoryName];
            
            exhibitions.forEach((exhibition: any) => {
              const cities = exhibition.cities || [];
              
              if (cities.length > 0) {
                cities.forEach((city: any) => {
                  categoryCityPairs.push({
                    category: categoryName,
                    city: city.city_name,
                    display: categoryName,  
                    categoryName: categoryName,
                    cityName: city.city_name,
                    exhibitionId: exhibition.id,
                    price: city.price || exhibition.price,
                    emi_price: exhibition.emi_price,
                    start_date: exhibition.start_date,
                    end_date: exhibition.end_date,
                    duration_days: exhibition.duration_days
                  });
                });
              } else {
                categoryCityPairs.push({
                  category: categoryName,
                  city: '',
                  display: categoryName,
                  categoryName: categoryName,
                  cityName: '',
                  exhibitionId: exhibition.id,
                  price: exhibition.price,
                  emi_price: exhibition.emi_price,
                  start_date: exhibition.start_date,
                  end_date: exhibition.end_date,
                  duration_days: exhibition.duration_days
                });
              }
            });
          });
          
          const uniquePairs = categoryCityPairs.filter((pair, index, self) => 
            index === self.findIndex(p => p.display === pair.display)
          );
          
          const formattedData: CategoryItem[][] = [];
          for (let i = 0; i < uniquePairs.length; i += 5) {
            const row = uniquePairs.slice(i, i + 5);
            while (row.length < 5) {
              row.push({ 
                display: "", 
                category: "", 
                city: "",
                categoryName: "",
                cityName: ""
              });
            }
            formattedData.push(row);
          }
          
          setCategoryData(prev => ({
            ...prev,
            International: formattedData
          }));
        } else if (Array.isArray(data)) {
          // Fallback for old array format
          const categoryCityPairs: CategoryItem[] = [];
          
          data.forEach((exhibition: any) => {
            const categoryName = exhibition.international_category_name;
            const cities = exhibition.cities || [];
            
            if (cities.length > 0) {
              cities.forEach((city: any) => {
                categoryCityPairs.push({
                  category: categoryName,
                  city: city.city_name,
                   display: categoryName,
                  categoryName: categoryName,
                  cityName: city.city_name,
                  exhibitionId: exhibition.id,
                  price: city.price || exhibition.price,
                  emi_price: exhibition.emi_price,
                  start_date: exhibition.start_date,
                  end_date: exhibition.end_date,
                  duration_days: exhibition.duration_days
                });
              });
            } else {
              categoryCityPairs.push({
                category: categoryName,
                city: '',
                display: categoryName,
                categoryName: categoryName,
                cityName: '',
                exhibitionId: exhibition.id,
                price: exhibition.price,
                emi_price: exhibition.emi_price,
                start_date: exhibition.start_date,
                end_date: exhibition.end_date,
                duration_days: exhibition.duration_days
              });
            }
          });
          
          const uniquePairs = categoryCityPairs.filter((pair, index, self) => 
            index === self.findIndex(p => p.display === pair.display)
          );
          
          const formattedData: CategoryItem[][] = [];
          for (let i = 0; i < uniquePairs.length; i += 5) {
            const row = uniquePairs.slice(i, i + 5);
            while (row.length < 5) {
              row.push({ 
                display: "", 
                category: "", 
                city: "",
                categoryName: "",
                cityName: ""
              });
            }
            formattedData.push(row);
          }
          
          setCategoryData(prev => ({
            ...prev,
            International: formattedData
          }));
        }
      } catch (error) {
        console.error('Error fetching international exhibition:', error);
        setCategoryData(prev => ({
          ...prev,
          International: [[{ 
            display: "Error Loading Data", 
            category: "Error", 
            city: "",
            categoryName: "Error",
            cityName: ""
          }]]
        }));
      } finally {
        setLoading(prev => ({ ...prev, international: false }));
      }
    };
    
    fetchInternationalData();
  }, []);

  // Get filtered domestic categories based on search query
  const filteredDomesticCategories = useMemo(() => {
    // Flatten the grid to get all items
    const allItems = categoryData.Domestic.flat().filter(item => 
      item && typeof item === 'object' && item.display && item.display !== ""
    );
    
    if (!isSearchActive || !searchQuery.trim()) {
      return allItems;
    }
    
    const searchLower = searchQuery.toLowerCase().trim();
    return allItems.filter(item => 
      item.display.toLowerCase().includes(searchLower) ||
      item.category.toLowerCase().includes(searchLower) ||
      (item.city && item.city.toLowerCase().includes(searchLower))
    );
  }, [categoryData.Domestic, searchQuery, isSearchActive]);

  // Get filtered international categories based on search query
  const filteredInternationalCategories = useMemo(() => {
    // Flatten the grid to get all items
    const allItems = categoryData.International.flat().filter(item => 
      item && typeof item === 'object' && item.display && item.display !== ""
    );
    
    if (!isSearchActive || !searchQuery.trim()) {
      return allItems;
    }
    
    const searchLower = searchQuery.toLowerCase().trim();
    return allItems.filter(item => 
      item.display.toLowerCase().includes(searchLower) ||
      item.category.toLowerCase().includes(searchLower) ||
      (item.city && item.city.toLowerCase().includes(searchLower))
    );
  }, [categoryData.International, searchQuery, isSearchActive]);

  const clearAllFilters = () => {
    setPriceRange([0, 200000]);
    setDurationRange([0, 10]);
    clearSearch();
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
  
  /* ===== HANDLERS ===== */
  const handleMenuClick = (menu: string) => {
    setActiveMenu(prev => prev === menu ? null : menu);
    setActiveCategory(null);
    setOpenQA(null);
    clearSearch(); // Clear search when changing menu
  };
  
  const handleCategoryClick = (cat: string) => {
    setActiveCategory(prev => prev === cat ? null : cat);
    setActiveMenu(null);
    setOpenQA(null);
    clearSearch(); // Clear search when changing category
  };
  
  const handleQAClick = (index: number) => {
    setOpenQA(openQA === index ? null : index);
  };
  
  const isImageUrl = (url: string) => {
    return url && (
      url.startsWith('http') ||
      url.startsWith('/')
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow p-2 md:p-6 bg-[#FFEBEE]">
        <div className="max-w-[1400px] mx-auto w-full">
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Sidebar - Same design as ExhibitionView */}
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

                {/* About Exhibition */}
                <div className="mt-3 mb-4">
                  <div
                    onClick={() => handleMenuClick("About Exhibition")}
                    className="flex justify-between items-center p-2 rounded-lg cursor-pointer border border-black bg-white text-[#2E4D98]"
                  >
                    <h2 className="text-xl font-bold text-[#2E4D98]">About Exhibition</h2>
                    <span className="text-xs">
                      {activeMenu === "About Exhibition" ? "▼" : "▶"}
                    </span>
                  </div>
                </div>

                {/* Exhibition Range Filter */}
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

                {/* Categories Section */}
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-3 bg-white p-2 rounded-lg border border-black">
                    <h2 className="text-xl font-bold text-[#2E4D98]">Categories</h2>
                  </div>
                  
                  {/* Domestic Exhibition */}
                  <div className="mb-4">
                    <div
                      onClick={() => handleCategoryClick("Domestic")}
                      className="flex justify-between items-center p-2 rounded-lg cursor-pointer border border-black bg-white text-[#2E4D98]"
                    >
                      <h3 className="text-lg font-semibold text-[#2E4D98]">Domestic Exhibition</h3>
                      <span className="text-xs">
                        {activeCategory === "Domestic" ? "▼" : "▶"}
                      </span>
                    </div>
                  </div>

                  {/* International Exhibition */}
                  <div>
                    <div
                      onClick={() => handleCategoryClick("International")}
                      className="flex justify-between items-center p-2 rounded-lg cursor-pointer border border-black bg-white text-[#2E4D98]"
                    >
                      <h3 className="text-lg font-semibold text-[#2E4D98]">International Exhibition</h3>
                      <span className="text-xs">
                        {activeCategory === "International" ? "▼" : "▶"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
            
            {/* Content Area */}
            <main className="flex-1">
              {/* Header Banner */}
              <div 
                className="relative rounded-2xl overflow-hidden mb-6 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url('https://360biznus.com/wp-content/uploads/2025/08/360-virtual-tour-of-shiva-carpets1.jpg')`,
                }}
              >
                <div className="p-8 min-h-[180px] flex items-center">
                  <div className="text-white">
                    <h1 className="text-3xl font-bold mb-2" style={{ textShadow: "2px 2px 4px rgb(0, 0, 0)" }}>
                      {activeMenu === "About Exhibition" 
                        ? "About Exhibition"
                        : (activeCategory 
                          ? `${activeCategory} Exhibition`
                          : "Exhibition Packages")}
                    </h1>
                    <p className="text-base opacity-90 max-w-2xl" style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}>
                      {activeMenu === "About Exhibition"
                        ? "Learn more about our exhibition tours and frequently asked questions"
                        : (activeCategory 
                          ? `Explore our exclusive ${activeCategory} exhibition categories`
                          : "Explore our exclusive exhibition packages")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              {activeMenu === "About Exhibition" && (
                <>
                  <div className="border rounded-lg overflow-hidden mb-6">
                    {loading.about ? (
                      <div className="flex flex-col items-center justify-center gap-2" style={{ minHeight: "200px", height: "auto" }}>
                        <span className="animate-spin h-6 w-6 md:h-8 md:w-8 border-4 border-gray-300 border-t-blue-600 rounded-full" />
                        <span className="text-gray-500 text-sm">Loading image...</span>
                      </div>
                    ) : menuData["About Exhibition"].imageText && isImageUrl(menuData["About Exhibition"].imageText) ? (
                      <div className="relative w-full">
                        <img
                          src={menuData["About Exhibition"].imageText}
                          alt="Exhibition Banner"
                          className="w-full h-auto block"
                          style={{ maxHeight: "450px", objectFit: "cover" }}
                          onError={(e) => {
                            console.error('Image failed to load:', menuData["About Exhibition"].imageText);
                            e.currentTarget.style.display = 'none';
                            const parent = e.currentTarget.parentElement;
                            if (parent) {
                              const errorDiv = parent.querySelector('.image-error');
                              if (errorDiv) {
                                (errorDiv as HTMLElement).style.display = 'flex';
                              }
                            }
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
                              fontSize: "clamp(1rem, 6vw, 90px)",
                              color: "#00205b",
                              textShadow: "2px 2px 8px rgba(0, 0, 0, 0.34)",
                              lineHeight: "1.2",
                              padding: "0 10px"
                            }}
                          >
                            ABOUT EXHIBITION
                          </h1>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center text-gray-500 text-center p-4" style={{ minHeight: "200px" }}>
                        <div className="text-sm">No image available</div>
                      </div>
                    )}
                  </div>
                  
                  <div className="border rounded-lg overflow-hidden">
                    {menuData["About Exhibition"].qa.length > 0 ? (
                      menuData["About Exhibition"].qa.map((item, index) => (
                        <div key={index} className="border-b">
                          <div
                            onClick={() => handleQAClick(index)}
                            className="flex justify-between items-center px-4 py-3 cursor-pointer hover:bg-gray-50"
                            style={{ backgroundColor: "#2E3A8A", color: "#fff" }}
                          >
                            <span className="text-sm md:text-base">{item.q}</span>
                            <span className="text-xs md:text-sm">{openQA === index ? "▼" : "▶"}</span>
                          </div>
                          {openQA === index && (
                            <div
                              className="px-4 py-4 bg-[#E8F0FF] overflow-y-auto text-sm md:text-base"
                              style={{
                                minHeight: "100px",
                                maxHeight: "250px",
                                minWidth: "100%",
                                maxWidth: "100%",
                                textAlign: "justify",
                                border: "1px solid black"
                              }}
                            >
                              {item.a}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-6 text-center text-gray-500 text-sm">
                        {loading.about ? (
                          <div className="flex items-center justify-center gap-2">
                            <span className="animate-spin h-4 w-4 border-2 border-gray-300 border-t-blue-600 rounded-full" />
                            Loading questions...
                          </div>
                        ) : (
                          "No data available"
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}
              
              {activeCategory === "Domestic" && (
                <div className="p-0">
                  {/* TOP ROW */}
                  <div className="flex items-center mb-1 gap-1">
                    {/* Box 1 */}
                    <div className="border border-black w-[355px] h-[45px] flex items-center justify-center font-semibold" style={{ backgroundColor: "#2E4D98", color: "white" }}>
                      Domestic
                    </div>

                    {/* Box 2 - Search with clear button */}
                    <div className="relative w-[365px] bg-blue-100">
                      <input
                        type="text"
                        placeholder="Search categories..."
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setShowSearchBtn(e.target.value.trim() !== "");
                          if (e.target.value.trim() === "") {
                            setIsSearchActive(false);
                          }
                        }}
                        className="border border-black w-full h-[45px] px-4 outline-none pr-10 bg-blue-100"
                      />
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={() => {
                            setSearchQuery("");
                            setShowSearchBtn(false);
                            setIsSearchActive(false);
                          }}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          ✕
                        </button>
                      )}
                    </div>

                    {/* Box 3 */}
                    <button
                      onClick={handleSearch}
                      className="text-white w-[330px] h-[45px] border border-black"
                      style={{ backgroundColor: "red" }}
                    >
                      Search
                    </button>
                  </div>

                  {/* CATEGORY BOXES */}
                  {loading.domestic ? (
                    <div className="flex justify-center py-8">
                      <span className="animate-spin h-8 w-8 border-4 border-gray-300 border-t-blue-600 rounded-full" />
                    </div>
                  ) : filteredDomesticCategories.length > 0 ? (
                    <>
                      {isSearchActive && (
                        <div className="mb-3 text-sm text-gray-600">
                          Found {filteredDomesticCategories.length} result(s) for "{searchQuery}"
                        </div>
                      )}
                      <div className="grid grid-cols-5 gap-1">
                        {filteredDomesticCategories.map((item, index) => (
                          <div
                            key={index}
                            onClick={() => handleCellClick(item)}
                            className="
                              border border-black
                              w-full min-h-[40px]
                              flex items-center justify-center
                              text-center text-sm
                              cursor-pointer bg-blue-100 hover:bg-blue-200
                              px-2 py-1
                            "
                          >
                            <span className="font-medium">{item.display}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      {isSearchActive 
                        ? `No categories or cities found matching "${searchQuery}"`
                        : "No domestic categories available"}
                    </div>
                  )}
                </div>
              )}

              {activeCategory === "International" && (
                <div className="p-0">
                  {/* TOP ROW */}
                  <div className="flex items-center mb-1 gap-1">
                    {/* Box 1 */}
                    <div className="border border-black w-[355px] h-[45px] flex items-center justify-center font-semibold" style={{ backgroundColor: "#2E4D98", color: "white" }}>
                      International
                    </div>

                    {/* Box 2 - Search with clear button */}
                    <div className="relative w-[365px] bg-blue-100">
                      <input
                        type="text"
                        placeholder="Search categories..."
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setShowSearchBtn(e.target.value.trim() !== "");
                          if (e.target.value.trim() === "") {
                            setIsSearchActive(false);
                          }
                        }}
                        className="border border-black w-full h-[45px] px-4 outline-none pr-10 bg-blue-100"
                      />
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={() => {
                            setSearchQuery("");
                            setShowSearchBtn(false);
                            setIsSearchActive(false);
                          }}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          ✕
                        </button>
                      )}
                    </div>

                    {/* Box 3 */}
                    <button
                      onClick={handleSearch}
                      className="text-white w-[330px] h-[45px] border border-black"
                      style={{ backgroundColor: "red" }}
                    >
                      Search
                    </button>
                  </div>

                  {/* CATEGORY BOXES */}
                  {loading.international ? (
                    <div className="flex justify-center py-8">
                      <span className="animate-spin h-8 w-8 border-4 border-gray-300 border-t-blue-600 rounded-full" />
                    </div>
                  ) : filteredInternationalCategories.length > 0 ? (
                    <>
                      {isSearchActive && (
                        <div className="mb-3 text-sm text-gray-600">
                          Found {filteredInternationalCategories.length} result(s) for "{searchQuery}"
                        </div>
                      )}
                      <div className="grid grid-cols-5 gap-1">
                        {filteredInternationalCategories.map((item, index) => (
                          <div
                            key={index}
                            onClick={() => handleCellClick(item)}
                            className="
                              border border-black
                              w-full min-h-[40px]
                              flex items-center justify-center
                              text-center text-sm
                              cursor-pointer bg-blue-100 hover:bg-blue-200
                              px-2 py-1
                            "
                          >
                            <span className="font-medium">{item.display}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      {isSearchActive 
                        ? `No categories or cities found matching "${searchQuery}"`
                        : "No international categories available"}
                    </div>
                  )}
                </div>
              )}
              
              {!activeMenu && !activeCategory && (
                <div className="flex items-center justify-center h-full text-gray-400 py-16">
                  <p className="text-sm md:text-base text-center px-4">Select an item from the sidebar to view content</p>
                </div>
              )}
            </main>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Exhibition;