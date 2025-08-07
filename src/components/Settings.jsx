import React from "react";
import { Link } from "react-router";

function Overview() {
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

  return (
    <div className="container-fluid">
      <div className="row">
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

      <div className="row mt-4">
        <div className="col border rounded shadow me-3 p-4 bg-white">
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
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td>
                      <Link
                        to={`/admin/orders`}
                        className="text-decoration-none text-primary fw-semibold"
                      >
                        {order.id}
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

        <div className="col border rounded shadow me-3  p-4 bg-white">
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
          {orders.map((order, index) => (
            <div key={index} className="d-flex align-items-center mb-4">
              <img
                src={`https://picsum.photos/seed/customer${index}/40/40`}
                alt="avatar"
                className="rounded-circle me-3"
              />
              <div>
                <div className="fw-semibold"> {order.name}</div>
                <div className="text-muted fs-6">
                  Message: I'd like more info...
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
