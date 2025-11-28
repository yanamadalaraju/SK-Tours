import { useRef } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    title: "A Birthday to Remember in Dubai!",
    rating: 5.0,
    text: `Our recent Dubai tour was absolutely unforgettable! A huge thank you to our amazing tour leader for making every moment so special and perfectly organized. From exploring the city’s stunning landmarks to experiencing its vibrant nightlife, everything was spot on.`,
    name: "Shruti Sawant",
    date: "Nov 05, 2025",
    avatar:
      "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 2,
    title:
      "Flawless Planning, Seamless Execution — Our Memorable Kashmir Journey!",
    rating: 5.0,
    text: `Many thanks for the tour organized for us — this was our first tour to Kashmir and the experience was simply perfect. The planning, coordination, and execution were all flawless. We felt so homely and comfortable, even while being far away from home.`,
    name: "Sujatha Mahesh",
    date: "Oct 26, 2025",
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 3,
    title:
      "Away from Home, Yet So Close to Heart – Diwali Trip We’ll Never Forget",
    rating: 5.0,
    text: `We were part of the Shimla–Manali Diwali trip and it was a wonderful experience! Our group felt like one big happy family with people of all age groups. We’ve been on several tours before, and we can confidently say this was one of the best.`,
    name: "Sushant Langhi",
    date: "Oct 18, 2025",
    avatar:
      "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 4,
    title: "Perfectly Managed Europe Holiday",
    rating: 5.0,
    text: `Right from visas to flights and sightseeing, everything was handled smoothly. Our tour manager was knowledgeable, patient and always ready to help. We could just relax and enjoy Europe without worrying about the details.`,
    name: "Neha Kulkarni",
    date: "Sep 30, 2025",
    avatar:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
];

const TestimonialsSection = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = 360; // approx card width incl. gap
    scrollRef.current.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-[#174155] text-white py-12 md:py-16 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
            My Travel Story!
          </h2>
          <p className="mt-2 text-sm md:text-base text-white/80 max-w-2xl mx-auto">
            Customer satisfaction is our major goal. See what our customers are
            saying about us.
          </p>
        </div>

        {/* Slider wrapper */}
        <div className="relative max-w-6xl mx-auto">
          {/* Cards row */}
          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-6 overflow-x-auto pb-4 no-scrollbar"
          >
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-white text-gray-900 rounded-3xl shadow-[0_16px_40px_rgba(0,0,0,0.2)] min-w-[280px] md:min-w-[360px] max-w-[380px] flex-shrink-0 flex flex-col px-5 md:px-6 pt-5 pb-4"
              >
                {/* Title */}
                <h3 className="text-base md:text-lg font-semibold mb-2">
                  {t.title}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-2 text-sm">
                  <div className="flex text-[#f5a623]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-[#f5a623] stroke-[#f5a623]"
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-700">( {t.rating.toFixed(1)} )</span>
                </div>

                {/* Quote */}
                <div className="relative mb-4 text-sm text-gray-700 leading-relaxed">
                  <Quote className="w-5 h-5 text-gray-300 mb-1" />
                  <p className="text-[13px] md:text-sm line-clamp-4">
                    {t.text}
                  </p>
                  <button className="mt-1 text-xs font-semibold text-red-500 hover:underline">
                    ...Show More
                  </button>
                </div>

                {/* Footer: avatar + name + date */}
                <div className="mt-auto flex items-center gap-3 pt-2 border-t border-gray-100">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover mt-2"
                  />
                  <div className="mt-2">
                    <p className="text-sm font-semibold text-red-600">
                      {t.name}
                    </p>
                    <p className="text-xs text-gray-500">{t.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Left arrow */}
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white text-gray-700 shadow-md items-center justify-center hover:bg-gray-50 transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right arrow */}
          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white text-gray-700 shadow-md items-center justify-center hover:bg-gray-50 transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* See all button */}
        <div className="mt-8 flex justify-center">
          <Button
            variant="red"
            className="px-10 rounded-full font-semibold text-sm md:text-base"
          >
            See All
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
