// import { Button } from "@/components/ui/button";
// import { ArrowRight, Play, Pause, MapPin, Calendar, Users } from "lucide-react";
// import { useState, useEffect, useRef } from "react";
// import video1 from "../assets/From KlickPin CF Create a Travel Agency Intro Video - MakeWebVideocom [Video] in 2025 _ Travel agency Travel creative Travel video ideas.mp4";

// const Hero = () => {
//   const [currentVideo, setCurrentVideo] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(true);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

//   const videoCarousel = [
//     {
//       id: 1,
//       video: video1,
//       title: "Tropical Paradise",
//       location: "Maldives",
//     },
//     {
//       id: 2,
//       video: "/videos/mountain-adventure.mp4",
//       title: "Mountain Adventure",
//       location: "Swiss Alps",
//     },
//     {
//       id: 3,
//       video: "/videos/city-lights.mp4",
//       title: "City Lights",
//       location: "Tokyo, Japan",
//     },
//     {
//       id: 4,
//       video: "/videos/cruise-ship.mp4",
//       title: "Luxury Cruises",
//       location: "Caribbean Sea",
//     },
//   ];

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 100);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     if (!isPlaying) return;

//     const interval = setInterval(() => {
//       setCurrentVideo((prev) => (prev + 1) % videoCarousel.length);
//     }, 8000);

//     return () => clearInterval(interval);
//   }, [isPlaying, videoCarousel.length]);

//   useEffect(() => {
//     // Play/pause videos based on isPlaying state
//     videoRefs.current.forEach((video, index) => {
//       if (video) {
//         if (index === currentVideo && isPlaying) {
//           video.play().catch(console.error);
//         } else {
//           video.pause();
//         }
//       }
//     });
//   }, [currentVideo, isPlaying]);

//   const nextVideo = () => {
//     setCurrentVideo((prev) => (prev + 1) % videoCarousel.length);
//   };

//   const prevVideo = () => {
//     setCurrentVideo((prev) => (prev - 1 + videoCarousel.length) % videoCarousel.length);
//   };

//   return (
//     <section className="relative h-screen min-h-[900px] text-white overflow-hidden">
//       {/* Video Background */}
//       <div className="absolute inset-0">
//         {videoCarousel.map((video, index) => (
//           <div
//             key={video.id}
//             className={`absolute inset-0 w-full h-full transition-opacity duration-2000 ease-in-out ${
//               index === currentVideo ? "opacity-100" : "opacity-0"
//             }`}
//           >
//             <video
//               ref={el => videoRefs.current[index] = el}
//               className="w-full h-full object-cover"
//               muted
//               loop
//               playsInline
//             >
//               <source src={video.video} type="video/mp4" />
//             </video>
//           </div>
//         ))}
        
//         {/* Elegant Gradient Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80"></div>
//       </div>

//       {/* Subtle Animated Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
//         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow-delayed"></div>
//       </div>

//       {/* Premium Content */}
//       <div className="container mx-auto px-6 relative z-20 h-full flex flex-col justify-center">
//         <div className="max-w-3xl">
//           {/* Elegant Badge */}
//           <div className="mb-8 opacity-0 animate-fade-in">
//             <span className="inline-flex items-center px-5 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium tracking-wider border border-white/20">
//               ✈️ LUXURY TRAVEL EXPERIENCES
//             </span>
//           </div>
          
//           {/* Premium Heading */}
//           <div className="mb-6 opacity-0 animate-fade-in-delay-1">
//             <h1 className="text-5xl md:text-7xl font-light mb-4 leading-tight tracking-tight">
//               Discover <span className="font-semibold">Extraordinary</span>
//             </h1>
//             <h2 className="text-4xl md:text-6xl font-light text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
//               Journeys
//             </h2>
//             <div className="w-24 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 mt-6"></div>
//           </div>
          
//           {/* Refined Subtitle */}
//           <div className="mb-10 max-w-2xl opacity-0 animate-fade-in-delay-2">
//             <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-light">
//               Curated luxury experiences, from exclusive resorts to private yacht charters
//             </p>
//           </div>
          
//           {/* Elegant CTA Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-delay-3">
//             <Button 
//               size="lg" 
//               className="text-base px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 transition-all duration-500 shadow-lg hover:shadow-amber-500/20 rounded-full border-0"
//             >
//               <span className="flex items-center">
//                 Explore Collection
//                 <ArrowRight className="ml-2 w-5 h-5" />
//               </span>
//             </Button>
            
//             <Button 
//               variant="outline" 
//               size="lg" 
//               className="text-base px-8 py-4 bg-transparent border-white/30 hover:bg-white/10 backdrop-blur-sm rounded-full transition-all duration-500"
//             >
//               <span className="flex items-center">
//                 Personal Consultation
//               </span>
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Elegant Location Indicator */}
//       <div className="absolute bottom-8 left-8 z-30 opacity-0 animate-fade-in-delay-4">
//         <div className="flex items-center gap-3 bg-black/30 backdrop-blur-md px-5 py-3 rounded-full border border-white/10">
//           <MapPin className="w-5 h-5 text-amber-400" />
//           <div>
//             <div className="text-sm text-white/70">Current Destination</div>
//             <div className="font-medium">{videoCarousel[currentVideo].location}</div>
//           </div>
//         </div>
//       </div>

//       {/* Minimal Video Controls */}
//       <div className="absolute bottom-8 right-8 z-30 flex items-center gap-4 opacity-0 animate-fade-in-delay-4">
//         <div className="flex items-center gap-3 bg-black/30 backdrop-blur-md rounded-full px-4 py-2 border border-white/10">
//           <button
//             onClick={() => setIsPlaying(!isPlaying)}
//             className="p-2 hover:text-amber-400 transition-all duration-300"
//           >
//             {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
//           </button>
          
//           <div className="flex items-center gap-1.5">
//             {videoCarousel.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentVideo(index)}
//                 className={`transition-all duration-500 rounded-full ${
//                   index === currentVideo 
//                     ? "bg-amber-500 w-8 h-1.5" 
//                     : "bg-white/50 hover:bg-white/80 w-1.5 h-1.5"
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Premium Booking Widget - Appears on scroll */}
//       <div className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-700 ${
//         isScrolled ? 'translate-y-0' : 'translate-y-full'
//       }`}>
//         <div className="container mx-auto px-4 pb-6">
//           <div className="max-w-5xl mx-auto">
//             <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-white/20">
//               <div className="flex flex-col md:flex-row items-center justify-between gap-6">
//                 {/* Date Selection */}
//                 <div className="flex-1 w-full">
//                   <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
//                     <div className="flex-1 text-center">
//                       <div className="text-sm font-medium text-gray-500">Check in</div>
//                       <div className="font-semibold text-gray-900">27 Nov 2025</div>
//                     </div>
//                     <div className="text-amber-500">→</div>
//                     <div className="flex-1 text-center">
//                       <div className="text-sm font-medium text-gray-500">Check out</div>
//                       <div className="font-semibold text-gray-900">01 Dec 2025</div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Travelers */}
//                 <div className="flex-1 w-full">
//                   <div className="p-3 bg-gray-50 rounded-xl">
//                     <div className="font-semibold text-gray-900 text-center">
//                       2 Adults, 1 Child
//                     </div>
//                   </div>
//                 </div>

//                 {/* Search Button */}
//                 <div className="flex-1 w-full">
//                   <Button 
//                     size="lg" 
//                     className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 transition-all duration-500 rounded-xl shadow-lg"
//                   >
//                     <span className="flex items-center justify-center">
//                       Discover Experiences
//                     </span>
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Subtle Scroll Indicator */}
//       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 opacity-0 animate-fade-in-delay-5">
//         <div className="flex flex-col items-center">
//           <div className="w-6 h-10 border border-white/30 rounded-full flex justify-center">
//             <div className="w-1 h-3 bg-amber-400 rounded-full mt-2 animate-bounce"></div>
//           </div>
//         </div>
//       </div>

//       {/* Premium Animation Styles */}
//       <style jsx>{`
//         @keyframes pulse-slow {
//           0%, 100% { opacity: 0.1; transform: scale(1); }
//           50% { opacity: 0.2; transform: scale(1.05); }
//         }
//         @keyframes pulse-slow-delayed {
//           0%, 100% { opacity: 0.1; transform: scale(1); }
//           50% { opacity: 0.15; transform: scale(1.1); }
//         }
//         @keyframes fade-in {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
//         .animate-pulse-slow-delayed { animation: pulse-slow-delayed 10s ease-in-out infinite; }
//         .animate-fade-in { animation: fade-in 1s ease-out forwards; }
//         .animate-fade-in-delay-1 { animation: fade-in 1s ease-out 0.2s forwards; }
//         .animate-fade-in-delay-2 { animation: fade-in 1s ease-out 0.4s forwards; }
//         .animate-fade-in-delay-3 { animation: fade-in 1s ease-out 0.6s forwards; }
//         .animate-fade-in-delay-4 { animation: fade-in 1s ease-out 0.8s forwards; }
//         .animate-fade-in-delay-5 { animation: fade-in 1s ease-out 1s forwards; }
//       `}</style>
//     </section>
//   );
// };

// export default Hero;





// import { Button } from "@/components/ui/button";
// import { ArrowRight, Play, Pause, Sparkles, MapPin, Clock } from "lucide-react";
// import { useState, useEffect } from "react";
// import video1 from "../assets/From KlickPin CF Create a Travel Agency Intro Video - MakeWebVideocom [Video] in 2025 _ Travel agency Travel creative Travel video ideas.mp4";

// const videoCarousel = [
//   {
//     id: 1,
//     video: video1,
//     thumbnail: "/images/tropical-thumb.jpg",
//     title: "Tropical Paradise",
//     tag: "Maldives • Beach Villas",
//   },
//   {
//     id: 2,
//     video: "/videos/mountain-adventure.mp4",
//     thumbnail: "https://i.pinimg.com/736x/58/20/85/58208506142b698cda4558b8693fe7be.jpg",
//     title: "Mountain Adventure",
//     tag: "Swiss Alps • Snow Escapes",
//   },
//   {
//     id: 3,
//     video: "/videos/city-lights.mp4",
//     thumbnail: "https://i.pinimg.com/736x/58/20/85/58208506142b698cda4558b8693fe7be.jpg",
//     title: "City Lights",
//     tag: "Dubai • Nightlife & Luxury",
//   },
//   {
//     id: 4,
//     video: "/videos/cruise-ship.mp4",
//     thumbnail: "https://i.pinimg.com/736x/58/20/85/58208506142b698cda4558b8693fe7be.jpg",
//     title: "Luxury Cruises",
//     tag: "Mediterranean • All Inclusive",
//   },
// ];

// const Hero = () => {
//   const [currentVideo, setCurrentVideo] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(true);
//   const [progress, setProgress] = useState(0);

//   const currentSlide = videoCarousel[currentVideo];

//   useEffect(() => {
//     if (!isPlaying) return;

//     const duration = 6000; // ms per slide
//     const step = 50;

//     let elapsed = 0;
//     setProgress(0);

//     const timer = setInterval(() => {
//       elapsed += step;
//       const nextProgress = Math.min(100, (elapsed / duration) * 100);
//       setProgress(nextProgress);

//       if (elapsed >= duration) {
//         setCurrentVideo((prev) => (prev + 1) % videoCarousel.length);
//         elapsed = 0;
//       }
//     }, step);

//     return () => clearInterval(timer);
//   }, [isPlaying, currentVideo]);

//   const nextVideo = () => {
//     setCurrentVideo((prev) => (prev + 1) % videoCarousel.length);
//     setProgress(0);
//   };

//   const prevVideo = () => {
//     setCurrentVideo((prev) => (prev - 1 + videoCarousel.length) % videoCarousel.length);
//     setProgress(0);
//   };

//   return (
//     <section className="relative h-screen min-h-[800px] text-primary-foreground overflow-hidden">
//       {/* Background Videos */}
//       <div className="absolute inset-0">
//         {videoCarousel.map((video, index) => (
//           <video
//             key={video.id}
//             className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
//               index === currentVideo ? "opacity-100" : "opacity-0"
//             }`}
//             autoPlay
//             muted
//             loop
//             playsInline
//             poster={video.thumbnail}
//           >
//             <source src={video.video} type="video/mp4" />
//           </video>
//         ))}

//         {/* Dark & Color Gradients */}
//         <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
//         <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />

//         {/* Glow Orbs */}
//         <div className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-brand-red/40 blur-3xl opacity-60" />
//         <div className="pointer-events-none absolute top-10 left-10 h-52 w-52 rounded-full bg-orange-500/30 blur-3xl opacity-80" />
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 relative z-20 h-full flex flex-col justify-center">
//         <div className="max-w-5xl">
//           <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md border border-white/20 shadow-lg">
//             <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-red/90 text-xs font-bold">
//               <Sparkles className="w-4 h-4" />
//             </span>
//             <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.16em]">
//               Premium Travel Experiences
//             </span>
//             <span className="hidden sm:inline-block h-1 w-10 rounded-full bg-gradient-to-r from-brand-red to-orange-400" />
//             <span className="hidden sm:inline text-xs text-white/80">
//               Curated by India&apos;s trusted travel experts
//             </span>
//           </div>

//           <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 leading-tight tracking-tight">
//             Discover Your Next{" "}
//             <span className="relative inline-block">
//               <span className="text-brand-red bg-gradient-to-r from-brand-red via-orange-400 to-yellow-300 bg-clip-text text-transparent">
//                 Signature Adventure
//               </span>
//               <span className="absolute inset-x-0 -bottom-1 h-[3px] bg-gradient-to-r from-brand-red/70 via-orange-400/70 to-transparent rounded-full" />
//             </span>
//           </h1>

//           <p className="text-lg sm:text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-2xl leading-relaxed">
//             From exotic cruises and curated holidays to seamless visa & corporate travel – 
//             craft journeys that feel personal, effortless and unforgettable.
//           </p>

//           {/* Primary Actions */}
//           <div className="flex flex-col sm:flex-row gap-4 items-center mb-8">
//             <Button
//               variant="red"
//               size="lg"
//               className="text-base group shadow-xl shadow-brand-red/30 hover:shadow-brand-red/50 hover:scale-[1.02] transition-transform"
//             >
//               Explore Signature Packages
//               <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
//             </Button>

//             <Button
//               variant="outline"
//               size="lg"
//               className="text-base bg-background/15 border-primary-foreground/30 hover:bg-background/30 backdrop-blur-md flex items-center gap-2"
//             >
//               <Play className="w-4 h-4" />
//               Talk to a Travel Expert
//             </Button>
//           </div>

//           {/* Quick Stats Row */}
//           <div className="flex flex-wrap gap-4 text-sm text-white/80">
//             <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl">
//               <span className="text-lg">⭐</span>
//               <div>
//                 <p className="font-semibold text-sm">4.9 / 5 Rated</p>
//                 <p className="text-xs text-white/70">By 10,000+ happy travelers</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl">
//               <span className="text-lg">🌍</span>
//               <div>
//                 <p className="font-semibold text-sm">60+ Countries</p>
//                 <p className="text-xs text-white/70">Custom-crafted itineraries</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Video Side Panel / Controls */}
//       <div className="absolute right-4 md:right-10 top-28 md:top-1/2 md:-translate-y-1/2 z-30">
//         <div className="w-[280px] md:w-[320px] bg-black/40 border border-white/15 rounded-3xl backdrop-blur-xl shadow-2xl p-4 space-y-4">
//           {/* Current Label */}
//           <div className="flex items-center justify-between gap-2">
//             <div className="text-xs uppercase tracking-[0.16em] text-white/70">
//               FEATURED SCENE
//             </div>
//             <div className="text-[10px] px-2 py-1 rounded-full bg-white/10 border border-white/20">
//               Auto-play {isPlaying ? "On" : "Off"}
//             </div>
//           </div>

//           {/* Current Slide Info */}
//           <div className="space-y-2">
//             <h3 className="text-base md:text-lg font-semibold line-clamp-1">
//               {currentSlide.title}
//             </h3>
//             <p className="text-xs text-white/70 line-clamp-2">{currentSlide.tag}</p>

//             {/* Progress Bar */}
//             <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
//               <div
//                 className="h-full bg-gradient-to-r from-brand-red via-orange-400 to-yellow-300 transition-all"
//                 style={{ width: `${progress}%` }}
//               />
//             </div>
//           </div>

//           {/* Thumbnails */}
//           <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
//             {videoCarousel.map((item, index) => (
//               <button
//                 key={item.id}
//                 onClick={() => setCurrentVideo(index)}
//                 className={`relative group flex-shrink-0 rounded-2xl overflow-hidden border transition-all ${
//                   index === currentVideo
//                     ? "border-brand-red/80 ring-2 ring-brand-red/50 scale-[1.02]"
//                     : "border-white/10 hover:border-white/40 hover:scale-[1.02]"
//                 }`}
//               >
//                 <img
//                   src={item.thumbnail}
//                   alt={item.title}
//                   className="h-16 w-24 object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
//                 <span className="absolute bottom-1 left-1 right-1 text-[10px] text-left text-white/90 truncate">
//                   {item.title}
//                 </span>
//               </button>
//             ))}
//           </div>

//           {/* Controls */}
//           <div className="flex items-center justify-between gap-3">
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => setIsPlaying((prev) => !prev)}
//                 className="flex items-center justify-center h-9 w-9 rounded-full bg-white/15 hover:bg-white/30 border border-white/20 transition-colors"
//               >
//                 {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
//               </button>
//               <span className="text-xs text-white/70">
//                 {isPlaying ? "Pause background" : "Play background"}
//               </span>
//             </div>

//             <div className="flex items-center gap-1">
//               <button
//                 onClick={prevVideo}
//                 className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-xs transition-colors"
//               >
//                 ‹
//               </button>
//               <button
//                 onClick={nextVideo}
//                 className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-xs transition-colors"
//               >
//                 ›
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Booking Widget - Bottom Section */}
//       <div className="absolute bottom-0 left-0 right-0 z-30">
//         <div className="container mx-auto px-4 pb-2">
//           <div className="max-w-5xl mx-auto">
//             <div className="relative">
//               {/* Glow underneath */}
//               <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-brand-red/25 via-orange-400/20 to-transparent -z-10" />

//               <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.55)] border border-white/70 p-6 md:p-7 transform md:-translate-y-4">
//                 <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
//                   {/* Date Selection */}
//                   <div className="flex-1 w-full">
//                     <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2">
//                       <Clock className="w-4 h-4 text-brand-red" />
//                       Travel Dates
//                     </label>
//                     <div className="flex items-center gap-4">
//                       <div className="flex-1">
//                         <div className="text-sm uppercase text-gray-500 mb-1">
//                           Check in
//                         </div>
//                         <div className="text-lg font-bold text-gray-900">
//                           27 Nov 2025
//                         </div>
//                         <div className="text-xs text-gray-600">4 nights</div>
//                       </div>
//                       <div className="text-gray-400 text-xl">→</div>
//                       <div className="flex-1">
//                         <div className="text-sm uppercase text-gray-500 mb-1">
//                           Check out
//                         </div>
//                         <div className="text-lg font-bold text-gray-900">
//                           01 Dec 2025
//                         </div>
//                         <div className="text-xs text-gray-600">Flexible dates</div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Travelers */}
//                   <div className="flex-1 w-full">
//                     <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2">
//                       <MapPin className="w-4 h-4 text-brand-red" />
//                       Travelers
//                     </label>
//                     <div className="text-lg font-bold text-gray-900">
//                       2 Adults, 0 Child, 0 Infants
//                     </div>
//                     <p className="text-xs text-gray-600 mt-1">
//                       Ideal for couples & friends getaways
//                     </p>
//                   </div>

//                   {/* Search Button */}
//                   <div className="flex-1 w-full">
//                     <Button
//                       variant="red"
//                       size="lg"
//                       className="w-full text-base py-3 flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform"
//                     >
//                       Search Packages
//                       <ArrowRight className="w-5 h-5" />
//                     </Button>
//                     <p className="mt-1.5 text-[11px] text-gray-500 text-center">
//                       No booking fee • Instant confirmation
//                     </p>
//                   </div>
//                 </div>

//                 {/* Quick Options */}
//                 <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 pt-4 border-t border-gray-200">
//                   {[
//                     "✈️ Flights + Hotel",
//                     "🏨 Hotels Only",
//                     "🚢 Cruise Packages",
//                     "🎫 Visa Services",
//                     "👔 Corporate Travel",
//                     "🏝️ Honeymoon Specials",
//                   ].map((label) => (
//                     <button
//                       key={label}
//                       className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-full text-xs sm:text-sm font-medium text-gray-700 transition-colors border border-gray-200"
//                     >
//                       {label}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Scroll Indicator */}
//       <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20">
//         <div className="flex flex-col items-center gap-2 text-[11px] text-white/70">
//           <span>Scroll to explore</span>
//           <div className="animate-bounce">
//             <div className="w-7 h-11 border-2 border-white/50 rounded-full flex justify-center">
//               <div className="w-1 h-3 bg-white/70 rounded-full mt-2" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;


// import { Button } from "@/components/ui/button";
// import { ArrowRight, Play, Pause, Sparkles, MapPin, Globe2 } from "lucide-react";
// import { useState, useEffect } from "react";
// import video1 from "../assets/From KlickPin CF Create a Travel Agency Intro Video - MakeWebVideocom [Video] in 2025 _ Travel agency Travel creative Travel video ideas.mp4";

// const Hero = () => {
//   const [currentVideo, setCurrentVideo] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(true);

//   const videoCarousel = [
//     {
//       id: 1,
//       video: video1,
//       thumbnail: "/images/tropical-thumb.jpg",
//       title: "Tropical Paradise",
//       location: "Bali, Maldives, Phuket",
//       tag: "Beach Escapes",
//     },
//     {
//       id: 2,
//       video: "/videos/mountain-adventure.mp4",
//       thumbnail: "https://i.pinimg.com/736x/58/20/85/58208506142b698cda4558b8693fe7be.jpg",
//       title: "Mountain Adventure",
//       location: "Swiss Alps, Himachal",
//       tag: "Adventure Trips",
//     },
//     {
//       id: 3,
//       video: "/videos/city-lights.mp4",
//       thumbnail: "https://i.pinimg.com/736x/58/20/85/58208506142b698cda4558b8693fe7be.jpg",
//       title: "City Lights",
//       location: "Dubai, Singapore",
//       tag: "City Breaks",
//     },
//     {
//       id: 4,
//       video: "/videos/cruise-ship.mp4",
//       thumbnail: "https://i.pinimg.com/736x/58/20/85/58208506142b698cda4558b8693fe7be.jpg",
//       title: "Luxury Cruises",
//       location: "Mediterranean, Europe",
//       tag: "Cruise Holidays",
//     },
//   ];

//   useEffect(() => {
//     if (!isPlaying) return;

//     const interval = setInterval(() => {
//       setCurrentVideo((prev) => (prev + 1) % videoCarousel.length);
//     }, 6000);

//     return () => clearInterval(interval);
//   }, [isPlaying, videoCarousel.length]);

//   const nextVideo = () => {
//     setCurrentVideo((prev) => (prev + 1) % videoCarousel.length);
//   };

//   const prevVideo = () => {
//     setCurrentVideo((prev) => (prev - 1 + videoCarousel.length) % videoCarousel.length);
//   };

//   return (
//     <section className="relative h-[85vh] min-h-[700px] text-primary-foreground overflow-hidden">
//       {/* Background Video Carousel */}
//       <div className="absolute inset-0">
//         {videoCarousel.map((video, index) => (
//           <video
//             key={video.id}
//             className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-out ${
//               index === currentVideo ? "opacity-100" : "opacity-0"
//             }`}
//             autoPlay
//             muted
//             loop
//             playsInline
//             poster={video.thumbnail}
//           >
//             <source src={video.video} type="video/mp4" />
//           </video>
//         ))}

//         {/* Enhanced Gradient Overlays */}
//         <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />
//         <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/60" />
//         <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.9)]" />
//       </div>

//       {/* Floating destination chips (right side) */}
//       <div className="pointer-events-none hidden lg:flex flex-col gap-2 absolute right-6 top-1/3 z-30">
//         {videoCarousel.map((item, index) => (
//           <div
//             key={item.id}
//             className={`pointer-events-auto flex items-center gap-3 rounded-full px-3 py-2 backdrop-blur-md border text-xs font-medium transition-all cursor-pointer
//               ${
//                 index === currentVideo
//                   ? "bg-white/20 border-brand-red/70 shadow-lg scale-105"
//                   : "bg-black/40 border-white/15 hover:border-white/30 hover:bg-white/15"
//               }`}
//             onClick={() => setCurrentVideo(index)}
//           >
//             <div
//               className={`w-2 h-2 rounded-full transition-colors ${
//                 index === currentVideo ? "bg-brand-red" : "bg-white/60"
//               }`}
//             />
//             <span className="uppercase tracking-wide text-xs">{item.tag}</span>
//           </div>
//         ))}
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 relative z-20 h-full flex flex-col justify-center">
//         <div className="max-w-6xl flex flex-col lg:flex-row items-start lg:items-center gap-8">
//           {/* Left: Heading & Actions */}
//           <div className="max-w-2xl">
//             {/* Premium Badge */}
//             <div className="mb-6 flex flex-wrap items-center gap-3">
//               <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-red to-orange-500 backdrop-blur-sm rounded-full text-xs font-semibold uppercase tracking-[0.18em] shadow-lg border border-white/20">
//                 <span className="relative flex h-2 w-2">
//                   <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75 animate-ping" />
//                   <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
//                 </span>
//                 Premium Travel Experiences
//               </span>
//             </div>

//             {/* Main Heading */}
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
//               Discover Your Next{" "}
//               <span className="relative inline-block">
//                 <span className="relative z-10 bg-gradient-to-r from-brand-red via-orange-400 to-yellow-300 bg-clip-text text-transparent animate-[shine_4s_infinite]">
//                   Adventure
//                 </span>
//                 <span className="absolute -inset-1 rounded-full bg-brand-red/20 blur-xl opacity-60" />
//               </span>
//             </h1>

//             {/* Subheading */}
//             <p className="text-lg md:text-xl mb-8 text-primary-foreground/90 max-w-xl leading-relaxed">
//               From exotic cruises to corporate events, visa services to once-in-a-lifetime vacations –
//               craft your journey with{" "}
//               <span className="font-semibold text-brand-red">
//                 India's trusted travel partner.
//               </span>
//             </p>

//             {/* Stats */}
//             <div className="mb-8 flex flex-wrap gap-4 text-sm text-white/90">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 rounded-xl bg-white/10 backdrop-blur border border-white/10">
//                   <Globe2 className="w-4 h-4" />
//                 </div>
//                 <div>
//                   <p className="font-semibold">40+ Countries</p>
//                   <p className="text-white/70 text-xs">Global destinations</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="p-2 rounded-xl bg-white/10 backdrop-blur border border-white/10">
//                   <MapPin className="w-4 h-4" />
//                 </div>
//                 <div>
//                   <p className="font-semibold">10K+ Travelers</p>
//                   <p className="text-white/70 text-xs">Happy customers</p>
//                 </div>
//               </div>
//             </div>

//             {/* CTA Buttons */}
//             <div className="flex flex-col sm:flex-row gap-3 items-start">
//               <Button
//                 variant="red"
//                 size="lg"
//                 className="text-base group shadow-xl hover:shadow-2xl rounded-full px-8 font-semibold"
//               >
//                 Explore Packages
//                 <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
//               </Button>
//               <Button
//                 variant="outline"
//                 size="lg"
//                 className="text-base bg-transparent border-white/40 hover:bg-white/10 backdrop-blur-md rounded-full px-7 font-medium"
//               >
//                 Contact Expert
//               </Button>
//             </div>
//           </div>

         
//         </div>
//       </div>

//       {/* Video Controls */}
//       <div className="absolute bottom-24 right-6 md:right-10 z-30 flex flex-col md:flex-row items-end md:items-center gap-3 md:gap-4">
//         {/* Current slide info */}
//         <div className="hidden md:flex flex-col bg-black/60 border border-white/10 rounded-xl px-4 py-3 backdrop-blur">
//           <span className="text-[10px] uppercase tracking-[0.25em] text-white/60 mb-1">
//             Now Showing
//           </span>
//           <span className="text-sm font-semibold">
//             {videoCarousel[currentVideo].title}
//           </span>
//           <span className="text-[11px] text-white/70">
//             {videoCarousel[currentVideo].location}
//           </span>
//         </div>

//         <div className="flex items-center gap-3 bg-black/70 backdrop-blur-md rounded-full px-4 py-2 border border-white/15 shadow-lg">
//           <button
//             onClick={() => setIsPlaying(!isPlaying)}
//             className="p-2 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center"
//           >
//             {isPlaying ? (
//               <Pause className="w-4 h-4" />
//             ) : (
//               <Play className="w-4 h-4" />
//             )}
//           </button>

//           <div className="flex items-center gap-1">
//             {videoCarousel.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentVideo(index)}
//                 className={`h-1.5 rounded-full transition-all ${
//                   index === currentVideo
//                     ? "bg-brand-red w-6"
//                     : "bg-white/50 hover:bg-white/90 w-2"
//                 }`}
//               />
//             ))}
//           </div>

//           <div className="flex items-center gap-2 ml-1">
//             <button
//               onClick={prevVideo}
//               className="text-[11px] uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors"
//             >
//               Prev
//             </button>
//             <span className="h-4 w-px bg-white/20" />
//             <button
//               onClick={nextVideo}
//               className="text-[11px] uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Keyframe for shining gradient text */}
//       <style jsx>{`
//         @keyframes shine {
//           0% {
//             background-position: 0% 50%;
//           }
//           50% {
//             background-position: 100% 50%;
//           }
//           100% {
//             background-position: 0% 50%;
//           }
//         }
//         span.animate-[shine_4s_infinite] {
//           background-size: 200% 200%;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default Hero;




// import { Button } from "@/components/ui/button";
// import { ArrowRight, Play, Pause, Sparkles, MapPin, Globe2, Search, Calendar, Users } from "lucide-react";
// import { useState, useEffect } from "react";
// import video1 from "../assets/From KlickPin CF Create a Travel Agency Intro Video - MakeWebVideocom [Video] in 2025 _ Travel agency Travel creative Travel video ideas.mp4";

// const Hero = () => {
//   const [currentVideo, setCurrentVideo] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(true);
//   const [location, setLocation] = useState("Singapore");
//   const [checkInDate, setCheckInDate] = useState("27 - Nov - 2025");
//   const [nights, setNights] = useState(4);
//   const [adults, setAdults] = useState(2);

//   const videoCarousel = [
//     {
//       id: 1,
//       video: video1,
//       thumbnail: "/images/tropical-thumb.jpg",
//       title: "Tropical Paradise",
//       location: "Bali, Maldives, Phuket",
//       tag: "Beach Escapes",
//     },
//     {
//       id: 2,
//       video: "/videos/mountain-adventure.mp4",
//       thumbnail: "https://i.pinimg.com/736x/58/20/85/58208506142b698cda4558b8693fe7be.jpg",
//       title: "Mountain Adventure",
//       location: "Swiss Alps, Himachal",
//       tag: "Adventure Trips",
//     },
//     {
//       id: 3,
//       video: "/videos/city-lights.mp4",
//       thumbnail: "https://i.pinimg.com/736x/58/20/85/58208506142b698cda4558b8693fe7be.jpg",
//       title: "City Lights",
//       location: "Dubai, Singapore",
//       tag: "City Breaks",
//     },
//     {
//       id: 4,
//       video: "/videos/cruise-ship.mp4",
//       thumbnail: "https://i.pinimg.com/736x/58/20/85/58208506142b698cda4558b8693fe7be.jpg",
//       title: "Luxury Cruises",
//       location: "Mediterranean, Europe",
//       tag: "Cruise Holidays",
//     },
//   ];

//   useEffect(() => {
//     if (!isPlaying) return;

//     const interval = setInterval(() => {
//       setCurrentVideo((prev) => (prev + 1) % videoCarousel.length);
//     }, 6000);

//     return () => clearInterval(interval);
//   }, [isPlaying, videoCarousel.length]);

//   const nextVideo = () => {
//     setCurrentVideo((prev) => (prev + 1) % videoCarousel.length);
//   };

//   const prevVideo = () => {
//     setCurrentVideo((prev) => (prev - 1 + videoCarousel.length) % videoCarousel.length);
//   };

//   return (
//     <section className="relative h-[85vh] min-h-[650px] text-white overflow-hidden">
//       {/* Background Video Carousel */}
//       <div className="absolute inset-0">
//         {videoCarousel.map((video, index) => (
//           <video
//             key={video.id}
//             className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-out ${
//               index === currentVideo ? "opacity-100" : "opacity-0"
//             }`}
//             autoPlay
//             muted
//             loop
//             playsInline
//             poster={video.thumbnail}
//           >
//             <source src={video.video} type="video/mp4" />
//           </video>
//         ))}

//         {/* Gradient Overlays */}
//         <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
//         <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
//       </div>

//       {/* Floating destination chips (right side) */}
//       <div className="hidden lg:flex flex-col gap-3 absolute right-6 top-1/3 z-30">
//         {videoCarousel.map((item, index) => (
//           <div
//             key={item.id}
//             className={`flex items-center gap-3 rounded-full px-4 py-2 backdrop-blur-md border text-xs font-medium transition-all cursor-pointer ${
//               index === currentVideo
//                 ? "bg-white/15 border-brand-red/60 shadow-lg scale-105"
//                 : "bg-black/35 border-white/10 hover:border-white/40 hover:bg-white/10"
//             }`}
//             onClick={() => setCurrentVideo(index)}
//           >
//             <div
//               className={`w-2 h-2 rounded-full ${
//                 index === currentVideo ? "bg-brand-red" : "bg-white/50"
//               }`}
//             />
//             <span className="uppercase tracking-wide">{item.tag}</span>
//           </div>
//         ))}
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 relative z-20 h-full flex flex-col justify-center pt-10">
//         <div className="max-w-4xl">
//           {/* Badge row */}
//           <div className="mb-4 flex flex-wrap items-center gap-3">
//             <span className="inline-flex items-center gap-2 px-4 py-2 bg-brand-red/90 backdrop-blur-sm rounded-full text-sm font-semibold uppercase tracking-[0.18em] shadow-lg border border-white/20">
//               <span className="relative flex h-2 w-2">
//                 <span className="absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75 animate-ping" />
//                 <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
//               </span>
//               Premium Travel Experiences
//             </span>
//             <div className="flex items-center gap-2 text-sm text-white/80">
//               <Sparkles className="w-4 h-4" />
//               <span>Curated by travel experts • 24x7 Support</span>
//             </div>
//           </div>

//           <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight tracking-tight">
//             Discover Your Next{" "}
//             <span className="relative inline-block">
//               <span className="relative z-10 bg-gradient-to-r from-brand-red via-orange-400 to-yellow-300 bg-clip-text text-transparent animate-[shine_4s_infinite]">
//                 Adventure
//               </span>
//               <span className="absolute -inset-1 rounded-full bg-brand-red/20 blur-xl opacity-60" />
//             </span>
//           </h1>

//           <p className="text-lg md:text-xl mb-6 text-white/90 max-w-3xl leading-relaxed">
//             From exotic cruises to corporate events, visa services to once-in-a-lifetime vacations –
//             craft your journey with{" "}
//             <span className="font-semibold text-brand-red">
//               India&apos;s trusted travel partner.
//             </span>
//           </p>

//           {/* Stats row */}
//           <div className="mb-8 flex flex-wrap gap-6 text-white/90">
//             <div className="flex items-center gap-3">
//               <div className="p-2 rounded-xl bg-white/10 backdrop-blur">
//                 <Globe2 className="w-5 h-5" />
//               </div>
//               <div>
//                 <p className="font-semibold">40+ Countries</p>
//                 <p className="text-white/70 text-sm">
//                   Global destinations
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3">
//               <div className="p-2 rounded-xl bg-white/10 backdrop-blur">
//                 <MapPin className="w-5 h-5" />
//               </div>
//               <div>
//                 <p className="font-semibold">10K+ Travelers</p>
//                 <p className="text-white/70 text-sm">
//                   Happy journeys
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* CTA buttons */}
//           <div className="flex flex-col sm:flex-row gap-4 items-center mb-8">
//             <Button
//               variant="red"
//               size="lg"
//               className="text-base group shadow-lg hover:shadow-xl rounded-full px-8"
//             >
//               Explore Packages
//               <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//             </Button>
//             <Button
//               variant="outline"
//               size="lg"
//               className="text-base bg-background/10 border-white/40 hover:bg-background/30 backdrop-blur-md rounded-full px-7"
//             >
//               Contact Expert
//             </Button>
//           </div>
//         </div>
//       </div>

    
//       {/* Video Controls */}
//       <div className="absolute bottom-20 right-6 md:right-10 z-30 flex items-center gap-3">
//         <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md rounded-full px-4 py-2 border border-white/15 shadow-lg">
//           <button
//             onClick={() => setIsPlaying(!isPlaying)}
//             className="p-2 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center"
//           >
//             {isPlaying ? (
//               <Pause className="w-4 h-4" />
//             ) : (
//               <Play className="w-4 h-4" />
//             )}
//           </button>

//           <div className="flex items-center gap-1">
//             {videoCarousel.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentVideo(index)}
//                 className={`h-1.5 rounded-full transition-all ${
//                   index === currentVideo
//                     ? "bg-brand-red w-6"
//                     : "bg-white/50 hover:bg-white/90 w-2"
//                 }`}
//               />
//             ))}
//           </div>

//           <div className="flex items-center gap-2 ml-1">
//             <button
//               onClick={prevVideo}
//               className="text-[11px] uppercase tracking-[0.2em] text-white/60 hover:text-white"
//             >
//               Prev
//             </button>
//             <span className="h-4 w-px bg-white/20" />
//             <button
//               onClick={nextVideo}
//               className="text-[11px] uppercase tracking-[0.2em] text-white/60 hover:text-white"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Booking Widget - Bottom Section */}
//       <div className="absolute bottom-0 left-0 right-0 z-30">
//         <div className="container mx-auto px-4">
//           <div className="max-w-6xl mx-auto">
//             <div className="relative">
//               <div className="absolute -inset-x-3 -top-4 h-4 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
//               <div className="relative bg-white/95 backdrop-blur-xl rounded-t-2xl rounded-b-none shadow-[0_-10px_30px_rgba(0,0,0,0.4)] border border-white/40 p-4 md:p-5">
//                 <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
//                   {/* Location */}
//                   <div className="flex-1 w-full">
//                     <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-[0.18em]">
//                       Destination
//                     </label>
//                     <div className="relative">
//                       <input 
//                         type="text" 
//                         value={location}
//                         onChange={(e) => setLocation(e.target.value)}
//                         className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
//                       />
//                       <MapPin className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
//                     </div>
//                   </div>

//                   {/* Date Selection */}
//                   <div className="flex-1 w-full">
//                     <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-[0.18em]">
//                       Travel Dates
//                     </label>
//                     <div className="relative">
//                       <input 
//                         type="text" 
//                         value={checkInDate}
//                         onChange={(e) => setCheckInDate(e.target.value)}
//                         className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
//                       />
//                       <Calendar className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
//                     </div>
//                   </div>

//                   {/* Travelers */}
//                   <div className="flex-1 w-full">
//                     <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-[0.18em]">
//                       Travelers
//                     </label>
//                     <div className="relative">
//                       <select 
//                         value={adults}
//                         onChange={(e) => setAdults(parseInt(e.target.value))}
//                         className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none text-sm"
//                       >
//                         {[1, 2, 3, 4, 5, 6].map(num => (
//                           <option key={num} value={num}>{num} {num === 1 ? 'Adult' : 'Adults'}</option>
//                         ))}
//                       </select>
//                       <Users className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
//                     </div>
//                   </div>

//                   {/* Search Button */}
//                   <div className="flex-1 w-full">
//                     <Button
//                       variant="red"
//                       size="lg"
//                       className="w-full text-base py-2.5 rounded-lg flex items-center justify-center gap-2"
//                     >
//                       <Search className="w-5 h-5" />
//                       Search
//                     </Button>
//                   </div>
//                 </div>

             
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Keyframe for shining gradient text */}
//       <style jsx>{`
//         @keyframes shine {
//           0% {
//             background-position: 0% 50%;
//           }
//           50% {
//             background-position: 100% 50%;
//           }
//           100% {
//             background-position: 0% 50%;
//           }
//         }
//         span.animate-[shine_4s_infinite] {
//           background-size: 200% 200%;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default Hero;





// import { Button } from "@/components/ui/button";
// import { ArrowRight, Play, Pause, Sparkles, MapPin, Globe2 } from "lucide-react";
// import { useState, useEffect } from "react";
// import video1 from "../assets/From KlickPin CF Create a Travel Agency Intro Video - MakeWebVideocom [Video] in 2025 _ Travel agency Travel creative Travel video ideas.mp4";

// const Hero = () => {
//   const [currentVideo, setCurrentVideo] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(true);

//   const videoCarousel = [
//     {
//       id: 1,
//       video: video1,
//       thumbnail: "/images/tropical-thumb.jpg",
//       title: "Tropical Paradise",
//       location: "Bali, Maldives, Phuket",
//       tag: "Beach Escapes",
//     },
//     {
//       id: 2,
//       video: "/videos/mountain-adventure.mp4",
//       thumbnail: "https://i.pinimg.com/736x/58/20/85/58208506142b698cda4558b8693fe7be.jpg",
//       title: "Mountain Adventure",
//       location: "Swiss Alps, Himachal",
//       tag: "Adventure Trips",
//     },
//     {
//       id: 3,
//       video: "/videos/city-lights.mp4",
//       thumbnail: "https://i.pinimg.com/736x/58/20/85/58208506142b698cda4558b8693fe7be.jpg",
//       title: "City Lights",
//       location: "Dubai, Singapore",
//       tag: "City Breaks",
//     },
//     {
//       id: 4,
//       video: "/videos/cruise-ship.mp4",
//       thumbnail: "https://i.pinimg.com/736x/58/20/85/58208506142b698cda4558b8693fe7be.jpg",
//       title: "Luxury Cruises",
//       location: "Mediterranean, Europe",
//       tag: "Cruise Holidays",
//     },
//   ];

