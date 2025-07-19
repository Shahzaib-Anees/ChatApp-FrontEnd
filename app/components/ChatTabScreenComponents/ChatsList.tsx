import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import ChatFiltersListSection from "./ChatFiltersListSection";

const ChatsList = ({ darkMode }: { darkMode: boolean }) => {
  return (
    <View className="px-2">
      <ChatFiltersListSection darkMode={darkMode} />
      <TouchableOpacity
        className={`h-[48px] flex-row items-center px-4 gap-[36px] mt-4 border-b-[1px] ${darkMode ? "border-[#222121]" : "border-[#faf8f8]"}`}
      >
        <Feather
          name="lock"
          size={21}
          color={`${darkMode ? "#9e9e9e" : "#000"}`}
        />
        <Text
          className={`${darkMode ? "text-[#9e9e9e]" : "text-darkestBlack"} text-[16px] tracking-wider`}
          style={{
            fontFamily: "RobotoBold",
          }}
        >
          Locked chats
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className={`h-[48px] flex-row items-center px-4 gap-[36px] border-b-[1px] ${darkMode ? "border-[#222121]" : "border-[#faf8f8]"}`}
      >
        <Ionicons
          name="archive-outline"
          size={21}
          color={`${darkMode ? "#9e9e9e" : "#000"}`}
        />
        <Text
          className={`${darkMode ? "text-[#9e9e9e]" : "text-darkestBlack"} text-[16px] tracking-wider`}
          style={{
            fontFamily: "RobotoBold",
          }}
        >
          Archived chats
        </Text>
      </TouchableOpacity>
      {}
      <View>
        
      </View>
    </View>
  );
};

export default ChatsList;
