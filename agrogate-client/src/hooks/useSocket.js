import { useEffect, useState } from "react";
import initializedSocket from "../config/socketIo";

const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(initializedSocket);

    return () => {
      initializedSocket.close();
    };
  }, []);

  return socket;
};

export default useSocket;
