/* eslint-disable react/prop-types */
import { BsCalendarDate } from "react-icons/bs";
import { IoPricetagsOutline } from "react-icons/io5";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { PiClockCountdownBold } from "react-icons/pi";
import { Link } from "react-router-dom";

const TestsCard = ({ test }) => {
  return (
    <div className="w-full overflow-hidden bg-blue-50 rounded-lg shadow-lg dark:bg-gray-800">
      <div className=" flex flex-col justify-between">
        <img
          className="object-cover object-center w-full h-56"
          src={test.image || "https://via.placeholder.com/334x224"}
          alt="avatar"
        />

        <div className="flex items-center px-6 py-3 bg-[#473288]">
          <MdDriveFileRenameOutline className=" text-white text-2xl" />
          <h1 className="mx-3 text-lg font-semibold text-white">
            {test.test_name}
          </h1>
        </div>

        <div className="px-6 py-4">
          <p className="py-2 text-gray-700 dark:text-gray-400">
            {test.test_details.slice(0, 45)}...
          </p>

          <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
            <BsCalendarDate className=" text-xl" />

            <h1 className="px-2 text-sm">{test.test_date}</h1>
          </div>

          <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
            <PiClockCountdownBold className=" text-xl" />

            <h1 className="px-2 text-sm">{test.test_slots}</h1>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 text-gray-700 dark:text-gray-200 px-6 py-4">
          <button className="flex gap-2 items-center bg-[#8570c385] text-[#473288] font-bold p-2 px-4 rounded-full">
            <IoPricetagsOutline />${test.test_price}
          </button>
          <Link to={`/alltests/${test._id}`}>
            <button className="flex gap-2 items-center bg-[#473288] text-white p-2 px-4 rounded-full">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TestsCard;
