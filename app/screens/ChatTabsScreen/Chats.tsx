import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatPageHeader from "@/app/components/ChatTabScreenComponents/ChatPageHeader";
import { useSelector } from "react-redux";
import ChatsList from "@/app/components/ChatTabScreenComponents/ChatsList";

const Chats = () => {
  const darkMode = useSelector((state: any) => state.theme?.darkTheme);
  return (
    <SafeAreaView className={`${darkMode ? "bg-black" : "bg-white"} flex-1`}>
      <ChatPageHeader darkMode={darkMode} />
      <ChatsList darkMode={darkMode} />
    </SafeAreaView>
  );
};

export default Chats;
