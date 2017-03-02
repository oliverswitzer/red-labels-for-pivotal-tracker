import DateWrapper from './date_wrapper'

export default {
    currentStoryTitle() {
        return `WWLTW for the week of ${new DateWrapper().nextFriday().format('M/D')}`;
    }
};