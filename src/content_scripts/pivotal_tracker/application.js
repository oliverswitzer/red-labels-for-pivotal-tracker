import AddLearningToStoryDescription from './use_cases/add_learning_to_story_description';
import WWLTWRepository from '../repositories/wwltw_repository';
import FindOrCreateWWLTWStory from './use_cases/find_or_create_wwltw_story';
import WWLTWModal from './view/wwltw_modal';
import storyListener from './view/story_listener'
import iconListener from './view/icon_listener'
import SetAlarm from '../utilities/alarm_creator'
import $ from 'jquery';

export default {
  run: (trackerApiClient) => {
    $(function () {
      console.log('Injecting WWLTW plugin for project');

      SetAlarm(chrome);
      const modalInitializer = new WWLTWModal();
      const modal = modalInitializer.initialize();

      const wwltwRepository = new WWLTWRepository(trackerApiClient);

      const addLearningToStoryDescription = new AddLearningToStoryDescription(wwltwRepository);
      modal.bindFormSubmission(addLearningToStoryDescription.execute);

      storyListener(modal.$modal);
      iconListener();

      FindOrCreateWWLTWStory(wwltwRepository);
    });
  }
}