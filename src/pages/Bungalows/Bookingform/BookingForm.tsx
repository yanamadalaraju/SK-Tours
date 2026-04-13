import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Bunglowcheckbox from "../Bungalow_checkbox/Bungalowcheckbox";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import axios from "axios";
import { BASE_URL } from "@/ApiUrls";

interface PersonData {
  name: string;
  age: string;
  cell: string;
  email: string;
}

const BookingForm: React.FC = () => {
  const navigate = useNavigate();
  const [numPeople, setNumPeople] = useState<number>(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [peopleData, setPeopleData] = useState<PersonData[]>([
    { name: "", age: "", cell: "", email: "" },
  ]);

  const [formData, setFormData] = useState({
    bungalow_code: "",
    city: "",
    contact_person: "",
    cell_no: "",
    email_id: "",
    address: "",
    pin_code: "",
    state: "",
    country: "",
  });

  const handleMainChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumPeopleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1;
    setNumPeople(value);

    const data = [...peopleData];

    while (data.length < value)
      data.push({ name: "", age: "", cell: "", email: "" });

    while (data.length > value) data.pop();

    setPeopleData(data);
  };

  const handlePersonChange = (
    index: number,
    field: keyof PersonData,
    value: string
  ) => {
    const data = [...peopleData];
    data[index][field] = value;
    setPeopleData(data);
  };

  const handleReset = () => {
    setNumPeople(1);
    setPeopleData([{ name: "", age: "", cell: "", email: "" }]);
    setFormData({
      bungalow_code: "",
      city: "",
      contact_person: "",
      cell_no: "",
      email_id: "",
      address: "",
      pin_code: "",
      state: "",
      country: "",
    });
  };

  // Handle Book button click - navigate to checkout
  const handleBookClick = () => {
    // Validate required fields before proceeding to checkout
    if (!formData.city) {
      alert("Please enter the city name");
      return;
    }
    if (!formData.bungalow_code) {
      alert("Please enter the bungalow number");
      return;
    }
    if (!formData.contact_person) {
      alert("Please enter contact person name");
      return;
    }
    if (!formData.cell_no) {
      alert("Please enter cell number");
      return;
    }
    if (!formData.email_id) {
      alert("Please enter email ID");
      return;
    }

    // Prepare bungalow data for checkout
    const bungalowData = {
      id: formData.bungalow_code,
      code: formData.bungalow_code,
      title: `Bungalow ${formData.bungalow_code}`,
      city: formData.city,
      address: formData.address,
      state: formData.state,
      country: formData.country,
      pin_code: formData.pin_code,
      contact_person: formData.contact_person,
      cell_no: formData.cell_no,
      email_id: formData.email_id,
      no_of_people: numPeople,
      guests: peopleData,
      type: "bungalow",
      // You can add a price field here if you have pricing logic
      total_price_value: 5000, // Example price - replace with actual pricing logic
    };

    // Save to localStorage for checkout page to access
    localStorage.setItem("selectedBungalow", JSON.stringify(bungalowData));
    
    // Navigate to checkout page
    navigate("/checkout-bungalow", { state: { bungalow: bungalowData } });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        no_of_people: numPeople,
        type: "bungalow",
        guests: peopleData.map((person) => ({
          name: person.name,
          age: person.age,
          cell_no: person.cell,
          email_id: person.email,
        })),
      };

      const response = await axios.post(
        `${BASE_URL}/api/bungalows/bookings`,
        payload
      );

      alert("Booking submitted successfully!");
      console.log(response.data);
      handleReset();
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <>
      <Header />
      <div className="font-sans min-h-screen">
        <div className="bg-[#001f54] text-white font-bold text-2xl md:text-3xl lg:text-4xl py-5 px-4 text-center mb-4 w-full">
          Bungalow Booking
        </div>

        <div className="block md:hidden lg:hidden w-full px-4 md:px-5 mb-5 box-border">
          <Bunglowcheckbox sidebarOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)}/>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-1 p-3 lg:p-3 mx-auto">
          <div className="hidden lg:block min-w-[80px]">
            <Bunglowcheckbox  sidebarOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)}/>
          </div>

          <div className="flex-1 min-w-0">
            <div className="bg-[#f5d38c] p-4 md:p-3 w-full lg:w-[1140px] mx-0 lg:mx-5 h-auto">
              <h2 className="bg-[#b80000] text-white text-center p-2.5 mb-1 w-full text-xl md:text-2xl">
                Booking Form
              </h2>

              <form onSubmit={handleSubmit} className="space-y-1">

                {/* Name of the City & Bungalow */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-1 flex-wrap">
                  <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[180px]">
                    Name of the City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleMainChange}
                    className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px]"
                  />

                  <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[100px]">
                    Bungalow No
                  </label>
                <input
  type="number"
  name="bungalow_code"
  value={formData.bungalow_code}
  onChange={handleMainChange}
  className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px]"
