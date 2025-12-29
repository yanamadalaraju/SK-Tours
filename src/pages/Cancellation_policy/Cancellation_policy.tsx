import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Line now accepts optional className
const Line = ({ className }: { className?: string }) => (
  <div className={`border-b border-gray-400 w-full h-6 my-2 ${className || ""}`}></div>
);

// Field now accepts label as prop
const Field = ({ label }: { label: string }) => (
  <div className="flex items-center mb-3">
    <span className="w-[320px] whitespace-nowrap">{label}</span>
    <div className="flex-1 border-b border-gray-400 h-6"></div>
  </div>
);

const Cancellation_policy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ================= PAGE 1 ================= */}
        <div className="p-10 border-gray-600">
          <pre className="text-center mb-8 text-2xl font-bold">
            Cancellation Request / Credit Note / Transfer Form
            Full & Final Settlement declaration
          </pre>

          <p>
            Auto Reference number to be selected, Cancellation of Domestic Tour /
            International tour client must first select the choice and after
            selecting reference number must be created
          </p>

          <p className="mt-4">
            For Domestic Tour Cancellation ref no will be{" "}
            <span className="text-red-500">DOMC00001</span>
            <br />
            For International Tour cancellation ref no will be{" "}
            <span className="text-red-500">INTC00001</span>
          </p>

          <div className="mt-6 flex justify-between">
            <div>
              <p>To,</p>
              <p>S K Tours & Travels</p>
              <p>Dadar West, Mumbai 400028.</p>
            </div>
            <p>Date : _______________</p>
          </div>

          <p className="text-center mt-6 font-bold">
            Reg : Request for Cancellation of my tour.
          </p>

          <p className="mt-6">
            Dear Sir / Madam,
            <br /><br />
            I the undersigned __________________ do hereby request you to please
            cancel my tour with cancellation reference no as __________________ (Auto
            pull from Above) & arrange for the refund / Issue Credit Note /
            Transfer the tour. The reason for cancelling the tour and all my details are mentioned below.
          </p>

          {/* A */}
          <section className="mt-8">
            <h3 className="font-bold mb-4">A. Booking Holder Details</h3>

            <Field label="Full Name (Booking Holder) :" />
            <Field label="Contact Number :" />
            <Field label="Email ID :" />

            {/* Address (multi-line) */}
            <div className="flex mb-3">
              <span className="w-[320px] whitespace-nowrap">Address :</span>
              <div className="flex-1">
                <div className="border-b border-gray-400 h-6"></div>
                <div className="border-b border-gray-400 h-6 mt-2"></div>
                <div className="border-b border-gray-400 h-6 mt-2"></div>
              </div>
            </div>
          </section>

          {/* B */}
          <section className="mt-8">
            <h3 className="font-bold mb-1">B. Booking Details</h3>

            <Field label="Tour Name / Destination :" />
            <Field label="Travel Date(s) :" />
            <Field label="Booking / Invoice Number :" />
            <Field label="Invoice Date :" />
            <Field label="Total Amount Paid :" />
            <Field label="Mode of Payment :" />
            <Field label="Receipt No. :" />
          </section>

          {/* C */}
          <section className="mt-8">
            <h3 className="font-bold">C. Details of all Travellers</h3>

            <table className="w-full border border-gray-500 mt-4 text-sm mb-3">
              <thead>
                <tr>
                  <th className="border p-2">No.</th>
                  <th className="border p-2">Full Name</th>
                  <th className="border p-2">Relationship</th>
                  <th className="border p-2">Date of Birth</th>
                </tr>
              </thead>
              <tbody>
                {[1,2,3,4].map(n => (
                  <tr key={n}>
                    <td className="border p-3">{n}</td>
                    <td className="border"></td>
                    <td className="border"></td>
                    <td className="border"></td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="mt-2 text-sm">
              There should be a provision to add if no of pax are more
            </p>
          </section>
        </div>

        {/* ================= PAGE 2 ================= */}
        <div className="p-10 border-gray-600  text-black">
          {/* D */}
          <section className="gap-2">
            <h3 className="font-bold">
              D. Reason for Cancellation <br />
              (Please tick and/or specify)
            </h3>
            <p>☐ Personal Reason</p>
            <p>☐ Medical Emergency</p>
            <p>☐ Death in Family</p>
            <p>☐ Accident</p>
            <p>☐ Other (Specify): ________________________________</p>

            <p className="mt-4">Detailed Explanation (Mandatory):</p>
            <Line /><Line /><Line />
          </section>

          {/* E */}
          <section className="mt-8">
            <h3 className="font-bold">E. Acceptance of Cancellation Charges</h3>
            <p>
              I hereby confirm that I voluntarily request cancellation of the above-mentioned tour
              and unconditionally agree to bear all applicable cancellation charges levied by Airlines, Railways, Hotels, Transport & Sightseeing Providers and any other which is part of the tour.
            </p>

            <h3 className="font-bold mt-5">S K Tours & Travels</h3>
            <p>I understand and accept that:</p>
            <p>
              Refunds are subject to supplier approval, Full refund is not guaranteed, Service charges
              are non-refundable, Processing timelines depend on suppliers,
            </p>

            <p className="mt-4">☐ I accept all applicable cancellation charges</p>
          </section>

          {/* F */}
          <pre className="text-center mt-8 text-xl mb-3 font-bold">
            F. Refund / Credit Note Preference / Transfer the tour
            (Please tick ONE option)
          </pre>

          <section className="mb-3">
            <div className="flex items-center gap-4 mb-3">
              <span>☐ REFUND (Subject to Approval)</span>
            </div>

            <div className="flex items-center gap-4 mb-3">
              <span className="min-w-[180px]">Bank Name :</span>
              <Line className="flex-1" />
            </div>

            <div className="flex items-center gap-4 mb-3">
              <span className="min-w-[180px]">Account Holder Name :</span>
              <Line className="flex-1" />
            </div>

            <div className="flex items-center gap-4 mb-3">
              <span className="min-w-[180px]">Account Number :</span>
              <Line className="flex-1" />
            </div>

            <div className="flex items-center gap-4 mb-3">
              <span className="min-w-[180px]">IFSC / SWIFT Code :</span>
              <Line className="flex-1" />
            </div>

            <div className="flex items-center gap-4 mb-3">
              <span className="min-w-[180px]">Branch :</span>
              <Line className="flex-1" />
            </div>

            <div className="flex items-center gap-4">
              <span className="min-w-[180px]">City :</span>
              <Line className="flex-1" />
            </div>
          </section>
        </div>

        {/* ================= PAGE 3 ================= */}
        <div className="p-10 border-gray-600 mt-3 text-black">
          <p>☐ Credit Note (If Refund Not Approved)</p>
          <p className="mt-4">
            I understand and accept that:<br/>
            Credit Note issuance is subject to supplier approval<br/>
            Credit Note validity is 6 months from date of cancellation<br/>
            Credit Note is non-cashable and non-refundable<br/>
            Travel will be subject to availability & prevailing prices<br/>
            Any fare or price difference must be paid by me<br/>
            Failure to use within validity will make it null and void
          </p>
          <p className="mt-2">☐ I accept Credit Note terms</p>

          {/* G */}
          <section className="mt-8">
            <h3 className="font-bold mb-5">
              G. TRANSFER REQUEST (IF APPLICABLE)
            </h3>
            <p>(Only applicable for tour package services. Flights & train tickets are non-transferable.)</p>
            <p>☐ I request to transfer the tour package (excluding flights/train tickets) to:</p>

            <div className="flex items-center mb-3">
              <span className="w-[320px] whitespace-nowrap mt-3">Name of New Traveler :</span>
              <Line className="flex-1" />
            </div>

            <div className="flex items-center mb-3">
              <span className="w-[320px] whitespace-nowrap">Relationship :</span>
              <Line className="flex-1" />
            </div>

            <div className="flex items-center mb-3">
              <span className="w-[320px] whitespace-nowrap">Contact Number :</span>
              <Line className="flex-1" />
            </div>

            <p>I understand that:</p>
            Transfer is subject to supplier approval<br/>
            Name change / transfer charges may apply<br/>
            Airlines & train tickets are strictly non-transferable<br/>
            S K Tours & Travels does not guarantee transfer approval<br/>

            <div className="flex items-center mt-3">
              <span className="w-[320px] whitespace-nowrap">☐ I accept transfer terms</span>
            </div>
          </section>

          {/* H */}
          <section className="mt-8">
            <h3 className="font-bold">H. FULL & FINAL SETTLEMENT DECLARATION</h3>
            <p>
              I hereby confirm that upon receipt of the refund amount or credit note (if any), the same shall be treated as FULL AND FINAL SETTLEMENT of this booking.<br/>
              I further declare that:<br/>
              No dues, claims, or demands shall remain pending against S K Tours & Travels<br/>
              I shall not initiate any future claim, complaint, or legal action related to this booking<br/>
              This cancellation is made voluntarily, without pressure or coercion
            </p>
          </section>

          {/* I */}
          <section className="mt-8">
            <h3 className="font-bold mb-3">I. DECLARATION & SIGNATURE</h3>
            <p className="mb-6">
              I confirm that all information provided above is true and correct. I have read, understood, and accepted the Terms & Conditions of S K Tours & Travels.
            </p>

            <div className="mb-6">
              <Line />
              <p className="mb-1">Signature of Booking Holder</p>
            </div>

            <div className="flex items-center mb-3">
              <span className="w-[320px] whitespace-nowrap">Full Name:</span>
              <Line className="flex-1" />
            </div>

            <div className="flex items-center mb-3">
              <span className="w-[320px] whitespace-nowrap">Date :</span>
              <Line className="flex-1" />
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cancellation_policy;
