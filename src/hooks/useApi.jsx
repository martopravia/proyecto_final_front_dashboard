import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/userSlice";
import { useMemo } from "react";
// import { setProducts } from "../redux/productsSlice";
import { toast } from "react-toastify";
import { setUsers } from "../redux/userListSlice";

export const useApi = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  const api = useMemo(
    () =>
      axios.create({
        baseURL: import.meta.env.VITE_API_URL,
      }),
    []
  );

  const loginUser = async (data) => {
    try {
      const {
        data: { user, token },
      } = await api.post("/tokens/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(login({ user, token }));
      // console.log("User logged in:", user, "to token:", token);

      return { token, user };
    } catch (error) {
      console.error("Error:", error);
      toast.error("Login failed. Please check your credentials.");
    }
  };
  const registerUser = async (data) => {
    try {
      await api.post("/users", data, {});
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };
  const getProducts = async (params) => {
    try {
      const response = await api.get("/products", { params });
      dispatch(setProducts(response.data));
      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setUsers(response.data));
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };
  const deleteUser = async (userId) => {
    try {
      await api.delete(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("User deleted successfully");
      // Optionally, you can refetch users after deletion
      await fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  };
  const updateUserRoles = async (userId, newRole) => {
    try {
      await api.patch(
        `/users/${userId}`,
        { role: newRole },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("User role updated successfully");
      await fetchUsers();
    } catch (error) {
      console.error("Error updating user roles:", error);
      throw error;
    }
  };

  return {
    loginUser,
    registerUser,
    fetchUsers,
    deleteUser,
    updateUserRoles,
  };
};
