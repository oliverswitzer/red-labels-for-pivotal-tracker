const BASE_URL = 'https://www.pivotaltracker.com/services/v5/projects';

class StoryCreator {
    constructor(fetchWrapper, trackerApiToken) {
        this.fetchWrapper = fetchWrapper;
        this.trackerApiToken = trackerApiToken;
    }

    addStory(name, projectId) {
        return this.fetchWrapper(
            `${BASE_URL}/${projectId}/stories`,
            {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'X-TrackerToken': this.trackerApiToken
                }),
                body: JSON.stringify({
                    story_type: 'chore',
                    name: name
                })
            }
        );
    }
}