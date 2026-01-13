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
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] opacity-10 bg-cover bg-center"></div>
          </div>
          
          <div className="relative z-10 max-w-6xl mx-auto px-4">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-2 h-8 bg-cyan-400"></div>
                <span className="text-cyan-300 font-medium tracking-wider">CONTACT US</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-light text-white mb-6 leading-tight">
                Get in Touch with
                <span className="block font-bold mt-2">Our Travel Experts</span>
              </h1>
              
              <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed font-light">
                Professional travel consultation, personalized planning, and dedicated support for your perfect journey.
              </p>
            </div>
          </div>
        </section>

        {/* Success Message */}
        {isSubmitted && (
          <div className="fixed top-24 right-8 z-50 animate-slide-in">
            <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg p-6 shadow-2xl border border-emerald-400 max-w-md">
              <div className="flex items-center gap-4">
                <CheckCircle className="w-8 h-8 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold mb-1">Message Sent Successfully</h3>
                  <p className="text-sm opacity-90">Our travel expert will contact you within 2 hours.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="fixed top-24 right-8 z-50 animate-slide-in">
            <div className="bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-lg p-6 shadow-2xl border border-red-400 max-w-md">
              <div className="flex items-center gap-4">
                <AlertCircle className="w-8 h-8 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold mb-1">Submission Failed</h3>
                  <p className="text-sm opacity-90">{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Information */}
    <section className="py-20 border-b border-gray-100">
  <div className="max-w-6xl mx-auto px-4">
    <div className="grid md:grid-cols-3 gap-8 mb-16">
      <div className="relative pl-14">
        <div className="absolute left-0 top-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
          <Phone className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">Phone Support</h3>
        <div className="space-y-1">
          <a 
            href="tel:+919820870771" 
            className="block text-lg text-gray-700 hover:text-blue-600 transition-colors"
          >
            +91 98208 70771
          </a>
        </div>
        <p className="text-gray-500 text-sm mt-3">24/7 emergency support available</p>
      </div>
      
      <div className="relative pl-14">
        <div className="absolute left-0 top-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
          <Mail className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">Email Contact</h3>
        <div className="space-y-1">
          <a 
            href="mailto:salil@sktt.in" 
            className="block text-lg text-gray-700 hover:text-blue-600 transition-colors"
          >
            salil@sktt.in
          </a>
        </div>
        <p className="text-gray-500 text-sm mt-3">Response within 2 working hours</p>
      </div>
      
      <div className="relative pl-14">
        <div className="absolute left-0 top-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
          <Headphones className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">WhatsApp Support</h3>
        <a 
          href="https://wa.me/919820870771" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block text-lg text-gray-700 hover:text-blue-600 transition-colors"
        >
          +91 98208 70771
        </a>
        <p className="text-gray-500 text-sm mt-3">Quick responses for instant queries</p>
      </div>
    </div>

    {/* Main Contact Form */}
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Send Us Your Inquiry
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Fill out the form below and our travel specialists will prepare a customized proposal for you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <div className="border-b border-gray-200 pb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <User className="w-5 h-5 mr-2 text-blue-600" />
            Personal Information
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                minLength={2}
                maxLength={100}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                placeholder="your.email@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                placeholder="+91 98765 43210"
              />
            </div>
          </div>
        </div>

        {/* Travel Details */}
        <div className="border-b border-gray-200 pb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Globe className="w-5 h-5 mr-2 text-blue-600" />
            Travel Details
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destination Interest
              </label>
              <select
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white"
              >
                <option value="">Select destination</option>
                <option value="domestic">Domestic (India)</option>
                <option value="international">International</option>
                <option value="europe">Europe</option>
                <option value="asia">Southeast Asia</option>
                <option value="middle-east">Middle East</option>
                <option value="usa">USA & Canada</option>
                <option value="australia">Australia & NZ</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Travel Date
              </label>
              <input
                type="date"
                name="travelDate"
                value={formData.travelDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Travelers
              </label>
              <select
                name="travelers"
                value={formData.travelers}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white"
              >
                <option value="">Select</option>
                <option value="1">1 Traveler</option>
                <option value="2">2 Travelers</option>
                <option value="3-4">3-4 Travelers</option>
                <option value="5-10">5-10 Travelers</option>
                <option value="10+">10+ Travelers</option>
                <option value="corporate">Corporate Group</option>
              </select>
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="pb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <MessageCircle className="w-5 h-5 mr-2 text-blue-600" />
            Your Requirements
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Detailed Message *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              minLength={10}
              maxLength={2000}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
              placeholder="Please describe your travel requirements, preferred activities, budget range, and any special requests..."
            ></textarea>
            <div className="text-right text-sm text-gray-500 mt-1">
              {formData.message.length}/2000 characters
            </div>
          </div>
        </div>

        {/* Submit Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-4 sm:mb-0">
            <Shield className="w-5 h-5 text-emerald-500" />
            <span className="text-sm text-gray-600">
              Your information is protected and will not be shared
            </span>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-10 py-4 rounded-lg font-bold text-white flex items-center gap-3 transition-all duration-300 ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:shadow-xl hover:translate-y-[-2px]'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Submit Inquiry
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  </div>
</section>

        {/* Office Information */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                  Visit Our Headquarters
                </h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <Building className="w-5 h-5 mr-2 text-blue-600" />
                      Corporate Office
                    </h3>
                    <div className="space-y-3 pl-7">
                      <p className="text-gray-700">
                        <strong>Address:</strong> Dadar West, Mumbai 400028 INDIA
                      </p>
                      <p className="text-gray-700">
                        <strong>Landline:</strong> +919820870771
                      </p>
                      <p className="text-gray-700">
                        <strong>Email:</strong> salil@sktt.in 
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-blue-600" />
                      Business Hours
                    </h3>
                    <div className="space-y-2 pl-7">
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-gray-700">Monday - Friday</span>
                        <span className="font-medium">9:00 AM - 7:00 PM</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-gray-700">Saturday</span>
                        <span className="font-medium">10:00 AM - 5:00 PM</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-gray-700">Sunday</span>
                        <span className="font-medium">10:00 AM - 2:00 PM</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-gray-700">Emergency Support</span>
                        <span className="font-medium text-blue-600">24/7 Available</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
<div className="flex flex-col">
  {/* Card with Google Maps */}
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
    {/* Google Maps Section */}
    <div className="h-[400px] md:h-[450px]">
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
    className="mt-4 w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3.5 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-300 text-center block"
  >
    Get Directions
  </a>
</div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600">
                Common queries about our services and support
              </p>
            </div>
            
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div 
                  key={index} 
                  className="border border-gray-200 rounded-lg overflow-hidden hover:border-blue-300 transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="text-lg font-medium text-gray-900">{faq.q}</h3>
                    <ChevronDown className={`w-5 h-5 text-blue-600 transition-transform duration-300 ${
                      activeFaq === index ? 'rotate-180' : ''
                    }`} />
                  </button>
                  {activeFaq === index && (
                    <div className="px-6 pb-5 pt-2 border-t border-gray-100">
                      <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
      
      <Footer />
    </>
  );
};

export default ContactPage;