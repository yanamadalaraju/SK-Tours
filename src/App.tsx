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
import Seniorcitizen_tour from "./pages/Seniorcitizen_tour";
import Students_tour from "./pages/Students_tour";
import Honeymoon_tours from "./pages/Honeymoon_tours";
import ContactPage from "./pages/Contact";

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
<Route path="/tours-packages/:state?" element={<TourPackages />} />
          <Route path="/about" element={<AboutPage />} />
<Route path="/tour/:tourId" element={<TourDetails />} />
          <Route path="/ladies"  element={<Ladiesspecial_tour />} />
          <Route path="/seniorcitizen" element={<Seniorcitizen_tour />} />
<Route path="/students_tour" element={<Students_tour />} />
<Route path="/contact" element={<ContactPage />} />
<Route path="/honeymoon_tour" element= {<Honeymoon_tours />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
