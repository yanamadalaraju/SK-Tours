import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BASE_URL } from "@/ApiUrls";
import {
  FaChevronDown,
  FaChevronUp,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Slider } from "@/components/ui/slider";

const MicePage: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [openQA, setOpenQA] = useState<number | null>(null);
  const [data, setData] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const [miceMain, setMiceMain] = useState(null);
  const [activeSidebarMenu, setActiveSidebarMenu] = useState<string | null>("About Exhibition");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [durationRange, setDurationRange] = useState([0, 10]);

  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchBtn, setShowSearchBtn] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [loading, setLoading] = useState({ domestic: false, international: false });
  
  const [domesticCities, setDomesticCities] = useState<any[]>([]);
  const [internationalCities, setInternationalCities] = useState<any[]>([]);
  const [filteredDomesticCities, setFilteredDomesticCities] = useState<any[]>([]);
  const [filteredInternationalCities, setFilteredInternationalCities] = useState<any[]>([]);
const [bannerImage, setBannerImage] = useState('');
  const [rightSideView, setRightSideView] = useState<'micpage' | 'domestic' | 'international' | 'home'>('micpage');

  const [isDomesticOpen, setIsDomesticOpen] = useState(false);
  const [isInternationalOpen, setIsInternationalOpen] = useState(false);
  const [isHomeOpen, setIsHomeOpen] = useState(false);

  const navigate = useNavigate();

  /* ===== FETCH DATA ===== */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/mice/domestic`);
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching MICE main:", error);
      }
    };

    fetchData();
  }, []);

  // Fetch domestic cities
  useEffect(() => {
    if (rightSideView === 'domestic') {
      fetchDomesticCities();
    }
  }, [rightSideView]);

  // Fetch international cities
  useEffect(() => {
    if (rightSideView === 'international') {
      fetchInternationalCities();
    }
  }, [rightSideView]);

  // Filter cities when search query changes
  useEffect(() => {
    if (rightSideView === 'domestic') {
      if (searchQuery.trim() === "") {
        setFilteredDomesticCities(domesticCities);
      } else {
        const filtered = domesticCities.filter(city =>
          city.city_name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredDomesticCities(filtered);
      }
    } else if (rightSideView === 'international') {
      if (searchQuery.trim() === "") {
        setFilteredInternationalCities(internationalCities);
      } else {
        const filtered = internationalCities.filter(city =>
          city.city_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          city.country_name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredInternationalCities(filtered);
      }
    }
  }, [searchQuery, domesticCities, internationalCities, rightSideView]);

  const fetchDomesticCities = async () => {
    setLoading(prev => ({ ...prev, domestic: true }));
    try {
      const response = await fetch(`${BASE_URL}/api/mice/domestic`);
      const result = await response.json();
      console.log("Domestic cities data:", result);
      setDomesticCities(result || []);
      setFilteredDomesticCities(result || []);
    } catch (error) {
      console.error("Error fetching domestic cities:", error);
    } finally {
      setLoading(prev => ({ ...prev, domestic: false }));
    }
  };

  const fetchInternationalCities = async () => {
    setLoading(prev => ({ ...prev, international: true }));
    try {
      const response = await fetch(`${BASE_URL}/api/mice/international`);
      const result = await response.json();
      console.log("International cities data:", result);
      setInternationalCities(result || []);
      setFilteredInternationalCities(result || []);
    } catch (error) {
      console.error("Error fetching international cities:", error);
    } finally {
      setLoading(prev => ({ ...prev, international: false }));
    }
  };

  const handleSidebarMenuClick = (menu: string) => {
    setActiveSidebarMenu(prev => prev === menu ? null : menu);
    setActiveCategory(null);
    setSearchQuery("");
    setIsSearchActive(false);
    
    if (menu === "About Exhibition") {
      setRightSideView('micpage');
      setActiveMenu("Micpage");
    }
  };

  const handleCategoryClick = (category: string) => {
    if (category === "Domestic") {
      setIsDomesticOpen(!isDomesticOpen);
      if (!isDomesticOpen) {
        setRightSideView('domestic');
        setActiveCategory(category);
        setIsHomeOpen(false); // Close home when opening domestic
      } else {
        setRightSideView('micpage');
        setActiveCategory(null);
      }
    } else if (category === "International") {
      setIsInternationalOpen(!isInternationalOpen);
      if (!isInternationalOpen) {
        setRightSideView('international');
        setActiveCategory(category);
        setIsHomeOpen(false); // Close home when opening international
      } else {
        setRightSideView('micpage');
        setActiveCategory(null);
      }
    }
    setActiveSidebarMenu(null);
    setSearchQuery("");
    setIsSearchActive(false);
  };

  const handleHomeClick = () => {
    if (!isHomeOpen) {
      // Opening home - show home content
      setIsHomeOpen(true);
      setRightSideView('home');
      setActiveCategory(null);
      setIsDomesticOpen(false);
      setIsInternationalOpen(false);
    } else {
      // Closing home - go back to micpage
      setIsHomeOpen(false);
      setRightSideView('micpage');
    }
  };
useEffect(() => {
  const fetchMiceMain = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/mice/main`);
      const result = await res.json();
      console.log("MICE Main data:", result);
      
      // Set the banner image URL
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
  const handleCityClick = (city: any, type: string) => {
    if (!city || city === "") return;
    navigate("/miceview", { 
      state: { 
        category: city, 
        type: type,
        preSelectedCity: city.city_name,
        preSelectedType: type,
        cityData: city
      } 
    });
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      setIsSearchActive(true);
    }
  };

  const handleClearAll = () => {
    setPriceRange([0, 200000]);
    setDurationRange([0, 10]);
    setSearchQuery("");
    setIsSearchActive(false);
    setActiveCategory(null);
    setIsDomesticOpen(false);
    setIsInternationalOpen(false);
    setIsHomeOpen(false);
    setRightSideView('micpage');
  };

  const closeSidebar = () => setSidebarOpen(false);

  const resetToMicpage = () => {
    setRightSideView('micpage');
    setActiveMenu("Micpage");
    setActiveSidebarMenu("About Exhibition");
    setActiveCategory(null);
    setIsHomeOpen(false);
  };

  const menuItems = [
    { label: "Enquiry Form", path: "/enquiryformmic" },
    { label: "Our Clients", path: "/bankgallery" },
    { label: "Venue Photos", path: "/venuephotos" },
    { label: "MICE Gallery", path: "/micgallery" },
  ];

  // Render Home content
  const renderHomeContent = () => {
    return (
       <div 
              className="relative rounded-2xl overflow-hidden mb-2 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('https://360biznus.com/wp-content/uploads/2025/08/360-virtual-tour-of-shiva-carpets1.jpg')`,
              }}
            >
              <div className="p-8 min-h-[180px] flex items-center">
                <div className="text-white">
                  <h1 className="text-3xl font-bold mb-2" style={{ textShadow: "2px 2px 4px rgb(0, 0, 0)" }}>
                     Mice
                  </h1>
                  <p className="text-base opacity-90 max-w-2xl" style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}>
                    Explore our exclusive Mice  cities
                  </p>
                </div>
              </div>
            </div>
    );
  };

  const renderRightSideContent = () => {
    switch(rightSideView) {
      case 'home':
        return renderHomeContent();
      
      case 'domestic':
        return (
          <div>
            <div 
              className="relative rounded-2xl overflow-hidden mb-2 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('https://360biznus.com/wp-content/uploads/2025/08/360-virtual-tour-of-shiva-carpets1.jpg')`,
              }}
            >
              <div className="p-8 min-h-[180px] flex items-center">
                <div className="text-white">
                  <h1 className="text-3xl font-bold mb-2" style={{ textShadow: "2px 2px 4px rgb(0, 0, 0)" }}>
                    Domestic Mice
                  </h1>
                  <p className="text-base opacity-90 max-w-2xl" style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}>
                    Explore our exclusive Domestic Mice cities
                  </p>
                </div>
              </div>
            </div>

            <div className="p-0">
              <div className="flex items-center mb-2 gap-1">
                <div className="border border-black w-[355px] h-[45px] flex items-center justify-center font-semibold" style={{ backgroundColor: "#2E4D98", color: "white" }}>
                  Domestic Cities
                </div>
                <div className="relative w-[365px]">
                  <input
                    type="text"
                    placeholder="Search cities..."
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
                <button
                  onClick={handleSearch}
                  className="text-white w-[360px] h-[45px] border border-black"
                  style={{ backgroundColor: "red" }}
                >
                  Search
                </button>
              </div>

              {loading.domestic ? (
                <div className="flex justify-center py-8">
                  <span className="animate-spin h-4 w-8 border-4 border-gray-300 border-t-blue-600 rounded-full" />
                </div>
              ) : filteredDomesticCities.length > 0 ? (
                <div className="grid grid-cols-5 gap-1">
                  {filteredDomesticCities.map((city, index) => (
                    <div
                      key={city.id || index}
                      onClick={() => handleCityClick(city, 'domestic')}
                      className="
                        border border-black
                        w-full h-[40px]
                        flex items-center justify-center
                        text-center text-sm
                        cursor-pointer bg-blue-100 hover:bg-blue-200
                        transition-colors duration-200
                      "
                    >
                      <span className="font-medium">{city.city_name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  {isSearchActive 
                    ? `No cities found matching "${searchQuery}"`
                    : "No domestic cities available"}
                </div>
              )}
            </div>
          </div>
        );
      
      case 'international':
        return (
          <div>
            <div 
              className="relative rounded-2xl overflow-hidden mb-1 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('https://360biznus.com/wp-content/uploads/2025/08/360-virtual-tour-of-shiva-carpets1.jpg')`,
              }}
            >
              <div className="p-8 min-h-[180px] flex items-center">
                <div className="text-white">
                  <h1 className="text-3xl font-bold mb-2" style={{ textShadow: "2px 2px 4px rgb(0, 0, 0)" }}>
                    International Mice
                  </h1>
                  <p className="text-base opacity-90 max-w-2xl" style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}>
                    Explore our exclusive International Mice cities
                  </p>
                </div>
              </div>
            </div>

            <div className="p-1">
              <div className="flex items-center mb-2 gap-1">
                <div className="border border-black w-[360px] h-[45px] flex items-center justify-center font-semibold" style={{ backgroundColor: "#2E4D98", color: "white" }}>
                  International Cities
                </div>
                <div className="relative w-[355px]">
                  <input
                    type="text"
                    placeholder="Search cities..."
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
                <button
                  onClick={handleSearch}
                  className="text-white w-[365px] h-[45px] border border-black"
                  style={{ backgroundColor: "red" }}
                >
                  Search
                </button>
              </div>

              {loading.international ? (
                <div className="flex justify-center py-8">
                  <span className="animate-spin h-2 w-8 border-4 border-gray-300 border-t-blue-600 rounded-full" />
                </div>
              ) : filteredInternationalCities.length > 0 ? (
                <div className="grid grid-cols-5 gap-1">
                  {filteredInternationalCities.map((city, index) => (
                    <div
                      key={city.id || index}
                      onClick={() => handleCityClick(city, 'international')}
                      className="
                        border border-black
                        w-full h-[40px]
                        flex items-center justify-center
                        text-center text-sm
                        cursor-pointer bg-blue-100 hover:bg-blue-200
                        transition-colors duration-200
                      "
                    >
                      <span className="font-medium">{city.city_name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  {isSearchActive 
                    ? `No cities found matching "${searchQuery}"`
                    : "No international cities available"}
                </div>
              )}
            </div>
          </div>
        );
      
case 'micpage':
  default:
    return (
      <div className="mt-5">
        {miceMain?.questions ? (
          <div className="border rounded-lg overflow-hidden">
            {miceMain.questions.map((item: any, index: number) => (
              <div key={index} className="border-b">
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
         borderRadius: "0 0 8px 8px" ,
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
          <div className="px-4 py-6 text-center text-gray-500 text-sm">
            No questions available
          </div>
        )}
      </div>
    );
    
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow p-1 md:p-1 bg-[#FFEBEE]">
        <div className="max-w-[1470px] mx-auto w-full">
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
              onClick={closeSidebar}
            />
          )}

          <div className="main-layout flex flex-col md:flex-row w-full gap-3 md:gap-5 p-3 md:p-5">
{/* Sidebar */}
<div
  className={`
    fixed top-[64px] left-0 h-[calc(100vh-64px)] w-80 bg-gradient-to-br from-blue-100 to-blue-50 border-r border-gray-300 z-30 border-b
    transform transition-transform duration-300 overflow-y-auto shadow-xl rounded-2xl
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0 md:static md:block md:h-auto md:shadow-lg md:rounded-2xl
  `}
>
  <div className="md:hidden flex justify-end p-3">
    <FaTimes size={20} onClick={closeSidebar} />
  </div>

  <div className="p-4">
    <div className="flex justify-between items-center mb-4 bg-[#2E4D98] p-3 rounded-lg border border-black shadow-md">
      <h2 className="text-2xl font-bold text-[white]">MICE</h2>
      <button
        onClick={handleClearAll}
        className="text-sm text-[white] hover:underline"
      >
        Clear All
      </button>
    </div>

    {/* HOME BUTTON - Moved above price filters */}
    <div className="mb-4">
      <div
        onClick={() => {
          handleHomeClick();
          closeSidebar();
        }}
        className="flex justify-between items-center p-3 rounded-lg cursor-pointer border border-black transition bg-white hover:bg-gray-50 shadow-sm"
      >
        <h3 className="text-xl font-bold text-[#2E4D98]">About Mice</h3>
        <span className="text-xs text-gray-600">{isHomeOpen ? "▼" : "▶"}</span>
      </div>
    </div>

    {/* Duration Range Filter */}
    <div className="mb-4">
      <h3 className="font-semibold text-lg mb-3 text-[#2E4D98]">Mice Range</h3>
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
    <div className="mb-4">
      <h3 className="font-semibold text-lg mb-3 text-[#2E4D98]">Price Range</h3>
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
      <div className="flex justify-between items-center mb-4 bg-white p-3 rounded-lg border border-black shadow-sm">
        <h2 className="text-xl font-bold text-[#2E4D98]">Categories</h2>
      </div>
      
      {/* Domestic Exhibition */}
      <div className="mb-4">
        <div
          onClick={() => handleCategoryClick("Domestic")}
          className={`flex justify-between items-center p-3 rounded-lg cursor-pointer border border-black transition shadow-sm ${
            rightSideView === 'domestic' && isDomesticOpen
              ? 'bg-[#2E4D98] text-white' 
              : 'bg-white text-[#2E4D98] hover:bg-gray-50'
          }`}
        >
          <h3 className="text-lg font-semibold">Domestic Mice</h3>
          <span className="text-xs">{isDomesticOpen ? "▼" : "▶"}</span>
        </div>
      </div>

      {/* International Exhibition */}
      <div className="mb-4">
        <div
          onClick={() => handleCategoryClick("International")}
          className={`flex justify-between items-center p-3 rounded-lg cursor-pointer border border-black transition shadow-sm ${
            rightSideView === 'international' && isInternationalOpen
              ? 'bg-[#2E4D98] text-white' 
              : 'bg-white text-[#2E4D98] hover:bg-gray-50'
          }`}
        >
          <h3 className="text-lg font-semibold">International Mice</h3>
          <span className="text-xs">{isInternationalOpen ? "▼" : "▶"}</span>
        </div>
      </div>
    </div>

    {/* Menu Items Section */}
    <div className="mt-0 pt-0 border-t border-gray-300">
      {menuItems.map((item, index) => (
        <div key={index} className="mb-4">
          <div
            onClick={() => {
              if (item.path) {
                navigate(item.path);
              }
              closeSidebar();
            }}
            className="flex justify-between items-center p-3 rounded-lg cursor-pointer border border-black transition bg-white text-[#2E4D98] hover:bg-gray-50 shadow-sm"
          >
            <h3 className="text-lg font-semibold">{item.label}</h3>
            <span className="text-xs">▶</span>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

            {/* Right Side Content */}
            <div className="flex-1">
{rightSideView !== 'home' && rightSideView === 'micpage' && (
  <div className="flex flex-col md:flex-row w-full h-auto md:h-[545px] overflow-hidden mb-2">
    <div
      className="relative w-full md:w-[58%] h-[280px] md:h-full bg-cover bg-center"
      style={{
        backgroundImage: `url('${bannerImage || 'https://360biznus.com/wp-content/uploads/2025/08/360-virtual-tour-of-shiva-carpets1.jpg'}')`,
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h1
          className="text-[70px] sm:text-[100px] md:text-[140px] lg:text-[180px] font-black text-[#00205b] leading-none mb-1"
          style={{ textShadow: "0px 0px 20px rgba(255, 255, 255, 0.19)" }}
        >
          MICE
        </h1>
      </div>
    </div>

    <div className="w-full md:w-[45%] h-full bg-[#00205b] flex flex-col items-start justify-center gap-3 md:gap-5 px-4 md:px-6 py-4 md:py-0">
      {["Meeting", "Incentives", "Conference", "Events"].map((menu) => {
const subItems = {
  Meeting: [
    "Meetings play a crucial role in facilitating effective communication among team members. They help in sharing ideas, discussing challenges, and making informed decisions while ensuring that everyone stays aligned with the organization’s goals and objectives."
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
)}

              {renderRightSideContent()}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MicePage;