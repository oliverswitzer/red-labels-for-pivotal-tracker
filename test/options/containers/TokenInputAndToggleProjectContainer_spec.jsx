import {shallow} from 'enzyme';
import TokenInputAndToggleProjectContainer from '../../../src/options/containers/TokenInputAndToggleProjectContainer.jsx';
import React from 'react';
import ChromeStorageWrapper from '../../../src/content_scripts/utilities/chrome_storage_wrapper';

describe('TokenInputAndToggleProjectContainer', () => {
  let component;
  let defaultProps;
  let chromeStorageWrapper;

  beforeEach(() => {
    chromeStorageWrapper = new ChromeStorageWrapper();

    spyOn(chromeStorageWrapper, 'set').and.returnValue(Promise.resolve());
    spyOn(chromeStorageWrapper, 'get').and.returnValue(Promise.resolve('some token stored in chrome'));

    defaultProps = {
      chromeStorageWrapper: chromeStorageWrapper
    }
  });

  describe('on initial render', () => {
    it('tries to get the tracker token from chrome', () => {
      component = shallow(<TokenInputAndToggleProjectContainer {...defaultProps} />);

      expect(chromeStorageWrapper.get).toHaveBeenCalledWith('trackerApiToken');
    });

    it('renders TrackerTokenForm with tracker token from chrome', (done) => {
      component = shallow(<TokenInputAndToggleProjectContainer {...defaultProps} />);

      setImmediate(() => {
        const trackerTokenForm = component.find('TrackerTokenForm');
        expect(trackerTokenForm.prop('trackerApiToken')).toEqual('some token stored in chrome');

        done();
      });
    });
  });

  describe('handleTokenSubmit', () => {
    it('saves the token from TrackerTokenForm into chrome', (done) => {
      component = shallow(<TokenInputAndToggleProjectContainer {...defaultProps} />);

      component.instance().handleTokenSubmit('some token');

      setImmediate(() => {
        expect(chromeStorageWrapper.set).toHaveBeenCalledWith(jasmine.objectContaining({
          trackerApiToken: 'some token'
        }));

        done();
      })
    });

    it('shows the ProjectToggleSection', (done) => {
      component = shallow(<TokenInputAndToggleProjectContainer {...defaultProps} />);

      expect(component.find('ProjectToggleSection').length).toEqual(0);

      component.instance().handleTokenSubmit('some token');

      setImmediate(() => {
        expect(component.find('ProjectToggleSection').length).toEqual(1);

        done();
      });
    })
  })
});