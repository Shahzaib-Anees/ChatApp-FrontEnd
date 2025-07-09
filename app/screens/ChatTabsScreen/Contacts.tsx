import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { loadUserContacts } from "@/Utils/methods/methods";

const Contacts = () => {
  const darkMode = useSelector((state: any) => state.theme?.darkTheme);
  useEffect(() => {
    (async () => {
      await loadUserContacts();
    })();
  }, []);

  return (
    <SafeAreaView className={`${darkMode ? "bg-black" : "bg-white"} flex-1`}>
      <Text>Contacts</Text>
    </SafeAreaView>
  );
};

export default Contacts;
