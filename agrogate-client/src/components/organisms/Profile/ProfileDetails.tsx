import { faCloudArrowUp, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import Button from "../../atoms/buttons/button";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import Input from "../../atoms/inputs/input";
import { globalAxios } from "../../../api/globalAxios";
import { fetchProfile } from "../../../store/features/user/profileSlice";
import toast from "react-hot-toast";
import ConfirmModal from "../../molecules/Modals/ConfirmModal";
import CoverPhoto from "../../../assets/images/farmBg.jpg";
import apiService from "../../../api/apiService";
import PostCard from "../../molecules/Cards/postCard";

interface ProfileDataProps {
  name: string;
  username: string;
  bio: string;
  country: string;
  profile_image: any;
  cover_image: any;
}

const ProfileDetails: React.FC = () => {
  const profile: any = useAppSelector((state) => state.profile.profile);
  const dispatch = useAppDispatch();

  const imageInputRef = useRef<HTMLInputElement>(null);
  const cover_imageInputRef = useRef<HTMLInputElement>(null);

  const [profileData, setProfileData] = useState<ProfileDataProps>({
    name: "",
    username: "",
    bio: "",
    country: "",
    profile_image: "",
    cover_image: "",
  });
  const maxBioLength = 250;
  const [isLoading, setIsLoading] = useState<boolean>();
  const [disableInput, setDisableInput] = useState<boolean>(false);
  const [updateModalState, setUpdateModalState] = useState<boolean>(false);

  const setprofileData = () => {
    setProfileData((prevProfileData) => ({
      ...prevProfileData,
      name: profile?.name || "",
      username: profile?.username || "",
      bio: profile?.bio || "",
      country: profile?.country || "",
      profile_image: profile?.profile_image || "",
      cover_image: profile?.cover_image || "",
    }));
  };

  useEffect(() => {
    setprofileData();
    fetchPosts();
  }, [profile]);

  const handleUpdateProfile = async () => {
    setIsLoading(true);
    setDisableInput(true);
    setUpdateModalState(false);
    try {
      const { profile_image, cover_image, name, username, bio } = profileData;
      const profile_imageBlob = await fetch(profile_image).then((res) =>
        res.blob()
      );
      const cover_imageBlob = await fetch(cover_image).then((res) =>
        res.blob()
      );
      const formData = new FormData();
      formData.append("name", name);
      formData.append("userName", username);
      formData.append("bio", bio);
      formData.append("image", profile_imageBlob);
      formData.append("coverPhoto", cover_imageBlob);

      const response: any = await globalAxios.patch(
        "/api/v1/profile",
        formData,
        {
          headers: {
            ...globalAxios.defaults.headers.common,
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      );
      if (response?.code || response?.data?.data) {
        toast.success("Congratulations! 🎉 Your profile setup is successful.");
        setIsLoading(false);
        setDisableInput(false);
        dispatch(fetchProfile());
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      console.error("Error ", error);
      setIsLoading(false);
      setDisableInput(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfileImage = async () => {
    try {
      const formData = new FormData();
      formData.append("profile_image", profileData?.profile_image);
      const response: any = await globalAxios.patch(
        "/api/v1/profile",
        formData,
        {
          headers: {
            ...globalAxios.defaults.headers.common,
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      );
      if (response?.data?.data) {
        console.log("Successful! 🎉 ");
        dispatch(fetchProfile());
      }
    } catch (error: any) {
      console.error("Error ", error);
      setprofileData();
    }
  };

  const handleUpdateCoverImage = async () => {
    try {
      const formData = new FormData();
      formData.append("cover_image", profileData?.cover_image);
      const response: any = await globalAxios.patch(
        "/api/v1/profile",
        formData,
        {
          headers: {
            ...globalAxios.defaults.headers.common,
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      );
      if (response?.data?.data) {
        console.log("Successful! 🎉 ");
        dispatch(fetchProfile());
      }
    } catch (error: any) {
      console.error("Error ", error);
      setprofileData();
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLInputElement
    >
  ) => {
    const { name, value, type } = event.target;
    if (type === "file") {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfileData({ ...profileData, [name]: reader.result });
        };
        reader.readAsDataURL(file);
      }
    } else {
      setProfileData({ ...profileData, [name]: value });
    }
  };

  const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    try {
      const response: any = await apiService("/api/v1/posts/me", "GET");
      if (response.data) {
        const data = response.data;
        setPosts(data.data);
      }
    } catch (error: any) {
      console.log("error message", error);
    }
  };

  const handleProfileInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, type } = e.target;

    if (type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0];

      setProfileData({ ...profileData, [name]: file });
    }

    if (profileData.cover_image || profileData.profile_image) {
      profileData.profile_image && handleUpdateProfileImage();
      profileData.cover_image && handleUpdateCoverImage();
    }
  };

  const userPost = (
    <div className="flex flex-col">
      {posts.map((item: any, index) => (
        <PostCard key={index} data={item} />
      ))}
    </div>
  );

  return (
    <div className="bg-[#fff] lg:p-6 p-4 rounded-lg lg:mb-6 mb-4 w-full">
      <div className="flex justify-between items-start mb-4">
        <h2 className="lg:text-xl text-lg lg:mb-6 mb-4 font-semibold text-gray-900">
          Profile
        </h2>
      </div>
      {/* Profile Pictures */}
      <div className="rounded-lg bg-slate-500 lg:h-52 h-28 relative lg:mb-20 mb-14">
        <img
          src={profileData?.cover_image ? profileData?.cover_image : CoverPhoto}
          alt=""
          onClick={() => cover_imageInputRef?.current?.click()}
          className="h-full w-full rounded-lg cursor-pointer"
        />
        <input
          type="file"
          className="hidden"
          name="cover_image"
          ref={cover_imageInputRef}
          disabled={disableInput}
          onChange={handleProfileInputChange}
        />
        <div className="lg:w-56 lg:h-56 h-20 w-20 rounded-2xl bg-white flex justify-center items-center absolute lg:-bottom-1/4 -bottom-1/3 left-1/2 md:left-20 transform -translate-x-1/2 md:-translate-x-0">
          {profileData?.profile_image ? (
            <div className="relative w-[95%] h-[95%]">
              <img
                src={profileData?.profile_image}
                alt=""
                className="rounded-2xl w-full h-full"
              />
              <button
                className="w-full cursor-pointer bottom-0 absolute py-1 bg-slate-50 bg-opacity-15 hover:bg-opacity-25 backdrop-blur-sm rounded-b-lg"
                onClick={() => imageInputRef?.current?.click()}
              >
                <FontAwesomeIcon
                  className="text-2xl text-gray-300"
                  icon={faCloudArrowUp}
                />
              </button>
            </div>
          ) : (
            <div className="relative w-[90%] h-[90%]">
              <FontAwesomeIcon
                className="w-full h-full text-primary-450 block"
                icon={faUser}
              />
              <button
                className="w-full cursor-pointer bottom-0 absolute py-1 bg-slate-50 bg-opacity-15 hover:bg-opacity-25 backdrop-blur-sm rounded-b-lg"
                onClick={() => imageInputRef?.current?.click()}
              >
                <FontAwesomeIcon
                  className="text-2xl text-gray-300"
                  icon={faCloudArrowUp}
                />
              </button>
            </div>
          )}
          <input
            type="file"
            className="hidden"
            name="profile_image"
            ref={imageInputRef}
            disabled={disableInput}
            onChange={handleProfileInputChange}
          />
        </div>
      </div>
      {/* Profile Forms */}
      <div className="grid grid-flow-row grid-cols-5 gap-4">
        <div className="col-span-5 md:col-span-3 w-full overflow-y-auto no-scrollbar max-h-[85vh] order-2 md:order-1">
          <h2 className="font-semibold text-xl mb-6">Posts</h2> {userPost}
        </div>
        <div className="col-span-5 md:col-span-2">
          {/* Personal Data */}

          <div className="lg:mb-4 mb-2">
            <Input
              label="Name"
              name="name"
              id="name"
              type="text"
              value={profileData?.name}
              onChange={handleInputChange}
              placeholder={profileData?.name}
              disabled={disableInput}
            />
          </div>
          <div className="lg:mb-4 mb-2">
            <Input
              type="text"
              label="Username"
              name="username"
              value={profileData?.username.trim()}
              maxLength={16}
              onChange={handleInputChange}
              placeholder={profileData?.username}
              disabled={disableInput}
            />
          </div>

          <div className="lg:mb-4 mb-2">
            <Input
              type="text"
              label="Country"
              name="country"
              value={profileData?.country.trim()}
              onChange={handleInputChange}
              placeholder={profileData?.country}
              disabled={disableInput}
            />
          </div>

          {/* Bio */}
          <div className="lg:mb-6 mb-4 w-full">
            <p className="text-base text-gray-950 mb-1.5 font-medium">Bio</p>
            <textarea
              maxLength={maxBioLength}
              value={profileData?.bio}
              name="bio"
              disabled={disableInput}
              onChange={handleInputChange}
              placeholder="Tell us about yourself"
              className="border h-24 w-full border-gray-300 bg-[#F9F9FB] rounded-lg py-2 px-4 focus:outline-none focus:border-primaryColor resize-none"
            ></textarea>
            {!disableInput && (
              <p className="text-sm text-customDarkGray">
                {profileData?.bio?.length <= 0
                  ? `Enter up to ${maxBioLength} character`
                  : `${maxBioLength - profileData?.bio?.length} characters left`}
              </p>
            )}
          </div>

          <div className="lg:mb-6 mb-4">
            <Button
              onClick={() => setUpdateModalState(true)}
              isLoading={isLoading}
              disabled={isLoading}
              className="text-white whitespace-nowrap lg:text-lg text-sm"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
      <ConfirmModal
        title="Confirm"
        message="Are you sure you want to make these changes to your profile?"
        open={updateModalState}
        onclose={() => setUpdateModalState(false)}
        onConfirm={() => handleUpdateProfile()}
      />
    </div>
  );
};

export default ProfileDetails;
