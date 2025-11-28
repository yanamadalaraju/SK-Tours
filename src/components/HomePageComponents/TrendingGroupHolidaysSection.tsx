// import React from "react";
// import { Users, MapPin, Calendar, Star, ArrowRight } from "lucide-react";

// const trendingDestinations = [
//   {
//     id: 1,
//     name: "Andaman",
//     tours: 5,
//     departures: 102,
//     guests: 28661,
//     image: "https://images.pexels.com/photos/7425765/pexels-photo-7425765.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     badge: "Popular"
//   },
//   {
//     id: 2,
//     name: "Kashmir",
//     tours: 13,
//     departures: 62,
//     guests: 130171,
//     image: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     badge: "Hot"
//   },
//   {
//     id: 3,
//     name: "Himachal",
//     tours: 14,
//     departures: 95,
//     guests: 212335,
//     image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.7,
//     badge: "Trending"
//   },
//   {
//     id: 4,
//     name: "North East",
//     tours: 5,
//     departures: 57,
//     guests: 5125,
//     image: "https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.6,
//     badge: "New"
//   },
//   {
//     id: 5,
//     name: "Sikkim Darjeeling",
//     tours: 6,
//     departures: 24,
//     guests: 29217,
//     image: "https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     badge: "Scenic"
//   },
//   {
//     id: 6,
//     name: "Leh Ladakh",
//     tours: 0,
//     departures: 0,
//     guests: 22979,
//     image: "https://images.pexels.com/photos/672358/pexels-photo-672358.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     badge: "Adventure"
//   },
//   {
//     id: 7,
//     name: "Africa",
//     tours: 6,
//     departures: 25,
//     guests: 3535,
//     image: "https://images.pexels.com/photos/158179/lion-animal-predator-mane-158179.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.7,
//     badge: "Wildlife"
//   },
//   {
//     id: 8,
//     name: "America",
//     tours: 11,
//     departures: 62,
//     guests: 18348,
//     image: "https://images.pexels.com/photos/356844/pexels-photo-356844.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     badge: "Luxury"
//   },
//   {
//     id: 9,
//     name: "Dubai and MiddleEast",
//     tours: 10,
//     departures: 84,
//     guests: 46821,
//     image: "https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.6,
//     badge: "Luxury"
//   },
//   {
//     id: 10,
//     name: "Nepal",
//     tours: 2,
//     departures: 16,
//     guests: 12021,
//     image: "https://images.pexels.com/photos/2218343/pexels-photo-2218343.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.5,
//     badge: "Cultural"
//   },
//   {
//     id: 11,
//     name: "South East Asia",
//     tours: 19,
//     departures: 180,
//     guests: 223130,
//     image: "https://images.pexels.com/photos/208745/pexels-photo-208745.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     badge: "Popular"
//   },
//   {
//     id: 12,
//     name: "Europe",
//     tours: 34,
//     departures: 250,
//     guests: 123978,
//     image: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     badge: "Best Seller"
//   },
// ];

// const TrendingGroupHolidaysSection: React.FC = () => {
//   return (
//     <section className="py-12 md:py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header with Image Left & Content Right */}
//         <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12 md:mb-16">
//           {/* Left Side - Image */}
//           <div className="flex-1 max-w-lg lg:max-w-md xl:max-w-lg w-full">
//             <div className="relative rounded-3xl overflow-hidden shadow-2xl">
//               {/* Main Image */}
//               <img
//                 src="https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=1200"
//                 alt="Happy travelers exploring destinations"
//                 className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover"
//               />
              
//               {/* Floating Card 1 */}
//               <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg max-w-xs">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
//                     <Users className="h-5 w-5 text-green-600" />
//                   </div>
//                   <div>
//                     <div className="font-semibold text-gray-900">Group Tours</div>
//                     <div className="text-sm text-gray-600">Best Prices</div>
//                   </div>
//                 </div>
//               </div>

//               {/* Floating Card 2 */}
//               <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg max-w-xs">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
//                     <MapPin className="h-5 w-5 text-blue-600" />
//                   </div>
//                   <div>
//                     <div className="font-semibold text-gray-900">50+ Cities</div>
//                     <div className="text-sm text-gray-600">Worldwide</div>
//                   </div>
//                 </div>
//               </div>

//               {/* Gradient Overlay */}
//               <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
//             </div>
//           </div>

//           {/* Right Side - Text Content */}
//           <div className="flex-1 max-w-2xl">
//             <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
//               <Star className="h-4 w-4" />
//               Trending Destinations
//             </div>
//             <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
//               Trending Group{" "}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
//                 Holidays
//               </span>
//             </h2>
//             <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 leading-relaxed">
//               Discover iconic destinations across India and the world with our exclusive group tours! Experience unforgettable adventures with curated itineraries and expert guides.
//             </p>
            
//             {/* Stats Row */}
//             <div className="flex flex-wrap gap-6 mb-6">
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-blue-600">500K+</div>
//                 <div className="text-sm text-gray-600">Happy Travelers</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-blue-600">50+</div>
//                 <div className="text-sm text-gray-600">Destinations</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-blue-600">98%</div>
//                 <div className="text-sm text-gray-600">Satisfaction</div>
//               </div>
//             </div>

//             {/* CTA Button */}
//             <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
//               Explore All Tours
//               <ArrowRight className="h-5 w-5" />
//             </button>
//           </div>
//         </div>

//         {/* Destinations Grid */}
//         <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
//           {trendingDestinations.map((dest, index) => (
//             <div
//               key={dest.id}
//               className="group cursor-pointer animate-fade-in-up"
//               style={{ animationDelay: `${index * 100}ms` }}
//             >
//               <div className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white transform hover:-translate-y-2">
//                 {/* Image Container */}
//                 <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 w-full overflow-hidden">
//                   <img
//                     src={dest.image}
//                     alt={dest.name}
//                     className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
//                   />
                  
//                   {/* Gradient Overlay */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                  
//                   {/* Shine Effect */}
//                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  
//                   {/* Badge */}
//                   {dest.badge && (
//                     <div className="absolute top-4 left-4">
//                       <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white ${
//                         dest.badge === "Popular" ? "bg-orange-500" :
//                         dest.badge === "Hot" ? "bg-red-500" :
//                         dest.badge === "Trending" ? "bg-purple-500" :
//                         dest.badge === "New" ? "bg-green-500" :
//                         dest.badge === "Best Seller" ? "bg-amber-500" :
//                         "bg-blue-500"
//                       }`}>
//                         {dest.badge}
//                       </span>
//                     </div>
//                   )}
                  
//                   {/* Rating */}
//                   <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
//                     <Star className="h-3 w-3 text-yellow-400 fill-current" />
//                     <span className="text-xs font-semibold text-white">{dest.rating}</span>
//                   </div>
//                 </div>

//                 {/* Content */}
//                 <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 text-white">
//                   {/* Destination Name */}
//                   <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-cyan-100 transition-colors duration-300">
//                     {dest.name}
//                   </h3>
                  
//                   {/* Stats */}
//                   <div className="space-y-2">
//                     <div className="flex items-center gap-3 text-sm">
//                       <div className="flex items-center gap-1">
//                         <MapPin className="h-4 w-4 text-cyan-300" />
//                         <span className="font-medium">{dest.tours} Tours</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <Calendar className="h-4 w-4 text-cyan-300" />
//                         <span className="font-medium">{dest.departures} Departures</span>
//                       </div>
//                     </div>
                    
//                     {/* Guests Travelled */}
//                     <div className="flex items-center gap-2 pt-2 border-t border-white/20">
//                       <Users className="h-4 w-4 text-cyan-300" />
//                       <span className="text-sm font-semibold">
//                         {dest.guests.toLocaleString()}+ Guests Travelled
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Hover Effect Border */}
//                 <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-cyan-400/50 transition-all duration-500 pointer-events-none" />
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Bottom CTA Section */}
//         <div
//           className="text-center mt-12 md:mt-16 animate-fade-in-up"
//           style={{ animationDelay: "400ms" }}
//         >
//           <button className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//             <MapPin className="h-5 w-5" />
//             View All 50+ Destinations
//             <Users className="h-5 w-5" />
//           </button>
//           <p className="mt-4 text-gray-600 text-sm">
//             Join 500,000+ happy travelers who explored the world with us
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

// export default TrendingGroupHolidaysSection;







// import React, { useState } from "react";
// import { Users, MapPin, Calendar, Star, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

// const trendingDestinations = [
//   {
//     id: 1,
//     name: "Andaman",
//     tours: 5,
//     departures: 102,
//     guests: 28661,
//     image: "https://images.pexels.com/photos/7425765/pexels-photo-7425765.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     badge: "Popular"
//   },
//   {
//     id: 2,
//     name: "Kashmir",
//     tours: 13,
//     departures: 62,
//     guests: 130171,
//     image: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     badge: "Hot"
//   },
//   {
//     id: 3,
//     name: "Himachal",
//     tours: 14,
//     departures: 95,
//     guests: 212335,
//     image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.7,
//     badge: "Trending"
//   },
//   {
//     id: 4,
//     name: "North East",
//     tours: 5,
//     departures: 57,
//     guests: 5125,
//     image: "https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.6,
//     badge: "New"
//   },
//   {
//     id: 5,
//     name: "Sikkim Darjeeling",
//     tours: 6,
//     departures: 24,
//     guests: 29217,
//     image: "https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     badge: "Scenic"
//   },
//   {
//     id: 6,
//     name: "Leh Ladakh",
//     tours: 0,
//     departures: 0,
//     guests: 22979,
//     image: "https://images.pexels.com/photos/672358/pexels-photo-672358.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     badge: "Adventure"
//   }
// ];

// const TrendingGroupHolidaysSection: React.FC = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === trendingDestinations.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === 0 ? trendingDestinations.length - 1 : prevIndex - 1
//     );
//   };

//   const getVisibleCards = () => {
//     const cards = [];
//     const totalCards = trendingDestinations.length;
    
//     // Get current and next 2 cards for the layered effect
//     for (let i = 0; i < 3; i++) {
//       const index = (currentIndex + i) % totalCards;
//       cards.push(trendingDestinations[index]);
//     }
    
//     return cards;
//   };

//   return (
//     <section className="py-12 md:py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header with Carousel Left & Content Right */}
//         <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12 md:mb-16">
          
//           {/* Left Side - Layered Carousel */}
//           <div className="flex-1 max-w-lg lg:max-w-md xl:max-w-lg w-full">
//             <div className="relative h-96 sm:h-[500px] md:h-[550px]">
//               {getVisibleCards().map((dest, index) => (
//                 <div
//                   key={`${dest.id}-${index}`}
//                   className={`absolute inset-0 transition-all duration-500 ease-out transform ${
//                     index === 0 
//                       ? 'scale-100 z-30 translate-x-0 opacity-100' 
//                       : index === 1 
//                       ? 'scale-90 z-20 translate-x-8 opacity-80' 
//                       : 'scale-80 z-10 translate-x-16 opacity-60'
//                   }`}
//                   style={{
//                     transform: `scale(${1 - index * 0.1}) translateX(${index * 32}px)`,
//                     zIndex: 30 - index * 10,
//                   }}
//                 >
//                   <div className="relative rounded-3xl overflow-hidden shadow-2xl h-full">
//                     <img
//                       src={dest.image}
//                       alt={dest.name}
//                       className="w-full h-full object-cover"
//                     />
                    
//                     {/* Gradient Overlay */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    
//                     {/* Content Overlay */}
//                     <div className="absolute inset-x-0 bottom-0 p-6 text-white">
//                       <div className="flex items-center justify-between mb-3">
//                         <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white ${
//                           dest.badge === "Popular" ? "bg-orange-500" :
//                           dest.badge === "Hot" ? "bg-red-500" :
//                           dest.badge === "Trending" ? "bg-purple-500" :
//                           dest.badge === "New" ? "bg-green-500" :
//                           dest.badge === "Scenic" ? "bg-teal-500" :
//                           "bg-blue-500"
//                         }`}>
//                           {dest.badge}
//                         </span>
//                         <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
//                           <Star className="h-3 w-3 text-yellow-400 fill-current" />
//                           <span className="text-xs font-semibold">{dest.rating}</span>
//                         </div>
//                       </div>
                      
//                       <h3 className="text-xl font-bold mb-2">{dest.name}</h3>
                      
//                       <div className="space-y-2">
//                         <div className="flex items-center gap-3 text-sm">
//                           <div className="flex items-center gap-1">
//                             <MapPin className="h-4 w-4 text-cyan-300" />
//                             <span className="font-medium">{dest.tours} Tours</span>
//                           </div>
//                           <div className="flex items-center gap-1">
//                             <Calendar className="h-4 w-4 text-cyan-300" />
//                             <span className="font-medium">{dest.departures} Departures</span>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-center gap-2 pt-2 border-t border-white/20">
//                           <Users className="h-4 w-4 text-cyan-300" />
//                           <span className="text-sm font-semibold">
//                             {dest.guests.toLocaleString()}+ Guests
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}

//               {/* Navigation Arrows */}
//               <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-40">
//                 <button
//                   onClick={prevSlide}
//                   className="bg-white/90 hover:bg-white text-gray-800 hover:text-blue-600 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110"
//                 >
//                   <ChevronLeft className="h-5 w-5" />
//                 </button>
                
//                 <div className="flex items-center gap-1">
//                   {trendingDestinations.map((_, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setCurrentIndex(index)}
//                       className={`w-2 h-2 rounded-full transition-all duration-300 ${
//                         index === currentIndex ? 'bg-white w-6' : 'bg-white/50'
//                       }`}
//                     />
//                   ))}
//                 </div>
                
//                 <button
//                   onClick={nextSlide}
//                   className="bg-white/90 hover:bg-white text-gray-800 hover:text-blue-600 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110"
//                 >
//                   <ChevronRight className="h-5 w-5" />
//                 </button>
//               </div>

//               {/* Progress Indicator */}
//               <div className="absolute top-6 left-6 z-40">
//                 <div className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
//                   {currentIndex + 1} / {trendingDestinations.length}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Side - Text Content */}
//           <div className="flex-1 max-w-2xl">
//             <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
//               <Star className="h-4 w-4" />
//               Trending Destinations
//             </div>
//             <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
//               Explore Amazing{" "}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
//                 Group Holidays
//               </span>
//             </h2>
//             <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 leading-relaxed">
//               Discover the world's most breathtaking destinations with our carefully curated group tours. 
//               Each journey is designed to create unforgettable memories with like-minded travelers.
//             </p>
            
//             {/* Features List */}
//             <div className="space-y-4 mb-6">
//               <div className="flex items-center gap-3">
//                 <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
//                   <Users className="h-4 w-4 text-green-600" />
//                 </div>
//                 <div>
//                   <div className="font-semibold text-gray-900">Small Group Sizes</div>
//                   <div className="text-sm text-gray-600">Intimate experiences with 12-20 travelers</div>
//                 </div>
//               </div>
              
//               <div className="flex items-center gap-3">
//                 <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
//                   <MapPin className="h-4 w-4 text-blue-600" />
//                 </div>
//                 <div>
//                   <div className="font-semibold text-gray-900">Expert Local Guides</div>
//                   <div className="text-sm text-gray-600">Insider knowledge and authentic experiences</div>
//                 </div>
//               </div>
              
//               <div className="flex items-center gap-3">
//                 <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
//                   <Star className="h-4 w-4 text-purple-600" />
//                 </div>
//                 <div>
//                   <div className="font-semibold text-gray-900">All-Inclusive Packages</div>
//                   <div className="text-sm text-gray-600">No hidden costs, just pure enjoyment</div>
//                 </div>
//               </div>
//             </div>

//             {/* CTA Button */}
//             <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
//               Start Your Journey
//               <ArrowRight className="h-5 w-5" />
//             </button>
//           </div>
//         </div>

//         {/* Additional Destinations Grid */}
//         <div className="mt-16">
//           <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8">
//             More Amazing Destinations
//           </h3>
//           <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//             {trendingDestinations.slice(3).map((dest, index) => (
//               <div
//                 key={dest.id}
//                 className="group cursor-pointer animate-fade-in-up"
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 bg-white transform hover:-translate-y-2">
//                   <div className="relative h-48 w-full overflow-hidden">
//                     <img
//                       src={dest.image}
//                       alt={dest.name}
//                       className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    
//                     {dest.badge && (
//                       <div className="absolute top-3 left-3">
//                         <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold text-white ${
//                           dest.badge === "Popular" ? "bg-orange-500" :
//                           dest.badge === "Hot" ? "bg-red-500" :
//                           "bg-blue-500"
//                         }`}>
//                           {dest.badge}
//                         </span>
//                       </div>
//                     )}
//                   </div>

//                   <div className="absolute inset-x-0 bottom-0 p-4 text-white">
//                     <h3 className="text-lg font-bold mb-2">{dest.name}</h3>
//                     <div className="flex items-center gap-4 text-sm">
//                       <span>{dest.tours} Tours</span>
//                       <span>{dest.departures} Departures</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
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

// export default TrendingGroupHolidaysSection;







// import React, { useState } from "react";
// import { Users, MapPin, Calendar, Star, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

// const trendingDestinations = [
//   {
//     id: 1,
//     name: "Andaman",
//     tours: 5,
//     departures: 102,
//     guests: 28661,
//     image: "https://images.pexels.com/photos/7425765/pexels-photo-7425765.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     badge: "Popular"
//   },
//   {
//     id: 2,
//     name: "Kashmir",
//     tours: 13,
//     departures: 62,
//     guests: 130171,
//     image: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     badge: "Hot"
//   },
//   {
//     id: 3,
//     name: "Himachal",
//     tours: 14,
//     departures: 95,
//     guests: 212335,
//     image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.7,
//     badge: "Trending"
//   },
//   {
//     id: 4,
//     name: "North East",
//     tours: 5,
//     departures: 57,
//     guests: 5125,
//     image: "https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.6,
//     badge: "New"
//   },
//   {
//     id: 5,
//     name: "Sikkim Darjeeling",
//     tours: 6,
//     departures: 24,
//     guests: 29217,
//     image: "https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     badge: "Scenic"
//   },
//   {
//     id: 6,
//     name: "Leh Ladakh",
//     tours: 0,
//     departures: 0,
//     guests: 22979,
//     image: "https://images.pexels.com/photos/672358/pexels-photo-672358.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     badge: "Adventure"
//   }
// ];

// const TrendingGroupHolidaysSection: React.FC = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === trendingDestinations.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === 0 ? trendingDestinations.length - 1 : prevIndex - 1
//     );
//   };

//   return (
//     <section className="py-12 md:py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header with Carousel Left & Content Right */}
//         <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12 md:mb-16">
          
//           {/* Left Side - Carousel */}
//           <div className="flex-1 max-w-lg lg:max-w-md xl:max-w-lg w-full">
//             <div className="relative rounded-3xl overflow-hidden shadow-2xl">
//               {/* Main Carousel Image */}
//               <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 w-full">
//                 <img
//                   src={trendingDestinations[currentIndex].image}
//                   alt={trendingDestinations[currentIndex].name}
//                   className="w-full h-full object-cover"
//                 />
                
//                 {/* Gradient Overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
//                 {/* Floating Card 1 */}
//                 <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg max-w-xs">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
//                       <Users className="h-5 w-5 text-green-600" />
//                     </div>
//                     <div>
//                       <div className="font-semibold text-gray-900">Group Tours</div>
//                       <div className="text-sm text-gray-600">Best Prices</div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Floating Card 2 */}
//                 <div className="absolute bottom-20 right-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg max-w-xs">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
//                       <MapPin className="h-5 w-5 text-blue-600" />
//                     </div>
//                     <div>
//                       <div className="font-semibold text-gray-900">50+ Cities</div>
//                       <div className="text-sm text-gray-600">Worldwide</div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Destination Info */}
//                 <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
//                   <div className="flex items-center justify-between mb-3">
//                     <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white ${
//                       trendingDestinations[currentIndex].badge === "Popular" ? "bg-orange-500" :
//                       trendingDestinations[currentIndex].badge === "Hot" ? "bg-red-500" :
//                       trendingDestinations[currentIndex].badge === "Trending" ? "bg-purple-500" :
//                       trendingDestinations[currentIndex].badge === "New" ? "bg-green-500" :
//                       trendingDestinations[currentIndex].badge === "Scenic" ? "bg-teal-500" :
//                       "bg-blue-500"
//                     }`}>
//                       {trendingDestinations[currentIndex].badge}
//                     </span>
//                     <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
//                       <Star className="h-3 w-3 text-yellow-400 fill-current" />
//                       <span className="text-xs font-semibold">{trendingDestinations[currentIndex].rating}</span>
//                     </div>
//                   </div>
                  
//                   <h3 className="text-xl font-bold mb-2">{trendingDestinations[currentIndex].name}</h3>
                  
//                   <div className="space-y-2">
//                     <div className="flex items-center gap-3 text-sm">
//                       <div className="flex items-center gap-1">
//                         <MapPin className="h-4 w-4 text-cyan-300" />
//                         <span className="font-medium">{trendingDestinations[currentIndex].tours} Tours</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <Calendar className="h-4 w-4 text-cyan-300" />
//                         <span className="font-medium">{trendingDestinations[currentIndex].departures} Departures</span>
//                       </div>
//                     </div>
                    
//                     <div className="flex items-center gap-2 pt-2 border-t border-white/20">
//                       <Users className="h-4 w-4 text-cyan-300" />
//                       <span className="text-sm font-semibold">
//                         {trendingDestinations[currentIndex].guests.toLocaleString()}+ Guests Travelled
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Navigation Arrows */}
//               <div className="absolute top-1/2 left-4 right-4 flex items-center justify-between transform -translate-y-1/2 z-10">
//                 <button
//                   onClick={prevSlide}
//                   className="bg-white/90 hover:bg-white text-gray-800 hover:text-blue-600 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110"
//                 >
//                   <ChevronLeft className="h-5 w-5" />
//                 </button>
                
//                 <button
//                   onClick={nextSlide}
//                   className="bg-white/90 hover:bg-white text-gray-800 hover:text-blue-600 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110"
//                 >
//                   <ChevronRight className="h-5 w-5" />
//                 </button>
//               </div>

//               {/* Dot Indicators */}
//               <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 z-10">
//                 {trendingDestinations.map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setCurrentIndex(index)}
//                     className={`w-2 h-2 rounded-full transition-all duration-300 ${
//                       index === currentIndex ? 'bg-white w-6' : 'bg-white/50'
//                     }`}
//                   />
//                 ))}
//               </div>

//               {/* Progress Indicator */}
//               <div className="absolute top-4 right-4 z-10">
//                 <div className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
//                   {currentIndex + 1} / {trendingDestinations.length}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Side - Text Content */}
//           <div className="flex-1 max-w-2xl">
//             <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
//               <Star className="h-4 w-4" />
//               Trending Destinations
//             </div>
//             <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
//               Trending Group{" "}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
//                 Holidays
//               </span>
//             </h2>
//             <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 leading-relaxed">
//               Discover iconic destinations across India and the world with our exclusive group tours! Experience unforgettable adventures with curated itineraries and expert guides.
//             </p>
            
//             {/* Stats Row */}
//             <div className="flex flex-wrap gap-6 mb-6">
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-blue-600">500K+</div>
//                 <div className="text-sm text-gray-600">Happy Travelers</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-blue-600">50+</div>
//                 <div className="text-sm text-gray-600">Destinations</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-blue-600">98%</div>
//                 <div className="text-sm text-gray-600">Satisfaction</div>
//               </div>
//             </div>

//             {/* CTA Button */}
//             <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
//               Explore All Tours
//               <ArrowRight className="h-5 w-5" />
//             </button>
//           </div>
//         </div>

//         {/* Destinations Grid */}
//         <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
//           {trendingDestinations.map((dest, index) => (
//             <div
//               key={dest.id}
//               className="group cursor-pointer animate-fade-in-up"
//               style={{ animationDelay: `${index * 100}ms` }}
//             >
//               <div className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white transform hover:-translate-y-2">
//                 {/* Image Container */}
//                 <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 w-full overflow-hidden">
//                   <img
//                     src={dest.image}
//                     alt={dest.name}
//                     className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
//                   />
                  
//                   {/* Gradient Overlay */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                  
//                   {/* Shine Effect */}
//                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  
//                   {/* Badge */}
//                   {dest.badge && (
//                     <div className="absolute top-4 left-4">
//                       <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white ${
//                         dest.badge === "Popular" ? "bg-orange-500" :
//                         dest.badge === "Hot" ? "bg-red-500" :
//                         dest.badge === "Trending" ? "bg-purple-500" :
//                         dest.badge === "New" ? "bg-green-500" :
//                         dest.badge === "Best Seller" ? "bg-amber-500" :
//                         "bg-blue-500"
//                       }`}>
//                         {dest.badge}
//                       </span>
//                     </div>
//                   )}
                  
//                   {/* Rating */}
//                   <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
//                     <Star className="h-3 w-3 text-yellow-400 fill-current" />
//                     <span className="text-xs font-semibold text-white">{dest.rating}</span>
//                   </div>
//                 </div>

//                 {/* Content */}
//                 <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 text-white">
//                   {/* Destination Name */}
//                   <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-cyan-100 transition-colors duration-300">
//                     {dest.name}
//                   </h3>
                  
//                   {/* Stats */}
//                   <div className="space-y-2">
//                     <div className="flex items-center gap-3 text-sm">
//                       <div className="flex items-center gap-1">
//                         <MapPin className="h-4 w-4 text-cyan-300" />
//                         <span className="font-medium">{dest.tours} Tours</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <Calendar className="h-4 w-4 text-cyan-300" />
//                         <span className="font-medium">{dest.departures} Departures</span>
//                       </div>
//                     </div>
                    
//                     {/* Guests Travelled */}
//                     <div className="flex items-center gap-2 pt-2 border-t border-white/20">
//                       <Users className="h-4 w-4 text-cyan-300" />
//                       <span className="text-sm font-semibold">
//                         {dest.guests.toLocaleString()}+ Guests Travelled
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Hover Effect Border */}
//                 <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-cyan-400/50 transition-all duration-500 pointer-events-none" />
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Bottom CTA Section */}
//         <div
//           className="text-center mt-12 md:mt-16 animate-fade-in-up"
//           style={{ animationDelay: "400ms" }}
//         >
//           <button className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//             <MapPin className="h-5 w-5" />
//             View All 50+ Destinations
//             <Users className="h-5 w-5" />
//           </button>
//           <p className="mt-4 text-gray-600 text-sm">
//             Join 500,000+ happy travelers who explored the world with us
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

// export default TrendingGroupHolidaysSection;






// import React, { useState, useRef } from "react";
// import { Users, MapPin, Calendar, Star, ArrowRight, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

