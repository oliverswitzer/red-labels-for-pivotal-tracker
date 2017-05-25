// login.page.js
var Page = require('./page')

var TrackerBacklogPage = Object.create(Page, {

  /**
   * define elements
   */

  startFirstStory: {value: function () {
    browser.element('.story .button.start').click()
  }},

  finishFirstStory: {value: function () {
    browser.element('.story .button.finish').click()
  }},

  wwltwChore: {
    get: function () {
      return browser.element('.story_name*=WWLTW for the week of')
    }
  },

  wwltwPromptIsVisible: function () {
    return browser.isVisible('#wwltw-form')
  },

  resetStoryToUnstarted: {value: function () {
    browser.element('.expander').click()
    browser.element('.story .item_finished .arrow').click
    browser.element('.story .dropdown_menu .item_unstarted').click
  }},


  /**
   * define or overwrite page methods
   */
  // open: { value: function() {
  //   Page.open.call(this, 'login');
  // } },
  // submit: { value: function() {
  //   this.form.submitForm();
  // } }
})

module.exports = TrackerBacklogPage