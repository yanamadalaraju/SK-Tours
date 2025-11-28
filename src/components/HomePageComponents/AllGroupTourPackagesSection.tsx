import React, { useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  BedSingle,
  Utensils,
  Camera,
  Plane,
  Bus,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type TourPackage = {
  id: number;
  code: string; // VK / U4 etc
  nightsDays: string; // 8N / 9D
  title: string;
  months: string[];
  price: string;
  secondaryPrice?: string;
  datesLabel: string;
  ctaLabel: string;
  image: string;
};

const tourPackages: TourPackage[] = [
  {
    id: 1,
    code: "VK",
    nightsDays: "8N / 9D",
    title: "Kilimanjaro Trek",
    months: ["Jan", "Aug"],
    price: "₹3,88,490",
    datesLabel: "3 Dates",
    ctaLabel: "Book Online",
    image:
      "https://images.pexels.com/photos/128756/pexels-photo-128756.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: 2,
    code: "U4",
    nightsDays: "11N / 12D",
    title: "USA West Coast With Mt Rushmore & Yellowstone NP",
    months: ["May"],
    price: "$5,500",
    secondaryPrice: "* JL ₹4,75,542",
    datesLabel: "1 Date",
    ctaLabel: "View Tour",
    image:
      "https://images.pexels.com/photos/210243/pexels-photo-210243.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: 3,
    code: "SM",
    nightsDays: "4N / 5D",
    title: "Andaman With Swaraj Dweep",
    months: ["Dec", "Jan", "Feb", "Mar"],
    price: "₹59,990",
    datesLabel: "9 Dates",
    ctaLabel: "Book Online",
    image:
      "https://images.pexels.com/photos/7425765/pexels-photo-7425765.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: 4,
    code: "W2",
    nightsDays: "4N / 5D",
    title: "Hyderabad Ramoji Film City",
    months: ["Dec", "Jan"],
    price: "₹50,990",
    datesLabel: "4 Dates",
    ctaLabel: "Book Online",
    image:
      "https://images.pexels.com/photos/225231/pexels-photo-225231.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: 5,
    code: "AA",
    nightsDays: "10N / 11D",
    title: "Australian Escape",
    months: ["Dec", "Feb", "Mar"],
    price: "₹4,57,412",
    datesLabel: "2 Dates",
    ctaLabel: "Book Online",
    image:
      "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

const AllGroupTourPackagesSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = 320; // approx width incl. gap
    scrollRef.current.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-10 md:py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-5 md:mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
            All Group Tour Packages
          </h2>

          <div className="flex items-center gap-3 md:gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            </div>
            <button className="text-sm md:text-base font-semibold text-red-600 hover:underline">
              View all
            </button>
          </div>
        </div>

        {/* Cards row */}
        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-5 overflow-x-auto pb-2 no-scrollbar"
        >
          {tourPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.12)] border border-gray-100 min-w-[280px] max-w-[320px] flex-shrink-0 flex flex-col"
            >
              {/* Top image + badges */}
              <div className="relative rounded-t-3xl overflow-hidden h-40 md:h-44">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover"
                />
                {/* code circle */}
                <div className="absolute left-3 top-3 flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-red-600 text-white text-xs font-semibold flex items-center justify-center shadow">
                    {pkg.code}
                  </div>
                  <div className="px-2 py-1 rounded bg-black/70 text-white text-[11px] font-medium">
                    {pkg.nightsDays}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="px-4 pt-3 pb-4 flex-1 flex flex-col">
                {/* Title */}
                <h3 className="text-sm md:text-base font-semibold text-gray-900 line-clamp-2 mb-2">
                  {pkg.title}
                </h3>

                {/* Months */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {pkg.months.map((m) => (
                    <span
                      key={m}
                      className="px-2 py-0.5 rounded bg-gray-100 text-[11px] font-medium text-gray-700"
                    >
                      {m}
                    </span>
                  ))}
                </div>

                {/* Tour Includes */}
                <div className="mb-2">
                  <p className="text-xs font-semibold text-gray-800">
                    Tour Includes
                  </p>
                  <div className="mt-1 flex items-center gap-2 text-red-600">
                    <BedSingle className="w-4 h-4" />
                    <Utensils className="w-4 h-4" />
                    <Bus className="w-4 h-4" />
                    <Camera className="w-4 h-4" />
                    <Plane className="w-4 h-4" />
                  </div>
                </div>

                {/* Price */}
                <div className="mt-2 mb-3">
                  <p className="text-[11px] text-gray-500">
                    All inclusive tour price starts
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg md:text-xl font-semibold text-gray-900">
                      {pkg.price}
                    </span>
                    {pkg.secondaryPrice && (
                      <span className="text-[11px] text-gray-500">
                        {pkg.secondaryPrice}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1">
                    {pkg.datesLabel}
                  </p>
                </div>

                {/* Primary CTA */}
                <Button
                  variant="red"
                  className="w-full mt-auto rounded-xl h-10 text-sm font-semibold"
                >
                  {pkg.ctaLabel}
                </Button>
              </div>

              {/* Bottom actions */}
              <div className="px-4 py-2.5 border-t border-gray-100 flex items-center gap-3 text-[11px] text-gray-700">
                <div className="flex items-center gap-1 text-green-600 cursor-pointer">
                  <MessageCircle className="w-4 h-4" />
                  <span>Request Callback</span>
                </div>
                <span className="text-gray-300">|</span>
                <button className="hover:underline">Get Itinerary</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllGroupTourPackagesSection;
