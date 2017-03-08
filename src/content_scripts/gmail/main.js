import fetchWrapper from '../utilities/fetch_wrapper'
import PivotalTrackerApiClient from '../utilities/pivotal_tracker_api_client';
import WWLTWRepository from '../repositories/wwltw_repository';

const GMAIL_IDS = {subject: ':oq', body: ':np'};

chrome.storage.sync.get('trackerApiToken', function (options) {
    const wwltwRepository = new WWLTWRepository(
        new PivotalTrackerApiClient(options.trackerApiToken, fetchWrapper)
    );
    setProjectNameAndDescription(wwltwRepository);
});

function setProjectNameAndDescription(wwltwRepository) {
    const searchParams = new URL(window.location.href).searchParams;
    let projectId = searchParams.get('trackerProjectId');
    let storyTitle = searchParams.get('storyTitle');

    let storyPromise = wwltwRepository.findByTitle(projectId, storyTitle);
    let projectPromise = wwltwRepository.findProject(projectId);
    let pageHasLoadedPromise = waitForNoMoreNodeInsertions();

    Promise.all([storyPromise, projectPromise, pageHasLoadedPromise]).then(values => {
        populateEmail(values);
    });
}

function waitForNoMoreNodeInsertions() {
    return new Promise(function(resolve, _reject) {
        let timerId = -1;
        document.body.addEventListener('DOMNodeInserted', keepWaiting, false);

        function keepWaiting() {
            clearTimeout(timerId);
            timerId = setTimeout(function() { pageHasLoaded(); }, 750);
        }

        function pageHasLoaded() {
            document.body.removeEventListener('DOMNodeInserted', keepWaiting, false);
            resolve();
        }
    });
}

function populateEmail(values) {
    const projectName = values[1].name;
    const description = values[0][0].description;

    document.getElementById(GMAIL_IDS.subject).value = `[WWLTW] ${projectName}`;
    document.getElementById(GMAIL_IDS.body).innerText = description;
}
