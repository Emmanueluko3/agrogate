import React from "react";
import { ReactNode } from "react";
import { Modal, Theme } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

interface ModalProps {
  title: string;
  children: ReactNode;
  open: boolean;
  onclose: () => void;
}

const ModalComponent: React.FC<ModalProps> = ({
  title,
  children,
  open,
  onclose,
}) => {
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
      width: 500,
    },

    bgcolor: "background.paper",
    boxShadow: 24,
    border: "none",
    p: 2,
  });

  return (
    <Modal
      open={open}
      onClose={onclose}
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
            <button onClick={onclose}>
              <FontAwesomeIcon icon={faX} className="font-bold" />
            </button>
          </div>
          {children}
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalComponent;
