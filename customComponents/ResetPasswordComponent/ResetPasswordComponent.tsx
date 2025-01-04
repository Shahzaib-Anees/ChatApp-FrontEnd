import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import "../../global.css";

const ResetPasswordComponent = ({ darkMode }: { darkMode: boolean }) => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordError, setNewPasswordError] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [seeNewPassword, setSeeNewPassword] = useState<boolean>(true);
  const [seeConfirmPassword, setSeeConfirmPassword] = useState<boolean>(true);
  const [allChecked, setAllChecked] = useState<boolean>(false);
  useEffect(() => {
    if (newPassword && confirmPassword) {
      if (!newPasswordError && !confirmPasswordError) {
        setAllChecked(true);
      } else {
        setAllChecked(false);
      }
    } else {
      setAllChecked(false);
    }
  }, [newPasswordError, confirmPasswordError]);
  const updatePassword = () => {};
  return (
    <View className="w-[100%] items-center justify-center mt-6">
      <View className="w-[100%] gap-[2px] mt-4 py-3">
        <Text
          className={`text-[24px] ${
            darkMode ? "text-[#fff]" : "text-[#000]"
          } tracking-wider`}
          style={{
            fontFamily: "PoppinsBold",
          }}
        >
          Set a new Password
        </Text>
        <Text
          className={`text-[16px] ${
            darkMode ? "text-[#c6c5c4]" : "text-[#868686]"
          }`}
          style={{
            fontFamily: "PoppinsSemiBold",
          }}
        >
          Create a new password. Ensure it differs from your previous ones for
          security.
        </Text>
      </View>
      {/* Input fields Container  */}
      <View className="items-center w-[100%] gap-[50px] mt-[30px]">
        <View className="w-[100%] gap-[5px]">
          <Text
            className={`text-[15px] ${
              darkMode
                ? newPasswordError
                  ? "text-[#ff0000]"
                  : "text-[#7decc7]"
                : newPasswordError
                ? "text-[#ff0000]"
                : "text-[#1f8a66]"
            }`}
            style={{
              fontFamily: "RobotoBold",
            }}
          >
            Password
          </Text>
          <View
            className={`w-[100%] flex-row items-center justify-between border-b-[1px] pr-9 ${
              darkMode ? "border-b-[#7decc7]" : "border-b-[#1f8a66]"
            } ${newPasswordError && "border-b-[#ff0000]"}`}
          >
            <TextInput
              className={`w-[100%] h-[40px] rounded-[2px] px-1 text-[16px] ${
                darkMode ? "text-[#fff]" : "text-[#000]"
              } font-semibold ${
                darkMode ? "caret-[#7decc7]" : "caret-[#1f8a66]"
              }`}
              value={newPassword}
              onChangeText={(event) => {
                const currentPassword = event.valueOf();
                setNewPassword(currentPassword);
                if (currentPassword?.length < 8) {
                  setNewPasswordError(
                    "Password must be at least 8 characters long"
                  );
                } else {
                  setNewPasswordError("");
                }
              }}
              secureTextEntry={seeNewPassword}
            />
            <View
              className={`pl-3 border-l-[1px] ${
                darkMode ? "border-l-[#6e6e6d]" : "border-l-[#c6c5c4]"
              }`}
              onTouchEnd={() => setSeeNewPassword(!seeNewPassword)}
            >
              {!seeNewPassword ? (
                <Feather
                  name="eye-off"
                  size={18}
                  color={darkMode ? "#6e6e6d" : "#4b4a4a"}
                />
              ) : (
                <Feather
                  name="eye"
                  size={18}
                  color={darkMode ? "#6e6e6d" : "#4b4a4a"}
                />
              )}
            </View>
          </View>
          {newPasswordError && (
            <Text
              className={`text-[12px] ${
                darkMode ? "text-[#ff0000]" : "text-[#ff0000]"
              }`}
              style={{
                fontFamily: "RobotoBold",
              }}
            >
              {newPasswordError}
            </Text>
          )}
        </View>
        <View className="w-[100%] gap-[5px]">
          <Text
            className={`text-[15px] ${
              darkMode
                ? confirmPasswordError
                  ? "text-[#ff0000]"
                  : "text-[#7decc7]"
                : confirmPasswordError
                ? "text-[#ff0000]"
                : "text-[#1f8a66]"
            }`}
            style={{
              fontFamily: "RobotoBold",
            }}
          >
            Confirm Password
          </Text>
          <View
            className={`w-[100%] flex-row items-center justify-between border-b-[1px] pr-9 ${
              darkMode ? "border-b-[#7decc7]" : "border-b-[#1f8a66]"
            } `}
          >
            <TextInput
              className={`w-[100%] h-[40px] rounded-[2px] px-1 text-[16px] ${
                darkMode ? "text-[#fff]" : "text-[#000]"
              } font-semibold ${
                darkMode ? "caret-[#7decc7]" : "caret-[#1f8a66]"
              } ${confirmPasswordError && "border-b-[#ff0000]"}`}
              value={confirmPassword}
              onChangeText={(event) => {
                const currentPassword = event.valueOf();
                setConfirmPassword(currentPassword);
                if (!newPassword) {
                  return setNewPasswordError("Please enter a password");
                }
                if (currentPassword !== newPassword) {
                  setConfirmPasswordError(
                    "Confirm Password must match the above password"
                  );
                } else {
                  setConfirmPasswordError("");
                }
              }}
              secureTextEntry={seeConfirmPassword}
            />
            <View
              className={`pl-3 border-l-[1px] ${
                darkMode ? "border-l-[#6e6e6d]" : "border-l-[#c6c5c4]"
              }`}
              onTouchEnd={() => setSeeConfirmPassword(!seeConfirmPassword)}
            >
              {!seeConfirmPassword ? (
                <Feather
                  name="eye-off"
                  size={18}
                  color={darkMode ? "#6e6e6d" : "#4b4a4a"}
                />
              ) : (
                <Feather
                  name="eye"
                  size={18}
                  color={darkMode ? "#6e6e6d" : "#4b4a4a"}
                />
              )}
            </View>
          </View>
          {confirmPasswordError && (
            <Text
              className={`text-[12px] ${
                darkMode ? "text-[#ff0000]" : "text-[#ff0000]"
              }`}
              style={{
                fontFamily: "RobotoBold",
              }}
            >
              {confirmPasswordError}
            </Text>
          )}
        </View>
      </View>
      <View className="w-[100%%] items-center justify-center gap-2 mt-[20px]">
        <TouchableOpacity
          className={`w-[100%] items-center justify-center p-[14px] ${
            !allChecked ? "bg-[rgba(0,0,0,0.05)]" : "bg-[#1f8a66]"
          } rounded-[12px]`}
          disabled={!allChecked}
        >
          <Text
            className={`text-[16px] ${
              !allChecked ? "text-[#9e9d9d]" : "text-[#fff]"
            }`}
            style={{
              fontFamily: "RobotoBold",
            }}
            onPress={updatePassword}
          >
            Update Password
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ResetPasswordComponent;
