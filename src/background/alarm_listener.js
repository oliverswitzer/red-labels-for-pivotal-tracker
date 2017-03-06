export default () => {
    chrome.alarms.onAlarm.addListener(function (alarm) {
        if (alarm.name === "reminder") {
            runIfTrackerOpen(function () {
                alert("Hey y'all, it's time to send out your WWLTW email!");
            });
        }
    });
}

const runIfTrackerOpen = (callback) => {
    chrome.tabs.query({url: ["http://www.pivotaltracker.com/*", "https://www.pivotaltracker.com/*"]}, function (tabs) {
        if (tabs.length > 0) {
            callback();
        }
    });
};
