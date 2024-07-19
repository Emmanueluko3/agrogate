import React from "react";
import { useAppSelector } from "../../../store/hooks";
import User from "../../../assets/images/farmBg1.jpg";
import PostCard from "../../molecules/Cards/postCard";
import Button from "../../atoms/buttons/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";

const Community: React.FC = () => {
  const profile: any = useAppSelector((state) => state.profile.profile);
  //   const dispatch = useAppDispatch();
  console.log(profile);

  return (
    <div className="grid grid-flow-row grid-cols-5 gap-6">
      <div className="w-full col-span-3 overflow-y-auto no-scrollbar max-h-[85vh]">
        <div className="bg-[#fff] lg:p-6 p-4 rounded-lg lg:mb-6 mb-4 w-full">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full mr-2">
              <img src={User} alt="" className="rounded-full h-full w-full" />
            </div>
            <h3 className="font-bold">Emmanuel Stephen</h3>
          </div>
          <textarea
            className="bg-transparent border-none focus:outline-none w-full max-h-36 my-4"
            placeholder="What's on your mind?"
          />
          <div className="border rounded-lg flex justify-center items-center h-32 mb-4"></div>
          <Button className="text-white">
            Post <FontAwesomeIcon className="ml-2" icon={faStar} />
          </Button>
        </div>
        <div className="flex flex-col">
          <PostCard id={1} />
          <PostCard id={2} />
          <PostCard id={3} />
        </div>
      </div>
      <div className="bg-[#fff] rounded-lg lg:mb-6 mb-4 w-full col-span-2 h-fit py-4">
        <h3 className="font-bold text-primary-500 border-b border-primary-200 px-4 pb-2 mb-4">
          Groups
        </h3>
        <div className="flex flex-col">
          <div className="flex items-center px-4 hover:bg-primary-100 cursor-pointer">
            <img src={User} className="rounded-lg h-10 w-10 mr-2" alt="" />
            <div className="py-2">
              <h3 className="font-semibold leading-none">Farmers Forum</h3>
              <p className="text-sm text-gray-600">1 new message</p>
            </div>
          </div>
          <div className="flex items-center px-4 hover:bg-primary-100 cursor-pointer">
            <img src={User} className="rounded-lg h-10 w-10 mr-2" alt="" />
            <div className="py-2">
              <h3 className="font-semibold leading-none">Weather Chats</h3>
              <p className="text-sm text-gray-600">52 new messages</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
