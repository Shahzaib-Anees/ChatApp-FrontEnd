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
import axios from "axios";
import { Register_Interface_Types } from "@/types/registerInterface.types";
import VerificationEmailComponent from "@/customComponents/VerificationEmailComponent/VerificationEmailComponent";
import "@/global.css";
import Loading from "@/customComponents/Loading/Loading";
import { FormProvider, useForm } from "react-hook-form";
import TextInputField from "./components/global/TextInputField";
import {
  useOtpRequestMutation,
  useRegisterMutation,
} from "@/Utils/redux/apiQuery/authApi";
import { SafeAreaView } from "react-native-safe-area-context";

const Register = () => {
  const darkMode = useSelector((state: any) => state.theme?.darkTheme);
  const [view, setView] = useState<Register_Interface_Types>(
    Register_Interface_Types.register_interface
  );
  const [userEmail, setUserEmail] = useState<string>("");
  const [allChecked, setAllChecked] = useState<boolean>(false);
  const [register, { isLoading, isSuccess }] = useRegisterMutation();
  const [requestCode, { isLoading: codeRequestProcessing }] =
    useOtpRequestMutation();
  const type = "email_verification";

  const methods = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const name = methods.watch("username");
  const email = methods.watch("email");
  const password = methods.watch("password");
  const isValid = methods.formState.isValid;

  // Check Mark
  useEffect(() => {
    if (name && email && password && isValid) {
      setAllChecked(true);
    } else {
      setAllChecked(false);
    }
  }, [name, email, password, isValid]);

  const onSubmit = async (data: any) => {
    try {
      const apiResponse = await register(data).unwrap();
      if (apiResponse?.message == "Please check your email for verification") {
        setView(Register_Interface_Types.verification_interface);
      }
    } catch (error: any) {
      if (error?.message == "Email already taken") {
        methods.setError("email", { message: "Email already exists" });
      } else if (error?.message == "User name already taken") {
        methods.setError("username", { message: "Name already exists" });
      }
    }
  };

  const renderedContent = () => {
    switch (view) {
      case Register_Interface_Types.register_interface:
        return (
          <View className="flex-1">
            <View className="flex-[0.3] items-center justify-center w-[100%] py-4 pt-0 px-4 gap-4 ">
              <View className="flex-row items-center justify-center gap-2">
                <Text
                  className={`${
                    !darkMode ? "text-darkestBlack" : "text-lightGreen"
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
                      !darkMode ? "text-darkestBlack" : "text-lightGreen"
                    } text-[30px]  relative z-[1]`}
                    style={{ fontFamily: "PoppinsExtraBold" }}
                  >
                    Email
                  </Text>
                  <View
                    className={`w-[100%] h-[10px] ${
                      !darkMode ? "bg-[var(--light-green)]" : "bg-[#474747]"
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
                marginTop: 20,
                paddingHorizontal: 24,
              }}
              className="flex-[1.5]"
            >
              {/* Name Input  */}
              <TextInputField
                label="Your Name"
                name="username"
                secureTextEntry={false}
                rules={{
                  required: "Name is required",
                }}
                type="text"
              />
              {/* Email Input  */}
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
                onChangeValue={(text: string) => {
                  setUserEmail(text);
                }}
                type="email"
              />
              {/* Password Input  */}
              <TextInputField
                name="password"
                label="Your Password"
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
                type="password"
              />
            </ScrollView>
            {/* Footer Buttons  */}
            <View className="w-[100%] px-4 gap-[15px] pb-4">
              <TouchableOpacity
                className={`w-[100%] items-center justify-center p-[14px] ${
                  !allChecked ? "bg-[rgba(0,0,0,0.05)]" : "bg-darkGreen"
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
                  {isLoading ? "Creating..." : "Create an account"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      case Register_Interface_Types.verification_interface:
        return (
          <View className="flex-1 relative">
            <View className="flex-[0.3] items-center justify-center w-[100%] py-4 px-4 gap-4 my-[30px]">
              <View className="flex-row items-center justify-center gap-2">
                <Text
                  className={`${
                    !darkMode ? "text-darkestBlack" : "text-lightGreen"
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
                      !darkMode ? "text-darkestBlack" : "text-lightGreen"
                    } text-[30px]  relative z-[1]`}
                    style={{ fontFamily: "PoppinsExtraBold" }}
                  >
                    Email
                  </Text>
                  <View
                    className={`w-[100%] h-[10px] ${
                      !darkMode ? "bg-[var(--light-green)]" : "bg-[#474747]"
                    }  absolute bottom-[6px] z-0`}
                  ></View>
                </View>
              </View>
              <Text
                className={`text-center text-[18px] ${
                  !darkMode ? "text-[#a1a1a1]" : "text-[#fff]"
                } leading-[25px] font-semibold tracking-wider`}
              >
                Please enter the verification code below sent to your email to
                complete registration.
              </Text>
            </View>
            <VerificationEmailComponent
              email={userEmail}
              type={type}
              setView={setView}
              authType="register"
            />
          </View>
        );
    }
  };
  return (
    <>
      <FormProvider {...methods}>
        <SafeAreaView className="flex-1">{renderedContent()}</SafeAreaView>
        {isLoading && (
          <View className="absolute top-0 left-0 w-[100%] h-[100%]">
            <Loading text="Creating account..." />
          </View>
        )}
      </FormProvider>
    </>
  );
};
export default Register;
