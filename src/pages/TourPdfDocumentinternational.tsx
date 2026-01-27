import React from 'react';
import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet,
  Font,
  Image,
  Link
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
    inclusions?: string[];
    exclusions?: string[];
  };
  tourCost?: {
    tableData?: Array<{
      passenger?: string;
      standard?: string;
      deluxe?: string;
      executive?: string;
      childWithBed?: string;
      childNoBed?: string;
    }>;
    remarks?: string[];
  };
  optionalTours?: Array<{
    tourName?: string;
    adultPrice?: string;
    childPrice?: string;
  }>;
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
  instructions?: string[];
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
  optionalTourRemarks?: string[];
  visaDetails?: {
    tourist?: string[];
    transit?: string[];
    business?: string[];
    photo?: string[];
  };
  visaForms?: Array<{
    visaType?: string;
    downloadText?: string;
    downloadAction?: string;
    fillAction?: string;
    action1FileUrl?: string;
    action2FileUrl?: string;
    remarks?: string;
  }>;
  visaFees?: Array<{
    tourist?: string;
    transit?: string;
    business?: string;
    touristCharges?: string;
    transitCharges?: string;
    businessCharges?: string;
    charges?: string;
  }>;
  visaSubmission?: Array<{
    label?: string;
    tourist?: string;
    transit?: string;
    business?: string;
    rowOrder?: number;
  }>;
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

interface TourPdfDocumentinternationalProps {
  tour: TourData;
  tourType: string;
  isGroupTour: boolean;
  selectedCostMonth: string;
  selectedCostDate: string;
  selectedDeparture: DepartureData | null;
  currentImageIndex: number;
  tourImages?: string[];
}

// Register fonts
Font.register({
  family: 'Helvetica',
  fonts: [
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf',
      fontWeight: 'normal',
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf',
      fontWeight: 'bold',
    },
  ],
});

