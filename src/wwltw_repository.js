class WWLTWRepository {
    constructor(trackerApiToken) {
        this.trackerApiToken = trackerApiToken;
        this.TRACKER_BASE_URL = "https://www.pivotaltracker.com";
    }

    add(projectId, submission) {
        // WWLTWRepository.add(valeOfPrompt)
        // --> find existing story by a hardcoded name
        // --> format valueOfPrompt (?) to be list form
        // --> update description

        fetch(this.TRACKER_BASE_URL + "/services/v5/projects/" + projectId + "/stories", {
            method: 'POST',
            headers: new Headers({
                "X-TrackerToken": this.trackerApiToken,
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({
                "current_state": "unscheduled",
                "name": submission,
                "story_type": "chore"
            })
        });
    }
}