import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/userSlice";
import { useMemo } from "react";
import { toast } from "react-toastify";
import { setUsers } from "../redux/userListSlice";
import {
  addProduct,
  deleteProduct,
  editProduct,
  productsRequested,
  productsRequestFailed,
} from "../redux/productSlice";
import {
  addCategory,
  categoriesReceived,
  categoriesRequested,
  categoriesRequestFailed,
  deleteCategory,
  updateCategory,
} from "../redux/categorySlice";

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
    dispatch(productsRequested());
    try {
      const response = await api.get("/products", { params });
      return response.data;
    } catch (error) {
      dispatch(productsRequestFailed(error.message));
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
      toast.error("Error updating user roles");
      console.error("Error updating user roles:", error);
      throw error;
    }
  };

  const patchProduct = async (product) => {
    try {
      const formData = new FormData();
      for (const key in product) {
        formData.append(key, product[key]);
      }

      const response = await api.patch(`/products/${product.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(editProduct(response.data));
      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const postProduct = async (product) => {
    try {
      const formData = new FormData();
      for (const key in product) {
        formData.append(key, product[key]);
      }

      const response = await api.post(`/products`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(addProduct(response.data));
      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const destroyProduct = async (id) => {
    try {
      dispatch(deleteProduct(id));
      const response = await api.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getCategories = async (params) => {
    dispatch(categoriesRequested());
    try {
      const response = await api.get("/categories", { params });
      dispatch(categoriesReceived(response.data));
      return response.data;
    } catch (error) {
      dispatch(categoriesRequestFailed(error.message));
      console.error("Error:", error);
    }
  };

  const postCategory = async (category) => {
    try {
      const response = await api.post(`/categories`, category, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(addCategory(response.data));
      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const patchCategory = async (category) => {
    try {
      const response = await api.patch(`/categories/${category.id}`, category, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(updateCategory(response.data));
      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const destroyCategory = async (id) => {
    try {
      const response = await api.delete(`/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(deleteCategory(id));
      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const resetDatabase = async () => {
    try {
      const response = await api.post(
        "/admin/reset-db",
        {},
        {
          headers: {
            "x-reset-key": import.meta.env.VITE_RESET_DB_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  return {
    loginUser,
    // registerUser,
    getProducts,
    postProduct,
    patchProduct,
    destroyProduct,
    registerUser,
    fetchUsers,
    deleteUser,
    updateUserRoles,
    getCategories,
    postCategory,
    patchCategory,
    destroyCategory,
    resetDatabase,
  };
};
