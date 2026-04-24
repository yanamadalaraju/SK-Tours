import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BASE_URL } from "@/ApiUrls";
import Pagination from '../Tablelayouts/Pagination';

interface GalleryImage {
  id: number;
  image_path: string;
  created_at?: string;
}

const MiceGallery: React.FC = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [paginatedImages, setPaginatedImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/mice/gallery`)
      .then((res) => res.json())
      .then((data) => {
        setGalleryImages(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching gallery:", err);
        setLoading(false);
      });
  }, []);

  // Update paginated images when galleryImages or pagination settings change
  useEffect(() => {
    if (galleryImages.length > 0) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setPaginatedImages(galleryImages.slice(startIndex, endIndex));
    } else {
      setPaginatedImages([]);
    }
  }, [galleryImages, currentPage, itemsPerPage]);

  // Reset to first page when itemsPerPage changes
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  const totalPages = Math.ceil(galleryImages.length / itemsPerPage);

  if (loading) {
    return <div className="text-center p-10 text-xl">Loading...</div>;
  }

  return (
    <div className="min-h-screen  bg-[#FFEBEE]">
      <Header />

      <div className="flex flex-col lg:flex-row w-full gap-5 p-9">
        {/* Sidebar */}
        <div className="w-full lg:w-auto">
          <Sidebar sidebarOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
        </div>

        {/* Gallery */}
        <div className="flex-1 overflow-auto">
          <div className="w-full max-w-7xl mx-auto p-5 bg-gradient-to-br from-[#e6d29b] to-[#d8b56f]">
            {/* Items Per Page Selector */}
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm text-gray-700">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, galleryImages.length)} of {galleryImages.length} images
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {paginatedImages.map((image) => (
                <div
                  key={image.id}
                  className="w-full h-[230px] bg-white border-3 border-[#d4b269] flex items-center justify-center overflow-hidden  shadow-md"
                >
                  <img
                    src={`${BASE_URL}/uploads/mice/gallery/${image.image_path}?v=${image.id}`}
                    alt="Gallery"
                    className="w-full h-full object-cover"
                    loading="lazy"
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
      </div>

      <Footer />
    </div>
  );
};

export default MiceGallery;