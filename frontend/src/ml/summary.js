export default function summaryReport(
  totalProductivity,
  totalSleep,
  totalRest,
  energyLevel
) {
    let prodFeedback = "";
    let sleepFeedback = "";
    let restFeedback = "";
    let energyFeedback = "";

    if (totalProductivity < 420) {
        prodFeedback = "Girl, what were you doing this week";
    } else if (totalProductivity < 840) {
        prodFeedback = "Lock in";
    } else if (totalProductivity < 1260) {
        prodFeedback = "Oh you're locked in. Keep grinding.";
    } else {
        prodFeedback = "Ok we know you're cracked but come on now...";
    }

    if (totalSleep < 28) {
        sleepFeedback = "Ma'am, sleep.";
    } else if (totalSleep < 42) {
        sleepFeedback = "Alani stock is up because of you";
    } else if (totalSleep < 56) {
        sleepFeedback = "Balance balance I see";
    } else {
        sleepFeedback = "Are you dead?";
    }

    if (totalRest < 70) {
        restFeedback = "You need to touch grass more";
    } else if (totalRest < 140) {
        restFeedback = "Girl, taking break won't kill you";
    } else if (totalRest < 210) {
        restFeedback = "Good job Trang, miracle happening";
    } else {
        restFeedback = "Doing this full time but don't even get paid smh";
    }

    if (energyLevel < 5) {
        energyFeedback = "You're no better than a zombie";
    } else if (energyLevel < 10) {
        energyFeedback = "Take a break you need it";
    } else if (energyLevel < 15) {
        energyFeedback = "Good work";
    } else {
        energyFeedback = "You're either having a sugar rush or you're actually doing good";
    }

    let report = "Summary Report:\n";
    report += `- Total Productivity Time: ${totalProductivity} minutes\n`;
    report += `- Productivity Feedback: ${prodFeedback}\n`;
    report += `- Total Sleep Hours: ${totalSleep} hours\n`;
    report += `- Sleep Feedback: ${sleepFeedback}\n`;
    report += `- Total Rest Time: ${totalRest} minutes\n`;
    report += `- Rest Feedback: ${restFeedback}\n`;
    report += `- Current Energy Level: ${energyLevel}\n`;
    report += `- Energy Feedback: ${energyFeedback}\n`;

    return report;
}
