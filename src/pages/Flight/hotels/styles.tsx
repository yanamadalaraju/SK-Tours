import { CSSProperties } from 'react';

export const styles = {
  cardStyle: {
    background: "#fff",
    margin: "20px auto",
    padding: "24px",
    borderRadius: "12px",
    maxWidth: "1200px",
    width: "100%",
    position: "relative",
    zIndex: 100,
  } as CSSProperties,

  tabStyle: {
    color: "#008cff",
    fontWeight: 600,
    marginBottom: 12,
    display: "flex",
    alignItems: "center",
    gap: "8px",
  } as CSSProperties,

  row: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
    flexWrap: "wrap",
    position: "relative",
  } as CSSProperties,

  boxStyle: {
    border: "1px solid #ddd",
    borderRadius: 8,
    padding: "12px",
    cursor: "pointer",
    minWidth: "160px",
    flex: 1,
    backgroundColor: "#fff",
    transition: "border-color 0.2s",
  } as CSSProperties,

  swapStyle: {
    cursor: "pointer",
    fontSize: 24,
    color: "#666",
    background: "#f5f5f5",
    borderRadius: "50%",
    padding: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as CSSProperties,

  searchBtn: {
    background: "#008cff",
    color: "#fff",
    border: "none",
    padding: "14px 32px",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.2s",
    minWidth: "140px",
  } as CSSProperties,

  resultsWrap: {
    maxWidth: 1200,
    margin: "20px auto",
    width: "100%",
    padding: "0 16px",
  } as CSSProperties,

  flightsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    marginTop: "20px",
  } as CSSProperties,

  flightCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    border: "1px solid #eee",
  } as CSSProperties,

  selectBtn: {
    background: "#008cff",
    color: "#fff",
    border: "none",
    padding: "12px 32px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
    marginTop: "10px",
  } as CSSProperties,

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  } as CSSProperties,

  calendarModal: {
    background: "#fff",
    padding: "24px",
    borderRadius: "12px",
    width: "350px",
    maxWidth: "90vw",
    boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
    zIndex: 1001,
  } as CSSProperties,

  calendarHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  } as CSSProperties,

  navButton: {
    background: "none",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    padding: "8px 12px",
    borderRadius: "4px",
    color: "#008cff",
    fontWeight: "bold",
  } as CSSProperties,

  weekDaysStyle: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "4px",
    marginBottom: "12px",
  } as CSSProperties,

  weekDayStyle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "12px",
    color: "#666",
    padding: "4px",
  } as CSSProperties,

  calendarGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "4px",
  } as CSSProperties,

  dayStyle: {
    padding: "12px 4px",
    border: "none",
    background: "none",
    cursor: "pointer",
    borderRadius: "4px",
    fontSize: "14px",
    minWidth: "36px",
  } as CSSProperties,

  emptyDayStyle: {
    padding: "12px 4px",
  } as CSSProperties,

  modal: {
    background: "#fff",
    padding: "24px",
    borderRadius: "12px",
    width: "360px",
    maxWidth: "90vw",
    boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
    zIndex: 1001,
  } as CSSProperties,

  closeBtn: {
    marginTop: "20px",
    width: "100%",
    padding: "12px",
    background: "#008cff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  } as CSSProperties,

  counterRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "16px 0",
    padding: "12px",
    borderBottom: "1px solid #eee",
  } as CSSProperties,

  counterButton: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    border: "2px solid #008cff",
    background: "#fff",
    color: "#008cff",
    fontSize: "18px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  } as CSSProperties,

  citySearchModal: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
    marginTop: "4px",
    zIndex: 1002,
    maxHeight: "400px",
    overflow: "hidden",
  } as CSSProperties,

  searchInput: {
    width: "100%",
    padding: "12px 16px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "14px",
    margin: "8px",
    boxSizing: "border-box" as const,
  } as CSSProperties,

  cityList: {
    maxHeight: "300px",
    overflowY: "auto" as const,
  } as CSSProperties,

  cityItem: {
    padding: "12px 16px",
    borderBottom: "1px solid #eee",
    cursor: "pointer",
    transition: "background-color 0.2s",
  } as CSSProperties,

  fareTypeBtn: {
    padding: "8px 16px",
    background: "#f5f5f5",
    border: "1px solid #ddd",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    color: "#666",
    transition: "all 0.2s",
  } as CSSProperties,

  activeFareTypeBtn: {
    background: "#008cff",
    color: "#fff",
    borderColor: "#008cff",
  } as CSSProperties,

  filtersSection: {
    background: "#f8f9fa",
    padding: "16px",
    borderRadius: "8px",
    marginBottom: "16px",
    border: "1px solid #e9ecef",
  } as CSSProperties,

  activeFilterBtn: {
    background: "#008cff",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s",
  } as CSSProperties,

  filterBtn: {
    background: "#fff",
    color: "#333",
    border: "1px solid #ddd",
    padding: "8px 16px",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s",
  } as CSSProperties,

  priceRangeStyle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px",
    background: "#fff",
    borderRadius: "8px",
    marginBottom: "16px",
    border: "1px solid #e9ecef",
  } as CSSProperties,

  classSelect: {
    width: "100%",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    fontSize: "14px",
    backgroundColor: "#fff",
    cursor: "pointer",
  } as CSSProperties,

  stepContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    zIndex: 2000,
    overflow: 'auto'
  } as CSSProperties,
};