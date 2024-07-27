import React from "react";
import homeBg from "../../assets/images/homeBg.avif";
import Button from "../atoms/buttons/button";
import Navbar from "../molecules/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../molecules/Footer";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center bg-primary-50 min-h-screen">
      {/* Navbar */}
      <Navbar />
      {/* Hero section */}
      <div className="grid grid-cols-5 lg:grid-flow-row grid-flow-col min-h-[80vh]">
        <div className="my-10 text-center w-full  px-4 flex flex-col items-center justify-center col-span-5 lg:col-span-3 order-2 lg:order-1">
          <h3 className="text-center mb-6 lg:text-5xl text-4xl lg:leading-[70px] leading-[60px] font-BurgerFree text-primary-500">
            Empower Your Farm with AI: Discover the Future of Agriculture
          </h3>
          <p className="text-gray-500 text-base lg:w-5/6 lg:mb-8 mb-6">
            Welcome to Agrogate, your AI-powered partner for modern farming.
            Boost productivity, enhance crop health, and optimize operations
            with tools for disease identification, pest control, weather
            forecasting, and market insights. Join our community and
            revolutionize agriculture for a sustainable, profitable future.
          </p>
          <div className="w-fit">
            <Button
              onClick={() => navigate("/diagnosis")}
              className="text-white"
            >
              Get Started
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center col-span-5 lg:col-span-2 order-1 lg:order-2">
          <img
            src={homeBg}
            className="w-96 h-96 lg:h-full lg:w-full flex"
            alt=""
          />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
