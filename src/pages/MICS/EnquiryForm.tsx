import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BASE_URL } from "@/ApiUrls";

interface FormData {
  company_name: string;
  reference_no: string;
  contact_person: string;
  cell_no: string;
  email: string;
  city: string;
  pin_code: string;
  state: string;
  country: string;
  num_people: number;
  num_rooms: number;
  single_room: number;
  double_room: number;
  triple_room: number;
  suite_room: number;
  city_type: "one" | "multiple" | "";
  city_name: string;
  domestic_destination: string;
  international_destination: string;
  hotel_category: string;
  budget: string;
  common_inclusion: string;
}

const EnquiryForm = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [formData, setFormData] = useState<FormData>({
    company_name: "",
    reference_no: "",
    contact_person: "",
    cell_no: "",
    email: "",
    city: "",
    pin_code: "",
    state: "",
    country: "",
    num_people: 1,
    num_rooms: 1,
    single_room: 0,
    double_room: 0,
    triple_room: 0,
    suite_room: 0,
    city_type: "",
    city_name: "",
    domestic_destination: "",
    international_destination: "",
    hotel_category: "",
    budget: "",
    common_inclusion: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value
    }));
  };

  const handleNumPeopleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1;
    setFormData(prev => ({ ...prev, num_people: value }));
  };

  const handleNumRoomsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1;
    setFormData(prev => ({ ...prev, num_rooms: value }));
  };

  const handleCityTypeChange = (type: "one" | "multiple") => {
    setFormData(prev => ({
      ...prev,
      city_type: prev.city_type === type ? "" : type,
      city_name: ""
    }));
  };

  const handleReset = () => {
    setFormData({
      company_name: "",
      reference_no: "",
      contact_person: "",
      cell_no: "",
      email: "",
      city: "",
      pin_code: "",
      state: "",
      country: "",
      num_people: 1,
      num_rooms: 1,
      single_room: 0,
      double_room: 0,
      triple_room: 0,
      suite_room: 0,
      city_type: "",
      city_name: "",
      domestic_destination: "",
      international_destination: "",
      hotel_category: "",
      budget: "",
      common_inclusion: ""
    });
    setSubmitStatus(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(`${BASE_URL}/api/mice/enquiry-form`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit enquiry');
      }

      setSubmitStatus({ type: 'success', message: 'Enquiry submitted successfully!' });
      window.alert('Enquiry submitted successfully!');
      handleReset();
      
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: error instanceof Error ? error.message : 'Failed to submit enquiry' 
      });
      window.alert(error instanceof Error ? error.message : 'Failed to submit enquiry');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-sans min-h-screen  bg-[#FFEBEE]">
      <Header />

      <div className="main-layout flex flex-col md:flex-row w-full gap-5 p-5">
        {/* Sidebar - Always visible, responsive width */}
        <div className="w-full md:w-auto">
          <Sidebar />
        </div>

        <div className="flex-1 min-w-0">
          <div className="bg-[#f5d38c] p-2 md:p-3 w-full h-auto">
            {/* Header */}
            <h2 className="bg-[#b80000] text-white text-center p-2.5 mb-1 w-full text-xl md:text-2xl">
              Enquiry Form
            </h2>

            {/* Status Message */}
            {submitStatus && (
              <div className={`mb-4 p-3 text-center ${
                submitStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {submitStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-1">
              {/* Name of Company and Reference No */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-1 flex-wrap">
                <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[120px] w-full md:w-auto">
                  Name of the Company
                </label>
                <input 
                  type="text" 
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleInputChange}
                  className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px] box-border w-full md:w-auto"
                  required
                />

                {/* <label className="bg-[#593c26] text-white text-center px-2.5 py-1.5 min-w-[120px] w-full md:w-auto mt-2 md:mt-0">
                  Reference No
                </label>
                <input
                  type="text"
                  name="reference_no"
                  value={formData.reference_no}
                  onChange={handleInputChange}
                  className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px] box-border bg-gray-100 w-full md:w-auto"
                  required
                /> */}
              </div>
<div className="flex items-center gap-2 flex-wrap">
  {/* Contact Person */}
  <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[150px]">
    Contact Person
  </label>
  <input
    type="text"
    name="contact_person"
    value={formData.contact_person}
    onChange={handleInputChange}
    className="px-2.5 py-1.5 border border-gray-400 h-[35px] flex-1 min-w-[150px]"
    required
  />

  {/* Cell No */}
  <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[100px]">
    Cell No
  </label>
  <input
    type="number"
    name="cell_no"
    value={formData.cell_no}
    onChange={handleInputChange}
    className="px-2.5 py-1.5 border border-gray-400 h-[35px] flex-1 min-w-[120px]"
    required
  />

  {/* Email ID */}
  <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[120px]">
    Email ID
  </label>
  <input
    type="email"
    name="email"
    value={formData.email}
    onChange={handleInputChange}
    className="px-2.5 py-1.5 border border-gray-400 h-[35px] flex-1 min-w-[150px]"
    required
  />
</div>

              {/* City, Pin Code, State, Country */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-1 flex-wrap">
                <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[80px] md:min-w-[80px] w-full md:w-auto">
                  City
                </label>
                <input 
                  type="text" 
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px] box-border min-w-[100px] w-full md:w-auto"
                />

                <label className="bg-[#593c26] text-white text-center px-2.5 py-1.5 min-w-[120px] md:min-w-[80px] w-full md:w-auto mt-2 md:mt-0">
                  Pin Code
                </label>
                <input 
                  type="text" 
                  name="pin_code"
                  value={formData.pin_code}
                  onChange={handleInputChange}
                  className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px] box-border min-w-[100px] w-full md:w-auto"
                />

                <label className="bg-[#593c26] text-white text-center px-2.5 py-1.5 min-w-[120px] md:min-w-[80px] w-full md:w-auto mt-2 md:mt-0">
                  State
                </label>
                <input 
                  type="text" 
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px] box-border min-w-[100px] w-full md:w-auto"
                />

                <label className="bg-[#593c26] text-white text-center px-2.5 py-1.5 min-w-[120px] md:min-w-[80px] w-full md:w-auto mt-2 md:mt-0">
                  Country
                </label>
                <input 
                  type="text" 
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px] box-border min-w-[100px] w-full md:w-auto"
                />
              </div>

              {/* No of People and Rooms */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-1 flex-wrap">
                <label className="bg-[#593c26] text-white text-center px-2.5 py-1.5 min-w-[90px] w-full md:w-auto">
                  No of People
                </label>
                <input
                  type="number"
                  name="num_people"
                  min={1}
                  value={formData.num_people}
                  onChange={handleNumPeopleChange}
                  className="w-full md:w-[90px] px-2.5 py-1.5 border border-gray-400 h-[37px] box-border flex-none"
                  required
                />

                <label className="bg-[#593c26] text-white text-center px-2.5 py-1.5 min-w-[70px] w-full md:w-auto mt-2 md:mt-0">
                  No of Rooms
                </label>
                <input
                  type="number"
                  name="num_rooms"
                  min={1}
                  value={formData.num_rooms}
                  onChange={handleNumRoomsChange}
                  className="w-full md:w-[90px] px-2.5 py-1.5 border border-gray-400 h-[35px] box-border flex-none"
                  required
                />

                <label className="bg-[#593c26] text-white text-center px-2.5 py-1.5 min-w-[90px] w-full md:w-auto mt-2 md:mt-0">
                  Single
                </label>
                <input
                  type="number"
                  name="single_room"
                  min={0}
                  value={formData.single_room}
                  onChange={handleInputChange}
                  className="w-full md:w-[80px] px-2.5 py-1.5 border border-gray-400 h-[35px] box-border"
                />

                <label className="bg-[#593c26] text-white text-center px-2.5 py-1.5 min-w-[80px] w-full md:w-auto mt-2 md:mt-0">
                  Double
                </label>
                <input
                  type="number"
                  name="double_room"
                  min={0}
                  value={formData.double_room}
                  onChange={handleInputChange}
                  className="w-full md:w-[90px] px-2.5 py-1.5 border border-gray-400 h-[35px] box-border"
                />

                <label className="bg-[#593c26] text-white text-center px-2.5 py-1.5 min-w-[90px] w-full md:w-auto mt-2 md:mt-0">
                  Triple
                </label>
                <input
                  type="number"
                  name="triple_room"
                  min={0}
                  value={formData.triple_room}
                  onChange={handleInputChange}
                  className="w-full md:w-[90px] px-2.5 py-1.5 border border-gray-400 h-[35px] box-border"
                />

                <label className="bg-[#593c26] text-white text-center px-2.5 py-1.5 min-w-[90px] w-full md:w-auto mt-2 md:mt-0">
                  Suite Room
                </label>
                <input
                  type="number"
                  name="suite_room"
                  min={0}
                  value={formData.suite_room}
                  onChange={handleInputChange}
                  className="w-full md:w-[110px] px-2.5 py-1.5 border border-gray-400 h-[35px] box-border"
                />
              </div>

              {/* City - One City */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-1 flex-wrap">
                <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[80px] text-center w-full md:w-auto">
                  City
                </label>
                
                <div className="flex items-center gap-1 w-full md:w-auto">
                  <input
                    type="checkbox"
                    checked={formData.city_type === "one"}
                    onChange={() => handleCityTypeChange("one")}
                    className="w-4 h-4 accent-[#593c26]"
                  />
                  <label className="bg-[#593c26] text-white text-center px-2.5 py-1.5 min-w-[115px]">One City</label>
                </div>
                
                <input
                  type="text"
                  name="city_name"
                  value={formData.city_type === "one" ? formData.city_name : ""}
                  onChange={handleInputChange}
                  disabled={formData.city_type !== "one"}
                  placeholder="City Name"
                  className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px] box-border disabled:bg-gray-100 w-full md:w-auto"
                />
              </div>

              {/* City - Multiple City */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-1 flex-wrap">
                <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[80px] w-full md:w-auto opacity-0 md:opacity-100 invisible md:visible">
                  City
                </label>
                
                <div className="flex items-center gap-1 w-full md:w-auto">
                  <input
                    type="checkbox"
                    checked={formData.city_type === "multiple"}
                    onChange={() => handleCityTypeChange("multiple")}
                    className="w-4 h-4 accent-[#593c26]"
                  />
                  <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[115px]">Multiple City</label>
                </div>
                
                <input
                  type="text"
                  name="city_name"
                  value={formData.city_type === "multiple" ? formData.city_name : ""}
                  onChange={handleInputChange}
                  disabled={formData.city_type !== "multiple"}
                  placeholder="Mention Multiple Cities"
                  className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px] box-border disabled:bg-gray-100 w-full md:w-auto"
                />
              </div>

              {/* Domestic Destination */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-1 flex-wrap">
                <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[220px] w-full md:w-auto">
                  Domestic Destination
                </label>
                <input
                  type="text"
                  name="domestic_destination"
                  value={formData.domestic_destination}
                  onChange={handleInputChange}
                  placeholder="Mention city names where you would like to do event"
                  className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px] box-border w-full md:w-auto"
                />
              </div>

              {/* International Destination */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-1 flex-wrap">
                <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[220px] w-full md:w-auto">
                  International Destination
                </label>
                <input
                  type="text"
                  name="international_destination"
                  value={formData.international_destination}
                  onChange={handleInputChange}
                  placeholder="Mention City & Country names where you would like to do event"
                  className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px] box-border w-full md:w-auto"
                />
              </div>

              {/* Hotel Category and Budget */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-1 flex-wrap">
                <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[220px] w-full md:w-auto">
                  Hotel Category
                </label>
                <input
                  type="text"
                  name="hotel_category"
                  value={formData.hotel_category}
                  onChange={handleInputChange}
                  placeholder="2, 3, 4, 5 hotel"
                  className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px] box-border w-full md:w-auto"
                />

                <label className="bg-[#593c26] text-white text-center px-2.5 py-1.5 min-w-[120px] w-full md:w-auto mt-2 md:mt-0">
                  Approximate Budget per person
                </label>
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px] box-border w-full md:w-auto"
                />
              </div>

              {/* Common Inclusion */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-1 flex-wrap">
                <label className="bg-[#593c26] text-white px-2.5 py-1.5 min-w-[220px] w-full md:w-auto">
                  Common Inclusion
                </label>
                <input
                  type="text"
                  name="common_inclusion"
                  value={formData.common_inclusion}
                  onChange={handleInputChange}
                  placeholder="Airport Transfers, Hotel Stay breakfast lunch dinner, Half day city tour, cover major tours"
                  className="flex-1 px-2.5 py-1.5 border border-gray-400 h-[35px] box-border w-full md:w-auto"
                />
              </div>

            {/* Buttons */}
<div className="flex flex-row justify-center gap-3 mt-6">
  <button
    type="button"
    onClick={handleReset}
    disabled={isSubmitting}
    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2  cursor-pointer w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
  >
    Reset
  </button>
  <button
    type="submit"
    disabled={isSubmitting}
    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2  cursor-pointer w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
  >
    {isSubmitting ? 'Submitting...' : 'Submit'}
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