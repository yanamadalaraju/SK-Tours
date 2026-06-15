// Micedomesticpdf.tsx - FIXED VERSION

import React from 'react';
import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet,
  Font,
  Image
} from '@react-pdf/renderer';

// Define proper types
interface TourData {
  title?: string;
  code?: string;
  duration?: string;
  price?: string;
  emi?: string;
  overview?: string;  // Changed from description to overview
  cityName?: string;
  stateName?: string;
  itinerary?: Array<{
    day?: string;
    title?: string;
    description?: string;
    meals?: string;
  }>;
  inclusionExclusion?: {
    inclusions?: Array<any>;
    exclusions?: Array<any>;
  };
  tourCost?: {
    tableData?: Array<{
      passenger?: string;
      standard?: string;
      deluxe?: string;
      executive?: string;
    }>;
    remarks?: string[];
  };
  optionalTours?: Array<any>;
  optionalTourRemarks?: string[];
  airlines?: {
    tableData?: Array<any>;
    remarks?: string[];
  };
  hotels?: {
    tableData?: Array<{
      city?: string;
      nights?: string;
      standard?: string;
      deluxe?: string;
      executive?: string;
    }>;
    remarks?: string[];
  };
  booking?: {
    items?: string[];
    amountDetails?: string[];
  };
  bookingRemarks?: string[];
  cancellation?: {
    policies?: string[];
    charges?: string[];
  };
  cancellationRemarks?: string[];
  instructions?: Array<any>;
  emiOptions?: {
    loanAmount?: string;
    options?: Array<any>;
  };
  emiRemarks?: string[];
  additionalRemarks?: string[];
  departures?: {
    type?: string;
    data?: Array<any>;
    descriptions?: string[];  // This holds the free flow departure descriptions
  };
}

interface TourPdfDocumentProps {
  tour: TourData;
  tourType: string;
  isGroupTour: boolean;
  selectedCostMonth: string;
  selectedCostDate: string;
  selectedDeparture: any | null;
  currentImageIndex: number;
  tourImages?: string[];
}

// Register fonts
Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf',
      fontWeight: 'normal',
      fontStyle: 'normal',
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf',
      fontWeight: 'bold',
      fontStyle: 'normal',
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-italic-webfont.ttf',
      fontWeight: 'normal',
      fontStyle: 'italic',
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bolditalic-webfont.ttf',
      fontWeight: 'bold',
      fontStyle: 'italic',
    },
  ],
});

// PDF Styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Roboto',
  },
  section: {
    marginBottom: 15,
  },
  header: {
    fontSize: 22,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#2E4D98',
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#E53C42',
    borderBottom: '2px solid #2E4D98',
    paddingBottom: 4,
  },
  title: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: 'bold',
    color: '#2E4D98',
  },
  text: {
    fontSize: 10,
    marginBottom: 5,
    lineHeight: 1.4,
  },
  boldText: {
    fontSize: 10,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#333',
  },
  
  // Table Styles
  tableContainer: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#2E4D98',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    borderBottomStyle: 'solid',
  },
  tableHeaderCell: {
    padding: 6,
    fontSize: 9,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#fff',
    borderRightStyle: 'solid',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
  },
  tableCell: {
    padding: 6,
    fontSize: 8,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#000',
    borderRightStyle: 'solid',
  },
  
  itineraryDay: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    overflow: 'hidden',
  },
  dayHeader: {
    backgroundColor: '#A72703',
    color: 'white',
    padding: 6,
    fontWeight: 'bold',
    fontSize: 11,
  },
  dayContent: {
    backgroundColor: '#FFE797',
    padding: 8,
    fontSize: 9,
    minHeight: 50,
  },
  mealIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    borderTopStyle: 'solid',
  },
  mealItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  note: {
    fontSize: 8,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 4,
    marginBottom: 4,
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
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoBox: {
    backgroundColor: '#f8f9fa',
    padding: 8,
    borderRadius: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#2E4D98',
    borderLeftStyle: 'solid',
    marginBottom: 12,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  bullet: {
    fontSize: 10,
    marginRight: 5,
    marginTop: 2,
  },
  listText: {
    fontSize: 9,
    flex: 1,
  },
  highlight: {
    backgroundColor: '#FFEBEE',
    padding: 8,
    borderRadius: 4,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E53C42',
    borderStyle: 'solid',
  },
  imageContainer: {
    marginVertical: 15,
    alignItems: 'center',
  },
  tourImage: {
    width: 250,
    height: 150,
    objectFit: 'cover',
    borderRadius: 6,
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    width: 12,
    height: 12,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  checkedBox: {
    backgroundColor: '#1e40af',
    width: 6,
    height: 6,
  },
  unCheckedBox: {
    backgroundColor: '#dc2626',
    width: 6,
    height: 6,
  },
  mealText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#000',
  },
  imageGallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 15,
    gap: 6,
  },
  thumbnailImage: {
    width: 60,
    height: 45,
    borderRadius: 3,
  },
  imageCaption: {
    fontSize: 7,
    textAlign: 'center',
    marginTop: 3,
    color: '#666',
  },
  departureInfoBox: {
    backgroundColor: '#f0f9ff',
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#bae6fd',
    marginBottom: 12,
  },
  departureText: {
    fontSize: 10,
    marginBottom: 4,
    lineHeight: 1.5,
  },
});

// Main PDF Document Component - FIXED
const Micedomesticpdf: React.FC<TourPdfDocumentProps> = ({ 
  tour, 
  tourType, 
  isGroupTour, 
  selectedCostMonth, 
  selectedCostDate, 
  selectedDeparture,
  currentImageIndex,
  tourImages = []
}) => {
  // Parse meals from itinerary
  const parseMeals = (mealsString?: string) => {
    if (!mealsString) return { breakfast: false, lunch: false, dinner: false };
    
    const meals = mealsString.toLowerCase();
    return {
      breakfast: meals.includes('breakfast') || meals.includes('b'),
      lunch: meals.includes('lunch') || meals.includes('l'),
      dinner: meals.includes('dinner') || meals.includes('d')
    };
  };

  // Format price helper
  const formatPrice = (price: string | number | undefined) => {
    if (!price || price === 'N/A' || price === 'NA') return 'N/A';
    if (typeof price === 'string' && price.includes('₹')) return price;
    const numPrice = typeof price === 'string' ? parseFloat(price.replace(/[^0-9.]/g, '')) : price;
    if (isNaN(numPrice)) return String(price);
    return `₹${numPrice.toLocaleString('en-IN')}`;
  };

  // Get all images
  const allImages = tourImages && Array.isArray(tourImages) ? tourImages : [];
  const mainImage = allImages.length > 0 ? allImages[currentImageIndex] || allImages[0] : null;

  // Function to render individual tour cost table (for domestic/individual tours)
  const renderIndividualTourCostTable = () => {
    if (!tour?.tourCost?.tableData || tour.tourCost.tableData.length === 0) {
      return (
        <View style={styles.highlight}>
          <Text style={styles.text}>No cost information available</Text>
        </View>
      );
    }

    return (
      <View style={styles.tableContainer}>
        {/* Header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderCell, { width: '25%' }]}>Passenger</Text>
          <Text style={[styles.tableHeaderCell, { width: '25%' }]}>Standard Hotel</Text>
          <Text style={[styles.tableHeaderCell, { width: '25%' }]}>Deluxe Hotel</Text>
          <Text style={[styles.tableHeaderCell, { width: '25%' }]}>Executive Hotel</Text>
        </View>

        {/* Rows */}
        {tour.tourCost.tableData.map((row, index) => (
          <View 
            key={index} 
            style={[
              styles.tableRow,
              { backgroundColor: index % 2 === 0 ? '#FFEBEE' : '#FFEBEE80' }
            ]}
          >
            <Text style={[styles.tableCell, { width: '25%', fontWeight: 'medium' }]}>
              {row.passenger}
            </Text>
            <Text style={[styles.tableCell, { width: '25%' }]}>
              {formatPrice(row.standard)}
            </Text>
            <Text style={[styles.tableCell, { width: '25%', color: '#10b981', fontWeight: 'bold' }]}>
              {formatPrice(row.deluxe)}
            </Text>
            <Text style={[styles.tableCell, { width: '25%' }]}>
              {formatPrice(row.executive)}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  // Function to render hotels table
  const renderHotelsTable = () => {
    if (!tour?.hotels?.tableData || tour.hotels.tableData.length === 0) {
      return (
        <View style={styles.highlight}>
          <Text style={styles.text}>No hotel information available</Text>
        </View>
      );
    }

    return (
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderCell, { width: '25%' }]}>City</Text>
          <Text style={[styles.tableHeaderCell, { width: '15%' }]}>Nights</Text>
          <Text style={[styles.tableHeaderCell, { width: '20%' }]}>Standard</Text>
          <Text style={[styles.tableHeaderCell, { width: '20%' }]}>Deluxe</Text>
          <Text style={[styles.tableHeaderCell, { width: '20%' }]}>Executive</Text>
        </View>

        {tour.hotels.tableData.map((hotel, index) => (
          <View 
            key={index} 
            style={[
              styles.tableRow,
              { backgroundColor: index % 2 === 0 ? '#FFEBEE' : '#FFEBEE80' }
            ]}
          >
            <Text style={[styles.tableCell, { width: '25%' }]}>{hotel.city}</Text>
            <Text style={[styles.tableCell, { width: '15%' }]}>{hotel.nights}</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>{hotel.standard}</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>{hotel.deluxe}</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>{hotel.executive}</Text>
          </View>
        ))}
      </View>
    );
  };

  // Function to render flight details for individual tours
  const renderFlightDetails = () => {
    if (!tour?.airlines?.tableData || tour.airlines.tableData.length === 0) {
      return (
        <View style={styles.highlight}>
          <Text style={styles.text}>No flight information available</Text>
        </View>
      );
    }

    return (
      <View>
        {tour.airlines.tableData.map((flight, index) => (
          <View key={index} style={styles.departureInfoBox}>
            {flight.description && (
              <Text style={styles.departureText}>{flight.description}</Text>
            )}
            {!flight.description && flight.airline && (
              <Text style={styles.departureText}>
                {flight.airline} {flight.flightNo ? `(${flight.flightNo})` : ''} - 
                From: {flight.from || 'N/A'} To: {flight.to || 'N/A'} -
                {flight.depDate ? ` Date: ${flight.depDate}` : ''} {flight.depTime ? ` Time: ${flight.depTime}` : ''}
              </Text>
            )}
          </View>
        ))}
      </View>
    );
  };

  // Function to render optional tours table
  const renderOptionalToursTable = () => {
    if (!tour?.optionalTours || tour.optionalTours.length === 0) {
      return null;
    }

    return (
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderCell, { width: '70%' }]}>Tour Name</Text>
          <Text style={[styles.tableHeaderCell, { width: '15%' }]}>Adult Price</Text>
          <Text style={[styles.tableHeaderCell, { width: '15%' }]}>Child Price</Text>
        </View>

        {tour.optionalTours.map((optTour, index) => (
          <View 
            key={index} 
            style={[
              styles.tableRow,
              { backgroundColor: index % 2 === 0 ? '#FFEBEE' : '#FFEBEE80' }
            ]}
          >
            <Text style={[styles.tableCell, { width: '70%', textAlign: 'left', paddingLeft: 8 }]}>
              {optTour.tourName}
            </Text>
            <Text style={[styles.tableCell, { width: '15%' }]}>
              {formatPrice(optTour.adultPrice)}
            </Text>
            <Text style={[styles.tableCell, { width: '15%' }]}>
              {formatPrice(optTour.childPrice)}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  // Function to render EMI options table
  const renderEMITable = () => {
    if (!tour?.emiOptions?.options || tour.emiOptions.options.length === 0) {
      return null;
    }

    return (
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderCell, { width: '40%' }]}>Particulars</Text>
          <Text style={[styles.tableHeaderCell, { width: '20%' }]}>Loan Amount</Text>
          <Text style={[styles.tableHeaderCell, { width: '20%' }]}>Months</Text>
          <Text style={[styles.tableHeaderCell, { width: '20%' }]}>EMI</Text>
        </View>

        {tour.emiOptions.options.map((emi, index) => (
          <View 
            key={index} 
            style={[
              styles.tableRow,
              { backgroundColor: index % 2 === 0 ? '#FFEBEE' : '#FFEBEE80' }
            ]}
          >
            <Text style={[styles.tableCell, { width: '40%', textAlign: 'left', paddingLeft: 8, fontWeight: 'bold' }]}>
              {emi.particulars}
            </Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>
              {formatPrice(emi.loanAmount)}
            </Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>{emi.months}</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>
              {formatPrice(emi.emi)}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <Document>
      {/* Page 1: Cover & Basic Info */}
      <Page size="A4" style={styles.page}>
        <View style={[styles.section, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={styles.header}>{tour?.title || "MICE Tour Package"}</Text>
          
          {mainImage && (
            <View style={styles.imageContainer}>
              <Image 
                src={mainImage} 
                style={styles.tourImage}
              />
              <Text style={styles.imageCaption}>Main Tour Image</Text>
            </View>
          )}
          
          <Text style={[styles.title, { marginTop: 20 }]}>Tour Code: {tour?.code || "N/A"}</Text>
          <Text style={styles.text}>Duration: {tour?.duration || "N/A"}</Text>
          <Text style={styles.boldText}>Price: {tour?.price || "N/A"}</Text>
          <Text style={styles.text}>EMI: {tour?.emi || "EMI available"}</Text>
          <Text style={styles.text}>Tour Type: {tourType}</Text>
          
          {tour?.cityName && (
            <Text style={styles.text}>Destination: {tour.cityName}{tour.stateName ? `, ${tour.stateName}` : ''}</Text>
          )}
          
       
          
          {allImages.length > 1 && (
            <View style={styles.section}>
              <Text style={styles.title}>Tour Images ({allImages.length})</Text>
              <View style={styles.imageGallery}>
                {allImages.slice(0, 6).map((img, index) => (
                  <View key={index} style={{ alignItems: 'center' }}>
                    <Image src={img} style={styles.thumbnailImage} />
                    <Text style={styles.imageCaption}>Image {index + 1}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
          
          <View style={{ marginTop: 40 }}>
            <Text style={styles.note}>Generated on: {new Date().toLocaleDateString()}</Text>
          </View>
        </View>
        
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} fixed />
      </Page>

      {/* Page 2: Detailed Itinerary */}
      <Page size="A4" style={styles.page}>
      
        <View style={styles.section}>
   
          <Text style={styles.subHeader}> Itinerary</Text>
                        {tour?.overview && (
            <View style={[styles.infoBox, { marginTop: 20, width: '100%' }]}>
              <Text style={styles.title}>Mice Overview:</Text>
              <Text style={styles.text}>{tour.overview}</Text>
            </View>
          )}
          {tour?.itinerary?.map((day, index) => {
            const meals = parseMeals(day?.meals);
            
            return (
              <View key={index} style={styles.itineraryDay}>
                <View style={styles.dayHeader}>
                  <Text>{day.day || `Day ${index + 1}`} - {day.title || "Day Details"}</Text>
                </View>
                <View style={styles.dayContent}>
                  <Text style={styles.text}>{day.description || ""}</Text>
                  <View style={styles.mealIndicator}>
                    <View style={styles.mealItem}>
                      <View style={styles.checkboxWrapper}>
                        <View style={styles.checkboxContainer}>
                          {meals.breakfast ? <View style={styles.checkedBox} /> : <View style={styles.unCheckedBox} />}
                        </View>
                        <Text style={styles.mealText}>B</Text>
                      </View>
                    </View>
                    <View style={styles.mealItem}>
                      <View style={styles.checkboxWrapper}>
                        <View style={styles.checkboxContainer}>
                          {meals.lunch ? <View style={styles.checkedBox} /> : <View style={styles.unCheckedBox} />}
                        </View>
                        <Text style={styles.mealText}>L</Text>
                      </View>
                    </View>
                    <View style={styles.mealItem}>
                      <View style={styles.checkboxWrapper}>
                        <View style={styles.checkboxContainer}>
                          {meals.dinner ? <View style={styles.checkedBox} /> : <View style={styles.unCheckedBox} />}
                        </View>
                        <Text style={styles.mealText}>D</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
        
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} fixed />
      </Page>

      {/* Page 3: Departure Dates & Tour Cost - FIXED SECTION */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.subHeader}>Departure Information</Text>
          
          {/* Free Flow Departure Descriptions - This is what was missing */}
          {tour?.departures?.descriptions && tour.departures.descriptions.length > 0 ? (
            <View style={styles.departureInfoBox}>
              <Text style={[styles.title, { marginBottom: 8 }]}>Departure Details:</Text>
              {tour.departures.descriptions.map((description: string, index: number) => (
                <Text key={index} style={styles.departureText}>
                  • {description}
                </Text>
              ))}
            </View>
          ) : (
            <View style={styles.highlight}>
              <Text style={styles.text}>Flexible departure dates available. Please contact us for more information.</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.subHeader}>Tour Cost</Text>
          
          {/* Individual Tour Cost Table */}
          {renderIndividualTourCostTable()}
          
          {/* Tour Cost Remarks */}
          {tour?.tourCost?.remarks && tour.tourCost.remarks.length > 0 && (
            <View style={{ marginTop: 10 }}>
              <Text style={styles.title}>Tour Cost Remarks:</Text>
              {tour.tourCost.remarks.map((remark, index) => (
                <View key={index} style={styles.listItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.listText}>{remark}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
        
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} fixed />
      </Page>

      {/* Page 4: Inclusions, Exclusions & Optional Tours */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.subHeader}>Cost Includes</Text>
          {tour?.inclusionExclusion?.inclusions && tour.inclusionExclusion.inclusions.length > 0 ? (
            tour.inclusionExclusion.inclusions.map((inclusion, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={[styles.bullet, { color: '#2E4D98' }]}>✓</Text>
                <Text style={styles.listText}>{inclusion.item || inclusion}</Text>
              </View>
            ))
          ) : (
            <View style={styles.highlight}>
              <Text style={styles.text}>No cost inclusions listed</Text>
            </View>
          )}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.subHeader}>Cost Excludes</Text>
          {tour?.inclusionExclusion?.exclusions && tour.inclusionExclusion.exclusions.length > 0 ? (
            tour.inclusionExclusion.exclusions.map((exclusion, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={[styles.bullet, { color: '#E53C42' }]}>✗</Text>
                <Text style={styles.listText}>{exclusion.item || exclusion}</Text>
              </View>
            ))
          ) : (
            <View style={styles.highlight}>
              <Text style={styles.text}>No cost exclusions listed</Text>
            </View>
          )}
        </View>
        
        {/* Optional Tours */}
        {tour?.optionalTours && tour.optionalTours.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.subHeader}>Optional Tours</Text>
            {renderOptionalToursTable()}
          </View>
        )}
        
        {/* Optional Tour Remarks */}
        {tour?.optionalTourRemarks && tour.optionalTourRemarks.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.title}>Optional Tour Remarks:</Text>
            {tour.optionalTourRemarks.map((remark, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listText}>{remark}</Text>
              </View>
            ))}
          </View>
        )}
        
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} fixed />
      </Page>

      {/* Page 5: Flight & Hotels */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.subHeader}>Flight Details</Text>
          {renderFlightDetails()}
          
          {/* Flight Remarks */}
          {tour?.airlines?.remarks && tour.airlines.remarks.length > 0 && (
            <View style={{ marginTop: 10 }}>
              <Text style={styles.title}>Flight Remarks:</Text>
              {tour.airlines.remarks.map((remark, index) => (
                <View key={index} style={styles.listItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.listText}>{remark}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.subHeader}>Hotel Details</Text>
          {renderHotelsTable()}
          
          {/* Hotel Remarks */}
          {tour?.hotels?.remarks && tour.hotels.remarks.length > 0 && (
            <View style={{ marginTop: 10 }}>
              <Text style={styles.title}>Hotel Remarks:</Text>
              {tour.hotels.remarks.map((remark, index) => (
                <View key={index} style={styles.listItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.listText}>{remark}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
        
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} fixed />
      </Page>

 {/* Page 6: Booking & Cancellation Policies */}
<Page size="A4" style={styles.page}>
  <View style={styles.section}>
    <Text style={styles.subHeader}>Booking Policy</Text>
    
    {tour?.booking?.items && tour.booking.items.length > 0 ? (
      tour.booking.items.map((item, index) => (
        <View key={index} style={styles.listItem}>
          <Text style={[styles.bullet, { color: '#2E4D98' }]}>{index + 1}.</Text>
          <Text style={styles.listText}>{item}</Text>
        </View>
      ))
    ) : (
      <View style={styles.highlight}>
        <Text style={styles.text}>Standard booking terms and conditions apply</Text>
      </View>
    )}
    
    {tour?.booking?.amountDetails && tour.booking.amountDetails.length > 0 && (
      <View style={[styles.section, { marginTop: 10 }]}>
        <Text style={styles.title}>Amount Details:</Text>
        {tour.booking.amountDetails.map((amount, index) => (
          <View key={index} style={styles.flexRow}>
            <Text style={styles.text}>Item {index + 1}:</Text>
            <Text style={[
              styles.boldText, 
              { 
                color: amount.includes('%') ? '#E53C42' : 
                       amount.toLowerCase().includes('balance') ? '#2E4D98' : 
                       amount.startsWith('₹') ? '#10b981' : '#333'
              }
            ]}>
              {amount}
            </Text>
          </View>
        ))}
      </View>
    )}
    
    {tour?.bookingRemarks && tour.bookingRemarks.length > 0 && (
      <View style={styles.section}>
        <Text style={styles.title}>Booking Remarks:</Text>
        {tour.bookingRemarks.map((remark, index) => (
          <View key={index} style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listText}>{remark}</Text>
          </View>
        ))}
      </View>
    )}
  </View>
  
  <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
    `${pageNumber} / ${totalPages}`
  )} fixed />
</Page>

      {/* Page 7: Cancellation Policy & Instructions */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.subHeader}>Cancellation Policy</Text>
          
          {tour?.cancellation?.policies && tour.cancellation.policies.length > 0 ? (
            tour.cancellation.policies.map((policy, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={[styles.bullet, { color: '#E53C42' }]}>{index + 1}.</Text>
                <Text style={styles.listText}>{policy}</Text>
              </View>
            ))
          ) : (
            <View style={styles.highlight}>
              <Text style={styles.text}>Please contact us for cancellation policy details</Text>
            </View>
          )}
          
          {tour?.cancellation?.charges && tour.cancellation.charges.length > 0 && (
            <View style={[styles.section, { marginTop: 10 }]}>
              <Text style={styles.title}>Cancellation Charges:</Text>
              {tour.cancellation.charges.map((charge, index) => (
                <View key={index} style={styles.flexRow}>
                  <Text style={styles.text}>Charge {index + 1}:</Text>
                  <Text style={[styles.boldText, { color: '#E53C42' }]}>{charge}</Text>
                </View>
              ))}
            </View>
          )}
          
          {tour?.cancellationRemarks && tour.cancellationRemarks.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.title}>Cancellation Remarks:</Text>
              {tour.cancellationRemarks.map((remark, index) => (
                <View key={index} style={styles.listItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.listText}>{remark}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.subHeader}>Instructions</Text>
          {tour?.instructions && tour.instructions.length > 0 ? (
            tour.instructions.map((instruction, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={[styles.bullet, { color: '#2E4D98' }]}>{index + 1}.</Text>
                <Text style={styles.listText}>{instruction.item || instruction}</Text>
              </View>
            ))
          ) : (
            <View style={styles.highlight}>
              <Text style={styles.text}>No special instructions available</Text>
            </View>
          )}
        </View>
        
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} fixed />
      </Page>

      {/* Page 8: EMI Options & Additional Remarks */}
      <Page size="A4" style={styles.page}>
        {/* EMI Options */}
        {tour?.emiOptions?.options && tour.emiOptions.options.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.subHeader}>EMI Options</Text>
            {renderEMITable()}
          </View>
        )}
        
        {/* EMI Remarks */}
        {tour?.emiRemarks && tour.emiRemarks.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.title}>EMI Remarks:</Text>
            {tour.emiRemarks.map((remark, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listText}>{remark}</Text>
              </View>
            ))}
          </View>
        )}
        
        {/* Additional Remarks */}
        {tour?.additionalRemarks && tour.additionalRemarks.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.title}>Additional Remarks:</Text>
            {tour.additionalRemarks.map((remark, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listText}>{remark}</Text>
              </View>
            ))}
          </View>
        )}
        
        <View style={[styles.section, { marginTop: 30 }]}>
          <Text style={styles.note}>This document contains all tour details for reference.</Text>
          <Text style={styles.note}>For booking or inquiries, please contact our customer service.</Text>
          <Text style={[styles.note, { marginTop: 10 }]}>
            Generated on: {new Date().toLocaleDateString('en-IN', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Text>
        </View>
        
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} fixed />
      </Page>
    </Document>
  );
};

export default Micedomesticpdf;