"use client";

import Button from "@/components/ui/Button";
import { Modal, SxProps } from "@mui/material";
import React, { FC, memo, useCallback, useState } from "react";
import LayoutModalAuth from "./LayoutModalAuth";
import useAuthModalContext from "@/libs/hooks/useAuthModalContext";
import { TARGET_MODAL } from "@/components/providers/AuthModalProvider";

interface ModalLoginProps {
  textBtn: string;
  sxBtn?: SxProps;
  btnComponent?: React.ElementType;
}

const ModalLogin: FC<ModalLoginProps> = ({
  textBtn,
  sxBtn,
  btnComponent: BtnComponent = Button,
}) => {
  const [open, setOpen] = useState(false);
  const { setTargetModal } = useAuthModalContext();
  const handleOpen = () => setOpen(true);
  const handleClose = useCallback(() => {
    setTargetModal(TARGET_MODAL.login);
    setOpen(false);
  }, [setTargetModal]);

  return (
    <>
      <BtnComponent onClick={handleOpen} sx={sxBtn}>
        {textBtn}
      </BtnComponent>

      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiModal-backdrop": {
            bgcolor: "white",
            opacity: "0.95 !important",
          },
        }}
      >
        <LayoutModalAuth handleClose={handleClose} />
      </Modal>
    </>
  );
};

export default memo(ModalLogin);
