import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import apiService from "../../../api/apiService";

interface UserProfileState {
  userProfile?: object | undefined;
  error?: string | undefined | object;
}

const initialState: UserProfileState = {
  userProfile: undefined,
  error: undefined,
};

export const fetchUserProfile: any = createAsyncThunk(
  "userProfile/fetchUserProfile",
  async (_, thunkAPI) => {
    try {
      const response: any = await apiService("/api/v1/creators/profile", "GET");

      return response.data.data;
    } catch (error: any) {
      if (error.message !== "Network Error") {
        toast.error("An error occurred while retrieving your profile");
        return thunkAPI.rejectWithValue(error);
      }
    }
  },
);

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setUserProfile(state, action) {
      state.userProfile = action.payload;
      state.error = undefined;
    },
    removeUserProfile(state, action) {
      state.error = action.payload;
      state.userProfile = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.userProfile = action.payload;
        state.error = undefined;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.error = action.payload || "Unknown error";
        state.userProfile = undefined;
      });
  },
});

export const { setUserProfile, removeUserProfile } = userProfileSlice.actions;
export default userProfileSlice.reducer;
