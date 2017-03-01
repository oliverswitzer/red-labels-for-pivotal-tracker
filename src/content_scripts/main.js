$(function () {
    const modalInitializer = new WWLTWModal();
    const modal = modalInitializer.initialize();

    chrome.storage.sync.get('trackerApiToken', function (options) {
        let wwltwRepository = new WWLTWRepository(new PivotalTrackerApiClient(options.trackerApiToken, fetchWrapper));

        const addLearningToStoryDescription = new AddLearningToStoryDescription(wwltwRepository);
        modal.bindFormSubmission(addLearningToStoryDescription.execute);

        storyListener(modal.$modal);

        WWLTWScheduler.findOrCreateWWLTWStory(wwltwRepository);
    });
});