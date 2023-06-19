import React from "react";
import disconnectIcon from "../resources/call-disconnect-icon.svg";
import { leaveVideoRoom } from "../store/actions/videoRoomActions";
const VideoRoomButtons = ({ inRoom }) => {
  const leaveRoomHandler = () => {
    leaveVideoRoom(inRoom);
  };
  return (
    <div className="m_page_v_rooms_video_buttons_container">
      <button className="m_page_v_rooms_video_button">A</button>
      <button
        onClick={leaveRoomHandler}
        className="m_page_v_rooms_video_button"
      >
        <img src={disconnectIcon} alt="disconnect" width="25px" height="25px" />
      </button>
      <button className="m_page_v_rooms_video_button">A</button>
    </div>
  );
};

export default VideoRoomButtons;
