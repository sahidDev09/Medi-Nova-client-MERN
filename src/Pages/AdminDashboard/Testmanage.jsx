import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../Hooks/useAxiosSecure";

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
    </div>
  );
};

export default Testmanage;
