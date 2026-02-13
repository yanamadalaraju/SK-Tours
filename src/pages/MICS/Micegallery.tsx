import React from "react";
import Sidebar from "./Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface MiceGalleryProps {
  // Add any props here if needed
}

const MiceGallery: React.FC<MiceGalleryProps> = () => {
  const galleryImages = [
    {
      id: 1,
      src: "https://i.pinimg.com/736x/c8/c1/2e/c8c12e1e837f0c4670677863fcc67485.jpg",
      alt: "Hall 1"
    },
    {
      id: 2,
      src: "https://i.pinimg.com/736x/a5/e5/ac/a5e5ac3d2804fc4f4ae7211f0f4881e6.jpg",
      alt: "Hall 2"
    },
    {
      id: 3,
      src: "https://i.pinimg.com/736x/b1/82/42/b18242b319c898a6b922e334847b8e9a.jpg",
      alt: "Hall 3"
    },
    {
      id: 4,
      src: "https://i.pinimg.com/736x/66/c5/24/66c524e948092936ed2f37e8b64d9142.jpg",
      alt: "Hall 4"
    },
    {
      id: 5,
      src: "https://i.pinimg.com/736x/96/19/69/961969e464c8fe486f3db3e89e40d509.jpg",
      alt: "Hall 5"
    },
    {
      id: 6,
      src: "https://i.pinimg.com/736x/18/d0/2a/18d02aa5781840d8d77f70f54b7fc2be.jpg",
      alt: "Hall 6"
    }
  ];

  return (
  <>
      <div className="min-h-screen bg-opacity-10">
        <Header/>

        <div className="main-layout flex w-full gap-10 p-5">
    <div className="main-layout flex w-full gap-10 p-5">
      {/* Sidebar */}
      <div className="w-64">
        <Sidebar />
      </div>


      {/* RIGHT SIDE – GALLERY */}
      <div className="flex-1  overflow-auto">
        <div className="w-full max-w-7xl mx-auto p-5 bg-gradient-to-br from-[#e6d29b] to-[#d8b56f]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image) => (
              <div
                key={image.id}
                className="w-full h-[230px] bg-white border-3 border-[#d4b269] flex items-center justify-center overflow-hidden"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
    <Footer />
    </div>
    </>
  );
};

export default MiceGallery;