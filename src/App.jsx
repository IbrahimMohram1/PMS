import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./Shared/AuthLayout/AuthLayout";
import NotFound from "./Shared/NotFound/NotFound";
import Login from "./AuthModule/Components/Login/Login";
import Register from "./AuthModule/Components/Register/Register";
import ForgetPassword from "./AuthModule/Components/ForgetPassword/ForgetPassword";
import ResetPassword from "./AuthModule/Components/ResetPassword/ResetPassword";
import VerifyAccount from "./AuthModule/Components/VerifyAccount/VerifyAccount";
import MasterLayout from "./Shared/MasterLayout/MasterLayout";
import Dashboard from "./DashboardMoudule/Dashboard";
import { AuthContextProvider } from "./Context/AuthContext";
import { Bounce, ToastContainer } from "react-toastify";
import ChangePassword from "./AuthModule/Components/ChangePassword/ChangePassword";
import Users from "./UsersModule/Components/Users/Users";
import ProtectedRoute from "./Shared/ProtectedRoute/ProtectedRoute";
import Projects from "./ProjectModule/Component/Projects/Projects";
import ProjectData from "./ProjectModule/Component/Projects/ProjectData";
import MyProjects from "./ProjectModule/Component/Projects/MyProjects";

function App() {
  let routes = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "verify-account", element: <VerifyAccount /> },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "change-password", element: <ChangePassword /> },
      ],
    },
    {
      path: "dashboard",
      // element:<ProtectedRoute><MasterLayout /></ProtectedRoute>,
     element:<MasterLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "users", element: <Users /> },
        {path:"Projects",element: <Projects/>},
        {path:'Project-Data',element:<ProjectData/> },
        {path:"Project-Data/:id",element:<ProjectData/> },
        {path:"MyProjects",element:<MyProjects/> },

      ],
    }
  ]);

  return (
    <>
      <AuthContextProvider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Bounce}
        />
        <RouterProvider router={routes}></RouterProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
