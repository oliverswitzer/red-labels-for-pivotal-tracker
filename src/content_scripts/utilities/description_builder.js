const DescriptionBuilder = {
    build(learningTags, learningBody, description) {
        return `${(description || '')}\n
                ${learningBody}
                _Tags: ${learningTags}_\n\n
                ---`;
    }
};