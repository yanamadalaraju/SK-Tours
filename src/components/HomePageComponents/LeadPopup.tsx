import React, { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, CheckCircle, AlertCircle } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "@/ApiUrls";

const API_URL = `${BASE_URL}/api`;

// Define TypeScript interfaces
interface FormData {
  first_name: string;
  phone: string;
  city: string;
  email: string;
}

interface FormErrors {
  first_name?: string;
  phone?: string;
  city?: string;
  email?: string;
}

interface CarouselItem {
  title: string;
  description: string;
}

const LeadPopup = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({
    first_name: '',
    phone: '',
    city: '',
    email: ''
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>('');
  
  // Add state for carousel images and content
  const [carouselImages, setCarouselImages] = useState<string[]>([]);
  const [carouselContent, setCarouselContent] = useState<CarouselItem[]>([]);
  const [loadingImages, setLoadingImages] = useState<boolean>(true);

  // Default fallback images (in case API fails)
  const defaultImages = [
    "https://i.pinimg.com/1200x/15/c3/17/15c3179c21faa43283e5eed856422b8c.jpg",
    "https://i.pinimg.com/1200x/f9/4c/58/f94c5898fcc5227a6b969b303bf8a1b6.jpg",
    "https://i.pinimg.com/1200x/e6/8b/7e/e68b7eebc7aa1ef6c693bb0a06ff887d.jpg",
    "https://i.pinimg.com/736x/42/88/8f/42888f94c903f192773b3862f9792616.jpg",
  ];

  const defaultContent: CarouselItem[] = [
    {
      title: "Luxury Beach Getaways",
      description: "Exclusive beach resort experiences"
    },
    {
      title: "Mountain Adventures",
      description: "Thrilling hikes and mountain views"
    },
    {
      title: "City Explorations",
      description: "Discover vibrant cities worldwide"
    },
    {
      title: "Cultural Journeys",
      description: "Immerse in rich cultural experiences"
    }
  ];

  // Fetch images from backend on component mount
  useEffect(() => {
    const fetchCarouselImages = async () => {
      try {
        setLoadingImages(true);
        const response = await axios.get(`${API_URL}/carousel-images/active`);
        
        if (response.data.success && response.data.data.length > 0) {
          const carouselData = response.data.data;
          
          // Map images with full URL
          const images = carouselData.map(img => {
            // Check if image_url already has http/https
            if (img.image_url.startsWith('http')) {
              return img.image_url;
            } else {
              return `${BASE_URL}${img.image_url}`;
            }
          });
          
          // Map content
          const content = carouselData.map(img => ({
            title: img.title,
            description: img.description || ''
          }));
          
          setCarouselImages(images);
          setCarouselContent(content);
        } else {
          // Use default images if no images from API
          setCarouselImages(defaultImages);
          setCarouselContent(defaultContent);
        }
      } catch (error) {
        console.error('Error fetching carousel images:', error);
        // Fallback to default images if API fails
        setCarouselImages(defaultImages);
        setCarouselContent(defaultContent);
      } finally {
        setLoadingImages(false);
      }
    };
    
    fetchCarouselImages();
  }, []);

  useEffect(() => {
    // Check if user has already submitted
    const hasSubmitted = localStorage.getItem('lead_popup_submitted');
    const lastShowTime = localStorage.getItem('lead_popup_last_show');
    const now = new Date().getTime();
    
    // Show popup if:
    // 1. Not submitted before
    // 2. OR last shown more than 24 hours ago
    if (!hasSubmitted || (lastShowTime && (now - parseInt(lastShowTime)) > 24 * 60 * 60 * 1000)) {
      // Only show if we have images loaded
      if (!loadingImages) {
        const timer = setTimeout(() => setOpen(true), 1500);
        return () => clearTimeout(timer);
      }
    }
  }, [loadingImages]);

  // Carousel auto-slide effect
  useEffect(() => {
    if (open && carouselImages.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [open, carouselImages.length]);

  const nextSlide = () => {
    if (carouselImages.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }
  };

  const prevSlide = () => {
    if (carouselImages.length > 0) {
      setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): FormErrors => {
    const errors: FormErrors = {};
    
    if (!formData.first_name.trim()) errors.first_name = 'First name is required';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }
    
    // Phone validation (basic)
    const phoneRegex = /^[0-9+\-\s()]{10,}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }
    
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    try {
      setLoading(true);
      setSubmitError('');
      
      const response = await axios.post(`${API_URL}/leads`, {
        ...formData,
        source: 'popup_form'
      });
      
      if (response.data.success) {
        setSubmitSuccess(true);
        setSubmitError('');
        
        // Mark as submitted in localStorage
        localStorage.setItem('lead_popup_submitted', 'true');
        localStorage.setItem('lead_popup_last_show', new Date().getTime().toString());
        
        // Reset form
        setFormData({
          first_name: '',
          phone: '',
          city: '',
          email: ''
        });
        
        // Close popup after 3 seconds
        setTimeout(() => {
          setOpen(false);
          setSubmitSuccess(false);
        }, 3000);
      }
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setSubmitError(error.response?.data?.message || 'Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  // Show loading skeleton while images are loading
  if (loadingImages) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-2 sm:p-4">
        <div className="bg-white w-full max-w-md sm:max-w-2xl md:max-w-3xl rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl overflow-hidden relative animate-fadeIn max-h-[90vh] sm:max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col md:flex-row">
            {/* Loading skeleton for carousel */}
            <div className="hidden md:block md:w-1/2 relative bg-gradient-to-br from-blue-50 to-cyan-50">
              <div className="relative h-full min-h-[450px] overflow-hidden flex items-center justify-center">
                <div className="animate-pulse w-full h-full bg-gray-200"></div>
              </div>
            </div>
            
            {/* Loading skeleton for form */}
            <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-6 flex flex-col justify-center">
              <div className="space-y-4">
                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-12 bg-gray-200 rounded animate-pulse mt-4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Don't show popup if no images are available
  if (carouselImages.length === 0) {
    return null;
  }

return (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-2 sm:p-3 md:p-4">
    {/* Increased desktop max-height */}
    <div className="bg-white w-full max-w-[95%] sm:max-w-md md:max-w-2xl lg:max-w-3xl rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl overflow-hidden relative animate-fadeIn max-h-[95vh] sm:max-h-[85vh] md:max-h-[92vh] lg:max-h-[94vh] overflow-y-auto">
      
      {/* Close Button */}
      <button
        onClick={() => setOpen(false)}
        className="absolute top-2 right-2 sm:top-3 sm:right-3 z-50 bg-white/90 hover:bg-white rounded-full p-1.5 sm:p-2 shadow-lg transition-all duration-300 hover:scale-110"
      >
        <X size={16} className="text-gray-700 sm:w-5 sm:h-5" />
      </button>

      {submitSuccess ? (
        <div className="p-6 sm:p-8 text-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Thank You!</h3>
          <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
            Your details have been submitted successfully. Our travel expert will contact you soon.
          </p>
          <p className="text-xs sm:text-sm text-gray-500">
            This popup will close automatically...
          </p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row h-full">
          
          {/* LEFT CAROUSEL SECTION - Increased height */}
          <div className="hidden md:block md:w-1/2 relative bg-gradient-to-br from-blue-50 to-cyan-50">
            <div className="relative h-full min-h-[500px] lg:min-h-[550px] overflow-hidden">
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
                    onError={(e) => {
                      // If image fails to load, use default
                      e.currentTarget.src = defaultImages[index % defaultImages.length];
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <div className="bg-white/20 backdrop-blur-lg rounded-xl p-4 border border-white/30">
                      <h3 className="text-xl font-bold mb-2">
                        {carouselContent[index]?.title || `Travel Image ${index + 1}`}
                      </h3>
                      <p className="text-white/90 text-sm">
                        {carouselContent[index]?.description || 'Beautiful travel destination'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Navigation buttons */}
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

              {/* Dots indicator */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? "bg-white scale-125" 
                        : "bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>

              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                <div 
                  className="h-full bg-white transition-all duration-1000 ease-linear"
                  style={{ 
                    width: carouselImages.length > 1 
                      ? `${(currentSlide / (carouselImages.length - 1)) * 100}%` 
                      : '0%'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Mobile-only mini carousel - INCREASED HEIGHT */}
          <div className="md:hidden relative bg-gradient-to-br from-blue-50 to-cyan-50 h-56 sm:h-64">
            <div className="relative h-full overflow-hidden">
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
                    onError={(e) => {
                      e.currentTarget.src = defaultImages[index % defaultImages.length];
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  
                  {/* Mobile carousel content */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="bg-white/20 backdrop-blur-lg rounded-lg p-2 border border-white/30">
                      <h3 className="text-sm font-bold mb-1">
                        {carouselContent[index]?.title || `Travel Image ${index + 1}`}
                      </h3>
                      <p className="text-white/90 text-xs">
                        {carouselContent[index]?.description || 'Beautiful travel destination'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Mobile carousel controls */}
              <div className="absolute top-1/2 left-2 right-2 transform -translate-y-1/2 flex justify-between">
                <button
                  onClick={prevSlide}
                  className="bg-white/90 hover:bg-white rounded-full p-1.5 shadow-lg transition-all duration-300 hover:scale-110"
                >
                  <ChevronLeft size={16} className="text-gray-700" />
                </button>
                <button
                  onClick={nextSlide}
                  className="bg-white/90 hover:bg-white rounded-full p-1.5 shadow-lg transition-all duration-300 hover:scale-110"
                >
                  <ChevronRight size={16} className="text-gray-700" />
                </button>
              </div>
              
              <div className="absolute top-2 left-2">
                <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  Trusted
                </div>
              </div>
              
              {/* Dots indicator for mobile */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1.5">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? "bg-white scale-125" 
                        : "bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Form Section - Adjusted for desktop height increase */}
          <div className="w-full md:w-1/2 p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col justify-center bg-gradient-to-r from-[#0F1F5C] via-[#1F3F93] to-[#0F1F5C] rounded-r-xl min-h-[400px] md:min-h-[500px]">
            {/* Error Message */}
            {submitError && (
              <div className="mb-2 sm:mb-3 md:mb-4 p-2 bg-red-500/20 backdrop-blur-sm border border-red-400/30 text-white rounded-lg flex items-center gap-2 text-xs shadow-lg">
                <div className="bg-red-500/20 p-1 rounded-full">
                  <AlertCircle className="w-3 h-3 text-white" />
                </div>
                <p className="text-xs">{submitError}</p>
              </div>
            )}
            
            {/* Header - COMPACT on mobile */}
            <div className="text-center mb-2 sm:mb-3 md:mb-6 text-white">
              <div className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-semibold mb-1 sm:mb-2 border border-white/30 shadow-lg">
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
                Exclusive Offer
              </div>
              
              <h2 className="text-base sm:text-lg md:text-2xl lg:text-3xl font-bold mb-0.5 sm:mb-1 text-white">
                Join <span className="text-[#E31B23]">1M+</span>
              </h2>
              <h3 className="text-sm sm:text-base md:text-xl lg:text-2xl font-semibold mb-1 sm:mb-2 text-white">
                Happy Travelers!
              </h3>
            </div>

            {/* Description - COMPACT on mobile, larger on desktop */}
            <p className="text-white/90 mb-2 sm:mb-3 md:mb-6 text-center text-xs sm:text-sm md:text-base leading-relaxed">
              Get exclusive travel deals, discounts, and personalized travel inspiration.
            </p>

            {/* Form - COMPACT spacing on mobile */}
            <form onSubmit={handleSubmit} className="space-y-2 md:space-y-4">
              {/* First Name */}
              <div>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  placeholder="First Name *"
                  className={`w-full ${formErrors.first_name ? 'border-red-500' : 'border-white'} border-2 rounded-lg md:rounded-xl px-3 py-2 md:px-4 md:py-3 text-sm sm:text-base focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300 bg-red-100 text-black placeholder-gray-600 placeholder:font-bold shadow-lg focus:outline-none`}
                />
                {formErrors.first_name && (
                  <div className="mt-1 md:mt-2 flex items-center gap-1 bg-red-500/20 backdrop-blur-sm text-white px-2 py-1 rounded-lg shadow-lg">
                    <AlertCircle className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                    <p className="text-xs md:text-sm">{formErrors.first_name}</p>
                  </div>
                )}
              </div>
              
              {/* Phone & City Grid */}
              <div className="grid grid-cols-2 gap-2 md:gap-4">
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone *"
                    className={`w-full ${formErrors.phone ? 'border-red-500' : 'border-white'} border-2 rounded-lg md:rounded-xl px-3 py-2 md:px-4 md:py-3 text-sm sm:text-base focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300 bg-red-100 text-black placeholder-gray-600 placeholder:font-bold shadow-lg focus:outline-none`}
                  />
                  {formErrors.phone && (
                    <div className="mt-1 md:mt-2 flex items-center gap-1 bg-red-500/20 backdrop-blur-sm text-white px-2 py-1 rounded-lg shadow-lg">
                      <AlertCircle className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                      <p className="text-xs md:text-sm">{formErrors.phone}</p>
                    </div>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City *"
                    className={`w-full ${formErrors.city ? 'border-red-500' : 'border-white'} border-2 rounded-lg md:rounded-xl px-3 py-2 md:px-4 md:py-3 text-sm sm:text-base focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300 bg-red-100 text-black placeholder-gray-600 placeholder:font-bold shadow-lg focus:outline-none`}
                  />
                  {formErrors.city && (
                    <div className="mt-1 md:mt-2 flex items-center gap-1 bg-red-500/20 backdrop-blur-sm text-white px-2 py-1 rounded-lg shadow-lg">
                      <AlertCircle className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                      <p className="text-xs md:text-sm">{formErrors.city}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address *"
                  className={`w-full ${formErrors.email ? 'border-red-500' : 'border-white'} border-2 rounded-lg md:rounded-xl px-3 py-2 md:px-4 md:py-3 text-sm sm:text-base focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300 bg-red-100 text-black placeholder-gray-600 placeholder:font-bold shadow-lg focus:outline-none`}
                />
                {formErrors.email && (
                  <div className="mt-1 md:mt-2 flex items-center gap-1 bg-red-500/20 backdrop-blur-sm text-white px-2 py-1 rounded-lg shadow-lg">
                    <AlertCircle className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                    <p className="text-xs md:text-sm">{formErrors.email}</p>
                  </div>
                )}
              </div>
              
              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white w-full py-2.5 md:py-4 rounded-lg md:rounded-xl mt-2 md:mt-4 font-semibold text-sm sm:text-base md:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </span>
                ) : (
                  <>
                    Unlock Exclusive Deals
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white/80 rounded-full animate-pulse inline-block ml-2" />
                  </>
                )}
              </button>
            </form>

            {/* Trust Indicators - COMPACT on mobile */}
            <div className="text-center mt-2 sm:mt-3 md:mt-5 text-white">
              <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3 text-xs md:text-sm mb-1 text-white/90">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-400 rounded-full" />
                  <span className="text-xs md:text-sm">41+ Years</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-400 rounded-full" />
                  <span className="text-xs md:text-sm">400+ Experts</span>
                </div>
              </div>
              <p className="text-xs md:text-sm text-white/70">
                3000+ Destinations • 24/7 Support
              </p>
            </div>

            {/* Security Badge - COMPACT on mobile */}
            <div className="flex items-center justify-center gap-1 md:gap-2 mt-1 md:mt-3 text-white/70">
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-1.25 h-1.25 md:w-1.5 md:h-1.5 bg-white rounded-full" />
              </div>
              <span className="text-xs md:text-sm">100% secure information</span>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);
};

export default LeadPopup;