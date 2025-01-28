import React from "react";
import Getalluser from "../Context/Getalluser";
import User from "./User";
import "./Message.css";

function Alluser() {
  const [alluser, load] = Getalluser();

  if (load) {
    return <div>Loading...</div>;
  }

  if (!alluser.length) {
    return <div>No users found.</div>;
  }

  return (
    <div className=" container no-scrollbar w-[520px] h-[84vh] overflow-y-auto box-border relative pl-[55px]">
      {alluser.map((user, index) => (
        <User key={index} user={user} />
      ))}
    </div>
  );
}

export default Alluser;
