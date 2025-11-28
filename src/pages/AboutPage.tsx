// import React from 'react';
// import { 
//   Heart, 
//   Shield, 
//   Star, 
//   Users, 
//   Globe, 
//   CheckCircle,
//   Award,
//   Target,
//   Eye
// } from 'lucide-react';

// const AboutPage = () => {
//   return (
//     <div className="min-h-screen bg-white">
//       {/* Hero Section */}
//       <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
//         <div className="container mx-auto px-4 text-center">
//           <h1 className="text-5xl font-bold mb-6">About S K Tours & Travels</h1>
//           <p className="text-xl max-w-3xl mx-auto leading-relaxed">
//             Your trusted partner in crafting unforgettable journeys across India and around the world since 2000.
//           </p>
//         </div>
//       </section>

//       {/* Welcome Section */}
//       <section className="py-16">
//         <div className="container mx-auto px-4">
//           <div className="max-w-4xl mx-auto">
//             <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
//               Welcome to S K Tours & Travels
//             </h2>
//             <p className="text-lg text-gray-700 leading-relaxed mb-6">
//               We are more than just a travel agency — we are a dedicated team of travel planners, 
//               destination specialists, and passionate explorers committed to turning your dream 
//               vacations into reality. Whether you are looking to discover the vibrant culture of India, 
//               explore exotic international destinations, or plan a corporate retreat, S K Tours & Travels 
//               is here to elevate your travel experience with comfort, convenience, and personalized service.
//             </p>
//             <p className="text-lg text-gray-700 leading-relaxed">
//               Travel is more than visiting a place — it is about creating moments that stay with you forever. 
//               Our mission is to make those moments seamless, stress-free, and memorable. At S K Tours & Travels, 
//               we take the time to understand your preferences, your expectations, and your travel style so that 
//               every journey is thoughtfully designed just for you.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Our Story Section */}
//       <section className="py-16 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <div className="max-w-4xl mx-auto">
//             <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Story</h2>
//             <p className="text-lg text-gray-700 leading-relaxed mb-6">
//               <strong>S K Tours & Travels was founded on 01 January 2000</strong> with a simple 
//               principle — to make travel easy, enjoyable, and accessible for everyone. What began 
//               as a small initiative has now grown into a reliable travel brand known for its 
//               professional service, ethical business practices, and customer-centric approach.
//             </p>
//             <p className="text-lg text-gray-700 leading-relaxed">
//               Over the years, we realized that travellers needed more than just bookings — they 
//               needed someone they could trust to guide them, support them, and handle every detail 
//               with care. We listened. We adapted. And we expanded our services to include everything 
//               a modern traveller requires.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Our Philosophy */}
//       <section className="py-16">
//         <div className="container mx-auto px-4">
//           <div className="max-w-4xl mx-auto">
//             <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Philosophy</h2>
//             <p className="text-lg text-gray-700 leading-relaxed mb-8">
//               At S K Tours & Travels, we believe that travel is personal. Every traveller is different, 
//               and every journey deserves a unique touch. That is why we follow a client-first philosophy — 
//               ensuring that your comfort, safety, and preferences always come first.
//             </p>
            
//             <div className="space-y-6">
//               <div>
//                 <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
//                   <Shield className="w-6 h-6 text-blue-600 mr-3" />
//                   Transparency
//                 </h3>
//                 <p className="text-gray-700">
//                   We offer clear, fair, and competitive pricing. No hidden charges. No last-minute surprises. 
//                   Everything is explained upfront. We deliver what we promise.
//                 </p>
//               </div>

//               <div>
//                 <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
//                   <Star className="w-6 h-6 text-blue-600 mr-3" />
//                   Reliability
//                 </h3>
//                 <p className="text-gray-700">
//                   Our team is available whenever you need assistance — before, during, and after your trip. 
//                   From hotels and flights to transportation and sightseeing, we handpick services that meet our quality standards.
//                 </p>
//               </div>

//               <div>
//                 <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
//                   <Heart className="w-6 h-6 text-blue-600 mr-3" />
//                   Trust
//                 </h3>
//                 <p className="text-gray-700">
//                   Trust is the foundation of everything we do. Our clients depend on us for honest guidance, 
//                   safe arrangements, and reliable support. We love what we do — and it reflects in the care, 
//                   enthusiasm, and effort we put into planning every itinerary.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* What We Offer */}
//       <section className="py-16 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <div className="max-w-4xl mx-auto">
//             <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">What We Offer</h2>
            
//             <div className="space-y-8">
//               <div>
//                 <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
//                   <Globe className="w-6 h-6 text-blue-600 mr-3" />
//                   Domestic Tours (All Over India)
//                 </h3>
//                 <p className="text-lg text-gray-700 leading-relaxed mb-4">
//                   India is a land of incredible diversity — majestic mountains, sun-soaked beaches, royal palaces, 
//                   spiritual retreats, wildlife adventures, and vibrant cities. We offer curated domestic tour packages 
//                   to destinations including Himachal Pradesh, Rajasthan, Kerala, Goa, Uttarakhand, Kashmir, North East India, 
//                   Gujarat, Maharashtra, and many more.
//                 </p>
//                 <p className="text-gray-700">
//                   Whether you want a peaceful getaway, an adventure trip, or a cultural experience, we craft tailor-made 
//                   itineraries that let you explore India's beauty comfortably and safely.
//                 </p>
//               </div>

//               <div>
//                 <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
//                   <Users className="w-6 h-6 text-blue-600 mr-3" />
//                   International Tours
//                 </h3>
//                 <p className="text-lg text-gray-700 leading-relaxed mb-4">
//                   Travel beyond borders with S K Tours & Travels. Our global travel packages include popular and exotic 
//                   destinations such as Dubai, Singapore, Thailand, Malaysia, Maldives, Bali, Mauritius, Europe, Turkey, 
//                   Vietnam, Cambodia, Laos, Australia, New Zealand, USA, Canada, Japan, China, Taiwan, Korea, African 
//                   Countries and other major international locations.
//                 </p>
//                 <p className="text-gray-700">
//                   Our international experts handle all arrangements, including visa support, flights, hotels, sightseeing, 
//                   and travel insurance, ensuring a smooth travel experience anywhere in the world.
//                 </p>
//               </div>

//               <div>
//                 <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
//                   <Star className="w-6 h-6 text-blue-600 mr-3" />
//                   Customized Holiday Packages
//                 </h3>
//                 <p className="text-lg text-gray-700 leading-relaxed mb-4">
//                   No two travellers are alike, and neither should be their vacations. At S K Tours & Travels, we specialize 
//                   in creating personalized travel packages designed around your interests, travel dates, budget, and preferred activities.
//                 </p>
//                 <p className="text-gray-700">
//                   Our custom holidays include honeymoon packages, family vacations, festival tours, solo travel plans, group tours, 
//                   senior-citizen-friendly holidays, adventure tours, luxury vacations, weekend getaways, and corporate and incentive tours. 
//                   We listen to your ideas, add our expertise, and deliver an itinerary that fits you perfectly.
//                 </p>
//               </div>
//             </div>

//             <div className="mt-12">
//               <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Additional Services</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {[
//                   "Flight Bookings with competitive fares",
//                   "Hotel Reservations across India & internationally",
//                   "Visa Assistance with complete support",
//                   "Transportation Services with professional drivers",
//                   "Corporate Travel Management",
//                   "Travel Insurance"
//                 ].map((service, index) => (
//                   <div key={index} className="flex items-center gap-3">
//                     <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
//                     <span className="text-gray-700">{service}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Mission & Vision */}
//       <section className="py-16">
//         <div className="container mx-auto px-4">
//           <div className="max-w-4xl mx-auto">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//               <div>
//                 <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
//                   <Target className="w-6 h-6 text-blue-600 mr-3" />
//                   Our Mission
//                 </h3>
//                 <p className="text-gray-700 leading-relaxed">
//                   Our mission is to make travel simple, affordable, and memorable for every customer. 
//                   We aim to create meaningful travel experiences that inspire you, connect you with different 
//                   cultures, and bring joy to your life.
//                 </p>
//               </div>
              
//               <div>
//                 <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
//                   <Eye className="w-6 h-6 text-blue-600 mr-3" />
//                   Our Vision
//                 </h3>
//                 <p className="text-gray-700 leading-relaxed">
//                   To become a trusted global travel brand known for our integrity, customer satisfaction, 
//                   and exceptional service quality — while continuing to grow through innovation and personalized 
//                   travel solutions.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Why Choose Us */}
//       <section className="py-16 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <div className="max-w-4xl mx-auto">
//             <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">What Makes Us Different</h2>
            
//             <div className="space-y-6">
//               <p className="text-lg text-gray-700 leading-relaxed">
//                 When you choose S K Tours & Travels, you are not choosing a travel agency — you are choosing 
//                 a team that genuinely cares about your journey. We go beyond bookings to ensure your comfort, 
//                 safety, and happiness. Every trip we plan reflects our commitment to excellence and our passion for travel.
//               </p>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {[
//                   "Personalized customer care and attention to detail",
//                   "Extensive destination knowledge and industry experience",
//                   "24/7 support team available worldwide",
//                   "Quality accommodations and trusted partners",
//                   "Thoughtfully designed custom itineraries",
//                   "Maximum value for money without compromising quality",
//                   "Strong network with hotels, airlines, and tourism boards",
//                   "High repeat-customer rate and quick response time"
//                 ].map((item, index) => (
//                   <div key={index} className="flex items-center gap-3">
//                     <Award className="w-5 h-5 text-blue-600 flex-shrink-0" />
//                     <span className="text-gray-700">{item}</span>
//                   </div>
//                 ))}
//               </div>

//               <p className="text-lg text-gray-700 leading-relaxed mt-8">
//                 Whether it is your first international trip, a dream honeymoon, a weekend escape, or a family holiday, 
//                 we treat every itinerary with the same dedication and enthusiasm. Thousands of happy customers trust 
//                 us for personalized service, quick response time, hassle-free arrangements, and transparent pricing.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-3xl font-bold mb-6">Join Us on a Journey of Discovery</h2>
//           <p className="text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
//             At S K Tours & Travels, we believe that travel opens the mind, enriches the soul, and creates 
//             memories that last forever. Whether you want to explore the beauty of India, discover international 
//             wonders, or simply take a relaxing break from routine, we are here to guide you every step of the way.
//           </p>
//           <p className="text-lg max-w-2xl mx-auto mb-8">
//             Let us plan your next journey with care, passion, and expertise — because you deserve more than 
//             just a vacation; you deserve an experience.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
//               Contact Us Today
//             </button>
//             <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
//               View Our Packages
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Final Note */}
//       <section className="py-12 bg-blue-600 text-white">
//         <div className="container mx-auto px-4 text-center">
//           <h3 className="text-2xl font-bold mb-4">
//             Welcome to S K Tours & Travels
//           </h3>
//           <p className="text-lg max-w-3xl mx-auto">
//             Where your journey begins with trust and ends with unforgettable memories.
//           </p>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default AboutPage;





// import React from 'react';
// import { 
//   Heart, 
//   Shield, 
//   Star, 
//   Users, 
//   Globe, 
//   CheckCircle,
//   Award,
//   Target,
//   Eye
// } from 'lucide-react';

// const AboutPage = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-red-50 to-cyan-50">
//       {/* Hero Section */}
//       <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
//         <div className="px-4 text-center">
//           <h1 className="text-4xl md:text-5xl font-bold mb-4">About S K Tours & Travels</h1>
//           <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
//             Your trusted partner in crafting unforgettable journeys across India and around the world since 2000.
//           </p>
//         </div>
//       </section>

//       {/* Welcome Section */}
//       <section className="py-12">
//         <div className="px-4">
//           <div className="max-w-6xl mx-auto bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100">
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
//               Welcome to S K Tours & Travels
//             </h2>
//             <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
//               We are more than just a travel agency — we are a dedicated team of travel planners, 
//               destination specialists, and passionate explorers committed to turning your dream 
//               vacations into reality. Whether you are looking to discover the vibrant culture of India, 
//               explore exotic international destinations, or plan a corporate retreat, S K Tours & Travels 
//               is here to elevate your travel experience with comfort, convenience, and personalized service.
//             </p>
//             <p className="text-base md:text-lg text-gray-700 leading-relaxed">
//               Travel is more than visiting a place — it is about creating moments that stay with you forever. 
//               Our mission is to make those moments seamless, stress-free, and memorable. At S K Tours & Travels, 
//               we take the time to understand your preferences, your expectations, and your travel style so that 
//               every journey is thoughtfully designed just for you.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Our Story Section */}
//       <section className="py-12">
//         <div className="px-4">
//           <div className="max-w-6xl mx-auto bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-red-100">
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">Our Story</h2>
//             <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
//               <strong>S K Tours & Travels was founded on 01 January 2000</strong> with a simple 
//               principle — to make travel easy, enjoyable, and accessible for everyone. What began 
//               as a small initiative has now grown into a reliable travel brand known for its 
//               professional service, ethical business practices, and customer-centric approach.
//             </p>
//             <p className="text-base md:text-lg text-gray-700 leading-relaxed">
//               Over the years, we realized that travellers needed more than just bookings — they 
//               needed someone they could trust to guide them, support them, and handle every detail 
//               with care. We listened. We adapted. And we expanded our services to include everything 
//               a modern traveller requires.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Our Philosophy */}
//       <section className="py-12">
//         <div className="px-4">
//           <div className="max-w-6xl mx-auto bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100">
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">Our Philosophy</h2>
//             <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
//               At S K Tours & Travels, we believe that travel is personal. Every traveller is different, 
//               and every journey deserves a unique touch. That is why we follow a client-first philosophy — 
//               ensuring that your comfort, safety, and preferences always come first.
//             </p>
            
//             <div className="space-y-4">
//               <div className="bg-gradient-to-r from-blue-50 to-red-50 rounded-lg p-4 border border-blue-200">
//                 <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 flex items-center">
//                   <Shield className="w-5 h-5 text-blue-600 mr-2" />
//                   Transparency
//                 </h3>
//                 <p className="text-gray-700 text-sm md:text-base">
//                   We offer clear, fair, and competitive pricing. No hidden charges. No last-minute surprises. 
//                   Everything is explained upfront. We deliver what we promise.
//                 </p>
//               </div>

//               <div className="bg-gradient-to-r from-red-50 to-blue-50 rounded-lg p-4 border border-red-200">
//                 <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 flex items-center">
//                   <Star className="w-5 h-5 text-red-600 mr-2" />
//                   Reliability
//                 </h3>
//                 <p className="text-gray-700 text-sm md:text-base">
//                   Our team is available whenever you need assistance — before, during, and after your trip. 
//                   From hotels and flights to transportation and sightseeing, we handpick services that meet our quality standards.
//                 </p>
//               </div>

//               <div className="bg-gradient-to-r from-blue-50 to-red-50 rounded-lg p-4 border border-blue-200">
//                 <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 flex items-center">
//                   <Heart className="w-5 h-5 text-blue-600 mr-2" />
//                   Trust
//                 </h3>
//                 <p className="text-gray-700 text-sm md:text-base">
//                   Trust is the foundation of everything we do. Our clients depend on us for honest guidance, 
//                   safe arrangements, and reliable support. We love what we do — and it reflects in the care, 
//                   enthusiasm, and effort we put into planning every itinerary.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* What We Offer */}
//       <section className="py-12">
//         <div className="px-4">
//           <div className="max-w-6xl mx-auto bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-red-100">
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">What We Offer</h2>
            
//             <div className="space-y-6">
//               <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200">
//                 <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 flex items-center">
//                   <Globe className="w-5 h-5 text-blue-600 mr-2" />
//                   Domestic Tours (All Over India)
//                 </h3>
//                 <p className="text-gray-700 text-sm md:text-base mb-3">
//                   India is a land of incredible diversity — majestic mountains, sun-soaked beaches, royal palaces, 
//                   spiritual retreats, wildlife adventures, and vibrant cities. We offer curated domestic tour packages 
//                   to destinations including Himachal Pradesh, Rajasthan, Kerala, Goa, Uttarakhand, Kashmir, North East India, 
//                   Gujarat, Maharashtra, and many more.
//                 </p>
//                 <p className="text-gray-700 text-sm md:text-base">
//                   Whether you want a peaceful getaway, an adventure trip, or a cultural experience, we craft tailor-made 
//                   itineraries that let you explore India's beauty comfortably and safely.
//                 </p>
//               </div>

//               <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-4 border border-red-200">
//                 <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 flex items-center">
//                   <Users className="w-5 h-5 text-red-600 mr-2" />
//                   International Tours
//                 </h3>
//                 <p className="text-gray-700 text-sm md:text-base mb-3">
//                   Travel beyond borders with S K Tours & Travels. Our global travel packages include popular and exotic 
//                   destinations such as Dubai, Singapore, Thailand, Malaysia, Maldives, Bali, Mauritius, Europe, Turkey, 
//                   Vietnam, Cambodia, Laos, Australia, New Zealand, USA, Canada, Japan, China, Taiwan, Korea, African 
//                   Countries and other major international locations.
//                 </p>
//                 <p className="text-gray-700 text-sm md:text-base">
//                   Our international experts handle all arrangements, including visa support, flights, hotels, sightseeing, 
//                   and travel insurance, ensuring a smooth travel experience anywhere in the world.
//                 </p>
//               </div>

//               <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-4 border border-cyan-200">
//                 <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 flex items-center">
//                   <Star className="w-5 h-5 text-cyan-600 mr-2" />
//                   Customized Holiday Packages
//                 </h3>
//                 <p className="text-gray-700 text-sm md:text-base mb-3">
//                   No two travellers are alike, and neither should be their vacations. At S K Tours & Travels, we specialize 
//                   in creating personalized travel packages designed around your interests, travel dates, budget, and preferred activities.
//                 </p>
//                 <p className="text-gray-700 text-sm md:text-base">
//                   Our custom holidays include honeymoon packages, family vacations, festival tours, solo travel plans, group tours, 
//                   senior-citizen-friendly holidays, adventure tours, luxury vacations, weekend getaways, and corporate and incentive tours. 
//                   We listen to your ideas, add our expertise, and deliver an itinerary that fits you perfectly.
//                 </p>
//               </div>
//             </div>

