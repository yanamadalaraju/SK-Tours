// import { useRef } from "react";
// import { ChevronLeft, ChevronRight, Gift, Plane } from "lucide-react";

// const festivePackages = [
//   {
//     id: 1,
//     title: "South East Asia",
//     departures: "72 Departures",
//     price: "₹65,000*",
//     image:
//       "https://images.pexels.com/photos/208745/pexels-photo-208745.jpeg?auto=compress&cs=tinysrgb&w=1200",
//   },
//   {
//     id: 2,
//     title: "Dubai And Middleeast",
//     departures: "30 Departures",
//     price: "₹96,000*",
//     image:
//       "https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=1200",
//   },
//   {
//     id: 3,
//     title: "Bhutan",
//     departures: "4 Departures",
//     price: "₹95,000*",
//     image:
//       "https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg?auto=compress&cs=tinysrgb&w=1200",
//   },
//   {
//     id: 4,
//     title: "Nepal",
//     departures: "4 Departures",
//     price: "₹79,000*",
//     image:
//       "https://images.pexels.com/photos/2218343/pexels-photo-2218343.jpeg?auto=compress&cs=tinysrgb&w=1200",
//   },
//   {
//     id: 5,
//     title: "Mauritius",
//     departures: "1 Departure",
//     price: "₹1,85,000*",
//     image:
//       "https://images.pexels.com/photos/1450363/pexels-photo-1450363.jpeg?auto=compress&cs=tinysrgb&w=1200",
//   },
//   {
//     id: 6,
//     title: "Srilanka Maldives",
//     departures: "7 Departures",
//     price: "₹1,25,000*",
//     image:
//       "https://images.pexels.com/photos/1456291/pexels-photo-1456291.jpeg?auto=compress&cs=tinysrgb&w=1200",
//   },
// ];

// const FestiveHolidaysSection = () => {
//   const scrollRef = useRef<HTMLDivElement | null>(null);

//   const scroll = (direction: "left" | "right") => {
//     if (!scrollRef.current) return;
//     const cardWidth = 260; // approximate card width incl. gap
//     const amount = direction === "left" ? -cardWidth : cardWidth;
//     scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
//   };

//   return (
//     <section className="py-8 md:py-10">
//       <div className="container mx-auto px-4">
//         <div className="bg-[#e32222] rounded-3xl shadow-[0_18px_45px_rgba(0,0,0,0.35)] overflow-hidden text-white relative">
//           {/* Header */}
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-5 md:px-8 pt-5 md:pt-6 pb-3">
//             <div>
//               <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
//                 Christmas &amp; New Year Holidays!
//               </h2>
//               <p className="text-sm md:text-base mt-1 md:mt-1.5 flex flex-wrap items-center gap-1">
//                 Festive spirit to winter wonderlands, a breathtaking season awaits!
//                 <span className="inline-flex items-center gap-1 text-xs md:text-sm ml-2 bg-white/15 px-2.5 py-1 rounded-full">
//                   <Plane className="w-3 h-3" />
//                   Including Airfare
//                 </span>
//               </p>
//             </div>

//             {/* Right badge + arrows */}
//             <div className="flex items-center gap-3 md:gap-4 self-start md:self-auto">
//               {/* Festive Bonus badge */}
//               <div className="relative">
//                 <div className="bg-[#ffb342] text-[#b01212] px-4 py-2 rounded-2xl text-xs md:text-sm font-semibold shadow-md flex items-center gap-2">
//                   <Gift className="w-4 h-4" />
//                   <div className="leading-tight text-left">
//                     <div>Festive Bonus*</div>
//                     <div className="text-[10px] md:text-[11px]">
//                       Additional Discount<br />
//                       Up to ₹10,000
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Arrows */}
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => scroll("left")}
//                   className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
//                 >
//                   <ChevronLeft className="w-5 h-5" />
//                 </button>
//                 <button
//                   onClick={() => scroll("right")}
//                   className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
//                 >
//                   <ChevronRight className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Cards row */}
//           <div
//             ref={scrollRef}
//             className="flex gap-4 md:gap-5 px-4 md:px-6 pb-5 md:pb-6 overflow-x-auto no-scrollbar"
//           >
//             {festivePackages.map((pkg) => (
//               <div
//                 key={pkg.id}
//                 className="min-w-[220px] max-w-[240px] rounded-3xl overflow-hidden bg-black/20 shadow-md relative flex-shrink-0"
//               >
//                 {/* Image */}
//                 <div className="h-40 md:h-44 w-full overflow-hidden">
//                   <img
//                     src={pkg.image}
//                     alt={pkg.title}
//                     className="w-full h-full object-cover"
//                   />
//                   {/* gradient overlay at bottom of image for text readability */}
//                   <div className="absolute inset-x-0 bottom-16 h-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
//                 </div>

//                 {/* Content over image bottom */}
//                 <div className="absolute left-0 right-0 bottom-0 px-3 pb-3 pt-8 text-left">
//                   <p className="text-sm md:text-base font-semibold drop-shadow-md">
//                     {pkg.title}
//                   </p>
//                   <div className="mt-1 inline-flex items-center px-2 py-0.5 rounded-full bg-black/55 text-[10px] md:text-[11px]">
//                     {pkg.departures}
//                   </div>
//                   <p className="mt-2 text-xs md:text-sm">
//                     <span className="opacity-80 mr-1">Starts From</span>
//                     <span className="font-semibold">{pkg.price}</span>
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FestiveHolidaysSection;



// import { useRef, useEffect, useState } from "react";
// import { ChevronLeft, ChevronRight, Gift, Plane, Star, Sparkles } from "lucide-react";
// import img from "../../assets/plane-removebg-preview.png";

// const festivePackages = [
//   {
//     id: 1,
//     title: "South East Asia",
//     departures: "72 Departures",
//     price: "₹65,000*",
//     image:
//       "https://images.pexels.com/photos/208745/pexels-photo-208745.jpeg?auto=compress&cs=tinysrgb&w=1200",
//   },
//   {
//     id: 2,
//     title: "Dubai And Middleeast",
//     departures: "30 Departures",
//     price: "₹96,000*",
//     image:
//       "https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=1200",
//   },
//   {
//     id: 3,
//     title: "Bhutan",
//     departures: "4 Departures",
//     price: "₹95,000*",
//     image:
//       "https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg?auto=compress&cs=tinysrgb&w=1200",
//   },
//   {
//     id: 4,
//     title: "Nepal",
//     departures: "4 Departures",
//     price: "₹79,000*",
//     image:
//       "https://images.pexels.com/photos/2218343/pexels-photo-2218343.jpeg?auto=compress&cs=tinysrgb&w=1200",
//   },
//   {
//     id: 5,
//     title: "Mauritius",
//     departures: "1 Departure",
//     price: "₹1,85,000*",
//     image:
//       "https://images.pexels.com/photos/1450363/pexels-photo-1450363.jpeg?auto=compress&cs=tinysrgb&w=1200",
//   },
//   {
//     id: 6,
//     title: "Srilanka Maldives",
//     departures: "7 Departures",
//     price: "₹1,25,000*",
//     image:
//       "https://images.pexels.com/photos/1456291/pexels-photo-1456291.jpeg?auto=compress&cs=tinysrgb&w=1200",
//   },
// ];

// const FestiveHolidaysSection = () => {
//   const scrollRef = useRef<HTMLDivElement | null>(null);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//           observer.disconnect();
//         }
//       },
//       { threshold: 0.1 }
//     );

//     if (scrollRef.current) {
//       observer.observe(scrollRef.current);
//     }

//     return () => {
//       if (scrollRef.current) {
//         observer.unobserve(scrollRef.current);
//       }
//     };
//   }, []);

//   const scroll = (direction: "left" | "right") => {
//     if (!scrollRef.current) return;
//     const cardWidth = 320;
//     const amount = direction === "left" ? -cardWidth : cardWidth;
//     scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
//   };

//   return (
//     <section className={`py-12 md:py-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//       <div className="container mx-auto px-4">
//         {/* Header with Side-by-side Layout - Adjusted ratio */}
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
//           {/* Left Content - Reduced width */}
//           <div className="lg:col-span-2">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
//               <span className="text-green-600 font-semibold text-lg">Special Festive Offers</span>
//             </div>
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
//               Christmas &<br />
//               <span className="text-green-600">New Year</span> Holidays!
//             </h1>
//             <p className="text-xl text-gray-600 mb-6">
//               Festive spirit to winter wonderlands, a breathtaking season awaits!
//             </p>
//             <div className="flex items-center gap-4 flex-wrap">
//               <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full border border-green-200">
//                 <Plane className="w-5 h-5 text-green-600" />
//                 <span className="text-green-700 font-medium">Including Airfare</span>
//               </div>
//               {/* Festive Bonus moved here */}
//               <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full border border-yellow-200">
//                 <Gift className="w-5 h-5 text-yellow-600" />
//                 <span className="text-yellow-700 font-medium">Festive Bonus Up to ₹10,000</span>
//               </div>
//             </div>
//           </div>

//           {/* Right Content - Image - Increased width */}
//           <div className="lg:col-span-2 flex flex-col justify-between">
//             {/* Hero Image - Larger container */}
//             <div className="w-full h-72 lg:h-80  overflow-hidden mb-6">
//               <img
//                 src={img}
//                 alt="Christmas celebration"
//                 className="w-full h-full object-cover"
//               />
//             </div>

//             {/* Navigation Arrows */}
//             <div className="flex gap-3 self-end">
//               <button
//                 onClick={() => scroll("left")}
//                 className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl"
//               >
//                 <ChevronLeft className="w-6 h-6" />
//               </button>
//               <button
//                 onClick={() => scroll("right")}
//                 className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl"
//               >
//                 <ChevronRight className="w-6 h-6" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Packages Grid - Wider cards */}
//         <div className="mb-8">
//           <div
//             ref={scrollRef}
//             className="grid grid-flow-col auto-cols-max gap-6 overflow-x-auto no-scrollbar pb-4"
//           >
//             {festivePackages.map((pkg) => (
//               <div
//                 key={pkg.id}
//                 className="w-[320px] bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-gray-100"
//               >
//                 {/* Image with Overlay - Increased height */}
//                 <div className="relative h-52 overflow-hidden">
//                   <img
//                     src={pkg.image}
//                     alt={pkg.title}
//                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
//                   {/* Departures Badge */}
//                   <div className="absolute top-4 left-4">
//                     <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
//                       {pkg.departures}
//                     </span>
//                   </div>

//                   {/* Star Decoration */}
//                   <div className="absolute top-4 right-4">
//                     <Sparkles className="w-5 h-5 text-yellow-400 fill-current" />
//                   </div>
//                 </div>

//                 {/* Content - More padding */}
//                 <div className="p-7">
//                   <div className="flex items-start justify-between mb-5">
//                     <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
//                       {pkg.title}
//                     </h3>
//                     <Star className="w-5 h-5 text-green-500 fill-current mt-1" />
//                   </div>

//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm text-gray-500 mb-1">Starts From</p>
//                       <p className="text-2xl font-bold text-green-600">{pkg.price}</p>
//                     </div>
//                     <button className="bg-green-500 hover:bg-green-600 text-white px-7 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
//                       Book Now
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Footer Note */}
//         <div className="text-center">
//           <p className="text-gray-500 text-sm">
//             *Festive Bonus terms and conditions apply. Prices are per person and subject to availability.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FestiveHolidaysSection;



// import { useRef, useEffect, useState } from "react";
// import { ChevronLeft, ChevronRight, Gift, Plane, Star, Sparkles } from "lucide-react";
// import img from "../../assets/plane-removebg-preview.png";

