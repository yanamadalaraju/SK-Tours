import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';

interface GuestsDropdownProps {
  onClose: () => void;
  onSelectGuests: (guestsInfo: string) => void;
}

const GuestsDropdown: React.FC<GuestsDropdownProps> = ({ onClose, onSelectGuests }) => {
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(2);
  const [childrenAges, setChildrenAges] = useState<number[]>([5, 8]);
  const [withPets, setWithPets] = useState(false);

  const updateChildrenAge = (index: number, age: number) => {
    const newAges = [...childrenAges];
    newAges[index] = age;
    setChildrenAges(newAges);
  };

  const handleApply = () => {
    const childrenText = children > 0 ? `, ${children} Children` : '';
    const guestsInfo = `${rooms} Room, ${adults} Adults${childrenText}`;
    onSelectGuests(guestsInfo);
    onClose();
  };

  return (
    <div className="bg-white rounded-lg shadow-xl border p-6 w-80">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-800">Rooms & Guests</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>
      </div>

      {/* Room Counter */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium text-gray-800">Room</span>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setRooms(Math.max(1, rooms - 1))}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100"
            >
              <Minus size={16} />
            </button>
            <span className="w-8 text-center font-bold">{rooms}</span>
            <button 
              onClick={() => setRooms(rooms + 1)}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Adults Counter */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium text-gray-800">Adults</span>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setAdults(Math.max(1, adults - 1))}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100"
            >
              <Minus size={16} />
            </button>
            <span className="w-8 text-center font-bold">{adults}</span>
            <button 
              onClick={() => setAdults(adults + 1)}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Children Counter */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="font-medium text-gray-800">Children</span>
            <p className="text-xs text-gray-600">0 - 17 Years Old</p>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => {
                const newCount = Math.max(0, children - 1);
                setChildren(newCount);
                if (newCount < childrenAges.length) {
                  setChildrenAges(childrenAges.slice(0, newCount));
                }
              }}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100"
            >
              <Minus size={16} />
            </button>
            <span className="w-8 text-center font-bold">{children}</span>
            <button 
              onClick={() => {
                setChildren(children + 1);
                setChildrenAges([...childrenAges, 5]);
              }}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
        
        {children > 0 && (
          <div className="pl-4">
            <p className="text-xs text-gray-600 mb-3">
              Please provide right number of children along with their right age for best options and prices.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {childrenAges.map((age, index) => (
                <div key={index} className="mb-2">
                  <label className="text-sm text-gray-700 mb-1 block">Child {index + 1} Age</label>
                  <select 
                    value={age}
                    onChange={(e) => updateChildrenAge(index, parseInt(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    {Array.from({ length: 18 }, (_, i) => (
                      <option key={i} value={i}>{i} years</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Pets Option */}
      <div className="mb-6">
        <div className="flex items-start">
          <input
            type="checkbox"
            id="pets"
            checked={withPets}
            onChange={(e) => setWithPets(e.target.checked)}
            className="mt-1 mr-3"
          />
          <div>
            <label htmlFor="pets" className="font-medium text-gray-800 block">
              Are you travelling with pets?
            </label>
            <p className="text-xs text-gray-600 mt-1">
              Selecting this option will show only pet-friendly properties. Please review the pet policies & applicable fees, if any.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button 
          onClick={handleApply}
          className="bg-mmt-orange hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default GuestsDropdown;