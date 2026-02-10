import { Mail, Phone, MapPin } from "lucide-react";
import { NavLink } from "react-router-dom";
import img from "../assets/png[3].png";

const Footer = () => {
  const quickLinks = [
    { label: "Tours", href: "/tours" },
    { label: "Cruises", href: "/cruises" },
    { label: "MICE", href: "/mice" },
    { label: "Flights", href: "/flights" },
    { label: "Hotels", href: "/hotels" },
  ];

  const company = [
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "Careers", href: "/careers" },
    { label: "Terms & Conditions", href: "/terms_conditions" },
    { label: "Privacy Policy", href: "/privacy_policy" },
    { label: "Cancellation Policy", href: "/cancellation_refund" },
  ];

  const associationLogos = [
    {
      name: "United Travel Enterprises",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-RYERIQuEYZDn8txNF4DQOzmqTJdioPjJQw&s",
      fallback: "UTE",
    },
  ];

  const socialMediaIcons = [
    {
      name: "Twitter",
      icon: "https://i.pinimg.com/736x/3b/30/52/3b30527d299464f04cd3653be37ee410.jpg",
      href: "#",
      fallback: "TW",
    },
    {
      name: "Instagram",
      icon: "https://i.pinimg.com/736x/de/84/ec/de84ece92c36f184e873fa090c9e7624.jpg",
      href: "#",
      fallback: "IG",
    },
    {
      name: "LinkedIn",
      icon: "https://i.pinimg.com/736x/75/b4/ba/75b4ba35bf36a56372278fb3e9ce9014.jpg",
      href: "#",
      fallback: "IN",
    },
  ];

  return (
    <footer className="bg-gradient-to-r from-[#0F1F5C] via-[#1F3F93] to-[#0F1F5C] text-white pt-8 pb-6">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo & About - Center on mobile, then responsive */}
          <div className="sm:text-left lg:col-span-1">
            <div className="flex flex-col items-center sm:items-start lg:items-center gap-4">
              {/* Logo */}
              <img 
                src={img} 
                alt="SK Tours" 
                className="h-14 sm:h-16 lg:h-16 mb-2 lg:mb-4" 
              />
              
              {/* Text and social icons container */}
              <div className="flex-1 text-center sm:text-left lg:text-center">
                <p className="text-white/80 text-sm mb-4">
                  Your Vacation in Five Continents.
                </p>

                {/* Icons - Center on mobile, left on tablet, center on desktop */}
                <div className="flex gap-4 justify-center sm:justify-start lg:justify-center">
                  {socialMediaIcons.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="bg-white/10 hover:bg-[#E31B23] p-2 rounded-full transition-all duration-300 hover:scale-110"
                      aria-label={`Follow us on ${social.name}`}
                    >
                      <img 
                        src={social.icon} 
                        alt={social.name} 
                        className="w-5 h-5" 
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links - Full width on mobile, half on tablet, quarter on desktop */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-left">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index} className="text-left">
                  <NavLink 
                    to={link.href} 
                    className={({ isActive }) => 
                      `text-sm flex items-center transition-all duration-300 hover:translate-x-1
                       ${isActive
                         ? "text-[#E31B23] font-semibold"
                         : "text-white/80 hover:text-[#E31B23]"
                       }`
                    } 
                    end
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Company - Full width on mobile, half on tablet, quarter on desktop */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-left">Company</h3>
            <ul className="space-y-2">
              {company.map((link, index) => (
                <li key={index} className="text-left">
                  <NavLink 
                    to={link.href} 
                    className={({ isActive }) => 
                      `text-sm flex items-center transition-all duration-300 hover:translate-x-1
                       ${isActive
                         ? "text-[#E31B23] font-semibold"
                         : "text-white/80 hover:text-[#E31B23]"
                       }`
                    } 
                    end
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact - Full width on mobile, spans 2 cols on tablet, quarter on desktop */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-bold mb-4 text-left">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2 text-white/80 items-start text-left">
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>Dadar West, Mumbai 400028</span>
                </div>
              </li>
              <li className="flex gap-2 text-white/80 items-start text-left">
                <div className="flex items-center gap-2">
                  <Phone size={16} />
                  <span>+91 9820870771</span>
                </div>
              </li>
              <li className="flex gap-2 text-white/80 items-start text-left">
                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  <span>salil@sktt.in</span>
                </div>
              </li>

              {/* Member of Section */}
              <li className="pt-4 mt-4 border-t border-white/20">
                <h4 className="font-bold mb-3 border-b-2 inline-block border-[#E31B23] text-left">
                  Member of
                </h4>
                <div className="flex justify-start gap-4 mt-3">
                  {associationLogos.map((item, i) => (
                    <img 
                      key={i} 
                      src={item.logo} 
                      alt={item.name} 
                      className="h-8 sm:h-10" 
                    />
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright - Center aligned on all screens */}
        <div className="border-t border-white/20 pt-6">
          <p className="text-sm sm:text-base text-white/70 text-center px-2">
            © {new Date().getFullYear()} SK Tours. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;