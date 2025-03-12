import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "../reducers/user.slice";
import themeSlice from "../reducers/theme.slice";
import messageHandlerSlice from "../reducers/messageHandler.slice";
import { authApi } from "../apiQuery/authApi";

const store: any = configureStore({
  reducer: {
    user: userSliceReducer,
    theme: themeSlice,
    messageHandler: messageHandlerSlice,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
