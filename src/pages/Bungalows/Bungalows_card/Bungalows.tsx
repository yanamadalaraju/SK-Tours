import { useNavigate } from "react-router-dom";
import Bungalowcheckbox from "../Bungalow_checkbox/Bungalowcheckbox";

import Villaimg1 from "../Images/villa1.png";
import Villaimg2 from "../Images/villa2.png";
import Villaimg3 from "../Images/villa3.png";
import Villaimg4 from "../Images/villa4.png";
import Villaimg5 from "../Images/villa5.png";

interface BungalowItem {
  id: string;
  name: string;
  price: number;
  img: string;
}

const bungalowData: BungalowItem[] = [
  { id: "BUG00001", name: "Alibaug", price: 15400, img: Villaimg1 },
  { id: "BUG00002", name: "Aamby Valley", price: 16400, img: Villaimg2 },
  { id: "BUG00003", name: "Goa", price: 17400, img: Villaimg3 },
  { id: "BUG00004", name: "Igatpuri", price: 10000, img: Villaimg4 },
  { id: "BUG00005", name: "Karjat", price: 18400, img: Villaimg5 },
  { id: "BUG00006", name: "Khopoli", price: 14400, img: Villaimg3 },
  { id: "BUG00007", name: "Karjat", price: 18400, img: Villaimg1 },
  { id: "BUG00008", name: "Khopoli", price: 14400, img: Villaimg2 },
  { id: "BUG00009", name: "Khopoli", price: 13400, img: Villaimg3 },
];

const Bungalow: React.FC = () => {
  const navigate = useNavigate();

  const handleCardClick = (bungalow: BungalowItem): void => {
    navigate("/bunglowbookingcard", { state: { bungalow } });
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-[#001f54] text-white font-bold text-[28px] py-5 px-4 text-center mb-5 w-full max-[767px]:text-[20px] max-[767px]:py-4 max-[767px]:px-2.5 max-[767px]:mb-2.5 md:max-[1024px]:text-2xl md:max-[1024px]:py-[18px] md:max-[1024px]:px-3 md:max-[1024px]:mb-4">
        Bungalow Booking
      </div>

      {/* Horizontal checkbox for mobile/tablet */}
      <div className="hidden w-full px-5 mb-5 max-[767px]:block max-[767px]:px-2.5 max-[767px]:mb-4 md:max-[1024px]:block md:max-[1024px]:px-4 lg:hidden">
        <Bungalowcheckbox />
      </div>

      {/* Main Layout */}
      <div className="flex gap-5 p-5 max-[767px]:flex-col max-[767px]:p-2.5 max-[767px]:gap-0 md:max-[1024px]:flex-col md:max-[1024px]:p-0 md:max-[1024px]:px-4 md:max-[1024px]:pb-5 md:max-[1024px]:gap-0 lg:flex-row">
        
        {/* Sidebar checkbox for desktop */}
        <div className="min-w-[250px] flex-shrink-0 max-[767px]:hidden md:max-[1024px]:hidden lg:block">
          <Bungalowcheckbox />
        </div>

        {/* Cards Container */}
        <div className="grid grid-cols-3 gap-6 flex-1 w-full max-[767px]:grid-cols-1 max-[767px]:gap-4 md:max-[1024px]:grid-cols-2 md:max-[1024px]:gap-[18px] md:max-[1024px]:mt-0 lg:grid-cols-3">
          {bungalowData.map((item) => (
            <div
              className="relative border border-[#d9d9d9] bg-white rounded-[5px] transition duration-300 overflow-hidden h-[300px] flex flex-col cursor-pointer max-[767px]:h-[250px] md:max-[1024px]:h-[280px]"
              key={item.id}
              onClick={() => handleCardClick(item)}
            >
              <img
                src={item.img}
                alt={item.name}
                className="absolute top-0 left-0 w-full h-full object-cover z-[1]"
              />

              <div className="relative z-[2] flex flex-col justify-between h-full p-5 max-[767px]:p-3 md:max-[1024px]:p-4">
                <h3 className="text-white font-semibold text-lg m-0 [text-shadow:2px_2px_4px_rgba(0,0,0,0.7)] py-0.5 px-[1px] rounded-[20px] inline-block self-start max-[767px]:text-[15px] max-[767px]:py-1.5 max-[767px]:px-2.5 md:max-[1024px]:text-base md:max-[1024px]:py-2 md:max-[1024px]:px-3">
                  {item.name} {item.id}
                </h3>

                <div className="flex justify-center gap-2.5 self-end w-full max-[767px]:gap-2 md:max-[1024px]:gap-2">
                  <button className="bg-[#001f54] text-white border-none rounded-[20px] text-sm w-[100px] h-[35px] flex items-center justify-center text-center p-0 font-semibold transition duration-300 hover:opacity-80 max-[767px]:w-[80px] max-[767px]:h-8 max-[767px]:text-xs md:max-[1024px]:w-[90px] md:max-[1024px]:h-9 md:max-[1024px]:text-[13px]">
                    View
                  </button>
                  <button className="bg-[#001f54] text-white border-none rounded-[20px] text-sm w-[100px] h-[35px] flex items-center justify-center text-center p-0 font-semibold transition duration-300 hover:opacity-80 max-[767px]:w-[80px] max-[767px]:h-8 max-[767px]:text-xs md:max-[1024px]:w-[90px] md:max-[1024px]:h-9 md:max-[1024px]:text-[13px]">
                    Rs {item.price}
                  </button>
                  <button className="bg-[#001f54] text-white border-none rounded-[20px] text-sm w-[100px] h-[35px] flex items-center justify-center text-center p-0 font-semibold transition duration-300 hover:opacity-80 max-[767px]:w-[80px] max-[767px]:h-8 max-[767px]:text-xs md:max-[1024px]:w-[90px] md:max-[1024px]:h-9 md:max-[1024px]:text-[13px]">
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bungalow;