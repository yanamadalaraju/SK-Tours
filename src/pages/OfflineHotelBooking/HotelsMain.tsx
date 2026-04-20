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
  ChevronRight,
  Loader,
  Filter,
  DollarSign
} from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BASE_URL } from "@/ApiUrls";

// Types
interface TravellerCount {
  rooms: number;
  adults: number;
  children: number;
  infants?: number;
}

interface Hotel {
  id: number;
  hotel_name: string;
  hotel_location: string;
  location?: string;
  address?: string;
  rating: number | string;
  total_ratings: number;
  star_rating: number;
  price: string | number;
  original_price?: string | number;
  sale_price?: string | number;
  taxes?: string | number;
  total_amount?: string | number;
  price_per_child?: string | number;
  amenities?: string | string[];
  main_image?: string;
  additional_images?: string[];
  overview_description?: string;
  hotel_facilities_description?: string;
  airport_transfers_description?: string;
  meal_plan_description?: string;
  taxes_description?: string;
  free_stay_for_kids?: boolean | number;
  limited_time_sale?: boolean | number;
  login_to_book?: boolean | number;
  pay_later?: boolean | number;
  status?: string;
  city?: string;
  check_in_date?: string;
  check_out_date?: string;
  rooms?: number;
  adults?: number;
  children?: number;
  pets?: boolean | number;
  children_ages?: number[];
}

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

// Helper function to get effective price from hotel data
const getEffectivePrice = (hotel: Hotel): number => {
  // Priority: sale_price > price > 0
  if (hotel.sale_price && Number(hotel.sale_price) > 0) {
    return Number(hotel.sale_price);
  }
  if (hotel.price && Number(hotel.price) > 0) {
    return Number(hotel.price);
  }
  return 0;
};

// Helper function to get effective original price
const getEffectiveOriginalPrice = (hotel: Hotel): number | null => {
  if (hotel.original_price && Number(hotel.original_price) > 0) {
    return Number(hotel.original_price);
  }
  return null;
};

// Helper function to get effective taxes
const getEffectiveTaxes = (hotel: Hotel): number => {
  if (hotel.taxes && Number(hotel.taxes) > 0) {
    return Number(hotel.taxes);
  }
  return 0;
};

// Helper function to get total amount
const getTotalAmount = (hotel: Hotel): number => {
  if (hotel.total_amount && Number(hotel.total_amount) > 0) {
    return Number(hotel.total_amount);
  }
  const effectivePrice = getEffectivePrice(hotel);
  const effectiveTaxes = getEffectiveTaxes(hotel);
  return effectivePrice + effectiveTaxes;
};

