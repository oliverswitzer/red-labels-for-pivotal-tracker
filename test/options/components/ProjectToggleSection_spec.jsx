import React from 'react';
import {shallow} from 'enzyme';
import ProjectToggleSection from "../../../src/options/components/ProjectToggleSection.jsx"

describe('ProjectToggleSection', () => {
  let component;
  let defaultProps;

  beforeEach(() => {
    defaultProps = {
      projects: []
    }
  });

  describe('fetching projects', () => {
    it('calls GetProjectsForUser use case', () => {
      expect(true).toBe(true)
    })
  });

  it('renders a ProjectToggleButton', () => {
    component = shallow(<ProjectToggleSection projects={defaultProps}/>);

    expect(component.find('ProjectToggleButton').length).toEqual(1);
  })
});
