// WeekendGatewaypdf.tsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { BASE_URL } from '@/ApiUrls';

// Register NotoSans font
Font.register({
  family: 'NotoSans',
  src: 'https://fonts.gstatic.com/s/notosans/v36/o-0IIpQlx3QUlC5A4PNb4g.ttf',
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#ffffff',
    fontFamily: 'NotoSans',
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
    display: 'flex',
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
  // Tour Cost Table Styles
  tourTable: {
    width: '100%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#000',
  },
  tourHeader: {
    backgroundColor: '#2E4D98',
    flexDirection: 'row',
  },
  tourHeaderCell: {
    padding: 5,
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
    width: '50%',
    borderRightWidth: 1,
    borderRightColor: '#fff',
  },
  tourRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#000',
  },
  tourCell: {
    padding: 5,
    fontSize: 9,
    width: '50%',
    borderRightWidth: 1,
    borderRightColor: '#000',
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
  // Sub section title for policies
  subSectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 6,
    marginBottom: 4,
    color: '#A72703',
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
    width: '40%',
    fontSize: 11,
    fontWeight: 'bold',
    color: '#E65100',
  },
  emiValue: {
    width: '60%',
    fontSize: 11,
    fontWeight: 'bold',
    color: '#E65100',
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

  // Get all images (main image + gallery images)
  const allImages: string[] = [];
  
  // Add main image first if exists
  if (gateway.main_image) {
    allImages.push(getImageUrl(gateway.main_image));
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

  // Get places_nearby_qa array
  const placesNearbyQA = gateway?.places_nearby_qa || [];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Title */}
        <Text style={styles.title}>
          {gateway.name} ({gateway.gateway_code})
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
              {allImages.slice(1).map((imgUrl, idx) => (
                <Image key={idx} src={imgUrl} style={styles.thumbnailImage} />
              ))}
            </View>
          )}
        </View>

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
            <Text style={styles.cellLabel}>City Name:</Text>
            <Text style={styles.cellValue}>{gateway.city_name || 'Not specified'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cellLabel}>Duration:</Text>
            <Text style={styles.cellValue}>{gateway.duration || 'Not specified'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cellLabel}>Price:</Text>
            <Text style={styles.cellValue}>₹{parseFloat(gateway.price).toLocaleString('en-IN')}</Text>
          </View>
          
          {/* EMI Price */}
          {gateway.emi_price && (
            <View style={styles.row}>
              <Text style={styles.cellLabel}>EMI Price:</Text>
              <Text style={styles.cellValue}>₹{parseFloat(gateway.emi_price).toLocaleString('en-IN')}</Text>
            </View>
          )}
        </View>

        {/* Overview - Free flow text */}
        {gateway.overview && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <Text style={styles.valueText}>{gateway.overview}</Text>
          </View>
        )}

        {/* Tour Cost - Table format */}
        {(gateway.per_pax_twin || gateway.per_pax_triple || gateway.child_with_bed || 
          gateway.child_without_bed || gateway.infant || gateway.per_pax_single) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tour Cost</Text>
            <View style={styles.tourTable}>
              <View style={styles.tourHeader}>
                <Text style={styles.tourHeaderCell}>Particulars - Cost in INR</Text>
                <Text style={styles.tourHeaderCell}>Rate</Text>
              </View>
              {gateway.per_pax_twin && (
                <View style={styles.tourRow}>
                  <Text style={styles.tourCell}>Per pax on Twin Basis</Text>
                  <Text style={styles.tourCell}>₹ {parseInt(gateway.per_pax_twin).toLocaleString()}</Text>
                </View>
              )}
              {gateway.per_pax_triple && (
                <View style={styles.tourRow}>
                  <Text style={styles.tourCell}>Per pax on Triple Basis</Text>
                  <Text style={styles.tourCell}>₹ {parseInt(gateway.per_pax_triple).toLocaleString()}</Text>
                </View>
              )}
              {gateway.child_with_bed && (
                <View style={styles.tourRow}>
                  <Text style={styles.tourCell}>Child with Bed</Text>
                  <Text style={styles.tourCell}>₹ {parseInt(gateway.child_with_bed).toLocaleString()}</Text>
                </View>
              )}
              {gateway.child_without_bed && (
                <View style={styles.tourRow}>
                  <Text style={styles.tourCell}>Child without Bed</Text>
                  <Text style={styles.tourCell}>₹ {parseInt(gateway.child_without_bed).toLocaleString()}</Text>
                </View>
              )}
              {gateway.infant && (
                <View style={styles.tourRow}>
                  <Text style={styles.tourCell}>Infant</Text>
                  <Text style={styles.tourCell}>₹ {parseInt(gateway.infant).toLocaleString()}</Text>
                </View>
              )}
              {gateway.per_pax_single && (
                <View style={styles.tourRow}>
                  <Text style={styles.tourCell}>Per pax Single Occupancy</Text>
                  <Text style={styles.tourCell}>₹ {parseInt(gateway.per_pax_single).toLocaleString()}</Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Includes & Excludes */}
        {(gateway.inclusive || gateway.exclusive) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Includes & Excludes</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={[styles.tableCol, styles.tableHeader]}>
                  <Text style={[styles.tableCell, { color: 'white' }]}>Includes</Text>
                </View>
                <View style={[styles.tableCol, styles.tableHeader]}>
                  <Text style={[styles.tableCell, { color: 'white' }]}>Excludes</Text>
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

        {/* Places Near By with Q&A - Free flow text then Q&A */}
        {(gateway.places_nearby || placesNearbyQA.length > 0) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Places Near By</Text>
            
            {/* Regular places nearby text - Free flow */}
            {gateway.places_nearby && (
              <Text style={styles.valueText}>{gateway.places_nearby}</Text>
            )}

            {/* Q&A Section for Places Near By */}
            {placesNearbyQA.length > 0 && (
              <View>
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
          </View>
        )}

        {/* Amenities - Free flow text like overview (horizontal/justified) */}
        {gateway.amenities && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Amenities</Text>
            <Text style={styles.amenitiesText}>{gateway.amenities}</Text>
          </View>
        )}

        {/* Booking Policy */}
        {gateway.booking_policy && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Booking Policy</Text>
            <Text style={styles.valueText}>{gateway.booking_policy}</Text>
          </View>
        )}

        {/* Cancellation Policy */}
        {gateway.cancellation_policy && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cancellation Policy</Text>
            <Text style={styles.valueText}>{gateway.cancellation_policy}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default WeekendGatewaypdf;