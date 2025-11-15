// src/pages/TasksPage.jsx
import React, { useState } from "react";
import { format } from "date-fns";
import { useTasks } from "../context/TasksContext.jsx";

export default function TasksPage() {
  const {
    tasks,
    addTask,
    deleteTask,
    toggleTask,
    updateTaskOrder,
  } = useTasks();

  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("medium");

  const sortedTasks = [...tasks].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  function handleAdd() {
    if (!newTask.trim()) return;

    const dateKey = format(new Date(), "yyyy-MM-dd");

    addTask({
      text: newTask,
      priority,
      date: dateKey,
    });

    setNewTask("");
  }

  function handleDelete(id) {
    deleteTask(id);
  }

  function handleToggle(id) {
    toggleTask(id);
  }

  function onDragStart(e, index) {
    e.dataTransfer.setData("index", String(index));
  }

  function onDrop(e, index) {
    const from = parseInt(e.dataTransfer.getData("index"), 10);
    if (Number.isNaN(from)) return;

    const newList = [...sortedTasks];
    const [moved] = newList.splice(from, 1);
    newList.splice(index, 0, moved);

    const reordered = newList.map((t, i) => ({
      ...t,
      order: i,
    }));

    updateTaskOrder(reordered);
  }

  return (
    <div className="text-white max-w-2xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-2 text-center">Tasks</h1>
      <p className="text-gray-400 text-center mb-6">Manage everything.</p>

      {/* Add task */}
      <div className="flex gap-3 mb-6">
        <input
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          placeholder="New task..."
          className="flex-1 bg-gray-800 px-3 py-2 rounded border border-gray-700"
        />

        <select
          value={priority}
          onChange={e => setPriority(e.target.value)}
          className="bg-gray-800 px-2 py-2 rounded border border-gray-700"
        >
          <option value="low">Low</option>
          <option value="medium">Normal</option>
          <option value="high">High</option>
        </select>

        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-violet-600 rounded hover:bg-violet-500"
        >
          Add
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {sortedTasks.map((t, i) => (
          <div
            key={t.id}
            draggable
            onDragStart={e => onDragStart(e, i)}
            onDragOver={e => e.preventDefault()}
            onDrop={e => onDrop(e, i)}
            className="bg-gray-800 p-3 rounded flex justify-between items-center border border-gray-700 cursor-grab"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => handleToggle(t.id)}
                className="h-4 w-4 accent-violet-500"
              />
              <span className={t.completed ? "line-through text-gray-500" : ""}>
                {t.text}
              </span>
              <span className="text-xs text-gray-400">({t.priority})</span>
            </div>

            <button
              onClick={() => handleDelete(t.id)}
              className="text-red-400 hover:text-red-300 text-sm"
            >
              delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
