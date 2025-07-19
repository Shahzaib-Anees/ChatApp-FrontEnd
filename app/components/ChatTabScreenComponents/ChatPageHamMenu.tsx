import { View, Text, Touchable, TouchableOpacity } from "react-native";
import React from "react";

const ChatPageHamMenu = ({ darkMode }: { darkMode: boolean }) => {
  return (
    <View
      className={`absolute top-12 right-[calc(0%-0.8rem)] w-[45vw] ${darkMode ? "bg-[#121212]" : "bg-[#fff]"} rounded-lg shadow-md`}
    >
      <TouchableOpacity className="p-3">
        <Text
          className={`${darkMode ? "text-[#fff]" : "text-darkestBlack"} text-[17px]`}
        >
          Create group
        </Text>
      </TouchableOpacity>
      <TouchableOpacity className="p-3">
        <Text
          className={`${darkMode ? "text-[#fff]" : "text-darkestBlack"} text-[17px]`}
        >
          Create community
        </Text>
      </TouchableOpacity>
      <TouchableOpacity className="p-3">
        <Text
          className={`${darkMode ? "text-[#fff]" : "text-darkestBlack"} text-[17px]`}
        >
          Create broadcast
        </Text>
      </TouchableOpacity>
      <TouchableOpacity className="p-3">
        <Text
          className={`${darkMode ? "text-[#fff]" : "text-darkestBlack"} text-[17px]`}
        >
          Starred
        </Text>
      </TouchableOpacity>
      <TouchableOpacity className="p-3">
        <Text
          className={`${darkMode ? "text-[#fff]" : "text-darkestBlack"} text-[17px]`}
        >
          Settings
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChatPageHamMenu;
