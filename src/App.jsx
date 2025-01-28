import { React, useEffect } from "react";
import Signup from "./components/Signup";
import "./App.css";
import { Outlet } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Content from "./components/Content";

import { Toaster } from "react-hot-toast";
import { useAuthstore } from "./Statemanagement/useAuthstore";
import Customtoast from "./components/Customtoast";

function App() {
  const { checkAuth, isCheckingauth } = useAuthstore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <Toaster></Toaster>
      <Navbar></Navbar>
      <Outlet>
        <Signup></Signup>
        <Login></Login>
        {/* <Sidebar></Sidebar> */}
        <Content></Content>
      </Outlet>
      {/* <Footer></Footer> */}
    </>
  );
}

export default App;
