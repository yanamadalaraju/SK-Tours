import { Award, Globe, Users, Clock } from "lucide-react";

const About = () => {
  const stats = [
    { icon: Users, value: "10,000+", label: "Happy Clients" },
    { icon: Globe, value: "50+", label: "Destinations" },
    { icon: Award, value: "15+", label: "Years Experience" },
    { icon: Clock, value: "24/7", label: "Support" },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              About SK Tours
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              SK Tours is your trusted travel partner, offering comprehensive travel solutions 
              for over 15 years. From luxury cruise packages and corporate MICE events to visa 
              assistance and customized tour packages, we handle every aspect of your journey 
              with professionalism and care.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mt-4">
              Our team of experienced travel consultants works tirelessly to create memorable 
              experiences, whether you're planning a family vacation, a corporate retreat, or 
              an adventure of a lifetime.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