//             <div className="mt-8 bg-gradient-to-r from-blue-50 to-red-50 rounded-lg p-4 border border-blue-200">
//               <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 text-center">Additional Services</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                 {[
//                   "Flight Bookings with competitive fares",
//                   "Hotel Reservations across India & internationally",
//                   "Visa Assistance with complete support",
//                   "Transportation Services with professional drivers",
//                   "Corporate Travel Management",
//                   "Travel Insurance"
//                 ].map((service, index) => (
//                   <div key={index} className="flex items-center gap-2 bg-white/60 rounded-lg p-2">
//                     <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
//                     <span className="text-gray-700 text-sm">{service}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Mission & Vision */}
//       <section className="py-12">
//         <div className="px-4">
//           <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="bg-gradient-to-br from-blue-100 to-white rounded-xl p-4 shadow-lg border border-blue-200">
//               <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center justify-center">
//                 <Target className="w-5 h-5 text-blue-600 mr-2" />
//                 Our Mission
//               </h3>
//               <p className="text-gray-700 text-sm md:text-base leading-relaxed text-center">
//                 Our mission is to make travel simple, affordable, and memorable for every customer. 
//                 We aim to create meaningful travel experiences that inspire you, connect you with different 
//                 cultures, and bring joy to your life.
//               </p>
//             </div>
            
//             <div className="bg-gradient-to-br from-red-100 to-white rounded-xl p-4 shadow-lg border border-red-200">
//               <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center justify-center">
//                 <Eye className="w-5 h-5 text-red-600 mr-2" />
//                 Our Vision
//               </h3>
//               <p className="text-gray-700 text-sm md:text-base leading-relaxed text-center">
//                 To become a trusted global travel brand known for our integrity, customer satisfaction, 
//                 and exceptional service quality — while continuing to grow through innovation and personalized 
//                 travel solutions.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Why Choose Us */}
//       <section className="py-12">
//         <div className="px-4">
//           <div className="max-w-6xl mx-auto bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100">
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">What Makes Us Different</h2>
            
//             <div className="space-y-4">
//               <p className="text-base md:text-lg text-gray-700 leading-relaxed">
//                 When you choose S K Tours & Travels, you are not choosing a travel agency — you are choosing 
//                 a team that genuinely cares about your journey. We go beyond bookings to ensure your comfort, 
//                 safety, and happiness. Every trip we plan reflects our commitment to excellence and our passion for travel.
//               </p>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                 {[
//                   "Personalized customer care and attention to detail",
//                   "Extensive destination knowledge and industry experience",
//                   "24/7 support team available worldwide",
//                   "Quality accommodations and trusted partners",
//                   "Thoughtfully designed custom itineraries",
//                   "Maximum value for money without compromising quality",
//                   "Strong network with hotels, airlines, and tourism boards",
//                   "High repeat-customer rate and quick response time"
//                 ].map((item, index) => (
//                   <div key={index} className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-red-50 rounded-lg p-3">
//                     <Award className="w-4 h-4 text-blue-600 flex-shrink-0" />
//                     <span className="text-gray-700 text-sm">{item}</span>
//                   </div>
//                 ))}
//               </div>

//               <p className="text-base md:text-lg text-gray-700 leading-relaxed mt-4 bg-yellow-50/50 rounded-lg p-4 border border-yellow-200">
//                 Whether it is your first international trip, a dream honeymoon, a weekend escape, or a family holiday, 
//                 we treat every itinerary with the same dedication and enthusiasm. Thousands of happy customers trust 
//                 us for personalized service, quick response time, hassle-free arrangements, and transparent pricing.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-12 bg-gradient-to-r from-blue-600 to-red-600 text-white">
//         <div className="px-4 text-center">
//           <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Us on a Journey of Discovery</h2>
//           <p className="text-lg md:text-xl max-w-4xl mx-auto mb-4 leading-relaxed">
//             At S K Tours & Travels, we believe that travel opens the mind, enriches the soul, and creates 
//             memories that last forever. Whether you want to explore the beauty of India, discover international 
//             wonders, or simply take a relaxing break from routine, we are here to guide you every step of the way.
//           </p>
//           <p className="text-base md:text-lg max-w-4xl mx-auto mb-6">
//             Let us plan your next journey with care, passion, and expertise — because you deserve more than 
//             just a vacation; you deserve an experience.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-3 justify-center">
//             <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg text-sm md:text-base">
//               Contact Us Today
//             </button>
//             <button className="border-2 border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-sm md:text-base">
//               View Our Packages
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Final Note */}
//       <section className="py-8 bg-gradient-to-r from-cyan-500 to-red-500 text-white">
//         <div className="px-4 text-center">
//           <h3 className="text-xl md:text-2xl font-bold mb-2">
//             Welcome to S K Tours & Travels
//           </h3>
//           <p className="text-base md:text-lg max-w-4xl mx-auto">
//             Where your journey begins with trust and ends with unforgettable memories.
//           </p>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default AboutPage;





// import React from 'react';
// import { 
//   Heart, 
//   Shield, 
//   Star, 
//   Users, 
//   Globe, 
//   CheckCircle,
//   Award,
//   Target,
//   Eye
// } from 'lucide-react';

// const AboutPage = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-red-50 to-cyan-50">
//       {/* Hero Section with Background Image */}
//       <section 
//         className="relative py-20 text-white"
//         style={{
//           backgroundImage: 'url("https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           backgroundAttachment: 'fixed'
//         }}
//       >
//         <div className="absolute inset-0 bg-black/50"></div>
//         <div className="relative px-4 text-center">
//           <h1 className="text-4xl md:text-5xl font-bold mb-4">About S K Tours & Travels</h1>
//           <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
//             Your trusted partner in crafting unforgettable journeys across India and around the world since 2000.
//           </p>
//         </div>
//       </section>

//       {/* Welcome Section */}
//       <section className="bg-white/80 backdrop-blur-sm border-t border-blue-100">
//         <div className="px-4 py-8">
//           <div className="max-w-6xl mx-auto">
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
//               Welcome to S K Tours & Travels
//             </h2>
//             <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
//               We are more than just a travel agency — we are a dedicated team of travel planners, 
//               destination specialists, and passionate explorers committed to turning your dream 
//               vacations into reality. Whether you are looking to discover the vibrant culture of India, 
//               explore exotic international destinations, or plan a corporate retreat, S K Tours & Travels 
//               is here to elevate your travel experience with comfort, convenience, and personalized service.
//             </p>
//             <p className="text-base md:text-lg text-gray-700 leading-relaxed">
//               Travel is more than visiting a place — it is about creating moments that stay with you forever. 
//               Our mission is to make those moments seamless, stress-free, and memorable. At S K Tours & Travels, 
//               we take the time to understand your preferences, your expectations, and your travel style so that 
//               every journey is thoughtfully designed just for you.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Our Story Section */}
//       <section className="bg-gradient-to-r from-blue-50/80 to-red-50/80 backdrop-blur-sm border-t border-red-100">
//         <div className="px-4 py-8">
//           <div className="max-w-6xl mx-auto">
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">Our Story</h2>
//             <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
//               <strong>S K Tours & Travels was founded on 01 January 2000</strong> with a simple 
//               principle — to make travel easy, enjoyable, and accessible for everyone. What began 
//               as a small initiative has now grown into a reliable travel brand known for its 
//               professional service, ethical business practices, and customer-centric approach.
//             </p>
//             <p className="text-base md:text-lg text-gray-700 leading-relaxed">
//               Over the years, we realized that travellers needed more than just bookings — they 
//               needed someone they could trust to guide them, support them, and handle every detail 
//               with care. We listened. We adapted. And we expanded our services to include everything 
//               a modern traveller requires.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Our Philosophy */}
//       <section className="bg-white/80 backdrop-blur-sm border-t border-blue-100">
//         <div className="px-4 py-8">
//           <div className="max-w-6xl mx-auto">
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">Our Philosophy</h2>
//             <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
//               At S K Tours & Travels, we believe that travel is personal. Every traveller is different, 
//               and every journey deserves a unique touch. That is why we follow a client-first philosophy — 
//               ensuring that your comfort, safety, and preferences always come first.
//             </p>
            
//             <div className="space-y-4">
//               <div className="bg-gradient-to-r from-blue-50 to-red-50 rounded-lg p-4 border border-blue-200">
//                 <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 flex items-center">
//                   <Shield className="w-5 h-5 text-blue-600 mr-2" />
//                   Transparency
//                 </h3>
//                 <p className="text-gray-700 text-sm md:text-base">
//                   We offer clear, fair, and competitive pricing. No hidden charges. No last-minute surprises. 
//                   Everything is explained upfront. We deliver what we promise.
//                 </p>
//               </div>

