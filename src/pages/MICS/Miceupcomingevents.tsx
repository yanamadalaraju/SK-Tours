import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BASE_URL } from "@/ApiUrls";

interface EventImage {
  id: number;
  image_path: string;
  created_at?: string;
}

const MiceUpcomingEvents: React.FC = () => {
  const [events, setEvents] = useState<EventImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/api/mice/events`)
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
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
          <div className="flex-1 overflow-auto">
            <div className="w-full p-6 bg-gradient-to-br from-[#e6d29b] to-[#d8b56f]">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white p-2 flex items-center justify-center"
                  >
                    <img
                      src={`${BASE_URL}/uploads/mice/events/${event.image_path}?v=${event.id}`}
                      alt="Upcoming Event"
                      className="w-full h-52 object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default MiceUpcomingEvents;