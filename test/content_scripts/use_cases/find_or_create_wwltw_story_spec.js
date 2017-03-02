import WWLTWRepository from '../../../src/content_scripts/repositories/wwltw_repository'
import FindOrCreateWWLTWStory from '../../../src/content_scripts/use_cases/find_or_create_wwltw_story'
import ProjectIdProvider from '../../../src/content_scripts/utilities/project_id_provider'
import StoryTitleProvider from '../../../src/content_scripts/utilities/story_title_provider'

describe('findOrCreateWWLTWStory', function () {
    let wwltwRepositorySpy;
    let promiseHelper;
    let findByTitleResponse;
    let findByTitlePromise;

    beforeEach(function () {
        wwltwRepositorySpy = new WWLTWRepository();

        findByTitlePromise = new Promise(function (resolve) {
            promiseHelper = {
                resolve
            };
        });
        spyOn(ProjectIdProvider, 'getProjectId').and.returnValue('some project id');
        spyOn(StoryTitleProvider, 'currentStoryTitle').and.returnValue('WWLTW for the week of 2/25');
        spyOn(wwltwRepositorySpy, 'findByTitle').and.returnValue(findByTitlePromise);
        spyOn(wwltwRepositorySpy, 'create');
    });

    it('checks if a WWLTW story already exists', function () {
        FindOrCreateWWLTWStory(wwltwRepositorySpy);

        expect(wwltwRepositorySpy.findByTitle).toHaveBeenCalledWith("some project id", 'WWLTW for the week of 2/25')
    });

    context('when no WWLTW story exists previously', function () {
        beforeEach(function () {
            findByTitleResponse =[];
        });

        it('calls WWLTWRepository.create with correct date', function (done) {
            const promise = FindOrCreateWWLTWStory(wwltwRepositorySpy);

            promiseHelper.resolve(findByTitleResponse);

            promise.then(function () {
                expect(wwltwRepositorySpy.create).toHaveBeenCalledWith(
                    jasmine.any(String),
                    'WWLTW for the week of 2/25'
                );

                done()
            });
        });

        it('calls wwltwRepository.create with project id', function (done) {
            const promise = FindOrCreateWWLTWStory(wwltwRepositorySpy);

            promiseHelper.resolve(findByTitleResponse);

            promise.then(function () {
                expect(wwltwRepositorySpy.create).toHaveBeenCalledWith(
                    'some project id',
                    jasmine.any(String)
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

        it('does not call wwltwRepository.create', function () {
            FindOrCreateWWLTWStory(wwltwRepositorySpy);

            promiseHelper.resolve(findByTitleResponse);

            expect(wwltwRepositorySpy.create).not.toHaveBeenCalled();
        });
    })
});