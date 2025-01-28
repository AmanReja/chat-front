import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import profile from "../assets/images/profile.jpg";
import userpng from "../assets/images/user.png";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";

import { useAuthstore } from "../Statemanagement/useAuthstore";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [Pass, setPass] = useState("");
  const [fullname, setFullname] = useState("");
  const [user, setUser] = useState([]);

  const { login, checkAuth } = useAuthstore();

  const userdata = localStorage.getItem("userid");

  const getuser = async () => {
    const response = await fetch(`/api/user/getoneuser/${userdata}`);
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getuser();
  }, []);
  // console.log(25, user);

  const handellogin = async (e) => {
    e.preventDefault();

    try {
      const old_user = {
        useremail: email,
        userpass: Pass
      };
      await login(old_user, navigate);

      setEmail("");
      setPass("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Toaster />
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="w-[100%] flex flex-col items-center">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Login to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={(e) => {
              handellogin(e);
            }}
            className="space-y-6"
            action="#"
            method="POST"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  onChange={(e) => {
                    setPass(e.target.value);
                  }}
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="off"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                login
              </button>
            </div>
            <p className="mt-10 text-center text-sm/6 text-gray-500">
              Not a member?
              <Link
                to="/signup"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                {""} sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
