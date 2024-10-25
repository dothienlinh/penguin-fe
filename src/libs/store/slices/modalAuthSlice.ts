import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TypeModal } from "../../enums";
import { COMPONENT_MAP, TARGET_MODAL } from "../../constants";

export interface IModalAuth {
  type: TypeModal;
  componentKey: keyof typeof COMPONENT_MAP;
  title: string;
  textFooter?: string;
  email?: string;
  isOpenModalConfirm?: boolean;
  isOpenModal: boolean;
  backModal?: TypeModal;
}

const initialState: IModalAuth = { ...TARGET_MODAL.login, isOpenModal: false };

export const modalAuthSlice = createSlice({
  name: "modalAuth",
  initialState,
  reducers: {
    setModalAuth: (state, action: PayloadAction<IModalAuth>) => {
      return { ...state, ...action.payload };
    },

    setOpenModal: (state, action: PayloadAction<boolean>) => {
      return { ...state, isOpenModal: action.payload };
    },

    setOpenModalConfirm: (state, action: PayloadAction<boolean>) => {
      return { ...state, isOpenModalConfirm: action.payload };
    },

    setEmail: (state, action: PayloadAction<string>) => {
      return { ...state, email: action.payload };
    },

    setBackModal: (state, action: PayloadAction<TypeModal | undefined>) => {
      return { ...state, backModal: action.payload };
    },

    setTitle: (state, action: PayloadAction<string>) => {
      return { ...state, title: action.payload };
    },

    setBackModalAndModalConfirm: (
      state,
      action: PayloadAction<{
        backModal: TypeModal | undefined;
        isOpenModalConfirm: boolean;
      }>
    ) => {
      return {
        ...state,
        backModal: action.payload.backModal,
        isOpenModalConfirm: action.payload.isOpenModalConfirm,
      };
    },

    setTitleAndEmail: (
      state,
      action: PayloadAction<{ title: string; email: string }>
    ) => {
      state.title = action.payload.title;
      state.email = action.payload.email;
    },
  },
});

export const {
  setModalAuth,
  setOpenModal,
  setOpenModalConfirm,
  setEmail,
  setBackModal,
  setTitle,
  setBackModalAndModalConfirm,
  setTitleAndEmail,
} = modalAuthSlice.actions;

export default modalAuthSlice.reducer;
