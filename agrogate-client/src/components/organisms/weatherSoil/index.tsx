import React from "react";

import { useAppSelector } from "../../../store/hooks";

const WeatherSoilComp: React.FC = () => {
  const profile: any = useAppSelector((state) => state.profile.profile);
  //   const dispatch = useAppDispatch();
  console.log(profile);

  return (
    <div className="bg-[#fff] lg:p-6 p-4 rounded-lg lg:mb-6 mb-4 w-full">
      <div className="flex justify-between flex-col items-start mb-4">
        <h2 className="lg:text-4xl text-lg mb-6 font-semibold text-gray-900">
          Weather and Soil
        </h2>

        <div className="grid grid-flow-row grid-cols-6 gap-8">
          <div className="col-span-3 rounded-lg border h-fit">
            <h2 className="lg:text-xl text-lg rounded-t-lg p-2 text-center font-semibold text-gray-900 bg-primary-100"></h2>
            <div className="flex-1 p-4 h-80 overflow-y-auto">
              <p className="text-base text-gray-500">
                Wheather Based on your location
              </p>
              <p className="text-primary-700">
                hello {profile.name} Lorem ipsum dolor sit, amet consectetur
                adipisicing elit. Libero molestias eligendi veniam cumque
                praesentium voluptatem reiciendis, dolorum totam quae doloremque
                quia tempora sequi distinctio odit ut rerum quam saepe
                cupiditate! Lorem, ipsum dolor sit amet consectetur adipisicing
                elit. Temporibus esse assumenda odio in autem voluptate
                quibusdam officia dignissimos nam ratione harum mollitia nemo
                incidunt quaerat modi, ut accusantium architecto earum? Lorem
                ipsum dolor sit, amet consectetur adipisicing elit. Maxime,
                tenetur, dolorum beatae odit ex aut et necessitatibus doloribus,
                quaerat ut ducimus repellendus quia doloremque quasi! Maxime cum
                dolores molestias suscipit?
              </p>
            </div>
          </div>
          <div className="col-span-3 rounded-lg border h-fit">
            <h2 className="lg:text-xl text-lg rounded-t-lg p-2 text-center font-semibold text-gray-900 bg-primary-100">
              Soil
            </h2>
            <div className="flex-1 p-4 h-80 overflow-y-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherSoilComp;
