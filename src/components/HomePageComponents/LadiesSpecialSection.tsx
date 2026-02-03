import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, MapPin, Star, Users, Calendar, Heart } from "lucide-react";
import "./LadiesSpecialSection.css";


const ladiesSpecialTours = [
  {
    id: 1,
    name: "Luxury Spa Retreat",
    location: "Udaipur",
    duration: "3 Days",
    price: "₹18,999",
    image: "https://images.pexels.com/photos/164455/pexels-photo-164455.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.9,
    travelers: 1560,
    badge: "Wellness"
  },
  {
    id: 2,
    name: "Shopping & Heritage Tour",
    location: "Delhi",
    duration: "2 Days",
    price: "₹12,499",
    image: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.7,
    travelers: 2340,
    badge: "Shopping"
  },
  {
    id: 3,
    name: "Beach Yoga Retreat",
    location: "Goa",
    duration: "3 Days",
    price: "₹15,999",
    image: "https://images.pexels.com/photos/1812963/pexels-photo-1812963.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.8,
    travelers: 1280,
    badge: "Yoga"
  },
  {
    id: 4,
    name: "Wine Tasting Tour",
    location: "Nashik",
    duration: "2 Days",
    price: "₹14,499",
    image: "https://images.pexels.com/photos/290316/pexels-photo-290316.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.6,
    travelers: 890,
    badge: "Wine"
  },
  {
    id: 5,
    name: "Cultural Cooking Experience",
    location: "Kerala",
    duration: "3 Days",
    price: "₹16,999",
    image: "https://images.pexels.com/photos/5907778/pexels-photo-5907778.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.9,
    travelers: 1120,
    badge: "Culinary"
  },
  {
    id: 6,
    name: "Mountain Wellness Camp",
    location: "Shimla",
    duration: "3 Days",
    price: "₹13,999",
    image: "https://images.pexels.com/photos/1450082/pexels-photo-1450082.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.7,
    travelers: 1670,
    badge: "Wellness"
  },
  {
    id: 7,
    name: "Desert Glamping",
    location: "Jaisalmer",
    duration: "2 Days",
    price: "₹11,999",
    image: "https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.8,
    travelers: 950,
    badge: "Luxury"
  },
  {
    id: 8,
    name: "Tea Garden Meditation",
    location: "Darjeeling",
    duration: "3 Days",
    price: "₹17,499",
    image: "https://images.pexels.com/photos/459077/pexels-photo-459077.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.9,
    travelers: 740,
    badge: "Meditation"
  }
];

const LadiesSpecialSection: React.FC = () => {
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
      const cardWidth = scrollContainer.scrollWidth / (ladiesSpecialTours.length * 2);
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
      const cardWidth = scrollContainer.scrollWidth / (ladiesSpecialTours.length * 2);
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
              Ladies <span className="text-[#E31B23]">Special</span>
            </h2>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Carousel Container with Gradient Background */}
        <div 
          className="rounded-2xl shadow-lg p-6 mb-10 border border-gray-100 relative overflow-hidden"
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
                {/* <h3 className="text-xl font-bold text-white drop-shadow-lg">
                  Women-Only Tours
                </h3> */}
                <h3 className="text-xl font-bold text-white drop-shadow-lg">
                  Ladies Special Tours
                </h3>
                <p className="text-white/80 text-sm drop-shadow">
                  Curated experiences designed for women
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
                {[...ladiesSpecialTours, ...ladiesSpecialTours].map((tour, index) => (
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
                        
                        {/* Ladies Special Badge */}
                        <div className="absolute top-2 left-2 z-10">
                          <span className="inline-flex items-center gap-1 bg-pink-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                            <Heart className="h-3 w-3 fill-current" />
                            Ladies Only
                          </span>
                        </div>
                        
                        {/* Activity Badge */}
                        <div className="absolute top-2 right-2 z-10">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold text-white ${
                            tour.badge === "Wellness" ? "bg-purple-500" :
                            tour.badge === "Shopping" ? "bg-pink-500" :
                            tour.badge === "Yoga" ? "bg-green-500" :
                            tour.badge === "Wine" ? "bg-red-500" :
                            tour.badge === "Culinary" ? "bg-orange-500" :
                            tour.badge === "Luxury" ? "bg-yellow-500" :
                            tour.badge === "Meditation" ? "bg-blue-500" :
                            "bg-teal-500"
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
                          <h3 className="text-sm font-semibold text-gray-900 group-hover:text-red-600 transition-colors duration-300 flex-1 pr-2 line-clamp-2">
                            {tour.name}
                          </h3>
                          <div className="text-right">
                            <div className="text-base font-bold text-red-600">{tour.price}</div>
                            <div className="text-xs text-gray-500">all inclusive</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1 text-gray-600 mb-2">
                          <MapPin className="h-3 w-3" />
                          <span className="text-xs">{tour.location}</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span>{tour.travelers}+ women travelers</span>
                          </div>
                        </div>
                        
                        <button className="w-full bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-all duration-300 transform hover:scale-105">
                          Book This Tour
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
          <button className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 mb-10 rounded-xl shadow transition-all duration-300 transform hover:scale-105 border border-white/20">
            <Heart className="h-4 w-4 fill-current" />
            Explore All Ladies Tours
            <ChevronRight className="h-4 w-4" />
          </button>
          {/* <p className="mt-3 text-gray-600 text-sm">
            Safe, comfortable, and empowering travel experiences
          </p> */}
        </div>
      </div>

      {/* Hide scrollbar styles */}
      
    </section>
  );
};

export default LadiesSpecialSection;