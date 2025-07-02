import React, { useState } from "react";
import EventCard from "../components/EventCard";
import "../App.css";

const AdminDashboard = () => {
  const [events, setEvents] = useState([
    {
      title: "Hackathon 2025",
      date: "2025-07-15",
      location: "Hyderabad",
      description: "48-hour nonstop innovation challenge."
    },
    {
      title: "AI Workshop",
      date: "2025-07-22",
      location: "Online",
      description: "Intro to AI and hands-on ML demo."
    },
  ]);

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>
      <div className="admin-events">
        {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
