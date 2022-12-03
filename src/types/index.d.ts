import { Socket } from "socket.io-client";
declare global {
  interface Window {
    socket: any;
    token: string;
    refreshToken: string;
  }
}

export type DataSignIn = {
  phone: string;
  password: string;
};

export type DataSignUp = {
  phone: string;
  password: string;
  confirm_password: string;
  email: string;
};