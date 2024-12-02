import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserFromCookie, removeUserCookie, setUserCookie } from "../../common/cookie";

export interface UserState {
  email: string;
  id: string;
  username: string;
  name: string;
}

const initialState: UserState = getUserFromCookie() || {
  email: "",
  id: "",
  username: "",
  name: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    save: (state, action: PayloadAction<UserState>) => {
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.name = action.payload.name;
      setUserCookie(action.payload);
    },
    remove: (state) => {
      state.email = "";
      state.id = "";
      state.username = "";
      state.name = "";
      removeUserCookie();
    },
  },
});

export const { save, remove } = userSlice.actions;
export default userSlice.reducer;