//   useEffect(() => {
//     if (!isPlaying) return;

//     const interval = setInterval(() => {
//       setCurrentVideo((prev) => (prev + 1) % videoCarousel.length);
//     }, 6000);

//     return () => clearInterval(interval);
//   }, [isPlaying, videoCarousel.length]);

//   const nextVideo = () => {
//     setCurrentVideo((prev) => (prev + 1) % videoCarousel.length);
//   };

//   const prevVideo = () => {
//     setCurrentVideo((prev) => (prev - 1 + videoCarousel.length) % videoCarousel.length);
//   };

//   return (
//     <section className="relative text-primary-foreground overflow-hidden py-10 md:py-14">
//       {/* Background Video Carousel */}
//       <div className="absolute inset-0">
//         {videoCarousel.map((video, index) => (
//           <video
//             key={video.id}
//             className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-out ${
//               index === currentVideo ? "opacity-100" : "opacity-0"
//             }`}
//             autoPlay
//             muted
//             loop
//             playsInline
//             poster={video.thumbnail}
//           >
//             <source src={video.video} type="video/mp4" />
//           </video>
//         ))}

//         {/* Gradient + Vignette Overlays */}
//         <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
//         <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
//         <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.7)]" />
//       </div>

//       {/* Floating destination chips (right side) - desktop only */}
//       <div className="pointer-events-none hidden xl:flex flex-col gap-2.5 absolute right-6 top-1/2 -translate-y-1/2 z-20">
//         {videoCarousel.map((item, index) => (
//           <div
//             key={item.id}
//             className={`pointer-events-auto flex items-center gap-3 rounded-full px-4 py-1.5 backdrop-blur-md border text-[11px] font-medium transition-all cursor-pointer
//               ${
//                 index === currentVideo
//                   ? "bg-white/15 border-brand-red/60 shadow-lg scale-105"
//                   : "bg-black/35 border-white/10 hover:border-white/40 hover:bg-white/10"
//               }`}
//             onClick={() => setCurrentVideo(index)}
//           >
//             <div
//               className={`w-2 h-2 rounded-full ${
//                 index === currentVideo ? "bg-brand-red" : "bg-white/50"
//               }`}
//             />
//             <span className="uppercase tracking-wide">{item.tag}</span>
//           </div>
//         ))}
//       </div>

//       {/* Foreground Content */}
//       <div className="relative z-20">
//         <div className="container mx-auto px-4">
//           <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start lg:items-center gap-8 md:gap-10 min-h-[320px]">
//             {/* Left: Heading & Actions */}
//             <div className="max-w-3xl">
//               {/* Badge row */}
//               <div className="mb-4 flex flex-wrap items-center gap-3">
//                 <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-red/90 backdrop-blur-sm rounded-full text-[11px] font-semibold uppercase tracking-[0.18em] shadow-lg border border-white/20">
//                   <span className="relative flex h-2 w-2">
//                     <span className="absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75 animate-ping" />
//                     <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
//                   </span>
//                   Premium Travel Experiences
//                 </span>
//                 <div className="flex items-center gap-2 text-[11px] text-white/80">
//                   <Sparkles className="w-4 h-4" />
//                   <span>Curated by experts • 24x7 Support</span>
//                 </div>
//               </div>

//               <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 leading-tight tracking-tight drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)]">
//                 Discover Your Next{" "}
//                 <span className="relative inline-block">
//                   <span className="relative z-10 bg-gradient-to-r from-brand-red via-orange-400 to-yellow-300 bg-clip-text text-transparent">
//                     Adventure
//                   </span>
//                   <span className="absolute -inset-1 rounded-full bg-brand-red/20 blur-xl opacity-60" />
//                 </span>
//               </h1>

//               <p className="text-sm md:text-base lg:text-lg mb-5 md:mb-6 text-primary-foreground/90 max-w-2xl leading-relaxed">
//                 From exotic cruises to corporate events, visa services to once-in-a-lifetime vacations –
//                 craft your journey with{" "}
//                 <span className="font-semibold text-brand-red">
//                   India&apos;s trusted travel partner.
//                 </span>
//               </p>

//               {/* Stats row */}
//               <div className="mb-5 flex flex-wrap gap-4 text-sm md:text-base text-white/90">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 rounded-xl bg-white/10 backdrop-blur">
//                     <Globe2 className="w-5 h-5" />
//                   </div>
//                   <div>
//                     <p className="font-semibold">40+ Countries</p>
//                     <p className="text-white/70 text-xs md:text-sm">
//                       Handpicked global destinations
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 rounded-xl bg-white/10 backdrop-blur">
//                     <MapPin className="w-5 h-5" />
//                   </div>
//                   <div>
//                     <p className="font-semibold">10K+ Travelers</p>
//                     <p className="text-white/70 text-xs md:text-sm">
//                       Happy stories & repeat bookings
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* CTA buttons */}
//               <div className="flex flex-col sm:flex-row gap-3 items-center">
//                 <Button
//                   variant="red"
//                   size="lg"
//                   className="text-sm md:text-base group shadow-[0_12px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.65)] rounded-full px-7"
//                 >
//                   Explore Packages
//                   <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 </Button>
//                 <Button
//                   variant="outline"
//                   size="lg"
//                   className="text-sm md:text-base bg-background/10 border-primary-foreground/40 hover:bg-background/30 backdrop-blur-md rounded-full px-7"
//                 >
//                   Contact Travel Expert
//                 </Button>
//               </div>
//             </div>

//             {/* Right: Current Destination Card */}
//             <div className="hidden lg:block flex-1">
//               <div className="relative max-w-sm ml-auto">
//                 <div className="absolute -inset-0.5 bg-gradient-to-br from-brand-red/80 via-orange-400/70 to-yellow-300/80 rounded-3xl opacity-70 blur-lg" />
//                 <div className="relative bg-black/45 border border-white/18 rounded-3xl p-4 backdrop-blur-2xl shadow-2xl">
//                   <div className="flex items-center justify-between mb-3">
//                     <p className="text-[11px] uppercase tracking-[0.2em] text-white/60">
//                       Now Featuring
//                     </p>
//                     <span className="text-[10px] px-3 py-1 rounded-full bg-white/10 text-white/80 border border-white/15">
//                       {videoCarousel[currentVideo].tag}
//                     </span>
//                   </div>

//                   <p className="text-lg font-semibold mb-1">
//                     {videoCarousel[currentVideo].title}
//                   </p>
//                   <p className="text-xs md:text-sm text-white/70 mb-3">
//                     {videoCarousel[currentVideo].location}
//                   </p>

//                   <div className="grid grid-cols-2 gap-3 text-[11px] text-white/80 mb-3">
//                     <div className="bg-white/5 rounded-2xl px-3 py-2 border border-white/10">
//                       <p className="font-semibold">Best Season</p>
//                       <p className="text-white/65 mt-1">Nov – Mar</p>
//                     </div>
//                     <div className="bg-white/5 rounded-2xl px-3 py-2 border border-white/10">
//                       <p className="font-semibold">Ideal For</p>
//                       <p className="text-white/65 mt-1">Couples & Families</p>
//                     </div>
//                   </div>

//                   <Button
//                     variant="outline"
//                     size="sm"
//                     className="w-full justify-center bg-white/5 border-white/40 hover:bg-white/15 rounded-full text-[11px]"
//                   >
//                     View Sample Itinerary
//                     <ArrowRight className="ml-2 w-4 h-4" />
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Video Controls - compact, under hero content */}
//           <div className="mt-5 flex justify-end">
//             <div className="flex flex-col md:flex-row items-start md:items-center gap-3 bg-black/60 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/15 shadow-lg max-w-md">
//               {/* Current slide info */}
//               <div className="flex flex-col min-w-[160px]">
//                 <span className="text-[10px] uppercase tracking-[0.25em] text-white/60 mb-1">
//                   Destination
//                 </span>
//                 <span className="text-sm font-semibold">
//                   {videoCarousel[currentVideo].title}
//                 </span>
//                 <span className="text-[11px] text-white/70">
//                   {videoCarousel[currentVideo].location}
//                 </span>
//               </div>

//               <div className="flex items-center gap-3">
//                 <button
//                   onClick={() => setIsPlaying(!isPlaying)}
//                   className="p-2 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center"
//                 >
//                   {isPlaying ? (
//                     <Pause className="w-4 h-4" />
//                   ) : (
//                     <Play className="w-4 h-4" />
//                   )}
//                 </button>

//                 <div className="flex items-center gap-1">
//                   {videoCarousel.map((_, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setCurrentVideo(index)}
//                       className={`h-1.5 rounded-full transition-all ${
//                         index === currentVideo
//                           ? "bg-brand-red w-6"
//                           : "bg-white/50 hover:bg-white/90 w-2"
//                       }`}
//                     />
//                   ))}
//                 </div>

//                 <div className="flex items-center gap-2 ml-1">
//                   <button
//                     onClick={prevVideo}
//                     className="text-[11px] uppercase tracking-[0.2em] text-white/60 hover:text-white"
//                   >
//                     Prev
//                   </button>
//                   <span className="h-4 w-px bg-white/20" />
//                   <button
//                     onClick={nextVideo}
//                     className="text-[11px] uppercase tracking-[0.2em] text-white/60 hover:text-white"
//                   >
//                     Next
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;




// import { Button } from "@/components/ui/button";
// import { ArrowRight, Play, Pause, Sparkles, MapPin, Globe2, Search, Calendar, Users } from "lucide-react";
// import { useState, useEffect } from "react";
// import video1 from "../assets/From KlickPin CF Create a Travel Agency Intro Video - MakeWebVideocom [Video] in 2025 _ Travel agency Travel creative Travel video ideas.mp4";

// const Hero = () => {
//   const [currentVideo, setCurrentVideo] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(true);
//   const [location, setLocation] = useState("Singapore");
//   const [checkInDate, setCheckInDate] = useState("27 - Nov - 2025");
//   const [nights, setNights] = useState(4);
//   const [adults, setAdults] = useState(2);

//   const videoCarousel = [
//     {
//       id: 1,
//       video: video1,
//       thumbnail: "/images/tropical-thumb.jpg",
//       title: "Tropical Paradise",
//       location: "Bali, Maldives, Phuket",
//       tag: "Beach Escapes",
//     },
//     {
//       id: 2,
//       video: "/videos/mountain-adventure.mp4",
//       thumbnail: "https://i.pinimg.com/736x/58/20/85/58208506142b698cda4558b8693fe7be.jpg",
//       title: "Mountain Adventure",
//       location: "Swiss Alps, Himachal",
//       tag: "Adventure Trips",
//     },
//     {
//       id: 3,
//       video: "/videos/city-lights.mp4",
//       thumbnail: "https://i.pinimg.com/736x/58/20/85/58208506142b698cda4558b8693fe7be.jpg",
//       title: "City Lights",
//       location: "Dubai, Singapore",
//       tag: "City Breaks",
//     },
//     {
//       id: 4,
//       video: "/videos/cruise-ship.mp4",
//       thumbnail: "https://i.pinimg.com/736x/58/20/85/58208506142b698cda4558b8693fe7be.jpg",
//       title: "Luxury Cruises",
//       location: "Mediterranean, Europe",
//       tag: "Cruise Holidays",
//     },
//   ];

//   useEffect(() => {
//     if (!isPlaying) return;

//     const interval = setInterval(() => {
//       setCurrentVideo((prev) => (prev + 1) % videoCarousel.length);
//     }, 6000);

//     return () => clearInterval(interval);
//   }, [isPlaying, videoCarousel.length]);

//   const nextVideo = () => {
//     setCurrentVideo((prev) => (prev + 1) % videoCarousel.length);
//   };

//   const prevVideo = () => {
//     setCurrentVideo((prev) => (prev - 1 + videoCarousel.length) % videoCarousel.length);
//   };

//   return (
//     <section className="relative h-[70vh] min-h-[500px] text-white overflow-hidden">
//       {/* Background Video Carousel */}
//       <div className="absolute inset-0">
//         {videoCarousel.map((video, index) => (
//           <video
//             key={video.id}
//             className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-out ${
//               index === currentVideo ? "opacity-100" : "opacity-0"
//             }`}
//             autoPlay
//             muted
//             loop
//             playsInline
//             poster={video.thumbnail}
//           >
//             <source src={video.video} type="video/mp4" />
//           </video>
//         ))}

//         {/* Gradient Overlays */}
//         <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
//         <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
//       </div>

//       {/* Floating destination chips (right side) */}
//       <div className="hidden lg:flex flex-col gap-3 absolute right-6 top-1/4 z-30">
//         {videoCarousel.map((item, index) => (
//           <div
//             key={item.id}
//             className={`flex items-center gap-3 rounded-full px-4 py-2 backdrop-blur-md border text-xs font-medium transition-all cursor-pointer ${
//               index === currentVideo
//                 ? "bg-white/15 border-brand-red/60 shadow-lg scale-105"
//                 : "bg-black/35 border-white/10 hover:border-white/40 hover:bg-white/10"
//             }`}
//             onClick={() => setCurrentVideo(index)}
//           >
//             <div
//               className={`w-2 h-2 rounded-full ${
//                 index === currentVideo ? "bg-brand-red" : "bg-white/50"
//               }`}
//             />
//             <span className="uppercase tracking-wide">{item.tag}</span>
//           </div>
//         ))}
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 relative z-20 h-full flex flex-col justify-center pt-6">
//         <div className="max-w-4xl">
//           {/* Badge row */}
//           <div className="mb-3 flex flex-wrap items-center gap-3">
//             <span className="inline-flex items-center gap-2 px-4 py-2 bg-brand-red/90 backdrop-blur-sm rounded-full text-sm font-semibold uppercase tracking-[0.18em] shadow-lg border border-white/20">
//               <span className="relative flex h-2 w-2">
//                 <span className="absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75 animate-ping" />
//                 <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
//               </span>
//               Premium Travel Experiences
//             </span>
//             <div className="flex items-center gap-2 text-sm text-white/80">
//               <Sparkles className="w-4 h-4" />
//               <span>Curated by travel experts • 24x7 Support</span>
//             </div>
//           </div>

//           <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight tracking-tight">
//             Discover Your Next{" "}
//             <span className="relative inline-block">
//               <span className="relative z-10 bg-gradient-to-r from-brand-red via-orange-400 to-yellow-300 bg-clip-text text-transparent animate-[shine_4s_infinite]">
//                 Adventure
//               </span>
//               <span className="absolute -inset-1 rounded-full bg-brand-red/20 blur-xl opacity-60" />
//             </span>
//           </h1>

//           <p className="text-base md:text-lg mb-4 text-white/90 max-w-3xl leading-relaxed">
//             From exotic cruises to corporate events, visa services to once-in-a-lifetime vacations –
//             craft your journey with{" "}
//             <span className="font-semibold text-brand-red">
//               India&apos;s trusted travel partner.
//             </span>
//           </p>

//           {/* Stats row */}
//           <div className="mb-6 flex flex-wrap gap-6 text-white/90">
//             <div className="flex items-center gap-3">
//               <div className="p-2 rounded-xl bg-white/10 backdrop-blur">
//                 <Globe2 className="w-5 h-5" />
//               </div>
//               <div>
//                 <p className="font-semibold">40+ Countries</p>
//                 <p className="text-white/70 text-sm">
//                   Global destinations
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3">
//               <div className="p-2 rounded-xl bg-white/10 backdrop-blur">
//                 <MapPin className="w-5 h-5" />
//               </div>
//               <div>
//                 <p className="font-semibold">10K+ Travelers</p>
//                 <p className="text-white/70 text-sm">
//                   Happy journeys
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* CTA buttons */}
//           <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
//             <Button
//               variant="red"
//               size="lg"
//               className="text-base group shadow-lg hover:shadow-xl rounded-full px-8"
//             >
//               Explore Packages
//               <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//             </Button>
//             <Button
//               variant="outline"
//               size="lg"
//               className="text-base bg-background/10 border-white/40 hover:bg-background/30 backdrop-blur-md rounded-full px-7"
//             >
//               Contact Expert
//             </Button>
//           </div>
//         </div>
//       </div>

    
//       {/* Video Controls */}
//       <div className="absolute bottom-16 right-6 md:right-10 z-30 flex items-center gap-3">
//         <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md rounded-full px-4 py-2 border border-white/15 shadow-lg">
//           <button
//             onClick={() => setIsPlaying(!isPlaying)}
//             className="p-2 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center"
//           >
//             {isPlaying ? (
//               <Pause className="w-4 h-4" />
//             ) : (
//               <Play className="w-4 h-4" />
//             )}
//           </button>

//           <div className="flex items-center gap-1">
//             {videoCarousel.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentVideo(index)}
//                 className={`h-1.5 rounded-full transition-all ${
//                   index === currentVideo
//                     ? "bg-brand-red w-6"
//                     : "bg-white/50 hover:bg-white/90 w-2"
//                 }`}
//               />
//             ))}
//           </div>

//           <div className="flex items-center gap-2 ml-1">
//             <button
//               onClick={prevVideo}
//               className="text-[11px] uppercase tracking-[0.2em] text-white/60 hover:text-white"
//             >
//               Prev
//             </button>
//             <span className="h-4 w-px bg-white/20" />
//             <button
//               onClick={nextVideo}
//               className="text-[11px] uppercase tracking-[0.2em] text-white/60 hover:text-white"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Booking Widget - Bottom Section */}
//       <div className="absolute bottom-0 left-0 right-0 z-30">
//         <div className="container mx-auto px-4">
//           <div className="max-w-6xl mx-auto">
//             <div className="relative">
//               <div className="absolute -inset-x-3 -top-4 h-4 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
//               <div className="relative bg-white/95 backdrop-blur-xl rounded-t-2xl rounded-b-none shadow-[0_-10px_30px_rgba(0,0,0,0.4)] border border-white/40 p-3 md:p-4">
//                 <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
//                   {/* Location */}
//                   <div className="flex-1 w-full">
//                     <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-[0.18em]">
//                       Destination
//                     </label>
//                     <div className="relative">
//                       <input 
//                         type="text" 
//                         value={location}
//                         onChange={(e) => setLocation(e.target.value)}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
//                       />
//                       <MapPin className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
//                     </div>
//                   </div>

//                   {/* Date Selection */}
//                   <div className="flex-1 w-full">
//                     <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-[0.18em]">
//                       Travel Dates
//                     </label>
//                     <div className="relative">
//                       <input 
//                         type="text" 
//                         value={checkInDate}
//                         onChange={(e) => setCheckInDate(e.target.value)}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
//                       />
//                       <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
//                     </div>
//                   </div>

//                   {/* Travelers */}
//                   <div className="flex-1 w-full">
//                     <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-[0.18em]">
//                       Travelers
//                     </label>
//                     <div className="relative">
//                       <select 
//                         value={adults}
//                         onChange={(e) => setAdults(parseInt(e.target.value))}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none text-sm"
//                       >
//                         {[1, 2, 3, 4, 5, 6].map(num => (
//                           <option key={num} value={num}>{num} {num === 1 ? 'Adult' : 'Adults'}</option>
//                         ))}
//                       </select>
//                       <Users className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
//                     </div>
//                   </div>

//                   {/* Search Button */}
//                   <div className="flex-1 w-full">
//                     <Button
//                       variant="red"
//                       size="lg"
//                       className="w-full text-base py-2 rounded-lg flex items-center justify-center gap-2"
//                     >
//                       <Search className="w-5 h-5" />
//                       Search
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Keyframe for shining gradient text */}
//       <style jsx>{`
//         @keyframes shine {
//           0% {
//             background-position: 0% 50%;
//           }
//           50% {
//             background-position: 100% 50%;
//           }
//           100% {
//             background-position: 0% 50%;
//           }
//         }
//         span.animate-[shine_4s_infinite] {
//           background-size: 200% 200%;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default Hero;



//==========================================================================================================

// import { Button } from "@/components/ui/button";
// import {
//   ArrowRight,
//   Play,
//   Pause,
//   Sparkles,
//   MapPin,
//   Globe2,
//   Calendar,
//   Users,
//   ChevronDown,
// } from "lucide-react";
// import { useState, useEffect } from "react";
// import video1 from "../assets/From KlickPin CF Create a Travel Agency Intro Video - MakeWebVideocom [Video] in 2025 _ Travel agency Travel creative Travel video ideas.mp4";
// import video2 from "../assets/From KlickPin CF maya on Instagram I bought a drone [Video] [Video] in 2025 _ Drone Instagram Visual.mp4"

// const Hero = () => {
//   const [currentVideo, setCurrentVideo] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(true);

