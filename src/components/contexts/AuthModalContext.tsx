"use client";

import { TypeModal } from "@/libs/enums";
import { createContext, Dispatch, ReactNode, SetStateAction } from "react";

export interface TargetModal {
  type: TypeModal;
  component: ReactNode;
  title: string;
  textFooter?: string;
  email?: string;
  isOpenModalConfirm?: boolean;
  isOpenModal: boolean;
  backModal?: TypeModal;
}

const AuthModalContext = createContext<{
  targetModal: TargetModal;
  setTargetModal: Dispatch<SetStateAction<TargetModal>>;
} | null>(null);

export default AuthModalContext;
