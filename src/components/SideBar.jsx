import React from "react";
import { NavLink } from "react-router";

function SideBar() {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark vh-100"
      style={{ width: "280px" }}
    >
      <a
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <svg
          className="bi pe-none me-2"
          width="40"
          height="32"
          aria-hidden="true"
        ></svg>
        <span className="fs-4 ">Sidebar</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto ms-5">
        <li className="nav-item">
          <NavLink
            to={""}
            style={{ color: "white", textDecoration: "none" }}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Overview
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
            Orders
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
            Products
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
            Customers
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
            Analytics
          </NavLink>
        </li>
        <hr />
        <li>
          <NavLink
            to={"settings"}
            style={{ color: "white", textDecoration: "none" }}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Settings
          </NavLink>
        </li>
      </ul>

      <hr />
      <button className="btn btn-outline-light">Log out</button>
    </div>
  );
}

export default SideBar;
