import React, { useState, ChangeEvent } from "react";
import Sidebar from "./Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ConferenceRequirement: React.FC = () => {
  const [text, setText] = useState<string>(
    `Free Flow Entry, Box should extend as per requirement added

Pen, Pad, Water bottle, Tea, Coffee with Biscuit, Bench Style, Round table, U shape, Theatre Style Sitting, Projector, Mike, Caller Mike, Electric Points, Music system with DJ, Welcome Dance, Buffet Lunch, Normal Dinner, Gala Dinner (Indian Liquor), Gala Dinner (International Liquor), Number of day Stay, Major sightseeing, Podium Stage, Extra TV Screen, Dance Performance, Presentation Stage, No of chairs, No of Tables, Reception table at entrance, Boys Escort, Girls Escort, Standee. Following is just a sample but you can add any number of requirements.`
  );

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleReset = () => setText("");

  const handleEdit = () => {
    console.log("Edit clicked");
  };

  const handleSubmit = () => {
    console.log("Submitted text:", text);
  };

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

      {/* Main Box */}
      <div className="w-[100%] mx-auto my-8 p-8   bg-gradient-to-br from-[#e6d29b] to-[#d8b56f] font-sans">
        
        {/* Header */}
        <div className="bg-[#5c3b0c] text-white text-[22px] text-center py-3 font-bold mb-2">
          Conference / Event / Material Requirement
        </div>

        {/* Textarea */}
        <textarea
          value={text}
          onChange={handleChange}
          rows={12}
          className="w-full h-[220px] p-3 border border-gray-400 resize-y text-[15px] bg-white text-black"
        />

        {/* Buttons */}
        <div className="mt-5 flex justify-center gap-2">
          <button
            onClick={handleEdit}
            className="px-6 py-2 text-[16px] border-none bg-[#2196f3] text-white cursor-pointer"
          >
            Edit
          </button>

          <button
            onClick={handleReset}
            className="px-6 py-2 text-[16px] border-none bg-[#4caf50] text-white cursor-pointer"
          >
            Reset
          </button>

          <button
            onClick={handleSubmit}
            className="px-6 py-2 text-[16px] border-none bg-[#f44336] text-white cursor-pointer"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
    </div>
    <Footer />
    </div>
    </>
  );
};

export default ConferenceRequirement;
