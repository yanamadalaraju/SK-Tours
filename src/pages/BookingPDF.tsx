// components/BookingPDF.tsx

import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Register a font (optional, for better PDF rendering)
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/helvetica-neue/v23/1Ptsg8zYS_SKggPNyCg4QIFqPfE.ttf' }
  ]
});

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 10,
  },
  header: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#667eea',
    color: 'white',
    borderRadius: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  headerText: {
    fontSize: 10,
    marginBottom: 3,
  },
  pnrBadge: {
    backgroundColor: '#4CAF50',
    padding: 5,
    borderRadius: 3,
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 5,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#667eea',
    paddingBottom: 5,
  },
  flightCard: {
    backgroundColor: '#f8f9fa',
    padding: 10,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#667eea',
  },
  flightRoute: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  cityCode: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cityName: {
    fontSize: 8,
    color: '#666',
  },
  flightArrow: {
    fontSize: 14,
    color: '#667eea',
  },
  airlineInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  flightTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    fontSize: 9,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  gridItem: {
    width: '50%',
    padding: 5,
  },
  travellerCard: {
    backgroundColor: '#f8f9fa',
    padding: 8,
    borderRadius: 3,
    marginBottom: 5,
  },
  travellerName: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    fontSize: 9,
  },
  totalRow: {
    fontWeight: 'bold',
    fontSize: 11,
    color: '#4CAF50',
    borderBottomWidth: 0,
  },
  baggageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  baggageItem: {
    width: '50%',
    padding: 5,
    backgroundColor: '#e8f5e8',
    marginBottom: 5,
    textAlign: 'center',
  },
  stopDetails: {
    backgroundColor: '#fff3e0',
    padding: 5,
    borderRadius: 3,
    marginTop: 5,
    fontSize: 8,
  },
  contactInfo: {
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  statusBadge: {
    padding: 3,
    borderRadius: 3,
    fontSize: 8,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
  paid: {
    backgroundColor: '#4CAF50',
    color: 'white',
  },
  unpaid: {
    backgroundColor: '#f44336',
    color: 'white',
  },
  footer: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 8,
    color: '#666',
  },
});

interface BookingPDFProps {
  bookingData: any; // Using any for simplicity, but you can use the BookingData type
}

