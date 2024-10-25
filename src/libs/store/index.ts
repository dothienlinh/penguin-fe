import { configureStore } from "@reduxjs/toolkit";
import modalAuthReducer from "./slices/modalAuthSlice";
import profileReducer from "./slices/profileSlice";
import snackbarReducer from "./slices/snackbarSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      profile: profileReducer,
      snackbar: snackbarReducer,
      modalAuth: modalAuthReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
