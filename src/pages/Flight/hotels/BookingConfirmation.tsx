import React, { useState, useEffect } from "react";
import { 
  MdFlightTakeoff, 
  MdFlightLand, 
  MdPerson, 
  MdChildCare, 
  MdBabyChangingStation,
  MdCheckCircle,
  MdPrint,
  MdEmail,
  MdDownload,
  MdArrowBack
} from "react-icons/md";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import axios from "axios";

interface BookingConfirmationProps {
  bookingData: any;
  referenceId: string;
  passengerDetails: any[];
  contactDetails: any;
  onBack: () => void;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  bookingData,
  referenceId,
  passengerDetails,
  contactDetails,
  onBack
}) => {
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const formatTime = (timeStr: string) => {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      // Implement PDF download logic here
      alert("Download functionality will be implemented");
    } catch (error) {
      console.error("Download error:", error);
    } finally {
      setDownloading(false);
    }
  };

  const handleEmail = async () => {
    try {
      // Implement email sending logic here
      alert("Email will be sent to: " + contactDetails.email);
    } catch (error) {
      console.error("Email error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
        {/* Success Banner */}
        <div style={{ 
          backgroundColor: '#10b981', 
          padding: '24px 0',
          color: 'white',
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '8px' }}>
              <MdCheckCircle size={40} />
              <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>Booking Confirmed!</h1>
            </div>
            <p style={{ fontSize: '16px', opacity: 0.9 }}>
              Your flight tickets have been successfully Booked
            </p>
            <div style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              padding: '8px 16px',
              borderRadius: '20px',
              marginTop: '16px',
              fontSize: '14px'
            }}>
              <span style={{ fontWeight: 'bold' }}>Reference ID:</span> {referenceId}
            </div>
          </div>
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 16px' }}>
          {/* Action Buttons */}
          <div style={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '32px'
          }}>
            <button
              onClick={onBack}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                backgroundColor: '#f3f4f6',
                color: '#374151',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              <MdArrowBack /> Back to Home
            </button>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handlePrint}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                <MdPrint /> Print Itinerary
              </button>

              <button
                onClick={handleEmail}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  backgroundColor: '#f59e0b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                <MdEmail /> Email Itinerary
              </button>

              {/* <button
                onClick={handleDownload}
                disabled={downloading}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  opacity: downloading ? 0.7 : 1
                }}
              >
                <MdDownload /> {downloading ? 'Downloading...' : 'Download PDF'}
              </button> */}
            </div>
          </div>

          {/* Flight Details Card */}
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '12px', 
            padding: '32px',
            marginBottom: '24px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{ 
              fontSize: '20px', 
              fontWeight: 'bold', 
              color: '#1f2937',
              marginBottom: '24px',
              borderBottom: '2px solid #f3f4f6',
              paddingBottom: '12px'
            }}>
              Flight Details
            </h2>

            {/* Onward Flight */}
            <div style={{ marginBottom: bookingData?.return_flight ? '32px' : '0' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                marginBottom: '20px',
                paddingBottom: '12px',
                borderBottom: '1px solid #f3f4f6'
              }}>
                <MdFlightTakeoff style={{ color: '#3b82f6' }} />
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#374151' }}>Departure Flight</h3>
              </div>

              <div style={{ 
                display: 'grid',
                gridTemplateColumns: '1fr auto 1fr',
                gap: '24px',
                alignItems: 'center'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>
                    {formatTime(bookingData?.onward?.departure_time)}
                  </div>
                  <div style={{ fontSize: '16px', color: '#374151', fontWeight: '500', marginTop: '4px' }}>
                    {bookingData?.onward?.depeparture_city_code}
                  </div>
                  <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '2px' }}>
                    {formatDate(bookingData?.onward?.departure_date)}
                  </div>
                  <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '4px' }}>
                    {bookingData?.onward?.depeparture_city_name}
                  </div>
                </div>

                <div style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>
                    {bookingData?.flight_stop_details?.[0]?.city_name ? 
                      `1 stop (${bookingData.flight_stop_details[0].city_code})` : 'Non-stop'}
                  </div>
                  <div style={{ 
                    height: '2px', 
                    backgroundColor: '#d1d5db',
                    position: 'relative',
                    margin: '0 20px'
                  }}>
                    <div style={{
                      position: 'absolute',
                      left: '0',
                      top: '-6px',
                      width: '12px',
                      height: '12px',
                      backgroundColor: '#3b82f6',
                      borderRadius: '50%'
                    }}></div>
                    <div style={{
                      position: 'absolute',
                      right: '0',
                      top: '-6px',
                      width: '12px',
                      height: '12px',
                      backgroundColor: '#10b981',
                      borderRadius: '50%'
                    }}></div>
                  </div>
                  <div style={{ 
                    display: 'inline-block',
                    backgroundColor: '#f3f4f6',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#6b7280',
                    marginTop: '8px'
                  }}>
                    {bookingData?.flight_stop_details?.[0]?.stop_duration ? 
                      `${bookingData.flight_stop_details[0].stop_duration} layover` : 'Direct'}
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>
                    {formatTime(bookingData?.onward?.arrival_time)}
                  </div>
                  <div style={{ fontSize: '16px', color: '#374151', fontWeight: '500', marginTop: '4px' }}>
                    {bookingData?.onward?.arrival_city_code}
                  </div>
                  <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '2px' }}>
                    {formatDate(bookingData?.onward?.arrival_date)}
                  </div>
                  <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '4px' }}>
                    {bookingData?.onward?.arrival_city_name}
                  </div>
                </div>
              </div>

              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px',
                marginTop: '24px',
                paddingTop: '20px',
                borderTop: '1px solid #f3f4f6'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {/* <img 
                    src={`/images/airlines/${bookingData?.onward?.airline_logo}`} 
                    alt={bookingData?.onward?.airline_name}
                    style={{ width: '24px', height: '24px', objectFit: 'contain' }}
                  /> */}
                  <span style={{ fontSize: '14px', color: '#374151' }}>
                    {bookingData?.onward?.airline_name} ({bookingData?.onward?.airline_code})
                  </span>
                </div>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>
                  Flight: {bookingData?.onward?.flight_number}
                </div>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>
                  PNR: {bookingData?.flight_pnrs}
                </div>
              </div>
            </div>

            {/* Return Flight */}
            {bookingData?.return_flight === 1 && bookingData?.return && (
              <div style={{ marginTop: '40px', paddingTop: '32px', borderTop: '2px solid #e5e7eb' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  marginBottom: '20px',
                  paddingBottom: '12px',
                  borderBottom: '1px solid #f3f4f6'
                }}>
                  <MdFlightLand style={{ color: '#f59e0b' }} />
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#374151' }}>Return Flight</h3>
                </div>

                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: '1fr auto 1fr',
                  gap: '24px',
                  alignItems: 'center'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>
                      {formatTime(bookingData?.return?.return_departure_time)}
                    </div>
                    <div style={{ fontSize: '16px', color: '#374151', fontWeight: '500', marginTop: '4px' }}>
                      {bookingData?.return?.depeparture_city_code}
                    </div>
                    <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '2px' }}>
                      {formatDate(bookingData?.return?.return_date)}
                    </div>
                    <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '4px' }}>
                      {bookingData?.return?.depeparture_city_name}
                    </div>
                  </div>

                  <div style={{ flex: 1, textAlign: 'center' }}>
                    <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>
                      {bookingData?.return_flight_stop_details?.[0]?.city_name ? 
                        `1 stop (${bookingData.return_flight_stop_details[0].city_code})` : 'Non-stop'}
                    </div>
                    <div style={{ 
                      height: '2px', 
                      backgroundColor: '#d1d5db',
                      position: 'relative',
                      margin: '0 20px'
                    }}>
                      <div style={{
                        position: 'absolute',
                        left: '0',
                        top: '-6px',
                        width: '12px',
                        height: '12px',
                        backgroundColor: '#f59e0b',
                        borderRadius: '50%'
                      }}></div>
                      <div style={{
                        position: 'absolute',
                        right: '0',
                        top: '-6px',
                        width: '12px',
                        height: '12px',
                        backgroundColor: '#10b981',
                        borderRadius: '50%'
                      }}></div>
                    </div>
                    <div style={{ 
                      display: 'inline-block',
                      backgroundColor: '#f3f4f6',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      color: '#6b7280',
                      marginTop: '8px'
                    }}>
                      {bookingData?.return_flight_stop_details?.[0]?.stop_duration ? 
                        `${bookingData.return_flight_stop_details[0].stop_duration} layover` : 'Direct'}
                    </div>
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>
                      {formatTime(bookingData?.return?.return_arrival_time)}
                    </div>
                    <div style={{ fontSize: '16px', color: '#374151', fontWeight: '500', marginTop: '4px' }}>
                      {bookingData?.return?.arrival_city_code}
                    </div>
                    <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '2px' }}>
                      {formatDate(bookingData?.return?.return_arrival_date)}
                    </div>
                    <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '4px' }}>
                      {bookingData?.return?.arrival_city_name}
                    </div>
                  </div>
                </div>

                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '20px',
                  marginTop: '24px',
                  paddingTop: '20px',
                  borderTop: '1px solid #f3f4f6'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {/* <img 
                      src={`/images/airlines/${bookingData?.return?.airline_logo}`} 
                      alt={bookingData?.return?.airline_name}
                      style={{ width: '24px', height: '24px', objectFit: 'contain' }}
                    /> */}
                    <span style={{ fontSize: '14px', color: '#374151' }}>
                      {bookingData?.return?.airline_name} ({bookingData?.return?.airline_code})
                    </span>
                  </div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>
                    Flight: {bookingData?.return?.airline_number}
                  </div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>
                    PNR: {bookingData?.flight_pnrs}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Passenger Details Card */}
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '12px', 
            padding: '32px',
            marginBottom: '24px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{ 
              fontSize: '20px', 
              fontWeight: 'bold', 
              color: '#1f2937',
              marginBottom: '24px',
              borderBottom: '2px solid #f3f4f6',
              paddingBottom: '12px'
            }}>
              Passenger Details
            </h2>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#374151', fontWeight: '600' }}>Passenger</th>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#374151', fontWeight: '600' }}>Type</th>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#374151', fontWeight: '600' }}>Ticket Price</th>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#374151', fontWeight: '600' }}>Passport No.</th>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#374151', fontWeight: '600' }}>Passport Expiry</th>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#374151', fontWeight: '600' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookingData?.travellers?.map((traveller: any, index: number) => (
                    <tr key={index} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '16px 12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ 
                            width: '40px', 
                            height: '40px', 
                            borderRadius: '50%', 
                            backgroundColor: '#e0f2fe',
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            color: '#0284c7'
                          }}>
                            <MdPerson size={20} />
                          </div>
                          <div>
                            <div style={{ fontWeight: '600', color: '#1f2937' }}>
                              {traveller.gender} {traveller.first_name} {traveller.last_name}
                            </div>
                            <div style={{ fontSize: '14px', color: '#6b7280' }}>
                              Age: {traveller.age} • DOB: {traveller.dob}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px 12px', color: '#374151' }}>
                        <span style={{
                          padding: '6px 12px',
                          borderRadius: '12px',
                          backgroundColor: traveller.age >= 12 ? '#dbeafe' : 
                                        traveller.age >= 2 ? '#fef3c7' : '#dcfce7',
                          color: traveller.age >= 12 ? '#1d4ed8' : 
                                traveller.age >= 2 ? '#d97706' : '#059669',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}>
                          {traveller.age >= 12 ? 'Adult' : traveller.age >= 2 ? 'Child' : 'Infant'}
                        </span>
                      </td>
                      <td style={{ padding: '16px 12px', color: '#374151', fontWeight: '600' }}>
                        ₹{traveller.ticket_price?.toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '16px 12px', color: '#374151', fontFamily: 'monospace' }}>
                        {traveller.passport_no}
                      </td>
                      <td style={{ padding: '16px 12px', color: '#374151' }}>
                        {traveller.passport_expire_date}
                      </td>
                      <td style={{ padding: '16px 12px' }}>
                        <span style={{
                          padding: '6px 12px',
                          borderRadius: '12px',
                          backgroundColor: traveller.status === 1 ? '#dcfce7' : '#fee2e2',
                          color: traveller.status === 1 ? '#059669' : '#dc2626',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}>
                          {traveller.status === 1 ? 'Confirmed' : 'Pending'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total Price */}
            <div style={{ 
              marginTop: '24px',
              padding: '20px',
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '16px', color: '#64748b' }}>Total Amount</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>Inclusive of all taxes</div>
                </div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#059669' }}>
                  ₹{bookingData?.total_amount?.toLocaleString('en-IN')}
                </div>
              </div>
            </div>
          </div>

          {/* Contact & Payment Details */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px',
            marginBottom: '24px'
          }}>
            {/* Contact Details */}
            <div style={{ 
              backgroundColor: 'white', 
              borderRadius: '12px', 
              padding: '24px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: '600', 
                color: '#1f2937',
                marginBottom: '16px'
              }}>
                Contact Information
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Name</div>
                  <div style={{ fontSize: '16px', color: '#1f2937', fontWeight: '500' }}>
                    {bookingData?.contact_name || contactDetails.name}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Email</div>
                  <div style={{ fontSize: '16px', color: '#1f2937', fontWeight: '500' }}>
                    {bookingData?.contact_email || contactDetails.email}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Phone</div>
                  <div style={{ fontSize: '16px', color: '#1f2937', fontWeight: '500' }}>
                    {bookingData?.contact_number || contactDetails.phone}
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Summary */}
            <div style={{ 
              backgroundColor: 'white', 
              borderRadius: '12px', 
              padding: '24px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: '600', 
                color: '#1f2937',
                marginBottom: '16px'
              }}>
                Booking Summary
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6b7280' }}>Booking Date:</span>
                  <span style={{ fontWeight: '500' }}>{formatDate(bookingData?.booking_date)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6b7280' }}>Reference ID:</span>
                  <span style={{ fontWeight: '500', color: '#3b82f6' }}>{referenceId}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6b7280' }}>PNR:</span>
                  <span style={{ fontWeight: '500' }}>{bookingData?.flight_pnrs}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6b7280' }}>Seat Status:</span>
                  <span style={{ 
                    color: bookingData?.seat_book_status ? '#059669' : '#dc2626',
                    fontWeight: '500'
                  }}>
                    {bookingData?.seat_book_status ? 'Confirmed' : 'Pending'}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6b7280' }}>Payment Status:</span>
                  <span style={{ 
                    color: bookingData?.payment_status ? '#059669' : '#dc2626',
                    fontWeight: '500'
                  }}>
                    {bookingData?.payment_status ? 'Paid' : 'Pending'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Important Information */}
    
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookingConfirmation;