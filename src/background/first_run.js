chrome.runtime.onInstalled.addListener(function(details) {
    if (details.reason === 'install') {
        chrome.tabs.create({url: `chrome-extension://${chrome.runtime.id}/src/options/index.html`});
    }
});