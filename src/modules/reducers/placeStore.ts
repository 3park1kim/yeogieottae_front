import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// # initial state
const initialState = { keyword: "", placeList: [] };

const placeSlice = createSlice({
  name: "place",
  initialState: initialState,
  reducers: {
    setKeyword: (state, { payload }) => {
      state.keyword = payload;
    },
    setPlaceList: (state, { payload }) => {
      state.placeList = payload;
    },
  },
  extraReducers: (builder) => {},
});

export const placeAction = placeSlice.actions;

export default placeSlice.reducer;
