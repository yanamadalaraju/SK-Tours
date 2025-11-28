// import React, { useState, useEffect, useRef } from "react";
// import { ChevronLeft, ChevronRight, MapPin, Star, Users, Calendar, GraduationCap } from "lucide-react";

// const studentTours = [
//   {
//     id: 1,
//     name: "Backpacking Himalayas",
//     location: "Manali to Leh",
//     duration: "7 Days",
//     price: "₹8,999",
//     image: "https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.7,
//     travelers: 2890,
//     badge: "Adventure"
//   },
//   {
//     id: 2,
//     name: "Goa Beach Hopping",
//     location: "North Goa",
//     duration: "4 Days",
//     price: "₹6,499",
//     image: "https://images.pexels.com/photos/2431387/pexels-photo-2431387.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.5,
//     travelers: 3450,
//     badge: "Beach"
//   },
//   {
//     id: 3,
//     name: "Rishikesh Adventure Camp",
//     location: "Rishikesh",
//     duration: "3 Days",
//     price: "₹4,999",
//     image: "https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.6,
//     travelers: 2120,
//     badge: "Extreme"
//   },
//   {
//     id: 4,
//     name: "Rajasthan Heritage Trail",
//     location: "Jaipur & Udaipur",
//     duration: "5 Days",
//     price: "₹7,999",
//     image: "https://images.pexels.com/photos/3581364/pexels-photo-3581364.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.4,
//     travelers: 1780,
//     badge: "Heritage"
//   },
//   {
//     id: 5,
//     name: "Kerala Backpacking",
//     location: "Munnar & Alleppey",
//     duration: "6 Days",
//     price: "₹9,499",
//     image: "https://images.pexels.com/photos/427679/pexels-photo-427679.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     travelers: 1560,
//     badge: "Nature"
//   },
//   {
//     id: 6,
//     name: "Spiti Valley Road Trip",
//     location: "Spiti Valley",
//     duration: "8 Days",
//     price: "₹12,999",
//     image: "https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     travelers: 980,
//     badge: "Road Trip"
//   },
//   {
//     id: 7,
//     name: "Varanasi Cultural Immersion",
//     location: "Varanasi",
//     duration: "3 Days",
//     price: "₹5,499",
//     image: "https://images.pexels.com/photos/3581364/pexels-photo-3581364.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.3,
//     travelers: 1340,
//     badge: "Cultural"
//   },
//   {
//     id: 8,
//     name: "Dandeli Wildlife Adventure",
//     location: "Dandeli",
//     duration: "3 Days",
//     price: "₹5,999",
//     image: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.7,
//     travelers: 1670,
//     badge: "Wildlife"
//   }
// ];

// const StudentToursSection: React.FC = () => {
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
//       const cardWidth = scrollContainer.scrollWidth / (studentTours.length * 2);
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
//       const cardWidth = scrollContainer.scrollWidth / (studentTours.length * 2);
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
//               Student <span className="text-[#E31B23]">Tours</span>
//             </h2>
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Compact Carousel Container with Gradient Background */}
//         <div 
//           className="rounded-2xl shadow-lg p-6 mb-12 border border-gray-100 relative overflow-hidden"
//           style={{
//             background: 'radial-gradient(circle at center, #5a92edff 0%, #4c70e7ff 30%, #0F1F5C 70%, #0A1128 100%)',
//           }}
//         >
//           {/* Additional Light Center Overlay */}
//           <div 
//             className="absolute inset-0 pointer-events-none"
//             style={{
//               background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
//             }}
//           />
          
//           {/* Content */}
//           <div className="relative z-10">
//             {/* Carousel Header */}
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h3 className="text-xl font-bold text-white drop-shadow-lg">
//                   Budget-Friendly Adventures
//                 </h3>
//                 <p className="text-white/80 text-sm drop-shadow">
//                   Affordable tours designed for students
//                 </p>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={prevSlide}
//                     className="bg-red-600 hover:bg-red-700 text-white w-8 h-8 rounded-full flex items-center justify-center shadow transition-all duration-300 hover:scale-110 active:scale-95 border border-white/20"
//                   >
//                     <ChevronLeft className="h-4 w-4" />
//                   </button>
//                   <button
//                     onClick={nextSlide}
//                     className="bg-red-600 hover:bg-red-700 text-white w-8 h-8 rounded-full flex items-center justify-center shadow transition-all duration-300 hover:scale-110 active:scale-95 border border-white/20"
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
//                 {[...studentTours, ...studentTours].map((tour, index) => (
//                   <div
//                     key={`${tour.id}-${index}`}
//                     className="flex-shrink-0"
//                     style={{ width: `calc(${100 / visibleCards}% - 16px)` }}
//                     onMouseEnter={handleCardMouseEnter}
//                     onMouseLeave={handleCardMouseLeave}
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
                        
