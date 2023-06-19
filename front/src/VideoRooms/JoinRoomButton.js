import React from "react";
import { joinVideoRoom } from "../store/actions/videoRoomActions";
import { useSelector } from "react-redux";

const JoinRoomButton = ({ creatorUsername, roomId, amountOfParticipants }) => {
  const inRoom = useSelector((state) => state.videoRooms.inRoom);
  const joinRoomHandler = () => {
    if (inRoom) {
      return alert("Already in Room");
    }
    if (amountOfParticipants > 1) {
      return alert("room is full");
    }
    joinVideoRoom(roomId);
  };

  return (
    <button onClick={joinRoomHandler} className="map_page_v_rooms_join_button">
      {creatorUsername[0]}
    </button>
  );
};

export default JoinRoomButton;
