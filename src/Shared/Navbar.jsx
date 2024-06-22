import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useStatus from "../Hooks/useStatus";
import { IoMenu } from "react-icons/io5";

const Navbar = () => {
  const { user, loading, logOut } = useAuth();
  const [isBlocked] = useStatus();

  if (loading) {
    return (
      <>
        <h1>loading...</h1>
      </>
    );
  }

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
          toast.success("Logged out");
        }
      });
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="mt-4">
      <div className="gap-2 flex justify-center mb-3 md:hidden">
        <NavLink to="/">
          <img className="w-10" src={logo} alt="MediNova Logo" />
        </NavLink>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-[#473288]">MediNova</h1>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="gap-2 hidden md:inline-flex">
          <NavLink to="/">
            <img className="w-16" src={logo} alt="MediNova Logo" />
          </NavLink>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-[#473288]">MediNova</h1>
            <p className="text-sm text-[#A6A5BD]">Diagnostic Center</p>
          </div>
        </div>

        <div className=" ml-3 md:ml-0">
          <ul className=" flex gap-5 items-center">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "bg-[#473288] p-2 text-white rounded-md" : ""
                }>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/alltests"
                className={({ isActive }) =>
                  isActive ? "bg-[#473288] p-2 text-white rounded-md" : ""
                }>
                All Tests
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/doctors"
                className={({ isActive }) =>
                  isActive ? "bg-[#473288] p-2 text-white rounded-md" : ""
                }>
                Doctors
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "bg-[#473288] p-2 text-white rounded-md" : ""
                }>
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "bg-[#473288] p-2 text-white rounded-md" : ""
                }>
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="flex gap-2 items-center bg-blue-100 md:pl-3 md:pr-1 rounded-full">
          <div className=" hidden md:table-cell">
            <IoMenu className=" text-2xl" />
          </div>
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="User Avatar"
                    src={
                      user?.photoURL ||
                      "https://i.ibb.co/DpMk3wY/random-User.jpg"
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                {isBlocked ? (
                  <li className="disabled">
                    <span>Dashboard</span>
                  </li>
                ) : (
                  <li>
                    <NavLink to="/dashboard">
                      <span>Dashboard</span>
                    </NavLink>
                  </li>
                )}
                <li onClick={handleLogout}>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <NavLink to="/login">
              <button className="btn rounded-full bg-[#8F85DD] text-white hover:bg-[#7464e9]">
                Sign-in
              </button>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
