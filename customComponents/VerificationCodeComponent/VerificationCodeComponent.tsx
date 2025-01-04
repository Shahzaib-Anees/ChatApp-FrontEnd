import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Forget_Password_Types } from "@/types/forgetPassword.types";
import "../../global.css";

const VerificationCodeComponent = ({
  darkMode,
  setView,
}: {
  darkMode: boolean;
  setView: React.Dispatch<React.SetStateAction<Forget_Password_Types>>;
}) => {
  const [otp, setOtp] = useState<string>("");
  const [codeChecked, setCodeChecked] = useState<boolean>(false);
  const [inputs, setInputs] = useState<string[]>(new Array(4).fill(""));
  const [count, setCount] = useState<number>(60);
  const [requestResendCode, setRequestResendCode] = useState<boolean>(false);
  const [verificationProceed, setVerificationProceed] =
    useState<boolean>(false);
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

  const verifyCode = () => {
    console.log("Code Verified");
    console.log(otp);
    setView(Forget_Password_Types.reset_password);
  };

  const askNewCode = () => {
    setRequestResendCode(false);
    setCount(60);
  };
  return (
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
            <Text className="text-[#1f8a66] text-[16px]" onPress={askNewCode}>
              Resend Code
            </Text>
          </Text>
        )}
      </View>

      {/* Footer Buttons  */}
      <View className="w-[100%%] items-center justify-center mt-7">
        <TouchableOpacity
          className={`w-[100%] items-center justify-center p-[14px] ${
            !codeChecked ? "bg-[rgba(0,0,0,0.05)]" : "bg-[#1f8a66]"
          } rounded-[12px]`}
          disabled={!codeChecked}
        >
          <Text
            className={`text-[16px] ${
              !codeChecked ? "text-[#9e9d9d]" : "text-[#fff]"
            }`}
            style={{
              fontFamily: "RobotoBold",
            }}
            onPress={verifyCode}
          >
            {verificationProceed ? "Verifying..." : "Verify"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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

export default VerificationCodeComponent;
