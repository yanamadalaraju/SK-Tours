import React from 'react';
import {
  Heart,
  Shield,
  Star,
  Users,
  Globe,
  CheckCircle,
  Award,
  Target,
  Eye
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AboutPage = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-blue-50">
        {/* Hero Section with Background Image */}
        <section
          className="relative py-12 md:py-24 text-white"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative px-4 text-center max-w-7xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              About S K Tours & Travels
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-4xl mx-auto leading-relaxed px-2 sm:px-4 text-justify">
              Your trusted partner in crafting unforgettable journeys across India and around the world since 2000.
            </p>
          </div>
        </section>

        {/* Welcome Section */}
        <section className="bg-blue-100 border-t border-blue-200">
          <div className="py-6 md:py-8">

            {/* HEADER — FULL WIDTH */}
            <div className="w-full bg-gradient-to-r from-[#0F1F5C] via-[#1F3F93] to-[#0F1F5C] py-4 md:py-6 mb-6 md:mb-8 shadow-lg">
              <div className="w-full px-4 sm:px-6 lg:px-8 text-center">
                <h3
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-extrabold mb-2 md:mb-4"
                  style={{
                    fontFamily: "'Baloo 2', sans-serif",
                    color: "white",
                    letterSpacing: "-1px",
                    textShadow: `
              1px 1px 0 #1F3F5C,
              -1px -1px 0 #1F3F5C,
              0 0 12px rgba(255, 255, 255, 0.55)
            `,
                  }}
                >
                  Welcome to S K Tours & Travels
                </h3>
              </div>
            </div>

            {/* SMALL CENTERED TEXT CARD */}
            <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">  
              <div
                className="rounded-lg md:rounded-2xl shadow-lg px-4 sm:px-6 lg:px-7 py-6 lg:py-8 border border-gray-100 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #0F1F5C 0%, #1F3F93 50%, #0F1F5C 100%)',
                }}
              >
                <div className="space-y-4 lg:space-y-6">
                  <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-white leading-relaxed text-justify">
                    We are more than just a travel agency — we are a dedicated team of travel planners,
                    destination specialists, and passionate explorers committed to turning your dream
                    vacations into reality.
                  </p>

                  <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-white leading-relaxed text-justify">
                    Whether you are looking to discover the vibrant culture of India, explore exotic
                    international destinations, or plan a corporate retreat, S K Tours & Travels
                    is here to elevate your travel experience with comfort, convenience, and personalized service.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Our Story Section */}
        <section className="bg-blue-100 border-blue-200">
          <div className="py-4 md:py-1">
            <div className="max-w-12xl mx-auto">

              {/* HEADER — FULL WIDTH */}
              <div className="w-full bg-gradient-to-r from-[#0F1F5C] via-[#1F3F93] to-[#0F1F5C] py-4 md:py-6 mb-6 md:mb-10 shadow-lg">
                <div className="w-full px-4 sm:px-6 lg:px-8">
                  <div className="text-center">
                    <h3
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-extrabold mb-2 md:mb-4"
                      style={{
                        fontFamily: "'Baloo 2', sans-serif",
                        color: "white",
                        letterSpacing: "-1px",
                        textShadow: `
                    1px 1px 0 #1F3F5C,
                    -1px -1px 0 #1F3F5C,
                    0 0 12px rgba(255, 255, 255, 0.55)
                  `,
                      }}
                    >
                      Our Story
                    </h3>
                  </div>
                </div>
              </div>
              
              <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
                <div
                  className="rounded-lg md:rounded-2xl shadow-lg px-4 sm:px-6 lg:px-7 py-6 lg:py-8 mb-6 md:mb-8 border border-gray-100 relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #0F1F5C 0%, #1F3F93 50%, #0F1F5C 100%)',
                  }}
                >
                  <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-white leading-relaxed mb-3 md:mb-4 text-justify">
                    S K Tours & Travels was founded on 01 January 2000 with a simple
                    principle — to make travel easy, enjoyable, and accessible for everyone.
                  </p>
                  <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-white leading-relaxed text-justify">
                    What began as a small initiative has now grown into a reliable travel brand known for its
                    professional service, ethical business practices, and customer-centric approach. Over the years,
                    we realized that travellers needed more than just bookings — they needed someone they could trust
                    to guide them, support them, and handle every detail with care.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Philosophy */}
        <section className="bg-blue-100 border-blue-200">
          <div className="py-4 md:py-1">
            <div className="max-w-12xl mx-auto">

              {/* HEADER — FULL WIDTH */}
              <div className="w-full bg-gradient-to-r from-[#0F1F5C] via-[#1F3F93] to-[#0F1F5C] py-4 md:py-6 mb-6 md:mb-10 shadow-lg">
                <div className="w-full px-4 sm:px-6 lg:px-8">
                  <div className="text-center">
                    <h3
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-extrabold mb-2 md:mb-4"
                      style={{
                        fontFamily: "'Baloo 2', sans-serif",
                        color: "white",
                        letterSpacing: "-1px",
                        textShadow: `
                    1px 1px 0 #1F3F5C,
                    -1px -1px 0 #1F3F5C,
                    0 0 12px rgba(255, 255, 255, 0.55)
                  `,
                      }}
                    >
                      Our Philosophy
                    </h3>
                  </div>
                </div>
              </div>
              
              <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
                <div
                  className="rounded-lg md:rounded-2xl shadow-lg px-4 sm:px-6 lg:px-7 py-6 lg:py-8 mb-6 md:mb-7 border border-gray-100 relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #0F1F5C 0%, #1F3F93 50%, #0F1F5C 100%)',
                  }}
                >
                  <div className="space-y-6 lg:space-y-8 text-white">

                    {/* Intro */}
                    <p className="text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed text-justify">
                      At S K Tours & Travels, we believe that travel is personal. Every traveller is different,
                      and every journey deserves a unique touch. That is why we follow a client-first philosophy —
                      ensuring that your comfort, safety, and preferences always come first.
                    </p>

                    {/* Transparency */}
                    <div>
                      <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-2 lg:mb-3 flex items-center">
                        <Shield className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-blue-200 mr-3 lg:mr-4" />
                        <span className="text-justify">Transparency</span>
                      </h3>
                      <p className="text-blue-100 text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed text-justify">
                        We offer clear, fair, and competitive pricing. No hidden charges. No last-minute surprises.
                        Everything is explained upfront. We deliver what we promise.
                      </p>
                    </div>

                    {/* Reliability */}
                    <div>
                      <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-2 lg:mb-3 flex items-center">
                        <Star className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-blue-200 mr-3 lg:mr-4" />
                        <span className="text-justify">Reliability</span>
                      </h3>
                      <p className="text-blue-100 text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed text-justify">
                        Our team is available whenever you need assistance — before, during, and after your trip.
                        From hotels and flights to transportation and sightseeing, we handpick services that meet our quality standards.
                      </p>
                    </div>

                    {/* Trust */}
                    <div>
                      <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-2 lg:mb-3 flex items-center">
                        <Heart className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-blue-200 mr-3 lg:mr-4" />
                        <span className="text-justify">Trust</span>
                      </h3>
                      <p className="text-blue-100 text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed text-justify">
                        Trust is the foundation of everything we do. Our clients depend on us for honest guidance,
                        safe arrangements, and reliable support. We love what we do — and it reflects in the care,
                        enthusiasm, and effort we put into planning every itinerary.
                      </p>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="bg-blue-100 border-blue-200">
          <div className="py-4 md:py-1">
            <div className="max-w-12xl mx-auto">

              {/* Header - FULL WIDTH */}
              <div className="w-full bg-gradient-to-r from-[#0F1F5C] via-[#1F3F93] to-[#0F1F5C] py-4 md:py-6 mb-6 md:mb-9 shadow-lg">
                <div className="w-full px-4 sm:px-6 lg:px-8 text-center">
                  <h3
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-extrabold text-white"
                    style={{
                      fontFamily: "'Baloo 2', sans-serif",
                      letterSpacing: "-1px",
                      textShadow: `
                1px 1px 0 #1F3F5C,
                -1px -1px 0 #1F3F5C,
                0 0 12px rgba(255, 255, 255, 0.55)
              `,
                    }}
                  >
                    What We Offer
                  </h3>
                </div>
              </div>
              
              <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
                {/* ONE BIG CARD */}
                <div
                  className="rounded-lg md:rounded-2xl shadow-lg px-4 sm:px-6 lg:px-7 py-6 lg:py-10 border border-blue-400"
                  style={{
                    background: 'linear-gradient(135deg, #0F1F5C 0%, #1F3F93 50%, #0F1F5C 100%)',
                  }}
                >
                  <div className="space-y-6 lg:space-y-10 text-white">

                    {/* Domestic Tours */}
                    <div>
                      <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-3 lg:mb-4 flex items-center">
                        <Globe className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-blue-200 mr-3 lg:mr-4" />
                        <span className="text-justify">Domestic Tours (All Over India)</span>
                      </h3>
                      <p className="text-blue-100 text-sm sm:text-base lg:text-lg xl:text-xl mb-3 lg:mb-4 leading-relaxed text-justify">
                        India is a land of incredible diversity — majestic mountains, sun-soaked beaches, royal palaces,
                        spiritual retreats, wildlife adventures, and vibrant cities.
                      </p>
                      <p className="text-blue-100 text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed text-justify">
                        We offer curated domestic tour packages to destinations including Himachal Pradesh, Rajasthan, Kerala,
                        Goa, Uttarakhand, Kashmir, North East India, Gujarat, Maharashtra, and many more. Whether you want a
                        peaceful getaway, an adventure trip, or a cultural experience, we craft tailor-made itineraries that
                        let you explore India's beauty comfortably and safely.
                      </p>
                    </div>

                    {/* International Tours */}
                    <div>
                      <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-3 lg:mb-4 flex items-center">
                        <Users className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-blue-200 mr-3 lg:mr-4" />
                        <span className="text-justify">International Tours</span>
                      </h3>
                      <p className="text-blue-100 text-sm sm:text-base lg:text-lg xl:text-xl mb-3 lg:mb-4 leading-relaxed text-justify">
                        Travel beyond borders with S K Tours & Travels. Our global travel packages include popular and exotic
                        destinations such as Dubai, Singapore, Thailand, Malaysia, Maldives, Bali, Mauritius, Europe, Turkey,
                        Vietnam, Cambodia, Laos, Australia, New Zealand, USA, Canada, Japan, China, Taiwan, Korea, African
                        Countries and other major international locations.
                      </p>
                      <p className="text-blue-100 text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed text-justify">
                        Our international experts handle all arrangements, including visa support, flights, hotels, sightseeing,
                        and travel insurance, ensuring a smooth travel experience anywhere in the world.
                      </p>
                    </div>

                    {/* Customized Packages */}
                    <div>
                      <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-3 lg:mb-4 flex items-center">
                        <Star className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-blue-200 mr-3 lg:mr-4" />
                        <span className="text-justify">Customized Holiday Packages</span>
                      </h3>
                      <p className="text-blue-100 text-sm sm:text-base lg:text-lg xl:text-xl mb-3 lg:mb-4 leading-relaxed text-justify">
                        No two travellers are alike, and neither should be their vacations. At S K Tours & Travels, we specialize
                        in creating personalized travel packages designed around your interests, travel dates, budget, and preferred activities.
                      </p>
                      <p className="text-blue-100 text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed text-justify">
                        Our custom holidays include honeymoon packages, family vacations, festival tours, solo travel plans, group tours,
                        senior-citizen-friendly holidays, adventure tours, luxury vacations, weekend getaways, and corporate and incentive tours.
                        We listen to your ideas, add our expertise, and deliver an itinerary that fits you perfectly.
                      </p>
                    </div>

                    {/* Additional Services */}
                    <div>
                      <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-4 lg:mb-6 text-center text-white">
                        <span className="text-justify">Additional Services</span>
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                        {[
                          "Flight Bookings with competitive fares",
                          "Hotel Reservations across India & internationally",
                          "Visa Assistance with complete support",
                          "Transportation Services with professional drivers",
                          "Corporate Travel Management",
                          "Travel Insurance",
                        ].map((service, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 lg:gap-4 bg-[#1F3F93]/60 rounded-lg lg:rounded-xl p-3 lg:p-4 border border-blue-300"
                          >
                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-300 flex-shrink-0" />
                            <span className="text-blue-100 text-xs sm:text-sm lg:text-base xl:text-lg text-justify">{service}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="bg-blue-100 border-t border-blue-200">
          <div className="px-4 sm:px-6 py-6 md:py-8">
            <div className="max-w-6xl mx-auto">

              <div
                className="rounded-lg md:rounded-2xl shadow-lg px-4 sm:px-6 lg:px-8 py-6 lg:py-10 border border-blue-400"
                style={{
                  background: 'linear-gradient(135deg, #0F1F5C 0%, #1F3F93 50%, #0F1F5C 100%)',
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 text-white">

                  {/* Mission */}
                  <div className="text-center md:text-left">
                    <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-3 lg:mb-4 flex items-center justify-center md:justify-start">
                      <Target className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-blue-200 mr-3 lg:mr-4" />
                      <span className="text-justify">Our Mission</span>
                    </h3>
                    <p className="text-blue-100 text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed text-justify">
                      Our mission is to make travel simple, affordable, and memorable for every customer.
                      We aim to create meaningful travel experiences that inspire you, connect you with different
                      cultures, and bring joy to your life.
                    </p>
                  </div>

                  {/* Vision */}
                  <div className="text-center md:text-left">
                    <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-3 lg:mb-4 flex items-center justify-center md:justify-start">
                      <Eye className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-blue-200 mr-3 lg:mr-4" />
                      <span className="text-justify">Our Vision</span>
                    </h3>
                    <p className="text-blue-100 text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed text-justify">
                      To become a trusted global travel brand known for our integrity, customer satisfaction,
                      and exceptional service quality — while continuing to grow through innovation and personalized
                      travel solutions.
                    </p>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* What Makes Us Different */}
        <section className="bg-blue-100 border-blue-200">
          <div className="py-4 md:py-1">
            <div className="max-w-12xl mx-auto">
              
              {/* Header - FULL WIDTH */}
              <div className="w-full bg-gradient-to-r from-[#0F1F5C] via-[#1F3F93] to-[#0F1F5C] py-4 md:py-6 mb-6 md:mb-10 shadow-lg">
                <div className="w-full px-4 sm:px-6 lg:px-8 text-center">
                  <h3
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-extrabold text-white"
                    style={{
                      fontFamily: "'Baloo 2', sans-serif",
                      letterSpacing: "-1px",
                      textShadow: `
                1px 1px 0 #1F3F5C,
                -1px -1px 0 #1F3F5C,
                0 0 12px rgba(255, 255, 255, 0.55)
              `,
                    }}
                  >
                    What Makes Us Different
                  </h3>
                </div>
              </div>
              
              <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 mb-6 md:mb-8">
                <div
                  className="rounded-lg md:rounded-2xl shadow-lg px-4 sm:px-6 lg:px-7 py-6 lg:py-10 border border-blue-400"
                  style={{
                    background: 'linear-gradient(135deg, #0F1F5C 0%, #1F3F93 50%, #0F1F5C 100%)',
                  }}
                >
                  <div className="space-y-6 lg:space-y-8 text-white">
                    {/* Intro */}
                    <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-white leading-relaxed mb-4 lg:mb-6 text-justify">
                      When you choose S K Tours & Travels, you are not choosing a travel agency — you are choosing
                      a team that genuinely cares about your journey. We go beyond bookings to ensure your comfort,
                      safety, and happiness. Every trip we plan reflects our commitment to excellence and our passion for travel.
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4 mb-4 lg:mb-6">
                      {[
                        "Personalized customer care and attention to detail",
                        "Extensive destination knowledge and industry experience",
                        "24/7 support team available worldwide",
                        "Quality accommodations and trusted partners",
                        "Thoughtfully designed custom itineraries",
                        "Maximum value for money without compromising quality",
                        "Strong network with hotels, airlines, and tourism boards",
                        "High repeat-customer rate and quick response time"
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <Award className="w-4 h-4 sm:w-5 sm:h-5 text-blue-200 flex-shrink-0 mt-1" />
                          <span className="text-white text-xs sm:text-sm lg:text-base xl:text-lg text-justify">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Outro */}
                    <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-white leading-relaxed mt-4 lg:mt-6 text-justify">
                      Whether it is your first international trip, a dream honeymoon, a weekend escape, or a family holiday,
                      we treat every itinerary with the same dedication and enthusiasm. Thousands of happy customers trust
                      us for personalized service, quick response time, hassle-free arrangements, and transparent pricing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;