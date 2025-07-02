import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { currentUser } = useAuth();
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("ongoing");
  const [showForm, setShowForm] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", date: "", status: "upcoming" });

  useEffect(() => {
    if (currentUser) fetchEvents();
  }, [currentUser]);

  const fetchEvents = async () => {
    try {
      const snapshot = await getDocs(collection(db, "events"));
      const all = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEvents(all);
    } catch (error) {
      console.error("❌ Error fetching events:", error);
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "events"), newEvent);
      setNewEvent({ title: "", date: "", status: "upcoming" });
      setShowForm(false);
      fetchEvents(); // Refresh list
    } catch (error) {
      console.error("❌ Error adding event:", error);
    }
  };

  const filteredEvents = events.filter(e => e.status === activeTab);

  if (!currentUser) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>Please login to view and manage events.</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <button onClick={() => setActiveTab("ongoing")}>
          🔥 Ongoing Events
        </button>
        <button onClick={() => setActiveTab("upcoming")}>
          📅 Upcoming Events
        </button>
        <button onClick={() => setShowForm(!showForm)} style={{ marginLeft: "auto" }}>
          ➕ Add Event
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddEvent} style={{ marginBottom: "1.5rem" }}>
          <input
            type="text"
            placeholder="Event Title"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            required
          />
          <input
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            required
          />
          <select
            value={newEvent.status}
            onChange={(e) => setNewEvent({ ...newEvent, status: e.target.value })}
          >
            <option value="ongoing">Ongoing</option>
            <option value="upcoming">Upcoming</option>
          </select>
          <button type="submit">Add</button>
        </form>
      )}

      <h3>{activeTab === "ongoing" ? "🔥 Ongoing Events" : "📅 Upcoming Events"}</h3>
      {filteredEvents.length === 0 ? (
        <p>No {activeTab} events found.</p>
      ) : (
        <div style={{ display: "grid", gap: "1rem" }}>
          {filteredEvents.map(event => (
            <div key={event.id} style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
              <strong>{event.title}</strong> — {event.date}
              <p>Status: {event.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
