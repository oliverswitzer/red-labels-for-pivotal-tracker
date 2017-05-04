import $ from 'jquery';

export default ({projectRepository, chromeStorageWrapper}) => {
  chromeStorageWrapper.get('userNotifiedOfToggleFeature').then(wasNotified => {
    projectRepository.findAll()
      .then((projects) => {
        return projects.every((project) => project.disabled === true);
      })
      .then(allProjectsDisabled => {
        if (!wasNotified && allProjectsDisabled) {
          addNotificationToPage(chromeStorageWrapper);
        }
      });
  });
}

const prependElementAsChildOf = function (parent, html) {
  let elementContainer = document.createElement('div');
  elementContainer.innerHTML = html;

  $(parent).prepend(elementContainer);
};
const addNotificationToPage = function (chromeStorageWrapper) {
  chromeStorageWrapper.set({userNotifiedOfToggleFeature: true}).then(() => {
    const optionsUrl = chrome.extension.getURL('src/options/index.html#toggle-projects-section');

    prependElementAsChildOf('#tracker', `
      <div class="ui message">
        <i class="close icon"></i>
        <div class="header">
           WWLTW Extension Update
        </div>
        <p>You can enable and disable the WWLTW chrome extension for individual backlogs from 
          the <a href="${optionsUrl}" target="_blank">bottom of the options page.</a></p>
      </div>
    `);

    $('.message .close')
      .on('click', function () {
        $(this)
          .closest('.message')
          .transition('fade')
        ;
      });
  });
};
