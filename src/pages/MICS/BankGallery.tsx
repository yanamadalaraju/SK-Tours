import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BASE_URL } from "@/ApiUrls";

interface ClientImage {
  id: number;
  image_path: string;
}

const BankGallery: React.FC = () => {
  const [clients, setClients] = useState<ClientImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/api/mice/clients`)
      .then((res) => res.json())
      .then((data) => {
        setClients(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching clients:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center p-10 text-xl">Loading...</div>;
  }

  return (
    <>
      <div className="min-h-screen  bg-[#FFEBEE]">
        <Header />

        <div className="flex flex-col lg:flex-row w-full gap-5 p-5">
          <div className="w-full lg:w-auto ">
            <Sidebar />
          </div>

          {/* Main Gallery Section */}
          <div className="flex-1 w-full lg:w-[90%] mx-auto p-5 lg:p-[30px] bg-gradient-to-br from-[#e6d29b] to-[#d8b56f]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-[25px]">
              {clients.map((client) => (
                <div
                  key={client.id}
                  className="bg-white border border-[#b7b7b7] h-[150px] flex justify-center items-center shadow-md"
                >
                  <img
                    src={`${BASE_URL}/uploads/mice/clients/${client.image_path}`}
                    alt="Client"
                    className="max-w-full max-h-[80%] object-contain"
                  />
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

export default BankGallery;