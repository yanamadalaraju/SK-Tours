// import React, { useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight, MapPin, Star, Users, Calendar } from "lucide-react";

// const domesticTours = [
//   {
//     id: 1,
//     name: "Kashmir Great Lakes",
//     location: "Kashmir",
//     duration: "8 Days",
//     price: "₹25,999",
//     image: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     travelers: 1250,
//     badge: "Popular"
//   },
//   {
//     id: 2,
//     name: "Leh Ladakh Bike Trip",
//     location: "Ladakh",
//     duration: "10 Days",
//     price: "₹35,999",
//     image: "https://images.pexels.com/photos/672358/pexels-photo-672358.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     travelers: 890,
//     badge: "Adventure"
//   },
//   {
//     id: 3,
//     name: "Goa Beach Holiday",
//     location: "Goa",
//     duration: "5 Days",
//     price: "₹18,999",
//     image: "https://images.pexels.com/photos/2525903/pexels-photo-2525903.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.7,
//     travelers: 2100,
//     badge: "Beach"
//   },
//   {
//     id: 4,
//     name: "Kerala Backwaters",
//     location: "Kerala",
//     duration: "6 Days",
//     price: "₹22,999",
//     image: "https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     travelers: 1560,
//     badge: "Relaxing"
//   },
//   {
//     id: 5,
//     name: "Rajasthan Cultural Tour",
//     location: "Rajasthan",
//     duration: "7 Days",
//     price: "₹28,999",
//     image: "https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     travelers: 1340,
//     badge: "Cultural"
//   },
//   {
//     id: 6,
//     name: "Himachal Trekking",
//     location: "Himachal",
//     duration: "6 Days",
//     price: "₹19,999",
//     image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     travelers: 980,
//     badge: "Trekking"
//   },
//   {
//     id: 7,
//     name: "Andaman Islands",
//     location: "Andaman",
//     duration: "5 Days",
//     price: "₹32,999",
//     image: "https://images.pexels.com/photos/2422461/pexels-photo-2422461.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.7,
//     travelers: 1750,
//     badge: "Island"
//   },
//   {
//     id: 8,
//     name: "North East Explorer",
//     location: "North East",
//     duration: "9 Days",
//     price: "₹26,999",
//     image: "https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.6,
//     travelers: 720,
//     badge: "Adventure"
//   }
// ];

// const DomesticToursSection: React.FC = () => {
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
//       prevIndex === domesticTours.length - visibleCards ? 0 : prevIndex + 1
//     );
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === 0 ? domesticTours.length - visibleCards : prevIndex - 1
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
//     <section className="py-16 bg-gradient-to-br from-blue-50 to-cyan-50">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header Section - Centered */}
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
//             <MapPin className="h-4 w-4" />
//             Explore India
//           </div>
//           <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
//             Discover{" "}
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
//               Domestic Tours
//             </span>
//           </h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
//             Experience the incredible diversity of India with our carefully curated domestic tour packages. 
//             From snow-capped mountains to sunny beaches, ancient temples to modern cities.
//           </p>
//         </div>

//         {/* Banner Carousel with 4 Cards */}
//         <div className="relative mb-16">
//           {/* Navigation Arrows */}
//           <button
//             onClick={prevSlide}
//             className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white hover:bg-blue-50 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-10 border border-blue-200 hover:border-blue-300"
//           >
//             <ChevronLeft className="h-6 w-6" />
//           </button>
          
//           <button
//             onClick={nextSlide}
//             className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white hover:bg-blue-50 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-10 border border-blue-200 hover:border-blue-300"
//           >
//             <ChevronRight className="h-6 w-6" />
//           </button>

//           {/* Cards Container */}
//           <div className="overflow-hidden">
//             <div 
//               className="flex transition-transform duration-500 ease-in-out gap-6"
//               style={{ transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` }}
//             >
//               {domesticTours.map((tour, index) => (
//                 <div
//                   key={tour.id}
//                   className="flex-shrink-0"
//                   style={{ width: `${100 / visibleCards}%` }}
//                 >
//                   <div className="group cursor-pointer animate-fade-in-up bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-full mx-2">
//                     {/* Tour Image */}
//                     <div className="relative h-48 overflow-hidden">
//                       <img
//                         src={tour.image}
//                         alt={tour.name}
//                         className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
//                       />
                      
//                       {/* Gradient Overlay */}
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
//                       {/* Badge */}
//                       <div className="absolute top-3 left-3 z-10">
//                         <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white ${
//                           tour.badge === "Popular" ? "bg-orange-500" :
//                           tour.badge === "Adventure" ? "bg-red-500" :
//                           tour.badge === "Beach" ? "bg-blue-500" :
//                           tour.badge === "Cultural" ? "bg-purple-500" :
//                           tour.badge === "Trekking" ? "bg-green-500" :
//                           tour.badge === "Island" ? "bg-teal-500" :
//                           "bg-green-500"
//                         }`}>
//                           {tour.badge}
//                         </span>
//                       </div>
                      
//                       {/* Rating */}
//                       <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
//                         <Star className="h-3 w-3 text-yellow-400 fill-current" />
//                         <span className="text-xs font-semibold text-white">{tour.rating}</span>
//                       </div>
//                     </div>

//                     {/* Tour Content */}
//                     <div className="p-5">
//                       <div className="flex items-start justify-between mb-3">
//                         <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
//                           {tour.name}
//                         </h3>
//                         <div className="text-right">
//                           <div className="text-lg font-bold text-blue-600">{tour.price}</div>
//                           <div className="text-xs text-gray-500">per person</div>
//                         </div>
//                       </div>
                      
//                       <div className="flex items-center gap-1 text-gray-600 mb-3">
//                         <MapPin className="h-4 w-4" />
//                         <span className="text-sm">{tour.location}</span>
//                       </div>
                      
//                       <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
//                         <div className="flex items-center gap-1">
//                           <Calendar className="h-4 w-4" />
//                           <span>{tour.duration}</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Users className="h-4 w-4" />
//                           <span>{tour.travelers}+ Traveled</span>
//                         </div>
//                       </div>
                      
//                       <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105">
//                         View Details
//                       </button>
//                     </div>

//                     {/* Hover Effect Border */}
//                     <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-400/30 transition-all duration-500 pointer-events-none" />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Dot Indicators */}
//           <div className="flex justify-center mt-8 gap-2">
//             {Array.from({ length: domesticTours.length - visibleCards + 1 }).map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentIndex(index)}
//                 className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                   index === currentIndex ? 'bg-blue-600 w-8' : 'bg-gray-300'
//                 }`}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Bottom CTA */}
//         <div className="text-center mt-12">
//           <button className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//             <MapPin className="h-5 w-5" />
//             View All Domestic Tours
//             <ChevronRight className="h-5 w-5" />
//           </button>
//           <p className="mt-4 text-gray-600">
//             Join 50,000+ travelers exploring India with our trusted tours
//           </p>
//         </div>
//       </div>

//       {/* Add custom CSS animations */}
//       <style jsx>{`
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fade-in-up {
//           animation: fadeInUp 0.6s ease-out both;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default DomesticToursSection;





// import React, { useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight, MapPin, Star, Users, Calendar } from "lucide-react";

// const domesticTours = [
//   {
//     id: 1,
//     name: "Kashmir Great Lakes",
//     location: "Kashmir",
//     duration: "8 Days",
//     price: "₹25,999",
//     image: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     travelers: 1250,
//     badge: "Popular"
//   },
//   {
//     id: 2,
//     name: "Leh Ladakh Bike Trip",
//     location: "Ladakh",
//     duration: "10 Days",
//     price: "₹35,999",
//     image: "https://images.pexels.com/photos/672358/pexels-photo-672358.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     travelers: 890,
//     badge: "Adventure"
//   },
//   {
//     id: 3,
//     name: "Goa Beach Holiday",
//     location: "Goa",
//     duration: "5 Days",
//     price: "₹18,999",
//     image: "https://images.pexels.com/photos/2525903/pexels-photo-2525903.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.7,
//     travelers: 2100,
//     badge: "Beach"
//   },
//   {
//     id: 4,
//     name: "Kerala Backwaters",
//     location: "Kerala",
//     duration: "6 Days",
//     price: "₹22,999",
//     image: "https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     travelers: 1560,
//     badge: "Relaxing"
//   },
//   {
//     id: 5,
//     name: "Rajasthan Cultural Tour",
//     location: "Rajasthan",
//     duration: "7 Days",
//     price: "₹28,999",
//     image: "https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     travelers: 1340,
//     badge: "Cultural"
//   },
//   {
//     id: 6,
//     name: "Himachal Trekking",
//     location: "Himachal",
//     duration: "6 Days",
//     price: "₹19,999",
//     image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     travelers: 980,
//     badge: "Trekking"
//   },
//   {
//     id: 7,
//     name: "Andaman Islands",
//     location: "Andaman",
//     duration: "5 Days",
//     price: "₹32,999",
//     image: "https://images.pexels.com/photos/2422461/pexels-photo-2422461.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.7,
//     travelers: 1750,
//     badge: "Island"
//   },
//   {
//     id: 8,
//     name: "North East Explorer",
//     location: "North East",
//     duration: "9 Days",
//     price: "₹26,999",
//     image: "https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.6,
//     travelers: 720,
//     badge: "Adventure"
//   }
// ];

// const DomesticToursSection: React.FC = () => {
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
//       prevIndex === domesticTours.length - visibleCards ? 0 : prevIndex + 1
//     );
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === 0 ? domesticTours.length - visibleCards : prevIndex - 1
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
//     <section className="py-6 bg-gradient-to-br from-blue-50 to-cyan-50">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header Section - Centered */}
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
//             <MapPin className="h-4 w-4" />
//             Explore India
//           </div>
//           <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
//             Best{" "}
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
//               Domestic Tours
//             </span>
//           </h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
//             Experience the incredible diversity of India with our carefully curated domestic tour packages. 
//             From snow-capped mountains to sunny beaches, ancient temples to modern cities.
//           </p>
//         </div>

//         {/* Carousel Card Container */}
//         <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 lg:p-10 mb-16 border border-gray-100">
//           {/* Carousel Header */}
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
//             <div>
//               <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
//                 Featured Tour Packages
//               </h3>
//               <p className="text-gray-600">
//                 Handpicked experiences for the perfect Indian getaway
//               </p>
//             </div>
//             <div className="flex items-center gap-4 mt-4 lg:mt-0">
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={prevSlide}
//                   className="bg-blue-600 hover:bg-blue-700 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-105"
//                 >
//                   <ChevronLeft className="h-5 w-5" />
//                 </button>
//                 <button
//                   onClick={nextSlide}
//                   className="bg-blue-600 hover:bg-blue-700 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-105"
//                 >
//                   <ChevronRight className="h-5 w-5" />
//                 </button>
//               </div>
//               <div className="hidden sm:flex items-center gap-2">
//                 <span className="text-sm text-gray-600">
//                   {currentIndex + 1} - {Math.min(currentIndex + visibleCards, domesticTours.length)} of {domesticTours.length}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Carousel Container */}
//           <div className="relative">
//             {/* Cards Container */}
//             <div className="overflow-hidden">
//               <div 
//                 className="flex transition-transform duration-500 ease-in-out gap-6"
//                 style={{ transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` }}
//               >
//                 {domesticTours.map((tour, index) => (
//                   <div
//                     key={tour.id}
//                     className="flex-shrink-0"
//                     style={{ width: `${100 / visibleCards}%` }}
//                   >
//                     <div className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-full border border-gray-100">
//                       {/* Tour Image */}
//                       <div className="relative h-48 overflow-hidden">
//                         <img
//                           src={tour.image}
//                           alt={tour.name}
//                           className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
//                         />
                        
//                         {/* Gradient Overlay */}
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
//                         {/* Badge */}
//                         <div className="absolute top-3 left-3 z-10">
//                           <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white ${
//                             tour.badge === "Popular" ? "bg-orange-500" :
//                             tour.badge === "Adventure" ? "bg-red-500" :
//                             tour.badge === "Beach" ? "bg-blue-500" :
//                             tour.badge === "Cultural" ? "bg-purple-500" :
//                             tour.badge === "Trekking" ? "bg-green-500" :
//                             tour.badge === "Island" ? "bg-teal-500" :
//                             "bg-green-500"
//                           }`}>
//                             {tour.badge}
//                           </span>
//                         </div>
                        
//                         {/* Rating */}
//                         <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
//                           <Star className="h-3 w-3 text-yellow-400 fill-current" />
//                           <span className="text-xs font-semibold text-white">{tour.rating}</span>
//                         </div>
//                       </div>

//                       {/* Tour Content */}
//                       <div className="p-5">
//                         <div className="flex items-start justify-between mb-3">
//                           <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
//                             {tour.name}
//                           </h3>
//                           <div className="text-right">
//                             <div className="text-lg font-bold text-blue-600">{tour.price}</div>
//                             <div className="text-xs text-gray-500">per person</div>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-center gap-1 text-gray-600 mb-3">
//                           <MapPin className="h-4 w-4" />
//                           <span className="text-sm">{tour.location}</span>
//                         </div>
                        
//                         <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
//                           <div className="flex items-center gap-1">
//                             <Calendar className="h-4 w-4" />
//                             <span>{tour.duration}</span>
//                           </div>
//                           <div className="flex items-center gap-1">
//                             <Users className="h-4 w-4" />
//                             <span>{tour.travelers}+ Traveled</span>
//                           </div>
//                         </div>
                        
//                         <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105">
//                           View Details
//                         </button>
//                       </div>

//                       {/* Hover Effect Border */}
//                       <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-400/30 transition-all duration-500 pointer-events-none" />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Dot Indicators */}
//             <div className="flex justify-center mt-8 gap-2">
//               {Array.from({ length: domesticTours.length - visibleCards + 1 }).map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentIndex(index)}
//                   className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                     index === currentIndex ? 'bg-blue-600 w-8' : 'bg-gray-300'
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Bottom CTA */}
//         <div className="text-center mt-12">
//           <button className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//             <MapPin className="h-5 w-5" />
//             View All Domestic Tours
//             <ChevronRight className="h-5 w-5" />
//           </button>
//           <p className="mt-4 text-gray-600">
//             Join 50,000+ travelers exploring India with our trusted tours
//           </p>
//         </div>
//       </div>

