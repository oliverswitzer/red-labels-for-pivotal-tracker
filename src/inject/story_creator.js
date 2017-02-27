const BASE_URL = 'https://www.pivotaltracker.com/services/v5/projects';

class StoryCreator {
    constructor(fetchWrapper) {
        this.fetchWrapper = fetchWrapper;
    }

    addStory(title, projectId) {
        return this.fetchWrapper(
            `${BASE_URL}/${projectId}/stories`,
            {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    current_state: 'unscheduled',
                    title: title
                })
            }
        );
    }
}