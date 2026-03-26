import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "@/ApiUrls";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

const ExhibitionView: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const passedCategory = location.state?.category || null;

  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [openQA, setOpenQA] = useState<number | null>(null);

  const [selectedCountry, setSelectedCountry] = useState<string | null>(passedCategory);

  const [headerTitle, setHeaderTitle] = useState<string>(
    passedCategory ? passedCategory : "Exhibition"
  );

  // ── Data state ─────────────────────────────────────────────────────────────
  const [aboutData, setAboutData] = useState<AboutData>({
    banner_image: "",
    imageText: "",
    qa: [],
  });

  const [domesticList, setDomesticList] = useState<string[]>([]);
  const [exhibitionData, setExhibitionData] = useState<ExhibitionItem[]>([]);
  const [selectedExhibitionData, setSelectedExhibitionData] = useState<ExhibitionItem | null>(null);

  const [loading, setLoading] = useState({
    about: false,
    domestic: false,
    exhibitions: false,
  });

  // ── Fetch About data ───────────────────────────────────────────────────────
  useEffect(() => {
    const fetchAboutData = async () => {
      setLoading((prev) => ({ ...prev, about: true }));
      try {
        const response = await fetch(`${BASE_URL}/api/exhibitions/about`);
        if (!response.ok) throw new Error(`Failed: ${response.status}`);
        const data = await response.json();
        if (data) {
          const imageUrl = data.banner_image
            ? `${BASE_URL}/uploads/exhibition/${data.banner_image}`
            : data.image_url || data.image_path || "";
          setAboutData({
            banner_image: data.banner_image || "",
            imageText: imageUrl,
            qa: Array.isArray(data.questions)
              ? data.questions.map((q: any) => ({ q: q.question, a: q.answer }))
              : [],
          });
        }
      } catch (error) {
        console.error("Error fetching about exhibition:", error);
        setAboutData({
          banner_image: "",
          imageText: "",
          qa: [{ q: "Error loading data", a: "Failed to load about exhibition data." }],
        });
      } finally {
        setLoading((prev) => ({ ...prev, about: false }));
      }
    };
    fetchAboutData();
  }, []);

  useEffect(() => {
    const cat = location.state?.category ?? null;
    if (cat) {
      setSelectedCountry(cat);
      setHeaderTitle(cat);
      setActiveMenu(null);
      fetchExhibitionByName(cat);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchDomesticData = async () => {
      setLoading((prev) => ({ ...prev, domestic: true }));
      try {
        const response = await fetch(`${BASE_URL}/api/exhibitions/domestic`);
        if (!response.ok) throw new Error(`Failed: ${response.status}`);
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setDomesticList(data.map((item: any) => item.country_name));
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
        setLoading((prev) => ({ ...prev, domestic: false }));
      }
    };
    fetchDomesticData();
  }, []);

  const fetchExhibitionByName = async (countryName: string) => {
    setLoading((prev) => ({ ...prev, exhibitions: true }));
    try {
      const exhibition = exhibitionData.find(
        (item) => item.country_name === countryName
      );
      
      if (exhibition) {
        setSelectedExhibitionData(exhibition);
      } else {
        const response = await fetch(`${BASE_URL}/api/exhibitions/domestic`);
        const allData = await response.json();
        const found = allData.find((item: any) => item.country_name === countryName);
        setSelectedExhibitionData(found || null);
      }
    } catch (error) {
      console.error("Error fetching exhibition details:", error);
      setSelectedExhibitionData(null);
    } finally {
      setLoading((prev) => ({ ...prev, exhibitions: false }));
    }
  };

  const handleAboutClick = () => {
    const next = activeMenu === "About Exhibition" ? null : "About Exhibition";
    setActiveMenu(next);
    setSelectedCountry(null);
    setSelectedExhibitionData(null);
    setOpenQA(null);
    setHeaderTitle(next ? "About Exhibition" : "Exhibition");
  };

  const handleCountryClick = (country: string) => {
    setSelectedCountry(country);
    setActiveMenu(null);
    setOpenQA(null);
    setHeaderTitle("Domestic");
    fetchExhibitionByName(country);
  };

  const handleQAClick = (index: number) => {
    setOpenQA(openQA === index ? null : index);
  };

  const isImageUrl = (url: string) =>
    url && (url.startsWith("http") || url.startsWith("/"));

  const getFullImageUrl = (imagePath: string) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http")) return imagePath;
    return `${BASE_URL}/uploads/exhibition/${imagePath}`;
  };

  const renderAboutContent = () => {
    if (loading.about) {
      return (
        <div
          className="flex flex-col items-center justify-center gap-2"
          style={{ minHeight: "400px" }}
        >
          <span className="animate-spin h-8 w-8 border-4 border-gray-300 border-t-blue-600 rounded-full" />
          <span className="text-gray-500">Loading about exhibition...</span>
        </div>
      );
    }
    return (
      <>
        <div className="border m-4 bg-gray-50 overflow-hidden relative">
          {aboutData.imageText && isImageUrl(aboutData.imageText) ? (
            <div className="relative w-full">
              <img
                src={aboutData.imageText}
                alt="Exhibition Banner"
                className="w-full h-auto block"
                style={{ maxHeight: "450px", objectFit: "cover" }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const errorDiv = e.currentTarget.parentElement?.querySelector(
                    ".image-error"
                  ) as HTMLElement;
                  if (errorDiv) errorDiv.style.display = "flex";
                }}
              />
              <div
                className="image-error hidden flex-col items-center justify-center gap-2 text-gray-500 text-center p-4"
                style={{ minHeight: "200px" }}
              >
                <div className="text-sm">Failed to load image</div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center p-2">
                <h1
                  className="font-black text-center"
                  style={{
                    fontSize: "clamp(1rem, 6vw, 90px)",
                    color: "#00205b",
                    textShadow: "2px 2px 8px rgba(0,0,0,0.34)",
                    lineHeight: "1.2",
                  }}
                >
                  ABOUT EXHIBITION
                </h1>
              </div>
            </div>
          ) : (
            <div
              className="flex items-center justify-center text-gray-500 text-center p-4"
              style={{ minHeight: "200px" }}
            >
              <div className="text-sm">No image available</div>
            </div>
          )}
        </div>

        <div className="mx-4 mb-4 border">
          {aboutData.qa.length > 0 ? (
            aboutData.qa.map((item, index) => (
              <div key={index} className="border-t">
                <div
                  onClick={() => handleQAClick(index)}
                  className="flex justify-between items-center px-4 py-3 cursor-pointer"
                  style={{ backgroundColor: "#2E3A8A", color: "#fff" }}
                >
                  <span className="text-sm md:text-base">{item.q}</span>
                  <span className="text-xs md:text-sm">
                    {openQA === index ? "▼" : "▶"}
                  </span>
                </div>
                {openQA === index && (
                  <div
                    className="px-4 py-4 bg-[#E8F0FF] overflow-y-auto text-sm md:text-base border border-black"
                    style={{
                      minHeight: "150px",
                      maxHeight: "250px",
                      textAlign: "justify",
                    }}
                  >
                    {item.a}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="px-4 py-6 text-center text-gray-500 text-sm">
              No questions available
            </div>
          )}
        </div>
      </>
    );
  };

const renderCountryCards = () => {
  if (loading.exhibitions) {
    return (
      <div className="flex items-center justify-center h-full py-16">
        <div className="flex flex-col items-center gap-2">
          <span className="animate-spin h-8 w-8 border-4 border-gray-300 border-t-blue-600 rounded-full" />
          <span className="text-gray-500">Loading exhibition details...</span>
        </div>
      </div>
    );
  }

  if (!selectedExhibitionData || !selectedExhibitionData.cities || selectedExhibitionData.cities.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 py-16">
        <p className="text-sm md:text-base text-center px-4">
          No exhibition data available for {selectedCountry}
        </p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="bg-blue-200 text-center border-b border-gray-400 py-3 font-semibold">
        {selectedExhibitionData.country_name}
      </div>

<div className="px-6 py-2">
  <div className="w-[350px] gap-6 shadow-lg rounded-xl">
              {selectedExhibitionData.cities.map((city) => (
          <div
            key={city.id}
            className="border border-black flex flex-col w-full hover:shadow-lg transition-shadow"
          >
            <div className="bg-blue-200 border-b border-black flex items-stretch text-sm h-12">
              <div className="flex-1 flex items-center justify-start px-3 font-medium">
                City
              </div>
              
              <div className="w-[1px] bg-black" />
              
              <div className="flex-1 flex items-center justify-end px-3 font-semibold">
                {city.city_name}
              </div>
            </div>

            <div className="bg-blue-300 h-48 flex flex-col items-center justify-center relative overflow-hidden border-b border-black">
              {city.image ? (
                <img
                  src={getFullImageUrl(city.image)}
                  alt={city.city_name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      parent.innerHTML = `
                        <div class="flex flex-col items-center justify-center w-full h-full text-gray-700 p-4">
                          <span class="text-center text-sm">${city.city_name}</span>
                          <span class="text-center text-xs text-gray-600 mt-2">Image not available</span>
                        </div>
                      `;
                    }
                  }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-700 p-4">
                  <span className="text-center text-sm">{city.city_name}</span>
                  <span className="text-center text-xs text-gray-600 mt-2">No image available</span>
                </div>
              )}
            </div>

            <div className="flex border-t border-black">
              <button
                onClick={() => navigate(`/exhibitiondetail/${selectedExhibitionData.id}`)}
                className="flex-1 py-3 hover:bg-gray-100 font-medium text-sm transition-colors"
              >
                View Details
              </button>
              
        <div className="px-4 py-3 bg-gradient-to-r   flex items-center justify-center border-l border-r border-black">
  <div className="flex items-center gap-2 text-sm font-medium">
    <span className="text-black">Price:</span>
    <span className="text-black font-semibold">
      ₹{parseFloat(city.price).toLocaleString('en-IN')}
    </span>
  </div>
</div>
              
              <button className="flex-1 py-3 hover:bg-gray-100 font-medium text-sm transition-colors">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

  const renderContent = () => {
    if (selectedCountry) return renderCountryCards();
    if (activeMenu === "About Exhibition") return renderAboutContent();
    return (
      <div className="flex items-center justify-center h-full text-gray-400 py-16">
        <p className="text-sm md:text-base text-center px-4">
          Select an item from the menu
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <div className="bg-white border rounded-lg shadow overflow-hidden">
        <div className="flex min-h-[600px]">
          <div className="w-64 border-r flex-shrink-0 bg-blue-100">
            <div className="bg-[#2E3A8A] text-white text-center font-semibold py-3 text-sm">
              Exhibition
            </div>

            <div
              onClick={handleAboutClick}
              className={`flex justify-between items-center px-4 py-3 cursor-pointer text-sm ${
                activeMenu === "About Exhibition"
                  ? "bg-blue-100 font-semibold text-[#2E3A8A]"
                  : "hover:bg-blue-50 text-gray-700"
              }`}
            >
              <span>About Exhibition</span>
              <span className="text-xs">
                {activeMenu === "About Exhibition" ? "▼" : "▶"}
              </span>
            </div>

            {/* Domestic country list */}
            <div className="bg-[#2E3A8A] text-white text-center font-semibold py-3 text-sm">
              Domestic
            </div>

  <div className="border-b border-black">
  {loading.domestic ? (
    <div className="flex justify-center py-4">
      <span className="animate-spin h-5 w-5 border-2 border-gray-300 border-t-blue-600 rounded-full" />
    </div>
  ) : domesticList.length > 0 ? (
    domesticList.map((country) => (
      <div
        key={country}
        onClick={() => handleCountryClick(country)}
        className={`flex items-center px-4 py-3 cursor-pointer border-t border-black text-sm transition-colors bg-blue-100 hover:bg-blue-200 ${
          selectedCountry === country
            ? "font-semibold text-[#2E3A8A]"
            : "text-gray-700"
        }`}
      >
        <span className="mr-2 text-xs text-gray-400">›</span>
        <span>{country}</span>
      </div>
    ))
  ) : (
    <div className="px-4 py-3 text-sm text-gray-400">
      No data available
    </div>
  )}
</div>  
          </div>

          <div className="flex-1 min-w-0 flex flex-col">
            <div className="bg-[#2E3A8A] text-white text-center py-3 font-semibold text-md md:text-base">
              Domestic
            </div>

            <div className="flex-1 overflow-y-auto bg-[#FFEBEE]">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ExhibitionView;