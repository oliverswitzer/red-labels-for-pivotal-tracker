import ChromeWrapper from '../../../../src/content_scripts/utilities/chrome_wrapper';
import ProjectRepository from '../../../../src/content_scripts/repositories/project_repository';
import notifyNewUserOfToggleFeature from '../../../../src/content_scripts/pivotal_tracker/use_cases/notify_new_user_of_toggle_feature';
import Project from "../../../../src/content_scripts/repositories/project";

describe('notifyNewUserOfToggleFeature', () => {
  let chromeWrapperSpy, projectRepositorySpy, toggleFeatureNotifierSpy;

  beforeEach(() => {
    chromeWrapperSpy = new ChromeWrapper();

    spyOn(chromeWrapperSpy, 'set').and.returnValue(Promise.resolve());
  });
  context('user has not been notified of the toggle feature before', () => {
    beforeEach(() => {
      toggleFeatureNotifierSpy = {
        notify: jasmine.createSpy('notify')
      };

      spyOn(chromeWrapperSpy, 'get').and.returnValue(Promise.resolve(undefined));
    });
    context('user has no enabled projects', () => {
      beforeEach(() => {
        projectRepositorySpy = new ProjectRepository({trackerApiClient: '', chromeWrapper: ''});

        spyOn(projectRepositorySpy, 'findAll').and.returnValue(Promise.resolve([
          new Project({id: 1, name: 'some proj', disabled: true}),
          new Project({id: 2, name: 'some other proj', disabled: true})
        ]));
      });

      it('displays a nag notification for that user', (done) => {
        notifyNewUserOfToggleFeature({
          projectRepository: projectRepositorySpy,
          chromeWrapper: chromeWrapperSpy,
          toggleFeatureNotifier: toggleFeatureNotifierSpy
        });

        setImmediate(() => {
          expect(toggleFeatureNotifierSpy.notify).toHaveBeenCalled();
          done();
        });
      });

      it('sets "userNotifiedOfToggleFeature: true" in chromeWrapper', (done) => {
        notifyNewUserOfToggleFeature({
          projectRepository: projectRepositorySpy,
          chromeWrapper: chromeWrapperSpy,
          toggleFeatureNotifier: toggleFeatureNotifierSpy
        });

        setImmediate(() => {
          expect(chromeWrapperSpy.set).toHaveBeenCalledWith({userNotifiedOfToggleFeature: true});

          done();
        });
      })
    });

    context('user has enabled at least one project already', () => {
      beforeEach(() => {
        projectRepositorySpy = new ProjectRepository({trackerApiClient: '', chromeWrapper: ''});

        spyOn(projectRepositorySpy, 'findAll').and.returnValue(Promise.resolve([
          new Project({id: 1, name: 'some proj', disabled: false}),
          new Project({id: 2, name: 'some other proj', disabled: true}),
          new Project({id: 3, name: 'some other proj', disabled: true})
        ]));
      });
      it('does not display a nag notification for that user', (done) => {
        notifyNewUserOfToggleFeature({
          projectRepository: projectRepositorySpy,
          chromeWrapper: chromeWrapperSpy,
          toggleFeatureNotifier: toggleFeatureNotifierSpy
        });

        setImmediate(() => {
          expect(toggleFeatureNotifierSpy.notify).not.toHaveBeenCalled();
          done();
        });
      })
    })
  });

  context('user has already been notified of the toggle feature', ()=>{
    let chromeWrapperSpy;

    beforeEach(() => {
      chromeWrapperSpy = new ChromeWrapper();

      spyOn(chromeWrapperSpy, 'get').and.returnValue(Promise.resolve(undefined));

    });

    context('user has enabled at least one project already', () => {
      beforeEach(() => {
        projectRepositorySpy = new ProjectRepository({trackerApiClient: '', chromeWrapper: ''});

        spyOn(projectRepositorySpy, 'findAll').and.returnValue(Promise.resolve([
          new Project({id: 1, name: 'some proj', disabled: false}),
          new Project({id: 2, name: 'some other proj', disabled: true})
        ]));
      });

      it('does not display a nag notification for that user', (done) => {
        notifyNewUserOfToggleFeature({
          projectRepository: projectRepositorySpy,
          chromeWrapper: chromeWrapperSpy,
          toggleFeatureNotifier: toggleFeatureNotifierSpy
        });

        setImmediate(() => {
          expect(toggleFeatureNotifierSpy.notify).not.toHaveBeenCalled();
          done();
        });
      })
    });
  });
});