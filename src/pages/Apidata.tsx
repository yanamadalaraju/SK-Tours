// components/BookingDetails.tsx

import React, { useState, useRef } from 'react';
import axios from 'axios';
import { pdf } from '@react-pdf/renderer';
import BookingPDF from './BookingPDF'
// Types (keep all your existing types)
interface FlightSegment {
  depeparture_city_name: string;
  depeparture_city_code: string;
  arrival_city_name: string;
  arrival_city_code: string;
  departure_date: string;
  departure_time: string;
  arrival_date: string;
  arrival_time: string;
  stop_count: number;
  airline_name: string;
  airline_code: string;
  flight_number: string;
  airline_logo: string;
}

interface ReturnFlightSegment {
  depeparture_city_name: string;
  depeparture_city_code: string;
  arrival_city_name: string;
  arrival_city_code: string;
  return_date: string;
  return_departure_time: string;
  return_arrival_time: string;
  return_stop_count: number;
  airline_name: string;
  airline_code: string;
  airline_number: string;
  airline_logo: string;
}

interface PriceBreakup {
  base_price: number;
  fees_taxes: number;
  service_charge: number;
  discount: number;
}

interface Baggage {
  checkin_baggages_adult: string;
  checkin_baggages_children: string;
  checkin_baggages_infant: string;
  cabin_baggages_adult: string;
  cabin_baggages_children: string;
  cabin_baggages_infant: string;
  disclaimer: string;
}

interface Traveller {
  first_name: string;
  middle_name: string | null;
  last_name: string;
  ticket_price: number;
  gender: string;
  dob: string;
  status: number;
  age: number;
  passport_no: string;
  passport_expire_date: string;
  amount: number;
  total_amount: number;
}

interface FlightStopDetail {
  city_name: string;
  city_code: string;
  stop_duration: string;
}

interface BookingData {
  reference_id: string;
  onward_date: string;
  return_date: string;
  adult: number;
  children: number;
  infant: number;
  total_book_seats: number;
  seat_book_status: boolean;
  payment_status: boolean;
  special_Information: string | null;
  booking_date: string;
  total_amount: number;
  return_flight: number;
  infant_price: number;
  flight_pnrs: string;
  contact_name: string;
  contact_email: string;
  contact_number: string;
  onward: FlightSegment;
  return: ReturnFlightSegment;
  price_breakup: PriceBreakup;
  per_adult_child_price: number;
  per_infant_price: number;
  baggage: Baggage;
  travellers: Traveller[];
  flight_stop_details: FlightStopDetail[];
  return_flight_stop_details: FlightStopDetail[];
}

interface BookingResponse {
  replyCode: number;
  data: BookingData;
}

