// Bungalowpdf.tsx
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
  subSectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
    marginTop: 10,
    backgroundColor: '#E53C42',
    color: 'white',
    padding: 4,
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
  imageContainer: {
    marginBottom: 10,
  },
  mainImage: {
    width: '100%',
    height: 200,
    objectFit: 'cover',
    marginBottom: 10,
  },
  thumbnailContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    marginTop: 5,
    justifyContent: 'center',
  },
  thumbnailImage: {
    width: 60,
    height: 60,
    objectFit: 'cover',
    borderRadius: 4,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  cellLabel: {
    width: '35%',
    fontSize: 11,
    fontWeight: 'bold',
    color: '#2E4D98',
  },
  cellValue: {
    width: '65%',
    fontSize: 11,
  },
  table: {
    display: 'flex',
    width: 'auto',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#000',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#2E4D98',
  },
  tableCol: {
    borderRightWidth: 1,
    borderRightColor: '#000',
    padding: 5,
  },
  tableHeaderText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10,
  },
  tableCell: {
    fontSize: 9,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  bullet: {
    fontSize: 10,
    marginRight: 5,
  },
  listText: {
    fontSize: 10,
    flex: 1,
  },
  note: {
    fontSize: 8,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 4,
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 8,
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  imageGallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 15,
    gap: 6,
  },
  imageCaption: {
    fontSize: 7,
    textAlign: 'center',
    marginTop: 3,
    color: '#666',
  },
  highlight: {
    backgroundColor: '#FFEBEE',
    padding: 8,
    borderRadius: 4,
    marginBottom: 10,
  },
  infoBox: {
    backgroundColor: '#f8f9fa',
    padding: 8,
    borderRadius: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#2E4D98',
    marginBottom: 12,
  },
  twoColumnTable: {
    display: 'flex',
    width: 'auto',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#000',
  },
  twoColumnRow: {
    flexDirection: 'row',
  },
  twoColumnHeader: {
    width: '50%',
    backgroundColor: '#2E4D98',
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: '#000',
  },
  twoColumnHeaderText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10,
    textAlign: 'center',
  },
  twoColumnCell: {
    width: '50%',
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: '#000',
    fontSize: 9,
  },
  twoColumnCellLast: {
    width: '50%',
    padding: 5,
    fontSize: 9,
  },
  simpleTable: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    overflow: 'hidden',
  },
  simpleTableHeader: {
    backgroundColor: '#E53C42',
    padding: 10,
  },
  simpleTableHeaderText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
  simpleTableContent: {
    backgroundColor: '#FFEBEE',
    padding: 10,
    minHeight: 60,
  },
  simpleTableText: {
    fontSize: 10,
    lineHeight: 1.5,
    textAlign: 'justify',
  },
  // Q&A Styles
  qaSection: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
  },
  questionBox: {
    backgroundColor: '#2E3A8A',
    padding: 8,
  },
  questionText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: 'white',
  },
  answerBox: {
    backgroundColor: '#E8F0FF',
    padding: 8,
  },
  answerText: {
    fontSize: 10,
    color: '#000',
    lineHeight: 1.4,
  },
  // Amenities Text Style
  amenitiesText: {
    fontSize: 11,
    marginBottom: 5,
    lineHeight: 1.5,
    textAlign: 'justify',
  },
  // EMI specific styles
  emiRow: {
    flexDirection: 'row',
    marginBottom: 5,
    backgroundColor: '#FFF8E1',
    padding: 4,
    borderRadius: 4,
  },
  emiLabel: {
    width: '35%',
    fontSize: 11,
    fontWeight: 'bold',
    color: '#E65100',
  },
  emiValue: {
    width: '65%',
    fontSize: 11,
    fontWeight: 'bold',
    color: '#E65100',
  },
});

interface BungalowpdfProps {
  bungalow: any;
  images: any[];
  currentImageIndex: number;
}

