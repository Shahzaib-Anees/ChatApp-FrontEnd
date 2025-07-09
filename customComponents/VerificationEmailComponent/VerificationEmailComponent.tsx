import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Register_Interface_Types } from "@/types/registerInterface.types";
import axios from "axios";
import "@/global.css";
import Loading from "../Loading/Loading";
import MessageHandler from "../MessageHandler/MessageHandler";
import { Login_Interface_Types } from "@/types/loginInterface.types";
import { Forget_Password_Types } from "@/types/forgetPassword.types";
import {
  useOtpRequestMutation,
  useVerifyOtpMutation,
} from "@/Utils/redux/apiQuery/authApi";
import { useDispatch, useSelector } from "react-redux";
// import { fetchUserDetails } from "@/Utils/redux/reducers/user.slice";
import { router } from "expo-router";

type AuthTypes = "register" | "login" | "forgetPassword";

type SetViewTypes<T extends AuthTypes> = T extends "register"
  ? React.Dispatch<React.SetStateAction<Register_Interface_Types>>
  : T extends "login"
    ? React.Dispatch<React.SetStateAction<Login_Interface_Types>>
    : T extends "forgetPassword"
      ? React.Dispatch<React.SetStateAction<Forget_Password_Types>>
      : never;

interface VerificationEmailComponentProps<T extends AuthTypes = "register"> {
  email: string;
  type: string;
  authType: T;
  setView: SetViewTypes<T>;
}