const Apidata: React.FC = () => {
  // State for input field
  const [referenceId, setReferenceId] = useState<string>('');
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pdfLoading, setPdfLoading] = useState<boolean>(false);

  // API configuration
  const API_KEY = '1FMQKB1639407126571';
  const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwicm9sZV9pZCI6MywiYWdlbmN5X3R5cGVfaWQiOm51bGwsInVzZXJfcmVmZXJlbmNlX2lkIjoiU1VOSzdjQzgxNjM3MzA0MzkwNDU5IiwicGFja2FnZV9pZCI6bnVsbCwibmFtZSI6IlN1bmlsIGt1bWFyIiwiZW1haWwiOiJzdW5pbC5mYXJlYm91dGlxdWVAZ21haWwuY29tIiwibm90aWZpY2F0aW9uX0ZDTUtFWSI6IkFBQUFRZWhzN3ZnOkFQQTkxYkVpTUJtclRwUkhfRWdMb2tVS1RiV3FIS1JHSy1FLWJ4VkQ3RUN4elJycS0wZ3QybVJ3LXZZX2J3TDk2bVBxY1lZa2hJSHVUcWFMN0hxRTlWYmFlSDFwSXgtaDB5clVCbHhzQ0ZrclFwUjVyUEIxbGk3QS01cGFtR1QxQlNocjI5Q3d0eUxRIiwibnRpZmljYXRpb25fQ0xJRU5UX0lEIjoiQUFBQVFlaHM3dmc6QVBBOTFiRWlNQm1yVHBSSF9FZ0xva1VLVGJXcUhLUkdLLUUtYnhWRDdFQ3h6UnJxLTBndDJtUnctdllfYndMOTZtUHFjWVlraElIdVRxYUw3SHFFOVZiYWVIMXBJeC1oMHlyVUJseHNDRmtyIiwibW9iaWxlIjoiOTYzMjU4NzQxOCIsImltYWdlIjoiMTYzODk0MjI0NDg3NC5wbmciLCJjcmVkaXRfbGltaXQiOm51bGwsImFkZHJlc3NfMiI6ImphaXB1ciIsInBob25lIjpudWxsLCJhZGRyZXNzIjoiamFpcHVyIiwiY2l0eSI6ImphaXB1ciIsInN0YXRlX2lkIjoyMSwiY291bnRyeV9pZCI6OTMsInppcGNvZGUiOiIzMDIwMTIiLCJjb21wYW55X25hbWUiOiJLYXJ3YW4gaG9saWRheXMiLCJjb250YWN0X3BlcnNvbl9uYW1lIjpudWxsLCJjb250YWN0X3BlcnNvbl9ubyI6bnVsbCwiaWF0YV9jb2RlIjpudWxsLCJ3ZWJzaXRlIjoia2Fyd2FuLmNvbSIsImdzdF9ubyI6IiIsInBhbl9ubyI6IkFTSEJHODUwNUsiLCJnc3RfZG9jIjpudWxsLCJwYW5fZG9jIjpudWxsLCJ2ZXJpZmllZCI6ZmFsc2UsInN0YXR1cyI6dHJ1ZSwiZGV2aWNlX3Rva2VuIjoiNDQ2MzR3OHE3ZDdlZHdxNmVxdzQ2IiwiZGV2aWNlX3R5cGUiOiJ3ZWIiLCJjcmVhdGVkQXQiOiIyMDIxLTExLTE5VDA2OjQ2OjMwLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIyLTA1LTMxVDAxOjA3OjIwLjAwMFoiLCJpYXQiOjE2NTkzNTE0ODd9.b2sWomlyDvdcv4l5xtM99unaM2Qs_JhkpNDDPFczllc';

  // Fetch booking details
  const fetchBookingDetails = async () => {
    if (!referenceId.trim()) {
      setError('Please enter a reference ID');
      return;
    }

    setLoading(true);
    setError(null);
    setBookingData(null);

    try {
      const response = await axios.post<BookingResponse>(
        'https://devapi.flightapi.co.in/v1/fbapi/booking_details',
        {
          reference_id: referenceId,
          transaction_id: '989087',
          end_user_ip: '183.83.43.117',
          token: '3-1-NEWTEST-dmjkwj78BJHk8'
        },
        {
          headers: {
            'x-api-key': API_KEY,
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${BEARER_TOKEN}`
          }
        }
      );

      if (response.data.replyCode === 0) {
        setBookingData(response.data.data);
      } else {
        setError('Failed to fetch booking details');
      }
    } catch (err) {
      setError('Error fetching booking details. Please try again.');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBookingDetails();
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReferenceId(e.target.value);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Download PDF function
  const downloadPDF = async () => {
    if (!bookingData) return;
    
    setPdfLoading(true);
    try {
      // Generate PDF blob
      const blob = await pdf(
        <BookingPDF bookingData={bookingData} />
      ).toBlob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `booking_${bookingData.reference_id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setError('Failed to generate PDF. Please try again.');
    } finally {
      setPdfLoading(false);
    }
  };

  return (
    <div className="booking-details-container">
      <style>{`
        .booking-details-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        
        .search-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 40px;
          border-radius: 10px;
          margin-bottom: 30px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        
        .search-title {
          color: white;
          text-align: center;
          margin-bottom: 30px;
          font-size: 24px;
        }
        
        .search-form {
          display: flex;
          gap: 10px;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .search-input {
          flex: 1;
          min-width: 300px;
          padding: 15px 20px;
          font-size: 16px;
          border: none;
          border-radius: 5px;
          outline: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .search-button {
          padding: 15px 40px;
          font-size: 16px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
          font-weight: bold;
        }
        
        .search-button:hover {
          background-color: #45a049;
        }
        
        .search-button:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
        }
        
        .error-message {
          background-color: #ffebee;
          color: #c62828;
          padding: 15px;
          border-radius: 5px;
          margin: 20px 0;
          text-align: center;
          border-left: 4px solid #c62828;
        }
        
        .loading {
          text-align: center;
          padding: 40px;
          font-size: 18px;
          color: #666;
        }
        
        .booking-card {
          background: white;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          overflow: hidden;
        }
        
        .booking-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
        }
        
        .header-actions {
          display: flex;
          gap: 15px;
          align-items: center;
        }
        
        .pnr-badge {
          background: #4CAF50;
          padding: 8px 15px;
          border-radius: 5px;
          font-weight: bold;
        }
        
        .download-pdf-button {
          background-color: white;
          color: #667eea;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s;
          font-size: 14px;
        }
        
        .download-pdf-button:hover {
          background-color: #f0f0f0;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        
        .download-pdf-button:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
          transform: none;
        }
        
        .section-title {
          font-size: 18px;
          font-weight: bold;
          margin: 20px 20px 10px 20px;
          color: #333;
          border-bottom: 2px solid #667eea;
          padding-bottom: 10px;
        }
        
        .flight-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          padding: 20px;
        }
        
        .flight-card {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 5px;
          border-left: 4px solid #667eea;
        }
        
        .flight-route {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 15px 0;
        }
        
        .city-code {
          font-size: 24px;
          font-weight: bold;
          color: #333;
        }
        
        .city-name {
          color: #666;
          font-size: 14px;
        }
        
        .flight-arrow {
          color: #667eea;
          font-size: 20px;
        }
        
        .airline-info {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 10px 0;
        }
        
        .airline-logo {
          width: 30px;
          height: 30px;
          background: #e0e0e0;
          border-radius: 50%;
        }
        
        .flight-time {
          display: flex;
          justify-content: space-between;
          margin: 10px 0;
          color: #666;
        }
        
        .travellers-section {
          padding: 20px;
        }
        
        .traveller-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
          margin-top: 15px;
        }
        
        .traveller-card {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 5px;
        }
        
        .traveller-name {
          font-size: 18px;
          font-weight: bold;
          color: #333;
        }
        
        .price-breakup {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 5px;
          margin: 20px;
        }
        
        .price-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #ddd;
        }
        
        .price-row.total {
          font-weight: bold;
          font-size: 18px;
          border-bottom: none;
          color: #4CAF50;
        }
        
        .contact-info {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 5px;
          margin: 20px;
        }
        
        .stop-details {
          background: #fff3e0;
          padding: 10px;
          border-radius: 5px;
          margin: 10px 0;
        }
        
        .baggage-info {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 10px;
          margin: 10px 0;
        }
        
        .baggage-item {
          background: #e8f5e8;
          padding: 10px;
          border-radius: 5px;
          text-align: center;
        }
        
        .status-badge {
          padding: 5px 10px;
          border-radius: 3px;
          font-size: 14px;
          font-weight: bold;
        }
        
        .status-badge.paid {
          background: #4CAF50;
          color: white;
        }
        
        .status-badge.unpaid {
          background: #f44336;
          color: white;
        }
        
        .pdf-loading {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid #667eea;
          border-top-color: transparent;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-right: 8px;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Search Section */}
      <div className="search-section">
        <h2 className="search-title">Search Booking Details</h2>
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            className="search-input"
            placeholder="Enter Reference ID (e.g., FB9242)"
            value={referenceId}
            onChange={handleInputChange}
            disabled={loading}
          />
          <button
            type="submit"
            className="search-button"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {/* Error Message */}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Fetching booking details...</p>
        </div>
      )}

      {/* Booking Details */}
      {bookingData && !loading && (
        <div className="booking-card">
          {/* Header with PDF Download Button */}
          <div className="booking-header">
            <div>
              <h2>Booking Reference: {bookingData.reference_id}</h2>
              <p>Booking Date: {formatDate(bookingData.booking_date)}</p>
            </div>
            <div className="header-actions">
              <div className="pnr-badge">
                PNR: {bookingData.flight_pnrs}
              </div>
              <button
                onClick={downloadPDF}
                className="download-pdf-button"
                disabled={pdfLoading}
              >
                {pdfLoading ? (
                  <>
                    <span className="pdf-loading"></span>
                    Generating PDF...
                  </>
                ) : (
                  <>
                    📄 Download PDF
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Flight Details */}
          <div className="flight-details">
            {/* Onward Flight */}
            <div className="flight-card">
              <h3 style={{ color: '#667eea', marginBottom: '10px' }}>✈️ Onward Flight</h3>
              <div className="flight-route">
                <div>
                  <div className="city-code">{bookingData.onward.depeparture_city_code}</div>
                  <div className="city-name">{bookingData.onward.depeparture_city_name}</div>
                </div>
                <div className="flight-arrow">→</div>
                <div>
                  <div className="city-code">{bookingData.onward.arrival_city_code}</div>
                  <div className="city-name">{bookingData.onward.arrival_city_name}</div>
                </div>
              </div>
              
              <div className="airline-info">
                <div className="airline-logo"></div>
                <div>
                  <strong>{bookingData.onward.airline_name}</strong> ({bookingData.onward.airline_code} {bookingData.onward.flight_number})
                </div>
              </div>
              
              <div className="flight-time">
                <div>
                  <div>{formatDate(bookingData.onward.departure_date)}</div>
                  <div><strong>{bookingData.onward.departure_time}</strong></div>
                </div>
                <div>
                  <div>{formatDate(bookingData.onward.arrival_date)}</div>
                  <div><strong>{bookingData.onward.arrival_time}</strong></div>
                </div>
              </div>
              
              {bookingData.flight_stop_details.length > 0 && (
                <div className="stop-details">
                  <strong>Stops:</strong>
                  {bookingData.flight_stop_details.map((stop, index) => (
                    <div key={index}>
                      {stop.city_name} ({stop.city_code}) - {stop.stop_duration}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Return Flight */}
            {bookingData.return_flight === 1 && (
              <div className="flight-card">
                <h3 style={{ color: '#667eea', marginBottom: '10px' }}>🔄 Return Flight</h3>
                <div className="flight-route">
                  <div>
                    <div className="city-code">{bookingData.return.depeparture_city_code}</div>
                    <div className="city-name">{bookingData.return.depeparture_city_name}</div>
                  </div>
                  <div className="flight-arrow">→</div>
                  <div>
                    <div className="city-code">{bookingData.return.arrival_city_code}</div>
                    <div className="city-name">{bookingData.return.arrival_city_name}</div>
                  </div>
                </div>
                
                <div className="airline-info">
                  <div className="airline-logo"></div>
                  <div>
                    <strong>{bookingData.return.airline_name}</strong> ({bookingData.return.airline_code} {bookingData.return.airline_number})
                  </div>
                </div>
                
                <div className="flight-time">
                  <div>
                    <div>{formatDate(bookingData.return.return_date)}</div>
                    <div><strong>{bookingData.return.return_departure_time}</strong></div>
                  </div>
                  <div>
                    <div>{formatDate(bookingData.return.return_date)}</div>
                    <div><strong>{bookingData.return.return_arrival_time}</strong></div>
                  </div>
                </div>
                
                {bookingData.return_flight_stop_details.length > 0 && (
                  <div className="stop-details">
                    <strong>Stops:</strong>
                    {bookingData.return_flight_stop_details.map((stop, index) => (
                      <div key={index}>
                        {stop.city_name} ({stop.city_code}) - {stop.stop_duration}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Travellers Section */}
          <div className="travellers-section">
            <div className="section-title">👥 Travellers ({bookingData.total_book_seats})</div>
            <div className="traveller-grid">
              {bookingData.travellers.map((traveller, index) => (
                <div key={index} className="traveller-card">
                  <div className="traveller-name">
                    {traveller.gender} {traveller.first_name} {traveller.last_name}
                  </div>
                  <div style={{ marginTop: '10px', color: '#666' }}>
                    <div>Age: {traveller.age}</div>
                    <div>DOB: {traveller.dob}</div>
                    {traveller.passport_no && (
                      <>
                        <div>Passport: {traveller.passport_no}</div>
                        <div>Expires: {traveller.passport_expire_date}</div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Price Breakup */}
          <div className="price-breakup">
            <div className="section-title">💰 Price Breakup</div>
            <div className="price-row">
              <span>Base Price:</span>
              <span>₹{bookingData.price_breakup.base_price}</span>
            </div>
            <div className="price-row">
              <span>Fees & Taxes:</span>
              <span>₹{bookingData.price_breakup.fees_taxes}</span>
            </div>
            <div className="price-row">
              <span>Service Charge:</span>
              <span>₹{bookingData.price_breakup.service_charge}</span>
            </div>
            <div className="price-row">
              <span>Discount:</span>
              <span>-₹{bookingData.price_breakup.discount}</span>
            </div>
            <div className="price-row total">
              <span>Total Amount:</span>
              <span>₹{bookingData.total_amount}</span>
            </div>
            <div style={{ marginTop: '10px', textAlign: 'right' }}>
              <span className={`status-badge ${bookingData.payment_status ? 'paid' : 'unpaid'}`}>
                {bookingData.payment_status ? '✅ Paid' : '❌ Unpaid'}
              </span>
            </div>
          </div>

          {/* Baggage Information */}
          <div className="baggage-info" style={{ padding: '20px' }}>
            <div className="section-title">🧳 Baggage Allowance</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div className="baggage-item">
                <strong>Check-in (Adult)</strong>
                <div>{bookingData.baggage.checkin_baggages_adult} kg</div>
              </div>
              <div className="baggage-item">
                <strong>Cabin (Adult)</strong>
                <div>{bookingData.baggage.cabin_baggages_adult} kg</div>
              </div>
              <div className="baggage-item">
                <strong>Check-in (Child)</strong>
                <div>{bookingData.baggage.checkin_baggages_children} kg</div>
              </div>
              <div className="baggage-item">
                <strong>Cabin (Child)</strong>
                <div>{bookingData.baggage.cabin_baggages_children} kg</div>
              </div>
            </div>
            <div style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
              ⚠️ {bookingData.baggage.disclaimer}
            </div>
          </div>

          {/* Contact Information */}
          <div className="contact-info">
            <div className="section-title">📞 Contact Information</div>
            <div style={{ display: 'grid', gap: '5px' }}>
              <div><strong>Name:</strong> {bookingData.contact_name}</div>
              <div><strong>Email:</strong> {bookingData.contact_email}</div>
              <div><strong>Phone:</strong> {bookingData.contact_number}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Apidata;