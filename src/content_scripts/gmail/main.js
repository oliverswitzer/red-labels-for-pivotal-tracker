import fetchWrapper from '../utilities/fetch_wrapper'
import PivotalTrackerApiClient from '../utilities/pivotal_tracker_api_client'
import WWLTWRepository from '../repositories/wwltw_repository'
import MarkdownTranslator from './markdown_translator'
import $ from 'jquery'
import SharedConstants from '../shared_constants'

const GMAIL_SELECTORS = {
  body: `:contains(${SharedConstants.GMAIL_BODY_LOADING_TEXT})`,
  subject: `[aria-label="Subject"]`,
  nameOfEmail: ':on'
}

chrome.storage.sync.get('trackerApiToken', function (options) {
  const wwltwRepository = new WWLTWRepository(
    new PivotalTrackerApiClient(options.trackerApiToken, fetchWrapper)
  )
  setProjectNameAndDescription(wwltwRepository)
})

function setProjectNameAndDescription(wwltwRepository) {
  const searchParams = new URL(window.location.href).searchParams
  let projectId = searchParams.get('trackerProjectId')
  let storyTitle = searchParams.get('storyTitle')

  let storyPromise = wwltwRepository.findByTitle(projectId, storyTitle)
  let projectPromise = wwltwRepository.findProject(projectId)
  let pageHasLoadedPromise = waitForPageLoad()

  Promise.all([storyPromise, projectPromise, pageHasLoadedPromise]).then(values => {
    populateEmail(values)
  })
}

function waitForPageLoad() {
  return new Promise((resolve, _reject) => {
    let intervalId = setInterval(() => {
      if ($(`div:contains(${SharedConstants.GMAIL_BODY_LOADING_TEXT})`).length > 0) {
        resolve()
        clearInterval(intervalId)
      }
    }, 750)
  })
}

function populateEmail(values) {
  const projectName = values[1].name
  const description = values[0][0].description

  let subject = `[WWLTW] ${projectName}`

  document.querySelector(GMAIL_SELECTORS.subject).value = subject
  document.getElementById(GMAIL_SELECTORS.nameOfEmail).innerText = subject

  const $body = getElementDirectlyContainingText(SharedConstants.GMAIL_BODY_LOADING_TEXT)
  $body.html(convertToHtml(description))
}

function getElementDirectlyContainingText(text) {
  return $(`:contains(${text})`).filter(function () {
    return (
    $(this).clone()
      .children()
      .remove()
      .end()
      .filter(`:contains(${text})`).length > 0)
  })
}

function convertToHtml(markdownInput) {
  return MarkdownTranslator.translate(markdownInput)
}
