import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { ImProfile } from "react-icons/im";
import { FaClipboardList, FaUsers } from "react-icons/fa";
import { GiHypodermicTest } from "react-icons/gi";
import { RiLogoutBoxRFill } from "react-icons/ri";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { AiOutlineBars } from "react-icons/ai";
import { useState } from "react";
import { PiFlagBannerFill } from "react-icons/pi";
import { MdNoteAdd, MdOutlinePageview } from "react-icons/md";
import useAdmin from "../../Hooks/useAdmin";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [isActive, setIsActive] = useState(false);

  const [isAdmin] = useAdmin();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to logout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Logout!",
      }).then((result) => {
        if (result.isConfirmed) {
          logOut();
          navigate("/");
          toast.success("Logged out");
        }
      });
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const handleSideToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      {/* sidebar for mobile view */}
      <div className="flex justify-between items-center md:hidden">
        <div className="gap-2 flex justify-start items-center">
          <NavLink to="/">
            <img className="w-14" src={logo} alt="" />
          </NavLink>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-[#473288]">MediNova</h1>
            <p className="text-sm text-[#A6A5BD]">Diagnostic center</p>
          </div>
        </div>
        <button onClick={handleSideToggle} className="p-4 focus:outline-none">
          <AiOutlineBars className="text-xl" />
        </button>
      </div>

      {/* sidebar for normal screen */}
      <aside
        className={`fixed md:static top-0 left-0 w-72 h-screen px-5 py-8 overflow-y-auto bg-blue-50 border-r rtl:border-r-0 rtl:border-l transition-transform transform ${
          isActive ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}>
        <div className="gap-2 justify-start items-center flex">
          <NavLink to="/">
            <img className="w-16" src={logo} alt="" />
          </NavLink>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-[#473288]">MediNova</h1>
            <p className="text-sm text-[#A6A5BD]">Diagnostic center</p>
          </div>
        </div>

        <div className="flex flex-col justify-between flex-1 mt-6">
          {isAdmin ? (
            <nav className="-mx-3 space-y-6">
              <div className="space-y-3">
                <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">
                  Admin panel
                </label>

                <NavLink
                  to="/dashboard/statistics"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "nav-link-active" : ""}`
                  }>
                  <PiFlagBannerFill />
                  <span className="mx-2 text-sm font-medium">Statistic</span>
                </NavLink>

                <NavLink
                  to="/dashboard/bannerlist"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "nav-link-active" : ""}`
                  }>
                  <PiFlagBannerFill />
                  <span className="mx-2 text-sm font-medium">Banner List</span>
                </NavLink>

                <NavLink
                  to="/dashboard/addtest"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "nav-link-active" : ""}`
                  }>
                  <MdNoteAdd />
                  <span className="mx-2 text-sm font-medium">Add Test</span>
                </NavLink>

                <NavLink
                  to="/dashboard/managetests"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "nav-link-active" : ""}`
                  }>
                  <MdNoteAdd />
                  <span className="mx-2 text-sm font-medium">Manage Tests</span>
                </NavLink>

                <NavLink
                  to="/dashboard/addtestresults"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "nav-link-active" : ""}`
                  }>
                  <MdOutlinePageview />
                  <span className="mx-2 text-sm font-medium">
                    Add Test Results
                  </span>
                </NavLink>

                <NavLink
                  to="/dashboard/allusers"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "nav-link-active" : ""}`
                  }>
                  <FaUsers />
                  <span className="mx-2 text-sm font-medium">All Users</span>
                </NavLink>
              </div>
              <div className="space-y-3">
                <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">
                  PERSONAL INFORMATION
                </label>

                <NavLink
                  to="/dashboard/myProfile"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "nav-link-active" : ""}`
                  }>
                  <ImProfile />
                  <span className="mx-2 text-sm font-medium">My Profile</span>
                </NavLink>
                <div
                  onClick={handleLogout}
                  className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-red-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                  <RiLogoutBoxRFill className="text-red-400" />
                  <span className="mx-2 text-sm font-medium">Logout</span>
                </div>
              </div>
            </nav>
          ) : (
            <nav className="-mx-3 space-y-6">
              <div className="space-y-3">
                <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">
                  ANALYTICS
                </label>

                <NavLink
                  to="/dashboard/myAppointments"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "nav-link-active" : ""}`
                  }>
                  <FaClipboardList />
                  <span className="mx-2 text-sm font-medium">
                    My Upcoming Appointments
                  </span>
                </NavLink>

                <NavLink
                  to="/dashboard/myTestresults"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "nav-link-active" : ""}`
                  }>
                  <GiHypodermicTest />
                  <span className="mx-2 text-sm font-medium">
                    My Test Results
                  </span>
                </NavLink>
              </div>
              <div className="space-y-3">
                <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">
                  PERSONAL INFORMATION
                </label>

                <NavLink
                  to="/dashboard/myProfile"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "nav-link-active" : ""}`
                  }>
                  <ImProfile />
                  <span className="mx-2 text-sm font-medium">My Profile</span>
                </NavLink>
                <div
                  onClick={handleLogout}
                  className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-red-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                  <RiLogoutBoxRFill className="text-red-400" />
                  <span className="mx-2 text-sm font-medium">Logout</span>
                </div>
              </div>
            </nav>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
