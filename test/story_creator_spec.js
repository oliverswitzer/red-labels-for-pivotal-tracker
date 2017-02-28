describe('StoryCreator', function () {
    let storyCreator;
    let fetchWrapper;
    const projectId = 'MY_ID';

    beforeEach(function () {
        fetchWrapper = jasmine.createSpy('fetchWrapper');
        storyCreator = new StoryCreator(fetchWrapper, 'some tracker token');
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

        describe('headers', function () {
            it('appends "Content-Type": "application/json"', function () {
                storyCreator.addStory("some title", projectId);

                let headers = fetchWrapper.calls.mostRecent().args[1].headers;
                expect(headers.get('Content-Type')).toEqual('application/json');
            });

            it('appends the tracker API token', function () {
                storyCreator.addStory("some title", projectId);

                let headers = fetchWrapper.calls.mostRecent().args[1].headers;
                expect(headers.get('X-TrackerToken')).toEqual('some tracker token');
            });
        });

        describe('request body', function () {
            it('sets the story_type to chore', function () {
                storyCreator.addStory("some title", projectId);

                let body = getRequestBody();

                expect(body).toEqual(jasmine.objectContaining({story_type: 'chore'}));
            });

            it('sets the name to the passed in name parameter', function () {
                storyCreator.addStory("some title", projectId);

                let body = getRequestBody();

                expect(body).toEqual(jasmine.objectContaining({name: 'some title'}));
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