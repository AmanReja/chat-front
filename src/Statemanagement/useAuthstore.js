import { create } from "zustand";
import toast from "react-hot-toast";
import React from "react";
import axios from "axios";
import cookies from "js-cookie";
import { io } from "socket.io-client";
import Customtoast from "../components/Customtoast";

// const BASE_URL = "http://localhost:3000";
const BASE_URL = "https://chat-backend-1-ukrx.onrender.com";

export const useAuthstore = create((set, get) => ({
  authUser: null,
  isLoggingIn: false,
  isSigningUp: false,
  isCheckingauth: false,
  onlineUsers: [],
  socket: null,
  checkAuth: async () => {
    try {
      const res = await axios.get(`${BASE_URL}/auth/checkauth`);

      set({ authUser: res.data });
      get().connectSocket();
      console.log("authchecker", res.data);
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingauth: false });
    }
  },
  // deleteuser: async (userid, navigate) => {
  //   try {
  //     const res = await axios.delete(`/api/user/deleteuser/${userid._id}`);

  //     console.log("messages", res.data.messages);
  //     if (res.data !== null) {
  //       toast.success("user has been deleted");
  //       set({ authUser: null });
  //       navigate("/");
  //     } else {
  //       toast.error("unable to delete user");
  //     }
  //   } catch (error) {
  //     console.log("error in getmessages", error);
  //   }
  // },

  signUp: async (data, navigate) => {
    set({ isSigningUp: true });
    try {
      const res = await axios.post(`${BASE_URL}/auth/signup`, data);
      set({ authUser: res.data });
      if (res.data !== null) {
        toast.success("Account created successfully");
        navigate("/");
      } else {
        toast.error("Account creation failed");
      }

      get().connectSocket();
    } catch (error) {
      console.log("auth signup", error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data, navigate) => {
    set({ isLoggingIn: true });
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, data);
      console.log(22, res);

      const log = res.data;
      if (log._id !== null) {
        Customtoast(res.data);

        navigate("/content");
      }

      set({ authUser: res.data });
      set({ onlineUsers: res.data });

      localStorage.setItem("userData", JSON.stringify(res.data));

      get().connectSocket();
      // Use navigate instead of window.location.href
    } catch (error) {
      toast.error("login failed");
      console.log("auth login", error);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async (navigate) => {
    try {
      await axios.post(`${BASE_URL}/auth/logout`);
      set({ authUser: null });
      toast.success("Logged out successfully");

      get().disconnectSocket();
      navigate("/");
      localStorage.removeItem("userData");
    } catch (error) {
      console.log("auth logout", error);
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userid: authUser._id
      }
    });
    socket.connect();

    set({ socket: socket });

    socket.on("getonline", (users) => {
      set({ onlineUsers: users });
    });
  },
  disconnectSocket: () => {
    const { socket } = get();
    if (socket?.connected) {
      socket.off("getonline"); // Remove listeners
      socket.disconnect();
    }
  }
}));
