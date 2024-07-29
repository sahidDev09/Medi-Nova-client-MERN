/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const Banner = ({ banner }) => {
  return (
    <div className="grid md:grid-cols-2 gap-5 justify-between items-center px-5 h-full relative">
      <div>
        <h1 className=" md:text-6xl text-2xl text-[#473288] font-extrabold mb-2">
          {banner.title}
        </h1>
        <p className=" md:text-lg text-gray-500">{banner.text_slogan}</p>
        <div className=" inline-block bg-orange-500 gap-2 rounded-md">
          <h1 className="flex gap-2 items-center md:p-2 md:text-2xl uppercase font-extrabold text-white">
            Apply
            <span className=" bg-green-600 p-2 rounded-md">
              {banner.coupon_code}
            </span>
          </h1>
        </div>
        <h1 className=" md:text-3xl font-bold flex text-[#473288] items-center">
          For
          <span className=" text-orange-500 md:text-6xl text-3xl font-extrabold p-3 rounded-2xl">
            {banner.discount_rate_for_coupon}%
          </span>
          Flat Discounts
        </h1>
        <Link to="/alltests">
          <button className=" btn bg-[#473288] text-white">
            See all Tests
          </button>
        </Link>
      </div>
      <div className="right-5 absolute bottom-0 h-full">
        <img className="h-full w-full object-fill" src={banner.image} alt="" />
      </div>
    </div>
  );
};

export default Banner;