// const trendingDestinations = [
//   {
//     id: 1,
//     name: "Andaman",
//     tours: 5,
//     departures: 102,
//     guests: 28661,
//     image: "https://images.pexels.com/photos/7425765/pexels-photo-7425765.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     badge: "Popular"
//   },
//   {
//     id: 2,
//     name: "Kashmir",
//     tours: 13,
//     departures: 62,
//     guests: 130171,
//     image: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     badge: "Hot"
//   },
//   {
//     id: 3,
//     name: "Himachal",
//     tours: 14,
//     departures: 95,
//     guests: 212335,
//     image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.7,
//     badge: "Trending"
//   },
//   {
//     id: 4,
//     name: "North East",
//     tours: 5,
//     departures: 57,
//     guests: 5125,
//     image: "https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.6,
//     badge: "New"
//   },
//   {
//     id: 5,
//     name: "Sikkim Darjeeling",
//     tours: 6,
//     departures: 24,
//     guests: 29217,
//     image: "https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     badge: "Scenic"
//   },
//   {
//     id: 6,
//     name: "Leh Ladakh",
//     tours: 0,
//     departures: 0,
//     guests: 22979,
//     image: "https://images.pexels.com/photos/672358/pexels-photo-672358.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     badge: "Adventure"
//   }
// ];

// const VideoPlayer = () => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const videoRef = useRef<HTMLVideoElement>(null);

//   const togglePlay = () => {
//     if (videoRef.current) {
//       if (isPlaying) {
//         videoRef.current.pause();
//       } else {
//         videoRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   return (
//     <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-black group h-full">
//       {/* Video Player */}
//       <div className="relative h-full w-full">
//         <video
//           ref={videoRef}
//           src="https://assets.mixkit.co/videos/preview/mixkit-going-down-a-curved-highway-through-a-mountain-range-41576-large.mp4"
//           className="w-full h-full object-cover"
//           muted
//           loop
//           onPlay={() => setIsPlaying(true)}
//           onPause={() => setIsPlaying(false)}
//         />
        
//         {/* Gradient Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
//         {/* Play/Pause Button */}
//         <button
//           onClick={togglePlay}
//           className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-4 transition-all duration-300 group-hover:scale-110"
//         >
//           {isPlaying ? (
//             <Pause className="h-8 w-8 text-white" />
//           ) : (
//             <Play className="h-8 w-8 text-white" />
//           )}
//         </button>

//         {/* Video Info */}
//         <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
//           <div className="flex items-center justify-between mb-2">
//             <h3 className="text-xl font-bold">Mountain Adventures</h3>
//             <div className="flex items-center gap-4 text-sm">
//               <span>2:30</span>
//               <span>15K views</span>
//             </div>
//           </div>
//           <p className="text-sm text-gray-200">
//             Experience the thrill of Himalayan treks and breathtaking landscapes with our guided tours
//           </p>
//         </div>

//         {/* Live Badge */}
//         <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
//           LIVE
//         </div>

//         {/* Sound Indicator */}
//         <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
//           🔇 Muted
//         </div>
//       </div>

//       {/* Hover Effect Border */}
//       <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/30 transition-all duration-500 pointer-events-none" />
//     </div>
//   );
// };

// const TrendingGroupHolidaysSection: React.FC = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === trendingDestinations.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === 0 ? trendingDestinations.length - 1 : prevIndex - 1
//     );
//   };

//   return (
//     <section className="py-12 md:py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header with Carousel Left & Content Right */}
//         <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12 md:mb-16">
          
//           {/* Left Side - Carousel */}
//           <div className="flex-1 max-w-lg lg:max-w-md xl:max-w-lg w-full">
//             <div className="relative rounded-3xl overflow-hidden shadow-2xl">
//               {/* Main Carousel Image */}
//               <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 w-full">
//                 <img
//                   src={trendingDestinations[currentIndex].image}
//                   alt={trendingDestinations[currentIndex].name}
//                   className="w-full h-full object-cover"
//                 />
                
//                 {/* Gradient Overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
//                 {/* Floating Card 1 */}
//                 <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg max-w-xs">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
//                       <Users className="h-5 w-5 text-green-600" />
//                     </div>
//                     <div>
//                       <div className="font-semibold text-gray-900">Group Tours</div>
//                       <div className="text-sm text-gray-600">Best Prices</div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Floating Card 2 */}
//                 <div className="absolute bottom-20 right-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg max-w-xs">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
//                       <MapPin className="h-5 w-5 text-blue-600" />
//                     </div>
//                     <div>
//                       <div className="font-semibold text-gray-900">50+ Cities</div>
//                       <div className="text-sm text-gray-600">Worldwide</div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Destination Info */}
//                 <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
//                   <div className="flex items-center justify-between mb-3">
//                     <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white ${
//                       trendingDestinations[currentIndex].badge === "Popular" ? "bg-orange-500" :
//                       trendingDestinations[currentIndex].badge === "Hot" ? "bg-red-500" :
//                       trendingDestinations[currentIndex].badge === "Trending" ? "bg-purple-500" :
//                       trendingDestinations[currentIndex].badge === "New" ? "bg-green-500" :
//                       trendingDestinations[currentIndex].badge === "Scenic" ? "bg-teal-500" :
//                       "bg-blue-500"
//                     }`}>
//                       {trendingDestinations[currentIndex].badge}
//                     </span>
//                     <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
//                       <Star className="h-3 w-3 text-yellow-400 fill-current" />
//                       <span className="text-xs font-semibold">{trendingDestinations[currentIndex].rating}</span>
//                     </div>
//                   </div>
                  
//                   <h3 className="text-xl font-bold mb-2">{trendingDestinations[currentIndex].name}</h3>
                  
//                   <div className="space-y-2">
//                     <div className="flex items-center gap-3 text-sm">
//                       <div className="flex items-center gap-1">
//                         <MapPin className="h-4 w-4 text-cyan-300" />
//                         <span className="font-medium">{trendingDestinations[currentIndex].tours} Tours</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <Calendar className="h-4 w-4 text-cyan-300" />
//                         <span className="font-medium">{trendingDestinations[currentIndex].departures} Departures</span>
//                       </div>
//                     </div>
                    
//                     <div className="flex items-center gap-2 pt-2 border-t border-white/20">
//                       <Users className="h-4 w-4 text-cyan-300" />
//                       <span className="text-sm font-semibold">
//                         {trendingDestinations[currentIndex].guests.toLocaleString()}+ Guests Travelled
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Navigation Arrows */}
//               <div className="absolute top-1/2 left-4 right-4 flex items-center justify-between transform -translate-y-1/2 z-10">
//                 <button
//                   onClick={prevSlide}
//                   className="bg-white/90 hover:bg-white text-gray-800 hover:text-blue-600 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110"
//                 >
//                   <ChevronLeft className="h-5 w-5" />
//                 </button>
                
//                 <button
//                   onClick={nextSlide}
//                   className="bg-white/90 hover:bg-white text-gray-800 hover:text-blue-600 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110"
//                 >
//                   <ChevronRight className="h-5 w-5" />
//                 </button>
//               </div>

//               {/* Dot Indicators */}
//               <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 z-10">
//                 {trendingDestinations.map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setCurrentIndex(index)}
//                     className={`w-2 h-2 rounded-full transition-all duration-300 ${
//                       index === currentIndex ? 'bg-white w-6' : 'bg-white/50'
//                     }`}
//                   />
//                 ))}
//               </div>

//               {/* Progress Indicator */}
//               <div className="absolute top-4 right-4 z-10">
//                 <div className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
//                   {currentIndex + 1} / {trendingDestinations.length}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Side - Text Content */}
//           <div className="flex-1 max-w-2xl">
//             <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
//               <Star className="h-4 w-4" />
//               Trending Destinations
//             </div>
//             <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
//               Trending Group{" "}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
//                 Holidays
//               </span>
//             </h2>
//             <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 leading-relaxed">
//               Discover iconic destinations across India and the world with our exclusive group tours! Experience unforgettable adventures with curated itineraries and expert guides.
//             </p>
            
//             {/* Stats Row */}
//             <div className="flex flex-wrap gap-6 mb-6">
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-blue-600">500K+</div>
//                 <div className="text-sm text-gray-600">Happy Travelers</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-blue-600">50+</div>
//                 <div className="text-sm text-gray-600">Destinations</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-blue-600">98%</div>
//                 <div className="text-sm text-gray-600">Satisfaction</div>
//               </div>
//             </div>

//             {/* CTA Button */}
//             <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
//               Explore All Tours
//               <ArrowRight className="h-5 w-5" />
//             </button>
//           </div>
//         </div>

//         {/* Destinations Grid with Video */}
//         <div className="space-y-6 lg:space-y-8">
//           {/* First Row - 4 Cards */}
//           <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//             {trendingDestinations.slice(0, 4).map((dest, index) => (
//               <div
//                 key={dest.id}
//                 className="group cursor-pointer animate-fade-in-up"
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 <div className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white transform hover:-translate-y-2">
//                   {/* Image Container */}
//                   <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 w-full overflow-hidden">
//                     <img
//                       src={dest.image}
//                       alt={dest.name}
//                       className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
//                     />
                    
//                     {/* Gradient Overlay */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                    
//                     {/* Shine Effect */}
//                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    
//                     {/* Badge */}
//                     {dest.badge && (
//                       <div className="absolute top-4 left-4">
//                         <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white ${
//                           dest.badge === "Popular" ? "bg-orange-500" :
//                           dest.badge === "Hot" ? "bg-red-500" :
//                           dest.badge === "Trending" ? "bg-purple-500" :
//                           dest.badge === "New" ? "bg-green-500" :
//                           dest.badge === "Best Seller" ? "bg-amber-500" :
//                           "bg-blue-500"
//                         }`}>
//                           {dest.badge}
//                         </span>
//                       </div>
//                     )}
                    
//                     {/* Rating */}
//                     <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
//                       <Star className="h-3 w-3 text-yellow-400 fill-current" />
//                       <span className="text-xs font-semibold text-white">{dest.rating}</span>
//                     </div>
//                   </div>

//                   {/* Content */}
//                   <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 text-white">
//                     {/* Destination Name */}
//                     <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-cyan-100 transition-colors duration-300">
//                       {dest.name}
//                     </h3>
                    
//                     {/* Stats */}
//                     <div className="space-y-2">
//                       <div className="flex items-center gap-3 text-sm">
//                         <div className="flex items-center gap-1">
//                           <MapPin className="h-4 w-4 text-cyan-300" />
//                           <span className="font-medium">{dest.tours} Tours</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Calendar className="h-4 w-4 text-cyan-300" />
//                           <span className="font-medium">{dest.departures} Departures</span>
//                         </div>
//                       </div>
                      
//                       {/* Guests Travelled */}
//                       <div className="flex items-center gap-2 pt-2 border-t border-white/20">
//                         <Users className="h-4 w-4 text-cyan-300" />
//                         <span className="text-sm font-semibold">
//                           {dest.guests.toLocaleString()}+ Guests Travelled
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Hover Effect Border */}
//                   <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-cyan-400/50 transition-all duration-500 pointer-events-none" />
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Second Row - 2 Cards + Video */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
//             {/* First 2 Cards */}
//             {trendingDestinations.slice(4, 6).map((dest, index) => (
//               <div
//                 key={dest.id}
//                 className="group cursor-pointer animate-fade-in-up"
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 <div className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white transform hover:-translate-y-2 h-full">
//                   {/* Image Container */}
//                   <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 w-full overflow-hidden">
//                     <img
//                       src={dest.image}
//                       alt={dest.name}
//                       className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
//                     />
                    
//                     {/* Gradient Overlay */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                    
//                     {/* Badge */}
//                     {dest.badge && (
//                       <div className="absolute top-4 left-4">
//                         <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white ${
//                           dest.badge === "Popular" ? "bg-orange-500" :
//                           dest.badge === "Hot" ? "bg-red-500" :
//                           dest.badge === "Trending" ? "bg-purple-500" :
//                           dest.badge === "New" ? "bg-green-500" :
//                           dest.badge === "Best Seller" ? "bg-amber-500" :
//                           "bg-blue-500"
//                         }`}>
//                           {dest.badge}
//                         </span>
//                       </div>
//                     )}
                    
//                     {/* Rating */}
//                     <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
//                       <Star className="h-3 w-3 text-yellow-400 fill-current" />
//                       <span className="text-xs font-semibold text-white">{dest.rating}</span>
//                     </div>
//                   </div>

//                   {/* Content */}
//                   <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 text-white">
//                     <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-cyan-100 transition-colors duration-300">
//                       {dest.name}
//                     </h3>
                    
//                     <div className="space-y-2">
//                       <div className="flex items-center gap-3 text-sm">
//                         <div className="flex items-center gap-1">
//                           <MapPin className="h-4 w-4 text-cyan-300" />
//                           <span className="font-medium">{dest.tours} Tours</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Calendar className="h-4 w-4 text-cyan-300" />
//                           <span className="font-medium">{dest.departures} Departures</span>
//                         </div>
//                       </div>
                      
//                       <div className="flex items-center gap-2 pt-2 border-t border-white/20">
//                         <Users className="h-4 w-4 text-cyan-300" />
//                         <span className="text-sm font-semibold">
//                           {dest.guests.toLocaleString()}+ Guests Travelled
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Hover Effect Border */}
//                   <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-cyan-400/50 transition-all duration-500 pointer-events-none" />
//                 </div>
//               </div>
//             ))}

//             {/* Video Player in the remaining space */}
//             <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
//               <VideoPlayer />
//             </div>
//           </div>
//         </div>

//         {/* Bottom CTA Section */}
//         <div
//           className="text-center mt-12 md:mt-16 animate-fade-in-up"
//           style={{ animationDelay: "400ms" }}
//         >
//           <button className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//             <MapPin className="h-5 w-5" />
//             View All 50+ Destinations
//             <Users className="h-5 w-5" />
//           </button>
//           <p className="mt-4 text-gray-600 text-sm">
//             Join 500,000+ happy travelers who explored the world with us
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

// export default TrendingGroupHolidaysSection;





// import React, { useState, useRef } from "react";
// import { Users, MapPin, Calendar, Star, ArrowRight, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

// const trendingDestinations = [
//   {
//     id: 1,
//     name: "Andaman",
//     tours: 5,
//     departures: 102,
//     guests: 28661,
//     image: "https://images.pexels.com/photos/7425765/pexels-photo-7425765.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     badge: "Popular"
//   },
//   {
//     id: 2,
//     name: "Kashmir",
//     tours: 13,
//     departures: 62,
//     guests: 130171,
//     image: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     badge: "Hot"
//   },
//   {
//     id: 3,
//     name: "Himachal",
//     tours: 14,
//     departures: 95,
//     guests: 212335,
//     image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.7,
//     badge: "Trending"
//   },
//   {
//     id: 4,
//     name: "North East",
//     tours: 5,
//     departures: 57,
//     guests: 5125,
//     image: "https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.6,
//     badge: "New"
//   },
//   {
//     id: 5,
//     name: "Sikkim Darjeeling",
//     tours: 6,
//     departures: 24,
//     guests: 29217,
//     image: "https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     badge: "Scenic"
//   },
//   {
//     id: 6,
//     name: "Leh Ladakh",
//     tours: 0,
//     departures: 0,
//     guests: 22979,
//     image: "https://images.pexels.com/photos/672358/pexels-photo-672358.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     badge: "Adventure"
//   }
// ];

// const VideoPlayer = () => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const videoRef = useRef<HTMLVideoElement>(null);

//   const togglePlay = () => {
//     if (videoRef.current) {
//       if (isPlaying) {
//         videoRef.current.pause();
//       } else {
//         videoRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   return (
//     <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-black group h-full">
//       {/* Video Player */}
//       <div className="relative h-full w-full">
//         <video
//           ref={videoRef}
//           src="https://assets.mixkit.co/videos/preview/mixkit-going-down-a-curved-highway-through-a-mountain-range-41576-large.mp4"
//           className="w-full h-full object-cover"
//           muted
//           loop
//           onPlay={() => setIsPlaying(true)}
//           onPause={() => setIsPlaying(false)}
//         />
        
//         {/* Gradient Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
//         {/* Play/Pause Button */}
//         <button
//           onClick={togglePlay}
//           className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-4 transition-all duration-300 group-hover:scale-110"
//         >
//           {isPlaying ? (
//             <Pause className="h-8 w-8 text-white" />
//           ) : (
//             <Play className="h-8 w-8 text-white" />
//           )}
//         </button>

//         {/* Video Info */}
//         <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
//           <h3 className="text-xl font-bold mb-2">Mountain Adventures</h3>
//           <p className="text-sm text-gray-200">
//             Experience the thrill of Himalayan treks and breathtaking landscapes with our guided tours
//           </p>
//         </div>
//       </div>

//       {/* Hover Effect Border */}
//       <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/30 transition-all duration-500 pointer-events-none" />
//     </div>
//   );
// };

// const TrendingGroupHolidaysSection: React.FC = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === trendingDestinations.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === 0 ? trendingDestinations.length - 1 : prevIndex - 1
//     );
//   };

//   return (
//     <section className="py-6 md:py-6 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header with Carousel Left & Content Right */}
//         <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12 md:mb-16">
          
//           {/* Left Side - Carousel */}
//           <div className="flex-1 max-w-lg lg:max-w-md xl:max-w-lg w-full">
//             <div className="relative rounded-3xl overflow-hidden shadow-2xl">
//               {/* Main Carousel Image */}
//               <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 w-full">
//                 <img
//                   src={trendingDestinations[currentIndex].image}
//                   alt={trendingDestinations[currentIndex].name}
//                   className="w-full h-full object-cover"
//                 />
                
//                 {/* Gradient Overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
//                 {/* Floating Card 1 */}
//                 <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg max-w-xs">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
//                       <Users className="h-5 w-5 text-green-600" />
//                     </div>
//                     <div>
//                       <div className="font-semibold text-gray-900">Group Tours</div>
//                       <div className="text-sm text-gray-600">Best Prices</div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Floating Card 2 */}
//                 <div className="absolute bottom-20 right-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg max-w-xs">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
//                       <MapPin className="h-5 w-5 text-blue-600" />
//                     </div>
//                     <div>
//                       <div className="font-semibold text-gray-900">50+ Cities</div>
//                       <div className="text-sm text-gray-600">Worldwide</div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Destination Info */}
//                 <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
//                   <div className="flex items-center justify-between mb-3">
//                     <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white ${
//                       trendingDestinations[currentIndex].badge === "Popular" ? "bg-orange-500" :
//                       trendingDestinations[currentIndex].badge === "Hot" ? "bg-red-500" :
//                       trendingDestinations[currentIndex].badge === "Trending" ? "bg-purple-500" :
//                       trendingDestinations[currentIndex].badge === "New" ? "bg-green-500" :
//                       trendingDestinations[currentIndex].badge === "Scenic" ? "bg-teal-500" :
//                       "bg-blue-500"
//                     }`}>
//                       {trendingDestinations[currentIndex].badge}
//                     </span>
//                     <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
//                       <Star className="h-3 w-3 text-yellow-400 fill-current" />
//                       <span className="text-xs font-semibold">{trendingDestinations[currentIndex].rating}</span>
//                     </div>
//                   </div>
                  
//                   <h3 className="text-xl font-bold mb-2">{trendingDestinations[currentIndex].name}</h3>
                  
//                   <div className="space-y-2">
//                     <div className="flex items-center gap-3 text-sm">
//                       <div className="flex items-center gap-1">
//                         <MapPin className="h-4 w-4 text-cyan-300" />
//                         <span className="font-medium">{trendingDestinations[currentIndex].tours} Tours</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <Calendar className="h-4 w-4 text-cyan-300" />
//                         <span className="font-medium">{trendingDestinations[currentIndex].departures} Departures</span>
//                       </div>
//                     </div>
                    
//                     <div className="flex items-center gap-2 pt-2 border-t border-white/20">
//                       <Users className="h-4 w-4 text-cyan-300" />
//                       <span className="text-sm font-semibold">
//                         {trendingDestinations[currentIndex].guests.toLocaleString()}+ Guests Travelled
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Navigation Arrows */}
//               <div className="absolute top-1/2 left-4 right-4 flex items-center justify-between transform -translate-y-1/2 z-10">
//                 <button
//                   onClick={prevSlide}
//                   className="bg-white/90 hover:bg-white text-gray-800 hover:text-blue-600 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110"
//                 >
//                   <ChevronLeft className="h-5 w-5" />
//                 </button>
                
//                 <button
//                   onClick={nextSlide}
//                   className="bg-white/90 hover:bg-white text-gray-800 hover:text-blue-600 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110"
//                 >
//                   <ChevronRight className="h-5 w-5" />
//                 </button>
//               </div>

//               {/* Dot Indicators */}
//               <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 z-10">
//                 {trendingDestinations.map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setCurrentIndex(index)}
//                     className={`w-2 h-2 rounded-full transition-all duration-300 ${
//                       index === currentIndex ? 'bg-white w-6' : 'bg-white/50'
//                     }`}
//                   />
//                 ))}
//               </div>

//               {/* Progress Indicator */}
//               <div className="absolute top-4 right-4 z-10">
//                 <div className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
//                   {currentIndex + 1} / {trendingDestinations.length}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Side - Text Content */}
//           <div className="flex-1 max-w-2xl">
//             <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
//               <Star className="h-4 w-4" />
//               Trending Destinations
//             </div>
//             <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
//               Trending Group{" "}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
//                 Holidays
//               </span>
//             </h2>
//             <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 leading-relaxed">
//               Discover iconic destinations across India and the world with our exclusive group tours! Experience unforgettable adventures with curated itineraries and expert guides.
//             </p>
            
//             {/* Stats Row */}
//             <div className="flex flex-wrap gap-6 mb-6">
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-blue-600">500K+</div>
//                 <div className="text-sm text-gray-600">Happy Travelers</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-blue-600">50+</div>
//                 <div className="text-sm text-gray-600">Destinations</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-blue-600">98%</div>
//                 <div className="text-sm text-gray-600">Satisfaction</div>
//               </div>
//             </div>

//             {/* CTA Button */}
//             <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
//               Explore All Tours
//               <ArrowRight className="h-5 w-5" />
//             </button>
//           </div>
//         </div>

//         {/* Destinations Grid with Video */}
//         <div className="space-y-6 lg:space-y-8">
//           {/* First Row - 4 Cards */}
//           <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//             {trendingDestinations.slice(0, 4).map((dest, index) => (
//               <div
//                 key={dest.id}
//                 className="group cursor-pointer animate-fade-in-up"
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 <div className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white transform hover:-translate-y-2">
//                   {/* Image Container */}
//                   <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 w-full overflow-hidden">
//                     <img
//                       src={dest.image}
//                       alt={dest.name}
//                       className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
//                     />
                    
//                     {/* Gradient Overlay */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                    
//                     {/* Shine Effect */}
//                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    
//                     {/* Badge */}
//                     {dest.badge && (
//                       <div className="absolute top-4 left-4">
//                         <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white ${
//                           dest.badge === "Popular" ? "bg-orange-500" :
//                           dest.badge === "Hot" ? "bg-red-500" :
//                           dest.badge === "Trending" ? "bg-purple-500" :
//                           dest.badge === "New" ? "bg-green-500" :
//                           dest.badge === "Best Seller" ? "bg-amber-500" :
//                           "bg-blue-500"
//                         }`}>
//                           {dest.badge}
//                         </span>
//                       </div>
//                     )}
                    
//                     {/* Rating */}
//                     <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
//                       <Star className="h-3 w-3 text-yellow-400 fill-current" />
//                       <span className="text-xs font-semibold text-white">{dest.rating}</span>
//                     </div>
//                   </div>

//                   {/* Content */}
//                   <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 text-white">
//                     {/* Destination Name */}
//                     <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-cyan-100 transition-colors duration-300">
//                       {dest.name}
//                     </h3>
                    
//                     {/* Stats */}
//                     <div className="space-y-2">
//                       <div className="flex items-center gap-3 text-sm">
//                         <div className="flex items-center gap-1">
//                           <MapPin className="h-4 w-4 text-cyan-300" />
//                           <span className="font-medium">{dest.tours} Tours</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Calendar className="h-4 w-4 text-cyan-300" />
//                           <span className="font-medium">{dest.departures} Departures</span>
//                         </div>
//                       </div>
                      
//                       {/* Guests Travelled */}
//                       <div className="flex items-center gap-2 pt-2 border-t border-white/20">
//                         <Users className="h-4 w-4 text-cyan-300" />
//                         <span className="text-sm font-semibold">
//                           {dest.guests.toLocaleString()}+ Guests Travelled
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Hover Effect Border */}
//                   <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-cyan-400/50 transition-all duration-500 pointer-events-none" />
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Second Row - 2 Cards + Video */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
//             {/* First 2 Cards */}
//             {trendingDestinations.slice(4, 6).map((dest, index) => (
//               <div
//                 key={dest.id}
//                 className="group cursor-pointer animate-fade-in-up"
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 <div className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white transform hover:-translate-y-2 h-full">
//                   {/* Image Container */}
//                   <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 w-full overflow-hidden">
//                     <img
//                       src={dest.image}
//                       alt={dest.name}
//                       className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
//                     />
                    
//                     {/* Gradient Overlay */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                    
//                     {/* Badge */}
//                     {dest.badge && (
//                       <div className="absolute top-4 left-4">
//                         <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white ${
//                           dest.badge === "Popular" ? "bg-orange-500" :
//                           dest.badge === "Hot" ? "bg-red-500" :
//                           dest.badge === "Trending" ? "bg-purple-500" :
//                           dest.badge === "New" ? "bg-green-500" :
//                           dest.badge === "Best Seller" ? "bg-amber-500" :
//                           "bg-blue-500"
//                         }`}>
//                           {dest.badge}
//                         </span>
//                       </div>
//                     )}
                    
//                     {/* Rating */}
//                     <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
//                       <Star className="h-3 w-3 text-yellow-400 fill-current" />
//                       <span className="text-xs font-semibold text-white">{dest.rating}</span>
//                     </div>
//                   </div>

//                   {/* Content */}
//                   <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 text-white">
//                     <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-cyan-100 transition-colors duration-300">
//                       {dest.name}
//                     </h3>
                    
//                     <div className="space-y-2">
//                       <div className="flex items-center gap-3 text-sm">
//                         <div className="flex items-center gap-1">
//                           <MapPin className="h-4 w-4 text-cyan-300" />
//                           <span className="font-medium">{dest.tours} Tours</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Calendar className="h-4 w-4 text-cyan-300" />
//                           <span className="font-medium">{dest.departures} Departures</span>
//                         </div>
//                       </div>
                      
//                       <div className="flex items-center gap-2 pt-2 border-t border-white/20">
//                         <Users className="h-4 w-4 text-cyan-300" />
//                         <span className="text-sm font-semibold">
//                           {dest.guests.toLocaleString()}+ Guests Travelled
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Hover Effect Border */}
//                   <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-cyan-400/50 transition-all duration-500 pointer-events-none" />
//                 </div>
//               </div>
//             ))}

//             {/* Video Player in the remaining space */}
//             <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
//               <VideoPlayer />
//             </div>
//           </div>
//         </div>

//         {/* Bottom CTA Section */}
//         <div
//           className="text-center mt-12 md:mt-16 animate-fade-in-up"
//           style={{ animationDelay: "400ms" }}
//         >
//           <button className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//             <MapPin className="h-5 w-5" />
//             View All 50+ Destinations
//             <Users className="h-5 w-5" />
//           </button>
//           <p className="mt-4 text-gray-600 text-sm">
//             Join 500,000+ happy travelers who explored the world with us
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

// export default TrendingGroupHolidaysSection;






// import React, { useState, useRef } from "react";
// import { Users, MapPin, Calendar, Star, ArrowRight, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

// const carouselDestinations = [
//   {
//     id: 1,
//     name: "Bali Paradise",
//     description: "Tropical beaches & cultural wonders",
//     image: "https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     badge: "Exotic"
//   },
//   {
//     id: 2,
//     name: "Swiss Alps",
//     description: "Majestic mountains & alpine lakes",
//     image: "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     badge: "Alpine"
//   },
//   {
//     id: 3,
//     name: "Santorini",
//     description: "White buildings & sunset views",
//     image: "https://images.pexels.com/photos/1028225/pexels-photo-1028225.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.7,
//     badge: "Romantic"
//   },
//   {
//     id: 4,
//     name: "Tokyo City",
//     description: "Modern culture & ancient traditions",
//     image: "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     badge: "Urban"
//   }
// ];

// const trendingDestinations = [
//   {
//     id: 1,
//     name: "Andaman",
//     tours: 5,
//     departures: 102,
//     guests: 28661,
//     image: "https://images.pexels.com/photos/7425765/pexels-photo-7425765.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     badge: "Popular"
//   },
//   {
//     id: 2,
//     name: "Kashmir",
//     tours: 13,
//     departures: 62,
//     guests: 130171,
//     image: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     badge: "Hot"
//   },
//   {
//     id: 3,
//     name: "Himachal",
//     tours: 14,
//     departures: 95,
//     guests: 212335,
//     image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.7,
//     badge: "Trending"
//   },
//   {
//     id: 4,
//     name: "North East",
//     tours: 5,
//     departures: 57,
//     guests: 5125,
//     image: "https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.6,
//     badge: "New"
//   },
//   {
//     id: 5,
//     name: "Sikkim Darjeeling",
//     tours: 6,
//     departures: 24,
//     guests: 29217,
//     image: "https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     badge: "Scenic"
//   },
//   {
//     id: 6,
//     name: "Leh Ladakh",
//     tours: 0,
//     departures: 0,
//     guests: 22979,
//     image: "https://images.pexels.com/photos/672358/pexels-photo-672358.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     badge: "Adventure"
//   }
// ];

// const VideoPlayer = () => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const videoRef = useRef<HTMLVideoElement>(null);

//   const togglePlay = () => {
//     if (videoRef.current) {
//       if (isPlaying) {
//         videoRef.current.pause();
//       } else {
//         videoRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   return (
//     <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-black group h-full">
//       {/* Video Player */}
//       <div className="relative h-full w-full">
//         <video
//           ref={videoRef}
//           src="https://assets.mixkit.co/videos/preview/mixkit-going-down-a-curved-highway-through-a-mountain-range-41576-large.mp4"
//           className="w-full h-full object-cover"
//           muted
//           loop
//           onPlay={() => setIsPlaying(true)}
//           onPause={() => setIsPlaying(false)}
//         />
        
//         {/* Gradient Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
//         {/* Play/Pause Button */}
//         <button
//           onClick={togglePlay}
//           className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-4 transition-all duration-300 group-hover:scale-110"
//         >
//           {isPlaying ? (
//             <Pause className="h-8 w-8 text-white" />
//           ) : (
//             <Play className="h-8 w-8 text-white" />
//           )}
//         </button>

//         {/* Video Info */}
//         <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
//           <h3 className="text-xl font-bold mb-2">Mountain Adventures</h3>
//           <p className="text-sm text-gray-200">
//             Experience the thrill of Himalayan treks and breathtaking landscapes with our guided tours
//           </p>
//         </div>
//       </div>

//       {/* Hover Effect Border */}
//       <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/30 transition-all duration-500 pointer-events-none" />
//     </div>
//   );
// };

// const TrendingGroupHolidaysSection: React.FC = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === carouselDestinations.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === 0 ? carouselDestinations.length - 1 : prevIndex - 1
//     );
//   };

//   return (
//     <section className="py-12 md:py-16 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header with Reduced Size Carousel Left & Content Right */}
//         <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10 md:mb-12">
          
//           {/* Left Side - Smaller Carousel */}
//           <div className="flex-1 max-w-md lg:max-w-sm xl:max-w-md w-full">
//             <div className="relative rounded-2xl overflow-hidden shadow-xl">
//               {/* Main Carousel Image */}
//               <div className="relative h-56 sm:h-60 md:h-64 lg:h-72 w-full">
//                 <img
//                   src={carouselDestinations[currentIndex].image}
//                   alt={carouselDestinations[currentIndex].name}
//                   className="w-full h-full object-cover"
//                 />
                
//                 {/* Gradient Overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
//                 {/* Destination Info */}
//                 <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
//                   <div className="flex items-center justify-between mb-2">
//                     <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold text-white ${
//                       carouselDestinations[currentIndex].badge === "Exotic" ? "bg-pink-500" :
//                       carouselDestinations[currentIndex].badge === "Alpine" ? "bg-blue-500" :
//                       carouselDestinations[currentIndex].badge === "Romantic" ? "bg-purple-500" :
//                       "bg-gray-600"
//                     }`}>
//                       {carouselDestinations[currentIndex].badge}
//                     </span>
//                     <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
//                       <Star className="h-3 w-3 text-yellow-400 fill-current" />
//                       <span className="text-xs font-semibold">{carouselDestinations[currentIndex].rating}</span>
//                     </div>
//                   </div>
                  
//                   <h3 className="text-lg font-bold mb-1">{carouselDestinations[currentIndex].name}</h3>
//                   <p className="text-xs text-gray-200">
//                     {carouselDestinations[currentIndex].description}
//                   </p>
//                 </div>
//               </div>

//               {/* Navigation Arrows */}
//               <div className="absolute top-1/2 left-2 right-2 flex items-center justify-between transform -translate-y-1/2 z-10">
//                 <button
//                   onClick={prevSlide}
//                   className="bg-white/90 hover:bg-white text-gray-800 hover:text-blue-600 w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110"
//                 >
//                   <ChevronLeft className="h-4 w-4" />
//                 </button>
                
//                 <button
//                   onClick={nextSlide}
//                   className="bg-white/90 hover:bg-white text-gray-800 hover:text-blue-600 w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110"
//                 >
//                   <ChevronRight className="h-4 w-4" />
//                 </button>
//               </div>

//               {/* Dot Indicators */}
//               <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex items-center gap-1 z-10">
//                 {carouselDestinations.map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setCurrentIndex(index)}
//                     className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
//                       index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
//                     }`}
//                   />
//                 ))}
//               </div>

//               {/* Progress Indicator */}
//               <div className="absolute top-3 right-3 z-10">
//                 <div className="bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
//                   {currentIndex + 1} / {carouselDestinations.length}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Side - Smaller Text Content */}
//           <div className="flex-1 max-w-xl">
//             <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium mb-3">
//               <Star className="h-3 w-3" />
//               Premium Destinations
//             </div>
//             <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
//               Discover Amazing{" "}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
//                 Getaways
//               </span>
//             </h2>
//             <p className="text-base sm:text-lg text-gray-600 mb-4 leading-relaxed">
//               Explore world-class destinations with our carefully curated travel experiences. Perfect getaways for every type of traveler.
//             </p>
            
//             {/* Stats Row */}
//             <div className="flex flex-wrap gap-4 mb-4">
//               <div className="text-center">
//                 <div className="text-xl font-bold text-blue-600">200+</div>
//                 <div className="text-xs text-gray-600">Tours Available</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-xl font-bold text-blue-600">40+</div>
//                 <div className="text-xs text-gray-600">Countries</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-xl font-bold text-blue-600">96%</div>
//                 <div className="text-xs text-gray-600">Happy Clients</div>
//               </div>
//             </div>

//             {/* CTA Button */}
//             <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg text-sm">
//               Browse All Destinations
//               <ArrowRight className="h-4 w-4" />
//             </button>
//           </div>
//         </div>

//         {/* Destinations Grid with Video */}
//         <div className="space-y-6 lg:space-y-8">
//           {/* First Row - 4 Cards */}
//           <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//             {trendingDestinations.slice(0, 4).map((dest, index) => (
//               <div
//                 key={dest.id}
//                 className="group cursor-pointer animate-fade-in-up"
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 bg-white transform hover:-translate-y-2">
//                   {/* Image Container */}
//                   <div className="relative h-40 sm:h-48 md:h-56 w-full overflow-hidden">
//                     <img
//                       src={dest.image}
//                       alt={dest.name}
//                       className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
//                     />
                    
//                     {/* Gradient Overlay */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                    
//                     {/* Badge */}
//                     {dest.badge && (
//                       <div className="absolute top-3 left-3">
//                         <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold text-white ${
//                           dest.badge === "Popular" ? "bg-orange-500" :
//                           dest.badge === "Hot" ? "bg-red-500" :
//                           dest.badge === "Trending" ? "bg-purple-500" :
//                           dest.badge === "New" ? "bg-green-500" :
//                           dest.badge === "Best Seller" ? "bg-amber-500" :
//                           "bg-blue-500"
//                         }`}>
//                           {dest.badge}
//                         </span>
//                       </div>
//                     )}
                    
//                     {/* Rating */}
//                     <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
//                       <Star className="h-3 w-3 text-yellow-400 fill-current" />
//                       <span className="text-xs font-semibold text-white">{dest.rating}</span>
//                     </div>
//                   </div>

//                   {/* Content */}
//                   <div className="absolute inset-x-0 bottom-0 p-4 text-white">
//                     {/* Destination Name */}
//                     <h3 className="text-base sm:text-lg font-bold mb-1 group-hover:text-cyan-100 transition-colors duration-300">
//                       {dest.name}
//                     </h3>
                    
//                     {/* Stats */}
//                     <div className="space-y-1">
//                       <div className="flex items-center gap-2 text-xs">
//                         <div className="flex items-center gap-1">
//                           <MapPin className="h-3 w-3 text-cyan-300" />
//                           <span className="font-medium">{dest.tours} Tours</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Calendar className="h-3 w-3 text-cyan-300" />
//                           <span className="font-medium">{dest.departures} Departures</span>
//                         </div>
//                       </div>
                      
//                       {/* Guests Travelled */}
//                       <div className="flex items-center gap-1 pt-1 border-t border-white/20">
//                         <Users className="h-3 w-3 text-cyan-300" />
//                         <span className="text-xs font-semibold">
//                           {dest.guests.toLocaleString()}+ Guests
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Hover Effect Border */}
//                   <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-cyan-400/50 transition-all duration-500 pointer-events-none" />
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Second Row - 2 Cards + Video */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
//             {/* First 2 Cards */}
//             {trendingDestinations.slice(4, 6).map((dest, index) => (
//               <div
//                 key={dest.id}
//                 className="group cursor-pointer animate-fade-in-up"
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 bg-white transform hover:-translate-y-2 h-full">
//                   {/* Image Container */}
//                   <div className="relative h-40 sm:h-48 md:h-56 w-full overflow-hidden">
//                     <img
//                       src={dest.image}
//                       alt={dest.name}
//                       className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
//                     />
                    
//                     {/* Gradient Overlay */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                    
//                     {/* Badge */}
//                     {dest.badge && (
//                       <div className="absolute top-3 left-3">
//                         <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold text-white ${
//                           dest.badge === "Popular" ? "bg-orange-500" :
//                           dest.badge === "Hot" ? "bg-red-500" :
//                           dest.badge === "Trending" ? "bg-purple-500" :
//                           dest.badge === "New" ? "bg-green-500" :
//                           dest.badge === "Best Seller" ? "bg-amber-500" :
//                           "bg-blue-500"
//                         }`}>
//                           {dest.badge}
//                         </span>
//                       </div>
//                     )}
                    
//                     {/* Rating */}
//                     <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
//                       <Star className="h-3 w-3 text-yellow-400 fill-current" />
//                       <span className="text-xs font-semibold text-white">{dest.rating}</span>
//                     </div>
//                   </div>

//                   {/* Content */}
//                   <div className="absolute inset-x-0 bottom-0 p-4 text-white">
//                     <h3 className="text-base sm:text-lg font-bold mb-1 group-hover:text-cyan-100 transition-colors duration-300">
//                       {dest.name}
//                     </h3>
                    
//                     <div className="space-y-1">
//                       <div className="flex items-center gap-2 text-xs">
//                         <div className="flex items-center gap-1">
//                           <MapPin className="h-3 w-3 text-cyan-300" />
//                           <span className="font-medium">{dest.tours} Tours</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Calendar className="h-3 w-3 text-cyan-300" />
//                           <span className="font-medium">{dest.departures} Departures</span>
//                         </div>
//                       </div>
                      
//                       <div className="flex items-center gap-1 pt-1 border-t border-white/20">
//                         <Users className="h-3 w-3 text-cyan-300" />
//                         <span className="text-xs font-semibold">
//                           {dest.guests.toLocaleString()}+ Guests
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Hover Effect Border */}
//                   <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-cyan-400/50 transition-all duration-500 pointer-events-none" />
//                 </div>
//               </div>
//             ))}

//             {/* Video Player in the remaining space */}
//             <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
//               <VideoPlayer />
//             </div>
//           </div>
//         </div>

//         {/* Bottom CTA Section */}
//         <div
//           className="text-center mt-10 md:mt-12 animate-fade-in-up"
//           style={{ animationDelay: "400ms" }}
//         >
//           <button className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm">
//             <MapPin className="h-4 w-4" />
//             Discover More Destinations
//             <Users className="h-4 w-4" />
//           </button>
//           <p className="mt-3 text-gray-600 text-xs">
//             Join thousands of happy travelers exploring the world with us
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

// export default TrendingGroupHolidaysSection;




// import React, { useState, useRef } from "react";
// import { Users, MapPin, Calendar, Star, ArrowRight, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

// const carouselDestinations = [
//   {
//     id: 1,
//     name: "Swiss Alps",
//     description: "Majestic mountains & alpine adventures",
//     image: "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     badge: "Alpine"
//   },
//   {
//     id: 2,
//     name: "Bali Beaches",
//     description: "Tropical paradise & cultural wonders",
//     image: "https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     badge: "Exotic"
//   },
//   {
//     id: 3,
//     name: "Santorini",
//     description: "White buildings & stunning sunsets",
//     image: "https://images.pexels.com/photos/1028225/pexels-photo-1028225.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.7,
//     badge: "Romantic"
//   },
//   {
//     id: 4,
//     name: "Tokyo City",
//     description: "Modern culture & ancient traditions",
//     image: "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     badge: "Urban"
//   },
//   {
//     id: 5,
//     name: "Paris",
//     description: "City of lights & romantic ambiance",
//     image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     badge: "Classic"
//   },
//   {
//     id: 6,
//     name: "Maldives",
//     description: "Crystal waters & overwater bungalows",
//     image: "https://images.pexels.com/photos/3293148/pexels-photo-3293148.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     badge: "Luxury"
//   }
// ];

// const trendingDestinations = [
//   {
//     id: 1,
//     name: "Andaman",
//     tours: 5,
//     departures: 102,
//     guests: 28661,
//     image: "https://images.pexels.com/photos/7425765/pexels-photo-7425765.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     badge: "Popular"
//   },
//   {
//     id: 2,
//     name: "Kashmir",
//     tours: 13,
//     departures: 62,
//     guests: 130171,
//     image: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     badge: "Hot"
//   },
//   {
//     id: 3,
//     name: "Himachal",
//     tours: 14,
//     departures: 95,
//     guests: 212335,
//     image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.7,
//     badge: "Trending"
//   },
//   {
//     id: 4,
//     name: "North East",
//     tours: 5,
//     departures: 57,
//     guests: 5125,
//     image: "https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.6,
//     badge: "New"
//   },
//   {
//     id: 5,
//     name: "Sikkim Darjeeling",
//     tours: 6,
//     departures: 24,
//     guests: 29217,
//     image: "https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     badge: "Scenic"
//   },
//   {
//     id: 6,
//     name: "Leh Ladakh",
//     tours: 0,
//     departures: 0,
//     guests: 22979,
//     image: "https://images.pexels.com/photos/672358/pexels-photo-672358.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     badge: "Adventure"
//   }
// ];

// const VideoPlayer = () => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const videoRef = useRef<HTMLVideoElement>(null);

//   const togglePlay = () => {
//     if (videoRef.current) {
//       if (isPlaying) {
//         videoRef.current.pause();
//       } else {
//         videoRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   return (
//     <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-black group h-full">
//       {/* Video Player */}
//       <div className="relative h-full w-full">
//         <video
//           ref={videoRef}
//           src="https://assets.mixkit.co/videos/preview/mixkit-going-down-a-curved-highway-through-a-mountain-range-41576-large.mp4"
//           className="w-full h-full object-cover"
//           muted
//           loop
//           onPlay={() => setIsPlaying(true)}
//           onPause={() => setIsPlaying(false)}
//         />
        
//         {/* Gradient Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
//         {/* Play/Pause Button */}
//         <button
//           onClick={togglePlay}
//           className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-4 transition-all duration-300 group-hover:scale-110"
//         >
//           {isPlaying ? (
//             <Pause className="h-8 w-8 text-white" />
//           ) : (
//             <Play className="h-8 w-8 text-white" />
//           )}
//         </button>

//         {/* Video Info */}
//         <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
//           <h3 className="text-xl font-bold mb-2">Mountain Adventures</h3>
//           <p className="text-sm text-gray-200">
//             Experience the thrill of Himalayan treks and breathtaking landscapes with our guided tours
//           </p>
//         </div>
//       </div>

//       {/* Hover Effect Border */}
//       <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/30 transition-all duration-500 pointer-events-none" />
//     </div>
//   );
// };

// const TrendingGroupHolidaysSection: React.FC = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === carouselDestinations.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === 0 ? carouselDestinations.length - 1 : prevIndex - 1
//     );
//   };

//   return (
//     <section className="py-6 md:py-6 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header with Wider Carousel Left & Content Right */}
//         <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12 md:mb-16">
          
//           {/* Left Side - Wider Carousel */}
//           <div className="flex-1 max-w-2xl lg:max-w-2xl xl:max-w-3xl w-full">
//             <div className="relative rounded-3xl overflow-hidden shadow-2xl">
//               {/* Main Carousel Image */}
//               <div className="relative h-72 sm:h-80 md:h-96 lg:h-[500px] w-full">
//                 <img
//                   src={carouselDestinations[currentIndex].image}
//                   alt={carouselDestinations[currentIndex].name}
//                   className="w-full h-full object-cover"
//                 />
                
//                 {/* Gradient Overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
//                 {/* Floating Card 1 */}
//                 <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg max-w-xs">
//                   <div className="flex items-center gap-3">
//                     <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
//                       <Users className="h-6 w-6 text-green-600" />
//                     </div>
//                     <div>
//                       <div className="font-bold text-gray-900">Premium Tours</div>
//                       <div className="text-sm text-gray-600">Luxury Experiences</div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Floating Card 2 */}
//                 <div className="absolute bottom-24 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg max-w-xs">
//                   <div className="flex items-center gap-3">
//                     <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
//                       <MapPin className="h-6 w-6 text-blue-600" />
//                     </div>
//                     <div>
//                       <div className="font-bold text-gray-900">Global Reach</div>
//                       <div className="text-sm text-gray-600">60+ Countries</div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Destination Info */}
//                 <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
//                   <div className="flex items-center justify-between mb-4">
//                     <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold text-white ${
//                       carouselDestinations[currentIndex].badge === "Alpine" ? "bg-blue-500" :
//                       carouselDestinations[currentIndex].badge === "Exotic" ? "bg-orange-500" :
//                       carouselDestinations[currentIndex].badge === "Romantic" ? "bg-pink-500" :
//                       carouselDestinations[currentIndex].badge === "Urban" ? "bg-gray-600" :
//                       carouselDestinations[currentIndex].badge === "Classic" ? "bg-purple-500" :
//                       "bg-amber-500"
//                     }`}>
//                       {carouselDestinations[currentIndex].badge}
//                     </span>
//                     <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
//                       <Star className="h-4 w-4 text-yellow-400 fill-current" />
//                       <span className="text-sm font-semibold">{carouselDestinations[currentIndex].rating}</span>
//                     </div>
//                   </div>
                  
//                   <h3 className="text-2xl md:text-3xl font-bold mb-3">{carouselDestinations[currentIndex].name}</h3>
                  
//                   <p className="text-lg text-gray-200 max-w-2xl">
//                     {carouselDestinations[currentIndex].description}
//                   </p>
//                 </div>
//               </div>

//               {/* Navigation Arrows */}
//               <div className="absolute top-1/2 left-6 right-6 flex items-center justify-between transform -translate-y-1/2 z-10">
//                 <button
//                   onClick={prevSlide}
//                   className="bg-white/90 hover:bg-white text-gray-800 hover:text-blue-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110"
//                 >
//                   <ChevronLeft className="h-6 w-6" />
//                 </button>
                
//                 <button
//                   onClick={nextSlide}
//                   className="bg-white/90 hover:bg-white text-gray-800 hover:text-blue-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110"
//                 >
//                   <ChevronRight className="h-6 w-6" />
//                 </button>
//               </div>

//               {/* Dot Indicators */}
//               <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-3 z-10">
//                 {carouselDestinations.map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setCurrentIndex(index)}
//                     className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                       index === currentIndex ? 'bg-white w-8' : 'bg-white/50'
//                     }`}
//                   />
//                 ))}
//               </div>

//               {/* Progress Indicator */}
//               <div className="absolute top-6 right-6 z-10">
//                 <div className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-base font-medium">
//                   {currentIndex + 1} / {carouselDestinations.length}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Side - Text Content */}
//           <div className="flex-1 max-w-xl">
//             <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
//               <Star className="h-4 w-4" />
//               Global Destinations
//             </div>
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//               World Class{" "}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
//                 Travel Experiences
//               </span>
//             </h2>
//             <p className="text-lg text-gray-600 mb-6 leading-relaxed">
//               Explore the world's most breathtaking destinations with our premium travel packages. From alpine adventures to tropical paradises.
//             </p>
            
//             {/* Stats Row */}
//             <div className="flex flex-wrap gap-6 mb-6">
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-blue-600">1M+</div>
//                 <div className="text-sm text-gray-600">Travelers</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-blue-600">60+</div>
//                 <div className="text-sm text-gray-600">Countries</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-blue-600">99%</div>
//                 <div className="text-sm text-gray-600">Satisfaction</div>
//               </div>
//             </div>

//             {/* Features */}
//             <div className="space-y-3 mb-6">
//               <div className="flex items-center gap-3">
//                 <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
//                   <Star className="h-4 w-4 text-green-600" />
//                 </div>
//                 <span className="text-sm text-gray-600">Premium Accommodation</span>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
//                   <Users className="h-4 w-4 text-blue-600" />
//                 </div>
//                 <span className="text-sm text-gray-600">Expert Local Guides</span>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
//                   <MapPin className="h-4 w-4 text-purple-600" />
//                 </div>
//                 <span className="text-sm text-gray-600">Curated Itineraries</span>
//               </div>
//             </div>

//             {/* CTA Button */}
//             <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
//               Start Your Journey
//               <ArrowRight className="h-5 w-5" />
//             </button>
//           </div>
//         </div>

//         {/* Rest of the component remains the same */}
//         {/* Destinations Grid with Video */}
//         <div className="space-y-6 lg:space-y-8">
//           {/* First Row - 4 Cards */}
//           <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//             {trendingDestinations.slice(0, 4).map((dest, index) => (
//               <div
//                 key={dest.id}
//                 className="group cursor-pointer animate-fade-in-up"
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 <div className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white transform hover:-translate-y-2">
//                   {/* Image Container */}
//                   <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 w-full overflow-hidden">
//                     <img
//                       src={dest.image}
//                       alt={dest.name}
//                       className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
//                     />
                    
//                     {/* Gradient Overlay */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                    
//                     {/* Shine Effect */}
//                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    
//                     {/* Badge */}
//                     {dest.badge && (
//                       <div className="absolute top-4 left-4">
//                         <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white ${
//                           dest.badge === "Popular" ? "bg-orange-500" :
//                           dest.badge === "Hot" ? "bg-red-500" :
//                           dest.badge === "Trending" ? "bg-purple-500" :
//                           dest.badge === "New" ? "bg-green-500" :
//                           dest.badge === "Best Seller" ? "bg-amber-500" :
//                           "bg-blue-500"
//                         }`}>
//                           {dest.badge}
//                         </span>
//                       </div>
//                     )}
                    
//                     {/* Rating */}
//                     <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
//                       <Star className="h-3 w-3 text-yellow-400 fill-current" />
//                       <span className="text-xs font-semibold text-white">{dest.rating}</span>
//                     </div>
//                   </div>

//                   {/* Content */}
//                   <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 text-white">
//                     {/* Destination Name */}
//                     <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-cyan-100 transition-colors duration-300">
//                       {dest.name}
//                     </h3>
                    
//                     {/* Stats */}
//                     <div className="space-y-2">
//                       <div className="flex items-center gap-3 text-sm">
//                         <div className="flex items-center gap-1">
//                           <MapPin className="h-4 w-4 text-cyan-300" />
//                           <span className="font-medium">{dest.tours} Tours</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Calendar className="h-4 w-4 text-cyan-300" />
//                           <span className="font-medium">{dest.departures} Departures</span>
//                         </div>
//                       </div>
                      
//                       {/* Guests Travelled */}
//                       <div className="flex items-center gap-2 pt-2 border-t border-white/20">
//                         <Users className="h-4 w-4 text-cyan-300" />
//                         <span className="text-sm font-semibold">
//                           {dest.guests.toLocaleString()}+ Guests Travelled
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Hover Effect Border */}
//                   <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-cyan-400/50 transition-all duration-500 pointer-events-none" />
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Second Row - 2 Cards + Video */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
//             {/* First 2 Cards */}
//             {trendingDestinations.slice(4, 6).map((dest, index) => (
//               <div
//                 key={dest.id}
//                 className="group cursor-pointer animate-fade-in-up"
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 <div className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white transform hover:-translate-y-2 h-full">
//                   {/* Image Container */}
//                   <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 w-full overflow-hidden">
//                     <img
//                       src={dest.image}
//                       alt={dest.name}
//                       className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
//                     />
                    
//                     {/* Gradient Overlay */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                    
//                     {/* Badge */}
//                     {dest.badge && (
//                       <div className="absolute top-4 left-4">
//                         <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white ${
//                           dest.badge === "Popular" ? "bg-orange-500" :
//                           dest.badge === "Hot" ? "bg-red-500" :
//                           dest.badge === "Trending" ? "bg-purple-500" :
//                           dest.badge === "New" ? "bg-green-500" :
//                           dest.badge === "Best Seller" ? "bg-amber-500" :
//                           "bg-blue-500"
//                         }`}>
//                           {dest.badge}
//                         </span>
//                       </div>
//                     )}
                    
//                     {/* Rating */}
//                     <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
//                       <Star className="h-3 w-3 text-yellow-400 fill-current" />
//                       <span className="text-xs font-semibold text-white">{dest.rating}</span>
//                     </div>
//                   </div>