//       {/* Add custom CSS animations */}
//       <style jsx>{`
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fade-in-up {
//           animation: fadeInUp 0.6s ease-out both;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default DomesticToursSection;





// import React, { useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight, MapPin, Star, Users, Calendar } from "lucide-react";

// const domesticTours = [
//   {
//     id: 1,
//     name: "Kashmir Great Lakes",
//     location: "Kashmir",
//     duration: "8 Days",
//     price: "₹25,999",
//     image: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     travelers: 1250,
//     badge: "Popular"
//   },
//   {
//     id: 2,
//     name: "Leh Ladakh Bike Trip",
//     location: "Ladakh",
//     duration: "10 Days",
//     price: "₹35,999",
//     image: "https://images.pexels.com/photos/672358/pexels-photo-672358.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     travelers: 890,
//     badge: "Adventure"
//   },
//   {
//     id: 3,
//     name: "Goa Beach Holiday",
//     location: "Goa",
//     duration: "5 Days",
//     price: "₹18,999",
//     image: "https://images.pexels.com/photos/2525903/pexels-photo-2525903.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.7,
//     travelers: 2100,
//     badge: "Beach"
//   },
//   {
//     id: 4,
//     name: "Kerala Backwaters",
//     location: "Kerala",
//     duration: "6 Days",
//     price: "₹22,999",
//     image: "https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     travelers: 1560,
//     badge: "Relaxing"
//   },
//   {
//     id: 5,
//     name: "Rajasthan Cultural Tour",
//     location: "Rajasthan",
//     duration: "7 Days",
//     price: "₹28,999",
//     image: "https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     travelers: 1340,
//     badge: "Cultural"
//   },
//   {
//     id: 6,
//     name: "Himachal Trekking",
//     location: "Himachal",
//     duration: "6 Days",
//     price: "₹19,999",
//     image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     travelers: 980,
//     badge: "Trekking"
//   }
// ];

// const DomesticToursSection: React.FC = () => {
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
//       prevIndex === domesticTours.length - visibleCards ? 0 : prevIndex + 1
//     );
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === 0 ? domesticTours.length - visibleCards : prevIndex - 1
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
//     <section className="py-12 bg-gradient-to-br from-slate-50 to-blue-50/30">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header Section - Compact */}
//         <div className="text-center mb-10">
//           <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium mb-3">
//             <MapPin className="h-3 w-3" />
//             Explore India
//           </div>
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
//             Best{" "}
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
//               Domestic Tours
//             </span>
//           </h2>
//           <p className="text-gray-600 max-w-2xl mx-auto text-sm leading-relaxed">
//             Experience India's diversity with our curated tour packages from mountains to beaches.
//           </p>
//         </div>

//         {/* Compact Carousel Container */}
//         <div className="bg-white rounded-2xl shadow-lg p-6 mb-12 border border-gray-100">
//           {/* Carousel Header */}
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h3 className="text-xl font-bold text-gray-900">
//                 Featured Tours
//               </h3>
//               <p className="text-gray-600 text-sm">
//                 Handpicked Indian experiences
//               </p>
//             </div>
//             <div className="flex items-center gap-3">
//               <div className="hidden sm:flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
//                 <span className="text-xs text-gray-600">
//                   {currentIndex + 1}/{domesticTours.length - visibleCards + 1}
//                 </span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={prevSlide}
//                   className="bg-blue-600 hover:bg-blue-700 text-white w-8 h-8 rounded-full flex items-center justify-center shadow transition-all duration-300"
//                 >
//                   <ChevronLeft className="h-4 w-4" />
//                 </button>
//                 <button
//                   onClick={nextSlide}
//                   className="bg-blue-600 hover:bg-blue-700 text-white w-8 h-8 rounded-full flex items-center justify-center shadow transition-all duration-300"
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
//                 {domesticTours.map((tour) => (
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
//                             tour.badge === "Popular" ? "bg-orange-500" :
//                             tour.badge === "Adventure" ? "bg-red-500" :
//                             tour.badge === "Beach" ? "bg-blue-500" :
//                             tour.badge === "Cultural" ? "bg-purple-500" :
//                             tour.badge === "Trekking" ? "bg-green-500" :
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
//                           <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 flex-1 pr-2 line-clamp-2">
//                             {tour.name}
//                           </h3>
//                           <div className="text-right">
//                             <div className="text-base font-bold text-blue-600">{tour.price}</div>
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
                        
//                         <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-all duration-300">
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
//               {Array.from({ length: domesticTours.length - visibleCards + 1 }).map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentIndex(index)}
//                   className={`w-2 h-2 rounded-full transition-all duration-300 ${
//                     index === currentIndex ? 'bg-blue-600 w-6' : 'bg-gray-300'
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Compact Bottom CTA */}
//         <div className="text-center">
//           <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl shadow transition-all duration-300 transform hover:scale-105">
//             <MapPin className="h-4 w-4" />
//             View All Tours
//             <ChevronRight className="h-4 w-4" />
//           </button>
//           <p className="mt-3 text-gray-600 text-sm">
//             Join 50,000+ travelers exploring India
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default DomesticToursSection;




// import React, { useState, useEffect, useRef } from "react";
// import { ChevronLeft, ChevronRight, MapPin, Star, Users, Calendar } from "lucide-react";

// const domesticTours = [
//   {
//     id: 1,
//     name: "Kashmir Great Lakes",
//     location: "Kashmir",
//     duration: "8 Days",
//     price: "₹25,999",
//     image: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     travelers: 1250,
//     badge: "Popular"
//   },
//   {
//     id: 2,
//     name: "Leh Ladakh Bike Trip",
//     location: "Ladakh",
//     duration: "10 Days",
//     price: "₹35,999",
//     image: "https://images.pexels.com/photos/672358/pexels-photo-672358.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     travelers: 890,
//     badge: "Adventure"
//   },
//   {
//     id: 3,
//     name: "Goa Beach Holiday",
//     location: "Goa",
//     duration: "5 Days",
//     price: "₹18,999",
//     image: "https://images.pexels.com/photos/2525903/pexels-photo-2525903.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.7,
//     travelers: 2100,
//     badge: "Beach"
//   },
//   {
//     id: 4,
//     name: "Kerala Backwaters",
//     location: "Kerala",
//     duration: "6 Days",
//     price: "₹22,999",
//     image: "https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     travelers: 1560,
//     badge: "Relaxing"
//   },
//   {
//     id: 5,
//     name: "Rajasthan Cultural Tour",
//     location: "Rajasthan",
//     duration: "7 Days",
//     price: "₹28,999",
//     image: "https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     travelers: 1340,
//     badge: "Cultural"
//   },
//   {
//     id: 6,
//     name: "Himachal Trekking",
//     location: "Himachal",
//     duration: "6 Days",
//     price: "₹19,999",
//     image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     travelers: 980,
//     badge: "Trekking"
//   }
// ];

// const DomesticToursSection: React.FC = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [visibleCards, setVisibleCards] = useState(4);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);
//   const scrollContainerRef = useRef<HTMLDivElement>(null);
//   const animationRef = useRef<number>();

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
//     if (!isAutoPlaying || !scrollContainerRef.current) return;

//     const scrollContainer = scrollContainerRef.current;
//     const scrollWidth = scrollContainer.scrollWidth;
//     const clientWidth = scrollContainer.clientWidth;
//     let scrollPosition = 0;

//     const animateScroll = () => {
//       scrollPosition += 0.5; // Adjust speed here (lower = slower)
      
//       if (scrollPosition >= scrollWidth - clientWidth) {
//         scrollPosition = 0; // Reset to start for continuous loop
//       }
      
//       scrollContainer.scrollLeft = scrollPosition;
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
//       const scrollContainer = scrollContainerRef.current;
//       const cardWidth = scrollContainer.scrollWidth / domesticTours.length;
//       const newScrollPosition = scrollContainer.scrollLeft + (cardWidth * visibleCards);
      
//       scrollContainer.scrollTo({
//         left: newScrollPosition,
//         behavior: 'smooth'
//       });
//     }
//   };

//   const prevSlide = () => {
//     if (scrollContainerRef.current) {
//       const scrollContainer = scrollContainerRef.current;
//       const cardWidth = scrollContainer.scrollWidth / domesticTours.length;
//       const newScrollPosition = scrollContainer.scrollLeft - (cardWidth * visibleCards);
      
//       scrollContainer.scrollTo({
//         left: newScrollPosition,
//         behavior: 'smooth'
//       });
//     }
//   };

//   // Pause auto-play on hover
//   const handleMouseEnter = () => {
//     setIsAutoPlaying(false);
//   };

//   const handleMouseLeave = () => {
//     setIsAutoPlaying(true);
//   };

//   return (
//     <section className="py-12 bg-gradient-to-br from-slate-50 to-blue-50/30">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header Section - Compact */}
//         <div className="text-center mb-10">
//           <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium mb-3">
//             <MapPin className="h-3 w-3" />
//             Explore India
//           </div>
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
//             Best{" "}
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
//               Domestic Tours
//             </span>
//           </h2>
//           <p className="text-gray-600 max-w-2xl mx-auto text-sm leading-relaxed">
//             Experience India's diversity with our curated tour packages from mountains to beaches.
//           </p>
//         </div>

//         {/* Compact Carousel Container */}
//         <div 
//           className="bg-white rounded-2xl shadow-lg p-6 mb-12 border border-gray-100"
//           onMouseEnter={handleMouseEnter}
//           onMouseLeave={handleMouseLeave}
//         >
//           {/* Carousel Header */}
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h3 className="text-xl font-bold text-gray-900">
//                 Featured Tours
//               </h3>
//               <p className="text-gray-600 text-sm">
//                 Handpicked Indian experiences
//               </p>
//             </div>
//             <div className="flex items-center gap-3">
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={prevSlide}
//                   className="bg-blue-600 hover:bg-blue-700 text-white w-8 h-8 rounded-full flex items-center justify-center shadow transition-all duration-300 hover:scale-110"
//                 >
//                   <ChevronLeft className="h-4 w-4" />
//                 </button>
//                 <button
//                   onClick={nextSlide}
//                   className="bg-blue-600 hover:bg-blue-700 text-white w-8 h-8 rounded-full flex items-center justify-center shadow transition-all duration-300 hover:scale-110"
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
//               className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
//               style={{ 
//                 scrollBehavior: 'auto',
//                 scrollSnapType: 'x mandatory'
//               }}
//             >
//               {/* Duplicate cards for seamless looping */}
//               {[...domesticTours, ...domesticTours].map((tour, index) => (
//                 <div
//                   key={`${tour.id}-${index}`}
//                   className="flex-shrink-0 snap-start"
//                   style={{ width: `calc(${100 / visibleCards}% - 16px)` }}
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
//                           tour.badge === "Popular" ? "bg-orange-500" :
//                           tour.badge === "Adventure" ? "bg-red-500" :
//                           tour.badge === "Beach" ? "bg-blue-500" :
//                           tour.badge === "Cultural" ? "bg-purple-500" :
//                           tour.badge === "Trekking" ? "bg-green-500" :
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
//                         <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 flex-1 pr-2 line-clamp-2">
//                           {tour.name}
//                         </h3>
//                         <div className="text-right">
//                           <div className="text-base font-bold text-blue-600">{tour.price}</div>
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
                      
//                       <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-all duration-300 transform hover:scale-105">
//                         View Details
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Scroll Progress Indicator */}
//             <div className="flex justify-center mt-6">
//               <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
//                 <div 
//                   className="h-full bg-blue-600 rounded-full transition-all duration-100"
//                   style={{
//                     width: scrollContainerRef.current 
//                       ? `${(scrollContainerRef.current.scrollLeft / (scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth)) * 100}%`
//                       : '0%'
//                   }}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Compact Bottom CTA */}
//         <div className="text-center">
//           <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl shadow transition-all duration-300 transform hover:scale-105">
//             <MapPin className="h-4 w-4" />
//             View All Tours
//             <ChevronRight className="h-4 w-4" />
//           </button>
//           <p className="mt-3 text-gray-600 text-sm">
//             Join 50,000+ travelers exploring India
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

// export default DomesticToursSection;





// import React, { useState, useEffect, useRef } from "react";
// import { ChevronLeft, ChevronRight, MapPin, Star, Users, Calendar } from "lucide-react";

// const domesticTours = [
//   {
//     id: 1,
//     name: "Kashmir Great Lakes",
//     location: "Kashmir",
//     duration: "8 Days",
//     price: "₹25,999",
//     image: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     travelers: 1250,
//     badge: "Popular"
//   },
//   {
//     id: 2,
//     name: "Leh Ladakh Bike Trip",
//     location: "Ladakh",
//     duration: "10 Days",
//     price: "₹35,999",
//     image: "https://images.pexels.com/photos/672358/pexels-photo-672358.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     travelers: 890,
//     badge: "Adventure"
//   },
//   {
//     id: 3,
//     name: "Goa Beach Holiday",
//     location: "Goa",
//     duration: "5 Days",
//     price: "₹18,999",
//     image: "https://images.pexels.com/photos/2525903/pexels-photo-2525903.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.7,
//     travelers: 2100,
//     badge: "Beach"
//   },
//   {
//     id: 4,
//     name: "Kerala Backwaters",
//     location: "Kerala",
//     duration: "6 Days",
//     price: "₹22,999",
//     image: "https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     travelers: 1560,
//     badge: "Relaxing"
//   },
//   {
//     id: 5,
//     name: "Rajasthan Cultural Tour",
//     location: "Rajasthan",
//     duration: "7 Days",
//     price: "₹28,999",
//     image: "https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     travelers: 1340,
//     badge: "Cultural"
//   },
//   {
//     id: 6,
//     name: "Himachal Trekking",
//     location: "Himachal",
//     duration: "6 Days",
//     price: "₹19,999",
//     image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     travelers: 980,
//     badge: "Trekking"
//   }
// ];

// const DomesticToursSection: React.FC = () => {
//   const [visibleCards, setVisibleCards] = useState(4);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);
//   const scrollContainerRef = useRef<HTMLDivElement>(null);
//   const animationRef = useRef<number>();
//   const scrollPositionRef = useRef(0);

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
//     if (!isAutoPlaying || !scrollContainerRef.current) return;

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
//       const scrollContainer = scrollContainerRef.current;
//       const cardWidth = scrollContainer.scrollWidth / (domesticTours.length * 2);
//       const newScrollPosition = scrollContainer.scrollLeft + (cardWidth * visibleCards);
      
//       scrollContainer.scrollTo({
//         left: newScrollPosition,
//         behavior: 'smooth'
//       });
//     }
//   };

//   const prevSlide = () => {
//     if (scrollContainerRef.current) {
//       const scrollContainer = scrollContainerRef.current;
//       const cardWidth = scrollContainer.scrollWidth / (domesticTours.length * 2);
//       const newScrollPosition = scrollContainer.scrollLeft - (cardWidth * visibleCards);
      
//       scrollContainer.scrollTo({
//         left: newScrollPosition,
//         behavior: 'smooth'
//       });
//     }
//   };

//   // Stop auto-play when hovering on any card
//   const handleCardMouseEnter = () => {
//     setIsAutoPlaying(false);
//   };

//   // Resume auto-play when leaving card
//   const handleCardMouseLeave = () => {
//     setIsAutoPlaying(true);
//   };

//   return (
//     <section className="py-12 bg-gradient-to-br from-slate-50 to-blue-50/30">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header Section - Compact */}
//         <div className="text-center mb-10">
//           <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium mb-3">
//             <MapPin className="h-3 w-3" />
//             Explore India
//           </div>
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
//             Best{" "}
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
//               Domestic Tours
//             </span>
//           </h2>
//           <p className="text-gray-600 max-w-2xl mx-auto text-sm leading-relaxed">
//             Experience India's diversity with our curated tour packages from mountains to beaches.
//           </p>
//         </div>

