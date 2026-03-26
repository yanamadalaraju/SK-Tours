import React, { useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

interface MenuItemProps {
  label: string;
  path: string;
  closeSidebar: () => void;
}

interface SubItemProps {
  label: string;
  path: string;
  closeSidebar: () => void;
}

interface DropdownHeaderProps {
  label: string;
  path: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isActive: boolean;
}

const Sidebar: React.FC = () => {
  const [openPackage, setOpenPackage] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const location = useLocation();

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      {/* 🔹 Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-3 bg-[#071c54] text-white">
        <h1 className="font-semibold">Menu</h1>
        <FaBars size={20} onClick={() => setSidebarOpen(true)} />
      </div>

      {/* 🔹 Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* 🔹 Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-blue-100 border-r border-gray-300 z-50
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:block
        `}
      >
        {/* 🔹 Mobile Close Button */}
        <div className="md:hidden flex justify-end p-3">
          <FaTimes size={20} onClick={closeSidebar} />
        </div>

        <div className="py-2 font-sans">
          <MenuItem label="Home" path="/micpage" closeSidebar={closeSidebar} />
          <MenuItem label="About MICE" path="/aboutmic" closeSidebar={closeSidebar} />
  <MenuItem  label="Sample Package"path="/micpackages" closeSidebar={closeSidebar} />
        

          <MenuItem label="Enquiry Form" path="/enquiryformmic" closeSidebar={closeSidebar} />
          <MenuItem label="Our Clients" path="/bankgallery" closeSidebar={closeSidebar} />
          <MenuItem label="Venue Photos" path="/venuephotos" closeSidebar={closeSidebar} />
          <MenuItem label="MICE Gallery" path="/micgallery" closeSidebar={closeSidebar} />
        </div>
      </div>
    </>
  );
};

//
// 🔹 Menu Item
//
const MenuItem: React.FC<MenuItemProps> = ({ label, path, closeSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = location.pathname === path;

  const handleClick = () => {
    navigate(path);
    closeSidebar(); // 🔥 auto close in mobile
  };

  return (
    <div
      onClick={handleClick}
      className={`mx-2.5 my-2.5 px-3 py-3 rounded border cursor-pointer transition
      ${
        isActive
          ? "bg-[#071c54] text-white border-[#071c54]"
          : "bg-white border-gray-300 hover:bg-gray-50"
      }`}
    >
      {label}
    </div>
  );
};

//
// 🔹 Sub Item
//
const SubItem: React.FC<SubItemProps> = ({ label, path, closeSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = location.pathname === path;

  const handleClick = () => {
    navigate(path);
    closeSidebar(); // 🔥 auto close
  };

  return (
    <div
      onClick={handleClick}
      className={`mx-2.5 my-1.5 px-2.5 py-2.5 rounded cursor-pointer transition
      ${
        isActive
          ? "bg-[#071c54] text-white font-semibold"
          : "bg-blue-50 hover:bg-blue-100"
      }`}
    >
      {label}
    </div>
  );
};

//
// 🔹 Dropdown Header
//
const DropdownHeader: React.FC<DropdownHeaderProps> = ({
  label,
  path,
  isOpen,
  setIsOpen,
  isActive,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={`px-3 py-3 rounded cursor-pointer flex justify-between items-center transition
      ${
        isActive
          ? "bg-[#071c54] text-white"
          : "bg-gray-100 hover:bg-gray-200"
      }`}
    >
      <span onClick={() => navigate(path)}>{label}</span>

      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        {isOpen ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
      </div>
    </div>
  );
};

export default Sidebar;