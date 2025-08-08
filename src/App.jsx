import { Route, Routes } from "react-router";
import "./App.css";

import Layout from "./components/Layout";
import Overview from "./components/Overview";
import OrdersPage from "./components/OrdersPage";
import ProductsPage from "./components/ProductsPage";

import Settings from "./components/Settings";
import Login from "./components/Login";

import CategoriesPage from "./components/CategoriesPage";
import UserAdminPanel from "./components/userAdminPage";
import PrivateRoute from "./components/privateRoute";
import { ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password/:token" element={<ResetPassword />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="" element={<Overview />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="adminPanel" element={<UserAdminPanel />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </>
  );
}

export default App;
