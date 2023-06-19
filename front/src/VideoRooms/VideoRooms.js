import React from "react";
import { useSelector } from "react-redux";
import CreateRoomButton from "./CreateRoomButton";
import JoinRoomButton from "./JoinRoomButton";
import ParticipantsVideos from "./ParticipantsVideos";

const DUMMY_ROOMS = [
  {
    id: 1,
    participants: [
      {
        socketId: 1,
        peerId: 1,
        username: "Martin",
      },
    ],
  },
  {
    id: 2,
    participants: [
      {
        socketId: 2,
        peerId: 2,
        username: "Batman",
      },
    ],
  },
];

//Helps function to convert rooms to array
const convertRoomsToArray = (videoRooms) => {
  const rooms = [];
  Object.entries(videoRooms).forEach(([key, value]) => {
    rooms.push({
      id: key,
      creatorUsername: value.participants[0].username,
      amountOfParticipants: value.participants.length,
    });
  });
  return rooms;
};

const RoomList = () => {
  const rooms = useSelector((store) => store.videoRooms.rooms);
  console.log("Room list", rooms);
  return (
    <div className="map_page_v_rooms_list">
      <CreateRoomButton />
      {convertRoomsToArray(rooms).map((room) => (
        <JoinRoomButton
          key={room.id}
          creatorUsername={room.creatorUsername}
          roomId={room.id}
          amountOfParticipants={room.amountOfParticipants}
        />
      ))}
    </div>
  );
};

const VideoRooms = () => {
  return (
    <>
      <RoomList />
      <ParticipantsVideos />
    </>
  );
};

export default VideoRooms;
