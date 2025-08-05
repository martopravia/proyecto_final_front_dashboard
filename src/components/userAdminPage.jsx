import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserAdminPanel() {
  const [users, setUsers] = useState([
    {
      id: 1,
      email: "admin@example.com",
      role: "admin",
      firstname: "Roberto",
      lastname: "Admin",
    },
    {
      id: 2,
      email: "user@example.com",
      role: "user",
      firstname: "Carlos",
      lastname: "User",
    },
    {
      id: 3,
      email: "moderator@site.com",
      role: "admin",
      firstname: "Ana",
      lastname: "Mod",
    },
    {
      id: 4,
      email: "guest@domain.com",
      role: "user",
      firstname: "Lucía",
      lastname: "Guest",
    },
  ]);

  const [newUser, setNewUser] = useState({
    email: "",
    role: "user",
    firstname: "",
    lastname: "",
    password: "",
    repeatPassword: "",
  });

  const [search, setSearch] = useState("");
  const [pendingRoleChanges, setPendingRoleChanges] = useState({});

  const handleAddUser = () => {
    if (
      !newUser.email ||
      !newUser.firstname ||
      !newUser.lastname ||
      !newUser.password ||
      !newUser.repeatPassword
    )
      return toast.error("All fields are required.");

    if (newUser.password !== newUser.repeatPassword)
      return toast.error("Passwords do not match.");

    const newId = users.length ? users[users.length - 1].id + 1 : 1;

    const userToAdd = {
      id: newId,
      email: newUser.email,
      role: newUser.role,
      firstname: newUser.firstname,
      lastname: newUser.lastname,
    };

    setUsers([...users, userToAdd]);
    toast.success(newUser.role === "admin" ? "Admin created" : "User created");

    setNewUser({
      email: "",
      role: "user",
      firstname: "",
      lastname: "",
      password: "",
      repeatPassword: "",
    });
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
    toast.error("User deleted");
  };

  const handleRoleSelect = (id, newRole) => {
    setPendingRoleChanges({
      ...pendingRoleChanges,
      [id]: newRole,
    });
  };

  const confirmRoleChange = (id) => {
    const currentUser = users.find((u) => u.id === id);
    const newRole = pendingRoleChanges[id];

    setUsers(
      users.map((user) => (user.id === id ? { ...user, role: newRole } : user))
    );

    if (currentUser.role === "admin" && newRole === "user") {
      toast.info("Admin changed to user");
    } else if (currentUser.role === "user" && newRole === "admin") {
      toast.info("User changed to admin");
    }

    setPendingRoleChanges({
      ...pendingRoleChanges,
      [id]: undefined,
    });
  };

  const cancelRoleChange = (id) => {
    setPendingRoleChanges({
      ...pendingRoleChanges,
      [id]: undefined,
    });
  };

  const filteredUsers = users.filter(
    (user) =>
      user.role === "user" &&
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container-fluid">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
        <h3 className="fw-bold">Admin Panel</h3>
      </div>

      <div className="row alturaOverview">
        <div className="col border rounded shadow p-4 bg-white me-3">
          <h5 className="fw-bold mb-4 fs-4">Add User</h5>

          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              value={newUser.firstname}
              onChange={(e) =>
                setNewUser({ ...newUser, firstname: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              value={newUser.lastname}
              onChange={(e) =>
                setNewUser({ ...newUser, lastname: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              placeholder="example@mail.com"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Repeat Password</label>
            <input
              type="password"
              className="form-control"
              value={newUser.repeatPassword}
              onChange={(e) =>
                setNewUser({ ...newUser, repeatPassword: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Role</label>
            <select
              className="form-select"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button className="btn btn-primary" onClick={handleAddUser}>
            Add
          </button>
        </div>

        <div className="col border rounded shadow p-4 bg-white">
          <h5 className="fw-bold mb-4 fs-4">Registered Admins</h5>
          <div className="table-responsive">
            <table className="table table-borderless align-middle fs-6">
              <thead>
                <tr className="text-muted">
                  <th>#ID</th>
                  <th>First</th>
                  <th>Last</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users
                  .filter((u) => u.role === "admin")
                  .map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.firstname}</td>
                      <td>{user.lastname}</td>
                      <td>{user.email}</td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <select
                            className="form-select"
                            value={pendingRoleChanges[user.id] || user.role}
                            onChange={(e) =>
                              handleRoleSelect(user.id, e.target.value)
                            }
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>
                          {pendingRoleChanges[user.id] &&
                            pendingRoleChanges[user.id] !== user.role && (
                              <>
                                <button
                                  className="btn btn-sm btn-success"
                                  onClick={() => confirmRoleChange(user.id)}
                                >
                                  ✓
                                </button>
                                <button
                                  className="btn btn-sm btn-secondary"
                                  onClick={() => cancelRoleChange(user.id)}
                                >
                                  ✕
                                </button>
                              </>
                            )}
                        </div>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 border rounded shadow p-4 bg-white">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold fs-4">Registered Users</h5>
            <input
              type="text"
              placeholder="Search by email"
              className="form-control w-25"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="table-responsive">
            <table className="table table-borderless align-middle fs-6">
              <thead>
                <tr className="text-muted">
                  <th>#ID</th>
                  <th>First</th>
                  <th>Last</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>{user.email}</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <select
                          className="form-select"
                          value={pendingRoleChanges[user.id] || user.role}
                          onChange={(e) =>
                            handleRoleSelect(user.id, e.target.value)
                          }
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                        {pendingRoleChanges[user.id] &&
                          pendingRoleChanges[user.id] !== user.role && (
                            <>
                              <button
                                className="btn btn-sm btn-success"
                                onClick={() => confirmRoleChange(user.id)}
                              >
                                ✓
                              </button>
                              <button
                                className="btn btn-sm btn-secondary"
                                onClick={() => cancelRoleChange(user.id)}
                              >
                                ✕
                              </button>
                            </>
                          )}
                      </div>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center text-muted">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserAdminPanel;
