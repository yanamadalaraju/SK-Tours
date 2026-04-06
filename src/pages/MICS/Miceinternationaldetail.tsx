import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PDFDownloadLink } from '@react-pdf/renderer';
import TourPdfDocumentinternational from '../TourPdfDocumentinternational';
import { BASE_URL } from '@/ApiUrls';
import EmailModal from '../EmailModal';
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";

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
const Miceinternationaldetail = () => {
  const { tourId: miceId } = useParams();
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
  const [durationRange, setDurationRange] = useState([0, 10]);
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchBtn, setShowSearchBtn] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [showMoreDomestic, setShowMoreDomestic] = useState(false);
  const [showMoreInternational, setShowMoreInternational] = useState(false);
  const [selectedDomesticCategories, setSelectedDomesticCategories] = useState<string[]>([]);
  const [selectedInternationalCategories, setSelectedInternationalCategories] = useState<string[]>([]);
  const [selectedMonth, setSelectedMonth] = useState("ALL");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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

// Update this function in Miceinternationaldetail.tsx
const handleDomesticClick = (category: string) => {
  const found = domesticExhibitionData.find(
    (item) => item.domestic_category_name === category
  );
  if (found) {
    // Change this line - use the MICE domestic detail route instead
    navigate(`/micedomesticdetail/${found.id}`);
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

  const transformDeparturesToGroupFormat = (departures: any[]) => {
    if (!departures || departures.length === 0) return [];

    return departures.map((dep, index) => {
      if (!dep.start_date || dep.start_date === null) {
        return {
          id: dep.departure_id || index,
          month: "No Date Available",
          fromDay: "N/A",
          fromDate: "N/A",
          toDay: "N/A",
          toDate: "N/A",
          status: dep.status || 'Available',
          price: 0,
          threeStar: { twin: "NA", triple: "NA", childWithBed: "NA", childWithoutBed: "NA", infant: "NA", single: "NA" },
          fourStar: { twin: "NA", triple: "NA", childWithBed: "NA", childWithoutBed: "NA", infant: "NA", single: "NA" },
          fiveStar: { twin: "NA", triple: "NA", childWithBed: "NA", childWithoutBed: "NA", infant: "NA", single: "NA" }
        };
      }

      const startDate = new Date(dep.start_date);
      const endDate = dep.end_date ? new Date(dep.end_date) : startDate;

      if (isNaN(startDate.getTime())) {
        return {
          id: dep.departure_id || index,
          month: "Invalid Date",
          fromDay: "N/A",
          fromDate: "N/A",
          toDay: "N/A",
          toDate: "N/A",
          status: dep.status || 'Available',
          price: 0,
          threeStar: { twin: "NA", triple: "NA", childWithBed: "NA", childWithoutBed: "NA", infant: "NA", single: "NA" },
          fourStar: { twin: "NA", triple: "NA", childWithBed: "NA", childWithoutBed: "NA", infant: "NA", single: "NA" },
          fiveStar: { twin: "NA", triple: "NA", childWithBed: "NA", childWithoutBed: "NA", infant: "NA", single: "NA" }
        };
      }

      const month = startDate.toLocaleString('default', { month: 'short' }).toUpperCase();
      const year = startDate.getFullYear();
      const monthYear = `${month} ${year}`;

      const formatDate = (date: Date) => {
        if (isNaN(date.getTime())) return "N/A";
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
      };

      const getDayOfWeek = (date: Date) => {
        if (isNaN(date.getTime())) return "N/A";
        return date.toLocaleString('default', { weekday: 'long' });
      };

      const formatPriceValue = (value: string | null | undefined) => {
        if (!value || value === '0' || value === '0.00') return "NA";
        const numValue = parseFloat(value);
        if (isNaN(numValue)) return "NA";
        return formatPriceExhibition(numValue);
      };

      return {
        id: dep.departure_id || index,
        month: monthYear,
        fromDay: getDayOfWeek(startDate),
        fromDate: formatDate(startDate),
        toDay: getDayOfWeek(endDate),
        toDate: formatDate(endDate),
        status: dep.status || 'Available',
        price: dep.standard_twin ? parseFloat(dep.standard_twin) : 0,
        threeStar: {
          twin: formatPriceValue(dep.standard_twin),
          triple: formatPriceValue(dep.standard_triple),
          childWithBed: formatPriceValue(dep.child_with_bed),
          childWithoutBed: formatPriceValue(dep.child_without_bed),
          infant: "NA",
          single: formatPriceValue(dep.standard_single)
        },
        fourStar: {
          twin: formatPriceValue(dep.deluxe_twin),
          triple: formatPriceValue(dep.deluxe_triple),
          childWithBed: "NA",
          childWithoutBed: "NA",
          infant: "NA",
          single: formatPriceValue(dep.deluxe_single)
        },
        fiveStar: {
          twin: formatPriceValue(dep.luxury_twin),
          triple: formatPriceValue(dep.luxury_triple),
          childWithBed: "NA",
          childWithoutBed: "NA",
          infant: "NA",
          single: formatPriceValue(dep.luxury_single)
        }
      };
    });
  };

  useEffect(() => {
    if (!tour) return;
    const tourDuration = tour.duration ? parseInt(tour.duration.split('/')[1]) || 0 : 0;
    const isWithinDuration = tourDuration >= durationRange[0] && tourDuration <= durationRange[1];
  }, [durationRange, tour]);

  const formatPriceExhibition = (price: string | number) => {
    if (typeof price === 'number') {
      return `₹${price.toLocaleString('en-IN')}`;
    }
    if (typeof price === 'string' && price !== '0.00' && price !== '0' && price !== '') {
      const numPrice = parseFloat(price);
      if (!isNaN(numPrice)) {
        return `₹${numPrice.toLocaleString('en-IN')}`;
      }
    }
    return price || '₹0';
  };

const handleDomesticCheckboxChange = (category: string, checked: boolean) => {
  if (checked) {
    setSelectedDomesticCategories([category]);
    setSelectedInternationalCategories([]);
    const found = domesticExhibitionData.find(d => d.domestic_category_name === category);
    if (found) {
      // Change this line as well
      navigate(`/micedomesticdetail/${found.id}`);
    }
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
    setPriceRange([0, 200000]);
    setDurationRange([0, 10]);
    setSearchQuery("");
    setShowSearchBtn(false);
    setIsSearchActive(false);
    setSelectedDomesticCategories([]);
    setSelectedInternationalCategories([]);
    setSelectedMonth("ALL");
    setSelectedCostMonth("");
    setSelectedCostDate("");
    setOpenIndex(null);
    setActiveVisaTab('tourist');
    setActiveVisaFeeType('tourist');
  };

  // ── processTourData — updated for MICE API ────────────────────────────────
  const processTourData = (apiData) => {
    const {
      mice_city,
      tours,
      itineraries,
      departures,
      inclusions,
      exclusions,
      hotels,
      transports,
      bookingpoi,
      cancellationpolicies,
      instructions,
      optionaltours,
      emioptions,
      visa_details,
      visa_forms,
      visa_fees,
      visa_submission,
      structured_currency,
      tourist_visa_remarks,
      images   // ← pulled directly from apiData
    } = apiData;

    const basicDetails = tours?.[0] || {};

    const processImages = (imgs) => {
      console.log('🖼️ processImages called with:', imgs);
      if (imgs && imgs.length > 0) {
        // Sort so cover images come first
        const sorted = [...imgs].sort((a, b) => (b.is_cover - a.is_cover));
          const urls = sorted.map(img => img.url).filter(Boolean);
        console.log('🖼️ Processed image URLs:', urls);
        return urls;
      }
      console.warn('⚠️ No images found, using defaults');
      return getDefaultImages();
    };

    const transformedDepartures = transformDeparturesToGroupFormat(departures);
    const validDepartures = transformedDepartures.filter(dep =>
      dep.month !== "No Date Available" && dep.month !== "Invalid Date"
    );

    const processDepartures = () => ({
      type: 'Group',
      data: validDepartures,
      descriptions: departures?.map((dep: any) => dep.description || '') || []
    });

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

    // MICE API has no separate costs table — pricing comes from departures
    const processTourCost = () => {
      const remarks = basicDetails.cost_remarks &&
        basicDetails.cost_remarks !== "Departures Description" ?
        [basicDetails.cost_remarks] : [];
      return { tableData: [], remarks };
    };

    const processOptionalTours = (arr) =>
      arr?.length && arr[0]?.tour_name && arr[0]?.tour_name !== "Departures Description"
        ? arr.map(t => ({
          tourName: t.tour_name || '',
          adultPrice: formatPriceExhibition(t.adult_price),
          childPrice: formatPriceExhibition(t.child_price)
        }))
        : [];

    const processEMIOptions = (arr) => {
      if (arr?.length && arr[0]?.loan_amount && arr[0]?.loan_amount !== "0.00") {
        return {
          loanAmount: formatPriceExhibition(arr[0]?.loan_amount),
          options: arr.map(o => ({
            loanAmount: formatPriceExhibition(o.loan_amount || '0'),
            months: o.months || 0,
            emi: formatPriceExhibition(o.emi)
          }))
        };
      }
      return { loanAmount: "N/A", options: [] };
    };

    const processBooking = (arr) => {
      if (arr?.length && arr[0]?.item && arr[0]?.item !== "Departures Description") {
        return {
          items: arr.map(item => item.item || ''),
          amountDetails: arr.map(item => formatPriceExhibition(item.amount_details))
        };
      }
      return { items: ["Standard booking terms apply"], amountDetails: ["0"] };
    };

    const processHotels = (arr) => {
      if (arr?.length && arr[0]?.city && arr[0]?.city !== "Departures Description") {
        return {
          tableData: arr.map(hotel => ({
            city: hotel.city,
            nights: `${hotel.nights} Night${hotel.nights > 1 ? 's' : ''}`,
            standard: hotel.standard_hotel_name !== "Departures Description" ? hotel.standard_hotel_name : "N/A",
            deluxe: hotel.deluxe_hotel_name !== "Departures Description" ? hotel.deluxe_hotel_name : "N/A",
            executive: hotel.executive_hotel_name !== "Departures Description" ? hotel.executive_hotel_name : "N/A",
          })),
          remarks: basicDetails.hotel_remarks && basicDetails.hotel_remarks !== "Departures Description"
            ? [basicDetails.hotel_remarks] : []
        };
      }
      return { tableData: [], remarks: [] };
    };

    const processTransport = (arr) => {
      if (arr?.length && arr[0]?.description && arr[0]?.description !== "Departures Description") {
        return {
          tableData: arr.map(t => ({ description: t.description || '' })),
          remarks: basicDetails.transport_remarks && basicDetails.transport_remarks !== "Departures Description"
            ? [basicDetails.transport_remarks] : []
        };
      }
      return { tableData: [], remarks: [] };
    };

    const processCancellation = (arr) => {
      if (arr?.length && arr[0]?.cancellation_policy && arr[0]?.cancellation_policy !== "Departures Description") {
        return {
          policies: arr.map(p => p.cancellation_policy || ''),
          charges: arr.map(p => p.charges && !isNaN(p.charges) ? formatPriceExhibition(p.charges) : p.charges || '')
        };
      }
      return { policies: [], charges: [] };
    };

    const processVisaDetails = (arr) => {
      const visaData = { tourist: [], transit: [], business: [], photo: [] };
      if (arr?.length) {
        arr.forEach(item => {
          if (item.description && item.description !== "Departures Description") {
            if (item.type === 'tourist') visaData.tourist.push(item.description);
            else if (item.type === 'transit') visaData.transit.push(item.description);
            else if (item.type === 'business') visaData.business.push(item.description);
            else if (item.type === 'photo') visaData.photo.push(item.description);
          }
        });
      }
      return visaData;
    };

    const processVisaForms = (arr) =>
      arr?.length ? arr.map(form => ({
        visaType: form.visa_type,
        downloadAction: form.download_action,
        fillAction: form.fill_action,
        action1FileUrl: form.action1_file ? `${BASE_URL}/uploads/mice/visa/${form.action1_file}` : null,
        action2FileUrl: form.action2_file ? `${BASE_URL}/uploads/mice/visa/${form.action2_file}` : null,
        remarks: form.remarks && form.remarks !== "Departures Description" ? form.remarks : "No remarks available"
      })) : [];

    const processVisaFees = (arr) =>
      arr?.length ? arr.map(fee => ({
        tourist: fee.tourist && fee.tourist !== "Departures Description" ? fee.tourist : '',
        transit: fee.transit && fee.transit !== "Departures Description" ? fee.transit : '',
        business: fee.business && fee.business !== "Departures Description" ? fee.business : '',
        touristCharges: fee.tourist_charges ? formatPriceExhibition(fee.tourist_charges) : '',
        transitCharges: fee.transit_charges ? formatPriceExhibition(fee.transit_charges) : '',
        businessCharges: fee.business_charges ? formatPriceExhibition(fee.business_charges) : '',
        charges: fee.charges || ''
      })) : [];

    const processVisaSubmission = (arr) =>
      arr?.length ? arr.map(sub => ({
        label: sub.label && sub.label !== "Departures Description" ? sub.label : '',
        tourist: sub.tourist && sub.tourist !== "Departures Description" ? sub.tourist : '',
        transit: sub.transit && sub.transit !== "Departures Description" ? sub.transit : '',
        business: sub.business && sub.business !== "Departures Description" ? sub.business : '',
        rowOrder: sub.row_order
      })) : [];

    const processStructuredCurrency = (arr) => {
      if (arr && arr.length > 0) {
        return arr.map(item => ({
          local_currency: item.local_currency || '',
          currency_conversion_1: item.currency_conversion_1 || '',
          currency_conversion_2: item.currency_conversion_2 || '',
          city_name: item.city_name || '',
          india_time: item.india_time || '',
          local_time: item.local_time || ''
        }));
      }
      return [];
    };

    return {
      // City name: prefer mice_city, fallback to basicDetails
      title: basicDetails.title || mice_city?.city_name || 'MICE Tour',
      duration: formatDuration(basicDetails.duration_days || 1),
      cityName: basicDetails.city_name || mice_city?.city_name || "City not available",
      overview: basicDetails.overview || "Tour overview not available",
      price: formatPriceExhibition(basicDetails.base_price_adult),
      emi: calculateEMI(basicDetails.base_price_adult),
      badge: getBadge(basicDetails.category_id || 1),
      code: basicDetails.tour_code || '',
      description: basicDetails.overview || '',
      images: processImages(images),
      itinerary: processItinerary(itineraries),
      departures: processDepartures(),
      inclusionExclusion: {
        inclusions: inclusions?.map(item => item.item && item.item !== "Departures Description" ? item.item : '')?.filter(item => item) || [],
        exclusions: exclusions?.map(item => item.item && item.item !== "Departures Description" ? item.item : '')?.filter(item => item) || []
      },
      hotels: processHotels(hotels),
      airlines: processTransport(transports),
      tourCost: processTourCost(),       // no costs array in MICE API
      optionalTours: processOptionalTours(optionaltours),
      emiOptions: processEMIOptions(emioptions),
      booking: processBooking(bookingpoi),
      cancellation: processCancellation(cancellationpolicies),
      instructions: instructions?.map(item => item.item && item.item !== "Departures Description" ? item.item : '')?.filter(item => item) || [],
      tourType: basicDetails.tour_type || 'mice',
      visaDetails: processVisaDetails(visa_details),
      visaForms: processVisaForms(visa_forms),
      visaFees: processVisaFees(visa_fees),
      visaSubmission: processVisaSubmission(visa_submission),
      structured_currency: processStructuredCurrency(structured_currency),
      optionalTourRemarks: basicDetails.optional_tour_remarks && basicDetails.optional_tour_remarks !== "Departures Description"
        ? [basicDetails.optional_tour_remarks] : [],
      bookingRemarks: basicDetails.booking_poi_remarks && basicDetails.booking_poi_remarks !== "Departures Description"
        ? [basicDetails.booking_poi_remarks] : [],
      cancellationRemarks: basicDetails.cancellation_remarks ? [basicDetails.cancellation_remarks] : [],
      emiRemarks: basicDetails.emi_remarks ? [basicDetails.emi_remarks] : [],
      touristVisaRemarks: tourist_visa_remarks || "No remarks available",
    };
  };

  const departuresByMonth = React.useMemo(() => {
    if (!tour?.departures?.data) return {};
    const map = {};
    tour.departures.data.forEach(dep => {
      if (dep.month !== "No Date Available" && dep.month !== "Invalid Date") {
        if (!map[dep.month]) map[dep.month] = [];
        map[dep.month].push(dep);
      }
    });
    return map;
  }, [tour?.departures?.data]);

  const availableMonths = Object.keys(departuresByMonth);
  const filteredDepartureData = selectedMonth === "ALL"
    ? (tour?.departures?.data?.filter(d => d.month !== "No Date Available" && d.month !== "Invalid Date") || [])
    : (tour?.departures?.data?.filter(d => d.month === selectedMonth && d.month !== "No Date Available" && d.month !== "Invalid Date") || []);

  const availableDates = selectedCostMonth && departuresByMonth[selectedCostMonth]
    ? departuresByMonth[selectedCostMonth]
    : [];
  const selectedDeparture = availableDates.find(d => d.fromDate === selectedCostDate);

  const toggleTable = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const hasValidDepartures = () => {
    return tour?.departures?.data?.some(dep => dep.month !== "No Date Available" && dep.month !== "Invalid Date") || false;
  };

  // ── API: Main MICE details — UPDATED to use new endpoint ──────────────────
  const fetchTourDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${BASE_URL}/api/mice/international-details/${miceId}`);
      if (!res.ok) throw new Error('Failed to fetch MICE data');
      const json = await res.json();
      if (!json.success) throw new Error('MICE city not found');

      console.log('✅ MICE API response:', json.data);
      console.log('🖼️ Images from API:', json.data.images);

      // Pass the full data object; processTourData reads images from apiData.images directly
      const processedData = processTourData(json.data);
      setTour(processedData);
      setTourType('MICE');
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
    const response = await fetch(`${BASE_URL}/api/mice/domestic`);
    if (!response.ok) throw new Error(`Failed: ${response.status}`);
    const data = await response.json();
    
    // Transform the data to match expected structure
    if (Array.isArray(data) && data.length > 0) {
      const transformedData = data.map((item: any) => ({
        id: item.id,
        domestic_category_name: item.city_name, // Map city_name to domestic_category_name
        city_name: item.city_name,
        state_name: item.state_name,
        image: item.image,
        price: item.price
      }));
      
      setDomesticList(transformedData.map(item => item.domestic_category_name));
      setDomesticExhibitionData(transformedData);
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
    const response = await fetch(`${BASE_URL}/api/mice/international`);
    if (!response.ok) throw new Error(`Failed: ${response.status}`);
    const data = await response.json();
    
    // Transform the data to match expected structure
    if (Array.isArray(data) && data.length > 0) {
      const transformedData = data.map((item: any) => ({
        id: item.id,
        international_category_name: item.city_name, // Map city_name to international_category_name
        city_name: item.city_name,
        country_name: item.country_name,
        image: item.image,
        price: item.price
      }));
      
      setInternationalList(transformedData.map(item => item.international_category_name));
      setInternationalExhibitionData(transformedData);
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
    if (miceId) fetchTourDetails();
  }, [miceId]);

  useEffect(() => {
    fetchDomesticData();
    fetchInternationalData();
  }, []);

  useEffect(() => {
    resetAutoScroll();
    return () => { if (autoScrollInterval) clearInterval(autoScrollInterval); };
  }, [tour?.images]);

const handleSearch = (e: React.FormEvent) => {
  e.preventDefault();
  if (searchQuery.trim() === "") return;
  const query = searchQuery.trim().toLowerCase();
  const domesticMatch = domesticExhibitionData.find(item =>
    item.domestic_category_name.toLowerCase().includes(query)
  );
  if (domesticMatch) {
    // Change this line
    navigate(`/micedomesticdetail/${domesticMatch.id}`);
    return;
  }
  const internationalMatch = internationalExhibitionData.find(item =>
    item.international_category_name.toLowerCase().includes(query)
  );
  if (internationalMatch) {
    navigate(`/exhibitioninternationalindetail/${internationalMatch.id}`);
    return;
  }
  alert("No exhibition found for: " + searchQuery);
};

  // ── Loading State ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFEBEE]">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="text-2xl font-bold text-[#2E4D98]">Loading MICE details...</div>
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
          <div className="text-2xl font-bold text-red-600">Error loading MICE tour</div>
          <div className="mt-4 text-gray-600">{error || 'Tour not found'}</div>
          <Button onClick={() => navigate('/exhibition')} className="mt-6 bg-[#2E4D98] hover:bg-[#2E4D98] hover:opacity-90 text-white">
            Back to Mice
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
              <div className="flex justify-between items-center mb-4 bg-[#2E4D98] p-2 rounded-lg border border-black">
                <h2 className="text-2xl font-bold text-white">Mice</h2>
                <button onClick={clearAllFilters} className="text-sm text-white hover:underline">
                  Clear All
                </button>
              </div>

              {/* About Exhibition */}
              <div className="mt-3 mb-4">
                <div
                  onClick={handleAboutClick}
                  className="flex justify-between items-center p-2 rounded-lg cursor-pointer border border-black bg-white text-[#2E4D98]"
                >
                  <h2 className="text-xl font-bold text-[#2E4D98]">About Mice</h2>
                  <span className="text-xs">▶</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-4 text-[#2E4D98]">Exhibition Range</h3>
                <div className="flex justify-between text-sm text-gray-600 mb-3">
                  <span>{durationRange[0]} days</span>
                  <span>{durationRange[1]} days</span>
                </div>
                <Slider value={durationRange} onValueChange={setDurationRange} max={10} step={1} className="w-full" />
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-4 text-[#2E4D98]">Price Range</h3>
                <div className="flex justify-between text-sm text-gray-600 mb-3">
                  <span>₹{priceRange[0].toLocaleString()}</span>
                  <span>₹{priceRange[1].toLocaleString()}</span>
                </div>
                <Slider value={priceRange} onValueChange={setPriceRange} min={0} max={200000} step={1000} className="w-full" />
              </div>

              {/* Domestic Exhibition Section */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3 bg-white p-2 rounded-lg border border-black">
                  <h2 className="text-xl font-bold text-[#2E4D98]">Domestic Mice</h2>
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
                            className={`text-gray-700 hover:text-[#2E4D98] cursor-pointer ${selectedDomesticCategories.includes(category) ? 'font-bold text-[#2E4D98]' : ''}`}
                            onClick={() => handleDomesticCheckboxChange(category, !selectedDomesticCategories.includes(category))}
                          >
                            {category}
                          </span>
                        </div>
                      ))
                  ) : (
                    <div className="text-sm text-gray-400">No domestic Mice available</div>
                  )}
                </div>
                {domesticList.length > 6 && (
                  <button onClick={() => setShowMoreDomestic(!showMoreDomestic)} className="mt-4 text-[#2E4D98] text-sm font-semibold hover:underline">
                    {showMoreDomestic ? "Show Less" : "Show More"}
                  </button>
                )}
              </div>

              {/* International Exhibition Section */}
              <div>
                <div className="flex justify-between items-center mb-3 bg-white p-2 rounded-lg border border-black">
                  <h2 className="text-xl font-bold text-[#2E4D98]">International Mice</h2>
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
                        const isActive = found?.id === Number(miceId);
                        return (
                          <div key={category} className="flex items-center gap-3 cursor-pointer">
                            <Checkbox
                              checked={selectedInternationalCategories.includes(category) || isActive}
                              onCheckedChange={(checked) => handleInternationalCheckboxChange(category, checked as boolean)}
                              className="data-[state=checked]:bg-[#2E4D98] data-[state=checked]:border-[#2E4D98]"
                            />
                            <span
                              className={`cursor-pointer ${isActive ? 'font-bold text-[#2E4D98]' : 'text-gray-700 hover:text-[#2E4D98]'}`}
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
                  <button onClick={() => setShowMoreInternational(!showMoreInternational)} className="mt-4 text-[#2E4D98] text-sm font-semibold hover:underline">
                    {showMoreInternational ? "Show Less" : "Show More"}
                  </button>
                )}
              </div>
            </div>

            {/* ── MAIN CONTENT ── */}
            <main className="flex-1 min-w-0">

              {/* Title banner — updated to MICE */}
              <div className="bg-[#2E3A8A] text-white text-center py-3 font-semibold text-md mb-2">
                International MICE
              </div>

        <div className="w-full overflow-hidden border mb-2">
          <div className="flex w-full items-stretch gap-1">
            {/* City Label */}
            <div className="flex-1 flex items-center justify-center p-3 bg-[#2E3A8A] border border-black">
              <span className="font-bold text-white">City:</span>
            </div>
        
            {/* City Value */}
            <div className="flex-1 flex items-center justify-center p-3 bg-blue-100 border border-black">
              <span className="text-[#2E3A8A] font-bold">{tour.cityName || "City"}</span>
            </div>
        
            {/* Exhibition Label */}
            <div className="flex-1 flex items-center justify-center p-3 bg-[#2E3A8A] border border-black">
              <span className="font-bold text-white">Mice:</span>
            </div>
        
            {/* Exhibition Value */}
            <div className="flex-1 flex items-center justify-center p-3 bg-blue-100 border border-black">
              <span className="text-[#2E3A8A] font-bold text-sm text-center">{tour.title || "Exhibition Name"}</span>
            </div>
        
            {/* Search Column */}
            <div className="w-64 flex items-center bg-red-500 border border-black flex-shrink-0">
              <style>{`
                input::placeholder {
                  color: white !important;
                  opacity: 1;
                }
              `}</style>
              <form onSubmit={handleSearch} className="flex w-full h-full">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchActive(false);
                  }}
                  className="flex-1 px-2 py-2 text-md font-bold outline-none border-none min-w-0"
                  style={{
                    backgroundColor: "red",
                    color: "white"
                  }}
                />
                {searchQuery && (
                  <button
                    type="button"
                 
                    className="px-3 py-2 flex-shrink-0 hover:bg-red-600 transition-colors"
                    style={{
                      backgroundColor: "red",
                      color: "white"
                    }}
                  >
                    ✕
                  </button>
                )}
                <button
                  type="submit"
                  className="text-white px-3 py-2 flex-shrink-0 hover:bg-red-600 transition-colors"
                  style={{
                    backgroundColor: "red"
                  }}
                >
                  <FaSearch size={16} />
                </button>
              </form>
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
                          className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 lg:w-20 lg:h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${index === currentImageIndex
                            ? 'border-[#2E4D98] ring-1 lg:ring-2 ring-[#2E4D98] ring-opacity-50 scale-105'
                            : 'border-transparent hover:border-gray-300'}`}
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
                      <h3 className="font-bold text-white text-start text-[10px] xs:text-xs lg:text-lg">City</h3>
                    </div>
                    <div className="col-span-6 border-r border-white bg-[#2E3a8a] px-2 lg:px-4 py-2 lg:py-3">
                      <h3 className="font-bold text-white text-start text-sm lg:text-lg">Mice Name</h3>
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
                    <div className="col-span-6 border-r border-black px-2 lg:px-4 py-2 lg:py-3 bg-blue-50">
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
                      {/* Overview Section */}
                      <div className="bg-[#E8F0FF] rounded-lg w-full overflow-x-hidden mb-1">
                        <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg w-full">
                          Mice Overview
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
                      <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 rounded-t-lg flex-shrink-0">Tour Itinerary</div>
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
                    <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg w-full">
                      Departure Dates
                    </div>
                    <div className="border-2 border-t-0 border-[#1e3a8a] rounded-b-lg w-full flex flex-col min-h-[400px] lg:min-h-[680px] max-h-[400px] lg:max-h-[780px] overflow-hidden">
                      <div className="flex-1 overflow-y-auto p-2 bg-[#FFEBEE] w-full">
                        {hasValidDepartures() ? (
                          <>
                            <div className="flex flex-wrap gap-1 lg:gap-2 mb-2 overflow-x-auto pb-2">
                              {(() => {
                                const allTabs = ["ALL", ...availableMonths.sort((a, b) => {
                                  const monthOrder = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
                                  return monthOrder.indexOf(a.split(' ')[0]) - monthOrder.indexOf(b.split(' ')[0]);
                                })];
                                return (
                                  <div className="flex flex-wrap gap-1 lg:gap-2 mb-1">
                                    {allTabs.map((tab) => (
                                      <button
                                        key={tab}
                                        onClick={() => setSelectedMonth(tab)}
                                        className={`px-2 lg:px-3 py-1 lg:py-2 border-2 font-semibold text-center w-20 lg:w-32 text-xs lg:text-sm transition-all duration-200 flex-shrink-0 ${selectedMonth === tab
                                          ? "bg-blue-100 border-blue-600 text-blue-800 shadow-md"
                                          : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"}`}
                                      >
                                        {tab}
                                      </button>
                                    ))}
                                  </div>
                                );
                              })()}
                            </div>

                            {/* Table Header */}
                            <div className="border-2 border-[#2E3a8a] overflow-hidden mb-2">
                              <div className="grid grid-cols-5 bg-[#2E3a8a] text-white font-semibold text-center">
                                <div className="p-2 border-r-2 border-white text-xs lg:text-sm">From</div>
                                <div className="p-2 border-r-2 border-white text-xs lg:text-sm">To</div>
                                <div className="p-2 border-r-2 border-white text-xs lg:text-sm">Status</div>
                                <div className="p-2 border-r-2 border-white text-xs lg:text-sm">Price</div>
                                <div className="p-2 text-xs lg:text-sm">Action</div>
                              </div>
                            </div>

                            <div className="space-y-3 lg:space-y-4 w-full">
                              {filteredDepartureData.map((item, index) => (
                                <div key={item.id || index} className="w-full">
                                  <div className="border-2 border-black bg-white">
                                    <div className="grid grid-cols-5 items-center gap-0">
                                      <div className="p-2 border-r-2 border-black">
                                        <p className="font-semibold text-xs lg:text-base">{item.fromDate}</p>
                                        <p className="text-xs text-gray-500">{item.fromDay}</p>
                                      </div>
                                      <div className="p-2 border-r-2 border-black">
                                        <p className="font-semibold text-xs lg:text-base">{item.toDate}</p>
                                        <p className="text-xs text-gray-500">{item.toDay}</p>
                                      </div>
                                      <div className="p-2 border-r-2 border-black text-center">
                                        <span className={`font-semibold text-xs lg:text-base ${item.status === 'Sold Out' ? 'text-red-600' : item.status === 'Available' ? 'text-green-600' : 'text-blue-700'}`}>
                                          {item.status}
                                        </span>
                                      </div>
                                      <div className="p-2 border-r-2 border-black text-center">
                                        <span className="text-sm lg:text-lg font-bold text-gray-900">
                                          {formatPriceExhibition(item.price)}
                                        </span>
                                      </div>
                                      <div className="p-2 text-center">
                                        <button
                                          onClick={() => toggleTable(index)}
                                          disabled={item.status === 'Sold Out'}
                                          className={`px-2 lg:px-6 py-1 lg:py-2 transition-colors text-xs lg:text-sm w-full ${item.status === 'Sold Out' ? 'bg-gray-400 text-gray-200 cursor-not-allowed' : 'bg-[#2E3a8a] text-white hover:bg-[#2E3a8a]'} ${openIndex === index ? 'bg-[#2E3a8a]' : ''}`}
                                        >
                                          {item.status === 'Sold Out' ? 'Sold Out' : openIndex === index ? 'Hide Table' : 'Select'}
                                        </button>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Expanded Table */}
                                  {openIndex === index && item.status !== 'Sold Out' && (
                                    <div className="border-2 border-black border-t-0 overflow-hidden animate-fadeIn overflow-x-auto mt-1">
                                      <div className="min-w-[600px] lg:min-w-0">
                                        <div className="grid grid-cols-4 bg-[#2E3a8a] text-white font-semibold text-center">
                                          <div className="p-2 border-r-2 border-white text-xs lg:text-sm">Particulars - Tour Cost</div>
                                          <div className="p-2 border-r-2 border-white text-xs lg:text-sm">Standard</div>
                                          <div className="p-2 border-r-2 border-white text-xs lg:text-sm">Deluxe</div>
                                          <div className="p-2 text-xs lg:text-sm">Luxury</div>
                                        </div>
                                        {[
                                          { particular: "Per pax on Twin Basis", star3: item.threeStar?.twin || "NA", star4: item.fourStar?.twin || "NA", star5: item.fiveStar?.twin || "NA" },
                                          { particular: "Per pax on Triple Basis", star3: item.threeStar?.triple || "NA", star4: item.fourStar?.triple || "NA", star5: item.fiveStar?.triple || "NA" },
                                          { particular: "Per pax Single Occupancy", star3: item.threeStar?.single || "NA", star4: item.fourStar?.single || "NA", star5: item.fiveStar?.single || "NA" },
                                        ].map((row, i) => (
                                          <div key={i} className={`grid grid-cols-4 text-center border-b-2 border-black ${i % 2 === 0 ? "bg-[#EEF1F7]" : "bg-white"} ${i === 2 ? 'border-b-0' : ''}`}>
                                            <div className="p-2 border-r-2 border-black font-medium text-xs lg:text-sm text-left">{row.particular}</div>
                                            <div className="p-2 border-r-2 border-black text-xs lg:text-sm">{row.star3}</div>
                                            <div className="p-2 border-r-2 border-black font-semibold text-green-700 text-xs lg:text-sm">{row.star4}</div>
                                            <div className="p-2 text-xs lg:text-sm">{row.star5}</div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}

                              {filteredDepartureData.length === 0 && (
                                <div className="text-center py-4 lg:py-8 bg-white border border-gray-300 rounded-lg">
                                  <p className="text-gray-600 text-sm lg:text-lg mb-2">
                                    {selectedMonth === "ALL" ? "No departure dates available for this tour" : `No departure dates available for ${selectedMonth}`}
                                  </p>
                                  <p className="text-gray-500 text-xs lg:text-sm">Please check back later or contact us for more information</p>
                                </div>
                              )}
                            </div>
                          </>
                        ) : (
                          <div className="text-center py-8 lg:py-12 bg-white border border-gray-300 rounded-lg">
                            <p className="text-gray-600 text-sm lg:text-lg mb-2">No departure dates available for this tour</p>
                            <p className="text-gray-500 text-xs lg:text-sm">Please check back later or contact us for more information</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-1">
                      <button onClick={() => navigate("/alert")} className="w-full font-bold py-2 rounded-lg border bg-[#A72703] text-white border-black transition-opacity hover:opacity-90 text-sm lg:text-base">
                        Customize your tour on chargeable basis
                      </button>
                    </div>
                  </div>
                )}

                {/* Tour Cost Tab */}
                {activeTab === "tour-cost" && (
                  <div className="bg-[#E8F0FF] rounded-lg p-1">
                    <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg mb-1.5">
                      Tour Cost
                    </div>
                    <div className="mb-0">
                      <div className="p-3 lg:p-4 border-2 border-black border-t-0 rounded-b-lg">
                        {hasValidDepartures() ? (
                          <>
                            <div className="border-2 border-[#0A1D4A] overflow-hidden mb-4">
                              <div className="grid grid-cols-2 bg-[#2E3a8a] text-white font-semibold text-center">
                                <div className="p-2 border-r-2 border-white text-xs lg:text-sm">Month</div>
                                <div className="p-2 text-xs lg:text-sm">Date</div>
                              </div>
                              <div className="grid grid-cols-2 text-center">
                                <div className="p-2 border-r-2 border-black bg-[#EEF1F7]">
                                  <select
                                    className="w-full border-2 border-black rounded-md px-3 py-2 bg-white text-sm lg:text-base"
                                    value={selectedCostMonth}
                                    onChange={(e) => { setSelectedCostMonth(e.target.value); setSelectedCostDate(""); }}
                                  >
                                    <option value="">Select Month</option>
                                    {availableMonths.map(month => {
                                      const monthDepartures = departuresByMonth[month] || [];
                                      const allSoldOut = monthDepartures.length > 0 && monthDepartures.every(dep => dep.status === 'Sold Out');
                                      return (
                                        <option key={month} value={month} disabled={allSoldOut} style={allSoldOut ? { color: '#999', fontStyle: 'italic' } : {}}>
                                          {month} {allSoldOut ? '(Sold Out)' : ''}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </div>
                                <div className="p-2 bg-white">
                                  <select
                                    className="w-full border-2 border-black rounded-md px-3 py-2 bg-white text-sm lg:text-base"
                                    value={selectedCostDate}
                                    onChange={(e) => setSelectedCostDate(e.target.value)}
                                    disabled={!selectedCostMonth}
                                  >
                                    <option value="">Select Date</option>
                                    {availableDates.filter(dep => dep.status !== 'Sold Out').map(dep => (
                                      <option key={dep.id} value={dep.fromDate}>{dep.fromDate} – {dep.toDate}</option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>

                            {selectedDeparture ? (
                              <div className="border-2 border-black overflow-hidden animate-fadeIn overflow-x-auto">
                                <div className="min-w-[600px] lg:min-w-0">
                                  <div className="grid grid-cols-4 bg-[#2E3a8a] text-white font-semibold text-center">
                                    <div className="p-2 border-r-2 border-white text-xs lg:text-sm">Particulars - Tour Cost</div>
                                    <div className="p-2 border-r-2 border-white text-xs lg:text-sm">Standard</div>
                                    <div className="p-2 border-r-2 border-white text-xs lg:text-sm">Deluxe</div>
                                    <div className="p-2 text-xs lg:text-sm">Luxury</div>
                                  </div>
                                  {[
                                    { particular: "Per pax on Twin Basis", star3: selectedDeparture.threeStar?.twin || "NA", star4: selectedDeparture.fourStar?.twin || "NA", star5: selectedDeparture.fiveStar?.twin || "NA" },
                                    { particular: "Per pax on Triple Basis", star3: selectedDeparture.threeStar?.triple || "NA", star4: selectedDeparture.fourStar?.triple || "NA", star5: selectedDeparture.fiveStar?.triple || "NA" },
                                    { particular: "Per pax Single Occupancy", star3: selectedDeparture.threeStar?.single || "NA", star4: selectedDeparture.fourStar?.single || "NA", star5: selectedDeparture.fiveStar?.single || "NA" },
                                  ].map((row, i) => (
                                    <div key={i} className={`grid grid-cols-4 text-center border-b-2 border-black ${i % 2 === 0 ? "bg-[#EEF1F7]" : "bg-white"} ${i === 2 ? 'border-b-0' : ''}`}>
                                      <div className="p-2 border-r-2 border-black font-medium text-xs lg:text-sm text-left">{row.particular}</div>
                                      <div className="p-2 border-r-2 border-black text-xs lg:text-sm">{row.star3}</div>
                                      <div className="p-2 border-r-2 border-black font-semibold text-green-700 text-xs lg:text-sm">{row.star4}</div>
                                      <div className="p-2 text-xs lg:text-sm">{row.star5}</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <div className="text-center p-3 lg:p-4 border-2 border-dashed border-gray-300 rounded-lg">
                                <p className="text-gray-500 text-sm lg:text-base">Please select a month and date to view tour cost</p>
                                <p className="text-gray-400 text-xs lg:text-sm mt-2">Departure dates are available in the "Dep Date" tab</p>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="text-center p-6 lg:p-8 border-2 border-dashed border-gray-300 rounded-lg">
                            <p className="text-gray-500 text-sm lg:text-base">No departure dates available for this tour</p>
                            <p className="text-gray-400 text-xs lg:text-sm mt-2">Tour cost information will be available once departure dates are added</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Tour Cost Remarks */}
                    <div className="bg-[#E8F0FF] rounded-lg w-full overflow-x-hidden mt-1">
                      <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg w-full">Tour Cost Remarks</div>
                      <div className="border-2 border-[#1e3a8a] border-t-0 overflow-hidden rounded-b-lg w-full">
                        <div className="min-h-[150px] lg:min-h-[180px] max-h-[150px] lg:max-h-[180px] overflow-y-auto p-2 bg-[#FFEBEE] w-full">
                          {tour.tourCost.remarks && tour.tourCost.remarks.length > 0 ? (
                            <ul className="space-y-2 w-full">
                              {tour.tourCost.remarks.map((remark: string, index: number) => (
                                <li key={index} className="flex items-start gap-2 w-full">
                                  <span className="text-black whitespace-pre-wrap break-words hyphens-auto text-justify w-full text-sm lg:text-base">{remark}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <span className="text-gray-500 italic text-sm lg:text-base">No tour cost remarks available</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Optional Tour + EMI */}
                    <div className='mt-1'>
                      <div className="flex flex-col lg:flex-row gap-1">
                        <div className='flex-1 min-w-0 lg:w-1/2'>
                          <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-xl rounded-t-lg py-2 lg:py-3 mb-1">Optional Tour</div>
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse min-w-[400px] lg:min-w-0">
                              <thead>
                                <tr className="bg-[#2E4D98]">
                                  <th className="border border-white px-2 lg:px-4 py-2 lg:py-3 text-left font-semibold text-white text-xs lg:text-sm w-[40%] lg:w-[50%]">Tour Name</th>
                                  <th className="border border-white px-2 lg:px-4 py-2 lg:py-3 text-left font-semibold text-white text-xs lg:text-sm w-[30%] lg:w-[25%]">Adult Price</th>
                                  <th className="border border-white px-2 lg:px-4 py-2 lg:py-3 text-left font-semibold text-white text-xs lg:text-sm w-[30%] lg:w-[25%]">Child Price</th>
                                </tr>
                              </thead>
                              <tbody className="border-2 border-[#1e3a8a] border-t-0">
                                {tour.optionalTours && tour.optionalTours.length > 0 ? (
                                  tour.optionalTours.map((optTour: any, index: number) => (
                                    <tr key={index} className={index % 2 === 0 ? "bg-[#FFEBEE]" : "bg-[#FFEBEE]/80"}>
                                      <td className="border border-black px-2 lg:px-4 py-1 lg:py-2 text-black text-xs lg:text-sm">{optTour.tourName || "N/A"}</td>
                                      <td className="border border-black px-2 lg:px-4 py-1 lg:py-2 border-l-0 text-black text-xs lg:text-sm">{optTour.adultPrice || "N/A"}</td>
                                      <td className="border border-black px-2 lg:px-4 py-1 lg:py-2 border-l-0 text-black text-xs lg:text-sm">{optTour.childPrice || "N/A"}</td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr className="bg-[#FFEBEE]">
                                    <td colSpan={3} className="border border-black px-2 lg:px-4 py-2 lg:py-3 text-center text-gray-500 text-xs lg:text-sm">No optional tours available</td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div className='flex-1 min-w-0 lg:w-1/2'>
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
                                {tour.emiOptions && tour.emiOptions.options && tour.emiOptions.options.length > 0 ? (
                                  tour.emiOptions.options.map((emi: any, index: number) => (
                                    <tr key={index} className={index % 2 === 0 ? "bg-[#FFEBEE]" : "bg-[#FFEBEE]/80"}>
                                      <td className="border border-black px-2 lg:px-4 py-1 lg:py-2 border-l-0 text-center text-black text-xs lg:text-sm">{emi.loanAmount || "N/A"}</td>
                                      <td className="border border-black px-2 lg:px-4 py-1 lg:py-2 border-l-0 text-center text-black text-xs lg:text-sm">{emi.months || "N/A"}</td>
                                      <td className="border border-black px-2 lg:px-4 py-1 lg:py-2 border-l-0 text-center text-black text-xs lg:text-sm">{emi.emi || "N/A"}</td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr className="bg-[#FFEBEE]">
                                    <td colSpan={3} className="border border-black px-2 lg:px-4 py-2 lg:py-3 text-center text-gray-500 text-xs lg:text-sm">No EMI options available</td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
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
                            <div className="min-h-[150px] lg:min-h-[180px] max-h-[150px] lg:max-h-[180px] overflow-y-auto p-2 bg-[#FFEBEE] w-full">
                              {data && data.length > 0 ? (
                                <ul className="space-y-2 w-full">
                                  {data.map((remark: string, index: number) => (
                                    <li key={index} className="flex items-start gap-2 w-full">
                                      <span className="text-black whitespace-pre-wrap break-words hyphens-auto text-justify w-full text-sm lg:text-base">{remark}</span>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <div className="flex items-center justify-center h-full">
                                  <span className="text-gray-500 italic text-sm lg:text-base">No {title.toLowerCase()} available</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-1">
                      <button onClick={() => navigate("/alert")} className="w-full font-bold py-2 rounded-lg border bg-[#A72703] text-white border-black transition-opacity hover:opacity-90 text-sm lg:text-base">
                        Customize your tour on chargeable basis
                      </button>
                    </div>
                  </div>
                )}

                {/* Cost Inc/Ex Tab */}
                {activeTab === "cost-inc./cost-ex." && (
                  <div className="bg-[#E8F0FF] rounded-lg p-1 w-full overflow-x-hidden">
                    <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg mb-1 w-full">Cost Includes & Cost Excludes</div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 w-full">
                      {[
                        { label: "Cost Includes", items: tour.inclusionExclusion.inclusions },
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
                    <div className="bg-[#FFEBEE] rounded-lg p-1 mb-0 w-full">
                      <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2 rounded-t-lg w-full">Flight Details</div>
                      <div className="border-2 border-[#1e3a8a] border-t-0 rounded-b-lg overflow-hidden w-full">
                        <div className="min-h-[250px] max-h-[400px] overflow-y-auto p-1 bg-[#FFEBEE] w-full">
                          {tour.airlines.tableData?.length > 0 ? (
                            <div className="space-y-3 w-full">
                              {tour.airlines.tableData.map((flight, index) => (
                                <div key={index} className="p-0 w-full">
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
                      {["Tourist Visa", "Transit Visa", "Business Visa", "Visa Forms", "Currency", "Visa Fees", "Submission & Pick Up"].map((label, idx) => {
                        const tabMap = { "Tourist Visa": "tourist", "Transit Visa": "transit", "Business Visa": "business", "Visa Forms": "forms", "Currency": "currency", "Visa Fees": "fees", "Submission & Pick Up": "time" };
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
                        <div className="space-y-1 mt-1 mb-1">
                          <table className="w-full border-collapse min-w-[400px] border border-gray-300">
                            <thead>
                              <tr className="bg-[#2E4D98]">
                                <th className="border border-white px-2 py-3 text-left text-white text-xs lg:text-sm w-[70%]">Visa Type</th>
                                <th className="border border-white px-2 py-3 text-center text-white text-xs lg:text-sm w-[15%]">PDF</th>
                                <th className="border border-white px-2 py-3 text-center text-white text-xs lg:text-sm w-[15%]">WORD</th>
                              </tr>
                            </thead>
                            <tbody className="border-2 border-[#1e3a8a] border-t-0">
                              {tour.visaForms?.length > 0 ? (
                                tour.visaForms.map((form, index) => (
                                  <tr key={index} className={index % 2 === 0 ? "bg-[#FFEBEE]" : "bg-[#FFEBEE]/80"}>
                                    <td className="border border-black px-3 py-3 text-black text-xs lg:text-sm">{form.visaType || 'Visa Form'}</td>
                                    <td className="border border-black px-3 py-1 text-center">
                                      {form.action1FileUrl ? (
                                        <a href={form.action1FileUrl} download className="block bg-red-600 text-white py-2 rounded text-xs lg:text-sm hover:bg-red-700 transition-colors">{form.downloadAction || "Download PDF"}</a>
                                      ) : (
                                        <span className="block bg-gray-400 text-white py-2 rounded text-xs lg:text-sm cursor-not-allowed">{form.downloadAction || "Not Available"}</span>
                                      )}
                                    </td>
                                    <td className="border border-black px-3 py-1 text-center">
                                      {form.action2FileUrl ? (
                                        <a href={form.action2FileUrl} download className="block bg-amber-800 text-white py-2 rounded text-xs lg:text-sm hover:bg-amber-900 transition-colors">{form.fillAction || "Download Word"}</a>
                                      ) : (
                                        <span className="block bg-gray-400 text-white py-2 rounded text-xs lg:text-sm cursor-not-allowed">{form.fillAction || "Not Available"}</span>
                                      )}
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr className="bg-[#FFEBEE]">
                                  <td colSpan={3} className="border border-black px-2 py-3 text-center text-sm">No visa forms available</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {activeVisaTab === 'currency' && (
                        <table className="w-full border-collapse border border-gray-300 mt-1 mb-1">
                          <thead>
                            <tr className="bg-[#2E4D98]">
                              <th className="w-1/6 border border-white px-3 py-3 text-center text-white text-sm">Local Currency</th>
                              <th className="w-2/6 border border-white px-3 py-2 text-center text-white text-sm" colSpan={2}>Currency Conversion</th>
                              <th className="w-1/6 border border-white px-2 py-2 text-center text-white text-sm">City Name</th>
                              <th className="w-1/6 border border-white px-2 py-2 text-center text-white text-sm">India Time</th>
                              <th className="w-1/6 border border-white px-2 py-2 text-center text-white text-sm">Local Time</th>
                            </tr>
                          </thead>
                          <tbody className="border-2 border-[#1e3a8a] border-t-0">
                            {tour.structured_currency && tour.structured_currency.length > 0 ? (
                              tour.structured_currency.map((item, index) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-[#FFEBEE]" : "bg-[#FFEBEE]/80"}>
                                  <td className="border border-black px-2 py-3 text-center text-sm">{item.local_currency || '-'}</td>
                                  <td className="w-[16%] border border-black px-2 py-3 text-center text-sm">{item.currency_conversion_1 || '-'}</td>
                                  <td className="w-[16%] border border-black px-2 py-3 text-center text-sm">{item.currency_conversion_2 || '-'}</td>
                                  <td className="border border-black px-2 py-3 text-center text-sm">{item.city_name || '-'}</td>
                                  <td className="border border-black px-2 py-3 text-center text-sm">{item.india_time || '-'}</td>
                                  <td className="border border-black px-2 py-3 text-center text-sm">{item.local_time || '-'}</td>
                                </tr>
                              ))
                            ) : (
                              <tr className="bg-[#FFEBEE]">
                                <td colSpan={6} className="border border-black px-2 py-3 text-center text-sm">No currency data available</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      )}

                      {activeVisaTab === 'fees' && (
                        <div className="mt-1 mb-1">
                          <div className="flex bg-white border border-black rounded-t-lg overflow-x-auto">
                            {["Tourist Visa fees", "Transit Visa fees", "Business Visa fees", "Visa fees & VFS & Other Charges"].map((label, idx) => {
                              const tabMap = { "Tourist Visa fees": "tourist", "Transit Visa fees": "transit", "Business Visa fees": "business", "Visa fees & VFS & Other Charges": "charges" };
                              const tabKey = tabMap[label];
                              const isActive = activeVisaFeeType === tabKey && tabKey !== 'charges';
                              return (
                                <button key={label} onClick={() => { if (tabKey !== 'charges') setActiveVisaFeeType(tabKey); }}
                                  className={`px-3 py-3 text-[13px] xs:text-xs font-semibold text-center whitespace-nowrap border-r border-black last:border-r-0 transition flex-shrink-0 ${isActive ? "bg-[#A72703] text-white" : "bg-[#FFE797] text-gray-800"} ${tabKey === 'charges' ? 'cursor-default' : 'cursor-pointer'}`}
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
                                    <td className="border border-black px-2 py-3 text-black text-sm w-[70%]">
                                      {activeVisaFeeType === 'tourist' && (fee.tourist || 'N/A')}
                                      {activeVisaFeeType === 'transit' && (fee.transit || 'N/A')}
                                      {activeVisaFeeType === 'business' && (fee.business || 'N/A')}
                                    </td>
                                    <td className="border border-black px-2 py-3 text-black text-sm w-[30%]">
                                      {activeVisaFeeType === 'tourist' && (fee.touristCharges || 'N/A')}
                                      {activeVisaFeeType === 'transit' && (fee.transitCharges || 'N/A')}
                                      {activeVisaFeeType === 'business' && (fee.businessCharges || 'N/A')}
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr className="bg-[#FFEBEE]">
                                  <td colSpan={2} className="border border-black px-2 py-2 text-center text-sm">No fee data available</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {activeVisaTab === 'time' && (
                        <div className="mt-1 mb-1">
                          <div className="flex bg-white border border-black rounded-t-lg overflow-x-auto">
                            {["Tourist Visa", "Transit Visa", "Business Visa"].map((label) => {
                              const tabMap = { "Tourist Visa": "tourist", "Transit Visa": "transit", "Business Visa": "business" };
                              const tabKey = tabMap[label];
                              return (
                                <button key={label} onClick={() => setActiveVisaFeeType(tabKey)}
                                  className={`px-3 py-3 text-[13px] xs:text-xs font-semibold text-center whitespace-nowrap border-r border-black last:border-r-0 transition flex-1 ${activeVisaFeeType === tabKey ? "bg-[#A72703] text-white" : "bg-[#FFE797] text-gray-800"}`}
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
                                    <td className="border border-black px-2 py-3 text-sm w-[64%]">{sub.label || 'N/A'}</td>
                                    <td className="border border-black px-2 py-3 text-center text-sm w-[32%]">
                                      {activeVisaFeeType === 'tourist' && (sub.tourist || 'N/A')}
                                      {activeVisaFeeType === 'transit' && (sub.transit || 'N/A')}
                                      {activeVisaFeeType === 'business' && (sub.business || 'N/A')}
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr className="bg-[#FFEBEE]">
                                  <td colSpan={2} className="border border-black px-2 py-2 text-center text-sm">No submission information available</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>

                    {/* Visa Remarks */}
                    <div className="bg-[#E8F0FF] rounded-lg w-full overflow-x-hidden mt-1">
                      <div className="bg-red-600 text-white text-center font-bold text-lg py-2 rounded-t-lg w-full">Visa Remarks</div>
                      <div className="border-2 border-[#1e3a8a] border-t-0 overflow-hidden rounded-b-lg w-full">
                        <div className="min-h-[150px] max-h-[180px] overflow-y-auto p-2 bg-[#FFEBEE] w-full">
                          <div className="whitespace-pre-wrap break-words text-justify w-full text-black text-sm lg:text-base">
                            {tour.touristVisaRemarks || "No remarks available"}
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
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Miceinternationaldetail;