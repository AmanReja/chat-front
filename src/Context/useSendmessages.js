// import { useState, useEffect } from "react";
// import useConversation from "../Statemanagement/useConversation.js";
// import axios from "axios";

// function useSendmessages() {
//   const [load, setLoad] = useState(false);
//   const { messages, setMessages, selectedConversation } = useConversation();

//   const sendmessages = async (message) => {
//     if (selectedConversation && selectedConversation._id) {
//       setLoad(true);
//       try {
//         const response = await axios.post(
//           `/api/message/get/${selectedConversation._id}`,
//           { message }
//         );
//         // Correct way to update the messages state
//         setMessages((prevMessages) => [...prevMessages, response.data]);
//         setLoad(false);
//       } catch (error) {
//         console.log("error in sendmessage", error);
//         setLoad(false); // Stop loading if there's an error
//       }
//     }
//   };
//   useEffect(() => {
//     sendmessages();
//   }, [selectedConversation, setMessages]);
//   // Return the load state and the sendmessages function to be used in the component
//   return { load, sendmessages };
// }

// export default useSendmessages;
