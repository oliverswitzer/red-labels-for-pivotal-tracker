export default () => {
    chrome.alarms.onAlarm.addListener(function (alarm) {
        if (alarm.name === "reminder") {

            runIfTrackerOpen(function () {
                alert(`Hey y'all, it's time to send out your WWLTW email!\n\n` +
                `Head on over to Pivotal Tracker, open up your "WWLTW for the week of ${moment().format('M/D')}" chore and hit Finish to generate the email`);
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
