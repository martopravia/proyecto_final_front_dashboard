import React from "react";
import { Link, useSearchParams, useNavigate } from "react-router";

function OrdersPage() {
  const orders = [
    {
      id: "#6657",
      name: "Roberto Díaz",
      status: "Delivered",
      amount: "$540.65",
      items: [
        { name: "Nordic Chair", quantity: 2, price: "$120.00" },
        { name: "Lamp Shade", quantity: 1, price: "$300.65" },
      ],
    },
    {
      id: "#6583",
      name: "María del Monte",
      status: "Processing",
      amount: "$3260.50",
      items: [
        { name: "Cedar Table", quantity: 1, price: "$2600.00" },
        { name: "Wood Chair", quantity: 2, price: "$330.25" },
      ],
    },
    {
      id: "#6489",
      name: "Julián Pérez",
      status: "Shipped",
      amount: "$1080.56",
      items: [
        { name: "Pine Bookshelf", quantity: 1, price: "$780.56" },
        { name: "Wooden Lamp", quantity: 2, price: "$150.00" },
      ],
    },
    {
      id: "#6655",
      name: "Natalia Rodriguez",
      status: "Delivered",
      amount: "$5536.20",
      items: [
        { name: "Couch Set", quantity: 1, price: "$4000.00" },
        { name: "Coffee Table", quantity: 1, price: "$1536.20" },
      ],
    },
    {
      id: "#6671",
      name: "Mirtha Legrand",
      status: "Processing",
      amount: "$17800.00",
      items: [
        { name: "Luxury Sofa", quantity: 1, price: "$10000.00" },
        { name: "Dining Table", quantity: 1, price: "$5800.00" },
        { name: "Designer Chair", quantity: 2, price: "$1000.00" },
      ],
    },
  ];
  const getStatusStyle = (status) => {
    const base = "px-3 py-1 rounded-full text-sm font-medium";
    switch (status) {
      case "Delivered":
        return `${base} bg-success bg-opacity-25 text-success`;
      case "Processing":
        return `${base} bg-warning bg-opacity-25 text-warning`;
      case "Shipped":
        return `${base} bg-primary bg-opacity-25 text-primary`;
      default:
        return `${base} bg-secondary bg-opacity-25 text-secondary`;
    }
  };
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order");
  const navigate = useNavigate();
  const selectedOrder = orders.find(
    (order) => order.id.replace("#", "") === orderId
  );

  return (
    <div className="container-fluid">
      <div className="row mt-4 alturaOverview">
        <div className="col border rounded shadow me-3 p-4 ">
          <h3>Orders</h3>
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
                {orders.map((order, index) => (
                  <tr
                    key={index}
                    className={order.id.replace("#", "") === orderId}
                  >
                    <td>
                      <button
                        onClick={() =>
                          navigate(
                            `/admin/orders?order=${order.id.replace("#", "")}`
                          )
                        }
                        className="btn btn-link p-0 text-decoration-none fw-semibold text-primary"
                        style={{
                          userSelect: "none",
                          outline: "none",
                          boxShadow: "none",
                        }}
                      >
                        {order.id}
                      </button>
                    </td>
                    <td className="d-flex align-items-center mb-2">
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
                      {order.name}
                    </td>
                    <td>
                      <span className={getStatusStyle(order.status)}>
                        {order.status}
                      </span>
                    </td>
                    <td>{order.amount}</td>
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
                <strong>Order ID:</strong> {selectedOrder.id}
              </div>
              <div className="mb-2">
                <strong>Customer:</strong> {selectedOrder.name}
              </div>
              <div className="mb-2">
                <strong>Status:</strong>{" "}
                <span className={getStatusStyle(selectedOrder.status)}>
                  {selectedOrder.status}
                </span>
              </div>
              <div className="mb-3">
                <strong>Total Amount:</strong> {selectedOrder.amount}
              </div>
              <hr />
              <h5 className="fw-bold mb-3">Items</h5>
              <table className="table table-sm">
                <thead className="table-light">
                  <tr>
                    <th>Product</th>
                    <th className="text-center">Qty</th>
                    <th className="text-end">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.name}</td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="text-end">{item.price}</td>
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
