import React from "react";
import User from "./User";
import Menubar from "./Menubar";
import Alluser from "./Alluser";
import "./Message.css";

function Left() {
  return (
    <>
      {" "}
      <div className="">
        <Menubar></Menubar>
        <Alluser></Alluser>
      </div>
    </>
  );
}

export default Left;
