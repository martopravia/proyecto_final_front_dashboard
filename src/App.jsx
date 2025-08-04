import { Route, Routes } from "react-router";
import "./App.css";

import Layout from "./components/Layout";
import Overview from "./components/Overview";
import OrdersPage from "./components/OrdersPage";
import ProductsPage from "./components/ProductsPage";
import CustomersPage from "./components/CustomersPage";
import Analytics from "./components/Analytics";
import Settings from "./components/Settings";
import Login from "./components/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="/admin" element={<Layout />}>
          <Route path="" element={<Overview />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
