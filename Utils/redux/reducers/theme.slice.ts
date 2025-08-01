import { createSlice } from "@reduxjs/toolkit";

const themeSlice: any = createSlice({
  name: "theme",
  initialState: {
    darkTheme: true,
    showTabNavigator: true,
  },
  reducers: {
    setTheme: (state, action) => {
      const { darkMode } = action.payload;
      state.darkTheme = darkMode;
    },
    setShowTabNavigator: (state, action) => {
      const { showTabNavigator } = action.payload;
      state.showTabNavigator = showTabNavigator;
    },
  },
});

export const { setTheme, setShowTabNavigator } = themeSlice.actions;
export default themeSlice.reducer;
