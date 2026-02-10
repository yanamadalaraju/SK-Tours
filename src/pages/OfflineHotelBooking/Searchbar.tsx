import React, { useState } from 'react';
import { Search, Calendar, Users, MapPin, ChevronDown } from 'lucide-react';
import LocationDropdown from './LocationDropdown';
import DatePickerDropdown from './DatePickerDropdown';
import GuestsDropdown from './GuestsDropdown';

interface SearchBarProps {
  onSearch?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showCheckInDropdown, setShowCheckInDropdown] = useState(false);
  const [showCheckOutDropdown, setShowCheckOutDropdown] = useState(false);
  const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);
  
  const [city, setCity] = useState('Goa');
  const [checkIn, setCheckIn] = useState('10 Feb\'26');
  const [checkOut, setCheckOut] = useState('12 Feb\'26');
  const [guests, setGuests] = useState('1 Room, 2 Adults, 2 Children');

  const handleCitySelect = (selectedCity: string) => {
    setCity(selectedCity);
    // Auto focus to check-in
    setTimeout(() => {
      setShowLocationDropdown(false);
      setShowCheckInDropdown(true);
    }, 100);
  };

  const handleCheckInSelect = (date: string) => {
    setCheckIn(date);
    // Auto focus to check-out
    setTimeout(() => {
      setShowCheckInDropdown(false);
      setShowCheckOutDropdown(true);
    }, 100);
  };

  const handleCheckOutSelect = (date: string) => {
    setCheckOut(date);
    // Auto focus to guests
    setTimeout(() => {
      setShowCheckOutDropdown(false);
      setShowGuestsDropdown(true);
    }, 100);
  };

  const handleGuestsSelect = (guestsInfo: string) => {
    setGuests(guestsInfo);
    setShowGuestsDropdown(false);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch();
    }
    // Close all dropdowns
    setShowLocationDropdown(false);
    setShowCheckInDropdown(false);
    setShowCheckOutDropdown(false);
    setShowGuestsDropdown(false);
  };

  return (
    <div className="relative">
      <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Location with Dropdown */}
          <div className="relative">
            <button 
              className="w-full text-left p-3 border border-gray-300 rounded-lg hover:border-mmt-orange transition-colors bg-white"
              onClick={() => {
                setShowLocationDropdown(true);
                setShowCheckInDropdown(false);
                setShowCheckOutDropdown(false);
                setShowGuestsDropdown(false);
              }}
            >
              <div className="flex items-center">
                <MapPin className="text-gray-400 mr-2" size={18} />
                <div className="flex-1">
                  <p className="text-xs text-gray-500">City, Property Name Or Location</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">{city}</p>
                      <p className="text-sm text-gray-600">India</p>
                    </div>
                    <ChevronDown className="text-gray-400" size={16} />
                  </div>
                </div>
              </div>
            </button>
            {showLocationDropdown && (
              <div className="absolute top-full left-0 z-50 mt-1">
                <LocationDropdown 
                  onClose={() => setShowLocationDropdown(false)}
                  onSelectCity={handleCitySelect}
                />
              </div>
            )}
          </div>

          {/* Check-In with Date Picker */}
          <div className="relative">
            <button 
              className="w-full text-left p-3 border border-gray-300 rounded-lg hover:border-mmt-orange transition-colors bg-white"
              onClick={() => {
                setShowLocationDropdown(false);
                setShowCheckInDropdown(true);
                setShowCheckOutDropdown(false);
                setShowGuestsDropdown(false);
              }}
            >
              <div className="flex items-center">
                <Calendar className="text-gray-400 mr-2" size={18} />
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Check-In</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">{checkIn}</p>
                      <p className="text-sm text-gray-600">Tuesday</p>
                    </div>
                    <ChevronDown className="text-gray-400" size={16} />
                  </div>
                </div>
              </div>
            </button>
            {showCheckInDropdown && (
              <div className="absolute top-full left-0 z-50 mt-1">
                <DatePickerDropdown 
                  title="Select Check-In Date"
                  onClose={() => setShowCheckInDropdown(false)}
                  onDateSelect={handleCheckInSelect}
                  nextStep={() => setShowCheckOutDropdown(true)}
                />
              </div>
            )}
          </div>

          {/* Check-Out with Date Picker */}
          <div className="relative">
            <button 
              className="w-full text-left p-3 border border-gray-300 rounded-lg hover:border-mmt-orange transition-colors bg-white"
              onClick={() => {
                setShowLocationDropdown(false);
                setShowCheckInDropdown(false);
                setShowCheckOutDropdown(true);
                setShowGuestsDropdown(false);
              }}
            >
              <div className="flex items-center">
                <Calendar className="text-gray-400 mr-2" size={18} />
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Check-Out</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">{checkOut}</p>
                      <p className="text-sm text-gray-600">Thursday</p>
                    </div>
                    <ChevronDown className="text-gray-400" size={16} />
                  </div>
                </div>
              </div>
            </button>
            {showCheckOutDropdown && (
              <div className="absolute top-full left-0 z-50 mt-1">
                <DatePickerDropdown 
                  title="Select Check-Out Date"
                  onClose={() => setShowCheckOutDropdown(false)}
                  onDateSelect={handleCheckOutSelect}
                  nextStep={() => setShowGuestsDropdown(true)}
                />
              </div>
            )}
          </div>

          {/* Rooms & Guests with Dropdown */}
          <div className="relative">
            <button 
              className="w-full text-left p-3 border border-gray-300 rounded-lg hover:border-mmt-orange transition-colors bg-white"
              onClick={() => {
                setShowLocationDropdown(false);
                setShowCheckInDropdown(false);
                setShowCheckOutDropdown(false);
                setShowGuestsDropdown(true);
              }}
            >
              <div className="flex items-center">
                <Users className="text-gray-400 mr-2" size={18} />
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Rooms & Guests</p>
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-800">{guests}</p>
                    <ChevronDown className="text-gray-400" size={16} />
                  </div>
                </div>
              </div>
            </button>
            {showGuestsDropdown && (
              <div className="absolute top-full left-0 z-50 mt-1">
                <GuestsDropdown 
                  onClose={() => setShowGuestsDropdown(false)}
                  onSelectGuests={handleGuestsSelect}
                />
              </div>
            )}
          </div>

          {/* Search and Book Buttons */}
          <div className="flex flex-col space-y-2">
            <button 
              onClick={handleSearch}
              className="bg-mmt-orange hover:bg-mmt-orange-hover text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-colors"
            >
              <Search className="mr-2" size={20} />
              SEARCH
            </button>
            <button className="bg-mmt-blue text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-900 transition-colors">
              BOOK NOW
            </button>
          </div>
        </div>

        {/* Trending Searches */}
        {/* <div className="mt-4 pt-4 border-t">
          <p className="text-sm text-gray-600 mb-2">Trending Searches:</p>
          <div className="flex flex-wrap gap-2">
            {[
              'Singapore, Singapore',
              'New York, United States', 
              'Bangkok, Thailand',
              'Dubai, UAE',
              'Maldives'
            ].map((city, index) => (
              <button
                key={index}
                className="text-mmt-blue hover:text-mmt-orange text-sm bg-mmt-light-blue hover:bg-blue-100 px-3 py-1.5 rounded-full transition-colors"
                onClick={() => handleCitySelect(city)}
              >
                {city}
              </button>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default SearchBar;