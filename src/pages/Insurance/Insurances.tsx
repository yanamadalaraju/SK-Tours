import React, { FormEvent } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Insurances: React.FC = () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert(" Insurance Application Submitted Successfully!");
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-100 font-sans">
        {/* ===== Top Blue Title ===== */}
        <div className="bg-[#0b2c63] text-white text-center text-3xl font-bold py-4">
           Insurance  Form
        </div>

        <div className="max-w-[1300px] mx-auto bg-[#f6e4b3] p-4 mb-2">
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* ===================== POLICY TYPE ===================== */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="bg-[#593c26] text-white px-3 py-2 font-semibold">
                Type of Policy
              </span>
              <button type="button" className="bg-green-600 text-white px-3 py-1">Individual</button>
              <button type="button" className="bg-green-600 text-white px-3 py-1">Family Floater</button>
              <button type="button" className="bg-green-600 text-white px-3 py-1">Senior Citizen</button>

              <span className="bg-[#593c26] text-white px-3 py-2 font-semibold ml-4">
                Sum Insured (₹)
              </span>
              <button type="button" className="bg-green-600 text-white px-3 py-1">5 Lakh</button>
              <button type="button" className="bg-green-600 text-white px-3 py-1">10 Lakh</button>
              <button type="button" className="bg-green-600 text-white px-3 py-1">25 Lakh +</button>
            </div>

            {/* ===================== PROPOSER NAME SECTION ===================== */}
            <div className="flex flex-wrap gap-1">
              <label className="bg-[#593c26] text-white px-3 py-2 min-w-[140px]">Proposer Name</label>
              <input className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" />

              <label className="bg-[#593c26] text-white px-3 py-2 min-w-[140px]">Middle Name</label>
              <input className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" />

              <label className="bg-[#593c26] text-white px-3 py-2 min-w-[140px]">Surname</label>
              <input className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" />
            </div>

            {/* ===================== DOB + GENDER + OCCUPATION ===================== */}
            <div className="flex flex-wrap gap-1">
              <label className="bg-[#593c26] text-white px-3 py-2 min-w-[140px]">Date of Birth</label>
              <input type="date" className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" />

              <label className="bg-[#593c26] text-white px-3 py-2 min-w-[100px]">Gender</label>
              <select className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>

              <label className="bg-[#593c26] text-white px-3 py-2 min-w-[140px]">Occupation</label>
              <input className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" />

              <label className="bg-[#593c26] text-white px-3 py-2 min-w-[120px]">Annual Income (₹)</label>
              <input className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" />
            </div>

            {/* ===================== CONTACT + ID ===================== */}
            <div className="flex flex-wrap gap-1">
              <label className="bg-[#593c26] text-white px-3 py-2 min-w-[140px]">Mobile No</label>
              <input type="tel" className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" />

              <label className="bg-[#593c26] text-white px-3 py-2 min-w-[140px]">Email ID</label>
              <input type="email" className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" />

              <label className="bg-[#593c26] text-white px-3 py-2 min-w-[140px]">Aadhaar No</label>
              <input className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" />

              <label className="bg-[#593c26] text-white px-3 py-2 min-w-[140px]">PAN Card No</label>
              <input className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" />
            </div>

            {/* ===================== ADDRESS ===================== */}
            <div className="flex gap-1">
              <label className="bg-[#593c26] text-white px-3 py-2 min-w-[140px]">Address</label>
              <input className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" />
            </div>

            <div className="flex flex-wrap gap-1">
              <label className="bg-[#593c26] text-white px-3 py-2 min-w-[120px]">City</label>
              <input className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" />

              <label className="bg-[#593c26] text-white px-3 py-2 min-w-[120px]">Pincode</label>
              <input className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" />

              <label className="bg-[#593c26] text-white px-3 py-2 min-w-[120px]">State</label>
              <input className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" />

              <label className="bg-[#593c26] text-white px-3 py-2 min-w-[120px]">Country</label>
              <input className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" defaultValue="India" />
            </div>

            {/* ===================== INSURED MEMBERS (Family Floater) ===================== */}
            <div className="border-4 border-yellow-400 mt-4 p-3 bg-white">
              <div className="text-center font-bold text-lg mb-2">Details of Insured Members (including Proposer)</div>
              <div className="flex flex-wrap gap-1 mb-2">
                <label className="bg-[#593c26] text-white px-3 py-2 min-w-[180px]">Name (Self / Spouse / Child)</label>
                <input className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" />

                <label className="bg-[#593c26] text-white px-3 py-2 min-w-[100px]">Relationship</label>
                <input className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" placeholder="Self / Spouse / Son / Daughter" />

                <label className="bg-[#593c26] text-white px-3 py-2 min-w-[120px]">Age / DOB</label>
                <input type="date" className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" />

                <label className="bg-[#593c26] text-white px-3 py-2 min-w-[100px]">Height (cm)</label>
                <input className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" />

                <label className="bg-[#593c26] text-white px-3 py-2 min-w-[100px]">Weight (kg)</label>
                <input className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" />
              </div>
              <p className="text-sm text-gray-700">Add more members if needed (repeat similar row)</p>
            </div>

            {/* ===================== MEDICAL & LIFESTYLE QUESTIONS ===================== */}
            <div className="mt-4 space-y-2">
              <div className="bg-gray-200 px-4 py-3 border border-gray-400">
                <span className="font-semibold block mb-1">
                  Do you or any proposed insured member have any pre-existing diseases / illnesses?
                </span>
                <label className="mr-4"><input type="radio" name="ped" /> Yes</label>
                <label><input type="radio" name="ped" /> No</label>
              </div>

              <div className="bg-gray-200 px-4 py-3 border border-gray-400">
                <span className="font-semibold block mb-1">
                  Are you / any member currently under any medication / treatment?
                </span>
                <label className="mr-4"><input type="radio" name="med" /> Yes</label>
                <label><input type="radio" name="med" /> No</label>
              </div>

              <div className="bg-gray-200 px-4 py-3 border border-gray-400">
                <span className="font-semibold block mb-1">
                  Do you / any member smoke / consume tobacco / alcohol regularly?
                </span>
                <label className="mr-4"><input type="radio" name="habit" /> Yes</label>
                <label><input type="radio" name="habit" /> No</label>
              </div>

              <div className="flex flex-wrap gap-1 items-center">
                <label className="bg-[#593c26] text-white px-3 py-2 min-w-[220px]">
                  Any Hospitalization in last 4 years?
                </label>
                <div className="flex items-center gap-3 bg-[#f3efe6] px-4 h-[40px] border border-gray-400">
                  <label><input type="radio" name="hosp" /> Yes</label>
                  <label><input type="radio" name="hosp" /> No</label>
                </div>
              </div>
            </div>

            {/* ===================== NOMINEE ===================== */}
            <div className="border-4 border-yellow-400 mt-4 p-3 bg-white">
              <div className="text-center font-bold text-lg mb-2">Nominee Details</div>
              <div className="flex flex-wrap gap-1">
                <label className="bg-[#593c26] text-white px-3 py-2 min-w-[140px]">Nominee Name</label>
                <input className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" />

                <label className="bg-[#593c26] text-white px-3 py-2 min-w-[140px]">Relationship</label>
                <input className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" />

                <label className="bg-[#593c26] text-white px-3 py-2 min-w-[140px]">Age</label>
                <input type="number" className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" />

                <label className="bg-[#593c26] text-white px-3 py-2 min-w-[140px]">Mobile No</label>
                <input className="flex-1 bg-[#f3efe6] h-[40px] border border-gray-400 px-3" />
              </div>
            </div>

            {/* ===================== SUBMIT BUTTON ===================== */}
            <div className="flex justify-center gap-4 mt-6">
              <button type="submit" className="bg-red-600 text-white px-8 py-3 font-semibold">
                Submit Application
              </button>
              <button type="button" className="bg-blue-600 text-white px-8 py-3 font-semibold">
                Submit & Proceed to Payment
              </button>
            </div>

            {/* ===================== NOTE ===================== */}
            <div className="text-sm mt-4 text-black text-center">
              All information provided must be true and accurate. Non-disclosure of pre-existing conditions may lead to claim rejection.
              <br />
              (For information only: Medical tests may be required based on age / sum insured / health declarations.)
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Insurances;