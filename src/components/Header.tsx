
// import {
//   Ship,
//   Compass,
//   Phone,
//   UserCircle,
//   Home as HomeIcon,
//   ChevronDown,
//   Sparkles,
//   Heart,
//   GraduationCap,
//   Car,
//   Bus,
//   Landmark,
//   Umbrella,
//   CalendarDays,
//   Users,
//   Shield,
//   Star,
//   UsersRound,
//   Globe,
//   MapPin,
//   ChevronRight,
//   PlaneTakeoff,
//   UserPlus,
//   Menu as MenuIcon,
//   X as XIcon,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import logo from "../assets/png[3].png";
// import { useState } from "react";

// const indianStates = [
//   "Andaman & Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam",
//   "Bihar", "Chandigarh", "Chhattisgarh", "Dadra & Nagar Haveli", "Daman & Diu",
//   "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir",
//   "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh",
//   "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
//   "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
//   "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
// ].sort();

// const internationalDestinations = [
//   "Africa", "America", "Australia NewZealand", "Bhutan", "Dubai and MiddleEast",
//   "Eurasia", "Europe", "Japan China", "Mauritius", "Nepal", "Seychelles",
//   "South East Asia", "SriLanka Maldives",
// ];

// const Header = () => {
//   const [showIndianIndividualStates, setShowIndianIndividualStates] = useState(false);
//   const [showIndianGroupStates, setShowIndianGroupStates] = useState(false);
//   const [showIntlIndividualStates, setShowIntlIndividualStates] = useState(false);
//   const [showIntlGroupStates, setShowIntlGroupStates] = useState(false);

//   // Mobile menu state
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

//   // Mobile submenu state
//   const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState({});
//   const toggleMobileSubmenu = (label) => {
//     setMobileSubmenuOpen((prev) => ({
//       ...prev,
//       [label]: !prev[label],
//     }));
//   };

//   const navItems = [
//     { icon: HomeIcon, label: "Home", href: "/" },
//     {
//       icon: MapPin, label: "Indian Tours",
//       dropdown: [
//         { label: "Individual Tours", href: "#indian-individual", icon: Users, subDropdown: indianStates },
//         { label: "Group Tours", href: "#indian-group", icon: UsersRound, subDropdown: indianStates },
//         { label: "Ladies Special Tours", href: "#indian-ladies", icon: Sparkles },
//         { label: "Senior Citizen Tours", href: "#indian-senior", icon: Heart },
//         { label: "Students Tours", href: "#indian-students", icon: GraduationCap },
//         { label: "Honeymoon Tours", href: "#indian-honeymoon", icon: Heart },
//       ],
//     },
//     {
//       icon: Globe, label: "International Tours",
//       dropdown: [
//         { label: "Individual Tours", href: "#intl-individual", icon: Users, subDropdown: internationalDestinations },
//         { label: "Group Tours", href: "#intl-group", icon: UsersRound, subDropdown: internationalDestinations },
//         { label: "Ladies Special Tours", href: "#intl-ladies", icon: Sparkles },
//         { label: "Senior Citizen Tours", href: "#intl-senior", icon: Heart },
//         { label: "Students Tours", href: "#intl-students", icon: GraduationCap },
//         { label: "Honeymoon Tours", href: "#intl-honeymoon", icon: Heart },
//       ],
//     },
//     { icon: Ship, label: "Exhibitions", href: "#exhibitions" },
//     { icon: Compass, label: "MICE", href: "#mice" },
//     { icon: PlaneTakeoff, label: "Visa", href: "#visa" },
//     {
//       icon: Star, label: "Others",
//       dropdown: [
//         { label: "Weekend Gateways", href: "#weekend-gateways", icon: CalendarDays },
//         { label: "Bungalow / Villa", href: "#bungalow-villa", icon: HomeIcon },
//         { label: "Festivals", href: "#festivals", icon: Sparkles },
//         { label: "Sports", href: "#sports", icon: Shield },
//         { label: "Insurances", href: "#insurances", icon: Umbrella },
//         { label: "Bus", href: "#bus", icon: Bus },
//         { label: "Car", href: "#car", icon: Car },
//         { label: "Passport", href: "#passport", icon: Landmark },
//         { label: "Cruise", href: "#cruise", icon: Ship },
//       ],
//     },
//     { icon: UsersRound, label: "About Us", href: "#about" },
//     { icon: Phone, label: "Contact Us", href: "#contact" },
//   ];

//   return (
//     <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-xl border-b-2 border-blue-400 w-full">
//       <div className="w-full px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between py-3">
//           {/* LOGO */}
//           <div className="flex items-center">
//             <div className="relative group cursor-pointer">
//               <div className="absolute -inset-3 bg-white/10 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               <img
//                 src={logo}
//                 alt="SK Tours Logo"
//                 className="h-12 sm:h-14 w-auto object-contain relative z-10 transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
//               />
//             </div>
//           </div>

//           {/* Hamburger Icon for Mobile */}
//           <button
//             onClick={toggleMobileMenu}
//             className="lg:hidden text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
//             aria-label="Toggle Menu"
//           >
//             {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
//           </button>

//           {/* NAVIGATION DESKTOP */}
//           <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
//             {navItems.map((item, index) => (
//               <div key={index} className="relative group">
//                 {!item.dropdown ? (
//                   <a
//                     href={item.href}
//                     className="flex flex-col items-center px-3 sm:px-4 py-3 transition-all duration-300 hover:bg-white/15 rounded-lg min-w-[80px] sm:min-w-[90px]"
//                   >
//                     <item.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
//                     <span className="text-sm font-medium">{item.label}</span>
//                   </a>
//                 ) : (
//                   <div className="relative">
//                     <div className="flex flex-col items-center px-3 sm:px-4 py-3 transition-all duration-300 hover:bg-white/15 rounded-lg min-w-[100px] sm:min-w-[110px] cursor-pointer">
//                       <item.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
//                       <div className="flex items-center gap-1">
//                         <span className="text-sm font-medium">{item.label}</span>
//                         <ChevronDown className="w-3 h-3" />
//                       </div>
//                     </div>

//                     <div className="
//                       absolute left-1/2 -translate-x-1/2 top-full
//                       opacity-0 -translate-y-4 invisible
//                       group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible
//                       bg-white text-gray-800 rounded-xl shadow-2xl w-72 sm:w-80 py-4 border border-gray-200
//                       transition-all duration-300 ease-in-out
//                       z-50
//                     ">
//                       {item.dropdown.map((sub, idx) => {
//                         const isIndian = item.label === "Indian Tours";
//                         const isIntl = item.label === "International Tours";
//                         const isIndividual = sub.label === "Individual Tours";
//                         const isGroup = sub.label === "Group Tours";

//                         let showThisStates = false;
//                         let enterHandler = null;
//                         let leaveHandler = null;
//                         let enterStatesHandler = null;
//                         let leaveStatesHandler = null;

//                         if (isIndian) {
//                           if (isIndividual) {
//                             showThisStates = showIndianIndividualStates;
//                             enterHandler = () => setShowIndianIndividualStates(true);
//                             leaveHandler = () => setShowIndianIndividualStates(false);
//                             enterStatesHandler = () => setShowIndianIndividualStates(true);
//                             leaveStatesHandler = () => setShowIndianIndividualStates(false);
//                           } else if (isGroup) {
//                             showThisStates = showIndianGroupStates;
//                             enterHandler = () => setShowIndianGroupStates(true);
//                             leaveHandler = () => setShowIndianGroupStates(false);
//                             enterStatesHandler = () => setShowIndianGroupStates(true);
//                             leaveStatesHandler = () => setShowIndianGroupStates(false);
//                           }
//                         } else if (isIntl) {
//                           if (isIndividual) {
//                             showThisStates = showIntlIndividualStates;
//                             enterHandler = () => setShowIntlIndividualStates(true);
//                             leaveHandler = () => setShowIntlIndividualStates(false);
//                             enterStatesHandler = () => setShowIntlIndividualStates(true);
//                             leaveStatesHandler = () => setShowIntlIndividualStates(false);
//                           } else if (isGroup) {
//                             showThisStates = showIntlGroupStates;
//                             enterHandler = () => setShowIntlGroupStates(true);
//                             leaveHandler = () => setShowIntlGroupStates(false);
//                             enterStatesHandler = () => setShowIntlGroupStates(true);
//                             leaveStatesHandler = () => setShowIntlGroupStates(false);
//                           }
//                         }

//                         return (
//                           <div key={idx} className="relative">
//                             <div
//                               className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-3.5 text-sm hover:bg-blue-50 border-l-2 border-transparent hover:border-blue-500 mx-2 sm:mx-3 rounded-lg block cursor-pointer transition-colors ${
//                                 sub.subDropdown ? "pr-2" : ""
//                               }`}
//                               onMouseEnter={enterHandler}
//                               onMouseLeave={leaveHandler}
//                             >
//                               <a href={sub.href} className="flex items-center gap-2 sm:gap-3 w-full">
//                                 <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
//                                   <sub.icon className="w-4 h-4 text-blue-600" />
//                                 </div>
//                                 <span className="font-medium flex-grow">{sub.label}</span>
//                                 {sub.subDropdown && (
//                                   <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0" />
//                                 )}
//                               </a>
//                             </div>

//                             {sub.subDropdown && showThisStates && (
//                               <div
//                                 className="
//                                   absolute left-full top-0 -ml-4
//                                   bg-white text-gray-800 rounded-xl shadow-2xl w-[480px] sm:w-[520px] py-4 border border-gray-200
//                                   opacity-100 visible
//                                   transition-all duration-300 ease-in-out
//                                   z-50 max-h-[70vh] overflow-y-auto
//                                 "
//                                 onMouseEnter={enterStatesHandler}
//                                 onMouseLeave={leaveStatesHandler}
//                               >
//                                 <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 px-4">
//                                   {sub.subDropdown.map((dest, sIndex) => (
//                                     <a
//                                       key={sIndex}
//                                       href={`#${item.label
//                                         .toLowerCase()
//                                         .replace(/\s/g, "-")}-state-${dest
//                                         .toLowerCase()
//                                         .replace(/\s+/g, "-")}`}
//                                       className="block px-2 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg text-left transition-colors truncate leading-tight"
//                                       title={dest}
//                                     >
//                                       {dest}
//                                     </a>
//                                   ))}
//                                 </div>
//                               </div>
//                             )}
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </nav>

//           {/* SIGN UP AND LOGIN DESKTOP */}
//           <div className="hidden lg:flex items-center gap-2 ml-auto">
//             {/* SIGN UP DROPDOWN */}
//             <div className="relative group">
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 className="bg-white/10 hover:bg-white/20 text-white px-4 sm:px-5 py-2 rounded-lg border border-white/20 flex items-center gap-2"
//               >
//                 <UserPlus className="w-4 h-4" />
//                 <span className="font-medium text-sm">Sign Up</span>
//                 <ChevronDown className="w-3 h-3" />
//               </Button>
//               <div className="
//                 absolute right-0 top-full mt-2
//                 opacity-0 -translate-y-4 invisible
//                 group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible
//                 bg-white text-gray-800 rounded-xl shadow-2xl py-2 border border-gray-200
//                 transition-all duration-300 ease-in-out
//                 z-50 min-w-[140px]
//               ">
//                 <a
//                   href="#new-user"
//                   className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
//                 >
//                   <UserPlus className="w-4 h-4 text-blue-600" />
//                   New User
//                 </a>
//                 <a
//                   href="#new-agent"
//                   className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
//                 >
//                   <Users className="w-4 h-4 text-blue-600" />
//                   New Agent
//                 </a>
//               </div>
//             </div>

//             {/* LOGIN DROPDOWN */}
//             <div className="relative group">
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 className="bg-white/10 hover:bg-white/20 text-white px-4 sm:px-5 py-2 rounded-lg border border-white/20 flex items-center gap-2"
//               >
//                 <UserCircle className="w-4 h-4" />
//                 <span className="font-medium text-sm">Login</span>
//                 <ChevronDown className="w-3 h-3" />
//               </Button>
//               <div className="
//                 absolute right-0 top-full mt-2
//                 opacity-0 -translate-y-4 invisible
//                 group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible
//                 bg-white text-gray-800 rounded-xl shadow-2xl py-2 border border-gray-200
//                 transition-all duration-300 ease-in-out
//                 z-50 min-w-[140px]
//               ">
//                 <a
//                   href="#user-login"
//                   className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
//                 >
//                   <UserCircle className="w-4 h-4 text-blue-600" />
//                   User Login
//                 </a>
//                 <a
//                   href="#agent-login"
//                   className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
//                 >
//                   <Users className="w-4 h-4 text-blue-600" />
//                   Agent Login
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* MOBILE MENU */}
//         {mobileMenuOpen && (
//           <nav className="lg:hidden bg-primary text-primary-foreground border-t border-blue-400">
//             <ul className="flex flex-col">
//               {navItems.map((item, index) => (
//                 <li key={index} className="border-b border-blue-500">
//                   {!item.dropdown ? (
//                     <a
//                       href={item.href}
//                       className="flex gap-2 items-center px-4 py-3 hover:bg-white/10 transition-colors"
//                     >
//                       <item.icon className="w-5 h-5" />
//                       <span className="font-medium text-sm">{item.label}</span>
//                     </a>
//                   ) : (
//                     <>
//                       <button
//                         onClick={() => toggleMobileSubmenu(item.label)}
//                         className="w-full flex justify-between items-center px-4 py-3 hover:bg-white/10 transition-colors font-medium text-sm"
//                       >
//                         <div className="flex items-center gap-2">
//                           <item.icon className="w-5 h-5" />
//                           <span>{item.label}</span>
//                         </div>
//                         <ChevronDown
//                           className={`w-4 h-4 transition-transform duration-300 ${
//                             mobileSubmenuOpen[item.label] ? "rotate-180" : ""
//                           }`}
//                         />
//                       </button>
//                       {mobileSubmenuOpen[item.label] && (
//                         <ul className="bg-primary border-t border-blue-500">
//                           {item.dropdown.map((sub, i) => (
//                             <li key={i} className="border-b border-blue-600">
//                               {!sub.subDropdown ? (
//                                 <a
//                                   href={sub.href}
//                                   className="flex items-center gap-2 px-8 py-2 hover:bg-white/10 transition-colors font-normal text-sm"
//                                 >
//                                   <sub.icon className="w-4 h-4" />
//                                   <span>{sub.label}</span>
//                                 </a>
//                               ) : (
//                                 <>
//                                   <button
//                                     onClick={() => toggleMobileSubmenu(sub.label)}
//                                     className="w-full flex justify-between items-center px-8 py-2 hover:bg-white/10 transition-colors font-normal text-sm"
//                                   >
//                                     <div className="flex items-center gap-2">
//                                       <sub.icon className="w-4 h-4" />
//                                       <span>{sub.label}</span>
//                                     </div>
//                                     <ChevronDown
//                                       className={`w-4 h-4 transition-transform duration-300 ${
//                                         mobileSubmenuOpen[sub.label] ? "rotate-180" : ""
//                                       }`}
//                                     />
//                                   </button>
//                                   {mobileSubmenuOpen[sub.label] && (
//                                     <ul className="bg-primary border-t border-blue-600">
//                                       {sub.subDropdown.map((dest, j) => (
//                                         <li key={j} className="border-b border-blue-700">
//                                           <a
//                                             href={`#${item.label
//                                               .toLowerCase()
//                                               .replace(/\s/g, "-")}-state-${dest
//                                               .toLowerCase()
//                                               .replace(/\s+/g, "-")}`}
//                                             className="block px-12 py-1 text-sm hover:bg-white/20 transition-colors truncate"
//                                             title={dest}
//                                           >
//                                             {dest}
//                                           </a>
//                                         </li>
//                                       ))}
//                                     </ul>
//                                   )}
//                                 </>
//                               )}
//                             </li>
//                           ))}
//                         </ul>
//                       )}
//                     </>
//                   )}
//                 </li>
//               ))}

//               {/* Sign Up and Login for mobile */}
//               <li className="border-t border-blue-400 pt-2 flex flex-col gap-2 px-4 pb-4">
//                 <a
//                   href="#new-user"
//                   className="flex items-center gap-2 text-white hover:text-blue-300"
//                 >
//                   <UserPlus className="w-5 h-5" />
//                   New User Sign Up
//                 </a>
//                 <a
//                   href="#new-agent"
//                   className="flex items-center gap-2 text-white hover:text-blue-300"
//                 >
//                   <Users className="w-5 h-5" />
//                   New Agent Sign Up
//                 </a>
//                 <a
//                   href="#user-login"
//                   className="flex items-center gap-2 text-white hover:text-blue-300"
//                 >
//                   <UserCircle className="w-5 h-5" />
//                   User Login
//                 </a>
//                 <a
//                   href="#agent-login"
//                   className="flex items-center gap-2 text-white hover:text-blue-300"
//                 >
//                   <Users className="w-5 h-5" />
//                   Agent Login
//                 </a>
//               </li>
//             </ul>
//           </nav>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;






// // components/Header.tsx
// import {
//   Ship,
//   Compass,
//   Phone,
//   UserCircle,
//   Home as HomeIcon,
//   ChevronDown,
//   Sparkles,
//   Heart,
//   GraduationCap,
//   Car,
//   Bus,
//   Landmark,
//   Umbrella,
//   CalendarDays,
//   Users,
//   Shield,
//   Star,
//   UsersRound,
//   Globe,
//   MapPin,
//   ChevronRight,
//   PlaneTakeoff,
//   UserPlus,
//   Menu as MenuIcon,
//   X as XIcon,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import logo from "../assets/png[3].png";
// import { useState } from "react";

// const indianStates = [
//   "Andaman & Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam",
//   "Bihar", "Chandigarh", "Chhattisgarh", "Dadra & Nagar Haveli", "Daman & Diu",
//   "Delhi", "Goa", "Gujarat", "Haryana",  "Himachal Pradesh", "Jammu & Kashmir",
//   "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh",
//   "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
//   "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
//   "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
// ].sort();

// const internationalDestinations = [
//   "Africa", "America", "Australia NewZealand", "Bhutan", "Dubai and MiddleEast",
//   "Eurasia", "Europe", "Japan China", "Mauritius", "Nepal", "Seychelles",
//   "South East Asia", "SriLanka Maldives",
// ];

// const Header = () => {
//   const [showIndianIndividualStates, setShowIndianIndividualStates] = useState(false);
//   const [showIndianGroupStates, setShowIndianGroupStates] = useState(false);
//   const [showIntlIndividualStates, setShowIntlIndividualStates] = useState(false);
//   const [showIntlGroupStates, setShowIntlGroupStates] = useState(false);

//   // Mobile menu state
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState({});

//   const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);
//   const toggleMobileSubmenu = (label) => {
//     setMobileSubmenuOpen(prev => ({ ...prev, [label]: !prev[label] }));
//   };

//   const navItems = [
//     { icon: HomeIcon, label: "Home", href: "/" },
//     {
//       icon: MapPin, label: "Indian Tours",
//       dropdown: [
//         { label: "Individual Tours", href: "#indian-individual", icon: Users, subDropdown: indianStates },
//         { label: "Group Tours", href: "#indian-group", icon: UsersRound, subDropdown: indianStates },
//         { label: "Ladies Special Tours", href: "#indian-ladies", icon: Sparkles },
//         { label: "Senior Citizen Tours", href: "#indian-senior", icon: Heart },
//         { label: "Students Tours", href: "#indian-students", icon: GraduationCap },
//         { label: "Honeymoon Tours", href: "#indian-honeymoon", icon: Heart },
//       ],
//     },
//     {
//       icon: Globe, label: "International Tours",
//       dropdown: [
//         { label: "Individual Tours", href: "#intl-individual", icon: Users, subDropdown: internationalDestinations },
//         { label: "Group Tours", href: "#intl-group", icon: UsersRound, subDropdown: internationalDestinations },
//         { label: "Ladies Special Tours", href: "#intl-ladies", icon: Sparkles },
//         { label: "Senior Citizen Tours", href: "#intl-senior", icon: Heart },
//         { label: "Students Tours", href: "#intl-students", icon: GraduationCap },
//         { label: "Honeymoon Tours", href: "#intl-honeymoon", icon: Heart },
//       ],
//     },
//     { icon: Ship, label: "Exhibitions", href: "#exhibitions" },
//     { icon: Compass, label: "MICE", href: "#mice" },
//     { icon: PlaneTakeoff, label: "Visa", href: "#visa" },
//     {
//       icon: Star, label: "Others",
//       dropdown: [
//         { label: "Weekend Gateways", href: "#weekend-gateways", icon: CalendarDays },
//         { label: "Bungalow / Villa", href: "#bungalow-villa", icon: HomeIcon },
//         { label: "Festivals", href: "#festivals", icon: Sparkles },
//         { label: "Sports", href: "#sports", icon: Shield },
//         { label: "Insurances", href: "#insurances", icon: Umbrella },
//         { label: "Bus", href: "#bus", icon: Bus },
//         { label: "Car", href: "#car", icon: Car },
//         { label: "Passport", href: "#passport", icon: Landmark },
//         { label: "Cruise", href: "#cruise", icon: Ship },
//       ],
//     },
//     { icon: UsersRound, label: "About Us", href: "#about" },
//     { icon: Phone, label: "Contact Us", href: "#contact" },
//   ];

//   return (
//     <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-teal-900 text-white sticky top-0 z-50 shadow-2xl border-b-4 border-cyan-500">
//       <div className="w-full px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between py-4">
//           {/* LOGO */}
//           <div className="flex items-center">
//             <div className="relative group cursor-pointer">
//               <div className="absolute -inset-4 bg-white/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//               <img
//                 src={logo}
//                 alt="SK Tours Logo"
//                 className="h-14 sm:h-16 w-auto object-contain relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:brightness-125"
//               />
//             </div>
//           </div>

//           {/* Mobile Menu Toggle */}
//           <button
//             onClick={toggleMobileMenu}
//             className="lg:hidden p-3 rounded-lg bg-white/10 hover:bg-white/20 transition"
//             aria-label="Toggle Menu"
//           >
//             {mobileMenuOpen ? <XIcon className="w-7 h-7" /> : <MenuIcon className="w-7 h-7" />}
//           </button>

//           {/* DESKTOP NAVIGATION */}
//           <nav className="hidden lg:flex items-center gap-2 flex-1 justify-center">
//             {navItems.map((item, index) => (
//               <div key={index} className="relative group">
//                 {!item.dropdown ? (
//                   <a
//                     href={item.href}
//                     className="flex flex-col items-center px-5 py-4 rounded-xl hover:bg-white/15 transition-all duration-300 min-w-[100px]"
//                   >
//                     <item.icon className="w-6 h-6 mb-1" />
//                     <span className="text-xs font-semibold tracking-wide">{item.label}</span>
//                   </a>
//                 ) : (
//                   <div className="relative">
//                     <div className="flex flex-col items-center px-5 py-4 rounded-xl hover:bg-white/15 transition-all duration-300 cursor-pointer min-w-[120px]">
//                       <item.icon className="w-6 h-6 mb-1" />
//                       <div className="flex items-center gap-1">
//                         <span className="text-xs font-semibold tracking-wide">{item.label}</span>
//                         <ChevronDown className="w-4 h-4 mt-0.5" />
//                       </div>
//                     </div>

//                     {/* MEGA DROPDOWN */}
//                     <div className="
//                       absolute left-1/2 -translate-x-1/2 top-full mt-2
//                       opacity-0 -translate-y-6 invisible
//                       group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible
//                       bg-white text-gray-900 rounded-2xl shadow-2xl w-80 py-5 border border-gray-200
//                       transition-all duration-400 ease-out z-50
//                     ">
//                       {item.dropdown.map((sub, idx) => {
//                         const isIndian = item.label === "Indian Tours";
//                         const isIntl = item.label === "International Tours";
//                         const isIndividual = sub.label === "Individual Tours";
//                         const isGroup = sub.label === "Group Tours";

//                         let showThisStates = false;
//                         let enterHandler = null;
//                         let leaveHandler = null;
//                         let enterStatesHandler = null;
//                         let leaveStatesHandler = null;

//                         if (isIndian && isIndividual) {
//                           showThisStates = showIndianIndividualStates;
//                           enterHandler = () => setShowIndianIndividualStates(true);
//                           leaveHandler = () => setShowIndianIndividualStates(false);
//                           enterStatesHandler = () => setShowIndianIndividualStates(true);
//                           leaveStatesHandler = () => setShowIndianIndividualStates(false);
//                         } else if (isIndian && isGroup) {
//                           showThisStates = showIndianGroupStates;
//                           enterHandler = () => setShowIndianGroupStates(true);
//                           leaveHandler = () => setShowIndianGroupStates(false);
//                           enterStatesHandler = () => setShowIndianGroupStates(true);
//                           leaveStatesHandler = () => setShowIndianGroupStates(false);
//                         } else if (isIntl && isIndividual) {
//                           showThisStates = showIntlIndividualStates;
//                           enterHandler = () => setShowIntlIndividualStates(true);
//                           leaveHandler = () => setShowIntlIndividualStates(false);
//                           enterStatesHandler = () => setShowIntlIndividualStates(true);
//                           leaveStatesHandler = () => setShowIntlIndividualStates(false);
//                         } else if (isIntl && isGroup) {
//                           showThisStates = showIntlGroupStates;
//                           enterHandler = () => setShowIntlGroupStates(true);
//                           leaveHandler = () => setShowIntlGroupStates(false);
//                           enterStatesHandler = () => setShowIntlGroupStates(true);
//                           leaveStatesHandler = () => setShowIntlGroupStates(false);
//                         }

//                         return (
//                           <div key={idx} className="relative">
//                             <div
//                               className="flex items-center gap-4 px-6 py-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 rounded-lg mx-3 transition-all"
//                               onMouseEnter={enterHandler}
//                               onMouseLeave={leaveHandler}
//                             >
//                               <a href={sub.href} className="flex items-center gap-4 w-full">
//                                 <div className="p-2.5 bg-blue-100 rounded-xl">
//                                   <sub.icon className="w-5 h-5 text-blue-700" />
//                                 </div>
//                                 <span className="font-semibold text-gray-800">{sub.label}</span>
//                                 {sub.subDropdown && <ChevronRight className="w-5 h-5 ml-auto text-gray-500" />}
//                               </a>
//                             </div>

//                             {/* SUB-STATES DROPDOWN */}
//                             {sub.subDropdown && showThisStates && (
//                               <div
//                                 className="absolute left-full top-0 -ml-2 bg-white rounded-2xl shadow-2xl w-[520px] py-6 border border-gray-200 z-50 max-h-[70vh] overflow-y-auto"
//                                 onMouseEnter={enterStatesHandler}
//                                 onMouseLeave={leaveStatesHandler}
//                               >
//                                 <div className="grid grid-cols-4 gap-3 px-6">
//                                   {sub.subDropdown.map((dest, sIndex) => {
//                                     const isAndaman = dest === "Andaman & Nicobar Islands";
//                                     const href = isAndaman
//                                       ? "/tours-packages"
//                                       : `#${item.label.toLowerCase().replace(/\s/g, "-")}-${dest.toLowerCase().replace(/\s+/g, "-")}`;

//                                     return (
//                                       <a
//                                         key={sIndex}
//                                         href={href}
//                                         className={`block px-4 py-3 text-sm font-medium rounded-xl text-center transition-all duration-200 truncate
//                                           ${isAndaman
//                                             ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg hover:from-cyan-600 hover:to-blue-700 scale-105"
//                                             : "hover:bg-blue-50 hover:text-blue-700"
//                                           }`}
//                                         title={dest}
//                                       >
//                                         {dest}
//                                         {isAndaman && <Sparkles className="inline-block w-4 h-4 ml-1 animate-pulse" />}
//                                       </a>
//                                     );
//                                   })}
//                                 </div>
//                               </div>
//                             )}
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </nav>

//           {/* SIGN UP / LOGIN (Desktop) */}
//           <div className="hidden lg:flex items-center gap-4">
//             <div className="relative group">
//               <Button variant="ghost" className="bg-white/10 hover:bg-white/20 border border-white/30 rounded-xl px-6 py-3 flex items-center gap-3">
//                 <UserPlus className="w-5 h-5" />
//                 <span className="font-semibold">Sign Up</span>
//                 <ChevronDown className="w-4 h-4" />
//               </Button>
//               <div className="absolute right-0 top-full mt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 bg-white text-gray-800 rounded-xl shadow-2xl py-3 w-48 border border-gray-200 z-50">
//                 <a href="#new-user" className="flex items-center gap-3 px-5 py-3 hover:bg-blue-50">
//                   <UserPlus className="w-5 h-5 text-blue-600" /> New User
//                 </a>
//                 <a href="#new-agent" className="flex items-center gap-3 px-5 py-3 hover:bg-blue-50">
//                   <Users className="w-5 h-5 text-blue-600" /> New Agent
//                 </a>
//               </div>
//             </div>

//             <div className="relative group">
//               <Button variant="ghost" className="bg-white/10 hover:bg-white/20 border border-white/30 rounded-xl px-6 py-3 flex items-center gap-3">
//                 <UserCircle className="w-5 h-5" />
//                 <span className="font-semibold">Login</span>
//                 <ChevronDown className="w-4 h-4" />
//               </Button>
//               <div className="absolute right-0 top-full mt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 bg-white text-gray-800 rounded-xl shadow-2xl py-3 w-48 border border-gray-200 z-50">
//                 <a href="#user-login" className="flex items-center gap-3 px-5 py-3 hover:bg-blue-50">
//                   <UserCircle className="w-5 h-5 text-blue-600" /> User Login
//                 </a>
//                 <a href="#agent-login" className="flex items-center gap-3 px-5 py-3 hover:bg-blue-50">
//                   <Users className="w-5 h-5 text-blue-600" /> Agent Login
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* MOBILE MENU */}
//         {mobileMenuOpen && (
//           <nav className="lg:hidden bg-gradient-to-b from-blue-900 to-blue-800 border-t-4 border-cyan-500">
//             <ul className="py-4">
//               {navItems.map((item, index) => (
//                 <li key={index} className="border-b border-blue-700 last:border-0">
//                   {!item.dropdown ? (
//                     <a href={item.href} className="flex items-center gap-4 px-6 py-4 hover:bg-white/10">
//                       <item.icon className="w-6 h-6" />
//                       <span className="font-medium">{item.label}</span>
//                     </a>
//                   ) : (
//                     <>
//                       <button
//                         onClick={() => toggleMobileSubmenu(item.label)}
//                         className="w-full flex justify-between items-center px-6 py-4 hover:bg-white/10"
//                       >
//                         <div className="flex items-center gap-4">
//                           <item.icon className="w-6 h-6" />
//                           <span className="font-medium">{item.label}</span>
//                         </div>
//                         <ChevronDown className={`w-5 h-5 transition-transform ${mobileSubmenuOpen[item.label] ? "rotate-180" : ""}`} />
//                       </button>
//                       {mobileSubmenuOpen[item.label] && (
//                         <ul className="bg-blue-900/50">
//                           {item.dropdown.map((sub, i) => (
//                             <li key={i}>
//                               {!sub.subDropdown ? (
//                                 <a href={sub.href} className="flex items-center gap-4 px-12 py-3 hover:bg-white/10">
//                                   <sub.icon className="w-5 h-5" />
//                                   <span>{sub.label}</span>
//                                 </a>
//                               ) : (
//                                 <>
//                                   <button
//                                     onClick={() => toggleMobileSubmenu(sub.label)}
//                                     className="w-full flex justify-between items-center px-12 py-3 hover:bg-white/10"
//                                   >
//                                     <div className="flex items-center gap-4">
//                                       <sub.icon className="w-5 h-5" />
//                                       <span>{sub.label}</span>
//                                     </div>
//                                     <ChevronDown className={`w-5 h-5 transition-transform ${mobileSubmenuOpen[sub.label] ? "rotate-180" : ""}`} />
//                                   </button>
//                                   {mobileSubmenuOpen[sub.label] && (
//                                     <ul className="bg-blue-950/70">
//                                       {sub.subDropdown.map((dest, j) => {
//                                         const isAndaman = dest === "Andaman & Nicobar Islands";
//                                         return (
//                                           <li key={j}>
//                                             <a
//                                               href={isAndaman ? "/tours-packages" : "#"}
//                                               className={`block px-16 py-2.5 text-sm ${isAndaman ? "text-cyan-400 font-bold" : "text-gray-300"} hover:text-white`}
//                                             >
//                                               {dest} {isAndaman && "Featured"}
//                                             </a>
//                                           </li>
//                                         );
//                                       })}
//                                     </ul>
//                                   )}
//                                 </>
//                               )}
//                             </li>
//                           ))}
//                         </ul>
//                       )}
//                     </>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;





// // components/Header.tsx
// import {
//   Ship, Compass, Phone, UserCircle, Home as HomeIcon, ChevronDown, Sparkles, Heart,
//   GraduationCap, Car, Bus, Landmark, Umbrella, CalendarDays, Users, Shield, Star,
//   UsersRound, Globe, MapPin, ChevronRight, PlaneTakeoff, UserPlus, Menu as MenuIcon,
//   X as XIcon,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import logo from "../assets/png[3].png";
// import { useState } from "react";

// const indianStates = [
//   "Andaman & Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam",
//   "Bihar", "Chandigarh", "Chhattisgarh", "Dadra & Nagar Haveli", "Daman & Diu",
//   "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir",
//   "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh",
//   "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
//   "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
//   "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
// ].sort();

// const internationalDestinations = [
//   "Africa", "America", "Australia NewZealand", "Bhutan", "Dubai and MiddleEast",
//   "Eurasia", "Europe", "Japan China", "Mauritius", "Nepal", "Seychelles",
//   "South East Asia", "SriLanka Maldives",
// ];

// const Header = () => {
//   const [showIndianIndividualStates, setShowIndianIndividualStates] = useState(false);
//   const [showIndianGroupStates, setShowIndianGroupStates] = useState(false);
//   const [showIntlIndividualStates, setShowIntlIndividualStates] = useState(false);
//   const [showIntlGroupStates, setShowIntlGroupStates] = useState(false);

//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState({});

//   const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);
//   const toggleMobileSubmenu = (label: string) => {
//     setMobileSubmenuOpen(prev => ({ ...prev, [label]: !prev[label] }));
//   };

//   const navItems = [
//     { icon: HomeIcon, label: "Home", href: "/" },
//     {
//       icon: MapPin, label: "Indian Tours",
//       dropdown: [
//         { label: "Individual Tours", href: "#indian-individual", icon: Users, subDropdown: indianStates },
//         { label: "Group Tours", href: "#indian-group", icon: UsersRound, subDropdown: indianStates },
//         { label: "Ladies Special Tours", href: "#indian-ladies", icon: Sparkles },
//         { label: "Senior Citizen Tours", href: "#indian-senior", icon: Heart },
//         { label: "Students Tours", href: "#indian-students", icon: GraduationCap },
//         { label: "Honeymoon Tours", href: "#indian-honeymoon", icon: Heart },
//       ],
//     },
//     {
//       icon: Globe, label: "International Tours",
//       dropdown: [
//         { label: "Individual Tours", href: "#intl-individual", icon: Users, subDropdown: internationalDestinations },
//         { label: "Group Tours", href: "#intl-group", icon: UsersRound, subDropdown: internationalDestinations },
//         { label: "Ladies Special Tours", href: "#intl-ladies", icon: Sparkles },
//         { label: "Senior Citizen Tours", href: "#intl-senior", icon: Heart },
//         { label: "Students Tours", href: "#intl-students", icon: GraduationCap },
//         { label: "Honeymoon Tours", href: "#intl-honeymoon", icon: Heart },
//       ],
//     },
//     { icon: Ship, label: "Exhibitions", href: "#exhibitions" },
//     { icon: Compass, label: "MICE", href: "#mice" },
//     { icon: PlaneTakeoff, label: "Visa", href: "#visa" },
//     {
//       icon: Star, label: "Others",
//       dropdown: [
//   { label: "Bungalow / Villa", href: "#bungalow-villa", icon: HomeIcon },
//   { label: "Bus", href: "#bus", icon: Bus },
//   { label: "Car", href: "#car", icon: Car },
//   { label: "Cruise", href: "#cruise", icon: Ship },
//   { label: "Festivals", href: "#festivals", icon: Sparkles },
//   { label: "Insurances", href: "#insurances", icon: Umbrella },
//   { label: "Passport", href: "#passport", icon: Landmark },
//   { label: "Sports", href: "#sports", icon: Shield },
//   { label: "Weekend Gateways", href: "#weekend-gateways", icon: CalendarDays },
// ],

//     },
//     { icon: UsersRound, label: "About Us", href: "#about" },
//     { icon: Phone, label: "Contact Us", href: "#contact" },
//   ];

//   return (
//     <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-xl border-b-2 border-blue-400 w-full">
//       <div className="w-full px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between py-3">
//           {/* LOGO */}
//           <div className="flex items-center">
//             <div className="relative group cursor-pointer">
//               <div className="absolute -inset-3 bg-white/10 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               <img
//                 src={logo}
//                 alt="SK Tours Logo"
//                 className="h-12 sm:h-14 w-auto object-contain relative z-10 transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
//               />
//             </div>
//           </div>

//           {/* Mobile Toggle */}
//           <button
//             onClick={toggleMobileMenu}
//             className="lg:hidden text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
//           >
//             {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
//           </button>

//           {/* DESKTOP NAV */}
//           <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
//             {navItems.map((item, index) => (
//               <div key={index} className="relative group">
//                 {!item.dropdown ? (
//                   <a
//                     href={item.href}
//                     className="flex flex-col items-center px-3 sm:px-4 py-3 transition-all duration-300 hover:bg-white/15 rounded-lg min-w-[80px] sm:min-w-[90px]"
//                   >
//                     <item.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
//                     <span className="text-sm font-medium">{item.label}</span>
//                   </a>
//                 ) : (
//                   <div className="relative">
//                     <div className="flex flex-col items-center px-3 sm:px-4 py-3 transition-all duration-300 hover:bg-white/15 rounded-lg min-w-[100px] sm:min-w-[110px] cursor-pointer">
//                       <item.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
//                       <div className="flex items-center gap-1">
//                         <span className="text-sm font-medium">{item.label}</span>
//                         <ChevronDown className="w-3 h-3" />
//                       </div>
//                     </div>

//                     {/* MEGA DROPDOWN */}
//                     <div className="absolute left-1/2 -translate-x-1/2 top-full opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-white text-gray-800 rounded-xl shadow-2xl w-72 sm:w-80 py-4 border border-gray-200 transition-all duration-300 ease-in-out z-50">
//                       {item.dropdown.map((sub, idx) => {
//                         const isIndian = item.label === "Indian Tours";
//                         const isIntl = item.label === "International Tours";
//                         const isIndividual = sub.label === "Individual Tours";
//                         const isGroup = sub.label === "Group Tours";

//                         let showThisStates = false;
//                         let enterHandler = null;
//                         let leaveHandler = null;
//                         let enterStatesHandler = null;
//                         let leaveStatesHandler = null;

//                         if (isIndian && isIndividual) {
//                           showThisStates = showIndianIndividualStates;
//                           enterHandler = () => setShowIndianIndividualStates(true);
//                           leaveHandler = () => setShowIndianIndividualStates(false);
//                           enterStatesHandler = () => setShowIndianIndividualStates(true);
//                           leaveStatesHandler = () => setShowIndianIndividualStates(false);
//                         } else if (isIndian && isGroup) {
//                           showThisStates = showIndianGroupStates;
//                           enterHandler = () => setShowIndianGroupStates(true);
//                           leaveHandler = () => setShowIndianGroupStates(false);
//                           enterStatesHandler = () => setShowIndianGroupStates(true);
//                           leaveStatesHandler = () => setShowIndianGroupStates(false);
//                         } else if (isIntl && isIndividual) {
//                           showThisStates = showIntlIndividualStates;
//                           enterHandler = () => setShowIntlIndividualStates(true);
//                           leaveHandler = () => setShowIntlIndividualStates(false);
//                           enterStatesHandler = () => setShowIntlIndividualStates(true);
//                           leaveStatesHandler = () => setShowIntlIndividualStates(false);
//                         } else if (isIntl && isGroup) {
//                           showThisStates = showIntlGroupStates;
//                           enterHandler = () => setShowIntlGroupStates(true);
//                           leaveHandler = () => setShowIntlGroupStates(false);
//                           enterStatesHandler = () => setShowIntlGroupStates(true);
//                           leaveStatesHandler = () => setShowIntlGroupStates(false);
//                         }

//                         return (
//                           <div key={idx} className="relative">
//                             <div
//                               className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-3.5 text-sm hover:bg-blue-50 border-l-2 border-transparent hover:border-blue-500 mx-2 sm:mx-3 rounded-lg block cursor-pointer transition-colors ${sub.subDropdown ? "pr-2" : ""}`}
//                               onMouseEnter={enterHandler}
//                               onMouseLeave={leaveHandler}
//                             >
//                               <a href={sub.href} className="flex items-center gap-2 sm:gap-3 w-full">
//                                 <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
//                                   <sub.icon className="w-4 h-4 text-blue-600" />
//                                 </div>
//                                 <span className="font-medium flex-grow">{sub.label}</span>
//                                 {sub.subDropdown && <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0" />}
//                               </a>
//                             </div>

//                             {/* STATES LIST - SPECIAL LINK FOR ANDAMAN */}
//                             {sub.subDropdown && showThisStates && (
//                               <div
//                                 className="absolute left-full top-0 -ml-4 bg-white text-gray-800 rounded-xl shadow-2xl w-[480px] sm:w-[520px] py-4 border border-gray-200 opacity-100 visible transition-all duration-300 ease-in-out z-50 max-h-[70vh] overflow-y-auto"
//                                 onMouseEnter={enterStatesHandler}
//                                 onMouseLeave={leaveStatesHandler}
//                               >
//                                 <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 px-4">
//                                   {sub.subDropdown.map((dest, sIndex) => {
//                                     const isAndaman = dest === "Andaman & Nicobar Islands";
//                                     const href = isAndaman
//                                       ? "/tours-packages"  // This is the only change
//                                       : `#${item.label.toLowerCase().replace(/\s/g, "-")}-state-${dest.toLowerCase().replace(/\s+/g, "-")}`;

//                                     return (
//                                       <a
//                                         key={sIndex}
//                                         href={href}
//                                         className={`block px-3 py-2.5 text-sm font-medium rounded-lg text-center transition-colors truncate leading-tight
//                                           ${isAndaman
//                                             ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-lg"
//                                             : "hover:bg-blue-50 hover:text-blue-600"
//                                           }`}
//                                         title={dest}
//                                       >
//                                         {dest}
//                                         {isAndaman && <Sparkles className="inline-block w-4 h-4 ml-1 animate-pulse" />}
//                                       </a>
//                                     );
//                                   })}
//                                 </div>
//                               </div>
//                             )}
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </nav>

//           {/* Desktop Login/Signup */}
//           <div className="hidden lg:flex items-center gap-2 ml-auto">
//             {/* Sign Up */}
//             <div className="relative group">
//               <Button variant="ghost" size="sm" className="bg-white/10 hover:bg-white/20 text-white px-4 sm:px-5 py-2 rounded-lg border border-white/20 flex items-center gap-2">
//                 <UserPlus className="w-4 h-4" />
//                 <span className="font-medium text-sm">Sign Up</span>
//                 <ChevronDown className="w-3 h-3" />
//               </Button>
//               <div className="absolute right-0 top-full mt-2 opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-white text-gray-800 rounded-xl shadow-2xl py-2 border border-gray-200 transition-all duration-300 z-50 min-w-[140px]">
//                 <a href="#new-user" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <UserPlus className="w-4 h-4 text-blue-600" /> New User
//                 </a>
//                 <a href="#new-agent" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <Users className="w-4 h-4 text-blue-600" /> New Agent
//                 </a>
//               </div>
//             </div>

//             {/* Login */}
//             <div className="relative group">
//               <Button variant="ghost" size="sm" className="bg-white/10 hover:bg-white/20 text-white px-4 sm:px-5 py-2 rounded-lg border border-white/20 flex items-center gap-2">
//                 <UserCircle className="w-4 h-4" />
//                 <span className="font-medium text-sm">Login</span>
//                 <ChevronDown className="w-3 h-3" />
//               </Button>
//               <div className="absolute right-0 top-full mt-2 opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-white text-gray-800 rounded-xl shadow-2xl py-2 border border-gray-200 transition-all duration-300 z-50 min-w-[140px]">
//                 <a href="#user-login" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <UserCircle className="w-4 h-4 text-blue-600" /> User Login
//                 </a>
//                 <a href="#agent-login" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <Users className="w-4 h-4 text-blue-600" /> Agent Login
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* MOBILE MENU - Also updated for Andaman */}
//         {mobileMenuOpen && (
//           <nav className="lg:hidden bg-primary text-primary-foreground border-t border-blue-400">
//             <ul className="flex flex-col">
//               {navItems.map((item, index) => (
//                 <li key={index} className="border-b border-blue-500">
//                   {!item.dropdown ? (
//                     <a href={item.href} className="flex gap-2 items-center px-4 py-3 hover:bg-white/10 transition-colors">
//                       <item.icon className="w-5 h-5" />
//                       <span className="font-medium text-sm">{item.label}</span>
//                     </a>
//                   ) : (
//                     <>
//                       <button
//                         onClick={() => toggleMobileSubmenu(item.label)}
//                         className="w-full flex justify-between items-center px-4 py-3 hover:bg-white/10 transition-colors font-medium text-sm"
//                       >
//                         <div className="flex items-center gap-2">
//                           <item.icon className="w-5 h-5" />
//                           <span>{item.label}</span>
//                         </div>
//                         <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileSubmenuOpen[item.label] ? "rotate-180" : ""}`} />
//                       </button>
//                       {mobileSubmenuOpen[item.label] && (
//                         <ul className="bg-primary border-t border-blue-500">
//                           {item.dropdown.map((sub, i) => (
//                             <li key={i} className="border-b border-blue-600">
//                               {!sub.subDropdown ? (
//                                 <a href={sub.href} className="flex items-center gap-2 px-8 py-2 hover:bg-white/10 transition-colors font-normal text-sm">
//                                   <sub.icon className="w-4 h-4" />
//                                   <span>{sub.label}</span>
//                                 </a>
//                               ) : (
//                                 <>
//                                   <button
//                                     onClick={() => toggleMobileSubmenu(sub.label)}
//                                     className="w-full flex justify-between items-center px-8 py-2 hover:bg-white/10 transition-colors font-normal text-sm"
//                                   >
//                                     <div className="flex items-center gap-2">
//                                       <sub.icon className="w-4 h-4" />
//                                       <span>{sub.label}</span>
//                                     </div>
//                                     <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileSubmenuOpen[sub.label] ? "rotate-180" : ""}`} />
//                                   </button>
//                                   {mobileSubmenuOpen[sub.label] && (
//                                     <ul className="bg-primary border-t border-blue-600">
//                                       {sub.subDropdown.map((dest, j) => {
//                                         const isAndaman = dest === "Andaman & Nicobar Islands";
//                                         return (
//                                           <li key={j}>
//                                             <a
//                                               href={isAndaman ? "/tours-packages" : "#"}
//                                               className={`block px-12 py-2 text-sm font-medium ${isAndaman ? "text-cyan-400 font-bold" : "text-gray-300"} hover:text-white`}
//                                             >
//                                               {dest} {isAndaman && "(Featured)"}
//                                             </a>
//                                           </li>
//                                         );
//                                       })}
//                                     </ul>
//                                   )}
//                                 </>
//                               )}
//                             </li>
//                           ))}
//                         </ul>
//                       )}
//                     </>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;





// import {
//   Ship, Compass, Phone, UserCircle, Home as HomeIcon, ChevronDown, Sparkles, Heart,
//   GraduationCap, Car, Bus, Landmark, Umbrella, CalendarDays, Users, Shield, Star,
//   UsersRound, Globe, MapPin, ChevronRight, PlaneTakeoff, UserPlus, Menu as MenuIcon,
//   X as XIcon,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import logo from "../assets/png[3].png";
// import { useState } from "react";
// const indianStates = [
//   "Andaman & Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam",
//   "Bihar", "Chandigarh", "Chhattisgarh", "Dadra & Nagar Haveli", "Daman & Diu",
//   "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir",
//   "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh",
//   "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
//   "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
//   "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
// ].sort();
// const internationalDestinations = [
//   "Africa", "America", "Australia NewZealand", "Bhutan", "Dubai and MiddleEast",
//   "Eurasia", "Europe", "Japan China", "Mauritius", "Nepal", "Seychelles",
//   "South East Asia", "SriLanka Maldives",
// ];
// const Header = () => {
//   const [showIndianIndividualStates, setShowIndianIndividualStates] = useState(false);
//   const [showIndianGroupStates, setShowIndianGroupStates] = useState(false);
//   const [showIntlIndividualStates, setShowIntlIndividualStates] = useState(false);
//   const [showIntlGroupStates, setShowIntlGroupStates] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState({});
//   const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);
//   const toggleMobileSubmenu = (label: string) => {
//     setMobileSubmenuOpen(prev => ({ ...prev, [label]: !prev[label] }));
//   };
//   const navItems = [
//     { icon: HomeIcon, label: "Home", href: "/" },
//     {
//       icon: MapPin, label: "Indian Tours",
//       dropdown: [
//         { label: "Individual Tours", href: "#indian-individual", icon: Users, subDropdown: indianStates },
//         { label: "Group Tours", href: "#indian-group", icon: UsersRound, subDropdown: indianStates },
//         { label: "Ladies Special Tours", href: "#indian-ladies", icon: Sparkles },
//         { label: "Senior Citizen Tours", href: "#indian-senior", icon: Heart },
//         { label: "Students Tours", href: "#indian-students", icon: GraduationCap },
//         { label: "Honeymoon Tours", href: "#indian-honeymoon", icon: Heart },
//       ],
//     },
//     {
//       icon: Globe, label: "International Tours",
//       dropdown: [
//         { label: "Individual Tours", href: "#intl-individual", icon: Users, subDropdown: internationalDestinations },
//         { label: "Group Tours", href: "#intl-group", icon: UsersRound, subDropdown: internationalDestinations },
//         { label: "Ladies Special Tours", href: "#intl-ladies", icon: Sparkles },
//         { label: "Senior Citizen Tours", href: "#intl-senior", icon: Heart },
//         { label: "Students Tours", href: "#intl-students", icon: GraduationCap },
//         { label: "Honeymoon Tours", href: "#intl-honeymoon", icon: Heart },
//       ],
//     },
//     { icon: Ship, label: "Exhibitions", href: "#exhibitions" },
//     { icon: Compass, label: "MICE", href: "#mice" },
//     { icon: PlaneTakeoff, label: "Visa", href: "#visa" },
//     {
//       icon: Star, label: "Others",
//       dropdown: [
//   { label: "Bungalow / Villa", href: "#bungalow-villa", icon: HomeIcon },
//   { label: "Bus", href: "#bus", icon: Bus },
//   { label: "Car", href: "#car", icon: Car },
//   { label: "Cruise", href: "#cruise", icon: Ship },
//   { label: "Festivals", href: "#festivals", icon: Sparkles },
//   { label: "Insurances", href: "#insurances", icon: Umbrella },
//   { label: "Passport", href: "#passport", icon: Landmark },
//   { label: "Sports", href: "#sports", icon: Shield },
//   { label: "Weekend Gateways", href: "#weekend-gateways", icon: CalendarDays },
// ],
//     },
//     { icon: UsersRound, label: "About Us", href: "#about" },
//     { icon: Phone, label: "Contact Us", href: "#contact" },
//   ];
//   return (
//     <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-xl border-b-2 border-blue-400 w-full">
//       <div className="w-full px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between py-3">
//           {/* LOGO */}
//           <div className="flex items-center">
//             <div className="relative group cursor-pointer">
//               <div className="absolute -inset-3 bg-white/10 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               <img
//                 src={logo}
//                 alt="SK Tours Logo"
//                 className="h-12 sm:h-14 w-auto object-contain relative z-10 transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
//               />
//             </div>
//           </div>
//           {/* Mobile Toggle */}
//           <button
//             onClick={toggleMobileMenu}
//             className="lg:hidden text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
//           >
//             {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
//           </button>
//           {/* DESKTOP NAV */}
//           <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
//             {navItems.map((item, index) => (
//               <div key={index} className="relative group">
//                 {!item.dropdown ? (
//                   <a
//                     href={item.href}
//                     className="flex flex-col items-center px-3 sm:px-4 py-3 transition-all duration-300 hover:bg-white/15 rounded-lg min-w-[80px] sm:min-w-[90px]"
//                   >
//                     <item.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
//                     <span className="text-sm font-medium">{item.label}</span>
//                   </a>
//                 ) : (
//                   <div className="relative">
//                     <div className="flex flex-col items-center px-3 sm:px-4 py-3 transition-all duration-300 hover:bg-white/15 rounded-lg min-w-[100px] sm:min-w-[110px] cursor-pointer">
//                       <item.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
//                       <div className="flex items-center gap-1">
//                         <span className="text-sm font-medium">{item.label}</span>
//                         <ChevronDown className="w-3 h-3" />
//                       </div>
//                     </div>
//                     {/* MEGA DROPDOWN */}
//                     <div className="absolute left-1/2 -translate-x-1/2 top-full opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-white text-gray-800 rounded-xl shadow-2xl w-72 sm:w-80 py-4 border border-gray-200 transition-all duration-300 ease-in-out z-50">
//                       {item.dropdown.map((sub, idx) => {
//                         const isIndian = item.label === "Indian Tours";
//                         const isIntl = item.label === "International Tours";
//                         const isIndividual = sub.label === "Individual Tours";
//                         const isGroup = sub.label === "Group Tours";
//                         let showThisStates = false;
//                         let enterHandler = null;
//                         let leaveHandler = null;
//                         let enterStatesHandler = null;
//                         let leaveStatesHandler = null;
//                         if (isIndian && isIndividual) {
//                           showThisStates = showIndianIndividualStates;
//                           enterHandler = () => setShowIndianIndividualStates(true);
//                           leaveHandler = () => setShowIndianIndividualStates(false);
//                           enterStatesHandler = () => setShowIndianIndividualStates(true);
//                           leaveStatesHandler = () => setShowIndianIndividualStates(false);
//                         } else if (isIndian && isGroup) {
//                           showThisStates = showIndianGroupStates;
//                           enterHandler = () => setShowIndianGroupStates(true);
//                           leaveHandler = () => setShowIndianGroupStates(false);
//                           enterStatesHandler = () => setShowIndianGroupStates(true);
//                           leaveStatesHandler = () => setShowIndianGroupStates(false);
//                         } else if (isIntl && isIndividual) {
//                           showThisStates = showIntlIndividualStates;
//                           enterHandler = () => setShowIntlIndividualStates(true);
//                           leaveHandler = () => setShowIntlIndividualStates(false);
//                           enterStatesHandler = () => setShowIntlIndividualStates(true);
//                           leaveStatesHandler = () => setShowIntlIndividualStates(false);
//                         } else if (isIntl && isGroup) {
//                           showThisStates = showIntlGroupStates;
//                           enterHandler = () => setShowIntlGroupStates(true);
//                           leaveHandler = () => setShowIntlGroupStates(false);
//                           enterStatesHandler = () => setShowIntlGroupStates(true);
//                           leaveStatesHandler = () => setShowIntlGroupStates(false);
//                         }
//                         return (
//                           <div key={idx} className="relative">
//                             <div
//                               className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-3.5 text-sm hover:bg-blue-50 border-l-2 border-transparent hover:border-blue-500 mx-2 sm:mx-3 rounded-lg block cursor-pointer transition-colors ${sub.subDropdown ? "pr-2" : ""}`}
//                               onMouseEnter={enterHandler}
//                               onMouseLeave={leaveHandler}
//                             >
//                               <a href={sub.href} className="flex items-center gap-2 sm:gap-3 w-full">
//                                 <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
//                                   <sub.icon className="w-4 h-4 text-blue-600" />
//                                 </div>
//                                 <span className="font-medium flex-grow">{sub.label}</span>
//                                 {sub.subDropdown && <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0" />}
//                               </a>
//                             </div>
//                             {/* STATES LIST - SPECIAL LINK FOR ANDAMAN */}
//                             {sub.subDropdown && showThisStates && (
//                               <div
//                                 className="absolute left-full top-0 -ml-4 bg-white text-gray-800 rounded-xl shadow-2xl w-[480px] sm:w-[520px] py-4 border border-gray-200 opacity-100 visible transition-all duration-300 ease-in-out z-50 max-h-[70vh] overflow-y-auto"
//                                 onMouseEnter={enterStatesHandler}
//                                 onMouseLeave={leaveStatesHandler}
//                               >
//                                 <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 px-4">
//                                   {sub.subDropdown.map((dest, sIndex) => {
//                                     const isAndaman = dest === "Andaman & Nicobar Islands";
//                                     const href = isAndaman
//                                       ? "/tours-packages" // This is the only change
//                                       : `#${item.label.toLowerCase().replace(/\s/g, "-")}-state-${dest.toLowerCase().replace(/\s+/g, "-")}`;
//                                     return (
//                                       <a
//                                         key={sIndex}
//                                         href={href}
//                                         className={`block px-3 py-2.5 text-sm font-medium rounded-lg text-center transition-colors truncate leading-tight
//                                           ${isAndaman
//                                             ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-lg"
//                                             : "hover:bg-blue-50 hover:text-blue-600"
//                                           }`}
//                                         title={dest}
//                                       >
//                                         {dest}
//                                         {isAndaman && <Sparkles className="inline-block w-4 h-4 ml-1 animate-pulse" />}
//                                       </a>
//                                     );
//                                   })}
//                                 </div>
//                               </div>
//                             )}
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </nav>
//           {/* Desktop Login/Signup */}
//           <div className="hidden lg:flex items-center gap-2 ml-auto">
//             {/* Sign Up */}
//             <div className="relative group">
//               <Button variant="ghost" size="sm" className="bg-green-500/20 hover:bg-green-500/30 text-green-100 border border-green-400/50 flex items-center gap-2 px-4 sm:px-5 py-2 rounded-lg">
//                 <UserPlus className="w-4 h-4" />
//                 <span className="font-medium text-sm">Sign Up</span>
//                 <ChevronDown className="w-3 h-3" />
//               </Button>
//               <div className="absolute right-0 top-full mt-2 opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-white text-gray-800 rounded-xl shadow-2xl py-2 border border-gray-200 transition-all duration-300 z-50 min-w-[140px]">
//                 <a href="#new-user" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <UserPlus className="w-4 h-4 text-blue-600" /> New User
//                 </a>
//                 <a href="#new-agent" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <Users className="w-4 h-4 text-blue-600" /> New Agent
//                 </a>
//               </div>
//             </div>
//             {/* Login */}
//             <div className="relative group">
//               <Button variant="ghost" size="sm" className="bg-red-500/20 hover:bg-red-500/30 text-red-100 border border-red-400/50 flex items-center gap-2 px-4 sm:px-5 py-2 rounded-lg">
//                 <UserCircle className="w-4 h-4" />
//                 <span className="font-medium text-sm">Login</span>
//                 <ChevronDown className="w-3 h-3" />
//               </Button>
//               <div className="absolute right-0 top-full mt-2 opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-white text-gray-800 rounded-xl shadow-2xl py-2 border border-gray-200 transition-all duration-300 z-50 min-w-[140px]">
//                 <a href="#user-login" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <UserCircle className="w-4 h-4 text-blue-600" /> User Login
//                 </a>
//                 <a href="#agent-login" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <Users className="w-4 h-4 text-blue-600" /> Agent Login
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* MOBILE MENU - Also updated for Andaman */}
//         {mobileMenuOpen && (
//           <nav className="lg:hidden bg-primary text-primary-foreground border-t border-blue-400">
//             <ul className="flex flex-col">
//               {navItems.map((item, index) => (
//                 <li key={index} className="border-b border-blue-500">
//                   {!item.dropdown ? (
//                     <a href={item.href} className="flex gap-2 items-center px-4 py-3 hover:bg-white/10 transition-colors">
//                       <item.icon className="w-5 h-5" />
//                       <span className="font-medium text-sm">{item.label}</span>
//                     </a>
//                   ) : (
//                     <>
//                       <button
//                         onClick={() => toggleMobileSubmenu(item.label)}
//                         className="w-full flex justify-between items-center px-4 py-3 hover:bg-white/10 transition-colors font-medium text-sm"
//                       >
//                         <div className="flex items-center gap-2">
//                           <item.icon className="w-5 h-5" />
//                           <span>{item.label}</span>
//                         </div>
//                         <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileSubmenuOpen[item.label] ? "rotate-180" : ""}`} />
//                       </button>
//                       {mobileSubmenuOpen[item.label] && (
//                         <ul className="bg-primary border-t border-blue-500">
//                           {item.dropdown.map((sub, i) => (
//                             <li key={i} className="border-b border-blue-600">
//                               {!sub.subDropdown ? (
//                                 <a href={sub.href} className="flex items-center gap-2 px-8 py-2 hover:bg-white/10 transition-colors font-normal text-sm">
//                                   <sub.icon className="w-4 h-4" />
//                                   <span>{sub.label}</span>
//                                 </a>
//                               ) : (
//                                 <>
//                                   <button
//                                     onClick={() => toggleMobileSubmenu(sub.label)}
//                                     className="w-full flex justify-between items-center px-8 py-2 hover:bg-white/10 transition-colors font-normal text-sm"
//                                   >
//                                     <div className="flex items-center gap-2">
//                                       <sub.icon className="w-4 h-4" />
//                                       <span>{sub.label}</span>
//                                     </div>
//                                     <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileSubmenuOpen[sub.label] ? "rotate-180" : ""}`} />
//                                   </button>
//                                   {mobileSubmenuOpen[sub.label] && (
//                                     <ul className="bg-primary border-t border-blue-600">
//                                       {sub.subDropdown.map((dest, j) => {
//                                         const isAndaman = dest === "Andaman & Nicobar Islands";
//                                         return (
//                                           <li key={j}>
//                                             <a
//                                               href={isAndaman ? "/tours-packages" : "#"}
//                                               className={`block px-12 py-2 text-sm font-medium ${isAndaman ? "text-cyan-400 font-bold" : "text-gray-300"} hover:text-white`}
//                                             >
//                                               {dest} {isAndaman && "(Featured)"}
//                                             </a>
//                                           </li>
//                                         );
//                                       })}
//                                     </ul>
//                                   )}
//                                 </>
//                               )}
//                             </li>
//                           ))}
//                         </ul>
//                       )}
//                     </>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         )}
//       </div>
//     </header>
//   );
// };
// export default Header;






// import {
//   Ship, Compass, Phone, UserCircle, Home as HomeIcon, ChevronDown, Sparkles, Heart,
//   GraduationCap, Car, Bus, Landmark, Umbrella, CalendarDays, Users, Shield, Star,
//   UsersRound, Globe, MapPin, ChevronRight, PlaneTakeoff, UserPlus, Menu as MenuIcon,
//   X as XIcon,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import logo from "../assets/png[3].png";
// import { useState } from "react";
// const indianStates = [
//   "Andaman & Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam",
//   "Bihar", "Chandigarh", "Chhattisgarh", "Dadra & Nagar Haveli", "Daman & Diu",
//   "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir",
//   "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh",
//   "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
//   "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
//   "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
// ].sort();
// const internationalDestinations = [
//   "Africa", "America", "Australia NewZealand", "Bhutan", "Dubai and MiddleEast",
//   "Eurasia", "Europe", "Japan China", "Mauritius", "Nepal", "Seychelles",
//   "South East Asia", "SriLanka Maldives",
// ];
// const Header = () => {
//   const [showIndianIndividualStates, setShowIndianIndividualStates] = useState(false);
//   const [showIndianGroupStates, setShowIndianGroupStates] = useState(false);
//   const [showIntlIndividualStates, setShowIntlIndividualStates] = useState(false);
//   const [showIntlGroupStates, setShowIntlGroupStates] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState({});
//   const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);
//   const toggleMobileSubmenu = (label: string) => {
//     setMobileSubmenuOpen(prev => ({ ...prev, [label]: !prev[label] }));
//   };
//   const navItems = [
//     { icon: HomeIcon, label: "Home", href: "/" },
//     {
//       icon: MapPin, label: "Indian Tours",
//       dropdown: [
//         { label: "Individual Tours", href: "#indian-individual", icon: Users, subDropdown: indianStates },
//         { label: "Group Tours", href: "#indian-group", icon: UsersRound, subDropdown: indianStates },
//         { label: "Ladies Special Tours", href: "#indian-ladies", icon: Sparkles },
//         { label: "Senior Citizen Tours", href: "#indian-senior", icon: Heart },
//         { label: "Students Tours", href: "#indian-students", icon: GraduationCap },
//         { label: "Honeymoon Tours", href: "#indian-honeymoon", icon: Heart },
//       ],
//     },
//     {
//       icon: Globe, label: "International Tours",
//       dropdown: [
//         { label: "Individual Tours", href: "#intl-individual", icon: Users, subDropdown: internationalDestinations },
//         { label: "Group Tours", href: "#intl-group", icon: UsersRound, subDropdown: internationalDestinations },
//         { label: "Ladies Special Tours", href: "#intl-ladies", icon: Sparkles },
//         { label: "Senior Citizen Tours", href: "#intl-senior", icon: Heart },
//         { label: "Students Tours", href: "#intl-students", icon: GraduationCap },
//         { label: "Honeymoon Tours", href: "#intl-honeymoon", icon: Heart },
//       ],
//     },
//     { icon: Ship, label: "Exhibitions", href: "#exhibitions" },
//     { icon: Compass, label: "MICE", href: "#mice" },
//     { icon: PlaneTakeoff, label: "Visa", href: "#visa" },
//     {
//       icon: Star, label: "Others",
//       dropdown: [
//   { label: "Bungalow / Villa", href: "#bungalow-villa", icon: HomeIcon },
//   { label: "Bus", href: "#bus", icon: Bus },
//   { label: "Car", href: "#car", icon: Car },
//   { label: "Cruise", href: "#cruise", icon: Ship },
//   { label: "Festivals", href: "#festivals", icon: Sparkles },
//   { label: "Insurances", href: "#insurances", icon: Umbrella },
//   { label: "Passport", href: "#passport", icon: Landmark },
//   { label: "Sports", href: "#sports", icon: Shield },
//   { label: "Weekend Gateways", href: "#weekend-gateways", icon: CalendarDays },
// ],
//     },
//     { icon: UsersRound, label: "About Us", href: "#about" },
//     { icon: Phone, label: "Contact Us", href: "#contact" },
//   ];
//   return (
//     <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-xl border-b-2 border-blue-400 w-full">
//       <div className="w-full px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between py-3">
//           {/* LOGO */}
//           <div className="flex items-center">
//             <div className="relative group cursor-pointer">
//               <div className="absolute -inset-3 bg-white/10 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               <img
//                 src={logo}
//                 alt="SK Tours Logo"
//                 className="h-12 sm:h-14 w-auto object-contain relative z-10 transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
//               />
//             </div>
//           </div>
//           {/* Mobile Toggle */}
//           <button
//             onClick={toggleMobileMenu}
//             className="lg:hidden text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
//           >
//             {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
//           </button>
//           {/* DESKTOP NAV */}
//           <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
//             {navItems.map((item, index) => (
//               <div key={index} className="relative group">
//                 {!item.dropdown ? (
//                   <a
//                     href={item.href}
//                     className="flex flex-col items-center px-3 sm:px-4 py-3 transition-all duration-300 hover:bg-white/15 rounded-lg min-w-[80px] sm:min-w-[90px]"
//                   >
//                     <item.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
//                     <span className="text-sm font-medium">{item.label}</span>
//                   </a>
//                 ) : (
//                   <div className="relative">
//                     <div className="flex flex-col items-center px-3 sm:px-4 py-3 transition-all duration-300 hover:bg-white/15 rounded-lg min-w-[100px] sm:min-w-[110px] cursor-pointer">
//                       <item.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
//                       <div className="flex items-center gap-1">
//                         <span className="text-sm font-medium">{item.label}</span>
//                         <ChevronDown className="w-3 h-3" />
//                       </div>
//                     </div>
//                     {/* MEGA DROPDOWN */}
//                     <div className="absolute left-1/2 -translate-x-1/2 top-full opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-white text-gray-800 rounded-xl shadow-2xl w-72 sm:w-80 py-4 border border-gray-200 transition-all duration-300 ease-in-out z-50">
//                       {item.dropdown.map((sub, idx) => {
//                         const isIndian = item.label === "Indian Tours";
//                         const isIntl = item.label === "International Tours";
//                         const isIndividual = sub.label === "Individual Tours";
//                         const isGroup = sub.label === "Group Tours";
//                         let showThisStates = false;
//                         let enterHandler = null;
//                         let leaveHandler = null;
//                         let enterStatesHandler = null;
//                         let leaveStatesHandler = null;
//                         if (isIndian && isIndividual) {
//                           showThisStates = showIndianIndividualStates;
//                           enterHandler = () => setShowIndianIndividualStates(true);
//                           leaveHandler = () => setShowIndianIndividualStates(false);
//                           enterStatesHandler = () => setShowIndianIndividualStates(true);
//                           leaveStatesHandler = () => setShowIndianIndividualStates(false);
//                         } else if (isIndian && isGroup) {
//                           showThisStates = showIndianGroupStates;
//                           enterHandler = () => setShowIndianGroupStates(true);
//                           leaveHandler = () => setShowIndianGroupStates(false);
//                           enterStatesHandler = () => setShowIndianGroupStates(true);
//                           leaveStatesHandler = () => setShowIndianGroupStates(false);
//                         } else if (isIntl && isIndividual) {
//                           showThisStates = showIntlIndividualStates;
//                           enterHandler = () => setShowIntlIndividualStates(true);
//                           leaveHandler = () => setShowIntlIndividualStates(false);
//                           enterStatesHandler = () => setShowIntlIndividualStates(true);
//                           leaveStatesHandler = () => setShowIntlIndividualStates(false);
//                         } else if (isIntl && isGroup) {
//                           showThisStates = showIntlGroupStates;
//                           enterHandler = () => setShowIntlGroupStates(true);
//                           leaveHandler = () => setShowIntlGroupStates(false);
//                           enterStatesHandler = () => setShowIntlGroupStates(true);
//                           leaveStatesHandler = () => setShowIntlGroupStates(false);
//                         }
//                         return (
//                           <div key={idx} className="relative">
//                             <div
//                               className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-3.5 text-sm hover:bg-blue-50 border-l-2 border-transparent hover:border-blue-500 mx-2 sm:mx-3 rounded-lg block cursor-pointer transition-colors ${sub.subDropdown ? "pr-2" : ""}`}
//                               onMouseEnter={enterHandler}
//                               onMouseLeave={leaveHandler}
//                             >
//                               <a href={sub.href} className="flex items-center gap-2 sm:gap-3 w-full">
//                                 <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
//                                   <sub.icon className="w-4 h-4 text-blue-600" />
//                                 </div>
//                                 <span className="font-medium flex-grow">{sub.label}</span>
//                                 {sub.subDropdown && <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0" />}
//                               </a>
//                             </div>
//                             {/* STATES LIST - SPECIAL LINK FOR ANDAMAN */}
//                             {sub.subDropdown && showThisStates && (
//                               <div
//                                 className="absolute left-full top-0 -ml-4 bg-white text-gray-800 rounded-xl shadow-2xl w-[480px] sm:w-[520px] py-4 border border-gray-200 opacity-100 visible transition-all duration-300 ease-in-out z-50 max-h-[70vh] overflow-y-auto"
//                                 onMouseEnter={enterStatesHandler}
//                                 onMouseLeave={leaveStatesHandler}
//                               >
//                                 <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 px-4">
//                                   {sub.subDropdown.map((dest, sIndex) => {
//                                     const isAndaman = dest === "Andaman & Nicobar Islands";
//                                     const href = isAndaman
//                                       ? "/tours-packages" // This is the only change
//                                       : `#${item.label.toLowerCase().replace(/\s/g, "-")}-state-${dest.toLowerCase().replace(/\s+/g, "-")}`;
//                                     return (
//                                       <a
//                                         key={sIndex}
//                                         href={href}
//                                         className={`block px-3 py-2.5 text-sm font-medium rounded-lg text-center transition-colors truncate leading-tight
//                                           ${isAndaman
//                                             ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-lg"
//                                             : "hover:bg-blue-50 hover:text-blue-600"
//                                           }`}
//                                         title={dest}
//                                       >
//                                         {dest}
//                                         {isAndaman && <Sparkles className="inline-block w-4 h-4 ml-1 animate-pulse" />}
//                                       </a>
//                                     );
//                                   })}
//                                 </div>
//                               </div>
//                             )}
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </nav>
//           {/* Desktop Login/Signup */}
//           <div className="hidden lg:flex items-center gap-2 ml-auto">
//             {/* Sign Up */}
//             <div className="relative group">
//               <Button variant="ghost" size="sm" className="bg-green-500 hover:bg-green-600 text-white px-4 sm:px-5 py-2 rounded-lg border border-green-600 flex items-center gap-2">
//                 <UserPlus className="w-4 h-4" />
//                 <span className="font-medium text-sm">Sign Up</span>
//                 <ChevronDown className="w-3 h-3" />
//               </Button>
//               <div className="absolute right-0 top-full mt-2 opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-white text-gray-800 rounded-xl shadow-2xl py-2 border border-gray-200 transition-all duration-300 z-50 min-w-[140px]">
//                 <a href="#new-user" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <UserPlus className="w-4 h-4 text-blue-600" /> New User
//                 </a>
//                 <a href="#new-agent" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <Users className="w-4 h-4 text-blue-600" /> New Agent
//                 </a>
//               </div>
//             </div>
//             {/* Login */}
//             <div className="relative group">
//               <Button variant="ghost" size="sm" className="bg-red-500 hover:bg-red-600 text-white px-4 sm:px-5 py-2 rounded-lg border border-red-600 flex items-center gap-2">
//                 <UserCircle className="w-4 h-4" />
//                 <span className="font-medium text-sm">Login</span>
//                 <ChevronDown className="w-3 h-3" />
//               </Button>
//               <div className="absolute right-0 top-full mt-2 opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-white text-gray-800 rounded-xl shadow-2xl py-2 border border-gray-200 transition-all duration-300 z-50 min-w-[140px]">
//                 <a href="#user-login" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <UserCircle className="w-4 h-4 text-blue-600" /> User Login
//                 </a>
//                 <a href="#agent-login" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <Users className="w-4 h-4 text-blue-600" /> Agent Login
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* MOBILE MENU - Also updated for Andaman */}
//         {mobileMenuOpen && (
//           <nav className="lg:hidden bg-primary text-primary-foreground border-t border-blue-400">
//             <ul className="flex flex-col">
//               {navItems.map((item, index) => (
//                 <li key={index} className="border-b border-blue-500">
//                   {!item.dropdown ? (
//                     <a href={item.href} className="flex gap-2 items-center px-4 py-3 hover:bg-white/10 transition-colors">
//                       <item.icon className="w-5 h-5" />
//                       <span className="font-medium text-sm">{item.label}</span>
//                     </a>
//                   ) : (
//                     <>
//                       <button
//                         onClick={() => toggleMobileSubmenu(item.label)}
//                         className="w-full flex justify-between items-center px-4 py-3 hover:bg-white/10 transition-colors font-medium text-sm"
//                       >
//                         <div className="flex items-center gap-2">
//                           <item.icon className="w-5 h-5" />
//                           <span>{item.label}</span>
//                         </div>
//                         <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileSubmenuOpen[item.label] ? "rotate-180" : ""}`} />
//                       </button>
//                       {mobileSubmenuOpen[item.label] && (
//                         <ul className="bg-primary border-t border-blue-500">
//                           {item.dropdown.map((sub, i) => (
//                             <li key={i} className="border-b border-blue-600">
//                               {!sub.subDropdown ? (
//                                 <a href={sub.href} className="flex items-center gap-2 px-8 py-2 hover:bg-white/10 transition-colors font-normal text-sm">
//                                   <sub.icon className="w-4 h-4" />
//                                   <span>{sub.label}</span>
//                                 </a>
//                               ) : (
//                                 <>
//                                   <button
//                                     onClick={() => toggleMobileSubmenu(sub.label)}
//                                     className="w-full flex justify-between items-center px-8 py-2 hover:bg-white/10 transition-colors font-normal text-sm"
//                                   >
//                                     <div className="flex items-center gap-2">
//                                       <sub.icon className="w-4 h-4" />
//                                       <span>{sub.label}</span>
//                                     </div>
//                                     <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileSubmenuOpen[sub.label] ? "rotate-180" : ""}`} />
//                                   </button>
//                                   {mobileSubmenuOpen[sub.label] && (
//                                     <ul className="bg-primary border-t border-blue-600">
//                                       {sub.subDropdown.map((dest, j) => {
//                                         const isAndaman = dest === "Andaman & Nicobar Islands";
//                                         return (
//                                           <li key={j}>
//                                             <a
//                                               href={isAndaman ? "/tours-packages" : "#"}
//                                               className={`block px-12 py-2 text-sm font-medium ${isAndaman ? "text-cyan-400 font-bold" : "text-gray-300"} hover:text-white`}
//                                             >
//                                               {dest} {isAndaman && "(Featured)"}
//                                             </a>
//                                           </li>
//                                         );
//                                       })}
//                                     </ul>
//                                   )}
//                                 </>
//                               )}
//                             </li>
//                           ))}
//                         </ul>
//                       )}
//                     </>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         )}
//       </div>
//     </header>
//   );
// };
// export default Header;






// import {
//   Ship, Compass, Phone, UserCircle, Home as HomeIcon, ChevronDown, Sparkles, Heart,
//   GraduationCap, Car, Bus, Landmark, Umbrella, CalendarDays, Users, Shield, Star,
//   UsersRound, Globe, MapPin, ChevronRight, PlaneTakeoff, UserPlus, Menu as MenuIcon,
//   X as XIcon,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import logo from "../assets/png[3].png";
// import { useState } from "react";
// const indianStates = [
//   "Andaman & Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam",
//   "Bihar", "Chandigarh", "Chhattisgarh", "Dadra & Nagar Haveli", "Daman & Diu",
//   "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir",
//   "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh",
//   "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
//   "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
//   "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
// ].sort();
// const internationalDestinations = [
//   "Africa", "America", "Australia NewZealand", "Bhutan", "Dubai and MiddleEast",
//   "Eurasia", "Europe", "Japan China", "Mauritius", "Nepal", "Seychelles",
//   "South East Asia", "SriLanka Maldives",
// ];
// const Header = () => {
//   const [showIndianIndividualStates, setShowIndianIndividualStates] = useState(false);
//   const [showIndianGroupStates, setShowIndianGroupStates] = useState(false);
//   const [showIntlIndividualStates, setShowIntlIndividualStates] = useState(false);
//   const [showIntlGroupStates, setShowIntlGroupStates] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState({});
//   const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);
//   const toggleMobileSubmenu = (label: string) => {
//     setMobileSubmenuOpen(prev => ({ ...prev, [label]: !prev[label] }));
//   };
//   const navItems = [
//     { icon: HomeIcon, label: "Home", href: "/" },
//     {
//       icon: MapPin, label: "Indian Tours",
//       dropdown: [
//         { label: "Individual Tours", href: "#indian-individual", icon: Users, subDropdown: indianStates },
//         { label: "Group Tours", href: "#indian-group", icon: UsersRound, subDropdown: indianStates },
//         { label: "Ladies Special Tours", href: "#indian-ladies", icon: Sparkles },
//         { label: "Senior Citizen Tours", href: "#indian-senior", icon: Heart },
//         { label: "Students Tours", href: "#indian-students", icon: GraduationCap },
//         { label: "Honeymoon Tours", href: "#indian-honeymoon", icon: Heart },
//       ],
//     },
//     {
//       icon: Globe, label: "International Tours",
//       dropdown: [
//         { label: "Individual Tours", href: "#intl-individual", icon: Users, subDropdown: internationalDestinations },
//         { label: "Group Tours", href: "#intl-group", icon: UsersRound, subDropdown: internationalDestinations },
//         { label: "Ladies Special Tours", href: "#intl-ladies", icon: Sparkles },
//         { label: "Senior Citizen Tours", href: "#intl-senior", icon: Heart },
//         { label: "Students Tours", href: "#intl-students", icon: GraduationCap },
//         { label: "Honeymoon Tours", href: "#intl-honeymoon", icon: Heart },
//       ],
//     },
//     { icon: Ship, label: "Exhibitions", href: "#exhibitions" },
//     { icon: Compass, label: "MICE", href: "#mice" },
//     { icon: PlaneTakeoff, label: "Visa", href: "#visa" },
//     {
//       icon: Star, label: "Others",
//       dropdown: [
//   { label: "Bungalow / Villa", href: "#bungalow-villa", icon: HomeIcon },
//   { label: "Bus", href: "#bus", icon: Bus },
//   { label: "Car", href: "#car", icon: Car },
//   { label: "Cruise", href: "#cruise", icon: Ship },
//   { label: "Festivals", href: "#festivals", icon: Sparkles },
//   { label: "Insurances", href: "#insurances", icon: Umbrella },
//   { label: "Passport", href: "#passport", icon: Landmark },
//   { label: "Sports", href: "#sports", icon: Shield },
//   { label: "Weekend Gateways", href: "#weekend-gateways", icon: CalendarDays },
// ],
//     },
//     { icon: UsersRound, label: "About Us", href: "#about" },
//     { icon: Phone, label: "Contact Us", href: "#contact" },
//   ];
//   return (
//     <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-xl border-b-2 border-blue-400 w-full">
//       <div className="w-full px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between py-3">
//           {/* LOGO */}
//           <div className="flex items-center">
//             <div className="relative group cursor-pointer">
//               <div className="absolute -inset-3 bg-white/10 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               <img
//                 src={logo}
//                 alt="SK Tours Logo"
//                 className="h-12 sm:h-14 w-auto object-contain relative z-10 transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
//               />
//             </div>
//           </div>
//           {/* Mobile Toggle */}
//           <button
//             onClick={toggleMobileMenu}
//             className="lg:hidden text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
//           >
//             {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
//           </button>
//           {/* DESKTOP NAV */}
//           <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
//             {navItems.map((item, index) => (
//               <div key={index} className="relative group">
//                 {!item.dropdown ? (
//                   <a
//                     href={item.href}
//                     className="flex flex-col items-center px-3 sm:px-4 py-3 transition-all duration-300 hover:bg-white/15 rounded-lg min-w-[80px] sm:min-w-[90px]"
//                   >
//                     <item.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
//                     <span className="text-sm font-medium">{item.label}</span>
//                   </a>
//                 ) : (
//                   <div className="relative">
//                     <div className="flex flex-col items-center px-3 sm:px-4 py-3 transition-all duration-300 hover:bg-white/15 rounded-lg min-w-[100px] sm:min-w-[110px] cursor-pointer">
//                       <item.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
//                       <div className="flex items-center gap-1">
//                         <span className="text-sm font-medium">{item.label}</span>
//                         <ChevronDown className="w-3 h-3" />
//                       </div>
//                     </div>
//                     {/* MEGA DROPDOWN */}
//                     <div className="absolute left-1/2 -translate-x-1/2 top-full opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-white text-gray-800 rounded-xl shadow-2xl w-72 sm:w-80 py-4 border border-gray-200 transition-all duration-300 ease-in-out z-50">
//                       {item.dropdown.map((sub, idx) => {
//                         const isIndian = item.label === "Indian Tours";
//                         const isIntl = item.label === "International Tours";
//                         const isIndividual = sub.label === "Individual Tours";
//                         const isGroup = sub.label === "Group Tours";
//                         let showThisStates = false;
//                         let enterHandler = null;
//                         let leaveHandler = null;
//                         let enterStatesHandler = null;
//                         let leaveStatesHandler = null;
//                         if (isIndian && isIndividual) {
//                           showThisStates = showIndianIndividualStates;
//                           enterHandler = () => setShowIndianIndividualStates(true);
//                           leaveHandler = () => setShowIndianIndividualStates(false);
//                           enterStatesHandler = () => setShowIndianIndividualStates(true);
//                           leaveStatesHandler = () => setShowIndianIndividualStates(false);
//                         } else if (isIndian && isGroup) {
//                           showThisStates = showIndianGroupStates;
//                           enterHandler = () => setShowIndianGroupStates(true);
//                           leaveHandler = () => setShowIndianGroupStates(false);
//                           enterStatesHandler = () => setShowIndianGroupStates(true);
//                           leaveStatesHandler = () => setShowIndianGroupStates(false);
//                         } else if (isIntl && isIndividual) {
//                           showThisStates = showIntlIndividualStates;
//                           enterHandler = () => setShowIntlIndividualStates(true);
//                           leaveHandler = () => setShowIntlIndividualStates(false);
//                           enterStatesHandler = () => setShowIntlIndividualStates(true);
//                           leaveStatesHandler = () => setShowIntlIndividualStates(false);
//                         } else if (isIntl && isGroup) {
//                           showThisStates = showIntlGroupStates;
//                           enterHandler = () => setShowIntlGroupStates(true);
//                           leaveHandler = () => setShowIntlGroupStates(false);
//                           enterStatesHandler = () => setShowIntlGroupStates(true);
//                           leaveStatesHandler = () => setShowIntlGroupStates(false);
//                         }
//                         return (
//                           <div key={idx} className="relative">
//                             <div
//                               className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-3.5 text-sm hover:bg-blue-50 border-l-2 border-transparent hover:border-blue-500 mx-2 sm:mx-3 rounded-lg block cursor-pointer transition-colors ${sub.subDropdown ? "pr-2" : ""}`}
//                               onMouseEnter={enterHandler}
//                               onMouseLeave={leaveHandler}
//                             >
//                               <a href={sub.href} className="flex items-center gap-2 sm:gap-3 w-full">
//                                 <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
//                                   <sub.icon className="w-4 h-4 text-blue-600" />
//                                 </div>
//                                 <span className="font-medium flex-grow">{sub.label}</span>
//                                 {sub.subDropdown && <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0" />}
//                               </a>
//                             </div>
//                             {/* STATES LIST - SPECIAL LINK FOR ANDAMAN */}
//                             {sub.subDropdown && showThisStates && (
//                               <div
//                                 className="absolute left-full top-0 -ml-4 bg-white text-gray-800 rounded-xl shadow-2xl w-[420px] sm:w-[480px] py-4 border border-gray-200 opacity-100 visible transition-all duration-300 ease-in-out z-50 max-h-[70vh] overflow-y-auto"
//                                 onMouseEnter={enterStatesHandler}
//                                 onMouseLeave={leaveStatesHandler}
//                               >
//                                 <div className="grid grid-cols-3 gap-2 px-4">
//                                   {sub.subDropdown.map((dest, sIndex) => {
//                                     const isAndaman = dest === "Andaman & Nicobar Islands";
//                                     const href = isAndaman
//                                       ? "/tours-packages" // This is the only change
//                                       : `#${item.label.toLowerCase().replace(/\s/g, "-")}-state-${dest.toLowerCase().replace(/\s+/g, "-")}`;
//                                     return (
//                                       <a
//                                         key={sIndex}
//                                         href={href}
//                                         className={`block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors leading-normal
//                                           ${isAndaman
//                                             ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-lg"
//                                             : "hover:bg-blue-50 hover:text-blue-600"
//                                           }`}
//                                         title={dest}
//                                       >
//                                         {dest}
//                                         {isAndaman && <Sparkles className="inline-block w-4 h-4 ml-1 animate-pulse" />}
//                                       </a>
//                                     );
//                                   })}
//                                 </div>
//                               </div>
//                             )}
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </nav>
//           {/* Desktop Login/Signup */}
//           <div className="hidden lg:flex items-center gap-2 ml-auto">
//             {/* Sign Up */}
//             <div className="relative group">
//               <Button variant="ghost" size="sm" className="bg-green-500 hover:bg-green-600 text-white px-4 sm:px-5 py-2 rounded-lg border border-green-600 flex items-center gap-2">
//                 <UserPlus className="w-4 h-4" />
//                 <span className="font-medium text-sm">Sign Up</span>
//                 <ChevronDown className="w-3 h-3" />
//               </Button>
//               <div className="absolute right-0 top-full mt-2 opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-white text-gray-800 rounded-xl shadow-2xl py-2 border border-gray-200 transition-all duration-300 z-50 min-w-[140px]">
//                 <a href="#new-user" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <UserPlus className="w-4 h-4 text-blue-600" /> New User
//                 </a>
//                 <a href="#new-agent" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <Users className="w-4 h-4 text-blue-600" /> New Agent
//                 </a>
//               </div>
//             </div>
//             {/* Login */}
//             <div className="relative group">
//               <Button variant="ghost" size="sm" className="bg-red-500 hover:bg-red-600 text-white px-4 sm:px-5 py-2 rounded-lg border border-red-600 flex items-center gap-2">
//                 <UserCircle className="w-4 h-4" />
//                 <span className="font-medium text-sm">Login</span>
//                 <ChevronDown className="w-3 h-3" />
//               </Button>
//               <div className="absolute right-0 top-full mt-2 opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-white text-gray-800 rounded-xl shadow-2xl py-2 border border-gray-200 transition-all duration-300 z-50 min-w-[140px]">
//                 <a href="#user-login" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <UserCircle className="w-4 h-4 text-blue-600" /> User Login
//                 </a>
//                 <a href="#agent-login" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <Users className="w-4 h-4 text-blue-600" /> Agent Login
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* MOBILE MENU - Also updated for Andaman */}
//         {mobileMenuOpen && (
//           <nav className="lg:hidden bg-primary text-primary-foreground border-t border-blue-400">
//             <ul className="flex flex-col">
//               {navItems.map((item, index) => (
//                 <li key={index} className="border-b border-blue-500">
//                   {!item.dropdown ? (
//                     <a href={item.href} className="flex gap-2 items-center px-4 py-3 hover:bg-white/10 transition-colors">
//                       <item.icon className="w-5 h-5" />
//                       <span className="font-medium text-sm">{item.label}</span>
//                     </a>
//                   ) : (
//                     <>
//                       <button
//                         onClick={() => toggleMobileSubmenu(item.label)}
//                         className="w-full flex justify-between items-center px-4 py-3 hover:bg-white/10 transition-colors font-medium text-sm"
//                       >
//                         <div className="flex items-center gap-2">
//                           <item.icon className="w-5 h-5" />
//                           <span>{item.label}</span>
//                         </div>
//                         <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileSubmenuOpen[item.label] ? "rotate-180" : ""}`} />
//                       </button>
//                       {mobileSubmenuOpen[item.label] && (
//                         <ul className="bg-primary border-t border-blue-500">
//                           {item.dropdown.map((sub, i) => (
//                             <li key={i} className="border-b border-blue-600">
//                               {!sub.subDropdown ? (
//                                 <a href={sub.href} className="flex items-center gap-2 px-8 py-2 hover:bg-white/10 transition-colors font-normal text-sm">
//                                   <sub.icon className="w-4 h-4" />
//                                   <span>{sub.label}</span>
//                                 </a>
//                               ) : (
//                                 <>
//                                   <button
//                                     onClick={() => toggleMobileSubmenu(sub.label)}
//                                     className="w-full flex justify-between items-center px-8 py-2 hover:bg-white/10 transition-colors font-normal text-sm"
//                                   >
//                                     <div className="flex items-center gap-2">
//                                       <sub.icon className="w-4 h-4" />
//                                       <span>{sub.label}</span>
//                                     </div>
//                                     <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileSubmenuOpen[sub.label] ? "rotate-180" : ""}`} />
//                                   </button>
//                                   {mobileSubmenuOpen[sub.label] && (
//                                     <ul className="bg-primary border-t border-blue-600">
//                                       {sub.subDropdown.map((dest, j) => {
//                                         const isAndaman = dest === "Andaman & Nicobar Islands";
//                                         return (
//                                           <li key={j}>
//                                             <a
//                                               href={isAndaman ? "/tours-packages" : "#"}
//                                               className={`block px-12 py-2 text-sm font-medium ${isAndaman ? "text-cyan-400 font-bold" : "text-gray-300"} hover:text-white`}
//                                             >
//                                               {dest} {isAndaman && "(Featured)"}
//                                             </a>
//                                           </li>
//                                         );
//                                       })}
//                                     </ul>
//                                   )}
//                                 </>
//                               )}
//                             </li>
//                           ))}
//                         </ul>
//                       )}
//                     </>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         )}
//       </div>
//     </header>
//   );
// };
// export default Header;





// import {
//   Ship, Compass, Phone, UserCircle, Home as HomeIcon, ChevronDown, Sparkles, Heart,
//   GraduationCap, Car, Bus, Landmark, Umbrella, CalendarDays, Users, Shield, Star,
//   UsersRound, Globe, MapPin, ChevronRight, PlaneTakeoff, UserPlus, Menu as MenuIcon,
//   X as XIcon,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import logo from "../assets/png[3].png";
// import { useState } from "react";
// const indianStates = [
//   "Andaman & Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam",
//   "Bihar", "Chandigarh", "Chhattisgarh", "Dadra & Nagar Haveli", "Daman & Diu",
//   "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir",
//   "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh",
//   "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
//   "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
//   "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
// ].sort();
// const internationalDestinations = [
//   "Africa", "America", "Australia NewZealand", "Bhutan", "Dubai and MiddleEast",
//   "Eurasia", "Europe", "Japan China", "Mauritius", "Nepal", "Seychelles",
//   "South East Asia", "SriLanka Maldives",
// ];
// const Header = () => {
//   const [showIndianIndividualStates, setShowIndianIndividualStates] = useState(false);
//   const [showIndianGroupStates, setShowIndianGroupStates] = useState(false);
//   const [showIntlIndividualStates, setShowIntlIndividualStates] = useState(false);
//   const [showIntlGroupStates, setShowIntlGroupStates] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState({});
//   const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);
//   const toggleMobileSubmenu = (label: string) => {
//     setMobileSubmenuOpen(prev => ({ ...prev, [label]: !prev[label] }));
//   };
//   const navItems = [
//     { icon: HomeIcon, label: "Home", href: "/" },
//     {
//       icon: MapPin, label: "Indian Tours",
//       dropdown: [
//         { label: "Individual Tours", href: "#indian-individual", icon: Users, subDropdown: indianStates },
//         { label: "Group Tours", href: "#indian-group", icon: UsersRound, subDropdown: indianStates },
//         { label: "Ladies Special Tours", href: "#indian-ladies", icon: Sparkles },
//         { label: "Senior Citizen Tours", href: "#indian-senior", icon: Heart },
//         { label: "Students Tours", href: "#indian-students", icon: GraduationCap },
//         { label: "Honeymoon Tours", href: "#indian-honeymoon", icon: Heart },
//       ],
//     },
//     {
//       icon: Globe, label: "International Tours",
//       dropdown: [
//         { label: "Individual Tours", href: "#intl-individual", icon: Users, subDropdown: internationalDestinations },
//         { label: "Group Tours", href: "#intl-group", icon: UsersRound, subDropdown: internationalDestinations },
//         { label: "Ladies Special Tours", href: "#intl-ladies", icon: Sparkles },
//         { label: "Senior Citizen Tours", href: "#intl-senior", icon: Heart },
//         { label: "Students Tours", href: "#intl-students", icon: GraduationCap },
//         { label: "Honeymoon Tours", href: "#intl-honeymoon", icon: Heart },
//       ],
//     },
//     { icon: Ship, label: "Exhibitions", href: "#exhibitions" },
//     { icon: Compass, label: "MICE", href: "#mice" },
//     { icon: PlaneTakeoff, label: "Visa", href: "#visa" },
//     {
//       icon: Star, label: "Others",
//       dropdown: [
//   { label: "Bungalow / Villa", href: "#bungalow-villa", icon: HomeIcon },
//   { label: "Bus", href: "#bus", icon: Bus },
//   { label: "Car", href: "#car", icon: Car },
//   { label: "Cruise", href: "#cruise", icon: Ship },
//   { label: "Festivals", href: "#festivals", icon: Sparkles },
//   { label: "Insurances", href: "#insurances", icon: Umbrella },
//   { label: "Passport", href: "#passport", icon: Landmark },
//   { label: "Sports", href: "#sports", icon: Shield },
//   { label: "Weekend Gateways", href: "#weekend-gateways", icon: CalendarDays },
// ],
//     },
//     { icon: UsersRound, label: "About Us", href: "#about" },
//     { icon: Phone, label: "Contact Us", href: "#contact" },
//   ];
//   return (
//     <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-xl border-b-2 border-blue-400 w-full">
//       <div className="w-full px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between py-3">
//           {/* LOGO */}
//           <div className="flex items-center">
//             <div className="relative group cursor-pointer">
//               <div className="absolute -inset-3 bg-white/10 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               <img
//                 src={logo}
//                 alt="SK Tours Logo"
//                 className="h-12 sm:h-14 w-auto object-contain relative z-10 transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
//               />
//             </div>
//           </div>
//           {/* Mobile Toggle */}
//           <button
//             onClick={toggleMobileMenu}
//             className="lg:hidden text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
//           >
//             {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
//           </button>
//           {/* DESKTOP NAV */}
//           <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
//             {navItems.map((item, index) => (
//               <div key={index} className="relative group">
//                 {!item.dropdown ? (
//                   <a
//                     href={item.href}
//                     className="flex flex-col items-center px-3 sm:px-4 py-3 transition-all duration-300 hover:bg-white/15 rounded-lg min-w-[80px] sm:min-w-[90px]"
//                   >
//                     <item.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
//                     <span className="text-sm font-medium">{item.label}</span>
//                   </a>
//                 ) : (
//                   <div className="relative">
//                     <div className="flex flex-col items-center px-3 sm:px-4 py-3 transition-all duration-300 hover:bg-white/15 rounded-lg min-w-[100px] sm:min-w-[110px] cursor-pointer">
//                       <item.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
//                       <div className="flex items-center gap-1">
//                         <span className="text-sm font-medium">{item.label}</span>
//                         <ChevronDown className="w-3 h-3" />
//                       </div>
//                     </div>
//                     {/* MEGA DROPDOWN */}
//                     <div className="absolute left-1/2 -translate-x-1/2 top-full opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-white text-gray-800 rounded-xl shadow-2xl w-72 sm:w-80 py-4 border border-gray-200 transition-all duration-300 ease-in-out z-50">
//                       {item.dropdown.map((sub, idx) => {
//                         const isIndian = item.label === "Indian Tours";
//                         const isIntl = item.label === "International Tours";
//                         const isIndividual = sub.label === "Individual Tours";
//                         const isGroup = sub.label === "Group Tours";
//                         let showThisStates = false;
//                         let enterHandler = null;
//                         let leaveHandler = null;
//                         let enterStatesHandler = null;
//                         let leaveStatesHandler = null;
//                         if (isIndian && isIndividual) {
//                           showThisStates = showIndianIndividualStates;
//                           enterHandler = () => setShowIndianIndividualStates(true);
//                           leaveHandler = () => setShowIndianIndividualStates(false);
//                           enterStatesHandler = () => setShowIndianIndividualStates(true);
//                           leaveStatesHandler = () => setShowIndianIndividualStates(false);
//                         } else if (isIndian && isGroup) {
//                           showThisStates = showIndianGroupStates;
//                           enterHandler = () => setShowIndianGroupStates(true);
//                           leaveHandler = () => setShowIndianGroupStates(false);
//                           enterStatesHandler = () => setShowIndianGroupStates(true);
//                           leaveStatesHandler = () => setShowIndianGroupStates(false);
//                         } else if (isIntl && isIndividual) {
//                           showThisStates = showIntlIndividualStates;
//                           enterHandler = () => setShowIntlIndividualStates(true);
//                           leaveHandler = () => setShowIntlIndividualStates(false);
//                           enterStatesHandler = () => setShowIntlIndividualStates(true);
//                           leaveStatesHandler = () => setShowIntlIndividualStates(false);
//                         } else if (isIntl && isGroup) {
//                           showThisStates = showIntlGroupStates;
//                           enterHandler = () => setShowIntlGroupStates(true);
//                           leaveHandler = () => setShowIntlGroupStates(false);
//                           enterStatesHandler = () => setShowIntlGroupStates(true);
//                           leaveStatesHandler = () => setShowIntlGroupStates(false);
//                         }
//                         return (
//                           <div key={idx} className="relative">
//                             <div
//                               className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-3.5 text-sm hover:bg-blue-50 border-l-2 border-transparent hover:border-blue-500 mx-2 sm:mx-3 rounded-lg block cursor-pointer transition-colors ${sub.subDropdown ? "pr-2" : ""}`}
//                               onMouseEnter={enterHandler}
//                               onMouseLeave={leaveHandler}
//                             >
//                               <a href={sub.href} className="flex items-center gap-2 sm:gap-3 w-full">
//                                 <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
//                                   <sub.icon className="w-4 h-4 text-blue-600" />
//                                 </div>
//                                 <span className="font-medium flex-grow">{sub.label}</span>
//                                 {sub.subDropdown && <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0" />}
//                               </a>
//                             </div>
//                             {/* STATES LIST - SPECIAL LINK FOR ANDAMAN */}
//                             {sub.subDropdown && showThisStates && (
//                               <div
//                                 className="absolute left-full top-0 -ml-4 bg-white text-gray-800 rounded-xl shadow-2xl w-[500px] sm:w-[600px] py-4 border border-gray-200 opacity-100 visible transition-all duration-300 ease-in-out z-50 max-h-[70vh] overflow-y-auto"
//                                 onMouseEnter={enterStatesHandler}
//                                 onMouseLeave={leaveStatesHandler}
//                               >
//                                 <div className="grid grid-cols-3 gap-2 px-4">
//                                   {sub.subDropdown.map((dest, sIndex) => {
//                                     const isAndaman = dest === "Andaman & Nicobar Islands";
//                                     const href = isAndaman
//                                       ? "/tours-packages" // This is the only change
//                                       : `#${item.label.toLowerCase().replace(/\s/g, "-")}-state-${dest.toLowerCase().replace(/\s+/g, "-")}`;
//                                     return (
//                                       <a
//                                         key={sIndex}
//                                         href={href}
//                                         className={`block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors text-left whitespace-nowrap overflow-hidden
//                                           ${isAndaman
//                                             ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-lg"
//                                             : "hover:bg-blue-50 hover:text-blue-600"
//                                           }`}
//                                         title={dest}
//                                       >
//                                         {dest}
//                                         {isAndaman && <Sparkles className="inline-block w-4 h-4 ml-1 animate-pulse" />}
//                                       </a>
//                                     );
//                                   })}
//                                 </div>
//                               </div>
//                             )}
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </nav>
//           {/* Desktop Login/Signup */}
//           <div className="hidden lg:flex items-center gap-2 ml-auto">
//             {/* Sign Up */}
//             <div className="relative group">
//               <Button variant="ghost" size="sm" className="bg-green-500 hover:bg-green-600 text-white px-4 sm:px-5 py-2 rounded-lg border border-green-600 flex items-center gap-2">
//                 <UserPlus className="w-4 h-4" />
//                 <span className="font-medium text-sm">Sign Up</span>
//                 <ChevronDown className="w-3 h-3" />
//               </Button>
//               <div className="absolute right-0 top-full mt-2 opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-white text-gray-800 rounded-xl shadow-2xl py-2 border border-gray-200 transition-all duration-300 z-50 min-w-[140px]">
//                 <a href="#new-user" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <UserPlus className="w-4 h-4 text-blue-600" /> New User
//                 </a>
//                 <a href="#new-agent" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <Users className="w-4 h-4 text-blue-600" /> New Agent
//                 </a>
//               </div>
//             </div>
//             {/* Login */}
//             <div className="relative group">
//               <Button variant="ghost" size="sm" className="bg-red-500 hover:bg-red-600 text-white px-4 sm:px-5 py-2 rounded-lg border border-red-600 flex items-center gap-2">
//                 <UserCircle className="w-4 h-4" />
//                 <span className="font-medium text-sm">Login</span>
//                 <ChevronDown className="w-3 h-3" />
//               </Button>
//               <div className="absolute right-0 top-full mt-2 opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-white text-gray-800 rounded-xl shadow-2xl py-2 border border-gray-200 transition-all duration-300 z-50 min-w-[140px]">
//                 <a href="#user-login" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <UserCircle className="w-4 h-4 text-blue-600" /> User Login
//                 </a>
//                 <a href="#agent-login" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <Users className="w-4 h-4 text-blue-600" /> Agent Login
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* MOBILE MENU - Also updated for Andaman */}
//         {mobileMenuOpen && (
//           <nav className="lg:hidden bg-primary text-primary-foreground border-t border-blue-400">
//             <ul className="flex flex-col">
//               {navItems.map((item, index) => (
//                 <li key={index} className="border-b border-blue-500">
//                   {!item.dropdown ? (
//                     <a href={item.href} className="flex gap-2 items-center px-4 py-3 hover:bg-white/10 transition-colors">
//                       <item.icon className="w-5 h-5" />
//                       <span className="font-medium text-sm">{item.label}</span>
//                     </a>
//                   ) : (
//                     <>
//                       <button
//                         onClick={() => toggleMobileSubmenu(item.label)}
//                         className="w-full flex justify-between items-center px-4 py-3 hover:bg-white/10 transition-colors font-medium text-sm"
//                       >
//                         <div className="flex items-center gap-2">
//                           <item.icon className="w-5 h-5" />
//                           <span>{item.label}</span>
//                         </div>
//                         <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileSubmenuOpen[item.label] ? "rotate-180" : ""}`} />
//                       </button>
//                       {mobileSubmenuOpen[item.label] && (
//                         <ul className="bg-primary border-t border-blue-500">
//                           {item.dropdown.map((sub, i) => (
//                             <li key={i} className="border-b border-blue-600">
//                               {!sub.subDropdown ? (
//                                 <a href={sub.href} className="flex items-center gap-2 px-8 py-2 hover:bg-white/10 transition-colors font-normal text-sm">
//                                   <sub.icon className="w-4 h-4" />
//                                   <span>{sub.label}</span>
//                                 </a>
//                               ) : (
//                                 <>
//                                   <button
//                                     onClick={() => toggleMobileSubmenu(sub.label)}
//                                     className="w-full flex justify-between items-center px-8 py-2 hover:bg-white/10 transition-colors font-normal text-sm"
//                                   >
//                                     <div className="flex items-center gap-2">
//                                       <sub.icon className="w-4 h-4" />
//                                       <span>{sub.label}</span>
//                                     </div>
//                                     <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileSubmenuOpen[sub.label] ? "rotate-180" : ""}`} />
//                                   </button>
//                                   {mobileSubmenuOpen[sub.label] && (
//                                     <ul className="bg-primary border-t border-blue-600">
//                                       {sub.subDropdown.map((dest, j) => {
//                                         const isAndaman = dest === "Andaman & Nicobar Islands";
//                                         return (
//                                           <li key={j}>
//                                             <a
//                                               href={isAndaman ? "/tours-packages" : "#"}
//                                               className={`block px-12 py-2 text-sm font-medium ${isAndaman ? "text-cyan-400 font-bold" : "text-gray-300"} hover:text-white`}
//                                             >
//                                               {dest} {isAndaman && "(Featured)"}
//                                             </a>
//                                           </li>
//                                         );
//                                       })}
//                                     </ul>
//                                   )}
//                                 </>
//                               )}
//                             </li>
//                           ))}
//                         </ul>
//                       )}
//                     </>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         )}
//       </div>
//     </header>
//   );
// };
// export default Header;






// import {
//   Ship, Compass, Phone, UserCircle, Home as HomeIcon, ChevronDown, Sparkles, Heart,
//   GraduationCap, Car, Bus, Landmark, Umbrella, CalendarDays, Users, Shield, Star,
//   UsersRound, Globe, MapPin, ChevronRight, PlaneTakeoff, UserPlus, Menu as MenuIcon,
//   X as XIcon,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import logo from "../assets/png[3].png";
// import { useState } from "react";
// const indianStates = [
//   "Andaman & Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam",
//   "Bihar", "Chandigarh", "Chhattisgarh", "Dadra & Nagar Haveli", "Daman & Diu",
//   "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir",
//   "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh",
//   "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
//   "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
//   "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
// ].sort();
// const internationalDestinations = [
//   "Africa", "America", "Australia NewZealand", "Bhutan", "Dubai and MiddleEast",
//   "Eurasia", "Europe", "Japan China", "Mauritius", "Nepal", "Seychelles",
//   "South East Asia", "SriLanka Maldives",
// ];
// const Header = () => {
//   const [showIndianIndividualStates, setShowIndianIndividualStates] = useState(false);
//   const [showIndianGroupStates, setShowIndianGroupStates] = useState(false);
//   const [showIntlIndividualStates, setShowIntlIndividualStates] = useState(false);
//   const [showIntlGroupStates, setShowIntlGroupStates] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState({});
//   const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);
//   const toggleMobileSubmenu = (label: string) => {
//     setMobileSubmenuOpen(prev => ({ ...prev, [label]: !prev[label] }));
//   };
//   const navItems = [
//     { icon: HomeIcon, label: "Home", href: "/" },
//     {
//       icon: MapPin, label: "Indian Tours",
//       dropdown: [
//         { label: "Individual Tours", href: "#indian-individual", icon: Users, subDropdown: indianStates },
//         { label: "Group Tours", href: "#indian-group", icon: UsersRound, subDropdown: indianStates },
//         { label: "Ladies Special Tours", href: "#indian-ladies", icon: Sparkles },
//         { label: "Senior Citizen Tours", href: "#indian-senior", icon: Heart },
//         { label: "Students Tours", href: "#indian-students", icon: GraduationCap },
//         { label: "Honeymoon Tours", href: "#indian-honeymoon", icon: Heart },
//       ],
//     },
//     {
//       icon: Globe, label: "International Tours",
//       dropdown: [
//         { label: "Individual Tours", href: "#intl-individual", icon: Users, subDropdown: internationalDestinations },
//         { label: "Group Tours", href: "#intl-group", icon: UsersRound, subDropdown: internationalDestinations },
//         { label: "Ladies Special Tours", href: "#intl-ladies", icon: Sparkles },
//         { label: "Senior Citizen Tours", href: "#intl-senior", icon: Heart },
//         { label: "Students Tours", href: "#intl-students", icon: GraduationCap },
//         { label: "Honeymoon Tours", href: "#intl-honeymoon", icon: Heart },
//       ],
//     },
//     { icon: Ship, label: "Exhibitions", href: "#exhibitions" },
//     { icon: Compass, label: "MICE", href: "#mice" },
//     { icon: PlaneTakeoff, label: "Visa", href: "#visa" },
//     {
//       icon: Star, label: "Others",
//       dropdown: [
//   { label: "Bungalow / Villa", href: "#bungalow-villa", icon: HomeIcon },
//   { label: "Bus", href: "#bus", icon: Bus },
//   { label: "Car", href: "#car", icon: Car },
//   { label: "Cruise", href: "#cruise", icon: Ship },
//   { label: "Festivals", href: "#festivals", icon: Sparkles },
//   { label: "Insurances", href: "#insurances", icon: Umbrella },
//   { label: "Passport", href: "#passport", icon: Landmark },
//   { label: "Sports", href: "#sports", icon: Shield },
//   { label: "Weekend Gateways", href: "#weekend-gateways", icon: CalendarDays },
// ],
//     },
//     { icon: UsersRound, label: "About Us", href: "#about" },
//     { icon: Phone, label: "Contact Us", href: "#contact" },
//   ];
//   return (
//     <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-xl border-b-2 border-blue-400 w-full">
//       <div className="w-full px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between py-3">
//           {/* LOGO */}
//           <div className="flex items-center">
//             <div className="relative group cursor-pointer">
//               <div className="absolute -inset-3 bg-white/10 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               <img
//                 src={logo}
//                 alt="SK Tours Logo"
//                 className="h-12 sm:h-14 w-auto object-contain relative z-10 transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
//               />
//             </div>
//           </div>
//           {/* Mobile Toggle */}
//           <button
//             onClick={toggleMobileMenu}
//             className="lg:hidden text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
//           >
//             {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
//           </button>
//           {/* DESKTOP NAV */}
//           <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
//             {navItems.map((item, index) => (
//               <div key={index} className="relative group">
//                 {!item.dropdown ? (
//                   <a
//                     href={item.href}
//                     className="flex flex-col items-center px-3 sm:px-4 py-3 transition-all duration-300 hover:bg-white/15 rounded-lg min-w-[80px] sm:min-w-[90px]"
//                   >
//                     <item.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
//                     <span className="text-sm font-medium">{item.label}</span>
//                   </a>
//                 ) : (
//                   <div className="relative">
//                     <div className="flex flex-col items-center px-3 sm:px-4 py-3 transition-all duration-300 hover:bg-white/15 rounded-lg min-w-[100px] sm:min-w-[110px] cursor-pointer">
//                       <item.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
//                       <div className="flex items-center gap-1">
//                         <span className="text-sm font-medium">{item.label}</span>
//                         <ChevronDown className="w-3 h-3" />
//                       </div>
//                     </div>
//                     {/* MEGA DROPDOWN */}
//                     <div className="absolute left-1/2 -translate-x-1/2 top-full opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-white text-gray-800 rounded-xl shadow-2xl w-72 sm:w-80 py-4 border border-gray-200 transition-all duration-300 ease-in-out z-50">
//                       {item.dropdown.map((sub, idx) => {
//                         const isIndian = item.label === "Indian Tours";
//                         const isIntl = item.label === "International Tours";
//                         const isIndividual = sub.label === "Individual Tours";
//                         const isGroup = sub.label === "Group Tours";
//                         let showThisStates = false;
//                         let enterHandler = null;
//                         let leaveHandler = null;
//                         let enterStatesHandler = null;
//                         let leaveStatesHandler = null;
//                         if (isIndian && isIndividual) {
//                           showThisStates = showIndianIndividualStates;
//                           enterHandler = () => setShowIndianIndividualStates(true);
//                           leaveHandler = () => setShowIndianIndividualStates(false);
//                           enterStatesHandler = () => setShowIndianIndividualStates(true);
//                           leaveStatesHandler = () => setShowIndianIndividualStates(false);
//                         } else if (isIndian && isGroup) {
//                           showThisStates = showIndianGroupStates;
//                           enterHandler = () => setShowIndianGroupStates(true);
//                           leaveHandler = () => setShowIndianGroupStates(false);
//                           enterStatesHandler = () => setShowIndianGroupStates(true);
//                           leaveStatesHandler = () => setShowIndianGroupStates(false);
//                         } else if (isIntl && isIndividual) {
//                           showThisStates = showIntlIndividualStates;
//                           enterHandler = () => setShowIntlIndividualStates(true);
//                           leaveHandler = () => setShowIntlIndividualStates(false);
//                           enterStatesHandler = () => setShowIntlIndividualStates(true);
//                           leaveStatesHandler = () => setShowIntlIndividualStates(false);
//                         } else if (isIntl && isGroup) {
//                           showThisStates = showIntlGroupStates;
//                           enterHandler = () => setShowIntlGroupStates(true);
//                           leaveHandler = () => setShowIntlGroupStates(false);
//                           enterStatesHandler = () => setShowIntlGroupStates(true);
//                           leaveStatesHandler = () => setShowIntlGroupStates(false);
//                         }
//                         return (
//                           <div key={idx} className="relative">
//                             <div
//                               className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-3.5 text-sm hover:bg-blue-50 border-l-2 border-transparent hover:border-blue-500 mx-2 sm:mx-3 rounded-lg block cursor-pointer transition-colors ${sub.subDropdown ? "pr-2" : ""}`}
//                               onMouseEnter={enterHandler}
//                               onMouseLeave={leaveHandler}
//                             >
//                               <a href={sub.href} className="flex items-center gap-2 sm:gap-3 w-full">
//                                 <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
//                                   <sub.icon className="w-4 h-4 text-blue-600" />
//                                 </div>
//                                 <span className="font-medium flex-grow">{sub.label}</span>
//                                 {sub.subDropdown && <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0" />}
//                               </a>
//                             </div>
//                             {/* STATES LIST - SPECIAL LINK FOR ANDAMAN */}
//                             {sub.subDropdown && showThisStates && (
//                               <div
//                                 className="absolute left-full top-0 -ml-4 bg-white text-gray-800 rounded-xl shadow-2xl w-[500px] sm:w-[600px] py-4 border border-gray-200 opacity-100 visible transition-all duration-300 ease-in-out z-50 max-h-[70vh] overflow-y-auto"
//                                 onMouseEnter={enterStatesHandler}
//                                 onMouseLeave={leaveStatesHandler}
//                               >
//                                 <table className="min-w-full divide-y divide-gray-200">
//                                   <tbody className="bg-white divide-y divide-gray-200">
//                                     {sub.subDropdown.reduce((rows: any[], dest, index) => {
//                                       if (index % 3 === 0) rows.push([]);
//                                       rows[rows.length - 1].push(dest);
//                                       return rows;
//                                     }, []).map((row, rowIndex) => (
//                                       <tr key={rowIndex} className="even:bg-gray-50">
//                                         {row.map((dest: string, colIndex: number) => {
//                                           const isAndaman = dest === "Andaman & Nicobar Islands";
//                                           const href = isAndaman
//                                             ? "/tours-packages"
//                                             : `#${item.label.toLowerCase().replace(/\s/g, "-")}-state-${dest.toLowerCase().replace(/\s+/g, "-")}`;
//                                           return (
//                                             <td key={colIndex} className="px-3 py-2.5 whitespace-nowrap">
//                                               <a
//                                                 href={href}
//                                                 className={`block w-full text-sm font-medium text-left transition-colors ${isAndaman
//                                                   ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-lg"
//                                                   : "hover:bg-blue-50 hover:text-blue-600"
//                                                 }`}
//                                                 title={dest}
//                                               >
//                                                 {dest}
//                                                 {isAndaman && <Sparkles className="inline-block w-4 h-4 ml-1 animate-pulse" />}
//                                               </a>
//                                             </td>
//                                           );
//                                         })}
//                                         {row.length < 3 && [...Array(3 - row.length)].map((_, colIndex) => (
//                                           <td key={colIndex} className="px-3 py-2.5"></td>
//                                         ))}
//                                       </tr>
//                                     ))}
//                                   </tbody>
//                                 </table>
//                               </div>
//                             )}
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </nav>
//           {/* Desktop Login/Signup */}
//           <div className="hidden lg:flex items-center gap-2 ml-auto">
//             {/* Sign Up */}
//             <div className="relative group">
//               <Button variant="ghost" size="sm" className="bg-green-500 hover:bg-green-600 text-white px-4 sm:px-5 py-2 rounded-lg border border-green-600 flex items-center gap-2">
//                 <UserPlus className="w-4 h-4" />
//                 <span className="font-medium text-sm">Sign Up</span>
//                 <ChevronDown className="w-3 h-3" />
//               </Button>
//               <div className="absolute right-0 top-full mt-2 opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-white text-gray-800 rounded-xl shadow-2xl py-2 border border-gray-200 transition-all duration-300 z-50 min-w-[140px]">
//                 <a href="#new-user" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <UserPlus className="w-4 h-4 text-blue-600" /> New User
//                 </a>
//                 <a href="#new-agent" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <Users className="w-4 h-4 text-blue-600" /> New Agent
//                 </a>
//               </div>
//             </div>
//             {/* Login */}
//             <div className="relative group">
//               <Button variant="ghost" size="sm" className="bg-red-500 hover:bg-red-600 text-white px-4 sm:px-5 py-2 rounded-lg border border-red-600 flex items-center gap-2">
//                 <UserCircle className="w-4 h-4" />
//                 <span className="font-medium text-sm">Login</span>
//                 <ChevronDown className="w-3 h-3" />
//               </Button>
//               <div className="absolute right-0 top-full mt-2 opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-white text-gray-800 rounded-xl shadow-2xl py-2 border border-gray-200 transition-all duration-300 z-50 min-w-[140px]">
//                 <a href="#user-login" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <UserCircle className="w-4 h-4 text-blue-600" /> User Login
//                 </a>
//                 <a href="#agent-login" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <Users className="w-4 h-4 text-blue-600" /> Agent Login
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* MOBILE MENU - Also updated for Andaman */}
//         {mobileMenuOpen && (
//           <nav className="lg:hidden bg-primary text-primary-foreground border-t border-blue-400">
//             <ul className="flex flex-col">
//               {navItems.map((item, index) => (
//                 <li key={index} className="border-b border-blue-500">
//                   {!item.dropdown ? (
//                     <a href={item.href} className="flex gap-2 items-center px-4 py-3 hover:bg-white/10 transition-colors">
//                       <item.icon className="w-5 h-5" />
//                       <span className="font-medium text-sm">{item.label}</span>
//                     </a>
//                   ) : (
//                     <>
//                       <button
//                         onClick={() => toggleMobileSubmenu(item.label)}
//                         className="w-full flex justify-between items-center px-4 py-3 hover:bg-white/10 transition-colors font-medium text-sm"
//                       >
//                         <div className="flex items-center gap-2">
//                           <item.icon className="w-5 h-5" />
//                           <span>{item.label}</span>
//                         </div>
//                         <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileSubmenuOpen[item.label] ? "rotate-180" : ""}`} />
//                       </button>
//                       {mobileSubmenuOpen[item.label] && (
//                         <ul className="bg-primary border-t border-blue-500">
//                           {item.dropdown.map((sub, i) => (
//                             <li key={i} className="border-b border-blue-600">
//                               {!sub.subDropdown ? (
//                                 <a href={sub.href} className="flex items-center gap-2 px-8 py-2 hover:bg-white/10 transition-colors font-normal text-sm">
//                                   <sub.icon className="w-4 h-4" />
//                                   <span>{sub.label}</span>
//                                 </a>
//                               ) : (
//                                 <>
//                                   <button
//                                     onClick={() => toggleMobileSubmenu(sub.label)}
//                                     className="w-full flex justify-between items-center px-8 py-2 hover:bg-white/10 transition-colors font-normal text-sm"
//                                   >
//                                     <div className="flex items-center gap-2">
//                                       <sub.icon className="w-4 h-4" />
//                                       <span>{sub.label}</span>
//                                     </div>
//                                     <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileSubmenuOpen[sub.label] ? "rotate-180" : ""}`} />
//                                   </button>
//                                   {mobileSubmenuOpen[sub.label] && (
//                                     <ul className="bg-primary border-t border-blue-600">
//                                       {sub.subDropdown.map((dest, j) => {
//                                         const isAndaman = dest === "Andaman & Nicobar Islands";
//                                         return (
//                                           <li key={j}>
//                                             <a
//                                               href={isAndaman ? "/tours-packages" : "#"}
//                                               className={`block px-12 py-2 text-sm font-medium ${isAndaman ? "text-cyan-400 font-bold" : "text-gray-300"} hover:text-white`}
//                                             >
//                                               {dest} {isAndaman && "(Featured)"}
//                                             </a>
//                                           </li>
//                                         );
//                                       })}
//                                     </ul>
//                                   )}
//                                 </>
//                               )}
//                             </li>
//                           ))}
//                         </ul>
//                       )}
//                     </>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         )}
//       </div>
//     </header>
//   );
// };
// export default Header;





// import {
//   Ship, Compass, Phone, UserCircle, Home as HomeIcon, ChevronDown, Sparkles, Heart,
//   GraduationCap, Car, Bus, Landmark, Umbrella, CalendarDays, Users, Shield, Star,
//   UsersRound, Globe, MapPin, ChevronRight, PlaneTakeoff, UserPlus, Menu as MenuIcon,
//   X as XIcon,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import logo from "../assets/png[3].png";
// import { useState } from "react";
// const indianStates = [
//   "Andaman & Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam",
//   "Bihar", "Chandigarh", "Chhattisgarh", "Dadra & Nagar Haveli", "Daman & Diu",
//   "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir",
//   "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh",
//   "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
//   "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
//   "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
// ].sort();
// const internationalDestinations = [
//   "Africa", "America", "Australia NewZealand", "Bhutan", "Dubai and MiddleEast",
//   "Eurasia", "Europe", "Japan China", "Mauritius", "Nepal", "Seychelles",
//   "South East Asia", "SriLanka Maldives",
// ];
// const Header = () => {
//   const [showIndianIndividualStates, setShowIndianIndividualStates] = useState(false);
//   const [showIndianGroupStates, setShowIndianGroupStates] = useState(false);
//   const [showIntlIndividualStates, setShowIntlIndividualStates] = useState(false);
//   const [showIntlGroupStates, setShowIntlGroupStates] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState({});
//   const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);
//   const toggleMobileSubmenu = (label: string) => {
//     setMobileSubmenuOpen(prev => ({ ...prev, [label]: !prev[label] }));
//   };
//   const navItems = [
//     { icon: HomeIcon, label: "Home", href: "/" },
//     {
//       icon: MapPin, label: "Indian Tours",
//       dropdown: [
//         { label: "Individual Tours", href: "#indian-individual", icon: Users, subDropdown: indianStates },
//         { label: "Group Tours", href: "#indian-group", icon: UsersRound, subDropdown: indianStates },
//         { label: "Ladies Special Tours", href: "#indian-ladies", icon: Sparkles },
//         { label: "Senior Citizen Tours", href: "#indian-senior", icon: Heart },
//         { label: "Students Tours", href: "#indian-students", icon: GraduationCap },
//         { label: "Honeymoon Tours", href: "#indian-honeymoon", icon: Heart },
//       ],
//     },
//     {
//       icon: Globe, label: "International Tours",
//       dropdown: [
//         { label: "Individual Tours", href: "#intl-individual", icon: Users, subDropdown: internationalDestinations },
//         { label: "Group Tours", href: "#intl-group", icon: UsersRound, subDropdown: internationalDestinations },
//         { label: "Ladies Special Tours", href: "#intl-ladies", icon: Sparkles },
//         { label: "Senior Citizen Tours", href: "#intl-senior", icon: Heart },
//         { label: "Students Tours", href: "#intl-students", icon: GraduationCap },
//         { label: "Honeymoon Tours", href: "#intl-honeymoon", icon: Heart },
//       ],
//     },
//     { icon: Ship, label: "Exhibitions", href: "#exhibitions" },
//     { icon: Compass, label: "MICE", href: "#mice" },
//     { icon: PlaneTakeoff, label: "Visa", href: "#visa" },
//     {
//       icon: Star, label: "Others",
//       dropdown: [
//   { label: "Bungalow / Villa", href: "#bungalow-villa", icon: HomeIcon },
//   { label: "Bus", href: "#bus", icon: Bus },
//   { label: "Car", href: "#car", icon: Car },
//   { label: "Cruise", href: "#cruise", icon: Ship },
//   { label: "Festivals", href: "#festivals", icon: Sparkles },
//   { label: "Insurances", href: "#insurances", icon: Umbrella },
//   { label: "Passport", href: "#passport", icon: Landmark },
//   { label: "Sports", href: "#sports", icon: Shield },
//   { label: "Weekend Gateways", href: "#weekend-gateways", icon: CalendarDays },
// ],
//     },
//     { icon: UsersRound, label: "About Us", href: "#about" },
//     { icon: Phone, label: "Contact Us", href: "#contact" },
//   ];
//   return (
//     <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-xl border-b-2 border-blue-400 w-full">
//       <div className="w-full px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between py-3">
//           {/* LOGO */}
//           <div className="flex items-center">
//             <div className="relative group cursor-pointer">
//               <div className="absolute -inset-3 bg-white/10 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               <img
//                 src={logo}
//                 alt="SK Tours Logo"
//                 className="h-12 sm:h-14 w-auto object-contain relative z-10 transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
//               />
//             </div>
//           </div>
//           {/* Mobile Toggle */}
//           <button
//             onClick={toggleMobileMenu}
//             className="lg:hidden text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
//           >
//             {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
//           </button>
//           {/* DESKTOP NAV */}
//           <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
//             {navItems.map((item, index) => (
//               <div key={index} className="relative group">
//                 {!item.dropdown ? (
//                   <a
//                     href={item.href}
//                     className="flex flex-col items-center px-3 sm:px-4 py-3 transition-all duration-300 hover:bg-white/15 rounded-lg min-w-[80px] sm:min-w-[90px]"
//                   >
//                     <item.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
//                     <span className="text-sm font-medium">{item.label}</span>
//                   </a>
//                 ) : (
//                   <div className="relative">
//                     <div className="flex flex-col items-center px-3 sm:px-4 py-3 transition-all duration-300 hover:bg-white/15 rounded-lg min-w-[100px] sm:min-w-[110px] cursor-pointer">
//                       <item.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
//                       <div className="flex items-center gap-1">
//                         <span className="text-sm font-medium">{item.label}</span>
//                         <ChevronDown className="w-3 h-3" />
//                       </div>
//                     </div>
//                     {/* MEGA DROPDOWN */}
//                     <div className="absolute left-1/2 -translate-x-1/2 top-full opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-white text-gray-800 rounded-xl shadow-2xl w-72 sm:w-80 py-4 border border-gray-200 transition-all duration-300 ease-in-out z-50">
//                       {item.dropdown.map((sub, idx) => {
//                         const isIndian = item.label === "Indian Tours";
//                         const isIntl = item.label === "International Tours";
//                         const isIndividual = sub.label === "Individual Tours";
//                         const isGroup = sub.label === "Group Tours";
//                         let showThisStates = false;
//                         let enterHandler = null;
//                         let leaveHandler = null;
//                         let enterStatesHandler = null;
//                         let leaveStatesHandler = null;
//                         if (isIndian && isIndividual) {
//                           showThisStates = showIndianIndividualStates;
//                           enterHandler = () => setShowIndianIndividualStates(true);
//                           leaveHandler = () => setShowIndianIndividualStates(false);
//                           enterStatesHandler = () => setShowIndianIndividualStates(true);
//                           leaveStatesHandler = () => setShowIndianIndividualStates(false);
//                         } else if (isIndian && isGroup) {
//                           showThisStates = showIndianGroupStates;
//                           enterHandler = () => setShowIndianGroupStates(true);
//                           leaveHandler = () => setShowIndianGroupStates(false);
//                           enterStatesHandler = () => setShowIndianGroupStates(true);
//                           leaveStatesHandler = () => setShowIndianGroupStates(false);
//                         } else if (isIntl && isIndividual) {
//                           showThisStates = showIntlIndividualStates;
//                           enterHandler = () => setShowIntlIndividualStates(true);
//                           leaveHandler = () => setShowIntlIndividualStates(false);
//                           enterStatesHandler = () => setShowIntlIndividualStates(true);
//                           leaveStatesHandler = () => setShowIntlIndividualStates(false);
//                         } else if (isIntl && isGroup) {
//                           showThisStates = showIntlGroupStates;
//                           enterHandler = () => setShowIntlGroupStates(true);
//                           leaveHandler = () => setShowIntlGroupStates(false);
//                           enterStatesHandler = () => setShowIntlGroupStates(true);
//                           leaveStatesHandler = () => setShowIntlGroupStates(false);
//                         }
//                         return (
//                           <div key={idx} className="relative">
//                             <div
//                               className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-3.5 text-sm hover:bg-blue-50 border-l-2 border-transparent hover:border-blue-500 mx-2 sm:mx-3 rounded-lg block cursor-pointer transition-colors ${sub.subDropdown ? "pr-2" : ""}`}
//                               onMouseEnter={enterHandler}
//                               onMouseLeave={leaveHandler}
//                             >
//                               <a href={sub.href} className="flex items-center gap-2 sm:gap-3 w-full">
//                                 <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
//                                   <sub.icon className="w-4 h-4 text-blue-600" />
//                                 </div>
//                                 <span className="font-medium flex-grow">{sub.label}</span>
//                                 {sub.subDropdown && <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0" />}
//                               </a>
//                             </div>
//                             {/* STATES LIST - SPECIAL LINK FOR ANDAMAN */}
//                             {sub.subDropdown && showThisStates && (
//                               <div
//                                 className="absolute left-full top-0 -ml-4 bg-white text-gray-800 rounded-xl shadow-2xl w-[500px] sm:w-[600px] py-4 border border-gray-200 opacity-100 visible transition-all duration-300 ease-in-out z-50 max-h-[70vh] overflow-y-auto"
//                                 onMouseEnter={enterStatesHandler}
//                                 onMouseLeave={leaveStatesHandler}
//                               >
//                                 <table className="min-w-full divide-y divide-gray-200">
//                                   <tbody className="bg-white divide-y divide-gray-200">
//                                     {sub.subDropdown.reduce((rows: any[], dest, index) => {
//                                       if (index % 3 === 0) rows.push([]);
//                                       rows[rows.length - 1].push(dest);
//                                       return rows;
//                                     }, []).map((row, rowIndex) => (
//                                       <tr key={rowIndex} className="even:bg-gray-50">
//                                         {row.map((dest: string, colIndex: number) => {
//                                           const isAndaman = dest === "Andaman & Nicobar Islands";
//                                           const href = isAndaman
//                                             ? "/tours-packages"
//                                             : `#${item.label.toLowerCase().replace(/\s/g, "-")}-state-${dest.toLowerCase().replace(/\s+/g, "-")}`;
//                                           return (
//                                             <td key={colIndex} className="px-3 py-2.5 whitespace-nowrap border-r border-gray-200">
//                                               <a
//                                                 href={href}
//                                                 className={`block w-full text-sm font-medium text-left transition-colors ${isAndaman
//                                                   ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-lg"
//                                                   : "hover:bg-blue-50 hover:text-blue-600"
//                                                 }`}
//                                                 title={dest}
//                                               >
//                                                 {dest}
//                                                 {isAndaman && <Sparkles className="inline-block w-4 h-4 ml-1 animate-pulse" />}
//                                               </a>
//                                             </td>
//                                           );
//                                         })}
//                                         {row.length < 3 && [...Array(3 - row.length)].map((_, colIndex) => (
//                                           <td key={colIndex} className="px-3 py-2.5 border-r border-gray-200"></td>
//                                         ))}
//                                       </tr>
//                                     ))}
//                                   </tbody>
//                                 </table>
//                               </div>
//                             )}
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </nav>
//           {/* Desktop Login/Signup */}
//           <div className="hidden lg:flex items-center gap-2 ml-auto">
//             {/* Sign Up */}
//             <div className="relative group">
//               <Button variant="ghost" size="sm" className="bg-green-500 hover:bg-green-600 text-white px-4 sm:px-5 py-2 rounded-lg border border-green-600 flex items-center gap-2">
//                 <UserPlus className="w-4 h-4" />
//                 <span className="font-medium text-sm">Sign Up</span>
//                 <ChevronDown className="w-3 h-3" />
//               </Button>
//               <div className="absolute right-0 top-full mt-2 opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-white text-gray-800 rounded-xl shadow-2xl py-2 border border-gray-200 transition-all duration-300 z-50 min-w-[140px]">
//                 <a href="#new-user" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <UserPlus className="w-4 h-4 text-blue-600" /> New User
//                 </a>
//                 <a href="#new-agent" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <Users className="w-4 h-4 text-blue-600" /> New Agent
//                 </a>
//               </div>
//             </div>
//             {/* Login */}
//             <div className="relative group">
//               <Button variant="ghost" size="sm" className="bg-red-500 hover:bg-red-600 text-white px-4 sm:px-5 py-2 rounded-lg border border-red-600 flex items-center gap-2">
//                 <UserCircle className="w-4 h-4" />
//                 <span className="font-medium text-sm">Login</span>
//                 <ChevronDown className="w-3 h-3" />
//               </Button>
//               <div className="absolute right-0 top-full mt-2 opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-white text-gray-800 rounded-xl shadow-2xl py-2 border border-gray-200 transition-all duration-300 z-50 min-w-[140px]">
//                 <a href="#user-login" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <UserCircle className="w-4 h-4 text-blue-600" /> User Login
//                 </a>
//                 <a href="#agent-login" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <Users className="w-4 h-4 text-blue-600" /> Agent Login
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* MOBILE MENU - Also updated for Andaman */}
//         {mobileMenuOpen && (
//           <nav className="lg:hidden bg-primary text-primary-foreground border-t border-blue-400">
//             <ul className="flex flex-col">
//               {navItems.map((item, index) => (
//                 <li key={index} className="border-b border-blue-500">
//                   {!item.dropdown ? (
//                     <a href={item.href} className="flex gap-2 items-center px-4 py-3 hover:bg-white/10 transition-colors">
//                       <item.icon className="w-5 h-5" />
//                       <span className="font-medium text-sm">{item.label}</span>
//                     </a>
//                   ) : (
//                     <>
//                       <button
//                         onClick={() => toggleMobileSubmenu(item.label)}
//                         className="w-full flex justify-between items-center px-4 py-3 hover:bg-white/10 transition-colors font-medium text-sm"
//                       >
//                         <div className="flex items-center gap-2">
//                           <item.icon className="w-5 h-5" />
//                           <span>{item.label}</span>
//                         </div>
//                         <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileSubmenuOpen[item.label] ? "rotate-180" : ""}`} />
//                       </button>
//                       {mobileSubmenuOpen[item.label] && (
//                         <ul className="bg-primary border-t border-blue-500">
//                           {item.dropdown.map((sub, i) => (
//                             <li key={i} className="border-b border-blue-600">
//                               {!sub.subDropdown ? (
//                                 <a href={sub.href} className="flex items-center gap-2 px-8 py-2 hover:bg-white/10 transition-colors font-normal text-sm">
//                                   <sub.icon className="w-4 h-4" />
//                                   <span>{sub.label}</span>
//                                 </a>
//                               ) : (
//                                 <>
//                                   <button
//                                     onClick={() => toggleMobileSubmenu(sub.label)}
//                                     className="w-full flex justify-between items-center px-8 py-2 hover:bg-white/10 transition-colors font-normal text-sm"
//                                   >
//                                     <div className="flex items-center gap-2">
//                                       <sub.icon className="w-4 h-4" />
//                                       <span>{sub.label}</span>
//                                     </div>
//                                     <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileSubmenuOpen[sub.label] ? "rotate-180" : ""}`} />
//                                   </button>
//                                   {mobileSubmenuOpen[sub.label] && (
//                                     <ul className="bg-primary border-t border-blue-600">
//                                       {sub.subDropdown.map((dest, j) => {
//                                         const isAndaman = dest === "Andaman & Nicobar Islands";
//                                         return (
//                                           <li key={j}>
//                                             <a
//                                               href={isAndaman ? "/tours-packages" : "#"}
//                                               className={`block px-12 py-2 text-sm font-medium ${isAndaman ? "text-cyan-400 font-bold" : "text-gray-300"} hover:text-white`}
//                                             >
//                                               {dest} {isAndaman && "(Featured)"}
//                                             </a>
//                                           </li>
//                                         );
//                                       })}
//                                     </ul>
//                                   )}
//                                 </>
//                               )}
//                             </li>
//                           ))}
//                         </ul>
//                       )}
//                     </>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         )}
//       </div>
//     </header>
//   );
// };
// export default Header;





// import {
//   Ship, Compass, Phone, UserCircle, Home as HomeIcon, ChevronDown, Sparkles, Heart,
//   GraduationCap, Car, Bus, Landmark, Umbrella, CalendarDays, Users, Shield, Star,
//   UsersRound, Globe, MapPin, ChevronRight, PlaneTakeoff, UserPlus, Menu as MenuIcon,
//   X as XIcon,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import logo from "../assets/png[3].png";
// import { useState } from "react";

// const indianStates = [
//   "Andaman & Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam",
//   "Bihar", "Chandigarh", "Chhattisgarh", "Dadra & Nagar Haveli", "Daman & Diu",
//   "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir",
//   "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh",
//   "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
//   "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
//   "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
// ].sort();

// const internationalDestinations = [
//   "Africa", "America", "Australia NewZealand", "Bhutan", "Dubai and MiddleEast",
//   "Eurasia", "Europe", "Japan China", "Mauritius", "Nepal", "Seychelles",
//   "South East Asia", "SriLanka Maldives",
// ];

// const Header = () => {
//   const [showIndianIndividualStates, setShowIndianIndividualStates] = useState(false);
//   const [showIndianGroupStates, setShowIndianGroupStates] = useState(false);
//   const [showIntlIndividualStates, setShowIntlIndividualStates] = useState(false);
//   const [showIntlGroupStates, setShowIntlGroupStates] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState({});
//   const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);
//   const toggleMobileSubmenu = (label: string) => {
//     setMobileSubmenuOpen(prev => ({ ...prev, [label]: !prev[label] }));
//   };
//   const navItems = [
//     { icon: HomeIcon, label: "Home", href: "/" },
//     {
//       icon: MapPin, label: "Indian Tours",
//       dropdown: [
//         { label: "Individual Tours", href: "#indian-individual", icon: Users, subDropdown: indianStates },
//         { label: "Group Tours", href: "#indian-group", icon: UsersRound, subDropdown: indianStates },
//         { label: "Ladies Special Tours", href: "#indian-ladies", icon: Sparkles },
//         { label: "Senior Citizen Tours", href: "#indian-senior", icon: Heart },
//         { label: "Students Tours", href: "#indian-students", icon: GraduationCap },
//         { label: "Honeymoon Tours", href: "#indian-honeymoon", icon: Heart },
//       ],
//     },
//     {
//       icon: Globe, label: "International Tours",
//       dropdown: [
//         { label: "Individual Tours", href: "#intl-individual", icon: Users, subDropdown: internationalDestinations },
//         { label: "Group Tours", href: "#intl-group", icon: UsersRound, subDropdown: internationalDestinations },
//         { label: "Ladies Special Tours", href: "#intl-ladies", icon: Sparkles },
//         { label: "Senior Citizen Tours", href: "#intl-senior", icon: Heart },
//         { label: "Students Tours", href: "#intl-students", icon: GraduationCap },
//         { label: "Honeymoon Tours", href: "#intl-honeymoon", icon: Heart },
//       ],
//     },
//     { icon: Ship, label: "Exhibitions", href: "#exhibitions" },
//     { icon: Compass, label: "MICE", href: "#mice" },
//     { icon: PlaneTakeoff, label: "Visa", href: "#visa" },
//     {
//       icon: Star, label: "Others",
//       dropdown: [
//   { label: "Bungalow / Villa", href: "#bungalow-villa", icon: HomeIcon },
//   { label: "Bus", href: "#bus", icon: Bus },
//   { label: "Car", href: "#car", icon: Car },
//   { label: "Cruise", href: "#cruise", icon: Ship },
//   { label: "Festivals", href: "#festivals", icon: Sparkles },
//   { label: "Insurances", href: "#insurances", icon: Umbrella },
//   { label: "Passport", href: "#passport", icon: Landmark },
//   { label: "Sports", href: "#sports", icon: Shield },
//   { label: "Weekend Gateways", href: "#weekend-gateways", icon: CalendarDays },
// ],
//     },
//     { icon: UsersRound, label: "About Us", href: "#about" },
//     { icon: Phone, label: "Contact Us", href: "#contact" },
//   ];
//   return (
//     <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-xl border-b-2 border-blue-400 w-full">
//       <div className="w-full px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between py-3">
//           {/* LOGO */}
//           <div className="flex items-center">
//             <div className="relative group cursor-pointer">
//               <div className="absolute -inset-3 bg-white/10 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               <img
//                 src={logo}
//                 alt="SK Tours Logo"
//                 className="h-12 sm:h-14 w-auto object-contain relative z-10 transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
//               />
//             </div>
//           </div>
//           {/* Mobile Toggle */}
//           <button
//             onClick={toggleMobileMenu}
//             className="lg:hidden text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
//           >
//             {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
//           </button>
//           {/* DESKTOP NAV */}
//           <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
//             {navItems.map((item, index) => (
//               <div key={index} className="relative group">
//                 {!item.dropdown ? (
//                   <a
//                     href={item.href}
//                     className="flex flex-col items-center px-3 sm:px-4 py-3 transition-all duration-300 hover:bg-white/15 rounded-lg min-w-[80px] sm:min-w-[90px]"
//                   >
//                     <item.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
//                     <span className="text-sm font-medium">{item.label}</span>
//                   </a>
//                 ) : (
//                   <div className="relative">
//                     <div className="flex flex-col items-center px-3 sm:px-4 py-3 transition-all duration-300 hover:bg-white/15 rounded-lg min-w-[100px] sm:min-w-[110px] cursor-pointer">
//                       <item.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
//                       <div className="flex items-center gap-1">
//                         <span className="text-sm font-medium">{item.label}</span>
//                         <ChevronDown className="w-3 h-3" />
//                       </div>
//                     </div>
//                     {/* MEGA DROPDOWN */}
//                     <div className="absolute left-1/2 -translate-x-1/2 top-full opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-white text-gray-800 rounded-xl shadow-2xl w-72 sm:w-80 py-4 border border-gray-200 transition-all duration-300 ease-in-out z-50">
//                       {item.dropdown.map((sub, idx) => {
//                         const isIndian = item.label === "Indian Tours";
//                         const isIntl = item.label === "International Tours";
//                         const isIndividual = sub.label === "Individual Tours";
//                         const isGroup = sub.label === "Group Tours";
//                         let showThisStates = false;
//                         let enterHandler = null;
//                         let leaveHandler = null;
//                         let enterStatesHandler = null;
//                         let leaveStatesHandler = null;
//                         if (isIndian && isIndividual) {
//                           showThisStates = showIndianIndividualStates;
//                           enterHandler = () => setShowIndianIndividualStates(true);
//                           leaveHandler = () => setShowIndianIndividualStates(false);
//                           enterStatesHandler = () => setShowIndianIndividualStates(true);
//                           leaveStatesHandler = () => setShowIndianIndividualStates(false);
//                         } else if (isIndian && isGroup) {
//                           showThisStates = showIndianGroupStates;
//                           enterHandler = () => setShowIndianGroupStates(true);
//                           leaveHandler = () => setShowIndianGroupStates(false);
//                           enterStatesHandler = () => setShowIndianGroupStates(true);
//                           leaveStatesHandler = () => setShowIndianGroupStates(false);
//                         } else if (isIntl && isIndividual) {
//                           showThisStates = showIntlIndividualStates;
//                           enterHandler = () => setShowIntlIndividualStates(true);
//                           leaveHandler = () => setShowIntlIndividualStates(false);
//                           enterStatesHandler = () => setShowIntlIndividualStates(true);
//                           leaveStatesHandler = () => setShowIntlIndividualStates(false);
//                         } else if (isIntl && isGroup) {
//                           showThisStates = showIntlGroupStates;
//                           enterHandler = () => setShowIntlGroupStates(true);
//                           leaveHandler = () => setShowIntlGroupStates(false);
//                           enterStatesHandler = () => setShowIntlGroupStates(true);
//                           leaveStatesHandler = () => setShowIntlGroupStates(false);
//                         }
//                         return (
//                           <div key={idx} className="relative">
//                             <div
//                               className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-3.5 text-sm hover:bg-blue-50 border-l-2 border-transparent hover:border-blue-500 mx-2 sm:mx-3 rounded-lg block cursor-pointer transition-colors ${sub.subDropdown ? "pr-2" : ""}`}
//                               onMouseEnter={enterHandler}
//                               onMouseLeave={leaveHandler}
//                             >
//                               <a href={sub.href} className="flex items-center gap-2 sm:gap-3 w-full">
//                                 <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
//                                   <sub.icon className="w-4 h-4 text-blue-600" />
//                                 </div>
//                                 <span className="font-medium flex-grow">{sub.label}</span>
//                                 {sub.subDropdown && <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0" />}
//                               </a>
//                             </div>
//                             {/* STATES LIST - SPECIAL LINK FOR ANDAMAN */}
//                             {sub.subDropdown && showThisStates && (
//                               <div
//                                 className="absolute left-full top-0 -ml-4 bg-white text-gray-800 rounded-xl shadow-2xl w-[500px] sm:w-[600px] py-4 border border-gray-200 opacity-100 visible transition-all duration-300 ease-in-out z-50 max-h-[70vh] overflow-y-auto"
//                                 onMouseEnter={enterStatesHandler}
//                                 onMouseLeave={leaveStatesHandler}
//                               >
//                                 <table className="min-w-full divide-y divide-gray-200">
//                                   <tbody className="bg-white divide-y divide-gray-200">
//                                     {sub.subDropdown.reduce((rows: any[], dest, index) => {
//                                       if (index % 3 === 0) rows.push([]);
//                                       rows[rows.length - 1].push(dest);
//                                       return rows;
//                                     }, []).map((row, rowIndex) => (
//                                       <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-blue-100" : "bg-blue-800 text-white"}>
//                                         {row.map((dest: string, colIndex: number) => {
//                                           const isAndaman = dest === "Andaman & Nicobar Islands";
//                                           const href = isAndaman
//                                             ? "/tours-packages"
//                                             : `#${item.label.toLowerCase().replace(/\s/g, "-")}-state-${dest.toLowerCase().replace(/\s+/g, "-")}`;
//                                           return (
//                                             <td key={colIndex} className="px-3 py-2.5 whitespace-nowrap border-r border-gray-200">
//                                               <a
//                                                 href={href}
//                                                 className={`block w-full text-sm font-medium text-left transition-colors ${isAndaman
//                                                   ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-lg"
//                                                   : rowIndex % 2 === 0 
//                                                     ? "hover:bg-blue-200 hover:text-blue-800" 
//                                                     : "hover:bg-blue-700 hover:text-white"
//                                                 }`}
//                                                 title={dest}
//                                               >
//                                                 {dest}
//                                                 {isAndaman && <Sparkles className="inline-block w-4 h-4 ml-1 animate-pulse" />}
//                                               </a>
//                                             </td>
//                                           );
//                                         })}
//                                         {row.length < 3 && [...Array(3 - row.length)].map((_, colIndex) => (
//                                           <td key={colIndex} className={`px-3 py-2.5 border-r border-gray-200 ${rowIndex % 2 === 0 ? "bg-blue-100" : "bg-blue-800"}`}></td>
//                                         ))}
//                                       </tr>
//                                     ))}
//                                   </tbody>
//                                 </table>
//                               </div>
//                             )}
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </nav>
//           {/* Desktop Login/Signup */}
//           <div className="hidden lg:flex items-center gap-2 ml-auto">
//             {/* Sign Up */}
//             <div className="relative group">
//               <Button variant="ghost" size="sm" className="bg-green-500 hover:bg-green-600 text-white px-4 sm:px-5 py-2 rounded-lg border border-green-600 flex items-center gap-2">
//                 <UserPlus className="w-4 h-4" />
//                 <span className="font-medium text-sm">Sign Up</span>
//                 <ChevronDown className="w-3 h-3" />
//               </Button>
//               <div className="absolute right-0 top-full mt-2 opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-white text-gray-800 rounded-xl shadow-2xl py-2 border border-gray-200 transition-all duration-300 z-50 min-w-[140px]">
//                 <a href="#new-user" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <UserPlus className="w-4 h-4 text-blue-600" /> New User
//                 </a>
//                 <a href="#new-agent" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <Users className="w-4 h-4 text-blue-600" /> New Agent
//                 </a>
//               </div>
//             </div>
//             {/* Login */}
//             <div className="relative group">
//               <Button variant="ghost" size="sm" className="bg-red-500 hover:bg-red-600 text-white px-4 sm:px-5 py-2 rounded-lg border border-red-600 flex items-center gap-2">
//                 <UserCircle className="w-4 h-4" />
//                 <span className="font-medium text-sm">Login</span>
//                 <ChevronDown className="w-3 h-3" />
//               </Button>
//               <div className="absolute right-0 top-full mt-2 opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-white text-gray-800 rounded-xl shadow-2xl py-2 border border-gray-200 transition-all duration-300 z-50 min-w-[140px]">
//                 <a href="#user-login" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <UserCircle className="w-4 h-4 text-blue-600" /> User Login
//                 </a>
//                 <a href="#agent-login" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <Users className="w-4 h-4 text-blue-600" /> Agent Login
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* MOBILE MENU - Also updated for Andaman */}
//         {mobileMenuOpen && (
//           <nav className="lg:hidden bg-primary text-primary-foreground border-t border-blue-400">
//             <ul className="flex flex-col">
//               {navItems.map((item, index) => (
//                 <li key={index} className="border-b border-blue-500">
//                   {!item.dropdown ? (
//                     <a href={item.href} className="flex gap-2 items-center px-4 py-3 hover:bg-white/10 transition-colors">
//                       <item.icon className="w-5 h-5" />
//                       <span className="font-medium text-sm">{item.label}</span>
//                     </a>
//                   ) : (
//                     <>
//                       <button
//                         onClick={() => toggleMobileSubmenu(item.label)}
//                         className="w-full flex justify-between items-center px-4 py-3 hover:bg-white/10 transition-colors font-medium text-sm"
//                       >
//                         <div className="flex items-center gap-2">
//                           <item.icon className="w-5 h-5" />
//                           <span>{item.label}</span>
//                         </div>
//                         <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileSubmenuOpen[item.label] ? "rotate-180" : ""}`} />
//                       </button>
//                       {mobileSubmenuOpen[item.label] && (
//                         <ul className="bg-primary border-t border-blue-500">
//                           {item.dropdown.map((sub, i) => (
//                             <li key={i} className="border-b border-blue-600">
//                               {!sub.subDropdown ? (
//                                 <a href={sub.href} className="flex items-center gap-2 px-8 py-2 hover:bg-white/10 transition-colors font-normal text-sm">
//                                   <sub.icon className="w-4 h-4" />
//                                   <span>{sub.label}</span>
//                                 </a>
//                               ) : (
//                                 <>
//                                   <button
//                                     onClick={() => toggleMobileSubmenu(sub.label)}
//                                     className="w-full flex justify-between items-center px-8 py-2 hover:bg-white/10 transition-colors font-normal text-sm"
//                                   >
//                                     <div className="flex items-center gap-2">
//                                       <sub.icon className="w-4 h-4" />
//                                       <span>{sub.label}</span>
//                                     </div>
//                                     <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileSubmenuOpen[sub.label] ? "rotate-180" : ""}`} />
//                                   </button>
//                                   {mobileSubmenuOpen[sub.label] && (
//                                     <ul className="bg-primary border-t border-blue-600">
//                                       {sub.subDropdown.map((dest, j) => {
//                                         const isAndaman = dest === "Andaman & Nicobar Islands";
//                                         return (
//                                           <li key={j}>
//                                             <a
//                                               href={isAndaman ? "/tours-packages" : "#"}
//                                               className={`block px-12 py-2 text-sm font-medium ${isAndaman ? "text-cyan-400 font-bold" : "text-gray-300"} hover:text-white`}
//                                             >
//                                               {dest} {isAndaman && "(Featured)"}
//                                             </a>
//                                           </li>
//                                         );
//                                       })}
//                                     </ul>
//                                   )}
//                                 </>
//                               )}
//                             </li>
//                           ))}
//                         </ul>
//                       )}
//                     </>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;





// import {
//   Ship, Compass, Phone, UserCircle, Home as HomeIcon, ChevronDown, Sparkles, Heart,
//   GraduationCap, Car, Bus, Landmark, Umbrella, CalendarDays, Users, Shield, Star,
//   UsersRound, Globe, MapPin, ChevronRight, PlaneTakeoff, UserPlus, Menu as MenuIcon,
//   X as XIcon,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import logo from "../assets/png[3].png";
// import { useState } from "react";

// const indianStates = [
//   "Andaman & Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam",
//   "Bihar", "Chandigarh", "Chhattisgarh", "Dadra & Nagar Haveli", "Daman & Diu",
//   "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir",
//   "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh",
//   "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
//   "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
//   "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
// ].sort();

// const internationalDestinations = [
//   "Africa", "America", "Australia NewZealand", "Bhutan", "Dubai and MiddleEast",
//   "Eurasia", "Europe", "Japan China", "Mauritius", "Nepal", "Seychelles",
//   "South East Asia", "SriLanka Maldives",
// ];

// const Header = () => {
//   const [showIndianIndividualStates, setShowIndianIndividualStates] = useState(false);
//   const [showIndianGroupStates, setShowIndianGroupStates] = useState(false);
//   const [showIntlIndividualStates, setShowIntlIndividualStates] = useState(false);
//   const [showIntlGroupStates, setShowIntlGroupStates] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState({});
//   const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);
//   const toggleMobileSubmenu = (label: string) => {
//     setMobileSubmenuOpen(prev => ({ ...prev, [label]: !prev[label] }));
//   };
//   const navItems = [
//     { icon: HomeIcon, label: "Home", href: "/" },
//     {
//       icon: MapPin, label: "Indian Tours",
//       dropdown: [
//         { label: "Individual Tours", href: "#indian-individual", icon: Users, subDropdown: indianStates },
//         { label: "Group Tours", href: "#indian-group", icon: UsersRound, subDropdown: indianStates },
//         { label: "Ladies Special Tours", href: "#indian-ladies", icon: Sparkles },
//         { label: "Senior Citizen Tours", href: "#indian-senior", icon: Heart },
//         { label: "Students Tours", href: "#indian-students", icon: GraduationCap },
//         { label: "Honeymoon Tours", href: "#indian-honeymoon", icon: Heart },
//       ],
//     },
//     {
//       icon: Globe, label: "International Tours",
//       dropdown: [
//         { label: "Individual Tours", href: "#intl-individual", icon: Users, subDropdown: internationalDestinations },
//         { label: "Group Tours", href: "#intl-group", icon: UsersRound, subDropdown: internationalDestinations },
//         { label: "Ladies Special Tours", href: "#intl-ladies", icon: Sparkles },
//         { label: "Senior Citizen Tours", href: "#intl-senior", icon: Heart },
//         { label: "Students Tours", href: "#intl-students", icon: GraduationCap },
//         { label: "Honeymoon Tours", href: "#intl-honeymoon", icon: Heart },
//       ],
//     },
//     { icon: Ship, label: "Exhibitions", href: "#exhibitions" },
//     { icon: Compass, label: "MICE", href: "#mice" },
//     { icon: PlaneTakeoff, label: "Visa", href: "#visa" },
//     {
//       icon: Star, label: "Others",
//       dropdown: [
//   { label: "Bungalow / Villa", href: "#bungalow-villa", icon: HomeIcon },
//   { label: "Bus", href: "#bus", icon: Bus },
//   { label: "Car", href: "#car", icon: Car },
//   { label: "Cruise", href: "#cruise", icon: Ship },
//   { label: "Festivals", href: "#festivals", icon: Sparkles },
//   { label: "Insurances", href: "#insurances", icon: Umbrella },
//   { label: "Passport", href: "#passport", icon: Landmark },
//   { label: "Sports", href: "#sports", icon: Shield },
//   { label: "Weekend Gateways", href: "#weekend-gateways", icon: CalendarDays },
// ],
//     },
//     { icon: UsersRound, label: "About Us", href: "#about" },
//     { icon: Phone, label: "Contact Us", href: "#contact" },
//   ];
//   return (
//     <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-xl border-b-2 border-blue-400 w-full">
//       <div className="w-full px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between py-3">
//           {/* LOGO */}
//           <div className="flex items-center">
//             <div className="relative group cursor-pointer">
//               <div className="absolute -inset-3 bg-white/10 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               <img
//                 src={logo}
//                 alt="SK Tours Logo"
//                 className="h-12 sm:h-14 w-auto object-contain relative z-10 transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
//               />
//             </div>
//           </div>
//           {/* Mobile Toggle */}
//           <button
//             onClick={toggleMobileMenu}
//             className="lg:hidden text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
//           >
//             {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
//           </button>
//           {/* DESKTOP NAV */}
//           <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
//             {navItems.map((item, index) => (
//               <div key={index} className="relative group">
//                 {!item.dropdown ? (
//                   <a
//                     href={item.href}
//                     className="flex flex-col items-center px-3 sm:px-4 py-3 transition-all duration-300 hover:bg-white/15 rounded-lg min-w-[80px] sm:min-w-[90px]"
//                   >
//                     <item.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
//                     <span className="text-sm font-medium">{item.label}</span>
//                   </a>
//                 ) : (
//                   <div className="relative">
//                     <div className="flex flex-col items-center px-3 sm:px-4 py-3 transition-all duration-300 hover:bg-white/15 rounded-lg min-w-[100px] sm:min-w-[110px] cursor-pointer">
//                       <item.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
//                       <div className="flex items-center gap-1">
//                         <span className="text-sm font-medium">{item.label}</span>
//                         <ChevronDown className="w-3 h-3" />
//                       </div>
//                     </div>
//                     {/* MEGA DROPDOWN */}
//                     <div className="absolute left-1/2 -translate-x-1/2 top-full opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-white text-gray-800 rounded-xl shadow-2xl w-72 sm:w-80 py-4 border border-gray-200 transition-all duration-300 ease-in-out z-50">
//                       {item.dropdown.map((sub, idx) => {
//                         const isIndian = item.label === "Indian Tours";
//                         const isIntl = item.label === "International Tours";
//                         const isIndividual = sub.label === "Individual Tours";
//                         const isGroup = sub.label === "Group Tours";
//                         let showThisStates = false;
//                         let enterHandler = null;
//                         let leaveHandler = null;
//                         let enterStatesHandler = null;
//                         let leaveStatesHandler = null;
//                         if (isIndian && isIndividual) {
//                           showThisStates = showIndianIndividualStates;
//                           enterHandler = () => setShowIndianIndividualStates(true);
//                           leaveHandler = () => setShowIndianIndividualStates(false);
//                           enterStatesHandler = () => setShowIndianIndividualStates(true);
//                           leaveStatesHandler = () => setShowIndianIndividualStates(false);
//                         } else if (isIndian && isGroup) {
//                           showThisStates = showIndianGroupStates;
//                           enterHandler = () => setShowIndianGroupStates(true);
//                           leaveHandler = () => setShowIndianGroupStates(false);
//                           enterStatesHandler = () => setShowIndianGroupStates(true);
//                           leaveStatesHandler = () => setShowIndianGroupStates(false);
//                         } else if (isIntl && isIndividual) {
//                           showThisStates = showIntlIndividualStates;
//                           enterHandler = () => setShowIntlIndividualStates(true);
//                           leaveHandler = () => setShowIntlIndividualStates(false);
//                           enterStatesHandler = () => setShowIntlIndividualStates(true);
//                           leaveStatesHandler = () => setShowIntlIndividualStates(false);
//                         } else if (isIntl && isGroup) {
//                           showThisStates = showIntlGroupStates;
//                           enterHandler = () => setShowIntlGroupStates(true);
//                           leaveHandler = () => setShowIntlGroupStates(false);
//                           enterStatesHandler = () => setShowIntlGroupStates(true);
//                           leaveStatesHandler = () => setShowIntlGroupStates(false);
//                         }
//                         return (
//                           <div key={idx} className="relative">
//                             <div
//                               className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-3.5 text-sm hover:bg-blue-50 border-l-2 border-transparent hover:border-blue-500 mx-2 sm:mx-3 rounded-lg block cursor-pointer transition-colors ${sub.subDropdown ? "pr-2" : ""}`}
//                               onMouseEnter={enterHandler}
//                               onMouseLeave={leaveHandler}
//                             >
//                               <a href={sub.href} className="flex items-center gap-2 sm:gap-3 w-full">
//                                 <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
//                                   <sub.icon className="w-4 h-4 text-blue-600" />
//                                 </div>
//                                 <span className="font-medium flex-grow">{sub.label}</span>
//                                 {sub.subDropdown && <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0" />}
//                               </a>
//                             </div>
//                             {/* STATES LIST - SPECIAL LINK FOR ANDAMAN */}
//                             {sub.subDropdown && showThisStates && (
//                               <div
//                                 className="absolute left-full top-0 -ml-4 bg-white text-gray-800 rounded-xl shadow-2xl w-[500px] sm:w-[600px] py-4 border border-gray-200 opacity-100 visible transition-all duration-300 ease-in-out z-50 max-h-[70vh] overflow-y-auto"
//                                 onMouseEnter={enterStatesHandler}
//                                 onMouseLeave={leaveStatesHandler}
//                               >
//                                 <table className="min-w-full divide-y divide-gray-200">
//                                   <tbody className="bg-white divide-y divide-gray-200">
//                                     {sub.subDropdown.reduce((rows: any[], dest, index) => {
//                                       if (index % 3 === 0) rows.push([]);
//                                       rows[rows.length - 1].push(dest);
//                                       return rows;
//                                     }, []).map((row, rowIndex) => (
//                                       <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-blue-100" : "bg-blue-800 text-white"}>
//                                         {row.map((dest: string, colIndex: number) => {
//                                           const isAndaman = dest === "Andaman & Nicobar Islands";
//                                           const href = isAndaman
//                                             ? "/tours-packages"
//                                             : `#${item.label.toLowerCase().replace(/\s/g, "-")}-state-${dest.toLowerCase().replace(/\s+/g, "-")}`;
//                                           return (
//                                             <td key={colIndex} className={`px-3 py-2.5 whitespace-nowrap border-r ${rowIndex % 2 === 0 ? 'border-gray-400' : 'border-gray-300'}`}>
//                                               <a
//                                                 href={href}
//                                                 className={`block w-full text-sm font-medium text-left transition-colors ${isAndaman
//                                                   ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-lg"
//                                                   : rowIndex % 2 === 0 
//                                                     ? "hover:bg-blue-200 hover:text-blue-800" 
//                                                     : "hover:bg-blue-700 hover:text-white"
//                                                 }`}
//                                                 title={dest}
//                                               >
//                                                 {dest}
//                                                 {isAndaman && <Sparkles className="inline-block w-4 h-4 ml-1 animate-pulse" />}
//                                               </a>
//                                             </td>
//                                           );
//                                         })}
//                                         {row.length < 3 && [...Array(3 - row.length)].map((_, colIndex) => (
//                                           <td key={colIndex} className={`px-3 py-2.5 border-r ${rowIndex % 2 === 0 ? 'border-gray-400' : 'border-gray-300'} ${rowIndex % 2 === 0 ? "bg-blue-100" : "bg-blue-800"}`}></td>
//                                         ))}
//                                       </tr>
//                                     ))}
//                                   </tbody>
//                                 </table>
//                               </div>
//                             )}
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </nav>
//           {/* Desktop Login/Signup */}
//           <div className="hidden lg:flex items-center gap-2 ml-auto">
//             {/* Sign Up */}
//             <div className="relative group">
//               <Button variant="ghost" size="sm" className="bg-green-500 hover:bg-green-600 text-white px-4 sm:px-5 py-2 rounded-lg border border-green-600 flex items-center gap-2">
//                 <UserPlus className="w-4 h-4" />
//                 <span className="font-medium text-sm">Sign Up</span>
//                 <ChevronDown className="w-3 h-3" />
//               </Button>
//               <div className="absolute right-0 top-full mt-2 opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-white text-gray-800 rounded-xl shadow-2xl py-2 border border-gray-200 transition-all duration-300 z-50 min-w-[140px]">
//                 <a href="#new-user" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <UserPlus className="w-4 h-4 text-blue-600" /> New User
//                 </a>
//                 <a href="#new-agent" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <Users className="w-4 h-4 text-blue-600" /> New Agent
//                 </a>
//               </div>
//             </div>
//             {/* Login */}
//             <div className="relative group">
//               <Button variant="ghost" size="sm" className="bg-red-500 hover:bg-red-600 text-white px-4 sm:px-5 py-2 rounded-lg border border-red-600 flex items-center gap-2">
//                 <UserCircle className="w-4 h-4" />
//                 <span className="font-medium text-sm">Login</span>
//                 <ChevronDown className="w-3 h-3" />
//               </Button>
//               <div className="absolute right-0 top-full mt-2 opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-white text-gray-800 rounded-xl shadow-2xl py-2 border border-gray-200 transition-all duration-300 z-50 min-w-[140px]">
//                 <a href="#user-login" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <UserCircle className="w-4 h-4 text-blue-600" /> User Login
//                 </a>
//                 <a href="#agent-login" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <Users className="w-4 h-4 text-blue-600" /> Agent Login
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* MOBILE MENU - Also updated for Andaman */}
//         {mobileMenuOpen && (
//           <nav className="lg:hidden bg-primary text-primary-foreground border-t border-blue-400">
//             <ul className="flex flex-col">
//               {navItems.map((item, index) => (
//                 <li key={index} className="border-b border-blue-500">
//                   {!item.dropdown ? (
//                     <a href={item.href} className="flex gap-2 items-center px-4 py-3 hover:bg-white/10 transition-colors">
//                       <item.icon className="w-5 h-5" />
//                       <span className="font-medium text-sm">{item.label}</span>
//                     </a>
//                   ) : (
//                     <>
//                       <button
//                         onClick={() => toggleMobileSubmenu(item.label)}
//                         className="w-full flex justify-between items-center px-4 py-3 hover:bg-white/10 transition-colors font-medium text-sm"
//                       >
//                         <div className="flex items-center gap-2">
//                           <item.icon className="w-5 h-5" />
//                           <span>{item.label}</span>
//                         </div>
//                         <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileSubmenuOpen[item.label] ? "rotate-180" : ""}`} />
//                       </button>
//                       {mobileSubmenuOpen[item.label] && (
//                         <ul className="bg-primary border-t border-blue-500">
//                           {item.dropdown.map((sub, i) => (
//                             <li key={i} className="border-b border-blue-600">
//                               {!sub.subDropdown ? (
//                                 <a href={sub.href} className="flex items-center gap-2 px-8 py-2 hover:bg-white/10 transition-colors font-normal text-sm">
//                                   <sub.icon className="w-4 h-4" />
//                                   <span>{sub.label}</span>
//                                 </a>
//                               ) : (
//                                 <>
//                                   <button
//                                     onClick={() => toggleMobileSubmenu(sub.label)}
//                                     className="w-full flex justify-between items-center px-8 py-2 hover:bg-white/10 transition-colors font-normal text-sm"
//                                   >
//                                     <div className="flex items-center gap-2">
//                                       <sub.icon className="w-4 h-4" />
//                                       <span>{sub.label}</span>
//                                     </div>
//                                     <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileSubmenuOpen[sub.label] ? "rotate-180" : ""}`} />
//                                   </button>
//                                   {mobileSubmenuOpen[sub.label] && (
//                                     <ul className="bg-primary border-t border-blue-600">
//                                       {sub.subDropdown.map((dest, j) => {
//                                         const isAndaman = dest === "Andaman & Nicobar Islands";
//                                         return (
//                                           <li key={j}>
//                                             <a
//                                               href={isAndaman ? "/tours-packages" : "#"}
//                                               className={`block px-12 py-2 text-sm font-medium ${isAndaman ? "text-cyan-400 font-bold" : "text-gray-300"} hover:text-white`}
//                                             >
//                                               {dest} {isAndaman && "(Featured)"}
//                                             </a>
//                                           </li>
//                                         );
//                                       })}
//                                     </ul>
//                                   )}
//                                 </>
//                               )}
//                             </li>
//                           ))}
//                         </ul>
//                       )}
//                     </>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;




// import {
//   Ship, Compass, Phone, UserCircle, Home as HomeIcon, ChevronDown, Sparkles, Heart,
//   GraduationCap, Car, Bus, Landmark, Umbrella, CalendarDays, Users, Shield, Star,
//   UsersRound, Globe, MapPin, ChevronRight, PlaneTakeoff, UserPlus, Menu as MenuIcon,
//   X as XIcon,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import logo from "../assets/png[3].png";
// import { useState, useRef } from "react";

// const indianStates = [
//   "Andaman & Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam",
//   "Bihar", "Chandigarh", "Chhattisgarh", "Dadra & Nagar Haveli", "Daman & Diu",
//   "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir",
//   "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh",
//   "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
//   "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
//   "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
// ].sort();

// const internationalDestinations = [
//   "Africa", "America", "Australia NewZealand", "Bhutan", "Dubai and MiddleEast",
//   "Eurasia", "Europe", "Japan China", "Mauritius", "Nepal", "Seychelles",
//   "South East Asia", "SriLanka Maldives",
// ];

// const Header = () => {
//   const [showIndianIndividualStates, setShowIndianIndividualStates] = useState(false);
//   const [showIndianGroupStates, setShowIndianGroupStates] = useState(false);
//   const [showIntlIndividualStates, setShowIntlIndividualStates] = useState(false);
//   const [showIntlGroupStates, setShowIntlGroupStates] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState({});
  
//   // Timers for delayed close (prevents flicker when moving between main item and sub-dropdown)
//   const indianIndividualTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const indianGroupTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const intlIndividualTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const intlGroupTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

//   const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);
//   const toggleMobileSubmenu = (label: string) => {
//     setMobileSubmenuOpen(prev => ({ ...prev, [label]: !prev[label] }));
//   };

//   // Helper to create delayed hover handlers
//   const createHoverHandlers = (
//     setter: React.Dispatch<React.SetStateAction<boolean>>,
//     timerRef: React.MutableRefObject<ReturnType<typeof setTimeout> | null>
//   ) => {
//     const enter = () => {
//       if (timerRef.current) {
//         clearTimeout(timerRef.current);
//         timerRef.current = null;
//       }
//       setter(true);
//     };
//     const leave = () => {
//       timerRef.current = setTimeout(() => {
//         setter(false);
//         timerRef.current = null;
//       }, 300); // 300ms delay – enough for normal mouse movement across the gap
//     };
//     return { enter, leave };
//   };

//   const navItems = [
//     { icon: HomeIcon, label: "Home", href: "/" },
//     {
//       icon: MapPin, label: "Indian Tours",
//       dropdown: [
//         { label: "Individual Tours", href: "#indian-individual", icon: Users, subDropdown: indianStates },
//         { label: "Group Tours", href: "#indian-group", icon: UsersRound, subDropdown: indianStates },
//         { label: "Ladies Special Tours", href: "#indian-ladies", icon: Sparkles },
//         { label: "Senior Citizen Tours", href: "#indian-senior", icon: Heart },
//         { label: "Students Tours", href: "#indian-students", icon: GraduationCap },
//         { label: "Honeymoon Tours", href: "#indian-honeymoon", icon: Heart },
//       ],
//     },
//     {
//       icon: Globe, label: "International Tours",
//       dropdown: [
//         { label: "Individual Tours", href: "#intl-individual", icon: Users, subDropdown: internationalDestinations },
//         { label: "Group Tours", href: "#intl-group", icon: UsersRound, subDropdown: internationalDestinations },
//         { label: "Ladies Special Tours", href: "#intl-ladies", icon: Sparkles },
//         { label: "Senior Citizen Tours", href: "#intl-senior", icon: Heart },
//         { label: "Students Tours", href: "#intl-students", icon: GraduationCap },
//         { label: "Honeymoon Tours", href: "#intl-honeymoon", icon: Heart },
//       ],
//     },
//     { icon: Ship, label: "Exhibitions", href: "#exhibitions" },
//     { icon: Compass, label: "MICE", href: "#mice" },
//     { icon: PlaneTakeoff, label: "Visa", href: "#visa" },
//     {
//       icon: Star, label: "Others",
//       dropdown: [
//         { label: "Bungalow / Villa", href: "#bungalow-villa", icon: HomeIcon },
//         { label: "Bus", href: "#bus", icon: Bus },
//         { label: "Car", href: "#car", icon: Car },
//         { label: "Cruise", href: "#cruise", icon: Ship },
//         { label: "Festivals", href: "#festivals", icon: Sparkles },
//         { label: "Insurances", href: "#insurances", icon: Umbrella },
//         { label: "Passport", href: "#passport", icon: Landmark },
//         { label: "Sports", href: "#sports", icon: Shield },
//         { label: "Weekend Gateways", href: "#weekend-gateways", icon: CalendarDays },
//       ],
//     },
//     { icon: UsersRound, label: "About Us", href: "#about" },
//     { icon: Phone, label: "Contact Us", href: "#contact" },
//   ];

//   return (
//     <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-xl border-b-2 border-blue-400 w-full">
//       <div className="w-full px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between py-3">
//           {/* LOGO */}
//           <div className="flex items-center">
//             <div className="relative group cursor-pointer">
//               <div className="absolute -inset-3 bg-white/10 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               <img
//                 src={logo}
//                 alt="SK Tours Logo"
//                 className="h-12 sm:h-14 w-auto object-contain relative z-10 transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
//               />
//             </div>
//           </div>

//           {/* Mobile Toggle */}
//           <button
//             onClick={toggleMobileMenu}
//             className="lg:hidden text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
//           >
//             {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
//           </button>

//           {/* DESKTOP NAV */}
//           <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
//             {navItems.map((item, index) => (
//               <div key={index} className="relative group">
//                 {!item.dropdown ? (
//                   <a
//                     href={item.href}
//                     className="flex flex-col items-center px-3 sm:px-4 py-3 transition-all duration-300 hover:bg-white/15 rounded-lg min-w-[80px] sm:min-w-[90px]"
//                   >
//                     <item.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
//                     <span className="text-sm font-medium">{item.label}</span>
//                   </a>
//                 ) : (
//                   <div className="relative">
//                     <div className="flex flex-col items-center px-3 sm:px-4 py-3 transition-all duration-300 hover:bg-white/15 rounded-lg min-w-[100px] sm:min-w-[110px] cursor-pointer">
//                       <item.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
//                       <div className="flex items-center gap-1">
//                         <span className="text-sm font-medium">{item.label}</span>
//                         <ChevronDown className="w-3 h-3" />
//                       </div>
//                     </div>

//                     {/* MEGA DROPDOWN */}
//                     <div className="absolute left-1/2 -translate-x-1/2 top-full opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-white text-gray-800 rounded-xl shadow-2xl w-72 sm:w-80 py-4 border border-gray-200 transition-all duration-300 ease-in-out z-50">
//                       {item.dropdown.map((sub, idx) => {
//                         const isIndian = item.label === "Indian Tours";
//                         const isIntl = item.label === "International Tours";
//                         const isIndividual = sub.label === "Individual Tours";
//                         const isGroup = sub.label === "Group Tours";

//                         let showThisStates = false;
//                         let enterHandler = null;
//                         let leaveHandler = null;
//                         let enterStatesHandler = null;
//                         let leaveStatesHandler = null;

//                         if (isIndian && isIndividual) {
//                           showThisStates = showIndianIndividualStates;
//                           const h = createHoverHandlers(setShowIndianIndividualStates, indianIndividualTimer);
//                           enterHandler = h.enter;
//                           leaveHandler = h.leave;
//                           enterStatesHandler = h.enter;
//                           leaveStatesHandler = h.leave;
//                         } else if (isIndian && isGroup) {
//                           showThisStates = showIndianGroupStates;
//                           const h = createHoverHandlers(setShowIndianGroupStates, indianGroupTimer);
//                           enterHandler = h.enter;
//                           leaveHandler = h.leave;
//                           enterStatesHandler = h.enter;
//                           leaveStatesHandler = h.leave;
//                         } else if (isIntl && isIndividual) {
//                           showThisStates = showIntlIndividualStates;
//                           const h = createHoverHandlers(setShowIntlIndividualStates, intlIndividualTimer);
//                           enterHandler = h.enter;
//                           leaveHandler = h.leave;
//                           enterStatesHandler = h.enter;
//                           leaveStatesHandler = h.leave;
//                         } else if (isIntl && isGroup) {
//                           showThisStates = showIntlGroupStates;
//                           const h = createHoverHandlers(setShowIntlGroupStates, intlGroupTimer);
//                           enterHandler = h.enter;
//                           leaveHandler = h.leave;
//                           enterStatesHandler = h.enter;
//                           leaveStatesHandler = h.leave;
//                         }

//                         return (
//                           <div key={idx} className="relative">
//                             <div
//                               className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-3.5 text-sm hover:bg-blue-50 border-l-2 border-transparent hover:border-blue-500 mx-2 sm:mx-3 rounded-lg block cursor-pointer transition-colors ${sub.subDropdown ? "pr-2" : ""}`}
//                               onMouseEnter={enterHandler ?? undefined}
//                               onMouseLeave={leaveHandler ?? undefined}
//                             >
//                               <a href={sub.href} className="flex items-center gap-2 sm:gap-3 w-full">
//                                 <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
//                                   <sub.icon className="w-4 h-4 text-blue-600" />
//                                 </div>
//                                 <span className="font-medium flex-grow">{sub.label}</span>
//                                 {sub.subDropdown && <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0" />}
//                               </a>
//                             </div>

//                             {/* STATES / DESTINATIONS SUB-DROPDOWN */}
//                             {sub.subDropdown && showThisStates && (
//                               <div
//                                 className="absolute left-full top-0 ml-3 bg-white text-gray-800 rounded-xl shadow-2xl w-[500px] sm:w-[600px] py-4 border border-gray-200 opacity-100 visible transition-all duration-300 ease-in-out z-[60] max-h-[70vh] overflow-y-auto"
//                                 onMouseEnter={enterStatesHandler ?? undefined}
//                                 onMouseLeave={leaveStatesHandler ?? undefined}
//                               >
//                                 <table className="min-w-full divide-y divide-gray-200">
//                                   <tbody className="bg-white divide-y divide-gray-200">
//                                     {sub.subDropdown.reduce((rows: any[], dest, index) => {
//                                       if (index % 3 === 0) rows.push([]);
//                                       rows[rows.length - 1].push(dest);
//                                       return rows;
//                                     }, []).map((row, rowIndex) => (
//                                       <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-blue-50" : "bg-blue-100"}>
//                                         {row.map((dest: string, colIndex: number) => {
//                                           const isAndaman = dest === "Andaman & Nicobar Islands";
//                                           const href = isAndaman
//                                             ? "/tours-packages"
//                                             : `#${item.label.toLowerCase().replace(/\s/g, "-")}-state-${dest.toLowerCase().replace(/\s+/g, "-")}`;
//                                           return (
//                                             <td key={colIndex} className="px-3 py-2.5 whitespace-nowrap border-r border-gray-400">
//                                               <a
//                                                 href={href}
//                                                 className={`block w-full text-sm font-medium text-gray-700 text-left transition-colors ${isAndaman
//                                                   ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-lg"
//                                                   : `hover:text-blue-600 ${rowIndex % 2 === 0 ? 'hover:bg-blue-100' : 'hover:bg-blue-200'}`
//                                                 }`}
//                                                 title={dest}
//                                               >
//                                                 {dest}
//                                                 {isAndaman && <Sparkles className="inline-block w-4 h-4 ml-1 animate-pulse" />}
//                                               </a>
//                                             </td>
//                                           );
//                                         })}
//                                         {row.length < 3 && [...Array(3 - row.length)].map((_, colIndex) => (
//                                           <td key={colIndex} className={`px-3 py-2.5 border-r border-gray-400 ${rowIndex % 2 === 0 ? "bg-blue-50" : "bg-blue-100"}`}></td>
//                                         ))}
//                                       </tr>
//                                     ))}
//                                   </tbody>
//                                 </table>
//                               </div>
//                             )}
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </nav>

//           {/* Desktop Login/Signup */}
//           <div className="hidden lg:flex items-center gap-2 ml-auto">
//             {/* Sign Up */}
//             <div className="relative group">
//               <Button variant="ghost" size="sm" className="bg-green-500 hover:bg-green-600 text-white P-4 sm:px-5 py-2 rounded-lg border border-green-600 flex items-center gap-2">
//                 <UserPlus className="w-4 h-4" />
//                 <span className="font-medium text-sm">Sign Up</span>
//                 <ChevronDown className="w-3 h-3" />
//               </Button>
//               <div className="absolute right-0 top-full mt-2 opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-white text-gray-800 rounded-xl shadow-2xl py-2 border border-gray-200 transition-all duration-300 z-50 min-w-[140px]">
//                 <a href="#new-user" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <UserPlus className="w-4 h-4 text-blue-600" /> New User
//                 </a>
//                 <a href="#new-agent" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <Users className="w-4 h-4 text-blue-600" /> New Agent
//                 </a>
//               </div>
//             </div>
//             {/* Login */}
//             <div className="relative group">
//               <Button variant="ghost" size="sm" className="bg-red-500 hover:bg-red-600 text-white px-4 sm:px-5 py-2 rounded-lg border border-red-600 flex items-center gap-2">
//                 <UserCircle className="w-4 h-4" />
//                 <span className="font-medium text-sm">Login</span>
//                 <ChevronDown className="w-3 h-3" />
//               </Button>
//               <div className="absolute right-0 top-full mt-2 opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-white text-gray-800 rounded-xl shadow-2xl py-2 border border-gray-200 transition-all duration-300 z-50 min-w-[140px]">
//                 <a href="#user-login" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <UserCircle className="w-4 h-4 text-blue-600" /> User Login
//                 </a>
//                 <a href="#agent-login" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <Users className="w-4 h-4 text-blue-600" /> Agent Login
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* MOBILE MENU */}
//         {mobileMenuOpen && (
//           <nav className="lg:hidden bg-primary text-primary-foreground border-t border-blue-400">
//             <ul className="flex flex-col">
//               {navItems.map((item, index) => (
//                 <li key={index} className="border-b border-blue-500">
//                   {!item.dropdown ? (
//                     <a href={item.href} className="flex gap-2 items-center px-4 py-3 hover:bg-white/10 transition-colors">
//                       <item.icon className="w-5 h-5" />
//                       <span className="font-medium text-sm">{item.label}</span>
//                     </a>
//                   ) : (
//                     <>
//                       <button
//                         onClick={() => toggleMobileSubmenu(item.label)}
//                         className="w-full flex justify-between items-center px-4 py-3 hover:bg-white/10 transition-colors font-medium text-sm"
//                       >
//                         <div className="flex items-center gap-2">
//                           <item.icon className="w-5 h-5" />
//                           <span>{item.label}</span>
//                         </div>
//                         <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileSubmenuOpen[item.label] ? "rotate-180" : ""}`} />
//                       </button>
//                       {mobileSubmenuOpen[item.label] && (
//                         <ul className="bg-primary border-t border-blue-500">
//                           {item.dropdown.map((sub, i) => (
//                             <li key={i} className="border-b border-blue-600">
//                               {!sub.subDropdown ? (
//                                 <a href={sub.href} className="flex items-center gap-2 px-8 py-2 hover:bg-white/10 transition-colors font-normal text-sm">
//                                   <sub.icon className="w-4 h-4" />
//                                   <span>{sub.label}</span>
//                                 </a>
//                               ) : (
//                                 <>
//                                   <button
//                                     onClick={() => toggleMobileSubmenu(sub.label)}
//                                     className="w-full flex justify-between items-center px-8 py-2 hover:bg-white/10 transition-colors font-normal text-sm"
//                                   >
//                                     <div className="flex items-center gap-2">
//                                       <sub.icon className="w-4 h-4" />
//                                       <span>{sub.label}</span>
//                                     </div>
//                                     <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileSubmenuOpen[sub.label] ? "rotate-180" : ""}`} />
//                                   </button>
//                                   {mobileSubmenuOpen[sub.label] && (
//                                     <ul className="bg-primary border-t border-blue-600">
//                                       {sub.subDropdown.map((dest, j) => {
//                                         const isAndaman = dest === "Andaman & Nicobar Islands";
//                                         return (
//                                           <li key={j}>
//                                             <a
//                                               href={isAndaman ? "/tours-packages" : "#"}
//                                               className={`block px-12 py-2 text-sm font-medium ${isAndaman ? "text-cyan-400 font-bold" : "text-gray-300"} hover:text-white`}
//                                             >
//                                               {dest} {isAndaman && "(Featured)"}
//                                             </a>
//                                           </li>
//                                         );
//                                       })}
//                                     </ul>
//                                   )}
//                                 </>
//                               )}
//                             </li>
//                           ))}
//                         </ul>
//                       )}
//                     </>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;




// import {
//   Ship, Compass, Phone, UserCircle, Home as HomeIcon, ChevronDown, Sparkles, Heart,
//   GraduationCap, Car, Bus, Landmark, Umbrella, CalendarDays, Users, Shield, Star,
//   UsersRound, Globe, MapPin, ChevronRight, PlaneTakeoff, UserPlus, Menu as MenuIcon,
//   X as XIcon,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import logo from "../assets/png[3].png";
// import { useState, useRef } from "react";

// const indianStates = [
//   "Andaman", "Andhra Pradesh", "Arunachal Pradesh", "Assam",
//   "Bihar", "Chandigarh", "Chhattisgarh", "Dadra & Nagar Haveli", "Daman & Diu",
//   "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir",
//   "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh",
//   "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
//   "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
//   "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
// ].sort();

// const internationalDestinations = [
//   "Africa", "America", "Australia NewZealand", "Bhutan", "Dubai and MiddleEast",
//   "Eurasia", "Europe", "Japan China", "Mauritius", "Nepal", "Seychelles",
//   "South East Asia", "SriLanka Maldives",
// ];

// const Header = () => {
//   const [showIndianIndividualStates, setShowIndianIndividualStates] = useState(false);
//   const [showIndianGroupStates, setShowIndianGroupStates] = useState(false);
//   const [showIntlIndividualStates, setShowIntlIndividualStates] = useState(false);
//   const [showIntlGroupStates, setShowIntlGroupStates] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState({});
  
//   // Timers for delayed close (prevents flicker when moving between main item and sub-dropdown)
//   const indianIndividualTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const indianGroupTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const intlIndividualTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const intlGroupTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

//   const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);
//   const toggleMobileSubmenu = (label: string) => {
//     setMobileSubmenuOpen(prev => ({ ...prev, [label]: !prev[label] }));
//   };

//   // Helper to create delayed hover handlers
//   const createHoverHandlers = (
//     setter: React.Dispatch<React.SetStateAction<boolean>>,
//     timerRef: React.MutableRefObject<ReturnType<typeof setTimeout> | null>
//   ) => {
//     const enter = () => {
//       if (timerRef.current) {
//         clearTimeout(timerRef.current);
//         timerRef.current = null;
//       }
//       setter(true);
//     };
//     const leave = () => {
//       timerRef.current = setTimeout(() => {
//         setter(false);
//         timerRef.current = null;
//       }, 300); // 300ms delay – enough for normal mouse movement across the gap
//     };
//     return { enter, leave };
//   };

//   const navItems = [
//     { icon: HomeIcon, label: "Home", href: "/" },
//     {
//       icon: MapPin, label: "Indian Tours",
//       dropdown: [
//         { label: "Individual Tours", href: "#indian-individual", icon: Users, subDropdown: indianStates },
//         { label: "Group Tours", href: "#indian-group", icon: UsersRound, subDropdown: indianStates },
//         { label: "Ladies Special Tours", href: "#indian-ladies", icon: Sparkles },
//         { label: "Senior Citizen Tours", href: "#indian-senior", icon: Heart },
//         { label: "Students Tours", href: "#indian-students", icon: GraduationCap },
//         { label: "Honeymoon Tours", href: "#indian-honeymoon", icon: Heart },
//       ],
//     },
//     {
//       icon: Globe, label: "International Tours",
//       dropdown: [
//         { label: "Individual Tours", href: "#intl-individual", icon: Users, subDropdown: internationalDestinations },
//         { label: "Group Tours", href: "#intl-group", icon: UsersRound, subDropdown: internationalDestinations },
//         { label: "Ladies Special Tours", href: "#intl-ladies", icon: Sparkles },
//         { label: "Senior Citizen Tours", href: "#intl-senior", icon: Heart },
//         { label: "Students Tours", href: "#intl-students", icon: GraduationCap },
//         { label: "Honeymoon Tours", href: "#intl-honeymoon", icon: Heart },
//       ],
//     },
//     { icon: Ship, label: "Exhibitions", href: "#exhibitions" },
//     { icon: Compass, label: "MICE", href: "#mice" },
//     { icon: PlaneTakeoff, label: "Visa", href: "#visa" },
//     {
//       icon: Star, label: "Others",
//       dropdown: [
//         { label: "Bungalow / Villa", href: "#bungalow-villa", icon: HomeIcon },
//         { label: "Bus", href: "#bus", icon: Bus },
//         { label: "Car", href: "#car", icon: Car },
//         { label: "Cruise", href: "#cruise", icon: Ship },
//         { label: "Festivals", href: "#festivals", icon: Sparkles },
//         { label: "Insurances", href: "#insurances", icon: Umbrella },
//         { label: "Passport", href: "#passport", icon: Landmark },
//         { label: "Sports", href: "#sports", icon: Shield },
//         { label: "Weekend Gateways", href: "#weekend-gateways", icon: CalendarDays },
//       ],
//     },
//     { icon: UsersRound, label: "About Us", href: "#about" },
//     { icon: Phone, label: "Contact Us", href: "#contact" },
//   ];

//   return (
//     <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-xl border-b-2 border-blue-400 w-full">
//       <div className="w-full px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between py-3">
//           {/* LOGO */}
//           <div className="flex items-center">
//             <div className="relative group cursor-pointer">
//               <div className="absolute -inset-3 bg-white/10 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               <img
//                 src={logo}
//                 alt="SK Tours Logo"
//                 className="h-12 sm:h-14 w-auto object-contain relative z-10 transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
//               />
//             </div>
//           </div>

//           {/* Mobile Toggle */}
//           <button
//             onClick={toggleMobileMenu}
//             className="lg:hidden text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
//           >
//             {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
//           </button>

//           {/* DESKTOP NAV */}
//           <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
//             {navItems.map((item, index) => (
//               <div key={index} className="relative group">
//                 {!item.dropdown ? (
//                   <a
//                     href={item.href}
//                     className="flex flex-col items-center px-3 sm:px-4 py-3 transition-all duration-300 hover:bg-white/15 rounded-lg min-w-[80px] sm:min-w-[90px]"
//                   >
//                     <item.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
//                     <span className="text-sm font-medium">{item.label}</span>
//                   </a>
//                 ) : (
//                   <div className="relative">
//                     <div className="flex flex-col items-center px-3 sm:px-4 py-3 transition-all duration-300 hover:bg-white/15 rounded-lg min-w-[100px] sm:min-w-[110px] cursor-pointer">
//                       <item.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
//                       <div className="flex items-center gap-1">
//                         <span className="text-sm font-medium">{item.label}</span>
//                         <ChevronDown className="w-3 h-3" />
//                       </div>
//                     </div>

//                     {/* MEGA DROPDOWN */}
//                     <div className="absolute left-1/2 -translate-x-1/2 top-full opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-white text-gray-800 rounded-xl shadow-2xl w-72 sm:w-80 py-4 border border-gray-200 transition-all duration-300 ease-in-out z-50">
//                       {item.dropdown.map((sub, idx) => {
//                         const isIndian = item.label === "Indian Tours";
//                         const isIntl = item.label === "International Tours";
//                         const isIndividual = sub.label === "Individual Tours";
//                         const isGroup = sub.label === "Group Tours";

//                         let showThisStates = false;
//                         let enterHandler = null;
//                         let leaveHandler = null;
//                         let enterStatesHandler = null;
//                         let leaveStatesHandler = null;
//                         let topOffset = "top-0";

//                         if (isIndian && isIndividual) {
//                           showThisStates = showIndianIndividualStates;
//                           const h = createHoverHandlers(setShowIndianIndividualStates, indianIndividualTimer);
//                           enterHandler = h.enter;
//                           leaveHandler = h.leave;
//                           enterStatesHandler = h.enter;
//                           leaveStatesHandler = h.leave;
//                           topOffset = "top-[-1rem]";
//                         } else if (isIndian && isGroup) {
//                           showThisStates = showIndianGroupStates;
//                           const h = createHoverHandlers(setShowIndianGroupStates, indianGroupTimer);
//                           enterHandler = h.enter;
//                           leaveHandler = h.leave;
//                           enterStatesHandler = h.enter;
//                           leaveStatesHandler = h.leave;
//                           topOffset = "top-[-4rem]";
//                         } else if (isIntl && isIndividual) {
//                           showThisStates = showIntlIndividualStates;
//                           const h = createHoverHandlers(setShowIntlIndividualStates, intlIndividualTimer);
//                           enterHandler = h.enter;
//                           leaveHandler = h.leave;
//                           enterStatesHandler = h.enter;
//                           leaveStatesHandler = h.leave;
//                           topOffset = "top-[-1rem]";
//                         } else if (isIntl && isGroup) {
//                           showThisStates = showIntlGroupStates;
//                           const h = createHoverHandlers(setShowIntlGroupStates, intlGroupTimer);
//                           enterHandler = h.enter;
//                           leaveHandler = h.leave;
//                           enterStatesHandler = h.enter;
//                           leaveStatesHandler = h.leave;
//                           topOffset = "top-[-4rem]";
//                         }

//                         return (
//                           <div key={idx} className="relative">
//                             <div
//                               className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-3.5 text-sm hover:bg-blue-50 border-l-2 border-transparent hover:border-blue-500 mx-2 sm:mx-3 rounded-lg block cursor-pointer transition-colors ${sub.subDropdown ? "pr-2" : ""}`}
//                               onMouseEnter={enterHandler ?? undefined}
//                               onMouseLeave={leaveHandler ?? undefined}
//                             >
//                               <a href={sub.href} className="flex items-center gap-2 sm:gap-3 w-full">
//                                 <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
//                                   <sub.icon className="w-4 h-4 text-blue-600" />
//                                 </div>
//                                 <span className="font-medium flex-grow">{sub.label}</span>
//                                 {sub.subDropdown && <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0" />}
//                               </a>
//                             </div>

//                             {/* STATES / DESTINATIONS SUB-DROPDOWN */}
//                             {sub.subDropdown && showThisStates && (
//                               <div
//                                 className={`absolute left-full ${topOffset} ml-3 bg-white text-gray-800 rounded-xl shadow-2xl w-[500px] sm:w-[600px] py-4 border border-gray-200 opacity-100 visible transition-all duration-300 ease-in-out z-[60] max-h-[70vh] overflow-y-auto`}
//                                 onMouseEnter={enterStatesHandler ?? undefined}
//                                 onMouseLeave={leaveStatesHandler ?? undefined}
//                               >
//                                 <table className="min-w-full divide-y divide-gray-200">
//                                   <tbody className="bg-white divide-y divide-gray-200">
//                                     {sub.subDropdown.reduce((rows: any[], dest, index) => {
//                                       if (index % 3 === 0) rows.push([]);
//                                       rows[rows.length - 1].push(dest);
//                                       return rows;
//                                     }, []).map((row, rowIndex) => (
//                                       <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-blue-50" : "bg-blue-100"}>
//                                         {row.map((dest: string, colIndex: number) => {
//                                           const isAndaman = dest === "Andaman";
//                                           const href = isAndaman
//                                             ? "/tours-packages"
//                                             : `#${item.label.toLowerCase().replace(/\s/g, "-")}-state-${dest.toLowerCase().replace(/\s+/g, "-")}`;
//                                           return (
//                                             <td key={colIndex} className="px-3 py-2.5 whitespace-nowrap border-r border-gray-400">
//                                               <a
//                                                 href={href}
//                                                 className={`block w-full text-sm font-medium text-left transition-colors ${isAndaman
//                                                   ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-lg"
//                                                   : `hover:text-blue-600 ${rowIndex % 2 === 0 ? 'hover:bg-blue-100' : 'hover:bg-blue-200'}`
//                                                 }`}
//                                                 title={dest}
//                                               >
//                                                 {dest}
//                                                 {isAndaman && <Sparkles className="inline-block w-4 h-4 ml-1 animate-pulse" />}
//                                               </a>
//                                             </td>
//                                           );
//                                         })}
//                                         {row.length < 3 && [...Array(3 - row.length)].map((_, colIndex) => (
//                                           <td key={colIndex} className={`px-3 py-2.5 border-r border-gray-400 ${rowIndex % 2 === 0 ? "bg-blue-50" : "bg-blue-100"}`}></td>
//                                         ))}
//                                       </tr>
//                                     ))}
//                                   </tbody>
//                                 </table>
//                               </div>
//                             )}
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </nav>

//           {/* Desktop Login/Signup */}
//           <div className="hidden lg:flex items-center gap-2 ml-auto">
//             {/* Sign Up */}
//             <div className="relative group">
//               <Button variant="ghost" size="sm" className="bg-green-500 hover:bg-green-600 text-white px-4 sm:px-5 py-2 rounded-lg border border-green-600 flex items-center gap-2">
//                 <UserPlus className="w-4 h-4" />
//                 <span className="font-medium text-sm">Sign Up</span>
//                 <ChevronDown className="w-3 h-3" />
//               </Button>
//               <div className="absolute right-0 top-full mt-2 opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-white text-gray-800 rounded-xl shadow-2xl py-2 border border-gray-200 transition-all duration-300 z-50 min-w-[140px]">
//                 <a href="#new-user" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <UserPlus className="w-4 h-4 text-blue-600" /> New User
//                 </a>
//                 <a href="#new-agent" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <Users className="w-4 h-4 text-blue-600" /> New Agent
//                 </a>
//               </div>
//             </div>
//             {/* Login */}
//             <div className="relative group">
//               <Button variant="ghost" size="sm" className="bg-red-500 hover:bg-red-600 text-white px-4 sm:px-5 py-2 rounded-lg border border-red-600 flex items-center gap-2">
//                 <UserCircle className="w-4 h-4" />
//                 <span className="font-medium text-sm">Login</span>
//                 <ChevronDown className="w-3 h-3" />
//               </Button>
//               <div className="absolute right-0 top-full mt-2 opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-white text-gray-800 rounded-xl shadow-2xl py-2 border border-gray-200 transition-all duration-300 z-50 min-w-[140px]">
//                 <a href="#user-login" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <UserCircle className="w-4 h-4 text-blue-600" /> User Login
//                 </a>
//                 <a href="#agent-login" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <Users className="w-4 h-4 text-blue-600" /> Agent Login
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* MOBILE MENU */}
//         {mobileMenuOpen && (
//           <nav className="lg:hidden bg-primary text-primary-foreground border-t border-blue-400">
//             <ul className="flex flex-col">
//               {navItems.map((item, index) => (
//                 <li key={index} className="border-b border-blue-500">
//                   {!item.dropdown ? (
//                     <a href={item.href} className="flex gap-2 items-center px-4 py-3 hover:bg-white/10 transition-colors">
//                       <item.icon className="w-5 h-5" />
//                       <span className="font-medium text-sm">{item.label}</span>
//                     </a>
//                   ) : (
//                     <>
//                       <button
//                         onClick={() => toggleMobileSubmenu(item.label)}
//                         className="w-full flex justify-between items-center px-4 py-3 hover:bg-white/10 transition-colors font-medium text-sm"
//                       >
//                         <div className="flex items-center gap-2">
//                           <item.icon className="w-5 h-5" />
//                           <span>{item.label}</span>
//                         </div>
//                         <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileSubmenuOpen[item.label] ? "rotate-180" : ""}`} />
//                       </button>
//                       {mobileSubmenuOpen[item.label] && (
//                         <ul className="bg-primary border-t border-blue-500">
//                           {item.dropdown.map((sub, i) => (
//                             <li key={i} className="border-b border-blue-600">
//                               {!sub.subDropdown ? (
//                                 <a href={sub.href} className="flex items-center gap-2 px-8 py-2 hover:bg-white/10 transition-colors font-normal text-sm">
//                                   <sub.icon className="w-4 h-4" />
//                                   <span>{sub.label}</span>
//                                 </a>
//                               ) : (
//                                 <>
//                                   <button
//                                     onClick={() => toggleMobileSubmenu(sub.label)}
//                                     className="w-full flex justify-between items-center px-8 py-2 hover:bg-white/10 transition-colors font-normal text-sm"
//                                   >
//                                     <div className="flex items-center gap-2">
//                                       <sub.icon className="w-4 h-4" />
//                                       <span>{sub.label}</span>
//                                     </div>
//                                     <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileSubmenuOpen[sub.label] ? "rotate-180" : ""}`} />
//                                   </button>
//                                   {mobileSubmenuOpen[sub.label] && (
//                                     <ul className="bg-primary border-t border-blue-600">
//                                       {sub.subDropdown.map((dest, j) => {
//                                         const isAndaman = dest === "Andaman";
//                                         return (
//                                           <li key={j}>
//                                             <a
//                                               href={isAndaman ? "/tours-packages" : "#"}
//                                               className={`block px-12 py-2 text-sm font-medium ${isAndaman ? "text-cyan-400 font-bold" : "text-gray-300"} hover:text-white`}
//                                             >
//                                               {dest} {isAndaman && "(Featured)"}
//                                             </a>
//                                           </li>
//                                         );
//                                       })}
//                                     </ul>
//                                   )}
//                                 </>
//                               )}
//                             </li>
//                           ))}
//                         </ul>
//                       )}
//                     </>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;





// import {
//   Ship, Compass, Phone, UserCircle, Home as HomeIcon, ChevronDown, Sparkles, Heart,
//   GraduationCap, Car, Bus, Landmark, Umbrella, CalendarDays, Users, Shield, Star,
//   UsersRound, Globe, MapPin, ChevronRight, PlaneTakeoff, UserPlus, Menu as MenuIcon,
//   X as XIcon,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import logo from "../assets/png[3].png";
// import { useState, useRef } from "react";

// const indianStates = [
//   "Andaman", "Andhra Pradesh", "Arunachal Pradesh", "Assam",
//   "Bihar", "Chandigarh", "Chhattisgarh", "Dadra & Nagar Haveli", "Daman & Diu",
//   "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir",
//   "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh",
//   "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
//   "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
//   "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
// ].sort();

// const internationalDestinations = [
//   "Africa", "America", "Australia NewZealand", "Bhutan", "Dubai and MiddleEast",
//   "Eurasia", "Europe", "Japan China", "Mauritius", "Nepal", "Seychelles",
//   "South East Asia", "SriLanka Maldives",
// ];

// const Header = () => {
//   const [showIndianIndividualStates, setShowIndianIndividualStates] = useState(false);
//   const [showIndianGroupStates, setShowIndianGroupStates] = useState(false);
//   const [showIntlIndividualStates, setShowIntlIndividualStates] = useState(false);
//   const [showIntlGroupStates, setShowIntlGroupStates] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState({});
  
//   // Timers for delayed close (prevents flicker when moving between main item and sub-dropdown)
//   const indianIndividualTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const indianGroupTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const intlIndividualTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const intlGroupTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

//   const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);
//   const toggleMobileSubmenu = (label: string) => {
//     setMobileSubmenuOpen(prev => ({ ...prev, [label]: !prev[label] }));
//   };

//   // Helper to create delayed hover handlers
//   const createHoverHandlers = (
//     setter: React.Dispatch<React.SetStateAction<boolean>>,
//     timerRef: React.MutableRefObject<ReturnType<typeof setTimeout> | null>
//   ) => {
//     const enter = () => {
//       if (timerRef.current) {
//         clearTimeout(timerRef.current);
//         timerRef.current = null;
//       }
//       setter(true);
//     };
//     const leave = () => {
//       timerRef.current = setTimeout(() => {
//         setter(false);
//         timerRef.current = null;
//       }, 300); // 300ms delay – enough for normal mouse movement across the gap
//     };
//     return { enter, leave };
//   };

//   const navItems = [
//     { icon: HomeIcon, label: "Home", href: "/" },
//     {
//       icon: MapPin, label: "Indian Tours",
//       dropdown: [
//         { label: "Individual Tours", href: "#indian-individual", icon: Users, subDropdown: indianStates },
//         { label: "Group Tours", href: "#indian-group", icon: UsersRound, subDropdown: indianStates },
//         { label: "Ladies Special Tours", href: "#indian-ladies", icon: Sparkles },
//         { label: "Senior Citizen Tours", href: "#indian-senior", icon: Heart },
//         { label: "Students Tours", href: "#indian-students", icon: GraduationCap },
//         { label: "Honeymoon Tours", href: "#indian-honeymoon", icon: Heart },
//       ],
//     },
//     {
//       icon: Globe, label: "International Tours",
//       dropdown: [
//         { label: "Individual Tours", href: "#intl-individual", icon: Users, subDropdown: internationalDestinations },
//         { label: "Group Tours", href: "#intl-group", icon: UsersRound, subDropdown: internationalDestinations },
//         { label: "Ladies Special Tours", href: "#intl-ladies", icon: Sparkles },
//         { label: "Senior Citizen Tours", href: "#intl-senior", icon: Heart },
//         { label: "Students Tours", href: "#intl-students", icon: GraduationCap },
//         { label: "Honeymoon Tours", href: "#intl-honeymoon", icon: Heart },
//       ],
//     },
//     { icon: Ship, label: "Exhibitions", href: "#exhibitions" },
//     { icon: Compass, label: "MICE", href: "#mice" },
//     { icon: PlaneTakeoff, label: "Visa", href: "#visa" },
//     {
//       icon: Star, label: "Others",
//       dropdown: [
//         { label: "Bungalow / Villa", href: "#bungalow-villa", icon: HomeIcon },
//         { label: "Bus", href: "#bus", icon: Bus },
//         { label: "Car", href: "#car", icon: Car },
//         { label: "Cruise", href: "#cruise", icon: Ship },
//         { label: "Festivals", href: "#festivals", icon: Sparkles },
//         { label: "Insurances", href: "#insurances", icon: Umbrella },
//         { label: "Passport", href: "#passport", icon: Landmark },
//         { label: "Sports", href: "#sports", icon: Shield },
//         { label: "Weekend Gateways", href: "#weekend-gateways", icon: CalendarDays },
//       ],
//     },
//     { icon: UsersRound, label: "About Us", href: "#about" },
//     { icon: Phone, label: "Contact Us", href: "#contact" },
//   ];

//   return (
//     <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-xl border-b-2 border-blue-400 w-full">
//       <div className="w-full px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between py-3">
//           {/* LOGO */}
//           <div className="flex items-center">
//             <div className="relative group cursor-pointer">
//               <div className="absolute -inset-3 bg-white/10 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               <img
//                 src={logo}
//                 alt="SK Tours Logo"
//                 className="h-12 sm:h-14 w-auto object-contain relative z-10 transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
//               />
//             </div>
//           </div>

//           {/* Mobile Toggle */}
//           <button
//             onClick={toggleMobileMenu}
//             className="lg:hidden text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
//           >
//             {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
//           </button>

//           {/* DESKTOP NAV */}
//           <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
//             {navItems.map((item, index) => (
//               <div key={index} className="relative group">
//                 {!item.dropdown ? (
//                   <a
//                     href={item.href}
//                     className="flex flex-col items-center px-3 sm:px-4 py-3 transition-all duration-300 hover:bg-white/15 rounded-lg min-w-[80px] sm:min-w-[90px]"
//                   >
//                     <item.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
//                     <span className="text-sm font-medium">{item.label}</span>
//                   </a>
//                 ) : (
//                   <div className="relative">
//                     <div className="flex flex-col items-center px-3 sm:px-4 py-3 transition-all duration-300 hover:bg-white/15 rounded-lg min-w-[100px] sm:min-w-[110px] cursor-pointer">
//                       <item.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
//                       <div className="flex items-center gap-1">
//                         <span className="text-sm font-medium">{item.label}</span>
//                         <ChevronDown className="w-3 h-3" />
//                       </div>
//                     </div>

//                     {/* MEGA DROPDOWN */}
//                     <div className="absolute left-1/2 -translate-x-1/2 top-full opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-red-50 text-gray-800 rounded-xl shadow-2xl w-60 sm:w-68 py-4 border border-gray-200 transition-all duration-300 ease-in-out z-50">
//                       {item.dropdown.map((sub, idx) => {
//                         const isIndian = item.label === "Indian Tours";
//                         const isIntl = item.label === "International Tours";
//                         const isIndividual = sub.label === "Individual Tours";
//                         const isGroup = sub.label === "Group Tours";

//                         let showThisStates = false;
//                         let enterHandler = null;
//                         let leaveHandler = null;
//                         let enterStatesHandler = null;
//                         let leaveStatesHandler = null;
//                         let topOffset = "top-0";

//                         if (isIndian && isIndividual) {
//                           showThisStates = showIndianIndividualStates;
//                           const h = createHoverHandlers(setShowIndianIndividualStates, indianIndividualTimer);
//                           enterHandler = h.enter;
//                           leaveHandler = h.leave;
//                           enterStatesHandler = h.enter;
//                           leaveStatesHandler = h.leave;
//                           topOffset = "top-[-1rem]";
//                         } else if (isIndian && isGroup) {
//                           showThisStates = showIndianGroupStates;
//                           const h = createHoverHandlers(setShowIndianGroupStates, indianGroupTimer);
//                           enterHandler = h.enter;
//                           leaveHandler = h.leave;
//                           enterStatesHandler = h.enter;
//                           leaveStatesHandler = h.leave;
//                           topOffset = "top-[-4rem]";
//                         } else if (isIntl && isIndividual) {
//                           showThisStates = showIntlIndividualStates;
//                           const h = createHoverHandlers(setShowIntlIndividualStates, intlIndividualTimer);
//                           enterHandler = h.enter;
//                           leaveHandler = h.leave;
//                           enterStatesHandler = h.enter;
//                           leaveStatesHandler = h.leave;
//                           topOffset = "top-[-1rem]";
//                         } else if (isIntl && isGroup) {
//                           showThisStates = showIntlGroupStates;
//                           const h = createHoverHandlers(setShowIntlGroupStates, intlGroupTimer);
//                           enterHandler = h.enter;
//                           leaveHandler = h.leave;
//                           enterStatesHandler = h.enter;
//                           leaveStatesHandler = h.leave;
//                           topOffset = "top-[-4rem]";
//                         }

//                         return (
//                           <div key={idx} className="relative">
//                             <div
//                               className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-3.5 text-sm hover:bg-red-100 border-l-2 border-transparent hover:border-red-500 mx-2 sm:mx-3 rounded-lg block cursor-pointer transition-colors ${sub.subDropdown ? "pr-2" : ""}`}
//                               onMouseEnter={enterHandler ?? undefined}
//                               onMouseLeave={leaveHandler ?? undefined}
//                             >
//                               <a href={sub.href} className="flex items-center gap-2 sm:gap-3 w-full">
//                                 <div className="p-2 bg-red-100 rounded-lg flex-shrink-0">
//                                   <sub.icon className="w-4 h-4 text-red-600" />
//                                 </div>
//                                 <span className="font-medium flex-grow">{sub.label}</span>
//                                 {sub.subDropdown && <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0" />}
//                               </a>
//                             </div>

//                             {/* STATES / DESTINATIONS SUB-DROPDOWN */}
//                             {sub.subDropdown && showThisStates && (
//                               <div
//                                 className={`absolute left-full ${topOffset} ml-3 bg-white text-gray-800 rounded-xl shadow-2xl w-[500px] sm:w-[600px] py-4 border border-gray-200 opacity-100 visible transition-all duration-300 ease-in-out z-[60] max-h-[70vh] overflow-y-auto`}
//                                 onMouseEnter={enterStatesHandler ?? undefined}
//                                 onMouseLeave={leaveStatesHandler ?? undefined}
//                               >
//                                 <table className="min-w-full divide-y divide-gray-200">
//                                   <tbody className="bg-white divide-y divide-gray-200">
//                                     {sub.subDropdown.reduce((rows: any[], dest, index) => {
//                                       if (index % 3 === 0) rows.push([]);
//                                       rows[rows.length - 1].push(dest);
//                                       return rows;
//                                     }, []).map((row, rowIndex) => (
//                                       <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-blue-50" : "bg-blue-100"}>
//                                         {row.map((dest: string, colIndex: number) => {
//                                           const isAndaman = dest === "Andaman";
//                                           const href = isAndaman
//                                             ? "/tours-packages"
//                                             : `#${item.label.toLowerCase().replace(/\s/g, "-")}-state-${dest.toLowerCase().replace(/\s+/g, "-")}`;
//                                           return (
//                                             <td key={colIndex} className="w-1/3 px-3 py-2.5 whitespace-nowrap border-r border-gray-400">
//                                               <a
//                                                 href={href}
//                                                 className={`block w-full text-sm font-medium text-left transition-colors ${isAndaman
//                                                   ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-lg"
//                                                   : `hover:text-blue-600 ${rowIndex % 2 === 0 ? 'hover:bg-blue-100' : 'hover:bg-blue-200'}`
//                                                 }`}
//                                                 title={dest}
//                                               >
//                                                 {dest}
//                                                 {isAndaman && <Sparkles className="inline-block w-4 h-4 ml-1 animate-pulse" />}
//                                               </a>
//                                             </td>
//                                           );
//                                         })}
//                                         {row.length < 3 && [...Array(3 - row.length)].map((_, colIndex) => (
//                                           <td key={colIndex} className={`w-1/3 px-3 py-2.5 border-r border-gray-400 ${rowIndex % 2 === 0 ? "bg-blue-50" : "bg-blue-100"}`}></td>
//                                         ))}
//                                       </tr>
//                                     ))}
//                                   </tbody>
//                                 </table>
//                               </div>
//                             )}
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </nav>

//           {/* Desktop Login/Signup */}
//           <div className="hidden lg:flex items-center gap-2 ml-auto">
//             {/* Sign Up */}
//             <div className="relative group">
//               <Button variant="ghost" size="sm" className="bg-green-500 hover:bg-green-600 text-white px-4 sm:px-5 py-2 rounded-lg border border-green-600 flex items-center gap-2">
//                 <UserPlus className="w-4 h-4" />
//                 <span className="font-medium text-sm">Sign Up</span>
//                 <ChevronDown className="w-3 h-3" />
//               </Button>
//               <div className="absolute right-0 top-full mt-2 opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-white text-gray-800 rounded-xl shadow-2xl py-2 border border-gray-200 transition-all duration-300 z-50 min-w-[140px]">
//                 <a href="#new-user" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <UserPlus className="w-4 h-4 text-blue-600" /> New User
//                 </a>
//                 <a href="#new-agent" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <Users className="w-4 h-4 text-blue-600" /> New Agent
//                 </a>
//               </div>
//             </div>
//             {/* Login */}
//             <div className="relative group">
//               <Button variant="ghost" size="sm" className="bg-red-500 hover:bg-red-600 text-white px-4 sm:px-5 py-2 rounded-lg border border-red-600 flex items-center gap-2">
//                 <UserCircle className="w-4 h-4" />
//                 <span className="font-medium text-sm">Login</span>
//                 <ChevronDown className="w-3 h-3" />
//               </Button>
//               <div className="absolute right-0 top-full mt-2 opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-white text-gray-800 rounded-xl shadow-2xl py-2 border border-gray-200 transition-all duration-300 z-50 min-w-[140px]">
//                 <a href="#user-login" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <UserCircle className="w-4 h-4 text-blue-600" /> User Login
//                 </a>
//                 <a href="#agent-login" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <Users className="w-4 h-4 text-blue-600" /> Agent Login
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* MOBILE MENU */}
//         {mobileMenuOpen && (
//           <nav className="lg:hidden bg-primary text-primary-foreground border-t border-blue-400">
//             <ul className="flex flex-col">
//               {navItems.map((item, index) => (
//                 <li key={index} className="border-b border-blue-500">
//                   {!item.dropdown ? (
//                     <a href={item.href} className="flex gap-2 items-center px-4 py-3 hover:bg-white/10 transition-colors">
//                       <item.icon className="w-5 h-5" />
//                       <span className="font-medium text-sm">{item.label}</span>
//                     </a>
//                   ) : (
//                     <>
//                       <button
//                         onClick={() => toggleMobileSubmenu(item.label)}
//                         className="w-full flex justify-between items-center px-4 py-3 hover:bg-white/10 transition-colors font-medium text-sm"
//                       >
//                         <div className="flex items-center gap-2">
//                           <item.icon className="w-5 h-5" />
//                           <span>{item.label}</span>
//                         </div>
//                         <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileSubmenuOpen[item.label] ? "rotate-180" : ""}`} />
//                       </button>
//                       {mobileSubmenuOpen[item.label] && (
//                         <ul className="bg-primary border-t border-blue-500">
//                           {item.dropdown.map((sub, i) => (
//                             <li key={i} className="border-b border-blue-600">
//                               {!sub.subDropdown ? (
//                                 <a href={sub.href} className="flex items-center gap-2 px-8 py-2 hover:bg-white/10 transition-colors font-normal text-sm">
//                                   <sub.icon className="w-4 h-4" />
//                                   <span>{sub.label}</span>
//                                 </a>
//                               ) : (
//                                 <>
//                                   <button
//                                     onClick={() => toggleMobileSubmenu(sub.label)}
//                                     className="w-full flex justify-between items-center px-8 py-2 hover:bg-white/10 transition-colors font-normal text-sm"
//                                   >
//                                     <div className="flex items-center gap-2">
//                                       <sub.icon className="w-4 h-4" />
//                                       <span>{sub.label}</span>
//                                     </div>
//                                     <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileSubmenuOpen[sub.label] ? "rotate-180" : ""}`} />
//                                   </button>
//                                   {mobileSubmenuOpen[sub.label] && (
//                                     <ul className="bg-primary border-t border-blue-600">
//                                       {sub.subDropdown.map((dest, j) => {
//                                         const isAndaman = dest === "Andaman";
//                                         return (
//                                           <li key={j}>
//                                             <a
//                                               href={isAndaman ? "/tours-packages" : "#"}
//                                               className={`block px-12 py-2 text-sm font-medium ${isAndaman ? "text-cyan-400 font-bold" : "text-gray-300"} hover:text-white`}
//                                             >
//                                               {dest} {isAndaman && "(Featured)"}
//                                             </a>
//                                           </li>
//                                         );
//                                       })}
//                                     </ul>
//                                   )}
//                                 </>
//                               )}
//                             </li>
//                           ))}
//                         </ul>
//                       )}
//                     </>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;




// import {
//   Ship, Compass, Phone, UserCircle, Home as HomeIcon, ChevronDown, Sparkles, Heart,
//   GraduationCap, Car, Bus, Landmark, Umbrella, CalendarDays, Users, Shield, Star,
//   UsersRound, Globe, MapPin, ChevronRight, PlaneTakeoff, UserPlus, Menu as MenuIcon,
//   X as XIcon,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import logo from "../assets/png[3].png";
// import { useState, useRef } from "react";

// const indianStates = [
//   "Andaman", "Andhra Pradesh", "Bihar", "Chhattisgarh", "Dadra & Nagar Haveli", "Daman & Diu",
//   "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir",
//   "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Leh Ladakh", "Lakshadweep", "Madhya Pradesh",
//   "Maharashtra", "North East", "Odisha", "Puducherry", "Punjab", "Rajasthan",
//   "Seven Sisters", "Tamil Nadu", "Uttar Pradesh", "Uttarakhand", "West Bengal",
// ].sort();

// const internationalDestinations = [
//   "Africa", "America", "Australia NewZealand", "Bhutan", "Dubai and MiddleEast",
//   "Eurasia", "Europe", "Japan China", "Mauritius", "Nepal", "Seychelles",
//   "South East Asia", "SriLanka Maldives",
// ];

// const Header = () => {
//   const [showIndianIndividualStates, setShowIndianIndividualStates] = useState(false);
//   const [showIndianGroupStates, setShowIndianGroupStates] = useState(false);
//   const [showIntlIndividualStates, setShowIntlIndividualStates] = useState(false);
//   const [showIntlGroupStates, setShowIntlGroupStates] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState({});
  
//   // Timers for delayed close (prevents flicker when moving between main item and sub-dropdown)
//   const indianIndividualTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const indianGroupTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const intlIndividualTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const intlGroupTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

//   const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);
//   const toggleMobileSubmenu = (label: string) => {
//     setMobileSubmenuOpen(prev => ({ ...prev, [label]: !prev[label] }));
//   };

//   // Helper to create delayed hover handlers
//   const createHoverHandlers = (
//     setter: React.Dispatch<React.SetStateAction<boolean>>,
//     timerRef: React.MutableRefObject<ReturnType<typeof setTimeout> | null>
//   ) => {
//     const enter = () => {
//       if (timerRef.current) {
//         clearTimeout(timerRef.current);
//         timerRef.current = null;
//       }
//       setter(true);
//     };
//     const leave = () => {
//       timerRef.current = setTimeout(() => {
//         setter(false);
//         timerRef.current = null;
//       }, 300); // 300ms delay – enough for normal mouse movement across the gap
//     };
//     return { enter, leave };
//   };

//   const navItems = [
//     { icon: HomeIcon, label: "Home", href: "/" },
//     {
//       icon: MapPin, label: "Indian Tours",
//       dropdown: [
//         { label: "Individual Tours", href: "#indian-individual", icon: Users, subDropdown: indianStates },
//         { label: "Group Tours", href: "#indian-group", icon: UsersRound, subDropdown: indianStates },
//         { label: "Ladies Special Tours", href: "#indian-ladies", icon: Sparkles },
//         { label: "Senior Citizen Tours", href: "#indian-senior", icon: Heart },
//         { label: "Students Tours", href: "#indian-students", icon: GraduationCap },
//         { label: "Honeymoon Tours", href: "#indian-honeymoon", icon: Heart },
//       ],
//     },
//     {
//       icon: Globe, label: "International Tours",
//       dropdown: [
//         { label: "Individual Tours", href: "#intl-individual", icon: Users, subDropdown: internationalDestinations },
//         { label: "Group Tours", href: "#intl-group", icon: UsersRound, subDropdown: internationalDestinations },
//         { label: "Ladies Special Tours", href: "#intl-ladies", icon: Sparkles },
//         { label: "Senior Citizen Tours", href: "#intl-senior", icon: Heart },
//         { label: "Students Tours", href: "#intl-students", icon: GraduationCap },
//         { label: "Honeymoon Tours", href: "#intl-honeymoon", icon: Heart },
//       ],
//     },
//     { icon: Ship, label: "Exhibitions", href: "#exhibitions" },
//     { icon: Compass, label: "MICE", href: "#mice" },
//     { icon: PlaneTakeoff, label: "Visa", href: "#visa" },
//     {
//       icon: Star, label: "Others",
//       dropdown: [
//         { label: "Bungalow / Villa", href: "#bungalow-villa", icon: HomeIcon },
//         { label: "Bus", href: "#bus", icon: Bus },
//         { label: "Car", href: "#car", icon: Car },
//         { label: "Cruise", href: "#cruise", icon: Ship },
//         { label: "Festivals", href: "#festivals", icon: Sparkles },
//         { label: "Insurances", href: "#insurances", icon: Umbrella },
//         { label: "Passport", href: "#passport", icon: Landmark },
//         { label: "Sports", href: "#sports", icon: Shield },
//         { label: "Weekend Gateways", href: "#weekend-gateways", icon: CalendarDays },
//       ],
//     },
//     { icon: UsersRound, label: "About Us", href: "#about" },
//     { icon: Phone, label: "Contact Us", href: "#contact" },
//   ];

//   return (
//     <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-xl border-b-2 border-blue-400 w-full">
//       <div className="w-full px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between py-3">
//           {/* LOGO */}
//           <div className="flex items-center">
//             <div className="relative group cursor-pointer">
//               <div className="absolute -inset-3 bg-white/10 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               <img
//                 src={logo}
//                 alt="SK Tours Logo"
//                 className="h-12 sm:h-14 w-auto object-contain relative z-10 transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
//               />
//             </div>
//           </div>

//           {/* Mobile Toggle */}
//           <button
//             onClick={toggleMobileMenu}
//             className="lg:hidden text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
//           >
//             {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
//           </button>

//           {/* DESKTOP NAV */}
//           <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
//             {navItems.map((item, index) => (
//               <div key={index} className="relative group">
//                 {!item.dropdown ? (
//                   <a
//                     href={item.href}
//                     className="flex flex-col items-center px-3 sm:px-4 py-3 transition-all duration-300 hover:bg-white/15 rounded-lg min-w-[80px] sm:min-w-[90px]"
//                   >
//                     <item.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
//                     <span className="text-sm font-medium">{item.label}</span>
//                   </a>
//                 ) : (
//                   <div className="relative">
//                     <div className="flex flex-col items-center px-3 sm:px-4 py-3 transition-all duration-300 hover:bg-white/15 rounded-lg min-w-[100px] sm:min-w-[110px] cursor-pointer">
//                       <item.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
//                       <div className="flex items-center gap-1">
//                         <span className="text-sm font-medium">{item.label}</span>
//                         <ChevronDown className="w-3 h-3" />
//                       </div>
//                     </div>

//                     {/* MEGA DROPDOWN */}
//                     <div className="absolute left-1/2 -translate-x-1/2 top-full opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-red-50 text-gray-800 rounded-xl shadow-2xl w-60 sm:w-68 py-4 border border-gray-200 transition-all duration-300 ease-in-out z-50">
//                       {item.dropdown.map((sub, idx) => {
//                         const isIndian = item.label === "Indian Tours";
//                         const isIntl = item.label === "International Tours";
//                         const isIndividual = sub.label === "Individual Tours";
//                         const isGroup = sub.label === "Group Tours";

//                         let showThisStates = false;
//                         let enterHandler = null;
//                         let leaveHandler = null;
//                         let enterStatesHandler = null;
//                         let leaveStatesHandler = null;
//                         let topOffset = "top-0";

//                         if (isIndian && isIndividual) {
//                           showThisStates = showIndianIndividualStates;
//                           const h = createHoverHandlers(setShowIndianIndividualStates, indianIndividualTimer);
//                           enterHandler = h.enter;
//                           leaveHandler = h.leave;
//                           enterStatesHandler = h.enter;
//                           leaveStatesHandler = h.leave;
//                           topOffset = "top-[-1rem]";
//                         } else if (isIndian && isGroup) {
//                           showThisStates = showIndianGroupStates;
//                           const h = createHoverHandlers(setShowIndianGroupStates, indianGroupTimer);
//                           enterHandler = h.enter;
//                           leaveHandler = h.leave;
//                           enterStatesHandler = h.enter;
//                           leaveStatesHandler = h.leave;
//                           topOffset = "top-[-4rem]";
//                         } else if (isIntl && isIndividual) {
//                           showThisStates = showIntlIndividualStates;
//                           const h = createHoverHandlers(setShowIntlIndividualStates, intlIndividualTimer);
//                           enterHandler = h.enter;
//                           leaveHandler = h.leave;
//                           enterStatesHandler = h.enter;
//                           leaveStatesHandler = h.leave;
//                           topOffset = "top-[-1rem]";
//                         } else if (isIntl && isGroup) {
//                           showThisStates = showIntlGroupStates;
//                           const h = createHoverHandlers(setShowIntlGroupStates, intlGroupTimer);
//                           enterHandler = h.enter;
//                           leaveHandler = h.leave;
//                           enterStatesHandler = h.enter;
//                           leaveStatesHandler = h.leave;
//                           topOffset = "top-[-4rem]";
//                         }

//                         return (
//                           <div key={idx} className="relative">
//                             <div
//                               className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-3.5 text-sm hover:bg-red-100 border-l-2 border-transparent hover:border-red-500 mx-2 sm:mx-3 rounded-lg block cursor-pointer transition-colors ${sub.subDropdown ? "pr-2" : ""}`}
//                               onMouseEnter={enterHandler ?? undefined}
//                               onMouseLeave={leaveHandler ?? undefined}
//                             >
//                               <a href={sub.href} className="flex items-center gap-2 sm:gap-3 w-full">
//                                 <div className="p-2 bg-red-100 rounded-lg flex-shrink-0">
//                                   <sub.icon className="w-4 h-4 text-red-600" />
//                                 </div>
//                                 <span className="font-medium flex-grow">{sub.label}</span>
//                                 {sub.subDropdown && <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0" />}
//                               </a>
//                             </div>

//                             {/* STATES / DESTINATIONS SUB-DROPDOWN */}
//                             {sub.subDropdown && showThisStates && (
//                               <div
//                                 className={`absolute left-full ${topOffset} ml-3 bg-white text-gray-800 rounded-xl shadow-2xl w-[400px] sm:w-[450px] py-4 border border-gray-200 opacity-100 visible transition-all duration-300 ease-in-out z-[60] max-h-[70vh] overflow-y-auto`}
//                                 onMouseEnter={enterStatesHandler ?? undefined}
//                                 onMouseLeave={leaveStatesHandler ?? undefined}
//                               >
//                                 <table className="min-w-full divide-y divide-gray-200">
//                                   <tbody className="bg-white divide-y divide-gray-200">
//                                     {sub.subDropdown.reduce((rows: any[], dest, index) => {
//                                       if (index % 3 === 0) rows.push([]);
//                                       rows[rows.length - 1].push(dest);
//                                       return rows;
//                                     }, []).map((row, rowIndex) => (
//                                       <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-blue-50" : "bg-blue-100"}>
//                                         {row.map((dest: string, colIndex: number) => {
//                                           const isAndaman = dest === "Andaman";
//                                           const href = isAndaman
//                                             ? "/tours-packages"
//                                             : `#${item.label.toLowerCase().replace(/\s/g, "-")}-state-${dest.toLowerCase().replace(/\s+/g, "-")}`;
//                                           return (
//                                             <td key={colIndex} className="w-1/3 px-2 py-2.5 whitespace-nowrap border-r border-gray-400">
//                                               <a
//                                                 href={href}
//                                                 className={`block w-full text-sm font-medium text-left transition-colors ${isAndaman
//                                                   ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-lg"
//                                                   : `hover:text-blue-600 ${rowIndex % 2 === 0 ? 'hover:bg-blue-100' : 'hover:bg-blue-200'}`
//                                                 }`}
//                                                 title={dest}
//                                               >
//                                                 {dest}
//                                                 {isAndaman && <Sparkles className="inline-block w-4 h-4 ml-1 animate-pulse" />}
//                                               </a>
//                                             </td>
//                                           );
//                                         })}
//                                         {row.length < 3 && [...Array(3 - row.length)].map((_, colIndex) => (
//                                           <td key={colIndex} className={`w-1/3 px-2 py-2.5 border-r border-gray-400 ${rowIndex % 2 === 0 ? "bg-blue-50" : "bg-blue-100"}`}></td>
//                                         ))}
//                                       </tr>
//                                     ))}
//                                   </tbody>
//                                 </table>
//                               </div>
//                             )}
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </nav>

//           {/* Desktop Login/Signup */}
//           <div className="hidden lg:flex items-center gap-2 ml-auto">
//             {/* Sign Up */}
//             <div className="relative group">
//               <Button variant="ghost" size="sm" className="bg-green-500 hover:bg-green-600 text-white px-4 sm:px-5 py-2 rounded-lg border border-green-600 flex items-center gap-2">
//                 <UserPlus className="w-4 h-4" />
//                 <span className="font-medium text-sm">Sign Up</span>
//                 <ChevronDown className="w-3 h-3" />
//               </Button>
//               <div className="absolute right-0 top-full mt-2 opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-white text-gray-800 rounded-xl shadow-2xl py-2 border border-gray-200 transition-all duration-300 z-50 min-w-[140px]">
//                 <a href="#new-user" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <UserPlus className="w-4 h-4 text-blue-600" /> New User
//                 </a>
//                 <a href="#new-agent" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <Users className="w-4 h-4 text-blue-600" /> New Agent
//                 </a>
//               </div>
//             </div>
//             {/* Login */}
//             <div className="relative group">
//               <Button variant="ghost" size="sm" className="bg-red-500 hover:bg-red-600 text-white px-4 sm:px-5 py-2 rounded-lg border border-red-600 flex items-center gap-2">
//                 <UserCircle className="w-4 h-4" />
//                 <span className="font-medium text-sm">Login</span>
//                 <ChevronDown className="w-3 h-3" />
//               </Button>
//               <div className="absolute right-0 top-full mt-2 opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-white text-gray-800 rounded-xl shadow-2xl py-2 border border-gray-200 transition-all duration-300 z-50 min-w-[140px]">
//                 <a href="#user-login" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <UserCircle className="w-4 h-4 text-blue-600" /> User Login
//                 </a>
//                 <a href="#agent-login" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <Users className="w-4 h-4 text-blue-600" /> Agent Login
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* MOBILE MENU */}
//         {mobileMenuOpen && (
//           <nav className="lg:hidden bg-primary text-primary-foreground border-t border-blue-400">
//             <ul className="flex flex-col">
//               {navItems.map((item, index) => (
//                 <li key={index} className="border-b border-blue-500">
//                   {!item.dropdown ? (
//                     <a href={item.href} className="flex gap-2 items-center px-4 py-3 hover:bg-white/10 transition-colors">
//                       <item.icon className="w-5 h-5" />
//                       <span className="font-medium text-sm">{item.label}</span>
//                     </a>
//                   ) : (
//                     <>
//                       <button
//                         onClick={() => toggleMobileSubmenu(item.label)}
//                         className="w-full flex justify-between items-center px-4 py-3 hover:bg-white/10 transition-colors font-medium text-sm"
//                       >
//                         <div className="flex items-center gap-2">
//                           <item.icon className="w-5 h-5" />
//                           <span>{item.label}</span>
//                         </div>
//                         <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileSubmenuOpen[item.label] ? "rotate-180" : ""}`} />
//                       </button>
//                       {mobileSubmenuOpen[item.label] && (
//                         <ul className="bg-primary border-t border-blue-500">
//                           {item.dropdown.map((sub, i) => (
//                             <li key={i} className="border-b border-blue-600">
//                               {!sub.subDropdown ? (
//                                 <a href={sub.href} className="flex items-center gap-2 px-8 py-2 hover:bg-white/10 transition-colors font-normal text-sm">
//                                   <sub.icon className="w-4 h-4" />
//                                   <span>{sub.label}</span>
//                                 </a>
//                               ) : (
//                                 <>
//                                   <button
//                                     onClick={() => toggleMobileSubmenu(sub.label)}
//                                     className="w-full flex justify-between items-center px-8 py-2 hover:bg-white/10 transition-colors font-normal text-sm"
//                                   >
//                                     <div className="flex items-center gap-2">
//                                       <sub.icon className="w-4 h-4" />
//                                       <span>{sub.label}</span>
//                                     </div>
//                                     <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileSubmenuOpen[sub.label] ? "rotate-180" : ""}`} />
//                                   </button>
//                                   {mobileSubmenuOpen[sub.label] && (
//                                     <ul className="bg-primary border-t border-blue-600">
//                                       {sub.subDropdown.map((dest, j) => {
//                                         const isAndaman = dest === "Andaman";
//                                         return (
//                                           <li key={j}>
//                                             <a
//                                               href={isAndaman ? "/tours-packages" : "#"}
//                                               className={`block px-12 py-2 text-sm font-medium ${isAndaman ? "text-cyan-400 font-bold" : "text-gray-300"} hover:text-white`}
//                                             >
//                                               {dest} {isAndaman && "(Featured)"}
//                                             </a>
//                                           </li>
//                                         );
//                                       })}
//                                     </ul>
//                                   )}
//                                 </>
//                               )}
//                             </li>
//                           ))}
//                         </ul>
//                       )}
//                     </>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;





// import {
//   Ship, Compass, Phone, UserCircle, Home as HomeIcon, ChevronDown, Sparkles, Heart,
//   GraduationCap, Car, Bus, Landmark, Umbrella, CalendarDays, Users, Shield, Star,
//   UsersRound, Globe, MapPin, ChevronRight, PlaneTakeoff, UserPlus, Menu as MenuIcon,
//   X as XIcon,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import logo from "../assets/png[3].png";
// import { useState, useRef } from "react";

// const indianStates = [
//   "Andaman", "Andhra Pradesh", "Bihar", "Chhattisgarh", "Dadra & Nagar Haveli", "Daman & Diu",
//   "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir",
//   "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Leh Ladakh", "Lakshadweep", "Madhya Pradesh",
//   "Maharashtra", "North East", "Odisha", "Puducherry", "Punjab", "Rajasthan",
//   "Seven Sisters", "Tamil Nadu", "Uttar Pradesh", "Uttarakhand", "West Bengal",
// ].sort();

// const internationalDestinations = [
//   "Africa", "America", "Australia NewZealand", "Bhutan", "Dubai and MiddleEast",
//   "Eurasia", "Europe", "Japan China", "Mauritius", "Nepal", "Seychelles",
//   "South East Asia", "SriLanka Maldives",
// ];

// const Header = () => {
//   const [showIndianIndividualStates, setShowIndianIndividualStates] = useState(false);
//   const [showIndianGroupStates, setShowIndianGroupStates] = useState(false);
//   const [showIntlIndividualStates, setShowIntlIndividualStates] = useState(false);
//   const [showIntlGroupStates, setShowIntlGroupStates] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState({});
  
//   // Timers for delayed close (prevents flicker when moving between main item and sub-dropdown)
//   const indianIndividualTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const indianGroupTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const intlIndividualTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const intlGroupTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

//   const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);
//   const toggleMobileSubmenu = (label: string) => {
//     setMobileSubmenuOpen(prev => ({ ...prev, [label]: !prev[label] }));
//   };

//   // Helper to create delayed hover handlers
//   const createHoverHandlers = (
//     setter: React.Dispatch<React.SetStateAction<boolean>>,
//     timerRef: React.MutableRefObject<ReturnType<typeof setTimeout> | null>
//   ) => {
//     const enter = () => {
//       if (timerRef.current) {
//         clearTimeout(timerRef.current);
//         timerRef.current = null;
//       }
//       setter(true);
//     };
//     const leave = () => {
//       timerRef.current = setTimeout(() => {
//         setter(false);
//         timerRef.current = null;
//       }, 300); // 300ms delay – enough for normal mouse movement across the gap
//     };
//     return { enter, leave };
//   };

//   const navItems = [
//     { icon: HomeIcon, label: "Home", href: "/" },
//     {
//       icon: MapPin, label: "Indian Tours",
//       dropdown: [
//         { label: "Individual Tours", href: "#indian-individual", icon: Users, subDropdown: indianStates },
//         { label: "Group Tours", href: "#indian-group", icon: UsersRound, subDropdown: indianStates },
//         { label: "Ladies Special Tours", href: "#indian-ladies", icon: Sparkles },
//         { label: "Senior Citizen Tours", href: "#indian-senior", icon: Heart },
//         { label: "Students Tours", href: "#indian-students", icon: GraduationCap },
//         { label: "Honeymoon Tours", href: "#indian-honeymoon", icon: Heart },
//       ],
//     },
//     {
//       icon: Globe, label: "International Tours",
//       dropdown: [
//         { label: "Individual Tours", href: "#intl-individual", icon: Users, subDropdown: internationalDestinations },
//         { label: "Group Tours", href: "#intl-group", icon: UsersRound, subDropdown: internationalDestinations },
//         { label: "Ladies Special Tours", href: "#intl-ladies", icon: Sparkles },
//         { label: "Senior Citizen Tours", href: "#intl-senior", icon: Heart },
//         { label: "Students Tours", href: "#intl-students", icon: GraduationCap },
//         { label: "Honeymoon Tours", href: "#intl-honeymoon", icon: Heart },
//       ],
//     },
//     { icon: Ship, label: "Exhibitions", href: "#exhibitions" },
//     { icon: Compass, label: "MICE", href: "#mice" },
//     { icon: PlaneTakeoff, label: "Visa", href: "#visa" },
//     {
//       icon: Star, label: "Others",
//       dropdown: [
//         { label: "Bungalow / Villa", href: "#bungalow-villa", icon: HomeIcon },
//         { label: "Bus", href: "#bus", icon: Bus },
//         { label: "Car", href: "#car", icon: Car },
//         { label: "Cruise", href: "#cruise", icon: Ship },
//         { label: "Festivals", href: "#festivals", icon: Sparkles },
//         { label: "Insurances", href: "#insurances", icon: Umbrella },
//         { label: "Passport", href: "#passport", icon: Landmark },
//         { label: "Sports", href: "#sports", icon: Shield },
//         { label: "Weekend Gateways", href: "#weekend-gateways", icon: CalendarDays },
//       ],
//     },
//     { icon: UsersRound, label: "About Us", href: "#about" },
//     { icon: Phone, label: "Contact Us", href: "#contact" },
//   ];

//   return (
//     <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-xl border-b-2 border-blue-400 w-full">
//       <div className="w-full px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between py-3">
//           {/* LOGO */}
//           <div className="flex items-center">
//             <div className="relative group cursor-pointer">
//               <div className="absolute -inset-3 bg-white/10 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               <img
//                 src={logo}
//                 alt="SK Tours Logo"
//                 className="h-12 sm:h-14 w-auto object-contain relative z-10 transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
//               />
//             </div>
//           </div>

//           {/* Mobile Toggle */}
//           <button
//             onClick={toggleMobileMenu}
//             className="lg:hidden text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
//           >
//             {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
//           </button>

//           {/* DESKTOP NAV */}
//           <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
//             {navItems.map((item, index) => (
//               <div key={index} className="relative group">
//                 {!item.dropdown ? (
//                   <a
//                     href={item.href}
//                     className="flex flex-col items-center px-3 sm:px-4 py-3 transition-all duration-300 hover:bg-white/15 rounded-lg min-w-[80px] sm:min-w-[90px]"
//                   >
//                     <item.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
//                     <span className="text-sm font-medium">{item.label}</span>
//                   </a>
//                 ) : (
//                   <div className="relative">
//                     <div className="flex flex-col items-center px-3 sm:px-4 py-3 transition-all duration-300 hover:bg-white/15 rounded-lg min-w-[100px] sm:min-w-[110px] cursor-pointer">
//                       <item.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
//                       <div className="flex items-center gap-1">
//                         <span className="text-sm font-medium">{item.label}</span>
//                         <ChevronDown className="w-3 h-3" />
//                       </div>
//                     </div>

//                     {/* MEGA DROPDOWN */}
//                     <div className="absolute left-1/2 -translate-x-1/2 top-full opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-red-50 text-gray-800 rounded-xl shadow-2xl w-60 sm:w-68 py-4 border border-gray-200 transition-all duration-300 ease-in-out z-50">
//                       {item.dropdown.map((sub, idx) => {
//                         const isIndian = item.label === "Indian Tours";
//                         const isIntl = item.label === "International Tours";
//                         const isIndividual = sub.label === "Individual Tours";
//                         const isGroup = sub.label === "Group Tours";

//                         let showThisStates = false;
//                         let enterHandler = null;
//                         let leaveHandler = null;
//                         let enterStatesHandler = null;
//                         let leaveStatesHandler = null;
//                         let topOffset = "top-0";

//                         if (isIndian && isIndividual) {
//                           showThisStates = showIndianIndividualStates;
//                           const h = createHoverHandlers(setShowIndianIndividualStates, indianIndividualTimer);
//                           enterHandler = h.enter;
//                           leaveHandler = h.leave;
//                           enterStatesHandler = h.enter;
//                           leaveStatesHandler = h.leave;
//                           topOffset = "top-[-1rem]";
//                         } else if (isIndian && isGroup) {
//                           showThisStates = showIndianGroupStates;
//                           const h = createHoverHandlers(setShowIndianGroupStates, indianGroupTimer);
//                           enterHandler = h.enter;
//                           leaveHandler = h.leave;
//                           enterStatesHandler = h.enter;
//                           leaveStatesHandler = h.leave;
//                           topOffset = "top-[-4rem]";
//                         } else if (isIntl && isIndividual) {
//                           showThisStates = showIntlIndividualStates;
//                           const h = createHoverHandlers(setShowIntlIndividualStates, intlIndividualTimer);
//                           enterHandler = h.enter;
//                           leaveHandler = h.leave;
//                           enterStatesHandler = h.enter;
//                           leaveStatesHandler = h.leave;
//                           topOffset = "top-[-1rem]";
//                         } else if (isIntl && isGroup) {
//                           showThisStates = showIntlGroupStates;
//                           const h = createHoverHandlers(setShowIntlGroupStates, intlGroupTimer);
//                           enterHandler = h.enter;
//                           leaveHandler = h.leave;
//                           enterStatesHandler = h.enter;
//                           leaveStatesHandler = h.leave;
//                           topOffset = "top-[-4rem]";
//                         }

//                         return (
//                           <div key={idx} className="relative">
//                             <div
//                               className={`flex items-center px-2 sm:px-3 py-3.5 text-sm hover:bg-red-100 border-l-2 border-transparent hover:border-red-500 mx-1 sm:mx-2 rounded-lg block cursor-pointer transition-colors ${sub.subDropdown ? "pr-2" : ""}`}
//                               onMouseEnter={enterHandler ?? undefined}
//                               onMouseLeave={leaveHandler ?? undefined}
//                             >
//                               <a href={sub.href} className="flex items-center w-full">
//                                 <span className="font-medium flex-grow">{sub.label}</span>
//                                 {sub.subDropdown && <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0" />}
//                               </a>
//                             </div>

//                             {/* STATES / DESTINATIONS SUB-DROPDOWN */}
//                             {sub.subDropdown && showThisStates && (
//                               <div
//                                 className={`absolute left-full ${topOffset} ml-3 bg-white text-gray-800 rounded-xl shadow-2xl w-[400px] sm:w-[450px] py-4 border border-gray-200 opacity-100 visible transition-all duration-300 ease-in-out z-[60] max-h-[70vh] overflow-y-auto`}
//                                 onMouseEnter={enterStatesHandler ?? undefined}
//                                 onMouseLeave={leaveStatesHandler ?? undefined}
//                               >
//                                 <table className="min-w-full divide-y divide-gray-200">
//                                   <tbody className="bg-white divide-y divide-gray-200">
//                                     {sub.subDropdown.reduce((rows: any[], dest, index) => {
//                                       if (index % 3 === 0) rows.push([]);
//                                       rows[rows.length - 1].push(dest);
//                                       return rows;
//                                     }, []).map((row, rowIndex) => (
//                                       <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-blue-50" : "bg-blue-100"}>
//                                         {row.map((dest: string, colIndex: number) => {
//                                           const isAndaman = dest === "Andaman";
//                                           const href = isAndaman
//                                             ? "/tours-packages"
//                                             : `#${item.label.toLowerCase().replace(/\s/g, "-")}-state-${dest.toLowerCase().replace(/\s+/g, "-")}`;
//                                           return (
//                                             <td key={colIndex} className="w-1/3 px-2 py-2.5 whitespace-nowrap border-r border-gray-400">
//                                               <a
//                                                 href={href}
//                                                 className={`block w-full text-sm font-medium text-left transition-colors ${isAndaman
//                                                   ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-lg"
//                                                   : `hover:text-blue-600 ${rowIndex % 2 === 0 ? 'hover:bg-blue-100' : 'hover:bg-blue-200'}`
//                                                 }`}
//                                                 title={dest}
//                                               >
//                                                 {dest}
//                                                 {isAndaman && <Sparkles className="inline-block w-4 h-4 ml-1 animate-pulse" />}
//                                               </a>
//                                             </td>
//                                           );
//                                         })}
//                                         {row.length < 3 && [...Array(3 - row.length)].map((_, colIndex) => (
//                                           <td key={colIndex} className={`w-1/3 px-2 py-2.5 border-r border-gray-400 ${rowIndex % 2 === 0 ? "bg-blue-50" : "bg-blue-100"}`}></td>
//                                         ))}
//                                       </tr>
//                                     ))}
//                                   </tbody>
//                                 </table>
//                               </div>
//                             )}
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </nav>

//           {/* Desktop Login/Signup */}
//           <div className="hidden lg:flex items-center gap-2 ml-auto">
//             {/* Sign Up */}
//             <div className="relative group">
//               <Button variant="ghost" size="sm" className="bg-green-500 hover:bg-green-600 text-white px-4 sm:px-5 py-2 rounded-lg border border-green-600 flex items-center gap-2">
//                 <UserPlus className="w-4 h-4" />
//                 <span className="font-medium text-sm">Sign Up</span>
//                 <ChevronDown className="w-3 h-3" />
//               </Button>
//               <div className="absolute right-0 top-full mt-2 opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-white text-gray-800 rounded-xl shadow-2xl py-2 border border-gray-200 transition-all duration-300 z-50 min-w-[140px]">
//                 <a href="#new-user" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <UserPlus className="w-4 h-4 text-blue-600" /> New User
//                 </a>
//                 <a href="#new-agent" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <Users className="w-4 h-4 text-blue-600" /> New Agent
//                 </a>
//               </div>
//             </div>
//             {/* Login */}
//             <div className="relative group">
//               <Button variant="ghost" size="sm" className="bg-red-500 hover:bg-red-600 text-white px-4 sm:px-5 py-2 rounded-lg border border-red-600 flex items-center gap-2">
//                 <UserCircle className="w-4 h-4" />
//                 <span className="font-medium text-sm">Login</span>
//                 <ChevronDown className="w-3 h-3" />
//               </Button>
//               <div className="absolute right-0 top-full mt-2 opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-white text-gray-800 rounded-xl shadow-2xl py-2 border border-gray-200 transition-all duration-300 z-50 min-w-[140px]">
//                 <a href="#user-login" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <UserCircle className="w-4 h-4 text-blue-600" /> User Login
//                 </a>
//                 <a href="#agent-login" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <Users className="w-4 h-4 text-blue-600" /> Agent Login
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* MOBILE MENU */}
//         {mobileMenuOpen && (
//           <nav className="lg:hidden bg-primary text-primary-foreground border-t border-blue-400">
//             <ul className="flex flex-col">
//               {navItems.map((item, index) => (
//                 <li key={index} className="border-b border-blue-500">
//                   {!item.dropdown ? (
//                     <a href={item.href} className="flex gap-2 items-center px-4 py-3 hover:bg-white/10 transition-colors">
//                       <item.icon className="w-5 h-5" />
//                       <span className="font-medium text-sm">{item.label}</span>
//                     </a>
//                   ) : (
//                     <>
//                       <button
//                         onClick={() => toggleMobileSubmenu(item.label)}
//                         className="w-full flex justify-between items-center px-4 py-3 hover:bg-white/10 transition-colors font-medium text-sm"
//                       >
//                         <div className="flex items-center gap-2">
//                           <item.icon className="w-5 h-5" />
//                           <span>{item.label}</span>
//                         </div>
//                         <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileSubmenuOpen[item.label] ? "rotate-180" : ""}`} />
//                       </button>
//                       {mobileSubmenuOpen[item.label] && (
//                         <ul className="bg-primary border-t border-blue-500">
//                           {item.dropdown.map((sub, i) => (
//                             <li key={i} className="border-b border-blue-600">
//                               {!sub.subDropdown ? (
//                                 <a href={sub.href} className="flex items-center gap-2 px-8 py-2 hover:bg-white/10 transition-colors font-normal text-sm">
//                                   <sub.icon className="w-4 h-4" />
//                                   <span>{sub.label}</span>
//                                 </a>
//                               ) : (
//                                 <>
//                                   <button
//                                     onClick={() => toggleMobileSubmenu(sub.label)}
//                                     className="w-full flex justify-between items-center px-8 py-2 hover:bg-white/10 transition-colors font-normal text-sm"
//                                   >
//                                     <div className="flex items-center gap-2">
//                                       <sub.icon className="w-4 h-4" />
//                                       <span>{sub.label}</span>
//                                     </div>
//                                     <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileSubmenuOpen[sub.label] ? "rotate-180" : ""}`} />
//                                   </button>
//                                   {mobileSubmenuOpen[sub.label] && (
//                                     <ul className="bg-primary border-t border-blue-600">
//                                       {sub.subDropdown.map((dest, j) => {
//                                         const isAndaman = dest === "Andaman";
//                                         return (
//                                           <li key={j}>
//                                             <a
//                                               href={isAndaman ? "/tours-packages" : "#"}
//                                               className={`block px-12 py-2 text-sm font-medium ${isAndaman ? "text-cyan-400 font-bold" : "text-gray-300"} hover:text-white`}
//                                             >
//                                               {dest} {isAndaman && "(Featured)"}
//                                             </a>
//                                           </li>
//                                         );
//                                       })}
//                                     </ul>
//                                   )}
//                                 </>
//                               )}
//                             </li>
//                           ))}
//                         </ul>
//                       )}
//                     </>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;



// import {
//   Ship, Compass, Phone, UserCircle, Home as HomeIcon, ChevronDown, Sparkles, Heart,
//   GraduationCap, Car, Bus, Landmark, Umbrella, CalendarDays, Users, Shield, Star,
//   UsersRound, Globe, MapPin, ChevronRight, PlaneTakeoff, UserPlus, Menu as MenuIcon,
//   X as XIcon,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import logo from "../assets/png[3].png";
// import { useState, useRef } from "react";

// const indianStates = [
//   "Andaman", "Andhra Pradesh", "Bihar", "Chhattisgarh", "Dadra & Nagar Haveli", "Daman & Diu",
//   "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir",
//   "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Leh Ladakh", "Lakshadweep", "Madhya Pradesh",
//   "Maharashtra", "North East", "Odisha", "Puducherry", "Punjab", "Rajasthan",
//   "Seven Sisters", "Tamil Nadu", "Uttar Pradesh", "Uttarakhand", "West Bengal",
// ].sort();

// const internationalDestinations = [
//   "Africa", "America", "Australia NewZealand", "Bhutan", "Dubai and MiddleEast",
//   "Eurasia", "Europe", "Japan China", "Mauritius", "Nepal", "Seychelles",
//   "South East Asia", "SriLanka Maldives",
// ];

// const Header = () => {
//   const [showIndianIndividualStates, setShowIndianIndividualStates] = useState(false);
//   const [showIndianGroupStates, setShowIndianGroupStates] = useState(false);
//   const [showIntlIndividualStates, setShowIntlIndividualStates] = useState(false);
//   const [showIntlGroupStates, setShowIntlGroupStates] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState({});
  
//   // Timers for delayed close (prevents flicker when moving between main item and sub-dropdown)
//   const indianIndividualTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const indianGroupTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const intlIndividualTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const intlGroupTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

//   const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);
//   const toggleMobileSubmenu = (label: string) => {
//     setMobileSubmenuOpen(prev => ({ ...prev, [label]: !prev[label] }));
//   };

//   // Helper to create delayed hover handlers
//   const createHoverHandlers = (
//     setter: React.Dispatch<React.SetStateAction<boolean>>,
//     timerRef: React.MutableRefObject<ReturnType<typeof setTimeout> | null>
//   ) => {
//     const enter = () => {
//       if (timerRef.current) {
//         clearTimeout(timerRef.current);
//         timerRef.current = null;
//       }
//       setter(true);
//     };
//     const leave = () => {
//       timerRef.current = setTimeout(() => {
//         setter(false);
//         timerRef.current = null;
//       }, 300); // 300ms delay – enough for normal mouse movement across the gap
//     };
//     return { enter, leave };
//   };

//   const navItems = [
//     { icon: HomeIcon, label: "Home", href: "/" },
//     {
//       icon: MapPin, label: "Indian Tours",
//       dropdown: [
//         { label: "Individual Tours", href: "#indian-individual", icon: Users, subDropdown: indianStates },
//         { label: "Group Tours", href: "#indian-group", icon: UsersRound, subDropdown: indianStates },
//         { label: "Ladies Special Tours", href: "#indian-ladies", icon: Sparkles },
//         { label: "Senior Citizen Tours", href: "#indian-senior", icon: Heart },
//         { label: "Students Tours", href: "#indian-students", icon: GraduationCap },
//         { label: "Honeymoon Tours", href: "#indian-honeymoon", icon: Heart },
//       ],
//     },
//     {
//       icon: Globe, label: "International Tours",
//       dropdown: [
//         { label: "Individual Tours", href: "#intl-individual", icon: Users, subDropdown: internationalDestinations },
//         { label: "Group Tours", href: "#intl-group", icon: UsersRound, subDropdown: internationalDestinations },
//         { label: "Ladies Special Tours", href: "#intl-ladies", icon: Sparkles },
//         { label: "Senior Citizen Tours", href: "#intl-senior", icon: Heart },
//         { label: "Students Tours", href: "#intl-students", icon: GraduationCap },
//         { label: "Honeymoon Tours", href: "#intl-honeymoon", icon: Heart },
//       ],
//     },
//     { icon: Ship, label: "Exhibitions", href: "#exhibitions" },
//     { icon: Compass, label: "MICE", href: "#mice" },
//     { icon: PlaneTakeoff, label: "Visa", href: "#visa" },
//     {
//       icon: Star, label: "Others",
//       dropdown: [
//         { label: "Bungalow / Villa", href: "#bungalow-villa", icon: HomeIcon },
//         { label: "Bus", href: "#bus", icon: Bus },
//         { label: "Car", href: "#car", icon: Car },
//         { label: "Cruise", href: "#cruise", icon: Ship },
//         { label: "Festivals", href: "#festivals", icon: Sparkles },
//         { label: "Insurances", href: "#insurances", icon: Umbrella },
//         { label: "Passport", href: "#passport", icon: Landmark },
//         { label: "Sports", href: "#sports", icon: Shield },
//         { label: "Weekend Gateways", href: "#weekend-gateways", icon: CalendarDays },
//       ],
//     },
//     { icon: UsersRound, label: "About Us", href: "#about" },
//     { icon: Phone, label: "Contact Us", href: "#contact" },
//   ];

//   return (
//     <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-xl border-b-2 border-blue-400 w-full">
//       <div className="w-full px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between py-3">
//           {/* LOGO */}
//           <div className="flex items-center">
//             <div className="relative group cursor-pointer">
//               <div className="absolute -inset-3 bg-white/10 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               <img
//                 src={logo}
//                 alt="SK Tours Logo"
//                 className="h-12 sm:h-14 w-auto object-contain relative z-10 transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
//               />
//             </div>
//           </div>

//           {/* Mobile Toggle */}
//           <button
//             onClick={toggleMobileMenu}
//             className="lg:hidden text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
//           >
//             {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
//           </button>

//           {/* DESKTOP NAV */}
//           <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
//             {navItems.map((item, index) => (
//               <div key={index} className="relative group">
//                 {!item.dropdown ? (
//                   <a
//                     href={item.href}
//                     className="flex flex-col items-center px-3 sm:px-4 py-3 transition-all duration-300 hover:bg-white/15 rounded-lg min-w-[80px] sm:min-w-[90px]"
//                   >
//                     <item.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
//                     <span className="text-sm font-medium">{item.label}</span>
//                   </a>
//                 ) : (
//                   <div className="relative">
//                     <div className="flex flex-col items-center px-3 sm:px-4 py-3 transition-all duration-300 hover:bg-white/15 rounded-lg min-w-[100px] sm:min-w-[110px] cursor-pointer">
//                       <item.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
//                       <div className="flex items-center gap-1">
//                         <span className="text-sm font-medium">{item.label}</span>
//                         <ChevronDown className="w-3 h-3" />
//                       </div>
//                     </div>

//                     {/* MEGA DROPDOWN */}
//                     <div className="absolute left-1/2 -translate-x-1/2 top-full opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-red-50 text-gray-800 rounded-xl shadow-2xl w-44 sm:w-52 py-4 border border-gray-200 transition-all duration-300 ease-in-out z-50">
//                       {item.dropdown.map((sub, idx) => {
//                         const isIndian = item.label === "Indian Tours";
//                         const isIntl = item.label === "International Tours";
//                         const isIndividual = sub.label === "Individual Tours";
//                         const isGroup = sub.label === "Group Tours";

//                         let showThisStates = false;
//                         let enterHandler = null;
//                         let leaveHandler = null;
//                         let enterStatesHandler = null;
//                         let leaveStatesHandler = null;
//                         let topOffset = "top-0";

//                         if (isIndian && isIndividual) {
//                           showThisStates = showIndianIndividualStates;
//                           const h = createHoverHandlers(setShowIndianIndividualStates, indianIndividualTimer);
//                           enterHandler = h.enter;
//                           leaveHandler = h.leave;
//                           enterStatesHandler = h.enter;
//                           leaveStatesHandler = h.leave;
//                           topOffset = "top-[-1rem]";
//                         } else if (isIndian && isGroup) {
//                           showThisStates = showIndianGroupStates;
//                           const h = createHoverHandlers(setShowIndianGroupStates, indianGroupTimer);
//                           enterHandler = h.enter;
//                           leaveHandler = h.leave;
//                           enterStatesHandler = h.enter;
//                           leaveStatesHandler = h.leave;
//                           topOffset = "top-[-4rem]";
//                         } else if (isIntl && isIndividual) {
//                           showThisStates = showIntlIndividualStates;
//                           const h = createHoverHandlers(setShowIntlIndividualStates, intlIndividualTimer);
//                           enterHandler = h.enter;
//                           leaveHandler = h.leave;
//                           enterStatesHandler = h.enter;
//                           leaveStatesHandler = h.leave;
//                           topOffset = "top-[-1rem]";
//                         } else if (isIntl && isGroup) {
//                           showThisStates = showIntlGroupStates;
//                           const h = createHoverHandlers(setShowIntlGroupStates, intlGroupTimer);
//                           enterHandler = h.enter;
//                           leaveHandler = h.leave;
//                           enterStatesHandler = h.enter;
//                           leaveStatesHandler = h.leave;
//                           topOffset = "top-[-4rem]";
//                         }

//                         return (
//                           <div key={idx} className="relative">
//                             <div
//                               className={`flex items-center px-2 sm:px-3 py-3.5 text-sm hover:bg-red-100 border-l-2 border-transparent hover:border-red-500 mx-1 sm:mx-2 rounded-lg block cursor-pointer transition-colors ${sub.subDropdown ? "pr-2" : ""}`}
//                               onMouseEnter={enterHandler ?? undefined}
//                               onMouseLeave={leaveHandler ?? undefined}
//                             >
//                               <a href={sub.href} className="flex items-center w-full">
//                                 <span className="font-medium flex-grow">{sub.label}</span>
//                                 {sub.subDropdown && <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0" />}
//                               </a>
//                             </div>

//                             {/* STATES / DESTINATIONS SUB-DROPDOWN */}
//                             {sub.subDropdown && showThisStates && (
//                               <div
//                                 className={`absolute left-full ${topOffset} ml-3 bg-white text-gray-800 rounded-xl shadow-2xl w-[400px] sm:w-[450px] py-4 border border-gray-200 opacity-100 visible transition-all duration-300 ease-in-out z-[60] max-h-[70vh] overflow-y-auto`}
//                                 onMouseEnter={enterStatesHandler ?? undefined}
//                                 onMouseLeave={leaveStatesHandler ?? undefined}
//                               >
//                                 <table className="min-w-full divide-y divide-gray-200">
//                                   <tbody className="bg-white divide-y divide-gray-200">
//                                     {sub.subDropdown.reduce((rows: any[], dest, index) => {
//                                       if (index % 3 === 0) rows.push([]);
//                                       rows[rows.length - 1].push(dest);
//                                       return rows;
//                                     }, []).map((row, rowIndex) => (
//                                       <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-blue-50" : "bg-blue-100"}>
//                                         {row.map((dest: string, colIndex: number) => {
//                                           const isAndaman = dest === "Andaman";
//                                           const href = isAndaman
//                                             ? "/tours-packages"
//                                             : `#${item.label.toLowerCase().replace(/\s/g, "-")}-state-${dest.toLowerCase().replace(/\s+/g, "-")}`;
//                                           return (
//                                             <td key={colIndex} className="w-1/3 px-2 py-2.5 whitespace-nowrap border-r border-gray-400">
//                                               <a
//                                                 href={href}
//                                                 className={`block w-full text-sm font-medium text-left transition-colors ${isAndaman
//                                                   ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-lg"
//                                                   : `hover:text-blue-600 ${rowIndex % 2 === 0 ? 'hover:bg-blue-100' : 'hover:bg-blue-200'}`
//                                                 }`}
//                                                 title={dest}
//                                               >
//                                                 {dest}
//                                                 {isAndaman && <Sparkles className="inline-block w-4 h-4 ml-1 animate-pulse" />}
//                                               </a>
//                                             </td>
//                                           );
//                                         })}
//                                         {row.length < 3 && [...Array(3 - row.length)].map((_, colIndex) => (
//                                           <td key={colIndex} className={`w-1/3 px-2 py-2.5 border-r border-gray-400 ${rowIndex % 2 === 0 ? "bg-blue-50" : "bg-blue-100"}`}></td>
//                                         ))}
//                                       </tr>
//                                     ))}
//                                   </tbody>
//                                 </table>
//                               </div>
//                             )}
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </nav>

//           {/* Desktop Login/Signup */}
//           <div className="hidden lg:flex items-center gap-2 ml-auto">
//             {/* Sign Up */}
//             <div className="relative group">
//               <Button variant="ghost" size="sm" className="bg-green-500 hover:bg-green-600 text-white px-4 sm:px-5 py-2 rounded-lg border border-green-600 flex items-center gap-2">
//                 <UserPlus className="w-4 h-4" />
//                 <span className="font-medium text-sm">Sign Up</span>
//                 <ChevronDown className="w-3 h-3" />
//               </Button>
//               <div className="absolute right-0 top-full mt-2 opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-white text-gray-800 rounded-xl shadow-2xl py-2 border border-gray-200 transition-all duration-300 z-50 min-w-[140px]">
//                 <a href="#new-user" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <UserPlus className="w-4 h-4 text-blue-600" /> New User
//                 </a>
//                 <a href="#new-agent" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <Users className="w-4 h-4 text-blue-600" /> New Agent
//                 </a>
//               </div>
//             </div>
//             {/* Login */}
//             <div className="relative group">
//               <Button variant="ghost" size="sm" className="bg-red-500 hover:bg-red-600 text-white px-4 sm:px-5 py-2 rounded-lg border border-red-600 flex items-center gap-2">
//                 <UserCircle className="w-4 h-4" />
//                 <span className="font-medium text-sm">Login</span>
//                 <ChevronDown className="w-3 h-3" />
//               </Button>
//               <div className="absolute right-0 top-full mt-2 opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-white text-gray-800 rounded-xl shadow-2xl py-2 border border-gray-200 transition-all duration-300 z-50 min-w-[140px]">
//                 <a href="#user-login" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <UserCircle className="w-4 h-4 text-blue-600" /> User Login
//                 </a>
//                 <a href="#agent-login" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <Users className="w-4 h-4 text-blue-600" /> Agent Login
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* MOBILE MENU */}
//         {mobileMenuOpen && (
//           <nav className="lg:hidden bg-primary text-primary-foreground border-t border-blue-400">
//             <ul className="flex flex-col">
//               {navItems.map((item, index) => (
//                 <li key={index} className="border-b border-blue-500">
//                   {!item.dropdown ? (
//                     <a href={item.href} className="flex gap-2 items-center px-4 py-3 hover:bg-white/10 transition-colors">
//                       <item.icon className="w-5 h-5" />
//                       <span className="font-medium text-sm">{item.label}</span>
//                     </a>
//                   ) : (
//                     <>
//                       <button
//                         onClick={() => toggleMobileSubmenu(item.label)}
//                         className="w-full flex justify-between items-center px-4 py-3 hover:bg-white/10 transition-colors font-medium text-sm"
//                       >
//                         <div className="flex items-center gap-2">
//                           <item.icon className="w-5 h-5" />
//                           <span>{item.label}</span>
//                         </div>
//                         <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileSubmenuOpen[item.label] ? "rotate-180" : ""}`} />
//                       </button>
//                       {mobileSubmenuOpen[item.label] && (
//                         <ul className="bg-primary border-t border-blue-500">
//                           {item.dropdown.map((sub, i) => (
//                             <li key={i} className="border-b border-blue-600">
//                               {!sub.subDropdown ? (
//                                 <a href={sub.href} className="flex items-center gap-2 px-8 py-2 hover:bg-white/10 transition-colors font-normal text-sm">
//                                   <sub.icon className="w-4 h-4" />
//                                   <span>{sub.label}</span>
//                                 </a>
//                               ) : (
//                                 <>
//                                   <button
//                                     onClick={() => toggleMobileSubmenu(sub.label)}
//                                     className="w-full flex justify-between items-center px-8 py-2 hover:bg-white/10 transition-colors font-normal text-sm"
//                                   >
//                                     <div className="flex items-center gap-2">
//                                       <sub.icon className="w-4 h-4" />
//                                       <span>{sub.label}</span>
//                                     </div>
//                                     <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileSubmenuOpen[sub.label] ? "rotate-180" : ""}`} />
//                                   </button>
//                                   {mobileSubmenuOpen[sub.label] && (
//                                     <ul className="bg-primary border-t border-blue-600">
//                                       {sub.subDropdown.map((dest, j) => {
//                                         const isAndaman = dest === "Andaman";
//                                         return (
//                                           <li key={j}>
//                                             <a
//                                               href={isAndaman ? "/tours-packages" : "#"}
//                                               className={`block px-12 py-2 text-sm font-medium ${isAndaman ? "text-cyan-400 font-bold" : "text-gray-300"} hover:text-white`}
//                                             >
//                                               {dest} {isAndaman && "(Featured)"}
//                                             </a>
//                                           </li>
//                                         );
//                                       })}
//                                     </ul>
//                                   )}
//                                 </>
//                               )}
//                             </li>
//                           ))}
//                         </ul>
//                       )}
//                     </>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;






// import {
//   Ship, Compass, Phone, UserCircle, Home as HomeIcon, ChevronDown, Sparkles, Heart,
//   GraduationCap, Car, Bus, Landmark, Umbrella, CalendarDays, Users, Shield, Star,
//   UsersRound, Globe, MapPin, ChevronRight, PlaneTakeoff, UserPlus, Menu as MenuIcon,
//   X as XIcon,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import logo from "../assets/png[3].png";
// import { useState, useRef } from "react";

// const indianStates = [
//   "Andaman", "Andhra Pradesh", "Bihar", "Chhattisgarh", "Dadra & Nagar Haveli", "Daman & Diu",
//   "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir",
//   "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Leh Ladakh", "Lakshadweep", "Madhya Pradesh",
//   "Maharashtra", "North East", "Odisha", "Puducherry", "Punjab", "Rajasthan",
//   "Seven Sisters", "Tamil Nadu", "Uttar Pradesh", "Uttarakhand", "West Bengal",
// ].sort();

// const internationalDestinations = [
//   "Africa", "America", "Australia NewZealand", "Bhutan", "Dubai and MiddleEast",
//   "Eurasia", "Europe", "Japan China", "Mauritius", "Nepal", "Seychelles",
//   "South East Asia", "SriLanka Maldives",
// ];

// const Header = () => {
//   const [showIndianIndividualStates, setShowIndianIndividualStates] = useState(false);
//   const [showIndianGroupStates, setShowIndianGroupStates] = useState(false);
//   const [showIntlIndividualStates, setShowIntlIndividualStates] = useState(false);
//   const [showIntlGroupStates, setShowIntlGroupStates] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState({});
  
//   // Timers for delayed close (prevents flicker when moving between main item and sub-dropdown)
//   const indianIndividualTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const indianGroupTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const intlIndividualTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const intlGroupTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

//   const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);
//   const toggleMobileSubmenu = (label: string) => {
//     setMobileSubmenuOpen(prev => ({ ...prev, [label]: !prev[label] }));
//   };

//   // Helper to create delayed hover handlers
//   const createHoverHandlers = (
//     setter: React.Dispatch<React.SetStateAction<boolean>>,
//     timerRef: React.MutableRefObject<ReturnType<typeof setTimeout> | null>
//   ) => {
//     const enter = () => {
//       if (timerRef.current) {
//         clearTimeout(timerRef.current);
//         timerRef.current = null;
//       }
//       setter(true);
//     };
//     const leave = () => {
//       timerRef.current = setTimeout(() => {
//         setter(false);
//         timerRef.current = null;
//       }, 300); // 300ms delay – enough for normal mouse movement across the gap
//     };
//     return { enter, leave };
//   };

//   const navItems = [
//     { icon: HomeIcon, label: "Home", href: "/" },
//     {
//       icon: MapPin, label: "Indian Tours",
//       dropdown: [
//         { label: "Individual Tours", href: "#indian-individual", icon: Users, subDropdown: indianStates },
//         { label: "Group Tours", href: "#indian-group", icon: UsersRound, subDropdown: indianStates },
//         { label: "Ladies Special Tours", href: "#indian-ladies", icon: Sparkles },
//         { label: "Senior Citizen Tours", href: "#indian-senior", icon: Heart },
//         { label: "Students Tours", href: "#indian-students", icon: GraduationCap },
//         { label: "Honeymoon Tours", href: "#indian-honeymoon", icon: Heart },
//       ],
//     },
//     {
//       icon: Globe, label: "International Tours",
//       dropdown: [
//         { label: "Individual Tours", href: "#intl-individual", icon: Users, subDropdown: internationalDestinations },
//         { label: "Group Tours", href: "#intl-group", icon: UsersRound, subDropdown: internationalDestinations },
//         { label: "Ladies Special Tours", href: "#intl-ladies", icon: Sparkles },
//         { label: "Senior Citizen Tours", href: "#intl-senior", icon: Heart },
//         { label: "Students Tours", href: "#intl-students", icon: GraduationCap },
//         { label: "Honeymoon Tours", href: "#intl-honeymoon", icon: Heart },
//       ],
//     },
//     { icon: PlaneTakeoff, label: "Offline Flight Tickets", href: "#offline-flight-tickets" },
//     { icon: Ship, label: "Exhibitions", href: "#exhibitions" },
//     { icon: Compass, label: "MICE", href: "#mice" },
//     { icon: PlaneTakeoff, label: "Visa", href: "#visa" },
//     {
//       icon: Star, label: "Others",
//       dropdown: [
//         { label: "Bungalow / Villa", href: "#bungalow-villa", icon: HomeIcon },
//         { label: "Bus", href: "#bus", icon: Bus },
//         { label: "Car", href: "#car", icon: Car },
//         { label: "Cruise", href: "#cruise", icon: Ship },
//         { label: "Festivals", href: "#festivals", icon: Sparkles },
//         { label: "Insurances", href: "#insurances", icon: Umbrella },
//         { label: "Passport", href: "#passport", icon: Landmark },
//         { label: "Sports", href: "#sports", icon: Shield },
//         { label: "Weekend Gateways", href: "#weekend-gateways", icon: CalendarDays },
//       ],
//     },
//     { icon: UsersRound, label: "About Us", href: "#about" },
//     { icon: Phone, label: "Contact Us", href: "#contact" },
//   ];

//   return (
//     <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-xl border-b-2 border-blue-400 w-full">
//       <div className="w-full px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between py-3">
//           {/* LOGO */}
//           <div className="flex items-center">
//             <div className="relative group cursor-pointer">
//               <div className="absolute -inset-3 bg-white/10 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               <img
//                 src={logo}
//                 alt="SK Tours Logo"
//                 className="h-12 sm:h-14 w-auto object-contain relative z-10 transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
//               />
//             </div>
//           </div>

//           {/* Mobile Toggle */}
//           <button
//             onClick={toggleMobileMenu}
//             className="lg:hidden text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
//           >
//             {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
//           </button>

//           {/* DESKTOP NAV */}
//           <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
//             {navItems.map((item, index) => (
//               <div key={index} className="relative group">
//                 {!item.dropdown ? (
//                   <a
//                     href={item.href}
//                     className="flex flex-col items-center px-3 sm:px-4 py-3 transition-all duration-300 hover:bg-white/15 rounded-lg min-w-[80px] sm:min-w-[90px]"
//                   >
//                     <item.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
//                     <span className="text-sm font-medium">{item.label}</span>
//                   </a>
//                 ) : (
//                   <div className="relative">
//                     <div className="flex flex-col items-center px-3 sm:px-4 py-3 transition-all duration-300 hover:bg-white/15 rounded-lg min-w-[100px] sm:min-w-[110px] cursor-pointer">
//                       <item.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
//                       <div className="flex items-center gap-1">
//                         <span className="text-sm font-medium">{item.label}</span>
//                         <ChevronDown className="w-3 h-3" />
//                       </div>
//                     </div>

//                     {/* MEGA DROPDOWN */}
//                     <div className="absolute left-1/2 -translate-x-1/2 top-full opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-red-50 text-gray-800 rounded-xl shadow-2xl w-44 sm:w-52 py-4 border border-gray-200 transition-all duration-300 ease-in-out z-50">
//                       {item.dropdown.map((sub, idx) => {
//                         const isIndian = item.label === "Indian Tours";
//                         const isIntl = item.label === "International Tours";
//                         const isIndividual = sub.label === "Individual Tours";
//                         const isGroup = sub.label === "Group Tours";

//                         let showThisStates = false;
//                         let enterHandler = null;
//                         let leaveHandler = null;
//                         let enterStatesHandler = null;
//                         let leaveStatesHandler = null;
//                         let topOffset = "top-0";

//                         if (isIndian && isIndividual) {
//                           showThisStates = showIndianIndividualStates;
//                           const h = createHoverHandlers(setShowIndianIndividualStates, indianIndividualTimer);
//                           enterHandler = h.enter;
//                           leaveHandler = h.leave;
//                           enterStatesHandler = h.enter;
//                           leaveStatesHandler = h.leave;
//                           topOffset = "top-[-1rem]";
//                         } else if (isIndian && isGroup) {
//                           showThisStates = showIndianGroupStates;
//                           const h = createHoverHandlers(setShowIndianGroupStates, indianGroupTimer);
//                           enterHandler = h.enter;
//                           leaveHandler = h.leave;
//                           enterStatesHandler = h.enter;
//                           leaveStatesHandler = h.leave;
//                           topOffset = "top-[-4rem]";
//                         } else if (isIntl && isIndividual) {
//                           showThisStates = showIntlIndividualStates;
//                           const h = createHoverHandlers(setShowIntlIndividualStates, intlIndividualTimer);
//                           enterHandler = h.enter;
//                           leaveHandler = h.leave;
//                           enterStatesHandler = h.enter;
//                           leaveStatesHandler = h.leave;
//                           topOffset = "top-[-1rem]";
//                         } else if (isIntl && isGroup) {
//                           showThisStates = showIntlGroupStates;
//                           const h = createHoverHandlers(setShowIntlGroupStates, intlGroupTimer);
//                           enterHandler = h.enter;
//                           leaveHandler = h.leave;
//                           enterStatesHandler = h.enter;
//                           leaveStatesHandler = h.leave;
//                           topOffset = "top-[-4rem]";
//                         }

//                         return (
//                           <div key={idx} className="relative">
//                             <div
//                               className={`flex items-center px-2 sm:px-3 py-3.5 text-sm hover:bg-red-100 border-l-2 border-transparent hover:border-red-500 mx-1 sm:mx-2 rounded-lg block cursor-pointer transition-colors ${sub.subDropdown ? "pr-2" : ""}`}
//                               onMouseEnter={enterHandler ?? undefined}
//                               onMouseLeave={leaveHandler ?? undefined}
//                             >
//                               <a href={sub.href} className="flex items-center w-full">
//                                 <span className="font-medium flex-grow">{sub.label}</span>
//                                 {sub.subDropdown && <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0" />}
//                               </a>
//                             </div>

//                             {/* STATES / DESTINATIONS SUB-DROPDOWN */}
//                             {sub.subDropdown && showThisStates && (
//                               <div
//                                 className={`absolute left-full ${topOffset} ml-3 bg-white text-gray-800 rounded-xl shadow-2xl w-[400px] sm:w-[450px] py-4 border border-gray-200 opacity-100 visible transition-all duration-300 ease-in-out z-[60] max-h-[70vh] overflow-y-auto`}
//                                 onMouseEnter={enterStatesHandler ?? undefined}
//                                 onMouseLeave={leaveStatesHandler ?? undefined}
//                               >
//                                 <table className="min-w-full divide-y divide-gray-200">
//                                   <tbody className="bg-white divide-y divide-gray-200">
//                                     {sub.subDropdown.reduce((rows: any[], dest, index) => {
//                                       if (index % 3 === 0) rows.push([]);
//                                       rows[rows.length - 1].push(dest);
//                                       return rows;
//                                     }, []).map((row, rowIndex) => (
//                                       <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-blue-50" : "bg-blue-100"}>
//                                         {row.map((dest: string, colIndex: number) => {
//                                           const isAndaman = dest === "Andaman";
//                                           const href = isAndaman
//                                             ? "/tours-packages"
//                                             : `#${item.label.toLowerCase().replace(/\s/g, "-")}-state-${dest.toLowerCase().replace(/\s+/g, "-")}`;
//                                           return (
//                                             <td key={colIndex} className="w-1/3 px-2 py-2.5 whitespace-nowrap border-r border-gray-400">
//                                               <a
//                                                 href={href}
//                                                 className={`block w-full text-sm font-medium text-left transition-colors ${isAndaman
//                                                   ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-lg"
//                                                   : `hover:text-blue-600 ${rowIndex % 2 === 0 ? 'hover:bg-blue-100' : 'hover:bg-blue-200'}`
//                                                 }`}
//                                                 title={dest}
//                                               >
//                                                 {dest}
//                                                 {isAndaman && <Sparkles className="inline-block w-4 h-4 ml-1 animate-pulse" />}
//                                               </a>
//                                             </td>
//                                           );
//                                         })}
//                                         {row.length < 3 && [...Array(3 - row.length)].map((_, colIndex) => (
//                                           <td key={colIndex} className={`w-1/3 px-2 py-2.5 border-r border-gray-400 ${rowIndex % 2 === 0 ? "bg-blue-50" : "bg-blue-100"}`}></td>
//                                         ))}
//                                       </tr>
//                                     ))}
//                                   </tbody>
//                                 </table>
//                               </div>
//                             )}
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </nav>

//           {/* Desktop Login/Signup */}
//           <div className="hidden lg:flex flex-col items-end gap-2 ml-auto">
//             {/* Sign Up */}
//             <div className="relative group">
//               <Button variant="ghost" size="sm" className="bg-green-500 hover:bg-green-600 text-white px-4 sm:px-5 py-2 rounded-lg border border-green-600 flex items-center gap-2">
//                 <UserPlus className="w-4 h-4" />
//                 <span className="font-medium text-sm">Sign Up</span>
//                 <ChevronDown className="w-3 h-3" />
//               </Button>
//               <div className="absolute right-0 top-full mt-2 opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-white text-gray-800 rounded-xl shadow-2xl py-2 border border-gray-200 transition-all duration-300 z-50 min-w-[140px]">
//                 <a href="#new-user" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <UserPlus className="w-4 h-4 text-blue-600" /> New User
//                 </a>
//                 <a href="#new-agent" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <Users className="w-4 h-4 text-blue-600" /> New Agent
//                 </a>
//               </div>
//             </div>
//             {/* Login */}
//             <div className="relative group">
//               <Button variant="ghost" size="sm" className="bg-red-500 hover:bg-red-600 text-white px-4 sm:px-5 py-2 rounded-lg border border-red-600 flex items-center gap-2">
//                 <UserCircle className="w-4 h-4" />
//                 <span className="font-medium text-sm">Login</span>
//                 <ChevronDown className="w-3 h-3" />
//               </Button>
//               <div className="absolute right-0 top-full mt-2 opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-white text-gray-800 rounded-xl shadow-2xl py-2 border border-gray-200 transition-all duration-300 z-50 min-w-[140px]">
//                 <a href="#user-login" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <UserCircle className="w-4 h-4 text-blue-600" /> User Login
//                 </a>
//                 <a href="#agent-login" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
//                   <Users className="w-4 h-4 text-blue-600" /> Agent Login
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* MOBILE MENU */}
//         {mobileMenuOpen && (
//           <nav className="lg:hidden bg-primary text-primary-foreground border-t border-blue-400">
//             <ul className="flex flex-col">
//               {navItems.map((item, index) => (
//                 <li key={index} className="border-b border-blue-500">
//                   {!item.dropdown ? (
//                     <a href={item.href} className="flex gap-2 items-center px-4 py-3 hover:bg-white/10 transition-colors">
//                       <item.icon className="w-5 h-5" />
//                       <span className="font-medium text-sm">{item.label}</span>
//                     </a>
//                   ) : (
//                     <>
//                       <button
//                         onClick={() => toggleMobileSubmenu(item.label)}
//                         className="w-full flex justify-between items-center px-4 py-3 hover:bg-white/10 transition-colors font-medium text-sm"
//                       >
//                         <div className="flex items-center gap-2">
//                           <item.icon className="w-5 h-5" />
//                           <span>{item.label}</span>
//                         </div>
//                         <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileSubmenuOpen[item.label] ? "rotate-180" : ""}`} />
//                       </button>
//                       {mobileSubmenuOpen[item.label] && (
//                         <ul className="bg-primary border-t border-blue-500">
//                           {item.dropdown.map((sub, i) => (
//                             <li key={i} className="border-b border-blue-600">
//                               {!sub.subDropdown ? (
//                                 <a href={sub.href} className="flex items-center gap-2 px-8 py-2 hover:bg-white/10 transition-colors font-normal text-sm">
//                                   <sub.icon className="w-4 h-4" />
//                                   <span>{sub.label}</span>
//                                 </a>
//                               ) : (
//                                 <>
//                                   <button
//                                     onClick={() => toggleMobileSubmenu(sub.label)}
//                                     className="w-full flex justify-between items-center px-8 py-2 hover:bg-white/10 transition-colors font-normal text-sm"
//                                   >
//                                     <div className="flex items-center gap-2">
//                                       <sub.icon className="w-4 h-4" />
//                                       <span>{sub.label}</span>
//                                     </div>
//                                     <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileSubmenuOpen[sub.label] ? "rotate-180" : ""}`} />
//                                   </button>
//                                   {mobileSubmenuOpen[sub.label] && (
//                                     <ul className="bg-primary border-t border-blue-600">
//                                       {sub.subDropdown.map((dest, j) => {
//                                         const isAndaman = dest === "Andaman";
//                                         return (
//                                           <li key={j}>
//                                             <a
//                                               href={isAndaman ? "/tours-packages" : "#"}
//                                               className={`block px-12 py-2 text-sm font-medium ${isAndaman ? "text-cyan-400 font-bold" : "text-gray-300"} hover:text-white`}
//                                             >
//                                               {dest} {isAndaman && "(Featured)"}
//                                             </a>
//                                           </li>
//                                         );
//                                       })}
//                                     </ul>
//                                   )}
//                                 </>
//                               )}
//                             </li>
//                           ))}
//                         </ul>
//                       )}
//                     </>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;






// import {
//   Ship, Compass, Phone, UserCircle, Home as HomeIcon, ChevronDown, Sparkles, Heart,
//   GraduationCap, Car, Bus, Landmark, Umbrella, CalendarDays, Users, Shield, Star,
//   UsersRound, Globe, MapPin, ChevronRight, PlaneTakeoff, UserPlus, Menu as MenuIcon,
//   X as XIcon,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import logo from "../assets/png[3].png";
// import { useState, useRef } from "react";

// const indianStates = [
//   "Andaman", "Andhra Pradesh", "Bihar", "Chhattisgarh", "Dadra & Nagar Haveli", "Daman & Diu",
//   "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir",
//   "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Leh Ladakh", "Lakshadweep", "Madhya Pradesh",
//   "Maharashtra", "North East", "Odisha", "Puducherry", "Punjab", "Rajasthan",
//   "Seven Sisters", "Tamil Nadu", "Uttar Pradesh", "Uttarakhand", "West Bengal",
// ].sort();

// const internationalDestinations = [
//   "Africa", "America", "Australia NewZealand", "Bhutan", "Dubai and MiddleEast",
//   "Eurasia", "Europe", "Japan China", "Mauritius", "Nepal", "Seychelles",
//   "South East Asia", "SriLanka Maldives",
// ];

// const Header = () => {
//   const [showIndianIndividualStates, setShowIndianIndividualStates] = useState(false);
//   const [showIndianGroupStates, setShowIndianGroupStates] = useState(false);
//   const [showIntlIndividualStates, setShowIntlIndividualStates] = useState(false);
//   const [showIntlGroupStates, setShowIntlGroupStates] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState({});
  
//   // Timers for delayed close (prevents flicker when moving between main item and sub-dropdown)
//   const indianIndividualTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const indianGroupTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const intlIndividualTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const intlGroupTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

//   const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);
//   const toggleMobileSubmenu = (label: string) => {
//     setMobileSubmenuOpen(prev => ({ ...prev, [label]: !prev[label] }));
//   };

//   // Helper to create delayed hover handlers
//   const createHoverHandlers = (
//     setter: React.Dispatch<React.SetStateAction<boolean>>,
//     timerRef: React.MutableRefObject<ReturnType<typeof setTimeout> | null>
//   ) => {
//     const enter = () => {
//       if (timerRef.current) {
//         clearTimeout(timerRef.current);
//         timerRef.current = null;
//       }
//       setter(true);
//     };
//     const leave = () => {
//       timerRef.current = setTimeout(() => {
//         setter(false);
//         timerRef.current = null;
//       }, 300); // 300ms delay – enough for normal mouse movement across the gap
//     };
//     return { enter, leave };
//   };

//   const navItems = [
//     { icon: HomeIcon, label: "Home", href: "/" },
//     {
//       icon: MapPin, label: "Indian Tours",
//       dropdown: [
//         { label: "Individual Tours", href: "#indian-individual", icon: Users, subDropdown: indianStates },
//         { label: "Group Tours", href: "#indian-group", icon: UsersRound, subDropdown: indianStates },
//         { label: "Ladies Special Tours", href: "#indian-ladies", icon: Sparkles },
//         { label: "Senior Citizen Tours", href: "#indian-senior", icon: Heart },
//         { label: "Students Tours", href: "#indian-students", icon: GraduationCap },
//         { label: "Honeymoon Tours", href: "#indian-honeymoon", icon: Heart },
//       ],
//     },
//     {
//       icon: Globe, label: "International Tours",
//       dropdown: [
//         { label: "Individual Tours", href: "#intl-individual", icon: Users, subDropdown: internationalDestinations },
//         { label: "Group Tours", href: "#intl-group", icon: UsersRound, subDropdown: internationalDestinations },
//         { label: "Ladies Special Tours", href: "#intl-ladies", icon: Sparkles },
//         { label: "Senior Citizen Tours", href: "#intl-senior", icon: Heart },
//         { label: "Students Tours", href: "#intl-students", icon: GraduationCap },
//         { label: "Honeymoon Tours", href: "#intl-honeymoon", icon: Heart },
//       ],
//     },
//     { icon: PlaneTakeoff, label: "Offline Flight Tickets", href: "#offline-flight-tickets" },
//     { icon: Ship, label: "Exhibitions", href: "#exhibitions" },
//     { icon: Compass, label: "MICE", href: "#mice" },
//     { icon: PlaneTakeoff, label: "Visa", href: "#visa" },
//     {
//       icon: Star, label: "Others",
//       dropdown: [
//         { label: "Bungalow / Villa", href: "#bungalow-villa", icon: HomeIcon },
//         { label: "Bus", href: "#bus", icon: Bus },
//         { label: "Car", href: "#car", icon: Car },
//         { label: "Cruise", href: "#cruise", icon: Ship },
//         { label: "Festivals", href: "#festivals", icon: Sparkles },
//         { label: "Insurances", href: "#insurances", icon: Umbrella },
//         { label: "Passport", href: "#passport", icon: Landmark },
//         { label: "Sports", href: "#sports", icon: Shield },
//         { label: "Weekend Gateways", href: "#weekend-gateways", icon: CalendarDays },
//       ],
//     },
//     { icon: UsersRound, label: "About Us", href: "#about" },
//     { icon: Phone, label: "Contact Us", href: "#contact" },
//   ];

//   return (
//     <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-xl border-b-2 border-blue-400 w-full">
//       <div className="w-full px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between py-3">
//           {/* LOGO */}
//           <div className="flex items-center">
//             <div className="relative group cursor-pointer">
//               <div className="absolute -inset-3 bg-white/10 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               <img
//                 src={logo}
//                 alt="SK Tours Logo"
//                 className="h-12 sm:h-14 w-auto object-contain relative z-10 transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
//               />
//             </div>
//           </div>

//           {/* Mobile Toggle */}
//           <button
//             onClick={toggleMobileMenu}
//             className="lg:hidden text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
//           >
//             {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
//           </button>

//           {/* DESKTOP NAV */}
//           <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
//             {navItems.map((item, index) => (
//               <div key={index} className="relative group">
//                 {!item.dropdown ? (
//                   <a
//                     href={item.href}
//                     className="flex flex-col items-center px-3 sm:px-4 py-3 transition-all duration-300 hover:bg-white/15 rounded-lg min-w-[80px] sm:min-w-[90px]"
//                   >
//                     <item.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
//                     <span className="text-sm font-medium">{item.label}</span>
//                   </a>
//                 ) : (
//                   <div className="relative">
//                     <div className="flex flex-col items-center px-3 sm:px-4 py-3 transition-all duration-300 hover:bg-white/15 rounded-lg min-w-[100px] sm:min-w-[110px] cursor-pointer">
//                       <item.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
//                       <div className="flex items-center gap-1">
//                         <span className="text-sm font-medium">{item.label}</span>
//                         <ChevronDown className="w-3 h-3" />
//                       </div>
//                     </div>
//                     {/* MEGA DROPDOWN */}
//                     <div className="absolute left-1/2 -translate-x-1/2 top-full opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-red-50 text-gray-800 rounded-xl shadow-2xl w-44 sm:w-52 py-4 border border-gray-200 transition-all duration-300 ease-in-out z-50">
//                       {item.dropdown.map((sub, idx) => {
//                         const isIndian = item.label === "Indian Tours";
//                         const isIntl = item.label === "International Tours";
//                         const isIndividual = sub.label === "Individual Tours";
//                         const isGroup = sub.label === "Group Tours";
//                         let showThisStates = false;
//                         let enterHandler = null;
//                         let leaveHandler = null;
//                         let enterStatesHandler = null;
//                         let leaveStatesHandler = null;
//                         let topOffset = "top-0";

//                         if (isIndian && isIndividual) {
//                           showThisStates = showIndianIndividualStates;
//                           const h = createHoverHandlers(setShowIndianIndividualStates, indianIndividualTimer);
//                           enterHandler = h.enter;
//                           leaveHandler = h.leave;
//                           enterStatesHandler = h.enter;
//                           leaveStatesHandler = h.leave;
//                           topOffset = "top-[-1rem]";
//                         } else if (isIndian && isGroup) {
//                           showThisStates = showIndianGroupStates;
//                           const h = createHoverHandlers(setShowIndianGroupStates, indianGroupTimer);
//                           enterHandler = h.enter;
//                           leaveHandler = h.leave;
//                           enterStatesHandler = h.enter;
//                           leaveStatesHandler = h.leave;
//                           topOffset = "top-[-4rem]";
//                         } else if (isIntl && isIndividual) {
//                           showThisStates = showIntlIndividualStates;
//                           const h = createHoverHandlers(setShowIntlIndividualStates, intlIndividualTimer);
//                           enterHandler = h.enter;
//                           leaveHandler = h.leave;
//                           enterStatesHandler = h.enter;
//                           leaveStatesHandler = h.leave;
//                           topOffset = "top-[-1rem]";
//                         } else if (isIntl && isGroup) {
//                           showThisStates = showIntlGroupStates;
//                           const h = createHoverHandlers(setShowIntlGroupStates, intlGroupTimer);
//                           enterHandler = h.enter;
//                           leaveHandler = h.leave;
//                           enterStatesHandler = h.enter;
//                           leaveStatesHandler = h.leave;
//                           topOffset = "top-[-4rem]";
//                         }

//                         return (
//                           <div key={idx} className="relative">
//                             <div
//                               className={`flex items-center px-2 sm:px-3 py-3.5 text-sm hover:bg-red-100 border-l-2 border-transparent hover:border-red-500 mx-1 sm:mx-2 rounded-lg block cursor-pointer transition-colors ${sub.subDropdown ? "pr-2" : ""}`}
//                               onMouseEnter={enterHandler ?? undefined}
//                               onMouseLeave={leaveHandler ?? undefined}
//                             >
//                               <a href={sub.href} className="flex items-center w-full">
//                                 <span className="font-medium flex-grow">{sub.label}</span>
//                                 {sub.subDropdown && <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0" />}
//                               </a>
//                             </div>
//                             {/* STATES / DESTINATIONS SUB-DROPDOWN */}
//                             {sub.subDropdown && showThisStates && (
//                               <div
//                                 className={`absolute left-full ${topOffset} ml-3 bg-white text-gray-800 rounded-xl shadow-2xl w-[400px] sm:w-[450px] py-4 border border-gray-200 opacity-100 visible transition-all duration-300 ease-in-out z-[60] max-h-[70vh] overflow-y-auto`}
//                                 onMouseEnter={enterStatesHandler ?? undefined}
//                                 onMouseLeave={leaveStatesHandler ?? undefined}
//                               >
//                                 <table className="min-w-full divide-y divide-gray-200">
//                                   <tbody className="bg-white divide-y divide-gray-200">
//                                     {sub.subDropdown.reduce((rows: any[], dest, index) => {
//                                       if (index % 3 === 0) rows.push([]);
//                                       rows[rows.length - 1].push(dest);
//                                       return rows;
//                                     }, []).map((row, rowIndex) => (
//                                       <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-blue-50" : "bg-blue-100"}>
//                                         {row.map((dest: string, colIndex: number) => {
//                                           const isAndaman = dest === "Andaman";
//                                           const href = isAndaman
//                                             ? "/tours-packages"
//                                             : `#${item.label.toLowerCase().replace(/\s/g, "-")}-state-${dest.toLowerCase().replace(/\s+/g, "-")}`;
//                                           return (
//                                             <td key={colIndex} className="w-1/3 px-2 py-2.5 whitespace-nowrap border-r border-gray-400">
//                                               <a
//                                                 href={href}
//                                                 className={`block w-full text-sm font-medium text-left transition-colors ${isAndaman
//                                                   ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-lg"
//                                                   : `hover:text-blue-600 ${rowIndex % 2 === 0 ? 'hover:bg-blue-100' : 'hover:bg-blue-200'}`
//                                                 }`}
//                                                 title={dest}
//                                               >
//                                                 {dest}
//                                                 {isAndaman && <Sparkles className="inline-block w-4 h-4 ml-1 animate-pulse" />}
//                                               </a>
//                                             </td>
//                                           );
//                                         })}
//                                         {row.length < 3 && [...Array(3 - row.length)].map((_, colIndex) => (
//                                           <td key={colIndex} className={`w-1/3 px-2 py-2.5 border-r border-gray-400 ${rowIndex % 2 === 0 ? "bg-blue-50" : "bg-blue-100"}`}></td>
//                                         ))}
//                                       </tr>
//                                     ))}
//                                   </tbody>
//                                 </table>
//                               </div>
//                             )}
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </nav>

//           {/* Desktop Login/Signup */}
//           <div className="hidden lg:flex items-center gap-3 ml-auto">
//             {/* Sign Up */}
//             <div className="relative group">
//               <Button 
//                 variant="ghost" 
//                 size="sm" 
//                 className="bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-lg border border-green-600 flex items-center gap-2 min-w-[120px] justify-center"
//               >
//                 <UserPlus className="w-4 h-4" />
//                 <span className="font-medium text-sm">Sign Up</span>
//                 <ChevronDown className="w-3 h-3" />
//               </Button>
//               <div className="absolute right-0 top-full mt-2 opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-green-50 text-gray-800 rounded-xl shadow-2xl py-2 border border-green-200 transition-all duration-300 z-50 min-w-[140px]">
//                 <a href="#new-user" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-green-100 hover:text-green-700 rounded-lg transition-colors">
//                   <UserPlus className="w-4 h-4 text-green-600" /> New User
//                 </a>
//                 <a href="#new-agent" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-green-100 hover:text-green-700 rounded-lg transition-colors">
//                   <Users className="w-4 h-4 text-green-600" /> New Agent
//                 </a>
//               </div>
//             </div>

//             {/* Login */}
//             <div className="relative group">
//               <Button 
//                 variant="ghost" 
//                 size="sm" 
//                 className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-lg border border-red-600 flex items-center gap-2 min-w-[120px] justify-center"
//               >
//                 <UserCircle className="w-4 h-4" />
//                 <span className="font-medium text-sm">Login</span>
//                 <ChevronDown className="w-3 h-3" />
//               </Button>
//               <div className="absolute right-0 top-full mt-2 opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-red-50 text-gray-800 rounded-xl shadow-2xl py-2 border border-red-200 transition-all duration-300 z-50 min-w-[140px]">
//                 <a href="#user-login" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-red-100 hover:text-red-700 rounded-lg transition-colors">
//                   <UserCircle className="w-4 h-4 text-red-600" /> User Login
//                 </a>
//                 <a href="#agent-login" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-red-100 hover:text-red-700 rounded-lg transition-colors">
//                   <Users className="w-4 h-4 text-red-600" /> Agent Login
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* MOBILE MENU */}
//         {mobileMenuOpen && (
//           <nav className="lg:hidden bg-primary text-primary-foreground border-t border-blue-400">
//             <ul className="flex flex-col">
//               {navItems.map((item, index) => (
//                 <li key={index} className="border-b border-blue-500">
//                   {!item.dropdown ? (
//                     <a href={item.href} className="flex gap-2 items-center px-4 py-3 hover:bg-white/10 transition-colors">
//                       <item.icon className="w-5 h-5" />
//                       <span className="font-medium text-sm">{item.label}</span>
//                     </a>
//                   ) : (
//                     <>
//                       <button
//                         onClick={() => toggleMobileSubmenu(item.label)}
//                         className="w-full flex justify-between items-center px-4 py-3 hover:bg-white/10 transition-colors font-medium text-sm"
//                       >
//                         <div className="flex items-center gap-2">
//                           <item.icon className="w-5 h-5" />
//                           <span>{item.label}</span>
//                         </div>
//                         <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileSubmenuOpen[item.label] ? "rotate-180" : ""}`} />
//                       </button>
//                       {mobileSubmenuOpen[item.label] && (
//                         <ul className="bg-primary border-t border-blue-500">
//                           {item.dropdown.map((sub, i) => (
//                             <li key={i} className="border-b border-blue-600">
//                               {!sub.subDropdown ? (
//                                 <a href={sub.href} className="flex items-center gap-2 px-8 py-2 hover:bg-white/10 transition-colors font-normal text-sm">
//                                   <sub.icon className="w-4 h-4" />
//                                   <span>{sub.label}</span>
//                                 </a>
//                               ) : (
//                                 <>
//                                   <button
//                                     onClick={() => toggleMobileSubmenu(sub.label)}
//                                     className="w-full flex justify-between items-center px-8 py-2 hover:bg-white/10 transition-colors font-normal text-sm"
//                                   >
//                                     <div className="flex items-center gap-2">
//                                       <sub.icon className="w-4 h-4" />
//                                       <span>{sub.label}</span>
//                                     </div>
//                                     <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileSubmenuOpen[sub.label] ? "rotate-180" : ""}`} />
//                                   </button>
//                                   {mobileSubmenuOpen[sub.label] && (
//                                     <ul className="bg-primary border-t border-blue-600">
//                                       {sub.subDropdown.map((dest, j) => {
//                                         const isAndaman = dest === "Andaman";
//                                         return (
//                                           <li key={j}>
//                                             <a
//                                               href={isAndaman ? "/tours-packages" : "#"}
//                                               className={`block px-12 py-2 text-sm font-medium ${isAndaman ? "text-cyan-400 font-bold" : "text-gray-300"} hover:text-white`}
//                                             >
//                                               {dest} {isAndaman && "(Featured)"}
//                                             </a>
//                                           </li>
//                                         );
//                                       })}
//                                     </ul>
//                                   )}
//                                 </>
//                               )}
//                             </li>
//                           ))}
//                         </ul>
//                       )}
//                     </>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;





// import {
//   Ship, Compass, Phone, UserCircle, Home as HomeIcon, ChevronDown, Sparkles, Heart,
//   GraduationCap, Car, Bus, Landmark, Umbrella, CalendarDays, Users, Shield, Star,
//   UsersRound, Globe, MapPin, ChevronRight, PlaneTakeoff, UserPlus, Menu as MenuIcon,
//   X as XIcon,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import logo from "../assets/png[3].png";
// import { useState, useRef } from "react";

// const indianStates = [
//   "Andaman", "Andhra Pradesh", "Bihar", "Chhattisgarh", "Dadra & Nagar Haveli", "Daman & Diu",
//   "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir",
//   "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Leh Ladakh", "Lakshadweep", "Madhya Pradesh",
//   "Maharashtra", "North East", "Odisha", "Puducherry", "Punjab", "Rajasthan",
//   "Seven Sisters", "Tamil Nadu", "Uttar Pradesh", "Uttarakhand", "West Bengal",
// ].sort();

// const internationalDestinations = [
//   "Africa", "America", "Australia NewZealand", "Bhutan", "Dubai and MiddleEast",
//   "Eurasia", "Europe", "Japan China", "Mauritius", "Nepal", "Seychelles",
//   "South East Asia", "SriLanka Maldives",
// ];

// const Header = () => {
//   const [showIndianIndividualStates, setShowIndianIndividualStates] = useState(false);
//   const [showIndianGroupStates, setShowIndianGroupStates] = useState(false);
//   const [showIntlIndividualStates, setShowIntlIndividualStates] = useState(false);
//   const [showIntlGroupStates, setShowIntlGroupStates] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState({});
  
//   // Timers for delayed close (prevents flicker when moving between main item and sub-dropdown)
//   const indianIndividualTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const indianGroupTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const intlIndividualTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const intlGroupTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

//   const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);
//   const toggleMobileSubmenu = (label: string) => {
//     setMobileSubmenuOpen(prev => ({ ...prev, [label]: !prev[label] }));
//   };

//   // Helper to create delayed hover handlers
//   const createHoverHandlers = (
//     setter: React.Dispatch<React.SetStateAction<boolean>>,
//     timerRef: React.MutableRefObject<ReturnType<typeof setTimeout> | null>
//   ) => {
//     const enter = () => {
//       if (timerRef.current) {
//         clearTimeout(timerRef.current);
//         timerRef.current = null;
//       }
//       setter(true);
//     };
//     const leave = () => {
//       timerRef.current = setTimeout(() => {
//         setter(false);
//         timerRef.current = null;
//       }, 300); // 300ms delay – enough for normal mouse movement across the gap
//     };
//     return { enter, leave };
//   };

//   const navItems = [
//     { icon: HomeIcon, label: "Home", href: "/" },
//     {
//       icon: MapPin, label: "Indian Tours",
//       dropdown: [
//         { label: "Individual Tours", href: "#indian-individual", icon: Users, subDropdown: indianStates },
//         { label: "Group Tours", href: "#indian-group", icon: UsersRound, subDropdown: indianStates },
//         { label: "Ladies Special Tours", href: "#indian-ladies", icon: Sparkles },
//         { label: "Senior Citizen Tours", href: "#indian-senior", icon: Heart },
//         { label: "Students Tours", href: "#indian-students", icon: GraduationCap },
//         { label: "Honeymoon Tours", href: "#indian-honeymoon", icon: Heart },
//       ],
//     },
//     {
//       icon: Globe, label: "International Tours",
//       dropdown: [
//         { label: "Individual Tours", href: "#intl-individual", icon: Users, subDropdown: internationalDestinations },
//         { label: "Group Tours", href: "#intl-group", icon: UsersRound, subDropdown: internationalDestinations },
//         { label: "Ladies Special Tours", href: "#intl-ladies", icon: Sparkles },
//         { label: "Senior Citizen Tours", href: "#intl-senior", icon: Heart },
//         { label: "Students Tours", href: "#intl-students", icon: GraduationCap },
//         { label: "Honeymoon Tours", href: "#intl-honeymoon", icon: Heart },
//       ],
//     },
//     { icon: PlaneTakeoff, label: "Offline Flight Tickets", href: "#offline-flight-tickets" },
//     { icon: Ship, label: "Exhibitions", href: "#exhibitions" },
//     { icon: Compass, label: "MICE", href: "#mice" },
//     { icon: PlaneTakeoff, label: "Visa", href: "#visa" },
//     {
//       icon: Star, label: "Others",
//       dropdown: [
//         { label: "Bungalow / Villa", href: "#bungalow-villa", icon: HomeIcon },
//         { label: "Bus", href: "#bus", icon: Bus },
//         { label: "Car", href: "#car", icon: Car },
//         { label: "Cruise", href: "#cruise", icon: Ship },
//         { label: "Festivals", href: "#festivals", icon: Sparkles },
//         { label: "Insurances", href: "#insurances", icon: Umbrella },
//         { label: "Passport", href: "#passport", icon: Landmark },
//         { label: "Sports", href: "#sports", icon: Shield },
//         { label: "Weekend Gateways", href: "#weekend-gateways", icon: CalendarDays },
//       ],
//     },
//     { icon: UsersRound, label: "About Us", href: "#about" },
//     { icon: Phone, label: "Contact Us", href: "#contact" },
//   ];

//   return (
//     <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-xl border-b-2 border-blue-400 w-full">
//       <div className="w-full px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between py-3">
//           {/* LOGO */}
//           <div className="flex items-center">
//             <div className="relative group cursor-pointer">
//               <div className="absolute -inset-3 bg-white/10 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               <img
//                 src={logo}
//                 alt="SK Tours Logo"
//                 className="h-12 sm:h-14 w-auto object-contain relative z-10 transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
//               />
//             </div>
//           </div>

//           {/* Mobile Toggle */}
//           <button
//             onClick={toggleMobileMenu}
//             className="lg:hidden text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
//           >
//             {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
//           </button>

//           {/* DESKTOP NAV */}
//           <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
//             {navItems.map((item, index) => (
//               <div key={index} className="relative group">
//                 {!item.dropdown ? (
//                   <a
//                     href={item.href}
//                     className="flex flex-col items-center px-3 sm:px-4 py-3 transition-all duration-300 hover:bg-white/15 rounded-lg min-w-[80px] sm:min-w-[90px]"
//                   >
//                     <item.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
//                     <span className="text-sm font-medium">{item.label}</span>
//                   </a>
//                 ) : (
//                   <div className="relative">
//                     <div className="flex flex-col items-center px-3 sm:px-4 py-3 transition-all duration-300 hover:bg-white/15 rounded-lg min-w-[100px] sm:min-w-[110px] cursor-pointer">
//                       <item.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
//                       <div className="flex items-center gap-1">
//                         <span className="text-sm font-medium">{item.label}</span>
//                         <ChevronDown className="w-3 h-3" />
//                       </div>
//                     </div>
//                     {/* MEGA DROPDOWN */}
//                     <div className="absolute left-1/2 -translate-x-1/2 top-full opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-red-50 text-gray-800 rounded-xl shadow-2xl w-44 sm:w-52 py-4 border border-gray-200 transition-all duration-300 ease-in-out z-50">
//                       {item.dropdown.map((sub, idx) => {
//                         const isIndian = item.label === "Indian Tours";
//                         const isIntl = item.label === "International Tours";
//                         const isIndividual = sub.label === "Individual Tours";
//                         const isGroup = sub.label === "Group Tours";
//                         let showThisStates = false;
//                         let enterHandler = null;
//                         let leaveHandler = null;
//                         let enterStatesHandler = null;
//                         let leaveStatesHandler = null;
//                         let topOffset = "top-0";

//                         if (isIndian && isIndividual) {
//                           showThisStates = showIndianIndividualStates;
//                           const h = createHoverHandlers(setShowIndianIndividualStates, indianIndividualTimer);
//                           enterHandler = h.enter;
//                           leaveHandler = h.leave;
//                           enterStatesHandler = h.enter;
//                           leaveStatesHandler = h.leave;
//                           topOffset = "top-[-1rem]";
//                         } else if (isIndian && isGroup) {
//                           showThisStates = showIndianGroupStates;
//                           const h = createHoverHandlers(setShowIndianGroupStates, indianGroupTimer);
//                           enterHandler = h.enter;
//                           leaveHandler = h.leave;
//                           enterStatesHandler = h.enter;
//                           leaveStatesHandler = h.leave;
//                           topOffset = "top-[-4rem]";
//                         } else if (isIntl && isIndividual) {
//                           showThisStates = showIntlIndividualStates;
//                           const h = createHoverHandlers(setShowIntlIndividualStates, intlIndividualTimer);
//                           enterHandler = h.enter;
//                           leaveHandler = h.leave;
//                           enterStatesHandler = h.enter;
//                           leaveStatesHandler = h.leave;
//                           topOffset = "top-[-1rem]";
//                         } else if (isIntl && isGroup) {
//                           showThisStates = showIntlGroupStates;
//                           const h = createHoverHandlers(setShowIntlGroupStates, intlGroupTimer);
//                           enterHandler = h.enter;
//                           leaveHandler = h.leave;
//                           enterStatesHandler = h.enter;
//                           leaveStatesHandler = h.leave;
//                           topOffset = "top-[-4rem]";
//                         }

//                         return (
//                           <div key={idx} className="relative">
//                             <div
//                               className={`flex items-center px-2 sm:px-3 py-3.5 text-sm hover:bg-red-100 border-l-2 border-transparent hover:border-red-500 mx-1 sm:mx-2 rounded-lg block cursor-pointer transition-colors ${sub.subDropdown ? "pr-2" : ""}`}
//                               onMouseEnter={enterHandler ?? undefined}
//                               onMouseLeave={leaveHandler ?? undefined}
//                             >
//                               <a href={sub.href} className="flex items-center w-full">
//                                 <span className="font-medium flex-grow">{sub.label}</span>
//                                 {sub.subDropdown && <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0" />}
//                               </a>
//                             </div>
//                             {/* STATES / DESTINATIONS SUB-DROPDOWN */}
//                             {sub.subDropdown && showThisStates && (
//                               <div
//                                 className={`absolute left-full ${topOffset} ml-3 bg-white text-gray-800 rounded-xl shadow-2xl w-[400px] sm:w-[450px] py-4 border border-gray-200 opacity-100 visible transition-all duration-300 ease-in-out z-[60] max-h-[70vh] overflow-y-auto`}
//                                 onMouseEnter={enterStatesHandler ?? undefined}
//                                 onMouseLeave={leaveStatesHandler ?? undefined}
//                               >
//                                 <table className="min-w-full divide-y divide-gray-200">
//                                   <tbody className="bg-white divide-y divide-gray-200">
//                                     {sub.subDropdown.reduce((rows: any[], dest, index) => {
//                                       if (index % 3 === 0) rows.push([]);
//                                       rows[rows.length - 1].push(dest);
//                                       return rows;
//                                     }, []).map((row, rowIndex) => (
//                                       <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-blue-50" : "bg-blue-100"}>
//                                         {row.map((dest: string, colIndex: number) => {
//                                           const isAndaman = dest === "Andaman";
//                                           const href = isAndaman
//                                             ? "/tours-packages"
//                                             : `#${item.label.toLowerCase().replace(/\s/g, "-")}-state-${dest.toLowerCase().replace(/\s+/g, "-")}`;
//                                           return (
//                                             <td key={colIndex} className="w-1/3 px-2 py-2.5 whitespace-nowrap border-r border-gray-400">
//                                               <a
//                                                 href={href}
//                                                 className={`block w-full text-sm font-medium text-left transition-colors ${isAndaman
//                                                   ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-lg"
//                                                   : `hover:text-blue-600 ${rowIndex % 2 === 0 ? 'hover:bg-blue-100' : 'hover:bg-blue-200'}`
//                                                 }`}
//                                                 title={dest}
//                                               >
//                                                 {dest}
//                                                 {isAndaman && <Sparkles className="inline-block w-4 h-4 ml-1 animate-pulse" />}
//                                               </a>
//                                             </td>
//                                           );
//                                         })}
//                                         {row.length < 3 && [...Array(3 - row.length)].map((_, colIndex) => (
//                                           <td key={colIndex} className={`w-1/3 px-2 py-2.5 border-r border-gray-400 ${rowIndex % 2 === 0 ? "bg-blue-50" : "bg-blue-100"}`}></td>
//                                         ))}
//                                       </tr>
//                                     ))}
//                                   </tbody>
//                                 </table>
//                               </div>
//                             )}
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </nav>

//           {/* Desktop Login/Signup - Vertical Layout */}
//           <div className="hidden lg:flex flex-col items-end gap-2 ml-auto">
//             {/* Sign Up */}
//             <div className="relative group">
//               <Button 
//                 variant="ghost" 
//                 size="sm" 
//                 className="bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-lg border border-green-600 flex items-center gap-2 w-[120px] justify-center"
//               >
//                 <UserPlus className="w-4 h-4" />
//                 <span className="font-medium text-sm">Sign Up</span>
//                 <ChevronDown className="w-3 h-3" />
//               </Button>
//               <div className="absolute left-0 top-full mt-2 opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-green-50 text-gray-800 rounded-xl shadow-2xl py-2 border border-green-200 transition-all duration-300 z-50 min-w-[140px]">
//                 <a href="#new-user" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-green-100 hover:text-green-700 rounded-lg transition-colors">
//                   <UserPlus className="w-4 h-4 text-green-600" /> New User
//                 </a>
//                 <a href="#new-agent" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-green-100 hover:text-green-700 rounded-lg transition-colors">
//                   <Users className="w-4 h-4 text-green-600" /> New Agent
//                 </a>
//               </div>
//             </div>

//             {/* Login */}
//             <div className="relative group">
//               <Button 
//                 variant="ghost" 
//                 size="sm" 
//                 className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-lg border border-red-600 flex items-center gap-2 w-[120px] justify-center"
//               >
//                 <UserCircle className="w-4 h-4" />
//                 <span className="font-medium text-sm">Login</span>
//                 <ChevronDown className="w-3 h-3" />
//               </Button>
//               <div className="absolute left-0 top-full mt-2 opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-red-50 text-gray-800 rounded-xl shadow-2xl py-2 border border-red-200 transition-all duration-300 z-50 min-w-[140px]">
//                 <a href="#user-login" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-red-100 hover:text-red-700 rounded-lg transition-colors">
//                   <UserCircle className="w-4 h-4 text-red-600" /> User Login
//                 </a>
//                 <a href="#agent-login" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-red-100 hover:text-red-700 rounded-lg transition-colors">
//                   <Users className="w-4 h-4 text-red-600" /> Agent Login
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* MOBILE MENU */}
//         {mobileMenuOpen && (
//           <nav className="lg:hidden bg-primary text-primary-foreground border-t border-blue-400">
//             <ul className="flex flex-col">
//               {navItems.map((item, index) => (
//                 <li key={index} className="border-b border-blue-500">
//                   {!item.dropdown ? (
//                     <a href={item.href} className="flex gap-2 items-center px-4 py-3 hover:bg-white/10 transition-colors">
//                       <item.icon className="w-5 h-5" />
//                       <span className="font-medium text-sm">{item.label}</span>
//                     </a>
//                   ) : (
//                     <>
//                       <button
//                         onClick={() => toggleMobileSubmenu(item.label)}
//                         className="w-full flex justify-between items-center px-4 py-3 hover:bg-white/10 transition-colors font-medium text-sm"
//                       >
//                         <div className="flex items-center gap-2">
//                           <item.icon className="w-5 h-5" />
//                           <span>{item.label}</span>
//                         </div>
//                         <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileSubmenuOpen[item.label] ? "rotate-180" : ""}`} />
//                       </button>
//                       {mobileSubmenuOpen[item.label] && (
//                         <ul className="bg-primary border-t border-blue-500">
//                           {item.dropdown.map((sub, i) => (
//                             <li key={i} className="border-b border-blue-600">
//                               {!sub.subDropdown ? (
//                                 <a href={sub.href} className="flex items-center gap-2 px-8 py-2 hover:bg-white/10 transition-colors font-normal text-sm">
//                                   <sub.icon className="w-4 h-4" />
//                                   <span>{sub.label}</span>
//                                 </a>
//                               ) : (
//                                 <>
//                                   <button
//                                     onClick={() => toggleMobileSubmenu(sub.label)}
//                                     className="w-full flex justify-between items-center px-8 py-2 hover:bg-white/10 transition-colors font-normal text-sm"
//                                   >
//                                     <div className="flex items-center gap-2">
//                                       <sub.icon className="w-4 h-4" />
//                                       <span>{sub.label}</span>
//                                     </div>
//                                     <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileSubmenuOpen[sub.label] ? "rotate-180" : ""}`} />
//                                   </button>
//                                   {mobileSubmenuOpen[sub.label] && (
//                                     <ul className="bg-primary border-t border-blue-600">
//                                       {sub.subDropdown.map((dest, j) => {
//                                         const isAndaman = dest === "Andaman";
//                                         return (
//                                           <li key={j}>
//                                             <a
//                                               href={isAndaman ? "/tours-packages" : "#"}
//                                               className={`block px-12 py-2 text-sm font-medium ${isAndaman ? "text-cyan-400 font-bold" : "text-gray-300"} hover:text-white`}
//                                             >
//                                               {dest} {isAndaman && "(Featured)"}
//                                             </a>
//                                           </li>
//                                         );
//                                       })}
//                                     </ul>
//                                   )}
//                                 </>
//                               )}
//                             </li>
//                           ))}
//                         </ul>
//                       )}
//                     </>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;






// import {
//   Ship, Compass, Phone, UserCircle, Home as HomeIcon, ChevronDown, Sparkles, Heart,
//   GraduationCap, Car, Bus, Landmark, Umbrella, CalendarDays, Users, Shield, Star,
//   UsersRound, Globe, MapPin, ChevronRight, PlaneTakeoff, UserPlus, Menu as MenuIcon,
//   X as XIcon, ChevronLeft
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import logo from "../assets/png[3].png";
// import { useState, useRef } from "react";

// const indianStates = [
//   "Andaman", "Andhra Pradesh", "Bihar", "Chhattisgarh", "Dadra & Nagar Haveli", "Daman & Diu",
//   "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir",
//   "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Leh Ladakh", "Lakshadweep", "Madhya Pradesh",
//   "Maharashtra", "North East", "Odisha", "Puducherry", "Punjab", "Rajasthan",
//   "Seven Sisters", "Tamil Nadu", "Uttar Pradesh", "Uttarakhand", "West Bengal",
// ].sort();

// const internationalDestinations = [
//   "Africa", "America", "Australia NewZealand", "Bhutan", "Dubai and MiddleEast",
//   "Eurasia", "Europe", "Japan China", "Mauritius", "Nepal", "Seychelles",
//   "South East Asia", "SriLanka Maldives",
// ];

// const Header = () => {
//   const [showIndianIndividualStates, setShowIndianIndividualStates] = useState(false);
//   const [showIndianGroupStates, setShowIndianGroupStates] = useState(false);
//   const [showIntlIndividualStates, setShowIntlIndividualStates] = useState(false);
//   const [showIntlGroupStates, setShowIntlGroupStates] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState({});
  
//   // Timers for delayed close (prevents flicker when moving between main item and sub-dropdown)
//   const indianIndividualTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const indianGroupTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const intlIndividualTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const intlGroupTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

//   const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);
//   const toggleMobileSubmenu = (label: string) => {
//     setMobileSubmenuOpen(prev => ({ ...prev, [label]: !prev[label] }));
//   };

//   // Helper to create delayed hover handlers
//   const createHoverHandlers = (
//     setter: React.Dispatch<React.SetStateAction<boolean>>,
//     timerRef: React.MutableRefObject<ReturnType<typeof setTimeout> | null>
//   ) => {
//     const enter = () => {
//       if (timerRef.current) {
//         clearTimeout(timerRef.current);
//         timerRef.current = null;
//       }
//       setter(true);
//     };
//     const leave = () => {
//       timerRef.current = setTimeout(() => {
//         setter(false);
//         timerRef.current = null;
//       }, 300); // 300ms delay – enough for normal mouse movement across the gap
//     };
//     return { enter, leave };
//   };

//   const navItems = [
//     { icon: HomeIcon, label: "Home", href: "/" },
//     {
//       icon: MapPin, label: "Indian Tours",
//       dropdown: [
//         { label: "Individual Tours", href: "#indian-individual", icon: Users, subDropdown: indianStates },
//         { label: "Group Tours", href: "#indian-group", icon: UsersRound, subDropdown: indianStates },
//         { label: "Ladies Special Tours", href: "#indian-ladies", icon: Sparkles },
//         { label: "Senior Citizen Tours", href: "#indian-senior", icon: Heart },
//         { label: "Students Tours", href: "#indian-students", icon: GraduationCap },
//         { label: "Honeymoon Tours", href: "#indian-honeymoon", icon: Heart },
//       ],
//     },
//     {
//       icon: Globe, label: "International Tours",
//       dropdown: [
//         { label: "Individual Tours", href: "#intl-individual", icon: Users, subDropdown: internationalDestinations },
//         { label: "Group Tours", href: "#intl-group", icon: UsersRound, subDropdown: internationalDestinations },
//         { label: "Ladies Special Tours", href: "#intl-ladies", icon: Sparkles },
//         { label: "Senior Citizen Tours", href: "#intl-senior", icon: Heart },
//         { label: "Students Tours", href: "#intl-students", icon: GraduationCap },
//         { label: "Honeymoon Tours", href: "#intl-honeymoon", icon: Heart },
//       ],
//     },
//     { icon: PlaneTakeoff, label: "Offline Flight Tickets", href: "#offline-flight-tickets" },
//     { icon: Ship, label: "Exhibitions", href: "#exhibitions" },
//     { icon: Compass, label: "MICE", href: "#mice" },
//     { icon: PlaneTakeoff, label: "Visa", href: "#visa" },
//     {
//       icon: Star, label: "Others",
//       dropdown: [
//         { label: "Bungalow / Villa", href: "#bungalow-villa", icon: HomeIcon },
//         { label: "Bus", href: "#bus", icon: Bus },
//         { label: "Car", href: "#car", icon: Car },
//         { label: "Cruise", href: "#cruise", icon: Ship },
//         { label: "Festivals", href: "#festivals", icon: Sparkles },
//         { label: "Insurances", href: "#insurances", icon: Umbrella },
//         { label: "Passport", href: "#passport", icon: Landmark },
//         { label: "Sports", href: "#sports", icon: Shield },
//         { label: "Weekend Gateways", href: "#weekend-gateways", icon: CalendarDays },
//       ],
//     },
//     { icon: UsersRound, label: "About Us", href: "#about" },
//     { icon: Phone, label: "Contact Us", href: "#contact" },
//   ];

//   return (
//     <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-xl border-b-2 border-blue-400 w-full">
//       <div className="w-full px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between py-3">
//           {/* LOGO */}
//           <div className="flex items-center">
//             <div className="relative group cursor-pointer">
//               <div className="absolute -inset-3 bg-white/10 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               <img
//                 src={logo}
//                 alt="SK Tours Logo"
//                 className="h-12 sm:h-14 w-auto object-contain relative z-10 transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
//               />
//             </div>
//           </div>

//           {/* Mobile Toggle */}
//           <button
//             onClick={toggleMobileMenu}
//             className="lg:hidden text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
//           >
//             {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
//           </button>

//           {/* DESKTOP NAV */}
//           <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
//             {navItems.map((item, index) => (
//               <div key={index} className="relative group">
//                 {!item.dropdown ? (
//                   <a
//                     href={item.href}
//                     className="flex flex-col items-center px-3 sm:px-4 py-3 transition-all duration-300 hover:bg-white/15 rounded-lg min-w-[80px] sm:min-w-[90px]"
//                   >
//                     <item.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
//                     <span className="text-sm font-medium">{item.label}</span>
//                   </a>
//                 ) : (
//                   <div className="relative">
//                     <div className="flex flex-col items-center px-3 sm:px-4 py-3 transition-all duration-300 hover:bg-white/15 rounded-lg min-w-[100px] sm:min-w-[110px] cursor-pointer">
//                       <item.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
//                       <div className="flex items-center gap-1">
//                         <span className="text-sm font-medium">{item.label}</span>
//                         <ChevronDown className="w-3 h-3" />
//                       </div>
//                     </div>
//                     {/* MEGA DROPDOWN */}
//                     <div className="absolute left-1/2 -translate-x-1/2 top-full opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-red-50 text-gray-800 rounded-xl shadow-2xl w-44 sm:w-52 py-4 border border-gray-200 transition-all duration-300 ease-in-out z-50">
//                       {item.dropdown.map((sub, idx) => {
//                         const isIndian = item.label === "Indian Tours";
//                         const isIntl = item.label === "International Tours";
//                         const isIndividual = sub.label === "Individual Tours";
//                         const isGroup = sub.label === "Group Tours";
//                         let showThisStates = false;
//                         let enterHandler = null;
//                         let leaveHandler = null;
//                         let enterStatesHandler = null;
//                         let leaveStatesHandler = null;
//                         let topOffset = "top-0";

//                         if (isIndian && isIndividual) {
//                           showThisStates = showIndianIndividualStates;
//                           const h = createHoverHandlers(setShowIndianIndividualStates, indianIndividualTimer);
//                           enterHandler = h.enter;
//                           leaveHandler = h.leave;
//                           enterStatesHandler = h.enter;
//                           leaveStatesHandler = h.leave;
//                           topOffset = "top-[-1rem]";
//                         } else if (isIndian && isGroup) {
//                           showThisStates = showIndianGroupStates;
//                           const h = createHoverHandlers(setShowIndianGroupStates, indianGroupTimer);
//                           enterHandler = h.enter;
//                           leaveHandler = h.leave;
//                           enterStatesHandler = h.enter;
//                           leaveStatesHandler = h.leave;
//                           topOffset = "top-[-4rem]";
//                         } else if (isIntl && isIndividual) {
//                           showThisStates = showIntlIndividualStates;
//                           const h = createHoverHandlers(setShowIntlIndividualStates, intlIndividualTimer);
//                           enterHandler = h.enter;
//                           leaveHandler = h.leave;
//                           enterStatesHandler = h.enter;
//                           leaveStatesHandler = h.leave;
//                           topOffset = "top-[-1rem]";
//                         } else if (isIntl && isGroup) {
//                           showThisStates = showIntlGroupStates;
//                           const h = createHoverHandlers(setShowIntlGroupStates, intlGroupTimer);
//                           enterHandler = h.enter;
//                           leaveHandler = h.leave;
//                           enterStatesHandler = h.enter;
//                           leaveStatesHandler = h.leave;
//                           topOffset = "top-[-4rem]";
//                         }

//                         return (
//                           <div key={idx} className="relative">
//                             <div
//                               className={`flex items-center px-2 sm:px-3 py-3.5 text-sm hover:bg-red-100 border-l-2 border-transparent hover:border-red-500 mx-1 sm:mx-2 rounded-lg block cursor-pointer transition-colors ${sub.subDropdown ? "pr-2" : ""}`}
//                               onMouseEnter={enterHandler ?? undefined}
//                               onMouseLeave={leaveHandler ?? undefined}
//                             >
//                               <a href={sub.href} className="flex items-center w-full">
//                                 <span className="font-medium flex-grow">{sub.label}</span>
//                                 {sub.subDropdown && <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0" />}
//                               </a>
//                             </div>
//                             {/* STATES / DESTINATIONS SUB-DROPDOWN */}
//                             {sub.subDropdown && showThisStates && (
//                               <div
//                                 className={`absolute left-full ${topOffset} ml-3 bg-white text-gray-800 rounded-xl shadow-2xl w-[400px] sm:w-[450px] py-4 border border-gray-200 opacity-100 visible transition-all duration-300 ease-in-out z-[60] max-h-[70vh] overflow-y-auto`}
//                                 onMouseEnter={enterStatesHandler ?? undefined}
//                                 onMouseLeave={leaveStatesHandler ?? undefined}
//                               >
//                                 <table className="min-w-full divide-y divide-gray-200">
//                                   <tbody className="bg-white divide-y divide-gray-200">
//                                     {sub.subDropdown.reduce((rows: any[], dest, index) => {
//                                       if (index % 3 === 0) rows.push([]);
//                                       rows[rows.length - 1].push(dest);
//                                       return rows;
//                                     }, []).map((row, rowIndex) => (
//                                       <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-blue-50" : "bg-blue-100"}>
//                                         {row.map((dest: string, colIndex: number) => {
//                                           const isAndaman = dest === "Andaman";
//                                           const href = isAndaman
//                                             ? "/tours-packages"
//                                             : `#${item.label.toLowerCase().replace(/\s/g, "-")}-state-${dest.toLowerCase().replace(/\s+/g, "-")}`;
//                                           return (
//                                             <td key={colIndex} className="w-1/3 px-2 py-2.5 whitespace-nowrap border-r border-gray-400">
//                                               <a
//                                                 href={href}
//                                                 className={`block w-full text-sm font-medium text-left transition-colors ${isAndaman
//                                                   ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-lg"
//                                                   : `hover:text-blue-600 ${rowIndex % 2 === 0 ? 'hover:bg-blue-100' : 'hover:bg-blue-200'}`
//                                                 }`}
//                                                 title={dest}
//                                               >
//                                                 {dest}
//                                                 {isAndaman && <Sparkles className="inline-block w-4 h-4 ml-1 animate-pulse" />}
//                                               </a>
//                                             </td>
//                                           );
//                                         })}
//                                         {row.length < 3 && [...Array(3 - row.length)].map((_, colIndex) => (
//                                           <td key={colIndex} className={`w-1/3 px-2 py-2.5 border-r border-gray-400 ${rowIndex % 2 === 0 ? "bg-blue-50" : "bg-blue-100"}`}></td>
//                                         ))}
//                                       </tr>
//                                     ))}
//                                   </tbody>
//                                 </table>
//                               </div>
//                             )}
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </nav>

//           {/* Desktop Login/Signup - Vertical Layout */}
//           <div className="hidden lg:flex flex-col items-end gap-2 ml-auto">
//             {/* Sign Up */}
//             <div className="relative group">
//               <Button 
//                 variant="ghost" 
//                 size="sm" 
//                 className="bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-lg border border-green-600 flex items-center gap-2 w-[120px] justify-center"
//               >
//                 <UserPlus className="w-4 h-4" />
//                 <span className="font-medium text-sm">Sign Up</span>
//                 <ChevronDown className="w-3 h-3" />
//               </Button>
//               <div className="absolute right-full top-0 mr-2 opacity-0 -translate-x-4 invisible group-hover:opacity-100 group-hover:translate-x-0 group-hover:visible bg-green-50 text-gray-800 rounded-xl shadow-2xl py-2 border border-green-200 transition-all duration-300 z-50 min-w-[140px]">
//                 <a href="#new-user" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-green-100 hover:text-green-700 rounded-lg transition-colors">
//                   <UserPlus className="w-4 h-4 text-green-600" /> New User
//                 </a>
//                 <a href="#new-agent" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-green-100 hover:text-green-700 rounded-lg transition-colors">
//                   <Users className="w-4 h-4 text-green-600" /> New Agent
//                 </a>
//               </div>
//             </div>

//             {/* Login */}
//             <div className="relative group">
//               <Button 
//                 variant="ghost" 
//                 size="sm" 
//                 className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-lg border border-red-600 flex items-center gap-2 w-[120px] justify-center"
//               >
//                 <UserCircle className="w-4 h-4" />
//                 <span className="font-medium text-sm">Login</span>
//                 <ChevronDown className="w-3 h-3" />
//               </Button>
//               <div className="absolute right-full top-0 mr-2 opacity-0 -translate-x-4 invisible group-hover:opacity-100 group-hover:translate-x-0 group-hover:visible bg-red-50 text-gray-800 rounded-xl shadow-2xl py-2 border border-red-200 transition-all duration-300 z-50 min-w-[140px]">
//                 <a href="#user-login" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-red-100 hover:text-red-700 rounded-lg transition-colors">
//                   <UserCircle className="w-4 h-4 text-red-600" /> User Login
//                 </a>
//                 <a href="#agent-login" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-red-100 hover:text-red-700 rounded-lg transition-colors">
//                   <Users className="w-4 h-4 text-red-600" /> Agent Login
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* MOBILE MENU */}
//         {mobileMenuOpen && (
//           <nav className="lg:hidden bg-primary text-primary-foreground border-t border-blue-400">
//             <ul className="flex flex-col">
//               {navItems.map((item, index) => (
//                 <li key={index} className="border-b border-blue-500">
//                   {!item.dropdown ? (
//                     <a href={item.href} className="flex gap-2 items-center px-4 py-3 hover:bg-white/10 transition-colors">
//                       <item.icon className="w-5 h-5" />
//                       <span className="font-medium text-sm">{item.label}</span>
//                     </a>
//                   ) : (
//                     <>
//                       <button
//                         onClick={() => toggleMobileSubmenu(item.label)}
//                         className="w-full flex justify-between items-center px-4 py-3 hover:bg-white/10 transition-colors font-medium text-sm"
//                       >
//                         <div className="flex items-center gap-2">
//                           <item.icon className="w-5 h-5" />
//                           <span>{item.label}</span>
//                         </div>
//                         <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileSubmenuOpen[item.label] ? "rotate-180" : ""}`} />
//                       </button>
//                       {mobileSubmenuOpen[item.label] && (
//                         <ul className="bg-primary border-t border-blue-500">
//                           {item.dropdown.map((sub, i) => (
//                             <li key={i} className="border-b border-blue-600">
//                               {!sub.subDropdown ? (
//                                 <a href={sub.href} className="flex items-center gap-2 px-8 py-2 hover:bg-white/10 transition-colors font-normal text-sm">
//                                   <sub.icon className="w-4 h-4" />
//                                   <span>{sub.label}</span>
//                                 </a>
//                               ) : (
//                                 <>
//                                   <button
//                                     onClick={() => toggleMobileSubmenu(sub.label)}
//                                     className="w-full flex justify-between items-center px-8 py-2 hover:bg-white/10 transition-colors font-normal text-sm"
//                                   >
//                                     <div className="flex items-center gap-2">
//                                       <sub.icon className="w-4 h-4" />
//                                       <span>{sub.label}</span>
//                                     </div>
//                                     <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileSubmenuOpen[sub.label] ? "rotate-180" : ""}`} />
//                                   </button>
//                                   {mobileSubmenuOpen[sub.label] && (
//                                     <ul className="bg-primary border-t border-blue-600">
//                                       {sub.subDropdown.map((dest, j) => {
//                                         const isAndaman = dest === "Andaman";
//                                         return (
//                                           <li key={j}>
//                                             <a
//                                               href={isAndaman ? "/tours-packages" : "#"}
//                                               className={`block px-12 py-2 text-sm font-medium ${isAndaman ? "text-cyan-400 font-bold" : "text-gray-300"} hover:text-white`}
//                                             >
//                                               {dest} {isAndaman && "(Featured)"}
//                                             </a>
//                                           </li>
//                                         );
//                                       })}
//                                     </ul>
//                                   )}
//                                 </>
//                               )}
//                             </li>
//                           ))}
//                         </ul>
//                       )}
//                     </>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;




// import {
//   Ship, Compass, Phone, UserCircle, Home as HomeIcon, ChevronDown, Sparkles, Heart,
//   GraduationCap, Car, Bus, Landmark, Umbrella, CalendarDays, Users, Shield, Star,
//   UsersRound, Globe, MapPin, ChevronRight, PlaneTakeoff, UserPlus, Menu as MenuIcon,
//   X as XIcon, ChevronLeft
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import logo from "../assets/png[3].png"; // Fixed the filename
// import { useState, useRef } from "react";

// const indianStates = [
//   "Andaman", "Andhra Pradesh", "Bihar", "Chhattisgarh", "Dadra & Nagar Haveli", "Daman & Diu",
//   "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir",
//   "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Leh Ladakh", "Lakshadweep", "Madhya Pradesh",
//   "Maharashtra", "North East", "Odisha", "Puducherry", "Punjab", "Rajasthan",
//   "Seven Sisters", "Tamil Nadu", "Uttar Pradesh", "Uttarakhand", "West Bengal",
// ].sort();

// const internationalDestinations = [
//   "Africa", "America", "Australia NewZealand", "Bhutan", "Dubai and MiddleEast",
//   "Eurasia", "Europe", "Japan China", "Mauritius", "Nepal", "Seychelles",
//   "South East Asia", "SriLanka Maldives",
// ];

// const Header = () => {
//   const [showIndianIndividualStates, setShowIndianIndividualStates] = useState(false);
//   const [showIndianGroupStates, setShowIndianGroupStates] = useState(false);
//   const [showIntlIndividualStates, setShowIntlIndividualStates] = useState(false);
//   const [showIntlGroupStates, setShowIntlGroupStates] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<Record<string, boolean>>({});
  
//   // Timers for delayed close (prevents flicker when moving between main item and sub-dropdown)
//   const indianIndividualTimer = useRef<NodeJS.Timeout | null>(null);
//   const indianGroupTimer = useRef<NodeJS.Timeout | null>(null);
//   const intlIndividualTimer = useRef<NodeJS.Timeout | null>(null);
//   const intlGroupTimer = useRef<NodeJS.Timeout | null>(null);

//   const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);
//   const toggleMobileSubmenu = (label: string) => {
//     setMobileSubmenuOpen(prev => ({ ...prev, [label]: !prev[label] }));
//   };

//   // Helper to create delayed hover handlers
//   const createHoverHandlers = (
//     setter: React.Dispatch<React.SetStateAction<boolean>>,
//     timerRef: React.MutableRefObject<NodeJS.Timeout | null>
//   ) => {
//     const enter = () => {
//       if (timerRef.current) {
//         clearTimeout(timerRef.current);
//         timerRef.current = null;
//       }
//       setter(true);
//     };
//     const leave = () => {
//       timerRef.current = setTimeout(() => {
//         setter(false);
//         timerRef.current = null;
//       }, 300); // 300ms delay – enough for normal mouse movement across the gap
//     };
//     return { enter, leave };
//   };

//   const navItems = [
//     { icon: HomeIcon, label: "Home", href: "/" },
//     {
//       icon: MapPin, label: "Indian Tours",
//       dropdown: [
//         { label: "Individual Tours", href: "#indian-individual", icon: Users, subDropdown: indianStates },
//         { label: "Group Tours", href: "#indian-group", icon: UsersRound, subDropdown: indianStates },
//         { label: "Ladies Special Tours", href: "#indian-ladies", icon: Sparkles },
//         { label: "Senior Citizen Tours", href: "#indian-senior", icon: Heart },
//         { label: "Students Tours", href: "#indian-students", icon: GraduationCap },
//         { label: "Honeymoon Tours", href: "#indian-honeymoon", icon: Heart },
//       ],
//     },
//     {
//       icon: Globe, label: "International Tours",
//       dropdown: [
//         { label: "Individual Tours", href: "#intl-individual", icon: Users, subDropdown: internationalDestinations },
//         { label: "Group Tours", href: "#intl-group", icon: UsersRound, subDropdown: internationalDestinations },
//         { label: "Ladies Special Tours", href: "#intl-ladies", icon: Sparkles },
//         { label: "Senior Citizen Tours", href: "#intl-senior", icon: Heart },
//         { label: "Students Tours", href: "#intl-students", icon: GraduationCap },
//         { label: "Honeymoon Tours", href: "#intl-honeymoon", icon: Heart },
//       ],
//     },
//     { icon: PlaneTakeoff, label: "Offline Flight Tickets", href: "#offline-flight-tickets" },
//     { icon: Ship, label: "Exhibitions", href: "#exhibitions" },
//     { icon: Compass, label: "MICE", href: "#mice" },
//     { icon: PlaneTakeoff, label: "Visa", href: "#visa" },
//     {
//       icon: Star, label: "Others",
//       dropdown: [
//         { label: "Bungalow / Villa", href: "#bungalow-villa", icon: HomeIcon },
//         { label: "Bus", href: "#bus", icon: Bus },
//         { label: "Car", href: "#car", icon: Car },
//         { label: "Cruise", href: "#cruise", icon: Ship },
//         { label: "Festivals", href: "#festivals", icon: Sparkles },
//         { label: "Insurances", href: "#insurances", icon: Umbrella },
//         { label: "Passport", href: "#passport", icon: Landmark },
//         { label: "Sports", href: "#sports", icon: Shield },
//         { label: "Weekend Gateways", href: "#weekend-gateways", icon: CalendarDays },
//       ],
//     },
//     { icon: UsersRound, label: "About Us", href: "#about" },
//     { icon: Phone, label: "Contact Us", href: "#contact" },
//   ];

//   return (
//     <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-xl border-b-2 border-blue-400 w-full">
//       <div className="w-full px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between py-3">
//           {/* LOGO */}
//           <div className="flex items-center">
//             <div className="relative group cursor-pointer">
//               <div className="absolute -inset-3 bg-white/10 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               <img
//                 src={logo}
//                 alt="SK Tours Logo"
//                 className="h-12 sm:h-14 w-auto object-contain relative z-10 transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
//               />
//             </div>
//           </div>

//           {/* Mobile Toggle */}
//           <button
//             onClick={toggleMobileMenu}
//             className="lg:hidden text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
//           >
//             {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
//           </button>

//           {/* DESKTOP NAV */}
//           <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
//             {navItems.map((item, index) => (
//               <div key={index} className="relative group">
//                 {!item.dropdown ? (
//                   <a
//                     href={item.href}
//                     className="flex flex-col items-center px-3 sm:px-4 py-3 transition-all duration-300 hover:bg-white/15 rounded-lg min-w-[80px] sm:min-w-[90px]"
//                   >
//                     <item.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
//                     <span className="text-sm font-medium">{item.label}</span>
//                   </a>
//                 ) : (
//                   <div className="relative">
//                     <div className="flex flex-col items-center px-3 sm:px-4 py-3 transition-all duration-300 hover:bg-white/15 rounded-lg min-w-[100px] sm:min-w-[110px] cursor-pointer">
//                       <item.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
//                       <div className="flex items-center gap-1">
//                         <span className="text-sm font-medium">{item.label}</span>
//                         <ChevronDown className="w-3 h-3" />
//                       </div>
//                     </div>
//                     {/* MEGA DROPDOWN */}
//                     <div className="absolute left-1/2 -translate-x-1/2 top-full opacity-0 -translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible bg-red-50 text-gray-800 rounded-xl shadow-2xl w-44 sm:w-52 py-4 border border-gray-200 transition-all duration-300 ease-in-out z-50">
//                       {item.dropdown.map((sub, idx) => {
//                         const isIndian = item.label === "Indian Tours";
//                         const isIntl = item.label === "International Tours";
//                         const isIndividual = sub.label === "Individual Tours";
//                         const isGroup = sub.label === "Group Tours";
//                         let showThisStates = false;
//                         let enterHandler: (() => void) | null = null;
//                         let leaveHandler: (() => void) | null = null;
//                         let enterStatesHandler: (() => void) | null = null;
//                         let leaveStatesHandler: (() => void) | null = null;
//                         let topOffset = "top-0";

//                         if (isIndian && isIndividual) {
//                           showThisStates = showIndianIndividualStates;
//                           const h = createHoverHandlers(setShowIndianIndividualStates, indianIndividualTimer);
//                           enterHandler = h.enter;
//                           leaveHandler = h.leave;
//                           enterStatesHandler = h.enter;
//                           leaveStatesHandler = h.leave;
//                           topOffset = "top-[-1rem]";
//                         } else if (isIndian && isGroup) {
//                           showThisStates = showIndianGroupStates;
//                           const h = createHoverHandlers(setShowIndianGroupStates, indianGroupTimer);
//                           enterHandler = h.enter;
//                           leaveHandler = h.leave;
//                           enterStatesHandler = h.enter;
//                           leaveStatesHandler = h.leave;
//                           topOffset = "top-[-4rem]";
//                         } else if (isIntl && isIndividual) {
//                           showThisStates = showIntlIndividualStates;
//                           const h = createHoverHandlers(setShowIntlIndividualStates, intlIndividualTimer);
//                           enterHandler = h.enter;
//                           leaveHandler = h.leave;
//                           enterStatesHandler = h.enter;
//                           leaveStatesHandler = h.leave;
//                           topOffset = "top-[-1rem]";
//                         } else if (isIntl && isGroup) {
//                           showThisStates = showIntlGroupStates;
//                           const h = createHoverHandlers(setShowIntlGroupStates, intlGroupTimer);
//                           enterHandler = h.enter;
//                           leaveHandler = h.leave;
//                           enterStatesHandler = h.enter;
//                           leaveStatesHandler = h.leave;
//                           topOffset = "top-[-4rem]";
//                         }

//                         return (
//                           <div key={idx} className="relative">
//                             <div
//                               className={`flex items-center px-2 sm:px-3 py-3.5 text-sm hover:bg-red-100 border-l-2 border-transparent hover:border-red-500 mx-1 sm:mx-2 rounded-lg block cursor-pointer transition-colors ${sub.subDropdown ? "pr-2" : ""}`}
//                               onMouseEnter={enterHandler ?? undefined}
//                               onMouseLeave={leaveHandler ?? undefined}
//                             >
//                               <a href={sub.href} className="flex items-center w-full">
//                                 <span className="font-medium flex-grow">{sub.label}</span>
//                                 {sub.subDropdown && <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0" />}
//                               </a>
//                             </div>
//                             {/* STATES / DESTINATIONS SUB-DROPDOWN */}
//                             {sub.subDropdown && showThisStates && (
//                               <div
//                                 className={`absolute left-full ${topOffset} ml-3 bg-white text-gray-800 rounded-xl shadow-2xl w-[400px] sm:w-[450px] py-4 border border-gray-200 opacity-100 visible transition-all duration-300 ease-in-out z-[60] max-h-[70vh] overflow-y-auto`}
//                                 onMouseEnter={enterStatesHandler ?? undefined}
//                                 onMouseLeave={leaveStatesHandler ?? undefined}
//                               >
//                                 <table className="min-w-full divide-y divide-gray-200">
//                                   <tbody className="bg-white divide-y divide-gray-200">
//                                     {sub.subDropdown.reduce((rows: any[], dest, index) => {
//                                       if (index % 3 === 0) rows.push([]);
//                                       rows[rows.length - 1].push(dest);
//                                       return rows;
//                                     }, []).map((row, rowIndex) => (
//                                       <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-blue-50" : "bg-blue-100"}>
//                                         {row.map((dest: string, colIndex: number) => {
//                                           const isAndaman = dest === "Andaman";
//                                           const href = isAndaman
//                                             ? "/tours-packages"
//                                             : `#${item.label.toLowerCase().replace(/\s/g, "-")}-state-${dest.toLowerCase().replace(/\s+/g, "-")}`;
//                                           return (
//                                             <td key={colIndex} className="w-1/3 px-2 py-2.5 whitespace-nowrap border-r border-gray-400">
//                                               <a
//                                                 href={href}
//                                                 className={`block w-full text-sm font-medium text-left transition-colors ${isAndaman
//                                                   ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-lg"
//                                                   : `hover:text-blue-600 ${rowIndex % 2 === 0 ? 'hover:bg-blue-100' : 'hover:bg-blue-200'}`
//                                                 }`}
//                                                 title={dest}
//                                               >
//                                                 {dest}
//                                                 {isAndaman && <Sparkles className="inline-block w-4 h-4 ml-1 animate-pulse" />}
//                                               </a>
//                                             </td>
//                                           );
//                                         })}
//                                         {row.length < 3 && [...Array(3 - row.length)].map((_, colIndex) => (
//                                           <td key={colIndex} className={`w-1/3 px-2 py-2.5 border-r border-gray-400 ${rowIndex % 2 === 0 ? "bg-blue-50" : "bg-blue-100"}`}></td>
//                                         ))}
//                                       </tr>
//                                     ))}
//                                   </tbody>
//                                 </table>
//                               </div>
//                             )}
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </nav>

//           {/* Desktop Login/Signup - Vertical Layout */}
//           <div className="hidden lg:flex flex-col items-end gap-2 ml-auto">
//             {/* Sign Up */}
//             <div className="relative group">
//               <Button 
//                 variant="ghost" 
//                 size="sm" 
//                 className="bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-lg border border-green-600 flex items-center gap-2 w-[120px] justify-center"
//               >
//                 <UserPlus className="w-4 h-4" />
//                 <span className="font-medium text-sm">Sign Up</span>
//                 <ChevronDown className="w-3 h-3" />
//               </Button>
//               <div className="absolute right-full top-0 mr-2 opacity-0 -translate-x-4 invisible group-hover:opacity-100 group-hover:translate-x-0 group-hover:visible bg-green-50 text-gray-800 rounded-xl shadow-2xl py-2 border border-green-200 transition-all duration-300 z-50 min-w-[140px]">
//                 <a href="#new-user" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-green-100 hover:text-green-700 rounded-lg transition-colors">
//                   <UserPlus className="w-4 h-4 text-green-600" /> New User
//                 </a>
//                 <a href="#new-agent" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-green-100 hover:text-green-700 rounded-lg transition-colors">
//                   <Users className="w-4 h-4 text-green-600" /> New Agent
//                 </a>
//               </div>
//             </div>

//             {/* Login */}
//             <div className="relative group">
//               <Button 
//                 variant="ghost" 
//                 size="sm" 
//                 className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-lg border border-red-600 flex items-center gap-2 w-[120px] justify-center"
//               >
//                 <UserCircle className="w-4 h-4" />
//                 <span className="font-medium text-sm">Login</span>
//                 <ChevronDown className="w-3 h-3" />
//               </Button>
//               <div className="absolute right-full top-0 mr-2 opacity-0 -translate-x-4 invisible group-hover:opacity-100 group-hover:translate-x-0 group-hover:visible bg-red-50 text-gray-800 rounded-xl shadow-2xl py-2 border border-red-200 transition-all duration-300 z-50 min-w-[140px]">
//                 <a href="#user-login" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-red-100 hover:text-red-700 rounded-lg transition-colors">
//                   <UserCircle className="w-4 h-4 text-red-600" /> User Login
//                 </a>
//                 <a href="#agent-login" className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-red-100 hover:text-red-700 rounded-lg transition-colors">
//                   <Users className="w-4 h-4 text-red-600" /> Agent Login
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* MOBILE MENU */}
//         {mobileMenuOpen && (
//           <nav className="lg:hidden bg-primary text-primary-foreground border-t border-blue-400">
//             <ul className="flex flex-col">
//               {navItems.map((item, index) => (
//                 <li key={index} className="border-b border-blue-500">
//                   {!item.dropdown ? (
//                     <a href={item.href} className="flex gap-2 items-center px-4 py-3 hover:bg-white/10 transition-colors">
//                       <item.icon className="w-5 h-5" />
//                       <span className="font-medium text-sm">{item.label}</span>
//                     </a>
//                   ) : (
//                     <>
//                       <button
//                         onClick={() => toggleMobileSubmenu(item.label)}
//                         className="w-full flex justify-between items-center px-4 py-3 hover:bg-white/10 transition-colors font-medium text-sm"
//                       >
//                         <div className="flex items-center gap-2">
//                           <item.icon className="w-5 h-5" />
//                           <span>{item.label}</span>
//                         </div>
//                         <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileSubmenuOpen[item.label] ? "rotate-180" : ""}`} />
//                       </button>
//                       {mobileSubmenuOpen[item.label] && (
//                         <ul className="bg-primary border-t border-blue-500">
//                           {item.dropdown.map((sub, i) => (
//                             <li key={i} className="border-b border-blue-600">
//                               {!sub.subDropdown ? (
//                                 <a href={sub.href} className="flex items-center gap-2 px-8 py-2 hover:bg-white/10 transition-colors font-normal text-sm">
//                                   <sub.icon className="w-4 h-4" />
//                                   <span>{sub.label}</span>
//                                 </a>
//                               ) : (
//                                 <>
//                                   <button
//                                     onClick={() => toggleMobileSubmenu(sub.label)}
//                                     className="w-full flex justify-between items-center px-8 py-2 hover:bg-white/10 transition-colors font-normal text-sm"
//                                   >
//                                     <div className="flex items-center gap-2">
//                                       <sub.icon className="w-4 h-4" />
//                                       <span>{sub.label}</span>
//                                     </div>
//                                     <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileSubmenuOpen[sub.label] ? "rotate-180" : ""}`} />
//                                   </button>
//                                   {mobileSubmenuOpen[sub.label] && (
//                                     <ul className="bg-primary border-t border-blue-600">
//                                       {sub.subDropdown.map((dest, j) => {
//                                         const isAndaman = dest === "Andaman";
//                                         return (
//                                           <li key={j}>
//                                             <a
//                                               href={isAndaman ? "/tours-packages" : "#"}
//                                               className={`block px-12 py-2 text-sm font-medium ${isAndaman ? "text-cyan-400 font-bold" : "text-gray-300"} hover:text-white`}
//                                             >
//                                               {dest} {isAndaman && "(Featured)"}
//                                             </a>
//                                           </li>
//                                         );
//                                       })}
//                                     </ul>
//                                   )}
//                                 </>
//                               )}
//                             </li>
//                           ))}
//                         </ul>
//                       )}
//                     </>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;









import {
  Ship, Compass, Phone, UserCircle, Home as HomeIcon, ChevronDown, Sparkles, Heart,
  GraduationCap, Car, Bus, Landmark, Umbrella, CalendarDays, Users, Shield, Star,
  UsersRound, Globe, MapPin, ChevronRight, PlaneTakeoff, UserPlus, Menu as MenuIcon,
  X as XIcon, ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "../assets/png[3].png"; // Fixed the filename
import { useState, useRef } from "react";

const indianStates = [
  "Andaman", "Andhra Pradesh", "Bihar", "Chhattisgarh", "Dadra & Nagar Haveli", "Daman & Diu",
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir",
  "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Leh Ladakh", "Lakshadweep", "Madhya Pradesh",
  "Maharashtra", "North East", "Odisha", "Puducherry", "Punjab", "Rajasthan",
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
  const [showIntlIndividualStates, setShowIntlIndividualStates] = useState(false);
  const [showIntlGroupStates, setShowIntlGroupStates] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<Record<string, boolean>>({});
  
  // Timers for delayed close (prevents flicker when moving between main item and sub-dropdown)
  const indianIndividualTimer = useRef<NodeJS.Timeout | null>(null);
  const indianGroupTimer = useRef<NodeJS.Timeout | null>(null);
  const intlIndividualTimer = useRef<NodeJS.Timeout | null>(null);
  const intlGroupTimer = useRef<NodeJS.Timeout | null>(null);

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
      }, 300); // 300ms delay – enough for normal mouse movement across the gap
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
        { label: "Ladies Special Tours", href: "#indian-ladies", icon: Sparkles },
        { label: "Senior Citizen Tours", href: "#indian-senior", icon: Heart },
        { label: "Students Tours", href: "#indian-students", icon: GraduationCap },
        { label: "Honeymoon Tours", href: "#indian-honeymoon", icon: Heart },
      ],
    },
    {
      icon: Globe, label: "International Tours",
      dropdown: [
        { label: "Individual Tours", href: "#intl-individual", icon: Users, subDropdown: internationalDestinations },
        { label: "Group Tours", href: "#intl-group", icon: UsersRound, subDropdown: internationalDestinations },
        { label: "Ladies Special Tours", href: "#intl-ladies", icon: Sparkles },
        { label: "Senior Citizen Tours", href: "#intl-senior", icon: Heart },
        { label: "Students Tours", href: "#intl-students", icon: GraduationCap },
        { label: "Honeymoon Tours", href: "#intl-honeymoon", icon: Heart },
      ],
    },
    { icon: PlaneTakeoff, label: "Offline Flight Tickets", href: "#offline-flight-tickets" },
    { icon: Ship, label: "Exhibitions", href: "#exhibitions" },
    { icon: Compass, label: "MICE", href: "#mice" },
    { icon: PlaneTakeoff, label: "Visa", href: "#visa" },
    {
      icon: Star, label: "Others",
      dropdown: [
        { label: "Bungalow / Villa", href: "#bungalow-villa", icon: HomeIcon },
        { label: "Bus", href: "#bus", icon: Bus },
        { label: "Car", href: "#car", icon: Car },
        { label: "Cruise", href: "#cruise", icon: Ship },
        { label: "Festivals", href: "#festivals", icon: Sparkles },
        { label: "Insurances", href: "#insurances", icon: Umbrella },
        { label: "Passport", href: "#passport", icon: Landmark },
        { label: "Sports", href: "#sports", icon: Shield },
        { label: "Weekend Gateways", href: "/Weekendcard", icon: CalendarDays },
      ],
    },
    { icon: UsersRound, label: "About Us", href: "/about" }, // ✅ Fixed: Changed from "#about" to "/about"
    { icon: Phone, label: "Contact Us", href: "#contact" },
  ];

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
                        }

                        return (
                          <div key={idx} className="relative">
                            <div
                              className={`flex items-center px-2 sm:px-3 py-3.5 text-sm hover:bg-red-100 border-l-2 border-transparent hover:border-red-500 mx-1 sm:mx-2 rounded-lg block cursor-pointer transition-colors ${sub.subDropdown ? "pr-2" : ""}`}
                              onMouseEnter={enterHandler ?? undefined}
                              onMouseLeave={leaveHandler ?? undefined}
                            >
                              <a href={sub.href} className="flex items-center w-full">
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
                                          const href = isAndaman
                                            ? "/tours-packages"
                                            : `#${item.label.toLowerCase().replace(/\s/g, "-")}-state-${dest.toLowerCase().replace(/\s+/g, "-")}`;
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
                                  <sub.icon className="w-4 h-4" />
                                  <span>{sub.label}</span>
                                </a>
                              ) : (
                                <>
                                  <button
                                    onClick={() => toggleMobileSubmenu(sub.label)}
                                    className="w-full flex justify-between items-center px-8 py-2 hover:bg-white/10 transition-colors font-normal text-sm"
                                  >
                                    <div className="flex items-center gap-2">
                                      <sub.icon className="w-4 h-4" />
                                      <span>{sub.label}</span>
                                    </div>
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileSubmenuOpen[sub.label] ? "rotate-180" : ""}`} />
                                  </button>
                                  {mobileSubmenuOpen[sub.label] && (
                                    <ul className="bg-primary border-t border-blue-600">
                                      {sub.subDropdown.map((dest, j) => {
                                        const isAndaman = dest === "Andaman";
                                        return (
                                          <li key={j}>
                                            <a
                                              href={isAndaman ? "/tours-packages" : "#"}
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