//               <div className="bg-gradient-to-r from-red-50 to-blue-50 rounded-lg p-4 border border-red-200">
//                 <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 flex items-center">
//                   <Star className="w-5 h-5 text-red-600 mr-2" />
//                   Reliability
//                 </h3>
//                 <p className="text-gray-700 text-sm md:text-base">
//                   Our team is available whenever you need assistance — before, during, and after your trip. 
//                   From hotels and flights to transportation and sightseeing, we handpick services that meet our quality standards.
//                 </p>
//               </div>

//               <div className="bg-gradient-to-r from-blue-50 to-red-50 rounded-lg p-4 border border-blue-200">
//                 <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 flex items-center">
//                   <Heart className="w-5 h-5 text-blue-600 mr-2" />
//                   Trust
//                 </h3>
//                 <p className="text-gray-700 text-sm md:text-base">
//                   Trust is the foundation of everything we do. Our clients depend on us for honest guidance, 
//                   safe arrangements, and reliable support. We love what we do — and it reflects in the care, 
//                   enthusiasm, and effort we put into planning every itinerary.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* What We Offer */}
//       <section className="bg-gradient-to-r from-blue-50/80 to-red-50/80 backdrop-blur-sm border-t border-red-100">
//         <div className="px-4 py-8">
//           <div className="max-w-6xl mx-auto">
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">What We Offer</h2>
            
//             <div className="space-y-6">
//               <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200">
//                 <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 flex items-center">
//                   <Globe className="w-5 h-5 text-blue-600 mr-2" />
//                   Domestic Tours (All Over India)
//                 </h3>
//                 <p className="text-gray-700 text-sm md:text-base mb-3">
//                   India is a land of incredible diversity — majestic mountains, sun-soaked beaches, royal palaces, 
//                   spiritual retreats, wildlife adventures, and vibrant cities. We offer curated domestic tour packages 
//                   to destinations including Himachal Pradesh, Rajasthan, Kerala, Goa, Uttarakhand, Kashmir, North East India, 
//                   Gujarat, Maharashtra, and many more.
//                 </p>
//                 <p className="text-gray-700 text-sm md:text-base">
//                   Whether you want a peaceful getaway, an adventure trip, or a cultural experience, we craft tailor-made 
//                   itineraries that let you explore India's beauty comfortably and safely.
//                 </p>
//               </div>

//               <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-4 border border-red-200">
//                 <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 flex items-center">
//                   <Users className="w-5 h-5 text-red-600 mr-2" />
//                   International Tours
//                 </h3>
//                 <p className="text-gray-700 text-sm md:text-base mb-3">
//                   Travel beyond borders with S K Tours & Travels. Our global travel packages include popular and exotic 
//                   destinations such as Dubai, Singapore, Thailand, Malaysia, Maldives, Bali, Mauritius, Europe, Turkey, 
//                   Vietnam, Cambodia, Laos, Australia, New Zealand, USA, Canada, Japan, China, Taiwan, Korea, African 
//                   Countries and other major international locations.
//                 </p>
//                 <p className="text-gray-700 text-sm md:text-base">
//                   Our international experts handle all arrangements, including visa support, flights, hotels, sightseeing, 
//                   and travel insurance, ensuring a smooth travel experience anywhere in the world.
//                 </p>
//               </div>

//               <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-4 border border-cyan-200">
//                 <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 flex items-center">
//                   <Star className="w-5 h-5 text-cyan-600 mr-2" />
//                   Customized Holiday Packages
//                 </h3>
//                 <p className="text-gray-700 text-sm md:text-base mb-3">
//                   No two travellers are alike, and neither should be their vacations. At S K Tours & Travels, we specialize 
//                   in creating personalized travel packages designed around your interests, travel dates, budget, and preferred activities.
//                 </p>
//                 <p className="text-gray-700 text-sm md:text-base">
//                   Our custom holidays include honeymoon packages, family vacations, festival tours, solo travel plans, group tours, 
//                   senior-citizen-friendly holidays, adventure tours, luxury vacations, weekend getaways, and corporate and incentive tours. 
//                   We listen to your ideas, add our expertise, and deliver an itinerary that fits you perfectly.
//                 </p>
//               </div>
//             </div>

//             <div className="mt-8 bg-gradient-to-r from-blue-50 to-red-50 rounded-lg p-4 border border-blue-200">
//               <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 text-center">Additional Services</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                 {[
//                   "Flight Bookings with competitive fares",
//                   "Hotel Reservations across India & internationally",
//                   "Visa Assistance with complete support",
//                   "Transportation Services with professional drivers",
//                   "Corporate Travel Management",
//                   "Travel Insurance"
//                 ].map((service, index) => (
//                   <div key={index} className="flex items-center gap-2 bg-white/60 rounded-lg p-2">
//                     <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
//                     <span className="text-gray-700 text-sm">{service}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Mission & Vision */}
//       <section className="bg-white/80 backdrop-blur-sm border-t border-blue-100">
//         <div className="px-4 py-8">
//           <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="bg-gradient-to-br from-blue-100 to-white rounded-xl p-4 border border-blue-200">
//               <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center justify-center">
//                 <Target className="w-5 h-5 text-blue-600 mr-2" />
//                 Our Mission
//               </h3>
//               <p className="text-gray-700 text-sm md:text-base leading-relaxed text-center">
//                 Our mission is to make travel simple, affordable, and memorable for every customer. 
//                 We aim to create meaningful travel experiences that inspire you, connect you with different 
//                 cultures, and bring joy to your life.
//               </p>
//             </div>
            
//             <div className="bg-gradient-to-br from-red-100 to-white rounded-xl p-4 border border-red-200">
//               <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center justify-center">
//                 <Eye className="w-5 h-5 text-red-600 mr-2" />
//                 Our Vision
//               </h3>
//               <p className="text-gray-700 text-sm md:text-base leading-relaxed text-center">
//                 To become a trusted global travel brand known for our integrity, customer satisfaction, 
//                 and exceptional service quality — while continuing to grow through innovation and personalized 
//                 travel solutions.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Why Choose Us */}
//       <section className="bg-gradient-to-r from-blue-50/80 to-red-50/80 backdrop-blur-sm border-t border-red-100">
//         <div className="px-4 py-8">
//           <div className="max-w-6xl mx-auto">
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">What Makes Us Different</h2>
            
//             <div className="space-y-4">
//               <p className="text-base md:text-lg text-gray-700 leading-relaxed">
//                 When you choose S K Tours & Travels, you are not choosing a travel agency — you are choosing 
//                 a team that genuinely cares about your journey. We go beyond bookings to ensure your comfort, 
//                 safety, and happiness. Every trip we plan reflects our commitment to excellence and our passion for travel.
//               </p>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                 {[
//                   "Personalized customer care and attention to detail",
//                   "Extensive destination knowledge and industry experience",
//                   "24/7 support team available worldwide",
//                   "Quality accommodations and trusted partners",
//                   "Thoughtfully designed custom itineraries",
//                   "Maximum value for money without compromising quality",
//                   "Strong network with hotels, airlines, and tourism boards",
//                   "High repeat-customer rate and quick response time"
//                 ].map((item, index) => (
//                   <div key={index} className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-red-50 rounded-lg p-3">
//                     <Award className="w-4 h-4 text-blue-600 flex-shrink-0" />
//                     <span className="text-gray-700 text-sm">{item}</span>
//                   </div>
//                 ))}
//               </div>

//               <p className="text-base md:text-lg text-gray-700 leading-relaxed mt-4 bg-yellow-50/50 rounded-lg p-4 border border-yellow-200">
//                 Whether it is your first international trip, a dream honeymoon, a weekend escape, or a family holiday, 
//                 we treat every itinerary with the same dedication and enthusiasm. Thousands of happy customers trust 
//                 us for personalized service, quick response time, hassle-free arrangements, and transparent pricing.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="bg-gradient-to-r from-blue-600 to-red-600 text-white border-t border-white/20">
//         <div className="px-4 py-8 text-center">
//           <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Us on a Journey of Discovery</h2>
//           <p className="text-lg md:text-xl max-w-4xl mx-auto mb-4 leading-relaxed">
//             At S K Tours & Travels, we believe that travel opens the mind, enriches the soul, and creates 
//             memories that last forever. Whether you want to explore the beauty of India, discover international 
//             wonders, or simply take a relaxing break from routine, we are here to guide you every step of the way.
//           </p>
//           <p className="text-base md:text-lg max-w-4xl mx-auto mb-6">
//             Let us plan your next journey with care, passion, and expertise — because you deserve more than 
//             just a vacation; you deserve an experience.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-3 justify-center">
//             <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg text-sm md:text-base">
//               Contact Us Today
//             </button>
//             <button className="border-2 border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-sm md:text-base">
//               View Our Packages
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Final Note */}
//       <section className="bg-gradient-to-r from-cyan-500 to-red-500 text-white border-t border-white/20">
//         <div className="px-4 py-6 text-center">
//           <h3 className="text-xl md:text-2xl font-bold mb-2">
//             Welcome to S K Tours & Travels
//           </h3>
//           <p className="text-base md:text-lg max-w-4xl mx-auto">
//             Where your journey begins with trust and ends with unforgettable memories.
//           </p>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default AboutPage;





// import React from 'react';
// import { 
//   Heart, 
//   Shield, 
//   Star, 
//   Users, 
//   Globe, 
//   CheckCircle,
//   Award,
//   Target,
//   Eye
// } from 'lucide-react';

// const AboutPage = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-red-50 to-cyan-50">
//       {/* Hero Section with Background Image */}
//       <section 
//         className="relative py-20 text-white"
//         style={{
//           backgroundImage: 'url("https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           backgroundAttachment: 'fixed'
//         }}
//       >
//         <div className="absolute inset-0 bg-black/50"></div>
//         <div className="relative px-4 text-center">
//           <h1 className="text-4xl md:text-5xl font-bold mb-4">About S K Tours & Travels</h1>
//           <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
//             Your trusted partner in crafting unforgettable journeys across India and around the world since 2000.
//           </p>
//         </div>
//       </section>

//       {/* Welcome Section */}
//       <section className="bg-gradient-to-r from-blue-100/80 to-cyan-100/80 backdrop-blur-sm border-t border-blue-200">
//         <div className="px-4 py-8">
//           <div className="max-w-6xl mx-auto">
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
//               Welcome to S K Tours & Travels
//             </h2>
//             <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
//               We are more than just a travel agency — we are a dedicated team of travel planners, 
//               destination specialists, and passionate explorers committed to turning your dream 
//               vacations into reality. Whether you are looking to discover the vibrant culture of India, 
//               explore exotic international destinations, or plan a corporate retreat, S K Tours & Travels 
//               is here to elevate your travel experience with comfort, convenience, and personalized service.
//             </p>
//             <p className="text-base md:text-lg text-gray-700 leading-relaxed">
//               Travel is more than visiting a place — it is about creating moments that stay with you forever. 
//               Our mission is to make those moments seamless, stress-free, and memorable. At S K Tours & Travels, 
//               we take the time to understand your preferences, your expectations, and your travel style so that 
//               every journey is thoughtfully designed just for you.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Our Story Section */}
//       <section className="bg-gradient-to-r from-red-100/80 to-pink-100/80 backdrop-blur-sm border-t border-red-200">
//         <div className="px-4 py-8">
//           <div className="max-w-6xl mx-auto">
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">Our Story</h2>
//             <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
//               <strong>S K Tours & Travels was founded on 01 January 2000</strong> with a simple 
//               principle — to make travel easy, enjoyable, and accessible for everyone. What began 
//               as a small initiative has now grown into a reliable travel brand known for its 
//               professional service, ethical business practices, and customer-centric approach.
//             </p>
//             <p className="text-base md:text-lg text-gray-700 leading-relaxed">
//               Over the years, we realized that travellers needed more than just bookings — they 
//               needed someone they could trust to guide them, support them, and handle every detail 
//               with care. We listened. We adapted. And we expanded our services to include everything 
//               a modern traveller requires.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Our Philosophy */}
//       <section className="bg-gradient-to-r from-cyan-100/80 to-blue-100/80 backdrop-blur-sm border-t border-cyan-200">
//         <div className="px-4 py-8">
//           <div className="max-w-6xl mx-auto">
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">Our Philosophy</h2>
//             <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
//               At S K Tours & Travels, we believe that travel is personal. Every traveller is different, 
//               and every journey deserves a unique touch. That is why we follow a client-first philosophy — 
//               ensuring that your comfort, safety, and preferences always come first.
//             </p>
            
//             <div className="space-y-4">
//               <div className="bg-gradient-to-r from-blue-200 to-cyan-200 rounded-lg p-4 border border-blue-300">
//                 <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 flex items-center">
//                   <Shield className="w-5 h-5 text-blue-700 mr-2" />
//                   Transparency
//                 </h3>
//                 <p className="text-gray-700 text-sm md:text-base">
//                   We offer clear, fair, and competitive pricing. No hidden charges. No last-minute surprises. 
//                   Everything is explained upfront. We deliver what we promise.
//                 </p>
//               </div>

//               <div className="bg-gradient-to-r from-red-200 to-pink-200 rounded-lg p-4 border border-red-300">
//                 <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 flex items-center">
//                   <Star className="w-5 h-5 text-red-700 mr-2" />
//                   Reliability
//                 </h3>
//                 <p className="text-gray-700 text-sm md:text-base">
//                   Our team is available whenever you need assistance — before, during, and after your trip. 
//                   From hotels and flights to transportation and sightseeing, we handpick services that meet our quality standards.
//                 </p>
//               </div>

//               <div className="bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg p-4 border border-blue-300">
//                 <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 flex items-center">
//                   <Heart className="w-5 h-5 text-purple-700 mr-2" />
//                   Trust
//                 </h3>
//                 <p className="text-gray-700 text-sm md:text-base">
//                   Trust is the foundation of everything we do. Our clients depend on us for honest guidance, 
//                   safe arrangements, and reliable support. We love what we do — and it reflects in the care, 
//                   enthusiasm, and effort we put into planning every itinerary.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* What We Offer */}
//       <section className="bg-gradient-to-r from-red-100/80 to-orange-100/80 backdrop-blur-sm border-t border-red-200">
//         <div className="px-4 py-8">
//           <div className="max-w-6xl mx-auto">
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">What We Offer</h2>
            
//             <div className="space-y-6">
//               <div className="bg-gradient-to-r from-blue-200 to-cyan-200 rounded-lg p-4 border border-blue-300">
//                 <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 flex items-center">
//                   <Globe className="w-5 h-5 text-blue-700 mr-2" />
//                   Domestic Tours (All Over India)
//                 </h3>
//                 <p className="text-gray-700 text-sm md:text-base mb-3">
//                   India is a land of incredible diversity — majestic mountains, sun-soaked beaches, royal palaces, 
//                   spiritual retreats, wildlife adventures, and vibrant cities. We offer curated domestic tour packages 
//                   to destinations including Himachal Pradesh, Rajasthan, Kerala, Goa, Uttarakhand, Kashmir, North East India, 
//                   Gujarat, Maharashtra, and many more.
//                 </p>
//                 <p className="text-gray-700 text-sm md:text-base">
//                   Whether you want a peaceful getaway, an adventure trip, or a cultural experience, we craft tailor-made 
//                   itineraries that let you explore India's beauty comfortably and safely.
//                 </p>
//               </div>

//               <div className="bg-gradient-to-r from-red-200 to-pink-200 rounded-lg p-4 border border-red-300">
//                 <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 flex items-center">
//                   <Users className="w-5 h-5 text-red-700 mr-2" />
//                   International Tours
//                 </h3>
//                 <p className="text-gray-700 text-sm md:text-base mb-3">
//                   Travel beyond borders with S K Tours & Travels. Our global travel packages include popular and exotic 
//                   destinations such as Dubai, Singapore, Thailand, Malaysia, Maldives, Bali, Mauritius, Europe, Turkey, 
//                   Vietnam, Cambodia, Laos, Australia, New Zealand, USA, Canada, Japan, China, Taiwan, Korea, African 
//                   Countries and other major international locations.
//                 </p>
//                 <p className="text-gray-700 text-sm md:text-base">
//                   Our international experts handle all arrangements, including visa support, flights, hotels, sightseeing, 
//                   and travel insurance, ensuring a smooth travel experience anywhere in the world.
//                 </p>
//               </div>

//               <div className="bg-gradient-to-r from-cyan-200 to-blue-200 rounded-lg p-4 border border-cyan-300">
//                 <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 flex items-center">
//                   <Star className="w-5 h-5 text-cyan-700 mr-2" />
//                   Customized Holiday Packages
//                 </h3>
//                 <p className="text-gray-700 text-sm md:text-base mb-3">
//                   No two travellers are alike, and neither should be their vacations. At S K Tours & Travels, we specialize 
//                   in creating personalized travel packages designed around your interests, travel dates, budget, and preferred activities.
//                 </p>
//                 <p className="text-gray-700 text-sm md:text-base">
//                   Our custom holidays include honeymoon packages, family vacations, festival tours, solo travel plans, group tours, 
//                   senior-citizen-friendly holidays, adventure tours, luxury vacations, weekend getaways, and corporate and incentive tours. 
//                   We listen to your ideas, add our expertise, and deliver an itinerary that fits you perfectly.
//                 </p>
//               </div>
//             </div>

//             <div className="mt-8 bg-gradient-to-r from-blue-200 to-red-200 rounded-lg p-4 border border-purple-300">
//               <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 text-center">Additional Services</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                 {[
//                   "Flight Bookings with competitive fares",
//                   "Hotel Reservations across India & internationally",
//                   "Visa Assistance with complete support",
//                   "Transportation Services with professional drivers",
//                   "Corporate Travel Management",
//                   "Travel Insurance"
//                 ].map((service, index) => (
//                   <div key={index} className="flex items-center gap-2 bg-blue-100/80 rounded-lg p-2">
//                     <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
//                     <span className="text-gray-700 text-sm">{service}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Mission & Vision */}
//       <section className="bg-gradient-to-r from-blue-100/80 to-cyan-100/80 backdrop-blur-sm border-t border-blue-200">
//         <div className="px-4 py-8">
//           <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="bg-gradient-to-br from-blue-200 to-cyan-200 rounded-xl p-4 border border-blue-300">
//               <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center justify-center">
//                 <Target className="w-5 h-5 text-blue-700 mr-2" />
//                 Our Mission
//               </h3>
//               <p className="text-gray-700 text-sm md:text-base leading-relaxed text-center">
//                 Our mission is to make travel simple, affordable, and memorable for every customer. 
//                 We aim to create meaningful travel experiences that inspire you, connect you with different 
//                 cultures, and bring joy to your life.
//               </p>
//             </div>
            
