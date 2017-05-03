import TrackerTokenForm from '../../../src/options/components/TrackerTokenForm.jsx';
import * as React from 'react';
import {mount} from 'enzyme';

describe('TrackerTokenForm', () => {
  let handleTokenSubmitSpy, defaultProps, component;

  beforeEach(() => {
    handleTokenSubmitSpy = jasmine.createSpy('handleTokenSubmit');

    defaultProps = {
      handleTokenSubmit: handleTokenSubmitSpy
    }
  });

  describe('submitting the form', () => {
    it('calls the handleTokenSubmit callback', () => {
      component = mount(<TrackerTokenForm {...defaultProps}/>);

      component.find('input').simulate('change', { target: { value: 'some tracker token' }});

      component.find('Form').simulate('submit', { preventDefault() {} } );

      expect(handleTokenSubmitSpy).toHaveBeenCalledWith('some tracker token')
    });

    it('shows a success message', () => {
      component = mount(<TrackerTokenForm {...defaultProps}/>);

      component.find('input').simulate('change', { target: { value: 'some tracker token' }});
      component.find('Form').simulate('submit', { preventDefault() {} } );

      expect(component.text()).toContain('Saved token successfully');
    });
  })
});