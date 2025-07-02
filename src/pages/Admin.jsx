// src/pages/Admin.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const Admin = () => {
  const { currentUser } = useAuth();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const snapshot = await getDocs(collection(db, "events"));
        const all = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEvents(all);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    if (currentUser) fetchEvents();
  }, [currentUser]);

  const handleBookEvent = (eventId) => {
    alert(`Booking event: ${eventId}`);
    // Later: update Firestore or redirect to booking page
  };

  if (!currentUser) {
    return <p style={{ padding: "2rem" }}>Please login to view the admin panel.</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📋 Admin Dashboard - All Events</h2>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <div style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
          {events.map(event => (
            <div key={event.id} style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              backgroundColor: "#f9fafb"
            }}>
              <h3>{event.title}</h3>
              <p>Date: {event.date}</p>
              <p>Status: {event.status}</p>
              <button
                onClick={() => handleBookEvent(event.id)}
                style={{
                  marginTop: "0.5rem",
                  padding: "0.5rem 1rem",
                  backgroundColor: "#3b82f6",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                📩 Book Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;
