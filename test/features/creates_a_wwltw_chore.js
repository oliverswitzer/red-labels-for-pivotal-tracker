const TrackerBacklogPage = require('./page_objects/tracker_backlog.page')

describe('chrome extension is loaded properly when feature tests run', function () {
  it('creates a WWLTW chore in the backlog', function () {
    browser.loginToTrackerBacklog()

    expect(TrackerBacklogPage.wwltwChore.getText()).toMatch(/WWLTW for the week of \d{1,2}\/\d{1,2}/)
  })
})