import { React, useEffect } from "react";

import User from "./User";
import "./Message.css";
import { useChatstore } from "../Statemanagement/useChatstore";
import Skeleton from "./Skeleton";

function Alluser() {
  const { users, isUsersloading, getUsers } = useChatstore();

  // if (isUsersloading) {
  //   return <Skeleton></Skeleton>;
  // }

  // if (!users.length) {
  //   return <div>No users found.</div>;
  // }
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div className=" container no-scrollbar w-[520px] h-[84vh] overflow-y-auto box-border relative pl-[55px]">
      {users.map((user, index) => (
        <User key={index} user={user} />
      ))}
    </div>
  );
}

export default Alluser;
