chrome.extension.sendMessage({}, function () {

    const modalInitializer = new WWLTWModal();
    const modal = modalInitializer.initialize();

    function getProjectId() {
        return /projects\/(\d*)/.exec(window.location)[1];
    };

    chrome.storage.sync.get('trackerApiToken', function(options) {
        let wwltwRepository = new WWLTWRepository(options.trackerApiToken);
        modal.bindFormSubmission(wwltwRepository, getProjectId());
    });

    storyListener(modal.$modal);
});
