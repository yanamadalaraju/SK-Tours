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
import { BASE_URL } from '@/ApiUrls';
import Footer from '@/components/Footer';
import { PDFDownloadLink } from '@react-pdf/renderer';
import TourPdfDocument from '../TourPdfDocument';
import { Download } from 'lucide-react';
import EmailModal from '../EmailModal';

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

// Add this interface for the sidebar data
interface AboutData {
  banner_image: string;
  imageText: string;
  qa: Array<{ q: string; a: string }>;
}

interface City {
  id: number;
  city_name: string;
  image: string;
  price: string;
}

interface ExhibitionItem {
  id: number;
  country_name: string;
  created_at: string;
  updated_at: string;
  cities: City[];
}

const Exhibitiondetail = () => {
  const { tourId } = useParams<{ tourId: string }>();
  const navigate = useNavigate();
  
  // Sidebar states
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [domesticList, setDomesticList] = useState<string[]>([]);
  const [exhibitionData, setExhibitionData] = useState<ExhibitionItem[]>([]);
  const [loadingDomestic, setLoadingDomestic] = useState(false);
  
  const [activeTab, setActiveTab] = useState("itinerary");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const [tour, setTour] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [autoScrollInterval, setAutoScrollInterval] = useState<NodeJS.Timeout | null>(null);

  // Fetch domestic list for sidebar
  useEffect(() => {
    const fetchDomesticData = async () => {
      setLoadingDomestic(true);
      try {
        const response = await fetch(`${BASE_URL}/api/exhibitions/domestic`);
        if (!response.ok) throw new Error(`Failed: ${response.status}`);
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setDomesticList(data.map((item: any) => item.country_name));
          setExhibitionData(data);
        }
      } catch (error) {
        console.error("Error fetching domestic:", error);
        setDomesticList([]);
      } finally {
        setLoadingDomestic(false);
      }
    };
    fetchDomesticData();
  }, []);

  const handleAboutClick = () => {
    navigate('/exhibition', { state: { category: null } });
  };
