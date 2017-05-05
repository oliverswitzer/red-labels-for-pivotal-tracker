
export default ({projectRepository, chromeWrapper, toggleFeatureNotifier}) => {
  chromeWrapper.get('userNotifiedOfToggleFeature').then(wasNotified => {
    projectRepository.findAll()
      .then((projects) => {
        return projects.every((project) => project.disabled === true);
      })
      .then(allProjectsDisabled => {
        if (!wasNotified && allProjectsDisabled) {
          addNotificationToPage(chromeWrapper, toggleFeatureNotifier);
        }
      });
  });
}

const addNotificationToPage = function (chromeWrapper, toggleFeatureNotifier) {
  chromeWrapper.set({userNotifiedOfToggleFeature: true}).then(() => {
    toggleFeatureNotifier.notify()
  });
};