const BookingPDF: React.FC<BookingPDFProps> = ({ bookingData }) => {
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Booking Reference: {bookingData.reference_id}</Text>
          <Text style={styles.headerText}>Booking Date: {formatDate(bookingData.booking_date)}</Text>
          <View style={styles.pnrBadge}>
            <Text>PNR: {bookingData.flight_pnrs}</Text>
          </View>
        </View>

        {/* Flight Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Flight Details</Text>
          
          {/* Onward Flight */}
          <View style={styles.flightCard}>
            <Text style={{ fontSize: 12, color: '#667eea', marginBottom: 5 }}>✈️ Onward Flight</Text>
            
            <View style={styles.flightRoute}>
              <View>
                <Text style={styles.cityCode}>{bookingData.onward.depeparture_city_code}</Text>
                <Text style={styles.cityName}>{bookingData.onward.depeparture_city_name}</Text>
              </View>
              <Text style={styles.flightArrow}>→</Text>
              <View>
                <Text style={styles.cityCode}>{bookingData.onward.arrival_city_code}</Text>
                <Text style={styles.cityName}>{bookingData.onward.arrival_city_name}</Text>
              </View>
            </View>
            
            <View style={styles.airlineInfo}>
              <Text>
                <Text style={{ fontWeight: 'bold' }}>{bookingData.onward.airline_name}</Text>
                <Text> ({bookingData.onward.airline_code} {bookingData.onward.flight_number})</Text>
              </Text>
            </View>
            
            <View style={styles.flightTime}>
              <View>
                <Text>{formatDate(bookingData.onward.departure_date)}</Text>
                <Text style={{ fontWeight: 'bold' }}>{bookingData.onward.departure_time}</Text>
              </View>
              <View>
                <Text>{formatDate(bookingData.onward.arrival_date)}</Text>
                <Text style={{ fontWeight: 'bold' }}>{bookingData.onward.arrival_time}</Text>
              </View>
            </View>
            
            {bookingData.flight_stop_details.length > 0 && (
              <View style={styles.stopDetails}>
                <Text style={{ fontWeight: 'bold' }}>Stops:</Text>
                {bookingData.flight_stop_details.map((stop: any, index: number) => (
                  <Text key={index}>{stop.city_name} ({stop.city_code}) - {stop.stop_duration}</Text>
                ))}
              </View>
            )}
          </View>

          {/* Return Flight (if exists) */}
          {bookingData.return_flight === 1 && (
            <View style={styles.flightCard}>
              <Text style={{ fontSize: 12, color: '#667eea', marginBottom: 5 }}>🔄 Return Flight</Text>
              
              <View style={styles.flightRoute}>
                <View>
                  <Text style={styles.cityCode}>{bookingData.return.depeparture_city_code}</Text>
                  <Text style={styles.cityName}>{bookingData.return.depeparture_city_name}</Text>
                </View>
                <Text style={styles.flightArrow}>→</Text>
                <View>
                  <Text style={styles.cityCode}>{bookingData.return.arrival_city_code}</Text>
                  <Text style={styles.cityName}>{bookingData.return.arrival_city_name}</Text>
                </View>
              </View>
              
              <View style={styles.airlineInfo}>
                <Text>
                  <Text style={{ fontWeight: 'bold' }}>{bookingData.return.airline_name}</Text>
                  <Text> ({bookingData.return.airline_code} {bookingData.return.airline_number})</Text>
                </Text>
              </View>
              
              <View style={styles.flightTime}>
                <View>
                  <Text>{formatDate(bookingData.return.return_date)}</Text>
                  <Text style={{ fontWeight: 'bold' }}>{bookingData.return.return_departure_time}</Text>
                </View>
                <View>
                  <Text>{formatDate(bookingData.return.return_date)}</Text>
                  <Text style={{ fontWeight: 'bold' }}>{bookingData.return.return_arrival_time}</Text>
                </View>
              </View>
              
              {bookingData.return_flight_stop_details.length > 0 && (
                <View style={styles.stopDetails}>
                  <Text style={{ fontWeight: 'bold' }}>Stops:</Text>
                  {bookingData.return_flight_stop_details.map((stop: any, index: number) => (
                    <Text key={index}>{stop.city_name} ({stop.city_code}) - {stop.stop_duration}</Text>
                  ))}
                </View>
              )}
            </View>
          )}
        </View>

        {/* Travellers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Travellers ({bookingData.total_book_seats})</Text>
          <View style={styles.grid}>
            {bookingData.travellers.map((traveller: any, index: number) => (
              <View key={index} style={styles.gridItem}>
                <View style={styles.travellerCard}>
                  <Text style={styles.travellerName}>
                    {traveller.gender} {traveller.first_name} {traveller.last_name}
                  </Text>
                  <View style={{ marginTop: 5, fontSize: 8, color: '#666' }}>
                    <Text>Age: {traveller.age}</Text>
                    <Text>DOB: {traveller.dob}</Text>
                    {traveller.passport_no && (
                      <>
                        <Text>Passport: {traveller.passport_no}</Text>
                        <Text>Expires: {traveller.passport_expire_date}</Text>
                      </>
                    )}
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Price Breakup */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Breakup</Text>
          
          <View style={styles.priceRow}>
            <Text>Base Price:</Text>
            <Text>₹{bookingData.price_breakup.base_price}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text>Fees & Taxes:</Text>
            <Text>₹{bookingData.price_breakup.fees_taxes}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text>Service Charge:</Text>
            <Text>₹{bookingData.price_breakup.service_charge}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text>Discount:</Text>
            <Text>-₹{bookingData.price_breakup.discount}</Text>
          </View>
          <View style={[styles.priceRow, styles.totalRow]}>
            <Text>Total Amount:</Text>
            <Text>₹{bookingData.total_amount}</Text>
          </View>
          
          <View style={{ marginTop: 10, alignItems: 'flex-end' }}>
            <View style={[styles.statusBadge, bookingData.payment_status ? styles.paid : styles.unpaid]}>
              <Text>{bookingData.payment_status ? 'Paid' : 'Unpaid'}</Text>
            </View>
          </View>
        </View>

        {/* Baggage Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Baggage Allowance</Text>
          
          <View style={styles.baggageGrid}>
            <View style={styles.baggageItem}>
              <Text style={{ fontWeight: 'bold' }}>Check-in (Adult)</Text>
              <Text>{bookingData.baggage.checkin_baggages_adult} kg</Text>
            </View>
            <View style={styles.baggageItem}>
              <Text style={{ fontWeight: 'bold' }}>Cabin (Adult)</Text>
              <Text>{bookingData.baggage.cabin_baggages_adult} kg</Text>
            </View>
            <View style={styles.baggageItem}>
              <Text style={{ fontWeight: 'bold' }}>Check-in (Child)</Text>
              <Text>{bookingData.baggage.checkin_baggages_children} kg</Text>
            </View>
            <View style={styles.baggageItem}>
              <Text style={{ fontWeight: 'bold' }}>Cabin (Child)</Text>
              <Text>{bookingData.baggage.cabin_baggages_children} kg</Text>
            </View>
          </View>
          
          <Text style={{ fontSize: 7, color: '#666', marginTop: 5 }}>
            ⚠️ {bookingData.baggage.disclaimer}
          </Text>
        </View>

        {/* Contact Information */}
        <View style={styles.contactInfo}>
          <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 5 }}>Contact Information</Text>
          <Text style={{ fontSize: 9 }}>Name: {bookingData.contact_name}</Text>
          <Text style={{ fontSize: 9 }}>Email: {bookingData.contact_email}</Text>
          <Text style={{ fontSize: 9 }}>Phone: {bookingData.contact_number}</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>This is a computer generated document. No signature is required.</Text>
          <Text>Generated on {new Date().toLocaleDateString()}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default BookingPDF;