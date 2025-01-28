import React, { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { useAuth } from "./authProvider";

const SocketContext = createContext();
export const useSocketcontext = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { authUser } = useAuth();
  const [onlineusers, setOnlineusers] = useState([]);

  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:3000", {
        query: {
          userid: authUser._id
        }
      });

      setSocket(socket);
      socket.on("getonline", (users) => {
        setOnlineusers(users);
        console.log("login");
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineusers }}>
      {children}
    </SocketContext.Provider>
  );
};
