import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

interface MenuItemProps {
  label: string;
  path: string;
}

interface SubItemProps {
  label: string;
  path: string;
}

interface DropdownHeaderProps {
  label: string;
  path: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isActive: boolean;
}

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [openPackage, setOpenPackage] = useState<boolean>(false);
  const [openEvents, setOpenEvents] = useState<boolean>(false);

  // Check active states for main dropdown headers
  const isPackageActive = location.pathname === "/micpackages";
  const isEventsActive = location.pathname === "/events";

  return (
    <div className="sidebar-container w-56 bg-white py-2.5 border-r border-gray-300 font-sans">
      <MenuItem label="Home" path="/micpage" />
      <MenuItem label="About MICE" path="/aboutmic" />

      {/* SAMPLE PACKAGE DROPDOWN */}
      <div className="dropdown-wrapper mx-2.5 my-2.5">
        <DropdownHeader 
          label="Sample Package"
          path="/micpackages"
          isOpen={openPackage}
          setIsOpen={setOpenPackage}
          isActive={isPackageActive}
        />

        {openPackage && (
          <div className="dropdown-content mt-1">
            <SubItem label="Goa" path="/micpackages/goa" />
            <SubItem label="Australia" path="/micpackages/australia" />
            <SubItem label="Dubai" path="/micpackages/dubai" />
            <SubItem label="South Africa" path="/micpackages/south-africa" />
          </div>
        )}
      </div>

      <MenuItem label="Enquiry Form" path="/enquiryformmic" />
      <MenuItem label="Our Clients" path="/bankgallery" />
      <MenuItem label="Venue Photos" path="/venuephotos" />
      <MenuItem label="MICE Gallery" path="/micgallery" />

      {/* MICE UPCOMING EVENTS DROPDOWN */}
      <div className="dropdown-wrapper mx-2.5 my-2.5">
        <DropdownHeader 
          label="MICE Upcoming Events"
          path="/micupcomingevents"
          isOpen={openEvents}
          setIsOpen={setOpenEvents}
          isActive={isEventsActive}
        />

        {openEvents && (
          <div className="dropdown-content mt-1">
            <SubItem label="India Events" path="/events/india" />
            <SubItem label="International Events" path="/events/international" />
          </div>
        )}
      </div>
    </div>
  );
};

//
// 🔹 Dropdown Header with Navigation
//
const DropdownHeader: React.FC<DropdownHeaderProps> = ({ 
  label, 
  path, 
  isOpen, 
  setIsOpen, 
  isActive 
}) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    // Check if the click is on the chevron area
    const target = e.target as HTMLElement;
    if (target.closest('.chevron-area')) {
      e.stopPropagation();
      setIsOpen(!isOpen);
    } else {
      // Navigate to the main path
      navigate(path);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`px-3 py-3 rounded cursor-pointer flex justify-between items-center transition
        ${
          isActive
            ? "bg-[#071c54] text-white"
            : "bg-gray-100 text-black hover:bg-gray-200"
        }`}
    >
      <span>{label}</span>
      <div 
        className="chevron-area cursor-pointer"
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

//
// 🔹 Reusable Menu Item
//
const MenuItem: React.FC<MenuItemProps> = ({ label, path }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = location.pathname === path;

  return (
    <div
      onClick={() => navigate(path)}
      className={`mx-2.5 my-2.5 px-3 py-3 rounded border cursor-pointer transition duration-200
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
// 🔹 Reusable Sub Item
//
const SubItem: React.FC<SubItemProps> = ({ label, path }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = location.pathname === path;

  return (
    <div
      onClick={() => navigate(path)}
      className={`mx-2.5 my-1.5 px-2.5 py-2.5 rounded cursor-pointer transition duration-200
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

export default Sidebar;