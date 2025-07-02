import React from "react";

const EventCard = ({ event }) => {
  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "1rem",
      borderRadius: "8px",
      backgroundColor: "#f9f9f9",
      marginBottom: "1rem"
    }}>
      <h3>{event.title}</h3>
      <p><strong>Date:</strong> {event.date}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p>{event.description}</p>
      <button style={{
        padding: "0.5rem 1rem",
        backgroundColor: "#3b82f6",
        color: "white",
        border: "none",
        borderRadius: "5px"
      }}>
        📩 Book Now
      </button>
    </div>
  );
};

export default EventCard;
