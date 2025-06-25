import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "expo-router";
import Loading from "@/customComponents/Loading/Loading";
import MessageHandler from "@/customComponents/MessageHandler/MessageHandler";
import { useLoginMutation } from "@/Utils/redux/apiQuery/authApi";
import TextInputField from "./components/global/TextInputField";
import { FormProvider, useForm } from "react-hook-form";
import { Login_Interface_Types } from "@/types/loginInterface.types";
import VerificationEmailComponent from "@/customComponents/VerificationEmailComponent/VerificationEmailComponent";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
  const [view, setView] = useState<Login_Interface_Types>(
    Login_Interface_Types.login_interface
  );
  const [loginUser, { isLoading, isSuccess }] = useLoginMutation();
  const [userEmail, setUserEmail] = useState<string>("");
  const darkMode = useSelector((state: any) => state.theme?.darkTheme);
  const [allChecked, setAllChecked] = useState<boolean>(false);
  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  const email = methods.watch("email");
  const password = methods.watch("password");
  const isValid = methods.formState.isValid;
  useEffect(() => {
    if (email && password && isValid) {
      setAllChecked(true);
    } else {
      setAllChecked(false);
    }
  }, [email, password, isValid]);

  // Form Submit
  const onSubmit = async (data: any) => {
    try {
      await loginUser(data).unwrap();
      setView(Login_Interface_Types.verification_interface);
    } catch (error: any) {
      console.log("Login error===>", error);
      if (error?.message == "No account found with this email") {
        methods.setError("email", {
          message: "No account found with this email",
        });
      }
      if (error?.message == "Incorrect password") {
        methods.setError("password", { message: "Incorrect password" });
      }
    }
  };

  const type = "code_verification";
  // rendered content
  const renderedContent = () => {
    switch (view) {
      case Login_Interface_Types.login_interface:
        return (
          <View className={`flex-1`}>
            {/* header text  */}
            <View className="flex-[0.5] items-center justify-center w-[100%] py-4 pt-0 px-4 gap-4">
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
                Welcome back! Sign in using your email address and continue to
                chat
              </Text>
            </View>
            {/* Form Input  */}
            <View className="flex-[1.5] items-center w-[100%] px-6 gap-[50px] mt-[30px]">
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
                onChangeValue={(value) => setUserEmail(value)}
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
            </View>
            {/* Footer Buttons  */}
            <View className="flex-[0.4] w-[100%] px-4 gap-[15px]">
              <View className="w-[100%%] items-center justify-center gap-2 px-[1px]">
                <TouchableOpacity
                  className={`w-[100%] items-center justify-center p-[14px] ${
                    !allChecked ? "bg-[rgba(0,0,0,0.05)]" : "bg-[#1f8a66]"
                  } rounded-[12px] ${isLoading ? "opacity-30" : "opacity-100"}`}
                  disabled={!allChecked || isLoading}
                  onPress={methods.handleSubmit(onSubmit)}
                >
                  <Text
                    className={`text-[16px] ${
                      !allChecked ? "text-[#9e9d9d]" : "text-[#fff]"
                    } `}
                    style={{
                      fontFamily: "RobotoBold",
                    }}
                  >
                    {isLoading ? "Processing..." : "Login"}
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
        );

      case Login_Interface_Types.verification_interface:
        return (
          <View className="flex-1 relative">
            <View className="flex-[0.3] items-center justify-center w-[100%] py-4 px-4 gap-4 my-[30px]">
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
                Please enter the verification code below sent to your email to
                complete registration.
              </Text>
            </View>
            <VerificationEmailComponent
              email={userEmail}
              type={type}
              authType="login"
              setView={setView}
            />
          </View>
        );
    }
  };
  return (
    <>
      <FormProvider {...methods}>
        <SafeAreaView className="flex-1">
          {renderedContent()}
        </SafeAreaView> 
      </FormProvider>
      {isLoading && (
        <View className="absolute top-0 left-0 w-[100%] h-[100%]">
          <Loading text="Loging in..." />
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
          <MessageHandler message="Verify your account" />
        </View>
      )}
    </>
  );
};

export default Login;
