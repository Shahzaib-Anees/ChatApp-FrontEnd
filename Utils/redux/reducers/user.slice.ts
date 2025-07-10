import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../apiQuery/authApi";

const userSlice: any = createSlice({
  name: "user",
  initialState: {
    info: {},
    uid: null,
    accessToken: null,
  },
  reducers: {
    setDataInUserState: (state: any, action) => {
      const nameOfState = action.payload?.name;
      const data = action.payload?.data;
      console.log("nameOfState==>", nameOfState);
      console.log("data==>", data);
      state[nameOfState] = data;
    },
  },
});

export const { setDataInUserState } = userSlice.actions;

export default userSlice.reducer;