// ==================== Location Dropdown Component ====================
const LocationDropdown = ({ 
  isOpen,
  onClose, 
  onSelectCity 
}: { 
  isOpen: boolean;
  onClose: () => void; 
  onSelectCity: (city: string) => void;
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCitySelect = (city: string) => {
    onSelectCity(city);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div ref={dropdownRef} className="bg-white rounded-lg shadow-xl border p-4 w-96 z-[100]">
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
        <div
          className="flex items-center justify-between p-3 hover:bg-gray-50 rounded cursor-pointer"
          onClick={() => handleCitySelect("Goa")}
        >
          <div>
            <p className="font-medium">Goa</p>
            <p className="text-sm text-gray-600">10 Feb - 11 Feb | 2 Guests | 1 Room</p>
          </div>
          <button className="text-blue-600 text-sm">Search</button>
        </div>
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

// ==================== DatePicker Component ====================
const DatePickerDropdown = ({
  title,
  onClose,
  onDateSelect,
  nextStep,
  selectedDate,
  autoOpen,
  availableDates = []
}: {
  title: string;
  onClose: () => void;
  onDateSelect?: (date: Date) => void;
  nextStep?: () => void;
  selectedDate?: Date | null;
  autoOpen?: boolean;
  availableDates?: string[];
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selected, setSelected] = useState<Date | null>(selectedDate || null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const isDateAvailable = (date: Date): boolean => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return availableDates.includes(dateStr);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({ date: prevDate, currentMonth: false });
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({ date: new Date(year, month, i), currentMonth: true });
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ date: new Date(year, month + 1, i), currentMonth: false });
    }

    return days;
  };

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

  const days = getDaysInMonth(currentDate);
  const hasAvailableDates = availableDates.length > 0;

  return (
    <div ref={dropdownRef} className="bg-white rounded-lg shadow-xl border p-6 w-[400px] max-w-[90vw] z-[100]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-800 text-lg">{title}</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded">
          <X size={20} />
        </button>
      </div>

      {hasAvailableDates && (
        <div className="flex items-center gap-4 mb-4 pb-3 border-b">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs text-gray-600">Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-gray-200 border border-gray-300"></div>
            <span className="text-xs text-gray-400">Unavailable</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-orange-600"></div>
            <span className="text-xs text-gray-600">Selected</span>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft size={20} />
        </button>
        <h4 className="font-bold text-gray-800 text-lg">{format(currentDate, 'MMMM yyyy')}</h4>
        <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-6">
        {weekDays.map(day => (
          <div key={day} className="text-center text-xs font-semibold text-gray-500 py-2">
            {day}
          </div>
        ))}
        {days.map((day, index) => {
          const isSelected = selected && day.date.toDateString() === selected.toDateString();
          const isToday = day.date.toDateString() === new Date().toDateString();
          const isPast = day.date < new Date(new Date().setHours(0, 0, 0, 0));
          const isAvailable = isDateAvailable(day.date);
          
          const isDisabled = !day.currentMonth || isPast || (hasAvailableDates && !isAvailable);
          
          return (
            <button
              key={index}
              onClick={() => !isDisabled && handleDateClick(day.date)}
              disabled={isDisabled}
              className={`
                relative h-10 w-10 rounded-full text-sm transition-colors mx-auto
                ${isSelected ? "bg-orange-600 text-white font-bold shadow-md" : ""}
                ${!isSelected && !isDisabled && isAvailable && hasAvailableDates ? "bg-green-100 text-green-800 border border-green-300 hover:bg-green-200" : ""}
                ${!isSelected && !isDisabled && !isAvailable && !hasAvailableDates ? "hover:bg-gray-100" : ""}
                ${isToday && !isSelected && !isDisabled ? "border-2 border-orange-300" : ""}
                ${isDisabled ? "text-gray-300 cursor-not-allowed opacity-50" : "text-gray-700"}
              `}
            >
              {day.date.getDate()}
              {!isSelected && isAvailable && hasAvailableDates && !isDisabled && (
                <span className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-green-600 rounded-full"></span>
              )}
            </button>
          );
        })}
      </div>

      <button 
        onClick={handleApply} 
        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
      >
        Apply
      </button>
    </div>
  );
};

// ==================== Guests Dropdown Component ====================
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
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [rooms, setRooms] = useState(travellers.rooms || 1);
  const [adults, setAdults] = useState(travellers.adults || 2);
  const [children, setChildren] = useState(travellers.children || 0);
  const [childrenAges, setChildrenAges] = useState<number[]>([5, 8].slice(0, children));
  const [withPets, setWithPets] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    onTravellersChange({
      rooms,
      adults,
      children,
      infants: 0
    });
  }, [rooms, adults, children, onTravellersChange]);

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
    <div ref={dropdownRef} className="bg-white rounded-lg shadow-xl border p-6 w-80 z-[100]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-800">Rooms & Guests</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium text-gray-800">Rooms</span>
          <div className="flex items-center space-x-3">
            <button onClick={() => setRooms(Math.max(1, rooms - 1))} className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100">
              <Minus size={16} />
            </button>
            <span className="w-8 text-center font-bold">{rooms}</span>
            <button onClick={() => setRooms(rooms + 1)} className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100">
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium text-gray-800">Adults</span>
          <div className="flex items-center space-x-3">
            <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100">
              <Minus size={16} />
            </button>
            <span className="w-8 text-center font-bold">{adults}</span>
            <button onClick={() => setAdults(adults + 1)} className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100">
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="font-medium text-gray-800">Children</span>
            <p className="text-xs text-gray-600">0 - 17 Years Old</p>
          </div>
          <div className="flex items-center space-x-3">
            <button onClick={() => {
              const newCount = Math.max(0, children - 1);
              setChildren(newCount);
              setChildrenAges(childrenAges.slice(0, newCount));
            }} className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100">
              <Minus size={16} />
            </button>
            <span className="w-8 text-center font-bold">{children}</span>
            <button onClick={() => {
              setChildren(children + 1);
              setChildrenAges([...childrenAges, 5]);
            }} className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100">
              <Plus size={16} />
            </button>
          </div>
        </div>

        {children > 0 && (
          <div className="pl-4">
            <p className="text-xs text-gray-600 mb-3">Please provide right number of children along with their right age for best options and prices.</p>
            <div className="grid grid-cols-2 gap-3">
              {childrenAges.map((age, index) => (
                <div key={index} className="mb-2">
                  <label className="text-sm text-gray-700 mb-1 block">Child {index + 1} Age</label>
                  <select value={age} onChange={(e) => updateChildrenAge(index, parseInt(e.target.value))} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500/30">
                    {Array.from({ length: 18 }, (_, i) => (<option key={i} value={i}>{i} years</option>))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mb-6">
        <div className="flex items-start">
          <input type="checkbox" id="pets" checked={withPets} onChange={(e) => setWithPets(e.target.checked)} className="mt-1 mr-3 accent-orange-600" />
          <div>
            <label htmlFor="pets" className="font-medium text-gray-800 block">Are you travelling with pets?</label>
            <p className="text-xs text-gray-600 mt-1">Selecting this option will show only pet-friendly properties.</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={handleApply} className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">Apply</button>
      </div>
    </div>
  );
};

// ==================== Filter Sidebar Component ====================
const FilterSidebar = ({ 
  hotels, 
  onFilterChange,
  selectedFilters,
  onClearFilters
}: { 
  hotels: Hotel[];
  onFilterChange: (filters: any) => void;
  selectedFilters: any;
  onClearFilters: () => void;
}) => {
  const getPriceRangeCount = (min: number, max: number | null) => {
    return hotels.filter(hotel => {
      const price = getEffectivePrice(hotel);
      if (max === null) return price >= min;
      return price >= min && price <= max;
    }).length;
  };

  const getStarCount = (stars: number) => {
    return hotels.filter(hotel => hotel.star_rating === stars).length;
  };
  
  const getAmenityCount = (amenity: string) => {
    return hotels.filter(hotel => {
      if (!hotel.amenities) return false;
      
      if (Array.isArray(hotel.amenities)) {
        return hotel.amenities.some(a => 
          a.toLowerCase().includes(amenity.toLowerCase())
        );
      }
      
      if (typeof hotel.amenities === 'string') {
        return hotel.amenities.toLowerCase().includes(amenity.toLowerCase());
      }
      
      return false;
    }).length;
  };

  const priceRanges = [
    { label: 'Under ₹2,500', min: 0, max: 2500 },
    { label: '₹2,500 - ₹4,500', min: 2500, max: 4500 },
    { label: '₹4,500 - ₹7,500', min: 4500, max: 7500 },
    { label: '₹7,500 - ₹10,000', min: 7500, max: 10000 },
    { label: '₹10,000 - ₹15,000', min: 10000, max: 15000 },
    { label: '₹15,000 - ₹30,000', min: 15000, max: 30000 },
    { label: '₹30,000+', min: 30000, max: null }
  ];

  const starCategories = [3, 4, 5];
  
  const amenitiesList = [
    'Free Cancellation', 'Breakfast Included', 'Swimming Pool', 
    'Spa', 'Wi-Fi', 'Pet Friendly', 'Parking', 'Airport Shuttle', 
    'Restaurant', 'Fitness Center', 'Room Service', 'Bar'
  ];

  const activeFiltersCount = () => {
    let count = 0;
    if (selectedFilters.priceRanges?.length) count += selectedFilters.priceRanges.length;
    if (selectedFilters.stars?.length) count += selectedFilters.stars.length;
    if (selectedFilters.amenities?.length) count += selectedFilters.amenities.length;
    if (selectedFilters.minRating && selectedFilters.minRating > 0) count++;
    if (selectedFilters.customBudget?.min || selectedFilters.customBudget?.max) count++;
    return count;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
      <div className="flex justify-between items-center mb-6 pb-4 border-b">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Filter className="w-5 h-5 text-orange-600" />
            Filters
          </h2>
          <p className="text-sm text-gray-500 mt-1">Refine your hotel search</p>
        </div>
        {activeFiltersCount() > 0 && (
          <button onClick={onClearFilters} className="text-sm text-orange-600 hover:text-orange-700 font-medium">
            Clear all ({activeFiltersCount()})
          </button>
        )}
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Search for locality / hotel name</h3>
        <div className="relative">
          <input type="text" placeholder="Enter locality or hotel" className="w-full p-3 pl-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition-all" />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-gray-500" />
          Price Per Night
        </h3>
        <div className="space-y-2.5">
          {priceRanges.map((range, index) => {
            const count = getPriceRangeCount(range.min, range.max);
            const rangeKey = `${range.min}-${range.max || 'inf'}`;
            const isSelected = selectedFilters.priceRanges?.includes(rangeKey);
            return (
              <label key={index} className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    checked={isSelected || false} 
                    onChange={() => {
                      const currentRanges = selectedFilters.priceRanges || [];
                      const newRanges = currentRanges.includes(rangeKey)
                        ? currentRanges.filter((r: string) => r !== rangeKey)
                        : [...currentRanges, rangeKey];
                      onFilterChange({ ...selectedFilters, priceRanges: newRanges });
                    }} 
                    className="w-4 h-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500 cursor-pointer" 
                  />
                  <span className="text-gray-700 group-hover:text-orange-600 transition-colors text-sm">{range.label}</span>
                </div>
                <span className="text-xs text-gray-400">({count})</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="mb-6 p-4 bg-gray-50 rounded-xl">
        <h3 className="font-semibold text-gray-800 mb-3">Custom Budget</h3>
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="text-xs text-gray-500 block mb-1">Min (₹)</label>
            <input 
              type="number" 
              placeholder="Min" 
              value={selectedFilters.customBudget?.min || ''} 
              onChange={(e) => onFilterChange({ 
                ...selectedFilters, 
                customBudget: { ...selectedFilters.customBudget, min: e.target.value } 
              })} 
              className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/30 text-sm" 
            />
          </div>
          <div className="flex-1">
            <label className="text-xs text-gray-500 block mb-1">Max (₹)</label>
            <input 
              type="number" 
              placeholder="Max" 
              value={selectedFilters.customBudget?.max || ''} 
              onChange={(e) => onFilterChange({ 
                ...selectedFilters, 
                customBudget: { ...selectedFilters.customBudget, max: e.target.value } 
              })} 
              className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/30 text-sm" 
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <Star className="w-4 h-4 text-gray-500" />
          Star Category
        </h3>
        <div className="space-y-2.5">
          {starCategories.map(stars => {
            const count = getStarCount(stars);
            const isSelected = selectedFilters.stars?.includes(stars);
            return (
              <label key={stars} className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    checked={isSelected || false} 
                    onChange={() => {
                      const currentStars = selectedFilters.stars || [];
                      const newStars = currentStars.includes(stars)
                        ? currentStars.filter((s: number) => s !== stars)
                        : [...currentStars, stars];
                      onFilterChange({ ...selectedFilters, stars: newStars });
                    }} 
                    className="w-4 h-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500 cursor-pointer" 
                  />
                  <div className="flex items-center gap-1">
                    {[...Array(stars)].map((_, i) => (<Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />))}
                    <span className="text-gray-700 text-sm ml-1">{stars} Star</span>
                  </div>
                </div>
                <span className="text-xs text-gray-400">({count})</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Guest Rating</h3>
        <div className="space-y-2.5">
          {[4.5, 4.0, 3.5, 3.0].map(rating => (
            <label key={rating} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="radio" 
                name="rating" 
                checked={selectedFilters.minRating === rating} 
                onChange={() => onFilterChange({ ...selectedFilters, minRating: rating })} 
                className="w-4 h-4 text-orange-600 focus:ring-orange-500 cursor-pointer" 
              />
              <span className="text-gray-700 group-hover:text-orange-600 transition-colors text-sm">{rating}+ Stars</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Amenities</h3>
        <div className="grid grid-cols-2 gap-2.5">
          {amenitiesList.map(amenity => {
            const count = getAmenityCount(amenity);
            const isSelected = selectedFilters.amenities?.includes(amenity);
            return (
              <label key={amenity} className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={isSelected || false} 
                  onChange={() => {
                    const currentAmenities = selectedFilters.amenities || [];
                    const newAmenities = currentAmenities.includes(amenity)
                      ? currentAmenities.filter((a: string) => a !== amenity)
                      : [...currentAmenities, amenity];
                    onFilterChange({ ...selectedFilters, amenities: newAmenities });
                  }} 
                  className="w-3.5 h-3.5 rounded border-gray-300 text-orange-600 focus:ring-orange-500 cursor-pointer" 
                />
                <span className="text-xs text-gray-700 group-hover:text-orange-600 transition-colors">{amenity}</span>
                <span className="text-xs text-gray-400">({count})</span>
              </label>
            );
          })}
        </div>
      </div>

      {activeFiltersCount() > 0 && (
        <div className="pt-4 border-t">
          <p className="text-xs text-gray-500 mb-2">Active filters:</p>
          <div className="flex flex-wrap gap-2">
            {selectedFilters.priceRanges?.slice(0, 3).map((range: string) => (<span key={range} className="text-xs bg-orange-50 text-orange-600 px-2 py-1 rounded-full">{range.replace('-inf', '+').replace('-', ' - ')}</span>))}
            {selectedFilters.stars?.map((stars: number) => (<span key={stars} className="text-xs bg-orange-50 text-orange-600 px-2 py-1 rounded-full">{stars} Star</span>))}
            {selectedFilters.amenities?.slice(0, 2).map((amenity: string) => (<span key={amenity} className="text-xs bg-orange-50 text-orange-600 px-2 py-1 rounded-full">{amenity}</span>))}
            {selectedFilters.minRating > 0 && (<span className="text-xs bg-orange-50 text-orange-600 px-2 py-1 rounded-full">{selectedFilters.minRating}+ Rating</span>)}
            {activeFiltersCount() > 5 && (<span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">+{activeFiltersCount() - 5} more</span>)}
          </div>
        </div>
      )}
    </div>
  );
};

// ==================== Hotel Card Component ====================
const HotelCard = ({ hotel, onBookNow, checkIn, checkOut, travellers }: { 
  hotel: Hotel; 
  onBookNow: (hotel: Hotel) => void;
  checkIn?: Date;
  checkOut?: Date;
  travellers?: TravellerCount;
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  const formatPrice = (price: string | number | undefined) => {
    if (!price) return '0';
    return Number(price).toLocaleString('en-IN');
  };

  const getImageUrl = (imagePath: string | undefined) => {
    if (!imagePath || imageError) return null;
    if (imagePath.startsWith('http')) return imagePath;
    const baseUrl = BASE_URL.replace('/api', '');
    return `${baseUrl}${imagePath}`;
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'facilities', label: 'Hotel Facilities' },
    { id: 'transfer', label: 'Airport Transfers' },
    { id: 'meal', label: 'Meal Plan' },
    { id: 'taxes', label: 'Taxes' }
  ];

  const tabContent: Record<string, React.ReactNode> = {
    overview: (
      <div className="p-4">
        <h4 className="font-semibold mb-2">Hotel Overview</h4>
        <table className="w-full text-sm">
          <tbody>
            <tr className="border-b"><td className="py-2 font-medium">Property Name</td><td className="py-2">{hotel.hotel_name}</td></tr>
            <tr className="border-b"><td className="py-2 font-medium">Location</td><td className="py-2">{hotel.hotel_location}</td></tr>
            <tr className="border-b"><td className="py-2 font-medium">Check-in Time</td><td className="py-2">2:00 PM</td></tr>
            <tr className="border-b"><td className="py-2 font-medium">Check-out Time</td><td className="py-2">12:00 PM</td></tr>
            <tr className="border-b"><td className="py-2 font-medium">Star Rating</td><td className="py-2"><div className="flex">{[...Array(5)].map((_, i) => (<Star key={i} className={`w-4 h-4 ${i < hotel.star_rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />))}</div></td></tr>
          </tbody>
        </table>
        {hotel.overview_description && (<div className="mt-4 text-sm text-gray-700">{hotel.overview_description}</div>)}
      </div>
    ),
    facilities: (
      <div className="p-4">
        <h4 className="font-semibold mb-3">Hotel Facilities</h4>
        {hotel.hotel_facilities_description ? (
          <div className="text-sm text-gray-700">{hotel.hotel_facilities_description}</div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {[{ icon: '🏊', title: 'Swimming Pool' }, { icon: '💆', title: 'Spa' }, { icon: '💪', title: 'Fitness Center' }, { icon: '🍽️', title: 'Restaurant' }, { icon: '📶', title: 'Free Wi-Fi' }, { icon: '🅿️', title: 'Parking' }].map((facility, idx) => (
              <div key={idx} className="flex items-center gap-2"><span className="text-lg">{facility.icon}</span><span className="text-sm">{facility.title}</span></div>
            ))}
          </div>
        )}
      </div>
    ),
    transfer: (
      <div className="p-4">
        <h4 className="font-semibold mb-3">Airport Transfer Details</h4>
        {hotel.airport_transfers_description ? (
          <div className="text-sm text-gray-700">{hotel.airport_transfers_description}</div>
        ) : (
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b"><td className="py-2 font-medium">Nearest Airport</td><td className="py-2">Goa International Airport (GOI)</td></tr>
              <tr className="border-b"><td className="py-2 font-medium">Distance</td><td className="py-2">36 km</td></tr>
              <tr className="border-b"><td className="py-2 font-medium">Transfer Service</td><td className="py-2 text-green-600">✓ Available on request</td></tr>
              <tr className="border-b"><td className="py-2 font-medium">Transfer Cost</td><td className="py-2">₹2,500 - ₹3,500 per vehicle</td></tr>
            </tbody>
          </table>
        )}
      </div>
    ),
    meal: (
      <div className="p-4">
        <h4 className="font-semibold mb-3">Meal Plans</h4>
        {hotel.meal_plan_description ? (
          <div className="text-sm text-gray-700">{hotel.meal_plan_description}</div>
        ) : (
          <div className="space-y-2">
            {[{ plan: 'Room only (EP)', price: 'Included' }, { plan: 'Breakfast (CP)', price: '+₹800' }, { plan: 'Breakfast + Dinner (MAP)', price: '+₹1,500' }, { plan: 'All meals (AP)', price: '+₹2,200' }].map((meal, idx) => (
              <div key={idx} className="flex justify-between text-sm border-b pb-2"><span>{meal.plan}</span><span className="font-medium">{meal.price}</span></div>
            ))}
          </div>
        )}
      </div>
    ),
    taxes: (
      <div className="p-4">
        <h4 className="font-semibold mb-3">Taxes and Fees</h4>
        {hotel.taxes_description ? (
          <div className="text-sm text-gray-700">{hotel.taxes_description}</div>
        ) : (
          <div className="space-y-2">
            {[
              { label: 'Base Price', amount: `₹${formatPrice(getEffectivePrice(hotel))}` },
              // { label: 'Taxes & Fees', amount: hotel.taxes ? `₹${formatPrice(hotel.taxes)}` : '₹315' }
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between text-sm border-b pb-2"><span>{item.label}</span><span className="font-medium">{item.amount}</span></div>
            ))}
            <div className="flex justify-between text-sm font-bold pt-2">
              <span>Total Amount</span>
              <span className="text-lg text-orange-600">
                ₹{formatPrice(getTotalAmount(hotel))}
              </span>
            </div>
          </div>
        )}
      </div>
    )
  };

  const mainImageUrl = getImageUrl(hotel.main_image);

  const handleViewDetails = () => {
    navigate(`/hotel-detail/${hotel.id}`);
  };

  // Get effective prices
  const displayPrice = getEffectivePrice(hotel);
  const originalPrice = getEffectiveOriginalPrice(hotel);
  const totalAmount = getTotalAmount(hotel);
  const hasDiscount = originalPrice && originalPrice > displayPrice;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 mb-6 overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-64 lg:flex-shrink-0">
          <div className="h-48 lg:h-56 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center relative overflow-hidden">
            {mainImageUrl ? (
              <img 
                src={mainImageUrl} 
                alt={hotel.hotel_name} 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                onError={() => setImageError(true)} 
              />
            ) : (
              <div className="text-white text-center">
                <Hotel className="w-12 h-12 mx-auto mb-2" />
                <p className="font-bold text-lg">{hotel.hotel_name?.split(' ').slice(0, 2).join(' ')}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 p-5 min-w-0">
          <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-bold text-gray-800 hover:text-orange-600 transition-colors truncate">{hotel.hotel_name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (<Star key={i} className={`w-4 h-4 ${i < (hotel.star_rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`} />))}
                </div>
                <span className="text-sm text-gray-500">| {hotel.star_rating} Star Hotel</span>
              </div>
              <div className="flex items-center text-gray-500 mt-1">
                <MapPin size={14} className="mr-1 shrink-0" />
                <span className="text-sm truncate">{hotel.hotel_location}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white px-3 py-1.5 rounded-xl text-center shadow-md">
                <span className="font-bold text-lg">{Number(hotel.rating || 4.5).toFixed(1)}</span>
                <span className="text-xs">/5</span>
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-800">Very Good</p>
                <p className="text-xs text-gray-500">{hotel.total_ratings?.toLocaleString() || 0} Ratings</p>
              </div>
            </div>
          </div>
          
          {hotel.amenities && (
            <div className="mb-4">
              <ul className="space-y-2">
                {(Array.isArray(hotel.amenities) 
                  ? hotel.amenities 
                  : typeof hotel.amenities === 'string' 
                    ? hotel.amenities.split(',') 
                    : []
                ).slice(0, 2).map((feature, idx) => (
                  <li key={idx} className="flex items-start text-gray-700">
                    <Check size={18} className="mr-2 flex-shrink-0 mt-0.5 text-green-500" />
                    <span className="text-sm">{typeof feature === 'string' ? feature.trim() : String(feature)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="border-b border-gray-200 mb-4">
            <div className="flex flex-wrap gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(activeTab === tab.id ? null : tab.id)}
                  className={`px-3 py-2 text-xs font-medium transition-all whitespace-nowrap rounded-t-lg ${
                    activeTab === tab.id ? "bg-orange-50 text-orange-600 border-b-2 border-orange-600" : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {activeTab && (
            <div className="mb-4 bg-gray-50 rounded-lg overflow-hidden">
              {tabContent[activeTab]}
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mt-4 pt-4 border-t border-gray-100">
            <div className="mb-4 sm:mb-0">
              <div>
                {hasDiscount && (
                  <div className="mb-1">
                    <span className="text-gray-400 line-through text-sm">₹{formatPrice(originalPrice)}</span>
                    <span className="ml-2 bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                      Save ₹{formatPrice(originalPrice - displayPrice)}
                    </span>
                  </div>
                )}
                <div className="flex items-baseline flex-wrap gap-2">
                  <span className="text-2xl font-bold text-gray-800">₹{formatPrice(totalAmount)}</span>
                  {hotel.taxes && Number(hotel.taxes) > 0 && (
                    <span className="text-gray-500 text-sm">incl. taxes</span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">Total price for stay</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                onClick={handleViewDetails}
                className="bg-white border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-bold py-2.5 px-6 rounded-xl transition-all shadow-sm hover:shadow-md w-full sm:w-auto"
              >
                View Details
              </button>

              <button
                onClick={() => onBookNow(hotel)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg w-full sm:w-auto"
              >
                BOOK NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== Main Hotel Search Component ====================
const HotelSearchMain = () => {
  const navigate = useNavigate();
  const [showResults, setShowResults] = useState(false);
  const [searchData, setSearchData] = useState<any>(null);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [availableCheckInDates, setAvailableCheckInDates] = useState<string[]>([]);
  const [availableCheckOutDates, setAvailableCheckOutDates] = useState<string[]>([]);
  
  const [filters, setFilters] = useState({
    priceRanges: [] as string[],
    stars: [] as number[],
    amenities: [] as string[],
    minRating: 0,
    customBudget: { min: '', max: '' }
  });

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

  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showCheckInDropdown, setShowCheckInDropdown] = useState(false);
  const [showCheckOutDropdown, setShowCheckOutDropdown] = useState(false);
  const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);

  const [autoOpenCheckIn, setAutoOpenCheckIn] = useState(false);
  const [autoOpenCheckOut, setAutoOpenCheckOut] = useState(false);
  const [autoOpenGuests, setAutoOpenGuests] = useState(false);

  useEffect(() => {
    fetchHotelsAndDates();
  }, []);

  const fetchHotelsAndDates = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${BASE_URL}/api/offline-hotels`);
      if (response.data.success) {
        const hotelsData = response.data.data;
        setHotels(hotelsData);
        setFilteredHotels(hotelsData);
        
        const checkInDates: string[] = [...new Set(
          hotelsData
            .filter((hotel: Hotel) => hotel.check_in_date)
            .map((hotel: Hotel) => hotel.check_in_date as string)
        )];
        
        const checkOutDates: string[] = [...new Set(
          hotelsData
            .filter((hotel: Hotel) => hotel.check_out_date)
            .map((hotel: Hotel) => hotel.check_out_date as string)
        )];
        
        setAvailableCheckInDates(checkInDates);
        setAvailableCheckOutDates(checkOutDates);
      } else {
        setError('Failed to fetch hotels');
      }
    } catch (err) {
      console.error('Error fetching hotels:', err);
      setError('Error fetching hotels. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (hotelList: Hotel[], currentFilters: typeof filters, searchLocation: string, searchCheckIn: Date | undefined, searchCheckOut: Date | undefined, searchTravellers: TravellerCount) => {
    let filtered = [...hotelList];

    if (currentFilters.priceRanges.length > 0) {
      filtered = filtered.filter(hotel => {
        const price = getEffectivePrice(hotel);
        return currentFilters.priceRanges.some(rangeKey => {
          const [min, max] = rangeKey.split('-').map(v => v === 'inf' ? Infinity : Number(v));
          return price >= min && price <= max;
        });
      });
    }

    if (currentFilters.customBudget.min) {
      filtered = filtered.filter(hotel => getEffectivePrice(hotel) >= Number(currentFilters.customBudget.min));
    }
    if (currentFilters.customBudget.max) {
      filtered = filtered.filter(hotel => getEffectivePrice(hotel) <= Number(currentFilters.customBudget.max));
    }

    if (currentFilters.stars.length > 0) {
      filtered = filtered.filter(hotel => currentFilters.stars.includes(hotel.star_rating));
    }

    if (currentFilters.minRating > 0) {
      filtered = filtered.filter(hotel => Number(hotel.rating) >= currentFilters.minRating);
    }

    if (currentFilters.amenities.length > 0) {
      filtered = filtered.filter(hotel => {
        if (!hotel.amenities) return false;
        
        const amenitiesIncludes = (amenity: string): boolean => {
          const searchTerm = amenity.toLowerCase();
          
          if (Array.isArray(hotel.amenities)) {
            return hotel.amenities.some(a => 
              String(a).toLowerCase().includes(searchTerm)
            );
          }
          
          if (typeof hotel.amenities === 'string') {
            return hotel.amenities.toLowerCase().includes(searchTerm);
          }
          
          return false;
        };
        
        return currentFilters.amenities.every(amenitiesIncludes);
      });
    }

    filtered = filtered.filter(hotel => {
      const searchLocationLower = searchLocation.toLowerCase();
      const hotelCity = (hotel.city || '').toLowerCase();
      const hotelLocation = (hotel.hotel_location || '').toLowerCase();
      return hotelCity.includes(searchLocationLower) || hotelLocation.includes(searchLocationLower);
    });

    filtered = filtered.filter(hotel => {
      let dateMatch = true;
      if (searchCheckIn && hotel.check_in_date) {
        const hotelCheckIn = new Date(hotel.check_in_date);
        const searchCheckInDate = new Date(searchCheckIn);
        hotelCheckIn.setHours(0, 0, 0, 0);
        searchCheckInDate.setHours(0, 0, 0, 0);
        dateMatch = hotelCheckIn.getTime() === searchCheckInDate.getTime();
      }
      if (dateMatch && searchCheckOut && hotel.check_out_date) {
        const hotelCheckOut = new Date(hotel.check_out_date);
        const searchCheckOutDate = new Date(searchCheckOut);
        hotelCheckOut.setHours(0, 0, 0, 0);
        searchCheckOutDate.setHours(0, 0, 0, 0);
        dateMatch = hotelCheckOut.getTime() === searchCheckOutDate.getTime();
      }
      return dateMatch;
    });

    filtered = filtered.filter(hotel => {
      let guestMatch = true;
      if (searchTravellers) {
        if (hotel.rooms && hotel.rooms < searchTravellers.rooms) guestMatch = false;
        if (hotel.adults && hotel.adults < searchTravellers.adults) guestMatch = false;
        if (hotel.children !== undefined && hotel.children < searchTravellers.children) guestMatch = false;
      }
      return guestMatch;
    });

    return filtered;
  };

  useEffect(() => {
    if (hotels.length > 0) {
      const filtered = applyFilters(hotels, filters, location, checkIn, checkOut, travellers);
      setFilteredHotels(filtered);
    }
  }, [hotels, filters, location, checkIn, checkOut, travellers]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      priceRanges: [],
      stars: [],
      amenities: [],
      minRating: 0,
      customBudget: { min: '', max: '' }
    });
  };

  const handleLocationSelect = (city: string) => { 
    setLocation(city); 
    setShowLocationDropdown(false);
    setAutoOpenCheckIn(true); 
  };
  
  const handleCheckInSelect = (date: Date) => { 
    setCheckIn(date); 
    setShowCheckInDropdown(false);
    setAutoOpenCheckOut(true); 
  };
  
  const handleCheckOutSelect = (date: Date) => { 
    setCheckOut(date); 
    setShowCheckOutDropdown(false);
    setAutoOpenGuests(true); 
  };
  
  const handleLocationClose = () => { setShowLocationDropdown(false); };
  const handleCheckInClose = () => { setShowCheckInDropdown(false); setAutoOpenCheckIn(false); };
  const handleCheckOutClose = () => { setShowCheckOutDropdown(false); setAutoOpenCheckOut(false); };
  const handleGuestsClose = () => { setShowGuestsDropdown(false); setAutoOpenGuests(false); };

  const handleSearch = () => {
    if (!location || !checkIn) return;
    const filtered = applyFilters(hotels, filters, location, checkIn, checkOut, travellers);
    setFilteredHotels(filtered);
    const newSearchData = { 
      location, 
      checkIn, 
      checkOut, 
      travellers, 
      totalHotels: filtered.length 
    };
    setSearchData(newSearchData);
    setShowResults(true);
    setTimeout(() => {
      const resultsElement = document.getElementById('hotel-results');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleBookNow = (hotel: Hotel) => {
    const nights = checkOut && checkIn ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)) : 1;
    
    // Use effective total amount
    const totalAmount = getTotalAmount(hotel);
    
    const hotelForCheckout = {
      ...hotel,
      checkIn: checkIn,
      checkOut: checkOut,
      rooms: travellers.rooms,
      adults: travellers.adults,
      children: travellers.children,
      nights: nights,
      total_price_value: Number(totalAmount),
      selectedRoomType: null // No room type selected from search page
    };
    localStorage.setItem('selectedHotel', JSON.stringify(hotelForCheckout));
    navigate('/checkout-hotels', { state: { hotel: hotelForCheckout } });
  };

  const guestsDisplay = `${travellers.rooms} Room${travellers.rooms > 1 ? 's' : ''}, ${travellers.adults} Adult${travellers.adults > 1 ? 's' : ''}${travellers.children > 0 ? `, ${travellers.children} Child${travellers.children > 1 ? 'ren' : ''}` : ''}`;
  const isSearchEnabled = !!location && !!checkIn;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50/70 to-white">
      <Header />

      <div className="flex-grow">
        <div className="pt-28 pb-28 relative bg-gradient-to-r from-blue-200/90 to-blue-300/90" style={{ 
          backgroundImage: `linear-gradient(to right, rgba(74, 94, 149, 0.45), rgba(30, 64, 175, 0.49)), url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          backgroundBlendMode: 'overlay' 
        }}>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-800/80"></div>
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <Hotel className="w-8 h-8 text-white" />
              <h1 className="text-2xl font-bold text-white">Hotel Booking</h1>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-10 mb-8">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200">
            <div className="flex flex-col md:flex-row">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-4">
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
                        isOpen={showLocationDropdown}
                        onClose={handleLocationClose} 
                        onSelectCity={handleLocationSelect} 
                      />
                    </div>
                  )}
                </div>

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
                        <p className="font-semibold text-gray-900 truncate">{checkIn ? format(checkIn, "dd MMM''yy") : "Select Date"}</p>
                        <p className="text-xs text-gray-500 truncate">{checkIn ? format(checkIn, "EEEE") : ""}</p>
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
                        availableDates={availableCheckInDates}
                      />
                    </div>
                  )}
                </div>

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
                        <p className="font-semibold text-gray-900 truncate">{checkOut ? format(checkOut, "dd MMM''yy") : "Select Date"}</p>
                        <p className="text-xs text-gray-500 truncate">{checkOut ? format(checkOut, "EEEE") : ""}</p>
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
                        availableDates={availableCheckOutDates}
                      />
                    </div>
                  )}
                </div>

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

              <div className="border-t md:border-t-0 md:border-l border-gray-200">
                <button
                  onClick={handleSearch}
                  disabled={!isSearchEnabled || loading}
                  className={`w-full h-full py-4 px-6 bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed ${isSearchEnabled && !loading && "hover:shadow-xl"}`}
                >
                  {loading ? (
                    <>
                      <Loader className="w-6 h-6 animate-spin" />
                      <span>Loading...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-6 h-6" />
                      <span className="hidden md:inline">Search Hotels</span>
                      <span className="md:hidden">Search</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-6">Find the best hotels at the best prices</p>
        </div>

        {showResults && (
          <div id="hotel-results" className="max-w-7xl mx-auto px-4 pb-20">
            {searchData && (
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg mb-6 p-5 text-white">
                <div className="flex flex-wrap justify-between items-center gap-4">
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                      <MapPin size={18} />
                      <span className="font-semibold">{searchData.location}</span>
                    </div>
                    <div className="w-4 h-px bg-white/30"></div>
                    <div className="flex items-center gap-2">
                      <CalendarIcon size={18} />
                      <span>{format(searchData.checkIn, "dd MMM yyyy")}</span>
                      <span>-</span>
                      <span>{searchData.checkOut ? format(searchData.checkOut, "dd MMM yyyy") : "Flexible"}</span>
                    </div>
                    <div className="w-4 h-px bg-white/30"></div>
                    <div className="flex items-center gap-2">
                      <Users size={18} />
                      <span>{guestsDisplay}</span>
                    </div>
                  </div>
                  <div className="bg-white/20 rounded-lg px-4 py-2">
                    <span className="font-semibold">{filteredHotels.length}</span> Hotels Found
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 flex items-center gap-2">
                <X size={20} />
                <span>{error}</span>
              </div>
            )}

            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-1/3 xl:w-1/4">
                <FilterSidebar
                  hotels={hotels}
                  onFilterChange={handleFilterChange}
                  selectedFilters={filters}
                  onClearFilters={handleClearFilters}
                />
              </div>

              <div className="lg:w-2/3 xl:w-3/4">
                {loading ? (
                  <div className="text-center py-12 bg-white rounded-xl shadow-lg">
                    <Loader className="w-12 h-12 animate-spin text-orange-600 mx-auto mb-4" />
                    <p className="text-gray-600">Loading hotels...</p>
                  </div>
                ) : filteredHotels.length > 0 ? (
                  <>
                    <div className="mb-4 flex justify-between items-center">
                      <p className="text-gray-600">Showing <span className="font-semibold">{filteredHotels.length}</span> hotels</p>
                      <select className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500">
                        <option>Recommended</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Rating: High to Low</option>
                      </select>
                    </div>
                    {filteredHotels.map((hotel) => (
                      <HotelCard 
                        key={hotel.id} 
                        hotel={hotel} 
                        onBookNow={handleBookNow}
                        checkIn={checkIn}
                        checkOut={checkOut}
                        travellers={travellers}
                      />
                    ))}
                  </>
                ) : (
                  <div className="text-center py-12 bg-white rounded-xl shadow-lg">
                    <Hotel className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">No Hotels Found</h3>
                    <p className="text-gray-600 mb-4">No hotels match your search criteria. Try adjusting your filters or selecting different dates.</p>
                    <button onClick={handleClearFilters} className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                      Clear All Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default HotelSearchMain;