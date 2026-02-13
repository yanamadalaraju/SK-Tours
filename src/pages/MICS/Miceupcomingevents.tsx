// MiceUpcomingEvents.tsx
import React from "react";
import Sidebar from "./Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

const galleryImages: GalleryImage[] = [
  { id: 1, src: "https://i.pinimg.com/736x/29/68/16/29681642557bc433ff4b382a1ae7f020.jpg", alt: "MICE Event 1" },
  { id: 2, src: "https://i.pinimg.com/1200x/9e/0d/2c/9e0d2cdfc77f0b594414cdb974eb79d6.jpg", alt: "MICE Event 2" },
  { id: 3, src: "https://i.pinimg.com/736x/d1/0b/de/d10bde9b3afbca91e03b2de7b67023a0.jpg", alt: "MICE Event 3" },
  { id: 4, src: "https://i.pinimg.com/1200x/cb/e0/5e/cbe05e9f86b421aa1d3c8ed4bd4cee60.jpg", alt: "MICE Round Table" },
  { id: 5, src: "https://i.pinimg.com/736x/47/be/0d/47be0d9d22b5390adb9f331184277e17.jpg", alt: "MICE Seminar" },
  { id: 6, src: "https://i.pinimg.com/1200x/7b/65/b2/7b65b2f2524a8abb7af815a94b7ef1e8.jpg", alt: "MICE Expo Stage" },
];

const MiceUpcomingEvents: React.FC = () => {
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

      {/* RIGHT SIDE – GALLERY */}
      <div className="flex-1 overflow-auto">
        <div className="w-full p-6 bg-gradient-to-br from-[#e6d29b] to-[#d8b56f]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryImages.map((image) => (
              <div
                key={image.id}
                className="bg-white p-2 flex items-center justify-center"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-52 object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
    <Footer />
    </>
  );
};

export default MiceUpcomingEvents;
