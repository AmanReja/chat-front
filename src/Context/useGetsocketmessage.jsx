import { useEffect } from "react";
import { useSocketcontext } from "./SocketContext.jsx";
import useConversation from "../Statemanagement/useConversation.js";
import sound from "../assets/sound/noti.mp3";

function useGetsocketmessage() {
  const { socket } = useSocketcontext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    if (!socket) {
      return;
    }

    console.log("useGetsocketmessage called");

    socket.on("newMessage", (newMessage) => {
      console.log("New message received:", newMessage);

      const notification = new Audio(sound);
      notification.play();
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => socket.off("newMessage");
  }, [socket, setMessages, messages]);
  useEffect(() => {
    console.log("Socket connected:", socket?.connected);
  }, [socket]);
}

export default useGetsocketmessage;
