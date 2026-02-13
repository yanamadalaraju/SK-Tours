import React from "react";
import Sidebar from "./Sidebar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const AboutMice: React.FC = () => {
  const buttonTexts = [
    "Meeting Free Flow Entry",
    "Incentives Free Flow Entry",
    "Conference Free Flow Entry",
    "Events Free Flow Entry",
  ];

  return (
    
    <>
    <div className="min-h-screen bg-opacity-10">
        <Header />

        <div className="main-layout flex w-full gap-10 p-5">
          {/* LEFT SIDE – SIDEBAR */}
          <div className="sidebar-section w-64">
            <Sidebar />
            </div>
        
        {/* RIGHT SIDE – FIXED CONTENT AREA */}
        <div className="flex-1 p-5">
          <div className="mice-wrapper w-full p-7 bg-gradient-to-br from-[#e6d29b] to-[#d8b56f] flex gap-6 min-h-[520px]">
            
            {/* Left Upload Box */}
            <div className="flex-1 bg-white border border-black/50 flex justify-center items-center font-bold text-xl text-gray-800">
              Upload Photo
            </div>

            {/* Right Buttons */}
            <div className="flex-1 flex flex-col gap-4">
              {buttonTexts.map((text, index) => (
                <div
                  key={index}
                  className="bg-white p-8 border border-black/50 text-xl font-medium flex items-start justify-start text-left"
                >
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
    </>
  );
};

export default AboutMice;