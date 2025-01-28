import React from "react";
import chat from "../assets/icons/chat.png";
import update from "../assets/icons/updates.png";
import phone from "../assets/icons/telephone.png";

function Footer() {
  return (
    <>
      <nav className="bg-white w-[100%]">
        <ul className="flex justify-center items-center gap-[30px]">
          <li>
            <img className="w-[40px] h-[40px] object-cover" src={chat} alt="" />
          </li>
          <li>
            <img
              className="w-[40px] h-[40px] object-cover"
              src={update}
              alt=""
            />
          </li>
          <li>
            <img
              className="w-[40px] h-[40px] object-cover"
              src={phone}
              alt=""
            />
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Footer;
