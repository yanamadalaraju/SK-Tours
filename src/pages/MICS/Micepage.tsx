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
  <div className="min-h-screen flex flex-col bg-gray-50">
    <Header />

    <div className="flex w-full gap-6 p-5">
      {/* Sidebar */}
      <div className="w-64">
        <Sidebar />
      </div>

      <div className="flex-1">

  {/* ===== HERO SECTION ===== */}
<div className="flex w-full h-[480px] overflow-hidden">

  {/* LEFT 60%: Image with MICE text overlay */}
  <div
    className="relative w-[60%] h-full bg-cover bg-center"
    style={{
      backgroundImage: data?.banner_image
        ? `url(${BASE_URL}/uploads/mice/main/${data.banner_image})`
        : "none"
    }}
  >
    <div className="absolute inset-0 flex flex-col items-center justify-center">
<h1
  className="text-[180px] font-black text-[#00205b] leading-none mb-1"
  style={{ textShadow: "0px 0px 20px rgba(255, 255, 255, 0.19)" }}
>
  MICE
</h1>
   
    </div>
  </div>

<div className="w-[40%] h-full bg-[#00205b] flex flex-col items-start justify-center gap-5 px-6">

  {["Meeting", "Incentives", "Conference", "Events"].map((menu) => {
    const subItems: Record<string, string[]> = {
      Meeting: ["Board Meeting", "Team Meeting", "Annual Meeting"],
      Incentives: ["Staff Incentives", "Sales Incentives", "Travel Incentives"],
      Conference: ["Tech Conference", "Business Conference", "Global Conference"],
      Events: ["Corporate Events", "Social Events", "Exhibition Events"],
    };

    return (
      <div key={menu} className="relative w-48">
        <button
          onClick={() => setActiveMenu(activeMenu === menu ? null : menu)}
          className="bg-white text-[#00205b] px-5 py-4 font-semibold w-48 text-left flex justify-between items-center"
        >
          {menu}
          <span>{activeMenu === menu ? "◀" : "▶"}</span>
        </button>

        {activeMenu === menu && (
          <div className="absolute left-full top-0 flex flex-col bg-white shadow-lg w-48 ml-1 z-50">
            {subItems[menu].map((sub) => (
              <a key={sub} href="#" className="px-4 py-3 text-sm hover:bg-blue-50 border-b">
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