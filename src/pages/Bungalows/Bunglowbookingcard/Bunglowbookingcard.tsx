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

  interface Bungalow {
    bungalow_id: number;
    bungalow_code: string;
    name: string;
    price: string;
    bungalow_rate?: string;
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

    const [bungalow, setBungalow] = useState<Bungalow | null>(null);
    const [images, setImages] = useState<BungalowImage[]>([]);
    const [relatedBungalows, setRelatedBungalows] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

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

    useEffect(() => {
      const fetchRelatedBungalows = async () => {
        try {
          const response = await fetch(`${BASE_URL}/api/bungalows/related/${id}`);
          const data = await response.json();

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
          <div className="bgb-bungalow-details-page">
            <div className="loading-spinner">Loading...</div>
          </div>
          <Footer />
        </>
      );
    }

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
          return <div className="bgb-free-flow-textarea">{bungalow.overview || "No overview available"}</div>;

        case "rent":
          return (
            <div className="bgb-free-flow-textarea">
              {bungalow.bungalow_rate ? bungalow.bungalow_rate : `Rent: ₹${bungalow.price} per night`}
            </div>
          );

        case "inclusive":
          return (
            <div className="bgb-free-flow-textareas">
              <div className="bgb-inclusion-exclusion-container">
                <div className="bgb-table-wrapper">
                  <table className="bgb-table">
                    <thead>
                      <tr>
                        <th className="bgb-th">Inclusive</th>
                      </tr>
                    </thead>
                  </table>
                  <div className="bgb-table-scroll">
                    <table className="bgb-table">
                      <tbody>
                        {bungalow.inclusive ? (
                          bungalow.inclusive.split('\n').map((item, idx) => (
                            <tr key={idx}>
                              <td className="bgb-td">{item}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td className="bgb-td">No inclusive items listed</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bgb-table-wrapper">
                  <table className="bgb-table">
                    <thead>
                      <tr>
                        <th className="bgb-th">Exclusive</th>
                      </tr>
                    </thead>
                  </table>
                  <div className="bgb-table-scroll">
                    <table className="bgb-table">
                      <tbody>
                        {bungalow.exclusive ? (
                          bungalow.exclusive.split('\n').map((item, idx) => (
                            <tr key={idx}>
                              <td className="bgb-td">{item}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td className="bgb-td">No exclusive items listed</td>
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
          return <div className="bgb-free-flow-textarea">{bungalow.places_nearby || "No nearby places listed"}</div>;

        case "policy":
          return (
            <div className="bgb-free-flow-textarea-container">
              <div className="bgb-free-flow-textarea">{bungalow.booking_policy || "No booking policy available"}</div>
              <div className="bgb-book-button-container">
                <button className="bgb-book-btn" onClick={handleBook}>
                  Book
                </button>
              </div>
            </div>
          );

        case "cancellation":
          return (
            <div className="bgb-free-flow-textarea-container">
              <div className="bgb-free-flow-textareas">
                {bungalow.cancellation_policy || "No cancellation policy available"}
              </div>
            </div>
          );

        default:
          return <div className="bgb-free-flow-textarea">Free Flow Entry</div>;
      }
    };

    return (
      <>
        <Header />
        <div className="bgb-bungalow-details-page">
          <div className="bgb-details-page-header">
            <div className="bgb-bungalow-details-header">Bungalow Booking</div>
          </div>

          <div className="bgb-details-page-header-text">
            <div className="bgb-bungalow-details-header-text">
              Bungalow Booking - {bungalow.name} ({bungalow.bungalow_code})
            </div>
          </div>

          <div className="bgb-horizontal-filter-section">
            <Bunglowcheckbox />
          </div>

          <div className="bgb-details-content">
            <div className="bgb-left-sidebar">
              <Bunglowcheckbox />
            </div>

            <div className="bgb-main-content-area">
              <div className="bgb-carousel-section">
                <div className="bgb-carousel-wrapper">
                  <img
                    src={carouselImages[currentImageIndex]}
                    alt={bungalow.name}
                    className="bgb-main-carousel-image"
                  />

                  <button className="bgb-carousel-control bgb-prev" onClick={prevImage}>
                    ‹
                  </button>
                  <button className="bgb-carousel-control bgb-next" onClick={nextImage}>
                    ›
                  </button>

                  <div className="bgb-thumbnail-section">
                    <div className="bgb-thumbnail-container">
                      {carouselImages.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${bungalow.name} ${index + 1}`}
                          className={`bgb-thumbnail ${index === currentImageIndex ? "bgb-active" : ""}`}
                          onClick={() => setCurrentImageIndex(index)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bgb-inner-card-container">
                <div className="bgb-tab-header">
                  {tabs.map((tab) => (
                    <div
                      key={tab.key}
                      className={`bgb-tab ${activeTab === tab.key ? "bgb-active-tab" : ""}`}
                      onClick={() => handleTabClick(tab.key)}
                    >
                      {tab.label}
                    </div>
                  ))}
                </div>

                <div className="bgb-free-flow-container">
                  {renderTabContent()}
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