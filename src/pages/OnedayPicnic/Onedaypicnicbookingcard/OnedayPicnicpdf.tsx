// OnedayPicnicpdf.tsx
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

  // Get all images (main image + gallery images)
  const allImages: string[] = [];
  
  // Add main image first if exists
  if (picnic.main_image) {
    allImages.push(getImageUrl(picnic.main_image));
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
  const placesNearbyQA = picnic?.places_nearby_qa || [];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Title */}
        <Text style={styles.title}>
          {picnic.name} ({picnic.picnic_code})
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
            <Text style={styles.cellLabel}>City Name:</Text>
            <Text style={styles.cellValue}>{picnic.city_name || 'Not specified'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cellLabel}>Duration:</Text>
            <Text style={styles.cellValue}>{picnic.duration || 'Not specified'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cellLabel}>Price:</Text>
            <Text style={styles.cellValue}>₹{parseFloat(picnic.price).toLocaleString('en-IN')}</Text>
          </View>
          
          {/* EMI Price */}
          {picnic.emi_price && (
            <View style={styles.row}>
              <Text style={styles.cellLabel}>EMI Price:</Text>
              <Text style={styles.cellValue}>₹{parseFloat(picnic.emi_price).toLocaleString('en-IN')}</Text>
            </View>
          )}
        </View>

        {/* Overview - Free flow text */}
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

        {/* Places Near By with Q&A - Free flow text then Q&A */}
        {(picnic.places_nearby || placesNearbyQA.length > 0) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Places Near By</Text>
            
            {/* Regular places nearby text - Free flow */}
            {picnic.places_nearby && (
              <Text style={styles.valueText}>{picnic.places_nearby}</Text>
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
        {picnic.amenities && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Amenities</Text>
            <Text style={styles.amenitiesText}>{picnic.amenities}</Text>
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