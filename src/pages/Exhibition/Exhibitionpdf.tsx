// Exhibitionpdf.tsx - CORRECTED VERSION with proper free flow flight details

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

// Register fonts
Font.register({
  family: 'Roboto',
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

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Roboto',
    backgroundColor: '#FFFFFF',
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
    borderBottomWidth: 2,
    borderBottomColor: '#2E4D98',
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
  },
  tableContainer: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#000000',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#2E4D98',
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
  },
  tableHeaderCell: {
    padding: 6,
    fontSize: 9,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#FFFFFF',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
  },
  tableCell: {
    padding: 6,
    fontSize: 8,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#000000',
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
    color: '#333333',
    width: '65%',
    textAlign: 'right',
  },
  itineraryDay: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 4,
    overflow: 'hidden',
  },
  dayHeader: {
    backgroundColor: '#A72703',
    padding: 6,
  },
  dayHeaderText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 11,
  },
  dayContent: {
    backgroundColor: '#FFE797',
    padding: 8,
  },
  mealIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC',
  },
  mealItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  checkboxContainer: {
    width: 12,
    height: 12,
    borderWidth: 1,
    borderColor: '#000000',
    marginRight: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
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
  },
  imageContainer: {
    marginVertical: 15,
    alignItems: 'center',
  },
  tourImage: {
    width: 250,
    height: 150,
    borderRadius: 6,
  },
  note: {
    fontSize: 8,
    color: '#666666',
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
    color: '#999999',
  },
  overviewBox: {
    backgroundColor: '#E8F0FF',
    padding: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#2E4D98',
    marginBottom: 15,
  },
  // Free flow flight description box style
  flightDescriptionBox: {
    backgroundColor: '#f0f9ff',
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#bae6fd',
    marginBottom: 10,
  },
  flightSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    marginVertical: 8,
  },
});

const Exhibitionpdf = ({ 
  tour, 
  tourType, 
  isGroupTour, 
  selectedCostMonth, 
  selectedCostDate, 
  selectedDeparture,
  currentImageIndex,
  tourImages = []
}) => {
  
  const parseMeals = (mealsString) => {
    if (!mealsString) return { breakfast: false, lunch: false, dinner: false };
    const meals = mealsString.toLowerCase();
    return {
      breakfast: meals.includes('breakfast') || meals.includes('b'),
      lunch: meals.includes('lunch') || meals.includes('l'),
      dinner: meals.includes('dinner') || meals.includes('d')
    };
  };

  const formatPrice = (price) => {
    if (!price || price === 'N/A' || price === 'NA') return 'N/A';
    if (typeof price === 'string' && price.includes('₹')) return price;
    const numPrice = typeof price === 'string' ? parseFloat(price.replace(/[^0-9.]/g, '')) : price;
    if (isNaN(numPrice)) return String(price);
    return `₹${numPrice.toLocaleString('en-IN')}`;
  };

  const allImages = tourImages && Array.isArray(tourImages) ? tourImages : [];
  const mainImage = allImages.length > 0 ? allImages[0] : null;

  const renderFlightDetailsFreeFlow = () => {
    // Check if we have flight data
    const hasFlights = tour?.airlines?.tableData && tour.airlines.tableData.length > 0;
    
    if (!hasFlights) {
      return (
        <View style={styles.highlight}>
          <Text style={styles.text}>No flight information available</Text>
        </View>
      );
    }

    return (
      <View style={styles.section}>
        {tour.airlines.tableData.map((flight, index) => {
          const hasDescription = flight.description && flight.description.trim() !== '';
          
          return (
            <View key={index}>
              <View style={styles.flightDescriptionBox}>
                {hasDescription ? (
                  // Use the description field directly - this is the free flow text from the API
                  <Text style={styles.text}>
                    {flight.description}
                  </Text>
                ) : (
                  // Fallback: Format individual fields if no description exists
                  <View>
                    <Text style={[styles.text, { fontWeight: 'bold', marginBottom: 4 }]}>
                      Flight {index + 1}: {flight.airline || 'N/A'} {flight.flightNo ? `(${flight.flightNo})` : ''}
                    </Text>
                    <Text style={styles.text}>
                      From: {flight.from || 'N/A'} → To: {flight.to || 'N/A'}
                    </Text>
                    <Text style={styles.text}>
                      Departure: {flight.depDate || 'N/A'} at {flight.depTime || 'N/A'}
                    </Text>
                    <Text style={styles.text}>
                      Arrival: {flight.arrDate || 'N/A'} at {flight.arrTime || 'N/A'}
                    </Text>
                    {flight.via && <Text style={styles.text}>Via: {flight.via}</Text>}
                  </View>
                )}
              </View>
              {index < tour.airlines.tableData.length - 1 && <View style={styles.flightSeparator} />}
            </View>
          );
        })}
      </View>
    );
  };

  // Group Tour Cost Table
  const renderGroupTourCostTable = () => {
    if (!isGroupTour || !selectedDeparture) {
      return (
        <View style={styles.highlight}>
          <Text style={styles.text}>Please select a departure date from the website to view tour cost details</Text>
        </View>
      );
    }

    return (
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderCell, { width: '33%' }]}>Particulars - Tour Cost</Text>
          <Text style={[styles.tableHeaderCell, { width: '22%' }]}>Standard</Text>
          <Text style={[styles.tableHeaderCell, { width: '22%' }]}>Deluxe</Text>
          <Text style={[styles.tableHeaderCell, { width: '23%' }]}>Luxury</Text>
        </View>

        {[
          { particular: "Per pax on Twin Basis", star3: selectedDeparture.threeStar?.twin, star4: selectedDeparture.fourStar?.twin, star5: selectedDeparture.fiveStar?.twin },
          { particular: "Per pax on Triple Basis", star3: selectedDeparture.threeStar?.triple, star4: selectedDeparture.fourStar?.triple, star5: selectedDeparture.fiveStar?.triple },
          { particular: "Per pax Single Occupancy", star3: selectedDeparture.threeStar?.single, star4: selectedDeparture.fourStar?.single, star5: selectedDeparture.fiveStar?.single },
        ].map((row, i) => (
          <View key={i} style={[styles.tableRow, { backgroundColor: i % 2 === 0 ? '#EEF1F7' : '#FFFFFF' }]}>
            <Text style={[styles.tableCell, { width: '33%', textAlign: 'left', paddingLeft: 8 }]}>{row.particular}</Text>
            <Text style={[styles.tableCell, { width: '22%' }]}>{formatPrice(row.star3)}</Text>
            <Text style={[styles.tableCell, { width: '22%', color: '#10b981', fontWeight: 'bold' }]}>{formatPrice(row.star4)}</Text>
            <Text style={[styles.tableCell, { width: '23%' }]}>{formatPrice(row.star5)}</Text>
          </View>
        ))}
      </View>
    );
  };

  // Individual Tour Cost Table
  const renderIndividualTourCostTable = () => {
    if (isGroupTour) return null;
    
    if (!tour?.tourCost?.tableData || tour.tourCost.tableData.length === 0) {
      return (
        <View style={styles.highlight}>
          <Text style={styles.text}>No cost information available</Text>
        </View>
      );
    }

    return (
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderCell, { width: '16%' }]}>Passenger</Text>
          <Text style={[styles.tableHeaderCell, { width: '16%' }]}>Standard</Text>
          <Text style={[styles.tableHeaderCell, { width: '16%' }]}>Deluxe</Text>
          <Text style={[styles.tableHeaderCell, { width: '16%' }]}>Executive</Text>
          <Text style={[styles.tableHeaderCell, { width: '18%' }]}>Child With Bed</Text>
          <Text style={[styles.tableHeaderCell, { width: '18%' }]}>Child No Bed</Text>
        </View>

        {tour.tourCost.tableData.map((row, index) => (
          <View key={index} style={[styles.tableRow, { backgroundColor: index % 2 === 0 ? '#FFEBEE' : '#FFEBEE80' }]}>
            <Text style={[styles.tableCell, { width: '16%' }]}>{row.passenger}</Text>
            <Text style={[styles.tableCell, { width: '16%' }]}>{formatPrice(row.standard)}</Text>
            <Text style={[styles.tableCell, { width: '16%', color: '#10b981', fontWeight: 'bold' }]}>{formatPrice(row.deluxe)}</Text>
            <Text style={[styles.tableCell, { width: '16%' }]}>{formatPrice(row.executive)}</Text>
            <Text style={[styles.tableCell, { width: '18%' }]}>{formatPrice(row.childWithBed)}</Text>
            <Text style={[styles.tableCell, { width: '18%' }]}>{formatPrice(row.childNoBed)}</Text>
          </View>
        ))}
      </View>
    );
  };

  // Hotels Table
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
          <Text style={[styles.tableHeaderCell, { width: '20%' }]}>City</Text>
          <Text style={[styles.tableHeaderCell, { width: '15%' }]}>Nights</Text>
          <Text style={[styles.tableHeaderCell, { width: '21%' }]}>Standard</Text>
          <Text style={[styles.tableHeaderCell, { width: '21%' }]}>Deluxe</Text>
          <Text style={[styles.tableHeaderCell, { width: '23%' }]}>Executive</Text>
        </View>

        {tour.hotels.tableData.map((hotel, index) => (
          <View key={index} style={[styles.tableRow, { backgroundColor: index % 2 === 0 ? '#FFEBEE' : '#FFEBEE80' }]}>
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

  // All Departures Table for Group Tours
  const renderAllDeparturesTable = () => {
    if (!isGroupTour || !tour?.departures?.data || tour.departures.data.length === 0) {
      return null;
    }

    return (
      <View style={[styles.tableContainer, { marginTop: 15 }]}>
        <Text style={[styles.title, { marginBottom: 5 }]}>All Available Departure Dates:</Text>
        
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderCell, { width: '20%' }]}>Month</Text>
          <Text style={[styles.tableHeaderCell, { width: '20%' }]}>From Date</Text>
          <Text style={[styles.tableHeaderCell, { width: '20%' }]}>To Date</Text>
          <Text style={[styles.tableHeaderCell, { width: '20%' }]}>Base Price</Text>
          <Text style={[styles.tableHeaderCell, { width: '20%' }]}>Status</Text>
        </View>

        {tour.departures.data.slice(0, 10).map((dep, index) => (
          <View key={index} style={[styles.tableRow, { backgroundColor: index % 2 === 0 ? '#EEF1F7' : '#FFFFFF' }]}>
            <Text style={[styles.tableCell, { width: '20%' }]}>{dep.month}</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>{dep.fromDate}</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>{dep.toDate}</Text>
            <Text style={[styles.tableCell, { width: '20%', fontWeight: 'bold' }]}>{formatPrice(dep.price)}</Text>
            <Text style={[styles.tableCell, { width: '20%', color: dep.status === 'Sold Out' ? '#E53C42' : '#10b981' }]}>{dep.status}</Text>
          </View>
        ))}
      </View>
    );
  };

  // Optional Tours Table
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
          <View key={index} style={[styles.tableRow, { backgroundColor: index % 2 === 0 ? '#FFEBEE' : '#FFEBEE80' }]}>
            <Text style={[styles.tableCell, { width: '70%', textAlign: 'left', paddingLeft: 8 }]}>{optTour.tourName}</Text>
            <Text style={[styles.tableCell, { width: '15%' }]}>{formatPrice(optTour.adultPrice)}</Text>
            <Text style={[styles.tableCell, { width: '15%' }]}>{formatPrice(optTour.childPrice)}</Text>
          </View>
        ))}
      </View>
    );
  };

  // EMI Options Table
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
          <View key={index} style={[styles.tableRow, { backgroundColor: index % 2 === 0 ? '#FFEBEE' : '#FFEBEE80' }]}>
            <Text style={[styles.tableCell, { width: '40%', textAlign: 'left', paddingLeft: 8 }]}>{emi.particulars}</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>{formatPrice(emi.loanAmount)}</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>{emi.months}</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>{formatPrice(emi.emi)}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <Document>
      {/* PAGE 1: Cover & Exhibition Overview */}
      <Page size="A4" style={styles.page}>
        <View style={{ flex: 1 }}>
          <Text style={styles.header}>{tour?.title || "Exhibition Tour Package"}</Text>
          
          {mainImage && (
            <View style={styles.imageContainer}>
              <Image src={mainImage} style={styles.tourImage} />
            </View>
          )}
          
          <View style={{ marginTop: 20, marginBottom: 20 }}>
            <Text style={styles.text}>Tour Code: {tour?.code || "N/A"}</Text>
            <Text style={styles.text}>Duration: {tour?.duration || "N/A"}</Text>
            <Text style={styles.boldText}>Base Price: {tour?.price || "N/A"}</Text>
            <Text style={styles.text}>EMI: {tour?.emi || "Available on request"}</Text>
            <Text style={styles.text}>Tour Type: {isGroupTour ? "Group Tour" : "Individual Tour"}</Text>
          </View>
          
          {/* Exhibition Overview Section */}
         
          
          <View style={{ marginTop: 30 }}>
            <Text style={styles.note}>Generated on: {new Date().toLocaleDateString()}</Text>
          </View>
        </View>
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
      </Page>

      {/* PAGE 2: Itinerary */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.subHeader}>Tour Itinerary</Text>
         <Text style={styles.subHeader}>Exhibition Overview</Text>
          <View style={styles.overviewBox}>
            <Text style={styles.text}>{tour?.overview || "Tour overview not available for this exhibition."}</Text>
          </View>
        {tour?.itinerary?.map((day, index) => {
          const meals = parseMeals(day?.meals);
          return (
            <View key={index} style={styles.itineraryDay}>
              <View style={styles.dayHeader}>
                <Text style={styles.dayHeaderText}>{day.day || `Day ${index + 1}`} - {day.title || "Day Details"}</Text>
              </View>
              <View style={styles.dayContent}>
                <Text style={styles.text}>{day.description || ""}</Text>
                <View style={styles.mealIndicator}>
                  <View style={styles.mealItem}>
                    <View style={styles.checkboxContainer}>
                      {meals.breakfast ? <View style={styles.checkedBox} /> : <View style={styles.unCheckedBox} />}
                    </View>
                    <Text style={styles.mealText}>Breakfast</Text>
                  </View>
                  <View style={styles.mealItem}>
                    <View style={styles.checkboxContainer}>
                      {meals.lunch ? <View style={styles.checkedBox} /> : <View style={styles.unCheckedBox} />}
                    </View>
                    <Text style={styles.mealText}>Lunch</Text>
                  </View>
                  <View style={styles.mealItem}>
                    <View style={styles.checkboxContainer}>
                      {meals.dinner ? <View style={styles.checkedBox} /> : <View style={styles.unCheckedBox} />}
                    </View>
                    <Text style={styles.mealText}>Dinner</Text>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
        
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
      </Page>

      {/* PAGE 3: Departure Dates */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.subHeader}>Departure Dates</Text>
        
        {isGroupTour ? (
          <>
            {selectedDeparture ? (
              <View style={styles.departureInfo}>
                <Text style={styles.title}>Selected Departure:</Text>
                <View style={styles.departureRowInfo}>
                  <Text style={styles.departureLabel}>Month:</Text>
                  <Text style={styles.departureValue}>{selectedCostMonth || selectedDeparture.month}</Text>
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
                  <Text style={[styles.departureValue, { color: selectedDeparture.status === 'Sold Out' ? '#E53C42' : '#10b981' }]}>
                    {selectedDeparture.status || 'Available'}
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.highlight}>
                <Text style={styles.text}>Please select a departure date from the website to view details</Text>
              </View>
            )}
            
            {renderAllDeparturesTable()}
          </>
        ) : (
          <View style={styles.highlight}>
            <Text style={styles.text}>Flexible departure dates available. Contact us for more information.</Text>
            {tour?.departures?.descriptions && tour.departures.descriptions.length > 0 && (
              <View style={{ marginTop: 10 }}>
                {tour.departures.descriptions.map((desc, index) => (
                  <Text key={index} style={[styles.text, { marginTop: 5 }]}>• {desc}</Text>
                ))}
              </View>
            )}
          </View>
        )}
        
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
      </Page>

      {/* PAGE 4: Tour Cost */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.subHeader}>Tour Cost</Text>
        
        {isGroupTour ? renderGroupTourCostTable() : renderIndividualTourCostTable()}
        
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
        
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
      </Page>

      {/* PAGE 5: Inclusions & Exclusions */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.subHeader}>Cost Includes</Text>
        {tour?.inclusionExclusion?.inclusions?.length > 0 ? (
          tour.inclusionExclusion.inclusions.map((inclusion, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={[styles.bullet, { color: '#2E4D98' }]}>✓</Text>
              <Text style={styles.listText}>{inclusion.item || inclusion}</Text>
            </View>
          ))
        ) : (
          <View style={styles.highlight}>
            <Text style={styles.text}>No inclusions listed</Text>
          </View>
        )}
        
        <View style={{ marginTop: 20 }}>
          <Text style={styles.subHeader}>Cost Excludes</Text>
          {tour?.inclusionExclusion?.exclusions?.length > 0 ? (
            tour.inclusionExclusion.exclusions.map((exclusion, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={[styles.bullet, { color: '#E53C42' }]}>✗</Text>
                <Text style={styles.listText}>{exclusion.item || exclusion}</Text>
              </View>
            ))
          ) : (
            <View style={styles.highlight}>
              <Text style={styles.text}>No exclusions listed</Text>
            </View>
          )}
        </View>
        
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
      </Page>

      {/* PAGE 6: Flight & Hotels - FREE FLOW FLIGHT DETAILS */}
      <Page size="A4" style={styles.page}>
        {/* FLIGHT SECTION - Free flow text (matches webpage) */}
        <View style={styles.section}>
          <Text style={styles.subHeader}>Flight Details</Text>
          {renderFlightDetailsFreeFlow()}
          
          {tour?.airlines?.remarks && tour.airlines.remarks.length > 0 && (
            <View style={[styles.section, { marginTop: 10 }]}>
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
        
        {/* HOTELS SECTION (keeps table format) */}
        <View style={{ marginTop: 20 }}>
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
        
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
      </Page>

      {/* PAGE 7: Optional Tours & EMI */}
      <Page size="A4" style={styles.page}>
        {tour?.optionalTours && tour.optionalTours.length > 0 && (
          <>
            <Text style={styles.subHeader}>Optional Tours</Text>
            {renderOptionalToursTable()}
            
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
          </>
        )}
        
        {tour?.emiOptions?.options && tour.emiOptions.options.length > 0 && (
          <View style={{ marginTop: 20 }}>
            <Text style={styles.subHeader}>EMI Options</Text>
            {renderEMITable()}
            
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
          </View>
        )}
        
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
      </Page>

      {/* PAGE 8: Booking & Cancellation */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.subHeader}>Booking Policy</Text>
        {tour?.booking?.items?.map((item, index) => (
          <View key={index} style={styles.listItem}>
            <Text style={[styles.bullet, { color: '#2E4D98' }]}>{index + 1}.</Text>
            <Text style={styles.listText}>{item}</Text>
          </View>
        ))}
        
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
        
        <View style={{ marginTop: 20 }}>
          <Text style={styles.subHeader}>Cancellation Policy</Text>
          {tour?.cancellation?.policies?.map((policy, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={[styles.bullet, { color: '#E53C42' }]}>{index + 1}.</Text>
              <Text style={styles.listText}>{policy}</Text>
            </View>
          ))}
          
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
        
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
      </Page>

      {/* PAGE 9: Instructions */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.subHeader}>Important Instructions</Text>
        
        {tour?.instructions?.length > 0 ? (
          tour.instructions.map((instruction, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={[styles.bullet, { color: '#2E4D98' }]}>{index + 1}.</Text>
              <Text style={styles.listText}>{instruction.item || instruction}</Text>
            </View>
          ))
        ) : (
          <View style={styles.highlight}>
            <Text style={styles.text}>No specific instructions available</Text>
          </View>
        )}
        
        <View style={{ marginTop: 40 }}>
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
        
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
      </Page>
    </Document>
  );
};

export default Exhibitionpdf;