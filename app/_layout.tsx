import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import store from "@/Utils/redux/store/store";
import App from "./App";
import { Provider } from "react-redux";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <App />   
    </Provider>
  );
}
