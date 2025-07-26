import { View, Text, Touchable, TouchableOpacity } from "react-native";
import React from "react";

interface HamElements {
  text: string;
  onPress: () => void;
}

const HamMenuComponent = ({
  darkMode,
  elements,
}: {
  darkMode: boolean;
  elements: HamElements[];
}) => {
  return (
    <View
      className={`absolute top-12 right-[calc(0%-0.8rem)] w-[45vw] ${darkMode ? "bg-[#121212]" : "bg-[#fff]"} rounded-lg shadow-md`}
    >
      {elements.map((element, index) => (
        <TouchableOpacity
          key={index}
          onPress={element.onPress}
          className={`p-3 border-b-[1px] ${
            darkMode ? "border-[#222121]" : "border-[#faf8f8]"
          }`}
        >
          <Text
            className={`${darkMode ? "text-lightestGrey" : "text-darkestBlack"} text-[17px]`}
          >
            {element.text}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default HamMenuComponent;
