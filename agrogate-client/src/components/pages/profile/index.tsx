import React from "react";
import HomeTemplate from "../../templates/HomeTemplate";
import ProfileDetails from "../../organisms/Profile/ProfileDetails";
import { CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchProfile } from "../../../store/features/user/profileSlice";

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const profile: any = useAppSelector((state) => state.profile.profile);
  if (!profile) {
    dispatch(fetchProfile());
    return (
      <HomeTemplate>
        <div className="h-[80vh] text-primaryColor flex justify-center items-center bg-[#fff] p-6 rounded-lg mb-6 w-full">
          <CircularProgress color="inherit" size={60} thickness={5} />
        </div>
      </HomeTemplate>
    );
  }
  return (
    <HomeTemplate>
      <ProfileDetails />
    </HomeTemplate>
  );
};

export default Profile;
