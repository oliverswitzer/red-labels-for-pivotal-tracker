describe('WWLTWRepository', function () {
    let wwltwRepository;
    let fetchWrapper;
    const storyTitle = 'some story title';
    const projectId = 'some-project-id';
    const apiToken = 'some tracker api token';

    beforeEach(function () {
        fetchWrapper = jasmine.createSpy('fetchWrapper').and.returnValue(Promise.resolve({}));

        spyOn(StoryTitleProvider, 'currentStoryTitle').and.returnValue(storyTitle);
        wwltwRepository = new WWLTWRepository(apiToken, fetchWrapper);
    });

    describe('findByTitle', function () {
        beforeEach(function () {
            wwltwRepository.findByTitle(storyTitle, projectId);
        });

        it('calls fetchWrapper with project id in URL', function () {
            const url = new URL(fetchWrapper.calls.mostRecent().args[0]);

            expect(url.origin).toEqual(wwltwRepository.TRACKER_BASE_URL);
            expect(url.pathname).toEqual(`/services/v5/projects/${projectId}/stories`);
        });

        it('calls fetchWrapper with title in params', function () {
            const params = new URL(fetchWrapper.calls.mostRecent().args[0]).searchParams;

            expect(params.get('filter')).toEqual('"some story title"');
        });

        it('calls fetchWRapper with correct token header', function () {
            const headers = fetchWrapper.calls.mostRecent().args[1].headers;

            expect(headers.get('X-TrackerToken')).toEqual(apiToken);
        });
    });

    describe('add', function () {
        context('when findByTitle returns story with WWLTW items in it already', function () {
            const storyId = 1234;
            beforeEach(function () {
                spyOn(wwltwRepository, 'findByTitle').and.returnValue(Promise.resolve([{
                    id: storyId,
                    description: 'stuff other people learned'
                }]));
            });

            it('formats correct URL to update WWLTW story  ', function (done) {
                wwltwRepository.add(projectId, 'i learned some stuff', 'tags, tags, tags').then(function () {
                    let url = new URL(fetchWrapper.calls.mostRecent().args[0]);

                    expect(wwltwRepository.findByTitle).toHaveBeenCalledWith(storyTitle, projectId);
                    expect(url.origin).toEqual(wwltwRepository.TRACKER_BASE_URL);
                    expect(url.pathname).toEqual(`/services/v5/projects/${projectId}/stories/${storyId}`);
                    done();
                });
            });

            it('adds the updated story description to the body', function () {
                wwltwRepository.add(projectId, 'i learned some stuff', 'tags, tags, tags').then(function () {
                    const body = JSON.parse(fetchWrapper.calls.mostRecent().args[1].body);

                    expect(body.description).toContain('stuff other people learned');
                    expect(body.description).toContain('i learned some stuff');
                    expect(body.description).toContain('_Tags: tags, tags, tags_');
                });
            });
        });
    });
});