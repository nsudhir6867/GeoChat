import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  myLocation: null,
  onlineUsers: [],
  cardChosenOption: null,
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setMyLocation: (state, action) => {
      state.myLocation = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    removeDisconnectedUser: (state, action) => {
      state.onlineUsers = state.onlineUsers.filter(
        (onlineUser) => onlineUser.sockedId !== action.payload
      );
    },
    setCardChosenOption: (state, action) => {
      console.log(action.payload, "payload");
      state.cardChosenOption = action.payload;
    },
  },
});

export const {
  setMyLocation,
  setOnlineUsers,
  removeDisconnectedUser,
  setCardChosenOption,
} = mapSlice.actions;

export default mapSlice.reducer;
