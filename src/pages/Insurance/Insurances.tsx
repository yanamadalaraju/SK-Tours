import { useState } from "react";
import axios from 'axios';
import { BASE_URL } from "@/ApiUrls";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { CheckCircle, AlertCircle } from 'lucide-react';
type Sex = "Male" | "Female" | "Others";
type SumInsured = "50,000" | "1,00,000" | "3,00,000" | "5,00,000" | "10,00,000";

interface FamilyMember {
  id: number;
  name: string;
  ppNo: string;
  doi: string;
  doe: string;
  poi: string;
  dob: string;
  nominee: string;
  relation: string;
}

interface FormState {
  firstName: string;
  middleName: string;
  lastName: string;
  sex: Sex | "";
  dateOfBirth: string;
  age: string;
  cellNo: string;
  address: string;
  landmark: string;
  city: string;
  pincode: string;
  state: string;
  country: string;
  passportNumber: string;
  dateOfIssue: string;
  dateOfExpiry: string;
  placeOfIssue: string;
  purposeOfTravel: string;
  anyExistingIllness: string;
  includeUSACanada: boolean;
  excludeUSACanada: boolean;
  dateOfTravel: string;
  returnDate: string;
  noOfDays: string;
  countriesToVisit: string;
  sumInsured: SumInsured | "";
  nomineeName: string;
  nomineeRelationship: string;
  nomineeAge: string;
  nomineeMobile: string;
  declaration: boolean;
}

const LABEL = "bg-[#5c3a1e] text-[#f5e6c8] font-semibold text-sm px-3 py-2 whitespace-nowrap";
const INPUT = "bg-[#f5e6c8] border border-[#c8a97e] text-[#3a2000] text-sm px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#8b5e2e] placeholder-[#b09060]";

