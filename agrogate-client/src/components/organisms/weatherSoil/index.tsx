import React from "react";
import WeatherForecaset from "../../../assets/images/forecast.jpg";
import { useAppSelector } from "../../../store/hooks";
import Input from "../../atoms/inputs/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

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

        <div className="grid grid-flow-row grid-cols-6 gap-8 w-full">
          <div className="col-span-6 lg:col-span-3 rounded-lg border h-fit">
            <h2 className="lg:text-xl text-lg rounded-t-lg p-2 text-center font-semibold text-gray-900 bg-primary-100 relative">
              <Input
                className="bg-transparent text-gray-600 border-white"
                placeholder="Input location for weather report..."
              />
              <button className="absolute right-6 top-5">
                <FontAwesomeIcon
                  className="text-primary-500 hover:text-primary-350"
                  icon={faMagnifyingGlass}
                />
              </button>
            </h2>
            <div className="flex-1 p-4 min-h-72">
              <p className="text-base text-gray-500 mb-2">
                Wheather Based on your location
              </p>
              <img src={WeatherForecaset} className="w-full h-64" alt="" />
            </div>
          </div>
          <div className="col-span-6 lg:col-span-3 rounded-lg border h-fit">
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
