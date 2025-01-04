import { createSlice } from "@reduxjs/toolkit";

const themeSlice: any = createSlice({
  name: "theme",
  initialState: {
    darkTheme: false,
  },
  reducers: {
    setTheme: (state, action) => {
      const { darkMode } = action.payload;
      state.darkTheme = darkMode;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
