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

    Promise.all([storyPromise, projectPromise, pageLoaded()]).then(values => {
        populateEmail(values);
    });
}

function pageLoaded() {
    return new Promise(function(resolve, _reject) {
        let zGbl_PageChangedByAJAX_Timer = -1;
        document.body.addEventListener ('DOMNodeInserted', resetTimeout, false);

        function resetTimeout() {
            clearTimeout (zGbl_PageChangedByAJAX_Timer);
            zGbl_PageChangedByAJAX_Timer = setTimeout (function() { handlePageChange(); }, 750);
        }

        function handlePageChange() {
            document.body.removeEventListener ('DOMNodeInserted', resetTimeout, false);
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
