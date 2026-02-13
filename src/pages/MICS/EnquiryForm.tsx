import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const FormLabel = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span
    className={`bg-[#4a2f1d] text-white px-3 py-2 font-bold text-sm whitespace-nowrap border border-[#c6a96b] ${className}`}
  >
    {children}
  </span>
);

const FormInput = ({ placeholder = "", className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={`bg-[#fbf7ed] border border-[#c6a96b] px-2 py-2 text-sm outline-none focus:ring-1 focus:ring-[#b30000] ${className}`}
    placeholder={placeholder}
    {...props}
  />
);

const FormRow = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`flex items-stretch bg-[#f6eddc] ${className}`}>
    {children}
  </div>
);

const EnquiryForm = () => {
  const [cityType, setCityType] = useState<"one" | "multiple" | "">("");

  return (
       <>
      <div className="min-h-screen bg-opacity-10">
        <Header />

        <div className="main-layout flex w-full gap-10 p-5">
    <div className="main-layout flex w-full gap-10 p-5">
      {/* Sidebar */}
      <div className="w-64">
        <Sidebar />
      </div>
    <div className="w-full max-w-7xl mx-auto bg-[#f6eddc] rounded-lg border-2 border-[#c6a96b] shadow-lg overflow-hidden">
      
      {/* Header */}
      <div className="bg-[#b30000] py-3 px-4">
        <h1 className="text-center text-2xl font-bold text-white">Enquiry Form</h1>
      </div>

      <div className="p-2 flex flex-col gap-[2px]">
        
        <FormRow>
          <FormLabel>Name of the Company</FormLabel>
          <FormInput className="flex-1" />
          <FormLabel>Reference No</FormLabel>
          <span className="bg-[#fbf7ed] border border-[#c6a96b] px-3 py-2 text-sm font-semibold min-w-[100px]">
            MICE00001
          </span>
        </FormRow>

        <FormRow>
          <FormLabel>Contact Person</FormLabel>
          <FormInput className="flex-1" />
        </FormRow>

        <FormRow>
          <FormLabel>Cell No</FormLabel>
          <FormInput className="flex-1" />
          <FormLabel>Email ID</FormLabel>
          <FormInput className="flex-1" />
        </FormRow>

        <FormRow>
          <FormLabel>City</FormLabel>
          <FormInput className="flex-1" />
          <FormLabel>Pin Code</FormLabel>
          <FormInput className="flex-1" />
          <FormLabel>State</FormLabel>
          <FormInput className="flex-1" />
          <FormLabel>Country</FormLabel>
          <FormInput className="flex-1" />
        </FormRow>

        <FormRow>
          <FormLabel>No of People</FormLabel>
          <FormInput className="w-16" />
          <FormLabel>No of Rooms</FormLabel>
          <FormInput className="w-16" />
          <FormLabel>Single</FormLabel>
          <FormInput className="w-16" />
          <FormLabel>Double</FormLabel>
          <FormInput className="w-16" />
          <FormLabel>Triple</FormLabel>
          <FormInput className="w-16" />
          <FormLabel>Suite Room</FormLabel>
          <FormInput className="w-16" />
        </FormRow>

        <FormRow>
          <FormLabel>City</FormLabel>
          <label className="flex items-center px-3">
            <input
              type="checkbox"
              checked={cityType === "one"}
              onChange={() => setCityType(cityType === "one" ? "" : "one")}
              className="w-4 h-4 accent-[#4a2f1d]"
            />
          </label>
          <span className="bg-[#f6eddc] text-[#4a2f1d] font-bold text-sm px-2 py-2">One City</span>
          <FormInput className="flex-1" placeholder="City Name" />
        </FormRow>

        <FormRow>
          <FormLabel>City</FormLabel>
          <label className="flex items-center px-3">
            <input
              type="checkbox"
              checked={cityType === "multiple"}
              onChange={() => setCityType(cityType === "multiple" ? "" : "multiple")}
              className="w-4 h-4 accent-[#4a2f1d]"
            />
          </label>
          <span className="bg-[#f6eddc] text-[#4a2f1d] font-bold text-sm px-2 py-2">Multiple City</span>
          <FormInput className="flex-1" placeholder="Mention Multiple Cities" />
        </FormRow>

        <FormRow>
          <FormLabel>Domestic Destination</FormLabel>
          <FormInput className="flex-1" placeholder="Mention city names where you would like to do event" />
        </FormRow>

        <FormRow>
          <FormLabel>International Destination</FormLabel>
          <FormInput className="flex-1" placeholder="Mention City & Country names where you would like to do event" />
        </FormRow>

        <FormRow>
          <FormLabel>Hotel Category</FormLabel>
          <FormInput className="flex-1" placeholder="2, 3, 4, 5 hotel" />
          <FormLabel>Approximate Budget per person</FormLabel>
          <FormInput className="flex-1" />
        </FormRow>

        <FormRow>
          <FormLabel>Common Inclusion</FormLabel>
          <FormInput
            className="flex-1"
            placeholder="Airport Transfers, Hotel Stay breakfast lunch dinner, Half day city tour, cover major tours"
          />
        </FormRow>

      </div>
    </div>
    </div>
    </div>
    </div>
    <Footer />

            </>
  );
};

export default EnquiryForm;
