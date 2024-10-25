"use client";

import { Modal } from "@mui/material";
import { memo, useCallback, useEffect } from "react";
import LayoutModalAuth from "./LayoutModalAuth";
import useAuthModalContext from "@/libs/hooks/useAuthModalContext";
import { TARGET_MODAL } from "@/components/providers/AuthModalProvider";

const ModalAuth = () => {
  const { setTargetModal, targetModal } = useAuthModalContext();

  const handleClose = useCallback(() => {
    if (
      targetModal.type === TARGET_MODAL.verifyEmailAndRegister.type ||
      targetModal.type === TARGET_MODAL.verifyEmailAndResetPassword.type
    ) {
      setTargetModal((prev) => ({
        ...prev,
        isOpenModalConfirm: true,
        backModal: undefined,
      }));
      return;
    }

    setTargetModal({ ...TARGET_MODAL.login, isOpenModal: false });
  }, [setTargetModal, targetModal]);

  useEffect(() => {
    setTargetModal((prev) => ({ ...prev, isOpenModal: false }));
  }, [setTargetModal]);

  return (
    <>
      <Modal
        open={!!targetModal.isOpenModal}
        onClose={handleClose}
        sx={{
          "& .MuiModal-backdrop": {
            bgcolor: "#fffffff2",
          },
        }}
      >
        <LayoutModalAuth handleClose={handleClose} />
      </Modal>
    </>
  );
};

export default memo(ModalAuth);
