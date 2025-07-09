import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import ChatFiltersListSection from "./ChatFiltersListSection";

const ChatsList = ({ darkMode }: { darkMode: boolean }) => {
  return (
    <View className="px-2 gap-y-1   ">
      {/* <TouchableOpacity className="h-[48px] flex-row items-center px-4 gap-[26px]">
        <Feather
          name="lock"
          size={20}
          color={`${darkMode ? "#9e9e9e" : "#000"}`}
        />
        <Text
          className={`${darkMode ? "text-[#9e9e9e]" : "text-darkestBlack"} text-[17px] tracking-wider`}
          style={{
            fontFamily: "RobotoBold",
          }}
        >
          Locked chats
        </Text>
      </TouchableOpacity>
      <TouchableOpacity className="h-[48px] flex-row items-center px-4 gap-[26px]">
        <Ionicons
          name="archive-outline"
          size={20}
          color={`${darkMode ? "#9e9e9e" : "#000"}`}
        />
        <Text
          className={`${darkMode ? "text-[#9e9e9e]" : "text-darkestBlack"} text-[17px] tracking-wider`}
          style={{
            fontFamily: "RobotoBold",
          }}
        >
          Archived chats
        </Text>
      </TouchableOpacity> */}
      <ChatFiltersListSection darkMode={darkMode} />
    </View>
  );
};

export default ChatsList;
