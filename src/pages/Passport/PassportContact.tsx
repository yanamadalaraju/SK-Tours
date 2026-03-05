import React, { useState } from "react";
import axios from "axios";

// Define the interface for form data
interface PassportTwoFormData {
  name: string;
  cell_no: string;
  email: string;
  fresh_count: number;
  fresh_amount: number;
  fresh_total: number;
  fresh_service_count: number;
  fresh_service_amount: number;
  fresh_service_total: number;
  lost_count: number;
  lost_amount: number;
  lost_total: number;
  lost_service_count: number;
  lost_service_amount: number;
  lost_service_total: number;
  total_amount: number;
  gst: number;
  gst_total: number;
  grand_total: number;
}

const PassportContact: React.FC = () => {
  // ------------------------------
  // FORM STATE
  // ------------------------------
  const [form, setForm] = useState<PassportTwoFormData>({
    name: "",
    cell_no: "",
    email: "",
    fresh_count: 0,
    fresh_amount: 1500,
    fresh_total: 0,
    fresh_service_count: 0,
    fresh_service_amount: 500,
    fresh_service_total: 0,
    lost_count: 0,
    lost_amount: 3000,
    lost_total: 0,
    lost_service_count: 0,
    lost_service_amount: 1000,
    lost_service_total: 0,
    total_amount: 0,
    gst: 0,
    gst_total: 0,
    grand_total: 0
  });

  // ------------------------------
  // HANDLE INPUT CHANGE
  // ------------------------------
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Create updated form with proper number conversion for numeric fields
    const updatedForm = { 
      ...form, 
      [name]: name.includes('count') || name.includes('amount') || name === 'gst' 
        ? Number(value) || 0 
        : value 
    } as PassportTwoFormData;

    // Recalculate all totals when any relevant field changes
    updatedForm.fresh_total =
      updatedForm.fresh_count * updatedForm.fresh_amount;

    updatedForm.fresh_service_total =
      updatedForm.fresh_service_count * updatedForm.fresh_service_amount;

    updatedForm.lost_total =
      updatedForm.lost_count * updatedForm.lost_amount;

    updatedForm.lost_service_total =
      updatedForm.lost_service_count * updatedForm.lost_service_amount;

    // Main total
    updatedForm.total_amount =
      updatedForm.fresh_total +
      updatedForm.fresh_service_total +
      updatedForm.lost_total +
      updatedForm.lost_service_total;

    // GST Amount
    updatedForm.gst_total =
      (updatedForm.total_amount * updatedForm.gst) / 100;

    // Grand Total
    updatedForm.grand_total =
      updatedForm.total_amount + updatedForm.gst_total;

    setForm(updatedForm);
  };

  // ------------------------------
  // SUBMIT API
  // ------------------------------
  const handleSubmit = async (): Promise<void> => {
    try {
      const res = await axios.post<{ id: string }>(
        "http://localhost:5000/api/passporttwo/create",
        form
      );
      alert("Saved Successfully!");
      console.log(res.data);
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  // ------------------------------
  // RESET FORM
  // ------------------------------
  const handleReset = (): void => {
    setForm({
      name: "",
      cell_no: "",
      email: "",
      fresh_count: 0,
      fresh_amount: 1500,
      fresh_total: 0,
      fresh_service_count: 0,
      fresh_service_amount: 500,
      fresh_service_total: 0,
      lost_count: 0,
      lost_amount: 3000,
      lost_total: 0,
      lost_service_count: 0,
      lost_service_amount: 1000,
      lost_service_total: 0,
      total_amount: 0,
      gst: 0,
      gst_total: 0,
      grand_total: 0
    });
  };

  return (
    <div className="w-full bg-[#f7e4c0] font-sans pb-10">
      <div className="bg-[#0b2a63] text-white py-4.5 text-center text-3xl font-bold">
        Passport Application Form
      </div>

      <div className="flex p-6 px-8 gap-15">
        {/* LEFT PANEL (FORM) */}
        <div className="flex-1 bg-[#ecd59a] border-2 border-[#b8944e] p-5">
          <div className="bg-[#5b3a12] text-white p-3 font-bold text-center text-lg mb-4">
            Contact Details
          </div>
          
          {/* Contact Grid */}
          <div className="grid grid-cols-[220px_1fr] gap-3 gap-x-4 mb-6 items-center">
            <div className="bg-[#5b3a12] text-white p-2.5 font-bold text-sm rounded-sm">
              Name of the person
            </div>
            <input
              className="bg-[#fff7dc] border border-[#a5874d] p-2.5 text-sm rounded-sm"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
            />

            <div className="bg-[#5b3a12] text-white p-2.5 font-bold text-sm rounded-sm">
              Cell No
            </div>
            <input
              className="bg-[#fff7dc] border border-[#a5874d] p-2.5 text-sm rounded-sm"
              type="text"
              name="cell_no"
              value={form.cell_no}
              onChange={handleChange}
            />

            <div className="bg-[#5b3a12] text-white p-2.5 font-bold text-sm rounded-sm">
              Email Id
            </div>
            <input
              className="bg-[#fff7dc] border border-[#a5874d] p-2.5 text-sm rounded-sm"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          {/* Payment Section */}
          <div className="bg-[#5b3a12] text-white p-3 font-bold text-center text-lg mb-4">
            Passport Payment
          </div>

          {/* Payment Grid */}
          <div className="grid grid-cols-[280px_60px_30px_80px_30px_120px] gap-2.5 mb-5 items-center">
            {/* Fresh / Reissue */}
            <div className="bg-[#5b3a12] text-white p-2.5 font-bold text-sm rounded-sm">
              No of Fresh / Reissue Passport
            </div>
            <input
              className="bg-[#fff7dc] border border-[#a5874d] p-2.5 text-sm rounded-sm w-[70px] text-center"
              type="number"
              name="fresh_count"
              value={form.fresh_count}
              onChange={handleChange}
            />
            <div className="text-2xl font-bold text-center text-[#4d3a24]">X</div>
            <input
              className="bg-[#fff7dc] border border-[#a5874d] p-2.5 text-sm rounded-sm w-[70px] text-center"
              type="number"
              name="fresh_amount"
              value={form.fresh_amount}
              onChange={handleChange}
            />
            <div className="text-2xl font-bold text-center text-[#4d3a24]">=</div>
            <input 
              className="bg-[#fff7dc] border border-[#a5874d] p-2.5 text-sm rounded-sm w-[140px]" 
              readOnly 
              value={form.fresh_total} 
            />

            {/* Fresh service */}
            <div className="bg-[#5b3a12] text-white p-2.5 font-bold text-sm rounded-sm">
              Service Charge
            </div>
            <input
              className="bg-[#fff7dc] border border-[#a5874d] p-2.5 text-sm rounded-sm w-[70px] text-center"
              type="number"
              name="fresh_service_count"
              value={form.fresh_service_count}
              onChange={handleChange}
            />
            <div className="text-2xl font-bold text-center text-[#4d3a24]">X</div>
            <input
              className="bg-[#fff7dc] border border-[#a5874d] p-2.5 text-sm rounded-sm w-[70px] text-center"
              type="number"
              name="fresh_service_amount"
              value={form.fresh_service_amount}
              onChange={handleChange}
            />
            <div className="text-2xl font-bold text-center text-[#4d3a24]">=</div>
            <input
              className="bg-[#fff7dc] border border-[#a5874d] p-2.5 text-sm rounded-sm w-[140px]"
              readOnly
              value={form.fresh_service_total}
            />

            {/* Lost / Damage */}
            <div className="bg-[#5b3a12] text-white p-2.5 font-bold text-sm rounded-sm">
              Lost / Damage Passport
            </div>
            <input
              className="bg-[#fff7dc] border border-[#a5874d] p-2.5 text-sm rounded-sm w-[70px] text-center"
              type="number"
              name="lost_count"
              value={form.lost_count}
              onChange={handleChange}
            />
            <div className="text-2xl font-bold text-center text-[#4d3a24]">X</div>
            <input
              className="bg-[#fff7dc] border border-[#a5874d] p-2.5 text-sm rounded-sm w-[70px] text-center"
              type="number"
              name="lost_amount"
              value={form.lost_amount}
              onChange={handleChange}
            />
            <div className="text-2xl font-bold text-center text-[#4d3a24]">=</div>
            <input 
              className="bg-[#fff7dc] border border-[#a5874d] p-2.5 text-sm rounded-sm w-[140px]" 
              readOnly 
              value={form.lost_total} 
            />

            {/* Lost service */}
            <div className="bg-[#5b3a12] text-white p-2.5 font-bold text-sm rounded-sm">
              Service Charge
            </div>
            <input
              className="bg-[#fff7dc] border border-[#a5874d] p-2.5 text-sm rounded-sm w-[70px] text-center"
              type="number"
              name="lost_service_count"
              value={form.lost_service_count}
              onChange={handleChange}
            />
            <div className="text-2xl font-bold text-center text-[#4d3a24]">X</div>
            <input
              className="bg-[#fff7dc] border border-[#a5874d] p-2.5 text-sm rounded-sm w-[70px] text-center"
              type="number"
              name="lost_service_amount"
              value={form.lost_service_amount}
              onChange={handleChange}
            />
            <div className="text-2xl font-bold text-center text-[#4d3a24]">=</div>
            <input
              className="bg-[#fff7dc] border border-[#a5874d] p-2.5 text-sm rounded-sm w-[140px]"
              readOnly
              value={form.lost_service_total}
            />

            {/* TOTAL ROW */}
            <div className="bg-[#8b4513] text-white p-2.5 font-bold text-sm rounded-sm">
              Total
            </div>
            <input 
              className="bg-[#ffcc80] border border-[#a5874d] p-2.5 text-sm rounded-sm w-[70px] text-center font-bold" 
              readOnly 
            />

            {/* INFO PARAGRAPH BOX FULL WIDTH */}
            <div className="col-span-6 bg-[#fff3cd] border border-dashed border-[#bb9b58] p-3 text-xs leading-relaxed text-[#444]">
              This box is not in design but to provide information to you. <br />
              When applicant enter no of fresh passport or no of lost / damage passport
              for eg. 2 Then in service charge by default No 2 must reflect & applicant
              will not have any choice to change in service charge unless he changes in
              fresh passport or lost passport. Above mention No 2 & 3 are for reference
              purpose only so do not pre enter in the box. Delete the box after reading.
            </div>

            {/* GST */}
            <div className="bg-[#5b3a12] text-white p-2.5 font-bold text-sm rounded-sm">
              GST
            </div>
            <input
              className="bg-[#fff7dc] border border-[#a5874d] p-2.5 text-sm rounded-sm w-[70px] text-center"
              type="number"
              name="gst"
              value={form.gst}
              onChange={handleChange}
            />
            <div className="text-2xl font-bold text-center text-[#4d3a24]">%</div>
            <div></div>
            <input
              className="bg-[#fff7dc] border border-[#a5874d] p-2.5 text-sm rounded-sm w-[140px]"
              readOnly
              value={form.gst_total}
            />

            {/* Grand Total */}
            <div className="bg-[#8b4513] text-white p-2.5 font-bold text-sm rounded-sm">
              Grand Total
            </div>
            <div></div>
            <input
              className="bg-[#ffcc80] border border-[#a5874d] p-2.5 text-sm rounded-sm w-[140px] font-bold"
              readOnly
              value={form.grand_total}
            />
          </div>

          {/* Buttons */}
          <div className="text-center mt-6">
            <button 
              className="px-7 py-3 font-bold border-none cursor-pointer mx-2 text-white rounded text-base bg-green-600"
              onClick={handleReset}
            >
              Reset
            </button>
            <button className="px-7 py-3 font-bold border-none cursor-pointer mx-2 text-white rounded text-base bg-gray-500">
              Exit
            </button>
            <button 
              className="px-7 py-3 font-bold border-none cursor-pointer mx-2 text-white rounded text-base bg-red-600"
              onClick={handleSubmit}
            >
              Pay Now
            </button>
          </div>
        </div>

        {/* RIGHT PANEL (DOCUMENTS) */}
        <div className="flex-1 bg-[#ecd59a] border-2 border-[#b8944e] p-5">
          <div className="bg-[#5b3a12] text-white p-3 font-bold text-center text-lg mb-4">
            Documents Required
          </div>

          <div className="mb-5">
            <div className="bg-[#5b3a12] text-white p-2.5 text-center font-bold text-lg mb-2.5">
              Fresh Passport
            </div>
            <ol className="bg-[#fff7dc] py-3.5 px-5 pl-10 border border-[#c6a66e] m-0 text-sm leading-relaxed">
              <li className="mb-2">02 Residential Proof</li>
              <li className="mb-2">Birth Proof</li>
              <li className="mb-2">Education Documents</li>
              <li className="mb-2">If Government Employee then NOC form Office</li>
              <li className="mb-2">If Name Change then Affidavit Required</li>
              <li className="mb-2">If Married / Divorce then Certificate Require</li>
            </ol>
          </div>

          <div className="mb-5">
            <div className="bg-[#5b3a12] text-white p-2.5 text-center font-bold text-lg mb-2.5">
              Reissue Passport
            </div>
            <ol className="bg-[#fff7dc] py-3.5 px-5 pl-10 border border-[#c6a66e] m-0 text-sm leading-relaxed">
              <li className="mb-2">02 Residential Proof</li>
              <li className="mb-2">Birth Proof</li>
              <li className="mb-2">Education Documents</li>
              <li className="mb-2">If Government Employee then NOC form Office</li>
              <li className="mb-2">If Name Change then Affidavit Required</li>
              <li className="mb-2">If Married / Divorce then Certificate Require</li>
              <li className="mb-2">Old Passport to Attach</li>
            </ol>
          </div>

          <div className="mb-5">
            <div className="bg-[#5b3a12] text-white p-2.5 text-center font-bold text-lg mb-2.5">
              Lost / Damage Passport
            </div>
            <ol className="bg-[#fff7dc] py-3.5 px-5 pl-10 border border-[#c6a66e] m-0 text-sm leading-relaxed">
              <li className="mb-2">02 Residential Proof</li>
              <li className="mb-2">Birth Proof</li>
              <li className="mb-2">Education Documents</li>
              <li className="mb-2">If Government Employee then NOC form Office</li>
              <li className="mb-2">If Name Change then Affidavit Required</li>
              <li className="mb-2">If Married / Divorce then Certificate Require</li>
              <li className="mb-2">FIR & Lost / Damage Passport Copies Required.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassportContact;