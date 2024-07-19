import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import profileSlice from "./features/user/profileSlice";
import settingsSlice from "./features/user/settingsSlice";

const persistConfiig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  auth: authReducer,
  profile: profileSlice,
  settings: settingsSlice,
});

const persistedReducer = persistReducer(persistConfiig, reducer);
export const store = configureStore({
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