//   const videoCarousel = [
//     {
//       id: 1,
//       video: video1,
//       thumbnail: "/images/tropical-thumb.jpg",
//       title: "Tropical Paradise",
//       location: "Bali, Maldives, Phuket",
//       tag: "Beach Escapes",
//     },
//     {
//       id: 2,
//       video: video2,
//       thumbnail:
//         "https://i.pinimg.com/1200x/39/6a/63/396a635958aabba4c27498dbcefa3556.jpg",
//       title: "Mountain Adventure",
//       location: "Swiss Alps, Himachal",
//       tag: "Adventure Trips",
//     },
//     {
//       id: 3,
//       video: "/videos/city-lights.mp4",
//       thumbnail:
//         "https://i.pinimg.com/1200x/e6/35/7e/e6357e46b58a6250eee3ff7b7764fd8a.jpg",
//       title: "City Lights",
//       location: "Dubai, Singapore",
//       tag: "City Breaks",
//     },
//     {
//       id: 4,
//       video: "/videos/cruise-ship.mp4",
//       thumbnail:
//         "https://i.pinimg.com/736x/58/20/85/58208506142b698cda4558b8693fe7be.jpg",
//       title: "Luxury Cruises",
//       location: "Mediterranean, Europe",
//       tag: "Cruise Holidays",
//     },
//   ];

//   useEffect(() => {
//     if (!isPlaying) return;

//     const interval = setInterval(() => {
//       setCurrentVideo((prev) => (prev + 1) % videoCarousel.length);
//     }, 6000);

//     return () => clearInterval(interval);
//   }, [isPlaying, videoCarousel.length]);

//   const nextVideo = () => {
//     setCurrentVideo((prev) => (prev + 1) % videoCarousel.length);
//   };

//   const prevVideo = () => {
//     setCurrentVideo(
//       (prev) => (prev - 1 + videoCarousel.length) % videoCarousel.length
//     );
//   };

//   return (
//     <section className="relative text-primary-foreground overflow-hidden py-10 md:py-14">
//       {/* Background Video Carousel */}
//       <div className="absolute inset-0">
//         {videoCarousel.map((video, index) => (
//           <video
//             key={video.id}
//             className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-out ${
//               index === currentVideo ? "opacity-100" : "opacity-0"
//             }`}
//             autoPlay
//             muted
//             loop
//             playsInline
//             poster={video.thumbnail}
//           >
//             <source src={video.video} type="video/mp4" />
//           </video>
//         ))}

//         {/* Gradient + Vignette Overlays */}
//         <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
//         <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
//         <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.7)]" />
//       </div>

//       {/* Floating destination chips (right side) - desktop only */}
//       <div className="pointer-events-none hidden xl:flex flex-col gap-2.5 absolute right-6 top-1/2 -translate-y-1/2 z-20">
//         {videoCarousel.map((item, index) => (
//           <div
//             key={item.id}
//             className={`pointer-events-auto flex items-center gap-3 rounded-full px-4 py-1.5 backdrop-blur-md border text-[11px] font-medium transition-all cursor-pointer
//               ${
//                 index === currentVideo
//                   ? "bg-white/15 border-brand-red/60 shadow-lg scale-105"
//                   : "bg-black/35 border-white/10 hover:border-white/40 hover:bg-white/10"
//               }`}
//             onClick={() => setCurrentVideo(index)}
//           >
//             <div
//               className={`w-2 h-2 rounded-full ${
//                 index === currentVideo ? "bg-brand-red" : "bg-white/50"
//               }`}
//             />
//             <span className="uppercase tracking-wide">{item.tag}</span>
//           </div>
//         ))}
//       </div>

//       {/* Foreground Content */}
//       <div className="relative z-20">
//         <div className="container mx-auto px-4">
//           <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start lg:items-center gap-8 md:gap-10 min-h-[320px]">
//             {/* Left: Heading & Actions */}
//             <div className="max-w-3xl">
//               {/* Badge row */}
//               <div className="mb-4 flex flex-wrap items-center gap-3">
//                 <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-red/90 backdrop-blur-sm rounded-full text-[11px] font-semibold uppercase tracking-[0.18em] shadow-lg border border-white/20">
//                   <span className="relative flex h-2 w-2">
//                     <span className="absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75 animate-ping" />
//                     <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
//                   </span>
//                   Premium Travel Experiences
//                 </span>
//                 <div className="flex items-center gap-2 text-[11px] text-white/80">
//                   <Sparkles className="w-4 h-4" />
//                   <span>Curated by experts • 24x7 Support</span>
//                 </div>
//               </div>

//               <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 leading-tight tracking-tight drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)]">
//                 Discover Your Next{" "}
//                 <span className="relative inline-block">
//                   <span className="relative z-10 bg-gradient-to-r from-brand-red via-orange-400 to-yellow-300 bg-clip-text text-transparent">
//                     Adventure
//                   </span>
//                   <span className="absolute -inset-1 rounded-full bg-brand-red/20 blur-xl opacity-60" />
//                 </span>
//               </h1>

//               <p className="text-sm md:text-base lg:text-lg mb-5 md:mb-6 text-primary-foreground/90 max-w-2xl leading-relaxed">
//                 From exotic cruises to corporate events, visa services to
//                 once-in-a-lifetime vacations – craft your journey with{" "}
//                 <span className="font-semibold text-brand-red">
//                   India&apos;s trusted travel partner.
//                 </span>
//               </p>

//               {/* Stats row */}
//               <div className="mb-5 flex flex-wrap gap-4 text-sm md:text-base text-white/90">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 rounded-xl bg-white/10 backdrop-blur">
//                     <Globe2 className="w-5 h-5" />
//                   </div>
//                   <div>
//                     <p className="font-semibold">40+ Countries</p>
//                     <p className="text-white/70 text-xs md:text-sm">
//                       Handpicked global destinations
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 rounded-xl bg-white/10 backdrop-blur">
//                     <MapPin className="w-5 h-5" />
//                   </div>
//                   <div>
//                     <p className="font-semibold">10K+ Travelers</p>
//                     <p className="text-white/70 text-xs md:text-sm">
//                       Happy stories & repeat bookings
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* CTA buttons */}
//               <div className="flex flex-col sm:flex-row gap-3 items-center">
//                 <Button
//                   variant="red"
//                   size="lg"
//                   className="text-sm md:text-base group shadow-[0_12px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.65)] rounded-full px-7"
//                 >
//                   Explore Packages
//                   <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 </Button>
//                 <Button
//                   variant="outline"
//                   size="lg"
//                   className="text-sm md:text-base bg-background/10 border-primary-foreground/40 hover:bg-background/30 backdrop-blur-md rounded-full px-7"
//                 >
//                   Contact Travel Expert
//                 </Button>
//               </div>
//             </div>

            
            
//           </div>

//           {/* Video Controls - compact, under hero content */}
//           <div className="mt-5 flex justify-end">
//             <div className="flex flex-col md:flex-row items-start md:items-center gap-3 bg-black/60 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/15 shadow-lg max-w-md">
//               {/* Current slide info */}
//               <div className="flex flex-col min-w-[160px]">
//                 <span className="text-[10px] uppercase tracking-[0.25em] text-white/60 mb-1">
//                   Destination
//                 </span>
//                 <span className="text-sm font-semibold">
//                   {videoCarousel[currentVideo].title}
//                 </span>
//                 <span className="text-[11px] text-white/70">
//                   {videoCarousel[currentVideo].location}
//                 </span>
//               </div>

//               <div className="flex items-center gap-3">
//                 <button
//                   onClick={() => setIsPlaying(!isPlaying)}
//                   className="p-2 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center"
//                 >
//                   {isPlaying ? (
//                     <Pause className="w-4 h-4" />
//                   ) : (
//                     <Play className="w-4 h-4" />
//                   )}
//                 </button>

//                 <div className="flex items-center gap-1">
//                   {videoCarousel.map((_, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setCurrentVideo(index)}
//                       className={`h-1.5 rounded-full transition-all ${
//                         index === currentVideo
//                           ? "bg-brand-red w-6"
//                           : "bg-white/50 hover:bg-white/90 w-2"
//                       }`}
//                     />
//                   ))}
//                 </div>

//                 <div className="flex items-center gap-2 ml-1">
//                   <button
//                     onClick={prevVideo}
//                     className="text-[11px] uppercase tracking-[0.2em] text-white/60 hover:text-white"
//                   >
//                     Prev
//                   </button>
//                   <span className="h-4 w-px bg-white/20" />
//                   <button
//                     onClick={nextVideo}
//                     className="text-[11px] uppercase tracking-[0.2em] text-white/60 hover:text-white"
//                   >
//                     Next
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* ===== Search Bar (like your screenshot) ===== */}
//           <div className="mt-6 md:mt-8">
//             <div className="max-w-5xl mx-auto">
//               <div className="bg-white text-gray-900 rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.35)] border border-gray-200 px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-4 overflow-x-auto">
//                 {/* Location */}
//                 <div className="flex items-center gap-2 md:gap-3 px-2 md:px-3 flex-1 min-w-[150px]">
//                   <MapPin className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
//                   <div className="flex flex-col">
//                     <span className="text-xs text-gray-400 hidden md:inline">
//                       Destination
//                     </span>
//                     <span className="text-sm md:text-base text-gray-400">
//                       Search for &quot;Sydney&quot;
//                     </span>
//                   </div>
//                 </div>

//                 {/* Divider */}
//                 <div className="hidden md:block h-10 w-px bg-gray-200" />

//                 {/* Dates */}
//                 <div className="flex items-center gap-2 md:gap-3 px-2 md:px-3 flex-none">
//                   <Calendar className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
//                   <div className="flex flex-col">
//                     <span className="text-xs text-gray-400 hidden md:inline">
//                       Check-in
//                     </span>
//                     <span className="text-sm md:text-base font-medium text-gray-900">
//                       27-Nov-2025
//                     </span>
//                   </div>
//                   <span className="hidden md:inline text-sm text-gray-500 ml-2">
//                     4 nights
//                   </span>
//                 </div>

//                 {/* Divider */}
//                 <div className="hidden md:block h-10 w-px bg-gray-200" />

//                 {/* Travellers */}
//                 <div className="flex items-center gap-2 md:gap-3 px-2 md:px-3 flex-none">
//                   <Users className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
//                   <div className="flex flex-col">
//                     <span className="text-xs text-gray-400 hidden md:inline">
//                       Travelers
//                     </span>
//                     <span className="text-sm md:text-base text-gray-900">
//                       2 Adults, 0 Child, 0 Infants
//                     </span>
//                   </div>
//                   <ChevronDown className="w-4 h-4 text-gray-500 ml-1" />
//                 </div>

//                 {/* Search button */}
//                 <div className="ml-auto pl-2 md:pl-4 flex-none">
//                   <Button
//                     variant="red"
//                     className="rounded-full px-6 md:px-8 h-10 md:h-11 text-sm md:text-base font-semibold"
//                   >
//                     Search
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* ===== End Search Bar ===== */}
//         </div>
//       </div>

//       {/* Bottom Wave */}
//       <div className="absolute bottom-0 left-0 right-0">
//         <svg className="w-full h-16 md:h-24 fill-background" viewBox="0 0 1440 120" preserveAspectRatio="none">
//           <path d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
//         </svg>
//       </div>
//     </section>
//   );
// };

// export default Hero;
//=====================================================================================================




// import { Button } from "@/components/ui/button";
// import {
//   ArrowRight,
//   Play,
//   Pause,
//   MapPin,
//   Calendar,
//   Users,
//   ChevronDown,
//   Search,
//   Star,
//   Shield
// } from "lucide-react";
// import { useState, useEffect } from "react";
// import video1 from "../assets/From KlickPin CF Create a Travel Agency Intro Video - MakeWebVideocom [Video] in 2025 _ Travel agency Travel creative Travel video ideas.mp4";
// import video2 from "../assets/From KlickPin CF maya on Instagram I bought a drone [Video] [Video] in 2025 _ Drone Instagram Visual.mp4"

// const Hero = () => {
//   const [currentVideo, setCurrentVideo] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(true);
//   const [searchData, setSearchData] = useState({
//     destination: "",
//     checkIn: "",
//     travelers: "2 Adults"
//   });

//   const videoCarousel = [
//     {
//       id: 1,
//       video: video1,
//       title: "Tropical Paradise",
//       location: "Bali, Maldives, Phuket",
//       tag: "Beach"
//     },
//     {
//       id: 2,
//       video: video2,
//       title: "Mountain Adventure", 
//       location: "Swiss Alps, Himachal",
//       tag: "Adventure"
//     },
//     {
//       id: 3,
//       video: video1,
//       title: "City Lights",
//       location: "Dubai, Singapore", 
//       tag: "Urban"
//     },
//   ];

//   useEffect(() => {
//     if (!isPlaying) return;

//     const interval = setInterval(() => {
//       setCurrentVideo((prev) => (prev + 1) % videoCarousel.length);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [isPlaying, videoCarousel.length]);

//   // Set default date
//   useEffect(() => {
//     const nextWeek = new Date();
//     nextWeek.setDate(nextWeek.getDate() + 7);
//     setSearchData(prev => ({
//       ...prev,
//       checkIn: nextWeek.toISOString().split('T')[0]
//     }));
//   }, []);

//   const handleSearch = () => {
//     console.log("Searching:", searchData);
//     alert(`Searching ${searchData.destination || "destinations"} for ${searchData.travelers}`);
//   };

//   return (
//     <section className="relative text-white overflow-hidden min-h-[80vh] flex items-center">
//       {/* Background Video Carousel */}
//       <div className="absolute inset-0">
//         {videoCarousel.map((video, index) => (
//           <video
//             key={video.id}
//             className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-out ${
//               index === currentVideo ? "opacity-100" : "opacity-0"
//             }`}
//             autoPlay
//             muted
//             loop
//             playsInline
//           >
//             <source src={video.video} type="video/mp4" />
//           </video>
//         ))}

//         {/* Gradient Overlays */}
//         <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
//       </div>

//       {/* Content */}
//       <div className="relative z-20 w-full py-12">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
            
//             {/* Left Content - Compact */}
//             <div className="space-y-6">
//               {/* Trust Badge */}
//               <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-lg border border-white/20 rounded-full text-sm">
//                 <Shield className="w-4 h-4 text-cyan-400" />
//                 <span>Trusted by 50K+ Travelers</span>
//                 <div className="flex items-center gap-1 ml-2">
//                   {[1, 2, 3, 4, 5].map((star) => (
//                     <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
//                   ))}
//                 </div>
//               </div>

//               {/* Main Heading */}
//               <div>
//                 <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
//                   Discover Your
//                   <br />
//                   <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
//                     Perfect Journey
//                   </span>
//                 </h1>
//                 <p className="text-lg text-white/80 max-w-md leading-relaxed">
//                   Curated travel experiences across 40+ countries. 
//                   <span className="text-cyan-300 font-semibold"> Your adventure starts here.</span>
//                 </p>
//               </div>

//               {/* Stats */}
//               <div className="flex gap-6 text-sm">
//                 <div>
//                   <div className="text-2xl font-bold text-cyan-400">40+</div>
//                   <div className="text-white/70">Countries</div>
//                 </div>
//                 <div>
//                   <div className="text-2xl font-bold text-blue-400">10K+</div>
//                   <div className="text-white/70">Travelers</div>
//                 </div>
//                 <div>
//                   <div className="text-2xl font-bold text-purple-400">24/7</div>
//                   <div className="text-white/70">Support</div>
//                 </div>
//               </div>

//               {/* CTA Buttons */}
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <Button className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300">
//                   Explore Packages
//                   <ArrowRight className="ml-2 w-4 h-4" />
//                 </Button>
//                 <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 backdrop-blur px-6 py-3 rounded-lg">
//                   Custom Plan
//                 </Button>
//               </div>
//             </div>

//             {/* Right Side - Search & Video Controls */}
//             <div className="space-y-6">
//               {/* Search Bar */}
//               <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-white/20">
//                 <div className="space-y-4">
//                   <div className="flex items-center gap-3 group">
//                     <MapPin className="w-5 h-5 text-cyan-600" />
//                     <input
//                       type="text"
//                       placeholder="Where do you want to go?"
//                       className="flex-1 border-none outline-none bg-transparent text-gray-800 font-medium placeholder-gray-500"
//                       value={searchData.destination}
//                       onChange={(e) => setSearchData(prev => ({...prev, destination: e.target.value}))}
//                     />
//                   </div>

//                   <div className="flex gap-4">
//                     <div className="flex items-center gap-3 group flex-1">
//                       <Calendar className="w-5 h-5 text-blue-600" />
//                       <input
//                         type="date"
//                         className="flex-1 border-none outline-none bg-transparent text-gray-800 font-medium"
//                         value={searchData.checkIn}
//                         onChange={(e) => setSearchData(prev => ({...prev, checkIn: e.target.value}))}
//                       />
//                     </div>

//                     <div className="flex items-center gap-3 group flex-1">
//                       <Users className="w-5 h-5 text-purple-600" />
//                       <select 
//                         className="flex-1 border-none outline-none bg-transparent text-gray-800 font-medium"
//                         value={searchData.travelers}
//                         onChange={(e) => setSearchData(prev => ({...prev, travelers: e.target.value}))}
//                       >
//                         <option>1 Adult</option>
//                         <option>2 Adults</option>
//                         <option>2 Adults, 1 Child</option>
//                         <option>Family</option>
//                       </select>
//                       <ChevronDown className="w-4 h-4 text-gray-500" />
//                     </div>
//                   </div>

//                   <Button 
//                     onClick={handleSearch}
//                     className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
//                   >
//                     <Search className="w-4 h-4 mr-2" />
//                     Search Packages
//                   </Button>
//                 </div>
//               </div>

//               {/* Video Controls */}
//               <div className="bg-black/60 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-4">
//                     <button
//                       onClick={() => setIsPlaying(!isPlaying)}
//                       className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
//                     >
//                       {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
//                     </button>
//                     <div>
//                       <div className="font-semibold text-sm">{videoCarousel[currentVideo].title}</div>
//                       <div className="text-white/70 text-xs flex items-center gap-1">
//                         <MapPin className="w-3 h-3" />
//                         {videoCarousel[currentVideo].location}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-2">
//                     {videoCarousel.map((_, index) => (
//                       <button
//                         key={index}
//                         onClick={() => setCurrentVideo(index)}
//                         className={`w-2 h-2 rounded-full transition-all ${
//                           index === currentVideo ? "bg-cyan-400" : "bg-white/40 hover:bg-white/60"
//                         }`}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Wave */}
//       <div className="absolute bottom-0 left-0 right-0">
//         <svg className="w-full h-12 fill-white" viewBox="0 0 1440 80" preserveAspectRatio="none">
//           <path d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,80L1392,80C1344,80,1248,80,1152,80C1056,80,960,80,864,80C768,80,672,80,576,80C480,80,384,80,288,80C192,80,96,80,48,80L0,80Z" />
//         </svg>
//       </div>
//     </section>
//   );
// };

// export default Hero;




// import { Button } from "@/components/ui/button";
// import {
//   ArrowRight,
//   Play,
//   Pause,
//   MapPin,
//   Calendar,
//   Users,
//   Search,
//   ChevronDown
// } from "lucide-react";
// import { useState, useEffect } from "react";
// import video1 from "../assets/video1 (1).mp4";
// import video2 from "../assets/From KlickPin CF maya on Instagram I bought a drone [Video] [Video] in 2025 _ Drone Instagram Visual.mp4"

// const Hero = () => {
//   const [currentVideo, setCurrentVideo] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(true);
//   const [searchData, setSearchData] = useState({
//     destination: "",
//     checkIn: "",
//     travelers: "2 Adults"
//   });

//   const videoCarousel = [
//     {
//       id: 1,
//       video: video1,
//       title: "Tropical Paradise",
//       location: "Bali, Maldives"
//     },
//     {
//       id: 2,
//       video: video2,
//       title: "Mountain Adventure", 
//       location: "Swiss Alps"
//     },
//     {
//       id: 3,
//       video: video1,
//       title: "Urban Explorer",
//       location: "Dubai, Singapore"
//     },
//   ];

//   useEffect(() => {
//     if (!isPlaying) return;
//     const interval = setInterval(() => {
//       setCurrentVideo((prev) => (prev + 1) % videoCarousel.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [isPlaying, videoCarousel.length]);

//   useEffect(() => {
//     const nextWeek = new Date();
//     nextWeek.setDate(nextWeek.getDate() + 7);
//     setSearchData(prev => ({
//       ...prev,
//       checkIn: nextWeek.toISOString().split('T')[0]
//     }));
//   }, []);

//   const handleSearch = () => {
//     console.log("Searching:", searchData);
//   };

//   return (
//     <section className="relative text-white overflow-hidden min-h-[70vh] flex items-center">
//       {/* Background Video */}
//       <div className="absolute inset-0">
//         {videoCarousel.map((video, index) => (
//           <video
//             key={video.id}
//             className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
//               index === currentVideo ? "opacity-100" : "opacity-0"
//             }`}
//             autoPlay
//             muted
//             loop
//             playsInline
//           >
//             <source src={video.video} type="video/mp4" />
//           </video>
//         ))}
//         <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
//       </div>

//       {/* Content */}
//       <div className="relative z-20 w-full">
//         <div className="container mx-auto px-4">
//           {/* Main Horizontal Layout */}
//           <div className="flex flex-col lg:flex-row items-start justify-between gap-8 max-w-6xl mx-auto">
            
//             {/* Left Content - Compact */}
//             <div className="flex-1 max-w-2xl space-y-6">
//               <div>
//                 <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
//                   Discover
//                   <br />
//                   <span className="text-cyan-400">Extraordinary</span>
//                   <br />
//                   Journeys
//                 </h1>
//                 <p className="text-white/80 text-lg max-w-md">
//                   Curated travel experiences across 40+ countries with premium service.
//                 </p>
//               </div>

//               {/* Stats Row */}
//               <div className="flex gap-6 text-sm">
//                 <div>
//                   <div className="text-cyan-400 font-bold">40+</div>
//                   <div className="text-white/70">Countries</div>
//                 </div>
//                 <div>
//                   <div className="text-blue-400 font-bold">10K+</div>
//                   <div className="text-white/70">Travelers</div>
//                 </div>
//                 <div>
//                   <div className="text-green-400 font-bold">24/7</div>
//                   <div className="text-white/70">Support</div>
//                 </div>
//               </div>
//             </div>

//             {/* Right Side - Compact Search & Controls */}
//             <div className="w-full lg:w-auto space-y-4">
//               {/* Search Bar - Single Line */}
//               <div className="bg-white rounded-2xl p-4 shadow-2xl min-w-[400px]">
//                 <div className="flex items-center gap-4">
//                   {/* Destination */}
//                   <div className="flex items-center gap-2 flex-1">
//                     <MapPin className="w-4 h-4 text-cyan-600" />
//                     <input
//                       type="text"
//                       placeholder="Destination"
//                       className="flex-1 border-none outline-none bg-transparent text-gray-800 text-sm font-medium placeholder-gray-500 min-w-0"
//                       value={searchData.destination}
//                       onChange={(e) => setSearchData(prev => ({...prev, destination: e.target.value}))}
//                     />
//                   </div>

//                   <div className="h-6 w-px bg-gray-300" />

//                   {/* Date */}
//                   <div className="flex items-center gap-2 flex-1">
//                     <Calendar className="w-4 h-4 text-blue-600" />
//                     <input
//                       type="date"
//                       className="flex-1 border-none outline-none bg-transparent text-gray-800 text-sm font-medium min-w-0"
//                       value={searchData.checkIn}
//                       onChange={(e) => setSearchData(prev => ({...prev, checkIn: e.target.value}))}
//                     />
//                   </div>

//                   <div className="h-6 w-px bg-gray-300" />

//                   {/* Travelers */}
//                   <div className="flex items-center gap-2 flex-1">
//                     <Users className="w-4 h-4 text-purple-600" />
//                     <select 
//                       className="flex-1 border-none outline-none bg-transparent text-gray-800 text-sm font-medium appearance-none min-w-0"
//                       value={searchData.travelers}
//                       onChange={(e) => setSearchData(prev => ({...prev, travelers: e.target.value}))}
//                     >
//                       <option>1 Adult</option>
//                       <option>2 Adults</option>
//                       <option>2 Adults, 1 Child</option>
//                     </select>
//                     <ChevronDown className="w-3 h-3 text-gray-500" />
//                   </div>

//                   {/* Search Button */}
//                   <Button 
//                     onClick={handleSearch}
//                     className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-colors"
//                   >
//                     <Search className="w-4 h-4" />
//                   </Button>
//                 </div>
//               </div>

//               {/* Video Controls - Compact */}
//               <div className="flex items-center justify-between bg-black/40 backdrop-blur-lg rounded-2xl p-3 border border-white/20">
//                 <div className="flex items-center gap-3">
//                   <button
//                     onClick={() => setIsPlaying(!isPlaying)}
//                     className="p-1.5 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
//                   >
//                     {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
//                   </button>
//                   <div className="text-sm">
//                     <div className="font-medium">{videoCarousel[currentVideo].title}</div>
//                     <div className="text-white/60 text-xs">{videoCarousel[currentVideo].location}</div>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-4">
//                   <div className="flex gap-1">
//                     {videoCarousel.map((_, index) => (
//                       <button
//                         key={index}
//                         onClick={() => setCurrentVideo(index)}
//                         className={`w-1.5 h-1.5 rounded-full transition-all ${
//                           index === currentVideo ? "bg-cyan-400" : "bg-white/40 hover:bg-white/60"
//                         }`}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* CTA Button */}
//               <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-300">
//                 Explore Packages
//                 <ArrowRight className="w-4 h-4 ml-2" />
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Simple Bottom Wave */}
//       <div className="absolute bottom-0 left-0 right-0">
//         <svg className="w-full h-8 fill-white" viewBox="0 0 1440 40" preserveAspectRatio="none">
//           <path d="M0,40 L1440,40 L1440,20 C1320,0 1200,0 1080,10 C960,20 840,20 720,15 C600,10 480,0 360,5 C240,10 120,20 0,25 Z" />
//         </svg>
//       </div>
//     </section>
//   );
// };

// export default Hero;






// import { Button } from "@/components/ui/button";
// import {
//   ArrowRight,
//   Play,
//   Pause,
//   MapPin,
//   Calendar,
//   Users,
//   Search,
//   ChevronDown,
//   Star,
//   Shield
// } from "lucide-react";
// import { useState, useEffect } from "react";
// import video1 from "../assets/From KlickPin CF Create a Travel Agency Intro Video - MakeWebVideocom [Video] in 2025 _ Travel agency Travel creative Travel video ideas.mp4";
// import video2 from "../assets/From KlickPin CF maya on Instagram I bought a drone [Video] [Video] in 2025 _ Drone Instagram Visual.mp4"

// const Hero = () => {
//   const [currentVideo, setCurrentVideo] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(true);
//   const [searchData, setSearchData] = useState({
//     destination: "",
//     checkIn: "",
//     travelers: "2 Adults"
//   });

//   const videoCarousel = [
//     {
//       id: 1,
//       video: video1,
//       title: "Tropical Paradise",
//       location: "Bali, Maldives"
//     },
//     {
//       id: 2,
//       video: video2,
//       title: "Mountain Adventure", 
//       location: "Swiss Alps"
//     },
//     {
//       id: 3,
//       video: video1,
//       title: "Urban Explorer",
//       location: "Dubai, Singapore"
//     },
//   ];

//   useEffect(() => {
//     if (!isPlaying) return;
//     const interval = setInterval(() => {
//       setCurrentVideo((prev) => (prev + 1) % videoCarousel.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [isPlaying, videoCarousel.length]);

//   useEffect(() => {
//     const nextWeek = new Date();
//     nextWeek.setDate(nextWeek.getDate() + 7);
//     setSearchData(prev => ({
//       ...prev,
//       checkIn: nextWeek.toISOString().split('T')[0]
//     }));
//   }, []);

//   const handleSearch = () => {
//     console.log("Searching:", searchData);
//   };

//   return (
//     <section className="relative text-white overflow-hidden min-h-[80vh] flex items-center">
//       {/* Background Video */}
//       <div className="absolute inset-0">
//         {videoCarousel.map((video, index) => (
//           <video
//             key={video.id}
//             className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
//               index === currentVideo ? "opacity-100" : "opacity-0"
//             }`}
//             autoPlay
//             muted
//             loop
//             playsInline
//           >
//             <source src={video.video} type="video/mp4" />
//           </video>
//         ))}
//         <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
//       </div>

//       {/* Content */}
//       <div className="relative z-20 w-full py-16">
//         <div className="container mx-auto px-4">
//           {/* Main Horizontal Layout */}
//           <div className="flex flex-col lg:flex-row items-start justify-between gap-10 max-w-6xl mx-auto">
            
//             {/* Left Content */}
//             <div className="flex-1 max-w-2xl space-y-8">
//               {/* Trust Badge */}
//               <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-lg border border-white/20 rounded-full text-sm">
//                 <Shield className="w-4 h-4 text-cyan-400" />
//                 <span>Trusted by 50K+ Travelers</span>
//                 <div className="flex items-center gap-1 ml-2">
//                   {[1, 2, 3, 4, 5].map((star) => (
//                     <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
//                   ))}
//                 </div>
//               </div>

//               <div className="space-y-6">
//                 <h1 className="text-5xl md:text-6xl font-bold leading-tight">
//                   Discover
//                   <br />
//                   <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
//                     Extraordinary
//                   </span>
//                   <br />
//                   Journeys
//                 </h1>
//                 <p className="text-white/80 text-lg max-w-md leading-relaxed">
//                   Curated travel experiences across 40+ countries with premium service and 24/7 support.
//                 </p>
//               </div>

//               {/* Stats Row */}
//               <div className="flex gap-8">
//                 <div className="text-center">
//                   <div className="text-2xl font-bold text-cyan-400">40+</div>
//                   <div className="text-white/70 text-sm">Countries</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-2xl font-bold text-blue-400">10K+</div>
//                   <div className="text-white/70 text-sm">Travelers</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-2xl font-bold text-green-400">24/7</div>
//                   <div className="text-white/70 text-sm">Support</div>
//                 </div>
//               </div>
//             </div>

//             {/* Right Side - Search & Controls */}
//             <div className="w-full lg:w-auto space-y-6">
//               {/* Search Bar */}
//               <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/20 min-w-[450px]">
//                 <div className="flex items-center gap-4">
//                   {/* Destination */}
//                   <div className="flex items-center gap-3 flex-1">
//                     <div className="p-2 bg-cyan-100 rounded-lg">
//                       <MapPin className="w-4 h-4 text-cyan-600" />
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <input
//                         type="text"
//                         placeholder="Where to?"
//                         className="w-full border-none outline-none bg-transparent text-gray-800 font-semibold placeholder-gray-500 text-sm"
//                         value={searchData.destination}
//                         onChange={(e) => setSearchData(prev => ({...prev, destination: e.target.value}))}
//                       />
//                     </div>
//                   </div>

//                   <div className="h-8 w-px bg-gray-300" />

//                   {/* Date */}
//                   <div className="flex items-center gap-3 flex-1">
//                     <div className="p-2 bg-blue-100 rounded-lg">
//                       <Calendar className="w-4 h-4 text-blue-600" />
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <input
//                         type="date"
//                         className="w-full border-none outline-none bg-transparent text-gray-800 font-semibold text-sm"
//                         value={searchData.checkIn}
//                         onChange={(e) => setSearchData(prev => ({...prev, checkIn: e.target.value}))}
//                       />
//                     </div>
//                   </div>

//                   <div className="h-8 w-px bg-gray-300" />

//                   {/* Travelers */}
//                   <div className="flex items-center gap-3 flex-1">
//                     <div className="p-2 bg-purple-100 rounded-lg">
//                       <Users className="w-4 h-4 text-purple-600" />
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <select 
//                         className="w-full border-none outline-none bg-transparent text-gray-800 font-semibold text-sm appearance-none"
//                         value={searchData.travelers}
//                         onChange={(e) => setSearchData(prev => ({...prev, travelers: e.target.value}))}
//                       >
//                         <option>1 Adult</option>
//                         <option>2 Adults</option>
//                         <option>2 Adults, 1 Child</option>
//                         <option>Family</option>
//                       </select>
//                     </div>
//                     <ChevronDown className="w-4 h-4 text-gray-500" />
//                   </div>

//                   {/* Search Button */}
//                   <Button 
//                     onClick={handleSearch}
//                     className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white p-3 rounded-xl transition-all duration-300 hover:scale-105"
//                   >
//                     <Search className="w-5 h-5" />
//                   </Button>
//                 </div>
//               </div>

//               {/* Video Controls */}
//               <div className="flex items-center justify-between bg-black/50 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
//                 <div className="flex items-center gap-4">
//                   <button
//                     onClick={() => setIsPlaying(!isPlaying)}
//                     className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-all duration-300 hover:scale-110"
//                   >
//                     {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
//                   </button>
//                   <div>
//                     <div className="font-semibold text-white">{videoCarousel[currentVideo].title}</div>
//                     <div className="text-white/60 text-sm flex items-center gap-1">
//                       <MapPin className="w-3 h-3" />
//                       {videoCarousel[currentVideo].location}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <div className="flex gap-1.5">
//                     {videoCarousel.map((_, index) => (
//                       <button
//                         key={index}
//                         onClick={() => setCurrentVideo(index)}
//                         className={`w-2 h-2 rounded-full transition-all ${
//                           index === currentVideo ? "bg-cyan-400 scale-125" : "bg-white/40 hover:bg-white/60"
//                         }`}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* CTA Button */}
//               <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg">
//                 Explore Premium Packages
//                 <ArrowRight className="w-5 h-5 ml-2" />
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Simple Bottom Gradient */}
//       <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
//     </section>
//   );
// };

// export default Hero;


// import { Button } from "@/components/ui/button";
// import {
//   ArrowRight,
//   Play,
//   Pause,
//   MapPin,
//   Calendar,
//   Users,
//   Search,
//   ChevronDown,
//   Star,
//   Shield
// } from "lucide-react";
// import { useState, useEffect } from "react";
// import video1 from "../assets/From KlickPin CF Create a Travel Agency Intro Video - MakeWebVideocom [Video] in 2025 _ Travel agency Travel creative Travel video ideas.mp4";
// import video2 from "../assets/From KlickPin CF maya on Instagram I bought a drone [Video] [Video] in 2025 _ Drone Instagram Visual.mp4"

// const Hero = () => {
//   const [currentVideo, setCurrentVideo] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(true);
//   const [searchData, setSearchData] = useState({
//     destination: "",
//     checkIn: "",
//     travelers: "2 Adults"
//   });

//   const videoCarousel = [
//     {
//       id: 1,
//       video: video1,
//       title: "Tropical Paradise",
//       location: "Bali, Maldives"
//     },
//     {
//       id: 2,
//       video: video2,
//       title: "Mountain Adventure", 
//       location: "Swiss Alps"
//     },
//     {
//       id: 3,
//       video: video1,
//       title: "Urban Explorer",
//       location: "Dubai, Singapore"
//     },
//   ];

//   useEffect(() => {
//     if (!isPlaying) return;
//     const interval = setInterval(() => {
//       setCurrentVideo((prev) => (prev + 1) % videoCarousel.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [isPlaying, videoCarousel.length]);

//   useEffect(() => {
//     const nextWeek = new Date();
//     nextWeek.setDate(nextWeek.getDate() + 7);
//     setSearchData(prev => ({
//       ...prev,
//       checkIn: nextWeek.toISOString().split('T')[0]
//     }));
//   }, []);

//   const handleSearch = () => {
//     console.log("Searching:", searchData);
//   };

//   return (
//     <section className="relative text-white overflow-hidden min-h-[85vh] flex items-center">
//       {/* Background Video */}
//       <div className="absolute inset-0">
//         {videoCarousel.map((video, index) => (
//           <video
//             key={video.id}
//             className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
//               index === currentVideo ? "opacity-100" : "opacity-0"
//             }`}
//             autoPlay
//             muted
//             loop
//             playsInline
//           >
//             <source src={video.video} type="video/mp4" />
//           </video>
//         ))}
//         <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
//       </div>

//       {/* Content */}
//       <div className="relative z-20 w-full py-16">
//         <div className="container mx-auto px-4">
//           {/* Left Content - Full Width */}
//           <div className="max-w-2xl">
//             {/* Trust Badge */}
//             <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-lg border border-white/20 rounded-full text-sm mb-8">
//               <Shield className="w-4 h-4 text-cyan-400" />
//               <span>Trusted by 50K+ Travelers</span>
//               <div className="flex items-center gap-1 ml-2">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
//                 ))}
//               </div>
//             </div>

//             <div className="space-y-6 mb-12">
//               <h1 className="text-5xl md:text-6xl font-bold leading-tight">
//                 Discover
//                 <br />
//                 <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
//                   Extraordinary
//                 </span>
//                 <br />
//                 Journeys
//               </h1>
//               <p className="text-white/80 text-lg max-w-md leading-relaxed">
//                 Curated travel experiences across 40+ countries with premium service and 24/7 support.
//               </p>
//             </div>

//             {/* Stats Row */}
//             <div className="flex gap-8 mb-12">
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-cyan-400">40+</div>
//                 <div className="text-white/70 text-sm">Countries</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-blue-400">10K+</div>
//                 <div className="text-white/70 text-sm">Travelers</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-green-400">24/7</div>
//                 <div className="text-white/70 text-sm">Support</div>
//               </div>
//             </div>

//             {/* CTA Button */}
//             <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg">
//               Explore Premium Packages
//               <ArrowRight className="w-5 h-5 ml-2" />
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Right Side Content - Moved More to Left with Increased Width */}
//       <div className="absolute bottom-6 right-1/3 lg:right-1/4 z-20 space-y-3 w-full max-w-md px-4 lg:px-0">
//         {/* Search Bar - Increased Width */}
//         <div className="bg-white/95 backdrop-blur-xl rounded-xl p-4 shadow-2xl border border-white/20">
//           <div className="flex items-center gap-3">
//             {/* Destination */}
//             <div className="flex items-center gap-2 flex-1 min-w-0">
//               <MapPin className="w-4 h-4 text-cyan-600 flex-shrink-0" />
//               <input
//                 type="text"
//                 placeholder="Where to?"
//                 className="flex-1 border-none outline-none bg-transparent text-gray-800 font-medium placeholder-gray-500 text-sm min-w-0"
//                 value={searchData.destination}
//                 onChange={(e) => setSearchData(prev => ({...prev, destination: e.target.value}))}
//               />
//             </div>

//             <div className="h-6 w-px bg-gray-300 mx-1" />

//             {/* Date */}
//             <div className="flex items-center gap-2 flex-1 min-w-0">
//               <Calendar className="w-4 h-4 text-blue-600 flex-shrink-0" />
//               <input
//                 type="date"
//                 className="flex-1 border-none outline-none bg-transparent text-gray-800 font-medium text-sm min-w-0"
//                 value={searchData.checkIn}
//                 onChange={(e) => setSearchData(prev => ({...prev, checkIn: e.target.value}))}
//               />
//             </div>

//             <div className="h-6 w-px bg-gray-300 mx-1" />

//             {/* Travelers */}
//             <div className="flex items-center gap-2 flex-1 min-w-0">
//               <Users className="w-4 h-4 text-purple-600 flex-shrink-0" />
//               <select 
//                 className="flex-1 border-none outline-none bg-transparent text-gray-800 font-medium text-sm appearance-none min-w-0"
//                 value={searchData.travelers}
//                 onChange={(e) => setSearchData(prev => ({...prev, travelers: e.target.value}))}
//               >
//                 <option>2 Adults</option>
//                 <option>1 Adult</option>
//                 <option>2 Adults, 1 Child</option>
//                 <option>Family</option>
//               </select>
//               <ChevronDown className="w-3 h-3 text-gray-500 flex-shrink-0" />
//             </div>

//             {/* Search Button */}
//             <Button 
//               onClick={handleSearch}
//               className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition-colors flex-shrink-0"
//             >
//               <Search className="w-4 h-4" />
//             </Button>
//           </div>
//         </div>

//         {/* Video Controls - Increased Width */}
//         <div className="flex items-center justify-between bg-black/50 backdrop-blur-lg rounded-xl p-4 border border-white/20">
//           <div className="flex items-center gap-3 min-w-0 flex-1">
//             <button
//               onClick={() => setIsPlaying(!isPlaying)}
//               className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors flex-shrink-0"
//             >
//               {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
//             </button>
//             <div className="min-w-0 flex-1">
//               <div className="font-medium text-white text-sm">{videoCarousel[currentVideo].title}</div>
//               <div className="text-white/60 text-xs flex items-center gap-1">
//                 <MapPin className="w-3 h-3 flex-shrink-0" />
//                 <span>{videoCarousel[currentVideo].location}</span>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center gap-2 flex-shrink-0 ml-3">
//             {videoCarousel.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentVideo(index)}
//                 className={`w-2 h-2 rounded-full transition-all flex-shrink-0 ${
//                   index === currentVideo ? "bg-cyan-400" : "bg-white/40 hover:bg-white/60"
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Beautiful Asymmetric Wave Curve Bottom */}
//       <div className="absolute bottom-0 left-0 right-0 z-10">
//         <svg 
//           className="w-full h-24 md:h-28 fill-white" 
//           viewBox="0 0 1440 120" 
//           preserveAspectRatio="none"
//         >
//           {/* Asymmetric wave curve with more dramatic flow */}
//           <path d="M0,80L80,70C160,60,320,40,480,45C640,50,800,80,960,85C1120,90,1280,70,1360,60L1440,50L1440,120L0,120Z" 
//                 className="opacity-100" />
//         </svg>
//       </div>

