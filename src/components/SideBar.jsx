import React from "react";
import { NavLink } from "react-router";

function SideBar() {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 side-bar text-white vh-100"
      style={{ width: "280px" }}
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
            to={"customers"}
            style={{ color: "white", textDecoration: "none" }}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            👥 Customers - hardcoded
          </NavLink>
        </li>
        <hr />
        <li>
          <NavLink
            to={"analytics"}
            style={{ color: "white", textDecoration: "none" }}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            📈 Analytics - hardcoded
          </NavLink>
        </li>
      </ul>

      <ul className="nav nav-pills flex-column  text-center">
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
      <button className="btn btn-outline-light mt-3">Log out</button>
    </div>
  );
}

export default SideBar;
