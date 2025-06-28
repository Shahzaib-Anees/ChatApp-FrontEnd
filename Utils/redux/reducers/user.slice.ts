import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../apiQuery/authApi";

const userSlice: any = createSlice({
  name: "user",
  initialState: {
    info: {},
    uid: null,
  },
  reducers: {
    setDataInUserState: (state: any, action) => {
      const nameOfState = action.payload?.name;
      const data = action.payload?.data;
      state[nameOfState] = data;
    },
  },
});

export const { setDataInUserState } = userSlice.actions;

export default userSlice.reducer;
