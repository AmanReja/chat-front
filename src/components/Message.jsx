import React, { useEffect, useRef } from "react";
import useConversation from "../Statemanagement/useConversation.js";
import MessageContent from "./MessageContent.jsx";
import chat from "../assets/icons/chatb.png";
import useGetsocketmessage from "../Context/useGetsocketmessage.jsx";
import { useChatstore } from "../Statemanagement/useChatstore.js";
import Messageskeleton from "./Messageskeleton.jsx";
import { useAuthstore } from "../Statemanagement/useAuthstore.js";
import Sendinput from "./Sendinput.jsx";

function Message() {
  const { authUser, onlineUsers, checkAuth } = useAuthstore();
  console.log("online", onlineUsers);

  const {
    getMessages,
    messages,
    setMessages,
    selectedUser,
    isMessagesloading,
    sendMessage,
    subscribeToMessages,
    unsubscribeFromMessages
  } = useChatstore();

  const lastMessage = useRef();

  // Fetch messages for the selected user
  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  // Scroll to the last message when messages update
  useEffect(() => {
    if (lastMessage.current) {
      lastMessage.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Skeleton loader while messages are loading
  if (isMessagesloading) {
    return <Messageskeleton />;
  }

  // Check if there are no messages between the sender and receiver
  const noMessages = !selectedUser || messages.length === 0;

  return (
    <div className="message-container">
      {noMessages ? (
        // Show "Start conversation" prompt
        <div className="flex justify-center items-center flex-col">
          <img className="w-[60px] h-[60px]" src={chat} alt="Chat Icon" />
          <p>Start conversation</p>
        </div>
      ) : (
        // Render messages
        <div className="messages">
          {messages.map((m, index) => (
            <div
              key={m._id}
              ref={index === messages.length - 1 ? lastMessage : null}
            >
              <MessageContent m={m} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Message;
