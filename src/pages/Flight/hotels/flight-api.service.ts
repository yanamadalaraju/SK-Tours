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

// Get environment variables with VITE_ prefix
const API_BASE_URL = import.meta.env.VITE_TEST_FLIGHT_API_BASE_URL || 'https://devapi.flightapi.co.in/v1/fbapi/';
const TOKEN = import.meta.env.VITE_TEST_FLIGHT_API_TOKEN || '3-1-NEWTEST-dmjkwj78BJHk8';
const END_USER_IP = import.meta.env.VITE_TEST_FLIGHT_API_END_USER_IP || '183.83.43.117';

// Log configuration in development mode
if (import.meta.env.DEV) {
  console.log('Flight API Configuration:', {
    baseURL: API_BASE_URL,
    token: TOKEN ? '***' : 'not set',
    endUserIP: END_USER_IP,
    environment: 'TEST'
  });
}

class FlightApiService {
  private headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // Helper method to get base request body
  private getBaseRequestBody(additionalParams: Record<string, any> = {}): Record<string, any> {
    return {
      end_user_ip: END_USER_IP,
      token: TOKEN,
      ...additionalParams
    };
  }

  // Helper method to handle API responses
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }

  // Departure City List
  async getDepartureCities(tripType: number = 0): Promise<Airport[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/dep_city`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(this.getBaseRequestBody({
          trip_type: tripType
        }))
      });

      const data: ApiResponse<Airport[]> = await this.handleResponse(response);
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
        body: JSON.stringify(this.getBaseRequestBody({
          trip_type: tripType,
          city_code: cityCode
        }))
      });

      const data: ApiResponse<Airport[]> = await this.handleResponse(response);
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
        body: JSON.stringify(this.getBaseRequestBody({
          trip_type: tripType
        }))
      });

      const data: ApiResponse<Sector[]> = await this.handleResponse(response);
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
        body: JSON.stringify(this.getBaseRequestBody({
          trip_type: tripType,
          dep_city_code: depCityCode,
          arr_city_code: arrCityCode
        }))
      });

      const data: ApiResponse<{ onward_date: string }[]> = await this.handleResponse(response);
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
        body: JSON.stringify(this.getBaseRequestBody({
          trip_type: params.tripType,
          dep_city_code: params.depCityCode,
          arr_city_code: params.arrCityCode,
          onward_date: params.onwardDate
        }))
      });

      const data: ApiResponse<{ return_date: string }[]> = await this.handleResponse(response);
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
        body: JSON.stringify(this.getBaseRequestBody({
          trip_type: params.tripType || 0,
          dep_city_code: params.depCityCode,
          arr_city_code: params.arrCityCode,
          onward_date: params.onwardDate,
          return_date: params.returnDate || '',
          adult: params.adult,
          children: params.children || 0,
          infant: params.infant || 0
        }))
      });

      return await this.handleResponse(response);
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
      const requestBody = this.getBaseRequestBody({
        id: params.id,
        adult_children: params.adultChildren,
        infant: params.infant || 0,
        onward_date: params.onwardDate,
        static: params.staticValue
      });

      if (params.returnDate) {
        requestBody.return_date = params.returnDate;
      }

      const response = await fetch(`${API_BASE_URL}/fare_quote`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(requestBody)
      });

      return await this.handleResponse(response);
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
        body: JSON.stringify(this.getBaseRequestBody({
          dep_city_code: params.depCityCode,
          arr_city_code: params.arrCityCode,
          departure_date: params.departureDate,
          first_name: params.firstName,
          last_name: params.lastName
        }))
      });

      return await this.handleResponse(response);
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
      const requestBody = this.getBaseRequestBody({
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
        total_amount: params.totalAmount
      });

      const response = await fetch(`${API_BASE_URL}/book`, {
        method: 'POST',
        headers: {
          ...this.headers,
          'Authorization': `Bearer ${params.authToken}`,
          'x-api-key': params.apiKey
        },
        body: JSON.stringify(requestBody)
      });

      return await this.handleResponse(response);
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
        body: JSON.stringify(this.getBaseRequestBody({
          reference_id: params.referenceId,
          transaction_id: params.transactionId || ''
        }))
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error('Error in getBookingDetails:', error);
      return { replyCode: 1, data: {} as BookingDetails };
    }
  }

  // Method to switch environment
  setEnvironment(env: 'test' | 'production') {
    if (env === 'production') {
      return {
        baseURL: import.meta.env.VITE_PROD_FLIGHT_API_BASE_URL,
        token: import.meta.env.VITE_PROD_FLIGHT_API_TOKEN,
        endUserIP: import.meta.env.VITE_PROD_FLIGHT_API_END_USER_IP
      };
    }
    return {
      baseURL: API_BASE_URL,
      token: TOKEN,
      endUserIP: END_USER_IP
    };
  }
}

export default new FlightApiService();