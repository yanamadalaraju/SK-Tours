// TourPdfDocumentinternational.tsx - COMPLETE VERSION
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
    inclusions?: Array<any>;
    exclusions?: Array<any>;
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
  optionalTours?: Array<any>;
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
    descriptions?: string[];
  };
  optionalTourRemarks?: string[];
  
  // Visa Data Types
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

interface TourPdfDocumentProps {
  tour: TourData;
  tourType: string;
  isGroupTour: boolean;
  selectedCostMonth: string;
  selectedCostDate: string;
  selectedDeparture: DepartureData | null;
  currentImageIndex: number;
  tourImages?: string[];
  activeVisaTab?: string;
  activeVisaFeeType?: string;
  BASE_URL?: string;
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

// Updated PDF Styles with Visa section support
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
  
  // Enhanced Table Styles
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
  tableCellLeft: {
    textAlign: 'left',
    paddingLeft: 8,
  },
  
  // Visa Table Styles
  visaTableContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
  },
  visaTableHeader: {
    flexDirection: 'row',
    backgroundColor: '#A72703',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    borderBottomStyle: 'solid',
  },
  visaTableHeaderCell: {
    padding: 6,
    fontSize: 9,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#fff',
  },
  visaTableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
  },
  visaTableCell: {
    padding: 6,
    fontSize: 8,
    textAlign: 'left',
    borderRightWidth: 1,
    borderRightColor: '#000',
  },
  
  // Special Tables
  departureTable: {
    marginBottom: 15,
  },
  departureHeader: {
    flexDirection: 'row',
    backgroundColor: '#0A1D4A',
  },
  departureHeaderCell: {
    padding: 6,
    fontSize: 9,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#fff',
  },
  departureRow: {
    flexDirection: 'row',
  },
  departureCell: {
    padding: 6,
    fontSize: 8,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#000',
    borderStyle: 'solid',
  },
  
  itineraryDay: {
    marginBottom: 10,
    border: '1px solid #ddd',
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
  // Checkbox styles
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
  departureInfo: {
    backgroundColor: '#f0f9ff',
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#bae6fd',
    marginBottom: 12,
  },
  departureRowInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  departureLabel: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#2E4D98',
    width: '30%',
  },
  departureValue: {
    fontSize: 9,
    color: '#333',
    width: '65%',
    textAlign: 'right',
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
  // Individual tour flight description style
  flightDescription: {
    backgroundColor: '#f0f9ff',
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#bae6fd',
    marginBottom: 8,
  },
  
  // Visa Section Styles
  visaSection: {
    marginBottom: 15,
  },
  visaTabHeader: {
    backgroundColor: '#FFE797',
    padding: 8,
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
    marginBottom: 0,
  },
  visaTabHeaderActive: {
    backgroundColor: '#A72703',
    padding: 8,
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
    marginBottom: 0,
  },
  visaTabText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  visaTabTextActive: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  visaContent: {
    padding: 10,
    backgroundColor: '#FFEBEE',
    borderWidth: 1,
    borderColor: '#000',
    borderTopWidth: 0,
    borderStyle: 'solid',
    minHeight: 200,
  },
  visaListItem: {
    marginBottom: 8,
    paddingLeft: 5,
  },
  visaFormButton: {
    backgroundColor: '#E53C42',
    padding: 6,
    borderRadius: 3,
    marginRight: 10,
    marginBottom: 5,
  },
  visaFormButtonText: {
    color: 'white',
    fontSize: 8,
    textAlign: 'center',
  },
  photoSpecsContainer: {
    backgroundColor: '#f0f9ff',
    padding: 10,
    borderWidth: 1,
    borderColor: '#bae6fd',
    marginBottom: 10,
  },
});

