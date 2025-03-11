import { create } from "zustand";
import toast from "react-hot-toast";
import React, { useEffect } from "react";
import axios from "axios";
import cookies from "js-cookie";

import sound from "../assets/sound/noti.mp3";
import { useAuthstore } from "./useAuthstore";
import { io } from "socket.io-client";
import Customtoast from "../components/Customtoast";
const BASE_URL = "https://chat-backend-1-ukrx.onrender.com";

export const useChatstore = create((set, get) => ({
  messages: [],
  users: [],
  onlineUsers: [],
  selectedUser: null,
  isUsersloading: false,
  isMessagesloading: false,

  getUsers: async () => {
    set({ isUsersloading: true });

    try {
      const token = cookies.get("jwt");
      const response = await axios.get(`${BASE_URL}/user/getuserprofile`, {
        withCredentials: true
        // headers: {
        //   Authorization: `Bearer ${token}`
        // }
      });
      set({ users: response.data });
      console.log("allU", response.data);
    } catch (error) {
      toast.error(error.response.data);
      console.log("error in getusers", error);
    } finally {
      set({ isUsersloading: false });
    }
  },

  getMessages: async (userid) => {
    set({ isMessagesloading: true, messages: [] }); // Clear messages first
    try {
      const response = await axios.get(`/api/message/get/${userid}`);
      set({ messages: response.data.messages });
      console.log("messages", response.data.messages);
    } catch (error) {
      console.log("error in getmessages", error);
    } finally {
      set({ isMessagesloading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    const socket = useAuthstore.getState().socket;

    if (!selectedUser) {
      toast.error("No user selected.");
      return;
    }

    try {
      // Send the message to the server
      const res = await axios.post(
        `/api/message/send/${selectedUser._id}`,
        messageData
      );

      if (res.status === 201) {
        const newMessage = res.data;
        // Customtoast()
        console.log("me", res.data);

        // Add the message to the state
        set({ messages: [...messages, newMessage] });

        // Emit the new message via the socket
        if (socket) {
          socket.emit("newMessage", newMessage);
        }
      }
    } catch (error) {
      console.log("Error sending message:", error);
      toast.error("Failed to send message.");
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthstore.getState().socket;
    // if (!socket) {
    //   return;
    // }
    if (!socket) {
      return;
    }

    console.log("useGetsocketmessage called");
    if (socket) {
      socket.on("newMessage", (newMessage) => {
        const notification = new Audio(sound);
        notification.play();
        set({
          messages: [...get().messages, newMessage]
        });
      });
    }
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthstore.getState().socket;
    if (socket) {
      socket.off("newMessage");
    } else {
      return;
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser })
}));
