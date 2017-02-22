var $ = $j;
var context = describe;

describe('user can create what we learned this week from prompt', function () {
    var fixture;

    beforeEach(function() {
        fixture = document.createElement('div');
        fixture.innerHTML = window.__html__.index_fixture;

        storyListener(fixture);
    });

    context('when there is a story that has been started', function () {
        var startedStory;

        beforeEach(function () {
            spyOn(window, 'prompt');

            startedStory = $(fixture).find('.story.started');
        });

        function whenIClickFinishOnTheStory() {
            $(startedStory).find('.button.finish').click();
        }

        function thenISeeAPromptForWhatILearned() {
            expect(window.prompt).toHaveBeenCalledWith('What did you learn while working on this story?');
        }

        it('test', function () {
            whenIClickFinishOnTheStory();
            thenISeeAPromptForWhatILearned();
        });
    });
});

