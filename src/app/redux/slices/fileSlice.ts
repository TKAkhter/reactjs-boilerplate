import { createSlice } from "@reduxjs/toolkit";

interface FileState {
  isFileUploaded: boolean;
}

const initialState: FileState = {
  isFileUploaded: false,
};

const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setFileUploaded: (state) => {
      state.isFileUploaded = true;
    },
    resetFileUploaded: (state) => {
      state.isFileUploaded = false;
    },
  },
});

export const { setFileUploaded, resetFileUploaded } = fileSlice.actions;
export default fileSlice.reducer;
