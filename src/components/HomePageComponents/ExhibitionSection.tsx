// ExhibitionSection.tsx
import React from "react";
import ExhibitionCarousel from "./ExhibitionCarousel";
import "./ExhibitionSection.css";

const ExhibitionSection: React.FC = () => {
  return (
    <section className="exhibition-section">
      <div className="exhibition-header">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="exhibition-title">
              Upcoming <span className="exhibition-highlight">Exhibitions</span>
            </h2>
            {/* <p className="exhibition-subtitle">
              Discover world-class exhibitions happening around the globe
            </p> */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ExhibitionCarousel 
          title="All Exhibitions"
          subtitle="Domestic & International exhibitions"
          filterType="all"
        />

        {/* <ExhibitionCarousel 
          title="Domestic Exhibitions"
          subtitle="Explore exhibitions across India"
          filterType="domestic"
        />

        <ExhibitionCarousel 
          title="International Exhibitions"
          subtitle="Global exhibition opportunities"
          filterType="international"
        /> */}
      </div>
    </section>
  );
};

export default ExhibitionSection;