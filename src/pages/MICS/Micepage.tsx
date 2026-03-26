import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BASE_URL } from "@/ApiUrls";

const MicePage: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [openQA, setOpenQA] = useState<number | null>(null);
  const [data, setData] = useState<any>(null);

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
    <div className="min-h-screen  bg-[#FFEBEE]">
      <Header />

      <div className="main-layout flex flex-col md:flex-row w-full gap-3 md:gap-5 p-3 md:p-5">

        {/* Sidebar */}
        <div className="w-full md:w-auto">
          <Sidebar />
        </div>

        <div className="flex-1">

          {/* ===== TOP SECTION ===== */}
          <div className="flex flex-col md:flex-row w-full h-auto md:h-[480px] overflow-hidden">

            {/* LEFT IMAGE */}
            <div
              className="relative w-full md:w-[60%] h-[250px] md:h-full bg-cover bg-center"
              style={{
                backgroundImage: data?.banner_image
                  ? `url(${BASE_URL}/uploads/mice/main/${data.banner_image})`
                  : "none"
              }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <h1
                  className="text-[70px] sm:text-[100px] md:text-[140px] lg:text-[180px] font-black text-[#00205b] leading-none mb-1"
                  style={{ textShadow: "0px 0px 20px rgba(255, 255, 255, 0.19)" }}
                >
                  MICE
                </h1>
              </div>
            </div>

            {/* RIGHT MENU */}
         <div className="w-full md:w-[40%] h-full bg-[#00205b] flex flex-col items-start justify-center gap-3 md:gap-5 px-4 md:px-6 py-4 md:py-0">
  {["Meeting", "Incentives", "Conference", "Events"].map((menu) => {
    const subItems: Record<string, string[]> = {
      Meeting: ["Board Meeting", "Team Meeting", "Annual Meeting"],
      Incentives: ["Staff Incentives", "Sales Incentives", "Travel Incentives"],
      Conference: ["Tech Conference", "Business Conference", "Global Conference"],
      Events: ["Corporate Events", "Social Events", "Exhibition Events"],
    };

    return (
      <div key={menu} className="relative w-full md:w-78">
        <button
          onClick={() =>
            setActiveMenu(activeMenu === menu ? null : menu)
          }
          className="bg-white text-[#00205b] px-5 py-4 font-semibold w-full text-left flex justify-between items-center"
        >
          {menu}
          <span>{activeMenu === menu ? "◀" : "▶"}</span>
        </button>

        {/* ▼ Dropdown below button */}
        {activeMenu === menu && (
          <div className="absolute left-0 top-full mt-1 flex flex-col bg-white shadow-lg w-full md:w-[435px] z-50">
            {subItems[menu].map((sub) => (
              <a
                key={sub}
                href="#"
                className="px-4 py-3 text-sm hover:bg-blue-50 border-b"
              >
                {sub}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  })}
</div>
          </div>

    {/* ===== BELOW SECTION ===== */}
<div className="grid grid-cols-1 md:grid-cols-12 mt-6 md:mt-8 border  rounded-lg shadow bg-blue-100">
<div className="md:col-span-3 bg-blue-100 border-r border-black">
    <div className="bg-[#00205b] text-white px-4 py-3 font-semibold border-b border-black">
      MicePage
    </div>

    <button
      onClick={() =>
        setActiveMenu(activeMenu === "Micpage" ? null : "Micpage")
      }
      className={`w-full text-left px-4 py-3 border-b border-black flex justify-between bg-blue-100 ${
        activeMenu === "Micpage"
          ? "bg-blue-100 font-medium"
          : "bg-blue-100 hover:bg-blue-100"
      }`}
    >
      Micpage
      <span>{activeMenu === "Micpage" ? "▼" : "▶"}</span>
    </button>
  </div>

  {/* RIGHT */}
  <div className="md:col-span-9 p-4 md:p-6 bg-blue-100">

    {activeMenu === "Micpage" && data ? (
      <>
        {data.questions?.map((item: any, index: number) => (
          <div key={index} className="border border-black mb-3 rounded overflow-hidden">

            <div
              onClick={() =>
                setOpenQA(openQA === index ? null : index)
              }
              className="bg-[#00205b] text-white px-4 py-3 cursor-pointer flex justify-between border-b border-black"
            >
              <span className="text-sm md:text-base">
                {item.question}
              </span>
              <span>{openQA === index ? "▼" : "▶"}</span>
            </div>

            {openQA === index && (
              <div className="px-4 py-4 bg-blue-100 text-sm md:text-base border-t border-black">
                {item.answer}
              </div>
            )}

          </div>
        ))}
      </>
    ) : (
      <div className="text-center text-gray-500 py-10 bg-blue-100">
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