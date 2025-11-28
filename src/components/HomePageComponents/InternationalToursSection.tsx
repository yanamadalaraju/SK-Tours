// import React, { useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight, MapPin, Star, Users, Calendar } from "lucide-react";

// const internationalTours = [
//   {
//     id: 1,
//     name: "Bali Tropical Paradise",
//     location: "Indonesia",
//     duration: "7 Days",
//     price: "₹45,999",
//     image: "https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     travelers: 890,
//     badge: "Beach"
//   },
//   {
//     id: 2,
//     name: "Swiss Alps Adventure",
//     location: "Switzerland",
//     duration: "8 Days",
//     price: "₹89,999",
//     image: "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     travelers: 670,
//     badge: "Adventure"
//   },
//   {
//     id: 3,
//     name: "Tokyo City Experience",
//     location: "Japan",
//     duration: "6 Days",
//     price: "₹65,999",
//     image: "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.7,
//     travelers: 1120,
//     badge: "Cultural"
//   },
//   {
//     id: 4,
//     name: "Paris Romantic Getaway",
//     location: "France",
//     duration: "5 Days",
//     price: "₹72,999",
//     image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     travelers: 950,
//     badge: "Romantic"
//   },
//   {
//     id: 5,
//     name: "Dubai Luxury Escape",
//     location: "UAE",
//     duration: "4 Days",
//     price: "₹55,999",
//     image: "https://images.pexels.com/photos/1796715/pexels-photo-1796715.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.6,
//     travelers: 1340,
//     badge: "Luxury"
//   },
//   {
//     id: 6,
//     name: "Thailand Island Hopping",
//     location: "Thailand",
//     duration: "7 Days",
//     price: "₹38,999",
//     image: "https://images.pexels.com/photos/3293148/pexels-photo-3293148.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.7,
//     travelers: 1560,
//     badge: "Island"
//   }
// ];

// const InternationalToursSection: React.FC = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [visibleCards, setVisibleCards] = useState(4);

//   // Update visible cards based on screen size
//   useEffect(() => {
//     const updateVisibleCards = () => {
//       if (window.innerWidth < 768) {
//         setVisibleCards(1);
//       } else if (window.innerWidth < 1024) {
//         setVisibleCards(2);
//       } else {
//         setVisibleCards(4);
//       }
//     };

//     updateVisibleCards();
//     window.addEventListener('resize', updateVisibleCards);
//     return () => window.removeEventListener('resize', updateVisibleCards);
//   }, []);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === internationalTours.length - visibleCards ? 0 : prevIndex + 1
//     );
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === 0 ? internationalTours.length - visibleCards : prevIndex - 1
//     );
//   };

//   // Auto slide every 5 seconds
//   useEffect(() => {
//     const timer = setInterval(() => {
//       nextSlide();
//     }, 5000);

//     return () => clearInterval(timer);
//   }, [currentIndex, visibleCards]);

//   return (
//     <section className="py-12 bg-gradient-to-br from-red-50 to-pink-50/30">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header Section - Compact */}
//         <div className="text-center mb-10">
//           <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium mb-3">
//             <MapPin className="h-3 w-3" />
//             Explore World
//           </div>
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
//             Best{" "}
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-600">
//               International Tours
//             </span>
//           </h2>
//           <p className="text-gray-600 max-w-2xl mx-auto text-sm leading-relaxed">
//             Discover amazing destinations worldwide with our handpicked international tour packages.
//           </p>
//         </div>

//         {/* Compact Carousel Container */}
//         <div className="bg-white rounded-2xl shadow-lg p-6 mb-12 border border-gray-100">
//           {/* Carousel Header */}
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h3 className="text-xl font-bold text-gray-900">
//                 Global Destinations
//               </h3>
//               <p className="text-gray-600 text-sm">
//                 Curated experiences around the world
//               </p>
//             </div>
//             <div className="flex items-center gap-3">
//               <div className="hidden sm:flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
//                 <span className="text-xs text-gray-600">
//                   {currentIndex + 1}/{internationalTours.length - visibleCards + 1}
//                 </span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={prevSlide}
//                   className="bg-red-600 hover:bg-red-700 text-white w-8 h-8 rounded-full flex items-center justify-center shadow transition-all duration-300"
//                 >
//                   <ChevronLeft className="h-4 w-4" />
//                 </button>
//                 <button
//                   onClick={nextSlide}
//                   className="bg-red-600 hover:bg-red-700 text-white w-8 h-8 rounded-full flex items-center justify-center shadow transition-all duration-300"
//                 >
//                   <ChevronRight className="h-4 w-4" />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Carousel Content */}
//           <div className="relative">
//             {/* Cards Container */}
//             <div className="overflow-hidden">
//               <div 
//                 className="flex transition-transform duration-500 ease-in-out gap-4"
//                 style={{ transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` }}
//               >
//                 {internationalTours.map((tour) => (
//                   <div
//                     key={tour.id}
//                     className="flex-shrink-0"
//                     style={{ width: `${100 / visibleCards}%` }}
//                   >
//                     <div className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-full border border-gray-100">
//                       {/* Tour Image */}
//                       <div className="relative h-40 overflow-hidden">
//                         <img
//                           src={tour.image}
//                           alt={tour.name}
//                           className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
//                         />
                        
//                         {/* Gradient Overlay */}
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        
//                         {/* Badge */}
//                         <div className="absolute top-2 left-2 z-10">
//                           <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold text-white ${
//                             tour.badge === "Beach" ? "bg-blue-500" :
//                             tour.badge === "Adventure" ? "bg-green-500" :
//                             tour.badge === "Cultural" ? "bg-purple-500" :
//                             tour.badge === "Romantic" ? "bg-pink-500" :
//                             tour.badge === "Luxury" ? "bg-yellow-500" :
//                             "bg-teal-500"
//                           }`}>
//                             {tour.badge}
//                           </span>
//                         </div>
                        
//                         {/* Rating */}
//                         <div className="absolute top-2 right-2 z-10 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
//                           <Star className="h-3 w-3 text-yellow-400 fill-current" />
//                           <span className="text-xs font-semibold text-white">{tour.rating}</span>
//                         </div>
//                       </div>

//                       {/* Tour Content */}
//                       <div className="p-4">
//                         <div className="flex items-start justify-between mb-2">
//                           <h3 className="text-sm font-semibold text-gray-900 group-hover:text-red-600 transition-colors duration-300 flex-1 pr-2 line-clamp-2">
//                             {tour.name}
//                           </h3>
//                           <div className="text-right">
//                             <div className="text-base font-bold text-red-600">{tour.price}</div>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-center gap-1 text-gray-600 mb-2">
//                           <MapPin className="h-3 w-3" />
//                           <span className="text-xs">{tour.location}</span>
//                         </div>
                        
//                         <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
//                           <div className="flex items-center gap-1">
//                             <Calendar className="h-3 w-3" />
//                             <span>{tour.duration}</span>
//                           </div>
//                           <div className="flex items-center gap-1">
//                             <Users className="h-3 w-3" />
//                             <span>{tour.travelers}+</span>
//                           </div>
//                         </div>
                        
//                         <button className="w-full bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-all duration-300">
//                           View Details
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Dot Indicators */}
//             <div className="flex justify-center mt-6 gap-1.5">
//               {Array.from({ length: internationalTours.length - visibleCards + 1 }).map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentIndex(index)}
//                   className={`w-2 h-2 rounded-full transition-all duration-300 ${
//                     index === currentIndex ? 'bg-red-600 w-6' : 'bg-gray-300'
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Compact Bottom CTA */}
//         <div className="text-center">
//           <button className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-xl shadow transition-all duration-300 transform hover:scale-105">
//             <MapPin className="h-4 w-4" />
//             Explore All Destinations
//             <ChevronRight className="h-4 w-4" />
//           </button>
//           <p className="mt-3 text-gray-600 text-sm">
//             Join 35,000+ travelers exploring the world
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default InternationalToursSection;



// import React, { useState, useEffect, useRef } from "react";
// import { ChevronLeft, ChevronRight, MapPin, Star, Users, Calendar } from "lucide-react";

// const internationalTours = [
//   {
//     id: 1,
//     name: "Bali Tropical Paradise",
//     location: "Indonesia",
//     duration: "7 Days",
//     price: "₹45,999",
//     image: "https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     travelers: 890,
//     badge: "Beach"
//   },
//   {
//     id: 2,
//     name: "Swiss Alps Adventure",
//     location: "Switzerland",
//     duration: "8 Days",
//     price: "₹89,999",
//     image: "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     travelers: 670,
//     badge: "Adventure"
//   },
//   {
//     id: 3,
//     name: "Tokyo City Experience",
//     location: "Japan",
//     duration: "6 Days",
//     price: "₹65,999",
//     image: "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.7,
//     travelers: 1120,
//     badge: "Cultural"
//   },
//   {
//     id: 4,
//     name: "Paris Romantic Getaway",
//     location: "France",
//     duration: "5 Days",
//     price: "₹72,999",
//     image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     travelers: 950,
//     badge: "Romantic"
//   },
//   {
//     id: 5,
//     name: "Dubai Luxury Escape",
//     location: "UAE",
//     duration: "4 Days",
//     price: "₹55,999",
//     image: "https://images.pexels.com/photos/1796715/pexels-photo-1796715.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.6,
//     travelers: 1340,
//     badge: "Luxury"
//   },
//   {
//     id: 6,
//     name: "Thailand Island Hopping",
//     location: "Thailand",
//     duration: "7 Days",
//     price: "₹38,999",
//     image: "https://images.pexels.com/photos/3293148/pexels-photo-3293148.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.7,
//     travelers: 1560,
//     badge: "Island"
//   }
// ];

// const InternationalToursSection: React.FC = () => {
//   const [visibleCards, setVisibleCards] = useState(4);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);
//   const scrollContainerRef = useRef<HTMLDivElement>(null);
//   const animationRef = useRef<number>();
//   const scrollPositionRef = useRef(0);
//   const isManualScrollingRef = useRef(false);

//   // Update visible cards based on screen size
//   useEffect(() => {
//     const updateVisibleCards = () => {
//       if (window.innerWidth < 768) {
//         setVisibleCards(1);
//       } else if (window.innerWidth < 1024) {
//         setVisibleCards(2);
//       } else {
//         setVisibleCards(4);
//       }
//     };

//     updateVisibleCards();
//     window.addEventListener('resize', updateVisibleCards);
//     return () => window.removeEventListener('resize', updateVisibleCards);
//   }, []);

//   // Continuous smooth scrolling animation
//   useEffect(() => {
//     if (!isAutoPlaying || !scrollContainerRef.current || isManualScrollingRef.current) return;

//     const scrollContainer = scrollContainerRef.current;
//     const scrollWidth = scrollContainer.scrollWidth / 2; // Since we duplicated the cards
//     const clientWidth = scrollContainer.clientWidth;

//     const animateScroll = () => {
//       scrollPositionRef.current += 0.8; // Adjust speed here (higher = faster)
      
//       // Reset to start when reaching the duplicated section
//       if (scrollPositionRef.current >= scrollWidth) {
//         scrollPositionRef.current = 0;
//       }
      
//       scrollContainer.scrollLeft = scrollPositionRef.current;
//       animationRef.current = requestAnimationFrame(animateScroll);
//     };

//     animationRef.current = requestAnimationFrame(animateScroll);

//     return () => {
//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current);
//       }
//     };
//   }, [isAutoPlaying]);

//   const nextSlide = () => {
//     if (scrollContainerRef.current) {
//       isManualScrollingRef.current = true;
//       setIsAutoPlaying(false);
      
//       const scrollContainer = scrollContainerRef.current;
//       const cardWidth = scrollContainer.scrollWidth / (internationalTours.length * 2);
//       const scrollAmount = cardWidth * visibleCards;
//       const newScrollPosition = scrollContainer.scrollLeft + scrollAmount;
      
//       scrollContainer.scrollTo({
//         left: newScrollPosition,
//         behavior: 'smooth'
//       });

//       // Update the scroll position reference
//       scrollPositionRef.current = newScrollPosition;

//       // Resume auto-play after a delay
//       setTimeout(() => {
//         isManualScrollingRef.current = false;
//         setIsAutoPlaying(true);
//       }, 3000); // Resume after 3 seconds
//     }
//   };

//   const prevSlide = () => {
//     if (scrollContainerRef.current) {
//       isManualScrollingRef.current = true;
//       setIsAutoPlaying(false);
      
//       const scrollContainer = scrollContainerRef.current;
//       const cardWidth = scrollContainer.scrollWidth / (internationalTours.length * 2);
//       const scrollAmount = cardWidth * visibleCards;
//       let newScrollPosition = scrollContainer.scrollLeft - scrollAmount;
      
//       // Handle going backwards past the start
//       if (newScrollPosition < 0) {
//         newScrollPosition = scrollContainer.scrollWidth / 2 - scrollAmount;
//       }
      
//       scrollContainer.scrollTo({
//         left: newScrollPosition,
//         behavior: 'smooth'
//       });

//       // Update the scroll position reference
//       scrollPositionRef.current = newScrollPosition;

//       // Resume auto-play after a delay
//       setTimeout(() => {
//         isManualScrollingRef.current = false;
//         setIsAutoPlaying(true);
//       }, 3000); // Resume after 3 seconds
//     }
//   };

//   // Stop auto-play when hovering on any card
//   const handleCardMouseEnter = () => {
//     setIsAutoPlaying(false);
//   };

//   // Resume auto-play when leaving card
//   const handleCardMouseLeave = () => {
//     if (!isManualScrollingRef.current) {
//       setIsAutoPlaying(true);
//     }
//   };

//   return (
//     <section className="py-0 bg-gradient-to-br from-sky-200 via-sky-200 to-sky-200">
//       {/* Full Width Header Strip */}
//       <div className="w-full bg-gradient-to-r from-[#0F1F5C] via-[#1F3F93] to-[#0F1F5C] py-8 mb-10 shadow-lg">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <h2
//               className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight"
//               style={{
//                 fontFamily: "'Baloo 2', sans-serif",
//                 color: "white",
//                 letterSpacing: "-2px",
//                 textShadow: `
//                   2px 2px 0 #1F3F93,
//                   -2px -2px 0 #1F3F93,
//                   0 0 18px rgba(255,255,255,0.65)
//                 `,
//               }}
//             >
//               International <span className="text-[#E31B23]">Tours</span>
//             </h2>
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Compact Carousel Container */}
//         <div className="bg-white rounded-2xl shadow-lg p-6 mb-12 border border-gray-100">
//           {/* Carousel Header */}
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h3 className="text-xl font-bold text-gray-900">
//                 Global Destinations
//               </h3>
//               <p className="text-gray-600 text-sm">
//                 Curated experiences around the world
//               </p>
//             </div>
//             <div className="flex items-center gap-3">
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={prevSlide}
//                   className="bg-red-600 hover:bg-red-700 text-white w-8 h-8 rounded-full flex items-center justify-center shadow transition-all duration-300 hover:scale-110 active:scale-95"
//                 >
//                   <ChevronLeft className="h-4 w-4" />
//                 </button>
//                 <button
//                   onClick={nextSlide}
//                   className="bg-red-600 hover:bg-red-700 text-white w-8 h-8 rounded-full flex items-center justify-center shadow transition-all duration-300 hover:scale-110 active:scale-95"
//                 >
//                   <ChevronRight className="h-4 w-4" />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Carousel Content */}
//           <div className="relative">
//             {/* Cards Container with Continuous Scroll */}
//             <div 
//               ref={scrollContainerRef}
//               className="flex gap-4 overflow-x-auto scrollbar-hide"
//               style={{ 
//                 scrollBehavior: 'auto',
//               }}
//             >
//               {/* Duplicate cards for seamless looping */}
//               {[...internationalTours, ...internationalTours].map((tour, index) => (
//                 <div
//                   key={`${tour.id}-${index}`}
//                   className="flex-shrink-0"
//                   style={{ width: `calc(${100 / visibleCards}% - 16px)` }}
//                   onMouseEnter={handleCardMouseEnter}
//                   onMouseLeave={handleCardMouseLeave}
//                 >
//                   <div className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-full border border-gray-100">
//                     {/* Tour Image */}
//                     <div className="relative h-40 overflow-hidden">
//                       <img
//                         src={tour.image}
//                         alt={tour.name}
//                         className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
//                       />
                      
//                       {/* Gradient Overlay */}
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      
//                       {/* Badge */}
//                       <div className="absolute top-2 left-2 z-10">
//                         <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold text-white ${
//                           tour.badge === "Beach" ? "bg-blue-500" :
//                           tour.badge === "Adventure" ? "bg-green-500" :
//                           tour.badge === "Cultural" ? "bg-purple-500" :
//                           tour.badge === "Romantic" ? "bg-pink-500" :
//                           tour.badge === "Luxury" ? "bg-yellow-500" :
//                           "bg-teal-500"
//                         }`}>
//                           {tour.badge}
//                         </span>
//                       </div>
                      
//                       {/* Rating */}
//                       <div className="absolute top-2 right-2 z-10 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
//                         <Star className="h-3 w-3 text-yellow-400 fill-current" />
//                         <span className="text-xs font-semibold text-white">{tour.rating}</span>
//                       </div>
//                     </div>

//                     {/* Tour Content */}
//                     <div className="p-4">
//                       <div className="flex items-start justify-between mb-2">
//                         <h3 className="text-sm font-semibold text-gray-900 group-hover:text-red-600 transition-colors duration-300 flex-1 pr-2 line-clamp-2">
//                           {tour.name}
//                         </h3>
//                         <div className="text-right">
//                           <div className="text-base font-bold text-red-600">{tour.price}</div>
//                         </div>
//                       </div>
                      
//                       <div className="flex items-center gap-1 text-gray-600 mb-2">
//                         <MapPin className="h-3 w-3" />
//                         <span className="text-xs">{tour.location}</span>
//                       </div>
                      
//                       <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
//                         <div className="flex items-center gap-1">
//                           <Calendar className="h-3 w-3" />
//                           <span>{tour.duration}</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Users className="h-3 w-3" />
//                           <span>{tour.travelers}+</span>
//                         </div>
//                       </div>
                      
//                       <button className="w-full bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-all duration-300 transform hover:scale-105">
//                         View Details
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Auto-play Status Indicator */}
//             <div className="flex justify-center items-center mt-6 gap-2">
//               <div className={`w-2 h-2 rounded-full ${
//                 isAutoPlaying ? 'bg-green-500 animate-pulse' : 'bg-red-500'
//               }`} />
//               <span className="text-xs text-gray-500">
//                 {isAutoPlaying ? 'Auto-scrolling' : 'Paused'}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Compact Bottom CTA */}
//         <div className="text-center">
//           <button className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-xl shadow transition-all duration-300 transform hover:scale-105">
//             <MapPin className="h-4 w-4" />
//             Explore All Destinations
//             <ChevronRight className="h-4 w-4" />
//           </button>
//           <p className="mt-3 text-gray-600 text-sm">
//             Join 35,000+ travelers exploring the world
//           </p>
//         </div>
//       </div>

//       {/* Hide scrollbar styles */}
//       <style jsx>{`
//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default InternationalToursSection;




// import React, { useState, useEffect, useRef } from "react";
// import { ChevronLeft, ChevronRight, MapPin, Star, Users, Calendar } from "lucide-react";

