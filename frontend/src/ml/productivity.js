// productivity.js
export function productivityFeature(minutesWorked) {
    if (minutesWorked <= 20)
        return "Girl, you barely started. Put down that phone"
    else if (minutesWorked == 60)
        return "Take a break, don't push yourself girl"
    else if (minutesWorked > 120)
        return "I'm shutting down your laptop, go take a break"
}

export function restFeature(breakMinutes) {
    if (breakMinutes == 10)
        return "A bit more rest, don't push yourself"
    else if (breakMinutes == 30)
        return "Ok, let's get back to work now..."
    else if (breakMinutes > 60)
        return "I'm locking your phone away until you finish another session"
}