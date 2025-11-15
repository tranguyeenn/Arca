import React, { useState, useEffect } from "react";

export default function JournalPage() {
  const [entry, setEntry] = useState("");
  const [entries, setEntries] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("journal") || "[]");
    setEntries(saved);
  }, []);

  function saveEntries(arr) {
    setEntries(arr);
    localStorage.setItem("journal", JSON.stringify(arr));
  }

  function addOrUpdateEntry() {
    if (!entry.trim()) return;

    const now = new Date();
    const formatted = now.toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    if (editingId) {
      // Update existing entry
      const updated = entries.map((e) =>
        e.id === editingId ? { ...e, text: entry.trim() } : e
      );
      saveEntries(updated);
      setEditingId(null);
      setEntry("");
      return;
    }

    // Add new entry
    const newEntry = {
      id: Date.now(),
      text: entry.trim(),
      date: formatted,
      day: now.toDateString(), // For grouping
    };

    saveEntries([...entries, newEntry]);
    setEntry("");
  }

  function deleteEntry(id) {
    const filtered = entries.filter((e) => e.id !== id);
    saveEntries(filtered);
  }

  function startEdit(e) {
    setEditingId(e.id);
    setEntry(e.text);
  }

  // Group entries by day
  const grouped = entries.reduce((acc, item) => {
    if (!acc[item.day]) acc[item.day] = [];
    acc[item.day].push(item);
    return acc;
  }, {});

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Journal</h1>

      <textarea
        className="w-full p-3 bg-neutral-900 rounded-lg"
        rows="5"
        placeholder={
          editingId ? "Editing entry..." : "Write something here..."
        }
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
      />

      <button
        className="px-4 py-2 bg-purple-600 text-white rounded-md"
        onClick={addOrUpdateEntry}
      >
        {editingId ? "Update Entry" : "Save Entry"}
      </button>

      <div className="space-y-8 pt-6">
        {entries.length === 0 ? (
          <p>No entries here</p>
        ) : (
          Object.keys(grouped)
            .sort(
              (a, b) => new Date(b).getTime() - new Date(a).getTime()
            )
            .map((day) => (
              <div key={day} className="space-y-4">
                <h2 className="text-lg font-semibold text-neutral-400">
                  {day}
                </h2>

                {grouped[day]
                  .sort((a, b) => b.id - a.id)
                  .map((e) => (
                    <div
                      key={e.id}
                      className="p-4 bg-neutral-900 rounded-lg border border-neutral-800"
                    >
                      <p className="text-neutral-500 text-sm mb-1">{e.date}</p>
                      <p className="mb-3">{e.text}</p>

                      <div className="flex gap-3">
                        <button
                          onClick={() => startEdit(e)}
                          className="text-blue-400 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteEntry(e.id)}
                          className="text-red-400 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            ))
        )}
      </div>
    </div>
  );
}
