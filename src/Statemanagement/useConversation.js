import React from "react";
import { create } from "zustand";
import { Toaster, toast } from "react-hot-toast";

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages })
}));

export default useConversation;
