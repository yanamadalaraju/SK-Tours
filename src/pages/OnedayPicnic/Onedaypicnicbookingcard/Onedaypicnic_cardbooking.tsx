import { useState, useEffect } from "react";
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
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

interface Picnic {
  picnic_id: number;
  picnic_code: string;
  name: string;
  price: string;
  property_rate?: string;
  per_pax_twin?: string;
  per_pax_triple?: string;
  child_with_bed?: string;
  child_without_bed?: string;
  infant?: string;
  per_pax_single?: string;
  overview?: string;
  inclusive?: string;
  exclusive?: string;
  places_nearby?: string;
  booking_policy?: string;
  cancellation_policy?: string;
}

interface PicnicItem {
  picnic_id: number;
  picnic_code: string;
  name: string;
  price: string;
  main_image: string;
}

interface PicnicImage {
  image_url: string;
}

type TabType =
  | "overview"
  | "rent"
  | "inclusive"
  | "nearby"
  | "policy"
  | "cancellation";

const Onedaypicnic_cardbooking: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [picnic, setPicnic] = useState<Picnic | null>(null);
  const [images, setImages] = useState<PicnicImage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Sidebar filter states
  const [allPicnics, setAllPicnics] = useState<PicnicItem[]>([]);
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchBtn, setShowSearchBtn] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [selectedPicnicCodes, setSelectedPicnicCodes] = useState<string[]>([]);
  const [showMorePicnics, setShowMorePicnics] = useState(false);

  // Fetch all picnics for sidebar
  useEffect(() => {
    fetch(`${BASE_URL}/api/one-day-picnic`)
      .then((res) => res.json())
      .then((data) => {
        setAllPicnics(data);
      })
      .catch((err) => console.error("Error fetching picnics:", err));
  }, []);

  /* FETCH PICNIC DETAILS */
  useEffect(() => {
    if (!id) return;

    const fetchPicnicDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/api/one-day-picnic/${id}`);
        const data = await response.json();
        setPicnic(data.picnic);
        setImages(data.images || []);
      } catch (error) {
        console.error("Error fetching picnic:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPicnicDetails();
  }, [id]);

  const handleBook = (): void => {
    navigate("/ondaypicnicform");
  };

  const handlePicnicCheckboxChange = (code: string, checked: boolean) => {
    if (checked) {
      setSelectedPicnicCodes(prev => [...prev, code]);
      const selectedPicnic = allPicnics.find(p => p.picnic_code === code);
      if (selectedPicnic) {
        navigate(`/onedaybooking/${selectedPicnic.picnic_id}`);
      }
    } else {
      setSelectedPicnicCodes(prev => prev.filter(c => c !== code));
    }
  };

  const clearAllFilters = () => {
    setPriceRange([0, 200000]);
    setSearchQuery("");
    setShowSearchBtn(false);
    setIsSearchActive(false);
    setSelectedPicnicCodes([]);
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
    const foundPicnic = allPicnics.find(p => 
      p.name.toLowerCase().includes(query) || 
      p.picnic_code.toLowerCase().includes(query)
    );
    
    if (foundPicnic) {
      navigate(`/onedaybooking/${foundPicnic.picnic_id}`);
    }
  };

  if (loading || !picnic) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#FFEBEE]">
          <div className="container mx-auto px-4 py-20 text-center flex flex-col items-center justify-center gap-4">
            <span className="animate-spin h-12 w-12 border-4 border-blue-200 border-t-blue-600 rounded-full" />
            <div className="text-2xl font-bold text-[#2E4D98]">Loading picnic details...</div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  /* IMAGE CAROUSEL */
  const carouselImages: string[] =
    images.length > 0
      ? images.map((img) => `${BASE_URL}${img.image_url}`)
      : [picnic.main_image ? `${BASE_URL}${picnic.main_image}` : Villaimg1, Villaimg2, Villaimg3, Villaimg4, Villaimg5, Villaimg6, villaimg7];

  const nextImage = (): void => {
    setCurrentImageIndex((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (): void => {
    setCurrentImageIndex((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
  };

  const goToImage = (index: number): void => {
    setCurrentImageIndex(index);
  };

  const handleTabClick = (tab: TabType): void => {
    setActiveTab(tab);
  };

  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "rent", label: "Property Rate" },
    { key: "inclusive", label: "Inclusive & Exclusive" },
    { key: "nearby", label: "Place Near By" },
    { key: "policy", label: "Booking Policy" },
    { key: "cancellation", label: "Cancellation Policy" },
  ];

  const renderTabContent = () => {
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
                          {picnic.overview || "No overview available"}
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
              Property Rate
            </div>
            <div className="border-2 border-[#1e3a8a] border-t-0 overflow-hidden rounded-b-lg w-full">
              <div className="min-h-[150px] lg:min-h-[180px] max-h-[200px] lg:max-h-[250px] overflow-y-auto p-2 bg-[#FFEBEE] w-full">
                <div className="space-y-4 w-full">
                  <div className="border-gray-200 rounded-lg w-full">
                    <div className="flex items-start w-full">
                      <div className="flex-1 min-w-0">
                        <p className="text-black break-words whitespace-pre-wrap text-justify w-full text-sm lg:text-base">
                          {picnic.property_rate || "No property rate details available"}
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
                    {picnic.inclusive ? (
                      <ul className="space-y-2 w-full">
                        {picnic.inclusive.split("\n").map((item, idx) => (
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
                    {picnic.exclusive ? (
                      <ul className="space-y-2 w-full">
                        {picnic.exclusive.split("\n").map((item, idx) => (
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
                          {picnic.places_nearby || "No nearby places listed"}
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
                          {picnic.booking_policy || "No booking policy available"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3">
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
                          {picnic.cancellation_policy || "No cancellation policy available"}
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
                  <h2 className="text-2xl font-bold text-white">One Day Picnic</h2>
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

                {/* Picnic Checkboxes */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-3 bg-white p-2 rounded-lg border border-black">
                    <h2 className="text-xl font-bold text-[#2E4D98]">Picnic Types</h2>
                  </div>
                  <div className="space-y-3">
                    {allPicnics.length > 0 ? (
                      Array.from(new Map(allPicnics.map(p => [p.picnic_code, p])).values())
                        .slice(0, showMorePicnics ? undefined : 6)
                        .map((picnicItem) => (
                          <div key={picnicItem.picnic_code} className="flex items-center gap-3 cursor-pointer">
                            <Checkbox
                              checked={selectedPicnicCodes.includes(picnicItem.picnic_code) || picnicItem.picnic_code === picnic.picnic_code}
                              onCheckedChange={(checked) => handlePicnicCheckboxChange(picnicItem.picnic_code, checked as boolean)}
                              className="data-[state=checked]:bg-[#2E4D98] data-[state=checked]:border-[#2E4D98]"
                            />
                            <span
                              className={`text-gray-700 hover:text-[#2E4D98] cursor-pointer ${(selectedPicnicCodes.includes(picnicItem.picnic_code) || picnicItem.picnic_code === picnic.picnic_code) ? 'font-bold text-[#2E4D98]' : ''}`}
                              onClick={() => handlePicnicCheckboxChange(picnicItem.picnic_code, !selectedPicnicCodes.includes(picnicItem.picnic_code))}
                            >
                              {picnicItem.name} ({picnicItem.picnic_code})
                            </span>
                          </div>
                        ))
                    ) : (
                      <div className="text-sm text-gray-400">Loading picnics...</div>
                    )}
                  </div>
                  {allPicnics.length > 6 && (
                    <button 
                      onClick={() => setShowMorePicnics(!showMorePicnics)} 
                      className="mt-4 text-[#2E4D98] text-sm font-semibold hover:underline"
                    >
                      {showMorePicnics ? "Show Less" : `Show ${allPicnics.length - 6} More`}
                    </button>
                  )}
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              {/* Header */}
              <div className="bg-[#2E3A8A] text-white text-center py-3 font-semibold text-md mb-2">
                One Day Picnic - {picnic.name} ({picnic.picnic_code})
              </div>

              {/* Two-column header UI for Picnic Code and Name - OUTSIDE */}
              {/* <div className="bg-white border-2 border-gray-300 rounded-lg p-3 mb-3 shadow-sm">
                <div className="grid grid-cols-2 gap-0 border border-gray-400 rounded overflow-hidden">
                  <div className="bg-[#2E4D98] border-r border-gray-400 p-2 flex items-center justify-center">
                    <div className="text-sm font-bold text-white text-center">PICNIC CODE</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-2 flex items-center justify-center">
                    <div className="text-sm font-bold text-gray-900 text-center">
                      {picnic.picnic_code}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-0 border border-gray-400 rounded overflow-hidden mt-0 border-t-0 rounded-t-none">
                  <div className="bg-[#2E4D98] border-r border-gray-400 p-2 flex items-center justify-center">
                    <div className="text-sm font-bold text-white text-center">NAME</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-2 flex items-center justify-center">
                    <div className="text-sm font-bold text-gray-900 text-center">
                      {picnic.name}
                    </div>
                  </div>
                </div>
              </div> */}

              {/* Image Carousel */}
              <div className="relative rounded-2xl overflow-hidden mb-4">
                <div className="relative h-64 sm:h-80 lg:h-[500px] overflow-hidden">
                  <img
                    src={carouselImages[currentImageIndex]}
                    alt={picnic.name}
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
                    <div className="border-r border-white bg-[#2E3a8a] px-2 lg:px-4 py-2 lg:py-3">
                      <h3 className="font-bold text-white text-left text-sm lg:text-lg">Picnic</h3>
                    </div>
                    <div className="col-span-6 border-r border-white bg-[#2E3a8a] px-2 lg:px-4 py-2 lg:py-3">
                      <h3 className="font-bold text-white text-left text-sm lg:text-lg">Name</h3>
                    </div>
                    <div className="px-2 lg:px-4 py-2 lg:py-3 bg-[#2E3a8a]">
                      <h3 className="font-bold text-white text-start text-sm lg:text-lg">Price</h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-8 border-black">
                    <div className="border-r border-black px-1 lg:px-4 py-2 lg:py-3 bg-blue-50">
                      <p className="text-sm lg:text-lg font-bold text-[#2E4D98] text-left tracking-wide">
                        {picnic.picnic_code}
                      </p>
                    </div>
                    <div className="col-span-6 border-r border-black px-2 lg:px-4 py-2 lg:py-3 bg-blue-50">
                      <p className="text-sm lg:text-lg font-semibold text-gray-900 text-left break-words">
                        {picnic.name}
                      </p>
                    </div>
                    <div className="px-2 lg:px-4 py-2 lg:py-3 bg-red-50">
                      <p className="text-sm lg:text-lg font-bold text-[#E53C42] text-left">
                        ₹{parseFloat(picnic.price).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>

                  {/* Tab Buttons */}
                  <div className="grid grid-cols-6 bg-white border-t border-black">
                    {tabs.map((tab, idx) => (
                      <button
                        key={tab.key}
                        onClick={() => handleTabClick(tab.key as TabType)}
                        className={`px-1 lg:px-3 py-2 lg:py-4 text-[10px] xs:text-xs sm:text-sm font-semibold text-center whitespace-nowrap
                          ${idx < 5 ? "border-r border-black" : ""} transition 
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
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Onedaypicnic_cardbooking;