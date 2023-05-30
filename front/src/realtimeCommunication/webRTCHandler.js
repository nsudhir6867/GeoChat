import store from "../store/store";
import { setLocalStream } from "./videoRoomsSlice";

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
