// src/pages/CalendarPage.jsx
import React, { useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  format,
  isSameMonth,
  isSameDay,
} from "date-fns";

import { useTasks } from "../context/TasksContext.jsx";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newTask, setNewTask] = useState("");

  const {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
  } = useTasks();

  const selectedKey = format(selectedDate, "yyyy-MM-dd");

  // All tasks for this date
  const items = tasks
    .filter(t => t.date === selectedKey)
    .map(t => ({ ...t, type: "task" }));

  function selectDay(day) {
    setSelectedDate(new Date(day));
  }

  function saveTask() {
    if (!newTask.trim()) return;

    addTask({
      text: newTask,
      priority: "medium",
      date: selectedKey,
    });

    setNewTask("");
  }

  function handleDelete(item) {
    deleteTask(item.id);
  }

  function handleToggle(item) {
    toggleTask(item.id);
  }

  function renderCalendar() {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const start = startOfWeek(monthStart);
    const end = endOfWeek(monthEnd);

    let day = start;
    const rows = [];

    while (day <= end) {
      const week = [];

      for (let i = 0; i < 7; i++) {
        const thisDay = new Date(day);
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isSelected = isSameDay(thisDay, selectedDate);

        week.push(
          <div
            key={day.toString()}
            onClick={() => selectDay(thisDay)}
            className={`
              h-12 w-12 flex items-center justify-center rounded-lg
              border border-gray-700 cursor-pointer
              ${
                isSelected
                  ? "bg-violet-600 text-white"
                  : isCurrentMonth
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "opacity-20 bg-gray-800"
              }
            `}
          >
            {format(day, "d")}
          </div>
        );

        day = addDays(day, 1);
      }

      rows.push(
        <div key={day} className="flex justify-center gap-2">
          {week}
        </div>
      );
    }

    return rows;
  }

  return (
    <div className="text-white flex flex-col items-center py-8">

      {/* Month Header */}
      <div className="flex items-center gap-6 mb-4">
        <button
          onClick={() => setCurrentDate(subMonths(currentDate, 1))}
          className="px-3 py-1 bg-gray-700 rounded"
        >
          ←
        </button>

        <h2 className="text-2xl font-bold">
          {format(currentDate, "MMMM yyyy")}
        </h2>

        <button
          onClick={() => setCurrentDate(addMonths(currentDate, 1))}
          className="px-3 py-1 bg-gray-700 rounded"
        >
          →
        </button>
      </div>

      <div className="flex flex-col gap-2">{renderCalendar()}</div>

      {/* Bottom Panel */}
      <div className="w-[380px] bg-gray-900 p-4 mt-6 rounded-xl">
        <h3 className="font-semibold mb-3">
          {format(selectedDate, "MMMM d, yyyy")}
        </h3>

        <div className="space-y-2 mb-3">
          {items.length === 0 && (
            <p className="text-gray-500 text-sm">No tasks for this day.</p>
          )}

          {items.map(item => (
            <div
              key={item.id}
              className="bg-gray-800 p-2 rounded text-sm flex justify-between items-center"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => handleToggle(item)}
                  className="h-4 w-4 accent-violet-500"
                />

                <span
                  className={
                    item.completed
                      ? "line-through text-gray-500"
                      : ""
                  }
                >
                  {item.text}
                </span>
              </div>

              <button
                onClick={() => handleDelete(item)}
                className="text-red-400 hover:text-red-300 text-xs"
              >
                delete
              </button>
            </div>
          ))}
        </div>

        {/* Add Task */}
        <div className="flex gap-2">
          <input
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            placeholder="Add task"
            className="flex-1 bg-gray-700 px-2 py-1 rounded"
          />
          <button
            onClick={saveTask}
            className="px-3 bg-violet-600 rounded hover:bg-violet-500"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
