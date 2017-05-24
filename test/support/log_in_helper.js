require('dotenv').config()

exports.logIntoTrackerBacklog = function () {
  browser.setValue("[data-test='tracker-api-token'] input", process.env.TEST_PIVOTAL_TRACKER_TOKEN)
  browser.click('button=Submit')
  browser.pause(1000)
  browser.click('label=Test Project')
  browser.pause(1000)

  browser.url('https://www.pivotaltracker.com/signin')
  browser.setValue("#credentials_username", process.env.TEST_PIVOTAL_TRACKER_USERNAME)
  browser.click("#login_type_check_form input[type='submit']")
  browser.setValue("#credentials_password", process.env.TEST_PIVOTAL_TRACKER_PASSWORD)
  browser.click("#login_type_check_form input[type='submit']")
  browser.click("a=Test Project")
  browser.pause(1000)
}