import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Forget_Password_Types } from "@/types/forgetPassword.types";
import { useSelector } from "react-redux";
import ResetPasswordComponent from "@/customComponents/ResetPasswordComponent/ResetPasswordComponent";
import axios from "axios";
import Loading from "@/customComponents/Loading/Loading";
import { FormProvider, useForm } from "react-hook-form";
import TextInputField from "./components/global/TextInputField";
import {
  useOtpRequestMutation,
  useVerifyOtpMutation,
} from "@/Utils/redux/apiQuery/authApi";
import MessageHandler from "@/customComponents/MessageHandler/MessageHandler";
import VerificationEmailComponent from "@/customComponents/VerificationEmailComponent/VerificationEmailComponent";

const forgetPassword = () => {
  const [userEmail, setUserEmail] = useState<string>("");
  const darkMode = useSelector((state: any) => state.theme?.darkTheme);
  const type = "password_reset";
  const [view, setView] = useState<Forget_Password_Types>(
    Forget_Password_Types.email_interface
  );
  const [emailChecked, setEmailChecked] = useState<boolean>(false);
  const [requestOtp, { isLoading, isSuccess }] = useOtpRequestMutation();

  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const email = methods.watch("email");
  const isValid = methods.formState.isValid;

  // Email Validation CheckedMark
  useEffect(() => {
    if (email && isValid) {
      setEmailChecked(true);
    } else {
      setEmailChecked(false);
    }
  }, [email, isValid]);

  // Requset Code after finding account
  const onSubmit = async (data: any) => {
    try {
      const apiResponse: any = await requestOtp({
        email: data?.email,
        type: type,
      }).unwrap();
      setView(Forget_Password_Types.code_interface);
    } catch (error: any) {
      if (error?.message === "No account found with this email") {
        methods.setError("email", {
          message: "No account found with this email",
        });
      }
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
            {/* Email Input Field  */}
            <TextInputField
              label="Your Email"
              name="email"
              secureTextEntry={false}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message:
                    "Your email should be in the format of abc@example.com",
                },
              }}
              onChangeValue={(value: string) => {
                setUserEmail(value);
              }}
              type="email"
            />
            {/* Footer Buttons  */}
            <View className="w-[100%%] items-center justify-center mt-7">
              <TouchableOpacity
                className={`w-[100%] items-center justify-center p-[14px] ${
                  !emailChecked ? "bg-[rgba(0,0,0,0.05)]" : "bg-[#1f8a66]"
                } rounded-[12px] ${isLoading ? "opacity-30" : "opacity-100"} `}
                disabled={!emailChecked || isLoading}
                onPress={methods.handleSubmit(onSubmit)}
              >
                <Text
                  className={`text-[16px] ${
                    !emailChecked ? "text-[#9e9d9d]" : "text-[#fff]"
                  }`}
                  style={{
                    fontFamily: "RobotoBold",
                  }}
                >
                  {isLoading ? "Finding..." : "Find my account"}
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
            <VerificationEmailComponent
              authType="forgetPassword"
              email={userEmail}
              setView={setView}
              type={"code_verification"}
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
      <FormProvider {...methods}>
        <View className={`flex-1`}>{renderedContent()}</View>
      </FormProvider>
      {isLoading && (
        <View className="absolute top-0 left-0 w-[100%] h-[100%]">
          <Loading text="Finding account..." />
        </View>
      )}
      {isSuccess && (
        <View
          className="w-[100%] items-center justify-center"
          style={{
            position: "absolute",
            bottom: 40,
            zIndex: 4,
          }}
        >
          <MessageHandler message="Code sent successfully" />
        </View>
      )}
    </>
  );
};

export default forgetPassword;
