import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Calendar } from "react-date-range";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import PaymentModal from "./PaymentModal";
import Swal from "sweetalert2";

const TestDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const [showModal, setShowModal] = useState([]);
  const [appointmentTime, setAppointmentTime] = useState("");

  const {
    data: testsDetails = {},
    isLoading,
    refetch,
  } = useQuery({
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
    axiosPublic.get(`/tests/${id}`).then((res) => {
      setShowModal([res.data]);
      if (isLoading) {
        return <h1>Loading...</h1>;
      }
      if (test_slots > 0) {
        document.getElementById("my_modal_1").showModal();
      } else {
        Swal.fire({
          title: "Error!",
          text: "No slots available",
          icon: "error",
        });
        return;
      }
    });
  };

  const handleTime = (e) => {
    setAppointmentTime(e.target.value);
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

            <div className=" flex flex-col gap-2">
              <label className=" text-gray-600" htmlFor="time">
                Appoointment time
              </label>
              <input
                id="time"
                type="time"
                name="time"
                value={appointmentTime}
                onChange={handleTime}
                className="input border border-gray-400 w-full focus:outline-none"
                required
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
          <PaymentModal
            key={index}
            modal={modal}
            testsDetails={testsDetails}
            refetch={refetch}
            appointmentTime={appointmentTime}></PaymentModal>
        ))}
    </div>
  );
};

export default TestDetails;
