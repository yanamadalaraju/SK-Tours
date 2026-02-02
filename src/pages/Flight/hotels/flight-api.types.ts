// types/flight-api.types.ts

export interface Airport {
  airport_name: string;
  airport_code: string;
  city_name: string;
  city_code: string;
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
  available_seats: number;
  total_payable_price: number;
  per_adult_child_price: number;
  per_infant_price: number;
  price_breakup: {
    base_fare: number;
    fee_taxes: number;
    service_charge: number;
    discount: number;
  };
  static: string;
}

export interface FareQuoteResponse {
  errorCode: number;
  data: {
    per_adult_child_price: number;
    per_infant_price: number;
    flight_id: string;
    available_seats: number;
    total_payable_price: number;
  };
}

export interface BookingResponse {
  errorCode: number;
  data: {
    reference_id: string;
  };
}

export interface BookingDetails {
  reference_id: string;
  onward_date: string;
  return_date: string | null;
  adult: number;
  children: number;
  infant: number;
  total_book_seats: number;
  seat_book_status: boolean;
  payment_status: boolean;
  booking_date: string;
  total_amount: number;
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
}

export interface ApiResponse<T> {
  replyCode: string | number;
  replyMsg: string;
  data: T;
}




// types/flight-api.types.ts

// ... existing interfaces ...

export interface Sector {
  dep_airport_name: string;
  dep_airport_code: string;
  arr_airport_code: string;
  dep_city_name: string;
  dep_city_code: string;
  arr_city_name: string;
  arr_city_code: string;
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
  departure_airport_name?: string;
  departure_airport_code: string;
  departure_terminal_no: string;
  departure_date: string;
  departure_time: string;
  arrival_city_name: string;
  arrival_city_code: string;
  arrival_airport_code: string;
  arrival_terminal_no: string;
  arrival_date: string;
  arrival_time: string;
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

export interface RoundTripFlightSearchResult extends FlightSearchResult {
  international_flight_staus: number;
  no_of_stop: number;
  stop_data: StopData[];
  return_flight_data: ReturnFlightData;
  return_no_of_stop: number;
  return_stop_data: StopData[];
  onward_connecting: ConnectingFlight[];
  return_connecting: ConnectingFlight[];
  FareClasses: Array<{
    Class_Code: string;
    Class_Desc: string;
  }>;
  ProductClass: string;
}

export interface CheckBookingResponse {
  book_status: number;
  reference_id: string;
}

export interface ReturnDateResponse {
  return_date: string;
}