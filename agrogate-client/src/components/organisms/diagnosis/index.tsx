import React, { ChangeEvent, useRef, useState } from "react";
import { useAppSelector } from "../../../store/hooks";
import Button from "../../atoms/buttons/button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudArrowUp,
  faHeartPulse,
} from "@fortawesome/free-solid-svg-icons";

const Diagnose: React.FC = () => {
  const profile: any = useAppSelector((state) => state?.profile?.profile);

  const [imageInput, setImageInput] = useState<any>("");
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { type } = e.target;

    if (type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0];

      // setImageInput(file);

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageInput(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  console.log("input file", imageInput);

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
        {/* <div className="w-fit ms-auto">
          <Button className="text-white">History</Button>
        </div> */}
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
                  src={imageInput}
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
            <p className="text-primary-700">
              hello {profile.name} Lorem ipsum dolor sit, amet consectetur
              adipisicing elit. Libero molestias eligendi veniam cumque
              praesentium voluptatem reiciendis, dolorum totam quae doloremque
              quia tempora sequi distinctio odit ut rerum quam saepe cupiditate!
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus esse assumenda odio in autem voluptate quibusdam
              officia dignissimos nam ratione harum mollitia nemo incidunt
              quaerat modi, ut accusantium architecto earum? Lorem ipsum dolor
              sit, amet consectetur adipisicing elit. Maxime, tenetur, dolorum
              beatae odit ex aut et necessitatibus doloribus, quaerat ut ducimus
              repellendus quia doloremque quasi! Maxime cum dolores molestias
              suscipit?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diagnose;

// ai reports
// const [messageInput, setMessageInput] = useState("");
// const [messages, setMessages] = useState([
//   {
//     id: 1,
//     text: `Hello ${profile?.name}! Please upload an image to get started`,
//     sender: "ai",
//   },
// ]);
// const sendMessage = async () => {
//   if (messageInput.trim() === "") return;

//   const newMessage = {
//     id: messages.length + 1,
//     text: messageInput,
//     sender: "user",
//   };

//   setMessages([...messages, newMessage]);
//   setMessageInput("");
// };
