import { useNavigate } from "react-router";
import { useOrders } from "../hooks/useOrders";
import Avatar from "./Avatar";
import OrderStatus from "./OrderStatus";
import { useCategoryProducts } from "../hooks/useCategoryProducts";
import { useMemo } from "react";

function Overview() {
  const { orders } = useOrders();
  const { products } = useCategoryProducts();

  const navigate = useNavigate();

  const topSelling = useMemo(() => {
    return products
      .filter((product) => ["15", "25", "35"].includes(product.id.toString()))
      .map((product, index) => ({
        ...product,
        sold: (index + 1) * 4 + 3 * index,
      }));
  }, [products]);

  return (
    <div className="mt-4 mx-4" style={{ width: "100%" }}>
      <div className="row d-flex gap-3">
        <div className="col border rounded shadow p-4 bg-white">
          <h5 className="fw-bold mb-4 fs-4">Today's Sales</h5>
          <img
            src="https://ubmbvouzxyajisbnmzeu.supabase.co/storage/v1/object/public/products/Components/fotoGrafifca.png"
            alt="Sales graph"
            className="img-fluid rounded"
          />
        </div>

        <div className="col border rounded shadow p-4 bg-white">
          <h5 className="fw-bold mb-4 fs-4">Top Selling</h5>
          <div className="d-flex flex-column gap-4">
            {topSelling.map((item) => (
              <div key={item.id} className="d-flex align-items-center">
                <img
                  src={item.image}
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
                {orders.slice(0, 7).map((order) => (
                  <tr
                    key={order.id}
                    onClick={() => navigate(`/admin/orders?order=${order.id}`)}
                    className="clickable"
                  >
                    <td>#{order.id}</td>
                    <td className="d-flex align-items-center mb-2">
                      <Avatar user={order.user} />
                      {order.user?.firstname || "No name"}{" "}
                      {order.user?.lastname || ""}
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
          {orders.slice(0, 7).map((order, index) => (
            <div key={index} className="d-flex align-items-center mb-4">
              <Avatar user={order.user} />
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
