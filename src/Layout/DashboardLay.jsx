import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Dashboard/Sidebar";

const DashboardLay = () => {
  return (
    <div className=" relative min-h-screen md:flex gap-5">
      {/*sidebar*/}

      <Sidebar />

      {/* outlet */}
      <div className=" flex-1">
        <div className=" p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLay;
