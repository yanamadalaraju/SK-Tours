import React from 'react';
import { Star, MapPin, Check } from 'lucide-react';

const HotelCard: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-6">
      <div className="flex">
        {/* Hotel Image */}
        <div className="w-64 mr-6 flex-shrink-0">
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg h-48 w-full mb-3 flex items-center justify-center overflow-hidden">
            <div className="text-white text-center">
              <div className="text-4xl mb-2">🏨</div>
              <p className="font-bold text-lg">Estrela Do Mar</p>
              <p className="text-sm opacity-90">Beach Resort</p>
            </div>
          </div>
          <div className="flex items-center text-sm text-green-600 font-medium">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Free Cancellation Available
          </div>
        </div>

        {/* Hotel Details */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-3">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  Estrela Do Mar Beach Resort - A Beach Property
                  <span className="flex ml-2">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="fill-yellow-400 text-yellow-400" size={18} />
                    ))}
                    <Star className="text-gray-300" size={18} />
                  </span>
                </h2>
                <div className="flex items-center text-gray-600 mt-1">
                  <MapPin size={16} className="mr-1" />
                  <span>North Goa | About a minute walk to Calangute Beach</span>
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-semibold flex items-center">
                View on Map
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="mb-4">
            <ul className="space-y-2">
              <li className="flex items-start text-green-600">
                <Check size={18} className="mr-2 flex-shrink-0 mt-0.5" />
                <span className="font-medium">Free stay for both the kids</span>
              </li>
              <li className="flex items-start text-gray-700">
                <Check size={18} className="mr-2 flex-shrink-0 mt-0.5" />
                <span>Near Calangute Beach, swimming pool and jacuzzi, live music during meals</span>
              </li>
            </ul>
          </div>

          {/* Rating and Price */}
          <div className="flex justify-between items-end mt-6 pt-6 border-t">
            <div>
              <div className="flex items-center mb-3">
                <div className="bg-green-600 text-white px-3 py-1.5 rounded-l flex items-center">
                  <span className="font-bold">3.9</span>
                  <span className="ml-1.5 text-sm font-medium">Very Good</span>
                </div>
                <div className="bg-green-50 text-green-700 px-3 py-1.5 rounded-r">
                  <span className="text-sm">(8205 Ratings)</span>
                </div>
              </div>
              
              <div className="flex items-center">
                <span className="bg-red-50 text-red-600 text-xs font-bold px-2 py-1 rounded mr-2">
                  Limited Time Sale
                </span>
                <span className="text-sm text-gray-600">Per Night for 2 Rooms</span>
              </div>
            </div>

            {/* Price Section */}
            <div className="text-right">
              <div className="mb-1">
                <span className="text-gray-500 line-through text-sm">₹47,999</span>
              </div>
              <div className="flex items-baseline justify-end mb-2">
                <span className="text-2xl font-bold text-gray-800">₹10,518</span>
                <span className="text-gray-600 text-sm ml-2">+ ₹1,205 taxes & fees</span>
              </div>
              
              <div className="space-y-2">
                <button className="bg-mmt-orange hover:bg-mmt-orange-hover text-white font-bold py-3 px-8 rounded-lg transition-colors w-full">
                  VIEW ALL
                </button>
                <p className="text-blue-600 text-sm font-semibold">
                  Login to Book Now & Pay Later!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;