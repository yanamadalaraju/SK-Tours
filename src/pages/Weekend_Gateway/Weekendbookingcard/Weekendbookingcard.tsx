import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
import WeekendGatewaypdf from './WeekendGatewaypdf';

// Type definitions based on API response
interface WeekendGateway {
  gateway_id: number;
  gateway_code: string;
  name: string;
  price: string;
  main_image?: string;
  overview?: string;
  inclusive?: string;
  exclusive?: string;
  places_nearby?: string;
  booking_policy?: string;
  cancellation_policy?: string;
  amenities?: string;
  per_pax_twin?: string;
  per_pax_triple?: string;
  child_with_bed?: string;
  child_without_bed?: string;
  infant?: string;
  per_pax_single?: string;
}

interface GatewayItem {
  gateway_id: number;
  gateway_code: string;
  name: string;
  price: string;
  main_image: string;
}

interface WeekendGatewayImage {
  image_id: number;
  gateway_id: number;
  image_url: string;
  is_main: number;
  sort_order: number;
}

interface EmailFormData {
  from: string;
  to: string;
  subject: string;
  message: string;
}

type TabType = "overview" | "tour" | "inclusive" | "nearby" | "amenities" | "policy_cancellation";

const Weekendbookingcard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [gateway, setGateway] = useState<WeekendGateway | null>(null);
  const [images, setImages] = useState<WeekendGatewayImage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Email modal state
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  
  // Sidebar filter states
  const [allGateways, setAllGateways] = useState<GatewayItem[]>([]);
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchBtn, setShowSearchBtn] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [selectedGatewayCodes, setSelectedGatewayCodes] = useState<string[]>([]);
  const [showMoreGateways, setShowMoreGateways] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const passedGateway = location.state?.bungalow as WeekendGateway | undefined;

  // Fetch all gateways for sidebar
  useEffect(() => {
    fetch(`${BASE_URL}/api/weekend-gateways`)
      .then((res) => res.json())
      .then((data) => {
        setAllGateways(data);
      })
      .catch((err) => console.error("Error fetching gateways:", err));
  }, []);

  // Fetch gateway details
  useEffect(() => {
    const fetchGatewayDetails = async () => {
      try {
        setLoading(true);

        const gatewayId = id || passedGateway?.gateway_id;

        if (!gatewayId) {
          navigate("/weekend-gateway");
          return;
        }

        const response = await fetch(`${BASE_URL}/api/weekend-gateways/${gatewayId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch gateway details');
        }

        const data = await response.json();

        setGateway(data.gateway);
        setImages(data.images || []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching gateway details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGatewayDetails();
  }, [id, passedGateway, navigate]);

  const handleBook = (): void => {
    navigate("/WeekendForm", {
      state: { bungalow: gateway }
    });
  };

  const handleEmailSubmit = async (emailData: EmailFormData) => {
    try {
      setEmailLoading(true);
      
      const { pdf } = await import('@react-pdf/renderer');
      
      const pdfInstance = (
        <WeekendGatewaypdf
          gateway={gateway || {}}
          images={images}
          currentImageIndex={currentImageIndex}
        />
      );

      const pdfBlob = await pdf(pdfInstance).toBlob();

      const formData = new FormData();
      formData.append('to', emailData.to);
      formData.append('subject', emailData.subject);
      formData.append('message', emailData.message);
      formData.append('gatewayTitle', gateway?.name || '');
      formData.append('gatewayCode', gateway?.gateway_code || '');
      formData.append('pdf', pdfBlob, `gateway_${gateway?.gateway_code || 'details'}.pdf`);

      let response;
      let result;
      
      response = await fetch(`${BASE_URL}/api/send-tour-pdf`, {
        method: 'POST',
        body: formData,
      });
      
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        result = await response.json();
      } else {
        const text = await response.text();
        throw new Error(`Server returned ${response.status}: ${text.substring(0, 100)}`);
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

  const handleGatewayCheckboxChange = (code: string, checked: boolean) => {
    if (checked) {
      setSelectedGatewayCodes([code]);
      const selectedGateway = allGateways.find(g => g.gateway_code === code);
      if (selectedGateway) {
        navigate(`/weekendbookingcard/${selectedGateway.gateway_id}`);
      }
    } else {
      setSelectedGatewayCodes([]);
    }
  };

  const clearAllFilters = () => {
    setPriceRange([0, 200000]);
    setSearchQuery("");
    setShowSearchBtn(false);
    setIsSearchActive(false);
    setSelectedGatewayCodes([]);
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
    const foundGateway = allGateways.find(g => 
      g.name.toLowerCase().includes(query) || 
      g.gateway_code.toLowerCase().includes(query)
    );
    
    if (foundGateway) {
      navigate(`/weekendbookingcard/${foundGateway.gateway_id}`);
    }
  };

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '';
    return imagePath.startsWith('http') ? imagePath : `${BASE_URL}${imagePath}`;
  };

  // Prepare carousel images
  const carouselImages: string[] = images.length > 0
    ? images.map(img => getImageUrl(img.image_url))
    : gateway?.main_image
      ? [getImageUrl(gateway.main_image)]
      : [
          "https://via.placeholder.com/800x400?text=No+Image",
          "https://via.placeholder.com/800x400?text=No+Image"
        ];

  const nextImage = (): void => {
    if (carouselImages.length > 0) {
      setCurrentImageIndex(
        (prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1)
      );
    }
  };

  const prevImage = (): void => {
    if (carouselImages.length > 0) {
      setCurrentImageIndex(
        (prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1)
      );
    }
  };

  const goToImage = (index: number): void => {
    setCurrentImageIndex(index);
  };

  const getTabDisplayName = (tab: TabType): string => {
    switch (tab) {
      case "overview":    return "Overview";
      case "tour":        return "Tour Cost";
      case "inclusive":   return "Inclusive & Excludes";
      case "nearby":      return "Place Near By";
      case "amenities":   return "Amenities";
      case "policy_cancellation": return "Book.P/Canc.P";
      default:            return tab;
    }
  };

  const renderTabContent = (): JSX.Element => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="bg-[#E8F0FF] rounded-lg p-1 w-full">
            <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg w-full">
              Overview
            </div>
            <div className="border-2 border-[#1e3a8a] border-t-0 overflow-hidden rounded-b-lg w-full">
              <div className="h-64 lg:h-64 overflow-y-auto p-2 bg-[#FFEBEE] w-full">
                <div className="space-y-4 w-full">
                  <div className="border-gray-200 rounded-lg w-full">
                    <div className="flex items-start w-full">
                      <div className="flex-1 min-w-0">
                        <p className="text-black break-words whitespace-pre-wrap text-justify w-full text-sm lg:text-base">
                          {gateway?.overview || "No overview available"}
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
                Customize your tour on chargeable basis
              </button>
            </div>
          </div>
        );

      case "tour":
        return (
          <div className="bg-[#E8F0FF] rounded-lg p-1 w-full">
            <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg w-full">
              Tour Cost
            </div>
            <div className="border-2 border-t-0 overflow-hidden rounded-b-lg w-full mt-1">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#2E4D98]">
                      <th className="border border-white px-4 py-3 text-left text-white font-semibold">Particulars - Cost in INR</th>
                      <th className="border border-white px-4 py-3 text-left text-white font-semibold">Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-[#FFEBEE]">
                      <td className="border-2 border-[#1e3a8a] px-4 py-2">Per pax on Twin Basis</td>
                      <td className="border-2 border-[#1e3a8a] px-4 py-2 font-semibold text-blue-800">
                        {gateway?.per_pax_twin ? `₹ ${parseInt(gateway.per_pax_twin).toLocaleString()}` : '-'}
                      </td>
                    </tr>
                    <tr className="bg-[#FFEBEE]/80">
                      <td className="border-2 border-[#1e3a8a] px-4 py-2">Per pax on Triple Basis</td>
                      <td className="border-2 border-[#1e3a8a] px-4 py-2 font-semibold text-blue-800">
                        {gateway?.per_pax_triple ? `₹ ${parseInt(gateway.per_pax_triple).toLocaleString()}` : '-'}
                      </td>
                    </tr>
                    <tr className="bg-[#FFEBEE]">
                      <td className="border-2 border-[#1e3a8a] px-4 py-2">Child with Bed</td>
                      <td className="border-2 border-[#1e3a8a] px-4 py-2 font-semibold text-green-800">
                        {gateway?.child_with_bed ? `₹ ${parseInt(gateway.child_with_bed).toLocaleString()}` : '-'}
                      </td>
                    </tr>
                    <tr className="bg-[#FFEBEE]/80">
                      <td className="border-2 border-[#1e3a8a] px-4 py-2">Child without Bed</td>
                      <td className="border-2 border-[#1e3a8a] px-4 py-2 font-semibold text-green-800">
                        {gateway?.child_without_bed ? `₹ ${parseInt(gateway.child_without_bed).toLocaleString()}` : '-'}
                      </td>
                    </tr>
                    <tr className="bg-[#FFEBEE]">
                      <td className="border-2 border-[#1e3a8a] px-4 py-2">Infant</td>
                      <td className="border-2 border-[#1e3a8a] px-4 py-2 font-semibold text-[#A72703]">
                        {gateway?.infant ? `₹ ${parseInt(gateway.infant).toLocaleString()}` : '-'}
                      </td>
                    </tr>
                    <tr className="bg-[#FFEBEE]/80">
                      <td className="border-2 border-[#1e3a8a] px-4 py-2">Per pax Single Occupancy</td>
                      <td className="border-2 border-[#1e3a8a] px-4 py-2 font-semibold text-[#A72703]">
                        {gateway?.per_pax_single ? `₹ ${parseInt(gateway.per_pax_single).toLocaleString()}` : '-'}
                      </td>
                    </tr>
                  </tbody>
                </table>
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
        );

      case "inclusive":
        return (
          <div className="bg-[#E8F0FF] rounded-lg p-1 w-full overflow-x-hidden">
            <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg mb-1 w-full">
              Inclusive & Excludes
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 w-full">
              <div className="flex flex-col w-full min-h-[250px] lg:min-h-[280px] max-h-[250px] lg:max-h-[320px]">
                <div className="bg-[#2E4D98] text-white text-center py-2 lg:py-3 rounded-t-lg w-full">
                  <h3 className="text-lg lg:text-xl font-bold">Inclusive</h3>
                </div>
                <div className="flex-1 border-2 border-[#1e3a8a] rounded-b-lg bg-[#FFEBEE] w-full overflow-hidden min-h-0">
                  <div className="h-full overflow-y-auto p-2">
                    {gateway?.inclusive ? (
                      <ul className="space-y-2 w-full">
                        {gateway.inclusive.split('\n').map((item, idx) => (
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
                        <span className="text-gray-500 italic text-sm lg:text-base">No inclusive items listed</span>
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
                    {gateway?.exclusive ? (
                      <ul className="space-y-2 w-full">
                        {gateway.exclusive.split('\n').map((item, idx) => (
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
                Customize your tour on chargeable basis
              </button>
            </div>
          </div>
        );

      case "nearby":
        return (
          <div className="bg-[#E8F0FF] rounded-lg p-1 w-full">
            <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg w-full">
              Places Near By
            </div>
            <div className="border-2 border-[#1e3a8a] border-t-0 overflow-hidden rounded-b-lg w-full">
              <div className="h-64 lg:h-64 overflow-y-auto p-2 bg-[#FFEBEE] w-full">
                <div className="space-y-4 w-full">
                  <div className="border-gray-200 rounded-lg w-full">
                    <div className="flex items-start w-full">
                      <div className="flex-1 min-w-0">
                        <p className="text-black break-words whitespace-pre-wrap text-justify w-full text-sm lg:text-base">
                          {gateway?.places_nearby || "No nearby places listed"}
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
                Customize your tour on chargeable basis
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
              <div className="min-h-[250px] lg:min-h-[250px] max-h-[310px] lg:max-h-[390px] overflow-y-auto p-2 bg-[#FFEBEE] w-full">
                {gateway?.amenities ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
                    {gateway.amenities.split('\n').map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 bg-white rounded-lg shadow-sm">
                        <svg className="w-4 h-4 lg:w-5 lg:h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-black text-sm lg:text-base break-words">{item}</span>
                      </div>
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
                Customize your tour on chargeable basis
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
              {/* Booking Policy Section - 50% */}
              <div className="flex flex-col w-full min-h-[250px] lg:min-h-[280px] max-h-[280px] lg:max-h-[320px]">
                <div className="bg-[#2E4D98] text-white text-center py-2 lg:py-3 rounded-t-lg w-full">
                  <h3 className="text-lg lg:text-xl font-bold">Booking Policy</h3>
                </div>
                <div className="flex-1 border-2 border-[#1e3a8a] rounded-b-lg bg-[#FFEBEE] w-full overflow-hidden min-h-0">
                  <div className="h-full overflow-y-auto p-2">
                    <p className="text-black break-words whitespace-pre-wrap text-justify w-full text-sm lg:text-base">
                      {gateway?.booking_policy || "No booking policy available"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Cancellation Policy Section - 50% */}
              <div className="flex flex-col w-full min-h-[250px] lg:min-h-[280px] max-h-[280px] lg:max-h-[320px]">
                <div className="bg-[#2E4D98] text-white text-center py-2 lg:py-3 rounded-t-lg w-full">
                  <h3 className="text-lg lg:text-xl font-bold">Cancellation Policy</h3>
                </div>
                <div className="flex-1 border-2 border-[#1e3a8a] rounded-b-lg bg-[#FFEBEE] w-full overflow-hidden min-h-0">
                  <div className="h-full overflow-y-auto p-2">
                    <p className="text-black break-words whitespace-pre-wrap text-justify w-full text-sm lg:text-base">
                      {gateway?.cancellation_policy || gateway?.booking_policy || "No cancellation policy available"}
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
                Customize your tour on chargeable basis
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
                Customize your tour on chargeable basis
              </button>
            </div>
          </div>
        );
    }
  };

  if (loading || !gateway) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#FFEBEE]">
          <div className="container mx-auto px-4 py-20 text-center flex flex-col items-center justify-center gap-4">
            <span className="animate-spin h-12 w-12 border-4 border-blue-200 border-t-blue-600 rounded-full" />
            <div className="text-2xl font-bold text-[#2E4D98]">Loading gateway details...</div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#FFEBEE]">
          <div className="container mx-auto px-4 py-20 text-center">
            <div className="text-2xl font-bold text-red-600">Error</div>
            <p className="mt-4 text-gray-600">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-6 bg-[#2E4D98] text-white px-6 py-2 rounded-lg hover:opacity-90"
            >
              Retry
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const tabs: TabType[] = ["overview", "tour", "inclusive", "nearby", "amenities", "policy_cancellation"];

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
                  <h2 className="text-2xl font-bold text-white">Weekend Gateways</h2>
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

                {/* Search */}
                <div className="mb-4">
                  <form onSubmit={handleSearch} className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        type="text"
                        placeholder="Search by name or code"
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
                </div>

                {/* Gateway Checkboxes */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-3 bg-white p-2 rounded-lg border border-black">
                    <h2 className="text-xl font-bold text-[#2E4D98]">Gateway Types</h2>
                  </div>
                  <div className="space-y-3">
                    {allGateways.length > 0 ? (
                      Array.from(new Map(allGateways.map(g => [g.gateway_code, g])).values())
                        .slice(0, showMoreGateways ? undefined : 6)
                        .map((gatewayItem) => (
                          <div key={gatewayItem.gateway_code} className="flex items-center gap-3 cursor-pointer">
                            <Checkbox
                              checked={gatewayItem.gateway_code === gateway.gateway_code}
                              onCheckedChange={(checked) => handleGatewayCheckboxChange(gatewayItem.gateway_code, checked as boolean)}
                              className="data-[state=checked]:bg-[#2E4D98] data-[state=checked]:border-[#2E4D98]"
                            />
                            <span
                              className={`text-gray-700 hover:text-[#2E4D98] cursor-pointer ${gatewayItem.gateway_code === gateway.gateway_code ? 'font-bold text-[#2E4D98]' : ''}`}
                              onClick={() => {
                                if (gatewayItem.gateway_code === gateway.gateway_code) {
                                  handleGatewayCheckboxChange(gatewayItem.gateway_code, false);
                                } else {
                                  handleGatewayCheckboxChange(gatewayItem.gateway_code, true);
                                }
                              }}
                            >
                              {gatewayItem.name} 
                            </span>
                          </div>
                        ))
                    ) : (
                      <div className="text-sm text-gray-400">Loading gateways...</div>
                    )}
                  </div>
                  {allGateways.length > 6 && (
                    <button 
                      onClick={() => setShowMoreGateways(!showMoreGateways)} 
                      className="mt-4 text-[#2E4D98] text-sm font-semibold hover:underline"
                    >
                      {showMoreGateways ? "Show Less" : `Show ${allGateways.length - 6} More`}
                    </button>
                  )}
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              <div className="w-full overflow-hidden border mb-2">
                <div className="flex w-full items-stretch gap-1">
                  <div className="flex-1 flex items-center justify-center p-3 bg-[#2E3A8A] border border-black">
                    <span className="font-bold text-white">Weekend Gateway</span>
                  </div>
                  <div className="flex-1 flex items-center justify-center p-3 bg-blue-100 border border-black">
                    <span className="text-[#2E3A8A] font-bold">{gateway.name}</span>
                  </div>
                </div>
              </div>

              {/* Image Carousel */}
              <div className="relative rounded-2xl overflow-hidden mb-2">
                <div className="relative h-64 sm:h-80 lg:h-[500px] overflow-hidden">
                  <img
                    src={carouselImages[currentImageIndex]}
                    alt={gateway.name}
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/800x400?text=No+Image';
                    }}
                  />

                  {carouselImages.length > 1 && (
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

                  {carouselImages.length > 1 && (
                    <div className="absolute top-2 lg:top-4 right-2 lg:right-4 bg-black/50 text-white px-2 lg:px-3 py-0.5 lg:py-1 rounded-full text-xs lg:text-sm">
                      {currentImageIndex + 1} / {carouselImages.length}
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
                      <h3 className="font-bold text-white text-left text-sm lg:text-lg">Gateway</h3>
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
                        {gateway.gateway_code}
                      </p>
                    </div>
                    <div className="col-span-4 border-r border-black px-2 lg:px-4 py-2 lg:py-3 bg-blue-50">
                      <p className="text-sm lg:text-lg font-semibold text-gray-900 text-left break-words">
                        {gateway.name}
                      </p>
                    </div>
                    <div className="px-2 lg:px-4 py-2 lg:py-3 bg-red-50">
                      <p className="text-sm lg:text-lg font-bold text-[#E53C42] text-left">
                        ₹{parseFloat(gateway.price).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="grid grid-cols-6 bg-white border-t border-black">
                    {tabs.map((tab, idx) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-1 lg:px-3 py-2 lg:py-4 text-[10px] xs:text-xs sm:text-sm font-semibold text-center whitespace-nowrap
                          ${idx < 5 ? "border-r border-black" : ""} transition 
                          ${activeTab === tab
                            ? "bg-[#A72703] text-white"
                            : "bg-[#FFE797] text-gray-800"
                          }
                        `}
                      >
                        {getTabDisplayName(tab)}
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
                      <WeekendGatewaypdf
                        gateway={gateway || {}}
                        images={images}
                        currentImageIndex={currentImageIndex}
                      />
                    }
                    fileName={`gateway_${gateway?.gateway_code || 'details'}_${new Date().toISOString().split('T')[0]}.pdf`}
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
                  tour={gateway}
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

export default Weekendbookingcard;