const WWLTWScheduler = {
    findOrCreateWWLTWStory (wwltwRepository) {
        const projectId = ProjectIdProvider.getProjectId();
        const title = StoryTitleProvider.currentStoryTitle();

        return wwltwRepository.findByTitle(projectId, title)
            .then(function (responseJson) {
                if (responseJson.length == 0) {
                    return wwltwRepository.create(projectId, title);
                }
            })
    }
};
