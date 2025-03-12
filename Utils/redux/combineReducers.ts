import { combineReducers } from "@reduxjs/toolkit";
import { authApi } from "./apiQuery/authApi";

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
});

export { rootReducer };
