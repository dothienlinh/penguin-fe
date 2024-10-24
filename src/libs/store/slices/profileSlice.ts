import { ERole } from "@/libs/enums";
import { IRole } from "@/libs/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IPermission {
  id: number;
  name: string;
}

export interface IUser {
  id: number;
  email: string;
  lastName: string;
  firstName: string;
  avatar: string;
  gender: string | null;
  birthDate: string | null;
  isActive: boolean;
  isPublished: boolean;
  role: IRole;
  permissions: IPermission[];
}

export interface IProfileState {
  message: string;
  isAuthenticated: boolean;
  user: IUser | null;
}

const initialState: IProfileState = {
  message: "",
  isAuthenticated: false,
  user: {
    id: 0,
    email: "",
    lastName: "",
    firstName: "",
    avatar: "",
    gender: null,
    birthDate: null,
    isActive: false,
    isPublished: false,
    role: {
      id: -1,
      name: ERole.NONE,
    },
    permissions: [],
  },
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearProfile: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = false;
      state.user = null;
      state.message = action.payload;
    },
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;

export default profileSlice.reducer;