//             <div className="bg-gradient-to-br from-red-200 to-pink-200 rounded-xl p-4 border border-red-300">
//               <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center justify-center">
//                 <Eye className="w-5 h-5 text-red-700 mr-2" />
//                 Our Vision
//               </h3>
//               <p className="text-gray-700 text-sm md:text-base leading-relaxed text-center">
//                 To become a trusted global travel brand known for our integrity, customer satisfaction, 
//                 and exceptional service quality — while continuing to grow through innovation and personalized 
//                 travel solutions.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Why Choose Us */}
//       <section className="bg-gradient-to-r from-red-100/80 to-orange-100/80 backdrop-blur-sm border-t border-red-200">
//         <div className="px-4 py-8">
//           <div className="max-w-6xl mx-auto">
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">What Makes Us Different</h2>
            
//             <div className="space-y-4">
//               <p className="text-base md:text-lg text-gray-700 leading-relaxed">
//                 When you choose S K Tours & Travels, you are not choosing a travel agency — you are choosing 
//                 a team that genuinely cares about your journey. We go beyond bookings to ensure your comfort, 
//                 safety, and happiness. Every trip we plan reflects our commitment to excellence and our passion for travel.
//               </p>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                 {[
//                   "Personalized customer care and attention to detail",
//                   "Extensive destination knowledge and industry experience",
//                   "24/7 support team available worldwide",
//                   "Quality accommodations and trusted partners",
//                   "Thoughtfully designed custom itineraries",
//                   "Maximum value for money without compromising quality",
//                   "Strong network with hotels, airlines, and tourism boards",
//                   "High repeat-customer rate and quick response time"
//                 ].map((item, index) => (
//                   <div key={index} className="flex items-center gap-2 bg-gradient-to-r from-blue-200 to-red-200 rounded-lg p-3">
//                     <Award className="w-4 h-4 text-blue-700 flex-shrink-0" />
//                     <span className="text-gray-700 text-sm">{item}</span>
//                   </div>
//                 ))}
//               </div>

//               <p className="text-base md:text-lg text-gray-700 leading-relaxed mt-4 bg-yellow-200/80 rounded-lg p-4 border border-yellow-300">
//                 Whether it is your first international trip, a dream honeymoon, a weekend escape, or a family holiday, 
//                 we treat every itinerary with the same dedication and enthusiasm. Thousands of happy customers trust 
//                 us for personalized service, quick response time, hassle-free arrangements, and transparent pricing.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="bg-gradient-to-r from-blue-600 to-red-600 text-white border-t border-white/20">
//         <div className="px-4 py-8 text-center">
//           <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Us on a Journey of Discovery</h2>
//           <p className="text-lg md:text-xl max-w-4xl mx-auto mb-4 leading-relaxed">
//             At S K Tours & Travels, we believe that travel opens the mind, enriches the soul, and creates 
//             memories that last forever. Whether you want to explore the beauty of India, discover international 
//             wonders, or simply take a relaxing break from routine, we are here to guide you every step of the way.
//           </p>
//           <p className="text-base md:text-lg max-w-4xl mx-auto mb-6">
//             Let us plan your next journey with care, passion, and expertise — because you deserve more than 
//             just a vacation; you deserve an experience.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-3 justify-center">
//             <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg text-sm md:text-base">
//               Contact Us Today
//             </button>
//             <button className="border-2 border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-sm md:text-base">
//               View Our Packages
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Final Note */}
//       <section className="bg-gradient-to-r from-cyan-500 to-red-500 text-white border-t border-white/20">
//         <div className="px-4 py-6 text-center">
//           <h3 className="text-xl md:text-2xl font-bold mb-2">
//             Welcome to S K Tours & Travels
//           </h3>
//           <p className="text-base md:text-lg max-w-4xl mx-auto">
//             Where your journey begins with trust and ends with unforgettable memories.
//           </p>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default AboutPage;





// import React from 'react';
// import { 
//   Heart, 
//   Shield, 
//   Star, 
//   Users, 
//   Globe, 
//   CheckCircle,
//   Award,
//   Target,
//   Eye
// } from 'lucide-react';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';

// const AboutPage = () => {
//   return (
//     <>
    
//     <Header />
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-rose-50 to-cyan-50">
//       {/* Hero Section with Background Image */}
//       <section 
//         className="relative py-24 text-white"
//         style={{
//           backgroundImage: 'url("https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           backgroundAttachment: 'fixed'
//         }}
//       >
//         <div className="absolute inset-0 bg-black/40"></div>
//         <div className="relative px-4 text-center">
//           <h1 className="text-5xl md:text-6xl font-bold mb-6">About S K Tours & Travels</h1>
//           <p className="text-2xl md:text-3xl max-w-4xl mx-auto leading-relaxed">
//             Your trusted partner in crafting unforgettable journeys across India and around the world since 2000.
//           </p>
//         </div>
//       </section>

//       {/* Welcome Section */}
//       <section className="bg-gradient-to-r from-blue-100 to-sky-100 border-t border-blue-200">
//         <div className="px-4 py-12">
//           <div className="max-w-6xl mx-auto">
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 text-center">
//               Welcome to S K Tours & Travels
//             </h2>
//             <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6">
//               We are more than just a travel agency — we are a dedicated team of travel planners, 
//               destination specialists, and passionate explorers committed to turning your dream 
//               vacations into reality.
//             </p>
//             <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
//               Whether you are looking to discover the vibrant culture of India, explore exotic 
//               international destinations, or plan a corporate retreat, S K Tours & Travels 
//               is here to elevate your travel experience with comfort, convenience, and personalized service.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Our Story Section */}
//       <section className="bg-gradient-to-r from-rose-100 to-pink-100 border-t border-rose-200">
//         <div className="px-4 py-12">
//           <div className="max-w-6xl mx-auto">
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 text-center">Our Story</h2>
//             <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6">
//               <strong>S K Tours & Travels was founded on 01 January 2000</strong> with a simple 
//               principle — to make travel easy, enjoyable, and accessible for everyone.
//             </p>
//             <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
//               What began as a small initiative has now grown into a reliable travel brand known for its 
//               professional service, ethical business practices, and customer-centric approach. Over the years, 
//               we realized that travellers needed more than just bookings — they needed someone they could trust 
//               to guide them, support them, and handle every detail with care.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Our Philosophy */}
//       <section className="bg-gradient-to-r from-cyan-100 to-blue-100 border-t border-cyan-200">
//         <div className="px-4 py-12">
//           <div className="max-w-6xl mx-auto">
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 text-center">Our Philosophy</h2>
//             <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8">
//               At S K Tours & Travels, we believe that travel is personal. Every traveller is different, 
//               and every journey deserves a unique touch. That is why we follow a client-first philosophy — 
//               ensuring that your comfort, safety, and preferences always come first.
//             </p>
            
//             <div className="space-y-6">
//               <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl p-8 border border-blue-200">
//                 <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 flex items-center">
//                   <Shield className="w-8 h-8 text-blue-500 mr-4" />
//                   Transparency
//                 </h3>
//                 <p className="text-xl text-gray-700">
//                   We offer clear, fair, and competitive pricing. No hidden charges. No last-minute surprises. 
//                   Everything is explained upfront. We deliver what we promise.
//                 </p>
//               </div>

//               <div className="bg-gradient-to-r from-rose-100 to-pink-100 rounded-xl p-8 border border-rose-200">
//                 <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 flex items-center">
//                   <Star className="w-8 h-8 text-rose-500 mr-4" />
//                   Reliability
//                 </h3>
//                 <p className="text-xl text-gray-700">
//                   Our team is available whenever you need assistance — before, during, and after your trip. 
//                   From hotels and flights to transportation and sightseeing, we handpick services that meet our quality standards.
//                 </p>
//               </div>

//               <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl p-8 border border-blue-200">
//                 <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 flex items-center">
//                   <Heart className="w-8 h-8 text-indigo-500 mr-4" />
//                   Trust
//                 </h3>
//                 <p className="text-xl text-gray-700">
//                   Trust is the foundation of everything we do. Our clients depend on us for honest guidance, 
//                   safe arrangements, and reliable support. We love what we do — and it reflects in the care, 
//                   enthusiasm, and effort we put into planning every itinerary.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* What We Offer */}
//       <section className="bg-gradient-to-r from-rose-100 to-orange-100 border-t border-rose-200">
//         <div className="px-4 py-12">
//           <div className="max-w-6xl mx-auto">
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 text-center">What We Offer</h2>
            
