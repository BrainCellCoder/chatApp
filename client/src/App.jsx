import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectRoute from "./components/auth/ProtectRoute";
import NotFound from "./pages/NotFound";
import Loader from "./components/layout/Loader";
import axios from "axios";
import { server } from "./constants/config.js";
import { useDispatch, useSelector } from "react-redux";
import { userNotExists } from "./redux/reducers/auth.js";
import { Toaster } from "react-hot-toast";
// import AdminLogin from "./pages/admin/AdminLogin";
// import Home from "./pages/Home";
// import Chat from "./pages/Chat";
// import Group from "./pages/Group";
// import { Login } from "./pages/Login";

const Home = lazy(() => import("./pages/Home")); //reather than importing all the pages in the beginning, it imports that specific page when it renders.
const Login = lazy(() => import("./pages/Login")); //reather than importing all the pages in the beginning, it imports that specific page when it renders.
const Chat = lazy(() => import("./pages/Chat")); //reather than importing all the pages in the beginning, it imports that specific page when it renders.
const Group = lazy(() => import("./pages/Group")); //reather than importing all the pages in the beginning, it imports that specific page when it renders.
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const DashBoard = lazy(() => import("./pages/admin/DashBoard"));
const UserManagement = lazy(() => import("./pages/admin/UserManagement"));
const ChatManagement = lazy(() => import("./pages/admin/ChatManagement"));
const MessageManagement = lazy(() => import("./pages/admin/MessageManagement"));
// const user = false;
const App = () => {
  let { user, loader } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(`${server}/api/v1/user/me`)
      .then((res) => console.log(res))
      .catch((err) => dispatch(userNotExists()));
  }, [dispatch]);

  return loader ? (
    <Loader />
  ) : (
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
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<DashBoard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/chats" element={<ChatManagement />} />
          <Route path="/admin/messages" element={<MessageManagement />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Toaster position="bottom-center" />
    </Router>
  );
};

export default App;
