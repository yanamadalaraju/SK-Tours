import React from "react";
import { useState, useRef  } from "react";

const flights = [
  {
    airline: "Air India Express",
    code: "IX 2964",
    departTime: "14:00",
    departCity: "Ghaziabad",
    duration: "02h 50m",
    arriveTime: "16:50",
    arriveCity: "Bengaluru",
    price: "6,848",
  },
  {
    airline: "IndiGo",
    code: "6E 6608",
    departTime: "09:15",
    departCity: "New Delhi",
    duration: "03h",
    arriveTime: "12:15",
    arriveCity: "Bengaluru",
    price: "7,121",
  },
];

const OfflineFlightBooking = () => {

    const [activeTab, setActiveTab] = useState(null);
  const timeoutRef = useRef(null);

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-7xl mx-auto flex gap-6">
        {/* LEFT FILTER PANEL */}
        <div className="w-1/4 bg-white rounded-xl shadow p-4 space-y-6 h-fit">
          {/* Popular Filters */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Popular Filters</h2>
            <div className="space-y-2 text-sm">
              {['Non Stop', 'Hide Nearby Airports', 'Refundable Fares', '1 Stop'].map((filter, idx) => (
                <label key={idx} className="flex justify-between items-center cursor-pointer">
                  <span className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked={filter === 'Non Stop'} />
                    {filter}
                  </span>
                  <span>₹ {filter === 'Hide Nearby Airports' ? '7,121' : filter === '1 Stop' ? '7,173' : '6,848'}</span>
                </label>
              ))}
            </div>
            <p className="text-blue-600 text-sm mt-2 cursor-pointer">+4 more</p>
          </div>

          <hr className="my-2" />

          {/* Departure Airports */}
          <div>
            <h3 className="font-semibold mb-2">Departure Airports</h3>
            <div className="space-y-2 text-sm">
              <label className="flex justify-between items-center cursor-pointer">
                <span className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Indira Gandhi International Airport
                </span>
                <span>₹ 7,121</span>
              </label>
              <label className="flex justify-between items-center cursor-pointer">
                <span className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Hindon Airport (32Km)
                </span>
                <span>₹ 6,848</span>
              </label>
            </div>
          </div>

          <hr className="my-2" />

          {/* One Way Price */}
          <div>
            <h3 className="font-semibold mb-2">One Way Price</h3>
            <input type="range" min="6848" max="28800" className="w-full" />
            <div className="flex justify-between text-sm mt-1">
              <span>₹ 6,848</span>
              <span>₹ 28,800</span>
            </div>
          </div>

          <hr className="my-2" />

          {/* Stops From New Delhi */}
          <div>
            <h3 className="font-semibold mb-2">Stops From New Delhi</h3>
            <div className="space-y-2 text-sm">
              <label className="flex justify-between items-center cursor-pointer">
                <span className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  Non Stop
                </span>
                <span>₹ 6,848</span>
              </label>
              <label className="flex justify-between items-center cursor-pointer">
                <span className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  1 Stop
                </span>
                <span>₹ 7,173</span>
              </label>
            </div>
          </div>

          <hr className="my-2" />

          {/* Departure From New Delhi */}
          <div>
            <h3 className="font-semibold mb-2">Departure From New Delhi</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full border border-blue-600 mr-2 flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <span>Before 6 AM to 12 PM</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full border border-gray-300 mr-2"></div>
                <span>After 6 PM to 12 PM</span>
              </div>
            </div>
          </div>

          <hr className="my-2" />

          {/* Arrival at Bengaluru */}
          <div>
            <h3 className="font-semibold mb-2">Arrival at Bengaluru</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full border border-blue-600 mr-2 flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <span>Before 6 AM to 12 PM</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full border border-gray-300 mr-2"></div>
                <span>After 6 PM to 12 PM</span>
              </div>
            </div>
          </div>

          <hr className="my-2" />

          {/* Airlines */}
          <div>
            <h3 className="font-semibold mb-2">Airlines</h3>
            <div className="space-y-2 text-sm">
              {[
                { name: 'Air India', price: '7,171', checked: true },
                { name: 'Air India Express', price: '6,848', checked: false },
                { name: 'Akasa Air', price: '8,338', checked: false },
                { name: 'IndiGo', price: '7,121', checked: false },
                { name: 'SpiceJet', price: '7,237', checked: false }
              ].map((airline, idx) => (
                <label key={idx} className="flex justify-between items-center cursor-pointer">
                  <span className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="mr-2" 
                      defaultChecked={airline.checked}
                    />
                    {airline.name}
                  </span>
                  <span>₹ {airline.price}</span>
                </label>
              ))}
            </div>
          </div>

          <hr className="my-2" />

          {/* Aircraft Size */}
          <div>
            <h3 className="font-semibold mb-2">Aircraft Size</h3>
            <div className="space-y-2 text-sm">
              <label className="flex justify-between items-center cursor-pointer">
                <span className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  Small / Mid - size aircraft
                </span>
                <span>₹ 6,848</span>
              </label>
              <label className="flex justify-between items-center cursor-pointer">
                <span className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Large Aircraft
                </span>
                <span>₹ 7,173</span>
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT RESULTS PANEL */}
        <div className="w-3/4 space-y-4">
          {/* FLIGHT CARDS */}
          {flights.map((flight, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow p-4"
            >
              {/* Main Flight Info Row */}
              <div className="flex justify-between items-center">
                {/* Left Side: Airline */}
                <div className="w-1/5">
                  <h4 className="font-semibold">{flight.airline}</h4>
                  <p className="text-sm text-gray-500">{flight.code}</p>
                </div>

                {/* Middle: Flight Timeline with 3 buttons BELOW */}
                <div className="flex-1 flex flex-col items-center">
                  {/* Time Row */}
                  <div className="flex items-center justify-center w-full mb-3">
                    {/* Departure */}
                    <div className="text-center mr-8">
                      <p className="text-xl font-bold">{flight.departTime}</p>
                      <p className="text-sm text-gray-500">{flight.departCity}</p>
                    </div>

                    {/* Duration */}
                    <div className="text-center mx-8">
                      <p className="text-sm text-gray-500">{flight.duration}</p>
                      <p className="text-xs text-green-600">Non Stop</p>
                    </div>

                    {/* Arrival */}
                    <div className="text-center ml-8">
                      <p className="text-xl font-bold">{flight.arriveTime}</p>
                      <p className="text-sm text-gray-500">{flight.arriveCity}</p>
                    </div>
                  </div>

  {/* Three Buttons Row - ONLY in the middle area */}
<div className="w-full relative">
  {/* Button Grid - Tabs */}
  <div className="grid grid-cols-3 w-full max-w-md border border-black overflow-hidden">
    {[
      "Baggage Allowances",
      "Meals / Seats", 
      "Refundable Status"
    ].map((label, idx) => (
      <button
        key={label}
        onMouseEnter={() => {
          // Clear any existing timeout
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          // Set active tab immediately on hover
          setActiveTab(label.toLowerCase().replace(/\s+/g, '-').replace(/\//g, ''));
        }}
        onMouseLeave={() => {
          // Set timeout to hide content after 5 seconds
          timeoutRef.current = setTimeout(() => {
            setActiveTab(null);
          }, 5000);
        }}
        className={`px-2 py-2 text-[10px] xs:text-xs sm:text-sm font-semibold text-center whitespace-nowrap
          ${idx < 2 ? "border-r border-black" : ""} transition
          ${
            activeTab === label.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '')
              ? "bg-[#A72703] text-white"
              : "bg-[#FFE797] text-gray-800"
          }`}
      >
        {label}
      </button>
    ))}
  </div>

  {/* Full Width Content Row - Appears on hover */}
  {activeTab && (
    <div 
      className="absolute w-[90%] top-full left-0 border border-black border-t-0 bg-[#FFEBEE] z-10"
      onMouseEnter={() => {
        // Clear timeout when user hovers over content
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      }}
      onMouseLeave={() => {
        // Hide content after 5 seconds when leaving
        timeoutRef.current = setTimeout(() => {
          setActiveTab(null);
        }, 5000);
      }}
    >
      <div className="px-2 lg:px-4 py-2 lg:py-3 break-all whitespace-pre-wrap text-black text-sm lg:text-base">
        {/* Content based on activeTab */}
        {activeTab === "baggage-allowances" && "Baggage Allowances Content"}
        {activeTab === "meals-seats" && "Meals / Seats Content"}
        {activeTab === "refundable-status" && "Refundable Status Content"}
      </div>
    </div>
  )}
</div>
                </div>

                {/* Right Side: Price + Buttons */}
                <div className="w-1/4 flex flex-col items-end">
                  <div className="text-right mb-3">
                    <p className="text-xl font-bold text-gray-800">₹ {flight.price}</p>
                    <p className="text-xs text-gray-500">/adult</p>
                  </div>
                  <div className="flex flex-col gap-2 w-full max-w-[120px]">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold w-full">
                      VIEW PRICE
                    </button>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold w-full">
                      BOOK
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfflineFlightBooking;