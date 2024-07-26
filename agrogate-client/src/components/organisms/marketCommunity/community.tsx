import React, { useEffect, useState } from "react";
import User from "../../../assets/images/farmBg1.jpg";
import PostCard from "../../molecules/Cards/postCard";
import Button from "../../atoms/buttons/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import apiService from "../../../api/apiService";
import Group from "../../molecules/Chat/group";

const Community: React.FC = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log(isLoading);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response: any = await apiService("/api/v1/posts", "GET");
      if (response.data) {
        const data = response.data;
        setPosts(data.data);
      }
    } catch (error: any) {
      console.log("error message", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

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
          {posts.map((item: any, index) => (
            <PostCard key={index} data={item} />
          ))}
        </div>
      </div>
      <div className="bg-[#fff] rounded-lg lg:mb-6 mb-4 w-full col-span-2 h-fit py-4">
        <Group />
      </div>
    </div>
  );
};

export default Community;
