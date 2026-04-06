import React, { useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { Slider } from "@/components/ui/slider";

interface MenuItemProps {
  label: string;
  path: string;
  closeSidebar: () => void;
}

interface SidebarProps {
  activeMenu?: string | null;
  activeCategory?: string | null;
  onMenuClick?: (menu: string) => void;
  onCategoryClick?: (category: string) => void;
  priceRange?: number[];
  setPriceRange?: (value: number[]) => void;
  durationRange?: number[];
  setDurationRange?: (value: number[]) => void;
  onClearAll?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeMenu: externalActiveMenu,
  activeCategory: externalActiveCategory,
  onMenuClick: externalOnMenuClick,
  onCategoryClick: externalOnCategoryClick,
  priceRange: externalPriceRange,
  setPriceRange: externalSetPriceRange,
  durationRange: externalDurationRange,
  setDurationRange: externalSetDurationRange,
  onClearAll: externalOnClearAll,
}) => {
  const [openPackage, setOpenPackage] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Internal states if not provided externally
  const [internalActiveMenu, setInternalActiveMenu] = useState<string | null>("About Exhibition");
  const [internalActiveCategory, setInternalActiveCategory] = useState<string | null>(null);
  const [internalPriceRange, setInternalPriceRange] = useState([0, 200000]);
  const [internalDurationRange, setInternalDurationRange] = useState([0, 10]);

  const location = useLocation();
  const navigate = useNavigate();

  // Use external props if provided, otherwise use internal state
  const activeMenu = externalActiveMenu !== undefined ? externalActiveMenu : internalActiveMenu;
  const activeCategory = externalActiveCategory !== undefined ? externalActiveCategory : internalActiveCategory;
  const priceRange = externalPriceRange !== undefined ? externalPriceRange : internalPriceRange;
  const durationRange = externalDurationRange !== undefined ? externalDurationRange : internalDurationRange;
  
  const setPriceRange = externalSetPriceRange || setInternalPriceRange;
  const setDurationRange = externalSetDurationRange || setInternalDurationRange;
  
  const handleMenuClick = (menu: string) => {
    if (externalOnMenuClick) {
      externalOnMenuClick(menu);
    } else {
      setInternalActiveMenu(prev => prev === menu ? null : menu);
      setInternalActiveCategory(null);
    }
  };
  
  const handleCategoryClick = (category: string) => {
    if (externalOnCategoryClick) {
      externalOnCategoryClick(category);
    } else {
      setInternalActiveCategory(prev => prev === category ? null : category);
      setInternalActiveMenu(null);
    }
  };
  
  const handleClearAll = () => {
    if (externalOnClearAll) {
      externalOnClearAll();
    } else {
      setPriceRange([0, 200000]);
      setDurationRange([0, 10]);
    }
  };

  const closeSidebar = () => setSidebarOpen(false);

  // Menu items data
  const menuItems = [
    { label: "Home", path: "/micpage" },
    { label: "About MICE", path: "/aboutmic" },
    { label: "Sample Package", path: "/micpackages" },
    { label: "Enquiry Form", path: "/enquiryformmic" },
    { label: "Our Clients", path: "/bankgallery" },
    { label: "Venue Photos", path: "/venuephotos" },
    { label: "MICE Gallery", path: "/micgallery" },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-3 bg-[#071c54] text-white">
        <h1 className="font-semibold">Menu</h1>
        <FaBars size={20} onClick={() => setSidebarOpen(true)} />
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full w-80 bg-gradient-to-br from-blue-100 to-blue-50 border-r border-gray-300 z-50
          transform transition-transform duration-300 overflow-y-auto
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:block
        `}
      >
        {/* Mobile Close Button */}
        <div className="md:hidden flex justify-end p-3">
          <FaTimes size={20} onClick={closeSidebar} />
        </div>

        <div className="p-4">
          {/* Header with Clear All */}
          <div className="flex justify-between items-center mb-6 bg-white p-3 rounded-lg border border-black">
            <h2 className="text-2xl font-bold text-[#2E4D98]">Exhibitions</h2>
            <button
              onClick={handleClearAll}
              className="text-sm text-[#E53C42] hover:underline"
            >
              Clear All
            </button>
          </div>

          {/* About Exhibition */}
          <div className="mt-3 mb-6">
            <div
              onClick={() => handleMenuClick("About Exhibition")}
              className="flex justify-between items-center p-3 rounded-lg cursor-pointer border border-black bg-white text-[#2E4D98] hover:bg-gray-50 transition"
            >
              <h2 className="text-xl font-bold text-[#2E4D98]">About Exhibition</h2>
              <span className="text-xs">
                {activeMenu === "About Exhibition" ? "▼" : "▶"}
              </span>
            </div>
          </div>

          {/* Duration Range Filter */}
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
                onClick={() => handleCategoryClick("Domestic")}
                className="flex justify-between items-center p-3 rounded-lg cursor-pointer border border-black bg-white text-[#2E4D98] hover:bg-gray-50 transition"
              >
                <h3 className="text-lg font-semibold text-[#2E4D98]">Domestic Exhibition</h3>
                <span className="text-xs">
                  {activeCategory === "Domestic" ? "▼" : "▶"}
                </span>
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

          {/* Menu Items Section - Same UI as Domestic/International */}
          <div className="mt-4 pt-4 border-t border-gray-300">
            <div className="flex justify-between items-center mb-4 bg-white p-3 rounded-lg border border-black">
              <h2 className="text-xl font-bold text-[#2E4D98]">Menu</h2>
            </div>
            
            {/* All menu items with same button style */}
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
    </>
  );
};

export default Sidebar;