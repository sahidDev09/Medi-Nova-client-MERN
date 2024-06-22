/* eslint-disable react/prop-types */
const Recommendation = ({ recommendations }) => {
  return (
    <div className="w-full max-w-md px-8 py-4 mt-16 bg-slate-100 rounded-lg shadow-lg dark:bg-gray-800 m-4">
      <div className="flex justify-center -mt-16 md:justify-end">
        <img
          className="object-cover w-20 h-20 border-2 border-blue-500 rounded-full dark:border-blue-400"
          src={recommendations.image_url}
          alt=""
        />
      </div>

      <h2 className="mt-2 bg-[#B8B1E1] w-fit p-2 rounded-full  text-gray-800 dark:text-white md:mt-0">
        {recommendations.type}
      </h2>

      <h1>{recommendations.title}</h1>

      <p className="mt-2 text-sm text-gray-600 dark:text-gray-200">
        {recommendations.description}
      </p>
      <p>Date: {recommendations.date_issued}</p>

      <div className="flex justify-end mt-4">
        <a
          href="#"
          className="text-lg font-medium text-blue-600 dark:text-blue-300"
          role="link">
          {recommendations.issued_by}
        </a>
      </div>
    </div>
  );
};

export default Recommendation;
