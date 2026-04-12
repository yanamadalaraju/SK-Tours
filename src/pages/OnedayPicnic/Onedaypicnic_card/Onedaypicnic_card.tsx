import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BASE_URL } from "@/ApiUrls";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

interface PicnicItem {
  picnic_id: number;
  picnic_code: string;
  name: string;
  price: string;
  main_image: string;
}

const Onedaypicnic_card: React.FC = () => {
  const navigate = useNavigate();
  const [picnics, setPicnics] = useState<PicnicItem[]>([]);
  const [filteredPicnics, setFilteredPicnics] = useState<PicnicItem[]>([]);
  
  // Filter states
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchBtn, setShowSearchBtn] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [selectedPicnicCodes, setSelectedPicnicCodes] = useState<string[]>([]);
  const [showMorePicnics, setShowMorePicnics] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL}/api/one-day-picnic`)
      .then((res) => res.json())
      .then((data) => {
        setPicnics(data);
        setFilteredPicnics(data);
      })
      .catch((err) => console.error("Error fetching picnics:", err));
  }, []);

  // Filter picnics based on selections
  useEffect(() => {
    let result: PicnicItem[] = [];

    // Add selected picnics by code
    if (selectedPicnicCodes.length > 0) {
      selectedPicnicCodes.forEach(code => {
        const foundPicnic = picnics.find(p => p.picnic_code === code);
        if (foundPicnic) {
          result.push(foundPicnic);
        }
      });
    } else {
      result = [...picnics];
    }

    // Filter by price
    result = result.filter(picnic =>
      parseFloat(picnic.price) >= priceRange[0] &&
      parseFloat(picnic.price) <= priceRange[1]
    );

    // Filter by search query
    if (isSearchActive && searchQuery.trim() !== "") {
      const query = searchQuery.trim().toLowerCase();
      result = result.filter(picnic =>
        picnic.name.toLowerCase().includes(query) ||
        picnic.picnic_code.toLowerCase().includes(query)
      );
    }

    setFilteredPicnics(result);
  }, [selectedPicnicCodes, picnics, priceRange, searchQuery, isSearchActive]);

  const handleCardClick = (picnic: PicnicItem): void => {
    navigate(`/onedaybooking/${picnic.picnic_id}`);
  };

  const handleViewClick = (e: React.MouseEvent, picnic: PicnicItem): void => {
    e.stopPropagation();
    navigate(`/onedaybooking/${picnic.picnic_id}`);
  };

  const handleBookClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
    navigate(`/ondaypicnicform`);
  };

  const handlePicnicCheckboxChange = (code: string, checked: boolean) => {
    if (checked) {
      setSelectedPicnicCodes(prev => [...prev, code]);
    } else {
      setSelectedPicnicCodes(prev => prev.filter(c => c !== code));
    }
  };

  const clearAllFilters = () => {
    setPriceRange([0, 200000]);
    setSearchQuery("");
    setShowSearchBtn(false);
    setIsSearchActive(false);
    setSelectedPicnicCodes([]);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setShowSearchBtn(false);
    setIsSearchActive(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchActive(searchQuery.trim() !== "");
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#E53C42] bg-opacity-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters Sidebar */}
            <aside className="lg:w-80">
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl shadow-lg p-6 border border-blue-200 sticky top-24">
                <div className="flex justify-between items-center mb-6 bg-[#2E4D98] p-2 rounded-lg border border-black">
                  <h2 className="text-2xl font-bold text-white">One Day Picnic</h2>
                  <button onClick={clearAllFilters} className="text-sm text-white hover:underline">
                    Clear All
                  </button>
                </div>

                {/* Price Filter */}
                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-4 text-[#2E4D98]">Price Range</h3>
                  <div className="flex justify-between text-sm text-gray-600 mb-3">
                    <span>₹{priceRange[0].toLocaleString()}</span>
                    <span>₹{priceRange[1].toLocaleString()}</span>
                  </div>
                  <Slider 
                    value={priceRange} 
                    onValueChange={setPriceRange} 
                    min={0} 
                    max={200000} 
                    step={1000} 
                    className="w-full" 
                  />
                </div>

                {/* Search */}
                <div className="mb-4">
                  <form onSubmit={handleSearch} className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        type="text"
                        placeholder="Search by name or code"
                        value={searchQuery}
                        onChange={(e) => { 
                          setSearchQuery(e.target.value); 
                          setShowSearchBtn(e.target.value.trim() !== ""); 
                        }}
                        onFocus={() => setShowSearchBtn(true)}
                        className="border-[#2E4D98] focus:border-[#2E4D98] focus:ring-[#2E4D98] pr-8 placeholder:text-sm"
                      />
                      {searchQuery && (
                        <button 
                          type="button" 
                          onClick={() => { clearSearch(); setShowSearchBtn(false); }}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                    {showSearchBtn && (
                      <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-6">
                        Search
                      </Button>
                    )}
                  </form>
                </div>

                {/* Picnic Checkboxes */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-3 bg-white p-2 rounded-lg border border-black">
                    <h2 className="text-xl font-bold text-[#2E4D98]">Picnic Types</h2>
                  </div>
                  <div className="space-y-3">
                    {picnics.length > 0 ? (
                      Array.from(new Map(picnics.map(p => [p.picnic_code, p])).values())
                        .slice(0, showMorePicnics ? undefined : 6)
                        .map((picnic) => (
                          <div key={picnic.picnic_code} className="flex items-center gap-3 cursor-pointer">
                            <Checkbox
                              checked={selectedPicnicCodes.includes(picnic.picnic_code)}
                              onCheckedChange={(checked) => handlePicnicCheckboxChange(picnic.picnic_code, checked as boolean)}
                              className="data-[state=checked]:bg-[#2E4D98] data-[state=checked]:border-[#2E4D98]"
                            />
                            <span
                              className={`text-gray-700 hover:text-[#2E4D98] cursor-pointer ${selectedPicnicCodes.includes(picnic.picnic_code) ? 'font-bold text-[#2E4D98]' : ''}`}
                              onClick={() => handlePicnicCheckboxChange(picnic.picnic_code, !selectedPicnicCodes.includes(picnic.picnic_code))}
                            >
                              {picnic.name} ({picnic.picnic_code})
                            </span>
                          </div>
                        ))
                    ) : (
                      <div className="text-sm text-gray-400">Loading picnics...</div>
                    )}
                  </div>
                  {picnics.length > 6 && (
                    <button 
                      onClick={() => setShowMorePicnics(!showMorePicnics)} 
                      className="mt-4 text-[#2E4D98] text-sm font-semibold hover:underline"
                    >
                      {showMorePicnics ? "Show Less" : `Show ${picnics.length - 6} More`}
                    </button>
                  )}
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              {/* Header banner */}
              <div
                className="relative rounded-2xl overflow-hidden mb-6 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('https://360biznus.com/wp-content/uploads/2025/08/360-virtual-tour-of-shiva-carpets1.jpg')` }}
              >
                <div className="p-8 min-h-[180px] flex items-center">
                  <div className="text-white">
                    <h1 className="text-3xl font-bold mb-2" style={{ textShadow: "2px 2px 4px rgb(0,0,0)" }}>
                      One Day Picnic Booking
                    </h1>
                    <p className="text-base opacity-90 max-w-2xl" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}>
                      Perfect getaways for a memorable day
                    </p>
                    <p className="text-sm opacity-80 mt-2" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}>
                      Showing {filteredPicnics.length} picnics
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">Available Picnics</h2>
                  <p className="text-gray-600 mt-1">Showing {filteredPicnics.length} picnics • Best prices guaranteed</p>
                </div>
              </div>

              {/* Picnic Cards */}
              {filteredPicnics.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold text-gray-600">No picnics found for the selected filters</h3>
                  <p className="text-gray-500 mt-2">Try adjusting your filters or search criteria</p>
                  <Button onClick={clearAllFilters} className="mt-4 bg-[#2E4D98] hover:bg-[#2E4D98] hover:opacity-90 text-white">
                    Clear All Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPicnics.map((item) => (
                    <div key={item.picnic_id} className="flex flex-col">
                      {/* Two-column header UI - OUTSIDE the card */}
                      <div className="bg-white border-2 border-gray-300 rounded-lg p-3 mb-3 shadow-sm">
                        <div className="grid grid-cols-2 gap-0 border border-gray-400 rounded overflow-hidden">
                          <div className="bg-[#2E4D98] border-r border-gray-400 p-2 flex items-center justify-center">
                            <div className="text-sm font-bold text-white text-center"> {item.name}</div>
                          </div>
                          <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-2 flex items-center justify-center">
                            <div className="text-sm font-bold text-gray-900 text-center">
                              {item.picnic_code}
                            </div>
                          </div>
                        </div>
                      
                      </div>

                      {/* Card Content */}
                      <div
                        onClick={() => handleCardClick(item)}
                        className="group bg-blue-50 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border border-blue-100 flex flex-col"
                      >
                        <div className="relative h-56 overflow-hidden">
                          <img
                            src={`${BASE_URL}${item.main_image}`}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                              const parent = e.currentTarget.parentElement;
                              if (parent) {
                                const errorDiv = document.createElement('div');
                                errorDiv.className = "flex flex-col items-center justify-center w-full h-full text-gray-700 p-4 bg-blue-50";
                                errorDiv.innerHTML = `<span class="text-center text-sm">${item.name}</span><span class="text-center text-xs text-gray-600 mt-2">Image not available</span>`;
                                parent.appendChild(errorDiv);
                              }
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        </div>

                        <div className="p-5 flex-1 flex flex-col">
                          <div className="mb-3 flex items-center">
                            <span className="w-[150px] text-sm text-[#2E4D98] font-bold">Price</span>
                            <p className="text-2lg font-bold text-gray-900 ml-auto text-right">
                              ₹{parseFloat(item.price).toLocaleString('en-IN')}
                            </p>
                          </div>

                          <div className="flex gap-2 mt-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 border-[#2E4D98] text-[#2E4D98] hover:bg-[#2E4D98] hover:text-white"
                              onClick={(e) => handleViewClick(e, item)}
                            >
                              View
                            </Button>

                            <Button
                              size="sm"
                              className="flex-1 bg-[#E53C42] hover:bg-[#E53C42] hover:opacity-90 text-white"
                              onClick={(e) => handleBookClick(e)}
                            >
                              Book Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Onedaypicnic_card;