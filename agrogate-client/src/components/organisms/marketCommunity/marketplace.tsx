import React, { ChangeEvent, useRef, useState } from "react";
import Button from "../../atoms/buttons/button";
import ProductCard from "../../molecules/Cards/productCard";
import FarmBg from "../../../assets/images/farmBg.jpg";
import FarmBg1 from "../../../assets/images/farmBg1.jpg";
import ModalComponent from "../../molecules/Modals/Modal";
import Input from "../../atoms/inputs/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

interface CreateData {
  title: string;
  description: string;
  price: string;
  images: any;
}

const Marketplace: React.FC = () => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [createModalState, setCreateModalState] = useState(false);
  const [createProductData, setCreateProductData] = useState({
    title: "",
    description: "",
    price: "",
    images: [],
  });
  const [errors, setErrors] = useState<Partial<CreateData>>({
    title: "",
    description: "",
    price: "",
    images: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const products = [
    { image: FarmBg, title: "Potato", price: 2000 },
    { image: FarmBg1, title: "Rice", price: 2000 },
    { image: FarmBg, title: "Vegetable", price: 4000 },
    { image: FarmBg1, title: "Onions", price: 100 },
    { image: FarmBg1, title: "Garlic", price: 7200 },
  ];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setCreateProductData({
            ...createProductData,
            [name]: [...createProductData.images, reader.result],
          });
        };
        reader.readAsDataURL(file);
      }
    } else
      setCreateProductData({
        ...createProductData,
        [name]: value,
      });

    if (value.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `${name} is required`,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    let hasErrors = false;
    const newErrors: Partial<CreateData> = {};

    ["title", "price", "images"].forEach((key) => {
      const value = createProductData[key as keyof CreateData];
      if (typeof value === "string" && value.trim() === "") {
        newErrors[key as keyof CreateData] = `${key} is required`;
        hasErrors = true;
      } else if (Array.isArray(value) && value.length === 0) {
        newErrors[key as keyof CreateData] = `At least one image is required`;
        hasErrors = true;
      }
    });

    setErrors(newErrors);
    return !hasErrors;
  };

  const handleCreateProduct = async () => {
    try {
      setIsLoading(true);
      await setTimeout(() => {
        setIsLoading(false);
      }, 4000);

      if (validateForm()) {
        // Submit form
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const createModal = (
    <ModalComponent
      open={createModalState}
      onclose={() => setCreateModalState(false)}
      title="Create Listing"
    >
      <div className="mb-6">
        <div className="mb-4">
          <div className="rounded-lg border min-h-28 lg:min-h-36 mb-2 relative grid grid-flow-row grid-cols-2 gap-6">
            {createProductData.images.map((item, index) => (
              <div key={index} className="w-full lg:h-32 h-24">
                <img src={item} className="h-full w-full rounded-lg" alt="" />
              </div>
            ))}
            {createProductData.images.length > 0 ? (
              <div className="w-full lg:h-32 h-24 flex justify-center items-center">
                <button
                  onClick={() => imageInputRef?.current?.click()}
                  className="text-gray-200 hover:text-primary-400"
                >
                  <FontAwesomeIcon
                    icon={faCamera}
                    className="lg:h-10 lg:w-10 w-6 h-6"
                  />
                </button>
              </div>
            ) : (
              <button
                onClick={() => imageInputRef?.current?.click()}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-200 hover:text-primary-400"
              >
                <FontAwesomeIcon icon={faCamera} className="h-10 w-10" />
              </button>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            name="images"
            ref={imageInputRef}
            disabled={isLoading}
            onChange={handleChange}
          />
          {errors.images && (
            <p className="text-xs text-red-600 mt-1 h-1">{errors.images}</p>
          )}
        </div>

        <div className="mb-2 grid grid-flow-row grid-cols-2 gap-4">
          <div className="mb-2">
            <Input
              label="Product title"
              placeholder="Fresh tomato"
              disabled={isLoading}
              value={createProductData.title}
              onChange={handleChange}
            />
            {errors.title && (
              <p className="text-xs text-red-600 mt-1 h-1">{errors.title}</p>
            )}
          </div>
          <div className="mb-2">
            <Input
              label="Price"
              placeholder="$57.00"
              disabled={isLoading}
              value={createProductData.price}
              onChange={handleChange}
            />
            {errors.price && (
              <p className="text-xs text-red-600 mt-1 h-1">{errors.price}</p>
            )}
          </div>
        </div>
        <div className="mb-6">
          <textarea
            value={createProductData?.description}
            name="description"
            disabled={isLoading}
            onChange={handleChange}
            placeholder="More Information about this product"
            className="border h-24 w-full border-gray-300 bg-[#F9F9FB] rounded-lg py-2 px-4 focus:outline-none focus:border-primaryColor resize-none"
          />
          {errors.description && (
            <p className="text-xs text-red-600 mt-1 h-1">
              {errors.description}
            </p>
          )}
        </div>

        <Button
          disabled={isLoading}
          isLoading={isLoading}
          onClick={() => handleCreateProduct()}
          className="text-white"
        >
          Create
        </Button>
      </div>
      <h2 className="text-xl text-gray-600 mb-6"></h2>
    </ModalComponent>
  );

  return (
    <div className="w-full">
      {createModal}
      <div className="flex items-center justify-between w-full">
        <h2 className="lg:text-xl text-lg lg:mb-6 mb-4 font-semibold text-gray-900">
          Most recent Listing
        </h2>
        <div className="lg:mb-6 mb-4">
          <Button
            onClick={() => setCreateModalState(true)}
            className="text-white"
          >
            Create Listing
          </Button>
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
