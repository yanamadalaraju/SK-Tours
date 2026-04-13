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
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <div className="min-h-screen bg-[#FFEBEE]">
      <Header />

      <div className="flex flex-col lg:flex-row w-full gap-5 p-9">
        {/* Sidebar */}
        <div className="w-full lg:w-auto">
          <Sidebar sidebarOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
        </div>

        {/* Gallery */}
        <div className="flex-1 p-5 bg-gradient-to-br from-[#e6d29b] to-[#d8b56f]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {clients.map((client) => (
              <div
                key={client.id}
                className="bg-white rounded shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                <img
                  src={`${BASE_URL}/uploads/mice/clients/${client.image_path}`}
                  alt="Client"
                  className="w-full h-64 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BankGallery;