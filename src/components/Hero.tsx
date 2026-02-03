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
        // Move to next video when current video ends
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
              preload="metadata"
              loop={false}
            >
              <source src={video.video_url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>

      {/* Video controls - SIMPLIFIED */}
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
          {/* SIMPLIFIED: Just showing count like "1 / 3" */}
          <div className="text-sm text-white/70 ml-2">
            {currentVideo + 1} / {videoCarousel.length}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;