import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = createContext<any>(null);

export function useSocket() {
  return useContext(SocketContext);
}

export const SocketProvider: React.FC<any> = ({ id, children }) => {
  const [socket, setSocket]: any = useState();

  useEffect((): any => {
    const newSocket = io("http://localhost:3333", { query: { id } });

    setSocket(newSocket);
    return () => newSocket.close();
  }, [id]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
