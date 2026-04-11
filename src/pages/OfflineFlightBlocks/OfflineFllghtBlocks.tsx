import { useState, useEffect, useRef } from "react";
import { 
  Plane, 
  Search, 
  ArrowRightLeft, 
  Calendar as CalendarIcon, 
  Users, 
  ChevronDown, 
  Minus, 
  Plus,
  MapPin,
  Loader2
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Header from '@/components/Header';
import Footer from "@/components/Footer";
import { useNavigate } from 'react-router-dom';

// API Base URL
const API_BASE_URL = "http://localhost:5000/api";

// Indian airports data (from admin panel)
const indianAirports = [
  { city: "Agartala", airport: "Maharaja Bir Bikram Airport", code: "IXA" },
  { city: "Agra", airport: "Agra Airport", code: "AGR" },
  { city: "Ahmedabad", airport: "Sardar Vallabhbhai Patel International Airport", code: "AMD" },
  { city: "Amritsar", airport: "Sri Guru Ram Dass Jee International Airport", code: "ATQ" },
  { city: "Aurangabad", airport: "Aurangabad Airport", code: "IXU" },
  { city: "Bengaluru", airport: "Kempegowda International Airport", code: "BLR" },
  { city: "Bhopal", airport: "Raja Bhoj Airport", code: "BHO" },
  { city: "Bhubaneswar", airport: "Biju Patnaik International Airport", code: "BBI" },
  { city: "Chandigarh", airport: "Chandigarh International Airport", code: "IXC" },
  { city: "Chennai", airport: "Chennai International Airport", code: "MAA" },
  { city: "Coimbatore", airport: "Coimbatore International Airport", code: "CJB" },
  { city: "Dehradun", airport: "Jolly Grant Airport", code: "DED" },
  { city: "Delhi", airport: "Indira Gandhi International Airport", code: "DEL" },
  { city: "Delhi", airport: "Hindon Airport", code: "HDO" },
  { city: "Goa", airport: "Dabolim Airport", code: "GOI" },
  { city: "Goa", airport: "Mopa International Airport", code: "GOX" },
  { city: "Guwahati", airport: "Lokpriya Gopinath Bordoloi International Airport", code: "GAU" },
  { city: "Gwalior", airport: "Gwalior Airport", code: "GWL" },
  { city: "Hyderabad", airport: "Rajiv Gandhi International Airport", code: "HYD" },
  { city: "Imphal", airport: "Imphal International Airport", code: "IMF" },
  { city: "Indore", airport: "Devi Ahilya Bai Holkar Airport", code: "IDR" },
  { city: "Jaipur", airport: "Jaipur International Airport", code: "JAI" },
  { city: "Jammu", airport: "Jammu Airport", code: "IXJ" },
  { city: "Jodhpur", airport: "Jodhpur Airport", code: "JDH" },
  { city: "Kannur", airport: "Kannur International Airport", code: "CNN" },
  { city: "Kanpur", airport: "Kanpur Airport", code: "KNU" },
  { city: "Kochi", airport: "Cochin International Airport", code: "COK" },
  { city: "Kolkata", airport: "Netaji Subhas Chandra Bose International Airport", code: "CCU" },
  { city: "Kozhikode", airport: "Calicut International Airport", code: "CCJ" },
  { city: "Lucknow", airport: "Chaudhary Charan Singh International Airport", code: "LKO" },
  { city: "Madurai", airport: "Madurai International Airport", code: "IXM" },
  { city: "Mangaluru", airport: "Mangaluru International Airport", code: "IXE" },
  { city: "Mumbai", airport: "Chhatrapati Shivaji Maharaj International Airport", code: "BOM" },
  { city: "Nagpur", airport: "Dr. Babasaheb Ambedkar International Airport", code: "NAG" },
  { city: "Nashik", airport: "Nashik Airport", code: "ISK" },
  { city: "Patna", airport: "Jay Prakash Narayan International Airport", code: "PAT" },
  { city: "Prayagraj", airport: "Prayagraj Airport", code: "IXD" },
  { city: "Pune", airport: "Pune International Airport", code: "PNQ" },
  { city: "Raipur", airport: "Swami Vivekananda Airport", code: "RPR" },
  { city: "Rajkot", airport: "Rajkot International Airport", code: "HSR" },
  { city: "Ranchi", airport: "Birsa Munda Airport", code: "IXR" },
  { city: "Shillong", airport: "Shillong Airport", code: "SHL" },
  { city: "Shimla", airport: "Shimla Airport", code: "SLV" },
  { city: "Srinagar", airport: "Sheikh ul-Alam International Airport", code: "SXR" },
  { city: "Surat", airport: "Surat International Airport", code: "STV" },
  { city: "Thiruvananthapuram", airport: "Trivandrum International Airport", code: "TRV" },
  { city: "Tiruchirappalli", airport: "Tiruchirappalli International Airport", code: "TRZ" },
  { city: "Udaipur", airport: "Maharana Pratap Airport", code: "UDR" },
  { city: "Vadodara", airport: "Vadodara Airport", code: "BDQ" },
  { city: "Varanasi", airport: "Lal Bahadur Shastri International Airport", code: "VNS" },
  { city: "Vijayawada", airport: "Vijayawada International Airport", code: "VGA" },
  { city: "Visakhapatnam", airport: "Visakhapatnam International Airport", code: "VTZ" }
];

// Transform airports to city format for dropdown
const cities = indianAirports.map(airport => ({
  code: airport.code,
  name: airport.city,
  airport: airport.airport
}));

// Remove duplicates by city code
const uniqueCities = Array.from(new Map(cities.map(city => [city.code, city])).values());

// Types
interface City {
  code: string;
  name: string;
  airport: string;
}

interface TravellerCount {
  adults: number;
  children: number;
  infants: number;
}

interface Flight {
  id: number;
  airline: string;
  flight_number: string;
  from_city: string;
  from_airport: string;
  from_airport_code: string;
  to_city: string;
  to_airport: string;
  to_airport_code: string;
  departure_date: string;
  return_date: string | null;
  flight_time: string;
  duration: string;
  arrival_time: string;
  flight_type: string;
  price_per_adult: string;
  baggage_allowance: string;
  meals_seat_description: string;
  refundable_status_description: string;
  meals_included: number;
  booking_type: string;
  adults: number;
  children: number;
  infants: number;
  traveller_class: string;
}

// Trip Type Selector Component
const TripTypeSelector = ({ 
  tripType, 
  onTripTypeChange 
}: { 
  tripType: "one-way" | "round-trip"; 
  onTripTypeChange: (type: "one-way" | "round-trip") => void 
}) => {
  return (
    <div className="h-full bg-white hover:bg-gray-50 transition-colors rounded-l-2xl border-r border-gray-200">
      <div className="h-full flex flex-col justify-center px-4">
        <div className="flex flex-col gap-1">
          <button
            onClick={() => onTripTypeChange("one-way")}
            className={cn(
              "px-3 py-2 rounded border text-xs font-medium transition-all duration-200 whitespace-nowrap",
              tripType === "one-way" 
                ? "border-orange-600 bg-orange-50 text-orange-800 shadow-sm" 
                : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
            )}
          >
            One Way
          </button>
          <button
            onClick={() => onTripTypeChange("round-trip")}
            className={cn(
              "px-3 py-2 rounded border text-xs font-medium transition-all duration-200 whitespace-nowrap",
              tripType === "round-trip" 
                ? "border-orange-600 bg-orange-50 text-orange-800 shadow-sm" 
                : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
            )}
          >
            Round Trip
          </button>
        </div>
      </div>
    </div>
  );
};

// Traveller Selector
const TravellerSelector = ({ 
  travellers, 
  onTravellersChange,
  autoOpen,
  onClose
}: { 
  travellers: TravellerCount; 
  onTravellersChange: (travellers: TravellerCount) => void;
  autoOpen?: boolean;
  onClose?: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const totalTravellers = travellers.adults + travellers.children + travellers.infants;

  useEffect(() => {
    if (autoOpen) {
      setOpen(true);
    }
  }, [autoOpen]);

  const updateCount = (type: keyof TravellerCount, delta: number) => {
    const newValue = travellers[type] + delta;
    
    if (type === "adults" && newValue < 1) return;
    if (type === "adults" && newValue > 9) return;
    if (type === "children" && (newValue < 0 || newValue > 6)) return;
    if (type === "infants" && (newValue < 0 || newValue > travellers.adults)) return;

    onTravellersChange({
      ...travellers,
      [type]: newValue,
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
        if (onClose) onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="relative h-full" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full h-full text-left px-4 py-3 bg-white hover:bg-gray-50 transition-colors group border-l border-gray-200"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Travellers & Class</p>
            <p className="font-semibold text-gray-900 truncate">
              {totalTravellers} Traveller{totalTravellers !== 1 ? "s" : ""}
            </p>
            <p className="text-xs text-gray-500 truncate">Economy</p>
          </div>
          <ChevronDown className={cn(
            "w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors transform shrink-0",
            open && "rotate-180"
          )} />
        </div>
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 shadow-xl rounded-lg z-[100] p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Travellers</h3>
          <div className="divide-y divide-gray-100">
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-gray-900">Adults</p>
                <p className="text-xs text-gray-500">12y+</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateCount("adults", -1)}
                  disabled={travellers.adults <= 1}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-40 hover:bg-gray-50"
                >
                  <Minus className="w-3.5 h-3.5 text-gray-700" />
                </button>
                <span className="w-8 text-center font-semibold">{travellers.adults}</span>
                <button
                  onClick={() => updateCount("adults", 1)}
                  disabled={travellers.adults >= 9}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-40 hover:bg-gray-50"
                >
                  <Plus className="w-3.5 h-3.5 text-gray-700" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-gray-900">Children</p>
                <p className="text-xs text-gray-500">2-11y</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateCount("children", -1)}
                  disabled={travellers.children <= 0}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-40 hover:bg-gray-50"
                >
                  <Minus className="w-3.5 h-3.5 text-gray-700" />
                </button>
                <span className="w-8 text-center font-semibold">{travellers.children}</span>
                <button
                  onClick={() => updateCount("children", 1)}
                  disabled={travellers.children >= 6}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-40 hover:bg-gray-50"
                >
                  <Plus className="w-3.5 h-3.5 text-gray-700" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-gray-900">Infants</p>
                <p className="text-xs text-gray-500">0-2y</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateCount("infants", -1)}
                  disabled={travellers.infants <= 0}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-40 hover:bg-gray-50"
                >
                  <Minus className="w-3.5 h-3.5 text-gray-700" />
                </button>
                <span className="w-8 text-center font-semibold">{travellers.infants}</span>
                <button
                  onClick={() => updateCount("infants", 1)}
                  disabled={travellers.infants >= travellers.adults}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-40 hover:bg-gray-50"
                >
                  <Plus className="w-3.5 h-3.5 text-gray-700" />
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              setOpen(false);
              if (onClose) onClose();
            }}
            className="w-full mt-5 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition-colors"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
};