//         {/* Compact Carousel Container */}
//         <div className="bg-white rounded-2xl shadow-lg p-6 mb-12 border border-gray-100">
//           {/* Carousel Header */}
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h3 className="text-xl font-bold text-gray-900">
//                 Featured Tours
//               </h3>
//               <p className="text-gray-600 text-sm">
//                 Handpicked Indian experiences
//               </p>
//             </div>
//             <div className="flex items-center gap-3">
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={prevSlide}
//                   className="bg-blue-600 hover:bg-blue-700 text-white w-8 h-8 rounded-full flex items-center justify-center shadow transition-all duration-300 hover:scale-110"
//                 >
//                   <ChevronLeft className="h-4 w-4" />
//                 </button>
//                 <button
//                   onClick={nextSlide}
//                   className="bg-blue-600 hover:bg-blue-700 text-white w-8 h-8 rounded-full flex items-center justify-center shadow transition-all duration-300 hover:scale-110"
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
//               {[...domesticTours, ...domesticTours].map((tour, index) => (
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
//                           tour.badge === "Popular" ? "bg-orange-500" :
//                           tour.badge === "Adventure" ? "bg-red-500" :
//                           tour.badge === "Beach" ? "bg-blue-500" :
//                           tour.badge === "Cultural" ? "bg-purple-500" :
//                           tour.badge === "Trekking" ? "bg-green-500" :
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
//                         <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 flex-1 pr-2 line-clamp-2">
//                           {tour.name}
//                         </h3>
//                         <div className="text-right">
//                           <div className="text-base font-bold text-blue-600">{tour.price}</div>
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
                      
//                       <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-all duration-300 transform hover:scale-105">
//                         View Details
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Auto-play Status Indicator */}
//             <div className="flex justify-center items-center mt-6 gap-2">
//               <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
//               <span className="text-xs text-gray-500">
//                 {isAutoPlaying ? 'Auto-scrolling' : 'Paused'}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Compact Bottom CTA */}
//         <div className="text-center">
//           <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl shadow transition-all duration-300 transform hover:scale-105">
//             <MapPin className="h-4 w-4" />
//             View All Tours
//             <ChevronRight className="h-4 w-4" />
//           </button>
//           <p className="mt-3 text-gray-600 text-sm">
//             Join 50,000+ travelers exploring India
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

// export default DomesticToursSection;





// import React, { useState, useEffect, useRef } from "react";
// import { ChevronLeft, ChevronRight, MapPin, Star, Users, Calendar } from "lucide-react";

// const domesticTours = [
//   {
//     id: 1,
//     name: "Kashmir Great Lakes",
//     location: "Kashmir",
//     duration: "8 Days",
//     price: "₹25,999",
//     image: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     travelers: 1250,
//     badge: "Popular"
//   },
//   {
//     id: 2,
//     name: "Leh Ladakh Bike Trip",
//     location: "Ladakh",
//     duration: "10 Days",
//     price: "₹35,999",
//     image: "https://images.pexels.com/photos/672358/pexels-photo-672358.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     travelers: 890,
//     badge: "Adventure"
//   },
//   {
//     id: 3,
//     name: "Goa Beach Holiday",
//     location: "Goa",
//     duration: "5 Days",
//     price: "₹18,999",
//     image: "https://images.pexels.com/photos/2525903/pexels-photo-2525903.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.7,
//     travelers: 2100,
//     badge: "Beach"
//   },
//   {
//     id: 4,
//     name: "Kerala Backwaters",
//     location: "Kerala",
//     duration: "6 Days",
//     price: "₹22,999",
//     image: "https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     travelers: 1560,
//     badge: "Relaxing"
//   },
//   {
//     id: 5,
//     name: "Rajasthan Cultural Tour",
//     location: "Rajasthan",
//     duration: "7 Days",
//     price: "₹28,999",
//     image: "https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     travelers: 1340,
//     badge: "Cultural"
//   },
//   {
//     id: 6,
//     name: "Himachal Trekking",
//     location: "Himachal",
//     duration: "6 Days",
//     price: "₹19,999",
//     image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     travelers: 980,
//     badge: "Trekking"
//   }
// ];

// const DomesticToursSection: React.FC = () => {
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
//       const cardWidth = scrollContainer.scrollWidth / (domesticTours.length * 2);
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
//       const cardWidth = scrollContainer.scrollWidth / (domesticTours.length * 2);
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
//     <section className="py-12 bg-gradient-to-br from-slate-50 to-blue-50/30">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header Section - Compact */}
//         <div className="text-center mb-10">
//           <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium mb-3">
//             <MapPin className="h-3 w-3" />
//             Explore India
//           </div>
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
//             Best{" "}
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
//               Domestic Tours
//             </span>
//           </h2>
//           <p className="text-gray-600 max-w-2xl mx-auto text-sm leading-relaxed">
//             Experience India's diversity with our curated tour packages from mountains to beaches.
//           </p>
//         </div>

//         {/* Compact Carousel Container */}
//         <div className="bg-white rounded-2xl shadow-lg p-6 mb-12 border border-gray-100">
//           {/* Carousel Header */}
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h3 className="text-xl font-bold text-gray-900">
//                 Featured Tours
//               </h3>
//               <p className="text-gray-600 text-sm">
//                 Handpicked Indian experiences
//               </p>
//             </div>
//             <div className="flex items-center gap-3">
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={prevSlide}
//                   className="bg-blue-600 hover:bg-blue-700 text-white w-8 h-8 rounded-full flex items-center justify-center shadow transition-all duration-300 hover:scale-110 active:scale-95"
//                 >
//                   <ChevronLeft className="h-4 w-4" />
//                 </button>
//                 <button
//                   onClick={nextSlide}
//                   className="bg-blue-600 hover:bg-blue-700 text-white w-8 h-8 rounded-full flex items-center justify-center shadow transition-all duration-300 hover:scale-110 active:scale-95"
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
//               {[...domesticTours, ...domesticTours].map((tour, index) => (
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
//                           tour.badge === "Popular" ? "bg-orange-500" :
//                           tour.badge === "Adventure" ? "bg-red-500" :
//                           tour.badge === "Beach" ? "bg-blue-500" :
//                           tour.badge === "Cultural" ? "bg-purple-500" :
//                           tour.badge === "Trekking" ? "bg-green-500" :
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
//                         <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 flex-1 pr-2 line-clamp-2">
//                           {tour.name}
//                         </h3>
//                         <div className="text-right">
//                           <div className="text-base font-bold text-blue-600">{tour.price}</div>
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
                      
