var storyListener = function (dom, modal) {
    chrome.storage.sync.get('trackerApiToken', function(options) {
        let wwltwRepository = new WWLTWRepository(options.trackerApiToken);

        bindListenersToFinishButtons(modal);
        bindListenForSubmissionOfWWLTWForm(wwltwRepository, modal);
    });

    function bindListenForSubmissionOfWWLTWForm(wwltwRepository, modal) {
        let wwltwForm = dom.querySelector("#wwltw-form");

        wwltwForm.addEventListener('submit', function (e) {
            e.preventDefault();
            let learningBody = wwltwForm.querySelector("#learning-body");
            let tags = extractSubmittedTags(wwltwForm);

            wwltwRepository.add(getProjectId(), learningBody.value, tags);

            learningBody.value = "";
            modal.close();
        });
    }

    const getProjectId = function () {
        return /projects\/(\d*)/.exec(window.location)[1];
    };

    const bindListenersToFinishButtons = function (modal) {
        const finishButtons = dom.querySelectorAll('.button.finish');

        finishButtons.forEach(function (button) {
            button.addEventListener('click', promptListener, false);
            function promptListener() {
                modal.open("#wwltw-modal");

                button.removeEventListener('click', promptListener, false);
            }
        });
    };

    const extractSubmittedTags = function (wwltwForm) {
        const learningTags = wwltwForm.querySelector("#learning-tags");
        const tags = $(learningTags).find('option:selected')
            .map(function (i, option) {
                return option.value;
            });

        return Array.prototype.join.call(tags, ', ');
    };


};
