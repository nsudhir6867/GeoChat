import { v4 as uuid } from "uuid";
import {
  setInRoom,
  setRooms,
} from "../../realtimeCommunication/videoRoomsSlice";
import * as socketConn from "../../socketConnection/socketConn";
import store from "../store";
import { getAccessToLocalStream } from "../../realtimeCommunication/webRTCHandler";

export const createVideoRoom = async () => {
  //Get access to the local stream
  const success = await getAccessToLocalStream();
  if (success) {
    const newRoomId = uuid();
    store.dispatch(setInRoom(newRoomId));
    socketConn.createVideoRoom({
      peerId: 1, //Change later on for real pear id
      newRoomId,
    });
  }
};

export const videoRoomsListHandler = (videoRooms) => {
  store.dispatch(setRooms(videoRooms));
};
