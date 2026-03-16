import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./Weekendbookingcard.css";
import Gatewaycheckbox from "../Gatewaycheckbox/Gatewaycheckbox";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BASE_URL } from "@/ApiUrls";

// Type definitions based on API response
interface Bungalow {
  gateway_id: number;
  gateway_code: string;
  name: string;
  price: string;
  main_image?: string;
  overview?: string;
  inclusive?: string;
  exclusive?: string;
  places_nearby?: string;
  booking_policy?: string;
  per_pax_twin?: string;
  per_pax_triple?: string;
  child_with_bed?: string;
  child_without_bed?: string;
  infant?: string;
  per_pax_single?: string;
}

interface BungalowImage {
  image_id: number;
  gateway_id: number;
  image_url: string;
  is_main: number;
  sort_order: number;
}

interface RelatedBungalow {
  relation_id: number;
  gateway_id: number;
  related_gateway_id: number | null;
  related_name: string;
  related_price: string;
  related_image: string;
  sort_order: number;
  name: string | null;
  price: string | null;
}

type TabType = "overview" | "tour" | "inclusive" | "nearby" | "policy" | "cancellation";

const Weekendbookingcard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [bungalowData, setBungalowData] = useState<Bungalow | null>(null);
  const [images, setImages] = useState<BungalowImage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const passedBungalow = location.state?.bungalow as Bungalow | undefined;

  // Fetch data from API
  useEffect(() => {
    const fetchBungalowDetails = async () => {
      try {
        setLoading(true);

        const gatewayId = id || passedBungalow?.gateway_id;

        if (!gatewayId) {
          navigate("/weekend-gateway");
          return;
        }

        const response = await fetch(`${BASE_URL}/api/weekend-gateways/${gatewayId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch bungalow details');
        }

        const data = await response.json();

        setBungalowData(data.gateway);
        setImages(data.images || []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching bungalow details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBungalowDetails();
  }, [id, passedBungalow, navigate]);

  const handleBook = (): void => {
    navigate("/WeekendForm", {
      state: { bungalow: bungalowData }
    });
  };

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '';
    return imagePath.startsWith('http') ? imagePath : `${BASE_URL}${imagePath}`;
  };

  // Prepare carousel images
  const carouselImages: string[] = images.length > 0
    ? images.map(img => getImageUrl(img.image_url))
    : bungalowData?.main_image
      ? [getImageUrl(bungalowData.main_image)]
      : [];

  const nextImage = (): void => {
    if (carouselImages.length > 0) {
      setCurrentImageIndex(
        (prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1)
      );
    }
  };

  const prevImage = (): void => {
    if (carouselImages.length > 0) {
      setCurrentImageIndex(
        (prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1)
      );
    }
  };

  const getTabDisplayName = (tab: TabType): string => {
    switch (tab) {
      case "overview":    return "Overview";
      case "tour":        return "Tour Cost";
      case "inclusive":   return "Inclusive & Exclusive";
      case "nearby":      return "Place Near By";
      case "policy":      return "Booking Policy";
      case "cancellation":return "Cancellation Policy";
      default:            return tab;
    }
  };

  const renderTabContent = (): JSX.Element => {
    switch (activeTab) {
      case "overview":
        return <div className="wkbc-free-flow-textarea">{bungalowData?.overview || "No overview available"}</div>;

      case "tour":
        return (
          <div className="wkbc-free-flow-textarea">
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
                  <td>{bungalowData?.per_pax_twin ? `₹ ${parseInt(bungalowData.per_pax_twin).toLocaleString()}` : '-'}</td>
                </tr>
                <tr>
                  <td>Per pax on Triple Basis</td>
                  <td>{bungalowData?.per_pax_triple ? `₹ ${parseInt(bungalowData.per_pax_triple).toLocaleString()}` : '-'}</td>
                </tr>
                <tr>
                  <td>Child with Bed</td>
                  <td>{bungalowData?.child_with_bed ? `₹ ${parseInt(bungalowData.child_with_bed).toLocaleString()}` : '-'}</td>
                </tr>
                <tr>
                  <td>Child without Bed</td>
                  <td>{bungalowData?.child_without_bed ? `₹ ${parseInt(bungalowData.child_without_bed).toLocaleString()}` : '-'}</td>
                </tr>
                <tr>
                  <td>Infant</td>
                  <td>{bungalowData?.infant ? `₹ ${parseInt(bungalowData.infant).toLocaleString()}` : '-'}</td>
                </tr>
                <tr>
                  <td>Per pax Single Occupancy</td>
                  <td>{bungalowData?.per_pax_single ? `₹ ${parseInt(bungalowData.per_pax_single).toLocaleString()}` : '-'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        );

      case "inclusive":
        return (
          <div className="wkbc-free-flow-textareas">
            <div className="wkbc-inclusion-exclusion-container">
              <div className="wkbc-table-wrapper">
                <table className="wkbc-table">
                  <thead>
                    <tr>
                      <th className="wkbc-th">Inclusive</th>
                    </tr>
                  </thead>
                </table>
                <div className="wkbc-table-scroll">
                  <table className="wkbc-table">
                    <tbody>
                      {bungalowData?.inclusive ? (
                        bungalowData.inclusive.split('\n').map((item, idx) => (
                          <tr key={idx}>
                            <td className="wkbc-td">{item}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td className="wkbc-td">No inclusive items listed</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="wkbc-table-wrapper">
                <table className="wkbc-table">
                  <thead>
                    <tr>
                      <th className="wkbc-th">Exclusive</th>
                    </tr>
                  </thead>
                </table>
                <div className="wkbc-table-scroll">
                  <table className="wkbc-table">
                    <tbody>
                      {bungalowData?.exclusive ? (
                        bungalowData.exclusive.split('\n').map((item, idx) => (
                          <tr key={idx}>
                            <td className="wkbc-td">{item}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td className="wkbc-td">No exclusive items listed</td>
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
        return <div className="wkbc-free-flow-textarea">{bungalowData?.places_nearby || "No nearby places listed"}</div>;

      case "policy":
        return (
          <div className="wkbc-free-flow-textarea-container">
            <div className="wkbc-free-flow-textarea">{bungalowData?.booking_policy || "No booking policy available"}</div>
            <div className="wkbc-book-button-container">
              <button className="wkbc-book-btn" onClick={handleBook}>
                Book
              </button>
            </div>
          </div>
        );

      case "cancellation":
        return (
          <div className="wkbc-free-flow-textarea-container">
            <div className="wkbc-free-flow-textarea">
              {bungalowData?.booking_policy || "No cancellation policy available"}
            </div>
          </div>
        );

      default:
        return <div className="wkbc-free-flow-textarea">Free Flow Entry</div>;
    }
  };

  if (loading || !bungalowData) {
    return (
      <>
        <Header />
        <div className="wkbc-bungalow-details-page">
          <div className="loading-spinner">Loading...</div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="wkbc-bungalow-details-page">
          <div className="error-message">{error}</div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="wkbc-bungalow-details-page">

        {/* Header */}
        <div className="wkbc-details-page-header">
          <div className="wkbc-bungalow-details-header">Weekend Gateway</div>
        </div>

        <div className="wkbc-details-page-header-text">
          <div className="wkbc-bungalow-details-header-text">
            Weekend Gateway - {bungalowData.name} ({bungalowData.gateway_code})
          </div>
        </div>

        {/* Horizontal Filter Section for Tablet/Mobile */}
        <div className="wkbc-horizontal-filter-section">
          <Gatewaycheckbox />
        </div>

        {/* Main Content */}
        <div className="wkbc-details-content">

          {/* Left Sidebar - Desktop only */}
          <div className="wkbc-left-sidebar">
            <Gatewaycheckbox />
          </div>

          {/* Main Content Area - full width, no right sidebar */}
          <div className="wkbc-main-content-area">

            {/* Carousel */}
            <div className="wkbc-carousel-section">
              <div className="wkbc-carousel-wrapper">
                {carouselImages.length > 0 ? (
                  <>
                    <img
                      src={carouselImages[currentImageIndex]}
                      alt={bungalowData.name}
                      className="wkbc-main-carousel-image"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/800x400?text=No+Image';
                      }}
                    />
                    <button className="wkbc-carousel-control wkbc-prev" onClick={prevImage}>‹</button>
                    <button className="wkbc-carousel-control wkbc-next" onClick={nextImage}>›</button>
                    <div className="wkbc-thumbnail-section">
                      <div className="wkbc-thumbnail-container">
                        {carouselImages.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`${bungalowData.name} ${index + 1}`}
                            className={`wkbc-thumbnail ${index === currentImageIndex ? "wkbc-active" : ""}`}
                            onClick={() => setCurrentImageIndex(index)}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://via.placeholder.com/100x80?text=No+Image';
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="wkbc-no-image">No images available</div>
                )}
              </div>
            </div>

            {/* Tabs + Content */}
            <div className="wkbc-inner-card-container">
              <div className="wkbc-tab-header">
                {(["overview", "tour", "inclusive", "nearby", "policy", "cancellation"] as TabType[]).map((tab) => (
                  <div
                    key={tab}
                    className={`wkbc-tab ${activeTab === tab ? "wkbc-active-tab" : ""}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {getTabDisplayName(tab)}
                  </div>
                ))}
              </div>
              <div className="wkbc-free-flow-container">
                {renderTabContent()}
              </div>
            </div>

          </div>
          {/* RIGHT SIDEBAR REMOVED */}

        </div>
      </div>
      <Footer />
    </>
  );
};

export default Weekendbookingcard;