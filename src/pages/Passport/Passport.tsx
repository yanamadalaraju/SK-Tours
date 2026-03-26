import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BASE_URL } from "@/ApiUrls";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

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

    // Handle text input changes
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle radio-like checkbox groups (to ensure only one is selected)
    const handleGroupCheckbox = (e: React.ChangeEvent<HTMLInputElement>, groupName: string) => {
        const { value } = e.target;
        setFormData({ ...formData, [groupName]: value });
    };

    const submitToBackend = async (messagePrefix: string): Promise<void> => {
        try {
            console.log("Submitting data:", formData);

            const res = await axios.post(
                `${BASE_URL}/api/passport/passport`,
                formData
            );

            console.log("Response:", res.data);

            if (res.data.success) {
                const message = `${messagePrefix} ID: ${res.data.id}`;
                window.alert(message);
                navigate("/");
            } else {
                window.alert("Submission failed: " + (res.data.message || "Unknown error"));
            }
        } catch (error: any) {
            console.error("Submission error:", error);
            window.alert("Error: " + (error?.response?.data?.message || error.message));
        }
    };

    const handleSubmit = async (): Promise<void> => {
        await submitToBackend("Form submitted successfully.");
    };

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

    // Helper function to render radio group
    const RadioGroup = ({ name, options, value, onChange }: any) => (
        <div className="flex flex-wrap items-center gap-2">
            {options.map((option: any) => (
                <div key={option.value} className="flex items-center gap-1">
                    <input
                        type="radio"
                        name={name}
                        value={option.value}
                        onChange={(e) => onChange(e, name)}
                        checked={value === option.value}
                        className="w-4 h-4 md:w-5 md:h-5 border-2 border-green-600 bg-white"
                    />
                    <div className="bg-[#009146] text-white px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm font-bold">
                        {option.label}
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <>
            <Header />
            <div className="font-sans bg-white min-h-screen mb-2">
                <header className="bg-[#0c2b66] text-white text-center p-3 md:p-4 text-xl md:text-3xl font-bold mb-2">
                    Passport Application Form
                </header>

                <div className="p-2 md:p-4 pb-10 max-w-[1300px] mx-auto bg-[#fbeedf] overflow-x-auto">
                    {/* Applicant For / Type / Booklet */}
                    <div className="flex flex-col md:grid md:grid-cols-[150px_auto_auto_auto_170px_auto_auto_200px_auto_auto] gap-2 items-start md:items-center mb-1">
                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm w-full md:w-auto">Applicant For</div>

                        <div className="flex flex-wrap items-center gap-1 w-full md:w-auto">
                            <input
                                type="radio"
                                name="applicant_for"
                                value="Fresh"
                                onChange={(e) => handleGroupCheckbox(e, "applicant_for")}
                                checked={formData.applicant_for === "Fresh"}
                                className="w-4 h-4 md:w-5 md:h-5"
                            />
                            <div className="bg-[#009146] text-white px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm font-bold">
                                Fresh
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-1 w-full md:w-auto">
                            <input
                                type="radio"
                                name="applicant_for"
                                value="Reissue"
                                onChange={(e) => handleGroupCheckbox(e, "applicant_for")}
                                checked={formData.applicant_for === "Reissue"}
                                className="w-4 h-4 md:w-5 md:h-5"
                            />
                            <div className="bg-[#009146] text-white px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm font-bold">
                                Reissue
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-1 w-full md:w-auto">
                            <input
                                type="radio"
                                name="applicant_for"
                                value="Lost / Damage"
                                onChange={(e) => handleGroupCheckbox(e, "applicant_for")}
                                checked={formData.applicant_for === "Lost / Damage"}
                                className="w-4 h-4 md:w-5 md:h-5"
                            />
                            <div className="bg-[#009146] text-white px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm font-bold">
                                Lost / Damage
                            </div>
                        </div>

                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm w-full md:w-auto">Type of Application</div>

                        <div className="flex flex-wrap items-center gap-1 w-full md:w-auto">
                            <input
                                type="radio"
                                name="application_type"
                                value="Normal"
                                onChange={(e) => handleGroupCheckbox(e, "application_type")}
                                checked={formData.application_type === "Normal"}
                                className="w-4 h-4 md:w-5 md:h-5"
                            />
                            <div className="bg-[#009146] text-white px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm font-bold">
                                Normal
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-1 w-full md:w-auto">
                            <input
                                type="radio"
                                name="application_type"
                                value="Tatkal"
                                onChange={(e) => handleGroupCheckbox(e, "application_type")}
                                checked={formData.application_type === "Tatkal"}
                                className="w-4 h-4 md:w-5 md:h-5"
                            />
                            <div className="bg-[#009146] text-white px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm font-bold">
                                Tatkal
                            </div>
                        </div>

                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm w-full md:w-auto">Type of Passport Booklet</div>

                        <div className="flex flex-wrap items-center gap-1 w-full md:w-auto">
                            <input
                                type="radio"
                                name="passport_booklet"
                                value="36"
                                onChange={(e) => handleGroupCheckbox(e, "passport_booklet")}
                                checked={formData.passport_booklet === "36"}
                                className="w-4 h-4 md:w-5 md:h-5"
                            />
                            <div className="bg-[#00a651] text-white px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm font-bold">
                                36
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-1 w-full md:w-auto">
                            <input
                                type="radio"
                                name="passport_booklet"
                                value="64"
                                onChange={(e) => handleGroupCheckbox(e, "passport_booklet")}
                                checked={formData.passport_booklet === "64"}
                                className="w-4 h-4 md:w-5 md:h-5"
                            />
                            <div className="bg-[#00a651] text-white px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm font-bold">
                                64
                            </div>
                        </div>
                    </div>

                    {/* Name Row */}
                    <div className="flex flex-col md:grid md:grid-cols-[180px_1fr_180px_1fr_180px_1fr] gap-2 items-start md:items-center mb-1">
                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm w-full md:w-auto">Name</div>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm w-full"
                            onChange={handleInput}
                        />

                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm w-full md:w-auto">Middle Name</div>
                        <input
                            type="text"
                            name="middle_name"
                            value={formData.middle_name}
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm w-full"
                            onChange={handleInput}
                        />

                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm w-full md:w-auto">Surname</div>
                        <input
                            type="text"
                            name="surname"
                            value={formData.surname}
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm w-full"
                            onChange={handleInput}
                        />
                    </div>

                    {/* DOB, Place, Cell, Email */}
                    <div className="flex flex-col md:grid md:grid-cols-[140px_1fr_140px_1fr_140px_1fr_140px_1fr] gap-2 items-start md:items-center mb-1">
                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm whitespace-nowrap w-full md:w-auto">Date of Birth</div>
                        <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm w-full"
                            onChange={handleInput}
                        />

                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm whitespace-nowrap w-full md:w-auto">Place of Birth</div>
                        <input
                            type="text"
                            name="place_of_birth"
                            value={formData.place_of_birth}
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm w-full"
                            onChange={handleInput}
                        />

                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm whitespace-nowrap w-full md:w-auto">Cell No</div>
                        <input
                            type="text"
                            name="cell_no"
                            value={formData.cell_no}
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm w-full"
                            onChange={handleInput}
                        />

                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm whitespace-nowrap w-full md:w-auto">Email Id</div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm w-full"
                            onChange={handleInput}
                        />
                    </div>

                    {/* PAN, Aadhaar, Qualification */}
                    <div className="flex flex-col md:grid md:grid-cols-[180px_1fr_180px_1fr_180px_1fr] gap-2 items-start md:items-center mb-1">
                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm w-full md:w-auto">Pan Card No</div>
                        <input
                            type="text"
                            name="pan_no"
                            value={formData.pan_no}
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm w-full"
                            onChange={handleInput}
                        />

                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm w-full md:w-auto">Aadhar Card No</div>
                        <input
                            type="text"
                            name="aadhaar_no"
                            value={formData.aadhaar_no}
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm w-full"
                            onChange={handleInput}
                        />

                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm w-full md:w-auto">Qualification</div>
                        <input
                            type="text"
                            name="qualification"
                            value={formData.qualification}
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm w-full"
                            onChange={handleInput}
                        />
                    </div>

                    {/* Profession, Govt Employee, Visible Mark */}
                    <div className="flex flex-col md:grid md:grid-cols-[140px_1fr_280px_auto_100px_1fr] gap-2 items-start md:items-center mb-2">
                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm whitespace-nowrap w-full md:w-auto">Profession</div>
                        <input
                            type="text"
                            name="profession"
                            value={formData.profession}
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm w-full"
                            onChange={handleInput}
                        />

                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm whitespace-nowrap text-center w-full md:w-auto">
                            Are you Government Employee
                        </div>

                        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                            <div className="flex items-center gap-1">
                                <input
                                    type="radio"
                                    name="govt_employee"
                                    value="Yes"
                                    onChange={(e) => handleGroupCheckbox(e, "govt_employee")}
                                    checked={formData.govt_employee === "Yes"}
                                    className="w-4 h-4 md:w-5 md:h-5"
                                />
                                <span className="bg-white text-black px-3 md:px-4 py-1 md:py-1.5 border border-[#5d3b13] text-xs md:text-sm font-bold">
                                    Yes
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <input
                                    type="radio"
                                    name="govt_employee"
                                    value="No"
                                    onChange={(e) => handleGroupCheckbox(e, "govt_employee")}
                                    checked={formData.govt_employee === "No"}
                                    className="w-4 h-4 md:w-5 md:h-5"
                                />
                                <span className="bg-white text-black px-3 md:px-4 py-1 md:py-1.5 border border-[#5d3b13] text-xs md:text-sm font-bold">
                                    No
                                </span>
                            </div>
                        </div>

                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm whitespace-nowrap w-full md:w-auto">Visible Mark</div>
                        <input
                            type="text"
                            name="visible_mark"
                            value={formData.visible_mark}
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm w-full"
                            onChange={handleInput}
                        />
                    </div>

                    {/* Address */}
                    <div className="flex flex-col md:grid md:grid-cols-[180px_1fr] gap-2 items-start md:items-center mb-1">
                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm w-full md:w-auto">Address</div>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm w-full"
                            onChange={handleInput}
                        />
                    </div>

                    {/* City, Pincode, State, Country */}
                    <div className="flex flex-col md:grid md:grid-cols-[180px_1fr_180px_1fr_180px_1fr] gap-2 items-start md:items-center mb-1">
                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm w-full md:w-auto">City</div>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm w-full"
                            onChange={handleInput}
                        />

                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm w-full md:w-auto">Pincode</div>
                        <input
                            type="text"
                            name="pincode"
                            value={formData.pincode}
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm w-full"
                            onChange={handleInput}
                        />

                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm w-full md:w-auto">State</div>
                        <input
                            type="text"
                            name="state"
                            value={formData.state}
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm w-full"
                            onChange={handleInput}
                        />

                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm w-full md:w-auto">Country</div>
                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm w-full"
                            onChange={handleInput}
                        />
                    </div>

                    {/* Parent Tabs */}
                    <div className="grid grid-cols-2 md:grid-cols-4 border-3 border-[#ffe600] mt-1.5 mb-0">
                        {(["father", "mother", "spouse", "guardian"] as TabType[]).map((tab, i) => (
                            <div
                                key={tab}
                                className={`p-2 md:p-2.5 text-center font-bold text-xs md:text-sm cursor-pointer ${
                                    i % 2 !== 0 && i < 2 ? 'border-l-0' : ''
                                } ${
                                    selectedTab === tab ? "bg-[#0c2b66] text-white" : "bg-[#d9efff]"
                                } ${tab !== "guardian" ? 'border-r border-[#ffe600]' : ''}`}
                                onClick={() => setSelectedTab(tab)}
                            >
                                {tab === "father" && "Father Name"}
                                {tab === "mother" && "Mother Name"}
                                {tab === "spouse" && "Spouse Name"}
                                {tab === "guardian" && "Legal Guardian"}
                            </div>
                        ))}
                    </div>

                    {/* Yellow box for parent/spouse/guardian Name row */}
                    <div className="bg-[#fffde1] border-l-3 border-r-3 border-b-3 border-[#ffe600] p-1.5 pb-2.5 mb-1.5 flex flex-col md:grid md:grid-cols-[180px_1fr_180px_1fr_180px_1fr] gap-1.5">
                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm w-full md:w-auto">Name</div>
                        <input
                            type="text"
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm w-full"
                            name={getInputName("name")}
                            value={formData[getInputName("name") as keyof PassportFormData] || ""}
                            onChange={handleInput}
                        />

                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm w-full md:w-auto">Middle Name</div>
                        <input
                            type="text"
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm w-full"
                            name={getInputName("middle")}
                            value={formData[getInputName("middle") as keyof PassportFormData] || ""}
                            onChange={handleInput}
                        />

                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm w-full md:w-auto">Surname</div>
                        <input
                            type="text"
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm w-full"
                            name={getInputName("surname")}
                            value={formData[getInputName("surname") as keyof PassportFormData] || ""}
                            onChange={handleInput}
                        />
                    </div>

                    {/* Emergency Contact */}
                    <div className="flex flex-col md:grid md:grid-cols-[180px_1fr_180px_1fr_180px_1fr] gap-2 items-start md:items-center mb-1">
                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm w-full md:w-auto">24 Hrs Emergency Name</div>
                        <input
                            type="text"
                            name="emergency_name"
                            value={formData.emergency_name}
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm w-full"
                            onChange={handleInput}
                        />

                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm w-full md:w-auto">Cell No</div>
                        <input
                            type="text"
                            name="emergency_cell"
                            value={formData.emergency_cell}
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm w-full"
                            onChange={handleInput}
                        />

                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm w-full md:w-auto">Email Id</div>
                        <input
                            type="email"
                            name="emergency_email"
                            value={formData.emergency_email}
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm w-full"
                            onChange={handleInput}
                        />
                    </div>

                    {/* Emergency Address */}
                    <div className="flex flex-col md:grid md:grid-cols-[180px_1fr] gap-2 items-start md:items-center mb-2">
                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm w-full md:w-auto">Address</div>
                        <input
                            type="text"
                            name="emergency_address"
                            value={formData.emergency_address}
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm w-full"
                            onChange={handleInput}
                        />
                    </div>

                    {/* Emergency City, Pincode, State, Country */}
                    <div className="flex flex-col md:grid md:grid-cols-[180px_1fr_180px_1fr_180px_1fr] gap-2 items-start md:items-center mb-2">
                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm w-full md:w-auto">City</div>
                        <input
                            type="text"
                            name="emergency_city"
                            value={formData.emergency_city}
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm w-full"
                            onChange={handleInput}
                        />

                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm w-full md:w-auto">Pincode</div>
                        <input
                            type="text"
                            name="emergency_pincode"
                            value={formData.emergency_pincode}
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm w-full"
                            onChange={handleInput}
                        />

                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm w-full md:w-auto">State</div>
                        <input
                            type="text"
                            name="emergency_state"
                            value={formData.emergency_state}
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm w-full"
                            onChange={handleInput}
                        />

                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm w-full md:w-auto">Country</div>
                        <input
                            type="text"
                            name="emergency_country"
                            value={formData.emergency_country}
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm w-full"
                            onChange={handleInput}
                        />
                    </div>

                    {/* Criminal Case */}
                    <div className="flex flex-col md:grid md:grid-cols-[1fr_auto] gap-2 items-start md:items-center mb-2">
                        <div className="bg-white p-2 border border-[#c59a4b] text-xs md:text-sm font-bold w-full">
                            Do you have any Criminal and Offensive Cases pending in court / Local Police Station in India.
                        </div>
                        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                            <div className="flex items-center gap-1">
                                <input
                                    type="radio"
                                    name="criminal_case"
                                    value="Yes"
                                    onChange={(e) => handleGroupCheckbox(e, "criminal_case")}
                                    checked={formData.criminal_case === "Yes"}
                                    className="w-4 h-4 md:w-5 md:h-5"
                                />
                                <span className="text-black px-2 md:px-4 py-1 text-sm md:text-md font-bold">Yes</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <input
                                    type="radio"
                                    name="criminal_case"
                                    value="No"
                                    onChange={(e) => handleGroupCheckbox(e, "criminal_case")}
                                    checked={formData.criminal_case === "No"}
                                    className="w-4 h-4 md:w-5 md:h-5"
                                />
                                <span className="text-black px-2 md:px-4 py-1 text-sm md:text-md font-bold">No</span>
                            </div>
                        </div>
                    </div>

                    {/* Post Office & Police Station */}
                    <div className="flex flex-col md:grid md:grid-cols-[250px_1fr_250px_1fr] gap-2 items-start md:items-center mb-2">
                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm whitespace-nowrap w-full md:w-auto">
                            Name of Post office in your Area
                        </div>
                        <input
                            type="text"
                            name="post_office"
                            value={formData.post_office}
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm w-full"
                            onChange={handleInput}
                        />

                        <div className="bg-[#5d3b13] text-white p-2 font-bold text-sm whitespace-nowrap w-full md:w-auto">
                            Name of Police Station in your Area
                        </div>
                        <input
                            type="text"
                            name="police_station"
                            value={formData.police_station}
                            className="p-2 border border-[#c59a4b] bg-[#fff8e1] text-sm w-full"
                            onChange={handleInput}
                        />
                    </div>

                    {/* Buttons */}
                    <div className="text-center mt-4">
                        <button
                            className="px-4 md:px-6 py-1.5 md:py-2 mx-1 font-bold text-sm text-white border-none cursor-pointer bg-red-600 hover:bg-red-700 transition"
                            type="button"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>

                    {/* Bottom Note */}
                    <div className="mt-3 text-center text-xs font-bold px-2">
                        If Father &amp; Mother details are entered then no need to add legal guardian tab should not open (For Information only).
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PassportFormOneM;