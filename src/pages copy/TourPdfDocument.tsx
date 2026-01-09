// TourPdfDocument.tsx
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
  description?: string;
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
    tableData?: Array<any>;
    remarks?: string[];
  };
  optionalTours?: Array<any>;
  airlines?: {
    tableData?: Array<any>;
    remarks?: string[];
  };
  hotels?: {
    tableData?: Array<any>;
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
    descriptions?: string[];
  };
}

interface StarRating {
  twin?: string;
  triple?: string;
  childWithBed?: string;
  childWithoutBed?: string;
  infant?: string;
  single?: string;
}

interface DepartureData {
  id?: any;
  month?: string;
  fromDay?: string;
  fromDate?: string;
  toDay?: string;
  toDate?: string;
  status?: string;
  price?: number;
  threeStar?: StarRating;
  fourStar?: StarRating;
  fiveStar?: StarRating;
}

interface TourPdfDocumentProps {
  tour: TourData;
  tourType: string;
  isGroupTour: boolean;
  selectedCostMonth: string;
  selectedCostDate: string;
  selectedDeparture: DepartureData | null;
  currentImageIndex: number;
  tourImages?: string[];
}

// Register fonts with all variants
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
    padding: 40,
    fontFamily: 'Roboto',
  },
  section: {
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#2E4D98',
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#E53C42',
    borderBottom: '2px solid #2E4D98',
    paddingBottom: 5,
  },
  title: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#2E4D98',
  },
  text: {
    fontSize: 12,
    marginBottom: 6,
    lineHeight: 1.5,
  },
  boldText: {
    fontSize: 12,
    marginBottom: 6,
    fontWeight: 'bold',
    color: '#333',
  },
  table: {
    display: 'flex' as 'flex',
    width: 'auto',
    marginBottom: 15,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  tableRow: {
    flexDirection: 'row' as 'row',
  },
  tableColHeader: {
    width: '25%',
    padding: 10,
    backgroundColor: '#2E4D98',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 11,
    textAlign: 'center' as 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#fff',
  },
  tableCol: {
    width: '25%',
    padding: 10,
    fontSize: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itineraryDay: {
    marginBottom: 12,
    border: '1px solid #ddd',
    borderRadius: 4,
    overflow: 'hidden',
  },
  dayHeader: {
    backgroundColor: '#A72703',
    color: 'white',
    padding: 8,
    fontWeight: 'bold',
    fontSize: 13,
  },
  dayContent: {
    backgroundColor: '#FFE797',
    padding: 10,
    fontSize: 11,
    minHeight: 60,
  },
  mealIndicator: {
    flexDirection: 'row' as 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    borderTopStyle: 'solid',
  },
  mealItem: {
    flexDirection: 'row' as 'row',
    alignItems: 'center',
    gap: 4,
  },
  costTable: {
    width: '100%',
    marginBottom: 15,
  },
  costHeader: {
    backgroundColor: '#2E4D98',
    color: 'white',
    padding: 8,
    fontWeight: 'bold',
    fontSize: 11,
  },
  costRow: {
    flexDirection: 'row' as 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderBottomStyle: 'solid',
  },
  costCell: {
    width: '16.66%',
    padding: 8,
    fontSize: 9,
    textAlign: 'center' as 'center',
    borderRightWidth: 1,
    borderRightColor: '#ddd',
    borderRightStyle: 'solid',
  },
  costCellHeader: {
    backgroundColor: '#E53C42',
    color: 'white',
    fontWeight: 'bold',
  },
  note: {
    fontSize: 10,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 5,
    marginBottom: 5,
  },
  pageNumber: {
    position: 'absolute' as 'absolute',
    fontSize: 10,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center' as 'center',
    color: 'grey',
  },
  flexRow: {
    flexDirection: 'row' as 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoBox: {
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#2E4D98',
    borderLeftStyle: 'solid',
    marginBottom: 15,
  },
  listItem: {
    flexDirection: 'row' as 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  bullet: {
    fontSize: 12,
    marginRight: 5,
    marginTop: 2,
  },
  listText: {
    fontSize: 11,
    flex: 1,
  },
  highlight: {
    backgroundColor: '#FFEBEE',
    padding: 10,
    borderRadius: 4,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E53C42',
    borderStyle: 'solid',
  },
  imageContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  tourImage: {
    width: 300,
    height: 200,
    objectFit: 'cover' as 'cover',
    borderRadius: 8,
  },
  // FIXED: Checkbox styles
  checkboxWrapper: {
    flexDirection: 'row' as 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    width: 14,
    height: 14,
    borderWidth: 1.5,
    borderColor: '#000',
    marginRight: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  checkedBox: {
    backgroundColor: '#1e40af',
    width: 8,
    height: 8,
  },
  unCheckedBox: {
    backgroundColor: '#dc2626',
    width: 8,
    height: 8,
  },
  mealText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000',
  },
  departureInfo: {
    backgroundColor: '#f0f9ff',
    padding: 15,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#bae6fd',
    marginBottom: 15,
  },
  departureRow: {
    flexDirection: 'row' as 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  departureLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#2E4D98',
    width: '30%',
  },
  departureValue: {
    fontSize: 11,
    color: '#333',
    width: '65%',
    textAlign: 'right' as 'right',
  },
  // NEW: Image gallery styles
  imageGallery: {
    flexDirection: 'row' as 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
    gap: 10,
  },
  thumbnailImage: {
    width: 80,
    height: 60,
    borderRadius: 4,
    margin: 2,
  },
  imageCaption: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 5,
    color: '#666',
  },
});

// Main PDF Document Component
const TourPdfDocument: React.FC<TourPdfDocumentProps> = ({ 
  tour, 
  tourType, 
  isGroupTour, 
  selectedCostMonth, 
  selectedCostDate, 
  selectedDeparture,
  currentImageIndex,
  tourImages = []
}) => {
  // Parse meals from itinerary - FIXED to match web behavior
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
    if (!price || price === 'N/A') return 'N/A';
    if (typeof price === 'string' && price.includes('₹')) return price;
    const numPrice = typeof price === 'string' ? parseFloat(price.replace(/[^0-9.]/g, '')) : price;
    if (isNaN(numPrice)) return price;
    return `₹${numPrice.toLocaleString('en-IN')}`;
  };

  // Get all images - FIXED: Use all images, not just current index
  const allImages = tourImages && Array.isArray(tourImages) ? tourImages : [];
  const mainImage = allImages.length > 0 ? allImages[currentImageIndex] || allImages[0] : null;

  return (
    <Document>
      {/* Page 1: Cover & Basic Info */}
      <Page size="A4" style={styles.page}>
        <View style={[styles.section, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={styles.header}>{tour?.title || "Tour Package"}</Text>
          
          {/* Display main tour image if available */}
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
          
          {tour?.description && (
            <View style={[styles.infoBox, { marginTop: 20, width: '100%' }]}>
              <Text style={styles.title}>Tour Overview:</Text>
              <Text style={styles.text}>{tour.description}</Text>
            </View>
          )}
          
          {/* Image Gallery - Show all images */}
          {allImages.length > 1 && (
            <View style={styles.section}>
              <Text style={styles.title}>Tour Images ({allImages.length})</Text>
              <View style={styles.imageGallery}>
                {allImages.map((img, index) => (
                  <View key={index} style={{ alignItems: 'center' }}>
                    <Image 
                      src={img} 
                      style={styles.thumbnailImage}
                    />
                    <Text style={styles.imageCaption}>Image {index + 1}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
          
          <View style={{ marginTop: 40 }}>
            <Text style={styles.note}>Generated on: {new Date().toLocaleDateString()}</Text>
            <Text style={styles.note}>Tour Type: {tourType || "Individual"}</Text>
            <Text style={styles.note}>Tour Category: {isGroupTour ? "Group Tour" : "Individual Tour"}</Text>
          </View>
        </View>
        
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} fixed />
      </Page>

      {/* Page 2: Detailed Itinerary with Checkboxes - FIXED */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.subHeader}>Detailed Itinerary</Text>
          
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
                    {/* Breakfast - FIXED CHECKBOX */}
                    <View style={styles.mealItem}>
                      <View style={styles.checkboxWrapper}>
                        <View style={styles.checkboxContainer}>
                          {meals.breakfast ? (
                            <View style={styles.checkedBox} />
                          ) : (
                            <View style={styles.unCheckedBox} />
                          )}
                        </View>
                        <Text style={styles.mealText}>B</Text>
                      </View>
                    </View>
                    
                    {/* Lunch - FIXED CHECKBOX */}
                    <View style={styles.mealItem}>
                      <View style={styles.checkboxWrapper}>
                        <View style={styles.checkboxContainer}>
                          {meals.lunch ? (
                            <View style={styles.checkedBox} />
                          ) : (
                            <View style={styles.unCheckedBox} />
                          )}
                        </View>
                        <Text style={styles.mealText}>L</Text>
                      </View>
                    </View>
                    
                    {/* Dinner - FIXED CHECKBOX */}
                    <View style={styles.mealItem}>
                      <View style={styles.checkboxWrapper}>
                        <View style={styles.checkboxContainer}>
                          {meals.dinner ? (
                            <View style={styles.checkedBox} />
                          ) : (
                            <View style={styles.unCheckedBox} />
                          )}
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

 {/* PAGE 3: DEPARTURE DATES (Separate Page) */}
<Page size="A4" style={styles.page}>
  <View style={styles.section}>
    <Text style={styles.subHeader}>Departure Dates & Details</Text>
    
    {isGroupTour ? (
      <>
        {/* Show Selected Departure Information */}
        {selectedDeparture ? (
          <View style={styles.departureInfo}>
            <Text style={styles.title}>Selected Departure Details:</Text>
            
            <View style={styles.departureRow}>
              <Text style={styles.departureLabel}>Month:</Text>
              <Text style={styles.departureValue}>{selectedCostMonth || selectedDeparture.month || "N/A"}</Text>
            </View>
            
            <View style={styles.departureRow}>
              <Text style={styles.departureLabel}>From Date:</Text>
              <Text style={styles.departureValue}>
                {selectedDeparture.fromDay}, {selectedDeparture.fromDate}
              </Text>
            </View>
            
            <View style={styles.departureRow}>
              <Text style={styles.departureLabel}>To Date:</Text>
              <Text style={styles.departureValue}>
                {selectedDeparture.toDay}, {selectedDeparture.toDate}
              </Text>
            </View>
            
            <View style={styles.departureRow}>
              <Text style={styles.departureLabel}>Status:</Text>
              <Text style={[styles.departureValue, { 
                color: selectedDeparture.status === 'Sold Out' ? '#E53C42' : 
                       selectedDeparture.status === 'Available' ? '#10b981' : '#2E4D98'
              }]}>
                {selectedDeparture.status || "Available"}
              </Text>
            </View>
            
            <View style={styles.departureRow}>
              <Text style={styles.departureLabel}>Base Price:</Text>
              <Text style={[styles.departureValue, { fontWeight: 'bold' }]}>
                {formatPrice(selectedDeparture.price)}
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.highlight}>
            <Text style={styles.text}>No departure date selected</Text>
            <Text style={styles.note}>Please select a departure date from the 'Dep Date' tab to view departure details.</Text>
          </View>
        )}
        
        {/* Tour Cost Table for Selected Departure - MATCHING UI FROM IMAGE */}
        {selectedDeparture && (
          <View style={styles.section}>
            <Text style={styles.title}>Tour Cost for Selected Departure:</Text>
            
            <View style={styles.costTable}>
              {/* Table Header */}
              <View style={[styles.costRow, { backgroundColor: '#0A1D4A' }]}>
                <Text style={[styles.costCell, styles.costCellHeader, { width: '33.33%', borderRightColor: '#fff' }]}>
                  Particulars - Tour Cost
                </Text>
                <Text style={[styles.costCell, styles.costCellHeader, { width: '22.22%', borderRightColor: '#fff' }]}>
                  3 Star
                </Text>
                <Text style={[styles.costCell, styles.costCellHeader, { width: '22.22%', borderRightColor: '#fff' }]}>
                  4 Star
                </Text>
                <Text style={[styles.costCell, styles.costCellHeader, { width: '22.22%' }]}>
                  5 Star
                </Text>
              </View>
              
              {/* Table Rows */}
              {[
                { 
                  particular: "Per pax on Twin Basis", 
                  star3: selectedDeparture.threeStar?.twin || "N/A", 
                  star4: selectedDeparture.fourStar?.twin || "N/A", 
                  star5: selectedDeparture.fiveStar?.twin || "N/A" 
                },
                { 
                  particular: "Per pax on Triple Basis", 
                  star3: selectedDeparture.threeStar?.triple || "N/A", 
                  star4: selectedDeparture.fourStar?.triple || "N/A", 
                  star5: selectedDeparture.fiveStar?.triple || "N/A" 
                },
                { 
                  particular: "Child with Bed", 
                  star3: selectedDeparture.threeStar?.childWithBed || "N/A", 
                  star4: selectedDeparture.fourStar?.childWithBed || "N/A", 
                  star5: selectedDeparture.fiveStar?.childWithBed || "N/A" 
                },
                { 
                  particular: "Child without Bed", 
                  star3: selectedDeparture.threeStar?.childWithoutBed || "N/A", 
                  star4: selectedDeparture.fourStar?.childWithoutBed || "N/A", 
                  star5: selectedDeparture.fiveStar?.childWithoutBed || "N/A" 
                },
                { 
                  particular: "Infant", 
                  star3: selectedDeparture.threeStar?.infant || "N/A", 
                  star4: selectedDeparture.fourStar?.infant || "N/A", 
                  star5: selectedDeparture.fiveStar?.infant || "N/A" 
                },
                { 
                  particular: "Per pax Single Occupancy", 
                  star3: selectedDeparture.threeStar?.single || "N/A", 
                  star4: selectedDeparture.fourStar?.single || "N/A", 
                  star5: selectedDeparture.fiveStar?.single || "N/A" 
                },
              ].map((row, i) => (
                <View 
                  key={i} 
                  style={[
                    styles.costRow, 
                    { 
                      backgroundColor: i % 2 === 0 ? '#EEF1F7' : 'white',
                      borderBottomWidth: i === 5 ? 0 : 1,
                      borderBottomColor: '#000',
                      borderBottomStyle: 'solid'
                    }
                  ]}
                >
                  <Text style={[styles.costCell, { 
                    width: '33.33%', 
                    borderRightColor: '#000',
                    borderRightWidth: 2,
                    textAlign: 'left',
                    paddingLeft: 12,
                    fontWeight: 'medium'
                  }]}>
                    {row.particular}
                  </Text>
                  <Text style={[styles.costCell, { 
                    width: '22.22%', 
                    borderRightColor: '#000',
                    borderRightWidth: 2,
                    textAlign: 'center'
                  }]}>
                    {formatPrice(row.star3)}
                  </Text>
                  <Text style={[styles.costCell, { 
                    width: '22.22%', 
                    borderRightColor: '#000',
                    borderRightWidth: 2,
                    textAlign: 'center',
                    color: '#10b981',
                    fontWeight: 'bold'
                  }]}>
                    {formatPrice(row.star4)}
                  </Text>
                  <Text style={[styles.costCell, { 
                    width: '22.22%', 
                    textAlign: 'center'
                  }]}>
                    {formatPrice(row.star5)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}
        
        {/* Show all departure dates available - WITH MATCHING TABLE STYLING */}
        {tour?.departures?.data && tour.departures.data.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.title}>All Available Departure Dates:</Text>
            
            <View style={styles.costTable}>
              {/* Table Header */}
              <View style={[styles.costRow, { backgroundColor: '#0A1D4A' }]}>
                <Text style={[styles.costCell, styles.costCellHeader, { width: '20%', borderRightColor: '#fff' }]}>
                  Month
                </Text>
                <Text style={[styles.costCell, styles.costCellHeader, { width: '20%', borderRightColor: '#fff' }]}>
                  From Date
                </Text>
                <Text style={[styles.costCell, styles.costCellHeader, { width: '20%', borderRightColor: '#fff' }]}>
                  To Date
                </Text>
                <Text style={[styles.costCell, styles.costCellHeader, { width: '20%', borderRightColor: '#fff' }]}>
                  Base Price
                </Text>
                <Text style={[styles.costCell, styles.costCellHeader, { width: '20%' }]}>
                  Status
                </Text>
              </View>
              
              {/* Table Rows */}
              {tour.departures.data.map((dep: any, index: number) => (
                <View 
                  key={index} 
                  style={[
                    styles.costRow, 
                    { 
                      backgroundColor: index % 2 === 0 ? '#EEF1F7' : 'white',
                      borderBottomWidth: index === tour.departures.data.length - 1 ? 0 : 1,
                      borderBottomColor: '#000',
                      borderBottomStyle: 'solid'
                    }
                  ]}
                >
                  <Text style={[styles.costCell, { 
                    width: '20%', 
                    borderRightColor: '#000',
                    borderRightWidth: 2,
                    textAlign: 'center'
                  }]}>
                    {dep.month}
                  </Text>
                  <Text style={[styles.costCell, { 
                    width: '20%', 
                    borderRightColor: '#000',
                    borderRightWidth: 2,
                    textAlign: 'center'
                  }]}>
                    {dep.fromDate}
                  </Text>
                  <Text style={[styles.costCell, { 
                    width: '20%', 
                    borderRightColor: '#000',
                    borderRightWidth: 2,
                    textAlign: 'center'
                  }]}>
                    {dep.toDate}
                  </Text>
                  <Text style={[styles.costCell, { 
                    width: '20%', 
                    borderRightColor: '#000',
                    borderRightWidth: 2,
                    textAlign: 'center',
                    fontWeight: 'bold'
                  }]}>
                    {formatPrice(dep.price)}
                  </Text>
                  <Text style={[styles.costCell, { 
                    width: '20%', 
                    textAlign: 'center',
                    color: dep.status === 'Sold Out' ? '#E53C42' : 
                           dep.status === 'Available' ? '#10b981' : '#2E4D98',
                    fontWeight: dep.status === 'Sold Out' ? 'bold' : 'normal'
                  }]}>
                    {dep.status}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </>
    ) : (
      // Individual Tour Departure Descriptions
      <View>
        <Text style={styles.title}>Departure Information:</Text>
        {tour?.departures?.descriptions && tour.departures.descriptions.length > 0 ? (
          tour.departures.descriptions.map((description: string, index: number) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>{description}</Text>
            </View>
          ))
        ) : (
          <View style={styles.highlight}>
            <Text style={styles.text}>Flexible departure dates available</Text>
            <Text style={styles.note}>Contact us for customized departure dates and availability.</Text>
          </View>
        )}
      </View>
    )}
  </View>
  
  <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
    `${pageNumber} / ${totalPages}`
  )} fixed />
</Page>

      {/* Rest of the pages remain the same... */}
      {/* (Pages 4-10 remain exactly as you had them) */}
      {/* PAGE 4: TOUR COST (Separate Page) */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.subHeader}>Tour Cost Details</Text>
          
          {isGroupTour ? (
            // Group Tour Cost Table
            <View>
              {selectedDeparture ? (
                <>
                  <View style={styles.infoBox}>
                    <Text style={styles.boldText}>Selected Departure:</Text>
                    <Text style={styles.text}>Month: {selectedCostMonth || selectedDeparture.month || "N/A"}</Text>
                    <Text style={styles.text}>Dates: {selectedCostDate || `${selectedDeparture.fromDate} - ${selectedDeparture.toDate}`}</Text>
                  </View>
                  
                  <Text style={styles.title}>Cost Breakdown by Hotel Category:</Text>
                  <View style={styles.table}>
                    <View style={styles.tableRow}>
                      <Text style={styles.tableColHeader}>Particulars</Text>
                      <Text style={styles.tableColHeader}>3 Star</Text>
                      <Text style={styles.tableColHeader}>4 Star</Text>
                      <Text style={styles.tableColHeader}>5 Star</Text>
                    </View>
                    
                    {[
                      { particular: "Per pax on Twin Basis", 
                        star3: selectedDeparture.threeStar?.twin || "N/A", 
                        star4: selectedDeparture.fourStar?.twin || "N/A", 
                        star5: selectedDeparture.fiveStar?.twin || "N/A" },
                      { particular: "Per pax on Triple Basis", 
                        star3: selectedDeparture.threeStar?.triple || "N/A", 
                        star4: selectedDeparture.fourStar?.triple || "N/A", 
                        star5: selectedDeparture.fiveStar?.triple || "N/A" },
                      { particular: "Child with Bed", 
                        star3: selectedDeparture.threeStar?.childWithBed || "N/A", 
                        star4: selectedDeparture.fourStar?.childWithBed || "N/A", 
                        star5: selectedDeparture.fiveStar?.childWithBed || "N/A" },
                      { particular: "Child without Bed", 
                        star3: selectedDeparture.threeStar?.childWithoutBed || "N/A", 
                        star4: selectedDeparture.fourStar?.childWithoutBed || "N/A", 
                        star5: selectedDeparture.fiveStar?.childWithoutBed || "N/A" },
                      { particular: "Infant", 
                        star3: selectedDeparture.threeStar?.infant || "N/A", 
                        star4: selectedDeparture.fourStar?.infant || "N/A", 
                        star5: selectedDeparture.fiveStar?.infant || "N/A" },
                      { particular: "Single Occupancy", 
                        star3: selectedDeparture.threeStar?.single || "N/A", 
                        star4: selectedDeparture.fourStar?.single || "N/A", 
                        star5: selectedDeparture.fiveStar?.single || "N/A" },
                    ].map((row, i) => (
                      <View key={i} style={[styles.tableRow, { backgroundColor: i % 2 === 0 ? '#f8f9fa' : 'white' }]}>
                        <Text style={styles.tableCol}>{row.particular}</Text>
                        <Text style={styles.tableCol}>{formatPrice(row.star3)}</Text>
                        <Text style={[styles.tableCol, { color: '#10b981', fontWeight: 'bold' }]}>{formatPrice(row.star4)}</Text>
                        <Text style={styles.tableCol}>{formatPrice(row.star5)}</Text>
                      </View>
                    ))}
                  </View>
                </>
              ) : (
                <View style={styles.highlight}>
                  <Text style={styles.text}>Please select a departure date from the 'Dep Date' tab to view costs.</Text>
                </View>
              )}
            </View>
          ) : (
            // Individual Tour Cost Table
            <View>
              <Text style={styles.title}>Tour Cost Per Passenger:</Text>
              <View style={styles.costTable}>
                <View style={styles.costRow}>
                  <Text style={[styles.costCell, styles.costCellHeader]}>Passenger</Text>
                  <Text style={[styles.costCell, styles.costCellHeader]}>Standard</Text>
                  <Text style={[styles.costCell, styles.costCellHeader]}>Deluxe</Text>
                  <Text style={[styles.costCell, styles.costCellHeader]}>Executive</Text>
                  <Text style={[styles.costCell, styles.costCellHeader]}>Child With Bed</Text>
                  <Text style={[styles.costCell, styles.costCellHeader]}>Child No Bed</Text>
                </View>
                
                {tour?.tourCost?.tableData && tour.tourCost.tableData.length > 0 ? (
                  tour.tourCost.tableData.map((row, index) => (
                    <View key={index} style={[styles.costRow, { backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white' }]}>
                      <Text style={styles.costCell}>{row.passenger}</Text>
                      <Text style={styles.costCell}>{formatPrice(row.standard)}</Text>
                      <Text style={[styles.costCell, { color: '#10b981', fontWeight: 'bold' }]}>{formatPrice(row.deluxe)}</Text>
                      <Text style={styles.costCell}>{formatPrice(row.executive)}</Text>
                      <Text style={styles.costCell}>{formatPrice(row.childWithBed)}</Text>
                      <Text style={styles.costCell}>{formatPrice(row.childNoBed)}</Text>
                    </View>
                  ))
                ) : (
                  <View style={styles.costRow}>
                    <Text style={[styles.costCell, { width: '100%', textAlign: 'center' }]}>
                      No cost information available
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )}
          
          {/* Tour Cost Remarks */}
          {tour?.tourCost?.remarks && tour.tourCost.remarks.length > 0 && (
            <View style={styles.section}>
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

      {/* Page 5: Inclusions & Exclusions */}
      <Page size="A4" style={styles.page}>
        {/* Inclusions Section */}
        <View style={styles.section}>
          <Text style={styles.subHeader}>Cost Includes</Text>
          {tour?.inclusionExclusion?.inclusions?.map((inclusion, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={[styles.bullet, { color: '#2E4D98' }]}>✓</Text>
              <Text style={styles.listText}>{inclusion.item || inclusion}</Text>
            </View>
          ))}
        </View>
        
        {/* Exclusions Section */}
        <View style={styles.section}>
          <Text style={styles.subHeader}>Cost Excludes</Text>
          {tour?.inclusionExclusion?.exclusions?.map((exclusion, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={[styles.bullet, { color: '#E53C42' }]}>✗</Text>
              <Text style={styles.listText}>{exclusion.item || exclusion}</Text>
            </View>
          ))}
        </View>
        
        {/* Optional Tours Section */}
        {tour?.optionalTours && tour.optionalTours.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.subHeader}>Optional Tours</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                 <Text style={[styles.tableColHeader, { width: '60%' }]}>Tour Name</Text>
        <Text style={[styles.tableColHeader, { width: '20%' }]}>Adult Price</Text>
        <Text style={[styles.tableColHeader, { width: '20%' }]}>Child Price</Text>
              </View>
              {tour.optionalTours.map((optTour, index) => (
                <View key={index} style={[styles.tableRow, { backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white' }]}>
                     <Text style={[styles.tableCol, { width: '60%' }]}>{optTour.tourName}</Text>
          <Text style={[styles.tableCol, { width: '20%' }]}>{formatPrice(optTour.adultPrice)}</Text>
          <Text style={[styles.tableCol, { width: '20%' }]}>{formatPrice(optTour.childPrice)}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
        
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} fixed />
      </Page>

      {/* Page 6: Transport & Hotels */}
      <Page size="A4" style={styles.page}>
        {/* Transport Section */}
        <View style={styles.section}>
          <Text style={styles.subHeader}>Transport Details</Text>
          
          {tour?.airlines?.tableData && tour.airlines.tableData.length > 0 ? (
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCol, styles.costCellHeader, { width: '20%' }]}>Airline</Text>
                <Text style={[styles.tableCol, styles.costCellHeader, { width: '15%' }]}>Flight No</Text>
                <Text style={[styles.tableCol, styles.costCellHeader, { width: '15%' }]}>From</Text>
                <Text style={[styles.tableCol, styles.costCellHeader, { width: '15%' }]}>To</Text>
                <Text style={[styles.tableCol, styles.costCellHeader, { width: '20%' }]}>Date & Time</Text>
                <Text style={[styles.tableCol, styles.costCellHeader, { width: '15%' }]}>Via</Text>
              </View>
              
              {tour.airlines.tableData.map((flight, index) => (
                <View key={index} style={[styles.tableRow, { backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white' }]}>
                  <Text style={[styles.tableCol, { width: '20%' }]}>{flight.airline || '-'}</Text>
                  <Text style={[styles.tableCol, { width: '15%' }]}>{flight.flightNo || '-'}</Text>
                  <Text style={[styles.tableCol, { width: '15%' }]}>{flight.from || '-'}</Text>
                  <Text style={[styles.tableCol, { width: '15%' }]}>{flight.to || '-'}</Text>
                  <Text style={[styles.tableCol, { width: '20%' }]}>
                    {flight.depDate} {flight.depTime ? `at ${flight.depTime}` : ''}
                  </Text>
                  <Text style={[styles.tableCol, { width: '15%' }]}>{flight.via || '-'}</Text>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.highlight}>
              <Text style={styles.text}>No transport information available</Text>
            </View>
          )}
          
          {/* Transport Remarks */}
          {tour?.airlines?.remarks && tour.airlines.remarks.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.title}>Transport Remarks:</Text>
              {tour.airlines.remarks.map((remark, index) => (
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

      {/* Page 7: Hotels Details */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.subHeader}>Hotel Details</Text>
          
          {tour?.hotels?.tableData && tour.hotels.tableData.length > 0 ? (
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCol, styles.costCellHeader, { width: '15%' }]}>City</Text>
                <Text style={[styles.tableCol, styles.costCellHeader, { width: '20%' }]}>Hotel Name</Text>
                <Text style={[styles.tableCol, styles.costCellHeader, { width: '13%' }]}>Standard</Text>
                <Text style={[styles.tableCol, styles.costCellHeader, { width: '13%' }]}>Deluxe</Text>
                <Text style={[styles.tableCol, styles.costCellHeader, { width: '13%' }]}>Executive</Text>
                <Text style={[styles.tableCol, styles.costCellHeader, { width: '15%' }]}>Room Type</Text>
                <Text style={[styles.tableCol, styles.costCellHeader, { width: '13%' }]}>Nights</Text>
              </View>
              
              {tour.hotels.tableData.map((hotel, index) => (
                <View key={index} style={[styles.tableRow, { backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white' }]}>
                  <Text style={[styles.tableCol, { width: '15%' }]}>{hotel.city}</Text>
                  <Text style={[styles.tableCol, { width: '20%' }]}>{hotel.hotelName}</Text>
                  <Text style={[styles.tableCol, { width: '13%' }]}>{formatPrice(hotel.standard)}</Text>
                  <Text style={[styles.tableCol, { width: '13%' }]}>{formatPrice(hotel.deluxe)}</Text>
                  <Text style={[styles.tableCol, { width: '13%' }]}>{formatPrice(hotel.executive)}</Text>
                  <Text style={[styles.tableCol, { width: '15%' }]}>{hotel.roomType}</Text>
                  <Text style={[styles.tableCol, { width: '13%' }]}>{hotel.nights}</Text>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.highlight}>
              <Text style={styles.text}>No hotel information available</Text>
            </View>
          )}
          
          {/* Hotel Remarks */}
          {tour?.hotels?.remarks && tour.hotels.remarks.length > 0 && (
            <View style={styles.section}>
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

      {/* Page 8: Booking & Cancellation Policies */}
      <Page size="A4" style={styles.page}>
        {/* Booking Policy */}
        <View style={styles.section}>
          <Text style={styles.subHeader}>Booking Policy</Text>
          
          {tour?.booking?.items?.map((item, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={[styles.bullet, { color: '#2E4D98' }]}>{index + 1}.</Text>
              <Text style={styles.listText}>{item}</Text>
            </View>
          ))}
          
          {/* Amount Details */}
          {tour?.booking?.amountDetails && tour.booking.amountDetails.length > 0 && (
            <View style={[styles.section, { marginTop: 15 }]}>
              <Text style={styles.title}>Amount Details:</Text>
              {tour.booking.amountDetails.map((amount, index) => (
                <View key={index} style={styles.flexRow}>
                  <Text style={styles.text}>Item {index + 1}:</Text>
                  <Text style={styles.boldText}>
                    {amount === "Aadhaar Card" || amount === "aadhaar card" 
                      ? "Aadhaar Card" 
                      : amount === "Pan Card" || amount === "pan card"
                      ? "Pan Card"
                      : `₹${parseInt(amount.replace(/[^0-9]/g, '') || '0').toLocaleString('en-IN')}`}
                  </Text>
                </View>
              ))}
            </View>
          )}
          
          {/* Booking Remarks */}
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

      {/* Page 9: Cancellation Policy & EMI Options */}
      <Page size="A4" style={styles.page}>
        {/* Cancellation Policy */}
        <View style={styles.section}>
          <Text style={styles.subHeader}>Cancellation Policy</Text>
          
          {tour?.cancellation?.policies?.map((policy, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={[styles.bullet, { color: '#E53C42' }]}>{index + 1}.</Text>
              <Text style={styles.listText}>{policy}</Text>
            </View>
          ))}
          
          {/* Cancellation Charges */}
          {tour?.cancellation?.charges && tour.cancellation.charges.length > 0 && (
            <View style={[styles.section, { marginTop: 15 }]}>
              <Text style={styles.title}>Cancellation Charges:</Text>
              {tour.cancellation.charges.map((charge, index) => (
                <View key={index} style={styles.flexRow}>
                  <Text style={styles.text}>Charge {index + 1}:</Text>
                  <Text style={[styles.boldText, { color: '#E53C42' }]}>{charge}</Text>
                </View>
              ))}
            </View>
          )}
          
          {/* Cancellation Remarks */}
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
        
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} fixed />
      </Page>

      {/* Page 10: Instructions & EMI Options */}
      <Page size="A4" style={styles.page}>
        {/* Instructions */}
        <View style={styles.section}>
          <Text style={styles.subHeader}>Instructions</Text>
          
          {tour?.instructions?.map((instruction, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={[styles.bullet, { color: '#2E4D98' }]}>{index + 1}.</Text>
              <Text style={styles.listText}>{instruction.item || instruction}</Text>
            </View>
          ))}
        </View>
        
        {/* EMI Options */}
        {tour?.emiOptions?.options && tour.emiOptions.options.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.subHeader}>EMI Options</Text>
            
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={styles.tableColHeader}>Particulars</Text>
                <Text style={styles.tableColHeader}>Loan Amount</Text>
                <Text style={styles.tableColHeader}>Months</Text>
                <Text style={styles.tableColHeader}>EMI</Text>
              </View>
              
              {tour.emiOptions.options.map((emi, index) => (
                <View key={index} style={[styles.tableRow, { backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white' }]}>
                  <Text style={styles.tableCol}>{emi.particulars}</Text>
                  <Text style={styles.tableCol}>{formatPrice(emi.loanAmount)}</Text>
                  <Text style={styles.tableCol}>{emi.months}</Text>
                  <Text style={styles.tableCol}>{formatPrice(emi.emi)}</Text>
                </View>
              ))}
            </View>
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
        
        {/* Footer */}
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

export default TourPdfDocument;