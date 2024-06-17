import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { RiAdminFill } from "react-icons/ri";
import { FaChessKing, FaDownload } from "react-icons/fa";
import { MdBlockFlipped } from "react-icons/md";
import Swal from "sweetalert2";

const Allusers = () => {
  const axiosSecure = useAxiosSecure();
  const [showModal, setShowmodal] = useState(null);

  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          title: "Success",
          text: `${user.name} is an admin now`,
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: `Something went wrong`,
          icon: "error",
        });
      }
    });
  };

  const handleBlockUsers = (user) => {
    axiosSecure.patch(`/users/block/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          title: "Success",
          text: `${user.name} is blocked`,
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: `Something went wrong`,
          icon: "error",
        });
      }
    });
  };

  const handleUserModal = (_id) => {
    axiosSecure.get(`/user/info/${_id}`).then((res) => {
      setShowmodal(res.data);
      document.getElementById("my_modal_1").showModal();
      if (isLoading) {
        <h1>loading..</h1>;
      }
    });
  };

  return (
    <div className="bg-slate-50 p-4 rounded-md">
      <h1 className="text-2xl">Total users: {users.length}</h1>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>User Profile</th>
                <th>Status</th>
                <th>Role</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={user.image} alt={`${user.name}'s avatar`} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user.name}</div>
                        <div className="text-sm opacity-50">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`${
                        user.status === "blocked"
                          ? "bg-red-100"
                          : "bg-green-100"
                      } p-2 rounded-full`}>
                      {user.status}
                    </span>
                  </td>
                  <td>
                    {user.role === "admin" ? (
                      <button className="btn bg-yellow-400">
                        <FaChessKing />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAdmin(user)}
                        className="btn bg-yellow-100 hover:bg-yellow-400">
                        <RiAdminFill />
                      </button>
                    )}
                  </td>
                  <th className="flex gap-2">
                    {user.status === "blocked" ? (
                      <button
                        disabled
                        className="btn bg-red-100 hover:bg-red-400">
                        <MdBlockFlipped />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleBlockUsers(user)}
                        className="btn bg-red-100 hover:bg-red-400">
                        <MdBlockFlipped />
                      </button>
                    )}
                    <button className="btn bg-blue-100 hover:bg-blue-400">
                      <FaDownload />
                    </button>
                    <button
                      className="btn bg-[#C3C1F9] hover:bg-[#8985f6]"
                      onClick={() => handleUserModal(user._id)}>
                      See info
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box flex flex-col gap-2">
            <h3 className="font-bold text-lg">User Information</h3>
            <hr />
            <img
              className=" w-40 max-h-40 object-cover rounded-2xl border border-blue-300 p-1"
              src={showModal.image}
              alt=""
            />
            <p className=" font-semibold ">Name: {showModal.name}</p>
            <p>Email: {showModal.email}</p>
            <p>
              Status:{" "}
              <span className=" text-green-400">{showModal.status}</span>
            </p>
            <p>District: {showModal.district}</p>
            <p>Upazila: {showModal.upazila}</p>
            <div className="modal-action">
              <button
                className="btn"
                onClick={() => document.getElementById("my_modal_1").close()}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Allusers;
