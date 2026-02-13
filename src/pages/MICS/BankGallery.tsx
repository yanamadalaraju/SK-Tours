import React from "react";
import Sidebar from "./Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


const BankGallery: React.FC = () => {
  return (
    <>
      <div className="min-h-screen bg-opacity-10">
        <Header />

        <div className="main-layout flex w-full gap-10 p-5">
    <div className="main-layout flex w-full gap-10 p-5">
      {/* Sidebar */}
      <div className="w-64">
        <Sidebar />
      </div>

      <div className="w-[90%] mx-auto my-[30px] p-[30px] bg-gradient-to-br from-[#e6d29b] to-[#d8b56f] ">
        
        <div className="grid grid-cols-3 gap-[25px]">
          
          {/* Item */}
          <div className="bg-white border border-[#b7b7b7] h-[150px] flex justify-center items-center shadow-md">
            <img
              src="https://i.pinimg.com/1200x/a1/4e/3f/a14e3fb21b8be6b320f7aa5699086fa2.jpg"
              alt="HDFC Bank"
              className="max-w-full max-h-[80%] object-contain"
            />
          </div>

          <div className="bg-white border border-[#b7b7b7] h-[150px] flex justify-center items-center shadow-md">
            <img
              src="https://i.pinimg.com/1200x/93/8d/b5/938db584968c5c1cb812865f9502d692.jpg"
              alt="HSBC Bank"
              className="max-w-full max-h-[80%] object-contain"
            />
          </div>

          <div className="bg-white border border-[#b7b7b7] h-[150px] flex justify-center items-center shadow-md">
            <img
              src="https://i.pinimg.com/1200x/04/06/3d/04063d10ef4070cae6cef6bf55bded36.jpg"
              alt="Bank of Baroda"
              className="max-w-full max-h-[80%] object-contain"
            />
          </div>

          <div className="bg-white border border-[#b7b7b7] h-[150px] flex justify-center items-center shadow-md">
            <img
              src="https://i.pinimg.com/1200x/88/c5/09/88c509c28b9e8803a4e9e074629ceea4.jpg"
              alt="SBI Bank"
              className="max-w-full max-h-[80%] object-contain"
            />
          </div>

          <div className="bg-white border border-[#b7b7b7] h-[150px]  flex justify-center items-center shadow-md">
            <img
              src="https://i.pinimg.com/736x/cf/20/af/cf20af5eb4d6fbc7f27f89d734b8fa23.jpg"
              alt="Union Bank"
              className="max-w-full max-h-[80%] object-contain"
            />
          </div>

          <div className="bg-white border border-[#b7b7b7] h-[150px]  flex justify-center items-center shadow-md">
            <img
              src="https://i.pinimg.com/736x/76/aa/bd/76aabd7ec028d2927d5af281e82d9394.jpg"
              alt="Axis Bank"
              className="max-w-full max-h-[80%] object-contain"
            />
          </div>

          <div className="bg-white border border-[#b7b7b7] h-[150px] flex justify-center items-center shadow-md">
            <img
              src="https://i.pinimg.com/1200x/7a/89/50/7a8950fbfcd85ee29aa5262b10151135.jpg"
              alt="ICICI Bank"
              className="max-w-full max-h-[80%] object-contain"
            />
          </div>

          <div className="bg-white border border-[#b7b7b7] h-[150px]  flex justify-center items-center shadow-md">
            <img
              src="https://i.pinimg.com/1200x/a2/dc/c7/a2dcc7d79382132cd2dc7b33710c36dc.jpg"
              alt="INB Bank"
              className="max-w-full max-h-[80%] object-contain"
            />
          </div>

          <div className="bg-white border border-[#b7b7b7] h-[150px] flex justify-center items-center shadow-md">
            <img
              src="https://i.pinimg.com/736x/72/72/7e/72727e06b5b565de44f365f93d7b063a.jpg"
              alt="Andhra Bank"
              className="max-w-full max-h-[80%] object-contain"
            />
          </div>

        </div>
      </div>
    </div>
</div>
</div>
<Footer />
</>

  );
};

export default BankGallery;
