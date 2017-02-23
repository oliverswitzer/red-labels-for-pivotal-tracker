var storyListener = function (dom) {
    chrome.storage.sync.get('trackerApiToken', function(options) {
        var wwltwRepository = new WWLTWRepository(options.trackerApiToken);

        bindListenersToFinishButtons(wwltwRepository);
    });


    function bindListenersToFinishButtons(wwltwRepository) {
        var finishButtons = dom.querySelectorAll('.button.finish');
        var projectId = /projects\/(\d*)/.exec(window.location)[1];

        finishButtons.forEach(function (button) {
            button.addEventListener('click', promptListener, false);
            function promptListener() {
                var submission = prompt("What did you learn while working on this story?");

                wwltwRepository.add(projectId, submission);

                button.removeEventListener('click', promptListener, false);
            }
        });
    }
};
