//Setting up redux;
//Do all the imports from redux toolkit
import { configureStore } from "@reduxjs/toolkit";
import mapReducer from "../MapPage/mapSlice";

//Creating store for redux
const store = configureStore({
  //reducers are responsible for changing the state based on the action we dispatch
  reducer: {
    map: mapReducer,
  },
});

export default store;
