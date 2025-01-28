import { React, useState } from "react";

import { useChatstore } from "../Statemanagement/useChatstore.js";

function Sendinput() {
  const { sendMessage } = useChatstore();
  // const { selectedConversation } = useConversation();
  // const { getmessages, setLoad } = useGetusermessage();
  const [message, setMessage] = useState("");

  const handelsend = async (e) => {
    e.preventDefault();

    try {
      await sendMessage({
        message: message.trim()
      });

      // Clear form
      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handelsend(e);
      }}
      className="w-[66%] fixed bottom-[0px] right-0 h-[60px] flex justify-center items-center"
    >
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Send message"
        className="w-[80%] pl-[5px] text-[20px] font-thin h-[50px] bg-black shadow-2xl border rounded text-white outline-none"
        type="text"
        id="INP"
      />
      <button type="submit" className="w-[80px] h-[50px] bg-lime-400">
        Send
      </button>
    </form>
  );
}

export default Sendinput;
