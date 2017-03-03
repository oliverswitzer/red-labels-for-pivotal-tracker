// Saves options to chrome.storage
function save_options(e) {
    e.preventDefault();
    let form = e.currentTarget;
    let trackerApiToken = document.getElementById('tracker-token').value;

    function openOrReload(tabs) {
        if(tabs.length > 0) {
            reloadProjectTabs(tabs, form);
        } else {
            openNewTrackerTab(form);
        }
    }

    chrome.storage.sync.set({
        trackerApiToken: trackerApiToken
    }, function() {
        form.classList.add('success');
        getCurrentTrackerTabs(openOrReload);
    });
}

function restore_options() {
    chrome.storage.sync.get('trackerApiToken', function(options) {
        document.getElementById('tracker-token').value = options.trackerApiToken || "";
    });
}

document.addEventListener("DOMContentLoaded", function() {
    document.addEventListener('DOMContentLoaded', restore_options);
    document.getElementById('token-form').addEventListener('submit', save_options);
});


function getCurrentTrackerTabs(callback) {
    return chrome.tabs.query({
        url: "*://www.pivotaltracker.com/*"
    }, callback)
}



function openNewTrackerTab(form) {
    form.classList.add("redirecting");
    setTimeout(function() {
        window.location = "https://www.pivotaltracker.com/dashboard";
    }, 1500);
}

function reloadProjectTabs(allTrackerTabs, form) {
    form.classList.add("reloading");
    let projectRegex = /:\/\/www.pivotaltracker.com\/n\/projects/;

    allTrackerTabs.forEach(function(tab) {
        if (tab.url.match(projectRegex)) {
            chrome.tabs.reload(tab.id);
        }
    });

    setTimeout(closeCurrentTab, 1500);
}

function closeCurrentTab() {
    chrome.tabs.getCurrent(function (tab) {
        chrome.tabs.remove(tab.id)
    });
}