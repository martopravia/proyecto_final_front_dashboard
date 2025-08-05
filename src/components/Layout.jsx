import SideBar from "./SideBar";
import { Outlet } from "react-router";

function Layout() {
  return (
    <div
      className="d-flex"
      style={{ minHeight: "100vh", alignItems: "stretch", flexGrow: 1 }}
    >
      <SideBar />
      {/* <div className="flex-grow-1 p-3"> */}
      <Outlet />
      {/* </div> */}
    </div>
  );
}

export default Layout;
