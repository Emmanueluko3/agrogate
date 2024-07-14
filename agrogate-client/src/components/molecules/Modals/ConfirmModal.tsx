import React from "react";
import { ReactNode } from "react";
import { Modal, Theme } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import Button from "../../atoms/buttons/button";

interface ModalProps {
  title: string;
  message: ReactNode;
  open: boolean;
  onclose: () => void;
  onConfirm: any;
}

const ConfirmModal: React.FC<ModalProps> = ({
  title,
  message,
  open,
  onclose,
  onConfirm,
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
          <div className="flex justify-between items-start mb-5">
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            <button onClick={onclose}>
              <FontAwesomeIcon icon={faX} className="font-bold" />
            </button>
          </div>
          <p className="text-base text-gray-600 mb-6">{message}</p>
          <div className="grid grid-flow-col grid-cols-2 gap-4">
            <Button
              onClick={onclose}
              className="bg-transparent border border-gray-400 text-gray-900"
            >
              Cancel
            </Button>
            <Button onClick={onConfirm} className="bg-primaryColor text-white">
              Confirm
            </Button>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ConfirmModal;
