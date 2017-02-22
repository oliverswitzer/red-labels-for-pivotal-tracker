chrome.extension.sendMessage({}, function() {
    setTimeout(function() {
        storyListener(document);
    }, 2000);
});