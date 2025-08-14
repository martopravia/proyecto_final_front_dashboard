import SideBar from "./SideBar";
import { Outlet } from "react-router";

function Layout() {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <div style={{ minWidth: "210px" }}>
        <SideBar />
      </div>
      {/* <div className="flex-grow-1 p-3"> */}
      <Outlet />
      {/* </div> */}
    </div>
  );
}

export default Layout;
