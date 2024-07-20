import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

interface PostCardProps {
  data: {
    user: any;
    id: number | string;
    description: string;
    media: [string];
    likes: [string];
    comments: [string];
    createdAt: string;
  };
}

const formatDate = (date: string) => {
  const today = new Date();
  const inputDate = new Date(date);

  const isToday = today.toDateString() === inputDate.toDateString();

  if (isToday) {
    return `Today: ${inputDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  } else {
    const day = inputDate.getDate();
    const month = inputDate.getMonth() + 1; // Months are zero-indexed
    const year = inputDate.getFullYear();
    return `${day}-${month}-${year}`;
  }
};

const PostCard: React.FC<PostCardProps> = ({ data }) => {
  return (
    <div className="bg-[#fff] rounded-lg lg:mb-6 mb-4 w-full border border-primary-100">
      <Link to={`/community/post/${data.id}`}>
        <div className="flex items-center pt-4 px-4">
          <div className="h-10 w-10 rounded-full mr-2">
            <img
              src={data.user.profile_image}
              alt=""
              className="rounded-full h-full w-full"
            />
          </div>
          <div className="">
            <h3 className="font-bold text-gray-700">{data.user.name}</h3>
            <p className="text-xs font-semibold text-gray-500">
              {formatDate(data.createdAt)}
            </p>
          </div>
        </div>
        <p className="text-gray-800 p-4">{data.description}</p>
        <div className="border grid grid-flow-col grid-cols-subgrid gap-3">
          {data.media.map((item, index) => (
            <img src={item} alt="" key={index} />
          ))}
        </div>
      </Link>
      <div className="flex justify-between items-center p-4">
        <h3 className="text-gray-500 cursor-pointer">
          <FontAwesomeIcon icon={faThumbsUp} /> {data.likes.length}
        </h3>
        <h3 className="text-gray-500 cursor-pointer">
          <FontAwesomeIcon icon={faComment} /> {data.comments.length} Comments
        </h3>
        <h3 className="text-gray-500 cursor-pointer">
          <FontAwesomeIcon icon={faPhone} /> Call
        </h3>
      </div>
    </div>
  );
};

export default PostCard;
