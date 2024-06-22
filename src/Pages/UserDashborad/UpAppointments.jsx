import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { TiCancel } from "react-icons/ti";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const UpAppointments = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: bookings = [], refetch } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/${user.email}`);
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/bookings/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Cancelled!",
              text: `${bookings.test_name} has been cancelled appointment.`,
              icon: "success",
            });
          } else {
            toast.error("Failed to cancel booking");
          }
        });
      }
    });
  };

  return (
    <div>
      <h1 className=" text-4xl font-bold text-center my-3 mb-5">
        Your Upcomming Appointments
      </h1>
      <div className="overflow-x-auto bg-sky-50">
        <table className="table flex ">
          <thead>
            <tr className=" bg-blue-200">
              <th>#</th>
              <th>Name</th>
              <th>Appointment Date</th>
              <th>Appointment Time</th>
              <th>Action</th>
            </tr>
          </thead>
          {bookings.map((booking, index) => (
            <tbody key={booking._id}>
              <tr>
                <th>{index + 1}</th>
                <td className=" font-semibold">{booking.test_name}</td>
                <td>{booking.test_date}</td>
                <td>{booking.time}</td>
                <td>
                  <button
                    onClick={() => handleDelete(booking._id)}
                    className=" btn text-red-500 bg-red-50">
                    <TiCancel />
                    Cancel Appointment
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default UpAppointments;
