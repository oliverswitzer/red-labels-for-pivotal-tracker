const TrackerBacklogPage = require('./page_objects/tracker_backlog.page')

describe('user finishes a story', () => {
  it('prompts the user for a WWLTW entry and appends it to the WWLTW chore', () => {
    browser.loginToTrackerBacklog()

    TrackerBacklogPage.startFirstStory()
    TrackerBacklogPage.finishFirstStory()

    expect(TrackerBacklogPage.wwltwPromptIsVisible()).toBeTruthy()

    const randomIdForTest = Math.trunc(Math.random()*1000)

    TrackerBacklogPage.fillWWLTWTextFieldWith(`This is a learning: ${randomIdForTest}`)
    TrackerBacklogPage.submitWWLTWForm()

    expect(TrackerBacklogPage.wwltwChoreDescription()).toContain(`This is a learning: ${randomIdForTest}`)
  })

  afterEach(() => {
    TrackerBacklogPage.resetFirstStoryToUnstarted()
  })
})