// hooks/useSocket.js
import socketServices from "@/Utils/socketsManagerService/socketsService";
import { useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";

export const useSocket = () => {
  //   const { token, user } = useAuth();
  const token = useSelector((state: any) => state.user?.accessToken);
  const socketRef: any = useRef(null);

  const connect = useCallback(() => {
    if (token && !socketRef.current) {
      socketRef.current = socketServices.connect(token);

      // Connection events
      socketRef.current.on("connect", (socket: any) => {
        console.log("Connected to chat server" );
      });

      socketRef.current.on("disconnect", (reason: any) => {
        console.log("Disconnected from chat server:", reason);
      });

      socketRef.current.on("connect_error", (error: any) => {
        console.error("Connection error:", error);
      });
    }
  }, [token]);

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketServices.disconnect();
      socketRef.current = null;
    }
  }, []);

  const emit = useCallback((event: any, data: any) => {
    socketServices.emit(event, data);
  }, []);

  const joinRoom = useCallback((roomId: string) => {
    socketServices.joinRoom(roomId);
  }, []);

  const leaveRoom = useCallback((roomId: string) => {
    socketServices.leaveRoom(roomId);
  }, []);

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    socket: socketRef.current,
    emit,
    joinRoom,
    leaveRoom,
    connect,
    disconnect,
  };
};
