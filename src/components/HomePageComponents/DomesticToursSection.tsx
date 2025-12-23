import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import "./DomesticToursSection.css";
import { BASE_URL } from "../../ApiUrls";

interface Destination {
  destination_id: number;
  name: string;
  short_desc: string | null;
  created_at: string;
  country_name: string;
  country_id: number;
  is_domestic: number;
}

interface Tour {
  id: number;
  tour_id: string;
  name: string;
  location: string;
  duration: string;
  price: string;
  image: string;
  travelers: number;
  emi: string;
  tour_type: 'individual' | 'Group';
  status: number;
  display_order: number;
  primary_destination_id?: number;
  state?: string;
  destination_name?: string;
}

const TourCarousel: React.FC<{ 
  title: string; 
  subtitle: string;
  tourType: 'individual' | 'Group';
}> = ({ title, subtitle, tourType }) => {
  const navigate = useNavigate();
  const [tours, setTours] = useState<Tour[]>([]);
  const [filteredTours, setFilteredTours] = useState<Tour[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [destinationsLoading, setDestinationsLoading] = useState(true);
  
  const [visibleCards, setVisibleCards] = useState(4);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const scrollPositionRef = useRef(0);
  const isManualScrollingRef = useRef(false);
  const [cardWidth, setCardWidth] = useState<string>('280px');
  const [shouldDuplicate, setShouldDuplicate] = useState<boolean>(true);

  // Fetch destinations data
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setDestinationsLoading(true);
        const response = await fetch(`${BASE_URL}/api/destinations/`);
        const data = await response.json();
        
        if (data && Array.isArray(data)) {
          setDestinations(data);
        } else {
          console.error('Invalid destinations data format:', data);
          setDestinations([]);
        }
      } catch (err: any) {
        console.error('Error fetching destinations:', err);
        setDestinations([]);
      } finally {
        setDestinationsLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  // Function to get destination name by ID
  const getDestinationNameById = (destinationId: number): string => {
    if (!destinations || destinations.length === 0) {
      return `Destination ${destinationId}`;
    }
    
    const destination = destinations.find(dest => dest.destination_id === destinationId);
    return destination ? destination.name : `Destination ${destinationId}`;
  };

  // Fetch tours data
  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        setError('');

        // Use the correct API endpoint based on your API structure
        const endpoint = tourType === 'individual' 
          ? `${BASE_URL}/api/tours/tour/full/all-individual`
          : `${BASE_URL}/api/tours/tour/full/all-group`;

        const res = await fetch(endpoint);
        const data = await res.json();

        if (!data.success) {
          throw new Error(data.error || 'Failed to fetch tours');
        }

        // Process the API data
        const processedTours = data.data.map((tourData: any, index: number) => {
          const tour = tourData.basic_details;
          const images = tourData.images || [];
          
          // Calculate EMI: price / 12 (round to nearest integer)
          const basePrice = parseFloat(tour.base_price_adult) || 0;
          const emiValue = basePrice > 0 ? Math.round(basePrice / 12) : 0;
          
          // Get first image URL, or use placeholder
          const firstImage = images.length > 0 ? images[0].url : 'https://via.placeholder.com/400x250';
          
          // Get destination name from destinations data
          const primaryDestinationId = tour.primary_destination_id;
          const destinationName = getDestinationNameById(primaryDestinationId);
          
          return {
            id: tour.tour_id,
            tour_id: tour.tour_code,
            name: tour.title,
            location: destinationName,
            duration: `${tour.duration_days} Days`,
            price: `₹${Number(tour.base_price_adult).toLocaleString('en-IN')}`,
            image: firstImage,
            travelers: 0,
            emi: emiValue > 0 ? `₹${emiValue.toLocaleString('en-IN')}/month` : 'N/A',
            tour_type: tour.tour_type,
            status: tour.status || 0,
            display_order: index + 1,
            primary_destination_id: primaryDestinationId,
            state: destinationName,
            destination_name: destinationName
          };
        });

        // Sort tours: status 1 first, then by display_order
        const sortedTours = processedTours.sort((a: Tour, b: Tour) => {
          if (b.status !== a.status) {
            return b.status - a.status;
          }
          return a.display_order - b.display_order;
        });

        setTours(sortedTours);
        
        // Filter tours to only show those with status === 1
        const activeTours = sortedTours.filter((t: Tour) => Number(t.status) === 1);
        setFilteredTours(activeTours);
        
        // Don't duplicate if we have 3 or fewer tours
        setShouldDuplicate(activeTours.length > 3);
        
      } catch (err: any) {
        console.error('Error fetching tours:', err);
        setError(err.message || 'Failed to load tours');
        setTours([]);
        setFilteredTours([]);
        setShouldDuplicate(true);
      } finally {
        setLoading(false);
      }
    };

    if (!destinationsLoading) {
      fetchTours();
    }
  }, [tourType, destinationsLoading, destinations]);

  // Function to handle View Packages button click
  const handleViewPackages = (tour: Tour) => {
    const tourState = tour.state || tour.destination_name || 'Unknown';
    
    const route = tourType === 'individual' 
      ? `/tours-packages/${encodeURIComponent(tourState)}`
      : `/tours_groups/${encodeURIComponent(tourState)}`;
    
    navigate(route, { 
      state: { 
        fromTour: true,
        tourState: tourState,
        tourType: tourType,
        tourName: tour.name,
        tourId: tour.id,
        primary_destination_id: tour.primary_destination_id,
        tourData: tour
      }
    });
  };

  // Update visible cards and card width based on screen size
  useEffect(() => {
    const updateCardSizes = () => {
      if (window.innerWidth < 768) {
        setVisibleCards(1);
        setCardWidth('280px');
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
        setCardWidth('280px');
      } else {
        setVisibleCards(4);
        setCardWidth('280px');
      }
    };

    updateCardSizes();
    window.addEventListener('resize', updateCardSizes);
    return () => window.removeEventListener('resize', updateCardSizes);
  }, []);

  // Animation function - only animate if we have enough tours
  const animateScroll = useCallback(() => {
    if (!scrollContainerRef.current || filteredTours.length === 0 || !shouldDuplicate) return;
    
    const scrollContainer = scrollContainerRef.current;
    const scrollWidth = scrollContainer.scrollWidth / 2;
    
    scrollPositionRef.current += 0.8;
    
    if (scrollPositionRef.current >= scrollWidth) {
      scrollPositionRef.current = 0;
    }
    
    scrollContainer.scrollLeft = scrollPositionRef.current;
    
    if (isAutoPlaying && !isManualScrollingRef.current && shouldDuplicate) {
      animationRef.current = requestAnimationFrame(animateScroll);
    }
  }, [isAutoPlaying, filteredTours.length, shouldDuplicate]);

  // Continuous smooth scrolling animation
  useEffect(() => {
    if (!isAutoPlaying || !scrollContainerRef.current || filteredTours.length === 0 || !shouldDuplicate) return;
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    scrollPositionRef.current = scrollContainerRef.current.scrollLeft;
    animationRef.current = requestAnimationFrame(animateScroll);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAutoPlaying, filteredTours, animateScroll, shouldDuplicate]);

  const nextSlide = () => {
    if (scrollContainerRef.current && filteredTours.length > 0) {
      isManualScrollingRef.current = true;
      setIsAutoPlaying(false);
      
      const scrollContainer = scrollContainerRef.current;
      const cardElement = scrollContainer.querySelector('.tour-card');
      const cardWidth = cardElement ? cardElement.clientWidth + 16 : 296;
      
      // Only scroll multiple cards if we have duplication enabled
      const scrollAmount = shouldDuplicate 
        ? cardWidth * Math.min(visibleCards, 3)
        : cardWidth;
      
      let newScrollPosition = scrollContainer.scrollLeft + scrollAmount;
      
      if (shouldDuplicate) {
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        if (newScrollPosition >= maxScroll - 100) {
          newScrollPosition = 0;
        }
      } else {
        // For non-duplicated, just scroll within bounds
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        if (newScrollPosition > maxScroll) {
          newScrollPosition = 0;
        }
      }
      
      scrollContainer.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });

      scrollPositionRef.current = newScrollPosition;

      setTimeout(() => {
        isManualScrollingRef.current = false;
        setIsAutoPlaying(shouldDuplicate); // Only auto-play if we have duplication
      }, 3000);
    }
  };

  const prevSlide = () => {
    if (scrollContainerRef.current && filteredTours.length > 0) {
      isManualScrollingRef.current = true;
      setIsAutoPlaying(false);
      
      const scrollContainer = scrollContainerRef.current;
      const cardElement = scrollContainer.querySelector('.tour-card');
      const cardWidth = cardElement ? cardElement.clientWidth + 16 : 296;
      const scrollAmount = shouldDuplicate 
        ? cardWidth * Math.min(visibleCards, 3)
        : cardWidth;
      
      let newScrollPosition = scrollContainer.scrollLeft - scrollAmount;
      
      if (newScrollPosition < 0) {
        if (shouldDuplicate) {
          newScrollPosition = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        } else {
          newScrollPosition = 0;
        }
      }
      
      scrollContainer.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });

      scrollPositionRef.current = newScrollPosition;

      setTimeout(() => {
        isManualScrollingRef.current = false;
        setIsAutoPlaying(shouldDuplicate);
      }, 3000);
    }
  };

  const handleCardMouseEnter = () => {
    if (shouldDuplicate) {
      setIsAutoPlaying(false);
    }
  };

  const handleCardMouseLeave = () => {
    if (!isManualScrollingRef.current && shouldDuplicate) {
      setTimeout(() => {
        setIsAutoPlaying(true);
      }, 100);
    }
  };

  // Calculate which tours to display
  const getToursToDisplay = () => {
    if (filteredTours.length === 0) return [];
    
    if (shouldDuplicate) {
      return [...filteredTours, ...filteredTours];
    } else {
      return filteredTours;
    }
  };

  if (loading || destinationsLoading) {
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

  if (filteredTours.length === 0 && tours.length > 0) {
    return (
      <div className="rounded-2xl shadow-lg p-6 mb-12 border border-gray-100 relative overflow-hidden bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="text-center py-8">
          <p className="text-yellow-600 mb-2">No active {tourType} tours available</p>
          <p className="text-gray-600">All tours are currently inactive (status: 0)</p>
        </div>
      </div>
    );
  }

  const toursToDisplay = getToursToDisplay();

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
          {filteredTours.length > 1 && (
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
          )}
        </div>

        <div className="relative">
          {filteredTours.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-white">No {tourType} tours available</p>
            </div>
          ) : (
            <>
              <div 
                ref={scrollContainerRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide px-1"
                style={{ 
                  scrollBehavior: 'auto',
                  cursor: 'grab',
                  // Only add padding if we have multiple tours
                  paddingLeft: filteredTours.length > 1 ? 'calc((100% - min(100%, 1200px)) / 2)' : '0',
                  paddingRight: filteredTours.length > 1 ? 'calc((100% - min(100%, 1200px)) / 2)' : '0',
                  // Center single card
                  justifyContent: filteredTours.length === 1 ? 'center' : 'flex-start'
                }}
                onMouseDown={() => {
                  if (shouldDuplicate) {
                    setIsAutoPlaying(false);
                    isManualScrollingRef.current = true;
                  }
                }}
                onMouseUp={() => {
                  if (shouldDuplicate) {
                    isManualScrollingRef.current = false;
                    setIsAutoPlaying(true);
                  }
                }}
                onMouseLeave={() => {
                  if (!isManualScrollingRef.current && shouldDuplicate) {
                    setIsAutoPlaying(true);
                  }
                }}
              >
                {toursToDisplay.map((tour, index) => (
                  <div
                    key={`${tour.id}-${index}-${tourType}`}
                    className="flex-shrink-0 tour-card"
                    style={{ 
                      width: cardWidth,
                      minWidth: cardWidth,
                      maxWidth: cardWidth
                    }}
                    onMouseEnter={handleCardMouseEnter}
                    onMouseLeave={handleCardMouseLeave}
                  >
                    <div className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-full border border-gray-100 flex flex-col w-full">
                      <div className="relative h-48 overflow-hidden flex-shrink-0">
                        <img
                          src={tour.image}
                          alt={tour.name}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://via.placeholder.com/400x250';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        <div className="absolute top-2 left-2 z-10">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold text-white bg-black/60 backdrop-blur-sm">
                            {tour.tour_id}
                          </span>
                        </div>
                      </div>

                      <div className="p-4 flex flex-col flex-grow w-full">
                        <div className="flex items-start justify-between mb-2 w-full">
                          <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 flex-1 pr-2 line-clamp-2">
                            {tour.name}
                          </h3>
                        </div>
                        
                        <div className="flex items-center gap-1 text-gray-600 mb-2 w-full">
                          <MapPin className="h-3 w-3" />
                          <span className="text-xs">{tour.location}</span>
                        </div>
                        
                        <div className="mb-3 mt-auto w-full">
                          <div className="flex items-center justify-between mb-1 w-full">
                            <span className="text-sm font-semibold text-gray-700">Tour Cost</span>
                            <p className="text-2xl font-bold text-gray-900">{tour.price}</p>
                          </div>
                          
                          <div className="flex items-center justify-between w-full">
                            <span className="text-sm text-gray-600">EMI per/month</span>
                            <p className="text-sm font-bold text-gray-900">
                              {tour.emi}
                            </p>
                          </div>
                        </div>
                        
                        <button 
                          onClick={() => handleViewPackages(tour)}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 mt-auto"
                        >
                          View Packages
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {shouldDuplicate && filteredTours.length > 0 && (
                <div className="flex justify-center items-center mt-6 gap-2">
                  <div className={`w-3 h-3 rounded-full ${
                    isAutoPlaying ? 'bg-green-400 animate-pulse' : 'bg-red-400'
                  }`} />
                  <span className="text-xs text-white drop-shadow-lg">
                    {isAutoPlaying ? 'Auto-scrolling' : 'Paused'}
                  </span>
                </div>
              )}
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
                  2px 2px 0 #1F3F5C,
                  -2px -2px 0 #1F3F5C,
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
          tourType="Group"
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