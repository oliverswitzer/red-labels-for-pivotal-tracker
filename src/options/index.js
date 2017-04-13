// Saves options to chrome.storage
document.addEventListener("DOMContentLoaded", function() {
    document.addEventListener('DOMContentLoaded', restore_options);
    document.getElementById('token-form').addEventListener('submit', save_options);
});

function save_options(e) {
    e.preventDefault();
    let form = e.currentTarget;

    let trackerApiToken = document.getElementById('tracker-token').value;
    chrome.storage.sync.set({
        trackerApiToken: trackerApiToken
    }, function() {
        flashSuccessMessage(form);
        getCurrentTrackerTabs().then(reloadProjectTabs).then(closeOptionsPage);
    });
}

function flashSuccessMessage(form) {
    form.classList.add('success');
    setTimeout(() => {
        form.classList.remove('success');
    }, 1500);
}

function restore_options() {
    chrome.storage.sync.get('trackerApiToken', function(options) {
        document.getElementById('tracker-token').value = options.trackerApiToken || "";
    });
}

function closeOptionsPage() {
    setTimeout(() => {
        chrome.tabs.getCurrent(function(tab) {
            chrome.tabs.remove(tab.id, function() { });
        });
    }, 1000);

}

function getCurrentTrackerTabs() {
    return new Promise((resolve) => {
        chrome.tabs.query({
            url: "*://www.pivotaltracker.com/*"
        }, resolve)
    });
}

function reloadProjectTabs(allTrackerTabs) {
    let projectRegex = /:\/\/www.pivotaltracker.com\/n\/projects/;

    allTrackerTabs.forEach(function(tab) {
        if (tab.url.match(projectRegex)) {
            chrome.tabs.discard(tab.id);
        }
    });
}