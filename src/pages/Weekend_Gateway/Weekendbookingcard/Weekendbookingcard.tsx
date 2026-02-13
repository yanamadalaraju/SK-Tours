import  { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Weekendbookingcard.css";
import Villaimg1 from "../Images/villa1.png";
import Villaimg2 from "../Images/villa2.png";
import Villaimg3 from "../Images/villa3.png";
import Villaimg4 from "../Images/villa4.png";
import Villaimg5 from "../Images/villa5.png";
import Villaimg6 from "../Images/villa6.png";
import villaimg7 from "../Images/villa7.png";
import Gatewaycheckbox from "../Gatewaycheckbox/Gatewaycheckbox";

// Type definitions
interface Bungalow {
  id: string;
  name: string;
  price: number;
  img: string;
  Number?: number;
}

interface RelatedBungalow extends Bungalow {
  Number: number;
}

type TabType = "overview" | "Tour" | "inclusive" | "nearby" | "policy" | "cancellation";

const Weekendbookingcard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleBook = (): void => {
    navigate("/WeekendForm");
  };

  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const bungalow = location.state?.bungalow as Bungalow | undefined;

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

  const getTabDisplayName = (tab: TabType): string => {
    switch (tab) {
      case "overview":
        return "Overview";
      case "Tour":
        return "Tour Cost";
      case "inclusive":
        return "Inclusive & Exclusive";
      case "nearby":
        return "Place Near By";
      case "policy":
        return "Booking Policy";
      case "cancellation":
        return "Cancellation Policy";
      default:
        return tab;
    }
  };

  return (
    <div className="wkbc-container">
      {/* Header */}
      <div className="wkbc-header-main">
        <div className="wkbc-title-main">Weekend Gateway</div>
      </div>

      <div className="wkbc-header-sub">
        <div className="wkbc-title-sub">
          Weekend Gateway- {bungalow.name}
        </div>
      </div>

      <div className="wkbc-filter-horizontal">
        <Gatewaycheckbox />
      </div>

      {/* Main Content */}
      <div className="wkbc-content-main">
        {/* Left Sidebar - for Desktop */}
        <div className="wkbc-sidebar-left">
          <Gatewaycheckbox />
        </div>

        {/* Main Content */}
        <div className="wkbc-content-primary">
          {/* Carousel */}
          <div className="wkbc-carousel-main">
            <div className="wkbc-carousel-wrapper">
              <img
                src={carouselImages[currentImageIndex]}
                alt={bungalow.name}
                className="wkbc-carousel-image"
              />

              <button className="wkbc-carousel-btn wkbc-carousel-prev" onClick={prevImage}>
                ‹
              </button>
              <button className="wkbc-carousel-btn wkbc-carousel-next" onClick={nextImage}>
                ›
              </button>

              <div className="wkbc-thumbnails">
                <div className="wkbc-thumbnail-list">
                  {carouselImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${bungalow.name} ${index + 1}`}
                      className={`wkbc-thumbnail-img ${
                        index === currentImageIndex ? "wkbc-thumbnail-active" : ""
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs + Free Flow */}
          <div className="wkbc-tabs-container">
            <div className="wkbc-tabs-header">
              {(["overview", "Tour", "inclusive", "nearby", "policy", "cancellation"] as TabType[]).map(
                (tab) => (
                  <div
                    key={tab}
                    className={`wkbc-tab-item ${activeTab === tab ? "wkbc-tab-active" : ""}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {getTabDisplayName(tab)}
                  </div>
                )
              )}
            </div>

            <div className="wkbc-tab-content">
              {/* Overview */}
              <div
                className="wkbc-content-overview"
                style={{ display: activeTab === "overview" ? "block" : "none" }}
              >
                Free Flow Entry
              </div>

              {/* Tour Cost */}
              <div
                className="wkbc-content-tour"
                style={{ display: activeTab === "Tour" ? "block" : "none" }}
              >
                <table className="wkbc-tour-table">
                  <thead>
                    <tr>
                      <th>Particulars - Cost in INR</th>
                      <th>Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Per pax on Twin Basis</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Per pax on Triple Basis</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Child with Bed</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Child without Bed</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Infant</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Per pax Single Occupancy</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Inclusive & Exclusive */}
              <div
                className="wkbc-content-inclusive"
                style={{ display: activeTab === "inclusive" ? "block" : "none" }}
              >
                <div className="wkbc-inclusion-exclusion">
                  <div className="wkbc-table-section">
                    <table className="wkbc-inclusion-table">
                      <thead>
                        <tr>
                          <th>Inclusive</th>
                        </tr>
                      </thead>
                    </table>
                    <div className="wkbc-table-scroll">
                      <table>
                        <tbody>
                          {Array(20)
                            .fill("")
                            .map((_, idx) => (
                              <tr key={idx}>
                                <td>&nbsp;</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="wkbc-table-section">
                    <table className="wkbc-exclusion-table">
                      <thead>
                        <tr>
                          <th>Exclusive</th>
                        </tr>
                      </thead>
                    </table>
                    <div className="wkbc-table-scroll">
                      <table>
                        <tbody>
                          {Array(20)
                            .fill("")
                            .map((_, idx) => (
                              <tr key={idx}>
                                <td>&nbsp;</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nearby */}
              <div
                className="wkbc-content-nearby"
                style={{ display: activeTab === "nearby" ? "block" : "none" }}
              >
                Free Flow Entry
              </div>

              {/* Booking Policy */}
              <div
                className="wkbc-content-policy"
                style={{ display: activeTab === "policy" ? "flex" : "none" }}
              >
                <div className="wkbc-policy-text">Free Flow Entry</div>
                <div className="wkbc-book-btn-container">
                  <button className="wkbc-book-btn" onClick={handleBook}>Book</button>
                </div>
              </div>

              {/* Cancellation Policy */}
              <div
                className="wkbc-content-cancellation"
                style={{ display: activeTab === "cancellation" ? "flex" : "none" }}
              >
                <div className="wkbc-cancellation-text">
                  {/* Empty content for now */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="wkbc-sidebar-right">
          <div className="wkbc-related-destinations">
            <div className="wkbc-related-title">Related Destination</div>
            <div className="wkbc-related-cards">
              {relatedBungalows.map((related) => (
                <div 
                  key={related.id} 
                  className="wkbc-related-card"
                  onClick={() => handleRelatedClick(related)}
                >
                  <div className="wkbc-related-image">
                    <img src={related.img} alt={related.name} />
                    <div className="wkbc-price-badge">INR {related.price}</div>
                  </div>
                  <div className="wkbc-related-info">
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

export default Weekendbookingcard;