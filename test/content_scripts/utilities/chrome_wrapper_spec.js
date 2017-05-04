import ChromeWrapper from '../../../src/content_scripts/utilities/chrome_wrapper';

describe('ChromeWrapper', () => {
  let chromeWrapper, chromeSpy, chromeSpyGetCallback;

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


      chromeWrapper = new ChromeWrapper(chromeSpy);
    });

    it('returns the value of the key you asked for', (done) => {
      chromeWrapper.get('someKey').then((valueOfFoo) => {
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

      chromeWrapper = new ChromeWrapper(chromeSpy);
    });

    it('delegates to chrome.storage.sync.set', (done) => {
      chromeWrapper.set({someKey: 'some value'}).then(() => {
        expect(chromeSpy.storage.sync.set).toHaveBeenCalledWith({someKey: 'some value'});

        done();
      })
    })
  });

  describe('getURL', () => {
    beforeEach(() => {
      chromeSpy = {
        extension: {
          getURL: jasmine.createSpy('getURL').and.returnValue('some resolved url path')
        }
      };

      chromeWrapper = new ChromeWrapper(chromeSpy);
    });

    it('delegates to chrome.storage.sync.getURL', () => {
      expect(chromeWrapper.getURL('some/url.html')).toEqual('some resolved url path')
    })
  })
});

