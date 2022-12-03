import * as io from "socket.io-client";
// const baseURL = "https://api-app-chat-services.onrender.com";
const baseURL = "https://chat-api.blockchaininfo.tech";

const connectSocket = () => {
  if (window.socket) {
    return window.socket;
  }
  window.socket = io.connect(baseURL);

  return window.socket;
};

export const SocketService = () => {
  const socket = connectSocket();
  return {
    sendNewMessage: (data: any) => socket.emit("CLIENT_SEND_NEW_MESSAGE", data),
    sendSeenMessage: (data: any) =>
      socket.emit("CLIENT_SEND_SEEN_MESSAGE", data),
    sendReactionMessage: (data: any) =>
      socket.emit("CLIENT_SEND_REACTION_MESSAGE", data),
  };
};

export const disconnectSocket = () => {
  const socket = connectSocket();
  window.socket = undefined;
  socket.disconnect();
};

export default connectSocket;
