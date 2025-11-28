// import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

// const Footer = () => {
//   const quickLinks = [
//     { label: "Tours", href: "#tours" },
//     { label: "Cruises", href: "#cruises" },
//     { label: "MICE", href: "#mice" },
//     { label: "Flights", href: "#flights" },
//     { label: "Hotels", href: "#hotels" },
//     { label: "Visa Services", href: "#visa" },
//   ];

//   const company = [
//     { label: "About Us", href: "#about" },
//     { label: "Contact Us", href: "#contact" },
//     { label: "Careers", href: "#careers" },
//     { label: "Terms & Conditions", href: "#terms" },
//     { label: "Privacy Policy", href: "#privacy" },
//   ];

//   return (
//     <footer className="bg-primary text-primary-foreground pt-12 pb-6">
//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
//           {/* Logo & About */}
//           <div>
//             <div className="flex items-center mb-4">
//               <div className="bg-background rounded-full px-4 py-2 flex items-center">
//                 <span className="text-2xl font-bold text-brand-red">SK</span>
//                 <span className="text-2xl font-bold text-primary">tours</span>
//                 <span className="w-3 h-3 bg-brand-red rounded-full ml-1"></span>
//               </div>
//             </div>
//             <p className="text-primary-foreground/80 text-sm leading-relaxed">
//               Your trusted travel partner for creating unforgettable experiences across the globe.
//             </p>
//             <div className="flex gap-3 mt-4">
//               <a href="#" className="bg-background/10 hover:bg-brand-red p-2 rounded-full transition-colors">
//                 <Facebook className="w-4 h-4" />
//               </a>
//               <a href="#" className="bg-background/10 hover:bg-brand-red p-2 rounded-full transition-colors">
//                 <Twitter className="w-4 h-4" />
//               </a>
//               <a href="#" className="bg-background/10 hover:bg-brand-red p-2 rounded-full transition-colors">
//                 <Instagram className="w-4 h-4" />
//               </a>
//               <a href="#" className="bg-background/10 hover:bg-brand-red p-2 rounded-full transition-colors">
//                 <Linkedin className="w-4 h-4" />
//               </a>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-lg font-bold mb-4">Quick Links</h3>
//             <ul className="space-y-2">
//               {quickLinks.map((link, index) => (
//                 <li key={index}>
//                   <a href={link.href} className="text-primary-foreground/80 hover:text-brand-red transition-colors text-sm">
//                     {link.label}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Company */}
//           <div>
//             <h3 className="text-lg font-bold mb-4">Company</h3>
//             <ul className="space-y-2">
//               {company.map((link, index) => (
//                 <li key={index}>
//                   <a href={link.href} className="text-primary-foreground/80 hover:text-brand-red transition-colors text-sm">
//                     {link.label}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div>
//             <h3 className="text-lg font-bold mb-4">Contact Us</h3>
//             <ul className="space-y-3">
//               <li className="flex items-start gap-2 text-sm text-primary-foreground/80">
//                 <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
//                 <span>123 Travel Street, Mumbai, Maharashtra, India</span>
//               </li>
//               <li className="flex items-center gap-2 text-sm text-primary-foreground/80">
//                 <Phone className="w-4 h-4 flex-shrink-0" />
//                 <span>+91 XXX XXX XXXX</span>
//               </li>
//               <li className="flex items-center gap-2 text-sm text-primary-foreground/80">
//                 <Mail className="w-4 h-4 flex-shrink-0" />
//                 <span>info@sktours.com</span>
//               </li>
//             </ul>
//           </div>
//         </div>

//         <div className="border-t border-primary-foreground/20 pt-6 text-center">
//           <p className="text-sm text-primary-foreground/70">
//             &copy; {new Date().getFullYear()} SK Tours. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;




// import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
// import img from "../assets/png[3].png"

// const Footer = () => {
//   const quickLinks = [
//     { label: "Tours", href: "#tours" },
//     { label: "Cruises", href: "#cruises" },
//     { label: "MICE", href: "#mice" },
//     { label: "Flights", href: "#flights" },
//     { label: "Hotels", href: "#hotels" },
//     { label: "Visa Services", href: "#visa" },
//   ];

//   const company = [
//     { label: "About Us", href: "#about" },
//     { label: "Contact Us", href: "#contact" },
//     { label: "Careers", href: "#careers" },
//     { label: "Terms & Conditions", href: "#terms" },
//     { label: "Privacy Policy", href: "#privacy" },
//   ];

