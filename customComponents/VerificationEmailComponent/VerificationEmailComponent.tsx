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

const VerificationEmailComponent = ({
  darkMode,
  email,
  type,
  setView,
}: {
  darkMode: boolean;
  email: string;
  type: string;
  setView: React.Dispatch<React.SetStateAction<Register_Interface_Types>>;
}) => {
  const [otp, setOtp] = useState<string>("");
  const [codeChecked, setCodeChecked] = useState<boolean>(false);
  const [inputs, setInputs] = useState<string[]>(new Array(4).fill(""));
  const [count, setCount] = useState<number>(60);
  const [requestResendCode, setRequestResendCode] = useState<boolean>(false);
  const [requestProceed, setRequestProceed] = useState<boolean>(false);
  const [registeredSuccess, setRegisteredSuccess] = useState<boolean>(false);
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

  const verifyCode = async () => {
    setRequestProceed(true);
    try {
      const apiResponse = await axios.post(
        "https://chat-app-server-drab.vercel.app/api/user/verifyCode",
        {
          email: email,
          code: otp,
          type: type,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(apiResponse.data);
      if (apiResponse.status === 200) {
        setRegisteredSuccess(true);
        // Yahin se naviagte krna hai
      }
    } catch (error: any) {
      console.log("Status:", error.response?.status);
      console.log("Message:", error.response?.data);
    } finally {
      setRequestProceed(false);
      setInputs(new Array(4).fill(""));
      setTimeout(() => {
        refInputs["input-0"]?.focus();
      }, 0);
    }
  };

  const askNewCode = async () => {
    try {
      const makeRequestForCode = await axios.post(
        "https://chat-app-server-drab.vercel.app/api/user/sentCode",
        {
          email: email,
          type: type,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(makeRequestForCode.data);
    } catch (error: any) {
      console.log("Status:", error.response?.status);
      console.log("Message:", error.response?.data);
    }
    setCount(60);
    setRequestResendCode(false);
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
                    darkMode ? "caret-[#7decc7]" : "caret-[#1f8a66]"
                  } ${darkMode ? "text-[#fff]" : "text-[#000]"} font-semibold`}
                />
              );
            })}
          </View>
          <View className="w-[100%] px-4">
            {count > 0 && (
              <Text style={styles.conditionalText}>
                You can request a new code in{" "}
                <Text className="text-[#1f8a66] text-[16px]">
                  {" "}
                  {`00 : ${count < 10 ? `0${count}` : `${count}`}`}
                </Text>
              </Text>
            )}
            {requestResendCode && (
              <Text style={styles.conditionalText}>
                Didn't receive the code?{" "}
                <Text
                  className="text-[#1f8a66] text-[16px]"
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
              !codeChecked ? "bg-[rgba(0,0,0,0.05)]" : "bg-[#1f8a66]"
            } rounded-[12px] ${requestProceed ? "opacity-30" : "opacity-100"}`}
            disabled={!codeChecked || requestProceed}
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
              {requestProceed ? "Verifying..." : "Verify"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {requestProceed && (
        <View className="absolute top-0 left-0 w-[100%] h-[100%]">
          <Loading text="Verifying..." />
        </View>
      )}

      {registeredSuccess && (
        <View
          className="w-[100%] items-center justify-center"
          style={{
            position: "absolute",
            bottom: 40,
          }}
        >
          <MessageHandler text="Registered successfully" />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 2,
    borderBottomColor: "#1f8a66",
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
