import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { logout } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

function SideBar() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const [resetActive, setResetActive] = useState(false);

  const handleLogout = () => {
    setTimeout(() => {
      toast.info("You've been logged out");
      dispatch(logout());
    }, 1000);
  };

  const handleResetDB = async (resetToastId) => {
    try {
      const resetKey = import.meta.env.VITE_RESET_DB_KEY;

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/reset-db`,
        {},
        {
          headers: {
            "x-reset-key": resetKey,
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        toast.dismiss(resetToastId);
        toast.success(res.data.message || "Database reset successfully!");
        toast.info("Refreshing page...");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error("Error resetting the database");
      }
    } catch (error) {
      console.error("Error details:", error.response?.data);
      const message =
        error.response?.data?.message ||
        "An error occurred while resetting the database";
      toast.error(message);
    }
  };

  const handleDeleteDatabase = () => {
    toast.info(
      ({ closeToast }) => (
        <div>
          <p>
            ⚠ This will delete all tables and restore demo data. Are you sure?
          </p>
          <div className="d-flex justify-content-end gap-2 mt-2">
            <button
              className="btn btn-danger btn-sm"
              onClick={() => {
                closeToast();
                const resetToastId = toast.info("Reseting database...", {
                  position: "top-right",
                  autoClose: false,
                  closeOnClick: false,
                  closeButton: false,
                  draggable: false,
                  pauseOnHover: true,
                  style: {
                    backgroundColor: "black",
                    color: "white",
                    borderRadius: "8px",
                    padding: "16px",
                  },
                  toastId: "reseting-db",
                });
                handleResetDB(resetToastId);
              }}
            >
              Confirm
            </button>
            <button className="btn btn-secondary btn-sm" onClick={closeToast}>
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        position: "top-right",
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        draggable: false,
        pauseOnHover: true,
        style: {
          backgroundColor: "black",
          color: "white",
          borderRadius: "8px",
          padding: "16px",
        },
      }
    );
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
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setResetActive(true);
              handleDeleteDatabase();
            }}
            className={`nav-link ${resetActive ? "active" : ""}`}
            style={{ color: "white", textDecoration: "none" }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setResetActive(true);
                handleDeleteDatabase();
              }
            }}
          >
            ⚙️ Reset Database
          </a>
        </li>
      </ul>
      <hr />
      <button className="btn btn-outline-light mt-3" onClick={handleLogout}>
        Log out
      </button>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default SideBar;
