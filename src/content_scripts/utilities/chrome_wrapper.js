export default class ChromeWrapper {
  constructor(chrome) {
    this._chrome = chrome;
  }

  getURL(url) {
    return this._chrome.extension.getURL(url);
  }

  get(chromeStorageKey) {
    return new Promise(resolve => {
      this._chrome.storage.sync.get(chromeStorageKey, (storeObject) =>
        resolve(storeObject[chromeStorageKey])
      )
    });
  }

  set(keyValuePair) {
    return new Promise((resolve) => {
      this._chrome.storage.sync.set(keyValuePair);
      resolve();
    })
  }
}