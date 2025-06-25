import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../apiQuery/authApi";

const userSlice: any = createSlice({
  name: "user",
  initialState: {
    info: {},
    isAuthenticated: false,
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
export const fetchUserDetails = () => async (dispatch: any) => {
  const token = await AsyncStorage.getItem("token");
  if (!token) {
    console.log("No token found");
    return;
  }
  try {
    const response = await dispatch(
      authApi.endpoints.getUserDetails.initiate(null)
    ).unwrap();
    console.log("Response from getUserDetails:", response);
    dispatch(setDataInUserState({ name: "info", data: response?.data }));
    dispatch(setDataInUserState({ name: "isAuthenticated", data: true }));
    dispatch(setDataInUserState({ name: "uid", data: response?.data?._id }));
  } catch (error) {
    console.log("Error fetching user details:", error);
  }
};
export default userSlice.reducer;
