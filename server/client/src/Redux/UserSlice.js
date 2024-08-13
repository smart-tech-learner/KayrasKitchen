import { createSlice } from "@reduxjs/toolkit";

const initialState = { id: "", name: "", email: "", role: "", image: "" };
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload._id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.image = action.payload.image;
    },

    logoutUser: (state, action) => {
      state.id = "";
      state.name = "";
      state.email = "";
      state.role = "";
      state.image = "";
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
