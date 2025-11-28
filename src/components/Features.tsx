import { Ship, Plane, Hotel, CreditCard, Users, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Features = () => {
  const features = [
    {
      icon: Ship,
      title: "Luxury Cruises",
      description: "Explore world-class cruise lines including Oceania, Royal Caribbean, and Star Cruises with exclusive packages",
    },
    {
      icon: Users,
      title: "MICE Events",
      description: "Comprehensive solutions for Meetings, Incentives, Conferences, and Events with premium venues",
    },
    {
      icon: MapPin,
      title: "Tour Packages",
      description: "Curated tour experiences from beach paradises to cultural heritage sites across popular destinations",
    },
    {
      icon: Plane,
      title: "Flight Bookings",
      description: "Competitive rates on domestic and international flights with all major airlines",
    },
    {
      icon: Hotel,
      title: "Hotel Reservations",
      description: "Handpicked accommodations from budget stays to luxury resorts worldwide",
    },
    {
      icon: CreditCard,
      title: "Visa Services",
      description: "Hassle-free visa assistance for tourist, business, student, and transit visas",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(223_67%_39%/0.05)_0%,transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
              What We Offer
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
            Our <span className="bg-gradient-to-r from-brand-red to-brand-blue bg-clip-text text-transparent">Premium</span> Services
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive travel solutions tailored to make your journey seamless and memorable
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group border-2 hover:border-brand-red bg-card backdrop-blur-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden relative"
            >
              {/* Hover Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-red/5 to-brand-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <CardContent className="p-8 relative z-10">
                {/* Icon with Glow Effect */}
                <div className="relative mb-6 inline-block">
                  <div className="absolute inset-0 bg-brand-red/20 rounded-2xl blur-xl group-hover:bg-brand-red/40 transition-all duration-500"></div>
                  <div className="relative bg-gradient-to-br from-primary to-brand-blue w-16 h-16 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <feature.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-card-foreground mb-4 group-hover:text-brand-red transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Animated Border on Hover */}
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-brand-red to-brand-blue w-0 group-hover:w-full transition-all duration-500"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
