const TrackerBacklogPage = require('./page_objects/tracker_backlog.page')

describe('user finishes a story', () => {
  it('prompts the user for a WWLTW entry and appends it to the WWLTW chore', () => {
    browser.loginToTrackerBacklog()

    TrackerBacklogPage.startFirstStory()
    TrackerBacklogPage.finishFirstStory()

    expect(TrackerBacklogPage.wwltwPromptIsVisible()).toBeTruthy()
    TrackerBacklogPage.resetStoryToUnstarted()
    browser.pause(3000)
  })

  afterEach(() => {

  })
})