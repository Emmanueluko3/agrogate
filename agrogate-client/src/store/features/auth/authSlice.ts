import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../../api/apiService";
import toast from "react-hot-toast";

interface AuthState {
  isLoggedIn: boolean;
  user?: object | undefined;
  error?: any;
}

interface LoginCredentials {
  username: string;
  password: string;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: undefined,
  error: undefined,
};

export const login: any = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials, thunkAPI) => {
    try {
      const response: any = await apiService(
        "/api/v1/auth/login",
        "POST",
        credentials
      );
      const data = response.data;
      toast.success("Welcome");
      return data;
    } catch (error: any) {
      toast.error(error?.response.data.message);
      console.log("error message", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.error = undefined;
    },
    loginFailure(state, action) {
      state.error = action.payload;
      state.user = action.payload;
    },
    logout(state) {
      localStorage.removeItem("accessToken");
      localStorage.clear();
      state.isLoggedIn = false;
      state.user = undefined;
      window.location.reload();
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(login.fulfilled, (state, action) => {
        const accessToken = action?.payload?.access_token;
        localStorage.setItem("accessToken", accessToken);
        state.isLoggedIn = true;
        state.user = action.payload;
        state.error = undefined;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