const Bungalowpdf: React.FC<BungalowpdfProps> = ({ bungalow, images, currentImageIndex }) => {
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '';
    return imagePath.startsWith('http') ? imagePath : `${BASE_URL}${imagePath}`;
  };

  // Get all images (main image + gallery images)
  const allImages: string[] = [];

  // Add main image first if exists
  if (bungalow.main_image) {
    allImages.push(getImageUrl(bungalow.main_image));
  }

  // Add all gallery images
  if (images && images.length > 0) {
    images.forEach(img => {
      const imgUrl = getImageUrl(img.image_url);
      if (!allImages.includes(imgUrl)) {
        allImages.push(imgUrl);
      }
    });
  }

  // If no images at all, add placeholder
  if (allImages.length === 0) {
    allImages.push('https://via.placeholder.com/800x400?text=No+Image');
  }

  // Format price function
  const formatPrice = (price: string | number | undefined) => {
    if (!price || price === 'N/A' || price === 'NA' || price === '0' || price === '0.00') return 'NA';
    if (typeof price === 'string' && price.includes('₹')) return price;

    let numPrice;
    if (typeof price === 'string') {
      const cleaned = price.replace(/[^0-9.]/g, '');
      numPrice = parseFloat(cleaned);
    } else {
      numPrice = price;
    }

    if (isNaN(numPrice) || numPrice === 0) return 'NA';
    return `₹${numPrice.toLocaleString('en-IN')}`;
  };

  // Split content into lines for better display
  const splitIntoLines = (text: string) => {
    if (!text) return [];
    return text.split('\n').filter(line => line.trim());
  };

  // Get rate description based on type
  const getRateDescription = (rateType: string) => {
    switch (rateType) {
      case 'weekday':
        return bungalow.week_day_rate_desc || "No weekday rate information available";
      case 'weekend':
        return bungalow.weekend_rate_desc || "No weekend rate information available";
      case 'holidays':
        return bungalow.long_holidays_desc || "No long holidays rate information available";
      case 'festival':
        return bungalow.festival_holidays_desc || "No festival rate information available";
      default:
        return "No rate information available";
    }
  };

  // Get places_nearby_qa array
  const placesNearbyQA = bungalow?.places_nearby_qa || [];

  // Rate data array for mapping
  const rateData = [
    { key: 'weekday', label: 'Weekday Rate', value: getRateDescription('weekday') },
    { key: 'weekend', label: 'Weekend Rate', value: getRateDescription('weekend') },
    { key: 'holidays', label: 'Long Holidays', value: getRateDescription('holidays') },
    { key: 'festival', label: 'Festival Rates', value: getRateDescription('festival') },
  ];

  return (
    <Document>
      {/* Page 1: Cover Page */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>
          {bungalow.name} ({bungalow.bungalow_code})
        </Text>

        {/* Images Section - Main Image + Thumbnails */}
        <View style={styles.imageContainer}>
          {/* Main Image */}
          {allImages[0] && (
            <Image src={allImages[0]} style={styles.mainImage} />
          )}

          {/* Thumbnail Images - Show all remaining images in small size */}
          {allImages.length > 1 && (
            <View style={styles.thumbnailContainer}>
              {allImages.slice(1, 7).map((imgUrl, idx) => (
                <Image key={idx} src={imgUrl} style={styles.thumbnailImage} />
              ))}
            </View>
          )}
        </View>

        {/* Bungalow Details with City, Duration, and EMI */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bungalow Details</Text>
          <View style={styles.row}>
            <Text style={styles.cellLabel}>Bungalow Code:</Text>
            <Text style={styles.cellValue}>{bungalow.bungalow_code}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cellLabel}>Name:</Text>
            <Text style={styles.cellValue}>{bungalow.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cellLabel}>City Name:</Text>
            <Text style={styles.cellValue}>{bungalow.city_name || 'Not specified'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cellLabel}>Duration:</Text>
            <Text style={styles.cellValue}>{bungalow.duration || 'Not specified'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cellLabel}>Price:</Text>
            <Text style={styles.cellValue}>{formatPrice(bungalow.price)}</Text>
          </View>

          {/* EMI Price */}
          {bungalow.emi_price && (
            <View style={styles.emiRow}>
              <Text style={styles.emiLabel}>EMI Price:</Text>
              <Text style={styles.emiValue}>{formatPrice(bungalow.emi_price)}</Text>
            </View>
          )}
        </View>

        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
      </Page>

      {/* Page 2: Overview */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.infoBox}>
            <Text style={styles.value}>{bungalow.overview || "No overview available"}</Text>
          </View>
        </View>

        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
      </Page>

      {/* Page 3: Bungalow Rent - 4 Separate Simple Tables */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bungalow Rent</Text>

          {/* 4 Separate Simple Tables */}
          {rateData.map((rate) => (
            <View key={rate.key} style={styles.simpleTable}>
              <View style={styles.simpleTableHeader}>
                <Text style={styles.simpleTableHeaderText}>{rate.label}</Text>
              </View>
              <View style={styles.simpleTableContent}>
                <Text style={styles.simpleTableText}>{rate.value}</Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
      </Page>

      {/* Page 4: Includes & Excludes */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Includes & Excludes</Text>

          <View style={styles.twoColumnTable}>
            <View style={styles.twoColumnRow}>
              <View style={styles.twoColumnHeader}>
                <Text style={styles.twoColumnHeaderText}>Includes</Text>
              </View>
              <View style={styles.twoColumnHeader}>
                <Text style={styles.twoColumnHeaderText}>Excludes</Text>
              </View>
            </View>
            <View style={styles.twoColumnRow}>
              <View style={[styles.twoColumnCell, { borderBottomWidth: 0 }]}>
                {bungalow.inclusive ? (
                  splitIntoLines(bungalow.inclusive).map((item: string, idx: number) => (
                    <Text key={idx} style={[styles.tableCell, { marginBottom: 3 }]}>{`• ${item}`}</Text>
                  ))
                ) : (
                  <Text style={styles.tableCell}>No inclusive items listed</Text>
                )}
              </View>
              <View style={[styles.twoColumnCellLast, { borderBottomWidth: 0 }]}>
                {bungalow.exclusive ? (
                  splitIntoLines(bungalow.exclusive).map((item: string, idx: number) => (
                    <Text key={idx} style={[styles.tableCell, { marginBottom: 3 }]}>{`• ${item}`}</Text>
                  ))
                ) : (
                  <Text style={styles.tableCell}>No exclusive items listed</Text>
                )}
              </View>
            </View>
          </View>
        </View>

        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
      </Page>

      {/* Page 5: Places Near By with Q&A */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Places Near By</Text>

          {/* Regular places nearby text */}
          {bungalow.places_nearby && (
            <View style={styles.infoBox}>
              <Text style={styles.value}>{bungalow.places_nearby}</Text>
            </View>
          )}

          {/* Q&A Section for Places Near By */}
          {placesNearbyQA.length > 0 && (
            <View>
              <Text style={styles.subSectionTitle}>Frequently Asked Questions</Text>
              {placesNearbyQA.map((item: any, index: number) => (
                <View key={item.id || index} style={styles.qaSection}>
                  <View style={styles.questionBox}>
                    <Text style={styles.questionText}>Q: {item.question}</Text>
                  </View>
                  <View style={styles.answerBox}>
                    <Text style={styles.answerText}>A: {item.answer}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {!bungalow.places_nearby && placesNearbyQA.length === 0 && (
            <View style={styles.infoBox}>
              <Text style={styles.value}>No nearby places information available</Text>
            </View>
          )}
        </View>

        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
      </Page>

      {/* Page 6: Amenities */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Amenities</Text>
          <View style={styles.infoBox}>
            {bungalow.amenities ? (
              <Text style={styles.amenitiesText}>{bungalow.amenities}</Text>
            ) : (
              <Text style={styles.value}>No amenities listed</Text>
            )}
          </View>
        </View>

        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
      </Page>

      {/* Page 7: Booking Policy */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Booking Policy</Text>
          <View style={styles.infoBox}>
            <Text style={styles.value}>{bungalow.booking_policy || "No booking policy available"}</Text>
          </View>
        </View>

        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
      </Page>

      {/* Page 8: Cancellation Policy */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cancellation Policy</Text>
          <View style={styles.infoBox}>
            <Text style={styles.value}>{bungalow.cancellation_policy || "No cancellation policy available"}</Text>
          </View>
        </View>

        <View style={[styles.section, { marginTop: 30 }]}>
          <Text style={styles.note}>This document contains all bungalow details for reference.</Text>
          <Text style={styles.note}>For booking or inquiries, please contact our customer service.</Text>
          <Text style={[styles.note, { marginTop: 10 }]}>
            {`Generated on: ${new Date().toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}`}
          </Text>
        </View>

        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
      </Page>
    </Document>
  );
};

export default Bungalowpdf;