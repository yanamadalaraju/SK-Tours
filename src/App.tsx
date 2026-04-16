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
import CheckoutPageFlights from "./pages/CheckOutPageFlights"
// Add this import
import CheckoutPageOfflineFlights from "./pages/OfflineFlightBlocks/CheckoutPageOfflineFlights";
import CheckoutPageHotels from "./pages/OfflineHotelBooking/CheckoutPageHotels";

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
import FlightHotels from "./pages/Flightmain/FlightHotels";
import SeatSelection from "./pages/Flightmain/Seatselection";
import BookingConfirmation from "./pages/Flightmain/BookingConfirmation";
import Flightfrontend from "./pages/Flight/hotels/Flightfrontend";
import TourPdfDocumentinternational from "./pages/TourPdfDocumentinternational";
import Login from "./pages/Loginpage/Login";
import SignUp from "./pages/SignUp/SignUp";
import OfflineFllghtBlocks from "./pages/OfflineFlightBlocks/OfflineFllghtBlocks";
import HotelSearchBar from "./pages/OfflineHotelBooking/HotelsMain";
import MicePage from "./pages/MICS/Micepage";
import AboutMice from "./pages/MICS/AboutMic";
import Micpackages from "./pages/MICS/Micpackages";
import EnquiryForm from "./pages/MICS/EnquiryForm";
import BankGallery from "./pages/MICS/BankGallery";
import VenuePhotos from "./pages/MICS/VenuePhotos";
import MiceGallery from "./pages/MICS/Micegallery";
import Bungalowcheckbox from "./pages/Bungalows/Bungalow_checkbox/Bungalowcheckbox";
import Bunglowbookingcard from "./pages/Bungalows/Bunglowbookingcard/Bunglowbookingcard";
import BookingForm from "./pages/Bungalows/Bookingform/BookingForm";
import Bungalow from "./pages/Bungalows/Bungalows_card/Bungalows";
import Gatewaycheckbox from "./pages/Weekend_Gateway/Gatewaycheckbox/Gatewaycheckbox";
import Weekendcard from "./pages/Weekend_Gateway/Weekendcard/Weekendcard";
import Weekendbookingcard from "./pages/Weekend_Gateway/Weekendbookingcard/Weekendbookingcard";
import WeekendForm from "./pages/Weekend_Gateway/WeekendForm/WeekendForm";
// In your App.js or routing file, add the route:

import FlightPaymentResult from './pages/FlightsPaymentStatus';
import FestivalCards from "./pages/Festival/Festtival";
import OneDaySports from "./pages/Sports/Sports";
import Insurances from "./pages/Insurance/Insurances";
import Apidata from "./pages/Apidata";
import Sports from "./pages/Sports";
import Festival from "./pages/Festival";
import InternationalSports from "./pages/InternationalSports";
import InternationalFestival from "./pages/InternationalFestival";
import PassportFormOneM from "./pages/Passport/Passport";

// Import ScrollToTop component
import ScrollToTop from "./components/ScrollToTop";
import Onedaypicnic_cardbooking from "./pages/OnedayPicnic/Onedaypicnicbookingcard/Onedaypicnic_cardbooking";
import Onedaypicnic_checkbox from "./pages/OnedayPicnic/Onedaypicnic_checkbox/Onedaypicnic_checkbox";
import Onedaypicnic_card from "./pages/OnedayPicnic/Onedaypicnic_card/Onedaypicnic_card";
import Onedaypicnic from "./pages/OnedayPicnic/OnedayPicnic/Onedaypicnic";
import ExhibitionDashboard from "./pages/Exhibition/Exhibitionend";
import ExhibitionStatic from "./pages/Exhibition/Exhibitionview";
import Exhibitiondetail from "./pages/Exhibition/Exhibitiondetail";
import Exhibitioninternationalindetail from "./pages/Exhibition/Exhibitioninternationalindetail";
import Mic_categoires from "./pages/MICS/Mic_categoires";
import Micedomesticdetail from "./pages/MICS/Micedomesticdetail";
import Miceview from "./pages/MICS/Miceview";
import Miceinternationaldetail from "./pages/MICS/Miceinternationaldetail";
import Agentlogin from "./pages/Agent/Agentlogin";
import Agentsignup from "./pages/Agent/Agentsignup";
import CheckoutExhibition from "./pages/Exhibition/CheckoutPageExhibition";
import CheckoutMice from './pages/MICS/CheckoutMice';
import CheckoutPageBungalow from "./pages/Bungalows/Bookingform/CheckoutPageBungalow";
import CheckoutPagePicnic from "./pages/OnedayPicnic/OnedayPicnic/CheckoutPagePicnic";
import CheckoutPageWeekend from "./pages/Weekend_Gateway/WeekendForm/CheckoutPageWeekend";

