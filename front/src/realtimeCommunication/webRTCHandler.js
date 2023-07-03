import store from "../store/store";
import { Peer } from "peerjs";
import { setLocalStream, setRemoteStream } from "./videoRoomsSlice";

let peer;
let peerId;

export const getPeerId = () => {
  return peerId;
};

export const getAccessToLocalStream = async () => {
  const localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  if (localStream) {
    store.dispatch(setLocalStream(localStream));
  }
  return Boolean(localStream);
};

export const connectWithPeerServer = () => {
  //If we pass undefined as the first parameter, peerjs is gonna generate new id for us.
  peer = new Peer(undefined, {
    //Where we can find peer server
    host: "localhost",
    port: 9000,
    path: "/peer",
  });

  peer.on("open", (id) => {
    console.log("My peer id is:", id);
    peerId = id;
  });

  //For one how is recieving the call
  peer.on("call", async (call) => {
    const localStream = store.getState().videoRooms.localStream;
    call.answer(localStream); //Answer the call with A/V stream
    call.on("stream", (remoteStream) => {
      console.log("remote stream came");
      store.dispatch(setRemoteStream(remoteStream));
    });
  });
};

//For one who is creating the call
export const call = (data) => {
  const { newParticipantPeerId } = data;
  const localStream = store.getState().videoRooms.localStream;
  const peerCall = peer.call(newParticipantPeerId, localStream);
  peerCall.on("stream", (remoteStream) => {
    console.log("Remote stream came");
    store.dispatch(setRemoteStream(remoteStream));
  });
};

export const disconnect = () => {
  for (let conns in peer.connections) {
    peer.connections[conns].forEach((c) => {
      console.log("closing connections");
      c.peerConnection.close();

      if (c.close) c.close();
    });
  }

  store.dispatch(setRemoteStream(null));
};
