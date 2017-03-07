import AddLearningToStoryDescription from '../../../../src/content_scripts/pivotal_tracker/use_cases/add_learning_to_story_description'
import WWLTWRepository from '../../../../src/content_scripts/repositories/wwltw_repository';
import StoryTitleProvider from '../../../../src/content_scripts/utilities/story_title_provider';
import ProjectIdProvider from '../../../../src/content_scripts/utilities/project_id_provider';

describe('AddLearningToStoryDescription', function () {
    let wwltwRepositorySpy;
    let foundStory;
    let execute;
    const projectId = 'some project id';
    const storyTitle = 'some story title';

    beforeEach(function () {
        wwltwRepositorySpy = new WWLTWRepository();

        foundStory = {id: '1234'};

        spyOn(chrome.runtime, 'sendMessage');
        spyOn(wwltwRepositorySpy, 'findByTitle').and.returnValue(Promise.resolve([foundStory]));
        spyOn(wwltwRepositorySpy, 'update').and.returnValue(Promise.resolve());
        spyOn(StoryTitleProvider, 'currentStoryTitle').and.returnValue(storyTitle);
        spyOn(ProjectIdProvider, 'getProjectId').and.returnValue(projectId);

        const useCase = new AddLearningToStoryDescription(wwltwRepositorySpy);
        execute = useCase.execute;
    });

    describe('execute', function () {
        describe('when called outside of AddLearningToStoryDescription instance', function () {
            it('finds the story', function () {
                execute('some tag, some other tag', 'some body');

                expect(wwltwRepositorySpy.findByTitle).toHaveBeenCalledWith(
                    projectId,
                    storyTitle
                );
            });

            it('sends analytics data', function () {
                execute();
                expect(chrome.runtime.sendMessage).toHaveBeenCalledWith({ eventType: 'submit' });
            });

            it('updates the found story', function (done) {
                const body = 'some body';
                const tags = 'some tag, some other tag';

                execute(tags, body).then(function () {
                    expect(wwltwRepositorySpy.update).toHaveBeenCalledWith(
                        projectId, foundStory, tags, body
                    );
                    done();
                });
            });
        });
    });
});