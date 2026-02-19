

// services/flight-api.service.ts
import { 
  Airport, 
  FlightSearchResult, 
  FareQuoteResponse, 
  BookingResponse, 
  BookingDetails,
  ApiResponse,
  Sector,
  RoundTripFlightSearchResult,
  CheckBookingResponse,
  ReturnDateResponse
} from './flight-api.types';

const API_BASE_URL = 'https://api.fdking.com/v1/fbapi/';
const TOKEN = '1-20618-SKTT-cnjks678HBJ76uhj';
const END_USER_IP = '192.168.1.12';

class FlightApiService {
  private headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // Departure City List
  async getDepartureCities(tripType: number = 0): Promise<Airport[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/dep_city`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          trip_type: tripType,
          end_user_ip: END_USER_IP,
          token: TOKEN
        })
      });

      const data: ApiResponse<Airport[]> = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error in getDepartureCities:', error);
      return [];
    }
  }

  // Arrival City List
  async getArrivalCities(cityCode: string, tripType: number = 0): Promise<Airport[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/arr_city`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          trip_type: tripType,
          end_user_ip: END_USER_IP,
          token: TOKEN,
          city_code: cityCode
        })
      });

      const data: ApiResponse<Airport[]> = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error in getArrivalCities:', error);
      return [];
    }
  }

  // Sector List
  async getSectors(tripType: number = 0): Promise<Sector[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/sector`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          trip_type: tripType,
          end_user_ip: END_USER_IP,
          token: TOKEN
        })
      });

      const data: ApiResponse<Sector[]> = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error in getSectors:', error);
      return [];
    }
  }

  // Onward Dates
  async getOnwardDates(depCityCode: string, arrCityCode: string, tripType: number = 0): Promise<{ onward_date: string }[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/onward_date`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          trip_type: tripType,
          end_user_ip: END_USER_IP,
          token: TOKEN,
          dep_city_code: depCityCode,
          arr_city_code: arrCityCode
        })
      });

      const data: ApiResponse<{ onward_date: string }[]> = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error in getOnwardDates:', error);
      return [];
    }
  }

  // Return Dates
  async getReturnDates(params: {
    depCityCode: string;
    arrCityCode: string;
    onwardDate: string;
    tripType: number;
  }): Promise<{ return_date: string }[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/return_date`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          trip_type: params.tripType,
          end_user_ip: END_USER_IP,
          token: TOKEN,
          dep_city_code: params.depCityCode,
          arr_city_code: params.arrCityCode,
          onward_date: params.onwardDate
        })
      });

      const data: ApiResponse<{ return_date: string }[]> = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error in getReturnDates:', error);
      return [];
    }
  }

  // Search Flights
  async searchFlights(params: {
    depCityCode: string;
    arrCityCode: string;
    onwardDate: string;
    returnDate?: string;
    adult: number;
    children?: number;
    infant?: number;
    tripType?: number;
  }): Promise<{ 
    data: (FlightSearchResult | RoundTripFlightSearchResult)[]; 
    booking_token_id: string;
    errorCode?: number;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/search`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          trip_type: params.tripType || 0,
          end_user_ip: END_USER_IP,
          token: TOKEN,
          dep_city_code: params.depCityCode,
          arr_city_code: params.arrCityCode,
          onward_date: params.onwardDate,
          return_date: params.returnDate || '',
          adult: params.adult,
          children: params.children || 0,
          infant: params.infant || 0
        })
      });

      return await response.json();
    } catch (error) {
      console.error('Error in searchFlights:', error);
      return { data: [], booking_token_id: '' };
    }
  }

  // Fare Quote
  async getFareQuote(params: {
    id: string;
    onwardDate: string;
    returnDate?: string;
    staticValue: string;
    adultChildren: number;
    infant?: number;
  }): Promise<FareQuoteResponse> {
    try {
      const requestBody: any = {
        id: params.id,
        end_user_ip: END_USER_IP,
        token: TOKEN,
        adult_children: params.adultChildren,
        infant: params.infant || 0,
        onward_date: params.onwardDate,
        static: params.staticValue
      };

      if (params.returnDate) {
        requestBody.return_date = params.returnDate;
      }

      const response = await fetch(`${API_BASE_URL}/fare_quote`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(requestBody)
      });

      return await response.json();
    } catch (error) {
      console.error('Error in getFareQuote:', error);
      return { errorCode: 1, data: {} as any };
    }
  }

  // Check Booking
  async checkBooking(params: {
    depCityCode: string;
    arrCityCode: string;
    departureDate: string;
    firstName: string;
    lastName: string;
  }): Promise<CheckBookingResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/check_booking`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          end_user_ip: END_USER_IP,
          token: TOKEN,
          dep_city_code: params.depCityCode,
          arr_city_code: params.arrCityCode,
          departure_date: params.departureDate,
          first_name: params.firstName,
          last_name: params.lastName
        })
      });

      return await response.json();
    } catch (error) {
      console.error('Error in checkBooking:', error);
      return { book_status: 0, reference_id: '' };
    }
  }

  // Book Flight
  async bookFlight(params: {
    id: string;
    onwardDate: string;
    returnDate?: string;
    adult: number;
    children?: number;
    infant?: number;
    depCityCode: string;
    arrCityCode: string;
    totalBookSeats: number;
    contactName: string;
    contactEmail: string;
    contactNumber: string;
    staticValue: string;
    bookingTokenId: string;
    totalAmount: number;
    flightTravellerDetails: Array<{
      gender: string;
      first_name: string;
      middle_name?: string;
      last_name: string;
      age: number;
      dob: string;
      passport_no?: string;
      passport_expire_date?: string;
    }>;
    authToken: string;
    apiKey: string;
  }): Promise<BookingResponse> {
    try {
      const requestBody: any = {
        id: params.id,
        onward_date: params.onwardDate,
        return_date: params.returnDate || '',
        adult: params.adult,
        children: params.children || 0,
        infant: params.infant || 0,
        dep_city_code: params.depCityCode,
        arr_city_code: params.arrCityCode,
        total_book_seats: params.totalBookSeats,
        contact_name: params.contactName,
        contact_email: params.contactEmail,
        contact_number: params.contactNumber,
        static: params.staticValue,
        flight_traveller_details: params.flightTravellerDetails,
        booking_token_id: params.bookingTokenId,
        total_amount: params.totalAmount,
        end_user_ip: END_USER_IP,
        token: TOKEN
      };

      const response = await fetch(`${API_BASE_URL}/book`, {
        method: 'POST',
        headers: {
          ...this.headers,
          'Authorization': `Bearer ${params.authToken}`,
          'x-api-key': params.apiKey
        },
        body: JSON.stringify(requestBody)
      });

      return await response.json();
    } catch (error) {
      console.error('Error in bookFlight:', error);
      return { errorCode: 1, data: { reference_id: '' } };
    }
  }

  // Get Booking Details
  async getBookingDetails(params: {
    referenceId: string;
    transactionId?: string;
    authToken: string;
    apiKey: string;
  }): Promise<{ replyCode: number; data: BookingDetails }> {
    try {
      const response = await fetch(`${API_BASE_URL}/booking_details`, {
        method: 'POST',
        headers: {
          ...this.headers,
          'Authorization': `Bearer ${params.authToken}`,
          'x-api-key': params.apiKey
        },
        body: JSON.stringify({
          reference_id: params.referenceId,
          transaction_id: params.transactionId || '',
          end_user_ip: END_USER_IP,
          token: TOKEN
        })
      });

      return await response.json();
    } catch (error) {
      console.error('Error in getBookingDetails:', error);
      return { replyCode: 1, data: {} as BookingDetails };
    }
  } 
}

export default new FlightApiService();