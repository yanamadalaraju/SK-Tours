import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ChevronRight, Check, X } from 'lucide-react';
import Header from '@/components/Header';
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import Footer from '@/components/Footer';
import { PDFDownloadLink } from '@react-pdf/renderer';
import TourPdfDocumentinternational from '../../TourPdfDocumentinternational';
import { Download } from 'lucide-react';
import { BASE_URL } from '@/ApiUrls';
import EmailModal from '../../EmailModal'; // Add this import



// Add this interface near the top
interface EmailFormData {
  from: string;
  to: string;
  subject: string;
  message: string;
}

const DayCard = ({ dayNumber, headerColor, bodyColor, dayData }) => {
  const [meals, setMeals] = useState({ B: false, L: false, D: false });

  React.useEffect(() => {
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
      {/* HEADER ROW - Full width scrollable container */}
      <div className="mb-1 w-full">
        <div className="relative">
          {/* Scrollable wrapper */}
          <div className="overflow-x-auto lg:overflow-visible">
            <div className="flex gap-1 w-max lg:w-full min-w-full lg:min-w-0">
              {/* Day Number */}
              <div className={`${headerColor} text-white font-bold px-3 lg:px-4 py-2 rounded-lg text-center w-[70px] lg:w-[100px] flex-shrink-0 border border-black`}>
                <span className="text-xs lg:text-sm">{dayNumber}</span>
              </div>

              {/* Day Title - Flexible width */}
              <div className={`${headerColor} text-white font-bold px-3 lg:px-4 py-2 rounded-lg border border-black flex-1 min-w-[180px] lg:min-w-0 flex items-center`}>
                <div className="truncate lg:whitespace-normal text-xs lg:text-base">
                  {dayData?.title || "Day Details"}
                </div>
              </div>

         {/* Meals Checkboxes */}
<div
  className={`
    ${headerColor} text-white border border-black rounded-lg
    px-1.5 lg:px-3 py-1.5
    flex items-center justify-center
    gap-1 lg:gap-3
    w-full max-w-[120px] lg:w-[130px]
    flex-shrink-0
  `}
>
  {/* Breakfast */}
  <div className="flex items-center gap-1">
    <div className="h-4 w-4 border border-gray-400 bg-white flex items-center justify-center">
      {meals.B ? (
        <svg
          className="h-3 w-3 text-blue-700"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg
          className="h-3 w-3 text-red-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
      )}
    </div>
    <span className="text-white text-xs lg:text-sm font-bold">B</span>
  </div>

  {/* Lunch */}
  <div className="flex items-center gap-1">
    <div className="h-4 w-4 border border-gray-400 bg-white flex items-center justify-center">
      {meals.L ? (
        <svg
          className="h-3 w-3 text-blue-700"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg
          className="h-3 w-3 text-red-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
      )}
    </div>
    <span className="text-white text-xs lg:text-sm font-bold">L</span>
  </div>

  {/* Dinner */}
  <div className="flex items-center gap-1">
    <div className="h-4 w-4 border border-gray-400 bg-white flex items-center justify-center">
      {meals.D ? (
        <svg
          className="h-3 w-3 text-blue-700"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg
          className="h-3 w-3 text-red-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
      )}
    </div>
    <span className="text-white text-xs lg:text-sm font-bold">D</span>
  </div>
</div>

            </div>
          </div>
        </div>
      </div>

      {/* DESCRIPTION - Fixed, no horizontal scroll */}
      <div className={`${bodyColor} rounded-lg border border-black overflow-hidden`}>
        <div className="p-2 text-black whitespace-pre-line text-justify h-[150px] overflow-y-auto">
          {dayData?.description || ""}
        </div>
      </div>
    </div>
  );
};

const International_Tourdetails = () => {
  const { tourId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("itinerary");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [showMoreIndian, setShowMoreIndian] = useState(false);
  const [showMoreWorld, setShowMoreWorld] = useState(false);
  const [durationRange, setDurationRange] = useState([5, 11]);
  const [priceRange, setPriceRange] = useState([32990, 153000]);
  const [selectedDepartureMonths, setSelectedDepartureMonths] = useState([]);
  const [activeVisaTab, setActiveVisaTab] = useState('tourist');
  const [selectedMonth, setSelectedMonth] = useState("ALL");
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedCostMonth, setSelectedCostMonth] = useState("");
  const [selectedCostDate, setSelectedCostDate] = useState("");
  const [activeVisaFeeType, setActiveVisaFeeType] = useState('tourist');
  const [selectedIndianTours, setSelectedIndianTours] = useState<string[]>([]);
  const [selectedWorldTours, setSelectedWorldTours] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState<string>("");
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tourType, setTourType] = useState('');
const [autoScrollInterval, setAutoScrollInterval] = useState(null);  
const [internationalDestinations, setInternationalDestinations] = useState<string[]>([]);
const [loadingDestinations, setLoadingDestinations] = useState(false);

  const fetchTourDetails = async () => {
    try {
      setLoading(true);

      // Define all possible tour type endpoints for international tours
      const tourEndpoints = [
        { type: 'Individual', url: `${BASE_URL}/api/tours/tour/full/individual/${tourId}` },
        { type: 'Group', url: `${BASE_URL}/api/tours/tour/full/group/${tourId}` },
        { type: 'Honeymoon', url: `${BASE_URL}/api/tours/tour/full/honeymoon/${tourId}` },
        { type: 'Ladies Special', url: `${BASE_URL}/api/tours/tour/full/ladiesspecial/${tourId}` },
        { type: 'Senior Citizen', url: `${BASE_URL}/api/tours/tour/full/seniorcitizen/${tourId}` },
        { type: 'Student', url: `${BASE_URL}/api/tours/tour/full/student/${tourId}` }
      ];

      let response = null;
      let data = null;
      let foundTourType = null;

      // Try each endpoint until we find the tour
      for (const endpoint of tourEndpoints) {
        try {
          response = await fetch(endpoint.url);

          if (response.ok) {
            data = await response.json();

            if (data.success) {
              foundTourType = endpoint.type;
              break;
            }
          }
        } catch (err) {
          console.log(`Failed to fetch from ${endpoint.type} endpoint:`, err);
        }
      }

      if (!data || !data.success) {
        throw new Error('Failed to fetch tour data from any endpoint');
      }

      // Process the data
      const processedData = processTourData(data);
      setTour(processedData);
      setTourType(foundTourType || 'Individual');

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching tour details:', err);
    } finally {
      setLoading(false);
    }
  };

  // Process tour data based on API response
  const processTourData = (apiData) => {
    const {
      basic_details,
      departures,
      images,
      inclusions,
      exclusions,
      itinerary,
      costs,
      hotels,
      transport,
      booking_poi,
      cancellation_policies,
      instructions,
      optional_tours,
      emi_options,
      visa_details,
      visa_forms,
      visa_fees,
      visa_submission
    } = apiData;

    // Format price
    const formatPrice = (price) => {
      if (!price) return '₹0';
      const numPrice = typeof price === 'string' ? parseFloat(price) : price;
      return `₹${numPrice.toLocaleString('en-IN')}`;
    };

    // Calculate EMI
    const calculateEMI = (price) => {
      if (!price) return 'EMI from ₹0/month';
      const numPrice = typeof price === 'string' ? parseFloat(price) : price;
      const emiAmount = Math.round(numPrice / 6);
      return `EMI from ₹${emiAmount.toLocaleString('en-IN')}/month`;
    };

    // Format duration
    const formatDuration = (days) => {
      const nights = days - 1;
      return `${nights}N/${days}D`;
    };

    // Get badge
    const getBadge = (categoryId) => {
      switch (categoryId) {
        case 1: return "New";
        case 2: return "Premium";
        case 3: return "Luxury";
        default: return "Special";
      }
    };

    // Get images
    const getImages = (imagesArray) => {
      if (imagesArray && imagesArray.length > 0) {
        const sortedImages = [...imagesArray].sort((a, b) => (b.is_cover - a.is_cover));
        return sortedImages.map(img => img.url);
      }
      return [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?w-800&q=80"
      ];
    };


    // Process departures
    const processDepartures = (departuresArray, tour_type) => {
      if (!departuresArray || departuresArray.length === 0) {
        return {
          type: tour_type,
          data: [],
          descriptions: ["No departure information available."]
        };
      }

      const isGroupType = ['Group', 'ladiesspecial', 'seniorcitizen', 'student'].includes(tour_type);

      if (isGroupType) {
        const departureItems = departuresArray.map((dep, index) => {
          const startDate = dep.start_date ? new Date(dep.start_date) : new Date();
          const endDate = dep.end_date ? new Date(dep.end_date) : new Date();

          const month = startDate.toLocaleString('default', { month: 'short' }).toUpperCase();
          const year = startDate.getFullYear();
          const monthYear = `${month} ${year}`;

          const formatDate = (date) => {
            const day = date.getDate();
            const month = date.toLocaleString('default', { month: 'short' });
            const year = date.getFullYear();
            return `${day} ${month} ${year}`;
          };

          const getDayOfWeek = (date) => {
            return date.toLocaleString('default', { weekday: 'long' });
          };

          return {
            id: dep.departure_id || index,
            month: monthYear,
            fromDay: getDayOfWeek(startDate),
            fromDate: formatDate(startDate),
            toDay: getDayOfWeek(endDate),
            toDate: formatDate(endDate),
            status: dep.status || 'Available',
            price: parseFloat(dep.adult_price) || 0,
            threeStar: {
              twin: dep.three_star_twin ? formatPrice(dep.three_star_twin) : "NA",
              triple: dep.three_star_triple ? formatPrice(dep.three_star_triple) : "NA",
              childWithBed: dep.three_star_child_with_bed ? formatPrice(dep.three_star_child_with_bed) : "NA",
              childWithoutBed: dep.three_star_child_without_bed ? formatPrice(dep.three_star_child_without_bed) : "NA",
              infant: dep.three_star_infant ? formatPrice(dep.three_star_infant) : "NA",
              single: dep.three_star_single ? formatPrice(dep.three_star_single) : "NA",
            },
            fourStar: {
              twin: dep.four_star_twin ? formatPrice(dep.four_star_twin) : "NA",
              triple: dep.four_star_triple ? formatPrice(dep.four_star_triple) : "NA",
              childWithBed: dep.four_star_child_with_bed ? formatPrice(dep.four_star_child_with_bed) : "NA",
              childWithoutBed: dep.four_star_child_without_bed ? formatPrice(dep.four_star_child_without_bed) : "NA",
              infant: dep.four_star_infant ? formatPrice(dep.four_star_infant) : "NA",
              single: dep.four_star_single ? formatPrice(dep.four_star_single) : "NA",
            },
            fiveStar: {
              twin: dep.five_star_twin ? formatPrice(dep.five_star_twin) : "NA",
              triple: dep.five_star_triple ? formatPrice(dep.five_star_triple) : "NA",
              childWithBed: dep.five_star_child_with_bed ? formatPrice(dep.five_star_child_with_bed) : "NA",
              childWithoutBed: dep.five_star_child_without_bed ? formatPrice(dep.five_star_child_without_bed) : "NA",
              infant: dep.five_star_infant ? formatPrice(dep.five_star_infant) : "NA",
              single: dep.five_star_single ? formatPrice(dep.five_star_single) : "NA",
            }
          };
        });

        return {
          type: 'Group',
          data: departureItems,
          descriptions: departureItems.map(dep => dep.description || '')
        };
      } else {
        const descriptions = [];
        departuresArray.forEach(dep => {
          if (dep.description && !descriptions.includes(dep.description)) {
            descriptions.push(dep.description);
          }
        });

        return {
          type: 'Individual',
          data: [],
          descriptions: descriptions.length > 0 ? descriptions : ["No description available."]
        };
      }
    };

    // Process itinerary
    const processItinerary = (itineraryArray) => {
      if (itineraryArray && itineraryArray.length > 0) {
        return itineraryArray.map((day, index) => ({
          day: `Day ${day.day || index + 1}`,
          title: day.title || `Day ${index + 1}`,
          description: day.description || '',
          meals: day.meals || ''
        }));
      }

      const defaultItinerary = [];
      const days = basic_details.duration_days || 6;
      for (let i = 0; i < days; i++) {
        defaultItinerary.push({
          day: `Day ${i + 1}`,
          title: i === 0 ? "Arrival & Check-in" :
            i === days - 1 ? "Departure" :
              `Day ${i + 1} Exploration`,
          description: i === 0 ? 'Arrive at destination, transfer to hotel, and check-in' :
            i === days - 1 ? 'Check-out from hotel and transfer to airport for departure' :
              'Full day of exploration and activities',
          meals: ''
        });
      }
      return defaultItinerary;
    };

    // Process tour cost
    const processTourCost = (costsArray, basicDetails) => {
      if (costsArray && costsArray.length > 0) {
        return {
          tableData: costsArray.map(cost => ({
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

      return {
        tableData: [],
        remarks: basicDetails.cost_remarks ? [basicDetails.cost_remarks] : []
      };
    };

const processOptionalTours = (optionalToursArray) => {
  if (optionalToursArray && optionalToursArray.length > 0) {
    return optionalToursArray.map(tour => ({
      tourName: tour.tour_name || '',
      adultPrice: tour.adult_price || '', 
      childPrice: tour.child_price || ''  
    }));
  }
  return [];
};
    // Process EMI options
    const processEMIOptions = (emiOptionsArray) => {
      if (emiOptionsArray && emiOptionsArray.length > 0) {
        return {
          loanAmount: "Variable",
          options: emiOptionsArray.map((option) => ({
            loanAmount: formatPrice(option.loan_amount || '0'),
            months: option.months || 0,
            emi: formatPrice(option.emi)
          }))
        };
      }
      return {
        loanAmount: "N/A",
        options: []
      };
    };

    // Process booking
    const processBooking = (bookingArray) => {
      if (bookingArray && bookingArray.length > 0) {
        return {
          items: bookingArray.map(item => item.item || ''),
          amountDetails: bookingArray.map(item => item.amount_details || '0')
        };
      }
      return {
        items: ["Standard booking terms apply"],
        amountDetails: ["0"]
      };
    };

    // Process hotels
    const processHotels = (hotelsArray, basicDetails) => {
      if (hotelsArray && hotelsArray.length > 0) {
        return {
          tableData: hotelsArray.map(hotel => ({
            city: hotel.city,
            nights: `${hotel.nights} Night${hotel.nights > 1 ? 's' : ''}`,
            standard: hotel.standard_hotel_name || "N/A",
            deluxe: hotel.deluxe_hotel_name || "N/A",
            executive: hotel.executive_hotel_name || "N/A",
          })),
          remarks: basicDetails.hotel_remarks ? [basicDetails.hotel_remarks] : []
        };
      }
      return {
        tableData: [],
        remarks: basicDetails.hotel_remarks ? [basicDetails.hotel_remarks] : []
      };
    };

    // Process transport
    const processTransport = (transportArray, basicDetails) => {
      if (transportArray && transportArray.length > 0) {
        return {
          tableData: transportArray.map(transport => ({
            airline: transport.airline || transport.carrier || '',
            flightNo: transport.flight_no || transport.number_code || '-',
            from: transport.from_city || '',
            to: transport.to_city || '',
            depDate: transport.from_date ? new Date(transport.from_date).toLocaleDateString() : '',
            depTime: transport.from_time || '',
            arrDate: transport.to_date ? new Date(transport.to_date).toLocaleDateString() : '',
            arrTime: transport.to_time || '',
            via: transport.via || '',
            description: transport.description || ''
          })),
          remarks: basicDetails.transport_remarks ? [basicDetails.transport_remarks] : []
        };
      }
      return {
        tableData: [],
        remarks: basicDetails.transport_remarks ? [basicDetails.transport_remarks] : []
      };
    };

    // Process cancellation policies
    const processCancellation = (policiesArray) => {
      if (policiesArray && policiesArray.length > 0) {
        return {
          policies: policiesArray.map(policy =>
            policy.cancellation_policy ||
            `${policy.days_min}-${policy.days_max} days before travel: ${policy.charge_percentage}% cancellation charge`
          ),
          charges: policiesArray.map(policy => {
            const charge = policy.charges || '';
            if (charge && !isNaN(charge)) {
              return `₹${parseFloat(charge).toLocaleString('en-IN')}`;
            }
            return charge || '';
          })
        };
      }
      return {
        policies: [],
        charges: []
      };
    };

    // Process visa details
    const processVisaDetails = (visaDetailsArray) => {
      const visaData = {
        tourist: [],
        transit: [],
        business: [],
        photo: []
      };

      if (visaDetailsArray && visaDetailsArray.length > 0) {
        visaDetailsArray.forEach(item => {
          if (item.type === 'tourist' && item.description) {
            visaData.tourist.push(item.description);
          } else if (item.type === 'transit' && item.description) {
            visaData.transit.push(item.description);
          } else if (item.type === 'business' && item.description) {
            visaData.business.push(item.description);
          } else if (item.type === 'photo' && item.description) {
            visaData.photo.push(item.description);
          }
        });
      }
      return visaData;
    };

    // Process visa forms
    const processVisaForms = (visaFormsArray) => {
      if (visaFormsArray && visaFormsArray.length > 0) {
        return visaFormsArray.map(form => ({
          visaType: form.visa_type,
          downloadText: form.download_text,
          downloadAction: form.download_action,
          fillAction: form.fill_action,
          action1FileUrl: form.action1_file_url,
          action2FileUrl: form.action2_file_url,
          remarks: form.remarks
        }));
      }
      return [];
    };

    // Process visa fees
    const processVisaFees = (visaFeesArray) => {
      if (visaFeesArray && visaFeesArray.length > 0) {
        return visaFeesArray.map(fee => ({
          tourist: fee.tourist || '',
          transit: fee.transit || '',
          business: fee.business || '',
          touristCharges: fee.tourist_charges ? `₹${parseFloat(fee.tourist_charges).toLocaleString('en-IN')}` : '',
          transitCharges: fee.transit_charges ? `₹${parseFloat(fee.transit_charges).toLocaleString('en-IN')}` : '',
          businessCharges: fee.business_charges ? `₹${parseFloat(fee.business_charges).toLocaleString('en-IN')}` : '',
          charges: fee.charges || ''
        }));
      }
      return [];
    };

    // Process visa submission
    const processVisaSubmission = (visaSubmissionArray) => {
      if (visaSubmissionArray && visaSubmissionArray.length > 0) {
        return visaSubmissionArray.map(sub => ({
          label: sub.label,
          tourist: sub.tourist,
          transit: sub.transit,
          business: sub.business,
          rowOrder: sub.row_order
        }));
      }
      return [];
    };

    // Process additional remarks
    const processAdditionalRemarks = (basicDetails) => {
      const remarks = [];
      if (basicDetails.emi_remarks) remarks.push(basicDetails.emi_remarks);
      if (basicDetails.booking_poi_remarks) remarks.push(basicDetails.booking_poi_remarks);
      if (basicDetails.cancellation_remarks) remarks.push(basicDetails.cancellation_remarks);
      if (basicDetails.optional_tour_remarks) remarks.push(basicDetails.optional_tour_remarks);
      return remarks;
    };

    return {
      // Basic info
      title: basic_details.title,
      duration: formatDuration(basic_details.duration_days),
      price: formatPrice(basic_details.base_price_adult),
      emi: calculateEMI(basic_details.base_price_adult),
      badge: getBadge(basic_details.category_id || 1),
      code: basic_details.tour_code,
      description: basic_details.overview,

      // Tab data
      images: getImages(images),
      itinerary: processItinerary(itinerary),
      departures: processDepartures(departures, basic_details.tour_type),
      inclusionExclusion: {
        inclusions: inclusions?.map(item => item.item) || [],
        exclusions: exclusions?.map(item => item.item) || []
      },
      hotels: processHotels(hotels, basic_details),
       airlines: processTransport(transport, basic_details), // ✅ This now includes transport_remarks
      tourCost: processTourCost(costs, basic_details),
      optionalTours: processOptionalTours(optional_tours),
      emiOptions: processEMIOptions(emi_options),
      booking: processBooking(booking_poi),
      cancellation: processCancellation(cancellation_policies),
      instructions: instructions?.map(item => item.item) || [],
      tourType: basic_details.tour_type || 'Individual',

      // Visa data
      visaDetails: processVisaDetails(visa_details),
      visaForms: processVisaForms(visa_forms),
      visaFees: processVisaFees(visa_fees),
      visaSubmission: processVisaSubmission(visa_submission),

      // Additional remarks
      optionalTourRemarks: basic_details.optional_tour_remarks ?
        [basic_details.optional_tour_remarks] : [],
      bookingRemarks: basic_details.booking_poi_remarks ? [basic_details.booking_poi_remarks] : [],
      cancellationRemarks: basic_details.cancellation_remarks ? [basic_details.cancellation_remarks] : [],
      emiRemarks: basic_details.emi_remarks ? [basic_details.emi_remarks] : [],
      additionalRemarks: processAdditionalRemarks(basic_details)
    };
  };

  // Fetch data on mount
  useEffect(() => {
    if (tourId) {
      fetchTourDetails();
    }
  }, [tourId]);


      useEffect(() => {
        const fetchInternationalDestinations = async () => {
          try {
            setLoadingDestinations(true);
            console.log("Fetching international destinations...");
    
            const destinationsRes = await fetch(`${BASE_URL}/api/destinations/international`);
    
            if (!destinationsRes.ok) {
              throw new Error(`Failed to fetch destinations: ${destinationsRes.status}`);
            }
    
            // Tell TS what the API returns
            const data: { name: string }[] = await destinationsRes.json();
            console.log("Fetched international destinations:", data);
    
            // Now TS knows dest.name is a string
            const destinationNames: string[] = data.map(dest => dest.name);
    
            const uniqueSortedDestinations: string[] = [...new Set(destinationNames)].sort(
              (a, b) => a.localeCompare(b)
            );
    
            setInternationalDestinations(uniqueSortedDestinations);
          } catch (err) {
            console.error("Error fetching international destinations:", err);
          } finally {
            setLoadingDestinations(false);
          }
        };
    
        fetchInternationalDestinations();
      }, []);
    
  // Helper functions
  const toggleTable = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return `₹${price.toLocaleString('en-IN')}`;
    }
    return price || '₹0';
  };

  const dayCardColors = [
    { dayNumber: "Day 01", headerColor: "bg-[#A72703]", bodyColor: "bg-[#FFE797]" },
    { dayNumber: "Day 02", headerColor: "bg-[#A72703]", bodyColor: "bg-[#FFE797]" },
    { dayNumber: "Day 03", headerColor: "bg-[#A72703]", bodyColor: "bg-[#FFE797]" }
  ];

const nextImage = () => {
  if (tour?.images) {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === tour.images.length - 1 ? 0 : prevIndex + 1
    );
  }
};

const prevImage = () => {
  if (tour?.images) {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? tour.images.length - 1 : prevIndex - 1
    );
  }
};

const goToImage = (index) => {
  setCurrentImageIndex(index);
};


const resetAutoScroll = () => {
  if (autoScrollInterval) {
    clearInterval(autoScrollInterval);
  }

  if (tour?.images && tour.images.length > 1) {
    const interval = setInterval(() => {
      nextImage();
    }, 5000); // 5 seconds

    setAutoScrollInterval(interval);
  }
};

useEffect(() => {
  resetAutoScroll(); 
  
  return () => {
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
    }
  };
}, [tour?.images]); 

  // Filter handlers
  const handleIndianTourChange = (tourName, checked) => {
    if (checked) {
      setSelectedIndianTours([...selectedIndianTours, tourName]);
    } else {
      setSelectedIndianTours(selectedIndianTours.filter(t => t !== tourName));
    }
  };

  const handleWorldTourChange = (tourName, checked) => {
    if (checked) {
      setSelectedWorldTours([...selectedWorldTours, tourName]);
    } else {
      setSelectedWorldTours(selectedWorldTours.filter(t => t !== tourName));
    }
  };

  const clearAllFilters = () => {
    setDurationRange([5, 11]);
    setPriceRange([32990, 153000]);
    setSelectedDepartureMonths([]);
    setSelectedIndianTours([]);
    setSelectedWorldTours([]);
    setSelectedMonth("ALL");
    setOpenIndex(null);
  };

  const handleEmailSubmit = async (emailData: EmailFormData) => {
  try {
    setEmailLoading(true);

    // Generate PDF
    const { pdf } = await import('@react-pdf/renderer');
    const TourPdfDocumentinternational = (await import('../.././../pages/TourPdfDocumentinternational')).default;

    const pdfInstance = (
      <TourPdfDocumentinternational
        tour={tour || {}}
        tourType={tourType}
        isGroupTour={isGroupTour}
        selectedCostMonth={selectedCostMonth}
        selectedCostDate={selectedCostDate}
        selectedDeparture={selectedDeparture}
        currentImageIndex={currentImageIndex}
        tourImages={tour?.images || []}
      />
    );

    const pdfBlob = await pdf(pdfInstance).toBlob();

    // Prepare FormData
    const formData = new FormData();
    formData.append('to', emailData.to);
    formData.append('subject', emailData.subject);
    formData.append('message', emailData.message);
    formData.append('tourTitle', tour?.title || '');
    formData.append('tourCode', tour?.code || '');
    formData.append('pdf', pdfBlob, `tour_${tour?.code || 'details'}.pdf`);

    // Send email
    const response = await fetch(`${BASE_URL}/api/send-tour-pdf`, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to send email');
    }

    // ✅ SUCCESS
    setShowEmailModal(false);
    alert('Email sent successfully!');

  } catch (error: any) {
    console.error('Error sending email:', error);
    alert(`Failed to send email: ${error.message || 'Unknown error'}`);
  } finally {
    setEmailLoading(false);
  }
};

  const handleDownloadPdf = () => {
    setIsGeneratingPdf(true);
    setTimeout(() => {
      setIsGeneratingPdf(false);
    }, 1000);
  };

  // Check if tour is a Group-like tour
  const isGroupTour = tour?.tourType && ['Group', 'ladiesspecial', 'seniorcitizen', 'student'].includes(tour.tourType);

  // Build Month → Departures map for Group tours
  const departuresByMonth = React.useMemo(() => {
    if (!isGroupTour || !tour?.departures?.data) return {};
    const map = {};
    tour.departures.data.forEach(dep => {
      if (!map[dep.month]) map[dep.month] = [];
      map[dep.month].push(dep);
    });
    return map;
  }, [isGroupTour, tour?.departures?.data]);

  const availableMonths = Object.keys(departuresByMonth);
  const filteredDepartureData = selectedMonth === "ALL"
    ? (tour?.departures?.data || [])
    : (tour?.departures?.data?.filter(d => d.month === selectedMonth) || []);

  // For Tour Cost Tab
  const availableDates = selectedCostMonth && departuresByMonth[selectedCostMonth]
    ? departuresByMonth[selectedCostMonth]
    : [];
  const selectedDeparture = availableDates.find(d => d.fromDate === selectedCostDate);

  // Loading state
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

  // Error state
  if (error || !tour) {
    return (
      <div className="min-h-screen bg-[#FFEBEE]">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="text-2xl font-bold text-red-600">Error loading tour</div>
          <div className="mt-4 text-gray-600">{error || 'Tour not found'}</div>
          <Button
            onClick={() => navigate('/tour-packages')}
            className="mt-6 bg-[#2E4D98] hover:bg-[#2E4D98] hover:opacity-90 text-white"
          >
            Back to Tours
          </Button>
          <Button
            onClick={fetchTourDetails}
            className="mt-4 ml-4 bg-[#E53C42] hover:bg-[#E53C42] hover:opacity-90 text-white"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

return (
  <>
    <div className="min-h-screen bg-[#FFEBEE]">
      <Header />

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar - Mobile responsive */}
          <aside className="lg:w-80 w-full order-1">
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl shadow-lg p-4 lg:p-6 border border-blue-200 lg:sticky lg:top-24">
              <div className="flex justify-between items-center mb-6 bg-white p-2 rounded-lg border border-black">
                <h2 className="text-lg lg:text-2xl font-bold text-[#2E4D98]">International Tours</h2>
                <button
                  onClick={clearAllFilters}
                  className="text-xs lg:text-sm text-[#E53C42] hover:underline"
                >
                  Clear All
                </button>
              </div>

              {/* Duration */}
              <div className="mb-8">
                <h3 className="font-semibold text-sm lg:text-lg mb-4 text-[#2E4D98]">Duration</h3>
                <div className="flex justify-between text-xs lg:text-sm text-gray-600 mb-3">
                  <span>{durationRange[0]} days</span>
                  <span>{durationRange[1]} days</span>
                </div>
                <Slider
                  value={durationRange}
                  onValueChange={setDurationRange}
                  max={15}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Price */}
              <div className="mb-8">
                <h3 className="font-semibold text-sm lg:text-lg mb-4 text-[#2E4D98]">Price</h3>
                <div className="flex justify-between text-xs lg:text-sm text-gray-600 mb-3">
                  <span>₹{priceRange[0].toLocaleString()}</span>
                  <span>₹{priceRange[1].toLocaleString()}</span>
                </div>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  min={10000}
                  max={200000}
                  step={1000}
                />
              </div>

              <div className="mb-8">
                <div className="flex justify-between items-center mb-6 bg-white p-2 rounded-lg border border-black">
                  <h2 className="text-lg lg:text-2xl font-bold text-[#2E4D98]">Indian Tours</h2>
                </div>
              
                <div className={`${showMoreIndian ? "max-h-80 overflow-y-auto pr-2" : ""} space-y-2.5`}>
                  {[
                    'Andaman', 'Goa', 'Himachal', 'Kashmir', 'Kerala', 'Rajasthan',
                    ...(showMoreIndian
                      ? [
                        'Andhra Pradesh',
                        'Bihar',
                        'Chhattisgarh',
                        'Dadra & Nagar Haveli',
                        'Daman & Diu',
                        'Delhi',
                        'Gujarat',
                        'Haryana',
                        'Jharkhand',
                        'Karnataka',
                        'Ladakh',
                        'Lakshadweep',
                        'Madhya Pradesh',
                        'Maharashtra',
                        'North East',
                        'Odisha',
                        'Puducherry',
                        'Punjab & Haryana',
                        'Seven Sisters',
                        'Tamil Nadu',
                        'Uttar Pradesh',
                        'Uttarakhand',
                        'West Bengal',
                      ]
                      : []),
                  ]
                    .sort((a, b) => a.localeCompare(b))
                    .map((place) => {
                      return (
                        <div
                          key={place}
                          className="flex items-center gap-3 cursor-pointer group px-1 py-0.5 rounded-md transition-colors hover:bg-blue-50"
                          onClick={() => {
                            clearAllFilters();
                            
                            let basePath = '/tours-packages'; 
                            
                            if (tourType === 'Group') {
                              basePath = '/tours_groups';
                            } else if (tourType === 'Ladies Special') {
                              basePath = '/ladies_tours';
                            } else if (tourType === 'Senior Citizen') {
                              basePath = '/senior_tours';
                            } else if (tourType === 'Student') {
                              basePath = '/students_tours';
                            } else if (tourType === 'Honeymoon') {
                              basePath = '/honeymoon_tours';
                            }
                            
                            navigate(`${basePath}/${encodeURIComponent(place)}`);
                          }}
                        >
                          <Checkbox
                            checked={selectedState === place}
                            onCheckedChange={() => {
                              setSelectedState(place);
                              clearAllFilters();
                              
                              let basePath = '/tours-packages'; 
                              
                              if (tourType === 'Group') {
                                basePath = '/tours_groups';
                              } else if (tourType === 'Ladies Special') {
                                basePath = '/ladies_tours';
                              } else if (tourType === 'Senior Citizen') {
                                basePath = '/senior_tours';
                              } else if (tourType === 'Student') {
                                basePath = '/students_tours';
                              } else if (tourType === 'Honeymoon') {
                                basePath = '/honeymoon_tours';
                              }
                              
                              navigate(`${basePath}/${encodeURIComponent(place)}`);
                            }}
                            className="data-[state=checked]:bg-[#2E4D98] data-[state=checked]:border-[#2E4D98] w-3 h-3 lg:w-4 lg:h-4"
                          />
              
                          <span
                            className={`text-sm lg:text-base text-gray-800 transition-colors group-hover:text-[#2E4D98] ${selectedState === place ? 'font-semibold text-[#2E4D98]' : ''
                              }`}
                          >
                            {place}
                          </span>
                        </div>
                      );
                    })}
                </div>
              
                <button
                  onClick={() => setShowMoreIndian(!showMoreIndian)}
                  className="mt-4 text-[#2E4D98] text-sm font-medium hover:underline flex items-center gap-1"
                >
                  {showMoreIndian ? 'Show Less' : 'Show More States'}
                </button>
              </div>

              <div>
                <div className="flex justify-between items-center mb-6 bg-white p-2 rounded-lg border border-black">
                  <h2 className="text-lg lg:text-2xl font-bold text-[#2E4D98]">International Tours</h2>
                </div>

                {loadingDestinations ? (
                  <div className="text-center py-4">
                    <p className="text-gray-500 text-sm lg:text-base">Loading international destinations...</p>
                  </div>
                ) : internationalDestinations.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-gray-500 text-sm lg:text-base">No international destinations found</p>
                  </div>
                ) : (
                  <>
                    <div className={`${showMoreWorld ? "max-h-40 overflow-y-auto pr-1" : ""} space-y-3`}>
                      {internationalDestinations
                        .slice(0, showMoreWorld ? internationalDestinations.length : 6)
                        .map((place) => {
                          const isSelected = selectedWorldTours.includes(place);

                          return (
                            <div
                              key={place}
                              className="flex items-center gap-3 cursor-pointer"
                              onClick={() => {
                                if (!selectedWorldTours.includes(place)) {
                                  setSelectedWorldTours([...selectedWorldTours, place]);
                                }
                                
                                let basePath = '/intl-tours-packages';
                                
                                const currentTourType = tourType as string;
                                
                                if (currentTourType === 'Group') {
                                  basePath = '/intl-tours_groups';
                                } else if (currentTourType === 'Ladies Special') {
                                  basePath = '/intl-ladies_tours';
                                } else if (currentTourType === 'Senior Citizen') {
                                  basePath = '/intl-senior_tours';
                                } else if (currentTourType === 'Student') {
                                  basePath = '/intl-students_tours';
                                } else if (currentTourType === 'Honeymoon') {
                                  basePath = '/intl-honeymoon_tours';
                                }
                                
                                const encodedDestination = encodeURIComponent(place);
                                navigate(`${basePath}/${encodedDestination}`);
                              }}
                            >
                              <Checkbox
                                checked={isSelected}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setSelectedWorldTours([...selectedWorldTours, place]);
                                    
                                    let basePath = '/intl-tours-packages';
                                    
                                    const currentTourType = tourType as string;
                                    
                                    if (currentTourType === 'Group') {
                                      basePath = '/intl-tours_groups';
                                    } else if (currentTourType === 'Ladies Special') {
                                      basePath = '/intl-ladies_tours';
                                    } else if (currentTourType === 'Senior Citizen') {
                                      basePath = '/intl-senior_tours';
                                    } else if (currentTourType === 'Student') {
                                      basePath = '/intl-students_tours';
                                    } else if (currentTourType === 'Honeymoon') {
                                      basePath = '/intl-honeymoon_tours';
                                    }
                                    
                                    const encodedDestination = encodeURIComponent(place);
                                    navigate(`${basePath}/${encodedDestination}`);
                                  } else {
                                    setSelectedWorldTours(selectedWorldTours.filter(t => t !== place));
                                  }
                                }}
                                className="data-[state=checked]:bg-[#2E4D98] data-[state=checked]:border-[#2E4D98] w-3 h-3 lg:w-4 lg:h-4"
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                              />
                              <span
                                className={`${isSelected ? 'font-bold text-[#2E4D98]' : 'text-gray-700 hover:text-[#2E4D98]'} cursor-pointer flex-1 text-sm lg:text-base`}
                              >
                                {place}
                              </span>
                            </div>
                          );
                        })}
                    </div>

                    {internationalDestinations.length > 6 && (
                      <button
                        onClick={() => setShowMoreWorld(!showMoreWorld)}
                        className="mt-3 text-[#2E4D98] text-sm font-semibold hover:underline"
                      >
                        {showMoreWorld ? "Show Less" : "Show More"}
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </aside>

          <main className="flex-1 order-2 lg:order-2">
            {/* Hero Section - Mobile responsive */}
            <div className="relative rounded-2xl overflow-hidden mb-1">
              <div className="relative h-64 sm:h-80 lg:h-[500px] overflow-hidden">
                <img
                  src={tour.images[currentImageIndex]}
                  alt={tour.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
                />

                {/* Navigation Arrows */}
                {tour.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 lg:left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 lg:p-2 rounded-full transition-all duration-200"
                    >
                      <ChevronLeft className="w-4 h-4 lg:w-6 lg:h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 lg:right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 lg:p-2 rounded-full transition-all duration-200"
                    >
                      <ChevronRight className="w-4 h-4 lg:w-6 lg:h-6" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                {tour.images.length > 1 && (
                  <div className="absolute top-2 lg:top-4 right-2 lg:right-4 bg-black/50 text-white px-2 lg:px-3 py-0.5 lg:py-1 rounded-full text-xs lg:text-sm">
                    {currentImageIndex + 1} / {tour.images.length}
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery - Mobile responsive */}
              {tour.images.length > 1 && (
                <div className="bg-gradient-to-r from-blue-100 to-blue-100 p-2 lg:p-4 border-t">
                  <div className="flex justify-center gap-1 lg:gap-2 overflow-x-auto pb-2">
                    {tour.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 lg:w-20 lg:h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${index === currentImageIndex
                          ? 'border-[#2E4D98] ring-1 lg:ring-2 ring-[#2E4D98] ring-opacity-50 scale-105'
                          : 'border-transparent hover:border-gray-300'
                          }`}
                      >
                        <img
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Excel-like Table Layout - Mobile scrollable */}
            <div className="bg-white rounded-xl shadow-sm mb-1.5 overflow-hidden border border-black overflow-x-auto">
              <div className="min-w-[600px] lg:min-w-0">
                {/* ===== FIRST ROW: HEADERS ===== */}
                <div className="grid grid-cols-8 bg-[#E8F0FF] border-b border-black">
             <div className="border-r border-white bg-[#2E3a8a] px-2 lg:px-4 py-2 lg:py-3">
  <h3 className="font-bold text-white text-start text-[10px] xs:text-xs lg:text-lg">Tour Code</h3>
</div>

                  <div className="col-span-6 border-r border-white bg-[#2E3a8a] px-2 lg:px-4 py-2 lg:py-3">
                    <h3 className="font-bold text-white text-start text-sm lg:text-lg">Tour Name</h3>
                  </div>

                  <div className="px-2 lg:px-4 py-2 lg:py-3 bg-[#2E3a8a]">
                    <h3 className="font-bold text-white text-start text-sm lg:text-lg">Days</h3>
                  </div>
                </div>

                {/* ===== SECOND ROW: VALUES ===== */}
                <div className="grid grid-cols-8 border-black border-black">
                  <div className="border-r border-black px-1 lg:px-4 py-2 lg:py-3 bg-blue-50">
                    <p className="text-sm lg:text-lg font-bold text-[#2E4D98] text-center tracking-wide">
                      {tour.code}
                    </p>
                  </div>

                  <div className="col-span-6 border-r border-black px-2 lg:px-4 py-2 lg:py-3 bg-gray-50">
                    <p className="text-sm lg:text-lg font-semibold text-gray-900 text-start break-words">
                      {tour.title}
                    </p>
                  </div>

                  <div className="px-2 lg:px-4 py-2 lg:py-3 bg-red-50">
                    <p className="text-sm lg:text-lg font-bold text-[#E53C42] text-center">
                      {tour.duration}
                    </p>
                  </div>
                </div>

                {/* ===== THIRD ROW: TABS ===== */}
                <div className="grid grid-cols-8 bg-white border-t border-black">
                  {[
                    "Itinerary",
                    "Dep Date",
                    "Tour Cost",
                    "Cost inc./Cost ex.",
                    "Flights & Hotels",
                    "Visa",
                    "Book p./Canc p.",
                    "Instructions"
                  ].map((label, idx) => (
                    <button
                      key={label}
                      onClick={() => setActiveTab(label.toLowerCase().replace(/\s+/g, '-'))}
                      className={`px-1 lg:px-3 py-2 lg:py-4 text-[10px] xs:text-xs sm:text-sm font-semibold text-center whitespace-nowrap
                        ${idx < 7 ? "border-r border-black" : ""} transition 
                        ${activeTab === label.toLowerCase().replace(/\s+/g, '-')
                          ? "bg-[#A72703] text-white"
                          : "bg-[#FFE797] text-gray-800"
                        }
                      `}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-[#2E4D98] rounded-md shadow-sm p-2 lg:p-4">
              {/* Itinerary Tab - Mobile responsive */}
              {activeTab === "itinerary" && (
                <div className="bg-[#C2E2FA] rounded-lg p-1 h-full">
                  <div className="mx-auto bg-white rounded-lg shadow-lg h-full flex flex-col min-h-0">
                    <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 rounded-t-lg flex-shrink-0">
                      Tour Itinerary
                    </div>
                    <div className="border-2 border-[#1e3a8a] border-t-0 overflow-hidden rounded-b-lg flex-1 min-h-0">
                      <div className="bg-[#FFEBEE] h-full overflow-hidden">
                        <div className="space-y-1 p-1 h-full overflow-y-auto">
                          {tour.itinerary.map((day, index) => (
                            <DayCard
                              key={index}
                              dayNumber={day.day}
                              headerColor={dayCardColors[index]?.headerColor || "bg-[#A72703]"}
                              bodyColor={dayCardColors[index]?.bodyColor || "bg-[#FFE797]"}
                              dayData={day}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Dep Date Tab - Mobile responsive */}
              {activeTab === "dep-date" && (
                isGroupTour ? (
                  <div className="bg-[#E8F0FF] rounded-lg p-1 w-full">
                    <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg w-full">
                      Departure Dates
                    </div>

                    <div className="border-2 border-t-0 border-[#1e3a8a] rounded-b-lg w-full flex flex-col min-h-[400px] lg:min-h-[680px] max-h-[400px] lg:max-h-[780px] overflow-hidden">
                      <div className="flex-1 overflow-y-auto p-2 bg-[#FFEBEE] w-full">
                        <div className="flex flex-wrap gap-1 lg:gap-2 mb-2 overflow-x-auto pb-2">
                          {(() => {
                            const availableMonths = tour.departures.data
                              .map((dep) => dep.month)
                              .filter((month, index, self) =>
                                self.indexOf(month) === index
                              )
                              .sort((a, b) => {
                                const monthOrder = [
                                  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
                                  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
                                ];
                                const getMonthNum = (monthStr) => {
                                  const monthAbbr = monthStr.split(' ')[0];
                                  return monthOrder.indexOf(monthAbbr);
                                };
                                return getMonthNum(a) - getMonthNum(b);
                              });

                            const allTabs = ["ALL", ...availableMonths];

                            return (
                              <div className="flex flex-wrap gap-1 lg:gap-2 mb-1">
                                {allTabs.map((tab) => (
                                  <button
                                    key={tab}
                                    onClick={() => setSelectedMonth(tab)}
                                    className={`
                                      px-2 lg:px-3 py-1 lg:py-2 
                                      border-2 
                                      font-semibold
                                      text-center
                                      w-20 lg:w-32
                                      text-xs lg:text-sm
                                      transition-all
                                      duration-200
                                      flex-shrink-0
                                      ${selectedMonth === tab
                                        ? "bg-blue-100 border-blue-600 text-blue-800 shadow-md"
                                        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                                      }
                                    `}
                                  >
                                    {tab}
                                  </button>
                                ))}
                              </div>
                            );
                          })()}
                        </div>

                        <div className="space-y-3 lg:space-y-4 w-full">
                          {filteredDepartureData.map((item, index) => (
                            <div key={item.id || index} className="border border-2 border-black p-2 lg:p-4 bg-white space-y-3 lg:space-y-4">
                              <div className="grid grid-cols-2 lg:grid-cols-5 items-center gap-2 lg:gap-0">
                                <div>
                                  <p className="text-xs lg:text-sm text-gray-500">From</p>
                                  <p className="font-semibold text-xs lg:text-base">{item.fromDate}</p>
                                  <p className="text-xs text-gray-500">{item.fromDay}</p>
                                </div>

                                <div>
                                  <p className="text-xs lg:text-sm text-gray-500">To</p>
                                  <p className="font-semibold text-xs lg:text-base">{item.toDate}</p>
                                  <p className="text-xs text-gray-500">{item.toDay}</p>
                                </div>

                                <div className="col-span-2 lg:col-span-1 flex items-center justify-center">
                                  <span className={`font-semibold text-xs lg:text-base ${item.status === 'Sold Out'
                                    ? 'text-red-600'
                                    : item.status === 'Available'
                                      ? 'text-green-600'
                                      : 'text-blue-700'
                                    }`}>
                                    {item.status}
                                  </span>
                                </div>

                                <div className="text-sm lg:text-lg font-bold text-gray-900">
                                  {formatPrice(item.price)}
                                </div>

                                <button
                                  onClick={() => toggleTable(index)}
                                  disabled={item.status === 'Sold Out'}
                                  className={`px-2 lg:px-6 py-1 lg:py-2 transition-colors text-xs lg:text-sm ${item.status === 'Sold Out'
                                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                    : 'bg-[#003366] text-white hover:bg-[#002244]'
                                    } ${openIndex === index ? 'bg-[#002244]' : ''}`}
                                >
                                  {item.status === 'Sold Out'
                                    ? 'Sold Out'
                                    : openIndex === index
                                      ? 'Hide Table'
                                      : 'Select'
                                  }
                                </button>
                              </div>

                              {openIndex === index && item.status !== 'Sold Out' && (
                                <div className="border-2 border-black overflow-hidden animate-fadeIn overflow-x-auto">
                                  <div className="min-w-[600px] lg:min-w-0">
                                    <div className="grid grid-cols-4 bg-[#0A1D4A] text-white font-semibold text-center">
                                      <div className="p-2 border-r-2 border-white text-xs lg:text-sm">Particulars - Tour Cost</div>
                                      <div className="p-2 border-r-2 border-white text-xs lg:text-sm">Standard</div>
                                      <div className="p-2 border-r-2 border-white text-xs lg:text-sm">Deluxe</div>
                                      <div className="p-2 text-xs lg:text-sm">Luxury</div>
                                    </div>

                                    {[
                                      { particular: "Per pax on Twin Basis", star3: item.threeStar.twin, star4: item.fourStar.twin, star5: item.fiveStar.twin },
                                      { particular: "Per pax on Triple Basis", star3: item.threeStar.triple, star4: item.fourStar.triple, star5: item.fiveStar.triple },
                                      { particular: "Child with Bed", star3: item.threeStar.childWithBed, star4: item.fourStar.childWithBed, star5: item.fiveStar.childWithBed },
                                      { particular: "Child without Bed", star3: item.threeStar.childWithoutBed, star4: item.fourStar.childWithoutBed, star5: item.fiveStar.childWithoutBed },
                                      { particular: "Infant", star3: item.threeStar.infant, star4: item.fourStar.infant, star5: item.fiveStar.infant },
                                      { particular: "Per pax Single Occupancy", star3: item.threeStar.single, star4: item.fourStar.single, star5: item.fiveStar.single },
                                    ].map((row, i) => (
                                      <div
                                        key={i}
                                        className={`grid grid-cols-4 text-center border-b-2 border-black ${i % 2 === 0 ? "bg-[#EEF1F7]" : "bg-white"
                                          } ${i === 5 ? 'border-b-0' : ''}`}
                                      >
                                        <div className="p-2 border-r-2 border-black font-medium text-xs lg:text-sm text-left">
                                          {row.particular}
                                        </div>
                                        <div className="p-2 border-r-2 border-black text-xs lg:text-sm">
                                          {row.star3}
                                        </div>
                                        <div className="p-2 border-r-2 border-black font-semibold text-green-700 text-xs lg:text-sm">
                                          {row.star4}
                                        </div>
                                        <div className="p-2 text-xs lg:text-sm">
                                          {row.star5}
                                        </div>
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
                                {selectedMonth === "ALL"
                                  ? "No departure dates available for this tour"
                                  : `No departure dates available for ${selectedMonth}`
                                }
                              </p>
                              <p className="text-gray-500 text-xs lg:text-sm">
                                Please check back later or contact us for more information
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#E8F0FF] rounded-lg p-1 w-full">
                    <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg w-full">
                      Departure Dates
                    </div>

                    <div className="border-2 border-t-0 border-[#1e3a8a] rounded-b-lg w-full flex flex-col min-h-[200px] lg:min-h-[280px] max-h-[200px] lg:max-h-[280px] overflow-hidden">
                      <div className="flex-1 overflow-y-auto p-2 bg-[#FFEBEE] w-full">
                        <div className="space-y-4 w-full">
                          {tour.departures.descriptions.map((description, index) => (
                            <div key={index} className="w-full">
                              <div className="flex items-start w-full">
                                <div className="flex-1 min-w-0">
                                  <p className="text-black break-words whitespace-pre-wrap text-justify w-full text-sm lg:text-base">
                                    {description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}

              {/* Tour Cost Tab - Mobile responsive */}
              {activeTab === "tour-cost" && (
                <div className="bg-[#E8F0FF] rounded-lg p-1">
                  <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg mb-1.5">
                    Tour Cost
                  </div>

                  <div className="border rounded-b-lg rounded-t-o overflow-hidden -mt-1.5">
                    {isGroupTour ? (
                      <div className="mb-0">
                        <div className="p-3 lg:p-4 border-2 border-black border-t-0 rounded-b-lg">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4 mb-3 lg:mb-4">
                            <div>
                              <label className="block text-gray-700 font-bold mb-2 text-sm lg:text-base">Month</label>
                              <select
                                className="w-full border-2 border-black rounded-md px-3 py-2 bg-white text-sm lg:text-base"
                                value={selectedCostMonth}
                                onChange={(e) => {
                                  setSelectedCostMonth(e.target.value);
                                  setSelectedCostDate("");
                                }}
                              >
                                <option value="">Select Month</option>
                                {availableMonths.map(month => {
                                  const monthDepartures = departuresByMonth[month] || [];
                                  const allSoldOut = monthDepartures.length > 0 && 
                                                    monthDepartures.every(dep => dep.status === 'Sold Out');
                                  
                                  return (
                                    <option 
                                      key={month} 
                                      value={month}
                                      disabled={allSoldOut}
                                      style={allSoldOut ? { color: '#999', fontStyle: 'italic' } : {}}
                                    >
                                      {month} {allSoldOut ? '(Sold Out)' : ''}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>

                            <div>
                              <label className="block text-gray-700 font-bold mb-2 text-sm lg:text-base">Date</label>
                              <select
                                className="w-full border-2 border-black rounded-md px-3 py-2 bg-white text-sm lg:text-base"
                                value={selectedCostDate}
                                onChange={(e) => setSelectedCostDate(e.target.value)}
                                disabled={!selectedCostMonth}
                              >
                                <option value="">Select Date</option>
                                {availableDates
                                  .filter(dep => dep.status !== 'Sold Out')
                                  .map(dep => (
                                    <option key={dep.id} value={dep.fromDate}>
                                      {dep.fromDate} – {dep.toDate}
                                    </option>
                                  ))
                                }
                              </select>
                            </div>
                          </div>

                          {selectedDeparture ? (
                            <div className="border-2 border-black overflow-hidden animate-fadeIn overflow-x-auto">
                              <div className="min-w-[600px] lg:min-w-0">
                                <div className="grid grid-cols-4 bg-[#0A1D4A] text-white font-semibold text-center">
                                  <div className="p-2 border-r-2 border-white text-xs lg:text-sm">Particulars - Tour Cost</div>
                                  <div className="p-2 border-r-2 border-white text-xs lg:text-sm">Standard</div>
                                  <div className="p-2 border-r-2 border-white text-xs lg:text-sm">Deluxe</div>
                                  <div className="p-2 text-xs lg:text-sm">Luxury</div>
                                </div>

                                {[
                                  {
                                    particular: "Per pax on Twin Basis",
                                    star3: selectedDeparture.threeStar.twin,
                                    star4: selectedDeparture.fourStar.twin,
                                    star5: selectedDeparture.fiveStar.twin
                                  },
                                  {
                                    particular: "Per pax on Triple Basis",
                                    star3: selectedDeparture.threeStar.triple,
                                    star4: selectedDeparture.fourStar.triple,
                                    star5: selectedDeparture.fiveStar.triple
                                  },
                                  {
                                    particular: "Child with Bed",
                                    star3: selectedDeparture.threeStar.childWithBed,
                                    star4: selectedDeparture.fourStar.childWithBed,
                                    star5: selectedDeparture.fiveStar.childWithBed
                                  },
                                  {
                                    particular: "Child without Bed",
                                    star3: selectedDeparture.threeStar.childWithoutBed,
                                    star4: selectedDeparture.fourStar.childWithoutBed,
                                    star5: selectedDeparture.fiveStar.childWithoutBed
                                  },
                                  {
                                    particular: "Infant",
                                    star3: selectedDeparture.threeStar.infant,
                                    star4: selectedDeparture.fourStar.infant,
                                    star5: selectedDeparture.fiveStar.infant
                                  },
                                  {
                                    particular: "Per pax Single Occupancy",
                                    star3: selectedDeparture.threeStar.single,
                                    star4: selectedDeparture.fourStar.single,
                                    star5: selectedDeparture.fiveStar.single
                                  },
                                ].map((row, i) => (
                                  <div
                                    key={i}
                                    className={`grid grid-cols-4 text-center border-b-2 border-black ${i % 2 === 0 ? "bg-[#EEF1F7]" : "bg-white"
                                      } ${i === 5 ? 'border-b-0' : ''}`}
                                  >
                                    <div className="p-2 border-r-2 border-black font-medium text-xs lg:text-sm text-left">
                                      {row.particular}
                                    </div>
                                    <div className="p-2 border-r-2 border-black text-xs lg:text-sm">
                                      {row.star3}
                                    </div>
                                    <div className="p-2 border-r-2 border-black font-semibold text-green-700 text-xs lg:text-sm">
                                      {row.star4}
                                    </div>
                                    <div className="p-2 text-xs lg:text-sm">
                                      {row.star5}
                                    </div>
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
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="overflow-x-auto border shadow-sm">
                          <table className="w-full border-collapse table-fixed min-w-[600px] lg:min-w-0">
                            <thead>
                              <tr className="bg-[#2E4D98]">
                                <th className="border border-white px-2 lg:px-4 py-2 lg:py-3 text-center font-semibold text-white text-xs lg:text-base h-10 lg:h-12 w-1/6">
                                  Passenger
                                </th>
                                <th className="border border-white px-2 lg:px-4 py-2 lg:py-3 text-center font-semibold text-white text-xs lg:text-base h-10 lg:h-12 w-1/6">
                                  Standard Hotel
                                </th>
                                <th className="border border-white px-2 lg:px-4 py-2 lg:py-3 text-center font-semibold text-white text-xs lg:text-base h-10 lg:h-12 w-1/6">
                                  Deluxe Hotel
                                </th>
                                <th className="border border-white px-2 lg:px-4 py-2 lg:py-3 text-center font-semibold text-white text-xs lg:text-base h-10 lg:h-12 w-1/6">
                                  Executive Hotel
                                </th>
                                <th className="border border-white px-2 lg:px-4 py-2 lg:py-3 text-center font-semibold text-white text-xs lg:text-base h-10 lg:h-12 w-1/6">
                                  Child With Bed
                                </th>
                                <th className="border border-white px-2 lg:px-4 py-2 lg:py-3 text-center font-semibold text-white text-xs lg:text-base h-10 lg:h-12 w-1/6">
                                  Child No Bed
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {tour.tourCost.tableData.length > 0 ? (
                                tour.tourCost.tableData.map((row, index) => (
                                  <tr key={index} className={index % 2 === 0 ? 'bg-[#FFEBEE]' : 'bg-[#FFEBEE]/80'}>
                                    <td className="border-2 border-[#1e3a8a] px-2 lg:px-4 py-2 lg:py-3 text-center font-medium text-gray-700 text-xs lg:text-base h-10 lg:h-12 w-1/6">
                                      {row.passenger}
                                    </td>
                                    <td className="border-2 border-[#1e3a8a] px-2 lg:px-4 py-2 lg:py-3 text-center text-blue-800 font-semibold text-xs lg:text-base h-10 lg:h-12 w-1/6">
                                      {row.standard}
                                    </td>
                                    <td className="border-2 border-[#1e3a8a] px-2 lg:px-4 py-2 lg:py-3 text-center text-green-800 font-semibold text-xs lg:text-base h-10 lg:h-12 w-1/6">
                                      {row.deluxe}
                                    </td>
                                    <td className="border-2 border-[#1e3a8a] px-2 lg:px-4 py-2 lg:py-3 text-center text-[#A72703] font-semibold text-xs lg:text-base h-10 lg:h-12 w-1/6">
                                      {row.executive}
                                    </td>
                                    <td className="border-2 border-[#1e3a8a] px-2 lg:px-4 py-2 lg:py-3 text-center text-blue-600 font-medium text-xs lg:text-base h-10 lg:h-12 w-1/6">
                                      {row.childWithBed}
                                    </td>
                                    <td className="border-2 border-[#1e3a8a] px-2 lg:px-4 py-2 lg:py-3 text-center text-purple-600 font-medium text-xs lg:text-base h-10 lg:h-12 w-1/6">
                                      {row.childNoBed}
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr className="bg-[#FFEBEE]">
                                  <td colSpan={6} className="border-2 border-[#1e3a8a] px-2 lg:px-4 py-2 lg:py-3 text-center text-gray-500 text-sm lg:text-base">
                                    No cost information available
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    <div className="bg-[#E8F0FF] rounded-lg w-full overflow-x-hidden mt-1">
                      <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg w-full">
                        Tour Cost Remarks
                      </div>
                      <div className="border-2 border-[#1e3a8a] border-t-0 overflow-hidden rounded-b-lg w-full">
                        <div className="min-h-[150px] lg:min-h-[180px] max-h-[150px] lg:max-h-[180px] overflow-y-auto p-2 bg-[#FFEBEE] w-full">
                          {tour.tourCost.remarks && tour.tourCost.remarks.length > 0 ? (
                            <ul className="space-y-2 w-full">
                              {tour.tourCost.remarks.map((remark, index) => (
                                <li key={index} className="flex items-start gap-2 w-full">
                                  <span className="text-black whitespace-pre-wrap break-words hyphens-auto text-justify w-full text-sm lg:text-base">
                                    {remark}
                                  </span>
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

                    <div className='mt-1'>
                      <div className="flex flex-col lg:flex-row gap-1">
                        <div className='flex-1 min-w-0 lg:w-1/2'>
                          <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-xl rounded-t-lg py-2 lg:py-3 mb-1">
                            Optional Tour
                          </div>
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse min-w-[400px] lg:min-w-0">
                              <thead>
                                <tr className="bg-[#2E4D98]">
                                  <th className="border border-white px-2 lg:px-4 py-2 lg:py-3 text-left font-semibold text-white text-xs lg:text-sm w-[40%] lg:w-[50%]">
                                    Tour Name
                                  </th>
                                  <th className="border border-white px-2 lg:px-4 py-2 lg:py-3 text-left font-semibold text-white text-xs lg:text-sm w-[30%] lg:w-[25%]">
                                    Adult Price
                                  </th>
                                  <th className="border border-white px-2 lg:px-4 py-2 lg:py-3 text-left font-semibold text-white text-xs lg:text-sm w-[30%] lg:w-[25%]">
                                    Child Price
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="border-2 border-[#1e3a8a] border-t-0">
                                {(() => {
                                  const optionalTourCount = tour.optionalTours ? tour.optionalTours.length : 0;
                                  const emiCount = tour.emiOptions && tour.emiOptions.options ? tour.emiOptions.options.length : 0;
                                  const maxRows = Math.max(optionalTourCount, emiCount, 1);
                                  
                                  const rows = [];
                                  for (let i = 0; i < maxRows; i++) {
                                    const optTour = tour.optionalTours && tour.optionalTours[i];
                                    rows.push(
                                      <tr key={i} className={i % 2 === 0 ? "bg-[#FFEBEE]" : "bg-[#FFEBEE]/80"}>
                                        <td className="border border-black px-2 lg:px-4 py-1 lg:py-2 text-black text-xs lg:text-sm">{optTour ? optTour.tourName : "N/A"}</td>
                                        <td className="border border-black px-2 lg:px-4 py-1 lg:py-2 border-l-0 text-black text-xs lg:text-sm">{optTour ? optTour.adultPrice : "N/A"}</td>
                                        <td className="border border-black px-2 lg:px-4 py-1 lg:py-2 border-l-0 text-black text-xs lg:text-sm">{optTour ? optTour.childPrice : "N/A"}</td>
                                      </tr>
                                    );
                                  }
                                  return rows;
                                })()}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div className='flex-1 min-w-0 lg:w-1/2'>
                          <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-xl rounded-t-lg py-2 lg:py-3 mb-1">
                            EMI Options
                          </div>
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse min-w-[400px] lg:min-w-0">
                              <thead>
                                <tr className="bg-[#2E4D98]">
                                  <th className="border border-white px-2 lg:px-4 py-2 lg:py-3 text-center font-semibold text-white text-xs lg:text-sm w-[33.33%]">
                                    Loan Amount
                                  </th>
                                  <th className="border border-white px-2 lg:px-4 py-2 lg:py-3 text-center font-semibold text-white text-xs lg:text-sm w-[33.33%]">
                                    Months
                                  </th>
                                  <th className="border border-white px-2 lg:px-4 py-2 lg:py-3 text-center font-semibold text-white text-xs lg:text-sm w-[33.33%]">
                                    EMI
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="border-2 border-[#1e3a8a] border-t-0">
                                {(() => {
                                  const optionalTourCount = tour.optionalTours ? tour.optionalTours.length : 0;
                                  const emiCount = tour.emiOptions && tour.emiOptions.options ? tour.emiOptions.options.length : 0;
                                  const maxRows = Math.max(optionalTourCount, emiCount, 1);
                                  
                                  const rows = [];
                                  for (let i = 0; i < maxRows; i++) {
                                    const emi = tour.emiOptions && tour.emiOptions.options && tour.emiOptions.options[i];
                                    rows.push(
                                      <tr key={i} className={i % 2 === 0 ? "bg-[#FFEBEE]" : "bg-[#FFEBEE]/80"}>
                                        <td className="border border-black px-2 lg:px-4 py-1 lg:py-2 border-l-0 text-center text-black text-xs lg:text-sm">
                                          {emi ? emi.loanAmount : "N/A"}
                                        </td>
                                        <td className="border border-black px-2 lg:px-4 py-1 lg:py-2 border-l-0 text-center text-black text-xs lg:text-sm">
                                          {emi ? emi.months : "N/A"}
                                        </td>
                                        <td className="border border-black px-2 lg:px-4 py-1 lg:py-2 border-l-0 text-center text-black text-xs lg:text-sm">
                                          {emi ? emi.emi : "N/A"}
                                        </td>
                                      </tr>
                                    );
                                  }
                                  return rows;
                                })()}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-1 mt-1 w-full">
                      <div className="bg-[#E8F0FF] rounded-lg w-full lg:w-1/2 overflow-x-hidden">
                        <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg w-full">
                          Optional Tour Remarks
                        </div>
                        <div className="border-2 border-[#1e3a8a] border-t-0 overflow-hidden rounded-b-lg w-full">
                          <div className="min-h-[150px] lg:min-h-[180px] max-h-[150px] lg:max-h-[180px] overflow-y-auto p-2 bg-[#FFEBEE] w-full">
                            {tour.optionalTourRemarks && tour.optionalTourRemarks.length > 0 ? (
                              <ul className="space-y-2 w-full">
                                {tour.optionalTourRemarks.map((remark, index) => (
                                  <li key={index} className="flex items-start gap-2 w-full">
                                    <span className="text-black whitespace-pre-wrap break-words hyphens-auto text-justify w-full text-sm lg:text-base">
                                      {remark}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <div className="flex items-center justify-center h-full">
                                <span className="text-gray-500 italic text-sm lg:text-base">No optional tour remarks available</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="bg-[#E8F0FF] rounded-lg w-full lg:w-1/2 overflow-x-hidden">
                        <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg w-full">
                          EMI Remarks
                        </div>
                        <div className="border-2 border-[#1e3a8a] border-t-0 overflow-hidden rounded-b-lg w-full">
                          <div className="min-h-[150px] lg:min-h-[180px] max-h-[150px] lg:max-h-[180px] overflow-y-auto p-2 bg-[#FFEBEE] w-full">
                            {tour.emiRemarks && tour.emiRemarks.length > 0 ? (
                              <ul className="space-y-2 w-full">
                                {tour.emiRemarks.map((remark, index) => (
                                  <li key={index} className="flex items-start gap-2 w-full">
                                    <span className="text-black whitespace-pre-wrap break-words hyphens-auto text-justify w-full text-sm lg:text-base">
                                      {remark}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <div className="flex items-center justify-center h-full">
                                <span className="text-gray-500 italic text-sm lg:text-base">No EMI remarks available</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Cost In/Cost Ex Tab - Mobile responsive */}
              {activeTab === "cost-inc./cost-ex." && (
                <div className="bg-[#E8F0FF] rounded-lg p-1 w-full overflow-x-hidden">
                  <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg mb-1 w-full">
                    Cost Inclusive & Cost Excludes
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 w-full">
                    <div className="flex flex-col w-full min-h-[250px] lg:min-h-[280px] max-h-[250px] lg:max-h-[320px]">
                      <div className="bg-[#2E4D98] text-white text-center py-2 lg:py-3 rounded-t-lg w-full">
                        <h3 className="text-lg lg:text-xl font-bold">Cost Inclusive</h3>
                      </div>
                      <div className="flex-1 border-2 border-[#1e3a8a] rounded-b-lg bg-[#FFEBEE] w-full overflow-hidden min-h-0">
                        <div className="h-full overflow-y-auto p-2">
                          <ul className="space-y-2 w-full">
                            {tour.inclusionExclusion.inclusions.map((inclusion, index) => (
                              <li key={index} className="w-full">
                                <div className="flex items-start gap-0 w-full">
                                  <div className="text-black flex-1 min-w-0 text-justify break-words ml-2 text-sm lg:text-base">
                                    {inclusion}
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col w-full min-h-[250px] lg:min-h-[280px] max-h-[250px] lg:max-h-[320px]">
                      <div className="bg-[#2E4D98] text-white text-center py-2 lg:py-3 rounded-t-lg w-full">
                        <h3 className="text-lg lg:text-xl font-bold">Cost Excludes</h3>
                      </div>
                      <div className="flex-1 border-2 border-[#1e3a8a] rounded-b-lg bg-[#FFEBEE] w-full overflow-hidden min-h-0">
                        <div className="h-full overflow-y-auto p-2">
                          <ul className="space-y-2 w-full">
                            {tour.inclusionExclusion.exclusions.map((exclusion, index) => (
                              <li key={index} className="w-full">
                                <div className="flex items-start gap-0 w-full">
                                  <div className="text-black flex-1 min-w-0 text-justify break-words ml-2 text-sm lg:text-base">
                                    {exclusion}
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Flights & Hotels Tab - Mobile responsive */}
              {activeTab === "flights-&-hotels" && (
                <div className="bg-[#E8F0FF] rounded-lg p-0.2 w-full overflow-x-hidden">
                  {/* Flights Section */}
                  <div className="bg-[#FFEBEE] rounded-lg p-1 mb-1 w-full">
                    <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg w-full">
                      Flight Details
                    </div>

                    <div className="border-2 border-[#1e3a8a] rounded-t-none border-t-0 rounded-lg overflow-hidden w-full">
                      <div className="min-h-[250px] lg:min-h-[300px] max-h-[250px] lg:max-h-[400px] overflow-y-auto p-1 bg-[#FFEBEE] w-full">
                        {isGroupTour ? (
                          <div className="overflow-x-auto border shadow-sm">
                            <table className="w-full border-collapse table-fixed min-w-[800px] lg:min-w-0">
                              <thead>
                                <tr className="bg-[red]">
                                  <th className="border border-black px-2 lg:px-3 py-2 lg:py-3 text-center font-semibold text-white text-xs lg:text-sm h-8 lg:h-9 w-[14%]">
                                    Airlines
                                  </th>
                                  <th className="border border-black px-2 lg:px-4 py-2 lg:py-3 text-center font-semibold text-white text-xs lg:text-sm h-8 lg:h-9 w-[11%]">
                                    Flight No
                                  </th>
                                  <th className="border border-black px-2 lg:px-4 py-2 lg:py-3 text-center font-semibold text-white text-xs lg:text-sm h-8 lg:h-9 w-[14%]">
                                    From
                                  </th>
                                  <th className="border border-black px-2 lg:px-4 py-2 lg:py-3 text-center font-semibold text-white text-xs lg:text-sm h-8 lg:h-9 w-[12%]">
                                    Date
                                  </th>
                                  <th className="border border-black px-2 lg:px-4 py-2 lg:py-3 text-center font-semibold text-white text-xs lg:text-sm h-8 lg:h-9 w-[12%]">
                                    Time
                                  </th>
                                  <th className="border border-black px-2 lg:px-4 py-2 lg:py-3 text-center font-semibold text-white text-xs lg:text-sm h-8 lg:h-9 w-[14%]">
                                    To
                                  </th>
                                  <th className="border border-black px-2 lg:px-4 py-2 lg:py-3 text-center font-semibold text-white text-xs lg:text-sm h-8 lg:h-9 w-[12%]">
                                    Date
                                  </th>
                                  <th className="border border-black px-2 lg:px-4 py-2 lg:py-3 text-center font-semibold text-white text-xs lg:text-sm h-8 lg:h-9 w-[12%]">
                                    Time
                                  </th>
                                </tr>
                              </thead>

                              <tbody>
                                {tour.airlines.tableData && tour.airlines.tableData.length > 0 ? (
                                  tour.airlines.tableData.map((flight, index) => {
                                    const formatDateToIndian = (dateString) => {
                                      if (!dateString) return '';
                                      try {
                                        const date = new Date(dateString);
                                        if (isNaN(date.getTime())) return dateString;
                                        
                                        const day = String(date.getDate()).padStart(2, '0');
                                        const month = String(date.getMonth() + 1).padStart(2, '0');
                                        const year = date.getFullYear();
                                        return `${day}-${month}-${year}`;
                                      } catch (error) {
                                        return dateString;
                                      }
                                    };

                                    const formatTimeToAMPM = (timeString) => {
                                      if (!timeString) return '';
                                      try {
                                        if (timeString.includes(':')) {
                                          const timeParts = timeString.split(':');
                                          if (timeParts.length >= 2) {
                                            let hours = parseInt(timeParts[0], 10);
                                            const minutes = timeParts[1];
                                            const ampm = hours >= 12 ? 'PM' : 'AM';
                                            
                                            hours = hours % 12;
                                            hours = hours === 0 ? 12 : hours;
                                            
                                            return `${hours}:${minutes} ${ampm}`;
                                          }
                                        }
                                        return timeString;
                                      } catch (error) {
                                        return timeString;
                                      }
                                    };

                                    return (
                                      <tr key={index} className={index % 2 === 0 ? 'bg-[#FFEBEE]' : 'bg-[#FFEBEE]/80'}>
                                        <td className="border border-black px-2 lg:px-4 py-1 lg:py-3 text-center text-xs lg:text-sm h-8 lg:h-9 w-[14%]">
                                          {flight.airline || ''}
                                        </td>
                                        <td className="border border-black px-2 lg:px-4 py-1 lg:py-3 text-center text-xs lg:text-sm h-8 lg:h-9 w-[11%]">
                                          {flight.flightNo || ''}
                                        </td>
                                        <td className="border border-black px-2 lg:px-4 py-1 lg:py-3 text-center text-xs lg:text-sm h-8 lg:h-9 w-[14%]">
                                          {flight.from || ''}
                                        </td>
                                        <td className="border border-black px-2 lg:px-4 py-1 lg:py-3 text-center text-xs lg:text-sm h-8 lg:h-9 w-[12%]">
                                          {formatDateToIndian(flight.depDate) || ''}
                                        </td>
                                        <td className="border border-black px-2 lg:px-4 py-1 lg:py-3 text-center text-xs lg:text-sm h-8 lg:h-9 w-[12%]">
                                          {formatTimeToAMPM(flight.depTime) || ''}
                                        </td>
                                        <td className="border border-black px-2 lg:px-4 py-1 lg:py-3 text-center text-xs lg:text-sm h-8 lg:h-9 w-[14%]">
                                          {flight.to || ''}
                                        </td>
                                        <td className="border border-black px-2 lg:px-4 py-1 lg:py-3 text-center text-xs lg:text-sm h-8 lg:h-9 w-[12%]">
                                          {formatDateToIndian(flight.arrDate) || ''}
                                        </td>
                                        <td className="border border-black px-2 lg:px-4 py-1 lg:py-3 text-center text-xs lg:text-sm h-8 lg:h-9 w-[12%]">
                                          {formatTimeToAMPM(flight.arrTime) || ''}
                                        </td>
                                      </tr>
                                    );
                                  })
                                ) : (
                                  [1, 2, 3, 4].map((row, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-[#FFEBEE]' : 'bg-[#FFEBEE]/80'}>
                                      <td className="border border-black px-2 lg:px-4 py-1 lg:py-3 text-center text-xs lg:text-sm h-8 lg:h-9 w-[11%]">&nbsp;</td>
                                      <td className="border border-black px-2 lg:px-4 py-1 lg:py-3 text-center text-xs lg:text-sm h-8 lg:h-9 w-[11%]">&nbsp;</td>
                                      <td className="border border-black px-2 lg:px-4 py-1 lg:py-3 text-center text-xs lg:text-sm h-8 lg:h-9 w-[14%]">&nbsp;</td>
                                      <td className="border border-black px-2 lg:px-4 py-1 lg:py-3 text-center text-xs lg:text-sm h-8 lg:h-9 w-[10%]">&nbsp;</td>
                                      <td className="border border-black px-2 lg:px-4 py-1 lg:py-3 text-center text-xs lg:text-sm h-8 lg:h-9 w-[12%]">&nbsp;</td>
                                      <td className="border border-black px-2 lg:px-4 py-1 lg:py-3 text-center text-xs lg:text-sm h-8 lg:h-9 w-[14%]">&nbsp;</td>
                                      <td className="border border-black px-2 lg:px-4 py-1 lg:py-3 text-center text-xs lg:text-sm h-8 lg:h-9 w-[10%]">&nbsp;</td>
                                      <td className="border border-black px-2 lg:px-4 py-1 lg:py-3 text-center text-xs lg:text-sm h-8 lg:h-9 w-[12%]">&nbsp;</td>
                                    </tr>
                                  ))
                                )}
                              </tbody>
                            </table>

                            {tour.airlines.tableData && tour.airlines.tableData.some((flight) => flight.description) && (
                              <div className="mt-3 lg:mt-4 p-3 lg:p-4 bg-[#E8F0FF] border border-gray-200 rounded-lg">
                                <h4 className="font-bold text-sm lg:text-lg mb-2 lg:mb-3 text-center text-red-600">Additional Information</h4>
                                <div className="space-y-3 lg:space-y-4">
                                  {tour.airlines.tableData.map((flight, index) => (
                                    flight.description && (
                                      <div key={index} className="border border-gray-300 rounded p-2 lg:p-3 bg-gray-50">
                                        <div className="flex items-start mb-1 lg:mb-2">
                                          <span className="font-bold mr-2 text-xs lg:text-sm">Transport {index + 1}:</span>
                                          <span className="text-xs lg:text-sm">{flight.airline} - {flight.flightNo}</span>
                                        </div>
                                        <p className="text-gray-700 whitespace-pre-wrap text-xs lg:text-sm">{flight.description}</p>
                                      </div>
                                    )
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div>
                            {tour.airlines.tableData && tour.airlines.tableData.length > 0 ? (
                              <div className="space-y-3 lg:space-y-4 w-full">
                                {tour.airlines.tableData.map((flight, index) => (
                                  <div key={index} className="p-1 w-full overflow-hidden">
                                    {flight.description && (
                                      <div className="border-gray-300">
                                        <p className="text-gray-600 p-1 lg:p-2 rounded text-sm lg:text-base">
                                          {flight.description}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="flex items-center justify-center h-full min-h-[150px] lg:min-h-[200px]">
                                <p className="text-gray-500 text-sm lg:text-lg">No information available</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {tour.airlines.remarks && tour.airlines.remarks.length > 0 && (
                      <div className="bg-[#E8F0FF] rounded-lg mt-1 w-full overflow-x-hidden">
                        <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-xl py-2 lg:py-3 rounded-t-lg w-full">
                          Flight Remarks
                        </div>
                        <div className="border-2 border-t-0 border-[#1e3a8a] rounded-b-lg overflow-hidden w-full">
                          <div className="min-h-[120px] lg:min-h-[150px] max-h-[120px] lg:max-h-[200px] overflow-y-auto p-2 bg-[#FFEBEE] w-full">
                            <ul className="space-y-2 w-full">
                              {tour.airlines.remarks.map((remark, index) => (
                                <li key={index} className="flex items-start gap-1 w-full">
                                  <span className="text-black break-words whitespace-pre-wrap text-justify w-full text-sm lg:text-base">
                                    {remark}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Hotels Section */}
                  <div className='p-1 -mt-2 lg:-mt-3 w-full overflow-x-hidden'>
                    <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-xl rounded-t-lg py-2 lg:py-3 mb-1 w-full">
                      Hotel Details
                    </div>

                    <div className="overflow-x-auto w-full">
                      {tour.hotels.tableData.length > 0 ? (
                        <table className="w-full border-collapse min-w-[600px] lg:min-w-max">
                          <thead>
                            <tr className="bg-[#2E4D98]">
                                <th className="border border-white px-2 lg:px-3 py-2 lg:py-3 text-left text-white  text-xs lg:text-sm w-[22.5%]">
                                City
                              </th>
                                <th className="border border-white px-2 lg:px-3 py-2 lg:py-3 text-left text-white  text-xs lg:text-sm w-[22.5%]">
                                Standard
                              </th>
                                <th className="border border-white px-2 lg:px-3 py-2 lg:py-3 text-left text-white  text-xs lg:text-sm w-[22.5%]">
                                Deluxe
                              </th>
                                <th className="border border-white px-2 lg:px-3 py-2 lg:py-3 text-left text-white  text-xs lg:text-sm w-[22.5%]">
                                Executive
                              </th>
                                <th className="border border-white px-2 lg:px-3 py-2 lg:py-3 text-left text-white  text-xs lg:text-sm w-[22.5%]">
                                Nights
                              </th>
                            </tr>
                          </thead>
                        <tbody className="border-2 border-[#1e3a8a] border-t-0">
  {tour.hotels.tableData.map((hotel, index) => (
    <tr
      key={index}
      className={index % 2 === 0 ? "bg-[#FFEBEE]" : "bg-[#FFEBEE]/80"}
    >
      <td className="border border-black px-2 py-1.5 lg:px-2 lg:py-2 break-all whitespace-pre-wrap text-black text-xs lg:text-sm min-w-[130px]">
        {hotel.city}
      </td>

      <td className="border border-black px-2 py-1.5 lg:px-2 lg:py-2 break-all whitespace-pre-wrap text-black text-xs lg:text-sm min-w-[130px]">
        {hotel.standard || hotel.standardPrice || "N/A"}
      </td>

      <td className="border border-black px-2 py-1.5 lg:px-2 lg:py-2 break-all whitespace-pre-wrap text-black text-xs lg:text-sm min-w-[130px]">
        {hotel.deluxe || hotel.deluxePrice || "N/A"}
      </td>

      <td className="border border-black px-2 py-1.5 lg:px-2 lg:py-2 break-all whitespace-pre-wrap text-black text-xs lg:text-sm min-w-[130px]">
        {hotel.executive || hotel.executivePrice || "N/A"}
      </td>

      <td className="border border-black px-2 py-1.5 lg:px-2 lg:py-2 break-all whitespace-pre-wrap text-black text-xs lg:text-sm min-w-[70px]">
        {hotel.nights}
      </td>
    </tr>
  ))}
</tbody>

                        </table>
                      ) : (
                        <div className="border-2 border-[#1e3a8a] p-3 lg:p-4 bg-white rounded-lg">
                          <p className="text-gray-500 text-center text-sm lg:text-base">No hotel information available</p>
                        </div>
                      )}
                    </div>

                    {(tour.hotels.remarks.length > 0 || tour.airlines.remarks.length > 0) && (
                      <div className="bg-[#E8F0FF] rounded-lg mt-1 w-full overflow-x-hidden">
                        <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-xl py-2 lg:py-3 rounded-t-lg w-full">
                          Hotel Remarks
                        </div>

                        <div className="border-2 border-t-0 border-[#1e3a8a] rounded-b-lg overflow-hidden w-full">
                          <div className="min-h-[120px] lg:min-h-[150px] max-h-[120px] lg:max-h-[200px] overflow-y-auto p-2 bg-[#FFEBEE] w-full">
                            <ul className="space-y-2 w-full">
                              {[...tour.hotels.remarks].map((remark, index) => (
                                <li key={index} className="flex items-start gap-1 w-full">
                                  <span className="text-black break-words whitespace-pre-wrap text-justify w-full text-sm lg:text-base">
                                    {remark}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Visa Tab - Mobile responsive */}
              {activeTab === "visa" && (
                <div className="bg-[#E8F0FF] rounded-lg p-1">
                  {/* Header */}
                  <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg mb-1">
                    Documents Required for Visa
                  </div>

                  {/* Main Tabs */}
                  <div className="flex bg-white border border-black rounded-t-lg overflow-hidden overflow-x-auto">
                    {[
                      "Tourist Visa",
                      "Transit Visa",
                      "Business Visa",
                      "Visa Forms",
                      "Photo",
                      "Visa Fees",
                      "Submission & Pick Up"
                    ].map((label, idx) => {
                      const tabMap = {
                        "Tourist Visa": "tourist",
                        "Transit Visa": "transit",
                        "Business Visa": "business",
                        "Visa Forms": "forms",
                        "Photo": "photo",
                        "Visa Fees": "fees",
                        "Submission & Pick Up": "time"
                      };
                      const tabKey = tabMap[label];
                      const isLastTab = idx === 6;
                return (
  <button
    key={label}
    onClick={() => setActiveVisaTab(tabKey)}
    className={`px-2 py-2 lg:py-3 text-[10px] xs:text-xs lg:text-[15px] font-semibold text-center whitespace-nowrap border-r border-black last:border-r-0 transition flex-shrink-0
      ${activeVisaTab === tabKey
        ? "bg-[#A72703] text-white"
        : "bg-[#FFE797] text-gray-800"
      }`}
    style={{
      flex: isLastTab ? '1.3' : '1'
    }}
  >
    {label}
  </button>
);
                    })}
                  </div>

                  {/* Tab Content */}
                  <div className="space-y-0">
                    {/* Tourist Visa Tab */}
                    {activeVisaTab === 'tourist' && (
                      <div className="border-2 border-t-0 border-[#1e3a8a] rounded-b-lg w-full flex flex-col min-h-[250px] lg:min-h-[280px] max-h-[250px] lg:max-h-[280px] overflow-hidden">
                        <div className="flex-1 overflow-y-auto p-2 bg-[#FFEBEE] w-full">
                          <div className="space-y-3 lg:space-y-4 w-full">
                            {tour.visaDetails.tourist.length > 0 ? (
                              tour.visaDetails.tourist.map((description, index) => (
                                <div key={index} className="w-full">
                                  <div className="flex items-start w-full">
                                    <div className="flex-1 min-w-0">
                                      <p className="text-black break-words whitespace-pre-wrap text-justify w-full text-sm lg:text-base">
                                        {description}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="flex items-center justify-center h-full">
                                <p className="text-gray-500 text-sm lg:text-base">No tourist visa information available</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Transit Visa Tab */}
                    {activeVisaTab === 'transit' && (
                      <div className="border-2 border-t-0 border-[#1e3a8a] rounded-b-lg w-full flex flex-col min-h-[250px] lg:min-h-[280px] max-h-[250px] lg:max-h-[280px] overflow-hidden">
                        <div className="flex-1 overflow-y-auto p-2 bg-[#FFEBEE] w-full">
                          <div className="space-y-3 lg:space-y-4 w-full">
                            {tour.visaDetails.transit.length > 0 ? (
                              tour.visaDetails.transit.map((description, index) => (
                                <div key={index} className="w-full">
                                  <div className="flex items-start w-full">
                                    <div className="flex-1 min-w-0">
                                      <p className="text-black break-words whitespace-pre-wrap text-justify w-full text-sm lg:text-base">
                                        {description}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="flex items-center justify-center h-full">
                                <p className="text-gray-500 text-sm lg:text-base">No transit visa information available</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Business Visa Tab */}
                    {activeVisaTab === 'business' && (
                      <div className="border-2 border-t-0 border-[#1e3a8a] rounded-b-lg w-full flex flex-col min-h-[250px] lg:min-h-[280px] max-h-[250px] lg:max-h-[280px] overflow-hidden">
                        <div className="flex-1 overflow-y-auto p-2 bg-[#FFEBEE] w-full">
                          <div className="space-y-3 lg:space-y-4 w-full">
                            {tour.visaDetails.business.length > 0 ? (
                              tour.visaDetails.business.map((description, index) => (
                                <div key={index} className="w-full">
                                  <div className="flex items-start w-full">
                                    <div className="flex-1 min-w-0">
                                      <p className="text-black break-words whitespace-pre-wrap text-justify w-full text-sm lg:text-base">
                                        {description}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="flex items-center justify-center h-full">
                                <p className="text-black text-sm lg:text-base">No business visa information available</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Visa Forms Tab */}
                    {activeVisaTab === 'forms' && (
                      <div className="space-y-1 mt-1">
                        <div className="overflow-x-auto w-full">
                          <table className="w-full border-collapse min-w-[400px] lg:min-w-max border border-gray-300">
                            <thead>
                              <tr className="bg-[#2E4D98]">
                                <th className="border border-white px-2 py-2 lg:py-3 text-left text-white text-xs lg:text-sm w-[70%] h-8 lg:h-12">
                                  Visa Type
                                </th>
                                <th className="border border-white px-2 py-2 lg:py-3 text-center text-white text-xs lg:text-sm w-[15%] h-8 lg:h-12">
                                  PDF
                                </th>
                                <th className="border border-white px-2 py-2 lg:py-3 text-center text-white text-xs lg:text-sm w-[15%] h-8 lg:h-12">
                                  WORD
                                </th>
                              </tr>
                            </thead>
                            <tbody className="border-2 border-[#1e3a8a] border-t-0">
                              {tour.visaForms && tour.visaForms.length > 0 ? (
                                tour.visaForms.map((form, index) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-[#FFEBEE]" : "bg-[#FFEBEE]/80"}>
                                  <td className="border border-black px-2 py-1 lg:py-2 break-all whitespace-pre-wrap w-[70%] h-8 lg:h-10 text-black text-xs lg:text-sm">
                                    {form.visaType || 'Visa Form'} 
                                  </td>

                                  <td className="border border-black px-2 py-1 lg:py-2 text-center">
                                    {form.action1FileUrl ? (
                                      <a 
                                        href={`${BASE_URL}${form.action1FileUrl}`} 
                                        download 
                                        className="block w-full h-full bg-red-600 text-white py-1 lg:py-2 rounded shadow-md hover:shadow-lg hover:bg-red-700 transition-all duration-200 active:scale-95 text-xs lg:text-sm"
                                      >
                                        {form.downloadAction || "Download"}
                                      </a>
                                    ) : (
                                      <span className="block w-full h-full bg-red-600 text-white py-1 lg:py-2 rounded shadow-sm opacity-70 text-xs lg:text-sm">
                                        {form.downloadAction || "Download"}
                                      </span>
                                    )}
                                  </td>

                                  <td className="border border-black px-2 py-1 lg:py-2 text-center">
                                    {form.action2FileUrl ? (
                                      <a 
                                        href={`${BASE_URL}${form.action2FileUrl}`} 
                                        download 
                                        className="block w-full h-full bg-amber-800 text-white py-1 lg:py-2 rounded shadow-md hover:shadow-lg hover:bg-amber-900 transition-all duration-200 active:scale-95 text-xs lg:text-sm"
                                      >
                                        {form.fillAction || "Fill Manually"}
                                      </a>
                                    ) : (
                                      <span className="block w-full h-full bg-amber-800 text-white py-1 lg:py-2 rounded shadow-sm opacity-70 text-xs lg:text-sm">
                                        {form.fillAction || "Fill Manually"}
                                      </span>
                                    )}
                                  </td>
                                </tr>
                                ))
                              ) : (
                                <>
                                  <tr className="bg-[#FFEBEE]">
                                    <td className="border border-black px-2 py-1 lg:py-2 break-all whitespace-pre-wrap w-[70%] h-8 lg:h-10 text-xs lg:text-sm">
                                      Tourist Visa Form Download
                                    </td>
                                    <td className="border border-black px-2 py-1 lg:py-2 text-center bg-red-600 text-white cursor-pointer hover:bg-red-700 text-xs lg:text-sm">
                                      Download
                                    </td>
                                    <td className="border border-black px-2 py-1 lg:py-2 text-center bg-amber-800 text-white cursor-pointer hover:bg-amber-900 text-xs lg:text-sm">
                                      Fill Manually
                                    </td>
                                  </tr>
                                  <tr className="bg-[#FFEBEE]">
                                    <td className="border border-black px-2 py-1 lg:py-2 break-all whitespace-pre-wrap w-[70%] h-8 lg:h-10 text-xs lg:text-sm">
                                      Transit Visa Form Download
                                    </td>
                                    <td className="border border-black px-2 py-1 lg:py-2 text-center bg-red-600 text-white cursor-pointer hover:bg-red-700 text-xs lg:text-sm">
                                      Download
                                    </td>
                                    <td className="border border-black px-2 py-1 lg:py-2 text-center bg-amber-800 text-white cursor-pointer hover:bg-amber-900 text-xs lg:text-sm">
                                      Fill Manually
                                    </td>
                                  </tr>
                                  <tr className="bg-[#FFEBEE]">
                                    <td className="border border-black px-2 py-1 lg:py-2 break-all whitespace-pre-wrap w-[70%] h-8 lg:h-10 text-xs lg:text-sm">
                                      Business Visa Form Download
                                    </td>
                                    <td className="border border-black px-2 py-1 lg:py-2 text-center bg-red-600 text-white cursor-pointer hover:bg-red-700 text-xs lg:text-sm">
                                      Download
                                    </td>
                                    <td className="border border-black px-2 py-1 lg:py-2 text-center bg-amber-800 text-white cursor-pointer hover:bg-amber-900 text-xs lg:text-sm">
                                      Fill Manually
                                    </td>
                                  </tr>
                                </>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Photo Tab */}
                    {activeVisaTab === 'photo' && (
                      <div className="overflow-x-auto w-full">
                        <table className="w-full border-collapse min-w-[400px] lg:min-w-[600px] max-w-6xl border border-gray-300 mt-1">
                          <thead>
                            <tr className="bg-[#2E4D98]">
                              <th className="border border-white px-2 lg:px-4 py-2 lg:py-3 text-center text-white text-sm lg:text-base" colSpan={8}>
                                Photo Specification
                              </th>
                            </tr>
                          </thead>
                          <tbody className="border-2 border-[#1e3a8a] border-t-0">
                            {tour.visaDetails.photo.length > 0 ? (
                              tour.visaDetails.photo.map((spec, index) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-[#FFEBEE]" : "bg-[#FFEBEE]/80"}>
                                  <td className="border border-black px-2 lg:px-4 py-2 lg:py-3 break-words whitespace-normal text-justify text-black text-sm lg:text-base" colSpan={8}>
                                    {spec}
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr className="bg-[#FFEBEE]">
                                <td className="border border-black px-2 lg:px-4 py-2 lg:py-3 text-center whitespace-normal text-sm lg:text-base" colSpan={8}>
                                  No photo specifications available
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Visa Fees Tab */}
               {activeVisaTab === 'fees' && (
  <div className="space-y-1 mt-1">
    <div className="overflow-x-auto w-full">
      {/* Add min-w-[400px] lg:min-w-0 here */}
      <div className="flex bg-white border border-black rounded-t-lg overflow-hidden mb-0 overflow-x-auto min-w-[400px] lg:min-w-0">
        {[
          "Tourist Visa fees",
          "Transit Visa fees",
          "Business Visa fees",
          "Visa fees & VFS & Other Charges"
        ].map((label, idx) => {
          const tabMap = {
            "Tourist Visa fees": "tourist",
            "Transit Visa fees": "transit",
            "Business Visa fees": "business",
            "Visa fees & VFS & Other Charges": "charges"
          };
          const tabKey = tabMap[label];
          const isLastTab = idx === 3;
          const isActive = activeVisaFeeType === tabKey && tabKey !== 'charges';
          return (
            <button
              key={label}
              onClick={() => {
                if (tabKey !== 'charges') setActiveVisaFeeType(tabKey);
              }}
              className={`px-2 py-2 lg:py-3 text-[10px] xs:text-xs font-semibold text-center whitespace-nowrap border-r border-black last:border-r-0 transition flex-shrink-0
                ${isActive ? "bg-[#A72703] text-white" : "bg-[#FFE797] text-gray-800 hover:bg-[#FFE797]/90"}
                ${tabKey === 'charges' ? 'cursor-default' : 'cursor-pointer'}`}
              style={{ flex: isLastTab ? '1.3' : '1' }}
            >
              {label}
            </button>
          );
        })}
      </div>

      <table className="w-full border-collapse border border-gray-300 border-t-0 min-w-[400px] lg:min-w-0">
        <tbody className="border-1 border-[#1e3a8a]">
          {activeVisaFeeType && tour.visaFees?.length > 0 ? (
            tour.visaFees.map((fee, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-[#FFEBEE]" : "bg-[#FFEBEE]/80"}>
                <td className="border border-black px-2 lg:px-4 py-2 lg:py-3 break-all whitespace-pre-wrap w-[47%] text-black text-sm lg:text-base">
                  {activeVisaFeeType === 'tourist' && (fee.tourist || 'Free Flow Entry')}
                  {activeVisaFeeType === 'transit' && (fee.transit || 'Free Flow Entry')}
                  {activeVisaFeeType === 'business' && (fee.business || 'Free Flow Entry')}
                </td>
                <td className="border border-black px-2 lg:px-4 py-2 lg:py-3 break-all whitespace-pre-wrap w-[20%] text-start text-black text-sm lg:text-base">
                  {activeVisaFeeType === 'tourist' && (fee.touristCharges || 'N/A')}
                  {activeVisaFeeType === 'transit' && (fee.transitCharges || 'N/A')}
                  {activeVisaFeeType === 'business' && (fee.businessCharges || 'N/A')}
                </td>
              </tr>
            ))
          ) : (
            <tr className="bg-[#FFEBEE]">
              <td className="border border-black px-2 lg:px-4 py-2 lg:py-3 text-center text-black text-sm lg:text-base" colSpan={2}>
                {activeVisaFeeType ? 'No fee data available' : 'Select a visa type to view fees'}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
)}

                  {activeVisaTab === 'time' && (
  <div className="space-y-1 mt-1">
    <div className="overflow-x-auto w-full">
      {/* Add min-w-[400px] lg:min-w-0 here to match the table width */}
      <div className="flex bg-white border border-black rounded-t-lg overflow-hidden mb-0 overflow-x-auto min-w-[400px] lg:min-w-0">
        {["Tourist Visa", "Transit Visa", "Business Visa"].map((label) => {
          const tabMap = { "Tourist Visa": "tourist", "Transit Visa": "transit", "Business Visa": "business" };
          const tabKey = tabMap[label];
          const isActive = activeVisaFeeType === tabKey;
          return (
            <button
              key={label}
              onClick={() => setActiveVisaFeeType(tabKey)}
              className={`px-2 py-2 lg:py-3 text-[10px] xs:text-xs font-semibold text-center whitespace-nowrap border-r border-black last:border-r-0 transition flex-shrink-0
                ${isActive ? "bg-[#A72703] text-white" : "bg-[#FFE797] text-gray-800 hover:bg-[#FFE797]/90"}`}
              style={{ flex: '1' }}
            >
              {label}
            </button>
          );
        })}
      </div>

      <table className="w-full border-collapse border border-gray-300 border-t-0 min-w-[400px] lg:min-w-0">
        <tbody className="border-1 border-[#1e3a8a]">
          {activeVisaFeeType && tour.visaSubmission?.length > 0 ? (
            tour.visaSubmission.map((sub, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-[#FFEBEE]" : "bg-[#FFEBEE]/80"}>
                <td className="border border-black px-2 lg:px-4 py-2 lg:py-3 break-all whitespace-pre-wrap w-[67%] text-sm lg:text-base">
                  {sub.label || 'N/A'}
                </td>
                <td className="border border-black px-2 lg:px-4 py-2 lg:py-3 break-all whitespace-pre-wrap w-[53%] text-center text-sm lg:text-base">
                  {activeVisaFeeType === 'tourist' && (sub.tourist || 'N/A')}
                  {activeVisaFeeType === 'transit' && (sub.transit || 'N/A')}
                  {activeVisaFeeType === 'business' && (sub.business || 'N/A')}
                </td>
              </tr>
            ))
          ) : (
            <tr className="bg-[#FFEBEE]">
              <td className="border border-black px-2 lg:px-4 py-2 lg:py-3 text-center text-sm lg:text-base" colSpan={2}>
                {activeVisaFeeType ? 'No submission information available' : 'Select a visa type to view processing times'}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
)}

                    <div className="space-y-3">
                      <div className="bg-[#E8F0FF] rounded-lg w-full overflow-x-hidden mt-1">
                        <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-xl py-2 lg:py-3 rounded-t-lg w-full">
                          Visa Remarks
                        </div>                 
                        <div className="border-2 border-[#1e3a8a] border-t-0 overflow-hidden rounded-b-lg w-full">
                          <div className="min-h-[150px] lg:min-h-[180px] max-h-[150px] lg:max-h-[180px] overflow-y-auto p-1 bg-[#FFEBEE] w-full">
                            <div className="whitespace-pre-wrap break-words hyphens-auto text-justify w-full text-black p-1 text-sm lg:text-base">
                              {tour.visaForms?.[0]?.remarks || "No remarks available"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Book p./Canc p. Tab - Mobile responsive */}
              {activeTab === "book-p./canc-p." && (
                <div className="bg-[#E8F0FF] rounded-lg p-1">
                  <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg mb-1">
                    Booking & Cancellation Policy
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 mt-1">
                    <div className="flex flex-col h-[280px] lg:h-[320px]">
                      <div className="flex border-2 border-[#1e3a8a] border-b-0 rounded-t-lg overflow-hidden">
                        <div className="flex-1 bg-[#2E4D98] text-white text-center py-2 lg:py-3">
                          <h3 className="text-lg lg:text-xl font-bold">Booking Policy</h3>
                        </div>
                        <div className="w-[42%] bg-[#2E4D98] text-white text-center py-2 lg:py-3 border-l-2 border-[#1e3a8a]">
                          <h4 className="text-xs lg:text-lg font-bold">Amount</h4>
                        </div>
                      </div>

                      <div className="flex-1 border-2 border-[#1e3a8a] border-t-0 rounded-b-lg overflow-hidden">
                        <div className="overflow-y-auto h-full">
                          <div className="space-y-0">
                            {tour.booking.items.map((text, i) => (
                              <div
                                key={i}
                                className="border-b-[1px] border-black flex"
                              >
                                <div className="w-[58%] border-r-2 border-[#1e3a8a] p-2 lg:p-3">
                                  <span className="text-black text-xs lg:text-sm text-justify block">
                                    {text}
                                  </span>
                                </div>
                                
                                <div className="w-[42%] p-2 lg:p-3 text-start">
                                  <span className="text-xs lg:text-sm font-bold text-green-600 block">
                                    {tour.booking.amountDetails[i]}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col h-[280px] lg:h-[320px]">
                      <div className="flex border-2 border-[#1e3a8a] border-b-0 rounded-t-lg overflow-hidden">
                        <div className="flex-1 bg-[#A72703] text-white text-center py-2 lg:py-3">
                          <h3 className="text-lg lg:text-xl font-bold">Cancellation Policy</h3>
                        </div>
                        <div className="w-[42%] bg-[#A72703] text-white text-center py-2 lg:py-3 border-l-2 border-[#1e3a8a]">
                          <h4 className="text-xs lg:text-lg font-bold">Charge</h4>
                        </div>
                      </div>

                      <div className="flex-1 border-2 border-[#1e3a8a] border-t-0 rounded-b-lg overflow-hidden">
                        <div className="overflow-y-auto h-full">
                          <div className="space-y-0">
                            {tour.cancellation.policies.map((text, i) => (
                              <div
                                key={i}
                                className="border-b-[1px] border-black flex"
                              >
                                <div className="w-[58%] border-r-2 border-[#1e3a8a] p-2 lg:p-3">
                                  <span className="text-black text-xs lg:text-sm text-justify block">
                                    {text}
                                  </span>
                                </div>
                                
                                <div className="w-[42%] p-2 lg:p-3 text-start">
                                  <span className="text-xs lg:text-sm font-bold text-[#A72703] block">
                                    {tour.cancellation.charges[i]}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
<div className="grid grid-cols-1 lg:grid-cols-2 gap-1 mt-1">
  <div className="bg-[#E8F0FF] rounded-lg overflow-hidden">
    <div className="bg-[#2E4D98] text-white text-center font-bold text-lg lg:text-xl py-2 lg:py-2.5 rounded-t-lg">
      Booking Policy Remarks
    </div>
    <div className="border-2 border-[#1e3a8a] border-t-0 rounded-b-lg overflow-hidden">
      <div className="min-h-[140px] lg:min-h-[160px] max-h-[140px] lg:max-h-[160px] overflow-y-auto p-1.5 bg-[#FFEBEE] rounded-b-lg">
        {tour.bookingRemarks && tour.bookingRemarks.length > 0 ? (
          <ul className="space-y-0">
            {tour.bookingRemarks.map((remark, index) => (
              <li key={index} className="border-b-[1px] border-black last:border-b-0">
                <div className="p-1">
                  <span className="text-black whitespace-pre-wrap break-words text-sm lg:text-base text-justify">
                    {remark}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-gray-500 italic text-xs lg:text-sm">
              No booking policy remarks available
            </span>
          </div>
        )}
      </div>
    </div>
  </div>

  <div className="bg-[#E8F0FF] rounded-lg overflow-hidden">
    <div className="bg-[#A72703] text-white text-center font-bold text-lg lg:text-xl py-2 lg:py-2.5 rounded-t-lg">
      Cancellation Policy Remarks
    </div>
    <div className="border-2 border-[#1e3a8a] border-t-0 rounded-b-lg overflow-hidden">
      <div className="min-h-[140px] lg:min-h-[160px] max-h-[140px] lg:max-h-[160px] overflow-y-auto p-1.5 bg-[#FFEBEE] rounded-b-lg">
        {tour.cancellationRemarks && tour.cancellationRemarks.length > 0 ? (
          <ul className="space-y-0">
            {tour.cancellationRemarks.map((remark, index) => (
              <li key={index} className="border-b-[1px] border-black last:border-b-0">
                <div className="p-2">
                  <span className="text-black whitespace-pre-wrap break-words text-sm lg:text-base text-justify">
                    {remark}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-gray-500 italic text-xs lg:text-sm">
              No cancellation policy remarks available
            </span>
          </div>
        )}
      </div>
    </div>
  </div>
</div>
                </div>
              )}

              {/* Instructions Tab - Mobile responsive */}
              {activeTab === "instructions" && (
                <div className="bg-[#E8F0FF] rounded-lg p-1">
                  <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg">
                    Instructions
                  </div>

                  <div className="border-2 border-[#1e3a8a] border-t-0 overflow-hidden rounded-b-lg">
                    <div className="min-h-[250px] lg:min-h-[300px] max-h-[250px] lg:max-h-[320px] overflow-y-auto p-1 bg-[#FFEBEE]">
                      <div className="space-y-3 lg:space-y-4 p-0">
                        <div className="p-1 lg:p-2">
                          <ul className="space-y-1 lg:space-y-2 text-gray-700">
                            {tour.instructions.map((instruction, index) => (
                              <li key={index} className="text-justify whitespace-normal text-black text-sm lg:text-base">
                                {instruction}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons - Mobile responsive */}
        <div className="flex justify-between lg:justify-end mt-1 gap-1 lg:gap-0.5 flex-nowrap">
              <div className="w-[32%] lg:w-32 border border-green-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <PDFDownloadLink
                  document={
                    <TourPdfDocumentinternational
                      tour={tour || {}}
                      tourType={tourType}
                      isGroupTour={isGroupTour}
                      selectedCostMonth={selectedCostMonth}
                      selectedCostDate={selectedCostDate}
                      selectedDeparture={selectedDeparture}  
                      currentImageIndex={currentImageIndex}
                      tourImages={tour?.images || []}
                    />
                  }
                  fileName={`tour_${tour?.code || 'details'}_${new Date().toISOString().split('T')[0]}.pdf`}
                  onClick={handleDownloadPdf}
                  className="w-full"
                >
                  {({ blob, url, loading, error }) => (
                    <button
                      className={`w-full ${loading || isGeneratingPdf ? 'bg-green-900' : 'bg-green-700 hover:bg-green-800'} text-white font-bold py-2 lg:py-3 px-2 lg:px-3 flex items-center justify-center gap-1 lg:gap-2 transition-colors text-xs lg:text-sm`}
                      disabled={loading || isGeneratingPdf}
                    >
                      {loading || isGeneratingPdf ? (
                        <>
                          <svg className="animate-spin h-3 w-3 lg:h-4 lg:w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Generating...
                        </>
                      ) : (
                        <>
                          <Download className="h-3 w-3 lg:h-4 lg:w-4" />
                          Download
                        </>
                      )}
                    </button>
                  )}
                </PDFDownloadLink>
              </div>

              <div className="w-[32%] lg:w-32 border border-blue-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <button 
                  onClick={() => setShowEmailModal(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 lg:py-3 px-2 lg:px-3 flex items-center justify-center gap-1 lg:gap-2 transition-colors text-xs lg:text-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 lg:h-4 lg:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email
                </button>
              </div>

              <EmailModal
                isOpen={showEmailModal}
                onClose={() => setShowEmailModal(false)}
                onSubmit={handleEmailSubmit}
                tour={tour}
              />

              <div className="w-[32%] lg:w-32 border border-red-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <button
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 lg:py-3 px-2 lg:px-3 flex items-center justify-center gap-1 lg:gap-2 transition-colors text-xs lg:text-sm"
                  onClick={() => navigate('/checkout', { state: { tour } })}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 lg:h-4 lg:w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
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

export default International_Tourdetails;