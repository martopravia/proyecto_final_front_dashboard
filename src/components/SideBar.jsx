import { NavLink } from "react-router";
import { toast } from "react-toastify";
import { logout } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import ResetDatabaseButton from "./ResetDatabaseButton";

function SideBar() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    setTimeout(() => {
      toast.info("You've been logged out");
      dispatch(logout());
    }, 1000);
  };

  return (
    <div
      id="sidebar"
      className="d-flex flex-column flex-shrink-0 p-3 text-white"
    >
      <span className="fs-4 text-center fw-semibold">STUDIO NÖRA</span>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto text-center">
        <li className="nav-item">
          <NavLink
            to={"/admin"}
            end
            style={{ color: "white", textDecoration: "none" }}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <i className="bi bi-kanban"></i> Overview
          </NavLink>
        </li>
        <hr />
        <li className="nav-item">
          <NavLink
            to={"orders"}
            style={{ color: "white", textDecoration: "none" }}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <i className="bi bi-box-seam-fill"></i> Orders
          </NavLink>
        </li>
        <hr />
        <li>
          <NavLink
            to={"products"}
            style={{ color: "white", textDecoration: "none" }}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <i className="bi bi-lamp-fill"></i> Products
          </NavLink>
        </li>
        <hr />
        <li>
          <NavLink
            to={"categories"}
            style={{ color: "white", textDecoration: "none" }}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <i className="bi bi-flower3"></i> Categories
          </NavLink>
        </li>
        <hr />
        <li>
          <NavLink
            to={"adminPanel"}
            style={{ color: "white", textDecoration: "none" }}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <i className="bi bi-clipboard2-check"></i> Admin Panel
          </NavLink>
        </li>
      </ul>
      <ResetDatabaseButton className="btn btn-danger">
        <i className="bi bi-gear-fill"></i> Reset Database
      </ResetDatabaseButton>
      <hr />
      <button className="btn btn-outline-light mt-3" onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
}

export default SideBar;