//       {/* Subtle gradient overlay on curve */}
//       <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/5 to-transparent z-5 pointer-events-none" />
//     </section>
//   );
// };

// export default Hero;



// import { Button } from "@/components/ui/button";
// import {
//   ArrowRight,
//   Play,
//   Pause,
//   MapPin,
//   Calendar,
//   Users,
//   Search,
//   ChevronDown,
//   Star,
//   Shield
// } from "lucide-react";
// import { useState, useEffect } from "react";
// import video1 from "../assets/video1 (1).mp4";
// import video2 from "../assets/video2.mp4"

// const Hero = () => {
//   const [currentVideo, setCurrentVideo] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(true);
//   const [searchData, setSearchData] = useState({
//     destination: "",
//     checkIn: "",
//     travelers: "2 Adults"
//   });

//   const videoCarousel = [
//     {
//       id: 1,
//       video: video1,
//       title: "Tropical Paradise",
//       location: "Bali, Maldives"
//     },
//     {
//       id: 2,
//       video: video2,
//       title: "Mountain Adventure", 
//       location: "Swiss Alps"
//     },
//     {
//       id: 3,
//       video: video1,
//       title: "Urban Explorer",
//       location: "Dubai, Singapore"
//     },
//   ];

//   useEffect(() => {
//     if (!isPlaying) return;
//     const interval = setInterval(() => {
//       setCurrentVideo((prev) => (prev + 1) % videoCarousel.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [isPlaying, videoCarousel.length]);

//   useEffect(() => {
//     const nextWeek = new Date();
//     nextWeek.setDate(nextWeek.getDate() + 7);
//     setSearchData(prev => ({
//       ...prev,
//       checkIn: nextWeek.toISOString().split('T')[0]
//     }));
//   }, []);

//   const handleSearch = () => {
//     console.log("Searching:", searchData);
//   };

//   return (
//     <section className="relative text-white overflow-hidden min-h-[85vh] flex items-center">
//       {/* Background Video */}
//       <div className="absolute inset-0">
//         {videoCarousel.map((video, index) => (
//           <video
//             key={video.id}
//             className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
//               index === currentVideo ? "opacity-100" : "opacity-0"
//             }`}
//             autoPlay
//             muted
//             loop
//             playsInline
//           >
//             <source src={video.video} type="video/mp4" />
//           </video>
//         ))}
//         <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
//       </div>

//       {/* Content */}
//       <div className="relative z-20 w-full py-16">
//         <div className="container mx-auto px-4">
//           {/* Left Content - Full Width */}
//           <div className="max-w-2xl">
//             {/* Trust Badge */}
//             <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-lg border border-white/20 rounded-full text-sm mb-8">
//               <Shield className="w-4 h-4 text-cyan-400" />
//               <span>Trusted by 50K+ Travelers</span>
//               <div className="flex items-center gap-1 ml-2">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
//                 ))}
//               </div>
//             </div>

//             <div className="space-y-6 mb-12">
//               <h1 className="text-5xl md:text-6xl font-bold leading-tight">
//                 Discover
//                 <br />
//                 <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
//                   Extraordinary
//                 </span>
//                 <br />
//                 Journeys
//               </h1>
//               <p className="text-white/80 text-lg max-w-md leading-relaxed">
//                 Curated travel experiences across 40+ countries with premium service and 24/7 support.
//               </p>
//             </div>

//             {/* Stats Row */}
//             <div className="flex gap-8 mb-12">
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-cyan-400">40+</div>
//                 <div className="text-white/70 text-sm">Countries</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-blue-400">10K+</div>
//                 <div className="text-white/70 text-sm">Travelers</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-green-400">24/7</div>
//                 <div className="text-white/70 text-sm">Support</div>
//               </div>
//             </div>

//             {/* CTA Button */}
//             <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg">
//               Explore Premium Packages
//               <ArrowRight className="w-5 h-5 ml-2" />
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Right Side Content - Maximum Width */}
//       <div className="absolute bottom-6 right-4 lg:right-8 z-20 space-y-3 w-full max-w-2xl px-4 lg:px-0">
//         {/* Search Bar - Maximum Width */}
//         <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/20">
//           <div className="flex items-center gap-6">
//             {/* Destination */}
//             <div className="flex items-center gap-3 flex-1 min-w-0">
//               <div className="p-2 bg-cyan-100 rounded-lg flex-shrink-0">
//                 <MapPin className="w-5 h-5 text-cyan-600" />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <div className="text-xs text-gray-500 font-medium mb-1">Destination</div>
//                 <input
//                   type="text"
//                   placeholder="Where do you want to go?"
//                   className="w-full border-none outline-none bg-transparent text-gray-800 font-semibold placeholder-gray-500 text-base"
//                   value={searchData.destination}
//                   onChange={(e) => setSearchData(prev => ({...prev, destination: e.target.value}))}
//                 />
//               </div>
//             </div>

//             <div className="h-12 w-px bg-gray-300 flex-shrink-0" />

//             {/* Date */}
//             <div className="flex items-center gap-3 flex-1 min-w-0">
//               <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
//                 <Calendar className="w-5 h-5 text-blue-600" />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <div className="text-xs text-gray-500 font-medium mb-1">Check-in</div>
//                 <input
//                   type="date"
//                   className="w-full border-none outline-none bg-transparent text-gray-800 font-semibold text-base"
//                   value={searchData.checkIn}
//                   onChange={(e) => setSearchData(prev => ({...prev, checkIn: e.target.value}))}
//                 />
//               </div>
//             </div>

//             <div className="h-12 w-px bg-gray-300 flex-shrink-0" />

//             {/* Travelers */}
//             <div className="flex items-center gap-3 flex-1 min-w-0">
//               <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
//                 <Users className="w-5 h-5 text-purple-600" />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <div className="text-xs text-gray-500 font-medium mb-1">Travelers</div>
//                 <select 
//                   className="w-full border-none outline-none bg-transparent text-gray-800 font-semibold text-base appearance-none"
//                   value={searchData.travelers}
//                   onChange={(e) => setSearchData(prev => ({...prev, travelers: e.target.value}))}
//                 >
//                   <option>2 Adults</option>
//                   <option>1 Adult</option>
//                   <option>2 Adults, 1 Child</option>
//                   <option>2 Adults, 2 Children</option>
//                   <option>Family Package</option>
//                 </select>
//               </div>
//               <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
//             </div>

//             {/* Search Button */}
//             <Button 
//               onClick={handleSearch}
//               className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 flex-shrink-0 min-w-[120px]"
//             >
//               <Search className="w-5 h-5 mr-2" />
//               Search
//             </Button>
//           </div>
//         </div>

//         {/* Video Controls - Maximum Width */}
//         <div className="flex items-center justify-between bg-black/50 backdrop-blur-lg rounded-2xl p-5 border border-white/20">
//           <div className="flex items-center gap-4 min-w-0 flex-1">
//             <button
//               onClick={() => setIsPlaying(!isPlaying)}
//               className="p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-all duration-300 hover:scale-110 flex-shrink-0"
//             >
//               {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
//             </button>
//             <div className="min-w-0 flex-1">
//               <div className="font-semibold text-white text-lg mb-1">{videoCarousel[currentVideo].title}</div>
//               <div className="text-white/60 text-sm flex items-center gap-2">
//                 <MapPin className="w-4 h-4 flex-shrink-0" />
//                 <span>{videoCarousel[currentVideo].location}</span>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center gap-3 flex-shrink-0 ml-6">
//             {videoCarousel.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentVideo(index)}
//                 className={`w-3 h-3 rounded-full transition-all flex-shrink-0 ${
//                   index === currentVideo ? "bg-cyan-400 scale-125" : "bg-white/40 hover:bg-white/60"
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Simple Bottom Gradient */}
//       <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
//     </section>
//   );
// };

// export default Hero;





// import { Button } from "@/components/ui/button";
// import {
//   ArrowRight,
//   Play,
//   Pause,
//   MapPin,
//   Calendar,
//   Users,
//   Search,
//   ChevronDown,
//   Star,
//   Shield,
//   Sparkles,
//   Globe,
//   Clock,
//   Plane
// } from "lucide-react";
// import { useState, useEffect } from "react";
// import video1 from "../assets/video1 (1).mp4";
// import video2 from "../assets/video2.mp4"

// const Hero = () => {
//   const [currentVideo, setCurrentVideo] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(true);
//   const [searchData, setSearchData] = useState({
//     destination: "",
//     checkIn: "",
//     travelers: "2 Adults"
//   });

//   const videoCarousel = [
//     {
//       id: 1,
//       video: video1,
//       title: "Tropical Paradise",
//       location: "Bali, Maldives",
//       gradient: "from-emerald-500/20 to-cyan-500/20"
//     },
//     {
//       id: 2,
//       video: video2,
//       title: "Mountain Adventure", 
//       location: "Swiss Alps",
//       gradient: "from-blue-500/20 to-purple-500/20"
//     },
//     {
//       id: 3,
//       video: video1,
//       title: "Urban Explorer",
//       location: "Dubai, Singapore",
//       gradient: "from-orange-500/20 to-pink-500/20"
//     },
//   ];

//   useEffect(() => {
//     if (!isPlaying) return;
//     const interval = setInterval(() => {
//       setCurrentVideo((prev) => (prev + 1) % videoCarousel.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [isPlaying, videoCarousel.length]);

//   useEffect(() => {
//     const nextWeek = new Date();
//     nextWeek.setDate(nextWeek.getDate() + 7);
//     setSearchData(prev => ({
//       ...prev,
//       checkIn: nextWeek.toISOString().split('T')[0]
//     }));
//   }, []);

//   const handleSearch = () => {
//     console.log("Searching:", searchData);
//   };

//   return (
//     <section className="relative text-white overflow-hidden min-h-[90vh] flex items-center">
//       {/* Enhanced Background with Floating Elements */}
//       <div className="absolute inset-0">
//         {videoCarousel.map((video, index) => (
//           <div
//             key={video.id}
//             className={`absolute inset-0 transition-opacity duration-1000 ${
//               index === currentVideo ? "opacity-100" : "opacity-0"
//             }`}
//           >
//             <video
//               className="absolute inset-0 w-full h-full object-cover scale-105"
//               autoPlay
//               muted
//               loop
//               playsInline
//             >
//               <source src={video.video} type="video/mp4" />
//             </video>
//             <div className={`absolute inset-0 bg-gradient-to-r ${video.gradient} mix-blend-soft-light`} />
//           </div>
//         ))}
//         <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        
//         {/* Animated Background Elements */}
//         <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full blur-sm opacity-60 animate-pulse" />
//         <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-blue-400 rounded-full blur-sm opacity-40 animate-bounce delay-1000" />
//         <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-purple-400 rounded-full blur-sm opacity-50 animate-pulse delay-500" />
//       </div>

//       {/* Content */}
//       <div className="relative z-20 w-full py-16">
//         <div className="container mx-auto px-4">
//           {/* Enhanced Left Content */}
//           <div className="max-w-2xl">
//             {/* Premium Trust Badge */}
//             <div className="inline-flex items-center gap-3 px-5 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-sm mb-10 shadow-2xl hover:bg-white/15 transition-all duration-500 hover:scale-105 group">
//               <div className="relative">
//                 <Shield className="w-5 h-5 text-cyan-400" />
//                 <Sparkles className="w-3 h-3 text-cyan-300 absolute -top-1 -right-1 animate-pulse" />
//               </div>
//               <span className="font-semibold text-white/90">Trusted by 50K+ Travelers</span>
//               <div className="flex items-center gap-1 ml-2">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400 hover:scale-110 transition-transform" />
//                 ))}
//               </div>
//             </div>

//             {/* Enhanced Main Content */}
//             <div className="space-y-6 mb-12">
//               <div className="relative">
//                 <h1 className="text-6xl md:text-7xl font-bold leading-tight tracking-tight">
//                   Discover
//                   <br />
//                   <span className="relative">
//                     <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
//                       Extraordinary
//                     </span>
//                     <Sparkles className="w-8 h-8 text-cyan-300 absolute -top-2 -right-10 animate-pulse" />
//                   </span>
//                   <br />
//                   <span className="flex items-center gap-3">
//                     Journeys
//                     <Plane className="w-12 h-12 text-cyan-400 transform rotate-45 animate-float" />
//                   </span>
//                 </h1>
//               </div>
//               <p className="text-white/80 text-xl max-w-lg leading-relaxed font-light">
//                 Curated travel experiences across <span className="font-semibold text-cyan-300">40+ countries</span> with premium service and 24/7 support.
//               </p>
//             </div>

//             {/* Enhanced Stats Row */}
//             <div className="flex gap-10 mb-12">
//               {[
//                 { icon: Globe, value: "40+", label: "Countries", color: "text-cyan-400" },
//                 { icon: Users, value: "10K+", label: "Travelers", color: "text-blue-400" },
//                 { icon: Clock, value: "24/7", label: "Support", color: "text-green-400" }
//               ].map((stat, index) => (
//                 <div key={index} className="text-center group cursor-pointer transform hover:scale-110 transition-all duration-300">
//                   <div className="relative">
//                     <stat.icon className={`w-8 h-8 ${stat.color} mb-3 group-hover:scale-110 transition-transform duration-300`} />
//                   </div>
//                   <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
//                   <div className="text-white/70 text-sm font-medium tracking-wide">{stat.label}</div>
//                 </div>
//               ))}
//             </div>

//             {/* Enhanced CTA Button */}
//             <Button className="group relative bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold px-10 py-6 rounded-2xl transition-all duration-300 hover:scale-105 shadow-2xl overflow-hidden border border-cyan-400/30">
//               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
//               <span className="relative flex items-center text-lg">
//                 Explore Premium Packages
//                 <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
//               </span>
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Enhanced Search Section */}
//       <div className="absolute bottom-8 right-4 lg:right-8 z-20 space-y-4 w-full max-w-4xl px-4 lg:px-0">
//         {/* Premium Search Bar */}
//         <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/30 hover:border-white/40 transition-all duration-500 hover:shadow-3xl">
//           <div className="flex items-center gap-6">
//             {/* Destination */}
//             <div className="flex items-center gap-4 flex-1 min-w-0 group">
//               <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
//                 <MapPin className="w-6 h-6 text-white" />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <div className="text-xs text-gray-600 font-semibold mb-2 uppercase tracking-wide">Destination</div>
//                 <input
//                   type="text"
//                   placeholder="Where do you want to go?"
//                   className="w-full border-none outline-none bg-transparent text-gray-800 font-bold placeholder-gray-500 text-lg transition-all duration-300 focus:placeholder-transparent"
//                   value={searchData.destination}
//                   onChange={(e) => setSearchData(prev => ({...prev, destination: e.target.value}))}
//                 />
//               </div>
//             </div>

//             <div className="h-16 w-0.5 bg-gradient-to-b from-transparent via-gray-300 to-transparent flex-shrink-0" />

//             {/* Date */}
//             <div className="flex items-center gap-4 flex-1 min-w-0 group">
//               <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
//                 <Calendar className="w-6 h-6 text-white" />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <div className="text-xs text-gray-600 font-semibold mb-2 uppercase tracking-wide">Check-in</div>
//                 <input
//                   type="date"
//                   className="w-full border-none outline-none bg-transparent text-gray-800 font-bold text-lg cursor-pointer transition-all duration-300"
//                   value={searchData.checkIn}
//                   onChange={(e) => setSearchData(prev => ({...prev, checkIn: e.target.value}))}
//                 />
//               </div>
//             </div>

//             <div className="h-16 w-0.5 bg-gradient-to-b from-transparent via-gray-300 to-transparent flex-shrink-0" />

//             {/* Travelers */}
//             <div className="flex items-center gap-4 flex-1 min-w-0 group">
//               <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
//                 <Users className="w-6 h-6 text-white" />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <div className="text-xs text-gray-600 font-semibold mb-2 uppercase tracking-wide">Travelers</div>
//                 <select 
//                   className="w-full border-none outline-none bg-transparent text-gray-800 font-bold text-lg cursor-pointer appearance-none transition-all duration-300"
//                   value={searchData.travelers}
//                   onChange={(e) => setSearchData(prev => ({...prev, travelers: e.target.value}))}
//                 >
//                   <option>2 Adults</option>
//                   <option>1 Adult</option>
//                   <option>2 Adults, 1 Child</option>
//                   <option>2 Adults, 2 Children</option>
//                   <option>Family Package</option>
//                 </select>
//               </div>
//               <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0 group-hover:rotate-180 transition-transform duration-300" />
//             </div>

//             {/* Enhanced Search Button */}
//             <Button 
//               onClick={handleSearch}
//               className="group relative bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-10 py-6 rounded-2xl transition-all duration-300 hover:scale-105 flex-shrink-0 min-w-[140px] shadow-2xl overflow-hidden border border-cyan-400/30"
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
//               <span className="relative flex items-center font-bold text-lg">
//                 <Search className="w-6 h-6 mr-3" />
//                 Search
//               </span>
//             </Button>
//           </div>
//         </div>

//         {/* Premium Video Controls */}
//         <div className="flex items-center justify-between bg-black/60 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 hover:border-white/30 transition-all duration-500 group">
//           <div className="flex items-center gap-4 min-w-0 flex-1">
//             <button
//               onClick={() => setIsPlaying(!isPlaying)}
//               className="p-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 hover:scale-110 shadow-lg flex-shrink-0 group"
//             >
//               {isPlaying ? 
//                 <Pause className="w-6 h-6 group-hover:scale-110 transition-transform" /> : 
//                 <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
//               }
//             </button>
//             <div className="min-w-0 flex-1">
//               <div className="font-bold text-white text-xl mb-2 group-hover:text-cyan-100 transition-colors duration-300">
//                 {videoCarousel[currentVideo].title}
//               </div>
//               <div className="text-white/70 text-base flex items-center gap-3">
//                 <MapPin className="w-5 h-5 flex-shrink-0 text-cyan-400 group-hover:scale-110 transition-transform" />
//                 <span className="group-hover:text-white/90 transition-colors duration-300">
//                   {videoCarousel[currentVideo].location}
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center gap-4 flex-shrink-0 ml-6">
//             {videoCarousel.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentVideo(index)}
//                 className={`w-4 h-4 rounded-full transition-all duration-500 flex-shrink-0 shadow-lg ${
//                   index === currentVideo 
//                     ? "bg-gradient-to-r from-cyan-400 to-blue-500 scale-125 ring-2 ring-white/50" 
//                     : "bg-white/40 hover:bg-white/60 hover:scale-110"
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Enhanced Bottom Gradient with Wave */}
//       <div className="absolute bottom-0 left-0 right-0 z-10">
//         <div className="h-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
//         <div className="h-4 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-600/20 blur-sm" />
//       </div>

//       {/* Add these animations to your global CSS */}
//       <style jsx>{`
//         @keyframes gradient {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }
//         @keyframes float {
//           0%, 100% { transform: translateY(0px) rotate(45deg); }
//           50% { transform: translateY(-10px) rotate(45deg); }
//         }
//         .animate-gradient {
//           background-size: 200% 200%;
//           animation: gradient 3s ease infinite;
//         }
//         .animate-float {
//           animation: float 3s ease-in-out infinite;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default Hero;






// import { Button } from "@/components/ui/button";
// import {
//   ArrowRight,
//   Play,
//   Pause,
//   MapPin,
//   Calendar,
//   Users,
//   Search,
//   ChevronDown,
//   Star,
//   Shield,
//   Sparkles,
//   Globe,
//   Clock,
//   Plane,
//   Crown,
//   Trophy,
//   Award
// } from "lucide-react";
// import { useState, useEffect, useRef } from "react";
// import video1 from "../assets/video1 (1).mp4";
// import video2 from "../assets/video2.mp4"

// const Hero = () => {
//   const [currentVideo, setCurrentVideo] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(true);
//   const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
//   const [searchData, setSearchData] = useState({
//     destination: "",
//     checkIn: "",
//     travelers: "2 Adults"
//   });

//   const videoCarousel = [
//     {
//       id: 1,
//       video: video1,
//       title: "Luxury Beach Escape",
//       location: "Maldives & Bali",
//       gradient: "from-emerald-500/20 to-cyan-500/20",
//       description: "Experience pristine beaches and overwater villas"
//     },
//     {
//       id: 2,
//       video: video2,
//       title: "Alpine Adventure", 
//       location: "Swiss Alps & Himalayas",
//       gradient: "from-blue-500/20 to-purple-500/20",
//       description: "Conquer majestic peaks and scenic trails"
//     },
//     {
//       id: 3,
//       video: video1,
//       title: "Urban Luxury",
//       location: "Dubai & Singapore",
//       gradient: "from-orange-500/20 to-pink-500/20",
//       description: "Discover modern marvels and cosmopolitan elegance"
//     },
//   ];

//   // Handle video playback
//   useEffect(() => {
//     videoRefs.current.forEach((video, index) => {
//       if (video) {
//         if (index === currentVideo && isPlaying) {
//           video.currentTime = 0;
//           video.play().catch(console.error);
//         } else {
//           video.pause();
//         }
//       }
//     });
//   }, [currentVideo, isPlaying]);

