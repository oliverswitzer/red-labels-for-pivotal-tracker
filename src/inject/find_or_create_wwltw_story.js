const WWLTWScheduler = {
    findOrCreateWWLTWStory (dateProvider, storyCreator, wwltwRepository, projectId) {
        const title = `WWLTW for the week of ${dateProvider.nextFriday()}`;

        return wwltwRepository.findByTitle(title, projectId)
            .then(function (responseJson) {
                if (responseJson.stories.stories.length == 0) {
                    return storyCreator.addStory(title, projectId);
                }
            })
    }
};
