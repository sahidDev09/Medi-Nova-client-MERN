import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Error from "../Pages/Error";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import DashboardLay from "../Layout/DashboardLay";
import UpAppointments from "../Pages/UserDashborad/UpAppointments";
import MyTestResult from "../Pages/UserDashborad/MyTestResult";
import MyProfile from "../Pages/UserDashborad/MyProfile";
import Allusers from "../Pages/AdminDashboard/Allusers";
import PrivateRoute from "./PrivateRoute";
import AdminRoutes from "./AdminRoutes";
import AddTest from "../Pages/AdminDashboard/AddTest";
import Testmanage from "../Pages/AdminDashboard/Testmanage";
import UpdateTest from "../Pages/AdminDashboard/UpdateTest";
import AllTests from "../Pages/Home/AllTests";
import TestDetails from "../Pages/Home/TestDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/alltests",
        element: <AllTests />,
      },
      {
        path: "/alltests/:id",
        element: (
          <PrivateRoute>
            <TestDetails />,
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLay></DashboardLay>
      </PrivateRoute>
    ),
    children: [
      // all user dashboard routes

      {
        index: true,
        path: "/dashboard/myAppointments",
        element: <UpAppointments />,
      },
      {
        path: "/dashboard/myTestresults",
        element: <MyTestResult />,
      },
      {
        path: "/dashboard/myProfile",
        element: <MyProfile />,
      },

      //all admin dashboarad routes

      {
        path: "/dashboard/allusers",
        element: (
          <AdminRoutes>
            <Allusers />,
          </AdminRoutes>
        ),
      },

      {
        path: "/dashboard/addtest",
        element: (
          <AdminRoutes>
            <AddTest />,
          </AdminRoutes>
        ),
      },

      {
        path: "/dashboard/managetests",
        element: (
          <AdminRoutes>
            <Testmanage />
          </AdminRoutes>
        ),
      },

      {
        path: "/dashboard/updatetests/:id",
        element: (
          <AdminRoutes>
            <UpdateTest />
          </AdminRoutes>
        ),
      },
    ],
  },
]);
