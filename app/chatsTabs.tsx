import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Chats from "./screens/ChatTabsScreen/Chats";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector } from "react-redux";
import Calls from "./screens/ChatTabsScreen/Calls";
import Feather from "@expo/vector-icons/Feather";
import Contacts from "./screens/ChatTabsScreen/Contacts";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Octicons from "@expo/vector-icons/Octicons";
import Settings from "./screens/ChatTabsScreen/Settings";

const ChatTabs = () => {
  const Tab = createBottomTabNavigator();
  const darkMode = useSelector((state: any) => state.theme?.darkTheme);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarStyle: { backgroundColor: darkMode ? "#121212" : "white" },
      }}
    >
      <Tab.Screen
        name="Message"
        component={Chats}
        options={{
          headerShown: false,
          headerTintColor: darkMode ? "white" : "black",
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: `${focused ? (darkMode ? "#7decc7" : "#1f8a66") : darkMode ? "white" : "#a3a2a1"}`,
                fontSize: 16,
              }}
            >
              Message
            </Text>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={26}
              color={`${focused ? (darkMode ? "#7decc7" : "#1f8a66") : darkMode ? "white" : "#a3a2a1"}`}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Calls"
        component={Calls}
        options={{
          headerShown: false,
          headerTintColor: darkMode ? "white" : "black",
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: `${focused ? (darkMode ? "#7decc7" : "#1f8a66") : darkMode ? "white" : "#a3a2a1"}`,
                fontSize: 16,
              }}
            >
              Calls
            </Text>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <Feather
              name="phone-call"
              size={26}
              color={`${focused ? (darkMode ? "#7decc7" : "#1f8a66") : darkMode ? "white" : "#a3a2a1"}`}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Contacts"
        component={Contacts}
        options={{
          headerShown: false,
          headerTintColor: darkMode ? "white" : "black",
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: `${focused ? (darkMode ? "#7decc7" : "#1f8a66") : darkMode ? "white" : "#a3a2a1"}`,
                fontSize: 16,
              }}
            >
              Contacts
            </Text>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome5
              name="user-circle"
              size={26}
              color={`${focused ? (darkMode ? "#7decc7" : "#1f8a66") : darkMode ? "white" : "#a3a2a1"}`}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: true,
          headerTintColor: darkMode ? "white" : "black",
          // header
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: `${focused ? (darkMode ? "#7decc7" : "#1f8a66") : darkMode ? "white" : "#a3a2a1"}`,
                fontSize: 16,
              }}
            >
              Settings
            </Text>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <Octicons
              name="gear"
              size={26}
              color={`${focused ? (darkMode ? "#7decc7" : "#1f8a66") : darkMode ? "white" : "#a3a2a1"}`}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default ChatTabs;
