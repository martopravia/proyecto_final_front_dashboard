import React from "react";
import { Link } from "react-router";

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
        <span className="fs-4">Sidebar</span>
      </a>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to={"orders"}> Orders</Link>
        </li>
        <li>
          <a href="#" className="nav-link text-white">
            <svg
              className="bi pe-none me-2"
              width="16"
              height="16"
              aria-hidden="true"
            ></svg>
            Dashboard
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white">
            <svg
              className="bi pe-none me-2"
              width="16"
              height="16"
              aria-hidden="true"
            ></svg>
            Orders
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white">
            <svg
              className="bi pe-none me-2"
              width="16"
              height="16"
              aria-hidden="true"
            ></svg>
            Products
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white">
            <svg
              className="bi pe-none me-2"
              width="16"
              height="16"
              aria-hidden="true"
            ></svg>
            Customers
          </a>
        </li>
      </ul>
      <div className="dropdown">
        <a
          href="#"
          className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://github.com/mdo.png"
            alt=""
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <strong>mdo</strong>
        </a>
        <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
          <li>
            <a className="dropdown-item" href="#">
              New project...
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Settings
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Profile
            </a>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
