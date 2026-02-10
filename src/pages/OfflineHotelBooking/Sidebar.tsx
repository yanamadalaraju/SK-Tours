import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-md h-fit">
      {/* Search for locality/hotel name */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-3">Search for locality / hotel name</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Enter locality or hotel"
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mmt-orange focus:border-mmt-orange"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      {/* Price Per Night */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Price Per Night</h2>
        <div className="space-y-3">
          {[
            { range: '₹0 - ₹2500', count: 509 },
            { range: '₹2500 - ₹4500', count: 781 },
            { range: '₹4500 - ₹7500', count: 418 },
            { range: '₹7500 - ₹10000', count: 169 },
            { range: '₹10000 - ₹15000', count: 299 },
            { range: '₹15000 - ₹30000', count: 342 },
            { range: '₹30000+', count: 163 }
          ].map((item, index) => (
            <div key={index} className="flex items-center">
              <input
                type="checkbox"
                id={`price-${index}`}
                className="h-5 w-5 text-mmt-orange rounded focus:ring-mmt-orange border-gray-300 cursor-pointer"
              />
              <label htmlFor={`price-${index}`} className="ml-3 text-gray-700 cursor-pointer text-sm">
                {item.range} <span className="text-gray-500">({item.count})</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Your Budget */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Your Budget</h2>
        <div className="space-y-4">
          {/* Min Input */}
          <div>
            <label htmlFor="min-budget" className="block text-sm font-medium text-gray-700 mb-1">
              Min
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">₹</span>
              </div>
              <input
                type="text"
                id="min-budget"
                placeholder="Min"
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mmt-orange focus:border-mmt-orange"
              />
            </div>
          </div>
          
          {/* To text */}
          <div className="text-center text-gray-500 font-medium">to</div>
          
          {/* Max Input */}
          <div>
            <label htmlFor="max-budget" className="block text-sm font-medium text-gray-700 mb-1">
              Max
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">₹</span>
              </div>
              <input
                type="text"
                id="max-budget"
                placeholder="Max"
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mmt-orange focus:border-mmt-orange"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Star Category */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Star Category</h2>
        <div className="space-y-3">
          {[
            { stars: '3 Star', count: 676 },
            { stars: '4 Star', count: 368 },
            { stars: '5 Star', count: 206 }
          ].map((item, index) => (
            <div key={index} className="flex items-center">
              <input
                type="checkbox"
                id={`star-${index}`}
                className="h-5 w-5 text-mmt-orange rounded focus:ring-mmt-orange border-gray-300 cursor-pointer"
              />
              <label htmlFor={`star-${index}`} className="ml-3 text-gray-700 cursor-pointer text-sm">
                {item.stars} <span className="text-gray-500">({item.count})</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Filters */}
      {/* <div className="pt-6 border-t">
        <h2 className="text-lg font-bold text-gray-800 mb-4">More Filters</h2>
        <div className="space-y-3">
          {[
            'Free Cancellation',
            'Breakfast Included', 
            'Swimming Pool',
            'Spa',
            'Wi-Fi Included',
            'Pet Friendly'
          ].map((filter, index) => (
            <div key={index} className="flex items-center">
              <input
                type="checkbox"
                id={`filter-${index}`}
                className="h-5 w-5 text-mmt-orange rounded focus:ring-mmt-orange border-gray-300 cursor-pointer"
              />
              <label htmlFor={`filter-${index}`} className="ml-3 text-gray-700 cursor-pointer text-sm">
                {filter}
              </label>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default Sidebar;