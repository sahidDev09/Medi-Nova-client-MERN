import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { RiAdminFill } from "react-icons/ri";
import { FaDownload } from "react-icons/fa";
import { MdBlockFlipped } from "react-icons/md";

const Allusers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  return (
    <div>
      <h1 className=" text-2xl">Total users: {users.length}</h1>
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
                <th className=" text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index = 1) => (
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
                    <span className=" bg-green-100 p-2 rounded-full">
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn bg-yellow-100 hover:bg-red-400">
                      <RiAdminFill />
                    </button>
                  </td>
                  <th className=" flex gap-2">
                    <button className="btn bg-red-100 hover:bg-red-400">
                      <MdBlockFlipped />
                    </button>
                    <button className="btn bg-blue-100">
                      <FaDownload />
                    </button>
                    <button className="btn bg-[#C3C1F9]">See info</button>
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
