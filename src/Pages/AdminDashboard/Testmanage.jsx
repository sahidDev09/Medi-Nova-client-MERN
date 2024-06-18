import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../Hooks/useAxiosSecure";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Testmanage = () => {
  const {
    data: tests = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["tests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tests");
      return res.data;
    },
  });

  return (
    <div>
      <h1 className=" text-4xl font-bold text-center mt-5">Manage-Tests</h1>
      <hr className=" my-5" />
      <h1 className=" text-xl font-semibold mt-3">
        Total Tests : {tests.length}
      </h1>

      <div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Test</th>
                <th>Details</th>
                <th>Actionable Dashboard</th>
                <th></th>
              </tr>
            </thead>
            {tests.map((test, index) => (
              <tbody key={index}>
                <tr>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask rounded-xl w-20 h-20">
                          <img
                            src={test.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-lg">
                          {test.test_name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span>{test.test_details}</span>
                  </td>
                  <th className="flex gap-2">
                    <button className="btn bg-blue-100 hover:bg-blue-400">
                      <FaEdit />
                    </button>
                    <button className="btn bg-red-100 hover:bg-red-400">
                      <MdDelete />
                    </button>
                    <button className="btn bg-[#C3C1F9] hover:bg-[#8985f6]">
                      See Reservation
                    </button>
                  </th>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Testmanage;
