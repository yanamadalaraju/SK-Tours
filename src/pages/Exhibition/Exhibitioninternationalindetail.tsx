import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PDFDownloadLink } from '@react-pdf/renderer';
import TourPdfDocumentinternational from '../../pages/TourPdfDocumentinternational';
import { BASE_URL } from '@/ApiUrls';
import EmailModal from '../../pages/EmailModal';
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

interface EmailFormData {
  from: string;
  to: string;
  subject: string;
  message: string;
}

interface DomesticExhibition {
  id: number;
  domestic_category_name: string;
}

interface InternationalExhibition {
  id: number;
  international_category_name: string;
}

// DayCard Component
const DayCard = ({ dayNumber, headerColor, bodyColor, dayData }) => {
  const [meals, setMeals] = useState({ B: false, L: false, D: false });

  useEffect(() => {
    if (dayData?.meals) {
      const mealsStr = dayData.meals.toLowerCase();
      setMeals({
        B: mealsStr.includes('breakfast'),
        L: mealsStr.includes('lunch'),
        D: mealsStr.includes('dinner')
      });
    }
  }, [dayData?.meals]);

  return (
    <div className="rounded-lg">
      <div className="mb-1 w-full">
        <div className="relative">
          <div className="overflow-x-auto lg:overflow-visible">
            <div className="flex gap-1 w-max lg:w-full min-w-full lg:min-w-0">
              <div className={`${headerColor} text-white font-bold px-3 lg:px-4 py-2 rounded-lg text-center w-[70px] lg:w-[100px] flex-shrink-0 border border-black`}>
                <span className="text-xs lg:text-sm">{dayNumber}</span>
              </div>
              <div className={`${headerColor} text-white font-bold px-3 lg:px-4 py-2 rounded-lg border border-black flex-1 min-w-[180px] lg:min-w-0 flex items-center`}>
                <div className="truncate lg:whitespace-normal text-xs lg:text-base">
                  {dayData?.title || "Day Details"}
                </div>
              </div>
              <div className={`${headerColor} text-white border border-black rounded-lg px-1.5 lg:px-3 py-1.5 flex items-center justify-center gap-1 lg:gap-3 w-full max-w-[120px] lg:w-[130px] flex-shrink-0`}>
                {['B', 'L', 'D'].map((meal) => (
                  <div key={meal} className="flex items-center gap-1">
                    <div className="h-4 w-4 border border-gray-400 bg-white flex items-center justify-center">
                      {meals[meal] ? (
                        <svg className="h-3 w-3 text-blue-700" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="h-3 w-3 text-red-600" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                          <path d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                    </div>
                    <span className="text-white text-xs lg:text-sm font-bold">{meal}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${bodyColor} rounded-lg border border-black overflow-hidden`}>
        <div className="p-2 text-black whitespace-pre-line text-justify h-[150px] overflow-y-auto">
          {dayData?.description || ""}
        </div>
      </div>
    </div>
  );
};

// Main Component
const Exhibitioninternationalindetail = () => {
  const { tourId: exhibitionId } = useParams();
  const navigate = useNavigate();

  // State Management
  const [activeTab, setActiveTab] = useState("itinerary");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tourType, setTourType] = useState('');
  const [autoScrollInterval, setAutoScrollInterval] = useState<ReturnType<typeof setInterval> | null>(null);
  const [selectedCostMonth, setSelectedCostMonth] = useState("");
  const [selectedCostDate, setSelectedCostDate] = useState("");
  const [activeVisaFeeType, setActiveVisaFeeType] = useState('tourist');
  const [activeVisaTab, setActiveVisaTab] = useState('tourist');

  // Sidebar filter states
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchBtn, setShowSearchBtn] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [showMoreDomestic, setShowMoreDomestic] = useState(false);
  const [showMoreInternational, setShowMoreInternational] = useState(false);
  const [selectedDomesticCategories, setSelectedDomesticCategories] = useState<string[]>([]);
  const [selectedInternationalCategories, setSelectedInternationalCategories] = useState<string[]>([]);

  // Sidebar data state
  const [domesticList, setDomesticList] = useState<string[]>([]);
  const [domesticExhibitionData, setDomesticExhibitionData] = useState<DomesticExhibition[]>([]);
  const [internationalList, setInternationalList] = useState<string[]>([]);
  const [internationalExhibitionData, setInternationalExhibitionData] = useState<InternationalExhibition[]>([]);
  const [loadingDomestic, setLoadingDomestic] = useState(false);
  const [loadingInternational, setLoadingInternational] = useState(false);

  const dayCardColors = [
    { headerColor: "bg-[#A72703]", bodyColor: "bg-[#FFE797]" },
    { headerColor: "bg-[#A72703]", bodyColor: "bg-[#FFE797]" },
    { headerColor: "bg-[#A72703]", bodyColor: "bg-[#FFE797]" }
  ];

  // ── Helper Functions ───────────────────────────────────────────────────────
  const formatPrice = (price) => {
    if (typeof price === 'number') return `₹${price.toLocaleString('en-IN')}`;
    if (typeof price === 'string' && price !== '0.00' && price !== '0') {
      return `₹${parseFloat(price).toLocaleString('en-IN')}`;
    }
    return price || '₹0';
  };

  const calculateEMI = (price) => {
    if (!price) return 'EMI from ₹0/month';
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return `EMI from ₹${Math.round(numPrice / 6).toLocaleString('en-IN')}/month`;
  };

  const formatDuration = (days) => `${days - 1}N/${days}D`;

  const getBadge = (categoryId) => {
    switch (categoryId) {
      case 1: return "New";
      case 2: return "Premium";
      case 3: return "Luxury";
      default: return "Special";
    }
  };

  const getDefaultImages = () => [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80"
  ];

  const nextImage = () => {
    if (tour?.images) setCurrentImageIndex(prev => prev === tour.images.length - 1 ? 0 : prev + 1);
  };
  const prevImage = () => {
    if (tour?.images) setCurrentImageIndex(prev => prev === 0 ? tour.images.length - 1 : prev - 1);
  };
  const goToImage = (index) => setCurrentImageIndex(index);

  const resetAutoScroll = () => {
    if (autoScrollInterval) clearInterval(autoScrollInterval);
    if (tour?.images?.length > 1) {
      const interval = setInterval(() => nextImage(), 5000);
      setAutoScrollInterval(interval);
    }
  };

  // ── Sidebar Handlers ─────────────────────────────────────────────────────
  const handleAboutClick = () => navigate('/exhibition', { state: { category: null } });

  const handleDomesticClick = (category: string) => {
    const found = domesticExhibitionData.find(
      (item) => item.domestic_category_name === category
    );
    if (found) {
      navigate(`/exhibitiondetail/${found.id}`);
    } else {
      navigate('/exhibition', { state: { category } });
    }
  };

  const handleInternationalClick = (category: string) => {
    const found = internationalExhibitionData.find(
      (item) => item.international_category_name === category
    );
    if (found) {
      navigate(`/exhibitioninternationalindetail/${found.id}`);
    }
  };

  const handleDomesticCheckboxChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedDomesticCategories([category]);
      setSelectedInternationalCategories([]);
      const found = domesticExhibitionData.find(d => d.domestic_category_name === category);
      if (found) navigate(`/exhibitiondetail/${found.id}`);
    } else {
      setSelectedDomesticCategories([]);
    }
  };

  const handleInternationalCheckboxChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedInternationalCategories([category]);
      setSelectedDomesticCategories([]);
      const found = internationalExhibitionData.find(i => i.international_category_name === category);
      if (found) navigate(`/exhibitioninternationalindetail/${found.id}`);
    } else {
      setSelectedInternationalCategories([]);
    }
  };

  const clearAllFilters = () => {
    setPriceRange([0, 500000]);
    setSearchQuery("");
    setShowSearchBtn(false);
    setIsSearchActive(false);
    setSelectedDomesticCategories([]);
    setSelectedInternationalCategories([]);
  };




  // ── Data Processing ────────────────────────────────────────────────────────
  const processTourData = (apiData, imagesArray) => {
    const {
      exhibition, tours, itineraries, departures, inclusions, exclusions,
      costs, hotels, transports, bookingpoi, cancellationpolicies, instructions,
      optionaltours, emioptions, visa_details, visa_forms, visa_fees, visa_submission
    } = apiData;

    const basicDetails = tours?.[0] || {};
  
    const processImages = (imgs) => {
      if (imgs?.length) {
        const sorted = [...imgs].sort((a, b) => (b.is_cover - a.is_cover));
        return sorted.map(img => img.url);
      }
      return getDefaultImages();
    };

    const processDepartures = (arr) => {
      if (!arr?.length) return { descriptions: ["No departure information available."] };
      const descriptions: string[] = [];
      arr.forEach(dep => {
        const text = dep.departure_text || dep.description;
        if (text && !descriptions.includes(text)) descriptions.push(text);
      });
      return { descriptions: descriptions.length ? descriptions : ["No description available."] };
    };

    const processItinerary = (arr) => {
      if (arr?.length) {
        return arr.map((day, index) => ({
          day: `Day ${day.day || index + 1}`,
          title: day.title || `Day ${index + 1}`,
          description: day.description || '',
          meals: day.meals || ''
        }));
      }
      const days = basicDetails.duration_days || 6;
      return Array(days).fill(null).map((_, i) => ({
        day: `Day ${i + 1}`,
        title: i === 0 ? "Arrival & Check-in" : i === days - 1 ? "Departure" : `Day ${i + 1} Exploration`,
        description: i === 0 ? 'Arrive at destination, transfer to hotel, and check-in'
          : i === days - 1 ? 'Check-out from hotel and transfer to airport for departure'
          : 'Full day of exploration and activities',
        meals: ''
      }));
    };

    const processTourCost = (arr) => {
      if (arr?.length) {
        return {
          tableData: arr.map(cost => ({
            passenger: `${cost.pax} Pax`,
            standard: cost.standard_hotel !== "0.00" ? formatPrice(cost.standard_hotel) : "NA",
            deluxe: cost.deluxe_hotel !== "0.00" ? formatPrice(cost.deluxe_hotel) : "NA",
            executive: cost.executive_hotel !== "0.00" ? formatPrice(cost.executive_hotel) : "NA",
            childWithBed: cost.child_with_bed !== "0.00" ? formatPrice(cost.child_with_bed) : "NA",
            childNoBed: cost.child_no_bed !== "0.00" ? formatPrice(cost.child_no_bed) : "NA"
          })),
          remarks: basicDetails.cost_remarks ? [basicDetails.cost_remarks] : []
        };
      }
      return { tableData: [], remarks: basicDetails.cost_remarks ? [basicDetails.cost_remarks] : [] };
    };

    const processOptionalTours = (arr) =>
      arr?.length ? arr.map(t => ({ tourName: t.tour_name || '', adultPrice: t.adult_price || '', childPrice: t.child_price || '' })) : [];

    const processEMIOptions = (arr) => {
      if (arr?.length) {
        return {
          loanAmount: "Variable",
          options: arr.map(o => ({
            loanAmount: formatPrice(o.loan_amount || '0'),
            months: o.months || 0,
            emi: formatPrice(o.emi)
          }))
        };
      }
      return { loanAmount: "N/A", options: [] };
    };

    const processBooking = (arr) => {
      if (arr?.length) {
        return {
          items: arr.map(item => item.item || ''),
          amountDetails: arr.map(item => item.amount_details || '0')
        };
      }
      return { items: ["Standard booking terms apply"], amountDetails: ["0"] };
    };

    const processHotels = (arr) => {
      if (arr?.length) {
        return {
          tableData: arr.map(hotel => ({
            city: hotel.city,
            nights: `${hotel.nights} Night${hotel.nights > 1 ? 's' : ''}`,
            standard: hotel.standard_hotel_name || "N/A",
            deluxe: hotel.deluxe_hotel_name || "N/A",
            executive: hotel.executive_hotel_name || "N/A",
          })),
          remarks: basicDetails.hotel_remarks ? [basicDetails.hotel_remarks] : []
        };
      }
      return { tableData: [], remarks: basicDetails.hotel_remarks ? [basicDetails.hotel_remarks] : [] };
    };

    const processTransport = (arr) => {
      if (arr?.length) {
        return {
          tableData: arr.map(t => ({ description: t.description || '' })),
          remarks: basicDetails.transport_remarks ? [basicDetails.transport_remarks] : []
        };
      }
      return { tableData: [], remarks: basicDetails.transport_remarks ? [basicDetails.transport_remarks] : [] };
    };

    const processCancellation = (arr) => {
      if (arr?.length) {
        return {
          policies: arr.map(p => p.cancellation_policy || ''),
          charges: arr.map(p => p.charges && !isNaN(p.charges) ? `₹${parseFloat(p.charges).toLocaleString('en-IN')}` : p.charges || '')
        };
      }
      return { policies: [], charges: [] };
    };

    const processVisaDetails = (arr) => {
      const visaData = { tourist: [], transit: [], business: [], photo: [] };
      if (arr?.length) {
        arr.forEach(item => {
          if (item.type === 'tourist' && item.description) visaData.tourist.push(item.description);
          else if (item.type === 'transit' && item.description) visaData.transit.push(item.description);
          else if (item.type === 'business' && item.description) visaData.business.push(item.description);
          else if (item.type === 'photo' && item.description) visaData.photo.push(item.description);
        });
      }
      return visaData;
    };

    const processVisaForms = (arr) =>
      arr?.length ? arr.map(form => ({
        visaType: form.visa_type,
        downloadAction: form.download_action,
        fillAction: form.fill_action,
        action1FileUrl: form.action1_file ? `${BASE_URL}/uploads/exhibition/visa/${form.action1_file}` : null,
        action2FileUrl: form.action2_file ? `${BASE_URL}/uploads/exhibition/visa/${form.action2_file}` : null,
        remarks: form.remarks
      })) : [];

    const processVisaFees = (arr) =>
      arr?.length ? arr.map(fee => ({
        tourist: fee.tourist || '',
        transit: fee.transit || '',
        business: fee.business || '',
        touristCharges: fee.tourist_charges ? `₹${parseFloat(fee.tourist_charges).toLocaleString('en-IN')}` : '',
        transitCharges: fee.transit_charges ? `₹${parseFloat(fee.transit_charges).toLocaleString('en-IN')}` : '',
        businessCharges: fee.business_charges ? `₹${parseFloat(fee.business_charges).toLocaleString('en-IN')}` : '',
        charges: fee.charges || ''
      })) : [];

    const processVisaSubmission = (arr) =>
      arr?.length ? arr.map(sub => ({
        label: sub.label,
        tourist: sub.tourist,
        transit: sub.transit,
        business: sub.business,
        rowOrder: sub.row_order
      })) : [];

    return {
      title: basicDetails.title || exhibition?.international_category_name || 'Exhibition Tour',
      duration: formatDuration(basicDetails.duration_days || 1),
      cityName: basicDetails.city_name || "City not available",
      overview: basicDetails.overview || "Tour overview not available",
      price: formatPrice(basicDetails.base_price_adult),
      emi: calculateEMI(basicDetails.base_price_adult),
      badge: getBadge(basicDetails.category_id || 1),
      code: basicDetails.tour_code || '',
      description: basicDetails.overview || '',
      images: processImages(imagesArray),
      itinerary: processItinerary(itineraries),
      departures: processDepartures(departures),
      inclusionExclusion: {
        inclusions: inclusions?.map(item => item.item) || [],
        exclusions: exclusions?.map(item => item.item) || []
      },
      hotels: processHotels(hotels),
      airlines: processTransport(transports),
      tourCost: processTourCost(costs),
      optionalTours: processOptionalTours(optionaltours),
      emiOptions: processEMIOptions(emioptions),
      booking: processBooking(bookingpoi),
      cancellation: processCancellation(cancellationpolicies),
      instructions: instructions?.map(item => item.item) || [],
      tourType: basicDetails.tour_type || 'exhibition',
      visaDetails: processVisaDetails(visa_details),
      visaForms: processVisaForms(visa_forms),
      visaFees: processVisaFees(visa_fees),
      visaSubmission: processVisaSubmission(visa_submission),
      optionalTourRemarks: basicDetails.optional_tour_remarks ? [basicDetails.optional_tour_remarks] : [],
      bookingRemarks: basicDetails.booking_poi_remarks ? [basicDetails.booking_poi_remarks] : [],
      cancellationRemarks: basicDetails.cancellation_remarks ? [basicDetails.cancellation_remarks] : [],
      emiRemarks: basicDetails.emi_remarks ? [basicDetails.emi_remarks] : []
    };
  };

  // ── API: Main tour details + images ───────────────────────────────────────
  const fetchTourDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const [detailsRes, imagesRes] = await Promise.all([
        fetch(`${BASE_URL}/api/exhibitions/international/${exhibitionId}/details`),
        fetch(`${BASE_URL}/api/exhibitions/exhibition-images/${exhibitionId}`)
      ]);

      if (!detailsRes.ok) throw new Error('Failed to fetch exhibition data');
      const detailsJson = await detailsRes.json();
      if (!detailsJson.success) throw new Error('Exhibition not found');

      let imagesArray = [];
      if (imagesRes.ok) imagesArray = await imagesRes.json();

      const processedData = processTourData(detailsJson.data, imagesArray);
      setTour(processedData);
      setTourType('Exhibition');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // ── API: Domestic sidebar list ─────────────────────────────────────────────
  const fetchDomesticData = async () => {
    setLoadingDomestic(true);
    try {
      const response = await fetch(`${BASE_URL}/api/exhibitions/domestic`);
      if (!response.ok) throw new Error(`Failed: ${response.status}`);
      const data: DomesticExhibition[] = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setDomesticList(data.map(item => item.domestic_category_name));
        setDomesticExhibitionData(data);
      } else {
        setDomesticList([]);
        setDomesticExhibitionData([]);
      }
    } catch (error) {
      console.error("Error fetching domestic:", error);
      setDomesticList([]);
      setDomesticExhibitionData([]);
    } finally {
      setLoadingDomestic(false);
    }
  };

  // ── API: International sidebar list ───────────────────────────────────────
  const fetchInternationalData = async () => {
    setLoadingInternational(true);
    try {
      const response = await fetch(`${BASE_URL}/api/exhibitions/international`);
      if (!response.ok) throw new Error(`Failed: ${response.status}`);
      const data: InternationalExhibition[] = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setInternationalList(data.map(item => item.international_category_name));
        setInternationalExhibitionData(data);
      } else {
        setInternationalList([]);
        setInternationalExhibitionData([]);
      }
    } catch (error) {
      console.error("Error fetching international:", error);
      setInternationalList([]);
      setInternationalExhibitionData([]);
    } finally {
      setLoadingInternational(false);
    }
  };

  // ── Email Handler ──────────────────────────────────────────────────────────
  const handleEmailSubmit = async (emailData: EmailFormData) => {
    try {
      setEmailLoading(true);
      const { pdf } = await import('@react-pdf/renderer');
      const pdfInstance = (
        <TourPdfDocumentinternational
          tour={tour || {}}
          tourType={tourType}
          isGroupTour={false}
          selectedCostMonth={selectedCostMonth}
          selectedCostDate={selectedCostDate}
          selectedDeparture={null}
          currentImageIndex={currentImageIndex}
          tourImages={tour?.images || []}
        />
      );
      const pdfBlob = await pdf(pdfInstance).toBlob();
      const formData = new FormData();
      formData.append('to', emailData.to);
      formData.append('subject', emailData.subject);
      formData.append('message', emailData.message);
      formData.append('tourTitle', tour?.title || '');
      formData.append('tourCode', tour?.code || '');
      formData.append('pdf', pdfBlob, `tour_${tour?.code || 'details'}.pdf`);

      const response = await fetch(`${BASE_URL}/api/send-tour-pdf`, { method: 'POST', body: formData });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || 'Failed to send email');
      setShowEmailModal(false);
      alert('Email sent successfully!');
    } catch (error: any) {
      alert(`Failed to send email: ${error.message || 'Unknown error'}`);
    } finally {
      setEmailLoading(false);
    }
  };

  // ── Effects ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (exhibitionId) fetchTourDetails();
  }, [exhibitionId]);

  useEffect(() => {
    fetchDomesticData();
    fetchInternationalData();
  }, []);

  useEffect(() => {
    resetAutoScroll();
    return () => { if (autoScrollInterval) clearInterval(autoScrollInterval); };
  }, [tour?.images]);

  // ── Loading State ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFEBEE]">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="text-2xl font-bold text-[#2E4D98]">Loading tour details...</div>
          <div className="mt-4 text-gray-600">Fetching data from the server</div>
        </div>
      </div>
    );
  }

  // ── Error State ────────────────────────────────────────────────────────────
  if (error || !tour) {
    return (
      <div className="min-h-screen bg-[#FFEBEE]">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="text-2xl font-bold text-red-600">Error loading tour</div>
          <div className="mt-4 text-gray-600">{error || 'Tour not found'}</div>
          <Button onClick={() => navigate('/exhibition')} className="mt-6 bg-[#2E4D98] hover:bg-[#2E4D98] hover:opacity-90 text-white">
            Back to Exhibitions
          </Button>
          <Button onClick={fetchTourDetails} className="mt-4 ml-4 bg-[#E53C42] hover:bg-[#E53C42] hover:opacity-90 text-white">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      <div className="min-h-screen bg-[#FFEBEE]">
        <Header />
        <div className="container mx-auto px-4 py-6">

          {/* Page layout: sidebar + main content */}
          <div className="flex gap-4">

    {/* ── LEFT SIDEBAR ── */}
<div className="w-80 flex-shrink-0 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl shadow-lg p-6 border border-blue-200 self-start sticky top-24">
  <div className="flex justify-between items-center mb-4 bg-white p-2 rounded-lg border border-black">
    <h2 className="text-2xl font-bold text-[#2E4D98]">Exhibition Tours</h2>
    <button
      onClick={clearAllFilters}
      className="text-sm text-[#E53C42] hover:underline"
    >
      Clear All
    </button>
  </div>

  {/* About Exhibition */}
  <div className="mt-3 mb-4">
    <div
      onClick={handleAboutClick}
      className="flex justify-between items-center p-2 rounded-lg cursor-pointer border border-black bg-white text-[#2E4D98]"
    >
      <h2 className="text-xl font-bold text-[#2E4D98]">About Exhibition</h2>
      <span className="text-xs">▶</span>
    </div>
  </div>

  {/* Price Filter */}
  <div className="mb-6">
    <h3 className="font-semibold text-lg mb-4 text-[#2E4D98]">Price Range</h3>
    <div className="flex justify-between text-sm text-gray-600 mb-3">
      <span>₹{priceRange[0].toLocaleString()}</span>
      <span>₹{priceRange[1].toLocaleString()}</span>
    </div>
    <Slider
      value={priceRange}
      onValueChange={setPriceRange}
      min={0}
      max={500000}
      step={1000}
      className="w-full"
    />
  </div>

  {/* Domestic Exhibition Section with Checkboxes */}
  <div className="mb-6">
    <div className="flex justify-between items-center mb-3 bg-white p-2 rounded-lg border border-black">
      <h2 className="text-xl font-bold text-[#2E4D98]">Domestic Exhibition</h2>
    </div>
    
    <div className={`${showMoreDomestic ? "max-h-64 overflow-y-auto pr-1" : ""} space-y-3`}>
      {loadingDomestic ? (
        <div className="flex justify-center py-4">
          <span className="animate-spin h-5 w-5 border-2 border-gray-300 border-t-blue-600 rounded-full" />
        </div>
      ) : domesticList.length > 0 ? (
        domesticList
          .slice(0, showMoreDomestic ? domesticList.length : 6)
          .sort((a, b) => a.localeCompare(b))
          .map((category) => (
            <div key={category} className="flex items-center gap-3 cursor-pointer">
              <Checkbox
                checked={selectedDomesticCategories.includes(category)}
                onCheckedChange={(checked) => handleDomesticCheckboxChange(category, checked as boolean)}
                className="data-[state=checked]:bg-[#2E4D98] data-[state=checked]:border-[#2E4D98]"
              />
              <span
                className={`text-gray-700 hover:text-[#2E4D98] cursor-pointer ${
                  selectedDomesticCategories.includes(category) ? 'font-bold text-[#2E4D98]' : ''
                }`}
                onClick={() => handleDomesticCheckboxChange(category, !selectedDomesticCategories.includes(category))}
              >
                {category}
              </span>
            </div>
          ))
      ) : (
        <div className="text-sm text-gray-400">No domestic exhibitions available</div>
      )}
    </div>
    
    {domesticList.length > 6 && (
      <button
        onClick={() => setShowMoreDomestic(!showMoreDomestic)}
        className="mt-4 text-[#2E4D98] text-sm font-semibold hover:underline"
      >
        {showMoreDomestic ? "Show Less" : "Show More"}
      </button>
    )}
  </div>

  {/* International Exhibition Section with Checkboxes */}
  <div>
    <div className="flex justify-between items-center mb-3 bg-white p-2 rounded-lg border border-black">
      <h2 className="text-xl font-bold text-[#2E4D98]">International Exhibition</h2>
    </div>
    
    <div className={`${showMoreInternational ? "max-h-64 overflow-y-auto pr-1" : ""} space-y-3`}>
      {loadingInternational ? (
        <div className="flex justify-center py-4">
          <span className="animate-spin h-5 w-5 border-2 border-gray-300 border-t-blue-600 rounded-full" />
        </div>
      ) : internationalList.length > 0 ? (
        internationalList
          .slice(0, showMoreInternational ? internationalList.length : 6)
          .sort((a, b) => a.localeCompare(b))
          .map((category) => {
            const found = internationalExhibitionData.find(
              item => item.international_category_name === category
            );
            const isActive = found?.id === Number(exhibitionId);
            return (
              <div key={category} className="flex items-center gap-3 cursor-pointer">
                <Checkbox
                  checked={selectedInternationalCategories.includes(category) || isActive}
                  onCheckedChange={(checked) => handleInternationalCheckboxChange(category, checked as boolean)}
                  className="data-[state=checked]:bg-[#2E4D98] data-[state=checked]:border-[#2E4D98]"
                />
                <span
                  className={`cursor-pointer ${
                    isActive ? 'font-bold text-[#2E4D98]' : 'text-gray-700 hover:text-[#2E4D98]'
                  }`}
                  onClick={() => handleInternationalCheckboxChange(category, !selectedInternationalCategories.includes(category) && !isActive)}
                >
                  {category}
                </span>
              </div>
            );
          })
      ) : (
        <div className="text-sm text-gray-400">No international exhibitions available</div>
      )}
    </div>
    
    {internationalList.length > 6 && (
      <button
        onClick={() => setShowMoreInternational(!showMoreInternational)}
        className="mt-4 text-[#2E4D98] text-sm font-semibold hover:underline"
      >
        {showMoreInternational ? "Show Less" : "Show More"}
      </button>
    )}
  </div>
</div>

            {/* ── MAIN CONTENT ── */}
            <main className="flex-1 min-w-0">

              {/* Title banners */}
                        <div className="bg-[#2E3A8A] text-white text-center py-3 font-semibold text-md mb-2">
                International Exhibition
              </div>
<div className="w-full overflow-hidden border-black border border-t-1 mb-2">
  <div className="flex w-full divide-x divide-white ">
    
    {/* City Label */}
    <div className="w-1/4 flex items-center justify-center p-3 bg-[#2E3A8A]">
      <span className="font-bold text-white">
        City:
      </span>
    </div>

    {/* City Value */}
    <div className="w-1/4 flex items-center justify-center p-3 bg-white">
      <span className="text-[#2E3A8A] font-bold">
        {tour.cityName || "City"}
      </span>
    </div>

    {/* Exhibition Label */}
    <div className="w-1/4 flex items-center justify-center p-3 bg-[#2E3A8A]">
      <span className="font-bold text-white">
        Exhibition:
      </span>
    </div>

    {/* Exhibition Value */}
    <div className="w-1/4 flex items-center justify-center p-3 bg-white">
      <span className="text-[#2E3A8A] font-bold">
        {tour.title || "Exhibition Name"}
      </span>
    </div>

  </div>
</div>

              {/* Hero image carousel */}
              <div className="relative rounded-2xl overflow-hidden mb-1">
                <div className="relative h-64 sm:h-80 lg:h-[500px] overflow-hidden">
                  <img
                    src={tour.images[currentImageIndex]}
                    alt={tour.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
                  />
                  {tour.images.length > 1 && (
                    <>
                      <button onClick={prevImage} className="absolute left-2 lg:left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 lg:p-2 rounded-full">
                        <ChevronLeft className="w-4 h-4 lg:w-6 lg:h-6" />
                      </button>
                      <button onClick={nextImage} className="absolute right-2 lg:right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 lg:p-2 rounded-full">
                        <ChevronRight className="w-4 h-4 lg:w-6 lg:h-6" />
                      </button>
                      <div className="absolute top-2 lg:top-4 right-2 lg:right-4 bg-black/50 text-white px-2 lg:px-3 py-0.5 lg:py-1 rounded-full text-xs lg:text-sm">
                        {currentImageIndex + 1} / {tour.images.length}
                      </div>
                    </>
                  )}
                </div>
                {tour.images.length > 1 && (
                  <div className="bg-gradient-to-r from-blue-100 to-blue-100 p-2 lg:p-4 border-t">
                    <div className="flex justify-center gap-1 lg:gap-2 overflow-x-auto pb-2">
                      {tour.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => goToImage(index)}
                          className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 lg:w-20 lg:h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                            index === currentImageIndex
                              ? 'border-[#2E4D98] ring-1 lg:ring-2 ring-[#2E4D98] ring-opacity-50 scale-105'
                              : 'border-transparent hover:border-gray-300'
                          }`}
                        >
                          <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Tour Info Table */}
              <div className="bg-white rounded-xl shadow-sm mb-1.5 overflow-hidden border border-black overflow-x-auto">
                <div className="min-w-[600px] lg:min-w-0">
                  <div className="grid grid-cols-8 bg-[#E8F0FF] border-b border-black">
                    <div className="border-r border-white bg-[#2E3a8a] px-2 lg:px-4 py-2 lg:py-3">
                      <h3 className="font-bold text-white text-start text-[10px] xs:text-xs lg:text-lg"> City</h3>
                    </div>
                    <div className="col-span-6 border-r border-white bg-[#2E3a8a] px-2 lg:px-4 py-2 lg:py-3">
                      <h3 className="font-bold text-white text-start text-sm lg:text-lg">Exhibition Name</h3>
                    </div>
                    <div className="px-2 lg:px-4 py-2 lg:py-3 bg-[#2E3a8a]">
                      <h3 className="font-bold text-white text-start text-sm lg:text-lg">Days</h3>
                    </div>
                  </div>
                  <div className="grid grid-cols-8 border-black">
                    <div className="border-r border-black px-1 lg:px-4 py-2 lg:py-3 bg-blue-50">
                      <p className="text-sm lg:text-lg font-bold text-[#2E4D98] text-center tracking-wide">
                        {tour.cityName || "City not available"} 
                      </p>
                    </div>
                    <div className="col-span-6 border-r border-black px-2 lg:px-4 py-2 lg:py-3 bg-gray-50">
                      <p className="text-sm lg:text-lg font-semibold text-gray-900 text-start break-words">{tour.title}</p>
                    </div>
                    <div className="px-2 lg:px-4 py-2 lg:py-3 bg-red-50">
                      <p className="text-sm lg:text-lg font-bold text-[#E53C42] text-center">{tour.duration}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-8 bg-white border-t border-black">
                    {["Itinerary", "Dep Date", "Tour Cost", "Cost inc./Cost ex.", "Flights & Hotels", "Visa", "Book p./Canc p.", "Instructions"].map((label, idx) => (
                      <button
                        key={label}
                        onClick={() => setActiveTab(label.toLowerCase().replace(/\s+/g, '-'))}
                        className={`px-1 lg:px-3 py-2 lg:py-4 text-[10px] xs:text-xs sm:text-sm font-semibold text-center whitespace-nowrap ${idx < 7 ? "border-r border-black" : ""} transition ${activeTab === label.toLowerCase().replace(/\s+/g, '-') ? "bg-[#A72703] text-white" : "bg-[#FFE797] text-gray-800"}`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

             {/* Tab Content */}
              <div className="bg-[#2E4D98] rounded-md shadow-sm p-2 lg:p-4">

                {/* Itinerary Tab */}
                {activeTab === "itinerary" && (
                  <div className="bg-[#C2E2FA] rounded-lg p-1 h-full">
                    <div className="mx-auto bg-white rounded-lg shadow-lg h-full flex flex-col min-h-0">
                      <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 rounded-t-lg flex-shrink-0">Tour Itinerary</div>
                          {/* ✅ NEW: Overview Section with same UI as departures */}
                          <div className="bg-[#E8F0FF] rounded-lg w-full overflow-x-hidden mt-1">
                            <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg w-full">
                              Tour Overview
                            </div>
                            <div className="border-2 border-[#1e3a8a] border-t-0 overflow-hidden rounded-b-lg w-full">
                              <div className="min-h-[150px] lg:min-h-[180px] max-h-[200px] lg:max-h-[250px] overflow-y-auto p-2 bg-[#FFEBEE] w-full">
                                <div className="space-y-4 w-full">
                                  <div className="border-gray-200 rounded-lg w-full">
                                    <div className="flex items-start w-full">
                                      <div className="flex-1 min-w-0">
                                        <p className="text-black break-words whitespace-pre-wrap text-justify w-full text-sm lg:text-base">
                                          {tour.overview || "No overview available for this tour."}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                      <div className="border-2 border-[#1e3a8a] border-t-0 overflow-hidden rounded-b-lg flex-1 min-h-0">
                        <div className="bg-[#FFEBEE] h-full overflow-hidden">
                          <div className="space-y-1 p-1 h-full overflow-y-auto">
                            {tour.itinerary.map((day, index) => (
                              <DayCard
                                key={index}
                                dayNumber={day.day}
                                headerColor={dayCardColors[index % dayCardColors.length]?.headerColor || "bg-[#A72703]"}
                                bodyColor={dayCardColors[index % dayCardColors.length]?.bodyColor || "bg-[#FFE797]"}
                                dayData={day}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Dep Date Tab */}
                {activeTab === "dep-date" && (
                  <div className="bg-[#E8F0FF] rounded-lg p-1 w-full">
                    <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg w-full">Departure Dates</div>
                    <div className="border-2 border-t-0 border-[#1e3a8a] rounded-b-lg w-full flex flex-col min-h-[200px] lg:min-h-[280px] max-h-[200px] lg:max-h-[280px] overflow-hidden">
                      <div className="flex-1 overflow-y-auto p-2 bg-[#FFEBEE] w-full">
                        <div className="space-y-4 w-full">
                          {tour.departures.descriptions.map((description, index) => (
                            <div key={index} className="w-full">
                              <p className="text-black break-words whitespace-pre-wrap text-justify w-full text-sm lg:text-base">{description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tour Cost Tab */}
                {activeTab === "tour-cost" && (
                  <div className="bg-[#E8F0FF] rounded-lg p-1">
                    <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg mb-1.5">Tour Cost</div>
                    <div className="border rounded-b-lg overflow-hidden -mt-1.5">
                      <div className="overflow-x-auto border shadow-sm">
                        <table className="w-full border-collapse table-fixed min-w-[600px] lg:min-w-0">
                          <thead>
                            <tr className="bg-[#2E4D98]">
                              {["Passenger", "Standard Hotel", "Deluxe Hotel", "Executive Hotel", "Child With Bed", "Child No Bed"].map(h => (
                                <th key={h} className="border border-white px-2 lg:px-4 py-2 lg:py-3 text-center font-semibold text-white text-xs lg:text-base h-10 lg:h-12 w-1/6">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {tour.tourCost.tableData.length > 0 ? (
                              tour.tourCost.tableData.map((row, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-[#FFEBEE]' : 'bg-[#FFEBEE]/80'}>
                                  <td className="border-2 border-[#1e3a8a] px-2 lg:px-4 py-2 lg:py-3 text-center font-medium text-gray-700 text-xs lg:text-base">{row.passenger}</td>
                                  <td className="border-2 border-[#1e3a8a] px-2 lg:px-4 py-2 lg:py-3 text-center text-blue-800 font-semibold text-xs lg:text-base">{row.standard}</td>
                                  <td className="border-2 border-[#1e3a8a] px-2 lg:px-4 py-2 lg:py-3 text-center text-green-800 font-semibold text-xs lg:text-base">{row.deluxe}</td>
                                  <td className="border-2 border-[#1e3a8a] px-2 lg:px-4 py-2 lg:py-3 text-center text-[#A72703] font-semibold text-xs lg:text-base">{row.executive}</td>
                                  <td className="border-2 border-[#1e3a8a] px-2 lg:px-4 py-2 lg:py-3 text-center text-blue-600 font-medium text-xs lg:text-base">{row.childWithBed}</td>
                                  <td className="border-2 border-[#1e3a8a] px-2 lg:px-4 py-2 lg:py-3 text-center text-purple-600 font-medium text-xs lg:text-base">{row.childNoBed}</td>
                                </tr>
                              ))
                            ) : (
                              <tr className="bg-[#FFEBEE]">
                                <td colSpan={6} className="border-2 border-[#1e3a8a] px-2 lg:px-4 py-2 lg:py-3 text-center text-gray-500 text-sm lg:text-base">No cost information available</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>

                      {/* Tour Cost Remarks */}
                      <div className="bg-[#E8F0FF] rounded-lg w-full overflow-x-hidden mt-1">
                        <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg w-full">Tour Cost Remarks</div>
                        <div className="border-2 border-[#1e3a8a] border-t-0 overflow-hidden rounded-b-lg w-full">
                          <div className="min-h-[150px] max-h-[180px] overflow-y-auto p-2 bg-[#FFEBEE] w-full">
                            {tour.tourCost.remarks?.length > 0 ? (
                              tour.tourCost.remarks.map((remark, index) => (
                                <p key={index} className="text-black whitespace-pre-wrap break-words text-justify w-full text-sm lg:text-base">{remark}</p>
                              ))
                            ) : (
                              <div className="flex items-center justify-center h-full">
                                <span className="text-gray-500 italic text-sm">No tour cost remarks available</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Optional Tour + EMI */}
                      <div className="flex flex-col lg:flex-row gap-1 mt-1">
                        <div className="flex-1 min-w-0">
                          <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-xl rounded-t-lg py-2 lg:py-3 mb-1">Optional Tour</div>
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse min-w-[400px] lg:min-w-0">
                              <thead>
                                <tr className="bg-[#2E4D98]">
                                  <th className="border border-white px-2 lg:px-4 py-2 lg:py-3 text-left font-semibold text-white text-xs lg:text-sm w-[50%]">Tour Name</th>
                                  <th className="border border-white px-2 lg:px-4 py-2 lg:py-3 text-left font-semibold text-white text-xs lg:text-sm w-[25%]">Adult Price</th>
                                  <th className="border border-white px-2 lg:px-4 py-2 lg:py-3 text-left font-semibold text-white text-xs lg:text-sm w-[25%]">Child Price</th>
                                </tr>
                              </thead>
                              <tbody className="border-2 border-[#1e3a8a] border-t-0">
                                {(() => {
                                  const maxRows = Math.max(tour.optionalTours?.length || 0, tour.emiOptions?.options?.length || 0, 1);
                                  return Array.from({ length: maxRows }, (_, i) => {
                                    const optTour = tour.optionalTours?.[i];
                                    return (
                                      <tr key={i} className={i % 2 === 0 ? "bg-[#FFEBEE]" : "bg-[#FFEBEE]/80"}>
                                        <td className="border border-black px-2 lg:px-4 py-1 lg:py-2 text-black text-xs lg:text-sm">{optTour?.tourName || "N/A"}</td>
                                        <td className="border border-black px-2 lg:px-4 py-1 lg:py-2 text-black text-xs lg:text-sm">{optTour?.adultPrice || "N/A"}</td>
                                        <td className="border border-black px-2 lg:px-4 py-1 lg:py-2 text-black text-xs lg:text-sm">{optTour?.childPrice || "N/A"}</td>
                                      </tr>
                                    );
                                  });
                                })()}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-xl rounded-t-lg py-2 lg:py-3 mb-1">EMI Options</div>
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse min-w-[400px] lg:min-w-0">
                              <thead>
                                <tr className="bg-[#2E4D98]">
                                  <th className="border border-white px-2 lg:px-4 py-2 lg:py-3 text-center font-semibold text-white text-xs lg:text-sm w-[33.33%]">Loan Amount</th>
                                  <th className="border border-white px-2 lg:px-4 py-2 lg:py-3 text-center font-semibold text-white text-xs lg:text-sm w-[33.33%]">Months</th>
                                  <th className="border border-white px-2 lg:px-4 py-2 lg:py-3 text-center font-semibold text-white text-xs lg:text-sm w-[33.33%]">EMI</th>
                                </tr>
                              </thead>
                              <tbody className="border-2 border-[#1e3a8a] border-t-0">
                                {(() => {
                                  const maxRows = Math.max(tour.optionalTours?.length || 0, tour.emiOptions?.options?.length || 0, 1);
                                  return Array.from({ length: maxRows }, (_, i) => {
                                    const emi = tour.emiOptions?.options?.[i];
                                    return (
                                      <tr key={i} className={i % 2 === 0 ? "bg-[#FFEBEE]" : "bg-[#FFEBEE]/80"}>
                                        <td className="border border-black px-2 lg:px-4 py-1 lg:py-2 text-center text-black text-xs lg:text-sm">{emi?.loanAmount || "N/A"}</td>
                                        <td className="border border-black px-2 lg:px-4 py-1 lg:py-2 text-center text-black text-xs lg:text-sm">{emi?.months || "N/A"}</td>
                                        <td className="border border-black px-2 lg:px-4 py-1 lg:py-2 text-center text-black text-xs lg:text-sm">{emi?.emi || "N/A"}</td>
                                      </tr>
                                    );
                                  });
                                })()}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>

                      {/* Optional Tour Remarks + EMI Remarks */}
                      <div className="flex flex-col lg:flex-row gap-1 mt-1 w-full">
                        {[
                          { title: "Optional Tour Remarks", data: tour.optionalTourRemarks },
                          { title: "EMI Remarks", data: tour.emiRemarks }
                        ].map(({ title, data }) => (
                          <div key={title} className="bg-[#E8F0FF] rounded-lg w-full lg:w-1/2 overflow-x-hidden">
                            <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg w-full">{title}</div>
                            <div className="border-2 border-[#1e3a8a] border-t-0 overflow-hidden rounded-b-lg w-full">
                              <div className="min-h-[150px] max-h-[180px] overflow-y-auto p-2 bg-[#FFEBEE] w-full">
                                {data?.length > 0 ? (
                                  data.map((remark, index) => (
                                    <p key={index} className="text-black whitespace-pre-wrap break-words text-justify w-full text-sm lg:text-base">{remark}</p>
                                  ))
                                ) : (
                                  <div className="flex items-center justify-center h-full">
                                    <span className="text-gray-500 italic text-sm">No {title.toLowerCase()} available</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Cost Inc/Ex Tab */}
                {activeTab === "cost-inc./cost-ex." && (
                  <div className="bg-[#E8F0FF] rounded-lg p-1 w-full overflow-x-hidden">
                    <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg mb-1 w-full">Cost Inclusive & Cost Excludes</div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 w-full">
                      {[
                        { label: "Cost Inclusive", items: tour.inclusionExclusion.inclusions },
                        { label: "Cost Excludes", items: tour.inclusionExclusion.exclusions }
                      ].map(({ label, items }) => (
                        <div key={label} className="flex flex-col w-full min-h-[250px] max-h-[320px]">
                          <div className="bg-[#2E4D98] text-white text-center py-2 lg:py-3 rounded-t-lg w-full">
                            <h3 className="text-lg lg:text-xl font-bold">{label}</h3>
                          </div>
                          <div className="flex-1 border-2 border-[#1e3a8a] rounded-b-lg bg-[#FFEBEE] w-full overflow-hidden min-h-0">
                            <div className="h-full overflow-y-auto p-2">
                              <ul className="space-y-2 w-full">
                                {items.map((item, index) => (
                                  <li key={index} className="text-black text-justify break-words ml-2 text-sm lg:text-base">{item}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Flights & Hotels Tab */}
                {activeTab === "flights-&-hotels" && (
                  <div className="bg-[#E8F0FF] rounded-lg p-0.5 w-full overflow-x-hidden">
                    <div className="bg-[#FFEBEE] rounded-lg p-1 mb-1 w-full">
                      <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg w-full">Flight Details</div>
                      <div className="border-2 border-[#1e3a8a] border-t-0 rounded-b-lg overflow-hidden w-full">
                        <div className="min-h-[250px] max-h-[400px] overflow-y-auto p-1 bg-[#FFEBEE] w-full">
                          {tour.airlines.tableData?.length > 0 ? (
                            <div className="space-y-3 w-full">
                              {tour.airlines.tableData.map((flight, index) => (
                                <div key={index} className="p-1 w-full">
                                  {flight.description && <p className="text-gray-600 p-1 lg:p-2 rounded text-sm lg:text-base">{flight.description}</p>}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="flex items-center justify-center min-h-[200px]">
                              <p className="text-gray-500 text-sm lg:text-lg">No information available</p>
                            </div>
                          )}
                        </div>
                      </div>
                      {tour.airlines.remarks?.length > 0 && (
                        <div className="bg-[#E8F0FF] rounded-lg mt-1 w-full">
                          <div className="bg-red-600 text-white text-center font-bold text-lg py-2 rounded-t-lg w-full">Flight Remarks</div>
                          <div className="border-2 border-t-0 border-[#1e3a8a] rounded-b-lg overflow-hidden w-full">
                            <div className="min-h-[120px] max-h-[200px] overflow-y-auto p-2 bg-[#FFEBEE] w-full">
                              {tour.airlines.remarks.map((remark, index) => (
                                <p key={index} className="text-black break-words whitespace-pre-wrap text-justify w-full text-sm lg:text-base">{remark}</p>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-1 w-full overflow-x-hidden">
                      <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-xl rounded-t-lg py-2 lg:py-3 mb-1 w-full">Hotel Details</div>
                      <div className="overflow-x-auto w-full">
                        {tour.hotels.tableData.length > 0 ? (
                          <table className="w-full border-collapse min-w-[600px] lg:min-w-max">
                            <thead>
                              <tr className="bg-[#2E4D98]">
                                {["City", "Standard", "Deluxe", "Executive", "Nights"].map(h => (
                                  <th key={h} className="border border-white px-2 lg:px-3 py-2 lg:py-3 text-left text-white text-xs lg:text-sm w-[20%]">{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="border-2 border-[#1e3a8a] border-t-0">
                              {tour.hotels.tableData.map((hotel, index) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-[#FFEBEE]" : "bg-[#FFEBEE]/80"}>
                                  <td className="border border-black px-2 py-1.5 break-all whitespace-pre-wrap text-black text-xs lg:text-sm min-w-[130px]">{hotel.city}</td>
                                  <td className="border border-black px-2 py-1.5 break-all whitespace-pre-wrap text-black text-xs lg:text-sm min-w-[130px]">{hotel.standard || "N/A"}</td>
                                  <td className="border border-black px-2 py-1.5 break-all whitespace-pre-wrap text-black text-xs lg:text-sm min-w-[130px]">{hotel.deluxe || "N/A"}</td>
                                  <td className="border border-black px-2 py-1.5 break-all whitespace-pre-wrap text-black text-xs lg:text-sm min-w-[130px]">{hotel.executive || "N/A"}</td>
                                  <td className="border border-black px-2 py-1.5 break-all whitespace-pre-wrap text-black text-xs lg:text-sm min-w-[70px]">{hotel.nights}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        ) : (
                          <div className="border-2 border-[#1e3a8a] p-4 bg-white rounded-lg">
                            <p className="text-gray-500 text-center text-sm">No hotel information available</p>
                          </div>
                        )}
                      </div>
                      {tour.hotels.remarks?.length > 0 && (
                        <div className="bg-[#E8F0FF] rounded-lg mt-1 w-full">
                          <div className="bg-red-600 text-white text-center font-bold text-lg py-2 rounded-t-lg w-full">Hotel Remarks</div>
                          <div className="border-2 border-t-0 border-[#1e3a8a] rounded-b-lg overflow-hidden w-full">
                            <div className="min-h-[120px] max-h-[200px] overflow-y-auto p-2 bg-[#FFEBEE] w-full">
                              {tour.hotels.remarks.map((remark, index) => (
                                <p key={index} className="text-black break-words whitespace-pre-wrap text-justify w-full text-sm lg:text-base">{remark}</p>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Visa Tab */}
                {activeTab === "visa" && (
                  <div className="bg-[#E8F0FF] rounded-lg p-1">
                    <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg mb-1">Documents Required for Visa</div>
                    <div className="flex bg-white border border-black rounded-t-lg overflow-hidden overflow-x-auto">
                      {["Tourist Visa", "Transit Visa", "Business Visa", "Visa Forms", "Photo", "Visa Fees", "Submission & Pick Up"].map((label, idx) => {
                        const tabMap = { "Tourist Visa": "tourist", "Transit Visa": "transit", "Business Visa": "business", "Visa Forms": "forms", "Photo": "photo", "Visa Fees": "fees", "Submission & Pick Up": "time" };
                        const tabKey = tabMap[label];
                        return (
                          <button key={label} onClick={() => setActiveVisaTab(tabKey)}
                            className={`px-2 py-2 lg:py-3 text-[10px] xs:text-xs lg:text-[15px] font-semibold text-center whitespace-nowrap border-r border-black last:border-r-0 transition flex-shrink-0 ${activeVisaTab === tabKey ? "bg-[#A72703] text-white" : "bg-[#FFE797] text-gray-800"}`}
                            style={{ flex: idx === 6 ? '1.3' : '1' }}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>

                    <div className="space-y-0">
                      {['tourist', 'transit', 'business'].includes(activeVisaTab) && (
                        <div className="border-2 border-t-0 border-[#1e3a8a] rounded-b-lg w-full flex flex-col min-h-[250px] max-h-[280px] overflow-hidden">
                          <div className="flex-1 overflow-y-auto p-2 bg-[#FFEBEE] w-full">
                            <div className="space-y-3 w-full">
                              {tour.visaDetails[activeVisaTab]?.length > 0 ? (
                                tour.visaDetails[activeVisaTab].map((description, index) => (
                                  <p key={index} className="text-black break-words whitespace-pre-wrap text-justify w-full text-sm lg:text-base">{description}</p>
                                ))
                              ) : (
                                <div className="flex items-center justify-center h-full">
                                  <p className="text-gray-500 text-sm">No {activeVisaTab} visa information available</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

               {activeVisaTab === 'forms' && (
  <div className="space-y-1 mt-1">
    <table className="w-full border-collapse min-w-[400px] border border-gray-300">
      <thead>
        <tr className="bg-[#2E4D98]">
          <th className="border border-white px-2 py-2 text-left text-white text-xs lg:text-sm w-[70%]">Visa Type</th>
          <th className="border border-white px-2 py-2 text-center text-white text-xs lg:text-sm w-[15%]">PDF</th>
          <th className="border border-white px-2 py-2 text-center text-white text-xs lg:text-sm w-[15%]">WORD</th>
        </tr>
      </thead>
      <tbody className="border-2 border-[#1e3a8a] border-t-0">
        {tour.visaForms?.length > 0 ? (
          tour.visaForms.map((form, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-[#FFEBEE]" : "bg-[#FFEBEE]/80"}>
              <td className="border border-black px-2 py-1 text-black text-xs lg:text-sm">
                {form.visaType || 'Visa Form'}
              </td>
              <td className="border border-black px-2 py-1 text-center">
                {form.action1FileUrl ? (
                  <a 
                    href={form.action1FileUrl} 
                    download 
                    className="block bg-red-600 text-white py-1 rounded text-xs lg:text-sm hover:bg-red-700 transition-colors"
                  >
                    {form.downloadAction || "Download PDF"}
                  </a>
                ) : (
                  <span className="block bg-gray-400 text-white py-1 rounded text-xs lg:text-sm cursor-not-allowed">
                    {form.downloadAction || "Not Available"}
                  </span>
                )}
              </td>
              <td className="border border-black px-2 py-1 text-center">
                {form.action2FileUrl ? (
                  <a 
                    href={form.action2FileUrl} 
                    download 
                    className="block bg-amber-800 text-white py-1 rounded text-xs lg:text-sm hover:bg-amber-900 transition-colors"
                  >
                    {form.fillAction || "Download Word"}
                  </a>
                ) : (
                  <span className="block bg-gray-400 text-white py-1 rounded text-xs lg:text-sm cursor-not-allowed">
                    {form.fillAction || "Not Available"}
                  </span>
                )}
              </td>
            </tr>
          ))
        ) : (
          // Fallback placeholder rows if no visa forms data
          <>
            <tr className="bg-[#FFEBEE]">
              <td className="border border-black px-2 py-1 text-xs lg:text-sm">Tourist Visa Form</td>
              <td className="border border-black px-2 py-1 text-center">
                <span className="block bg-gray-400 text-white py-1 rounded text-xs lg:text-sm">Not Available</span>
              </td>
              <td className="border border-black px-2 py-1 text-center">
                <span className="block bg-gray-400 text-white py-1 rounded text-xs lg:text-sm">Not Available</span>
              </td>
            </tr>
            <tr className="bg-[#FFEBEE]/80">
              <td className="border border-black px-2 py-1 text-xs lg:text-sm">Transit Visa Form</td>
              <td className="border border-black px-2 py-1 text-center">
                <span className="block bg-gray-400 text-white py-1 rounded text-xs lg:text-sm">Not Available</span>
              </td>
              <td className="border border-black px-2 py-1 text-center">
                <span className="block bg-gray-400 text-white py-1 rounded text-xs lg:text-sm">Not Available</span>
              </td>
            </tr>
            <tr className="bg-[#FFEBEE]">
              <td className="border border-black px-2 py-1 text-xs lg:text-sm">Business Visa Form</td>
              <td className="border border-black px-2 py-1 text-center">
                <span className="block bg-gray-400 text-white py-1 rounded text-xs lg:text-sm">Not Available</span>
              </td>
              <td className="border border-black px-2 py-1 text-center">
                <span className="block bg-gray-400 text-white py-1 rounded text-xs lg:text-sm">Not Available</span>
              </td>
            </tr>
          </>
        )}
      </tbody>
    </table>
  </div>
)}

                      {activeVisaTab === 'photo' && (
                        <table className="w-full border-collapse border border-gray-300 mt-1">
                          <thead>
                            <tr className="bg-[#2E4D98]">
                              <th className="border border-white px-2 py-2 text-center text-white text-sm" colSpan={1}>Photo Specification</th>
                            </tr>
                          </thead>
                          <tbody className="border-2 border-[#1e3a8a] border-t-0">
                            {tour.visaDetails.photo.length > 0 ? (
                              tour.visaDetails.photo.map((spec, index) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-[#FFEBEE]" : "bg-[#FFEBEE]/80"}>
                                  <td className="border border-black px-2 py-2 text-justify text-black text-sm">{spec}</td>
                                </tr>
                              ))
                            ) : (
                              <tr className="bg-[#FFEBEE]">
                                <td className="border border-black px-2 py-2 text-center text-sm">No photo specifications available</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      )}

                      {activeVisaTab === 'fees' && (
                        <div className="mt-1">
                          <div className="flex bg-white border border-black rounded-t-lg overflow-x-auto">
                            {["Tourist Visa fees", "Transit Visa fees", "Business Visa fees", "Visa fees & VFS & Other Charges"].map((label, idx) => {
                              const tabMap = { "Tourist Visa fees": "tourist", "Transit Visa fees": "transit", "Business Visa fees": "business", "Visa fees & VFS & Other Charges": "charges" };
                              const tabKey = tabMap[label];
                              const isActive = activeVisaFeeType === tabKey && tabKey !== 'charges';
                              return (
                                <button key={label} onClick={() => { if (tabKey !== 'charges') setActiveVisaFeeType(tabKey); }}
                                  className={`px-2 py-2 text-[10px] xs:text-xs font-semibold text-center whitespace-nowrap border-r border-black last:border-r-0 transition flex-shrink-0 ${isActive ? "bg-[#A72703] text-white" : "bg-[#FFE797] text-gray-800"} ${tabKey === 'charges' ? 'cursor-default' : 'cursor-pointer'}`}
                                  style={{ flex: idx === 3 ? '1.3' : '1' }}
                                >
                                  {label}
                                </button>
                              );
                            })}
                          </div>
                          <table className="w-full border-collapse border border-gray-300 border-t-0">
                            <tbody>
                              {tour.visaFees?.length > 0 ? (
                                tour.visaFees.map((fee, index) => (
                                  <tr key={index} className={index % 2 === 0 ? "bg-[#FFEBEE]" : "bg-[#FFEBEE]/80"}>
                                    <td className="border border-black px-2 py-2 text-black text-sm w-[70%]">
                                      {activeVisaFeeType === 'tourist' && (fee.tourist || 'N/A')}
                                      {activeVisaFeeType === 'transit' && (fee.transit || 'N/A')}
                                      {activeVisaFeeType === 'business' && (fee.business || 'N/A')}
                                    </td>
                                    <td className="border border-black px-2 py-2 text-black text-sm w-[30%]">
                                      {activeVisaFeeType === 'tourist' && (fee.touristCharges || 'N/A')}
                                      {activeVisaFeeType === 'transit' && (fee.transitCharges || 'N/A')}
                                      {activeVisaFeeType === 'business' && (fee.businessCharges || 'N/A')}
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr className="bg-[#FFEBEE]">
                                  <td className="border border-black px-2 py-2 text-center text-sm" colSpan={2}>No fee data available</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {activeVisaTab === 'time' && (
                        <div className="mt-1">
                          <div className="flex bg-white border border-black rounded-t-lg overflow-x-auto">
                            {["Tourist Visa", "Transit Visa", "Business Visa"].map((label) => {
                              const tabMap = { "Tourist Visa": "tourist", "Transit Visa": "transit", "Business Visa": "business" };
                              const tabKey = tabMap[label];
                              return (
                                <button key={label} onClick={() => setActiveVisaFeeType(tabKey)}
                                  className={`px-2 py-2 text-[10px] xs:text-xs font-semibold text-center whitespace-nowrap border-r border-black last:border-r-0 transition flex-1 ${activeVisaFeeType === tabKey ? "bg-[#A72703] text-white" : "bg-[#FFE797] text-gray-800"}`}
                                >
                                  {label}
                                </button>
                              );
                            })}
                          </div>
                          <table className="w-full border-collapse border border-gray-300 border-t-0">
                            <tbody>
                              {tour.visaSubmission?.length > 0 ? (
                                tour.visaSubmission.map((sub, index) => (
                                  <tr key={index} className={index % 2 === 0 ? "bg-[#FFEBEE]" : "bg-[#FFEBEE]/80"}>
                                    <td className="border border-black px-2 py-2 text-sm w-[60%]">{sub.label || 'N/A'}</td>
                                    <td className="border border-black px-2 py-2 text-center text-sm w-[40%]">
                                      {activeVisaFeeType === 'tourist' && (sub.tourist || 'N/A')}
                                      {activeVisaFeeType === 'transit' && (sub.transit || 'N/A')}
                                      {activeVisaFeeType === 'business' && (sub.business || 'N/A')}
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr className="bg-[#FFEBEE]">
                                  <td className="border border-black px-2 py-2 text-center text-sm" colSpan={2}>No submission information available</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {/* Visa Remarks */}
                      <div className="bg-[#E8F0FF] rounded-lg w-full overflow-x-hidden mt-1">
                        <div className="bg-red-600 text-white text-center font-bold text-lg py-2 rounded-t-lg w-full">Visa Remarks</div>
                        <div className="border-2 border-[#1e3a8a] border-t-0 overflow-hidden rounded-b-lg w-full">
                          <div className="min-h-[150px] max-h-[180px] overflow-y-auto p-2 bg-[#FFEBEE] w-full">
                            <div className="whitespace-pre-wrap break-words text-justify w-full text-black text-sm lg:text-base">
                              {tour.visaForms?.[0]?.remarks || "No remarks available"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Book p./Canc p. Tab */}
                {activeTab === "book-p./canc-p." && (
                  <div className="bg-[#E8F0FF] rounded-lg p-1">
                    <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg mb-1">Booking & Cancellation Policy</div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 mt-1">
                      {[
                        { label: "Booking Policy", amountLabel: "Amount", color: "bg-[#2E4D98]", textColor: "text-green-600", policies: tour.booking.items, charges: tour.booking.amountDetails },
                        { label: "Cancellation Policy", amountLabel: "Charge", color: "bg-[#A72703]", textColor: "text-[#A72703]", policies: tour.cancellation.policies, charges: tour.cancellation.charges }
                      ].map(({ label, amountLabel, color, textColor, policies, charges }) => (
                        <div key={label} className="flex flex-col h-[280px] lg:h-[320px]">
                          <div className={`flex border-2 border-[#1e3a8a] border-b-0 rounded-t-lg overflow-hidden`}>
                            <div className={`flex-1 ${color} text-white text-center py-2 lg:py-3`}><h3 className="text-lg lg:text-xl font-bold">{label}</h3></div>
                            <div className={`w-[42%] ${color} text-white text-center py-2 lg:py-3 border-l-2 border-[#1e3a8a]`}><h4 className="text-xs lg:text-lg font-bold">{amountLabel}</h4></div>
                          </div>
                          <div className="flex-1 border-2 border-[#1e3a8a] border-t-0 rounded-b-lg overflow-hidden">
                            <div className="overflow-y-auto h-full">
                              {policies.map((text, i) => (
                                <div key={i} className="border-b border-black flex">
                                  <div className="w-[58%] border-r-2 border-[#1e3a8a] p-2 lg:p-3"><span className="text-black text-xs lg:text-sm text-justify block">{text}</span></div>
                                  <div className="w-[42%] p-2 lg:p-3"><span className={`text-xs lg:text-sm font-bold ${textColor} block`}>{charges[i]}</span></div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 mt-1">
                      {[
                        { title: "Booking Policy Remarks", color: "bg-[#2E4D98]", data: tour.bookingRemarks },
                        { title: "Cancellation Policy Remarks", color: "bg-[#A72703]", data: tour.cancellationRemarks }
                      ].map(({ title, color, data }) => (
                        <div key={title} className="bg-[#E8F0FF] rounded-lg overflow-hidden">
                          <div className={`${color} text-white text-center font-bold text-lg py-2 rounded-t-lg`}>{title}</div>
                          <div className="border-2 border-[#1e3a8a] border-t-0 rounded-b-lg overflow-hidden">
                            <div className="min-h-[140px] max-h-[160px] overflow-y-auto p-1.5 bg-[#FFEBEE] rounded-b-lg">
                              {data?.length > 0 ? (
                                data.map((remark, index) => (
                                  <p key={index} className="text-black whitespace-pre-wrap break-words text-sm text-justify border-b border-black last:border-b-0 p-1">{remark}</p>
                                ))
                              ) : (
                                <div className="flex items-center justify-center h-full"><span className="text-gray-500 italic text-xs">No {title.toLowerCase()} available</span></div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Instructions Tab */}
                {activeTab === "instructions" && (
                  <div className="bg-[#E8F0FF] rounded-lg p-1">
                    <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg">Instructions</div>
                    <div className="border-2 border-[#1e3a8a] border-t-0 overflow-hidden rounded-b-lg">
                      <div className="min-h-[250px] max-h-[320px] overflow-y-auto p-2 bg-[#FFEBEE]">
                        <ul className="space-y-1 lg:space-y-2">
                          {tour.instructions.map((instruction, index) => (
                            <li key={index} className="text-justify whitespace-normal text-black text-sm lg:text-base">{instruction}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between lg:justify-end mt-1 gap-1 flex-nowrap">
                <div className="w-[32%] lg:w-32 border border-green-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <PDFDownloadLink
                    document={<TourPdfDocumentinternational tour={tour || {}} tourType={tourType} isGroupTour={false} selectedCostMonth={selectedCostMonth} selectedCostDate={selectedCostDate} selectedDeparture={null} currentImageIndex={currentImageIndex} tourImages={tour?.images || []} />}
                    fileName={`tour_${tour?.code || 'details'}_${new Date().toISOString().split('T')[0]}.pdf`}
                    className="w-full"
                  >
                    {({ loading: pdfLoading }) => (
                      <button className={`w-full ${pdfLoading ? 'bg-green-900' : 'bg-green-700 hover:bg-green-800'} text-white font-bold py-2 lg:py-3 px-2 flex items-center justify-center gap-1 transition-colors text-xs lg:text-sm`} disabled={pdfLoading}>
                        {pdfLoading ? (
                          <>
                            <svg className="animate-spin h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating...
                          </>
                        ) : (
                          <><Download className="h-3 w-3 lg:h-4 lg:w-4" />Download</>
                        )}
                      </button>
                    )}
                  </PDFDownloadLink>
                </div>

                <div className="w-[32%] lg:w-32 border border-blue-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <button onClick={() => setShowEmailModal(true)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 lg:py-3 px-2 flex items-center justify-center gap-1 transition-colors text-xs lg:text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 lg:h-4 lg:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email
                  </button>
                </div>

                <EmailModal isOpen={showEmailModal} onClose={() => setShowEmailModal(false)} onSubmit={handleEmailSubmit} tour={tour} />

                <div className="w-[32%] lg:w-32 border border-red-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 lg:py-3 px-2 flex items-center justify-center gap-1 transition-colors text-xs lg:text-sm" onClick={() => navigate('/checkout', { state: { tour } })}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 lg:h-4 lg:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Book Now
                  </button>
                </div>
              </div>

            </main>
          </div>{/* end flex layout */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Exhibitioninternationalindetail;