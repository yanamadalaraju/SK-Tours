import React, { useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { Slider } from "@/components/ui/slider";

const Sidebar = ({ sidebarOpen, closeSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Helper function to check if path is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Helper function to get button classes based on active state
  const getButtonClasses = (path, customClasses = "") => {
    const isActivePath = isActive(path);
    return `flex justify-between items-center p-3 rounded-lg cursor-pointer border border-black transition shadow-sm ${
      isActivePath 
        ? 'bg-[#2E4D98] text-white' 
        : 'bg-white text-[#2E4D98] hover:bg-gray-50'
    } ${customClasses}`;
  };

  return (
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
          <button className="text-sm text-[white] hover:underline">
            Clear All
          </button>
        </div>

        {/* HOME BUTTON */}
        <div className="mb-4">
          <div
            onClick={() => {
              navigate("/micpage");
              closeSidebar();
            }}
            className={getButtonClasses("/micpage")}
          >
            <h3 className="text-xl font-bold">About Mice</h3>
          </div>
        </div>

        {/* Duration Range Filter */}
        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-3 text-[#2E4D98]">Mice Range</h3>
          <div className="flex justify-between text-sm text-gray-600 mb-3">
            <span>0 days</span>
            <span>10 days</span>
          </div>
          <Slider 
            max={10} 
            step={1} 
            className="w-full" 
          />
        </div>

        {/* Price Filter */}
        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-3 text-[#2E4D98]">Price Range</h3>
          <div className="flex justify-between text-sm text-gray-600 mb-3">
            <span>₹{0}</span>
            <span>₹{200000}</span>
          </div>
          <Slider
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
              onClick={() => {
                navigate("/micpage");
                closeSidebar();
              }}
              className={getButtonClasses("/micpage", "text-lg font-semibold")}
            >
              <h3 className="text-lg font-semibold">Domestic Mice</h3>
            </div>
          </div>

          {/* International Exhibition */}
          <div className="mb-4">
            <div
              onClick={() => {
                navigate("/micpage");
                closeSidebar();
              }}
              className={getButtonClasses("/micpage", "text-lg font-semibold")}
            >
              <h3 className="text-lg font-semibold">International Mice</h3>
            </div>
          </div>
        </div>

        {/* Menu Items Section */}
        <div className="mt-0 pt-0 border-t border-gray-300">
          <div className="mb-4">
            <div
              onClick={() => {
                navigate("/enquiryformmic");
                closeSidebar();
              }}
              className={getButtonClasses("/enquiryformmic", "text-lg font-semibold")}
            >
              <h3 className="text-lg font-semibold">Enquiry Form</h3>
            </div>
          </div>
          <div className="mb-4">
            <div
              onClick={() => {
                navigate("/bankgallery");
                closeSidebar();
              }}
              className={getButtonClasses("/bankgallery", "text-lg font-semibold")}
            >
              <h3 className="text-lg font-semibold">Our Clients</h3>
            </div>
          </div>
          <div className="mb-4">
            <div
              onClick={() => {
                navigate("/venuephotos");
                closeSidebar();
              }}
              className={getButtonClasses("/venuephotos", "text-lg font-semibold")}
            >
              <h3 className="text-lg font-semibold">Venue Photos</h3>
            </div>
          </div>
          <div className="mb-4">
            <div
              onClick={() => {
                navigate("/micgallery");
                closeSidebar();
              }}
              className={getButtonClasses("/micgallery", "text-lg font-semibold")}
            >
              <h3 className="text-lg font-semibold">Mice Gallery</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;