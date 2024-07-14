import React, { useState } from "react";
import { useAppSelector } from "../../../store/hooks";
import Button from "../../atoms/buttons/button";
import Input from "../../atoms/inputs/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const Diagnose: React.FC = () => {
  const userProfile: any = useAppSelector(
    (state) => state.userProfile.userProfile
  );
  //   const dispatch = useAppDispatch();
  console.log(userProfile);

  // ai reports
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello User! Please upload a plant image to get started",
      sender: "ai",
    },
  ]);
  const sendMessage = async () => {
    if (messageInput.trim() === "") return;

    const newMessage = {
      id: messages.length + 1,
      text: messageInput,
      sender: "user",
    };

    setMessages([...messages, newMessage]);
    setMessageInput("");
  };

  return (
    <div className="bg-[#fff] lg:p-6 p-4 rounded-lg lg:mb-6 mb-4 w-full">
      <h2 className="lg:text-4xl text-lg lg:mb-6 mb-4 font-semibold text-gray-900">
        Diagnosis
      </h2>

      <div className="w-fit ms-auto mb-4">
        <Button className="text-white">History</Button>
      </div>

      <div className="grid grid-flow-row grid-cols-5 gap-8">
        <div className="col-span-3"></div>

        {/* Ai reports */}
        <div className="col-span-2 rounded-lg border">
          <h2 className="lg:text-xl text-lg rounded-t-lg p-2 text-center font-semibold text-gray-900 bg-primary-100">
            Reports
          </h2>
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`p-2 rounded-t-lg w-fit max-w-[70%] mb-2 text-primary-600 text-sm ${
                  message.sender === "user"
                    ? "right-0 rounded-bl-lg bg-green-200 bg-opacity-25 ms-auto"
                    : "rounded-br-lg bg-primary-800 bg-opacity-5 mr-auto"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <div className="px-2 border-t flex items-center w-full">
            <div className="w-full block  mr-4">
              <Input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(event) => event.key === "Enter" && sendMessage()}
                placeholder="Type a message..."
                className="border-none bg-transparent rounded-none"
              />
            </div>
            <button
              onClick={sendMessage}
              className="flex justify-center items-center text-xl text-primary-500 hover:text-primary-400"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diagnose;
