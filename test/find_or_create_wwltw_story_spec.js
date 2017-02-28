let context = describe;

describe('findOrCreateWWLTWStory', function () {
    let storyCreatorSpy;
    let wwltwRepositorySpy;
    let promiseHelper;
    let findByTitleResponse;
    let findByTitlePromise;

    beforeEach(function () {
        storyCreatorSpy = new StoryCreator();
        wwltwRepositorySpy = new WWLTWRepository();

        findByTitlePromise = new Promise(function (resolve) {
            promiseHelper = {
                resolve
            };
        });

        spyOn(StoryTitleProvider, 'currentStoryTitle').and.returnValue('WWLTW for the week of 2/25');
        spyOn(storyCreatorSpy, 'addStory');
        spyOn(wwltwRepositorySpy, 'findByTitle').and.returnValue(findByTitlePromise);
    });

    it('checks if a WWLTW story already exists', function () {
        WWLTWScheduler.findOrCreateWWLTWStory(storyCreatorSpy, wwltwRepositorySpy, "some project id");

        expect(wwltwRepositorySpy.findByTitle).toHaveBeenCalledWith('WWLTW for the week of 2/25', jasmine.any(String))
    });

    context('when no WWLTW story exists previously', function () {
        beforeEach(function () {
            findByTitleResponse =[];
        });

        it('calls addStory with correct date', function (done) {
            const promise = WWLTWScheduler.findOrCreateWWLTWStory(storyCreatorSpy, wwltwRepositorySpy, "some project id");

            promiseHelper.resolve(findByTitleResponse);

            promise.then(function () {
                expect(storyCreatorSpy.addStory).toHaveBeenCalledWith(
                    'WWLTW for the week of 2/25',
                    jasmine.any(String)
                );

                done()
            });
        });

        it('calls addStory with project id', function (done) {
            const promise = WWLTWScheduler.findOrCreateWWLTWStory(storyCreatorSpy, wwltwRepositorySpy, "some project id");

            promiseHelper.resolve(findByTitleResponse);

            promise.then(function () {
                expect(storyCreatorSpy.addStory).toHaveBeenCalledWith(
                    jasmine.any(String),
                    'some project id'
                );

                done();
            });
        });
    });

    context('when there is a WWLTW story already', function () {
        beforeEach(function () {
            findByTitleResponse = {
                stories: {
                    stories: [{some: 'story'}]
                }
            };
        });

        it('does not call addStory', function () {
            WWLTWScheduler.findOrCreateWWLTWStory(storyCreatorSpy, wwltwRepositorySpy, "some project id");

            promiseHelper.resolve(findByTitleResponse);

            expect(storyCreatorSpy.addStory).not.toHaveBeenCalled();
        });
    })
});