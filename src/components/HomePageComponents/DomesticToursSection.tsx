
import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import "./DomesticToursSection.css";

// Import baseurl from your config file
import { BASE_URL } from "../../ApiUrls"; // Adjust path as needed

// Define TypeScript interface for tour data
interface Tour {
  id: number;
  name: string;
  location: string;
  duration: string;
  price: string;
  image: string;
  travelers: number;
  tour_id: string;
  emi: string;
  tour_type: 'individual' | 'group';
  is_active: boolean;
  display_order: number;
  created_at?: string;
}

// TourCarousel Component
const TourCarousel: React.FC<{ 
  title: string; 
  subtitle: string;
  tourType: 'individual' | 'group';
}> = ({ title, subtitle, tourType }) => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [visibleCards, setVisibleCards] = useState(4);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const scrollPositionRef = useRef(0);
  const isManualScrollingRef = useRef(false);

  // Fetch tours from API
  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        
        const response = await fetch(
          `${BASE_URL}/api/domestic-tours?tour_type=${tourType}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
          // Filter tours by tour_type and is_active
          const filteredTours = data.data.filter((tour: Tour) => 
            tour.tour_type === tourType && tour.is_active
          );
          setTours(filteredTours);
        } else {
          setError('Failed to load tours');
          // Fallback to sample data
          setTours(getSampleTours(tourType));
        }
      } catch (err) {
        console.error('Error fetching tours:', err);
        setError('Error loading tours');
        // Fallback to sample data
        setTours(getSampleTours(tourType));
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [tourType]);

  // Get sample tours for fallback
  const getSampleTours = (type: 'individual' | 'group'): Tour[] => {
    const sampleTours: Tour[] = [
      {
        id: 1,
        name: "Kashmir Great Lakes",
        location: "Kashmir",
        duration: "8 Days",
        price: "₹25,999",
        image: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1200",
        travelers: 1250,
        tour_id: "DOMI00001",
        emi: "₹2,166",
        tour_type: "individual",
        is_active: true,
        display_order: 1
      },
      {
        id: 2,
        name: "Leh Ladakh Bike Trip",
        location: "Ladakh",
        duration: "10 Days",
        price: "₹35,999",
        image: "https://images.pexels.com/photos/672358/pexels-photo-672358.jpeg?auto=compress&cs=tinysrgb&w=1200",
        travelers: 890,
        tour_id: "DOMI00002",
        emi: "₹2,166",
        tour_type: "individual",
        is_active: true,
        display_order: 2
      },
      {
        id: 3,
        name: "Goa Beach Holiday",
        location: "Goa",
        duration: "5 Days",
        price: "₹18,999",
        image: "https://images.pexels.com/photos/2525903/pexels-photo-2525903.jpeg?auto=compress&cs=tinysrgb&w=1200",
        travelers: 2100,
        tour_id: "DOMI00003",
        emi: "₹2,166",
        tour_type: "individual",
        is_active: true,
        display_order: 3
      },
      {
        id: 4,
        name: "Kerala Backwaters",
        location: "Kerala",
        duration: "6 Days",
        price: "₹22,999",
        image: "https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg?auto=compress&cs=tinysrgb&w=1200",
        travelers: 1560,
        tour_id: "DOMI00004",
        emi: "₹2,166",
        tour_type: "individual",
        is_active: true,
        display_order: 4
      }
    ];
    
    if (type === 'group') {
      return sampleTours.map(tour => ({
        ...tour,
        tour_type: 'group',
        tour_id: tour.tour_id.replace('DOMI', 'DOMG'),
        price: tour.price.replace('25', '22').replace('35', '32')
      }));
    }
    
    return sampleTours;
  };

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

  // Animation function
  const animateScroll = useCallback(() => {
    if (!scrollContainerRef.current || tours.length === 0) return;
    
    const scrollContainer = scrollContainerRef.current;
    const scrollWidth = scrollContainer.scrollWidth / 2;
    
    scrollPositionRef.current += 0.8;
    
    // Reset to start when reaching the duplicated section
    if (scrollPositionRef.current >= scrollWidth) {
      scrollPositionRef.current = 0;
    }
    
    scrollContainer.scrollLeft = scrollPositionRef.current;
    
    // Continue animation
    if (isAutoPlaying && !isManualScrollingRef.current) {
      animationRef.current = requestAnimationFrame(animateScroll);
    }
  }, [isAutoPlaying, tours.length]);

  // Continuous smooth scrolling animation
  useEffect(() => {
    if (!isAutoPlaying || !scrollContainerRef.current || tours.length === 0) return;
    
    // Stop any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    // Reset scroll position
    scrollPositionRef.current = scrollContainerRef.current.scrollLeft;
    
    // Start new animation
    animationRef.current = requestAnimationFrame(animateScroll);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAutoPlaying, tours, animateScroll]);

  const nextSlide = () => {
    if (scrollContainerRef.current && tours.length > 0) {
      isManualScrollingRef.current = true;
      setIsAutoPlaying(false);
      
      const scrollContainer = scrollContainerRef.current;
      const scrollWidth = scrollContainer.scrollWidth;
      const itemCount = tours.length;
      const itemWidth = scrollWidth / (itemCount * 2);
      const scrollAmount = itemWidth * visibleCards;
      
      let newScrollPosition = scrollContainer.scrollLeft + scrollAmount;
      
      // If we're near the end of the duplicated set, reset to beginning
      if (newScrollPosition > scrollWidth - scrollContainer.clientWidth) {
        newScrollPosition = 0;
      }
      
      scrollContainer.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });

      scrollPositionRef.current = newScrollPosition;

      setTimeout(() => {
        isManualScrollingRef.current = false;
        setIsAutoPlaying(true);
      }, 3000);
    }
  };

  const prevSlide = () => {
    if (scrollContainerRef.current && tours.length > 0) {
      isManualScrollingRef.current = true;
      setIsAutoPlaying(false);
      
      const scrollContainer = scrollContainerRef.current;
      const scrollWidth = scrollContainer.scrollWidth;
      const itemCount = tours.length;
      const itemWidth = scrollWidth / (itemCount * 2);
      const scrollAmount = itemWidth * visibleCards;
      
      let newScrollPosition = scrollContainer.scrollLeft - scrollAmount;
      
      // If we're going past the start, jump to near the end
      if (newScrollPosition < 0) {
        const maxScroll = scrollWidth / 2 - scrollContainer.clientWidth;
        newScrollPosition = maxScroll + (itemWidth * visibleCards * (tours.length - 1));
      }
      
      scrollContainer.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });

      scrollPositionRef.current = newScrollPosition;

      setTimeout(() => {
        isManualScrollingRef.current = false;
        setIsAutoPlaying(true);
      }, 3000);
    }
  };

  const handleCardMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleCardMouseLeave = () => {
    if (!isManualScrollingRef.current) {
      setTimeout(() => {
        setIsAutoPlaying(true);
      }, 100);
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl shadow-lg p-6 mb-12 border border-gray-100 relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent mb-4"></div>
          <p className="text-gray-600">Loading {tourType} tours...</p>
        </div>
      </div>
    );
  }

  if (error && tours.length === 0) {
    return (
      <div className="rounded-2xl shadow-lg p-6 mb-12 border border-gray-100 relative overflow-hidden bg-gradient-to-br from-red-50 to-pink-50">
        <div className="text-center py-8">
          <p className="text-red-600 mb-2">{error}</p>
          <p className="text-gray-600">Showing sample data</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="rounded-2xl shadow-lg p-6 mb-12 border border-gray-100 relative overflow-hidden"
      style={{
        background: 'radial-gradient(circle at center, #5a92edff 0%, #4c70e7ff 30%, #0F1F5C 70%, #0A1128 100%)',
      }}
    >
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
        }}
      />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white drop-shadow-lg">
              {title}
            </h3>
            <p className="text-white/80 text-sm drop-shadow">
              {subtitle}
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

        <div className="relative">
          {tours.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-white">No {tourType} tours available</p>
            </div>
          ) : (
            <>
              <div 
                ref={scrollContainerRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide"
                style={{ 
                  scrollBehavior: 'auto',
                  cursor: 'grab',
                }}
                onMouseDown={() => {
                  setIsAutoPlaying(false);
                  isManualScrollingRef.current = true;
                }}
                onMouseUp={() => {
                  isManualScrollingRef.current = false;
                  setIsAutoPlaying(true);
                }}
                onMouseLeave={() => {
                  if (!isManualScrollingRef.current) {
                    setIsAutoPlaying(true);
                  }
                }}
              >
                {[...tours, ...tours].map((tour, index) => (
                  <div
                    key={`${tour.id}-${index}-${tourType}`}
                    className="flex-shrink-0"
                    style={{ 
                      width: `calc(${100 / Math.min(visibleCards, tours.length)}% - 16px)`,
                      minWidth: '280px' // Ensure minimum width for cards
                    }}
                    onMouseEnter={handleCardMouseEnter}
                    onMouseLeave={handleCardMouseLeave}
                  >
                    <div className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-full border border-gray-100 flex flex-col">
                      <div className="relative h-48 overflow-hidden flex-shrink-0">
                        <img
                          src={tour.image}
                          alt={tour.name}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://via.placeholder.com/400x200';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        <div className="absolute top-2 left-2 z-10">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold text-white bg-black/60 backdrop-blur-sm">
                            {tour.tour_id}
                          </span>
                        </div>
                      </div>

                      <div className="p-4 flex flex-col flex-grow">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 flex-1 pr-2 line-clamp-2">
                            {tour.name}
                          </h3>
                        </div>
                        
                        <div className="flex items-center gap-1 text-gray-600 mb-2">
                          <MapPin className="h-3 w-3" />
                          <span className="text-xs">{tour.location}</span>
                        </div>
                        
                        <div className="mb-3 mt-auto">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-semibold text-gray-700">Tour Cost</span>
                            <p className="text-2xl font-bold text-gray-900">{tour.price}</p>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">EMI per/month</span>
                            <p className="text-sm font-bold text-gray-900">
                              {tour.emi || 'N/A'}
                            </p>
                          </div>
                        </div>
                        
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 mt-auto">
                          View Packages
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center items-center mt-6 gap-2">
                <div className={`w-3 h-3 rounded-full ${
                  isAutoPlaying ? 'bg-green-400 animate-pulse' : 'bg-red-400'
                }`} />
                <span className="text-xs text-white drop-shadow-lg">
                  {isAutoPlaying ? 'Auto-scrolling' : 'Paused'}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const DomesticToursSection: React.FC = () => {
  return (
    <section className="py-0 bg-gradient-to-br from-sky-200 via-sky-200 to-sky-200">
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
        <TourCarousel 
          title="Domestic Individual Tours"
          subtitle="Handpicked Indian experiences"
          tourType="individual"
        />

        <TourCarousel 
          title="Domestic Group Tours"
          subtitle="Shared adventures with fellow travelers"
          tourType="group"
        />

        <div className="text-center">
          <button className="inline-flex mb-6 items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl shadow transition-all duration-300 transform hover:scale-105 border border-white/20">
            <MapPin className="h-4 w-4" />
            View All Tours
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default DomesticToursSection;