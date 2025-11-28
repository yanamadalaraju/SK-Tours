import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const Filters = () => {
  const indianTours = [
    'Andaman', 'Andhra Pradesh', 'Chardham', 'Chattisgarh', 'Goa', 
    'Gujarat', 'Himachal', 'Kashmir', 'Kerala', 'Ladakh', 
    'Madhya Pradesh', 'Maharashtra', 'North East', 'Odisha', 'Rajasthan'
  ];

  const worldTours = [
    'Africa', 'America', 'Australia NewZealand', 'Bhutan', 'Canada',
    'Dubai', 'Europe', 'Indonesia', 'Malaysia', 'Maldives',
    'Mauritius', 'Singapore', 'Sri Lanka', 'Thailand', 'Vietnam'
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Price Filter */}
      <div>
        <h3 className="font-semibold text-lg mb-4">Price</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>min. $32,990</span>
            <span>max. $97,990</span>
          </div>
          <Slider 
            defaultValue={[32990, 97990]} 
            min={10000}
            max={150000}
            step={1000}
            className="w-full"
          />
        </div>
      </div>

      {/* Indian Tours Filter */}
      <div>
        <h3 className="font-semibold text-lg mb-4">Indian Tours</h3>
        <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
          {indianTours.map((place) => (
            <div key={place} className="flex items-center space-x-2">
              <Checkbox id={`indian-${place}`} />
              <label
                htmlFor={`indian-${place}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {place}
              </label>
            </div>
          ))}
        </div>
        <Button variant="ghost" className="w-full mt-2 text-blue-600 hover:text-blue-700">
          Show more
        </Button>
      </div>

      {/* World Tours Filter */}
      <div>
        <h3 className="font-semibold text-lg mb-4">World Tours</h3>
        <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
          {worldTours.map((place) => (
            <div key={place} className="flex items-center space-x-2">
              <Checkbox id={`world-${place}`} />
              <label
                htmlFor={`world-${place}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {place}
              </label>
            </div>
          ))}
        </div>
        <Button variant="ghost" className="w-full mt-2 text-blue-600 hover:text-blue-700">
          Show more
        </Button>
      </div>

      {/* Duration Filter */}
      <div>
        <h3 className="font-semibold text-lg mb-4">Duration</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>min. 5 days</span>
            <span>max. 7 days</span>
          </div>
          <Slider 
            defaultValue={[5, 7]} 
            max={14} 
            step={1} 
            className="w-full"
          />
        </div>
      </div>

      {/* Departure Date Section */}
      <div>
        <h3 className="font-semibold text-lg mb-4">Departure date</h3>
        <div className="space-y-3">
          {['November-2025', 'December-2025', 'January-2026', 'February-2026', 'March-2026'].map((month) => (
            <div key={month} className="flex items-center space-x-2">
              <Checkbox id={month} />
              <label
                htmlFor={month}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {month}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Filters */}
      <div>
        <h3 className="font-semibold text-lg mb-4">Tour Type</h3>
        <div className="space-y-3">
          {['Beach', 'Adventure', 'Cultural', 'Luxury', 'Family', 'Honeymoon', 'Budget'].map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox id={`type-${type}`} />
              <label
                htmlFor={`type-${type}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {type}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;