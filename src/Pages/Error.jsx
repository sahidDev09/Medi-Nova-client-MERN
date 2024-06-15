import { NavLink } from "react-router-dom";

const Error = () => {
  return (
    <div className=" grid md:grid-cols-2 container mx-auto items-center justify-center h-screen">
      <div className="text-info flex flex-col items-start md:gap-5 gap-2 ml-10 md:ml-0">
        <h1 className=" md:text-8xl text-4xl uppercase font-semibold text-[#473288]">
          Sorry!!!
        </h1>
        <h3 className=" md:text-5xl text-3xl text-[#E4A71D] uppercase">
          Page not found
        </h3>
        <p className=" text-[#A6A5BD] w-[300px]">
          Oops! Looks like you have hit a dead end. The page you are looking for
          is not here.
        </p>
        <NavLink to="/">
          <button className=" btn rounded-full bg-[#C3C1F9]">Back Home</button>
        </NavLink>
      </div>

      <img src="https://i.ibb.co/gzj39pQ/404error-2.png" alt="" />
    </div>
  );
};

export default Error;
