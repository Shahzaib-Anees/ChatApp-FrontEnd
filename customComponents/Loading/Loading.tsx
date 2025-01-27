import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

const Loading = ({ text }: { text: string }) => {
  return (
    <View
      className="absolute top-0 left-0 w-[100%] h-[100%] flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
    >
      <ActivityIndicator size="large" color="#1f8a66" />
      <Text className="text-[16px] text-[#fff] mt-4">{text}</Text>
    </View>
  );
};

export default Loading;
