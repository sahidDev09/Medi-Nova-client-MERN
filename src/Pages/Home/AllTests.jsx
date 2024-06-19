import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import TestsCard from "./TestsCard";
import { useState } from "react";
import { DNA } from "react-loader-spinner";

const AllTests = () => {
  const axiosPublic = useAxiosPublic();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const cardsPerPage = 6;

  const { data: tests = [], isLoading } = useQuery({
    queryKey: ["alltests"],
    queryFn: async () => {
      const res = await axiosPublic.get("/tests");
      return res.data;
    },
  });

  const currentDate = new Date();
  const futureTests = tests.filter(
    (test) => new Date(test.test_date) > currentDate
  );

  const filteredTests = futureTests.filter((test) =>
    test.test_date.includes(searchQuery)
  );

  const startIndex = (currentPage - 1) * cardsPerPage;
  const currentTests = filteredTests.slice(
    startIndex,
    startIndex + cardsPerPage
  );
  const totalPages = Math.ceil(filteredTests.length / cardsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div>
      <div className=" flex items-center justify-between my-2">
        <h1 className="text-4xl font-semibold text-center my-3 hidden md:table-cell">
          All Tests
        </h1>
        <div className=" flex justify-center mx-auto md:mx-0">
          <input
            type="number"
            placeholder="Search by date"
            className="input input-bordered w-full md:w-auto focus:outline-[#8F85DD]"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <hr />
      {isLoading ? (
        <div className="flex h-screen justify-center items-center">
          <DNA
            visible={true}
            height="200"
            width="200"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </div>
      ) : (
        <div>
          {filteredTests.length === 0 ? (
            <div className=" flex justify-center text-center my-5">
              <div>
                <img
                  className=" md:w-[500px]"
                  src="https://i.ibb.co/mSjJKnC/9264822.png"
                  alt=""
                />
                <h1 className=" text-4xl font-bold">
                  Data not found for this query
                </h1>
                <p className=" text-gray-500">
                  Please try again, clue: search input only support number
                </p>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6 my-5 m-2 md:m-0">
              {currentTests.map((test, index) => (
                <TestsCard key={index} test={test}></TestsCard>
              ))}
            </div>
          )}
        </div>
      )}
      <div className="flex justify-center">
        <div className="flex my-3">
          <button
            onClick={handlePreviousPage}
            className="flex items-center px-4 py-2 mx-1 text-gray-500 bg-slate-100 rounded-md cursor-not-allowed dark:bg-gray-800 dark:text-gray-600"
            disabled={currentPage === 1}>
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageClick(index + 1)}
              className={`items-center hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-slate-100 rounded-md sm:flex dark:bg-gray-800 dark:text-gray-200 ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200"
              }`}>
              {index + 1}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            className="flex items-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-slate-100 rounded-md dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200"
            disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllTests;
