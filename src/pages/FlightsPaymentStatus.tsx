// src/pages/FlightPaymentResult.jsx - Updated with reference_id console and alert

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from '@/ApiUrls';
import Header from '@/components/Header';
import { Button } from "@/components/ui/button";

const FlightPaymentResult = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [status, setStatus] = useState("PROCESSING");
  const [orderId, setOrderId] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState(null);
  const [transactionSaved, setTransactionSaved] = useState(false);
  const [referenceId, setReferenceId] = useState(""); // Add state for reference_id

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const merchantOrderId = params.get("orderId");
    const environment = params.get("environment") || "test";

    if (!merchantOrderId) {
      setLoading(false);
      return;
    }

    setOrderId(merchantOrderId);
    
    // Get booking ID from localStorage
    const savedBookingId = localStorage.getItem('flightBookingId');
    if (savedBookingId) {
      setBookingId(savedBookingId);
    }
    
    checkPhonePeStatus(merchantOrderId, environment);
  }, [location]);

  // Save transaction to database
  const saveTransactionToDatabase = async (paymentStatus, transactionDetails) => {
    try {
      const savedBookingId = localStorage.getItem('flightBookingId');
      if (!savedBookingId) {
        console.error("No booking ID found in localStorage");
        return false;
      }

      // Get booking details from localStorage
      const currentBooking = JSON.parse(localStorage.getItem('currentFlightBooking') || '{}');
      
      // Get user details from contact details
      const userEmail = currentBooking.customer?.email || '';
      const userPhone = currentBooking.customer?.phone || '';
      
      // Get the booking token ID or order ID
      const orderId = localStorage.getItem('phonePeOrderId') || transactionDetails?.paymentId || '';
      
      // Get the merchant order ID
      const merchantOrderId = localStorage.getItem('phonePeOrderId') || orderId;
      
      console.log("Transaction Data for online_flightbooking_transactions:", {
        userPhone,
        orderId,
        merchantOrderId,
        paymentStatus,
        amount: transactionDetails?.amount || currentBooking.amount,
        userEmail
      });
      
      // Create transaction record for online_flightbooking_transactions table
      const transactionData = {
        user_id: userPhone ? parseInt(userPhone.replace(/\D/g, '')) || null : null,
        order_id: orderId,
        payment_id: transactionDetails?.paymentId || merchantOrderId,
        payment_amount: transactionDetails?.amount || currentBooking.amount || 0,
        payment_method: "PhonePe",
        payment_status: paymentStatus === 'SUCCESS' ? 'Success' : 'Failed',
        email: userEmail,
      };

      console.log("Saving transaction to online_flightbooking_transactions:", transactionData);

      // Save to online_flightbooking_transactions table
      const response = await axios.post(
        `${BASE_URL}/api/flight-bookings/save-transaction`,
        transactionData
      );

      if (response.data.success) {
        console.log("Transaction saved successfully:", response.data);
        setTransactionSaved(true);
        
        // Store transaction ID in localStorage for reference
        if (response.data.transactionId) {
          localStorage.setItem('flightTransactionId', response.data.transactionId);
        }
        
        return true;
      } else {
        console.error("Failed to save transaction:", response.data.message);
        return false;
      }
    } catch (error) {
      console.error("Error saving transaction:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
      }
      return false;
    }
  };
const bookFlightWithAPI = async (bookingTokenId) => {
  try {
    console.log("Attempting to book flight with token:", bookingTokenId);
    
    const response = await axios.post(
      `${BASE_URL}/api/flight-bookings/book/${bookingTokenId}`
    );

    console.log("Flight booking API response:", response.data);

    if (response.data.success) {
      // Get the reference_id from the response
      const newReferenceId = response.data.reference_id;
      
      // Set reference_id in state
      setReferenceId(newReferenceId);
      
      // Log to console
      console.log("✅ REFERENCE_ID RECEIVED:", newReferenceId);
      console.log("✅ Booking confirmed with reference ID:", newReferenceId);
      console.log("✅ Full API response:", response.data);
      
      // Store reference_id in localStorage
      localStorage.setItem('flightReferenceId', newReferenceId);
      
      // Update bookingData with reference_id
      setBookingData(prevData => ({
        ...prevData,
        reference_id: newReferenceId
      }));
      
      // Show appropriate message if already confirmed
      if (response.data.already_confirmed) {
        console.log("Booking was already confirmed previously");
      }
      
      return true;
    } else {
      console.error("Flight booking failed:", response.data.message);
      return false;
    }
  } catch (error) {
    console.error("Error booking flight:", error);
    
    let errorMessage = 'An error occurred while booking the flight.';
    if (error.response) {
      console.error("Error response:", error.response.data);
      errorMessage = error.response.data.message || errorMessage;
    }
    
    // You might want to show this error to the user
    // setErrorMessage(errorMessage);
    
    return false;
  }
};

  const checkPhonePeStatus = async (merchantOrderId, environment) => {
    try {
      const res = await axios.post(`${BASE_URL}/api/phonepe/orders`, {
        action: "check-status",
        merchantOrderId,
        environment,
      });

      if (res.data.success) {
        const paymentStatus = res.data.status;
        setStatus(paymentStatus);
        
        // Get booking ID from localStorage
        const savedBookingId = localStorage.getItem('flightBookingId');
        
        // Set payment details
        const details = {
          amount: res.data.amount,
          currency: res.data.currency,
          timestamp: new Date().toISOString(),
          phonepeStatus: res.data.phonepeStatus,
          paymentId: res.data.paymentId || merchantOrderId
        };
        setPaymentDetails(details);
        
        // Save transaction to database for SUCCESS or FAILED status
        if (paymentStatus === 'SUCCESS' || paymentStatus === 'FAILED') {
          const saved = await saveTransactionToDatabase(paymentStatus, details);
          console.log("Transaction saved:", saved);
        }
        
        // Fetch booking details for display
        if (savedBookingId) {
          try {
            const bookingRes = await axios.get(`${BASE_URL}/api/flight-bookings/${savedBookingId}`);
            if (bookingRes.data.success) {
              setBookingData(bookingRes.data.booking);
  console.log("========== FULL BOOKING RESPONSE ==========");
  console.log(bookingRes.data);
  console.log("========== BOOKING OBJECT ==========");
  console.log(bookingRes.data.booking);
                // If payment was successful, proceed with flight booking API
              if (paymentStatus === 'SUCCESS') {
                console.log("✅ Payment successful, proceeding to book flight...");
                
                // Get booking_token_id from booking data
                const bookingTokenId = bookingRes.data.booking.booking_token_id;
                
                if (bookingTokenId) {
                  console.log("Booking token ID found:", bookingTokenId);
                  
                  // Call the booking API
                  await bookFlightWithAPI(bookingTokenId);
                } else {
                  console.error("No booking_token_id found in booking data");
                  window.alert("⚠️ Booking token not found. Please contact support with your order ID.");
                }
              }
            }
          } catch (fetchError) {
            console.error("Failed to fetch booking details:", fetchError);
          }
        }
        
        // Save payment success to localStorage
        if (paymentStatus === 'SUCCESS') {
          const bookingData = JSON.parse(localStorage.getItem('currentFlightBooking') || '{}');
          bookingData.payment_status = 'success';
          localStorage.setItem('currentFlightBooking', JSON.stringify(bookingData));
        }
        
      } else {
        setStatus("FAILED");
      }
    } catch (err) {
      console.error("Status check error:", err);
      setStatus("ERROR");
    } finally {
      setLoading(false);
    }
  };

  const isSuccess = status === "SUCCESS";
  const isFailed = status === "FAILED" || status === "ERROR";
  const isProcessing = status === "PROCESSING" || status === "PENDING";

  const formatPrice = (price) => {
    if (!price) return '₹0';
    return `₹${parseFloat(price).toLocaleString('en-IN')}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#2E4D98] mx-auto"></div>
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">Verifying Payment</h3>
              <p className="text-gray-600">Please wait while we confirm your payment status...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className={`${isSuccess ? 'bg-green-500' : isFailed ? 'bg-red-500' : 'bg-yellow-500'} p-6 text-white`}>
              <div className="flex items-center justify-center gap-4">
                {isSuccess && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
                {isFailed && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
                {isProcessing && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 animate-pulse" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                )}
                <div>
                  <h1 className="text-3xl font-bold">
                    {isProcessing && "Payment Processing"}
                    {isSuccess && "Payment Successful!"}
                    {isFailed && "Payment Failed"}
                  </h1>
                  <p className="opacity-90">
                    {isProcessing && "Your payment is being processed by PhonePe"}
                    {isSuccess && "Your flight booking payment has been confirmed"}
                    {isFailed && "We couldn't process your payment"}
                  </p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-8">
              {/* Transaction Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Payment Details */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Transaction Details</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between py-3 border-b">
                      <span className="text-gray-600">Order ID</span>
                      <span className="font-mono text-gray-800">{orderId}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b">
                      <span className="text-gray-600">Booking ID</span>
                      <span className="font-mono text-gray-800">{bookingId || 'N/A'}</span>
                    </div>
                    {/* Display Reference ID if available */}
                    {referenceId && (
                      <div className="flex justify-between py-3 border-b bg-green-50 px-2 rounded">
                        <span className="text-gray-600 font-bold">Reference ID</span>
                        <span className="font-mono text-green-700 font-bold">{referenceId}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-3 border-b">
                      <span className="text-gray-600">Payment Status</span>
                      <span className={`font-semibold ${
                        isSuccess ? 'text-green-600' : 
                        isFailed ? 'text-red-600' : 
                        'text-yellow-600'
                      }`}>
                        {status}
                      </span>
                    </div>
                    {paymentDetails && (
                      <>
<div className="flex justify-between py-3 border-b">
  <span className="text-gray-600">Amount Paid</span>
  <span className="font-bold text-gray-900">
    {formatPrice(bookingData?.total_price || paymentDetails?.amount)}
  </span>
</div>
                        <div className="flex justify-between py-3 border-b">
                          <span className="text-gray-600">Payment Time</span>
                          <span className="text-sm text-gray-700">
                            {formatDate(paymentDetails.timestamp)}
                          </span>
                        </div>
                      </>
                    )}
                    {transactionSaved && (
                      <div className="flex justify-between py-3">
                        <span className="text-gray-600">Transaction Status</span>
                        <span className="text-green-600 font-medium flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Saved to Database
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Booking Details */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Flight Booking Details</h2>
                  {bookingData ? (
                    <div className="space-y-3">
                      <div className="flex justify-between py-3 border-b">
                        <span className="text-gray-600">Order Reference</span>
                        <span className="font-semibold text-gray-800">{bookingData.booking_token_id || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b">
                        <span className="text-gray-600">Flight Number</span>
                        <span className="font-semibold text-gray-800">{bookingData.flight_number || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b">
                        <span className="text-gray-600">Airline</span>
                        <span className="font-semibold text-gray-800">{bookingData.airline_name || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b">
                        <span className="text-gray-600">Route</span>
                        <span className="font-semibold text-gray-800">
                          {bookingData.dep_city_code} → {bookingData.arr_city_code}
                        </span>
                      </div>
                      <div className="flex justify-between py-3">
                        <span className="text-gray-600">Passengers</span>
                        <span className="font-semibold text-gray-800">
                          {bookingData.passenger_count || 1} Passenger(s)
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">Loading booking details...</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Passenger Details Summary */}
              {bookingData && bookingData.passenger_details && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Passenger Details</h2>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-2 px-3 text-sm font-medium text-gray-600">Name</th>
                            <th className="text-left py-2 px-3 text-sm font-medium text-gray-600">Type</th>
                            <th className="text-left py-2 px-3 text-sm font-medium text-gray-600">Age</th>
                            <th className="text-left py-2 px-3 text-sm font-medium text-gray-600">Passport</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(() => {
                            try {
                              const passengers = typeof bookingData.passenger_details === 'string' 
                                ? JSON.parse(bookingData.passenger_details) 
                                : bookingData.passenger_details;
                              
                              return passengers.map((passenger, idx) => (
                                <tr key={idx} className="border-b border-gray-100">
                                  <td className="py-2 px-3 text-sm text-gray-800">
                                    {passenger.first_name} {passenger.last_name}
                                  </td>
                                  <td className="py-2 px-3 text-sm text-gray-600 capitalize">{passenger.type}</td>
                                  <td className="py-2 px-3 text-sm text-gray-600">{passenger.age}</td>
                                  <td className="py-2 px-3 text-sm text-gray-600">{passenger.passport_no}</td>
                                </tr>
                              ));
                            } catch (e) {
                              return <tr><td colSpan="4" className="text-center py-2 text-gray-500">Unable to load passenger details</td></tr>;
                            }
                          })()}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Important Notes */}
              {isSuccess && (
                <div className="mt-8 p-6 bg-green-50 rounded-xl border border-green-200">
                  <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    What Happens Next?
                  </h3>
                  <ul className="space-y-2 text-green-700">
                    <li className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span>Your flight booking is now <strong>confirmed</strong> with payment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span>You will receive a confirmation email with e-ticket details</span>
                    </li>
                    {referenceId && (
                      <li className="flex items-start gap-2">
                        <span className="mt-1">•</span>
                        <span>Flight Reference ID: <strong className="text-green-800">{referenceId}</strong></span>
                      </li>
                    )}
                    <li className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span>Transaction has been saved with booking token ID: <strong>{bookingData?.booking_token_id || orderId}</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span>You can view your booking in <strong>My Bookings</strong> section</span>
                    </li>
                  </ul>
                  
                  {/* Reference ID Display Button */}
                  {referenceId && (
                    <div className="mt-4 p-3 bg-green-100 rounded-lg border border-green-300">
                      <p className="text-green-800 font-medium mb-1">Your Booking Reference ID:</p>
                      <div className="flex items-center gap-2">
                        <code className="bg-white px-3 py-2 rounded text-lg font-bold text-green-700 flex-1 text-center">
                          {referenceId}
                        </code>
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(referenceId);
                            window.alert('Reference ID copied to clipboard!');
                          }}
                          className="p-2 bg-white rounded hover:bg-green-50"
                          title="Copy to clipboard"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {isFailed && (
                <div className="mt-8 p-6 bg-red-50 rounded-xl border border-red-200">
                  <h3 className="font-semibold text-red-800 mb-3">What Went Wrong?</h3>
                  <ul className="space-y-2 text-red-700">
                    <li>• Payment was declined by your bank or payment method</li>
                    <li>• Insufficient funds in your account</li>
                    <li>• Technical error during payment processing</li>
                    <li>• Payment timeout or cancellation</li>
                  </ul>
                  <p className="mt-4 text-red-700">
                    Your booking is <strong>not confirmed</strong>. Please try again or contact support.
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                {isSuccess && (
                  <>
                    <Button
                      onClick={() => navigate('/my-flight-bookings')}
                      className="bg-[#2E4D98] hover:bg-[#2E4D98]/90 px-8 py-6 text-lg"
                    >
                      View My Bookings
                    </Button>
                    <Button
                      onClick={() => navigate('/flights')}
                      variant="outline"
                      className="border-[#2E4D98] text-[#2E4D98] hover:bg-[#2E4D98]/10 px-8 py-6 text-lg"
                    >
                      Search More Flights
                    </Button>
                  </>
                )}
                
                {isFailed && (
                  <>
                    <Button
                      onClick={() => {
                        // Clear booking data and go back to flight search
                        localStorage.removeItem('currentFlightBooking');
                        localStorage.removeItem('flightBookingId');
                        navigate('/flights');
                      }}
                      className="bg-[#E53C42] hover:bg-[#E53C42]/90 px-8 py-6 text-lg"
                    >
                      Try Again
                    </Button>
                    <Button
                      onClick={() => navigate('/flights')}
                      variant="outline"
                      className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-6 text-lg"
                    >
                      Back to Search
                    </Button>
                  </>
                )}
                
                {isProcessing && (
                  <div className="text-center w-full">
                    <Button
                      onClick={() => {
                        setLoading(true);
                        checkPhonePeStatus(orderId, "test");
                      }}
                      className="bg-[#2E4D98] hover:bg-[#2E4D98]/90 px-8 py-6 text-lg"
                    >
                      Refresh Payment Status
                    </Button>
                    <p className="text-gray-600 mt-4">
                      If payment doesn't update automatically, please refresh in 2-3 minutes
                    </p>
                  </div>
                )}
              </div>

              {/* Support Info */}
              <div className="mt-8 pt-8 border-t text-center">
                <p className="text-gray-600 mb-2">
                  Need help with your flight booking?
                </p>
                <p className="text-lg font-bold text-blue-800">📞 1800-123-4567</p>
                <p className="text-gray-600">support@traveltour.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightPaymentResult;