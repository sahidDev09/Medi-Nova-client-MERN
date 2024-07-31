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
import WelcomeDash from "../Pages/WelcomeDash";
import AllBanner from "../Pages/AdminDashboard/AllBanner";
import AddBanner from "../Pages/AdminDashboard/AddBanner";
import Contact from "../Pages/Contact/Contact";
import About from "../Pages/About/About";
import Doctors from "../Pages/Home/Doctors";
import AllReservation from "../Pages/AdminDashboard/AllReservation";
import Statistic from "../Pages/AdminDashboard/Statistic/Statistic";

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
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/doctors",
        element: <Doctors />,
      },
      {
        path: "/alltests/:id",
        element: (
          <PrivateRoute>
            <TestDetails />
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
        <DashboardLay />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <WelcomeDash />,
      },

      // all user dashboard routes
      {
        path: "myAppointments",
        element: <UpAppointments />,
      },
      {
        path: "myTestresults",
        element: <MyTestResult />,
      },
      {
        path: "myProfile",
        element: <MyProfile />,
      },

      // all admin dashboard routes
      {
        path: "allusers",
        element: (
          <AdminRoutes>
            <Allusers />
          </AdminRoutes>
        ),
      },
      {
        path: "statistics",
        element: (
          <AdminRoutes>
            <Statistic />
          </AdminRoutes>
        ),
      },
      {
        path: "addtest",
        element: (
          <AdminRoutes>
            <AddTest />
          </AdminRoutes>
        ),
      },
      {
        path: "managetests",
        element: (
          <AdminRoutes>
            <Testmanage />
          </AdminRoutes>
        ),
      },
      {
        path: "updatetests/:id",
        element: (
          <AdminRoutes>
            <UpdateTest />
          </AdminRoutes>
        ),
      },
      {
        path: "bannerlist",
        element: (
          <AdminRoutes>
            <AllBanner />,
          </AdminRoutes>
        ),
      },

      {
        path: "add-banner",
        element: (
          <AdminRoutes>
            <AddBanner />
          </AdminRoutes>
        ),
      },
      {
        path: "reservation/:test_id",
        element: (
          <AdminRoutes>
            <AllReservation />
          </AdminRoutes>
        ),
      },
    ],
  },
]);