// Styles matching your website layout
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.4,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2E4D98',
    marginBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#E53C42',
    borderBottomStyle: 'solid',
    paddingBottom: 8,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4D98',
    marginVertical: 10,
    backgroundColor: '#FFE797',
    padding: 8,
    borderRadius: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#A72703',
    borderLeftStyle: 'solid',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#A72703',
    marginVertical: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderBottomStyle: 'solid',
  },
  visaSectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E4D98',
    marginVertical: 8,
    backgroundColor: '#FFE797',
    padding: 6,
    borderLeftWidth: 4,
    borderLeftColor: '#A72703',
  },
  boldText: {
    fontWeight: 'bold',
  },
  text: {
    marginBottom: 4,
  },
  
  // Table Styles
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    marginVertical: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
    minHeight: 24,
  },
  tableHeader: {
    backgroundColor: '#2E4D98',
    color: 'white',
    fontWeight: 'bold',
  },
  tableCell: {
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: '#000',
    borderRightStyle: 'solid',
    fontSize: 9,
  },
  tableCellLast: {
    borderRightWidth: 0,
  },
  
  // Itinerary Styles
  dayCard: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
    borderRadius: 4,
    overflow: 'hidden',
  },
  dayHeader: {
    backgroundColor: '#A72703',
    color: 'white',
    padding: 8,
    fontWeight: 'bold',
    flexDirection: 'row',
  },
  dayBody: {
    backgroundColor: '#FFE797',
    padding: 10,
    minHeight: 80,
  },
  mealIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    borderTopStyle: 'solid',
  },
  mealItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  // Color styles
  redBg: {
    backgroundColor: '#E53C42',
    color: 'white',
    padding: 6,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  blueBg: {
    backgroundColor: '#2E4D98',
    color: 'white',
    padding: 6,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  yellowBg: {
    backgroundColor: '#FFE797',
    padding: 8,
  },
  lightRedBg: {
    backgroundColor: '#FFEBEE',
    padding: 8,
  },
  visaTabBg: {
    backgroundColor: '#FFE797',
    padding: 6,
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
  },
  activeVisaTab: {
    backgroundColor: '#A72703',
    color: 'white',
  },
  
  // Layout styles
  twoColumn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  column: {
    width: '48%',
  },
  
  // Image styles
  mainImage: {
    width: '100%',
    height: 200,
    marginVertical: 15,
    objectFit: 'cover',
  },
  
  // List styles
  listItem: {
    flexDirection: 'row',
    marginBottom: 4,
    alignItems: 'flex-start',
  },
  bullet: {
    marginRight: 8,
    marginTop: 2,
  },
  listText: {
    flex: 1,
  },
  
  // Footer
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 9,
    color: '#666',
  },
  
  // Tab styles
  tabHeader: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: '#FFE797',
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
  },
  tabButton: {
    padding: 8,
    borderRightWidth: 1,
    borderRightColor: '#000',
    borderRightStyle: 'solid',
    fontSize: 10,
    fontWeight: 'bold',
  },
  activeTab: {
    backgroundColor: '#A72703',
    color: 'white',
  },
  
  // Visa section styles
  visaContent: {
    borderWidth: 2,
    borderColor: '#1e3a8a',
    borderStyle: 'solid',
    borderTopWidth: 0,
    padding: 10,
    minHeight: 150,
    backgroundColor: '#FFEBEE',
  },
  
  // Visa tab container
  visaTabContainer: {
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
    borderRadius: 4,
    marginBottom: 10,
  },
  
  // Visa fee table
  visaFeeTable: {
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
    marginVertical: 10,
  },
  
  // Checkbox styles for meals
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
  
  // Visa form button styles
  downloadButton: {
    backgroundColor: '#E53C42',
    color: 'white',
    padding: 4,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  fillButton: {
    backgroundColor: '#A72703',
    color: 'white',
    padding: 4,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

const TourPdfDocumentinternational: React.FC<TourPdfDocumentinternationalProps> = ({ 
  tour, 
  tourType, 
  isGroupTour, 
  selectedCostMonth, 
  selectedCostDate, 
  selectedDeparture,
  currentImageIndex,
  tourImages = []
}) => {
  // Helper functions
  const formatPrice = (price: string | number | undefined) => {
    if (!price || price === 'N/A' || price === 'NA') return 'N/A';
    if (typeof price === 'string' && price.includes('₹')) return price;
    const numPrice = typeof price === 'string' ? parseFloat(price.replace(/[^0-9.]/g, '')) : price;
    if (isNaN(numPrice)) return String(price);
    return `₹${numPrice.toLocaleString('en-IN')}`;
  };

  const parseMeals = (mealsString?: string) => {
    if (!mealsString) return { B: false, L: false, D: false };
    const meals = mealsString.toLowerCase();
    return {
      B: meals.includes('breakfast') || meals.includes('b'),
      L: meals.includes('lunch') || meals.includes('l'),
      D: meals.includes('dinner') || meals.includes('d')
    };
  };

  // Visa Tab Components
  const renderVisaTouristTab = () => (
    <View style={styles.visaContent}>
      <Text style={styles.visaSectionTitle}>Tourist Visa Requirements</Text>
      {tour?.visaDetails?.tourist && tour.visaDetails.tourist.length > 0 ? (
        tour.visaDetails.tourist.map((detail, index) => (
          <View key={index} style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listText}>{detail}</Text>
          </View>
        ))
      ) : (
        <Text style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
          No tourist visa information available
        </Text>
      )}
    </View>
  );

  const renderVisaTransitTab = () => (
    <View style={styles.visaContent}>
      <Text style={styles.visaSectionTitle}>Transit Visa Requirements</Text>
      {tour?.visaDetails?.transit && tour.visaDetails.transit.length > 0 ? (
        tour.visaDetails.transit.map((detail, index) => (
          <View key={index} style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listText}>{detail}</Text>
          </View>
        ))
      ) : (
        <Text style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
          No transit visa information available
        </Text>
      )}
    </View>
  );

  const renderVisaBusinessTab = () => (
    <View style={styles.visaContent}>
      <Text style={styles.visaSectionTitle}>Business Visa Requirements</Text>
      {tour?.visaDetails?.business && tour.visaDetails.business.length > 0 ? (
        tour.visaDetails.business.map((detail, index) => (
          <View key={index} style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listText}>{detail}</Text>
          </View>
        ))
      ) : (
        <Text style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
          No business visa information available
        </Text>
      )}
    </View>
  );

  const renderVisaFormsTab = () => (
    <View style={{ marginTop: 10 }}>
      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={[styles.tableCell, { width: '70%' }]}>Visa Type</Text>
          <Text style={[styles.tableCell, { width: '15%' }]}>Action 1</Text>
          <Text style={[styles.tableCell, { width: '15%' }]}>Action 2</Text>
        </View>
        
        {/* Tourist Visa Form */}
        <View style={[styles.tableRow, { backgroundColor: '#FFEBEE' }]}>
          <Text style={[styles.tableCell, { width: '70%' }]}>Tourist Visa Form Download</Text>
          <Text style={[styles.tableCell, { width: '15%' }]}>
            <View style={styles.downloadButton}>
              <Text>Download</Text>
            </View>
          </Text>
          <Text style={[styles.tableCell, { width: '15%' }]}>
            <View style={styles.fillButton}>
              <Text>Fill Manually</Text>
            </View>
          </Text>
        </View>
        
        {/* Transit Visa Form */}
        <View style={[styles.tableRow, { backgroundColor: '#FFEBEE' }]}>
          <Text style={[styles.tableCell, { width: '70%' }]}>Transit Visa Form Download</Text>
          <Text style={[styles.tableCell, { width: '15%' }]}>
            <View style={styles.downloadButton}>
              <Text>Download</Text>
            </View>
          </Text>
          <Text style={[styles.tableCell, { width: '15%' }]}>
            <View style={styles.fillButton}>
              <Text>Fill</Text>
            </View>
          </Text>
        </View>
        
        {/* Business Visa Form */}
        <View style={[styles.tableRow, { backgroundColor: '#FFEBEE' }]}>
          <Text style={[styles.tableCell, { width: '70%' }]}>Business Visa Form Download</Text>
          <Text style={[styles.tableCell, { width: '15%' }]}>
            <View style={styles.downloadButton}>
              <Text>Download</Text>
            </View>
          </Text>
          <Text style={[styles.tableCell, { width: '15%' }]}>
            <View style={styles.fillButton}>
              <Text>Fill Manually</Text>
            </View>
          </Text>
        </View>
      </View>
    </View>
  );

  const renderVisaPhotoTab = () => (
    <View style={{ marginTop: 10 }}>
      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={[styles.tableCell, styles.tableCellLast]}>Photo Specification</Text>
        </View>
        {tour?.visaDetails?.photo && tour.visaDetails.photo.length > 0 ? (
          tour.visaDetails.photo.map((spec, index) => (
            <View key={index} style={[styles.tableRow, { backgroundColor: index % 2 === 0 ? '#FFEBEE' : '#FFEBEE80' }]}>
              <Text style={[styles.tableCell, styles.tableCellLast]}>{spec}</Text>
            </View>
          ))
        ) : (
          <View style={[styles.tableRow, { backgroundColor: '#FFEBEE' }]}>
            <Text style={[styles.tableCell, styles.tableCellLast, { textAlign: 'center' }]}>
              No photo specifications available
            </Text>
          </View>
        )}
      </View>
    </View>
  );

  const renderVisaFeesTab = () => {
    const feeTypes = ['tourist', 'transit', 'business', 'charges'];
    const feeLabels = ['Tourist Visa fees', 'Transit Visa fees', 'Business Visa fees', 'Visa fees & VFS & Other Charges'];
    
    return (
      <View style={{ marginTop: 10 }}>
        {/* Fee Type Tabs */}
        <View style={{ flexDirection: 'row', marginBottom: 10, backgroundColor: '#FFE797' }}>
          {feeLabels.map((label, idx) => (
            <View key={idx} style={[
              styles.visaTabBg,
              { 
                flex: idx === 3 ? 1.3 : 1,
                backgroundColor: idx === 0 ? '#A72703' : '#FFE797',
                color: idx === 0 ? 'white' : 'black'
              }
            ]}>
              <Text style={{ fontSize: 9, fontWeight: 'bold', textAlign: 'center' }}>{label}</Text>
            </View>
          ))}
        </View>
        
        {/* Fee Table */}
        <View style={styles.visaFeeTable}>
          <View style={[styles.tableRow, { backgroundColor: '#FFEBEE' }]}>
            <Text style={[styles.tableCell, { width: '50%', fontWeight: 'bold' }]}>
              {tour?.visaFees?.[0]?.tourist || 'Free Flow Entry'}
            </Text>
            <Text style={[styles.tableCell, styles.tableCellLast, { width: '50%', textAlign: 'center' }]}>
              {tour?.visaFees?.[0]?.touristCharges || 'N/A'}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderVisaSubmissionTab = () => {
    const visaTypes = ['tourist', 'transit', 'business'];
    const visaLabels = ['Tourist Visa', 'Transit Visa', 'Business Visa'];
    
    return (
      <View style={{ marginTop: 10 }}>
        {/* Visa Type Tabs */}
        <View style={{ flexDirection: 'row', marginBottom: 10, backgroundColor: '#FFE797' }}>
          {visaLabels.map((label, idx) => (
            <View key={idx} style={[
              styles.visaTabBg,
              { 
                flex: 1,
                backgroundColor: idx === 0 ? '#A72703' : '#FFE797',
                color: idx === 0 ? 'white' : 'black'
              }
            ]}>
              <Text style={{ fontSize: 9, fontWeight: 'bold', textAlign: 'center' }}>{label}</Text>
            </View>
          ))}
        </View>
        
        {/* Submission Table */}
        <View style={styles.table}>
          {tour?.visaSubmission && tour.visaSubmission.length > 0 ? (
            tour.visaSubmission.map((sub, index) => (
              <View key={index} style={[styles.tableRow, { backgroundColor: index % 2 === 0 ? '#FFEBEE' : '#FFEBEE80' }]}>
                <Text style={[styles.tableCell, { width: '67%' }]}>{sub.label || 'N/A'}</Text>
                <Text style={[styles.tableCell, styles.tableCellLast, { width: '33%', textAlign: 'center' }]}>
                  {sub.tourist || 'N/A'}
                </Text>
              </View>
            ))
          ) : (
            <View style={[styles.tableRow, { backgroundColor: '#FFEBEE' }]}>
              <Text style={[styles.tableCell, styles.tableCellLast, { textAlign: 'center' }]}>
                No submission information available
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  const renderVisaRemarks = () => {
    const remarks = tour?.visaForms?.[0]?.remarks;
    
    return (
      <View style={{ marginTop: 20 }}>
        <View style={[styles.redBg, { marginBottom: 10 }]}>
          <Text>Visa Remarks</Text>
        </View>
        
        <View style={styles.visaContent}>
          <Text style={{ textAlign: 'justify' }}>
            {remarks || "No remarks available"}
          </Text>
        </View>
      </View>
    );
  };

  // Main render
  return (
    <Document>
      {/* Page 1: Cover Page */}
      <Page size="A4" style={styles.page}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.header}>TOUR PACKAGE DETAILS</Text>
          
          {tourImages.length > 0 && (
            <Image 
              src={tourImages[currentImageIndex] || tourImages[0]} 
              style={styles.mainImage}
            />
          )}
          
          <Text style={styles.subHeader}>{tour?.title || 'International Tour Package'}</Text>
          
          <View style={{ marginTop: 30, alignItems: 'center' }}>
            <View style={[styles.table, { width: '80%' }]}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={[styles.tableCell, { width: '50%' }]}>Tour Code</Text>
                <Text style={[styles.tableCell, styles.tableCellLast, { width: '50%' }]}>Duration</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { width: '50%', textAlign: 'center' }]}>{tour?.code || 'N/A'}</Text>
                <Text style={[styles.tableCell, styles.tableCellLast, { width: '50%', textAlign: 'center', color: '#E53C42', fontWeight: 'bold' }]}>{tour?.duration || 'N/A'}</Text>
              </View>
            </View>
            
            <View style={{ marginTop: 20 }}>
              <Text style={[styles.text, { textAlign: 'center' }]}>
                Price: <Text style={styles.boldText}>{tour?.price || 'N/A'}</Text>
              </Text>
              <Text style={[styles.text, { textAlign: 'center' }]}>
                EMI: <Text style={styles.boldText}>{tour?.emi || 'EMI available'}</Text>
              </Text>
              <Text style={[styles.text, { textAlign: 'center' }]}>
                Tour Type: <Text style={styles.boldText}>{tourType} ({isGroupTour ? 'Group Tour' : 'Individual Tour'})</Text>
              </Text>
            </View>
            
            {tour?.description && (
              <View style={{ marginTop: 30, padding: 15, backgroundColor: '#f5f5f5', borderRadius: 4 }}>
                <Text style={[styles.sectionTitle, { fontSize: 14 }]}>Tour Overview</Text>
                <Text style={styles.text}>{tour.description}</Text>
              </View>
            )}
          </View>
          
          <Text style={styles.footer}>
            Generated on {new Date().toLocaleDateString()} • Page 1
          </Text>
        </View>
      </Page>

      {/* Page 2: Basic Information Table */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Tour Information</Text>
        
        {/* Recreate the excel-like table layout */}
        <View style={[styles.table, { marginBottom: 15 }]}>
          {/* First Row: Headers */}
          <View style={[styles.tableRow, { backgroundColor: '#E8F0FF' }]}>
            <Text style={[styles.tableCell, { width: '25%', backgroundColor: '#2E3a8a', color: 'white' }]}>Tour Code</Text>
            <Text style={[styles.tableCell, { width: '50%', backgroundColor: '#2E3a8a', color: 'white' }]}>Tour Name</Text>
            <Text style={[styles.tableCell, styles.tableCellLast, { width: '25%', backgroundColor: '#2E3a8a', color: 'white' }]}>Days</Text>
          </View>
          
          {/* Second Row: Values */}
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { width: '25%', backgroundColor: '#dbeafe', textAlign: 'center', fontWeight: 'bold', color: '#2E4D98' }]}>
              {tour?.code || 'N/A'}
            </Text>
            <Text style={[styles.tableCell, { width: '50%', backgroundColor: '#f3f4f6', padding: 10 }]}>
              {tour?.title || 'N/A'}
            </Text>
            <Text style={[styles.tableCell, styles.tableCellLast, { width: '25%', backgroundColor: '#fee2e2', textAlign: 'center', fontWeight: 'bold', color: '#E53C42' }]}>
              {tour?.duration || 'N/A'}
            </Text>
          </View>
        </View>

        {/* Tabs Header */}
        <View style={[styles.tabHeader, { marginTop: 20 }]}>
          {["Itinerary", "Dep Date", "Tour Cost", "Cost inc./Cost ex.", "Flights & Hotels", "Visa", "Book p./Canc p.", "Instructions"].map((tab, idx) => (
            <Text key={idx} style={[styles.tabButton, idx === 5 ? styles.activeTab : {}]}>
              {tab}
            </Text>
          ))}
        </View>

        {/* Visa Section Header */}
        <View style={[styles.redBg, { marginTop: 15 }]}>
          <Text>Documents Required for Visa</Text>
        </View>

        {/* Visa Tabs */}
        <View style={[styles.tabHeader, { marginTop: 10 }]}>
          {["Tourist Visa", "Transit Visa", "Business Visa", "Visa Forms", "Photo", "Visa Fees", "Submission & Pick Up"].map((tab, idx) => (
            <Text key={idx} style={[
              styles.tabButton,
              idx === 0 ? styles.activeTab : {},
              idx === 6 ? { flex: 1.3 } : {}
            ]}>
              {tab}
            </Text>
          ))}
        </View>

        {/* Tourist Visa Content */}
        {renderVisaTouristTab()}
        
        <Text style={styles.footer}>
          Page 2 • Visa Information - Tourist Visa
        </Text>
      </Page>

      {/* Page 3: Transit & Business Visa */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Visa Information (Continued)</Text>
        
        <View style={[styles.redBg, { marginBottom: 15 }]}>
          <Text>Documents Required for Visa</Text>
        </View>

        {/* Transit Visa */}
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.visaSectionTitle}>Transit Visa Requirements</Text>
          {renderVisaTransitTab()}
        </View>

        {/* Business Visa */}
        <View>
          <Text style={styles.visaSectionTitle}>Business Visa Requirements</Text>
          {renderVisaBusinessTab()}
        </View>
        
        <Text style={styles.footer}>
          Page 3 • Visa Information - Transit & Business
        </Text>
      </Page>

      {/* Page 4: Visa Forms & Photo Specifications */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Visa Forms & Photo Specifications</Text>
        
        <View style={[styles.redBg, { marginBottom: 15 }]}>
          <Text>Visa Forms</Text>
        </View>

        {/* Visa Forms */}
        {renderVisaFormsTab()}

        {/* Photo Specifications */}
        <View style={{ marginTop: 20 }}>
          <View style={[styles.redBg, { marginBottom: 10 }]}>
            <Text>Photo Specifications</Text>
          </View>
          {renderVisaPhotoTab()}
        </View>
        
        <Text style={styles.footer}>
          Page 4 • Visa Forms & Photo
        </Text>
      </Page>

      {/* Page 5: Visa Fees */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Visa Fees</Text>
        
        <View style={[styles.redBg, { marginBottom: 15 }]}>
          <Text>Visa Fees Information</Text>
        </View>

        {renderVisaFeesTab()}

        {/* Visa Remarks */}
        {renderVisaRemarks()}
        
        <Text style={styles.footer}>
          Page 5 • Visa Fees
        </Text>
      </Page>

      {/* Page 6: Visa Submission & Pick Up */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Visa Submission & Processing</Text>
        
        <View style={[styles.redBg, { marginBottom: 15 }]}>
          <Text>Submission & Pick Up Information</Text>
        </View>

        {renderVisaSubmissionTab()}
        
        <View style={{ marginTop: 30, paddingTop: 20, borderTopWidth: 1, borderTopColor: '#ddd' }}>
          <Text style={{ textAlign: 'center', fontSize: 9, color: '#666' }}>
            End of Visa Information Section
          </Text>
          <Text style={{ textAlign: 'center', fontSize: 8, color: '#999', marginTop: 5 }}>
            Please ensure all documents are prepared as per the requirements above
          </Text>
        </View>
        
        <Text style={styles.footer}>
          Page 6 • Visa Submission & Processing
        </Text>
      </Page>

      {/* Page 7: Itinerary */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Tour Itinerary</Text>
        
        <View style={[styles.redBg, { marginBottom: 10 }]}>
          <Text>Tour Itinerary</Text>
        </View>
        
        <View style={{ borderWidth: 2, borderColor: '#1e3a8a' }}>
          {tour?.itinerary?.map((day, index) => {
            const meals = parseMeals(day?.meals);
            const dayColors = [
              { header: '#A72703', body: '#FFE797' },
              { header: '#A72703', body: '#FFE797' },
              { header: '#A72703', body: '#FFE797' }
            ];
            const colors = dayColors[index % dayColors.length] || dayColors[0];
            
            return (
              <View key={index} style={{ marginBottom: 8, padding: 8 }}>
                {/* Day Header */}
                <View style={{ flexDirection: 'row', gap: 4, marginBottom: 4 }}>
                  <View style={{ 
                    backgroundColor: colors.header, 
                    width: 120, 
                    padding: 8,
                    borderWidth: 1,
                    borderColor: '#000',
                    borderStyle: 'solid'
                  }}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                      {day.day || `Day ${index + 1}`}
                    </Text>
                  </View>
                  
                  <View style={{ 
                    backgroundColor: colors.header, 
                    flex: 1,
                    padding: 8,
                    borderWidth: 1,
                    borderColor: '#000',
                    borderStyle: 'solid'
                  }}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                      {day.title || `Day ${index + 1} Details`}
                    </Text>
                  </View>
                  
                  <View style={{ 
                    backgroundColor: colors.header, 
                    width: 140,
                    padding: 6,
                    borderWidth: 1,
                    borderColor: '#000',
                    borderStyle: 'solid',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center'
                  }}>
                    {['B', 'L', 'D'].map((mealType) => (
                      <View key={mealType} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.checkboxContainer}>
                          <Text style={{ fontSize: 8, color: meals[mealType as keyof typeof meals] ? '#2E4D98' : '#E53C42' }}>
                            {meals[mealType as keyof typeof meals] ? '✓' : '✗'}
                          </Text>
                        </View>
                        <Text style={{ color: 'white', fontSize: 9, fontWeight: 'bold', marginLeft: 2 }}>{mealType}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                
                {/* Day Body */}
                <View style={{ 
                  backgroundColor: colors.body,
                  borderWidth: 1,
                  borderColor: '#000',
                  borderStyle: 'solid',
                  padding: 10,
                  minHeight: 60
                }}>
                  <Text>{day.description || ''}</Text>
                </View>
              </View>
            );
          })}
        </View>
        
        <Text style={styles.footer}>
          Page 7 • Itinerary
        </Text>
      </Page>

      {/* Page 8: Departure Dates */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Departure Dates</Text>
        
        <View style={styles.redBg}>
          <Text>Departure Dates</Text>
        </View>
        
        {isGroupTour ? (
          <View style={{ borderWidth: 2, borderColor: '#1e3a8a', borderTopWidth: 0, padding: 10 }}>
            {/* Departure Cards */}
            {selectedDeparture ? (
              <View style={{ borderWidth: 2, borderColor: '#000', padding: 15, marginBottom: 15 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                  <View>
                    <Text style={{ fontSize: 9, color: '#666' }}>{selectedDeparture.fromDay}</Text>
                    <Text style={{ fontWeight: 'bold' }}>{selectedDeparture.fromDate}</Text>
                  </View>
                  <View>
                    <Text style={{ fontSize: 9, color: '#666' }}>{selectedDeparture.toDay}</Text>
                    <Text style={{ fontWeight: 'bold' }}>{selectedDeparture.toDate}</Text>
                  </View>
                  <View>
                    <Text style={{ 
                      fontWeight: 'bold',
                      color: selectedDeparture.status === 'Sold Out' ? '#E53C42' : 
                             selectedDeparture.status === 'Available' ? '#10b981' : '#2E4D98'
                    }}>
                      {selectedDeparture.status}
                    </Text>
                  </View>
                  <View>
                    <Text style={{ fontWeight: 'bold' }}>{formatPrice(selectedDeparture.price)}</Text>
                  </View>
                </View>
                
                {/* Cost Table */}
                {selectedDeparture.threeStar && (
                  <View style={[styles.table, { marginTop: 10 }]}>
                    <View style={[styles.tableRow, styles.tableHeader]}>
                      <Text style={[styles.tableCell, { width: '33%' }]}>Particulars - Tour Cost</Text>
                      <Text style={[styles.tableCell, { width: '22%' }]}>Standard</Text>
                      <Text style={[styles.tableCell, { width: '22%' }]}>Deluxe</Text>
                      <Text style={[styles.tableCell, styles.tableCellLast, { width: '23%' }]}>Luxury</Text>
                    </View>
                    
                    {[
                      { label: 'Per pax on Twin Basis', 
                        standard: selectedDeparture.threeStar.twin, 
                        deluxe: selectedDeparture.fourStar.twin, 
                        luxury: selectedDeparture.fiveStar.twin },
                      { label: 'Per pax on Triple Basis', 
                        standard: selectedDeparture.threeStar.triple, 
                        deluxe: selectedDeparture.fourStar.triple, 
                        luxury: selectedDeparture.fiveStar.triple },
                      { label: 'Child with Bed', 
                        standard: selectedDeparture.threeStar.childWithBed, 
                        deluxe: selectedDeparture.fourStar.childWithBed, 
                        luxury: selectedDeparture.fiveStar.childWithBed },
                      { label: 'Child without Bed', 
                        standard: selectedDeparture.threeStar.childWithoutBed, 
                        deluxe: selectedDeparture.fourStar.childWithoutBed, 
                        luxury: selectedDeparture.fiveStar.childWithoutBed },
                      { label: 'Infant', 
                        standard: selectedDeparture.threeStar.infant, 
                        deluxe: selectedDeparture.fourStar.infant, 
                        luxury: selectedDeparture.fiveStar.infant },
                      { label: 'Per pax Single Occupancy', 
                        standard: selectedDeparture.threeStar.single, 
                        deluxe: selectedDeparture.fourStar.single, 
                        luxury: selectedDeparture.fiveStar.single },
                    ].map((row, idx) => (
                      <View key={idx} style={[styles.tableRow, { backgroundColor: idx % 2 === 0 ? '#EEF1F7' : 'white' }]}>
                        <Text style={[styles.tableCell, { width: '33%', fontWeight: 'medium' }]}>{row.label}</Text>
                        <Text style={[styles.tableCell, { width: '22%' }]}>{formatPrice(row.standard)}</Text>
                        <Text style={[styles.tableCell, { width: '22%', color: '#10b981', fontWeight: 'bold' }]}>{formatPrice(row.deluxe)}</Text>
                        <Text style={[styles.tableCell, styles.tableCellLast, { width: '23%' }]}>{formatPrice(row.luxury)}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ) : (
              <View style={{ padding: 20, backgroundColor: '#f8f9fa', borderRadius: 4 }}>
                <Text style={{ textAlign: 'center', color: '#666' }}>
                  {selectedCostMonth && selectedCostDate ? 
                    'No departure selected' : 
                    'Please select month and date to view tour cost'}
                </Text>
              </View>
            )}
          </View>
        ) : (
      
          // Individual Tour Departures
          <View style={{ borderWidth: 2, borderColor: '#1e3a8a', borderTopWidth: 0, padding: 15 }}>
            {tour?.departures?.descriptions?.map((desc, idx) => (
              <View key={idx} style={{ marginBottom: 10 }}>
                <Text style={styles.text}>{desc}</Text>
              </View>
            ))}
          </View>
        )}
        
        <Text style={styles.footer}>
          Page 3 • Departure Information
        </Text>
      </Page>

      {/* Page 4: Tour Cost */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Tour Cost Details</Text>
        
        <View style={styles.redBg}>
          <Text>Tour Cost</Text>
        </View>
        
        {!isGroupTour ? (
          // Individual Tour Cost Table
          <View style={[styles.table, { marginTop: 10 }]}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={[styles.tableCell, { width: '16%' }]}>Passenger</Text>
              <Text style={[styles.tableCell, { width: '16%' }]}>Standard Hotel</Text>
              <Text style={[styles.tableCell, { width: '16%' }]}>Deluxe Hotel</Text>
              <Text style={[styles.tableCell, { width: '16%' }]}>Executive Hotel</Text>
              <Text style={[styles.tableCell, { width: '18%' }]}>Child With Bed</Text>
              <Text style={[styles.tableCell, styles.tableCellLast, { width: '18%' }]}>Child No Bed</Text>
            </View>
            
            {tour?.tourCost?.tableData?.map((row, idx) => (
              <View key={idx} style={[styles.tableRow, { backgroundColor: idx % 2 === 0 ? '#FFEBEE' : '#FFEBEE80' }]}>
                <Text style={[styles.tableCell, { width: '16%' }]}>{row.passenger}</Text>
                <Text style={[styles.tableCell, { width: '16%' }]}>{formatPrice(row.standard)}</Text>
                <Text style={[styles.tableCell, { width: '16%', color: '#10b981', fontWeight: 'bold' }]}>{formatPrice(row.deluxe)}</Text>
                <Text style={[styles.tableCell, { width: '16%' }]}>{formatPrice(row.executive)}</Text>
                <Text style={[styles.tableCell, { width: '18%', color: '#2563eb' }]}>{formatPrice(row.childWithBed)}</Text>
                <Text style={[styles.tableCell, styles.tableCellLast, { width: '18%', color: '#7c3aed' }]}>{formatPrice(row.childNoBed)}</Text>
              </View>
            )) || (
              <View style={[styles.tableRow, { backgroundColor: '#FFEBEE' }]}>
                <Text style={[styles.tableCell, styles.tableCellLast, { width: '100%', textAlign: 'center' }]}>
                  No cost information available
                </Text>
              </View>
            )}
          </View>
        ) : null}
        
        {/* Tour Cost Remarks */}
        <View style={{ marginTop: 20 }}>
          <View style={[styles.redBg, { marginBottom: 10 }]}>
            <Text>Tour Cost Remarks</Text>
          </View>
          
          <View style={{ 
            borderWidth: 2, 
            borderColor: '#1e3a8a', 
            borderTopWidth: 0,
            padding: 15,
            backgroundColor: '#FFEBEE',
            minHeight: 80
          }}>
            {tour?.tourCost?.remarks?.map((remark, idx) => (
              <View key={idx} style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listText}>{remark}</Text>
              </View>
            )) || (
              <Text style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
                No tour cost remarks available
              </Text>
            )}
          </View>
        </View>
        
        {/* Optional Tours & EMI */}
        <View style={styles.twoColumn}>
          <View style={styles.column}>
            <View style={[styles.redBg, { marginBottom: 10 }]}>
              <Text>Optional Tour</Text>
            </View>
            
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={[styles.tableCell, { width: '40%' }]}>Tour Name</Text>
                <Text style={[styles.tableCell, { width: '30%' }]}>Adult Price</Text>
                <Text style={[styles.tableCell, styles.tableCellLast, { width: '30%' }]}>Child Price</Text>
              </View>
              
              {tour?.optionalTours?.map((opt, idx) => (
                <View key={idx} style={[styles.tableRow, { backgroundColor: idx % 2 === 0 ? '#FFEBEE' : '#FFEBEE80' }]}>
                  <Text style={[styles.tableCell, { width: '40%' }]}>{opt.tourName}</Text>
                  <Text style={[styles.tableCell, { width: '30%' }]}>{formatPrice(opt.adultPrice)}</Text>
                  <Text style={[styles.tableCell, styles.tableCellLast, { width: '30%' }]}>{formatPrice(opt.childPrice)}</Text>
                </View>
              )) || (
                <View style={[styles.tableRow, { backgroundColor: '#FFEBEE' }]}>
                  <Text style={[styles.tableCell, { width: '40%' }]}>N/A</Text>
                  <Text style={[styles.tableCell, { width: '30%' }]}>N/A</Text>
                  <Text style={[styles.tableCell, styles.tableCellLast, { width: '30%' }]}>N/A</Text>
                </View>
              )}
            </View>
          </View>
          
          <View style={styles.column}>
            <View style={[styles.redBg, { marginBottom: 10 }]}>
              <Text>EMI Options</Text>
            </View>
            
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={[styles.tableCell, { width: '33%' }]}>Loan Amount</Text>
                <Text style={[styles.tableCell, { width: '33%' }]}>Months</Text>
                <Text style={[styles.tableCell, styles.tableCellLast, { width: '34%' }]}>EMI</Text>
              </View>
              
              {tour?.emiOptions?.options?.map((emi, idx) => (
                <View key={idx} style={[styles.tableRow, { backgroundColor: idx % 2 === 0 ? '#FFEBEE' : '#FFEBEE80' }]}>
                  <Text style={[styles.tableCell, { width: '33%' }]}>{formatPrice(emi.loanAmount)}</Text>
                  <Text style={[styles.tableCell, { width: '33%' }]}>{emi.months}</Text>
                  <Text style={[styles.tableCell, styles.tableCellLast, { width: '34%' }]}>{formatPrice(emi.emi)}</Text>
                </View>
              )) || (
                <View style={[styles.tableRow, { backgroundColor: '#FFEBEE' }]}>
                  <Text style={[styles.tableCell, { width: '33%' }]}>N/A</Text>
                  <Text style={[styles.tableCell, { width: '33%' }]}>N/A</Text>
                  <Text style={[styles.tableCell, styles.tableCellLast, { width: '34%' }]}>N/A</Text>
                </View>
              )}
            </View>
          </View>
        </View>
        
        <Text style={styles.footer}>
          Page 4 • Cost Details
        </Text>
      </Page>

      {/* Page 5: Inclusions & Exclusions */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Cost Includes & Excludes</Text>
        
        <View style={styles.redBg}>
          <Text>Cost Inclusive & Cost Excludes</Text>
        </View>
        
        <View style={styles.twoColumn}>
          {/* Cost Includes */}
          <View style={styles.column}>
            <View style={[styles.blueBg, { marginBottom: 10 }]}>
              <Text>Cost Inclusive</Text>
            </View>
            
            <View style={{ 
              borderWidth: 2, 
              borderColor: '#1e3a8a', 
              borderTopWidth: 0,
              padding: 15,
              backgroundColor: '#FFEBEE',
              minHeight: 200
            }}>
              {tour?.inclusionExclusion?.inclusions?.map((item, idx) => (
                <View key={idx} style={styles.listItem}>
                  <Text style={[styles.bullet, { color: '#10b981' }]}>✓</Text>
                  <Text style={styles.listText}>{item}</Text>
                </View>
              )) || (
                <Text style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
                  No inclusions available
                </Text>
              )}
            </View>
          </View>
          
          {/* Cost Excludes */}
          <View style={styles.column}>
            <View style={[styles.blueBg, { marginBottom: 10 }]}>
              <Text>Cost Excludes</Text>
            </View>
            
            <View style={{ 
              borderWidth: 2, 
              borderColor: '#1e3a8a', 
              borderTopWidth: 0,
              padding: 15,
              backgroundColor: '#FFEBEE',
              minHeight: 200
            }}>
              {tour?.inclusionExclusion?.exclusions?.map((item, idx) => (
                <View key={idx} style={styles.listItem}>
                  <Text style={[styles.bullet, { color: '#E53C42' }]}>✗</Text>
                  <Text style={styles.listText}>{item}</Text>
                </View>
              )) || (
                <Text style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
                  No exclusions available
                </Text>
              )}
            </View>
          </View>
        </View>
        
        <Text style={styles.footer}>
          Page 5 • Inclusions & Exclusions
        </Text>
      </Page>

      {/* Page 6: Flights & Hotels */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Flights & Hotels</Text>
        
        {/* Flights Section */}
        <View style={{ marginBottom: 20 }}>
          <View style={styles.redBg}>
            <Text>Flight Details</Text>
          </View>
          
          <View style={{ 
            borderWidth: 2, 
            borderColor: '#1e3a8a', 
            borderTopWidth: 0,
            padding: 10,
            backgroundColor: '#FFEBEE'
          }}>
            {isGroupTour && tour?.airlines?.tableData && tour.airlines.tableData.length > 0 ? (
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <Text style={[styles.tableCell, { width: '14%' }]}>Airlines</Text>
                  <Text style={[styles.tableCell, { width: '11%' }]}>Flight No</Text>
                  <Text style={[styles.tableCell, { width: '14%' }]}>From</Text>
                  <Text style={[styles.tableCell, { width: '12%' }]}>Date</Text>
                  <Text style={[styles.tableCell, { width: '12%' }]}>Time</Text>
                  <Text style={[styles.tableCell, { width: '14%' }]}>To</Text>
                  <Text style={[styles.tableCell, { width: '12%' }]}>Date</Text>
                  <Text style={[styles.tableCell, { width: '11%' }]}>Time</Text>
                </View>
                
                {tour.airlines.tableData.map((flight, idx) => (
                  <View key={idx} style={[styles.tableRow, { backgroundColor: idx % 2 === 0 ? '#FFEBEE' : '#FFEBEE80' }]}>
                    <Text style={[styles.tableCell, { width: '14%' }]}>{flight.airline || '-'}</Text>
                    <Text style={[styles.tableCell, { width: '11%' }]}>{flight.flightNo || '-'}</Text>
                    <Text style={[styles.tableCell, { width: '14%' }]}>{flight.from || '-'}</Text>
                    <Text style={[styles.tableCell, { width: '12%' }]}>{flight.depDate || '-'}</Text>
                    <Text style={[styles.tableCell, { width: '12%' }]}>{flight.depTime || '-'}</Text>
                    <Text style={[styles.tableCell, { width: '14%' }]}>{flight.to || '-'}</Text>
                    <Text style={[styles.tableCell, { width: '12%' }]}>{flight.arrDate || '-'}</Text>
                    <Text style={[styles.tableCell, { width: '11%' }]}>{flight.arrTime || '-'}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <View style={{ padding: 20 }}>
                <Text style={{ textAlign: 'center', color: '#666' }}>
                  {tour?.airlines?.tableData && tour.airlines.tableData.length > 0 ? 
                    tour.airlines.tableData.map((flight, idx) => (
                      <Text key={idx}>
                        {flight.description || 'Flight information available'}
                      </Text>
                    )) : 
                    'No flight information available'}
                </Text>
              </View>
            )}
          </View>
          
          {/* Flight Remarks */}
          {tour?.airlines?.remarks && tour.airlines.remarks.length > 0 && (
            <View style={{ marginTop: 15 }}>
              <View style={[styles.redBg, { marginBottom: 10 }]}>
                <Text>Flight Remarks</Text>
              </View>
              
              <View style={{ 
                borderWidth: 2, 
                borderColor: '#1e3a8a', 
                borderTopWidth: 0,
                padding: 10,
                backgroundColor: '#FFEBEE'
              }}>
                {tour.airlines.remarks.map((remark, idx) => (
                  <View key={idx} style={styles.listItem}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.listText}>{remark}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
        
        {/* Hotels Section */}
        <View>
          <View style={styles.redbg}>
            <Text>Hotel Details</Text>
          </View>
          
          <View style={{ marginTop: 10 }}>
            {tour?.hotels?.tableData && tour.hotels.tableData.length > 0 ? (
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <Text style={[styles.tableCell, { width: '20%' }]}>City</Text>
                  <Text style={[styles.tableCell, { width: '15%' }]}>Nights</Text>
                  <Text style={[styles.tableCell, { width: '21%' }]}>Standard</Text>
                  <Text style={[styles.tableCell, { width: '21%' }]}>Deluxe</Text>
                  <Text style={[styles.tableCell, { width: '23%' }]}>Executive</Text>
                </View>
                
                {tour.hotels.tableData.map((hotel, idx) => (
                  <View key={idx} style={[styles.tableRow, { backgroundColor: idx % 2 === 0 ? '#FFEBEE' : '#FFEBEE80' }]}>
                    <Text style={[styles.tableCell, { width: '20%' }]}>{hotel.city}</Text>
                    <Text style={[styles.tableCell, { width: '15%' }]}>{hotel.nights}</Text>
                    <Text style={[styles.tableCell, { width: '21%' }]}>{hotel.standard}</Text>
                    <Text style={[styles.tableCell, { width: '21%' }]}>{hotel.deluxe}</Text>
                    <Text style={[styles.tableCell, { width: '23%' }]}>{hotel.executive}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <View style={{ padding: 20, backgroundColor: '#f8f9fa', borderRadius: 4 }}>
                <Text style={{ textAlign: 'center', color: '#666' }}>No hotel information available</Text>
              </View>
            )}
          </View>
          
          {/* Hotel Remarks */}
          {tour?.hotels?.remarks && tour.hotels.remarks.length > 0 && (
            <View style={{ marginTop: 15 }}>
              <View style={[styles.redBg, { marginBottom: 10 }]}>
                <Text>Hotel Remarks</Text>
              </View>
              
              <View style={{ 
                borderWidth: 2, 
                borderColor: '#1e3a8a', 
                borderTopWidth: 0,
                padding: 10,
                backgroundColor: '#FFEBEE'
              }}>
                {tour.hotels.remarks.map((remark, idx) => (
                  <View key={idx} style={styles.listItem}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.listText}>{remark}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
        
        <Text style={styles.footer}>
          Page 6 • Flights & Hotels
        </Text>
      </Page>

      {/* Page 7: Visa Information */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Visa Information</Text>
        
        <View style={styles.redBg}>
          <Text>Documents Required for Visa</Text>
        </View>
        
        {/* Visa Tabs Header */}
        <View style={[styles.tabHeader, { marginTop: 15 }]}>
          {["Tourist Visa", "Transit Visa", "Business Visa", "Visa Forms", "Photo", "Visa Fees", "Submission & Pick Up"].map((tab, idx) => (
            <Text key={idx} style={[styles.tabButton, idx === 0 ? styles.activeTab : {}]}>
              {tab}
            </Text>
          ))}
        </View>
        
        {/* Tourist Visa Content */}
        <View style={styles.visaContent}>
          {tour?.visaDetails?.tourist?.map((detail, idx) => (
            <View key={idx} style={{ marginBottom: 8 }}>
              <Text>{detail}</Text>
            </View>
          )) || (
            <Text style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
              No tourist visa information available
            </Text>
          )}
        </View>
        
        {/* Visa Forms Table */}
        <View style={{ marginTop: 20 }}>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={[styles.tableCell, { width: '70%' }]}>Visa Type</Text>
              <Text style={[styles.tableCell, { width: '15%' }]}>Action 1</Text>
              <Text style={[styles.tableCell, { width: '15%' }]}>Action 2</Text>
            </View>
            
            {['Tourist Visa Form Download', 'Transit Visa Form Download', 'Business Visa Form Download'].map((type, idx) => (
              <View key={idx} style={[styles.tableRow, { backgroundColor: idx % 2 === 0 ? '#FFEBEE' : '#FFEBEE80' }]}>
                <Text style={[styles.tableCell, { width: '70%' }]}>{type}</Text>
                <Text style={[styles.tableCell, { width: '15%', backgroundColor: '#E53C42', color: 'white', textAlign: 'center' }]}>
                  Download
                </Text>
                <Text style={[styles.tableCell, { width: '15%', backgroundColor: '#A72703', color: 'white', textAlign: 'center' }]}>
                  Fill Manually
                </Text>
              </View>
            ))}
          </View>
        </View>
        
        <Text style={styles.footer}>
          Page 7 • Visa Information
        </Text>
      </Page>

      {/* Page 8: Booking & Cancellation Policies */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Booking & Cancellation Policies</Text>
        
        <View style={styles.redBg}>
          <Text>Booking & Cancellation Policy</Text>
        </View>
        
        <View style={styles.twoColumn}>
          {/* Booking Policy */}
          <View style={styles.column}>
            <View style={[styles.blueBg, { marginBottom: 10 }]}>
              <Text>Booking Policy</Text>
            </View>
            
            <View style={{ 
              borderWidth: 2, 
              borderColor: '#1e3a8a', 
              borderTopWidth: 0,
              minHeight: 200
            }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1, padding: 10, borderRightWidth: 1, borderRightColor: '#1e3a8a' }}>
                  {tour?.booking?.items?.map((item, idx) => (
                    <View key={idx} style={{ marginBottom: 10, minHeight: 50 }}>
                      <Text style={{ fontSize: 9 }}>{item}</Text>
                    </View>
                  ))}
                </View>
                <View style={{ width: '20%', padding: 10 }}>
                  {tour?.booking?.amountDetails?.map((amount, idx) => (
                    <View key={idx} style={{ marginBottom: 10, minHeight: 50, justifyContent: 'center' }}>
                      <Text style={{ fontWeight: 'bold', color: '#10b981', textAlign: 'center' }}>{amount}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
          
          {/* Cancellation Policy */}
          <View style={styles.column}>
            <View style={[styles.redBg, { marginBottom: 10 }]}>
              <Text>Cancellation Policy</Text>
            </View>
            
            <View style={{ 
              borderWidth: 2, 
              borderColor: '#1e3a8a', 
              borderTopWidth: 0,
              minHeight: 200
            }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1, padding: 10, borderRightWidth: 1, borderRightColor: '#1e3a8a' }}>
                  {tour?.cancellation?.policies?.map((policy, idx) => (
                    <View key={idx} style={{ marginBottom: 10, minHeight: 50 }}>
                      <Text style={{ fontSize: 9 }}>{policy}</Text>
                    </View>
                  ))}
                </View>
                <View style={{ width: '20%', padding: 10 }}>
                  {tour?.cancellation?.charges?.map((charge, idx) => (
                    <View key={idx} style={{ marginBottom: 10, minHeight: 50, justifyContent: 'center' }}>
                      <Text style={{ fontWeight: 'bold', color: '#A72703', textAlign: 'center' }}>{charge}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </View>
        
        {/* Remarks */}
        <View style={styles.twoColumn}>
          <View style={styles.column}>
            <View style={[styles.blueBg, { marginTop: 15, marginBottom: 10 }]}>
              <Text>Booking Policy Remarks</Text>
            </View>
            
            <View style={{ 
              borderWidth: 2, 
              borderColor: '#1e3a8a', 
              borderTopWidth: 0,
              padding: 10,
              backgroundColor: '#FFEBEE',
              minHeight: 100
            }}>
              {tour?.bookingRemarks?.map((remark, idx) => (
                <View key={idx} style={styles.listItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.listText}>{remark}</Text>
                </View>
              )) || (
                <Text style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
                  No booking policy remarks available
                </Text>
              )}
            </View>
          </View>
          
          <View style={styles.column}>
            <View style={[styles.redBg, { marginTop: 15, marginBottom: 10 }]}>
              <Text>Cancellation Policy Remarks</Text>
            </View>
            
            <View style={{ 
              borderWidth: 2, 
              borderColor: '#1e3a8a', 
              borderTopWidth: 0,
              padding: 10,
              backgroundColor: '#FFEBEE',
              minHeight: 100
            }}>
              {tour?.cancellationRemarks?.map((remark, idx) => (
                <View key={idx} style={styles.listItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.listText}>{remark}</Text>
                </View>
              )) || (
                <Text style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
                  No cancellation policy remarks available
                </Text>
              )}
            </View>
          </View>
        </View>
        
        <Text style={styles.footer}>
          Page 8 • Policies
        </Text>
      </Page>

      {/* Page 9: Instructions & Additional Info */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Instructions & Additional Information</Text>
        
        <View style={styles.redBg}>
          <Text>Instructions</Text>
        </View>
        
        <View style={{ 
          borderWidth: 2, 
          borderColor: '#1e3a8a', 
          borderTopWidth: 0,
          padding: 20,
          backgroundColor: '#FFEBEE',
          minHeight: 300
        }}>
          {tour?.instructions?.map((instruction, idx) => (
            <View key={idx} style={[styles.listItem, { marginBottom: 8 }]}>
              <Text style={styles.bullet}>{idx + 1}.</Text>
              <Text style={styles.listText}>{instruction}</Text>
            </View>
          )) || (
            <Text style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
              No instructions available
            </Text>
          )}
        </View>
        
        {/* Optional Tour Remarks & EMI Remarks */}
        <View style={styles.twoColumn}>
          <View style={styles.column}>
            <View style={[styles.redBg, { marginTop: 15, marginBottom: 10 }]}>
              <Text>Optional Tour Remarks</Text>
            </View>
            
            <View style={{ 
              borderWidth: 2, 
              borderColor: '#1e3a8a', 
              borderTopWidth: 0,
              padding: 10,
              backgroundColor: '#FFEBEE',
              minHeight: 100
            }}>
              {tour?.optionalTourRemarks?.map((remark, idx) => (
                <View key={idx} style={styles.listItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.listText}>{remark}</Text>
                </View>
              )) || (
                <Text style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
                  No optional tour remarks available
                </Text>
              )}
            </View>
          </View>
          
          <View style={styles.column}>
            <View style={[styles.redBg, { marginTop: 15, marginBottom: 10 }]}>
              <Text>EMI Remarks</Text>
            </View>
            
            <View style={{ 
              borderWidth: 2, 
              borderColor: '#1e3a8a', 
              borderTopWidth: 0,
              padding: 10,
              backgroundColor: '#FFEBEE',
              minHeight: 100
            }}>
              {tour?.emiRemarks?.map((remark, idx) => (
                <View key={idx} style={styles.listItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.listText}>{remark}</Text>
                </View>
              )) || (
                <Text style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
                  No EMI remarks available
                </Text>
              )}
            </View>
          </View>
        </View>
        
        {/* Additional Remarks */}
        {tour?.additionalRemarks && tour.additionalRemarks.length > 0 && (
          <View style={{ marginTop: 15 }}>
            <View style={[styles.redBg, { marginBottom: 10 }]}>
              <Text>Additional Remarks</Text>
            </View>
            
            <View style={{ 
              borderWidth: 2, 
              borderColor: '#1e3a8a', 
              borderTopWidth: 0,
              padding: 15,
              backgroundColor: '#FFEBEE'
            }}>
              {tour.additionalRemarks.map((remark, idx) => (
                <View key={idx} style={styles.listItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.listText}>{remark}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
        
        <View style={{ marginTop: 30, paddingTop: 20, borderTopWidth: 1, borderTopColor: '#ddd' }}>
          <Text style={{ textAlign: 'center', fontSize: 9, color: '#666' }}>
            This PDF contains all tour details for {tour?.title || 'International Tour Package'}
          </Text>
          <Text style={{ textAlign: 'center', fontSize: 8, color: '#999', marginTop: 5 }}>
            Generated on {new Date().toLocaleDateString('en-IN', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Text>
        </View>
        
        <Text style={styles.footer}>
          Page 9 • Final Page
        </Text>
      </Page>
    </Document>
  );
};

export default TourPdfDocumentinternational;