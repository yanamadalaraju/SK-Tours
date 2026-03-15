import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BASE_URL } from "@/ApiUrls";

interface VenueImage {
  id: number;
  image_path: string;
}

const VenuePhotos: React.FC = () => {
  const [venues, setVenues] = useState<VenueImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/api/mice/venues`)
      .then((res) => res.json())
      .then((data) => {
        setVenues(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching venues:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center p-10 text-xl">Loading...</div>;
  }

  return (
    <>
      <div className="min-h-screen bg-opacity-10">
        <Header />

        <div className="main-layout flex w-full gap-10 p-5">
          {/* Sidebar */}
          <div className="w-64">
            <Sidebar />
          </div>

          {/* Gallery */}
          <div className="flex-1 p-5 bg-gradient-to-br from-[#e6d29b] to-[#d8b56f]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {venues.map((venue) => (
                <div
                  key={venue.id}
                  className="bg-white rounded shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                >
                  <img
                    src={`${BASE_URL}/uploads/mice/venues/${venue.image_path}`}
                    alt="Venue"
                    className="w-full h-64 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default VenuePhotos;