import { View, Text, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { useForm, Controller, Control, useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import Feather from "@expo/vector-icons/Feather";

const TextInputField = ({
  label = "",
  name,
  secureTextEntry = false,
  required = false,
  validationError = "",
  onChangeValue,
  type = "text",
  rules = {},
}: {
  label?: string;
  name: string;
  secureTextEntry?: boolean;
  required?: boolean;
  validationError?: string;
  type: "text" | "email" | "password";
  onChangeValue?: (value: string) => void;
  rules?: any;
}) => {
  const darkMode = useSelector((state: any) => state.theme.darkTheme);
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [ifSeePassword, setIfSeePassword] = useState<boolean>(false);
  return (
    <View className="w-[100%]">
      <Text
        className={`text-[15px] ${
          darkMode
            ? errors[name]
              ? "text-[#ff0000]"
              : "text-[var(--light-green)]"
            : errors[name]
              ? "text-[#ff0000]"
              : "text-darkGreen"
        } w-[100%]`}
        style={{
          fontFamily: "RobotoBold",
        }}
      >
        {label}
      </Text>
      <Controller
        control={control}
        name={name}
        rules={{
          required: required ? `${validationError}` : false,
          ...rules,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View className="w-[100%] flex-col gap-2">
            <View
              className={`w-[100%] flex-row items-center justify-between ${
                type === "password"
                  ? errors[name]?.message
                    ? "border-b-[1px] border-b-[#ff0000]"
                    : darkMode
                      ? "border-b-[1px] border-b-[var(--light-green)]"
                      : "border-b-[1px] border-b-darkGreen"
                  : ""
              } `}
            >
              <TextInput
                keyboardType={type === "email" ? "email-address" : "default"}
                onBlur={onBlur}
                onChangeText={(value) => {
                  onChange(value);
                  if (onChangeValue) {
                    onChangeValue(value);
                  }
                }}
                value={value}
                secureTextEntry={secureTextEntry && !ifSeePassword}
                className={`${type === "password" ? "w-[80%]" : "w-[100%]"} h-[40px] rounded-[2px] px-1 text-[16px] ${
                  darkMode ? "text-[#fff]" : "text-darkestBlack"
                } font-semibold ${
                  darkMode ? "caret-[var(--light-green)]" : "caret-darkGreen"
                } ${
                  type !== "password"
                    ? errors[name]
                      ? "border-b-[1px] border-b-[#ff0000]"
                      : darkMode
                        ? "border-b-[1px] border-b-[var(--light-green)]"
                        : "border-b-[1px] border-b-darkGreen"
                    : ""
                } 
                  ${errors[name] && type !== "password" && "border-b-[1px] border-b-[#ff0000]"}`}
              />
              {type === "password" && (
                <View
                  className={`pl-3 border-l-[1px] ${
                    darkMode ? "border-l-[#6e6e6d]" : "border-l-lighterGrey"
                  }`}
                  onTouchEnd={() => setIfSeePassword(!ifSeePassword)}
                >
                  {!ifSeePassword ? (
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
              )}
            </View>

            {errors[name]?.message && (
              <Text className="text-[12px] text-[#ff0000]">
                {errors[name]?.message as string}
              </Text>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default TextInputField;
