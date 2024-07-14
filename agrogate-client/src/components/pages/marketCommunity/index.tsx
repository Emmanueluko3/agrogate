import React, { useState } from "react";
import HomeTemplate from "../../templates/HomeTemplate";
import Marketplace from "../../organisms/marketCommunity/marketplace";
import Community from "../../organisms/marketCommunity/community";

const MarketCommunity: React.FC = () => {
  const tabs = ["Marketplace", "Community"];
  const [tab, setTab] = useState(tabs[0]);
  return (
    <HomeTemplate>
      <div className="rounded-lg lg:mb-6 mb-4">
        <div className="flex lg:mb-6 mb-4">
          {tabs.map((item, index) => (
            <button
              key={index}
              onClick={() => setTab(item)}
              className={`py-2 px-1 lg:mr-8 mr-4 text-xs lg:text-lg whitespace-nowrap ${tab == item ? "text-primary-500 border-b-2 border-primary-500 font-medium" : ""}`}
            >
              {item}
            </button>
          ))}
        </div>
        {tab == "Marketplace" && <Marketplace />}
        {tab == "Community" && <Community />}
      </div>
    </HomeTemplate>
  );
};

export default MarketCommunity;
