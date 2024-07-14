import React from "react";
import Navbar from "../molecules/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../atoms/buttons/button";
// import { CircularProgress } from "@mui/material";

const SharedPost: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center bg-customLightGray min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* {isLoading ? (
        <div className="h-[80vh] text-primaryColor flex justify-center items-center bg-[#fff] p-6 rounded-lg mb-6 w-full">
          <CircularProgress color="inherit" size={60} thickness={5} />
        </div>
      ) : user ? (
        <>Chat no</>
      ) : ( */}
      <div className="h-[80vh] text-primaryColor flex justify-center flex-col items-center bg-[#fff] p-6 rounded-lg mb-6 w-full font-medium text-2xl">
        Page &quot;{id}&ldquo; not found
        <div>
          <Button onClick={() => navigate("/")} className="text-white">
            Go Home
          </Button>
        </div>
      </div>

      {/* )} */}
    </div>
  );
};

export default SharedPost;
