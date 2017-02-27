class WWLTWRepository {
    constructor(trackerApiToken) {
        this.trackerApiToken = trackerApiToken;
        this.TRACKER_BASE_URL = "https://www.pivotaltracker.com";
    }

    add(projectId, learningBody, learningTags) {
        this.findByTitle(projectId)
            .then(function(responseJson) {
                return responseJson[0];
            })
            .then(function(story) {
                return this._updateWWLTWStory(story, learningBody, learningTags, projectId);
            }.bind(this))
    }

    findByTitle(projectId) {
        return fetch(this._generateApiUrlBase(projectId) + "/stories?" + this._storySearchParameters(), {
            method: 'GET',
            headers: new Headers({
                "X-TrackerToken": this.trackerApiToken,
                "Content-Type": "application/json"
            })
        }).then(function(response) {
            return response.json();
        });
    }

    _updateWWLTWStory(story, learningBody, learningTags, projectId) {
        return fetch(this._generateApiUrlBase(projectId) + "/stories/" + story.id, {
            method: 'PUT',
            headers: new Headers({
                "X-TrackerToken": this.trackerApiToken,
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({
                "description": this._updateDescription(story, learningBody, learningTags)
            })
        });
    }

    _updateDescription(story, learningBody, learningTags) {
        return `${(story.description || '')}\n
                ${learningBody}
                _Tags: ${learningTags}_\n\n
                ---`;
    }

    _storySearchParameters() {
        var urlSearchParam = new URLSearchParams();
        urlSearchParam.append('filter', 'WWLTW');
        urlSearchParam.append('limit', 1);
        return urlSearchParam.toString();
    }

    _generateApiUrlBase(projectId) {
        return this.TRACKER_BASE_URL + "/services/v5/projects/" + projectId;
    }
}