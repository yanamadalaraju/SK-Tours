import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Bunglowbookingcard.css";
import Villaimg1 from "../Images/villa1.png";
import Villaimg2 from "../Images/villa2.png";
import Villaimg3 from "../Images/villa3.png";
import Villaimg4 from "../Images/villa4.png";
import Villaimg5 from "../Images/villa5.png";
import Villaimg6 from "../Images/villa6.png";
import villaimg7 from "../Images/villa7.png";
import Bunglowcheckbox from "../Bungalow_checkbox/Bungalowcheckbox";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BASE_URL } from "@/ApiUrls";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

interface Bungalow {
  bungalow_id: number;
  bungalow_code: string;
  name: string;
  price: string;
  bungalow_rate?: string;
  overview?: string;
  inclusive?: string;
  exclusive?: string;
  places_nearby?: string;
  booking_policy?: string;
  cancellation_policy?: string;
  main_image?: string;
}

interface BungalowItem {
  bungalow_id: number;
  bungalow_code: string;
  name: string;
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

type TabType = "overview" | "rent" | "inclusive" | "nearby" | "policy" | "cancellation";

const Bunglowbookingcard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const [bungalow, setBungalow] = useState<Bungalow | null>(null);
  const [images, setImages] = useState<BungalowImage[]>([]);
  const [relatedBungalows, setRelatedBungalows] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Sidebar filter states
  const [allBungalows, setAllBungalows] = useState<BungalowItem[]>([]);
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchBtn, setShowSearchBtn] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [selectedBungalowCodes, setSelectedBungalowCodes] = useState<string[]>([]);
  const [showMoreBungalows, setShowMoreBungalows] = useState(false);

  // Fetch all bungalows for sidebar
  useEffect(() => {
    fetch(`${BASE_URL}/api/bungalows`)
      .then((res) => res.json())
      .then((data) => {
        setAllBungalows(data);
      })
      .catch((err) => console.error("Error fetching bungalows:", err));
  }, []);

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

  const handleBook = (): void => {
    navigate("/bookingform");
  };

  const handleBungalowCheckboxChange = (code: string, checked: boolean) => {
    if (checked) {
      setSelectedBungalowCodes(prev => [...prev, code]);
      // Navigate to the selected bungalow
      const selectedBungalow = allBungalows.find(b => b.bungalow_code === code);
      if (selectedBungalow) {
        navigate(`/bunglowbookingcard/${selectedBungalow.bungalow_id}`);
      }
    } else {
      setSelectedBungalowCodes(prev => prev.filter(c => c !== code));
    }
  };

  const clearAllFilters = () => {
    setPriceRange([0, 200000]);
    setSearchQuery("");
    setShowSearchBtn(false);
    setIsSearchActive(false);
    setSelectedBungalowCodes([]);
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
      b.name.toLowerCase().includes(query) || 
      b.bungalow_code.toLowerCase().includes(query)
    );
    
    if (foundBungalow) {
      navigate(`/bunglowbookingcard/${foundBungalow.bungalow_id}`);
    }
  };

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

  const carouselImages: string[] = images.length > 0
    ? images.map(img => `${BASE_URL}${img.image_url}`)
    : [bungalow.main_image ? `${BASE_URL}${bungalow.main_image}` : Villaimg1, Villaimg2, Villaimg3, Villaimg4, Villaimg5, Villaimg6, villaimg7];

  const nextImage = (): void => {
    setCurrentImageIndex(
      (prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1)
    );
  };

  const prevImage = (): void => {
    setCurrentImageIndex(
      (prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1)
    );
  };

  const goToImage = (index: number): void => {
    setCurrentImageIndex(index);
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
    { key: "inclusive", label: "Inclusive & Exclusive" },
    { key: "nearby", label: "Place Near By" },
    { key: "policy", label: "Booking Policy" },
    { key: "cancellation", label: "Cancellation Policy" }
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
                          {bungalow.overview || "No overview available"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "rent":
        return (
          <div className="bg-[#E8F0FF] rounded-lg p-1 w-full">
            <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg w-full">
              Bungalow Rent
            </div>
            <div className="border-2 border-[#1e3a8a] border-t-0 overflow-hidden rounded-b-lg w-full">
              <div className="min-h-[150px] lg:min-h-[180px] max-h-[200px] lg:max-h-[250px] overflow-y-auto p-2 bg-[#FFEBEE] w-full">
                <div className="space-y-4 w-full">
                  <div className="border-gray-200 rounded-lg w-full">
                    <div className="flex items-start w-full">
                      <div className="flex-1 min-w-0">
                        <p className="text-black break-words whitespace-pre-wrap text-justify w-full text-sm lg:text-base">
                          {bungalow.bungalow_rate ? bungalow.bungalow_rate : `Rent: ₹${bungalow.price} per night`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "inclusive":
        return (
          <div className="bg-[#E8F0FF] rounded-lg p-1 w-full overflow-x-hidden">
            <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg mb-1 w-full">
              Inclusive & Exclusive
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 w-full">
              <div className="flex flex-col w-full min-h-[250px] lg:min-h-[280px] max-h-[250px] lg:max-h-[320px]">
                <div className="bg-[#2E4D98] text-white text-center py-2 lg:py-3 rounded-t-lg w-full">
                  <h3 className="text-lg lg:text-xl font-bold">Inclusive</h3>
                </div>
                <div className="flex-1 border-2 border-[#1e3a8a] rounded-b-lg bg-[#FFEBEE] w-full overflow-hidden min-h-0">
                  <div className="h-full overflow-y-auto p-2">
                    {bungalow.inclusive ? (
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
                        <span className="text-gray-500 italic text-sm lg:text-base">No inclusive items listed</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-full min-h-[250px] lg:min-h-[280px] max-h-[250px] lg:max-h-[320px]">
                <div className="bg-[#2E4D98] text-white text-center py-2 lg:py-3 rounded-t-lg w-full">
                  <h3 className="text-lg lg:text-xl font-bold">Exclusive</h3>
                </div>
                <div className="flex-1 border-2 border-[#1e3a8a] rounded-b-lg bg-[#FFEBEE] w-full overflow-hidden min-h-0">
                  <div className="h-full overflow-y-auto p-2">
                    {bungalow.exclusive ? (
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
          </div>
        );

      case "nearby":
        return (
          <div className="bg-[#E8F0FF] rounded-lg p-1 w-full">
            <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg w-full">
              Places Near By
            </div>
            <div className="border-2 border-[#1e3a8a] border-t-0 overflow-hidden rounded-b-lg w-full">
              <div className="min-h-[150px] lg:min-h-[180px] max-h-[200px] lg:max-h-[250px] overflow-y-auto p-2 bg-[#FFEBEE] w-full">
                <div className="space-y-4 w-full">
                  <div className="border-gray-200 rounded-lg w-full">
                    <div className="flex items-start w-full">
                      <div className="flex-1 min-w-0">
                        <p className="text-black break-words whitespace-pre-wrap text-justify w-full text-sm lg:text-base">
                          {bungalow.places_nearby || "No nearby places listed"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "policy":
        return (
          <div className="bg-[#E8F0FF] rounded-lg p-1 w-full">
            <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg mb-1 w-full">
              Booking Policy
            </div>
            <div className="border-2 border-[#1e3a8a] border-t-0 overflow-hidden rounded-b-lg w-full">
              <div className="min-h-[150px] lg:min-h-[180px] max-h-[150px] lg:max-h-[180px] overflow-y-auto p-2 bg-[#FFEBEE] w-full">
                <div className="space-y-4 w-full">
                  <div className="border-gray-200 rounded-lg w-full">
                    <div className="flex items-start w-full">
                      <div className="flex-1 min-w-0">
                        <p className="text-black break-words whitespace-pre-wrap text-justify w-full text-sm lg:text-base">
                          {bungalow.booking_policy || "No booking policy available"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-1">
              <button
                onClick={handleBook}
                className="w-full font-bold py-2 rounded-lg border bg-[#A72703] text-white border-black transition-opacity hover:opacity-90 text-sm lg:text-base"
              >
                Book Now
              </button>
            </div>
          </div>
        );

      case "cancellation":
        return (
          <div className="bg-[#E8F0FF] rounded-lg p-1 w-full">
            <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg mb-1 w-full">
              Cancellation Policy
            </div>
            <div className="border-2 border-[#1e3a8a] border-t-0 overflow-hidden rounded-b-lg w-full">
              <div className="min-h-[150px] lg:min-h-[180px] max-h-[150px] lg:max-h-[180px] overflow-y-auto p-2 bg-[#FFEBEE] w-full">
                <div className="space-y-4 w-full">
                  <div className="border-gray-200 rounded-lg w-full">
                    <div className="flex items-start w-full">
                      <div className="flex-1 min-w-0">
                        <p className="text-black break-words whitespace-pre-wrap text-justify w-full text-sm lg:text-base">
                          {bungalow.cancellation_policy || "No cancellation policy available"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
          </div>
        );
    }
  };

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

                {/* Bungalow Checkboxes */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-3 bg-white p-2 rounded-lg border border-black">
                    <h2 className="text-xl font-bold text-[#2E4D98]">Bungalow Types</h2>
                  </div>
                  <div className="space-y-3">
                    {allBungalows.length > 0 ? (
                      Array.from(new Map(allBungalows.map(b => [b.bungalow_code, b])).values())
                        .slice(0, showMoreBungalows ? undefined : 6)
                        .map((bungalowItem) => (
                          <div key={bungalowItem.bungalow_code} className="flex items-center gap-3 cursor-pointer">
                            <Checkbox
                              checked={selectedBungalowCodes.includes(bungalowItem.bungalow_code) || bungalowItem.bungalow_code === bungalow.bungalow_code}
                              onCheckedChange={(checked) => handleBungalowCheckboxChange(bungalowItem.bungalow_code, checked as boolean)}
                              className="data-[state=checked]:bg-[#2E4D98] data-[state=checked]:border-[#2E4D98]"
                            />
                            <span
                              className={`text-gray-700 hover:text-[#2E4D98] cursor-pointer ${(selectedBungalowCodes.includes(bungalowItem.bungalow_code) || bungalowItem.bungalow_code === bungalow.bungalow_code) ? 'font-bold text-[#2E4D98]' : ''}`}
                              onClick={() => handleBungalowCheckboxChange(bungalowItem.bungalow_code, !selectedBungalowCodes.includes(bungalowItem.bungalow_code))}
                            >
                              {bungalowItem.name} ({bungalowItem.bungalow_code})
                            </span>
                          </div>
                        ))
                    ) : (
                      <div className="text-sm text-gray-400">Loading bungalows...</div>
                    )}
                  </div>
                  {allBungalows.length > 6 && (
                    <button 
                      onClick={() => setShowMoreBungalows(!showMoreBungalows)} 
                      className="mt-4 text-[#2E4D98] text-sm font-semibold hover:underline"
                    >
                      {showMoreBungalows ? "Show Less" : `Show ${allBungalows.length - 6} More`}
                    </button>
                  )}
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              {/* Header */}
              <div className="bg-[#2E3A8A] text-white text-center py-3 font-semibold text-md mb-2">
                Bungalow Booking - {bungalow.name} ({bungalow.bungalow_code})
              </div>

              {/* Two-column header UI for Bungalow Code and Name */}
              {/* <div className="bg-white border-2 border-gray-300 rounded-lg p-3 mb-3 shadow-sm">
                <div className="grid grid-cols-2 gap-0 border border-gray-400 rounded overflow-hidden">
                  <div className="bg-[#2E4D98] border-r border-gray-400 p-2 flex items-center justify-center">
                    <div className="text-sm font-bold text-white text-center">BUNGALOW CODE</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-2 flex items-center justify-center">
                    <div className="text-sm font-bold text-gray-900 text-center">
                      {bungalow.bungalow_code}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-0 border border-gray-400 rounded overflow-hidden mt-0 border-t-0 rounded-t-none">
                  <div className="bg-[#2E4D98] border-r border-gray-400 p-2 flex items-center justify-center">
                    <div className="text-sm font-bold text-white text-center">NAME</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-2 flex items-center justify-center">
                    <div className="text-sm font-bold text-gray-900 text-center">
                      {bungalow.name}
                    </div>
                  </div>
                </div>
              </div> */}

              {/* Image Carousel */}
              <div className="relative rounded-2xl overflow-hidden mb-4">
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
                  <div className="grid grid-cols-8 bg-[#E8F0FF] border-b border-black">
                    <div className="border-r border-white bg-[#2E3a8a] px-9 lg:px-4 py-2 lg:py-3">
                      <h3 className="font-bold text-white text-left text-sm lg:text-lg">Bungalow</h3>
                    </div>
                    <div className="col-span-6 border-r border-white bg-[#2E3a8a] px-6 lg:px-4 py-2 lg:py-3">
                      <h3 className="font-bold text-white text-left text-sm lg:text-lg">Name</h3>
                    </div>
                    <div className="px-2 lg:px-4 py-2 lg:py-3 bg-[#2E3a8a]">
                      <h3 className="font-bold text-white text-start text-sm lg:text-lg">Price</h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-8 border-black">
                    <div className="border-r border-black px-1 lg:px-4 py-2 lg:py-3 bg-blue-50">
                      <p className="text-sm lg:text-lg font-bold text-[#2E4D98] text-left tracking-wide">
                        {bungalow.bungalow_code}
                      </p>
                    </div>
                    <div className="col-span-6 border-r border-black px-2 lg:px-4 py-2 lg:py-3 bg-blue-50">
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
<div className="grid grid-cols-6 bg-white border-t border-black">
  {tabs.map((tab, idx) => (
    <button
      key={tab.key}
      onClick={() => handleTabClick(tab.key)}
      className={`col-span-1 sm:col-span-1 md:col-span-1 
        lg:col-span-1 
        px-2 py-4 text-xs sm:text-sm font-semibold text-center
        ${idx < 5 ? "border-r border-black" : ""}
        ${activeTab === tab.key
          ? "bg-[#A72703] text-white"
          : "bg-[#FFE797] text-gray-800"
        }
      `}
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

              {/* Related Bungalows Section */}
              {/* {relatedBungalows.length > 0 && (
                <div className="mt-6">
                  <div className="bg-red-600 text-white text-center font-bold text-lg lg:text-2xl py-2 lg:py-2.5 rounded-t-lg">
                    Related Bungalows
                  </div>
                  <div className="border-2 border-[#1e3a8a] border-t-0 rounded-b-lg p-4 bg-[#FFEBEE]">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {relatedBungalows.map((related) => (
                        <div
                          key={related.bungalow_id}
                          onClick={() => handleRelatedClick(related)}
                          className="cursor-pointer bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                        >
                          <img
                            src={`${BASE_URL}${related.main_image}`}
                            alt={related.name}
                            className="w-full h-40 object-cover"
                            onError={(e) => {
                              e.currentTarget.src = Villaimg1;
                            }}
                          />
                          <div className="p-3">
                            <h4 className="font-bold text-gray-800">{related.name}</h4>
                            <p className="text-[#E53C42] font-semibold">
                              ₹{parseFloat(related.price).toLocaleString('en-IN')}
                            </p>
                            <button
                              className="mt-2 w-full bg-[#2E4D98] text-white py-1 rounded-lg text-sm hover:opacity-90"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRelatedClick(related);
                              }}
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )} */}
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Bunglowbookingcard;