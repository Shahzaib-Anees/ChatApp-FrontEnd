import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const selector = useSelector((state: any) => state.theme);
  useEffect(() => {
    const { darkTheme } = selector;
    if (darkTheme) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, [selector]);
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          statusBarBackgroundColor: darkMode ? "#000" : "#fff",
          statusBarStyle: darkMode ? "light" : "dark",
        }}
      />
      <Stack.Screen
        name="Register"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: darkMode ? "#111111" : "#fff",
          },
          headerTintColor: darkMode ? "#fff" : "#000",
          statusBarStyle: darkMode ? "light" : "dark",
          statusBarBackgroundColor: darkMode ? "#111111" : "#fff",
          contentStyle: {
            backgroundColor: darkMode ? "#111111" : "#fff",
          },
        }}
      />
      <Stack.Screen
        name="Login"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: darkMode ? "#111111" : "#fff",
          },
          headerTintColor: darkMode ? "#fff" : "#000",
          statusBarStyle: darkMode ? "light" : "dark",
          statusBarBackgroundColor: darkMode ? "#111111" : "#fff",
          contentStyle: {
            backgroundColor: darkMode ? "#111111" : "#fff",
          },
        }}
      />
      <Stack.Screen
        name="forgetPassword"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: darkMode ? "#111111" : "#fff",
          },
          headerTitle: "Forgot Password",
          headerTintColor: darkMode ? "#fff" : "#000",
          statusBarStyle: darkMode ? "light" : "dark",
          statusBarBackgroundColor: darkMode ? "#111111" : "#fff",
          contentStyle: {
            backgroundColor: darkMode ? "#111111" : "#fff",
          },
        }}
      />
    </Stack>
  );
}
