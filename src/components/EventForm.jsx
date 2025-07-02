import React, { useState } from "react";
import "../App.css";

const EventForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
    setFormData({ title: "", date: "", location: "", description: "" });
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <h2>Create New Event</h2>
      <input
        type="text"
        name="title"
        placeholder="Event Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Event Description"
        value={formData.description}
        onChange={handleChange}
        required
      ></textarea>
      <button type="submit">Add Event</button>
    </form>
  );
};

export default EventForm;