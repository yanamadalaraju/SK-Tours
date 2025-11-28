import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ScreensShowcase = () => {
  const screens = [
    {
      title: "Cruise Bookings",
      description: "Browse and book from our extensive collection of cruise options with detailed itineraries and pricing",
      category: "Cruises",
    },
    {
      title: "MICE Solutions",
      description: "Plan corporate events, conferences, and incentive programs with our comprehensive MICE management",
      category: "Events",
    },
    {
      title: "Visa Processing",
      description: "Simple and efficient visa application services for multiple countries with expert guidance",
      category: "Visa Services",
    },
    {
      title: "Tour Packages",
      description: "Discover curated tour packages to exotic destinations with flexible durations and budgets",
      category: "Tours",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-content-bg/30 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-brand-blue/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-brand-blue/10 text-brand-blue px-4 py-2 rounded-full text-sm font-semibold">
              Our Platform
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
            Experience <span className="bg-gradient-to-r from-brand-blue to-brand-red bg-clip-text text-transparent">Innovation</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            A glimpse into our comprehensive booking and management system
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-6xl mx-auto">
          {screens.map((screen, index) => (
            <Card 
              key={index} 
              className="group overflow-hidden border-2 border-border hover:border-brand-blue bg-background/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-3"
            >
              <CardContent className="p-0">
                {/* Image/Preview Section */}
                <div className="relative h-56 overflow-hidden">
                  {/* Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary via-brand-blue to-brand-blue/80">
                    {/* Animated Mesh Pattern */}
                    <div className="absolute inset-0 opacity-30">
                      <div className="absolute top-0 left-0 w-32 h-32 bg-brand-red rounded-full blur-2xl animate-float"></div>
                      <div className="absolute bottom-0 right-0 w-40 h-40 bg-brand-yellow/50 rounded-full blur-2xl animate-float" style={{ animationDelay: "1s" }}></div>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="inline-flex items-center gap-2 bg-background/90 backdrop-blur-sm text-foreground text-xs font-bold px-4 py-2 rounded-full shadow-lg border border-border">
                      {screen.category}
                    </span>
                  </div>

                  {/* Title Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center z-10 bg-gradient-to-t from-primary/60 to-transparent">
                    <h3 className="text-3xl font-bold text-primary-foreground px-6 text-center transform group-hover:scale-110 transition-transform duration-500">
                      {screen.title}
                    </h3>
                  </div>

                  {/* Decorative Corner Elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-brand-yellow opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-brand-yellow opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Content Section */}
                <div className="p-8 relative">
                  {/* Decorative Line */}
                  <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-brand-blue to-transparent"></div>

                  <p className="text-muted-foreground mb-6 leading-relaxed text-base">
                    {screen.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button 
                      variant="blue" 
                      size="sm"
                      className="flex-1 hover:shadow-glow-blue transition-all duration-300"
                    >
                      View Details
                    </Button>
                    <Button 
                      variant="red" 
                      size="sm"
                      className="flex-1 hover:shadow-glow-red transition-all duration-300"
                    >
                      Get Started
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScreensShowcase;
