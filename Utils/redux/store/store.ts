import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "../reducers/user.slice";
import themeSlice from "../reducers/theme.slice";
import messageHandlerSlice from "../reducers/messageHandler.slice";

const store: any = configureStore({
  reducer: {
    user: userSliceReducer,
    theme: themeSlice,
    messageHandler: messageHandlerSlice,
  },
});

export default store;
