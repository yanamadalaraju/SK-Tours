// MICECarousel.tsx - Updated handleCardClick
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, MapPin, Calendar, Clock, Globe, Building2 } from "lucide-react";
import "./MICECarousel.css";
import { BASE_URL } from "../../ApiUrls";

interface MICECity {
  id: number;
  city_name: string;
  state_name?: string;
  country_name?: string;
  image: string;
  price: string;
  emi_price: string;
  duration_days: number;
  start_date: string | null;
  end_date: string | null;
  mice_type: "domestic" | "international";
  created_at: string;
  updated_at: string;
}

interface MICECarouselProps {
  title: string;
  subtitle: string;
  filterType?: "domestic" | "international" | "all";
}

const MICECarousel: React.FC<MICECarouselProps> = ({ 
  title, 
  subtitle, 
  filterType = "all" 
}) => {
  const navigate = useNavigate();
  const [miceData, setMiceData] = useState<MICECity[]>([]);
  const [filteredMice, setFilteredMice] = useState<MICECity[]>([]);
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
    fetchMICEData();
  }, [filterType]);

  const fetchMICEData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/mice/all`);
      const data = await response.json();

      if (data.success) {
        let filteredData = data.data;
        
        if (filterType !== "all") {
          filteredData = data.data.filter((item: MICECity) => item.mice_type === filterType);
        }
        
        setMiceData(filteredData);
        setFilteredMice(filteredData);
        setShouldDuplicate(filteredData.length > 3);
      } else {
        setError("Failed to fetch MICE data");
      }
    } catch (err: any) {
      console.error("Error fetching MICE data:", err);
      setError(err.message || "Failed to load MICE data");
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

  const getLocationText = (item: MICECity) => {
    if (item.mice_type === "domestic") {
      return `${item.city_name}, ${item.state_name || "India"}`;
    } else {
      return `${item.city_name}, ${item.country_name || "International"}`;
    }
  };

  const getImageUrl = (item: MICECity) => {
    const folder = item.mice_type === "domestic" ? "domestic" : "international";
    return `${BASE_URL}/uploads/mice/${folder}/${item.image}`;
  };

  // UPDATED: Navigate based on city name
  const handleCardClick = (item: MICECity) => {
    // Navigate to Miceview with city name and type
    navigate("/miceview", {
      state: {
        preSelectedCity: item.city_name,
        preSelectedType: item.mice_type,
        category: item.city_name,
        type: item.mice_type
      }
    });
  };

  useEffect(() => {
    const updateCardSizes = () => {
      if (window.innerWidth < 768) {
        setVisibleCards(1);
        setCardWidth('250px');
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
    if (!scrollContainerRef.current || filteredMice.length === 0 || !shouldDuplicate) return;
    
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
  }, [isAutoPlaying, filteredMice.length, shouldDuplicate]);

  useEffect(() => {
    if (!isAutoPlaying || !scrollContainerRef.current || filteredMice.length === 0 || !shouldDuplicate) return;
    
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
  }, [isAutoPlaying, filteredMice, animateScroll, shouldDuplicate]);

  const nextSlide = () => {
    if (scrollContainerRef.current && filteredMice.length > 0) {
      isManualScrollingRef.current = true;
      setIsAutoPlaying(false);
      
      const scrollContainer = scrollContainerRef.current;
      const cardElement = scrollContainer.querySelector('.mice-card');
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
    if (scrollContainerRef.current && filteredMice.length > 0) {
      isManualScrollingRef.current = true;
      setIsAutoPlaying(false);
      
      const scrollContainer = scrollContainerRef.current;
      const cardElement = scrollContainer.querySelector('.mice-card');
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

  const getMiceToDisplay = () => {
    if (filteredMice.length === 0) return [];
    
    if (shouldDuplicate) {
      return [...filteredMice, ...filteredMice];
    } else {
      return filteredMice;
    }
  };

  if (loading) {
    return (
      <div className="mice-carousel-loading">
        <div className="mice-loading-spinner"></div>
        <p className="mice-loading-text">Loading MICE destinations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mice-carousel-error">
        <p className="mice-error-text">{error}</p>
        <button onClick={fetchMICEData} className="mice-retry-button">
          Retry
        </button>
      </div>
    );
  }

  if (filteredMice.length === 0) {
    return (
      <div className="mice-carousel-empty">
        <p className="mice-empty-text">No MICE destinations available</p>
        <p className="mice-empty-subtext">Check back later for upcoming MICE events</p>
      </div>
    );
  }

  const miceToDisplay = getMiceToDisplay();

  return (
    <div className="mice-carousel-container">
      <div className="mice-carousel-gradient"></div>
      
      <div className="mice-carousel-content">
        <div className="mice-carousel-header">
          <div>
            <h3 className="mice-carousel-title">{title}</h3>
            <p className="mice-carousel-subtitle">{subtitle}</p>
          </div>
          {filteredMice.length > 1 && (
            <div className="mice-carousel-controls">
              <button onClick={prevSlide} className="mice-control-button">
                <ChevronLeft className="mice-control-icon" />
              </button>
              <button onClick={nextSlide} className="mice-control-button">
                <ChevronRight className="mice-control-icon" />
              </button>
            </div>
          )}
        </div>

        <div className="mice-carousel-track-wrapper">
          <div 
            ref={scrollContainerRef}
            className="mice-carousel-track"
            style={{ 
              justifyContent: filteredMice.length === 1 ? 'center' : 'flex-start'
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
            {miceToDisplay.map((item, index) => (
              <div
                key={`${item.mice_type}-${item.id}-${index}`}
                className="mice-card"
                style={{ 
                  width: cardWidth,
                  minWidth: cardWidth,
                  maxWidth: cardWidth
                }}
                onMouseEnter={handleCardMouseEnter}
                onMouseLeave={handleCardMouseLeave}
              >
                <div className="mice-card-inner" onClick={() => handleCardClick(item)}>
                  <div className="mice-card-image-wrapper">
                    <img
                      src={getImageUrl(item)}
                      alt={item.city_name}
                      className="mice-card-image"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/400x250?text=MICE+Destination';
                      }}
                    />
                    <div className="mice-image-overlay"></div>
                    
                    <div className="mice-type-badge">
                      <span className={`mice-badge ${item.mice_type === "domestic" ? "mice-badge-domestic" : "mice-badge-international"}`}>
                        {item.mice_type === "domestic" ? (
                          <Building2 className="mice-badge-icon" />
                        ) : (
                          <Globe className="mice-badge-icon" />
                        )}
                        {item.mice_type === "domestic" ? "Domestic MICE" : "International MICE"}
                      </span>
                    </div>

                    <div className="mice-price-badge">
                      <span className="mice-price-badge-text">
                        {item.mice_type === "domestic" ? "Starting at" : "Package from"}
                      </span>
                    </div>
                  </div>

                  <div className="mice-card-content">
                    <h3 className="mice-card-title">{item.city_name}</h3>
                    
                    <div className="mice-card-location">
                      <MapPin className="mice-location-icon" />
                      <span className="mice-location-text">{getLocationText(item)}</span>
                    </div>
                    
                    <div className="mice-card-date">
                      <Calendar className="mice-date-icon" />
                      <span className="mice-date-text">{formatDate(item.start_date)} - {formatDate(item.end_date)}</span>
                    </div>
                    
                    <div className="mice-card-duration">
                      <Clock className="mice-duration-icon" />
                      <span className="mice-duration-text">{item.duration_days} Days</span>
                    </div>
                    
                    <div className="mice-card-price-section">
                      <div className="mice-price-row">
                        <span className="mice-price-label">Package Price</span>
                        <p className="mice-price-value">
                          ₹{parseFloat(item.price).toLocaleString("en-IN")}
                        </p>
                      </div>
                      
                      {item.emi_price && parseFloat(item.emi_price) > 0 && (
                        <div className="mice-emi-row">
                          <span className="mice-emi-label">EMI starting at</span>
                          <p className="mice-emi-value">
                            ₹{parseFloat(item.emi_price).toLocaleString("en-IN")}/month
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <button className="mice-details-button">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {shouldDuplicate && filteredMice.length > 0 && (
            <div className="mice-auto-scroll-indicator">
              <div className={`mice-indicator-dot ${isAutoPlaying ? 'mice-active' : 'mice-inactive'}`} />
              <span className="mice-indicator-text">
                {isAutoPlaying ? 'Auto-scrolling' : 'Paused'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MICECarousel;