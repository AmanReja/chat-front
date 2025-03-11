// import { React, useEffect, useState } from "react";
// import "../App.css";
// import cookies from "js-cookie";
// import toast, { Toaster } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import userpng from "../assets/images/user.png";
// import { useAuthstore } from "../Statemanagement/useAuthstore";

// function Navbar() {
//   const { authUser } = useAuthstore();
//   const [user, setUser] = useState([]);
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();
//   const userData = JSON.parse(localStorage.getItem("userData")) || {};
//   const [showOnlineOnly, setShowOnlineOnly] = useState(false);

//   const handelsicon = () => {
//     setOpen((prev) => !prev);
//   };

//   // const userdata = localStorage.getItem("userid");

//   // const userdata = localStorage.getItem("userid");

//   // const getuser = async () => {
//   //   const response = await fetch(
//   //     `/api/user/getoneuser/${localStorage.getItem("userid")}`
//   //   );
//   //   const data = await response.json();
//   //   setUser(data);
//   // };

//   // useEffect(() => {
//   //   getuser();
//   // }, [user]);

//   return (
//     <>
//       <nav className=" border-gray-200 bg-black flex justify-between items-center h-[70px] px-[50px]">
//         <div className="">
//           <a
//             href="#"
//             className="flex items-center space-x-3 rtl:space-x-reverse"
//           >
//             <img
//               src="https://flowbite.com/docs/images/logo.svg"
//               className="h-8"
//               alt="Flowbite Logo"
//             />
//             <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
//               Flip Chat
//             </span>
//           </a>
//         </div>
//         <div className="w-[250px] h-[45px] flex items-center">
//           <input
//             placeholder="Search here"
//             className={`transition-all duration-500 outline-none${
//               open ? " w-full h-full" : " w-0 h-0 duration-300"
//             }`}
//             type="text"
//           />
//           <button
//             onClick={handelsicon}
//             className={
//               open
//                 ? `transition-all duration-500 bg-blue-400 w-[50px] h-full`
//                 : "transition-all duration-500 rounded-full bg-lime-400 w-[50px] h-full"
//             }
//           >
//             <i className="fa-solid fa-magnifying-glass"></i>
//           </button>
//         </div>

//         <div className="flex items-center space-x-2">
//           <h1 className="text-white">{userData?.fullname}</h1>
//           {
//             <img
//               className="w-[40px] object-cover h-[40px] rounded-full"
//               src={userData?.userimage ? userData.userimage : userpng}
//               alt=""
//             />
//           }
//         </div>
//       </nav>
//     </>
//   );
// }

// export default Navbar;
