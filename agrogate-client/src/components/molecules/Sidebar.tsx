"use client";

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/features/auth/authSlice";
import { LogOutIcon } from "../atoms/Icons/Icons";
import { removeProfile } from "../../store/features/user/profileSlice";
import Button from "../atoms/buttons/button";

import ModalComponent from "./Modals/Modal";
import {
  faCloudSun,
  faGlobe,
  faHeartPulse,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const navLinks = [
  { icon: faHeartPulse, label: "Diagnosis", href: "/diagnosis" },
  { icon: faCloudSun, label: "Weather & Soil", href: "/weathersoil" },
  { icon: faGlobe, label: "Market & Community", href: "/marketcommunity" },
  { icon: faUser, label: "Profile", href: "/profile" },
];

const Sidebar: React.FC = () => {
  const location = useLocation().pathname;

  const dispatch = useAppDispatch();

  const handleSignOut = async () => {
    dispatch(logout());
    dispatch(removeProfile({ user: undefined }));
  };

  const [logoutState, setLogoutState] = useState(false);

  return (
    <>
      <div className="w-full bg-[#fff] h-fit p-6 pt-20 pl-20">
        <div className="flex flex-col w-full h-full justify-between">
          {navLinks.map((link, index) => (
            <Link to={link.href} key={index} className="my-3">
              <h3
                className={`px-6 py-3 rounded-lg ${
                  location === link.href
                    ? "text-primary-450 bg-[#f1fff6] border border-primary-250"
                    : "text-gray-500"
                } flex items-center font-medium hover:bg-[#f1fff6] hover:text-primary-450 text-base`}
              >
                <span className="mr-3">
                  <FontAwesomeIcon icon={link.icon} className="h-6" />
                </span>
                {link.label}
              </h3>
            </Link>
          ))}

          {/* Logout Modal */}
          <ModalComponent
            open={logoutState}
            onclose={() => setLogoutState(false)}
            title="Confirm"
          >
            <p className="text-base text-gray-600 mb-6">
              Are you sure you want to logout of your account?
            </p>
            <div className="grid grid-flow-col grid-cols-2 gap-4">
              <Button
                onClick={() => setLogoutState(false)}
                className="bg-transparent border border-gray-400 text-gray-900"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSignOut}
                className="bg-primary-700 text-white"
              >
                Log out
              </Button>
            </div>
          </ModalComponent>

          <button
            onClick={() => setLogoutState(true)}
            className="flex items-center font-bold text-primary-450 hover:text-primaryColor px-5 py-2 mt-20"
          >
            <span className="mr-3">{LogOutIcon}</span>
            Log Out
          </button>
        </div>
      </div>
    </>
  );
};

export const Footerbar: React.FC = () => {
  const location = useLocation().pathname;

  const dispatch = useAppDispatch();

  const handleSignOut = async () => {
    dispatch(logout());
    dispatch(removeProfile({ user: undefined }));
  };

  const [logoutState, setLogoutState] = useState(false);

  return (
    <div className="flex justify-between z-50 flex-row items-center px-6 pt-1 pb-8 lg:hidden w-full bg-white fixed bottom-0 rounded-t-xl">
      {navLinks.map((link, index) => (
        <Link to={link.href} key={index} className="my-3">
          <h3
            className={`p-2 rounded-lg ${
              location === link.href
                ? "text-primaryColor bg-[#FFF8F1] bg-opacity-10"
                : "text-primary-450"
            } flex items-center font-bold text-base flex-col`}
          >
            <FontAwesomeIcon icon={link.icon} />
            <span className="text-xs mt-1">{link.label}</span>
          </h3>
        </Link>
      ))}
      {/* Logout Modal */}
      <ModalComponent
        open={logoutState}
        onclose={() => setLogoutState(false)}
        title="Confirm"
      >
        <p className="text-base text-gray-600 mb-6">
          Are you sure you want to logout of your account?
        </p>
        <div className="grid grid-flow-col grid-cols-2 gap-4">
          <Button
            onClick={() => setLogoutState(false)}
            className="bg-transparent border border-gray-400 text-gray-900"
          >
            Cancel
          </Button>
          <Button onClick={handleSignOut} className="bg-red-600 text-white">
            Log out
          </Button>
        </div>
      </ModalComponent>
    </div>
  );
};

export default Sidebar;
