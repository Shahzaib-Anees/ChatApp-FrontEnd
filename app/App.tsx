import MessageHandler from "@/customComponents/MessageHandler/MessageHandler";
import { Stack } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
import Register from "./Register";
import colors from "@/Utils/colors/colorVariables";
import { useSocket } from "./hooks/useSocket";

export default function App() {
  const darkMode = useSelector((state: any) => state.theme?.darkTheme);
  const messageHandlerState = useSelector(
    (state: any) => state?.messageHandler?.called
  );

  const token = useSelector((state: any) => state.user?.accessToken);
  console.log("Token:", token);

  const [messages, setMessages] = useState<string[]>([]);
  const socketRef = useRef<Socket | null>(null);
  const {
    connect: connectToWebSockets,
    disconnect: disconnectToWebSockets,
    socket,
  } = useSocket();

  useEffect(() => {
    console.log("Dark Mode:", darkMode);
    if (token) {
      // socketRef.current = io("http://192.168.0.177:3000", {
      //   auth: {
      //     token: token,
      //   },
      //   transports: ["websocket", "polling"],
      //   reconnection: true,
      //   reconnectionAttempts: 5,
      //   reconnectionDelay: 1000,
      // });
      // // Connect to the server
      // socketRef.current.on("connect", () => {
      //   console.log("Connected to server");
      // });

      // socketRef.current.on("message", (message) => {
      //   console.log("Message received:", message);
      //   setMessages((prevMessages) => [...prevMessages, message]);
      // });

      // socketRef.current.on("connect_error", (error) => {
      //   console.error("Connection error:", error);
      // });
      connectToWebSockets();
      return () => {
        if (socket) {
          disconnectToWebSockets();
        }
      };
    }
  }, []);

  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            statusBarBackgroundColor: darkMode
              ? colors.darkestBlack
              : colors.darkestWhite,
            statusBarStyle: darkMode ? "light" : "dark",
          }}
        />
        <Stack.Screen
          name="Register"
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: darkMode ? "#111111" : colors.darkestWhite,
            },
            headerTintColor: darkMode
              ? colors.darkestWhite
              : colors.darkestBlack,
            statusBarStyle: darkMode ? "light" : "dark",
            statusBarBackgroundColor: darkMode
              ? "#111111"
              : colors.darkestWhite,
            contentStyle: {
              backgroundColor: darkMode ? "#111111" : colors.darkestWhite,
            },
          }}
        />
        <Stack.Screen
          name="Login"
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: darkMode ? "#111111" : colors.darkestWhite,
            },
            headerTintColor: darkMode
              ? colors.darkestWhite
              : colors.darkestBlack,
            statusBarStyle: darkMode ? "light" : "dark",
            statusBarBackgroundColor: darkMode
              ? "#111111"
              : colors.darkestWhite,
            contentStyle: {
              backgroundColor: darkMode ? "#111111" : colors.darkestWhite,
            },
          }}
        />
        <Stack.Screen
          name="forgetPassword"
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: darkMode ? "#111111" : colors.darkestWhite,
            },
            headerTitle: "Forgot Password",
            headerTintColor: darkMode
              ? colors.darkestWhite
              : colors.darkestBlack,
            statusBarStyle: darkMode ? "light" : "dark",
            statusBarBackgroundColor: darkMode
              ? "#111111"
              : colors.darkestWhite,
            contentStyle: {
              backgroundColor: darkMode ? "#111111" : colors.darkestWhite,
            },
          }}
        />
        <Stack.Screen
          name="chatsTabs"
          options={{
            headerShown: false,
            statusBarStyle: darkMode ? "light" : "dark",
            statusBarBackgroundColor: darkMode
              ? "#111111"
              : colors.darkestWhite,
            contentStyle: {
              backgroundColor: darkMode ? "#111111" : colors.darkestWhite,
            },
          }}
        />
        <Stack.Screen
          name="locked-chats"
          options={{
            headerShown: false,
            statusBarStyle: darkMode ? "light" : "dark",
            statusBarBackgroundColor: darkMode
              ? "#111111"
              : colors.darkestWhite,
            contentStyle: {
              backgroundColor: darkMode ? "#111111" : colors.darkestWhite,
            },
          }}
        />
        <Stack.Screen
          name="archived-chats"
          options={{
            headerShown: false,
            statusBarStyle: darkMode ? "light" : "dark",
            statusBarBackgroundColor: darkMode
              ? "#111111"
              : colors.darkestWhite,
            contentStyle: {
              backgroundColor: darkMode ? "#111111" : colors.darkestWhite,
            },
          }}
        />
      </Stack>
    </>
  );
}
