import { useAuthstore } from "../Statemanagement/useAuthstore";
import { useChatstore } from "../Statemanagement/useChatstore.js";
import userpng from "../assets/images/user.png";

function MessageContent({ m }) {
  const { selectedUser } = useChatstore();
  const userData = JSON.parse(localStorage.getItem("userData")) || {};
  console.log(22, userData);

  const itsme = m.senderid === userData._id;
  const chatname = itsme ? "chat-end" : "chat-start";
  const chatcolor = itsme ? "bg-blue-400" : "bg-lime-400";
  const chatimage = itsme
    ? userData.userimage || userpng
    : selectedUser.userimage || userpng;

  return (
    <div className={`chat ${chatname}`}>
      <div
        className={`chat-bubble text-white ${chatcolor} 
          max-w-[80%] px-4 py-2 rounded-lg`}
      >
        {" "}
        {m.message}
      </div>
      <div class="w-10 rounded-full">
        <img
          className="rounded-full h-[35px] w-[60px] object-contain"
          alt="Tailwind CSS chat bubble component"
          src={chatimage}
        />
      </div>
    </div>
  );
}
export default MessageContent;
