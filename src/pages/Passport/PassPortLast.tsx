import React, { useState } from "react";

// Define the interface for form data
interface PassportLastFormData {
  // Same address
  sameAddressYes: boolean;
  sameAddressNo: boolean;
  
  // Address details
  address: string;
  city: string;
  pincode: string;
  state: string;
  country: string;
  
  // Name change
  nameChangeYes: boolean;
  nameChangeNo: boolean;
  previousName: string;
  
  // Old passport
  oldPassportYes: boolean;
  oldPassportNo: boolean;
  oldPassportDetails: string;
  passportNumber: string;
  placeOfIssue: string;
  
  // Dates
  dateOfIssue: string;
  dateOfExpiry: string;
  immigrationYes: boolean;
  immigrationNo: boolean;
  
  // Reference 1
  ref1Name: string;
  ref1Address: string;
  ref1CellNo: string;
  ref1City: string;
  ref1Pincode: string;
  ref1State: string;
  ref1Country: string;
  
  // Reference 2
  ref2Name: string;
  ref2Address: string;
  ref2CellNo: string;
  ref2City: string;
  ref2Pincode: string;
  ref2State: string;
  ref2Country: string;
  
  // Declaration and email
  declaration: boolean;
  email1: string;
  email2: string;
}

const PassPortLast: React.FC = () => {
  const [formData, setFormData] = useState<PassportLastFormData>({
    sameAddressYes: false,
    sameAddressNo: false,
    address: "",
    city: "",
    pincode: "",
    state: "",
    country: "",
    nameChangeYes: false,
    nameChangeNo: false,
    previousName: "",
    oldPassportYes: false,
    oldPassportNo: false,
    oldPassportDetails: "",
    passportNumber: "",
    placeOfIssue: "",
    dateOfIssue: "",
    dateOfExpiry: "",
    immigrationYes: false,
    immigrationNo: false,
    ref1Name: "",
    ref1Address: "",
    ref1CellNo: "",
    ref1City: "",
    ref1Pincode: "",
    ref1State: "",
    ref1Country: "",
    ref2Name: "",
    ref2Address: "",
    ref2CellNo: "",
    ref2City: "",
    ref2Pincode: "",
    ref2State: "",
    ref2Country: "",
    declaration: false,
    email1: "",
    email2: ""
  });

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    
    // Handle mutual exclusivity for radio-like checkboxes
    if (name === 'sameAddressYes' || name === 'sameAddressNo') {
      setFormData(prev => ({
        ...prev,
        sameAddressYes: name === 'sameAddressYes' ? checked : false,
        sameAddressNo: name === 'sameAddressNo' ? checked : false
      }));
    } else if (name === 'nameChangeYes' || name === 'nameChangeNo') {
      setFormData(prev => ({
        ...prev,
        nameChangeYes: name === 'nameChangeYes' ? checked : false,
        nameChangeNo: name === 'nameChangeNo' ? checked : false
      }));
    } else if (name === 'oldPassportYes' || name === 'oldPassportNo') {
      setFormData(prev => ({
        ...prev,
        oldPassportYes: name === 'oldPassportYes' ? checked : false,
        oldPassportNo: name === 'oldPassportNo' ? checked : false
      }));
    } else if (name === 'immigrationYes' || name === 'immigrationNo') {
      setFormData(prev => ({
        ...prev,
        immigrationYes: name === 'immigrationYes' ? checked : false,
        immigrationNo: name === 'immigrationNo' ? checked : false
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: checked }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    alert("Form submitted successfully!");
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      <header className="bg-[#0c2b66] text-white text-center p-4 text-3xl font-bold">
        Passport Application Form
      </header>

      <form onSubmit={handleSubmit} className="max-w-[1300px] mx-auto bg-[#fbeedf] p-2.5 pb-6 px-4">
        {/* 1. SAME ADDRESS ROW */}
        <div className="grid grid-cols-[minmax(0,2.2fr)_auto_minmax(0,1.4fr)] gap-1 items-center mb-1.5">
          <div className="bg-[#5d3b13] text-white px-2 py-1 font-bold text-xs whitespace-nowrap leading-[18px]">
            Have you been residing on the same address for more than one year
          </div>

          <div className="flex items-center gap-2.5">
            <label className="bg-white border border-[#5d3b13] px-1.5 py-0.5 text-xs font-bold inline-flex items-center gap-1">
              Yes <input 
                type="checkbox" 
                name="sameAddressYes"
                checked={formData.sameAddressYes}
                onChange={handleCheckboxChange}
              />
            </label>
            <label className="bg-white border border-[#5d3b13] px-1.5 py-0.5 text-xs font-bold inline-flex items-center gap-1">
              No <input 
                type="checkbox" 
                name="sameAddressNo"
                checked={formData.sameAddressNo}
                onChange={handleCheckboxChange}
              />
            </label>
          </div>

          <div className="bg-[#5d3b13] text-white px-2 py-1 font-bold text-xs whitespace-nowrap leading-[18px]">
            If your answer is No fill below details
          </div>
        </div>

        {/* 2. ADDRESS */}
        <div className="grid grid-cols-[120px_minmax(0,1fr)] gap-1 items-center mb-1.5">
          <div className="bg-[#5d3b13] text-white px-2 py-1 font-bold text-xs whitespace-nowrap leading-[18px]">
            Address
          </div>
          <input 
            type="text" 
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="border border-[#c59a4b] bg-[#fff8e1] px-1.5 py-1 text-xs"
          />
        </div>

        {/* 3. CITY / PIN / STATE / COUNTRY */}
        <div className="grid grid-cols-[120px_minmax(0,1fr)_120px_minmax(0,1fr)_120px_minmax(0,1fr)_120px_minmax(0,1fr)] gap-1 items-center mb-1.5">
          <div className="bg-[#5d3b13] text-white px-2 py-1 font-bold text-xs whitespace-nowrap leading-[18px]">
            City
          </div>
          <input 
            type="text" 
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="border border-[#c59a4b] bg-[#fff8e1] px-1.5 py-1 text-xs"
          />

          <div className="bg-[#5d3b13] text-white px-2 py-1 font-bold text-xs whitespace-nowrap leading-[18px]">
            Pincode
          </div>
          <input 
            type="text" 
            name="pincode"
            value={formData.pincode}
            onChange={handleInputChange}
            className="border border-[#c59a4b] bg-[#fff8e1] px-1.5 py-1 text-xs"
          />

          <div className="bg-[#5d3b13] text-white px-2 py-1 font-bold text-xs whitespace-nowrap leading-[18px]">
            State
          </div>
          <input 
            type="text" 
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className="border border-[#c59a4b] bg-[#fff8e1] px-1.5 py-1 text-xs"
          />

          <div className="bg-[#5d3b13] text-white px-2 py-1 font-bold text-xs whitespace-nowrap leading-[18px]">
            Country
          </div>
          <input 
            type="text" 
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="border border-[#c59a4b] bg-[#fff8e1] px-1.5 py-1 text-xs"
          />
        </div>

        {/* 4. NAME CHANGE */}
        <div className="grid grid-cols-[minmax(0,1.8fr)_auto_minmax(0,1.6fr)_minmax(0,1.4fr)] gap-1 items-center mb-1.5">
          <div className="bg-[#5d3b13] text-white px-2 py-1 font-bold text-xs whitespace-nowrap leading-[18px]">
            Have you ever change your Name
          </div>

          <div className="flex items-center gap-2.5">
            <label className="bg-white border border-[#5d3b13] px-1.5 py-0.5 text-xs font-bold inline-flex items-center gap-1">
              Yes <input 
                type="checkbox" 
                name="nameChangeYes"
                checked={formData.nameChangeYes}
                onChange={handleCheckboxChange}
              />
            </label>
            <label className="bg-white border border-[#5d3b13] px-1.5 py-0.5 text-xs font-bold inline-flex items-center gap-1">
              No <input 
                type="checkbox" 
                name="nameChangeNo"
                checked={formData.nameChangeNo}
                onChange={handleCheckboxChange}
              />
            </label>
          </div>

          <div className="bg-[#5d3b13] text-white px-2 py-1 font-bold text-xs whitespace-nowrap leading-[18px]">
            If Yes provide previous Name
          </div>
          <input 
            type="text" 
            name="previousName"
            value={formData.previousName}
            onChange={handleInputChange}
            className="border border-[#c59a4b] bg-[#fff8e1] px-1.5 py-1 text-xs"
          />
        </div>

        {/* 5. OLD PASSPORT DETAILS */}
        <div className="grid grid-cols-[minmax(0,1.7fr)_auto_minmax(0,1.9fr)_minmax(0,1.2fr)_130px_minmax(0,1fr)_130px_minmax(0,1fr)] gap-1 items-center mb-1.5">
          <div className="bg-[#5d3b13] text-white px-2 py-1 font-bold text-xs whitespace-nowrap leading-[18px]">
            Do you held old passport
          </div>

          <div className="flex items-center gap-2.5">
            <label className="bg-white border border-[#5d3b13] px-1.5 py-0.5 text-xs font-bold inline-flex items-center gap-1">
              Yes <input 
                type="checkbox" 
                name="oldPassportYes"
                checked={formData.oldPassportYes}
                onChange={handleCheckboxChange}
              />
            </label>
            <label className="bg-white border border-[#5d3b13] px-1.5 py-0.5 text-xs font-bold inline-flex items-center gap-1">
              No <input 
                type="checkbox" 
                name="oldPassportNo"
                checked={formData.oldPassportNo}
                onChange={handleCheckboxChange}
              />
            </label>
          </div>

          <div className="bg-[#5d3b13] text-white px-2 py-1 font-bold text-xs whitespace-nowrap leading-[18px]">
            If your answer is Yes provide details
          </div>
          <input 
            type="text" 
            name="oldPassportDetails"
            value={formData.oldPassportDetails}
            onChange={handleInputChange}
            className="border border-[#c59a4b] bg-[#fff8e1] px-1.5 py-1 text-xs"
          />

          <div className="bg-[#5d3b13] text-white px-2 py-1 font-bold text-xs whitespace-nowrap leading-[18px]">
            Passport Number
          </div>
          <input 
            type="text" 
            name="passportNumber"
            value={formData.passportNumber}
            onChange={handleInputChange}
            className="border border-[#c59a4b] bg-[#fff8e1] px-1.5 py-1 text-xs"
          />

          <div className="bg-[#5d3b13] text-white px-2 py-1 font-bold text-xs whitespace-nowrap leading-[18px]">
            Place of issue
          </div>
          <input 
            type="text" 
            name="placeOfIssue"
            value={formData.placeOfIssue}
            onChange={handleInputChange}
            className="border border-[#c59a4b] bg-[#fff8e1] px-1.5 py-1 text-xs"
          />
        </div>

        {/* 6. DATES + IMMIGRATION CHECK */}
        <div className="grid grid-cols-[120px_minmax(0,1fr)_120px_minmax(0,1fr)_minmax(0,1.9fr)_auto] gap-1 items-center mb-1.5">
          <div className="bg-[#5d3b13] text-white px-2 py-1 font-bold text-xs whitespace-nowrap leading-[18px]">
            Date of issue
          </div>
          <input 
            type="text" 
            name="dateOfIssue"
            value={formData.dateOfIssue}
            onChange={handleInputChange}
            className="border border-[#c59a4b] bg-[#fff8e1] px-1.5 py-1 text-xs"
          />

          <div className="bg-[#5d3b13] text-white px-2 py-1 font-bold text-xs whitespace-nowrap leading-[18px]">
            Date of Expiry
          </div>
          <input 
            type="text" 
            name="dateOfExpiry"
            value={formData.dateOfExpiry}
            onChange={handleInputChange}
            className="border border-[#c59a4b] bg-[#fff8e1] px-1.5 py-1 text-xs"
          />

          <div className="bg-[#5d3b13] text-white px-2 py-1 font-bold text-xs whitespace-nowrap leading-[18px]">
            Immigration Check required
          </div>

          <div className="flex items-center gap-2.5">
            <label className="bg-white border border-[#5d3b13] px-1 py-0.5 text-xs font-bold inline-flex items-center gap-1">
              Yes <input 
                type="checkbox" 
                name="immigrationYes"
                checked={formData.immigrationYes}
                onChange={handleCheckboxChange}
              />
            </label>
            <label className="bg-white border border-[#5d3b13] px-1 py-0.5 text-xs font-bold inline-flex items-center gap-1">
              No <input 
                type="checkbox" 
                name="immigrationNo"
                checked={formData.immigrationNo}
                onChange={handleCheckboxChange}
              />
            </label>
          </div>
        </div>

        {/* 7. HEADING */}
        <div className="my-1.5 bg-[#5d3b13] text-white text-center font-bold text-sm py-1 px-2">
          Please provide two reference address who are your neighbours or who stays near by your residence.
        </div>

        {/* 8. REFERENCE – NAME */}
        <div className="grid grid-cols-[100px_minmax(0,1fr)_100px_minmax(0,1fr)] gap-1 items-center mb-1.5">
          <div className="bg-[#5d3b13] text-white px-2 py-1 font-bold text-xs whitespace-nowrap leading-[18px]">
            Name
          </div>
          <input 
            type="text" 
            name="ref1Name"
            value={formData.ref1Name}
            onChange={handleInputChange}
            className="border border-[#c59a4b] bg-[#fff8e1] px-1.5 py-1 text-xs"
          />

          <div className="bg-[#5d3b13] text-white px-2 py-1 font-bold text-xs whitespace-nowrap leading-[18px]">
            Name
          </div>
          <input 
            type="text" 
            name="ref2Name"
            value={formData.ref2Name}
            onChange={handleInputChange}
            className="border border-[#c59a4b] bg-[#fff8e1] px-1.5 py-1 text-xs"
          />
        </div>

        {/* 9. REFERENCE – ADDRESS LINE 1 */}
        <div className="grid grid-cols-[100px_minmax(0,1fr)_100px_minmax(0,1fr)] gap-1 items-center mb-1.5">
          <div className="bg-[#5d3b13] text-white px-2 py-1 font-bold text-xs whitespace-nowrap leading-[18px]">
            Address
          </div>
          <input 
            type="text" 
            name="ref1Address"
            value={formData.ref1Address}
            onChange={handleInputChange}
            className="border border-[#c59a4b] bg-[#fff8e1] px-1.5 py-1 text-xs"
          />

          <div className="bg-[#5d3b13] text-white px-2 py-1 font-bold text-xs whitespace-nowrap leading-[18px]">
            Address
          </div>
          <input 
            type="text" 
            name="ref2Address"
            value={formData.ref2Address}
            onChange={handleInputChange}
            className="border border-[#c59a4b] bg-[#fff8e1] px-1.5 py-1 text-xs"
          />
        </div>

        {/* 10. REFERENCE – ADDRESS LINE 2 (BLANK ROW) */}
        <div className="grid grid-cols-[100px_minmax(0,1fr)_100px_minmax(0,1fr)] gap-1 items-center mb-1.5">
          <div className="h-5"></div>
          <div className="h-5"></div>
          <div className="h-5"></div>
          <div className="h-5"></div>
        </div>

        {/* 11. REFERENCE – CELL NO */}
        <div className="grid grid-cols-[100px_minmax(0,1fr)_100px_minmax(0,1fr)] gap-1 items-center mb-1.5">
          <div className="bg-[#5d3b13] text-white px-2 py-1 font-bold text-xs whitespace-nowrap leading-[18px]">
            Cell No
          </div>
          <input 
            type="text" 
            name="ref1CellNo"
            value={formData.ref1CellNo}
            onChange={handleInputChange}
            className="border border-[#c59a4b] bg-[#fff8e1] px-1.5 py-1 text-xs"
          />

          <div className="bg-[#5d3b13] text-white px-2 py-1 font-bold text-xs whitespace-nowrap leading-[18px]">
            Cell No
          </div>
          <input 
            type="text" 
            name="ref2CellNo"
            value={formData.ref2CellNo}
            onChange={handleInputChange}
            className="border border-[#c59a4b] bg-[#fff8e1] px-1.5 py-1 text-xs"
          />
        </div>

        {/* 12. REFERENCE – CITY/PIN */}
        <div className="grid grid-cols-[80px_minmax(0,1fr)_80px_minmax(0,1fr)_80px_minmax(0,1fr)_80px_minmax(0,1fr)] gap-1 items-center mb-1.5">
          <div className="bg-[#5d3b13] text-white px-2 py-1 font-bold text-xs whitespace-nowrap leading-[18px]">
            City
          </div>
          <input 
            type="text" 
            name="ref1City"
            value={formData.ref1City}
            onChange={handleInputChange}
            className="border border-[#c59a4b] bg-[#fff8e1] px-1.5 py-1 text-xs"
          />

          <div className="bg-[#5d3b13] text-white px-2 py-1 font-bold text-xs whitespace-nowrap leading-[18px]">
            Pincode
          </div>
          <input 
            type="text" 
            name="ref1Pincode"
            value={formData.ref1Pincode}
            onChange={handleInputChange}
            className="border border-[#c59a4b] bg-[#fff8e1] px-1.5 py-1 text-xs"
          />

          <div className="bg-[#5d3b13] text-white px-2 py-1 font-bold text-xs whitespace-nowrap leading-[18px]">
            City
          </div>
          <input 
            type="text" 
            name="ref2City"
            value={formData.ref2City}
            onChange={handleInputChange}
            className="border border-[#c59a4b] bg-[#fff8e1] px-1.5 py-1 text-xs"
          />

          <div className="bg-[#5d3b13] text-white px-2 py-1 font-bold text-xs whitespace-nowrap leading-[18px]">
            Pincode
          </div>
          <input 
            type="text" 
            name="ref2Pincode"
            value={formData.ref2Pincode}
            onChange={handleInputChange}
            className="border border-[#c59a4b] bg-[#fff8e1] px-1.5 py-1 text-xs"
          />
        </div>

        {/* 13. REFERENCE – STATE/COUNTRY */}
        <div className="grid grid-cols-[80px_minmax(0,1fr)_80px_minmax(0,1fr)_80px_minmax(0,1fr)_80px_minmax(0,1fr)] gap-1 items-center mb-1.5">
          <div className="bg-[#5d3b13] text-white px-2 py-1 font-bold text-xs whitespace-nowrap leading-[18px]">
            State
          </div>
          <input 
            type="text" 
            name="ref1State"
            value={formData.ref1State}
            onChange={handleInputChange}
            className="border border-[#c59a4b] bg-[#fff8e1] px-1.5 py-1 text-xs"
          />

          <div className="bg-[#5d3b13] text-white px-2 py-1 font-bold text-xs whitespace-nowrap leading-[18px]">
            Country
          </div>
          <input 
            type="text" 
            name="ref1Country"
            value={formData.ref1Country}
            onChange={handleInputChange}
            className="border border-[#c59a4b] bg-[#fff8e1] px-1.5 py-1 text-xs"
          />

          <div className="bg-[#5d3b13] text-white px-2 py-1 font-bold text-xs whitespace-nowrap leading-[18px]">
            State
          </div>
          <input 
            type="text" 
            name="ref2State"
            value={formData.ref2State}
            onChange={handleInputChange}
            className="border border-[#c59a4b] bg-[#fff8e1] px-1.5 py-1 text-xs"
          />

          <div className="bg-[#5d3b13] text-white px-2 py-1 font-bold text-xs whitespace-nowrap leading-[18px]">
            Country
          </div>
          <input 
            type="text" 
            name="ref2Country"
            value={formData.ref2Country}
            onChange={handleInputChange}
            className="border border-[#c59a4b] bg-[#fff8e1] px-1.5 py-1 text-xs"
          />
        </div>

        {/* 14. DECLARATION */}
        <div className="grid grid-cols-1 gap-1 mb-1.5">
          <label className="bg-white border border-[#c59a4b] p-2 text-xs font-bold flex gap-2 items-start">
            <input 
              type="checkbox" 
              name="declaration"
              checked={formData.declaration}
              onChange={handleCheckboxChange}
            /> 
            I hereby confirm & state that whatever information provided above is correct to the best of my knowledge. I also accept to pay you the Passport fees and your service charges as applicable. Thank you.
          </label>
        </div>

        {/* 15. EMAIL + NOTE + SUBMIT */}
        <div className="grid grid-cols-[minmax(0,2.1fr)_minmax(0,1.4fr)_80px_minmax(0,1.2fr)_minmax(0,2.2fr)_auto] gap-1 items-stretch mb-1.5">
          <div className="bg-[#5d3b13] text-white px-2 py-1 font-bold text-xs whitespace-nowrap leading-[18px]">
            Provide email Id to receive PDF of form filled
          </div>
          <input 
            type="email" 
            name="email1"
            value={formData.email1}
            onChange={handleInputChange}
            className="border border-[#c59a4b] bg-[#fff8e1] px-1.5 py-1 text-xs"
          />

          <div className="bg-[#5d3b13] text-white px-2 py-1 font-bold text-xs whitespace-nowrap leading-[18px]">
            Email
          </div>
          <input 
            type="email" 
            name="email2"
            value={formData.email2}
            onChange={handleInputChange}
            className="border border-[#c59a4b] bg-[#fff8e1] px-1.5 py-1 text-xs"
          />

          <div className="bg-[#5d3b13] text-white px-2 py-1 font-bold text-xs leading-[18px]">
            Please Note: for every applicant fresh form to be filled.
          </div>

          <button 
            type="submit"
            className="bg-red-600 text-white border-none px-4 py-1.5 font-bold text-sm cursor-pointer"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default PassPortLast;