import CheckoutPagePassport from './pages/Passport/CheckoutPagePassport';
import HotelDetailPage from "./pages/OfflineHotelBooking/HotelDetailPage";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* Add ScrollToTop here - it will run on every route change */}
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Home />} />
          <Route path="/tours-packages/:state" element={<TourPackages />} />
          <Route path="/intl-tours-packages/:state" element={<IntlTourPackages />} />

          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/checkoutflights" element={<CheckoutPageFlights />} />
          <Route path="/checkout-offline-flights" element={<CheckoutPageOfflineFlights />} />
          <Route path="/checkout-hotels" element={<CheckoutPageHotels />} />

            <Route path="/checkout-exhibition" element={<CheckoutExhibition />} />
            <Route path="/checkout-mice" element={<CheckoutMice />} />

            <Route path="/checkout-bungalow" element={<CheckoutPageBungalow />} />
            <Route path="/checkout-picnic" element={<CheckoutPagePicnic />} />
            <Route path="/checkout-weekend" element={<CheckoutPageWeekend />} />
          
            <Route path="/checkout-passport" element={<CheckoutPagePassport />} />



          <Route path="/payment-result" element={<PaymentResult />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/tour/:tourId" element={<TourDetails />} />
          <Route path="/ladies" element={<Ladiesspecial_tour />} />

          <Route path="/students_tours/:state" element={<Students_tour />} />
          <Route path="/intl-students_tours/:state" element={<IntlStudents_tour />} />

          <Route path="/contact" element={<ContactPage />} />

          <Route path="/honeymoon_tours/:state" element={<Honeymoon_tours />} />
          <Route path="/intl-honeymoon_tours/:state" element={<IntlHoneymoon_tours />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />

          <Route path="/tours_indian" element={<Tour_indain />} />
          <Route path="/tours_groups/:state" element={<Tourdetails_indian />} />
          <Route path="/intl-tours_groups/:state" element={<IntlTourdetails_indian />} />
          <Route path="/ladies_tours/:state" element={<Ladies_tour />} />
          <Route path="/intl-ladies_tours/:state" element={<IntlLadies_tour />} />
          <Route path="/senior_tours/:state" element={<Seniors_tour />} />
          <Route path="/intl-senior_tours/:state" element={<IntlSenior_tour />} />
          <Route path="/terms_conditions" element={<Terms_conditions />} />
          <Route path="/privacy_policy" element={<Privacy_policy />} />
          <Route path="/alert" element={<Alert />} />
          <Route path="/cancellation_policy" element={<Cancellation_policy />} />
          <Route path="/cancellation_refund" element={<Cancellation_Refund />} />

          <Route path="/international-tours-packages/:state" element={<International_tours_packages />} />
          <Route path="/tourpdfdocument" element={<TourPdfDocument tour={undefined} tourType={""} isGroupTour={false} selectedCostMonth={""} selectedCostDate={""} selectedDeparture={undefined} currentImageIndex={0} />} />
          <Route path="/international-tours_groups/:state" element={<International_group />} />
          <Route path="/international-ladies_tours/:state" element={<International_ladies />} />
          <Route path="/international-senior_tours/:state" element={<International_students />} />
          <Route path="/international-honeymoon_tours/:state" element={<International_honeymoon />} />
          <Route path="/international-senior_tours/:state" element={<International_senior />} />
          <Route path="/international_tour_details/:tourId" element={<International_Tourdetails />} />

          <Route path="/flighthotels" element={<FlightHotels />} />
          <Route path="/FlightSeatSelection" element={<SeatSelection flightData={undefined} fareQuoteData={undefined} passengers={{ adults: 0, children: 0, infants: 0 }} onBack={() => { }} onBookingComplete={function (bookingResponse: any): void {
            throw new Error("Function not implemented.");
          }} bookingTokenId={""} token={""} endUserIp={""} staticParam={""} />} />
          <Route path="/bookinginformation" element={<BookingConfirmation bookingData={{}} referenceId="" passengerDetails={[]} contactDetails={{}} onBack={() => { }} />} />
          <Route path="/flightfrontend" element={<Flightfrontend />} />
          <Route path="/international-tours-packages/:state" element={<International_tours_packages />} />
          <Route path="/tourpdfdocument" element={<TourPdfDocument tour={undefined} tourType={""} isGroupTour={false} selectedCostMonth={""} selectedCostDate={""} selectedDeparture={undefined} currentImageIndex={0} />} />
          <Route path="/international-tours_groups/:state" element={<International_group />} />
          <Route path="/international-ladies_tours/:state" element={<International_ladies />} />
          <Route path="/international-senior_tours/:state" element={<International_students />} />
          <Route path="/international-honeymoon_tours/:state" element={<International_honeymoon />} />
          <Route path="/international-senior_tours/:state" element={<International_senior />} />
          <Route path="/international_tour_details/:tourId" element={<International_Tourdetails />} />
          <Route path="/exhibition" element={<Exhibition />} />
          <Route path="/flighthotels" element={<FlightHotels />} />
          <Route path="/FlightSeatSelection" element={<SeatSelection flightData={undefined} fareQuoteData={undefined} passengers={{ adults: 0, children: 0, infants: 0 }} onBack={() => { }} onBookingComplete={function (bookingResponse: any): void {
            throw new Error("Function not implemented.");
          }} bookingTokenId={""} token={""} endUserIp={""} staticParam={""} />} />
          <Route path="/bookinginformation" element={<BookingConfirmation bookingData={{}} referenceId="" passengerDetails={[]} contactDetails={{}} onBack={() => { }} />} />
          <Route path="/flightfrontend" element={<Flightfrontend />} />

          <Route path="/tour-enquiry" element={<TourEnquiry />} />
          <Route path="/tourpdfinternational" element={<TourPdfDocumentinternational tour={undefined} tourType={""} isGroupTour={false} selectedCostMonth={""} selectedCostDate={""} selectedDeparture={undefined} currentImageIndex={0} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/offlinehotelbooking" element={<HotelSearchBar />} />
          <Route path="/hotel-detail" element={<HotelDetailPage />} />
          // In your App.tsx or router configuration
<Route path="/hotel-detail/:id" element={<HotelDetailPage />} />
          <Route path="/micpage" element={<MicePage />} />
          <Route path="/aboutmic" element={<AboutMice />} />
          <Route path="/micpackages" element={<Micpackages />} />
          <Route path="/enquiryformmic" element={<EnquiryForm />} />
          <Route path="/offlineflightblocks" element={<OfflineFllghtBlocks />} />
          <Route path="bankgallery" element={<BankGallery />} />
          <Route path="/venuephotos" element={<VenuePhotos />} />
          <Route path="/micgallery" element={<MiceGallery />} />


          // Add this route
          <Route path="/flight-payment-result" element={<FlightPaymentResult />} />


          <Route path="/bungalow" element={<Bungalow />} />
          <Route path="/bungalowcheckbox" element={<Bungalowcheckbox />} />
          <Route path="/bunglowbookingcard/:id" element={< Bunglowbookingcard />} />
          <Route path="/bookingform" element={<BookingForm />} />
          <Route path="/weekendcheckbox" element={<Gatewaycheckbox />} />
          <Route path="/Weekendcard" element={<Weekendcard />} />
          <Route path="/Weekendbookingcard" element={<Weekendbookingcard />} />
          <Route path="/Weekendbookingcard/:id" element={<Weekendbookingcard />} />
          <Route path="/WeekendForm" element={<WeekendForm />} />
          <Route path="/festivalcard" element={<FestivalCards />} />
          <Route path="/sportscard" element={<OneDaySports />} />
          <Route path="/sports/:state" element={<Sports />} />
          <Route path="/festival/:state" element={<Festival />} />
          <Route path="/intl-sports/:state" element={<InternationalSports />} />
          <Route path="/intl-festival/:state" element={<InternationalFestival />} />
          <Route path="/passport" element={<PassportFormOneM />} />
          <Route path="/onedaybooking" element={<Onedaypicnic_cardbooking />} />
          <Route path="/onedaybooking/:id" element={<Onedaypicnic_cardbooking />} />

          <Route path="/ondaycard" element={<Onedaypicnic_card />} />
          <Route path="/ondaypicnicform" element={<Onedaypicnic />} />

          <Route path="/onedaycardcheckbox" element={<Onedaypicnic_checkbox />} />
          <Route path="/exhibitionend" element={<ExhibitionDashboard />} />
          <Route  path="/exhibitionview" element={<ExhibitionStatic />} />
          <Route path="/exhibitiondetail" element={<Exhibitiondetail />} />
          <Route path="/exhibitiondetail/:tourId" element={<Exhibitiondetail />} />
          <Route path="/insuranceform" element={<Insurances />} />
          <Route path="/exhibitioninternationalindetail" element={<Exhibitioninternationalindetail />} />
          <Route path="/exhibitioninternationalindetail/:tourId" element={<Exhibitioninternationalindetail />} />

          <Route path="/apidata" element={<Apidata />} />

          <Route path="/miccategoires" element={<Mic_categoires />} />
          <Route path="/micedomesticdetail" element={<Micedomesticdetail />} />
          <Route path="/micedomesticdetail/:tourId" element={<Micedomesticdetail />} />

          
          <Route path="/miceview/" element={<Miceview />} />
          <Route path="/miceinternationaldetail" element={<Miceinternationaldetail />} />
          <Route path="/miceinternationaldetail/:tourId" element={<Miceinternationaldetail />} />
          <Route path="/agentlogin" element={<Agentlogin />} />

          <Route path="/agentsingnup" element={<Agentsignup />} />

          {/* <Route path="/exhibition/:type/:category" element={<ExhibitionStatic />} /> */}
          {/* <Route path="/mice/:type/:city/:location" element={<Miceview />} /> */}




        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;