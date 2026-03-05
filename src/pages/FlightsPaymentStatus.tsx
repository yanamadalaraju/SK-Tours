
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from '@/ApiUrls';
import Header from '@/components/Header';
import { Button } from "@/components/ui/button";
import { pdf } from '@react-pdf/renderer';
import BookingPDF from './BookingPDF';

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
  const [referenceId, setReferenceId] = useState("");
  const [pdfLoading, setPdfLoading] = useState(false);
  
  // New state for BookingDetails integration
  const [bookingDetailsData, setBookingDetailsData] = useState(null);
  const [bookingDetailsLoading, setBookingDetailsLoading] = useState(false);
  const [bookingDetailsError, setBookingDetailsError] = useState(null);

const API_KEY = import.meta.env.VITE_FLIGHT_API_KEY;
const BEARER_TOKEN = import.meta.env.VITE_FLIGHT_BEARER_TOKEN;


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const merchantOrderId = params.get("orderId");
    const environment = params.get("environment") || "test";

    if (!merchantOrderId) {
      setLoading(false);
      return;
    }

    setOrderId(merchantOrderId);
    
    const savedBookingId = localStorage.getItem('flightBookingId');
    if (savedBookingId) {
      setBookingId(savedBookingId);
    }
    
    checkPhonePeStatus(merchantOrderId, environment);
  }, [location]);



  const printBookingPDF = async () => {
  let refIdToUse = referenceId;
  
  if (!refIdToUse) {
    refIdToUse = localStorage.getItem('flightReferenceId');
  }
  
  if (!refIdToUse && bookingData && bookingData.reference_id) {
    refIdToUse = bookingData.reference_id;
  }

  if (!refIdToUse) {
    alert('No reference ID available to fetch booking details');
    return;
  }

  setPdfLoading(true);
  
  try {
    // Fetch booking details using the reference ID
    const fetchedBookingData = await fetchBookingDetailsFromAPI(refIdToUse);
    
    if (!fetchedBookingData) {
      alert('Failed to fetch booking details. Please try again.');
      return;
    }

    console.log("Generating PDF for printing with fetched booking data:", fetchedBookingData);
    
    const blob = await pdf(
      <BookingPDF bookingData={fetchedBookingData} />
    ).toBlob();
    
    const url = window.URL.createObjectURL(blob);
    
    const newWindow = window.open(url, '_blank');
    
    if (!newWindow) {
      alert('Popup blocked. Please allow popups for this site or use the download button instead.');
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `booking_${refIdToUse}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
    }, 1000);
    
    console.log('PDF opened in new tab for printing for reference ID:', refIdToUse);
  } catch (error) {
    console.error('Error generating PDF for printing:', error);
    alert('Failed to generate PDF for printing. Please try again.');
  } finally {
    setPdfLoading(false);
  }
};
const fetchBookingDetailsFromAPI = async (refId) => {
  if (!refId) {
    console.error("No reference ID provided to fetch booking details");
    return null;
  }

  setBookingDetailsLoading(true);
  setBookingDetailsError(null);

  try {
    console.log("Fetching booking details for reference ID:", refId);
    
    const API_KEY = import.meta.env.VITE_FLIGHT_API_KEY;
    const BEARER_TOKEN = import.meta.env.VITE_FLIGHT_BEARER_TOKEN;
    const TOKEN = import.meta.env.VITE_FLIGHT_TOKEN;
    const END_USER_IP = import.meta.env.VITE_FLIGHT_END_USER_IP;
    const API_BASE_URL = import.meta.env.VITE_FLIGHT_API_BASE_URL;

    if (!API_KEY || !BEARER_TOKEN || !TOKEN || !END_USER_IP) {
      throw new Error("Missing required API credentials. Please check your .env file.");
    }

    console.log("API Configuration:", {
      apiKeyPresent: !!API_KEY,
      bearerTokenPresent: !!BEARER_TOKEN,
      tokenPresent: !!TOKEN,
      endUserIpPresent: !!END_USER_IP,
      baseUrl: API_BASE_URL
    });

    const response = await axios.post(
      `${API_BASE_URL}booking_details`,
      {
        reference_id: refId,
        transaction_id: '989087', 
        end_user_ip: END_USER_IP,
        token: TOKEN
      },
      {
        headers: {
          'x-api-key': API_KEY,
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${BEARER_TOKEN}`
        }
      }
    );

    console.log("API Response:", response.data);

    if (response.data.replyCode === 0) {
      console.log("Booking details fetched successfully:", response.data.data);
      setBookingDetailsData(response.data.data);
      return response.data.data;
    } else {
      const errorMsg = response.data.replyMessage || 'Failed to fetch booking details';
      setBookingDetailsError(errorMsg);
      console.error("API Error:", response.data);
      return null;
    }
  } catch (err) {
    let errorMessage = 'Error fetching booking details. Please try again.';
    
    if (err.response) {
      console.error("API Error Response:", err.response.data);
      console.error("API Error Status:", err.response.status);
      
      if (err.response.status === 401) {
        errorMessage = 'Authentication failed. Please check your API credentials.';
      } else if (err.response.status === 403) {
        errorMessage = 'Access forbidden. Please check your API permissions.';
      } else if (err.response.status === 404) {
        errorMessage = 'Booking details not found.';
      } else if (err.response.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      }
    } else if (err.request) {
      console.error("No response received:", err.request);
      errorMessage = 'No response from server. Please check your network connection.';
    } else {
      console.error("Error setting up request:", err.message);
      errorMessage = err.message;
    }
    
    setBookingDetailsError(errorMessage);
    console.error('API Error:', err);
    return null;
  } finally {
    setBookingDetailsLoading(false);
  }
};
  const downloadBookingPDF = async () => {
    let refIdToUse = referenceId;
    
    if (!refIdToUse) {
      refIdToUse = localStorage.getItem('flightReferenceId');
    }
    
    if (!refIdToUse && bookingData && bookingData.reference_id) {
      refIdToUse = bookingData.reference_id;
    }

    if (!refIdToUse) {
      alert('No reference ID available to fetch booking details');
      return;
    }

    setPdfLoading(true);
    
    try {
      // Fetch booking details using the reference ID
      const fetchedBookingData = await fetchBookingDetailsFromAPI(refIdToUse);
      
      if (!fetchedBookingData) {
        alert('Failed to fetch booking details. Please try again.');
        return;
      }

      console.log("Generating PDF with fetched booking data:", fetchedBookingData);
      
      // Generate PDF blob using the fetched booking data
      const blob = await pdf(
        <BookingPDF bookingData={fetchedBookingData} />
      ).toBlob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Set filename with reference_id
      const fileName = `booking_${refIdToUse}.pdf`;
      link.download = fileName;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      window.URL.revokeObjectURL(url);
      
      console.log('PDF downloaded successfully for reference ID:', refIdToUse);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setPdfLoading(false);
    }
  };



  const saveTransactionToDatabase = async (paymentStatus, transactionDetails) => {
    try {
      const savedBookingId = localStorage.getItem('flightBookingId');
      if (!savedBookingId) {
        console.error("No booking ID found in localStorage");
        return false;
      }

      const currentBooking = JSON.parse(localStorage.getItem('currentFlightBooking') || '{}');
      
      const userEmail = currentBooking.customer?.email || '';
      const userPhone = currentBooking.customer?.phone || '';
      
      const orderId = localStorage.getItem('phonePeOrderId') || transactionDetails?.paymentId || '';
      const merchantOrderId = localStorage.getItem('phonePeOrderId') || orderId;
      
      console.log("Transaction Data for online_flightbooking_transactions:", {
        userPhone,
        orderId,
        merchantOrderId,
        paymentStatus,
        amount: transactionDetails?.amount || currentBooking.amount,
        userEmail
      });
      
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

      const response = await axios.post(
        `${BASE_URL}/api/flight-bookings/save-transaction`,
        transactionData
      );

      if (response.data.success) {
        console.log("Transaction saved successfully:", response.data);
        setTransactionSaved(true);
        
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
        const newReferenceId = response.data.reference_id;
        
        setReferenceId(newReferenceId);
        
        console.log("✅ REFERENCE_ID RECEIVED:", newReferenceId);
        console.log("✅ Booking confirmed with reference ID:", newReferenceId);
        console.log("✅ Full API response:", response.data);
        
        localStorage.setItem('flightReferenceId', newReferenceId);
        
        setBookingData(prevData => ({
          ...prevData,
          reference_id: newReferenceId
        }));
        
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
        
        const savedBookingId = localStorage.getItem('flightBookingId');
        
        const details = {
          amount: res.data.amount,
          currency: res.data.currency,
          timestamp: new Date().toISOString(),
          phonepeStatus: res.data.phonepeStatus,
          paymentId: res.data.paymentId || merchantOrderId
        };
        setPaymentDetails(details);
        
        if (paymentStatus === 'SUCCESS' || paymentStatus === 'FAILED') {
          const saved = await saveTransactionToDatabase(paymentStatus, details);
          console.log("Transaction saved:", saved);
        }
        
        if (savedBookingId) {
          try {
            const bookingRes = await axios.get(`${BASE_URL}/api/flight-bookings/${savedBookingId}`);
            if (bookingRes.data.success) {
              setBookingData(bookingRes.data.booking);
              console.log("========== FULL BOOKING RESPONSE ==========");
              console.log(bookingRes.data);
              console.log("========== BOOKING OBJECT ==========");
              console.log(bookingRes.data.booking);
              
              if (paymentStatus === 'SUCCESS') {
                console.log("✅ Payment successful, proceeding to book flight...");
                
                const bookingTokenId = bookingRes.data.booking.booking_token_id;
                
                if (bookingTokenId) {
                  console.log("Booking token ID found:", bookingTokenId);
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
        {/* Header with PDF Download and Print Buttons */}
<div className={`${isSuccess ? 'bg-green-500' : isFailed ? 'bg-red-500' : 'bg-yellow-500'} p-6 text-white relative`}>
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-4">
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
    
    {/* Action Buttons - Only show when booking data is available and payment successful */}
    {isSuccess && (
      <div className="flex gap-3">
        {/* Print Button */}
        <button
          onClick={printBookingPDF}
          disabled={pdfLoading || bookingDetailsLoading}
          className={`bg-white text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all duration-200 shadow-md ${
            (pdfLoading || bookingDetailsLoading) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          title="Open booking details in new tab for printing"
        >
          {(pdfLoading || bookingDetailsLoading) ? (
            <>
              <svg className="animate-spin h-5 w-5 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Loading...</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
              </svg>
              <span>Print</span>
            </>
          )}
        </button>

        {/* Download PDF Button */}
        <button
          onClick={downloadBookingPDF}
          disabled={pdfLoading || bookingDetailsLoading}
          className={`bg-white text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all duration-200 shadow-md ${
            (pdfLoading || bookingDetailsLoading) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          title="Download booking details as PDF"
        >
          {(pdfLoading || bookingDetailsLoading) ? (
            <>
              <svg className="animate-spin h-5 w-5 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Fetching Details...</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
              </svg>
              <span>Download PDF</span>
              {(referenceId || localStorage.getItem('flightReferenceId')) && (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded ml-2">
                  {referenceId || localStorage.getItem('flightReferenceId')}
                </span>
              )}
            </>
          )}
        </button>
      </div>
    )}
  </div>
</div>

            {/* Error message for booking details fetch */}
            {bookingDetailsError && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 m-6">
                <p className="text-red-700">{bookingDetailsError}</p>
              </div>
            )}

            {/* Rest of your existing JSX remains exactly the same */}
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
                    {(referenceId || localStorage.getItem('flightReferenceId')) && (
                      <div className="flex justify-between py-3 border-b bg-green-50 px-2 rounded">
                        <span className="text-gray-600 font-bold">Reference ID</span>
                        <span className="font-mono text-green-700 font-bold">
                          {referenceId || localStorage.getItem('flightReferenceId')}
                        </span>
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
                              return <tr><td colSpan={4} className="text-center py-2 text-gray-500">Unable to load passenger details</td></tr>;
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
                    {(referenceId || localStorage.getItem('flightReferenceId')) && (
                      <li className="flex items-start gap-2">
                        <span className="mt-1">•</span>
                        <span>Flight Reference ID: <strong className="text-green-800">
                          {referenceId || localStorage.getItem('flightReferenceId')}
                        </strong></span>
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
                  {(referenceId || localStorage.getItem('flightReferenceId')) && (
                    <div className="mt-4 p-3 bg-green-100 rounded-lg border border-green-300">
                      <p className="text-green-800 font-medium mb-1">Your Booking Reference ID:</p>
                      <div className="flex items-center gap-2">
                        <code className="bg-white px-3 py-2 rounded text-lg font-bold text-green-700 flex-1 text-center">
                          {referenceId || localStorage.getItem('flightReferenceId')}
                        </code>
                        <button 
                          onClick={() => {
                            const idToCopy = referenceId || localStorage.getItem('flightReferenceId');
                            navigator.clipboard.writeText(idToCopy);
                            alert('Reference ID copied to clipboard!');
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
                    {/* <Button
                      onClick={() => navigate('/my-flight-bookings')}
                      className="bg-[#2E4D98] hover:bg-[#2E4D98]/90 px-8 py-6 text-lg"
                    >
                      View My Bookings
                    </Button> */}
                    <Button
                      onClick={() => navigate('/flightfrontend')}
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
                        localStorage.removeItem('currentFlightBooking');
                        localStorage.removeItem('flightBookingId');
                        navigate('/flightfrontend');
                      }}
                      className="bg-[#E53C42] hover:bg-[#E53C42]/90 px-8 py-6 text-lg"
                    >
                      Try Again
                    </Button>
                    <Button
                      onClick={() => navigate('/flightfrontend')}
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
                <p className="text-lg font-bold text-blue-800">📞 98208 70771</p>
                <p className="text-gray-600">salil@sktt.in</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightPaymentResult;