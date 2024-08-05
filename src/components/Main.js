import React from "react";

export default function Main() {
  return (
    <main className="container mt-4">
      <div className="row">
        <div className="col-md-8">
          <h2>Local Forecast</h2>
          <p>Looks like Sunny and 75 for the next 100 days!</p>
        </div>
        <div className="col-md-4">
          <h2>Sidebar TBD</h2>
          <p>
            Sidebar weather content that will wrap to vertical on mobile devices
          </p>
        </div>
      </div>
    </main>
  );
}
