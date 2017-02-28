class WWLTWRepository {
    constructor(trackerApiToken, fetchWrapper) {
        this.trackerApiToken = trackerApiToken;
        this.TRACKER_BASE_URL = "https://www.pivotaltracker.com";
        this.fetchWrapper = fetchWrapper;
    }

    add(projectId, learningBody, learningTags) {
        return this.findByTitle(StoryTitleProvider.currentStoryTitle(), projectId)
            .then(function (responseJson) {
                return responseJson[0];
            })
            .then(function (story) {
                return this._updateWWLTWStory(story, learningBody, learningTags, projectId);
            }.bind(this))
    }

    findByTitle(title, projectId) {
        return this.fetchWrapper(
            this._generateApiUrlBase(projectId) + "/stories?" + this._storySearchParameters(title),
            {
                method: 'GET',
                headers: new Headers({
                    "X-TrackerToken": this.trackerApiToken,
                    "Content-Type": "application/json"
                })
            })
            .then(function (response) {
                return response.json();
            });
    }

    _updateWWLTWStory(story, learningBody, learningTags, projectId) {
        return this.fetchWrapper(this._generateApiUrlBase(projectId) + "/stories/" + story.id, {
            method: 'PUT',
            headers: new Headers({
                "X-TrackerToken": this.trackerApiToken,
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({
                "description": this._appendLearningToStory(story, learningBody, learningTags)
            })
        });
    }

    _appendLearningToStory(story, learningBody, learningTags) {
        return `${(story.description || '')}\n
                ${learningBody}
                _Tags: ${learningTags}_\n\n
                ---`;
    }

    _storySearchParameters(title) {
        var urlSearchParam = new URLSearchParams();
        urlSearchParam.append('filter', `"${title}"`);
        urlSearchParam.append('limit', 1);
        return urlSearchParam.toString();
    }

    _generateApiUrlBase(projectId) {
        return this.TRACKER_BASE_URL + "/services/v5/projects/" + projectId;
    }
}