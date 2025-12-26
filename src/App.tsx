import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import TourPackages from "./pages/TourPackages";

import AboutPage from "./pages/AboutPage";
import TourDetails from "./pages/TourDetails";
import Ladiesspecial_tour from "./pages/Ladiesspecial_tour";

import Students_tour from "./pages/Students_tour";
import Honeymoon_tours from "./pages/Honeymoon_tours";
import ContactPage from "./pages/Contact";
import Tour_indain from "./pages/Tour_indain";
import Tourdetails_indian from "./pages/Tourdetails_indian";
import Ladies_tour from "./pages/Ladies_tour/Ladies_tour";
import Seniors_tour from "./pages/Senior_tour/Seniors_tour";
import Terms_conditions from "./pages/Terms_Conditions/Terms_conditions";
import Privacy_policy from "./pages/Privacy_policy/Privacy_policy";
import CheckOutPage from "./pages/CheckOutPage"
import CheckoutPage from "./pages/CheckOutPage";
import PaymentResult from "./pages/PaymentResult";
import Alert from "./pages/Alertfolder/Alert";



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
<Route path="/checkout" element={<CheckoutPage />} />
<Route path="/payment-result" element={<PaymentResult />} />
          <Route path="/about" element={<AboutPage />} />
<Route path="/tour/:tourId" element={<TourDetails />} />
          <Route path="/ladies"  element={<Ladiesspecial_tour />} />
<Route path="/students_tours/:state" element={<Students_tour />} />
<Route path="/contact" element={<ContactPage />} />
<Route path="/honeymoon_tours/:state" element= {<Honeymoon_tours />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />

          <Route path="/tours_indian" element={<Tour_indain />} />
          <Route path="/tours_groups/:state" element={<Tourdetails_indian />} />
          <Route path="/ladies_tours/:state" element={<Ladies_tour />} />
          <Route path="/senior_tours/:state" element={<Seniors_tour />} />


          <Route path="/terms_conditions" element={<Terms_conditions />} />
<Route path="/privacy_policy" element={<Privacy_policy />} />
<Route path="/alert" element={<Alert />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
