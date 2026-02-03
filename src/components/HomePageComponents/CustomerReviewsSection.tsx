// import React, { useState, useEffect, useRef } from "react";
// import { ChevronLeft, ChevronRight, Star, Quote, MapPin, Calendar } from "lucide-react";
// import "./CustomerReviewsSection.css";

// const customerReviews = [
//   {
//     id: 1,
//     name: "Priya Sharma",
//     location: "Mumbai",
//     rating: 5,
//     review: "The Bali tour was absolutely magical! Every detail was perfectly planned. The beaches, the culture, the food - everything exceeded our expectations. Will definitely travel with them again!",
//     date: "2 weeks ago",
//     tour: "Bali Tropical Paradise",
//     image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1200"
//   },
//   {
//     id: 2,
//     name: "Rahul Verma",
//     location: "Delhi",
//     rating: 5,
//     review: "Swiss Alps adventure was the trip of a lifetime! The tour guides were knowledgeable, accommodations were excellent, and the scenery was breathtaking. Highly recommended!",
//     date: "1 month ago",
//     tour: "Swiss Alps Adventure",
//     image: "https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg?auto=compress&cs=tinysrgb&w=1200"
//   },
//   {
//     id: 3,
//     name: "Anita Patel",
//     location: "Bangalore",
//     rating: 4,
//     review: "Great experience in Tokyo! The cultural immersion was amazing. The only minor issue was the hotel location, but everything else was perfect. Will book again!",
//     date: "3 weeks ago",
//     tour: "Tokyo City Experience",
//     image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1200"
//   },
//   {
//     id: 4,
//     name: "Sanjay Kumar",
//     location: "Chennai",
//     rating: 5,
//     review: "Paris romantic getaway was everything we hoped for and more! The Eiffel Tower dinner was magical. Perfect for honeymooners!",
//     date: "2 months ago",
//     tour: "Paris Romantic Getaway",
//     image: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1200"
//   },
//   {
//     id: 5,
//     name: "Meera Nair",
//     location: "Kolkata",
//     rating: 5,
//     review: "Dubai luxury escape was worth every penny! The desert safari and Burj Khalifa experience were unforgettable. Excellent service throughout!",
//     date: "1 week ago",
//     tour: "Dubai Luxury Escape",
//     image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1200"
//   },
//   {
//     id: 6,
//     name: "Vikram Singh",
//     location: "Hyderabad",
//     rating: 4,
//     review: "Thailand island hopping was fantastic! Beautiful beaches and great activities. The tour guides were very friendly and helpful.",
//     date: "3 months ago",
//     tour: "Thailand Island Hopping",
//     image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1200"
//   }
// ];

// const CustomerReviewsSection = () => {
//   const [visibleCards, setVisibleCards] = useState(3);
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
//         setVisibleCards(3);
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
//       scrollPositionRef.current += 0.6; // Slower speed for reviews
      
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
//       const cardWidth = scrollContainer.scrollWidth / (customerReviews.length * 2);
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
//       }, 3000);
//     }
//   };

//   const prevSlide = () => {
//     if (scrollContainerRef.current) {
//       isManualScrollingRef.current = true;
//       setIsAutoPlaying(false);
      
//       const scrollContainer = scrollContainerRef.current;
//       const cardWidth = scrollContainer.scrollWidth / (customerReviews.length * 2);
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
//       }, 3000);
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

//   // Render star rating
//   const renderStars = (rating: number) => {
//     return Array.from({ length: 5 }, (_, index) => (
//       <Star
//         key={index}
//         className={`h-4 w-4 ${
//           index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
//         }`}
//       />
//     ));
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
//               Customer <span className="text-[#E31B23]">Reviews</span>
//             </h2>
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Reviews Container with Gradient Background */}
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
//             {/* Carousel Header */}
//             <div className="flex items-center justify-between mb-8">
//               <div>
//                 <h3 className="text-2xl font-bold text-white drop-shadow-lg">
//                   What Our Travelers Say
//                 </h3>
//                 <p className="text-white/80 text-sm drop-shadow mt-1">
//                   Real experiences from our happy customers
//                 </p>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={prevSlide}
//                     className="bg-blue-600 hover:bg-blue-700 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 border border-white/20"
//                   >
//                     <ChevronLeft className="h-5 w-5" />
//                   </button>
//                   <button
//                     onClick={nextSlide}
//                     className="bg-blue-600 hover:bg-blue-700 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 border border-white/20"
//                   >
//                     <ChevronRight className="h-5 w-5" />
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Reviews Carousel */}
//             <div className="relative">
//               {/* Reviews Container with Continuous Scroll */}
//               <div 
//                 ref={scrollContainerRef}
//                 className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
//                 style={{ 
//                   scrollBehavior: 'auto',
//                 }}
//               >
//                 {/* Duplicate reviews for seamless looping */}
//                 {[...customerReviews, ...customerReviews].map((review, index) => (
//                   <div
//                     key={`${review.id}-${index}`}
//                     className="flex-shrink-0"
//                     style={{ width: `calc(${100 / visibleCards}% - 20px)` }}
//                     onMouseEnter={handleCardMouseEnter}
//                     onMouseLeave={handleCardMouseLeave}
//                   >
//                     <div className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full border border-white/20 p-6">
//                       {/* Quote Icon */}
//                       <div className="absolute top-4 right-4 opacity-10">
//                         <Quote className="h-12 w-12 text-blue-600" />
//                       </div>

//                       {/* Review Content */}
//                       <div className="relative z-10">
//                         {/* Stars */}
//                         <div className="flex items-center gap-1 mb-4">
//                           {renderStars(review.rating)}
//                         </div>

//                         {/* Review Text */}
//                         <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-5">
//                           "{review.review}"
//                         </p>

//                         {/* Tour Info */}
//                         <div className="bg-blue-50 rounded-lg p-3 mb-4 border border-blue-100">
//                           <p className="text-xs font-semibold text-blue-800 mb-1">Tour Taken:</p>
//                           <p className="text-sm text-blue-900 font-medium">{review.tour}</p>
//                         </div>

//                         {/* Customer Info */}
//                         <div className="flex items-center gap-3">
//                           <img
//                             src={review.image}
//                             alt={review.name}
//                             className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
//                           />
//                           <div className="flex-1">
//                             <h4 className="font-semibold text-gray-900 text-sm">{review.name}</h4>
//                             <div className="flex items-center gap-2 text-xs text-gray-600">
//                               <MapPin className="h-3 w-3" />
//                               <span>{review.location}</span>
//                               <Calendar className="h-3 w-3 ml-1" />
//                               <span>{review.date}</span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Auto-play Status Indicator */}
//               <div className="flex justify-center items-center mt-8 gap-3">
//                 <div className={`w-3 h-3 rounded-full ${
//                   isAutoPlaying ? 'bg-green-400 animate-pulse' : 'bg-red-400'
//                 } shadow-lg`} />
//                 <span className="text-sm text-white drop-shadow-lg font-medium">
//                   {isAutoPlaying ? 'Auto-scrolling' : 'Paused'}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Trust Indicators */}
//         <div className="text-center mb-12">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
//             <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
//               <div className="text-3xl font-bold text-blue-600 mb-2">4.9/5</div>
//               <div className="text-sm text-gray-600">Average Rating</div>
//             </div>
//             <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
//               <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
//               <div className="text-sm text-gray-600">Verified Reviews</div>
//             </div>
//             <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
//               <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
//               <div className="text-sm text-gray-600">Recommend Us</div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom CTA */}
//         <div className="text-center">
//           <button className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 border border-white/20">
//             <Star className="h-5 w-5" />
//             Share Your Experience
//             <ChevronRight className="h-5 w-5" />
//           </button>
//           <p className="mt-4 text-gray-600 text-sm">
//             Join thousands of happy travelers sharing their stories
//           </p>
//         </div>
//       </div>

   
      
//     </section>
//   );
// };

// export default CustomerReviewsSection;








import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star, Quote, MapPin, Calendar } from "lucide-react";
import "./CustomerReviewsSection.css";

const customerReviews = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    review: "The Bali tour was absolutely magical! Every detail was perfectly planned. The beaches, the culture, the food - everything exceeded our expectations. Will definitely travel with them again!",
    date: "2 weeks ago",
    tour: "Bali Tropical Paradise",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },
  {
    id: 2,
    name: "Rahul Verma",
    location: "Delhi",
    rating: 5,
    review: "Swiss Alps adventure was the trip of a lifetime! The tour guides were knowledgeable, accommodations were excellent, and the scenery was breathtaking. Highly recommended!",
    date: "1 month ago",
    tour: "Swiss Alps Adventure",
    image: "https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },
  {
    id: 3,
    name: "Anita Patel",
    location: "Bangalore",
    rating: 4,
    review: "Great experience in Tokyo! The cultural immersion was amazing. The only minor issue was the hotel location, but everything else was perfect. Will book again!",
    date: "3 weeks ago",
    tour: "Tokyo City Experience",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },
  {
    id: 4,
    name: "Sanjay Kumar",
    location: "Chennai",
    rating: 5,
    review: "Paris romantic getaway was everything we hoped for and more! The Eiffel Tower dinner was magical. Perfect for honeymooners!",
    date: "2 months ago",
    tour: "Paris Romantic Getaway",
    image: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },
  {
    id: 5,
    name: "Meera Nair",
    location: "Kolkata",
    rating: 5,
    review: "Dubai luxury escape was worth every penny! The desert safari and Burj Khalifa experience were unforgettable. Excellent service throughout!",
    date: "1 week ago",
    tour: "Dubai Luxury Escape",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },
  {
    id: 6,
    name: "Vikram Singh",
    location: "Hyderabad",
    rating: 4,
    review: "Thailand island hopping was fantastic! Beautiful beaches and great activities. The tour guides were very friendly and helpful.",
    date: "3 months ago",
    tour: "Thailand Island Hopping",
    image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1200"
  }
];

