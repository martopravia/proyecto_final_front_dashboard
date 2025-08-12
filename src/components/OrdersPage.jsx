import React, { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setOrders } from "../redux/orderSlice";
import { toast } from "react-toastify";

function OrdersPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);
  const orders = useSelector((state) => state.order.orders);
  const dispatch = useDispatch();

  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        dispatch(setOrders(response.data));
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (token) {
      fetchOrders();
    } else {
      console.warn("No token available, user not authenticated.");
    }
  }, [token]);

  const orderId = searchParams.get("order");
  const selectedOrder = orders.find((order) => order.id.toString() === orderId);

  useEffect(() => {
    if (selectedOrder) {
      setNewStatus(selectedOrder.status);
    }
  }, [selectedOrder]);

  const getStatusStyle = (status) => {
    const base = "px-3 py-1 rounded-full text-sm font-medium";
    switch (status) {
      case "completed":
        return `${base} bg-success bg-opacity-25 text-success`;
      case "pending":
        return `${base} bg-warning bg-opacity-25 text-warning`;
      case "cancelled":
        return `${base} bg-danger bg-opacity-25 text-danger`;
      default:
        return `${base} bg-secondary bg-opacity-25 text-secondary`;
    }
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/orders/${orderId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedOrders = orders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      );

      dispatch(setOrders(updatedOrders));

      toast.success("Order status updated successfully");
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    }
  };

  return (
    <div className="mx-4" style={{ width: "100%" }}>
      <div className="row mt-4 d-flex gap-3">
        <div className="col-12 d-flex justify-content-between align-items-center p-0">
          <h3 className="fw-bold">Orders</h3>
        </div>
        <div className="col border rounded shadow p-4">
          <div className="table-responsive">
            <table className="table table-borderless align-middle fs-6">
              <thead>
                <tr className="text-muted">
                  <th>Order ID</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {[...orders]
                  .sort((a, b) => b.id - a.id)

                  .map((order, index) => (
                    <tr
                      key={order.id}
                      style={{ cursor: "pointer" }}
                      className={
                        selectedOrderId === order.id ? "table-active" : ""
                      }
                      onClick={() => {
                        setSelectedOrderId(order.id);
                        navigate(`/admin/orders?order=${order.id}`);
                      }}
                    >
                      <td>#{order.id}</td>
                      <td className="d-flex align-items-center ">
                        <img
                          src={`https://picsum.photos/seed/customer${index}/40/40`}
                          alt="avatar"
                          className="rounded-circle me-2"
                          style={{
                            width: "30px",
                            height: "30px",
                            objectFit: "cover",
                          }}
                        />
                        {order.user?.firstname || "No firstname registered"}{" "}
                        {order.user?.lastname || "No lastname registered"}
                      </td>
                      <td>
                        <span className={getStatusStyle(order.status)}>
                          {order.status}
                        </span>
                      </td>
                      <td>
                        U$S {Number(order.totalAmount).toLocaleString("de-DE")}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-md-5 border rounded shadow p-4 bg-white">
          {selectedOrder ? (
            <>
              <h4 className="fw-bold mb-3">Order Summary</h4>
              <div className="mb-2">
                <strong>Order ID:</strong> #{selectedOrder.id}
              </div>
              <div className="mb-2">
                <strong>Customer:</strong> {selectedOrder.user?.firstname}{" "}
                {selectedOrder.user?.lastname} ({selectedOrder.user?.email})
              </div>
              {/* 
              <div className="mb-2">
                <strong>Status:</strong>{" "}
                <span className={getStatusStyle(selectedOrder.status)}>
                  {selectedOrder.status}
                </span>
              </div> */}
              <div className="mb-3">
                <strong>Change Status:</strong>
                <select
                  className="form-select"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <button
                  className="btn btn-primary mt-2"
                  onClick={() =>
                    handleStatusChange(selectedOrder.id, newStatus)
                  }
                >
                  Save Status
                </button>
              </div>

              <div className="mb-3">
                <strong>Total Amount:</strong> U$S{" "}
                {Number(selectedOrder.totalAmount).toLocaleString("de-DE", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
              <hr />
              <h5 className="fw-bold mb-3">Items</h5>
              <table className="table table-sm">
                <thead className="table-light">
                  <tr>
                    <th>Product</th>
                    <th className="text-center">Quantity</th>
                    <th className="text-end">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.orderDetails.map((item, idx) => (
                    <tr key={idx}>
                      <td>
                        {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                      </td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="text-end">
                        U$S {Number(item.unitPrice).toLocaleString("de-DE")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <p className="text-muted">Select an order to view details.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;
