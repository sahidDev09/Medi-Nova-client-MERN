import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { PiSpinnerBallFill } from "react-icons/pi"; // Add this import if you want to show a loading spinner
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import Swal from "sweetalert2";

const AllBanner = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: bannerData = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allbanners");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <PiSpinnerBallFill className="text-4xl animate-spin" />
      </div>
    );
  }

  if (error) {
    return toast.error("Error loading banners:" + error.message);
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/allbanners/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: `${bannerData.title} has been deleted.`,
              icon: "success",
            });
          } else {
            toast.error("Failed to delete data");
          }
        });
      }
    });
  };

  const handleDisplay = (id) => {
    axiosSecure.patch(`/allbanners/display/${id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          title: "Success",
          text: `${bannerData.name} is Displaying now`,
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
      <Link to="/dashboard/add-banner">
        <button className="btn bg-[#473288] text-white">Add new Banner</button>
      </Link>
      <div className="bg-slate-50 p-4 rounded-md">
        <h1 className="text-xl font-semibold mt-3">
          Total Banner : {bannerData.length}
        </h1>

        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            {bannerData.map((banner, index) => (
              <tbody key={index}>
                <tr>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-14 h-14">
                          <img
                            src={banner.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{banner.title}</div>
                        <div className="text-sm opacity-50">
                          {banner.text_slogan}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{banner.status}</td>

                  <th className=" flex items-center gap-2">
                    <button
                      onClick={() => handleDelete(banner._id)}
                      className="btn bg-red-100 text-lg text-red-700 hover:bg-red-400 hover:text-white"
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Delete">
                      <MdDelete />
                    </button>
                    <button
                      onClick={() => handleDisplay(banner._id)}
                      className={`btn ${
                        banner.status === "true"
                          ? "bg-orange-400 text-white"
                          : ""
                      }`}>
                      {banner.status === "true"
                        ? "Displaying Now"
                        : "Make Displayed"}
                    </button>
                  </th>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
      <Tooltip id="my-tooltip" />
    </div>
  );
};

export default AllBanner;
