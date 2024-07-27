import React, { useEffect } from "react";
import Agrogate from "../../assets/images/agrogate.png";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProfile } from "../../store/features/user/profileSlice";
import Button from "../atoms/buttons/button";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const user: any = useAppSelector((state) => state.auth.user);
  const profile: any = useAppSelector((state) => state.profile.profile);

  useEffect(() => {
    if (user) {
      dispatch(fetchProfile());
    }
  }, []);
  if (!user) {
    return (
      <div className="bg-white drop-shadow-sm border-primary-100 w-full flex justify-between items-center py-5 lg:py-8 border-b">
        <div className="mx-auto w-[90%] flex-row flex items-center justify-between">
          <Link to={user ? "/diagnosis" : "/"} className="flex items-center">
            <img src={Agrogate} className="lg:mr-4 mr-2 h-16" alt="Gift" />
            <h3 className="text-primary-700 lg:text-2xl text-xl font-bold">
              AgroGate
            </h3>
          </Link>

          <div className="flex items-center">
            <Link to="/signin" className="mr-4">
              <Button className="bg-white border border-gray-200 text-primary-600 hover:text-white hover:bg-primary-400">
                Login
              </Button>
            </Link>
            <Link className="hidden lg:block" to="/signup">
              <Button className=" text-white">Sign Up</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white drop-shadow-sm border-primary-100 w-full flex justify-between items-center py-5 lg:py-8 border-b">
      <div className="mx-auto w-[90%] flex items-center justify-between">
        <Link to={user ? "/diagnosis" : "/"} className="flex items-center">
          <img src={Agrogate} className="lg:mr-4 mr-2 h-16" alt="Gift" />
          <h3 className="text-primary-700 lg:text-2xl text-xl font-bold">
            AgroGate
          </h3>
        </Link>

        <Tooltip title="Profile" className="lg:flex">
          <button
            onClick={() => navigate("/profile")}
            className="border rounded-2xl px-1.5 py-2 flex justify-between items-center col-span-3 hover:bg-gray-100 hover:shadow-inner"
          >
            <h3 className="text-base text-gray-800 font-medium mr-3">
              {profile?.name}
            </h3>

            {profile?.profile_image ? (
              <img
                src={profile?.profile_image}
                alt=""
                className="h-6 w-6 rounded-lg"
              />
            ) : (
              <FontAwesomeIcon className="text-2xl" icon={faCircleUser} />
            )}
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default Navbar;
