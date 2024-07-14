import React from "react";
import HeroImage from "../../assets/images/heroImage.png";
import Iphone15Pro from "../../assets/images/iPhone15Pro.png";
import Button from "../atoms/buttons/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../molecules/Navbar";
import { useNavigate } from "react-router-dom";

import Footer from "../molecules/Footer";

const starterpacks = [
  {
    icon: <FontAwesomeIcon icon={faUserPlus} />,
    title: "Create your account",
    subtitle:
      "Simply input your email or connect your social media handle to create your account and start your exciting journey with us.",
  },
  {
    icon: <FontAwesomeIcon icon={faPen} />,
    title: "Personalize your profile page",
    subtitle:
      "Craft your online identity with a personal touch and let your profile page shine, reflecting the true essence of who you are in a digital world",
  },
];

const appFeatures = [
  {
    image: Iphone15Pro,
    title: "Simplicity",
    subtitle: "Easy Donation Setup",
    text: "Simplify the act of giving back with our effortless donation setup. Experience the ease of making a difference as we streamline the process, ensuring your charitable contributions have a meaningful impact without the hassle.",
  },
];

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center bg-primary-50 min-h-screen">
      {/* Navbar */}
      <Navbar />
      {/* Hero section */}
      <div className="my-10 text-center w-full lg:w-4/6 px-4 flex flex-col items-center justify-center">
        <h3 className="text-center mb-6 lg:text-7xl text-4xl lg:leading-[130px] leading-[60px] font-adhiguno">
          <span className=" text-primaryColor">Earn</span> by Building{" "}
          <span className=" text-primaryColor">Connections</span> with Your
          Community.
        </h3>
        <p className="text-gray-500 text-base lg:w-5/6 lg:mb-8 mb-6">
          Discover the power of meaningful connections as you earn while
          nurturing your community bonds. Embrace a rewarding journey where your
          social interactions translate into financial opportunities, bringing
          value to your relationships and your wallet alike.
        </p>
        <div className="w-fit">
          <Button onClick={() => navigate("/dashboard")} className="text-white">
            Get Started
          </Button>
        </div>
      </div>
      <div className="lg:my-20 flex flex-col items-center justify-center">
        <img src={HeroImage} alt="" />
      </div>
      <div className="flex flex-col justify-center items-center w-full bg-white py-10 lg:py-14 px-4 lg:px-32">
        <h3 className="font-adhiguno text-3xl lg:text-6xl text-center mb-4 lg:mb-6">
          What you need to get Started
        </h3>
        <p className=" text-gray-500 lg:text-base text-sm lg:w-4/6 lg:mb-8 mb-4 text-center">
          Ready to dive in? We&apos;ve got your back! Here&apos;s your friendly
          guide to kickstart your journey, ensuring you have all you need to get
          started and shine.
        </p>

        <div className="grid grid-flow-row grid-cols-2 gap-6">
          {starterpacks.map((item, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg p-4 col-span-2 lg:col-span-1"
            >
              <span className="bg-[#FFF8F1] text-primary-400 p-2 rounded-lg flex justify-center items-center w-12 h-12">
                {item.icon}
              </span>
              <h3 className="text-xl font-semibold my-2">{item.title}</h3>
              <p className="text-sm lg:text-base text-gray-500 w-11/12">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Features */}
      <div className="lg:mx-16 mx-4 lg:mb-16">
        {appFeatures.map((item, index) => (
          <div
            key={index}
            className="grid grid-flow-row grid-cols-2 gap-6 items-center my-10 lg:my-20"
          >
            <div
              className={`lg:p-4 lg:col-span-1 col-span-2 ${index % 2 === 0 ? "lg:order-first" : "lg:order-last lg:ps-16"}`}
            >
              <h3 className="text-primary-400 text-base font-bold">
                {item.title}
              </h3>
              <h3 className="text-3xl lg:text-6xl font-medium lg:my-6 my-4 font-adhiguno text-gray-900">
                {item.subtitle}
              </h3>
              <p className="text-base lg:text-lg text-gray-500 w-11/12">
                {item.text}
              </p>
            </div>

            <div className="rounded-lg flex justify-center items-end bg-gray-100 col-span-2 lg:col-span-1 w-full">
              <img
                src={item.image}
                alt={item.title}
                className="lg:mt-20 mt-8 transition-transform duration-1000 transform hover:scale-110 origin-bottom w-40 lg:w-80"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
