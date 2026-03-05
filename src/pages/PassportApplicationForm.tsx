import React, { FormEvent } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PassportApplicationForm: React.FC = () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("Form Submitted Successfully!");
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-100 font-sans">
        
        {/* ===== Top Blue Title ===== */}
        <div className="bg-[#0b2c63] text-white text-center text-3xl font-bold py-4">
          Passport Application Form
        </div>

        <div className="max-w-[1300px] mx-auto bg-[#f6e4b3] p-4 mb-2">

          <form onSubmit={handleSubmit} className="space-y-2">

            {/* ===================== APPLICATION TYPE ===================== */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="bg-[#593c26] text-white px-3 py-2 font-semibold">
                Applicant For
              </span>
              <button type="button" className="bg-green-600 text-white px-3 py-1">Fresh</button>
              <button type="button" className="bg-green-600 text-white px-3 py-1">Reissue</button>
              <button type="button" className="bg-green-600 text-white px-3 py-1">Lost / Damage</button>

              <span className="bg-[#593c26] text-white px-3 py-2 font-semibold ml-4">
                Type of Application
              </span>
              <button type="button" className="bg-green-600 text-white px-3 py-1">Normal</button>
              <button type="button" className="bg-green-600 text-white px-3 py-1">Tatkal</button>

              <span className="bg-[#593c26] text-white px-3 py-2 font-semibold ml-4">
                Type of Passport Booklet
              </span>
              <button type="button" className="bg-green-600 text-white px-3 py-1">36</button>
              <button type="button" className="bg-green-600 text-white px-3 py-1">64</button>
            </div>

            {/* ===================== NAME SECTION ===================== */}
            <div className="flex flex-wrap gap-1">
              <label className="bg-[#593c26] text-white px-3 py-2 min-w-[140px]">Name</label>
              <input className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" />

              <label className="bg-[#593c26] text-white px-3 py-2 min-w-[140px]">Middle Name</label>
              <input className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" />

              <label className="bg-[#593c26] text-white px-3 py-2 min-w-[140px]">Surname</label>
              <input className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" />
            </div>

            {/* ===================== DOB ROW ===================== */}
            <div className="flex flex-wrap gap-1">
              <label className="bg-[#593c26] text-white px-3 py-2 min-w-[140px]">Date of Birth</label>
              <input type="date" className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" />

              <label className="bg-[#593c26] text-white px-3 py-2 min-w-[140px]">Place of Birth</label>
              <input className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" />

              <label className="bg-[#593c26] text-white px-3 py-2 min-w-[120px]">Cell No</label>
              <input className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" />
            </div>

            {/* ===================== EMAIL + PAN + AADHAR ===================== */}
            <div className="flex flex-wrap gap-1">
              <label className="bg-[#593c26] text-white px-3 py-2 min-w-[140px]">Email ID</label>
              <input type="email" className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" />

              <label className="bg-[#593c26] text-white px-3 py-2 min-w-[140px]">PAN Card No</label>
              <input className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" />

              <label className="bg-[#593c26] text-white px-3 py-2 min-w-[140px]">Aadhar Card No</label>
              <input className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" />
            </div>

            {/* ===================== PROFESSION ===================== */}
            <div className="flex flex-wrap gap-1 items-center">
              <label className="bg-[#593c26] text-white px-3 py-2 min-w-[140px]">Profession</label>
              <input className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" />

              <label className="bg-[#593c26] text-white px-3 py-2 min-w-[220px]">
                Are you Government Employee
              </label>

              <div className="flex items-center gap-3 bg-[#f3efe6] px-4 h-[40px] border border-gray-400">
                <label><input type="radio" name="gov" /> Yes</label>
                <label><input type="radio" name="gov" /> No</label>
              </div>

              <label className="bg-[#593c26] text-white px-3 py-2 min-w-[120px]">Visible Mark</label>
              <input className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" />
            </div>

            {/* ===================== ADDRESS ===================== */}
            <div className="flex gap-1">
              <label className="bg-[#593c26] text-white px-3 py-2 min-w-[140px]">Address</label>
              <input className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" />
            </div>

            {/* ===================== CITY ROW ===================== */}
            <div className="flex flex-wrap gap-1">
              <label className="bg-[#593c26] text-white px-3 py-2 min-w-[120px]">City</label>
              <input className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" />

              <label className="bg-[#593c26] text-white px-3 py-2 min-w-[120px]">Pincode</label>
              <input className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" />

              <label className="bg-[#593c26] text-white px-3 py-2 min-w-[120px]">State</label>
              <input className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" />

              <label className="bg-[#593c26] text-white px-3 py-2 min-w-[120px]">Country</label>
              <input className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" />
            </div>

  
          <form onSubmit={handleSubmit} className="space-y-2">

            {/* ---------------- EXISTING FIELDS ABOVE (UNCHANGED) ---------------- */}

            {/* ===================== GUARDIAN SECTION ===================== */}
            <div className="border-4 border-yellow-400 mt-3 p-2 bg-white">
              <div className="flex">
                <div className="flex-1 bg-gray-200 text-center py-2 font-semibold">Father Name</div>
                <div className="flex-1 bg-gray-200 text-center py-2 font-semibold">Mother Name</div>
                <div className="flex-1 bg-gray-200 text-center py-2 font-semibold">Spouse Name</div>
                <div className="flex-1 bg-[#0b2c63] text-white text-center py-2 font-semibold">
                  Legal Guardian
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mt-2">
                <label className="bg-[#593c26] text-white px-3 py-2 min-w-[140px]">Name</label>
                <input className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" />

                <label className="bg-[#593c26] text-white px-3 py-2 min-w-[140px]">Middle Name</label>
                <input className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" />

                <label className="bg-[#593c26] text-white px-3 py-2 min-w-[140px]">Surname</label>
                <input className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" />
              </div>
            </div>

            {/* ===================== 24 HRS EMERGENCY ===================== */}
            <div className="flex flex-wrap gap-1 mt-2">
              <label className="bg-[#593c26] text-white px-3 py-2 min-w-[200px]">
                24 Hrs Emergency Name
              </label>
              <input className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" />

              <label className="bg-[#593c26] text-white px-3 py-2 min-w-[120px]">
                Cell No
              </label>
              <input className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" />

              <label className="bg-[#593c26] text-white px-3 py-2 min-w-[120px]">
                Email Id
              </label>
              <input className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" />
            </div>

            {/* ===================== EMERGENCY ADDRESS ===================== */}
            <div className="flex gap-1">
              <label className="bg-[#593c26] text-white px-3 py-2 min-w-[140px]">
                Address
              </label>
              <input className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" />
            </div>

            {/* ===================== EMERGENCY CITY ROW ===================== */}
            <div className="flex flex-wrap gap-1">
              <label className="bg-[#593c26] text-white px-3 py-2 min-w-[120px]">City</label>
              <input className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" />

              <label className="bg-[#593c26] text-white px-3 py-2 min-w-[120px]">Pincode</label>
              <input className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" />

              <label className="bg-[#593c26] text-white px-3 py-2 min-w-[120px]">State</label>
              <input className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" />

              <label className="bg-[#593c26] text-white px-3 py-2 min-w-[120px]">Country</label>
              <input className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" />
            </div>

            {/* ===================== CRIMINAL CASE QUESTION ===================== */}
            <div className="flex items-center gap-3 bg-gray-200 px-3 py-3 border border-gray-400 mt-2">
              <span className="font-semibold">
                Do you have any Criminal and Offensive Cases pending in court / Local Police Station in India.
              </span>
              <label><input type="radio" name="crime" className="ml-2" /> Yes</label>
              <label><input type="radio" name="crime" className="ml-2" /> No</label>
            </div>

            {/* ===================== POST OFFICE + POLICE STATION ===================== */}
            <div className="flex flex-wrap gap-1 mt-2">
              <label className="bg-[#593c26] text-white px-3 py-2 min-w-[280px]">
                Name of Post office in your Area
              </label>
              <input className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" />

              <label className="bg-[#593c26] text-white px-3 py-2 min-w-[300px]">
                Name of Police Station in your Area
              </label>
              <input className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" />
            </div>

            {/* ===================== SUBMIT BUTTON ===================== */}
            <div className="flex justify-center gap-3 mt-4">
              <button type="submit" className="bg-red-600 text-white px-6 py-2">
                Submit
              </button>
              <button type="button" className="bg-blue-600 text-white px-6 py-2">
                Submit & Pay
              </button>
            </div>

            {/* ===================== INFORMATION NOTE ===================== */}
            <div className="text-sm mt-3 text-black">
              If Father & Mother details are entered then no need to add legal guardian tab should not open (For Information only).
            </div>

          </form>



           

          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PassportApplicationForm;