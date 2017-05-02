import ChromeStorageWrapper from '../../../src/content_scripts/utilities/chrome_storage_wrapper';

describe('ChromeStorageWrapper', () => {
  let chromeStorageWrapper, chromeSpy, chromeSpyGetCallback;

  describe('get', () => {
    beforeEach(() => {
      chromeSpy = {
        storage: {
          sync: {
            get: jasmine.createSpy('get').and.callFake((value, callback) => {
              chromeSpyGetCallback = callback;
            })
          }
        }
      };


      chromeStorageWrapper = new ChromeStorageWrapper(chromeSpy);
    });

    it('returns the value of the key you asked for', (done) => {
      chromeStorageWrapper.get('someKey').then((valueOfFoo) => {
        expect(valueOfFoo).toEqual('someValue');
        done();
      });

      chromeSpyGetCallback({someKey: 'someValue'});
    });
  });

  describe('set', () => {
    beforeEach(() => {
      chromeSpy = {
        storage: {
          sync: {
            set: jasmine.createSpy('post')
          }
        }
      };

      chromeStorageWrapper = new ChromeStorageWrapper(chromeSpy);
    });

    it('delegates to chrome.storage.sync.set', (done) => {
      chromeStorageWrapper.set({someKey: 'some value'}).then(() => {
        expect(chromeSpy.storage.sync.set).toHaveBeenCalledWith({someKey: 'some value'});

        done();
      })
    })
  })
});

