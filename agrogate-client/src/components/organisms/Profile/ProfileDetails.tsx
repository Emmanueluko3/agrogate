import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
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

interface ProfileDataProps {
  name: string;
  username: string;
  bio: string;
  profile_image: string;
  cover_image: string;
  socials: {
    social_media_type: string;
    url: string;
  }[];
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
    profile_image: "",
    cover_image: "",
    socials: [
      { social_media_type: "TWITTER", url: "" },
      { social_media_type: "FACEBOOK", url: "" },
      { social_media_type: "INSTAGRAM", url: "" },
      { social_media_type: "LINKEDIN", url: "" },
      { social_media_type: "YOUTUBE", url: "" },
      { social_media_type: "TIKTOK", url: "" },
    ],
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
      profile_image: profile?.profile_image || "",
      cover_image: profile?.cover_image || "",
    }));
  };

  // Setting user inputs when mounted or successful profile update
  useEffect(() => {
    setprofileData();
  }, [profile]);

  const handleUpdateProfile = async () => {
    setIsLoading(true);
    setDisableInput(true);
    setUpdateModalState(false);
    try {
      const { profile_image, cover_image, name, username, bio, socials } =
        profileData;
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

      socials.forEach((social, index) => {
        formData.append(
          `socials[${index}].SocialMediaType`,
          social.social_media_type
        );
        formData.append(`socials[${index}].Url`, social.url);
      });

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

  const handleSocialInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    const updatedsocials = [...profileData.socials];
    updatedsocials[index] = {
      ...updatedsocials[index],
      url: value,
    };
    setProfileData((prevProfileData) => ({
      ...prevProfileData,
      socials: updatedsocials,
    }));
  };

  return (
    <div className="bg-[#fff] lg:p-6 p-4 rounded-lg lg:mb-6 mb-4 w-full">
      <div className="flex justify-between items-start mb-4">
        <h2 className="lg:text-xl text-lg lg:mb-6 mb-4 font-semibold text-gray-900">
          Edit Profile
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
          onChange={handleInputChange}
        />
        <div className="lg:w-24 lg:h-24 h-20 w-20 rounded-full bg-white flex justify-center items-center absolute lg:-bottom-1/4 -bottom-1/3 left-1/2 transform -translate-x-1/2">
          {profileData?.profile_image ? (
            <img
              src={profileData?.profile_image}
              alt=""
              className="cursor-pointer rounded-full w-[90%] h-[90%]"
              onClick={() => imageInputRef?.current?.click()}
            />
          ) : (
            <FontAwesomeIcon className="w-[90%] h-[90%]" icon={faCircleUser} />
          )}
          <input
            type="file"
            className="hidden"
            name="profile_image"
            ref={imageInputRef}
            disabled={disableInput}
            onChange={handleInputChange}
          />
        </div>
      </div>
      {/* Profile Forms */}
      <div>
        {/* Personal Data */}

        {/* Social links */}
        <div className="grid grid-flow-row lg:grid-cols-2 grid-cols-1 lg:gap-6 gap-4 lg:mb-6 mb-4">
          <div className="col-span-1">
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
          <div className="col-span-1">
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
          {profileData.socials.map((social, index) => (
            <div className="col-span-1" key={index}>
              <Input
                label={`${social.social_media_type.toLowerCase().replace(/^./, social.social_media_type[0].toUpperCase())} Account`}
                onChange={(e) => handleSocialInputChange(index, e)}
                type="text"
                name={social.social_media_type}
                value={social.url}
                placeholder={`Enter ${social.social_media_type.toLowerCase().replace(/^./, social.social_media_type[0].toUpperCase())} url`}
                disabled={disableInput}
              />
            </div>
          ))}
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
            className="border h-32 w-full border-gray-300 bg-[#F9F9FB] rounded-lg py-2 px-4 focus:outline-none focus:border-primaryColor resize-none"
          ></textarea>
          {!disableInput && (
            <p className="text-sm text-customDarkGray">
              {profileData?.bio?.length <= 0
                ? `Enter up to ${maxBioLength} character`
                : `${maxBioLength - profileData?.bio?.length} characters left`}
            </p>
          )}
        </div>

        <div className="grid grid-flow-row grid-cols-2 lg:gap-6 gap-4 lg:mb-6 mb-4">
          <div className="col-span-1">
            <Button
              type="button"
              className=" text-gray-900 bg-transparent border border-primary-400 hover:bg-primary-400 hover:text-white whitespace-nowrap lg:text-lg text-sm"
            >
              Cancel
            </Button>
          </div>
          <div className="col-span-1">
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
