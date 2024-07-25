import React, { ChangeEvent, useRef, useState } from "react";
import { useAppSelector } from "../../../store/hooks";
import Button from "../../atoms/buttons/button";
import Input from "../../atoms/inputs/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudArrowUp,
  faHeartPulse,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

const Diagnose: React.FC = () => {
  const { name }: any = useAppSelector((state) => state?.profile?.profile);

  const [imageInput, setImageInput] = useState<any>("");
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { type } = e.target;

    if (type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0];

      setImageInput(file);

      // if (file) {
      //   const reader = new FileReader();
      //   reader.onloadend = () => {
      //     setImageInput(reader.result);
      //   };
      //   reader.readAsDataURL(file);
      // }
    }
  };

  const handleDiagnose = () => {
    try {
      setIsLoading(true);
      console.log("Input image:", imageInput);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // ai reports
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `Hello ${name}! Please upload an image to get started`,
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
    <div className="bg-[#fff] lg:p-6 p-4 rounded-lg lg:mb-6 mb-4 w-full min-h-[80vh]">
      <h2 className="lg:text-4xl text-lg mb-4 font-semibold text-gray-900">
        Diagnosis
      </h2>
      <div className="flex justify-between items-center mb-6">
        <p className="text-base text-gray-500">
          Upload a photo of your plant or animal for a quick and accurate
          diagnosis
        </p>
        <div className="w-fit ms-auto">
          <Button className="text-white">History</Button>
        </div>
      </div>

      <div className="grid grid-flow-row grid-cols-5 gap-8">
        <div className="col-span-3 rounded-lg">
          <input
            type="file"
            className="hidden"
            name="imageInput"
            ref={imageInputRef}
            disabled={isLoading}
            onChange={handleChange}
          />
          {imageInput ? (
            <>
              <div className="rounded-lg w-full mb-4 flex items-center justify-center relative">
                <img
                  src={URL.createObjectURL(imageInput)}
                  className="rounded-lg w-full h-80"
                  alt=""
                />

                <button
                  className="w-full cursor-pointer bottom-0 absolute py-2 bg-slate-50 bg-opacity-15 hover:bg-opacity-25 backdrop-blur-sm rounded-b-lg"
                  onClick={() => imageInputRef?.current?.click()}
                >
                  <FontAwesomeIcon
                    className="text-3xl text-gray-300"
                    icon={faCloudArrowUp}
                  />
                </button>
              </div>

              <Button onClick={handleDiagnose} className="text-white">
                Diagnose
              </Button>
            </>
          ) : (
            <div className="bg-primary-50 rounded-lg w-full h-96 flex items-center justify-center flex-col relative">
              <FontAwesomeIcon
                className="text-8xl opacity-5 absolute drop-shadow-2xl z-10"
                icon={faHeartPulse}
              />
              <div className="z-50 flex items-center justify-center flex-col relative">
                <p
                  onClick={() => imageInputRef?.current?.click()}
                  className="text-center w-3/5 mb-6 text-primary-650 text-base cursor-pointer hover:opacity-80"
                >
                  Upload a clear, focused photo (JPEG, PNG, GIF, max 5MB).
                </p>
                <button
                  className="cursor-pointer"
                  onClick={() => imageInputRef?.current?.click()}
                >
                  <FontAwesomeIcon
                    className="text-3xl text-primary-550 hover:opacity-80"
                    icon={faCloudArrowUp}
                  />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Ai reports */}
        <div className="col-span-2 rounded-lg border h-fit">
          <h2 className="lg:text-xl text-lg rounded-t-lg p-2 text-center font-semibold text-gray-900 bg-primary-100">
            Reports
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
      </div>
    </div>
  );
};

export default Diagnose;
