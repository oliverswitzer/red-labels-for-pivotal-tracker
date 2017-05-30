import $ from 'jquery'
import ProjectIdProvider from '../../utilities/project_id_provider'
import DomObserver from './dom_observer'

export default (modal) => {
  new DomObserver().onElementMutation(() => {
    $('.finish.button').off('click').on('click', function (e) {
      let storyTitle = extractStoryTitle(e.target)

      if (isTheWWLTWChore(storyTitle)) {
        openGmail(storyTitle)
      } else {
        openWWLTWModal(modal)
      }
    })
  })
};

const STORY_BUTTON_ID_REGEX = /story_state_button_([a-zA-Z0-9]+)_\w+/

function openWWLTWModal(modal) {
  setTimeout(function () {
    chrome.runtime.sendMessage({eventType: 'pop'})

    modal.modal('show', function () {
      modal.find('#learning-body').focus()
    })
  }, 0)
}

function openGmail(storyTitle) {
  const query = new URLSearchParams()
  let params = {
    trackerProjectId: ProjectIdProvider.getProjectId(),
    storyTitle: storyTitle,
    view: 'cm',
    fs: 1,
    tf: 1,
    to: 'wwltw@pivotal.io',
    su: 'loading...',
    body: 'loading...'
  }

  Object.keys(params).forEach(function (paramKey) {
    query.append(paramKey, params[paramKey])
  })

  window.open(`https://mail.google.com/mail/u/0/?${query.toString()}`)
}

function isTheWWLTWChore(storyTitle) {
  return /WWLTW for the week of/.test(storyTitle)
}

function extractStoryTitle(target) {
  if (isOpenedStory(target)) {
    let storyId = /story_state_button_([a-zA-Z0-9]+)_\w+/.exec(target.id)[1]
    return $(`.${storyId}`).find('.story.name textarea').val()
  } else if (isCollapsedStory(target)) {
    let storyNode = target.parentNode.parentNode

    return storyNode.querySelector('.story_name').innerText
  }
}

function isCollapsedStory(target) {
  let storyNode = target.parentNode.parentNode

  return storyNode.querySelector('.story_name') != null
}

function isOpenedStory(target) {
  return STORY_BUTTON_ID_REGEX.test(target.id)
}