describe('DescriptionBuilder', function () {
    const tags = 'tag, tag, tag';
    const body = 'I learned some stuff';

    describe('when there is a description provided', function () {
        it('returns a new properly formatted description', function () {
            const originalDescription = 'someone else learned some stuff';
            const newDescription = DescriptionBuilder.build(tags, body, originalDescription);

            expect(newDescription).toEqual(`someone else learned some stuff\n
                I learned some stuff
                _Tags: tag, tag, tag_\n\n
                ---`);
        });
    });

    describe('when no description is provided', function () {
        it('returns a new properly formatted description', function () {
            const newDescription = DescriptionBuilder.build(tags, body);

            expect(newDescription).toEqual(`\n
                I learned some stuff
                _Tags: tag, tag, tag_\n\n
                ---`);
        });
    });
});