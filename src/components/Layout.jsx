import SideBar from "./SideBar";
import { Outlet } from "react-router";

function Layout() {
  return (
    <div
      className="d-flex"
      style={{ minHeight: "100vh", alignItems: "stretch", flexGrow: 1 }}
    >
      <div className="me-5" style={{ width: "280px" }}>
        <SideBar />
      </div>
      {/* <div className="flex-grow-1 p-3"> */}
      <Outlet />
      {/* </div> */}
    </div>
  );
}

export default Layout;
