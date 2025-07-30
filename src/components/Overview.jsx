import React from "react";

function Overview() {
  return (
    <div className="container-fluid">
      <div className="row mt-4 alturaOverview">
        <div className="col border rounded shadow me-3 p-4 ">
          <h3>Algo</h3>
          <img
            src="src\img\fotoGrafifca.png"
            alt=""
            className="img-fluid rounded"
          />
        </div>
        <div className="col border rounded shadow p-4">ESCRIBIR ACA</div>
      </div>
      <div className="row mt-4 alturaOverview">
        <div className="col border rounded shadow me-3 p-4">
          <h3>Customers</h3>
          ESCRIBIR ACA
        </div>
        <div className="col border rounded shadow me-3 p-4">
          <h3>Analytics</h3>
          ESCRIBIR ACA
        </div>
        <div className="col border rounded shadow p-4">
          <h3>Sales?</h3>
          ESCRIBIR ACA
        </div>
      </div>
    </div>
  );
}

export default Overview;