// const festivePackages = [
//   {
//     id: 1,
//     title: "South East Asia",
//     departures: "72 Departures",
//     price: "₹65,000*",
//     image:
//       "https://images.pexels.com/photos/208745/pexels-photo-208745.jpeg?auto=compress&cs=tinysrgb&w=1200",
//   },
//   {
//     id: 2,
//     title: "Dubai And Middleeast",
//     departures: "30 Departures",
//     price: "₹96,000*",
//     image:
//       "https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=1200",
//   },
//   {
//     id: 3,
//     title: "Bhutan",
//     departures: "4 Departures",
//     price: "₹95,000*",
//     image:
//       "https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg?auto=compress&cs=tinysrgb&w=1200",
//   },
//   {
//     id: 4,
//     title: "Nepal",
//     departures: "4 Departures",
//     price: "₹79,000*",
//     image:
//       "https://images.pexels.com/photos/2218343/pexels-photo-2218343.jpeg?auto=compress&cs=tinysrgb&w=1200",
//   },
//   {
//     id: 5,
//     title: "Mauritius",
//     departures: "1 Departure",
//     price: "₹1,85,000*",
//     image:
//       "https://images.pexels.com/photos/1450363/pexels-photo-1450363.jpeg?auto=compress&cs=tinysrgb&w=1200",
//   },
//   {
//     id: 6,
//     title: "Srilanka Maldives",
//     departures: "7 Departures",
//     price: "₹1,25,000*",
//     image:
//       "https://images.pexels.com/photos/1456291/pexels-photo-1456291.jpeg?auto=compress&cs=tinysrgb&w=1200",
//   },
//   {
//     id: 7,
//     title: "Switzerland",
//     departures: "15 Departures",
//     price: "₹2,25,000*",
//     image:
//       "https://images.pexels.com/photos/258136/pexels-photo-258136.jpeg?auto=compress&cs=tinysrgb&w=1200",
//   },
//   {
//     id: 8,
//     title: "Bali",
//     departures: "45 Departures",
//     price: "₹55,000*",
//     image:
//       "https://images.pexels.com/photos/2525903/pexels-photo-2525903.jpeg?auto=compress&cs=tinysrgb&w=1200",
//   },
//   {
//     id: 9,
//     title: "Thailand",
//     departures: "60 Departures",
//     price: "₹45,000*",
//     image:
//       "https://images.pexels.com/photos/1450351/pexels-photo-1450351.jpeg?auto=compress&cs=tinysrgb&w=1200",
//   },
//   {
//     id: 10,
//     title: "Singapore",
//     departures: "35 Departures",
//     price: "₹75,000*",
//     image:
//       "https://images.pexels.com/photos/774016/pexels-photo-774016.jpeg?auto=compress&cs=tinysrgb&w=1200",
//   },
//   {
//     id: 11,
//     title: "Europe Tour",
//     departures: "25 Departures",
//     price: "₹2,85,000*",
//     image:
//       "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1200",
//   },
//   {
//     id: 12,
//     title: "Australia",
//     departures: "12 Departures",
//     price: "₹2,15,000*",
//     image:
//       "https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?auto=compress&cs=tinysrgb&w=1200",
//   },
// ];

// const FestiveHolidaysSection = () => {
//   const scrollRef = useRef<HTMLDivElement | null>(null);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//           observer.disconnect();
//         }
//       },
//       { threshold: 0.1 }
//     );

//     if (scrollRef.current) {
//       observer.observe(scrollRef.current);
//     }

//     return () => {
//       if (scrollRef.current) {
//         observer.unobserve(scrollRef.current);
//       }
//     };
//   }, []);

//   const scroll = (direction: "left" | "right") => {
//     if (!scrollRef.current) return;
//     const cardWidth = 220;
//     const amount = direction === "left" ? -cardWidth : cardWidth;
//     scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
//   };