export default function InsuranceProposalForm() {
  const [form, setForm] = useState<FormState>({
    firstName: "", middleName: "", lastName: "",
    sex: "", dateOfBirth: "", age: "", cellNo: "",
    address: "", landmark: "", city: "", pincode: "", state: "", country: "",
    passportNumber: "", dateOfIssue: "", dateOfExpiry: "", placeOfIssue: "",
    purposeOfTravel: "", anyExistingIllness: "",
    includeUSACanada: false, excludeUSACanada: false,
    dateOfTravel: "", returnDate: "", noOfDays: "", countriesToVisit: "",
    sumInsured: "",
    nomineeName: "", nomineeRelationship: "", nomineeAge: "50", nomineeMobile: "",
    declaration: false,
  });

  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });



  const setSex = (sex: Sex) => setForm(f => ({ ...f, sex }));
  const setSumInsured = (val: SumInsured) => setForm(f => ({ ...f, sumInsured: val }));

  // Helper function to calculate age from date of birth
  const calculateAge = (dob: string): number => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const set = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
  let value: string | boolean = e.target.type === "checkbox" ? e.target.checked : e.target.value;
  
  // Auto-calculate age when date of birth changes
  if (field === "dateOfBirth" && value) {
    const age = calculateAge(value as string);
    setForm(f => ({ ...f, [field]: value, age: age.toString() }));
  } 
  // REMOVE or COMMENT OUT this entire else-if block for auto-calculating days
  /*
  else if ((field === "dateOfTravel" || field === "returnDate") && value) {
    setForm(f => ({ ...f, [field]: value }));
    if (form.dateOfTravel && form.returnDate) {
      const days = calculateDays(form.dateOfTravel, form.returnDate);
      if (days > 0) {
        setForm(prev => ({ ...prev, noOfDays: days.toString() }));
      }
    }
  }
  */
  else {
    setForm(f => ({ ...f, [field]: value }));
  }
};
  // Helper function to calculate number of days between two dates
  const calculateDays = (startDate: string, endDate: string): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Validation function for main fields
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Personal Information
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.sex) newErrors.sex = "Sex is required";
    if (!form.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    if (!form.cellNo.trim()) newErrors.cellNo = "Cell number is required";
    else if (!/^\d{10}$/.test(form.cellNo.replace(/\D/g, ''))) newErrors.cellNo = "Valid 10-digit mobile number is required";

    // Address Information
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.pincode.trim()) newErrors.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(form.pincode)) newErrors.pincode = "Valid 6-digit pincode is required";
    if (!form.state.trim()) newErrors.state = "State is required";
    if (!form.country.trim()) newErrors.country = "Country is required";

    // Passport Information
    if (!form.passportNumber.trim()) newErrors.passportNumber = "Passport number is required";
    if (!form.dateOfIssue) newErrors.dateOfIssue = "Date of issue is required";
    if (!form.dateOfExpiry) newErrors.dateOfExpiry = "Date of expiry is required";
    
    // Validate expiry date is after issue date
    if (form.dateOfIssue && form.dateOfExpiry && new Date(form.dateOfExpiry) <= new Date(form.dateOfIssue)) {
      newErrors.dateOfExpiry = "Expiry date must be after issue date";
    }

    if (!form.placeOfIssue.trim()) newErrors.placeOfIssue = "Place of issue is required";

    // Travel Information
    if (!form.purposeOfTravel.trim()) newErrors.purposeOfTravel = "Purpose of travel is required";
    if (!form.dateOfTravel) newErrors.dateOfTravel = "Date of travel is required";
    if (!form.returnDate) newErrors.returnDate = "Return date is required";
    
    // Validate return date is after travel date
    if (form.dateOfTravel && form.returnDate && new Date(form.returnDate) <= new Date(form.dateOfTravel)) {
      newErrors.returnDate = "Return date must be after travel date";
    }

    if (!form.countriesToVisit.trim()) newErrors.countriesToVisit = "Countries to visit is required";
    if (!form.sumInsured) newErrors.sumInsured = "Sum insured is required";

    // Nominee Information
    if (!form.nomineeName.trim()) newErrors.nomineeName = "Nominee name is required";
    if (!form.nomineeRelationship.trim()) newErrors.nomineeRelationship = "Nominee relationship is required";
    if (!form.nomineeMobile.trim()) newErrors.nomineeMobile = "Nominee mobile number is required";
    else if (!/^\d{10}$/.test(form.nomineeMobile.replace(/\D/g, ''))) newErrors.nomineeMobile = "Valid 10-digit mobile number is required";

    // Declaration
    if (!form.declaration) newErrors.declaration = "You must accept the declaration";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addMember = () => {
    const newMember: FamilyMember = {
      id: Date.now(),
      name: "",
      ppNo: "",
      doi: "",
      doe: "",
      poi: "",
      dob: "",
      nominee: "",
      relation: "",
    };
    setFamilyMembers(prev => [...prev, newMember]);
  };

  const updateMember = (id: number, field: keyof Omit<FamilyMember, "id">, value: string) => {
    setFamilyMembers(prev =>
      prev.map(member =>
        member.id === id ? { ...member, [field]: value } : member
      )
    );
  };

  const removeMember = (id: number) => {
    setFamilyMembers(prev => prev.filter(member => member.id !== id));
  };

  const sumOptions: SumInsured[] = ["50,000", "1,00,000", "3,00,000", "5,00,000", "10,00,000"];

  // POST API Function
  const submitForm = async () => {
    if (!validateForm()) {
      setSubmitStatus({ type: 'error', message: 'Please fill in all required fields correctly' });
      setTimeout(() => setSubmitStatus({ type: null, message: '' }), 3000);
      return;
    }

    setLoading(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await axios.post(`${BASE_URL}/insurance`, {
        form: form,
        familyMembers: familyMembers
      });
      
      if (response.data.success) {
        setSubmitStatus({ 
          type: 'success', 
          message: `✅ Insurance form created successfully!\nInsurance ID: ${response.data.insurance_id}` 
        });
        resetForm();
      } else {
        setSubmitStatus({ type: 'error', message: 'Failed to submit form' });
      }
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setSubmitStatus({ 
        type: 'error', 
        message: `❌ Error: ${error.response?.data?.message || error.message || 'Failed to submit form'}` 
      });
    } finally {
      setLoading(false);
      setTimeout(() => setSubmitStatus({ type: null, message: '' }), 5000);
    }
  };

  const resetForm = () => {
    setForm({
      firstName: "", middleName: "", lastName: "",
      sex: "", dateOfBirth: "", age: "50", cellNo: "",
      address: "", landmark: "", city: "", pincode: "", state: "", country: "",
      passportNumber: "", dateOfIssue: "", dateOfExpiry: "", placeOfIssue: "",
      purposeOfTravel: "", anyExistingIllness: "",
      includeUSACanada: false, excludeUSACanada: false,
      dateOfTravel: "", returnDate: "", noOfDays: "", countriesToVisit: "",
      sumInsured: "",
      nomineeName: "", nomineeRelationship: "", nomineeAge: "50", nomineeMobile: "",
      declaration: false,
    });
    setFamilyMembers([]);
    setErrors({});
  };

  return (
    <div>
      <Header />
      <div style={{ backgroundColor: "#1a2744", padding: "18px 0", textAlign: "center" }}>
        <h1 style={{ color: "#fff", fontSize: "24px", fontWeight: "bold", margin: 0, letterSpacing: "1px" }}>
          Insurance Proposal Form
        </h1>
      </div>

 {/* Success Message Toast */}
{submitStatus.type === 'success' && (
  <div className="fixed top-20 right-4 md:right-8 z-50 animate-slide-in max-w-[90%] sm:max-w-md">
    <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg p-4 md:p-6 shadow-2xl border border-emerald-400">
      <div className="flex items-start gap-3 md:gap-4">
        <CheckCircle className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0 mt-1" />
        <div className="flex-1">
          <h3 className="text-base md:text-lg font-bold mb-1">✓ Application Submitted Successfully!</h3>
          <p className="text-sm opacity-90 mb-2">{submitStatus.message}</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full animate-progress"></div>
            </div>
          </div>
        </div>
        <button 
          onClick={() => setSubmitStatus({ type: null, message: '' })}
          className="text-white/80 hover:text-white transition"
        >
          ✕
        </button>
      </div>
    </div>
  </div>
)}

{/* Error Message Toast */}
{submitStatus.type === 'error' && (
  <div className="fixed top-20 right-4 md:right-8 z-50 animate-slide-in max-w-[90%] sm:max-w-md">
    <div className="bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-lg p-4 md:p-6 shadow-2xl border border-red-400">
      <div className="flex items-center gap-3 md:gap-4">
        <AlertCircle className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0" />
        <div>
          <h3 className="text-base md:text-lg font-bold mb-1">Action Required</h3>
          <p className="text-sm opacity-90">{submitStatus.message}</p>
          <p className="text-xs opacity-75 mt-1">Please check the form and try again.</p>
        </div>
      </div>
    </div>
  </div>
)}

      {/* Main Form */}
      <div style={{ backgroundColor: "#fbeedf", margin: "24px", padding: "24px", border: "1px solid #c8a97e" }}>

        {/* Row 1: Applicant Name */}
        <div style={{ marginBottom: "8px" }}>
          <div style={{ display: "flex", gap: "0" }}>
            <div className={LABEL} style={{ backgroundColor: "#5c3a1e", color: "#f5e6c8", fontWeight: "bold", fontSize: "13px", padding: "10px 14px", minWidth: "140px" }}>
              Applicants Name
            </div>
            <input className={INPUT} placeholder="First name" value={form.firstName} onChange={set("firstName")} style={{ flex: 1, borderLeft: "none" }} />
            <div className={LABEL} style={{ backgroundColor: "#5c3a1e", color: "#f5e6c8", fontWeight: "bold", fontSize: "13px", padding: "10px 14px", minWidth: "120px", borderLeft: "2px solid #f5e6c8" }}>
              Middle Name
            </div>
            <input className={INPUT} value={form.middleName} onChange={set("middleName")} style={{ flex: 1, borderLeft: "none" }} />
            <div className={LABEL} style={{ backgroundColor: "#5c3a1e", color: "#f5e6c8", fontWeight: "bold", fontSize: "13px", padding: "10px 14px", minWidth: "90px", borderLeft: "2px solid #f5e6c8" }}>
              Last Name
            </div>
            <input className={INPUT} placeholder="Surname" value={form.lastName} onChange={set("lastName")} style={{ flex: 1, borderLeft: "none" }} />
          </div>
          {errors.firstName && <div style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px", marginLeft: "150px" }}>{errors.firstName}</div>}
          {errors.lastName && <div style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px", marginLeft: "150px" }}>{errors.lastName}</div>}
        </div>

        {/* Row 2: Sex, DOB, Age, Cell */}
        <div style={{ marginBottom: "8px" }}>
          <div style={{ display: "flex", gap: "0", alignItems: "stretch" }}>
            <div style={{ backgroundColor: "#5c3a1e", color: "#f5e6c8", fontWeight: "bold", fontSize: "13px", padding: "10px 14px", display: "flex", alignItems: "center" }}>Sex</div>
            <div style={{ backgroundColor: "#f5e6c8", border: "1px solid #c8a97e", borderLeft: "none", display: "flex", alignItems: "center", gap: "10px", padding: "6px 12px" }}>
              {(["Male", "Female", "Others"] as Sex[]).map(s => (
                <label key={s} style={{ display: "flex", alignItems: "center", gap: "4px", cursor: "pointer", fontSize: "13px", color: "#3a2000" }}>
                  <input type="checkbox" checked={form.sex === s} onChange={() => setSex(s)} style={{ width: "14px", height: "14px" }} />
                  {s}
                </label>
              ))}
            </div>
            <div style={{ backgroundColor: "#5c3a1e", color: "#f5e6c8", fontWeight: "bold", fontSize: "13px", padding: "10px 14px", display: "flex", alignItems: "center", borderLeft: "2px solid #f5e6c8" }}>Date of Birth</div>
            <input type="date" className={INPUT} value={form.dateOfBirth} onChange={set("dateOfBirth")} style={{ flex: 1, borderLeft: "none" }} />
            <div style={{ backgroundColor: "#5c3a1e", color: "#f5e6c8", fontWeight: "bold", fontSize: "13px", padding: "10px 14px", display: "flex", alignItems: "center", borderLeft: "2px solid #f5e6c8" }}>Age</div>
            <input className={INPUT} value={form.age} readOnly style={{ width: "60px", borderLeft: "none", backgroundColor: "#e8dcc8" }} />
            <div style={{ backgroundColor: "#5c3a1e", color: "#f5e6c8", fontWeight: "bold", fontSize: "13px", padding: "10px 14px", display: "flex", alignItems: "center", borderLeft: "2px solid #f5e6c8" }}>Cell No</div>
            <input className={INPUT} placeholder="10-digit number" value={form.cellNo} onChange={set("cellNo")} style={{ flex: 1, borderLeft: "none" }} />
          </div>
          {errors.sex && <div style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px" }}>{errors.sex}</div>}
          {errors.dateOfBirth && <div style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px" }}>{errors.dateOfBirth}</div>}
          {errors.cellNo && <div style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px" }}>{errors.cellNo}</div>}
        </div>

        {/* Row 3: Address, Landmark */}
        <div style={{ marginBottom: "8px" }}>
          <div style={{ display: "flex", gap: "0" }}>
            <div style={{ backgroundColor: "#5c3a1e", color: "#f5e6c8", fontWeight: "bold", fontSize: "13px", padding: "10px 14px", display: "flex", alignItems: "center", minWidth: "90px" }}>Address</div>
            <input className={INPUT} placeholder="Address" value={form.address} onChange={set("address")} style={{ flex: 2, borderLeft: "none" }} />
            <div style={{ backgroundColor: "#5c3a1e", color: "#f5e6c8", fontWeight: "bold", fontSize: "13px", padding: "10px 14px", display: "flex", alignItems: "center", borderLeft: "2px solid #f5e6c8" }}>Landmark</div>
            <input className={INPUT} value={form.landmark} onChange={set("landmark")} style={{ flex: 1, borderLeft: "none" }} />
          </div>
          {errors.address && <div style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px" }}>{errors.address}</div>}
        </div>

        {/* Row 4: City, Pincode, State, Country */}
        <div style={{ marginBottom: "8px" }}>
          <div style={{ display: "flex", gap: "0" }}>
            <div style={{ backgroundColor: "#5c3a1e", color: "#f5e6c8", fontWeight: "bold", fontSize: "13px", padding: "10px 14px", display: "flex", alignItems: "center" }}>City</div>
            <input className={INPUT} placeholder="City" value={form.city} onChange={set("city")} style={{ flex: 1, borderLeft: "none" }} />
            <div style={{ backgroundColor: "#5c3a1e", color: "#f5e6c8", fontWeight: "bold", fontSize: "13px", padding: "10px 14px", display: "flex", alignItems: "center", borderLeft: "2px solid #f5e6c8" }}>Pincode</div>
            <input className={INPUT} placeholder="6-digit pincode" value={form.pincode} onChange={set("pincode")} style={{ flex: 1, borderLeft: "none" }} />
            <div style={{ backgroundColor: "#5c3a1e", color: "#f5e6c8", fontWeight: "bold", fontSize: "13px", padding: "10px 14px", display: "flex", alignItems: "center", borderLeft: "2px solid #f5e6c8" }}>State</div>
            <input className={INPUT} placeholder="State" value={form.state} onChange={set("state")} style={{ flex: 1, borderLeft: "none" }} />
            <div style={{ backgroundColor: "#5c3a1e", color: "#f5e6c8", fontWeight: "bold", fontSize: "13px", padding: "10px 14px", display: "flex", alignItems: "center", borderLeft: "2px solid #f5e6c8" }}>Country</div>
            <input className={INPUT} value={form.country} onChange={set("country")} style={{ flex: 1, borderLeft: "none" }} />
          </div>
          {errors.city && <div style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px" }}>{errors.city}</div>}
          {errors.pincode && <div style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px" }}>{errors.pincode}</div>}
          {errors.state && <div style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px" }}>{errors.state}</div>}
          {errors.country && <div style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px" }}>{errors.country}</div>}
        </div>

        {/* Row 5: Passport */}
        <div style={{ marginBottom: "8px" }}>
          <div style={{ display: "flex", gap: "0" }}>
            <div style={{ backgroundColor: "#5c3a1e", color: "#f5e6c8", fontWeight: "bold", fontSize: "13px", padding: "10px 14px", display: "flex", alignItems: "center" }}>Passport Number</div>
            <input className={INPUT} placeholder="F2345678" value={form.passportNumber} onChange={set("passportNumber")} style={{ flex: 1, borderLeft: "none" }} />
            <div style={{ backgroundColor: "#5c3a1e", color: "#f5e6c8", fontWeight: "bold", fontSize: "13px", padding: "10px 14px", display: "flex", alignItems: "center", borderLeft: "2px solid #f5e6c8" }}>Date of Issue</div>
            <input type="date" className={INPUT} value={form.dateOfIssue} onChange={set("dateOfIssue")} style={{ flex: 1, borderLeft: "none" }} />
            <div style={{ backgroundColor: "#5c3a1e", color: "#f5e6c8", fontWeight: "bold", fontSize: "13px", padding: "10px 14px", display: "flex", alignItems: "center", borderLeft: "2px solid #f5e6c8" }}>Date of Expiry</div>
            <input type="date" className={INPUT} value={form.dateOfExpiry} onChange={set("dateOfExpiry")} style={{ flex: 1, borderLeft: "none" }} />
            <div style={{ backgroundColor: "#5c3a1e", color: "#f5e6c8", fontWeight: "bold", fontSize: "13px", padding: "10px 14px", display: "flex", alignItems: "center", borderLeft: "2px solid #f5e6c8" }}>Place of Issue</div>
            <input className={INPUT} value={form.placeOfIssue} onChange={set("placeOfIssue")} style={{ flex: 1, borderLeft: "none" }} />
          </div>
          {errors.passportNumber && <div style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px" }}>{errors.passportNumber}</div>}
          {errors.dateOfIssue && <div style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px" }}>{errors.dateOfIssue}</div>}
          {errors.dateOfExpiry && <div style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px" }}>{errors.dateOfExpiry}</div>}
          {errors.placeOfIssue && <div style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px" }}>{errors.placeOfIssue}</div>}
        </div>

        {/* Row 6: Purpose, Illness, USA/Canada */}
        <div style={{ marginBottom: "8px" }}>
          <div style={{ display: "flex", gap: "0", alignItems: "stretch" }}>
            <div style={{ backgroundColor: "#5c3a1e", color: "#f5e6c8", fontWeight: "bold", fontSize: "13px", padding: "10px 14px", display: "flex", alignItems: "center" }}>Purpose of Travel</div>
            <input className={INPUT} value={form.purposeOfTravel} onChange={set("purposeOfTravel")} style={{ flex: 1, borderLeft: "none" }} />
            <div style={{ backgroundColor: "#5c3a1e", color: "#f5e6c8", fontWeight: "bold", fontSize: "13px", padding: "10px 14px", display: "flex", alignItems: "center", borderLeft: "2px solid #f5e6c8" }}>Any Existing illness</div>
            <input className={INPUT} value={form.anyExistingIllness} onChange={set("anyExistingIllness")} style={{ flex: 1.5, borderLeft: "none" }} />
            <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 10px", border: "1px solid #c8a97e", borderLeft: "2px solid #f5e6c8", backgroundColor: "#f5e6c8" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "#3a2000", cursor: "pointer", border: "1px solid #5c3a1e", padding: "4px 8px" }}>
                <input type="checkbox" checked={form.includeUSACanada} onChange={set("includeUSACanada")} style={{ width: "14px", height: "14px" }} />
                Including USA, Canada
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "#3a2000", cursor: "pointer", border: "1px solid #5c3a1e", padding: "4px 8px" }}>
                <input type="checkbox" checked={form.excludeUSACanada} onChange={set("excludeUSACanada")} style={{ width: "14px", height: "14px" }} />
                Excluding USA, Canada
              </label>
            </div>
          </div>
          {errors.purposeOfTravel && <div style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px" }}>{errors.purposeOfTravel}</div>}
        </div>

        {/* Row 7: Travel Dates */}
        <div style={{ marginBottom: "8px" }}>
          <div style={{ display: "flex", gap: "0" }}>
            <div style={{ backgroundColor: "#5c3a1e", color: "#f5e6c8", fontWeight: "bold", fontSize: "13px", padding: "10px 14px", display: "flex", alignItems: "center" }}>Date of Travel</div>
            <input type="date" className={INPUT} value={form.dateOfTravel} onChange={set("dateOfTravel")} style={{ flex: 1, borderLeft: "none" }} />
            <div style={{ backgroundColor: "#5c3a1e", color: "#f5e6c8", fontWeight: "bold", fontSize: "13px", padding: "10px 14px", display: "flex", alignItems: "center", borderLeft: "2px solid #f5e6c8" }}>Return Date</div>
            <input type="date" className={INPUT} value={form.returnDate} onChange={set("returnDate")} style={{ flex: 1, borderLeft: "none" }} />
            <div style={{ backgroundColor: "#5c3a1e", color: "#f5e6c8", fontWeight: "bold", fontSize: "13px", padding: "10px 14px", display: "flex", alignItems: "center", borderLeft: "2px solid #f5e6c8" }}>No of Days</div>
<input 
  className={INPUT} 
  value={form.noOfDays} 
  onChange={set("noOfDays")}
  placeholder="Enter number of days"
  style={{ flex: 1, borderLeft: "none" }}
/>            <div style={{ backgroundColor: "#5c3a1e", color: "#f5e6c8", fontWeight: "bold", fontSize: "13px", padding: "10px 14px", display: "flex", alignItems: "center", borderLeft: "2px solid #f5e6c8" }}>Countries to Visit</div>
            <input className={INPUT} value={form.countriesToVisit} onChange={set("countriesToVisit")} style={{ flex: 1.5, borderLeft: "none" }} />
          </div>
          {errors.dateOfTravel && <div style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px" }}>{errors.dateOfTravel}</div>}
          {errors.returnDate && <div style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px" }}>{errors.returnDate}</div>}
          {errors.countriesToVisit && <div style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px" }}>{errors.countriesToVisit}</div>}
        </div>

        {/* Row 8: Sum Insured */}
        <div style={{ marginBottom: "16px" }}>
          <div style={{ display: "flex", gap: "0", alignItems: "stretch" }}>
            <div style={{ backgroundColor: "#5c3a1e", color: "#f5e6c8", fontWeight: "bold", fontSize: "13px", padding: "10px 14px", display: "flex", alignItems: "center", minWidth: "140px" }}>Sum Insured (in USD)</div>
            <div style={{ border: "1px solid #c8a97e", borderLeft: "none", backgroundColor: "#f5e6c8", display: "flex", alignItems: "center", gap: "8px", padding: "8px 12px", flex: 1 }}>
              {sumOptions.map(opt => (
                <label key={opt} style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", color: "#3a2000", cursor: "pointer", border: "1px solid #5c3a1e", padding: "4px 10px" }}>
                  <input type="checkbox" checked={form.sumInsured === opt} onChange={() => setSumInsured(opt)} style={{ width: "14px", height: "14px" }} />
                  {opt}
                </label>
              ))}
            </div>
          </div>
          {errors.sumInsured && <div style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px" }}>{errors.sumInsured}</div>}
        </div>

        {/* Nominee Details */}
        <div style={{ border: "2px solid #f0c040", backgroundColor: "#fffbe8", padding: "16px", marginBottom: "0" }}>
          <div style={{ textAlign: "center", fontWeight: "bold", fontSize: "15px", marginBottom: "12px", color: "#3a2000" }}>
            📌 Nominee Details
          </div>
          <div style={{ marginBottom: "8px" }}>
            <div style={{ display: "flex", gap: "0", alignItems: "stretch" }}>
              <div style={{ backgroundColor: "#5c3a1e", color: "#f5e6c8", fontWeight: "bold", fontSize: "13px", padding: "10px 14px", display: "flex", alignItems: "center" }}>Nominee Name</div>
              <input className={INPUT} placeholder="Full name" value={form.nomineeName} onChange={set("nomineeName")} style={{ flex: 2, borderLeft: "none" }} />
              <div style={{ backgroundColor: "#5c3a1e", color: "#f5e6c8", fontWeight: "bold", fontSize: "13px", padding: "10px 14px", display: "flex", alignItems: "center", borderLeft: "2px solid #f5e6c8" }}>Relationship</div>
              <input className={INPUT} value={form.nomineeRelationship} onChange={set("nomineeRelationship")} style={{ flex: 2, borderLeft: "none" }} />
              <div style={{ backgroundColor: "#5c3a1e", color: "#f5e6c8", fontWeight: "bold", fontSize: "13px", padding: "10px 14px", display: "flex", alignItems: "center", borderLeft: "2px solid #f5e6c8" }}>Age</div>
              <input className={INPUT} value={form.nomineeAge} onChange={set("nomineeAge")} style={{ width: "60px", borderLeft: "none" }} />
              <div style={{ backgroundColor: "#5c3a1e", color: "#f5e6c8", fontWeight: "bold", fontSize: "13px", padding: "10px 14px", display: "flex", alignItems: "center", borderLeft: "2px solid #f5e6c8" }}>Mobile No</div>
              <input className={INPUT} placeholder="10-digit number" value={form.nomineeMobile} onChange={set("nomineeMobile")} style={{ flex: 2, borderLeft: "none" }} />
            </div>
            {errors.nomineeName && <div style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px" }}>{errors.nomineeName}</div>}
            {errors.nomineeRelationship && <div style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px" }}>{errors.nomineeRelationship}</div>}
            {errors.nomineeMobile && <div style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px" }}>{errors.nomineeMobile}</div>}
          </div>
        </div>
      </div>

      {/* Family Members Section */}
      <div style={{ backgroundColor: "#1a2744", padding: "16px 0", textAlign: "center", marginTop: "-8px" }}>
        <h2 style={{ color: "#f5e6c8", fontSize: "20px", fontWeight: "bold", margin: 0, letterSpacing: "0.5px" }}>
          Family Members Travelling with you
        </h2>
      </div>

      <div style={{ backgroundColor: "#f5e6c8", margin: "0 24px 24px", padding: "24px", border: "1px solid #c8a97e" }}>
        {/* Add Member Button */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
          <button
            onClick={addMember}
            style={{
              backgroundColor: "#cc2200", color: "white", border: "none",
              padding: "10px 24px", fontSize: "14px", fontWeight: "bold",
              cursor: "pointer", borderRadius: "2px"
            }}
          >
            + Add Member
          </button>
        </div>

        {/* Dynamic Family Member Forms */}
        {familyMembers.map((member, index) => (
          <div 
            key={member.id} 
            style={{ 
              marginBottom: "24px", 
              padding: "20px 16px 16px 16px", 
              border: "2px solid #c8a97e", 
              backgroundColor: "#fffbe8",
              position: "relative",
              borderRadius: "4px"
            }}
          >
            <div style={{ 
              position: "absolute", 
              top: "-12px", 
              left: "10px", 
              backgroundColor: "#5c3a1e", 
              color: "#f5e6c8", 
              padding: "2px 12px", 
              fontSize: "12px", 
              fontWeight: "bold",
              borderRadius: "4px"
            }}>
              Member #{index + 1}
            </div>
            
            <button
              onClick={() => removeMember(member.id)}
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                backgroundColor: "#dc2626",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "24px",
                height: "24px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              title="Remove member"
            >
              ✕
            </button>

            {/* Row 1: Name, PP No, DOI, DOE */}
            <div style={{ display: "flex", gap: "0", marginBottom: "8px", marginTop: "8px" }}>
              <div style={{ backgroundColor: "#5c3a1e", color: "#f5e6c8", fontWeight: "bold", fontSize: "13px", padding: "10px 14px", display: "flex", alignItems: "center", minWidth: "100px" }}>
                Name
              </div>
              <input 
                className={INPUT} 
                placeholder="Full name" 
                value={member.name} 
                onChange={(e) => updateMember(member.id, "name", e.target.value)} 
                style={{ flex: 1, borderLeft: "none" }} 
              />
              
              <div style={{ backgroundColor: "#5c3a1e", color: "#f5e6c8", fontWeight: "bold", fontSize: "13px", padding: "10px 14px", display: "flex", alignItems: "center", borderLeft: "2px solid #f5e6c8", minWidth: "80px" }}>
                PP No
              </div>
              <input 
                className={INPUT} 
                placeholder="Passport number" 
                value={member.ppNo} 
                onChange={(e) => updateMember(member.id, "ppNo", e.target.value)} 
                style={{ flex: 1, borderLeft: "none" }} 
              />
              
              <div style={{ backgroundColor: "#5c3a1e", color: "#f5e6c8", fontWeight: "bold", fontSize: "13px", padding: "10px 14px", display: "flex", alignItems: "center", borderLeft: "2px solid #f5e6c8", minWidth: "60px" }}>
                DOI
              </div>
              <input 
                type="date"
                className={INPUT} 
                value={member.doi} 
                onChange={(e) => updateMember(member.id, "doi", e.target.value)} 
                style={{ flex: 1, borderLeft: "none" }} 
              />
              
              <div style={{ backgroundColor: "#5c3a1e", color: "#f5e6c8", fontWeight: "bold", fontSize: "13px", padding: "10px 14px", display: "flex", alignItems: "center", borderLeft: "2px solid #f5e6c8", minWidth: "60px" }}>
                DOE
              </div>
              <input 
                type="date"
                className={INPUT} 
                value={member.doe} 
                onChange={(e) => updateMember(member.id, "doe", e.target.value)} 
                style={{ flex: 1, borderLeft: "none" }} 
              />
            </div>

            {/* Row 2: POI, DOB, Nominee, Relation */}
            <div style={{ display: "flex", gap: "0", marginBottom: "8px" }}>
              <div style={{ backgroundColor: "#5c3a1e", color: "#f5e6c8", fontWeight: "bold", fontSize: "13px", padding: "10px 14px", display: "flex", alignItems: "center", minWidth: "100px" }}>
                POI
              </div>
              <input 
                className={INPUT} 
                placeholder="Place of issue" 
                value={member.poi} 
                onChange={(e) => updateMember(member.id, "poi", e.target.value)} 
                style={{ flex: 1, borderLeft: "none" }} 
              />
              
              <div style={{ backgroundColor: "#5c3a1e", color: "#f5e6c8", fontWeight: "bold", fontSize: "13px", padding: "10px 14px", display: "flex", alignItems: "center", borderLeft: "2px solid #f5e6c8", minWidth: "80px" }}>
                DOB
              </div>
              <input 
                type="date"
                className={INPUT} 
                value={member.dob} 
                onChange={(e) => updateMember(member.id, "dob", e.target.value)} 
                style={{ flex: 1, borderLeft: "none" }} 
              />
              
              <div style={{ backgroundColor: "#5c3a1e", color: "#f5e6c8", fontWeight: "bold", fontSize: "13px", padding: "10px 14px", display: "flex", alignItems: "center", borderLeft: "2px solid #f5e6c8", minWidth: "80px" }}>
                Nominee
              </div>
              <input 
                className={INPUT} 
                placeholder="Nominee name" 
                value={member.nominee} 
                onChange={(e) => updateMember(member.id, "nominee", e.target.value)} 
                style={{ flex: 1, borderLeft: "none" }} 
              />
              
              <div style={{ backgroundColor: "#5c3a1e", color: "#f5e6c8", fontWeight: "bold", fontSize: "13px", padding: "10px 14px", display: "flex", alignItems: "center", borderLeft: "2px solid #f5e6c8", minWidth: "80px" }}>
                Relation
              </div>
              <input 
                className={INPUT} 
                placeholder="Relationship" 
                value={member.relation} 
                onChange={(e) => updateMember(member.id, "relation", e.target.value)} 
                style={{ flex: 1, borderLeft: "none" }} 
              />
            </div>
          </div>
        ))}

        {familyMembers.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px", color: "#8b7355", fontStyle: "italic" }}>
            No family members added yet. Click "Add Member" to add family members travelling with you.
          </div>
        )}

        {/* Submit Button */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "24px", marginBottom: "16px" }}>
          <button
            onClick={submitForm}
            disabled={loading}
            style={{
              backgroundColor: "#cc2200",
              color: "white",
              border: "none",
              padding: "12px 40px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
              borderRadius: "4px",
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading ? "Submitting..." : "Submit Form"}
          </button>
        </div>

        {/* Declaration */}
        <div style={{ border: "1px solid #5c3a1e", padding: "12px 16px", backgroundColor: "#fffbe8", marginTop: "20px" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontSize: "13px", color: "#3a2000" }}>
            <input
              type="checkbox"
              checked={form.declaration}
              onChange={e => setForm(f => ({ ...f, declaration: e.target.checked }))}
              style={{ width: "16px", height: "16px" }}
            />
            By clicking i hear by confirm and state that whatever information provided above is correct to the best of my knowledge
          </label>
          {errors.declaration && <div style={{ color: "#dc2626", fontSize: "12px", marginTop: "8px" }}>{errors.declaration}</div>}
        </div>
      </div>
      <Footer />
    </div>
  );
}

{/* CSS for animations */}
<style>{`
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes progress {
    from {
      width: 100%;
    }
    to {
      width: 0%;
    }
  }
  .animate-slide-in {
    animation: slideIn 0.3s ease-out;
  }
  .animate-progress {
    animation: progress 5s linear forwards;
  }
`}</style>