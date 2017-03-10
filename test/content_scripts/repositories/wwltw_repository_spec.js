import WWLTWRepository from '../../../src/content_scripts/repositories/wwltw_repository'
import StoryTitleProvider from '../../../src/content_scripts/utilities/story_title_provider'
import DescriptionBuilder from '../../../src/content_scripts/utilities/description_builder'

describe('WWLTWRepository', function () {
    let wwltwRepository;
    let trackerApiClientSpy;
    const storyTitle = 'some story title';
    const projectId = 'some-project-id';

    beforeEach(function () {
        trackerApiClientSpy = jasmine.createSpyObj('trackerApiClient', ['getStory', 'updateStory', 'createStory']);

        spyOn(StoryTitleProvider, 'currentStoryTitle').and.returnValue(storyTitle);

        wwltwRepository = new WWLTWRepository(trackerApiClientSpy);
    });

    describe('findByTitle', function () {
        beforeEach(function () {
            wwltwRepository.findByTitle(projectId, storyTitle);
        });

        it('calls pivotalTrackerApiClient with project id', function () {
            expect(trackerApiClientSpy.getStory).toHaveBeenCalledWith(projectId, jasmine.any(Object));
        });

        it('calls pivotalTrackerApiClient with expected query params', function () {
            expect(trackerApiClientSpy.getStory).toHaveBeenCalledWith(
                jasmine.any(String),
                { filter: storyTitle }
            );
        });
    });

    describe('update', function () {
        const story = {
            id: '1234',
            description: 'existing description'
        };
        const projectId = 'some project id';

        it('passes the project id to trackerApiClient.updateStory', function () {
            wwltwRepository.update(projectId, story, 'some tag, other tag', 'some learning');

            expect(trackerApiClientSpy.updateStory).toHaveBeenCalledWith(
                projectId,
                jasmine.any(String),
                jasmine.any(String)
            );
        });

        it('passes the story id to trackerApiClient.updateStory', function () {
            wwltwRepository.update(projectId, story, 'some tag, other tag', 'some learning');

            expect(trackerApiClientSpy.updateStory).toHaveBeenCalledWith(
                jasmine.any(String),
                story.id,
                jasmine.any(String));
        });

        describe('story description', function () {
            const newDescription = 'new description';
            const learningTags = 'some tag, other tag';
            const learningBody = 'some learning';

            beforeEach(function () {
                spyOn(DescriptionBuilder, 'build').and.returnValue(newDescription);
            });

            it('builds an updated description from original story description', function () {
                wwltwRepository.update(projectId, story, learningTags, learningBody);

                expect(DescriptionBuilder.build).toHaveBeenCalledWith(learningTags, learningBody, story.description);
            });

            it('passes the updated description to trackerApiClient.updateStory', function () {
                wwltwRepository.update(projectId, story, learningTags, learningBody);

                expect(trackerApiClientSpy.updateStory).toHaveBeenCalledWith(
                    jasmine.any(String),
                    jasmine.any(String),
                    newDescription
                );
            });
        });

    });

    describe('create', function () {
        it('calls tracker api client', function () {
            wwltwRepository.create(projectId, storyTitle);

            expect(trackerApiClientSpy.createStory).toHaveBeenCalledWith(
                projectId,
                jasmine.objectContaining({
                    name: storyTitle,
                    story_type: 'chore',
                    labels: ['wwltw-story']
                })
            );
        });
    });
});