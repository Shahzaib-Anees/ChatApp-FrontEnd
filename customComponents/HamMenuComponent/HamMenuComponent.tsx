import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

interface HamElements {
  text: string;
  onPress: () => void;
}

const HamMenuComponent = ({
  darkMode,
  elements,
  top,
  right,
}: {
  darkMode: boolean;
  elements: HamElements[];
  top?: number;
  right?: number;
}) => {
  return (
    <View
      className={`absolute top-12 right-[calc(0%-0.8rem)] w-[45vw] ${darkMode ? "bg-[#121212]" : "bg-[#fff]"} rounded-lg shadow-md`}
      style={{
        width: 170,
        right: right || -4,
        top: top || 45,
        backgroundColor: darkMode ? "#121212" : "#fff",
        borderRadius: 8,
      }}
    >
      {elements.map((element, index) => (
        <TouchableOpacity
          key={index}
          onPress={element.onPress}
          style={{
            padding: 10,
            borderBottomWidth: elements.length - 1 === index ? 0 : 1,
            borderColor: darkMode ? "#222121" : "#faf8f8",
          }}
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
