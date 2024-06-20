import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Calendar } from "react-date-range";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import PaymentModal from "./PaymentModal";

const TestDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [showModal, setShowModal] = useState([]);

  const { data: testsDetails = {}, isLoading } = useQuery({
    queryKey: ["testsDetails", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/tests/${id}`);
      return res.data;
    },
  });

  const { test_name, test_details, image, test_date, test_slots, test_price } =
    testsDetails;

  const handleSelect = (date) => {
    return date;
  };

  const handleBooked = async () => {
    // if (test_slots > 0) {
    // const reservationData = {
    // test_name: test_name,
    // test_date: test_date,
    // test_id: testsDetails._id,
    // booking_email: user.email,
    // report_status: "pending",
    // };

    //   console.log(reservationData);

    //   try {
    //     const res = await axiosPublic.patch(
    //       `/tests/update/${testsDetails._id}`,
    //       {
    //         test_slots: test_slots - 1,
    //       }
    //     );
    //     if (res.data.modifiedCount > 0) {
    //       refetch();
    //       Swal.fire({
    //         title: "Booked",
    //         text: "Your appointment is booked for selected date",
    //         icon: "success",
    //       });
    //     }
    //   } catch (error) {
    //     Swal.fire({
    //       title: "Error!",
    //       text: "Failed to book appointment. Please try again later.",
    //       icon: "error",
    //     });
    //   }
    //}else {
    //   Swal.fire({
    //     title: "Error!",
    //     text: "No slots available",
    //     icon: "error",
    //   });
    // }

    axiosPublic.get(`/tests/${id}`).then((res) => {
      setShowModal([res.data]);
      if (isLoading) {
        return <h1>Loading...</h1>;
      }
      document.getElementById("my_modal_1").showModal();
    });
  };

  return (
    <div>
      <div className="container mx-auto mt-14 p-2 md:p-0 min-h-[600px]">
        <Helmet>
          <title>MediNova | Tests details</title>
        </Helmet>
        <h1 className="md:text-4xl font-bold bg-blue-100 p-2 rounded-md">
          {test_name}
        </h1>
        <div className="md:flex gap-5 my-5">
          <div className="md:w-[70%]">
            <img
              className="md:h-[500px] h-[300px] w-full object-cover rounded-md"
              src={image}
              alt={test_name}
            />
            <hr className="my-5" />
            <h1 className="text-xl">
              <span className="font-semibold text-yellow-800">
                Test Details :
              </span>
              {test_details}
            </h1>
          </div>

          <div className="flex flex-col gap-3 w-[30%]">
            <h1 className="text-xl">
              <span className="font-semibold text-green-700">
                Slots Available :
              </span>
              {test_slots}
            </h1>

            <div>
              <button className="p-2 rounded-md w-full bg-[#23b47c] text-white">
                Price: ${test_price}
              </button>
            </div>

            <div className="flex justify-center border w-full rounded-md">
              <Calendar
                date={new Date(test_date)}
                onChange={handleSelect}
                disabled={true}
                color="#473288"
                editableDateInputs={false}
              />
            </div>
            <button
              onClick={handleBooked}
              className="btn bg-[#473288] text-white">
              Book Appointment
            </button>
          </div>
        </div>
      </div>
      {showModal &&
        showModal.length > 0 &&
        showModal.map((modal, index) => (
          <PaymentModal key={index} modal={modal}></PaymentModal>
        ))}
    </div>
  );
};

export default TestDetails;
