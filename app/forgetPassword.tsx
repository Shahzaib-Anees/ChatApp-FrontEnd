import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Forget_Password_Types } from "@/types/forgetPassword.types";
import { useSelector } from "react-redux";
import VerificationCodeComponent from "@/customComponents/VerificationCodeComponent/VerificationCodeComponent";
import ResetPasswordComponent from "@/customComponents/ResetPasswordComponent/ResetPasswordComponent";
import axios from "axios";
import Loading from "@/customComponents/Loading/Loading";

const forgetPassword = () => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const selector = useSelector((state: any) => state.theme);
  const [requestProceed, setRequestProceed] = useState<boolean>(false);
  const type = "password_reset";
  const [view, setView] = useState<Forget_Password_Types>(
    Forget_Password_Types.email_interface
  );
  const [emailChecked, setEmailChecked] = useState<boolean>(false);
  const [userEmailError, setUserEmailError] = useState<string>("");

  // Checking for DarkMode
  useEffect(() => {
    const { darkTheme } = selector;
    if (darkTheme) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  // Email Checked
  useEffect(() => {
    if (userEmail) {
      if (!userEmailError) {
        setEmailChecked(true);
      } else {
        setEmailChecked(false);
      }
    } else {
      setEmailChecked(false);
    }
  }, [userEmail, userEmailError]);

  // Requset Code after finding account
  const requestCode = async () => {
    setRequestProceed(true);
    try {
      const apiResponse = await axios.post(
        "https://chat-app-server-drab.vercel.app/api/user/sentCode",
        {
          email: userEmail,
          type: type,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (apiResponse.status === 200) {
        setView(Forget_Password_Types.code_interface);
      }
    } catch (error: any) {
      if (error.response.status === 404) {
        setUserEmailError("Account not found");
      }
    } finally {
      setRequestProceed(false);
    }
  };

  const renderedContent = () => {
    switch (view) {
      case Forget_Password_Types.email_interface:
        return (
          <View className="w-[100%] items-center justify-center mt-6 px-6">
            <View className="w-[100%] gap-[2px] mt-4 py-3">
              <Text
                className={`text-[24px] ${
                  darkMode ? "text-[#fff]" : "text-[#000]"
                } tracking-wider`}
                style={{
                  fontFamily: "PoppinsBold",
                }}
              >
                Forgot Password
              </Text>
              <Text
                className={`text-[16px] ${
                  darkMode ? "text-[#c6c5c4]" : "text-[#868686]"
                }`}
                style={{
                  fontFamily: "PoppinsSemiBold",
                }}
              >
                Please enter your email address to reset your password
              </Text>
            </View>
            <View className="w-[100%] gap-[2px] mt-7 py-3">
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
              <View>
                <TextInput
                  className={`w-[100%] h-[40px] rounded-[2px] px-1 text-[16px] ${
                    darkMode ? "text-[#fff]" : "text-[#000]"
                  } font-semibold ${
                    darkMode ? "caret-[#7decc7]" : "caret-[#1f8a66]"
                  } border-b-[2px] ${
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
            </View>
            {/* Footer Buttons  */}
            <View className="w-[100%%] items-center justify-center mt-7">
              <TouchableOpacity
                className={`w-[100%] items-center justify-center p-[14px] ${
                  !emailChecked ? "bg-[rgba(0,0,0,0.05)]" : "bg-[#1f8a66]"
                } rounded-[12px] ${
                  requestProceed ? "opacity-30" : "opacity-100"
                } `}
                disabled={!emailChecked || requestProceed}
                onPress={requestCode}
              >
                <Text
                  className={`text-[16px] ${
                    !emailChecked ? "text-[#9e9d9d]" : "text-[#fff]"
                  }`}
                  style={{
                    fontFamily: "RobotoBold",
                  }}
                >
                  {requestProceed ? "Finding..." : "Find my account"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      case Forget_Password_Types.code_interface:
        return (
          <View className="flex-1 relative">
            {/* Header Text Container  */}
            <View className="w-[100%] gap-[2px] mt-4 px-6 py-3">
              <Text
                className={`text-[24px] ${
                  darkMode ? "text-[#fff]" : "text-[#000]"
                } tracking-wider`}
                style={{
                  fontFamily: "PoppinsBold",
                }}
              >
                Check your Email
              </Text>
              <Text
                className={`text-[16px] ${
                  darkMode ? "text-[#c6c5c4]" : "text-[#868686]"
                }`}
                style={{
                  fontFamily: "PoppinsSemiBold",
                }}
              >
                We have sent a reset link to{" "}
                <Text className={`${darkMode ? "text-[#fff]" : "text-[#333]"}`}>
                  {userEmail}
                </Text>{" "}
                enter 5 digit code that is mentioned in the email.
              </Text>
            </View>
            <VerificationCodeComponent
              email={userEmail}
              type={type}
              darkMode={darkMode}
              setView={setView}
            />
          </View>
        );
      case Forget_Password_Types.reset_password:
        return (
          <View className="flex-1 relative">
            <ResetPasswordComponent darkMode={darkMode} email={userEmail} />
          </View>
        );
    }
  };
  return (
    <>
      <View className={`flex-1`}>{renderedContent()}</View>
      {requestProceed && (
        <View className="absolute top-0 left-0 w-[100%] h-[100%]">
          <Loading text="Finding account..." />
        </View>
      )}
    </>
  );
};

export default forgetPassword;
