import React from "react";
import Sidebar from "./Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface TourItem {
  days: string;
  img: string;
}

const data: TourItem[] = [
  {
    days: "03 Days",
    img: "https://i.pinimg.com/736x/f5/6e/42/f56e42bc3f8c928b94a51a52345e7470.jpg",
  },
  {
    days: "04 Days",
    img: "https://i.pinimg.com/1200x/cf/97/c6/cf97c6c8f98ee90ab899a3f7cadfe375.jpg",
  },
  {
    days: "05 Days",
    img: "https://i.pinimg.com/736x/a9/8c/bc/a98cbcbea7db2656f4ad189004c5fc56.jpg",
  },
  {
    days: "06 Days",
    img: "https://i.pinimg.com/736x/8f/3c/95/8f3c95d1f6bd2b59b8edde694d7d07ce.jpg",
  },
  {
    days: "07 Days",
    img: "https://i.pinimg.com/1200x/dc/f6/54/dcf6540bd5b7fe6bf096be5eee080b9a.jpg",
  },
  {
    days: "08 Days",
    img: "https://i.pinimg.com/736x/f3/cd/62/f3cd6265081c4b3c413f1072b0b957ec.jpg",
  },
];

const Micpackages: React.FC = () => {
  return (
    <>
      <div className="min-h-screen bg-opacity-10">
        <Header />

        <div className="main-layout flex w-full gap-10 p-5">
    <div className="main-layout flex w-full gap-10 p-5">
      {/* Sidebar */}
      <div className="w-64">
        <Sidebar />
      </div>

      {/* Page Content */}
      <div className="w-[95%] mx-auto my-5 p-8 bg-gradient-to-br from-[#e6d29b] to-[#d8b56f]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-white border-[6px] border-white shadow-xl overflow-hidden"
            >
              {/* Yellow Header */}
              <div className="bg-yellow-400 text-black text-2xl font-bold text-center py-2">
                {item.days}
              </div>

              {/* Image with Overlay */}
              <div className="relative">
                <img
                  src={item.img}
                  alt="tour"
                  className="w-full h-56 object-cover"
                />

                {/* Overlay Bar */}
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                  
                  {/* Price Ribbon */}
                  <div className="relative bg-red-600 text-white font-bold px-5 py-2 text-lg shadow-md">
                    ₹ 10,000
                    <span className="absolute right-[-15px] top-0 w-0 h-0 border-t-[22px] border-b-[22px] border-l-[15px] border-t-transparent border-b-transparent border-l-red-600"></span>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2">
                    <button className="bg-blue-700 text-white px-4 py-2 rounded border border-white shadow-md active:scale-95">
                      View
                    </button>
                    <button className="bg-blue-700 text-white px-4 py-2 rounded border border-white shadow-md active:scale-95">
                      Book
                    </button>
                  </div>

                </div>
              </div>
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

export default Micpackages;
