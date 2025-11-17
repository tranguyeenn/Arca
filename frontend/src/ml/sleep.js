// sleep.js
export function sleepData(sleepRecords) {
  if (sleepRecords >= 0 && sleepRecords <= 4)
    return "Trang, you're going to die before those energy drink even get to you. Go to sleep. Wtf";

  else if (sleepRecords > 4 && sleepRecords <= 6)
    return "You need more sleep, buddy. But this is at least humane.";

  else if (sleepRecords > 6 && sleepRecords <= 8)
    return "This is a miracle happening. Keep this up buddy unless you want to combust";

  else
    return "Are you a bear? Because this is hibernation level sleep.";
}