// const internationalTours = [
//   {
//     id: 1,
//     name: "Bali Tropical Paradise",
//     location: "Indonesia",
//     duration: "7 Days",
//     price: "₹45,999",
//     image: "https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     travelers: 890,
//     badge: "Beach"
//   },
//   {
//     id: 2,
//     name: "Swiss Alps Adventure",
//     location: "Switzerland",
//     duration: "8 Days",
//     price: "₹89,999",
//     image: "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     travelers: 670,
//     badge: "Adventure"
//   },
//   {
//     id: 3,
//     name: "Tokyo City Experience",
//     location: "Japan",
//     duration: "6 Days",
//     price: "₹65,999",
//     image: "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.7,
//     travelers: 1120,
//     badge: "Cultural"
//   },
//   {
//     id: 4,
//     name: "Paris Romantic Getaway",
//     location: "France",
//     duration: "5 Days",
//     price: "₹72,999",
//     image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     travelers: 950,
//     badge: "Romantic"
//   },
//   {
//     id: 5,
//     name: "Dubai Luxury Escape",
//     location: "UAE",
//     duration: "4 Days",
//     price: "₹55,999",
//     image: "https://images.pexels.com/photos/1796715/pexels-photo-1796715.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.6,
//     travelers: 1340,
//     badge: "Luxury"
//   },
//   {
//     id: 6,
//     name: "Thailand Island Hopping",
//     location: "Thailand",
//     duration: "7 Days",
//     price: "₹38,999",
//     image: "https://images.pexels.com/photos/3293148/pexels-photo-3293148.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.7,
//     travelers: 1560,
//     badge: "Island"
//   }
// ];

// const InternationalToursSection: React.FC = () => {
//   const [visibleCards, setVisibleCards] = useState(4);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);
//   const scrollContainerRef = useRef<HTMLDivElement>(null);
//   const animationRef = useRef<number>();
//   const scrollPositionRef = useRef(0);
//   const isManualScrollingRef = useRef(false);

//   // Update visible cards based on screen size
//   useEffect(() => {
//     const updateVisibleCards = () => {
//       if (window.innerWidth < 768) {
//         setVisibleCards(1);
//       } else if (window.innerWidth < 1024) {
//         setVisibleCards(2);
//       } else {
//         setVisibleCards(4);
//       }
//     };

//     updateVisibleCards();
//     window.addEventListener('resize', updateVisibleCards);
//     return () => window.removeEventListener('resize', updateVisibleCards);
//   }, []);

//   // Continuous smooth scrolling animation
//   useEffect(() => {
//     if (!isAutoPlaying || !scrollContainerRef.current || isManualScrollingRef.current) return;

//     const scrollContainer = scrollContainerRef.current;
//     const scrollWidth = scrollContainer.scrollWidth / 2; // Since we duplicated the cards
//     const clientWidth = scrollContainer.clientWidth;

//     const animateScroll = () => {
//       scrollPositionRef.current += 0.8; // Adjust speed here (higher = faster)
      
//       // Reset to start when reaching the duplicated section
//       if (scrollPositionRef.current >= scrollWidth) {
//         scrollPositionRef.current = 0;
//       }
      
//       scrollContainer.scrollLeft = scrollPositionRef.current;
//       animationRef.current = requestAnimationFrame(animateScroll);
//     };

//     animationRef.current = requestAnimationFrame(animateScroll);

//     return () => {
//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current);
//       }
//     };
//   }, [isAutoPlaying]);

//   const nextSlide = () => {
//     if (scrollContainerRef.current) {
//       isManualScrollingRef.current = true;
//       setIsAutoPlaying(false);
      
//       const scrollContainer = scrollContainerRef.current;
//       const cardWidth = scrollContainer.scrollWidth / (internationalTours.length * 2);
//       const scrollAmount = cardWidth * visibleCards;
//       const newScrollPosition = scrollContainer.scrollLeft + scrollAmount;
      
//       scrollContainer.scrollTo({
//         left: newScrollPosition,
//         behavior: 'smooth'
//       });

//       // Update the scroll position reference
//       scrollPositionRef.current = newScrollPosition;

//       // Resume auto-play after a delay
//       setTimeout(() => {
//         isManualScrollingRef.current = false;
//         setIsAutoPlaying(true);
//       }, 3000); // Resume after 3 seconds
//     }
//   };

//   const prevSlide = () => {
//     if (scrollContainerRef.current) {
//       isManualScrollingRef.current = true;
//       setIsAutoPlaying(false);
      
//       const scrollContainer = scrollContainerRef.current;
//       const cardWidth = scrollContainer.scrollWidth / (internationalTours.length * 2);
//       const scrollAmount = cardWidth * visibleCards;
//       let newScrollPosition = scrollContainer.scrollLeft - scrollAmount;
      
//       // Handle going backwards past the start
//       if (newScrollPosition < 0) {
//         newScrollPosition = scrollContainer.scrollWidth / 2 - scrollAmount;
//       }
      
//       scrollContainer.scrollTo({
//         left: newScrollPosition,
//         behavior: 'smooth'
//       });

//       // Update the scroll position reference
//       scrollPositionRef.current = newScrollPosition;

//       // Resume auto-play after a delay
//       setTimeout(() => {
//         isManualScrollingRef.current = false;
//         setIsAutoPlaying(true);
//       }, 3000); // Resume after 3 seconds
//     }
//   };

//   // Stop auto-play when hovering on any card
//   const handleCardMouseEnter = () => {
//     setIsAutoPlaying(false);
//   };

//   // Resume auto-play when leaving card
//   const handleCardMouseLeave = () => {
//     if (!isManualScrollingRef.current) {
//       setIsAutoPlaying(true);
//     }
//   };

