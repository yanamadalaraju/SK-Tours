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
  MapPin
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Static data
const cities = [
  { code: "DEL", name: "New Delhi", airport: "Indira Gandhi International Airport" },
  { code: "BOM", name: "Mumbai", airport: "Chhatrapati Shivaji International Airport" },
  { code: "BLR", name: "Bengaluru", airport: "Bengaluru International Airport" },
  { code: "MAA", name: "Chennai", airport: "Chennai International Airport" },
  { code: "HYD", name: "Hyderabad", airport: "Rajiv Gandhi International Airport" },
  { code: "CCU", name: "Kolkata", airport: "Netaji Subhas Chandra Bose International Airport" },
  { code: "GOI", name: "Goa", airport: "Dabolim Airport" },
  { code: "PNQ", name: "Pune", airport: "Pune International Airport" },
];

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

// Traveller Selector
const TravellerSelector = ({ 
  travellers, 
  onTravellersChange 
}: { 
  travellers: TravellerCount; 
  onTravellersChange: (travellers: TravellerCount) => void 
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const totalTravellers = travellers.adults + travellers.children + travellers.infants;

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
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full h-full text-left px-4 py-3 bg-white hover:bg-gray-50 transition-colors group border-l border-gray-200"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Travellers & Class</p>
            <p className="font-semibold text-gray-900">
              {totalTravellers} Traveller{totalTravellers !== 1 ? "s" : ""}
            </p>
            <p className="text-xs text-gray-500">Economy</p>
          </div>
          <ChevronDown className={cn(
            "w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors transform",
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
            onClick={() => setOpen(false)}
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
  disabled 
}: { 
  label: string;
  selectedDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
  minDate?: Date;
  disabled?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => !disabled && setOpen(!open)}
        disabled={disabled}
        className={cn(
          "w-full h-full text-left px-4 py-3 bg-white hover:bg-gray-50 transition-colors group border-l border-gray-200",
          disabled && "opacity-50 cursor-not-allowed hover:bg-white"
        )}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <CalendarIcon className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
            {selectedDate ? (
              <>
                <p className="font-semibold text-gray-900">
                  {format(selectedDate, "dd MMM''yy")}
                </p>
                <p className="text-xs text-gray-500">
                  {format(selectedDate, "EEEE")}
                </p>
              </>
            ) : (
              <p className="text-gray-500">Select Date</p>
            )}
          </div>
          <ChevronDown className={cn(
            "w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors transform",
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
  showTripTypeButtons = false,
  tripType,
  onTripTypeChange
}: { 
  label: string;
  selectedCity: City | null;
  onCitySelect: (city: City) => void;
  excludeCity?: City | null;
  isFrom?: boolean;
  showTripTypeButtons?: boolean;
  tripType?: "one-way" | "round-trip";
  onTripTypeChange?: (type: "one-way" | "round-trip") => void;
}) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredCities = cities.filter(
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
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "w-full h-full text-left px-4 py-3 bg-white hover:bg-gray-50 transition-colors group",
          !isFrom && "border-l border-gray-200"
        )}
      >
        <div className="flex items-center gap-3">
          {showTripTypeButtons && tripType && onTripTypeChange && (
            <div className="flex flex-col gap-2 mr-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onTripTypeChange("one-way");
                }}
                className={cn(
                  "px-3 py-1 rounded border text-xs font-medium transition-all duration-200 whitespace-nowrap",
                  tripType === "one-way" 
                    ? "border-orange-600 bg-orange-50 text-orange-800" 
                    : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                )}
              >
                One Way
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onTripTypeChange("round-trip");
                }}
                className={cn(
                  "px-3 py-1 rounded border text-xs font-medium transition-all duration-200 whitespace-nowrap",
                  tripType === "round-trip" 
                    ? "border-orange-600 bg-orange-50 text-orange-800" 
                    : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                )}
              >
                Round Trip
              </button>
            </div>
          )}
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
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
              <p className="text-gray-500">Select city or airport</p>
            )}
          </div>
          <ChevronDown className={cn(
            "w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors transform",
            open && "rotate-180"
          )} />
        </div>
      </button>

      {open && (
        <div className="fixed md:absolute top-full left-0 mt-2 w-96 bg-white border border-gray-200 shadow-2xl rounded-xl z-[100] overflow-hidden">
          <div className="p-3 border-b">
            <input
              type="text"
              placeholder="From which city?"
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

// Main Component
const FlightSearch = () => {
  const [tripType, setTripType] = useState<"one-way" | "round-trip">("round-trip");
  const [fromCity, setFromCity] = useState<City>(cities[0]);
  const [toCity, setToCity] = useState<City>(cities[2]);
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

  const swapCities = () => {
    setFromCity(toCity);
    setToCity(fromCity);
  };

  const handleSearch = () => {
    if (!fromCity || !toCity || !departureDate) return;
    alert(`Searching:\nFrom: ${fromCity.name} (${fromCity.code})\nTo: ${toCity.name} (${toCity.code})\nDepart: ${format(departureDate, "dd MMM yyyy")}${returnDate && tripType === "round-trip" ? `\nReturn: ${format(returnDate, "dd MMM yyyy")}` : ""}\nTravellers: ${travellers.adults + travellers.children + travellers.infants}`);
  };

  const isSearchEnabled = !!fromCity && !!toCity && !!departureDate;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/70 to-white">
      {/* Header */}
      <div className="pt-8 pb-28 bg-gradient-to-r from-blue-700 to-blue-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <Plane className="w-8 h-8 text-white" />
            <h1 className="text-2xl font-bold text-white">Flight Booking</h1>
          </div>
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Book Flights at Lowest Prices
            </h2>
            <p className="text-white/90 text-lg">Search & compare across 500+ airlines</p>
          </div>
        </div>
      </div>

      {/* Search Form */}
      <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-10">  
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200">
          {/* Main Inputs */}
          <div className="flex flex-col md:flex-row items-stretch divide-y md:divide-y-0 md:divide-x divide-gray-200">
            <div className="flex-1 min-w-0">
              <CitySelector
                label="FROM"
                selectedCity={fromCity}
                onCitySelect={setFromCity}
                excludeCity={toCity}
                isFrom={true}
                showTripTypeButtons={true}
                tripType={tripType}
                onTripTypeChange={setTripType}
              />
            </div>

            <div className="hidden md:flex items-center justify-center px-2 bg-white relative">
              <button
                onClick={swapCities}
                className="absolute -left-5 z-10 w-11 h-11 rounded-full bg-white border-2 border-gray-300 text-gray-600 flex items-center justify-center hover:bg-gray-50 hover:border-orange-400 transition-all shadow-md"
              >
                <ArrowRightLeft className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 min-w-0">
              <CitySelector
                label="TO"
                selectedCity={toCity}
                onCitySelect={setToCity}
                excludeCity={fromCity}
                isFrom={false}
              />
            </div>

            <div className="flex-1 min-w-0">
              <DateSelector
                label="DEPARTURE"
                selectedDate={departureDate}
                onDateSelect={setDepartureDate}
                minDate={new Date()}
              />
            </div>

            <div className="flex-1 min-w-0">
              <DateSelector
                label="RETURN"
                selectedDate={returnDate}
                onDateSelect={setReturnDate}
                minDate={departureDate}
                disabled={tripType === "one-way"}
              />
            </div>

            <div className="flex-1 min-w-0">
              <TravellerSelector travellers={travellers} onTravellersChange={setTravellers} />
            </div>
               <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleSearch}
              disabled={!isSearchEnabled}
              className={cn(
                "w-full py-4 bg-orange-600 hover:bg-blue-700 text-white font-bold text-lg rounded-xl transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed",
                isSearchEnabled && "hover:shadow-xl hover:scale-[1.01]"
              )}
            >
              <Search className="w-6 h-6" />
              Search Flights
            </button>
          </div>
          </div>

          {/* Search Button */}
       
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Search hundreds of flights at the best prices
        </p>
      </div>
    </div>
  );
};

export default FlightSearch;