import React, { useState } from 'react';
import FlightSearchRoundTrip from './FlightSearchRoundTrip';
import SeatSelection from './SeatSelections';
import BookingConfirmation from './BookingConfirmation';
import Header from '@/components/Header';
import './flightfrontend.css';
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
    <div className="min-h-screen bg-gray-50">
      {/* Imported Header */}
      <Header />
      
      {/* Page Title below Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-6">
            <h1 className="text-3xl font-bold text-blue-600">
              Online <span className="text-gray-900">Flight Tickets Booking</span>
            </h1>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="py-8">
        {currentStep === 'search' && (
          <FlightSearchRoundTrip onBookFlight={handleBookFlight} />
        )}

        {currentStep === 'seat-selection' && selectedFlight && bookingParams && (
          <div className="fixed inset-0 bg-gray-50 overflow-auto z-40">
            <SeatSelection
              flightData={selectedFlight}
              fareQuoteData={{ 
                total_payable_price: bookingParams.totalAmount,
                available_seats: selectedFlight.available_seats
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
          <div className="fixed inset-0 bg-gray-50 overflow-auto z-40">
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

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-500 text-sm">
            © 2024 Online Flights Booking. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Flightfrontend;