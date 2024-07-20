import React from "react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  data: {
    id: any;
    images: [string];
    title: string;
    price: number | string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const { id, title, images, price } = data;

  return (
    <Link to={`/marketplace/${id}`}>
      <div className="w-full h-fit rounded-2xl bg-white lg:hover:drop-shadow-2xl cursor-pointer">
        <div className="lg:h-[210px] h-52 w-full">
          <img
            src={images[0]}
            className="w-full h-full object-cover rounded-t-2xl"
            alt={title}
          />
        </div>
        <div className="p-4">
          <p className="text-[16px] text-[#2F2F2F]">
            {title?.slice(0, 24)}
            {title?.length > 26 && "..."}
          </p>
          <div className="flex">
            <h3 className="text-[16px] font-bold mr-4 text-primary-500">
              &#8358; {price}
            </h3>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
