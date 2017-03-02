chrome.runtime.onMessage.addListener(
    function (request, sender, callback) {
        if (request.setAlarm && isInFutureOrIsNow(request.setAlarm)) {
            chrome.alarms.create('reminder', {when: request.setAlarm});
            callback({alarmReceived: request.setAlarm});
            return;
        }
        if (request.eventType) {
            sendEvent(request.eventType);
        }
    }
);

function isInFutureOrIsNow(time) {
    return time >= Date.now();
}
