// Saves options to chrome.storage
let form = document.querySelector('form');
function save_options(e) {
    e.preventDefault();
    var trackerApiToken = document.getElementById('tracker-token').value;
    chrome.storage.sync.set({
        trackerApiToken: trackerApiToken
    }, function() {
        // Update status to let user know options were saved.
        form.classList.add('success');

        setTimeout(function() {
            window.location = "https://www.pivotaltracker.com/dashboard";
        }, 1500);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get('trackerApiToken', function(options) {
        document.getElementById('tracker-token').value = options.trackerApiToken || "";
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
form.addEventListener('submit', save_options)