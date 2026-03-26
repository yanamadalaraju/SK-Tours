import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BASE_URL } from '@/ApiUrls';
import { useNavigate } from "react-router-dom";

const Exhibition = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [openQA, setOpenQA] = useState(null);
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(null);
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const [menuData, setMenuData] = useState({
    "About Exhibition": {
      imageText: "",
      qa: [],
      banner_image: ""
    }
  });
  
  const [categoryData, setCategoryData] = useState({
    Domestic: [],
    International: []
  });
  
  const [loading, setLoading] = useState({
    about: false,
    domestic: false,
    international: false
  });
 const handleCellClick = (value) => {
  if (!value || value === "") return; 
  navigate("/exhibitionview", { state: { category: value } });
};
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  useEffect(() => {
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  }, [activeMenu, activeCategory, isMobile]);
  
  useEffect(() => {
    const fetchAboutData = async () => {
      setLoading(prev => ({ ...prev, about: true }));
      try {
        const response = await fetch(`${BASE_URL}/api/exhibitions/about`);
        if (!response.ok) throw new Error('Failed to fetch about data');
        const data = await response.json();
        
        console.log('About Exhibition API Response:', data);
        
        if (data) {
          const imageUrl = data.banner_image
            ? `${BASE_URL}/uploads/exhibition/${data.banner_image}`
            : data.image_url || data.image_path || "";
          
          console.log('Constructed Image URL:', imageUrl);
          
          setMenuData(prev => ({
            ...prev,
            "About Exhibition": {
              imageText: imageUrl,
              banner_image: data.banner_image || "",
              qa: data.questions ? data.questions.map((q: any) => ({
                q: q.question,
                a: q.answer
              })) : []
            }
          }));
        }
      } catch (error) {
        console.error('Error fetching about exhibition:', error);
        setMenuData(prev => ({
          ...prev,
          "About Exhibition": {
            imageText: "",
            banner_image: "",
            qa: [{ q: "Error", a: "Failed to load about exhibition data" }]
          }
        }));
      } finally {
        setLoading(prev => ({ ...prev, about: false }));
      }
    };
    
    fetchAboutData();
  }, []);
  
  /* ===== FETCH DOMESTIC DATA ===== */
  useEffect(() => {
    const fetchDomesticData = async () => {
      setLoading(prev => ({ ...prev, domestic: true }));
      try {
        const response = await fetch(`${BASE_URL}/api/exhibitions/domestic`);
        if (!response.ok) throw new Error('Failed to fetch domestic data');
        const data = await response.json();
        
        console.log('Domestic API Response:', data);
        
        if (Array.isArray(data)) {
          const formattedData = [];
          for (let i = 0; i < data.length; i += 3) {
            const row = data.slice(i, i + 3).map((item: any) => item.country_name);
            while (row.length < 3) row.push("");
            formattedData.push(row);
          }
          
          setCategoryData(prev => ({
            ...prev,
            Domestic: formattedData
          }));
        }
      } catch (error) {
        console.error('Error fetching domestic exhibition:', error);
        setCategoryData(prev => ({
          ...prev,
          Domestic: [["Error", "Loading", "Failed"]]
        }));
      } finally {
        setLoading(prev => ({ ...prev, domestic: false }));
      }
    };
    
    fetchDomesticData();
  }, []);
  
  /* ===== FETCH INTERNATIONAL DATA ===== */
  useEffect(() => {
    const fetchInternationalData = async () => {
      setLoading(prev => ({ ...prev, international: true }));
      try {
        const response = await fetch(`${BASE_URL}/api/exhibitions/international`);
        if (!response.ok) throw new Error('Failed to fetch international data');
        const data = await response.json();
        
        console.log('International API Response:', data);
        
        if (Array.isArray(data)) {
          const formattedData = [];
          for (let i = 0; i < data.length; i += 3) {
            const row = data.slice(i, i + 3).map((item: any) => item.country_name);
            while (row.length < 3) row.push("");
            formattedData.push(row);
          }
          
          setCategoryData(prev => ({
            ...prev,
            International: formattedData
          }));
        }
      } catch (error) {
        console.error('Error fetching international exhibition:', error);
        setCategoryData(prev => ({
          ...prev,
          International: [["Error", "Loading", "Failed"]]
        }));
      } finally {
        setLoading(prev => ({ ...prev, international: false }));
      }
    };
    
    fetchInternationalData();
  }, []);
  
  /* ===== HANDLERS ===== */
  const handleMenuClick = (menu) => {
    setActiveMenu(prev => prev === menu ? null : menu);
    setActiveCategory(null);
    setOpenQA(null);
  };
  
  const handleCategoryClick = (cat) => {
    setActiveCategory(prev => prev === cat ? null : cat);
    setActiveMenu(null);
    setOpenQA(null);
  };
  
  const handleQAClick = (index) => {
    setOpenQA(openQA === index ? null : index);
  };
  
  const isImageUrl = (url) => {
    return url && (
      url.startsWith('http') ||
      url.startsWith('/')
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow p-4 md:p-6 bg-[#FFEBEE]">
        <div className="bg-white border rounded-lg shadow overflow-hidden">
          <div className="flex flex-col md:grid md:grid-cols-12 bg-[#E8F0FF]">
            
            {/* Mobile Menu Toggle Button */}
            <div className="md:hidden bg-[#2E3A8A] p-3 flex justify-between items-center">
              <span className="text-white font-semibold">Menu</span>
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white text-xl"
              >
                {isMobileMenuOpen ? "✕" : "☰"}
              </button>
            </div>
            
      <div className={`
  ${isMobileMenuOpen ? 'block' : 'hidden'} 
  md:block md:col-span-3 
  ${isMobile ? 'border-b' : 'border-r border-black'}
`}>
  
  <div className="bg-[#2E3A8A] text-white px-4 py-2 font-semibold border-b border-black">
    Exhibition
  </div>
  
  {Object.keys(menuData).map((item) => (
    <button
      key={item}
      onClick={() => handleMenuClick(item)}
      className={`w-full flex justify-between items-center px-4 py-3 border-b border-black text-left text-sm md:text-base
        ${activeMenu === item ? "bg-blue-100 font-medium" : "hover:bg-blue-50"}
        ${loading.about && item === "About Exhibition" ? "opacity-50 cursor-not-allowed" : ""}`}
      disabled={loading.about && item === "About Exhibition"}
    >
      <span className="truncate">{item}</span>
      <span className="flex items-center gap-2 flex-shrink-0">
        {loading.about && item === "About Exhibition" && (
          <span className="animate-spin h-3 w-3 md:h-4 md:w-4 border-2 border-gray-300 border-t-gray-600 rounded-full" />
        )}
        <span className="text-xs md:text-sm">{activeMenu === item ? "▼" : "▶"}</span>
      </span>
    </button>
  ))}
  
  <div className="bg-[#2E3A8A] text-white px-4 py-2 font-semibold border-b border-black border-t border-black">
    Categories
  </div>
  
  {Object.keys(categoryData).map((cat) => (
    <button
      key={cat}
      onClick={() => handleCategoryClick(cat)}
      className={`w-full flex justify-between items-center px-4 py-3 text-left text-sm md:text-base relative border-b border-black
        ${activeCategory === cat ? "bg-blue-100 font-medium" : "hover:bg-blue-50"}
        ${(cat === "Domestic" && loading.domestic) || (cat === "International" && loading.international) ? "opacity-50 cursor-not-allowed" : ""}`}
      disabled={cat === "Domestic" ? loading.domestic : loading.international}
    >
      <span>{cat}</span>
      <span className="flex items-center gap-2 flex-shrink-0">
        {(cat === "Domestic" && loading.domestic) ||
         (cat === "International" && loading.international) ? (
          <span className="animate-spin h-3 w-3 md:h-4 md:w-4 border-2 border-gray-300 border-t-gray-600 rounded-full" />
        ) : null}
        <span className="text-xs md:text-sm">{activeCategory === cat ? "▼" : "▶"}</span>
      </span>
    </button>
  ))}
</div>
            
            {/* Content Area */}
            <div className="md:col-span-9">
              
              {activeMenu && (
                <>
                  <div className="border-b px-4 py-2 font-semibold flex justify-center items-center bg-[#2E3A8A] text-white">
                    <span className="text-sm md:text-base">{activeMenu}</span>
                    {loading.about && activeMenu === "About Exhibition" && (
                      <span className="text-xs text-gray-200 flex items-center gap-1 ml-2">
                        <span className="animate-spin h-2 w-2 md:h-3 md:w-3 border-2 border-gray-300 border-t-white rounded-full" />
                        Loading...
                      </span>
                    )}
                  </div>
                  
                  <div className="border m-2 md:m-4 bg-gray-50 overflow-hidden">
                    {loading.about && activeMenu === "About Exhibition" ? (
                      <div className="flex flex-col items-center justify-center gap-2" style={{ minHeight: "200px", height: "auto" }}>
                        <span className="animate-spin h-6 w-6 md:h-8 md:w-8 border-4 border-gray-300 border-t-blue-600 rounded-full" />
                        <span className="text-gray-500 text-sm">Loading image...</span>
                      </div>
                    ) : menuData[activeMenu].imageText && isImageUrl(menuData[activeMenu].imageText) ? (
                      <div className="relative w-full">
                        {/* Banner Image */}
                        <img
                          src={menuData[activeMenu].imageText}
                          alt="Exhibition Banner"
                          className="w-full h-auto block"
                          style={{ maxHeight: "450px", objectFit: "cover" }}
                          onError={(e) => {
                            console.error('Image failed to load:', menuData[activeMenu].imageText);
                            e.currentTarget.style.display = 'none';
                            const parent = e.currentTarget.parentElement;
                            if (parent) {
                              const errorDiv = parent.querySelector('.image-error');
                              if (errorDiv) {
                                (errorDiv as HTMLElement).style.display = 'flex';
                              }
                            }
                          }}
                        />
                        
                        <div 
                          className="image-error hidden flex-col items-center justify-center gap-2 text-gray-500 text-center p-4"
                          style={{ minHeight: "200px" }}
                        >
                          <div className="text-sm">Failed to load image</div>
                          <div className="text-xs mt-2 break-all px-2">
                            URL: {menuData[activeMenu].imageText}
                          </div>
                          <button
                            className="mt-2 text-blue-500 text-xs underline"
                            onClick={() => window.open(menuData[activeMenu].imageText, '_blank')}
                          >
                            Open image in new tab
                          </button>
                        </div>
                        
                        {/* Overlay Title - Responsive */}
                        <div className="absolute inset-0 flex items-center justify-center p-2">
                          <h1
                            className="font-black text-center"
                            style={{
                              fontSize: "clamp(1rem, 6vw, 90px)",
                              color: "#00205b",
                              textShadow: "2px 2px 8px rgba(0, 0, 0, 0.34)",
                              lineHeight: "1.2",
                              padding: "0 10px"
                            }}
                          >
                            ABOUT EXHIBITION
                          </h1>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center text-gray-500 text-center p-4" style={{ minHeight: "200px" }}>
                        <div className="text-sm">
                          No image available
                          {menuData[activeMenu].banner_image && (
                            <div className="text-xs mt-2 break-all">
                              Image filename: {menuData[activeMenu].banner_image}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mx-2 md:mx-4 mb-4 border">
                    {menuData[activeMenu].qa.length > 0 ? (
                      menuData[activeMenu].qa.map((item, index) => (
                        <div key={index} className="border-t">
                          <div
                            onClick={() => handleQAClick(index)}
                            className="flex justify-between items-center px-3 md:px-4 py-2 md:py-3 cursor-pointer"
                            style={{ backgroundColor: "#2E3A8A", color: "#fff" }}
                          >
                            <span className="text-sm md:text-base">{item.q}</span>
                            <span className="text-xs md:text-sm">{openQA === index ? "▼" : "▶"}</span>
                          </div>
                     {openQA === index && (
  <div
    className="px-3 md:px-4 py-3 md:py-4 bg-[#E8F0FF] overflow-y-auto text-sm md:text-base border border-black"
    style={{
      minHeight: "150px",
      maxHeight: "250px",
      width: "100%",
      textAlign: "justify"
    }}
  >
                              {item.a}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-6 text-center text-gray-500 text-sm">
                        {loading.about && activeMenu === "About Exhibition" ? (
                          <div className="flex items-center justify-center gap-2">
                            <span className="animate-spin h-4 w-4 border-2 border-gray-300 border-t-blue-600 rounded-full" />
                            Loading questions...
                          </div>
                        ) : (
                          "No data available"
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}
              
              {activeCategory && (
                <div className="p-2 md:p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-sm md:text-base">{activeCategory}</h3>
                    {(activeCategory === "Domestic" && loading.domestic) ||
                     (activeCategory === "International" && loading.international) ? (
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <span className="animate-spin h-2 w-2 md:h-3 md:w-3 border-2 border-gray-300 border-t-blue-600 rounded-full" />
                        Loading...
                      </span>
                    ) : null}
                  </div>
                  
                  {categoryData[activeCategory].length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-black text-sm md:text-base">
                        <tbody>
                          {categoryData[activeCategory].map((row, i) => (
                            <tr key={i}>
                              {row.map((cell, j) => (
                              <td
  key={j}
  onClick={() => handleCellClick(cell)}
  className={`border border-black px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm hover:bg-gray-100 cursor-pointer ${
    cell ? "" : "bg-gray-50 cursor-default"
  }`}
>
  <span className="break-words">{cell || ""}</span>
</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-6 md:py-8 text-gray-500 text-sm">
                      {activeCategory === "Domestic" && loading.domestic ? (
                        <div className="flex flex-col items-center gap-2">
                          <span className="animate-spin h-6 w-6 md:h-8 md:w-8 border-4 border-gray-300 border-t-blue-600 rounded-full" />
                          <span>Loading domestic categories...</span>
                        </div>
                      ) : activeCategory === "International" && loading.international ? (
                        <div className="flex flex-col items-center gap-2">
                          <span className="animate-spin h-6 w-6 md:h-8 md:w-8 border-4 border-gray-300 border-t-blue-600 rounded-full" />
                          <span>Loading international categories...</span>
                        </div>
                      ) : (
                        "No categories available"
                      )}
                    </div>
                  )}
                </div>
              )}
              
              {!activeMenu && !activeCategory && (
                <div className="flex items-center justify-center h-full text-gray-400 py-8 md:py-16">
                  <p className="text-sm md:text-base text-center px-4">Select an item from the menu</p>
                </div>
              )}
              
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Exhibition;