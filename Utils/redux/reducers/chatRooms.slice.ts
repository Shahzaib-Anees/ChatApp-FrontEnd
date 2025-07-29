import { createSlice, Reducer } from "@reduxjs/toolkit";

interface ChatRoom {
  id: string;
  name: string;
  // Add other chat room properties as needed
}

interface ChatRoomsState {
  chatRooms: ChatRoom[];
  isLockedChatsAuthenticated: boolean;
}

const initialState: ChatRoomsState = {
  chatRooms: [],
  isLockedChatsAuthenticated: false,
};

const chatRooms = createSlice({
  name: "chatRooms",
  initialState,
  reducers: {
    setChatRooms: (state, action) => {
      state.chatRooms = action.payload;
    },
    addChatRoom: (state, action) => {
      state.chatRooms.push(action.payload);
    },
    updateChatRoom: (state, action) => {
      const { id, updatedChatRoom } = action.payload;
      const index = state.chatRooms.findIndex((room) => room.id === id);
      if (index !== -1) {
        state.chatRooms[index] = updatedChatRoom;
      }
    },
    deleteChatRoom: (state, action) => {
      const id = action.payload;
      state.chatRooms = state.chatRooms.filter((room) => room.id !== id);
    },
    setValueInChatRoomsState: (state: any, action) => {
      const { name, data } = action.payload;
      state[name] = data;
    },
  },
});

export const {
  setChatRooms,
  addChatRoom,
  updateChatRoom,
  deleteChatRoom,
  setValueInChatRoomsState,
} = chatRooms.actions;

export default chatRooms.reducer;
