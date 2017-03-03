import NextFridayProvider from './next_friday_provider'

export default {
    currentStoryTitle() {
        return `WWLTW for the week of ${NextFridayProvider.formattedDate()}`;
    }
};