// Main PDF Document Component with Visa tabs
const TourPdfDocumentinternational: React.FC<TourPdfDocumentProps> = ({ 
  tour, 
  tourType, 
  isGroupTour, 
  selectedCostMonth, 
  selectedCostDate, 
  selectedDeparture,
  currentImageIndex,
  tourImages = [],
  activeVisaTab = 'tourist',
  activeVisaFeeType = 'tourist',
  BASE_URL = ''
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

  // ======================== VISA FUNCTIONS ========================
  // Function to render Visa Tourist tab content
  const renderVisaTourist = () => {
    if (!tour?.visaDetails?.tourist || tour.visaDetails.tourist.length === 0) {
      return (
        <View style={styles.highlight}>
          <Text style={styles.text}>No tourist visa information available</Text>
        </View>
      );
    }

    return (
      <View>
        <Text style={[styles.title, { marginBottom: 10 }]}>Documents Required for Tourist Visa:</Text>
        {tour.visaDetails.tourist.map((description, index) => (
          <View key={index} style={styles.visaListItem}>
            <Text style={styles.text}>{description}</Text>
          </View>
        ))}
      </View>
    );
  };

  // Function to render Visa Transit tab content
  const renderVisaTransit = () => {
    if (!tour?.visaDetails?.transit || tour.visaDetails.transit.length === 0) {
      return (
        <View style={styles.highlight}>
          <Text style={styles.text}>No transit visa information available</Text>
        </View>
      );
    }

    return (
      <View>
        <Text style={[styles.title, { marginBottom: 10 }]}>Documents Required for Transit Visa:</Text>
        {tour.visaDetails.transit.map((description, index) => (
          <View key={index} style={styles.visaListItem}>
            <Text style={styles.text}>{description}</Text>
          </View>
        ))}
      </View>
    );
  };

  // Function to render Visa Business tab content
  const renderVisaBusiness = () => {
    if (!tour?.visaDetails?.business || tour.visaDetails.business.length === 0) {
      return (
        <View style={styles.highlight}>
          <Text style={styles.text}>No business visa information available</Text>
        </View>
      );
    }

    return (
      <View>
        <Text style={[styles.title, { marginBottom: 10 }]}>Documents Required for Business Visa:</Text>
        {tour.visaDetails.business.map((description, index) => (
          <View key={index} style={styles.visaListItem}>
            <Text style={styles.text}>{description}</Text>
          </View>
        ))}
      </View>
    );
  };

  // Function to render Visa Forms tab content
  const renderVisaForms = () => {
    if (!tour?.visaForms || tour.visaForms.length === 0) {
      return (
        <View style={styles.highlight}>
          <Text style={styles.text}>No visa forms available</Text>
        </View>
      );
    }

    return (
      <View>
        <View style={styles.visaTableContainer}>
          {/* Header */}
          <View style={styles.visaTableHeader}>
            <Text style={[styles.visaTableHeaderCell, { width: '70%' }]}>Visa Type</Text>
            <Text style={[styles.visaTableHeaderCell, { width: '15%' }]}>Action 1</Text>
            <Text style={[styles.visaTableHeaderCell, { width: '15%' }]}>Action 2</Text>
          </View>

          {/* Tourist Visa Form Row */}
          <View style={[styles.visaTableRow, { backgroundColor: '#FFEBEE' }]}>
            <Text style={[styles.visaTableCell, { width: '70%' }]}>
              Tourist Visa Form Download
            </Text>
            <View style={[styles.visaTableCell, { width: '15%', justifyContent: 'center', alignItems: 'center' }]}>
              <View style={styles.visaFormButton}>
                <Text style={styles.visaFormButtonText}>Download</Text>
              </View>
            </View>
            <View style={[styles.visaTableCell, { width: '15%', justifyContent: 'center', alignItems: 'center' }]}>
              <View style={[styles.visaFormButton, { backgroundColor: '#8B4513' }]}>
                <Text style={styles.visaFormButtonText}>Fill Manually</Text>
              </View>
            </View>
          </View>

          {/* Transit Visa Form Row */}
          <View style={[styles.visaTableRow, { backgroundColor: '#FFEBEE' }]}>
            <Text style={[styles.visaTableCell, { width: '70%' }]}>
              Transit Visa Form Download
            </Text>
            <View style={[styles.visaTableCell, { width: '15%', justifyContent: 'center', alignItems: 'center' }]}>
              <View style={styles.visaFormButton}>
                <Text style={styles.visaFormButtonText}>Download</Text>
              </View>
            </View>
            <View style={[styles.visaTableCell, { width: '15%', justifyContent: 'center', alignItems: 'center' }]}>
              <View style={[styles.visaFormButton, { backgroundColor: '#8B4513' }]}>
                <Text style={styles.visaFormButtonText}>Fill</Text>
              </View>
            </View>
          </View>

          {/* Business Visa Form Row */}
          <View style={[styles.visaTableRow, { backgroundColor: '#FFEBEE' }]}>
            <Text style={[styles.visaTableCell, { width: '70%' }]}>
              Business Visa Form Download
            </Text>
            <View style={[styles.visaTableCell, { width: '15%', justifyContent: 'center', alignItems: 'center' }]}>
              <View style={styles.visaFormButton}>
                <Text style={styles.visaFormButtonText}>Download</Text>
              </View>
            </View>
            <View style={[styles.visaTableCell, { width: '15%', justifyContent: 'center', alignItems: 'center' }]}>
              <View style={[styles.visaFormButton, { backgroundColor: '#8B4513' }]}>
                <Text style={styles.visaFormButtonText}>Fill Manually</Text>
              </View>
            </View>
          </View>
        </View>

        <Text style={styles.note}>Note: Forms can be downloaded and filled as per requirements</Text>
      </View>
    );
  };

  // Function to render Photo Specifications tab content
  const renderVisaPhoto = () => {
    if (!tour?.visaDetails?.photo || tour.visaDetails.photo.length === 0) {
      return (
        <View style={styles.highlight}>
          <Text style={styles.text}>No photo specifications available</Text>
        </View>
      );
    }

    return (
      <View>
        <Text style={[styles.title, { marginBottom: 10 }]}>Photo Specifications:</Text>
        <View style={styles.photoSpecsContainer}>
          {tour.visaDetails.photo.map((spec, index) => (
            <View key={index} style={styles.visaListItem}>
              <Text style={styles.text}>{spec}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  // Function to render Visa Fees tab content
  const renderVisaFees = () => {
    if (!tour?.visaFees || tour.visaFees.length === 0) {
      return (
        <View style={styles.highlight}>
          <Text style={styles.text}>No visa fee information available</Text>
        </View>
      );
    }

    return (
      <View>
        <Text style={[styles.title, { marginBottom: 10 }]}>
          {activeVisaFeeType === 'tourist' && 'Tourist Visa Fees'}
          {activeVisaFeeType === 'transit' && 'Transit Visa Fees'}
          {activeVisaFeeType === 'business' && 'Business Visa Fees'}
          {!activeVisaFeeType && 'Visa Fees & VFS & Other Charges'}
        </Text>
        
        <View style={styles.visaTableContainer}>
          {/* Header */}
          <View style={styles.visaTableHeader}>
            <Text style={[styles.visaTableHeaderCell, { width: '60%' }]}>Description</Text>
            <Text style={[styles.visaTableHeaderCell, { width: '40%' }]}>Charges</Text>
          </View>

          {/* Rows based on selected fee type */}
          {tour.visaFees.map((fee, index) => {
            let description = '';
            let charges = '';

            if (activeVisaFeeType === 'tourist') {
              description = fee.tourist || 'Tourist Visa Fee';
              charges = fee.touristCharges || 'N/A';
            } else if (activeVisaFeeType === 'transit') {
              description = fee.transit || 'Transit Visa Fee';
              charges = fee.transitCharges || 'N/A';
            } else if (activeVisaFeeType === 'business') {
              description = fee.business || 'Business Visa Fee';
              charges = fee.businessCharges || 'N/A';
            } else {
              description = fee.charges || 'Visa Fee';
              charges = fee.charges || 'N/A';
            }

            return (
              <View 
                key={index} 
                style={[
                  styles.visaTableRow,
                  { backgroundColor: index % 2 === 0 ? '#FFEBEE' : '#FFEBEE80' }
                ]}
              >
                <Text style={[styles.visaTableCell, { width: '60%' }]}>
                  {description}
                </Text>
                <Text style={[styles.visaTableCell, { width: '40%' }]}>
                  {charges}
                </Text>
              </View>
            );
          })}
        </View>

        <Text style={styles.note}>Note: Charges are subject to change without prior notice</Text>
      </View>
    );
  };

  // Function to render Submission & Pick Up tab content
  const renderVisaSubmission = () => {
    if (!tour?.visaSubmission || tour.visaSubmission.length === 0) {
      return (
        <View style={styles.highlight}>
          <Text style={styles.text}>No visa submission information available</Text>
        </View>
      );
    }

    return (
      <View>
        <Text style={[styles.title, { marginBottom: 10 }]}>
          {activeVisaFeeType === 'tourist' && 'Tourist Visa Submission & Processing Time'}
          {activeVisaFeeType === 'transit' && 'Transit Visa Submission & Processing Time'}
          {activeVisaFeeType === 'business' && 'Business Visa Submission & Processing Time'}
        </Text>
        
        <View style={styles.visaTableContainer}>
          {/* Header */}
          <View style={styles.visaTableHeader}>
            <Text style={[styles.visaTableHeaderCell, { width: '60%' }]}>Process</Text>
            <Text style={[styles.visaTableHeaderCell, { width: '40%' }]}>Time/Details</Text>
          </View>

          {/* Rows based on selected visa type */}
          {tour.visaSubmission.map((sub, index) => {
            let details = '';

            if (activeVisaFeeType === 'tourist') {
              details = sub.tourist || 'N/A';
            } else if (activeVisaFeeType === 'transit') {
              details = sub.transit || 'N/A';
            } else if (activeVisaFeeType === 'business') {
              details = sub.business || 'N/A';
            }

            return (
              <View 
                key={index} 
                style={[
                  styles.visaTableRow,
                  { backgroundColor: index % 2 === 0 ? '#FFEBEE' : '#FFEBEE80' }
                ]}
              >
                <Text style={[styles.visaTableCell, { width: '60%' }]}>
                  {sub.label}
                </Text>
                <Text style={[styles.visaTableCell, { width: '40%' }]}>
                  {details}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  // Function to render Visa Remarks
  const renderVisaRemarks = () => {
    const remarks = tour?.visaForms?.[0]?.remarks;
    
    if (!remarks) {
      return null;
    }

    return (
      <View style={styles.section}>
        <Text style={[styles.title, { color: '#E53C42', marginBottom: 5 }]}>Visa Remarks:</Text>
        <View style={{ backgroundColor: '#FFEBEE', padding: 8, borderRadius: 4 }}>
          <Text style={styles.text}>{remarks}</Text>
        </View>
      </View>
    );
  };

// Function to render complete Visa section - SHOW ALL TABS
const renderVisaSection = () => {
  return (
    <View style={styles.visaSection}>
      <Text style={[styles.header, { fontSize: 18, marginBottom: 20 }]}>
        Visa Information
      </Text>
      
      {/* List all visa sections */}
      <Text style={[styles.title, { marginBottom: 10 }]}>Available Visa Sections:</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5, marginBottom: 15 }}>
        <Text style={styles.text}>Tourist Visa | Transit Visa | Business Visa | Visa Forms | Photo | Visa Fees | Submission & Pick Up</Text>
      </View>
      
      {/* TOURIST VISA */}
      <View style={{ marginBottom: 20 }}>
        <Text style={[styles.subHeader, { backgroundColor: '#FFEBEE', padding: 8, marginBottom: 10 }]}>
          Documents Required for Visa - TOURIST
        </Text>
        <View style={styles.visaContent}>
          {renderVisaTourist()}
        </View>
      </View>
      
      {/* TRANSIT VISA */}
      <View style={{ marginBottom: 20 }}>
        <Text style={[styles.subHeader, { backgroundColor: '#FFEBEE', padding: 8, marginBottom: 10 }]}>
          Documents Required for Visa - TRANSIT
        </Text>
        <View style={styles.visaContent}>
          {renderVisaTransit()}
        </View>
      </View>
      
      {/* BUSINESS VISA */}
      <View style={{ marginBottom: 20 }}>
        <Text style={[styles.subHeader, { backgroundColor: '#FFEBEE', padding: 8, marginBottom: 10 }]}>
          Documents Required for Visa - BUSINESS
        </Text>
        <View style={styles.visaContent}>
          {renderVisaBusiness()}
        </View>
      </View>
      
      {/* VISA FORMS */}
      <View style={{ marginBottom: 20 }}>
        <Text style={[styles.subHeader, { backgroundColor: '#FFEBEE', padding: 8, marginBottom: 10 }]}>
          Visa Forms
        </Text>
        <View style={styles.visaContent}>
          {renderVisaForms()}
        </View>
      </View>
      
      {/* PHOTO SPECIFICATIONS */}
      <View style={{ marginBottom: 20 }}>
        <Text style={[styles.subHeader, { backgroundColor: '#FFEBEE', padding: 8, marginBottom: 10 }]}>
          Photo Specifications
        </Text>
        <View style={styles.visaContent}>
          {renderVisaPhoto()}
        </View>
      </View>
      
      {/* VISA FEES - Show all fee types */}
      <View style={{ marginBottom: 20 }}>
        <Text style={[styles.subHeader, { backgroundColor: '#FFEBEE', padding: 8, marginBottom: 10 }]}>
          Visa Fees
        </Text>
        <View style={styles.visaContent}>
          <Text style={[styles.title, { marginBottom: 15 }]}>Tourist Visa Fees</Text>
          {renderVisaFeesForType('tourist')}
          
          <View style={{ marginTop: 20 }}>
            <Text style={[styles.title, { marginBottom: 15 }]}>Transit Visa Fees</Text>
            {renderVisaFeesForType('transit')}
          </View>
          
          <View style={{ marginTop: 20 }}>
            <Text style={[styles.title, { marginBottom: 15 }]}>Business Visa Fees</Text>
            {renderVisaFeesForType('business')}
          </View>
        </View>
      </View>
      
      {/* SUBMISSION & PICK UP - Show all types */}
      <View style={{ marginBottom: 20 }}>
        <Text style={[styles.subHeader, { backgroundColor: '#FFEBEE', padding: 8, marginBottom: 10 }]}>
          Submission & Processing Time
        </Text>
        <View style={styles.visaContent}>
          <Text style={[styles.title, { marginBottom: 15 }]}>Tourist Visa Submission</Text>
          {renderVisaSubmissionForType('tourist')}
          
          <View style={{ marginTop: 20 }}>
            <Text style={[styles.title, { marginBottom: 15 }]}>Transit Visa Submission</Text>
            {renderVisaSubmissionForType('transit')}
          </View>
          
          <View style={{ marginTop: 20 }}>
            <Text style={[styles.title, { marginBottom: 15 }]}>Business Visa Submission</Text>
            {renderVisaSubmissionForType('business')}
          </View>
        </View>
      </View>
      
      {/* VISA REMARKS */}
      {renderVisaRemarks()}
    </View>
  );
};

// Helper function to render visa fees by type
const renderVisaFeesForType = (feeType: string) => {
  if (!tour?.visaFees || tour.visaFees.length === 0) {
    return (
      <View style={styles.highlight}>
        <Text style={styles.text}>No {feeType} visa fee information available</Text>
      </View>
    );
  }

  return (
    <View style={styles.visaTableContainer}>
      {/* Header */}
      <View style={styles.visaTableHeader}>
        <Text style={[styles.visaTableHeaderCell, { width: '60%' }]}>Description</Text>
        <Text style={[styles.visaTableHeaderCell, { width: '40%' }]}>Charges</Text>
      </View>

      {/* Rows */}
      {tour.visaFees.map((fee, index) => {
        let description = '';
        let charges = '';

        if (feeType === 'tourist') {
          description = fee.tourist || 'Tourist Visa Fee';
          charges = fee.touristCharges || 'N/A';
        } else if (feeType === 'transit') {
          description = fee.transit || 'Transit Visa Fee';
          charges = fee.transitCharges || 'N/A';
        } else if (feeType === 'business') {
          description = fee.business || 'Business Visa Fee';
          charges = fee.businessCharges || 'N/A';
        }

        return (
          <View 
            key={index} 
            style={[
              styles.visaTableRow,
              { backgroundColor: index % 2 === 0 ? '#FFEBEE' : '#FFEBEE80' }
            ]}
          >
            <Text style={[styles.visaTableCell, { width: '60%' }]}>
              {description}
            </Text>
            <Text style={[styles.visaTableCell, { width: '40%' }]}>
              {charges}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

// Helper function to render visa submission by type
const renderVisaSubmissionForType = (visaType: string) => {
  if (!tour?.visaSubmission || tour.visaSubmission.length === 0) {
    return (
      <View style={styles.highlight}>
        <Text style={styles.text}>No {visaType} visa submission information available</Text>
      </View>
    );
  }

  return (
    <View style={styles.visaTableContainer}>
      {/* Header */}
      <View style={styles.visaTableHeader}>
        <Text style={[styles.visaTableHeaderCell, { width: '60%' }]}>Process</Text>
        <Text style={[styles.visaTableHeaderCell, { width: '40%' }]}>Time/Details</Text>
      </View>

      {/* Rows */}
      {tour.visaSubmission.map((sub, index) => {
        let details = '';

        if (visaType === 'tourist') {
          details = sub.tourist || 'N/A';
        } else if (visaType === 'transit') {
          details = sub.transit || 'N/A';
        } else if (visaType === 'business') {
          details = sub.business || 'N/A';
        }

        return (
          <View 
            key={index} 
            style={[
              styles.visaTableRow,
              { backgroundColor: index % 2 === 0 ? '#FFEBEE' : '#FFEBEE80' }
            ]}
          >
            <Text style={[styles.visaTableCell, { width: '60%' }]}>
              {sub.label}
            </Text>
            <Text style={[styles.visaTableCell, { width: '40%' }]}>
              {details}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

  // ======================== EXISTING RENDERING FUNCTIONS ========================
  
  // Function to render group tour cost table (ONLY for group tours)
  const renderGroupTourCostTable = () => {
    if (!isGroupTour || !selectedDeparture) return null;

    return (
      <View style={styles.departureTable}>
        {/* Header */}
        <View style={styles.departureHeader}>
          <Text style={[styles.departureHeaderCell, { width: '33%' }]}>Particulars - Tour Cost</Text>
          <Text style={[styles.departureHeaderCell, { width: '22%' }]}>Standard</Text>
          <Text style={[styles.departureHeaderCell, { width: '22%' }]}>Deluxe</Text>
          <Text style={[styles.departureHeaderCell, { width: '23%' }]}>Luxury</Text>
        </View>

        {/* Rows */}
        {[
          { particular: "Per pax on Twin Basis", star3: selectedDeparture.threeStar?.twin, star4: selectedDeparture.fourStar?.twin, star5: selectedDeparture.fiveStar?.twin },
          { particular: "Per pax on Triple Basis", star3: selectedDeparture.threeStar?.triple, star4: selectedDeparture.fourStar?.triple, star5: selectedDeparture.fiveStar?.triple },
          { particular: "Child with Bed", star3: selectedDeparture.threeStar?.childWithBed, star4: selectedDeparture.fourStar?.childWithBed, star5: selectedDeparture.fiveStar?.childWithBed },
          { particular: "Child without Bed", star3: selectedDeparture.threeStar?.childWithoutBed, star4: selectedDeparture.fourStar?.childWithoutBed, star5: selectedDeparture.fiveStar?.childWithoutBed },
          { particular: "Infant", star3: selectedDeparture.threeStar?.infant, star4: selectedDeparture.fourStar?.infant, star5: selectedDeparture.fiveStar?.infant },
          { particular: "Per pax Single Occupancy", star3: selectedDeparture.threeStar?.single, star4: selectedDeparture.fourStar?.single, star5: selectedDeparture.fiveStar?.single },
        ].map((row, i) => (
          <View 
            key={i} 
            style={[
              styles.departureRow,
              { backgroundColor: i % 2 === 0 ? '#EEF1F7' : 'white' }
            ]}
          >
            <Text style={[styles.departureCell, { width: '33%', textAlign: 'left', paddingLeft: 8, fontWeight: 'medium' }]}>
              {row.particular}
            </Text>
            <Text style={[styles.departureCell, { width: '22%' }]}>
              {formatPrice(row.star3)}
            </Text>
            <Text style={[styles.departureCell, { width: '22%', color: '#10b981', fontWeight: 'bold' }]}>
              {formatPrice(row.star4)}
            </Text>
            <Text style={[styles.departureCell, { width: '23%' }]}>
              {formatPrice(row.star5)}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  // Function to render individual tour cost table (ONLY for individual tours)
  const renderIndividualTourCostTable = () => {
    if (isGroupTour || !tour?.tourCost?.tableData || tour.tourCost.tableData.length === 0) {
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
          <Text style={[styles.tableHeaderCell, { width: '16%' }]}>Passenger</Text>
          <Text style={[styles.tableHeaderCell, { width: '16%' }]}>Standard Hotel</Text>
          <Text style={[styles.tableHeaderCell, { width: '16%' }]}>Deluxe Hotel</Text>
          <Text style={[styles.tableHeaderCell, { width: '16%' }]}>Executive Hotel</Text>
          <Text style={[styles.tableHeaderCell, { width: '18%' }]}>Child With Bed</Text>
          <Text style={[styles.tableHeaderCell, { width: '18%' }]}>Child No Bed</Text>
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
            <Text style={[styles.tableCell, { width: '16%', fontWeight: 'medium' }]}>
              {row.passenger}
            </Text>
            <Text style={[styles.tableCell, { width: '16%' }]}>
              {formatPrice(row.standard)}
            </Text>
            <Text style={[styles.tableCell, { width: '16%', color: '#10b981', fontWeight: 'bold' }]}>
              {formatPrice(row.deluxe)}
            </Text>
            <Text style={[styles.tableCell, { width: '16%' }]}>
              {formatPrice(row.executive)}
            </Text>
            <Text style={[styles.tableCell, { width: '18%', color: '#2563eb' }]}>
              {formatPrice(row.childWithBed)}
            </Text>
            <Text style={[styles.tableCell, { width: '18%', color: '#7c3aed' }]}>
              {formatPrice(row.childNoBed)}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  // Function to render hotels table (for both group and individual tours)
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
        {/* Header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderCell, { width: '20%' }]}>City</Text>
          <Text style={[styles.tableHeaderCell, { width: '15%' }]}>Nights</Text>
          <Text style={[styles.tableHeaderCell, { width: '21%' }]}>Standard</Text>
          <Text style={[styles.tableHeaderCell, { width: '21%' }]}>Deluxe</Text>
          <Text style={[styles.tableHeaderCell, { width: '23%' }]}>Executive</Text>
        </View>

        {/* Rows */}
        {tour.hotels.tableData.map((hotel, index) => (
          <View 
            key={index} 
            style={[
              styles.tableRow,
              { backgroundColor: index % 2 === 0 ? '#FFEBEE' : '#FFEBEE80' }
            ]}
          >
            <Text style={[styles.tableCell, { width: '20%' }]}>{hotel.city}</Text>
            <Text style={[styles.tableCell, { width: '15%' }]}>{hotel.nights}</Text>
            <Text style={[styles.tableCell, { width: '21%' }]}>{hotel.standard}</Text>
            <Text style={[styles.tableCell, { width: '21%' }]}>{hotel.deluxe}</Text>
            <Text style={[styles.tableCell, { width: '23%' }]}>{hotel.executive}</Text>
          </View>
        ))}
      </View>
    );
  };

  // Function to render airlines table (ONLY for group tours)
  const renderGroupAirlinesTable = () => {
    if (!isGroupTour || !tour?.airlines?.tableData || tour.airlines.tableData.length === 0) {
      return null;
    }

    return (
      <View style={styles.tableContainer}>
        {/* Header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderCell, { width: '12%' }]}>Airlines</Text>
          <Text style={[styles.tableHeaderCell, { width: '12%' }]}>Flight No</Text>
          <Text style={[styles.tableHeaderCell, { width: '15%' }]}>From</Text>
          <Text style={[styles.tableHeaderCell, { width: '10%' }]}>Date</Text>
          <Text style={[styles.tableHeaderCell, { width: '8%' }]}>Time</Text>
          <Text style={[styles.tableHeaderCell, { width: '15%' }]}>To</Text>
          <Text style={[styles.tableHeaderCell, { width: '10%' }]}>Date</Text>
          <Text style={[styles.tableHeaderCell, { width: '8%' }]}>Time</Text>
          <Text style={[styles.tableHeaderCell, { width: '10%' }]}>Via</Text>
        </View>

        {/* Rows */}
        {tour.airlines.tableData.map((flight, index) => (
          <View 
            key={index} 
            style={[
              styles.tableRow,
              { backgroundColor: index % 2 === 0 ? '#FFEBEE' : '#FFEBEE80' }
            ]}
          >
            <Text style={[styles.tableCell, { width: '12%' }]}>{flight.airline || '-'}</Text>
            <Text style={[styles.tableCell, { width: '12%' }]}>{flight.flightNo || '-'}</Text>
            <Text style={[styles.tableCell, { width: '15%' }]}>{flight.from || '-'}</Text>
            <Text style={[styles.tableCell, { width: '10%' }]}>{flight.depDate || '-'}</Text>
            <Text style={[styles.tableCell, { width: '8%' }]}>{flight.depTime || '-'}</Text>
            <Text style={[styles.tableCell, { width: '15%' }]}>{flight.to || '-'}</Text>
            <Text style={[styles.tableCell, { width: '10%' }]}>{flight.arrDate || '-'}</Text>
            <Text style={[styles.tableCell, { width: '8%' }]}>{flight.arrTime || '-'}</Text>
            <Text style={[styles.tableCell, { width: '10%' }]}>{flight.via || '-'}</Text>
          </View>
        ))}
      </View>
    );
  };

  // Function to render individual tour flight descriptions
  const renderIndividualFlightDescriptions = () => {
    if (isGroupTour || !tour?.airlines?.tableData || tour.airlines.tableData.length === 0) {
      return null;
    }

    return (
      <View style={styles.section}>
        <Text style={styles.subHeader}>Flight Details</Text>
        {tour.airlines.tableData.map((flight, index) => (
          <View key={index} style={styles.flightDescription}>
            {flight.description && (
              <Text style={styles.text}>{flight.description}</Text>
            )}
            {!flight.description && flight.airline && (
              <Text style={styles.text}>
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

  // Function to render all departures table (ONLY for group tours)
  const renderAllDeparturesTable = () => {
    if (!isGroupTour || !tour?.departures?.data || tour.departures.data.length === 0) {
      return null;
    }

    return (
      <View style={styles.tableContainer}>
        <Text style={styles.title}>All Available Departure Dates:</Text>
        
        {/* Header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderCell, { width: '20%' }]}>Month</Text>
          <Text style={[styles.tableHeaderCell, { width: '20%' }]}>From Date</Text>
          <Text style={[styles.tableHeaderCell, { width: '20%' }]}>To Date</Text>
          <Text style={[styles.tableHeaderCell, { width: '20%' }]}>Base Price</Text>
          <Text style={[styles.tableHeaderCell, { width: '20%' }]}>Status</Text>
        </View>

        {/* Rows */}
        {tour.departures.data.map((dep: any, index: number) => (
          <View 
            key={index} 
            style={[
              styles.tableRow,
              { backgroundColor: index % 2 === 0 ? '#EEF1F7' : 'white' }
            ]}
          >
            <Text style={[styles.tableCell, { width: '20%' }]}>{dep.month}</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>{dep.fromDate}</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>{dep.toDate}</Text>
            <Text style={[styles.tableCell, { width: '20%', fontWeight: 'bold' }]}>
              {formatPrice(dep.price)}
            </Text>
            <Text style={[
              styles.tableCell, 
              { 
                width: '20%',
                color: dep.status === 'Sold Out' ? '#E53C42' : 
                       dep.status === 'Available' ? '#10b981' : '#2E4D98',
                fontWeight: dep.status === 'Sold Out' ? 'bold' : 'normal'
              }
            ]}>
              {dep.status}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  // Function to render optional tours table (for both)
  const renderOptionalToursTable = () => {
    if (!tour?.optionalTours || tour.optionalTours.length === 0) {
      return null;
    }

    return (
      <View style={styles.tableContainer}>
        {/* Header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderCell, { width: '70%' }]}>Tour Name</Text>
          <Text style={[styles.tableHeaderCell, { width: '15%' }]}>Adult Price</Text>
          <Text style={[styles.tableHeaderCell, { width: '15%' }]}>Child Price</Text>
        </View>

        {/* Rows */}
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

  // Function to render EMI options table (for both)
  const renderEMITable = () => {
    if (!tour?.emiOptions?.options || tour.emiOptions.options.length === 0) {
      return null;
    }

    return (
      <View style={styles.tableContainer}>
        {/* Header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderCell, { width: '40%' }]}>Particulars</Text>
          <Text style={[styles.tableHeaderCell, { width: '20%' }]}>Loan Amount</Text>
          <Text style={[styles.tableHeaderCell, { width: '20%' }]}>Months</Text>
          <Text style={[styles.tableHeaderCell, { width: '20%' }]}>EMI</Text>
        </View>

        {/* Rows */}
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
          <Text style={styles.header}>{tour?.title || "Tour Package"}</Text>
          
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
          <Text style={styles.text}>Tour Type: {tourType} ({isGroupTour ? "Group Tour" : "Individual Tour"})</Text>
          
          {tour?.description && (
            <View style={[styles.infoBox, { marginTop: 20, width: '100%' }]}>
              <Text style={styles.title}>Tour Overview:</Text>
              <Text style={styles.text}>{tour.description}</Text>
            </View>
          )}
          
          {allImages.length > 1 && (
            <View style={styles.section}>
              <Text style={styles.title}>Tour Images ({allImages.length})</Text>
              <View style={styles.imageGallery}>
                {allImages.map((img, index) => (
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

      {/* Page 3: Departure Dates & Tour Cost */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.subHeader}>Departure Dates & Tour Cost</Text>
          
          {isGroupTour ? (
            <>
              {/* GROUP TOUR DEPARTURE INFO */}
              {selectedDeparture ? (
                <View style={styles.departureInfo}>
                  <Text style={styles.title}>Selected Departure Details:</Text>
                  <View style={styles.departureRowInfo}>
                    <Text style={styles.departureLabel}>Month:</Text>
                    <Text style={styles.departureValue}>{selectedCostMonth || selectedDeparture.month || "N/A"}</Text>
                  </View>
                  <View style={styles.departureRowInfo}>
                    <Text style={styles.departureLabel}>From Date:</Text>
                    <Text style={styles.departureValue}>{selectedDeparture.fromDay}, {selectedDeparture.fromDate}</Text>
                  </View>
                  <View style={styles.departureRowInfo}>
                    <Text style={styles.departureLabel}>To Date:</Text>
                    <Text style={styles.departureValue}>{selectedDeparture.toDay}, {selectedDeparture.toDate}</Text>
                  </View>
                  <View style={styles.departureRowInfo}>
                    <Text style={styles.departureLabel}>Status:</Text>
                    <Text style={[styles.departureValue, { 
                      color: selectedDeparture.status === 'Sold Out' ? '#E53C42' : 
                             selectedDeparture.status === 'Available' ? '#10b981' : '#2E4D98'
                    }]}>
                      {selectedDeparture.status || "Available"}
                    </Text>
                  </View>
                  <View style={styles.departureRowInfo}>
                    <Text style={styles.departureLabel}>Base Price:</Text>
                    <Text style={[styles.departureValue, { fontWeight: 'bold' }]}>
                      {formatPrice(selectedDeparture.price)}
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={styles.highlight}>
                  <Text style={styles.text}>No departure date selected</Text>
                </View>
              )}
              
              {renderGroupTourCostTable()}
              {renderAllDeparturesTable()}
            </>
          ) : (
            <>
              {/* INDIVIDUAL TOUR DEPARTURE INFO */}
              <View style={styles.section}>
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
                  </View>
                )}
              </View>
              
              {/* INDIVIDUAL TOUR COST TABLE */}
              <View style={styles.section}>
                <Text style={styles.title}>Individual Tour Cost:</Text>
                {renderIndividualTourCostTable()}
              </View>
            </>
          )}
          
          {/* Tour Cost Remarks (for both) */}
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

      {/* Page 4: Inclusions, Exclusions & Optional Tours */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.subHeader}>Cost Includes</Text>
          {tour?.inclusionExclusion?.inclusions?.map((inclusion, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={[styles.bullet, { color: '#2E4D98' }]}>✓</Text>
              <Text style={styles.listText}>{inclusion.item || inclusion}</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.subHeader}>Cost Excludes</Text>
          {tour?.inclusionExclusion?.exclusions?.map((exclusion, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={[styles.bullet, { color: '#E53C42' }]}>✗</Text>
              <Text style={styles.listText}>{exclusion.item || exclusion}</Text>
            </View>
          ))}
        </View>
        
        {/* Optional Tours (for both) */}
        {tour?.optionalTours && tour.optionalTours.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.subHeader}>Optional Tours</Text>
            {renderOptionalToursTable()}
          </View>
        )}
        
        {/* Optional Tour Remarks (for both) */}
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
        {/* FLIGHT SECTION */}
        {isGroupTour ? (
          // GROUP TOUR: Show flight table
          <View style={styles.section}>
            <Text style={styles.subHeader}>Flight Details</Text>
            {renderGroupAirlinesTable()}
            
            {tour?.airlines?.remarks && tour.airlines.remarks.length > 0 && (
              <View style={styles.section}>
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
        ) : (
          // INDIVIDUAL TOUR: Show flight descriptions
          renderIndividualFlightDescriptions()
        )}
        
        {/* HOTELS SECTION (for both) */}
        <View style={styles.section}>
          <Text style={styles.subHeader}>Hotel Details</Text>
          {renderHotelsTable()}
          
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

      {/* Page 6: Booking & Cancellation Policies */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.subHeader}>Booking Policy</Text>
          
          {tour?.booking?.items?.map((item, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={[styles.bullet, { color: '#2E4D98' }]}>{index + 1}.</Text>
              <Text style={styles.listText}>{item}</Text>
            </View>
          ))}
          
          {tour?.booking?.amountDetails && tour.booking.amountDetails.length > 0 && (
            <View style={[styles.section, { marginTop: 10 }]}>
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
          
          {tour?.cancellation?.policies?.map((policy, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={[styles.bullet, { color: '#E53C42' }]}>{index + 1}.</Text>
              <Text style={styles.listText}>{policy}</Text>
            </View>
          ))}
          
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
          {tour?.instructions?.map((instruction, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={[styles.bullet, { color: '#2E4D98' }]}>{index + 1}.</Text>
              <Text style={styles.listText}>{instruction.item || instruction}</Text>
            </View>
          ))}
        </View>
        
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} fixed />
      </Page>

      {/* Page 8: EMI Options & Additional Remarks */}
      <Page size="A4" style={styles.page}>
        {/* EMI Options (for both) */}
        {tour?.emiOptions?.options && tour.emiOptions.options.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.subHeader}>EMI Options</Text>
            {renderEMITable()}
          </View>
        )}
        
        {/* EMI Remarks (for both) */}
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
        
        {/* Additional Remarks (for both) */}
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

      {/* Page 9: Visa Information */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={[styles.header, { fontSize: 18, marginBottom: 20 }]}>
            Visa Information
          </Text>
          
          {/* Visa Tabs Overview */}
          <View style={{ marginBottom: 15 }}>
            <Text style={[styles.title, { marginBottom: 8 }]}>Available Visa Sections:</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5 }}>
              <View style={{ backgroundColor: activeVisaTab === 'tourist' ? '#A72703' : '#FFE797', padding: 5, borderRadius: 3 }}>
                <Text style={activeVisaTab === 'tourist' ? { color: 'white', fontSize: 8 } : { color: 'black', fontSize: 8 }}>Tourist Visa</Text>
              </View>
              <View style={{ backgroundColor: activeVisaTab === 'transit' ? '#A72703' : '#FFE797', padding: 5, borderRadius: 3 }}>
                <Text style={activeVisaTab === 'transit' ? { color: 'white', fontSize: 8 } : { color: 'black', fontSize: 8 }}>Transit Visa</Text>
              </View>
              <View style={{ backgroundColor: activeVisaTab === 'business' ? '#A72703' : '#FFE797', padding: 5, borderRadius: 3 }}>
                <Text style={activeVisaTab === 'business' ? { color: 'white', fontSize: 8 } : { color: 'black', fontSize: 8 }}>Business Visa</Text>
              </View>
              <View style={{ backgroundColor: activeVisaTab === 'forms' ? '#A72703' : '#FFE797', padding: 5, borderRadius: 3 }}>
                <Text style={activeVisaTab === 'forms' ? { color: 'white', fontSize: 8 } : { color: 'black', fontSize: 8 }}>Visa Forms</Text>
              </View>
              <View style={{ backgroundColor: activeVisaTab === 'photo' ? '#A72703' : '#FFE797', padding: 5, borderRadius: 3 }}>
                <Text style={activeVisaTab === 'photo' ? { color: 'white', fontSize: 8 } : { color: 'black', fontSize: 8 }}>Photo</Text>
              </View>
              <View style={{ backgroundColor: activeVisaTab === 'fees' ? '#A72703' : '#FFE797', padding: 5, borderRadius: 3 }}>
                <Text style={activeVisaTab === 'fees' ? { color: 'white', fontSize: 8 } : { color: 'black', fontSize: 8 }}>Visa Fees</Text>
              </View>
              <View style={{ backgroundColor: activeVisaTab === 'time' ? '#A72703' : '#FFE797', padding: 5, borderRadius: 3 }}>
                <Text style={activeVisaTab === 'time' ? { color: 'white', fontSize: 8 } : { color: 'black', fontSize: 8 }}>Submission & Pick Up</Text>
              </View>
            </View>
          </View>
          
          {/* Current Visa Section */}
          {renderVisaSection()}
          
          {/* Visa Fee Types Note */}
          {activeVisaTab === 'fees' && (
            <View style={styles.highlight}>
              <Text style={styles.text}>
                <Text style={{ fontWeight: 'bold' }}>Note:</Text> Currently showing {activeVisaFeeType === 'tourist' ? 'Tourist Visa' : 
                activeVisaFeeType === 'transit' ? 'Transit Visa' : 
                activeVisaFeeType === 'business' ? 'Business Visa' : 'Visa'} fees
              </Text>
            </View>
          )}
        </View>
        
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} fixed />
      </Page>
    </Document>
  );
};

export default TourPdfDocumentinternational;