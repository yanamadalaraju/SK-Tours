import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Bungalowcheckbox from "../Bungalow_checkbox/Bungalowcheckbox";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BASE_URL } from "@/ApiUrls";

interface BungalowItem {
  bungalow_id: number;
  bungalow_code: string;
  name: string;
  price: string;
  main_image: string;
}

const Bungalow: React.FC = () => {
  const navigate = useNavigate();
  const [bungalows, setBungalows] = useState<BungalowItem[]>([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/bungalows`)
      .then((res) => res.json())
      .then((data) => {
        setBungalows(data);
      })
      .catch((err) => console.error("Error fetching bungalows:", err));
  }, []);

  const handleCardClick = (bungalow: BungalowItem): void => {
    // Navigate to dynamic route with ID
    navigate(`/bunglowbookingcard/${bungalow.bungalow_id}`);
  };

  const handleViewClick = (e: React.MouseEvent, bungalow: BungalowItem): void => {
    e.stopPropagation(); // Prevent parent click
    navigate(`/bunglowbookingcard/${bungalow.bungalow_id}`);
  };

  const handleBookClick = (e: React.MouseEvent, bungalow: BungalowItem): void => {
    e.stopPropagation(); // Prevent parent click
    navigate(`/bookingform`);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen">
        {/* Header */}
        <div className="bg-[#001f54] text-white font-bold text-[28px] py-5 px-4 text-center mb-5 w-full">
          Bungalow Booking
        </div>

        {/* Main Layout */}
        <div className="flex gap-5 p-5">
          {/* Sidebar */}
          <div className="min-w-[250px] hidden lg:block">
            <Bungalowcheckbox />
          </div>

          {/* Cards */}
          <div className="grid grid-cols-3 gap-6 flex-1 w-full max-[767px]:grid-cols-1 md:max-[1024px]:grid-cols-2">
            {bungalows.map((item) => (
              <div
                key={item.bungalow_id}
                onClick={() => handleCardClick(item)}
                className="relative border border-[#d9d9d9] bg-white rounded-[5px] overflow-hidden h-[300px] flex flex-col cursor-pointer"
              >
                {/* Image */}
                <img
                  src={`${BASE_URL}${item.main_image}`}
                  alt={item.name}
                  className="absolute top-0 left-0 w-full h-full object-cover z-[1]"
                />

                {/* Content */}
                <div className="relative z-[2] flex flex-col justify-between h-full p-5">
                  <h3 className="text-white font-semibold text-lg [text-shadow:2px_2px_4px_rgba(0,0,0,0.7)]">
                    {item.name} {item.bungalow_code}
                  </h3>

                  <div className="flex justify-center gap-2.5 self-end w-full">
                    <button 
                      onClick={(e) => handleViewClick(e, item)}
                      className="bg-[#001f54] text-white rounded-[20px] text-sm w-[100px] h-[35px] font-semibold"
                    >
                      View
                    </button>
                    <button className="bg-[#001f54] text-white rounded-[20px] text-sm w-[100px] h-[35px] font-semibold">
                      Rs {item.price}
                    </button>
                    <button 
                      onClick={(e) => handleBookClick(e, item)}
                      className="bg-[#001f54] text-white rounded-[20px] text-sm w-[100px] h-[35px] font-semibold"
                    >
                      Book
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Bungalow;