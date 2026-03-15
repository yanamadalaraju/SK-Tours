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

// Flight Results Component
const FlightResults = ({ searchData, onBack }: { searchData: any; onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch flights from API when search data changes
  useEffect(() => {
    const fetchFlights = async () => {
      if (!searchData) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`${API_BASE_URL}/offline-flights`);
        const result = await response.json();
        
        if (result.success && result.data) {
          // Filter flights based on search criteria
          const filteredFlights = result.data.filter((flight: Flight) => {
            // Check if From city matches (case insensitive)
            const fromCityMatch = !searchData.fromCity || 
              flight.from_city?.toLowerCase() === searchData.fromCity?.name?.toLowerCase();
            
            // Check if To city matches (case insensitive)
            const toCityMatch = !searchData.toCity || 
              flight.to_city?.toLowerCase() === searchData.toCity?.name?.toLowerCase();
            
            // Check if departure date matches (compare dates without time)
            const flightDepartureDate = flight.departure_date ? new Date(flight.departure_date) : null;
            const searchDepartureDate = searchData.departureDate;
            
            let dateMatch = true;
            if (flightDepartureDate && searchDepartureDate) {
              // Compare only year, month, day
              const flightDateStr = format(flightDepartureDate, 'yyyy-MM-dd');
              const searchDateStr = format(searchDepartureDate, 'yyyy-MM-dd');
              dateMatch = flightDateStr === searchDateStr;
            }

            // Check booking type match
            const searchTripType = searchData.tripType === 'one-way' ? 'oneWay' : 'roundTrip';
            const bookingTypeMatch = flight.booking_type === searchTripType;

            // For round trip, also check return date if needed
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

  // Format time from HH:MM:SS to HH:MM
  const formatTime = (timeString: string) => {
    if (!timeString) return 'N/A';
    return timeString.substring(0, 5);
  };

  // Format price with commas
  const formatPrice = (price: string) => {
    if (!price) return '0';
    return parseInt(price).toLocaleString('en-IN');
  };

  return (
    <div className="min-h-screen bg-[#FFEBEE]">
      <div className="bg-gray-100 min-h-screen p-4">
        <div className="max-w-7xl mx-auto">
         
          {/* Search Summary */}
          {searchData && (
            <div className="bg-white rounded-xl shadow p-4 mb-6">
              <div className="flex items-center gap-4 text-sm flex-wrap">
                <span className="font-semibold">{searchData.fromCity?.code} → {searchData.toCity?.code}</span>
                <span>|</span>
                <span>{format(searchData.departureDate, "dd MMM yyyy")}</span>
                {searchData.returnDate && (
                  <>
                    <span>-</span>
                    <span>{format(searchData.returnDate, "dd MMM yyyy")}</span>
                  </>
                )}
                <span>|</span>
                <span>{searchData.travellers?.adults + searchData.travellers?.children + searchData.travellers?.infants} Traveller(s)</span>
                <span>|</span>
                <span className="capitalize">{searchData.tripType === 'one-way' ? 'One Way' : 'Round Trip'}</span>
              </div>
            </div>
          )}

          <div className="flex gap-6">
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
                <h3 className="font-semibold mb-2">Stops From {searchData?.fromCity?.name || 'New Delhi'}</h3>
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
                <h3 className="font-semibold mb-2">Departure From {searchData?.fromCity?.name || 'New Delhi'}</h3>
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
                <h3 className="font-semibold mb-2">Arrival at {searchData?.toCity?.name || 'Bengaluru'}</h3>
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

            <div className="w-3/4 space-y-4">
              {/* Loading State */}
              {loading && (
                <div className="bg-white rounded-xl shadow p-8 text-center">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
                  <p className="text-gray-600">Searching for flights...</p>
                </div>
              )}

              {/* Error State */}
              {error && !loading && (
                <div className="bg-white rounded-xl shadow p-8 text-center">
                  <p className="text-red-600 mb-4">{error}</p>
                  <button 
                    onClick={onBack}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Back to Search
                  </button>
                </div>
              )}

              {/* No Results State */}
              {!loading && !error && flights.length === 0 && (
                <div className="bg-white rounded-xl shadow p-8 text-center">
                  <p className="text-gray-600 mb-4">No flights found matching your criteria.</p>
                  <button 
                    onClick={onBack}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Modify Search
                  </button>
                </div>
              )}

              {/* FLIGHT CARDS */}
              {!loading && !error && flights.map((flight) => (
                <div key={flight.id} className="bg-white rounded-xl shadow p-4">
                  {/* Main Flight Info Row */}
                  <div className="flex justify-between items-center">
                    {/* Left Side: Airline */}
                    <div className="w-1/5">
                      <h4 className="font-semibold">{flight.airline}</h4>
                      <p className="text-sm text-gray-500">{flight.flight_number}</p>
                    </div>

                    {/* Middle: Flight Timeline */}
                    <div className="flex-1 flex flex-col items-center">
                      {/* Time Row */}
                      <div className="flex items-center justify-center w-full mb-3">
                        {/* Departure */}
                        <div className="text-center mr-8">
                          <p className="text-xl font-bold">{formatTime(flight.flight_time)}</p>
                          <p className="text-sm text-gray-500">{flight.from_city}</p>
                        </div>

                        {/* Duration */}
                        <div className="text-center mx-8">
                          <p className="text-sm text-gray-500">{flight.duration}</p>
                          <p className="text-xs text-green-600">{flight.flight_type}</p>
                        </div>

                        {/* Arrival */}
                        <div className="text-center ml-8">
                          <p className="text-xl font-bold">{formatTime(flight.arrival_time)}</p>
                          <p className="text-sm text-gray-500">{flight.to_city}</p>
                        </div>
                      </div>

                      {/* Button Grid - Tabs */}
                      <div className="w-full">
                        <div className="grid grid-cols-3 w-full max-w-md border border-black overflow-hidden">
                          {[
                            "Baggage Allowances",
                            "Meals / Seats", 
                            "Refundable Status"
                          ].map((label, idx) => {
                            const tabId = label.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '');
                            return (
                              <button
                                key={label}
                                onClick={() => {
                                  if (activeTab === tabId) {
                                    setActiveTab(null);
                                  } else {
                                    setActiveTab(tabId);
                                  }
                                }}
                                className={`px-2 py-2 text-[10px] xs:text-xs sm:text-sm font-semibold text-center whitespace-nowrap
                                  ${idx < 2 ? "border-r border-black" : ""} transition cursor-pointer
                                  ${
                                    activeTab === tabId
                                      ? "bg-[#A72703] text-white"
                                      : "bg-[#FFE797] text-gray-800 hover:bg-[#FFD700]"
                                  }`}
                              >
                                {label}
                              </button>
                            );
                          })}
                        </div>

                        {/* Full Width Content Row */}
                        {activeTab && (
                          <div className="w-full max-w-md border border-black bg-[#FFEBEE]">
                            <div className="px-2 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base">
                              {activeTab === "baggage-allowances" && (
                                <div>
                                  <h4 className="font-semibold mb-2">Baggage Allowance</h4>
                                  <p>{flight.baggage_allowance || 'Standard baggage allowance applies'}</p>
                                </div>
                              )}
                              {activeTab === "meals-seats" && (
                                <div>
                                  <h4 className="font-semibold mb-2">Meals & Seats</h4>
                                  <p>{flight.meals_seat_description || 'Standard seating, meals available'}</p>
                                  {flight.meals_included === 1 && (
                                    <p className="text-green-600 mt-1">✓ Meals included in fare</p>
                                  )}
                                </div>
                              )}
                              {activeTab === "refundable-status" && (
                                <div>
                                  <h4 className="font-semibold mb-2">Refundable Status</h4>
                                  <p>{flight.refundable_status_description || 'Standard cancellation policy applies'}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right Side: Price + Buttons */}
                    <div className="w-1/4 flex flex-col items-end">
                      <div className="text-right mb-3">
                        <p className="text-xl font-bold text-gray-800">₹ {formatPrice(flight.price_per_adult)}</p>
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
            <FlightResults searchData={searchData} onBack={handleBackToSearch} />
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default FlightSearch;