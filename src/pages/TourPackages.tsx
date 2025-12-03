import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

const TourPackages = () => {
  const navigate = useNavigate();
  const { state } = useParams(); // Get state from URL params
  const [viewMode] = useState<'grid' | 'list'>('grid');
  const [showMoreIndian, setShowMoreIndian] = useState(false);
  const [showMoreWorld, setShowMoreWorld] = useState(false);
  const [sortType, setSortType] = useState("recommended");
  
  // Filter states
  const [durationRange, setDurationRange] = useState([0 , 11]);
  const [priceRange, setPriceRange] = useState([0, 153000]);
  const [selectedDepartureMonths, setSelectedDepartureMonths] = useState<string[]>([]);
  const [selectedIndianTours, setSelectedIndianTours] = useState<string[]>([]);
  const [selectedWorldTours, setSelectedWorldTours] = useState<string[]>([]);
  const [filteredTours, setFilteredTours] = useState<any[]>([]);
  const [selectedState, setSelectedState] = useState<string>(state || "Andaman");

  // Complete tour data for all states
  const allTourData = {
    "Andaman": [
      {
        title: "Andaman Swaraj Dweep & Shaheed Dweep Delight",
        duration: "6N/7D",
        price: "₹64,000",
        emi: "EMI from ₹2,387/month",
        badge: "New Year Deal ₹1,000 Off",
        locations: "Port Blair • Havelock • Neil Island",
        dates: "42 Dates Available",
        image: "https://i.pinimg.com/736x/09/16/c4/0916c43d72ac007aee1a1a7d6d31d231.jpg",
        code: "AND00001",
        days: 7,
        
        priceValue: 64000,
        locationTags: ["Port Blair", "Havelock", "Neil Island"],
        isIndian: true
      },
      {
        title: "Andaman With Swaraj Dweep Premium",
        duration: "6N/7D",
        price: "₹42,000",
        emi: "EMI from ₹1,567/month",
        badge: "Best Seller",
        locations: "Port Blair • Havelock • Neil",
        dates: "34 Dates Available",
        image: "https://i.pinimg.com/1200x/6a/f9/0e/6af90eea656d653c788e7d3f92a77247.jpg",
        code: "AND00002",
        days: 7,
        priceValue: 42000,
        locationTags: ["Port Blair", "Havelock", "Neil"],
        isIndian: true
      },
      {
        title: "Andaman Luxury Escape",
        duration: "7N/8D",
        price: "₹89,000",
        emi: "EMI from ₹3,320/month",
        badge: "Luxury Collection",
        locations: "5-Star Resorts • Private Cruise",
        dates: "28 Dates",
        image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80",
        code: "AND00003",
        days: 8,
        priceValue: 89000,
        locationTags: ["5-Star Resorts", "Private Cruise"],
        isIndian: true
      },
      {
        title: "Andaman Family Adventure",
        duration: "5N/6D",
        price: "₹52,000",
        emi: "EMI from ₹1,940/month",
        badge: "Family Special",
        locations: "Port Blair • Havelock",
        dates: "38 Dates",
        image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
        code: "AND00004",
        days: 6,
        priceValue: 52000,
        locationTags: ["Port Blair", "Havelock"],
        isIndian: true
      },
      {
        title: "Andaman Romantic Beachside Retreat",
        duration: "5N/6D",
        price: "₹58,500",
        emi: "EMI from ₹2,175/month",
        badge: "Honeymoon Special",
        locations: "Havelock • Neil Island • Radhanagar Beach",
        dates: "29 Dates Available",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
        code: "AND00005",
        days: 6,
        priceValue: 58500,
        locationTags: ["Havelock", "Neil Island", "Radhanagar Beach"],
        isIndian: true
      },
      {
        title: "Complete Andaman Explorer",
        duration: "8N/9D",
        price: "₹99,500",
        emi: "EMI from ₹3,714/month",
        badge: "Explorer Pick",
        locations: "Baratang • Ross Island • Havelock • Neil",
        dates: "18 Dates Available",
        image: "https://i.pinimg.com/1200x/60/37/9a/60379a968deddaa202abffc3b2f02215.jpg",
        code: "AND00006",
        days: 9,
        priceValue: 99500,
        locationTags: ["Baratang", "Ross Island", "Havelock", "Neil"],
        isIndian: true
      },
      {
        title: "Andaman Budget Escape",
        duration: "4N/5D",
        price: "₹34,900",
        emi: "EMI from ₹1,309/month",
        badge: "Budget Friendly",
        locations: "Port Blair • North Bay • Cellular Jail",
        dates: "31 Dates Available",
        image: "https://i.pinimg.com/1200x/e5/07/bd/e507bd4266c581640bb6593dae1802a6.jpg",
        code: "AND00007",
        days: 5,
        priceValue: 34900,
        locationTags: ["Port Blair", "North Bay", "Cellular Jail"],
        isIndian: true
      },
      {
        title: "Andaman Luxury Cruise Package",
        duration: "7N/8D",
        price: "₹1,25,000",
        emi: "EMI from ₹4,678/month",
        badge: "Premium Cruise",
        locations: "Luxury Cruise • Private Beach • Water Villas",
        dates: "22 Dates Available",
        image: "https://i.pinimg.com/1200x/b2/f4/0d/b2f40d3b9996d971b8d43a41407423a4.jpg",
        code: "AND00008",
        days: 8,
        priceValue: 125000,
        locationTags: ["Luxury Cruise", "Private Beach", "Water Villas"],
        isIndian: true
      },
      {
        title: "Andaman Scuba Diving Adventure",
        duration: "6N/7D",
        price: "₹69,000",
        emi: "EMI from ₹2,560/month",
        badge: "Adventure Pick",
        locations: "Havelock • Elephant Beach • Dive School",
        dates: "25 Dates Available",
        image: "https://i.pinimg.com/1200x/04/01/1a/04011acc3effee9e7f692e2682082075.jpg",
        code: "AND00009",
        days: 7,
        priceValue: 69000,
        locationTags: ["Havelock", "Elephant Beach", "Dive School"],
        isIndian: true
      }
    ],
  "Andhra Pradesh": [
  {
    title: "Tirupati Spiritual Journey",
    duration: "3N/4D",
    price: "₹22,000", // Fixed: Added ₹ symbol
    emi: "EMI from ₹821/month", // Fixed: Corrected EMI calculation
    badge: "Popular",
    locations: "Tirupati • Tirumala • Chandragiri",
    dates: "52 Dates Available",
    image: "https://tirupatibalajitravels.co.in/wp-content/uploads/2024/02/special-entry-darshan-1.webp",
    code: "AP00001",
    days: 4,
    priceValue: 22000, // Fixed: Changed to match price
    locationTags: ["Tirupati", "Tirumala", "Chandragiri"],
    isIndian: true
  },
  {
    title: "Araku Valley Nature Retreat",
    duration: "4N/5D",
    price: "₹32,000",
    emi: "EMI from ₹1,194/month",
    badge: "Nature Lovers",
    locations: "Visakhapatnam • Araku Valley • Borra Caves",
    dates: "38 Dates Available",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxrI5imNHlP3NsAspZRwbo2piit_iCt20q-A&s",
    code: "AP00002",
    days: 5,
    priceValue: 32000,
    locationTags: ["Visakhapatnam", "Araku Valley", "Borra Caves"],
    isIndian: true
  },
  {
    title: "Complete Andhra Heritage Tour",
    duration: "7N/8D",
    price: "₹45,000",
    emi: "EMI from ₹1,679/month",
    badge: "Heritage Special",
    locations: "Amaravati • Vijayawada • Rajahmundry",
    dates: "25 Dates Available",
    image: "https://s7ap1.scene7.com/is/image/incredibleindia/1-amaravati-buddhist-site-guntur-andhra-pradesh-attr-hero?qlt=82&ts=1726743666481",
    code: "AP00003",
    days: 8,
    priceValue: 45000,
    locationTags: ["Amaravati", "Vijayawada", "Rajahmundry"],
    isIndian: true
  },
  {
    title: "Kurnool Historical Exploration",
    duration: "3N/4D",
    price: "₹22,000",
    emi: "EMI from ₹821/month",
    badge: "Historical",
    locations: "Kurnool • Belum Caves • Ahobilam",
    dates: "30 Dates Available",
    image: "https://tripxl.com/blog/wp-content/uploads/2024/09/Location-106.jpg",
    code: "AP00004",
    days: 4,
    priceValue: 22000,
    locationTags: ["Kurnool", "Belum Caves", "Ahobilam"],
    isIndian: true
  },
  {
    title: "Coastal Andhra Beach Tour",
    duration: "5N/6D",
    price: "₹38,000",
    emi: "EMI from ₹1,418/month",
    badge: "Beach Holiday",
    locations: "Bheemunipatnam • Rushikonda • Manginapudi",
    dates: "35 Dates Available",
    image: "https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2024/11/14102039/Vishakhapatnam-Andhra-Pradesh-India-1-1600x900.jpg",
    code: "AP00005",
    days: 6,
    priceValue: 38000,
    locationTags: ["Bheemunipatnam", "Rushikonda", "Manginapudi"],
    isIndian: true
  },
  {
    title: "Andhra Pradesh Luxury Escape",
    duration: "6N/7D",
    price: "₹68,000",
    emi: "EMI from ₹2,537/month",
    badge: "Luxury",
    locations: "5-Star Resorts • Private Tours",
    dates: "20 Dates Available",
    image: "https://images.luxuryescapes.com/fl_progressive,q_auto:eco,c_scale,w_650/odol6zuixkwnr3qct8nx.jpeg",
    code: "AP00006",
    days: 7,
    priceValue: 68000,
    locationTags: ["Luxury Resorts", "Private Tours"],
    isIndian: true
  },
  {
    title: "Family Fun Andhra Package",
    duration: "4N/5D",
    price: "₹28,000",
    emi: "EMI from ₹1,045/month",
    badge: "Family Special",
    locations: "Visakhapatnam • Araku • Vizag",
    dates: "45 Dates Available",
    image: "https://hldak.mmtcdn.com/prod-s3-hld-hpcmsadmin/holidays/images/cities/1208/Madurai.jpg?downsize=328:200",
    code: "AP00007",
    days: 5,
    priceValue: 28000,
    locationTags: ["Visakhapatnam", "Araku", "Vizag"],
    isIndian: true
  },
  {
    title: "Andhra Culinary Tour",
    duration: "4N/5D",
    price: "₹35,000",
    emi: "EMI from ₹1,306/month",
    badge: "Food Tour",
    locations: "Guntur • Vijayawada • Hyderabad Border",
    dates: "28 Dates Available",
    image: "https://im.hunt.in/cg/Andhra/About/Tourism/Andhra-Food.jpg",
    code: "AP00008",
    days: 5,
    priceValue: 35000,
    locationTags: ["Guntur", "Vijayawada", "Hyderabad Border"],
    isIndian: true
  },
  {
    title: "Andhra Pradesh Wildlife Adventure",
    duration: "5N/6D",
    price: "₹42,000",
    emi: "EMI from ₹1,567/month",
    badge: "Wildlife",
    locations: "Nagarjuna Sagar • Papikondalu • Coringa",
    dates: "22 Dates Available",
    image: "https://cdn.testbook.com/1697544528309-Sri%20Venkateswara%20Wildlife%20Sanctuary.webp/1697544530.webp",
    code: "AP00009",
    days: 6,
    priceValue: 42000,
    locationTags: ["Nagarjuna Sagar", "Papikondalu", "Coringa"],
    isIndian: true
  }
],
    "Bihar": [
      {
        title: "Bodh Gaya Spiritual Retreat",
        duration: "3N/4D",
        price: "₹15,000",
        emi: "EMI from ₹560/month",
        badge: "Spiritual",
        locations: "Bodh Gaya • Mahabodhi Temple",
        dates: "48 Dates Available",
        image: "https://www.bihartrip.com/pub/media/catalog/product/cache/cab15b78dac35e1077797ee439f6374a/b/o/bodhgaya_tour_packages_2__1.jpg",
        code: "BH00001",
        days: 4,
        priceValue: 15000,
        locationTags: ["Bodh Gaya", "Mahabodhi Temple"],
        isIndian: true
      },
      {
        title: "Patna Historical Tour",
        duration: "2N/3D",
        price: "₹12,000",
        emi: "EMI from ₹448/month",
        badge: "Historical",
        locations: "Patna • Nalanda • Rajgir",
        dates: "40 Dates Available",
        image: "https://media2.thrillophilia.com/images/photos/000/371/428/original/1618381990_9._Maner_Sharif_Patna_(1).JPG?w=753&h=450&dpr=1.5",
        code: "BH00002",
        days: 3,
        priceValue: 12000,
        locationTags: ["Patna", "Nalanda", "Rajgir"],
        isIndian: true
      },
      {
        title: "Complete Bihar Heritage Tour",
        duration: "5N/6D",
        price: "₹28,000",
        emi: "EMI from ₹1,045/month",
        badge: "Heritage",
        locations: "Vaishali • Pawapuri • Vikramshila",
        dates: "25 Dates Available",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqZY9tt4Qi40ErH0btRB85y9yfFrfwvgeB0g&s",
        code: "BH00003",
        days: 6,
        priceValue: 28000,
        locationTags: ["Vaishali", "Pawapuri", "Vikramshila"],
        isIndian: true
      },
      {
        title: "Bihar Buddhist Circuit",
        duration: "4N/5D",
        price: "₹22,000",
        emi: "EMI from ₹821/month",
        badge: "Buddhist Circuit",
        locations: "Bodh Gaya • Rajgir • Nalanda",
        dates: "35 Dates Available",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpl6fEpuUjpJ-t37f32biQNArgh9aJLoCfbg&s",
        code: "BH00004",
        days: 5,
        priceValue: 22000,
        locationTags: ["Bodh Gaya", "Rajgir", "Nalanda"],
        isIndian: true
      },
      {
        title: "Bihar Wildlife Safari",
        duration: "3N/4D",
        price: "₹18,000",
        emi: "EMI from ₹672/month",
        badge: "Wildlife",
        locations: "Valmiki Nagar • Tiger Reserve",
        dates: "30 Dates Available",
        image: "https://images.unsplash.com/photo-1550358864-518f202c02ba?w=800&q=80",
        code: "BH00005",
        days: 4,
        priceValue: 18000,
        locationTags: ["Valmiki Nagar", "Tiger Reserve"],
        isIndian: true
      },
      {
        title: "Bihar Cultural Experience",
        duration: "4N/5D",
        price: "₹25,000",
        emi: "EMI from ₹933/month",
        badge: "Cultural",
        locations: "Madhubani • Mithila • Darbhanga",
        dates: "28 Dates Available",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVMPZpFgHgFs8oxqtpPXuT5q5JbfMiE8MuWg&s",
        code: "BH00006",
        days: 5,
        priceValue: 25000,
        locationTags: ["Madhubani", "Mithila", "Darbhanga"],
        isIndian: true
      },
      {
        title: "Bihar Family Tour",
        duration: "3N/4D",
        price: "₹20,000",
        emi: "EMI from ₹746/month",
        badge: "Family Special",
        locations: "Patna • Bodh Gaya • Rajgir",
        dates: "42 Dates Available",
        image: "https://www.bihartrip.com/pub/media/catalog/product/cache/7fb32bed6aa46a6dea1535cb4f3a8b85/b/i/bihartrip-62.jpg",
        code: "BH00007",
        days: 4,
        priceValue: 20000,
        locationTags: ["Patna", "Bodh Gaya", "Rajgir"],
        isIndian: true
      },
      {
        title: "Bihar Luxury Spiritual Tour",
        duration: "4N/5D",
        price: "₹45,000",
        emi: "EMI from ₹1,679/month",
        badge: "Luxury",
        locations: "5-Star Stays • Private Guide",
        dates: "20 Dates Available",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
        code: "BH00008",
        days: 5,
        priceValue: 45000,
        locationTags: ["Luxury Stays", "Private Guide"],
        isIndian: true
      },
      {
        title: "Bihar Budget Tour",
        duration: "2N/3D",
        price: "₹8,000",
        emi: "EMI from ₹298/month",
        badge: "Budget Friendly",
        locations: "Patna • Bodh Gaya",
        dates: "50 Dates Available",
        image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
        code: "BH00009",
        days: 3,
        priceValue: 8000,
        locationTags: ["Patna", "Bodh Gaya"],
        isIndian: true
      }
    ],
    "Goa": [
      {
        title: "Goa Beach Paradise",
        duration: "4N/5D",
        price: "₹35,000",
        emi: "EMI from ₹1,306/month",
        badge: "Beach Holiday",
        locations: "North Goa • South Goa • Beach Hopping",
        dates: "55 Dates Available",
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80",
        code: "GOA0001",
        days: 5,
        priceValue: 35000,
        locationTags: ["North Goa", "South Goa", "Beach Hopping"],
        isIndian: true
      },
      {
        title: "Goa Nightlife Experience",
        duration: "3N/4D",
        price: "₹28,000",
        emi: "EMI from ₹1,045/month",
        badge: "Nightlife",
        locations: "Baga • Calangute • Anjuna",
        dates: "48 Dates Available",
        image: "https://assets.simplotel.com/simplotel/image/upload/x_0,y_605,w_4032,h_2271,r_0,c_crop,q_80,fl_progressive/w_500,f_auto,c_fit/richmonde-ananta-elite-goa/Dining_arrangement_on_a_Goan_beach_-_Richmonde_Ananta_Elite_Goa_nwciuf",
        code: "GOA0002",
        days: 4,
        priceValue: 28000,
        locationTags: ["Baga", "Calangute", "Anjuna"],
        isIndian: true
      },
      {
        title: "Goa Heritage Tour",
        duration: "4N/5D",
        price: "₹32,000",
        emi: "EMI from ₹1,194/month",
        badge: "Heritage",
        locations: "Old Goa • Churches • Portuguese Architecture",
        dates: "35 Dates Available",
        image: "https://assets.serenity.co.uk/42000-42999/42563/720x360.jpg",
        code: "GOA0003",
        days: 5,
        priceValue: 32000,
        locationTags: ["Old Goa", "Churches", "Portuguese Architecture"],
        isIndian: true
      },
      {
        title: "Goa Luxury Resort Stay",
        duration: "5N/6D",
        price: "₹65,000",
        emi: "EMI from ₹2,425/month",
        badge: "Luxury",
        locations: "5-Star Resort • Private Beach • Spa",
        dates: "30 Dates Available",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
        code: "GOA0004",
        days: 6,
        priceValue: 65000,
        locationTags: ["Luxury Resort", "Private Beach", "Spa"],
        isIndian: true
      },
      {
        title: "Goa Family Package",
        duration: "4N/5D",
        price: "₹38,000",
        emi: "EMI from ₹1,418/month",
        badge: "Family Special",
        locations: "Family-friendly beaches • Water sports",
        dates: "45 Dates Available",
        image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
        code: "GOA0005",
        days: 5,
        priceValue: 38000,
        locationTags: ["Family Beaches", "Water Sports"],
        isIndian: true
      },
      {
        title: "Goa Adventure Sports",
        duration: "3N/4D",
        price: "₹25,000",
        emi: "EMI from ₹933/month",
        badge: "Adventure",
        locations: "Parasailing • Jet Ski • Scuba",
        dates: "40 Dates Available",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
        code: "GOA0006",
        days: 4,
        priceValue: 25000,
        locationTags: ["Parasailing", "Jet Ski", "Scuba"],
        isIndian: true
      },
      {
        title: "Goa Honeymoon Special",
        duration: "5N/6D",
        price: "₹48,000",
        emi: "EMI from ₹1,791/month",
        badge: "Honeymoon",
        locations: "Romantic beaches • Candlelight dinners",
        dates: "38 Dates Available",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
        code: "GOA0007",
        days: 6,
        priceValue: 48000,
        locationTags: ["Romantic Beaches", "Candlelight Dinners"],
        isIndian: true
      },
      {
        title: "Goa Cultural Tour",
        duration: "4N/5D",
        price: "₹30,000",
        emi: "EMI from ₹1,119/month",
        badge: "Cultural",
        locations: "Local markets • Temples • Spice plantations",
        dates: "32 Dates Available",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShLr7IVNaBUDNXO86OJuBgu5yrN1KTJAhvtg&s",
        code: "GOA0008",
        days: 5,
        priceValue: 30000,
        locationTags: ["Local Markets", "Temples", "Spice Plantations"],
        isIndian: true
      },
      {
        title: "Goa Budget Tour",
        duration: "3N/4D",
        price: "₹15,000",
        emi: "EMI from ₹560/month",
        badge: "Budget",
        locations: "Affordable stays • Local experiences",
        dates: "50 Dates Available",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3a1qpczYlNm-jbmGwuewdX7WNt9oKzA3ORA&s",
        code: "GOA0009",
        days: 4,
        priceValue: 15000,
        locationTags: ["Affordable Stays", "Local Experiences"],
        isIndian: true
      }
    ],
    "Kerala": [
      {
        title: "Kerala Backwaters Experience",
        duration: "5N/6D",
        price: "₹42,000",
        emi: "EMI from ₹1,567/month",
        badge: "Backwaters",
        locations: "Alleppey • Kumarakom • Houseboat",
        dates: "45 Dates Available",
        image: "https://static.toiimg.com/thumb/msid-91888972,width-748,height-499,resizemode=4,imgsize-243110/.jpg",
        code: "KER0001",
        days: 6,
        priceValue: 42000,
        locationTags: ["Alleppey", "Kumarakom", "Houseboat"],
        isIndian: true
      },
      {
        title: "Kerala Hill Station Tour",
        duration: "4N/5D",
        price: "₹35,000",
        emi: "EMI from ₹1,306/month",
        badge: "Hill Station",
        locations: "Munnar • Thekkady • Tea Gardens",
        dates: "40 Dates Available",
        image: "https://storage.googleapis.com/stateless-www-justwravel-com/2024/12/f828f759-idukki.jpg",
        code: "KER0002",
        days: 5,
        priceValue: 35000,
        locationTags: ["Munnar", "Thekkady", "Tea Gardens"],
        isIndian: true
      },
      {
        title: "Kerala Ayurveda Retreat",
        duration: "6N/7D",
        price: "₹55,000",
        emi: "EMI from ₹2,052/month",
        badge: "Ayurveda",
        locations: "Ayurvedic treatments • Yoga • Meditation",
        dates: "35 Dates Available",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
        code: "KER0003",
        days: 7,
        priceValue: 55000,
        locationTags: ["Ayurvedic Treatments", "Yoga", "Meditation"],
        isIndian: true
      },
      {
        title: "Kerala Beach Holiday",
        duration: "4N/5D",
        price: "₹38,000",
        emi: "EMI from ₹1,418/month",
        badge: "Beach",
        locations: "Kovalam • Varkala • Marari",
        dates: "42 Dates Available",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
        code: "KER0004",
        days: 5,
        priceValue: 38000,
        locationTags: ["Kovalam", "Varkala", "Marari"],
        isIndian: true
      },
      {
        title: "Kerala Wildlife Safari",
        duration: "3N/4D",
        price: "₹28,000",
        emi: "EMI from ₹1,045/month",
        badge: "Wildlife",
        locations: "Periyar • Wayanad • Elephant Reserve",
        dates: "38 Dates Available",
        image: "https://images.unsplash.com/photo-1550358864-518f202c02ba?w=800&q=80",
        code: "KER0005",
        days: 4,
        priceValue: 28000,
        locationTags: ["Periyar", "Wayanad", "Elephant Reserve"],
        isIndian: true
      },
      {
        title: "Kerala Cultural Tour",
        duration: "5N/6D",
        price: "₹45,000",
        emi: "EMI from ₹1,679/month",
        badge: "Cultural",
        locations: "Kochi • Thrissur • Traditional Arts",
        dates: "33 Dates Available",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80",
        code: "KER0006",
        days: 6,
        priceValue: 45000,
        locationTags: ["Kochi", "Thrissur", "Traditional Arts"],
        isIndian: true
      },
      {
        title: "Kerala Luxury Package",
        duration: "6N/7D",
        price: "₹75,000",
        emi: "EMI from ₹2,798/month",
        badge: "Luxury",
        locations: "5-Star Resorts • Private Tours",
        dates: "25 Dates Available",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
        code: "KER0007",
        days: 7,
        priceValue: 75000,
        locationTags: ["Luxury Resorts", "Private Tours"],
        isIndian: true
      },
      {
        title: "Kerala Family Tour",
        duration: "5N/6D",
        price: "₹40,000",
        emi: "EMI from ₹1,492/month",
        badge: "Family",
        locations: "Family-friendly activities • Beaches • Backwaters",
        dates: "48 Dates Available",
        image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
        code: "KER0008",
        days: 6,
        priceValue: 40000,
        locationTags: ["Family Activities", "Beaches", "Backwaters"],
        isIndian: true
      },
      {
        title: "Kerala Budget Tour",
        duration: "4N/5D",
        price: "₹22,000",
        emi: "EMI from ₹821/month",
        badge: "Budget",
        locations: "Affordable stays • Local experiences",
        dates: "52 Dates Available",
        image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
        code: "KER0009",
        days: 5,
        priceValue: 22000,
        locationTags: ["Affordable Stays", "Local Experiences"],
        isIndian: true
      }
    ],
  
  "Chhattisgarh": [
    {
      title: "Chhattisgarh Tribal Culture Tour",
      duration: "4N/5D",
      price: "₹25,000",
      emi: "EMI from ₹933/month",
      badge: "Cultural",
      locations: "Raipur • Bastar • Tribal Villages",
      dates: "35 Dates Available",
      image: "https://img.etimg.com/photo/msid-70569491,imgsize-115587/MATCHINGSTEPS%3ATheBison-HornMariatribeisrenownedfortheirspectacularceremonialdancing.jpg",
      code: "CG00001",
      days: 5,
      priceValue: 25000,
      locationTags: ["Raipur", "Bastar", "Tribal Villages"],
      isIndian: true
    },
    {
      title: "Chhattisgarh Waterfalls Tour",
      duration: "3N/4D",
      price: "₹18,000",
      emi: "EMI from ₹672/month",
      badge: "Nature",
      locations: "Chitrakote • Tirathgarh • Kanger Valley",
      dates: "40 Dates Available",
      image: "https://tripxl.com/blog/wp-content/uploads/2024/09/Chitrakote-Waterfall.jpg",
      code: "CG00002",
      days: 4,
      priceValue: 18000,
      locationTags: ["Chitrakote", "Tirathgarh", "Kanger Valley"],
      isIndian: true
    },
    {
      title: "Chhattisgarh Wildlife Safari",
      duration: "4N/5D",
      price: "₹28,000",
      emi: "EMI from ₹1,045/month",
      badge: "Wildlife",
      locations: "Barnawapara • Sitanadi • Achanakmar",
      dates: "32 Dates Available",
      image: "https://images.unsplash.com/photo-1550358864-518f202c02ba?w=800&q=80",
      code: "CG00003",
      days: 5,
      priceValue: 28000,
      locationTags: ["Barnawapara", "Sitanadi", "Achanakmar"],
      isIndian: true
    },
    {
      title: "Chhattisgarh Heritage Tour",
      duration: "3N/4D",
      price: "₹22,000",
      emi: "EMI from ₹821/month",
      badge: "Heritage",
      locations: "Sirpur • Rajim • Dantewada",
      dates: "38 Dates Available",
      image: "https://here4trip.com/public/2023-05-09-03-38-51_banner.jpg",
      code: "CG00004",
      days: 4,
      priceValue: 22000,
      locationTags: ["Sirpur", "Rajim", "Dantewada"],
      isIndian: true
    },
    {
      title: "Chhattisgarh Luxury Retreat",
      duration: "5N/6D",
      price: "₹45,000",
      emi: "EMI from ₹1,679/month",
      badge: "Luxury",
      locations: "5-Star Resorts • Private Tours",
      dates: "25 Dates Available",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      code: "CG00005",
      days: 6,
      priceValue: 45000,
      locationTags: ["Luxury Resorts", "Private Tours"],
      isIndian: true
    },
    {
      title: "Chhattisgarh Family Package",
      duration: "4N/5D",
      price: "₹30,000",
      emi: "EMI from ₹1,119/month",
      badge: "Family Special",
      locations: "Raipur • Bhilai • Family Activities",
      dates: "42 Dates Available",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
      code: "CG00006",
      days: 5,
      priceValue: 30000,
      locationTags: ["Raipur", "Bhilai", "Family Activities"],
      isIndian: true
    },
    {
      title: "Chhattisgarh Adventure Tour",
      duration: "4N/5D",
      price: "₹26,000",
      emi: "EMI from ₹970/month",
      badge: "Adventure",
      locations: "Trekking • Camping • Jungle Safari",
      dates: "36 Dates Available",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
      code: "CG00007",
      days: 5,
      priceValue: 26000,
      locationTags: ["Trekking", "Camping", "Jungle Safari"],
      isIndian: true
    },
    {
      title: "Chhattisgarh Budget Tour",
      duration: "3N/4D",
      price: "₹15,000",
      emi: "EMI from ₹560/month",
      badge: "Budget",
      locations: "Raipur • Local Experiences",
      dates: "48 Dates Available",
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
      code: "CG00008",
      days: 4,
      priceValue: 15000,
      locationTags: ["Raipur", "Local Experiences"],
      isIndian: true
    },
    {
      title: "Chhattisgarh Complete Explorer",
      duration: "6N/7D",
      price: "₹38,000",
      emi: "EMI from ₹1,418/month",
      badge: "Explorer",
      locations: "All Major Attractions • Culture • Nature",
      dates: "28 Dates Available",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
      code: "CG00009",
      days: 7,
      priceValue: 38000,
      locationTags: ["Major Attractions", "Culture", "Nature"],
      isIndian: true
    }
  ],

  "Dadra & Nagar Haveli": [
    {
      title: "Dadra Nagar Haveli Nature Escape",
      duration: "2N/3D",
      price: "₹12,000",
      emi: "EMI from ₹448/month",
      badge: "Nature",
      locations: "Silvassa • Tribal Culture • Wildlife",
      dates: "45 Dates Available",
      image: "https://wanderon-images.gumlet.io/blogs/new/2024/01/34c104dc-e1cb-4afc-99c2-cdaee5993d2e.jpg",
      code: "DNH0001",
      days: 3,
      priceValue: 12000,
      locationTags: ["Silvassa", "Tribal Culture", "Wildlife"],
      isIndian: true
    },
    {
      title: "Dadra Nagar Haveli Tribal Experience",
      duration: "3N/4D",
      price: "₹16,000",
      emi: "EMI from ₹597/month",
      badge: "Tribal",
      locations: "Warli Art • Tribal Villages • Culture",
      dates: "40 Dates Available",
      image: "https://xplro.com/wp-content/uploads/2024/07/Xplro-2024-08-01T000535.002.jpg.webp",
      code: "DNH0002",
      days: 4,
      priceValue: 16000,
      locationTags: ["Warli Art", "Tribal Villages", "Culture"],
      isIndian: true
    },
    {
      title: "Dadra Nagar Haveli Wildlife Tour",
      duration: "2N/3D",
      price: "₹14,000",
      emi: "EMI from ₹522/month",
      badge: "Wildlife",
      locations: "Lion Safari • Deer Park • Nature",
      dates: "38 Dates Available",
      image: "https://images.unsplash.com/photo-1550358864-518f202c02ba?w=800&q=80",
      code: "DNH0003",
      days: 3,
      priceValue: 14000,
      locationTags: ["Lion Safari", "Deer Park", "Nature"],
      isIndian: true
    },
    {
      title: "Dadra Nagar Haveli Luxury Stay",
      duration: "3N/4D",
      price: "₹25,000",
      emi: "EMI from ₹933/month",
      badge: "Luxury",
      locations: "Resort Stay • Spa • Private Tours",
      dates: "35 Dates Available",
      image: "https://images.trvl-media.com/lodging/9000000/8020000/8012100/8012015/8110a330_y.jpg",
      code: "DNH0004",
      days: 4,
      priceValue: 25000,
      locationTags: ["Resort Stay", "Spa", "Private Tours"],
      isIndian: true
    },
    {
      title: "Dadra Nagar Haveli Family Tour",
      duration: "2N/3D",
      price: "₹18,000",
      emi: "EMI from ₹672/month",
      badge: "Family",
      locations: "Family Activities • Parks • Culture",
      dates: "42 Dates Available",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
      code: "DNH0005",
      days: 3,
      priceValue: 18000,
      locationTags: ["Family Activities", "Parks", "Culture"],
      isIndian: true
    },
    {
      title: "Dadra Nagar Haveli Adventure",
      duration: "3N/4D",
      price: "₹20,000",
      emi: "EMI from ₹746/month",
      badge: "Adventure",
      locations: "Trekking • Water Sports • Nature",
      dates: "36 Dates Available",
      image: "https://pix10.agoda.net/hotelImages/567579/-1/98f7b2ed2f20cc8ff83c19ac392067de.jpg?ce=0&s=414x232",
      code: "DNH0006",
      days: 4,
      priceValue: 20000,
      locationTags: ["Trekking", "Water Sports", "Nature"],
      isIndian: true
    },
    {
      title: "Dadra Nagar Haveli Budget Tour",
      duration: "2N/3D",
      price: "₹10,000",
      emi: "EMI from ₹373/month",
      badge: "Budget",
      locations: "Silvassa • Local Markets • Culture",
      dates: "50 Dates Available",
      image: "https://xplro.com/wp-content/uploads/2024/01/Dadra-and-Nagar-Haveli-travel-guide.webp",
      code: "DNH0007",
      days: 3,
      priceValue: 10000,
      locationTags: ["Silvassa", "Local Markets", "Culture"],
      isIndian: true
    },
    {
      title: "Dadra Nagar Haveli Cultural Tour",
      duration: "3N/4D",
      price: "₹22,000",
      emi: "EMI from ₹821/month",
      badge: "Cultural",
      locations: "Museums • Temples • Heritage Sites",
      dates: "33 Dates Available",
      image: "https://indiatouristspots.weebly.com/uploads/7/9/4/2/79421790/swaminarayan-temple-dadra-and-nagar-haveli-1_orig.jpg",
      code: "DNH0008",
      days: 4,
      priceValue: 22000,
      locationTags: ["Museums", "Temples", "Heritage Sites"],
      isIndian: true
    },
    {
      title: "Dadra Nagar Haveli Complete Package",
      duration: "4N/5D",
      price: "₹28,000",
      emi: "EMI from ₹1,045/month",
      badge: "Complete",
      locations: "All Attractions • Culture • Nature",
      dates: "30 Dates Available",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSf7HiO6TKt_Cz0BTRU7eWv0vA8vce2IO3EQ&s",
      code: "DNH0009",
      days: 5,
      priceValue: 28000,
      locationTags: ["All Attractions", "Culture", "Nature"],
      isIndian: true
    }
  ],

  "Daman & Diu": [
    {
      title: "Daman Diu Beach Holiday",
      duration: "3N/4D",
      price: "₹15,000",
      emi: "EMI from ₹560/month",
      badge: "Beach",
      locations: "Daman • Diu • Portuguese Heritage",
      dates: "42 Dates Available",
      image: "https://s7ap1.scene7.com/is/image/incredibleindia/Heres-Why-A-Beach-Holiday-In-Daman-and-Diu-Is-Different-From-The-Rest2-hero?qlt=82&ts=1727368418380",
      code: "DD00001",
      days: 4,
      priceValue: 15000,
      locationTags: ["Daman", "Diu", "Portuguese Heritage"],
      isIndian: true
    },
    {
      title: "Daman Diu Heritage Tour",
      duration: "3N/4D",
      price: "₹18,000",
      emi: "EMI from ₹672/month",
      badge: "Heritage",
      locations: "Fort • Churches • Portuguese Architecture",
      dates: "38 Dates Available",
      image: "https://s7ap1.scene7.com/is/image/incredibleindia/diu-fort-diu-daman-&-diu-tri-hero?qlt=82&ts=1727163082035",
      code: "DD00002",
      days: 4,
      priceValue: 18000,
      locationTags: ["Fort", "Churches", "Portuguese Architecture"],
      isIndian: true
    },
    {
      title: "Daman Diu Luxury Beach Resort",
      duration: "4N/5D",
      price: "₹35,000",
      emi: "EMI from ₹1,306/month",
      badge: "Luxury",
      locations: "Beach Resort • Spa • Water Sports",
      dates: "35 Dates Available",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      code: "DD00003",
      days: 5,
      priceValue: 35000,
      locationTags: ["Beach Resort", "Spa", "Water Sports"],
      isIndian: true
    },
    {
      title: "Daman Diu Family Package",
      duration: "3N/4D",
      price: "₹22,000",
      emi: "EMI from ₹821/month",
      badge: "Family",
      locations: "Beaches • Parks • Family Activities",
      dates: "40 Dates Available",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
      code: "DD00004",
      days: 4,
      priceValue: 22000,
      locationTags: ["Beaches", "Parks", "Family Activities"],
      isIndian: true
    },
    {
      title: "Daman Diu Adventure Sports",
      duration: "3N/4D",
      price: "₹20,000",
      emi: "EMI from ₹746/month",
      badge: "Adventure",
      locations: "Water Sports • Parasailing • Jet Ski",
      dates: "36 Dates Available",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
      code: "DD00005",
      days: 4,
      priceValue: 20000,
      locationTags: ["Water Sports", "Parasailing", "Jet Ski"],
      isIndian: true
    },
    {
      title: "Daman Diu Cultural Experience",
      duration: "3N/4D",
      price: "₹16,000",
      emi: "EMI from ₹597/month",
      badge: "Cultural",
      locations: "Local Markets • Cuisine • Festivals",
      dates: "39 Dates Available",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0rYbrjKUUS8tdfoYGP47APtcqIj973pAESA&s",
      code: "DD00006",
      days: 4,
      priceValue: 16000,
      locationTags: ["Local Markets", "Cuisine", "Festivals"],
      isIndian: true
    },
    {
      title: "Daman Diu Budget Escape",
      duration: "2N/3D",
      price: "₹12,000",
      emi: "EMI from ₹448/month",
      badge: "Budget",
      locations: "Affordable Stays • Beaches • Heritage",
      dates: "45 Dates Available",
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
      code: "DD00007",
      days: 3,
      priceValue: 12000,
      locationTags: ["Affordable Stays", "Beaches", "Heritage"],
      isIndian: true
    },
    {
      title: "Daman Diu Honeymoon Special",
      duration: "4N/5D",
      price: "₹28,000",
      emi: "EMI from ₹1,045/month",
      badge: "Honeymoon",
      locations: "Romantic Beaches • Candlelight Dinners",
      dates: "34 Dates Available",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
      code: "DD00008",
      days: 5,
      priceValue: 28000,
      locationTags: ["Romantic Beaches", "Candlelight Dinners"],
      isIndian: true
    },
    {
      title: "Daman Diu Complete Tour",
      duration: "4N/5D",
      price: "₹25,000",
      emi: "EMI from ₹933/month",
      badge: "Complete",
      locations: "All Attractions • Beaches • Heritage",
      dates: "37 Dates Available",
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80",
      code: "DD00009",
      days: 5,
      priceValue: 25000,
      locationTags: ["All Attractions", "Beaches", "Heritage"],
      isIndian: true
    }
  ],

  "Delhi": [
    {
      title: "Delhi Heritage Tour",
      duration: "3N/4D",
      price: "₹20,000",
      emi: "EMI from ₹746/month",
      badge: "Heritage",
      locations: "Red Fort • Qutub Minar • India Gate",
      dates: "55 Dates Available",
      image: "https://pictures.trodly.com/image/activity/2148/size-885x420/mode-crop/5b87fac1c288b.jpg",
      code: "DEL0001",
      days: 4,
      priceValue: 20000,
      locationTags: ["Red Fort", "Qutub Minar", "India Gate"],
      isIndian: true
    },
    {
      title: "Delhi Shopping Experience",
      duration: "2N/3D",
      price: "₹15,000",
      emi: "EMI from ₹560/month",
      badge: "Shopping",
      locations: "Chandni Chowk • Dilli Haat • Malls",
      dates: "52 Dates Available",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUNo2dZWxYPRxkD_KgribkAw2HOljtcfgHZQ&s",
      code: "DEL0002",
      days: 3,
      priceValue: 15000,
      locationTags: ["Chandni Chowk", "Dilli Haat", "Malls"],
      isIndian: true
    },
    {
      title: "Delhi Food Tour",
      duration: "2N/3D",
      price: "₹18,000",
      emi: "EMI from ₹672/month",
      badge: "Food",
      locations: "Street Food • Restaurants • Local Cuisine",
      dates: "48 Dates Available",
      image: "https://content3.jdmagicbox.com/v2/comp/delhi/a6/011pxx11.xx11.231028102454.b7a6/catalogue/matchis-resto-bar-rohini-sector-10-delhi-restaurants-and-bars-0i7b4cjv9g.jpg",
      code: "DEL0003",
      days: 3,
      priceValue: 18000,
      locationTags: ["Street Food", "Restaurants", "Local Cuisine"],
      isIndian: true
    },
    {
      title: "Delhi Luxury Stay",
      duration: "4N/5D",
      price: "₹45,000",
      emi: "EMI from ₹1,679/month",
      badge: "Luxury",
      locations: "5-Star Hotels • Fine Dining • Spa",
      dates: "40 Dates Available",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      code: "DEL0004",
      days: 5,
      priceValue: 45000,
      locationTags: ["5-Star Hotels", "Fine Dining", "Spa"],
      isIndian: true
    },
    {
      title: "Delhi Family Tour",
      duration: "3N/4D",
      price: "₹25,000",
      emi: "EMI from ₹933/month",
      badge: "Family",
      locations: "Parks • Museums • Family Activities",
      dates: "50 Dates Available",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/60/91/e0/caption.jpg?w=1200&h=-1&s=1",
      code: "DEL0005",
      days: 4,
      priceValue: 25000,
      locationTags: ["Parks", "Museums", "Family Activities"],
      isIndian: true
    },
    {
      title: "Delhi Cultural Tour",
      duration: "3N/4D",
      price: "₹22,000",
      emi: "EMI from ₹821/month",
      badge: "Cultural",
      locations: "Museums • Galleries • Performing Arts",
      dates: "45 Dates Available",
      image: "https://www.theheritagelab.in/wp-content/uploads/2018/04/Gallery16_national_museum_india-2-scaled.jpg",
      code: "DEL0006",
      days: 4,
      priceValue: 22000,
      locationTags: ["Museums", "Galleries", "Performing Arts"],
      isIndian: true
    },
    {
      title: "Delhi Budget Tour",
      duration: "2N/3D",
      price: "₹12,000",
      emi: "EMI from ₹448/month",
      badge: "Budget",
      locations: "Affordable Stays • Local Experiences",
      dates: "60 Dates Available",
      image: "https://hohodelhi.com//delhitourism/images/BestPlaces_Delhi/PlanDelhitrip.jpg",
      code: "DEL0007",
      days: 3,
      priceValue: 12000,
      locationTags: ["Affordable Stays", "Local Experiences"],
      isIndian: true
    },
    {
      title: "Delhi Night Tour",
      duration: "2N/3D",
      price: "₹16,000",
      emi: "EMI from ₹597/month",
      badge: "Nightlife",
      locations: "Night Markets • Food Streets • Entertainment",
      dates: "42 Dates Available",
      image: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/09/7a/da/8e.jpg",
      code: "DEL0008",
      days: 3,
      priceValue: 16000,
      locationTags: ["Night Markets", "Food Streets", "Entertainment"],
      isIndian: true
    },
    {
      title: "Delhi Complete Experience",
      duration: "4N/5D",
      price: "₹35,000",
      emi: "EMI from ₹1,306/month",
      badge: "Complete",
      locations: "All Attractions • Food • Shopping",
      dates: "38 Dates Available",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
      code: "DEL0009",
      days: 5,
      priceValue: 35000,
      locationTags: ["All Attractions", "Food", "Shopping"],
      isIndian: true
    }
  ],

  "Gujarat": [
    {
      title: "Gujarat Cultural Tour",
      duration: "5N/6D",
      price: "₹35,000",
      emi: "EMI from ₹1,306/month",
      badge: "Cultural",
      locations: "Ahmedabad • Somnath • Dwarka",
      dates: "40 Dates Available",
      image: "https://www.holytreetravel.com/india/tour-packages/IMAGE/Gujarat-culture-and-heritage.jpg",
      code: "GUJ0001",
      days: 6,
      priceValue: 35000,
      locationTags: ["Ahmedabad", "Somnath", "Dwarka"],
      isIndian: true
    },
    {
      title: "Gujarat Wildlife Safari",
      duration: "4N/5D",
      price: "₹28,000",
      emi: "EMI from ₹1,045/month",
      badge: "Wildlife",
      locations: "Gir Forest • Asiatic Lions • Safari",
      dates: "35 Dates Available",
      image: "https://images.unsplash.com/photo-1550358864-518f202c02ba?w=800&q=80",
      code: "GUJ0002",
      days: 5,
      priceValue: 28000,
      locationTags: ["Gir Forest", "Asiatic Lions", "Safari"],
      isIndian: true
    },
    {
      title: "Gujarat Heritage Tour",
      duration: "6N/7D",
      price: "₹42,000",
      emi: "EMI from ₹1,567/month",
      badge: "Heritage",
      locations: "Patan • Modhera • Rani ki Vav",
      dates: "38 Dates Available",
      image: "https://www.india-trip.in/img/category/heritage-gujarat1.jpg",
      code: "GUJ0003",
      days: 7,
      priceValue: 42000,
      locationTags: ["Patan", "Modhera", "Rani ki Vav"],
      isIndian: true
    },
    {
      title: "Gujarat Luxury Experience",
      duration: "5N/6D",
      price: "₹55,000",
      emi: "EMI from ₹2,052/month",
      badge: "Luxury",
      locations: "5-Star Hotels • Private Tours • Spa",
      dates: "30 Dates Available",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      code: "GUJ0004",
      days: 6,
      priceValue: 55000,
      locationTags: ["5-Star Hotels", "Private Tours", "Spa"],
      isIndian: true
    },
    {
      title: "Gujarat Family Package",
      duration: "4N/5D",
      price: "₹32,000",
      emi: "EMI from ₹1,194/month",
      badge: "Family",
      locations: "Family Activities • Parks • Museums",
      dates: "45 Dates Available",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
      code: "GUJ0005",
      days: 5,
      priceValue: 32000,
      locationTags: ["Family Activities", "Parks", "Museums"],
      isIndian: true
    },
    {
      title: "Gujarat Beach Holiday",
      duration: "4N/5D",
      price: "₹30,000",
      emi: "EMI from ₹1,119/month",
      badge: "Beach",
      locations: "Mandvi • Diu • Beach Resorts",
      dates: "42 Dates Available",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2efHaNtMBck6vFI7S2O2cPeWzT0UrpbI9cA&s",
      code: "GUJ0006",
      days: 5,
      priceValue: 30000,
      locationTags: ["Mandvi", "Diu", "Beach Resorts"],
      isIndian: true
    },
    {
      title: "Gujarat Budget Tour",
      duration: "3N/4D",
      price: "₹18,000",
      emi: "EMI from ₹672/month",
      badge: "Budget",
      locations: "Ahmedabad • Local Experiences",
      dates: "50 Dates Available",
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
      code: "GUJ0007",
      days: 4,
      priceValue: 18000,
      locationTags: ["Ahmedabad", "Local Experiences"],
      isIndian: true
    },
    {
      title: "Gujarat Food Tour",
      duration: "4N/5D",
      price: "₹25,000",
      emi: "EMI from ₹933/month",
      badge: "Food",
      locations: "Local Cuisine • Street Food • Restaurants",
      dates: "36 Dates Available",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU_850-Zw7VWcMrgdkADNNZwygalqx9CsWhA&s",
      code: "GUJ0008",
      days: 5,
      priceValue: 25000,
      locationTags: ["Local Cuisine", "Street Food", "Restaurants"],
      isIndian: true
    },
    {
      title: "Gujarat Complete Explorer",
      duration: "7N/8D",
      price: "₹48,000",
      emi: "EMI from ₹1,791/month",
      badge: "Explorer",
      locations: "All Major Cities • Heritage • Culture",
      dates: "28 Dates Available",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
      code: "GUJ0009",
      days: 8,
      priceValue: 48000,
      locationTags: ["Major Cities", "Heritage", "Culture"],
      isIndian: true
    }
  ],

  "Haryana": [
    {
      title: "Haryana Heritage Tour",
      duration: "2N/3D",
      price: "₹10,000",
      emi: "EMI from ₹373/month",
      badge: "Heritage",
      locations: "Chandigarh • Kurukshetra • Panchkula",
      dates: "50 Dates Available",
      image: "https://5.imimg.com/data5/SELLER/Default/2025/9/541358443/XR/KA/DG/6025621/heritage-tour-packages-services-500x500.jpg",
      code: "HR00001",
      days: 3,
      priceValue: 10000,
      locationTags: ["Chandigarh", "Kurukshetra", "Panchkula"],
      isIndian: true
    },
    {
      title: "Haryana Cultural Experience",
      duration: "3N/4D",
      price: "₹15,000",
      emi: "EMI from ₹560/month",
      badge: "Cultural",
      locations: "Local Villages • Folk Arts • Traditions",
      dates: "45 Dates Available",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQITgMdDXYF-9j2KyEcfVpxAOlHSZ_m7sskGA&s",
      code: "HR00002",
      days: 4,
      priceValue: 15000,
      locationTags: ["Local Villages", "Folk Arts", "Traditions"],
      isIndian: true
    },
    {
      title: "Haryana Luxury Stay",
      duration: "3N/4D",
      price: "₹25,000",
      emi: "EMI from ₹933/month",
      badge: "Luxury",
      locations: "Resorts • Spa • Fine Dining",
      dates: "40 Dates Available",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/b4/91/da/outdoor-venue.jpg?w=1200&h=-1&s=1",
      code: "HR00003",
      days: 4,
      priceValue: 25000,
      locationTags: ["Resorts", "Spa", "Fine Dining"],
      isIndian: true
    },
    {
      title: "Haryana Family Package",
      duration: "2N/3D",
      price: "₹12,000",
      emi: "EMI from ₹448/month",
      badge: "Family",
      locations: "Parks • Museums • Family Activities",
      dates: "48 Dates Available",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
      code: "HR00004",
      days: 3,
      priceValue: 12000,
      locationTags: ["Parks", "Museums", "Family Activities"],
      isIndian: true
    },
    {
      title: "Haryana Adventure Tour",
      duration: "3N/4D",
      price: "₹18,000",
      emi: "EMI from ₹672/month",
      badge: "Adventure",
      locations: "Trekking • Camping • Outdoor Activities",
      dates: "42 Dates Available",
      image: "https://media1.thrillophilia.com/filestore/b8a3dfsm9087ixs1yv4an4mg29bo_vlad-hilitanu-WRncbwcYH3U-unsplash.jpg?w=400&dpr=2",
      code: "HR00005",
      days: 4,
      priceValue: 18000,
      locationTags: ["Trekking", "Camping", "Outdoor Activities"],
      isIndian: true
    },
    {
      title: "Haryana Budget Tour",
      duration: "2N/3D",
      price: "₹8,000",
      emi: "EMI from ₹298/month",
      badge: "Budget",
      locations: "Affordable Stays • Local Experiences",
      dates: "55 Dates Available",
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
      code: "HR00006",
      days: 3,
      priceValue: 8000,
      locationTags: ["Affordable Stays", "Local Experiences"],
      isIndian: true
    },
    {
      title: "Haryana Food Tour",
      duration: "2N/3D",
      price: "₹14,000",
      emi: "EMI from ₹522/month",
      badge: "Food",
      locations: "Local Cuisine • Street Food • Dhabas",
      dates: "46 Dates Available",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80",
      code: "HR00007",
      days: 3,
      priceValue: 14000,
      locationTags: ["Local Cuisine", "Street Food", "Dhabas"],
      isIndian: true
    },
    {
      title: "Haryana Shopping Tour",
      duration: "2N/3D",
      price: "₹16,000",
      emi: "EMI from ₹597/month",
      badge: "Shopping",
      locations: "Local Markets • Handicrafts • Textiles",
      dates: "44 Dates Available",
      image: "https://res.cloudinary.com/local-tourism/images/f_webp,q_auto/v1690964623/Page/Explore%20India/Handicrafts%20and%20Shopping/Handicrafts_and_Shopping_in_India_glu70d/Handicrafts_and_Shopping_in_India_glu70d.webp?_i=AA",
      code: "HR00008",
      days: 3,
      priceValue: 16000,
      locationTags: ["Local Markets", "Handicrafts", "Textiles"],
      isIndian: true
    },
    {
      title: "Haryana Complete Package",
      duration: "4N/5D",
      price: "₹22,000",
      emi: "EMI from ₹821/month",
      badge: "Complete",
      locations: "All Major Cities • Culture • Heritage",
      dates: "38 Dates Available",
      image: "https://www.indianvisit.com/wp-content/uploads/2023/11/banner-14.jpg",
      code: "HR00009",
      days: 5,
      priceValue: 22000,
      locationTags: ["Major Cities", "Culture", "Heritage"],
      isIndian: true
    }
  ],

  "Himachal Pradesh": [
    {
      title: "Himachal Hill Stations",
      duration: "6N/7D",
      price: "₹45,000",
      emi: "EMI from ₹1,679/month",
      badge: "Hill Station",
      locations: "Shimla • Manali • Dharamshala",
      dates: "48 Dates Available",
      image: "https://www.abhibus.com/blog/wp-content/uploads/2023/04/Best-Hill-Stations-in-Himachal-Pradesh.jpg",
      code: "HP00001",
      days: 7,
      priceValue: 45000,
      locationTags: ["Shimla", "Manali", "Dharamshala"],
      isIndian: true
    },
    {
      title: "Himachal Adventure Tour",
      duration: "5N/6D",
      price: "₹38,000",
      emi: "EMI from ₹1,418/month",
      badge: "Adventure",
      locations: "Trekking • Paragliding • River Rafting",
      dates: "42 Dates Available",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
      code: "HP00002",
      days: 6,
      priceValue: 38000,
      locationTags: ["Trekking", "Paragliding", "River Rafting"],
      isIndian: true
    },
    {
      title: "Himachal Luxury Retreat",
      duration: "5N/6D",
      price: "₹55,000",
      emi: "EMI from ₹2,052/month",
      badge: "Luxury",
      locations: "5-Star Resorts • Spa • Private Tours",
      dates: "35 Dates Available",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      code: "HP00003",
      days: 6,
      priceValue: 55000,
      locationTags: ["5-Star Resorts", "Spa", "Private Tours"],
      isIndian: true
    },
    {
      title: "Himachal Family Package",
      duration: "4N/5D",
      price: "₹32,000",
      emi: "EMI from ₹1,194/month",
      badge: "Family",
      locations: "Family Activities • Toy Train • Parks",
      dates: "46 Dates Available",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
      code: "HP00004",
      days: 5,
      priceValue: 32000,
      locationTags: ["Family Activities", "Toy Train", "Parks"],
      isIndian: true
    },
    {
      title: "Himachal Honeymoon Special",
      duration: "5N/6D",
      price: "₹42,000",
      emi: "EMI from ₹1,567/month",
      badge: "Honeymoon",
      locations: "Romantic Stays • Scenic Views • Private Tours",
      dates: "40 Dates Available",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
      code: "HP00005",
      days: 6,
      priceValue: 42000,
      locationTags: ["Romantic Stays", "Scenic Views", "Private Tours"],
      isIndian: true
    },
    {
      title: "Himachal Budget Tour",
      duration: "4N/5D",
      price: "₹25,000",
      emi: "EMI from ₹933/month",
      badge: "Budget",
      locations: "Affordable Stays • Local Experiences",
      dates: "52 Dates Available",
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
      code: "HP00006",
      days: 5,
      priceValue: 25000,
      locationTags: ["Affordable Stays", "Local Experiences"],
      isIndian: true
    },
    {
      title: "Himachal Cultural Tour",
      duration: "5N/6D",
      price: "₹35,000",
      emi: "EMI from ₹1,306/month",
      badge: "Cultural",
      locations: "Temples • Monasteries • Local Culture",
      dates: "44 Dates Available",
      image: "https://thenewzradar.com/wp-content/uploads/2025/01/photo-collage-2.png-2-2.png",
      code: "HP00007",
      days: 6,
      priceValue: 35000,
      locationTags: ["Temples", "Monasteries", "Local Culture"],
      isIndian: true
    },
    {
      title: "Himachal Winter Special",
      duration: "4N/5D",
      price: "₹40,000",
      emi: "EMI from ₹1,492/month",
      badge: "Winter",
      locations: "Snow • Skiing • Winter Sports",
      dates: "36 Dates Available",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
      code: "HP00008",
      days: 5,
      priceValue: 40000,
      locationTags: ["Snow", "Skiing", "Winter Sports"],
      isIndian: true
    },
    {
      title: "Himachal Complete Explorer",
      duration: "7N/8D",
      price: "₹58,000",
      emi: "EMI from ₹2,164/month",
      badge: "Explorer",
      locations: "All Hill Stations • Adventure • Culture",
      dates: "32 Dates Available",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
      code: "HP00009",
      days: 8,
      priceValue: 58000,
      locationTags: ["Hill Stations", "Adventure", "Culture"],
      isIndian: true
    }
  ],

  "Jammu & Kashmir": [
    {
      title: "Kashmir Paradise Tour",
      duration: "7N/8D",
      price: "₹55,000",
      emi: "EMI from ₹2,052/month",
      badge: "Paradise",
      locations: "Srinagar • Gulmarg • Pahalgam",
      dates: "35 Dates Available",
      image: "https://cdn.tripspoint.com/uploads/photos/2125/kashmir-the-paradise-on-earth-tour_xIQNJ.jpeg",
      code: "JK00001",
      days: 8,
      priceValue: 55000,
      locationTags: ["Srinagar", "Gulmarg", "Pahalgam"],
      isIndian: true
    },
    {
      title: "Jammu Pilgrimage Tour",
      duration: "5N/6D",
      price: "₹35,000",
      emi: "EMI from ₹1,306/month",
      badge: "Pilgrimage",
      locations: "Vaishno Devi • Raghunath Temple • Shiv Khori",
      dates: "42 Dates Available",
      image: "https://static.toiimg.com/photo/72401661.cms",
      code: "JK00002",
      days: 6,
      priceValue: 35000,
      locationTags: ["Vaishno Devi", "Raghunath Temple", "Shiv Khori"],
      isIndian: true
    },
    {
      title: "Kashmir Luxury Houseboat",
      duration: "6N/7D",
      price: "₹65,000",
      emi: "EMI from ₹2,425/month",
      badge: "Luxury",
      locations: "Houseboat Stay • Shikara Rides • Fine Dining",
      dates: "38 Dates Available",
      image: "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/201510301312352029-ec4a52c0121511e7b81d02755708f0b3.jpg",
      code: "JK00003",
      days: 7,
      priceValue: 65000,
      locationTags: ["Houseboat Stay", "Shikara Rides", "Fine Dining"],
      isIndian: true
    },
    {
      title: "Kashmir Adventure Tour",
      duration: "6N/7D",
      price: "₹48,000",
      emi: "EMI from ₹1,791/month",
      badge: "Adventure",
      locations: "Skiing • Trekking • Gondola Ride",
      dates: "40 Dates Available",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
      code: "JK00004",
      days: 7,
      priceValue: 48000,
      locationTags: ["Skiing", "Trekking", "Gondola Ride"],
      isIndian: true
    },
    {
      title: "Kashmir Family Package",
      duration: "5N/6D",
      price: "₹42,000",
      emi: "EMI from ₹1,567/month",
      badge: "Family",
      locations: "Family Activities • Gardens • Shikara",
      dates: "45 Dates Available",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
      code: "JK00005",
      days: 6,
      priceValue: 42000,
      locationTags: ["Family Activities", "Gardens", "Shikara"],
      isIndian: true
    },
    {
      title: "Kashmir Honeymoon Special",
      duration: "6N/7D",
      price: "₹52,000",
      emi: "EMI from ₹1,940/month",
      badge: "Honeymoon",
      locations: "Romantic Stays • Private Shikara • Candlelight Dinner",
      dates: "36 Dates Available",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
      code: "JK00006",
      days: 7,
      priceValue: 52000,
      locationTags: ["Romantic Stays", "Private Shikara", "Candlelight Dinner"],
      isIndian: true
    },
    {
      title: "Kashmir Budget Tour",
      duration: "4N/5D",
      price: "₹28,000",
      emi: "EMI from ₹1,045/month",
      badge: "Budget",
      locations: "Affordable Stays • Local Experiences",
      dates: "48 Dates Available",
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
      code: "JK00007",
      days: 5,
      priceValue: 28000,
      locationTags: ["Affordable Stays", "Local Experiences"],
      isIndian: true
    },
    {
      title: "Ladakh Adventure from Kashmir",
      duration: "8N/9D",
      price: "₹68,000",
      emi: "EMI from ₹2,537/month",
      badge: "Adventure",
      locations: "Leh • Nubra Valley • Pangong Lake",
      dates: "32 Dates Available",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
      code: "JK00008",
      days: 9,
      priceValue: 68000,
      locationTags: ["Leh", "Nubra Valley", "Pangong Lake"],
      isIndian: true
    },
    {
      title: "Kashmir Complete Experience",
      duration: "7N/8D",
      price: "₹58,000",
      emi: "EMI from ₹2,164/month",
      badge: "Complete",
      locations: "All Valleys • Lakes • Mountains",
      dates: "34 Dates Available",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
      code: "JK00009",
      days: 8,
      priceValue: 58000,
      locationTags: ["Valleys", "Lakes", "Mountains"],
      isIndian: true
    }
  ],

  "Jharkhand": [
    {
      title: "Jharkhand Tribal Tour",
      duration: "4N/5D",
      price: "₹22,000",
      emi: "EMI from ₹821/month",
      badge: "Tribal",
      locations: "Ranchi • Jamshedpur • Tribal Culture",
      dates: "38 Dates Available",
      image: "https://thejharkhandstory.co.in/wp-content/uploads/2023/12/Tribes.jpg",
      code: "JH00001",
      days: 5,
      priceValue: 22000,
      locationTags: ["Ranchi", "Jamshedpur", "Tribal Culture"],
      isIndian: true
    },
    {
      title: "Jharkhand Waterfalls Tour",
      duration: "3N/4D",
      price: "₹18,000",
      emi: "EMI from ₹672/month",
      badge: "Nature",
      locations: "Hundru Falls • Jonha Falls • Dassam Falls",
      dates: "42 Dates Available",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYEyRfMkTl9DLDVYbLd88TCV0GtdB2H5ndcQ&s",
      code: "JH00002",
      days: 4,
      priceValue: 18000,
      locationTags: ["Hundru Falls", "Jonha Falls", "Dassam Falls"],
      isIndian: true
    },
    {
      title: "Jharkhand Wildlife Safari",
      duration: "4N/5D",
      price: "₹25,000",
      emi: "EMI from ₹933/month",
      badge: "Wildlife",
      locations: "Betla National Park • Palamau • Tiger Reserve",
      dates: "36 Dates Available",
      image: "https://images.unsplash.com/photo-1550358864-518f202c02ba?w=800&q=80",
      code: "JH00003",
      days: 5,
      priceValue: 25000,
      locationTags: ["Betla National Park", "Palamau", "Tiger Reserve"],
      isIndian: true
    },
    {
      title: "Jharkhand Luxury Stay",
      duration: "4N/5D",
      price: "₹35,000",
      emi: "EMI from ₹1,306/month",
      badge: "Luxury",
      locations: "Resorts • Spa • Private Tours",
      dates: "34 Dates Available",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      code: "JH00004",
      days: 5,
      priceValue: 35000,
      locationTags: ["Resorts", "Spa", "Private Tours"],
      isIndian: true
    },
    {
      title: "Jharkhand Family Package",
      duration: "3N/4D",
      price: "₹20,000",
      emi: "EMI from ₹746/month",
      badge: "Family",
      locations: "Parks • Museums • Family Activities",
      dates: "44 Dates Available",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
      code: "JH00005",
      days: 4,
      priceValue: 20000,
      locationTags: ["Parks", "Museums", "Family Activities"],
      isIndian: true
    },
    {
      title: "Jharkhand Adventure Tour",
      duration: "4N/5D",
      price: "₹28,000",
      emi: "EMI from ₹1,045/month",
      badge: "Adventure",
      locations: "Trekking • Rock Climbing • Nature Walks",
      dates: "40 Dates Available",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
      code: "JH00006",
      days: 5,
      priceValue: 28000,
      locationTags: ["Trekking", "Rock Climbing", "Nature Walks"],
      isIndian: true
    },
    {
      title: "Jharkhand Budget Tour",
      duration: "3N/4D",
      price: "₹15,000",
      emi: "EMI from ₹560/month",
      badge: "Budget",
      locations: "Affordable Stays • Local Experiences",
      dates: "48 Dates Available",
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
      code: "JH00007",
      days: 4,
      priceValue: 15000,
      locationTags: ["Affordable Stays", "Local Experiences"],
      isIndian: true
    },
    {
      title: "Jharkhand Cultural Tour",
      duration: "4N/5D",
      price: "₹24,000",
      emi: "EMI from ₹895/month",
      badge: "Cultural",
      locations: "Tribal Museums • Folk Arts • Local Festivals",
      dates: "38 Dates Available",
      image: "https://assets.shipratravel.com/cms/Cultural%20Tour%20of%20Jharkhand.webp?q=75",
      code: "JH00008",
      days: 5,
      priceValue: 24000,
      locationTags: ["Tribal Museums", "Folk Arts", "Local Festivals"],
      isIndian: true
    },
    {
      title: "Jharkhand Complete Explorer",
      duration: "5N/6D",
      price: "₹32,000",
      emi: "EMI from ₹1,194/month",
      badge: "Explorer",
      locations: "All Attractions • Nature • Culture",
      dates: "35 Dates Available",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
      code: "JH00009",
      days: 6,
      priceValue: 32000,
      locationTags: ["All Attractions", "Nature", "Culture"],
      isIndian: true
    }
  ],


  "Karnataka": [
    {
      title: "Karnataka Heritage Tour",
      duration: "6N/7D",
      price: "₹42,000",
      emi: "EMI from ₹1,567/month",
      badge: "Heritage",
      locations: "Bangalore • Mysore • Hampi",
      dates: "45 Dates Available",
      image: "https://www.holytreetravel.com/IMAGE/karnataka%20heritage.jpg",
      code: "KA00001",
      days: 7,
      priceValue: 42000,
      locationTags: ["Bangalore", "Mysore", "Hampi"],
      isIndian: true
    },
    {
      title: "Karnataka Beach Holiday",
      duration: "5N/6D",
      price: "₹35,000",
      emi: "EMI from ₹1,306/month",
      badge: "Beach",
      locations: "Gokarna • Udupi • Karwar",
      dates: "42 Dates Available",
      image: "https://static.toiimg.com/thumb/msid-115274411,width-748,height-499,resizemode=4,imgsize-75756/.jpg",
      code: "KA00002",
      days: 6,
      priceValue: 35000,
      locationTags: ["Gokarna", "Udupi", "Karwar"],
      isIndian: true
    },
    {
      title: "Karnataka Wildlife Safari",
      duration: "4N/5D",
      price: "₹28,000",
      emi: "EMI from ₹1,045/month",
      badge: "Wildlife",
      locations: "Bandipur • Nagarhole • Dandeli",
      dates: "38 Dates Available",
      image: "https://images.unsplash.com/photo-1550358864-518f202c02ba?w=800&q=80",
      code: "KA00003",
      days: 5,
      priceValue: 28000,
      locationTags: ["Bandipur", "Nagarhole", "Dandeli"],
      isIndian: true
    },
    {
      title: "Karnataka Luxury Experience",
      duration: "5N/6D",
      price: "₹55,000",
      emi: "EMI from ₹2,052/month",
      badge: "Luxury",
      locations: "5-Star Resorts • Private Tours • Spa",
      dates: "35 Dates Available",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      code: "KA00004",
      days: 6,
      priceValue: 55000,
      locationTags: ["5-Star Resorts", "Private Tours", "Spa"],
      isIndian: true
    },
    {
      title: "Karnataka Family Package",
      duration: "4N/5D",
      price: "₹32,000",
      emi: "EMI from ₹1,194/month",
      badge: "Family",
      locations: "Family Activities • Parks • Museums",
      dates: "46 Dates Available",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
      code: "KA00005",
      days: 5,
      priceValue: 32000,
      locationTags: ["Family Activities", "Parks", "Museums"],
      isIndian: true
    },
    {
      title: "Karnataka Hill Stations",
      duration: "5N/6D",
      price: "₹38,000",
      emi: "EMI from ₹1,418/month",
      badge: "Hill Station",
      locations: "Coorg • Chikmagalur • Kemmangundi",
      dates: "40 Dates Available",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSozP11gzLQwTcyYawglKvzsSNEAL-cghGUQA&s",
      code: "KA00006",
      days: 6,
      priceValue: 38000,
      locationTags: ["Coorg", "Chikmagalur", "Kemmangundi"],
      isIndian: true
    },
    {
      title: "Karnataka Budget Tour",
      duration: "4N/5D",
      price: "₹22,000",
      emi: "EMI from ₹821/month",
      badge: "Budget",
      locations: "Affordable Stays • Local Experiences",
      dates: "50 Dates Available",
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
      code: "KA00007",
      days: 5,
      priceValue: 22000,
      locationTags: ["Affordable Stays", "Local Experiences"],
      isIndian: true
    },
    {
      title: "Karnataka Temple Tour",
      duration: "5N/6D",
      price: "₹30,000",
      emi: "EMI from ₹1,119/month",
      badge: "Temple",
      locations: "Belur • Halebidu • Shravanabelagola",
      dates: "44 Dates Available",
      image: "https://www.mangalatravels.com/wp-content/uploads/2019/03/murudeshwar.jpg",
      code: "KA00008",
      days: 6,
      priceValue: 30000,
      locationTags: ["Belur", "Halebidu", "Shravanabelagola"],
      isIndian: true
    },
    {
      title: "Karnataka Complete Explorer",
      duration: "7N/8D",
      price: "₹48,000",
      emi: "EMI from ₹1,791/month",
      badge: "Explorer",
      locations: "All Regions • Heritage • Nature",
      dates: "36 Dates Available",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
      code: "KA00009",
      days: 8,
      priceValue: 48000,
      locationTags: ["All Regions", "Heritage", "Nature"],
      isIndian: true
    }
  ],

  "Ladakh": [
    {
      title: "Ladakh Adventure Tour",
      duration: "8N/9D",
      price: "₹65,000",
      emi: "EMI from ₹2,425/month",
      badge: "Adventure",
      locations: "Leh • Nubra Valley • Pangong Lake",
      dates: "30 Dates Available",
      image: "https://www.tourmyindia.com/states/ladakh/imagess/peak-climbing-adventure.jpg",
      code: "LAD0001",
      days: 9,
      priceValue: 65000,
      locationTags: ["Leh", "Nubra Valley", "Pangong Lake"],
      isIndian: true
    },
    {
      title: "Ladakh Bike Expedition",
      duration: "10N/11D",
      price: "₹75,000",
      emi: "EMI from ₹2,798/month",
      badge: "Adventure",
      locations: "Manali-Leh Highway • Mountain Passes",
      dates: "25 Dates Available",
      image: "https://discoverlehladakh.in/wp-content/uploads/2021/02/Ladakh-bike-tour-package-banner.jpg",
      code: "LAD0002",
      days: 11,
      priceValue: 75000,
      locationTags: ["Manali-Leh Highway", "Mountain Passes"],
      isIndian: true
    },
    {
      title: "Ladakh Luxury Tour",
      duration: "7N/8D",
      price: "₹85,000",
      emi: "EMI from ₹3,172/month",
      badge: "Luxury",
      locations: "Premium Camps • Private Tours • Fine Dining",
      dates: "28 Dates Available",
      image: "https://discoverlehladakh.in/wp-content/uploads/2023/04/Leh-Ladakh-Luxury-Tour-Package.jpg",
      code: "LAD0003",
      days: 8,
      priceValue: 85000,
      locationTags: ["Premium Camps", "Private Tours", "Fine Dining"],
      isIndian: true
    },
    {
      title: "Ladakh Family Package",
      duration: "6N/7D",
      price: "₹52,000",
      emi: "EMI from ₹1,940/month",
      badge: "Family",
      locations: "Family-friendly Activities • Monasteries",
      dates: "35 Dates Available",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXb_zFxC-hbBfdU99deA8vCtd-PoveaWMZHw&s",
      code: "LAD0004",
      days: 7,
      priceValue: 52000,
      locationTags: ["Family Activities", "Monasteries"],
      isIndian: true
    },
    {
      title: "Ladakh Buddhist Circuit",
      duration: "7N/8D",
      price: "₹58,000",
      emi: "EMI from ₹2,164/month",
      badge: "Spiritual",
      locations: "Monasteries • Meditation • Culture",
      dates: "32 Dates Available",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3elu89o_BPGWGKGVTifRrSrL97YVQVXRBBg&s",
      code: "LAD0005",
      days: 8,
      priceValue: 58000,
      locationTags: ["Monasteries", "Meditation", "Culture"],
      isIndian: true
    },
    {
      title: "Ladakh Winter Special",
      duration: "5N/6D",
      price: "₹45,000",
      emi: "EMI from ₹1,679/month",
      badge: "Winter",
      locations: "Snow • Frozen Lakes • Winter Sports",
      dates: "20 Dates Available",
      image: "https://discoverlehladakh.in/wp-content/uploads/2020/03/Leh-Palace-Ladakh-in-winters.jpg",
      code: "LAD0006",
      days: 6,
      priceValue: 45000,
      locationTags: ["Snow", "Frozen Lakes", "Winter Sports"],
      isIndian: true
    },
    {
      title: "Ladakh Budget Tour",
      duration: "5N/6D",
      price: "₹38,000",
      emi: "EMI from ₹1,418/month",
      badge: "Budget",
      locations: "Affordable Stays • Local Experiences",
      dates: "40 Dates Available",
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
      code: "LAD0007",
      days: 6,
      priceValue: 38000,
      locationTags: ["Affordable Stays", "Local Experiences"],
      isIndian: true
    },
    {
      title: "Ladakh Photography Tour",
      duration: "8N/9D",
      price: "₹68,000",
      emi: "EMI from ₹2,537/month",
      badge: "Photography",
      locations: "Landscapes • Wildlife • Culture",
      dates: "26 Dates Available",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
      code: "LAD0008",
      days: 9,
      priceValue: 68000,
      locationTags: ["Landscapes", "Wildlife", "Culture"],
      isIndian: true
    },
    {
      title: "Ladakh Complete Experience",
      duration: "9N/10D",
      price: "₹72,000",
      emi: "EMI from ₹2,687/month",
      badge: "Complete",
      locations: "All Valleys • Lakes • Monasteries",
      dates: "28 Dates Available",
      image: "https://www.world-tourism.org/wp-content/uploads/2025/11/leh-ladakh-best-of-tibet-experience.jpg",
      code: "LAD0009",
      days: 10,
      priceValue: 72000,
      locationTags: ["Valleys", "Lakes", "Monasteries"],
      isIndian: true
    }
  ],

  "Lakshadweep": [
    {
      title: "Lakshadweep Island Escape",
      duration: "5N/6D",
      price: "₹48,000",
      emi: "EMI from ₹1,791/month",
      badge: "Island",
      locations: "Kavaratti • Agatti • Bangaram",
      dates: "25 Dates Available",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
      code: "LD00001",
      days: 6,
      priceValue: 48000,
      locationTags: ["Kavaratti", "Agatti", "Bangaram"],
      isIndian: true
    },
    {
      title: "Lakshadweep Luxury Resort",
      duration: "6N/7D",
      price: "₹65,000",
      emi: "EMI from ₹2,425/month",
      badge: "Luxury",
      locations: "Beach Resort • Private Beach • Spa",
      dates: "22 Dates Available",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      code: "LD00002",
      days: 7,
      priceValue: 65000,
      locationTags: ["Beach Resort", "Private Beach", "Spa"],
      isIndian: true
    },
    {
      title: "Lakshadweep Water Sports",
      duration: "4N/5D",
      price: "₹35,000",
      emi: "EMI from ₹1,306/month",
      badge: "Adventure",
      locations: "Scuba Diving • Snorkeling • Kayaking",
      dates: "30 Dates Available",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
      code: "LD00003",
      days: 5,
      priceValue: 35000,
      locationTags: ["Scuba Diving", "Snorkeling", "Kayaking"],
      isIndian: true
    },
    {
      title: "Lakshadweep Honeymoon Special",
      duration: "5N/6D",
      price: "₹55,000",
      emi: "EMI from ₹2,052/month",
      badge: "Honeymoon",
      locations: "Private Villas • Romantic Dinners • Beach",
      dates: "28 Dates Available",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
      code: "LD00004",
      days: 6,
      priceValue: 55000,
      locationTags: ["Private Villas", "Romantic Dinners", "Beach"],
      isIndian: true
    },
    {
      title: "Lakshadweep Family Package",
      duration: "4N/5D",
      price: "₹42,000",
      emi: "EMI from ₹1,567/month",
      badge: "Family",
      locations: "Family Activities • Beach Games • Marine Life",
      dates: "35 Dates Available",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
      code: "LD00005",
      days: 5,
      priceValue: 42000,
      locationTags: ["Family Activities", "Beach Games", "Marine Life"],
      isIndian: true
    },
    {
      title: "Lakshadweep Coral Reef Tour",
      duration: "5N/6D",
      price: "₹38,000",
      emi: "EMI from ₹1,418/month",
      badge: "Marine",
      locations: "Coral Reefs • Marine Life • Underwater World",
      dates: "32 Dates Available",
      image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80",
      code: "LD00006",
      days: 6,
      priceValue: 38000,
      locationTags: ["Coral Reefs", "Marine Life", "Underwater World"],
      isIndian: true
    },
    {
      title: "Lakshadweep Budget Tour",
      duration: "3N/4D",
      price: "₹28,000",
      emi: "EMI from ₹1,045/month",
      badge: "Budget",
      locations: "Affordable Stays • Local Experiences",
      dates: "40 Dates Available",
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
      code: "LD00007",
      days: 4,
      priceValue: 28000,
      locationTags: ["Affordable Stays", "Local Experiences"],
      isIndian: true
    },
    {
      title: "Lakshadweep Cultural Tour",
      duration: "4N/5D",
      price: "₹32,000",
      emi: "EMI from ₹1,194/month",
      badge: "Cultural",
      locations: "Local Culture • Traditions • Island Life",
      dates: "36 Dates Available",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80",
      code: "LD00008",
      days: 5,
      priceValue: 32000,
      locationTags: ["Local Culture", "Traditions", "Island Life"],
      isIndian: true
    },
    {
      title: "Lakshadweep Complete Explorer",
      duration: "6N/7D",
      price: "₹52,000",
      emi: "EMI from ₹1,940/month",
      badge: "Explorer",
      locations: "Multiple Islands • Marine Life • Culture",
      dates: "26 Dates Available",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
      code: "LD00009",
      days: 7,
      priceValue: 52000,
      locationTags: ["Multiple Islands", "Marine Life", "Culture"],
      isIndian: true
    }
  ],

  "Madhya Pradesh": [
    {
      title: "Madhya Pradesh Wildlife Tour",
      duration: "5N/6D",
      price: "₹38,000",
      emi: "EMI from ₹1,418/month",
      badge: "Wildlife",
      locations: "Kanha • Bandhavgarh • Khajuraho",
      dates: "40 Dates Available",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuPrRkkvhGcbQs5OlJFufp1y00m2ZPLx1Heg&s",
      code: "MP00001",
      days: 6,
      priceValue: 38000,
      locationTags: ["Kanha", "Bandhavgarh", "Khajuraho"],
      isIndian: true
    },
    {
      title: "MP Heritage Tour",
      duration: "6N/7D",
      price: "₹42,000",
      emi: "EMI from ₹1,567/month",
      badge: "Heritage",
      locations: "Sanchi • Bhimbetka • Orchha",
      dates: "38 Dates Available",
      image: "https://www.trawell.in/admin/images/upload/16922032Gwalior_Main.jpg",
      code: "MP00002",
      days: 7,
      priceValue: 42000,
      locationTags: ["Sanchi", "Bhimbetka", "Orchha"],
      isIndian: true
    },
    {
      title: "MP Luxury Safari",
      duration: "5N/6D",
      price: "₹55,000",
      emi: "EMI from ₹2,052/month",
      badge: "Luxury",
      locations: "Premium Resorts • Private Safari • Spa",
      dates: "35 Dates Available",
      image: "https://www.alkofholidays.com/storage/image-gallery/kanha-national-park-safari-photo-clicked-by-uk-travelers.jpg",
      code: "MP00003",
      days: 6,
      priceValue: 55000,
      locationTags: ["Premium Resorts", "Private Safari", "Spa"],
      isIndian: true
    },
    {
      title: "MP Family Package",
      duration: "4N/5D",
      price: "₹32,000",
      emi: "EMI from ₹1,194/month",
      badge: "Family",
      locations: "Family Activities • Parks • Museums",
      dates: "45 Dates Available",
      image: "https://mptourpackages.com/wp-content/uploads/2025/01/10-Days-Madhya-Pradesh-tour-Packages-for-Family.jpg",
      code: "MP00004",
      days: 5,
      priceValue: 32000,
      locationTags: ["Family Activities", "Parks", "Museums"],
      isIndian: true
    },
    {
      title: "MP Temple Tour",
      duration: "5N/6D",
      price: "₹35,000",
      emi: "EMI from ₹1,306/month",
      badge: "Temple",
      locations: "Khajuraho • Ujjain • Omkareshwar",
      dates: "42 Dates Available",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNT5CnFQkQhC0Vrg4CPFZEY7Ffrl2bQMI5LQ&s",
      code: "MP00005",
      days: 6,
      priceValue: 35000,
      locationTags: ["Khajuraho", "Ujjain", "Omkareshwar"],
      isIndian: true
    },
    {
      title: "MP Adventure Tour",
      duration: "4N/5D",
      price: "₹28,000",
      emi: "EMI from ₹1,045/month",
      badge: "Adventure",
      locations: "Trekking • River Rafting • Wildlife",
      dates: "40 Dates Available",
      image: "https://www.tourmyindia.com/images/mp-trekking.jpg",
      code: "MP00006",
      days: 5,
      priceValue: 28000,
      locationTags: ["Trekking", "River Rafting", "Wildlife"],
      isIndian: true
    },
    {
      title: "MP Budget Tour",
      duration: "3N/4D",
      price: "₹20,000",
      emi: "EMI from ₹746/month",
      badge: "Budget",
      locations: "Affordable Stays • Local Experiences",
      dates: "50 Dates Available",
      image: "https://mpholidays.com/wp-content/uploads/2024/11/madhya-pradesh-tour-packages.jpg",
      code: "MP00007",
      days: 4,
      priceValue: 20000,
      locationTags: ["Affordable Stays", "Local Experiences"],
      isIndian: true
    },
    {
      title: "MP Cultural Tour",
      duration: "5N/6D",
      price: "₹38,000",
      emi: "EMI from ₹1,418/month",
      badge: "Cultural",
      locations: "Folk Arts • Tribal Culture • Traditions",
      dates: "38 Dates Available",
      image: "https://www.holidaymonk.com/wp-content/uploads/2022/11/Khajuraho-Dance-Festival-Madhya-Pradesh.webp",
      code: "MP00008",
      days: 6,
      priceValue: 38000,
      locationTags: ["Folk Arts", "Tribal Culture", "Traditions"],
      isIndian: true
    },
    {
      title: "MP Complete Explorer",
      duration: "7N/8D",
      price: "₹48,000",
      emi: "EMI from ₹1,791/month",
      badge: "Explorer",
      locations: "All Regions • Wildlife • Heritage",
      dates: "36 Dates Available",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
      code: "MP00009",
      days: 8,
      priceValue: 48000,
      locationTags: ["All Regions", "Wildlife", "Heritage"],
      isIndian: true
    }
  ],

  "Maharashtra": [
    {
      title: "Maharashtra Diversity Tour",
      duration: "6N/7D",
      price: "₹45,000",
      emi: "EMI from ₹1,679/month",
      badge: "Diversity",
      locations: "Mumbai • Pune • Ajanta Ellora",
      dates: "50 Dates Available",
      image: "https://yatrirailways.com/bl-content/uploads/pages/c999bc80b304248f5ae515728b68b719/ajantaellora.jpg",
      code: "MH00001",
      days: 7,
      priceValue: 45000,
      locationTags: ["Mumbai", "Pune", "Ajanta Ellora"],
      isIndian: true
    },
    {
      title: "Maharashtra Beach Holiday",
      duration: "4N/5D",
      price: "₹32,000",
      emi: "EMI from ₹1,194/month",
      badge: "Beach",
      locations: "Alibaug • Ganpatipule • Tarkarli",
      dates: "45 Dates Available",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk8jbrCF0gK5hAJAm9XfAS_ZQC2Zzb7YeI2w&s",
      code: "MH00002",
      days: 5,
      priceValue: 32000,
      locationTags: ["Alibaug", "Ganpatipule", "Tarkarli"],
      isIndian: true
    },
    {
      title: "Maharashtra Hill Stations",
      duration: "5N/6D",
      price: "₹38,000",
      emi: "EMI from ₹1,418/month",
      badge: "Hill Station",
      locations: "Mahabaleshwar • Lonavala • Matheran",
      dates: "42 Dates Available",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaBon2bYUZjOOaeMVwv3nuwIuQuyD3UbgYpA&s",
      code: "MH00003",
      days: 6,
      priceValue: 38000,
      locationTags: ["Mahabaleshwar", "Lonavala", "Matheran"],
      isIndian: true
    },
    {
      title: "Maharashtra Luxury Experience",
      duration: "5N/6D",
      price: "₹58,000",
      emi: "EMI from ₹2,164/month",
      badge: "Luxury",
      locations: "5-Star Hotels • Private Tours • Fine Dining",
      dates: "38 Dates Available",
      image: "https://images.trvl-media.com/lodging/20000000/19460000/19458500/19458493/8cf0d468_y.jpg?impolicy=resizecrop&rw=402&ra=fit",
      code: "MH00004",
      days: 6,
      priceValue: 58000,
      locationTags: ["5-Star Hotels", "Private Tours", "Fine Dining"],
      isIndian: true
    },
    {
      title: "Maharashtra Family Package",
      duration: "4N/5D",
      price: "₹35,000",
      emi: "EMI from ₹1,306/month",
      badge: "Family",
      locations: "Family Activities • Parks • Museums",
      dates: "48 Dates Available",
      image: "https://www.antrikshtravel.com/wp-content/uploads/2024/08/sarang-pande-k3SHcT9zGkE-unsplash-636x426.webp",
      code: "MH00005",
      days: 5,
      priceValue: 35000,
      locationTags: ["Family Activities", "Parks", "Museums"],
      isIndian: true
    },
    {
      title: "Maharashtra Pilgrimage Tour",
      duration: "5N/6D",
      price: "₹42,000",
      emi: "EMI from ₹1,567/month",
      badge: "Pilgrimage",
      locations: "Shirdi • Pandharpur • Trimbakeshwar",
      dates: "44 Dates Available",
      image: "https://www.goldenagers.in/images/grouptour/gift-holiday-mumbai-header.jpg",
      code: "MH00006",
      days: 6,
      priceValue: 42000,
      locationTags: ["Shirdi", "Pandharpur", "Trimbakeshwar"],
      isIndian: true
    },
    {
      title: "Maharashtra Budget Tour",
      duration: "3N/4D",
      price: "₹22,000",
      emi: "EMI from ₹821/month",
      badge: "Budget",
      locations: "Affordable Stays • Local Experiences",
      dates: "52 Dates Available",
      image: "https://www.atlastravel.in/wp-content/uploads/2022/04/mumbai-sightseeing-tour.webp",
      code: "MH00007",
      days: 4,
      priceValue: 22000,
      locationTags: ["Affordable Stays", "Local Experiences"],
      isIndian: true
    },
    {
      title: "Maharashtra Adventure Tour",
      duration: "4N/5D",
      price: "₹28,000",
      emi: "EMI from ₹1,045/month",
      badge: "Adventure",
      locations: "Trekking • Water Sports • Wildlife",
      dates: "40 Dates Available",
      image: "https://media1.thrillophilia.com/filestore/pxvd8kmstejmsbzuew57if4ean0j_shutterstock_2433437.jpg?w=400&dpr=2",
      code: "MH00008",
      days: 5,
      priceValue: 28000,
      locationTags: ["Trekking", "Water Sports", "Wildlife"],
      isIndian: true
    },
    {
      title: "Maharashtra Complete Explorer",
      duration: "7N/8D",
      price: "₹52,000",
      emi: "EMI from ₹1,940/month",
      badge: "Explorer",
      locations: "All Regions • Heritage • Nature",
      dates: "36 Dates Available",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
      code: "MH00009",
      days: 8,
      priceValue: 52000,
      locationTags: ["All Regions", "Heritage", "Nature"],
      isIndian: true
    }
  ],

  "North East": [
    {
      title: "North East Explorer",
      duration: "10N/11D",
      price: "₹75,000",
      emi: "EMI from ₹2,798/month",
      badge: "Explorer",
      locations: "Assam • Meghalaya • Arunachal",
      dates: "20 Dates Available",
      image: "https://sahapathika.com/image/3440images%20(61).jpg",
      code: "NE00001",
      days: 11,
      priceValue: 75000,
      locationTags: ["Assam", "Meghalaya", "Arunachal"],
      isIndian: true
    },
    {
      title: "North East Cultural Tour",
      duration: "8N/9D",
      price: "₹65,000",
      emi: "EMI from ₹2,425/month",
      badge: "Cultural",
      locations: "Tribal Villages • Festivals • Traditions",
      dates: "25 Dates Available",
      image: "https://www.specialholidays.com/blog/wp-content/uploads/2021/04/100-Drums-Festival-of-Meghalaya.jpg",
      code: "NE00002",
      days: 9,
      priceValue: 65000,
      locationTags: ["Tribal Villages", "Festivals", "Traditions"],
      isIndian: true
    },
    {
      title: "North East Luxury Tour",
      duration: "9N/10D",
      price: "₹85,000",
      emi: "EMI from ₹3,172/month",
      badge: "Luxury",
      locations: "Premium Stays • Private Tours • Fine Dining",
      dates: "18 Dates Available",
      image: "https://media1.thrillophilia.com/filestore/si2hey6uwfc3w5radc53rxr1zab9_1624274544_shutterstock_636087965.jpg?w=400&dpr=2",
      code: "NE00003",
      days: 10,
      priceValue: 85000,
      locationTags: ["Premium Stays", "Private Tours", "Fine Dining"],
      isIndian: true
    },
    {
      title: "North East Adventure Tour",
      duration: "8N/9D",
      price: "₹68,000",
      emi: "EMI from ₹2,537/month",
      badge: "Adventure",
      locations: "Trekking • River Rafting • Wildlife",
      dates: "22 Dates Available",
      image: "https://static.toiimg.com/photo/msid-104149411,width-96,height-65.cms",
      code: "NE00004",
      days: 9,
      priceValue: 68000,
      locationTags: ["Trekking", "River Rafting", "Wildlife"],
      isIndian: true
    },
    {
      title: "North East Family Package",
      duration: "7N/8D",
      price: "₹58,000",
      emi: "EMI from ₹2,164/month",
      badge: "Family",
      locations: "Family Activities • Nature • Culture",
      dates: "28 Dates Available",
      image: "https://crm.travovertex.com/public/images/holiday/original/1662547576istockphoto-1044402406-612x612.jpg",
      code: "NE00005",
      days: 8,
      priceValue: 58000,
      locationTags: ["Family Activities", "Nature", "Culture"],
      isIndian: true
    },
    {
      title: "North East Tea Garden Tour",
      duration: "6N/7D",
      price: "₹52,000",
      emi: "EMI from ₹1,940/month",
      badge: "Tea",
      locations: "Tea Estates • Plantations • Local Culture",
      dates: "30 Dates Available",
      image: "https://visitsofindia.com/wp-content/uploads/2020/04/Munnar-Tea-Tour-01.jpg",
      code: "NE00006",
      days: 7,
      priceValue: 52000,
      locationTags: ["Tea Estates", "Plantations", "Local Culture"],
      isIndian: true
    },
    {
      title: "North East Budget Tour",
      duration: "6N/7D",
      price: "₹42,000",
      emi: "EMI from ₹1,567/month",
      badge: "Budget",
      locations: "Affordable Stays • Local Experiences",
      dates: "35 Dates Available",
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
      code: "NE00007",
      days: 7,
      priceValue: 42000,
      locationTags: ["Affordable Stays", "Local Experiences"],
      isIndian: true
    },
    {
      title: "North East Wildlife Safari",
      duration: "7N/8D",
      price: "₹62,000",
      emi: "EMI from ₹2,313/month",
      badge: "Wildlife",
      locations: "Kaziranga • Manas • National Parks",
      dates: "26 Dates Available",
      image: "https://www.culturalsafaritours.com/wp-content/uploads/2022/09/northe-east-wildlife-tour.jpg",
      code: "NE00008",
      days: 8,
      priceValue: 62000,
      locationTags: ["Kaziranga", "Manas", "National Parks"],
      isIndian: true
    },
    {
      title: "North East Complete Experience",
      duration: "11N/12D",
      price: "₹78,000",
      emi: "EMI from ₹2,910/month",
      badge: "Complete",
      locations: "All States • Culture • Nature",
      dates: "20 Dates Available",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
      code: "NE00009",
      days: 12,
      priceValue: 78000,
      locationTags: ["All States", "Culture", "Nature"],
      isIndian: true
    }
  ],

  "Odisha": [
    {
      title: "Odisha Temple Tour",
      duration: "5N/6D",
      price: "₹32,000",
      emi: "EMI from ₹1,194/month",
      badge: "Temple",
      locations: "Bhubaneswar • Puri • Konark",
      dates: "42 Dates Available",
      image: "https://media.tacdn.com/media/attractions-splice-spp-674x446/09/19/bb/58.jpg",
      code: "OD00001",
      days: 6,
      priceValue: 32000,
      locationTags: ["Bhubaneswar", "Puri", "Konark"],
      isIndian: true
    },
    {
      title: "Odisha Beach Holiday",
      duration: "4N/5D",
      price: "₹28,000",
      emi: "EMI from ₹1,045/month",
      badge: "Beach",
      locations: "Puri • Chandipur • Gopalpur",
      dates: "45 Dates Available",
      image: "https://media.assettype.com/outlooktraveller%2Fimport%2Foutlooktraveller%2Fpublic%2Fuploads%2Farticles%2Fexplore%2F2017%2F12%2Ffeatured-image-16.jpg",
      code: "OD00002",
      days: 5,
      priceValue: 28000,
      locationTags: ["Puri", "Chandipur", "Gopalpur"],
      isIndian: true
    },
    {
      title: "Odisha Wildlife Safari",
      duration: "4N/5D",
      price: "₹35,000",
      emi: "EMI from ₹1,306/month",
      badge: "Wildlife",
      locations: "Simlipal • Bhitarkanika • Chilika",
      dates: "38 Dates Available",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbWBhq3x9381u-DCA2ztWeNzp9hOVkcDTCxA&s",
      code: "OD00003",
      days: 5,
      priceValue: 35000,
      locationTags: ["Simlipal", "Bhitarkanika", "Chilika"],
      isIndian: true
    },
    {
      title: "Odisha Luxury Experience",
      duration: "5N/6D",
      price: "₹48,000",
      emi: "EMI from ₹1,791/month",
      badge: "Luxury",
      locations: "5-Star Hotels • Private Tours • Spa",
      dates: "35 Dates Available",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrIpjQDLbCbAEtyySH0dUDll_riH_8BUasiA&s",
      code: "OD00004",
      days: 6,
      priceValue: 48000,
      locationTags: ["5-Star Hotels", "Private Tours", "Spa"],
      isIndian: true
    },
    {
      title: "Odisha Family Package",
      duration: "4N/5D",
      price: "₹30,000",
      emi: "EMI from ₹1,119/month",
      badge: "Family",
      locations: "Family Activities • Beaches • Temples",
      dates: "46 Dates Available",
      image: "https://www.indiantempletour.com/wp-content/uploads/2022/08/Odisha-Tour-Packages.jpg",
      code: "OD00005",
      days: 5,
      priceValue: 30000,
      locationTags: ["Family Activities", "Beaches", "Temples"],
      isIndian: true
    },
    {
      title: "Odisha Tribal Tour",
      duration: "5N/6D",
      price: "₹38,000",
      emi: "EMI from ₹1,418/month",
      badge: "Tribal",
      locations: "Tribal Villages • Culture • Handicrafts",
      dates: "40 Dates Available",
      image: "https://htoindia.com/wp-content/uploads/2017/02/horn-maria-dance.jpg",
      code: "OD00006",
      days: 6,
      priceValue: 38000,
      locationTags: ["Tribal Villages", "Culture", "Handicrafts"],
      isIndian: true
    },
    {
      title: "Odisha Budget Tour",
      duration: "3N/4D",
      price: "₹20,000",
      emi: "EMI from ₹746/month",
      badge: "Budget",
      locations: "Affordable Stays • Local Experiences",
      dates: "48 Dates Available",
      image: "https://www.odishapackage.com/images/tour/from17.png",
      code: "OD00007",
      days: 4,
      priceValue: 20000,
      locationTags: ["Affordable Stays", "Local Experiences"],
      isIndian: true
    },
    {
      title: "Odisha Adventure Tour",
      duration: "4N/5D",
      price: "₹32,000",
      emi: "EMI from ₹1,194/month",
      badge: "Adventure",
      locations: "Trekking • Water Sports • Wildlife",
      dates: "42 Dates Available",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSAACA-XCBrzOVdg7XFYYhMiaWf81dp_Vkpg&s",
      code: "OD00008",
      days: 5,
      priceValue: 32000,
      locationTags: ["Trekking", "Water Sports", "Wildlife"],
      isIndian: true
    },
    {
      title: "Odisha Complete Explorer",
      duration: "6N/7D",
      price: "₹42,000",
      emi: "EMI from ₹1,567/month",
      badge: "Explorer",
      locations: "All Attractions • Culture • Nature",
      dates: "36 Dates Available",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
      code: "OD00009",
      days: 7,
      priceValue: 42000,
      locationTags: ["All Attractions", "Culture", "Nature"],
      isIndian: true
    }
  ],

  "Puducherry": [
    {
      title: "Pondicherry French Colony",
      duration: "3N/4D",
      price: "₹28,000",
      emi: "EMI from ₹1,045/month",
      badge: "French",
      locations: "White Town • Auroville • Beaches",
      dates: "45 Dates Available",
      image: "https://backpackersunited.in/_next/image?url=https%3A%2F%2Fbpu-images-v1.s3.eu-north-1.amazonaws.com%2Fuploads%2F1724143573512_french-909691_1280.jpg&w=3840&q=75",
      code: "PY00001",
      days: 4,
      priceValue: 28000,
      locationTags: ["White Town", "Auroville", "Beaches"],
      isIndian: true
    },
    {
      title: "Pondicherry Luxury Stay",
      duration: "4N/5D",
      price: "₹42,000",
      emi: "EMI from ₹1,567/month",
      badge: "Luxury",
      locations: "Beach Resorts • Spa • Fine Dining",
      dates: "38 Dates Available",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/b2/73/d0/front-view.jpg?w=1200&h=-1&s=1",
      code: "PY00002",
      days: 5,
      priceValue: 42000,
      locationTags: ["Beach Resorts", "Spa", "Fine Dining"],
      isIndian: true
    },
    {
      title: "Pondicherry Spiritual Retreat",
      duration: "3N/4D",
      price: "₹25,000",
      emi: "EMI from ₹933/month",
      badge: "Spiritual",
      locations: "Auroville • Ashram • Meditation",
      dates: "42 Dates Available",
      image: "https://blog.mangohillhotels.com/wp-content/uploads/2025/07/Auroville.jpg",
      code: "PY00003",
      days: 4,
      priceValue: 25000,
      locationTags: ["Auroville", "Ashram", "Meditation"],
      isIndian: true
    },
    {
      title: "Pondicherry Family Package",
      duration: "3N/4D",
      price: "₹32,000",
      emi: "EMI from ₹1,194/month",
      badge: "Family",
      locations: "Beaches • Parks • Family Activities",
      dates: "46 Dates Available",
      image: "https://rknresorts.com/wp-content/uploads/2025/05/WhatsApp-Image-2024-09-04-at-12.25.14_fbc1acf6.png",
      code: "PY00004",
      days: 4,
      priceValue: 32000,
      locationTags: ["Beaches", "Parks", "Family Activities"],
      isIndian: true
    },
    {
      title: "Pondicherry Honeymoon Special",
      duration: "4N/5D",
      price: "₹38,000",
      emi: "EMI from ₹1,418/month",
      badge: "Honeymoon",
      locations: "Romantic Stays • Beach Walks • Fine Dining",
      dates: "40 Dates Available",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
      code: "PY00005",
      days: 5,
      priceValue: 38000,
      locationTags: ["Romantic Stays", "Beach Walks", "Fine Dining"],
      isIndian: true
    },
    {
      title: "Pondicherry Budget Tour",
      duration: "2N/3D",
      price: "₹18,000",
      emi: "EMI from ₹672/month",
      badge: "Budget",
      locations: "Affordable Stays • Local Experiences",
      dates: "50 Dates Available",
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
      code: "PY00006",
      days: 3,
      priceValue: 18000,
      locationTags: ["Affordable Stays", "Local Experiences"],
      isIndian: true
    },
    {
      title: "Pondicherry Cultural Tour",
      duration: "3N/4D",
      price: "₹22,000",
      emi: "EMI from ₹821/month",
      badge: "Cultural",
      locations: "French Heritage • Local Markets • Cuisine",
      dates: "44 Dates Available",
      image: "https://www.tourmyindia.com/states/puducherry/images/chennai-mahabalipuram-pondicherry2.jpg",
      code: "PY00007",
      days: 4,
      priceValue: 22000,
      locationTags: ["French Heritage", "Local Markets", "Cuisine"],
      isIndian: true
    },
    {
      title: "Pondicherry Adventure Tour",
      duration: "3N/4D",
      price: "₹26,000",
      emi: "EMI from ₹970/month",
      badge: "Adventure",
      locations: "Water Sports • Scuba Diving • Kayaking",
      dates: "42 Dates Available",
      image: "https://seawatersports.com/images/activies/slide/water-sports-in-pondicherry-price.jpg",
      code: "PY00008",
      days: 4,
      priceValue: 26000,
      locationTags: ["Water Sports", "Scuba Diving", "Kayaking"],
      isIndian: true
    },
    {
      title: "Pondicherry Complete Experience",
      duration: "4N/5D",
      price: "₹35,000",
      emi: "EMI from ₹1,306/month",
      badge: "Complete",
      locations: "All Attractions • Beaches • Culture",
      dates: "38 Dates Available",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
      code: "PY00009",
      days: 5,
      priceValue: 35000,
      locationTags: ["All Attractions", "Beaches", "Culture"],
      isIndian: true
    }
  ],

  "Punjab & Haryana": [
    {
      title: "Punjab Cultural Tour",
      duration: "4N/5D",
      price: "₹30,000",
      emi: "EMI from ₹1,119/month",
      badge: "Cultural",
      locations: "Amritsar • Chandigarh • Golden Temple",
      dates: "48 Dates Available",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJicf860cymIy5BaalDIfOjfdtnAFWhFYJwg&s",
      code: "PB00001",
      days: 5,
      priceValue: 30000,
      locationTags: ["Amritsar", "Chandigarh", "Golden Temple"],
      isIndian: true
    },
    {
      title: "Punjab Heritage Tour",
      duration: "3N/4D",
      price: "₹25,000",
      emi: "EMI from ₹933/month",
      badge: "Heritage",
      locations: "Jallianwala Bagh • Wagah Border • Museums",
      dates: "45 Dates Available",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5FNgPsmzq3IzgVZ8iVFx2IdiXDCAdiHtqYw&s",
      code: "PB00002",
      days: 4,
      priceValue: 25000,
      locationTags: ["Jallianwala Bagh", "Wagah Border", "Museums"],
      isIndian: true
    },
    {
      title: "Punjab Luxury Experience",
      duration: "4N/5D",
      price: "₹45,000",
      emi: "EMI from ₹1,679/month",
      badge: "Luxury",
      locations: "5-Star Hotels • Private Tours • Fine Dining",
      dates: "40 Dates Available",
      image: "https://www.architectandinteriorsindia.com/cloud/2022/07/20/xtPv61EN-Baag-e-Fursat-01_Exterior_Aann-Space-1200x800.jpg",
      code: "PB00003",
      days: 5,
      priceValue: 45000,
      locationTags: ["5-Star Hotels", "Private Tours", "Fine Dining"],
      isIndian: true
    },
    {
      title: "Punjab Family Package",
      duration: "3N/4D",
      price: "₹28,000",
      emi: "EMI from ₹1,045/month",
      badge: "Family",
      locations: "Family Activities • Parks • Culture",
      dates: "46 Dates Available",
      image: "https://im.hunt.in/cg/pun/About/Family-Dhillon-Funworld.JPG",
      code: "PB00004",
      days: 4,
      priceValue: 28000,
      locationTags: ["Family Activities", "Parks", "Culture"],
      isIndian: true
    },
    {
      title: "Punjab Food Tour",
      duration: "3N/4D",
      price: "₹22,000",
      emi: "EMI from ₹821/month",
      badge: "Food",
      locations: "Local Cuisine • Street Food • Dhabas",
      dates: "42 Dates Available",
      image: "https://www.punjab-tourism.com/images/punjabi_cuisine.jpg",
      code: "PB00005",
      days: 4,
      priceValue: 22000,
      locationTags: ["Local Cuisine", "Street Food", "Dhabas"],
      isIndian: true
    },
    {
      title: "Punjab Budget Tour",
      duration: "2N/3D",
      price: "₹15,000",
      emi: "EMI from ₹560/month",
      badge: "Budget",
      locations: "Affordable Stays • Local Experiences",
      dates: "50 Dates Available",
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
      code: "PB00006",
      days: 3,
      priceValue: 15000,
      locationTags: ["Affordable Stays", "Local Experiences"],
      isIndian: true
    },
    {
      title: "Punjab Rural Experience",
      duration: "3N/4D",
      price: "₹20,000",
      emi: "EMI from ₹746/month",
      badge: "Rural",
      locations: "Village Stay • Farming • Local Culture",
      dates: "44 Dates Available",
      image: "https://indiauntravelled.com/wp-content/uploads/india-family-faeming-harvesting-crops-2025-02-10-00-31-22-utc_11zon-scaled.jpg",
      code: "PB00007",
      days: 4,
      priceValue: 20000,
      locationTags: ["Village Stay", "Farming", "Local Culture"],
      isIndian: true
    },
    {
      title: "Punjab Shopping Tour",
      duration: "3N/4D",
      price: "₹26,000",
      emi: "EMI from ₹970/month",
      badge: "Shopping",
      locations: "Local Markets • Handicrafts • Textiles",
      dates: "41 Dates Available",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/31/96/16/c0/caption.jpg?w=400&h=300&s=1",
      code: "PB00008",
      days: 4,
      priceValue: 26000,
      locationTags: ["Local Markets", "Handicrafts", "Textiles"],
      isIndian: true
    },
    {
      title: "Punjab Complete Experience",
      duration: "5N/6D",
      price: "₹38,000",
      emi: "EMI from ₹1,418/month",
      badge: "Complete",
      locations: "All Cities • Culture • Heritage",
      dates: "38 Dates Available",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
      code: "PB00009",
      days: 6,
      priceValue: 38000,
      locationTags: ["All Cities", "Culture", "Heritage"],
      isIndian: true
    }
  ],

  "Rajasthan": [
    {
      title: "Rajasthan Royal Tour",
      duration: "7N/8D",
      price: "₹52,000",
      emi: "EMI from ₹1,940/month",
      badge: "Royal",
      locations: "Jaipur • Udaipur • Jodhpur",
      dates: "55 Dates Available",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHMXsPMsUu0QQ0i-mooBwMl4V7F8gLwBI96g&s",
      code: "RJ00001",
      days: 8,
      priceValue: 52000,
      locationTags: ["Jaipur", "Udaipur", "Jodhpur"],
      isIndian: true
    },
    {
      title: "Rajasthan Desert Safari",
      duration: "4N/5D",
      price: "₹35,000",
      emi: "EMI from ₹1,306/month",
      badge: "Desert",
      locations: "Jaisalmer • Desert Camp • Camel Safari",
      dates: "48 Dates Available",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyGlIeJgBjmTeWYuRMXWremGaZIr7s4R3lSg&s",
      code: "RJ00002",
      days: 5,
      priceValue: 35000,
      locationTags: ["Jaisalmer", "Desert Camp", "Camel Safari"],
      isIndian: true
    },
    {
      title: "Rajasthan Luxury Palace Stay",
      duration: "6N/7D",
      price: "₹75,000",
      emi: "EMI from ₹2,798/month",
      badge: "Luxury",
      locations: "Palace Hotels • Private Tours • Royal Treatment",
      dates: "40 Dates Available",
      image: "https://assets.architecturaldigest.in/photos/600838c5e6e1f64740188f53/16:9/w_1280,c_limit/Umaid-Bhawan-1366x768.jpg?mbid=social_retweet",
      code: "RJ00003",
      days: 7,
      priceValue: 75000,
      locationTags: ["Palace Hotels", "Private Tours", "Royal Treatment"],
      isIndian: true
    },
    {
      title: "Rajasthan Family Package",
      duration: "5N/6D",
      price: "₹42,000",
      emi: "EMI from ₹1,567/month",
      badge: "Family",
      locations: "Family Activities • Forts • Culture",
      dates: "50 Dates Available",
      image: "https://rajasthanyatra.in/blog/wp-content/uploads/2024/08/banner.webp",
      code: "RJ00004",
      days: 6,
      priceValue: 42000,
      locationTags: ["Family Activities", "Forts", "Culture"],
      isIndian: true
    },
    {
      title: "Rajasthan Honeymoon Special",
      duration: "6N/7D",
      price: "₹58,000",
      emi: "EMI from ₹2,164/month",
      badge: "Honeymoon",
      locations: "Romantic Stays • Private Dinners • Royal Experience",
      dates: "42 Dates Available",
      image: "https://www.tourmyindia.com/states/rajasthan/image/honeymoon-banner-m.webp",
      code: "RJ00005",
      days: 7,
      priceValue: 58000,
      locationTags: ["Romantic Stays", "Private Dinners", "Royal Experience"],
      isIndian: true
    },
    {
      title: "Rajasthan Budget Tour",
      duration: "4N/5D",
      price: "₹28,000",
      emi: "EMI from ₹1,045/month",
      badge: "Budget",
      locations: "Affordable Stays • Local Experiences",
      dates: "52 Dates Available",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmA6loqV1JJeM3x-9EUIZqymlMwMACcKS88w&s",
      code: "RJ00006",
      days: 5,
      priceValue: 28000,
      locationTags: ["Affordable Stays", "Local Experiences"],
      isIndian: true
    },
    {
      title: "Rajasthan Cultural Tour",
      duration: "5N/6D",
      price: "₹38,000",
      emi: "EMI from ₹1,418/month",
      badge: "Cultural",
      locations: "Folk Arts • Music • Dance • Traditions",
      dates: "46 Dates Available",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2Ub2g6c5iG6QP67XjiUXghEyY-nlVOcOvsQ&s",
      code: "RJ00007",
      days: 6,
      priceValue: 38000,
      locationTags: ["Folk Arts", "Music", "Dance", "Traditions"],
      isIndian: true
    },
    {
      title: "Rajasthan Wildlife Safari",
      duration: "4N/5D",
      price: "₹32,000",
      emi: "EMI from ₹1,194/month",
      badge: "Wildlife",
      locations: "Ranthambore • Sariska • Keoladeo",
      dates: "44 Dates Available",
      image: "https://www.thournatureresorts.com/blog/wp-content/uploads/2020/07/4.jpg",
      code: "RJ00008",
      days: 5,
      priceValue: 32000,
      locationTags: ["Ranthambore", "Sariska", "Keoladeo"],
      isIndian: true
    },
    {
      title: "Rajasthan Complete Explorer",
      duration: "8N/9D",
      price: "₹65,000",
      emi: "EMI from ₹2,425/month",
      badge: "Explorer",
      locations: "All Cities • Desert • Heritage",
      dates: "38 Dates Available",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToilcIzICN0uIXbfoLV3f1naheUfaK8PytmA&s",
      code: "RJ00009",
      days: 9,
      priceValue: 65000,
      locationTags: ["All Cities", "Desert", "Heritage"],
      isIndian: true
    }
  ],

  "Seven Sisters": [
    {
      title: "Seven Sisters Adventure",
      duration: "12N/13D",
      price: "₹85,000",
      emi: "EMI from ₹3,172/month",
      badge: "Adventure",
      locations: "All 7 Sister States • Hills • Valleys",
      dates: "15 Dates Available",
      image: "https://images.unsplash.com/photo-1587132135072-bc3c3dcfd4e9?w=800&q=80",
      code: "SS00001",
      days: 13,
      priceValue: 85000,
      locationTags: ["Seven Sisters", "Hills", "Valleys"],
      isIndian: true
    },
    {
      title: "Seven Sisters Cultural Tour",
      duration: "10N/11D",
      price: "₹72,000",
      emi: "EMI from ₹2,687/month",
      badge: "Cultural",
      locations: "Tribal Villages • Festivals • Traditions",
      dates: "18 Dates Available",
      image: "https://www.capertravelindia.com/images/nei-1.jpg",
      code: "SS00002",
      days: 11,
      priceValue: 72000,
      locationTags: ["Tribal Villages", "Festivals", "Traditions"],
      isIndian: true
    },
    {
      title: "Seven Sisters Luxury Tour",
      duration: "11N/12D",
      price: "₹95,000",
      emi: "EMI from ₹3,545/month",
      badge: "Luxury",
      locations: "Premium Stays • Private Tours • Fine Dining",
      dates: "12 Dates Available",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      code: "SS00003",
      days: 12,
      priceValue: 95000,
      locationTags: ["Premium Stays", "Private Tours", "Fine Dining"],
      isIndian: true
    },
    {
      title: "Seven Sisters Family Package",
      duration: "9N/10D",
      price: "₹68,000",
      emi: "EMI from ₹2,537/month",
      badge: "Family",
      locations: "Family Activities • Nature • Culture",
      dates: "20 Dates Available",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
      code: "SS00004",
      days: 10,
      priceValue: 68000,
      locationTags: ["Family Activities", "Nature", "Culture"],
      isIndian: true
    },
    {
      title: "Seven Sisters Trekking Tour",
      duration: "10N/11D",
      price: "₹78,000",
      emi: "EMI from ₹2,910/month",
      badge: "Adventure",
      locations: "Himalayan Treks • Valleys • Mountains",
      dates: "16 Dates Available",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
      code: "SS00005",
      days: 11,
      priceValue: 78000,
      locationTags: ["Himalayan Treks", "Valleys", "Mountains"],
      isIndian: true
    },
    {
      title: "Seven Sisters Budget Tour",
      duration: "8N/9D",
      price: "₹58,000",
      emi: "EMI from ₹2,164/month",
      badge: "Budget",
      locations: "Affordable Stays • Local Experiences",
      dates: "22 Dates Available",
      image: "https://www.touristhubindia.com/images/northeast/north-east-arunachal-tour.webp",
      code: "SS00006",
      days: 9,
      priceValue: 58000,
      locationTags: ["Affordable Stays", "Local Experiences"],
      isIndian: true
    },
    {
      title: "Seven Sisters Wildlife Tour",
      duration: "9N/10D",
      price: "₹75,000",
      emi: "EMI from ₹2,798/month",
      badge: "Wildlife",
      locations: "National Parks • Wildlife Sanctuaries",
      dates: "18 Dates Available",
      image: "https://images.unsplash.com/photo-1550358864-518f202c02ba?w=800&q=80",
      code: "SS00007",
      days: 10,
      priceValue: 75000,
      locationTags: ["National Parks", "Wildlife Sanctuaries"],
      isIndian: true
    },
    {
      title: "Seven Sisters Tea Garden Tour",
      duration: "8N/9D",
      price: "₹65,000",
      emi: "EMI from ₹2,425/month",
      badge: "Tea",
      locations: "Tea Estates • Plantations • Local Culture",
      dates: "20 Dates Available",
      image: "https://www.capertravelindia.com/images/nei-3.jpg",
      code: "SS00008",
      days: 9,
      priceValue: 65000,
      locationTags: ["Tea Estates", "Plantations", "Local Culture"],
      isIndian: true
    },
    {
      title: "Seven Sisters Complete Experience",
      duration: "13N/14D",
      price: "₹88,000",
      emi: "EMI from ₹3,284/month",
      badge: "Complete",
      locations: "All States • Culture • Adventure",
      dates: "14 Dates Available",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
      code: "SS00009",
      days: 14,
      priceValue: 88000,
      locationTags: ["All States", "Culture", "Adventure"],
      isIndian: true
    }
  ],

  "Tamil Nadu": [
    {
      title: "Tamil Nadu Temple Tour",
      duration: "6N/7D",
      price: "₹40,000",
      emi: "EMI from ₹1,492/month",
      badge: "Temple",
      locations: "Chennai • Madurai • Rameswaram",
      dates: "50 Dates Available",
      image: "https://htoindia.com/wp-content/uploads/2017/02/meenakshi-amman-temple.jpg",
      code: "TN00001",
      days: 7,
      priceValue: 40000,
      locationTags: ["Chennai", "Madurai", "Rameswaram"],
      isIndian: true
    },
    {
      title: "Tamil Nadu Hill Stations",
      duration: "5N/6D",
      price: "₹38,000",
      emi: "EMI from ₹1,418/month",
      badge: "Hill Station",
      locations: "Ooty • Kodaikanal • Yercaud",
      dates: "45 Dates Available",
      image: "https://www.vpltravels.com/wp-content/uploads/2024/02/Top-Best-Hill-Stations-to-Visit-in-TamilNadu.webp",
      code: "TN00002",
      days: 6,
      priceValue: 38000,
      locationTags: ["Ooty", "Kodaikanal", "Yercaud"],
      isIndian: true
    },
    {
      title: "Tamil Nadu Beach Holiday",
      duration: "4N/5D",
      price: "₹32,000",
      emi: "EMI from ₹1,194/month",
      badge: "Beach",
      locations: "Mahabalipuram • Kanyakumari • Pondicherry",
      dates: "48 Dates Available",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiwn7-J_y7x4r-YyJkNJsQkkvlVu-diKyx1Q&s",
      code: "TN00003",
      days: 5,
      priceValue: 32000,
      locationTags: ["Mahabalipuram", "Kanyakumari", "Pondicherry"],
      isIndian: true
    },
    {
      title: "Tamil Nadu Luxury Experience",
      duration: "6N/7D",
      price: "₹58,000",
      emi: "EMI from ₹2,164/month",
      badge: "Luxury",
      locations: "5-Star Hotels • Private Tours • Spa",
      dates: "40 Dates Available",
      image: "https://media-cdn.tripadvisor.com/media/photo-s/2c/d1/c2/d6/caption.jpg",
      code: "TN00004",
      days: 7,
      priceValue: 58000,
      locationTags: ["5-Star Hotels", "Private Tours", "Spa"],
      isIndian: true
    },
    {
      title: "Tamil Nadu Family Package",
      duration: "5N/6D",
      price: "₹42,000",
      emi: "EMI from ₹1,567/month",
      badge: "Family",
      locations: "Family Activities • Parks • Culture",
      dates: "52 Dates Available",
      image: "https://5.imimg.com/data5/SELLER/Default/2023/11/358660446/RQ/SB/CI/30730626/tamil-nadu-tour-package-service-500x500.jpg",
      code: "TN00005",
      days: 6,
      priceValue: 42000,
      locationTags: ["Family Activities", "Parks", "Culture"],
      isIndian: true
    },
    {
      title: "Tamil Nadu Budget Tour",
      duration: "4N/5D",
      price: "₹25,000",
      emi: "EMI from ₹933/month",
      badge: "Budget",
      locations: "Affordable Stays • Local Experiences",
      dates: "55 Dates Available",
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
      code: "TN00006",
      days: 5,
      priceValue: 25000,
      locationTags: ["Affordable Stays", "Local Experiences"],
      isIndian: true
    },
    {
      title: "Tamil Nadu Cultural Tour",
      duration: "5N/6D",
      price: "₹35,000",
      emi: "EMI from ₹1,306/month",
      badge: "Cultural",
      locations: "Classical Arts • Music • Dance • Traditions",
      dates: "46 Dates Available",
      image: "https://blogmedia.testbook.com/blog/wp-content/uploads/2023/05/1-5136-3fee7e87.jpg",
      code: "TN00007",
      days: 6,
      priceValue: 35000,
      locationTags: ["Classical Arts", "Music", "Dance", "Traditions"],
      isIndian: true
    },
    {
      title: "Tamil Nadu Wildlife Safari",
      duration: "4N/5D",
      price: "₹30,000",
      emi: "EMI from ₹1,119/month",
      badge: "Wildlife",
      locations: "Mudumalai • Anamalai • Wildlife Sanctuaries",
      dates: "44 Dates Available",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzK5ix9YYlKVcIGm0s5OTMRp2ATUztXcjG-w&s",
      code: "TN00008",
      days: 5,
      priceValue: 30000,
      locationTags: ["Mudumalai", "Anamalai", "Wildlife Sanctuaries"],
      isIndian: true
    },
    {
      title: "Tamil Nadu Complete Explorer",
      duration: "7N/8D",
      price: "₹48,000",
      emi: "EMI from ₹1,791/month",
      badge: "Explorer",
      locations: "All Regions • Heritage • Nature",
      dates: "42 Dates Available",
      image: "https://www.indianpanorama.in/assets/images/tourpackages/banner/south-india-explorer.webp",
      code: "TN00009",
      days: 8,
      priceValue: 48000,
      locationTags: ["All Regions", "Heritage", "Nature"],
      isIndian: true
    }
  ],

  "Uttar Pradesh": [
    {
      title: "Uttar Pradesh Spiritual Tour",
      duration: "5N/6D",
      price: "₹35,000",
      emi: "EMI from ₹1,306/month",
      badge: "Spiritual",
      locations: "Varanasi • Ayodhya • Allahabad",
      dates: "60 Dates Available",
      image: "https://www.holidify.com/images/cmsuploads/compressed/varanasi-sunsetBoats-at-the-ghats-of-Varanasi-at-the-time-of-sunset_20210917154536.jpg",
      code: "UP00001",
      days: 6,
      priceValue: 35000,
      locationTags: ["Varanasi", "Ayodhya", "Allahabad"],
      isIndian: true
    },
    {
      title: "Uttar Pradesh Heritage Tour",
      duration: "6N/7D",
      price: "₹42,000",
      emi: "EMI from ₹1,567/month",
      badge: "Heritage",
      locations: "Agra • Lucknow • Fatehpur Sikri",
      dates: "55 Dates Available",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80",
      code: "UP00002",
      days: 7,
      priceValue: 42000,
      locationTags: ["Agra", "Lucknow", "Fatehpur Sikri"],
      isIndian: true
    },
    {
      title: "Uttar Pradesh Luxury Experience",
      duration: "5N/6D",
      price: "₹52,000",
      emi: "EMI from ₹1,940/month",
      badge: "Luxury",
      locations: "5-Star Hotels • Private Tours • Fine Dining",
      dates: "45 Dates Available",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/ec/c7/d0/facade.jpg?w=1200&h=-1&s=1",
      code: "UP00003",
      days: 6,
      priceValue: 52000,
      locationTags: ["5-Star Hotels", "Private Tours", "Fine Dining"],
      isIndian: true
    },
    {
      title: "Uttar Pradesh Family Package",
      duration: "4N/5D",
      price: "₹32,000",
      emi: "EMI from ₹1,194/month",
      badge: "Family",
      locations: "Family Activities • Parks • Culture",
      dates: "58 Dates Available",
      image: "https://www.holidaymonk.com/wp-content/uploads/2024/08/Uttar-Pradesh-Tour-Package.webp",
      code: "UP00004",
      days: 5,
      priceValue: 32000,
      locationTags: ["Family Activities", "Parks", "Culture"],
      isIndian: true
    },
    {
      title: "Uttar Pradesh Budget Tour",
      duration: "3N/4D",
      price: "₹20,000",
      emi: "EMI from ₹746/month",
      badge: "Budget",
      locations: "Affordable Stays • Local Experiences",
      dates: "65 Dates Available",
      image: "https://im.hunt.in/cg/up/About/Tourism/Chitrakoot.jpg",
      code: "UP00005",
      days: 4,
      priceValue: 20000,
      locationTags: ["Affordable Stays", "Local Experiences"],
      isIndian: true
    },
    {
      title: "Uttar Pradesh Cultural Tour",
      duration: "5N/6D",
      price: "₹38,000",
      emi: "EMI from ₹1,418/month",
      badge: "Cultural",
      locations: "Folk Arts • Music • Dance • Traditions",
      dates: "52 Dates Available",
      image: "https://www.holidify.com/images/cmsuploads/compressed/6219671194_2b5efdc3e8_b_20170829184456.jpg",
      code: "UP00006",
      days: 6,
      priceValue: 38000,
      locationTags: ["Folk Arts", "Music", "Dance", "Traditions"],
      isIndian: true
    },
    {
      title: "Uttar Pradesh Wildlife Safari",
      duration: "4N/5D",
      price: "₹28,000",
      emi: "EMI from ₹1,045/month",
      badge: "Wildlife",
      locations: "Dudhwa • Katarniaghat • Wildlife Sanctuaries",
      dates: "48 Dates Available",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbczjSyXi1m0TEI0fxkm7cfOHEOFSQpRmmng&s",
      code: "UP00007",
      days: 5,
      priceValue: 28000,
      locationTags: ["Dudhwa", "Katarniaghat", "Wildlife Sanctuaries"],
      isIndian: true
    },
    {
      title: "Uttar Pradesh Food Tour",
      duration: "4N/5D",
      price: "₹25,000",
      emi: "EMI from ₹933/month",
      badge: "Food",
      locations: "Local Cuisine • Street Food • Sweets",
      dates: "54 Dates Available",
      image: "https://static.india.com/wp-content/uploads/2024/09/4-7-1.jpg?impolicy=Medium_Widthonly&w=350&h=2630",
      code: "UP00008",
      days: 5,
      priceValue: 25000,
      locationTags: ["Local Cuisine", "Street Food", "Sweets"],
      isIndian: true
    },
    {
      title: "Uttar Pradesh Complete Explorer",
      duration: "7N/8D",
      price: "₹45,000",
      emi: "EMI from ₹1,679/month",
      badge: "Explorer",
      locations: "All Regions • Heritage • Spirituality",
      dates: "50 Dates Available",
      image: "https://m.economictimes.com/thumb/msid-51288676,width-1200,height-900,resizemode-4,imgsize-567256/visit-the-splendour-of-uttar-pradesh-for-the-diverse-explorer-in-you.jpg",
      code: "UP00009",
      days: 8,
      priceValue: 45000,
      locationTags: ["All Regions", "Heritage", "Spirituality"],
      isIndian: true
    }
  ],

  "Uttarakhand": [
    {
      title: "Uttarakhand Char Dham Yatra",
      duration: "10N/11D",
      price: "₹65,000",
      emi: "EMI from ₹2,425/month",
      badge: "Pilgrimage",
      locations: "Badrinath • Kedarnath • Gangotri",
      dates: "25 Dates Available",
      image: "https://uttarakhandtourism.gov.in/assets/media/UTDB_media_1740661833CHAR-DHAM.jpg",
      code: "UK00001",
      days: 11,
      priceValue: 65000,
      locationTags: ["Badrinath", "Kedarnath", "Gangotri"],
      isIndian: true
    },
    {
      title: "Uttarakhand Hill Stations",
      duration: "6N/7D",
      price: "₹42,000",
      emi: "EMI from ₹1,567/month",
      badge: "Hill Station",
      locations: "Nainital • Mussoorie • Ranikhet",
      dates: "45 Dates Available",
      image: "https://static2.tripoto.com/media/filter/tst/img/OgData/1525775328_1522497324_14802312305_d17c9a9380_k_fotor.jpg",
      code: "UK00002",
      days: 7,
      priceValue: 42000,
      locationTags: ["Nainital", "Mussoorie", "Ranikhet"],
      isIndian: true
    },
    {
      title: "Uttarakhand Adventure Tour",
      duration: "7N/8D",
      price: "₹52,000",
      emi: "EMI from ₹1,940/month",
      badge: "Adventure",
      locations: "Rishikesh • Trekking • River Rafting",
      dates: "40 Dates Available",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp-kEJN4uJJyVV5U-64VDv0NQCkVCvZrVAig&s",
      code: "UK00003",
      days: 8,
      priceValue: 52000,
      locationTags: ["Rishikesh", "Trekking", "River Rafting"],
      isIndian: true
    },
    {
      title: "Uttarakhand Luxury Retreat",
      duration: "6N/7D",
      price: "₹68,000",
      emi: "EMI from ₹2,537/month",
      badge: "Luxury",
      locations: "Mountain Resorts • Spa • Private Tours",
      dates: "35 Dates Available",
      image: "https://media-cdn.tripadvisor.com/media/photo-s/1c/54/46/18/lemon-tree-premier-corbett.jpg",
      code: "UK00004",
      days: 7,
      priceValue: 68000,
      locationTags: ["Mountain Resorts", "Spa", "Private Tours"],
      isIndian: true
    },
    {
      title: "Uttarakhand Family Package",
      duration: "5N/6D",
      price: "₹38,000",
      emi: "EMI from ₹1,418/month",
      badge: "Family",
      locations: "Family Activities • Nature • Culture",
      dates: "48 Dates Available",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
      code: "UK00005",
      days: 6,
      priceValue: 38000,
      locationTags: ["Family Activities", "Nature", "Culture"],
      isIndian: true
    },
    {
      title: "Uttarakhand Budget Tour",
      duration: "4N/5D",
      price: "₹25,000",
      emi: "EMI from ₹933/month",
      badge: "Budget",
      locations: "Affordable Stays • Local Experiences",
      dates: "52 Dates Available",
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
      code: "UK00006",
      days: 5,
      priceValue: 25000,
      locationTags: ["Affordable Stays", "Local Experiences"],
      isIndian: true
    },
    {
      title: "Uttarakhand Wildlife Safari",
      duration: "5N/6D",
      price: "₹35,000",
      emi: "EMI from ₹1,306/month",
      badge: "Wildlife",
      locations: "Jim Corbett • Rajaji • Wildlife Sanctuaries",
      dates: "44 Dates Available",
      image: "https://images.unsplash.com/photo-1550358864-518f202c02ba?w=800&q=80",
      code: "UK00007",
      days: 6,
      priceValue: 35000,
      locationTags: ["Jim Corbett", "Rajaji", "Wildlife Sanctuaries"],
      isIndian: true
    },
    {
      title: "Uttarakhand Yoga Retreat",
      duration: "6N/7D",
      price: "₹45,000",
      emi: "EMI from ₹1,679/month",
      badge: "Yoga",
      locations: "Rishikesh • Meditation • Wellness",
      dates: "42 Dates Available",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
      code: "UK00008",
      days: 7,
      priceValue: 45000,
      locationTags: ["Rishikesh", "Meditation", "Wellness"],
      isIndian: true
    },
    {
      title: "Uttarakhand Complete Explorer",
      duration: "8N/9D",
      price: "₹58,000",
      emi: "EMI from ₹2,164/month",
      badge: "Explorer",
      locations: "All Regions • Mountains • Spirituality",
      dates: "38 Dates Available",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
      code: "UK00009",
      days: 9,
      priceValue: 58000,
      locationTags: ["All Regions", "Mountains", "Spirituality"],
      isIndian: true
    }
  ],

  "West Bengal": [
    {
      title: "West Bengal Cultural Tour",
      duration: "5N/6D",
      price: "₹38,000",
      emi: "EMI from ₹1,418/month",
      badge: "Cultural",
      locations: "Kolkata • Darjeeling • Sundarbans",
      dates: "45 Dates Available",
      image: "https://s7ap1.scene7.com/is/image/incredibleindia/2-jorasanko-thakurbari-kolkata-wb-city-hero?qlt=82&ts=1742153736772",
      code: "WB00001",
      days: 6,
      priceValue: 38000,
      locationTags: ["Kolkata", "Darjeeling", "Sundarbans"],
      isIndian: true
    },
    {
      title: "West Bengal Hill Stations",
      duration: "6N/7D",
      price: "₹45,000",
      emi: "EMI from ₹1,679/month",
      badge: "Hill Station",
      locations: "Darjeeling • Kalimpong • Kurseong",
      dates: "42 Dates Available",
      image: "https://media2.thrillophilia.com/images/photos/000/013/578/original/1584793613_shutterstock_1466472899.jpg?w=753&h=450&dpr=1.5  ",
      code: "WB00002",
      days: 7,
      priceValue: 45000,
      locationTags: ["Darjeeling", "Kalimpong", "Kurseong"],
      isIndian: true
    },
    {
      title: "West Bengal Wildlife Safari",
      duration: "4N/5D",
      price: "₹32,000",
      emi: "EMI from ₹1,194/month",
      badge: "Wildlife",
      locations: "Sundarbans • Jaldapara • Gorumara",
      dates: "48 Dates Available",
      image: "https://shiliguri.com/images/dest-big.png",
      code: "WB00003",
      days: 5,
      priceValue: 32000,
      locationTags: ["Sundarbans", "Jaldapara", "Gorumara"],
      isIndian: true
    },
    {
      title: "West Bengal Luxury Experience",
      duration: "5N/6D",
      price: "₹55,000",
      emi: "EMI from ₹2,052/month",
      badge: "Luxury",
      locations: "5-Star Hotels • Private Tours • Fine Dining",
      dates: "40 Dates Available",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/a2/4e/0e/hotel-facade.jpg?w=700&h=-1&s=1",
      code: "WB00004",
      days: 6,
      priceValue: 55000,
      locationTags: ["5-Star Hotels", "Private Tours", "Fine Dining"],
      isIndian: true
    },
    {
      title: "West Bengal Family Package",
      duration: "4N/5D",
      price: "₹35,000",
      emi: "EMI from ₹1,306/month",
      badge: "Family",
      locations: "Family Activities • Parks • Culture",
      dates: "50 Dates Available",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
      code: "WB00005",
      days: 5,
      priceValue: 35000,
      locationTags: ["Family Activities", "Parks", "Culture"],
      isIndian: true
    },
    {
      title: "West Bengal Budget Tour",
      duration: "3N/4D",
      price: "₹22,000",
      emi: "EMI from ₹821/month",
      badge: "Budget",
      locations: "Affordable Stays • Local Experiences",
      dates: "55 Dates Available",
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
      code: "WB00006",
      days: 4,
      priceValue: 22000,
      locationTags: ["Affordable Stays", "Local Experiences"],
      isIndian: true
    },
    {
      title: "West Bengal Beach Holiday",
      duration: "4N/5D",
      price: "₹28,000",
      emi: "EMI from ₹1,045/month",
      badge: "Beach",
      locations: "Digha • Mandarmani • Shankarpur",
      dates: "46 Dates Available",
      image: "https://hblimg.mmtcdn.com/content/hubble/img/destimg/mmt/destination/t_ufs/m_goa_main_tv_destination_img_1_l_759_1138.jpg",
      code: "WB00007",
      days: 5,
      priceValue: 28000,
      locationTags: ["Digha", "Mandarmani", "Shankarpur"],
      isIndian: true
    },
    {
      title: "West Bengal Cultural Heritage",
      duration: "5N/6D",
      price: "₹40,000",
      emi: "EMI from ₹1,492/month",
      badge: "Heritage",
      locations: "Kolkata Heritage • Terracotta Temples • Art",
      dates: "44 Dates Available",
      image: "https://caleidoscope.in/wp-content/uploads/2020/09/Culture-of-West-Bengal.jpg",
      code: "WB00008",
      days: 6,
      priceValue: 40000,
      locationTags: ["Kolkata Heritage", "Terracotta Temples", "Art"],
      isIndian: true
    },
    {
      title: "West Bengal Complete Explorer",
      duration: "7N/8D",
      price: "₹52,000",
      emi: "EMI from ₹1,940/month",
      badge: "Explorer",
      locations: "All Regions • Culture • Nature",
      dates: "42 Dates Available",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
      code: "WB00009",
      days: 8,
      priceValue: 52000,
      locationTags: ["All Regions", "Culture", "Nature"],
      isIndian: true
    }
  ]






  };

// Get state-specific hero images
const stateHeroImages = {
  "Andaman": "https://i.pinimg.com/1200x/67/10/27/671027210a396e38b27e5d0432bd18db.jpg",
  "Andhra Pradesh": "https://images.unsplash.com/photo-1587132135057-bc3c3dcfd4d9?w=1200&q=80",
  "Bihar": "https://images.unsplash.com/photo-1587132135056-bc3c3dcfd4d8?w=1200&q=80",
  "Chhattisgarh": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
  "Dadra & Nagar Haveli": "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80",
  "Daman & Diu": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
  "Delhi": "https://images.unsplash.com/photo-1587132135057-bc3c3dcfd4d9?w=1200&q=80",
  "Goa": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80",
  "Gujarat": "https://images.unsplash.com/photo-1587132135058-bc3c3dcfd4db?w=1200&q=80",
  "Haryana": "https://images.unsplash.com/photo-1587132135059-bc3c3dcfd4dc?w=1200&q=80",
  "Himachal Pradesh": "https://images.unsplash.com/photo-1587132135060-bc3c3dcfd4dd?w=1200&q=80",
  "Jammu & Kashmir": "https://images.unsplash.com/photo-1587132135061-bc3c3dcfd4de?w=1200&q=80",
  "Jharkhand": "https://images.unsplash.com/photo-1587132135062-bc3c3dcfd4df?w=1200&q=80",
  "Karnataka": "https://images.unsplash.com/photo-1587132135063-bc3c3dcfd4e0?w=1200&q=80",
  "Kerala": "https://images.unsplash.com/photo-1508197149814-0cc02e5d0c8e?w=1200&q=80",
  "Ladakh": "https://images.unsplash.com/photo-1587132135064-bc3c3dcfd4e1?w=1200&q=80",
  "Lakshadweep": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
  "Madhya Pradesh": "https://images.unsplash.com/photo-1587132135065-bc3c3dcfd4e2?w=1200&q=80",
  "Maharashtra": "https://images.unsplash.com/photo-1587132135066-bc3c3dcfd4e3?w=1200&q=80",
  "North East": "https://images.unsplash.com/photo-1587132135067-bc3c3dcfd4e4?w=1200&q=80",
  "Odisha": "https://images.unsplash.com/photo-1587132135068-bc3c3dcfd4e5?w=1200&q=80",
  "Puducherry": "https://images.unsplash.com/photo-1587132135069-bc3c3dcfd4e6?w=1200&q=80",
  "Punjab & Haryana": "https://images.unsplash.com/photo-1587132135070-bc3c3dcfd4e7?w=1200&q=80",
  "Rajasthan": "https://images.unsplash.com/photo-1587132135071-bc3c3dcfd4e8?w=1200&q=80",
  "Seven Sisters": "https://images.unsplash.com/photo-1587132135072-bc3c3dcfd4e9?w=1200&q=80",
  "Tamil Nadu": "https://images.unsplash.com/photo-1587132135073-bc3c3dcfd4ea?w=1200&q=80",
  "Uttar Pradesh": "https://images.unsplash.com/photo-1587132135074-bc3c3dcfd4eb?w=1200&q=80",
  "Uttarakhand": "https://images.unsplash.com/photo-1587132135075-bc3c3dcfd4ec?w=1200&q=80",
  "West Bengal": "https://images.unsplash.com/photo-1587132135076-bc3c3dcfd4ed?w=1200&q=80",
};

// Get state-specific descriptions
const stateDescriptions = {
  "Andaman": "Where Time Slows Down, Beauty Takes Over, and Blue Waters Meet Endless Adventures!",
  "Andhra Pradesh": "Discover the Spiritual Heartland and Coastal Beauty of Andhra Pradesh!",
  "Bihar": "Explore Ancient Heritage and Spiritual Enlightenment in the Land of Buddha!",
  "Chhattisgarh": "Discover Tribal Culture and Natural Wonders in the Heart of India!",
  "Dadra & Nagar Haveli": "Experience Tribal Heritage and Natural Beauty in this Union Territory!",
  "Daman & Diu": "Portuguese Heritage Meets Coastal Charm in this Beach Paradise!",
  "Delhi": "Where Ancient History Meets Modern Metropolis in India's Capital!",
  "Goa": "Sun, Sand, and Serenity - Experience the Ultimate Beach Paradise!",
  "Gujarat": "Land of Legends, Lions, and Vibrant Culture - Experience Gujarat's Diversity!",
  "Haryana": "Explore Ancient Heritage and Modern Development in this Progressive State!",
  "Himachal Pradesh": "Majestic Mountains, Serene Valleys, and Adventure in the Himalayas!",
  "Jammu & Kashmir": "Paradise on Earth - Where Snow-Capped Peaks Meet Beautiful Valleys!",
  "Jharkhand": "Discover Tribal Culture, Waterfalls, and Rich Mineral Wealth!",
  "Karnataka": "From Ancient Temples to Modern Tech - Experience Karnataka's Diversity!",
  "Kerala": "God's Own Country - Where Backwaters, Beaches, and Hills Create Magic!",
  "Ladakh": "Land of High Passes, Buddhist Monasteries, and Breathtaking Landscapes!",
  "Lakshadweep": "Coral Islands, Turquoise Waters, and Tropical Paradise in the Arabian Sea!",
  "Madhya Pradesh": "Heart of India - Wildlife, Heritage, and Cultural Richness!",
  "Maharashtra": "From Bustling Cities to Ancient Caves - Experience Maharashtra's Contrasts!",
  "North East": "Seven Sisters - Unexplored Beauty, Tribal Culture, and Natural Wonders!",
  "Odisha": "Temple Architecture, Tribal Culture, and Pristine Beaches Await!",
  "Puducherry": "French Colonial Charm Meets Indian Spirituality in this Coastal Gem!",
  "Punjab & Haryana": "Golden Temples, Rich Culture, and Agricultural Heartland of India!",
  "Rajasthan": "Land of Kings, Forts, Palaces, and Royal Heritage!",
  "Seven Sisters": "Northeast India's Hidden Gems - Unexplored Beauty and Tribal Culture!",
  "Tamil Nadu": "Ancient Temples, Rich Culture, and Scenic Beauty in South India!",
  "Uttar Pradesh": "Spiritual Heartland - Temples, History, and Cultural Heritage!",
  "Uttarakhand": "Devbhoomi - Land of Gods, Himalayan Peaks, and Spiritual Retreats!",
  "West Bengal": "Cultural Capital - From Himalayan Hills to Sundarbans Delta!",
};

useEffect(() => {
  if (state) {
    const decodedState = decodeURIComponent(state);
    setSelectedState(decodedState);
    // REMOVED: setSelectedIndianTours([decodedState]);
  }
}, [state]);

  // Get current state's tour data
  const getCurrentStateTours = () => {
    const stateData = allTourData[selectedState as keyof typeof allTourData];
    if (stateData) {
      return stateData;
    }
    // If state not found, return all tours from all states
    return Object.values(allTourData).flat();
  };

  // Apply filters whenever filter states change
  useEffect(() => {
    let result = [...getCurrentStateTours()];
    
    // Apply duration filter
    result = result.filter(tour => 
      tour.days >= durationRange[0] && tour.days <= durationRange[1]
    );
    
    // Apply price filter
    result = result.filter(tour => 
      tour.priceValue >= priceRange[0] && tour.priceValue <= priceRange[1]
    );
    
    // Apply departure month filter (if any selected)
    if (selectedDepartureMonths.length > 0) {
      // In a real app, this would filter by actual departure dates
      result = result.filter(() => true);
    }
    
if (selectedIndianTours.length > 0) {
  result = result.filter(tour => {
    if (!tour.isIndian) return false;
    
    // Check if the tour belongs to any of the selected states
    return selectedIndianTours.some(selectedState => {
      // Direct state match
      if (tour.state === selectedState) return true;
      
      // Or check if the tour data indicates it's from this state
      if (tour.title.toLowerCase().includes(selectedState.toLowerCase())) return true;
      if (tour.locations.toLowerCase().includes(selectedState.toLowerCase())) return true;
      
      return false;
    });
  });
}
    
    // Apply world tours filter
    if (selectedWorldTours.length > 0) {
      result = result.filter(tour => {
        if (tour.isIndian) return false;
        return selectedWorldTours.some(selectedLocation => 
          tour.locationTags.some(tag => 
            tag.toLowerCase().includes(selectedLocation.toLowerCase())
          )
        );
      });
    }
    
    // Apply sorting
    if (sortType === "price-low") {
      result.sort((a, b) => a.priceValue - b.priceValue);
    } else if (sortType === "price-high") {
      result.sort((a, b) => b.priceValue - a.priceValue);
    } else if (sortType === "duration") {
      result.sort((a, b) => a.days - b.days);
    }
    
    setFilteredTours(result);
  }, [
    durationRange, 
    priceRange, 
    selectedDepartureMonths, 
    selectedIndianTours, 
    selectedWorldTours, 
    sortType, 
    selectedState
  ]);

  // Initialize filtered tours
  useEffect(() => {
    setFilteredTours(getCurrentStateTours());
  }, [selectedState]);

  // Handle departure month selection
  const handleDepartureMonthChange = (month: string, checked: boolean) => {
    if (checked) {
      setSelectedDepartureMonths([...selectedDepartureMonths, month]);
    } else {
      setSelectedDepartureMonths(selectedDepartureMonths.filter(m => m !== month));
    }
  };

  // Handle Indian tour selection
  const handleIndianTourChange = (tour: string, checked: boolean) => {
    if (checked) {
      setSelectedIndianTours([...selectedIndianTours, tour]);
    } else {
      setSelectedIndianTours(selectedIndianTours.filter(t => t !== tour));
    }
  };

  // Handle world tour selection
  const handleWorldTourChange = (tour: string, checked: boolean) => {
    if (checked) {
      setSelectedWorldTours([...selectedWorldTours, tour]);
    } else {
      setSelectedWorldTours(selectedWorldTours.filter(t => t !== tour));
    }
  };

  // Clear all filters
  const clearAllFilters = () => {
    setDurationRange([0, 11]);
    setPriceRange([0, 153000]);
    setSelectedDepartureMonths([]);
    setSelectedIndianTours([]);
    setSelectedWorldTours([]);
    setSortType("recommended");
  };

  const currentTours = getCurrentStateTours();
  const heroImage = stateHeroImages[selectedState as keyof typeof stateHeroImages] || stateHeroImages.default;
  const heroDescription = stateDescriptions[selectedState as keyof typeof stateDescriptions] || stateDescriptions.default;

  return (
    <div className="min-h-screen bg-[#E53C42] bg-opacity-10">
      <Header />

      {/* Combined Hero and Filter Section */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Filters Sidebar */}
          <aside className="lg:w-80">
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl shadow-lg p-6 border border-blue-200 sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#2E4D98]">Indian Tours</h2>
                <button 
                  onClick={clearAllFilters}
                  className="text-sm text-[#E53C42] hover:underline"
                >
                  Clear All
                </button>
              </div>

              {/* Duration */}
              <div className="mb-8">
                <h3 className="font-semibold text-lg mb-4 text-[#2E4D98]">Duration</h3>
                <div className="flex justify-between text-sm text-gray-600 mb-3">
                  <span>{durationRange[0]} days</span>
                  <span>{durationRange[1]} days</span>
                </div>
                <Slider 
                  value={durationRange} 
                  onValueChange={setDurationRange}
                  max={15} 
                  step={1} 
                  className="w-full" 
                />
              </div>

              {/* Departure Date */}
              {/* <div className="mb-8">
                <h3 className="font-semibold text-lg mb-4 text-[#2E4D98]">Departure date</h3>
                <div className="space-y-3">
                  {['January-2026', 'February-2026', 'March-2026', 'April-2026', 'May-2026'].map((month) => (
                    <label key={month} className="flex items-center gap-3 cursor-pointer">
                      <Checkbox 
                        checked={selectedDepartureMonths.includes(month)}
                        onCheckedChange={(checked) => handleDepartureMonthChange(month, checked as boolean)}
                        className="data-[state=checked]:bg-[#2E4D98] data-[state=checked]:border-[#2E4D98]" 
                      />
                      <span className="text-gray-700">{month}</span>
                    </label>
                  ))}
                </div>
              </div> */}

              {/* Price */}
              <div className="mb-8">
                <h3 className="font-semibold text-lg mb-4 text-[#2E4D98]">Price</h3>
                <div className="flex justify-between text-sm text-gray-600 mb-3">
                  <span>₹{priceRange[0].toLocaleString()}</span>
                  <span>₹{priceRange[1].toLocaleString()}</span>
                </div>
                <Slider 
                  value={priceRange} 
                  onValueChange={setPriceRange}
                  min={10000} 
                  max={200000} 
                  step={1000} 
                />
              </div>

              {/* Indian Tours */}
              <div className="mb-8">
                <h3 className="font-semibold text-lg mb-4 text-[#2E4D98]">Indian Tours</h3>
                <div className={`${showMoreIndian ? "max-h-40 overflow-y-auto pr-1" : ""} space-y-3`}>
                  {[
                    'Andaman', 'Goa', 'Kerala', 'Himachal', 'Rajasthan', 'Kashmir',
                    ...(showMoreIndian
              
                      ? [
                        'Andhra pradesh',
          'Bihar',
          'Chhattisgarh',
          'Dadra & Nagar Haveli',
          'Daman & Diu',
          'Delhi',
          'Gujarat',
          'Haryana',
          'Jharkhand',
          'Karnataka',
          'Ladakh',
          'Lakshadweep',
          'Madhya Pradesh',
          'Maharashtra',
          'North East',
          'Odisha',
          'Puducherry',
          'Punjab & Haryana',
          'Seven Sisters',
          'Tamil Nadu',
          'Uttar Pradesh',
          'Uttarakhand',
          'West Bengal']
                      : [])
                  ].map((place) => (
                    <label key={place} className="flex items-center gap-3 cursor-pointer">
                      <Checkbox 
                        checked={selectedIndianTours.includes(place)}
                        onCheckedChange={(checked) => handleIndianTourChange(place, checked as boolean)}
                        className="data-[state=checked]:bg-[#2E4D98] data-[state=checked]:border-[#2E4D98]" 
                      />
                      <span className="text-gray-700">{place}</span>
                    </label>
                  ))}
                </div>
                <button
                  onClick={() => setShowMoreIndian(!showMoreIndian)}
                  className="mt-3 text-[#2E4D98] text-sm font-semibold hover:underline"
                >
                  {showMoreIndian ? "Show Less" : "Show More"}
                </button>
              </div>

              {/* World Tours */}
              <div>
                <h3 className="font-semibold text-lg mb-4 text-[#2E4D98]">World Tours</h3>
                <div className={`${showMoreWorld ? "max-h-40 overflow-y-auto pr-1" : ""} space-y-3`}>
                  {[
                    'Dubai', 'Europe', 'Maldives', 'Mauritius', 'Thailand', 'Bali',
                    ...(showMoreWorld
                      ? ['Singapore', 'Vietnam', 'Turkey', 'Japan', 'South Korea', 'Australia']
                      : [])
                  ].map((place) => (
                    <label key={place} className="flex items-center gap-3 cursor-pointer">
                      <Checkbox 
                        checked={selectedWorldTours.includes(place)}
                        onCheckedChange={(checked) => handleWorldTourChange(place, checked as boolean)}
                        className="data-[state=checked]:bg-[#2E4D98] data-[state=checked]:border-[#2E4D98]" 
                      />
                      <span className="text-gray-700">{place}</span>
                    </label>
                  ))}
                </div>
                <button
                  onClick={() => setShowMoreWorld(!showMoreWorld)}
                  className="mt-3 text-[#2E4D98] text-sm font-semibold hover:underline"
                >
                  {showMoreWorld ? "Show Less" : "Show More"}
                </button>
              </div>
            </div>
          </aside>

          {/* Hero and Main Content Area */}
          <main className="flex-1">
            {/* Hero Section */}
            <div className="relative rounded-2xl overflow-hidden mb-6">
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ 
                  backgroundImage: `url('${heroImage}')` 
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/10"></div>
              </div>
              
              {/* Hero Content */}
              <div className="relative p-8 min-h-[200px] flex items-center">
                <div className="text-white">
                  <h1 className="text-3xl font-bold mb-2">{selectedState} Tour Packages</h1>
                  <p className="text-base opacity-90 max-w-2xl">
                    {heroDescription}
                  </p>
                  <p className="text-sm opacity-80 mt-2">
                    Showing {filteredTours.length} tour packages for {selectedState}
                  </p>
                </div>
              </div>
            </div>

            {/* Main Content Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">{selectedState} Holiday Packages</h2>
                <p className="text-gray-600 mt-1">Showing {filteredTours.length} of {currentTours.length} tours • Best prices guaranteed</p>
              </div>

              <div className="flex items-center gap-4">
                <Tabs defaultValue="grid">
                  <TabsList className="grid grid-cols-2">
                    <TabsTrigger value="grid">Grid</TabsTrigger>
                    <TabsTrigger value="list">List</TabsTrigger>
                  </TabsList>
                </Tabs>

                <Select value={sortType} onValueChange={setSortType}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recommended">Recommended</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="duration">Duration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* 3 Cards Per Row */}
            {filteredTours.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-600">No tours found for the selected filters</h3>
                <p className="text-gray-500 mt-2">Try adjusting your filters or clear all filters to see more options</p>
                <Button 
                  onClick={clearAllFilters}
                  className="mt-4 bg-[#2E4D98] hover:bg-[#2E4D98] hover:opacity-90 text-white"
                >
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTours.map((tour, index) => (
                  <div key={index} className="flex flex-col">
                    {/* Separate Top Block - Excel-like box design */}
                    <div className="bg-white border-2 border-gray-300 rounded-lg p-3 mb-3 shadow-sm">
                      <div className="grid grid-cols-3 gap-0 border border-gray-400 rounded overflow-hidden">
                        {/* Box 1 - Code Label */}
                        <div className="bg-gray-100 border-r border-gray-400 p-2">
                          <div className="text-xs font-semibold text-gray-700 text-center">CODE</div>
                        </div>
                        
                        {/* Box 2 - Code Value */}
                        <div className="bg-white border-r border-gray-400 p-2">
                          <div className="text-sm font-bold text-gray-900 text-center">{tour.code}</div>
                        </div>
                        
                        {/* Box 3 - Duration */}
                        <div className="bg-gray-50 p-2">
                          <div className="text-sm font-bold text-gray-900 text-center">{tour.duration}</div>
                        </div>
                      </div>
                    </div>

                    {/* Separate Card with Light Blue Background */}
                    <div className="group bg-blue-50 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border border-blue-100 flex flex-col flex-1">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={tour.image}
                          alt={tour.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        
                        <Badge className="absolute top-4 left-4 bg-white text-[#2E4D98] font-bold">
                          {tour.badge}
                        </Badge>
                      </div>

                      <div className="p-5 flex-1 flex flex-col">
                        <h3 className="font-bold text-lg text-gray-800 line-clamp-2 mb-3">
                          {tour.title}
                        </h3>
                        
                        {/* Price Details - Outside Image */}
                        <div className="mb-3">
                          <p className="text-2xl font-bold text-gray-900">{tour.price}</p>
                          <p className="text-sm text-gray-600">{tour.emi}</p>
                        </div>

                        <p className="text-sm text-gray-600 mb-3 flex-1">{tour.locations}</p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <span>{tour.dates}</span>
                          <span className="text-green-600 font-semibold">Available</span>
                        </div>

                        {/* Buttons - Updated with navigation */}
                        <div className="flex gap-2 mt-auto">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1 border-[#2E4D98] text-[#2E4D98] hover:bg-[#2E4D98] hover:text-white"
                            onClick={() => navigate(`/tour/${tour.code}`)}
                          >
                            View Tour
                          </Button>
                          <Button size="sm" className="flex-1 bg-[#E53C42] hover:bg-[#E53C42] hover:opacity-90 text-white">
                            Book Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Load More */}
            {filteredTours.length > 0 && (
              <div className="text-center mt-8">
                <Button size="lg" className="bg-[#2E4D98] hover:bg-[#2E4D98] hover:opacity-90 px-12 text-white">
                  Load More Tours
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default TourPackages;