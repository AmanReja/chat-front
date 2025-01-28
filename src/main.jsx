import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";
import Content from "./components/Content.jsx";

import { SocketProvider } from "./Context/SocketContext.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route path="/" index element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/content" element={<Content />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SocketProvider>
      <RouterProvider router={router} />
    </SocketProvider>
  </StrictMode>
);
