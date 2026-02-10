import React from 'react';
import { Search, X } from 'lucide-react';

interface LocationDropdownProps {
  onClose: () => void;
  onSelectCity: (city: string) => void;
}

const LocationDropdown: React.FC<LocationDropdownProps> = ({ onClose, onSelectCity }) => {
  const popularCities = [
    'Delhi', 'Mumbai', 'Bengaluru', 'Chennai', 'Kolkata',
    'Hyderabad', 'Pune', 'Jaipur', 'Ahmedabad', 'Goa'
  ];

  const recentSearches = [
    { location: 'Goa', dates: '10 Feb - 11 Feb', guests: '2 Guests', rooms: '1 Room' }
  ];

  const handleCitySelect = (city: string) => {
    onSelectCity(city);
    onClose();
  };

  return (
    <div className="bg-white rounded-lg shadow-xl border p-4 w-80">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-800">City, Property Name Or Location</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>
      </div>
      
      <div className="relative mb-4">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search: 'Beachfront stays Goa'"
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-mmt-orange"
        />
      </div>

      <div className="mb-6">
        <h4 className="font-semibold text-gray-700 mb-2">RECENT SEARCHES</h4>
        {recentSearches.map((search, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded cursor-pointer"
            onClick={() => handleCitySelect(search.location)}
          >
            <div>
              <p className="font-medium">{search.location}</p>
              <p className="text-sm text-gray-600">{search.dates} | {search.guests} | {search.rooms}</p>
            </div>
            <button className="text-blue-600 text-sm">Search</button>
          </div>
        ))}
      </div>

      <div>
        <h4 className="font-semibold text-gray-700 mb-2">POPULAR</h4>
        <div className="grid grid-cols-2 gap-2">
          {popularCities.map((city) => (
            <button
              key={city}
              className="text-left p-3 border border-gray-200 rounded hover:border-mmt-orange hover:bg-orange-50"
              onClick={() => handleCitySelect(city)}
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationDropdown;