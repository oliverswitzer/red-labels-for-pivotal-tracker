chrome.extension.sendMessage({}, function () {

    const modalInitializer = new WWLTWModal();
    const modal = modalInitializer.initialize();

    chrome.storage.sync.get('trackerApiToken', function(options) {
        let wwltwRepository = new WWLTWRepository(options.trackerApiToken);
        bindListenForSubmissionOfWWLTWForm(wwltwRepository, modal);
    });

    let clearForm = function (learningBody) {
        learningBody.value = "";
        $('.ui.fluid.dropdown').dropdown('restore defaults');
    };

    function bindListenForSubmissionOfWWLTWForm(wwltwRepository, modal) {
        let wwltwForm = document.querySelector("#wwltw-form");
        wwltwForm.addEventListener('submit', function (e) {
            e.preventDefault();
            let learningBody = wwltwForm.querySelector("#learning-body");
            let tags = extractSubmittedTags(wwltwForm);

            wwltwRepository.add(getProjectId(), learningBody.value, tags);

            clearForm(learningBody);
            modal.modal('hide');
        });
    }

    const extractSubmittedTags = function (wwltwForm) {
        const learningTags = wwltwForm.querySelector("#learning-tags");
        const tags = $(learningTags).find('option:selected')
            .map(function (i, option) {
                return option.value;
            });

        return Array.prototype.join.call(tags, ', ');
    };

    let getProjectId = function () {
        return /projects\/(\d*)/.exec(window.location)[1];
    };

    storyListener(modal);
});
