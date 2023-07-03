import React from "react";
import disconnectIcon from "../resources/call-disconnect-icon.svg";
import micIcon from "../resources/mic-icon.svg";
import micOffIcon from "../resources/mic-off-icon.svg";
import cameraIcon from "../resources/camera-icon.svg";
import cameraOffIcon from "../resources/camera-off-icon.svg";
import { leaveVideoRoom } from "../store/actions/videoRoomActions";
import { useSelector, useDispatch } from "react-redux";
import {
  setIsCameraOn,
  setIsMicOn,
} from "../realtimeCommunication/videoRoomsSlice";
const VideoRoomButtons = ({ inRoom }) => {
  const isMicOn = useSelector((state) => state.videoRooms.isMicOn);
  console.log(isMicOn);
  const isCamOn = useSelector((state) => state.videoRooms.isCameraOn);
  const localStream = useSelector((state) => state.videoRooms.localStream);
  const dispatch = useDispatch();

  const leaveRoomHandler = () => {
    leaveVideoRoom(inRoom);
  };

  const handleMuteUnmuteChange = () => {
    localStream.getAudioTracks()[0].enabled =
      !localStream.getAudioTracks()[0].enabled;
    dispatch(setIsMicOn(!isMicOn));
  };

  const handleCameraOnOffChange = () => {
    localStream.getVideoTracks()[0].enabled =
      !localStream.getVideoTracks()[0].enabled;
    dispatch(setIsCameraOn(!isCamOn));
  };
  return (
    <div className="m_page_v_rooms_video_buttons_container">
      <button
        onClick={handleMuteUnmuteChange}
        className="m_page_v_rooms_video_button"
      >
        <img
          src={isMicOn ? micOffIcon : micIcon}
          alt="mic"
          width="25px"
          height="25px"
        />
      </button>
      <button
        onClick={leaveRoomHandler}
        className="m_page_v_rooms_video_button"
      >
        <img src={disconnectIcon} alt="disconnect" width="25px" height="25px" />
      </button>
      <button
        onClick={handleCameraOnOffChange}
        className="m_page_v_rooms_video_button"
      >
        <img
          src={isCamOn ? cameraOffIcon : cameraIcon}
          alt="camera"
          width="25px"
          height="25px"
        />
      </button>
    </div>
  );
};

export default VideoRoomButtons;
