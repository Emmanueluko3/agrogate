import { faCircleUser, faGift } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import apiService from "../../../api/apiService";
import { CircularProgress } from "@mui/material";

interface commentData {
  data: {
    creator_response: string;
    supporter_Id: string | number;
    supporter_message: string;
    supporter_name: string;
    total_gift: number | string;
    creator_name: string;
    creator_username: string;
    isOwner: boolean;
  };
  fetchSupporters: () => void;
}

const Comment: React.FC<commentData> = ({ data, fetchSupporters }) => {
  const [reply, setReply] = useState<boolean>(false);
  const [creatorReply, setCreatorReply] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleReply = async () => {
    try {
      setIsLoading(true);
      const response: any = await apiService(
        `/api/v1/creators/${encodeURIComponent(data?.creator_username)}/supporters/${encodeURIComponent(data.supporter_Id)}/reply`,
        "PUT",
        creatorReply
      );
      if (response.status == 200) {
        fetchSupporters();
        console.log("replied", response);
      }
    } catch (error: any) {
      if (error?.response) {
        console.log("Error whille fetching Supporters", error);
      }
      console.log("error message", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border border-[#E5E6EB] rounded-lg lg:mb-6 mb-4 lg:p-6 p-4 flex">
      <div className="border border-primary-400 text-primary-400 lg:w-8 lg:h-8 w-6 h-6 bg-[#FFF8F1] rounded-lg flex justify-center items-center lg:mr-6 mr-4">
        <FontAwesomeIcon className="lg:h-4 lg:w-4 h-3 w-3" icon={faGift} />
      </div>
      <div className="">
        <div className="flex items-center">
          <FontAwesomeIcon className="w-6 h-6 mr-2" icon={faCircleUser} />
          <h3 className="font-medium lg:text-lg text-sm">
            {data?.supporter_name ? data?.supporter_name : "Anonymous"}{" "}
            <span className=" text-gray-500 italic ml-2 lg:text-base text-xs">
              Sent {data?.total_gift} Tips
            </span>
          </h3>
        </div>
        {data?.supporter_message && (
          <p className="text-gray-500 lg:text-base text-xs my-4 font-normal">
            {data?.supporter_message}
          </p>
        )}

        {data?.creator_response ? (
          <div className="ml-4">
            <div className="flex items-center">
              <FontAwesomeIcon
                className="lg:w-6 lg:h-6 h-4 w-4 mr-2"
                icon={faCircleUser}
              />
              <h3 className="font-medium lg:text-lg text-sm">
                {data.creator_name}{" "}
                <span className="text-primaryColor bg-[#FFF8F1] rounded-full py-1 px-2 lg:text-sm text-xs font-normal">
                  Owner
                </span>
              </h3>
            </div>
            <p className="text-gray-500 lg:text-base text-xs font-normal my-3">
              {data?.creator_response}
            </p>
          </div>
        ) : data?.isOwner && reply ? (
          <div className="ml-4 flex items-center justify-center w-4/5">
            <FontAwesomeIcon
              className="lg:w-6 lg:h-6 w-4 h-4 mr-2"
              icon={faCircleUser}
            />{" "}
            <input
              onChange={(e) => setCreatorReply(e.target.value)}
              className="rounded-lg rounded-r-none border w-full border-gray-300 text-customGray1 bg-[#F9F9FB] focus:outline-none px-2 py-1 lg:py-2 lg:px-4 focus:border-primaryColor"
            />{" "}
            <button
              onClick={() => handleReply()}
              disabled={isLoading}
              className="bg-primary-400 text-white hover:opacity-80 lf:text-sm text-xs lg:p-3 p-2 rounded-r-lg w-28 flex justify-center items-center"
            >
              {isLoading ? (
                <CircularProgress color="inherit" size={20} thickness={5} />
              ) : (
                "Reply"
              )}
            </button>
          </div>
        ) : (
          data?.isOwner && (
            <button
              onClick={() => setReply(true)}
              className="bg-transparent lg:text-sm text-xs hover:text-primary-400"
            >
              Reply
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Comment;
