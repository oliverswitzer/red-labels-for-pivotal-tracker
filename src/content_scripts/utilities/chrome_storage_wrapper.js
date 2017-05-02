export default class ChromeStorageWrapper {
  constructor(chrome) {
    this._chrome = chrome;
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