import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Feather from "@expo/vector-icons/Feather";
import { Link } from "expo-router";
import axios from "axios";
import Loading from "@/customComponents/Loading/Loading";
import MessageHandler from "@/customComponents/MessageHandler/MessageHandler";

const Login = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const selector = useSelector((state: any) => state.theme);
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [seePassword, setSeePassword] = useState<boolean>(true);
  const [userEmailError, setUserEmailError] = useState<string>("");
  const [userPasswordError, setUserPasswordError] = useState<string>("");
  const [allChecked, setAllChecked] = useState<boolean>(false);
  const [processingRequest, setProcessingRequest] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    const { darkTheme } = selector;
    if (darkTheme) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, [selector]);

  useEffect(() => {
    if (userEmail && userPassword) {
      if (!userEmailError && !userPasswordError) {
        setAllChecked(true);
      } else {
        setAllChecked(false);
      }
    } else {
      setAllChecked(false);
    }
  }, [userEmail, userPassword, userEmailError, userPasswordError]);
  const submitInfo = async () => {
    setProcessingRequest(true);
    const userData = {
      email: userEmail,
      password: userPassword,
    };
    setProcessingRequest(true);
    try {
      const apiResponse = await axios.post(
        "https://chat-app-server-drab.vercel.app/api/user/login",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (apiResponse.status == 200) {
        console.log("Login successful");
        setIsLoggedIn(true);
      }
    } catch (error: any) {
      if (error.response?.data.message == "No account found with this email") {
        setUserEmailError("No account found with this email");
      }
      if (error.response?.data.message == "Incorrect password") {
        setUserPasswordError("Incorrect password");
      }
    } finally {
      setProcessingRequest(false);
    }
  };
  return (
    <>
      <View className={`flex-1`}>
        {/* header text  */}
        <View className="flex-[0.5] items-center justify-center w-[100%] py-4 px-4 gap-4 mt-[20px]">
          <View className="flex-row items-center justify-center gap-2">
            <View className="relative items-center justify-center">
              <Text
                className={`${
                  !darkMode ? "text-[#000]" : "text-[#7decc7]"
                } text-[30px]  relative z-[1]`}
                style={{ fontFamily: "PoppinsExtraBold" }}
              >
                Log in
              </Text>
              <View
                className={`w-[100%] h-[10px] ${
                  !darkMode ? "bg-[#7decc7]" : "bg-[#474747]"
                }  absolute bottom-[6px] z-0`}
              ></View>
            </View>
            <Text
              className={`${
                !darkMode ? "text-[#000]" : "text-[#7decc7]"
              } text-[30px]`}
              style={{
                fontFamily: "PoppinsExtraBold",
              }}
            >
              to Chatbox
            </Text>
          </View>
          <Text
            className={`text-center text-[18px] ${
              !darkMode ? "text-[#a1a1a1]" : "text-[#fff]"
            } leading-[25px] font-semibold tracking-wider`}
          >
            Welcome back! Sign in using your email address and continue to chat
          </Text>
        </View>
        {/* Form Input  */}
        <View className="flex-[1.5] items-center w-[100%] px-6 gap-[50px] mt-[30px]">
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
              } w-[100%]`}
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
              <Text className="text-[12px] text-[#ff0000]">
                {userEmailError}
              </Text>
            )}
          </View>
          <View className="w-[100%] gap-[5px]">
            <Text
              className={`text-[15px] ${
                darkMode ? "text-[#7decc7]" : "text-[#1f8a66]"
              } w-[100%]   ${userPasswordError && "text-[#ff0000]"}`}
              style={{
                fontFamily: "RobotoBold",
              }}
            >
              Your Password
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
                } `}
                value={userPassword}
                onChangeText={(text: string) => {
                  setUserPassword(text);
                  if (text.length < 6) {
                    setUserPasswordError(
                      "Password must be at least 6 characters long"
                    );
                  } else {
                    setUserPasswordError("");
                  }
                }}
                secureTextEntry={seePassword}
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
        </View>
        {/* Footer Buttons  */}
        <View className="flex-[0.4] w-[100%] px-4 gap-[15px]">
          <View className="w-[100%%] items-center justify-center gap-2 px-[1px]">
            <TouchableOpacity
              className={`w-[100%] items-center justify-center p-[14px] ${
                !allChecked ? "bg-[rgba(0,0,0,0.05)]" : "bg-[#1f8a66]"
              } rounded-[12px] ${
                processingRequest ? "opacity-30" : "opacity-100"
              }`}
              disabled={!allChecked || processingRequest}
              onPress={submitInfo}
            >
              <Text
                className={`text-[16px] ${
                  !allChecked ? "text-[#9e9d9d]" : "text-[#fff]"
                } `}
                style={{
                  fontFamily: "RobotoBold",
                }}
              >
                {processingRequest ? "Processing..." : "Login"}
              </Text>
            </TouchableOpacity>
          </View>
          <Link
            href={"/forgetPassword"}
            className="w-[100%] items-center justify-center px-[1px]"
          >
            <Text
              className={`${
                darkMode ? "text-[#7decc7]" : "text-[#1f8a66]"
              } text-[16px] tracking-wider text-center`}
              style={{
                fontFamily: "RobotoBold",
              }}
            >
              Forgot password?
            </Text>
          </Link>
        </View>
      </View>
      {processingRequest && (
        <View className="absolute top-0 left-0 w-[100%] h-[100%]">
          <Loading text="Loging in..." />
        </View>
      )}
      {isLoggedIn && (
        <View
          className="w-[100%] items-center justify-center"
          style={{
            position: "absolute",
            bottom: 40,
          }}
        >
          <MessageHandler message="Logged in successfully" />
        </View>
      )}
    </>
  );
};

export default Login;
