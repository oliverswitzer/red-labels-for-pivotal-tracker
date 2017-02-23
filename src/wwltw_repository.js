class WWLTWRepository {
    constructor(trackerApiToken) {
        this.trackerApiToken = trackerApiToken;
        this.TRACKER_BASE_URL = "https://www.pivotaltracker.com";
    }

    add(projectId, submission) {
        this.findExistingWWLTWStory(projectId)
            .then(function(response) {
                return response.json();
            })
            .then(function(responseJson) {
                return responseJson[0];
            })
            .then(function(story) {
                return this.updateWWLTWStory(story, submission, projectId);
            }.bind(this))
    }

    updateWWLTWStory(story, submission, projectId) {
        return fetch(this.generateApiUrlBase(projectId) + "/stories/" + story.id, {
            method: 'PUT',
            headers: new Headers({
                "X-TrackerToken": this.trackerApiToken,
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({
                "description": (story.description || '') + '\n' + submission
            })
        });
    }

    findExistingWWLTWStory(projectId) {
        return fetch(this.generateApiUrlBase(projectId) + "/stories?" + this.storySearchParameters(), {
            method: 'GET',
            headers: new Headers({
                "X-TrackerToken": this.trackerApiToken,
                "Content-Type": "application/json"
            })
        });
    }

    storySearchParameters() {
        var urlSearchParam = new URLSearchParams();
        urlSearchParam.append('filter', 'WWLTW');
        urlSearchParam.append('limit', 1);
        return urlSearchParam.toString();
    }

    generateApiUrlBase(projectId) {
        return this.TRACKER_BASE_URL + "/services/v5/projects/" + projectId;
    }
}