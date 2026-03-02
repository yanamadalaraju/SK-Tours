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
      <div className="min-h-screen bg-opacity-10">
        <Header />

        <div className="main-layout flex w-full gap-10 p-5">
          {/* Sidebar */}
          <div className="w-64">
            <Sidebar />
          </div>

          {/* Page Content */}
          <div className="w-[95%] mx-auto my-5 p-8 bg-gradient-to-br from-[#e6d29b] to-[#d8b56f]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-white border-[6px] border-white shadow-xl overflow-hidden"
                >
                  {/* Days Header */}
                  <div className="bg-yellow-400 text-black text-2xl font-bold text-center py-2">
                    {pkg.days} Days
                  </div>

                  {/* Image Section */}
                  <div className="relative">
                    {pkg.images?.length > 0 && (
                      <img
                        src={`${BASE_URL}/uploads/mice/packages/${pkg.images[0].image_path}`}
                        alt="tour"
                        className="w-full h-56 object-cover"
                      />
                    )}

                    {/* Overlay */}
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                      
                      {/* Price Ribbon */}
                      <div className="relative bg-red-600 text-white font-bold px-5 py-2 text-lg shadow-md">
                        ₹ {Number(pkg.price).toLocaleString()}
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

        <Footer />
      </div>
    </>
  );
};

export default Micpackages;