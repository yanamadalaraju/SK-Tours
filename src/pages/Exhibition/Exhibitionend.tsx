import React, { useState } from "react";

const ExhibitionPage: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState("Domestic Exibition");
  const [activeTab, setActiveTab] = useState("Domestic Exhibition");

  const sidebarItems = [
    "About Exhibition",
    "Domestic Exhibition",
    "Agriculture",
    "Pharmaceutical",
    "Air Condition",
    "Furniture",
    "Steel",
    "Rubber",
    "Plastic",
  ];

  return (
    <div className="flex w-full border border-gray-400 min-h-screen">
      {/* LEFT MENU - Fixed width */}
      <div className="w-64 border-r flex-shrink-0">
        <div className="bg-black text-white text-center font-semibold py-3">
          Exhibition
        </div>

        {sidebarItems.map((item) => (
          <div
            key={item}
            onClick={() => setActiveMenu(item)}
            className={`px-4 py-3 cursor-pointer border-b
              ${
                activeMenu === item
                  ? "bg-blue-900 text-white"
                  : "bg-blue-100 hover:bg-blue-200"
              }`}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="exh-content flex-1 flex flex-col">
        
        {/* Header */}
        <div className="exh-header bg-black text-white text-center text-sm py-1">
          {activeTab}
        </div>

        <div className="exh-subheader bg-blue-200 text-center text-sm py-1 border-b border-gray-400">
          Agriculture
        </div>

        {/* Single Table - City row attached with message below */}
        <table className="w-full border-collapse">
          <tbody>
            {/* City Row */}
            <tr>
              <td className="border border-gray-400 px-3 py-2 w-24 font-medium">City</td>
              <td className="border border-gray-400 px-3 py-2" colSpan={2}>New Delhi</td>
            </tr>
            
            {/* Message Row - Full width */}
            <tr>
              <td colSpan={3} className="border border-gray-400 p-6">
                <div className="flex items-center justify-center" style={{ height: '350px' }}>
                  <div className="text-center">
                    <p className="text-gray-700 text-base mb-2">
                      As of now we have not uploaded any exhibition for furniture. 
                      If there is any exhibition in India please send details on
                    </p>
                    <p className="font-semibold text-blue-600 text-lg">
                      salil@sktt.in
                    </p>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExhibitionPage;