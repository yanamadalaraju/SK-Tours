import React, { useState, useEffect, useRef } from "react";
import { 
  Hotel, 
  Search, 
  Calendar as CalendarIcon, 
  Users, 
  MapPin,
  ChevronDown,
  Minus,
  Plus,
  Star,
  Check,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Header from '@/components/Header';
import Footer from "@/components/Footer";

// Types
interface TravellerCount {
  rooms: number;
  adults: number;
  children: number;
  infants?: number;
}

interface ChildAge {
  index: number;
  age: number;
}

// Static hotel data
const hotels = [
  {
    id: 1,
    name: "Estrela Do Mar Beach Resort",
    location: "North Goa",
    address: "About a minute walk to Calangute Beach",
    rating: 3.9,
    ratingsCount: 8205,
    stars: 4,
    price: 10518,
    originalPrice: 47999,
    taxes: 1205,
    features: [
      "Free stay for both the kids",
      "Near Calangute Beach, swimming pool and jacuzzi, live music during meals"
    ],
    image: "🏨",
    imageColor: "from-blue-400 to-blue-600",
    cancellation: "Free Cancellation Available",
    sale: "Limited Time Sale"
  },
  {
    id: 2,
    name: "Coconut Grove Resort",
    location: "Calangute Beach",
    address: "Beachfront property with private access",
    rating: 4.2,
    ratingsCount: 3241,
    stars: 4,
    price: 8500,
    originalPrice: 12999,
    taxes: 950,
    features: [
      "Beachfront access",
      "Swimming pool, spa, and restaurant"
    ],
    image: "🏨",
    imageColor: "from-green-400 to-green-600",
    cancellation: "Free Cancellation Available",
    sale: "Limited Time Sale"
  },
  {
    id: 3,
    name: "Sunset Paradise Hotel",
    location: "Baga",
    address: "5 minutes walk to Baga Beach",
    rating: 4.0,
    ratingsCount: 2187,
    stars: 4,
    price: 9200,
    originalPrice: 15999,
    taxes: 1050,
    features: [
      "Rooftop infinity pool",
      "Night club and bar"
    ],
    image: "🏨",
    imageColor: "from-orange-400 to-orange-600",
    cancellation: "Free Cancellation Available",
    sale: "Limited Time Sale"
  },
  {
    id: 4,
    name: "Palm Beach Resort",
    location: "North Goa",
    address: "Near Candolim Beach",
    rating: 4.3,
    ratingsCount: 1562,
    stars: 3,
    price: 7800,
    originalPrice: 10999,
    taxes: 850,
    features: [
      "Garden view rooms",
      "Outdoor pool and restaurant"
    ],
    image: "🏨",
    imageColor: "from-blue-400 to-blue-600",
    cancellation: "Free Cancellation Available",
    sale: "Limited Time Sale"
  }
];

// Popular cities
const cities = [
  { name: "Goa", country: "India", popular: true },
  { name: "Delhi", country: "India", popular: true },
  { name: "Mumbai", country: "India", popular: true },
  { name: "Bengaluru", country: "India", popular: true },
  { name: "Chennai", country: "India", popular: true },
  { name: "Kolkata", country: "India", popular: true },
  { name: "Hyderabad", country: "India", popular: true },
  { name: "Pune", country: "India", popular: true },
  { name: "Jaipur", country: "India", popular: true },
  { name: "Ahmedabad", country: "India", popular: true }
];

// Date Picker Component
const DatePickerDropdown = ({ 
  title, 
  onClose, 
  onDateSelect, 
  nextStep,
  selectedDate,
  autoOpen
}: { 
  title: string; 
  onClose: () => void; 
  onDateSelect?: (date: Date) => void; 
  nextStep?: () => void;
  selectedDate?: Date | null;
  autoOpen?: boolean;
}) => {
  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  
  // Generate calendar days for current month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    
    // Previous month days
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({ date: prevDate, currentMonth: false });
    }
    
    // Current month days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({ date: new Date(year, month, i), currentMonth: true });
    }
    
    // Next month days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ date: new Date(year, month + 1, i), currentMonth: false });
    }
    
    return days;
  };

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selected, setSelected] = useState<Date | null>(selectedDate || null);
  
  const days = getDaysInMonth(currentDate);
  
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (date: Date) => {
    setSelected(date);
    if (onDateSelect) {
      onDateSelect(date);
    }
  };

  const handleApply = () => {
    if (selected && onDateSelect) {
      onDateSelect(selected);
    }
    if (nextStep) {
      nextStep();
    }
    onClose();
  };

  return (
    <div className="bg-white rounded-lg shadow-xl border p-6 w-[700px] max-w-[90vw] max-h-[90vh] overflow-y-auto z-[100]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-800 text-lg">{title}</h3>
        <button 
          onClick={onClose} 
          className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex gap-8">
        {/* Calendar */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded">
              <ChevronLeft size={20} />
            </button>
            <h4 className="font-bold text-gray-800">
              {format(currentDate, 'MMMM yyyy')}
            </h4>
            <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded">
              <ChevronRight size={20} />
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {weekDays.map(day => (
              <div key={day} className="text-center text-xs font-semibold text-gray-500 py-2">
                {day}
              </div>
            ))}
            
            {days.map((day, index) => {
              const isSelected = selected && day.date.toDateString() === selected.toDateString();
              const isToday = day.date.toDateString() === new Date().toDateString();
              const isPast = day.date < new Date(new Date().setHours(0,0,0,0));
              
              return (
                <button
                  key={index}
                  onClick={() => day.currentMonth && !isPast && handleDateClick(day.date)}
                  disabled={!day.currentMonth || isPast}
                  className={cn(
                    "h-10 w-10 rounded-full text-sm transition-colors",
                    isSelected && "bg-orange-600 text-white font-bold",
                    !isSelected && day.currentMonth && !isPast && "hover:bg-gray-100",
                    isToday && !isSelected && "border border-orange-300",
                    (!day.currentMonth || isPast) && "text-gray-300 cursor-not-allowed"
                  )}
                >
                  {day.date.getDate()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Holidays Section */}
        <div className="w-48 flex-shrink-0 border-l pl-6">
          <h4 className="font-bold text-gray-800 mb-4">Holidays</h4>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-1.5"></div>
              <div>
                <div className="font-medium text-gray-800">26 Jan '26</div>
                <div className="text-gray-600 text-sm">Republic Day</div>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-1.5"></div>
              <div>
                <div className="font-medium text-gray-800">15 Feb '26</div>
                <div className="text-gray-600 text-sm">Maha Shivaratri</div>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-1.5"></div>
              <div>
                <div className="font-medium text-gray-800">27 Mar '26</div>
                <div className="text-gray-600 text-sm">Ram Navami</div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t">
            <button 
              onClick={handleApply}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Guests Dropdown Component
const GuestsDropdown = ({ 
  onClose, 
  onSelectGuests,
  travellers,
  onTravellersChange,
  autoOpen
}: { 
  onClose: () => void; 
  onSelectGuests: (guestsInfo: string) => void;
  travellers: TravellerCount;
  onTravellersChange: (travellers: TravellerCount) => void;
  autoOpen?: boolean;
}) => {
  const [rooms, setRooms] = useState(travellers.rooms || 1);
  const [adults, setAdults] = useState(travellers.adults || 2);
  const [children, setChildren] = useState(travellers.children || 0);
  const [childrenAges, setChildrenAges] = useState<number[]>([5, 8].slice(0, children));
  const [withPets, setWithPets] = useState(false);

  useEffect(() => {
    onTravellersChange({
      rooms,
      adults,
      children,
      infants: 0
    });
  }, [rooms, adults, children]);

  const updateChildrenAge = (index: number, age: number) => {
    const newAges = [...childrenAges];
    newAges[index] = age;
    setChildrenAges(newAges);
  };

  const handleApply = () => {
    const childrenText = children > 0 ? `, ${children} Children` : '';
    const guestsInfo = `${rooms} Room${rooms > 1 ? 's' : ''}, ${adults} Adult${adults > 1 ? 's' : ''}${childrenText}`;
    onSelectGuests(guestsInfo);
    onClose();
  };

  return (
    <div className="bg-white rounded-lg shadow-xl border p-6 w-80 z-[100]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-800">Rooms & Guests</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>
      </div>

      {/* Room Counter */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium text-gray-800">Rooms</span>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setRooms(Math.max(1, rooms - 1))}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100"
            >
              <Minus size={16} />
            </button>
            <span className="w-8 text-center font-bold">{rooms}</span>
            <button 
              onClick={() => setRooms(rooms + 1)}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Adults Counter */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium text-gray-800">Adults</span>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setAdults(Math.max(1, adults - 1))}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100"
            >
              <Minus size={16} />
            </button>
            <span className="w-8 text-center font-bold">{adults}</span>
            <button 
              onClick={() => setAdults(adults + 1)}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Children Counter */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="font-medium text-gray-800">Children</span>
            <p className="text-xs text-gray-600">0 - 17 Years Old</p>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => {
                const newCount = Math.max(0, children - 1);
                setChildren(newCount);
                setChildrenAges(childrenAges.slice(0, newCount));
              }}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100"
            >
              <Minus size={16} />
            </button>
            <span className="w-8 text-center font-bold">{children}</span>
            <button 
              onClick={() => {
                setChildren(children + 1);
                setChildrenAges([...childrenAges, 5]);
              }}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
        
        {children > 0 && (
          <div className="pl-4">
            <p className="text-xs text-gray-600 mb-3">
              Please provide right number of children along with their right age for best options and prices.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {childrenAges.map((age, index) => (
                <div key={index} className="mb-2">
                  <label className="text-sm text-gray-700 mb-1 block">Child {index + 1} Age</label>
                  <select 
                    value={age}
                    onChange={(e) => updateChildrenAge(index, parseInt(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500/30"
                  >
                    {Array.from({ length: 18 }, (_, i) => (
                      <option key={i} value={i}>{i} years</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Pets Option */}
      <div className="mb-6">
        <div className="flex items-start">
          <input
            type="checkbox"
            id="pets"
            checked={withPets}
            onChange={(e) => setWithPets(e.target.checked)}
            className="mt-1 mr-3 accent-orange-600"
          />
          <div>
            <label htmlFor="pets" className="font-medium text-gray-800 block">
              Are you travelling with pets?
            </label>
            <p className="text-xs text-gray-600 mt-1">
              Selecting this option will show only pet-friendly properties.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button 
          onClick={handleApply}
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

// Location Dropdown Component
const LocationDropdown = ({ 
  onClose, 
  onSelectCity,
  autoOpen
}: { 
  onClose: () => void; 
  onSelectCity: (city: string) => void;
  autoOpen?: boolean;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const recentSearches = [
    { location: 'Goa', dates: '10 Feb - 11 Feb', guests: '2 Guests', rooms: '1 Room' }
  ];

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCitySelect = (city: string) => {
    onSelectCity(city);
    onClose();
  };

  return (
    <div className="bg-white rounded-lg shadow-xl border p-4 w-96 z-[100]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-800">City, Property Name Or Location</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>
      </div>
      
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search: 'Beachfront stays Goa'"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/30"
          autoFocus
        />
      </div>

      <div className="mb-6">
        <h4 className="font-semibold text-gray-700 mb-2 text-xs">RECENT SEARCHES</h4>
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
        <h4 className="font-semibold text-gray-700 mb-2 text-xs">POPULAR</h4>
        <div className="grid grid-cols-2 gap-2">
          {filteredCities.map((city) => (
            <button
              key={city.name}
              className="text-left p-3 border border-gray-200 rounded hover:border-orange-500 hover:bg-orange-50 transition-colors"
              onClick={() => handleCitySelect(city.name)}
            >
              {city.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Sidebar Component
const Sidebar = () => {
  const priceRanges = [
    { range: '₹0 - ₹2500', count: 509 },
    { range: '₹2500 - ₹4500', count: 781 },
    { range: '₹4500 - ₹7500', count: 418 },
    { range: '₹7500 - ₹10000', count: 169 },
    { range: '₹10000 - ₹15000', count: 299 },
    { range: '₹15000 - ₹30000', count: 342 },
    { range: '₹30000+', count: 163 }
  ];

  const starCategories = [
    { stars: '3 Star', count: 676 },
    { stars: '4 Star', count: 368 },
    { stars: '5 Star', count: 206 }
  ];

  const amenities = [
    'Free Cancellation',
    'Breakfast Included',
    'Swimming Pool',
    'Spa',
    'Wi-Fi Included',
    'Pet Friendly',
    'Parking',
    'Airport Shuttle',
    'Restaurant',
    'Fitness Center'
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 h-fit">
      {/* Search for locality/hotel name */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-3">Search for locality / hotel name</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Enter locality or hotel"
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/30"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </div>
      </div>

      {/* Price Per Night */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Price Per Night</h2>
        <div className="space-y-3">
          {priceRanges.map((item, index) => (
            <div key={index} className="flex items-center">
              <input
                type="checkbox"
                id={`price-${index}`}
                className="h-5 w-5 accent-orange-600 rounded focus:ring-orange-500 border-gray-300 cursor-pointer"
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
          <div>
            <label htmlFor="min-budget" className="block text-sm font-medium text-gray-700 mb-1">
              Min
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
              <input
                type="text"
                id="min-budget"
                placeholder="Min"
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/30"
              />
            </div>
          </div>
          
          <div className="text-center text-gray-500 font-medium">to</div>
          
          <div>
            <label htmlFor="max-budget" className="block text-sm font-medium text-gray-700 mb-1">
              Max
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
              <input
                type="text"
                id="max-budget"
                placeholder="Max"
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/30"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Star Category */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Star Category</h2>
        <div className="space-y-3">
          {starCategories.map((item, index) => (
            <div key={index} className="flex items-center">
              <input
                type="checkbox"
                id={`star-${index}`}
                className="h-5 w-5 accent-orange-600 rounded focus:ring-orange-500 border-gray-300 cursor-pointer"
              />
              <label htmlFor={`star-${index}`} className="ml-3 text-gray-700 cursor-pointer text-sm">
                {item.stars} <span className="text-gray-500">({item.count})</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Amenities</h2>
        <div className="space-y-3">
          {amenities.map((amenity, index) => (
            <div key={index} className="flex items-center">
              <input
                type="checkbox"
                id={`amenity-${index}`}
                className="h-5 w-5 accent-orange-600 rounded focus:ring-orange-500 border-gray-300 cursor-pointer"
              />
              <label htmlFor={`amenity-${index}`} className="ml-3 text-gray-700 cursor-pointer text-sm">
                {amenity}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Hotel Card Component
const HotelCard = ({ hotel }: { hotel: typeof hotels[0] }) => {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'facilities', label: 'Hotel Facilities' },
    { id: 'transfer', label: 'Airport Transfers' },
    { id: 'meal', label: 'Meal Plan' },
    { id: 'taxes', label: 'Taxes' }
  ];

  const tabContent = {
    overview: (
      <div className="p-4">
        <h4 className="font-semibold mb-2">Hotel Overview</h4>
        <table className="w-full text-sm">
          <tbody>
            <tr className="border-b">
              <td className="py-2 font-medium">Property Name</td>
              <td className="py-2">{hotel.name}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 font-medium">Location</td>
              <td className="py-2">{hotel.location}, {hotel.address}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 font-medium">Check-in Time</td>
              <td className="py-2">2:00 PM</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 font-medium">Check-out Time</td>
              <td className="py-2">12:00 PM</td>
            </tr>
            <tr>
              <td className="py-2 font-medium">Star Rating</td>
              <td className="py-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={cn(
                      "w-4 h-4",
                      i < hotel.stars ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    )} />
                  ))}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
    facilities: (
      <div className="p-4">
        <h4 className="font-semibold mb-3">Hotel Facilities</h4>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: '🏊', title: 'Swimming Pool' },
            { icon: '💆', title: 'Spa' },
            { icon: '💪', title: 'Fitness Center' },
            { icon: '🍽️', title: 'Restaurant' },
            { icon: '📶', title: 'Free Wi-Fi' },
            { icon: '🅿️', title: 'Parking' },
          ].map((facility, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-lg">{facility.icon}</span>
              <span className="text-sm">{facility.title}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    transfer: (
      <div className="p-4">
        <h4 className="font-semibold mb-3">Airport Transfer Details</h4>
        <table className="w-full text-sm">
          <tbody>
            <tr className="border-b">
              <td className="py-2 font-medium">Nearest Airport</td>
              <td className="py-2">Goa International Airport (GOI)</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 font-medium">Distance</td>
              <td className="py-2">36 km</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 font-medium">Transfer Service</td>
              <td className="py-2 text-green-600">✓ Available on request</td>
            </tr>
            <tr>
              <td className="py-2 font-medium">Transfer Cost</td>
              <td className="py-2">₹2,500 - ₹3,500 per vehicle</td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
    meal: (
      <div className="p-4">
        <h4 className="font-semibold mb-3">Meal Plans</h4>
        <div className="space-y-2">
          {[
            { plan: 'Room only (EP)', price: 'Included' },
            { plan: 'Breakfast (CP)', price: '+₹800' },
            { plan: 'Breakfast + Dinner (MAP)', price: '+₹1,500' },
            { plan: 'All meals (AP)', price: '+₹2,200' },
          ].map((meal, idx) => (
            <div key={idx} className="flex justify-between text-sm border-b pb-2">
              <span>{meal.plan}</span>
              <span className="font-medium">{meal.price}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    taxes: (
      <div className="p-4">
        <h4 className="font-semibold mb-3">Taxes and Fees</h4>
        <div className="space-y-2">
          {[
            { label: 'Base Price', amount: `₹${hotel.price.toLocaleString()}` },
            { label: 'SGST (9%)', amount: `₹${Math.round(hotel.price * 0.09).toLocaleString()}` },
            { label: 'CGST (9%)', amount: `₹${Math.round(hotel.price * 0.09).toLocaleString()}` },
            { label: 'Service Charge', amount: '₹315' },
          ].map((item, idx) => (
            <div key={idx} className="flex justify-between text-sm border-b pb-2">
              <span>{item.label}</span>
              <span className="font-medium">{item.amount}</span>
            </div>
          ))}
          <div className="flex justify-between text-sm font-bold pt-2">
            <span>Total per night</span>
            <span>₹{(hotel.price + Math.round(hotel.price * 0.18) + 315).toLocaleString()}</span>
          </div>
        </div>
      </div>
    )
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-6">
      <div className="flex flex-col lg:flex-row">
        {/* Hotel Image */}
        <div className="lg:w-64 mr-6 flex-shrink-0 mb-4 lg:mb-0">
          <div className={`bg-gradient-to-br ${hotel.imageColor} rounded-lg h-48 w-full mb-3 flex items-center justify-center overflow-hidden`}>
            <div className="text-white text-center">
              <div className="text-4xl mb-2">{hotel.image}</div>
              <p className="font-bold text-lg">{hotel.name.split(' ').slice(0, 2).join(' ')}</p>
              <p className="text-sm opacity-90">Beach Resort</p>
            </div>
          </div>
          <div className="flex items-center text-sm text-green-600 font-medium">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            {hotel.cancellation}
          </div>
        </div>

        {/* Hotel Details */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-3">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-800 flex items-center flex-wrap gap-2">
                  {hotel.name}
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={cn(
                        "w-4 h-4",
                        i < hotel.stars ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      )} />
                    ))}
                  </div>
                </h2>
                <div className="flex items-center text-gray-600 mt-1">
                  <MapPin size={16} className="mr-1 flex-shrink-0" />
                  <span className="text-sm">{hotel.location} | {hotel.address}</span>
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-semibold flex items-center whitespace-nowrap">
                View on Map
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="mb-4">
            <ul className="space-y-2">
              {hotel.features.map((feature, idx) => (
                <li key={idx} className="flex items-start text-gray-700">
                  <Check size={18} className="mr-2 flex-shrink-0 mt-0.5 text-green-600" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-4">
            <div className="flex flex-wrap gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(activeTab === tab.id ? null : tab.id)}
                  className={cn(
                    "px-3 py-2 text-xs font-medium transition-colors whitespace-nowrap rounded-t-lg",
                    activeTab === tab.id
                      ? "border-b-2 border-orange-600 text-orange-600"
                      : "text-gray-600 hover:text-gray-800"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab && (
            <div className="mb-4 bg-gray-50 rounded-lg">
              {tabContent[activeTab as keyof typeof tabContent]}
            </div>
          )}

          {/* Rating and Price */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mt-4 pt-4 border-t">
            <div className="mb-4 sm:mb-0">
              <div className="flex items-center mb-3">
                <div className="bg-green-600 text-white px-3 py-1.5 rounded-l flex items-center">
                  <span className="font-bold">{hotel.rating}</span>
                  <span className="ml-1.5 text-sm font-medium">Very Good</span>
                </div>
                <div className="bg-green-50 text-green-700 px-3 py-1.5 rounded-r">
                  <span className="text-sm">({hotel.ratingsCount.toLocaleString()} Ratings)</span>
                </div>
              </div>
              
              <div className="flex items-center">
                <span className="bg-red-50 text-red-600 text-xs font-bold px-2 py-1 rounded mr-2">
                  {hotel.sale}
                </span>
                <span className="text-sm text-gray-600">Per Night for {hotel.rooms || 1} Room</span>
              </div>
            </div>

            {/* Price Section */}
            <div className="text-right w-full sm:w-auto">
              <div className="mb-1">
                <span className="text-gray-500 line-through text-sm">₹{hotel.originalPrice.toLocaleString()}</span>
              </div>
              <div className="flex items-baseline justify-end mb-2 flex-wrap">
                <span className="text-2xl font-bold text-gray-800">₹{hotel.price.toLocaleString()}</span>
                <span className="text-gray-600 text-sm ml-2">+ ₹{hotel.taxes.toLocaleString()} taxes</span>
              </div>
              
              <div className="space-y-2">
                <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg transition-colors w-full sm:w-auto">
                  VIEW ALL
                </button>
                <p className="text-blue-600 text-sm font-semibold">
                  Login to Book Now & Pay Later!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component
const HotelSearch = () => {
  const [showResults, setShowResults] = useState(false);
  const [searchData, setSearchData] = useState<any>(null);
  
  const [location, setLocation] = useState("Goa");
  const [checkIn, setCheckIn] = useState<Date>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d;
  });
  const [checkOut, setCheckOut] = useState<Date | undefined>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d;
  });
  const [travellers, setTravellers] = useState<TravellerCount>({
    rooms: 1,
    adults: 2,
    children: 0,
    infants: 0
  });

  // Dropdown states
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showCheckInDropdown, setShowCheckInDropdown] = useState(false);
  const [showCheckOutDropdown, setShowCheckOutDropdown] = useState(false);
  const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);

  // Auto-focus states
  const [autoOpenCheckIn, setAutoOpenCheckIn] = useState(false);
  const [autoOpenCheckOut, setAutoOpenCheckOut] = useState(false);
  const [autoOpenGuests, setAutoOpenGuests] = useState(false);

  const handleSearch = () => {
    if (!location || !checkIn) return;
    
    const newSearchData = {
      location,
      checkIn,
      checkOut,
      travellers
    };
    
    setSearchData(newSearchData);
    setShowResults(true);
    
    setTimeout(() => {
      window.scrollTo({
        top: document.getElementById('hotel-results')?.offsetTop || 0,
        behavior: 'smooth'
      });
    }, 100);
  };

  // Auto-focus handlers
  const handleLocationSelect = (city: string) => {
    setLocation(city);
    setAutoOpenCheckIn(true);
  };

  const handleCheckInSelect = (date: Date) => {
    setCheckIn(date);
    setAutoOpenCheckOut(true);
  };

  const handleCheckOutSelect = (date: Date) => {
    setCheckOut(date);
    setAutoOpenGuests(true);
  };

  // Close handlers
  const handleLocationClose = () => {
    setShowLocationDropdown(false);
  };

  const handleCheckInClose = () => {
    setShowCheckInDropdown(false);
    setAutoOpenCheckIn(false);
  };

  const handleCheckOutClose = () => {
    setShowCheckOutDropdown(false);
    setAutoOpenCheckOut(false);
  };

  const handleGuestsClose = () => {
    setShowGuestsDropdown(false);
    setAutoOpenGuests(false);
  };

  const guestsDisplay = `${travellers.rooms} Room${travellers.rooms > 1 ? 's' : ''}, ${travellers.adults} Adult${travellers.adults > 1 ? 's' : ''}${travellers.children > 0 ? `, ${travellers.children} Child${travellers.children > 1 ? 'ren' : ''}` : ''}`;

  const isSearchEnabled = !!location && !!checkIn;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50/70 to-white">
      <Header />
      
      <div className="flex-grow">
        {/* Header Section with Background Image */}
        <div 
          className="pt-28 pb-28 relative bg-gradient-to-r from-blue-200/90 to-blue-300/90"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(74, 94, 149, 0.45), rgba(30, 64, 175, 0.49)), url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'overlay'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-800/80"></div>
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <Hotel className="w-8 h-8 text-white" />
              <h1 className="text-2xl font-bold text-white">Hotel Booking</h1>
            </div>
          </div>
        </div>

        {/* Search Form */}
        <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-10 mb-20">  
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200">
            <div className="flex flex-col md:flex-row">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-4">
                {/* Location */}
                <div className="relative border-b md:border-b-0 md:border-r border-gray-200">
                  <button
                    onClick={() => {
                      setShowLocationDropdown(!showLocationDropdown);
                      setShowCheckInDropdown(false);
                      setShowCheckOutDropdown(false);
                      setShowGuestsDropdown(false);
                    }}
                    className="w-full h-full text-left px-4 py-3 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500 uppercase tracking-wide">CITY / HOTEL</p>
                        <p className="font-semibold text-gray-900 truncate">{location}</p>
                        <p className="text-xs text-gray-500 truncate">India</p>
                      </div>
                      <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />
                    </div>
                  </button>
                  {showLocationDropdown && (
                    <div className="absolute top-full left-0 mt-2">
                      <LocationDropdown 
                        onClose={handleLocationClose}
                        onSelectCity={handleLocationSelect}
                        autoOpen={autoOpenCheckIn}
                      />
                    </div>
                  )}
                </div>

                {/* Check-In */}
                <div className="relative border-b md:border-b-0 md:border-r border-gray-200">
                  <button
                    onClick={() => {
                      setShowLocationDropdown(false);
                      setShowCheckInDropdown(!showCheckInDropdown);
                      setShowCheckOutDropdown(false);
                      setShowGuestsDropdown(false);
                    }}
                    className="w-full h-full text-left px-4 py-3 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                        <CalendarIcon className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500 uppercase tracking-wide">CHECK-IN</p>
                        <p className="font-semibold text-gray-900 truncate">
                          {checkIn ? format(checkIn, "dd MMM''yy") : "Select Date"}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {checkIn ? format(checkIn, "EEEE") : ""}
                        </p>
                      </div>
                      <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />
                    </div>
                  </button>
                  {showCheckInDropdown && (
                    <div className="absolute top-full left-0 mt-2">
                      <DatePickerDropdown 
                        title="Select Check-In Date"
                        onClose={handleCheckInClose}
                        onDateSelect={handleCheckInSelect}
                        nextStep={() => setShowCheckOutDropdown(true)}
                        selectedDate={checkIn}
                        autoOpen={autoOpenCheckIn}
                      />
                    </div>
                  )}
                </div>

                {/* Check-Out */}
                <div className="relative border-b md:border-b-0 md:border-r border-gray-200">
                  <button
                    onClick={() => {
                      setShowLocationDropdown(false);
                      setShowCheckInDropdown(false);
                      setShowCheckOutDropdown(!showCheckOutDropdown);
                      setShowGuestsDropdown(false);
                    }}
                    className="w-full h-full text-left px-4 py-3 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                        <CalendarIcon className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500 uppercase tracking-wide">CHECK-OUT</p>
                        <p className="font-semibold text-gray-900 truncate">
                          {checkOut ? format(checkOut, "dd MMM''yy") : "Select Date"}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {checkOut ? format(checkOut, "EEEE") : ""}
                        </p>
                      </div>
                      <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />
                    </div>
                  </button>
                  {showCheckOutDropdown && (
                    <div className="absolute top-full left-0 mt-2">
                      <DatePickerDropdown 
                        title="Select Check-Out Date"
                        onClose={handleCheckOutClose}
                        onDateSelect={handleCheckOutSelect}
                        nextStep={() => setShowGuestsDropdown(true)}
                        selectedDate={checkOut}
                        autoOpen={autoOpenCheckOut}
                      />
                    </div>
                  )}
                </div>

                {/* Guests */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowLocationDropdown(false);
                      setShowCheckInDropdown(false);
                      setShowCheckOutDropdown(false);
                      setShowGuestsDropdown(!showGuestsDropdown);
                    }}
                    className="w-full h-full text-left px-4 py-3 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                        <Users className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500 uppercase tracking-wide">ROOMS & GUESTS</p>
                        <p className="font-semibold text-gray-900 truncate">{guestsDisplay}</p>
                      </div>
                      <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />
                    </div>
                  </button>
                  {showGuestsDropdown && (
                    <div className="absolute top-full left-0 mt-2">
                      <GuestsDropdown 
                        onClose={handleGuestsClose}
                        onSelectGuests={(guestsInfo) => {}}
                        travellers={travellers}
                        onTravellersChange={setTravellers}
                        autoOpen={autoOpenGuests}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Search Button */}
              <div className="border-t md:border-t-0 md:border-l border-gray-200">
                <button
                  onClick={handleSearch}
                  disabled={!isSearchEnabled}
                  className={cn(
                    "w-full h-full py-4 px-6 bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed",
                    isSearchEnabled && "hover:shadow-xl"
                  )}
                >
                  <Search className="w-6 h-6" />
                  <span className="hidden md:inline">Search Hotels</span>
                  <span className="md:hidden">Search</span>
                </button>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Find the best hotels at the best prices
          </p>
        </div>

        {/* Results Section */}
        {showResults && (
          <div id="hotel-results" className="max-w-7xl mx-auto px-4 pb-20">
            {/* Search Summary */}
            {searchData && (
              <div className="bg-white rounded-xl shadow p-4 mb-6">
                <div className="flex items-center gap-4 text-sm flex-wrap">
                  <span className="font-semibold">{searchData.location}</span>
                  <span>|</span>
                  <span>{format(searchData.checkIn, "dd MMM yyyy")}</span>
                  <span>-</span>
                  <span>{searchData.checkOut ? format(searchData.checkOut, "dd MMM yyyy") : "Flexible"}</span>
                  <span>|</span>
                  <span>{guestsDisplay}</span>
                </div>
              </div>
            )}

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Sidebar */}
              <div className="lg:w-1/4">
                <Sidebar />
              </div>

              {/* Hotel Cards */}
              <div className="lg:w-3/4">
                {hotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))}
                
                {/* Similar Hotels */}
                <div className="mt-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">More Hotels in Goa</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {hotels.slice(0, 3).map((hotel, index) => (
                      <div key={index} className="bg-white rounded-lg shadow border p-4 hover:shadow-md transition-shadow">
                        <div className="flex">
                          <div className={`w-20 h-20 bg-gradient-to-br ${hotel.imageColor} rounded mr-3 flex items-center justify-center flex-shrink-0`}>
                            <div className="text-white text-center">
                              <div className="text-2xl">{hotel.image}</div>
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-800 text-sm line-clamp-1">{hotel.name}</h4>
                            <p className="text-gray-600 text-xs mb-1">{hotel.location}</p>
                            <div className="flex items-center mb-2">
                              <div className="flex">
                                {[...Array(hotel.stars)].map((_, i) => (
                                  <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                              <span className="text-gray-600 text-xs ml-1">({hotel.rating})</span>
                            </div>
                            <p className="font-bold text-gray-800 text-sm">₹{hotel.price.toLocaleString()}</p>
                            <button className="text-blue-600 hover:text-orange-600 text-xs font-medium mt-1">
                              View Details →
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default HotelSearch;