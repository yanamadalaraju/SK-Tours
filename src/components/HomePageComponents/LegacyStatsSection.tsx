// import { Smile, Users, ThumbsUp, MapPin, Flag } from "lucide-react";

// const stats = [
//   {
//     id: 1,
//     icon: Smile,
//     value: "10,00,000+",
//     label: "Happy Guests",
//   },
//   {
//     id: 2,
//     icon: Users,
//     value: "41",
//     label: "Years of Experience",
//   },
//   {
//     id: 3,
//     icon: ThumbsUp,
//     value: "2,00,000+",
//     label: "Tours Completed",
//   },
//   {
//     id: 4,
//     icon: MapPin,
//     value: "3000+",
//     label: "Tour Destinations",
//   },
//   {
//     id: 5,
//     icon: Flag,
//     value: "400+",
//     label: "Tour Leaders",
//   },
// ];

// const LegacyStatsSection = () => {
//   return (
//     <section className="py-10 md:py-14 bg-white">
//       <div className="container mx-auto px-4">
//         {/* Heading */}
//         <div className="text-center mb-8 md:mb-10">
//           <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900">
//             Our Legacy of Unforgettable Journeys
//           </h2>
//           <p className="mt-2 text-sm md:text-base text-gray-600">
//             Trusted by thousands, crafting memories for a lifetime.
//           </p>
//         </div>

//         {/* Stats row */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 max-w-5xl mx-auto text-center">
//           {stats.map((item) => {
//             const Icon = item.icon;
//             return (
//               <div
//                 key={item.id}
//                 className="flex flex-col items-center gap-2 md:gap-3"
//               >
//                 <div className="flex items-center justify-center mb-1">
//                   <Icon className="w-8 h-8 md:w-9 md:h-9 text-gray-800" />
//                   {/* small red accent stars / dot */}
//                   <span className="ml-1 text-red-500 text-lg leading-none">
//                     ★
//                   </span>
//                 </div>
//                 <p className="text-lg md:text-2xl font-semibold text-gray-900">
//                   {item.value}
//                 </p>
//                 <p className="text-xs md:text-sm text-gray-600">
//                   {item.label}
//                 </p>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default LegacyStatsSection;




import { Smile, Users, ThumbsUp, MapPin, Flag, Sparkles, Award } from "lucide-react";

const stats = [
  {
    id: 1,
    icon: Smile,
    value: "10,00,000+",
    label: "Happy Guests",
    color: "from-blue-400 to-cyan-500",
    delay: "0"
  },
  {
    id: 2,
    icon: Users,
    value: "41",
    label: "Years of Experience",
    color: "from-blue-500 to-indigo-600",
    delay: "100"
  },
  {
    id: 3,
    icon: ThumbsUp,
    value: "2,00,000+",
    label: "Tours Completed",
    color: "from-emerald-500 to-green-600",
    delay: "200"
  },
  {
    id: 4,
    icon: MapPin,
    value: "3000+",
    label: "Tour Destinations",
    color: "from-purple-500 to-violet-600",
    delay: "300"
  },
  {
    id: 5,
    icon: Flag,
    value: "400+",
    label: "Tour Leaders",
    color: "from-orange-500 to-red-500",
    delay: "400"
  },
];

const LegacyStatsSection = () => {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-sky-200 via-sky-200 to-sky-200 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-cyan-300 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-white/20 text-gray-700 px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-lg">
            <Sparkles className="w-4 h-4 text-blue-600" />
            Trusted Since 1983
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Legacy of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F1F5C] to-[#1F3F93]">
              Unforgettable Journeys
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trusted by millions, crafting memories for a lifetime with excellence and dedication.
          </p>
        </div>

        {/* Stats Container with Same Gradient Background */}
        <div 
          className="rounded-2xl shadow-2xl p-8 mb-12 relative overflow-hidden"
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
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8 max-w-6xl mx-auto">
              {stats.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className="group flex flex-col items-center text-center p-6 rounded-2xl bg-white/90 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  >
                    {/* Icon Container */}
                    <div className={`relative mb-4 p-4 rounded-2xl bg-gradient-to-r ${item.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                      
                      {/* Floating Effect */}
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-pulse"></div>
                      </div>
                    </div>

                    {/* Value */}
                    <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 group-hover:scale-105 transition-transform duration-300">
                      {item.value}
                    </p>

                    {/* Label */}
                    <p className="text-sm text-gray-600 font-medium leading-tight group-hover:text-gray-800 transition-colors duration-300">
                      {item.label}
                    </p>

                    {/* Bottom accent line */}
                    <div className={`w-0 h-1 bg-gradient-to-r ${item.color} rounded-full mt-4 group-hover:w-12 transition-all duration-500`}></div>
                  </div>
                );
              })}
            </div>

            {/* Trust Badge */}
            <div className="text-center mt-12">
              <div className="inline-flex items-center gap-4 bg-white/90 backdrop-blur-sm border border-white/20 rounded-2xl px-8 py-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
                    <span className="font-bold text-gray-900">98%</span>
                  </div>
                  <span className="text-gray-700 font-medium">Customer Satisfaction Rate</span>
                </div>
                <div className="w-px h-6 bg-gray-300"></div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>Verified by 50K+ Reviews</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <button className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 border border-white/20">
            <Sparkles className="h-5 w-5" />
            Join Our Travel Family
            <Award className="h-5 w-5" />
          </button>
          <p className="mt-4 text-gray-600 text-sm">
            Experience the difference that 41 years of excellence makes
          </p>
        </div>
      </div>
    </section>
  );
};

export default LegacyStatsSection;