//   return (
//     <section className="py-0 bg-gradient-to-br from-sky-200 via-sky-200 to-sky-200">
//       {/* Full Width Header Strip */}
//       <div className="w-full bg-gradient-to-r from-[#0F1F5C] via-[#1F3F93] to-[#0F1F5C] py-8 mb-10 shadow-lg">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <h2
//               className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight"
//               style={{
//                 fontFamily: "'Baloo 2', sans-serif",
//                 color: "white",
//                 letterSpacing: "-2px",
//                 textShadow: `
//                   2px 2px 0 #1F3F93,
//                   -2px -2px 0 #1F3F93,
//                   0 0 18px rgba(255,255,255,0.65)
//                 `,
//               }}
//             >
//               International <span className="text-[#E31B23]">Tours</span>
//             </h2>
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Carousel Container with Gradient Background */}
//         <div 
//           className="rounded-2xl shadow-lg p-6 mb-12 border border-gray-100 relative overflow-hidden"
//           style={{
//             background: 'radial-gradient(circle at center, #f8fafc 0%, #1F3F93 100%)',
//           }}
//         >
//           {/* Additional overlay for better gradient effect */}
//           <div 
//             className="absolute inset-0 pointer-events-none"
//             style={{
//               background: 'radial-gradient(circle at center, transparent 30%, #0F1F5C 150%)',
//             }}
//           />
          
//           {/* Content */}
//           <div className="relative z-10">
//             {/* Carousel Header */}
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h3 className="text-xl font-bold text-white drop-shadow-lg">
//                   Global Destinations
//                 </h3>
//                 <p className="text-white/80 text-sm drop-shadow">
//                   Curated experiences around the world
//                 </p>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={prevSlide}
//                     className="bg-red-600 hover:bg-red-700 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 border border-white/20"
//                   >
//                     <ChevronLeft className="h-4 w-4" />
//                   </button>
//                   <button
//                     onClick={nextSlide}
//                     className="bg-red-600 hover:bg-red-700 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 border border-white/20"
//                   >
//                     <ChevronRight className="h-4 w-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Carousel Content */}
//             <div className="relative">
//               {/* Cards Container with Continuous Scroll */}
//               <div 
//                 ref={scrollContainerRef}
//                 className="flex gap-4 overflow-x-auto scrollbar-hide"
//                 style={{ 
//                   scrollBehavior: 'auto',
//                 }}
//               >
//                 {/* Duplicate cards for seamless looping */}
//                 {[...internationalTours, ...internationalTours].map((tour, index) => (
//                   <div
//                     key={`${tour.id}-${index}`}
//                     className="flex-shrink-0"
//                     style={{ width: `calc(${100 / visibleCards}% - 16px)` }}
//                     onMouseEnter={handleCardMouseEnter}
//                     onMouseLeave={handleCardMouseLeave}
//                   >
//                     <div className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full border border-white/20 backdrop-blur-sm">
//                       {/* Tour Image */}
//                       <div className="relative h-40 overflow-hidden">
//                         <img
//                           src={tour.image}
//                           alt={tour.name}
//                           className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
//                         />
                        
//                         {/* Gradient Overlay */}
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
//                         {/* Badge */}
//                         <div className="absolute top-2 left-2 z-10">
//                           <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold text-white ${
//                             tour.badge === "Beach" ? "bg-blue-500" :
//                             tour.badge === "Adventure" ? "bg-green-500" :
//                             tour.badge === "Cultural" ? "bg-purple-500" :
//                             tour.badge === "Romantic" ? "bg-pink-500" :
//                             tour.badge === "Luxury" ? "bg-yellow-500" :
//                             "bg-teal-500"
//                           } shadow-lg`}>
//                             {tour.badge}
//                           </span>
//                         </div>
                        
//                         {/* Rating */}
//                         <div className="absolute top-2 right-2 z-10 flex items-center gap-1 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 border border-white/20">
//                           <Star className="h-3 w-3 text-yellow-400 fill-current" />
//                           <span className="text-xs font-semibold text-white">{tour.rating}</span>
//                         </div>
//                       </div>

//                       {/* Tour Content */}
//                       <div className="p-4 bg-white/95 backdrop-blur-sm">
//                         <div className="flex items-start justify-between mb-2">
//                           <h3 className="text-sm font-semibold text-gray-900 group-hover:text-red-600 transition-colors duration-300 flex-1 pr-2 line-clamp-2">
//                             {tour.name}
//                           </h3>
//                           <div className="text-right">
//                             <div className="text-base font-bold text-red-600">{tour.price}</div>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-center gap-1 text-gray-600 mb-2">
//                           <MapPin className="h-3 w-3" />
//                           <span className="text-xs">{tour.location}</span>
//                         </div>
                        
//                         <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
//                           <div className="flex items-center gap-1">
//                             <Calendar className="h-3 w-3" />
//                             <span>{tour.duration}</span>
//                           </div>
//                           <div className="flex items-center gap-1">
//                             <Users className="h-3 w-3" />
//                             <span>{tour.travelers}+</span>
//                           </div>
//                         </div>
                        