/>
                </div>

                {/* Contact */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-1 flex-wrap">
                  <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[180px]">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    name="contact_person"
                    value={formData.contact_person}
                    onChange={handleMainChange}
                    className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px]"
                  />
                </div>

                {/* Cell & Email */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-1 flex-wrap">
                  <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[120px]">
                    Cell No
                  </label>
                  <input
                    type="number"
                    name="cell_no"
                    value={formData.cell_no}
                    onChange={handleMainChange}
                    className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px]"
                  />

                  <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[120px]">
                    Email ID
                  </label>
                  <input
                    type="email"
                    name="email_id"
                    value={formData.email_id}
                    onChange={handleMainChange}
                    className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px]"
                  />
                </div>

                {/* Address */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-1 flex-wrap">
                  <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[120px]">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleMainChange}
                    className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px]"
                  />
                </div>

                {/* Pin / State / Country */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-1 flex-wrap">
                  <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[80px]">
                    Pin Code
                  </label>
                  <input
                    type="number"
                    name="pin_code"
                    value={formData.pin_code}
                    onChange={handleMainChange}
                    className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px]"
                  />

                  <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[80px]">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleMainChange}
                    className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px]"
                  />

                  <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[80px]">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleMainChange}
                    className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px]"
                  />
                </div>

                {/* No of People */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-1 flex-wrap">
                  <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[120px]">
                    No of People
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={numPeople}
                    onChange={handleNumPeopleChange}
                    className="w-full md:w-[80px] px-2.5 py-1.5 border border-gray-400 h-[35px]"
                  />
                </div>

                {/* DESKTOP TABLE */}
                <table className="hidden md:table w-full border-collapse mt-2.5">
                  <thead>
                    <tr>
                      <th className="bg-[#593c26] text-white p-2 text-left">Name</th>
                      <th className="bg-[#593c26] text-white p-2 text-left">Age</th>
                      <th className="bg-[#593c26] text-white p-2 text-left">Cell No</th>
                      <th className="bg-[#593c26] text-white p-2 text-left">Email ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {peopleData.map((person, idx) => (
                      <tr key={idx}>
                        <td className="p-2 border-b border-gray-300">
                          <input
                            type="text"
                            value={person.name}
                            onChange={(e) =>
                              handlePersonChange(idx, "name", e.target.value)
                            }
                            className="w-full px-3 py-2 h-[35px] border border-gray-400 rounded"
                          />
                         </td>
                        <td className="p-2 border-b border-gray-300">
                          <input
                            type="number"
                            value={person.age}
                            onChange={(e) =>
                              handlePersonChange(idx, "age", e.target.value)
                            }
                            className="w-full px-3 py-2 h-[35px] border border-gray-400 rounded"
                          />
                         </td>
                        <td className="p-2 border-b border-gray-300">
                          <input
                            type="number"
                            value={person.cell}
                            onChange={(e) =>
                              handlePersonChange(idx, "cell", e.target.value)
                            }
                            className="w-full px-3 py-2 h-[35px] border border-gray-400 rounded"
                          />
                         </td>
                        <td className="p-2 border-b border-gray-300">
                          <input
                            type="email"
                            value={person.email}
                            onChange={(e) =>
                              handlePersonChange(idx, "email", e.target.value)
                            }
                            className="w-full px-3 py-2 h-[35px] border border-gray-400 rounded"
                          />
                         </td>
                       </tr>
                    ))}
                  </tbody>
                </table>

                {/* MOBILE VIEW */}
                <div className="block md:hidden w-full mt-2.5 space-y-4">
                  {peopleData.map((person, idx) => (
                    <div key={idx} className="border border-gray-300 p-3 rounded">
                      <h3 className="bg-[#593c26] text-white p-2 mb-3 font-bold">
                        Person {idx + 1}
                      </h3>

                      {["name", "age", "cell", "email"].map((field) => (
                        <div key={field} className="mb-3">
                          <div className="bg-[#593c26] text-white p-2 rounded mb-1 font-bold text-sm capitalize">
                            {field === "cell"
                              ? "Cell No"
                              : field === "email"
                              ? "Email ID"
                              : field}
                          </div>
                          <input
                            type={field === "email" ? "email" : "text"}
                            value={(person as any)[field]}
                            onChange={(e) =>
                              handlePersonChange(
                                idx,
                                field as keyof PersonData,
                                e.target.value
                              )
                            }
                            className="w-full h-[40px] px-3 py-2 border border-gray-400 rounded"
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex flex-col md:flex-row justify-center gap-2.5 mt-4">
                  {/* Reset - Blue */}
                  <button
                    type="button"
                    onClick={handleReset}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-2 w-full md:w-auto"
                  >
                    Reset
                  </button>

                  {/* Submit - Green (Save to database) */}
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-7 py-2 w-full md:w-auto"
                  >
                    Submit
                  </button>

                  {/* Book - Red (Navigate to Checkout) */}
                  <button
                    type="button"
                    onClick={handleBookClick}
                    className="bg-red-600 hover:bg-red-700 text-white px-7 py-2 w-full md:w-auto"
                  >
                    Book
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

export default BookingForm;