import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Gatewaycheckbox from "../Gatewaycheckbox/Gatewaycheckbox";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import axios from "axios";
import { BASE_URL } from "@/ApiUrls";

// Type definitions
interface PersonData {
  name: string;
  age: string;
  cell: string;
  email: string;
}

interface WeekendFormData {
  property_name: string;
  city: string;
  person_name: string;
  cell_no: string;
  email_id: string;
  address: string;
  city_location: string;
  pin_code: string;
  state: string;
  country: string;
  no_of_adults: string;
  no_of_rooms: string;
  no_of_child: string;
  type: string;
}

const WeekendForm: React.FC = () => {
  const navigate = useNavigate();
  const [numChildren, setNumChildren] = useState<number>(0);
  const [numAdults, setNumAdults] = useState<number>(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const [childrenData, setChildrenData] = useState<PersonData[]>([]);
  const [adultsData, setAdultsData] = useState<PersonData[]>([
    { name: "", age: "", cell: "", email: "" }
  ]);
  
  const [formData, setFormData] = useState<WeekendFormData>({
    property_name: "",
    city: "",
    person_name: "",
    cell_no: "",
    email_id: "",
    address: "",
    city_location: "",
    pin_code: "",
    state: "",
    country: "India",
    no_of_adults: "",
    no_of_rooms: "",
    no_of_child: "",
    type: "weekend",
  });

  const handleMainChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumChildrenChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setNumChildren(value);

    const data = [...childrenData];
    while (data.length < value)
      data.push({ name: "", age: "", cell: "", email: "" });
    while (data.length > value) data.pop();
    setChildrenData(data);
    
    setFormData((prev) => ({
      ...prev,
      no_of_child: value.toString()
    }));
  };

  const handleNumAdultsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setNumAdults(value);

    const data = [...adultsData];
    while (data.length < value)
      data.push({ name: "", age: "", cell: "", email: "" });
    while (data.length > value) data.pop();
    setAdultsData(data);
    
    setFormData((prev) => ({
      ...prev,
      no_of_adults: value.toString()
    }));
  };

  const handleChildChange = (
    index: number,
    field: keyof PersonData,
    value: string
  ) => {
    const data = [...childrenData];
    data[index][field] = value;
    setChildrenData(data);
  };

  const handleAdultChange = (
    index: number,
    field: keyof PersonData,
    value: string
  ) => {
    const data = [...adultsData];
    data[index][field] = value;
    setAdultsData(data);
  };

  const handleReset = () => {
    setNumChildren(0);
    setNumAdults(1);
    setAdultsData([{ name: "", age: "", cell: "", email: "" }]);
    setChildrenData([]);
    setFormData({
      property_name: "",
      city: "",
      person_name: "",
      cell_no: "",
      email_id: "",
      address: "",
      city_location: "",
      pin_code: "",
      state: "",
      country: "India",
      no_of_adults: "",
      no_of_rooms: "",
      no_of_child: "",
      type: "weekend",
    });
  };

  // Handle Book button click - navigate to checkout
  const handleBookClick = () => {
    // Validate required fields before proceeding to checkout
    if (!formData.property_name) {
      alert("Please enter the property name");
      return;
    }
    if (!formData.city) {
      alert("Please enter the city");
      return;
    }
    if (!formData.person_name) {
      alert("Please enter person name");
      return;
    }
    if (!formData.cell_no) {
      alert("Please enter cell number");
      return;
    }
    if (!formData.no_of_rooms) {
      alert("Please enter number of rooms");
      return;
    }
    
    // Validate at least one adult has name and age
    const hasValidAdult = adultsData.some(person => person.name && person.age);
    if (!hasValidAdult) {
      alert("Please enter at least one adult with name and age");
      return;
    }

    // Calculate total number of people
    const totalPeople = numAdults + numChildren;
    
    // Combine all guests
    const allGuests = [
      ...adultsData.map((person, idx) => ({
        name: person.name,
        age: person.age,
        cell: person.cell,
        email: person.email,
        type: 'adult'
      })),
      ...childrenData.map((person, idx) => ({
        name: person.name,
        age: person.age,
        cell: person.cell,
        email: person.email,
        type: 'child'
      }))
    ];

    // Calculate price based on number of rooms and adults
    // Base price per room per night (example pricing)
    const basePricePerRoom = 3500;
    const totalPrice = parseInt(formData.no_of_rooms) * basePricePerRoom;

    // Prepare Weekend Gateway data for checkout
    const weekendData = {
      id: formData.property_name.replace(/\s/g, '_').toLowerCase(),
      code: `WG${Date.now()}`,
      title: `Weekend Gateway at ${formData.property_name}`,
      property_name: formData.property_name,
      city: formData.city,
      address: formData.address,
      city_location: formData.city_location,
      state: formData.state,
      country: formData.country || "India",
      pin_code: formData.pin_code,
      contact_person: formData.person_name,
      cell_no: formData.cell_no,
      email_id: formData.email_id,
      no_of_adults: numAdults,
      no_of_children: numChildren,
      no_of_rooms: parseInt(formData.no_of_rooms),
      total_people: totalPeople,
      guests: allGuests,
      type: "weekend",
      total_price_value: totalPrice,
      price_per_room: basePricePerRoom
    };

    // Save to localStorage for checkout page to access
    localStorage.setItem("selectedWeekend", JSON.stringify(weekendData));
    
    // Navigate to checkout page
    navigate("/checkout-weekend", { state: { weekend: weekendData } });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {    
      const payload = {
        bungalow_code: formData.property_name,  
        city: formData.city,
        contact_person: formData.person_name,   
        cell_no: formData.cell_no,
        email_id: formData.email_id,
        address: formData.address,
        pin_code: formData.pin_code,
        state: formData.state,
        country: formData.country,
        no_of_adults: numAdults.toString(), 
        no_of_child: numChildren.toString(), 
        no_of_rooms: formData.no_of_rooms, 
        city_location: formData.city_location,
        type: formData.type,  
        guests: [
          ...adultsData.map((person) => ({
            name: person.name,
            age: person.age,
            cell_no: person.cell || null,
            email_id: person.email || null,
            guest_type: 'adult'
          })),
          ...childrenData.map((person) => ({
            name: person.name,
            age: person.age,
            cell_no: person.cell || null,
            email_id: person.email || null,
            guest_type: 'child'
          }))
        ]
      };

      const response = await axios.post(
        `${BASE_URL}/api/bungalows/weekend-gateways/bookings`,
        payload
      );

      alert("Weekend booking submitted successfully!");
      console.log(response.data);
      handleReset();
    } catch (error: any) {
      console.error("Error submitting form:", error);
      alert(error.response?.data?.error || "Something went wrong");
    }
  };
  
  return (
    <>
      <Header />
      <div className="min-h-screen">
        {/* Header */}
        <div className="bg-[#001f54] text-white font-bold text-2xl md:text-3xl lg:text-4xl p-1 md:p-5 text-center w-full">
          Weekend Gateway
        </div>

        {/* Horizontal Checkbox Section for Tablet/Mobile */}
        <div className="block md:hidden w-full px-1 md:px-5 mb-5 box-border">
         <Gatewaycheckbox sidebarOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-5 p-4 md:p-5 mx-auto">
          <div className="hidden md:block flex-none w-[200px] lg:w-[250px] min-w-[200px]">
          <Gatewaycheckbox sidebarOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
          </div>

          <div className="flex-1 min-w-0 md:ml-[60px]">
            <div className="bg-[#f5d38c] p-1 md:p-5 h-auto w-full md:w-[1140px] mx-0 md:mx-2.5 font-sans">
              <h2 className="bg-[#b80000] text-white text-center p-2.5 mb-5 w-full text-xl md:text-2xl">
                Booking Form
              </h2>
              <form onSubmit={handleSubmit} className="space-y-1">
                <input type="hidden" name="type" value={formData.type} />
                
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2.5 flex-wrap">
                  <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[120px]">
                    Name of the Property
                  </label>
                  <input
                    type="text"
                    name="property_name"
                    value={formData.property_name}
                    onChange={handleMainChange}
                    className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px] box-border"
                    required
                  />
                  <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[120px]">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleMainChange}
                    className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px] box-border"
                    required
                  />
                </div>

                {/* Person Name */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2.5 flex-wrap">
                  <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[120px]">
                    Person Name
                  </label>
                  <input
                    type="text"
                    name="person_name"
                    value={formData.person_name}
                    onChange={handleMainChange}
                    className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px] box-border"
                    required
                  />
                </div>

                {/* Cell No and Email */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2.5 flex-wrap">
                  <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[120px]">
                    Cell No
                  </label>
                  <input
                    type="text"
                    name="cell_no"
                    value={formData.cell_no}
                    onChange={handleMainChange}
                    className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px] box-border"
                    required
                  />
                  <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[120px]">
                    Email ID
                  </label>
                  <input
                    type="email"
                    name="email_id"
                    value={formData.email_id}
                    onChange={handleMainChange}
                    className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px] box-border"
                  />
                </div>

                {/* Address */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2.5 flex-wrap">
                  <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[120px]">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleMainChange}
                    className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px] box-border"
                  />
                </div>

                {/* City, Pin Code, State, Country */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2.5 flex-wrap">
                  <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[120px] md:min-w-[80px]">
                    City Location
                  </label>
                  <input
                    type="text"
                    name="city_location"
                    value={formData.city_location}
                    onChange={handleMainChange}
                    className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px] box-border min-w-[100px]"
                  />
                  <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[120px] md:min-w-[80px]">
                    Pin Code
                  </label>
                  <input
                    type="text"
                    name="pin_code"
                    value={formData.pin_code}
                    onChange={handleMainChange}
                    className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px] box-border min-w-[100px]"
                  />
                  <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[120px] md:min-w-[80px]">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleMainChange}
                    className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px] box-border min-w-[100px]"
                  />
                  <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[120px] md:min-w-[80px]">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleMainChange}
                    className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px] box-border min-w-[100px]"
                  />
                </div>

                {/* No of Adults, Rooms, Child */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2.5 flex-wrap">
                  <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[120px]">
                    No of Adults
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={numAdults}
                    onChange={handleNumAdultsChange}
                    className="w-full md:w-[80px] px-2.5 py-1.5 border border-gray-400 h-[35px] box-border flex-none text-center"
                    required
                  />

                  <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[120px]">
                    No of Rooms
                  </label>
                  <input
                    type="number"
                    name="no_of_rooms"
                    value={formData.no_of_rooms}
                    onChange={handleMainChange}
                    className="w-full md:w-[80px] px-2.5 py-1.5 border border-gray-400 h-[35px] box-border flex-none text-center"
                    required
                  />

                  <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[120px]">
                    No of Child
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={numChildren}
                    onChange={handleNumChildrenChange}
                    className="w-full md:w-[80px] px-2.5 py-1.5 border border-gray-400 h-[35px] box-border flex-none text-center"
                  />
                </div>

                {/* Adults Table/Cards */}
                {numAdults > 0 && (
                  <div className="w-full mt-5">
                    <h3 className="bg-[#593c26] text-white p-2 mb-3 font-bold text-lg">
                      Adults Details
                    </h3>
                    
                    {/* Desktop Table for Adults */}
                    <table className="hidden md:table w-full border-collapse mb-5">
                      <thead>
                        <tr>
                          <th className="bg-[#593c26] text-white p-2 text-left w-[30%]">Name</th>
                          <th className="bg-[#593c26] text-white p-2 text-left w-[15%]">Age</th>
                          <th className="bg-[#593c26] text-white p-2 text-left w-[20%]">Cell No</th>
                          <th className="bg-[#593c26] text-white p-2 text-left w-[35%]">Email ID</th>
                        </tr>
                      </thead>
                      <tbody>
                        {adultsData.map((person, idx) => (
                          <tr key={idx}>
                            <td className="p-2 border-b border-gray-300">
                              <input
                                type="text"
                                value={person.name}
                                onChange={(e) => handleAdultChange(idx, "name", e.target.value)}
                                className="w-full px-3 py-2 h-[35px] border border-gray-400 rounded box-border"
                                required
                              />
                            </td>
                            <td className="p-2 border-b border-gray-300">
                              <input
                                type="number"
                                value={person.age}
                                onChange={(e) => handleAdultChange(idx, "age", e.target.value)}
                                className="w-full px-3 py-2 h-[35px] border border-gray-400 rounded box-border"
                                required
                              />
                            </td>
                            <td className="p-2 border-b border-gray-300">
                              <input
                                type="text"
                                value={person.cell}
                                onChange={(e) => handleAdultChange(idx, "cell", e.target.value)}
                                className="w-full px-3 py-2 h-[35px] border border-gray-400 rounded box-border"
                              />
                            </td>
                            <td className="p-2 border-b border-gray-300">
                              <input
                                type="email"
                                value={person.email}
                                onChange={(e) => handleAdultChange(idx, "email", e.target.value)}
                                className="w-full px-3 py-2 h-[35px] border border-gray-400 rounded box-border"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Mobile Card View for Adults */}
                    <div className="block md:hidden space-y-4 mb-5">
                      {adultsData.map((person, idx) => (
                        <div key={idx} className="w-full mb-4 border border-gray-300 p-3 rounded">
                          <h3 className="bg-[#593c26] text-white p-2 mb-3 font-bold">
                            Adult {idx + 1}
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <div className="bg-[#593c26] text-white p-2.5 rounded mb-2 font-bold">
                                Name
                              </div>
                              <input
                                type="text"
                                value={person.name}
                                onChange={(e) => handleAdultChange(idx, "name", e.target.value)}
                                className="w-full h-[45px] px-3 py-2 border border-gray-400 rounded box-border text-base"
                                required
                              />
                            </div>
                            <div>
                              <div className="bg-[#593c26] text-white p-2.5 rounded mb-2 font-bold">
                                Age
                              </div>
                              <input
                                type="number"
                                value={person.age}
                                onChange={(e) => handleAdultChange(idx, "age", e.target.value)}
                                className="w-full h-[45px] px-3 py-2 border border-gray-400 rounded box-border text-base"
                                required
                              />
                            </div>
                            <div>
                              <div className="bg-[#593c26] text-white p-2.5 rounded mb-2 font-bold">
                                Cell No
                              </div>
                              <input
                                type="text"
                                value={person.cell}
                                onChange={(e) => handleAdultChange(idx, "cell", e.target.value)}
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
                                onChange={(e) => handleAdultChange(idx, "email", e.target.value)}
                                className="w-full h-[45px] px-3 py-2 border border-gray-400 rounded box-border text-base"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Children Table/Cards */}
                {numChildren > 0 && (
                  <div className="w-full mt-5">
                    <h3 className="bg-[#593c26] text-white p-2 mb-3 font-bold text-lg">
                      Children Details
                    </h3>
                    
                    {/* Desktop Table for Children */}
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
                        {childrenData.map((person, idx) => (
                          <tr key={idx}>
                            <td className="p-2 border-b border-gray-300">
                              <input
                                type="text"
                                value={person.name}
                                onChange={(e) => handleChildChange(idx, "name", e.target.value)}
                                className="w-full px-3 py-2 h-[35px] border border-gray-400 rounded box-border"
                                required
                              />
                            </td>
                            <td className="p-2 border-b border-gray-300">
                              <input
                                type="number"
                                value={person.age}
                                onChange={(e) => handleChildChange(idx, "age", e.target.value)}
                                className="w-full px-3 py-2 h-[35px] border border-gray-400 rounded box-border"
                                required
                              />
                            </td>
                            <td className="p-2 border-b border-gray-300">
                              <input
                                type="text"
                                value={person.cell}
                                onChange={(e) => handleChildChange(idx, "cell", e.target.value)}
                                className="w-full px-3 py-2 h-[35px] border border-gray-400 rounded box-border"
                              />
                            </td>
                            <td className="p-2 border-b border-gray-300">
                              <input
                                type="email"
                                value={person.email}
                                onChange={(e) => handleChildChange(idx, "email", e.target.value)}
                                className="w-full px-3 py-2 h-[35px] border border-gray-400 rounded box-border"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Mobile Card View for Children */}
                    <div className="block md:hidden space-y-4">
                      {childrenData.map((person, idx) => (
                        <div key={idx} className="w-full mb-4 border border-gray-300 p-3 rounded">
                          <h3 className="bg-[#593c26] text-white p-2 mb-3 font-bold">
                            Child {idx + 1}
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <div className="bg-[#593c26] text-white p-2.5 rounded mb-2 font-bold">
                                Name
                              </div>
                              <input
                                type="text"
                                value={person.name}
                                onChange={(e) => handleChildChange(idx, "name", e.target.value)}
                                className="w-full h-[45px] px-3 py-2 border border-gray-400 rounded box-border text-base"
                                required
                              />
                            </div>
                            <div>
                              <div className="bg-[#593c26] text-white p-2.5 rounded mb-2 font-bold">
                                Age
                              </div>
                              <input
                                type="number"
                                value={person.age}
                                onChange={(e) => handleChildChange(idx, "age", e.target.value)}
                                className="w-full h-[45px] px-3 py-2 border border-gray-400 rounded box-border text-base"
                                required
                              />
                            </div>
                            <div>
                              <div className="bg-[#593c26] text-white p-2.5 rounded mb-2 font-bold">
                                Cell No
                              </div>
                              <input
                                type="text"
                                value={person.cell}
                                onChange={(e) => handleChildChange(idx, "cell", e.target.value)}
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
                                onChange={(e) => handleChildChange(idx, "email", e.target.value)}
                                className="w-full h-[45px] px-3 py-2 border border-gray-400 rounded box-border text-base"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
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

export default WeekendForm;