const ProjectIdProvider = {
    getProjectId() {
        return /projects\/(\d+)/.exec(window.location)[1];
    }
};



