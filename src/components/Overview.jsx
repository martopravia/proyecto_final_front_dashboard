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
          <div className="list-group">
            <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
              <span className="text-muted">#orderId</span>
              <span>Nombre persona</span>
              <span className="badge rounded-pill text-bg-success">
                Delivered
              </span>
              <span className="fw-semibold">USD 1500</span>
            </div>

            <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
              <span className="text-muted">#orderId</span>
              <span>Nombre persona</span>
              <span className="badge rounded-pill text-bg-warning text-dark">
                Processing
              </span>
              <span className="fw-semibold">USD 1500</span>
            </div>

            <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
              <span className="text-muted">#orderId</span>
              <span>Nombre persona</span>
              <span className="badge rounded-pill text-bg-primary">
                Shipped
              </span>
              <span className="fw-semibold">USD 1500</span>
            </div>

            <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
              <span className="text-muted">#orderId</span>
              <span>Nombre persona</span>
              <span className="badge rounded-pill text-bg-success">
                Delivered
              </span>
              <span className="fw-semibold">USD 1500</span>
            </div>

            <div className="d-flex justify-content-between align-items-center py-3">
              <span className="text-muted">#orderId</span>
              <span>Nombre persona</span>
              <span className="badge rounded-pill text-bg-warning text-dark">
                Processing
              </span>
              <span className="fw-semibold">USD 1500</span>
            </div>
          </div>
        </div>
        <div className="col border rounded shadow me-3 p-4">
          <h3>Analytics</h3>
          ESCRIBIR ACA
        </div>
        <div className="col border rounded shadow p-4">
          <h3>Messages</h3>
          <div className="d-flex p-3 border-bottom">
            <div className="flex-grow-1">
              <div className="d-flex justify-content-between">
                <strong>Nombre persona</strong>
                <small className="text-muted">12 min ago</small>
              </div>
              <div className="text-muted">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Reiciendis, vel?
              </div>
            </div>
          </div>
          <div className="d-flex p-3 border-bottom">
            <div className="flex-grow-1">
              <div className="d-flex justify-content-between">
                <strong>Nombre persona</strong>
                <small className="text-muted">12 min ago</small>
              </div>
              <div className="text-muted">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Reiciendis, vel?
              </div>
            </div>
          </div>
          <div className="d-flex p-3 border-bottom">
            <div className="flex-grow-1">
              <div className="d-flex justify-content-between">
                <strong>Nombre persona</strong>
                <small className="text-muted">12 min ago</small>
              </div>
              <div className="text-muted">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Reiciendis, vel?
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
