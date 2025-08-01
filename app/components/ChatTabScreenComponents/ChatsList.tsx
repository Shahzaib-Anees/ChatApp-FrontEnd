import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import ChatFiltersListSection from "./ChatFiltersListSection";
import { router } from "expo-router";
import * as LocalAuthentication from "expo-local-authentication";
import { useDispatch, useSelector } from "react-redux";
import { setValueInChatRoomsState } from "@/Utils/redux/reducers/chatRooms.slice";
import AuthenticationOptionModal from "../lockChatComponents/authenticationOptionModal";
import SecretCodeModal from "../lockChatComponents/secretCodeInterface";
import { setShowTabNavigator } from "@/Utils/redux/reducers/theme.slice";

const ChatsList = ({ darkMode }: { darkMode: boolean }) => {
  const [openAuthenticationOptionModal, setOpenAuthenticateOptionModal] =
    useState<boolean>(false);
  const [openSecretCodeModal, setSecretCodeModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  const isLockedChatsUnlocked = useSelector(
    (state: any) => state.chatRoom.isLockedChatsAuthenticated
  );
  console.log("isLockedChatsUnlocked", isLockedChatsUnlocked);
  const handleLockedChatsPress = async () => {
    if (!isLockedChatsUnlocked) {
      try {
        const hasHardWare = await LocalAuthentication.hasHardwareAsync();
        console.log("Has hardware:", hasHardWare);
        if (hasHardWare) {
          const isEnrolled = await LocalAuthentication.isEnrolledAsync();
          if (isEnrolled) {
            setOpenAuthenticateOptionModal(true);
          } else {
            setSecretCodeModal(true);
          }
        }
      } catch (error) {
        console.log("Error checking hardware or enrollment:", error);
      }
    } else {
      router.push("/locked-chats");
    }
  };

  const handleArchivedChatsPress = () => {
    router.push("/archived-chats");
  };
  return (
    <>
      <View className="px-2">
        <ChatFiltersListSection darkMode={darkMode} />
        <TouchableOpacity
          onPress={handleLockedChatsPress}
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
          onPress={handleArchivedChatsPress}
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
        <View></View>
      </View>
      {openAuthenticationOptionModal && (
        <AuthenticationOptionModal
          darkMode={darkMode}
          modalState={openAuthenticationOptionModal}
          onClose={() => {
            setOpenAuthenticateOptionModal(false);
            dispatch(setShowTabNavigator({ showTabNavigator: true }));
          }}
          onOpen={() => {
            dispatch(setShowTabNavigator({ showTabNavigator: false }));
          }}
          // setModalState={setOpenAuthenticateOptionModal}
        />
      )}
      {openSecretCodeModal && <SecretCodeModal darkMode={darkMode} />}
    </>
  );
};

export default ChatsList;
