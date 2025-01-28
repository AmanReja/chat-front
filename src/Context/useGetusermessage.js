import { useState, useEffect } from "react";
import useConversation from "../Statemanagement/useConversation.js";
import axios from "axios";

function useGetusermessage() {
  const [load, setLoad] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  // Define the getmessages function
  const getmessages = async () => {
    if (selectedConversation && selectedConversation._id) {
      setLoad(true);
      try {
        const response = await axios.get(
          `/api/message/get/${selectedConversation._id}`
        );
        setMessages(response.data.messages);
        console.log(55, response.data.messages);
        setLoad(false);
      } catch (error) {
        console.log("Error in fetching messages:", error);
        setLoad(false);
      }
    }
  };

  // Use effect to fetch messages when the selected conversation changes
  useEffect(() => {
    if (selectedConversation && selectedConversation._id) {
      getmessages();
    }
  }, [selectedConversation, setMessages]);

  return {
    messages,
    setMessages,
    load,
    getmessages,
    setLoad // Return the getmessages function
  };
}

export default useGetusermessage;
