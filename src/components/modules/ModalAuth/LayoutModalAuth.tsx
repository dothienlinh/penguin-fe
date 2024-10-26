import { TypographyAuth } from "@/components/ui/Typography";
import { COMPONENT_MAP, TARGET_MODAL } from "@/libs/constants";
import { useAppDispatch, useAppSelector } from "@/libs/store/hooks";
import {
  setBackModalAndModalConfirm,
  setModalAuth,
  setOpenModalConfirm,
} from "@/libs/store/slices/modalAuthSlice";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { FC, forwardRef, memo, MouseEvent } from "react";

interface LayoutModalAuthProps {
  handleClose?: () => void;
}

const LayoutModalAuth: FC<LayoutModalAuthProps> = forwardRef(
  ({ handleClose }, ref) => {
    const targetModal = useAppSelector((state) => state.modalAuth);
    const dispatch = useAppDispatch();

    const Component = COMPONENT_MAP[targetModal.componentKey];

    const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        handleClose?.();
      }
    };

    const handleCloseModalConfirm = () => {
      dispatch(setOpenModalConfirm(false));
    };

    const handleCloseModalConfirmSuccess = () => {
      if (targetModal.backModal) {
        dispatch(
          setModalAuth({
            ...TARGET_MODAL[targetModal.backModal],
            isOpenModalConfirm: false,
          })
        );
      } else {
        dispatch(
          setModalAuth({
            ...TARGET_MODAL.login,
            isOpenModal: false,
            isOpenModalConfirm: false,
          })
        );
      }
    };

    const handleClickIconClose = () => {
      if (
        targetModal.type === TARGET_MODAL.verifyEmailAndRegister.type ||
        targetModal.type === TARGET_MODAL.verifyEmailAndResetPassword.type
      ) {
        dispatch(
          setBackModalAndModalConfirm({
            backModal: undefined,
            isOpenModalConfirm: true,
          })
        );
      } else {
        handleClose?.();
      }
    };

    return (
      <>
        <Box
          ref={ref}
          sx={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          tabIndex={-1}
          onClick={handleBackdropClick}
        >
          <Box
            component={motion.div}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.1, ease: "linear" }}
          >
            <Paper
              elevation={4}
              sx={{
                p: 4,
                width: { xs: "100vw", md: 678 },
                height: { xs: "100vh", md: 695 },
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 10,
              }}
            >
              {handleClose && (
                <IconButton
                  onClick={handleClickIconClose}
                  sx={{ position: "absolute", top: 10, right: 10 }}
                >
                  <CloseIcon />
                </IconButton>
              )}

              <Typography
                variant="h6"
                component="h2"
                sx={{ textAlign: "center", fontWeight: 700, fontSize: 28 }}
              >
                {targetModal.title}
              </Typography>

              {<Component />}

              {targetModal.textFooter && (
                <Typography
                  sx={{
                    textAlign: "center",
                    fontSize: 14,
                    color: "text.secondary",
                  }}
                >
                  {targetModal.textFooter}
                </Typography>
              )}
            </Paper>
          </Box>
        </Box>

        <Dialog
          open={!!targetModal.isOpenModalConfirm}
          onClose={handleCloseModalConfirm}
        >
          <DialogTitle>Xác nhận</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Bạn có chắc chắn muốn quay lại không?
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ display: "flex", gap: 1, py: 2 }}>
            <TypographyAuth onClick={handleCloseModalConfirm} sx={{ px: 1 }}>
              Hủy
            </TypographyAuth>
            <TypographyAuth
              onClick={handleCloseModalConfirmSuccess}
              sx={{ px: 1 }}
            >
              Đồng ý
            </TypographyAuth>
          </DialogActions>
        </Dialog>
      </>
    );
  }
);

LayoutModalAuth.displayName = "LayoutModalAuth";

export default memo(LayoutModalAuth);
