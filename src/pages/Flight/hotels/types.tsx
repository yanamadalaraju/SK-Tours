// Define types for API responses
export interface Airport {
  airport_name: string;
  airport_code: string;
  city_name: string;
  city_code: string;
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
  arr_date: string;
  arr_time: string;
  duration: string;
  trip_type: number;
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
}

export interface SearchResponse {
  errorCode: number;
  data: FlightSearchResult[];
  booking_token_id: string;
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
  icon: React.ReactNode;
  isInfantOnLap?: boolean;
  lapOfPassengerId?: number;
  passportNo?: string;
  passportExpireDate?: string;
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
  flightData: any; // You can make this more specific if needed
  fareQuoteData: any; // You can make this more specific if needed
  passengers: {
    adults: number;
    children: number;
    infants: number;
  };
  passengerDetailsFromSearch?: any[]; // You can make this more specific if needed
  onBack: () => void;
  onBookingComplete: (bookingResponse: any) => void;
  bookingTokenId: string;
  token: string;
  endUserIp: string;
  staticParam: string;
  contactInfo?: ContactInfo;
}

// Booking Response Types
export interface BookingResponse {
  errorCode: number;
  data: {
    reference_id: string;
    // Add other booking response fields as needed
  };
}

export interface BookingDetailsResponse {
  replyCode: number;
  data: any; // You can make this more specific if needed
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
