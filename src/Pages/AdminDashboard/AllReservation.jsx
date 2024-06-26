import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AllReservation = () => {
  const { test_id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: reservedData = [] } = useQuery({
    queryKey: ["reserved", test_id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reservation/${test_id}`);
      return res.data;
    },
  });

  console.log(reservedData);

  return (
    <div>
      <h1>this is the id : {test_id}</h1>
    </div>
  );
};

export default AllReservation;
