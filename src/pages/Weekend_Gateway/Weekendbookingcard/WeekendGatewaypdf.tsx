// WeekendGatewaypdf.tsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { BASE_URL } from '@/ApiUrls';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2E4D98',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    backgroundColor: '#2E4D98',
    color: 'white',
    padding: 5,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#2E4D98',
  },
  value: {
    fontSize: 11,
    marginBottom: 5,
    lineHeight: 1.5,
  },
  image: {
    width: '100%',
    height: 200,
    objectFit: 'cover',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  cellLabel: {
    width: '40%',
    fontSize: 11,
    fontWeight: 'bold',
    color: '#2E4D98',
  },
  cellValue: {
    width: '60%',
    fontSize: 11,
  },
  table: {
    display: 'table',
    width: 'auto',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '50%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    padding: 5,
  },
  tableHeader: {
    backgroundColor: '#2E4D98',
    color: 'white',
    fontWeight: 'bold',
  },
  tableCell: {
    fontSize: 10,
  },
  tourTable: {
    width: '100%',
    marginBottom: 10,
  },
  tourHeader: {
    backgroundColor: '#2E4D98',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  tourHeaderCell: {
    padding: 5,
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
    width: '50%',
  },
  tourRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  tourCell: {
    padding: 5,
    fontSize: 9,
    width: '50%',
  },
});

interface WeekendGatewaypdfProps {
  gateway: any;
  images: any[];
  currentImageIndex: number;
}

const WeekendGatewaypdf: React.FC<WeekendGatewaypdfProps> = ({ gateway, images, currentImageIndex }) => {
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '';
    return imagePath.startsWith('http') ? imagePath : `${BASE_URL}${imagePath}`;
  };

  const carouselImages = images.length > 0
    ? images.map(img => getImageUrl(img.image_url))
    : [gateway.main_image ? getImageUrl(gateway.main_image) : ''];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Title */}
        <Text style={styles.title}>
          {gateway.name} ({gateway.gateway_code})
        </Text>

        {/* Main Image */}
        {carouselImages[0] && (
          <Image src={carouselImages[0]} style={styles.image} />
        )}

        {/* Gateway Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gateway Details</Text>
          <View style={styles.row}>
            <Text style={styles.cellLabel}>Gateway Code:</Text>
            <Text style={styles.cellValue}>{gateway.gateway_code}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cellLabel}>Name:</Text>
            <Text style={styles.cellValue}>{gateway.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cellLabel}>Price:</Text>
            <Text style={styles.cellValue}>₹{parseFloat(gateway.price).toLocaleString('en-IN')}</Text>
          </View>
        </View>

        {/* Overview */}
        {gateway.overview && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <Text style={styles.value}>{gateway.overview}</Text>
          </View>
        )}

        {/* Tour Cost */}
        {(gateway.per_pax_twin || gateway.per_pax_triple || gateway.child_with_bed || gateway.child_without_bed || gateway.infant || gateway.per_pax_single) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tour Cost</Text>
            <View style={styles.tourTable}>
              <View style={styles.tourHeader}>
                <Text style={styles.tourHeaderCell}>Particulars - Cost in INR</Text>
                <Text style={styles.tourHeaderCell}>Rate</Text>
              </View>
              <View style={styles.tourRow}>
                <Text style={styles.tourCell}>Per pax on Twin Basis</Text>
                <Text style={styles.tourCell}>{gateway.per_pax_twin ? `₹ ${parseInt(gateway.per_pax_twin).toLocaleString()}` : '-'}</Text>
              </View>
              <View style={styles.tourRow}>
                <Text style={styles.tourCell}>Per pax on Triple Basis</Text>
                <Text style={styles.tourCell}>{gateway.per_pax_triple ? `₹ ${parseInt(gateway.per_pax_triple).toLocaleString()}` : '-'}</Text>
              </View>
              <View style={styles.tourRow}>
                <Text style={styles.tourCell}>Child with Bed</Text>
                <Text style={styles.tourCell}>{gateway.child_with_bed ? `₹ ${parseInt(gateway.child_with_bed).toLocaleString()}` : '-'}</Text>
              </View>
              <View style={styles.tourRow}>
                <Text style={styles.tourCell}>Child without Bed</Text>
                <Text style={styles.tourCell}>{gateway.child_without_bed ? `₹ ${parseInt(gateway.child_without_bed).toLocaleString()}` : '-'}</Text>
              </View>
              <View style={styles.tourRow}>
                <Text style={styles.tourCell}>Infant</Text>
                <Text style={styles.tourCell}>{gateway.infant ? `₹ ${parseInt(gateway.infant).toLocaleString()}` : '-'}</Text>
              </View>
              <View style={styles.tourRow}>
                <Text style={styles.tourCell}>Per pax Single Occupancy</Text>
                <Text style={styles.tourCell}>{gateway.per_pax_single ? `₹ ${parseInt(gateway.per_pax_single).toLocaleString()}` : '-'}</Text>
              </View>
            </View>
          </View>
        )}

        {/* Inclusive & Exclusive */}
        {(gateway.inclusive || gateway.exclusive) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Inclusive & Exclusive</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={[styles.tableCol, styles.tableHeader]}>
                  <Text style={[styles.tableCell, { color: 'white' }]}>Inclusive</Text>
                </View>
                <View style={[styles.tableCol, styles.tableHeader]}>
                  <Text style={[styles.tableCell, { color: 'white' }]}>Exclusive</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {gateway.inclusive ? gateway.inclusive.split('\n').join('\n') : 'No inclusive items'}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {gateway.exclusive ? gateway.exclusive.split('\n').join('\n') : 'No exclusive items'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Places Nearby */}
        {gateway.places_nearby && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Places Near By</Text>
            <Text style={styles.value}>{gateway.places_nearby}</Text>
          </View>
        )}

        {/* Booking Policy */}
        {gateway.booking_policy && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Booking Policy</Text>
            <Text style={styles.value}>{gateway.booking_policy}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default WeekendGatewaypdf;