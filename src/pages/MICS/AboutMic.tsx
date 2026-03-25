import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { BASE_URL } from '@/ApiUrls';

interface FreeFlowData {
  meeting_text: string;
  incentives_text: string;
  conference_text: string;
  events_text: string;
  image: string;
}

const AboutMice: React.FC = () => {
  const [data, setData] = useState<FreeFlowData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/api/mice/freeflow`)
      .then((res) => res.json())
      .then((resData) => {
        setData(resData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching freeflow:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center p-10 text-xl">Loading...</div>;
  }

  return (
    <div className="min-h-screen  bg-[#FFEBEE]">
      <Header />

      {/* 🔥 Responsive Layout */}
      <div className="main-layout flex flex-col md:flex-row w-full gap-3 md:gap-5 p-3 md:p-5">

        {/* Sidebar */}
        <div className="w-full md:w-auto">
          <Sidebar />
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="mice-wrapper w-full p-4 md:p-7 bg-gradient-to-br from-[#e6d29b] to-[#d8b56f] flex flex-col md:flex-row gap-4 md:gap-6 min-h-[auto] md:min-h-[520px]">

            {/* LEFT IMAGE */}
            <div className="flex-1 bg-white border border-black/50 flex justify-center items-center h-[250px] md:h-auto">
              {data?.image ? (
                <img
                  src={`${BASE_URL}/uploads/mice/freeflow/${data.image}`}
                  alt="Free Flow"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="font-bold text-lg md:text-xl text-gray-800">
                  No Image
                </span>
              )}
            </div>

            {/* RIGHT TEXT BOXES */}
            <div className="flex-1 flex flex-col gap-3 md:gap-4">
              {[
                data?.meeting_text,
                data?.incentives_text,
                data?.conference_text,
                data?.events_text
              ].map((text, index) => (
                <div
                  key={index}
                  className="bg-white p-4 md:p-8 border border-black/50 text-base md:text-xl font-medium flex items-start justify-start text-left"
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
  );
};

export default AboutMice;