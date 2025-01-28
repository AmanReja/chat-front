import { React, useEffect, useRef } from "react";
import Message from "./Message";

import Sendinput from "./Sendinput";
import { useChatstore } from "../Statemanagement/useChatstore";
import { useAuthstore } from "../Statemanagement/useAuthstore";
import "./Message.css";

function Right() {
  const { onlineUsers } = useAuthstore();

  const {
    getUsers,
    messages,
    users,
    selectedUser,
    isMessagesloading,
    isUsersloading,
    setSelectedUser
  } = useChatstore();
  const conversationName = selectedUser ? selectedUser.fullname : "";
  const conversationImage = selectedUser ? selectedUser.userimage : "";

  // Reference for the messages container
  const messagesEndRef = useRef(null);

  // Scroll to the bottom of the chat container whenever the component renders
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedUser]); // Dependency array: you can update this if you need to listen to other states

  return (
    <div className="right-content">
      <div
        className={`w-[66%] absolute top-[70px] right-0${
          selectedUser ? " bg-black" : "bg-white"
        } left-[520px] flex h-[80px] justify-center items-center`}
      >
        <p className="text-white font-thin text-2xl">{conversationName}</p>
        {conversationImage && (
          <img
            className="w-[60px] h-[60px] object-cover rounded-full"
            src={conversationImage}
            alt={conversationName}
          />
        )}
      </div>

      <div
        className="container w-[66%] fixed top-[170px] max-h-[450px] h-auto left-[520px] overflow-y-auto flex flex-col"
        style={{ paddingBottom: "10px" }} // Ensures some padding at the bottom
      >
        <Message />
        {/* Add this ref at the end of the message list */}
        <div ref={messagesEndRef} />
      </div>
      <Sendinput></Sendinput>
    </div>
  );
}

export default Right;
