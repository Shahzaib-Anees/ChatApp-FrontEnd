import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import "../../global.css";
import axios from "axios";
import Loading from "../Loading/Loading";
import MessageHandler from "../MessageHandler/MessageHandler";
import { FormProvider, useForm } from "react-hook-form";
import { useResetPasswordMutation } from "@/Utils/redux/apiQuery/authApi";
import TextInputField from "@/app/components/global/TextInputField";
import { router } from "expo-router";

const ResetPasswordComponent = ({
  email,
  darkMode,
}: {
  email: string;
  darkMode: boolean;
}) => {
  const [password, setPassword] = useState<string>("");
  const [allChecked, setAllChecked] = useState<boolean>(false);

  const [resetPassword, { isLoading, isSuccess }] = useResetPasswordMutation();

  const methods = useForm({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = methods.watch("newPassword");
  const confirmPassword = methods.watch("confirmPassword");
  const isValid = methods.formState.isValid && password === confirmPassword;

  // Password Validation Check Mark
  useEffect(() => {
    if (newPassword && confirmPassword && isValid) {
      setAllChecked(true);
    } else {
      setAllChecked(false);
    }
  }, [newPassword, confirmPassword, isValid]);
  const onSubmit = async (data: any) => {
    try {
      const apiResponse: any = await resetPassword({
        email: email,
        password: data?.newPassword,
      }).unwrap();
      if (apiResponse?.message === "Password updated successfully") {
        console.log(apiResponse);
        // Yahan se route karna hai login page pe
        router.replace("/Login");
      }
    } catch (error: any) {
      if (
        error?.message ==
        "New Password cannot be the same as the previous password"
      ) {
        methods.setError("newPassword", {
          message: "New Password cannot be the same as the previous password",
        });
      }
    }
  };
  return (
    <>
      <FormProvider {...methods}>
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
              Create a new password. Ensure it differs from your previous ones
              for security.
            </Text>
          </View>
          {/* Input fields Container  */}
          <View className="items-center w-[100%] gap-[50px] mt-[30px]">
            {/* Password Input  */}
            <TextInputField
              name="newPassword"
              label="Password"
              secureTextEntry={true}
              required={true}
              validationError="Password is required"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              }}
              onChangeValue={(value) => {
                setPassword(value);
              }}
              type="password"
            />
            {/* Confirm Password Input  */}
            <TextInputField
              name="confirmPassword"
              label="Confirm Password"
              secureTextEntry={true}
              required={true}
              validationError="Confirm Password is required"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              }}
              onChangeValue={(value) => {
                console.log("Value===>", value);
                console.log("Password===>", password);
                if (value != password) {
                  methods.setError("confirmPassword", {
                    message: "Confirm password must match original password",
                  });
                } else {
                  methods.clearErrors("confirmPassword");
                }
              }}
              type="password"
            />
          </View>
          <View className="w-[100%%] items-center justify-center gap-2 mt-[20px]">
            <TouchableOpacity
              className={`w-[100%] items-center justify-center p-[14px] ${
                !allChecked ? "bg-[rgba(0,0,0,0.05)]" : "bg-[#1f8a66]"
              } rounded-[12px]`}
              disabled={!allChecked || isLoading}
              onPress={methods.handleSubmit(onSubmit)}
            >
              <Text
                className={`text-[16px] ${
                  !allChecked ? "text-[#9e9d9d]" : "text-[#fff]"
                }`}
                style={{
                  fontFamily: "RobotoBold",
                }}
              >
                {isLoading ? "Updating" : "Update Password"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {isLoading && (
          <View className="absolute top-0 left-0 w-[100%] h-[100%]">
            <Loading text="Reseting..." />
          </View>
        )}
        {isSuccess && (
          <View
            className="w-[100%] items-center justify-center"
            style={{
              position: "absolute",
              bottom: 40,
            }}
          >
            <MessageHandler message="Password reset successfully" />
          </View>
        )}
      </FormProvider>
    </>
  );
};

export default ResetPasswordComponent;
