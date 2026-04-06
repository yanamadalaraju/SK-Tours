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
  
  // Sidebar states
  const [activeSidebarMenu, setActiveSidebarMenu] = useState<string | null>("About Exhibition");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [durationRange, setDurationRange] = useState([0, 10]);

  const navigate = useNavigate();

  /* ===== FETCH DATA ===== */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/mice/main`);
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching MICE main:", error);
      }
    };

    fetchData();
  }, []);

  const handleSidebarMenuClick = (menu: string) => {
    setActiveSidebarMenu(prev => prev === menu ? null : menu);
    setActiveCategory(null);
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(prev => prev === category ? null : category);
    setActiveSidebarMenu(null);
  };

  const handleClearAll = () => {
    setPriceRange([0, 200000]);
    setDurationRange([0, 10]);
  };

  const closeSidebar = () => setSidebarOpen(false);

  // Menu items data
  const menuItems = [
    { label: "Home", path: "/micpage" },
    { label: "About MICE", path: "/aboutmic" },
    // { label: "Sample Package", path: "/micpackages" },
    { label: "Enquiry Form", path: "/enquiryformmic" },
    { label: "Our Clients", path: "/bankgallery" },
    { label: "Venue Photos", path: "/venuephotos" },
    { label: "MICE Gallery", path: "/micgallery" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow p-1 md:p-1 bg-[#FFEBEE]">
     <div className="max-w-[1470px] mx-auto w-full">


      {/* Overlay */}
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
  transform transition-transform duration-300 overflow-y-auto
  ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
  md:translate-x-0 md:static md:block md:h-auto
`}
        >
          {/* Mobile Close Button */}
          <div className="md:hidden flex justify-end p-3">
            <FaTimes size={20} onClick={closeSidebar} />
          </div>

          <div className="p-4">
            {/* Header with Clear All */}
            <div className="flex justify-between items-center mb-6 bg-[#2E4D98] p-3 rounded-lg border border-black">
              <h2 className="text-2xl font-bold text-[white]">MICE</h2>
              <button
                onClick={handleClearAll}
                className="text-sm text-[white] hover:underline"
              >
                Clear All
              </button>
            </div>


            {/* Duration Range Filter */}
            <div className="mb-8">
              <h3 className="font-semibold text-lg mb-4 text-[#2E4D98]">Mice Range</h3>
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
            <div className="mb-8">
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
              <div className="flex justify-between items-center mb-4 bg-white p-3 rounded-lg border border-black">
                <h2 className="text-xl font-bold text-[#2E4D98]">Categories</h2>
              </div>
              
              {/* Domestic Exhibition */}
        <div className="mb-4">
  <div
    onClick={() => navigate("/miccategoires")} // Changed from handleCategoryClick to navigate
    className="flex justify-between items-center p-3 rounded-lg cursor-pointer border border-black bg-white text-[#2E4D98] hover:bg-gray-50 transition"
  >
    <h3 className="text-lg font-semibold text-[#2E4D98]">Domestic Exhibition</h3>
    <span className="text-xs">▶</span>
  </div>
