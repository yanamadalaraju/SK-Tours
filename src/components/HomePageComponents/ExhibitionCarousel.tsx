// ExhibitionCarousel.tsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, MapPin, Calendar, Clock, Globe, Building2 } from "lucide-react";
import "./ExhibitionCarousel.css";
import { BASE_URL } from "../../ApiUrls";

interface ExhibitionCity {
  id: number;
  state_name?: string;
  country_name?: string;
  city_name: string;
  image: string;
  price: string;
}

interface Exhibition {
  id: number;
  domestic_category_name?: string;
  international_category_name?: string;
  created_at: string;
  updated_at: string;
  emi_price: string;
  duration_days: number;
  start_date: string | null;
  end_date: string | null;
  exhibition_type: "domestic" | "international";
  cities: ExhibitionCity[];
  country_name: string | null;
  state_name: string | null;
}

interface ExhibitionCarouselProps {
  title: string;
  subtitle: string;
  filterType?: "domestic" | "international" | "all";
}

const ExhibitionCarousel: React.FC<ExhibitionCarouselProps> = ({ 
  title, 
  subtitle, 
  filterType = "all" 
}) => {
  const navigate = useNavigate();
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);
  const [filteredExhibitions, setFilteredExhibitions] = useState<Exhibition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [visibleCards, setVisibleCards] = useState(4);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const scrollPositionRef = useRef(0);
  const isManualScrollingRef = useRef(false);
  const [cardWidth, setCardWidth] = useState<string>('280px');
  const [shouldDuplicate, setShouldDuplicate] = useState<boolean>(true);

  useEffect(() => {
    fetchExhibitions();
  }, [filterType]);

  const fetchExhibitions = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/exhibitions/all`);
      const data = await response.json();

      if (data.success) {
        let filteredData = data.data;
        
        if (filterType !== "all") {
          filteredData = data.data.filter((ex: Exhibition) => ex.exhibition_type === filterType);
        }
        
        setExhibitions(filteredData);
        
        const activeExhibitions = filteredData.filter((ex: Exhibition) => 
          ex.cities && ex.cities.length > 0
        );
        setFilteredExhibitions(activeExhibitions);
        
        setShouldDuplicate(activeExhibitions.length > 3);
      } else {
        setError("Failed to fetch exhibitions");
      }
    } catch (err: any) {
      console.error("Error fetching exhibitions:", err);
      setError(err.message || "Failed to load exhibitions");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "TBA";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  const getLocationText = (exhibition: Exhibition) => {
    if (exhibition.exhibition_type === "domestic") {
      const firstCity = exhibition.cities[0];
      return `${firstCity?.city_name || "City"}, ${firstCity?.state_name || exhibition.state_name || "India"}`;
    } else {
      const firstCity = exhibition.cities[0];
      return `${firstCity?.city_name || "City"}, ${firstCity?.country_name || exhibition.country_name || "International"}`;
    }
  };

  const getCategoryName = (exhibition: Exhibition) => {
    if (exhibition.exhibition_type === "domestic") {
      return exhibition.domestic_category_name || "Domestic Exhibition";
    } else {
      return exhibition.international_category_name || "International Exhibition";
    }
  };

  const getPriceValue = (exhibition: Exhibition) => {
    if (exhibition.cities.length > 0 && exhibition.cities[0].price) {
      return parseFloat(exhibition.cities[0].price);
    }
    return 0;
  };

  const getFirstImage = (exhibition: Exhibition) => {
    if (exhibition.cities.length > 0 && exhibition.cities[0].image) {
      return `${BASE_URL}/uploads/exhibition/${exhibition.cities[0].image}`;
    }
    return "https://via.placeholder.com/400x250?text=Exhibition";
  };

  // UPDATED: Navigate based on category name
  const handleCardClick = (exhibition: Exhibition) => {
    const categoryName = exhibition.exhibition_type === "domestic" 
      ? exhibition.domestic_category_name 
      : exhibition.international_category_name;
    
    // Navigate to ExhibitionView with category name
    navigate("/exhibitionview", {
      state: {
        category: categoryName,
        exhibitionType: exhibition.exhibition_type,
        exhibitionData: exhibition
      }
    });
  };

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

  const animateScroll = useCallback(() => {
    if (!scrollContainerRef.current || filteredExhibitions.length === 0 || !shouldDuplicate) return;
    
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
  }, [isAutoPlaying, filteredExhibitions.length, shouldDuplicate]);

  useEffect(() => {
    if (!isAutoPlaying || !scrollContainerRef.current || filteredExhibitions.length === 0 || !shouldDuplicate) return;
    
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
  }, [isAutoPlaying, filteredExhibitions, animateScroll, shouldDuplicate]);

  const nextSlide = () => {
    if (scrollContainerRef.current && filteredExhibitions.length > 0) {
      isManualScrollingRef.current = true;
      setIsAutoPlaying(false);
      
      const scrollContainer = scrollContainerRef.current;
      const cardElement = scrollContainer.querySelector('.exhibition-card');
      const cardWidthValue = cardElement ? cardElement.clientWidth + 16 : 296;
      
      const scrollAmount = shouldDuplicate 
        ? cardWidthValue * Math.min(visibleCards, 3)
        : cardWidthValue;
      
      let newScrollPosition = scrollContainer.scrollLeft + scrollAmount;
      
      if (shouldDuplicate) {
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        if (newScrollPosition >= maxScroll - 100) {
          newScrollPosition = 0;
        }
      } else {
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
        setIsAutoPlaying(shouldDuplicate);
      }, 3000);
    }
  };

  const prevSlide = () => {
    if (scrollContainerRef.current && filteredExhibitions.length > 0) {
      isManualScrollingRef.current = true;
      setIsAutoPlaying(false);
      
      const scrollContainer = scrollContainerRef.current;
      const cardElement = scrollContainer.querySelector('.exhibition-card');
      const cardWidthValue = cardElement ? cardElement.clientWidth + 16 : 296;
      const scrollAmount = shouldDuplicate 
        ? cardWidthValue * Math.min(visibleCards, 3)
        : cardWidthValue;
      
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

  const getExhibitionsToDisplay = () => {
    if (filteredExhibitions.length === 0) return [];
    
    if (shouldDuplicate) {
      return [...filteredExhibitions, ...filteredExhibitions];
    } else {
      return filteredExhibitions;
    }
  };

  if (loading) {
    return (
      <div className="exhibition-carousel-loading">
        <div className="exhibition-loading-spinner"></div>
        <p className="exhibition-loading-text">Loading exhibitions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="exhibition-carousel-error">
        <p className="exhibition-error-text">{error}</p>
        <button onClick={fetchExhibitions} className="exhibition-retry-button">
          Retry
        </button>
      </div>
    );
  }

  if (filteredExhibitions.length === 0) {
    return (
      <div className="exhibition-carousel-empty">
        <p className="exhibition-empty-text">No exhibitions available</p>
        <p className="exhibition-empty-subtext">Check back later for upcoming exhibitions</p>
      </div>
    );
  }

  const exhibitionsToDisplay = getExhibitionsToDisplay();

  return (
    <div className="exhibition-carousel-container">
      <div className="exhibition-carousel-gradient"></div>
      
      <div className="exhibition-carousel-content">
        <div className="exhibition-carousel-header">
          <div>
            <h3 className="exhibition-carousel-title">{title}</h3>
            <p className="exhibition-carousel-subtitle">{subtitle}</p>
          </div>
          {filteredExhibitions.length > 1 && (
            <div className="exhibition-carousel-controls">
              <button onClick={prevSlide} className="exhibition-control-button">
                <ChevronLeft className="exhibition-control-icon" />
              </button>
              <button onClick={nextSlide} className="exhibition-control-button">
                <ChevronRight className="exhibition-control-icon" />
              </button>
            </div>
          )}
        </div>

        <div className="exhibition-carousel-track-wrapper">
          <div 
            ref={scrollContainerRef}
            className="exhibition-carousel-track"
            style={{ 
              justifyContent: filteredExhibitions.length === 1 ? 'center' : 'flex-start'
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
            {exhibitionsToDisplay.map((exhibition, index) => {
              const priceValue = getPriceValue(exhibition);
              const emiPrice = exhibition.emi_price ? parseFloat(exhibition.emi_price) : 0;
              
              return (
                <div
                  key={`${exhibition.exhibition_type}-${exhibition.id}-${index}`}
                  className="exhibition-card"
                  style={{ 
                    width: cardWidth,
                    minWidth: cardWidth,
                    maxWidth: cardWidth
                  }}
                  onMouseEnter={handleCardMouseEnter}
                  onMouseLeave={handleCardMouseLeave}
                >
                  <div className="exhibition-card-inner" onClick={() => handleCardClick(exhibition)}>
                    <div className="exhibition-card-image-wrapper">
                      <img
                        src={getFirstImage(exhibition)}
                        alt={getCategoryName(exhibition)}
                        className="exhibition-card-image"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/400x250?text=Exhibition';
                        }}
                      />
                      <div className="exhibition-image-overlay"></div>
                      
                      <div className="exhibition-type-badge">
                        <span className={`exhibition-badge ${exhibition.exhibition_type === "domestic" ? "exhibition-badge-domestic" : "exhibition-badge-international"}`}>
                          {exhibition.exhibition_type === "domestic" ? (
                            <Building2 className="exhibition-badge-icon" />
                          ) : (
                            <Globe className="exhibition-badge-icon" />
                          )}
                          {exhibition.exhibition_type === "domestic" ? "Domestic Exhibition" : "International Exhibition"}
                        </span>
                      </div>

                      <div className="exhibition-price-badge">
                        <span className="exhibition-price-badge-text">
                          Starting from
                        </span>
                      </div>
                    </div>

                    <div className="exhibition-card-content">
                      <h3 className="exhibition-card-title">{getCategoryName(exhibition)}</h3>
                      
                      <div className="exhibition-card-location">
                        <MapPin className="exhibition-location-icon" />
                        <span className="exhibition-location-text">{getLocationText(exhibition)}</span>
                      </div>
                      
                      <div className="exhibition-card-date">
                        <Calendar className="exhibition-date-icon" />
                        <span className="exhibition-date-text">{formatDate(exhibition.start_date)} - {formatDate(exhibition.end_date)}</span>
                      </div>
                      
                      <div className="exhibition-card-duration">
                        <Clock className="exhibition-duration-icon" />
                        <span className="exhibition-duration-text">{exhibition.duration_days} Days</span>
                      </div>
                      
                      <div className="exhibition-card-price-section">
                        <div className="exhibition-price-row">
                          <span className="exhibition-price-label">Package Price</span>
                          <p className="exhibition-price-value">
                            ₹{priceValue.toLocaleString("en-IN")}
                          </p>
                        </div>
                        
                        {emiPrice > 0 && (
                          <div className="exhibition-emi-row">
                            <span className="exhibition-emi-label">EMI starting at</span>
                            <p className="exhibition-emi-value">
                              ₹{emiPrice.toLocaleString("en-IN")}/month
                            </p>
                          </div>
                        )}
                      </div>
                      
                      <button className="exhibition-details-button">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {shouldDuplicate && filteredExhibitions.length > 0 && (
            <div className="exhibition-auto-scroll-indicator">
              <div className={`exhibition-indicator-dot ${isAutoPlaying ? 'exhibition-active' : 'exhibition-inactive'}`} />
              <span className="exhibition-indicator-text">
                {isAutoPlaying ? 'Auto-scrolling' : 'Paused'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExhibitionCarousel;