import NextFridayProvider from "./next_friday_provider";

export default function (chrome) {
    function logAlarmReceived (response) {
        console.log("Alarm set for", new Date(response.alarmReceived));
    }

    chrome.runtime.sendMessage({
        setAlarm: NextFridayProvider.millisecondsDate()
    }, logAlarmReceived);
}