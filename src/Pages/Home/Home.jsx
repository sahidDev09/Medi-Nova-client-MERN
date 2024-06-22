import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Banner from "../../Components/Home/Banner";
import FeaturedCards from "../../Components/Home/FeaturedCards";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Promotions from "../../Components/Home/Promotions";
import Recommendation from "../../Components/Home/Recommendation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: banner = [] } = useQuery({
    queryKey: ["banner"],
    queryFn: async () => {
      const res = await axiosPublic.get("/banner");
      return res.data;
    },
  });

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["bookings"],
    enabled: !!user?.email && !!localStorage.getItem("access-token"),
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/${user.email}`);
      return res.data;
    },
  });

  const { data: recconData = [] } = useQuery({
    queryKey: ["reccomandation"],
    queryFn: async () => {
      const res = await axiosPublic.get("/recommendations");
      return res.data;
    },
  });

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <div className="w-full bg-blue-100 my-5 rounded-md">
        {banner.map((singleBanner, index) => (
          <Banner key={index} banner={singleBanner}></Banner>
        ))}
      </div>
      <h1 className="text-3xl font-semibold text-center uppercase">
        Featured Tests
      </h1>
      {isLoading || bookings.length === 0 ? (
        <div className="flex justify-center text-center my-5">
          <div>
            <img
              className="md:w-[300px]"
              src="https://i.ibb.co/9ypXYdZ/9264822-1.png"
              alt=""
            />
            <h1 className="text-4xl font-bold">Data not found</h1>
            <p className="text-gray-500">
              Please wait some time or try again later
            </p>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-4 my-10">
          {bookings.slice(0, 3).map((booking, index) => (
            <FeaturedCards key={index} booking={booking}></FeaturedCards>
          ))}
        </div>
      )}
      <div className="my-5">
        <h1 className="text-3xl my-3 font-semibold text-center uppercase">
          PROMOTION
        </h1>
        <Promotions />
      </div>
      <div>
        <h1 className="text-3xl my-3 font-semibold text-center uppercase">
          recommendation
        </h1>

        <Slider {...sliderSettings}>
          {recconData.map((recom) => (
            <Recommendation
              key={recom._id}
              recommendations={recom}></Recommendation>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Home;
