import $ from 'jquery';
import fetchWrapper from '../utilities/fetch_wrapper'
import PivotalTrackerApiClient from '../utilities/pivotal_tracker_api_client';
import WWLTWRepository from '../repositories/wwltw_repository';

$(function () {
    chrome.storage.sync.get('trackerApiToken', function (options) {
        let wwltwRepository = new WWLTWRepository(new PivotalTrackerApiClient(options.trackerApiToken, fetchWrapper));

        let intervalId = setInterval(function () {
            if (gmailLoaded()) {
                clearInterval(intervalId);
                populateEmail(wwltwRepository);
            }
        }, 500);
    });

});
function populateEmail(wwltwRepository) {
    let searchParams = new URL(window.location.href).searchParams;

    const title = searchParams.get('storyTitle');
    const projectId = searchParams.get('trackerProjectId');

    wwltwRepository.findByTitle(projectId, title).then(function (story) {
        document.getElementById(':np').innerText = story[0].description;
    });

    wwltwRepository.findProject(projectId).then(function (project) {
        document.getElementById(':oq').value = `[WWLTW] ${project.name}`;
    });
}

function gmailLoaded() {
    return document.getElementById(':p0');
}
