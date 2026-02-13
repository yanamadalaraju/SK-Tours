import { useState } from "react";
import Gatewaycheckbox from "../Gatewaycheckbox/Gatewaycheckbox";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Type definitions
interface PersonData {
  name: string;
  age: string;
  cell: string;
  email: string;
}

interface BookingDetails {
  adults: string;
  rooms: string;
  child: string;
}

const WeekendForm: React.FC = () => {
  const [numPeople, setNumPeople] = useState<number>(1);
  const [peopleData, setPeopleData] = useState<PersonData[]>([
    { name: "", age: "", cell: "", email: "" },
    { name: "", age: "", cell: "", email: "" },
    { name: "", age: "", cell: "", email: "" },
  ]);

  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    adults: "",
    rooms: "",
    child: "",
  });

  const handleNumPeopleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = parseInt(e.target.value) || 0;
    setNumPeople(value);
    const data = [...peopleData];
    while (data.length < value) data.push({ name: "", age: "", cell: "", email: "" });
    while (data.length > value) data.pop();
    setPeopleData(data);
  };

  const handlePersonChange = (index: number, field: keyof PersonData, value: string): void => {
    const data = [...peopleData];
    data[index][field] = value;
    setPeopleData(data);
  };

  const handleBookingDetailChange = (field: keyof BookingDetails, value: string): void => {
    setBookingDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleReset = (): void => {
    setNumPeople(1);
    setPeopleData([{ name: "", age: "", cell: "", email: "" }]);
    setBookingDetails({
      adults: "",
      rooms: "",
      child: "",
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log({
      numPeople,
      peopleData,
      bookingDetails,
    });
    alert("Booking submitted!");
  };

  return (
    <>
      <Header />
      <div className="min-h-screen">
        {/* Header */}
        <div className="bg-[#001f54] text-white font-bold text-2xl md:text-3xl lg:text-4xl p-4 md:p-5 text-center w-full">
          Weekend Gateway
        </div>

        {/* Horizontal Checkbox Section for Tablet/Mobile */}
        <div className="block md:hidden w-full px-4 md:px-5 mb-5 box-border">
          <Gatewaycheckbox />
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-5 p-4 md:p-5 mx-auto">
          {/* Left Side - Checkbox Section for Desktop */}
          <div className="hidden md:block flex-none w-[200px] lg:w-[250px] min-w-[200px]">
            <Gatewaycheckbox />
          </div>

          {/* Right Side - Form Section */}
          <div className="flex-1 min-w-0">
            <div className="bg-[#f5d38c] p-4 md:p-5 h-auto md:h-[660px] w-full md:w-[1100px] mx-0 md:mx-2.5 font-sans">
              <h2 className="bg-[#b80000] text-white text-center p-2.5 mb-5 w-full text-xl md:text-2xl">
                Booking Form
              </h2>
              <form onSubmit={handleSubmit} className="space-y-2.5">
                {/* Property Name and City */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2.5 flex-wrap">
                  <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[120px]">
                    Name of the Property
                  </label>
                  <input type="text" className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px] box-border" />
                  <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[120px]">
                    City
                  </label>
                  <input type="text" className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px] box-border" />
                </div>

                {/* Person Name */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2.5 flex-wrap">
                  <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[120px]">
                    Person Name
                  </label>
                  <input type="text" className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px] box-border" />
                </div>

                {/* Cell No and Email */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2.5 flex-wrap">
                  <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[120px]">
                    Cell No
                  </label>
                  <input type="text" className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px] box-border" />
                  <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[120px]">
                    Email ID
                  </label>
                  <input type="email" className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px] box-border" />
                </div>

                {/* Address */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2.5 flex-wrap">
                  <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[120px]">
                    Address
                  </label>
                  <input type="text" className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px] box-border" />
                </div>

                {/* City, Pin Code, State, Country */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2.5 flex-wrap">
                  <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[120px] md:min-w-[80px]">
                    City
                  </label>
                  <input type="text" className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px] box-border min-w-[100px]" />
                  <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[120px] md:min-w-[80px]">
                    Pin Code
                  </label>
                  <input type="text" className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px] box-border min-w-[100px]" />
                  <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[120px] md:min-w-[80px]">
                    State
                  </label>
                  <input type="text" className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px] box-border min-w-[100px]" />
                  <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[120px] md:min-w-[80px]">
                    Country
                  </label>
                  <input type="text" className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px] box-border min-w-[100px]" />
                </div>

                {/* No of Adults, Rooms, Child */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2.5 flex-wrap">
                  <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[120px]">
                    No of Adults
                  </label>
                  <input
                    type="text"
                    value={bookingDetails.adults}
                    onChange={(e) => handleBookingDetailChange("adults", e.target.value)}
                    className="w-full md:w-[80px] px-2.5 py-1.5 border border-gray-400 h-[35px] box-border flex-none text-center"
                  />

                  <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[120px]">
                    No of Rooms
                  </label>
                  <input
                    type="text"
                    value={bookingDetails.rooms}
                    onChange={(e) => handleBookingDetailChange("rooms", e.target.value)}
                    className="w-full md:w-[80px] px-2.5 py-1.5 border border-gray-400 h-[35px] box-border flex-none text-center"
                  />

                  <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[120px]">
                    No of Child
                  </label>
                  <input
                    type="text"
                    value={bookingDetails.child}
                    onChange={(e) => handleBookingDetailChange("child", e.target.value)}
                    className="w-full md:w-[80px] px-2.5 py-1.5 border border-gray-400 h-[35px] box-border flex-none text-center"
                  />
                </div>

                {/* Table for Mobile/Desktop */}
                <div className="w-full mt-2.5">
                  {/* Desktop Table */}
                  <table className="hidden md:table w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="bg-[#593c26] text-white p-2 text-left w-[30%]">Name</th>
                        <th className="bg-[#593c26] text-white p-2 text-left w-[15%]">Age</th>
                        <th className="bg-[#593c26] text-white p-2 text-left w-[20%]">Cell No</th>
                        <th className="bg-[#593c26] text-white p-2 text-left w-[35%]">Email ID</th>
                      </tr>
                    </thead>
                    <tbody>
                      {peopleData.map((person, idx) => (
                        <tr key={idx}>
                          <td className="p-2 border-b border-gray-300">
                            <input
                              type="text"
                              value={person.name}
                              onChange={(e) => handlePersonChange(idx, "name", e.target.value)}
                              className="w-full px-3 py-2 h-[35px] border border-gray-400 rounded box-border"
                            />
                          </td>
                          <td className="p-2 border-b border-gray-300">
                            <input
                              type="text"
                              value={person.age}
                              onChange={(e) => handlePersonChange(idx, "age", e.target.value)}
                              className="w-full px-3 py-2 h-[35px] border border-gray-400 rounded box-border"
                            />
                          </td>
                          <td className="p-2 border-b border-gray-300">
                            <input
                              type="text"
                              value={person.cell}
                              onChange={(e) => handlePersonChange(idx, "cell", e.target.value)}
                              className="w-full px-3 py-2 h-[35px] border border-gray-400 rounded box-border"
                            />
                          </td>
                          <td className="p-2 border-b border-gray-300">
                            <input
                              type="email"
                              value={person.email}
                              onChange={(e) => handlePersonChange(idx, "email", e.target.value)}
                              className="w-full px-3 py-2 h-[35px] border border-gray-400 rounded box-border"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Mobile Card View */}
                  <div className="block md:hidden space-y-4">
                    {peopleData.map((person, idx) => (
                      <div key={idx} className="w-full mb-4">
                        <div className="space-y-3">
                          <div>
                            <div className="bg-[#593c26] text-white p-2.5 rounded mb-2 font-bold">
                              Name
                            </div>
                            <input
                              type="text"
                              value={person.name}
                              onChange={(e) => handlePersonChange(idx, "name", e.target.value)}
                              className="w-full h-[45px] px-3 py-2 border border-gray-400 rounded box-border text-base"
                            />
                          </div>
                          <div>
                            <div className="bg-[#593c26] text-white p-2.5 rounded mb-2 font-bold">
                              Age
                            </div>
                            <input
                              type="text"
                              value={person.age}
                              onChange={(e) => handlePersonChange(idx, "age", e.target.value)}
                              className="w-full h-[45px] px-3 py-2 border border-gray-400 rounded box-border text-base"
                            />
                          </div>
                          <div>
                            <div className="bg-[#593c26] text-white p-2.5 rounded mb-2 font-bold">
                              Cell No
                            </div>
                            <input
                              type="text"
                              value={person.cell}
                              onChange={(e) => handlePersonChange(idx, "cell", e.target.value)}
                              className="w-full h-[45px] px-3 py-2 border border-gray-400 rounded box-border text-base"
                            />
                          </div>
                          <div>
                            <div className="bg-[#593c26] text-white p-2.5 rounded mb-2 font-bold">
                              Email ID
                            </div>
                            <input
                              type="email"
                              value={person.email}
                              onChange={(e) => handlePersonChange(idx, "email", e.target.value)}
                              className="w-full h-[45px] px-3 py-2 border border-gray-400 rounded box-border text-base"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col md:flex-row justify-center gap-2.5 mt-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded cursor-pointer w-full md:w-auto"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded cursor-pointer w-full md:w-auto"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WeekendForm;