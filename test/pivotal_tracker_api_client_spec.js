describe('PivotalTrackerApiClient', function () {
    let apiClient;
    let fetchWrapper;
    const projectId = 'some-project-id';
    const trackerToken = 'some-token';

    beforeEach(function () {
        fetchWrapper = jasmine.createSpy('fetchWrapper').and.returnValue(Promise.resolve({
            json: function () {}
        }));
        apiClient = new PivotalTrackerApiClient(trackerToken, fetchWrapper);
    });

    afterEach(verifyItAddsCorrectHeaders);

    describe('getStory', function () {
        beforeEach(function () {
            apiClient.getStory(projectId, { someParamKey: 'someParamValue'});
        });

        it('calls api with expected query params', function () {
            const url = new URL(fetchWrapper.calls.mostRecent().args[0]);

            expect(url.origin).toEqual(apiClient.TRACKER_BASE_URL);
            expect(url.pathname).toEqual(`/services/v5/projects/${projectId}/stories`);
            expect(url.search).toEqual('?someParamKey=%22someParamValue%22&limit=1');
        });
    });

    describe('createStory', function () {
        const params = {
            someParam: 'someValue'
        };

        beforeEach(function () {
            apiClient.createStory(projectId, params);
        });

        it('POSTs to expected endpoint', function () {
            const url = new URL(fetchWrapper.calls.mostRecent().args[0]);
            const fetchConfig = fetchWrapper.calls.mostRecent().args[1];

            expect(fetchConfig).toEqual(jasmine.objectContaining({ method: 'POST' }));
            expect(url.origin).toEqual(apiClient.TRACKER_BASE_URL);
            expect(url.pathname).toEqual(`/services/v5/projects/${projectId}/stories`);
        });

        it('posts expected data', function () {
            const postData = JSON.parse(fetchWrapper.calls.mostRecent().args[1].body);

            expect(postData).toEqual({someParam: 'someValue'});
        });

    });

    describe('updateStory', function () {
        const storyId = 'some-story-id';

        beforeEach(function () {
            apiClient.updateStory(projectId, storyId, 'some description');
        });

        it('PUTs to expected endpoint', function () {
            const url = new URL(fetchWrapper.calls.mostRecent().args[0]);
            const fetchConfig = fetchWrapper.calls.mostRecent().args[1];

            expect(fetchConfig).toEqual(jasmine.objectContaining({ method: 'PUT' }));
            expect(url.origin).toEqual(apiClient.TRACKER_BASE_URL);
            expect(url.pathname).toEqual(`/services/v5/projects/${projectId}/stories/${storyId}`);
        });

        it('puts expected data', function () {
            const updateData = JSON.parse(fetchWrapper.calls.mostRecent().args[1].body);

            expect(updateData).toEqual(jasmine.objectContaining({
                description: 'some description',
            }));
        });
    });

    function verifyItAddsCorrectHeaders() {
        const headers = fetchWrapper.calls.mostRecent().args[1].headers;
        expect(headers.get('Content-Type')).toEqual('application/json');
        expect(headers.get('X-TrackerToken')).toEqual(trackerToken);
    }
});