const VerificationEmailComponent = <T extends AuthTypes = "register">({
  email,
  type,
  setView,
  authType = "register" as T,
}: VerificationEmailComponentProps<T>) => {
  const darkMode = useSelector((state: any) => state.theme?.darkTheme);
  const [otp, setOtp] = useState<string>("");
  const [codeChecked, setCodeChecked] = useState<boolean>(false);
  const [inputs, setInputs] = useState<string[]>(new Array(4).fill(""));
  const [count, setCount] = useState<number>(60);
  const [requestResendCode, setRequestResendCode] = useState<boolean>(false);
  const [verifyOtp, { isLoading, isSuccess: codeVerificationSuccess }] =
    useVerifyOtpMutation();
  const [
    reRequestOtp,
    { isLoading: requestOtpProcessing, isSuccess: otpRequestSuccess },
  ] = useOtpRequestMutation();
  const [messageHandlerMessage, setMessageHandlerMessage] =
    useState<string>("");
  //   Refrence Input Object
  const refInputs: { [key: string]: TextInput | null } = {};
  const handleChangeText = (input: string, index: number) => {
    if (/^[0-9]*$/.test(input)) {
      inputs[index] = input;
      setInputs([...inputs]);
    }

    if (input && index < inputs.length - 1) {
      const nextInput = `input-${index + 1}`;
      refInputs[nextInput]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !inputs[index] && index > 0) {
      const prevInput = `input-${index - 1}`;
      refInputs[prevInput]?.focus();
    }
  };

  useEffect(() => {
    // Check if all inputs are filled with numbers
    const isComplete = inputs.every((input) => /^[0-9]$/.test(input));
    if (isComplete) {
      const code = inputs.join("");
      setOtp(code);
      setCodeChecked(isComplete);
    } else {
      setCodeChecked(false);
    }
  }, [inputs]);

  useEffect(() => {
    setRequestResendCode(false);
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setRequestResendCode(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    if (count === 0) {
      setRequestResendCode(true);
    }
    return () => clearInterval(timer);
  }, [requestResendCode]);

  const dispatch: any = useDispatch();

  const verifyCode = async () => {
    try {
      const apiResponse = await verifyOtp({
        email: email,
        code: otp,
        type: type,
      }).unwrap();

      console.log("Api ==>", apiResponse);
      // dispatch(fetchUserDetails());
      if (authType === "register") {
        setMessageHandlerMessage("Registered Successfully");
        // Navigating to chat screen
        router.replace("/chatsTabs");
      } else if (authType === "login") {
        setMessageHandlerMessage("Logged In Successfully");
        console.log("Logged In Successfully");
        // Navigating to chat screen
        router.replace("/chatsTabs");
      } else if (authType === "forgetPassword") {
        setMessageHandlerMessage("Verified Successfully");
        // Navigating to Reset Password
        (
          setView as React.Dispatch<React.SetStateAction<Forget_Password_Types>>
        )(Forget_Password_Types.reset_password);
      }
    } catch (error: any) {
      setMessageHandlerMessage(error?.message);
      console.log(error);
    } finally {
      setInputs(new Array(4).fill(""));
      setTimeout(() => {
        refInputs["input-0"]?.focus();
      }, 0);
    }
  };

  const askNewCode = async () => {
    try {
      await reRequestOtp({
        email: email,
      }).unwrap();
      setMessageHandlerMessage("New Code Sent Successfully");
    } catch (error: any) {
      setMessageHandlerMessage(error?.message);
    } finally {
      setCount(60);
      setRequestResendCode(false);
    }
  };
  return (
    <>
      <View className="w-[100%]">
        <View className="w-[100%] gap-3">
          <View className="w-[100%] flex-row items-center justify-center gap-4">
            {inputs.map((digit, index) => {
              return (
                <TextInput
                  style={styles.input}
                  keyboardType="number-pad"
                  key={index}
                  value={digit}
                  maxLength={1}
                  ref={(input) => {
                    refInputs[`input-${index}`] = input;
                  }}
                  onChangeText={(input) => {
                    handleChangeText(input, index);
                  }}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  className={`${
                    darkMode ? "caret-[var(--light-green)]" : "caret-darkGreen"
                  } ${darkMode ? "text-[#fff]" : "text-darkestBlack"} font-semibold`}
                />
              );
            })}
          </View>
          <View className="w-[100%] px-4">
            {count > 0 && (
              <Text style={styles.conditionalText}>
                You can request a new code in{" "}
                <Text className="text-darkGreen text-[16px]">
                  {" "}
                  {`00 : ${count < 10 ? `0${count}` : `${count}`}`}
                </Text>
              </Text>
            )}
            {requestResendCode && (
              <Text style={styles.conditionalText}>
                Didn't receive the code?{" "}
                <Text
                  className="text-darkGreen text-[16px]"
                  onPress={askNewCode}
                >
                  Resend Code
                </Text>
              </Text>
            )}
          </View>
        </View>

        {/* Footer Buttons  */}
        <View className="w-[100%%] items-center justify-center mt-7 px-4">
          <TouchableOpacity
            className={`w-[100%] items-center justify-center p-[14px] ${
              !codeChecked ? "bg-[rgba(0,0,0,0.05)]" : "bg-darkGreen"
            } rounded-[12px] ${isLoading || requestOtpProcessing ? "opacity-30" : "opacity-100"}`}
            disabled={!codeChecked || isLoading || requestOtpProcessing}
            onPress={verifyCode}
          >
            <Text
              className={`text-[16px] ${
                !codeChecked ? "text-[#9e9d9d]" : "text-[#fff]"
              }`}
              style={{
                fontFamily: "RobotoBold",
              }}
            >
              {isLoading ? "Verifying..." : "Verify"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {(isLoading || requestOtpProcessing) && (
        <View className="absolute top-0 left-0 w-[100%] h-[100%]">
          <Loading
            text={!requestOtpProcessing ? "Verifying..." : "Sending..."}
          />
        </View>
      )}

      {(codeVerificationSuccess || otpRequestSuccess) && (
        <View
          className="w-[100%] items-center justify-center"
          style={{
            position: "absolute",
            bottom: 40,
          }}
        >
          <MessageHandler message={messageHandlerMessage} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 2,
    borderBottomColor: "darkGreen",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    width: 65,
    height: 50,
    padding: 0,
    margin: 0,
    backgroundColor: "transparent",
    borderRadius: 0,
  },

  conditionalText: {
    marginLeft: 10,
    marginTop: 10,
    fontSize: 15,
    color: `#9e9d9d`,
    fontFamily: "RobotoRegular",
    fontWeight: "400",
  },
});

export default VerificationEmailComponent;
