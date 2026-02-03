// import {
//   Users,
//   Globe,
//   Shield,
//   Package,
//   Phone,
//   Handshake,
//   Car,
//   UsersRound,
//   FileText,
//   Heart
// } from "lucide-react";

// const reasons = [
//   {
//     id: 1,
//     icon: Users,
//     title: "Personalized Travel Planning",
//     description: "Every itinerary is customized to match your interests, budget, and travel style — no one-size-fits-all packages.",
//   },
//   {
//     id: 2,
//     icon: Globe,
//     title: "Expert Guidance for India & International Tours",
//     description: "Our experienced travel specialists help you plan smooth journeys across India and destinations worldwide.",
//   },
//   {
//     id: 3,
//     icon: Shield,
//     title: "Transparent & Competitive Pricing",
//     description: "No hidden charges, no surprises — just honest pricing and complete clarity in every booking.",
//   },
//   {
//     id: 4,
//     icon: Package,
//     title: "End-to-End Travel Solutions",
//     description: "Flights, hotels, transport, sightseeing, visas, insurance — everything is handled by us so you can relax and enjoy.",
//   },
//   {
//     id: 5,
//     icon: Phone,
//     title: "24×7 Customer Support",
//     description: "From inquiry to return, our team is always just a call away to assist you at every step of your journey.",
//   },
//   {
//     id: 6,
//     icon: Handshake,
//     title: "Trusted Network of Partners",
//     description: "We collaborate with reliable hotels, airlines, and local operators to ensure safety, comfort, and high-quality service.",
//   },
//   {
//     id: 7,
//     icon: Car,
//     title: "Comfortable & Well-Maintained Vehicles",
//     description: "For local and outstation trips, we provide clean, comfortable, and well-equipped vehicles with experienced drivers.",
//   },
//   {
//     id: 8,
//     icon: UsersRound,
//     title: "Tailor-Made Group & Corporate Travel",
//     description: "Whether it's a family trip, honeymoon, school tour, or corporate event, we create experiences that fit your group's unique needs.",
//   },
//   {
//     id: 9,
//     icon: FileText,
//     title: "Hassle-Free Visa & Documentation Support",
//     description: "Our team assists with visa processing, travel insurance, foreign exchange guidance, and all required paperwork.",
//   },
//   {
//     id: 10,
//     icon: Heart,
//     title: "Commitment to Customer Satisfaction",
//     description: "We measure our success through happy travellers. Our focus is always on delivering memorable, worry-free holidays.",
//   },
// ];

// const WhyChooseUsSection = () => {
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
//               Why Book <span className="text-[#E31B23]">With Us</span>
//             </h2>
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Main Container with Gradient Background */}
//         <div 
//           className="rounded-2xl shadow-2xl p-8 mb-12 relative overflow-hidden"
//           style={{
//             background: 'radial-gradient(circle at center, #3B82F6 0%, #1E40AF 30%, #0F1F5C 70%, #0A1128 100%)',
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
//             {/* Section Header */}
//             <div className="text-center mb-12">
//               <h3 className="text-2xl font-bold text-white drop-shadow-lg mb-2">
//                 Travel with Confidence
//               </h3>
//               <p className="text-white/80 text-sm drop-shadow">
//                 Trusted by thousands, crafting memories for a lifetime with excellence and dedication.
//               </p>
//             </div>

//             {/* Features Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
//               {reasons.map((item) => {
//                 const Icon = item.icon;
//                 return (
//                   <div 
//                     key={item.id} 
//                     className="group flex flex-col items-center text-center p-6 rounded-2xl bg-gradient-to-br from-rose-100 to-pink-100 backdrop-blur-sm border border-rose-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
//                   >
//                     {/* Icon Container */}
//                     <div className="relative mb-4 p-4 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
//                       <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                      
//                       {/* Floating Effect */}
//                       <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm">
//                         <div className="w-1.5 h-1.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-pulse"></div>
//                       </div>
//                     </div>

//                     {/* Title */}
//                     <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-3 group-hover:text-rose-600 transition-colors duration-300">
//                       {item.title}
//                     </h3>

//                     {/* Description */}
//                     <p className="text-xs md:text-sm text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
//                       {item.description}
//                     </p>

//                     {/* Bottom accent line */}
//                     <div className="w-0 h-1 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full mt-4 group-hover:w-12 transition-all duration-500"></div>
//                   </div>
//                 );
//               })}
//             </div>

           
//           </div>
//         </div>

//         {/* Bottom CTA */}
//         <div className="text-center">
//           <button className="inline-flex mb-6 items-center gap-3 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 border border-white/20">
//             <Handshake className="h-5 w-5" />
//             Start Your Journey With Us
//             <Heart className="h-5 w-5" />
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WhyChooseUsSection;





import {
  Users,
  Globe,
  Shield,
  Package,
  Phone,
  Handshake,
  Car,
  UsersRound,
  FileText,
  Heart
} from "lucide-react";

const reasons = [
  {
    id: 1,
    icon: Users,
    title: "Personalized Travel Planning",
    description: "Every itinerary is customized to match your interests, budget, and travel style — no one-size-fits-all packages.",
  },
  {
    id: 2,
    icon: Globe,
    title: "Expert Guidance for India & International Tours",
    description: "Our experienced travel specialists help you plan smooth journeys across India and destinations worldwide.",
  },
  {
    id: 3,
    icon: Shield,
    title: "Transparent & Competitive Pricing",
    description: "No hidden charges, no surprises — just honest pricing and complete clarity in every booking.",
  },
  {
    id: 4,
    icon: Package,
    title: "End-to-End Travel Solutions",
    description: "Flights, hotels, transport, sightseeing, visas, insurance — everything is handled by us so you can relax and enjoy.",
  },
  {
    id: 5,
    icon: Phone,
    title: "24×7 Customer Support",
    description: "From inquiry to return, our team is always just a call away to assist you at every step of your journey.",
  },
  {
    id: 6,
    icon: Handshake,
    title: "Trusted Network of Partners",
    description: "We collaborate with reliable hotels, airlines, and local operators to ensure safety, comfort, and high-quality service.",
  },
  {
    id: 7,
    icon: Car,
    title: "Comfortable & Well-Maintained Vehicles",
    description: "For local and outstation trips, we provide clean, comfortable, and well-equipped vehicles with experienced drivers.",
  },
  {
    id: 8,
    icon: UsersRound,
    title: "Tailor-Made Group & Corporate Travel",
    description: "Whether it's a family trip, honeymoon, school tour, or corporate event, we create experiences that fit your group's unique needs.",
  },
  {
    id: 9,
    icon: FileText,
    title: "Hassle-Free Visa & Documentation Support",
    description: "Our team assists with visa processing, travel insurance, foreign exchange guidance, and all required paperwork.",
  },
  {
    id: 10,
    icon: Heart,
    title: "Commitment to Customer Satisfaction",
    description: "We measure our success through happy travellers. Our focus is always on delivering memorable, worry-free holidays.",
  },
];

const WhyChooseUsSection = () => {
  return (
    <section className="py-0 bg-gradient-to-br from-sky-200 via-sky-200 to-sky-200">
      {/* Full Width Header Strip */}
      <div className="w-full bg-gradient-to-r from-[#0F1F5C] via-[#1F3F93] to-[#0F1F5C] py-6 mb-8 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2
              className="text-4xl md:text-6xl font-extrabold mb-2 tracking-tight"
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
              Why Book <span className="text-[#E31B23]">With Us</span>
            </h2>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {/* Main Container with Gradient Background */}
        <div 
          className="rounded-2xl shadow-2xl p-6 mb-10 relative overflow-hidden"
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
            {/* Section Header */}
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg mb-2">
                Travel with Confidence
              </h3>
              <p className="text-base md:text-lg text-white/80 drop-shadow max-w-3xl mx-auto">
                Trusted by thousands, crafting memories for a lifetime with excellence and dedication.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
              {reasons.map((item) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={item.id} 
                    className="group flex flex-col items-center text-center p-4 rounded-xl bg-gradient-to-br from-rose-100 to-pink-100 backdrop-blur-sm border border-rose-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Icon Container */}
                    <div className="relative mb-3 p-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 shadow-lg group-hover:scale-105 transition-transform duration-300">
                      <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                      
                      {/* Floating Effect */}
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-pulse"></div>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 group-hover:text-rose-600 transition-colors duration-300 leading-tight">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                      {item.description}
                    </p>

                    {/* Bottom accent line */}
                    <div className="w-0 h-1 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full mt-3 group-hover:w-10 transition-all duration-300"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <button className="inline-flex mb-10 items-center gap-3 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 border border-white/20 text-lg">
            <Handshake className="h-5 w-5" />
            Start Your Journey With Us
            <Heart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;