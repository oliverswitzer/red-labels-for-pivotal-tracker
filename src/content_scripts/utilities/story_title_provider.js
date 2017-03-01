const StoryTitleProvider = {
    currentStoryTitle() {
        return `WWLTW for the week of ${new DateWrapper().nextFriday().format('M/D')}`;
    }
};