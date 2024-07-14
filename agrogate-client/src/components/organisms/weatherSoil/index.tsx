import React from "react";

import { useAppSelector } from "../../../store/hooks";

const WeatherSoilComp: React.FC = () => {
  const userProfile: any = useAppSelector(
    (state) => state.userProfile.userProfile
  );
  //   const dispatch = useAppDispatch();
  console.log(userProfile);

  return (
    <div className="bg-[#fff] lg:p-6 p-4 rounded-lg lg:mb-6 mb-4 w-full">
      <div className="flex justify-between items-start mb-4">
        <h2 className="lg:text-xl text-lg lg:mb-6 mb-4 font-semibold text-gray-900">
          Weather and Soil
        </h2>
      </div>
    </div>
  );
};

export default WeatherSoilComp;
