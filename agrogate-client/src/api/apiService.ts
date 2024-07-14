import toast from "react-hot-toast";
import { globalAxios } from "./globalAxios";

const apiService = (url: string, method: string, data?: object | string) => {
  return new Promise((resolve, reject) => {
    globalAxios({
      url,
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        if (error?.message === "Network Error") {
          toast.error("Please check your internet connection");
          console.error("Please check your internet connection");
        }
        return reject(error);
      });
  });
};

export default apiService;
