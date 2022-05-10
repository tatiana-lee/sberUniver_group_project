import React, { Children, useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import styles from "./style.module.css";
import cn from "classnames";

import ModalContext from "../../contexts/modalContext";

export default function CustomModal() {
  const { modalState, setModalState } = useContext(ModalContext);

  const handleOpen = () =>
    setModalState(() => {
      return { isOpen: true, msg: "YRA YRA" };
    });
  const handleClose = () =>
    setModalState(() => {
      return { isOpen: false, msg: null };
    });

  return (
    <Modal
      open={modalState.isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={cn(styles.modal)}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {modalState.msg}
        </Typography>
      </Box>
    </Modal>
  );
}
