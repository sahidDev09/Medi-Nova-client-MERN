import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import useAuth from "../Hooks/useAuth";
import { HashLoader } from "react-spinners";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, loading, logOut } = useAuth();

  if (loading) {
    return (
      <div className="mx-auto flex justify-center items-center">
        <HashLoader color="#36d7b7" />
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to logout ?",
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
    <div className=" mt-4">
      <div className=" flex justify-between">
        <div className=" flex gap-2">
          <NavLink to="/">
            <img className=" w-16" src={logo} alt="" />
          </NavLink>
          <div className="flex flex-col">
            <h1 className=" text-2xl font-bold text-[#473288]">MediNova</h1>
            <p className=" text-sm text-[#A6A5BD]">Diagonistic center</p>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <div className=" md:inline hidden">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto focus:outline-[#8F85DD]"
            />
          </div>
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
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
                <li>
                  <NavLink to="/dashboard">
                    <span>Dashboard</span>
                  </NavLink>
                </li>
                <li onClick={handleLogout}>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <NavLink to="/login">
              <button className=" btn rounded-full bg-[#8F85DD] text-white hover:bg-[#7464e9]">
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
