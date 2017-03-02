import ProjectIdProvider from '../utilities/project_id_provider'
import StoryTitleProvider from '../utilities/story_title_provider'
import AnalyticsWrapper from "../utilities/analytics_wrapper";

export default class AddLearningToStoryDescription {
    constructor(wwltwRepository) {
        this.wwltwRepository = wwltwRepository;

        this.execute = this.execute.bind(this);
    }

    execute(learningTags, learningBody) {
        AnalyticsWrapper.sendEvent('submit');
        const projectId = ProjectIdProvider.getProjectId();

        return this.wwltwRepository.findByTitle(projectId, StoryTitleProvider.currentStoryTitle())
            .then(function (responseJson) {
                return responseJson[0];
            })
            .then((story) => {
                return this.wwltwRepository.update(
                    projectId,
                    story,
                    learningTags,
                    learningBody
                );
            });
    }
}