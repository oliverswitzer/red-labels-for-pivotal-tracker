class PivotalTrackerApiClient {
    constructor(trackerApiToken, fetchWrapper) {
        this.trackerApiToken = trackerApiToken;
        this.TRACKER_BASE_URL = "https://www.pivotaltracker.com";
        this.fetchWrapper = fetchWrapper;
    }

    getStory(projectId, params) {
        const query = new URLSearchParams();
        Object.keys(params).forEach(function (paramKey) {
            query.append(paramKey, `"${params[paramKey]}"`);
        });
        query.append('limit', 1);

        return this.fetchWrapper(
            this._generateApiUrlBase(projectId) + "/stories?" + query.toString(),
            {
                method: 'GET',
                headers: this._headers()
            })
            .then(response => response.json());
    }

    createStory(projectId, params) {
        return this.fetchWrapper(
            `${this._generateApiUrlBase(projectId)}/stories`,
            {
                method: 'POST',
                headers: this._headers(),
                body: JSON.stringify(params)
            })
            .then(response => response.json());
    }

    updateStory(projectId, storyId, description) {
        return this.fetchWrapper(
            this._generateApiUrlBase(projectId) + "/stories/" + storyId, {
                method: 'PUT',
                headers: this._headers(),
                body: JSON.stringify({description})
            })
            .then(response => response.json());

    }

    _headers() {
        return new Headers({
            'Content-Type': 'application/json',
            'X-TrackerToken': this.trackerApiToken
        });
    }

    _generateApiUrlBase(projectId) {
        return this.TRACKER_BASE_URL + "/services/v5/projects/" + projectId;
    }
}