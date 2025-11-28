// import React, { useRef } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// type Destination = {
//   id: number;
//   name: string;
//   image: string;
// };

// const topDestinations: Destination[] = [
//   {
//     id: 1,
//     name: "Rajasthan",
//     image:
//       "https://images.pexels.com/photos/163166/hawa-mahal-palace-jaipur-rajasthan-163166.jpeg?auto=compress&cs=tinysrgb&w=1200",
//   },
//   {
//     id: 2,
//     name: "Kerala",
//     image:
//       "https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg?auto=compress&cs=tinysrgb&w=1200",
//   },
//   {
//     id: 3,
//     name: "Himachal",
//     image:
//       "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1200",
//   },
//   {
//     id: 4,
//     name: "Dubai And Middleeast",
//     image:
//       "https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=1200",
//   },
//   {
//     id: 5,
//     name: "South East Asia",
//     image:
//       "https://images.pexels.com/photos/208745/pexels-photo-208745.jpeg?auto=compress&cs=tinysrgb&w=1200",
//   },
// ];

// const SeasonsTopDestinationsSection: React.FC = () => {
//   const scrollRef = useRef<HTMLDivElement | null>(null);

//   const scroll = (direction: "left" | "right") => {
//     if (!scrollRef.current) return;
//     const cardWidth = 220; // approximate card width incl. gap
//     scrollRef.current.scrollBy({
//       left: direction === "left" ? -cardWidth : cardWidth,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <section className="py-8 md:py-10 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="bg-[#f6f7f9] rounded-3xl shadow-[0_14px_40px_rgba(0,0,0,0.08)] px-5 md:px-8 py-6 md:py-8 flex flex-col md:flex-row gap-6 md:gap-8 items-stretch">
//           {/* Left text block */}
//           <div className="md:w-1/3 flex items-center">
//             <div>
//               <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-tight">
//                 Season&apos;s Top <br /> Destinations
//               </h2>
//               <p className="mt-3 text-sm md:text-base text-gray-600 max-w-xs">
//                 Handpicked favourites for this season – from snowy escapes to tropical
//                 getaways.
//               </p>
//             </div>
//           </div>

//           {/* Right slider block */}
//           <div className="md:w-2/3 relative">
//             {/* Cards row */}
//             <div
//               ref={scrollRef}
//               className="flex gap-4 overflow-x-auto no-scrollbar pb-2"
//             >
//               {topDestinations.map((dest) => (
//                 <div
//                   key={dest.id}
//                   className="relative min-w-[180px] max-w-[200px] rounded-3xl overflow-hidden shadow-md flex-shrink-0 bg-black"
//                 >
//                   <div className="h-44 w-full">
//                     <img
//                       src={dest.image}
//                       alt={dest.name}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>

//                   {/* gradient for title */}
//                   <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/85 via-black/50 to-transparent pointer-events-none" />

//                   <div className="absolute bottom-3 left-0 right-0 px-3">
//                     <p className="text-sm md:text-base font-semibold text-white drop-shadow">
//                       {dest.name}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Left arrow */}
//             <button
//               onClick={() => scroll("left")}
//               className="hidden sm:flex absolute left-[-14px] top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-md items-center justify-center hover:bg-gray-50 transition"
//             >
//               <ChevronLeft className="w-5 h-5 text-gray-700" />
//             </button>

//             {/* Right arrow */}
//             <button
//               onClick={() => scroll("right")}
//               className="hidden sm:flex absolute right-[-14px] top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-md items-center justify-center hover:bg-gray-50 transition"
//             >
//               <ChevronRight className="w-5 h-5 text-gray-700" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SeasonsTopDestinationsSection;





import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, Star, Sparkles } from "lucide-react";

type Destination = {
  id: number;
  name: string;
  image: string;
  rating?: number;
  travelers?: number;
  tag?: string;
};

const topDestinations: Destination[] = [
  {
    id: 1,
    name: "Rajasthan",
    image:
      "https://images.pexels.com/photos/163166/hawa-mahal-palace-jaipur-rajasthan-163166.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.9,
    travelers: 2450,
    tag: "Cultural"
  },
  {
    id: 2,
    name: "Kerala",
    image:
      "https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.8,
    travelers: 3120,
    tag: "Backwaters"
  },
  {
    id: 3,
    name: "Himachal",
    image:
      "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.9,
    travelers: 1890,
    tag: "Mountains"
  },
  {
    id: 4,
    name: "Dubai & Middle East",
    image:
      "https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.7,
    travelers: 4250,
    tag: "Luxury"
  },
  {
    id: 5,
    name: "South East Asia",
    image:
      "https://images.pexels.com/photos/208745/pexels-photo-208745.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.8,
    travelers: 3670,
    tag: "Tropical"
  },
  {
    id: 6,
    name: "Switzerland",
    image:
      "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.9,
    travelers: 2780,
    tag: "Alpine"
  },
];

const SeasonsTopDestinationsSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = 280; // increased card width
    scrollRef.current.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-slate-50 to-blue-50/20">
      <div className="container mx-auto px-4">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4 shadow-lg">
            <Sparkles className="w-4 h-4" />
            Trending Now
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Season's <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Top Destinations</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Handpicked favorites for this season – from snowy alpine escapes to tropical beach getaways
          </p>
        </div>

        {/* Enhanced Card Container */}
        <div className="relative group">
          {/* Cards Row */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-8 px-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {topDestinations.map((dest) => (
              <div
                key={dest.id}
                className="relative min-w-[260px] max-w-[280px] rounded-3xl overflow-hidden shadow-2xl flex-shrink-0 bg-white transform transition-all duration-500 hover:scale-105 hover:shadow-3xl cursor-pointer"
                onMouseEnter={() => setActiveCard(dest.id)}
                onMouseLeave={() => setActiveCard(null)}
              >
                {/* Image Container */}
                <div className="relative h-64 w-full overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Tag Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white bg-black/60 backdrop-blur-sm border border-white/20">
                      {dest.tag}
                    </span>
                  </div>
                  
                  {/* Rating */}
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs font-semibold text-white">{dest.rating}</span>
                  </div>

                  {/* Travelers Count */}
                  <div className="absolute top-12 right-4 z-10">
                    <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20">
                      <span className="text-xs font-semibold text-white">{dest.travelers}+</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-cyan-300" />
                    <p className="text-lg font-bold text-white drop-shadow-2xl">
                      {dest.name}
                    </p>
                  </div>
                  
                  {/* Hover Button */}
                  <div className={`transform transition-all duration-300 ${
                    activeCard === dest.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}>
                    <button className="w-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold py-3 px-4 rounded-xl hover:bg-white/30 transition-all duration-300 hover:scale-105">
                      Explore Now
                    </button>
                  </div>
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </div>
            ))}
          </div>

          {/* Enhanced Navigation Arrows */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-md shadow-2xl border border-gray-200 flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 group/arrow opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700 group-hover/arrow:text-blue-600 transition-colors" />
          </button>

          <button
            onClick={() => scroll("right")}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-md shadow-2xl border border-gray-200 flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 group/arrow opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-6 h-6 text-gray-700 group-hover/arrow:text-blue-600 transition-colors" />
          </button>
        </div>

        {/* Enhanced Bottom CTA */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold px-8 py-4 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-3xl">
            <Sparkles className="w-5 h-5" />
            View All Destinations
            <ChevronRight className="w-5 h-5" />
          </button>
          <p className="mt-4 text-gray-600 text-sm">
            Join 50,000+ travelers discovering amazing destinations
          </p>
        </div>
      </div>

      {/* Custom Scrollbar Hide */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default SeasonsTopDestinationsSection;