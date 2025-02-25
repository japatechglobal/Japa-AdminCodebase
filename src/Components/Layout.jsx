import { Outlet, Navigate, useNavigate } from "react-router-dom";
import TopNav from "./Admin/TopNav";
import SideBar from "./Admin/SideBar";

let tokks = sessionStorage.getItem("tokken")?.toString("");
const Layout = () => {
  const auth = { tokken: tokks };
  const moveTo = useNavigate();
  return auth.tokken ? (
    <div className="">
      {/* Sidebar */}
      <div className="col-start-1 overflow-auto sm:overflow-y-hidden absolute">
        <SideBar className="fixed" />
      </div>
      {/* Top */}
      <div className=" lg:ml-[240px] overflow-auto  h-[100vh]  sm:col-start-1 lg:col-span-2 bg-gray-100 ">
        <TopNav className="" />
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
};
export default Layout;
