import React from "react";
import profile from "../assets/images/profile.jpg";
import { Link, useNavigate } from "react-router-dom";
import userpng from "../assets/images/user.png";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "../App.css";
import { useAuth } from "../Context/authProvider";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [Pass, setPass] = useState("");
  const [fullname, setFullname] = useState("");
  const [image, setImage] = useState("");
  const [imageid, setImageid] = useState("");
  const [load, setLoad] = useState(false);
  const { authUser, setAuthUser } = useAuth();

  console.log(21, authUser);

  const handleImageUpload = async (e) => {
    setLoad(true);
    console.log(16, "hiii");
    const file = e.target.files[0];
    if (!file) {
      setLoad(false);
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "l838hc61"); // Replace 'your_upload_preset' with your actual upload preset

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/djpw8rdeu/image/upload",
        formData
      );

      console.log("response: ", res.data);
      const x = res.data.secure_url;
      const y = res.data.public_id;

      console.log(x, y);

      setImage(x);
      setImageid(y);
      setLoad(false);
    } catch (error) {
      console.error("Error uploading image: ", error);
      setLoad(false);
    }
  };

  const handelregister = async (e) => {
    e.preventDefault();
    const new_user = {
      useremail: email,
      fullname: fullname,
      userpass: Pass,
      userimage: image,
      userimageid: imageid
    };
    const requestoptions = {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(new_user)
    };
    const response = await fetch(`/api/auth/signup`, requestoptions);
    const data = await response.json();
    console.log(27, data);
    setAuthUser(data);
    if (response.status == 201) {
      toast.success("You have successfully signup");
      window.location.reload();
      setEmail("");
      setPass("");
      navigate("/");
    } else if (response.status == 400) {
      Swal.fire({
        title: "user already exeist",
        text: "sign up failed",
        icon: "warning"
      });
    }
  };

  return (
    <>
      <Toaster></Toaster>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="w-[100%] flex flex-col items-center">
          <input
            onChange={(e) => {
              handleImageUpload(e);
            }}
            id="userImage"
            className="hidden"
            type="file"
          />
          <label htmlFor="userImage">
            {load ? (
              <div className="loader"></div>
            ) : (
              <img
                className=" w-[80px] h-[80px] object-cover rounded-full"
                src={userpng}
                alt="Your Company"
              />
            )}
          </label>

          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign Up
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={(e) => {
              handelregister(e);
            }}
            className="space-y-6"
            action="#"
            method="POST"
          >
            <div>
              <label
                htmlFor="fullname"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Full name
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => {
                    setFullname(e.target.value);
                  }}
                  type="text"
                  name="fullname"
                  id="fullname"
                  autoComplete="off"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
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
                Sign in
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm/6 text-gray-500">
            already rgistered?
            <Link
              to="/"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              {""}login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;
