// Saves options to chrome.storage
function save_options() {
    var trackerApiToken = document.getElementById('tracker-token').value;
    chrome.storage.sync.set({
        trackerApiToken: trackerApiToken
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Token saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get('trackerApiToken', function(options) {
        document.getElementById('tracker-token').value = options.trackerApiToken;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);