</div>

              {/* International Exhibition */}
              <div className="mb-6">
                <div
                  onClick={() => handleCategoryClick("International")}
                  className="flex justify-between items-center p-3 rounded-lg cursor-pointer border border-black bg-white text-[#2E4D98] hover:bg-gray-50 transition"
                >
                  <h3 className="text-lg font-semibold text-[#2E4D98]">International Exhibition</h3>
                  <span className="text-xs">
                    {activeCategory === "International" ? "▼" : "▶"}
                  </span>
                </div>
              </div>
            </div>

            {/* Menu Items Section */}
            <div className="mt-4 pt-4 border-t border-gray-300">
          
              
              {/* All menu items */}
              {menuItems.map((item, index) => (
                <div key={index} className="mb-3">
                  <div
                    onClick={() => {
                      navigate(item.path);
                      closeSidebar();
                    }}
                    className="flex justify-between items-center p-3 rounded-lg cursor-pointer border border-black bg-white text-[#2E4D98] hover:bg-gray-50 transition"
                  >
                    <h3 className="text-lg font-semibold text-[#2E4D98]">{item.label}</h3>
                    <span className="text-xs">▶</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1">

          {/* ===== TOP SECTION ===== */}
          <div className="flex flex-col md:flex-row w-full h-auto md:h-[480px] overflow-hidden">

            {/* LEFT IMAGE */}
            <div
              className="relative w-full md:w-[58%] h-[250px] md:h-full bg-cover bg-center"
              style={{
                backgroundImage: data?.banner_image
                  ? `url(${BASE_URL}/uploads/mice/main/${data.banner_image})`
                  : "none"
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

            {/* RIGHT MENU */}
            <div className="w-full md:w-[40%] h-full bg-[#00205b] flex flex-col items-start justify-center gap-3 md:gap-5 px-4 md:px-6 py-4 md:py-0">
              {["Meeting", "Incentives", "Conference", "Events"].map((menu) => {
                const subItems: Record<string, string[]> = {
                  Meeting: ["Board Meeting", "Team Meeting", "Annual Meeting"],
                  Incentives: ["Staff Incentives", "Sales Incentives", "Travel Incentives"],
                  Conference: ["Tech Conference", "Business Conference", "Global Conference"],
                  Events: ["Corporate Events", "Social Events", "Exhibition Events"],
                };

                return (
                  <div key={menu} className="relative w-full md:w-78">
                    <button
                      onClick={() =>
                        setActiveMenu(activeMenu === menu ? null : menu)
                      }
                      className="bg-white text-[#00205b] px-5 py-4 font-semibold w-full text-left flex justify-between items-center"
                    >
                      {menu}
                      <span>{activeMenu === menu ? "◀" : "▶"}</span>
                    </button>

                    {/* Dropdown below button */}
                    {activeMenu === menu && (
                      <div className="absolute left-0 top-full mt-1 flex flex-col bg-white shadow-lg w-full md:w-[435px] z-50">
                        {subItems[menu].map((sub) => (
                          <a
                            key={sub}
                            href="#"
                            className="px-4 py-3 text-sm hover:bg-blue-50 border-b"
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

          {/* ===== BELOW SECTION ===== */}
          <div className="grid grid-cols-1 md:grid-cols-12 mt-6 md:mt-8 border rounded-lg shadow bg-blue-100">
            <div className="md:col-span-3 bg-blue-100 border-r border-black">
              <div className="bg-[#00205b] text-white px-4 py-3 font-semibold border-b border-black">
                MicePage
              </div>

              <button
                onClick={() =>
                  setActiveMenu(activeMenu === "Micpage" ? null : "Micpage")
                }
                className={`w-full text-left px-4 py-3 border-b border-black flex justify-between bg-blue-100 ${
                  activeMenu === "Micpage"
                    ? "bg-blue-100 font-medium"
                    : "bg-blue-100 hover:bg-blue-100"
                }`}
              >
                Micpage
                <span>{activeMenu === "Micpage" ? "▼" : "▶"}</span>
              </button>
            </div>

            {/* RIGHT */}
            <div className="md:col-span-9 p-4 md:p-6 bg-blue-100">
              {activeMenu === "Micpage" && data ? (
                <>
                  {data.questions?.map((item: any, index: number) => (
                    <div key={index} className="border border-black mb-3 rounded overflow-hidden">
                      <div
                        onClick={() =>
                          setOpenQA(openQA === index ? null : index)
                        }
                        className="bg-[#00205b] text-white px-4 py-3 cursor-pointer flex justify-between border-b border-black"
                      >
                        <span className="text-sm md:text-base">
                          {item.question}
                        </span>
                        <span>{openQA === index ? "▼" : "▶"}</span>
                      </div>

                      {openQA === index && (
                        <div className="px-4 py-4 bg-blue-100 text-sm md:text-base border-t border-black">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </>
              ) : (
                <div className="text-center text-gray-500 py-10 bg-blue-100">
                  Click "Micpage" to view details
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
      </div>
      </main>

      <Footer />
    </div>
  );
};

export default MicePage;