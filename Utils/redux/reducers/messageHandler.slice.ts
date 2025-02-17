import { createSlice } from "@reduxjs/toolkit";

const messageHandlerSlice = createSlice({
  name: "messageHandler",
  initialState: {
    message: "",
    called: true,
  },
  reducers: {
    setMessageHandler: (state, action) => {
      const { message, called } = action.payload;
      state.message = message;
      state.called = called;
    },
  },
});

export const { setMessageHandler } = messageHandlerSlice.actions;
export default messageHandlerSlice.reducer;
