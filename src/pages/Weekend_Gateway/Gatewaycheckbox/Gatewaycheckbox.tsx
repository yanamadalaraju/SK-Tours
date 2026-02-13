import { useState, useEffect } from 'react';

interface SelectedLocations {
  [key: string]: boolean;
}

const Gatewaycheckbox: React.FC = () => {
  const [selectedLocations, setSelectedLocations] = useState<SelectedLocations>({});
  const [showLocations, setShowLocations] = useState<boolean>(true);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  const locations: string[] = [
    'Alibaug',
    'Aamby Valley',
    'Goa',
    'Igatpuri',
    'Karjat',
    'Khopoli',
    'Kashid',
    'Lonavala',
    'Mahabaleshwar',
    'Murbad',
    'Neral',
    'Panvel',
    'Saputara'
  ];

  // Detect Mobile + iPad Mini screen width
  useEffect(() => {
    const checkScreenSize = (): void => {
      const width = window.innerWidth;
      setIsSmallScreen(width >= 360 && width <= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleLocationChange = (location: string): void => {
    setSelectedLocations(prev => ({
      ...prev,
      [location]: !prev[location]
    }));
  };

  const handleHeaderClick = (): void => {
    if (isSmallScreen) {
      setShowLocations(!showLocations);
    }
  };

  const handleToggleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    if (isSmallScreen) setShowLocations(!showLocations);
  };

  return (
    <div className="font-sans w-full max-w-[800px] mx-5 my-5 md:mx-auto md:my-5 desktop:max-w-[800px] ipad:max-w-[700px] mobile:mx-2.5 mobile:my-2.5">
      <div className="bg-[#f8f9fa] border border-[#dee2e6] rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] overflow-hidden">
        
        {/* HEADER CLICK */}
        <div
          className="flex justify-between items-center p-4 md:p-[15px_20px] bg-white border-b border-[#dee2e6] mobile:p-3 ipad:p-[15px_20px]"
          onClick={handleHeaderClick}
          style={{ cursor: isSmallScreen ? "pointer" : "default" }}
        >
          <div className="text-red-600 font-bold text-xl m-0 mobile:text-lg ipad:text-xl">
            Weekend Gateway
          </div>
          <button
            className="bg-none border-none cursor-pointer text-[#6c757d] text-xl p-1.5 rounded transition-colors duration-200 ease hover:bg-[#e9ecef] mobile:text-lg ipad:text-xl"
            onClick={handleToggleClick}
          >
            <i className={`bi ${showLocations ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
          </button>
        </div>

        {/* LOCATION LIST */}
        {showLocations && (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2.5 p-5 mobile:grid-cols-[repeat(auto-fill,minmax(120px,1fr))] mobile:gap-2 mobile:p-4 ipad:grid-cols-[repeat(auto-fill,minmax(140px,1fr))] ipad:gap-3 ipad:p-5 desktop:grid-cols-[repeat(auto-fill,minmax(150px,1fr))] desktop:gap-4 desktop:p-5">
            {locations.map((location) => {
              const safeName = location.replace(/\s+/g, '-');
              return (
                <div
                  key={location}
                  className="flex items-center p-2 rounded transition-colors duration-200 ease bg-white border border-[#e9ecef] hover:bg-[#f8f9fa] hover:border-[#0d6efd] mobile:p-[6px_10px]"
                >
                  <input
                    className={`cursor-pointer accent-[#0d6efd] mr-2.5`}
                    type="checkbox"
                    id={`GGCB-location-${safeName}`}
                    checked={selectedLocations[location] || false}
                    onChange={() => handleLocationChange(location)}
                  />
                  <label
                    className={`cursor-pointer`}
                    htmlFor={`GGCB-location-${safeName}`}
                  >
                    {location}
                  </label>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default Gatewaycheckbox;