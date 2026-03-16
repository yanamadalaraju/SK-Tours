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
import Bunglowcheckbox from "../Onedaypicnic_checkbox/Onedaypicnic_checkbox";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BASE_URL } from "@/ApiUrls";

interface Picnic {
  picnic_id: number;
  picnic_code: string;
  name: string;
  price: string;
  property_rate?: string;
  per_pax_twin?: string;
  per_pax_triple?: string;
  child_with_bed?: string;
  child_without_bed?: string;
  infant?: string;
  per_pax_single?: string;
  overview?: string;
  inclusive?: string;
  exclusive?: string;
  places_nearby?: string;
  booking_policy?: string;
  cancellation_policy?: string;
}

interface PicnicImage {
  image_url: string;
}

type TabType =
  | "overview"
  | "rent"
  | "inclusive"
  | "nearby"
  | "policy"
  | "cancellation";

const Onedaypicnic_cardbooking: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [picnic, setPicnic] = useState<Picnic | null>(null);
  const [images, setImages] = useState<PicnicImage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  /* FETCH PICNIC DETAILS */
  useEffect(() => {
    if (!id) return;

    const fetchPicnicDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/one-day-picnic/${id}`);
        const data = await response.json();
        setPicnic(data.picnic);
        setImages(data.images || []);
      } catch (error) {
        console.error("Error fetching picnic:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPicnicDetails();
  }, [id]);

  const handleBook = (): void => {
    navigate("/ondaypicnicform");
  };

  if (loading || !picnic) {
    return (
      <>
        <Header />
        <div className="odp-bungalow-details-page">
          <div className="loading-spinner">Loading...</div>
        </div>
        <Footer />
      </>
    );
  }

  /* IMAGE CAROUSEL */
  const carouselImages: string[] =
    images.length > 0
      ? images.map((img) => `${BASE_URL}${img.image_url}`)
      : [Villaimg1, Villaimg2, Villaimg3, Villaimg4, Villaimg5, Villaimg6, villaimg7];

  const nextImage = (): void => {
    setCurrentImageIndex((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (): void => {
    setCurrentImageIndex((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
  };

  const handleTabClick = (tab: TabType): void => {
    setActiveTab(tab);
  };

  const tabs = [
    { key: "overview",     label: "Overview" },
    { key: "rent",         label: "Property Rate" },
    { key: "inclusive",    label: "Inclusive & Exclusive" },
    { key: "nearby",       label: "Place Near By" },
    { key: "policy",       label: "Booking Policy" },
    { key: "cancellation", label: "Cancellation Policy" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="odp-free-flow-textarea">
            {picnic.overview || "No overview available"}
          </div>
        );

      case "rent":
        return (
          <div className="odp-free-flow-textarea">
            <p>{picnic.property_rate || "No property rate details available"}</p>
          </div>
        );

      case "inclusive":
        return (
          <div className="odp-free-flow-textareas">
            <div className="odp-inclusion-exclusion-container">
              <div className="odp-table-wrapper">
                <table className="odp-table">
                  <thead>
                    <tr>
                      <th className="odp-th">Inclusive</th>
                    </tr>
                  </thead>
                </table>
                <div className="odp-table-scroll">
                  <table className="odp-table">
                    <tbody>
                      {picnic.inclusive ? (
                        picnic.inclusive.split("\n").map((item, idx) => (
                          <tr key={idx}>
                            <td className="odp-td">{item}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td className="odp-td">No inclusive items listed</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="odp-table-wrapper">
                <table className="odp-table">
                  <thead>
                    <tr>
                      <th className="odp-th">Exclusive</th>
                    </tr>
                  </thead>
                </table>
                <div className="odp-table-scroll">
                  <table className="odp-table">
                    <tbody>
                      {picnic.exclusive ? (
                        picnic.exclusive.split("\n").map((item, idx) => (
                          <tr key={idx}>
                            <td className="odp-td">{item}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td className="odp-td">No exclusive items listed</td>
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
        return (
          <div className="odp-free-flow-textarea">
            {picnic.places_nearby || "No nearby places listed"}
          </div>
        );

      case "policy":
        return (
          <div className="odp-free-flow-textarea-container">
            <div className="odp-free-flow-textarea">
              {picnic.booking_policy || "No booking policy available"}
            </div>
            <div className="odp-book-button-container">
              <button className="odp-book-btn" onClick={handleBook}>
                Book
              </button>
            </div>
          </div>
        );

      case "cancellation":
        return (
          <div className="odp-free-flow-textarea">
            {picnic.cancellation_policy || "No cancellation policy available"}
          </div>
        );

      default:
        return <div className="odp-free-flow-textarea">Free Flow Entry</div>;
    }
  };

  return (
    <>
      <Header />

      <div className="odp-bungalow-details-page">

        <div className="odp-details-page-header">
          <div className="odp-bungalow-details-header">One Day Picnic Booking</div>
        </div>

        <div className="odp-details-page-header-text">
          <div className="odp-bungalow-details-header-text">
            One Day Picnic - {picnic.name} ({picnic.picnic_code})
          </div>
        </div>

        <div className="odp-horizontal-filter-section">
          <Bunglowcheckbox />
        </div>

        <div className="odp-details-content">

          <div className="odp-left-sidebar">
            <Bunglowcheckbox />
          </div>

          <div className="odp-main-content-area">

            {/* CAROUSEL */}
            <div className="odp-carousel-section">
              <div className="odp-carousel-wrapper">
                <img
                  src={carouselImages[currentImageIndex]}
                  className="odp-main-carousel-image"
                />
                <button className="odp-carousel-control odp-prev" onClick={prevImage}>‹</button>
                <button className="odp-carousel-control odp-next" onClick={nextImage}>›</button>
                <div className="odp-thumbnail-section">
                  <div className="odp-thumbnail-container">
                    {carouselImages.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        className={`odp-thumbnail ${index === currentImageIndex ? "odp-active" : ""}`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* TABS */}
            <div className="odp-inner-card-container">
              <div className="odp-tab-header">
                {tabs.map((tab) => (
                  <div
                    key={tab.key}
                    className={`odp-tab ${activeTab === tab.key ? "odp-active-tab" : ""}`}
                    onClick={() => handleTabClick(tab.key as TabType)}
                  >
                    {tab.label}
                  </div>
                ))}
              </div>
              <div className="odp-free-flow-container">
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

export default Onedaypicnic_cardbooking;