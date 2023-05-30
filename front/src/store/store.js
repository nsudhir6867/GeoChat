//Setting up redux;
//Do all the imports from redux toolkit
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import mapReducer from "../MapPage/mapSlice";
import messengerReducer from "../Messenger/MessengerSlice";
import videoRoomsReducer from "../realtimeCommunication/videoRoomsSlice";
//Creating store for redux
const store = configureStore({
  //reducers are responsible for changing the state based on the action we dispatch
  reducer: {
    map: mapReducer,
    messenger: messengerReducer,
    videoRooms: videoRoomsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [
          "videoRooms/setLocalStream",
          "videoRooms/setRemoteStream",
        ],
        ignoredPaths: ["videoRooms.localStream", "videoRooms.remoteStream"],
      },
    }),
});

export default store;
