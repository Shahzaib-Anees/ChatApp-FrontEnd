import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "../reducers/user.slice";
import themeSlice from "../reducers/theme.slice";

const store: any = configureStore({
  reducer: {
    user: userSliceReducer,
    theme: themeSlice,
  },
});

export default store;
