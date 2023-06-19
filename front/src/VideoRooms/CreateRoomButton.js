import React from "react";
import callIcon from "../resources/call-icon.svg";
import { createVideoRoom } from "../store/actions/videoRoomActions";
import { useSelector } from "react-redux";

const CreateRoomButton = () => {
  const inRoom = useSelector((state) => state.videoRooms.inRoom);
  const createRoomHandler = () => {
    if (inRoom) {
      return alert("You're already in the room");
    }
    createVideoRoom();
  };
  return (
    <img
      className="map_page_card_img"
      alt="create_button"
      src={callIcon}
      onClick={createRoomHandler}
    ></img>
  );
};

export default CreateRoomButton;
