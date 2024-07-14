import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import userprofileSlice from "./features/user/userprofileSlice";
import settingsSlice from "./features/user/settingsSlice";

const persistConfiig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  auth: authReducer,
  userProfile: userprofileSlice,
  settings: settingsSlice,
});

const persistedReducer = persistReducer(persistConfiig, reducer);
export const store = configureStore({
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
