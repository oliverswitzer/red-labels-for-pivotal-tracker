import PivotalTrackerApiClient from '../utilities/pivotal_tracker_api_client'
import fetchWrapper from '../utilities/fetch_wrapper'
import ProjectRepository from '../repositories/project_repository'
import ChromeWrapper from '../utilities/chrome_wrapper'
import isProjectEnabled from './use_cases/is_project_enabled'
import ProjectIdProvider from '../utilities/project_id_provider'
import Application from './application'
import notifyNewUserOfToggleFeature from './use_cases/notify_new_user_of_toggle_feature'
import ToggleFeatureNotifier from "./view/toggle_feature_notifier";

chrome.storage.sync.get('trackerApiToken', function (options) {
  /* UTILITIES */
  const trackerApiClient = new PivotalTrackerApiClient(options.trackerApiToken, fetchWrapper);
  const chromeWrapper = new ChromeWrapper(chrome);

  /* VIEW */
  const toggleFeatureNotifier = new ToggleFeatureNotifier({chromeWrapper});

  /* REPOS */
  const projectRepository = new ProjectRepository({
    trackerApiClient,
    chromeWrapper: chromeWrapper
  });

  notifyNewUserOfToggleFeature({projectRepository, chromeWrapper, toggleFeatureNotifier});

  isProjectEnabled(projectRepository, ProjectIdProvider)
    .then(() => Application.run(trackerApiClient))
    .catch((error) => {
      console.log('WWLTW extension is disabled for this project');

      if (error) {
        console.error(error);
      }
    })
});