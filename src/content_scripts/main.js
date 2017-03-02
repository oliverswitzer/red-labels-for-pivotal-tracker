import AddLearningToStoryDescription from './use_cases/add_learning_to_story_description';
import PivotalTrackerApiClient from './utilities/pivotal_tracker_api_client';
import WWLTWRepository from './repositories/wwltw_repository';
import WWLTWScheduler from './use_cases/find_or_create_wwltw_story';
import WWLTWModal from './view/wwltw_modal';
import fetchWrapper from './utilities/fetch_wrapper'
import storyListener from './view/story_listener'
import $ from 'jquery';
import SetAlarm from './alarm_creator'
import AnalyticsWrapper from './utilities/analytics_wrapper'

$(function () {
    SetAlarm(chrome);

    const modalInitializer = new WWLTWModal();
    const modal = modalInitializer.initialize();
    AnalyticsWrapper.initialize();


    chrome.storage.sync.get('trackerApiToken', function (options) {
        let wwltwRepository = new WWLTWRepository(new PivotalTrackerApiClient(options.trackerApiToken, fetchWrapper));

        const addLearningToStoryDescription = new AddLearningToStoryDescription(wwltwRepository);
        modal.bindFormSubmission(addLearningToStoryDescription.execute);

        storyListener(modal.$modal);

        WWLTWScheduler.findOrCreateWWLTWStory(wwltwRepository);
    });
});