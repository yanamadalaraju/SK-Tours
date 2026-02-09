import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  MessageCircle,
  Globe,
  User,
  Shield,
  Headphones,
  Building,
  ChevronDown,
  AlertCircle
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    travelDate: '',
    travelers: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Fixed: Use import.meta.env for Vite/React apps
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    // Client-side validation
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setError('Please fill all required fields (Name, Email, Phone, Message)');
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit form');
      }

      // Success
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        destination: '',
        travelDate: '',
        travelers: '',
        message: ''
      });

      // Hide success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);

    } catch (err) {
      setIsSubmitting(false);

      // Network error or server down
      if (err instanceof TypeError && err.message.includes('fetch')) {
        setError('Unable to connect to server. Please check if the backend is running.');
      } else {
        setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
      }

      // Auto-hide error after 5 seconds
      setTimeout(() => setError(null), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqData = [
    {
      q: 'How soon will I get a response after submitting the form?',
      a: 'We typically respond within 2 hours during business hours (9 AM - 7 PM), and within 6 hours for after-hours submissions. For urgent inquiries, please call our emergency support line.'
    },
    {
      q: 'Do you offer emergency travel support?',
      a: 'Yes, we provide 24/7 emergency support via WhatsApp and dedicated phone lines. Our support team can assist with last-minute changes, travel emergencies, and urgent queries anytime, anywhere.'
    },
    {
      q: 'Can I customize a tour package according to my preferences?',
      a: 'Absolutely. We specialize in creating fully customized itineraries based on your preferences, budget, travel dates, and special requirements. Our travel experts will work with you to design the perfect journey.'
    },
    {
      q: 'What destinations do you specialize in?',
      a: 'We cover comprehensive domestic tours across all Indian states and international destinations including Southeast Asia, Europe, Middle East, Australia, New Zealand, and specialized packages for Africa and America.'
    },
    {
      q: 'How do I make payments for bookings?',
      a: 'We offer multiple secure payment options including bank transfer, credit/debit cards, UPI, and secure online payment gateways. Corporate clients can also avail invoice-based payment systems.'
    }
  ];

  return (
    <>
      <Header />

      <div className="min-h-screen bg-blue-50">
        {/* Hero Section - Mobile Responsive */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] opacity-10 bg-cover bg-center"></div>
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 mb-3 md:mb-4">
                <div className="w-2 h-5 md:h-6 bg-cyan-400"></div>
                <span className="text-cyan-300 font-medium tracking-wider text-xs md:text-sm">CONTACT US</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-light text-white mb-3 md:mb-4 leading-tight">
                Get in Touch with
                <span className="block font-bold mt-1 md:mt-2 text-xl sm:text-2xl md:text-5xl lg:text-6xl">
                  Our Travel Experts
                </span>
              </h1>

              <p className="text-sm sm:text-base md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed font-light px-2 text-justify mb-1">
                Professional travel consultation, personalized planning, and dedicated support for your perfect journey.
              </p>
            </div>
          </div>
        </section>

        {/* Success Message - Mobile Responsive */}
        {isSubmitted && (
          <div className="fixed top-16 sm:top-20 right-2 sm:right-4 md:right-8 z-50 animate-slide-in max-w-[90%] sm:max-w-xs md:max-w-md">
            <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg p-3 sm:p-4 md:p-6 shadow-2xl border border-emerald-400">
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 flex-shrink-0" />
                <div>
                  <h3 className="text-sm sm:text-base md:text-lg font-bold mb-0.5 md:mb-1 text-justify">Message Sent Successfully</h3>
                  <p className="text-xs opacity-90 text-justify">Our travel expert will contact you within 2 hours.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error Message - Mobile Responsive */}
        {error && (
          <div className="fixed top-16 sm:top-20 right-2 sm:right-4 md:right-8 z-50 animate-slide-in max-w-[90%] sm:max-w-xs md:max-w-md">
            <div className="bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-lg p-3 sm:p-4 md:p-6 shadow-2xl border border-red-400">
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 flex-shrink-0" />
                <div>
                  <h3 className="text-sm sm:text-base md:text-lg font-bold mb-0.5 md:mb-1 text-justify">Submission Failed</h3>
                  <p className="text-xs opacity-90 text-justify">{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Information - Mobile Responsive */}
        <section className="py-4 md:py-6 lg:py-8 border-b border-gray-100">
          <div className="max-w-8xl mx-auto px-3 sm:px-4 md:px-6">
            <div
              className="rounded-xl md:rounded-2xl shadow-lg p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 border border-blue-400"
              style={{
                background: 'linear-gradient(135deg, #0F1F5C 0%, #1F3F93 50%, #0F1F5C 100%)',
              }}
            >
              {/* Contact Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 text-white">
                <div className="relative pl-10 sm:pl-12 md:pl-14">
                  <div className="absolute left-0 top-0 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                    <Phone className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-1 sm:mb-2 text-justify">Phone Support</h3>
                  <div className="space-y-0.5">
                    <a
                      href="tel:+919820870771"
                      className="block text-sm sm:text-base md:text-lg hover:text-blue-200 transition-colors text-justify"
                    >
                      +91 98208 70771
                    </a>
                  </div>
                  <p className="text-blue-100 text-xs mt-1 sm:mt-1.5 text-justify">24/7 emergency support available</p>
                </div>

                <div className="relative pl-10 sm:pl-12 md:pl-14 mt-3 sm:mt-0">
                  <div className="absolute left-0 top-0 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                    <Mail className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-1 sm:mb-2 text-justify">Email Contact</h3>
                  <div className="space-y-0.5">
                    <a
                      href="mailto:salil@sktt.in"
                      className="block text-sm sm:text-base md:text-lg hover:text-blue-200 transition-colors text-justify"
                    >
                      salil@sktt.in
                    </a>
                  </div>
                  <p className="text-blue-100 text-xs mt-1 sm:mt-1.5 text-justify">Response within 2 working hours</p>
                </div>

                <div className="relative pl-10 sm:pl-12 md:pl-14 mt-3 md:mt-0">
                  <div className="absolute left-0 top-0 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                    <Headphones className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-1 sm:mb-2 text-justify">WhatsApp Support</h3>
                  <a
                    href="https://wa.me/919820870771"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm sm:text-base md:text-lg hover:text-blue-200 transition-colors text-justify"
                  >
                    +91 98208 70771
                  </a>
                  <p className="text-blue-100 text-xs mt-1 sm:mt-1.5 text-justify">Quick responses for instant queries</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Send Us Your Inquiry Header - Mobile Responsive */}
        <div className="w-full bg-gradient-to-r from-[#0F1F5C] via-[#1F3F93] to-[#0F1F5C] py-3 md:py-4 lg:py-6 mb-3 md:mb-4 lg:mb-5 shadow-lg">
          <div className="max-w-full px-3 sm:px-4 text-center">
            <h3
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-extrabold tracking-tight text-white"
              style={{
                fontFamily: "'Baloo 2', sans-serif",
                letterSpacing: "-0.5px",
                textShadow: `
                  1px 1px 0 #1F3F5C,
                  -1px -1px 0 #1F3F5C,
                  0 0 10px rgba(255, 255, 255, 0.55)
                `,
              }}
            >
              Send Us Your Inquiry
            </h3>
          </div>
        </div>

        {/* Contact Form - Mobile Responsive */}
        <div className="max-w-4xl mx-auto px-3 sm:px-4 mt-4 md:mt-6 lg:mt-9">
          <div className="bg-gradient-to-r from-[#0F1F5C] via-[#1F3F93] to-[#0F1F5C] rounded-lg md:rounded-xl shadow-xl p-3 sm:p-4 md:p-6 lg:p-8 border-2 border-white">
            <div className="text-center mb-3 md:mb-4 lg:mb-5">
              <p className="text-white max-w-2xl mx-auto font-medium text-xs sm:text-sm md:text-base text-justify px-1">
                Fill out the form below and our travel specialists will prepare a customized proposal for you.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5 lg:space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-white mb-2 md:mb-3 lg:mb-4 flex items-center">
                  <User className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-2 text-blue-200" />
                  <span className="text-justify">Personal Information</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
                  <div className="sm:col-span-2 md:col-span-1">
                    <label className="block text-xs sm:text-sm font-medium text-white mb-1 sm:mb-2 text-justify">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 border-2 border-white rounded-lg focus:ring-2 focus:ring-white focus:border-transparent outline-none transition-all duration-300 bg-red-100 text-black placeholder-gray-600 shadow-lg focus:outline-none text-sm sm:text-base"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="sm:col-span-2 md:col-span-1">
                    <label className="block text-xs sm:text-sm font-medium text-white mb-1 sm:mb-2 text-justify">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 border-2 border-white rounded-lg focus:ring-2 focus:ring-white focus:border-transparent outline-none transition-all duration-300 bg-red-100 text-black placeholder-gray-600 shadow-lg focus:outline-none text-sm sm:text-base"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div className="sm:col-span-2 md:col-span-1">
                    <label className="block text-xs sm:text-sm font-medium text-white mb-1 sm:mb-2 text-justify">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 border-2 border-white rounded-lg focus:ring-2 focus:ring-white focus:border-transparent outline-none transition-all duration-300 bg-red-100 text-black placeholder-gray-600 shadow-lg focus:outline-none text-sm sm:text-base"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
              </div>

              {/* Travel Details */}
              <div>
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-white mb-2 md:mb-3 lg:mb-4 flex items-center">
                  <Globe className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-2 text-blue-200" />
                  <span className="text-justify">Travel Details</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-white mb-1 sm:mb-2 text-justify">
                      Destination Interest
                    </label>
                    <select
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 border-2 border-white rounded-lg focus:ring-2 focus:ring-white focus:border-transparent outline-none transition-all duration-300 bg-red-100 text-black shadow-lg focus:outline-none text-sm sm:text-base"
                    >
                      <option value="" className="text-gray-600 text-sm sm:text-base">Select destination</option>
                      <option value="domestic" className="text-black text-sm sm:text-base">Domestic (India)</option>
                      <option value="international" className="text-black text-sm sm:text-base">International</option>
                      <option value="europe" className="text-black text-sm sm:text-base">Europe</option>
                      <option value="asia" className="text-black text-sm sm:text-base">Southeast Asia</option>
                      <option value="middle-east" className="text-black text-sm sm:text-base">Middle East</option>
                      <option value="usa" className="text-black text-sm sm:text-base">USA & Canada</option>
                      <option value="australia" className="text-black text-sm sm:text-base">Australia & NZ</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-white mb-1 sm:mb-2 text-justify">
                      Travel Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="travelDate"
                        value={formData.travelDate}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 border-2 border-white rounded-lg focus:ring-2 focus:ring-white focus:border-transparent outline-none transition-all duration-300 bg-red-100 text-black shadow-lg focus:outline-none text-sm sm:text-base [color-scheme:light]"
                      />
                      {/* Calendar icon styling */}
                          <style>{`
                        input[type="date"]::-webkit-calendar-picker-indicator {
                          filter: invert(0%) sepia(100%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%);
                          cursor: pointer;
                          padding: 4px;
                          background-size: 16px;
                        }
                        input[type="date"]::-moz-calendar-picker-indicator {
                          filter: invert(0%) sepia(100%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%);
                          cursor: pointer;
                          padding: 4px;
                          background-size: 16px;
                        }
                      `}</style>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-white mb-1 sm:mb-2 text-justify">
                      Number of Travelers
                    </label>
                    <select
                      name="travelers"
                      value={formData.travelers}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 border-2 border-white rounded-lg focus:ring-2 focus:ring-white focus:border-transparent outline-none transition-all duration-300 bg-red-100 text-black shadow-lg focus:outline-none text-sm sm:text-base"
                    >
                      <option value="" className="text-gray-600 text-sm sm:text-base">Select</option>
                      <option value="1" className="text-black text-sm sm:text-base">1 Traveler</option>
                      <option value="2" className="text-black text-sm sm:text-base">2 Travelers</option>
                      <option value="3-4" className="text-black text-sm sm:text-base">3-4 Travelers</option>
                      <option value="5-10" className="text-black text-sm sm:text-base">5-10 Travelers</option>
                      <option value="10+" className="text-black text-sm sm:text-base">10+ Travelers</option>
                      <option value="corporate" className="text-black text-sm sm:text-base">Corporate Group</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-white mb-2 md:mb-3 lg:mb-4 flex items-center">
                  <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-2 text-blue-200" />
                  <span className="text-justify">Your Requirements</span>
                </h3>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-white mb-1 sm:mb-2 text-justify">
                    Detailed Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 border-2 border-white rounded-lg focus:ring-2 focus:ring-white focus:border-transparent outline-none transition-all duration-300 resize-none bg-red-100 text-black placeholder-gray-600 shadow-lg focus:outline-none text-sm sm:text-base text-justify"
                    placeholder="Please describe your travel requirements, preferred activities, budget range, and any special requests..."
                  ></textarea>
                  <div className="text-right text-xs text-white/70 mt-0.5 text-justify">
                    {formData.message.length}/2000 characters
                  </div>
                </div>
              </div>

              {/* Submit Section */}
              <div className="pt-3 md:pt-4 lg:pt-6 border-t border-white/30">
                <div className="flex flex-col sm:flex-row items-center justify-between">
                  <div className="flex items-center gap-1 sm:gap-2 md:gap-3 mb-2 sm:mb-0">
                    <Shield className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-blue-200" />
                    <span className="text-xs sm:text-sm text-white text-justify">
                      Your information is protected and will not be shared
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-lg font-semibold flex items-center gap-1 sm:gap-2 md:gap-3 transition-all w-full sm:w-auto justify-center text-sm sm:text-base text-justify ${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed text-white'
                        : 'bg-white text-[#0F1F5C] hover:bg-gray-100'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 border-2 border-[#0F1F5C] border-t-transparent rounded-full animate-spin"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                        Submit Inquiry
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Office Information - Mobile Responsive */}
        <section className="py-4 md:py-6 lg:py-8 bg-blue-50">
          <div className="w-full bg-gradient-to-r from-[#0F1F5C] via-[#1F3F93] to-[#0F1F5C] py-3 md:py-4 lg:py-6 mb-4 md:mb-6 lg:mb-9 shadow-lg">
            <div className="max-w-full px-3 sm:px-4 text-center">
              <h3
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-extrabold tracking-tight text-white"
                style={{
                  fontFamily: "'Baloo 2', sans-serif",
                  letterSpacing: "-0.5px",
                  textShadow: `
                    1px 1px 0 #1F3F5C,
                    -1px -1px 0 #1F3F5C,
                    0 0 10px rgba(255, 255, 255, 0.55)
                  `,
                }}
              >
                Visit Our Headquarters
              </h3>
            </div>
          </div>
          
          <div className="max-w-6xl mx-auto px-3 sm:px-4">
            <div className="bg-gradient-to-r from-[#0F1F5C] via-[#1F3F93] to-[#0F1F5C] p-3 sm:p-4 md:p-6 lg:p-8 rounded-lg md:rounded-2xl shadow-xl border-2 border-white">
              <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10 xl:gap-12">
                {/* Contact Information */}
                <div className="space-y-4 md:space-y-5 lg:space-y-8">
                  <div>
                    <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white mb-2 md:mb-3 lg:mb-4 flex items-center">
                      <Building className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-2 text-blue-200" />
                      <span className="text-justify">Corporate Office</span>
                    </h3>
                    <div className="space-y-1 sm:space-y-2 pl-4 sm:pl-5 md:pl-6 lg:pl-7">
                      <p className="text-white text-xs sm:text-sm md:text-base text-justify">
                        <strong className="text-blue-200">Address:</strong> Dadar West, Mumbai 400028 INDIA
                      </p>
                      <p className="text-white text-xs sm:text-sm md:text-base text-justify">
                        <strong className="text-blue-200">Landline:</strong> +919820870771
                      </p>
                      <p className="text-white text-xs sm:text-sm md:text-base text-justify">
                        <strong className="text-blue-200">Email:</strong> salil@sktt.in
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white mb-2 md:mb-3 lg:mb-4 flex items-center">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-2 text-blue-200" />
                      <span className="text-justify">Business Hours</span>
                    </h3>
                    <div className="space-y-1 pl-4 sm:pl-5 md:pl-6 lg:pl-7">
                      <div className="flex justify-between py-1.5 border-b border-white/30">
                        <span className="text-white text-xs sm:text-sm md:text-base text-justify">Monday - Friday</span>
                        <span className="font-medium text-white text-xs sm:text-sm md:text-base text-justify">10 AM - 6 PM</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-white/30">
                        <span className="text-white text-xs sm:text-sm md:text-base text-justify">Saturday</span>
                        <span className="font-medium text-white text-xs sm:text-sm md:text-base text-justify">10 AM - 3 PM</span>
                      </div>
                      <div className="flex justify-center py-1.5 border-b border-white/30">
                        <span className="text-white text-center text-xs sm:text-sm md:text-base text-justify">Closed on Sunday and Public Holidays</span>
                      </div>
                      <div className="flex justify-between py-1.5">
                        <span className="text-white text-xs sm:text-sm md:text-base text-justify">Emergency Support</span>
                        <span className="font-medium text-white text-xs sm:text-sm md:text-base text-justify">24/7 Available</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map Section */}
                <div className="flex flex-col mt-4 md:mt-0">
                  {/* Card with Google Maps */}
                  <div className="bg-white rounded-lg md:rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.2)] overflow-hidden border border-white/30">
                    {/* Google Maps Section */}
                    <div className="h-[250px] sm:h-[280px] md:h-[320px] lg:h-[380px] xl:h-[450px]">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.595615355449!2d72.81951531538446!3d19.125755755379388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9c6765d6145%3A0xfa4c2c8a1c7c2f6e!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1648471234567!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="SK Tours Office Location"
                        className="w-full h-full"
                      />
                    </div>
                  </div>

                  {/* Button Outside the Card */}
                  <a
                    href="https://maps.google.com/?q=SK+Tours+Mumbai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-2.5 sm:py-3 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-300 text-center block text-xs sm:text-sm md:text-base text-justify"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section - Mobile Responsive */}
        <section className="py-4 md:py-6 lg:py-8 pt-0 bg-blue-50">
          <div className="w-full bg-gradient-to-r from-[#0F1F5C] via-[#1F3F93] to-[#0F1F5C] py-3 md:py-4 lg:py-6 mb-3 md:mb-4 lg:mb-5 shadow-lg">
            <div className="max-w-full px-3 sm:px-4 text-center">
              <h3
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-extrabold tracking-tight text-white"
                style={{
                  fontFamily: "'Baloo 2', sans-serif",
                  letterSpacing: "-0.5px",
                  textShadow: `
                    1px 1px 0 #1F3F5C,
                    -1px -1px 0 #1F3F5C,
                    0 0 10px rgba(255, 255, 255, 0.55)
                  `,
                }}
              >
                Frequently Asked Questions
              </h3>
            </div>
          </div>
         
          <div className="max-w-5xl mx-auto px-3 sm:px-4 mt-4 md:mt-6 lg:mt-8">
            <div className="bg-gradient-to-r from-[#0F1F5C] via-[#1F3F93] to-[#0F1F5C] rounded-lg md:rounded-xl shadow-xl p-3 sm:p-4 md:p-6 lg:p-8 border-2 border-white">
              <div className="text-center mb-3 md:mb-4 lg:mb-6">
                <p className="text-white text-xs sm:text-sm md:text-base text-center px-1">
                  Common queries about our services and support
                </p>
              </div>

              <div className="space-y-2 sm:space-y-3 md:space-y-4">
                {faqData.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm border border-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-5 text-left flex justify-between items-center hover:bg-white/10 transition-colors"
                    >
                      <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-medium text-white text-justify pr-2">{faq.q}</h3>
                      <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-blue-200 transition-transform duration-300 flex-shrink-0 ${activeFaq === index ? 'rotate-180' : ''}`} />
                    </button>
                    {activeFaq === index && (
                      <div className="px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-5 pt-1.5 md:pt-2 border-t border-white/30">
                        <p className="text-white leading-relaxed text-xs sm:text-sm md:text-base text-justify">{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default ContactPage;