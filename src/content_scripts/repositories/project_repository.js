import Project from './project.js';
import _ from 'lodash';

export default class ProjectRepository {
  constructor({trackerApiClient, chromeWrapper}) {
    this._trackerApiClient = trackerApiClient;
    this._chromeWrapper = chromeWrapper;

    this.update = this.update.bind(this);
  }

  findById(projectId) {
    return new Promise(resolve => {
      this.findAll().then(allProjects => {
        const foundProject = allProjects.find((project) => project.id === projectId);

        resolve(foundProject);
      });
    })
  }

  findAll() {
    return new Promise(resolve => {
      this._trackerApiClient.getAllProjects().then(projectsFromTracker => {
        this._chromeWrapper.get('projects')
          .then(localProjects => {
            return this._mergeLocalAndRemoteProjects(projectsFromTracker, localProjects)
          })
          .then(mergedProjects => {
            return this._chromeWrapper.set({projects: mergedProjects})
              .then(() => resolve(mergedProjects));
          });
      });
    });
  }

  update(project) {
    return new Promise((resolve, reject) => {
      if(_.isNil(project.id)) { reject('project ID is missing') }

      this._chromeWrapper.get('projects')
        .then((savedProjects) => {
           return _.unionBy([project], savedProjects, 'name');
        })
        .then((savedAndUpdatedProjects) => {
          this._chromeWrapper.set({projects: savedAndUpdatedProjects});
          resolve();
        });
    });
  }

  _mergeLocalAndRemoteProjects(projectsFromTracker, localProjects) {
    localProjects = localProjects || [];

    return projectsFromTracker.map(remoteProject => {
      const localProject = localProjects.find(
        (project) => project.id === remoteProject.id
      );

      if (localProject) {
        return new Project({id: remoteProject.id, name: remoteProject.name, disabled: localProject.disabled})
      } else {
        return new Project({id: remoteProject.id, name: remoteProject.name, disabled: true})
      }
    });
  }
}