//                   {/* Content */}
//                   <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 text-white">
//                     <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-cyan-100 transition-colors duration-300">
//                       {dest.name}
//                     </h3>
                    
//                     <div className="space-y-2">
//                       <div className="flex items-center gap-3 text-sm">
//                         <div className="flex items-center gap-1">
//                           <MapPin className="h-4 w-4 text-cyan-300" />
//                           <span className="font-medium">{dest.tours} Tours</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Calendar className="h-4 w-4 text-cyan-300" />
//                           <span className="font-medium">{dest.departures} Departures</span>
//                         </div>
//                       </div>
                      
//                       <div className="flex items-center gap-2 pt-2 border-t border-white/20">
//                         <Users className="h-4 w-4 text-cyan-300" />
//                         <span className="text-sm font-semibold">
//                           {dest.guests.toLocaleString()}+ Guests Travelled
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Hover Effect Border */}
//                   <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-cyan-400/50 transition-all duration-500 pointer-events-none" />
//                 </div>
//               </div>
//             ))}

//             {/* Video Player in the remaining space */}
//             <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
//               <VideoPlayer />
//             </div>
//           </div>
//         </div>

//         {/* Bottom CTA Section */}
//         <div
//           className="text-center mt-12 md:mt-16 animate-fade-in-up"
//           style={{ animationDelay: "400ms" }}
//         >
//           <button className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//             <MapPin className="h-5 w-5" />
//             Explore Global Destinations
//             <Users className="h-5 w-5" />
//           </button>
//           <p className="mt-4 text-gray-600 text-sm">
//             Join 1,000,000+ travelers exploring the world with premium experiences
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

// export default TrendingGroupHolidaysSection;





// import React, { useState, useRef, useEffect } from "react";
// import { Users, MapPin, Calendar, Star, ArrowRight, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

// const carouselDestinations = [
//   {
//     id: 1,
//     name: "Swiss Alps",
//     description: "Majestic mountains & alpine adventures",
//     image: "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     badge: "Alpine"
//   },
//   {
//     id: 2,
//     name: "Bali Beaches",
//     description: "Tropical paradise & cultural wonders",
//     image: "https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     badge: "Exotic"
//   },
//   {
//     id: 3,
//     name: "Santorini",
//     description: "White buildings & stunning sunsets",
//     image: "https://images.pexels.com/photos/1028225/pexels-photo-1028225.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.7,
//     badge: "Romantic"
//   },
//   {
//     id: 4,
//     name: "Tokyo City",
//     description: "Modern culture & ancient traditions",
//     image: "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     badge: "Urban"
//   },
//   {
//     id: 5,
//     name: "Paris",
//     description: "City of lights & romantic ambiance",
//     image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     badge: "Classic"
//   },
//   {
//     id: 6,
//     name: "Maldives",
//     description: "Crystal waters & overwater bungalows",
//     image: "https://images.pexels.com/photos/3293148/pexels-photo-3293148.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     badge: "Luxury"
//   }
// ];

// const trendingDestinations = [
//   {
//     id: 1,
//     name: "Andaman",
//     tours: 5,
//     departures: 102,
//     guests: 28661,
//     images: [
//       "https://images.pexels.com/photos/7425765/pexels-photo-7425765.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/2525903/pexels-photo-2525903.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/2422461/pexels-photo-2422461.jpeg?auto=compress&cs=tinysrgb&w=1200"
//     ],
//     rating: 4.8,
//     badge: "Popular"
//   },
//   {
//     id: 2,
//     name: "Kashmir",
//     tours: 13,
//     departures: 62,
//     guests: 130171,
//     images: [
//       "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/358220/pexels-photo-358220.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1200"
//     ],
//     rating: 4.9,
//     badge: "Hot"
//   },
//   {
//     id: 3,
//     name: "Himachal",
//     tours: 14,
//     departures: 95,
//     guests: 212335,
//     images: [
//       "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/1365426/pexels-photo-1365426.jpeg?auto=compress&cs=tinysrgb&w=1200"
//     ],
//     rating: 4.7,
//     badge: "Trending"
//   },
//   {
//     id: 4,
//     name: "North East",
//     tours: 5,
//     departures: 57,
//     guests: 5125,
//     images: [
//       "https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/457881/pexels-photo-457881.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=1200"
//     ],
//     rating: 4.6,
//     badge: "New"
//   },
//   {
//     id: 5,
//     name: "Sikkim Darjeeling",
//     tours: 6,
//     departures: 24,
//     guests: 29217,
//     images: [
//       "https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/1366920/pexels-photo-1366920.jpeg?auto=compress&cs=tinysrgb&w=1200"
//     ],
//     rating: 4.8,
//     badge: "Scenic"
//   },
//   {
//     id: 6,
//     name: "Leh Ladakh",
//     tours: 0,
//     departures: 0,
//     guests: 22979,
//     images: [
//       "https://images.pexels.com/photos/672358/pexels-photo-672358.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/672357/pexels-photo-672357.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/672359/pexels-photo-672359.jpeg?auto=compress&cs=tinysrgb&w=1200"
//     ],
//     rating: 4.9,
//     badge: "Adventure"
//   }
// ];

// // Auto Image Carousel Component for Destination Cards
// const AutoImageCarousel = ({ images, interval = 3000 }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentIndex((prevIndex) => 
//         prevIndex === images.length - 1 ? 0 : prevIndex + 1
//       );
//     }, interval);

//     return () => clearInterval(timer);
//   }, [images.length, interval]);

//   return (
//     <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 w-full overflow-hidden">
//       {images.map((image, index) => (
//         <div
//           key={index}
//           className={`absolute inset-0 transition-opacity duration-1000 ${
//             index === currentIndex ? 'opacity-100' : 'opacity-0'
//           }`}
//         >
//           <img
//             src={image}
//             alt={`Slide ${index + 1}`}
//             className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
//           />
//         </div>
//       ))}
      
//       {/* Gradient Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
      
//       {/* Shine Effect */}
//       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
//       {/* Dot Indicators */}
//       <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex items-center gap-1">
//         {images.map((_, index) => (
//           <div
//             key={index}
//             className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
//               index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// const VideoPlayer = () => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const videoRef = useRef<HTMLVideoElement>(null);

//   const togglePlay = () => {
//     if (videoRef.current) {
//       if (isPlaying) {
//         videoRef.current.pause();
//       } else {
//         videoRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   return (
//     <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-black group h-full">
//       {/* Video Player */}
//       <div className="relative h-full w-full">
//         <video
//           ref={videoRef}
//           src="https://assets.mixkit.co/videos/preview/mixkit-going-down-a-curved-highway-through-a-mountain-range-41576-large.mp4"
//           className="w-full h-full object-cover"
//           muted
//           loop
//           onPlay={() => setIsPlaying(true)}
//           onPause={() => setIsPlaying(false)}
//         />
        
//         {/* Gradient Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
//         {/* Play/Pause Button */}
//         <button
//           onClick={togglePlay}
//           className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-4 transition-all duration-300 group-hover:scale-110"
//         >
//           {isPlaying ? (
//             <Pause className="h-8 w-8 text-white" />
//           ) : (
//             <Play className="h-8 w-8 text-white" />
//           )}
//         </button>

//         {/* Video Info */}
//         <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
//           <h3 className="text-xl font-bold mb-2">Mountain Adventures</h3>
//           <p className="text-sm text-gray-200">
//             Experience the thrill of Himalayan treks and breathtaking landscapes with our guided tours
//           </p>
//         </div>
//       </div>

//       {/* Hover Effect Border */}
//       <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/30 transition-all duration-500 pointer-events-none" />
//     </div>
//   );
// };

// const TrendingGroupHolidaysSection: React.FC = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === carouselDestinations.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === 0 ? carouselDestinations.length - 1 : prevIndex - 1
//     );
//   };

//   return (
//     <section className="py-6 md:py-6 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header with Wider Carousel Left & Content Right */}
//         <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12 md:mb-16">
          
//           {/* Left Side - Wider Carousel */}
//           <div className="flex-1 max-w-2xl lg:max-w-2xl xl:max-w-3xl w-full">
//             <div className="relative rounded-3xl overflow-hidden shadow-2xl">
//               {/* Main Carousel Image */}
//               <div className="relative h-72 sm:h-80 md:h-96 lg:h-[500px] w-full">
//                 <img
//                   src={carouselDestinations[currentIndex].image}
//                   alt={carouselDestinations[currentIndex].name}
//                   className="w-full h-full object-cover"
//                 />
                
//                 {/* Gradient Overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
//                 {/* Floating Card 1 */}
//                 <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg max-w-xs">
//                   <div className="flex items-center gap-3">
//                     <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
//                       <Users className="h-6 w-6 text-green-600" />
//                     </div>
//                     <div>
//                       <div className="font-bold text-gray-900">Premium Tours</div>
//                       <div className="text-sm text-gray-600">Luxury Experiences</div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Floating Card 2 */}
//                 <div className="absolute bottom-24 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg max-w-xs">
//                   <div className="flex items-center gap-3">
//                     <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
//                       <MapPin className="h-6 w-6 text-blue-600" />
//                     </div>
//                     <div>
//                       <div className="font-bold text-gray-900">Global Reach</div>
//                       <div className="text-sm text-gray-600">60+ Countries</div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Destination Info */}
//                 <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
//                   <div className="flex items-center justify-between mb-4">
//                     <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold text-white ${
//                       carouselDestinations[currentIndex].badge === "Alpine" ? "bg-blue-500" :
//                       carouselDestinations[currentIndex].badge === "Exotic" ? "bg-orange-500" :
//                       carouselDestinations[currentIndex].badge === "Romantic" ? "bg-pink-500" :
//                       carouselDestinations[currentIndex].badge === "Urban" ? "bg-gray-600" :
//                       carouselDestinations[currentIndex].badge === "Classic" ? "bg-purple-500" :
//                       "bg-amber-500"
//                     }`}>
//                       {carouselDestinations[currentIndex].badge}
//                     </span>
//                     <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
//                       <Star className="h-4 w-4 text-yellow-400 fill-current" />
//                       <span className="text-sm font-semibold">{carouselDestinations[currentIndex].rating}</span>
//                     </div>
//                   </div>
                  
//                   <h3 className="text-2xl md:text-3xl font-bold mb-3">{carouselDestinations[currentIndex].name}</h3>
                  
//                   <p className="text-lg text-gray-200 max-w-2xl">
//                     {carouselDestinations[currentIndex].description}
//                   </p>
//                 </div>
//               </div>

//               {/* Navigation Arrows */}
//               <div className="absolute top-1/2 left-6 right-6 flex items-center justify-between transform -translate-y-1/2 z-10">
//                 <button
//                   onClick={prevSlide}
//                   className="bg-white/90 hover:bg-white text-gray-800 hover:text-blue-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110"
//                 >
//                   <ChevronLeft className="h-6 w-6" />
//                 </button>
                
//                 <button
//                   onClick={nextSlide}
//                   className="bg-white/90 hover:bg-white text-gray-800 hover:text-blue-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110"
//                 >
//                   <ChevronRight className="h-6 w-6" />
//                 </button>
//               </div>

//               {/* Dot Indicators */}
//               <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-3 z-10">
//                 {carouselDestinations.map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setCurrentIndex(index)}
//                     className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                       index === currentIndex ? 'bg-white w-8' : 'bg-white/50'
//                     }`}
//                   />
//                 ))}
//               </div>

//               {/* Progress Indicator */}
//               <div className="absolute top-6 right-6 z-10">
//                 <div className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-base font-medium">
//                   {currentIndex + 1} / {carouselDestinations.length}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Side - Text Content */}
//           <div className="flex-1 max-w-xl">
//             <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
//               <Star className="h-4 w-4" />
//               Global Destinations
//             </div>
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//               World Class{" "}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
//                 Travel Experiences
//               </span>
//             </h2>
//             <p className="text-lg text-gray-600 mb-6 leading-relaxed">
//               Explore the world's most breathtaking destinations with our premium travel packages. From alpine adventures to tropical paradises.
//             </p>
            
//             {/* Stats Row */}
//             <div className="flex flex-wrap gap-6 mb-6">
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-blue-600">1M+</div>
//                 <div className="text-sm text-gray-600">Travelers</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-blue-600">60+</div>
//                 <div className="text-sm text-gray-600">Countries</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-blue-600">99%</div>
//                 <div className="text-sm text-gray-600">Satisfaction</div>
//               </div>
//             </div>

//             {/* Features */}
//             <div className="space-y-3 mb-6">
//               <div className="flex items-center gap-3">
//                 <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
//                   <Star className="h-4 w-4 text-green-600" />
//                 </div>
//                 <span className="text-sm text-gray-600">Premium Accommodation</span>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
//                   <Users className="h-4 w-4 text-blue-600" />
//                 </div>
//                 <span className="text-sm text-gray-600">Expert Local Guides</span>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
//                   <MapPin className="h-4 w-4 text-purple-600" />
//                 </div>
//                 <span className="text-sm text-gray-600">Curated Itineraries</span>
//               </div>
//             </div>

//             {/* CTA Button */}
//             <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
//               Start Your Journey
//               <ArrowRight className="h-5 w-5" />
//             </button>
//           </div>
//         </div>

//         {/* Destinations Grid with Auto Image Carousel */}
//         <div className="space-y-6 lg:space-y-8">
//           {/* First Row - 4 Cards */}
//           <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//             {trendingDestinations.slice(0, 4).map((dest, index) => (
//               <div
//                 key={dest.id}
//                 className="group cursor-pointer animate-fade-in-up"
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 <div className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white transform hover:-translate-y-2">
//                   {/* Auto Image Carousel */}
//                   <AutoImageCarousel images={dest.images} interval={3500} />
                  
//                   {/* Badge */}
//                   {dest.badge && (
//                     <div className="absolute top-4 left-4 z-10">
//                       <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white ${
//                         dest.badge === "Popular" ? "bg-orange-500" :
//                         dest.badge === "Hot" ? "bg-red-500" :
//                         dest.badge === "Trending" ? "bg-purple-500" :
//                         dest.badge === "New" ? "bg-green-500" :
//                         dest.badge === "Scenic" ? "bg-teal-500" :
//                         "bg-blue-500"
//                       }`}>
//                         {dest.badge}
//                       </span>
//                     </div>
//                   )}
                  
//                   {/* Rating */}
//                   <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
//                     <Star className="h-3 w-3 text-yellow-400 fill-current" />
//                     <span className="text-xs font-semibold text-white">{dest.rating}</span>
//                   </div>

//                   {/* Content */}
//                   <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 text-white z-10">
//                     {/* Destination Name */}
//                     <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-cyan-100 transition-colors duration-300">
//                       {dest.name}
//                     </h3>
                    
//                     {/* Stats */}
//                     <div className="space-y-2">
//                       <div className="flex items-center gap-3 text-sm">
//                         <div className="flex items-center gap-1">
//                           <MapPin className="h-4 w-4 text-cyan-300" />
//                           <span className="font-medium">{dest.tours} Tours</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Calendar className="h-4 w-4 text-cyan-300" />
//                           <span className="font-medium">{dest.departures} Departures</span>
//                         </div>
//                       </div>
                      
//                       {/* Guests Travelled */}
//                       <div className="flex items-center gap-2 pt-2 border-t border-white/20">
//                         <Users className="h-4 w-4 text-cyan-300" />
//                         <span className="text-sm font-semibold">
//                           {dest.guests.toLocaleString()}+ Guests Travelled
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Hover Effect Border */}
//                   <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-cyan-400/50 transition-all duration-500 pointer-events-none" />
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Second Row - 2 Cards + Video */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
//             {/* First 2 Cards */}
//             {trendingDestinations.slice(4, 6).map((dest, index) => (
//               <div
//                 key={dest.id}
//                 className="group cursor-pointer animate-fade-in-up"
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 <div className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white transform hover:-translate-y-2 h-full">
//                   {/* Auto Image Carousel */}
//                   <AutoImageCarousel images={dest.images} interval={3500} />
                  
//                   {/* Badge */}
//                   {dest.badge && (
//                     <div className="absolute top-4 left-4 z-10">
//                       <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white ${
//                         dest.badge === "Popular" ? "bg-orange-500" :
//                         dest.badge === "Hot" ? "bg-red-500" :
//                         dest.badge === "Trending" ? "bg-purple-500" :
//                         dest.badge === "New" ? "bg-green-500" :
//                         dest.badge === "Scenic" ? "bg-teal-500" :
//                         "bg-blue-500"
//                       }`}>
//                         {dest.badge}
//                       </span>
//                     </div>
//                   )}
                  
//                   {/* Rating */}
//                   <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
//                     <Star className="h-3 w-3 text-yellow-400 fill-current" />
//                     <span className="text-xs font-semibold text-white">{dest.rating}</span>
//                   </div>

//                   {/* Content */}
//                   <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 text-white z-10">
//                     <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-cyan-100 transition-colors duration-300">
//                       {dest.name}
//                     </h3>
                    
//                     <div className="space-y-2">
//                       <div className="flex items-center gap-3 text-sm">
//                         <div className="flex items-center gap-1">
//                           <MapPin className="h-4 w-4 text-cyan-300" />
//                           <span className="font-medium">{dest.tours} Tours</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Calendar className="h-4 w-4 text-cyan-300" />
//                           <span className="font-medium">{dest.departures} Departures</span>
//                         </div>
//                       </div>
                      
//                       <div className="flex items-center gap-2 pt-2 border-t border-white/20">
//                         <Users className="h-4 w-4 text-cyan-300" />
//                         <span className="text-sm font-semibold">
//                           {dest.guests.toLocaleString()}+ Guests Travelled
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Hover Effect Border */}
//                   <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-cyan-400/50 transition-all duration-500 pointer-events-none" />
//                 </div>
//               </div>
//             ))}

//             {/* Video Player in the remaining space */}
//             <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
//               <VideoPlayer />
//             </div>
//           </div>
//         </div>

//         {/* Bottom CTA Section */}
//         <div
//           className="text-center mt-12 md:mt-16 animate-fade-in-up"
//           style={{ animationDelay: "400ms" }}
//         >
//           <button className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//             <MapPin className="h-5 w-5" />
//             Explore Global Destinations
//             <Users className="h-5 w-5" />
//           </button>
//           <p className="mt-4 text-gray-600 text-sm">
//             Join 1,000,000+ travelers exploring the world with premium experiences
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

// export default TrendingGroupHolidaysSection;





// import React, { useState, useRef, useEffect } from "react";
// import { Users, MapPin, Calendar, Star, ArrowRight, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

// const carouselDestinations = [
//   {
//     id: 1,
//     name: "Swiss Alps",
//     description: "Majestic mountains & alpine adventures",
//     image: "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     badge: "Alpine"
//   },
//   {
//     id: 2,
//     name: "Bali Beaches",
//     description: "Tropical paradise & cultural wonders",
//     image: "https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     badge: "Exotic"
//   },
//   {
//     id: 3,
//     name: "Santorini",
//     description: "White buildings & stunning sunsets",
//     image: "https://images.pexels.com/photos/1028225/pexels-photo-1028225.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.7,
//     badge: "Romantic"
//   },
//   {
//     id: 4,
//     name: "Tokyo City",
//     description: "Modern culture & ancient traditions",
//     image: "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     badge: "Urban"
//   },
//   {
//     id: 5,
//     name: "Paris",
//     description: "City of lights & romantic ambiance",
//     image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     badge: "Classic"
//   },
//   {
//     id: 6,
//     name: "Maldives",
//     description: "Crystal waters & overwater bungalows",
//     image: "https://images.pexels.com/photos/3293148/pexels-photo-3293148.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     badge: "Luxury"
//   }
// ];

// const trendingDestinations = [
//   {
//     id: 1,
//     name: "Andaman",
//     tours: 5,
//     departures: 102,
//     guests: 28661,
//     images: [
//       "https://images.pexels.com/photos/7425765/pexels-photo-7425765.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/2525903/pexels-photo-2525903.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/2422461/pexels-photo-2422461.jpeg?auto=compress&cs=tinysrgb&w=1200"
//     ],
//     rating: 4.8,
//     badge: "Popular"
//   },
//   {
//     id: 2,
//     name: "Kashmir",
//     tours: 13,
//     departures: 62,
//     guests: 130171,
//     images: [
//       "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/358220/pexels-photo-358220.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1200"
//     ],
//     rating: 4.9,
//     badge: "Hot"
//   },
//   {
//     id: 3,
//     name: "Himachal",
//     tours: 14,
//     departures: 95,
//     guests: 212335,
//     images: [
//       "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/1365426/pexels-photo-1365426.jpeg?auto=compress&cs=tinysrgb&w=1200"
//     ],
//     rating: 4.7,
//     badge: "Trending"
//   },
//   {
//     id: 4,
//     name: "North East",
//     tours: 5,
//     departures: 57,
//     guests: 5125,
//     images: [
//       "https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/457881/pexels-photo-457881.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=1200"
//     ],
//     rating: 4.6,
//     badge: "New"
//   },
//   {
//     id: 5,
//     name: "Sikkim Darjeeling",
//     tours: 6,
//     departures: 24,
//     guests: 29217,
//     images: [
//       "https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/1366920/pexels-photo-1366920.jpeg?auto=compress&cs=tinysrgb&w=1200"
//     ],
//     rating: 4.8,
//     badge: "Scenic"
//   },
//   {
//     id: 6,
//     name: "Leh Ladakh",
//     tours: 0,
//     departures: 0,
//     guests: 22979,
//     images: [
//       "https://images.pexels.com/photos/672358/pexels-photo-672358.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/672357/pexels-photo-672357.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/672359/pexels-photo-672359.jpeg?auto=compress&cs=tinysrgb&w=1200"
//     ],
//     rating: 4.9,
//     badge: "Adventure"
//   }
// ];

// // Auto Image Carousel Component for Destination Cards
// const AutoImageCarousel = ({ images, interval = 3000 }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentIndex((prevIndex) => 
//         prevIndex === images.length - 1 ? 0 : prevIndex + 1
//       );
//     }, interval);

//     return () => clearInterval(timer);
//   }, [images.length, interval]);

//   return (
//     <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 w-full overflow-hidden">
//       {images.map((image, index) => (
//         <div
//           key={index}
//           className={`absolute inset-0 transition-opacity duration-1000 ${
//             index === currentIndex ? 'opacity-100' : 'opacity-0'
//           }`}
//         >
//           <img
//             src={image}
//             alt={`Slide ${index + 1}`}
//             className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
//           />
//         </div>
//       ))}
      
//       {/* Gradient Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
      
//       {/* Shine Effect */}
//       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
//       {/* Dot Indicators */}
//       <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex items-center gap-1">
//         {images.map((_, index) => (
//           <div
//             key={index}
//             className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
//               index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// const VideoPlayer = () => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const videoRef = useRef<HTMLVideoElement>(null);

//   const togglePlay = () => {
//     if (videoRef.current) {
//       if (isPlaying) {
//         videoRef.current.pause();
//       } else {
//         videoRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   return (
//     <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-black group h-full">
//       {/* Video Player */}
//       <div className="relative h-full w-full">
//         <video
//           ref={videoRef}
//           src="https://assets.mixkit.co/videos/preview/mixkit-going-down-a-curved-highway-through-a-mountain-range-41576-large.mp4"
//           className="w-full h-full object-cover"
//           muted
//           loop
//           onPlay={() => setIsPlaying(true)}
//           onPause={() => setIsPlaying(false)}
//         />
        
//         {/* Gradient Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
//         {/* Play/Pause Button */}
//         <button
//           onClick={togglePlay}
//           className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-4 transition-all duration-300 group-hover:scale-110"
//         >
//           {isPlaying ? (
//             <Pause className="h-8 w-8 text-white" />
//           ) : (
//             <Play className="h-8 w-8 text-white" />
//           )}
//         </button>

//         {/* Video Info */}
//         <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
//           <h3 className="text-xl font-bold mb-2">Mountain Adventures</h3>
//           <p className="text-sm text-gray-200">
//             Experience the thrill of Himalayan treks and breathtaking landscapes with our guided tours
//           </p>
//         </div>
//       </div>

//       {/* Hover Effect Border */}
//       <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/30 transition-all duration-500 pointer-events-none" />
//     </div>
//   );
// };

// const TrendingGroupHolidaysSection: React.FC = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === carouselDestinations.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === 0 ? carouselDestinations.length - 1 : prevIndex - 1
//     );
//   };

//   return (
//     <section className="py-6 md:py-6 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header with Wider Carousel Left & Content Right */}
//         <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12 md:mb-16">
          
//           {/* Left Side - Wider Carousel */}
//           <div className="flex-1 max-w-2xl lg:max-w-2xl xl:max-w-3xl w-full">
//             <div className="relative rounded-3xl overflow-hidden shadow-2xl">
//               {/* Main Carousel Image */}
//               <div className="relative h-72 sm:h-80 md:h-96 lg:h-[500px] w-full">
//                 <img
//                   src={carouselDestinations[currentIndex].image}
//                   alt={carouselDestinations[currentIndex].name}
//                   className="w-full h-full object-cover"
//                 />
                
//                 {/* Gradient Overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
//                 {/* Floating Card 1 */}
//                 <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg max-w-xs">
//                   <div className="flex items-center gap-3">
//                     <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
//                       <Users className="h-6 w-6 text-green-600" />
//                     </div>
//                     <div>
//                       <div className="font-bold text-gray-900">Premium Tours</div>
//                       <div className="text-sm text-gray-600">Luxury Experiences</div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Floating Card 2 */}
//                 <div className="absolute bottom-24 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg max-w-xs">
//                   <div className="flex items-center gap-3">
//                     <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
//                       <MapPin className="h-6 w-6 text-blue-600" />
//                     </div>
//                     <div>
//                       <div className="font-bold text-gray-900">Global Reach</div>
//                       <div className="text-sm text-gray-600">60+ Countries</div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Destination Info */}
//                 <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
//                   <div className="flex items-center justify-between mb-4">
//                     <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold text-white ${
//                       carouselDestinations[currentIndex].badge === "Alpine" ? "bg-blue-500" :
//                       carouselDestinations[currentIndex].badge === "Exotic" ? "bg-orange-500" :
//                       carouselDestinations[currentIndex].badge === "Romantic" ? "bg-pink-500" :
//                       carouselDestinations[currentIndex].badge === "Urban" ? "bg-gray-600" :
//                       carouselDestinations[currentIndex].badge === "Classic" ? "bg-purple-500" :
//                       "bg-amber-500"
//                     }`}>
//                       {carouselDestinations[currentIndex].badge}
//                     </span>
//                     <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
//                       <Star className="h-4 w-4 text-yellow-400 fill-current" />
//                       <span className="text-sm font-semibold">{carouselDestinations[currentIndex].rating}</span>
//                     </div>
//                   </div>
                  
//                   <h3 className="text-2xl md:text-3xl font-bold mb-3">{carouselDestinations[currentIndex].name}</h3>
                  
//                   <p className="text-lg text-gray-200 max-w-2xl">
//                     {carouselDestinations[currentIndex].description}
//                   </p>
//                 </div>
//               </div>

