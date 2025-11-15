// src/context/TasksContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
const TasksContext = createContext(null);

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  // load tasks from storage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("tasks");
      const parsed = raw ? JSON.parse(raw) : [];
      setTasks(Array.isArray(parsed) ? parsed : []);
    } catch (err) {
      console.error("Failed to read tasks:", err);
    }
  }, []);

  // save tasks to storage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask({ text, priority = "medium", date }) {
    const nextOrder =
      tasks.length > 0
        ? Math.max(...tasks.map(t => t.order ?? 0)) + 1
        : 0;

    const newTask = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      priority,
      date,
      order: nextOrder,
    };

    setTasks(prev => [...prev, newTask]);
    return newTask;
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(t => t.id !== id));
  }

  function toggleTask(id) {
    setTasks(prev =>
      prev.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  }

  function updateTaskOrder(list) {
    setTasks(list);
  }

  function getTasksForDate(key) {
    return tasks.filter(t => t.date === key);
  }

  return (
    <TasksContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        toggleTask,
        updateTaskOrder,
        getTasksForDate,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

// THE HOOK YOU'RE MISSING
export function useTasks() {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used inside <TasksProvider>");
  }
  return context;
}
