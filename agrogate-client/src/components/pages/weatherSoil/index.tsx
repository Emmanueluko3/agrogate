import React from "react";
import HomeTemplate from "../../templates/HomeTemplate";
import WeatherSoilComp from "../../organisms/weatherSoil";

const WeatherSoil: React.FC = () => {
  return (
    <HomeTemplate>
      <WeatherSoilComp />
    </HomeTemplate>
  );
};

export default WeatherSoil;