//   return (
//     <footer className="bg-gradient-to-r from-[#0F1F5C] via-[#1F3F93] to-[#0F1F5C] text-white pt-12 pb-6">
//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
//           {/* Logo & About */}
//           <div>
//             <div className="flex items-center mb-4">
//               {/* Replace the div below with your actual logo */}
//               <div className="rounded-lg p-2 flex items-center justify-center">
//                 <img 
//                   src={img}
//                   alt="SK Tours Logo" 
//                   className="h-16 w-auto"
//                   onError={(e) => {
//                     // Fallback if logo doesn't exist
//                     e.target.style.display = 'none';
//                     e.target.nextSibling.style.display = 'flex';
//                   }}
//                 />
//                 {/* Fallback logo text */}
//                 <div className="hidden bg-white rounded-full px-4 py-2 flex items-center">
//                   <span className="text-2xl font-bold text-[#E31B23]">SK</span>
//                   <span className="text-2xl font-bold text-[#0F1F5C]">tours</span>
//                   <span className="w-3 h-3 bg-[#E31B23] rounded-full ml-1"></span>
//                 </div>
//               </div>
//             </div>
//             <p className="text-white/80 text-sm leading-relaxed">
//               Your trusted travel partner for creating unforgettable experiences across the globe.
//             </p>
//             <div className="flex gap-3 mt-4">
//               <a href="#" className="bg-white/10 hover:bg-[#E31B23] p-2 rounded-full transition-all duration-300 hover:scale-110">
//                 <Facebook className="w-4 h-4" />
//               </a>
//               <a href="#" className="bg-white/10 hover:bg-[#E31B23] p-2 rounded-full transition-all duration-300 hover:scale-110">
//                 <Twitter className="w-4 h-4" />
//               </a>
//               <a href="#" className="bg-white/10 hover:bg-[#E31B23] p-2 rounded-full transition-all duration-300 hover:scale-110">
//                 <Instagram className="w-4 h-4" />
//               </a>
//               <a href="#" className="bg-white/10 hover:bg-[#E31B23] p-2 rounded-full transition-all duration-300 hover:scale-110">
//                 <Linkedin className="w-4 h-4" />
//               </a>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-lg font-bold mb-4">Quick Links</h3>
//             <ul className="space-y-2">
//               {quickLinks.map((link, index) => (
//                 <li key={index}>
//                   <a href={link.href} className="text-white/80 hover:text-[#E31B23] transition-all duration-300 hover:translate-x-1 text-sm flex items-center">
//                     {link.label}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Company */}
//           <div>
//             <h3 className="text-lg font-bold mb-4">Company</h3>
//             <ul className="space-y-2">
//               {company.map((link, index) => (
//                 <li key={index}>
//                   <a href={link.href} className="text-white/80 hover:text-[#E31B23] transition-all duration-300 hover:translate-x-1 text-sm flex items-center">
//                     {link.label}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div>
//             <h3 className="text-lg font-bold mb-4">Contact Us</h3>
//             <ul className="space-y-3">
//               <li className="flex items-start gap-2 text-sm text-white/80 hover:text-white transition-colors duration-300">
//                 <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
//                 <span>123 Travel Street, Mumbai, Maharashtra, India</span>
//               </li>
//               <li className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors duration-300">
//                 <Phone className="w-4 h-4 flex-shrink-0" />
//                 <span>+91 9820870771</span>
//               </li>
//               <li className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors duration-300">
//                 <Mail className="w-4 h-4 flex-shrink-0" />
//                 <span>salil@sktt.in</span>
//               </li>
//             </ul>
//           </div>
//         </div>

//         <div className="border-t border-white/20 pt-6 text-center">
//           <p className="text-sm text-white/70">
//             &copy; {new Date().getFullYear()} SK Tours. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;




// import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
// import img from "../assets/png[3].png"

// const Footer = () => {
//   const quickLinks = [
//     { label: "Tours", href: "#tours" },
//     { label: "Cruises", href: "#cruises" },
//     { label: "MICE", href: "#mice" },
//     { label: "Flights", href: "#flights" },
//     { label: "Hotels", href: "#hotels" },
//     { label: "Visa Services", href: "#visa" },
//   ];

//   const company = [
//     { label: "About Us", href: "#about" },
//     { label: "Contact Us", href: "#contact" },
//     { label: "Careers", href: "#careers" },
//     { label: "Terms & Conditions", href: "#terms" },
//     { label: "Privacy Policy", href: "#privacy" },
//   ];

//   return (
//     <footer className="bg-gradient-to-r from-[#0F1F5C] via-[#1F3F93] to-[#0F1F5C] text-white pt-12 pb-6">
//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
//           {/* Logo & About */}
//           <div>
//             <div className="flex items-center mb-4">
//               <div className="rounded-lg p-2 flex items-center justify-center">
//                 <img 
//                   src={img}
//                   alt="SK Tours Logo" 
//                   className="h-16 w-auto"
//                   onError={(e) => {
//                     // Fallback if logo doesn't exist
//                     e.target.style.display = 'none';
//                     e.target.nextSibling.style.display = 'flex';
//                   }}
//                 />
//                 {/* Fallback logo text */}
//                 <div className="hidden bg-white rounded-full px-4 py-2 flex items-center">
//                   <span className="text-2xl font-bold text-[#E31B23]">SK</span>
//                   <span className="text-2xl font-bold text-[#0F1F5C]">tours</span>
//                   <span className="w-3 h-3 bg-[#E31B23] rounded-full ml-1"></span>
//                 </div>
//               </div>
//             </div>
//             <p className="text-white/80 text-sm leading-relaxed">
//               Your trusted travel partner for creating unforgettable experiences across the globe.
//             </p>
//             <div className="flex gap-3 mt-4">
//               <a href="#" className="bg-white/10 hover:bg-[#E31B23] p-2 rounded-full transition-all duration-300 hover:scale-110">
//                 <Facebook className="w-4 h-4" />
//               </a>
//               <a href="#" className="bg-white/10 hover:bg-[#E31B23] p-2 rounded-full transition-all duration-300 hover:scale-110">
//                 <Twitter className="w-4 h-4" />
//               </a>
//               <a href="#" className="bg-white/10 hover:bg-[#E31B23] p-2 rounded-full transition-all duration-300 hover:scale-110">
//                 <Instagram className="w-4 h-4" />
//               </a>
//               <a href="#" className="bg-white/10 hover:bg-[#E31B23] p-2 rounded-full transition-all duration-300 hover:scale-110">
//                 <Linkedin className="w-4 h-4" />
//               </a>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-lg font-bold mb-4">Quick Links</h3>
//             <ul className="space-y-2">
//               {quickLinks.map((link, index) => (
//                 <li key={index}>
//                   <a href={link.href} className="text-white/80 hover:text-[#E31B23] transition-all duration-300 hover:translate-x-1 text-sm flex items-center">
//                     {link.label}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Company */}
//           <div>
//             <h3 className="text-lg font-bold mb-4">Company</h3>
//             <ul className="space-y-2">
//               {company.map((link, index) => (
//                 <li key={index}>
//                   <a href={link.href} className="text-white/80 hover:text-[#E31B23] transition-all duration-300 hover:translate-x-1 text-sm flex items-center">
//                     {link.label}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div>
//             <h3 className="text-lg font-bold mb-4">Contact Us</h3>
//             <ul className="space-y-3">
//               <li className="flex items-start gap-2 text-sm text-white/80 hover:text-white transition-colors duration-300">
//                 <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
//                 <span>123 Travel Street, Mumbai, Maharashtra, India</span>
//               </li>
//               <li className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors duration-300">
//                 <Phone className="w-4 h-4 flex-shrink-0" />
//                 <span>+91 9820870771</span>
//               </li>
//               <li className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors duration-300">
//                 <Mail className="w-4 h-4 flex-shrink-0" />
//                 <span>salil@sktt.in</span>
//               </li>
              
