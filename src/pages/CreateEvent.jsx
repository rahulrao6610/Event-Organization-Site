import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function CreateEvent() {
  const [form, setForm] = useState({ title: "", date: "", status: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "events"), form);
      alert("Event created!");
      setForm({ title: "", date: "", status: "" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Create Event</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
        <input placeholder="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
