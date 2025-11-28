import React, { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const LeadPopup = () => {
  const [open, setOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sample images - replace with your actual images
  const carouselImages = [
    "https://i.pinimg.com/1200x/15/c3/17/15c3179c21faa43283e5eed856422b8c.jpg",
    "https://i.pinimg.com/1200x/f9/4c/58/f94c5898fcc5227a6b969b303bf8a1b6.jpg",
    "https://i.pinimg.com/1200x/e6/8b/7e/e68b7eebc7aa1ef6c693bb0a06ff887d.jpg",
    "https://i.pinimg.com/736x/42/88/8f/42888f94c903f192773b3862f9792616.jpg",
  ];

  const carouselContent = [
    {
      title: "Luxury Beach Getaways",
      description: "Experience paradise with our exclusive beach resorts"
    },
    {
      title: "Mountain Adventures",
      description: "Thrilling hikes and breathtaking mountain views"
    },
    {
      title: "City Explorations",
      description: "Discover the world's most vibrant cities"
    },
    {
      title: "Cultural Journeys",
      description: "Immerse yourself in rich cultural experiences"
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (open) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [open, carouselImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden relative animate-fadeIn">
        
        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 z-20 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110 z-50"
        >
          <X size={20} className="text-gray-700" />
        </button>

        <div className="flex flex-col md:flex-row">
          
          {/* LEFT CAROUSEL SECTION */}
          <div className="md:w-1/2 relative bg-gradient-to-br from-blue-50 to-cyan-50">
            <div className="relative h-64 md:h-full min-h-[400px] overflow-hidden">
              {/* Carousel Images */}
              {carouselImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    src={image}
                    alt={`Travel ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-4 border border-white/30">
                      <h3 className="text-xl font-bold mb-2">
                        {carouselContent[index].title}
                      </h3>
                      <p className="text-white/90 text-sm">
                        {carouselContent[index].description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Carousel Controls */}
              <div className="absolute top-1/2 left-4 right-4 transform -translate-y-1/2 flex justify-between">
                <button
                  onClick={prevSlide}
                  className="bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110"
                >
                  <ChevronLeft size={20} className="text-gray-700" />
                </button>
                <button
                  onClick={nextSlide}
                  className="bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110"
                >
                  <ChevronRight size={20} className="text-gray-700" />
                </button>
              </div>

              {/* Carousel Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? "bg-white scale-125" 
                        : "bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>

              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                <div 
                  className="h-full bg-white transition-all duration-1000 ease-linear"
                  style={{ 
                    width: `${(currentSlide / (carouselImages.length - 1)) * 100}%` 
                  }}
                />
              </div>
            </div>

            {/* Trust Badge on Image */}
            <div className="absolute top-4 left-4">
              <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                Trusted Travel Partner
              </div>
            </div>
          </div>

          {/* RIGHT FORM SECTION */}
          <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                Exclusive Offer
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                Join <span className="text-red-600">1,000,000+</span>
              </h2>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-700 mb-3">
                Happy Travelers Worldwide!
              </h3>
            </div>

            <p className="text-gray-600 mb-6 text-center text-sm md:text-base leading-relaxed">
              Get exclusive access to the best travel deals, early bird discounts, 
              and personalized travel inspiration delivered to your inbox.
            </p>

            {/* Form */}
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="First Name *"
                  className="w-full border border-gray-300 rounded-xl p-4 text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    className="w-full border border-gray-300 rounded-xl p-4 text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="City *"
                    className="w-full border border-gray-300 rounded-xl p-4 text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>
              
              <div>
                <input
                  type="email"
                  placeholder="Email Address *"
                  className="w-full border border-gray-300 rounded-xl p-4 text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white w-full py-4 rounded-xl mt-6 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Unlock Exclusive Deals
              <div className="w-2 h-2 bg-white/80 rounded-full animate-pulse inline-block ml-2" />
            </button>

            {/* Trust Indicators */}
            <div className="text-center mt-6">
              <div className="flex justify-center items-center gap-6 text-xs text-gray-500 mb-3">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>41+ Years Experience</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span>400+ Experts</span>
                </div>
              </div>
              <p className="text-xs text-gray-400">
                3000+ Destinations • 24/7 Support • Best Price Guarantee
              </p>
            </div>

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 mt-4 text-gray-400">
              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
              <span className="text-xs">Your information is 100% secure</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadPopup;