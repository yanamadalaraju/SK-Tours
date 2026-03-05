import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BASE_URL } from "@/ApiUrls";

const MicePage: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [openQA, setOpenQA] = useState<number | null>(null);
  const [data, setData] = useState<any>(null);
  const menuItems = ["Meeting", "Incentives", "Conference", "Events"];

  /* ===== FETCH DATA ===== */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/mice/main`);
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching MICE main:", error);
      }
    };

    fetchData();
  }, []);

return (
  <div className="min-h-screen flex flex-col bg-gray-50">
    <Header />

    <div className="flex w-full gap-6 p-5">
      {/* Sidebar */}
      <div className="w-64">
        <Sidebar />
      </div>

      <div className="flex-1">

        {/* ===== HERO SECTION (NO GOLD OVERLAY) ===== */}
     <div
  className="relative w-full h-[480px] flex items-center justify-center bg-cover bg-center overflow-hidden"
  style={{
    backgroundImage: data?.banner_image
      ? `url(${BASE_URL}/uploads/mice/main/${data.banner_image})`
      : "none"
  }}
>
          <div className="relative z-10 text-center">
      <h1
  className="text-[200px] font-black text-[#00205b] leading-none mb-1"
  style={{
    textShadow: "4px 4px 10px rgba(0, 0, 0, 0.4)"
  }}
>
  MICE
</h1>

            <div className="flex gap-2 justify-center -mt-4">
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-white px-6 py-2 text-2xl font-semibold text-red-600 shadow-md"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== BELOW SECTION ===== */}
        <div className="grid grid-cols-12 mt-8 border rounded-lg shadow bg-white">

          {/* LEFT DROPDOWN (Micpage kept) */}
          <div className="col-span-3 border-r">
            <div className="bg-[#00205b] text-white px-4 py-3 font-semibold">
              MicePage
            </div>

            <button
              onClick={() =>
                setActiveMenu(activeMenu === "Micpage" ? null : "Micpage")
              }
              className={`w-full text-left px-4 py-3 border-b flex justify-between ${
                activeMenu === "Micpage"
                  ? "bg-blue-100 font-medium"
                  : "hover:bg-gray-50"
              }`}
            >
              Micpage
              <span>{activeMenu === "Micpage" ? "▼" : "▶"}</span>
            </button>
          </div>

          {/* RIGHT CONTENT */}
          <div className="col-span-9 p-6">

            {activeMenu === "Micpage" && data ? (
              <>
                {/* QUESTIONS */}
                {data.questions?.map((item: any, index: number) => (
                  <div key={index} className="border mb-3 rounded">
                    <div
                      onClick={() =>
                        setOpenQA(openQA === index ? null : index)
                      }
                      className="bg-[#00205b] text-white px-4 py-3 cursor-pointer flex justify-between"
                    >
                      <span>{item.question}</span>
                      <span>{openQA === index ? "▼" : "▶"}</span>
                    </div>

                    {openQA === index && (
                      <div className="px-4 py-4 bg-white">
                        {item.answer}
                      </div>
                    )}
                  </div>
                ))}
              </>
            ) : (
              <div className="text-center text-gray-500 py-10">
                Click "Micpage" to view details
              </div>
            )}

          </div>
        </div>

      </div>
    </div>

    <Footer />
  </div>
);
};

export default MicePage;