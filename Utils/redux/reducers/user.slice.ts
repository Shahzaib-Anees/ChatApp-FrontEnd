import { createSlice } from "@reduxjs/toolkit";

const userSlice: any = createSlice({
  name: "user",
  initialState: {
    info: {},
    isAuthenticated: false,
    uid: null,
  },
  reducers: {
    setUser: (state, action) => {
      const { data } = action.payload;
      state.info = data;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
