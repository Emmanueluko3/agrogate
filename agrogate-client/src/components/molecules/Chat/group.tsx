import React, { useEffect, useState } from "react";
import apiService from "../../../api/apiService";

const Group: React.FC = () => {
  const [groups, setGroups] = useState([]);
  const fetchGroups = async () => {
    try {
      const response: any = await apiService("/api/v1/group", "GET");
      if (response.data) {
        const data = response.data;
        setGroups(data.data);
      }
    } catch (error: any) {
      console.log("error message", error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <div className="bg-[#fff] rounded-lg lg:mb-6 mb-4 w-full h-fit py-4">
      <h3 className="font-bold text-primary-500 border-b border-primary-200 px-4 pb-2 mb-4">
        Groups
      </h3>
      <div className="flex flex-col">
        {groups.map((item: any, index) => (
          <div
            key={index}
            className="flex items-center px-4 hover:bg-primary-100 cursor-pointer"
          >
            <img
              src={item?.imageUrl}
              className="rounded-lg h-10 w-10 mr-2"
              alt=""
            />
            <div className="py-2">
              <h3 className="font-semibold leading-none">{item.name}</h3>
              <p className="text-sm text-gray-600 whitespace-nowrap">
                {item.messages.length}{" "}
                {item.members.length > 1 ? "Members" : "Member"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Group;
