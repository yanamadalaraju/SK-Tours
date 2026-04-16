import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Villaimg1 from "../Images/villa1.png";
import Villaimg2 from "../Images/villa2.png";
import Villaimg3 from "../Images/villa3.png";
import Villaimg4 from "../Images/villa4.png";
import Villaimg5 from "../Images/villa5.png";
import Villaimg6 from "../Images/villa6.png";
import villaimg7 from "../Images/villa7.png";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BASE_URL } from "@/ApiUrls";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { PDFDownloadLink } from '@react-pdf/renderer';
import EmailModal from '../../EmailModal';
import Bungalowpdf from './Bungalowpdf';

interface Bungalow {
  bungalow_id: number;
  bungalow_code: string;
  name: string;
  price: string;
  bungalow_rate?: string;
  overview?: string;
  inclusive?: string;
  exclusive?: string;
  duration?: string;
  city_name?: string;
  places_nearby?: string;
  places_nearby_qa?: Array<{ id: number; question: string; answer: string }>;
  booking_policy?: string;
  cancellation_policy?: string;
  amenities?: string;
  main_image?: string;
  week_day_rate_desc?: string;
  weekend_rate_desc?: string;
  long_holidays_desc?: string;
  festival_holidays_desc?: string;
}

interface BungalowItem {
  bungalow_id: number;
  bungalow_code: string;
  name: string;
  duration?: string;
  city_name?: string;
  price: string;
  main_image: string;
}

interface BungalowImage {
  image_url: string;
}

interface RelatedBungalow {
  relation_id: number;
  bungalow_id: number;
  related_bungalow_id: number | null;
  related_name: string;
  related_price: string;
  related_image: string;
  sort_order: number;
  name?: string;
  price?: string;
}

interface EmailFormData {
  from: string;
  to: string;
  subject: string;
  message: string;
}

type TabType = "overview" | "rent" | "inclusive" | "nearby" | "amenities" | "policy_cancellation";