//               {/* Navigation Arrows */}
//               <div className="absolute top-1/2 left-6 right-6 flex items-center justify-between transform -translate-y-1/2 z-10">
//                 <button
//                   onClick={prevSlide}
//                   className="bg-white/90 hover:bg-white text-gray-800 hover:text-blue-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110"
//                 >
//                   <ChevronLeft className="h-6 w-6" />
//                 </button>
                
//                 <button
//                   onClick={nextSlide}
//                   className="bg-white/90 hover:bg-white text-gray-800 hover:text-blue-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110"
//                 >
//                   <ChevronRight className="h-6 w-6" />
//                 </button>
//               </div>

//               {/* Dot Indicators */}
//               <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-3 z-10">
//                 {carouselDestinations.map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setCurrentIndex(index)}
//                     className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                       index === currentIndex ? 'bg-white w-8' : 'bg-white/50'
//                     }`}
//                   />
//                 ))}
//               </div>

//               {/* Progress Indicator */}
//               <div className="absolute top-6 right-6 z-10">
//                 <div className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-base font-medium">
//                   {currentIndex + 1} / {carouselDestinations.length}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Side - Text Content with Image */}
//           <div className="flex-1 max-w-2xl">
//             <div className="flex flex-col lg:flex-row gap-6">
//               {/* Text Content */}
//               <div className="flex-1">
//                 <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
//                   <Star className="h-4 w-4" />
//                   Global Destinations
//                 </div>
//                 <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//                   World Class{" "}
//                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
//                     Travel Experiences
//                   </span>
//                 </h2>
//                 <p className="text-lg text-gray-600 mb-6 leading-relaxed">
//                   Explore the world's most breathtaking destinations with our premium travel packages. From alpine adventures to tropical paradises.
//                 </p>
                
//                 {/* Stats Row */}
//                 <div className="flex flex-wrap gap-6 mb-6">
//                   <div className="text-center">
//                     <div className="text-2xl font-bold text-blue-600">1M+</div>
//                     <div className="text-sm text-gray-600">Travelers</div>
//                   </div>
//                   <div className="text-center">
//                     <div className="text-2xl font-bold text-blue-600">60+</div>
//                     <div className="text-sm text-gray-600">Countries</div>
//                   </div>
//                   <div className="text-center">
//                     <div className="text-2xl font-bold text-blue-600">99%</div>
//                     <div className="text-sm text-gray-600">Satisfaction</div>
//                   </div>
//                 </div>

//                 {/* Features */}
//                 <div className="space-y-3 mb-6">
//                   <div className="flex items-center gap-3">
//                     <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
//                       <Star className="h-4 w-4 text-green-600" />
//                     </div>
//                     <span className="text-sm text-gray-600">Premium Accommodation</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
//                       <Users className="h-4 w-4 text-blue-600" />
//                     </div>
//                     <span className="text-sm text-gray-600">Expert Local Guides</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
//                       <MapPin className="h-4 w-4 text-purple-600" />
//                     </div>
//                     <span className="text-sm text-gray-600">Curated Itineraries</span>
//                   </div>
//                 </div>

//                 {/* CTA Button */}
//                 <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
//                   Start Your Journey
//                   <ArrowRight className="h-5 w-5" />
//                 </button>
//               </div>

//               {/* Right Side Image */}
//               <div className="flex-1 max-w-xs lg:max-w-sm">
//                 <div className="relative rounded-2xl overflow-hidden shadow-lg h-full min-h-[300px]">
//                   <img
//                     src="https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=1200"
//                     alt="Happy travelers exploring destination"
//                     className="w-full h-full object-cover"
//                   />
                  
//                   {/* Gradient Overlay */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  
//                   {/* Floating Badge */}
//                   <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
//                     <span className="text-xs font-bold text-gray-800">Featured</span>
//                   </div>
                  
//                   {/* Content Overlay */}
//                   <div className="absolute bottom-4 left-4 right-4">
//                     <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
//                       <h4 className="font-bold text-gray-900 text-sm mb-1">Travel Community</h4>
//                       <p className="text-xs text-gray-600">Join our community of adventure seekers</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Destinations Grid with Auto Image Carousel */}
//         <div className="space-y-6 lg:space-y-8">
//           {/* First Row - 4 Cards */}
//           <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//             {trendingDestinations.slice(0, 4).map((dest, index) => (
//               <div
//                 key={dest.id}
//                 className="group cursor-pointer animate-fade-in-up"
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 <div className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white transform hover:-translate-y-2">
//                   {/* Auto Image Carousel */}
//                   <AutoImageCarousel images={dest.images} interval={3500} />
                  
//                   {/* Badge */}
//                   {dest.badge && (
//                     <div className="absolute top-4 left-4 z-10">
//                       <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white ${
//                         dest.badge === "Popular" ? "bg-orange-500" :
//                         dest.badge === "Hot" ? "bg-red-500" :
//                         dest.badge === "Trending" ? "bg-purple-500" :
//                         dest.badge === "New" ? "bg-green-500" :
//                         dest.badge === "Scenic" ? "bg-teal-500" :
//                         "bg-blue-500"
//                       }`}>
//                         {dest.badge}
//                       </span>
//                     </div>
//                   )}
                  
//                   {/* Rating */}
//                   <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
//                     <Star className="h-3 w-3 text-yellow-400 fill-current" />
//                     <span className="text-xs font-semibold text-white">{dest.rating}</span>
//                   </div>

//                   {/* Content */}
//                   <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 text-white z-10">
//                     {/* Destination Name */}
//                     <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-cyan-100 transition-colors duration-300">
//                       {dest.name}
//                     </h3>
                    
//                     {/* Stats */}
//                     <div className="space-y-2">
//                       <div className="flex items-center gap-3 text-sm">
//                         <div className="flex items-center gap-1">
//                           <MapPin className="h-4 w-4 text-cyan-300" />
//                           <span className="font-medium">{dest.tours} Tours</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Calendar className="h-4 w-4 text-cyan-300" />
//                           <span className="font-medium">{dest.departures} Departures</span>
//                         </div>
//                       </div>
                      
//                       {/* Guests Travelled */}
//                       <div className="flex items-center gap-2 pt-2 border-t border-white/20">
//                         <Users className="h-4 w-4 text-cyan-300" />
//                         <span className="text-sm font-semibold">
//                           {dest.guests.toLocaleString()}+ Guests Travelled
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Hover Effect Border */}
//                   <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-cyan-400/50 transition-all duration-500 pointer-events-none" />
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Second Row - 2 Cards + Video */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
//             {/* First 2 Cards */}
//             {trendingDestinations.slice(4, 6).map((dest, index) => (
//               <div
//                 key={dest.id}
//                 className="group cursor-pointer animate-fade-in-up"
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 <div className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white transform hover:-translate-y-2 h-full">
//                   {/* Auto Image Carousel */}
//                   <AutoImageCarousel images={dest.images} interval={3500} />
                  
//                   {/* Badge */}
//                   {dest.badge && (
//                     <div className="absolute top-4 left-4 z-10">
//                       <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white ${
//                         dest.badge === "Popular" ? "bg-orange-500" :
//                         dest.badge === "Hot" ? "bg-red-500" :
//                         dest.badge === "Trending" ? "bg-purple-500" :
//                         dest.badge === "New" ? "bg-green-500" :
//                         dest.badge === "Scenic" ? "bg-teal-500" :
//                         "bg-blue-500"
//                       }`}>
//                         {dest.badge}
//                       </span>
//                     </div>
//                   )}
                  
//                   {/* Rating */}
//                   <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
//                     <Star className="h-3 w-3 text-yellow-400 fill-current" />
//                     <span className="text-xs font-semibold text-white">{dest.rating}</span>
//                   </div>

//                   {/* Content */}
//                   <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 text-white z-10">
//                     <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-cyan-100 transition-colors duration-300">
//                       {dest.name}
//                     </h3>
                    
//                     <div className="space-y-2">
//                       <div className="flex items-center gap-3 text-sm">
//                         <div className="flex items-center gap-1">
//                           <MapPin className="h-4 w-4 text-cyan-300" />
//                           <span className="font-medium">{dest.tours} Tours</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Calendar className="h-4 w-4 text-cyan-300" />
//                           <span className="font-medium">{dest.departures} Departures</span>
//                         </div>
//                       </div>
                      
//                       <div className="flex items-center gap-2 pt-2 border-t border-white/20">
//                         <Users className="h-4 w-4 text-cyan-300" />
//                         <span className="text-sm font-semibold">
//                           {dest.guests.toLocaleString()}+ Guests Travelled
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Hover Effect Border */}
//                   <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-cyan-400/50 transition-all duration-500 pointer-events-none" />
//                 </div>
//               </div>
//             ))}

//             {/* Video Player in the remaining space */}
//             <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
//               <VideoPlayer />
//             </div>
//           </div>
//         </div>

//         {/* Bottom CTA Section */}
//         <div
//           className="text-center mt-12 md:mt-16 animate-fade-in-up"
//           style={{ animationDelay: "400ms" }}
//         >
//           <button className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//             <MapPin className="h-5 w-5" />
//             Explore Global Destinations
//             <Users className="h-5 w-5" />
//           </button>
//           <p className="mt-4 text-gray-600 text-sm">
//             Join 1,000,000+ travelers exploring the world with premium experiences
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

// export default TrendingGroupHolidaysSection;



// import React, { useState, useRef, useEffect } from "react";
// import { Users, MapPin, Calendar, Star, ArrowRight, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

// const carouselDestinations = [
//   {
//     id: 1,
//     name: "Swiss Alps",
//     description: "Majestic mountains & alpine adventures",
//     image: "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     badge: "Alpine"
//   },
//   {
//     id: 2,
//     name: "Bali Beaches",
//     description: "Tropical paradise & cultural wonders",
//     image: "https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     badge: "Exotic"
//   },
//   {
//     id: 3,
//     name: "Santorini",
//     description: "White buildings & stunning sunsets",
//     image: "https://images.pexels.com/photos/1028225/pexels-photo-1028225.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.7,
//     badge: "Romantic"
//   },
//   {
//     id: 4,
//     name: "Tokyo City",
//     description: "Modern culture & ancient traditions",
//     image: "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     badge: "Urban"
//   },
//   {
//     id: 5,
//     name: "Paris",
//     description: "City of lights & romantic ambiance",
//     image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     badge: "Classic"
//   },
//   {
//     id: 6,
//     name: "Maldives",
//     description: "Crystal waters & overwater bungalows",
//     image: "https://images.pexels.com/photos/3293148/pexels-photo-3293148.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     badge: "Luxury"
//   }
// ];

// const trendingDestinations = [
//   {
//     id: 1,
//     name: "Andaman",
//     tours: 5,
//     departures: 102,
//     guests: 28661,
//     images: [
//       "https://images.pexels.com/photos/7425765/pexels-photo-7425765.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/2525903/pexels-photo-2525903.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/2422461/pexels-photo-2422461.jpeg?auto=compress&cs=tinysrgb&w=1200"
//     ],
//     rating: 4.8,
//     badge: "Popular"
//   },
//   {
//     id: 2,
//     name: "Kashmir",
//     tours: 13,
//     departures: 62,
//     guests: 130171,
//     images: [
//       "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/358220/pexels-photo-358220.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1200"
//     ],
//     rating: 4.9,
//     badge: "Hot"
//   },
//   {
//     id: 3,
//     name: "Himachal",
//     tours: 14,
//     departures: 95,
//     guests: 212335,
//     images: [
//       "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/1365426/pexels-photo-1365426.jpeg?auto=compress&cs=tinysrgb&w=1200"
//     ],
//     rating: 4.7,
//     badge: "Trending"
//   },
//   {
//     id: 4,
//     name: "North East",
//     tours: 5,
//     departures: 57,
//     guests: 5125,
//     images: [
//       "https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/457881/pexels-photo-457881.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=1200"
//     ],
//     rating: 4.6,
//     badge: "New"
//   },
//   {
//     id: 5,
//     name: "Sikkim Darjeeling",
//     tours: 6,
//     departures: 24,
//     guests: 29217,
//     images: [
//       "https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/1366920/pexels-photo-1366920.jpeg?auto=compress&cs=tinysrgb&w=1200"
//     ],
//     rating: 4.8,
//     badge: "Scenic"
//   },
//   {
//     id: 6,
//     name: "Leh Ladakh",
//     tours: 0,
//     departures: 0,
//     guests: 22979,
//     images: [
//       "https://images.pexels.com/photos/672358/pexels-photo-672358.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/672357/pexels-photo-672357.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/672359/pexels-photo-672359.jpeg?auto=compress&cs=tinysrgb&w=1200"
//     ],
//     rating: 4.9,
//     badge: "Adventure"
//   }
// ];

// // Auto Image Carousel Component for Destination Cards
// const AutoImageCarousel = ({ images, interval = 3000 }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentIndex((prevIndex) => 
//         prevIndex === images.length - 1 ? 0 : prevIndex + 1
//       );
//     }, interval);

//     return () => clearInterval(timer);
//   }, [images.length, interval]);

//   return (
//     <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 w-full overflow-hidden">
//       {images.map((image, index) => (
//         <div
//           key={index}
//           className={`absolute inset-0 transition-opacity duration-1000 ${
//             index === currentIndex ? 'opacity-100' : 'opacity-0'
//           }`}
//         >
//           <img
//             src={image}
//             alt={`Slide ${index + 1}`}
//             className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
//           />
//         </div>
//       ))}
      
//       {/* Gradient Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
      
//       {/* Shine Effect */}
//       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
//       {/* Dot Indicators */}
//       <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex items-center gap-1">
//         {images.map((_, index) => (
//           <div
//             key={index}
//             className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
//               index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// const VideoPlayer = () => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const videoRef = useRef<HTMLVideoElement>(null);

//   const togglePlay = () => {
//     if (videoRef.current) {
//       if (isPlaying) {
//         videoRef.current.pause();
//       } else {
//         videoRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   return (
//     <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-black group h-full">
//       {/* Video Player */}
//       <div className="relative h-full w-full">
//         <video
//           ref={videoRef}
//           src="https://assets.mixkit.co/videos/preview/mixkit-going-down-a-curved-highway-through-a-mountain-range-41576-large.mp4"
//           className="w-full h-full object-cover"
//           muted
//           loop
//           onPlay={() => setIsPlaying(true)}
//           onPause={() => setIsPlaying(false)}
//         />
        
//         {/* Gradient Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
//         {/* Play/Pause Button */}
//         <button
//           onClick={togglePlay}
//           className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-4 transition-all duration-300 group-hover:scale-110"
//         >
//           {isPlaying ? (
//             <Pause className="h-8 w-8 text-white" />
//           ) : (
//             <Play className="h-8 w-8 text-white" />
//           )}
//         </button>

//         {/* Video Info */}
//         <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
//           <h3 className="text-xl font-bold mb-2">Mountain Adventures</h3>
//           <p className="text-sm text-gray-200">
//             Experience the thrill of Himalayan treks and breathtaking landscapes with our guided tours
//           </p>
//         </div>
//       </div>

//       {/* Hover Effect Border */}
//       <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/30 transition-all duration-500 pointer-events-none" />
//     </div>
//   );
// };

// const TrendingGroupHolidaysSection: React.FC = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === carouselDestinations.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === 0 ? carouselDestinations.length - 1 : prevIndex - 1
//     );
//   };

//   return (
//     <section className="py-6 md:py-6 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header with Wider Carousel Left & Content Right */}
//         <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12 md:mb-16">
          
//           {/* Left Side - Wider Carousel */}
//           <div className="flex-1 max-w-2xl lg:max-w-2xl xl:max-w-3xl w-full">
//             <div className="relative rounded-3xl overflow-hidden shadow-2xl">
//               {/* Main Carousel Image */}
//               <div className="relative h-72 sm:h-80 md:h-96 lg:h-[500px] w-full">
//                 <img
//                   src={carouselDestinations[currentIndex].image}
//                   alt={carouselDestinations[currentIndex].name}
//                   className="w-full h-full object-cover"
//                 />
                
//                 {/* Gradient Overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
//                 {/* Floating Card 1 */}
//                 <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg max-w-xs">
//                   <div className="flex items-center gap-3">
//                     <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
//                       <Users className="h-6 w-6 text-green-600" />
//                     </div>
//                     <div>
//                       <div className="font-bold text-gray-900">Premium Tours</div>
//                       <div className="text-sm text-gray-600">Luxury Experiences</div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Floating Card 2 */}
//                 <div className="absolute bottom-24 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg max-w-xs">
//                   <div className="flex items-center gap-3">
//                     <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
//                       <MapPin className="h-6 w-6 text-blue-600" />
//                     </div>
//                     <div>
//                       <div className="font-bold text-gray-900">Global Reach</div>
//                       <div className="text-sm text-gray-600">60+ Countries</div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Destination Info */}
//                 <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
//                   <div className="flex items-center justify-between mb-4">
//                     <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold text-white ${
//                       carouselDestinations[currentIndex].badge === "Alpine" ? "bg-blue-500" :
//                       carouselDestinations[currentIndex].badge === "Exotic" ? "bg-orange-500" :
//                       carouselDestinations[currentIndex].badge === "Romantic" ? "bg-pink-500" :
//                       carouselDestinations[currentIndex].badge === "Urban" ? "bg-gray-600" :
//                       carouselDestinations[currentIndex].badge === "Classic" ? "bg-purple-500" :
//                       "bg-amber-500"
//                     }`}>
//                       {carouselDestinations[currentIndex].badge}
//                     </span>
//                     <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
//                       <Star className="h-4 w-4 text-yellow-400 fill-current" />
//                       <span className="text-sm font-semibold">{carouselDestinations[currentIndex].rating}</span>
//                     </div>
//                   </div>
                  
//                   <h3 className="text-2xl md:text-3xl font-bold mb-3">{carouselDestinations[currentIndex].name}</h3>
                  
//                   <p className="text-lg text-gray-200 max-w-2xl">
//                     {carouselDestinations[currentIndex].description}
//                   </p>
//                 </div>
//               </div>

//               {/* Navigation Arrows */}
//               <div className="absolute top-1/2 left-6 right-6 flex items-center justify-between transform -translate-y-1/2 z-10">
//                 <button
//                   onClick={prevSlide}
//                   className="bg-white/90 hover:bg-white text-gray-800 hover:text-blue-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110"
//                 >
//                   <ChevronLeft className="h-6 w-6" />
//                 </button>
                
//                 <button
//                   onClick={nextSlide}
//                   className="bg-white/90 hover:bg-white text-gray-800 hover:text-blue-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110"
//                 >
//                   <ChevronRight className="h-6 w-6" />
//                 </button>
//               </div>

//               {/* Dot Indicators */}
//               <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-3 z-10">
//                 {carouselDestinations.map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setCurrentIndex(index)}
//                     className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                       index === currentIndex ? 'bg-white w-8' : 'bg-white/50'
//                     }`}
//                   />
//                 ))}
//               </div>

//               {/* Progress Indicator */}
//               <div className="absolute top-6 right-6 z-10">
//                 <div className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-base font-medium">
//                   {currentIndex + 1} / {carouselDestinations.length}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Side - Text Content with Image Below Heading */}
//           <div className="flex-1 max-w-xl">
//             <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
//               <Star className="h-4 w-4" />
//               Global Destinations
//             </div>
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//               World Class{" "}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
//                 Travel Experiences
//               </span>
//             </h2>
            
//             {/* Image Below Heading */}
//             <div className="mb-6">
//               <div className="relative rounded-2xl overflow-hidden shadow-lg">
//                 <img
//                   src="https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=1200"
//                   alt="Happy travelers exploring destination"
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
//                   <span className="text-xs font-bold text-gray-800">Featured Destination</span>
//                 </div>
//               </div>
//             </div>

//             <p className="text-lg text-gray-600 mb-6 leading-relaxed">
//               Explore the world's most breathtaking destinations with our premium travel packages. From alpine adventures to tropical paradises.
//             </p>
            
//             {/* Stats Row */}
//             <div className="flex flex-wrap gap-6 mb-6">
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-blue-600">1M+</div>
//                 <div className="text-sm text-gray-600">Travelers</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-blue-600">60+</div>
//                 <div className="text-sm text-gray-600">Countries</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-blue-600">99%</div>
//                 <div className="text-sm text-gray-600">Satisfaction</div>
//               </div>
//             </div>

//             {/* Features */}
//             <div className="space-y-3 mb-6">
//               <div className="flex items-center gap-3">
//                 <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
//                   <Star className="h-4 w-4 text-green-600" />
//                 </div>
//                 <span className="text-sm text-gray-600">Premium Accommodation</span>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
//                   <Users className="h-4 w-4 text-blue-600" />
//                 </div>
//                 <span className="text-sm text-gray-600">Expert Local Guides</span>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
//                   <MapPin className="h-4 w-4 text-purple-600" />
//                 </div>
//                 <span className="text-sm text-gray-600">Curated Itineraries</span>
//               </div>
//             </div>

//             {/* CTA Button */}
//             <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
//               Start Your Journey
//               <ArrowRight className="h-5 w-5" />
//             </button>
//           </div>
//         </div>

//         {/* Destinations Grid with Auto Image Carousel */}
//         <div className="space-y-6 lg:space-y-8">
//           {/* First Row - 4 Cards */}
//           <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//             {trendingDestinations.slice(0, 4).map((dest, index) => (
//               <div
//                 key={dest.id}
//                 className="group cursor-pointer animate-fade-in-up"
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 <div className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white transform hover:-translate-y-2">
//                   {/* Auto Image Carousel */}
//                   <AutoImageCarousel images={dest.images} interval={3500} />
                  
//                   {/* Badge */}
//                   {dest.badge && (
//                     <div className="absolute top-4 left-4 z-10">
//                       <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white ${
//                         dest.badge === "Popular" ? "bg-orange-500" :
//                         dest.badge === "Hot" ? "bg-red-500" :
//                         dest.badge === "Trending" ? "bg-purple-500" :
//                         dest.badge === "New" ? "bg-green-500" :
//                         dest.badge === "Scenic" ? "bg-teal-500" :
//                         "bg-blue-500"
//                       }`}>
//                         {dest.badge}
//                       </span>
//                     </div>
//                   )}
                  
//                   {/* Rating */}
//                   <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
//                     <Star className="h-3 w-3 text-yellow-400 fill-current" />
//                     <span className="text-xs font-semibold text-white">{dest.rating}</span>
//                   </div>

//                   {/* Content */}
//                   <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 text-white z-10">
//                     {/* Destination Name */}
//                     <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-cyan-100 transition-colors duration-300">
//                       {dest.name}
//                     </h3>
                    
//                     {/* Stats */}
//                     <div className="space-y-2">
//                       <div className="flex items-center gap-3 text-sm">
//                         <div className="flex items-center gap-1">
//                           <MapPin className="h-4 w-4 text-cyan-300" />
//                           <span className="font-medium">{dest.tours} Tours</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Calendar className="h-4 w-4 text-cyan-300" />
//                           <span className="font-medium">{dest.departures} Departures</span>
//                         </div>
//                       </div>
                      
//                       {/* Guests Travelled */}
//                       <div className="flex items-center gap-2 pt-2 border-t border-white/20">
//                         <Users className="h-4 w-4 text-cyan-300" />
//                         <span className="text-sm font-semibold">
//                           {dest.guests.toLocaleString()}+ Guests Travelled
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Hover Effect Border */}
//                   <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-cyan-400/50 transition-all duration-500 pointer-events-none" />
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Second Row - 2 Cards + Video */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
//             {/* First 2 Cards */}
//             {trendingDestinations.slice(4, 6).map((dest, index) => (
//               <div
//                 key={dest.id}
//                 className="group cursor-pointer animate-fade-in-up"
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 <div className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white transform hover:-translate-y-2 h-full">
//                   {/* Auto Image Carousel */}
//                   <AutoImageCarousel images={dest.images} interval={3500} />
                  
//                   {/* Badge */}
//                   {dest.badge && (
//                     <div className="absolute top-4 left-4 z-10">
//                       <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white ${
//                         dest.badge === "Popular" ? "bg-orange-500" :
//                         dest.badge === "Hot" ? "bg-red-500" :
//                         dest.badge === "Trending" ? "bg-purple-500" :
//                         dest.badge === "New" ? "bg-green-500" :
//                         dest.badge === "Scenic" ? "bg-teal-500" :
//                         "bg-blue-500"
//                       }`}>
//                         {dest.badge}
//                       </span>
//                     </div>
//                   )}
                  
//                   {/* Rating */}
//                   <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
//                     <Star className="h-3 w-3 text-yellow-400 fill-current" />
//                     <span className="text-xs font-semibold text-white">{dest.rating}</span>
//                   </div>

//                   {/* Content */}
//                   <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 text-white z-10">
//                     <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-cyan-100 transition-colors duration-300">
//                       {dest.name}
//                     </h3>
                    
//                     <div className="space-y-2">
//                       <div className="flex items-center gap-3 text-sm">
//                         <div className="flex items-center gap-1">
//                           <MapPin className="h-4 w-4 text-cyan-300" />
//                           <span className="font-medium">{dest.tours} Tours</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Calendar className="h-4 w-4 text-cyan-300" />
//                           <span className="font-medium">{dest.departures} Departures</span>
//                         </div>
//                       </div>
                      
//                       <div className="flex items-center gap-2 pt-2 border-t border-white/20">
//                         <Users className="h-4 w-4 text-cyan-300" />
//                         <span className="text-sm font-semibold">
//                           {dest.guests.toLocaleString()}+ Guests Travelled
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Hover Effect Border */}
//                   <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-cyan-400/50 transition-all duration-500 pointer-events-none" />
//                 </div>
//               </div>
//             ))}

//             {/* Video Player in the remaining space */}
//             <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
//               <VideoPlayer />
//             </div>
//           </div>
//         </div>

//         {/* Bottom CTA Section */}
//         <div
//           className="text-center mt-12 md:mt-16 animate-fade-in-up"
//           style={{ animationDelay: "400ms" }}
//         >
//           <button className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//             <MapPin className="h-5 w-5" />
//             Explore Global Destinations
//             <Users className="h-5 w-5" />
//           </button>
//           <p className="mt-4 text-gray-600 text-sm">
//             Join 1,000,000+ travelers exploring the world with premium experiences
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

// export default TrendingGroupHolidaysSection;






// import React, { useState, useRef, useEffect } from "react";
// import { Users, MapPin, Calendar, Star, ArrowRight, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

// const carouselDestinations = [
//   {
//     id: 1,
//     name: "Swiss Alps",
//     description: "Majestic mountains & alpine adventures",
//     image: "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     badge: "Alpine"
//   },
//   {
//     id: 2,
//     name: "Bali Beaches",
//     description: "Tropical paradise & cultural wonders",
//     image: "https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     badge: "Exotic"
//   },
//   {
//     id: 3,
//     name: "Santorini",
//     description: "White buildings & stunning sunsets",
//     image: "https://images.pexels.com/photos/1028225/pexels-photo-1028225.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.7,
//     badge: "Romantic"
//   },
//   {
//     id: 4,
//     name: "Tokyo City",
//     description: "Modern culture & ancient traditions",
//     image: "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     badge: "Urban"
//   },
//   {
//     id: 5,
//     name: "Paris",
//     description: "City of lights & romantic ambiance",
//     image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     badge: "Classic"
//   },
//   {
//     id: 6,
//     name: "Maldives",
//     description: "Crystal waters & overwater bungalows",
//     image: "https://images.pexels.com/photos/3293148/pexels-photo-3293148.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     badge: "Luxury"
//   }
// ];

