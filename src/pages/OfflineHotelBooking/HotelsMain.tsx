import React, { useState } from "react";
import Sidebar from "./Sidebar";
import SearchBar from "./Searchbar";
import HotelCard from "./HotelCard";
import HotelDetails from "./TabsTable";

const GoaHotelPage: React.FC = () => {
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    setShowResults(true);
  };

  return (
    <div className="mmt-inter-font min-h-screen bg-gray-50">
      {/* Header */}
      {/* <header className="bg-white shadow-sm">
        <div className="mmt-container px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-mmt-blue">MakeMyTrip</h1>
              <p className="text-gray-600 text-sm">Hotels in Goa</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-mmt-blue hover:text-mmt-orange px-3 py-2 font-medium">
                Offers
              </button>
              <button className="bg-mmt-orange hover:bg-mmt-orange-hover text-white px-4 py-2 rounded-lg font-semibold">
                Login
              </button>
            </div>
          </div>
        </div>
      </header> */}

      {/* Main Layout */}
      <main className="mmt-container px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <Sidebar />
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <SearchBar onSearch={handleSearch} />
            
            {showResults ? (
              <>
                <HotelCard />
                <HotelDetails />
                
                {/* Similar Hotels */}
                <div className="mt-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">More Hotels in Goa</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { name: "Coconut Grove Resort", price: "₹8,500", rating: "4.2", location: "Calangute Beach", stars: 4, color: "from-green-400 to-green-600" },
                      { name: "Sunset Paradise Hotel", price: "₹9,200", rating: "4.0", location: "Baga", stars: 4, color: "from-orange-400 to-orange-600" },
                      { name: "Palm Beach Resort", price: "₹7,800", rating: "4.3", location: "North Goa", stars: 3, color: "from-blue-400 to-blue-600" }
                    ].map((hotel, index) => (
                      <div key={index} className="bg-white rounded-lg shadow border p-4 hover:shadow-md transition-shadow">
                        <div className="flex">
                          <div className={`w-20 h-20 bg-gradient-to-br ${hotel.color} rounded mr-3 flex items-center justify-center flex-shrink-0`}>
                            <div className="text-white text-center">
                              <div className="text-2xl">🏨</div>
                              <p className="text-xs font-bold mt-1">Hotel</p>
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-800 text-sm line-clamp-1">{hotel.name}</h4>
                            <p className="text-gray-600 text-xs mb-1">{hotel.location}</p>
                            <div className="flex items-center mb-2">
                              <div className="flex">
                                {[...Array(hotel.stars)].map((_, i) => (
                                  <div key={i} className="w-3 h-3 bg-yellow-400 rounded-full mr-0.5"></div>
                                ))}
                              </div>
                              <span className="text-gray-600 text-xs ml-1">({hotel.rating})</span>
                            </div>
                            <p className="font-bold text-gray-800 text-sm">{hotel.price}</p>
                            <button className="text-mmt-blue hover:text-mmt-orange text-xs font-medium mt-1">
                              View Details →
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-12 text-center">
                <div className="text-gray-400 mb-4 text-6xl">🏨</div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">Search for Hotels</h3>
                <p className="text-gray-500 mb-6">Enter your destination and dates to find the perfect hotel</p>
                <div className="text-sm text-gray-400">
                  <p>• Select a city or location</p>
                  <p>• Choose your check-in and check-out dates</p>
                  <p>• Select number of rooms and guests</p>
                  <p>• Click "SEARCH" to view hotel options</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      {/* <footer className="mt-8 pt-6 border-t bg-white">
        <div className="mmt-container px-4">
          <div className="text-center text-gray-600 text-sm">
            <p>© 2024 MakeMyTrip. All rights reserved.</p>
            <div className="mt-2 space-x-4">
              <a href="#" className="hover:text-mmt-orange">Privacy Policy</a>
              <a href="#" className="hover:text-mmt-orange">Terms of Service</a>
              <a href="#" className="hover:text-mmt-orange">Contact Us</a>
            </div>
          </div>
        </div>
      </footer> */}
    </div>
  );
};

export default GoaHotelPage;