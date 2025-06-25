import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

const Settings = () => {
  const darkMode = useSelector((state: any) => state.theme?.darkTheme);

  return (
    <SafeAreaView className={`${darkMode ? "bg-black" : "bg-white"} flex-1`}>
      <Text>Settings</Text>
    </SafeAreaView>
  );
};

export default Settings;
