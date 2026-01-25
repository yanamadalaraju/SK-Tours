// types.ts

interface Airport {
  city_name?: string;
  cityName?: string;
  name?: string;
  airport_code?: string;
  airportCode?: string;
  code?: string;
  airport_name?: string;
  airportName?: string;
  city_code?: string;
}
export interface DateResponse {
  onward_date?: string;
  return_date?: string;
}

export interface DepartureResponse {
  replyCode: string;
  replyMsg: string;
  data: Airport[];
}

export interface DateListResponse {
  replyCode: string;
  replyMsg: string;
  data: DateResponse[];
}

export interface StopData {
  city_name: string;
  city_code: string;
  stop_duration: string;
  arrival_time: string;
  arrival_date: string;
  arrival_terminal: string;
  departure_time: string;
  departure_date: string;
  departure_terminal: string;
}

export interface ConnectingFlight {
  flight_number: string;
  airline_name: string;
  airline_code: string;
  departure_city_name: string;
  departure_city_code: string;
  departure_airport_name: string;
  departure_airport_code: string;
  departure_terminal_no: string;
  departure_date: string;
  departure_time: string;
  arrival_city_name: string;
  arrival_city_code: string;
  arrival_airport_code: string;
  arrival_airport_name?: string;
  arrival_terminal_no: string;
  arrival_date: string;
  arrival_time: string;
}

export interface FareClass {
  Class_Code: string;
  Class_Desc: string;
}

export interface ReturnFlightData {
  return_flight_number: string;
  return_trip_duration: number;
  return_dep_date: string;
  return_dep_city_name: string;
  return_dep_city_code: string;
  return_dep_airport_name: string;
  return_dep_airport_code: string;
  return_dep_terminal_no: string;
  return_dep_time: string;
  return_arr_date: string;
  return_arr_city_name: string;
  return_arr_city_code: string;
  return_arr_airport_name: string;
  return_arr_airport_code: string;
  return_arr_terminal_no: string;
  return_arr_time: string;
}

export interface PriceBreakup {
  base_fare: number;
  fee_taxes?: number;
  service_charge?: number;
  discount?: number;
}

export interface FlightSearchResult {
  id: string;
  flight_number: string;
  airline_name: string;
  airline_code: string;
  dep_city_name: string;
  dep_city_code: string;
  dep_airport_name: string;
  dep_airport_code: string;
  dep_terminal_no: string;
  onward_date: string;
  dep_time: string;
  arr_city_name: string;
  arr_city_code: string;
  arr_airport_name: string;
  arr_airport_code: string;
  arr_terminal_no: string;
  arr_time: string;
  duration: string;
  trip_type: 0 | 1; // 0 = one-way, 1 = round trip
  international_flight_staus: number;
  check_in_baggage_adult: string;
  check_in_baggage_children: string;
  check_in_baggage_infant: string;
  cabin_baggage_adult: string;
  cabin_baggage_children: string;
  cabin_baggage_infant: string;
  available_seats: number;
  total_payable_price: number;
  per_adult_child_price: number;
  per_infant_price: number;
  price_breakup: PriceBreakup;
  no_of_stop: number;
  stop_data: StopData[];
  return_flight_data?: ReturnFlightData;
  return_no_of_stop: number;
  return_stop_data: StopData[];
  onward_connecting: ConnectingFlight[];
  return_connecting: ConnectingFlight[];
  static: string;
  FareClasses: FareClass[];
  ProductClass: string;
  flight_id?: string;
  dep_date?: string;
  arr_date?: string;
}

export interface SearchResponse {
  errorCode: number;
  data: FlightSearchResult[];
  booking_token_id: string;
  replyMsg?: string;
}

export interface PassengerDetails {
  id: number;
  type: 'adult' | 'child' | 'infant';
  name: string;
  firstName: string;
  middleName: string;
  lastName: string;
  age: number;
  dob: string;
  gender: 'Mr' | 'Mrs' | 'Ms' | 'Mstr';
  seatNumber?: string;
  returnSeatNumber?: string;
  requiresSeat: boolean;
  icon?: React.ReactNode;
  isInfantOnLap?: boolean;
  lapOfPassengerId?: number;
  passportNo: string;
  passportExpireDate: string;
}

export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
}

export type SearchStep = 'search' | 'seat-selection' | 'confirmation';

// Seat Selection Types
export interface Seat {
  id: string;
  row: number;
  column: string;
  status: 'available' | 'selected' | 'booked' | 'blocked' | 'infant_lap';
  price: number;
  type: 'window' | 'aisle' | 'middle';
  seatNumber: string;
  passengerType?: 'adult' | 'child' | 'infant';
  passengerId?: number;
  flightType: 'onward' | 'return';
}

