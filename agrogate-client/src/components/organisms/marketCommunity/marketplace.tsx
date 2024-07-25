import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Button from "../../atoms/buttons/button";
import ProductCard from "../../molecules/Cards/productCard";
import ModalComponent from "../../molecules/Modals/Modal";
import Input from "../../atoms/inputs/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import apiService from "../../../api/apiService";
import { globalAxios } from "../../../api/globalAxios";
import { useParams } from "react-router-dom";
import PreviewProduct from "../../molecules/Cards/previewProduct";

interface CreateData {
  title: string;
  description: string;
  price: string;
  images: any;
}

const Marketplace: React.FC = () => {
  const { productId } = useParams();
  const tabs = ["Explore", "My Listings"];
  const [tab, setTab] = useState(tabs[0]);
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

  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const response: any = await apiService(
        `/api/v1/products${tab == "My Listings" ? "/me" : ""}`,
        "GET"
      );
      if (response.data) {
        const data = response.data;
        setProducts(data.data);
      }
    } catch (error: any) {
      console.error("error message", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [tab]);
  const clearFormData = () => {
    setCreateProductData({
      title: "",
      description: "",
      price: "",
      images: [],
    });
    setErrors({
      title: "",
      description: "",
      price: "",
      images: "",
    });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0];

      setCreateProductData({
        ...createProductData,
        [name]: [...createProductData.images, file],
      });

      // if (file) {
      //   const reader = new FileReader();
      //   reader.onloadend = () => {
      //     setCreateProductData({
      //       ...createProductData,
      //       [name]: [...createProductData.images, reader.result],
      //     });
      //   };
      //   reader.readAsDataURL(file);
      // }
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
    const { title, description, price, images } = createProductData;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    for (const image of images) {
      formData.append("images", image);
    }
    // for (let i = 0; i < images.length; i++) {
    //   formData.append("images", images[i]);
    // }

    if (validateForm()) {
      try {
        setIsLoading(true);
        console.log(formData);

        const response: any = await globalAxios.post(
          "/api/v1/products",
          formData,
          {
            headers: {
              ...globalAxios.defaults.headers.common,
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
            },
          }
        );
        if (response.data) {
          clearFormData();
          fetchProducts();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const createModal = (
    <ModalComponent
      open={createModalState}
      onclose={() => {
        setCreateModalState(false);
        clearFormData();
      }}
      title="Create Listing"
    >
      <div className="mb-6">
        <div className="mb-4">
          <div className="rounded-lg border min-h-28 lg:min-h-36 mb-2 relative grid grid-flow-row grid-cols-2 gap-6">
            {createProductData.images.map((item, index) => (
              <div key={index} className="w-full lg:h-32 h-24">
                <img
                  src={URL.createObjectURL(item)}
                  className="h-full w-full rounded-lg"
                  alt=""
                />
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
              name="title"
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
              name="price"
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
        <div className="flex lg:mb-6 mb-4">
          {tabs.map((item, index) => (
            <button
              key={index}
              onClick={() => setTab(item)}
              className={`py-1 px-1 lg:mr-8 mr-4 text-xs lg:text-base whitespace-nowrap ${tab == item ? "text-primary-500 border-b-2 border-primary-500 font-medium" : ""}`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="lg:mb-6 mb-4">
          <Button
            onClick={() => setCreateModalState(true)}
            className="text-white"
          >
            Create Listing
          </Button>
        </div>
      </div>

      <div className="w-full grid grid-flow-row grid-cols-2 lg:grid-cols-4 gap-4 min-h-[70vh] md:px-6 px-2">
        {productId && (
          <PreviewProduct
            data={products.filter((item: any) => item.id === productId)[0]}
          />
        )}
        {products.map((item, index) => (
          <ProductCard key={index} data={item} />
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