//               {/* Member of UTE */}
//               <li className="mt-4 pt-4 border-t border-white/20">
//                 <div className="flex items-center gap-3">
//                   {/* Replace with your UTE logo */}
//                   <div className="bg-white rounded p-1 flex items-center justify-center">
//                     <img 
//                       src="/assets/ute-logo.png" // Update this path to your UTE logo
//                       alt="UTE Logo" 
//                       className="h-8 w-auto"
//                       onError={(e) => {
//                         // Fallback if UTE logo doesn't exist
//                         e.target.style.display = 'none';
//                         e.target.nextSibling.style.display = 'flex';
//                       }}
//                     />
//                     {/* Fallback UTE text */}
//                     <div className="hidden bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">
//                       UTE
//                     </div>
//                   </div>
//                   <div>
//                     <p className="text-sm font-semibold text-white">Member of</p>
//                     <p className="text-xs text-white/80">United Travel Enterprises</p>
//                   </div>
//                 </div>
//               </li>
//             </ul>
//           </div>
//         </div>

//         <div className="border-t border-white/20 pt-6 text-center">
//           <p className="text-sm text-white/70">
//             &copy; {new Date().getFullYear()} SK Tours. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;






// import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
// import img from "../assets/png[3].png"; // Fixed the filename

// const Footer = () => {
//   const quickLinks = [
//     { label: "Tours", href: "#tours" },
//     { label: "Cruises", href: "#cruises" },
//     { label: "MICE", href: "#mice" },
//     { label: "Flights", href: "#flights" },
//     { label: "Hotels", href: "#hotels" },
//     { label: "Visa Services", href: "#visa" },
//   ];

//   const company = [
//     { label: "About Us", href: "#about" },
//     { label: "Contact Us", href: "#contact" },
//     { label: "Careers", href: "#careers" },
//     { label: "Terms & Conditions", href: "#terms" },
//     { label: "Privacy Policy", href: "#privacy" },
//   ];

//   return (
//     <footer className="bg-gradient-to-r from-[#0F1F5C] via-[#1F3F93] to-[#0F1F5C] text-white pt-12 pb-6">
//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
//           {/* Logo & About */}
//           <div>
//             <div className="flex items-center mb-4">
//               <div className="rounded-lg p-2 flex items-center justify-center">
//                 <img 
//                   src={img}
//                   alt="SK Tours Logo" 
//                   className="h-16 w-auto"
//                   onError={(e) => {
//                     // Fallback if logo doesn't exist
//                     const target = e.target as HTMLImageElement;
//                     target.style.display = 'none';
//                     const fallback = target.nextElementSibling as HTMLElement;
//                     if (fallback) fallback.style.display = 'flex';
//                   }}
//                 />
//                 {/* Fallback logo text */}
//                 <div className="hidden bg-white rounded-full px-4 py-2 flex items-center">
//                   <span className="text-2xl font-bold text-[#E31B23]">SK</span>
//                   <span className="text-2xl font-bold text-[#0F1F5C]">tours</span>
//                   <span className="w-3 h-3 bg-[#E31B23] rounded-full ml-1"></span>
//                 </div>
//               </div>
//             </div>
//             <p className="text-white/80 text-sm leading-relaxed">
//               Your trusted travel partner for creating unforgettable experiences across the globe.
//             </p>
//             <div className="flex gap-3 mt-4">
//               <a href="#" className="bg-white/10 hover:bg-[#E31B23] p-2 rounded-full transition-all duration-300 hover:scale-110">
//                 <Facebook className="w-4 h-4" />
//               </a>
//               <a href="#" className="bg-white/10 hover:bg-[#E31B23] p-2 rounded-full transition-all duration-300 hover:scale-110">
//                 <Twitter className="w-4 h-4" />
//               </a>
//               <a href="#" className="bg-white/10 hover:bg-[#E31B23] p-2 rounded-full transition-all duration-300 hover:scale-110">
//                 <Instagram className="w-4 h-4" />
//               </a>
//               <a href="#" className="bg-white/10 hover:bg-[#E31B23] p-2 rounded-full transition-all duration-300 hover:scale-110">
//                 <Linkedin className="w-4 h-4" />
//               </a>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-lg font-bold mb-4">Quick Links</h3>
//             <ul className="space-y-2">
//               {quickLinks.map((link, index) => (
//                 <li key={index}>
//                   <a href={link.href} className="text-white/80 hover:text-[#E31B23] transition-all duration-300 hover:translate-x-1 text-sm flex items-center">
//                     {link.label}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Company */}
//           <div>
//             <h3 className="text-lg font-bold mb-4">Company</h3>
//             <ul className="space-y-2">
//               {company.map((link, index) => (
//                 <li key={index}>
//                   <a href={link.href} className="text-white/80 hover:text-[#E31B23] transition-all duration-300 hover:translate-x-1 text-sm flex items-center">
//                     {link.label}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div>
//             <h3 className="text-lg font-bold mb-4">Contact Us</h3>
//             <ul className="space-y-3">
//               <li className="flex items-start gap-2 text-sm text-white/80 hover:text-white transition-colors duration-300">
//                 <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
//                 <span>123 Travel Street, Mumbai, Maharashtra, India</span>
//               </li>
//               <li className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors duration-300">
//                 <Phone className="w-4 h-4 flex-shrink-0" />
//                 <span>+91 9820870771</span>
//               </li>
//               <li className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors duration-300">
//                 <Mail className="w-4 h-4 flex-shrink-0" />
//                 <span>salil@sktt.in</span>
//               </li>
              
