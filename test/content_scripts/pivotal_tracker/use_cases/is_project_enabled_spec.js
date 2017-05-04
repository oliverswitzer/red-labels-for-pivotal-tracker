import ProjectRepository from '../../../../src/content_scripts/repositories/project_repository';
import Project from '../../../../src/content_scripts/repositories/project';
import isProjectEnabled from '../../../../src/content_scripts/pivotal_tracker/use_cases/is_project_enabled'
import ProjectIdProviderSpy from '../../../../src/content_scripts/utilities/project_id_provider'

describe('isProjectEnabled', () => {
  let projectRepositorySpy, foundProject;

  beforeEach(() => {
    projectRepositorySpy = new ProjectRepository({trackerApiClient: '', chromeWrapper: ''});

    foundProject = new Project({name: 'some project', disabled: true});

    spyOn(ProjectIdProviderSpy, 'getProjectId').and.returnValue(123);
    spyOn(projectRepositorySpy, 'findById').and.returnValue(Promise.resolve(foundProject));
  });

  context('if current project returned from projectRepository has "disabled: false"', () => {
    beforeEach(() => {
      foundProject.disabled = false;
    });

    it('resolves the promise', (done) => {
      isProjectEnabled(projectRepositorySpy, ProjectIdProviderSpy).then(() => {
        done();
      }).catch(() => {
        fail('promise should be resolved.');
        done();
      });
    });
  });

  context('if current project returned from projectRepository has "disabled: true"', () => {
    beforeEach(() => {
      foundProject.disabled = true;
    });

    it('rejects the promise', (done) => {
      isProjectEnabled(projectRepositorySpy, ProjectIdProviderSpy)
        .then(() => {
          fail('promise should be rejected');
          done()
        })
        .catch(() => {
          done();
        });
    });
  });

  context('if there is no project returned from projectRepository', () => {
    let projectRepositorySpyThatReturnsUndefined;

    beforeEach(() => {
      projectRepositorySpyThatReturnsUndefined = new ProjectRepository({trackerApiClient: '', chromeWrapper: ''});
      spyOn(projectRepositorySpyThatReturnsUndefined, 'findById').and.returnValue(Promise.resolve(undefined));
    });

    it('rejects the promise', (done) => {
      isProjectEnabled(projectRepositorySpyThatReturnsUndefined, ProjectIdProviderSpy)
        .then(() => {
          fail('promise should be rejected');
          done()
        })
        .catch(() => {
          done();
        });
    });
  });
});