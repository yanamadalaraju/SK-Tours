import React from "react";
import Sidebar from "./Sidebar";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const MicePage: React.FC = () => {
  const menuItems = ["Meeting", "Incentives", "Conference", "Events"];

  return (
    <>
      <div className="min-h-screen bg-opacity-10">
        <Header />

        <div className="main-layout flex w-full gap-10 p-5">
          {/* LEFT SIDE – SIDEBAR */}
          <div className="sidebar-section w-64">
            <Sidebar />
          </div>

          <div
            className="mice-container relative w-full h-[550px] flex flex-col justify-center items-center bg-cover bg-center"
            style={{
              backgroundImage: `
                linear-gradient(rgba(201, 163, 39, 0.65), rgba(243, 176, 7, 0.65)),
                url('https://www.oberoihotels.com/-/media/oberoi-hotel/the-oberoi-gurgaon/desktop1920x980.jpg')
              `,
            }}
          >
            {/* Soft overlay */}
            <div className="mice-overlay absolute inset-0 bg-white/40"></div>

            {/* Content */}
            <div className="mice-content relative z-10 text-center">
              {/* Title */}
              <h1 className="mice-title text-[200px] font-black text-[#00205b] leading-none mb-1">
                MICE
              </h1>

              {/* Menu Items */}
              <div className="mice-menu flex gap-1 justify-center -mt-4">
                {menuItems.map((item, index) => (
                  <div
                    key={index}
                    className="mice-menu-item bg-white px-6 py-2 text-2xl font-semibold text-red-600 shadow-md transition"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer should be INSIDE the fragment */}
        <Footer />
      </div>
    </>
  );
};

export default MicePage;
