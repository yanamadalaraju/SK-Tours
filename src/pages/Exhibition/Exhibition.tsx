import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/* ===== OLD MENU DATA ===== */
const menuData = {
  "About Exhibition": {
    imageText: "About Exhibition Photo",
    qa: [
      { q: "About Q1", a: "About Exhibition Answer 1" },
      { q: "About Q2", a: "About Exhibition Answer 2" },
      { q: "About Q3", a: "About Exhibition Answer 3" },
    ],
  },
  Domestic: {
    imageText: "Domestic Exhibition Photo",
    qa: [
      { q: "Domestic Q1", a: "Domestic Answer 1" },
      { q: "Domestic Q2", a: "Domestic Answer 2" },
      { q: "Domestic Q3", a: "Domestic Answer 3" },
    ],
  },
  International: {
    imageText: "International Exhibition Photo",
    qa: [
      { q: "International Q1", a: "International Answer 1" },
      { q: "International Q2", a: "International Answer 2" },
      { q: "International Q3", a: "International Answer 3" },
    ],
  },
};

/* ===== NEW CATEGORY TABLE DATA ===== */
const categoryData = {
  Domestic: [
    ["Agriculture", "Air conditioner", "Building Material"],
    ["Bathroom Fittings", "Computer / Electronics", "Cosmetics"],
    ["Furniture", "Gold & Jewellery", "Lingerie Products"],
    ["Gardening", "Machinery", "Machine tools"],
    ["Pharmaceutical", "Paper Products", "Perfumes"],
    ["Plastics", "Rubber & Steel", "Textile"],
    ["Tourism", "", ""],
  ],
  International: [
    ["ATM", "Gulf Food", "Airconditioners"],
    ["Tous", "Hospitality", "Paints"],
  ],
};

const Exhibition = () => {
  /* ===== OLD STATES ===== */
  const [activeMenu, setActiveMenu] = useState(null);
  const [openQA, setOpenQA] = useState(null);

  /* ===== NEW STATE ===== */
  const [activeCategory, setActiveCategory] = useState(null);

  /* ===== OLD HANDLERS ===== */
  const handleMenuClick = (menu) => {
    setActiveMenu((prev) => (prev === menu ? null : menu));
    setOpenQA(null);
  };

  const handleQAClick = (index) => {
    setOpenQA(openQA === index ? null : index);
  };

return (
  <div className="min-h-screen flex flex-col bg-gray-50">
    <Header />

    <main className="flex-grow p-6">

      {/* =============== ONE MAIN CARD =============== */}
      <div className="bg-white border rounded-lg shadow">

        {/* ================= OLD SECTION ================= */}
        <div className="grid grid-cols-12 border-b">

          {/* LEFT MENU */}
          <div className="col-span-3 border-r">
            <div className="bg-[#2E3A8A] text-white px-4 py-2 font-semibold">
              Exhibition
            </div>

            {Object.keys(menuData).map((item) => (
              <button
                key={item}
                onClick={() => handleMenuClick(item)}
                className={`w-full flex justify-between items-center px-4 py-3 border-b text-left
                  ${
                    activeMenu === item
                      ? "bg-blue-100 font-medium"
                      : "hover:bg-blue-50"
                  }`}
              >
                <span>{item}</span>
                <span>{activeMenu === item ? "▼" : "▶"}</span>
              </button>
            ))}
          </div>

          {/* RIGHT CONTENT */}
          <div className="col-span-9">
            {activeMenu && (
              <>
                <div className="border-b px-4 py-3 font-semibold">
                  {activeMenu}
                </div>

                <div
                  className="flex items-center justify-center border m-4 text-gray-500"
                  style={{ minHeight: "350px" }}
                >
                  {menuData[activeMenu].imageText}
                </div>

                <div className="mx-4 mb-4 border">
                  {menuData[activeMenu].qa.map((item, index) => (
                    <div key={index} className="border-t">
                      <div
                        onClick={() => handleQAClick(index)}
                        className="flex justify-between items-center px-4 py-3 cursor-pointer"
                        style={{ backgroundColor: "#2E3A8A", color: "#fff" }}
                      >
                        <span>{item.q}</span>
                        <span>{openQA === index ? "▼" : "▶"}</span>
                      </div>

                      {openQA === index && (
                        <div
                          className="px-4 py-4 bg-white"
                          style={{ minHeight: "250px" }}
                        >
                          {item.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* ================= NEW CATEGORY SECTION ================= */}
        <div className="grid grid-cols-12">

          {/* LEFT CATEGORY DROPDOWN */}
          <div className="col-span-3 border-r">
            <div className="bg-[#2E3A8A] text-white px-4 py-2 font-semibold">
              Categories
            </div>

            {Object.keys(categoryData).map((cat) => (
              <button
                key={cat}
                onClick={() =>
                  setActiveCategory(prev =>
                    prev === cat ? null : cat
                  )
                }
                className={`w-full flex justify-between items-center px-4 py-3 border-b
                  ${
                    activeCategory === cat
                      ? "bg-blue-100 font-medium"
                      : "hover:bg-blue-50"
                  }`}
              >
                <span>{cat}</span>
                <span>{activeCategory === cat ? "▼" : "▶"}</span>
              </button>
            ))}
          </div>

          {/* RIGHT TABLE */}
          <div className="col-span-9 p-4">
            {activeCategory ? (
              <>
                <h3 className="font-semibold mb-3">
                  {activeCategory}
                </h3>

                <table className="w-full border-collapse border">
                  <tbody>
                    {categoryData[activeCategory].map((row, i) => (
                      <tr key={i}>
                        {row.map((cell, j) => (
                          <td
                            key={j}
                            className="border px-4 py-2 text-sm hover:bg-gray-50"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <p className="text-gray-500">
                Select Domestic or International
              </p>
            )}
          </div>

        </div>
      </div>
      {/* =============== END CARD =============== */}

    </main>

    <Footer />
  </div>
);

};

export default Exhibition;