//   // Auto-advance to next video when current video ends
//   useEffect(() => {
//     const currentVideoRef = videoRefs.current[currentVideo];
//     if (currentVideoRef) {
//       const handleEnded = () => {
//         setCurrentVideo((prev) => (prev + 1) % videoCarousel.length);
//       };
//       currentVideoRef.addEventListener('ended', handleEnded);
//       return () => currentVideoRef.removeEventListener('ended', handleEnded);
//     }
//   }, [currentVideo, videoCarousel.length]);

//   useEffect(() => {
//     const nextWeek = new Date();
//     nextWeek.setDate(nextWeek.getDate() + 7);
//     setSearchData(prev => ({
//       ...prev,
//       checkIn: nextWeek.toISOString().split('T')[0]
//     }));
//   }, []);

//   const handleSearch = () => {
//     console.log("Searching:", searchData);
//   };

//   const togglePlay = () => {
//     setIsPlaying(!isPlaying);
//   };

//   const handleVideoSelect = (index: number) => {
//     setCurrentVideo(index);
//     setIsPlaying(true);
//   };

//   return (
//     <section className="relative text-white overflow-hidden min-h-[90vh] flex items-center">
//       {/* Enhanced Background with Floating Elements */}
//       <div className="absolute inset-0">
//         {videoCarousel.map((video, index) => (
//           <div
//             key={video.id}
//             className={`absolute inset-0 transition-opacity duration-1000 ${
//               index === currentVideo ? "opacity-100" : "opacity-0"
//             }`}
//           >
//             <video
//               ref={el => videoRefs.current[index] = el}
//               className="absolute inset-0 w-full h-full object-cover"
//               muted
//               playsInline
//               preload="auto"
//             >
//               <source src={video.video} type="video/mp4" />
//             </video>
//             <div className={`absolute inset-0 bg-gradient-to-r ${video.gradient} mix-blend-soft-light`} />
//           </div>
//         ))}
//         <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        
//         {/* Animated Background Elements */}
//         <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full blur-sm opacity-60 animate-pulse" />
//         <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-blue-400 rounded-full blur-sm opacity-40 animate-bounce delay-1000" />
//         <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-purple-400 rounded-full blur-sm opacity-50 animate-pulse delay-500" />
//       </div>

//       {/* Content */}
//       <div className="relative z-20 w-full py-16">
//         <div className="container mx-auto px-4">
//           {/* Enhanced Left Content */}
//           <div className="max-w-2xl">
//             {/* Premium Trust Badge */}
//             <div className="inline-flex items-center gap-3 px-5 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-sm mb-10 shadow-2xl hover:bg-white/15 transition-all duration-500 hover:scale-105 group">
//               <div className="relative">
//                 <Crown className="w-5 h-5 text-yellow-400" />
//                 <Sparkles className="w-3 h-3 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
//               </div>
//               <span className="font-semibold text-white/90">Award-Winning Luxury Travel</span>
//               <Award className="w-4 h-4 text-cyan-400 ml-2" />
//             </div>

//             {/* Enhanced Main Content */}
//             <div className="space-y-6 mb-12">
//               <div className="relative">
//                 <h1 className="text-6xl md:text-7xl font-bold leading-tight tracking-tight">
//                   <span className="flex items-center gap-3 mb-4">
//                     <Trophy className="w-12 h-12 text-yellow-400 animate-pulse" />
//                     <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
//                       Premium
//                     </span>
//                   </span>
//                   <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient block mb-4">
//                     World-Class
//                   </span>
//                   <span className="flex items-center gap-3 text-white">
//                     Travel Experiences
//                     <Plane className="w-12 h-12 text-cyan-400 transform rotate-45 animate-float" />
//                   </span>
//                 </h1>
//               </div>
//               <p className="text-white/80 text-xl max-w-lg leading-relaxed font-light">
//                 Exclusive journeys across <span className="font-semibold text-cyan-300">60+ luxury destinations</span> with personalized service and unmatched excellence.
//               </p>
//             </div>

//             {/* Enhanced Stats Row */}
//             <div className="flex gap-10 mb-12">
//               {[
//                 { icon: Globe, value: "60+", label: "Luxury Destinations", color: "text-cyan-400" },
//                 { icon: Users, value: "25K+", label: "Elite Travelers", color: "text-blue-400" },
//                 { icon: Star, value: "4.9/5", label: "Guest Rating", color: "text-yellow-400" },
//                 { icon: Clock, value: "24/7", label: "Concierge", color: "text-green-400" }
//               ].map((stat, index) => (
//                 <div key={index} className="text-center group cursor-pointer transform hover:scale-110 transition-all duration-300">
//                   <div className="relative">
//                     <stat.icon className={`w-8 h-8 ${stat.color} mb-3 group-hover:scale-110 transition-transform duration-300`} />
//                   </div>
//                   <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
//                   <div className="text-white/70 text-sm font-medium tracking-wide max-w-[100px] leading-tight">{stat.label}</div>
//                 </div>
//               ))}
//             </div>

//             {/* Enhanced CTA Button */}
//             <Button className="group relative bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white font-bold px-10 py-6 rounded-2xl transition-all duration-300 hover:scale-105 shadow-2xl overflow-hidden border border-yellow-400/30">
//               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
//               <span className="relative flex items-center text-lg">
//                 <Crown className="w-6 h-6 mr-3" />
//                 Discover Elite Packages
//                 <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
//               </span>
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Enhanced Search Section */}
//       <div className="absolute bottom-8 right-4 lg:right-8 z-20 space-y-4 w-full max-w-4xl px-4 lg:px-0">
//         {/* Premium Search Bar */}
//         <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/30 hover:border-white/40 transition-all duration-500 hover:shadow-3xl">
//           <div className="flex items-center gap-6">
//             {/* Destination */}
//             <div className="flex items-center gap-4 flex-1 min-w-0 group">
//               <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
//                 <MapPin className="w-6 h-6 text-white" />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <div className="text-xs text-gray-600 font-semibold mb-2 uppercase tracking-wide">Dream Destination</div>
//                 <input
//                   type="text"
//                   placeholder="Where luxury awaits?"
//                   className="w-full border-none outline-none bg-transparent text-gray-800 font-bold placeholder-gray-500 text-lg transition-all duration-300 focus:placeholder-transparent"
//                   value={searchData.destination}
//                   onChange={(e) => setSearchData(prev => ({...prev, destination: e.target.value}))}
//                 />
//               </div>
//             </div>

//             <div className="h-16 w-0.5 bg-gradient-to-b from-transparent via-gray-300 to-transparent flex-shrink-0" />

//             {/* Date */}
//             <div className="flex items-center gap-4 flex-1 min-w-0 group">
//               <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
//                 <Calendar className="w-6 h-6 text-white" />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <div className="text-xs text-gray-600 font-semibold mb-2 uppercase tracking-wide">Preferred Dates</div>
//                 <input
//                   type="date"
//                   className="w-full border-none outline-none bg-transparent text-gray-800 font-bold text-lg cursor-pointer transition-all duration-300"
//                   value={searchData.checkIn}
//                   onChange={(e) => setSearchData(prev => ({...prev, checkIn: e.target.value}))}
//                 />
//               </div>
//             </div>

//             <div className="h-16 w-0.5 bg-gradient-to-b from-transparent via-gray-300 to-transparent flex-shrink-0" />

//             {/* Travelers */}
//             <div className="flex items-center gap-4 flex-1 min-w-0 group">
//               <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
//                 <Users className="w-6 h-6 text-white" />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <div className="text-xs text-gray-600 font-semibold mb-2 uppercase tracking-wide">Guest Profile</div>
//                 <select 
//                   className="w-full border-none outline-none bg-transparent text-gray-800 font-bold text-lg cursor-pointer appearance-none transition-all duration-300"
//                   value={searchData.travelers}
//                   onChange={(e) => setSearchData(prev => ({...prev, travelers: e.target.value}))}
//                 >
//                   <option>2 Adults - Luxury Suite</option>
//                   <option>1 Adult - Executive Room</option>
//                   <option>2 Adults, 1 Child - Family Villa</option>
//                   <option>2 Adults, 2 Children - Premium Suite</option>
//                   <option>Group Booking - Multiple Rooms</option>
//                 </select>
//               </div>
//               <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0 group-hover:rotate-180 transition-transform duration-300" />
//             </div>

//             {/* Enhanced Search Button */}
//             <Button 
//               onClick={handleSearch}
//               className="group relative bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white px-10 py-6 rounded-2xl transition-all duration-300 hover:scale-105 flex-shrink-0 min-w-[140px] shadow-2xl overflow-hidden border border-yellow-400/30"
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
//               <span className="relative flex items-center font-bold text-lg">
//                 <Search className="w-6 h-6 mr-3" />
//                 Explore
//               </span>
//             </Button>
//           </div>
//         </div>

//         {/* Premium Video Controls */}
//         <div className="flex items-center justify-between bg-black/60 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 hover:border-white/30 transition-all duration-500 group">
//           <div className="flex items-center gap-4 min-w-0 flex-1">
//             <button
//               onClick={togglePlay}
//               className="p-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 hover:scale-110 shadow-lg flex-shrink-0 group"
//             >
//               {isPlaying ? 
//                 <Pause className="w-6 h-6 group-hover:scale-110 transition-transform" /> : 
//                 <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
//               }
//             </button>
//             <div className="min-w-0 flex-1">
//               <div className="font-bold text-white text-xl mb-2 group-hover:text-cyan-100 transition-colors duration-300">
//                 {videoCarousel[currentVideo].title}
//               </div>
//               <div className="text-white/70 text-base flex items-center gap-3 mb-1">
//                 <MapPin className="w-5 h-5 flex-shrink-0 text-cyan-400 group-hover:scale-110 transition-transform" />
//                 <span className="group-hover:text-white/90 transition-colors duration-300">
//                   {videoCarousel[currentVideo].location}
//                 </span>
//               </div>
//               <div className="text-white/60 text-sm">
//                 {videoCarousel[currentVideo].description}
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center gap-4 flex-shrink-0 ml-6">
//             {videoCarousel.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleVideoSelect(index)}
//                 className={`w-4 h-4 rounded-full transition-all duration-500 flex-shrink-0 shadow-lg ${
//                   index === currentVideo 
//                     ? "bg-gradient-to-r from-cyan-400 to-blue-500 scale-125 ring-2 ring-white/50" 
//                     : "bg-white/40 hover:bg-white/60 hover:scale-110"
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Enhanced Bottom Gradient with Wave */}
//       <div className="absolute bottom-0 left-0 right-0 z-10">
//         <div className="h-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
//         <div className="h-4 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-600/20 blur-sm" />
//       </div>

//       {/* Add these animations to your global CSS */}
//       <style jsx>{`
//         @keyframes gradient {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }
//         @keyframes float {
//           0%, 100% { transform: translateY(0px) rotate(45deg); }
//           50% { transform: translateY(-10px) rotate(45deg); }
//         }
//         .animate-gradient {
//           background-size: 200% 200%;
//           animation: gradient 3s ease infinite;
//         }
//         .animate-float {
//           animation: float 3s ease-in-out infinite;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default Hero;





// import { Button } from "@/components/ui/button";
// import {
//   ArrowRight,
//   Play,
//   Pause,
//   MapPin,
//   Calendar,
//   Users,
//   Search,
//   ChevronDown,
//   Star,
//   Shield,
//   Sparkles,
//   Globe,
//   Clock,
//   Plane,
//   Crown,
//   Trophy,
//   Award
// } from "lucide-react";
// import { useState, useEffect, useRef } from "react";
// import video1 from "../assets/video1 (1).mp4";
// import video2 from "../assets/video2.mp4"
// import video3 from "../assets/2098988-uhd_3840_2160_30fps.mp4";

// const Hero = () => {
//   const [currentVideo, setCurrentVideo] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(true);
//   const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
//   const [searchData, setSearchData] = useState({
//     destination: "",
//     checkIn: "",
//     travelers: "2 Adults"
//   });

//   const videoCarousel = [
//     {
//       id: 1,
//       video: video1,
//       title: "Luxury Beach Escape",
//       location: "Maldives & Bali",
//       gradient: "from-emerald-500/20 to-cyan-500/20",
//       description: "Experience pristine beaches and overwater villas"
//     },
//     {
//       id: 2,
//       video: video2,
//       title: "Alpine Adventure", 
//       location: "Swiss Alps & Himalayas",
//       gradient: "from-blue-500/20 to-purple-500/20",
//       description: "Conquer majestic peaks and scenic trails"
//     },
//     {
//       id: 3,
//       video: video3,
//       title: "Urban Luxury",
//       location: "Dubai & Singapore",
//       gradient: "from-red-500/20 to-pink-500/20",
//       description: "Discover modern marvels and cosmopolitan elegance"
//     },
//   ];

//   // Handle video playback
//   useEffect(() => {
//     videoRefs.current.forEach((video, index) => {
//       if (video) {
//         if (index === currentVideo && isPlaying) {
//           video.currentTime = 0;
//           video.play().catch(console.error);
//         } else {
//           video.pause();
//         }
//       }
//     });
//   }, [currentVideo, isPlaying]);

//   // Auto-advance to next video when current video ends
//   useEffect(() => {
//     const currentVideoRef = videoRefs.current[currentVideo];
//     if (currentVideoRef) {
//       const handleEnded = () => {
//         setCurrentVideo((prev) => (prev + 1) % videoCarousel.length);
//       };
//       currentVideoRef.addEventListener('ended', handleEnded);
//       return () => currentVideoRef.removeEventListener('ended', handleEnded);
//     }
//   }, [currentVideo, videoCarousel.length]);

//   useEffect(() => {
//     const nextWeek = new Date();
//     nextWeek.setDate(nextWeek.getDate() + 7);
//     setSearchData(prev => ({
//       ...prev,
//       checkIn: nextWeek.toISOString().split('T')[0]
//     }));
//   }, []);

//   const handleSearch = () => {
//     console.log("Searching:", searchData);
//   };

//   const togglePlay = () => {
//     setIsPlaying(!isPlaying);
//   };

//   const handleVideoSelect = (index: number) => {
//     setCurrentVideo(index);
//     setIsPlaying(true);
//   };

//   return (
//     <section className="relative text-white overflow-hidden min-h-[90vh] flex items-center">
//       {/* Enhanced Background with Floating Elements */}
//       <div className="absolute inset-0">
//         {videoCarousel.map((video, index) => (
//           <div
//             key={video.id}
//             className={`absolute inset-0 transition-opacity duration-1000 ${
//               index === currentVideo ? "opacity-100" : "opacity-0"
//             }`}
//           >
//             <video
//               ref={el => videoRefs.current[index] = el}
//               className="absolute inset-0 w-full h-full object-cover"
//               muted
//               playsInline
//               preload="auto"
//             >
//               <source src={video.video} type="video/mp4" />
//             </video>
//             <div className={`absolute inset-0 bg-gradient-to-r ${video.gradient} mix-blend-soft-light`} />
//           </div>
//         ))}
//         <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        
//         {/* Animated Background Elements */}
//         <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full blur-sm opacity-60 animate-pulse" />
//         <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-blue-400 rounded-full blur-sm opacity-40 animate-bounce delay-1000" />
//         <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-purple-400 rounded-full blur-sm opacity-50 animate-pulse delay-500" />
//       </div>

//       {/* Content */}
//       <div className="relative z-20 w-full py-16">
//         <div className="container mx-auto px-4">
//           {/* Enhanced Left Content */}
//           <div className="max-w-2xl">
//             {/* Premium Trust Badge */}
//             <div className="inline-flex items-center gap-3 px-5 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-sm mb-10 shadow-2xl hover:bg-white/15 transition-all duration-500 hover:scale-105 group">
//               <div className="relative">
//                 <Crown className="w-5 h-5 text-red-400" />
//                 <Sparkles className="w-3 h-3 text-red-300 absolute -top-1 -right-1 animate-pulse" />
//               </div>
//               <span className="font-semibold text-white/90">Award-Winning Luxury Travel</span>
//               <Award className="w-4 h-4 text-cyan-400 ml-2" />
//             </div>

//             {/* Enhanced Main Content */}
//             <div className="space-y-6 mb-12">
//               <div className="relative">
//                 <h1 className="text-6xl md:text-7xl font-bold leading-tight tracking-tight">
//                   <span className="flex items-center gap-3 mb-4">
//                     <Trophy className="w-12 h-12 text-red-400 animate-pulse" />
//                     <span className="bg-gradient-to-r from-red-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
//                       Premium
//                     </span>
//                   </span>
//                   <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient block mb-4">
//                     World-Class
//                   </span>
//                   <span className="flex items-center gap-3 text-white">
//                     Travel Experiences
//                     <Plane className="w-12 h-12 text-cyan-400 transform rotate-45 animate-float" />
//                   </span>
//                 </h1>
//               </div>
//               <p className="text-white/80 text-xl max-w-lg leading-relaxed font-light">
//                 Exclusive journeys across <span className="font-semibold text-cyan-300">60+ luxury destinations</span> with personalized service and unmatched excellence.
//               </p>
//             </div>

//             {/* Enhanced Stats Row */}
//             <div className="flex gap-10 mb-12">
//               {[
//                 { icon: Globe, value: "60+", label: "Luxury Destinations", color: "text-cyan-400" },
//                 { icon: Users, value: "25K+", label: "Elite Travelers", color: "text-blue-400" },
//                 { icon: Star, value: "4.9/5", label: "Guest Rating", color: "text-red-400" },
//                 { icon: Clock, value: "24/7", label: "Concierge", color: "text-green-400" }
//               ].map((stat, index) => (
//                 <div key={index} className="text-center group cursor-pointer transform hover:scale-110 transition-all duration-300">
//                   <div className="relative">
//                     <stat.icon className={`w-8 h-8 ${stat.color} mb-3 group-hover:scale-110 transition-transform duration-300`} />
//                   </div>
//                   <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
//                   <div className="text-white/70 text-sm font-medium tracking-wide max-w-[100px] leading-tight">{stat.label}</div>
//                 </div>
//               ))}
//             </div>

//             {/* Enhanced CTA Button */}
//             <Button className="group relative bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-400 hover:to-pink-400 text-white font-bold px-10 py-6 rounded-2xl transition-all duration-300 hover:scale-105 shadow-2xl overflow-hidden border border-red-400/30">
//               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
//               <span className="relative flex items-center text-lg">
//                 <Crown className="w-6 h-6 mr-3" />
//                 Discover Elite Packages
//                 <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
//               </span>
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Enhanced Search Section */}
//       <div className="absolute bottom-8 right-4 lg:right-8 z-20 space-y-4 w-full max-w-4xl px-4 lg:px-0">
//         {/* Premium Search Bar */}
//         <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/30 hover:border-white/40 transition-all duration-500 hover:shadow-3xl">
//           <div className="flex items-center gap-6">
//             {/* Destination */}
//             <div className="flex items-center gap-4 flex-1 min-w-0 group">
//               <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
//                 <MapPin className="w-6 h-6 text-white" />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <div className="text-xs text-gray-600 font-semibold mb-2 uppercase tracking-wide">Dream Destination</div>
//                 <input
//                   type="text"
//                   placeholder="Where luxury awaits?"
//                   className="w-full border-none outline-none bg-transparent text-gray-800 font-bold placeholder-gray-500 text-lg transition-all duration-300 focus:placeholder-transparent"
//                   value={searchData.destination}
//                   onChange={(e) => setSearchData(prev => ({...prev, destination: e.target.value}))}
//                 />
//               </div>
//             </div>

//             <div className="h-16 w-0.5 bg-gradient-to-b from-transparent via-gray-300 to-transparent flex-shrink-0" />

//             {/* Date */}
//             <div className="flex items-center gap-4 flex-1 min-w-0 group">
//               <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
//                 <Calendar className="w-6 h-6 text-white" />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <div className="text-xs text-gray-600 font-semibold mb-2 uppercase tracking-wide">Preferred Dates</div>
//                 <input
//                   type="date"
//                   className="w-full border-none outline-none bg-transparent text-gray-800 font-bold text-lg cursor-pointer transition-all duration-300"
//                   value={searchData.checkIn}
//                   onChange={(e) => setSearchData(prev => ({...prev, checkIn: e.target.value}))}
//                 />
//               </div>
//             </div>

//             <div className="h-16 w-0.5 bg-gradient-to-b from-transparent via-gray-300 to-transparent flex-shrink-0" />

//             {/* Travelers */}
//             <div className="flex items-center gap-4 flex-1 min-w-0 group">
//               <div className="p-3 bg-gradient-to-br from-purple-500 to-red-600 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
//                 <Users className="w-6 h-6 text-white" />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <div className="text-xs text-gray-600 font-semibold mb-2 uppercase tracking-wide">Guest Profile</div>
//                 <select 
//                   className="w-full border-none outline-none bg-transparent text-gray-800 font-bold text-lg cursor-pointer appearance-none transition-all duration-300"
//                   value={searchData.travelers}
//                   onChange={(e) => setSearchData(prev => ({...prev, travelers: e.target.value}))}
//                 >
//                   <option>2 Adults - Luxury Suite</option>
//                   <option>1 Adult - Executive Room</option>
//                   <option>2 Adults, 1 Child - Family Villa</option>
//                   <option>2 Adults, 2 Children - Premium Suite</option>
//                   <option>Group Booking - Multiple Rooms</option>
//                 </select>
//               </div>
//               <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0 group-hover:rotate-180 transition-transform duration-300" />
//             </div>

