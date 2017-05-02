import ProjectRepository from '../../../src/content_scripts/repositories/project_repository.js';
import Project from '../../../src/content_scripts/repositories/project';
import ChromeStorageWrapper from '../../../src/content_scripts/utilities/chrome_storage_wrapper'

describe('ProjectRepository', () => {
  let projectRepository, trackerApiClientSpy, chromeStorageWrapperSpy;

  beforeEach(() => {
    let remoteProjects = [
      {
        "id": 98,
        "kind": "project",
        "name": "Learn About the Force",
      },
      {
        "id": 99,
        "kind": "project",
        "name": "Learn About Another Force",
      },
    ];

    trackerApiClientSpy = {
      getAllProjects: jasmine.createSpy('getAllProjects').and.returnValue(Promise.resolve(remoteProjects)),
      update: jasmine.createSpy('update')
    };

    chromeStorageWrapperSpy = new ChromeStorageWrapper();

    spyOn(chromeStorageWrapperSpy, 'get').and.returnValue(Promise.resolve([]));
    spyOn(chromeStorageWrapperSpy, 'set').and.returnValue(Promise.resolve())
  });

  describe('findAll', () => {
    context('when projects have not previously been stored in chrome', () => {
      beforeEach(() => {
        projectRepository = new ProjectRepository({
          trackerApiClient: trackerApiClientSpy,
          chromeStorageWrapper: chromeStorageWrapperSpy
        });
      });

      it('fetches all projects from tracker', (done) => {
        projectRepository.findAll().then((returnedProjects) => {
          expect(returnedProjects[0]).toEqual(jasmine.objectContaining({
            name: 'Learn About the Force',
          }));

          expect(returnedProjects[1]).toEqual(jasmine.objectContaining({
            name: 'Learn About Another Force',
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
          expect(chromeStorageWrapperSpy.set).toHaveBeenCalledWith({projects: foundProjects});

          done();
        });
      });
    });

    context('a project has been previously saved to chrome as enabled', () => {
      beforeEach(() => {
        let localProjects = [new Project({name: 'Learn About the Force', disabled: false})];

        chromeStorageWrapperSpy = new ChromeStorageWrapper();
        spyOn(chromeStorageWrapperSpy, 'get').and.returnValue(Promise.resolve(localProjects));
        spyOn(chromeStorageWrapperSpy, 'set').and.returnValue(Promise.resolve());

        projectRepository = new ProjectRepository({
          trackerApiClient: trackerApiClientSpy,
          chromeStorageWrapper: chromeStorageWrapperSpy
        })
      });

      it('returns projects from tracker with updated attributes from chrome storage', (done) => {
        projectRepository.findAll().then((returnedProjects) => {
          expect(returnedProjects[0]).toEqual(jasmine.objectContaining({
            name: 'Learn About the Force',
            disabled: false
          }));

          done();
        });
      });

      it('still returns the other project not stored in chrome', () => {
        projectRepository.findAll().then((returnedProjects) => {
          expect(returnedProjects[1]).toEqual(jasmine.objectContaining({
            name: 'Learn About Another Force',
            disabled: true
          }));

          done();
        });
      })
    })
  });

  describe('update', () => {
    let localProjects;

    beforeEach(() => {
      localProjects = [
        new Project({name: 'some project I will update', disabled: false}),
        new Project({name: 'some other project', disabled: false}),
        new Project({name: 'some other other project', disabled: true})
      ];

      chromeStorageWrapperSpy = new ChromeStorageWrapper();
      spyOn(chromeStorageWrapperSpy, 'get').and.returnValue(Promise.resolve(localProjects));
      spyOn(chromeStorageWrapperSpy, 'set').and.returnValue(Promise.resolve([]));

      projectRepository = new ProjectRepository({
        trackerApiClient: trackerApiClientSpy,
        chromeStorageWrapper: chromeStorageWrapperSpy
      })
    });


    it('persists the updated attributes to chrome', (done) => {
      const projectToUpdate = new Project({name: 'some project I will update', disabled: true});

      projectRepository.update(projectToUpdate).then(() => {
        expect(chromeStorageWrapperSpy.set).toHaveBeenCalledWith(
          {
            projects: [
              jasmine.objectContaining({name: 'some project I will update', disabled: true}),
              jasmine.any(Object),
              jasmine.any(Object)
            ]
          }
        );

        done();
      });
    });
  });
});