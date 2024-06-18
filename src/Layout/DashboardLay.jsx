import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Dashboard/Sidebar";

const DashboardLay = () => {
  return (
    <div className="relative min-h-screen md:flex">
      {/* Sidebar */}
      <div className="fixed md:w-72 w-full">
        <Sidebar />
      </div>
      {/* Outlet */}
      <div className="flex-1 md:ml-72">
        <div className="p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLay;