const Bunglowbookingcard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [activeRateTab, setActiveRateTab] = useState("weekday");
  const [bungalow, setBungalow] = useState<Bungalow | null>(null);
  const [images, setImages] = useState<BungalowImage[]>([]);
  const [relatedBungalows, setRelatedBungalows] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Email modal state
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
const autoScrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);  
  const [allBungalows, setAllBungalows] = useState<BungalowItem[]>([]);
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchBtn, setShowSearchBtn] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [selectedBungalowCodes, setSelectedBungalowCodes] = useState<string[]>([]);
  const [showMoreBungalows, setShowMoreBungalows] = useState(false);
  const [openNearbyQA, setOpenNearbyQA] = useState<number | null>(null);
  const [durationRange, setDurationRange] = useState([1, 10]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [showMoreCities, setShowMoreCities] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL}/api/bungalows`)
      .then((res) => res.json())
      .then((data) => {       
        setAllBungalows(data);
      })
      .catch((err) => console.error("Error fetching bungalows:", err));
  }, []);

  // Fetch bungalow details
  useEffect(() => {
    if (!id) {
      navigate("/bungalow");
      return;
    }

    const fetchBungalowDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/api/bungalows/${id}`);
        const data = await response.json();

        setBungalow(data.bungalow);
        setImages(data.images || []);
      } catch (error) {
        console.error("Error fetching bungalow:", error);
        navigate("/bungalow");
      } finally {
        setLoading(false);
      }
    };

    fetchBungalowDetails();
  }, [id, navigate]);


  useEffect(() => {
  if (bungalow?.city_name) {
    setSelectedCities([bungalow.city_name]);
  }
}, [bungalow]);
  // Fetch related bungalows
  useEffect(() => {
    const fetchRelatedBungalows = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/bungalows/related/${id}`);
        const data = await response.json();

        const formattedRelated = data.map((item: RelatedBungalow) => ({
          bungalow_id: item.related_bungalow_id || item.bungalow_id,
          name: item.related_name || item.name,
          price: item.related_price || item.price,
          bungalow_code: item.related_name || item.name,
          main_image: item.related_image
        }));

        setRelatedBungalows(formattedRelated);
      } catch (error) {
        console.error("Error fetching related bungalows:", error);
        setRelatedBungalows([]);
      }
    };

    if (id) {
      fetchRelatedBungalows();
    }
  }, [id]);

  const extractDuration = (durationStr: string): number => {
    if (!durationStr) return 0;
    const match = durationStr.match(/(\d+)N/);
    return match ? parseInt(match[1]) : 0;
  };

  const uniqueCities = Array.from(new Set(allBungalows.map(b => b.city_name).filter(Boolean)));

  const handleBook = (): void => {
    navigate("/bookingform");
  };

  const handleEmailSubmit = async (emailData: EmailFormData) => {
    try {
      setEmailLoading(true);

      const { pdf } = await import('@react-pdf/renderer');

      const pdfInstance = (
        <Bungalowpdf
          bungalow={bungalow || {}}
          images={images}
          currentImageIndex={currentImageIndex}
        />
      );

      const pdfBlob = await pdf(pdfInstance).toBlob();

      const formData = new FormData();
      formData.append('to', emailData.to);
      formData.append('subject', emailData.subject);
      formData.append('message', emailData.message);
      formData.append('tourTitle', bungalow?.name || '');
      formData.append('tourCode', bungalow?.bungalow_code || '');
      formData.append('pdf', pdfBlob, `bungalow_${bungalow?.bungalow_code || 'details'}.pdf`);

      const response = await fetch(`${BASE_URL}/api/send-tour-pdf`, {
        method: 'POST',
        body: formData,
      });

      let result;
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.includes('application/json')) {
        result = await response.json();
      } else {
        const textResponse = await response.text();
        console.error('Non-JSON response:', textResponse);
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

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

  const handleCityCheckboxChange = (city: string, checked: boolean) => {
    if (checked) {
      setSelectedCities([city]);
      const selectedBungalow = allBungalows.find(b => b.city_name === city);
      if (selectedBungalow) {
        navigate(`/bunglowbookingcard/${selectedBungalow.bungalow_id}`);
      }
    } else {
      setSelectedCities([]);
    }
  };

  const clearAllFilters = () => {
    setPriceRange([0, 200000]);
    setDurationRange([1, 10]);
    setSearchQuery("");
    setShowSearchBtn(false);
    setIsSearchActive(false);
    setSelectedCities([]);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setShowSearchBtn(false);
    setIsSearchActive(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() === "") return;

    setIsSearchActive(true);
    const query = searchQuery.trim().toLowerCase();
    const foundBungalow = allBungalows.find(b =>
      b.bungalow_code.toLowerCase().includes(query) ||
      b.city_name?.toLowerCase().includes(query)
    );

    if (foundBungalow) {
      navigate(`/bunglowbookingcard/${foundBungalow.bungalow_id}`);
    }
  };

  // Define carouselImages BEFORE using it in hooks
  const carouselImages: string[] = images.length > 0
    ? images.map(img => `${BASE_URL}${img.image_url}`)
    : [bungalow?.main_image ? `${BASE_URL}${bungalow.main_image}` : Villaimg1, Villaimg2, Villaimg3, Villaimg4, Villaimg5, Villaimg6, villaimg7];

  // Auto-scroll functions
  const startAutoScroll = () => {
    if (autoScrollTimer.current) {
      clearInterval(autoScrollTimer.current);
    }
    if (carouselImages.length > 1) {
      autoScrollTimer.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
      }, 5000);
    }
  };

  const stopAutoScroll = () => {
    if (autoScrollTimer.current) {
      clearInterval(autoScrollTimer.current);
      autoScrollTimer.current = null;
    }
  };

  // Auto-scroll useEffect - MUST be before the loading return
  useEffect(() => {
    if (carouselImages.length > 1) {
      startAutoScroll();
    }
    return () => stopAutoScroll();
  }, [images, bungalow]);

  const nextImage = (): void => {
    stopAutoScroll();
    setCurrentImageIndex(
      (prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1)
    );
    startAutoScroll();
  };

  const prevImage = (): void => {
    stopAutoScroll();
    setCurrentImageIndex(
      (prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1)
    );
    startAutoScroll();
  };

  const goToImage = (index: number): void => {
    stopAutoScroll();
    setCurrentImageIndex(index);
    startAutoScroll();
  };

  const handleRelatedClick = (related: any): void => {
    navigate(`/bunglowbookingcard/${related.bungalow_id}`);
  };

  const handleTabClick = (tab: TabType): void => {
    setActiveTab(tab);
  };

  const tabs: { key: TabType; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "rent", label: "Bungalow Rent" },
    { key: "inclusive", label: "Includes & Excludes" },
    { key: "nearby", label: "Place Near By" },
    { key: "amenities", label: "Amenities" },
    { key: "policy_cancellation", label: "Book.P/Canc.P" }
  ];

  const renderTabContent = (): JSX.Element => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="bg-[#E8F0FF] rounded-lg p-1 w-full">
            <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg w-full">
              Overview
            </div>
            <div className="border-2 border-[#1e3a8a] border-t-0 overflow-hidden rounded-b-lg w-full">
              <div className="min-h-[150px] lg:min-h-[180px] max-h-[200px] lg:max-h-[250px] overflow-y-auto p-2 bg-[#FFEBEE] w-full">
                <div className="space-y-4 w-full">
                  <div className="border-gray-200 rounded-lg w-full">
                    <div className="flex items-start w-full">
                      <div className="flex-1 min-w-0">
                        <p className="text-black break-words whitespace-pre-wrap text-justify w-full text-sm lg:text-base">
                          {bungalow?.overview || "No overview available"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-1">
              <button
                onClick={() => navigate("/alert")}
                className="w-full font-bold py-2 rounded-lg border bg-[#A72703] text-white border-black transition-opacity hover:opacity-90 text-sm lg:text-base"
              >
                Customize your booking on chargeable basis
              </button>
            </div>
          </div>
        );

      case "rent":
        const getRateDescription = () => {
          switch (activeRateTab) {
            case "weekday":
              return bungalow?.week_day_rate_desc || "No weekday rate information available";
            case "weekend":
              return bungalow?.weekend_rate_desc || "No weekend rate information available";
            case "holidays":
              return bungalow?.long_holidays_desc || "No long holidays rate information available";
            case "festival":
              return bungalow?.festival_holidays_desc || "No festival rate information available";
            default:
              return "No rate information available";
          }
        };

        return (
          <div className="bg-[#E8F0FF] rounded-lg p-1 w-full">
            <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg w-full">
              Bungalow Rent
            </div>
            <div className="overflow-x-auto w-full mt-1">
              <div className="flex bg-white border border-black rounded-t-lg overflow-hidden mb-0 min-w-[400px]">
                {[
                  { key: "weekday", label: "Weekday Rate" },
                  { key: "weekend", label: "Weekend Rate" },
                  { key: "holidays", label: "Long Holidays" },
                  { key: "festival", label: "Festival Rates" },
                ].map((tab, index, arr) => (
                  <div
                    key={tab.key}
                    onClick={() => setActiveRateTab(tab.key)}
                    className={`px-2 py-2 lg:py-3 text-[12px] xs:text-xs font-semibold text-center cursor-pointer flex-1
                      ${index !== arr.length - 1 ? "border-r border-black" : ""}
                      ${activeRateTab === tab.key
                        ? "bg-[#A72703] text-white"
                        : "bg-[#FFE797] text-gray-800"
                      }`}
                  >
                    {tab.label}
                  </div>
                ))}
              </div>

              <div className="h-[200px] overflow-y-auto">
                <div className="border border-black border-t-0 bg-[#FFEBEE] w-full min-h-full">
                  <div className="p-2 lg:p-2">
                    <p className="text-black text-sm lg:text-base text-justify leading-relaxed">
                      {getRateDescription()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-1">
              <button
                onClick={() => navigate("/alert")}
                className="w-full font-bold py-2 rounded-lg border bg-[#A72703] text-white border-black transition-opacity hover:opacity-90 text-sm lg:text-base"
              >
                Customize your booking on chargeable basis
              </button>
            </div>
          </div>
        );

      case "inclusive":
        return (
          <div className="bg-[#E8F0FF] rounded-lg p-1 w-full overflow-x-hidden">
            <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg mb-1 w-full">
              Includes & Excludes
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 w-full">
              <div className="flex flex-col w-full min-h-[250px] lg:min-h-[280px] max-h-[250px] lg:max-h-[320px]">
                <div className="bg-[#2E4D98] text-white text-center py-2 lg:py-3 rounded-t-lg w-full">
                  <h3 className="text-lg lg:text-xl font-bold">Includes</h3>
                </div>
                <div className="flex-1 border-2 border-[#1e3a8a] rounded-b-lg bg-[#FFEBEE] w-full overflow-hidden min-h-0">
                  <div className="h-full overflow-y-auto p-2">
                    {bungalow?.inclusive ? (
                      <ul className="space-y-2 w-full">
                        {bungalow.inclusive.split('\n').map((item, idx) => (
                          <li key={idx} className="w-full">
                            <div className="flex items-start gap-0 w-full">
                              <div className="text-black flex-1 min-w-0 text-justify break-words ml-2 text-sm lg:text-base">
                                {item}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-gray-500 italic text-sm lg:text-base">No Includes items listed</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-full min-h-[250px] lg:min-h-[280px] max-h-[250px] lg:max-h-[320px]">
                <div className="bg-[#2E4D98] text-white text-center py-2 lg:py-3 rounded-t-lg w-full">
                  <h3 className="text-lg lg:text-xl font-bold">Excludes</h3>
                </div>
                <div className="flex-1 border-2 border-[#1e3a8a] rounded-b-lg bg-[#FFEBEE] w-full overflow-hidden min-h-0">
                  <div className="h-full overflow-y-auto p-2">
                    {bungalow?.exclusive ? (
                      <ul className="space-y-2 w-full">
                        {bungalow.exclusive.split('\n').map((item, idx) => (
                          <li key={idx} className="w-full">
                            <div className="flex items-start gap-0 w-full">
                              <div className="text-black flex-1 min-w-0 text-justify break-words ml-2 text-sm lg:text-base">
                                {item}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-gray-500 italic text-sm lg:text-base">No exclusive items listed</span>
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
                Customize your booking on chargeable basis
              </button>
            </div>
          </div>
        );

      case "nearby":
        const placesNearbyQA = (bungalow as any)?.places_nearby_qa || [];

        return (
          <div className="bg-[#E8F0FF] rounded-lg p-1 w-full">
            <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg w-full">
              Places Near By
            </div>
            <div className="border-2 border-[#1e3a8a] border-t-0 overflow-hidden rounded-b-lg w-full">
              <div className="min-h-[250px] lg:min-h-[250px] max-h-[250px] lg:max-h-[250px] overflow-y-auto p-2 bg-[#FFEBEE] w-full">
                {bungalow?.places_nearby && (
                  <div className="mb-4 p-3 bg-white rounded-lg">
                    <p className="text-black break-words whitespace-pre-wrap text-justify w-full text-sm lg:text-base">
                      {bungalow.places_nearby}
                    </p>
                  </div>
                )}

                {placesNearbyQA.length > 0 ? (
                  <div className="border rounded-lg overflow-hidden">
                    {placesNearbyQA.map((item: any, index: number) => (
                      <div key={item.id || index} className="border-b">
                        <div
                          onClick={() => setOpenNearbyQA(openNearbyQA === index ? null : index)}
                          className="flex justify-between items-center px-4 py-3 cursor-pointer hover:bg-gray-50"
                          style={{ backgroundColor: "#2E3A8A", color: "#fff" }}
                        >
                          <span className="text-sm md:text-base">{item.question}</span>
                          <span className="text-xs md:text-sm">{openNearbyQA === index ? "▼" : "▶"}</span>
                        </div>
                        {openNearbyQA === index && (
                          <div
                            className="bg-[#E8F0FF] px-4 py-4 text-sm md:text-base"
                            style={{
                              minHeight: "100px",
                              maxHeight: "250px",
                              overflowY: "auto",
                              overflowX: "hidden",
                              textAlign: "justify",
                              wordBreak: "break-word",
                              whiteSpace: "normal",
                              borderRadius: "0 0 8px 8px",
                              borderLeft: "1px solid black",
                              borderRight: "1px solid black",
                              borderBottom: "1px solid black",
                            }}
                          >
                            {item.answer}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-6 text-center text-gray-500 text-sm bg-white rounded-lg">
                    {bungalow?.places_nearby || "No nearby places information available"}
                  </div>
                )}
              </div>
            </div>
            <div className="mt-1">
              <button
                onClick={() => navigate("/alert")}
                className="w-full font-bold py-2 rounded-lg border bg-[#A72703] text-white border-black transition-opacity hover:opacity-90 text-sm lg:text-base"
              >
                Customize your booking on chargeable basis
              </button>
            </div>
          </div>
        );

      case "amenities":
        return (
          <div className="bg-[#E8F0FF] rounded-lg p-1 w-full">
            <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg w-full">
              Amenities
            </div>
            <div className="border-2 border-[#1e3a8a] border-t-0 overflow-hidden rounded-b-lg w-full">
              <div className="min-h-[150px] lg:min-h-[180px] max-h-[300px] lg:max-h-[350px] overflow-y-auto p-2 bg-[#FFEBEE] w-full">
                {bungalow?.amenities ? (
                  <div className="flex flex-col gap-2 w-full">
                    {bungalow.amenities.split('\n').map((item, idx) => (
                      item.trim() && (
                        <div key={idx} className="flex items-start gap-2 p-1 rounded-lg w-full">
                          <span className="text-black text-sm lg:text-base break-words flex-1 text-justify">
                            {item}
                          </span>
                        </div>
                      )
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-gray-500 italic text-sm lg:text-base">No amenities listed</span>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-1">
              <button
                onClick={() => navigate("/alert")}
                className="w-full font-bold py-2 rounded-lg border bg-[#A72703] text-white border-black transition-opacity hover:opacity-90 text-sm lg:text-base"
              >
                Customize your booking on chargeable basis
              </button>
            </div>
          </div>
        );

      case "policy_cancellation":
        return (
          <div className="bg-[#E8F0FF] rounded-lg p-1 w-full">
            <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg mb-1 w-full">
              Booking & Cancellation Policy
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 w-full">
              <div className="flex flex-col w-full min-h-[250px] lg:min-h-[280px] max-h-[280px] lg:max-h-[320px]">
                <div className="bg-[#2E4D98] text-white text-center py-2 lg:py-3 rounded-t-lg w-full">
                  <h3 className="text-lg lg:text-xl font-bold">Booking Policy</h3>
                </div>
                <div className="flex-1 border-2 border-[#1e3a8a] rounded-b-lg bg-[#FFEBEE] w-full overflow-hidden min-h-0">
                  <div className="h-full overflow-y-auto p-2">
                    <p className="text-black break-words whitespace-pre-wrap text-justify w-full text-sm lg:text-base">
                      {bungalow?.booking_policy || "No booking policy available"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-full min-h-[250px] lg:min-h-[280px] max-h-[280px] lg:max-h-[320px]">
                <div className="bg-[#2E4D98] text-white text-center py-2 lg:py-3 rounded-t-lg w-full">
                  <h3 className="text-lg lg:text-xl font-bold">Cancellation Policy</h3>
                </div>
                <div className="flex-1 border-2 border-[#1e3a8a] rounded-b-lg bg-[#FFEBEE] w-full overflow-hidden min-h-0">
                  <div className="h-full overflow-y-auto p-2">
                    <p className="text-black break-words whitespace-pre-wrap text-justify w-full text-sm lg:text-base">
                      {bungalow?.cancellation_policy || "No cancellation policy available"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-1">
              <button
                onClick={() => navigate("/alert")}
                className="w-full font-bold py-2 rounded-lg border bg-[#A72703] text-white border-black transition-opacity hover:opacity-90 text-sm lg:text-base"
              >
                Customize your booking on chargeable basis
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-[#E8F0FF] rounded-lg p-1 w-full">
            <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg w-full">
              Information
            </div>
            <div className="border-2 border-[#1e3a8a] border-t-0 overflow-hidden rounded-b-lg w-full">
              <div className="min-h-[150px] p-2 bg-[#FFEBEE] w-full">
                <p className="text-black">No information available</p>
              </div>
            </div>
            <div className="mt-1">
              <button
                onClick={() => navigate("/alert")}
                className="w-full font-bold py-2 rounded-lg border bg-[#A72703] text-white border-black transition-opacity hover:opacity-90 text-sm lg:text-base"
              >
                Customize your booking on chargeable basis
              </button>
            </div>
          </div>
        );
    }
  };

  // Loading state - MOVED TO THE END after all hooks
  if (loading || !bungalow) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#FFEBEE]">
          <div className="container mx-auto px-4 py-20 text-center flex flex-col items-center justify-center gap-4">
            <span className="animate-spin h-12 w-12 border-4 border-blue-200 border-t-blue-600 rounded-full" />
            <div className="text-2xl font-bold text-[#2E4D98]">Loading bungalow details...</div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#FFEBEE]">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar with Filters */}
            <aside className="lg:w-80">
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl shadow-lg p-6 border border-blue-200 sticky top-24">
                <div className="flex justify-between items-center mb-6 bg-[#2E4D98] p-2 rounded-lg border border-black">
                  <h2 className="text-2xl font-bold text-white">Bungalows</h2>
                  <button onClick={clearAllFilters} className="text-sm text-white hover:underline">
                    Clear All
                  </button>
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

                {/* Duration Filter */}
                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-4 text-[#2E4D98]">Duration Range</h3>
                  <div className="flex justify-between text-sm text-gray-600 mb-3">
                    <span>{durationRange[0]} Days</span>
                    <span>{durationRange[1]} Days</span>
                  </div>
                  <Slider
                    value={durationRange}
                    onValueChange={setDurationRange}
                    min={1}
                    max={10}
                    step={1}
                    className="w-full"
                  />
                </div>

               
                {/* <div className="mb-4">
                  <form onSubmit={handleSearch} className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        type="text"
                        placeholder="Search by code or city"
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setShowSearchBtn(e.target.value.trim() !== "");
                        }}
                        onFocus={() => setShowSearchBtn(true)}
                        className="border-[#2E4D98] focus:border-[#2E4D98] focus:ring-[#2E4D98] pr-8 placeholder:text-sm"
                      />
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={() => { clearSearch(); setShowSearchBtn(false); }}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                    {showSearchBtn && (
                      <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-6">
                        Search
                      </Button>
                    )}
                  </form>
                </div> */}

                {/* City Filter */}
                {uniqueCities.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-lg mb-4 text-[#2E4D98]">City</h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {uniqueCities
                        .slice(0, showMoreCities ? undefined : 6)
                        .map((city) => (
                          <div key={city} className="flex items-center gap-3 cursor-pointer">
                            <Checkbox
                              checked={selectedCities.includes(city)}
                              onCheckedChange={(checked) => handleCityCheckboxChange(city, checked as boolean)}
                              className="data-[state=checked]:bg-[#2E4D98] data-[state=checked]:border-[#2E4D98]"
                            />
                            <span
                              className={`text-gray-700 hover:text-[#2E4D98] cursor-pointer ${selectedCities.includes(city) ? 'font-bold text-[#2E4D98]' : ''}`}
                              onClick={() => handleCityCheckboxChange(city, !selectedCities.includes(city))}
                            >
                              {city}
                            </span>
                          </div>
                        ))}
                    </div>
                    {uniqueCities.length > 6 && (
                      <button
                        onClick={() => setShowMoreCities(!showMoreCities)}
                        className="mt-3 text-[#2E4D98] text-sm font-semibold hover:underline"
                      >
                        {showMoreCities ? "Show Less" : `Show ${uniqueCities.length - 6} More`}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              <div className="w-full overflow-hidden border mb-2">
                <div className="flex w-full items-stretch gap-1">
                  <div className="flex-1 flex items-center justify-center p-3 bg-[#2E3A8A] border border-black">
                    <span className="font-bold text-white">Bungalow Booking:</span>
                  </div>
                  <div className="flex-1 flex items-center justify-center p-3 bg-blue-100 border border-black">
                    <span className="text-[#2E3A8A] font-bold">{bungalow.name}</span>
                  </div>
                </div>
              </div>

              {/* Image Carousel with Auto-scroll */}
              <div className="relative rounded-2xl overflow-hidden mb-2">
                <div className="relative h-64 sm:h-80 lg:h-[500px] overflow-hidden">
                  <img
                    src={carouselImages[currentImageIndex]}
                    alt={bungalow.name}
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
                  />

                  {carouselImages.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 lg:left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 lg:p-2 rounded-full transition-all duration-200 z-10"
                      >
                        <ChevronLeft className="w-4 h-4 lg:w-6 lg:h-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 lg:right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 lg:p-2 rounded-full transition-all duration-200 z-10"
                      >
                        <ChevronRight className="w-4 h-4 lg:w-6 lg:h-6" />
                      </button>
                    </>
                  )}

                  {carouselImages.length > 1 && (
                    <div className="absolute top-2 lg:top-4 right-2 lg:right-4 bg-black/50 text-white px-2 lg:px-3 py-0.5 lg:py-1 rounded-full text-xs lg:text-sm z-10">
                      {currentImageIndex + 1} / {carouselImages.length}
                    </div>
                  )}

                  {/* Auto-scroll indicator dots */}
                  {carouselImages.length > 1 && (
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1 z-10">
                      {carouselImages.map((_, index) => (
                        <div
                          key={index}
                          className={`h-1 rounded-full transition-all duration-300 ${index === currentImageIndex ? 'w-6 bg-white' : 'w-2 bg-white/50'
                            }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {carouselImages.length > 1 && (
                  <div className="bg-gradient-to-r from-blue-100 to-blue-100 p-2 lg:p-4 border-t">
                    <div className="flex justify-center gap-1 lg:gap-2 overflow-x-auto pb-2">
                      {carouselImages.map((image: string, index: number) => (
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

              {/* Excel-like Table Layout */}
              <div className="bg-white rounded-xl shadow-sm mb-1.5 overflow-hidden border border-black overflow-x-auto">
                <div className="min-w-[800px] lg:min-w-0">
                  {/* Header */}
                  <div className="grid grid-cols-6 bg-[#E8F0FF] border-b border-black">
                    <div className="border-r border-white bg-[#2E3a8a] px-2 lg:px-4 py-2 lg:py-3">
                      <h3 className="font-bold text-white text-left text-sm lg:text-lg">Bungalow</h3>
                    </div>
                    <div className="col-span-4 border-r border-white bg-[#2E3a8a] px-2 lg:px-4 py-2 lg:py-3">
                      <h3 className="font-bold text-white text-left text-sm lg:text-lg">Name</h3>
                    </div>
                    <div className="px-2 lg:px-4 py-2 lg:py-3 bg-[#2E3a8a]">
                      <h3 className="font-bold text-white text-start text-sm lg:text-lg">Price</h3>
                    </div>
                  </div>

                  {/* Data Row */}
                  <div className="grid grid-cols-6 border-black">
                    <div className="border-r border-black px-1 lg:px-4 py-2 lg:py-3 bg-blue-50">
                      <p className="text-sm lg:text-lg font-bold text-[#2E4D98] text-left tracking-wide">
                        {bungalow.bungalow_code}
                      </p>
                    </div>
                    <div className="col-span-4 border-r border-black px-2 lg:px-4 py-2 lg:py-3 bg-blue-50">
                      <p className="text-sm lg:text-lg font-semibold text-gray-900 text-left break-words">
                        {bungalow.name}
                      </p>
                    </div>
                    <div className="px-2 lg:px-4 py-2 lg:py-3 bg-red-50">
                      <p className="text-sm lg:text-lg font-bold text-[#E53C42] text-left">
                        ₹{parseFloat(bungalow.price).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="grid grid-cols-6 bg-white border-t border-black">
                    {tabs.map((tab, idx) => (
                      <button
                        key={tab.key}
                        onClick={() => handleTabClick(tab.key)}
                        className={`col-span-1 px-2 py-4 text-xs sm:text-sm font-semibold text-center
                          ${idx < 5 ? "border-r border-black" : ""}
                          ${activeTab === tab.key
                            ? "bg-[#A72703] text-white"
                            : "bg-[#FFE797] text-gray-800"
                          }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tab Content */}
              <div className="bg-[#2E4D98] rounded-md shadow-sm p-2 lg:p-4">
                {renderTabContent()}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between lg:justify-end mt-1 gap-1 lg:gap-1 flex-nowrap">
                <div className="w-[32%] lg:w-32 border border-green-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <PDFDownloadLink
                    document={
                      <Bungalowpdf
                        bungalow={bungalow || {}}
                        images={images}
                        currentImageIndex={currentImageIndex}
                      />
                    }
                    fileName={`bungalow_${bungalow?.bungalow_code || 'details'}_${new Date().toISOString().split('T')[0]}.pdf`}
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
                  tour={bungalow}
                />

                <div className="w-[32%] lg:w-32 border border-red-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <button
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 lg:py-3 px-2 lg:px-3 flex items-center justify-center gap-1 lg:gap-2 transition-colors text-xs lg:text-sm"
                    onClick={handleBook}
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
      <Footer />
    </>
  );
};

export default Bunglowbookingcard;