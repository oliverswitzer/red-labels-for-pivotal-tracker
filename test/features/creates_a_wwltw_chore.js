describe('chrome extension is loaded properly when feature tests run', function () {
  it('creates a WWLTW chore in the backlog', function () {
    browser.pause(10000)
    browser.loginToTrackerBacklog()

    expect(browser.getText(".story_name*=WWLTW for the week of")).toMatch(/WWLTW for the week of \d{1,2}\/\d{1,2}/)
  })
})