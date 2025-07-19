import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../apiQuery/authApi";
import { UserInfoModel } from "../reducersModels/user.info.model";

const info: UserInfoModel | null = null;
const userSlice = createSlice({
  name: "user",
  initialState: {
    info: info,
    uid: null,
    accessToken: null,
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
