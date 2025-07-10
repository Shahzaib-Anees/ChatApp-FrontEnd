import { io, Socket } from "socket.io-client";
import CONFIGS from "../config/configs.app";

let socket: Socket | null = null;
const socketServices = {
  connect: (token: string) => {
    if (CONFIGS.useMockServer) {
      return;
    }

    socket = io(CONFIGS.socketUrl, {
      auth: {
        token: token,
      },
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
    return socket;
  },

  disconnect: () => {
    if (socket) {
      socket.disconnect();
      socket = null;
      console.log("Socket disconnected manually");
    }
  },

  emit: (event: any, data: any) => {
    if (socket && socket.connected) {
      socket.emit(event, data);
      console.log("Event emitted:", event, data);
    } else {
      console.log("Socket is not connected");
    }
  },
  on: (event: any, callback: (data: any) => void) => {
    if (socket) {
      socket.on(event, callback);
    }
  },

  off: (event: any, callback: (data: any) => void) => {
    if (socket) {
      socket.off(event, callback);
    }
  },

  joinRoom: (roomId: any) => {
    if (socket) {
      socket.emit("join_room", roomId);
    }
  },

  leaveRoom: (roomId: any) => {
    if (socket) {
      socket.emit("leave_room", roomId);
    }
  },

  getSocket: () => socket,
};

export default socketServices;
