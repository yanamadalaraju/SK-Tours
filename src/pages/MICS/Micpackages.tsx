import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BASE_URL } from "@/ApiUrls";

interface PackageImage {
  id: number;
  image_path: string;
}

interface PackageItem {
  id: number;
  days: number;
  price: string;
  images: PackageImage[];
}

const Micpackages: React.FC = () => {
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL}/api/mice/packages`)
      .then((res) => res.json())
      .then((data) => {
        setPackages(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching packages:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center p-10 text-xl">Loading...</div>;
  }

return (
    <>
      <div className="min-h-screen bg-[#FFEBEE]">
        <Header />

        {/* 🔥 Responsive Layout */}
        <div className="flex flex-col md:flex-row w-full gap-3 md:gap-5 p-3 md:p-5">

          <div className="md:w-64 w-full">
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
          </div>
          <div className="flex-1 w-full mx-auto bg-gradient-to-br from-[#e6d29b] to-[#d8b56f] p-4 md:p-8">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
   
          {packages.map((pkg) => (
 <div key={pkg.id} className="w-full md:w-80 lg:w-80 mx-auto">
  <div className="bg-white border-2 border-gray-300 rounded-lg p-2 shadow-md mb-2">
    <div className="grid grid-cols-2 gap-0 border border-gray-400 rounded overflow-hidden shadow-sm">
      <div className="bg-[#593c26] border-r border-gray-400 p-2 flex items-center justify-center">
        <div className="text-sm font-bold text-white text-center">No. Of Days</div>
      </div>

      <div className="bg-[#593c26] p-2 flex items-center justify-center">
        <div className="text-sm font-bold text-white text-center">{pkg.days} Days</div>
      </div>
    </div>
  </div>

  <div className="bg-blue-100 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
    <img
      src={`${BASE_URL}/uploads/mice/packages/${pkg.images[0].image_path}`}
      alt="tour"
      className="w-full h-44 md:h-56 object-cover"
    />

    <div className="flex p-4 gap-4">
      <div className="w-3/5 flex flex-col gap-1">
        <span className="text-[#2E4D98] text-lg md:text-xl font-bold">Price</span>
      </div>

      {/* Right: Price */}
      <div className="w-2/5 flex items-center justify-end">
        <span className="text-xl md:text-xl font-bold text-red-600">
          ₹ {Number(pkg.price).toLocaleString()}
        </span>
      </div>
    </div>

    {/* Buttons */}
    <div className="flex gap-2 p-4">
      <button className="flex-1 bg-blue-700 text-white py-2 rounded-md font-semibold hover:bg-blue-800 shadow-md hover:shadow-lg transition-shadow">
        View Tour
      </button>
      <button className="flex-1 bg-red-600 text-white py-2 rounded-md font-semibold hover:bg-red-700 shadow-md hover:shadow-lg transition-shadow">
        Book Now
      </button>
    </div>
  </div>
</div>
))}

            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Micpackages;