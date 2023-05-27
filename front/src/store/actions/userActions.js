import store from "../store";
import { setOnlineUsers, removeDisconnectedUser } from "../../MapPage/mapSlice";

//To set all the online users
export const onlineUserHandler = (socketId, usersData) => {
  store.dispatch(
    setOnlineUsers(
      usersData.map((user) => {
        if (user.socketId === socketId) {
          user.myself = true;
        }
        return user;
      })
    )
  );
};

//to remove disconnected user.
export const userDisconnectedHandler = (socketId) => {
  store.dispatch(removeDisconnectedUser(socketId));
};
