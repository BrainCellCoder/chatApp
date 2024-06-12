import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Chat } from "./pages/Chat";
import { Group } from "./pages/Group";
import { Login } from "./pages/Login";

// const Home = lazy(() => import("./pages/Home")); //reather than importing all the pages in the beginning, it imports that specific page when it renders.
// const Login = lazy(() => import("./pages/Login")); //reather than importing all the pages in the beginning, it imports that specific page when it renders.
// const Chat = lazy(() => import("./pages/Chat")); //reather than importing all the pages in the beginning, it imports that specific page when it renders.
// const Group = lazy(() => import("./pages/Group")); //reather than importing all the pages in the beginning, it imports that specific page when it renders.

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat/:chatId" element={<Chat />} />
        <Route path="/group" element={<Group />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
