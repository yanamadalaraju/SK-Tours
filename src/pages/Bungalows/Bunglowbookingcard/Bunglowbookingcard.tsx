import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Bunglowbookingcard.css";
import Villaimg1 from "../Images/villa1.png";
import Villaimg2 from "../Images/villa2.png";
import Villaimg3 from "../Images/villa3.png";
import Villaimg4 from "../Images/villa4.png";
import Villaimg5 from "../Images/villa5.png";
import Villaimg6 from "../Images/villa6.png";
import villaimg7 from "../Images/villa7.png";
import Bunglowcheckbox from "../Bungalow_checkbox/Bungalowcheckbox";

// Type definitions
interface Bungalow {
  id: string;
  name: string;
  price: number;
  Number: number;
  img?: string;
}

interface RelatedBungalow extends Bungalow {
  img: string;
}

type TabType = "overview" | "rent" | "inclusive" | "nearby" | "policy" | "cancellation";

const Bunglowbookingcard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const location = useLocation();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const bungalow = location.state?.bungalow as Bungalow | undefined;

  const handleBook = (): void => {
    navigate("/bookingform");
  };

  if (!bungalow) {
    navigate("/bungalow");
    return null;
  }

  const carouselImages: string[] = [
    bungalow.img || Villaimg1,
    Villaimg2,
    Villaimg3,
    Villaimg4,
    Villaimg5,
    Villaimg6,
    villaimg7
  ];

  const relatedBungalows: RelatedBungalow[] = [
    { id: "BUG00004", name: "Igatpuri", price: 10000, Number: 1, img: Villaimg4 },
    { id: "BUG00002", name: "Aamby Valley", price: 16400, Number: 2, img: Villaimg2 },
    { id: "BUG00003", name: "Goa", price: 17400, Number: 3, img: Villaimg3 },
  ];

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

  const handleRelatedClick = (related: RelatedBungalow): void => {
    navigate("/bunglowbookingcard", { state: { bungalow: related } });
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
        return <div className="bbc-free-flow-textarea">Free Flow Entry</div>;
      
      case "rent":
        return <div className="bbc-free-flow-textarea-"></div>;
      
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
                      {Array(20)
                        .fill("")
                        .map((_, idx) => (
                          <tr key={idx}>
                            <td className="bbc-td">&nbsp;</td>
                          </tr>
                        ))}
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
                      {Array(20)
                        .fill("")
                        .map((_, idx) => (
                          <tr key={idx}>
                            <td className="bbc-td">&nbsp;</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );
      
      case "nearby":
        return <div className="bbc-free-flow-textarea">Free Flow Entry</div>;
      
      case "policy":
        return (
          <div className="bbc-free-flow-textarea-container">
            <div className="bbc-free-flow-textarea">Free Flow Entry</div>
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
              {/* Empty content for now */}
            </div>
          </div>
        );
      
      default:
        return <div className="bbc-free-flow-textarea">Free Flow Entry</div>;
    }
  };

  return (
    <div className="bbc-bungalow-details-page">
      {/* Header */}
      <div className="bbc-details-page-header">
        <div className="bbc-bungalow-details-header">Bungalow Booking</div>
      </div>

      <div className="bbc-details-page-header-text">
        <div className="bbc-bungalow-details-header-text">
          Bungalow Booking - {bungalow.name}
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
              {relatedBungalows.map((related) => (
                <div 
                  key={related.id} 
                  className="bbc-related-card"
                  onClick={() => handleRelatedClick(related)}
                >
                  <div className="bbc-related-card-image-wrapper">
                    <img src={related.img} alt={related.name} />
                    <div className="bbc-amount-badge">INR {related.price}</div>
                  </div>
                  <div className="bbc-related-info">
                    <h4>{related.Number}. {related.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bunglowbookingcard;