import React from "react";
import Agrogate from "../../assets/images/agrogate.png";
import { faDiscord, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

const Footer: React.FC = () => {
  const user: any = useAppSelector((state) => state.auth.user);
  const socialLinks = [
    {
      icon: faDiscord,
      link: "",
    },
    {
      icon: faXTwitter,
      link: "",
    },
  ];
  return (
    <div className=" bg-[#fff] w-full py-8 lg:px-16 px-4 lg:py-8 flex flex-col items-center justify-center">
      <div className="flex lg:items-center items-start justify-between lg:flex-row flex-col w-full border-b border-[#E5E6EB] mb-4 pb-4 lg:mb-8 lg:pb-8">
        <Link
          to={user ? "/diagnosis" : "/"}
          className="flex items-center mb-6 lg:mb-0"
        >
          <img
            src={Agrogate}
            className="lg:mr-4 mr-2 lg:h-28 lg:w-28 h-16 w-16"
            alt="Gift"
          />
          <h3 className=" text-primary-800 lg:text-2xl text-xl font-bold">
            AgroGate
          </h3>
        </Link>

        <div className="flex items-center mb-6 lg:mb-0">
          <Link
            to="/about"
            className="mr-4 font-semibold hover:text-primaryColor text-primary-300 hover:text-primary-500"
          >
            About
          </Link>

          <Link
            to="/contact"
            className="mr-4 font-semibold hover:text-primaryColor text-primary-300 hover:text-primary-500"
          >
            Contact
          </Link>
        </div>
        <div className="grid items-center justify-center grid-flow-col gap-4">
          {socialLinks.map((item, index) => (
            <Link
              to={item.link}
              key={index}
              className="text-primary-300 hover:text-primary-500"
            >
              <FontAwesomeIcon icon={item.icon} className="h-6 w-6" />
            </Link>
          ))}
        </div>
      </div>
      <p className="text-primary-300 text-base text-center">
        © 2024 AgroGate. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
