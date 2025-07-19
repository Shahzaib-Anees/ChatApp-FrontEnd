import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "../reducers/user.slice";
import themeSlice from "../reducers/theme.slice";
import messageHandlerSlice from "../reducers/messageHandler.slice";
import chatRoomReducer from "../reducers/chatRooms.slice";
import { authApi } from "../apiQuery/authApi";

const store: any = configureStore({
  reducer: {
    user: userSliceReducer,
    theme: themeSlice,
    messageHandler: messageHandlerSlice,
    chatRoom: chatRoomReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
