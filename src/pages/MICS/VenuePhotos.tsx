import React from "react";
import Sidebar from "./Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const VenuePhotos: React.FC = () => {
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
      <div className="flex-1 p-5  bg-gradient-to-br from-[#e6d29b] to-[#d8b56f]">
        <div className="grid grid-cols-3 gap-4 ">
          
          {/* Row 1 */}
          <div className="item bg-white rounded shadow-md hover:shadow-lg transition-shadow overflow-hidden">
            <img 
              src="https://i.pinimg.com/1200x/44/a4/88/44a488a5d5bf88b97b7a7d316abc57a9.jpg"
              alt="Conference Hall 1"
              className="hall-img w-full h-64 object-cover"
            />
          </div>

          <div className="item bg-white rounded shadow-md hover:shadow-lg transition-shadow overflow-hidden">
            <img 
              src="https://i.pinimg.com/736x/5f/02/4c/5f024ccdec4a946565be109889ee5a28.jpg"
              alt="Conference Hall 2"
              className="hall-img w-full h-64 object-cover"
            />
          </div>

          <div className="item bg-white rounded shadow-md hover:shadow-lg transition-shadow overflow-hidden">
            <img 
              src="https://i.pinimg.com/736x/9e/0e/b2/9e0eb201123ded06c2264c42b5cc6a65.jpg"
              alt="Conference Hall 3"
              className="hall-img w-full h-64 object-cover"
            />
          </div>

          {/* Row 2 – NEW IMAGES */}
          <div className="item bg-white rounded shadow-md hover:shadow-lg transition-shadow overflow-hidden">
            <img 
              src="https://i.pinimg.com/1200x/41/e3/e3/41e3e3910bcb9100455166396ef14fd4.jpg"
              alt="Banquet Setup"
              className="hall-img w-full h-64 object-cover"
            />
          </div>

          <div className="item bg-white rounded shadow-md hover:shadow-lg transition-shadow overflow-hidden">
            <img 
              src="https://i.pinimg.com/736x/2d/ea/88/2dea880f4742a3b69976932da2d1bdc8.jpg"
              alt="Event Decoration"
              className="hall-img w-full h-64 object-cover"
            />
          </div>

          <div className="item bg-white rounded shadow-md hover:shadow-lg transition-shadow overflow-hidden">
            <img 
              src="https://i.pinimg.com/736x/15/50/84/155084dfd749c36572c952a9359ed8a7.jpg"
              alt="Hall Seating"
              className="hall-img w-full h-64 object-cover"
            />
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

export default VenuePhotos;