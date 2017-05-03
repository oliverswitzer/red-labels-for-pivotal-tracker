import * as _ from 'lodash';

export default (projectRepository, ProjectIdProvider) => {
  return new Promise((resolve, reject) => {
    projectRepository.findById(parseInt(ProjectIdProvider.getProjectId())).then((project) => {
      if(_.isNil(project) || project.disabled) { reject() } else { resolve() }
    });
  })
}