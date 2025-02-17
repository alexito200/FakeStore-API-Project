// userSlice.ts (Redux slice)

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserProfileProps {
  uid: string;
  email: string;
  fullName: string;
  address: string;
}

interface UserState {
  user: UserProfileProps | null;
}

const initialState: UserState = {
  user: JSON.parse(localStorage.getItem("userProfile") || "null"), // Load from localStorage if available
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserProfileProps>) {
      state.user = action.payload;
      localStorage.setItem("userProfile", JSON.stringify(action.payload)); // Save to localStorage
    },
    clearUser(state) {
      state.user = null;
      localStorage.removeItem("userProfile"); // Remove from localStorage
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
