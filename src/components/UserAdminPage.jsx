import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useApi } from "../hooks/useApi";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../redux/userListSlice";

function UserAdminPage() {
  const { registerUser, fetchUsers, updateUserRoles, deleteUser } = useApi();
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [pendingRoleChanges, setPendingRoleChanges] = useState({});
  const users = useSelector((state) => state.userList.users);

  const [newUser, setNewUser] = useState({
    email: "",
    role: "user",
    firstname: "",
    lastname: "",
    password: "",
    repeatPassword: "",
  });

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleAddUser = async (e) => {
    e.preventDefault();
    const { email, role, firstname, lastname, password, repeatPassword } =
      newUser;

    if (password !== repeatPassword) {
      return toast.error("Passwords do not match.");
    }

    try {
      const createdUser = await registerUser({
        email,
        role,
        firstname,
        lastname,
        password,
      });

      toast.success("User registered successfully.");
      const newId = createdUser?.id || users.length + 1;

      dispatch(
        setUsers([...users, { id: newId, firstname, lastname, email, role }])
      );
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed";
      toast.error(message);
      console.error("Error:", error);
    }

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
    const user = users.find((u) => u.id === id);
    const displayName = user
      ? `${user.firstname} ${user.lastname}`
      : `ID ${id}`;

    toast.info(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to delete {displayName}?</p>
          <div className="d-flex justify-content-end gap-2 mt-2">
            <button
              className="btn btn-danger btn-sm"
              onClick={async () => {
                try {
                  await deleteUser(id);
                  await fetchUsers();
                  closeToast();
                } catch (error) {
                  closeToast();
                  toast.error("Failed to delete user", { theme: "dark" });
                }
              }}
            >
              Accept
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

  const handleRoleSelect = (id, newRole) => {
    setPendingRoleChanges({
      ...pendingRoleChanges,
      [id]: newRole,
    });
  };

  const cancelRoleChange = (id) => {
    setPendingRoleChanges({
      ...pendingRoleChanges,
      [id]: undefined,
    });
  };

  const confirmRoleChange = async (id) => {
    const newRole = pendingRoleChanges[id];
    if (!newRole) return;

    try {
      await updateUserRoles(id, newRole);
      setPendingRoleChanges((prev) => ({
        ...prev,
        [id]: undefined,
      }));

      await fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredAdmins = users.filter(
    (user) =>
      user.role === "admin" &&
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const filteredUsers = users.filter(
    (user) =>
      user.role === "user" &&
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-4" style={{ width: "100%" }}>
      <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
        <h3 className="fw-bold">Admin Panel</h3>
      </div>

      <div className="row d-flex gap-3">
        <div className="col border rounded shadow p-4 bg-white">
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
                {filteredAdmins.map((user) => (
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

        <div className="border rounded shadow p-4 bg-white">
          <div
            className="d-flex align-items-center mb-3"
            style={{ position: "relative" }}
          >
            <h5 className="fw-bold fs-4 mb-0">Registered Users</h5>
            <input
              type="text"
              placeholder="Search by email"
              className="form-control w-25 mx-auto"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
              }}
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

export default UserAdminPage;
