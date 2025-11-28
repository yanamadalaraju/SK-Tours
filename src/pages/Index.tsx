
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ScreensShowcase from "@/components/ScreensShowcase";
import About from "@/components/About";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import HolidayPromo from "@/components/HomePageComponents/HolidayPromo";
import FestiveHolidaysSection from "@/components/HomePageComponents/HolidayPromo";

import AllGroupTourPackagesSection from "@/components/HomePageComponents/AllGroupTourPackagesSection";
import SeasonsTopDestinationsSection from "@/components/HomePageComponents/SeasonsTopDestinationsSection";
import LegacyStatsSection from "@/components/HomePageComponents/LegacyStatsSection";
import WhyChooseUsSection from "@/components/HomePageComponents/WhyChooseUsSection";
import LeadPopup from "@/components/HomePageComponents/LeadPopup";
import TrendingGroupHolidaysSection from "@/components/HomePageComponents/TrendingGroupHolidaysSection";
import DomesticToursSection from "@/components/HomePageComponents/DomesticToursSection";
import InternationalToursSection from "@/components/HomePageComponents/InternationalToursSection";
import WeekendGetawaysSection from "@/components/HomePageComponents/weekendGetaways";
import LadiesSpecialSection from "@/components/HomePageComponents/LadiesSpecialSection";
import StudentToursSection from "@/components/HomePageComponents/StudentToursSection";
import CustomerReviewsSection from "@/components/HomePageComponents/CustomerReviewsSection";
import Header from "@/components/Header";




const Index = () => {
  return (
    <>
    <LeadPopup  /> 
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <DomesticToursSection />
         <InternationalToursSection />
         <WeekendGetawaysSection />
         <LadiesSpecialSection />
         <StudentToursSection />
         <CustomerReviewsSection />
        {/* <FestiveHolidaysSection />
        
       
        <TrendingGroupHolidaysSection />
        <AllGroupTourPackagesSection />
        <SeasonsTopDestinationsSection /> */}

        {/* <LegacyStatsSection /> */}
        <WhyChooseUsSection />

        {/* <Features /> */}
        {/* <ScreensShowcase /> */}
        {/* <About /> */}
        {/* <CTA /> */}
      </main>
      <Footer />
    </div>
    </>
  );
};

export default Index;
