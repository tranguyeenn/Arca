const STORAGE_KEY = "luna_events";

export function getEvents() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveEvents(events) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

export function addEvent(event) {
  const all = getEvents();
  all.push(event);
  saveEvents(all);
}

export function deleteEvent(id) {
  saveEvents(getEvents().filter(e => e.id !== id));
}

export function getEventsForDate(dateStr) {
  return getEvents().filter(e => e.date === dateStr);
}
