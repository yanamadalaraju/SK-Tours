// components/RoundTripBooking.tsx
import React, { useState, useEffect } from 'react';
import flightApiService from './flight-api.service';
import { RoundTripFlightSearchResult } from './flight-api.types';

interface RoundTripBookingProps {
  flight: RoundTripFlightSearchResult;
  onwardDate: string;
  returnDate: string;
  staticValue: string;
  bookingTokenId: string;
  totalAmount: number;
  adults: number;
  children: number;
  infants: number;
}

const RoundTripBooking: React.FC<RoundTripBookingProps> = ({
  flight,
  onwardDate,
  returnDate,
  staticValue,
  bookingTokenId,
  totalAmount,
  adults,
  children,
  infants
}) => {
  const [loading, setLoading] = useState(false);
  const [bookingReference, setBookingReference] = useState<string | null>(null);
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [step, setStep] = useState(1);
  const [passengers, setPassengers] = useState<Array<{
    type: 'adult' | 'child' | 'infant';
    gender: string;
    firstName: string;
    middleName: string;
    lastName: string;
    age: number;
    dob: string;
    passportNo: string;
    passportExpireDate: string;
  }>>([]);

  const [contactDetails, setContactDetails] = useState({
    name: 'Sunil kumar',
    email: 'sunil.fareboutique@gmail.com',
    phone: '9632587418'
  });

  // Initialize passengers based on booking details
  useEffect(() => {
    const initialPassengers: typeof passengers = [];
    
    // Add adults
    for (let i = 0; i < adults; i++) {
      initialPassengers.push({
        type: 'adult',
        gender: i === 0 ? 'Mr' : 'Mrs',
        firstName: '',
        middleName: '',
        lastName: '',
        age: 35 + i,
        dob: `199${i}-01-10`,
        passportNo: '',
        passportExpireDate: '2026-02-15'
      });
    }
    
    // Add children
    for (let i = 0; i < children; i++) {
      initialPassengers.push({
        type: 'child',
        gender: 'Mstr',
        firstName: '',
        middleName: '',
        lastName: '',
        age: 8 + i,
        dob: `201${i}-06-12`,
        passportNo: '',
        passportExpireDate: '2026-02-15'
      });
    }
    
    // Add infants
    for (let i = 0; i < infants; i++) {
      initialPassengers.push({
        type: 'infant',
        gender: 'Mstr',
        firstName: '',
        middleName: '',
        lastName: '',
        age: 1 + i,
        dob: `202${i}-02-15`,
        passportNo: '',
        passportExpireDate: '2026-02-15'
      });
    }
    
    setPassengers(initialPassengers);
  }, [adults, children, infants]);

  const updatePassenger = (index: number, field: string, value: string) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [field]: value
    };
    setPassengers(updatedPassengers);
  };

  const fetchBookingDetails = async (referenceId: string) => {
    try {
      // Replace with your actual auth token and API key
      const authToken = 'eyJhbGciOiJIUzI1NiIsInR5c...';
      const apiKey = '1FMQKB1639407126571';

      const details = await flightApiService.getBookingDetails({
        referenceId,
        authToken,
        apiKey
      });

      if (details.replyCode === 0) {
        setBookingDetails(details.data);
      }
    } catch (error) {
      console.error('Error fetching booking details:', error);
    }
  };

  const handleBookFlight = async () => {
    // Replace these with actual values from your authentication
    const authToken = 'eyJhbGciOiJIUzI1NiIsInR5c...';
    const apiKey = '1FMQKB1639407126571';

    // Validate all passenger details
    const hasEmptyFields = passengers.some(passenger => 
      !passenger.firstName || !passenger.lastName || !passenger.dob
    );
    
    if (hasEmptyFields) {
      alert('Please fill all passenger details');
      return;
    }

    try {
      setLoading(true);
      
      const flightTravellerDetails = passengers.map(passenger => ({
        gender: passenger.gender,
        first_name: passenger.firstName,
        middle_name: passenger.middleName,
        last_name: passenger.lastName,
        age: passenger.age,
        dob: passenger.dob,
        passport_no: passenger.passportNo || '',
        passport_expire_date: passenger.passportExpireDate || ''
      }));

      const bookingResponse = await flightApiService.bookFlight({
        id: flight.id,
        onwardDate,
        returnDate,
        adult: adults,
        children,
        infant: infants,
        depCityCode: flight.dep_city_code,
        arrCityCode: flight.arr_city_code,
        totalBookSeats: adults + children + infants,
        contactName: contactDetails.name,
        contactEmail: contactDetails.email,
        contactNumber: contactDetails.phone,
        staticValue,
        bookingTokenId,
        totalAmount,
        flightTravellerDetails,
        authToken,
        apiKey
      });

      if (bookingResponse.errorCode === 0) {
        const referenceId = bookingResponse.data.reference_id;
        setBookingReference(referenceId);
        
        // Fetch booking details after successful booking
        await fetchBookingDetails(referenceId);
        
        setStep(3);
      } else {
        alert('Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderPassengerForm = () => (
    <div className="passenger-form">
      <h3>Passenger Details</h3>
      {passengers.map((passenger, index) => (
        <div key={index} className="passenger-card">
          <h4>
            {passenger.type.charAt(0).toUpperCase() + passenger.type.slice(1)} {index + 1}
            <span className="passenger-type"> ({passenger.type})</span>
          </h4>
          
          <div className="passenger-fields">
            <div className="form-group">
              <label>Title:</label>
              <select 
                value={passenger.gender}
                onChange={(e) => updatePassenger(index, 'gender', e.target.value)}
              >
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Ms">Ms</option>
                <option value="Mstr">Mstr</option>
              </select>
            </div>

            <div className="form-group">
              <label>First Name:</label>
              <input 
                type="text"
                value={passenger.firstName}
                onChange={(e) => updatePassenger(index, 'firstName', e.target.value)}
                placeholder="First Name"
                required
              />
            </div>

            <div className="form-group">
              <label>Middle Name:</label>
              <input 
                type="text"
                value={passenger.middleName}
                onChange={(e) => updatePassenger(index, 'middleName', e.target.value)}
                placeholder="Middle Name (Optional)"
              />
            </div>

            <div className="form-group">
              <label>Last Name:</label>
              <input 
                type="text"
                value={passenger.lastName}
                onChange={(e) => updatePassenger(index, 'lastName', e.target.value)}
                placeholder="Last Name"
                required
              />
            </div>

            <div className="form-group">
              <label>Date of Birth:</label>
              <input 
                type="date"
                value={passenger.dob}
                onChange={(e) => updatePassenger(index, 'dob', e.target.value)}
                required
              />
            </div>

            {flight.international_flight_staus === 1 && (
              <>
                <div className="form-group">
                  <label>Passport Number:</label>
                  <input 
                    type="text"
                    value={passenger.passportNo}
                    onChange={(e) => updatePassenger(index, 'passportNo', e.target.value)}
                    placeholder="Passport Number"
                  />
                </div>

                <div className="form-group">
                  <label>Passport Expiry:</label>
                  <input 
                    type="date"
                    value={passenger.passportExpireDate}
                    onChange={(e) => updatePassenger(index, 'passportExpireDate', e.target.value)}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderContactForm = () => (
    <div className="contact-form">
      <h3>Contact Details</h3>
      <div className="contact-fields">
        <div className="form-group">
          <label>Full Name:</label>
          <input 
            type="text"
            value={contactDetails.name}
            onChange={(e) => setContactDetails({...contactDetails, name: e.target.value})}
            placeholder="Full Name"
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email"
            value={contactDetails.email}
            onChange={(e) => setContactDetails({...contactDetails, email: e.target.value})}
            placeholder="Email Address"
            required
          />
        </div>

        <div className="form-group">
          <label>Phone Number:</label>
          <input 
            type="tel"
            value={contactDetails.phone}
            onChange={(e) => setContactDetails({...contactDetails, phone: e.target.value})}
            placeholder="Phone Number"
            required
          />
        </div>
      </div>
    </div>
  );

  const renderBookingSummary = () => (
    <div className="booking-summary">
      <h3>Booking Summary</h3>
      <div className="summary-details">
        <div className="flight-summary">
          <h4>Flight Details</h4>
          <div className="summary-item">
            <span className="label">Departure:</span>
            <span className="value">
              {flight.dep_city_name} ({flight.dep_airport_code}) → {flight.arr_city_name} ({flight.arr_airport_code})
            </span>
          </div>
          <div className="summary-item">
            <span className="label">Departure Date:</span>
            <span className="value">{new Date(onwardDate).toLocaleDateString()}</span>
          </div>
          <div className="summary-item">
            <span className="label">Return Date:</span>
            <span className="value">{new Date(returnDate).toLocaleDateString()}</span>
          </div>
          <div className="summary-item">
            <span className="label">Airline:</span>
            <span className="value">{flight.airline_name} ({flight.flight_number})</span>
          </div>
        </div>

        <div className="passenger-summary">
          <h4>Passengers</h4>
          {passengers.map((passenger, index) => (
            <div key={index} className="summary-item">
              <span className="label">{passenger.type.charAt(0).toUpperCase() + passenger.type.slice(1)} {index + 1}:</span>
              <span className="value">
                {passenger.gender} {passenger.firstName} {passenger.lastName}
              </span>
            </div>
          ))}
        </div>

        <div className="price-summary">
          <h4>Price Breakdown</h4>
          <div className="summary-item">
            <span className="label">Total Amount:</span>
            <span className="value price">₹{totalAmount}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSuccessMessage = () => (
    <div className="booking-success">
      <div className="success-icon">✓</div>
      <h3>Booking Successful!</h3>
      
      <div className="reference-id">
        Your Booking Reference: <strong>{bookingReference}</strong>
      </div>
      
      {bookingDetails && (
        <div className="booking-details-summary">
          <h4>Booking Details</h4>
          <div className="details-grid">
            <div className="detail-item">
              <span className="label">Booking Date:</span>
              <span className="value">{new Date(bookingDetails.booking_date).toLocaleDateString()}</span>
            </div>
            <div className="detail-item">
              <span className="label">Payment Status:</span>
              <span className={`value ${bookingDetails.payment_status ? 'success' : 'pending'}`}>
                {bookingDetails.payment_status ? 'Paid' : 'Pending'}
              </span>
            </div>
            <div className="detail-item">
              <span className="label">Flight PNR:</span>
              <span className="value">{bookingDetails.flight_pnrs}</span>
            </div>
            <div className="detail-item">
              <span className="label">Contact:</span>
              <span className="value">{bookingDetails.contact_name} ({bookingDetails.contact_email})</span>
            </div>
          </div>
        </div>
      )}
      
      <p>An email confirmation has been sent to {contactDetails.email}</p>
      
      <div className="success-actions">
        <button 
          className="btn-primary"
          onClick={() => window.print()}
        >
          Print Booking
        </button>
        <button 
          className="btn-secondary"
          onClick={() => window.location.href = '/'}
        >
          Book Another Flight
        </button>
      </div>
    </div>
  );

  return (
    <div className="round-trip-booking">
      <div className="booking-steps">
        <div className={`step ${step >= 1 ? 'active' : ''}`}>
          <div className="step-number">1</div>
          <div className="step-label">Passenger Details</div>
        </div>
        <div className={`step ${step >= 2 ? 'active' : ''}`}>
          <div className="step-number">2</div>
          <div className="step-label">Contact Details</div>
        </div>
        <div className={`step ${step >= 3 ? 'active' : ''}`}>
          <div className="step-number">3</div>
          <div className="step-label">Confirmation</div>
        </div>
      </div>

      <div className="booking-content">
        {step === 1 && renderPassengerForm()}
        {step === 2 && renderContactForm()}
        {step === 3 && (bookingReference ? renderSuccessMessage() : renderBookingSummary())}

        <div className="booking-actions">
          {step > 1 && step < 3 && (
            <button 
              className="btn-secondary"
              onClick={() => setStep(step - 1)}
            >
              Back
            </button>
          )}
          
          {step < 2 && (
            <button 
              className="btn-primary"
              onClick={() => setStep(step + 1)}
            >
              Continue
            </button>
          )}
          
          {step === 2 && (
            <button 
              className="btn-primary"
              onClick={handleBookFlight}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Confirm Booking'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoundTripBooking;