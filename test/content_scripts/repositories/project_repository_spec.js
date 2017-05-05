import ProjectRepository from '../../../src/content_scripts/repositories/project_repository.js';
import Project from '../../../src/content_scripts/repositories/project';
import ChromeWrapper from '../../../src/content_scripts/utilities/chrome_wrapper'

describe('ProjectRepository', () => {
  let projectRepository, trackerApiClientSpy, chromeWrapperSpy;

  beforeEach(() => {
    let remoteProjectsFromTracker = [
      {
        'id': 98,
        'kind': 'project',
        'name': 'Learn About the Force'
      },
      {
        'id': 99,
        'kind': 'project',
        'name': 'Learn About Another Force'
      },
    ];

    trackerApiClientSpy = {
      getAllProjects: jasmine.createSpy('getAllProjects').and.returnValue(Promise.resolve(remoteProjectsFromTracker)),
      update: jasmine.createSpy('update')
    };

    chromeWrapperSpy = new ChromeWrapper();

    spyOn(chromeWrapperSpy, 'get').and.returnValue(Promise.resolve([]));
    spyOn(chromeWrapperSpy, 'set').and.returnValue(Promise.resolve())
  });

  describe('findById', () => {
    context('a project with queried ID has been previously saved to chrome', () => {
      beforeEach(() => {
        let localProjects = [
          new Project({id: 98, name: 'Learn About the Force', disabled: false}),
          new Project({id: 99, name: 'Learn About Another Force', disabled: true}),
        ];

        chromeWrapperSpy = new ChromeWrapper();
        spyOn(chromeWrapperSpy, 'get').and.returnValue(Promise.resolve(localProjects));
        spyOn(chromeWrapperSpy, 'set').and.returnValue(Promise.resolve());

        projectRepository = new ProjectRepository({
          trackerApiClient: trackerApiClientSpy,
          chromeWrapper: chromeWrapperSpy
        })
      });

      it('returns the first project that has the name that was passed in', (done) => {
        projectRepository.findById(98).then((returnedProject) => {
          expect(returnedProject).toEqual(jasmine.objectContaining({
            id: 98,
            name: 'Learn About the Force',
            disabled: false
          }));

          done();
        });
      });
    });
  });

  describe('findAll', () => {
    context('when projects have not previously been stored in chrome', () => {
      beforeEach(() => {
        projectRepository = new ProjectRepository({
          trackerApiClient: trackerApiClientSpy,
          chromeWrapper: chromeWrapperSpy
        });
      });

      it('fetches all projects from tracker', (done) => {
        projectRepository.findAll().then((returnedProjects) => {
          expect(returnedProjects[0]).toEqual(jasmine.objectContaining({
            id: 98,
            name: 'Learn About the Force'
          }));

          expect(returnedProjects[1]).toEqual(jasmine.objectContaining({
            id: 99,
            name: 'Learn About Another Force'
          }));

          done();
        });
      });

      it('new projects are disabled by default', (done) => {
        projectRepository.findAll().then((returnedProjects) => {
          expect(returnedProjects[0]).toEqual(jasmine.objectContaining({
            disabled: true
          }));

          expect(returnedProjects[1]).toEqual(jasmine.objectContaining({
            disabled: true
          }));

          done();
        });
      });

      it('updates chrome store with new projects', (done) => {
        projectRepository.findAll().then((foundProjects) => {
          expect(chromeWrapperSpy.set).toHaveBeenCalledWith({projects: foundProjects});

          done();
        });
      });
    });

    context('when a project has been previously saved to chrome as enabled', () => {
      beforeEach(() => {
        const localProjects = [new Project({id: 98, name: 'Learn About the Force', disabled: false})];

        chromeWrapperSpy = new ChromeWrapper();
        spyOn(chromeWrapperSpy, 'get').and.returnValue(Promise.resolve(localProjects));
        spyOn(chromeWrapperSpy, 'set').and.returnValue(Promise.resolve());

        projectRepository = new ProjectRepository({
          trackerApiClient: trackerApiClientSpy,
          chromeWrapper: chromeWrapperSpy
        })
      });

      it('returns projects from tracker with updated attributes from chrome storage', (done) => {
        projectRepository.findAll().then((returnedProjects) => {
          expect(returnedProjects[0]).toEqual(jasmine.objectContaining({
            id: 98,
            name: 'Learn About the Force',
            disabled: false
          }));

          done();
        });
      });

      it('still returns the other project not previously stored in chrome', () => {
        projectRepository.findAll().then((returnedProjects) => {
          expect(returnedProjects[1]).toEqual(jasmine.objectContaining({
            id: 99,
            name: 'Learn About Another Force',
            disabled: true
          }));

          done();
        });
      })
    });

    context('when a tracker project changes names', () => {
      beforeEach(() => {
        const localProjects = [new Project({id: 98, name: 'some stale name stored in chrome', disabled: false})];

        chromeWrapperSpy = new ChromeWrapper();
        spyOn(chromeWrapperSpy, 'get').and.returnValue(Promise.resolve(localProjects));
        spyOn(chromeWrapperSpy, 'set').and.returnValue(Promise.resolve());

        projectRepository = new ProjectRepository({
          trackerApiClient: trackerApiClientSpy,
          chromeWrapper: chromeWrapperSpy
        })
      });

      it('reflects the updated name from tracker when remote projects are merged', () => {
        projectRepository.findAll().then((returnedProjects) => {
          expect(returnedProjects[0]).toEqual(jasmine.objectContaining({
            id: 98,
            name: 'Learn About the Force',
            disabled: false
          }));

          done();
        });
      });
    });
  });

  describe('update', () => {
    let localProjects;

    beforeEach(() => {
      localProjects = [
        new Project({id: 1, name: 'some project I will update', disabled: false}),
        new Project({id: 2, name: 'some other project', disabled: false}),
        new Project({id: 3, name: 'some other other project', disabled: true})
      ];

      chromeWrapperSpy = new ChromeWrapper();
      spyOn(chromeWrapperSpy, 'get').and.returnValue(Promise.resolve(localProjects));
      spyOn(chromeWrapperSpy, 'set').and.returnValue(Promise.resolve([]));

      projectRepository = new ProjectRepository({
        trackerApiClient: trackerApiClientSpy,
        chromeWrapper: chromeWrapperSpy
      })
    });


    it('persists the updated attributes to chrome', (done) => {
      const projectToUpdate = new Project({id: 1, name: 'some project I will update', disabled: true});

      projectRepository.update(projectToUpdate).then(() => {
        expect(chromeWrapperSpy.set).toHaveBeenCalledWith(
          {
            projects: [
              jasmine.objectContaining({id: 1, name: 'some project I will update', disabled: true}),
              jasmine.any(Object),
              jasmine.any(Object)
            ]
          }
        );

        done();
      });
    });

    context('with project that has no id set', () => {
      it('rejects the promise with error message', (done) => {
        const projectToUpdate = new Project({name: 'some project I will update', disabled: true});

        projectRepository.update(projectToUpdate)
          .then(() => {
            fail('promise should be rejected');
            done();
          })
          .catch((errorMessage) => {
            expect(errorMessage).toEqual('project ID is missing');
            done();
          });
      })
    })
  });
});