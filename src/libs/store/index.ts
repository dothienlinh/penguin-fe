import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./slices/profileSlice";
import snackbarReducer from "./slices/snackbarSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      profile: profileReducer,
      snackbar: snackbarReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
