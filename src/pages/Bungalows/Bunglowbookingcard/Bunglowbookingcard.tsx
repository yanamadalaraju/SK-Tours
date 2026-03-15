import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Bunglowbookingcard.css";
import Villaimg1 from "../Images/villa1.png";
import Villaimg2 from "../Images/villa2.png";
import Villaimg3 from "../Images/villa3.png";
import Villaimg4 from "../Images/villa4.png";
import Villaimg5 from "../Images/villa5.png";
import Villaimg6 from "../Images/villa6.png";
import villaimg7 from "../Images/villa7.png";
import Bunglowcheckbox from "../Bungalow_checkbox/Bungalowcheckbox";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BASE_URL } from "@/ApiUrls";

// Type definitions
interface Bungalow {
  bungalow_id: number;
  bungalow_code: string;
  name: string;
  price: string;
  overview?: string;
  inclusive?: string;
  exclusive?: string;
  places_nearby?: string;
  booking_policy?: string;
  cancellation_policy?: string;
  main_image?: string;
}

interface BungalowImage {
  image_url: string;
}

interface RelatedBungalow {
  relation_id: number;
  bungalow_id: number;
  related_bungalow_id: number | null;
  related_name: string;
  related_price: string;
  related_image: string;
  sort_order: number;
  name?: string; 
  price?: string;
}

type TabType = "overview" | "rent" | "inclusive" | "nearby" | "policy" | "cancellation";

const Bunglowbookingcard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  
  // Dynamic state
  const [bungalow, setBungalow] = useState<Bungalow | null>(null);
  const [images, setImages] = useState<BungalowImage[]>([]);
  const [relatedBungalows, setRelatedBungalows] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch bungalow details
  useEffect(() => {
    if (!id) {
      navigate("/bungalow");
      return;
    }

    const fetchBungalowDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/api/bungalows/${id}`);
        const data = await response.json();
        
        setBungalow(data.bungalow);
        setImages(data.images || []);
      } catch (error) {
        console.error("Error fetching bungalow:", error);
        navigate("/bungalow");
      } finally {
        setLoading(false);
      }
    };

    fetchBungalowDetails();
  }, [id, navigate]);

  // Fetch related bungalows from dedicated endpoint
  useEffect(() => {
    const fetchRelatedBungalows = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/bungalows/related/${id}`);
        const data = await response.json();
        
        // Transform the data to match the expected format for the UI
        const formattedRelated = data.map((item: RelatedBungalow) => ({
          bungalow_id: item.related_bungalow_id || item.bungalow_id,
          name: item.related_name || item.name,
          price: item.related_price || item.price,
          bungalow_code: item.related_name || item.name, 
          main_image: item.related_image
        }));
        
        setRelatedBungalows(formattedRelated);
      } catch (error) {
        console.error("Error fetching related bungalows:", error);
        // Fallback to empty array if API fails
        setRelatedBungalows([]);
      }
    };

    if (id) {
      fetchRelatedBungalows();
    }
  }, [id]);

  const handleBook = (): void => {
    navigate("/bookingform");
  };

  if (loading || !bungalow) {
    return (
      <>
        <Header />
        <div className="bbc-bungalow-details-page">
          <div className="loading-spinner">Loading...</div>
        </div>
        <Footer />
      </>
    );
  }

  // Prepare carousel images (mix of dynamic and fallback)
  const carouselImages: string[] = images.length > 0
    ? images.map(img => `${BASE_URL}${img.image_url}`)
    : [bungalow.main_image ? `${BASE_URL}${bungalow.main_image}` : Villaimg1, Villaimg2, Villaimg3, Villaimg4, Villaimg5, Villaimg6, villaimg7];

  const nextImage = (): void => {
    setCurrentImageIndex(
      (prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1)
    );
  };

  const prevImage = (): void => {
    setCurrentImageIndex(
      (prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1)
    );
  };

  const handleRelatedClick = (related: any): void => {
    navigate(`/bunglowbookingcard/${related.bungalow_id}`);
  };

  const handleTabClick = (tab: TabType): void => {
    setActiveTab(tab);
  };

  const tabs: { key: TabType; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "rent", label: "Bungalow Rent" },
    { key: "inclusive", label: "Inclusive & Exclusive" },
    { key: "nearby", label: "Place Near By" },
    { key: "policy", label: "Booking Policy" },
    { key: "cancellation", label: "Cancellation Policy" }
  ];

  const renderTabContent = (): JSX.Element => {
    switch (activeTab) {
      case "overview":
        return <div className="bbc-free-flow-textarea">{bungalow.overview || "No overview available"}</div>;
      
      case "rent":
        return <div className="bbc-free-flow-textarea-">Rent: ₹{bungalow.price} per night</div>;
      
      case "inclusive":
        return (
          <div className="bbc-free-flow-textareas">
            <div className="bbc-inclusion-exclusion-container">
              <div className="bbc-table-wrapper">
                <table className="bbc-table">
                  <thead>
                    <tr>
                      <th className="bbc-th">Inclusive</th>
                    </tr>
                  </thead>
                </table>
                <div className="bbc-table-scroll">
                  <table className="bbc-table">
                    <tbody>
                      {bungalow.inclusive ? (
                        bungalow.inclusive.split('\n').map((item, idx) => (
                          <tr key={idx}>
                            <td className="bbc-td">{item}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td className="bbc-td">No inclusive items listed</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bbc-table-wrapper">
                <table className="bbc-table">
                  <thead>
                    <tr>
                      <th className="bbc-th">Exclusive</th>
                    </tr>
                  </thead>
                </table>
                <div className="bbc-table-scroll">
                  <table className="bbc-table">
                    <tbody>
                      {bungalow.exclusive ? (
                        bungalow.exclusive.split('\n').map((item, idx) => (
                          <tr key={idx}>
                            <td className="bbc-td">{item}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td className="bbc-td">No exclusive items listed</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );
      
      case "nearby":
        return <div className="bbc-free-flow-textarea">{bungalow.places_nearby || "No nearby places listed"}</div>;
      
      case "policy":
        return (
          <div className="bbc-free-flow-textarea-container">
            <div className="bbc-free-flow-textarea">{bungalow.booking_policy || "No booking policy available"}</div>
            <div className="bbc-book-button-container">
              <button className="bbc-book-btn" onClick={handleBook}>
                Book
              </button>
            </div>
          </div>
        );
      
      case "cancellation":
        return (
          <div className="bbc-free-flow-textarea-container">
            <div className="bbc-free-flow-textareas">
              {bungalow.cancellation_policy || "No cancellation policy available"}
            </div>
          </div>
        );
      
      default:
        return <div className="bbc-free-flow-textarea">Free Flow Entry</div>;
    }
  };

  return (
    <>
    <Header />
    <div className="bbc-bungalow-details-page">
      {/* Header */}
      <div className="bbc-details-page-header">
        <div className="bbc-bungalow-details-header">Bungalow Booking</div>
      </div>

      <div className="bbc-details-page-header-text">
        <div className="bbc-bungalow-details-header-text">
          Bungalow Booking - {bungalow.name} ({bungalow.bungalow_code})
        </div>
      </div>

      {/* Horizontal Filter Section for Tablet/Mobile */}
      <div className="bbc-horizontal-filter-section">
        <Bunglowcheckbox />
      </div>

      {/* Main Content */}
      <div className="bbc-details-content">
        {/* Left Sidebar - for Desktop */}
        <div className="bbc-left-sidebar">
          <Bunglowcheckbox />
        </div>

        {/* Main Content */}
        <div className="bbc-main-content-area">
          {/* Carousel */}
          <div className="bbc-carousel-section">
            <div className="bbc-carousel-wrapper">
              <img
                src={carouselImages[currentImageIndex]}
                alt={bungalow.name}
                className="bbc-main-carousel-image"
              />

              <button className="bbc-carousel-control bbc-prev" onClick={prevImage}>
                ‹
              </button>
              <button className="bbc-carousel-control bbc-next" onClick={nextImage}>
                ›
              </button>

              <div className="bbc-thumbnail-section">
                <div className="bbc-thumbnail-container">
                  {carouselImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${bungalow.name} ${index + 1}`}
                      className={`bbc-thumbnail ${
                        index === currentImageIndex ? "bbc-active" : ""
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs + Free Flow */}
          <div className="bbc-inner-card-container">
            <div className="bbc-tab-header">
              {tabs.map((tab) => (
                <div
                  key={tab.key}
                  className={`bbc-tab ${activeTab === tab.key ? "bbc-active-tab" : ""}`}
                  onClick={() => handleTabClick(tab.key)}
                >
                  {tab.label}
                </div>
              ))}
            </div>

            <div className="bbc-free-flow-container">
              {renderTabContent()}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="bbc-details-sidebar">
          <div className="bbc-related-bungalows">
            <div className="bbc-related-bunglows-name">Related Bungalows</div>
            <div className="bbc-related-cards">
              {relatedBungalows.length > 0 ? (
                relatedBungalows.map((related, index) => (
                  <div 
                    key={related.bungalow_id || index} 
                    className="bbc-related-card"
                    onClick={() => handleRelatedClick(related)}
                  >
                    <div className="bbc-related-card-image-wrapper">
                      <img 
                        src={related.main_image ? `${BASE_URL}${related.main_image}` : [Villaimg4, Villaimg2, Villaimg3][index % 3]} 
                        // alt={related.name} 
                      />
                      <div className="bbc-amount-badge">INR {related.price}</div>
                    </div>
                    <div className="bbc-related-info">
                      <h4>{related.name}</h4>
                      <p>{related.bungalow_code}</p>
                    </div>
                  </div>
                ))
              ) : (
                // Fallback message when no related bungalows
                <div className="bbc-no-related">No related bungalows found</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Bunglowbookingcard;