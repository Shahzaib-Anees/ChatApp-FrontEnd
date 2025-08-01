import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import SwipableModalComponent from "@/customComponents/SwipableModalComponent/SwipableModalComponent";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import colors from "@/Utils/colors/colorVariables";
import { lockChatAuthenticationModalInterface } from "@/types/lockChatAuthenticationModalInterface.types";
import * as LocalAuthentication from "expo-local-authentication";
import { useDispatch } from "react-redux";
import { setValueInChatRoomsState } from "@/Utils/redux/reducers/chatRooms.slice";
import { router } from "expo-router";
import SecretCodeInterface from "./secretCodeInterface";

const AuthenticationOptionModal = ({
  darkMode,
  modalState,
  onClose,
  onOpen,
  hasDeviceAutentication,
}: {
  darkMode: boolean;
  modalState: boolean;
  onClose: () => void;
  onOpen: () => void;
  hasDeviceAutentication?: boolean;
}) => {
  const [authenticationModalInterface, setAuthenticationModalInterface] =
    useState<lockChatAuthenticationModalInterface>(
      lockChatAuthenticationModalInterface.modal_interface
    );
  useEffect(() => {
    setAuthenticationModalInterface(
      lockChatAuthenticationModalInterface.modal_interface
    );
  }, []);
  const dispatch = useDispatch();
  const onDeviceAuthentication = async () => {
    onClose?.();
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Unlock your locked chats",
        disableDeviceFallback: false,
      });
      if (result.success) {
        dispatch(
          setValueInChatRoomsState({
            name: "isLockedChatsAuthenticated",
            data: true,
          })
        );
        router.push("/locked-chats");
      } else {
        console.log("❌ Device authentication failed");
      }
    } catch (error) {
      console.error("Device authentication error:", error);
    }
  };
  const onCodeAutentication = () => {
    setAuthenticationModalInterface(
      lockChatAuthenticationModalInterface.secret_code_interface
    );
  };
  const renderedContent = () => {
    switch (authenticationModalInterface) {
      case lockChatAuthenticationModalInterface.modal_interface:
        return (
          <>
            <View className="flex-row items-center justify-center">
              <Text
                className={`${darkMode ? "text-lighterGrey" : "text-darkestBlack"} text-[18px] font-[Roboto] font-bold`}
              >
                Unlock your locked chats
              </Text>
            </View>
            <TouchableOpacity
              className="flex-row items-center gap-5 mt-4 px-2 py-3"
              onPress={onDeviceAuthentication}
            >
              <MaterialIcons
                name="security"
                size={20}
                color={darkMode ? colors.lightGrey : colors.darkestBlack}
              />
              <View className="gap-1">
                <Text
                  className={`${darkMode ? "text-lightestGrey" : "text-darkestBlack"} text-[16px] font-[Roboto] font-semibold`}
                >
                  Device Authentication
                </Text>
                <Text
                  className={`${darkMode ? "text-lightGrey" : "text-darkestBlack"} text-[14px] font-[Roboto]`}
                >
                  Unlock with fingerprint, face ID, or device PIN
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row items-center gap-5 mt-1 px-2 py-3"
              onPress={onCodeAutentication}
            >
              <MaterialCommunityIcons
                name="key-outline"
                size={20}
                color={darkMode ? colors.lightGrey : colors.darkestBlack}
              />
              <View className="gap-1">
                <Text
                  className={`${darkMode ? "text-lightestGrey" : "text-darkestBlack"} text-[16px] font-[Roboto] font-semibold`}
                >
                  Secret Code
                </Text>
                <Text
                  className={`${darkMode ? "text-lightGrey" : "text-darkestBlack"} text-[14px] font-[Roboto]`}
                >
                  Use your Secret Code to unlock chats
                </Text>
              </View>
            </TouchableOpacity>
          </>
        );

      case lockChatAuthenticationModalInterface.secret_code_interface:
        return <SecretCodeInterface darkMode={darkMode} onClose={onClose} />;
    }
  };
  return (
    <SwipableModalComponent
      visible={modalState}
      onClose={onClose}
      onOpen={onOpen}
      darkMode={darkMode}
      modalComparativeHeight={
        authenticationModalInterface ==
        lockChatAuthenticationModalInterface.secret_code_interface
          ? 0.5
          : 0.33
      }
    >
      {renderedContent()}
    </SwipableModalComponent>
  );
};

export default AuthenticationOptionModal;
