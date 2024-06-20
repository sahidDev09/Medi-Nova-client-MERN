import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Banner from "../../Components/Home/Banner";

const Home = () => {
  const axiosPublic = useAxiosPublic();

  const { data: banner = [] } = useQuery({
    queryKey: ["banner"],
    queryFn: async () => {
      const res = await axiosPublic.get("/banner");
      return res.data;
    },
  });

  return (
    <div className=" w-full bg-blue-100 my-5 rounded-md">
      {banner.map((singleBanner, index) => (
        <Banner key={index} banner={singleBanner}></Banner>
      ))}
    </div>
  );
};

export default Home;
