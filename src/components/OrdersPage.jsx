import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useOrders } from "../hooks/useOrders";
import OrderStatus from "./OrderStatus";
import Avatar from "./Avatar";
import { useApi } from "../hooks/useApi";

function OrdersPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [selectedOrder, setSelectedOrder] = useState(null);

  const { orders } = useOrders();
  const { patchOrder } = useApi();

  useEffect(() => {
    const orderId = searchParams.get("order");
    if (orderId) {
      setSelectedOrder(orders.find((order) => order.id == orderId));
    }
  }, []);

  const handleUpdateStatus = (status) => {
    setSelectedOrder((prev) => ({ ...prev, status }));
  };

  const handleSaveStatus = async () => {
    await toast.promise(
      patchOrder(selectedOrder),
      {
        pending: "Updating order status...",
        success: "Order status updated successfully",
        error: "Failed to update order status",
      },
      {
        closeOnClick: false,
      }
    );
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
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    style={{ cursor: "pointer" }}
                    className={
                      selectedOrder?.id === order.id ? "table-active" : ""
                    }
                    onClick={() => {
                      setSelectedOrder(order);
                      navigate(`/admin/orders?order=${order.id}`);
                    }}
                  >
                    <td>#{order.id}</td>
                    <td className="d-flex align-items-center ">
                      <Avatar user={order.user} />
                      {order.user?.firstname || "No firstname registered"}{" "}
                      {order.user?.lastname || "No lastname registered"}
                    </td>
                    <td>
                      <OrderStatus status={order.status} />
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
              <div className="mb-3">
                <strong>Change Status:</strong>
                <select
                  className="form-select"
                  value={selectedOrder.status}
                  onChange={(e) => handleUpdateStatus(e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <button
                  className="btn btn-mycolor mt-2"
                  onClick={() => handleSaveStatus()}
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
