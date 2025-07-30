import React from "react";

function Overview() {
  return (
    <div className="container-fluid">
      <div className="row mt-4 alturaOverview">
        <div className="col border rounded shadow me-3 p-4 ">
          <h3>Sales</h3>
          <img src="src/img/fotoGrafifca.png" alt="" />
        </div>
        <div className="col border rounded shadow p-4">ESCRIBIR ACA</div>
      </div>
      <div className="row mt-4 alturaOverview">
        <div className="col border rounded shadow me-3 p-4">
          <h3>Orders</h3>
          <div className="row">
            <div className="col">
              <ul>
                <li>Order 1</li>
                <li>Order 2</li>
                <li>Order 3</li>
                <li>Order 4</li>
                <li>Order 5</li>
              </ul>
            </div>
            <div className="col">
              <ul>
                <li>Name 1</li>
                <li>Name 2</li>
                <li>Name 3</li>
                <li>Name 4</li>
                <li>Name 5</li>
              </ul>
            </div>
            <div className="col">
              <ul>
                <li>Pending</li>
                <li>Shipped</li>
                <li>Delivered</li>
                <li>Cancelled</li>
                <li>Returned</li>
              </ul>
            </div>
            <div className="col">
              <ul>
                <li>$100</li>
                <li>$200</li>
                <li>$300</li>
                <li>$400</li>
                <li>$500</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col border rounded shadow me-3 p-4">
          <h3>Analytics</h3>
          ESCRIBIR ACA
        </div>
        <div className="col border rounded shadow p-4">
          <h3>Customers</h3>
          <div className="row">
            <div className="col-4">
              <ul>
                <li>Name 1</li>
                <li>Name 2</li>
                <li>Name 3</li>
                <li>Name 4</li>
                <li>Name 5</li>
              </ul>
            </div>
            <div className="col-4">
              <ul>
                <li>Message1</li>
                <li>Message2</li>
                <li>Message3</li>
                <li>Message4</li>
                <li>Message5</li>
              </ul>
            </div>
            <div className="col-4">
              <ul>
                <li>Id1</li>
                <li>Id2</li>
                <li>Id3</li>
                <li>Id4</li>
                <li>Id5</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