//                         <button className="w-full bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg border border-white/20">
//                           View Details
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Auto-play Status Indicator */}
//               <div className="flex justify-center items-center mt-6 gap-2">
//                 <div className={`w-2 h-2 rounded-full ${
//                   isAutoPlaying ? 'bg-green-400 animate-pulse' : 'bg-red-400'
//                 } shadow-lg`} />
//                 <span className="text-xs text-white drop-shadow-lg">
//                   {isAutoPlaying ? 'Auto-scrolling' : 'Paused'}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Compact Bottom CTA */}
//         <div className="text-center">
//           <button className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 border border-white/20">
//             <MapPin className="h-4 w-4" />
//             Explore All Destinations
//             <ChevronRight className="h-4 w-4" />
//           </button>
//           <p className="mt-3 text-gray-700 text-sm font-medium">
//             Join 35,000+ travelers exploring the world
//           </p>
//         </div>
//       </div>

//       {/* Hide scrollbar styles */}
//       <style jsx>{`
//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default InternationalToursSection;




import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, MapPin, Star, Users, Calendar } from "lucide-react";
import "./InternationalToursSection.css";

const internationalTours = [
  {
    id: 1,
    name: "Bali Tropical Paradise",
    location: "Indonesia",
    duration: "7 Days",
    price: "₹45,999",
    image: "https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.8,
    travelers: 890,
    badge: "Beach"
  },
  {
    id: 2,
    name: "Swiss Alps Adventure",
    location: "Switzerland",
    duration: "8 Days",
    price: "₹89,999",
    image: "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.9,
    travelers: 670,
    badge: "Adventure"
  },
  {
    id: 3,
    name: "Tokyo City Experience",
    location: "Japan",
    duration: "6 Days",
    price: "₹65,999",
    image: "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.7,
    travelers: 1120,
    badge: "Cultural"
  },
  {
    id: 4,
    name: "Paris Romantic Getaway",
    location: "France",
    duration: "5 Days",
    price: "₹72,999",
    image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.8,
    travelers: 950,
    badge: "Romantic"
  },
  {
    id: 5,
    name: "Dubai Luxury Escape",
    location: "UAE",
    duration: "4 Days",
    price: "₹55,999",
    image: "https://images.pexels.com/photos/1796715/pexels-photo-1796715.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.6,
    travelers: 1340,
    badge: "Luxury"
  },
  {
    id: 6,
    name: "Thailand Island Hopping",
    location: "Thailand",
    duration: "7 Days",
    price: "₹38,999",
    image: "https://images.pexels.com/photos/3293148/pexels-photo-3293148.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.7,
    travelers: 1560,
    badge: "Island"
  }
];

