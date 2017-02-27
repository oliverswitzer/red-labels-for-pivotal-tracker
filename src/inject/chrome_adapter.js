chrome.extension.sendMessage({}, function () {

    const modalInitializer = new WWLTWModal();
    const modal = modalInitializer.initialize();

    chrome.storage.sync.get('trackerApiToken', function(options) {
        let wwltwRepository = new WWLTWRepository(options.trackerApiToken);
        modal.bindFormSubmission(wwltwRepository, modal);
    });

    storyListener(modal.$modal);
});
