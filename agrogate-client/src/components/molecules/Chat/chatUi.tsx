import React, { useEffect, useState } from "react";
import Input from "../../atoms/inputs/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import useSocket from "../../../hooks/useSocket";

// interface GroupData {
//     data:
//       | {
//           id: string;
//           name: string;
//           about: string;
//           imageUrl: string;
//           members: [];
//           messages: [];
//           createdAt: string;
//           updatedAt: string;
//         }
//       | null
//       | object;
//   }
const ChatUI: React.FC<any> = ({ data }) => {
  const { name } = data;
  const socket: any = useSocket();

  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `Hello User! Please upload an image to get started`,
      sender: "ai",
    },
  ]);

  console.log(messages);

  useEffect(() => {
    if (!socket) return;
    // Join the room when the component mounts
    const groupIdenFyer = name.replaceAll(" ", "");
    socket.emit("joinRoom", { groupIdenFyer });
    // Listen for messages from the server
    socket.on("message", (msg: any) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
    // Load previous messages
    socket.emit("load_messages", { groupIdenFyer });
    // Listen for previous messages
    socket.on("prev_messages", (prevMessages: any) => {
      setMessages(prevMessages);
    });
    return () => {
      // Leave room when the component unmounts
      socket.emit("leaveRoom", { groupIdenFyer });
    };
  }, [socket]);
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

  //   const sendMessage = () => {
  //     if (socket && message.trim()) {
  //       // Emit message to server
  //       socket.emit('groupChatMessage', { groupName: room, message });
  //       setMessage('');
  //     }
  //   };

  return (
    <div className="col-span-2 rounded-lg border h-fit">
      <h2 className="lg:text-xl text-lg rounded-t-lg p-2 text-center font-semibold text-gray-900 bg-primary-100">
        {name}
      </h2>
      <div className="flex-1 p-4 h-80 overflow-y-auto">
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
  );
};

export default ChatUI;
