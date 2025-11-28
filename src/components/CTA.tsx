import { Button } from "@/components/ui/button";
import { Phone, Mail, ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-brand-blue to-primary"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-red rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-yellow rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }}></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary-foreground)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary-foreground)/0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Glass Card */}
          <div className="bg-background/5 backdrop-blur-xl border-2 border-primary-foreground/20 rounded-3xl p-8 md:p-12 lg:p-16 shadow-2xl">
            {/* Badge */}
            <div className="flex justify-center mb-6">
              <span className="inline-flex items-center gap-2 bg-brand-red/90 text-primary-foreground px-5 py-2 rounded-full text-sm font-bold shadow-lg">
                <span className="animate-pulse">🔥</span>
                Limited Time Offer
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-primary-foreground text-center">
              Ready to Start Your
              <br />
              <span className="bg-gradient-to-r from-brand-yellow via-brand-red to-brand-yellow bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                Dream Journey?
              </span>
            </h2>
            
            <p className="text-lg md:text-2xl mb-10 text-primary-foreground/90 text-center max-w-3xl mx-auto leading-relaxed">
              Let our expert team help you plan the perfect trip. Get in touch today 
              for personalized travel solutions and exclusive deals.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-12">
              <Button 
                variant="red" 
                size="lg" 
                className="text-lg px-10 py-7 shadow-glow-red hover:shadow-glow-red hover:scale-105 transition-all duration-300 animate-glow"
              >
                Get Started Now
                <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-10 py-7 bg-background/10 backdrop-blur-sm border-2 border-primary-foreground/40 hover:bg-background/20 hover:border-primary-foreground/60 hover:scale-105 transition-all duration-300"
              >
                View All Services
              </Button>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col md:flex-row gap-8 justify-center items-center pt-10 border-t-2 border-primary-foreground/20">
              <a 
                href="tel:+91" 
                className="flex items-center gap-3 text-primary-foreground hover:text-brand-yellow transition-all duration-300 group"
              >
                <div className="p-3 bg-background/10 rounded-full group-hover:bg-brand-yellow/20 transition-all duration-300">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="text-xs text-primary-foreground/70">Call Us</div>
                  <div className="font-bold text-lg">+91 XXX XXX XXXX</div>
                </div>
              </a>
              
              <div className="hidden md:block w-px h-12 bg-primary-foreground/20"></div>
              
              <a 
                href="mailto:info@sktours.com" 
                className="flex items-center gap-3 text-primary-foreground hover:text-brand-yellow transition-all duration-300 group"
              >
                <div className="p-3 bg-background/10 rounded-full group-hover:bg-brand-yellow/20 transition-all duration-300">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="text-xs text-primary-foreground/70">Email Us</div>
                  <div className="font-bold text-lg">info@sktours.com</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
