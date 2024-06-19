import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

const TestDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();

  const { data: testsDetails = {} } = useQuery({
    queryKey: ["testsDetails", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/tests/${id}`);
      return res.data;
    },
  });

  const { test_name, test_details, image, test_date, test_slots, test_price } =
    testsDetails;

  return (
    <div className=" container mx-auto mt-14 p-2 md:p-0">
      <Helmet>
        <title>MediNova | Tests details</title>
      </Helmet>
      <h1 className="md:text-4xl font-bold bg-blue-100 p-2 rounded-md">
        {test_name}
      </h1>
      <div className=" grid md:grid-cols-2 gap-5">
        <div>
          <img src={image} alt="" />
        </div>
        <div className=" flex flex-col gap-3">
          <h1 className=" text-xl">
            <span className=" font-semibold text-yellow-800">
              Test Details:
            </span>
            {test_details}
          </h1>
          <h1 className=" text-xl">
            <span className=" font-semibold text-green-700">
              Availability :
            </span>
            {test_slots}
          </h1>
          <h1 className=" text-xl">
            <span className=" font-semibold text-orange-700">
              Date : {test_date}
            </span>
          </h1>
          <h1 className=" text-xl">
            <span className=" font-semibold text-orange-700">{test_price}</span>
          </h1>
          <h1 className=" text-xl">
            <span className=" font-semibold text-orange-700">Date :</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default TestDetails;
