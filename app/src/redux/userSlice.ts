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
  user: JSON.parse(localStorage.getItem("userProfile") || "null"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserProfileProps>) {
      state.user = action.payload;
      localStorage.setItem("userProfile", JSON.stringify(action.payload));
    },
    clearUser(state) {
      state.user = null;
      localStorage.removeItem("userProfile");
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
