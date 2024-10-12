import { createSlice } from "@reduxjs/toolkit";

const historySlice = createSlice({
  name: "history",
  initialState: {
    savedResponses: [],
  },
  reducers: {
    addResponse: (state, action) => {
      state.savedResponses.push(action.payload);
    },
    setHistory: (state, action) => {
      state.savedResponses = action.payload;
    },
  },
});

export const { addResponse, setHistory } = historySlice.actions;

export default historySlice.reducer;
