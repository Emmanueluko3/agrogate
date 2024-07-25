import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Modal, Theme } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

interface ProductPreviewProps {
  data:
    | {
        id: any;
        images: [string];
        title: string;
        description: string;
        price: number | string;
        user: {
          name: string;
          profile_image: string;
          phone_number: string;
          country: string;
        };
      }
    | any;
}

const PreviewProduct: React.FC<ProductPreviewProps> = ({ data }) => {
  const emptyData = {
    id: "",
    title: "",
    images: [],
    price: "",
    description: "",
    user: {
      name: "",
      profile_image: "",
      phone_number: "",
      country: "",
    },
  };

  const navigate = useNavigate();
  const { productId: routeId } = useParams();
  const { id, title, images, price, description, user } =
    routeId === data.id ? data : emptyData;
  const { name, profile_image, phone_number, country } = user;
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const open = routeId === id ? true : false;

  const style = (theme: Theme) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    [theme.breakpoints.down("md")]: {
      width: "90%",
    },
    [theme.breakpoints.up("md")]: {
      width: "75%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "60%",
    },

    bgcolor: "background.paper",
    boxShadow: 24,
    border: "none",
    p: 2,
  });

  return (
    <Modal
      open={open}
      onClose={() => {
        navigate("/marketCommunity/marketplace");
      }}
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style} className="rounded-lg">
          <div className="flex justify-between items-start lg:mb-5 mb-3.5">
            <h2 className="lg:text-xl text-lg font-semibold text-gray-900">
              {title}
            </h2>
            <button
              onClick={() => {
                navigate("/marketCommunity/marketplace");
              }}
            >
              <FontAwesomeIcon icon={faX} className="font-bold" />
            </button>
          </div>
          <div className="w-[full] mb-5 flex justify-between flex-col lg:flex-row p-6 border border-[#ACACAC] rounded-lg">
            <div className="flex flex-col items-center w-full lg:w-[58%]">
              <div className="py-8 px-2 w-full h-52 lg:h-96">
                <img
                  src={selectedImage}
                  className="w-full h-full rounded-lg"
                  alt={name}
                />
              </div>
              <div className="w-full flex">
                {images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className={`rounded-lg lg:h-20 lg:w-24 w-12 h-12 hover:border-customGreen border p-[2px] mr-3 ${
                      selectedImage === image
                        ? "border-primary-450 border-2"
                        : "border-gray-500"
                    }`}
                  >
                    <img
                      src={image}
                      className="w-full h-full rounded-lg"
                      alt="Laptop"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 w-full lg:w-[38%]">
              <div className="pb-5 mb-5">
                <h4 className="font-medium text-3xl text-primary-500 order-[2] lg:order-[2] mb-3">
                  {title}
                </h4>
                <div className="w-full mb-5 order-[7] lg:order-[6]">
                  <p className="text-[16px]">{description}</p>
                  <h3 className="text-xl order-[5] lg:order-[5]">
                    &#8358; {price}
                  </h3>
                </div>

                <h4 className="font-medium text-lg text-primary-500 order-[2] lg:order-[2] mb-3">
                  Seller&#39;s Details
                </h4>
                <div className="flex items-center">
                  <img
                    src={profile_image}
                    className="h-6 w-6 lg:h-12 lg:w-12  rounded-full mr-4"
                    alt={name}
                  />
                  <p className="text-customGreen text-sm font-medium order-4 lg:order-[4]">
                    {name}
                  </p>
                </div>
                <p className="text-base my-1 order-[3] lg:order-[3]">
                  Country: <span className="text-[#686767]">{country}</span>
                </p>
                {phone_number && (
                  <p className="text-customGreen text-sm font-medium mb-4 order-4 lg:order-[4]">
                    Phone Number:{" "}
                    <a href={`tel:${phone_number}`} className="text-blue-500">
                      {phone_number}
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default PreviewProduct;
