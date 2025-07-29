import { combineReducers } from "@reduxjs/toolkit";
import { authApi } from "./apiQuery/authApi";
import { lockChatApi } from "./apiQuery/lockChatApi";

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [lockChatApi.reducerPath]: lockChatApi.reducer,
});

export { rootReducer };
