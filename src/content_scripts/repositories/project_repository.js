import Project from './project.js';
import _ from 'lodash';

export default class ProjectRepository {
  constructor({trackerApiClient, chromeStorageWrapper}) {
    this._trackerApiClient = trackerApiClient;
    this._chromeStorageWrapper = chromeStorageWrapper;

    this.update = this.update.bind(this);
  }

  findAll() {
    return new Promise(resolve => {
      this._trackerApiClient.getAllProjects().then(projectsFromTracker => {
        this._chromeStorageWrapper.get('projects')
          .then(localProjects => {
            return this._mergeLocalAndRemoteProjects(projectsFromTracker, localProjects)
          })
          .then(mergedProjects => {
            return this._chromeStorageWrapper.set({projects: mergedProjects})
              .then(() => resolve(mergedProjects));
          })
      })
    });
  }

  update(project) {
    return new Promise(resolve => {
      this._chromeStorageWrapper.get('projects')
        .then((savedProjects) => {
           return _.unionBy([project], savedProjects, 'name');
        })
        .then((savedAndUpdatedProjects) => {
          this._chromeStorageWrapper.set({projects: savedAndUpdatedProjects});
          resolve();
        });
    });
  }

  _mergeLocalAndRemoteProjects(projectsFromTracker, localProjects) {
    localProjects = localProjects || [];

    return projectsFromTracker.map(remoteProject => {
      const localProject = localProjects.find(
        (project) => project.name === remoteProject.name
      );

      if (localProject) {
        return new Project({name: remoteProject.name, disabled: localProject.disabled})
      } else {
        return new Project({name: remoteProject.name, disabled: true})
      }
    });
  }
}