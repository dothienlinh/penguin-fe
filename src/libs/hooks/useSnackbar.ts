import { ETypeSnackbar } from "../enums";
import { useAppDispatch } from "../store/hooks";
import { handleOpenSnackbar as handleOpenSnackbarAction } from "../store/slices/snackbarSlice";

const useSnackbar = () => {
  const dispatch = useAppDispatch();

  const handleOpenSnackbar = (message: string, type: ETypeSnackbar) => {
    dispatch(handleOpenSnackbarAction({ message, type }));
  };

  return { handleOpenSnackbar };
};

export default useSnackbar;
