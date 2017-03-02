describe('AddLearningToStoryDescription', function () {
    let wwltwRepositorySpy;
    let foundStory;
    let execute;
    const projectId = 'some project id';
    const storyTitle = 'some story title';

    beforeEach(function () {
        wwltwRepositorySpy = new WWLTWRepository();

        foundStory = {id: '1234'};

        spyOn(AnalyticsWrapper, 'sendEvent');
        spyOn(wwltwRepositorySpy, 'findByTitle').and.returnValue(Promise.resolve([foundStory]));
        spyOn(wwltwRepositorySpy, 'update').and.returnValue(Promise.resolve());
        spyOn(StoryTitleProvider, 'currentStoryTitle').and.returnValue(storyTitle);
        spyOn(ProjectIdProvider, 'getProjectId').and.returnValue(projectId);

        const useCase = new AddLearningToStoryDescription(wwltwRepositorySpy)
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
                expect(AnalyticsWrapper.sendEvent).toHaveBeenCalledWith('submit');
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