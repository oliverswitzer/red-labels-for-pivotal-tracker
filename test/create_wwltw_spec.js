var $ = $j;
var context = describe;

describe('user can create what we learned this week from prompt', function () {
    var fixture;

    beforeEach(function() {
        spyOn(window, 'prompt');
        fixture = document.createElement('div');
        fixture.innerHTML = window.__html__.index_fixture;

        storyListener(fixture);
    });

    context('when there is a story that has been started', function () {
        var startedStory;

        beforeEach(function () {
            startedStory = $(fixture).find('.story.started');
        });

        it('shows a prompt when the finish button is clicked', function () {
            whenIClickTheStateButtonOn(startedStory);
            thenISeeAPromptForWhatILearned();

            whenIClickTheStateButtonOn(startedStory);
            window.prompt.calls.reset();
            thenIDoNotSeeAPromptForWhatILearned();
        });
    });

    context('when there is a story that has not been started', function() {
        var unstartedStory;

        beforeEach(function () {
            unstartedStory = $(fixture).find('.story.unstarted');
        });

        it('shows a prompt when the finish button is clicked', function () {
            whenIClickTheStateButtonOn(unstartedStory);
            thenIDoNotSeeAPromptForWhatILearned();
        });
    });

    function whenIClickTheStateButtonOn(storyNode) {
        $(storyNode).find('.button.state').click();
    }

    function thenISeeAPromptForWhatILearned() {
        expect(window.prompt).toHaveBeenCalledWith('What did you learn while working on this story?');
    }

    function thenIDoNotSeeAPromptForWhatILearned() {
        expect(window.prompt).not.toHaveBeenCalled();
    }
});

