import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import apiService from "../../../api/apiService";

interface ProfileState {
  profile?: object | undefined;
  error?: string | undefined | object;
}

const initialState: ProfileState = {
  profile: undefined,
  error: undefined,
};

export const fetchProfile: any = createAsyncThunk(
  "profile/fetchProfile",
  async (_, thunkAPI) => {
    try {
      const response: any = await apiService("/api/v1/profile", "GET");

      return response.data.data;
    } catch (error: any) {
      if (error.message !== "Network Error") {
        toast.error("An error occurred while retrieving your profile");
        return thunkAPI.rejectWithValue(error);
      }
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile(state, action) {
      state.profile = action.payload;
      state.error = undefined;
    },
    removeProfile(state, action) {
      state.error = action.payload;
      state.profile = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.error = undefined;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.error = action.payload || "Unknown error";
        state.profile = undefined;
      });
  },
});

export const { setProfile, removeProfile } = profileSlice.actions;
export default profileSlice.reducer;
