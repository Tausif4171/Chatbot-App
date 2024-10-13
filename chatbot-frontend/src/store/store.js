import { configureStore } from "@reduxjs/toolkit";
import responseReducer from "./responseSlice";
import historyReducer from "./historySlice";

const store = configureStore({
  reducer: {
    responses: responseReducer,
    history: historyReducer,
  },
});

export default store;
