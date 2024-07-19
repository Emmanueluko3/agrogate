import React from "react";
import { useAppSelector } from "../../../store/hooks";
import Button from "../../atoms/buttons/button";
import ProductCard from "../../molecules/Cards/productCard";
import FarmBg from "../../../assets/images/farmBg.jpg";
import FarmBg1 from "../../../assets/images/farmBg1.jpg";

const Marketplace: React.FC = () => {
  const profile: any = useAppSelector((state) => state.profile.profile);
  //   const dispatch = useAppDispatch();
  console.log(profile);

  const products = [
    { image: FarmBg, title: "Potato", price: 2000 },
    { image: FarmBg1, title: "Rice", price: 2000 },
    { image: FarmBg, title: "Vegetable", price: 4000 },
    { image: FarmBg1, title: "Onions", price: 100 },
    { image: FarmBg1, title: "Garlic", price: 7200 },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between w-full">
        <h2 className="lg:text-xl text-lg lg:mb-6 mb-4 font-semibold text-gray-900">
          Most recent Listing
        </h2>
        <div className="lg:mb-6 mb-4">
          <Button className="text-white">Create Listing</Button>
        </div>
      </div>
      <div className="w-full grid grid-flow-row grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            id={index}
            title={product.title}
            image={product.image}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
