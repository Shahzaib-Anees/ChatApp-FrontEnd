import { View, Text, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import "@/global.css";
const MessageHandler = ({
  message,
  duration = 3000,
}: {
  message: string;
  duration?: number;
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.delay(duration),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 3000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [message]);

  return (
    <Animated.View
      style={[
        {
          opacity: fadeAnim,
          width: 200,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
          backgroundColor: "rgba(0,0,0,0.9)",
          padding: 1,
          borderRadius: 8,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          zIndex: 9999,
        },
      ]}
    >
      <Text
        style={{
          fontFamily: "PermanentMarker",
          fontSize: 30,
          color: "darkGreen",
        }}
      >
        C
      </Text>
      <Text
        style={{
          color: "white",
          textAlign: "center",
          fontWeight: "500",
          fontSize: 14,
        }}
      >
        {message ? message : "No Message"}
      </Text>
    </Animated.View>
  );
};

export default MessageHandler;
