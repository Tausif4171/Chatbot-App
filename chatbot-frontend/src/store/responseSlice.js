import { createSlice } from "@reduxjs/toolkit";

const responseSlice = createSlice({
  name: "responses",
  initialState: {
    savedResponses: [],
  },
  reducers: {
    saveResponse: (state, action) => {
      state.savedResponses.push(action.payload);
    },
  },
});

export const { saveResponse } = responseSlice.actions;

export default responseSlice.reducer;
