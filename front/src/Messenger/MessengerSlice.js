import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatBoxes: [],
  chatHistory: {},
};

export const messengerSlice = createSlice({
  name: "messenger",
  initialState,
  reducers: {
    addChatBoxes: (state, action) => {
      if (
        !state.chatBoxes.find(
          (chatbox) => chatbox.socketId === action.payload.socketId
        )
      ) {
        state.chatBoxes.push(action.payload);
      }
    },
  },
});
