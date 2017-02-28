const StoryTitleProvider = {
    currentStoryTitle() {
        return `WWLTW for the week of ${moment().endOf('week').subtract(1, 'day').format('M/D')}`;
    }
};