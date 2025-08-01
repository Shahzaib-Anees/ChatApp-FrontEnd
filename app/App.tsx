import MessageHandler from "@/customComponents/MessageHandler/MessageHandler";
import { Stack } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
import Register from "./Register";
import colors from "@/Utils/colors/colorVariables";
import { useSocket } from "./hooks/useSocket";
import { setValueInChatRoomsState } from "@/Utils/redux/reducers/chatRooms.slice";
import { AppState } from "react-native";

export default function App() {
  const darkMode = useSelector((state: any) => state.theme?.darkTheme);
  const messageHandlerState = useSelector(
    (state: any) => state?.messageHandler?.called
  );
  const dispatch = useDispatch();

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
    const handleAppStateChange = (nextAppState: any) => {
      console.log("nextAppState", nextAppState);
      if (nextAppState === "background" || nextAppState === "inactive") {
        setTimeout(() => {
          dispatch(
            setValueInChatRoomsState({
              name: "isLockedChatsAuthenticated",
              data: false,
            })
          );
        }, 1000);
      }
    };
    if (token) {
      connectToWebSockets();
      return () => {
        if (socket) {
          disconnectToWebSockets();
        }
      };
    }
    AppState.addEventListener("change", handleAppStateChange);
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
              ? "#000000"
              : colors.darkestWhite,
            contentStyle: {
              backgroundColor: darkMode ? "#000000" : colors.darkestWhite,
            },
          }}
        />
        <Stack.Screen
          name="archived-chats"
          options={{
            headerShown: false,
            statusBarStyle: darkMode ? "light" : "dark",
            statusBarBackgroundColor: darkMode
              ? "#000000"
              : colors.darkestWhite,
            contentStyle: {
              backgroundColor: darkMode ? "#000000" : colors.darkestWhite,
            },
          }}
        />
      </Stack>
    </>
  );
}
