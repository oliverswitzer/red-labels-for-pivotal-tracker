const WWLTWScheduler = {
    findOrCreateWWLTWStory (wwltwRepository) {
        const projectId = ProjectIdProvider.getProjectId();
        const title = StoryTitleProvider.currentStoryTitle();

        return wwltwRepository.findByTitle(projectId, title)
            .then(function (responseJson) {
                if (responseJson.length == 0) {
                    return wwltwRepository.create(projectId, title);
                }
            })
    }
};


// should we alert when not on tracker

// nice to have: don't set alarm on saturday


// Don't do these things
// set alarm when chore is made (only the chore-making-triggerer would get the alarm set)
// OR just once in background scripts as they are loaded only once, upon installation/updating of extension

//To investigate
//can we send desktop notifications from background
//can background know if we are on pivotal tracker or if pivotal tracker is open?


//send a message to set an alarm when content script loaded
  // Does setting an alarm whose name matches a pre-existing alarm override it? (hopefully!)
   // YES!!!
// can we send a desktop notification from an extension? (hopefully!)
