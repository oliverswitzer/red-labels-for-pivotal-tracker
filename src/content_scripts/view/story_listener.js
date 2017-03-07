import $ from 'jquery'

export default (modal) => {
    $(document).on('click', '.finish.button', function (e) {
        let storyTitle = extractStoryTitle(e.target);

        if(isTheWWLTWChore(storyTitle)) {
            return false;
        } else {
            setTimeout(function() {
                chrome.runtime.sendMessage({ eventType: 'pop' });

                modal.modal('show', function () {
                    modal.find('#learning-body').focus();
                });
            }, 0);
        }
    });
};

const STORY_BUTTON_ID_REGEX = /story_state_button_([a-zA-Z0-9]+)_\w+/;

function isTheWWLTWChore(storyTitle) {
    return /WWLTW for the week of/.test(storyTitle);
}

function extractStoryTitle(target) {
    if(isOpenedStory(target)) {
        let storyId = /story_state_button_([a-zA-Z0-9]+)_\w+/.exec(target.id)[1];
        return $(`.${storyId}`).find('.story.name textarea').val();
    } else if (isCollapsedStory(target)) {
        let storyNode = target.parentNode.parentNode;

        return storyNode.querySelector('.story_name').innerText
    }
}

function isCollapsedStory(target) {
    let storyNode = target.parentNode.parentNode;

    return storyNode.querySelector('.story_name') != null;
}

function isOpenedStory(target) {
    return STORY_BUTTON_ID_REGEX.test(target.id);
}