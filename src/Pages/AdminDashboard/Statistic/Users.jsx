/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { axiosSecure } from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Users = () => {
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  if (isLoading) {
    return <h1>User Loading please wait..</h1>;
  }

  console.log(users);

  return (
    <div className=" flex gap-3 ml-12 mr-4 mt-3">
      <div className=" bg-[#c3c1f989] w-fit flex gap-3 justify-center items-center rounded-md">
        <h1 className=" text-3xl uppercase font-extrabold pl-5">
          Total
          <br /> Users
        </h1>
        <h1 className=" text-[7rem] uppercaser font-extrabold pr-2 ">
          {users.length}
        </h1>
      </div>
      <div className=" bg-[#c3c1f989] w-full gap-3 rounded-md p-4">
        <h1 className=" text-lg font-semibold text-center">Users analysis</h1>
        <hr className=" border-1 border-gray-200 my-2" />
        <div className=" flex justify-evenly gap-5 my-3">
          <div>
            <img
              className=" w-20 mx-auto mb-3"
              src="https://i.ibb.co.com/31V5TNp/001-software-engineer.png"
              alt=""
            />
            <h1 className=" text-xl font-bold">
              Total Admins: <span className=" text-orange-600">3</span>
            </h1>
          </div>
          <div>
            <img
              className=" w-20 mx-auto mb-3"
              src="https://i.ibb.co.com/WKSjHXF/003-active-user.png"
              alt=""
            />
            <h1 className=" text-xl font-bold">
              Active Users: <span className=" text-green-600">10</span>
            </h1>
          </div>
          <div>
            <img
              className=" w-20 mx-auto mb-3"
              src="https://i.ibb.co.com/MVQpPRZ/002-block-user.png"
              alt=""
            />
            <h1 className=" text-xl font-bold">
              Blocked Users: <span className=" text-orange-600">1</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