// const trendingDestinations = [
//   {
//     id: 1,
//     name: "Andaman",
//     tours: 5,
//     departures: 102,
//     guests: 28661,
//     images: [
//       "https://images.pexels.com/photos/7425765/pexels-photo-7425765.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/2525903/pexels-photo-2525903.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/2422461/pexels-photo-2422461.jpeg?auto=compress&cs=tinysrgb&w=1200"
//     ],
//     rating: 4.8,
//     badge: "Popular"
//   },
//   {
//     id: 2,
//     name: "Kashmir",
//     tours: 13,
//     departures: 62,
//     guests: 130171,
//     images: [
//       "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/358220/pexels-photo-358220.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1200"
//     ],
//     rating: 4.9,
//     badge: "Hot"
//   },
//   {
//     id: 3,
//     name: "Himachal",
//     tours: 14,
//     departures: 95,
//     guests: 212335,
//     images: [
//       "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/1365426/pexels-photo-1365426.jpeg?auto=compress&cs=tinysrgb&w=1200"
//     ],
//     rating: 4.7,
//     badge: "Trending"
//   },
//   {
//     id: 4,
//     name: "North East",
//     tours: 5,
//     departures: 57,
//     guests: 5125,
//     images: [
//       "https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/457881/pexels-photo-457881.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=1200"
//     ],
//     rating: 4.6,
//     badge: "New"
//   },
//   {
//     id: 5,
//     name: "Sikkim Darjeeling",
//     tours: 6,
//     departures: 24,
//     guests: 29217,
//     images: [
//       "https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/1366920/pexels-photo-1366920.jpeg?auto=compress&cs=tinysrgb&w=1200"
//     ],
//     rating: 4.8,
//     badge: "Scenic"
//   },
//   {
//     id: 6,
//     name: "Leh Ladakh",
//     tours: 0,
//     departures: 0,
//     guests: 22979,
//     images: [
//       "https://images.pexels.com/photos/672358/pexels-photo-672358.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/672357/pexels-photo-672357.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/672359/pexels-photo-672359.jpeg?auto=compress&cs=tinysrgb&w=1200"
//     ],
//     rating: 4.9,
//     badge: "Adventure"
//   }
// ];

// // Auto Image Carousel Component for Destination Cards
// const AutoImageCarousel = ({ images, interval = 3000 }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentIndex((prevIndex) => 
//         prevIndex === images.length - 1 ? 0 : prevIndex + 1
//       );
//     }, interval);

//     return () => clearInterval(timer);
//   }, [images.length, interval]);

//   return (
//     <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 w-full overflow-hidden">
//       {images.map((image, index) => (
//         <div
//           key={index}
//           className={`absolute inset-0 transition-opacity duration-1000 ${
//             index === currentIndex ? 'opacity-100' : 'opacity-0'
//           }`}
//         >
//           <img
//             src={image}
//             alt={`Slide ${index + 1}`}
//             className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
//           />
//         </div>
//       ))}
      
//       {/* Gradient Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
      
//       {/* Shine Effect */}
//       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
//       {/* Dot Indicators */}
//       <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex items-center gap-1">
//         {images.map((_, index) => (
//           <div
//             key={index}
//             className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
//               index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// const VideoPlayer = () => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const videoRef = useRef<HTMLVideoElement>(null);

//   const togglePlay = () => {
//     if (videoRef.current) {
//       if (isPlaying) {
//         videoRef.current.pause();
//       } else {
//         videoRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   return (
//     <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-black group h-full">
//       {/* Video Player */}
//       <div className="relative h-full w-full">
//         <video
//           ref={videoRef}
//           src="https://assets.mixkit.co/videos/preview/mixkit-going-down-a-curved-highway-through-a-mountain-range-41576-large.mp4"
//           className="w-full h-full object-cover"
//           muted
//           loop
//           onPlay={() => setIsPlaying(true)}
//           onPause={() => setIsPlaying(false)}
//         />
        
//         {/* Gradient Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
//         {/* Play/Pause Button */}
//         <button
//           onClick={togglePlay}
//           className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-4 transition-all duration-300 group-hover:scale-110"
//         >
//           {isPlaying ? (
//             <Pause className="h-8 w-8 text-white" />
//           ) : (
//             <Play className="h-8 w-8 text-white" />
//           )}
//         </button>

//         {/* Video Info */}
//         <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
//           <h3 className="text-xl font-bold mb-2">Mountain Adventures</h3>
//           <p className="text-sm text-gray-200">
//             Experience the thrill of Himalayan treks and breathtaking landscapes with our guided tours
//           </p>
//         </div>
//       </div>

//       {/* Hover Effect Border */}
//       <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/30 transition-all duration-500 pointer-events-none" />
//     </div>
//   );
// };

// const TrendingGroupHolidaysSection: React.FC = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === carouselDestinations.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === 0 ? carouselDestinations.length - 1 : prevIndex - 1
//     );
//   };

//   return (
//     <section className="py-6 md:py-6 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header with Wider Carousel Left & Content Right */}
//         <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12 md:mb-16">
          
//           {/* Left Side - Wider Carousel */}
//           <div className="flex-1 max-w-2xl lg:max-w-2xl xl:max-w-3xl w-full">
//             <div className="relative rounded-3xl overflow-hidden shadow-2xl">
//               {/* Main Carousel Image */}
//               <div className="relative h-72 sm:h-80 md:h-96 lg:h-[500px] w-full">
//                 <img
//                   src={carouselDestinations[currentIndex].image}
//                   alt={carouselDestinations[currentIndex].name}
//                   className="w-full h-full object-cover"
//                 />
                
//                 {/* Gradient Overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
//                 {/* Floating Card 1 */}
//                 <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg max-w-xs">
//                   <div className="flex items-center gap-3">
//                     <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
//                       <Users className="h-6 w-6 text-green-600" />
//                     </div>
//                     <div>
//                       <div className="font-bold text-gray-900">Premium Tours</div>
//                       <div className="text-sm text-gray-600">Luxury Experiences</div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Floating Card 2 */}
//                 <div className="absolute bottom-24 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg max-w-xs">
//                   <div className="flex items-center gap-3">
//                     <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
//                       <MapPin className="h-6 w-6 text-blue-600" />
//                     </div>
//                     <div>
//                       <div className="font-bold text-gray-900">Global Reach</div>
//                       <div className="text-sm text-gray-600">60+ Countries</div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Destination Info */}
//                 <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
//                   <div className="flex items-center justify-between mb-4">
//                     <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold text-white ${
//                       carouselDestinations[currentIndex].badge === "Alpine" ? "bg-blue-500" :
//                       carouselDestinations[currentIndex].badge === "Exotic" ? "bg-orange-500" :
//                       carouselDestinations[currentIndex].badge === "Romantic" ? "bg-pink-500" :
//                       carouselDestinations[currentIndex].badge === "Urban" ? "bg-gray-600" :
//                       carouselDestinations[currentIndex].badge === "Classic" ? "bg-purple-500" :
//                       "bg-amber-500"
//                     }`}>
//                       {carouselDestinations[currentIndex].badge}
//                     </span>
//                     <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
//                       <Star className="h-4 w-4 text-yellow-400 fill-current" />
//                       <span className="text-sm font-semibold">{carouselDestinations[currentIndex].rating}</span>
//                     </div>
//                   </div>
                  
//                   <h3 className="text-2xl md:text-3xl font-bold mb-3">{carouselDestinations[currentIndex].name}</h3>
                  
//                   <p className="text-lg text-gray-200 max-w-2xl">
//                     {carouselDestinations[currentIndex].description}
//                   </p>
//                 </div>
//               </div>

//               {/* Navigation Arrows */}
//               <div className="absolute top-1/2 left-6 right-6 flex items-center justify-between transform -translate-y-1/2 z-10">
//                 <button
//                   onClick={prevSlide}
//                   className="bg-white/90 hover:bg-white text-gray-800 hover:text-blue-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110"
//                 >
//                   <ChevronLeft className="h-6 w-6" />
//                 </button>
                
//                 <button
//                   onClick={nextSlide}
//                   className="bg-white/90 hover:bg-white text-gray-800 hover:text-blue-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110"
//                 >
//                   <ChevronRight className="h-6 w-6" />
//                 </button>
//               </div>

//               {/* Dot Indicators */}
//               <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-3 z-10">
//                 {carouselDestinations.map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setCurrentIndex(index)}
//                     className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                       index === currentIndex ? 'bg-white w-8' : 'bg-white/50'
//                     }`}
//                   />
//                 ))}
//               </div>

//               {/* Progress Indicator */}
//               <div className="absolute top-6 right-6 z-10">
//                 <div className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-base font-medium">
//                   {currentIndex + 1} / {carouselDestinations.length}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Side - Text Content with Image to the right of Stats & Features */}
//           <div className="flex-1 max-w-xl">
//             <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
//               <Star className="h-4 w-4" />
//               Global Destinations
//             </div>
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//               World Class{" "}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
//                 Travel Experiences
//               </span>
//             </h2>

//             <p className="text-lg text-gray-600 mb-6 leading-relaxed">
//               Explore the world's most breathtaking destinations with our premium travel packages. From alpine adventures to tropical paradises.
//             </p>
            
//             {/* Content with Image on Right */}
//             <div className="flex flex-col lg:flex-row gap-6 mb-6">
//               {/* Left Side - Stats & Features */}
//               <div className="flex-1">
//                 {/* Stats Row */}
//                 <div className="flex flex-wrap gap-6 mb-6">
//                   <div className="text-center">
//                     <div className="text-2xl font-bold text-blue-600">1M+</div>
//                     <div className="text-sm text-gray-600">Travelers</div>
//                   </div>
//                   <div className="text-center">
//                     <div className="text-2xl font-bold text-blue-600">60+</div>
//                     <div className="text-sm text-gray-600">Countries</div>
//                   </div>
//                   <div className="text-center">
//                     <div className="text-2xl font-bold text-blue-600">99%</div>
//                     <div className="text-sm text-gray-600">Satisfaction</div>
//                   </div>
//                 </div>

//                 {/* Features */}
//                 <div className="space-y-3">
//                   <div className="flex items-center gap-3">
//                     <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
//                       <Star className="h-4 w-4 text-green-600" />
//                     </div>
//                     <span className="text-sm text-gray-600">Premium Accommodation</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
//                       <Users className="h-4 w-4 text-blue-600" />
//                     </div>
//                     <span className="text-sm text-gray-600">Expert Local Guides</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
//                       <MapPin className="h-4 w-4 text-purple-600" />
//                     </div>
//                     <span className="text-sm text-gray-600">Curated Itineraries</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Right Side - Image */}
//               <div className="flex-1">
//                 <div className="relative rounded-2xl overflow-hidden shadow-lg h-full min-h-[200px]">
//                   <img
//                     src="https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=1200"
//                     alt="Happy travelers exploring destination"
//                     className="w-full h-full object-cover"
//                   />
//                   <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
//                     <span className="text-xs font-bold text-gray-800">Featured Destination</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* CTA Button */}
//             <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
//               Start Your Journey
//               <ArrowRight className="h-5 w-5" />
//             </button>
//           </div>
//         </div>

//         {/* Destinations Grid with Auto Image Carousel */}
//         <div className="space-y-6 lg:space-y-8">
//           {/* First Row - 4 Cards */}
//           <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//             {trendingDestinations.slice(0, 4).map((dest, index) => (
//               <div
//                 key={dest.id}
//                 className="group cursor-pointer animate-fade-in-up"
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 <div className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white transform hover:-translate-y-2">
//                   {/* Auto Image Carousel */}
//                   <AutoImageCarousel images={dest.images} interval={3500} />
                  
//                   {/* Badge */}
//                   {dest.badge && (
//                     <div className="absolute top-4 left-4 z-10">
//                       <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white ${
//                         dest.badge === "Popular" ? "bg-orange-500" :
//                         dest.badge === "Hot" ? "bg-red-500" :
//                         dest.badge === "Trending" ? "bg-purple-500" :
//                         dest.badge === "New" ? "bg-green-500" :
//                         dest.badge === "Scenic" ? "bg-teal-500" :
//                         "bg-blue-500"
//                       }`}>
//                         {dest.badge}
//                       </span>
//                     </div>
//                   )}
                  
//                   {/* Rating */}
//                   <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
//                     <Star className="h-3 w-3 text-yellow-400 fill-current" />
//                     <span className="text-xs font-semibold text-white">{dest.rating}</span>
//                   </div>

//                   {/* Content */}
//                   <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 text-white z-10">
//                     {/* Destination Name */}
//                     <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-cyan-100 transition-colors duration-300">
//                       {dest.name}
//                     </h3>
                    
//                     {/* Stats */}
//                     <div className="space-y-2">
//                       <div className="flex items-center gap-3 text-sm">
//                         <div className="flex items-center gap-1">
//                           <MapPin className="h-4 w-4 text-cyan-300" />
//                           <span className="font-medium">{dest.tours} Tours</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Calendar className="h-4 w-4 text-cyan-300" />
//                           <span className="font-medium">{dest.departures} Departures</span>
//                         </div>
//                       </div>
                      
//                       {/* Guests Travelled */}
//                       <div className="flex items-center gap-2 pt-2 border-t border-white/20">
//                         <Users className="h-4 w-4 text-cyan-300" />
//                         <span className="text-sm font-semibold">
//                           {dest.guests.toLocaleString()}+ Guests Travelled
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Hover Effect Border */}
//                   <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-cyan-400/50 transition-all duration-500 pointer-events-none" />
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Second Row - 2 Cards + Video */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
//             {/* First 2 Cards */}
//             {trendingDestinations.slice(4, 6).map((dest, index) => (
//               <div
//                 key={dest.id}
//                 className="group cursor-pointer animate-fade-in-up"
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 <div className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white transform hover:-translate-y-2 h-full">
//                   {/* Auto Image Carousel */}
//                   <AutoImageCarousel images={dest.images} interval={3500} />
                  
//                   {/* Badge */}
//                   {dest.badge && (
//                     <div className="absolute top-4 left-4 z-10">
//                       <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white ${
//                         dest.badge === "Popular" ? "bg-orange-500" :
//                         dest.badge === "Hot" ? "bg-red-500" :
//                         dest.badge === "Trending" ? "bg-purple-500" :
//                         dest.badge === "New" ? "bg-green-500" :
//                         dest.badge === "Scenic" ? "bg-teal-500" :
//                         "bg-blue-500"
//                       }`}>
//                         {dest.badge}
//                       </span>
//                     </div>
//                   )}
                  
//                   {/* Rating */}
//                   <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
//                     <Star className="h-3 w-3 text-yellow-400 fill-current" />
//                     <span className="text-xs font-semibold text-white">{dest.rating}</span>
//                   </div>

//                   {/* Content */}
//                   <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 text-white z-10">
//                     <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-cyan-100 transition-colors duration-300">
//                       {dest.name}
//                     </h3>
                    
//                     <div className="space-y-2">
//                       <div className="flex items-center gap-3 text-sm">
//                         <div className="flex items-center gap-1">
//                           <MapPin className="h-4 w-4 text-cyan-300" />
//                           <span className="font-medium">{dest.tours} Tours</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Calendar className="h-4 w-4 text-cyan-300" />
//                           <span className="font-medium">{dest.departures} Departures</span>
//                         </div>
//                       </div>
                      
//                       <div className="flex items-center gap-2 pt-2 border-t border-white/20">
//                         <Users className="h-4 w-4 text-cyan-300" />
//                         <span className="text-sm font-semibold">
//                           {dest.guests.toLocaleString()}+ Guests Travelled
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Hover Effect Border */}
//                   <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-cyan-400/50 transition-all duration-500 pointer-events-none" />
//                 </div>
//               </div>
//             ))}

//             {/* Video Player in the remaining space */}
//             <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
//               <VideoPlayer />
//             </div>
//           </div>
//         </div>

//         {/* Bottom CTA Section */}
//         <div
//           className="text-center mt-12 md:mt-16 animate-fade-in-up"
//           style={{ animationDelay: "400ms" }}
//         >
//           <button className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//             <MapPin className="h-5 w-5" />
//             Explore Global Destinations
//             <Users className="h-5 w-5" />
//           </button>
//           <p className="mt-4 text-gray-600 text-sm">
//             Join 1,000,000+ travelers exploring the world with premium experiences
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

// export default TrendingGroupHolidaysSection;




// import React, { useState, useRef, useEffect } from "react";
// import { Users, MapPin, Calendar, Star, ArrowRight, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

// const carouselDestinations = [
//   {
//     id: 1,
//     name: "Swiss Alps",
//     description: "Majestic mountains & alpine adventures",
//     image: "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     badge: "Alpine"
//   },
//   {
//     id: 2,
//     name: "Bali Beaches",
//     description: "Tropical paradise & cultural wonders",
//     image: "https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     badge: "Exotic"
//   },
//   {
//     id: 3,
//     name: "Santorini",
//     description: "White buildings & stunning sunsets",
//     image: "https://images.pexels.com/photos/1028225/pexels-photo-1028225.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.7,
//     badge: "Romantic"
//   },
//   {
//     id: 4,
//     name: "Tokyo City",
//     description: "Modern culture & ancient traditions",
//     image: "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     badge: "Urban"
//   },
//   {
//     id: 5,
//     name: "Paris",
//     description: "City of lights & romantic ambiance",
//     image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     badge: "Classic"
//   },
//   {
//     id: 6,
//     name: "Maldives",
//     description: "Crystal waters & overwater bungalows",
//     image: "https://images.pexels.com/photos/3293148/pexels-photo-3293148.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     badge: "Luxury"
//   }
// ];

// const trendingDestinations = [
//   {
//     id: 1,
//     name: "Andaman",
//     tours: 5,
//     departures: 102,
//     guests: 28661,
//     images: [
//       "https://images.pexels.com/photos/7425765/pexels-photo-7425765.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/2525903/pexels-photo-2525903.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/2422461/pexels-photo-2422461.jpeg?auto=compress&cs=tinysrgb&w=1200"
//     ],
//     rating: 4.8,
//     badge: "Popular"
//   },
//   {
//     id: 2,
//     name: "Kashmir",
//     tours: 13,
//     departures: 62,
//     guests: 130171,
//     images: [
//       "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/358220/pexels-photo-358220.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1200"
//     ],
//     rating: 4.9,
//     badge: "Hot"
//   },
//   {
//     id: 3,
//     name: "Himachal",
//     tours: 14,
//     departures: 95,
//     guests: 212335,
//     images: [
//       "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/1365426/pexels-photo-1365426.jpeg?auto=compress&cs=tinysrgb&w=1200"
//     ],
//     rating: 4.7,
//     badge: "Trending"
//   },
//   {
//     id: 4,
//     name: "North East",
//     tours: 5,
//     departures: 57,
//     guests: 5125,
//     images: [
//       "https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/457881/pexels-photo-457881.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=1200"
//     ],
//     rating: 4.6,
//     badge: "New"
//   },
//   {
//     id: 5,
//     name: "Sikkim Darjeeling",
//     tours: 6,
//     departures: 24,
//     guests: 29217,
//     images: [
//       "https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/1366920/pexels-photo-1366920.jpeg?auto=compress&cs=tinysrgb&w=1200"
//     ],
//     rating: 4.8,
//     badge: "Scenic"
//   },
//   {
//     id: 6,
//     name: "Leh Ladakh",
//     tours: 0,
//     departures: 0,
//     guests: 22979,
//     images: [
//       "https://images.pexels.com/photos/672358/pexels-photo-672358.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/672357/pexels-photo-672357.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/672359/pexels-photo-672359.jpeg?auto=compress&cs=tinysrgb&w=1200"
//     ],
//     rating: 4.9,
//     badge: "Adventure"
//   }
// ];

// // Auto Image Carousel Component for Destination Cards
// const AutoImageCarousel = ({ images, interval = 3000 }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentIndex((prevIndex) => 
//         prevIndex === images.length - 1 ? 0 : prevIndex + 1
//       );
//     }, interval);

//     return () => clearInterval(timer);
//   }, [images.length, interval]);

//   return (
//     <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 w-full overflow-hidden">
//       {images.map((image, index) => (
//         <div
//           key={index}
//           className={`absolute inset-0 transition-opacity duration-1000 ${
//             index === currentIndex ? 'opacity-100' : 'opacity-0'
//           }`}
//         >
//           <img
//             src={image}
//             alt={`Slide ${index + 1}`}
//             className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
//           />
//         </div>
//       ))}
      
//       {/* Gradient Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
      
//       {/* Shine Effect */}
//       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
//       {/* Dot Indicators */}
//       <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex items-center gap-1">
//         {images.map((_, index) => (
//           <div
//             key={index}
//             className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
//               index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// const VideoPlayer = () => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const videoRef = useRef<HTMLVideoElement>(null);

//   const togglePlay = () => {
//     if (videoRef.current) {
//       if (isPlaying) {
//         videoRef.current.pause();
//       } else {
//         videoRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   return (
//     <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-black group h-full">
//       {/* Video Player */}
//       <div className="relative h-full w-full">
//         <video
//           ref={videoRef}
//           src="https://assets.mixkit.co/videos/preview/mixkit-going-down-a-curved-highway-through-a-mountain-range-41576-large.mp4"
//           className="w-full h-full object-cover"
//           muted
//           loop
//           onPlay={() => setIsPlaying(true)}
//           onPause={() => setIsPlaying(false)}
//         />
        
//         {/* Gradient Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
//         {/* Play/Pause Button */}
//         <button
//           onClick={togglePlay}
//           className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-4 transition-all duration-300 group-hover:scale-110"
//         >
//           {isPlaying ? (
//             <Pause className="h-8 w-8 text-white" />
//           ) : (
//             <Play className="h-8 w-8 text-white" />
//           )}
//         </button>

//         {/* Video Info */}
//         <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
//           <h3 className="text-xl font-bold mb-2">Mountain Adventures</h3>
//           <p className="text-sm text-gray-200">
//             Experience the thrill of Himalayan treks and breathtaking landscapes with our guided tours
//           </p>
//         </div>
//       </div>

//       {/* Hover Effect Border */}
//       <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/30 transition-all duration-500 pointer-events-none" />
//     </div>
//   );
// };

// const TrendingGroupHolidaysSection: React.FC = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === carouselDestinations.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === 0 ? carouselDestinations.length - 1 : prevIndex - 1
//     );
//   };

//   return (
//     <section className="py-6 md:py-6 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header with Wider Carousel Left & Content Right */}
//         <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12 md:mb-16">
          
//           {/* Left Side - Wider Carousel */}
//           <div className="flex-1 max-w-2xl lg:max-w-2xl xl:max-w-3xl w-full">
//             <div className="relative rounded-3xl overflow-hidden shadow-2xl">
//               {/* Main Carousel Image */}
//               <div className="relative h-72 sm:h-80 md:h-96 lg:h-[500px] w-full">
//                 <img
//                   src={carouselDestinations[currentIndex].image}
//                   alt={carouselDestinations[currentIndex].name}
//                   className="w-full h-full object-cover"
//                 />
                
//                 {/* Gradient Overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
//                 {/* Floating Card 1 */}
//                 <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg max-w-xs">
//                   <div className="flex items-center gap-3">
//                     <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
//                       <Users className="h-6 w-6 text-green-600" />
//                     </div>
//                     <div>
//                       <div className="font-bold text-gray-900">Premium Tours</div>
//                       <div className="text-sm text-gray-600">Luxury Experiences</div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Floating Card 2 */}
//                 <div className="absolute bottom-24 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg max-w-xs">
//                   <div className="flex items-center gap-3">
//                     <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
//                       <MapPin className="h-6 w-6 text-blue-600" />
//                     </div>
//                     <div>
//                       <div className="font-bold text-gray-900">Global Reach</div>
//                       <div className="text-sm text-gray-600">60+ Countries</div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Destination Info */}
//                 <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
//                   <div className="flex items-center justify-between mb-4">
//                     <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold text-white ${
//                       carouselDestinations[currentIndex].badge === "Alpine" ? "bg-blue-500" :
//                       carouselDestinations[currentIndex].badge === "Exotic" ? "bg-orange-500" :
//                       carouselDestinations[currentIndex].badge === "Romantic" ? "bg-pink-500" :
//                       carouselDestinations[currentIndex].badge === "Urban" ? "bg-gray-600" :
//                       carouselDestinations[currentIndex].badge === "Classic" ? "bg-purple-500" :
//                       "bg-amber-500"
//                     }`}>
//                       {carouselDestinations[currentIndex].badge}
//                     </span>
//                     <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
//                       <Star className="h-4 w-4 text-yellow-400 fill-current" />
//                       <span className="text-sm font-semibold">{carouselDestinations[currentIndex].rating}</span>
//                     </div>
//                   </div>
                  
//                   <h3 className="text-2xl md:text-3xl font-bold mb-3">{carouselDestinations[currentIndex].name}</h3>
                  
//                   <p className="text-lg text-gray-200 max-w-2xl">
//                     {carouselDestinations[currentIndex].description}
//                   </p>
//                 </div>
//               </div>

//               {/* Navigation Arrows */}
//               <div className="absolute top-1/2 left-6 right-6 flex items-center justify-between transform -translate-y-1/2 z-10">
//                 <button
//                   onClick={prevSlide}
//                   className="bg-white/90 hover:bg-white text-gray-800 hover:text-blue-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110"
//                 >
//                   <ChevronLeft className="h-6 w-6" />
//                 </button>
                
//                 <button
//                   onClick={nextSlide}
//                   className="bg-white/90 hover:bg-white text-gray-800 hover:text-blue-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110"
//                 >
//                   <ChevronRight className="h-6 w-6" />
//                 </button>
//               </div>

//               {/* Dot Indicators */}
//               <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-3 z-10">
//                 {carouselDestinations.map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setCurrentIndex(index)}
//                     className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                       index === currentIndex ? 'bg-white w-8' : 'bg-white/50'
//                     }`}
//                   />
//                 ))}
//               </div>

//               {/* Progress Indicator */}
//               <div className="absolute top-6 right-6 z-10">
//                 <div className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-base font-medium">
//                   {currentIndex + 1} / {carouselDestinations.length}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Side - Text Content with Image to the right of Stats & Features */}
//           <div className="flex-1 max-w-xl">
//             <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
//               <Star className="h-4 w-4" />
//               Global Destinations
//             </div>
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//               World Class{" "}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
//                 Travel Experiences
//               </span>
//             </h2>

//             <p className="text-lg text-gray-600 mb-6 leading-relaxed">
//               Explore the world's most breathtaking destinations with our premium travel packages. From alpine adventures to tropical paradises.
//             </p>
            
//             {/* Content with Image on Right */}
//             <div className="flex flex-col lg:flex-row gap-6 mb-8">
//               {/* Left Side - Stats & Features */}
//               <div className="flex-1">
//                 {/* Stats Row */}
//                 <div className="flex flex-wrap gap-6 mb-6">
//                   <div className="text-center">
//                     <div className="text-2xl font-bold text-blue-600">1M+</div>
//                     <div className="text-sm text-gray-600">Travelers</div>
//                   </div>
//                   <div className="text-center">
//                     <div className="text-2xl font-bold text-blue-600">60+</div>
//                     <div className="text-sm text-gray-600">Countries</div>
//                   </div>
//                   <div className="text-center">
//                     <div className="text-2xl font-bold text-blue-600">99%</div>
//                     <div className="text-sm text-gray-600">Satisfaction</div>
//                   </div>
//                 </div>

//                 {/* Features */}
//                 <div className="space-y-3">
//                   <div className="flex items-center gap-3">
//                     <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
//                       <Star className="h-4 w-4 text-green-600" />
//                     </div>
//                     <span className="text-sm text-gray-600">Premium Accommodation</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
//                       <Users className="h-4 w-4 text-blue-600" />
//                     </div>
//                     <span className="text-sm text-gray-600">Expert Local Guides</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
//                       <MapPin className="h-4 w-4 text-purple-600" />
//                     </div>
//                     <span className="text-sm text-gray-600">Curated Itineraries</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Right Side - Image with increased size */}
//               <div className="flex-1">
//                 <div className="relative rounded-2xl overflow-hidden shadow-lg h-full min-h-[280px] lg:min-h-[320px]">
//                   <img
//                     src="https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=1200"
//                     alt="Happy travelers exploring destination"
//                     className="w-full h-full object-cover"
//                   />
//                   <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
//                     <span className="text-xs font-bold text-gray-800">Featured Destination</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* CTA Button aligned with image bottom */}
//             <div className="flex justify-start lg:justify-start">
//               <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
//                 Start Your Journey
//                 <ArrowRight className="h-5 w-5" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Destinations Grid with Auto Image Carousel */}
//         <div className="space-y-6 lg:space-y-8">
//           {/* First Row - 4 Cards */}
//           <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//             {trendingDestinations.slice(0, 4).map((dest, index) => (
//               <div
//                 key={dest.id}
//                 className="group cursor-pointer animate-fade-in-up"
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 <div className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white transform hover:-translate-y-2">
//                   {/* Auto Image Carousel */}
//                   <AutoImageCarousel images={dest.images} interval={3500} />
                  
//                   {/* Badge */}
//                   {dest.badge && (
//                     <div className="absolute top-4 left-4 z-10">
//                       <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white ${
//                         dest.badge === "Popular" ? "bg-orange-500" :
//                         dest.badge === "Hot" ? "bg-red-500" :
//                         dest.badge === "Trending" ? "bg-purple-500" :
//                         dest.badge === "New" ? "bg-green-500" :
//                         dest.badge === "Scenic" ? "bg-teal-500" :
//                         "bg-blue-500"
//                       }`}>
//                         {dest.badge}
//                       </span>
//                     </div>
//                   )}
                  
//                   {/* Rating */}
//                   <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
//                     <Star className="h-3 w-3 text-yellow-400 fill-current" />
//                     <span className="text-xs font-semibold text-white">{dest.rating}</span>
//                   </div>

//                   {/* Content */}
//                   <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 text-white z-10">
//                     {/* Destination Name */}
//                     <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-cyan-100 transition-colors duration-300">
//                       {dest.name}
//                     </h3>
                    
//                     {/* Stats */}
//                     <div className="space-y-2">
//                       <div className="flex items-center gap-3 text-sm">
//                         <div className="flex items-center gap-1">
//                           <MapPin className="h-4 w-4 text-cyan-300" />
//                           <span className="font-medium">{dest.tours} Tours</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Calendar className="h-4 w-4 text-cyan-300" />
//                           <span className="font-medium">{dest.departures} Departures</span>
//                         </div>
//                       </div>
                      
//                       {/* Guests Travelled */}
//                       <div className="flex items-center gap-2 pt-2 border-t border-white/20">
//                         <Users className="h-4 w-4 text-cyan-300" />
//                         <span className="text-sm font-semibold">
//                           {dest.guests.toLocaleString()}+ Guests Travelled
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Hover Effect Border */}
//                   <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-cyan-400/50 transition-all duration-500 pointer-events-none" />
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Second Row - 2 Cards + Video */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
//             {/* First 2 Cards */}
//             {trendingDestinations.slice(4, 6).map((dest, index) => (
//               <div
//                 key={dest.id}
//                 className="group cursor-pointer animate-fade-in-up"
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 <div className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white transform hover:-translate-y-2 h-full">
//                   {/* Auto Image Carousel */}
//                   <AutoImageCarousel images={dest.images} interval={3500} />
                  
//                   {/* Badge */}
//                   {dest.badge && (
//                     <div className="absolute top-4 left-4 z-10">
//                       <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white ${
//                         dest.badge === "Popular" ? "bg-orange-500" :
//                         dest.badge === "Hot" ? "bg-red-500" :
//                         dest.badge === "Trending" ? "bg-purple-500" :
//                         dest.badge === "New" ? "bg-green-500" :
//                         dest.badge === "Scenic" ? "bg-teal-500" :
//                         "bg-blue-500"
//                       }`}>
//                         {dest.badge}
//                       </span>
//                     </div>
//                   )}
                  
//                   {/* Rating */}
//                   <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
//                     <Star className="h-3 w-3 text-yellow-400 fill-current" />
//                     <span className="text-xs font-semibold text-white">{dest.rating}</span>
//                   </div>

//                   {/* Content */}
//                   <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 text-white z-10">
//                     <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-cyan-100 transition-colors duration-300">
//                       {dest.name}
//                     </h3>
                    
//                     <div className="space-y-2">
//                       <div className="flex items-center gap-3 text-sm">
//                         <div className="flex items-center gap-1">
//                           <MapPin className="h-4 w-4 text-cyan-300" />
//                           <span className="font-medium">{dest.tours} Tours</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Calendar className="h-4 w-4 text-cyan-300" />
//                           <span className="font-medium">{dest.departures} Departures</span>
//                         </div>
//                       </div>
                      
//                       <div className="flex items-center gap-2 pt-2 border-t border-white/20">
//                         <Users className="h-4 w-4 text-cyan-300" />
//                         <span className="text-sm font-semibold">
//                           {dest.guests.toLocaleString()}+ Guests Travelled
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Hover Effect Border */}
//                   <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-cyan-400/50 transition-all duration-500 pointer-events-none" />
//                 </div>
//               </div>
//             ))}

//             {/* Video Player in the remaining space */}
//             <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
//               <VideoPlayer />
//             </div>
//           </div>
//         </div>

//         {/* Bottom CTA Section */}
//         <div
//           className="text-center mt-12 md:mt-16 animate-fade-in-up"
//           style={{ animationDelay: "400ms" }}
//         >
//           <button className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//             <MapPin className="h-5 w-5" />
//             Explore Global Destinations
//             <Users className="h-5 w-5" />
//           </button>
//           <p className="mt-4 text-gray-600 text-sm">
//             Join 1,000,000+ travelers exploring the world with premium experiences
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

// export default TrendingGroupHolidaysSection;





// import React, { useState, useRef, useEffect } from "react";
// import { Users, MapPin, Calendar, Star, ArrowRight, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

// const carouselDestinations = [
//   {
//     id: 1,
//     name: "Swiss Alps",
//     description: "Majestic mountains & alpine adventures",
//     image: "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     badge: "Alpine"
//   },
//   {
//     id: 2,
//     name: "Bali Beaches",
//     description: "Tropical paradise & cultural wonders",
//     image: "https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     badge: "Exotic"
//   },
//   {
//     id: 3,
//     name: "Santorini",
//     description: "White buildings & stunning sunsets",
//     image: "https://images.pexels.com/photos/1028225/pexels-photo-1028225.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.7,
//     badge: "Romantic"
//   },
//   {
//     id: 4,
//     name: "Tokyo City",
//     description: "Modern culture & ancient traditions",
//     image: "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     badge: "Urban"
//   },
//   {
//     id: 5,
//     name: "Paris",
//     description: "City of lights & romantic ambiance",
//     image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     badge: "Classic"
//   },
//   {
//     id: 6,
//     name: "Maldives",
//     description: "Crystal waters & overwater bungalows",
//     image: "https://images.pexels.com/photos/3293148/pexels-photo-3293148.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     badge: "Luxury"
//   }
// ];

// const trendingDestinations = [
//   {
//     id: 1,
//     name: "Andaman",
//     tours: 5,
//     departures: 102,
//     guests: 28661,
//     images: [
//       "https://images.pexels.com/photos/7425765/pexels-photo-7425765.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/2525903/pexels-photo-2525903.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/2422461/pexels-photo-2422461.jpeg?auto=compress&cs=tinysrgb&w=1200"
//     ],
//     rating: 4.8,
//     badge: "Popular"
//   },
//   {
//     id: 2,
//     name: "Kashmir",
//     tours: 13,
//     departures: 62,
//     guests: 130171,
//     images: [
//       "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/358220/pexels-photo-358220.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1200"
//     ],
//     rating: 4.9,
//     badge: "Hot"
//   },
//   {
//     id: 3,
//     name: "Himachal",
//     tours: 14,
//     departures: 95,
//     guests: 212335,
//     images: [
//       "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/1365426/pexels-photo-1365426.jpeg?auto=compress&cs=tinysrgb&w=1200"
//     ],
//     rating: 4.7,
//     badge: "Trending"
//   },
//   {
//     id: 4,
//     name: "North East",
//     tours: 5,
//     departures: 57,
//     guests: 5125,
//     images: [
//       "https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/457881/pexels-photo-457881.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=1200"
//     ],
//     rating: 4.6,
//     badge: "New"
//   },
//   {
//     id: 5,
//     name: "Sikkim Darjeeling",
//     tours: 6,
//     departures: 24,
//     guests: 29217,
//     images: [
//       "https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/1366920/pexels-photo-1366920.jpeg?auto=compress&cs=tinysrgb&w=1200"
//     ],
//     rating: 4.8,
//     badge: "Scenic"
//   },
//   {
//     id: 6,
//     name: "Leh Ladakh",
//     tours: 0,
//     departures: 0,
//     guests: 22979,
//     images: [
//       "https://images.pexels.com/photos/672358/pexels-photo-672358.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/672357/pexels-photo-672357.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/672359/pexels-photo-672359.jpeg?auto=compress&cs=tinysrgb&w=1200"
//     ],
//     rating: 4.9,
//     badge: "Adventure"
//   }
// ];

// // Auto Image Carousel Component for Destination Cards
// const AutoImageCarousel = ({ images, interval = 3000 }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentIndex((prevIndex) => 
//         prevIndex === images.length - 1 ? 0 : prevIndex + 1
//       );
//     }, interval);

//     return () => clearInterval(timer);
//   }, [images.length, interval]);

//   return (
//     <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 w-full overflow-hidden">
//       {images.map((image, index) => (
//         <div
//           key={index}
//           className={`absolute inset-0 transition-opacity duration-1000 ${
//             index === currentIndex ? 'opacity-100' : 'opacity-0'
//           }`}
//         >
//           <img
//             src={image}
//             alt={`Slide ${index + 1}`}
//             className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
//           />
//         </div>
//       ))}
      
//       {/* Gradient Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
      
//       {/* Shine Effect */}
//       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
//       {/* Dot Indicators */}
//       <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex items-center gap-1">
//         {images.map((_, index) => (
//           <div
//             key={index}
//             className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
//               index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// const VideoPlayer = () => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const videoRef = useRef<HTMLVideoElement>(null);

//   const togglePlay = () => {
//     if (videoRef.current) {
//       if (isPlaying) {
//         videoRef.current.pause();
//       } else {
//         videoRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   return (
//     <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-black group h-full">
//       {/* Video Player */}
//       <div className="relative h-full w-full">
//         <video
//           ref={videoRef}
//           src="https://assets.mixkit.co/videos/preview/mixkit-going-down-a-curved-highway-through-a-mountain-range-41576-large.mp4"
//           className="w-full h-full object-cover"
//           muted
//           loop
//           onPlay={() => setIsPlaying(true)}
//           onPause={() => setIsPlaying(false)}
//         />
        
//         {/* Gradient Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
//         {/* Play/Pause Button */}
//         <button
//           onClick={togglePlay}
//           className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-4 transition-all duration-300 group-hover:scale-110"
//         >
//           {isPlaying ? (
//             <Pause className="h-8 w-8 text-white" />
//           ) : (
//             <Play className="h-8 w-8 text-white" />
//           )}
//         </button>

//         {/* Video Info */}
//         <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
//           <h3 className="text-xl font-bold mb-2">Mountain Adventures</h3>
//           <p className="text-sm text-gray-200">
//             Experience the thrill of Himalayan treks and breathtaking landscapes with our guided tours
//           </p>
//         </div>
//       </div>

//       {/* Hover Effect Border */}
//       <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/30 transition-all duration-500 pointer-events-none" />
//     </div>
//   );
// };

// const TrendingGroupHolidaysSection: React.FC = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === carouselDestinations.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === 0 ? carouselDestinations.length - 1 : prevIndex - 1
//     );
//   };

//   return (
//     <section className="py-6 md:py-6 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header with Wider Carousel Left & Content Right */}
//         <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12 md:mb-16">
          
//           {/* Left Side - Wider Carousel */}
//           <div className="flex-1 max-w-2xl lg:max-w-2xl xl:max-w-3xl w-full">
//             <div className="relative rounded-3xl overflow-hidden shadow-2xl">
//               {/* Main Carousel Image */}
//               <div className="relative h-72 sm:h-80 md:h-96 lg:h-[500px] w-full">
//                 <img
//                   src={carouselDestinations[currentIndex].image}
//                   alt={carouselDestinations[currentIndex].name}
//                   className="w-full h-full object-cover"
//                 />
                
//                 {/* Gradient Overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
//                 {/* Floating Card 1 */}
//                 <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg max-w-xs">
//                   <div className="flex items-center gap-3">
//                     <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
//                       <Users className="h-6 w-6 text-green-600" />
//                     </div>
//                     <div>
//                       <div className="font-bold text-gray-900">Premium Tours</div>
//                       <div className="text-sm text-gray-600">Luxury Experiences</div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Floating Card 2 */}
//                 <div className="absolute bottom-24 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg max-w-xs">
//                   <div className="flex items-center gap-3">
//                     <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
//                       <MapPin className="h-6 w-6 text-blue-600" />
//                     </div>
//                     <div>
//                       <div className="font-bold text-gray-900">Global Reach</div>
//                       <div className="text-sm text-gray-600">60+ Countries</div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Destination Info */}
//                 <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
//                   <div className="flex items-center justify-between mb-4">
//                     <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold text-white ${
//                       carouselDestinations[currentIndex].badge === "Alpine" ? "bg-blue-500" :
//                       carouselDestinations[currentIndex].badge === "Exotic" ? "bg-orange-500" :
//                       carouselDestinations[currentIndex].badge === "Romantic" ? "bg-pink-500" :
//                       carouselDestinations[currentIndex].badge === "Urban" ? "bg-gray-600" :
//                       carouselDestinations[currentIndex].badge === "Classic" ? "bg-purple-500" :
//                       "bg-amber-500"
//                     }`}>
//                       {carouselDestinations[currentIndex].badge}
//                     </span>
//                     <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
//                       <Star className="h-4 w-4 text-yellow-400 fill-current" />
//                       <span className="text-sm font-semibold">{carouselDestinations[currentIndex].rating}</span>
//                     </div>
//                   </div>
                  
//                   <h3 className="text-2xl md:text-3xl font-bold mb-3">{carouselDestinations[currentIndex].name}</h3>
                  
//                   <p className="text-lg text-gray-200 max-w-2xl">
//                     {carouselDestinations[currentIndex].description}
//                   </p>
//                 </div>
//               </div>

//               {/* Navigation Arrows */}
//               <div className="absolute top-1/2 left-6 right-6 flex items-center justify-between transform -translate-y-1/2 z-10">
//                 <button
//                   onClick={prevSlide}
//                   className="bg-white/90 hover:bg-white text-gray-800 hover:text-blue-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110"
//                 >
//                   <ChevronLeft className="h-6 w-6" />
//                 </button>
                
//                 <button
//                   onClick={nextSlide}
//                   className="bg-white/90 hover:bg-white text-gray-800 hover:text-blue-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110"
//                 >
//                   <ChevronRight className="h-6 w-6" />
//                 </button>
//               </div>

//               {/* Dot Indicators */}
//               <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-3 z-10">
//                 {carouselDestinations.map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setCurrentIndex(index)}
//                     className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                       index === currentIndex ? 'bg-white w-8' : 'bg-white/50'
//                     }`}
//                   />
//                 ))}
//               </div>

//               {/* Progress Indicator */}
//               <div className="absolute top-6 right-6 z-10">
//                 <div className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-base font-medium">
//                   {currentIndex + 1} / {carouselDestinations.length}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Side - Text Content with Image to the right of Stats & Features */}
//           <div className="flex-1 max-w-xl">
//             <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
//               <Star className="h-4 w-4" />
//               Global Destinations
//             </div>
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//               World Class{" "}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
//                 Travel Experiences
//               </span>
//             </h2>

//             <p className="text-lg text-gray-600 mb-6 leading-relaxed">
//               Explore the world's most breathtaking destinations with our premium travel packages. From alpine adventures to tropical paradises.
//             </p>
            
//             {/* Content with Image on Right */}
//             <div className="flex flex-col lg:flex-row gap-6 mb-4">
//               {/* Left Side - Stats & Features */}
//               <div className="flex-1">
//                 {/* Stats Row */}
//                 <div className="flex flex-wrap gap-6 mb-4">
//                   <div className="text-center">
//                     <div className="text-2xl font-bold text-blue-600">1M+</div>
//                     <div className="text-sm text-gray-600">Travelers</div>
//                   </div>
//                   <div className="text-center">
//                     <div className="text-2xl font-bold text-blue-600">60+</div>
//                     <div className="text-sm text-gray-600">Countries</div>
//                   </div>
//                   <div className="text-center">
//                     <div className="text-2xl font-bold text-blue-600">99%</div>
//                     <div className="text-sm text-gray-600">Satisfaction</div>
//                   </div>
//                 </div>

//                 {/* Features */}
//                 <div className="space-y-2">
//                   <div className="flex items-center gap-3">
//                     <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
//                       <Star className="h-4 w-4 text-green-600" />
//                     </div>
//                     <span className="text-sm text-gray-600">Premium Accommodation</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
//                       <Users className="h-4 w-4 text-blue-600" />
//                     </div>
//                     <span className="text-sm text-gray-600">Expert Local Guides</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
//                       <MapPin className="h-4 w-4 text-purple-600" />
//                     </div>
//                     <span className="text-sm text-gray-600">Curated Itineraries</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Right Side - Image with increased size */}
//               <div className="flex-1">
//                 <div className="relative rounded-2xl overflow-hidden shadow-lg h-full min-h-[280px] lg:min-h-[320px]">
//                   <img
//                     src="https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=1200"
//                     alt="Happy travelers exploring destination"
//                     className="w-full h-full object-cover"
//                   />
//                   <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
//                     <span className="text-xs font-bold text-gray-800">Featured Destination</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* CTA Button aligned with image bottom */}
//             <div className="flex justify-start lg:justify-start mt-4">
//               <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
//                 Start Your Journey
//                 <ArrowRight className="h-5 w-5" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Destinations Grid with Auto Image Carousel */}
//         <div className="space-y-6 lg:space-y-8">
//           {/* First Row - 4 Cards */}
//           <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//             {trendingDestinations.slice(0, 4).map((dest, index) => (
//               <div
//                 key={dest.id}
//                 className="group cursor-pointer animate-fade-in-up"
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 <div className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white transform hover:-translate-y-2">
//                   {/* Auto Image Carousel */}
//                   <AutoImageCarousel images={dest.images} interval={3500} />
                  
//                   {/* Badge */}
//                   {dest.badge && (
//                     <div className="absolute top-4 left-4 z-10">
//                       <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white ${
//                         dest.badge === "Popular" ? "bg-orange-500" :
//                         dest.badge === "Hot" ? "bg-red-500" :
//                         dest.badge === "Trending" ? "bg-purple-500" :
//                         dest.badge === "New" ? "bg-green-500" :
//                         dest.badge === "Scenic" ? "bg-teal-500" :
//                         "bg-blue-500"
//                       }`}>
//                         {dest.badge}
//                       </span>
//                     </div>
//                   )}
                  
//                   {/* Rating */}
//                   <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
//                     <Star className="h-3 w-3 text-yellow-400 fill-current" />
//                     <span className="text-xs font-semibold text-white">{dest.rating}</span>
//                   </div>

//                   {/* Content */}
//                   <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 text-white z-10">
//                     {/* Destination Name */}
//                     <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-cyan-100 transition-colors duration-300">
//                       {dest.name}
//                     </h3>
                    
//                     {/* Stats */}
//                     <div className="space-y-2">
//                       <div className="flex items-center gap-3 text-sm">
//                         <div className="flex items-center gap-1">
//                           <MapPin className="h-4 w-4 text-cyan-300" />
//                           <span className="font-medium">{dest.tours} Tours</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Calendar className="h-4 w-4 text-cyan-300" />
//                           <span className="font-medium">{dest.departures} Departures</span>
//                         </div>
//                       </div>
                      
//                       {/* Guests Travelled */}
//                       <div className="flex items-center gap-2 pt-2 border-t border-white/20">
//                         <Users className="h-4 w-4 text-cyan-300" />
//                         <span className="text-sm font-semibold">
//                           {dest.guests.toLocaleString()}+ Guests Travelled
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Hover Effect Border */}
//                   <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-cyan-400/50 transition-all duration-500 pointer-events-none" />
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Second Row - 2 Cards + Video */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
//             {/* First 2 Cards */}
//             {trendingDestinations.slice(4, 6).map((dest, index) => (
//               <div
//                 key={dest.id}
//                 className="group cursor-pointer animate-fade-in-up"
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 <div className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white transform hover:-translate-y-2 h-full">
//                   {/* Auto Image Carousel */}
//                   <AutoImageCarousel images={dest.images} interval={3500} />
                  
//                   {/* Badge */}
//                   {dest.badge && (
//                     <div className="absolute top-4 left-4 z-10">
//                       <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white ${
//                         dest.badge === "Popular" ? "bg-orange-500" :
//                         dest.badge === "Hot" ? "bg-red-500" :
//                         dest.badge === "Trending" ? "bg-purple-500" :
//                         dest.badge === "New" ? "bg-green-500" :
//                         dest.badge === "Scenic" ? "bg-teal-500" :
//                         "bg-blue-500"
//                       }`}>
//                         {dest.badge}
//                       </span>
//                     </div>
//                   )}
                  
//                   {/* Rating */}
//                   <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
//                     <Star className="h-3 w-3 text-yellow-400 fill-current" />
//                     <span className="text-xs font-semibold text-white">{dest.rating}</span>
//                   </div>

//                   {/* Content */}
//                   <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 text-white z-10">
//                     <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-cyan-100 transition-colors duration-300">
//                       {dest.name}
//                     </h3>
                    
//                     <div className="space-y-2">
//                       <div className="flex items-center gap-3 text-sm">
//                         <div className="flex items-center gap-1">
//                           <MapPin className="h-4 w-4 text-cyan-300" />
//                           <span className="font-medium">{dest.tours} Tours</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Calendar className="h-4 w-4 text-cyan-300" />
//                           <span className="font-medium">{dest.departures} Departures</span>
//                         </div>
//                       </div>
                      
//                       <div className="flex items-center gap-2 pt-2 border-t border-white/20">
//                         <Users className="h-4 w-4 text-cyan-300" />
//                         <span className="text-sm font-semibold">
//                           {dest.guests.toLocaleString()}+ Guests Travelled
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Hover Effect Border */}
//                   <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-cyan-400/50 transition-all duration-500 pointer-events-none" />
//                 </div>
//               </div>
//             ))}

//             {/* Video Player in the remaining space */}
//             <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
//               <VideoPlayer />
//             </div>
//           </div>
//         </div>

//         {/* Bottom CTA Section */}
//         <div
//           className="text-center mt-12 md:mt-16 animate-fade-in-up"
//           style={{ animationDelay: "400ms" }}
//         >
//           <button className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//             <MapPin className="h-5 w-5" />
//             Explore Global Destinations
//             <Users className="h-5 w-5" />
//           </button>
//           <p className="mt-4 text-gray-600 text-sm">
//             Join 1,000,000+ travelers exploring the world with premium experiences
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

// export default TrendingGroupHolidaysSection;





// import React, { useState, useRef, useEffect } from "react";
// import { Users, MapPin, Calendar, Star, ArrowRight, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

// const carouselDestinations = [
//   {
//     id: 1,
//     name: "Swiss Alps",
//     description: "Majestic mountains & alpine adventures",
//     image: "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     badge: "Alpine"
//   },
//   {
//     id: 2,
//     name: "Bali Beaches",
//     description: "Tropical paradise & cultural wonders",
//     image: "https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     badge: "Exotic"
//   },
//   {
//     id: 3,
//     name: "Santorini",
//     description: "White buildings & stunning sunsets",
//     image: "https://images.pexels.com/photos/1028225/pexels-photo-1028225.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.7,
//     badge: "Romantic"
//   },
//   {
//     id: 4,
//     name: "Tokyo City",
//     description: "Modern culture & ancient traditions",
//     image: "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.8,
//     badge: "Urban"
//   },
//   {
//     id: 5,
//     name: "Paris",
//     description: "City of lights & romantic ambiance",
//     image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     badge: "Classic"
//   },
//   {
//     id: 6,
//     name: "Maldives",
//     description: "Crystal waters & overwater bungalows",
//     image: "https://images.pexels.com/photos/3293148/pexels-photo-3293148.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     rating: 4.9,
//     badge: "Luxury"
//   }
// ];

// const trendingDestinations = [
//   {
//     id: 1,
//     name: "Andaman",
//     tours: 5,
//     departures: 102,
//     guests: 28661,
//     images: [
//       "https://images.pexels.com/photos/7425765/pexels-photo-7425765.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/2525903/pexels-photo-2525903.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/2422461/pexels-photo-2422461.jpeg?auto=compress&cs=tinysrgb&w=1200"
//     ],
//     rating: 4.8,
//     badge: "Popular"
//   },
//   {
//     id: 2,
//     name: "Kashmir",
//     tours: 13,
//     departures: 62,
//     guests: 130171,
//     images: [
//       "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/358220/pexels-photo-358220.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1200"
//     ],
//     rating: 4.9,
//     badge: "Hot"
//   },
//   {
//     id: 3,
//     name: "Himachal",
//     tours: 14,
//     departures: 95,
//     guests: 212335,
//     images: [
//       "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/1365426/pexels-photo-1365426.jpeg?auto=compress&cs=tinysrgb&w=1200"
//     ],
//     rating: 4.7,
//     badge: "Trending"
//   },
//   {
//     id: 4,
//     name: "North East",
//     tours: 5,
//     departures: 57,
//     guests: 5125,
//     images: [
//       "https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/457881/pexels-photo-457881.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=1200"
//     ],
//     rating: 4.6,
//     badge: "New"
//   },
//   {
//     id: 5,
//     name: "Sikkim Darjeeling",
//     tours: 6,
//     departures: 24,
//     guests: 29217,
//     images: [
//       "https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/1366920/pexels-photo-1366920.jpeg?auto=compress&cs=tinysrgb&w=1200"
//     ],
//     rating: 4.8,
//     badge: "Scenic"
//   },
//   {
//     id: 6,
//     name: "Leh Ladakh",
//     tours: 0,
//     departures: 0,
//     guests: 22979,
//     images: [
//       "https://images.pexels.com/photos/672358/pexels-photo-672358.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/672357/pexels-photo-672357.jpeg?auto=compress&cs=tinysrgb&w=1200",
//       "https://images.pexels.com/photos/672359/pexels-photo-672359.jpeg?auto=compress&cs=tinysrgb&w=1200"
//     ],
//     rating: 4.9,
//     badge: "Adventure"
//   }
// ];

// // Auto Image Carousel Component for Destination Cards
// const AutoImageCarousel = ({ images, interval = 3000 }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentIndex((prevIndex) => 
//         prevIndex === images.length - 1 ? 0 : prevIndex + 1
//       );
//     }, interval);

//     return () => clearInterval(timer);
//   }, [images.length, interval]);

//   return (
//     <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 w-full overflow-hidden">
//       {images.map((image, index) => (
//         <div
//           key={index}
//           className={`absolute inset-0 transition-opacity duration-1000 ${
//             index === currentIndex ? 'opacity-100' : 'opacity-0'
//           }`}
//         >
//           <img
//             src={image}
//             alt={`Slide ${index + 1}`}
//             className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
//           />
//         </div>
//       ))}
      
//       {/* Gradient Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
      
//       {/* Shine Effect */}
//       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
//       {/* Dot Indicators */}
//       <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex items-center gap-1">
//         {images.map((_, index) => (
//           <div
//             key={index}
//             className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
//               index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// const VideoPlayer = () => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const videoRef = useRef<HTMLVideoElement>(null);

//   const togglePlay = () => {
//     if (videoRef.current) {
//       if (isPlaying) {
//         videoRef.current.pause();
//       } else {
//         videoRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   return (
//     <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-black group h-full">
//       {/* Video Player */}
//       <div className="relative h-full w-full">
//         <video
//           ref={videoRef}
//           src="https://assets.mixkit.co/videos/preview/mixkit-going-down-a-curved-highway-through-a-mountain-range-41576-large.mp4"
//           className="w-full h-full object-cover"
//           muted
//           loop
//           onPlay={() => setIsPlaying(true)}
//           onPause={() => setIsPlaying(false)}
//         />
        
//         {/* Gradient Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
//         {/* Play/Pause Button */}
//         <button
//           onClick={togglePlay}
//           className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-4 transition-all duration-300 group-hover:scale-110"
//         >
//           {isPlaying ? (
//             <Pause className="h-8 w-8 text-white" />
//           ) : (
//             <Play className="h-8 w-8 text-white" />
//           )}
//         </button>

//         {/* Video Info */}
//         <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
//           <h3 className="text-xl font-bold mb-2">Mountain Adventures</h3>
//           <p className="text-sm text-gray-200">
//             Experience the thrill of Himalayan treks and breathtaking landscapes with our guided tours
//           </p>
//         </div>
//       </div>

//       {/* Hover Effect Border */}
//       <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/30 transition-all duration-500 pointer-events-none" />
//     </div>
//   );
// };

// const TrendingGroupHolidaysSection: React.FC = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === carouselDestinations.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === 0 ? carouselDestinations.length - 1 : prevIndex - 1
//     );
//   };

//   return (
//     <section className="py-6 md:py-6 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header with Wider Carousel Left & Content Right */}
//         <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12 md:mb-16">
          
//           {/* Left Side - Wider Carousel */}
//           <div className="flex-1 max-w-2xl lg:max-w-2xl xl:max-w-3xl w-full">
//             <div className="relative rounded-3xl overflow-hidden shadow-2xl">
//               {/* Main Carousel Image */}
//               <div className="relative h-72 sm:h-80 md:h-96 lg:h-[500px] w-full">
//                 <img
//                   src={carouselDestinations[currentIndex].image}
//                   alt={carouselDestinations[currentIndex].name}
//                   className="w-full h-full object-cover"
//                 />
                
//                 {/* Gradient Overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
//                 {/* Floating Card 1 */}
//                 <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg max-w-xs">
//                   <div className="flex items-center gap-3">
//                     <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
//                       <Users className="h-6 w-6 text-green-600" />
//                     </div>
//                     <div>
//                       <div className="font-bold text-gray-900">Premium Tours</div>
//                       <div className="text-sm text-gray-600">Luxury Experiences</div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Floating Card 2 */}
//                 <div className="absolute bottom-24 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg max-w-xs">
//                   <div className="flex items-center gap-3">
//                     <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
//                       <MapPin className="h-6 w-6 text-blue-600" />
//                     </div>
//                     <div>
//                       <div className="font-bold text-gray-900">Global Reach</div>
//                       <div className="text-sm text-gray-600">60+ Countries</div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Destination Info */}
//                 <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
//                   <div className="flex items-center justify-between mb-4">
//                     <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold text-white ${
//                       carouselDestinations[currentIndex].badge === "Alpine" ? "bg-blue-500" :
//                       carouselDestinations[currentIndex].badge === "Exotic" ? "bg-orange-500" :
//                       carouselDestinations[currentIndex].badge === "Romantic" ? "bg-pink-500" :
//                       carouselDestinations[currentIndex].badge === "Urban" ? "bg-gray-600" :
//                       carouselDestinations[currentIndex].badge === "Classic" ? "bg-purple-500" :
//                       "bg-amber-500"
//                     }`}>
//                       {carouselDestinations[currentIndex].badge}
//                     </span>
//                     <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
//                       <Star className="h-4 w-4 text-yellow-400 fill-current" />
//                       <span className="text-sm font-semibold">{carouselDestinations[currentIndex].rating}</span>
//                     </div>
//                   </div>
                  
//                   <h3 className="text-2xl md:text-3xl font-bold mb-3">{carouselDestinations[currentIndex].name}</h3>
                  
//                   <p className="text-lg text-gray-200 max-w-2xl">
//                     {carouselDestinations[currentIndex].description}
//                   </p>
//                 </div>
//               </div>

//               {/* Navigation Arrows */}
//               <div className="absolute top-1/2 left-6 right-6 flex items-center justify-between transform -translate-y-1/2 z-10">
//                 <button
//                   onClick={prevSlide}
//                   className="bg-white/90 hover:bg-white text-gray-800 hover:text-blue-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110"
//                 >
//                   <ChevronLeft className="h-6 w-6" />
//                 </button>
                
//                 <button
//                   onClick={nextSlide}
//                   className="bg-white/90 hover:bg-white text-gray-800 hover:text-blue-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110"
//                 >
//                   <ChevronRight className="h-6 w-6" />
//                 </button>
//               </div>

//               {/* Dot Indicators */}
//               <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-3 z-10">
//                 {carouselDestinations.map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setCurrentIndex(index)}
//                     className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                       index === currentIndex ? 'bg-white w-8' : 'bg-white/50'
//                     }`}
//                   />
//                 ))}
//               </div>

//               {/* Progress Indicator */}
//               <div className="absolute top-6 right-6 z-10">
//                 <div className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-base font-medium">
//                   {currentIndex + 1} / {carouselDestinations.length}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Side - Text Content with Image to the right of Stats & Features */}
//           <div className="flex-1 max-w-xl">
//             <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
//               <Star className="h-4 w-4" />
//               Global Destinations
//             </div>
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//               World Class{" "}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
//                 Travel Experiences
//               </span>
//             </h2>

//             <p className="text-lg text-gray-600 mb-6 leading-relaxed">
//               Explore the world's most breathtaking destinations with our premium travel packages. From alpine adventures to tropical paradises.
//             </p>
            
//             {/* Content with Image on Right - Using flex for alignment */}
//             <div className="flex flex-col lg:flex-row gap-6">
//               {/* Left Side - Stats & Features with Button */}
//               <div className="flex-1 flex flex-col">
//                 {/* Stats Row */}
//                 <div className="flex flex-wrap gap-6 mb-4">
//                   <div className="text-center">
//                     <div className="text-2xl font-bold text-blue-600">1M+</div>
//                     <div className="text-sm text-gray-600">Travelers</div>
//                   </div>
//                   <div className="text-center">
//                     <div className="text-2xl font-bold text-blue-600">60+</div>
//                     <div className="text-sm text-gray-600">Countries</div>
//                   </div>
//                   <div className="text-center">
//                     <div className="text-2xl font-bold text-blue-600">99%</div>
//                     <div className="text-sm text-gray-600">Satisfaction</div>
//                   </div>
//                 </div>

//                 {/* Features */}
//                 <div className="space-y-2 mb-6">
//                   <div className="flex items-center gap-3">
//                     <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
//                       <Star className="h-4 w-4 text-green-600" />
//                     </div>
//                     <span className="text-sm text-gray-600">Premium Accommodation</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
//                       <Users className="h-4 w-4 text-blue-600" />
//                     </div>
//                     <span className="text-sm text-gray-600">Expert Local Guides</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
//                       <MapPin className="h-4 w-4 text-purple-600" />
//                     </div>
//                     <span className="text-sm text-gray-600">Curated Itineraries</span>
//                   </div>
//                 </div>

//                 {/* CTA Button - Now properly aligned */}
//                 <div className="mt-auto">
//                   <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl w-full lg:w-auto justify-center">
//                     Start Your Journey
//                     <ArrowRight className="h-5 w-5" />
//                   </button>
//                 </div>
//               </div>

//               {/* Right Side - Image with increased size */}
//               <div className="flex-1">
//                 <div className="relative rounded-2xl overflow-hidden shadow-lg h-full min-h-[280px] lg:min-h-[320px]">
//                   <img
//                     src="https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=1200"
//                     alt="Happy travelers exploring destination"
//                     className="w-full h-full object-cover"
//                   />
//                   <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
//                     <span className="text-xs font-bold text-gray-800">Featured Destination</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Destinations Grid with Auto Image Carousel */}
//         <div className="space-y-6 lg:space-y-8">
//           {/* First Row - 4 Cards */}
//           <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//             {trendingDestinations.slice(0, 4).map((dest, index) => (
//               <div
//                 key={dest.id}
//                 className="group cursor-pointer animate-fade-in-up"
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 <div className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white transform hover:-translate-y-2">
//                   {/* Auto Image Carousel */}
//                   <AutoImageCarousel images={dest.images} interval={3500} />
                  
//                   {/* Badge */}
//                   {dest.badge && (
//                     <div className="absolute top-4 left-4 z-10">
//                       <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white ${
//                         dest.badge === "Popular" ? "bg-orange-500" :
//                         dest.badge === "Hot" ? "bg-red-500" :
//                         dest.badge === "Trending" ? "bg-purple-500" :
//                         dest.badge === "New" ? "bg-green-500" :
//                         dest.badge === "Scenic" ? "bg-teal-500" :
//                         "bg-blue-500"
//                       }`}>
//                         {dest.badge}
//                       </span>
//                     </div>
//                   )}
                  
//                   {/* Rating */}
//                   <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
//                     <Star className="h-3 w-3 text-yellow-400 fill-current" />
//                     <span className="text-xs font-semibold text-white">{dest.rating}</span>
//                   </div>

//                   {/* Content */}
//                   <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 text-white z-10">
//                     {/* Destination Name */}
//                     <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-cyan-100 transition-colors duration-300">
//                       {dest.name}
//                     </h3>
                    
//                     {/* Stats */}
//                     <div className="space-y-2">
//                       <div className="flex items-center gap-3 text-sm">
//                         <div className="flex items-center gap-1">
//                           <MapPin className="h-4 w-4 text-cyan-300" />
//                           <span className="font-medium">{dest.tours} Tours</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Calendar className="h-4 w-4 text-cyan-300" />
//                           <span className="font-medium">{dest.departures} Departures</span>
//                         </div>
//                       </div>
                      
//                       {/* Guests Travelled */}
//                       <div className="flex items-center gap-2 pt-2 border-t border-white/20">
//                         <Users className="h-4 w-4 text-cyan-300" />
//                         <span className="text-sm font-semibold">
//                           {dest.guests.toLocaleString()}+ Guests Travelled
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Hover Effect Border */}
//                   <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-cyan-400/50 transition-all duration-500 pointer-events-none" />
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Second Row - 2 Cards + Video */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
//             {/* First 2 Cards */}
//             {trendingDestinations.slice(4, 6).map((dest, index) => (
//               <div
//                 key={dest.id}
//                 className="group cursor-pointer animate-fade-in-up"
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 <div className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white transform hover:-translate-y-2 h-full">
//                   {/* Auto Image Carousel */}
//                   <AutoImageCarousel images={dest.images} interval={3500} />
                  
//                   {/* Badge */}
//                   {dest.badge && (
//                     <div className="absolute top-4 left-4 z-10">
//                       <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white ${
//                         dest.badge === "Popular" ? "bg-orange-500" :
//                         dest.badge === "Hot" ? "bg-red-500" :
//                         dest.badge === "Trending" ? "bg-purple-500" :
//                         dest.badge === "New" ? "bg-green-500" :
//                         dest.badge === "Scenic" ? "bg-teal-500" :
//                         "bg-blue-500"
//                       }`}>
//                         {dest.badge}
//                       </span>
//                     </div>
//                   )}
                  
//                   {/* Rating */}
//                   <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
//                     <Star className="h-3 w-3 text-yellow-400 fill-current" />
//                     <span className="text-xs font-semibold text-white">{dest.rating}</span>
//                   </div>

//                   {/* Content */}
//                   <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 text-white z-10">
//                     <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-cyan-100 transition-colors duration-300">
//                       {dest.name}
//                     </h3>
                    
//                     <div className="space-y-2">
//                       <div className="flex items-center gap-3 text-sm">
//                         <div className="flex items-center gap-1">
//                           <MapPin className="h-4 w-4 text-cyan-300" />
//                           <span className="font-medium">{dest.tours} Tours</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Calendar className="h-4 w-4 text-cyan-300" />
//                           <span className="font-medium">{dest.departures} Departures</span>
//                         </div>
//                       </div>
                      
//                       <div className="flex items-center gap-2 pt-2 border-t border-white/20">
//                         <Users className="h-4 w-4 text-cyan-300" />
//                         <span className="text-sm font-semibold">
//                           {dest.guests.toLocaleString()}+ Guests Travelled
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Hover Effect Border */}
//                   <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-cyan-400/50 transition-all duration-500 pointer-events-none" />
//                 </div>
//               </div>
//             ))}

//             {/* Video Player in the remaining space */}
//             <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
//               <VideoPlayer />
//             </div>
//           </div>
//         </div>

//         {/* Bottom CTA Section */}
//         <div
//           className="text-center mt-12 md:mt-16 animate-fade-in-up"
//           style={{ animationDelay: "400ms" }}
//         >
//           <button className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//             <MapPin className="h-5 w-5" />
//             Explore Global Destinations
//             <Users className="h-5 w-5" />
//           </button>
//           <p className="mt-4 text-gray-600 text-sm">
//             Join 1,000,000+ travelers exploring the world with premium experiences
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

// export default TrendingGroupHolidaysSection;






import React, { useState, useRef, useEffect } from "react";
import { Users, MapPin, Calendar, Star, ArrowRight, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import featuredDestinationImage from "@/assets/bag-removebg-preview.png"; // Update this path to match your actual file
import "./DomesticToursSection.css";



const carouselDestinations = [
  {
    id: 1,
    name: "Swiss Alps",
    description: "Majestic mountains & alpine adventures",
    image: "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.9,
    badge: "Alpine"
  },
  {
    id: 2,
    name: "Bali Beaches",
    description: "Tropical paradise & cultural wonders",
    image: "https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.8,
    badge: "Exotic"
  },
  {
    id: 3,
    name: "Santorini",
    description: "White buildings & stunning sunsets",
    image: "https://images.pexels.com/photos/1028225/pexels-photo-1028225.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.7,
    badge: "Romantic"
  },
  {
    id: 4,
    name: "Tokyo City",
    description: "Modern culture & ancient traditions",
    image: "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.8,
    badge: "Urban"
  },
  {
    id: 5,
    name: "Paris",
    description: "City of lights & romantic ambiance",
    image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.9,
    badge: "Classic"
  },
  {
    id: 6,
    name: "Maldives",
    description: "Crystal waters & overwater bungalows",
    image: "https://images.pexels.com/photos/3293148/pexels-photo-3293148.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.9,
    badge: "Luxury"
  }
];

const trendingDestinations = [
  {
    id: 1,
    name: "Andaman",
    tours: 5,
    departures: 102,
    guests: 28661,
    images: [
      "https://images.pexels.com/photos/7425765/pexels-photo-7425765.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/2525903/pexels-photo-2525903.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/2422461/pexels-photo-2422461.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    rating: 4.8,
    badge: "Popular"
  },
  {
    id: 2,
    name: "Kashmir",
    tours: 13,
    departures: 62,
    guests: 130171,
    images: [
      "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/358220/pexels-photo-358220.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    rating: 4.9,
    badge: "Hot"
  },
  {
    id: 3,
    name: "Himachal",
    tours: 14,
    departures: 95,
    guests: 212335,
    images: [
      "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1365426/pexels-photo-1365426.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    rating: 4.7,
    badge: "Trending"
  },
  {
    id: 4,
    name: "North East",
    tours: 5,
    departures: 57,
    guests: 5125,
    images: [
      "https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/457881/pexels-photo-457881.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    rating: 4.6,
    badge: "New"
  },
  {
    id: 5,
    name: "Sikkim Darjeeling",
    tours: 6,
    departures: 24,
    guests: 29217,
    images: [
      "https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1366920/pexels-photo-1366920.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    rating: 4.8,
    badge: "Scenic"
  },
  {
    id: 6,
    name: "Leh Ladakh",
    tours: 0,
    departures: 0,
    guests: 22979,
    images: [
      "https://images.pexels.com/photos/672358/pexels-photo-672358.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/672357/pexels-photo-672357.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/672359/pexels-photo-672359.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    rating: 4.9,
    badge: "Adventure"
  }
];

// Auto Image Carousel Component for Destination Cards
const AutoImageCarousel = ({ images, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 w-full overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
        </div>
      ))}
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
      
      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
      {/* Dot Indicators */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex items-center gap-1">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-black group h-full">
      {/* Video Player */}
      <div className="relative h-full w-full">
        <video
          ref={videoRef}
          src="https://assets.mixkit.co/videos/preview/mixkit-going-down-a-curved-highway-through-a-mountain-range-41576-large.mp4"
          className="w-full h-full object-cover"
          muted
          loop
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-4 transition-all duration-300 group-hover:scale-110"
        >
          {isPlaying ? (
            <Pause className="h-8 w-8 text-white" />
          ) : (
            <Play className="h-8 w-8 text-white" />
          )}
        </button>

        {/* Video Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-xl font-bold mb-2">Mountain Adventures</h3>
          <p className="text-sm text-gray-200">
            Experience the thrill of Himalayan treks and breathtaking landscapes with our guided tours
          </p>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/30 transition-all duration-500 pointer-events-none" />
    </div>
  );
};

const TrendingGroupHolidaysSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === carouselDestinations.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? carouselDestinations.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-6 md:py-6 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Wider Carousel Left & Content Right */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12 md:mb-16">
          
          {/* Left Side - Wider Carousel */}
          <div className="flex-1 max-w-2xl lg:max-w-2xl xl:max-w-3xl w-full">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              {/* Main Carousel Image */}
              <div className="relative h-72 sm:h-80 md:h-96 lg:h-[500px] w-full">
                <img
                  src={carouselDestinations[currentIndex].image}
                  alt={carouselDestinations[currentIndex].name}
                  className="w-full h-full object-cover"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                {/* Floating Card 1 */}
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg max-w-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Premium Tours</div>
                      <div className="text-sm text-gray-600">Luxury Experiences</div>
                    </div>
                  </div>
                </div>

                {/* Floating Card 2 */}
                <div className="absolute bottom-24 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg max-w-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Global Reach</div>
                      <div className="text-sm text-gray-600">60+ Countries</div>
                    </div>
                  </div>
                </div>

                {/* Destination Info */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold text-white ${
                      carouselDestinations[currentIndex].badge === "Alpine" ? "bg-blue-500" :
                      carouselDestinations[currentIndex].badge === "Exotic" ? "bg-orange-500" :
                      carouselDestinations[currentIndex].badge === "Romantic" ? "bg-pink-500" :
                      carouselDestinations[currentIndex].badge === "Urban" ? "bg-gray-600" :
                      carouselDestinations[currentIndex].badge === "Classic" ? "bg-purple-500" :
                      "bg-amber-500"
                    }`}>
                      {carouselDestinations[currentIndex].badge}
                    </span>
                    <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-semibold">{carouselDestinations[currentIndex].rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">{carouselDestinations[currentIndex].name}</h3>
                  
                  <p className="text-lg text-gray-200 max-w-2xl">
                    {carouselDestinations[currentIndex].description}
                  </p>
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="absolute top-1/2 left-6 right-6 flex items-center justify-between transform -translate-y-1/2 z-10">
                <button
                  onClick={prevSlide}
                  className="bg-white/90 hover:bg-white text-gray-800 hover:text-blue-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                
                <button
                  onClick={nextSlide}
                  className="bg-white/90 hover:bg-white text-gray-800 hover:text-blue-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>

              {/* Dot Indicators */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-3 z-10">
                {carouselDestinations.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'bg-white w-8' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>

              {/* Progress Indicator */}
              <div className="absolute top-6 right-6 z-10">
                <div className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-base font-medium">
                  {currentIndex + 1} / {carouselDestinations.length}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Text Content with Image to the right of Stats & Features */}
          <div className="flex-1 max-w-xl">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Star className="h-4 w-4" />
              Global Destinations
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              World Class{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                Travel Experiences
              </span>
            </h2>

            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Explore the world's most breathtaking destinations with our premium travel packages. From alpine adventures to tropical paradises.
            </p>
            
            {/* Content with Image on Right - Using flex for alignment */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left Side - Stats & Features with Button */}
              <div className="flex-1 flex flex-col">
                {/* Stats Row */}
                <div className="flex flex-wrap gap-6 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">1M+</div>
                    <div className="text-sm text-gray-600">Travelers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">60+</div>
                    <div className="text-sm text-gray-600">Countries</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">99%</div>
                    <div className="text-sm text-gray-600">Satisfaction</div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Star className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-sm text-gray-600">Premium Accommodation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-sm text-gray-600">Expert Local Guides</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <MapPin className="h-4 w-4 text-purple-600" />
                    </div>
                    <span className="text-sm text-gray-600">Curated Itineraries</span>
                  </div>
                </div>

                {/* CTA Button - Now properly aligned */}
                <div className="mt-auto">
                  <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl w-full lg:w-auto justify-center">
                    Start Your Journey
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Right Side - Image with increased size */}
              <div className="flex-1">
                <div className="relative  overflow-hidden  h-full min-h-[280px] lg:min-h-[320px]">
                  <img
                    src={featuredDestinationImage}
                    alt="Happy travelers exploring destination"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-xs font-bold text-gray-800">Featured Destination</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Destinations Grid with Auto Image Carousel */}
        <div className="space-y-6 lg:space-y-8">
          {/* First Row - 4 Cards */}
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {trendingDestinations.slice(0, 4).map((dest, index) => (
              <div
                key={dest.id}
                className="group cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white transform hover:-translate-y-2">
                  {/* Auto Image Carousel */}
                  <AutoImageCarousel images={dest.images} interval={3500} />
                  
                  {/* Badge */}
                  {dest.badge && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white ${
                        dest.badge === "Popular" ? "bg-orange-500" :
                        dest.badge === "Hot" ? "bg-red-500" :
                        dest.badge === "Trending" ? "bg-purple-500" :
                        dest.badge === "New" ? "bg-green-500" :
                        dest.badge === "Scenic" ? "bg-teal-500" :
                        "bg-blue-500"
                      }`}>
                        {dest.badge}
                      </span>
                    </div>
                  )}
                  
                  {/* Rating */}
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span className="text-xs font-semibold text-white">{dest.rating}</span>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 text-white z-10">
                    {/* Destination Name */}
                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-cyan-100 transition-colors duration-300">
                      {dest.name}
                    </h3>
                    
                    {/* Stats */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-cyan-300" />
                          <span className="font-medium">{dest.tours} Tours</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-cyan-300" />
                          <span className="font-medium">{dest.departures} Departures</span>
                        </div>
                      </div>
                      
                      {/* Guests Travelled */}
                      <div className="flex items-center gap-2 pt-2 border-t border-white/20">
                        <Users className="h-4 w-4 text-cyan-300" />
                        <span className="text-sm font-semibold">
                          {dest.guests.toLocaleString()}+ Guests Travelled
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-cyan-400/50 transition-all duration-500 pointer-events-none" />
                </div>
              </div>
            ))}
          </div>

          {/* Second Row - 2 Cards + Video */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* First 2 Cards */}
            {trendingDestinations.slice(4, 6).map((dest, index) => (
              <div
                key={dest.id}
                className="group cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white transform hover:-translate-y-2 h-full">
                  {/* Auto Image Carousel */}
                  <AutoImageCarousel images={dest.images} interval={3500} />
                  
                  {/* Badge */}
                  {dest.badge && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white ${
                        dest.badge === "Popular" ? "bg-orange-500" :
                        dest.badge === "Hot" ? "bg-red-500" :
                        dest.badge === "Trending" ? "bg-purple-500" :
                        dest.badge === "New" ? "bg-green-500" :
                        dest.badge === "Scenic" ? "bg-teal-500" :
                        "bg-blue-500"
                      }`}>
                        {dest.badge}
                      </span>
                    </div>
                  )}
                  
                  {/* Rating */}
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span className="text-xs font-semibold text-white">{dest.rating}</span>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 text-white z-10">
                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-cyan-100 transition-colors duration-300">
                      {dest.name}
                    </h3>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-cyan-300" />
                          <span className="font-medium">{dest.tours} Tours</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-cyan-300" />
                          <span className="font-medium">{dest.departures} Departures</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 pt-2 border-t border-white/20">
                        <Users className="h-4 w-4 text-cyan-300" />
                        <span className="text-sm font-semibold">
                          {dest.guests.toLocaleString()}+ Guests Travelled
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-cyan-400/50 transition-all duration-500 pointer-events-none" />
                </div>
              </div>
            ))}

            {/* Video Player in the remaining space */}
            <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              <VideoPlayer />
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div
          className="text-center mt-12 md:mt-16 animate-fade-in-up"
          style={{ animationDelay: "400ms" }}
        >
          <button className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <MapPin className="h-5 w-5" />
            Explore Global Destinations
            <Users className="h-5 w-5" />
          </button>
          <p className="mt-4 text-gray-600 text-sm">
            Join 1,000,000+ travelers exploring the world with premium experiences
          </p>
        </div>
      </div>

     
     
    </section>
  );
};

export default TrendingGroupHolidaysSection;