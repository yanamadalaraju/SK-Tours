import React, { useState } from 'react';

const HotelDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'facilities', label: 'Hotel Facilities' },
    { id: 'transfer', label: 'Airport Transfers' },
    { id: 'meal', label: 'Meal Plan' },
    { id: 'taxes', label: 'Taxes' }
  ];

  const tabContent = {
    overview: (
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Hotel Overview</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <table className="w-full">
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-4 font-semibold text-gray-700 w-1/3">Property Name</td>
                <td className="py-4 text-gray-800">Estrela Do Mar Beach Resort</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-4 font-semibold text-gray-700">Location</td>
                <td className="py-4 text-gray-800">North Goa, Near Calangute Beach</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-4 font-semibold text-gray-700">Check-in Time</td>
                <td className="py-4 text-gray-800">2:00 PM</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-4 font-semibold text-gray-700">Check-out Time</td>
                <td className="py-4 text-gray-800">12:00 PM</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-4 font-semibold text-gray-700">Star Rating</td>
                <td className="py-4 text-gray-800">
                  <span className="text-yellow-500">★★★★☆</span> (4 Star)
                </td>
              </tr>
              <tr>
                <td className="py-4 font-semibold text-gray-700">Description</td>
                <td className="py-4 text-gray-800">
                  A beautiful beachfront property offering luxurious amenities and stunning sea views. Perfect for family vacations with kids staying free.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
    facilities: (
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Hotel Facilities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: '🏊', title: 'Swimming Pool', desc: 'Available (Outdoor)' },
            { icon: '💆', title: 'Spa', desc: 'Available' },
            { icon: '💪', title: 'Fitness Center', desc: '24/7 Available' },
            { icon: '🍽️', title: 'Restaurant', desc: '2 Multi-cuisine' },
            { icon: '📶', title: 'Wi-Fi', desc: 'Free in all areas' },
            { icon: '🅿️', title: 'Parking', desc: 'Free Private Parking' },
          ].map((facility, index) => (
            <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-lg">{facility.icon}</span>
              </div>
              <div>
                <p className="font-semibold text-gray-800">{facility.title}</p>
                <p className="text-sm text-gray-600">{facility.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    transfer: (
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Airport Transfer Details</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <table className="w-full">
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-3 font-semibold text-gray-700 w-1/3">Nearest Airport</td>
                <td className="py-3 text-gray-800">Goa International Airport (GOI)</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 font-semibold text-gray-700">Distance</td>
                <td className="py-3 text-gray-800">36 km</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 font-semibold text-gray-700">Transfer Service</td>
                <td className="py-3 text-green-600 font-semibold">✓ Available on request</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 font-semibold text-gray-700">Transfer Cost</td>
                <td className="py-3 text-gray-800">₹2,500 - ₹3,500 per vehicle</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 font-semibold text-gray-700">Travel Time</td>
                <td className="py-3 text-gray-800">Approx. 1 hour</td>
              </tr>
              <tr>
                <td className="py-3 font-semibold text-gray-700">Booking Required</td>
                <td className="py-3 text-gray-800">24 hours in advance</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
    meal: (
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Meal Plans</h3>
        <div className="space-y-4">
          {[
            { plan: 'European Plan (EP)', desc: 'Room only, no meals', price: '+₹0' },
            { plan: 'Continental Plan (CP)', desc: 'Room + Breakfast', price: '+₹800 per person', highlighted: true },
            { plan: 'Modified American Plan (MAP)', desc: 'Room + Breakfast + Dinner', price: '+₹1,500 per person' },
            { plan: 'American Plan (AP)', desc: 'Room + All meals', price: '+₹2,200 per person' },
          ].map((meal, index) => (
            <div 
              key={index} 
              className={`border ${meal.highlighted ? 'border-mmt-orange bg-orange-50' : 'border-gray-200'} rounded-lg p-4`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-gray-800">{meal.plan}</p>
                  <p className="text-gray-600 text-sm mt-1">{meal.desc}</p>
                </div>
                <span className="text-lg font-bold text-gray-800">{meal.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    taxes: (
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Taxes and Fees</h3>
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="space-y-3">
            {[
              { label: 'Base Room Price', amount: '₹10,518' },
              { label: 'SGST (9%)', amount: '₹947' },
              { label: 'CGST (9%)', amount: '₹947' },
              { label: 'Service Charge', amount: '₹315' },
              { label: 'Resort Fee', amount: '₹500' },
            ].map((item, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-gray-700">{item.label}</span>
                <span className="font-semibold text-gray-800">{item.amount}</span>
              </div>
            ))}
            <div className="border-t border-gray-300 pt-3 mt-3">
              <div className="flex justify-between text-lg font-bold">
                <span className="text-gray-800">Total per night</span>
                <span className="text-gray-800">₹13,227</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  };

  return (
    <div className="bg-white rounded-xl shadow-md mt-6">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap transition-all duration-300 ${
                activeTab === tab.id
                  ? 'border-b-2 border-mmt-orange text-mmt-orange font-bold'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {tabContent[activeTab as keyof typeof tabContent]}
      </div>
    </div>
  );
};

export default HotelDetails;