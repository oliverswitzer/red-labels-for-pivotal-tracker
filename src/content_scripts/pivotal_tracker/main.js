import PivotalTrackerApiClient from '../utilities/pivotal_tracker_api_client'
import fetchWrapper from '../utilities/fetch_wrapper'
import ProjectRepository from '../repositories/project_repository'
import ChromeStorageWrapper from '../utilities/chrome_storage_wrapper'
import isProjectEnabled from './use_cases/is_project_enabled'
import ProjectIdProvider from '../utilities/project_id_provider'
import Application from './application'
import notifyNewUserOfToggleFeature from './use_cases/notify_new_user_of_toggle_feature'

chrome.storage.sync.get('trackerApiToken', function (options) {
  const trackerApiClient = new PivotalTrackerApiClient(options.trackerApiToken, fetchWrapper);

  const chromeStorageWrapper = new ChromeStorageWrapper(chrome);

  const projectRepository = new ProjectRepository({
    trackerApiClient,
    chromeStorageWrapper: chromeStorageWrapper
  });

  notifyNewUserOfToggleFeature({projectRepository, chromeStorageWrapper});

  isProjectEnabled(projectRepository, ProjectIdProvider)
    .then(() => Application.run(trackerApiClient))
    .catch((error) => {
      console.log('WWLTW extension is disabled for this project');

      if (error) {
        console.error(error);
      }
    })
});