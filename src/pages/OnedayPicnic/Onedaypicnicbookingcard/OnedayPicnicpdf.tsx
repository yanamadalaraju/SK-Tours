// OnedayPicnicpdf.tsx
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
  valueText: {
    fontSize: 11,
    marginBottom: 5,
    lineHeight: 1.5,
  },
});

interface OnedayPicnicpdfProps {
  picnic: any;
  images: any[];
  currentImageIndex: number;
}

const OnedayPicnicpdf: React.FC<OnedayPicnicpdfProps> = ({ picnic, images, currentImageIndex }) => {
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '';
    return imagePath.startsWith('http') ? imagePath : `${BASE_URL}${imagePath}`;
  };

  const carouselImages = images.length > 0
    ? images.map(img => getImageUrl(img.image_url))
    : [picnic.main_image ? getImageUrl(picnic.main_image) : ''];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Title */}
        <Text style={styles.title}>
          {picnic.name} ({picnic.picnic_code})
        </Text>

        {/* Main Image */}
        {carouselImages[0] && (
          <Image src={carouselImages[0]} style={styles.image} />
        )}

        {/* Picnic Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Picnic Details</Text>
          <View style={styles.row}>
            <Text style={styles.cellLabel}>Picnic Code:</Text>
            <Text style={styles.cellValue}>{picnic.picnic_code}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cellLabel}>Name:</Text>
            <Text style={styles.cellValue}>{picnic.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cellLabel}>Price:</Text>
            <Text style={styles.cellValue}>₹{parseFloat(picnic.price).toLocaleString('en-IN')}</Text>
          </View>
        </View>

        {/* Overview */}
        {picnic.overview && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <Text style={styles.valueText}>{picnic.overview}</Text>
          </View>
        )}

        {/* Property Rate */}
        {picnic.property_rate && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Property Rate</Text>
            <Text style={styles.valueText}>{picnic.property_rate}</Text>
          </View>
        )}

        {/* Inclusive & Exclusive */}
        {(picnic.inclusive || picnic.exclusive) && (
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
                    {picnic.inclusive ? picnic.inclusive.split('\n').join('\n') : 'No inclusive items'}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {picnic.exclusive ? picnic.exclusive.split('\n').join('\n') : 'No exclusive items'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Places Nearby */}
        {picnic.places_nearby && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Places Near By</Text>
            <Text style={styles.valueText}>{picnic.places_nearby}</Text>
          </View>
        )}

        {/* Booking Policy */}
        {picnic.booking_policy && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Booking Policy</Text>
            <Text style={styles.valueText}>{picnic.booking_policy}</Text>
          </View>
        )}

        {/* Cancellation Policy */}
        {picnic.cancellation_policy && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cancellation Policy</Text>
            <Text style={styles.valueText}>{picnic.cancellation_policy}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default OnedayPicnicpdf;