//             <div className="space-y-8">
//               <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl p-8 border border-blue-200">
//                 <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center">
//                   <Globe className="w-8 h-8 text-blue-500 mr-4" />
//                   Domestic Tours (All Over India)
//                 </h3>
//                 <p className="text-xl text-gray-700 mb-4">
//                   India is a land of incredible diversity — majestic mountains, sun-soaked beaches, royal palaces, 
//                   spiritual retreats, wildlife adventures, and vibrant cities.
//                 </p>
//                 <p className="text-xl text-gray-700">
//                   We offer curated domestic tour packages to destinations including Himachal Pradesh, Rajasthan, Kerala, 
//                   Goa, Uttarakhand, Kashmir, North East India, Gujarat, Maharashtra, and many more. Whether you want a 
//                   peaceful getaway, an adventure trip, or a cultural experience, we craft tailor-made itineraries that 
//                   let you explore India's beauty comfortably and safely.
//                 </p>
//               </div>

//               <div className="bg-gradient-to-r from-rose-100 to-pink-100 rounded-xl p-8 border border-rose-200">
//                 <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center">
//                   <Users className="w-8 h-8 text-rose-500 mr-4" />
//                   International Tours
//                 </h3>
//                 <p className="text-xl text-gray-700 mb-4">
//                   Travel beyond borders with S K Tours & Travels. Our global travel packages include popular and exotic 
//                   destinations such as Dubai, Singapore, Thailand, Malaysia, Maldives, Bali, Mauritius, Europe, Turkey, 
//                   Vietnam, Cambodia, Laos, Australia, New Zealand, USA, Canada, Japan, China, Taiwan, Korea, African 
//                   Countries and other major international locations.
//                 </p>
//                 <p className="text-xl text-gray-700">
//                   Our international experts handle all arrangements, including visa support, flights, hotels, sightseeing, 
//                   and travel insurance, ensuring a smooth travel experience anywhere in the world.
//                 </p>
//               </div>

//               <div className="bg-gradient-to-r from-cyan-100 to-blue-100 rounded-xl p-8 border border-cyan-200">
//                 <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center">
//                   <Star className="w-8 h-8 text-cyan-500 mr-4" />
//                   Customized Holiday Packages
//                 </h3>
//                 <p className="text-xl text-gray-700 mb-4">
//                   No two travellers are alike, and neither should be their vacations. At S K Tours & Travels, we specialize 
//                   in creating personalized travel packages designed around your interests, travel dates, budget, and preferred activities.
//                 </p>
//                 <p className="text-xl text-gray-700">
//                   Our custom holidays include honeymoon packages, family vacations, festival tours, solo travel plans, group tours, 
//                   senior-citizen-friendly holidays, adventure tours, luxury vacations, weekend getaways, and corporate and incentive tours. 
//                   We listen to your ideas, add our expertise, and deliver an itinerary that fits you perfectly.
//                 </p>
//               </div>
//             </div>

//             <div className="mt-12 bg-gradient-to-r from-blue-100 to-rose-100 rounded-xl p-8 border border-purple-200">
//               <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">Additional Services</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {[
//                   "Flight Bookings with competitive fares",
//                   "Hotel Reservations across India & internationally",
//                   "Visa Assistance with complete support",
//                   "Transportation Services with professional drivers",
//                   "Corporate Travel Management",
//                   "Travel Insurance"
//                 ].map((service, index) => (
//                   <div key={index} className="flex items-center gap-4 bg-white/60 rounded-xl p-4">
//                     <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
//                     <span className="text-xl text-gray-700">{service}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Mission & Vision */}
//       <section className="bg-gradient-to-r from-blue-100 to-cyan-100 border-t border-blue-200">
//         <div className="px-4 py-12">
//           <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-8 border border-blue-200">
//               <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center justify-center">
//                 <Target className="w-8 h-8 text-blue-500 mr-4" />
//                 Our Mission
//               </h3>
//               <p className="text-xl text-gray-700 leading-relaxed text-center">
//                 Our mission is to make travel simple, affordable, and memorable for every customer. 
//                 We aim to create meaningful travel experiences that inspire you, connect you with different 
//                 cultures, and bring joy to your life.
//               </p>
//             </div>
            
//             <div className="bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl p-8 border border-rose-200">
//               <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center justify-center">
//                 <Eye className="w-8 h-8 text-rose-500 mr-4" />
//                 Our Vision
//               </h3>
//               <p className="text-xl text-gray-700 leading-relaxed text-center">
//                 To become a trusted global travel brand known for our integrity, customer satisfaction, 
//                 and exceptional service quality — while continuing to grow through innovation and personalized 
//                 travel solutions.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Why Choose Us */}
//       <section className="bg-gradient-to-r from-rose-100 to-orange-100 border-t border-rose-200">
//         <div className="px-4 py-12">
//           <div className="max-w-6xl mx-auto">
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 text-center">What Makes Us Different</h2>
            
//             <div className="space-y-6">
//               <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
//                 When you choose S K Tours & Travels, you are not choosing a travel agency — you are choosing 
//                 a team that genuinely cares about your journey. We go beyond bookings to ensure your comfort, 
//                 safety, and happiness. Every trip we plan reflects our commitment to excellence and our passion for travel.
//               </p>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {[
//                   "Personalized customer care and attention to detail",
//                   "Extensive destination knowledge and industry experience",
//                   "24/7 support team available worldwide",
//                   "Quality accommodations and trusted partners",
//                   "Thoughtfully designed custom itineraries",
//                   "Maximum value for money without compromising quality",
//                   "Strong network with hotels, airlines, and tourism boards",
//                   "High repeat-customer rate and quick response time"
//                 ].map((item, index) => (
//                   <div key={index} className="flex items-center gap-4 bg-gradient-to-r from-blue-100 to-rose-100 rounded-xl p-4">
//                     <Award className="w-6 h-6 text-blue-500 flex-shrink-0" />
//                     <span className="text-xl text-gray-700">{item}</span>
//                   </div>
//                 ))}
//               </div>

//               <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mt-8 bg-amber-100 rounded-xl p-6 border border-amber-200">
//                 Whether it is your first international trip, a dream honeymoon, a weekend escape, or a family holiday, 
//                 we treat every itinerary with the same dedication and enthusiasm. Thousands of happy customers trust 
//                 us for personalized service, quick response time, hassle-free arrangements, and transparent pricing.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//      <section className="bg-gradient-to-r from-sky-400 via-blue-400 to-cyan-400 text-white border-t border-white/20">
//   <div className="px-4 py-16 text-center">
//     <h2 className="text-4xl md:text-5xl font-bold mb-8">Join Us on a Journey of Discovery</h2>
//     <p className="text-2xl md:text-3xl max-w-4xl mx-auto mb-6 leading-relaxed">
//       At S K Tours & Travels, we believe that travel opens the mind, enriches the soul, and creates 
//       memories that last forever.
//     </p>
//     <p className="text-xl md:text-2xl max-w-4xl mx-auto mb-8">
//       Let us plan your next journey with care, passion, and expertise — because you deserve more than 
//       just a vacation; you deserve an experience.
//     </p>
//     <div className="flex flex-col sm:flex-row gap-4 justify-center">
//       <button className="bg-white text-sky-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg text-xl hover:scale-105 transform duration-300 border-0">
//         Contact Us Today
//       </button>
//       <button className="bg-rose-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-rose-600 transition-all shadow-lg text-xl hover:scale-105 transform duration-300 border-2 border-white">
//         View Our Packages
//       </button>
//     </div>
//   </div>
// </section>

// {/* Final Note */}
// <section className="bg-gradient-to-r from-rose-400 via-pink-400 to-rose-500 text-white border-t border-white/20">
//   <div className="px-4 py-12 text-center">
//     <h3 className="text-3xl md:text-4xl font-bold mb-4">
//       Welcome to S K Tours & Travels
//     </h3>
//     <p className="text-2xl md:text-3xl max-w-4xl mx-auto">
//       Where your journey begins with trust and ends with unforgettable memories.
//     </p>
//   </div>
// </section>
//     </div>
//      <Footer />
//     </>
//   );
// };

// export default AboutPage;




