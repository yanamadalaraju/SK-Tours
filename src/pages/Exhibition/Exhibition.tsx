import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BASE_URL } from '@/ApiUrls';

const Exhibition = () => {
  /* ===== OLD STATES ===== */
  const [activeMenu, setActiveMenu] = useState(null);
  const [openQA, setOpenQA] = useState(null);

  /* ===== NEW STATE ===== */
  const [activeCategory, setActiveCategory] = useState(null);

  /* ===== API DATA STATES ===== */
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

  /* ===== FETCH ABOUT EXHIBITION DATA ===== */
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
      url.startsWith('/') ||
      url.includes('.png') ||
      url.includes('.jpg') ||
      url.includes('.jpeg') ||
      url.includes('.gif') ||
      url.includes('.webp')
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow p-6">
        {/* =============== ONE MAIN CARD =============== */}
        <div className="bg-white border rounded-lg shadow">
          <div className="grid grid-cols-12">

            {/* ===== UNIFIED LEFT SIDEBAR ===== */}
            <div className="col-span-3 border-r">

              {/* --- Exhibition section --- */}
              <div className="bg-[#2E3A8A] text-white px-4 py-2 font-semibold">
                Exhibition
              </div>

              {Object.keys(menuData).map((item) => (
                <button
                  key={item}
                  onClick={() => handleMenuClick(item)}
                  className={`w-full flex justify-between items-center px-4 py-3 border-b text-left
                    ${activeMenu === item ? "bg-blue-100 font-medium" : "hover:bg-blue-50"}`}
                  disabled={loading.about && item === "About Exhibition"}
                >
                  <span>{item}</span>
                  <span className="flex items-center gap-2">
                    {loading.about && item === "About Exhibition" && (
                      <span className="animate-spin h-4 w-4 border-2 border-gray-300 border-t-gray-600 rounded-full" />
                    )}
                    <span>{activeMenu === item ? "▼" : "▶"}</span>
                  </span>
                </button>
              ))}

              {/* --- Categories section --- */}
              <div className="bg-[#2E3A8A] text-white px-4 py-2 font-semibold">
                Categories
              </div>

              {Object.keys(categoryData).map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`w-full flex justify-between items-center px-4 py-3 border-b text-left
                    ${activeCategory === cat ? "bg-blue-100 font-medium" : "hover:bg-blue-50"}`}
                  disabled={cat === "Domestic" ? loading.domestic : loading.international}
                >
                  <span>{cat}</span>
                  <span className="flex items-center gap-2">
                    {(cat === "Domestic" && loading.domestic) ||
                     (cat === "International" && loading.international) ? (
                      <span className="animate-spin h-4 w-4 border-2 border-gray-300 border-t-gray-600 rounded-full" />
                    ) : null}
                    <span>{activeCategory === cat ? "▼" : "▶"}</span>
                  </span>
                </button>
              ))}
            </div>

            <div className="col-span-9">

              {activeMenu && (
                <>
                  <div className="border-b px-4 py-3 font-semibold flex justify-between items-center">
                    <span>{activeMenu}</span>
                    {loading.about && activeMenu === "About Exhibition" && (
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <span className="animate-spin h-3 w-3 border-2 border-gray-300 border-t-gray-600 rounded-full" />
                        Loading...
                      </span>
                    )}
                  </div>

                  <div className="border m-4 bg-gray-50 overflow-hidden">
                    {loading.about && activeMenu === "About Exhibition" ? (
                      <div className="flex flex-col items-center justify-center gap-2" style={{ height: "350px" }}>
                        <span className="animate-spin h-8 w-8 border-4 border-gray-300 border-t-blue-600 rounded-full" />
                        <span className="text-gray-500">Loading image...</span>
                      </div>
                    ) : menuData[activeMenu].imageText && isImageUrl(menuData[activeMenu].imageText) ? (
                      <div className="w-full">
                        <img
                          src={menuData[activeMenu].imageText}
                          alt="Exhibition Banner"
                          className="w-full h-auto block"
                          style={{ maxHeight: "450px", objectFit: "cover" }}
                          onError={(e) => {
                            console.error('Image failed to load:', menuData[activeMenu].imageText);
                            (e.target as HTMLElement).style.display = 'none';
                            const errorDiv = (e.target as HTMLElement).nextSibling as HTMLElement;
                            if (errorDiv) errorDiv.style.display = 'flex';
                          }}
                        />
                        <div
                          className="text-gray-500 text-center p-4 flex-col items-center justify-center gap-2"
                          style={{ display: 'none', minHeight: "350px" }}
                        >
                          <div>Failed to load image</div>
                          <div className="text-xs mt-2 break-all">
                            URL: {menuData[activeMenu].imageText}
                          </div>
                          <div className="text-xs mt-1">
                            Filename: {menuData[activeMenu].banner_image}
                          </div>
                          <button
                            className="mt-2 text-blue-500 text-sm underline"
                            onClick={() => window.open(menuData[activeMenu].imageText, '_blank')}
                          >
                            Open image in new tab
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center text-gray-500 text-center p-4" style={{ minHeight: "350px" }}>
                        <div>
                          {menuData[activeMenu].imageText || "No image available"}
                          {menuData[activeMenu].banner_image && (
                            <div className="text-xs mt-2">
                              Image filename: {menuData[activeMenu].banner_image}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mx-4 mb-4 border">
                    {menuData[activeMenu].qa.length > 0 ? (
                      menuData[activeMenu].qa.map((item, index) => (
                        <div key={index} className="border-t">
                          <div
                            onClick={() => handleQAClick(index)}
                            className="flex justify-between items-center px-4 py-3 cursor-pointer"
                            style={{ backgroundColor: "#2E3A8A", color: "#fff" }}
                          >
                            <span>{item.q}</span>
                            <span>{openQA === index ? "▼" : "▶"}</span>
                          </div>
                          {openQA === index && (
                            <div className="px-4 py-4 bg-white" style={{ minHeight: "250px" }}>
                              {item.a}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-6 text-center text-gray-500">
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
                <div className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold">{activeCategory}</h3>
                    {(activeCategory === "Domestic" && loading.domestic) ||
                     (activeCategory === "International" && loading.international) ? (
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <span className="animate-spin h-3 w-3 border-2 border-gray-300 border-t-blue-600 rounded-full" />
                        Loading...
                      </span>
                    ) : null}
                  </div>

                  {categoryData[activeCategory].length > 0 ? (
                    <table className="w-full border-collapse border border-black">
                      <tbody>
                        {categoryData[activeCategory].map((row, i) => (
                          <tr key={i}>
                            {row.map((cell, j) => (
                              <td
                                key={j}
                                className={`border border-black px-4 py-2 text-sm hover:bg-gray-50 ${cell ? "" : "bg-gray-50"}`}
                              >
                                {cell || ""}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      {activeCategory === "Domestic" && loading.domestic ? (
                        <div className="flex flex-col items-center gap-2">
                          <span className="animate-spin h-8 w-8 border-4 border-gray-300 border-t-blue-600 rounded-full" />
                          <span>Loading domestic categories...</span>
                        </div>
                      ) : activeCategory === "International" && loading.international ? (
                        <div className="flex flex-col items-center gap-2">
                          <span className="animate-spin h-8 w-8 border-4 border-gray-300 border-t-blue-600 rounded-full" />
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
                <div className="flex items-center justify-center h-full text-gray-400 py-16">
                  <p>Select an item from the left menu</p>
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