//               {/* Member of UTE */}
//               <li className="mt-4 pt-4 border-t border-white/20">
//                 <h4 className="text-md font-bold mb-3 text-white">Member of</h4>
//                 <div className="flex items-center gap-3">
//                   {/* Replace with your UTE logo */}
//                   <div className="bg-white rounded p-1 flex items-center justify-center">
//                     <img 
//                       src="/assets/ute-logo.png" // Update this path to your UTE logo
//                       alt="UTE Logo" 
//                       className="h-8 w-auto"
//                       onError={(e) => {
//                         // Fallback if UTE logo doesn't exist
//                         const target = e.target as HTMLImageElement;
//                         target.style.display = 'none';
//                         const fallback = target.nextElementSibling as HTMLElement;
//                         if (fallback) fallback.style.display = 'flex';
//                       }}
//                     />
//                     {/* Fallback UTE text */}
//                     <div className="hidden bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">
//                       UTE
//                     </div>
//                   </div>
//                   <div>
//                     <p className="text-sm font-semibold text-white">United Travel Enterprises</p>
//                     <p className="text-xs text-white/80">Premium Travel Association</p>
//                   </div>
//                 </div>
//               </li>
//             </ul>
//           </div>
//         </div>

//         <div className="border-t border-white/20 pt-6 text-center">
//           <p className="text-sm text-white/70">
//             &copy; {new Date().getFullYear()} SK Tours. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;





// import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
// import img from "../assets/png[3].png"; // Fixed the filename

// const Footer = () => {
//   const quickLinks = [
//     { label: "Tours", href: "#tours" },
//     { label: "Cruises", href: "#cruises" },
//     { label: "MICE", href: "#mice" },
//     { label: "Flights", href: "#flights" },
//     { label: "Hotels", href: "#hotels" },
//     { label: "Visa Services", href: "#visa" },
//   ];

//   const company = [
//     { label: "About Us", href: "#about" },
//     { label: "Contact Us", href: "#contact" },
//     { label: "Careers", href: "#careers" },
//     { label: "Terms & Conditions", href: "#terms" },
//     { label: "Privacy Policy", href: "#privacy" },
//   ];

//   return (
//     <footer className="bg-gradient-to-r from-[#0F1F5C] via-[#1F3F93] to-[#0F1F5C] text-white pt-12 pb-6">
//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
//           {/* Logo & About */}
//           <div>
//             <div className="flex items-center mb-4">
//               <div className="rounded-lg p-2 flex items-center justify-center">
//                 <img 
//                   src={img}
//                   alt="SK Tours Logo" 
//                   className="h-16 w-auto"
//                   onError={(e) => {
//                     // Fallback if logo doesn't exist
//                     const target = e.target as HTMLImageElement;
//                     target.style.display = 'none';
//                     const fallback = target.nextElementSibling as HTMLElement;
//                     if (fallback) fallback.style.display = 'flex';
//                   }}
//                 />
//                 {/* Fallback logo text */}
//                 <div className="hidden bg-white rounded-full px-4 py-2 flex items-center">
//                   <span className="text-2xl font-bold text-[#E31B23]">SK</span>
//                   <span className="text-2xl font-bold text-[#0F1F5C]">tours</span>
//                   <span className="w-3 h-3 bg-[#E31B23] rounded-full ml-1"></span>
//                 </div>
//               </div>
//             </div>
//             <p className="text-white/80 text-sm leading-relaxed">
//               Your trusted travel partner for creating unforgettable experiences across the globe.
//             </p>
//             <div className="flex gap-3 mt-4">
//               <a href="#" className="bg-white/10 hover:bg-[#E31B23] p-2 rounded-full transition-all duration-300 hover:scale-110">
//                 <Facebook className="w-4 h-4" />
//               </a>
//               <a href="#" className="bg-white/10 hover:bg-[#E31B23] p-2 rounded-full transition-all duration-300 hover:scale-110">
//                 <Twitter className="w-4 h-4" />
//               </a>
//               <a href="#" className="bg-white/10 hover:bg-[#E31B23] p-2 rounded-full transition-all duration-300 hover:scale-110">
//                 <Instagram className="w-4 h-4" />
//               </a>
//               <a href="#" className="bg-white/10 hover:bg-[#E31B23] p-2 rounded-full transition-all duration-300 hover:scale-110">
//                 <Linkedin className="w-4 h-4" />
//               </a>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-lg font-bold mb-4">Quick Links</h3>
//             <ul className="space-y-2">
//               {quickLinks.map((link, index) => (
//                 <li key={index}>
//                   <a href={link.href} className="text-white/80 hover:text-[#E31B23] transition-all duration-300 hover:translate-x-1 text-sm flex items-center">
//                     {link.label}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Company */}
//           <div>
//             <h3 className="text-lg font-bold mb-4">Company</h3>
//             <ul className="space-y-2">
//               {company.map((link, index) => (
//                 <li key={index}>
//                   <a href={link.href} className="text-white/80 hover:text-[#E31B23] transition-all duration-300 hover:translate-x-1 text-sm flex items-center">
//                     {link.label}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div>
//             <h3 className="text-lg font-bold mb-4">Contact Us</h3>
//             <ul className="space-y-3">
//               <li className="flex items-start gap-2 text-sm text-white/80 hover:text-white transition-colors duration-300">
//                 <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
//                 <span>123 Travel Street, Mumbai, Maharashtra, India</span>
//               </li>
//               <li className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors duration-300">
//                 <Phone className="w-4 h-4 flex-shrink-0" />
//                 <span>+91 9820870771</span>
//               </li>
//               <li className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors duration-300">
//                 <Mail className="w-4 h-4 flex-shrink-0" />
//                 <span>salil@sktt.in</span>
//               </li>
              
//               {/* Member of UTE */}
//               <li className="mt-4 pt-4 border-t border-white/20">
//                 <div className="mb-3">
//                   <h4 className="text-md font-bold text-white inline-block pb-1 border-b-2 border-[#E31B23]">
//                     Member of
//                   </h4>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   {/* Replace with your UTE logo */}
//                   <div className="bg-white rounded p-1 flex items-center justify-center">
//                     <img 
//                       src="/assets/ute-logo.png" // Update this path to your UTE logo
//                       alt="UTE Logo" 
//                       className="h-8 w-auto"
//                       onError={(e) => {
//                         // Fallback if UTE logo doesn't exist
//                         const target = e.target as HTMLImageElement;
//                         target.style.display = 'none';
//                         const fallback = target.nextElementSibling as HTMLElement;
//                         if (fallback) fallback.style.display = 'flex';
//                       }}
//                     />
//                     {/* Fallback UTE text */}
//                     <div className="hidden bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">
//                       UTE
//                     </div>
//                   </div>
//                   <div>
//                     <p className="text-sm font-semibold text-white">United Travel Enterprises</p>
//                     <p className="text-xs text-white/80">Premium Travel Association</p>
//                   </div>
//                 </div>
//               </li>
//             </ul>
//           </div>
//         </div>

//         <div className="border-t border-white/20 pt-6 text-center">
//           <p className="text-sm text-white/70">
//             &copy; {new Date().getFullYear()} SK Tours. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;




// import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
// import img from "../assets/png[3].png";
// import uteLogo from "../assets/sktourslogoe.jpg";
// import iataLogo from "../assets/png[1].png";
// // import tafiLogo from "../assets/tafi-logo.png";
// // import taaiLogo from "../assets/taai-logo.png";

// const Footer = () => {
//   const quickLinks = [
//     { label: "Tours", href: "#tours" },
//     { label: "Cruises", href: "#cruises" },
//     { label: "MICE", href: "#mice" },
//     { label: "Flights", href: "#flights" },
//     { label: "Hotels", href: "#hotels" },
//     { label: "Visa Services", href: "#visa" },
//   ];

//   const company = [
//     { label: "About Us", href: "#about" },
//     { label: "Contact Us", href: "#contact" },
//     { label: "Careers", href: "#careers" },
//     { label: "Terms & Conditions", href: "#terms" },
//     { label: "Privacy Policy", href: "#privacy" },
//   ];

//   // Association logos data
//   const associationLogos = [
//     {
//       name: "United Travel Enterprises",
//       logo: uteLogo,
//       fallback: "UTE"
//     },
//     // {
//     //   name: "IATA",
//     //   logo: iataLogo, 
//     //   fallback: "IATA"
//     // },
//     // {
//     //   name: "TAFI",
//     //   logo: tafiLogo,
//     //   fallback: "TAFI"
//     // },
//     // {
//     //   name: "TAAI",
//     //   logo: taaiLogo,
//     //   fallback: "TAAI"
//     // }
//   ];

//   return (
//     <footer className="bg-gradient-to-r from-[#0F1F5C] via-[#1F3F93] to-[#0F1F5C] text-white pt-12 pb-6">
//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
//           {/* Logo & About */}
//           <div>
//             <div className="flex items-center mb-4">
//               <div className="rounded-lg p-2 flex items-center justify-center">
//                 <img 
//                   src={img}
//                   alt="SK Tours Logo" 
//                   className="h-16 w-auto"
//                   onError={(e) => {
//                     // Fallback if logo doesn't exist
//                     const target = e.target as HTMLImageElement;
//                     target.style.display = 'none';
//                     const fallback = target.nextElementSibling as HTMLElement;
//                     if (fallback) fallback.style.display = 'flex';
//                   }}
//                 />
//                 {/* Fallback logo text */}
//                 <div className="hidden bg-white rounded-full px-4 py-2 flex items-center">
//                   <span className="text-2xl font-bold text-[#E31B23]">SK</span>
//                   <span className="text-2xl font-bold text-[#0F1F5C]">tours</span>
//                   <span className="w-3 h-3 bg-[#E31B23] rounded-full ml-1"></span>
//                 </div>
//               </div>
//             </div>
//             <p className="text-white/80 text-sm leading-relaxed">
//               Your trusted travel partner for creating unforgettable experiences across the globe.
//             </p>
//             <div className="flex gap-3 mt-4">
//               <a href="#" className="bg-white/10 hover:bg-[#E31B23] p-2 rounded-full transition-all duration-300 hover:scale-110">
//                 <Facebook className="w-4 h-4" />
//               </a>
//               <a href="#" className="bg-white/10 hover:bg-[#E31B23] p-2 rounded-full transition-all duration-300 hover:scale-110">
//                 <Twitter className="w-4 h-4" />
//               </a>
//               <a href="#" className="bg-white/10 hover:bg-[#E31B23] p-2 rounded-full transition-all duration-300 hover:scale-110">
//                 <Instagram className="w-4 h-4" />
//               </a>
//               <a href="#" className="bg-white/10 hover:bg-[#E31B23] p-2 rounded-full transition-all duration-300 hover:scale-110">
//                 <Linkedin className="w-4 h-4" />
//               </a>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-lg font-bold mb-4">Quick Links</h3>
//             <ul className="space-y-2">
//               {quickLinks.map((link, index) => (
//                 <li key={index}>
//                   <a href={link.href} className="text-white/80 hover:text-[#E31B23] transition-all duration-300 hover:translate-x-1 text-sm flex items-center">
//                     {link.label}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Company */}
//           <div>
//             <h3 className="text-lg font-bold mb-4">Company</h3>
//             <ul className="space-y-2">
//               {company.map((link, index) => (
//                 <li key={index}>
//                   <a href={link.href} className="text-white/80 hover:text-[#E31B23] transition-all duration-300 hover:translate-x-1 text-sm flex items-center">
//                     {link.label}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div>
//             <h3 className="text-lg font-bold mb-4">Contact Us</h3>
//             <ul className="space-y-3">
//               <li className="flex items-start gap-2 text-sm text-white/80 hover:text-white transition-colors duration-300">
//                 <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
//                 <span>123 Travel Street, Mumbai, Maharashtra, India</span>
//               </li>
//               <li className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors duration-300">
//                 <Phone className="w-4 h-4 flex-shrink-0" />
//                 <span>+91 9820870771</span>
//               </li>
//               <li className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors duration-300">
//                 <Mail className="w-4 h-4 flex-shrink-0" />
//                 <span>salil@sktt.in</span>
//               </li>
              
//               {/* Member of Associations */}
//               <li className="mt-4 pt-4 border-t border-white/20">
//                 <div className="mb-3">
//                   <h4 className="text-md font-bold text-white inline-block pb-1 border-b-2 border-[#E31B23]">
//                     Member of
//                   </h4>
//                 </div>
//                 <div className="grid grid-cols-2 gap-3">
//                   {associationLogos.map((association, index) => (
//                     <div 
//                       key={index}
//                       className="rounded-lg p-2 flex items-center justify-center hover:scale-105 transition-transform duration-300 cursor-pointer"
//                       title={association.name}
//                     >
//                       <img 
//                         src={association.logo}
//                         alt={`${association.name} Logo`}
//                         className="h-8 w-auto max-w-full object-contain"
//                         onError={(e) => {
//                           // Fallback if logo doesn't exist
//                           const target = e.target as HTMLImageElement;
//                           target.style.display = 'none';
//                           const fallback = target.nextElementSibling as HTMLElement;
//                           if (fallback) fallback.style.display = 'flex';
//                         }}
//                       />
//                       {/* Fallback text */}
//                       <div className="hidden bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold items-center justify-center h-8">
//                         {association.fallback}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </li>
//             </ul>
//           </div>
//         </div>

//         <div className="border-t border-white/20 pt-6 text-center">
//           <p className="text-sm text-white/70">
//             &copy; {new Date().getFullYear()} SK Tours. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;








// import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
// import img from "../assets/png[3].png";
// // import uteLogo from "../assets/";
// // import iataLogo from "../assets/iata-logo.png";
// // import tafiLogo from "../assets/tafi-logo.png";
// // import taaiLogo from "../assets/taai-logo.png";

// const Footer = () => {
//   const quickLinks = [
//     { label: "Tours", href: "#tours" },
//     { label: "Cruises", href: "#cruises" },
//     { label: "MICE", href: "#mice" },
//     { label: "Flights", href: "#flights" },
//     { label: "Hotels", href: "#hotels" },
//     { label: "Visa Services", href: "#visa" },
//   ];

//   const company = [
//     { label: "About Us", href: "#about" },
//     { label: "Contact Us", href: "#contact" },
//     { label: "Careers", href: "#careers" },
//     { label: "Terms & Conditions", href: "#terms" },
//     { label: "Privacy Policy", href: "#privacy" },
//   ];

