chrome.alarms.onAlarm.addListener(function(alarm) {
    if (alarm.name === "reminder") {
        runIfTrackerOpen(function () {
            alert("Hey y'all, it's time to send out your WWLTW email!");
        });
    }
});

chrome.runtime.onMessage.addListener(
    function(request) {
        if (isInFutureOrIsNow(request.setAlarm)) {
            chrome.alarms.create('reminder', {when: request.setAlarm});
        }
    }
);

function isInFutureOrIsNow(time) {
    return time >= Date.now();
}

function runIfTrackerOpen(callback) {
    chrome.tabs.query({url: ["http://www.pivotaltracker.com/*", "https://www.pivotaltracker.com/*"]}, function(tabs) {
        if(tabs.length > 0) {
            callback();
        }
    });
}
