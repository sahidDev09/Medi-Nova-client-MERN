import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";

const Main = () => {
  return (
    <div>
      <div className=" container mx-auto">
        <Navbar />
        <Outlet></Outlet>
      </div>
      <Footer/>
    </div>
  );
};

export default Main;
