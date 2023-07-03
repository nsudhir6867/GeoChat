import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inRoom: null, //It user joins a room or create a room, we will be setting this property with the room id
  rooms: [], //All the rooms available or created by the user.
  localStream: null,
  //localStream is an object of type media stream, we should store such object in the state redux, but still we are doing it.
  remoteStream: null,
  isMicOn: true,
  isCameraOn: true,
};

export const videoRoomSlice = createSlice({
  name: "VideoRooms",
  initialState,
  reducers: {
    setInRoom: (state, action) => {
      //For creating the room
      state.inRoom = action.payload;
    },
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
    setLocalStream: (state, action) => {
      state.localStream = action.payload;
    },
    setRemoteStream: (state, action) => {
      state.remoteStream = action.payload;
    },
    setIsMicOn: (state, action) => {
      state.isMicOn = action.payload;
    },
    setIsCameraOn: (state, action) => {
      state.isCameraOn = action.payload;
    },
  },
});

export const {
  setInRoom,
  setRooms,
  setLocalStream,
  setRemoteStream,
  setIsMicOn,
  setIsCameraOn,
} = videoRoomSlice.actions;
export default videoRoomSlice.reducer;
