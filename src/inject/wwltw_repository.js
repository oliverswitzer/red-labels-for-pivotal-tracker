class WWLTWRepository {
    constructor(trackerApiClient) {
        this.trackerApiClient = trackerApiClient;
    }

    findByTitle(projectId, title) {
        return this.trackerApiClient.getStory(projectId, { filter: title });
    }

    create(projectId, storyTitle) {
        this.trackerApiClient.createStory(
            projectId,
            {name: storyTitle, story_type: 'chore'}
        )
    }

    update(projectId, story, learningTags, learningBody) {
        const newDescription = DescriptionBuilder.build(learningTags, learningBody, story.description);
        return this.trackerApiClient.updateStory(projectId, story.id, newDescription);
    }
}