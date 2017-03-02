import DateWrapper from './date_wrapper'

export default function (chrome) {
    function logAlarmReceived (response) {
        console.log("Alarm set for", new Date(response.alarmReceived));
    }

    chrome.runtime.sendMessage({
        setAlarm: new DateWrapper().nextFridayAtThree().valueOf()
    }, logAlarmReceived);
}