import { useState, ChangeEvent, FormEvent } from "react";
import Sidebar from "./Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EnquiryForm = () => {
  const [numPeople, setNumPeople] = useState<number>(1);
  const [cityType, setCityType] = useState<"one" | "multiple" | "">("");

  const handleNumPeopleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setNumPeople(value);
  };

  const handleReset = () => {
    setNumPeople(1);
    setCityType("");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("Enquiry submitted!");
  };

  return (
    <div className="font-sans min-h-screen">
      <Header />

      <div className="main-layout flex w-full gap-10 p-5">
        {/* Sidebar */}
        <div className="w-64">
          <Sidebar />
        </div>

        <div className="flex-1 min-w-0">
          <div className="bg-[#f5d38c] p-2 md:p-3 w-full h-auto">
            {/* Header */}
            <h2 className="bg-[#b80000] text-white text-center p-2.5 mb-1 w-full text-xl md:text-2xl">
              Enquiry Form
            </h2>

            <form onSubmit={handleSubmit} className="space-y-1">
              {/* Name of Company and Reference No */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-1 flex-wrap">
                <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[120px]">
                  Name of the Company
                </label>
                <input type="text" className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px] box-border" />

                <label className="bg-[#593c26] text-white text-center px-2.5 py-1.5 min-w-[120px]">
                  Reference No
                </label>
                <input
                  type="text"
                  value="MICE00001"
                  readOnly
                  className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px] box-border bg-gray-100"
                />
              </div>

              {/* Contact Person */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-1 flex-wrap">
                <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[180px]">
                  Contact Person
                </label>
                <input type="text" className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px] box-border" />
              </div>

              {/* Cell No and Email */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-1 flex-wrap">
                <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[120px]">
                  Cell No
                </label>
                <input type="text" className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px] box-border" />

                <label className="bg-[#593c26] text-white text-center px-2.5 py-1.5 min-w-[120px]">
                  Email ID
                </label>
                <input type="email" className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px] box-border" />
              </div>

              {/* City, Pin Code, State, Country */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-1 flex-wrap">
                <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[80px] md:min-w-[80px]">
                  City
                </label>
                <input type="text" className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px] box-border min-w-[100px]" />

                <label className="bg-[#593c26] text-white text-center px-2.5 py-1.5 min-w-[120px] md:min-w-[80px]">
                  Pin Code
                </label>
                <input type="text" className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px] box-border min-w-[100px]" />

                <label className="bg-[#593c26] text-white  text-center px-2.5 py-1.5 min-w-[120px] md:min-w-[80px]">
                  State
                </label>
                <input type="text" className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px] box-border min-w-[100px]" />

                <label className="bg-[#593c26] text-white text-center px-2.5 py-1.5 min-w-[120px] md:min-w-[80px]">
                  Country
                </label>
                <input type="text" className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px] box-border min-w-[100px]" />
              </div>

              {/* No of People and Rooms */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-1 flex-wrap">
                <label className="bg-[#593c26] text-white text-center px-2.5 py-1.5 min-w-[90px]">
                  No of People
                </label>
                <input
                  type="number"
                  min={1}
                  value={numPeople}
                  onChange={handleNumPeopleChange}
                  className="w-full md:w-[90px] px-2.5 py-1.5 border border-gray-400 h-[37px] box-border flex-none"
                />

                <label className="bg-[#593c26] text-white text-center px-2.5 py-1.5 min-w-[70px]">
                  No of Rooms
                </label>
                <input
                  type="number"
                  min={1}
                  className="w-full md:w-[90px] px-2.5 py-1.5 border border-gray-400 h-[35px] box-border flex-none"
                />

                <label className="bg-[#593c26] text-white text-center px-2.5 py-1.5 min-w-[90px]">
                  Single
                </label>
                <input
                  type="number"
                  min={0}
                  className="w-full md:w-[80px] px-2.5 py-1.5 border border-gray-400 h-[35px] box-border"
                />

                <label className="bg-[#593c26] text-white text-center px-2.5 py-1.5 min-w-[80px]">
                  Double
                </label>
                <input
                  type="number"
                  min={0}
                  className="w-full md:w-[90px] px-2.5 py-1.5 border border-gray-400 h-[35px] box-border"
                />

                <label className="bg-[#593c26] text-white text-center px-2.5 py-1.5 min-w-[90px]">
                  Triple
                </label>
                <input
                  type="number"
                  min={0}
                  className="w-full md:w-[90px] px-2.5 py-1.5 border border-gray-400 h-[35px] box-border"
                />

                <label className="bg-[#593c26] text-white text-center px-2.5 py-1.5 min-w-[90px]">
                  Suite Room
                </label>
                <input
                  type="number"
                  min={0}
                  className="w-full md:w-[90px] px-2.5 py-1.5 border border-gray-400 h-[35px] box-border"
                />
              </div>

              {/* City - One City */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-1 flex-wrap">
                <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[80px] text-center">
                  City
                </label>
                
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={cityType === "one"}
                    onChange={() => setCityType(cityType === "one" ? "" : "one")}
                    className="w-4 h-4 accent-[#593c26]"
                  />
                 <label className="bg-[#593c26] text-white text-center px-2.5 py-1.5 min-w-[115px]">One City
                  </label>
                </div>
                
                <input
                  type="text"
                  disabled={cityType !== "one"}
                  placeholder="City Name"
                  className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px] box-border disabled:bg-gray-100"
                />
              </div>

              {/* City - Multiple City */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-1 flex-wrap">
                <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[80px]">
                  City
                </label>
                
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={cityType === "multiple"}
                    onChange={() => setCityType(cityType === "multiple" ? "" : "multiple")}
                    className="w-4 h-4 accent-[#593c26]"
                  />
                   <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[115px]">Multiple City
                  </label>
                </div>
                
                <input
                  type="text"
                  disabled={cityType !== "multiple"}
                  placeholder="Mention Multiple Cities"
                  className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px] box-border disabled:bg-gray-100"
                />
              </div>

              {/* Domestic Destination */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-1 flex-wrap">
                <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[220px]">
                  Domestic Destination
                </label>
                <input
                  type="text"
                  placeholder="Mention city names where you would like to do event"
                  className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px] box-border"
                />
              </div>

              {/* International Destination */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-1 flex-wrap">
                <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[220px]">
                  International Destination
                </label>
                <input
                  type="text"
                  placeholder="Mention City & Country names where you would like to do event"
                  className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px] box-border"
                />
              </div>

              {/* Hotel Category and Budget */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-1 flex-wrap">
                <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[220px]">
                  Hotel Category
                </label>
                <input
                  type="text"
                  placeholder="2, 3, 4, 5 hotel"
                  className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px] box-border"
                />

                <label className="bg-[#593c26] text-white text-center px-2.5 py-1.5 min-w-[120px]">
                  Approximate Budget per person
                </label>
                <input
                  type="text"
                  className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px] box-border"
                />
              </div>

              {/* Common Inclusion */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-1 flex-wrap">
                <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[220px]">
                  Common Inclusion
                </label>
                <input
                  type="text"
                  placeholder="Airport Transfers, Hotel Stay breakfast lunch dinner, Half day city tour, cover major tours"
                  className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px] box-border"
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col md:flex-row justify-center gap-2.5 mt-5">
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2  cursor-pointer w-full md:w-auto"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2  cursor-pointer w-full md:w-auto"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EnquiryForm;