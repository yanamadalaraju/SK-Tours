import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BASE_URL } from "@/ApiUrls";
import Pagination from '../Tablelayouts/Pagination';

interface ClientImage {
  id: number;
  image_path: string;
}

const BankGallery: React.FC = () => {
  const [clients, setClients] = useState<ClientImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [paginatedClients, setPaginatedClients] = useState<ClientImage[]>([]);

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

  // Update paginated clients when clients or pagination settings change
  useEffect(() => {
    if (clients.length > 0) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setPaginatedClients(clients.slice(startIndex, endIndex));
    } else {
      setPaginatedClients([]);
    }
  }, [clients, currentPage, itemsPerPage]);

  // Reset to first page when itemsPerPage changes
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  const totalPages = Math.ceil(clients.length / itemsPerPage);

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
          {/* Items Per Page Selector */}
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-gray-700">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, clients.length)} of {clients.length} clients
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-700">Show:</label>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border rounded-md px-2 py-1 text-sm"
              >
                <option value={6}>6</option>
                <option value={9}>9</option>
                <option value={12}>12</option>
                <option value={18}>18</option>
                <option value={24}>24</option>
              </select>
              <span className="text-sm text-gray-700">per page</span>
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {paginatedClients.map((client) => (
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

          {/* Pagination Component */}
          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                maxVisiblePages={3}
              />
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BankGallery;