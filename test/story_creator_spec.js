describe('StoryCreator', function () {
    let storyCreator;
    let fetchWrapper;
    const projectId = 'MY_ID';

    beforeEach(function () {
        fetchWrapper = jasmine.createSpy('fetchWrapper');
        storyCreator = new StoryCreator(fetchWrapper);
    });

    describe('addStory', function () {
        it('calls the tracker API POST /projects/:id/stories to create a chore in the icebox', function () {
            storyCreator.addStory("some title", projectId);

            expect(fetchWrapper).toHaveBeenCalledWith(
                `https://www.pivotaltracker.com/services/v5/projects/${projectId}/stories`,
                jasmine.objectContaining({
                    method: 'POST',
                })
            );
        });

        it('appends correct headers', function () {
            storyCreator.addStory("some title", projectId);

            let headers = fetchWrapper.calls.mostRecent().args[1].headers;
            expect(headers.get('Content-Type')).toEqual('application/json');
        });

        describe('request body', function () {
            it('sets the current state to unscheduled', function () {
                storyCreator.addStory("some title", projectId);

                let body = getRequestBody();

                expect(body).toEqual(jasmine.objectContaining({current_state: 'unscheduled'}));
            });

            it('sets the title to the passed in title', function () {
                storyCreator.addStory("some title", projectId);

                let body = getRequestBody();

                expect(body).toEqual(jasmine.objectContaining({title: 'some title'}));
            });

            let getRequestBody = function () {
                return JSON.parse(fetchWrapper.calls.mostRecent().args[1].body);
            };
        });


        describe('return value', function () {
            beforeEach(function () {
                let fetchPromise = new Promise(function (resolve, reject) {});

                fetchWrapper = jasmine.createSpy('fetchWrapper').and.returnValue(fetchPromise);

                storyCreator = new StoryCreator(fetchWrapper);
            });

            it('is a promise', function () {
                expect(storyCreator.addStory('some title', projectId)).toEqual(jasmine.any(Promise))
            });
        });
    });
});