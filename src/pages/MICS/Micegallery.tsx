import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BASE_URL } from "@/ApiUrls";

interface GalleryImage {
  id: number;
  image_path: string;
  created_at?: string;
}

const MiceGallery: React.FC = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {galleryImages.map((image) => (
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
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MiceGallery;