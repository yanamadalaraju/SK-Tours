import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import TourPackages from "./pages/TourPackages";
import IntlTourPackages from "./pages/InternationalTourPackages";

import AboutPage from "./pages/AboutPage";
import TourDetails from "./pages/TourDetails";
import Ladiesspecial_tour from "./pages/Ladiesspecial_tour";

import Students_tour from "./pages/Students_tour";
import IntlStudents_tour from "./pages/InternationalStudents_tour";

import Honeymoon_tours from "./pages/Honeymoon_tours";
import IntlHoneymoon_tours from "./pages/InternationalHoneymoon_tours";


import ContactPage from "./pages/Contact";
import Tour_indain from "./pages/Tour_indain";
import Tourdetails_indian from "./pages/Tourdetails_indian";
import IntlTourdetails_indian from "./pages/InternationalTourdetails_indian";

import Ladies_tour from "./pages/Ladies_tour/Ladies_tour";
import IntlLadies_tour from "./pages/Ladies_tour/InternationalLadies_tour"




import Seniors_tour from "./pages/Senior_tour/Seniors_tour";
import IntlSenior_tour from "./pages/Senior_tour/InternationalSeniors_tour";



import Terms_conditions from "./pages/Terms_Conditions/Terms_conditions";
import Privacy_policy from "./pages/Privacy_policy/Privacy_policy";
import CheckOutPage from "./pages/CheckOutPage"
import CheckoutPage from "./pages/CheckOutPage";
import PaymentResult from "./pages/PaymentResult";
import Alert from "./pages/Alertfolder/Alert";
import Cancellation_policy from "./pages/Cancellation_policy/Cancellation_policy";
import Cancellation_Refund from "./pages/Cancellation_policy/Cancellation_Refund";
import International_tours_packages from "./pages/International_Tours/International_tours_packages/International_tours_packages"
import TourPdfDocument from "./pages/TourPdfDocument";
import International_group from "./pages/International_Tours/International_group/International_group";
import International_ladies from "./pages/International_Tours/International_ladies/International_ladies";
import International_students from "./pages/International_Tours/International_students/International_students";
import International_honeymoon from "./pages/International_Tours/International_honyemoon/International_honeymoon";
import International_senior from "./pages/International_Tours/International_senior/International_senior";
import International_Tourdetails from "./pages/International_Tours/International_details/International_Tourdetails";
import Exhibition from "./pages/Exhibition/Exhibition";

import TourEnquiry from "./pages/ToursEnquiry";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Home />} />
<Route path="/tours-packages/:state" element={<TourPackages />} />
<Route path="/intl-tours-packages/:state" element={<IntlTourPackages />} />

<Route path="/checkout" element={<CheckoutPage />} />
<Route path="/payment-result" element={<PaymentResult />} />
          <Route path="/about" element={<AboutPage />} />
<Route path="/tour/:tourId" element={<TourDetails />} />
          <Route path="/ladies"  element={<Ladiesspecial_tour />} />

<Route path="/students_tours/:state" element={<Students_tour />} />
<Route path="/intl-students_tours/:state" element={<IntlStudents_tour />} />

<Route path="/contact" element={<ContactPage />} />

<Route path="/honeymoon_tours/:state" element= {<Honeymoon_tours />} />
<Route path="/intl-honeymoon_tours/:state" element= {<IntlHoneymoon_tours />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />

          <Route path="/tours_indian" element={<Tour_indain />} />
          <Route path="/tours_groups/:state" element={<Tourdetails_indian />} />
          <Route path="/intl-tours_groups/:state" element={<IntlTourdetails_indian />} />
          <Route path="/ladies_tours/:state" element={<Ladies_tour />} />
           <Route path="/intl-ladies_tours/:state" element={<IntlLadies_tour />} />
          <Route path="/senior_tours/:state" element={<Seniors_tour />} />
          <Route path="/intl-senior_tours/:state" element={<IntlSenior_tour/>} />
          <Route path="/terms_conditions" element={<Terms_conditions />} />
<Route path="/privacy_policy" element={<Privacy_policy />} />
<Route path="/alert" element={<Alert />} />
<Route path="/cancellation_policy" element={<Cancellation_policy />} />
<Route path="/cancellation_refund" element={<Cancellation_Refund />} />

<Route path="/international-tours-packages/:state" element={<International_tours_packages />} />
<Route path="/tourpdfdocument" element={<TourPdfDocument />} />
<Route path="/international-tours_groups/:state" element={<International_group />} />
<Route path="/international-ladies_tours/:state" element={<International_ladies />} />
<Route path="/international-senior_tours/:state" element={<International_students />} />
<Route path="/international-honeymoon_tours/:state" element={<International_honeymoon />} />
<Route path="/international-senior_tours/:state" element={<International_senior />} />
<Route path="/international_tour_details/:tourId" element={<International_Tourdetails />} />
<Route path="/exhibition" element={<Exhibition />} />


<Route path="/tour-enquiry" element={<TourEnquiry />} />


        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