//   // Association logos data
//   const associationLogos = [
//     {
//       name: "United Travel Enterprises",
//       logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-RYERIQuEYZDn8txNF4DQOzmqTJdioPjJQw&s",
//       fallback: "UTE"
//     },
//     // {
//     //   name: "IATA",
//     //   logo: iataLogo, 
//     //   fallback: "IATA"
//     // },
//     // {
//     //   name: "TAFI",
//     //   logo: tafiLogo,
//     //   fallback: "TAFI"
//     // },
//     // {
//     //   name: "TAAI",
//     //   logo: taaiLogo,
//     //   fallback: "TAAI"
//     // }
//   ];

//   return (
//     <footer className="bg-gradient-to-r from-[#0F1F5C] via-[#1F3F93] to-[#0F1F5C] text-white pt-12 pb-6">
//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
//           {/* Logo & About */}
//           <div>
//             <div className="flex items-center mb-4">
//               <div className="rounded-lg p-2 flex items-center justify-center">
//                 <img 
//                   src={img}
//                   alt="SK Tours Logo" 
//                   className="h-16 w-auto"
//                   onError={(e) => {
//                     // Fallback if logo doesn't exist
//                     const target = e.target as HTMLImageElement;
//                     target.style.display = 'none';
//                     const fallback = target.nextElementSibling as HTMLElement;
//                     if (fallback) fallback.style.display = 'flex';
//                   }}
//                 />
//                 {/* Fallback logo text */}
//                 <div className="hidden bg-white rounded-full px-4 py-2 flex items-center">
//                   <span className="text-2xl font-bold text-[#E31B23]">SK</span>
//                   <span className="text-2xl font-bold text-[#0F1F5C]">tours</span>
//                   <span className="w-3 h-3 bg-[#E31B23] rounded-full ml-1"></span>
//                 </div>
//               </div>
//             </div>
//             <p className="text-white/80 text-sm leading-relaxed">
//               Your Vacation in Five Continents unforgettable experiences across the globe.
//             </p>
//             <div className="flex gap-3 mt-4">
//               <a href="#" className="bg-white/10 hover:bg-[#E31B23] p-2 rounded-full transition-all duration-300 hover:scale-110">
//                 <Facebook className="w-4 h-4" />
//               </a>
//               <a href="#" className="bg-white/10 hover:bg-[#E31B23] p-2 rounded-full transition-all duration-300 hover:scale-110">
//                 <Twitter className="w-4 h-4" />
//               </a>
//               <a href="#" className="bg-white/10 hover:bg-[#E31B23] p-2 rounded-full transition-all duration-300 hover:scale-110">
//                 <Instagram className="w-4 h-4" />
//               </a>
//               <a href="#" className="bg-white/10 hover:bg-[#E31B23] p-2 rounded-full transition-all duration-300 hover:scale-110">
//                 <Linkedin className="w-4 h-4" />
//               </a>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-lg font-bold mb-4">Quick Links</h3>
//             <ul className="space-y-2">
//               {quickLinks.map((link, index) => (
//                 <li key={index}>
//                   <a href={link.href} className="text-white/80 hover:text-[#E31B23] transition-all duration-300 hover:translate-x-1 text-sm flex items-center">
//                     {link.label}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Company */}
//           <div>
//             <h3 className="text-lg font-bold mb-4">Company</h3>
//             <ul className="space-y-2">
//               {company.map((link, index) => (
//                 <li key={index}>
//                   <a href={link.href} className="text-white/80 hover:text-[#E31B23] transition-all duration-300 hover:translate-x-1 text-sm flex items-center">
//                     {link.label}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div>
//             <h3 className="text-lg font-bold mb-4">Contact Us</h3>
//             <ul className="space-y-3">
//               <li className="flex items-start gap-2 text-sm text-white/80 hover:text-white transition-colors duration-300">
//                 <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
//                 <span>Dadar West, Mumbai 400028, India</span>
//               </li>
//               <li className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors duration-300">
//                 <Phone className="w-4 h-4 flex-shrink-0" />
//                 <span>+91 9820870771</span>
//               </li>
//               <li className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors duration-300">
//                 <Mail className="w-4 h-4 flex-shrink-0" />
//                 <span>salil@sktt.in</span>
//               </li>
              
//               {/* Member of Associations */}
//               <li className="mt-4 pt-4 border-t border-white/20">
//                 <div className="mb-3">
//                   <h4 className="text-md font-bold text-white inline-block pb-1 border-b-2 border-[#E31B23]">
//                     Member of
//                   </h4>
//                 </div>
//                 <div className="grid grid-cols-2 gap-3">
//                   {associationLogos.map((association, index) => (
//                     <div 
//                       key={index}
//                       className="rounded-lg p-2 flex items-center justify-center hover:scale-105 transition-transform duration-300 cursor-pointer"
//                       title={association.name}
//                     >
//                       <img 
//                         src={association.logo}
//                         alt={`${association.name} Logo`}
//                         className="h-12 w-auto max-w-full object-contain"
//                         onError={(e) => {
//                           // Fallback if logo doesn't exist
//                           const target = e.target as HTMLImageElement;
//                           target.style.display = 'none';
//                           const fallback = target.nextElementSibling as HTMLElement;
//                           if (fallback) fallback.style.display = 'flex';
//                         }}
//                       />
//                       {/* Fallback text */}
//                       <div className="hidden bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold items-center justify-center h-8">
//                         {association.fallback}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </li>
//             </ul>
//           </div>
//         </div>

//         <div className="border-t border-white/20 pt-6 text-center">
//           <p className="text-sm text-white/70">
//             &copy; {new Date().getFullYear()} SK Tours. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;





import { Mail, Phone, MapPin } from "lucide-react";
import img from "../assets/png[3].png";
// Import social media icons from assets
// import facebookIcon from "../assets/facebook.png";
// import twitterIcon from "../assets/twitter.png";
// import instagramIcon from "../assets/instagram.png";
// import linkedinIcon from "../assets/linkedin.png";

// import uteLogo from "../assets/";
// import iataLogo from "../assets/iata-logo.png";
// import tafiLogo from "../assets/tafi-logo.png";
// import taaiLogo from "../assets/taai-logo.png";

const Footer = () => {
  const quickLinks = [
    { label: "Tours", href: "#tours" },
    { label: "Cruises", href: "#cruises" },
    { label: "MICE", href: "#mice" },
    { label: "Flights", href: "#flights" },
    { label: "Hotels", href: "#hotels" },
    { label: "Visa Services", href: "#visa" },
  ];

  const company = [
    { label: "About Us", href: "#about" },
    { label: "Contact Us", href: "#contact" },
    { label: "Careers", href: "#careers" },
    { label: "Terms & Conditions", href: "#terms" },
    { label: "Privacy Policy", href: "#privacy" },
  ];

  // Association logos data
  const associationLogos = [
    {
      name: "United Travel Enterprises",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-RYERIQuEYZDn8txNF4DQOzmqTJdioPjJQw&s",
      fallback: "UTE"
    },
    // {
    //   name: "IATA",
    //   logo: iataLogo, 
    //   fallback: "IATA"
    // },
    // {
    //   name: "TAFI",
    //   logo: tafiLogo,
    //   fallback: "TAFI"
    // },
    // {
    //   name: "TAAI",
    //   logo: taaiLogo,
    //   fallback: "TAAI"
    // }
  ];

  // Social media icons data
  const socialMediaIcons = [
    // {
    //   name: "Facebook",
    //   icon: facebookIcon,
    //   href: "#",
    //   fallback: "FB"
    // },
    {
      name: "Twitter",
      icon: "https://i.pinimg.com/736x/3b/30/52/3b30527d299464f04cd3653be37ee410.jpg",
      href: "#",
      fallback: "TW"
    },
    {
      name: "Instagram",
      icon: "https://i.pinimg.com/736x/de/84/ec/de84ece92c36f184e873fa090c9e7624.jpg",
      href: "#",
      fallback: "IG"
    },
    {
      name: "LinkedIn",
      icon: "https://i.pinimg.com/736x/75/b4/ba/75b4ba35bf36a56372278fb3e9ce9014.jpg",
      href: "#",
      fallback: "IN"
    }
  ];

  return (
    <footer className="bg-gradient-to-r from-[#0F1F5C] via-[#1F3F93] to-[#0F1F5C] text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo & About */}
          <div>
            <div className="flex items-center mb-4">
              <div className="rounded-lg p-2 flex items-center justify-center">
                <img 
                  src={img}
                  alt="SK Tours Logo" 
                  className="h-16 w-auto"
                  onError={(e) => {
                    // Fallback if logo doesn't exist
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                {/* Fallback logo text */}
                <div className="hidden bg-white rounded-full px-4 py-2 flex items-center">
                  <span className="text-2xl font-bold text-[#E31B23]">SK</span>
                  <span className="text-2xl font-bold text-[#0F1F5C]">tours</span>
                  <span className="w-3 h-3 bg-[#E31B23] rounded-full ml-1"></span>
                </div>
              </div>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Your Vacation in Five Continents unforgettable experiences across the globe.
            </p>
            <div className="flex gap-3 mt-4">
              {socialMediaIcons.map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  className="bg-white/10 hover:bg-[#E31B23] p-2 rounded-full transition-all duration-300 hover:scale-110"
                  title={social.name}
                >
                  <img 
                    src={social.icon}
                    alt={`${social.name} Icon`}
                    className="w-4 h-4"
                    onError={(e) => {
                      // Fallback if icon doesn't exist
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  {/* Fallback text */}
                  <div className="hidden text-white text-xs font-bold items-center justify-center w-4 h-4">
                    {social.fallback}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-white/80 hover:text-[#E31B23] transition-all duration-300 hover:translate-x-1 text-sm flex items-center">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              {company.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-white/80 hover:text-[#E31B23] transition-all duration-300 hover:translate-x-1 text-sm flex items-center">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-white/80 hover:text-white transition-colors duration-300">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Dadar West, Mumbai 400028, India</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors duration-300">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+91 9820870771</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors duration-300">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>salil@sktt.in</span>
              </li>
              
              {/* Member of Associations */}
              <li className="mt-4 pt-4 border-t border-white/20">
                <div className="mb-3">
                  <h4 className="text-md font-bold text-white inline-block pb-1 border-b-2 border-[#E31B23]">
                    Member of
                  </h4>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {associationLogos.map((association, index) => (
                    <div 
                      key={index}
                      className="rounded-lg p-2 flex items-center justify-center hover:scale-105 transition-transform duration-300 cursor-pointer"
                      title={association.name}
                    >
                      <img 
                        src={association.logo}
                        alt={`${association.name} Logo`}
                        className="h-12 w-auto max-w-full object-contain"
                        onError={(e) => {
                          // Fallback if logo doesn't exist
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      {/* Fallback text */}
                      <div className="hidden bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold items-center justify-center h-8">
                        {association.fallback}
                      </div>
                    </div>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 text-center">
          <p className="text-sm text-white/70">
            &copy; {new Date().getFullYear()} SK Tours. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;