export interface SeatSelectionProps {
  flightData: FlightSearchResult;
  fareQuoteData: any;
  passengers: {
    adults: number;
    children: number;
    infants: number;
  };
  passengerDetailsFromSearch?: PassengerDetails[];
  onBack: () => void;
  onBookingComplete: (bookingResponse: any) => void;
  bookingTokenId: string;
  token: string;
  endUserIp: string;
  staticParam: string;
  contactInfo?: ContactInfo;
}

// Fare Quote Response
export interface FareQuoteResponse {
  errorCode: number;
  data: {
    per_adult_child_price: number;
    per_infant_price: number;
    flight_id: string;
    available_seats: number;
    total_payable_price: number;
  };
  message?: string;
  replyMsg?: string;
}

// Booking Response Types
export interface BookingResponse {
  errorCode: number;
  data: {
    reference_id: string;
    booking_id?: string;
    transaction_id?: string;
  };
  message?: string;
}

export interface BookingDetailsData {
  reference_id: string;
  onward_date: string;
  return_date: string | null;
  adult: number;
  children: number;
  infant: number;
  total_book_seats: number;
  seat_book_status: boolean;
  payment_status: boolean;
  special_Information: string | null;
  booking_date: string;
  total_amount: number;
  return_flight: number;
  infant_price: number;
  flight_pnrs: string;
  contact_name: string;
  contact_email: string;
  contact_number: string;
  onward: {
    depeparture_city_name: string;
    depeparture_city_code: string;
    arrival_city_name: string;
    arrival_city_code: string;
    departure_date: string;
    departure_time: string;
    departure_terminal_no_id: string;
    arrival_date: string;
    arrival_time: string;
    arrival_terminal_no_id: string;
    stop_count: number;
    airline_name: string;
    airline_code: string;
    flight_number: string;
    airline_logo: string;
  };
  return: any;
  price_breakup: {
    base_price: number;
    fees_taxes: number;
    service_charge: number;
    discount: number;
  };
  baggage: {
    checkin_baggages_adult: string;
    checkin_baggages_children: string;
    checkin_baggages_infant: string;
    cabin_baggages_adult: string;
    cabin_baggages_children: string;
    cabin_baggages_infant: string;
    disclaimer: string;
  };
  travellers: Array<{
    first_name: string;
    middle_name: string | null;
    last_name: string;
    ticket_price: number;
    gender: string;
    dob: string;
    status: number;
    age: number;
    passport_no: string | null;
    passport_expire_date: string | null;
    total_amount: number;
  }>;
  flight_stop_details: any[];
  return_flight_stop_details: any[];
}

export interface BookingDetailsResponse {
  replyCode: number;
  data: BookingDetailsData;
  message?: string;
}

// Flight Traveller Details for Booking API
export interface FlightTravellerDetail {
  gender: 'Mr' | 'Mrs' | 'Ms' | 'Mstr';
  first_name: string;
  middle_name: string;
  last_name: string;
  age: number;
  dob: string;
  passport_no: string;
  passport_expire_date: string;
}

// Booking Payload Types
export interface BookingPayload {
  id: string;
  onward_date: string;
  return_date: string;
  adult: number;
  children: number;
  infant: number;
  dep_city_code: string;
  arr_city_code: string;
  total_book_seats: number;
  contact_name: string;
  contact_email: string;
  contact_number: string;
  static: string;
  flight_traveller_details: FlightTravellerDetail[];
  booking_token_id: string;
  total_amount: number;
  end_user_ip: string;
  token: string;
}

// Booking Details Payload
export interface BookingDetailsPayload {
  reference_id: string;
  transaction_id: string;
  end_user_ip: string;
  token: string;
}

// Seat Price Calculation
export interface SeatPriceCalculation {
  basePrice: number;
  rowPremium: number;
  seatTypePremium: number;
  exitRowPremium: number;
  total: number;
}

// Seat Layout Configuration
export interface SeatLayoutConfig {
  rows: number;
  columns: string[];
  seatTypes: ('window' | 'aisle' | 'middle')[];
  exitRows: number[];
}

// Passenger with Seat Assignment
export interface PassengerWithSeat extends PassengerDetails {
  onwardSeat?: Seat;
  returnSeat?: Seat;
}

// Seat Selection State
export interface SeatSelectionState {
  onwardSeats: Seat[];
  returnSeats: Seat[];
  selectedOnwardSeats: Seat[];
  selectedReturnSeats: Seat[];
  loading: boolean;
  bookingLoading: boolean;
  totalPrice: number;
  activePassengerId: number | null;
  activeFlightType: 'onward' | 'return';
  passengerDetails: PassengerDetails[];
  bookingError: string | null;
  editingContact: boolean;
  contactDetails: ContactInfo;
  showPassengerDetails: boolean;
  editingPassengerId: number | null;
  editingPassengerData: Partial<PassengerDetails>;
}

// Search State
export interface SearchState {
  from: string;
  to: string;
  fromCode: string;
  toCode: string;
  showDepart: boolean;
  showReturn: boolean;
  showTravellers: boolean;
  showFromSearch: boolean;
  showToSearch: boolean;
  departDate: string;
  returnDate: string;
  departDateApi: string;
  returnDateApi: string;
  adults: number;
  children: number;
  infants: number;
  travelClass: string;
  showResults: boolean;
  currentMonth: Date;
  selectedDate: Date | null;
  fareType: string;
  activeFilters: string[];
  showMoreFilters: boolean;
  departureCities: Airport[];
  arrivalCities: Airport[];
  onwardDates: string[];
  returnDates: string[];
  loadingDepartures: boolean;
  loadingArrivals: boolean;
  loadingOnwardDates: boolean;
  loadingReturnDates: boolean;
  searchFromQuery: string;
  searchToQuery: string;
  filteredDepartures: Airport[];
  filteredArrivals: Airport[];
  searchResults: FlightSearchResult[];
  loadingSearch: boolean;
  searchError: string | null;
  bookingTokenId: string;
  tripType: "0" | "1";
  currentStep: SearchStep;
  selectedFlightForSeats: FlightSearchResult | null;
  fareQuoteData: any;
  loadingSeats: boolean;
  bookingData: BookingDetailsData | null;
  bookingReferenceId: string;
  passengerDetails: PassengerDetails[];
  contactDetails: ContactInfo;
}

// API Request Payloads
export interface DepartureCitiesPayload {
  trip_type: number;
  end_user_ip: string;
  token: string;
}

export interface ArrivalCitiesPayload extends DepartureCitiesPayload {
  city_code: string;
}

export interface OnwardDatesPayload extends DepartureCitiesPayload {
  dep_city_code: string;
  arr_city_code: string;
}

export interface ReturnDatesPayload extends OnwardDatesPayload {
  onward_date: string;
}

export interface SearchPayload extends DepartureCitiesPayload {
  dep_city_code: string;
  arr_city_code: string;
  onward_date: string;
  return_date: string;
  adult: number;
  children: number;
  infant: number;
}

export interface FareQuotePayload {
  id: string;
  end_user_ip: string;
  token: string;
  adult_children: number;
  infant: number;
  onward_date: string;
  static: string;
  booking_token_id: string;
  return_date?: string;
}

// Flight Booking Complete Response
export interface BookingCompleteResponse {
  bookingData: BookingDetailsData;
  referenceId: string;
  passengerDetails: PassengerDetails[];
  contactDetails: ContactInfo;
}

// Styles Interface
export interface Styles {
  cardStyle: React.CSSProperties;
  tabStyle: React.CSSProperties;
  row: React.CSSProperties;
  boxStyle: React.CSSProperties;
  swapStyle: React.CSSProperties;
  citySearchModal: React.CSSProperties;
  searchInput: React.CSSProperties;
  cityList: React.CSSProperties;
  cityItem: React.CSSProperties;
  closeBtn: React.CSSProperties;
  searchBtn: React.CSSProperties;
  fareTypeBtn: React.CSSProperties;
  activeFareTypeBtn: React.CSSProperties;
  resultsWrap: React.CSSProperties;
  filtersSection: React.CSSProperties;
  filterBtn: React.CSSProperties;
  activeFilterBtn: React.CSSProperties;
  priceRangeStyle: React.CSSProperties;
  flightsContainer: React.CSSProperties;
  flightCard: React.CSSProperties;
  selectBtn: React.CSSProperties;
  modalOverlay: React.CSSProperties;
  calendarModal: React.CSSProperties;
  calendarHeader: React.CSSProperties;
  navButton: React.CSSProperties;
  weekDaysStyle: React.CSSProperties;
  weekDayStyle: React.CSSProperties;
  calendarGrid: React.CSSProperties;
  emptyDayStyle: React.CSSProperties;
  dayStyle: React.CSSProperties;
  modal: React.CSSProperties;
  counterRow: React.CSSProperties;
  counterButton: React.CSSProperties;
  classSelect: React.CSSProperties;
  stepContainer: React.CSSProperties;
}

// Component Props
export interface FlightHotelsProps {}

export interface BookingConfirmationProps {
  bookingData: BookingDetailsData;
  referenceId: string;
  passengerDetails: PassengerDetails[];
  contactDetails: ContactInfo;
  onBack: () => void;
}

// Airport Selection Modal Props
export interface AirportSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  airports: Airport[];
  loading: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelect: (airport: Airport) => void;
  title: string;
}