import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import apiService from "../../../api/apiService";

interface paymentSettingsState {
  paymentSettings?: object | undefined;
  donationSettings?: object | undefined;
}

const initialState: paymentSettingsState = {
  paymentSettings: undefined,
  donationSettings: undefined,
};

export const fetchPaymentSettings = () => async (dispatch: any) => {
  try {
    const response: any = await apiService("/api/v1/creators/bank", "GET");
    dispatch(setPaymentSettings(response.data.data));
    return response.data.data;
  } catch (error: any) {
    if (error.message !== "Network Error") {
      toast.error("An error occurred while retrieving data");
      return error;
    }
  }
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setPaymentSettings(state, action) {
      state.paymentSettings = action.payload;
    },
    setDonationSettings(state, action) {
      state.donationSettings = action.payload;
    },
  },
});

export const { setPaymentSettings, setDonationSettings } =
  settingsSlice.actions;
export default settingsSlice.reducer;