const InternationalToursSection: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState(4);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const scrollPositionRef = useRef(0);
  const isManualScrollingRef = useRef(false);

  // Update visible cards based on screen size
  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 768) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(4);
      }
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  // Continuous smooth scrolling animation
  useEffect(() => {
    if (!isAutoPlaying || !scrollContainerRef.current || isManualScrollingRef.current) return;

    const scrollContainer = scrollContainerRef.current;
    const scrollWidth = scrollContainer.scrollWidth / 2; // Since we duplicated the cards
    const clientWidth = scrollContainer.clientWidth;

    const animateScroll = () => {
      scrollPositionRef.current += 0.8; // Adjust speed here (higher = faster)
      
      // Reset to start when reaching the duplicated section
      if (scrollPositionRef.current >= scrollWidth) {
        scrollPositionRef.current = 0;
      }
      
      scrollContainer.scrollLeft = scrollPositionRef.current;
      animationRef.current = requestAnimationFrame(animateScroll);
    };

    animationRef.current = requestAnimationFrame(animateScroll);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAutoPlaying]);

  const nextSlide = () => {
    if (scrollContainerRef.current) {
      isManualScrollingRef.current = true;
      setIsAutoPlaying(false);
      
      const scrollContainer = scrollContainerRef.current;
      const cardWidth = scrollContainer.scrollWidth / (internationalTours.length * 2);
      const scrollAmount = cardWidth * visibleCards;
      const newScrollPosition = scrollContainer.scrollLeft + scrollAmount;
      
      scrollContainer.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });

      // Update the scroll position reference
      scrollPositionRef.current = newScrollPosition;

      // Resume auto-play after a delay
      setTimeout(() => {
        isManualScrollingRef.current = false;
        setIsAutoPlaying(true);
      }, 3000); // Resume after 3 seconds
    }
  };

  const prevSlide = () => {
    if (scrollContainerRef.current) {
      isManualScrollingRef.current = true;
      setIsAutoPlaying(false);
      
      const scrollContainer = scrollContainerRef.current;
      const cardWidth = scrollContainer.scrollWidth / (internationalTours.length * 2);
      const scrollAmount = cardWidth * visibleCards;
      let newScrollPosition = scrollContainer.scrollLeft - scrollAmount;
      
      // Handle going backwards past the start
      if (newScrollPosition < 0) {
        newScrollPosition = scrollContainer.scrollWidth / 2 - scrollAmount;
      }
      
      scrollContainer.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });

      // Update the scroll position reference
      scrollPositionRef.current = newScrollPosition;

      // Resume auto-play after a delay
      setTimeout(() => {
        isManualScrollingRef.current = false;
        setIsAutoPlaying(true);
      }, 3000); // Resume after 3 seconds
    }
  };

  // Stop auto-play when hovering on any card
  const handleCardMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  // Resume auto-play when leaving card
  const handleCardMouseLeave = () => {
    if (!isManualScrollingRef.current) {
      setIsAutoPlaying(true);
    }
  };

  return (
    <section className="py-0 bg-gradient-to-br from-sky-200 via-sky-200 to-sky-200">
      {/* Full Width Header Strip */}
      <div className="w-full bg-gradient-to-r from-[#0F1F5C] via-[#1F3F93] to-[#0F1F5C] py-8 mb-10 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2
              className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight"
              style={{
                fontFamily: "'Baloo 2', sans-serif",
                color: "white",
                letterSpacing: "-2px",
                textShadow: `
                  2px 2px 0 #1F3F93,
                  -2px -2px 0 #1F3F93,
                  0 0 18px rgba(255,255,255,0.65)
                `,
              }}
            >
              International <span className="text-[#E31B23]">Tours</span>
            </h2>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Carousel Container with Gradient Background */}
        <div 
          className="rounded-2xl shadow-lg p-6 mb-12 border border-gray-100 relative overflow-hidden"
          style={{
            background: 'radial-gradient(circle at center, #5a92edff 0%, #4c70e7ff 30%, #0F1F5C 70%, #0A1128 100%)',
          }}
        >
          {/* Additional Light Center Overlay */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
            }}
          />
          
          {/* Content */}
          <div className="relative z-10">
            {/* Carousel Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white drop-shadow-lg">
                  International Tours
                </h3>
                <p className="text-white/80 text-sm drop-shadow">
                  Curated experiences around the world
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevSlide}
                    className="bg-red-600 hover:bg-red-700 text-white w-8 h-8 rounded-full flex items-center justify-center shadow transition-all duration-300 hover:scale-110 active:scale-95 border border-white/20"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="bg-red-600 hover:bg-red-700 text-white w-8 h-8 rounded-full flex items-center justify-center shadow transition-all duration-300 hover:scale-110 active:scale-95 border border-white/20"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Carousel Content */}
            <div className="relative">
              {/* Cards Container with Continuous Scroll */}
              <div 
                ref={scrollContainerRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide"
                style={{ 
                  scrollBehavior: 'auto',
                }}
              >
                {/* Duplicate cards for seamless looping */}
                {[...internationalTours, ...internationalTours].map((tour, index) => (
                  <div
                    key={`${tour.id}-${index}`}
                    className="flex-shrink-0"
                    style={{ width: `calc(${100 / visibleCards}% - 16px)` }}
                    onMouseEnter={handleCardMouseEnter}
                    onMouseLeave={handleCardMouseLeave}
                  >
                    <div className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-full border border-gray-100">
                      {/* Tour Image */}
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={tour.image}
                          alt={tour.name}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        
                        {/* Badge */}
                        <div className="absolute top-2 left-2 z-10">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold text-white ${
                            tour.badge === "Beach" ? "bg-blue-500" :
                            tour.badge === "Adventure" ? "bg-green-500" :
                            tour.badge === "Cultural" ? "bg-purple-500" :
                            tour.badge === "Romantic" ? "bg-pink-500" :
                            tour.badge === "Luxury" ? "bg-yellow-500" :
                            "bg-teal-500"
                          }`}>
                            {tour.badge}
                          </span>
                        </div>
                        
                        {/* Rating */}
                        <div className="absolute top-2 right-2 z-10 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span className="text-xs font-semibold text-white">{tour.rating}</span>
                        </div>
                      </div>

                      {/* Tour Content */}
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-sm font-semibold text-gray-900 group-hover:text-red-600 transition-colors duration-300 flex-1 pr-2 line-clamp-2">
                            {tour.name}
                          </h3>
                          <div className="text-right">
                            <div className="text-base font-bold text-red-600">{tour.price}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1 text-gray-600 mb-2">
                          <MapPin className="h-3 w-3" />
                          <span className="text-xs">{tour.location}</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{tour.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span>{tour.travelers}+</span>
                          </div>
                        </div>
                        
                        <button className="w-full bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-all duration-300 transform hover:scale-105">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Auto-play Status Indicator */}
              <div className="flex justify-center items-center mt-6 gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  isAutoPlaying ? 'bg-green-400 animate-pulse' : 'bg-red-400'
                }`} />
                <span className="text-xs text-white drop-shadow-lg">
                  {isAutoPlaying ? 'Auto-scrolling' : 'Paused'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Bottom CTA */}
        <div className="text-center">
          <button className="inline-flex items-center mb-6 gap-2 bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-xl shadow transition-all duration-300 transform hover:scale-105 border border-white/20">
            <MapPin className="h-4 w-4" />
            Explore All Destinations
            <ChevronRight className="h-4 w-4" />
          </button>
          {/* <p className="mt-3 text-gray-600 text-sm">
            Join 35,000+ travelers exploring the world
          </p> */}
        </div>
      </div>

      
     
    </section>
  );
};

export default InternationalToursSection;