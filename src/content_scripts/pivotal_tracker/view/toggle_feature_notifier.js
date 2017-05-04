import $ from 'jquery';

export default class ToggleFeatureNotifier {
  constructor({chromeWrapper}) {
    this._chromeWrapper = chromeWrapper;

    this.notify = this.notify.bind(this);
  }
  notify() {
    const optionsUrl = this._chromeWrapper.getURL('src/options/index.html');

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

    $('.message .close').on('click', function () {
      $(this)
        .closest('.message')
        .transition('fade')
      ;
    });
  }
}


const prependElementAsChildOf = function (parent, html) {
  let elementContainer = document.createElement('div');
  elementContainer.innerHTML = html;

  $(parent).prepend(elementContainer);
};