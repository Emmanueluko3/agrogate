import { io } from "socket.io-client";

const initializedSocket = () => {
  const accessToken = localStorage.getItem("accessToken");

  const socketUrl = process.env.REACT_APP_BASE_URL;

  return io(socketUrl, {
    auth: {
      token: accessToken,
    },
  });
};

export default initializedSocket;
