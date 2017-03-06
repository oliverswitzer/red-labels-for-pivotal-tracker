import DescriptionBuilder from '../../../src/content_scripts/utilities/description_builder'

describe('DescriptionBuilder', function () {
    const tags = 'tag, tag, tag';
    const body = 'I learned some stuff';

    describe('when there is a description provided', function () {
        it('returns a new properly formatted description', function () {
            const originalDescription = 'someone else learned some stuff';
            const newDescription = DescriptionBuilder.build(tags, body, originalDescription);

            expect(newDescription).toEqual("someone else learned some stuff\n\nI learned some stuff\n\n_tag, tag, tag_");
        });
    });

    describe('when no description is provided', function () {
        it('returns a new properly formatted description', function () {
            const newDescription = DescriptionBuilder.build(tags, body);

            expect(newDescription).toEqual("I learned some stuff\n\n_tag, tag, tag_");
        });
    });

    describe('when no tags are provided', function () {
        it('excludes tags', function () {
            const newDescription = DescriptionBuilder.build('', body);

            expect(newDescription).toEqual("I learned some stuff");
        })
    })
});