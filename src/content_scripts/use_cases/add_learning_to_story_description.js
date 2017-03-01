class AddLearningToStoryDescription {
    constructor(wwltwRepository) {
        this.wwltwRepository = wwltwRepository;

        this.execute = this.execute.bind(this);
    }

    execute(learningTags, learningBody) {
        const projectId = ProjectIdProvider.getProjectId();

        return this.wwltwRepository.findByTitle(projectId, StoryTitleProvider.currentStoryTitle())
            .then(function (responseJson) {
                return responseJson[0];
            })
            .then((story) => {
                return this.wwltwRepository.update(
                    projectId,
                    story,
                    learningTags,
                    learningBody
                );
            });
    }
}
