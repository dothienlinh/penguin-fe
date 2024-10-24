import { TARGET_MODAL } from "@/components/providers/AuthModalProvider";
import { TypographyAuth } from "@/components/ui/Typography";
import useAuthModalContext from "@/libs/hooks/useAuthModalContext";
import CloseIcon from "@mui/icons-material/Close";
import {
  IconButton,
  Paper,
  Typography,
  Box,
  DialogContentText,
  DialogContent,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { motion } from "framer-motion";
import { FC, memo, MouseEvent, forwardRef } from "react";

interface LayoutModalAuthProps {
  handleClose: () => void;
}

const LayoutModalAuth: FC<LayoutModalAuthProps> = forwardRef(
  ({ handleClose }, ref) => {
    const { targetModal, setTargetModal } = useAuthModalContext();

    const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
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
        handleClose();
      }
    };

    const handleCloseModalConfirm = () => {
      setTargetModal((prev) => ({
        ...prev,
        isOpenModalConfirm: false,
      }));
    };

    const handleClickIconClose = () => {
      if (
        targetModal.type === TARGET_MODAL.verifyEmailAndRegister.type ||
        targetModal.type === TARGET_MODAL.verifyEmailAndResetPassword.type
      ) {
        setTargetModal((prev) => ({
          ...prev,
          isOpenModalConfirm: true,
          backModal: undefined,
        }));
      } else {
        handleClose();
      }
    };

    return (
      <>
        <Box
          ref={ref}
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
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
              <IconButton
                onClick={handleClickIconClose}
                sx={{ position: "absolute", top: 10, right: 10 }}
              >
                <CloseIcon />
              </IconButton>

              <Typography
                variant="h6"
                component="h2"
                sx={{ textAlign: "center", fontWeight: 700, fontSize: 28 }}
              >
                {targetModal.title}
              </Typography>

              {targetModal.component}

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
          sx={{}}
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
              onClick={() => {
                handleCloseModalConfirm();

                if (targetModal.backModal) {
                  setTargetModal(TARGET_MODAL[targetModal.backModal]);
                } else {
                  handleClose();
                }
              }}
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
