import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface DatePickerDropdownProps {
  title: string;
  onClose: () => void;
  onDateSelect?: (date: string) => void;
  nextStep?: () => void;
}

const DatePickerDropdown: React.FC<DatePickerDropdownProps> = ({ title, onClose, onDateSelect, nextStep }) => {
  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  
  // Updated data structure with all dates in vertical columns
  const verticalCalendarData = {
    february: {
      month: 'February 2026',
      days: [
        { 
          label: 'Su', 
          dates: [
            { day: 1, holidayLabel: '' },
            { day: 8, holidayLabel: '' },
            { day: 15, holidayLabel: 'Maha...' },
            { day: 22, holidayLabel: '' }
          ]
        },
        { 
          label: 'Mo', 
          dates: [
            { day: '', holidayLabel: '' },
            { day: 10, holidayLabel: '' },
            { day: 17, holidayLabel: '' },
            { day: 24, holidayLabel: '' }
          ]
        },
        { 
          label: 'Tu', 
          dates: [
            { day: 4, holidayLabel: '' },
            { day: 11, holidayLabel: '', selected: true },
            { day: 18, holidayLabel: '' },
            { day: 25, holidayLabel: '' }
          ]
        },
        { 
          label: 'We', 
          dates: [
            { day: 5, holidayLabel: '' },
            { day: 12, holidayLabel: '', selected: true },
            { day: 19, holidayLabel: '' },
            { day: 26, holidayLabel: '' }
          ]
        },
        { 
          label: 'Th', 
          dates: [
            { day: 6, holidayLabel: '' },
            { day: 13, holidayLabel: '', selected: true },
            { day: 20, holidayLabel: '' },
            { day: 27, holidayLabel: 'Ram' }
          ]
        },
        { 
          label: 'Fr', 
          dates: [
            { day: 7, holidayLabel: '' },
            { day: 14, holidayLabel: '', selected: true },
            { day: 21, holidayLabel: '' },
            { day: 28, holidayLabel: '' }
          ]
        },
        { 
          label: 'Sa', 
          dates: [
            { day: 1, holidayLabel: '' },
            { day: 8, holidayLabel: '' },
            { day: 15, holidayLabel: '' },
            { day: 22, holidayLabel: '' }
          ]
        }
      ]
    },
    march: {
      month: 'March 2026',
      days: [
        { 
          label: 'Su', 
          dates: [
            { day: 1, holidayLabel: '' },
            { day: 8, holidayLabel: '' },
            { day: 15, holidayLabel: '' },
            { day: 22, holidayLabel: '' },
            { day: 29, holidayLabel: '' }
          ]
        },
        { 
          label: 'Mo', 
          dates: [
            { day: 2, holidayLabel: '' },
            { day: 9, holidayLabel: '' },
            { day: 16, holidayLabel: '' },
            { day: 23, holidayLabel: '' },
            { day: 30, holidayLabel: '' }
          ]
        },
        { 
          label: 'Tu', 
          dates: [
            { day: 3, holidayLabel: 'Holi' },
            { day: 10, holidayLabel: '' },
            { day: 17, holidayLabel: '' },
            { day: 24, holidayLabel: '' },
            { day: 31, holidayLabel: '' }
          ]
        },
        { 
          label: 'We', 
          dates: [
            { day: 4, holidayLabel: '' },
            { day: 11, holidayLabel: '' },
            { day: 18, holidayLabel: '' },
            { day: 25, holidayLabel: '' },
            { day: '', holidayLabel: '' }
          ]
        },
        { 
          label: 'Th', 
          dates: [
            { day: 5, holidayLabel: '' },
            { day: 12, holidayLabel: '' },
            { day: 19, holidayLabel: '' },
            { day: 26, holidayLabel: '' },
            { day: '', holidayLabel: '' }
          ]
        },
        { 
          label: 'Fr', 
          dates: [
            { day: 6, holidayLabel: '' },
            { day: 13, holidayLabel: '' },
            { day: 20, holidayLabel: '' },
            { day: 27, holidayLabel: '' },
            { day: '', holidayLabel: '' }
          ]
        },
        { 
          label: 'Sa', 
          dates: [
            { day: 7, holidayLabel: '' },
            { day: 14, holidayLabel: '' },
            { day: 21, holidayLabel: '' },
            { day: 28, holidayLabel: '' },
            { day: '', holidayLabel: '' }
          ]
        }
      ]
    }
  };

  const holidays = [
    { date: 15, month: 'Feb', name: 'Maha Shivaratri' },
    { date: 28, month: 'Feb-Mar', name: 'Mar Holi' },
    { date: 27, month: 'Mar', name: 'Ram Navami' }
  ];

  const handleDateClick = (date: number) => {
    if (date && onDateSelect) {
      onDateSelect(`${date} Feb '26`);
    }
    if (nextStep) {
      nextStep();
    }
    onClose();
  };

  return (
    <div className="bg-white rounded-lg shadow-xl border p-6 w-[900px] max-w-[90vw] max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-800 text-lg">{title}</h3>
        <button 
          onClick={onClose} 
          className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex gap-8">
        {/* February Calendar - Vertical Layout */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <button className="p-1 hover:bg-gray-100 rounded">
              <ChevronLeft size={20} />
            </button>
            <h4 className="font-bold text-gray-800">{verticalCalendarData.february.month}</h4>
            <button className="p-1 hover:bg-gray-100 rounded">
              <ChevronRight size={20} />
            </button>
          </div>
          
          <div className="flex gap-3">
            {verticalCalendarData.february.days.map((dayData, index) => (
              <div key={index} className="flex-1 min-w-[50px]">
                {/* Day header */}
                <div className="text-center text-xs font-semibold text-gray-500 py-1 mb-1 h-6">
                  {dayData.label}
                </div>
                
                {/* Dates for this day of week */}
                <div className="flex flex-col items-center space-y-2">
                  {dayData.dates.map((date, dateIndex) => {
                    const isSelected = date.selected;
                    const hasHolidayLabel = date.holidayLabel;
                    
                    return (
                      <div key={dateIndex} className="relative h-10">
                        {date.day ? (
                          <>
                            <button
                              onClick={() => handleDateClick(date.day as number)}
                              className={`w-8 h-8 flex items-center justify-center text-sm rounded text-center ${
                                isSelected
                                  ? 'bg-mmt-orange text-white font-bold'
                                  : date.day === 15 && dayData.label === 'Su'
                                  ? 'text-gray-800 font-bold'
                                  : 'text-gray-700 hover:bg-gray-100'
                              }`}
                            >
                              {date.day}
                            </button>
                            
                            {/* Holiday label */}
                            {hasHolidayLabel && (
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 text-[10px] text-gray-600 whitespace-nowrap mt-1">
                                {date.holidayLabel}
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="w-8 h-8"></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* March Calendar - Vertical Layout */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <button className="p-1 hover:bg-gray-100 rounded">
              <ChevronLeft size={20} />
            </button>
            <h4 className="font-bold text-gray-800">{verticalCalendarData.march.month}</h4>
            <button className="p-1 hover:bg-gray-100 rounded">
              <ChevronRight size={20} />
            </button>
          </div>
          
          <div className="flex gap-3">
            {verticalCalendarData.march.days.map((dayData, index) => (
              <div key={index} className="flex-1 min-w-[50px]">
                {/* Day header */}
                <div className="text-center text-xs font-semibold text-gray-500 py-1 mb-1 h-6">
                  {dayData.label}
                </div>
                
                {/* Dates for this day of week */}
                <div className="flex flex-col items-center space-y-2">
                  {dayData.dates.map((date, dateIndex) => {
                    const hasHolidayLabel = date.holidayLabel;
                    
                    return (
                      <div key={dateIndex} className="relative h-10">
                        {date.day ? (
                          <>
                            <button
                              onClick={() => handleDateClick(date.day as number)}
                              className={`w-8 h-8 flex items-center justify-center text-sm rounded text-center ${
                                date.day === 27 && dayData.label === 'Th'
                                  ? 'text-gray-800 font-bold'
                                  : 'text-gray-700 hover:bg-gray-100'
                              }`}
                            >
                              {date.day}
                            </button>
                            
                            {/* Holiday label */}
                            {hasHolidayLabel && (
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 text-[10px] text-gray-600 whitespace-nowrap mt-1">
                                {date.holidayLabel}
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="w-8 h-8"></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Holidays Section */}
        <div className="w-64 flex-shrink-0">
          <h4 className="font-bold text-gray-800 mb-4">Holidays</h4>
          <div className="space-y-4">
            {holidays.map((holiday, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">
                    {holiday.date} {holiday.month}
                  </div>
                  <div className="text-gray-600 text-sm mt-1">
                    {holiday.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* "Apply" button moved here to match second image */}
          <div className="mt-8 pt-6 border-t">
            <button 
              onClick={() => {
                if (nextStep) nextStep();
                onClose();
              }}
              className="w-full bg-mmt-orange hover:bg-mmt-orange-hover text-white font-bold py-3 px-6 rounded-lg"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatePickerDropdown;