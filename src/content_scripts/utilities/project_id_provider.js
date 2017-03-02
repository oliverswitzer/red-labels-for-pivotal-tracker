export default {
    getProjectId() {
        return /projects\/(\d+)/.exec(window.location)[1];
    }
};