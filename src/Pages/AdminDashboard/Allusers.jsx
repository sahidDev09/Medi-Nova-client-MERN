import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { RiAdminFill } from "react-icons/ri";
import { FaChessKing, FaDownload } from "react-icons/fa";
import { MdBlockFlipped } from "react-icons/md";
import Swal from "sweetalert2";

const Allusers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
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
          text: `${user.name} is Blocked`,
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

  return (
    <div>
      <h1 className="text-2xl">Total users: {users.length}</h1>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
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
                          <img
                            src={user.image}
                            alt="Avatar Tailwind CSS Component"
                          />
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
                        user.status === "Blocked"
                          ? "bg-red-100"
                          : "bg-green-100"
                      } p-2 rounded-full`}>
                      {user.status}
                    </span>
                  </td>
                  <td>
                    {user.role === "admin" ? (
                      <button className="btn bg-yellow-100 hover:bg-yellow-400">
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
                    {user.status === "Blocked" ? (
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
                    <button className="btn bg-[#C3C1F9] hover:bg-[#8985f6]">
                      See info
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Allusers;