//   return (
//     <section className={`py-12 md:py-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//       <div className="container mx-auto px-4">
//         {/* Header with Side-by-side Layout - Removed bottom margin */}
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//           {/* Left Content */}
//           <div className="lg:col-span-2">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
//               <span className="text-green-600 font-semibold text-lg">Special Festive Offers</span>
//             </div>
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
//               Christmas &<br />
//               <span className="text-green-600">New Year</span> Holidays!
//             </h1>
//             <p className="text-xl text-gray-600 mb-6">
//               Festive spirit to winter wonderlands, a breathtaking season awaits!
//             </p>
//             <div className="flex items-center gap-4 flex-wrap">
//               <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full border border-green-200">
//                 <Plane className="w-5 h-5 text-green-600" />
//                 <span className="text-green-700 font-medium">Including Airfare</span>
//               </div>
//               <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full border border-yellow-200">
//                 <Gift className="w-5 h-5 text-yellow-600" />
//                 <span className="text-yellow-700 font-medium">Festive Bonus Up to ₹10,000</span>
//               </div>
//             </div>
//           </div>

//           {/* Right Content - Image */}
//           <div className="lg:col-span-2 flex flex-col justify-between">
//             <div className="w-full h-72 lg:h-80 overflow-hidden">
//               <img
//                 src={img}
//                 alt="Christmas celebration"
//                 className="w-full h-full object-cover"
//               />
//             </div>

//             {/* Navigation Arrows */}
//             <div className="flex gap-3 self-end mt-4">
//               <button
//                 onClick={() => scroll("left")}
//                 className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl"
//               >
//                 <ChevronLeft className="w-6 h-6" />
//               </button>
//               <button
//                 onClick={() => scroll("right")}
//                 className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl"
//               >
//                 <ChevronRight className="w-6 h-6" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Compact Cards Grid - No top margin */}
//         <div className="mt-0">
//           <div
//             ref={scrollRef}
//             className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto no-scrollbar pt-6"
//           >
//             {festivePackages.map((pkg) => (
//               <div
//                 key={pkg.id}
//                 className="w-[220px] bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group border border-gray-100"
//               >
//                 {/* Image */}
//                 <div className="relative h-32 overflow-hidden">
//                   <img
//                     src={pkg.image}
//                     alt={pkg.title}
//                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
//                   {/* Departures Badge */}
//                   <div className="absolute top-2 left-2">
//                     <span className="bg-white/90 text-gray-800 px-2 py-1 rounded-lg text-xs font-medium">
//                       {pkg.departures}
//                     </span>
//                   </div>

//                   {/* Star */}
//                   <div className="absolute top-2 right-2">
//                     <Star className="w-3 h-3 text-yellow-400 fill-current" />
//                   </div>
//                 </div>

//                 {/* Compact Content */}
//                 <div className="p-3">
//                   <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-1">
//                     {pkg.title}
//                   </h3>
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-xs text-gray-500 mb-1">Starts from</p>
//                       <p className="text-lg font-bold text-green-600">{pkg.price}</p>
//                     </div>
//                     <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center group-hover:bg-green-600 transition-colors">
//                       <Sparkles className="w-4 h-4 text-white" />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Footer Note */}
//         <div className="text-center mt-8">
//           <p className="text-gray-500 text-sm">
//             *Festive Bonus terms and conditions apply. Prices are per person and subject to availability.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FestiveHolidaysSection;






import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Gift, Plane, Star, Sparkles } from "lucide-react";
import img from "../../assets/plane-removebg-preview.png";

