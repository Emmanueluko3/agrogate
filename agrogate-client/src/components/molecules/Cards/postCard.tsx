import React from "react";
import { Link } from "react-router-dom";
import FarmBg1 from "../../../assets/images/farmBg1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

interface PostCardProps {
  id: number | string;
  //   image: string;
  //   title: string;
  //   price: number | string;
}

const PostCard: React.FC<PostCardProps> = ({ id }) => {
  return (
    <div className="bg-[#fff] rounded-lg lg:mb-6 mb-4 w-full border border-primary-100">
      <Link to={`/community/post/${id}`}>
        {" "}
        <div className="flex items-center pt-4 px-4">
          <div className="h-10 w-10 rounded-full mr-2">
            <img src={FarmBg1} alt="" className="rounded-full h-full w-full" />
          </div>
          <div className="">
            <h3 className="font-bold text-gray-700">Emmanuel Stephen</h3>
            <p className="text-xs font-semibold text-gray-500">12:00pm</p>
          </div>
        </div>
        <p className="text-gray-800 p-4">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus
          quo amet nihil facilis corrupti labore deserunt praesentium eos
          reprehenderit natus autem deleniti dignissimos, dolorem vel error
          ullam blanditiis ut dolore.
        </p>
        <div className="border grid">
          <img src={FarmBg1} alt="" />
        </div>
      </Link>
      <div className="flex justify-between items-center p-4">
        <h3 className="text-gray-500 cursor-pointer">
          <FontAwesomeIcon icon={faThumbsUp} /> 300
        </h3>
        <h3 className="text-gray-500 cursor-pointer">
          <FontAwesomeIcon icon={faComment} /> 80 Comments
        </h3>
        <h3 className="text-gray-500 cursor-pointer">
          <FontAwesomeIcon icon={faPhone} /> Call
        </h3>
      </div>
    </div>
  );
};

export default PostCard;
