import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setOrders } from "../redux/orderSlice";
import axios from "axios";

function Overview() {
  const token = useSelector((state) => state.user.token);
  const orders = useSelector((state) => state.order.orders);
  const dispatch = useDispatch();
  // const orders = useSelector((state) => state.order.orders);
  // const last8Orders = [...orders].sort((a, b) => b.id - a.id).slice(0, 7);

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
        console.log("Fetched orders:", response.data);
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

  const topSelling = [
    {
      name: "Nordic Chair",
      sold: 12,
    },
    {
      name: "Cedar Table",

      sold: 9,
    },
    {
      name: "Pine Bookshelf",

      sold: 7,
    },
  ];

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
  console.log("Órdenes desde Redux:", orders);
  return (
    <div className="mt-4 mx-4" style={{ width: "100%" }}>
      <div className="row d-flex gap-3">
        <div className="col border rounded shadow p-4 bg-white">
          <h5 className="fw-bold mb-4 fs-4">Today's Sales</h5>
          <img
            src="src/img/fotoGrafifca.png"
            alt="Sales graph"
            className="img-fluid rounded"
          />
        </div>

        <div className="col border rounded shadow p-4 bg-white">
          <h5 className="fw-bold mb-4 fs-4">Top Selling</h5>
          <div className="d-flex flex-column gap-4">
            {topSelling.map((item, index) => (
              <div key={index} className="d-flex align-items-center">
                <img
                  src={`https://picsum.photos/seed/customer${
                    index * 2 - 1
                  }/40/40`}
                  alt={item.name}
                  className="rounded-circle me-3"
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                  }}
                />
                <div className="flex-grow-1">
                  <div className="fw-semibold fs-5">{item.name}</div>
                  <div className="text-muted fs-6">{item.sold} units sold</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="row my-4 d-flex gap-3">
        <div className="col border rounded shadow p-4 bg-white">
          <h5 className="fw-bold mb-4 fs-4">Orders</h5>
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
                  .slice(0, 7)
                  .map((order, index) => (
                    <tr key={order.id}>
                      <td>
                        <Link
                          to={`/admin/orders?order=${order.id}`}
                          className="text-decoration-none text-primary fw-semibold"
                        >
                          #{order.id}
                        </Link>
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
                        {order.user?.firstname || "No nombre"}{" "}
                        {order.user?.lastname || ""}
                      </td>
                      <td>
                        <span className={getStatusStyle(order.status)}>
                          {order.status}
                        </span>
                      </td>
                      <td>${order.totalAmount}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col border rounded shadow p-4 bg-white">
          <h5 className="fw-bold mb-5 fs-4 ">Analytics</h5>
          <ul className="list-unstyled fs-6">
            <li className="mb-5 mt-5 ">
              <strong>Weekly Sales:</strong> $12.4K
            </li>
            <li className="mb-5">
              <strong>Monthly Sales:</strong> $48.3K
            </li>
            <li className="mb-5">
              <strong>Conversion Rate:</strong> 3.2%
            </li>
            <li className="mb-5">
              <strong>New Customers:</strong> 1.2K
            </li>
          </ul>
        </div>

        <div className="col border rounded shadow p-4 bg-white">
          <h5 className="fw-bold mb-4 fs-4">Customers</h5>
          {[...orders]
            .sort((a, b) => b.id - a.id)
            .slice(0, 7)
            .map((order, index) => (
              <div key={index} className="d-flex align-items-center mb-4">
                <img
                  src={`https://picsum.photos/seed/customer${index}/40/40`}
                  alt="avatar"
                  className="rounded-circle me-3"
                />
                <div>
                  <div className="fw-semibold">
                    {order.user?.firstname || "No nombre"}{" "}
                    {order.user?.lastname || ""}
                  </div>
                  <div className="text-muted fs-6">
                    Email: {order.user?.email || "No email"}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Overview;