const handleCountryClick = (country: string) => {
  const countryData = exhibitionData.find(
    (item) => item.country_name === country
  );

  if (countryData) {
    navigate(`/exhibitiondetail/${countryData.id}`);
  } else {
    navigate('/exhibition', { state: { category: country } });
  }
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

  const calculateEMI = (price: string | number) => {
    if (!price) return 'EMI from ₹0/month';
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    const emiAmount = Math.round(numPrice / 6);
    return `EMI from ₹${emiAmount.toLocaleString('en-IN')}/month`;
  };

  const formatDuration = (days: number) => {
    const nights = days - 1;
    return `${nights}N/${days}D`;
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

     // Use fetched images instead of fallback
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

    const processDepartures = () => {
      if (departures && departures.length > 0) {
        const descriptions: string[] = [];
        departures.forEach((dep: any) => {
          if (dep.description && !descriptions.includes(dep.description)) {
            descriptions.push(dep.description);
          }
        });
        return {
          type: 'Individual',
          data: [],
          descriptions: descriptions.length > 0 ? descriptions : ["No departure information available."]
        };
      }
      return {
        type: 'Individual',
        data: [],
        descriptions: ["No departure information available."]
      };
    };

    const processTourCost = () => {
      if (costs && costs.length > 0) {
        return {
          tableData: costs.map((cost: any) => ({
            passenger: `${cost.pax} Pax`,
            standard: cost.standard_hotel !== "0.00" ? formatPrice(cost.standard_hotel) : "NA",
            deluxe: cost.deluxe_hotel !== "0.00" ? formatPrice(cost.deluxe_hotel) : "NA",
            executive: cost.executive_hotel !== "0.00" ? formatPrice(cost.executive_hotel) : "NA",
            childWithBed: cost.child_with_bed !== "0.00" ? formatPrice(cost.child_with_bed) : "NA",
            childNoBed: cost.child_no_bed !== "0.00" ? formatPrice(cost.child_no_bed) : "NA"
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
          adultPrice: tour.adult_price || 'NA',
          childPrice: tour.child_price || 'NA'
        }));
      }
      return [];
    };

    const processEMIOptions = () => {
      if (emioptions && emioptions.length > 0) {
        return {
          loanAmount: emioptions[0]?.loan_amount || "N/A",
          options: emioptions.map((option: any) => ({
            particulars: option.particulars || 'Per Month Payment',
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

    const processBooking = () => {
      if (bookingpoi && bookingpoi.length > 0) {
        return {
          items: bookingpoi.map((item: any) => item.item || ''),
          amountDetails: bookingpoi.map((item: any) => item.amount_details || '0')
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
      title: exhibition?.country_name || tourData?.title || "Exhibition Tour",
      duration: formatDuration(tourData?.duration_days || 2),
      cityName: tourData?.city_name || "",
      price: formatPrice(tourData?.base_price_adult || 0),
      emi: calculateEMI(tourData?.base_price_adult || 0),
      code: tourData?.tour_code || "N/A",
      description: tourData?.overview || "Tour overview not available",
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
const fetchExhibitionDetails = async () => {
  try {
    setLoading(true);
    setError(null);

    // Fetch exhibition details
    const response = await fetch(`${BASE_URL}/api/exhibitions/domestic/${tourId}/details`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error('Failed to fetch exhibition data');
    }

    // Fetch exhibition images separately using the exhibition_id
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

    // If no images found, use fallback
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
    if (tourId) {
      fetchExhibitionDetails();
    }
  }, [tourId]);

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
            <div className="flex min-h-[600px] gap-3">
            
        <div className="w-64 border-r flex-shrink-0 bg-blue-100 shadow-lg">
  <div className="bg-[#2E3A8A] text-white text-center font-semibold py-3 text-sm shadow-md">
    Exhibition
  </div>

  <div
    onClick={handleAboutClick}
    className="flex justify-between items-center px-4 py-3 cursor-pointer text-sm hover:bg-blue-200 text-gray-700 transition-all duration-200"
  >
    <span>About Exhibition</span>
  </div>

  <div className="bg-[#2E3A8A] text-white text-center font-semibold py-3 text-sm shadow-md">
    Domestic
  </div>

  <div className="border-b border-black">
    {loadingDomestic ? (
      <div className="flex justify-center py-4">
        <span className="animate-spin h-5 w-5 border-2 border-gray-300 border-t-blue-600 rounded-full" />
      </div>
    ) : domesticList.length > 0 ? (
 domesticList.map((country) => {
  const isActive = tour?.title?.toLowerCase().includes(country.toLowerCase()) || 
                   tour?.cityName?.toLowerCase().includes(country.toLowerCase());
  return (
    <div
      key={country}
      onClick={() => handleCountryClick(country)}
      className={`flex items-center px-4 py-3 cursor-pointer border-t border-black text-sm transition-all duration-200 hover:shadow-inner
        ${isActive 
          ? "text-[#2E3A8A] font-bold" 
          : " hover:bg-blue-200 text-gray-700"
        }`}
    >
      <span className={`mr-2 text-xs ${isActive ? "text-[#2E3A8A]" : "text-gray-400"}`}>›</span>
      <span>{country}</span>
    </div>
  );
})
    ) : (
      <div className="px-4 py-3 text-sm text-gray-400">
        No data available
      </div>
    )}
  </div>
</div>

             
              <div className="flex-1 min-w-0 flex flex-col">
           <div className="bg-[#2E3A8A] text-white text-center py-3 font-semibold text-md md:text-base w-[1080px] mx-auto mb-2">
  Domestic Exhibition
</div>

<div className="bg-blue-100 text-center text-black py-3 font-semibold text-md md:text-base border-[1px] border-black mb-0 w-[1080px] mx-auto">
  {tour.title || ""}
</div>

                <div className="flex flex-col gap-6 p-2">
                  <main className="w-full">
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
                          <div className="col-span-6 border-r border-black px-2 lg:px-4 py-2 lg:py-3 bg-gray-50">
                            <p className="text-sm lg:text-lg font-semibold text-gray-900 text-left break-words">
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

                    <div className="bg-[#2E4D98] rounded-md shadow-sm p-2 lg:p-4">
                      {/* Itinerary Tab */}
                      {activeTab === "itinerary" && (
                        <div className="bg-[#C2E2FA] rounded-lg p-1 h-full">
                          <div className="mx-auto bg-white rounded-lg shadow-lg h-full flex flex-col min-h-0">
                            <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 rounded-t-lg flex-shrink-0">
                              Tour Itinerary
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
                      
                      {/* Dep Date Tab - Individual Tour */}
                      {activeTab === "dep-date" && (
                        <div className="bg-[#E8F0FF] rounded-lg p-1 w-full">
                          <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg w-full">
                            Departure Dates
                          </div>

                          <div className="border-2 border-t-0 border-[#1e3a8a] rounded-b-lg w-full flex flex-col min-h-[200px] lg:min-h-[280px] max-h-[200px] lg:max-h-[280px] overflow-hidden">
                            <div className="flex-1 overflow-y-auto p-2 bg-[#FFEBEE] w-full">
                              <div className="space-y-4 w-full">
                                {tour.departures.descriptions.map((description: string, index: number) => (
                                  <div key={index} className="border-gray-200 rounded-lg w-full">
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

                      {/* Tour Cost Tab */}
                      {activeTab === "tour-cost" && (
                        <div className="bg-[#E8F0FF] rounded-lg p-1">
                          <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg mb-1.5">
                            Tour Cost
                          </div>

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
                                    tour.tourCost.tableData.map((row: any, index: number) => (
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
                          {tour.optionalTours && tour.optionalTours.length > 0 && (
                            <div className='mt-1'>
                              <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-xl rounded-t-lg py-2 lg:py-3 mb-1">
                                Optional Tour
                              </div>
                              <div className="overflow-x-auto">
                                <table className="w-full border-collapse min-w-[500px] lg:min-w-0">
                                  <thead>
                                    <tr className="bg-[#2E4D98]">
                                      <th className="border border-white px-2 lg:px-4 py-2 lg:py-3 text-left font-semibold text-white text-xs lg:text-sm w-[70%]">
                                        Tour Name
                                      </th>
                                      <th className="border border-white px-2 lg:px-4 py-2 lg:py-3 text-left font-semibold text-white text-xs lg:text-sm w-[15%]">
                                        Adult Price
                                      </th>
                                      <th className="border border-white px-2 lg:px-4 py-2 lg:py-3 text-left font-semibold text-white text-xs lg:text-sm w-[15%]">
                                        Child Price
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="border-2 border-[#1e3a8a] border-t-0">
                                    {tour.optionalTours.map((optTour: any, index: number) => (
                                      <tr key={index} className={index % 2 === 0 ? "bg-[#FFEBEE]" : "bg-[#FFEBEE]/80"}>
                                        <td className="border border-black px-2 lg:px-4 py-1 lg:py-2 text-black text-xs lg:text-sm">{optTour.tourName}</td>
                                        <td className="border border-black px-2 lg:px-4 py-1 lg:py-2 border-l-0 text-black text-xs lg:text-sm">{optTour.adultPrice}</td>
                                        <td className="border border-black px-2 lg:px-4 py-1 lg:py-2 border-l-0 text-black text-xs lg:text-sm">{optTour.childPrice}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )}

                          {/* Optional Tour Remarks Section */}
                          {tour.optionalTourRemarks && tour.optionalTourRemarks.length > 0 && (
                            <div className="bg-[#E8F0FF] rounded-lg w-full overflow-x-hidden mt-1">
                              <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg w-full">
                                Optional Tour Remarks
                              </div>
                              <div className="border-2 border-[#1e3a8a] border-t-0 overflow-hidden rounded-b-lg w-full">
                                <div className="min-h-[150px] lg:min-h-[180px] max-h-[150px] lg:max-h-[180px] overflow-y-auto p-2 bg-[#FFEBEE] w-full">
                                  <ul className="space-y-2 w-full">
                                    {tour.optionalTourRemarks.map((remark: string, index: number) => (
                                      <li key={index} className="flex items-start gap-2 w-full">
                                        <span className="text-black whitespace-pre-wrap break-words hyphens-auto text-justify w-full text-sm lg:text-base">
                                          {remark}
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* EMI Options Section */}
                          {tour.emiOptions && tour.emiOptions.options && tour.emiOptions.options.length > 0 && (
                            <div className='mb-1 mt-1'>
                              <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-xl rounded-t-lg py-2 lg:py-3 mb-1">
                                EMI Options
                              </div>
                              <div className="overflow-x-auto">
                                <table className="w-full border-collapse min-w-[500px] lg:min-w-0">
                                  <thead>
                                    <tr className="bg-[#2E4D98]">
                                      <th className="border border-white px-2 lg:px-4 py-2 lg:py-3 text-left font-semibold text-white text-xs lg:text-sm w-[40%]">
                                        Particulars
                                      </th>
                                      <th className="border border-white px-2 lg:px-4 py-2 lg:py-3 text-center font-semibold text-white text-xs lg:text-sm w-[20%]">
                                        Loan Amount
                                      </th>
                                      <th className="border border-white px-2 lg:px-4 py-2 lg:py-3 text-center font-semibold text-white text-xs lg:text-sm w-[20%]">
                                        Months
                                      </th>
                                      <th className="border border-white px-2 lg:px-4 py-2 lg:py-3 text-center font-semibold text-white text-xs lg:text-sm w-[20%]">
                                        EMI
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="border-2 border-[#1e3a8a] border-t-0">
                                    {tour.emiOptions.options.map((emi: any, index: number) => (
                                      <tr key={index} className={index % 2 === 0 ? "bg-[#FFEBEE]" : "bg-[#FFEBEE]/80"}>
                                        <td className="border border-black px-2 lg:px-4 py-1 lg:py-2 font-bold text-xs lg:text-base text-black">
                                          {emi.particulars}
                                        </td>
                                        <td className="border border-black px-2 lg:px-4 py-1 lg:py-2 border-l-0 text-center text-black text-xs lg:text-sm">
                                          {emi.loanAmount}
                                        </td>
                                        <td className="border border-black px-2 lg:px-4 py-1 lg:py-2 border-l-0 text-center text-black text-xs lg:text-sm">
                                          {emi.months}
                                        </td>
                                        <td className="border border-black px-2 lg:px-4 py-1 lg:py-2 border-l-0 text-center text-black text-xs lg:text-sm">
                                          {emi.emi}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )}

                          {/* EMI Remarks */}
                          {tour.emiRemarks && tour.emiRemarks.length > 0 && (
                            <div className="bg-[#E8F0FF] rounded-lg w-full overflow-x-hidden mt-1">
                              <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg w-full">
                                EMI Remarks
                              </div>
                              <div className="border-2 border-[#1e3a8a] border-t-0 overflow-hidden rounded-b-lg w-full">
                                <div className="min-h-[150px] lg:min-h-[180px] max-h-[150px] lg:max-h-[180px] overflow-y-auto p-2 bg-[#FFEBEE] w-full">
                                  <ul className="space-y-2 w-full">
                                    {tour.emiRemarks.map((remark: string, index: number) => (
                                      <li key={index} className="flex items-start gap-2 w-full">
                                        <span className="text-black whitespace-pre-wrap break-words hyphens-auto text-justify w-full text-sm lg:text-base">
                                          {remark}
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
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
                  </main>
                </div>
              </div>
            </div>
        
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Exhibitiondetail;