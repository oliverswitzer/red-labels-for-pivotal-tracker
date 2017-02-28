const WWLTWScheduler = {
    findOrCreateWWLTWStory (storyCreator, wwltwRepository, projectId) {
        const title = StoryTitleProvider.currentStoryTitle();

        return wwltwRepository.findByTitle(title, projectId)
            .then(function (responseJson) {
                if (responseJson.length == 0) {
                    return storyCreator.addStory(title, projectId);
                }
            })
    }
};
