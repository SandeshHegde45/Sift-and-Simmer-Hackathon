import { createSlice } from "@reduxjs/toolkit";

function loadMessages() {
  try {
    const stored = localStorage.getItem("siftSimmerMessages");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    return [];
  }
}

const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    items: loadMessages(),
  },
  reducers: {
    addMessage(state, action) {
      state.items.unshift(action.payload);
    },
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
