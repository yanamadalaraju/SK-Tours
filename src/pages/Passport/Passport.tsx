import React, { useState } from "react";
import axios from "axios";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Define the interface for form data
interface PassportFormData {
    applicant_for: string;
    application_type: string;
    passport_booklet: string;
    name: string;
    middle_name: string;
    surname: string;
    dob: string;
    place_of_birth: string;
    cell_no: string;
    email: string;
    pan_no: string;
    aadhaar_no: string;
    qualification: string;
    profession: string;
    govt_employee: string;
    visible_mark: string;
    address: string;
    city: string;
    pincode: string;
    state: string;
    country: string;
    father_name: string;
    father_middle: string;
    father_surname: string;
    mother_name: string;
    mother_middle: string;
    mother_surname: string;
    spouse_name: string;
    spouse_middle: string;
    spouse_surname: string;
    guardian_name: string;
    guardian_middle: string;
    guardian_surname: string;
    emergency_name: string;
    emergency_cell: string;
    emergency_email: string;
    emergency_address: string;
    emergency_city: string;
    emergency_pincode: string;
    emergency_state: string;
    emergency_country: string;
    criminal_case: string;
    post_office: string;
    police_station: string;
}

type TabType = "father" | "mother" | "spouse" | "guardian";

const PassportFormOneM: React.FC = () => {
    const [formData, setFormData] = useState<PassportFormData>({
        applicant_for: "",
        application_type: "",
        passport_booklet: "",
        name: "",
        middle_name: "",
        surname: "",
        dob: "",
        place_of_birth: "",
        cell_no: "",
        email: "",
        pan_no: "",
        aadhaar_no: "",
        qualification: "",
        profession: "",
        govt_employee: "",
        visible_mark: "",
        address: "",
        city: "",
        pincode: "",
        state: "",
        country: "",
        father_name: "",
        father_middle: "",
        father_surname: "",
        mother_name: "",
        mother_middle: "",
        mother_surname: "",
        spouse_name: "",
        spouse_middle: "",
        spouse_surname: "",
        guardian_name: "",
        guardian_middle: "",
        guardian_surname: "",
        emergency_name: "",
        emergency_cell: "",
        emergency_email: "",
        emergency_address: "",
        emergency_city: "",
        emergency_pincode: "",
        emergency_state: "",
        emergency_country: "",
        criminal_case: "",
        post_office: "",
        police_station: "",
    });

    const [selectedTab, setSelectedTab] = useState<TabType>("father");

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitToBackend = async (messagePrefix: string): Promise<void> => {
        try {
            const res = await axios.post<{ id: string }>(
                "http://localhost:5000/api/passportone/create",
                formData
            );
            alert(`${messagePrefix} ID: ${res.data.id}`);
        } catch (error) {
            console.error(error);
            alert("Error while submitting!");
        }
    };

    const handleSubmit = async (): Promise<void> => await submitToBackend("Form submitted successfully.");
    const handleSubmitPay = async (): Promise<void> =>
        await submitToBackend("Form submitted & payment process can start. Record ID");

    const getInputName = (baseName: string): string => {
        switch (selectedTab) {
            case "father":
                return `father_${baseName}`;
            case "mother":
                return `mother_${baseName}`;
            case "spouse":
                return `spouse_${baseName}`;
            case "guardian":
                return `guardian_${baseName}`;
            default:
                return `father_${baseName}`;
        }
    };

    return (
        <>
            <Header />
            <div className="font-sans bg-white min-h-screen mb-2">
                <header className="bg-[#0c2b66] text-white text-center p-4 text-3xl font-bold mb-2">
                    Passport Application Form
                </header>

                <div className="p-4 pb-10 max-w-[1300px] mx-auto bg-[#fbeedf]">
                    <div className="grid grid-cols-[150px_auto_auto_auto_170px_auto_auto_200px_auto_auto] gap-2 items-center mb-1">
                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm">Applicant For</div>

                        <div className="flex items-center gap-1">
                            <input
                                type="checkbox"
                                name="applicant_for"
                                value="Fresh"
                                onChange={handleInput}
                                className="w-5 h-5 border-2 border-green-600 bg-white mr-0"
                            />
                            <div className="bg-[#009146] text-white px-3 py-1.5 inline-flex items-center text-sm font-bold ">
                                Fresh
                            </div>
                        </div>

                        <div className="flex items-center gap-1">
                            <input
                                type="checkbox"
                                name="applicant_for"
                                value="Reissue"
                                onChange={handleInput}
                                className="w-5 h-5 border-2 border-green-600 bg-white mr-0"
                            />
                            <div className="bg-[#009146] text-white px-3 py-1.5 inline-flex items-center text-sm font-bold ">
                                Reissue
                            </div>
                        </div>

                        <div className="flex items-center gap-1">
                            <input
                                type="checkbox"
                                name="applicant_for"
                                value="Lost / Damage"
                                onChange={handleInput}
                                className="w-5 h-5 border-2 border-green-600 bg-white mr-0"
                            />
                            <div className="bg-[#009146] text-white px-3 py-1.5 inline-flex items-center text-sm font-bold ">
                                Lost / Damage
                            </div>
                        </div>

                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm">Type of Application</div>

                        <div className="flex items-center gap-1">
                            <input
                                type="checkbox"
                                name="application_type"
                                value="Normal"
                                onChange={handleInput}
                                className="w-5 h-5 border-2 border-green-600 bg-white mr-0"
                            />
                            <div className="bg-[#009146] text-white px-3 py-1.5 inline-flex items-center text-sm font-bold ">
                                Normal
                            </div>
                        </div>

                        <div className="flex items-center gap-1">
                            <input
                                type="checkbox"
                                name="application_type"
                                value="Tatkal"
                                onChange={handleInput}
                                className="w-5 h-5 border-2 border-green-600 bg-white mr-0"
                            />
                            <div className="bg-[#009146] text-white px-3 py-1.5 inline-flex items-center text-sm font-bold ">
                                Tatkal
                            </div>
                        </div>

                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm">Type of Passport Booklet</div>

                        <div className="flex items-center gap-1">
                            <input
                                type="checkbox"
                                name="passport_booklet"
                                value="36"
                                onChange={handleInput}
                                className="w-5 h-5 border-2 border-green-600 bg-white mr-0"
                            />
                            <div className="bg-[#00a651] text-white px-3 py-1.5 inline-flex items-center text-sm font-bold ">
                                36
                            </div>
                        </div>

                        <div className="flex items-center gap-1">
                            <input
                                type="checkbox"
                                name="passport_booklet"
                                value="64"
                                onChange={handleInput}
                                className="w-5 h-5 border-2 border-green-600 bg-white mr-0"
                            />
                            <div className="bg-[#00a651] text-white px-3 py-1.5 inline-flex items-center text-sm font-bold ">
                                64
                            </div>
                        </div>
                    </div>

                    {/* Name Row */}
                    <div className="grid grid-cols-[180px_1fr_180px_1fr_180px_1fr] gap-2 items-center mb-1">
                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm">Name</div>
                        <input
                            type="text"
                            name="name"
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm"
                            onChange={handleInput}
                        />

                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm">Middle Name</div>
                        <input
                            type="text"
                            name="middle_name"
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm"
                            onChange={handleInput}
                        />

                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm">Surname</div>
                        <input
                            type="text"
                            name="surname"
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm"
                            onChange={handleInput}
                        />
                    </div>

                    {/* DOB, Place, Cell, Email */}
                    <div className="grid grid-cols-[140px_1fr_140px_1fr_140px_1fr_140px_1fr] gap-2 items-center mb-1">
                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm whitespace-nowrap">Date of Birth</div>
                        <input
                            type="text"
                            name="dob"
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm w-full"
                            placeholder="DD/MM/YYYY"
                            onChange={handleInput}
                        />

                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm whitespace-nowrap">Place of Birth</div>
                        <input
                            type="text"
                            name="place_of_birth"
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm w-full"
                            onChange={handleInput}
                        />

                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm whitespace-nowrap">Cell No</div>
                        <input
                            type="text"
                            name="cell_no"
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm w-full"
                            onChange={handleInput}
                        />

                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm whitespace-nowrap">Email Id</div>
                        <input
                            type="email"
                            name="email"
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm w-full"
                            onChange={handleInput}
                        />
                    </div>

                    {/* PAN, Aadhaar, Qualification */}
                    <div className="grid grid-cols-[180px_1fr_180px_1fr_180px_1fr] gap-2 items-center mb-1">
                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm">Pan Card No</div>
                        <input
                            type="text"
                            name="pan_no"
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm"
                            onChange={handleInput}
                        />

                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm">Aadhar Card No</div>
                        <input
                            type="text"
                            name="aadhaar_no"
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm"
                            onChange={handleInput}
                        />

                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm">Qualification</div>
                        <input
                            type="text"
                            name="qualification"
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm"
                            onChange={handleInput}
                        />
                    </div>

                    {/* Profession, Govt Employee, Visible Mark */}
                    <div className="grid grid-cols-[140px_1fr_280px_auto_100px_1fr] gap-2 items-center mb-2">
                        {/* Profession */}
                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm whitespace-nowrap">Profession</div>
                        <input
                            type="text"
                            name="profession"
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm w-full"
                            onChange={handleInput}
                        />

                        {/* Are you Government Employee - Increased width */}
                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm whitespace-nowrap text-center">
                            Are you Government Employee
                        </div>

                        {/* Yes/No with checkboxes outside */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                                <input
                                    type="checkbox"
                                    name="govt_employee"
                                    value="Yes"
                                    onChange={handleInput}
                                    className="w-5 h-5 border-2 border-[#5d3b13] bg-white accent-[#5d3b13]"
                                />
                                <span className="bg-white text-black px-4 py-1.5 border border-[#5d3b13] text-sm font-bold ">
                                    Yes
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <input
                                    type="checkbox"
                                    name="govt_employee"
                                    value="No"
                                    onChange={handleInput}
                                    className="w-5 h-5 border-2 border-[#5d3b13] bg-white accent-[#5d3b13]"
                                />
                                <span className="bg-white text-black px-4 py-1.5 border border-[#5d3b13] text-sm font-bold ">
                                    No
                                </span>
                            </div>
                        </div>

                        {/* Visible Mark */}
                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm whitespace-nowrap">Visible Mark</div>
                        <input
                            type="text"
                            name="visible_mark"
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm w-full"
                            onChange={handleInput}
                        />
                    </div>

                    {/* Address */}
                    <div className="grid grid-cols-[180px_1fr] gap-2 items-center mb-1">
                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm">Address</div>
                        <input
                            type="text"
                            name="address"
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm col-span-1"
                            onChange={handleInput}
                        />
                    </div>

                    {/* City, Pincode, State, Country */}
                    <div className="grid grid-cols-[180px_1fr_180px_1fr_180px_1fr] gap-2 items-center mb-1">
                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm">City</div>
                        <input
                            type="text"
                            name="city"
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm"
                            onChange={handleInput}
                        />

                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm">Pincode</div>
                        <input
                            type="text"
                            name="pincode"
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm"
                            onChange={handleInput}
                        />

                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm">State</div>
                        <input
                            type="text"
                            name="state"
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm"
                            onChange={handleInput}
                        />

                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm">Country</div>
                        <input
                            type="text"
                            name="country"
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm"
                            onChange={handleInput}
                        />
                    </div>

                    {/* Parent Tabs */}
                    <div className="grid grid-cols-4 border-3 border-[#ffe600] mt-1.5 mb-0">
                        <div
                            className={`bg-[#d9efff] p-2.5 text-center font-bold text-sm border-r border-[#ffe600] cursor-pointer ${selectedTab === "father" ? "!bg-[#0c2b66] !text-white" : ""
                                }`}
                            onClick={() => setSelectedTab("father")}
                        >
                            Father Name
                        </div>

                        <div
                            className={`bg-[#d9efff] p-2.5 text-center font-bold text-sm border-r border-[#ffe600] cursor-pointer ${selectedTab === "mother" ? "!bg-[#0c2b66] !text-white" : ""
                                }`}
                            onClick={() => setSelectedTab("mother")}
                        >
                            Mother Name
                        </div>

                        <div
                            className={`bg-[#d9efff] p-2.5 text-center font-bold text-sm border-r border-[#ffe600] cursor-pointer ${selectedTab === "spouse" ? "!bg-[#0c2b66] !text-white" : ""
                                }`}
                            onClick={() => setSelectedTab("spouse")}
                        >
                            Spouse Name
                        </div>

                        <div
                            className={`bg-[#d9efff] p-2.5 text-center font-bold text-sm cursor-pointer ${selectedTab === "guardian" ? "!bg-[#0c2b66] !text-white" : ""
                                }`}
                            onClick={() => setSelectedTab("guardian")}
                        >
                            Legal Guardian
                        </div>
                    </div>

                    {/* Yellow box for parent/spouse/guardian Name row */}
                    <div className="bg-[#fffde1] border-l-3 border-r-3 border-b-3 border-[#ffe600] p-1.5 pb-2.5 mb-1.5 grid grid-cols-[180px_1fr_180px_1fr_180px_1fr] gap-1.5">
                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm">Name</div>
                        <input
                            type="text"
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm"
                            name={getInputName("name")}
                            onChange={handleInput}
                        />

                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm">Middle Name</div>
                        <input
                            type="text"
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm"
                            name={getInputName("middle")}
                            onChange={handleInput}
                        />

                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm">Surname</div>
                        <input
                            type="text"
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm"
                            name={getInputName("surname")}
                            onChange={handleInput}
                        />
                    </div>

                    {/* Emergency Contact */}
                    <div className="grid grid-cols-[180px_1fr_180px_1fr_180px_1fr] gap-2 items-center mb-1">
                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm">24 Hrs Emergency Name</div>
                        <input
                            type="text"
                            name="emergency_name"
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm"
                            onChange={handleInput}
                        />

                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm">Cell No</div>
                        <input
                            type="text"
                            name="emergency_cell"
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm"
                            onChange={handleInput}
                        />

                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm">Email Id</div>
                        <input
                            type="email"
                            name="emergency_email"
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm"
                            onChange={handleInput}
                        />
                    </div>

                    {/* Emergency Address */}
                    <div className="grid grid-cols-[180px_1fr] gap-2 items-center mb-2">
                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm">Address</div>
                        <input
                            type="text"
                            name="emergency_address"
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm col-span-1"
                            onChange={handleInput}
                        />
                    </div>

                    {/* Emergency City, Pincode, State, Country */}
                    <div className="grid grid-cols-[180px_1fr_180px_1fr_180px_1fr] gap-2 items-center mb-2">
                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm">City</div>
                        <input
                            type="text"
                            name="emergency_city"
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm"
                            onChange={handleInput}
                        />

                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm">Pincode</div>
                        <input
                            type="text"
                            name="emergency_pincode"
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm"
                            onChange={handleInput}
                        />

                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm">State</div>
                        <input
                            type="text"
                            name="emergency_state"
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm"
                            onChange={handleInput}
                        />

                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm">Country</div>
                        <input
                            type="text"
                            name="emergency_country"
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm"
                            onChange={handleInput}
                        />
                    </div>

                    {/* Criminal Case in one row */}
                    <div className="grid grid-cols-[1fr_90px_90px] gap-2 items-center mb-2">
                        <div className="bg-white p-2 border border-[#c59a4b] text-sm font-bold">
                            Do you have any Criminal and Offensive Cases pending in court / Local Police Station in India.
                        </div>
                        {/* Yes/No with checkboxes outside */}
                        <div className="flex items-center gap-1">
                            <div className="flex items-center gap-0">
                                <input
                                    type="checkbox"
                                    name="govt_employee"
                                    value="Yes"
                                    onChange={handleInput}
                                    className="w-5 h-5 border-2 border-[#5d3b13] bg-white accent-[#5d3b13]"
                                />
                                <span className=" text-black px-4 py-1.5  text-md font-bold ">
                                    Yes
                                </span>
                            </div>
                            <div className="flex items-center gap-0">
                                <input
                                    type="checkbox"
                                    name="govt_employee"
                                    value="No"
                                    onChange={handleInput}
                                    className="w-5 h-5 border-2 border-[#5d3b13] bg-white accent-[#5d3b13]"
                                />
                                <span className=" text-black px-4 py-1.5  text-md font-bold ">
                                    No
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Post Office & Police Station */}
                    <div className="grid grid-cols-[250px_1fr_250px_1fr] gap-2 items-center mb-2">
                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm whitespace-nowrap">
                            Name of Post office in your Area
                        </div>
                        <input
                            type="text"
                            name="post_office"
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm w-full"
                            onChange={handleInput}
                        />

                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm whitespace-nowrap">
                            Name of Police Station in your Area
                        </div>
                        <input
                            type="text"
                            name="police_station"
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm w-full"
                            onChange={handleInput}
                        />
                    </div>

                    {/* Buttons */}
                    <div className="text-center mt-4.5">
                        <button
                            className="px-6 py-2 mx-1.5 font-bold text-sm text-white border-none cursor-pointer bg-red-600"
                            type="button"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                        <button
                            className="px-6 py-2 mx-1.5 font-bold text-sm text-white border-none  cursor-pointer bg-blue-500"
                            type="button"
                            onClick={handleSubmitPay}
                        >
                            Submit & Pay
                        </button>
                    </div>

                    {/* Bottom Note */}
                    <div className="mt-3 text-center text-xs font-bold">
                        If Father & Mother details are entrred then no need to add legal gaurdian tab should not open (For Information only).
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PassportFormOneM;