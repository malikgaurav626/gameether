import { configureStore, createSlice } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
const initialState = {
  routeLocation: 0,
  authToken: {},
  dotMatrix: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setrouteLocation: (state, action) => {
      state.routeLocation = action.payload;
    },
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
    },
    setDotMatrix: (state, action) => {
      state.dotMatrix = action.payload;
    },
  },
});

const store = configureStore({
  reducer: dataSlice.reducer,
  middleware: [thunk],
});

export const { setrouteLocation, setAuthToken, setDotMatrix } =
  dataSlice.actions;

export default store;