// Date Selector
const DateSelector = ({ 
  label, 
  selectedDate, 
  onDateSelect,
  minDate,
  disabled,
  autoOpen,
  onClose,
  onSelect
}: { 
  label: string;
  selectedDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
  minDate?: Date;
  disabled?: boolean;
  autoOpen?: boolean;
  onClose?: () => void;
  onSelect?: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoOpen && !disabled) {
      setOpen(true);
    }
  }, [autoOpen, disabled]);

  const getCalendarDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 35; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    return days;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
        if (onClose) onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="relative h-full" ref={dropdownRef}>
      <button
        onClick={() => !disabled && setOpen(!open)}
        disabled={disabled}
        className={cn(
          "w-full h-full text-left px-4 py-3 bg-white hover:bg-gray-50 transition-colors group border-l border-gray-200",
          disabled && "opacity-50 cursor-not-allowed hover:bg-white"
        )}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
            <CalendarIcon className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
            {selectedDate ? (
              <>
                <p className="font-semibold text-gray-900 truncate">
                  {format(selectedDate, "dd MMM''yy")}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {format(selectedDate, "EEEE")}
                </p>
              </>
            ) : (
              <p className="text-gray-500">Select Date</p>
            )}
          </div>
          <ChevronDown className={cn(
            "w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors transform shrink-0",
            open && "rotate-180"
          )} />
        </div>
      </button>

      {open && (
        <div className="fixed md:absolute top-full left-0 mt-2 bg-white border border-gray-200 shadow-xl rounded-lg z-[100] p-4 min-w-[300px]">
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(day => (
              <div key={day} className="text-xs text-gray-500 py-1">{day}</div>
            ))}
            {getCalendarDays().map((date, i) => {
              const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
              const isPast = date < new Date(new Date().setHours(0,0,0,0));
              return (
                <button
                  key={i}
                  onClick={() => {
                    onDateSelect(date);
                    setOpen(false);
                    if (onSelect) onSelect();
                    if (onClose) onClose();
                  }}
                  disabled={isPast || (minDate && date < minDate)}
                  className={cn(
                    "w-9 h-9 rounded-full text-sm transition-colors",
                    isSelected && "bg-blue-600 text-white font-medium",
                    !isSelected && "hover:bg-gray-100",
                    (isPast || (minDate && date < minDate)) && "opacity-40 cursor-not-allowed"
                  )}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// City Selector
const CitySelector = ({ 
  label, 
  selectedCity, 
  onCitySelect,
  excludeCity,
  isFrom = true,
  autoOpen,
  onClose,
  onSelect
}: { 
  label: string;
  selectedCity: City | null;
  onCitySelect: (city: City) => void;
  excludeCity?: City | null;
  isFrom?: boolean;
  autoOpen?: boolean;
  onClose?: () => void;
  onSelect?: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoOpen) {
      setOpen(true);
    }
  }, [autoOpen]);

  const filteredCities = uniqueCities.filter(
    (city) =>
      city.code !== excludeCity?.code &&
      (city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        city.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        city.airport.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
        if (onClose) onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="relative h-full" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "w-full h-full text-left px-4 py-3 bg-white hover:bg-gray-50 transition-colors group",
          !isFrom && "border-l border-gray-200"
        )}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
            {selectedCity ? (
              <>
                <p className="font-semibold text-gray-900 truncate">{selectedCity.name}</p>
                <p className="text-xs text-gray-500 truncate">{selectedCity.code} • {selectedCity.airport}</p>
              </>
            ) : (
              <p className="text-gray-500 truncate">Select city or airport</p>
            )}
          </div>
          <ChevronDown className={cn(
            "w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors transform shrink-0",
            open && "rotate-180"
          )} />
        </div>
      </button>

      {open && (
        <div className="fixed md:absolute top-full left-0 mt-2 w-96 bg-white border border-gray-200 shadow-2xl rounded-xl z-[100] overflow-hidden">
          <div className="p-3 border-b">
            <input
              type="text"
              placeholder={isFrom ? "From which city?" : "To which city?"}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 rounded-lg text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/30"
              autoFocus
            />
          </div>
          <div className="max-h-80 overflow-y-auto">
            {filteredCities.map((city) => (
              <button
                key={city.code}
                onClick={() => {
                  onCitySelect(city);
                  setOpen(false);
                  setSearchQuery("");
                  if (onSelect) onSelect();
                  if (onClose) onClose();
                }}
                className={cn(
                  "w-full text-left px-5 py-3.5 hover:bg-orange-50 transition-colors flex items-center gap-4 border-b border-gray-100 last:border-b-0",
                  selectedCity?.code === city.code && "bg-orange-50"
                )}
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-700 shrink-0">
                  {city.code}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900">{city.name}</p>
                  <p className="text-sm text-gray-600 truncate">{city.airport}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


// Flight Results Component - With Working Filters
const FlightResults = ({ searchData, onBack, travellers }: { searchData: any; onBack: () => void; travellers: TravellerCount }) => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFlight, setSelectedFlight] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>("recommended");
  const navigate = useNavigate();

  // Filter states
  const [filters, setFilters] = useState({
    stops: {
      nonstop: false,
      oneStop: false,
      twoPlusStops: false
    },
    priceRange: {
      min: 0,
      max: 100000
    },
    airlines: {} as Record<string, boolean>,
    departureTime: {
      morning: false,
      afternoon: false,
      evening: false,
      night: false
    },
    baggageIncluded: false,
    mealsIncluded: false
  });

  // Fetch flights from API
  useEffect(() => {
    const fetchFlights = async () => {
      if (!searchData) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`${API_BASE_URL}/offline-flights`);
        const result = await response.json();
        
        if (result.success && result.data) {
          const filteredFlights = result.data.filter((flight: Flight) => {
            const fromCityMatch = !searchData.fromCity || 
              flight.from_city?.toLowerCase() === searchData.fromCity?.name?.toLowerCase();
            const toCityMatch = !searchData.toCity || 
              flight.to_city?.toLowerCase() === searchData.toCity?.name?.toLowerCase();
            
            const flightDepartureDate = flight.departure_date ? new Date(flight.departure_date) : null;
            const searchDepartureDate = searchData.departureDate;
            
            let dateMatch = true;
            if (flightDepartureDate && searchDepartureDate) {
              const flightDateStr = format(flightDepartureDate, 'yyyy-MM-dd');
              const searchDateStr = format(searchDepartureDate, 'yyyy-MM-dd');
              dateMatch = flightDateStr === searchDateStr;
            }

            const searchTripType = searchData.tripType === 'one-way' ? 'oneWay' : 'roundTrip';
            const bookingTypeMatch = flight.booking_type === searchTripType;

            if (searchTripType === 'roundTrip' && searchData.returnDate && flight.return_date) {
              const flightReturnDate = new Date(flight.return_date);
              const searchReturnDate = searchData.returnDate;
              const flightReturnDateStr = format(flightReturnDate, 'yyyy-MM-dd');
              const searchReturnDateStr = format(searchReturnDate, 'yyyy-MM-dd');
              return fromCityMatch && toCityMatch && dateMatch && bookingTypeMatch && flightReturnDateStr === searchReturnDateStr;
            }
            
            return fromCityMatch && toCityMatch && dateMatch && bookingTypeMatch;
          });
          
          setFlights(filteredFlights);
          setFilteredFlights(filteredFlights);
          
          // Initialize airline filters
          const airlineFilters: Record<string, boolean> = {};
          filteredFlights.forEach((flight: Flight) => {
            if (!airlineFilters[flight.airline]) {
              airlineFilters[flight.airline] = true;
            }
          });
          setFilters(prev => ({ ...prev, airlines: airlineFilters }));
          
          // Set max price range
          const maxPrice = Math.max(...filteredFlights.map(f => parseFloat(f.price_per_adult)));
          setFilters(prev => ({ ...prev, priceRange: { ...prev.priceRange, max: maxPrice } }));
        } else {
          setError('No flights found');
        }
      } catch (err) {
        console.error('Error fetching flights:', err);
        setError('Failed to fetch flights. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [searchData]);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...flights];

    // Apply stops filter
    const selectedStops = [];
    if (filters.stops.nonstop) selectedStops.push('Non-stop');
    if (filters.stops.oneStop) selectedStops.push('1 Stop');
    if (filters.stops.twoPlusStops) selectedStops.push('2+ Stops');
    
    if (selectedStops.length > 0) {
      result = result.filter(flight => {
        if (selectedStops.includes('Non-stop') && flight.flight_type === 'Non-stop') return true;
        if (selectedStops.includes('1 Stop') && flight.flight_type === '1 Stop') return true;
        if (selectedStops.includes('2+ Stops') && (flight.flight_type === '2 Stops' || flight.flight_type === '3 Stops')) return true;
        return false;
      });
    }

    // Apply price range filter
    result = result.filter(flight => {
      const price = parseFloat(flight.price_per_adult);
      return price >= filters.priceRange.min && price <= filters.priceRange.max;
    });

    // Apply airlines filter
    const selectedAirlines = Object.entries(filters.airlines)
      .filter(([, selected]) => selected)
      .map(([airline]) => airline);
    
    if (selectedAirlines.length > 0) {
      result = result.filter(flight => selectedAirlines.includes(flight.airline));
    }

    // Apply departure time filter
    const selectedTimes = [];
    if (filters.departureTime.morning) selectedTimes.push('morning');
    if (filters.departureTime.afternoon) selectedTimes.push('afternoon');
    if (filters.departureTime.evening) selectedTimes.push('evening');
    if (filters.departureTime.night) selectedTimes.push('night');
    
    if (selectedTimes.length > 0) {
      result = result.filter(flight => {
        const hour = parseInt(flight.flight_time.split(':')[0]);
        if (selectedTimes.includes('morning') && hour >= 0 && hour < 12) return true;
        if (selectedTimes.includes('afternoon') && hour >= 12 && hour < 17) return true;
        if (selectedTimes.includes('evening') && hour >= 17 && hour < 21) return true;
        if (selectedTimes.includes('night') && hour >= 21 && hour <= 23) return true;
        return false;
      });
    }

    // Apply baggage filter
    if (filters.baggageIncluded) {
      result = result.filter(flight => 
        flight.baggage_allowance && flight.baggage_allowance.includes('kg')
      );
    }

    // Apply meals filter
    if (filters.mealsIncluded) {
      result = result.filter(flight => flight.meals_included === 1);
    }

    // Apply sorting
    switch (sortBy) {
      case 'price_low':
        result.sort((a, b) => parseFloat(a.price_per_adult) - parseFloat(b.price_per_adult));
        break;
      case 'price_high':
        result.sort((a, b) => parseFloat(b.price_per_adult) - parseFloat(a.price_per_adult));
        break;
      case 'departure_early':
        result.sort((a, b) => a.flight_time.localeCompare(b.flight_time));
        break;
      case 'duration_short':
        result.sort((a, b) => {
          const durationA = parseInt(a.duration.split(' ')[0]);
          const durationB = parseInt(b.duration.split(' ')[0]);
          return durationA - durationB;
        });
        break;
      default:
        // recommended - keep original order
        break;
    }

    setFilteredFlights(result);
  }, [flights, filters, sortBy]);

  const handleBookNowClick = (flight: Flight) => {
    const adultCount = travellers.adults;
    const childCount = travellers.children;
    const infantCount = travellers.infants;
    
    const adultPrice = parseFloat(flight.price_per_adult);
    const childPrice = adultPrice * 0.75;
    const infantPrice = adultPrice * 0.1;
    
    const totalPriceValue = (adultCount * adultPrice) + (childCount * childPrice) + (infantCount * infantPrice);
    
    const flightWithDetails = {
      ...flight,
      adults: adultCount,
      children: childCount,
      infants: infantCount,
      child_price: childPrice,
      infant_price: infantPrice,
      total_price_value: totalPriceValue,
      payment_type: 'full'
    };
    
    localStorage.setItem('selectedOfflineFlight', JSON.stringify(flightWithDetails));
    navigate('/checkout-offline-flights', { state: { flight: flightWithDetails } });
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return 'N/A';
    return timeString.substring(0, 5);
  };

  const formatPrice = (price: string) => {
    if (!price) return '0';
    return parseInt(price).toLocaleString('en-IN');
  };

  // Handle filter changes
  const handleStopFilter = (stopType: 'nonstop' | 'oneStop' | 'twoPlusStops') => {
    setFilters(prev => ({
      ...prev,
      stops: { ...prev.stops, [stopType]: !prev.stops[stopType] }
    }));
  };

  const handleAirlineFilter = (airline: string) => {
    setFilters(prev => ({
      ...prev,
      airlines: { ...prev.airlines, [airline]: !prev.airlines[airline] }
    }));
  };

  const handleTimeFilter = (timeSlot: 'morning' | 'afternoon' | 'evening' | 'night') => {
    setFilters(prev => ({
      ...prev,
      departureTime: { ...prev.departureTime, [timeSlot]: !prev.departureTime[timeSlot] }
    }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setFilters(prev => ({
      ...prev,
      priceRange: { ...prev.priceRange, max: value }
    }));
  };

  const clearAllFilters = () => {
    const airlineFilters: Record<string, boolean> = {};
    flights.forEach((flight: Flight) => {
      airlineFilters[flight.airline] = true;
    });
    
    setFilters({
      stops: { nonstop: true, oneStop: false, twoPlusStops: false },
      priceRange: { min: 0, max: Math.max(...flights.map(f => parseFloat(f.price_per_adult))) },
      airlines: airlineFilters,
      departureTime: { morning: false, afternoon: false, evening: false, night: false },
      baggageIncluded: false,
      mealsIncluded: false
    });
    setSortBy("recommended");
  };

  const totalTravellers = travellers.adults + travellers.children + travellers.infants;
  const maxPrice = flights.length > 0 ? Math.max(...flights.map(f => parseFloat(f.price_per_adult))) : 50000;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Modify Search
        </button>

        {/* Search Summary Card */}
        {searchData && (
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg mb-8 p-6 text-white">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-8 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{searchData.fromCity?.code}</p>
                    <p className="text-xs opacity-90">{searchData.fromCity?.name}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <Plane className="w-5 h-5 transform rotate-90" />
                    <div className="w-16 h-px bg-white/30 my-1"></div>
                    <p className="text-xs">{searchData.tripType === 'one-way' ? 'One Way' : 'Round Trip'}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{searchData.toCity?.code}</p>
                    <p className="text-xs opacity-90">{searchData.toCity?.name}</p>
                  </div>
                </div>
                
                <div className="h-8 w-px bg-white/30"></div>
                
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-xs opacity-80">Departure</p>
                    <p className="font-semibold">{format(searchData.departureDate, "dd MMM yyyy")}</p>
                    <p className="text-xs opacity-80">{format(searchData.departureDate, "EEEE")}</p>
                  </div>
                  {searchData.returnDate && (
                    <>
                      <ArrowRightLeft className="w-4 h-4 opacity-60" />
                      <div>
                        <p className="text-xs opacity-80">Return</p>
                        <p className="font-semibold">{format(searchData.returnDate, "dd MMM yyyy")}</p>
                        <p className="text-xs opacity-80">{format(searchData.returnDate, "EEEE")}</p>
                      </div>
                    </>
                  )}
                </div>
                
                <div className="h-8 w-px bg-white/30"></div>
                
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span className="font-semibold">{totalTravellers}</span>
                  <span className="text-sm">Traveller{totalTravellers !== 1 ? 's' : ''}</span>
                  <span className="text-xs opacity-80">(Economy)</span>
                </div>
              </div>
              
              <div className="text-sm bg-white/20 rounded-lg px-4 py-2">
                {filteredFlights.length} Flight{filteredFlights.length !== 1 ? 's' : ''} Found
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          {/* LEFT FILTER PANEL - With Working Filters */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg sticky top-24 overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                  <p className="text-sm text-gray-500">Refine your flight search</p>
                </div>
                <button 
                  onClick={clearAllFilters}
                  className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                >
                  Clear all
                </button>
              </div>
              
              <div className="p-5 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                {/* Stops Filter */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Stops
                  </h3>
                  <div className="space-y-3">
                    {[
                      { id: 'nonstop', label: 'Non-stop only', count: flights.filter(f => f.flight_type === 'Non-stop').length },
                      { id: 'oneStop', label: '1 Stop', count: flights.filter(f => f.flight_type === '1 Stop').length },
                      { id: 'twoPlusStops', label: '2+ Stops', count: flights.filter(f => f.flight_type?.includes('Stop') && !f.flight_type.includes('Non') && f.flight_type !== '1 Stop').length }
                    ].map((stop) => (
                      <label key={stop.id} className="flex items-center justify-between cursor-pointer group">
                        <div className="flex items-center gap-3">
                          <input 
                            type="checkbox" 
                            checked={filters.stops[stop.id as keyof typeof filters.stops]}
                            onChange={() => handleStopFilter(stop.id as any)}
                            className="w-4 h-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                          />
                          <span className="text-gray-700 group-hover:text-orange-600 transition-colors">{stop.label}</span>
                        </div>
                        <span className="text-xs text-gray-400">{stop.count}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Price Range
                  </h3>
                  <div className="space-y-3">
                    <input 
                      type="range" 
                      min="0" 
                      max={maxPrice}
                      value={filters.priceRange.max}
                      onChange={handlePriceChange}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                    />
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">₹0</span>
                      <span className="text-gray-600 font-medium">₹{filters.priceRange.max.toLocaleString('en-IN')}+</span>
                    </div>
                  </div>
                </div>

                {/* Airlines Filter */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Airlines
                  </h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {Object.entries(filters.airlines).map(([airline, selected]) => (
                      <label key={airline} className="flex items-center justify-between cursor-pointer group">
                        <div className="flex items-center gap-3">
                          <input 
                            type="checkbox" 
                            checked={selected}
                            onChange={() => handleAirlineFilter(airline)}
                            className="w-4 h-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                          />
                          <span className="text-gray-700 group-hover:text-orange-600 transition-colors">{airline}</span>
                        </div>
                        <span className="text-xs text-gray-400">{flights.filter(f => f.airline === airline).length}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Departure Time */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Departure Time</h3>
                  <div className="space-y-2">
                    {[
                      { id: 'morning', label: 'Morning (00:00 - 11:59)', icon: '🌅' },
                      { id: 'afternoon', label: 'Afternoon (12:00 - 16:59)', icon: '☀️' },
                      { id: 'evening', label: 'Evening (17:00 - 20:59)', icon: '🌆' },
                      { id: 'night', label: 'Night (21:00 - 23:59)', icon: '🌙' }
                    ].map((time) => (
                      <label key={time.id} className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={filters.departureTime[time.id as keyof typeof filters.departureTime]}
                          onChange={() => handleTimeFilter(time.id as any)}
                          className="w-4 h-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                        />
                        <span className="text-sm text-gray-700">{time.icon} {time.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Additional Filters */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Amenities</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={filters.baggageIncluded}
                        onChange={() => setFilters(prev => ({ ...prev, baggageIncluded: !prev.baggageIncluded }))}
                        className="w-4 h-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                      />
                      <span className="text-sm text-gray-700">🎒 With Baggage Allowance</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={filters.mealsIncluded}
                        onChange={() => setFilters(prev => ({ ...prev, mealsIncluded: !prev.mealsIncluded }))}
                        className="w-4 h-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                      />
                      <span className="text-sm text-gray-700">🍽️ Meals Included</span>
                    </label>
                  </div>
                </div>

                {/* Active Filters Summary */}
                {(filters.stops.oneStop || filters.stops.twoPlusStops || 
                  Object.values(filters.departureTime).some(v => v) ||
                  filters.baggageIncluded || filters.mealsIncluded ||
                  Object.values(filters.airlines).some(v => !v)) && (
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500 mb-2">Active filters:</p>
                    <div className="flex flex-wrap gap-2">
                      {filters.stops.oneStop && (
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">1 Stop</span>
                      )}
                      {filters.stops.twoPlusStops && (
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">2+ Stops</span>
                      )}
                      {filters.baggageIncluded && (
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">Baggage</span>
                      )}
                      {filters.mealsIncluded && (
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">Meals</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT FLIGHT LIST */}
          <div className="flex-1 space-y-4">
            {/* Sort Options */}
            <div className="bg-white rounded-xl shadow-sm p-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="departure_early">Departure: Earliest</option>
                  <option value="duration_short">Duration: Shortest</option>
                </select>
              </div>
              <div className="text-sm text-gray-500">
                Showing <span className="font-semibold text-gray-900">{filteredFlights.length}</span> of {flights.length} flights
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-4">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                </div>
                <p className="text-gray-600 font-medium">Searching for the best flights...</p>
                <p className="text-sm text-gray-400 mt-1">This may take a few seconds</p>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-4">
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-red-600 font-medium mb-4">{error}</p>
                <button 
                  onClick={onBack}
                  className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Back to Search
                </button>
              </div>
            )}

            {/* No Results State */}
            {!loading && !error && filteredFlights.length === 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4">
                  <Plane className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-600 font-medium mb-2">No flights match your filters</p>
                <p className="text-sm text-gray-400 mb-4">Try adjusting your filter criteria</p>
                <button 
                  onClick={clearAllFilters}
                  className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* FLIGHT CARDS */}
            {!loading && !error && filteredFlights.map((flight, index) => (
              <div 
                key={flight.id} 
                className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 ${selectedFlight === flight.id ? 'ring-2 ring-orange-500' : ''}`}
                onClick={() => setSelectedFlight(selectedFlight === flight.id ? null : flight.id)}
              >
                {/* Main Flight Info */}
                <div className="p-5">
                  <div className="flex flex-wrap lg:flex-nowrap items-center gap-6">
                    {/* Airline Logo & Name */}
                    <div className="lg:w-40 flex-shrink-0">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                          <Plane className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">{flight.airline}</h4>
                          <p className="text-xs text-gray-500">{flight.flight_number}</p>
                        </div>
                      </div>
                    </div>

                    {/* Flight Timeline */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-4">
                        {/* Departure */}
                        <div className="text-center flex-1">
                          <p className="text-2xl font-bold text-gray-900">{formatTime(flight.flight_time)}</p>
                          <p className="font-semibold text-gray-800">{flight.from_city}</p>
                          <p className="text-xs text-gray-500">{flight.from_airport_code}</p>
                        </div>

                        {/* Duration & Flight Path */}
                        <div className="flex-1 px-4">
                          <div className="relative flex items-center justify-center">
                            <div className="absolute left-0 right-0 h-px bg-gray-300"></div>
                            <div className="relative bg-white px-3 py-1 rounded-full border border-gray-200">
                              <p className="text-xs font-medium text-gray-600">{flight.duration}</p>
                            </div>
                          </div>
                          <p className="text-xs text-center text-green-600 mt-1 font-medium">{flight.flight_type}</p>
                        </div>

                        {/* Arrival */}
                        <div className="text-center flex-1">
                          <p className="text-2xl font-bold text-gray-900">{formatTime(flight.arrival_time)}</p>
                          <p className="font-semibold text-gray-800">{flight.to_city}</p>
                          <p className="text-xs text-gray-500">{flight.to_airport_code}</p>
                        </div>
                      </div>
                    </div>

                    {/* Price & Book Button */}
                    <div className="lg:w-48 flex-shrink-0 text-right">
                      <div className="mb-2">
                        <p className="text-2xl font-bold text-orange-600">₹ {formatPrice(flight.price_per_adult)}</p>
                        <p className="text-xs text-gray-500">per adult</p>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookNowClick(flight);
                        }}
                        className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>

                  {/* Expand/Collapse Toggle */}
                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveTab(activeTab === `details-${flight.id}` ? null : `details-${flight.id}`);
                      }}
                      className="flex items-center gap-2 text-sm text-gray-500 hover:text-orange-600 transition-colors"
                    >
                      <svg className={`w-4 h-4 transition-transform ${activeTab === `details-${flight.id}` ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                      Flight Details
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {activeTab === `details-${flight.id}` && (
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-5 border-t border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white rounded-xl p-4 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                          <h4 className="font-semibold text-gray-900">Baggage Allowance</h4>
                        </div>
                        <p className="text-gray-700 text-sm">{flight.baggage_allowance || '15kg check-in + 7kg cabin'}</p>
                      </div>
                      
                      <div className="bg-white rounded-xl p-4 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          <h4 className="font-semibold text-gray-900">Meals & Seats</h4>
                        </div>
                        <p className="text-gray-700 text-sm">{flight.meals_seat_description || 'Complimentary meal included'}</p>
                        {flight.meals_included === 1 && (
                          <span className="inline-block mt-2 text-xs text-green-600 bg-green-50 px-2 py-1 rounded">✓ Meals included</span>
                        )}
                      </div>
                      
                      <div className="bg-white rounded-xl p-4 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                          <h4 className="font-semibold text-gray-900">Refundable Status</h4>
                        </div>
                        <p className="text-gray-700 text-sm">{flight.refundable_status_description || 'Non-refundable'}</p>
                      </div>
                    </div>
                    
                    {/* Fare Summary */}
                    <div className="mt-4 bg-orange-50 rounded-xl p-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-gray-600">Fare Summary:</span>
                          <span>{travellers.adults} Adult{travellers.adults !== 1 ? 's' : ''} × ₹{formatPrice(flight.price_per_adult)}</span>
                          {travellers.children > 0 && <span>{travellers.children} Child{travellers.children !== 1 ? 'ren' : ''} × ₹{Math.round(parseFloat(flight.price_per_adult) * 0.75)}</span>}
                          {travellers.infants > 0 && <span>{travellers.infants} Infant{travellers.infants !== 1 ? 's' : ''} × ₹{Math.round(parseFloat(flight.price_per_adult) * 0.1)}</span>}
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">Total Amount</p>
                          <p className="text-xl font-bold text-orange-600">
                            ₹ {(travellers.adults * parseFloat(flight.price_per_adult) + 
                               travellers.children * parseFloat(flight.price_per_adult) * 0.75 +
                               travellers.infants * parseFloat(flight.price_per_adult) * 0.1).toLocaleString('en-IN')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component
const FlightSearch = () => {
  const [showResults, setShowResults] = useState(false);
  const [searchData, setSearchData] = useState<any>(null);
  
  const [tripType, setTripType] = useState<"one-way" | "round-trip">("round-trip");
  const [fromCity, setFromCity] = useState<City>(uniqueCities.find(c => c.code === "DEL") || uniqueCities[0]);
  const [toCity, setToCity] = useState<City>(uniqueCities.find(c => c.code === "BLR") || uniqueCities[1]);
  const [departureDate, setDepartureDate] = useState<Date>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d;
  });
  const [returnDate, setReturnDate] = useState<Date | undefined>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 4);
    return d;
  });
  const [travellers, setTravellers] = useState<TravellerCount>({
    adults: 1,
    children: 0,
    infants: 0,
  });

  // Auto-focus states
  const [autoOpenTo, setAutoOpenTo] = useState(false);
  const [autoOpenDeparture, setAutoOpenDeparture] = useState(false);
  const [autoOpenReturn, setAutoOpenReturn] = useState(false);
  const [autoOpenTravellers, setAutoOpenTravellers] = useState(false);

  const swapCities = () => {
    setFromCity(toCity);
    setToCity(fromCity);
  };

  const handleSearch = () => {
    if (!fromCity || !toCity || !departureDate) return;
    
    const newSearchData = {
      fromCity,
      toCity,
      departureDate,
      returnDate,
      tripType,
      travellers
    };
    
    setSearchData(newSearchData);
    setShowResults(true);
    
    // Scroll to results smoothly
    setTimeout(() => {
      window.scrollTo({
        top: document.getElementById('flight-results')?.offsetTop || 0,
        behavior: 'smooth'
      });
    }, 100);
  };

  const handleBackToSearch = () => {
    setShowResults(false);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Handlers for auto-focus sequence
  const handleFromSelect = () => {
    setAutoOpenTo(true);
  };

  const handleToSelect = () => {
    setAutoOpenDeparture(true);
  };

  const handleDepartureSelect = () => {
    if (tripType === "round-trip") {
      setAutoOpenReturn(true);
    } else {
      setAutoOpenTravellers(true);
    }
  };

  const handleReturnSelect = () => {
    setAutoOpenTravellers(true);
  };

  // Reset auto-open flags when dropdowns are closed
  const handleToClose = () => {
    setAutoOpenTo(false);
  };

  const handleDepartureClose = () => {
    setAutoOpenDeparture(false);
  };

  const handleReturnClose = () => {
    setAutoOpenReturn(false);
  };

  const handleTravellersClose = () => {
    setAutoOpenTravellers(false);
  };

  const isSearchEnabled = !!fromCity && !!toCity && !!departureDate;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50/70 to-white">
      <Header />
      
      <div className="flex-grow">
        {/* Header Section with Background Image */}
        <div 
          className="pt-28 pb-28 relative bg-gradient-to-r from-blue-200/90 to-blue-300/90"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(74, 94, 149, 0.45), rgba(30, 64, 175, 0.49)), url('https://images.fineartamerica.com/images-medium-large-5/1-commercial-jet-flying-over-clouds-buena-vista-images.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'overlay'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-800/80"></div>
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <Plane className="w-8 h-8 text-white" />
              <h1 className="text-2xl font-bold text-white">Flight Booking</h1>
            </div>
          
          </div>
        </div>

        {/* Search Form */}
        <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-10 mb-20">  
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200">
            <div className="flex flex-col md:flex-row items-stretch">
              <div className="w-full md:w-auto">
                <TripTypeSelector
                  tripType={tripType}
                  onTripTypeChange={setTripType}
                />
              </div>
              
              <div className="flex-1 grid grid-cols-1 md:grid-cols-5">
                <div className="border-t md:border-t-0 md:border-l border-gray-200 relative">
                  <CitySelector
                    label="FROM"
                    selectedCity={fromCity}
                    onCitySelect={setFromCity}
                    excludeCity={toCity}
                    isFrom={true}
                    onSelect={handleFromSelect}
                  />
                  <button
                    onClick={swapCities}
                    className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border-2 border-gray-300 text-gray-600 items-center justify-center hover:bg-gray-50 hover:border-orange-400 transition-all shadow-lg"
                  >
                    <ArrowRightLeft className="w-4 h-4" />
                  </button>
                </div>

                <div className="border-t md:border-t-0 md:border-l border-gray-200">
                  <CitySelector
                    label="TO"
                    selectedCity={toCity}
                    onCitySelect={setToCity}
                    excludeCity={fromCity}
                    isFrom={false}
                    autoOpen={autoOpenTo}
                    onClose={handleToClose}
                    onSelect={handleToSelect}
                  />
                </div>

                <div className="border-t md:border-t-0 md:border-l border-gray-200">
                  <DateSelector
                    label="DEPARTURE"
                    selectedDate={departureDate}
                    onDateSelect={setDepartureDate}
                    minDate={new Date()}
                    autoOpen={autoOpenDeparture}
                    onClose={handleDepartureClose}
                    onSelect={handleDepartureSelect}
                  />
                </div>

                <div className="border-t md:border-t-0 md:border-l border-gray-200">
                  <DateSelector
                    label="RETURN"
                    selectedDate={returnDate}
                    onDateSelect={setReturnDate}
                    minDate={departureDate}
                    disabled={tripType === "one-way"}
                    autoOpen={autoOpenReturn}
                    onClose={handleReturnClose}
                    onSelect={handleReturnSelect}
                  />
                </div>

                <div className="border-t md:border-t-0 md:border-l border-gray-200">
                  <TravellerSelector 
                    travellers={travellers} 
                    onTravellersChange={setTravellers}
                    autoOpen={autoOpenTravellers}
                    onClose={handleTravellersClose}
                  />
                </div>
              </div>

              <div className="border-t md:border-t-0 md:border-l border-gray-200">
                <button
                  onClick={handleSearch}
                  disabled={!isSearchEnabled}
                  className={cn(
                    "w-full h-full py-4 px-6 bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg rounded-r-2xl transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed",
                    isSearchEnabled && "hover:shadow-xl"
                  )}
                >
                  <Search className="w-6 h-6" />
                  <span className="hidden md:inline">Search Flights</span>
                  <span className="md:hidden">Search</span>
                </button>
              </div>
            </div>

            <div className="md:hidden p-4 border-t border-gray-200">
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setTripType("one-way")}
                  className={cn(
                    "px-6 py-2.5 rounded-lg border text-sm font-medium transition-all duration-200",
                    tripType === "one-way" 
                      ? "border-orange-600 bg-orange-50 text-orange-800" 
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                  )}
                >
                  One Way
                </button>
                <button
                  onClick={() => setTripType("round-trip")}
                  className={cn(
                    "px-6 py-2.5 rounded-lg border text-sm font-medium transition-all duration-200",
                    tripType === "round-trip" 
                      ? "border-orange-600 bg-orange-50 text-orange-800" 
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                  )}
                >
                  Round Trip
                </button>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Search hundreds of flights at the best prices
          </p>
        </div>

        {/* Flight Results Section */}
        {showResults && searchData && (
          <div id="flight-results" className="mt-8">
            <FlightResults searchData={searchData} onBack={handleBackToSearch} travellers={travellers} />
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default FlightSearch;