//             {/* Enhanced Search Button */}
//             <Button 
//               onClick={handleSearch}
//               className="group relative bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-400 hover:to-pink-400 text-white px-10 py-6 rounded-2xl transition-all duration-300 hover:scale-105 flex-shrink-0 min-w-[140px] shadow-2xl overflow-hidden border border-red-400/30"
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
//               <span className="relative flex items-center font-bold text-lg">
//                 <Search className="w-6 h-6 mr-3" />
//                 Explore
//               </span>
//             </Button>
//           </div>
//         </div>

//         {/* Premium Video Controls */}
//         <div className="flex items-center justify-between bg-black/60 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 hover:border-white/30 transition-all duration-500 group">
//           <div className="flex items-center gap-4 min-w-0 flex-1">
//             <button
//               onClick={togglePlay}
//               className="p-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 hover:scale-110 shadow-lg flex-shrink-0 group"
//             >
//               {isPlaying ? 
//                 <Pause className="w-6 h-6 group-hover:scale-110 transition-transform" /> : 
//                 <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
//               }
//             </button>
//             <div className="min-w-0 flex-1">
//               <div className="font-bold text-white text-xl mb-2 group-hover:text-cyan-100 transition-colors duration-300">
//                 {videoCarousel[currentVideo].title}
//               </div>
//               <div className="text-white/70 text-base flex items-center gap-3 mb-1">
//                 <MapPin className="w-5 h-5 flex-shrink-0 text-cyan-400 group-hover:scale-110 transition-transform" />
//                 <span className="group-hover:text-white/90 transition-colors duration-300">
//                   {videoCarousel[currentVideo].location}
//                 </span>
//               </div>
//               <div className="text-white/60 text-sm">
//                 {videoCarousel[currentVideo].description}
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center gap-4 flex-shrink-0 ml-6">
//             {videoCarousel.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleVideoSelect(index)}
//                 className={`w-4 h-4 rounded-full transition-all duration-500 flex-shrink-0 shadow-lg ${
//                   index === currentVideo 
//                     ? "bg-gradient-to-r from-cyan-400 to-blue-500 scale-125 ring-2 ring-white/50" 
//                     : "bg-white/40 hover:bg-white/60 hover:scale-110"
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Enhanced Bottom Gradient with Wave */}
//       <div className="absolute bottom-0 left-0 right-0 z-10">
//         <div className="h-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
//         <div className="h-4 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-600/20 blur-sm" />
//       </div>

//       {/* Add these animations to your global CSS */}
//       <style jsx>{`
//         @keyframes gradient {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }
//         @keyframes float {
//           0%, 100% { transform: translateY(0px) rotate(45deg); }
//           50% { transform: translateY(-10px) rotate(45deg); }
//         }
//         .animate-gradient {
//           background-size: 200% 200%;
//           animation: gradient 3s ease infinite;
//         }
//         .animate-float {
//           animation: float 3s ease-in-out infinite;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default Hero;






// import { Button } from "@/components/ui/button";
// import {
//   ArrowRight,
//   Play,
//   Pause,
//   MapPin,
//   Calendar,
//   Users,
//   Search,
//   ChevronDown,
//   Star,
//   Shield,
//   Sparkles,
//   Globe,
//   Clock,
//   Plane,
//   Crown,
//   Trophy,
//   Award
// } from "lucide-react";
// import { useState, useEffect, useRef } from "react";
// import video1 from "../assets/video1 (1).mp4";
// import video2 from "../assets/video2.mp4"
// import video3 from "../assets/2098988-uhd_3840_2160_30fps.mp4";

// const Hero = () => {
//   const [currentVideo, setCurrentVideo] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(true);
//   const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
//   const [searchData, setSearchData] = useState({
//     destination: "",
//     checkIn: "",
//     travelers: "2 Adults"
//   });

//   const videoCarousel = [
//     {
//       id: 1,
//       video: video1,
//       title: "Luxury Beach Escape",
//       location: "Maldives & Bali",
//       gradient: "from-emerald-500/20 to-cyan-500/20",
//       description: "Experience pristine beaches and overwater villas"
//     },
//     {
//       id: 2,
//       video: video2,
//       title: "Alpine Adventure", 
//       location: "Swiss Alps & Himalayas",
//       gradient: "from-blue-500/20 to-purple-500/20",
//       description: "Conquer majestic peaks and scenic trails"
//     },
//     {
//       id: 3,
//       video: video3,
//       title: "Urban Luxury",
//       location: "Dubai & Singapore",
//       gradient: "from-red-500/20 to-pink-500/20",
//       description: "Discover modern marvels and cosmopolitan elegance"
//     },
//   ];

//   // Handle video playback
//   useEffect(() => {
//     videoRefs.current.forEach((video, index) => {
//       if (video) {
//         if (index === currentVideo && isPlaying) {
//           video.currentTime = 0;
//           video.play().catch(console.error);
//         } else {
//           video.pause();
//         }
//       }
//     });
//   }, [currentVideo, isPlaying]);

//   // Auto-advance to next video when current video ends
//   useEffect(() => {
//     const currentVideoRef = videoRefs.current[currentVideo];
//     if (currentVideoRef) {
//       const handleEnded = () => {
//         setCurrentVideo((prev) => (prev + 1) % videoCarousel.length);
//       };
//       currentVideoRef.addEventListener('ended', handleEnded);
//       return () => currentVideoRef.removeEventListener('ended', handleEnded);
//     }
//   }, [currentVideo, videoCarousel.length]);

//   useEffect(() => {
//     const nextWeek = new Date();
//     nextWeek.setDate(nextWeek.getDate() + 7);
//     setSearchData(prev => ({
//       ...prev,
//       checkIn: nextWeek.toISOString().split('T')[0]
//     }));
//   }, []);

//   const handleSearch = () => {
//     console.log("Searching:", searchData);
//   };

//   const togglePlay = () => {
//     setIsPlaying(!isPlaying);
//   };

//   const handleVideoSelect = (index: number) => {
//     setCurrentVideo(index);
//     setIsPlaying(true);
//   };

//   return (
//     <section className="relative text-white overflow-hidden min-h-[90vh] flex items-center">
//       {/* Enhanced Background with Floating Elements */}
//       <div className="absolute inset-0">
//         {videoCarousel.map((video, index) => (
//           <div
//             key={video.id}
//             className={`absolute inset-0 transition-opacity duration-1000 ${
//               index === currentVideo ? "opacity-100" : "opacity-0"
//             }`}
//           >
//             <video
//               ref={el => videoRefs.current[index] = el}
//               className="absolute inset-0 w-full h-full object-cover"
//               muted
//               playsInline
//               preload="auto"
//             >
//               <source src={video.video} type="video/mp4" />
//             </video>
//             <div className={`absolute inset-0 bg-gradient-to-r ${video.gradient} mix-blend-soft-light`} />
//           </div>
//         ))}
//         <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        
//         {/* Animated Background Elements */}
//         <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full blur-sm opacity-60 animate-pulse" />
//         <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-blue-400 rounded-full blur-sm opacity-40 animate-bounce delay-1000" />
//         <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-purple-400 rounded-full blur-sm opacity-50 animate-pulse delay-500" />
//       </div>

//       {/* Content */}
//       <div className="relative z-20 w-full py-16">
//         <div className="container mx-auto px-4">
//           {/* Enhanced Left Content */}
//           <div className="max-w-2xl">
//             {/* Premium Trust Badge */}
//             <div className="inline-flex items-center gap-3 px-5 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-sm mb-10 shadow-2xl hover:bg-white/15 transition-all duration-500 hover:scale-105 group">
//               <div className="relative">
//                 <Crown className="w-5 h-5 text-red-400" />
//                 <Sparkles className="w-3 h-3 text-red-300 absolute -top-1 -right-1 animate-pulse" />
//               </div>
//               <span className="font-semibold text-white/90">Award-Winning Luxury Travel</span>
//               <Award className="w-4 h-4 text-cyan-400 ml-2" />
//             </div>

//             {/* Enhanced Main Content */}
//             <div className="space-y-6 mb-12">
//               <div className="relative">
//                 <h1 className="text-6xl md:text-7xl font-bold leading-tight tracking-tight">
//                   <span className="flex items-center gap-3 mb-4">
//                     <Trophy className="w-12 h-12 text-red-400 animate-pulse" />
//                     <span className="bg-gradient-to-r from-red-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
//                       Premium
//                     </span>
//                   </span>
//                   <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient block mb-4">
//                     World-Class
//                   </span>
//                   <span className="flex items-center gap-3 text-white">
//                     Travel Experiences
//                     <Plane className="w-12 h-12 text-cyan-400 transform rotate-45 animate-float" />
//                   </span>
//                 </h1>
//               </div>
//               <p className="text-white/80 text-xl max-w-lg leading-relaxed font-light">
//                 Exclusive journeys across <span className="font-semibold text-cyan-300">60+ luxury destinations</span> with personalized service and unmatched excellence.
//               </p>
//             </div>

//             {/* Enhanced Stats Row */}
//             <div className="flex gap-10 mb-12">
//               {[
//                 { icon: Globe, value: "60+", label: "Luxury Destinations", color: "text-cyan-400" },
//                 { icon: Users, value: "25K+", label: "Elite Travelers", color: "text-blue-400" },
//                 { icon: Star, value: "4.9/5", label: "Guest Rating", color: "text-red-400" },
//                 { icon: Clock, value: "24/7", label: "Concierge", color: "text-green-400" }
//               ].map((stat, index) => (
//                 <div key={index} className="text-center group cursor-pointer transform hover:scale-110 transition-all duration-300">
//                   <div className="relative">
//                     <stat.icon className={`w-8 h-8 ${stat.color} mb-3 group-hover:scale-110 transition-transform duration-300`} />
//                   </div>
//                   <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
//                   <div className="text-white/70 text-sm font-medium tracking-wide max-w-[100px] leading-tight">{stat.label}</div>
//                 </div>
//               ))}
//             </div>

//             {/* Enhanced CTA Button */}
//             <Button className="group relative bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-400 hover:to-pink-400 text-white font-bold px-10 py-6 rounded-2xl transition-all duration-300 hover:scale-105 shadow-2xl overflow-hidden border border-red-400/30">
//               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
//               <span className="relative flex items-center text-lg">
//                 <Crown className="w-6 h-6 mr-3" />
//                 Discover Elite Packages
//                 <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
//               </span>
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Enhanced Search Section */}
//       <div className="absolute bottom-8 right-4 lg:right-8 z-20 space-y-4 w-full max-w-4xl px-4 lg:px-0">
//         {/* Premium Search Bar */}
//         <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/30 hover:border-white/40 transition-all duration-500 hover:shadow-3xl">
//           <div className="flex items-center gap-6">
//             {/* Destination */}
//             <div className="flex items-center gap-4 flex-1 min-w-0 group">
//               <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
//                 <MapPin className="w-6 h-6 text-white" />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <div className="text-xs text-gray-600 font-semibold mb-2 uppercase tracking-wide">Dream Destination</div>
//                 <input
//                   type="text"
//                   placeholder="Where luxury awaits?"
//                   className="w-full border-none outline-none bg-transparent text-gray-800 font-bold placeholder-gray-500 text-lg transition-all duration-300 focus:placeholder-transparent"
//                   value={searchData.destination}
//                   onChange={(e) => setSearchData(prev => ({...prev, destination: e.target.value}))}
//                 />
//               </div>
//             </div>

//             <div className="h-16 w-0.5 bg-gradient-to-b from-transparent via-gray-300 to-transparent flex-shrink-0" />

//             {/* Date */}
//             <div className="flex items-center gap-4 flex-1 min-w-0 group">
//               <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
//                 <Calendar className="w-6 h-6 text-white" />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <div className="text-xs text-gray-600 font-semibold mb-2 uppercase tracking-wide">Preferred Dates</div>
//                 <input
//                   type="date"
//                   className="w-full border-none outline-none bg-transparent text-gray-800 font-bold text-lg cursor-pointer transition-all duration-300"
//                   value={searchData.checkIn}
//                   onChange={(e) => setSearchData(prev => ({...prev, checkIn: e.target.value}))}
//                 />
//               </div>
//             </div>

//             <div className="h-16 w-0.5 bg-gradient-to-b from-transparent via-gray-300 to-transparent flex-shrink-0" />

//             {/* Travelers */}
//             <div className="flex items-center gap-4 flex-1 min-w-0 group">
//               <div className="p-3 bg-gradient-to-br from-purple-500 to-red-600 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
//                 <Users className="w-6 h-6 text-white" />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <div className="text-xs text-gray-600 font-semibold mb-2 uppercase tracking-wide">Guest Profile</div>
//                 <select 
//                   className="w-full border-none outline-none bg-transparent text-gray-800 font-bold text-lg cursor-pointer appearance-none transition-all duration-300"
//                   value={searchData.travelers}
//                   onChange={(e) => setSearchData(prev => ({...prev, travelers: e.target.value}))}
//                 >
//                   <option>2 Adults - Luxury Suite</option>
//                   <option>1 Adult - Executive Room</option>
//                   <option>2 Adults, 1 Child - Family Villa</option>
//                   <option>2 Adults, 2 Children - Premium Suite</option>
//                   <option>Group Booking - Multiple Rooms</option>
//                 </select>
//               </div>
//               <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0 group-hover:rotate-180 transition-transform duration-300" />
//             </div>

//             {/* Enhanced Search Button */}
//             <Button 
//               onClick={handleSearch}
//               className="group relative bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-400 hover:to-pink-400 text-white px-10 py-6 rounded-2xl transition-all duration-300 hover:scale-105 flex-shrink-0 min-w-[140px] shadow-2xl overflow-hidden border border-red-400/30"
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
//               <span className="relative flex items-center font-bold text-lg">
//                 <Search className="w-6 h-6 mr-3" />
//                 Explore
//               </span>
//             </Button>
//           </div>
//         </div>

//         {/* Premium Video Controls */}
//         <div className="flex items-center justify-between bg-black/60 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 hover:border-white/30 transition-all duration-500 group">
//           <div className="flex items-center gap-4 min-w-0 flex-1">
//             <button
//               onClick={togglePlay}
//               className="p-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 hover:scale-110 shadow-lg flex-shrink-0 group"
//             >
//               {isPlaying ? 
//                 <Pause className="w-6 h-6 group-hover:scale-110 transition-transform" /> : 
//                 <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
//               }
//             </button>
//             <div className="min-w-0 flex-1">
//               <div className="font-bold text-white text-xl mb-2 group-hover:text-cyan-100 transition-colors duration-300">
//                 {videoCarousel[currentVideo].title}
//               </div>
//               <div className="text-white/70 text-base flex items-center gap-3 mb-1">
//                 <MapPin className="w-5 h-5 flex-shrink-0 text-cyan-400 group-hover:scale-110 transition-transform" />
//                 <span className="group-hover:text-white/90 transition-colors duration-300">
//                   {videoCarousel[currentVideo].location}
//                 </span>
//               </div>
//               <div className="text-white/60 text-sm">
//                 {videoCarousel[currentVideo].description}
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center gap-4 flex-shrink-0 ml-6">
//             {videoCarousel.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleVideoSelect(index)}
//                 className={`w-4 h-4 rounded-full transition-all duration-500 flex-shrink-0 shadow-lg ${
//                   index === currentVideo 
//                     ? "bg-gradient-to-r from-cyan-400 to-blue-500 scale-125 ring-2 ring-white/50" 
//                     : "bg-white/40 hover:bg-white/60 hover:scale-110"
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Enhanced Bottom Gradient with Wave */}
//       <div className="absolute bottom-0 left-0 right-0 z-10">
//         <div className="h-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
//         <div className="h-4 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-600/20 blur-sm" />
//       </div>

//       {/* Add these animations to your global CSS */}
//       <style jsx>{`
//         @keyframes gradient {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }
//         @keyframes float {
//           0%, 100% { transform: translateY(0px) rotate(45deg); }
//           50% { transform: translateY(-10px) rotate(45deg); }
//         }
//         .animate-gradient {
//           background-size: 200% 200%;
//           animation: gradient 3s ease infinite;
//         }
//         .animate-float {
//           animation: float 3s ease-in-out infinite;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default Hero;




import { BASE_URL } from "@/ApiUrls";
import { useState, useEffect, useRef } from "react";

const Hero = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoCarousel, setVideoCarousel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const videoRefs = useRef([]);

  // Fetch videos from API
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`${BASE_URL}/api/videos`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const activeVideos = data.filter(video => video.is_active === true);
        setVideoCarousel(activeVideos);
        
      } catch (error) {
        console.error('Error fetching videos:', error);
        setError('Failed to load videos.');
        
        // Fallback to local videos if API fails
        setVideoCarousel([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
    
    // Refresh videos every 5 minutes
    const interval = setInterval(fetchVideos, 300000);
    return () => clearInterval(interval);
  }, []);

  // Handle video playback
  useEffect(() => {
    if (videoCarousel.length === 0) return;
    
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentVideo && isPlaying) {
          video.currentTime = 0;
          const playPromise = video.play();
          
          if (playPromise !== undefined) {
            playPromise.catch(err => {
              console.error('Error playing video:', err);
              setIsPlaying(false);
            });
          }
        } else {
          video.pause();
        }
      }
    });
  }, [currentVideo, isPlaying, videoCarousel]);

  // Auto-advance to next video when current video ends
  useEffect(() => {
    if (videoCarousel.length === 0) return;
    
    const currentVideoRef = videoRefs.current[currentVideo];
    if (currentVideoRef) {
      const handleEnded = () => {
        setCurrentVideo((prev) => (prev + 1) % videoCarousel.length);
      };
      currentVideoRef.addEventListener('ended', handleEnded);
      return () => {
        if (currentVideoRef) {
          currentVideoRef.removeEventListener('ended', handleEnded);
        }
      };
    }
  }, [currentVideo, videoCarousel.length]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVideoSelect = (index) => {
    setCurrentVideo(index);
    setIsPlaying(true);
  };

  const handleRetry = () => {
    window.location.reload();
  };

  // Loading state
  if (loading) {
    return (
      <section className="relative text-white overflow-hidden min-h-[90vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto"></div>
          <p className="mt-4">Loading videos...</p>
        </div>
      </section>
    );
  }

  // Error state
  if (error && videoCarousel.length === 0) {
    return (
      <section className="relative text-white overflow-hidden min-h-[90vh] flex items-center justify-center">
        <div className="text-center p-8 bg-red-900/20 rounded-lg max-w-md">
          <p className="text-red-300 mb-4">{error}</p>
          <button 
            onClick={handleRetry}
            className="mt-4 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
          >
            Retry Loading
          </button>
        </div>
      </section>
    );
  }

  // Empty state (no videos available)
  if (videoCarousel.length === 0) {
    return (
      <section className="relative text-white overflow-hidden min-h-[90vh] flex items-center justify-center">
        <div className="text-center p-8 bg-blue-900/20 rounded-lg max-w-md">
          <p className="text-xl mb-2">No videos available</p>
          <p className="text-white/60 mb-4">Add videos from the admin panel</p>
          <button 
            onClick={handleRetry}
            className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
          >
            Check Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="relative text-white overflow-hidden min-h-[90vh] flex items-center">
      {/* Video Background Only */}
      <div className="absolute inset-0">
        {videoCarousel.map((video, index) => (
          <div
            key={video.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentVideo ? "opacity-100" : "opacity-0"
            }`}
          >
            <video
              ref={el => {
                videoRefs.current[index] = el;
                if (el && !videoRefs.current[index]) {
                  videoRefs.current[index] = el;
                }
              }}
              className="absolute inset-0 w-full h-full object-cover"
              muted
              playsInline
              preload="auto"
              loop
            >
              <source src={video.video_url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>

      {/* Video controls */}
      <div className="absolute bottom-8 right-8 z-20">
        <div className="flex items-center gap-4 bg-black/40 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
          <button
            onClick={togglePlay}
            className="p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-all duration-300 transform hover:scale-110"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <span className="w-6 h-6 flex items-center justify-center">⏸️</span>
            ) : (
              <span className="w-6 h-6 flex items-center justify-center">▶️</span>
            )}
          </button>
          <div className="flex items-center gap-2">
            {videoCarousel.map((_, index) => (
              <button
                key={index}
                onClick={() => handleVideoSelect(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentVideo 
                    ? "bg-white scale-125" 
                    : "bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to video ${index + 1}`}
              />
            ))}
          </div>
          <div className="text-sm text-white/70 ml-2 min-w-[60px]">
            {currentVideo + 1} / {videoCarousel.length}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;