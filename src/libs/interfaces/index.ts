import { ERole } from "../enums";

export interface IProviderProps {
  children: React.ReactNode;
}

export interface IBackendRes<T> {
  status: number;
  message: string;
  data: T;
  error?: string;
}

export interface IRole {
  id: number;
  name: ERole;
}
