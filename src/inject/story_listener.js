var storyListener = function (dom, modal) {
    chrome.storage.sync.get('trackerApiToken', function(options) {
        let wwltwRepository = new WWLTWRepository(options.trackerApiToken);

        bindListenersToFinishButtons(modal);
        bindListenForSubmissionOfWWLTWForm(wwltwRepository, modal);
    });

    let getProjectId = function () {
        return /projects\/(\d*)/.exec(window.location)[1];
    };

    function bindListenForSubmissionOfWWLTWForm(wwltwRepository, modal) {
        let wwltwForm = dom.querySelector("#wwltw-form");
        wwltwForm.addEventListener('submit', function (e) {
            e.preventDefault();
            let learningBody = e.target.querySelector("#learning-body");

            wwltwRepository.add(getProjectId(), learningBody.value);

            learningBody.value = "";
            modal.close();
        });
    }

    function bindListenersToFinishButtons(modal) {
        let finishButtons = dom.querySelectorAll('.button.finish');

        finishButtons.forEach(function (button) {
            button.addEventListener('click', promptListener, false);
            function promptListener() {
                modal.open("#wwltw-modal");

                button.removeEventListener('click', promptListener, false);
            }
        });
    }


};
