import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import { useSelector } from "react-redux";

const Register = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const selector = useSelector((state: any) => state.theme);
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [seePassword, setSeePassword] = useState<boolean>(true);
  const [allChecked, setAllChecked] = useState<boolean>(false);
  const [userNameError, setUserNameError] = useState<string>("");
  const [userEmailError, setUserEmailError] = useState<string>("");
  const [userPasswordError, setUserPasswordError] = useState<string>("");

  useEffect(() => {
    const { darkTheme } = selector;
    if (darkTheme) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, [selector]);

  useEffect(() => {
    if (userName && userEmail && userPassword) {
      if (!userNameError && !userEmailError && !userPasswordError) {
        setAllChecked(true);
      } else {
        setAllChecked(false);
      }
    } else {
      setAllChecked(false);
    }
  }, [userNameError, userEmailError, userPasswordError]);
  const submitInfo = () => {
    console.log(userName, userEmail, userPassword);
    
  };
  return (
    <View className={`flex-1`}>
      {/* header text  */}
      <View className="flex-[0.3] items-center justify-center w-[100%] py-4 px-4 gap-4 my-[30px]">
        <View className="flex-row items-center justify-center gap-2">
          <Text
            className={`${
              !darkMode ? "text-[#000]" : "text-[#7decc7]"
            } text-[30px]`}
            style={{
              fontFamily: "PoppinsExtraBold",
            }}
          >
            Sign Up with
          </Text>
          <View className="relative items-center justify-center">
            <Text
              className={`${
                !darkMode ? "text-[#000]" : "text-[#7decc7]"
              } text-[30px]  relative z-[1]`}
              style={{ fontFamily: "PoppinsExtraBold" }}
            >
              Email
            </Text>
            <View
              className={`w-[100%] h-[10px] ${
                !darkMode ? "bg-[#7decc7]" : "bg-[#474747]"
              }  absolute bottom-[6px] z-0`}
            ></View>
          </View>
        </View>
        <Text
          className={`text-center text-[18px] ${
            !darkMode ? "text-[#a1a1a1]" : "text-[#fff]"
          } leading-[25px] font-semibold tracking-wider`}
        >
          Get started to chat with friends and family today by joining our
          chatapp
        </Text>
      </View>
      {/* Form Input  */}
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          gap: 50,
          marginTop: 2,
          paddingHorizontal: 24,
        }}
        className="flex-[1.5]"
      >
        <View className="w-[100%] gap-[5px]">
          <Text
            className={`text-[15px] ${
              darkMode
                ? userNameError
                  ? "text-[#ff0000]"
                  : "text-[#7decc7]"
                : userNameError
                ? "text-[#ff0000]"
                : "text-[#1f8a66]"
            } w-[100%]`}
            style={{
              fontFamily: "RobotoBold",
            }}
          >
            Your Name
          </Text>
          <TextInput
            className={`w-[100%] h-[40px] rounded-[2px] px-1 text-[16px] ${
              darkMode ? "text-[#fff]" : "text-[#000]"
            } font-semibold ${
              darkMode ? "caret-[#7decc7]" : "caret-[#1f8a66]"
            } border-b-[1px] ${
              darkMode ? "border-b-[#7decc7]" : "border-b-[#1f8a66]"
            } ${userNameError && "border-b-[#ff0000]"}`}
            value={userName}
            onChangeText={setUserName}
          />
          {userNameError && (
            <Text className="text-[12px] text-[#ff0000]">{userNameError}</Text>
          )}
        </View>
        <View className="w-[100%] gap-[5px]">
          <Text
            className={`text-[15px] ${
              darkMode
                ? userEmailError
                  ? "text-[#ff0000]"
                  : "text-[#7decc7]"
                : userEmailError
                ? "text-[#ff0000]"
                : "text-[#1f8a66]"
            } w-[100%] ${userEmailError && "border-b-[#ff0000]"}`}
            style={{
              fontFamily: "RobotoBold",
            }}
          >
            Your Email
          </Text>
          <TextInput
            className={`w-[100%] h-[40px] rounded-[2px] px-1 text-[16px] ${
              darkMode ? "text-[#fff]" : "text-[#000]"
            } font-semibold ${
              darkMode ? "caret-[#7decc7]" : "caret-[#1f8a66]"
            } border-b-[1px] ${
              darkMode ? "border-b-[#7decc7]" : "border-b-[#1f8a66]"
            } ${userEmailError && "border-b-[#ff0000]"}`}
            value={userEmail}
            onChangeText={(event) => {
              const currentEmail = event.valueOf();
              setUserEmail(currentEmail);

              if (
                !currentEmail.includes("@") ||
                !currentEmail.includes(".com")
              ) {
                setUserEmailError(
                  "Your email should be in the format of abc@example.com"
                );
              } else {
                setUserEmailError("");
              }
            }}
          />
          {userEmailError && (
            <Text className="text-[12px] text-[#ff0000]">{userEmailError}</Text>
          )}
        </View>
        <View className="w-[100%] gap-[5px]">
          <Text
            className={`text-[15px] ${
              darkMode
                ? userPasswordError
                  ? "text-[#ff0000]"
                  : "text-[#7decc7]"
                : userPasswordError
                ? "text-[#ff0000]"
                : "text-[#1f8a66]"
            } w-[100%]`}
            style={{
              fontFamily: "RobotoBold",
            }}
          >
            Set Password
          </Text>
          <View
            className={`w-[100%] flex-row items-center justify-between border-b-[1px] pr-9 ${
              darkMode ? "border-b-[#7decc7]" : "border-b-[#1f8a66]"
            } ${userPasswordError && "border-b-[#ff0000]"}`}
          >
            <TextInput
              className={`w-[100%] h-[40px] rounded-[2px] px-1 text-[16px] ${
                darkMode ? "text-[#fff]" : "text-[#000]"
              } font-semibold ${
                darkMode ? "caret-[#7decc7]" : "caret-[#1f8a66]"
              }`}
              value={userPassword}
              secureTextEntry={seePassword}
              onChangeText={(event) => {
                const currentPassword = event.valueOf();
                setUserPassword(currentPassword);
                if (currentPassword?.length < 8) {
                  setUserPasswordError(
                    "Password must be at least 8 characters long"
                  );
                } else {
                  setUserPasswordError("");
                }
              }}
            />
            <View
              className={`pl-3 border-l-[1px] ${
                darkMode ? "border-l-[#6e6e6d]" : "border-l-[#c6c5c4]"
              }`}
              onTouchEnd={() => setSeePassword(!seePassword)}
            >
              {!seePassword ? (
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
          {userPasswordError && (
            <Text className="text-[12px] text-[#ff0000]">
              {userPasswordError}
            </Text>
          )}
        </View>
      </ScrollView>
      {/* Footer Buttons  */}
      <View className="w-[100%] px-4 gap-[15px] pb-2">
        <View className="w-[100%%] items-center justify-center gap-2 px-[1px]">
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
              onPress={submitInfo}
            >
              Create an account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default Register;
