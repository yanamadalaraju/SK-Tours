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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-2 sm:p-4">
      <div className="bg-white w-full max-w-md sm:max-w-2xl md:max-w-3xl rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl overflow-hidden relative animate-fadeIn max-h-[90vh] sm:max-h-[85vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 z-50 bg-white/90 hover:bg-white rounded-full p-1.5 sm:p-2 shadow-lg transition-all duration-300 hover:scale-110"
        >
          <X size={18} className="text-gray-700 sm:w-5 sm:h-5" />
        </button>

        {submitSuccess ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h3>
            <p className="text-gray-600 mb-6">
              Your details have been submitted successfully. Our travel expert will contact you soon.
            </p>
            <p className="text-sm text-gray-500">
              This popup will close automatically...
            </p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row">
            
            {/* LEFT CAROUSEL SECTION */}
            <div className="hidden md:block md:w-1/2 relative bg-gradient-to-br from-blue-50 to-cyan-50">
              <div className="relative h-full min-h-[450px] overflow-hidden">
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
                    
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="bg-white/20 backdrop-blur-lg rounded-xl p-3 border border-white/30">
                        <h3 className="text-lg font-bold mb-1">
                          {carouselContent[index]?.title || `Travel Image ${index + 1}`}
                        </h3>
                        <p className="text-white/90 text-xs">
                          {carouselContent[index]?.description || 'Beautiful travel destination'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Navigation buttons */}
                <div className="absolute top-1/2 left-3 right-3 transform -translate-y-1/2 flex justify-between">
                  <button
                    onClick={prevSlide}
                    className="bg-white/90 hover:bg-white rounded-full p-1.5 shadow-lg transition-all duration-300 hover:scale-110"
                  >
                    <ChevronLeft size={18} className="text-gray-700" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="bg-white/90 hover:bg-white rounded-full p-1.5 shadow-lg transition-all duration-300 hover:scale-110"
                  >
                    <ChevronRight size={18} className="text-gray-700" />
                  </button>
                </div>

                {/* Dots indicator */}
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentSlide 
                          ? "bg-white scale-125" 
                          : "bg-white/50 hover:bg-white/80"
                      }`}
                    />
                  ))}
                </div>

                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20">
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

            {/* Mobile-only mini carousel */}
            <div className="md:hidden relative bg-gradient-to-br from-blue-50 to-cyan-50 h-48">
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
                  </div>
                ))}
                
                <div className="absolute top-2 left-2">
                  <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    Trusted
                  </div>
                </div>
              </div>
            </div>

<div className="w-full md:w-1/2 p-4 sm:p-6 md:p-6 flex flex-col justify-center bg-gradient-to-r from-[#0F1F5C] via-[#1F3F93] to-[#0F1F5C] rounded-l-none rounded-r-xl">
  {/* Error Message */}
  {submitError && (
    <div className="mb-4 p-3 bg-red-500/20 backdrop-blur-sm border border-red-400/30 text-white rounded-lg flex items-center gap-2 text-sm shadow-lg">
      <div className="bg-red-500/20 p-1 rounded-full">
        <AlertCircle className="w-4 h-4 text-white" />
      </div>
      {submitError}
    </div>
  )}
  
  {/* Header */}
  <div className="text-center mb-4 sm:mb-5 text-white">
    <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold mb-2 sm:mb-3 border border-white/30 shadow-lg">
      <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
      Exclusive Offer
    </div>
    
    <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2 text-white">
      Join <span className="text-[#E31B23]">1M+</span>
    </h2>
    <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 text-white">
      Happy Travelers!
    </h3>
  </div>

  <p className="text-white/90 mb-4 sm:mb-5 text-center text-xs sm:text-sm leading-relaxed">
    Get exclusive access to best travel deals, early bird discounts, 
    and personalized travel inspiration.
  </p>

  {/* Form */}
  <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3">
<div>
  <input
    type="text"
    name="first_name"
    value={formData.first_name}
    onChange={handleInputChange}
    placeholder="First Name *"
    className={`w-full ${formErrors.first_name ? 'border-red-500' : 'border-white'} border-2 rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-3.5 text-base focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300 bg-red-100 text-black placeholder-gray-600 placeholder:text-base placeholder:font-bold shadow-lg focus:outline-none`}
  />
  {formErrors.first_name && (
    <div className="mt-2 flex items-center gap-2 bg-red-500/20 backdrop-blur-sm text-white px-3 py-2 rounded-lg shadow-lg">
      <div className="bg-red-500/20 p-1 rounded-full">
        <AlertCircle className="w-3 h-3 text-white" />
      </div>
      <p className="text-xs">{formErrors.first_name}</p>
    </div>
  )}
</div>
    
  <div className="grid grid-cols-2 gap-3">
  <div>
    <input
      type="tel"
      name="phone"
      value={formData.phone}
      onChange={handleInputChange}
      placeholder="Phone *"
      className={`w-full ${formErrors.phone ? 'border-red-500' : 'border-white'} border-2 rounded-lg sm:rounded-xl px-3 py-1.5 sm:px-4 sm:py-3.5 text-base focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300 bg-red-100 text-black placeholder-gray-600 placeholder:text-base placeholder:font-bold shadow-lg focus:outline-none`}
    />
    {formErrors.phone && (
      <div className="mt-2 flex items-center gap-2 bg-red-500/20 backdrop-blur-sm text-white px-3 py-2 rounded-lg shadow-lg">
        <div className="bg-red-500/20 p-1 rounded-full">
          <AlertCircle className="w-3 h-3 text-white" />
        </div>
        <p className="text-xs">{formErrors.phone}</p>
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
      className={`w-full ${formErrors.city ? 'border-red-500' : 'border-white'} border-2 rounded-lg sm:rounded-xl px-3 py-2.5 sm:px-4 sm:py-3.5 text-base focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300 bg-red-100 text-black placeholder-gray-600 placeholder:text-base placeholder:font-bold shadow-lg focus:outline-none`}
    />
    {formErrors.city && (
      <div className="mt-2 flex items-center gap-2 bg-red-500/20 backdrop-blur-sm text-white px-3 py-2 rounded-lg shadow-lg">
        <div className="bg-red-500/20 p-1 rounded-full">
          <AlertCircle className="w-3 h-3 text-white" />
        </div>
        <p className="text-xs">{formErrors.city}</p>
      </div>
    )}
  </div>
</div>

<div>
  <input
    type="email"
    name="email"
    value={formData.email}
    onChange={handleInputChange}
    placeholder="Email Address *"
    className={`w-full ${formErrors.email ? 'border-red-500' : 'border-white'} border-2 rounded-lg sm:rounded-xl px-3 py-1.5 sm:px-4 sm:py-3.5 text-base focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300 bg-red-100 text-black placeholder-gray-600 placeholder:text-base placeholder:font-bold shadow-lg focus:outline-none`}
  />
  {formErrors.email && (
    <div className="mt-2 flex items-center gap-2 bg-red-500/20 backdrop-blur-sm text-white px-3 py-2 rounded-lg shadow-lg">
      <div className="bg-red-500/20 p-1 rounded-full">
        <AlertCircle className="w-3 h-3 text-white" />
      </div>
      <p className="text-xs">{formErrors.email}</p>
    </div>
  )}
</div>
    
    <button
      type="submit"
      disabled={loading}
      className={`bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white w-full py-3 sm:py-4 rounded-lg sm:rounded-xl mt-4 sm:mt-5 font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          Processing...
        </span>
      ) : (
        <>
          Unlock Exclusive Deals
          <div className="w-1.5 h-1.5 bg-white/80 rounded-full animate-pulse inline-block ml-2" />
        </>
      )}
    </button>
  </form>

  {/* Trust Indicators */}
  <div className="text-center mt-4 sm:mt-5 text-white">
    <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 text-xs mb-2 text-white/90">
      <div className="flex items-center gap-1">
        <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
        <span className="text-xs">41+ Years</span>
      </div>
      <div className="flex items-center gap-1">
        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
        <span className="text-xs">400+ Experts</span>
      </div>
    </div>
    <p className="text-xs text-white/70">
      3000+ Destinations • 24/7 Support
    </p>
  </div>

  {/* Security Badge */}
  <div className="flex items-center justify-center gap-1.5 mt-3 text-white/70">
    <div className="w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
      <div className="w-1.5 h-1.5 bg-white rounded-full" />
    </div>
    <span className="text-xs">100% secure information</span>
  </div>
</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadPopup;