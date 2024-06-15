import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectRoute from "./components/auth/ProtectRoute";
import NotFound from "./pages/NotFound";
import Loader from "./components/layout/Loader";
// import Home from "./pages/Home";
// import Chat from "./pages/Chat";
// import Group from "./pages/Group";
// import { Login } from "./pages/Login";

const Home = lazy(() => import("./pages/Home")); //reather than importing all the pages in the beginning, it imports that specific page when it renders.
const Login = lazy(() => import("./pages/Login")); //reather than importing all the pages in the beginning, it imports that specific page when it renders.
const Chat = lazy(() => import("./pages/Chat")); //reather than importing all the pages in the beginning, it imports that specific page when it renders.
const Group = lazy(() => import("./pages/Group")); //reather than importing all the pages in the beginning, it imports that specific page when it renders.

let user = true;
const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<ProtectRoute user={user} />}>
            <Route path="/" element={<Home />} />
            <Route path="/group" element={<Group />} />
            <Route path="/chat/:chatId" element={<Chat />} />
          </Route>
          <Route
            path="/login"
            element={
              <ProtectRoute user={!user} redirect="/">
                <Login />
              </ProtectRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
