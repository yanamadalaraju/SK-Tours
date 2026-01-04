import {
  Ship, Compass, Phone, UserCircle, Home as HomeIcon, ChevronDown, Sparkles, Heart,
  GraduationCap, Car, Bus, Landmark, Umbrella, CalendarDays, Users, Shield, Star,
  UsersRound, Globe, MapPin, ChevronRight, PlaneTakeoff, UserPlus, Menu as MenuIcon,
  X as XIcon, ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "../assets/png[3].png"; 
import { useState, useRef } from "react";

const indianStates = [
  "Andaman", "Andhra Pradesh", "Bihar", "Chhattisgarh", "Dadra & Nagar Haveli", "Daman & Diu",
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir",
  "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh",
  "Maharashtra", "North East", "Odisha", "Puducherry", "Punjab & Haryana", "Rajasthan",
  "Seven Sisters", "Tamil Nadu", "Uttar Pradesh", "Uttarakhand", "West Bengal",
].sort();

const internationalDestinations = [
  "Africa", "America", "Australia NewZealand", "Bhutan", "Dubai and MiddleEast",
  "Eurasia", "Europe", "Japan China", "Mauritius", "Nepal", "Seychelles",
  "South East Asia", "SriLanka Maldives",
];

const Header = () => {
  const [showIndianIndividualStates, setShowIndianIndividualStates] = useState(false);
  const [showIndianGroupStates, setShowIndianGroupStates] = useState(false);
  const [showIndianLadiesStates, setShowIndianLadiesStates] = useState(false);
  const [showIndianSeniorStates, setShowIndianSeniorStates] = useState(false);
  const [showIndianStudentStates, setShowIndianStudentStates] = useState(false);
  const [showIndianHoneymoonStates, setShowIndianHoneymoonStates] = useState(false);
  const [showIntlIndividualStates, setShowIntlIndividualStates] = useState(false);
  const [showIntlGroupStates, setShowIntlGroupStates] = useState(false);
  const [showIntlLadiesStates, setShowIntlLadiesStates] = useState(false);
  const [showIntlSeniorStates, setShowIntlSeniorStates] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<Record<string, boolean>>({});
  
  // Timers for delayed close
  const indianIndividualTimer = useRef<NodeJS.Timeout | null>(null);
  const indianGroupTimer = useRef<NodeJS.Timeout | null>(null);
  const indianLadiesTimer = useRef<NodeJS.Timeout | null>(null);
  const indianSeniorTimer = useRef<NodeJS.Timeout | null>(null);
  const indianStudentTimer = useRef<NodeJS.Timeout | null>(null);
  const indianHoneymoonTimer = useRef<NodeJS.Timeout | null>(null);
  const intlIndividualTimer = useRef<NodeJS.Timeout | null>(null);
  const intlGroupTimer = useRef<NodeJS.Timeout | null>(null);
  const intlLadiesTimer = useRef<NodeJS.Timeout | null>(null);
  const intlSeniorTimer = useRef<NodeJS.Timeout | null>(null);

  const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);
  const toggleMobileSubmenu = (label: string) => {
    setMobileSubmenuOpen(prev => ({ ...prev, [label]: !prev[label] }));
  };

  // Helper to create delayed hover handlers
  const createHoverHandlers = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    timerRef: React.MutableRefObject<NodeJS.Timeout | null>
  ) => {
    const enter = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      setter(true);
    };
    const leave = () => {
      timerRef.current = setTimeout(() => {
        setter(false);
        timerRef.current = null;
      }, 300);
    };
    return { enter, leave };
  };

  const navItems = [
    { icon: HomeIcon, label: "Home", href: "/" },
    {
      icon: MapPin, label: "Indian Tours",
      dropdown: [
        { label: "Individual Tours", href: "#indian-individual", icon: Users, subDropdown: indianStates },
        { label: "Group Tours", href: "#indian-group", icon: UsersRound, subDropdown: indianStates },
        { label: "Ladies Special Tours", href: "#ladies-special", icon: UsersRound, subDropdown: indianStates },
        { label: "Senior Citizen Tours", href: "#senior-citizens", icon: UsersRound, subDropdown: indianStates },
        { label: "Students Tours", href: "#students-tours", icon: GraduationCap, subDropdown: indianStates },
        { label: "Honeymoon Tours", href: "#honeymoon-tours", icon: Heart, subDropdown: indianStates },
      ],
    },
    {
      icon: Globe, label: "International Tours",
      dropdown: [
        { label: "Individual Tours", href: "#international-tours-packages", icon: Users, subDropdown: internationalDestinations },
        { label: "Group Tours", href: "#international-tours_groups", icon: UsersRound, subDropdown: internationalDestinations },
        { label: "Ladies Special Tours", href: "#international-ladies_tours", icon: Sparkles, subDropdown: internationalDestinations },
        { label: "Senior Citizen Tours", href: "#international-senior_tours", icon: Heart, subDropdown: internationalDestinations },
        { label: "Students Tours", href: "#international-students_tours", icon: GraduationCap },
        { label: "Honeymoon Tours", href: "#international-honeymoon_tours", icon: Heart },
      ],
    },
    { 
      icon: PlaneTakeoff, 
      label: "Offline Flight/Hotels", 
      href: "#offline-flight-tickets",
      dropdown: [
        { label: "Offline Flight Rates", href: "/alert" },
        { label: "Offline Hotel Rates", href: "/alert" }
      ]
    },
    { icon: Ship, label: "Exhibitions", href: "/alert" },
    { icon: Compass, label: "MICE", href: "/alert" },
    {
      icon: Star, label: "Others",
      dropdown: [
        { label: "Bungalow / Villa", href: "/alert", icon: HomeIcon },
        { label: "Bus", href: "/alert", icon: Bus },
        { label: "Car", href: "/alert", icon: Car },
        { label: "Cruise", href: "/alert", icon: Ship },
        { label: "Festivals", href: "/alert", icon: Sparkles },
        { label: "Insurances", href: "/alert", icon: Umbrella },
        { label: "Passport", href: "/alert", icon: Landmark },
        { label: "Sports", href: "/alert", icon: Shield },
        { label: "Weekend Gateways", href: "/alert", icon: CalendarDays },
      ],
    },
    { icon: UsersRound, label: "About Us", href: "/about" },
    { icon: Phone, label: "Contact Us", href: "/contact" },
  ];

  // Helper function to generate href for destinations
  const getDestinationHref = (
    isIndian: boolean,
    isIndividualTour: boolean,
    isGroupTour: boolean,
    isLadiesTour: boolean,
    isSeniorTour: boolean,
    isStudentTour: boolean,
    isHoneymoonTour: boolean,
    destination: string
  ) => {
    if (isIndian) {
      // Indian tours routing
      if (isIndividualTour) {
        return `/tours-packages/${encodeURIComponent(destination)}`;
      } else if (isGroupTour) {
        return `/tours_groups/${encodeURIComponent(destination)}`;
      } else if (isLadiesTour) {
        return `/ladies_tours/${encodeURIComponent(destination)}`;
      } else if (isSeniorTour) {
        return `/senior_tours/${encodeURIComponent(destination)}`;
      } else if (isStudentTour) {
        return `/students_tours/${encodeURIComponent(destination)}`;
      } else if (isHoneymoonTour) {
        return `/honeymoon_tours/${encodeURIComponent(destination)}`;
      }
    } else {
      // International tours routing
      if (isIndividualTour) {
        return `/international-tours-packages/${encodeURIComponent(destination)}`;
      } else if (isGroupTour) {
        return `/international-tours_groups/${encodeURIComponent(destination)}`;
      } else if (isLadiesTour) {
        return `/international-ladies_tours/${encodeURIComponent(destination)}`;
      } else if (isSeniorTour) {
        return `/international-senior_tours/${encodeURIComponent(destination)}`;
      } else if (isStudentTour) {
        return `/international-students_tours/${encodeURIComponent(destination)}`;
      } else if (isHoneymoonTour) {
        return `/international-honeymoon_tours/${encodeURIComponent(destination)}`;
      }
    }
    return "#";
  };

  return (
    <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-xl border-b-2 border-blue-400 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          {/* LOGO */}
          <div className="flex items-center">
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-3 bg-white/10 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <img
                src={logo}
                alt="SK Tours Logo"
                className="h-12 sm:h-14 w-auto object-contain relative z-10 transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
              />
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {navItems.map((item, index) => (
              <div key={index} className="relative group">
                {!item.dropdown ? (
                  <a
                    href={item.href}
                    className="flex flex-col items-center px-3 sm:px-4 py-3 transition-all duration-300 hover:bg-white/15 rounded-lg min-w-[80px] sm:min-w-[90px]"
                  >
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </a>
                ) : (
                  <div className="relative">
                    <div className="flex flex-col items-center px-3 sm:px-4 py-3 transition-all duration-300 hover:bg-white/15 rounded-lg min-w-[100px] sm:min-w-[110px] cursor-pointer">
                      <item.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium">{item.label}</span>
                        <ChevronDown className="w-3 h-3" />
                      </div>
                    </div>
                    {/* MEGA DROPDOWN */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-red-50 text-gray-800 rounded-xl shadow-2xl w-44 sm:w-52 py-4 border border-gray-200 transition-all duration-300 ease-in-out z-50">
                      {item.dropdown.map((sub, idx) => {
                        const isIndian = item.label === "Indian Tours";
                        const isIntl = item.label === "International Tours";
                        const isIndividual = sub.label === "Individual Tours";
                        const isGroup = sub.label === "Group Tours";
                        const isLadies = sub.label === "Ladies Special Tours";
                        const isSenior = sub.label === "Senior Citizen Tours";
                        const isStudent = sub.label === "Students Tours";
                        const isHoneymoon = sub.label === "Honeymoon Tours";
                        
                        let showThisStates = false;
                        let enterHandler: (() => void) | null = null;
                        let leaveHandler: (() => void) | null = null;
                        let enterStatesHandler: (() => void) | null = null;
                        let leaveStatesHandler: (() => void) | null = null;
                        let topOffset = "top-0";

                        if (isIndian && isIndividual) {
                          showThisStates = showIndianIndividualStates;
                          const h = createHoverHandlers(setShowIndianIndividualStates, indianIndividualTimer);
                          enterHandler = h.enter;
                          leaveHandler = h.leave;
                          enterStatesHandler = h.enter;
                          leaveStatesHandler = h.leave;
                          topOffset = "top-[-1rem]";
                        } else if (isIndian && isGroup) {
                          showThisStates = showIndianGroupStates;
                          const h = createHoverHandlers(setShowIndianGroupStates, indianGroupTimer);
                          enterHandler = h.enter;
                          leaveHandler = h.leave;
                          enterStatesHandler = h.enter;
                          leaveStatesHandler = h.leave;
                          topOffset = "top-[-4rem]";
                        } else if (isIndian && isLadies) {
                          showThisStates = showIndianLadiesStates;
                          const h = createHoverHandlers(setShowIndianLadiesStates, indianLadiesTimer);
                          enterHandler = h.enter;
                          leaveHandler = h.leave;
                          enterStatesHandler = h.enter;
                          leaveStatesHandler = h.leave;
                          topOffset = "top-[-7rem]";
                        } else if (isIndian && isSenior) {
                          showThisStates = showIndianSeniorStates;
                          const h = createHoverHandlers(setShowIndianSeniorStates, indianSeniorTimer);
                          enterHandler = h.enter;
                          leaveHandler = h.leave;
                          enterStatesHandler = h.enter;
                          leaveStatesHandler = h.leave;
                          topOffset = "top-[-10rem]";
                        } else if (isIndian && isStudent) {
                          showThisStates = showIndianStudentStates;
                          const h = createHoverHandlers(setShowIndianStudentStates, indianStudentTimer);
                          enterHandler = h.enter;
                          leaveHandler = h.leave;
                          enterStatesHandler = h.enter;
                          leaveStatesHandler = h.leave;
                          topOffset = "top-[-13rem]";
                        } else if (isIndian && isHoneymoon) {
                          showThisStates = showIndianHoneymoonStates;
                          const h = createHoverHandlers(setShowIndianHoneymoonStates, indianHoneymoonTimer);
                          enterHandler = h.enter;
                          leaveHandler = h.leave;
                          enterStatesHandler = h.enter;
                          leaveStatesHandler = h.leave;
                          topOffset = "top-[-16rem]";
                        } else if (isIntl && isIndividual) {
                          showThisStates = showIntlIndividualStates;
                          const h = createHoverHandlers(setShowIntlIndividualStates, intlIndividualTimer);
                          enterHandler = h.enter;
                          leaveHandler = h.leave;
                          enterStatesHandler = h.enter;
                          leaveStatesHandler = h.leave;
                          topOffset = "top-[-1rem]";
                        } else if (isIntl && isGroup) {
                          showThisStates = showIntlGroupStates;
                          const h = createHoverHandlers(setShowIntlGroupStates, intlGroupTimer);
                          enterHandler = h.enter;
                          leaveHandler = h.leave;
                          enterStatesHandler = h.enter;
                          leaveStatesHandler = h.leave;
                          topOffset = "top-[-4rem]";
                        } else if (isIntl && isLadies) {
                          showThisStates = showIntlLadiesStates;
                          const h = createHoverHandlers(setShowIntlLadiesStates, intlLadiesTimer);
                          enterHandler = h.enter;
                          leaveHandler = h.leave;
                          enterStatesHandler = h.enter;
                          leaveStatesHandler = h.leave;
                          topOffset = "top-[-7rem]";
                        } else if (isIntl && isSenior) {
                          showThisStates = showIntlSeniorStates;
                          const h = createHoverHandlers(setShowIntlSeniorStates, intlSeniorTimer);
                          enterHandler = h.enter;
                          leaveHandler = h.leave;
                          enterStatesHandler = h.enter;
                          leaveStatesHandler = h.leave;
                          topOffset = "top-[-10rem]";
                        }

                        return (
                          <div key={idx} className="relative">
                            <div
                              className={`flex items-center px-2 sm:px-3 py-3.5 text-sm hover:bg-red-100 border-l-2 border-transparent hover:border-red-500 mx-1 sm:mx-2 rounded-lg block cursor-pointer transition-colors ${sub.subDropdown ? "pr-2" : ""}`}
                              onMouseEnter={enterHandler ?? undefined}
                              onMouseLeave={leaveHandler ?? undefined}
                            >
                              <a href={sub.href} className="flex items-center w-full">
                                {sub.icon && <sub.icon className="w-4 h-4 mr-2" />}
                                <span className="font-medium flex-grow">{sub.label}</span>
                                {sub.subDropdown && <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0" />}
                              </a>
                            </div>
                            {/* STATES / DESTINATIONS SUB-DROPDOWN */}
                            {sub.subDropdown && showThisStates && (
                              <div
                                className={`absolute left-full ${topOffset} ml-3 bg-white text-gray-800 rounded-xl shadow-2xl w-[400px] sm:w-[450px] py-4 border border-gray-200 opacity-100 visible transition-all duration-300 ease-in-out z-[60] max-h-[70vh] overflow-y-auto`}
                                onMouseEnter={enterStatesHandler ?? undefined}
                                onMouseLeave={leaveStatesHandler ?? undefined}
                              >
                                <table className="min-w-full divide-y divide-gray-200">
                                  <tbody className="bg-white divide-y divide-gray-200">
                                    {sub.subDropdown.reduce((rows: any[], dest, index) => {
                                      if (index % 3 === 0) rows.push([]);
                                      rows[rows.length - 1].push(dest);
                                      return rows;
                                    }, []).map((row, rowIndex) => (
                                      <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-blue-50" : "bg-blue-100"}>
                                        {row.map((dest: string, colIndex: number) => {
                                          const isAndaman = dest === "Andaman";
                                          const isIndividualTour = isIndividual;
                                          const isGroupTour = isGroup;
                                          const isLadiesTour = isLadies;
                                          const isSeniorTour = isSenior;
                                          const isStudentTour = isStudent;
                                          const isHoneymoonTour = isHoneymoon;
                                          
                                          // Generate href using the helper function
                                          const href = getDestinationHref(
                                            isIndian,
                                            isIndividualTour,
                                            isGroupTour,
                                            isLadiesTour,
                                            isSeniorTour,
                                            isStudentTour,
                                            isHoneymoonTour,
                                            dest
                                          );
                                          
                                          return (
                                            <td key={colIndex} className="w-1/3 px-2 py-2.5 whitespace-nowrap border-r border-gray-400">
                                              <a
                                                href={href}
                                                className={`block w-full text-sm font-medium text-left transition-colors ${isAndaman
                                                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-lg"
                                                  : `hover:text-blue-600 ${rowIndex % 2 === 0 ? 'hover:bg-blue-100' : 'hover:bg-blue-200'}`
                                                }`}
                                                title={dest}
                                              >
                                                {dest}
                                                {isAndaman && <Sparkles className="inline-block w-4 h-4 ml-1 animate-pulse" />}
                                              </a>
                                            </td>
                                          );
                                        })}
                                        {row.length < 3 && [...Array(3 - row.length)].map((_, colIndex) => (
                                          <td key={colIndex} className={`w-1/3 px-2 py-2.5 border-r border-gray-400 ${rowIndex % 2 === 0 ? "bg-blue-50" : "bg-blue-100"}`}></td>
                                        ))}
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Login/Signup - Vertical Layout */}
          <div className="hidden lg:flex flex-col items-end gap-2 ml-auto">
            {/* Sign Up */}
            <div className="relative group">
              <Button 
                variant="ghost" 
                size="sm" 
                className="bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-lg border border-green-600 flex items-center gap-2 w-[120px] justify-center"
              >
                <UserPlus className="w-4 h-4" />
                <span className="font-medium text-sm">Sign Up</span>
                <ChevronDown className="w-3 h-3" />
              </Button>
              <div className="absolute right-full top-0 mr-2 opacity-0 -translate-x-4 invisible group-hover:opacity-100 group-hover:translate-x-0 group-hover:visible bg-green-50 text-gray-800 rounded-xl shadow-2xl py-2 border border-green-200 transition-all duration-300 z-50 min-w-[140px]">
                <a href="#new-user" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-green-100 hover:text-green-700 rounded-lg transition-colors">
                  <UserPlus className="w-4 h-4 text-green-600" /> New User
                </a>
                <a href="#new-agent" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-green-100 hover:text-green-700 rounded-lg transition-colors">
                  <Users className="w-4 h-4 text-green-600" /> New Agent
                </a>
              </div>
            </div>

            {/* Login */}
            <div className="relative group">
              <Button 
                variant="ghost" 
                size="sm" 
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-lg border border-red-600 flex items-center gap-2 w-[120px] justify-center"
              >
                <UserCircle className="w-4 h-4" />
                <span className="font-medium text-sm">Login</span>
                <ChevronDown className="w-3 h-3" />
              </Button>
              <div className="absolute right-full top-0 mr-2 opacity-0 -translate-x-4 invisible group-hover:opacity-100 group-hover:translate-x-0 group-hover:visible bg-red-50 text-gray-800 rounded-xl shadow-2xl py-2 border border-red-200 transition-all duration-300 z-50 min-w-[140px]">
                <a href="#user-login" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-red-100 hover:text-red-700 rounded-lg transition-colors">
                  <UserCircle className="w-4 h-4 text-red-600" /> User Login
                </a>
                <a href="#agent-login" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-red-100 hover:text-red-700 rounded-lg transition-colors">
                  <Users className="w-4 h-4 text-red-600" /> Agent Login
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <nav className="lg:hidden bg-primary text-primary-foreground border-t border-blue-400">
            <ul className="flex flex-col">
              {navItems.map((item, index) => (
                <li key={index} className="border-b border-blue-500">
                  {!item.dropdown ? (
                    <a href={item.href} className="flex gap-2 items-center px-4 py-3 hover:bg-white/10 transition-colors">
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium text-sm">{item.label}</span>
                    </a>
                  ) : (
                    <>
                      <button
                        onClick={() => toggleMobileSubmenu(item.label)}
                        className="w-full flex justify-between items-center px-4 py-3 hover:bg-white/10 transition-colors font-medium text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <item.icon className="w-5 h-5" />
                          <span>{item.label}</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileSubmenuOpen[item.label] ? "rotate-180" : ""}`} />
                      </button>
                      {mobileSubmenuOpen[item.label] && (
                        <ul className="bg-primary border-t border-blue-500">
                          {item.dropdown.map((sub, i) => (
                            <li key={i} className="border-b border-blue-600">
                              {!sub.subDropdown ? (
                                <a href={sub.href} className="flex items-center gap-2 px-8 py-2 hover:bg-white/10 transition-colors font-normal text-sm">
                                  {sub.icon && <sub.icon className="w-4 h-4" />}
                                  <span>{sub.label}</span>
                                </a>
                              ) : (
                                <>
                                  <button
                                    onClick={() => toggleMobileSubmenu(sub.label)}
                                    className="w-full flex justify-between items-center px-8 py-2 hover:bg-white/10 transition-colors font-normal text-sm"
                                  >
                                    <div className="flex items-center gap-2">
                                      {sub.icon && <sub.icon className="w-4 h-4" />}
                                      <span>{sub.label}</span>
                                    </div>
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileSubmenuOpen[sub.label] ? "rotate-180" : ""}`} />
                                  </button>
                                  {mobileSubmenuOpen[sub.label] && (
                                    <ul className="bg-primary border-t border-blue-600">
                                      {sub.subDropdown.map((dest, j) => {
                                        const isIndian = item.label === "Indian Tours";
                                        const isIndividualTour = sub.label === "Individual Tours";
                                        const isGroupTour = sub.label === "Group Tours";
                                        const isLadiesTour = sub.label === "Ladies Special Tours";
                                        const isSeniorTour = sub.label === "Senior Citizen Tours";
                                        const isStudentTour = sub.label === "Students Tours";
                                        const isHoneymoonTour = sub.label === "Honeymoon Tours";
                                        
                                        // Generate href using the helper function
                                        const href = getDestinationHref(
                                          isIndian,
                                          isIndividualTour,
                                          isGroupTour,
                                          isLadiesTour,
                                          isSeniorTour,
                                          isStudentTour,
                                          isHoneymoonTour,
                                          dest
                                        );
                                        
                                        const isAndaman = dest === "Andaman";
                                        
                                        return (
                                          <li key={j}>
                                            <a
                                              href={href}
                                              className={`block px-12 py-2 text-sm font-medium ${isAndaman ? "text-cyan-400 font-bold" : "text-gray-300"} hover:text-white`}
                                            >
                                              {dest} {isAndaman && "(Featured)"}
                                            </a>
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  )}
                                </>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;