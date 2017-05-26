// login.page.js
var Page = require('./page')

var TrackerBacklogPage = Object.create(Page, {

  /**
   * define elements
   */

  startFirstStory: {
    value: function () {
      browser.element('.story.feature .button.start').click()
      browser.waitUntil('.story.feature. .button.finish')
    }
  },

  wwltwChore: {
    get: function () {
      return browser.element('.story_name*=WWLTW for the week of')
    }
  },


  /**
   * define methods
   */

  finishFirstStory: {
    value: function () {
      browser.element('.story.feature .button.finish').click()
      browser.pause(500)
    }
  },

  wwltwPromptIsVisible: {
    value: function () {
      return browser.isVisible('#wwltw-form')
    }
  },

  fillWWLTWTextFieldWith: {
    value: function (text) {
      browser.pause(500)
      return browser.element('#wwltw-form textarea').setValue(text)
    }
  },

  submitWWLTWForm: {
    value: function () {
      browser.element('#wwltw-form input[type="submit"]').click()
      browser.pause(500)
    }
  },

  resetFirstStoryToUnstarted: {
    value: function () {
      browser.pause(500)
      browser.element('.story .expander').click()
      browser.pause(500)
      browser.element('.story .state.row .arrow').click()
      browser.pause(500)
      browser.element('.story .state.row .dropdown_menu .item_unstarted').click()
    }
  },

  wwltwChoreDescription: {
    value: function () {
      browser.pause(500)
      browser.element('.chore*=WWLTW for the week of').click('.expander')

      browser.pause(3000)
      return browser.element('.story.chore .description').getText()
    }
  }
})

module.exports = TrackerBacklogPage