//                         {/* Student Special Badge */}
//                         <div className="absolute top-2 left-2 z-10">
//                           <span className="inline-flex items-center gap-1 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
//                             <GraduationCap className="h-3 w-3" />
//                             Student Deal
//                           </span>
//                         </div>
                        
//                         {/* Activity Badge */}
//                         <div className="absolute top-2 right-2 z-10">
//                           <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold text-white ${
//                             tour.badge === "Adventure" ? "bg-orange-500" :
//                             tour.badge === "Beach" ? "bg-blue-500" :
//                             tour.badge === "Extreme" ? "bg-red-500" :
//                             tour.badge === "Heritage" ? "bg-purple-500" :
//                             tour.badge === "Nature" ? "bg-green-500" :
//                             tour.badge === "Road Trip" ? "bg-yellow-500" :
//                             tour.badge === "Cultural" ? "bg-indigo-500" :
//                             tour.badge === "Wildlife" ? "bg-teal-500" :
//                             "bg-gray-500"
//                           }`}>
//                             {tour.badge}
//                           </span>
//                         </div>
                        
//                         {/* Rating */}
//                         <div className="absolute top-10 right-2 z-10 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
//                           <Star className="h-3 w-3 text-yellow-400 fill-current" />
//                           <span className="text-xs font-semibold text-white">{tour.rating}</span>
//                         </div>

//                         {/* Duration Badge */}
//                         <div className="absolute bottom-2 left-2 z-10">
//                           <span className="inline-flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
//                             <Calendar className="h-3 w-3" />
//                             {tour.duration}
//                           </span>
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
//                             <div className="text-xs text-gray-500">budget friendly</div>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-center gap-1 text-gray-600 mb-2">
//                           <MapPin className="h-3 w-3" />
//                           <span className="text-xs">{tour.location}</span>
//                         </div>
                        
//                         <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
//                           <div className="flex items-center gap-1">
//                             <Users className="h-3 w-3" />
//                             <span>{tour.travelers}+ students</span>
//                           </div>
//                         </div>
                        
//                         <button className="w-full bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-all duration-300 transform hover:scale-105">
//                           Grab This Deal
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
//                 }`} />
//                 <span className="text-xs text-white drop-shadow-lg">
//                   {isAutoPlaying ? 'Auto-scrolling' : 'Paused'}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Compact Bottom CTA */}
//         <div className="text-center">
//           <button className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-xl shadow transition-all duration-300 transform hover:scale-105 border border-white/20">
//             <GraduationCap className="h-4 w-4" />
//             Explore All Student Tours
//             <ChevronRight className="h-4 w-4" />
//           </button>
//           <p className="mt-3 text-gray-600 text-sm">
//             Perfect adventures for your college breaks and holidays
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

// export default StudentToursSection;






import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, MapPin, Star, Users, Calendar, GraduationCap } from "lucide-react";
import "./StudentToursSection.css";

const studentTours = [
  {
    id: 1,
    name: "Backpacking Himalayas",
    location: "Manali to Leh",
    duration: "7 Days",
    price: "₹8,999",
    image: "https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.7,
    travelers: 2890,
    badge: "Adventure"
  },
  {
    id: 2,
    name: "Goa Beach Hopping",
    location: "North Goa",
    duration: "4 Days",
    price: "₹6,499",
    image: "https://images.pexels.com/photos/2431387/pexels-photo-2431387.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.5,
    travelers: 3450,
    badge: "Beach"
  },
  {
    id: 3,
    name: "Rishikesh Adventure Camp",
    location: "Rishikesh",
    duration: "3 Days",
    price: "₹4,999",
    image: "https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.6,
    travelers: 2120,
    badge: "Extreme"
  },
  {
    id: 4,
    name: "Rajasthan Heritage Trail",
    location: "Jaipur & Udaipur",
    duration: "5 Days",
    price: "₹7,999",
    image: "https://images.pexels.com/photos/3581364/pexels-photo-3581364.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.4,
    travelers: 1780,
    badge: "Heritage"
  },
  {
    id: 5,
    name: "Kerala Backpacking",
    location: "Munnar & Alleppey",
    duration: "6 Days",
    price: "₹9,499",
    image: "https://images.pexels.com/photos/427679/pexels-photo-427679.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.8,
    travelers: 1560,
    badge: "Nature"
  },
  {
    id: 6,
    name: "Spiti Valley Road Trip",
    location: "Spiti Valley",
    duration: "8 Days",
    price: "₹12,999",
    image: "https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.9,
    travelers: 980,
    badge: "Road Trip"
  },
  {
    id: 7,
    name: "Varanasi Cultural Immersion",
    location: "Varanasi",
    duration: "3 Days",
    price: "₹5,499",
    image: "https://images.pexels.com/photos/3581364/pexels-photo-3581364.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.3,
    travelers: 1340,
    badge: "Cultural"
  },
  {
    id: 8,
    name: "Dandeli Wildlife Adventure",
    location: "Dandeli",
    duration: "3 Days",
    price: "₹5,999",
    image: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.7,
    travelers: 1670,
    badge: "Wildlife"
  }
];

const StudentToursSection: React.FC = () => {
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
      const cardWidth = scrollContainer.scrollWidth / (studentTours.length * 2);
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
      const cardWidth = scrollContainer.scrollWidth / (studentTours.length * 2);
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
              Student <span className="text-[#E31B23]">Tours</span>
            </h2>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Carousel Container with Gradient Background */}
        <div 
          className="rounded-2xl shadow-lg p-6 mb-12 border border-gray-100 relative overflow-hidden"
          style={{
            background: 'radial-gradient(circle at center, #3B82F6 0%, #1E40AF 30%, #0F1F5C 70%, #0A1128 100%)',
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
                {/* <h3 className="text-xl font-bold text-white drop-shadow-lg">
                  Budget-Friendly Adventures
                </h3> */}

                 <h3 className="text-xl font-bold text-white drop-shadow-lg">
                  Student Tours
                </h3>
                <p className="text-white/80 text-sm drop-shadow">
                  Affordable tours designed for students
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevSlide}
                    className="bg-blue-600 hover:bg-blue-700 text-white w-8 h-8 rounded-full flex items-center justify-center shadow transition-all duration-300 hover:scale-110 active:scale-95 border border-white/20"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="bg-blue-600 hover:bg-blue-700 text-white w-8 h-8 rounded-full flex items-center justify-center shadow transition-all duration-300 hover:scale-110 active:scale-95 border border-white/20"
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
                {[...studentTours, ...studentTours].map((tour, index) => (
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
                        
                        {/* Student Special Badge */}
                        <div className="absolute top-2 left-2 z-10">
                          <span className="inline-flex items-center gap-1 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                            <GraduationCap className="h-3 w-3" />
                            Student Deal
                          </span>
                        </div>
                        
                        {/* Activity Badge */}
                        <div className="absolute top-2 right-2 z-10">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold text-white ${
                            tour.badge === "Adventure" ? "bg-orange-500" :
                            tour.badge === "Beach" ? "bg-blue-500" :
                            tour.badge === "Extreme" ? "bg-red-500" :
                            tour.badge === "Heritage" ? "bg-purple-500" :
                            tour.badge === "Nature" ? "bg-green-500" :
                            tour.badge === "Road Trip" ? "bg-yellow-500" :
                            tour.badge === "Cultural" ? "bg-indigo-500" :
                            tour.badge === "Wildlife" ? "bg-teal-500" :
                            "bg-gray-500"
                          }`}>
                            {tour.badge}
                          </span>
                        </div>
                        
                        {/* Rating */}
                        <div className="absolute top-10 right-2 z-10 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span className="text-xs font-semibold text-white">{tour.rating}</span>
                        </div>

                        {/* Duration Badge */}
                        <div className="absolute bottom-2 left-2 z-10">
                          <span className="inline-flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                            <Calendar className="h-3 w-3" />
                            {tour.duration}
                          </span>
                        </div>
                      </div>

                      {/* Tour Content */}
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 flex-1 pr-2 line-clamp-2">
                            {tour.name}
                          </h3>
                          <div className="text-right">
                            <div className="text-base font-bold text-blue-600">{tour.price}</div>
                            <div className="text-xs text-gray-500">budget friendly</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1 text-gray-600 mb-2">
                          <MapPin className="h-3 w-3" />
                          <span className="text-xs">{tour.location}</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span>{tour.travelers}+ students</span>
                          </div>
                        </div>
                        
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-all duration-300 transform hover:scale-105">
                          Grab This Deal
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
          <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl shadow transition-all duration-300 transform hover:scale-105 border border-white/20 mb-6">
            <GraduationCap className="h-4 w-4" />
            Explore All Student Tours
            <ChevronRight className="h-4 w-4" />
          </button>
          {/* <p className="mt-3 text-gray-600 text-sm">
            Perfect adventures for your college breaks and holidays
          </p> */}
        </div>
      </div>

      
      
    </section>
  );
};

export default StudentToursSection;