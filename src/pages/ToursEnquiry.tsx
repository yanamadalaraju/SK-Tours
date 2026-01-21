import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BASE_URL } from "@/ApiUrls";
import Swal from "sweetalert2";

const TourEnquiry = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const tour = state?.tour;
  const formRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* =======================
     HANDLE INVALID ACCESS
  ======================== */
  useEffect(() => {
    if (!tour) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Access",
        text: "Tour information not found.",
        confirmButtonColor: "#E53C42"
      }).then(() => {
        navigate(-1);
      });
    }
  }, [tour, navigate]);

  /* =======================
     INPUT HANDLER
  ======================== */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  /* =======================
     VALIDATION
  ======================== */
  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  /* =======================
     SUBMIT HANDLER - FIXED
  ======================== */
  const submitEnquiry = async (e) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (isSubmitting) {
      return;
    }

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      
      // Find first error field and scroll to it
      const firstErrorField = Object.keys(validationErrors)[0];
      const element = document.querySelector(`[name="${firstErrorField}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
      }
      
      Swal.fire({
        icon: "warning",
        title: "Please Complete the Form",
        text: "Please fill all required fields correctly.",
        confirmButtonColor: "#E53C42",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
      });
      return;
    }

    setIsSubmitting(true);

    const payload = {
      tour_id: tour?.id || "",
      tour_code: tour?.code || "",
      tour_title: tour?.title || "",
      ...form
    };

    try {
      // Show immediate feedback
      const loadingSwal = Swal.fire({
        title: "Submitting...",
        text: "Please wait while we save your enquiry",
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      const res = await fetch(`${BASE_URL}/api/tour-enquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      // Close loading immediately
      await loadingSwal.close();

      if (res.ok) {
        // Clear form immediately
        setForm({
          name: "",
          email: "",
          phone: "",
          message: ""
        });
        
        // Reset errors
        setErrors({});

        // Show success message with navigation
        await Swal.fire({
          icon: "success",
          title: "Thank You!",
          html: `
            <div class="text-center">
              <div class="mb-4">
                <svg class="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <p class="text-lg font-semibold text-gray-800 mb-2">Enquiry Submitted Successfully!</p>
              <p class="text-gray-600 mb-4">Our travel expert will contact you within 24 hours.</p>
              <div class="bg-green-50 p-3 rounded-lg border border-green-200">
                <p class="text-sm"><strong>Reference:</strong> ${tour?.code || 'N/A'}</p>
              </div>
            </div>
          `,
          confirmButtonColor: "#10B981",
          confirmButtonText: "Back to Tour",
          showCancelButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false
        });

        // Navigate back after user confirms
        navigate(-1);

      } else {
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: data.message || "Please try again later.",
          confirmButtonColor: "#E53C42",
          confirmButtonText: "Try Again"
        });
      }
    } catch (error) {
      // Check if it's a network error
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        Swal.fire({
          icon: "warning",
          title: "No Internet Connection",
          text: "Please check your internet connection and try again.",
          confirmButtonColor: "#E53C42"
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Unexpected Error",
          text: "Something went wrong. Please try again.",
          confirmButtonColor: "#E53C42"
        });
      }
      console.error("Submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =======================
     QUICK NAVIGATION
  ======================== */
  const handleBack = () => {
    navigate(-1);
  };

  /* =======================
     UI - FIXED
  ======================== */
  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-2xl">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="mb-6 flex items-center gap-2 text-[#2E4D98] hover:text-[#2E4D98]/80 transition-colors"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
                clipRule="evenodd" 
              />
            </svg>
            Back to Tour
          </button>

          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Tour Enquiry
            </h1>

            {tour && (
              <div className="inline-block bg-red-50 border border-red-100 p-4 mb-6 rounded-lg shadow-sm">
                <p className="text-gray-800 font-medium">
                  Enquiry for:{" "}
                  <span className="text-[#E53C42] font-semibold">{tour.title}</span>
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Tour Code: <span className="font-medium">{tour.code}</span>
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Complete the form below to get personalized assistance
                </p>
              </div>
            )}

            <p className="text-gray-600 max-w-lg mx-auto">
              Fill out the form below and our travel expert will get back to you within 24 hours.
            </p>
          </div>

          <form
            ref={formRef}
            onSubmit={submitEnquiry}
            className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200"
            id="enquiryForm"
          >
            <div className="space-y-5">
              {/* Name Field */}
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-gray-700 font-medium">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`h-11 ${errors.name ? "border-red-500 focus:ring-red-200" : "focus:ring-blue-200"}`}
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className={`h-11 ${errors.email ? "border-red-500 focus:ring-red-200" : "focus:ring-blue-200"}`}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone Field */}
              <div className="space-y-1.5">
                <Label htmlFor="phone" className="text-gray-700 font-medium">
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className={`h-11 ${errors.phone ? "border-red-500 focus:ring-red-200" : "focus:ring-blue-200"}`}
                  disabled={isSubmitting}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div className="space-y-1.5">
                <Label htmlFor="message" className="text-gray-700 font-medium">
                  Message <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your requirements, preferred dates, number of people, etc."
                  rows={4}
                  className={`resize-none ${errors.message ? "border-red-500 focus:ring-red-200" : "focus:ring-blue-200"}`}
                  disabled={isSubmitting}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 text-base font-semibold transition-all duration-200 bg-gradient-to-r from-[#E53C42] to-red-600 hover:from-red-600 hover:to-red-700 text-white disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </div>
                ) : (
                  "Submit Enquiry"
                )}
              </Button>

              {/* Quick Help */}
              <div className="text-center pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  Need immediate assistance? Call us at{" "}
                  <a href="tel:18001234567" className="text-[#2E4D98] font-medium hover:underline">
                    1800-123-4567
                  </a>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default TourEnquiry;