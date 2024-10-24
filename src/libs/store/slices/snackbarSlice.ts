import { ETypeSnackbar } from "@/libs/enums";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ISnackbarSlice {
  open: boolean;
  message: string;
  type: ETypeSnackbar;
}

export const initialState: ISnackbarSlice = {
  open: false,
  message: "",
  type: ETypeSnackbar.SUCCESS,
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    handleOpenSnackbar: (
      state,
      action: PayloadAction<{ message: string; type: ETypeSnackbar }>
    ) => {
      state.open = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    handleCloseSnackbar: (state) => {
      state.open = false;
    },
  },
});

export const { handleOpenSnackbar, handleCloseSnackbar } =
  snackbarSlice.actions;

export default snackbarSlice.reducer;
