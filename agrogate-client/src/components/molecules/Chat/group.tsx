import React, { useEffect, useState } from "react";
import apiService from "../../../api/apiService";
import ChatUI from "./chatUi";
import useSocket from "../../../hooks/useSocket";

const Group: React.FC = () => {
  const tabs = ["My Group", "Explore"];
  const [groupTab, setGroupTab] = useState(tabs[0]);
  const [groups, setGroups] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const [activeGroup, setActiveGroup] = useState<null | object>(null);

  const fetchGroups = async () => {
    try {
      const response: any = await apiService("/api/v1/group", "GET");
      if (response.data) {
        const data = response.data;
        setGroups(data.data);
      }
      const userGroupData: any = await apiService(
        "/api/v1/group/auth-user-groups",
        "GET"
      );

      setUserGroups(userGroupData?.data?.groups);
    } catch (error: any) {
      console.log("error message", error);
    }
  };

  const socket: any = useSocket();

  const setActiveUserGroup = (group: any) => {
    setActiveGroup(() => group);
    // setGroupMessages(group.messages);

    socket.emit("joinRoom", { room: group.name });
  };

  useEffect(() => {
    fetchGroups();
  }, []);
  console.log(
    "socket:",
    userGroups.map((i) => i).filter((g: any) => g.id)
  );
  groups.map((i) => i).filter((g: any) => g.id);
  return (
    <div className="bg-[#fff] rounded-lg lg:mb-6 mb-4 w-full h-fit py-4">
      <h3 className="font-bold text-primary-500 border-b border-primary-200 px-4 pb-2 mb-4">
        Groups
      </h3>

      <div className="flex flex-col">
        {activeGroup ? (
          <ChatUI data={activeGroup} />
        ) : (
          <>
            <div className="flex mb-4 px-4">
              {tabs.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setGroupTab(item)}
                  className={` px-1 lg:mr-8 mr-4 text-xs lg:text-sm whitespace-nowrap ${groupTab == item ? "text-primary-500 border-b-2 border-primary-500 font-medium" : ""}`}
                >
                  {item}
                </button>
              ))}
            </div>
            {groupTab == tabs[1] &&
              groups.map((item: any, index) => (
                <div
                  key={index}
                  className="flex items-center px-4 hover:bg-primary-100"
                >
                  <img
                    src={item?.imageUrl}
                    className="rounded-lg h-10 w-10 mr-2"
                    alt=""
                  />
                  <div className="py-2">
                    <h3 className="font-semibold leading-none">{item.name}</h3>
                    <p className="text-sm text-gray-600 whitespace-nowrap">
                      {item.members.length}{" "}
                      {item.members.length > 1 ? "Members" : "Member"}
                    </p>
                  </div>
                  {userGroups.map((i) => i).filter((g: any) => g.id) !==
                    groups.map((i) => i).filter((g: any) => g.id) && (
                    <button
                      className="ms-auto text-primary-500 text-sm font-bold"
                      onClick={() => setActiveUserGroup(item)}
                    >
                      Join
                    </button>
                  )}
                </div>
              ))}

            {groupTab == tabs[0] &&
              userGroups.map((item: any, index) => (
                <div
                  key={index}
                  onClick={() => setActiveGroup(item)}
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
                      {item.members.length}{" "}
                      {item.members.length > 1 ? "Members" : "Member"}
                    </p>
                  </div>
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Group;
