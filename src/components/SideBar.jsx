import React from "react";
import { NavLink } from "react-router";
import { toast } from "react-toastify";
import { logout } from "../redux/userSlice";
import { useDispatch } from "react-redux";

function SideBar() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    setTimeout(() => {
      toast.info("You´ve been logged out");
      dispatch(logout());
    }, 1000);
  };

  return (
    <div
      id="sidebar"
      className="d-flex flex-column flex-shrink-0 p-3 text-white"
      style={{
        width: "280px",
      }}
    >
      <span className="fs-4 text-center fw-semibold">STUDIO NÖRA</span>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto text-center">
        <li className="nav-item">
          <NavLink
            to={""}
            style={{ color: "white", textDecoration: "none" }}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            📊 Overview
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
            📦 Orders
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
            🛋️ Products
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
            🎡 Categories
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
            📈 Admin Panel
          </NavLink>
        </li>
      </ul>

      <ul className="nav nav-pills flex-column text-center">
        <li className="nav-item">
          <NavLink
            to={"settings"}
            style={{ color: "white", textDecoration: "none" }}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            ⚙️ Settings - hardcoded
          </NavLink>
        </li>
      </ul>
      <hr />
      <button className="btn btn-outline-light mt-3" onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
}

export default SideBar;
