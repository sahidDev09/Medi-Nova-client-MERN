import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useStatus = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { data: statusData, isLoading: statusPending } = useQuery({
    queryKey: [user?.email, "status"],
    queryFn: async () => {
      if (!user?.email) return { active: false };
      const res = await axiosPublic.get(`/users/status/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const isBlocked = statusData ? !statusData.active : true;

  return [isBlocked, statusPending];
};

export default useStatus;
