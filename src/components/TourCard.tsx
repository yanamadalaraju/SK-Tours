// components/TourCard.tsx
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Users, Star, ArrowRight } from "lucide-react";

interface TourCardProps {
  title: string;
  subtitle?: string;
  locations: string;
  price: string;
  emi?: string;
  duration: string;
  dates?: string;
  badge?: string;
  badgeType?: "bestseller" | "offer" | "new" | "luxury";
  image?: string;
  rating?: number;
  reviews?: number;
}

const TourCard: React.FC<TourCardProps> = ({
  title,
  subtitle = "Beach • Adventure • Relaxation",
  locations = "Port Blair • Havelock • Neil Island",
  price = "₹64,000",
  emi = "EMI from ₹2,387/month",
  duration = "6N/7D",
  dates = "42 Dates",
  badge,
  badgeType = "bestseller",
  image = "https://images.unsplash.com/photo-1552465011-b4e30bfb9b6e?w=800&q=80",
  rating = 4.8,
  reviews = 284
}) => {
  const badgeStyles = {
    bestseller: "bg-orange-100 text-orange-700 border border-orange-300",
    offer: "bg-red-100 text-red-700 border border-red-300",
    new: "bg-purple-100 text-purple-700 border border-purple-300",
    luxury: "bg-amber-100 text-amber-700 border border-amber-300"
  };

  return (
    <div className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 cursor-pointer">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Badge */}
        {badge && (
          <div className="absolute top-4 left-4 z-10">
            <Badge className={`${badgeStyles[badgeType]} font-bold px-4 py-2 text-sm`}>
              {badge}
            </Badge>
          </div>
        )}

        {/* Duration Badge */}
        <div className="absolute top-4 right-4 z-10 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
          <span className="text-sm font-bold text-gray-800 flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {duration}
          </span>
        </div>

        {/* Rating */}
        <div className="absolute bottom-4 left-4 z-10 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500 fill-current" />
          <span className="font-bold text-gray-800">{rating}</span>
          <span className="text-xs text-gray-600">({reviews})</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title & Subtitle */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {locations}
          </p>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2">
          {subtitle.split(" • ").map((tag, i) => (
            <span key={i} className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full font-medium">
              {tag}
            </span>
          ))}
        </div>

        {/* Price Section */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm text-gray-500">Starting Price</p>
              <p className="text-3xl font-bold text-gray-800">
                {price}
                <span className="text-sm font-normal text-gray-500">/person</span>
              </p>
              {emi && <p className="text-sm text-green-600 font-medium mt-1">{emi}</p>}
            </div>
            
            <div className="text-right">
              <p className="text-xs text-gray-500">Available Dates</p>
              <p className="text-lg font-bold text-green-600">{dates}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button 
            variant="outline" 
            className="flex-1 h-12 font-semibold border-2 hover:bg-blue-50 hover:border-blue-500 group"
          >
            View Details
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button 
            className="flex-1 h-12 font-bold bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg"
          >
            Book Now
          </Button>
        </div>
      </div>

      {/* Hover Shine Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>
    </div>
  );
};

export default TourCard;