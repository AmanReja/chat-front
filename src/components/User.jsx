import React, { useEffect } from "react";
import userpng from "../assets/images/user.png";

import { useChatstore } from "../Statemanagement/useChatstore";
import Skeleton from "./Skeleton";
import { useAuthstore } from "../Statemanagement/useAuthstore";

function User({ user }) {
  const { authUser, onlineUsers } = useAuthstore();
  // const { selectedConversation, setSelectedConversation } = useConversation();
  const {
    getUsers,
    messages,
    users,
    selectedUser,
    isMessagesloading,
    isUsersloading,
    setSelectedUser
  } = useChatstore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);
  console.log(users);

  if (isUsersloading) {
    return <Skeleton></Skeleton>;
  }

  const isOnline = Array.isArray(onlineUsers) && onlineUsers.includes(user._id);

  const isSelected = selectedUser?._id === user?._id;

  return (
    <div
      onClick={() => setSelectedUser(user)}
      className={`flex flex-row hover:bg-blue-200 py-4 px-2 justify-center items-center ${
        isSelected ? "bg-blue-300" : ""
      }`}
    >
      {" "}
      <div class={`avatar ${isOnline ? "online" : ""}`}>
        <div class="w-20 rounded-full">
          <img src={user.userimage ? user.userimage : userpng} />
        </div>
      </div>
      <div className="w-full">
        <span className="text-black font-thin">{user?.fullname}</span>
      </div>
      <div className="">{isOnline ? "Online" : "Offline"}</div>
    </div>
  );
}

export default User;
