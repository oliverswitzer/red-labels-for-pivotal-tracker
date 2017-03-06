export default {
    build: function (learningTags, learningBody, description) {

        let contentItems = [
            this.buildDescription(description),
            learningBody,
            this.buildTags(learningTags)
        ];

        return contentItems.filter(function (item) {
            return item != '';
        }).join('\n\n');
    },
    buildDescription: function (description) {
        return description || '';
    },
    buildTags: function (learningTags) {
        return learningTags ? `_${learningTags}_` : '';
    }
};