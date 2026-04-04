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
import { Input } from "@/components/ui/input";
import { BASE_URL } from '@/ApiUrls';
import Footer from '@/components/Footer';
import { PDFDownloadLink } from '@react-pdf/renderer';
import TourPdfDocument from '../TourPdfDocument';
import { Download } from 'lucide-react';
import EmailModal from '../EmailModal';
import { FaSearch } from "react-icons/fa";
interface DepartureData {
  id?: any;
  description: string;
  status: string;
  price?: number;
}

interface EmailFormData {
  from: string;
  to: string;
  subject: string;
  message: string;
}

interface DayCardProps {
  dayNumber: string;
  headerColor: string;
  bodyColor: string;
  dayData?: {
    title?: string;
    description?: string;
    meals?: string;
  };
}

const DayCard = ({ dayNumber, headerColor, bodyColor, dayData }: DayCardProps) => {
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

              <div className={`
                ${headerColor} text-white border border-black rounded-lg
                px-1.5 lg:px-3 py-1.5
                flex items-center justify-center
                gap-1 lg:gap-3
                w-full max-w-[120px] lg:w-[130px]
                flex-shrink-0
              `}>
                <div className="flex items-center gap-1">
                  <div className="h-4 w-4 border border-gray-400 bg-white flex items-center justify-center">
                    {meals.B ? (
                      <svg className="h-3 w-3 text-blue-700" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="h-3 w-3 text-red-600" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </div>
                  <span className="text-white text-xs lg:text-sm font-bold">B</span>
                </div>

                <div className="flex items-center gap-1">
                  <div className="h-4 w-4 border border-gray-400 bg-white flex items-center justify-center">
                    {meals.L ? (
                      <svg className="h-3 w-3 text-blue-700" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="h-3 w-3 text-red-600" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </div>
                  <span className="text-white text-xs lg:text-sm font-bold">L</span>
                </div>

                <div className="flex items-center gap-1">
                  <div className="h-4 w-4 border border-gray-400 bg-white flex items-center justify-center">
                    {meals.D ? (
                      <svg className="h-3 w-3 text-blue-700" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="h-3 w-3 text-red-600" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
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

      <div className={`${bodyColor} rounded-lg border border-black overflow-hidden`}>
        <div className="p-2 text-black whitespace-pre-line text-justify h-[150px] overflow-y-auto">
          {dayData?.description || ""}
        </div>
      </div>
    </div>
  );
};

interface City {
  id: number;
  city_name: string;
  image: string;
  price: string;
}

interface ExhibitionItem {
  id: number;
  domestic_category_name: string;
  created_at: string;
  updated_at: string;
  cities: City[];
}

interface DomesticExhibition {
  id: number;
  domestic_category_name: string;
}

interface InternationalExhibition {
  id: number;
  international_category_name: string;
}

const Exhibitiondetail = () => {
  const { tourId } = useParams<{ tourId: string }>();
  const navigate = useNavigate();

const [durationRange, setDurationRange] = useState([0, 10]);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [domesticList, setDomesticList] = useState<string[]>([]);
  const [exhibitionData, setExhibitionData] = useState<ExhibitionItem[]>([]);
  const [loadingDomestic, setLoadingDomestic] = useState(false);
  const [internationalExhibitionData, setInternationalExhibitionData] = useState<InternationalExhibition[]>([]);
  const [internationalList, setInternationalList] = useState<string[]>([]);
  const [domesticExhibitionData, setDomesticExhibitionData] = useState<DomesticExhibition[]>([]);
  const [selectedMonth, setSelectedMonth] = useState("ALL");
const [openIndex, setOpenIndex] = useState(null);
const [selectedCostMonth, setSelectedCostMonth] = useState("");
const [selectedCostDate, setSelectedCostDate] = useState("");
  // Show More/Less states for sidebar
  const [showMoreDomestic, setShowMoreDomestic] = useState(false);
  const [showMoreInternational, setShowMoreInternational] = useState(false);
  
  // Selected filters for domestic and international categories
  const [selectedDomesticCategories, setSelectedDomesticCategories] = useState<string[]>([]);
  const [selectedInternationalCategories, setSelectedInternationalCategories] = useState<string[]>([]);
  
  const [priceRange, setPriceRange] = useState([0, 200000]);

  const [activeTab, setActiveTab] = useState("itinerary");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [loadingInternational, setLoadingInternational] = useState(false);
const [filteredTourData, setFilteredTourData] = useState<any>(null);
  const [tour, setTour] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [autoScrollInterval, setAutoScrollInterval] = useState<NodeJS.Timeout | null>(null);
const [searchQuery, setSearchQuery] = useState("");
const [showSearchBtn, setShowSearchBtn] = useState(false);
const [isSearchActive, setIsSearchActive] = useState(false);
  const handleAboutClick = () => {
    navigate('/exhibition', { state: { category: null } });
  };

  const formatPrice = (price: string | number) => {
    if (!price) return '₹0';
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return `₹${numPrice.toLocaleString('en-IN')}`;
  };

  const handleEmailSubmit = async (emailData: EmailFormData) => {
    try {
      setEmailLoading(true);

      const { pdf } = await import('@react-pdf/renderer');
      const TourPdfDocument = (await import('../TourPdfDocument')).default;

      const pdfInstance = (
        <TourPdfDocument
          tour={tour || {}}
          tourType="Individual"
          isGroupTour={false}
          selectedCostMonth=""
          selectedCostDate=""
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

      const response = await fetch(`${BASE_URL}/api/send-tour-pdf`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to send email');
      }

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



const processExhibitionData = (apiData: any, exhibitionImages: string[] = []) => {
  const {
    exhibition,
    tours,
    itineraries,
    departures,
    costs,
    optionaltours,
    emioptions,
    inclusions,
    exclusions,
    transports,
    hotels,
    bookingpoi,
    cancellationpolicies,
    instructions
  } = apiData;

  const tourData = tours && tours.length > 0 ? tours[0] : null;

  const getImages = () => {
    return exhibitionImages.length > 0 ? exhibitionImages : [
      "https://i.pinimg.com/736x/09/16/c4/0916c43d72ac007aee1a1a7d6d31d231.jpg",
      "https://i.pinimg.com/1200x/6a/f9/0e/6af90eea656d653c788e7d3f92a77247.jpg",
    ];
  };

  const processItinerary = () => {
    if (itineraries && itineraries.length > 0) {
      return itineraries.map((day: any, index: number) => ({
        day: `Day ${day.day || index + 1}`,
        title: day.title || `Day ${index + 1}`,
        description: day.description || '',
        meals: day.meals || ''
      }));
    }
    return [];
  };

  const formatPriceExhibition = (price: string | number) => {
  if (!price) return 'NA';
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  if (isNaN(numPrice)) return 'NA';
  return `₹${numPrice.toLocaleString('en-IN')}`;
};


  const transformDeparturesToGroupFormat = (departures: any[]) => {
  if (!departures || departures.length === 0) return [];
  
  return departures.map((dep, index) => {
    const startDate = new Date(dep.start_date);
    const endDate = new Date(dep.end_date);
    
    const month = startDate.toLocaleString('default', { month: 'short' }).toUpperCase();
    const year = startDate.getFullYear();
    const monthYear = `${month} ${year}`;
    
    const formatDate = (date: Date) => {
      const day = date.getDate();
      const month = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear();
      return `${day} ${month} ${year}`;
    };
    
    const getDayOfWeek = (date: Date) => {
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
      price: parseFloat(dep.standard_twin) || 0,
      threeStar: {
        twin: formatPriceExhibition(dep.standard_twin),
        triple: formatPriceExhibition(dep.standard_triple),
        childWithBed: formatPriceExhibition(dep.child_with_bed) || "NA",
        childWithoutBed: formatPriceExhibition(dep.child_without_bed) || "NA",
        infant: "NA",
        single: formatPriceExhibition(dep.standard_single)
      },
      fourStar: {
        twin: formatPriceExhibition(dep.deluxe_twin),
        triple: formatPriceExhibition(dep.deluxe_triple),
        childWithBed: "NA",
        childWithoutBed: "NA",
        infant: "NA",
        single: formatPriceExhibition(dep.deluxe_single)
      },
      fiveStar: {
        twin: formatPriceExhibition(dep.luxury_twin),
        triple: formatPriceExhibition(dep.luxury_triple),
        childWithBed: "NA",
        childWithoutBed: "NA",
        infant: "NA",
        single: formatPriceExhibition(dep.luxury_single)
      }
    };
  });
};
  // Transform departures to Group format
  const transformedDepartures = transformDeparturesToGroupFormat(departures);
  
  const processDepartures = () => {
    return {
      type: 'Group',
      data: transformedDepartures,
      descriptions: departures?.map((dep: any) => dep.description || '') || []
    };
  };

  const processTourCost = () => {
    if (costs && costs.length > 0) {
      return {
        tableData: costs.map((cost: any) => ({
          passenger: `${cost.pax} Pax`,
          standard: cost.standard_hotel !== "0.00" ? formatPriceExhibition(cost.standard_hotel) : "NA",
          deluxe: cost.deluxe_hotel !== "0.00" ? formatPriceExhibition(cost.deluxe_hotel) : "NA",
          executive: cost.executive_hotel !== "0.00" ? formatPriceExhibition(cost.executive_hotel) : "NA",
          childWithBed: cost.child_with_bed !== "0.00" ? formatPriceExhibition(cost.child_with_bed) : "NA",
          childNoBed: cost.child_no_bed !== "0.00" ? formatPriceExhibition(cost.child_no_bed) : "NA"
        })),
        remarks: tourData?.cost_remarks ? [tourData.cost_remarks] : []
      };
    }
    return {
      tableData: [],
      remarks: tourData?.cost_remarks ? [tourData.cost_remarks] : []
    };
  };

  const processOptionalTours = () => {
    if (optionaltours && optionaltours.length > 0) {
      return optionaltours.map((tour: any) => ({
        tourName: tour.tour_name || '',
        adultPrice: formatPriceExhibition(tour.adult_price),
        childPrice: formatPriceExhibition(tour.child_price)
      }));
    }
    return [];
  };

  const processEMIOptions = () => {
    if (emioptions && emioptions.length > 0) {
      return {
        loanAmount: formatPriceExhibition(emioptions[0]?.loan_amount),
        options: emioptions.map((option: any) => ({
          particulars: option.particulars || 'Per Month Payment',
          loanAmount: formatPriceExhibition(option.loan_amount),
          months: option.months || 0,
          emi: formatPriceExhibition(option.emi)
        }))
      };
    }
    return {
      loanAmount: "N/A",
      options: []
    };
  };
  
  const processBooking = () => {
    if (bookingpoi && bookingpoi.length > 0) {
      return {
        items: bookingpoi.map((item: any) => item.item || ''),
        amountDetails: bookingpoi.map((item: any) => formatPriceExhibition(item.amount_details))
      };
    }
    return {
      items: ["Standard booking terms apply"],
      amountDetails: ["0"]
    };
  };

  const processHotels = () => {
    if (hotels && hotels.length > 0) {
      return {
        tableData: hotels.map((hotel: any) => ({
          city: hotel.city,
          nights: `${hotel.nights} Night${hotel.nights > 1 ? 's' : ''}`,
          standard: hotel.standard_hotel_name || "N/A",
          deluxe: hotel.deluxe_hotel_name || "N/A",
          executive: hotel.executive_hotel_name || "N/A",
        })),
        remarks: tourData?.hotel_remarks ? [tourData.hotel_remarks] : []
      };
    }
    return {
      tableData: [],
      remarks: tourData?.hotel_remarks ? [tourData.hotel_remarks] : []
    };
  };

  const processTransport = () => {
    if (transports && transports.length > 0) {
      return {
        tableData: transports.map((transport: any) => ({
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
        remarks: tourData?.transport_remarks ? [tourData.transport_remarks] : []
      };
    }
    return {
      tableData: [],
      remarks: tourData?.transport_remarks ? [tourData.transport_remarks] : []
    };
  };

  const processCancellation = () => {
    if (cancellationpolicies && cancellationpolicies.length > 0) {
      return {
        policies: cancellationpolicies.map((policy: any) => policy.cancellation_policy || ''),
        charges: cancellationpolicies.map((policy: any) => policy.charges || '')
      };
    }
    return {
      policies: [],
      charges: []
    };
  };

  const processInstructions = () => {
    if (instructions && instructions.length > 0) {
      return instructions.map((inst: any) => inst.item || '');
    }
    return [];
  };

  return {
    title: exhibition?.domestic_category_name || tourData?.title || "Exhibition Tour",
    duration: formatDuration(tourData?.duration_days || 2),
    cityName: tourData?.city_name || "",
    price: formatPriceExhibition(tourData?.base_price_adult || 0),
    emi: calculateEMI(tourData?.base_price_adult || 0),
    code: tourData?.tour_code || "N/A",
    overview: tourData?.overview || "Tour overview not available",
    images: getImages(),
    itinerary: processItinerary(),
    departures: processDepartures(),
    inclusionExclusion: {
      inclusions: inclusions?.map((inc: any) => inc.item) || [],
      exclusions: exclusions?.map((exc: any) => exc.item) || []
    },
    hotels: processHotels(),
    airlines: processTransport(),
    tourCost: processTourCost(),
    optionalTours: processOptionalTours(),
    emiOptions: processEMIOptions(),
    booking: processBooking(),
    cancellation: processCancellation(),
    instructions: processInstructions(),
    bookingRemarks: tourData?.booking_poi_remarks ? [tourData.booking_poi_remarks] : [],
    cancellationRemarks: tourData?.cancellation_remarks ? [tourData.cancellation_remarks] : [],
    emiRemarks: tourData?.emi_remarks ? [tourData.emi_remarks] : [],
    optionalTourRemarks: tourData?.optional_tour_remarks ? [tourData.optional_tour_remarks] : [],
    additionalRemarks: []
  };
};

const formatDuration = (days: number) => {
  const nights = days - 1;
  return `${nights}N/${days}D`;
};

const calculateEMI = (price: string | number) => {
  if (!price) return 'EMI from ₹0/month';
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  if (isNaN(numPrice)) return 'EMI from ₹0/month';
  const emiAmount = Math.round(numPrice / 6);
  return `EMI from ₹${emiAmount.toLocaleString('en-IN')}/month`;
};
  const fetchExhibitionDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${BASE_URL}/api/exhibitions/domestic/${tourId}/details`);

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error('Failed to fetch exhibition data');
      }

      const exhibitionId = result.data?.exhibition?.id || tourId;
      let images: string[] = [];

      try {
        const imagesResponse = await fetch(`${BASE_URL}/api/exhibitions/exhibition-images/${exhibitionId}`);
        if (imagesResponse.ok) {
          const imagesData = await imagesResponse.json();
          if (Array.isArray(imagesData) && imagesData.length > 0) {
            images = imagesData
              .filter(img => img.url)
              .map(img => img.url);
          }
        }
      } catch (imgError) {
        console.error('Error fetching exhibition images:', imgError);
      }

      if (images.length === 0) {
        images = [
          "https://i.pinimg.com/736x/09/16/c4/0916c43d72ac007aee1a1a7d6d31d231.jpg",
          "https://i.pinimg.com/1200x/6a/f9/0e/6af90eea656d653c788e7d3f92a77247.jpg",
        ];
      }

      const processedData = processExhibitionData(result.data, images);
      setTour(processedData);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching exhibition details:', err);
    } finally {
      setLoading(false);
    }
  };



useEffect(() => {
  if (!tour) return;
  
  const tourDuration = tour.duration ? parseInt(tour.duration.split('/')[1]) || 0 : 0;
  
  const isWithinDuration = tourDuration >= durationRange[0] && tourDuration <= durationRange[1];
  
  if (isWithinDuration) {
    setFilteredTourData(tour);
  } else {
    setFilteredTourData(null);
  }
}, [durationRange, tour]);

  useEffect(() => {
    if (tourId) {
      fetchExhibitionDetails();
    }
  }, [tourId]);

  // Fetch Domestic Data
  useEffect(() => {
    const fetchDomesticData = async () => {
      setLoadingDomestic(true);
      try {
        const response = await fetch(`${BASE_URL}/api/exhibitions/domestic`);
        if (!response.ok) throw new Error(`Failed: ${response.status}`);
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          const categories = data
            .map((item: any) => item.domestic_category_name)
            .filter((category: string) => category && category.trim() !== '');
          setDomesticList(categories);
          setDomesticExhibitionData(data);
          setExhibitionData(data);
        } else {
          setDomesticList([]);
          setExhibitionData([]);
        }
      } catch (error) {
        console.error("Error fetching domestic:", error);
        setDomesticList([]);
        setExhibitionData([]);
      } finally {
        setLoadingDomestic(false);
      }
    };
    fetchDomesticData();
  }, []);

  // Fetch International Data
  useEffect(() => {
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
    fetchInternationalData();
  }, []);

  const handleInternationalClick = (category: string) => {
    const found = internationalExhibitionData.find(
      (item) => item.international_category_name === category
    );
    if (found) {
      navigate(`/exhibitioninternationalindetail/${found.id}`);
    }
  };

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



const formatPriceExhibition = (price) => {
  if (typeof price === 'number') {
    return `₹${price.toLocaleString('en-IN')}`;
  }
  return price || '₹0';
};

// Helper function to toggle tables
const toggleTable = (index) => {
  setOpenIndex(openIndex === index ? null : index);
};

// Add this memoized function to process departures by month
const departuresByMonth = React.useMemo(() => {
  if (!tour?.departures?.data) return {};
  const map = {};
  tour.departures.data.forEach(dep => {
    if (!map[dep.month]) map[dep.month] = [];
    map[dep.month].push(dep);
  });
  return map;
}, [tour?.departures?.data]);

const availableMonths = Object.keys(departuresByMonth);
const filteredDepartureData = selectedMonth === "ALL"
  ? (tour?.departures?.data || [])
  : (tour?.departures?.data?.filter(d => d.month === selectedMonth) || []);

const availableDates = selectedCostMonth && departuresByMonth[selectedCostMonth]
  ? departuresByMonth[selectedCostMonth]
  : [];
const selectedDeparture = availableDates.find(d => d.fromDate === selectedCostDate);
  // Get current exhibition ID to highlight active item
  const currentExhibitionId = tourId ? parseInt(tourId) : null;

  useEffect(() => {
    if (tour?.images && tour.images.length > 1) {
      const interval = setInterval(() => {
        nextImage();
      }, 5000);
      setAutoScrollInterval(interval);
      return () => {
        if (interval) clearInterval(interval);
      };
    }
  }, [tour?.images]);

  const resetAutoScroll = () => {
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
    }
    if (tour?.images && tour.images.length > 1) {
      const interval = setInterval(() => {
        nextImage();
      }, 5000);
      setAutoScrollInterval(interval);
    }
  };

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

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Add this effect to filter content based on search
useEffect(() => {
  if (!tour) return;
  
  if (isSearchActive && searchQuery.trim() !== "") {
    const query = searchQuery.trim().toLowerCase();
    // Filter itinerary
    const filteredItinerary = tour.itinerary?.filter((day: any) => 
      day.title?.toLowerCase().includes(query) || 
      day.description?.toLowerCase().includes(query)
    );
    
    // Filter departure data
    const filteredDepartures = tour.departures?.data?.filter((dep: any) => 
      dep.fromDate?.toLowerCase().includes(query) || 
      dep.toDate?.toLowerCase().includes(query) ||
      dep.status?.toLowerCase().includes(query)
    );
    
    setFilteredTourData({
      ...tour,
      itinerary: filteredItinerary,
      departures: { ...tour.departures, data: filteredDepartures }
    });
  } else {
    setFilteredTourData(tour);
  }
}, [isSearchActive, searchQuery, tour]);

  const clearSearch = () => {
  setSearchQuery("");
  setShowSearchBtn(false);
  setIsSearchActive(false);
};

const handleSearch = (e: React.FormEvent) => {
  e.preventDefault();
  if (searchQuery.trim() === "") return;

  const query = searchQuery.trim().toLowerCase();

  // Check domestic first
  const domesticMatch = domesticExhibitionData.find(item =>
    item.domestic_category_name.toLowerCase().includes(query)
  );

  if (domesticMatch) {
    navigate(`/exhibitiondetail/${domesticMatch.id}`);
    return;
  }

  // Check international
  const internationalMatch = internationalExhibitionData.find(item =>
    item.international_category_name.toLowerCase().includes(query)
  );

  if (internationalMatch) {
    navigate(`/exhibitioninternationalindetail/${internationalMatch.id}`);
    return;
  }

  // No match found
  alert("No exhibition found for: " + searchQuery);
};

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFEBEE]">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center flex flex-col items-center justify-center gap-4">
          <span className="animate-spin h-12 w-12 border-4 border-blue-200 border-t-blue-600 rounded-full" />
          <div className="text-2xl font-bold text-[#2E4D98]">Loading exhibition details...</div>
          <div className="text-gray-600">Fetching data from the server</div>
        </div>
      </div>
    );
  }

  if (error || !tour) {
    return (
      <div className="min-h-screen bg-[#FFEBEE]">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="text-2xl font-bold text-red-600">Error loading tour</div>
          <div className="mt-4 text-gray-600">{error || 'Tour not found'}</div>
          <Button
            onClick={() => navigate('/exhibition')}
            className="mt-6 bg-[#2E4D98] hover:bg-[#2E4D98] hover:opacity-90 text-white"
          >
            Back to Exhibitions
          </Button>
          <Button
            onClick={fetchExhibitionDetails}
            className="mt-4 ml-4 bg-[#E53C42] hover:bg-[#E53C42] hover:opacity-90 text-white"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const dayCardColors = [
    { dayNumber: "Day 01", headerColor: "bg-[#A72703]", bodyColor: "bg-[#FFE797]" },
    { dayNumber: "Day 02", headerColor: "bg-[#A72703]", bodyColor: "bg-[#FFE797]" },
    { dayNumber: "Day 03", headerColor: "bg-[#A72703]", bodyColor: "bg-[#FFE797]" },
    { dayNumber: "Day 04", headerColor: "bg-[#A72703]", bodyColor: "bg-[#FFE797]" },
    { dayNumber: "Day 05", headerColor: "bg-[#A72703]", bodyColor: "bg-[#FFE797]" },
  ];

  return (
    <>
      <div className="min-h-screen bg-[#FFEBEE]">
        <Header />

        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar - EXACT same as ExhibitionView */}
       <aside className="lg:w-80">
  <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl shadow-lg p-6 border border-blue-200 sticky top-24">
    {/* Header with Clear All button - Updated */}
    <div className="flex justify-between items-center mb-4 bg-white p-2 rounded-lg border border-black">
      <h2 className="text-2xl font-bold text-[#2E4D98]">Exhibitions</h2>
      <button
        onClick={() => {
          // Reset all filters
          setDurationRange([0, 10]);
          setPriceRange([0, 200000]);
          setSelectedDomesticCategories([]);
          setSelectedInternationalCategories([]);
          setSelectedMonth("ALL");
          setSelectedCostMonth("");
          setSelectedCostDate("");
          setOpenIndex(null);
          // Navigate back to main exhibition page
         
        }}
        className="text-sm text-[#E53C42] hover:underline"
      >
        Clear All
      </button>
    </div>

    <div className="mt-3 mb-4">
      <div
        onClick={handleAboutClick}
        className="flex justify-between items-center p-2 rounded-lg cursor-pointer border border-black bg-white text-[#2E4D98]"
      >
        <h2 className="text-xl font-bold text-[#2E4D98]">About Exhibition</h2>
        <span className="text-xs">▶</span>
      </div>
    </div>

    {/* Exhibition Range Filter */}
    <div className="mb-6">
      <h3 className="font-semibold text-lg mb-4 text-[#2E4D98]">Exhibition Range</h3>
      <div className="flex justify-between text-sm text-gray-600 mb-3">
        <span>{durationRange[0]} days</span>
        <span>{durationRange[1]} days</span>
      </div>
      <Slider 
        value={durationRange} 
        onValueChange={setDurationRange}
        max={10} 
        step={1} 
        className="w-full" 
      />
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
        max={200000}
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
            .map((category) => {
              const found = domesticExhibitionData.find(
                item => item.domestic_category_name === category
              );
              const isActive = found?.id === currentExhibitionId;
              return (
                <div key={category} className="flex items-center gap-3 cursor-pointer">
                  <Checkbox
                    checked={selectedDomesticCategories.includes(category) || isActive}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedDomesticCategories([category]);
                        setSelectedInternationalCategories([]);
                        handleDomesticClick(category);
                      } else {
                        setSelectedDomesticCategories([]);
                      }
                    }}
                    className="data-[state=checked]:bg-[#2E4D98] data-[state=checked]:border-[#2E4D98]"
                  />
                  <span
                    className={`text-gray-700 hover:text-[#2E4D98] cursor-pointer ${
                      isActive ? 'font-bold text-[#2E4D98]' : ''
                    }`}
                    onClick={() => {
                      setSelectedDomesticCategories([category]);
                      setSelectedInternationalCategories([]);
                      handleDomesticClick(category);
                    }}
                  >
                    {category}
                  </span>
                </div>
              );
            })
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
    
    {/* International Exhibition Section */}
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
              const isActive = found?.id === currentExhibitionId;
              return (
                <div key={category} className="flex items-center gap-3 cursor-pointer">
                  <Checkbox
                    checked={selectedInternationalCategories.includes(category) || isActive}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedInternationalCategories([category]);
                        setSelectedDomesticCategories([]);
                        handleInternationalClick(category);
                      } else {
                        setSelectedInternationalCategories([]);
                      }
                    }}
                    className="data-[state=checked]:bg-[#2E4D98] data-[state=checked]:border-[#2E4D98]"
                  />
                  <span
                    className={`text-gray-700 hover:text-[#2E4D98] cursor-pointer ${
                      isActive ? 'font-bold text-[#2E4D98]' : ''
                    }`}
                    onClick={() => {
                      setSelectedInternationalCategories([category]);
                      setSelectedDomesticCategories([]);
                      handleInternationalClick(category);
                    }}
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
</aside>

            <main className="flex-1">
  <div className="bg-[#2E3A8A] text-white text-center py-3 font-semibold text-md mb-2">
  Domestic Exhibition
</div>

<div className="w-full overflow-hidden border-black border mb-2">
  <div className="flex w-full divide-x divide-black">
    
    {/* City Label */}
    <div className="w-1/5 flex items-center justify-center p-3 bg-[#2E3A8A]">
      <span className="font-bold text-white">City:</span>
    </div>

    {/* City Value */}
    <div className="w-1/5 flex items-center justify-center p-3 bg-blue-100">
      <span className="text-[#2E3A8A]  font-bold">{tour.cityName || "City"}</span>
    </div>

    {/* Exhibition Label */}
    <div className="w-1/5 flex items-center justify-center p-3 bg-[#2E3A8A]">
      <span className="font-bold text-white">Exhibition:</span>
    </div>

    {/* Exhibition Value */}
    <div className="w-1/5 flex items-center justify-center p-3 bg-blue-100">
      <span className="text-[#2E3A8A] font-bold text-sm text-center">{tour.title || "Exhibition Name"}</span>
    </div>
{/* Search - 5th column */}
<div className="w-1/5 flex items-center" style={{ backgroundColor: "red" }}>
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
      className="flex-1 px-2 py-2 text-sm outline-none border-none w-full"
      style={{
        backgroundColor: "red",
        color: "white"
      }}
    />
    {searchQuery && (
      <button
        type="button"
        onClick={clearSearch}
        className="px-1 " style={{
        backgroundColor: "red",
        color: "white"
      }}
      >
        ✕
      </button>
    )}
    {searchQuery && (
      <button
        type="submit"
        className="text-white p-3"
      >
        <FaSearch size={16} />
      </button>
    )}
  </form>
</div>

  </div>
</div>


 


              <div className="flex flex-col gap-0.6">
                <div className="relative rounded-2xl overflow-hidden mb-1">
                  <div className="relative h-64 sm:h-80 lg:h-[500px] overflow-hidden">
                    <img
                      src={tour.images[currentImageIndex]}
                      alt={tour.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
                    />

                    {tour.images.length > 1 && (
                      <>
                        <button
                          onClick={() => {
                            prevImage();
                            resetAutoScroll();
                          }}
                          className="absolute left-2 lg:left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 lg:p-2 rounded-full transition-all duration-200"
                        >
                          <ChevronLeft className="w-4 h-4 lg:w-6 lg:h-6" />
                        </button>
                        <button
                          onClick={() => {
                            nextImage();
                            resetAutoScroll();
                          }}
                          className="absolute right-2 lg:right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 lg:p-2 rounded-full transition-all duration-200"
                        >
                          <ChevronRight className="w-4 h-4 lg:w-6 lg:h-6" />
                        </button>
                      </>
                    )}

                    {tour.images.length > 1 && (
                      <div className="absolute top-2 lg:top-4 right-2 lg:right-4 bg-black/50 text-white px-2 lg:px-3 py-0.5 lg:py-1 rounded-full text-xs lg:text-sm">
                        {currentImageIndex + 1} / {tour.images.length}
                      </div>
                    )}
                  </div>

                  {tour.images.length > 1 && (
                    <div className="bg-gradient-to-r from-blue-100 to-blue-100 p-2 lg:p-4 border-t">
                      <div className="flex justify-center gap-1 lg:gap-2 overflow-x-auto pb-2">
                        {tour.images.map((image: string, index: number) => (
                          <button
                            key={index}
                            onClick={() => {
                              goToImage(index);
                              resetAutoScroll();
                            }}
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

                {/* Excel-like Table Layout */}
                <div className="bg-white rounded-xl shadow-sm mb-1.5 overflow-hidden border border-black overflow-x-auto">
                  <div className="min-w-[800px] lg:min-w-0">
                    <div className="grid grid-cols-8 bg-[#E8F0FF] border-b border-black">
                      <div className="border-r border-white bg-[#2E3a8a] px-2 lg:px-4 py-2 lg:py-3">
                        <h3 className="font-bold text-white text-left text-sm lg:text-lg"> City</h3>
                      </div>
                      <div className="col-span-6 border-r border-white bg-[#2E3a8a] px-2 lg:px-4 py-2 lg:py-3">
                        <h3 className="font-bold text-white text-left text-sm lg:text-lg">Exhibition Name</h3>
                      </div>
                      <div className="px-2 lg:px-4 py-2 lg:py-3 bg-[#2E3a8a]">
                        <h3 className="font-bold text-white text-start text-sm lg:text-lg">Days</h3>
                      </div>
                    </div>

                    <div className="grid grid-cols-8 border-black">
                      <div className="border-r border-black px-1 lg:px-4 py-2 lg:py-3 bg-blue-50">
                        <p className="text-sm lg:text-lg font-bold text-[#2E4D98] text-left tracking-wide">
                          {tour.cityName}
                        </p>
                      </div>
                      <div className="col-span-6 border-r border-black px-2 lg:px-4 py-2 lg:py-3 bg-blue-50">
                        <p className="text-sm lg:text-lg font-semibold text-gray-900 text-left break-words ">
                          {tour.title}
                        </p>
                      </div>
                      <div className="px-2 lg:px-4 py-2 lg:py-3 bg-red-50">
                        <p className="text-sm lg:text-lg font-bold text-[#E53C42] text-left">
                          {tour.duration}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-8 bg-white border-t border-black">
                      {[
                        "Itinerary",
                        "Dep Date",
                        "Tour Cost",
                        "Cost inc./Cost ex.",
                        "Flights & Hotels",
                        "Bookings POI",
                        "Cancellation",
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

                {/* Tab Content */}
                <div className="bg-[#2E4D98] rounded-md shadow-sm p-2 lg:p-4">
                  {activeTab === "itinerary" && (
                    <div className="bg-[#C2E2FA] rounded-lg p-1 h-full">
                      <div className="mx-auto bg-white rounded-lg shadow-lg h-full flex flex-col min-h-0">
                        <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 rounded-t-lg flex-shrink-0">
                          Tour Itinerary
                        </div>

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
                              {tour.itinerary.map((day: any, index: number) => (
                                <DayCard
                                  key={index}
                                  dayNumber={day.day}
                                  headerColor={dayCardColors[index % dayCardColors.length]?.headerColor || "bg-[#A72703]"}
                                  bodyColor={dayCardColors[index % dayCardColors.length]?.bodyColor || "bg-[#FFE797]"}
                                  dayData={day}
                                />
                              ))}
                              <div className="pt-0">
                                <button
                                  onClick={() => navigate("/alert")}
                                  className="w-full font-bold py-2 rounded-lg border bg-[#A72703] text-white border-black transition-opacity hover:opacity-90 text-sm lg:text-base"
                                >
                                  Customize your tour on chargeable basis
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
{activeTab === "dep-date" && (
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
                  {formatPriceExhibition(item.price)}
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
                      { particular: "Per pax on Twin Basis", star3: item.threeStar?.twin || "NA", star4: item.fourStar?.twin || "NA", star5: item.fiveStar?.twin || "NA" },
                      { particular: "Per pax on Triple Basis", star3: item.threeStar?.triple || "NA", star4: item.fourStar?.triple || "NA", star5: item.fiveStar?.triple || "NA" },
                      // { particular: "Child with Bed", star3: item.threeStar?.childWithBed || "NA", star4: item.fourStar?.childWithBed || "NA", star5: item.fiveStar?.childWithBed || "NA" },
                      // { particular: "Child without Bed", star3: item.threeStar?.childWithoutBed || "NA", star4: item.fourStar?.childWithoutBed || "NA", star5: item.fiveStar?.childWithoutBed || "NA" },
                      // { particular: "Infant", star3: item.threeStar?.infant || "NA", star4: item.fourStar?.infant || "NA", star5: item.fiveStar?.infant || "NA" },
                      { particular: "Per pax Single Occupancy", star3: item.threeStar?.single || "NA", star4: item.fourStar?.single || "NA", star5: item.fiveStar?.single || "NA" },
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


    <div className="mt-1">
      <button
        onClick={() => navigate("/alert")}
        className="w-full font-bold py-2 rounded-lg border bg-[#A72703] text-white border-black transition-opacity hover:opacity-90 text-sm lg:text-base"
      >
        Customize your tour on chargeable basis
      </button>
    </div>
  </div>
)}

            {activeTab === "tour-cost" && (
  <div className="bg-[#E8F0FF] rounded-lg p-1">
    <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg mb-1.5">
      Tour Cost
    </div>

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
                  star3: selectedDeparture.threeStar?.twin || "NA",
                  star4: selectedDeparture.fourStar?.twin || "NA",
                  star5: selectedDeparture.fiveStar?.twin || "NA"
                },
                {
                  particular: "Per pax on Triple Basis",
                  star3: selectedDeparture.threeStar?.triple || "NA",
                  star4: selectedDeparture.fourStar?.triple || "NA",
                  star5: selectedDeparture.fiveStar?.triple || "NA"
                },
                // {
                //   particular: "Child with Bed",
                //   star3: selectedDeparture.threeStar?.childWithBed || "NA",
                //   star4: selectedDeparture.fourStar?.childWithBed || "NA",
                //   star5: selectedDeparture.fiveStar?.childWithBed || "NA"
                // },
                // {
                //   particular: "Child without Bed",
                //   star3: selectedDeparture.threeStar?.childWithoutBed || "NA",
                //   star4: selectedDeparture.fourStar?.childWithoutBed || "NA",
                //   star5: selectedDeparture.fiveStar?.childWithoutBed || "NA"
                // },
                // {
                //   particular: "Infant",
                //   star3: selectedDeparture.threeStar?.infant || "NA",
                //   star4: selectedDeparture.fourStar?.infant || "NA",
                //   star5: selectedDeparture.fiveStar?.infant || "NA"
                // },
                {
                  particular: "Per pax Single Occupancy",
                  star3: selectedDeparture.threeStar?.single || "NA",
                  star4: selectedDeparture.fourStar?.single || "NA",
                  star5: selectedDeparture.fiveStar?.single || "NA"
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

    {/* Tour Cost Remarks */}
    <div className="bg-[#E8F0FF] rounded-lg w-full overflow-x-hidden mt-1">
      <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg w-full">
        Tour Cost Remarks
      </div>
      <div className="border-2 border-[#1e3a8a] border-t-0 overflow-hidden rounded-b-lg w-full">
        <div className="min-h-[150px] lg:min-h-[180px] max-h-[150px] lg:max-h-[180px] overflow-y-auto p-2 bg-[#FFEBEE] w-full">
          {tour.tourCost.remarks && tour.tourCost.remarks.length > 0 ? (
            <ul className="space-y-2 w-full">
              {tour.tourCost.remarks.map((remark: string, index: number) => (
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

    {/* Optional Tour Section */}
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
                {tour.optionalTours && tour.optionalTours.length > 0 ? (
                  tour.optionalTours.map((optTour: any, index: number) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-[#FFEBEE]" : "bg-[#FFEBEE]/80"}>
                      <td className="border border-black px-2 lg:px-4 py-1 lg:py-2 text-black text-xs lg:text-sm">
                        {optTour.tourName || "N/A"}
                      </td>
                      <td className="border border-black px-2 lg:px-4 py-1 lg:py-2 border-l-0 text-black text-xs lg:text-sm">
                        {optTour.adultPrice || "N/A"}
                      </td>
                      <td className="border border-black px-2 lg:px-4 py-1 lg:py-2 border-l-0 text-black text-xs lg:text-sm">
                        {optTour.childPrice || "N/A"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="bg-[#FFEBEE]">
                    <td colSpan={3} className="border border-black px-2 lg:px-4 py-2 lg:py-3 text-center text-gray-500 text-xs lg:text-sm">
                      No optional tours available
                    </td>
                  </tr>
                )}
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
                {tour.emiOptions && tour.emiOptions.options && tour.emiOptions.options.length > 0 ? (
                  tour.emiOptions.options.map((emi: any, index: number) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-[#FFEBEE]" : "bg-[#FFEBEE]/80"}>
                      <td className="border border-black px-2 lg:px-4 py-1 lg:py-2 border-l-0 text-center text-black text-xs lg:text-sm">
                        {emi.loanAmount || "N/A"}
                      </td>
                      <td className="border border-black px-2 lg:px-4 py-1 lg:py-2 border-l-0 text-center text-black text-xs lg:text-sm">
                        {emi.months || "N/A"}
                      </td>
                      <td className="border border-black px-2 lg:px-4 py-1 lg:py-2 border-l-0 text-center text-black text-xs lg:text-sm">
                        {emi.emi || "N/A"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="bg-[#FFEBEE]">
                    <td colSpan={3} className="border border-black px-2 lg:px-4 py-2 lg:py-3 text-center text-gray-500 text-xs lg:text-sm">
                      No EMI options available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    {/* Optional Tour Remarks */}
    <div className="flex flex-col lg:flex-row gap-1 mt-1 w-full">
      <div className="bg-[#E8F0FF] rounded-lg w-full lg:w-1/2 overflow-x-hidden">
        <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg w-full">
          Optional Tour Remarks
        </div>
        <div className="border-2 border-[#1e3a8a] border-t-0 overflow-hidden rounded-b-lg w-full">
          <div className="min-h-[150px] lg:min-h-[180px] max-h-[150px] lg:max-h-[180px] overflow-y-auto p-2 bg-[#FFEBEE] w-full">
            {tour.optionalTourRemarks && tour.optionalTourRemarks.length > 0 ? (
              <ul className="space-y-2 w-full">
                {tour.optionalTourRemarks.map((remark: string, index: number) => (
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
                {tour.emiRemarks.map((remark: string, index: number) => (
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

    <div className="mt-1">
      <button
        onClick={() => navigate("/alert")}
        className="w-full font-bold py-2 rounded-lg border bg-[#A72703] text-white border-black transition-opacity hover:opacity-90 text-sm lg:text-base"
      >
        Customize your tour on chargeable basis
      </button>
    </div>
  </div>
)}
                    {/* Cost In/Cost Ex Tab */}
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
                                  {tour.inclusionExclusion.inclusions.map((inclusion: string, index: number) => (
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
                                  {tour.inclusionExclusion.exclusions.map((exclusion: string, index: number) => (
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
                        <div className="mt-1">
                          <button
                            onClick={() => navigate("/alert")}
                            className="w-full font-bold py-2 rounded-lg border bg-[#A72703] text-white border-black transition-opacity hover:opacity-90 text-sm lg:text-base"
                          >
                            Customize your tour on chargeable basis
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Flights & Hotels Tab */}
                    {activeTab === "flights-&-hotels" && (
                      <div className="bg-[#E8F0FF] rounded-lg p-0.2 w-full overflow-x-hidden">
                        {/* Flights Section */}
                        <div className="bg-[#FFEBEE] rounded-lg p-1 mb-1 w-full">
                          <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg w-full">
                            Flight Details
                          </div>

                          <div className="border-2 border-[#1e3a8a] rounded-t-none border-t-0 rounded-lg overflow-hidden w-full mb-1">
                            <div className="min-h-[250px] lg:min-h-[300px] max-h-[300px] lg:max-h-[400px] overflow-y-auto p-1 bg-[#FFEBEE] w-full">
                              <div>
                                {tour.airlines.tableData && tour.airlines.tableData.length > 0 ? (
                                  <div className="space-y-4 w-full">
                                    {tour.airlines.tableData.map((flight: any, index: number) => (
                                      <div key={index} className="border-gray-200 overflow-hidden">
                                        {flight.description && (
                                          <div>
                                            <p className="text-black p-1 text-sm lg:text-base">
                                              {flight.description}
                                            </p>
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="flex items-center justify-center h-full min-h-[150px] lg:min-h-[200px]">
                                    <p className="text-gray-500 text-base lg:text-lg">No information available</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Flight Remarks */}
                          {tour.airlines.remarks.length > 0 && (
                            <div className="mb-1">
                              <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-xl py-2 lg:py-3 rounded-t-lg w-full">
                                Flight Remarks
                              </div>
                              <div className="border-2 border-t-0 border-[#1e3a8a] rounded-b-lg overflow-hidden w-full">
                                <div className="min-h-[120px] lg:min-h-[150px] max-h-[120px] lg:max-h-[160px] overflow-y-auto p-2 bg-[#FFEBEE] w-full">
                                  <ul className="space-y-2 w-full">
                                    {tour.airlines.remarks.map((remark: string, index: number) => (
                                      <li key={`flight-${index}`} className="flex items-start gap-1 w-full">
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
                        <div className='p-1 -mt-3 w-full overflow-x-hidden'>
                          <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-xl rounded-t-lg py-2 lg:py-3 mb-1 w-full">
                            Hotel Details
                          </div>

                          <div className="overflow-x-auto w-full">
                            {tour.hotels.tableData.length > 0 ? (
                              <table className="w-full border-collapse min-w-[600px] lg:min-w-max">
                                <thead>
                                  <tr className="bg-[#2E4D98]">
                                    <th className="border border-white px-2 lg:px-3 py-2 lg:py-3 text-left text-white text-xs lg:text-sm w-[22.5%]">City</th>
                                    <th className="border border-white px-2 lg:px-3 py-2 lg:py-3 text-left text-white text-xs lg:text-sm w-[10%]">Nights</th>
                                    <th className="border border-white px-2 lg:px-3 py-2 lg:py-3 text-left text-white text-xs lg:text-sm w-[22.5%]">Standard</th>
                                    <th className="border border-white px-2 lg:px-3 py-2 lg:py-3 text-left text-white text-xs lg:text-sm w-[22.5%]">Deluxe</th>
                                    <th className="border border-white px-2 lg:px-3 py-2 lg:py-3 text-left text-white text-xs lg:text-sm w-[22.5%]">Executive</th>
                                  </tr>
                                </thead>
                                <tbody className="border-2 border-[#1e3a8a] border-t-0">
                                  {tour.hotels.tableData.map((hotel: any, index: number) => (
                                    <tr key={index} className={index % 2 === 0 ? "bg-[#FFEBEE]" : "bg-[#FFEBEE]/80"}>
                                      <td className="border border-black px-1 lg:px-2 py-1 lg:py-2 break-all whitespace-pre-wrap text-black text-xs lg:text-sm">{hotel.city}</td>
                                      <td className="border border-black px-1 lg:px-2 py-1 lg:py-2 break-all whitespace-pre-wrap text-black text-xs lg:text-sm">{hotel.nights}</td>
                                      <td className="border border-black px-1 lg:px-2 py-1 lg:py-2 break-all whitespace-pre-wrap text-black text-xs lg:text-sm">{hotel.standard}</td>
                                      <td className="border border-black px-1 lg:px-2 py-1 lg:py-2 break-all whitespace-pre-wrap text-xs lg:text-sm">{hotel.deluxe}</td>
                                      <td className="border border-black px-1 lg:px-2 py-1 lg:py-2 break-all whitespace-pre-wrap text-xs lg:text-sm">{hotel.executive}</td>
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

                          {/* Hotel Remarks */}
                          {tour.hotels.remarks.length > 0 && (
                            <div className="bg-[#E8F0FF] rounded-lg mt-1 w-full overflow-x-hidden">
                              <div className="mb-0">
                                <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-xl py-2 lg:py-3 rounded-t-lg w-full">
                                  Hotel Remarks
                                </div>
                                <div className="border-2 border-t-0 border-[#1e3a8a] rounded-b-lg overflow-hidden w-full">
                                  <div className="min-h-[120px] lg:min-h-[150px] max-h-[120px] lg:max-h-[160px] overflow-y-auto p-2 bg-[#FFEBEE] w-full">
                                    <ul className="space-y-2 w-full">
                                      {tour.hotels.remarks.map((remark: string, index: number) => (
                                        <li key={`hotel-${index}`} className="flex items-start gap-1 w-full">
                                          <span className="text-black break-words whitespace-pre-wrap text-justify w-full text-sm lg:text-base">
                                            {remark}
                                          </span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          <div className="mt-1">
                            <button
                              onClick={() => navigate("/alert")}
                              className="w-full font-bold py-2 rounded-lg border bg-[#A72703] text-white border-black transition-opacity hover:opacity-90 text-sm lg:text-base"
                            >
                              Customize your tour on chargeable basis
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Bookings POI Tab */}
                    {activeTab === "bookings-poi" && (
                      <div className="bg-[#E8F0FF] rounded-lg p-1">
                        <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg mb-1">
                          Booking Policy
                        </div>

                        <div className="flex flex-col lg:flex-row gap-1 mt-1 lg:h-[320px]">
                          <div className="h-full w-full lg:w-[65%] flex flex-col">
                            <div className="bg-[#2E4D98] text-white text-center py-2 lg:py-3 rounded-t-lg">
                              <h3 className="text-lg lg:text-xl font-bold">Booking Policy</h3>
                            </div>
                            <div className="flex-1 border-x-2 border-b-2 border-[#1e3a8a] rounded-b-lg bg-white overflow-hidden">
                              <div className="h-full overflow-y-auto bg-[#FFEBEE]">
                                <div className="p-0">
                                  {tour.booking.items.map((item: string, index: number) => (
                                    <React.Fragment key={index}>
                                      <div className="flex items-start gap-3 p-3">
                                        <span className="text-black text-xs lg:text-[15px] text-justify leading-relaxed break-words w-full">
                                          {item}
                                        </span>
                                      </div>
                                      <div className="border-b-[1px] border-black"></div>
                                    </React.Fragment>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="h-full w-full lg:w-[35%] flex flex-col">
                            <div className="bg-[#2E4D98] text-white text-center py-2 lg:py-3 rounded-t-lg">
                              <h3 className="text-lg lg:text-xl font-bold">Amount Details</h3>
                            </div>
                            <div className="flex-1 border-x-2 border-b-2 border-[#1e3a8a] rounded-b-lg bg-white overflow-hidden">
                              <div className="h-full overflow-y-auto bg-[#FFEBEE]">
                                <div className="p-0">
                                  {tour.booking.amountDetails.map((amount: string, index: number) => (
                                    <React.Fragment key={index}>
                                      <div className="flex items-center p-3">
                                        <div className="text-left w-full">
                                          <span className="text-xs lg:text-sm font-bold text-green-600 break-words">
                                            {amount}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="border-b-[1px] border-black"></div>
                                    </React.Fragment>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-[#E8F0FF] rounded-lg w-full overflow-x-hidden mt-1">
                          <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg w-full">
                            Booking Policy Remarks
                          </div>
                          <div className="border-2 border-[#1e3a8a] border-t-0 overflow-hidden rounded-b-lg w-full">
                            <div className="min-h-[150px] lg:min-h-[180px] max-h-[150px] lg:max-h-[180px] overflow-y-auto p-2 bg-[#FFEBEE] w-full">
                              {tour.bookingRemarks && tour.bookingRemarks.length > 0 ? (
                                <ul className="space-y-3 w-full">
                                  {tour.bookingRemarks.map((remark: string, index: number) => (
                                    <li key={index} className="w-full">
                                      <div className="flex items-start gap-2 w-full p-0">
                                        <span className="text-black text-justify leading-relaxed break-words hyphens-auto w-full text-sm lg:text-base">
                                          {remark}
                                        </span>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <div className="flex items-center justify-center h-full">
                                  <span className="text-gray-500 italic text-sm lg:text-base">No booking policy remarks available</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="mt-1">
                            <button
                              onClick={() => navigate("/alert")}
                              className="w-full font-bold py-2 rounded-lg border bg-[#A72703] text-white border-black transition-opacity hover:opacity-90 text-sm lg:text-base"
                            >
                              Customize your tour on chargeable basis
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Cancellation Tab */}
                    {activeTab === "cancellation" && (
                      <div className="bg-[#E8F0FF] rounded-lg p-1">
                        <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg mb-1">
                          Cancellation Policy
                        </div>

                        <div className="flex flex-col lg:flex-row gap-1 mt-1 lg:h-[320px]">
                          <div className="h-full w-full lg:w-[65%] flex flex-col">
                            <div className="bg-[#A72703] text-white text-center py-2 lg:py-3 rounded-t-lg">
                              <h3 className="text-lg lg:text-xl font-bold">Cancellation Policy</h3>
                            </div>
                            <div className="flex-1 border-x-2 border-b-2 border-[#1e3a8a] rounded-b-lg bg-[#FFEBEE] overflow-hidden">
                              <div className="h-full overflow-y-auto bg-[#FFEBEE]">
                                <div className="p-0">
                                  {tour.cancellation.policies.map((item: string, index: number) => (
                                    <React.Fragment key={index}>
                                      <div className="flex items-start gap-3 p-3">
                                        <span className="text-black text-xs lg:text-[15px] text-justify leading-relaxed break-words w-full">
                                          {item}
                                        </span>
                                      </div>
                                      <div className="border-b-[1px] border-black"></div>
                                    </React.Fragment>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="h-full w-full lg:w-[35%] flex flex-col">
                            <div className="bg-[#A72703] text-white text-center py-2 lg:py-3 rounded-t-lg">
                              <h3 className="text-lg lg:text-xl font-bold">Charges</h3>
                            </div>
                            <div className="flex-1 border-x-2 border-b-2 border-[#1e3a8a] rounded-b-lg bg-[#FFEBEE] overflow-hidden">
                              <div className="h-full overflow-y-auto bg-[#FFEBEE]">
                                <div className="p-0">
                                  {tour.cancellation.charges.map((charge: string, index: number) => (
                                    <React.Fragment key={index}>
                                      <div className="flex items-center justify-start p-3">
                                        <div className="text-left w-full">
                                          <span className="text-xs lg:text-sm font-bold text-[#A72703] break-words">
                                            {charge}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="border-b-[1px] border-black"></div>
                                    </React.Fragment>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-[#E8F0FF] rounded-lg w-full overflow-x-hidden mt-1">
                          <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg w-full">
                            Cancellation Policy Remarks
                          </div>
                          <div className="border-2 border-[#1e3a8a] border-t-0 overflow-hidden rounded-b-lg w-full">
                            <div className="min-h-[150px] lg:min-h-[180px] max-h-[150px] lg:max-h-[180px] overflow-y-auto p-1 bg-[#FFEBEE] w-full">
                              {tour.cancellationRemarks && tour.cancellationRemarks.length > 0 ? (
                                <ul className="space-y-3 w-full">
                                  {tour.cancellationRemarks.map((remark: string, index: number) => (
                                    <li key={index} className="flex items-start gap-2 w-full">
                                      <div className="w-full p-2">
                                        <span className="text-black text-justify leading-relaxed break-words hyphens-auto w-full text-sm lg:text-base">
                                          {remark}
                                        </span>
                                      </div>
                                      <div className="border-b-[1px] border-black"></div>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <div className="flex items-center justify-center h-full">
                                  <span className="text-gray-500 italic text-sm lg:text-base">No cancellation policy remarks available</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="mt-1">
                          <button
                            onClick={() => navigate("/alert")}
                            className="w-full font-bold py-2 rounded-lg border bg-[#A72703] text-white border-black transition-opacity hover:opacity-90 text-sm lg:text-base"
                          >
                            Customize your tour on chargeable basis
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Instructions Tab */}
                    {activeTab === "instructions" && (
                      <div className="bg-[#E8F0FF] rounded-lg p-1">
                        <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg">
                          Instructions
                        </div>

                        <div className="border-2 border-[#1e3a8a] border-t-0 overflow-hidden rounded-b-lg">
                          <div className="min-h-[250px] lg:min-h-[300px] max-h-[250px] lg:max-h-[320px] overflow-y-auto p-1 bg-[#FFEBEE]">
                            <div className="space-y-4 p-0">
                              <div className="p-1">
                                <ul className="space-y-2 text-gray-700">
                                  {tour.instructions.map((instruction: string, index: number) => (
                                    <li key={index} className="text-justify whitespace-normal text-black text-sm lg:text-base">
                                      {instruction}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-1">
                          <button
                            onClick={() => navigate("/alert")}
                            className="w-full font-bold py-2 rounded-lg border bg-[#A72703] text-white border-black transition-opacity hover:opacity-90 text-sm lg:text-base"
                          >
                            Customize your tour on chargeable basis
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between lg:justify-end mt-1 gap-1 lg:gap-0.5 flex-nowrap">
                    <div className="w-[32%] lg:w-32 border border-green-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <PDFDownloadLink
                        document={
                          <TourPdfDocument
                            tour={tour || {}}
                            tourType="Individual"
                            isGroupTour={false}
                            selectedCostMonth=""
                            selectedCostDate=""
                            selectedDeparture={null}
                            currentImageIndex={currentImageIndex}
                            tourImages={tour?.images || []}
                          />
                        }
                        fileName={`tour_${tour?.code || 'details'}_${new Date().toISOString().split('T')[0]}.pdf`}
                        onClick={handleDownloadPdf}
                        className="w-full"
                      >
                        {({ loading, error }) => (
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
                        onClick={() => {
                          localStorage.setItem('selectedTour', JSON.stringify(tour));
                          navigate('/checkout', { state: { tour } });
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 lg:h-4 lg:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Book Now
                      </button>
                    </div>
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

export default Exhibitiondetail;