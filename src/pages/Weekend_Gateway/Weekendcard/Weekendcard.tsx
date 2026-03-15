import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Gatewaycheckbox from "../Gatewaycheckbox/Gatewaycheckbox";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BASE_URL } from "@/ApiUrls";
// Define TypeScript interfaces based on API response
interface Bungalow {
  gateway_id: number;
  gateway_code: string;
  name: string;
  price: string;
  main_image: string;
}

interface WeekendBookingCardState {
  bungalow: Bungalow;
}


const Weekendcard: React.FC = () => {
  const navigate = useNavigate();
  const [bungalowData, setBungalowData] = useState<Bungalow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from API
  useEffect(() => {
    const fetchBungalows = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/api/weekend-gateways`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const data = await response.json();
        setBungalowData(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching bungalows:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBungalows();
  }, []);

  const handleCardClick = (bungalow: Bungalow): void => {
    navigate('/Weekendbookingcard', { 
      state: { bungalow } as WeekendBookingCardState 
    });
  };

  const handleBookClick = (e: React.MouseEvent, bungalow: Bungalow): void => {
    e.stopPropagation();
    navigate('/WeekendForm', { 
      state: { bungalow } 
    });
  };

  const handleViewClick = (e: React.MouseEvent, bungalow: Bungalow): void => {
    e.stopPropagation();
    navigate('/Weekendbookingcard', { 
      state: { bungalow } as WeekendBookingCardState 
    });
  };

  // Get full image URL
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '';
    // If it's a full URL, return as is, otherwise prepend API base URL
    return imagePath.startsWith('http') ? imagePath : `${BASE_URL}${imagePath}`;
  };

  // Loading state
  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#001f54] border-r-transparent"></div>
            <p className="mt-4 text-gray-600">Loading bungalows...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center text-red-600">
            <p className="text-xl font-semibold">Error loading data</p>
            <p className="mt-2">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-[#001f54] text-white px-6 py-2 rounded-lg hover:opacity-80"
            >
              Retry
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen">
        {/* Header */}
        <div className="bg-[#001f54] text-white font-bold text-[28px] py-5 px-4 text-center mb-5 w-full max-[767px]:text-[20px] max-[767px]:py-4 max-[767px]:px-2.5 max-[767px]:mb-2.5 md:max-[1024px]:text-2xl md:max-[1024px]:py-[18px] md:max-[1024px]:px-3 md:max-[1024px]:mb-4">
          Weekend Gateway
        </div>

        {/* Horizontal checkbox section - for tablet/mobile */}
        <div className="hidden w-full px-5 mb-5 max-[767px]:block max-[767px]:px-2.5 max-[767px]:mb-4 md:max-[1024px]:block md:max-[1024px]:px-4 lg:hidden">
          <Gatewaycheckbox />
        </div>

        <div className="flex gap-5 p-5 max-[767px]:flex-col max-[767px]:p-2.5 max-[767px]:gap-0 md:max-[1024px]:flex-col md:max-[1024px]:p-0 md:max-[1024px]:px-4 md:max-[1024px]:pb-5 md:max-[1024px]:gap-0 lg:flex-row">
          
          {/* Sidebar checkbox section - for desktop */}
          <div className="min-w-[250px] flex-shrink-0 max-[767px]:hidden md:max-[1024px]:hidden lg:block">
            <Gatewaycheckbox />
          </div>
          
          {/* Cards Container */}
          <div className="grid grid-cols-3 gap-6 flex-1 w-full max-[767px]:grid-cols-1 max-[767px]:gap-4 md:max-[1024px]:grid-cols-2 md:max-[1024px]:gap-[18px] md:max-[1024px]:mt-0 lg:grid-cols-3">
            {bungalowData.map((item: Bungalow) => (
              <div 
                className="relative border border-[#d9d9d9] bg-white rounded-[5px] transition duration-300 overflow-hidden h-[300px] flex flex-col cursor-pointer max-[767px]:h-[250px] md:max-[1024px]:h-[280px]"
                key={item.gateway_id}
                onClick={() => handleCardClick(item)}
              >
                <img 
                  src={getImageUrl(item.main_image)} 
                  alt={item.name} 
                  className="absolute top-0 left-0 w-full h-full object-cover z-[1]" 
                  onError={(e) => {
                    // Fallback image if the main image fails to load
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                  }}
                />
                <div className="relative z-[2] flex flex-col justify-between h-full p-5 max-[767px]:p-3 md:max-[1024px]:p-4">
                  <h3 className="text-white font-semibold text-lg m-0 [text-shadow:2px_2px_4px_rgba(0,0,0,0.7)] py-0.5 px-[1px] rounded-[20px] inline-block self-start max-[767px]:text-[15px] max-[767px]:py-1.5 max-[767px]:px-2.5 md:max-[1024px]:text-base md:max-[1024px]:py-2 md:max-[1024px]:px-3">
                    {item.name} {item.gateway_code}
                  </h3>
                  <div className="flex justify-center gap-2.5 self-end w-full max-[767px]:gap-2 md:max-[1024px]:gap-2">
                    <button 
                      className="bg-[#001f54] text-white border-none rounded-[20px] text-sm w-[100px] h-[35px] flex items-center justify-center text-center p-0 font-semibold transition duration-300 hover:opacity-80 max-[767px]:w-[80px] max-[767px]:h-8 max-[767px]:text-xs md:max-[1024px]:w-[90px] md:max-[1024px]:h-9 md:max-[1024px]:text-[13px]"
                      onClick={(e) => handleViewClick(e, item)}
                    >
                      View
                    </button>
                    <button className="bg-[#001f54] text-white border-none rounded-[20px] text-sm w-[100px] h-[35px] flex items-center justify-center text-center p-0 font-semibold transition duration-300 hover:opacity-80 max-[767px]:w-[80px] max-[767px]:h-8 max-[767px]:text-xs md:max-[1024px]:w-[90px] md:max-[1024px]:h-9 md:max-[1024px]:text-[13px]">
                      Rs {parseInt(item.price).toLocaleString()}
                    </button>
                    <button 
                      className="bg-[#001f54] text-white border-none rounded-[20px] text-sm w-[100px] h-[35px] flex items-center justify-center text-center p-0 font-semibold transition duration-300 hover:opacity-80 max-[767px]:w-[80px] max-[767px]:h-8 max-[767px]:text-xs md:max-[1024px]:w-[90px] md:max-[1024px]:h-9 md:max-[1024px]:text-[13px]"
                      onClick={(e) => handleBookClick(e, item)}
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

export default Weekendcard;