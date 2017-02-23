var storyListener = function (dom) {
    var TRACKER_BASE_URL = "https://www.pivotaltracker.com";
    var finishButtons = dom.querySelectorAll('.button.finish');
    var projectId = /projects\/(\d*)/.exec(window.location)[1];

    chrome.storage.sync.get('trackerApiToken', function(options) {
        bindWWLTWListenersToFinishButtons(options.trackerApiToken);
    });

    function bindWWLTWListenersToFinishButtons(trackerApiToken) {
        finishButtons.forEach(function (button) {
            button.addEventListener('click', promptListener, false);

            function promptListener() {
                var submission = prompt("What did you learn while working on this story?");

                fetch(TRACKER_BASE_URL + "/services/v5/projects/" + projectId + "/stories", {
                    method: 'POST',
                    headers: new Headers({
                        "X-TrackerToken": trackerApiToken,
                        "Content-Type": "application/json"
                    }),
                    body: JSON.stringify({
                        "current_state": "unscheduled",
                        "name": submission,
                        "story_type": "chore"
                    })
                });

                button.removeEventListener('click', promptListener, false);
            }
        });
    }

};