const festivePackages = [
  {
    id: 1,
    title: "South East Asia",
    departures: "72 Departures",
    price: "₹65,000*",
    image:
      "https://images.pexels.com/photos/208745/pexels-photo-208745.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: 2,
    title: "Dubai And Middleeast",
    departures: "30 Departures",
    price: "₹96,000*",
    image:
      "https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: 3,
    title: "Bhutan",
    departures: "4 Departures",
    price: "₹95,000*",
    image:
      "https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: 4,
    title: "Nepal",
    departures: "4 Departures",
    price: "₹79,000*",
    image:
      "https://images.pexels.com/photos/2218343/pexels-photo-2218343.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: 5,
    title: "Mauritius",
    departures: "1 Departure",
    price: "₹1,85,000*",
    image:
      "https://images.pexels.com/photos/1450363/pexels-photo-1450363.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: 6,
    title: "Srilanka Maldives",
    departures: "7 Departures",
    price: "₹1,25,000*",
    image:
      "https://images.pexels.com/photos/1456291/pexels-photo-1456291.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: 7,
    title: "Switzerland",
    departures: "15 Departures",
    price: "₹2,25,000*",
    image:
      "https://images.pexels.com/photos/258136/pexels-photo-258136.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: 8,
    title: "Bali",
    departures: "45 Departures",
    price: "₹55,000*",
    image:
      "https://images.pexels.com/photos/2525903/pexels-photo-2525903.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: 9,
    title: "Thailand",
    departures: "60 Departures",
    price: "₹45,000*",
    image:
      "https://images.pexels.com/photos/1450351/pexels-photo-1450351.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: 10,
    title: "Singapore",
    departures: "35 Departures",
    price: "₹75,000*",
    image:
      "https://images.pexels.com/photos/774016/pexels-photo-774016.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: 11,
    title: "Europe Tour",
    departures: "25 Departures",
    price: "₹2,85,000*",
    image:
      "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: 12,
    title: "Australia",
    departures: "12 Departures",
    price: "₹2,15,000*",
    image:
      "https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

const FestiveHolidaysSection = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (scrollRef.current) {
      observer.observe(scrollRef.current);
    }

    return () => {
      if (scrollRef.current) {
        observer.unobserve(scrollRef.current);
      }
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = 220;
    const amount = direction === "left" ? -cardWidth : cardWidth;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className={`py-6 md:py-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} bg-sky-50`}>
      <div className="container mx-auto px-4">
        {/* Header with Side-by-side Layout - Removed bottom margin */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-blue-600 font-semibold text-lg">Special Festive Offers</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Christmas &<br />
              <span className="text-blue-600">New Year</span> Holidays!
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Festive spirit to winter wonderlands, a breathtaking season awaits!
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-200">
                <Plane className="w-5 h-5 text-blue-600" />
                <span className="text-blue-700 font-medium">Including Airfare</span>
              </div>
              <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full border border-yellow-200">
                <Gift className="w-5 h-5 text-yellow-600" />
                <span className="text-yellow-700 font-medium">Festive Bonus Up to ₹10,000</span>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div className="w-full h-72 lg:h-80 overflow-hidden">
              <img
                src={img}
                alt="Christmas celebration"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Navigation Arrows */}
            <div className="flex gap-3 self-end mt-4">
              <button
                onClick={() => scroll("left")}
                className="w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Compact Cards Grid - No top margin */}
        <div className="mt-0">
          <div
            ref={scrollRef}
            className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto no-scrollbar pt-6"
          >
            {festivePackages.map((pkg) => (
              <div
                key={pkg.id}
                className="w-[220px] bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group border border-gray-100"
              >
                {/* Image */}
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
                  {/* Departures Badge */}
                  <div className="absolute top-2 left-2">
                    <span className="bg-white/90 text-gray-800 px-2 py-1 rounded-lg text-xs font-medium">
                      {pkg.departures}
                    </span>
                  </div>

                  {/* Star */}
                  <div className="absolute top-2 right-2">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  </div>
                </div>

                {/* Compact Content */}
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-1">
                    {pkg.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Starts from</p>
                      <p className="text-lg font-bold text-blue-600">{pkg.price}</p>
                    </div>
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            *Festive Bonus terms and conditions apply. Prices are per person and subject to availability.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FestiveHolidaysSection;