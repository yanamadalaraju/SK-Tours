import { useState } from "react";

interface DayCardProps {
  dayNumber: string;
  headerColor: string;
  bodyColor: string;
}

const DayCard = ({ dayNumber, headerColor, bodyColor }: DayCardProps) => {
  const [meals, setMeals] = useState({ B: false, L: false, D: false });

  return (
    <div>
      {/* Header Row - 3 separate rounded boxes */}
      <div className="flex gap-2 mb-1">
        <div className={`${headerColor} text-white font-bold px-4 py-2 rounded-lg text-center min-w-[120px]`}>
          {dayNumber}
        </div>
        <div className={`${headerColor} text-white font-bold px-4 py-2 rounded-lg text-center flex-1`}>
          Day Details
        </div>
        <div className="bg-white border border-gray-300 rounded-lg px-4 py-2 flex items-center gap-3">
          <label className="flex items-center gap-1">
            B
            <input
              type="radio"
              checked={meals.B}
              onChange={() => setMeals(prev => ({ ...prev, B: !prev.B }))}
              className="w-4 h-4"
            />
          </label>
          <label className="flex items-center gap-1">
            L
            <input
              type="radio"
              checked={meals.L}
              onChange={() => setMeals(prev => ({ ...prev, L: !prev.L }))}
              className="w-4 h-4"
            />
          </label>
          <label className="flex items-center gap-1">
            D
            <input
              type="radio"
              checked={meals.D}
              onChange={() => setMeals(prev => ({ ...prev, D: !prev.D }))}
              className="w-4 h-4"
            />
          </label>
        </div>
      </div>
      {/* Content Area */}
      <div className={`${bodyColor} min-h-[120px] p-4 rounded-lg border border-gray-300`}>
        <textarea 
          className="w-full h-full min-h-[100px] bg-transparent resize-none focus:outline-none text-gray-800"
          placeholder="Enter day details..."
        />
      </div>
    </div>
  );
};

const TourItinerary = () => {
  const dayCards = [
    { dayNumber: "Day 01", headerColor: "bg-fuchsia-500", bodyColor: "bg-pink-100" },
    { dayNumber: "Day 02", headerColor: "bg-emerald-400", bodyColor: "bg-emerald-50" },
    { dayNumber: "Day 03", headerColor: "bg-orange-400", bodyColor: "bg-orange-50" },
    { dayNumber: "Day 04", headerColor: "bg-blue-600", bodyColor: "bg-blue-50" },
    { dayNumber: "Day 05", headerColor: "bg-yellow-400", bodyColor: "bg-yellow-50" },
  ];

  return (
    <div className="min-h-screen bg-gray-600 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Main Card */}
        <div className="bg-gray-400 rounded-lg overflow-hidden p-4">
          {/* Red Header */}
          <div className="bg-red-600 text-white text-center font-bold text-2xl py-3 rounded-t-lg">
            Tour Itinerary
          </div>

          {/* Tour Info Section */}
          <div className="bg-white p-2">
            {/* Labels Row */}
            <div className="flex gap-2 mb-1">
              <div className="bg-amber-100 font-bold px-4 py-2 rounded-lg text-center min-w-[120px] text-gray-800">
                Tour Code
              </div>
              <div className="bg-amber-900 text-white font-bold px-4 py-2 rounded-lg text-center flex-1">
                Tour Name
              </div>
              <div className="bg-amber-900 text-white font-bold px-4 py-2 rounded-lg text-center min-w-[80px]">
                Day
              </div>
            </div>
            {/* Input Row */}
            <div className="flex gap-2">
              <div className="bg-amber-50 border border-gray-300 rounded-lg min-w-[120px]">
                <input 
                  type="text" 
                  className="w-full px-4 py-2 bg-transparent focus:outline-none text-center"
                />
              </div>
              <div className="bg-amber-50 border border-gray-300 rounded-lg flex-1">
                <input 
                  type="text" 
                  className="w-full px-4 py-2 bg-transparent focus:outline-none text-center"
                />
              </div>
              <div className="bg-amber-50 border border-gray-300 rounded-lg min-w-[80px]">
                <input 
                  type="text" 
                  className="w-full px-4 py-2 bg-transparent focus:outline-none text-center"
                />
              </div>
            </div>
          </div>

          {/* Day Cards */}
          <div className="space-y-4 mt-4">
            {dayCards.map((card) => (
              <DayCard key={card.dayNumber} {...card} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourItinerary;