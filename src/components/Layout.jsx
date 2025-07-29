import SideBar from "./SideBar";
import { Outlet } from "react-router";

function Layout() {
  return (
    <div className="d-flex">
      <SideBar />
      <Outlet />
    </div>
  );
}

export default Layout;