//                       <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-all duration-300 transform hover:scale-105">
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
//           <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl shadow transition-all duration-300 transform hover:scale-105">
//             <MapPin className="h-4 w-4" />
//             View All Tours
//             <ChevronRight className="h-4 w-4" />
//           </button>
//           <p className="mt-3 text-gray-600 text-sm">
//             Join 50,000+ travelers exploring India
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

// export default DomesticToursSection;





// import React, { useState, useEffect, useRef } from "react";
// import { ChevronLeft, ChevronRight, MapPin, Star, Users, Calendar } from "lucide-react";

// const domesticTours = [
//   {
//     id: 1,
//     name: "Kashmir Great Lakes",
//     location: "Kashmir",
//     duration: "8 Days",
//     price: "₹25,999",
//     image: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     travelers: 1250,
//     badge: "Popular"
//   },
//   {
//     id: 2,
//     name: "Leh Ladakh Bike Trip",
//     location: "Ladakh",
//     duration: "10 Days",
//     price: "₹35,999",
//     image: "https://images.pexels.com/photos/672358/pexels-photo-672358.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     travelers: 890,
//     badge: "Adventure"
//   },
//   {
//     id: 3,
//     name: "Goa Beach Holiday",
//     location: "Goa",
//     duration: "5 Days",
//     price: "₹18,999",
//     image: "https://images.pexels.com/photos/2525903/pexels-photo-2525903.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.7,
//     travelers: 2100,
//     badge: "Beach"
//   },
//   {
//     id: 4,
//     name: "Kerala Backwaters",
//     location: "Kerala",
//     duration: "6 Days",
//     price: "₹22,999",
//     image: "https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     travelers: 1560,
//     badge: "Relaxing"
//   },
//   {
//     id: 5,
//     name: "Rajasthan Cultural Tour",
//     location: "Rajasthan",
//     duration: "7 Days",
//     price: "₹28,999",
//     image: "https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     travelers: 1340,
//     badge: "Cultural"
//   },
//   {
//     id: 6,
//     name: "Himachal Trekking",
//     location: "Himachal",
//     duration: "6 Days",
//     price: "₹19,999",
//     image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     travelers: 980,
//     badge: "Trekking"
//   }
// ];

// const DomesticToursSection: React.FC = () => {
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
//       const cardWidth = scrollContainer.scrollWidth / (domesticTours.length * 2);
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
//       const cardWidth = scrollContainer.scrollWidth / (domesticTours.length * 2);
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
//      <div className="w-full bg-gradient-to-r from-[#0F1F5C] via-[#1F3F93] to-[#0F1F5C] py-8 mb-10 shadow-lg">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <h2
//   className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight"
//   style={{
//     fontFamily: "'Baloo 2', sans-serif",
//     color: "white",
//     letterSpacing: "-2px",
//     textShadow: `
//       2px 2px 0 #1F3F93,
//       -2px -2px 0 #1F3F93,
//       0 0 18px rgba(255,255,255,0.65)
//     `,
//   }}
// >
//   Domestic <span className="text-[#E31B23]">Tours</span>
// </h2>

           
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
//                 Featured Tours
//               </h3>
//               <p className="text-gray-600 text-sm">
//                 Handpicked Indian experiences
//               </p>
//             </div>
//             <div className="flex items-center gap-3">
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={prevSlide}
//                   className="bg-blue-600 hover:bg-blue-700 text-white w-8 h-8 rounded-full flex items-center justify-center shadow transition-all duration-300 hover:scale-110 active:scale-95"
//                 >
//                   <ChevronLeft className="h-4 w-4" />
//                 </button>
//                 <button
//                   onClick={nextSlide}
//                   className="bg-blue-600 hover:bg-blue-700 text-white w-8 h-8 rounded-full flex items-center justify-center shadow transition-all duration-300 hover:scale-110 active:scale-95"
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
//               {[...domesticTours, ...domesticTours].map((tour, index) => (
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
//                           tour.badge === "Popular" ? "bg-orange-500" :
//                           tour.badge === "Adventure" ? "bg-red-500" :
//                           tour.badge === "Beach" ? "bg-blue-500" :
//                           tour.badge === "Cultural" ? "bg-purple-500" :
//                           tour.badge === "Trekking" ? "bg-green-500" :
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
//                         <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 flex-1 pr-2 line-clamp-2">
//                           {tour.name}
//                         </h3>
//                         <div className="text-right">
//                           <div className="text-base font-bold text-blue-600">{tour.price}</div>
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
                      
//                       <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-all duration-300 transform hover:scale-105">
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
//           <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl shadow transition-all duration-300 transform hover:scale-105">
//             <MapPin className="h-4 w-4" />
//             View All Tours
//             <ChevronRight className="h-4 w-4" />
//           </button>
//           <p className="mt-3 text-gray-600 text-sm">
//             Join 50,000+ travelers exploring India
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

// export default DomesticToursSection;





// import React, { useState, useEffect, useRef } from "react";
// import { ChevronLeft, ChevronRight, MapPin, Star, Users, Calendar } from "lucide-react";

// const domesticTours = [
//   {
//     id: 1,
//     name: "Kashmir Great Lakes",
//     location: "Kashmir",
//     duration: "8 Days",
//     price: "₹25,999",
//     image: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     travelers: 1250,
//     badge: "Popular"
//   },
//   {
//     id: 2,
//     name: "Leh Ladakh Bike Trip",
//     location: "Ladakh",
//     duration: "10 Days",
//     price: "₹35,999",
//     image: "https://images.pexels.com/photos/672358/pexels-photo-672358.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     travelers: 890,
//     badge: "Adventure"
//   },
//   {
//     id: 3,
//     name: "Goa Beach Holiday",
//     location: "Goa",
//     duration: "5 Days",
//     price: "₹18,999",
//     image: "https://images.pexels.com/photos/2525903/pexels-photo-2525903.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.7,
//     travelers: 2100,
//     badge: "Beach"
//   },
//   {
//     id: 4,
//     name: "Kerala Backwaters",
//     location: "Kerala",
//     duration: "6 Days",
//     price: "₹22,999",
//     image: "https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     travelers: 1560,
//     badge: "Relaxing"
//   },
//   {
//     id: 5,
//     name: "Rajasthan Cultural Tour",
//     location: "Rajasthan",
//     duration: "7 Days",
//     price: "₹28,999",
//     image: "https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     travelers: 1340,
//     badge: "Cultural"
//   },
//   {
//     id: 6,
//     name: "Himachal Trekking",
//     location: "Himachal",
//     duration: "6 Days",
//     price: "₹19,999",
//     image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     travelers: 980,
//     badge: "Trekking"
//   }
// ];

// const DomesticToursSection: React.FC = () => {
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
//       const cardWidth = scrollContainer.scrollWidth / (domesticTours.length * 2);
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
//       const cardWidth = scrollContainer.scrollWidth / (domesticTours.length * 2);
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
//               Domestic <span className="text-[#E31B23]">Tours</span>
//             </h2>
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Carousel Container with Gradient Background */}
//         <div 
//           className="rounded-2xl shadow-lg p-6 mb-12 border border-gray-100 relative overflow-hidden"
//          style={{
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
//                   Featured Tours
//                 </h3>
//                 <p className="text-white/80 text-sm drop-shadow">
//                   Handpicked Indian experiences
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
//                 {[...domesticTours, ...domesticTours].map((tour, index) => (
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
                        
//                         {/* Badge */}
//                         <div className="absolute top-2 left-2 z-10">
//                           <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold text-white ${
//                             tour.badge === "Popular" ? "bg-orange-500" :
//                             tour.badge === "Adventure" ? "bg-red-500" :
//                             tour.badge === "Beach" ? "bg-blue-500" :
//                             tour.badge === "Cultural" ? "bg-purple-500" :
//                             tour.badge === "Trekking" ? "bg-green-500" :
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
                        
//                         <button className="w-full bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-all duration-300 transform hover:scale-105">
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
//             <MapPin className="h-4 w-4" />
//             View All Tours
//             <ChevronRight className="h-4 w-4" />
//           </button>
//           <p className="mt-3 text-gray-600 text-sm">
//             Join 50,000+ travelers exploring India
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

// export default DomesticToursSection;




import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, MapPin, Star, Users, Calendar } from "lucide-react";
import "./DomesticToursSection.css";

const domesticTours = [
  {
    id: 1,
    name: "Kashmir Great Lakes",
    location: "Kashmir",
    duration: "8 Days",
    price: "₹25,999",
    image: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.9,
    travelers: 1250,
    badge: "Popular"
  },
  {
    id: 2,
    name: "Leh Ladakh Bike Trip",
    location: "Ladakh",
    duration: "10 Days",
    price: "₹35,999",
    image: "https://images.pexels.com/photos/672358/pexels-photo-672358.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.8,
    travelers: 890,
    badge: "Adventure"
  },
  {
    id: 3,
    name: "Goa Beach Holiday",
    location: "Goa",
    duration: "5 Days",
    price: "₹18,999",
    image: "https://images.pexels.com/photos/2525903/pexels-photo-2525903.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.7,
    travelers: 2100,
    badge: "Beach"
  },
  {
    id: 4,
    name: "Kerala Backwaters",
    location: "Kerala",
    duration: "6 Days",
    price: "₹22,999",
    image: "https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.8,
    travelers: 1560,
    badge: "Relaxing"
  },
  {
    id: 5,
    name: "Rajasthan Cultural Tour",
    location: "Rajasthan",
    duration: "7 Days",
    price: "₹28,999",
    image: "https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.8,
    travelers: 1340,
    badge: "Cultural"
  },
  {
    id: 6,
    name: "Himachal Trekking",
    location: "Himachal",
    duration: "6 Days",
    price: "₹19,999",
    image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.9,
    travelers: 980,
    badge: "Trekking"
  }
];

const DomesticToursSection: React.FC = () => {
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
      const cardWidth = scrollContainer.scrollWidth / (domesticTours.length * 2);
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
      const cardWidth = scrollContainer.scrollWidth / (domesticTours.length * 2);
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
              Domestic <span className="text-[#E31B23]">Tours</span>
            </h2>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Carousel Container with Gradient Background */}
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
                  Domestic Tours
                </h3>
                <p className="text-white/80 text-sm drop-shadow">
                  Handpicked Indian experiences
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
                {[...domesticTours, ...domesticTours].map((tour, index) => (
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
                            tour.badge === "Popular" ? "bg-orange-500" :
                            tour.badge === "Adventure" ? "bg-red-500" :
                            tour.badge === "Beach" ? "bg-blue-500" :
                            tour.badge === "Cultural" ? "bg-purple-500" :
                            tour.badge === "Trekking" ? "bg-green-500" :
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
                          <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 flex-1 pr-2 line-clamp-2">
                            {tour.name}
                          </h3>
                          <div className="text-right">
                            <div className="text-base font-bold text-blue-600">{tour.price}</div>
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
                        
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-all duration-300 transform hover:scale-105">
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
          <button className="inline-flex mb-6 items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl shadow transition-all duration-300 transform hover:scale-105 border border-white/20">
            <MapPin className="h-4 w-4" />
            View All Tours
            <ChevronRight className="h-4 w-4" />
          </button>
          {/* <p className="mt-3 text-gray-600 text-sm">
            Join 50,000+ travelers exploring India
          </p> */}
        </div>
      </div>

      
    </section>
  );
};

export default DomesticToursSection;