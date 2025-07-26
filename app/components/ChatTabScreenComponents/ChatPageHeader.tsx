import {
  View,
  Text,
  TouchableOpacity,
  Button,
  TextInput,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ChatPageHeaderInterface } from "@/types/chatPageHeader.types";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AntDesign from "@expo/vector-icons/AntDesign";
import colors from "@/Utils/colors/colorVariables";
import HamMenuComponent from "../../../customComponents/HamMenuComponent/HamMenuComponent";

const ChatPageHeader = ({ darkMode }: { darkMode: boolean }) => {
  const [view, setView] = useState<ChatPageHeaderInterface>(
    ChatPageHeaderInterface.header_interface
  );

  const hamMenuElements = [
    {
      text: "Create group",
      onPress: () => {
        console.log("Settings pressed");
      },
    },
    {
      text: "Create community",
      onPress: () => {
        console.log("Settings pressed");
      },
    },
    {
      text: "Create broadcast",
      onPress: () => {
        console.log("Profile pressed");
      },
    },
    {
      text: "Starred",
      onPress: () => {
        console.log("Help pressed");
      },
    },
    {
      text: "Settings",
      onPress: () => {
        console.log("Logout pressed");
      },
    },
  ];

  const [openSideHamMenu, setOpenSideHamMenu] = useState<boolean>(false);
  useEffect(() => {});
  const renderedContent = () => {
    switch (view) {
      case ChatPageHeaderInterface.search_bar_interface:
        return (
          <View className="items-center justify-center px-2">
            <View
              className={`flex-row gap-2 w-full items-center ${darkMode ? "bg-[rgba(255,255,255,0.08)] " : "bg-[rgba(0,0,0,0.05)]"}  px-3 py-1 rounded-full`}
            >
              <View
                onTouchEnd={() =>
                  setView(ChatPageHeaderInterface.header_interface)
                }
              >
                <AntDesign
                  name="arrowleft"
                  size={18}
                  color={`${darkMode ? "white" : "black"}`}
                />
              </View>
              <TextInput
                placeholder="Search"
                className={`w-[100%] text-[17px] ${
                  darkMode
                    ? "caret-[var(--light-green)]  text-lighterGrey placeholder:text-[#6b6b6b]"
                    : "caret-darkGreen text-darkestBlack placeholder:text-[#6b6b6b]"
                }`}
              />
            </View>
          </View>
        );
      default:
        return (
          <View className="flex-row items-center justify-between py-1 px-4">
            <TouchableOpacity
              className={`p-2 ${!darkMode ? "bg-[#ececeb]" : "border-[1px] border-[#636262]"}  rounded-full`}
              onPress={() =>
                setView(ChatPageHeaderInterface.search_bar_interface)
              }
            >
              <FontAwesome6
                name="magnifying-glass"
                size={16}
                color={`${darkMode ? colors.lightestGrey : "black"}`}
              />
            </TouchableOpacity>
            <Text
              className={`${darkMode ? "text-white" : "text-black"} font-bold text-[20px]`}
            >
              Home
            </Text>
            <View
              className={`rounded-full relative z-10`}
              onTouchEnd={() => setOpenSideHamMenu(!openSideHamMenu)}
            >
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
                }}
                resizeMode="cover"
                style={{ width: 40, height: 40, borderRadius: 50 }}
              />
              {openSideHamMenu && (
                <HamMenuComponent
                  darkMode={darkMode}
                  elements={hamMenuElements}
                />
              )}
            </View>
          </View>
        );
    }
  };
  return (
    <View className="mt-1">
      {/* <Text>ChatPageHeader</Text> */}
      {renderedContent()}
    </View>
  );
};

export default ChatPageHeader;
