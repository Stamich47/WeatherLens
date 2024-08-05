import React from "react";

const time = new Date().toLocaleTimeString();
const hour = new Date().getHours();

const mainGreeting = () => {
  if (hour >= 5 && hour < 12) {
    return "Good Morning!";
  } else if (hour >= 12 && hour < 17) {
    return "Good Afternoon!";
  } else if (hour >= 17) {
    return "Good Evening!";
  } else if (hour < 5) {
    return "Hey there early riser!";
  } else {
    return "Good Day!";
  }
};

export default function Main() {
  return (
    <main className="container mt-4">
      <div className="row">
        <div className="col-md-8">
          <h2>{mainGreeting()}</h2>
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
