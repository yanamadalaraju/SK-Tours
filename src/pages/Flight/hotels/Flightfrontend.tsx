import React, { useState } from 'react';
import './Flightfrontend.css';
import FlightSearchRoundTrip from './FlightSearchRoundTrip';
import SeatSelection from './SeatSelections';
import BookingConfirmation from './BookingConfirmation';

function Flightfrontend() {
  const [currentStep, setCurrentStep] = useState<'search' | 'seat-selection' | 'confirmation'>('search');
  const [selectedFlight, setSelectedFlight] = useState<any>(null);
  const [bookingParams, setBookingParams] = useState<any>(null);
  const [bookingData, setBookingData] = useState<any>(null);
  const [bookingReferenceId, setBookingReferenceId] = useState<string>("");
  const [passengerDetails, setPassengerDetails] = useState<any[]>([]);
  const [contactDetails, setContactDetails] = useState<any>(null);

  const handleBookFlight = (flight: any, params: any) => {
    setSelectedFlight(flight);
    setBookingParams(params);
    setCurrentStep('seat-selection');
  };

  const handleBookingComplete = (bookingResponse: any) => {
    setBookingData(bookingResponse.bookingData);
    setBookingReferenceId(bookingResponse.referenceId);
    setPassengerDetails(bookingResponse.passengerDetails);
    setContactDetails(bookingResponse.contactDetails);
    setCurrentStep('confirmation');
  };

  const handleBackFromSeats = () => {
    setCurrentStep('search');
    setSelectedFlight(null);
    setBookingParams(null);
  };

  const handleBackFromConfirmation = () => {
    setCurrentStep('search');
    setBookingData(null);
    setBookingReferenceId("");
    setPassengerDetails([]);
    setContactDetails(null);
  };

  return (
    <div className="ffd-App">
      <header className="ffd-App-header">
        <h1>Flight Booking System</h1>
        <p>Book Domestic & International Flights</p>
      </header>
      
      <main>
        {currentStep === 'search' && (
          <FlightSearchRoundTrip onBookFlight={handleBookFlight} />
        )}

        {currentStep === 'seat-selection' && selectedFlight && bookingParams && (
          <div className="ffd-full-screen-container">
            <SeatSelection
              flightData={selectedFlight}
              fareQuoteData={{ total_payable_price: bookingParams.totalAmount ,
                  available_seats: selectedFlight.available_seats // Pass available seats here
              }}
              
              passengers={{
                adults: bookingParams.adults,
                children: bookingParams.children,
                infants: bookingParams.infants
              }}
              bookingTokenId={bookingParams.bookingTokenId}
               token="3-1-NEWTEST-dmjkwj78BJHk8"
              endUserIp="183.83.43.117"
              staticParam={bookingParams.staticValue}
              onBack={handleBackFromSeats}
              onBookingComplete={handleBookingComplete}
              tripType={selectedFlight.trip_type || 0}
            />
          </div>
        )}

        {currentStep === 'confirmation' && bookingData && (
          <div className="ffd-full-screen-container">
            <BookingConfirmation
              bookingData={bookingData}
              referenceId={bookingReferenceId}
              passengerDetails={passengerDetails}
              contactDetails={contactDetails}
              onBack={handleBackFromConfirmation}
              tripType={bookingData.return_flight === 1 ? 1 : 0}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default Flightfrontend;