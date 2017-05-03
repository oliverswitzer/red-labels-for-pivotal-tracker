import $ from 'jquery';
import PivotalTrackerApiClient from '../utilities/pivotal_tracker_api_client';
import fetchWrapper from '../utilities/fetch_wrapper'
import ProjectRepository from '../repositories/project_repository';
import ChromeStorageWrapper from '../utilities/chrome_storage_wrapper';
import isProjectEnabled from './use_cases/is_project_enabled'
import ProjectIdProvider from '../utilities/project_id_provider'

import Application from './application';


chrome.storage.sync.get('trackerApiToken', function (options) {
  const trackerApiClient = new PivotalTrackerApiClient(options.trackerApiToken, fetchWrapper);

  const projectRepository = new ProjectRepository({
    trackerApiClient,
    chromeStorageWrapper: new ChromeStorageWrapper(chrome)
  });

  isProjectEnabled(projectRepository, ProjectIdProvider)
    .then(() => Application.run(trackerApiClient))
    .catch((error) => {
      console.log('WWLTW extension is disabled for this project');

      if(error) {
        console.error(error);
      }
    })
});