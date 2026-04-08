// MICESection.tsx
import React from "react";
import MICECarousel from "./MICECarousel";
import "./MICESection.css";

const MICESection: React.FC = () => {
  return (
    <section className="mice-section">
      <div className="mice-header">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="mice-title">
              MICE <span className="mice-highlight">Destinations</span>
            </h2>
            <p className="mice-subtitle">
              Plan your next corporate event, conference, or incentive trip
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <MICECarousel 
          title="All MICE Destinations"
          subtitle="Domestic & International MICE venues"
          filterType="all"
        />

        {/* <MICECarousel 
          title="Domestic MICE"
          subtitle="Corporate event venues across India"
          filterType="domestic"
        />

        <MICECarousel 
          title="International MICE"
          subtitle="Global destinations for business events"
          filterType="international"
        /> */}

        
      </div>
    </section>
  );
};

export default MICESection;