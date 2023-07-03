import { v4 as uuid } from "uuid";
import {
  setInRoom,
  setRooms,
} from "../../realtimeCommunication/videoRoomsSlice";
import * as socketConn from "../../socketConnection/socketConn";
import store from "../store";
import {
  disconnect,
  getAccessToLocalStream,
  getPeerId,
} from "../../realtimeCommunication/webRTCHandler";

export const createVideoRoom = async () => {
  //Get access to the local stream
  const success = await getAccessToLocalStream();
  if (success) {
    const newRoomId = uuid();
    store.dispatch(setInRoom(newRoomId));
    socketConn.createVideoRoom({
      peerId: getPeerId(), //Change later on for real pear id
      newRoomId,
    });
  }
};

export const joinVideoRoom = async (roomId) => {
  //get access to the local stream
  const success = await getAccessToLocalStream();
  if (success) {
    store.dispatch(setInRoom(roomId));
    socketConn.joinVideoRoom({
      roomId,
      peerId: getPeerId(),
    });
  }
};

export const videoRoomsListHandler = (videoRooms) => {
  store.dispatch(setRooms(videoRooms));
};

export const leaveVideoRoom = (roomId) => {
  disconnect();
  socketConn.leaveVideoRoom({
    roomId,
  });
  store.dispatch(setInRoom(false));
};
