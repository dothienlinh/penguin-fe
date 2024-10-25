import { Modal } from "@mui/material";
import { memo, useCallback } from "react";
import LayoutModalAuth from "./LayoutModalAuth";
import { TARGET_MODAL } from "@/libs/constants";
import { useAppDispatch, useAppSelector } from "@/libs/store/hooks";
import {
  setBackModalAndModalConfirm,
  setOpenModal,
} from "@/libs/store/slices/modalAuthSlice";

const ModalAuth = () => {
  const dispatch = useAppDispatch();
  const targetModal = useAppSelector((state) => state.modalAuth);

  const handleClose = useCallback(() => {
    if (
      targetModal.type === TARGET_MODAL.verifyEmailAndRegister.type ||
      targetModal.type === TARGET_MODAL.verifyEmailAndResetPassword.type
    ) {
      console.log(1);
      dispatch(
        setBackModalAndModalConfirm({
          backModal: undefined,
          isOpenModalConfirm: true,
        })
      );
      return;
    }

    dispatch(setOpenModal(false));
  }, [dispatch, targetModal.type]);

  return (
    <Modal
      open={targetModal.isOpenModal}
      onClose={handleClose}
      sx={{
        "& .MuiModal-backdrop": {
          bgcolor: "#fffffff2",
        },
      }}
    >
      <LayoutModalAuth handleClose={handleClose} />
    </Modal>
  );
};

export default memo(ModalAuth);