const CustomerReviewsSection = () => {
  const [visibleCards, setVisibleCards] = useState(3);
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
        setVisibleCards(3);
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
      scrollPositionRef.current += 0.6; // Slower speed for reviews
      
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
      const cardWidth = scrollContainer.scrollWidth / (customerReviews.length * 2);
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
      }, 3000);
    }
  };

  const prevSlide = () => {
    if (scrollContainerRef.current) {
      isManualScrollingRef.current = true;
      setIsAutoPlaying(false);
      
      const scrollContainer = scrollContainerRef.current;
      const cardWidth = scrollContainer.scrollWidth / (customerReviews.length * 2);
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
      }, 3000);
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

  // Render star rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
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
              Customer <span className="text-[#E31B23]">Reviews</span>
            </h2>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Reviews Container with Gradient Background */}
        <div 
          className="rounded-2xl shadow-2xl p-8 mb-10 relative overflow-hidden"
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
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                  What Our Travelers Say
                </h3>
                <p className="text-white/80 text-sm drop-shadow mt-1">
                  Real experiences from our happy customers
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevSlide}
                    className="bg-blue-600 hover:bg-blue-700 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 border border-white/20"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="bg-blue-600 hover:bg-blue-700 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 border border-white/20"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Reviews Carousel */}
            <div className="relative">
              {/* Reviews Container with Continuous Scroll */}
              <div 
                ref={scrollContainerRef}
                className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
                style={{ 
                  scrollBehavior: 'auto',
                }}
              >
                {/* Duplicate reviews for seamless looping */}
                {[...customerReviews, ...customerReviews].map((review, index) => (
                  <div
                    key={`${review.id}-${index}`}
                    className="flex-shrink-0"
                    style={{ width: `calc(${100 / visibleCards}% - 20px)` }}
                    onMouseEnter={handleCardMouseEnter}
                    onMouseLeave={handleCardMouseLeave}
                  >
                    <div className="group cursor-pointer bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full border border-blue-200 p-6">
                      {/* Quote Icon */}
                      <div className="absolute top-4 right-4 opacity-10">
                        <Quote className="h-12 w-12 text-blue-600" />
                      </div>

                      {/* Review Content */}
                      <div className="relative z-10">
                        {/* Stars */}
                        <div className="flex items-center gap-1 mb-4">
                          {renderStars(review.rating)}
                        </div>

                        {/* Review Text */}
                        <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-5">
                          "{review.review}"
                        </p>

                        {/* Tour Info */}
                        <div className="bg-blue-100 rounded-lg p-3 mb-4 border border-blue-200">
                          <p className="text-xs font-semibold text-blue-800 mb-1">Tour Taken:</p>
                          <p className="text-sm text-blue-900 font-medium">{review.tour}</p>
                        </div>

                        {/* Customer Info */}
                        <div className="flex items-center gap-3">
                          <img
                            src={review.image}
                            alt={review.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-blue-300"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 text-sm">{review.name}</h4>
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <MapPin className="h-3 w-3" />
                              <span>{review.location}</span>
                              <Calendar className="h-3 w-3 ml-1" />
                              <span>{review.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Auto-play Status Indicator */}
              <div className="flex justify-center items-center mt-8 gap-3">
                <div className={`w-3 h-3 rounded-full ${
                  isAutoPlaying ? 'bg-green-400 animate-pulse' : 'bg-red-400'
                } shadow-lg`} />
                <span className="text-sm text-white drop-shadow-lg font-medium">
                  {isAutoPlaying ? 'Auto-scrolling' : 'Paused'}
                </span>
              </div>
            </div>
          </div>
        </div>

   
        

        {/* Bottom CTA */}
        <div className="text-center">
          <button className="inline-flex mb-10 items-center gap-3 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 border border-white/20">
            <Star className="h-5 w-5" />
            Share Your Experience
            <ChevronRight className="h-5 w-5" />
          </button>
          
        </div>
      </div>
    </section>
  );
};

export default CustomerReviewsSection;