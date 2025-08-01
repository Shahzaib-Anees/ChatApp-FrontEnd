import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import colors from "@/Utils/colors/colorVariables";
import { FormProvider, useForm } from "react-hook-form";
import TextInputField from "../global/TextInputField";
import { useVerifySecretCodeMutation } from "@/Utils/redux/apiQuery/lockChatApi";
import { router } from "expo-router";
import { useDispatch } from "react-redux";

const SecretCodeInterface = ({
  darkMode,
  onClose,
}: {
  darkMode: boolean;
  onClose?: () => void;
}) => {
  const [allChecked, setAllChecked] = useState<boolean>(false);
  const methods = useForm();
  const {
    formState: { errors, isValid },
    setError,
    clearErrors,
    handleSubmit,
    watch,
  } = methods;
  const secretCode = watch("secretCode");
  const dispatch = useDispatch();
  const [verifySecretCode, { isLoading, isSuccess }] =
    useVerifySecretCodeMutation();
  useEffect(() => {
    if (secretCode && isValid) {
      setAllChecked(true);
    } else {
      setAllChecked(false);
    }
    //   if (!secretCode || secretCode.trim() === "") {
    //     setAllChecked(false);
    //     clearErrors("secretCode");
    //     return;
    //   }
    //   if (secretCode.length < 4) {
    //     setError("secretCode", {
    //       message: "Secret code must be at least 4 characters long",
    //     });
    //     setAllChecked(false);
    //     return;
    //   }
    //   if (isValid) {
    //     setAllChecked(true);
    //   } else {
    //     setAllChecked(false);
    //   }
  }, [secretCode, isValid]);

  const onSubmit = async (data: any) => {
    try {
      console.log(data);
      const code = data?.secretCode;
      const response = await verifySecretCode({ code }).unwrap();
      if (response?.status === 200) {
        onClose?.();
        clearErrors("secretCode");
        router.push("/locked-chats");
      } else {
        setError("secretCode", {
          message: response?.message || "Invalid secret code",
        });
      }
    } catch (error: any) {
      console.log("Error in verifying", error);
      setError("secretCode", {
        message: error?.message || "Invalid secret code",
      });
    }
  };
  return (
    <View className="gap-10">
      <View className="items-center justify-center gap-2">
        <View
          className={`${darkMode ? "bg-lightGreen" : "bg-darkGreen"} p-4 rounded-full`}
        >
          <Feather
            name="lock"
            size={24}
            color={darkMode ? colors.darkestBlack : colors.darkestWhite}
          />
        </View>
        <Text
          className={`${darkMode ? "text-lightestGrey" : "text-darkestBlack"} font-[Roboto] font-semibold text-[22px] tracking-[1px]`}
        >
          Enter your secret code
        </Text>
      </View>
      <FormProvider {...methods}>
        {/* <View className={``}>
          Enter your
        </View> */}
        <TextInputField
          name="secretCode"
          label="Enter your secret code"
          type="password"
          secureTextEntry={true}
          required={true}
          validationError="Secret code is required"
          rules={{
            required: "Secret code is required",
            minLength: {
              value: 4,
              message: "Secret code must be at least 4 characters long",
            },
          }}
        />
        <TouchableOpacity
          className={`w-[100%] items-center justify-center p-[14px] rounded-[12px] ${
            !allChecked
              ? darkMode
                ? "bg-[rgba(255,255,255,0.05)]"
                : "bg-[rgba(0,0,0,0.05)]"
              : "bg-darkGreen"
          } ${isLoading ? "opacity-30" : "opacity-100"}`}
          disabled={!allChecked || isLoading}
          onPress={handleSubmit(onSubmit)}
        >
          <Text
            className={`text-[16px] ${
              !allChecked ? "text-[#9e9d9d]" : "text-[#fff]"
            }`}
            style={{
              fontFamily: "RobotoBold",
            }}
          >
            {isLoading ? "Processing..." : "Continue"}
          </Text>
        </TouchableOpacity>
      </FormProvider>
    </View>
  );
};

export default SecretCodeInterface;