import React from 'react';
import { 
  Heart, 
  Shield, 
  Star, 
  Users, 
  Globe, 
  CheckCircle,
  Award,
  Target,
  Eye
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AboutPage = () => {
  return (
    <>
    <Header />
    <div className="min-h-screen bg-blue-50"> {/* Changed to light blue background */}
      {/* Hero Section with Background Image */}
      <section 
        className="relative py-24 text-white"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About S K Tours & Travels</h1>
          <p className="text-2xl md:text-3xl max-w-4xl mx-auto leading-relaxed">
            Your trusted partner in crafting unforgettable journeys across India and around the world since 2000.
          </p>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="bg-blue-100 border-t border-blue-200">
        <div className="px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 text-center">
              Welcome to S K Tours & Travels
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6">
              We are more than just a travel agency — we are a dedicated team of travel planners, 
              destination specialists, and passionate explorers committed to turning your dream 
              vacations into reality.
            </p>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              Whether you are looking to discover the vibrant culture of India, explore exotic 
              international destinations, or plan a corporate retreat, S K Tours & Travels 
              is here to elevate your travel experience with comfort, convenience, and personalized service.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="bg-blue-100 border-t border-blue-200">
        <div className="px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 text-center">Our Story</h2>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6">
              <strong>S K Tours & Travels was founded on 01 January 2000</strong> with a simple 
              principle — to make travel easy, enjoyable, and accessible for everyone.
            </p>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              What began as a small initiative has now grown into a reliable travel brand known for its 
              professional service, ethical business practices, and customer-centric approach. Over the years, 
              we realized that travellers needed more than just bookings — they needed someone they could trust 
              to guide them, support them, and handle every detail with care.
            </p>
          </div>
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="bg-blue-100 border-t border-blue-200">
        <div className="px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 text-center">Our Philosophy</h2>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8">
              At S K Tours & Travels, we believe that travel is personal. Every traveller is different, 
              and every journey deserves a unique touch. That is why we follow a client-first philosophy — 
              ensuring that your comfort, safety, and preferences always come first.
            </p>
            
            <div className="space-y-6">
              <div className="bg-blue-200 rounded-xl p-8 border border-blue-300">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 flex items-center">
                  <Shield className="w-8 h-8 text-blue-600 mr-4" />
                  Transparency
                </h3>
                <p className="text-xl text-gray-700">
                  We offer clear, fair, and competitive pricing. No hidden charges. No last-minute surprises. 
                  Everything is explained upfront. We deliver what we promise.
                </p>
              </div>

              <div className="bg-blue-200 rounded-xl p-8 border border-blue-300">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 flex items-center">
                  <Star className="w-8 h-8 text-blue-600 mr-4" />
                  Reliability
                </h3>
                <p className="text-xl text-gray-700">
                  Our team is available whenever you need assistance — before, during, and after your trip. 
                  From hotels and flights to transportation and sightseeing, we handpick services that meet our quality standards.
                </p>
              </div>

              <div className="bg-blue-200 rounded-xl p-8 border border-blue-300">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 flex items-center">
                  <Heart className="w-8 h-8 text-blue-600 mr-4" />
                  Trust
                </h3>
                <p className="text-xl text-gray-700">
                  Trust is the foundation of everything we do. Our clients depend on us for honest guidance, 
                  safe arrangements, and reliable support. We love what we do — and it reflects in the care, 
                  enthusiasm, and effort we put into planning every itinerary.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="bg-blue-100 border-t border-blue-200">
        <div className="px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 text-center">What We Offer</h2>
            
            <div className="space-y-8">
              <div className="bg-blue-200 rounded-xl p-8 border border-blue-300">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center">
                  <Globe className="w-8 h-8 text-blue-600 mr-4" />
                  Domestic Tours (All Over India)
                </h3>
                <p className="text-xl text-gray-700 mb-4">
                  India is a land of incredible diversity — majestic mountains, sun-soaked beaches, royal palaces, 
                  spiritual retreats, wildlife adventures, and vibrant cities.
                </p>
                <p className="text-xl text-gray-700">
                  We offer curated domestic tour packages to destinations including Himachal Pradesh, Rajasthan, Kerala, 
                  Goa, Uttarakhand, Kashmir, North East India, Gujarat, Maharashtra, and many more. Whether you want a 
                  peaceful getaway, an adventure trip, or a cultural experience, we craft tailor-made itineraries that 
                  let you explore India's beauty comfortably and safely.
                </p>
              </div>

              <div className="bg-blue-200 rounded-xl p-8 border border-blue-300">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center">
                  <Users className="w-8 h-8 text-blue-600 mr-4" />
                  International Tours
                </h3>
                <p className="text-xl text-gray-700 mb-4">
                  Travel beyond borders with S K Tours & Travels. Our global travel packages include popular and exotic 
                  destinations such as Dubai, Singapore, Thailand, Malaysia, Maldives, Bali, Mauritius, Europe, Turkey, 
                  Vietnam, Cambodia, Laos, Australia, New Zealand, USA, Canada, Japan, China, Taiwan, Korea, African 
                  Countries and other major international locations.
                </p>
                <p className="text-xl text-gray-700">
                  Our international experts handle all arrangements, including visa support, flights, hotels, sightseeing, 
                  and travel insurance, ensuring a smooth travel experience anywhere in the world.
                </p>
              </div>

              <div className="bg-blue-200 rounded-xl p-8 border border-blue-300">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center">
                  <Star className="w-8 h-8 text-blue-600 mr-4" />
                  Customized Holiday Packages
                </h3>
                <p className="text-xl text-gray-700 mb-4">
                  No two travellers are alike, and neither should be their vacations. At S K Tours & Travels, we specialize 
                  in creating personalized travel packages designed around your interests, travel dates, budget, and preferred activities.
                </p>
                <p className="text-xl text-gray-700">
                  Our custom holidays include honeymoon packages, family vacations, festival tours, solo travel plans, group tours, 
                  senior-citizen-friendly holidays, adventure tours, luxury vacations, weekend getaways, and corporate and incentive tours. 
                  We listen to your ideas, add our expertise, and deliver an itinerary that fits you perfectly.
                </p>
              </div>
            </div>

            <div className="mt-12 bg-blue-200 rounded-xl p-8 border border-blue-300">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">Additional Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Flight Bookings with competitive fares",
                  "Hotel Reservations across India & internationally",
                  "Visa Assistance with complete support",
                  "Transportation Services with professional drivers",
                  "Corporate Travel Management",
                  "Travel Insurance"
                ].map((service, index) => (
                  <div key={index} className="flex items-center gap-4 bg-blue-100 rounded-xl p-4">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-xl text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-blue-100 border-t border-blue-200">
        <div className="px-4 py-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-200 rounded-2xl p-8 border border-blue-300">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center justify-center">
                <Target className="w-8 h-8 text-blue-600 mr-4" />
                Our Mission
              </h3>
              <p className="text-xl text-gray-700 leading-relaxed text-center">
                Our mission is to make travel simple, affordable, and memorable for every customer. 
                We aim to create meaningful travel experiences that inspire you, connect you with different 
                cultures, and bring joy to your life.
              </p>
            </div>
            
            <div className="bg-blue-200 rounded-2xl p-8 border border-blue-300">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center justify-center">
                <Eye className="w-8 h-8 text-blue-600 mr-4" />
                Our Vision
              </h3>
              <p className="text-xl text-gray-700 leading-relaxed text-center">
                To become a trusted global travel brand known for our integrity, customer satisfaction, 
                and exceptional service quality — while continuing to grow through innovation and personalized 
                travel solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-blue-100 border-t border-blue-200">
        <div className="px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 text-center">What Makes Us Different</h2>
            
            <div className="space-y-6">
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                When you choose S K Tours & Travels, you are not choosing a travel agency — you are choosing 
                a team that genuinely cares about your journey. We go beyond bookings to ensure your comfort, 
                safety, and happiness. Every trip we plan reflects our commitment to excellence and our passion for travel.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Personalized customer care and attention to detail",
                  "Extensive destination knowledge and industry experience",
                  "24/7 support team available worldwide",
                  "Quality accommodations and trusted partners",
                  "Thoughtfully designed custom itineraries",
                  "Maximum value for money without compromising quality",
                  "Strong network with hotels, airlines, and tourism boards",
                  "High repeat-customer rate and quick response time"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4 bg-blue-200 rounded-xl p-4">
                    <Award className="w-6 h-6 text-blue-600 flex-shrink-0" />
                    <span className="text-xl text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mt-8 bg-blue-200 rounded-xl p-6 border border-blue-300">
                Whether it is your first international trip, a dream honeymoon, a weekend escape, or a family holiday, 
                we treat every itinerary with the same dedication and enthusiasm. Thousands of happy customers trust 
                us for personalized service, quick response time, hassle-free arrangements, and transparent pricing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-sky-400 via-blue-400 to-cyan-400 text-white border-t border-white/20">
        <div className="px-4 py-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Join Us on a Journey of Discovery</h2>
          <p className="text-2xl md:text-3xl max-w-4xl mx-auto mb-6 leading-relaxed">
            At S K Tours & Travels, we believe that travel opens the mind, enriches the soul, and creates 
            memories that last forever.
          </p>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto mb-8">
            Let us plan your next journey with care, passion, and expertise — because you deserve more than 
            just a vacation; you deserve an experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-sky-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg text-xl hover:scale-105 transform duration-300 border-0">
              Contact Us Today
            </button>
            <button className="bg-rose-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-rose-600 transition-all shadow-lg text-xl hover:scale-105 transform duration-300 border-2 border-white">
              View Our Packages
            </button>
          </div>
        </div>
      </section>

      {/* Final Note */}
      <section className="bg-gradient-to-r from-blue-400 via-sky-400 to-blue-500 text-white border-t border-white/20">
        <div className="px-4 py-12 text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Welcome to S K Tours & Travels
          </h3>
          <p className="text-2xl md:text-3xl max-w-4xl mx-auto">
            Where your journey begins with trust and ends with unforgettable memories.
          </p>
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
};

export default AboutPage;