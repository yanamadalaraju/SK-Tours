// MICESection.tsx
import React from "react";
import MICECarousel from "./MiceCarousel";

const MICESection: React.FC = () => {
  return (
    <section style={{
      padding: 0,
      margin: 0,
      background: "linear-gradient(to bottom right, #bae6fd, #bae6fd)",
      width: "100%"
    }}>
      <div style={{
        width: "100%",
        background: "linear-gradient(to right, #0F1F5C, #1F3F93, #0F1F5C)",
        padding: "1.5rem 0",
        margin: 0,
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
      }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
          <div className="text-center">
            <h2 style={{
              fontFamily: "'Baloo 2', sans-serif",
              fontSize: "1.875rem",
              fontWeight: 800,
              marginBottom: "0.75rem",
              letterSpacing: "-0.025em",
              color: "white",
              textShadow: "2px 2px 0 #1F3F5C, -2px -2px 0 #1F3F5C, 0 0 18px rgba(255, 255, 255, 0.65)"
            }} className="mice-title-responsive">
              MICE <span style={{ color: "#E31B23" }}>Destinations</span>
            </h2>
          </div>
        </div>
      </div>

      <div style={{ 
        width: "100%", 
        maxWidth: "1280px", 
        margin: "0 auto", 
        padding: "0 1rem 2rem 1rem",
        marginTop:"50px"
      }}>
        <MICECarousel 
          title="All MICE Destinations"
          subtitle="Domestic & International MICE venues"
          filterType="all"
        />

        <MICECarousel 
          title="Domestic MICE"
          subtitle="Corporate event venues across India"
          filterType="domestic"
        />

        <MICECarousel 
          title="International MICE"
          subtitle="Global destinations for business events"
          filterType="international"
        />
      </div>

      <style>{`
        @media (min-width: 768px) {
          .mice-title-responsive {
            font-size: 2.25rem !important;
          }
        }
        @media (min-width: 1024px) {
          .mice-title-responsive {
            font-size: 3.75rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default MICESection;