import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from '@/ApiUrls';
import Header from '@/components/Header';
import { Button } from "@/components/ui/button";

const PaymentResult = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [status, setStatus] = useState("PROCESSING");
  const [orderId, setOrderId] = useState("");
  const [checkoutId, setCheckoutId] = useState("");
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkoutData, setCheckoutData] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const merchantOrderId = params.get("orderId");
    const environment = params.get("environment") || "test";

    if (!merchantOrderId) {
      setLoading(false);
      return;
    }

    setOrderId(merchantOrderId);
    
    // Get checkout ID from localStorage
    const savedCheckoutId = localStorage.getItem('checkoutId');
    if (savedCheckoutId) {
      setCheckoutId(savedCheckoutId);
    }
    
    checkPhonePeStatus(merchantOrderId, environment);
  }, [location]);

 // In PaymentResult.jsx, update the checkPhonePeStatus function:

const checkPhonePeStatus = async (merchantOrderId, environment) => {
    try {
        const res = await axios.post(`${BASE_URL}/api/phonepe/orders`, {
            action: "check-status",
            merchantOrderId,
            environment,
        });

        if (res.data.success) {
            setStatus(res.data.status);
            
            // Get checkout ID from localStorage
            const savedCheckoutId = localStorage.getItem('checkoutId');
            
            if (savedCheckoutId) {
                try {
                    // Update checkout status in database
                    const checkoutStatus = res.data.status === 'SUCCESS' ? 'completed' : 'failed';
                    await axios.put(
                        `${BASE_URL}/api/checkout/${savedCheckoutId}/status`,
                        { payment_status: checkoutStatus }
                    );
                    
                    // Fetch checkout details for display
                    const checkoutRes = await axios.get(`${BASE_URL}/api/checkout/${savedCheckoutId}`);
                    if (checkoutRes.data.success) {
                        setCheckoutData(checkoutRes.data.checkout);
                    }
                    
                    // Save payment success to localStorage
                    if (res.data.status === 'SUCCESS') {
                        const bookingData = JSON.parse(localStorage.getItem('currentBooking') || '{}');
                        bookingData.payment_status = 'success';
                        localStorage.setItem('currentBooking', JSON.stringify(bookingData));
                    }
                    
                } catch (updateError) {
                    console.error("Failed to update checkout:", updateError);
                }
            }
            
            // Set payment details
            setPaymentDetails({
                amount: res.data.amount,
                currency: res.data.currency,
                timestamp: new Date().toISOString(),
                phonepeStatus: res.data.phonepeStatus
            });
            
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
        <div className="max-w-3xl mx-auto">
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
                    {isSuccess && "Your advance payment has been confirmed"}
                    {isFailed && "We couldn't process your payment"}
                  </p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Payment Details */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Details</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between py-3 border-b">
                      <span className="text-gray-600">Order ID</span>
                      <span className="font-mono text-gray-800">{orderId}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b">
                      <span className="text-gray-600">Checkout ID</span>
                      <span className="font-mono text-gray-800">{checkoutId || 'N/A'}</span>
                    </div>
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
                            {formatPrice(paymentDetails.amount)}
                          </span>
                        </div>
                        <div className="flex justify-between py-3">
                          <span className="text-gray-600">Payment Type</span>
                          <span className="text-blue-600 font-medium">20% Advance Payment</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
<div>
  <h2 className="text-xl font-semibold text-gray-800 mb-4">Booking Details</h2>
  {checkoutData ? (
    <div className="space-y-3">
      <div className="flex justify-between py-3 border-b">
        <span className="text-gray-600">Tour Code</span>
        <span className="font-semibold text-gray-800">{checkoutData.tour_code}</span>
      </div>
      <div className="flex justify-between py-3 border-b">
        <span className="text-gray-600">Tour</span>
        <span className="font-semibold text-gray-800">{checkoutData.tour_title}</span>
      </div>
      <div className="flex justify-between py-3 border-b">
        <span className="text-gray-600">Total Tour Cost</span>
        <span className="font-bold text-gray-900">{formatPrice(checkoutData.total_tour_cost)}</span>
      </div>
      <div className="flex justify-between py-3 border-b">
        <span className="text-gray-600">Advance Paid ({checkoutData.advance_percentage}%)</span>
        <span className="font-bold text-green-600">{formatPrice(checkoutData.advance_amount)}</span>
      </div>
      <div className="flex justify-between py-3">
        <span className="text-gray-600">Balance Due</span>
        <span className="font-bold text-blue-600">
          {formatPrice(checkoutData.total_tour_cost - checkoutData.advance_amount)}
        </span>
      </div>
      
      {/* Show payment type if custom */}
      {checkoutData.advance_percentage > 20 && (
        <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 text-blue-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">
              Thank you for paying {checkoutData.advance_percentage}% advance!
            </span>
          </div>
          <p className="text-xs text-blue-600 mt-1">
            Your higher advance payment reduces the balance amount to be paid later.
          </p>
        </div>
      )}
    </div>
  ) : (
    <div className="text-center py-8">
      <p className="text-gray-500">Loading booking details...</p>
    </div>
  )}
</div>
              </div>

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
                      <span>Your booking is now <strong>confirmed</strong> with advance payment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span>You will receive a confirmation email with booking details</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span>Our travel coordinator will contact you within 24 hours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span>The <strong>balance amount must be paid before the tour departure date</strong></span>
                    </li>
                  </ul>
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
                      onClick={() => navigate('/my-bookings')}
                      className="bg-[#2E4D98] hover:bg-[#2E4D98]/90 px-8 py-6 text-lg"
                    >
                      View My Bookings
                    </Button>
                    <Button
                      onClick={() => navigate('/')}
                      variant="outline"
                      className="border-[#2E4D98] text-[#2E4D98] hover:bg-[#2E4D98]/10 px-8 py-6 text-lg"
                    >
                      Browse More Tours
                    </Button>
                  </>
                )}
                
                {isFailed && (
                  <>
                    <Button
                      onClick={() => navigate('/checkout')}
                      className="bg-[#E53C42] hover:bg-[#E53C42]/90 px-8 py-6 text-lg"
                    >
                      Try Payment Again
                    </Button>
                    <Button
                      onClick={() => navigate('/')}
                      variant="outline"
                      className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-6 text-lg"
                    >
                      Back to Home
                    </Button>
                  </>
                )}
                
                {isProcessing && (
                  <div className="text-center w-full">
                    <Button
                      onClick={() => checkPhonePeStatus(orderId, "test")}
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
                  Need help with your booking?
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

export default PaymentResult;