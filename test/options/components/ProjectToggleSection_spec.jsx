import React from 'react';
import {shallow} from 'enzyme';
import ProjectToggleSection from '../../../src/options/components/ProjectToggleSection.jsx'
import Project from '../../../src/content_scripts/repositories/project.js'
import ProjectRepository from '../../../src/content_scripts/repositories/project_repository';
import * as _ from 'lodash';

describe('ProjectToggleSection', () => {
  let component, defaultProps, projectRepositorySpy, projects;

  beforeEach(() => {
    projects = [
      new Project({name: 'some project I will disable', disabled: false}),
      new Project({name: 'some other enabled project', disabled: true})
    ];

    projectRepositorySpy = new ProjectRepository({trackerApiClient: null, chromeStorageWrapper: null});

    const projectsWithBothDisabled = _.unionBy(
      [new Project({name: 'some project I will disable', disabled: true})], projects, 'name'
    );

    spyOn(projectRepositorySpy, 'findAll').and.returnValues(
      Promise.resolve(projects),
      Promise.resolve(projects),
      Promise.resolve(projectsWithBothDisabled)
    );

    spyOn(projectRepositorySpy, 'update').and.returnValue([]);

    defaultProps = {
      projectRepository: projectRepositorySpy,
    };
  });

  describe('initial state', () => {
    it('fetches all projects', (done) => {
      component = shallow(<ProjectToggleSection {...defaultProps}/>);

      setImmediate(() => {
        expect(component.instance().state).toEqual(jasmine.objectContaining({
          projects: projects
        }))

        done();
      });
    });
  });

  describe('handleProjectToggle', () => {
    beforeEach(() => {
      component = shallow(<ProjectToggleSection {...defaultProps}/>);
    });

    it('updates project from projectRepository by its name', (done) => {
      component.instance().handleProjectToggle('some project I will disable');

      setImmediate(() => {
        expect(projectRepositorySpy.update).toHaveBeenCalledWith(jasmine.objectContaining({
          name: 'some project I will disable',
          disabled: true
        }));

        done();
      });
    });

    it('sets updated project on state', (done) => {
      component.instance().handleProjectToggle('some project I will disable');

      setImmediate(() => {
        expect(component.state()).toEqual(jasmine.objectContaining({
          projects: [
            jasmine.objectContaining({
              name: 'some project I will disable', disabled: true
            }),
            jasmine.any(Object)
          ]
        }));

        done();
      });
    })
  });
});
