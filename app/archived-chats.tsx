import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { router } from "expo-router";
import colors from "@/Utils/colors/colorVariables";
import HamMenuComponent from "@/customComponents/HamMenuComponent/HamMenuComponent";

const ArchivedChats = () => {
  const darkMode = useSelector((state: any) => state.theme?.darkTheme);
  const [openHamMenu, setOpenHamMenu] = useState<boolean>(false);
  const hamMenuElements = [
    {
      text: "Archive settings",
      onPress: () => {
        console.log("Settings pressed");
      },
    },
  ];
  return (
    <SafeAreaView>
      <View
        className={`flex-row items-center justify-between mt-1 py-3 px-4 border-b-[1px] ${darkMode ? "border-[#222121]" : "border-[#faf8f8]"}`}
      >
        <View className="flex-row items-center gap-3">
          <TouchableOpacity onPress={() => router.back()}>
            <AntDesign
              name="arrowleft"
              size={22}
              color={darkMode ? colors.lightestGrey : "black"}
            />
          </TouchableOpacity>
          <Text
            className={`${darkMode ? "text-lightestGrey" : "text-black"} text-[20px] font-[Roboto] font-semibold tracking-wider`}
          >
            Archived
          </Text>
        </View>
        <View className="relative z-10">
          <TouchableOpacity onPress={() => setOpenHamMenu(!openHamMenu)}>
            <Ionicons
              name="ellipsis-vertical"
              size={19}
              color={darkMode ? colors.lightestGrey : "black"}
            />
          </TouchableOpacity>
          {openHamMenu && (
            <HamMenuComponent darkMode={darkMode} elements={hamMenuElements} top={27} right={-8}/>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ArchivedChats;
